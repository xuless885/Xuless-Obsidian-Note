# `site-lib/vendor/mathjax/` — deliberately empty of runtime code

**Conclusion: the browser does NOT need a MathJax runtime. Nothing is shipped here
except the license.**

There is no `mathjax.js`, no `tex-chtml.js`, no font set, no 32.7 MB `mathjax-full`
copy. This is a decision, not an omission.

---

## Why

1. **All math is resolved at build time.** The new HKDSE pages are produced by
   `.build`-side tooling that runs `mathjax-full@3` **in Node** and serialises the
   result into static HTML. The 76,838 formulas become plain markup before the file is
   ever written. There is nothing left for a client-side typesetter to do.
2. **This is already how the site works.** The 78 existing content pages were exported
   the same way. Verified across every page in the repo:
   - `<mjx-container>` elements: **present** (201 in one sampled chapter alone)
   - `<math>` (MathML) elements: **0**
   - `<script src>` referencing MathJax / `tex-chtml` / `tex-mml` / `MathJax.js`:
     **0 files**
   So the existing pages prove the pattern: pre-rendered **CHTML** + local WOFF fonts
   (`site-lib/fonts/mathjax_*.woff`, referenced from a page-local `@font-face` block),
   and **no MathJax JavaScript at all**.
3. **A runtime would be a pure regression.** It would add ~1 MB of JS plus a typeset
   pass over tens of thousands of formulas on every visit, to reproduce markup that is
   already in the HTML — while introducing a first-paint flash of raw `$…$` and a new
   failure mode (JS disabled, CDN-less offline) that the pre-rendered version simply
   does not have.
4. **Size.** `mathjax-full@3` is 32.7 MB installed. Committing even a trimmed CHTML
   bundle would swamp the 10.29 MiB the TikZ vendor tree already costs and push the
   repository well past a sensible budget for zero benefit.

The build-time copy lives at `.build/tools/node_modules/mathjax-full`, which is inside
`.build/` and therefore gitignored — it is a build dependency, not a shipped artifact.

## Consistency note

MathJax is **Apache-2.0**. Licensing it requires the notice, not the code, so
[`LICENSE`](LICENSE) (the full Apache-2.0 text) is kept here to record that MathJax is
part of the site's toolchain, and the component is listed in
[`../NOTICE.md`](../NOTICE.md) §1 row 11 with its "0 B shipped" size.

## If this ever changes

If a future page needs math that genuinely cannot be pre-rendered (user-authored
content, live editing), do **not** drop a full MathJax distribution in here. The
options, cheapest first:

1. Extend the build-time pre-renderer to cover that page.
2. Vendor a single-purpose `tex-chtml.js` component build plus
   `output/chtml/fonts/woff-v2/`, which is roughly 1.2 MB, and reuse the existing
   `site-lib/fonts/mathjax_*.woff`.
3. Pre-render to **MathML** instead — every current browser renders it natively, with
   no JS and no fonts, at the cost of slightly different typography from the CHTML
   pages.

Whichever is chosen, add the shipped files to `../NOTICE.md` and keep the pre-rendered
CHTML output of the existing 78 pages unchanged.
