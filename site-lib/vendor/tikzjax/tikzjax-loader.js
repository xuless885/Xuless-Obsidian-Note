/*!
 * tikzjax-loader.js — site bootstrap for the vendored TikZ -> SVG engine.
 *
 * NOT part of upstream tikzjax. Hand-written for this site (see site-lib/vendor/NOTICE.md).
 * Its job is to be the *only* thing a content page has to reference:
 *
 *     <script defer src="site-lib/vendor/tikzjax/tikzjax-loader.js"></script>
 *
 * and it will, in order:
 *   1. resolve its own directory (works from a page at ANY depth, and with/without
 *      <base href>, because it reads its own resolved .src),
 *   2. inject tikzjax.css and tikzjax-fonts.css,
 *   3. probe the environment (Web Worker + WebAssembly + Blob + MutationObserver),
 *   4. lazily load the 6.7 MB engine ONLY if the page actually contains
 *      <script type="text/tikz">   (or when forced with data-tikzjax="eager"),
 *   5. wrap each TikZ block in <.tikzjax-host> so it can be sized and centred,
 *   6. degrade to visible, copy-pasteable source when rendering cannot work or hangs.
 *
 * Options on the loader <script> tag (all optional):
 *   data-tikzjax="eager|lazy"    default lazy  — eager always downloads the engine
 *   data-tikzjax-theme="off"     default on    — disable dark-mode colour adaptation
 *   data-tikzjax-wrap="off"      default on    — do not add .tikzjax-host wrappers
 *   data-tikzjax-align="left"    default centre
 *   data-tikzjax-timeout="45000" default 45 s  — ms before a stuck spinner degrades; "off" disables
 *   data-tikzjax-engine="..."    override the engine url
 *   data-tikzjax-css="off"       do not inject tikzjax.css / tikzjax-fonts.css
 *
 * Public API:  window.TikzJaxRender = { version, state, base, isSupported(),
 *                                      ensureLoaded(), refresh(root), blocks() }
 *
 * Licensed MIT, same terms as the rest of this site's own code.
 */
(function () {
  'use strict';

  var VERSION = '1.0.0';
  var TIKZ_TYPE = 'text/tikz';
  var DEFAULT_TIMEOUT_MS = 45000;

  /* ---------------------------------------------------------- self location */

  function findSelf() {
    if (document.currentScript) return document.currentScript;
    // currentScript can be null (async/deferred edge cases) — fall back to a scan.
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) {
      var s = all[i];
      if (s.src && /\/tikzjax-loader(\.min)?\.js([?#]|$)/.test(s.src)) return s;
    }
    return null;
  }

  var SELF = findSelf();
  var OPT = (SELF && SELF.dataset) || {};

  // .src is already absolutised by the browser, so this is correct even when the
  // page sets <base href="../.."> (which is this site's convention for deep pages).
  var BASE = (function () {
    var src = (SELF && SELF.src) || '';
    if (!src) return '';
    src = src.replace(/[?#][\s\S]*$/, '');
    var cut = src.lastIndexOf('/');
    return cut >= 0 ? src.slice(0, cut + 1) : '';
  })();

  var ENGINE_URL = OPT.tikzjaxEngine || (BASE + 'tikzjax.js');
  var CSS_URL = BASE + 'tikzjax.css';
  // Per-block attributes that change what the engine compiles. They are read off
  // the host element by the engine, so `wrap()` mirrors them from the <script>.
  var BLOCK_OPTION_ATTRS = [
    'data-tikz-libraries',
    'data-tex-packages',
    'data-add-to-preamble',
    'data-tikz-options'
  ];
  // dvi2html emits <text font-family="cmmi10">&#174;</text> — Computer Modern glyph
  // slots, not Unicode. Without these faces `$\alpha\beta$` renders as garbage.
  var FONT_CSS_URL = BASE + 'tikzjax-fonts.css';
  var TIMEOUT_MS = OPT.tikzjaxTimeout === 'off' ? 0
    : (parseInt(OPT.tikzjaxTimeout, 10) > 0 ? parseInt(OPT.tikzjaxTimeout, 10) : DEFAULT_TIMEOUT_MS);
  var EAGER = OPT.tikzjax === 'eager';
  var ADAPT_THEME = OPT.tikzjaxTheme !== 'off';
  var DO_WRAP = OPT.tikzjaxWrap !== 'off';
  var ALIGN = OPT.tikzjaxAlign || '';

  /* ------------------------------------------------------------ environment */

  function isSupported() {
    try {
      if (typeof Worker !== 'function') return false;
      if (typeof Blob !== 'function') return false;
      if (typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return false;
      if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') return false;
      if (typeof MutationObserver !== 'function') return false;   // the engine needs it
      if (!document.getElementsByTagName('body')[0]) return false; // the engine observes body
      return true;
    } catch (e) {
      return false;
    }
  }

  function unsupportedReason() {
    if (typeof Worker !== 'function') return 'no-web-worker';
    if (typeof Blob !== 'function' || typeof URL === 'undefined' ||
        typeof URL.createObjectURL !== 'function') return 'no-blob-url';
    if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') return 'no-webassembly';
    if (typeof MutationObserver !== 'function') return 'no-mutation-observer';
    return 'unsupported';
  }

  /* ----------------------------------------------------------- DOM plumbing */

  function tikzBlocks(root) {
    var scope = root || document;
    var list = scope.querySelectorAll('script[type="' + TIKZ_TYPE + '"]');
    return Array.prototype.slice.call(list);
  }

  function injectCss() {
    if (OPT.tikzjaxCss === 'off' || !CSS_URL) return;
    var head = document.head || document.documentElement;
    var wanted = [[CSS_URL, 'data-tikzjax-css'], [FONT_CSS_URL, 'data-tikzjax-fonts']];
    for (var i = 0; i < wanted.length; i++) {
      if (document.querySelector('link[' + wanted[i][1] + ']')) continue;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = wanted[i][0];
      link.setAttribute(wanted[i][1], '');
      head.appendChild(link);
    }
  }

  /** Wrap a TikZ block so we can size/centre it and recover its source if rendering dies. */
  function wrap(scriptEl) {
    var host = document.createElement('span');
    host.className = 'tikzjax-host';
    host.setAttribute('data-tikzjax-state', 'pending');
    if (ALIGN) host.setAttribute('data-tikzjax-align', ALIGN);
    host.__tikzjaxSrc = scriptEl.textContent || '';
    // The engine reads its options from the HOST element, not from the inner
    // <script> (see tikzjax.js: `H.texify(src, Object.assign({}, A.dataset))`,
    // where A is the element the spinner replaced). So every per-block option
    // that alters the output has to be mirrored onto the host, otherwise
    // data-tikz-libraries / data-tex-packages / data-add-to-preamble are
    // silently dropped and figures needing them fail to compile.
    for (var i = 0; i < BLOCK_OPTION_ATTRS.length; i++) {
      var name = BLOCK_OPTION_ATTRS[i];
      var val = scriptEl.getAttribute(name);
      if (val != null && !host.hasAttribute(name)) host.setAttribute(name, val);
    }
    if (scriptEl.parentNode) scriptEl.parentNode.insertBefore(host, scriptEl);
    host.appendChild(scriptEl);
    return host;
  }

  /** Replace a stuck/failed block with its own source, visible and copyable. */
  function degrade(host, reason) {
    if (!host) return;
    if (host.getAttribute('data-tikzjax-state') === 'failed') return;
    host.setAttribute('data-tikzjax-state', 'failed');
    var src = host.__tikzjaxSrc;
    if (src == null) {
      var s = host.querySelector('script[type="' + TIKZ_TYPE + '"]');
      src = s ? s.textContent : '';
    }
    var out = document.createElement('span');
    out.className = 'tikzjax-fallback';
    out.setAttribute('data-tikzjax-error', reason || 'render-failed');
    out.textContent = src || '';
    host.innerHTML = '';
    host.appendChild(out);
  }

  /** A bare TikZ block (engine bypassed or never loaded) still shows its source. */
  function degradeBare(scriptEl, reason) {
    var host = scriptEl.parentNode && scriptEl.parentNode.classList &&
      scriptEl.parentNode.classList.contains('tikzjax-host') ? scriptEl.parentNode : null;
    if (host) return degrade(host, reason);
    var out = document.createElement('span');
    out.className = 'tikzjax-fallback';
    out.setAttribute('data-tikzjax-error', reason || 'unsupported');
    out.textContent = scriptEl.textContent || '';
    scriptEl.parentNode.replaceChild(out, scriptEl);
  }

  /* ------------------------------------------- dark/light colour adaptation */

  // Upstream tikzjax hard-codes black strokes/fills, which are invisible on this
  // site's dark theme. Remap literal black -> currentColor and literal white ->
  // the elevated surface colour. Safe in light mode: currentColor is dark there.
  var COLOR_MAP = {
    '#000': 'currentColor', '#000000': 'currentColor', 'black': 'currentColor',
    '#fff': 'var(--vendor-tikz-paper, var(--bg-elev, #fff))',
    '#ffffff': 'var(--vendor-tikz-paper, var(--bg-elev, #fff))',
    'white': 'var(--vendor-tikz-paper, var(--bg-elev, #fff))'
  };
  var COLOR_ATTRS = ['fill', 'stroke', 'color', 'stop-color', 'flood-color', 'lighting-color'];

  function adaptColors(svg) {
    if (!svg || svg.nodeType !== 1 || !svg.querySelectorAll) return;
    var nodes = [svg].concat(Array.prototype.slice.call(svg.querySelectorAll('*')));
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el.getAttribute) continue;
      for (var a = 0; a < COLOR_ATTRS.length; a++) {
        var name = COLOR_ATTRS[a];
        var v = el.getAttribute(name);
        if (v == null) continue;
        var key = String(v).trim().toLowerCase();
        if (COLOR_MAP[key]) el.setAttribute(name, COLOR_MAP[key]);
      }
      var style = el.getAttribute('style');
      if (style && /(?:^|;)\s*(fill|stroke|color|stop-color)\s*:/.test(style)) {
        style = style.replace(/((?:^|;)\s*(?:fill|stroke|color|stop-color)\s*:\s*)([^;]+)/gi,
          function (m, head, val) {
            var k = String(val).trim().toLowerCase();
            return head + (COLOR_MAP[k] || val);
          });
        el.setAttribute('style', style);
      }
    }
  }

  /* ------------------------------------------------------------- lifecycle */

  var state = 'idle';           // idle | loading | ready | unsupported | error
  var enginePromise = null;
  var injected = false;
  var watchdog = null;
  var lazyObserver = null;

  function onRendered(ev) {
    var t = ev.target;
    var host = null;
    if (t && t.closest) host = t.closest('.tikzjax-host');
    if (!host && t && t.parentNode && t.parentNode.classList &&
        t.parentNode.classList.contains('tikzjax-host')) host = t.parentNode;
    if (ADAPT_THEME && t && t.tagName && String(t.tagName).toLowerCase() === 'svg') adaptColors(t);
    if (host) host.setAttribute('data-tikzjax-state', 'done');
  }

  function failAllPending(reason) {
    var hosts = document.querySelectorAll('.tikzjax-host[data-tikzjax-state="pending"]');
    for (var i = 0; i < hosts.length; i++) {
      var h = hosts[i];
      // The engine replaces its spinner with either the rendered <svg> or (on a
      // TeX error) its own source fallback. The spinner is the only thing in the
      // page carrying SMIL <animate>, so its absence means the engine already
      // decided — never clobber that decision with a "timeout".
      if (!h.querySelector('animate')) {
        h.setAttribute('data-tikzjax-state', h.querySelector('svg') ? 'done' : 'failed');
        continue;
      }
      degrade(h, reason);
    }
  }

  function loadEngine() {
    if (enginePromise) return enginePromise;
    if (window.TikzJax) { state = 'ready'; enginePromise = Promise.resolve(); return enginePromise; }

    state = 'loading';
    enginePromise = new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.src = ENGINE_URL;
      el.setAttribute('data-tikzjax-engine', '');
      el.onload = function () {
        state = 'ready';
        // The engine swaps each block for a spinner immediately, then renders
        // asynchronously. Anything still spinning after the grace period is stuck
        // (blocked worker/wasm, CSP, OOM) — show the source instead of lying.
        if (TIMEOUT_MS > 0) {
          watchdog = setTimeout(function () { failAllPending('timeout'); }, TIMEOUT_MS);
        }
        resolve();
      };
      el.onerror = function () {
        state = 'error';
        failAllPending('engine-load-failed');
        reject(new Error('tikzjax engine failed to load: ' + ENGINE_URL));
      };
      (document.head || document.documentElement).appendChild(el);
    }).catch(function (e) {
      if (window.console) console.error('[tikzjax-loader]', e && e.message ? e.message : e);
      return null;
    });
    return enginePromise;
  }

  function observeForLateBlocks() {
    if (lazyObserver || typeof MutationObserver !== 'function') return;
    var body = document.getElementsByTagName('body')[0];
    if (!body) return;
    lazyObserver = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType !== 1) continue;
          if ((n.tagName && String(n.tagName).toLowerCase() === 'script' &&
               n.getAttribute('type') === TIKZ_TYPE) ||
              (n.querySelector && n.querySelector('script[type="' + TIKZ_TYPE + '"]'))) {
            start();
            return;
          }
        }
      }
    });
    lazyObserver.observe(body, { childList: true, subtree: true });
  }

  function stopObserving() {
    if (lazyObserver) { lazyObserver.disconnect(); lazyObserver = null; }
  }

  function start() {
    if (state === 'unsupported' || injected) return;
    var blocks = tikzBlocks(document);

    if (!isSupported()) {
      state = 'unsupported';
      for (var i = 0; i < blocks.length; i++) degradeBare(blocks[i], unsupportedReason());
      stopObserving();
      return;
    }
    if (!blocks.length && !EAGER) { observeForLateBlocks(); return; }

    injectCss();
    if (DO_WRAP) {
      // Wrapping must happen BEFORE the engine starts: the engine installs its own
      // MutationObserver over <body>, and would otherwise re-process blocks we move.
      for (var k = 0; k < blocks.length; k++) {
        var p = blocks[k].parentNode;
        if (p && p.classList && p.classList.contains('tikzjax-host')) continue;
        wrap(blocks[k]);
      }
    }
    stopObserving();
    injected = true;
    document.addEventListener('tikzjax-load-finished', onRendered);
    loadEngine();
  }

  var api = {
    version: VERSION,
    base: BASE,
    engineUrl: ENGINE_URL,
    fontCssUrl: FONT_CSS_URL,
    isSupported: isSupported,
    ensureLoaded: function () {
      injectCss(); injected = true;
      document.addEventListener('tikzjax-load-finished', onRendered);
      return loadEngine();
    },
    refresh: function (root) {
      // Only meaningful before the engine is injected; afterwards the engine's own
      // MutationObserver owns newly added blocks (see README).
      if (!injected) start();
      return enginePromise || Promise.resolve();
    },
    blocks: function () { return tikzBlocks(document); }
  };
  Object.defineProperty(api, 'state', { get: function () { return state; }, enumerable: true });
  window.TikzJaxRender = api;

  // ------------------------------------------------------------- entry point
  function boot() { start(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  if (TIMEOUT_MS > 0 && typeof window.addEventListener === 'function') {
    window.addEventListener('load', function () {
      if (state === 'ready' && !watchdog) {
        watchdog = setTimeout(function () { failAllPending('timeout'); }, TIMEOUT_MS);
      }
    });
  }
})();
