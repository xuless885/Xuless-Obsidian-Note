# Xuless 数学站

许少（Xuless）的个人数学站：高中数学课程 + 大学数学内容。
纯静态（HTML / CSS / JS，无后端、无追踪），部署为 **GitHub Pages 项目站点**（子路径）。

线上地址：<https://xuless885.github.io/Xuless-Obsidian-Note/>

---

## 1. 站点结构

```
index.html                     首页：两个大板块（高中数学课程 / 大学数学内容）
about.html                     关于本站（独立撰写的简介页）
courses/
  hs.html                      高中数学课程 —— 三个子板块的入口
  uni.html                     大学数学内容 —— 内容建设中（先空着）
  mock.html                    模拟卷清单（仅卷面，外部链接，不含答案）
  outline.html                 大纲（官方考纲 / 课程阐释 PDF / 词汇表）
hkdse-course/
  dse-课题讲义/                 课程讲义正文：36 章 + 给读者的简介 + 更新日志（渲染产物）
  dse-课题讲义/*.md             讲义源文（自 Obsidian 库同步，与页面同目录；mtime = 页面「最后修改」）
  大纲/                         DSE 数学词汇表、官方考纲与课题讲义关联分析（渲染产物）
  图片/                         讲义配图（108 个唯一文件名，站内唯一图片目录）
blog/
  graph.html                   知识图谱（全屏页；旧博客外壳已删）
site-lib/
  styles/  scripts/  data/  media/  fonts/  vendor/
```

**两处必须记住的路径约定：**

1. **绝不用 root-absolute 路径**（`/site-lib/...`）。本站是 GitHub Pages **项目站点**，
   部署在 `/Xuless-Obsidian-Note/` 子路径下，以 `/` 开头的引用会 404。
   页面用相对前缀（根页面 `./`、`courses/` 用 `../`、`hkdse-course/xxx/` 用 `../../`）。
2. 新版外壳页（`index.html` / `about.html` / `courses/*.html`）**不写 `<base>`**，
   深度靠 `../` 前缀自己算；讲义页沿用渲染器输出（同样不带 `<base>`）。

---

## 2. 内容来源与渲染

| 来源 | 路径 | 去处 |
| --- | --- | --- |
| Obsidian 文档库 | `C:\Users\xuless\OneDrive\Xuless Obsidian Note` | `HKDSE course/DSE 课题讲义/*.md` → 36 章讲义 |
| Obsidian 文档库 | 同上 | `HKDSE course/大纲/*.md` → 词汇表、关联分析 |
| LaTeX 文档库 | `C:\Users\xuless\OneDrive\文件\HKDSE` | 模拟卷**卷面 PDF**（清单页外链，**不搬进仓库**） |

**讲义源库是唯一事实来源**：渲染器读的是 OneDrive 库里的 `.md`，不是仓库副本。
要改正文内容，**必须改库源**，否则重渲染会把改动覆盖回去。
（仓库内的同名 `.md` 是为「源文件也在站点里」而放的副本，仅供下载/检索。）

渲染流水线（复用 `.build/md/render_md.py`，它已解决 MathJax 预渲染、TikZ 接入、
表格 / wikilink / 图片 / callout 解析）：

```bash
python .build/sync_vault_sources.py --apply            # 库源 → 仓库 .md 快照（保留 mtime；页面「最后修改」靠它）
python .build/restructure/render_all_docs.py --apply   # 渲染讲义 + 大纲（40 篇）
python .build/restructure/fix_images.py --apply        # 修复对不上的图片引用
node   .build/tikz/prerender_tikz.js --resume          # 新图 → 静态 SVG（--emit-by-page 重写页→图映射）
python .build/md/integrate_tikz2.py --apply            # 把预渲染 SVG 接进页面
python .build/md/add_tikz_fonts.py --apply             # 补 BaKoMa 字体 CSS
python .build/restructure/add_tikzcss.py --apply       # 补 tikz-figures.css
python .build/mathfont/sync_math_fonts.py              # 公式字体外链归一 + 打印新 sha1
python .build/de/build_data.py                         # 重建 site-lib/data/*.json
python .build/restructure/build_filetree.py            # 左侧栏讲义树
python .build/restructure/write_pages.py               # 外壳页 + site.json（含讲义目录页之外的 courses/*）
python .build/restructure/write_home.py                # 首页
python .build/restructure/build_lecture_index.py       # 讲义目录页（按磁盘上的章自动发现）
python .build/restructure/add_cache_bust.py --apply    # 必须最后一步：给 css/js/树加内容指纹
```

**顺序很重要**：渲染在前、图片修复与 TikZ 集成在后；集成脚本是幂等的（靠
`data-tikz-prerendered` 标记判重），但**渲染会重置页面**，所以每次重渲染后都要重跑后几步。
外壳页与数据层之间也有依赖：`write_pages.py` 的 `site.json` 读 `docs.json`，所以要先跑 `build_data.py`；
`add_cache_bust.py` 永远最后跑（它按文件内容算指纹，改任何 css/js/树 之后都必须重跑）。

---

## 3. 数学公式：构建期预渲染

- 公式在**构建期**用 MathJax（`mathjax-full`，Apache-2.0）转成静态 CHTML，浏览器端**零 MathJax 运行时**，完全离线、无闪烁。
- 复用 `site-lib/fonts/mathjax_*.woff`。
- **公式可被搜索**：CHTML 把字形编码在类名里（`mjx-c1D445` → `𝑅`），建索引时解码回字符并做 NFKC 归一化（`𝑅`→R、`𝜆`→λ），同时剔除 U+2061 等不可见控制符。
- 公式样式是**一份共用文件** `site-lib/styles/mathjax-chtml.css`（曾按目录各存一份，属浪费）。

## 4. TikZ 图：构建期预渲染成静态 SVG

- 站点本地化 tikzjax 引擎（`site-lib/vendor/tikzjax/`，自带 `tex.wasm`，运行期零外网请求）。
- **518 张图在构建期渲染成静态 SVG**，分布在 19 个讲义页面；页面里是 `<img class="tikz-figure">`。
  **页面不再加载那个 6.7 MB 的引擎** —— 客户端渲染实测每张 20–40 秒，
  一页上百张等于不可用。
- ⚠️ **字体是承重的**：SVG 里的 `<text>` 用的是 BaKoMa Computer Modern **字形槽位**（不是 Unicode），
  必须同时加载 `tikzjax-fonts.css`（140 个 `@font-face`），否则公式会显示成「看着正常但错误」的字符。
- 图形样式在 `site-lib/styles/tikz-figures.css`。

```bash
node .build/tikz/prerender_tikz.js --resume   # 只重试失败项
```

## 5. 数据层

`site-lib/data/` 七个文件：`docs.json`（文档元数据 + 双向链接）、`links.json`（边）、
`search.json`（检索索引）、`tags.json`、`manifest.json`、`home.json`（以上六个由 `build_data.py` 产出）、
`site.json`（首页统计，由 `write_pages.py` 产出）。
id = `md5(path)` 前 10 位；所有 path 都是**仓库根相对、绝不以 `/` 开头**。

```bash
python .build/de/build_data.py     # 重建（一次产出 6 个 JSON）
python .build/de/verify.py         # 6 条验收，证据留档
```

**源 HTML 是移动目标**：任何批量改 `.html` 之后都必须重跑 `build_data.py`，
否则关系图与检索会指向已不存在的页面（表现为页面一直「载入中」）。

## 6. 验收

```bash
python .build/lead_final_check.py      # 全站 49 页 + 94 个唯一本地资源，全部 200、无 root-absolute
node   .build/test_graph_search.js     # 关系图 / 检索 134 项断言
python .build/de/verify.py             # 数据层
```

三个临时 HTTP 服务各司其职：检查器用线程化 `ThreadingTCPServer`（大文件如
mathjax-chtml.css 在单线程 `http.server` 下会断连导致误报 404）。

## 7. 已知限制

- 讲义页公式密集，单页最大约 2 MB（`chapter-31-解析几何-(ii)`；构建期预渲染换来离线可用 + 无闪烁，靠 gzip 缓解传输）。
- 5 张 TikZ 图无法渲染，原因与修复路径见 `site-lib/vendor/tikzjax/prerendered/KNOWN-LIMITATIONS.md`。
- 模拟卷只做清单页 + 外部链接，**不含答案与评分参考**。

## 8. 历史

- `99cbad9` 重写为个人博客站（Obsidian 式双链 + 关系图 + 检索）。
- `86f67af` 移植 HKDSE 项目全部文件并生成 56 个页面。
- `e27e4bf` 加 `.nojekyll`（否则 Pages 会跑 Jekyll 渲染仓库里的源 `.md`）。
- 之后按用户决定**重建信息架构**：只留「高中数学课程 / 大学数学内容」两个板块，
  删掉旧 78 页与 56 个内部工作稿（连同源文件），讲义重渲染为 35 章。
  回滚点：tag `checkpoint-before-restructure` / 分支 `backup/legacy-site`。
