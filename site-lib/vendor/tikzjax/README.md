# `site-lib/vendor/tikzjax/` — offline TikZ → SVG renderer

The 191 `tikzpicture` blocks in the HKDSE content are rendered **in the browser**,
**offline**, by a TeX Live WebAssembly engine that was lifted out of the user's
Obsidian plugin and made to run on a plain web page.

Start with [`../README.md`](../README.md) for the page-side usage. This file documents
the engine itself: how it boots, when it renders, what is verified, and what happens
when it fails.

---

## 1. How the extraction works (and why it is done this way)

`obsidian-tikzjax`'s `main.js` is an esbuild bundle whose last-ranked module is a
single template literal:

```js
// _yyfs0ydln:/home/runner/work/obsidian-tikzjax/obsidian-tikzjax/tikzjax.js
var tikzjax_default = `(()=>{var A={147:A=>{"use strict";A.exports='(()=>{var A={3867:…`;
```

The plugin's only use of it is:

```js
loadTikZJax(doc) {
  const s = document.createElement("script");
  s.id = "tikzjax";
  s.innerText = tikzjax_default;      // ← execute it as a real script
  doc.body.appendChild(s);
}
```

So the "runtime global" the plugin relies on is not a global at all: the bundle is an
**unmodified upstream tikzjax build** that self-activates on execution and keys off
`window.TikzJax`. There is nothing Obsidian-specific inside it — it only touches
`document`, `window`, `Blob`, `Worker`, `URL.createObjectURL`, `MutationObserver` and
IndexedDB. (Confirmed by scanning the decoded bundle for `obsidian`, `CodeMirror`,
`require(`, `process.`, `node:` — all zero occurrences.)

**Therefore the "adapter layer" is thin by construction.** `.build/vendor/fetch_vendor.js`
evaluates that template literal (letting the JS engine do the unescaping rather than
hand-rolling it), verifies the result against a pinned sha256, applies exactly one
documented patch, and writes it out verbatim. The genuinely new code is
`tikzjax-loader.js`, which fixes the things upstream does not do: lazy loading,
environment detection, graceful degradation, dark-theme colours, and deep-page path
resolution.

### Boot sequence (upstream, unchanged)

```js
window.TikzJax || (window.TikzJax = true, … )      // idempotent guard
'H' = create worker from createObjectURL(new Blob([workerSource]))   // no network
document.readyState == 'complete' ? w() : window.addEventListener('load', w)
w(): scan all <script type="text/tikz">, install a MutationObserver on <body>
```

`w()` utils each block into a spinner `<svg>` immediately, then compiles them **one at
a time** (`for (let A of v) await r(A)`), caches the result in IndexedDB
(`name:"TikzJax", storeName:"svgImages"`, key = MD5 of `dataset` + source) and fires a
bubbling `tikzjax-load-finished` event.

Because the worker is built from a Blob URL and every TeX asset is an inline
`data:application/gzip;base64,` string, **no request ever leaves the page**.

---

## 2. What is verified — and how

| # | Claim | Evidence |
|---|-------|----------|
| 1 | The engine renders a real picture | `node .build/test_tikz_render.js` — headless Chrome, `<svg>` with `viewBox="-72 -72 28.85 28.85"` and real `<path>` geometry |
| 2 | It renders with **zero network access** | same run uses `--host-resolver-rules="MAP * ~NOTFOUND"`, and a positive control confirms `fetch('https://example.com')` is blocked in that very browser instance |
| 3 | The runtime has **0 external URLs** | `node .build/test_vendor_offline.js` — lexer-classified scan (comments/strings/regex distinguished); the only live tokens are the W3C XML namespaces and one localforage error-message doc link |
| 4 | Failures degrade to visible source, never a broken external `<img>` | the patch in `NOTICE.md` §2, exercised by the broken-TikZ block in test #1 |
| 5 | Every asset is served with the right bytes | `node .build/vendor/check_http.js` |
| 6 | The shipped engine reproduces byte-for-byte | `node .build/vendor/fetch_vendor.js --check` |

### Input forms actually tested in a browser

| Form | Result |
|------|--------|
| `\begin{document}…\end{document}` around the picture (**what the 182 fenced blocks contain**) | ✅ renders |
| bare `\begin{tikzpicture}…\end{tikzpicture}` (**9 blocks inside `$$…$$`**) | ❌ fails — `Error: Could not find file input.dvi` (LaTeX: *Missing \begin{document}*). Must be wrapped. |
| bare + `data-tikz-libraries="arrows.meta"`, using `-{Stealth}` | ✅ renders |
| bare + `-{Stealth}` with **no** library loaded | ❌ fails — the library is genuinely required |
| `data-tex-packages='{"amsmath":""}'` | ✅ renders |
| `data-add-to-preamble="\usetikzlibrary{arrows.meta}"` | ✅ renders |
| `data-tikz-options="scale=2"` | ❌ fails — `texify()` emits a bare `[scale=2]` *before* the source, i.e. before `\begin{document}`, which is a fatal LaTeX error. Broken upstream; use `\begin{tikzpicture}[scale=2]`. |

> The upstream README shows a bare `\begin{tikzpicture}` example, but that is stale
> relative to the shipped build: its format is dumped from
> `\documentclass[margin=0pt]{standalone}` (see the tikzjax README's "How does this
> work?"), so the document environment is mandatory.

---

## 3. Fonts are load-bearing, not cosmetic

`dvi2html` emits **text**, not outlines:

```html
<text font-family="cmmi10" font-size="10" fill="currentColor">®</text>
```

That `®` is the **cmmi10 glyph slot** `0xAE` — TeX writes font-relative character
codes, not Unicode. `$\alpha\beta$` produces those exact bytes. So without the real
Computer Modern faces the browser happily draws `®¯` where `αβ` belongs: silent,
plausible-looking garbage. This is why the 140 BaKoMa `.ttf` files are vendored and
`tikzjax-fonts.css` is injected alongside the engine.

They were recovered from the plugin's 4.7 MB `styles.css`, which is large precisely
because it holds all 140 faces as base64 data URIs. We re-materialise them as real
files (as upstream tikzjax does) — 4.79 MB of CSS becomes 3.43 MB of `.ttf` plus a
13.9 KB sheet, and the browser only downloads the handful of faces a page actually
uses.

Their `name` tables were read to confirm the copyright, which is what
`fonts/LICENSE-BaKoMa-Fonts-Licence.txt` ships:

```
Copyright (C) 1994, Basil K. Malyshev. All Rights Reserved. BaKoMa Fonts Collection, Level-B.
Copyright (C) 1994, 1995, Basil K. Malyshev. All Rights Reserved. BaKoMa Fonts Collection, Level-C.
```

---

## 4. Colour adaptation (site-specific addition)

Upstream hard-codes `black`/`#000` for strokes and fills, which is invisible on this
site's `html[data-theme="dark"]`. After each successful render the loader walks the
`<svg>` and remaps presentation attributes (`fill`, `stroke`, `color`, `stop-color`,
`flood-color`, `lighting-color`) and inline `style` declarations:

| From | To |
|------|----|
| `#000`, `#000000`, `black` | `currentColor` |
| `#fff`, `#ffffff`, `white` | `var(--vendor-tikz-paper, var(--bg-elev, #fff))` |

In light mode `currentColor` is already dark, so nothing changes visually; in dark
mode the lines follow the text colour. This is the same trick obsidian-tikzjax uses
(its `colorSVGinDarkMode`). Disable with `data-tikzjax-theme="off"` on the loader tag,
and override the paper colour by defining `--vendor-tikz-paper`.

Note this adapts the **DOM copy only** — the IndexedDB cache keeps the original colours,
so a theme switch does not require a re-render.

---

## 5. Failure modes and what the user sees

| Situation | Detected by | Result |
|-----------|-------------|--------|
| No Web Worker / WebAssembly / Blob / MutationObserver | `isSupported()` pre-flight, engine never loaded | `.tikzjax-fallback` with reason `no-web-worker`, `no-webassembly`, `no-blob-url`, `no-mutation-observer` |
| Engine script 404s / blocked by CSP | `<script>.onerror` | every pending block → `engine-load-failed` |
| TeX compile error (bad TikZ, missing library) | upstream `try/catch` → our patched branch | `.tikzjax-fallback` with reason `render-failed`, source preserved |
| Worker blocked (`worker-src` CSP), WASM blocked, out of memory — spinner never resolves | 45 s watchdog (configurable / `off`) | `.tikzjax-fallback` with reason `timeout` |
| Page has no TikZ at all | block scan | engine is never downloaded |

The watchdog is careful about one thing: upstream replaces its spinner with a
rendered `<svg>` *or* with its own fallback, but never tells our wrapper. So before
degrading a block the watchdog checks whether the spinner is still there (it is the
only element in the page carrying SMIL `<animate>`); if it is not, the engine has
already decided and the watchdog records that decision instead of overwriting it.

---

## 6. Known limitations

1. **First render is slow** (~20–40 s per picture measured in headless Chrome; see the
   performance note in [`../README.md`](../README.md)). Upstream behaviour; the fix is
   build-time pre-rendering.
2. **Blocks added after the engine is running are not wrapped** in `.tikzjax-host`, so
   they miss the responsive/`overflow:visible` styling. The engine's own
   `MutationObserver` still renders them. Wrapping them ourselves would make the
   engine's observer see the wrapper and re-process the block twice, so we deliberately
   do not.
3. **`refresh()` is only meaningful before the engine is injected**; afterwards the
   engine owns new nodes.
4. **No-JS pages show nothing** for a TikZ block — inherent to `<script type="text/tikz">`.
5. **Polyfill-free.** ES5 syntax only, but it does need a browser with WebAssembly and
   Web Workers (everything except very old browsers).
6. **`file://` will not work in Chrome** — Blob workers are blocked on the file scheme.
   Use any HTTP server; GitHub Pages is fine.

---

## 7. Regenerating

```bash
node .build/vendor/fetch_vendor.js          # verify pinned sha256, re-extract, re-patch
node .build/vendor/fetch_vendor.js --check  # prove the on-disk copy is reproducible
```

Sources are pinned by sha256 in that script; if the plugin is ever updated, the run
fails loudly rather than silently shipping a different engine. See
[`../NOTICE.md`](../NOTICE.md) for provenance and licensing, and
`engine-inventory.json` for the full list of the 215 TeX assets inside.
