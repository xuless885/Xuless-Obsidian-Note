# 已知无法渲染的 TikZ 图（5 个）

本目录的 183 张图里，**178 张已成功预渲染成 SVG**，另有 **5 张无法渲染**。
这 5 张不是脚本缺陷，而是 **vendor TeX 引擎的能力边界**——下面逐条给出实测的 TeX 报错与根因，
便于日后判断是否值得升级引擎。

## 为什么会发生

预渲染用的引擎（`site-lib/vendor/tikzjax/tikzjax.js`，来自 kisonecat/tikzjax 的 web2js 打包）
只内联了 **215 个 TeX 资源**（见 `engine-inventory.json`）。它是一个**精简 TeX 发行版**，
不含 CJK 支持、不含 `pgfplots.groupplots` 库，且自带的 pgfplots 版本**早于 `boxplot` 特性**。
站内 5 个块恰好用到了这三样。

页面上的实际表现是**优雅降级**：loader 会把该块替换成可见、可复制的源码（`.tikzjax-fallback`），
而不是留一个空白或坏图。所以读者看到的是"这段图需要 LaTeX 环境才能编译"，而不是内容丢失。

## 逐条清单

| # | 页面 | 块 | 根因 | 实测报错 |
| -- | --- | -- | --- | --- |
| 1 | `hkdse-course/习题册草稿/ch12-數據的組織與表達-ps1-規劃.html` | #0 | 用了 `\begin{groupplot}` 与 `group style={group size=3 by 1,…}`，需要 `pgfplots.groupplots` 库；引擎未内置该库（`assets` 里 0 个匹配 `groupplot`） | `! LaTeX Error: Environment groupplot undefined.` |
| 2 | 同上 | #1 | `xlabel={上組界}` / `ylabel={累積頻數}` 含中日韩字符；引擎无 `CJK`/`ctex`/`xeCJK`（均为 0 个匹配），而上游用 `inputenc`（pdflatex 系） | `! Package inputenc Error: Unicode character ^^e4^^b8^^8a (U+4E0A)` |
| 3 | 同上 | #2 | 同上（`xlabel={分數}`） | `! Package inputenc Error: Unicode character ^^e5^^88^^86 (U+5206)` |
| 4 | `hkdse-course/AI参考习题库/HKDSE Mock Paper/hkdse-卷一-模拟试题分类汇编（2023-2024）.html` | #15 | 用了 `boxplot prepared={lower whisker=…}`；引擎自带 pgfplots 版本早于 boxplot 特性 | `! Package pgfkeys Error: I do not know the key '/tikz/boxplot prepared'` |
| 5 | 同上 | #16 | 同上（仅中位数不同） | 同上 |

## 顺带记录：两个已修复的引擎/加载器缺陷

排查这 5 张图的过程中，定位并修掉了两个**影响面更大**的缺陷：

1. **loader 丢失每块选项（已修）**
   `site-lib/vendor/tikzjax/tikzjax-loader.js` 的 `wrap()` 会把每个块移进一个 `span.tikzjax-host`；
   而引擎的 `texify()` 读的是 **host 元素的 `dataset`**（`tikzjax.js` 内
   `H.texify(src, Object.assign({}, A.dataset))`，其中 `A` 是被替换成 spinner 的那个元素）。
   于是挂在 `<script>` 上的 `data-tikz-libraries` / `data-tex-packages` / `data-add-to-preamble`
   **全部被静默丢弃**。已修：`wrap()` 现在把这几个属性镜像到 host（见 `BLOCK_OPTION_ATTRS`）。
   - 修前：`data-tex-packages='{"pgfplots":""}'` 形同不存在，pgfplots 环境一律 `Environment axis undefined`。
   - 修后：pgfplots 正常加载，错误信息也变成**真实的内容错误**（上表第 1/2/3 条），而不是被掩盖的包缺失。

2. **prerender 的 `data-tikz-options` 已知不可用（未启用）**
   上游会把 `[scale=2]` 这类选项拼在 `\begin{document}` 之前，导致致命错误。
   因此 `prerender_tikz.js` 不启用该属性；选项应写在环境上（如 `\begin{tikzpicture}[scale=1]`）。

## 如果要让这 5 张也能渲染

三条路，按成本排序：

1. **改内容**（最省事）：把 CJK 标签改成 ASCII 或 `$…$` 数学式（如 `xlabel={Upper bound}`）；
   用 `xticklabel style` 或图外文字表达中文。boxplot 两张可改画成普通 `\draw` 盒须图，
   或降级为表格。
2. **换库**：给引擎补 `pgfplots.groupplots` 与 CJK 支持需要一个更完整的 TeX 发行版
   （体积会从 10 MB 涨到百 MB 级），不适合放进静态站点仓库。
3. **本地出图**：在作者本机的完整 TeX 环境里把这 5 张导成 SVG，直接放进 `prerendered/`
   并在 `index.json` 里登记。这是**保真度最高**的做法，且不需要改引擎。

## 复现方式

```bash
node .build/tikz/prerender_tikz.js --resume    # 只重试失败项
```

脚本会把失败项的 key、页面、TeX 报错与源码一并打印出来；本目录的 `index.json` 里
这些条目带 `"ok": false` 与 `"error": "render-failed"`。
