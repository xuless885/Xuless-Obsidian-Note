/*!
 * search.js —— 全站可视化检索（纯静态、零依赖、零 CDN）
 * 站点：Xuless 数字花园 ｜ 归属：task-4「关系图与检索」
 *
 * 设计要点
 *  1) 纯函数层（tokenize / scoreDoc / runSearch / highlight / parseSearch / buildSearch …）
 *     不碰任何 DOM，可被 node 直接 require 做 headless 自测。
 *  2) search.json 约 2MB：**只在首次真正检索时**才 fetch，并缓存到 window 变量；
 *     加载期间显示 .skeleton，失败降级到 docs.json（只有标题/标签/摘要可搜）。
 *  3) 防抖 120ms；结果分页渲染（每页 24 条）+ DocumentFragment 一次性插入。
 *  4) 所有写入 DOM 的文本都经过 escapeHtml；需要 <mark> 高亮的片段是
 *     「先转义、后拼 mark」，绝不把原始数据直接塞进 innerHTML。
 */
(function () {
  'use strict';

  var HAS_DOM = (typeof document !== 'undefined' && typeof window !== 'undefined');

  /* ==========================================================================
   * 第一部分：纯函数层
   * ========================================================================== */

  function str(v) { return (typeof v === 'string') ? v : (v === null || v === undefined ? '' : String(v)); }

  /** HTML 转义（XSS 防线；` < > " ' 六个字符） */
  function escapeHtml(s) {
    return str(s).replace(/[&<>"'`]/g, function (c) {
      switch (c) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        case '`': return '&#96;';
        default: return c;
      }
    });
  }

  function decodeSafe(s) {
    try { return decodeURIComponent(String(s)); } catch (e) { return String(s); }
  }

  var CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3040-\u30ff]/;

  /**
   * 查询分词：英文按词、中文按「整串 + 2-gram」，长词权重更高。
   * @returns {Array<{text:string, weight:number}>}
   */
  function tokenize(query) {
    var raw = str(query).trim().toLowerCase();
    if (!raw) return [];
    var parts = raw.split(/[\s,，、;；/|]+/).filter(function (p) { return p !== ''; });
    var map = Object.create(null);
    function add(text, weight) {
      if (!text) return;
      if (!map[text] || map[text] < weight) map[text] = weight;
    }
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var isCJK = CJK.test(p);
      if (isCJK) {
        add(p, p.length >= 3 ? 1 : (p.length === 2 ? 0.85 : 0.6));
        if (p.length >= 4) {                       // 长中文串补 2-gram，提高召回
          for (var j = 0; j + 1 < p.length; j++) add(p.slice(j, j + 2), 0.55);
        }
      } else {
        add(p, p.length >= 3 ? 1 : 0.8);
        // 英文长词额外给一个「去掉复数 s」的形态
        if (p.length >= 5 && /s$/.test(p)) add(p.slice(0, -1), 0.6);
      }
    }
    var out = [];
    for (var k in map) out.push({ text: k, weight: map[k] });
    out.sort(function (a, b) { return b.text.length - a.text.length; });
    return out.slice(0, 24);
  }

  function countOccurrences(hay, needle, cap) {
    if (!hay || !needle) return 0;
    var limit = Math.min(hay.length, 6000);        // 正文最长只看前 6000 字符，防长文拖慢
    var n = 0, from = 0, idx;
    var max = cap || 10;
    while (n < max) {
      idx = hay.indexOf(needle, from);
      if (idx < 0 || idx >= limit) break;
      n++;
      from = idx + needle.length;
      if (from >= limit) break;
    }
    return n;
  }

  /**
   * 单文档打分：标题 > 别名 > 标签 > 标题层级 > 正文。
   * doc 可以来自 search.json（有 text），也可以来自 docs.json（无 text，自动降级用 excerpt）。
   */
  function scoreDoc(doc, terms, rawQuery) {
    if (!doc || typeof doc !== 'object') return { score: 0, matched: 0 };
    var title = str(doc.title).toLowerCase();
    var aliases = Array.isArray(doc.aliases) ? doc.aliases.join(' \u0001 ').toLowerCase() : '';
    var tags = Array.isArray(doc.tags) ? doc.tags.join(' \u0001 ').toLowerCase() : '';
    var headings = Array.isArray(doc.headings) ? doc.headings.join(' \u0001 ').toLowerCase() : '';
    var text = str(doc.text).toLowerCase();
    if (!text) text = str(doc.excerpt).toLowerCase();

    var score = 0, matched = 0, i, t, s, c;
    if (terms && terms.length) {
      for (i = 0; i < terms.length; i++) {
        t = terms[i];
        if (!t || !t.text) continue;
        s = 0;
        var len = t.text.length;
        if (title.indexOf(t.text) >= 0) s += 130 * t.weight * (len >= 2 ? 1 : 0.55);
        if (aliases && aliases.indexOf(t.text) >= 0) s += 62 * t.weight;
        if (tags && tags.indexOf(t.text) >= 0) s += 46 * t.weight;
        if (headings && headings.indexOf(t.text) >= 0) s += 32 * t.weight;
        c = countOccurrences(text, t.text, 10);
        if (c) s += (10 + Math.min(c, 10) * 1.6) * t.weight;
        if (s > 0) { matched++; score += s; }
      }
      if (matched === 0) return { score: 0, matched: 0 };
      // 命中词覆盖度越高越靠前（防止一个词命中就把整串命中挤下去）
      score *= (0.35 + 0.65 * (matched / terms.length));
    }

    var rq = str(rawQuery).trim().toLowerCase();
    if (rq) {
      if (title === rq) score += 500;
      else if (title.indexOf(rq) === 0) score += 180;
      else if (title.indexOf(rq) >= 0) score += 110;
      if (str(doc.path).toLowerCase().indexOf(rq) >= 0) score += 20;
    }
    return { score: score, matched: matched };
  }

  function safeLocaleCompare(a, b) {
    try { return String(a).localeCompare(String(b), 'zh-Hans-CN', { numeric: true }); }
    catch (e) { return String(a) < String(b) ? -1 : (String(a) > String(b) ? 1 : 0); }
  }

  /**
   * 检索主函数（纯函数）。
   * @param {Array} docs 文档数组（search.json 或 docs.json 的 docs）
   * @param {string} query 原始查询串
   * @param {{cats?:string[], tags?:string[], sort?:string, limit?:number}} opts
   * @returns {{results:Array, total:number, took:number, terms:Array}}
   */
  function runSearch(docs, query, opts) {
    opts = opts || {};
    var t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    var list = Array.isArray(docs) ? docs : [];
    var terms = tokenize(query);
    var cats = Array.isArray(opts.cats) ? opts.cats : [];
    var tags = Array.isArray(opts.tags) ? opts.tags : [];
    var sort = opts.sort || 'relevance';
    var out = [];
    var i, d;

    for (i = 0; i < list.length; i++) {
      d = list[i];
      if (!d || typeof d !== 'object') continue;
      if (cats.length) {
        var cat = str(d.category);
        if (cats.indexOf(cat) < 0) continue;
      }
      if (tags.length) {
        var dt = Array.isArray(d.tags) ? d.tags : [];
        var hitTag = false;
        for (var ti = 0; ti < tags.length; ti++) { if (dt.indexOf(tags[ti]) >= 0) { hitTag = true; break; } }
        if (!hitTag) continue;
      }
      var sc = scoreDoc(d, terms, query);
      if (terms.length && sc.score <= 0) continue;
      out.push({ doc: d, score: sc.score, matched: sc.matched });
    }

    var byMod = function (x, y) { return (+y.doc.modified || 0) - (+x.doc.modified || 0); };
    if (sort === 'latest') {
      out.sort(function (x, y) { return byMod(x, y) || (y.score - x.score); });
    } else if (sort === 'title') {
      out.sort(function (x, y) { return safeLocaleCompare(x.doc.title, y.doc.title); });
    } else {
      out.sort(function (x, y) { return (y.score - x.score) || byMod(x, y); });
    }
    if (opts.limit > 0) out = out.slice(0, opts.limit);

    var t1 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    return { results: out, total: out.length, took: t1 - t0, terms: terms };
  }

  /**
   * 高亮：**先转义、后拼 <mark>**。
   * 返回的字符串可以安全地写进 innerHTML —— 所有非匹配片段都已转义。
   */
  function highlight(text, terms, maxMarks) {
    var s = str(text);
    if (!s) return '';
    var list = [];
    var i;
    if (Array.isArray(terms)) {
      for (i = 0; i < terms.length && i < 24; i++) {
        var t = (typeof terms[i] === 'string') ? terms[i] : (terms[i] && terms[i].text);
        t = str(t);
        if (t) list.push(t.toLowerCase());
      }
    }
    if (!list.length) return escapeHtml(s);
    var lower = s.toLowerCase();
    var ranges = [];
    var cap = maxMarks || 60;
    for (i = 0; i < list.length; i++) {
      var needle = list[i];
      var from = 0, guard = 0, idx;
      while (guard++ < 40) {
        idx = lower.indexOf(needle, from);
        if (idx < 0) break;
        ranges.push([idx, idx + needle.length]);
        from = idx + needle.length;
        if (ranges.length >= cap) break;
      }
      if (ranges.length >= cap) break;
    }
    if (!ranges.length) return escapeHtml(s);
    ranges.sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
    var merged = [];
    for (i = 0; i < ranges.length; i++) {
      var cur = ranges[i];
      var last = merged[merged.length - 1];
      if (last && cur[0] <= last[1]) { if (cur[1] > last[1]) last[1] = cur[1]; }
      else merged.push([cur[0], cur[1]]);
    }
    var out = '', pos = 0;
    for (i = 0; i < merged.length; i++) {
      var seg = merged[i];
      if (seg[0] > pos) out += escapeHtml(s.slice(pos, seg[0]));
      out += '<mark class="search-mark">' + escapeHtml(s.slice(seg[0], seg[1])) + '</mark>';
      pos = seg[1];
    }
    out += escapeHtml(s.slice(pos));
    return out;
  }

  /** 以第一个命中位置为中心裁一段摘要（找不到命中就给开头） */
  function makeSnippet(text, terms, radius) {
    var s = str(text);
    if (!s) return '';
    var r = radius || 90;
    var lower = s.toLowerCase();
    var at = -1;
    if (Array.isArray(terms)) {
      for (var i = 0; i < terms.length && i < 24; i++) {
        var t = (typeof terms[i] === 'string') ? terms[i] : (terms[i] && terms[i].text);
        t = str(t).toLowerCase();
        if (!t) continue;
        var idx = lower.indexOf(t);
        if (idx >= 0 && (at < 0 || idx < at)) at = idx;
      }
    }
    if (at < 0) at = 0;
    var start = Math.max(0, at - Math.round(r * 0.45));
    var end = Math.min(s.length, start + r * 2);
    start = Math.max(0, Math.min(start, Math.max(0, end - r * 2)));
    var cut = s.slice(start, end);
    return (start > 0 ? '…' : '') + cut + (end < s.length ? '…' : '');
  }

  /* ---------------- URL 状态（?q=&cat=&tag=&sort=） ---------------- */

  function splitList(v) {
    var out = [];
    var parts = str(v).split(',');
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].trim();
      if (p && out.indexOf(p) < 0) out.push(p);
    }
    return out;
  }

  function mergeList(a, b) {
    for (var i = 0; i < b.length; i++) { if (a.indexOf(b[i]) < 0) a.push(b[i]); }
    return a;
  }

  var SORTS = ['relevance', 'latest', 'title'];

  /** 解析 URL / query string → 状态（非法输入一律安全降级） */
  function parseSearch(input) {
    var out = { q: '', cats: [], tags: [], sort: 'relevance' };
    var s = str(input);
    var qi = s.indexOf('?');
    if (qi >= 0) s = s.slice(qi + 1);
    var hi = s.indexOf('#');
    if (hi >= 0) s = s.slice(0, hi);
    s = s.replace(/^[&?]+/, '');
    if (!s) return out;
    var pairs = s.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      if (!p) continue;
      var eq = p.indexOf('=');
      var key = decodeSafe(eq < 0 ? p : p.slice(0, eq)).toLowerCase();
      var val = eq < 0 ? '' : decodeSafe(p.slice(eq + 1).replace(/\+/g, ' '));
      if (key === 'q' || key === 'query' || key === 's') out.q = val;
      else if (key === 'cat' || key === 'category') out.cats = mergeList(out.cats, splitList(val));
      else if (key === 'tag' || key === 'tags') out.tags = mergeList(out.tags, splitList(val));
      else if (key === 'sort') out.sort = SORTS.indexOf(val) >= 0 ? val : 'relevance';
    }
    if (SORTS.indexOf(out.sort) < 0) out.sort = 'relevance';
    return out;
  }

  /** 状态 → query string（默认值省略；与 parseSearch 往返一致） */
  function buildSearch(state) {
    state = state || {};
    var qs = [];
    var q = str(state.q).trim();
    if (q) qs.push('q=' + encodeURIComponent(q));
    var cats = Array.isArray(state.cats) ? state.cats.filter(Boolean) : [];
    if (cats.length) qs.push('cat=' + encodeURIComponent(cats.join(',')));
    var tags = Array.isArray(state.tags) ? state.tags.filter(Boolean) : [];
    if (tags.length) qs.push('tag=' + encodeURIComponent(tags.join(',')));
    var sort = str(state.sort);
    if (sort && sort !== 'relevance' && SORTS.indexOf(sort) >= 0) qs.push('sort=' + encodeURIComponent(sort));
    return qs.length ? ('?' + qs.join('&')) : '';
  }

  /* ---------------- 杂项 ---------------- */

  function relativeTime(ts, nowTs) {
    var t = +ts;
    if (!isFinite(t) || t <= 0) return '';
    var now = isFinite(+nowTs) ? +nowTs : Date.now();
    var diff = now - t;
    if (diff < 0) diff = 0;
    var min = 60000, hour = 3600000, day = 86400000;
    if (diff < min) return '刚刚';
    if (diff < hour) return Math.floor(diff / min) + ' 分钟前';
    if (diff < day) return Math.floor(diff / hour) + ' 小时前';
    if (diff < 30 * day) return Math.floor(diff / day) + ' 天前';
    if (diff < 365 * day) return Math.floor(diff / (30 * day)) + ' 个月前';
    var d = new Date(t);
    var mm = d.getMonth() + 1, dd = d.getDate();
    return d.getFullYear() + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  }

  function paginate(list, page, size) {
    var arr = Array.isArray(list) ? list : [];
    var s = Math.max(1, (size | 0) || 20);
    var total = arr.length;
    var pages = Math.max(1, Math.ceil(total / s));
    var p = Math.min(Math.max(1, (page | 0) || 1), pages);
    return { items: arr.slice((p - 1) * s, p * s), page: p, pages: pages, total: total, hasMore: p < pages };
  }

  function normalizeDocs(json) {
    if (!json) return [];
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.docs)) return json.docs;
    return [];
  }

  function encodeDocPath(path) {
    var p = str(path);
    if (!p) return '';
    var segs = p.split('/'), out = [];
    for (var i = 0; i < segs.length; i++) { if (segs[i]) out.push(encodeURIComponent(segs[i])); }
    return out.join('/');
  }

  var PURE = {
    escapeHtml: escapeHtml,
    tokenize: tokenize,
    countOccurrences: countOccurrences,
    scoreDoc: scoreDoc,
    runSearch: runSearch,
    highlight: highlight,
    makeSnippet: makeSnippet,
    parseSearch: parseSearch,
    buildSearch: buildSearch,
    relativeTime: relativeTime,
    paginate: paginate,
    normalizeDocs: normalizeDocs,
    encodeDocPath: encodeDocPath
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = PURE;
  if (HAS_DOM) window.DSH_SEARCH_PURE = PURE;

  /* ==========================================================================
   * 第二部分：浏览器层
   * ========================================================================== */

  if (!HAS_DOM) return;

  var PAGE_SIZE = 24;
  var DEBOUNCE = 120;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  function rootPrefix() {
    var r = window.DSH_ROOT;
    if (typeof r === 'string' && r) return r.replace(/\/+$/, '');
    return '..';
  }

  function dataUrl(file) { return rootPrefix() + '/site-lib/data/' + file; }

  function cache() {
    if (!window.__DSH_SEARCH_CACHE__) window.__DSH_SEARCH_CACHE__ = {};
    return window.__DSH_SEARCH_CACHE__;
  }

  function fetchJson(file) {
    if (typeof window.fetch !== 'function') return Promise.reject(new Error('no fetch'));
    return window.fetch(dataUrl(file), { cache: 'force-cache' }).then(function (res) {
      if (!res || !res.ok) throw new Error('HTTP ' + (res && res.status));
      return res.json();
    });
  }

  function docUrl(path) {
    if (window.DSH && typeof window.DSH.docUrl === 'function') {
      try { return window.DSH.docUrl(path); } catch (e) { /* fallthrough */ }
    }
    var enc = encodeDocPath(path);
    return enc ? (rootPrefix() + '/' + enc) : '#';
  }

  function nowMs() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  function bootSearch() {
    var app = document.querySelector('[data-search-root]') || document.getElementById('search-app');
    if (!app) return;
    var filtersHost = document.getElementById('search-filters') ||
      document.querySelector('[data-search-filters]');

    // 让「结果 + 筛选」在任意父容器下并排（只加自己的类；父容器里混有别的元素时退回横向筛选条）
    var twoCol = false;
    try {
      var shell = app.parentElement;
      if (shell && filtersHost && shell === filtersHost.parentElement) {
        var kids = shell.children, count = 0;
        for (var ci = 0; ci < kids.length; ci++) {
          if (kids[ci] === app || kids[ci] === filtersHost) count++;
        }
        if (count === 2) { shell.classList.add('search-shell'); twoCol = true; }
      }
    } catch (e) { /* ignore */ }

    var S = {
      all: [],                    // docs.json
      byId: Object.create(null),
      tagList: [],
      tagCount: Object.create(null),
      categories: [],
      q: '', cats: [], tags: [], sort: 'relevance',
      results: [], took: 0, terms: [],
      page: 1, pageSize: PAGE_SIZE,
      sel: -1,
      loading: false, degraded: false, failed: false,
      ready: false
    };

    /* ---------------- DOM 骨架 ---------------- */

    app.textContent = '';

    // 优先复用主题页里已有的大搜索框（#search-page-input / [data-search-input]）：
    // 避免同一页出现两个搜索框；页面没提供时才自己造一个。
    var input = null;
    try {
      var cand = document.querySelector('[data-search-input]') || document.getElementById('search-page-input');
      if (cand && cand.tagName === 'INPUT' && !(cand.closest && cand.closest('.site-nav'))) input = cand;
    } catch (e) { input = null; }
    var externalInput = !!input;
    if (!input) {
      input = el('input', 'search-input');
      input.type = 'search';
    }
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('spellcheck', 'false');
    if (!input.getAttribute('aria-label')) input.setAttribute('aria-label', '搜索站内文档');
    if (!input.getAttribute('placeholder')) input.setAttribute('placeholder', '搜索标题、标签、正文…');

    var head = null, meta = null, countEl = null, timeEl = null;
    if (!externalInput) {
      head = el('div', 'search-head');
      var field = el('div', 'search-field-wrap');
      field.appendChild(input);
      field.appendChild(el('span', 'kbd search-kbd', '/'));
      head.appendChild(field);
    }
    meta = el('p', 'search-meta');
    countEl = el('span', 'search-count', '');
    timeEl = el('span', 'search-time', '');
    meta.appendChild(countEl);
    meta.appendChild(timeEl);
    if (head) {
      head.appendChild(meta);
      app.appendChild(head);
    } else {
      app.appendChild(meta);
    }

    var body = el('div', 'search-results');
    body.setAttribute('role', 'listbox');
    body.setAttribute('aria-label', '搜索结果');
    app.appendChild(body);

    var moreWrap = el('div', 'search-more');
    app.appendChild(moreWrap);

    var note = el('p', 'search-note');
    note.hidden = true;
    app.appendChild(note);

    var filterBox = null;
    if (filtersHost) {
      filtersHost.textContent = '';
      filterBox = el('div', 'search-filters-inner');
      filtersHost.appendChild(filterBox);
    }

    /* ---------------- 渲染 ---------------- */

    function setNote(msg, isError) {
      note.textContent = msg || '';
      note.hidden = !msg;
      note.classList.toggle('is-error', !!isError);
    }

    function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

    function renderSkeletons(n) {
      clear(body);
      clear(moreWrap);
      countEl.textContent = '正在载入检索索引…';
      timeEl.textContent = '';
      for (var i = 0; i < (n || 6); i++) {
        var card = el('article', 'search-result card search-skeleton skeleton');
        card.appendChild(el('div', 'search-skeleton-line'));
        card.appendChild(el('div', 'search-skeleton-line short'));
        body.appendChild(card);
      }
    }

    function buildCard(item, idx) {
      var d = item.doc || {};
      var card = el('article', 'search-result card');
      card.setAttribute('role', 'option');
      card.setAttribute('aria-selected', 'false');
      card.setAttribute('data-idx', String(idx));
      if (idx === S.sel) card.classList.add('is-selected');

      var h = el('h3', 'search-result-title');
      var a = el('a', 'search-result-link');
      a.href = docUrl(d.path);
      a.innerHTML = highlight(str(d.title) || str(d.path) || '(无标题)', S.terms, 8);
      h.appendChild(a);
      card.appendChild(h);

      var metaRow = el('div', 'search-result-meta');
      if (d.category) metaRow.appendChild(el('span', 'chip', d.category));
      var dtags = Array.isArray(d.tags) ? d.tags : [];
      for (var ti = 0; ti < dtags.length && ti < 4; ti++) {
        metaRow.appendChild(el('span', 'tag-pill', dtags[ti]));
      }
      var when = relativeTime(d.modified);
      if (when) {
        var time = el('time', 'search-result-time', when);
        if (+d.modified) time.setAttribute('datetime', new Date(+d.modified).toISOString());
        metaRow.appendChild(time);
      }
      card.appendChild(metaRow);

      var src = str(d.text) || str(d.excerpt) || str(d.description);
      var snippet = makeSnippet(src, S.terms, 92);
      var p = el('p', 'search-result-excerpt');
      if (snippet) p.innerHTML = highlight(snippet, S.terms, 12);
      else p.textContent = '（无摘要）';
      card.appendChild(p);

      card.addEventListener('mouseenter', function () { select(idx, false); });
      card.addEventListener('click', function () { select(idx, false); });
      return card;
    }

    function renderResults() {
      clear(body);
      clear(moreWrap);
      if (S.failed) {
        countEl.textContent = '';
        timeEl.textContent = '';
        var box = el('div', 'empty-state');
        box.appendChild(el('p', null, '检索数据加载失败。'));
        box.appendChild(el('p', null, '请确认站点通过 HTTP 服务打开（python -m http.server），而不是 file:// 直接双击。'));
        body.appendChild(box);
        return;
      }
      var total = S.results.length;
      var page = paginate(S.results, S.page, S.pageSize);
      countEl.textContent = total
        ? ('找到 ' + total + ' 篇文档 · 第 ' + page.page + '/' + page.pages + ' 页')
        : '没有匹配的文档';
      timeEl.textContent = S.took >= 0 ? ('检索耗时 ' + S.took.toFixed(1) + ' ms') : '';

      if (S.degraded) setNote('正文索引未能加载，已降级为「标题 / 标签 / 摘要」检索。', false);
      else setNote('');

      if (!total) {
        var empty = el('div', 'empty-state');
        empty.appendChild(el('p', null, '没有找到与「' + str(S.q) + '」匹配的文档。'));
        var tips = el('p', 'search-tips');
        tips.textContent = '试试更短的关键词，或清空筛选条件。';
        empty.appendChild(tips);
        body.appendChild(empty);
        return;
      }

      var frag = document.createDocumentFragment();
      for (var i = 0; i < page.items.length; i++) {
        frag.appendChild(buildCard(page.items[i], i));
      }
      body.appendChild(frag);

      if (page.hasMore) {
        var btn = el('button', 'btn btn-ghost search-more-btn',
          '加载更多（还有 ' + (page.total - page.page * page.pageSize) + ' 篇）');
        btn.type = 'button';
        btn.addEventListener('click', function () {
          S.page++;
          renderResults();
        });
        moreWrap.appendChild(btn);
      }
    }

    function renderBrowse() {
      S.terms = [];
      clear(body);
      clear(moreWrap);
      countEl.textContent = '浏览全部 · 共 ' + S.all.length + ' 篇';
      timeEl.textContent = '';
      setNote('');

      var recent = S.all.slice().sort(function (a, b) { return (+b.modified || 0) - (+a.modified || 0); }).slice(0, 20);
      var groups = [], index = Object.create(null);
      for (var i = 0; i < recent.length; i++) {
        var c = str(recent[i].category) || '未分类';
        if (!index[c]) { index[c] = { name: c, docs: [] }; groups.push(index[c]); }
        index[c].docs.push(recent[i]);
      }
      var frag = document.createDocumentFragment();
      var cardIdx = 0;
      for (var g = 0; g < groups.length; g++) {
        var sec = el('section', 'search-browse-group');
        sec.appendChild(el('h3', 'search-browse-title', groups[g].name + ' · ' + groups[g].docs.length + ' 篇'));
        var row = el('div', 'search-browse-list');
        for (var d = 0; d < groups[g].docs.length; d++) {
          row.appendChild(buildCard({ doc: groups[g].docs[d], score: 0 }, cardIdx++));
        }
        sec.appendChild(row);
        frag.appendChild(sec);
      }
      body.appendChild(frag);

      if (S.tagList.length) {
        var tagSec = el('section', 'search-browse-group search-hot-tags');
        tagSec.appendChild(el('h3', 'search-browse-title', '热门标签'));
        var tagRow = el('div', 'chip-row');
        var top = S.tagList.slice(0, 12);
        for (var t = 0; t < top.length; t++) {
          (function (tag) {
            var b = el('button', 'chip search-hot-tag', tag.name + ' · ' + tag.count);
            b.type = 'button';
            b.addEventListener('click', function () {
              S.tags = [tag.name];
              S.page = 1;
              syncUrl();
              refreshFilterStates();
              runQuery();
            });
            tagRow.appendChild(b);
          })(top[t]);
        }
        tagSec.appendChild(tagRow);
        body.appendChild(tagSec);
      }
    }

    function select(idx, scroll) {
      S.sel = idx;
      var cards = body.querySelectorAll('.search-result');
      for (var i = 0; i < cards.length; i++) {
        var on = (i === idx);
        cards[i].classList.toggle('is-selected', on);
        cards[i].setAttribute('aria-selected', on ? 'true' : 'false');
        if (on && scroll !== false) {
          try { cards[i].scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ }
        }
      }
    }

    function renderFilters() {
      if (!filterBox) return;
      clear(filterBox);
      filterBox.appendChild(el('h2', 'search-filters-title', '筛选'));

      var catSec = el('div', 'search-filter-group');
      catSec.appendChild(el('h3', 'search-filter-head', '分类'));
      var catRow = el('div', 'search-filter-chips');
      for (var i = 0; i < S.categories.length; i++) {
        (function (cat) {
          var on = S.cats.indexOf(cat) >= 0;
          var b = el('button', 'chip search-filter-chip' + (on ? ' is-on' : ''), cat);
          b.type = 'button';
          b.setAttribute('data-cat', cat);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          b.addEventListener('click', function () { toggle(S.cats, cat); });
          catRow.appendChild(b);
        })(S.categories[i]);
      }
      catSec.appendChild(catRow);
      filterBox.appendChild(catSec);

      var tagSec = el('div', 'search-filter-group');
      tagSec.appendChild(el('h3', 'search-filter-head', '标签'));
      var tagRow = el('div', 'search-filter-chips');
      var showAll = !!S.showAllTags;
      var list = showAll ? S.tagList : S.tagList.slice(0, twoCol ? 14 : 8);
      for (var t = 0; t < list.length; t++) {
        (function (tag) {
          var on = S.tags.indexOf(tag.name) >= 0;
          var b = el('button', 'tag-pill search-filter-tag' + (on ? ' is-on' : ''), tag.name + ' (' + tag.count + ')');
          b.type = 'button';
          b.setAttribute('data-tag', tag.name);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          b.addEventListener('click', function () { toggle(S.tags, tag.name); });
          tagRow.appendChild(b);
        })(list[t]);
      }
      tagSec.appendChild(tagRow);
      if (S.tagList.length > 14) {
        var more = el('button', 'btn btn-ghost search-filter-more', showAll ? '收起标签' : '更多标签…');
        more.type = 'button';
        more.addEventListener('click', function () {
          S.showAllTags = !S.showAllTags;
          renderFilters();
        });
        tagSec.appendChild(more);
      }
      filterBox.appendChild(tagSec);

      var sortSec = el('div', 'search-filter-group');
      sortSec.appendChild(el('h3', 'search-filter-head', '排序'));
      var sortRow = el('div', 'search-filter-sorts');
      var opts = [['relevance', '相关度'], ['latest', '最新'], ['title', '标题']];
      for (var s = 0; s < opts.length; s++) {
        (function (val, label) {
          var on = S.sort === val;
          var b = el('button', 'search-sort' + (on ? ' is-on' : ''), label);
          b.type = 'button';
          b.setAttribute('data-sort', val);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          b.addEventListener('click', function () {
            S.sort = val; S.page = 1; syncUrl(); refreshFilterStates(); runQuery();
          });
          sortRow.appendChild(b);
        })(opts[s][0], opts[s][1]);
      }
      sortSec.appendChild(sortRow);
      filterBox.appendChild(sortSec);

      var clearBtn = el('button', 'btn btn-ghost search-filter-clear', '清空筛选');
      clearBtn.type = 'button';
      clearBtn.disabled = !(S.cats.length || S.tags.length || S.sort !== 'relevance');
      clearBtn.addEventListener('click', function () {
        S.cats = []; S.tags = []; S.sort = 'relevance'; S.page = 1;
        syncUrl(); refreshFilterStates(); runQuery();
      });
      filterBox.appendChild(clearBtn);
    }

    /** 只刷新已有筛选按钮的选中态（不重绘整块，避免焦点丢失 / DOM 抖动） */
    function refreshFilterStates() {
      if (!filterBox) return;
      var i, on;
      var chips = filterBox.querySelectorAll('.search-filter-chip');
      for (i = 0; i < chips.length; i++) {
        on = S.cats.indexOf(chips[i].getAttribute('data-cat')) >= 0;
        chips[i].classList.toggle('is-on', on);
        chips[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      var tags = filterBox.querySelectorAll('.search-filter-tag');
      for (i = 0; i < tags.length; i++) {
        on = S.tags.indexOf(tags[i].getAttribute('data-tag')) >= 0;
        tags[i].classList.toggle('is-on', on);
        tags[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      var sorts = filterBox.querySelectorAll('.search-sort');
      for (i = 0; i < sorts.length; i++) {
        on = sorts[i].getAttribute('data-sort') === S.sort;
        sorts[i].classList.toggle('is-on', on);
        sorts[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      var clearBtn = filterBox.querySelector('.search-filter-clear');
      if (clearBtn) clearBtn.disabled = !(S.cats.length || S.tags.length || S.sort !== 'relevance');
    }

    function toggle(arr, value) {
      var i = arr.indexOf(value);
      if (i >= 0) arr.splice(i, 1); else arr.push(value);
      S.page = 1;
      syncUrl();
      refreshFilterStates();
      runQuery();
    }

    function syncUrl() {
      try {
        if (!window.history || !window.history.replaceState) return;
        var qs = buildSearch(S);
        window.history.replaceState(null, '', window.location.pathname + qs + window.location.hash);
      } catch (e) { /* ignore */ }
    }

    /* ---------------- 数据 ---------------- */

    function ensureSearchData() {
      var c = cache();
      if (c.searchDocs && c.searchDocs.length) { S.degraded = !!c.degraded; return Promise.resolve(c.searchDocs); }
      if (c.searchPromise) return c.searchPromise;
      renderSkeletons(6);
      c.searchPromise = fetchJson('search.json').then(function (json) {
        var list = normalizeDocs(json);
        if (!list.length) throw new Error('empty search index');
        c.searchDocs = list;
        c.degraded = false;
        S.degraded = false;
        return list;
      }).catch(function () {
        c.searchDocs = S.all;           // 降级：用 docs.json（无正文）
        c.degraded = true;
        S.degraded = true;
        return S.all;
      });
      return c.searchPromise;
    }

    /* ---------------- 查询 ---------------- */

    function runQuery() {
      var my = ++reqSeq;
      var q = str(S.q).trim();
      if (!q && !S.cats.length && !S.tags.length) { renderBrowse(); return; }
      var c = cache();
      if (!c.searchDocs || !c.searchDocs.length) {
        renderSkeletons(6);
        ensureSearchData().then(function () {
          if (my !== reqSeq) return;   // 只让最后一次请求渲染
          computeAndRender();
        }).catch(function () {
          if (my !== reqSeq) return;
          S.failed = true;
          renderResults();
        });
        return;
      }
      computeAndRender();
    }

    function computeAndRender() {
      var t0 = nowMs();
      var out = runSearch(cache().searchDocs, S.q, { cats: S.cats, tags: S.tags, sort: S.sort });
      S.took = nowMs() - t0;
      S.results = out.results;
      S.terms = out.terms;
      S.page = 1;
      S.sel = -1;
      renderResults();
    }

    /* ---------------- 事件 ---------------- */

    var timer = 0;
    var reqSeq = 0;
    function onInput() {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        S.q = input.value;
        S.page = 1;
        syncUrl();
        runQuery();
      }, DEBOUNCE);
    }

    input.addEventListener('input', onInput);
    input.addEventListener('search', onInput);

    // 主题页的搜索框自带 GET 表单；在检索页里拦截提交，改为原地即时检索（无刷新）。
    // JS 不可用时表单照旧工作（渐进增强）。
    try {
      var form = input.form || (input.closest ? input.closest('form') : null);
      if (form && !(form.closest && form.closest('.site-nav'))) {
        form.addEventListener('submit', function (ev) {
          ev.preventDefault();
          window.clearTimeout(timer);
          S.q = input.value;
          S.page = 1;
          syncUrl();
          runQuery();
        });
      }
    } catch (e) { /* ignore */ }

    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        var cards = body.querySelectorAll('.search-result');
        if (!cards.length) return;
        var next = ev.key === 'ArrowDown' ? S.sel + 1 : S.sel - 1;
        if (next < 0) next = cards.length - 1;
        if (next >= cards.length) next = 0;
        select(next, true);
      } else if (ev.key === 'Enter') {
        ev.preventDefault();
        var cards2 = body.querySelectorAll('.search-result');
        var pick = (S.sel >= 0 && S.sel < cards2.length) ? cards2[S.sel] : cards2[0];
        if (pick) {
          var link = pick.querySelector('.search-result-link');
          if (link && link.href) window.location.href = link.href;
        }
      } else if (ev.key === 'Escape') {
        input.value = '';
        S.q = '';
        S.sel = -1;
        S.page = 1;
        syncUrl();
        runQuery();
      }
    });

    try {
      window.addEventListener('popstate', function () {
        var st = parseSearch(window.location.search);
        S.q = st.q; S.cats = st.cats; S.tags = st.tags; S.sort = st.sort;
        input.value = st.q;
        renderFilters();
        runQuery();
      });
    } catch (e) { /* ignore */ }

    /* ---------------- 启动 ---------------- */

    var urlState = parseSearch(window.location.search || window.location.href);
    S.q = urlState.q;
    S.cats = urlState.cats;
    S.tags = urlState.tags;
    S.sort = urlState.sort;
    input.value = S.q;

    try { input.focus({ preventScroll: true }); } catch (e) { try { input.focus(); } catch (e2) { /* ignore */ } }

    Promise.all([
      fetchJson('docs.json').catch(function () { return null; }),
      fetchJson('tags.json').catch(function () { return null; }),
      fetchJson('manifest.json').catch(function () { return null; })
    ]).then(function (res) {
      var docs = normalizeDocs(res[0]);
      var tagsJson = res[1];
      var manifest = res[2];
      if (!docs.length) {
        S.failed = true;
        S.all = [];
        renderResults();
        return;
      }
      S.all = docs;
      cache().docs = docs;
      for (var i = 0; i < docs.length; i++) {
        var d = docs[i];
        if (d && d.id) S.byId[d.id] = d;
      }
      var tl = (tagsJson && Array.isArray(tagsJson.tags)) ? tagsJson.tags : [];
      S.tagList = tl.filter(function (t) { return t && t.name; })
        .map(function (t) { return { name: String(t.name), count: +t.count || 0 }; })
        .sort(function (a, b) { return b.count - a.count; });
      for (var ti = 0; ti < S.tagList.length; ti++) S.tagCount[S.tagList[ti].name] = S.tagList[ti].count;

      var cats = [];
      if (manifest && Array.isArray(manifest.categories)) {
        for (var ci = 0; ci < manifest.categories.length; ci++) {
          var c = String(manifest.categories[ci] || '');
          if (c && cats.indexOf(c) < 0) cats.push(c);
        }
      }
      for (var di = 0; di < docs.length; di++) {
        var cc = str(docs[di].category);
        if (cc && cats.indexOf(cc) < 0) cats.push(cc);
      }
      S.categories = cats;
      S.ready = true;
      renderFilters();
      runQuery();
    }).catch(function () {
      S.failed = true;
      renderResults();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSearch);
  } else {
    bootSearch();
  }
})();
