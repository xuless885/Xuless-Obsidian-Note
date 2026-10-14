# Third-party notices — `site-lib/vendor/`

Everything under `site-lib/vendor/` is third-party software redistributed so the site
renders **offline**. This file is the authoritative inventory; each component's full
license text sits next to it (paths in the table).

Site total: **10,789,127 bytes (10.29 MiB)** across 153 files, which is inside the
12 MB budget. A live figure is printed by `node .build/vendor/size_report.js`.

---

## 1. What is shipped and why

| # | Component | Version | License (SPDX) | Copyright | Source | Ships as | Size |
|---|-----------|---------|----------------|-----------|--------|----------|------|
| 1 | **tikzjax** (the renderer bundle) — *modified* | `kisonecat/tikzjax` @ `master` (last push 2024-07-06), as built into obsidian-tikzjax 0.5.2 | **LPPL-1.3c** (upstream `package.json` declares the dual choice `(GPL-3.0 or LPPL-1.3c)`; LPPL-1.3c is the one with an actual `LICENSE` file, so that is the one we rely on) | LaTeX3 Project (LPPL text); bundle by Jim Fowler (`kisonecat`) | <https://github.com/kisonecat/tikzjax> | `tikzjax/tikzjax.js` | 7,035,163 B |
| 2 | **obsidian-tikzjax** (the plugin the bundle was extracted from) | 0.5.2 | **MIT** | © 2022 artisticat1 | <https://github.com/artisticat1/obsidian-tikzjax> | extraction source only | — |
| 3 | **dvi2html** (DVI → SVG/HTML; bundled inside #1) | npm `0.0.2` (pinned by tikzjax's `package.json`) | **GPL-3.0** | see license text | <https://www.npmjs.com/package/dvi2html> | inside `tikzjax.js` | in-engine |
| 4 | **pako** (zlib/gzip inflate; bundled inside #1) | 1.x (bundled) | **MIT AND Zlib** | © Vitaly Puzrin, Andrei Tuputcyn | <https://github.com/nodeca/pako> | inside `tikzjax.js` | in-engine |
| 5 | **localforage** (IndexedDB SVG cache; bundled inside #1) | 1.10.0 | **Apache-2.0** | © 2013–2017 Mozilla | <https://github.com/localForage/localForage> | inside `tikzjax.js` | in-engine |
| 6 | **workerpool** (web-worker pool; bundled inside #1) | bundled | **Apache-2.0** | © Jos de Jong | <https://github.com/josdejong/workerpool> | inside `tikzjax.js` | in-engine |
| 7 | **web-worker** (worker shim; bundled inside #1) | bundled | **Apache-2.0** | © Jason Miller | <https://github.com/developit/web-worker> | inside `tikzjax.js` | in-engine |
| 8 | **TeX engine** — `tex.wasm` + `core.dump` (bundled inside #1) | TeX compiled to WASM via `kisonecat/web2js`; LaTeX format dumped from the `standalone` class + `pgf`/`tikz` | TeX is under **Knuth's TeX license**; `web2js` is GitHub-**NOASSERTION** (no recognized license file); the LaTeX format is **LPPL-1.3c** | Donald E. Knuth (TeX); Jim Fowler (`web2js`); LaTeX3 Project (format) | <https://github.com/kisonecat/web2js> | `core.dump.gz` 3,252,439 B + `tex.wasm.gz` 121,703 B, base64 inside `tikzjax.js` | in-engine |
| 9 | **TeX Live macro packages** — 212 × `tex_files/*.sty.gz` / `*.tex.gz` | TeX Live | **LPPL-1.3c** dominant; `pgf`/`tikz` is dual LPPL-1.3c / GPL-2.0; *some* individual packages differ | respective package authors | <https://www.ctan.org/> | base64 inside `tikzjax.js` | ≈1.45 MiB gz, in-engine |
| 10 | **BaKoMa Computer Modern fonts** — 140 TrueType faces | BaKoMa-CM 1.1/12-Nov-94 (Level-B, 88 faces) + BaKoMa-AMS 1.2/19-Jan-95 (Level-C, 52 faces) | **BaKoMa Fonts Licence 1995** (`LicenseRef-scancode-bakoma-fonts-1995`) | © 1994, 1995, Basil K. Malyshev. All Rights Reserved. | <https://www.ctan.org/tex-archive/fonts/cm/ps-type1/bakoma> | `tikzjax/fonts/*.ttf` + `tikzjax-fonts.css` | 3,583,398 B |
| 11 | **MathJax** | 3.x — **build-time only, NOT redistributed** | **Apache-2.0** | © MathJax Consortium | <https://www.mathjax.org/> | nothing (see `mathjax/README.md`) | 0 B |
| 12 | Site-authored glue: `tikzjax/tikzjax-loader.js`, `tikzjax/tikzjax.css` | 1.0.0 | MIT (same as the rest of this site's own code) | this site | this repo | `tikzjax/` | 17,801 B |

### License texts shipped alongside

| File | Covers |
|------|--------|
| `tikzjax/LICENSE-tikzjax-LPPL-1.3c.md` | #1, #8 (format), #9 |
| `tikzjax/LICENSE-obsidian-tikzjax-MIT.md` | #2 |
| `tikzjax/LICENSE-dvi2html-GPL-3.0.txt` | #3 |
| `tikzjax/LICENSE-pako-MIT.txt` | #4 |
| `tikzjax/LICENSE-Apache-2.0.txt` | #5, #6, #7 |
| `tikzjax/fonts/LICENSE-BaKoMa-Fonts-Licence.txt` | #10 |
| `mathjax/LICENSE` | #11 |

---

## 2. The one modification we make to upstream tikzjax

`tikzjax/tikzjax.js` is a **Derived Work** under LPPL-1.3c clause 6. Exactly one patch
is applied; it is recorded in `tikzjax/VENDOR-MANIFEST.json`
(`output["tikzjax.js"].patches`) and in the file's own header, which is the "complete
and accurate log of the changes" required by clause 6(b).

**Patch `offline-fallback-for-compile-errors`.** When the TeX worker cannot compile a
picture, upstream does:

```js
q.outerHTML = "<img src='//invalid.site/img-not-found.png'/>"
```

Two problems for an offline static site: `//invalid.site/...` is a **protocol-relative
external URL** (it would leave the origin exactly when the network is least useful),
and it discards the user's TikZ source. We replace it with markup that keeps the
source visible:

```js
q.outerHTML = '<span class="tikzjax-fallback" data-tikzjax-error="render-failed">' + …escaped source… + '</span>'
```

LPPL-1.3c clause 6 compliance:

| Clause | How it is met |
|--------|---------------|
| 6(a) — modified component must identify itself if it identifies itself interactively | `tikzjax.js` is a non-interactive library and identifies nothing interactively; its header states it is a modified copy regardless. |
| 6(b) — prominent notice of the nature of the changes | Header block at the top of `tikzjax.js` + `VENDOR-MANIFEST.json` + this section. |
| 6(c) — must not imply upstream support | Header states "Not supported by, and not affiliated with, the upstream authors". |
| 6(d) — ship an unmodified copy, or information sufficient to obtain one | Header + this file point at <https://github.com/kisonecat/tikzjax>, and the **sha256 of the pristine, unmodified bundle** is pinned (`a998481b0cbab9b1459719fdf68810a077c4488ff49f7597e61d55ff8577f5e6`) so anyone can obtain and verify one. `node .build/vendor/fetch_vendor.js` re-derives that pristine bundle and refuses to proceed if the hash differs. |

---

## 3. Things a redistributor should know (not legal advice)

- **GPL-3.0 component (#3, dvi2html).** This is the only strong-copyleft piece. Note a
  genuine discrepancy we could not resolve: tikzjax's `package.json` pins npm
  `dvi2html@0.0.2`, and **every** published `dvi2html` version on npm declares
  `GPL-3.0`; but the GitHub repo `kisonecat/dvi2html` is `MIT`. We have recorded the
  stricter of the two. Because this repository is a public source repository that
  ships the complete engine source (`tikzjax.js` is the readable, unminified-from-our-side
  bundle, and `fetch_vendor.js` regenerates it), the source-availability obligation is
  satisfied by the repository itself. If this site is ever republished as a *binary-only*
  artifact, revisit this.
- **TeX (#8).** Knuth's TeX license permits redistribution but forbids distributing a
  modified system under the name `TeX`. We do not modify the engine; we redistribute
  `tex.wasm`/`core.dump` byte-for-byte. Note that `web2js` carries no recognized
  license file (GitHub reports `NOASSERTION`), which we flag rather than paper over.
- **Fonts (#10).** The BaKoMa licence is permissive but **requires the copyright
  notice, author statement and permission notice to accompany all copies** — that is
  why `fonts/LICENSE-BaKoMa-Fonts-Licence.txt` is shipped. Using the fonts (including
  embedding in SVG) needs no notice.
- **tex_files (#9).** We list the dominant license (LPPL-1.3c) but have **not**
  audited all 212 packages individually; `pgf`/`tikz` and `circuitikz` are the
  significant ones and are LPPL-1.3c-compatible. A per-package audit is the obvious
  next step if this ever matters commercially.
- **Attribution retention.** Nothing here may be removed without re-checking the
  license texts above.

---

## 4. Where the bits came from, and how to reproduce

The renderer was **not** downloaded from npm: the `tikzjax` npm package was
**unpublished on 2025-01-15** (`npm view tikzjax` → `404 Unpublished on 2025-01-15T17:34:56.569Z`).
The only reproducible source of this exact bundle is the user's local Obsidian plugin,
whose `main.js` inlines it as a single `tikzjax_default` template literal.

```bash
node .build/vendor/fetch_vendor.js          # extract + patch + write vendor/ (verifies pinned sha256)
node .build/vendor/fetch_vendor.js --check  # re-derive and compare with what is on disk
node .build/vendor/install_licenses.js      # re-copy the license texts
node .build/vendor/size_report.js           # sizes / budget
```

Pinned inputs (all verified before anything is written):

| Input | sha256 |
|-------|--------|
| `obsidian-tikzjax/main.js` (7,861,302 B) | `d4b609bb0f880ca91ebe855110b088b7c891a399671862328d937d48e0a46486` |
| `obsidian-tikzjax/styles.css` (4,791,190 B, carries the 140 fonts) | `d9a7f741ec8fdcbe5e0145152c799238cee8df5a14ddc7dc9feb3bb835ce068d` |
| tikzjax bundle **before** our patch (7,033,505 chars) | `a998481b0cbab9b1459719fdf68810a077c4488ff49f7597e61d55ff8577f5e6` |
| `tikzjax.js` **as shipped** (patched body) | `be325bdc2fc6b660ea658324a63f87518e34c9eb0d4f2bd2d1c6d16c0ded7c91` |

`tikzjax/engine-inventory.json` lists all 215 gzip assets inlined in the engine with
their individual sha256 — that is the machine-checkable record of exactly which TeX
packages are inside.
