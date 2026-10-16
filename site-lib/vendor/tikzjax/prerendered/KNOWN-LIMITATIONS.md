# TikZ 预渲染：引擎能力边界与已知坑

**当前状态（2026-10-16）**：`prerendered/` 里 **657 张 SVG 全部渲染成功，0 失败**；
全站 39 个页面共 452 个块位（讲义 35 章 + 大纲 2 篇 + 2 张目录页）已全部接成静态 SVG，
页面运行期不加载任何 TikZ 引擎（那个 6.7 MB 的 `tikzjax.js` 只在构建期用）。

> 历史记录：更早一轮（旧站时代）有 5 张图渲染不出来，那 5 个块所在的页面
> （`习题册草稿/`、`AI参考习题库/`）已在 2026-10-14 的重构里连源文件一起删除，
> 清单已不适用。下面「一、二」是**现在仍然有效**的边界，供日后写图时避坑。

## 一、`\pgfplotsset{compat=…}` + `(axis cs:…)` 画图 = 必然失败（2026-10-16 实测）

引擎自带的 pgfplots 版本较老。只要一个块里**同时**出现：

```tex
\pgfplotsset{compat=1.16}          % 任何 compat 值都一样：1.11 / 1.15 / 1.16 / 1.18 全部失败
...
\draw[dashed] (axis cs:1.756,0) -- (axis cs:1.756,3.38);
```

就会炸在浮点解析上：

```
! Argument of \pgfmathfloatparse@@ has an extra }.
! Emergency stop.
Error: Could not find file input.dvi
```

实测矩阵（同一块，逐项替换）：

| 改动 | 结果 |
| --- | --- |
| 原样 | ❌ |
| `compat=1.16` → `1.11 / 1.15 / 1.18` | ❌ 全部失败 |
| 保留 `compat`，删掉 `\draw/\filldraw/\node (axis cs:…)` 三行 | ✅ |
| **删掉 `\pgfplotsset{compat=…}`，保留全部画图命令** | ✅ |
| 去掉 `legend`、改 `samples`、改 `5^(x-1)` 写法 | ❌ 无关 |

**结论与建议**：在这种精简引擎里，**不要写 `\pgfplotsset{compat=…}`**（不写即为该版本的默认
compat，图形观感一致）；确实需要 `compat` 时，改用 `\draw (axis cs:…)` 之外的写法
（例如先 `\coordinate`，或用 `\node at (axis description cs:…)`）。
`Chapter 27 解方程方法 (III).md` 的那张图就是按「删掉 compat 行」修好的。

## 二、引擎只内联 215 个 TeX 资源，以下东西没有

`engine-inventory.json` 可以逐项核对。缺的典型有三类：

1. **CJK**：`xlabel={上組界}` 这类中文标签会 `! Package inputenc Error: Unicode character`。
   → 图内文字改 ASCII 或数学式，中文放到图外的图注里写。
2. **`pgfplots.groupplots`**：`\begin{groupplot}` / `group style={…}` → `Environment groupplot undefined`。
3. **较新的 pgfplots 特性**（如 `boxplot prepared={…}`）→ `Package pgfkeys Error: I do not know the key '…'`。

## 三、两个已修复的引擎/加载器缺陷（保留备查）

1. **loader 丢失每块选项（已修）**
   `tikzjax-loader.js` 的 `wrap()` 会把每个块移进一个 `span.tikzjax-host`；而引擎的 `texify()`
   读的是 **host 元素的 `dataset`**。于是挂在 `<script>` 上的 `data-tikz-libraries` /
   `data-tex-packages` / `data-add-to-preamble` 会被静默丢弃。已修：`wrap()` 把这些属性镜像到 host。
   注意 `data-tex-packages` 必须是 **JSON 对象**（`{"amssymb":""}`），写成逗号列表会被静默忽略。
2. **`data-tikz-options` 不可用（未启用）**：上游会把 `[scale=2]` 拼在 `\begin{document}` 之前导致致命错误。
   选项要写在环境上（`\begin{tikzpicture}[scale=1]`）。

## 四、复现与排查

```bash
node .build/tikz/prerender_tikz.js --resume     # 只渲染还没成功的块
node .build/tikz/prerender_tikz.js --report      # 只看状态，不改产物
node .build/tikz/prerender_tikz.js --only chapter-27 --resume   # 只试某一页
```

失败项的 key、页面、TeX 报错与源码会一并打印，`index.json` 里对应条目为 `"ok": false`。

两个体检脚本（都不改动产物，只扫描）：

```bash
python .build/tikz/check_tikz_leaks.py      # 页面里有没有「源码漏成正文」的块（应为 0）
python .build/tikz/check_source_fences.py   # 源库里的 ```tikz 围栏形态（前言/未闭合/重复 document）
```

