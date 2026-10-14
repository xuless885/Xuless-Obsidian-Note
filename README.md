# Xuless 数字花园

许少（Xuless）的个人博客与知识库。纯静态站点，无构建步骤、无框架、无 CDN，直接托管于 GitHub Pages。

## 站点结构

```
index.html                     首页：hero / 站点统计 / 栏目导航 / 最新更新 / 标签云

blog/
  index.html                   文章列表（分类、标签筛选 + 排序 + 分页）
  tags.html                    标签总览
  graph.html                   知识关系图（Obsidian 风格）
  search.html                  全站可视化检索
  about.html                   关于本站

site-lib/
  styles/
    blog-theme.css             ★ 本站自有主题（设计令牌 + 组件 + 对旧 Quartz DOM 的覆盖）
    graph.css / search.css     关系图与检索页样式
  scripts/
    site.js                    主题切换、导航、入场动效、DSH 工具函数
    graph.js                   canvas 力导向关系图（自研，无第三方库）
    search.js                  全文检索（中文 2-gram / 英文分词打分）
    doc-page.js                内容页的「反向链接 / 本文引用」面板
    webpage.js / graph-wasm*   Obsidian 导出附带的原脚本（保留）
  data/                        ★ 全站静态数据索引（由构建脚本生成）
    docs.json                  134 篇文档的元数据 + 双向链接关系
    links.json                 237 条有向关系边
    tags.json                  标签词表与归属
    search.json                全文检索索引（含公式文本，见下）
    manifest.json              站点概要（11 个栏目）
    home.json                  首页专用瘦身索引（约 11KB）
  vendor/                      第三方渲染引擎（离线自足，见下）
    tikzjax/                   TikZ 渲染引擎 + 140 个 BaKoMa 字体
    NOTICE.md                  组件清单、版本、许可证与溯源
  styles/obsidian.css 等       Obsidian 导出原样式（保留，新主题在其后覆盖）

hkdse-course/                  内容主体（134 个页面 · 11 个栏目）
  大纲/                        7    课程阐释 PDF 壳页、官方考点大纲、词汇表
  dse-课题讲义/                 27   Chapter 0–25 课题讲义
  dse-textbook-plan/           38   Ch00–Ch36 Textbook Plan 草稿
  习题册草稿/                   34   Ch00–Ch29 习题册规划（公式最密，含 177 个 TikZ 图）
  习题难度标记/                 5    四维难度打标示范
  AI参考习题库/                 2    HKDSE 卷一 历届/模拟试题分类汇编
  规划说明方案/                 2    习题册规划规范、讲义写作规范
  规划文档/                    13   各章修改方案与讲义规划
  图片/                        配图（SVG / PNG）
许少xuless的数字花园/           数字花园入口 + legal/
```

### 源文件也在仓库里

按「移植整个 HKDSE 项目」的要求，每个栏目除渲染后的 `.html` 外，**原始 `.md` 源文件、配图、以及项目工具脚本（`.py`／`.canvas`／`.base`／`.mcg`）都已随仓库一同保存**。
排除的只有三类：PDF（按用户要求不搬，页面上保留文字引用）、`.bak_*`／`.corrupt`／`.tmp*` 过程稿、以及 `.agx`／`.thm`／`.ini`／`.lnk`／`.log` 这类编辑器产物。

## 数学与 TikZ 的渲染方式

这是本站最需要理解的一点：**公式在构建期就预渲染成静态 HTML，运行期零 JavaScript。**

- **公式**：构建期用 MathJax（`mathjax-full`，Apache-2.0）把 103,633 个公式容器序列化成 CHTML 静态标记，复用 `site-lib/fonts/mathjax_*.woff`。浏览器端**不加载任何 MathJax 运行时**——这与既有 78 页的导出方式一致，观感统一，且完全离线。
- **公式可被搜索**：CHTML 把字形编码在类名里（`mjx-c1D445` → `𝑅`）。构建数据索引时把类名解码回字符（并用 Unicode NFKD 归一化，`𝑅`→`R`、`𝜆`→`λ`），因此**公式内容真的能搜**，例如搜 `Δ=b2-4ac`、`sin2θ+cos2θ=1`、`R=(1-λ)P+λQ` 都能命中。
- **TikZ 图**：`site-lib/vendor/tikzjax/` 是本地化的 TeX 引擎（自带 `tex.wasm` 与 TeX 支持文件，**运行期无任何外网请求**）。
  **图在构建期就渲染成静态 SVG**（178 张，见 `site-lib/vendor/tikzjax/prerendered/`），页面里是一张
  `<img class="tikz-figure">`，**浏览器端不再加载这个 6.7 MB 的引擎**。
  这一点很关键：客户端渲染实测**每张图 20–40 秒**，而 `ch08` 一页有 73 张图——首次访问要 24–48 分钟，等于不可用。
  预渲染把这份成本一次性挪到构建期。
  ⚠️ 这些 SVG 里的 `<text>` 用的是 **BaKoMa Computer Modern 字形槽位**（不是普通 Unicode），
  必须同时加载 `tikzjax-fonts.css`（140 个 `@font-face`），否则公式会显示成「看着正常但错误」的字符。
  有 5 张图无法渲染，原因与复现方式见 `prerendered/KNOWN-LIMITATIONS.md`。

### 已知限制

- **上下标被线性拉平**：`x²` 与 `x₂` 在检索索引里都是 `x2`。所以搜 `x2` 命中、搜 `x^2` 不命中。
- **69/134 页触及 10000 字/页的索引上限**（公式最密的习题册页保留前 10000 字）；这是为把 `search.json` 压在 ~2.3 MB 内的取舍。
- **55 个页面是孤立节点**（度数为 0）——这些规划/说明文档之间确实没有互链，是内容事实。关系图**默认关闭**「显示孤立节点」，需要时可在图谱页打开开关。

## 本地预览

站点使用根相对**同级**路径（不是 `root-absolute`），必须通过 HTTP 服务访问，直接双击打开 `file://` 会因 `<base>` 语义失效：

```bash
python -m http.server 8123
# 打开 http://127.0.0.1:8123/
```

> ⚠️ 不要用 `/site-lib/...` 这类根绝对路径。本仓库是 GitHub Pages **项目站点**，
> 线上地址形如 `https://<user>.github.io/Xuless-Obsidian-Note/`，根绝对路径会指向
> 域名根而非仓库根，导致 404。

### 路径约定（重要）

内容页（`hkdse-course/**`、`许少xuless的数字花园/**`）由 Obsidian 插件导出，**自带
`<base href="..">` 或 `<base href="../..">`**，因此它们引用资源一律用**无前缀**写法：

```html
<link rel="stylesheet" href="site-lib/styles/blog-theme.css">
```

新页面（根 `index.html` 与 `blog/*.html`）**不带 `<base>`**，因此用相对前缀：

```html
<!-- index.html -->   <link rel="stylesheet" href="./site-lib/styles/blog-theme.css">
<!-- blog/*.html -->  <link rel="stylesheet" href="../site-lib/styles/blog-theme.css">
```

## 数据索引的生成

`site-lib/data/*.json` 全部由脚本生成：既有 78 页的元数据来自 `site-lib/metadata.json`（Obsidian 导出产物），**新增页面以及所有出链／正文则从磁盘上的 HTML 实际抽取**（新页面不在 metadata 里，脚本按「磁盘存在但 metadata 没有 ⇒ 当新页面纳入」处理）。**内容页的链接或正文若发生改动，必须重建索引**，否则关系图、反向链接面板与搜索会与实际内容脱节：

```bash
python .build/de/build_data.py     # 重建全部 6 个数据文件
python .build/de/verify.py         # 校验（exit 0 表示通过）
```

构建是确定性的：连跑两次除时间戳外逐字节相同。

## 新增 markdown 内容的渲染

`hkdse-course/` 下的习题册等栏目是**从 markdown 渲染来的**（源在 Obsidian 库里）。渲染流水线：

```bash
python .build/md/render_md.py --dry-run   # 只统计：页数、公式数、tikz 数、图片清单
python .build/md/render_md.py --apply     # 实际生成 .html（幂等，二次运行 0 改动）
```

- 渲染器读的是 **Obsidian 库源目录**（`render_md.py` 顶部的 `SRC_ROOT`），不是仓库里的 `.md` 副本——**改内容要改库源**，否则重渲染会把仓库副本的改动覆盖回去。
- 数学走构建期 MathJax 预渲染（需要 `.build/tools/node_modules/mathjax-full`，仅构建期使用、不入仓库；公式结果缓存在 `.build/md/.cache/`，缓存命中时整轮渲染约 4 秒）。
- 若要"从零复现"这条流水线：`cd .build/tools && npm install mathjax-full@3`。

## 运维脚本

`.build/` 已被 `.gitignore` 忽略，属本地工具目录：

| 脚本 | 用途 |
| --- | --- |
| `de/build_data.py` | 重建 `site-lib/data/*.json` |
| `de/verify.py` | 数据索引完整性校验 |
| `md/render_md.py` | markdown → HTML（习题册等新增内容） |
| `md/tex2mml.js` | 批量 TeX 渲染器（MathJax，一次进程内完成） |
| `copy_source.py` | 幂等地把 Obsidian 库源文件搬进仓库 |
| `lead_final_check.py` | 全站终验：抓取所有页面与其引用的每个本地资源，断言全部 200 |
| `inject_content.py` | 幂等地为内容页注入主题/导航/面板（判重标记见下） |
| `lead_deadassets.py` | 清理导出遗留的死资源引用（已执行） |
| `lead_headfix.py` | 回补误删的 `<head>` 注入块（已执行） |
| `lead_linkfix.py` | 死链修复（已执行） |
| `test_graph_search.js` | 关系图与检索的 headless 逻辑 + jsdom 集成自测 |
| `vendor/fetch_vendor.js` | 可复现地重建 `site-lib/vendor/`（含 sha256 校验） |
| `test_vendor_offline.js` | 证明 vendor 运行时 0 个外网请求 |
| `test_tikz_render.js` | 无头 Chrome + 全网黑洞下验证 TikZ 真渲染 |

### 注入标记

内容页中的以下注释用于幂等判重，**不要手工删除**：

```html
<!-- ==DSH-INJECT:head== -->          注入的样式/脚本/meta
<!-- ==DSH-INJECT:nav== -->           顶部导航
<!-- ==DSH-INJECT:panels== -->        反向链接 / 本文引用面板
<!-- ==DSH-LEADFIX:dead-assets== -->  死资源引用清理
```

## 设计系统

`site-lib/styles/blog-theme.css` 是唯一的主题来源，其他样式与脚本只能**消费**它导出的
CSS 变量，不得重定义：

```
--bg --bg-elev --bg-sunken --fg --fg-muted --fg-subtle
--accent --accent-2 --accent-soft --accent-contrast
--grad-hero --grad-card
--border --border-strong
--radius-s --radius-m --radius-l --radius-pill
--shadow-s --shadow-m --shadow-l
--space-1 … --space-8   --maxw --nav-h
--font-sans --font-serif --font-mono
--ease --dur-fast --dur --dur-slow
```

深浅主题切换使用 `localStorage` 键 `dsh-theme`（取值 `light` / `dark`），并兼容
`prefers-color-scheme`。

## 部署

推送到 `main` 分支即由 GitHub Pages 发布：

```bash
git add -A && git commit -m "..." && git push origin main
```

推送前建议本地跑一遍 `python .build/lead_final_check.py`（应输出全部 200）。
