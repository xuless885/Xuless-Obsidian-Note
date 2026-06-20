"""
Chapter 12 数据的组织与表达 — 统计图生成
输出：SVG 格式，保存到 图片/ 目录
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import os

# 中文字体
plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei", "Noto Sans CJK SC", "WenQuanYi Micro Hei"]
plt.rcParams["axes.unicode_minus"] = False

out_dir = r"C:\Users\xuless\OneDrive\Xuless Obsidian Note\HKDSE course\图片"
os.makedirs(out_dir, exist_ok=True)

# ============================================================
# 1. 直方图 (Histogram) — 阅读时间数据
# ============================================================
reading_time = [32, 45, 28, 51, 38, 42, 55, 30, 47, 35,
                41, 53, 29, 48, 36, 44, 50, 33, 46, 39]
bins = [25, 30, 35, 40, 45, 50, 55, 60]

fig, ax = plt.subplots(figsize=(7, 4.5))
ax.hist(reading_time, bins=bins, edgecolor="black", color="lightblue", linewidth=1.2)
ax.set_xlabel("阅读时间 (分钟)")
ax.set_ylabel("频数")
ax.set_title("直方图：学生每日阅读时间")
ax.set_xticks(bins)
ax.yaxis.set_major_locator(plt.MaxNLocator(integer=True))
fig.tight_layout()
fig.savefig(os.path.join(out_dir, "Ch12_histogram.svg"))
plt.close(fig)
print("[OK] histogram")

# ============================================================
# 2. 棒形图 (Bar Chart) — 颜色喜好
# ============================================================
colors = ["红色", "蓝色", "绿色", "黄色", "紫色"]
counts = [12, 18, 8, 15, 7]

fig, ax = plt.subplots(figsize=(6, 4.5))
ax.bar(colors, counts, color="lightgreen", edgecolor="black", linewidth=1.2)
ax.set_xlabel("颜色")
ax.set_ylabel("人数")
ax.set_title("棒形图：学生最喜欢的颜色")
ax.set_yticks(range(0, max(counts) + 2, 2))
fig.tight_layout()
fig.savefig(os.path.join(out_dir, "Ch12_bar_chart.svg"))
plt.close(fig)
print("[OK] bar chart")

# ============================================================
# 3. 频数多边形 (Frequency Polygon)
# ============================================================
midpoint = np.array([27, 32, 37, 42, 47, 52, 57])
freq = np.array([2, 3, 4, 3, 4, 3, 1])
x_poly = np.insert(np.append(midpoint, 62), 0, 22)
y_poly = np.insert(np.append(freq, 0), 0, 0)

fig, ax = plt.subplots(figsize=(7, 4.5))
ax.plot(x_poly, y_poly, "o-", color="blue", markersize=6, linewidth=1.5)
ax.set_xlabel("组中点 (阅读时间 / 分钟)")
ax.set_ylabel("频数")
ax.set_title("频数多边形：学生每日阅读时间")
ax.set_xticks(x_poly)
ax.grid(True, alpha=0.3)
fig.tight_layout()
fig.savefig(os.path.join(out_dir, "Ch12_freq_polygon.svg"))
plt.close(fig)
print("[OK] frequency polygon")

# ============================================================
# 4. 频数曲线 (Frequency Curve) — 平滑拟合
# ============================================================
from scipy.interpolate import make_interp_spline

fig, ax = plt.subplots(figsize=(7, 4.5))
# 首尾加 0 点
x_all = np.array([22, 27, 32, 37, 42, 47, 52, 57, 62])
y_all = np.array([0, 2, 3, 4, 3, 4, 3, 1, 0])

# 平滑样条
x_smooth = np.linspace(22, 62, 200)
spl = make_interp_spline(x_all, y_all, k=3)
y_smooth = spl(x_smooth)
y_smooth = np.clip(y_smooth, 0, None)

ax.plot(x_smooth, y_smooth, "red", linewidth=2, label="频数曲线")
ax.scatter(midpoint, freq, color="blue", zorder=5, label="数据点")
ax.set_xlabel("组中点")
ax.set_ylabel("频数")
ax.set_title("频数曲线")
ax.set_xticks(x_all)
ax.legend()
ax.grid(True, alpha=0.3)
fig.tight_layout()
fig.savefig(os.path.join(out_dir, "Ch12_freq_curve.svg"))
plt.close(fig)
print("[OK] frequency curve")

# ============================================================
# 5. 累积频数曲线 (Ogive) — 考试分数
# ============================================================
upper = np.array([9, 19, 29, 39, 49, 59, 69, 79])
cf = np.array([2, 7, 15, 27, 37, 44, 48, 50])
x_ogive = np.insert(upper, 0, 0)
y_ogive = np.insert(cf, 0, 0)

fig, ax = plt.subplots(figsize=(7, 5))
ax.plot(x_ogive, y_ogive, "o-", color="darkgreen", markersize=6, linewidth=1.5)
# 中位数参考线
ax.axhline(y=25, color="red", linestyle="--", linewidth=1)
ax.text(2, 27, "中位数位置 (CF=25)", color="red", fontsize=9)
ax.set_xlabel("分数 (上组界)")
ax.set_ylabel("累积频数")
ax.set_title("Ogive：考试分数累积频数曲线")
ax.set_xticks(x_ogive)
ax.grid(True, alpha=0.3)
fig.tight_layout()
fig.savefig(os.path.join(out_dir, "Ch12_ogive.svg"))
plt.close(fig)
print("[OK] ogive")

# ============================================================
# 6. 干叶图 — 文本输出
# ============================================================
scores = [23, 31, 45, 28, 36, 42, 31, 38, 25, 40, 33, 29, 41, 31, 37]
stems = {}
for s in sorted(scores):
    stem = s // 10
    leaf = s % 10
    stems.setdefault(stem, []).append(leaf)

lines = ["干叶图 (Stem-and-Leaf)：默书分数\n",
         "Stem | Leaf\n",
         "-----+-----\n"]
for stem in sorted(stems):
    leaves_str = "  ".join(str(l) for l in stems[stem])
    lines.append(f"  {stem}  |  {leaves_str}\n")
lines.append("Key: 2 | 3 代表 23\n")

stem_path = os.path.join(out_dir, "Ch12_stem_leaf.txt")
with open(stem_path, "w", encoding="utf-8") as f:
    f.writelines(lines)
print("[OK] stem-and-leaf (text)")
print("".join(lines))

print("\n=== 全部完成 ===")
