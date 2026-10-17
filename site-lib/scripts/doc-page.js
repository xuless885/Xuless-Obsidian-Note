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

/* ===========================================================================
   可调整的侧边栏（左：目录 / 右：反向链接）
   源导出页给了 #left-content / #right-content 三个叶子列（左栏、正文、右栏），
   但旧样式从未消费 --sidebar-width，宽度因此不可调、间距也不对。
   这里插入 .dsh-resizer 手柄，拖动即改宽度并持久化到 localStorage。
   =========================================================================== */
(function () {
  "use strict";
  var MIN = 190, MAX_PAD = 170, CLOSE_AT = 120;
  var KEY_L = "sidebar-left-width", KEY_R = "sidebar-right-width", KEY_CLOSED = "sidebar-closed";

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { /* 隐私模式下忽略 */ }
    return null;
  }

  function install() {
    var main = document.getElementById("main-horizontal");
    var center = document.getElementById("center-content");
    var left = document.getElementById("left-content");
    var right = document.getElementById("right-content");
    if (!main || !center) return;

    var closed = (ls(KEY_CLOSED) || "").split(",");
    var pairs = [];
    if (left && left.parentNode === main) pairs.push([left, KEY_L, "调整左侧目录宽度", left.nextSibling]);
    if (right && right.parentNode === main) pairs.push([right, KEY_R, "调整右侧栏宽度", right]);

    function maxWidth() {
      return Math.max(MIN + 20, Math.min(760, main.clientWidth - MAX_PAD));
    }
    function restore(el, key) {
      var v = parseInt(ls(key), 10);
      if (v > 0) el.style.setProperty("--sidebar-width", Math.min(v, maxWidth()) + "px");
    }
    function clampAll() {
      pairs.forEach(function (pr) { restore(pr[0], pr[1]); });
    }

    pairs.forEach(function (pr) {
      var el = pr[0], key = pr[1], label = pr[2];
      restore(el, key);

      var h = document.createElement("div");
      h.className = "dsh-resizer";
      h.setAttribute("role", "separator");
      h.setAttribute("aria-orientation", "vertical");
      h.setAttribute("aria-label", label);
      h.setAttribute("tabindex", "0");
      h.setAttribute("title", label + "（拖动 / 方向键；双击复位）");
      // 左栏手柄放在左栏之后；右栏手柄放在右栏之前
      var ref = (pr[3] && pr[3].nodeType === 1 && pr[3] !== el) ? pr[3] : el;
      if (el === right) main.insertBefore(h, ref);
      else main.insertBefore(h, ref.nextSibling);

      var startX = 0, startW = 0, dir = (el === right) ? -1 : 1;

      function baseWidth() {
        var w = el.getBoundingClientRect().width;
        return w > 0 ? w : (parseInt(getComputedStyle(el).getPropertyValue("--sidebar-width"), 10) || 280);
      }
      function apply(w) {
        w = Math.max(0, Math.min(w, maxWidth()));
        el.style.setProperty("--sidebar-width", w + "px");
        el.classList.toggle("is-collapsed", w < CLOSE_AT);
        return w;
      }
      function persist(w) {
        if (w < CLOSE_AT) {
          if (closed.indexOf(key) < 0) closed.push(key);
        } else {
          closed = closed.filter(function (x) { return x !== key; });
          ls(KEY_CLOSED, closed.join(","));
        }
        ls(key, String(Math.round(w)));
      }

      h.addEventListener("pointerdown", function (e) {
        if (e.button !== undefined && e.button !== 0) return;
        startX = e.clientX;
        startW = baseWidth();
        h.setPointerCapture(e.pointerId);
        h.classList.add("is-active");
        el.classList.add("is-resizing");
        document.body.classList.add("dsh-resizing");
        e.preventDefault();
      });
      h.addEventListener("pointermove", function (e) {
        if (!h.classList.contains("is-active")) return;
        apply(startW + (e.clientX - startX) * dir);
      });
      function end(e) {
        if (!h.classList.contains("is-active")) return;
        h.classList.remove("is-active");
        el.classList.remove("is-resizing");
        document.body.classList.remove("dsh-resizing");
        persist(baseWidth());
      }
      h.addEventListener("pointerup", end);
      h.addEventListener("pointercancel", end);

      h.addEventListener("keydown", function (e) {
        var step = e.shiftKey ? 40 : 12;
        var d = (e.key === "ArrowLeft") ? -1 : (e.key === "ArrowRight") ? 1 : 0;
        if (!d) return;
        e.preventDefault();
        persist(apply(baseWidth() + d * step * dir));
      });
      h.addEventListener("dblclick", function () {
        el.classList.remove("is-collapsed");
        var key2 = key;
        try { localStorage.removeItem(key2); } catch (err) {}
        el.style.removeProperty("--sidebar-width");
        closed = closed.filter(function (x) { return x !== key2; });
        ls(KEY_CLOSED, closed.join(","));
      });
    });

    if (closed.indexOf(KEY_L) >= 0 && left) left.classList.add("is-collapsed");
    if (closed.indexOf(KEY_R) >= 0 && right) right.classList.add("is-collapsed");

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(clampAll, 150);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();

/* ===========================================================================
   侧栏折叠/展开兜底（原版 Obsidian 侧栏 JS 未加载，这里自己实现）
   · 点击顶栏的 .sidebar-collapse-icon 收起/展开该栏
   · ≤1024px 默认两栏都收起，用左上角悬浮按钮以覆盖层打开
   · 状态记在 localStorage（与页面内联脚本用的键一致）
   =========================================================================== */
(function () {
  "use strict";
  var LS = "dsh-sidebar-collapsed";
  var BP = 1024;

  function read() {
    try { return JSON.parse(localStorage.getItem(LS) || "{}") || {}; } catch (e) { return {}; }
  }
  function write(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }

  function install() {
    var left = document.getElementById("left-content");
    var right = document.getElementById("right-content");
    var main = document.getElementById("main-horizontal");
    if (!main || (!left && !right)) return;
    var wide = window.innerWidth > BP;
    var st = read();

    // 窄屏：默认收起两栏（页面内联脚本只处理了 <768，这里补齐 768–1024）
    if (!wide) {
      if (left) left.classList.add("is-collapsed");
      if (right) right.classList.add("is-collapsed");
    } else {
      if (left && st.left) left.classList.add("is-collapsed");
      if (right && st.right) right.classList.add("is-collapsed");
    }

    function setCollapsed(el, key, v, overlay) {
      if (!el) return;
      el.classList.toggle("is-collapsed", v && !overlay);
      el.classList.toggle("dsh-overlay", !!overlay);
      if (!overlay && wide) { st[key] = v ? 1 : 0; write(st); }
    }

    // 顶栏折叠图标
    [[left, "left"], [right, "right"]].forEach(function (pr) {
      var el = pr[0], key = pr[1];
      if (!el) return;
      var icon = el.querySelector(".sidebar-collapse-icon");
      if (!icon) return;
      icon.setAttribute("title", "收起 / 展开此栏");
      icon.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        var collapsed = el.classList.contains("is-collapsed") || el.classList.contains("dsh-overlay");
        setCollapsed(el, key, !collapsed, false);
        refresh();      // ← 少了这一句：点图标收起后悬浮「召回」按钮不出现，侧栏就再也回不来了
      });
    });

    // 收起后（或窄屏）在左上角浮动「召回」按钮
    var bar = document.createElement("div");
    bar.className = "dsh-sidebar-openers";
    function mkBtn(label, title, el, key) {
      var b = document.createElement("button");
      b.type = "button";
      b.innerHTML = label;
      b.title = title;
      b.setAttribute("aria-label", title);
      b.addEventListener("click", function () {
        if (wide) {
          // 宽屏：直接把这栏放回原位（不做覆盖层，否则会盖住正文）
          setCollapsed(el, key, false, false);
        } else {
          // 窄屏：打开/关闭覆盖层
          var open = el.classList.contains("dsh-overlay");
          if (open) setCollapsed(el, key, true, false);
          else {
            el.classList.remove("is-collapsed");
            el.classList.add("dsh-overlay");
          }
        }
        refresh();
      });
      return b;
    }
    var bL = left ? mkBtn("&#9776;", left.querySelector(".sidebar-collapse-icon") ? "展开课程目录" : "打开/收起课程目录", left, "left") : null;
    var bR = right ? mkBtn("&#9776;", right.querySelector(".sidebar-collapse-icon") ? "展开本文目录" : "打开/收起本文目录", right, "right") : null;
    if (bL) bar.appendChild(bL);
    if (bR) bar.appendChild(bR);
    document.body.appendChild(bar);

    function collapsed(el) {
      return !!el && (el.classList.contains("is-collapsed") || el.classList.contains("dsh-overlay"));
    }
    function refresh() {
      var lc = collapsed(left), rc = collapsed(right);
      bar.hidden = !(!wide || lc || rc);
      // 只显示「确实收起了」的那些栏的按钮，免得让人以为按钮点错了
      if (bL) bL.hidden = !(left && lc);
      if (bR) bR.hidden = !(right && rc);
    }
    refresh();

    window.addEventListener("resize", function () {
      var nowWide = window.innerWidth > BP;
      if (nowWide !== wide) { wide = nowWide; location.reload(); return; }
      refresh();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();

/* ===========================================================================
   左栏讲义树：筛选框 + 当前页高亮（dsh-tree-v2）

   背景：侧栏顶部那个 "Search..." 输入框是 Obsidian 导出留下的，站点没有配套 JS，
   打字/回车/清空全都毫无反应；讲义树也没有「我在第几章」的标记。
   这里补三件事（都不改生成物结构，只在运行时增强）：
     ① 输入即筛选：按标题子串过滤 .dsh-tree-link，输入框清空按钮联动；
     ② 当前页高亮：把 href 解析后与 location 比对，命中打 .is-current 并滚进视野；
     ③ 占位文案本地化。
   =========================================================================== */
(function () {
  "use strict";
  function install() {
    var input = document.querySelector("#left-sidebar input[type='search']") ||
                document.querySelector("#search-wrapper input[type='search']");
    if (!input && !document.getElementById("dsh-tree")) return;

    // 注意：讲义树是 <link itemprop="include"> 异步注入的，install() 执行时它还没进 DOM。
    // 所以这里所有查询都必须**在事件触发时**现查，不能把 tree 缓存在闭包里。
    function treeLinks() { return document.querySelectorAll("#dsh-tree .dsh-tree-link"); }

    /* ② 当前页高亮 */
    function markCurrent() {
      var links = treeLinks();
      if (!links.length) return;
      var here = location.href.split("#")[0].split("?")[0];
      var marked = null;
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute("href") || "";
        var abs;
        try { abs = new URL(href, here).href; } catch (e) { continue; }
        links[i].classList.remove("is-current");
        if (abs === here) {
          links[i].classList.add("is-current");
          links[i].setAttribute("aria-current", "page");
          marked = links[i];
        }
      }
      if (marked && marked.scrollIntoView) {
        try { marked.scrollIntoView({ block: "nearest" }); } catch (e) { /* 老浏览器忽略选项 */ }
      }
    }

    /* ① 输入即筛选 */
    function filterTree(q) {
      var links = treeLinks();
      var key = (q || "").trim().toLowerCase();
      var lists = document.querySelectorAll("#dsh-tree .dsh-tree-list");
      for (var i = 0; i < links.length; i++) {
        var txt = (links[i].textContent || "").toLowerCase();
        var hit = !key || txt.indexOf(key) >= 0;
        links[i].classList.toggle("is-filtered-out", !hit);
      }
      for (var j = 0; j < lists.length; j++) {
        var any = lists[j].querySelector(".dsh-tree-link:not(.is-filtered-out)");
        lists[j].classList.toggle("is-empty", !any);
      }
    }

    if (input) {
      input.setAttribute("placeholder", "筛选讲义…");
      input.setAttribute("aria-label", "筛选讲义目录");
      input.addEventListener("input", function () { filterTree(input.value); });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { input.value = ""; filterTree(""); }
        if (e.key === "Enter") {
          var first = document.querySelector("#dsh-tree .dsh-tree-link:not(.is-filtered-out)");
          if (first) location.href = first.getAttribute("href");
        }
      });
      var clear = document.getElementById("search-clear-button");
      if (clear) {
        clear.setAttribute("role", "button");
        clear.setAttribute("aria-label", "清空筛选");
        clear.addEventListener("click", function () { input.value = ""; filterTree(""); input.focus(); });
      }
    }

    // 树是异步注入的（<link itemprop="include">），等它出现再标当前页；期间用户可能已经输入了关键词
    var tries = 0;
    (function waitTree() {
      if (treeLinks().length) {
        markCurrent();
        if (input && input.value) filterTree(input.value);
        return;
      }
      if (tries++ > 40) return;
      window.setTimeout(waitTree, 100);
    })();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();

/* ===========================================================================
   右栏目录（#outline）的折叠交互
   原版 Obsidian 的侧栏 JS 没有随站点加载，所以这些 .collapse-icon / .tree-collapse-all
   都是死的（点了没反应），而「全部折叠」按钮的图标原本还是个空 SVG。
   这里补上最小可用的折叠逻辑：点箭头收起/展开该节点，点右上按钮全部收起/展开。
   =========================================================================== */
(function () {
  "use strict";
  function install() {
    var outline = document.getElementById("outline");
    if (!outline) return;

    /* ---- 排版增强（外观在 blog-theme.css 8.16）-----------------------------
       ① 表头改中文「目录」并挂一个条目数徽标；
       ② 把标题开头的编号（"20.1"、"2.1.3"、"16.2　" 等）包成 .dsh-toc-num，
          让编号用等宽数字、颜色比标题淡一档 —— 目录立刻有层次；
       ③ 给每一项挂 title，长标题被两行截断时鼠标悬停能看到全文。 */
    var title = outline.querySelector(".feature-title");
    var links = outline.querySelectorAll("a.tree-item-self");
    if (title) {
      title.textContent = "目录";
      var badge = document.createElement("span");
      badge.className = "dsh-toc-count";
      badge.textContent = String(links.length);
      title.appendChild(badge);
    }
    for (var li = 0; li < links.length; li++) {
      var inner = links[li].querySelector(".tree-item-inner");
      if (!inner) continue;
      var txt = inner.textContent || "";
      if (inner.getAttribute("title") === null && txt.length > 14) inner.setAttribute("title", txt.trim());
      var first = inner.firstChild;
      if (first && first.nodeType === 3) {
        var m = /^\s*([0-9]+(?:\.[0-9]+)*)\s*[　\s]*/.exec(first.nodeValue);
        if (m) {
          var num = document.createElement("span");
          num.className = "dsh-toc-num";
          num.textContent = m[1];
          first.nodeValue = first.nodeValue.slice(m[0].length);
          inner.insertBefore(num, first);
        }
      }
    }

    // 每个 tree-item：把子节点包成一个可折叠容器
    function childrenOf(item) {
      var kids = item.querySelector(":scope > .tree-item-children");
      if (kids) return kids;
      var sibs = [];
      var n = item.nextElementSibling;
      while (n && n.classList.contains("tree-item")) { sibs.push(n); n = n.nextElementSibling; }
      return null;
    }

    function toggle(item) {
      var kids = item.querySelector(":scope > .tree-item-children");
      if (!kids) {
        // 没有显式的 children 容器：直接收起后续同深度的兄弟项
        var depth = item.getAttribute("data-depth") || "1";
        var collapsed = item.classList.toggle("is-collapsed");
        var n = item.nextElementSibling;
        while (n && n.classList.contains("tree-item") &&
               (n.getAttribute("data-depth") || "1") > depth) {
          n.style.display = collapsed ? "none" : "";
          // 递归恢复被隐藏的更深层
          if (!collapsed) {
            n.querySelectorAll('.tree-item[style*="display: none"]').forEach(function (d) {
              if (!d.closest(".tree-item.is-collapsed")) d.style.display = "";
            });
          }
          n = n.nextElementSibling;
        }
        return collapsed;
      }
      var c = item.classList.toggle("is-collapsed");
      kids.style.display = c ? "none" : "";
      return c;
    }

    outline.addEventListener("click", function (e) {
      var icon = e.target.closest(".collapse-icon, .tree-item-icon");
      if (icon) {
        var item = icon.closest(".tree-item");
        if (item) { e.preventDefault(); e.stopPropagation(); toggle(item); }
      }
    });

    var all = outline.querySelector(".tree-collapse-all");
    if (all) {
      var collapsedAll = false;
      all.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        collapsedAll = !collapsedAll;
        all.classList.toggle("is-collapsed", collapsedAll);
        all.setAttribute("aria-label", collapsedAll ? "Expand All" : "Collapse All");
        outline.querySelectorAll(".tree-item[data-depth='1'] .tree-item-children").forEach(function (k) {
          k.style.display = collapsedAll ? "none" : "";
        });
        outline.querySelectorAll(".tree-item[data-depth='1']").forEach(function (it) {
          it.classList.toggle("is-collapsed", collapsedAll);
        });
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();

/* ============================================================================
   侧栏「知识图谱」缩略图（doc-page.js 末尾追加的小模块）
   ----------------------------------------------------------------------------
   用户反馈：文档的侧边栏没有显示知识图谱的缩略图（旧站左栏顶部有）。
   做法：在左栏内容区顶部插一个 canvas，用 site-lib/data 的 docs/links 现场算一个
   轻量力导向布局（全站只有几十个文档，250 次迭代毫秒级），画成缩略图：
     · 节点按分类上色，当前文档用强调色 + 更大的半径
     · 当前文档的直接邻居加亮，其余淡化
     · 点击整块跳转到完整的知识图谱页
   不引入任何外部库，读主题的 CSS 变量取色，跟随深浅色。
   ========================================================================== */
(function () {
  "use strict";

  function cssVar(name, fallback) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name);
      v = (v || "").trim();
      return v || fallback;
    } catch (e) { return fallback; }
  }

  /* 求仓库根前缀（相对当前页面）。优先 window.DSH_ROOT，其次从脚本自身 src 反推。 */
  function rootPrefix() {
    if (typeof window.DSH_ROOT === "string" && window.DSH_ROOT) {
      return window.DSH_ROOT.replace(/\/+$/, "") || ".";
    }
    var s = document.querySelector('script[src*="site-lib/scripts/doc-page.js"]');
    if (s) {
      var src = s.getAttribute("src") || "";
      var i = src.indexOf("site-lib/");
      if (i > 0) {
        var pre = src.slice(0, i).replace(/\/+$/, "");
        return pre || ".";
      }
    }
    return "..";
  }

  function install() {
    var mount = document.getElementById("left-sidebar-content");
    if (!mount || document.querySelector(".dsh-mini-graph")) return;

    // 讲义页**没有** window.DSH_ROOT（只有外壳页/blog 页有），所以要自己求根前缀：
    // 从本站脚本自身的 src 反推（`../../site-lib/scripts/doc-page.js` → `../..`）。
    var root = rootPrefix();
    var meta = document.querySelector('meta[name="dsh-doc-id"]');
    var curId = meta ? meta.getAttribute("content") : null;

    var wrap = document.createElement("div");
    wrap.className = "dsh-mini-graph";
    wrap.innerHTML =
      '<div class="dsh-mini-head"><span>知识图谱</span>' +
      '<a class="dsh-mini-more" href="' + root + '/blog/graph.html">查看全图 \u2192</a></div>' +
      '<div class="dsh-mini-canvas-link">' +
      '<canvas width="560" height="470" role="img" aria-label="站内知识图谱缩略图（可拖动节点、悬停看标题）"></canvas>' +
      '<span class="dsh-mini-tip" hidden></span></div>';
    mount.insertBefore(wrap, mount.firstChild);

    // 侧栏被拖得比「可用最小宽度」还窄时整块隐藏（用户要求：比最小宽度小就不显示）。
    // 侧栏宽度由 .dsh-resizer 控制（doc-page.js 里 MIN=190），这里按 210px 判。
    var MIN_SHOW = 210;
    function syncNarrow() {
      var w = wrap.parentElement ? wrap.parentElement.getBoundingClientRect().width : 999;
      wrap.classList.toggle("is-narrow", w > 0 && w < MIN_SHOW);
    }
    syncNarrow();
    try {
      if (window.ResizeObserver) new window.ResizeObserver(syncNarrow).observe(mount);
      else window.addEventListener("resize", syncNarrow, { passive: true });
    } catch (e) { /* ignore */ }

    Promise.all([
      fetch(root + "/site-lib/data/docs.json").then(function (r) { return r.json(); }),
      fetch(root + "/site-lib/data/links.json").then(function (r) { return r.json(); })
    ]).then(function (res) {
      var docs = (res[0] && res[0].docs) || [];
      var edges = (res[1] && (res[1].edges || res[1].links)) || [];
      if (!docs.length) { wrap.remove(); return; }

      var idx = {}, nodes = [];
      docs.forEach(function (d, i) {
        idx[d.id] = i;
        nodes.push({ x: Math.cos(i * 2.399) * 40 + (i % 7) * 3,
                     y: Math.sin(i * 2.399) * 40 + (i % 5) * 3,
                     vx: 0, vy: 0, deg: 0, cat: d.category || "",
                     title: d.title || d.path || "", pinned: false });
      });
      var links = [], adj = [];
      nodes.forEach(function () { adj.push([]); });
      edges.forEach(function (e) {
        var s = idx[e.s !== undefined ? e.s : e.source];
        var t = idx[e.t !== undefined ? e.t : e.target];
        if (s === undefined || t === undefined || s === t) return;
        links.push([s, t]);
        nodes[s].deg++; nodes[t].deg++;
        if (adj[s].indexOf(t) < 0) adj[s].push(t);
        if (adj[t].indexOf(s) < 0) adj[t].push(s);
      });
      var cur = curId ? idx[curId] : undefined;

      /* ---- 物理：静态迭代算初值，拖动时每帧再跑几步（保持「拖动会带动邻居」的手感）---- */
      var N = nodes.length;
      var W = 560, H = 470, PAD = 24;
      function step(alpha) {
        var a, b, dx, dy, d2, d, f;
        for (a = 0; a < N; a++) { nodes[a].ax = 0; nodes[a].ay = 0; }
        for (a = 0; a < N; a++) {
          for (b = a + 1; b < N; b++) {
            dx = nodes[b].x - nodes[a].x; dy = nodes[b].y - nodes[a].y;
            d2 = dx * dx + dy * dy; if (d2 < 9) d2 = 9;
            d = Math.sqrt(d2); f = 1500 / d2;
            if (f > 34) f = 34;
            nodes[a].ax -= dx / d * f; nodes[a].ay -= dy / d * f;
            nodes[b].ax += dx / d * f; nodes[b].ay += dy / d * f;
          }
        }
        for (var li = 0; li < links.length; li++) {
          a = links[li][0]; b = links[li][1];
          dx = nodes[b].x - nodes[a].x; dy = nodes[b].y - nodes[a].y;
          d = Math.sqrt(dx * dx + dy * dy) || 1;
          f = (d - 52) / d * 0.05;
          nodes[a].ax += dx * f; nodes[a].ay += dy * f;
          nodes[b].ax -= dx * f; nodes[b].ay -= dy * f;
        }
        for (a = 0; a < N; a++) {
          if (nodes[a].pinned) { nodes[a].vx = 0; nodes[a].vy = 0; nodes[a].ax = 0; nodes[a].ay = 0; continue; }
          nodes[a].ax -= nodes[a].x * 0.0012;
          nodes[a].ay -= nodes[a].y * 0.0012;
          nodes[a].vx = (nodes[a].vx + nodes[a].ax * alpha) * 0.82;
          nodes[a].vy = (nodes[a].vy + nodes[a].ay * alpha) * 0.82;
          nodes[a].x += nodes[a].vx; nodes[a].y += nodes[a].vy;
        }
      }
      for (var it = 0; it < 300; it++) step(1);

      /* ---- 取景：每次重画时按当前包围盒算，拖动后自动跟随 ---- */
      var view = { k: 1, cx: 0, cy: 0 };
      function fitView() {
        var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
        nodes.forEach(function (n) {
          if (n.x < minX) minX = n.x; if (n.x > maxX) maxX = n.x;
          if (n.y < minY) minY = n.y; if (n.y > maxY) maxY = n.y;
        });
        view.k = Math.min((W - PAD * 2) / Math.max(1, maxX - minX),
                          (H - PAD * 2) / Math.max(1, maxY - minY));
        view.cx = (minX + maxX) / 2; view.cy = (minY + maxY) / 2;
      }
      fitView();
      function sx(n) { return W / 2 + (n.x - view.cx) * view.k; }
      function sy(n) { return H / 2 + (n.y - view.cy) * view.k; }

      var cv = wrap.querySelector("canvas");
      var tip = wrap.querySelector(".dsh-mini-tip");
      var ctx = cv.getContext("2d");
      if (!ctx) return;

      var accent = cssVar("--accent", "#3b5bdb");
      var fgMuted = cssVar("--fg-subtle", "#8b8f9a");
      var border = cssVar("--border-strong", "#cfcec7");
      var bgElev = cssVar("--bg-elev", "#fff");
      var palette = ["#3b5bdb", "#0ca678", "#e8590c", "#7048e8"];

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = "100%"; cv.style.height = "auto";
      ctx.scale(dpr, dpr);

      // 悬停 / 拖动状态：hover 优先于「当前文档」，高亮它的邻居（用户要求「跟其他关联」）
      var hover = -1, drag = null;

      function radiusOf(i) {
        var n = nodes[i];
        if (i === hover) return 9;
        if (i === cur) return 8;
        if (hover >= 0 && adj[hover].indexOf(i) >= 0) return 5.5;
        return n.deg > 0 ? 3.6 : 2.6;
      }
      function alphaOf(i) {
        if (hover >= 0) return (i === hover || adj[hover].indexOf(i) >= 0) ? 1 : 0.18;
        if (cur === undefined) return 1;
        return (i === cur || adj[cur].indexOf(i) >= 0) ? 1 : 0.35;
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 1;
        links.forEach(function (l) {
          var hi;
          if (hover >= 0) hi = (l[0] === hover || l[1] === hover);
          else hi = (cur !== undefined && (l[0] === cur || l[1] === cur));
          ctx.globalAlpha = hover >= 0 ? (hi ? 0.9 : 0.12) : (hi ? 0.9 : 0.22);
          ctx.strokeStyle = hi ? accent : border;
          ctx.beginPath();
          ctx.moveTo(sx(nodes[l[0]]), sy(nodes[l[0]]));
          ctx.lineTo(sx(nodes[l[1]]), sy(nodes[l[1]]));
          ctx.stroke();
        });
        nodes.forEach(function (n, i) {
          var r = radiusOf(i);
          ctx.globalAlpha = alphaOf(i);
          ctx.beginPath();
          ctx.arc(sx(n), sy(n), r, 0, Math.PI * 2);
          ctx.fillStyle = (i === cur) ? accent : palette[Math.abs(hash(n.cat)) % palette.length];
          ctx.fill();
          if (i === cur || i === hover) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = bgElev;
            ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      }

      /* ---- 指针交互：悬停出标题、按下可拖动（拖动时带动邻居，松手继续收敛）---- */
      function toCanvas(ev) {
        var r = cv.getBoundingClientRect();
        return { x: (ev.clientX - r.left) / (r.width || 1) * W,
                 y: (ev.clientY - r.top) / (r.height || 1) * H };
      }
      function pick(pt) {
        var best = -1, bestD = 1e9;
        for (var i = 0; i < N; i++) {
          var dx = sx(nodes[i]) - pt.x, dy = sy(nodes[i]) - pt.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          var lim = radiusOf(i) + 6;
          if (d < lim && d < bestD) { bestD = d; best = i; }
        }
        return best;
      }
      function showTip(i) {
        if (!tip) return;
        if (i < 0) { tip.hidden = true; return; }
        tip.hidden = false;
        tip.textContent = nodes[i].title || "";
        var r = cv.getBoundingClientRect();
        var scale = r.width / W;
        var x = sx(nodes[i]) * scale, y = sy(nodes[i]) * scale;
        tip.style.left = Math.max(4, Math.min(r.width - 8, x)) + "px";
        tip.style.top = Math.max(2, y - 10) + "px";
      }
      var rafId = 0;
      function tick() {
        rafId = 0;
        if (!drag) return;
        for (var s = 0; s < 3; s++) step(0.55);
        fitView(); draw();
        if (drag) rafId = window.requestAnimationFrame(tick);
      }
      function requestTick() { if (!rafId) rafId = window.requestAnimationFrame(tick); }

      cv.addEventListener("pointermove", function (ev) {
        var pt = toCanvas(ev);
        if (drag && drag.id === ev.pointerId) {
          var n = nodes[drag.i];
          n.x = (pt.x - W / 2) / view.k + view.cx;
          n.y = (pt.y - H / 2) / view.k + view.cy;
          drag.moved += Math.abs(ev.clientX - drag.lastX) + Math.abs(ev.clientY - drag.lastY);
          drag.lastX = ev.clientX; drag.lastY = ev.clientY;
          requestTick();
          return;
        }
        var i = pick(pt);
        if (i !== hover) {
          hover = i;
          showTip(i);
          cv.style.cursor = i >= 0 ? "grab" : "default";
          draw();
        }
      });
      cv.addEventListener("pointerdown", function (ev) {
        var i = pick(toCanvas(ev));
        if (i < 0) return;
        drag = { i: i, id: ev.pointerId, moved: 0, lastX: ev.clientX, lastY: ev.clientY };
        nodes[i].pinned = true;
        hover = i; showTip(i); draw();
        cv.style.cursor = "grabbing";
        try { cv.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
        if (ev.preventDefault) ev.preventDefault();
      });
      function endDrag(ev) {
        if (!drag || (ev && drag.id !== ev.pointerId)) return;
        nodes[drag.i].pinned = false;
        var moved = drag.moved;
        try { cv.releasePointerCapture(drag.id); } catch (e) { /* ignore */ }
        drag = null;
        cv.style.cursor = hover >= 0 ? "grab" : "default";
        // 松手后让邻居回弹收敛（视觉上就是「拖动会牵动周围」）
        for (var s = 0; s < 26; s++) step(0.85);
        fitView(); draw();
        // 拖过就不要再触发外层「查看全图」的跳转
        if (moved > 6) { cv.dataset.dragged = "1"; window.setTimeout(function () { delete cv.dataset.dragged; }, 400); }
      }
      cv.addEventListener("pointerup", endDrag);
      cv.addEventListener("pointercancel", endDrag);
      cv.addEventListener("pointerleave", function () {
        if (drag) return;
        hover = -1; showTip(-1); draw();
      });
      wrap.querySelector(".dsh-mini-canvas-link").addEventListener("click", function (ev) {
        if (cv.dataset.dragged) { ev.preventDefault(); ev.stopPropagation(); return; }
        ev.preventDefault();
        window.location.href = root + "/blog/graph.html";
      });

      draw();
    }).catch(function () {
      // 数据取不到就撤掉这块，绝不留下破图
      var w = document.querySelector(".dsh-mini-graph");
      if (w) w.remove();
    });
  }

  function hash(s) {
    s = String(s || "");
    var h = 0;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
    return h;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();

/* ===========================================================================
   固定顶栏运行时（dsh-topbar-v2）：阅读进度条 + 右栏目录当前小节高亮
   · 进度条：往 #navbar 底部插一条 .dsh-nav-progress（外观在 blog-theme.css 8.15），
     宽度 = 已滚动比例，样式无关地降级（没有 #navbar 就不建）。
   · scrollspy：#outline 里的目录项是 a.tree-item-self[href="#标题id"]，
     滚动时把「最后一个越过顶栏下沿」的标题对应项打上 .dsh-toc-active，
     并让它在侧栏自身滚动容器里保持可见（不动页面滚动位置）。
   节流：scroll/resize 只排一次 requestAnimationFrame，滚动不掉帧。
   =========================================================================== */
(function () {
  "use strict";

  function install() {
    var doc = document.documentElement;
    var nav = document.getElementById("navbar");
    var bar = null;
    if (nav) {
      bar = document.createElement("div");
      bar.className = "dsh-nav-progress";
      nav.appendChild(bar);
    }

    var outline = document.getElementById("outline");
    var items = [];
    if (outline) {
      var links = outline.querySelectorAll('a.tree-item-self[href^="#"]');
      for (var i = 0; i < links.length; i++) {
        var id = "";
        try { id = decodeURIComponent(links[i].getAttribute("href").slice(1)); } catch (e) { id = links[i].getAttribute("href").slice(1); }
        var h = id && document.getElementById(id);
        if (h) items.push({ link: links[i], el: h });
      }
    }

    if (!bar && !items.length) return;

    var wrap = null;
    if (outline) {
      wrap = outline.closest ? outline.closest(".sidebar-content-wrapper") : null;
      if (!wrap) {
        // 老浏览器兜底：没有 closest 就自己往上找。
        // 括号必须先判节点再判类名，否则 p 走到 null 时读 p.className 会抛异常。
        var p = outline.parentNode;
        while (p && p.nodeType === 1 &&
               (p.className || "").indexOf("sidebar-content-wrapper") === -1) p = p.parentNode;
        wrap = (p && p.nodeType === 1) ? p : null;
      }
    }

    function revealInSidebar(a) {
      if (!wrap) return;
      var ar = a.getBoundingClientRect(), wr = wrap.getBoundingClientRect();
      if (ar.top < wr.top + 8) wrap.scrollTop -= (wr.top + 8 - ar.top);
      else if (ar.bottom > wr.bottom - 8) wrap.scrollTop += (ar.bottom - wr.bottom + 8);
    }

    var cur = null, raf = 0;
    function update() {
      raf = 0;
      var top = window.pageYOffset || doc.scrollTop || 0;
      var vh = window.innerHeight || doc.clientHeight || 0;
      var max = (doc.scrollHeight || 0) - vh;
      if (bar) bar.style.width = (max > 0 ? Math.min(1, Math.max(0, top / max)) : 0) * 100 + "%";
      if (!items.length) return;
      var line = top + (nav ? nav.offsetHeight : 0) + 24;
      var active = -1;
      for (var i = 0; i < items.length; i++) {
        var elTop = items[i].el.getBoundingClientRect().top + top;
        if (elTop <= line) active = i; else break;   // 目录按文档顺序排列
      }
      var want = active >= 0 ? items[active].link : null;
      if (want !== cur) {
        if (cur) cur.classList.remove("dsh-toc-active");
        if (want) { want.classList.add("dsh-toc-active"); revealInSidebar(want); }
        cur = want;
      }
    }
    function schedule() { if (!raf) raf = window.requestAnimationFrame(update); }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();

/* ===========================================================================
   锚点跳转校准（dsh-anchor-fix）
   ---------------------------------------------------------------------------
   背景：正文里的板块（.callout）为了缩放/滚动性能加了 `content-visibility: auto`
   （见 blog-theme.css 末尾「运行时性能」段）：屏幕外板块的高度是「上次渲染的估计值」，
   于是浏览器**原生 #id 跳转**会把目标滚偏 —— 实测 chapter-28 点目录第 12 项，
   目标标题停在视口 783px 处（本该贴在顶栏下方）。
   做法：不阻止原生跳转（保留历史记录与无障碍语义），跳转后花几帧把目标校准到顶栏下方；
   位置稳定即停（2px 内算到位，最多 8 次）。初始带 hash 打开、hashchange 也走同一套。
   =========================================================================== */
(function () {
  "use strict";
  try { window.__dshAnchorFix = { loaded: 1, clicks: 0, aligned: 0 }; } catch (e0) { /* ignore */ }
  var NAV_GAP = 14;      // 标题距顶栏的留白
  var WATCH_MS = 1600;   // 校准观察窗：原生 fragment 滚动可能比我们晚落地
  var RETRY_MS = 110;

  function navHeight() {
    var nav = document.getElementById("navbar") || document.querySelector(".site-nav");
    var h = 60;
    if (nav) {
      var r = nav.getBoundingClientRect();
      if (r && r.height) h = Math.round(r.height);
    }
    return h;
  }

  function findById(id) {
    if (!id) return null;
    var el = null;
    try { el = document.getElementById(id); } catch (e) { el = null; }
    if (el) return el;
    try { return document.querySelector('[id="' + String(id).replace(/"/g, '\\"') + '"]'); } catch (e2) { return null; }
  }

  /** 把 el 顶边对齐到「顶栏 + 留白」。
   *  为什么要「盯着」而不是只对一次：目标标题跳转后，Chrome 会**推迟**执行原生 fragment
   *  滚动（要等 content-visibility 的屏幕外板块把高度算出来），它可能在我们校准完之后才落地，
   *  于是又把位置带偏。所以这里在一个时间窗内持续纠正；用户一旦自己滚动/按键就立刻收手。 */
  function align(el) {
    if (!el || !el.getBoundingClientRect) return;
    try { if (window.__dshAnchorFix) window.__dshAnchorFix.aligned++; } catch (e0) { /* ignore */ }
    var want = navHeight() + NAV_GAP;
    var t0 = Date.now();
    var cancelled = false;

    function stop() { cancelled = true; }
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });
    window.addEventListener("pointerdown", stop, { once: true });

    function step() {
      if (cancelled) return;
      var r = el.getBoundingClientRect();
      var delta = Math.round(r.top - want);
      if (Math.abs(delta) > 2) window.scrollBy(0, delta);
      if (Date.now() - t0 < WATCH_MS) window.setTimeout(step, RETRY_MS);
    }
    step();
  }

  function hashId() {
    var h = location.hash || "";
    if (h.length < 2) return "";
    try { return decodeURIComponent(h.slice(1)); } catch (e) { return h.slice(1); }
  }

  function alignHash() { align(findById(hashId())); }

  function install() {
    // ① 点击站内锚点：先让浏览器跳，再校准
    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
      if (!a) return;
      try { if (window.__dshAnchorFix) window.__dshAnchorFix.clicks++; } catch (e0) { /* ignore */ }
      var id = "";
      try { id = decodeURIComponent((a.getAttribute("href") || "").slice(1)); } catch (e) { id = ""; }
      if (!id) return;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { align(findById(id)); });
      });
    }, false);

    // ② 带 hash 打开 / 前进后退
    window.addEventListener("hashchange", function () {
      window.requestAnimationFrame(function () { alignHash(); });
    }, false);
    if (hashId()) {
      window.setTimeout(alignHash, 300);    // 等侧栏树/图谱缩略图这类异步模块把布局推开
      window.setTimeout(alignHash, 1200);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
/* ============================================================================
   正文版心滑块（dsh-measure）
   · 用户要求「加一个滑块用来调整正文的左右页边距，当前正文宽度是固定的」；
   · 只写一个 CSS 变量 --doc-measure（px），正文列 max-width 用
     min(100%, var(--doc-measure, 52rem))，所以正文恒居中、左右边距对称，
     窄屏自动退回 100%；
   · 默认 832px（= 改前的 52rem），范围 480–1200、步长 8；
   · 状态存 localStorage["dsh-doc-measure"]，模板首帧前的启动脚本会先读一次（防闪）；
   · 交互：点「⇔」开合面板、拖动滑块实时改宽、双击按钮/「恢复默认」回默认、
     聚焦按钮时 ←/→ 微调、Esc 或点面板外收起。
   ========================================================================== */
(function () {
  var KEY = "dsh-doc-measure";
  var MIN = 480, MAX = 1400, DEF = 832, STEP = 8;

  function clamp(n) {
    if (isNaN(n)) return DEF;
    n = Math.round(n / STEP) * STEP;
    return n < MIN ? MIN : n > MAX ? MAX : n;
  }

  function read() {
    var v = null;
    try { v = localStorage.getItem(KEY); } catch (e) { v = null; }
    return clamp(parseInt(v, 10));
  }

  function apply(px, persist) {
    var n = clamp(px);
    document.documentElement.style.setProperty("--doc-measure", n + "px");
    if (persist) { try { localStorage.setItem(KEY, String(n)); } catch (e) { /* 隐私模式 */ } }
    return n;
  }

  function install() {
    var btn = document.querySelector("[data-measure-toggle]");
    var pop = document.getElementById("dsh-measure-pop");
    if (!btn || !pop) return;
    var rng = pop.querySelector(".dsh-measure-range");
    var out = pop.querySelector(".dsh-measure-val");
    if (!rng) return;

    var cur = apply(read(), false);

    function sync(n) {
      cur = apply(n, true);
      rng.value = String(cur);
      out.textContent = cur + "px";
    }

    // 版心的物理上限 = 正文卡片「内容盒」宽度。做法：塞一个 width:100% 的隐形探针
    // 进卡片的父元素里量一次再撤掉（同一帧内完成，不会闪）。
    // 走过的弯路（都实测过，别再用）：
    //   · clientWidth 减 padding —— 卡片里有滚动条，量出来比真实窄 20 来 px；
    //   · 把 --doc-measure 临时设成 100000px 再量正文列 —— 正文变成超宽后它的
    //     最小内容宽度暴涨，flex 会给正文列抢走侧栏的空间，量出 1144 这种假上限。
    function avail() {
      var sec = document.querySelector(".markdown-preview-section");
      var host = sec && sec.parentElement;
      if (!host) return MAX;
      var probe = document.createElement("div");
      // 必须留在普通流里：position:absolute 的 width:100% 是相对「最近的定位祖先」
      // 解析，卡片没定位就会解析成视口宽（实测量出 1390 这种假值）。
      probe.style.cssText =
        "width:100%;height:0;margin:0;padding:0;border:0;visibility:hidden;pointer-events:none";
      host.appendChild(probe);
      var w = probe.getBoundingClientRect().width;
      host.removeChild(probe);
      if (!(w > 0)) return MAX;
      return Math.max(MIN, Math.min(MAX, Math.floor(w)));
    }

    function syncRange() {
      var m = avail();
      rng.max = String(m);
      if (cur > m) sync(m);
      else rng.value = String(cur);
    }

    // 面板挂在按钮正下方（右对齐），不压住右侧目录栏
    function place() {
      var r = btn.getBoundingClientRect();
      pop.style.right = Math.max(8, Math.round(window.innerWidth - r.right)) + "px";
    }

    function open(on) {
      pop.hidden = !on;
      btn.setAttribute("aria-expanded", on ? "true" : "false");
      btn.classList.toggle("is-active", !!on);
      if (!on) return;
      place();
      syncRange();
      try { rng.focus({ preventScroll: true }); } catch (e) { rng.focus(); }
      // 侧栏宽度有 .16s 过渡：开面板那一瞬间量到的容器宽度还在半路上（实测偏 3–30px），
      // 等过渡结束再量一次，读数才和正文实际宽度一致。
      window.setTimeout(function () {
        if (pop.hidden) return;
        syncRange();
      }, 220);
    }

    window.addEventListener("resize", function () {
      if (pop.hidden) return;
      place();
      syncRange();
    });

    // 字体到位后版面会再动一次（CMU/Sans 都是外链 woff），面板开着就重新量一遍
    try {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          if (pop.hidden) return;
          place();
          syncRange();
        });
      }
    } catch (e) { /* 老浏览器没有 FontFaceSet */ }

    rng.value = String(cur);
    out.textContent = cur + "px";
    // 注意：这里**不要**立刻 syncRange()。DOMContentLoaded 时侧栏/字体还没定，
    // avail() 会量出一个偏小的值，把用户存的版心永久改小（实测 832 被改成 712）。
    // max 只在面板真正打开时才收紧。

    rng.addEventListener("input", function () { sync(parseInt(rng.value, 10)); });
    btn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      open(pop.hidden);
    });
    btn.addEventListener("dblclick", function () { sync(DEF); });
    btn.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
        sync(cur + (ev.key === "ArrowLeft" ? -2 * STEP : 2 * STEP));
        ev.preventDefault();
      }
    });
    var reset = pop.querySelector(".dsh-measure-reset");
    if (reset) reset.addEventListener("click", function () { sync(DEF); rng.focus(); });
    document.addEventListener("click", function (ev) {
      if (pop.hidden) return;
      if (pop.contains(ev.target) || btn.contains(ev.target)) return;
      open(false);
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !pop.hidden) { open(false); btn.focus(); }
    });

    // 只读钩子（验收脚本 / verify_docui 用）：当前值 + 主动设置
    window.DSH_DOC_MEASURE = {
      get: function () { return cur; },
      set: function (px) { sync(px); return cur; },
      reset: function () { sync(DEF); return cur; }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
