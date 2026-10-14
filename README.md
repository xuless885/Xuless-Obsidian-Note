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
    docs.json                  78 篇文档的元数据 + 双向链接关系
    links.json                 232 条有向关系边
    tags.json                  标签词表与归属
    search.json                全文检索索引
    manifest.json              站点概要
    home.json                  首页专用瘦身索引（约 8KB）
  styles/obsidian.css 等       Obsidian 导出原样式（保留，新主题在其后覆盖）

hkdse-course/                  HKDSE 数学课程内容（78 个内容页）
  大纲/                        课程阐释 PDF 壳页、官方考点大纲、词汇表
  dse-课题讲义/                 Chapter 0–25 课题讲义
  dse-textbook-plan/           Ch00–Ch36 Textbook Plan 草稿
  图片/                        配图（SVG / PNG）
许少xuless的数字花园/           数字花园入口 + legal/
```

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

`site-lib/data/*.json` 全部由脚本从 `site-lib/metadata.json`（Obsidian 导出产物）与各页
HTML 中抽取生成。**内容页的链接若发生改动，必须重建索引**，否则关系图与反向链接面板会
与实际内容脱节：

```bash
python .build/de/build_data.py     # 约 30 秒，一次性重建全部 6 个数据文件
python .build/de/verify.py         # 校验（exit 0 表示通过）
```

构建是确定性的：连跑两次除时间戳外逐字节相同。

## 运维脚本

`.build/` 已被 `.gitignore` 忽略，属本地工具目录：

| 脚本 | 用途 |
| --- | --- |
| `de/build_data.py` | 重建 `site-lib/data/*.json` |
| `de/verify.py` | 数据索引完整性校验 |
| `lead_final_check.py` | 全站终验：抓取所有页面与其引用的每个本地资源，断言全部 200 |
| `inject_content.py` | 幂等地为内容页注入主题/导航/面板（判重标记见下） |
| `lead_deadassets.py` | 清理导出遗留的死资源引用（已执行） |
| `lead_headfix.py` | 回补误删的 `<head>` 注入块（已执行） |
| `lead_linkfix.py` | 死链修复（已执行） |
| `test_graph_search.js` | 关系图与检索的 headless 逻辑 + jsdom 集成自测（124 项） |

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
