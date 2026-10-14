/*!
 * doc-page.js — 内容页运行时面板（反向链接 / 本文引用）
 * 项目：许少 Xuless 的数字花园 · 静态站点重做（task-3 内容页集成）
 *
 * 职责
 *   在 79 个既有内容页（自带 <base> 的 Obsidian/Quartz 导出页）里，按
 *   <meta name="dsh-doc-id"> 定位当前文档，填充两个面板：
 *     #dsh-backlinks .backlinks-body[data-backlinks-mount]  -> 反向链接（谁引用了我）
 *     #dsh-outlinks  .outlinks-body[data-outlinks-mount]    -> 本文引用（我引用了谁）
 *
 * 路径约定（重要）
 *   内容页自带 <base href="..|../..">，站点既有资源一律用**无前缀**写法
 *   （href="site-lib/styles/obsidian.css"），经 <base> 解析后落到仓库根的 site-lib/。
 *   因此这里的数据地址与生成的链接同样使用无前缀相对路径，绝不加 "/" 或 "../" 前缀
 *   （站点是 GitHub Pages 项目站点，部署在子路径下，root-absolute 会 404）。
 *   数据地址的取法优先级：
 *     1) window.DSH_ROOT（若宿主注入）  2) 自己 <script src> 推导（最稳）  3) document.baseURI
 *
 * 安全
 *   所有来自 JSON 的文本一律 textContent 写入（绝不 innerHTML），防 XSS。
 *
 * 健壮性
 *   fetch 失败 / JSON 缺字段 / 面板不存在 / 文档 id 对不上，全部降级为友好提示，
 *   不抛异常、不阻塞页面。数据只取一次，缓存在 window 上供两个面板共用。
 */
(function () {
  "use strict";

  var DATA_DIR = "site-lib/data/";
  var CACHE_KEY = "__dshDocPageCache";

  if (window.__dshDocPageLoaded) return;   // 防重复执行
  window.__dshDocPageLoaded = true;

  var cache = window[CACHE_KEY] || (window[CACHE_KEY] = { promise: null, docs: null, edges: null, error: null });

  /* ---------------------------------------------------------------- utils */

  function warn() {
    if (window.console && console.warn) {
      var a = Array.prototype.slice.call(arguments);
      a.unshift("[doc-page]");
      console.warn.apply(console, a);
    }
  }

  function abs(url) {
    try { return new URL(url, document.baseURI).href; } catch (e) { return url; }
  }

  /** 数据文件地址：全部按当前页 <base> 语义解析，落到仓库根的 site-lib/data/。 */
  function dataURL(name) {
    var file = DATA_DIR + name;
    // 1) 宿主注入的站点根（可能有，也可能没有）
    if (typeof window.DSH_ROOT === "string" && window.DSH_ROOT) {
      try { return new URL(file, abs(window.DSH_ROOT)).href; } catch (e) { /* fallthrough */ }
    }
    // 2) 读自己的 <script src> => <root>/site-lib/scripts/doc-page.js => ../data/xxx
    //    优先用 IDL 属性 el.src（浏览器已按 <base> 解析成绝对 URL），attribute 值作退路。
    try {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = 0; i < scripts.length; i++) {
        var el = scripts[i];
        var raw = el.src || el.getAttribute("src") || "";
        if (raw.indexOf("doc-page.js") !== -1) {
          return new URL("../data/" + name, new URL(raw, document.baseURI).href).href;
        }
      }
    } catch (e) { /* fallthrough */ }
    // 3) 退路：直接相对（内容页里同样按 <base> 解析到根）
    return abs(file);
  }

  function fetchJSON(url) {
    return fetch(url, { credentials: "same-origin" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status + " " + r.statusText);
      return r.json();
    });
  }

  /* ------------------------------------------------------------ document id */

  function currentDocId() {
    var m = document.querySelector('meta[name="dsh-doc-id"]');
    if (m && m.getAttribute("content")) return m.getAttribute("content").trim();
    var s = document.querySelector("section[data-doc-id]");
    if (s && s.getAttribute("data-doc-id")) return s.getAttribute("data-doc-id").trim();
    return "";
  }

  /** 兜底：按当前 URL 路径在 docs 里找（应对 meta 缺失或 id 漂移）。 */
  function matchByPath(docs) {
    var here;
    try { here = decodeURIComponent(location.pathname); } catch (e) { here = location.pathname; }
    here = here.replace(/\/+$/, "");
    for (var i = 0; i < docs.length; i++) {
      var p = "/" + String(docs[i].path || "").replace(/^\.?\//, "");
      if (here.slice(-p.length) === p) return docs[i];
    }
    return null;
  }

  /* ------------------------------------------------------------------ data */

  function loadData() {
    if (cache.promise) return cache.promise;
    var docsP = fetchJSON(dataURL("docs.json")).then(function (j) {
      var docs = (j && j.docs) || (Array.isArray(j) ? j : []);
      if (!docs.length) throw new Error("docs.json 里没有 docs[]");
      return docs;
    });
    // links.json 只用于拿到每条边的 kind；拿不到也能工作
    var linksP = fetchJSON(dataURL("links.json")).then(function (j) {
      return (j && j.edges) || (Array.isArray(j) ? j : []);
    }).catch(function (e) { warn("links.json 不可用，kind 退回 link：", e.message); return []; });

    cache.promise = Promise.all([docsP, linksP]).then(function (r) {
      var docs = r[0], edges = r[1];
      var byId = {};
      for (var i = 0; i < docs.length; i++) byId[docs[i].id] = docs[i];
      cache.docs = docs; cache.edges = edges; cache.byId = byId;
      return cache;
    }).catch(function (e) {
      cache.error = e;
      cache.promise = null;
      throw e;
    });
    return cache.promise;
  }

  function idList(v) {
    var out = [];
    if (!v) return out;
    for (var i = 0; i < v.length; i++) {
      var it = v[i];
      if (typeof it === "string") out.push({ id: it, kind: "link" });
      else if (it && typeof it === "object") out.push({ id: it.id || it.target || it.source || "", kind: it.kind || "link" });
    }
    return out;
  }

  /** 合并 links.json 的边（带 kind）与 docs.json 的 id 列表（无 kind），去重。
   *  which: "incoming" -> 边里 t 是本页，另一端是 s（来源）
   *         "outgoing" -> 边里 s 是本页，另一端是 t（目标）
   */
  function collect(items, doc, which) {
    var out = [], seen = {};
    var mine = which === "incoming" ? "t" : "s";
    var otherKey = which === "incoming" ? "s" : "t";
    for (var i = 0; i < items.length; i++) {
      var e = items[i];
      if (!e || e[mine] !== doc.id) continue;
      var other = e[otherKey];
      var k = other + "|" + (e.kind || "link");
      if (seen[k]) continue;
      seen[k] = 1;
      out.push({ id: other, kind: e.kind || "link" });
    }
    if (!out.length) out = idList(doc[which]);   // 边表缺失时退回 docs.json 的 id 列表
    return out;
  }

  /* --------------------------------------------------------------- render */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = String(text);   // ★ 一律 textContent，防 XSS
    return n;
  }

  function emptyState(msg) {
    return el("p", "empty-state", msg);
  }

  function itemNode(entry, byId) {
    var doc = byId[entry.id];
    var item = el("article", "result-item");
    item.setAttribute("data-doc-id", entry.id);
    if (entry.kind && entry.kind !== "link") item.setAttribute("data-kind", entry.kind);

    if (!doc) {                       // 数据里查不到这个 id：只展示，不给死链
      item.appendChild(el("span", "result-item-title", entry.id));
      item.appendChild(el("span", "result-item-meta", "（数据缺失）"));
      return item;
    }
    var a = el("a", "result-item-title", doc.title || doc.path);
    a.setAttribute("href", doc.path);       // 无前缀 -> 经 <base> 解析到仓库根
    item.appendChild(a);
    var meta = [];
    if (doc.category) meta.push(doc.category);
    if (doc.path) meta.push(doc.path);
    item.appendChild(el("span", "result-item-meta", meta.join(" · ")));
    return item;
  }

  function renderFlat(mount, entries, byId, emptyText) {
    mount.textContent = "";
    if (!entries.length) { mount.appendChild(emptyState(emptyText)); return; }
    var frag = document.createDocumentFragment();
    for (var i = 0; i < entries.length; i++) frag.appendChild(itemNode(entries[i], byId));
    mount.appendChild(frag);
  }

  var KIND_LABEL = { link: "链接", embed: "嵌入" };

  function renderGrouped(mount, entries, byId, emptyText) {
    mount.textContent = "";
    if (!entries.length) { mount.appendChild(emptyState(emptyText)); return; }
    var order = [], groups = {};
    for (var i = 0; i < entries.length; i++) {
      var k = entries[i].kind || "link";
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(entries[i]);
    }
    var frag = document.createDocumentFragment();
    for (var g = 0; g < order.length; g++) {
      var k2 = order[g];
      var box = el("div", "result-group");
      box.setAttribute("data-kind", k2);
      box.appendChild(el("h3", "result-group-head", (KIND_LABEL[k2] || k2) + "（" + groups[k2].length + "）"));
      for (var j = 0; j < groups[k2].length; j++) box.appendChild(itemNode(groups[k2][j], byId));
      frag.appendChild(box);
    }
    mount.appendChild(frag);
  }

  function fail(mount, msg, why) {
    mount.textContent = "";
    mount.appendChild(emptyState(msg));
    if (why) {
      var d = el("p", "empty-state-detail", why);
      mount.appendChild(d);
    }
  }

  function countBadge(section, n) {
    if (!section) return;
    var head = section.querySelector(".panel-head");
    if (!head) return;
    var old = head.querySelector(".panel-count");
    if (old) old.parentNode.removeChild(old);
    if (n > 0) head.appendChild(el("span", "panel-count", " " + n));
  }

  /* ------------------------------------------------------------------ boot */

  function boot() {
    var blSection = document.getElementById("dsh-backlinks");
    var olSection = document.getElementById("dsh-outlinks");
    var blMount = blSection && blSection.querySelector("[data-backlinks-mount]");
    var olMount = olSection && olSection.querySelector("[data-outlinks-mount]");
    if (!blMount && !olMount) return;         // 本页没注入面板：什么都不做

    var docId = currentDocId();
    loadData().then(function (data) {
      var docs = data.docs, edges = data.edges, byId = data.byId;
      var doc = byId[docId] || null;
      if (!doc) {
        doc = matchByPath(docs);
        if (doc) { docId = doc.id; warn("meta dsh-doc-id 未命中，按路径回退到", docId); }
      }
      if (!doc) {
        if (blMount) fail(blMount, "暂无反向链接", "未在本页找到文档标识（meta dsh-doc-id）");
        if (olMount) fail(olMount, "本文没有引用其它文档", "未在本页找到文档标识（meta dsh-doc-id）");
        return;
      }
      var incoming = collect(edges, doc, "incoming");
      var outgoing = collect(edges, doc, "outgoing");
      if (blMount) {
        renderFlat(blMount, incoming, byId, "暂无反向链接");
        countBadge(blSection, incoming.length);
      }
      if (olMount) {
        renderGrouped(olMount, outgoing, byId, "本文没有引用其它文档");
        countBadge(olSection, outgoing.length);
      }
      // 供其它脚本（图/检索）复用同一份数据
      window.DSH_DOC_PAGE = {
        docId: docId, doc: doc, byId: byId, edges: edges,
        incoming: incoming, outgoing: outgoing,
        dataURL: dataURL, reload: function () { cache.promise = null; return loadData(); }
      };
    }).catch(function (e) {
      warn("数据加载失败：", e && e.message);
      var why = "（" + (e && e.message ? e.message : "网络错误") + "）";
      if (blMount) fail(blMount, "反向链接加载失败，请稍后重试", why);
      if (olMount) fail(olMount, "引用列表加载失败，请稍后重试", why);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
