# `site-lib/vendor/` — localised rendering engines

This directory makes the site's math and diagrams work **with no network access**.
Nothing here is fetched from a CDN at runtime; the third-party inventory and
licenses are in [`NOTICE.md`](NOTICE.md).

```
site-lib/vendor/
├── NOTICE.md                  ← third-party inventory, versions, licenses, provenance
├── README.md                  ← this file: how to reference the vendor code from a page
├── mathjax/
│   ├── LICENSE                (Apache-2.0)
│   └── README.md              ← why there is NO client-side MathJax runtime here
└── tikzjax/
    ├── tikzjax-loader.js      ← THE ENTRY POINT. A page includes only this.
    ├── tikzjax.js             ← 6.7 MB TeX engine (loaded on demand by the loader)
    ├── tikzjax.css            ← picture layout + fallback styling
    ├── tikzjax-fonts.css      ← 140 @font-face rules for the Computer Modern faces
    ├── fonts/*.ttf            ← 140 BaKoMa Computer Modern faces (3.4 MB)
    ├── engine-inventory.json  ← every TeX asset inside the engine, with sha256
    ├── VENDOR-MANIFEST.json   ← pinned versions + hashes + the applied patch list
    └── LICENSE-*              ← LPPL-1.3c, MIT, GPL-3.0, Apache-2.0, BaKoMa
```

---

## How a page references it

**One `<script>` tag. That is the entire contract.**

```html
<script defer src="site-lib/vendor/tikzjax/tikzjax-loader.js"></script>
```

### Relative-path rules (this site has no build step and is a GitHub Pages *project* site)

Root-absolute paths (`/site-lib/...`) are **forbidden** — they would break under the
project sub-path. Use one of these two forms:

| Page location | With `<base href>` (this site's convention) | Without `<base>` |
|---|---|---|
| `index.html` (root) | `site-lib/vendor/tikzjax/tikzjax-loader.js` | `./site-lib/vendor/tikzjax/tikzjax-loader.js` |
| `blog/x.html` (depth 1) | `site-lib/vendor/tikzjax/tikzjax-loader.js` | `../site-lib/vendor/tikzjax/tikzjax-loader.js` |
| `hkdse-course/x.html` (depth 1) | `site-lib/vendor/tikzjax/tikzjax-loader.js` | `../site-lib/vendor/tikzjax/tikzjax-loader.js` |
| **`hkdse-course/习题册草稿/x.html` (depth 2)** | `site-lib/vendor/tikzjax/tikzjax-loader.js` | **`../../site-lib/vendor/tikzjax/tikzjax-loader.js`** |
| `a/b/c/x.html` (depth 3) | `site-lib/vendor/tikzjax/tikzjax-loader.js` | `../../../site-lib/vendor/tikzjax/tikzjax-loader.js` |

Every existing content page carries `<base href="../..">` (or `..` for depth 1), so the
plain `site-lib/...` form — the same one already used for `site-lib/scripts/site.js` —
works at **any** depth. Use that unless a page deliberately has no `<base>`.

You only ever have to get *that one path* right: the loader reads its own resolved
`document.currentScript.src`, so the engine, the CSS and the font sheet are always
found next to it, whatever depth the page is at.

### What the loader does on its own

1. Resolves its own directory and injects `tikzjax.css` + `tikzjax-fonts.css`.
2. Checks the environment (Web Worker + WebAssembly + `Blob` + `URL.createObjectURL` + `MutationObserver`).
3. **Lazily** loads the 6.7 MB engine — only if the page actually contains a
   `<script type="text/tikz">`. A page with no TikZ pays ~0 bytes.
4. Wraps each TikZ block in `<span class="tikzjax-host" data-tikzjax-state="pending">`
   and lets the engine replace it with an `<svg>`; the state becomes `done`.
5. On any failure — unsupported browser, engine 404, TeX error, or a hang — replaces
   the picture with `<span class="tikzjax-fallback" data-tikzjax-error="…">`
   containing the **original source**, visible and copyable. Never a broken image,
   never an external URL.

### Authoring a picture in a page

```html
<p>
  <script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=1.5]
      \draw[->] (0,0) -- (2,1);
    \end{tikzpicture}
    \end{document}
  </script>
</p>
```

> **The `\begin{document}` / `\end{document}` wrapper is required.** Verified in a real
> browser: a bare `\begin{tikzpicture}` fails with the engine's
> `Error: Could not find file input.dvi` (LaTeX's *Missing \begin{document}*), because
> the engine's preloaded format is the `standalone` class. Do **not** add
> `\documentclass` or `\usepackage{tikz}` — the format already provides them.

Optional per-block attributes, read from the `<script>` element's own `data-*`
(documented in full in [`tikzjax/README.md`](tikzjax/README.md)):

| Attribute | Effect | Verified |
|---|---|---|
| `data-tikz-libraries="arrows.meta,calc"` | prepends `\usetikzlibrary{…}` | ✅ works |
| `data-tex-packages='{"amsmath":""}'` | prepends `\usepackage{…}` | ✅ works |
| `data-add-to-preamble="…"` | raw preamble injection | ✅ works |
| `data-tikz-options="scale=2"` | **BROKEN upstream** — emits a bare `[scale=2]` *before* `\begin{document}`, which is a fatal LaTeX error. Put options on the environment instead: `\begin{tikzpicture}[scale=2]`. | ❌ does not work |
| `data-width` / `data-height` | size of the placeholder spinner only | — |

A picture using `arrows.meta` syntax such as `-{Stealth}` **fails unless the library
is loaded** — either add `data-tikz-libraries="arrows.meta"` or put
`\usetikzlibrary{arrows.meta}` inside the block. Both were tested and work.

### Loader options (attributes on the loader `<script>` itself)

| Attribute | Default | Meaning |
|---|---|---|
| `data-tikzjax="eager"` | `lazy` | download the engine even if no block exists yet (use when TikZ is inserted at runtime) |
| `data-tikzjax-theme="off"` | on | disable dark-mode colour adaptation |
| `data-tikzjax-wrap="off"` | on | do not add `.tikzjax-host` wrappers |
| `data-tikzjax-align="left"` | centre | picture alignment (`left` / `right`) |
| `data-tikzjax-timeout="45000"` | `45000` | ms before a stuck spinner degrades to source; `off` disables |
| `data-tikzjax-css="off"` | on | do not inject the two stylesheets |
| `data-tikzjax-engine="…"` | sibling `tikzjax.js` | override the engine URL |

### No-JS

Without JavaScript a `<script>` element renders nothing at all, so a TikZ picture
simply disappears. Pages that are *mostly* diagrams should add a `<noscript>` note.
This is the one case the loader cannot cover.

### Performance, honestly

The engine is 6.7 MB raw / **4.68 MiB gzipped** over the wire. First render is slow:
measured **~20–40 s per picture** in headless Chrome on this machine, because upstream
re-instantiates the 3.2 MB WebAssembly module for every `texify()` call and pictures
are compiled strictly one after another. Renders are then **cached in IndexedDB**
(keyed by an MD5 of the source + `data-*`), so reloading a page is fast — the cache is
per-origin and offline-friendly. A first visit to a page with four pictures can
therefore take a couple of minutes; subsequent visits are instant.

If that first-visit cost matters, the fix is a build-time pre-render (the same thing
already done for MathJax), not a change to this vendor code.

---

## Verification

| Check | Command |
|---|---|
| Every vendor file is served (HTTP 200 + exact byte count), no root-absolute paths | `python -m http.server 18899` then `node .build/vendor/check_http.js 18899` |
| Zero external URLs in anything that executes | `node .build/test_vendor_offline.js` |
| Real TikZ → SVG render, in a browser with all DNS blackholed | `node .build/test_tikz_render.js` |
| Size / budget | `node .build/vendor/size_report.js` |
| Re-derive the engine and diff against what is on disk | `node .build/vendor/fetch_vendor.js --check` |
