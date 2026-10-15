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
      });
    });

    // 窄屏（或已收起）时，提供悬浮按钮打开覆盖层
    var bar = document.createElement("div");
    bar.className = "dsh-sidebar-openers";
    function mkBtn(label, title, el, key) {
      var b = document.createElement("button");
      b.type = "button";
      b.innerHTML = label;
      b.title = title;
      b.addEventListener("click", function () {
        var open = el.classList.contains("dsh-overlay");
        if (open) { el.classList.remove("dsh-overlay"); el.classList.add("is-collapsed"); }
        else { el.classList.remove("is-collapsed"); el.classList.add("dsh-overlay"); }
        refresh();
      });
      return b;
    }
    var bL = left ? mkBtn("&#9776;", "打开/收起课程目录", left, "left") : null;
    var bR = right ? mkBtn("&#9776;", "打开/收起本文目录", right, "right") : null;
    if (bL) bar.appendChild(bL);
    if (bR) bar.appendChild(bR);
    document.body.appendChild(bar);

    function refresh() {
      var needBar = !wide || (left && left.classList.contains("is-collapsed")) ||
                    (right && right.classList.contains("is-collapsed"));
      bar.hidden = !needBar;
      if (bL) bL.hidden = !left;
      if (bR) bR.hidden = !right;
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
