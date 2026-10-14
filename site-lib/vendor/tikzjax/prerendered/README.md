# `site-lib/vendor/tikzjax/prerendered/` — build-time TikZ output

**178 static SVGs** produced at build time from the 186 `tikzpicture` blocks in the 9
content pages, plus [`index.json`](index.json) which maps each original TikZ source to
its file. Pages consume these instead of downloading the 6.7 MB TeX engine and
compiling in the browser.

| | |
|---|---|
| distinct figures rendered | **178** of 183 (186 blocks, 183 after dedupe) |
| blocked | **5** — see [§5](#5-figures-that-could-not-be-rendered); all listed, none skipped |
| total size | **≈563 KiB** of SVG + ≈134 KiB `index.json` (avg ≈3.2 KiB per figure) |
| generator | `.build/tikz/prerender_tikz.js` |
| engine | `site-lib/vendor/tikzjax/tikzjax.js` (offline, all DNS blackholed during render) |
| fonts | `site-lib/vendor/tikzjax/tikzjax-fonts.css` + `fonts/*.ttf` |

---

## 1. `index.json` contract

```jsonc
{
  "schema": 1,
  "generatedBy": ".build/tikz/prerender_tikz.js",
  "engine": "site-lib/vendor/tikzjax/tikzjax.js",
  "fontsCss": "site-lib/vendor/tikzjax/tikzjax-fonts.css",
  "meta": { "lastRun": "...", "distinctFigures": 183, "totalBlocksOnPages": 186, "pages": 9 },
  "figures": {
    "<sha256 of the ORIGINAL tikz source>": {
      "file": "1c18f84edf09cba7.svg",   // relative to this directory
      "sha256": "<same 64-hex key>",
      "w": 28.85, "h": 28.85,           // viewBox width/height in pt (for width/height attrs)
      "libraries": ["patterns"],         // data-tikz-libraries the block needed
      "bytes": 4021,
      "colors": "currentColor",          // black/white were remapped for theme support
      "autoWrapped": false,              // we had to add \begin{document}...\end{document}
      "normalized": ["strip-blank-lines-inside-option-lists"],  // omitted when empty
      "usedOnPages": 3,
      "ok": true
    },
    "<another key>": { "ok": false, "error": "...", "sourceSnippet": "..." }  // §5
  }
}
```

**The key is a sha256 of the *original* TikZ source**, before any normalisation, so a
page generator can look a figure up with a plain hash of the block it just emitted. If
a block also carries output-affecting `data-*` attributes, the key is
`sha256(source + "\0" + "data-tikz-libraries=..." + "\0" + ...)` over those attributes
in the fixed order `data-tikz-libraries`, `data-tex-packages`, `data-add-to-preamble`.

Only the first 16 hex characters are used for the **file name**, so file names are
short; the full hash stays in the key and in `sha256`.

Consumers must check `ok` before using `file` — a key can exist with `ok: false`.

## 2. How a page consumes a figure

### Recommended: inline the SVG at build time

```html
<figure class="tikz" data-tikz-sha="1c18f84edf09cba7...">
  <!-- contents of prerendered/1c18f84edf09cba7.svg, inlined verbatim -->
</figure>
```

and load the fonts **once per page**, with a path relative to the page:

```html
<!-- for hkdse-course/<子目录>/xxx.html  (depth 2, no <base>) -->
<link rel="stylesheet" href="../../site-lib/vendor/tikzjax/tikzjax-fonts.css">

<!-- every page on this site already carries <base href="../..">, so this also works: -->
<link rel="stylesheet" href="site-lib/vendor/tikzjax/tikzjax-fonts.css">
```

The pages here all set `<base href="../..">` (or `..` at depth 1), which is why the
plain `site-lib/...` form — the same one they already use for `site-lib/scripts/site.js`
— is correct at any depth. Root-absolute (`/site-lib/...`) is forbidden: this is a
GitHub Pages **project** site.

Why inline is the right default:

1. **Dark mode works.** Black strokes and fills were rewritten to `currentColor` at
   build time, so a figure follows the page's text colour. In an `<img>` an external
   SVG document has its own `color`, so `currentColor` resolves to black — invisible
   on this site's dark theme.
2. **Fonts resolve.** Inline markup inherits the page's `@font-face` rules. An
   `<img>`-loaded SVG is a separate document that does **not** inherit the page's
   stylesheets, so every one of the 178 files would have to embed its own `@font-face`
   block (or the TeX glyph slots render as garbage — see §4).
3. **No JS, no flash, no layout shift**, and 178 fewer HTTP requests.
4. Text stays selectable and searchable.

Cost: page HTML grows by ~3.2 KiB per figure (ch08's 80 blocks ≈ +256 KiB raw, but SVG
markup gzips to roughly a fifth of that — ≈+50 KiB over the wire).

### Fallback: external `<img>`

```html
<img src="../../site-lib/vendor/tikzjax/prerendered/1c18f84edf09cba7.svg"
     width="28.85pt" height="28.85pt" alt="…" loading="lazy">
```

`w`/`h` in `index.json` are there so `width`/`height` can be set and avoid layout
shift. Use this only if page weight matters more than dark mode; if you do, add

```css
html[data-theme="dark"] img[src*="/prerendered/"] { filter: invert(1) hue-rotate(180deg); }
```

and accept that author-specified colours get inverted too. **Do not** ship `<img>`
without either that rule or in-file `@font-face` rules — you will get either invisible
figures or garbled text.

## 3. Regenerating

```bash
node .build/tikz/prerender_tikz.js                  # render everything missing
node .build/tikz/prerender_tikz.js --resume         # skip figures already in index.json
node .build/tikz/prerender_tikz.js --limit 10       # first 10 figures
node .build/tikz/prerender_tikz.js --only ch08      # only pages whose path matches
node .build/tikz/prerender_tikz.js --concurrency 6  # parallel tabs (see the note below)
```

**Any change to a TikZ source changes its sha256, so the page will look up a key that
does not exist yet.** After editing content, re-run the prerenderer; the new figure is
rendered and old entries stay (harmless). To prune, delete `index.json` and re-run.

`--resume` is the normal mode: it renders only keys absent from `index.json`, so an
interrupted run costs nothing to continue. Verified: after a full run,
`--resume` reported `already rendered (index.json): 178 / this run: 5 / skipped 178`.

**Concurrency helps, sublinearly.** The engine is a single-threaded WebAssembly TeX and
each tab renders its figures strictly one at a time, so tabs are the only source of
parallelism. Measured on the full 183-figure set, both runs with a fresh Chrome profile
(so nothing was served from the engine's IndexedDB cache):

| concurrency | boot (6 tabs vs 1) | wall clock | per figure |
|---|---|---|---|
| 1 | 1.0 s | **46.2 s** | 0.26 s |
| 6 | 4.2 s | **28.1 s** | 0.16 s |

That is **1.64×**, not 6× — the work is CPU-bound and does not scale linearly. The
default of 6 is a reasonable balance; higher values mostly add boot cost.

## 4. Fonts are load-bearing (please read before touching this)

The engine's `dvi2html` stage writes TeX **glyph slots**, not Unicode:

```html
<text font-family="cmmi10" font-size="10" fill="currentColor">&#174;</text>
```

`&#174;` is `0xAE`, which in `cmmi10` is the glyph for `α`. The pre-rendered SVGs use
**8 of the 140 vendored faces**:

```
cmmi10  cmr10  cmr7  cmr8  cmsy10  cmsy7  cmsy8  cmti10
```

If `tikzjax-fonts.css` is not loaded on a page, those characters fall back to a system
font and render as **plausible-looking garbage** (`$\alpha\beta$` → `®¯`) rather than as
missing glyphs. There is no error and no visual clue. So: **every page that inlines a
figure must load `tikzjax-fonts.css`.**

`.build/tikz/verify_fonts.js` proves this end to end: it serves a probe page at a
**depth-2 URL** (`/hkdse-course/__tikz_probe__/…`, matching the real content pages)
with the depth-2 relative path, loads all 178 figures, and compares the font families
the SVGs request against the ones the browser actually loaded.

## 5. Figures that could not be rendered

These are **pre-existing content defects, not prerenderer bugs** — the same sources
fail identically in Obsidian, because the Obsidian plugin ships the same engine. Each
is recorded in `index.json` with `ok: false`, and `.build/tikz/prerender_tikz.js`
prints the source and the engine's own TeX error for every one. Details and the exact
minimal fix are in the task report; in summary:

| Page | Blocks | Engine error | Why | Fix |
|---|---|---|---|---|
| `ch12-數據的組織與表達-ps1-規劃.html` | #1, #2 | `I do not know the key '/tikz/stat grid'`, and (once that is removed) `inputenc Error: Unicode character 上 (U+4E0A)` | `stat grid` is not a pgfplots key; and the WASM TeX has **no CJK support at all** (no `ctex`/`xeCJK`/`CJK`; the bundled `inputenc` has no CJK table) | replace the axis labels `上組界` / `累積頻數` / `分數` with ASCII, drop `stat grid` — **verified: both then render, 22 625 B and 29 577 B** |
| `…/HKDSE Mock Paper/hkdse-卷一-…（2023-2024）.html` | #15, #16 | `I do not know the key '/tikz/boxplot prepared'` | need `\usepgfplotslibrary{statistics}`; `pgflibrarypgfplots.statistics.code.tex` is **not bundled** in the engine (verified: `I can't find file`) | rewrite as plain TikZ, or accept the source fallback |
| `ch12-數據的組織與表達-ps1-規劃.html` | #0 | `LaTeX Error: Environment groupplot undefined` | needs `\usepgfplotslibrary{groupplots}`; that library is **not bundled** either | rewrite as three separate `axis` environments, or accept the fallback |

## 6. Normalisations applied at build time

The engine's preloaded format is `\documentclass[margin=0pt]{standalone}` and the
WebAssembly TeX is a bare `latex.ltx` with a fixed package set. Eight figures needed a
mechanical, intent-preserving fix; each is recorded in that figure's `normalized`
array. Nothing is changed silently.

| Normalisation | Figures | What and why |
|---|---|---|
| `strip-blank-lines-inside-option-lists` | 4 | A blank line is `\par`; pgfplots scans its `[...]` option list for the closing bracket, so the run dies with *"Paragraph ended before `\pgfplots@@environment@axis` was complete"*. Only blank lines **inside** brackets are dropped. |
| `center-environment-to-\centering` | 4 | `center` is a trivlist and needs vertical mode, but `standalone` typesets the body in restricted horizontal mode → *"Something's wrong--perhaps a missing \item"*. `\centering` is the horizontal-mode equivalent; because `standalone` crops to the picture, output is byte-identical (verified: 6 977 chars either way). |
| `declare-pgfplots-package` | 3 | The block uses `\begin{axis}` / `\begin{groupplot}` without loading pgfplots, which reports the misleading *"Environment axis undefined"* instead of the real error underneath. The package is added to the figure's `data-tex-packages`. |

## 7. Verifying

```bash
node .build/tikz/verify_products.js   # index.json, XML well-formedness, geometry, orphans, no external URLs
node .build/tikz/verify_fonts.js      # depth-2 font portability + no silent fallback
```

Both must pass before the output is used. `verify_products.js` also asserts that no SVG
contains the upstream broken fallback `<img src="//invalid.site/…">` and that no SVG
references any external URL.
