---
tags: DSE课程笔记
---

# 22　变分（Variation）

> 上一章我们研究了二次函数的图像与性质，掌握了从代数方程到几何曲线的对应关系。再往前，第十九章在函数的集合论定义下引入了线性函数 $f(x) = kx + b$，其图像是一条直线。
>
> 函数描述的是变量间的依赖关系：给定 $x$，就有确定的 $y$ 与之对应。本章关注一类特殊的依赖关系——**变分 (variation)**，即因变量与自变量之间成某种**比例**的关系。回顾初中第七章已学的正比例（$y = kx$）与反比例（$y = k/x$），本章将把它们严格化、推广化：先引入平均变化率作为量化变化的工具（§22.1），再定义正变与反变（§22.2–§22.3），讨论变分符号 $\propto$ 的性质（§22.4），然后推广到多变量的联变与部分变（§22.5–§22.6），处理变量百分比变化的分析技巧（§22.7），最后以变分视角重新审视已学公式（§22.8）。

前置：[[Chapter 7 率、比及百分法|率、比及百分法]]、[[Chapter 19 函数及其图像|函数及其图像]]、[[Chapter 21 二次函数|二次函数]]

---

## 22.1　平均变化率 (Average Rate of Change)

> **本节难度上限**：T C ｜ C D ｜ E D ｜ Q C

> 本节引入平均变化率的概念，作为量化变量变化程度的工具，并给出其在物理中的对应——平均速度。

### 22.1.1　平均变化率的定义

设 $f: \mathbb{R} \to \mathbb{R}$ 为实函数，记 $y = f(x)$。当 $x$ 从 $x_1$ 变化到 $x_2$ 时，$y$ 相应地从 $f(x_1)$ 变化到 $f(x_2)$。描述这一过程中 $y$ 随 $x$ 变化的「平均快慢程度」的量，就是平均变化率。

````ad-def
title: 定义（平均变化率） | Definition（Average Rate of Change）

设 $f: [a,b] \to \mathbb{R}$ 为实函数，$y = f(x)$。当 $x$ 从 $x_1$ 变化到 $x_2$ 时，$y$ 相应地从 $f(x_1)$ 变化到 $f(x_2)$，则 $y$ 关于 $x$ 在该区间上的**平均变化率 (average rate of change)** 为

$$\frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$$

其中 $\Delta x = x_2 - x_1$ 是 $x$ 的改变量，$\Delta y = f(x_2) - f(x_1)$ 是 $y$ 的改变量。
````

**几何意义：** 在坐标平面上，点 $(x_1, f(x_1))$ 与 $(x_2, f(x_2))$ 是函数图像上的两点。连接这两点的直线称为**割线 (secant line)**，平均变化率 $\dfrac{\Delta y}{\Delta x}$ 恰好是这条割线的斜率。

> 平均变化率描述的是变化在整体区间上的「平均快慢」，并不反映其间任意时刻的瞬时变化。瞬时变化率的概念留待未来微积分课程。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=9cm, height=7cm,
    xmin=-0.5, xmax=4, ymin=-1, ymax=10,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={1,3}, ytick={1,9},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% curve y = x^2
\addplot[domain=0:3.3, samples=80, blue!70!black, thick] {x^2};
% secant line
\addplot[domain=0.5:3.3, samples=2, red!70!black, thick, dashed] {4*x - 3};
% two points
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:1,1) {};
\node[anchor=north east, font=\tiny] at (axis cs:1,1) {$(x_1, y_1)$};
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:3,9) {};
\node[anchor=south west, font=\tiny] at (axis cs:3,9) {$(x_2, y_2)$};
% Delta x and Delta y
\draw[<->, green!60!black, thick] (axis cs:1,0.5) -- (axis cs:3,0.5);
\node[anchor=north, font=\tiny] at (axis cs:2,0.5) {$\Delta x$};
\draw[<->, green!60!black, thick] (axis cs:3.3,1) -- (axis cs:3.3,9);
\node[anchor=west, font=\tiny] at (axis cs:3.3,5) {$\Delta y$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 22-1：曲线 $y = x^2$ 上两点 $(1, 1)$ 与 $(3, 9)$ 的割线（红色虚线），其斜率即平均变化率 $\dfrac{\Delta y}{\Delta x} = \dfrac{9-1}{3-1} = 4$。

### 22.1.2　物理应用：平均速度

平均变化率在物理中最直接的应用是平均速度。设位移 $s$（单位：米）是时间 $t$（单位：秒）的函数 $s(t)$，则位移对时间的平均变化率就是平均速度。

````ad-cor
title: 推论（平均速度） | Corollary（Average Velocity）

设位移 $s$ 为时间 $t$ 的函数 $s(t)$。则 $t_1$ 至 $t_2$ 期间的**平均速度 (average velocity)** 为

$$v_{\text{avg}} = \frac{s(t_2) - s(t_1)}{t_2 - t_1}$$

单位为 $\text{m/s}$（米每秒）。
````

> 平均速度只取决于起点和终点的位移差，与路径无关。若 $s(t_2) - s(t_1) = 0$（返回起点），则平均速度为 $0$，即便途中曾高速运动。

````ad-example
title: 示例（平均变化率与平均速度） | Example（Average Rate of Change and Average Velocity）

一物体沿直线运动，位移 $s$（米）与时间 $t$（秒）的关系为 $s(t) = t^2$。

(a) 求 $t$ 从 $1$ 到 $3$ 期间位移的平均变化率；

(b) 说明该平均变化率的物理意义。

---

**(a)** 当 $t = 1$ 时 $s(1) = 1$，当 $t = 3$ 时 $s(3) = 9$。

$$\frac{\Delta s}{\Delta t} = \frac{s(3) - s(1)}{3 - 1} = \frac{9 - 1}{2} = \frac{8}{2} = 4$$

平均变化率为 $4\ \text{m/s}$。

**(b)** 位移对时间的平均变化率即平均速度。因此该物体在 $t = 1$ 至 $t = 3$ 期间的平均速度为 $4\ \text{m/s}$。几何上，这是函数 $s(t) = t^2$ 图像上点 $(1, 1)$ 与 $(3, 9)$ 连线的斜率。
````

---

## 22.2　正变 (Direct Variation)

> **本节难度上限**：T C ｜ C D ｜ E D ｜ Q C

> 本节定义正变关系，建立其方程形式与图像特征，并掌握「先求 $k$，再求未知量」的解题策略。

### 22.2.1　正变的定义

初中第七章曾介绍正比例：当 $y$ 与 $x$ 的比值恒为常数时，称 $y$ 与 $x$ 成正比。本章将这一概念严格化，称为**正变**。

````ad-def
title: 定义（正变） | Definition（Direct Variation）

设 $x, y$ 为两个变量，$k$ 为非零常数。若 $y$ 与 $x$ 的比值恒为常数，即

$$\frac{y}{x} = k \quad (k \neq 0)$$

则称 **$y$ 随 $x$ 正变**（或 $y$ 与 $x$ 成正比），记为

$$y \propto x$$

其等价形式为 $y = kx$，其中 $k$ 称为**变分常数 (constant of variation)**。
````

> 符号 $\propto$ 读作「正变于」或「varies as」。$y \propto x$ 的含义是：$y$ 与 $x$ 的比值恒为某个非零常数 $k$，即 $y = kx$。

### 22.2.2　正变的图像

正变关系 $y = kx$ 可以看作一个实函数 $f: \mathbb{R} \to \mathbb{R},\ x \mapsto kx$。回顾第十九章 §19.3.2，这是线性函数 $f(x) = kx + b$ 在 $b = 0$ 时的特例，称为**正比例函数**。又由 §19.3.1，$f(x) = kx$ 满足线性性的两个条件：

- **可加性：** $f(a + b) = k(a + b) = ka + kb = f(a) + f(b)$
- **齐次性：** $f(cx) = k(cx) = c(kx) = cf(x)$

因此 $f$ 同时是线性函数与线性映射（这是两者唯一重合的情形，参见 §19.3.2 的对照表）。

用集合视角写出 $f$ 的图像：

$$G_f = \{\, (x, y) \in \mathbb{R}^2 \mid y = kx \,\}$$

由于 $f(0) = k \cdot 0 = 0$，故 $(0, 0) \in G_f$，即图像经过原点。$G_f$ 是坐标平面上一条通过原点的直线。

- 当 $k > 0$ 时，直线经过第一、三象限，$y$ 随 $x$ 增大而增大。
- 当 $k < 0$ 时，直线经过第二、四象限，$y$ 随 $x$ 增大而减小。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=8cm, height=7cm,
    xmin=-4, xmax=4, ymin=-6, ymax=6,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-3,-2,-1,1,2,3}, ytick={-4,-2,2,4},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% k > 0: y = 2x
\addplot[domain=-3:3, samples=2, blue!70!black, thick] {2*x};
\node[anchor=south west, font=\tiny] at (axis cs:1.5,3) {$y=2x\ (k>0)$};
% k < 0: y = -x
\addplot[domain=-4:4, samples=2, red!70!black, thick] {-1*x};
\node[anchor=north west, font=\tiny] at (axis cs:-3,3) {$y=-x\ (k<0)$};
% origin
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:0,0) {};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 22-2：正变 $y = kx$ 的图像。$k > 0$ 时直线过一、三象限（蓝），$k < 0$ 时直线过二、四象限（红），两者均通过原点。

> **关键特征：** 正变关系的图像必定通过原点。若图像是一条不通过原点的直线（如 $y = kx + c$，$c \neq 0$），则它不是正变关系，而是后面 §22.6 将讨论的部分变。

### 22.2.3　正变的求解

解决正变问题的标准步骤是：

1. **设常数** $k$，写出方程 $y = kx$。
2. **代入已知条件**求 $k$。
3. **用求出的 $k$** 计算未知量。

````ad-example
title: 示例（正变的基本求解） | Example（Basic Direct Variation）

已知 $y$ 随 $x$ 正变，当 $x = 3$ 时 $y = 12$。

(a) 求变分常数 $k$；

(b) 求当 $x = 5$ 时的 $y$ 值。

---

**(a)** 由正变定义，$y = kx$。代入 $x = 3$，$y = 12$：

$$12 = k \cdot 3 \implies k = 4$$

故变分常数为 $k = 4$，关系式为 $y = 4x$。

**(b)** 代入 $x = 5$：

$$y = 4 \times 5 = 20$$
````

````ad-example
title: 示例（正变的应用题） | Example（Direct Variation Application）

一弹簧的伸长量 $d$（cm）随所挂重物质量 $m$（kg）正变。当挂 $2\text{ kg}$ 时弹簧伸长 $3\text{ cm}$。

(a) 求 $d$ 与 $m$ 的关系式；

(b) 若弹簧最大伸长量为 $15\text{ cm}$，求最多可挂多少 kg？

---

**(a)** 由 $d \propto m$，得 $d = km$。代入 $m = 2$，$d = 3$：

$$3 = 2k \implies k = \frac{3}{2}$$

故 $d = \dfrac{3}{2}m$。

**(b)** 设 $d = 15$：

$$15 = \frac{3}{2}m \implies m = 15 \times \frac{2}{3} = 10$$

最多可挂 $10\text{ kg}$。
````

````ad-example
title: 示例（以正变关系描述函数） | Example（Describing a Function by Direct Variation）

已知函数 $f: \mathbb{R} \to \mathbb{R}$ 满足 $f(x) \propto x$，且 $f(3) = 15$。

(a) 求 $f(x)$ 的表达式；

(b) 求 $f(7)$ 的值。

---

**(a)** 由 $f(x) \propto x$，得 $f(x) = kx$。代入 $f(3) = 15$：

$$15 = 3k \implies k = 5$$

故 $f(x) = 5x$。

**(b)** $f(7) = 5 \times 7 = 35$。
````

---

## 22.3　反变 (Inverse Variation)

> **本节难度上限**：T C+ ｜ C D ｜ E D ｜ Q C

> 本节定义反变关系，建立其图像特征（双曲线），并证明反变与正变（对倒数）的等价关系。

### 22.3.1　反变的定义

正变是比值恒定，反变则是乘积恒定。

````ad-def
title: 定义（反变） | Definition（Inverse Variation）

设 $x, y$ 为两个变量，$k$ 为非零常数。若 $x$ 与 $y$ 的乘积恒为常数，即

$$xy = k \quad (k \neq 0)$$

则称 **$y$ 随 $x$ 反变**（或 $y$ 与 $x$ 成反比），记为

$$y \propto \frac{1}{x}$$

其等价形式为 $y = \dfrac{k}{x}$，其中 $k$ 为变分常数。定义域为 $x \neq 0$。
````

### 22.3.2　反变的图像

反变关系 $y = \dfrac{k}{x}$ 可以看作一个实函数 $f: \mathbb{R} \setminus \{0\} \to \mathbb{R},\ x \mapsto \dfrac{k}{x}$（定义域排除 $x = 0$，因分母不能为零）。用集合视角写出 $f$ 的图像：

$$G_f = \left\{\, (x, y) \in \mathbb{R}^2 \;\middle|\; y = \frac{k}{x},\; x \neq 0 \,\right\}$$

这个图像是**双曲线 (hyperbola)**。

- 当 $k > 0$ 时，双曲线位于第一、三象限。
- 当 $k < 0$ 时，双曲线位于第二、四象限。
- 曲线无限接近 $x$ 轴和 $y$ 轴，但永不触碰坐标轴。
- 双曲线关于原点 $(0, 0)$ 成中心对称。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=8cm, height=7cm,
    xmin=-5, xmax=5, ymin=-5, ymax=5,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-4,-2,2,4}, ytick={-4,-2,2,4},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% y = 4/x, first quadrant
\addplot[domain=0.9:5, samples=80, blue!70!black, thick] {4/x};
% y = 4/x, third quadrant
\addplot[domain=-5:-0.9, samples=80, blue!70!black, thick] {4/x};
% label
\node[anchor=south west, font=\tiny] at (axis cs:2,2) {$y=\frac{4}{x}$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 22-3：反变 $y = \dfrac{4}{x}$（$k = 4 > 0$）的图像为双曲线，位于第一、三象限。曲线无限接近坐标轴但永不触碰。

### 22.3.3　反变与正变的等价关系

反变 $y = \dfrac{k}{x}$ 可以理解为 $y$ 随 $\dfrac{1}{x}$ 正变。这一观察将反变与正变联系起来。

````ad-thm
title: 定理（反变与正变的等价关系） | Theorem（Equivalence of Inverse and Direct Variation）

$y$ 随 $x$ 反变，当且仅当 $y$ 随 $\dfrac{1}{x}$ 正变。即

$$y \propto \frac{1}{x} \iff y = k \cdot \frac{1}{x} \iff xy = k$$

其中 $k \neq 0$ 为常数。
````

````ad-proof
title: 证明 | Proof

**（$\Longrightarrow$）** 设 $y$ 随 $x$ 反变，则 $xy = k$（$k \neq 0$）。两边同除以 $x$（$x \neq 0$），得 $y = \dfrac{k}{x} = k \cdot \dfrac{1}{x}$。此即 $y$ 与 $\dfrac{1}{x}$ 的比值恒为常数 $k$，故 $y$ 随 $\dfrac{1}{x}$ 正变。

**（$\Longleftarrow$）** 设 $y$ 随 $\dfrac{1}{x}$ 正变，则 $y = k \cdot \dfrac{1}{x}$（$k \neq 0$）。两边同乘 $x$，得 $xy = k$，此即 $y$ 随 $x$ 反变的定义。
````

> 此定理揭示了反变本质上可视为以「$x$ 的倒数」为自变量的正变。因此，正变的所有性质均可通过对自变量取倒数后套用于反变情境。

````ad-example
title: 示例（反变的基本求解） | Example（Basic Inverse Variation）

已知 $y$ 随 $x$ 反变，当 $x = 4$ 时 $y = 6$。

(a) 求变分常数 $k$；

(b) 求当 $x = 8$ 时的 $y$ 值。

---

**(a)** 由反变定义，$xy = k$。代入 $x = 4$，$y = 6$：

$$k = 4 \times 6 = 24$$

故变分常数为 $k = 24$，关系式为 $y = \dfrac{24}{x}$。

**(b)** 代入 $x = 8$：

$$y = \frac{24}{8} = 3$$
````

````ad-example
title: 示例（反变的应用题） | Example（Inverse Variation Application）

完成一项工程所需时间 $t$（天）随工人数 $n$（人）反变。当 $n = 6$ 时 $t = 20$。

(a) 求 $t$ 与 $n$ 的关系式；

(b) 若要在 $15$ 天内完成，至少需要多少名工人？

---

**(a)** 由 $t \propto \dfrac{1}{n}$，得 $t = \dfrac{k}{n}$。代入 $n = 6$，$t = 20$：

$$20 = \frac{k}{6} \implies k = 120$$

故 $t = \dfrac{120}{n}$。

**(b)** 要求 $t \le 15$：

$$\frac{120}{n} \le 15 \implies n \ge \frac{120}{15} = 8$$

至少需要 $8$ 名工人。
````

````ad-example
title: 示例（以反变关系描述函数） | Example（Describing a Function by Inverse Variation）

已知函数 $f: \mathbb{R} \setminus \{0\} \to \mathbb{R}$ 满足 $f(x) \propto \dfrac{1}{x}$，且 $f(2) = 9$。

(a) 求 $f(x)$ 的表达式；

(b) 求 $f(6)$ 的值。

---

**(a)** 由 $f(x) \propto \dfrac{1}{x}$，得 $f(x) = \dfrac{k}{x}$。代入 $f(2) = 9$：

$$9 = \frac{k}{2} \implies k = 18$$

故 $f(x) = \dfrac{18}{x}$。

**(b)** $f(6) = \dfrac{18}{6} = 3$。
````

---

## 22.4　正变与反变的比较及变分符号的性质

> **本节难度上限**：T B- ｜ C C- ｜ E C ｜ Q D

> 本节系统比较正变与反变的异同，并建立变分符号 $\propto$ 的乘法性质，指出「乘可以，加不行」的关键区分。

### 22.4.1　正变与反变的比较

| 比较维度 | 正变 $y = kx$ | 反变 $y = \dfrac{k}{x}$ |
|:---|:---|:---|
| **定量关系** | $\dfrac{y}{x} = k$（比值恒定） | $xy = k$（乘积恒定） |
| **变化趋势** | $x$ 增大 $\implies$ $y$ 同向增大 | $x$ 增大 $\implies$ $y$ 反向减小 |
| **图像类型** | 通过原点的直线 | 双曲线 |
| **是否过原点** | 是 | 否（$x \neq 0$） |
| **与坐标轴关系** | 无特殊关系 | 曲线无限接近坐标轴但永不触碰 |

### 22.4.2　变分符号的乘法性质


````ad-thm
title: 定理（$\propto$ 的乘法性质） | Theorem（Multiplicative Property of $\propto$）

设 $a$ 为非零常数。则

$$y \propto x \iff y \propto (ax)$$
````

````ad-proof
title: 证明 | Proof

**（$\Longrightarrow$）** 设 $y \propto x$，则 $y = kx$（$k \neq 0$）。令 $k' = k/a$（$a \neq 0$ 故 $k'$ 有定义），则

$$y = kx \equiv \frac{k}{a} \cdot (ax) = k' \cdot (ax)$$

故 $y \propto (ax)$。

**（$\Longleftarrow$）** 设 $y \propto (ax)$，则 $y = k'(ax)$（$k' \neq 0$）。令 $k = k'a$，则 $y = k'(ax) = (k'a)x = kx$，故 $y \propto x$。
````

> **直观解释：** 正变关系只关心 $y$ 与 $x$ 的比值是否为常数。将 $x$ 乘以任意非零常数 $a$，只需同步调整变分常数（$k \mapsto k/a$），比值仍为常数。

>变分符号 $\propto$ 只对**乘法**封闭，但**加法**破坏比例结构：
>$$y \propto x \;\not\Longrightarrow\; y \propto (a + x) \quad (a \neq 0)$$

**反例：** 设 $y = 2x$，则 $y \propto x$。但若考察 $y$ 与 $(3 + x)$ 的关系，比值

$$\frac{y}{3 + x} = \frac{2x}{3 + x}$$

当 $x$ 取不同值时比值变化（如 $x = 0$ 时比值为 $0$，$x = 3$ 时比值为 $1$），非常数，故 $y$ 不随 $(3 + x)$ 正变。

> **教学口诀：** 「乘可以，加不行。」变分符号 $\propto$ 对自变量的缩放（乘法）封闭，对自变量的平移（加法）不封闭。

````ad-example
title: 示例（辨别正变与反变） | Example（Identifying Direct and Inverse Variation）

判断以下各关系中，$y$ 与 $x$ 之间是正变、反变，还是都不是。

(a) $y = 3x$；

(b) $y = \dfrac{5}{x}$；

(c) $y = 2x + 1$；

(d) $xy = 7$。

---

**(a)** $y = 3x$，即 $\dfrac{y}{x} = 3$（常数），故 $y$ 随 $x$ 正变，$k = 3$。

**(b)** $y = \dfrac{5}{x}$，即 $xy = 5$（常数），故 $y$ 随 $x$ 反变，$k = 5$。

**(c)** $y = 2x + 1$。虽然 $y$ 与 $x$ 成线性关系，但 $\dfrac{y}{x} = 2 + \dfrac{1}{x}$ 非常数（且图像不过原点），故不是正变。此为部分变（参见 §22.6）。

**(d)** $xy = 7$，即 $y = \dfrac{7}{x}$，乘积恒定，故 $y$ 随 $x$ 反变，$k = 7$。
````

---

## 22.5　联变 (Joint Variation)

> **本节难度上限**：T B- ｜ C C ｜ E C ｜ Q C

> 本节将正变与反变推广到多变量情形，建立联变的定义与一般形式，并训练将文字描述翻译为代数方程的能力。

### 22.5.1　联变的定义

当 $y$ 同时随多个变量变化时，需要将正变与反变推广到多变量情形。

````ad-def
title: 定义（联变） | Definition（Joint Variation）

设 $y$ 随多个变量变化。若 $y$ 同时随 $x$ 正变且随 $z$ 正变，则称 $y$ 随 $x$ 与 $z$ **联变 (joint variation)**，其方程为

$$y = kxz \quad (k \neq 0)$$

其中 $k$ 为变分常数。
````

````ad-note
title: 注记（联变与多元函数） | Remark（Joint Variation and Multivariable Function）

联变关系 $y = kxz$ 可以看作一个**二元函数** $f: \mathbb{R}^2 \to \mathbb{R},\ (x, z) \mapsto kxz$。即输入是一个有序对 $(x, z)$，输出是一个实数 $y = kxz$。第十九章定义的是一元函数 $f: A \to B$，此处将其推广到多元情形：定义域为 $\mathbb{R}^2$（或其子集），对应法则为各变量的幂次乘积乘以常数 $k$。
````

联变可扩展至更多变量和更一般的幂次组合。例如：

- 「$y$ 随 $x$ 正变，且随 $z$ 反变」对应 $y = \dfrac{kx}{z}$。
- 「$y$ 随 $x^2$ 正变且随 $\sqrt{z}$ 反变」对应 $y = \dfrac{kx^2}{\sqrt{z}}$。

一般形式：联变方程为各变量的幂次乘积乘以常数 $k$。

联变的主要难点在于将文字描述准确翻译为代数方程。常见表述对应如下：

| 文字描述（英文） | 文字描述（中文） | 方程形式 |
|:---|:---|:---|
| $A$ varies directly as $B$ | $A$ 随 $B$ 正变 | $A = kB$ |
| $A$ varies inversely as $B$ | $A$ 随 $B$ 反变 | $A = \dfrac{k}{B}$ |
| $A$ varies as the square of $B$ | $A$ 随 $B$ 的平方正变 | $A = kB^2$ |
| $A$ varies inversely as the square root of $B$ | $A$ 随 $B$ 的平方根反变 | $A = \dfrac{k}{\sqrt{B}}$ |
| $A$ varies jointly as $B$ and $C$ | $A$ 随 $B$ 与 $C$ 联变 | $A = kBC$ |

> 常见陷阱：混淆「$A$ varies as the square of $B$」（$A = kB^2$）与「$A$ varies as $B$」（$A = kB$）。务必仔细阅读「square」「square root」等关键词。

````ad-example
title: 示例（联变的求解） | Example（Solving Joint Variation）

$y$ 随 $x$ 正变且随 $z$ 反变。当 $x = 2$，$z = 3$ 时 $y = 8$。

(a) 写出 $y$ 与 $x$、$z$ 的关系式；

(b) 求当 $x = 4$，$z = 6$ 时的 $y$ 值。

---

**(a)** 由题意，$y$ 随 $x$ 正变且随 $z$ 反变，故

$$y = \frac{kx}{z}$$

代入 $x = 2$，$z = 3$，$y = 8$：

$$8 = \frac{k \cdot 2}{3} \implies k = 8 \times \frac{3}{2} = 12$$

故关系式为 $y = \dfrac{12x}{z}$。

**(b)** 代入 $x = 4$，$z = 6$：

$$y = \frac{12 \times 4}{6} = \frac{48}{6} = 8$$
````

---

## 22.6　部分变 (Partial Variation)

> **本节难度上限**：T B- ｜ C C ｜ E C ｜ Q C

> 本节定义部分变关系，掌握其常见形式与求解方法（联立方程组求常数），并理解部分变与普通线性方程的区分。

### 22.6.1　部分变的定义与常见形式

若变量 $y$ 由多个「部分」组成，且每个部分各自随 $x$（或其它变量）以不同规律变化，则称 $y$ 与 $x$ 之间为**部分变**关系。

````ad-def
title: 定义（部分变） | Definition（Partial Variation）

若变量 $y$ 由多个遵循不同变分规律的部分组成，则称 $y$ 与 $x$ 之间为**部分变 (partial variation)** 关系。部分变没有单一的固定方程形式，须根据文字描述逐部分建立。
````

部分变没有单一的固定方程形式，以下列出三种常见形式：

**形式 I：$y$ 一部分为常数，另一部分随 $x$ 正变**

$$y = k_1 + k_2 x \quad (k_1 \neq 0,\; k_2 \neq 0)$$

此为线性方程。但由于题干明确指出由「常数部分」与「随 $x$ 正变的部分」组成，故归类为部分变。图像是通过 $(0, k_1)$ 的直线。

> **应用实例：** 出租车收费模型。设车费 $F$（元）由起步价 $A$（固定常数）与行驶距离 $d$（公里）所对应的里程费组成，每公里收费 $B$ 元，则 $F = A + Bd$。其中 $A$ 为常数部分，$Bd$ 为随距离正变的部分。

**形式 II：$y$ 的一部分随 $x$ 正变，另一部分随 $x^2$ 正变**

$$y = k_1 x + k_2 x^2$$

**形式 III：$y$ 的一部分随 $x$ 正变，另一部分随 $x$ 反变**

$$y = k_1 x + \frac{k_2}{x}$$

### 22.6.2　部分变的求解


````ad-example
title: 示例（部分变的求解） | Example（Solving Partial Variation）

$y$ 的一部分为常数，另一部分随 $x$ 正变。当 $x = 2$ 时 $y = 7$，当 $x = 5$ 时 $y = 13$。

(a) 求 $k_1$ 与 $k_2$；

(b) 求当 $x = 8$ 时的 $y$ 值。

---

**(a)** 由题意，$y = k_1 + k_2 x$。代入两组条件：

$$\begin{cases} 7 = k_1 + 2k_2 \quad \cdots (1) \\ 13 = k_1 + 5k_2 \quad \cdots (2) \end{cases}$$

$(2) - (1)$：$6 = 3k_2$，得 $k_2 = 2$。

代入 $(1)$：$k_1 = 7 - 2 \times 2 = 3$。

故 $k_1 = 3$，$k_2 = 2$，关系式为 $y = 3 + 2x$。

**(b)** 代入 $x = 8$：

$$y = 3 + 2 \times 8 = 3 + 16 = 19$$
````

> **部分变与正变的区分：** $y = k_1 + k_2 x$ 在形式上与线性方程 $y = mx + c$ 相同，但关键区分在于**题干的表述方式**。若题干明确指出「一部分为常数，另一部分随 $x$ 正变」，则为部分变；若只给出 $y = 2x + 3$ 而无此类描述，则只是普通线性方程。
>
> 此外，正变 $y = kx$ 的图像必过原点，而部分变 $y = k_1 + k_2 x$（$k_1 \neq 0$）的图像不一定过原点。

---

## 22.7　变量百分比变化分析

> **本节难度上限**：T B- ｜ C C+ ｜ E C ｜ Q C

> 本节处理当联变或部分变中的变量发生百分比变化时，如何利用乘法因子分析其对另一变量的影响。

### 22.7.1　方法

当比例关系中的某些变量发生百分比变化时，可利用联变方程计算其对另一变量的影响。步骤如下：

1. 写出原状态下的联变方程。
2. 对发生变化的变量施加相应的乘法因子（例如增加 $20\%$ 对应乘以 $1.2$；减少 $15\%$ 对应乘以 $0.85$）。
3. 代入新状态方程，比较新旧值。

> **一般公式：** 设联变关系为 $y = k\,x^a z^b w^c$，其中 $k$ 为常数，$a, b, c$ 为实数指数。若 $x, z, w$ 分别变为 $r_1 x$、$r_2 z$、$r_3 w$（$r_i > 0$ 为变化倍数），则新值
> $$y' = k\,(r_1 x)^a (r_2 z)^b (r_3 w)^c = r_1^a\, r_2^b\, r_3^c \cdot y$$
> 即 $y$ 的变化倍数为 $\dfrac{y'}{y} = r_1^a\, r_2^b\, r_3^c$，与常数 $k$ 及变量的具体取值无关。

````ad-example
title: 示例（变量百分比变化分析） | Example（Percentage Change Analysis）

设 $y = kxz$（$k$ 为常数）。若 $x$ 增加 $20\%$，$z$ 减少 $10\%$，求 $y$ 的百分比变化。

---

设原值为 $x$、$z$、$y = kxz$。

$x$ 增加 $20\%$，新值 $x' = 1.2x$。

$z$ 减少 $10\%$，新值 $z' = 0.9z$。

新值 $y'$：

$$y' = k \cdot x' \cdot z' = k \cdot (1.2x) \cdot (0.9z) = 1.08 \cdot kxz = 1.08y$$

故 $y$ 增加了 $8\%$。
````

````ad-example
title: 示例（含幂次的联变百分比变化） | Example（Percentage Change with Powers）

$y$ 随 $x$ 的平方正变且随 $z$ 正变。若 $x$ 增加 $10\%$，$z$ 减少 $20\%$，求 $y$ 的百分比变化。

---

由题意，$y = kx^2 z$。$x$ 增加 $10\%$，$x' = 1.1x$；$z$ 减少 $20\%$，$z' = 0.8z$。

$$y' = k(1.1x)^2(0.8z) = 1.21 \times 0.8 \times kx^2 z = 0.968\,y$$

故 $y$ 减少了 $3.2\%$。
````

````ad-example
title: 示例（部分变的百分比变化） | Example（Percentage Change in Partial Variation）

$y$ 的一部分为常数，另一部分随 $x$ 正变。当 $x = 10$ 时 $y = 30$，当 $x = 20$ 时 $y = 50$。若 $x$ 从 $20$ 增加 $10\%$，求 $y$ 的百分比变化。

---

**第一步，求关系式。** $y = k_1 + k_2 x$。代入：

$$\begin{cases} 30 = k_1 + 10k_2 \\ 50 = k_1 + 20k_2 \end{cases}$$

解得 $k_2 = 2$，$k_1 = 10$，故 $y = 10 + 2x$。

**第二步，求百分比变化。** 当 $x = 20$ 时 $y = 50$。$x$ 增加 $10\%$，$x' = 22$。

$$y' = 10 + 2 \times 22 = 54$$

变化率 $= \dfrac{54 - 50}{50} = \dfrac{4}{50} = 8\%$，故 $y$ 增加了 $8\%$。

> **注意：** 部分变的百分比变化不能用简单的乘法因子计算（因常数部分不随 $x$ 变化），须先求出关系式再代入具体值。
````

---

## 22.8　变分与过往公式的联系 (Connection with Prior Formulas)

> **本节难度上限**：T C+ ｜ C C- ｜ E C ｜ Q C

> 本节以变分的视角重新审视已学公式，加深对变量间依赖关系的理解。

本章的变分概念是对变量关系的统一抽象。回顾已学公式，大部分均可纳入变分框架：

- **圆周长公式** $C = 2\pi r$：$C$ 随 $r$ 正变，变分常数 $k = 2\pi$。
- **圆面积公式** $A = \pi r^2$：$A$ 随 $r^2$ 正变（注意不是随 $r$ 正变），变分常数 $k = \pi$。
- **（物理）匀速运动** $s = vt$：固定速度 $v$ 时，位移 $s$ 随 $t$ 正变。
- **（物理）欧姆定律** $V = IR$：固定电阻 $R$ 时，电压 $V$ 随电流 $I$ 正变。
- **（物理）等温过程** $PV = \text{常数}$：在恒温条件下，气体的压强 $P$ 与体积 $V$ 成反变。

````ad-example
title: 示例（辨认公式中的变分关系） | Example（Identifying Variation in Formulas）

判断以下公式中变量间的变分关系。

(a) 圆面积 $A = \pi r^2$；

(b) 欧姆定律 $V = IR$（固定 $R$）。

---

**(a)** 考察 $\dfrac{A}{r^2} = \pi$（常数），故 $A$ 随 $r^2$ 正变，变分常数 $k = \pi$。

注意：$A$ **不是**随 $r$ 正变，因为 $\dfrac{A}{r} = \pi r$ 非常数（随 $r$ 变化）。

**(b)** 固定 $R$ 时，$\dfrac{V}{I} = R$（常数），故 $V$ 随 $I$ 正变，变分常数 $k = R$。
````

> 变分是从「比例依赖」的角度对已学公式的重新抽象。正变、反变、联变、部分变，本质上都是用变分符号 $\propto$ 和变分常数 $k$ 统一描述变量间的比例关系。

---

## 22.9　小结 (Summary)

### 九条主线

1. **平均变化率**（§22.1）：$\dfrac{\Delta y}{\Delta x} = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ 是变化过程的量化描述，几何上对应割线斜率。物理中，位移对时间的平均变化率即平均速度。
2. **正变**（§22.2）：$y = kx$（$k \neq 0$），图像是通过原点的直线，满足 $\dfrac{y}{x} = k$（比值恒定）。正变函数 $f: \mathbb{R} \to \mathbb{R},\ x \mapsto kx$ 同时满足线性性（可加性 + 齐次性）。
3. **反变**（§22.3）：$y = \dfrac{k}{x}$（$k \neq 0$），图像是双曲线（曲线无限接近坐标轴但永不触碰），满足 $xy = k$（乘积恒定）。
4. **反变与正变的等价关系**（§22.3）：反变 $\iff$ 对 $1/x$ 正变，可将反变问题转化为正变处理。
5. **$\propto$ 的乘法性质**（§22.4）：$y \propto x \iff y \propto (ax)$（$a \neq 0$）。**仅乘法封闭，加法不适用**——$y \propto x$ 不蕴含 $y \propto (a+x)$。
6. **联变**（§22.5）：$y = k \cdot$（各变量的幂次乘积），可视为多元函数 $f: \mathbb{R}^n \to \mathbb{R}$。关键能力在于将文字描述准确转译为代数方程。
7. **部分变**（§22.6）：$y$ 由多个遵循不同变分规律的部分组成，如 $y = k_1 + k_2 x$ 或 $y = k_1 x + k_2 x^2$。通过联立方程组求解 $k_1$ 与 $k_2$。
8. **变量百分比变化分析**（§22.7）：通过乘法因子代入方程求解未知变化。联变的百分比变化可用公式 $\dfrac{y'}{y} = r_1^a r_2^b r_3^c$ 直接计算；部分变须先求关系式再代入。
9. **与过往公式的联系**（§22.8）：变分为一切变量关系的统一语言。

### 公式总表

| 关系 | 方程形式 | 图像 | 恒定量 | 备注 |
|:---|:---|:---|:---|:---|
| 正变 | $y = kx$ | 过原点的直线 | $\dfrac{y}{x} = k$ | $k \neq 0$ |
| 反变 | $y = \dfrac{k}{x}$ | 双曲线 | $xy = k$ | $k \neq 0$，$x \neq 0$ |
| 联变 | $y = kxz$ | — | $k$ | 各变量幂次乘积 |
| 部分变（I） | $y = k_1 + k_2 x$ | 不过原点的直线 | — | 常数 + 正变 |
| 部分变（II） | $y = k_1 x + k_2 x^2$ | 抛物线 | — | 正变 + 平方正变 |
| 部分变（III） | $y = k_1 x + \dfrac{k_2}{x}$ | — | — | 正变 + 反变 |

---

## 词汇表 (Vocabulary)

| 中文 | 英文 | 备注 |
|------|------|------|
| 平均变化率 | average rate of change | $\dfrac{\Delta y}{\Delta x}$ |
| 割线 | secant line | 函数图像上两点的连线 |
| 平均速度 | average velocity | 位移对时间的平均变化率 |
| 变分 | variation | 变量间的比例依赖关系 |
| 正变 | direct variation | $y = kx$ |
| 反变 | inverse variation | $y = k/x$ |
| 变分常数 | constant of variation | $k$ |
| 变分符号 | variation symbol | $\propto$ |
| 联变 | joint variation | $y = kxz$ |
| 部分变 | partial variation | $y = k_1 + k_2 x$ 等 |
| 双曲线 | hyperbola | 反变的图像 |
| 乘法性质 | multiplicative property | $y \propto x \iff y \propto (ax)$ |

---

## 备课提示 (Teaching Notes)

* **平均变化率的定位**：§22.1 为量化变化的预备工具，为后续正变/反变中「比值恒定」「乘积恒定」的概念做铺垫。注意平均变化率描述的是区间上的平均，不反映瞬时变化（瞬时变化率留待 M1/M2 微积分）。
* **常数 $k$ 的意义**：解决变分问题的第一步永远是「设常数 $k$」并列出方程。教学中反复强调：**先求 $k$，再求未知量**。不写 $k$（如直接写 $y = x$）是概念性错误。
* **语言转译训练**：学生的主要难点在于阅读理解。需专门训练将文字翻译为数学符号的能力。常见陷阱：混淆「$A$ varies as the square of $B$」（$A = kB^2$）与「$A$ varies as $B$」（$A = kB$）。
* **部分变的辨析**：$y = k_1 + k_2 x$ 形式学生常将其与普通线性方程混为一谈。关键区分在于题干的表述方式：若题干明确指出了「一部分……另一部分……」，则为部分变，需要通过联立方程组求解 $k_1$ 与 $k_2$。
* **图像与代数的结合**：强调正变图像必须通过原点——这是区分「纯正变」与「含常数项的部分变」的直观方法。反变图像的双曲线形状（尤其是曲线与坐标轴的关系）学生较难理解，可在介绍反比关系时辅以图像直观。
* **「乘可以，加不行」**：变分符号 $\propto$ 只对乘法封闭，加法破坏比例结构。这是本章的关键易错点，须用反例强化。
* **TikZ 插图**：本章共 3 张插图。TikZJax 不支持中文出现在 title、node 等命令参数中，故图形内文字一律用英文/数学符号。

---

<sub>本章撰写于 2026 年 7 月 12 日，修订于 2026 年 7 月 18 日。</sub>
