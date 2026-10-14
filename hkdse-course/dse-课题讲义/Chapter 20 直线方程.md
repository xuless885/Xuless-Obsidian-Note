---
tags: DSE课程笔记
---

# 20　直线方程（Equation of Straight Line）

> 上一章我们研究了函数及其图像，其中线性函数 $f(x) = kx + b$ 的图像是一条直线。再往前，[[Chapter 15 解析几何 (I)|解析几何 (I)]] 教会我们用坐标表示点、用公式度量距离与中点，并指出：几何图形的方程，就是对其上点的坐标所施加的**代数约束**。本章把这两条线索汇合成一句话：
>
> **平面上的直线恰好就是二元一次方程 $Ax + By + C = 0$（$A$、$B$ 不全为零）的解集。**
>
> 这句话是全章的主干，两个方向都由 §20.3.1 的两条引理与推论（过两点的直线方程）证明。斜率（§20.2）是把直线写成方程的工具；点斜式、两点式、斜截式与截距式（§20.3.3 至 §20.3.5）是同一方程在不同已知条件下的改写，也是由已知条件写出方程的四种常规走法；两直线的位置关系与直线同坐标轴的交点（§20.4）、以及距离（§20.5）都从这个方程的系数读出来。
>
> §20.1 先回顾第 15 章的约束思想，并用 [[Chapter 16 集合论|集合论]] 的语言重新表述，为全章奠定语言基础。

前置：[[Chapter 8 平面几何 (I)|平面几何(I)]]、[[Chapter 15 解析几何 (I)|解析几何 (I)]]、[[Chapter 16 集合论|集合论]]、[[Chapter 19 函数及其图像|函数及其图像]]

---

## 20.1　图形、方程与点集 (Figures, Equations and Point Sets)

> **本节难度上限**：T C ｜ C D ｜ E C ｜ Q B

> 本节回顾第 15 章的核心思想，即几何图形的方程是对其上点的代数约束，并用第 16 章的集合论语言重新表述，为全章备好语言；节末按同一套语言给出平面上的直线的点集定义 $L_{AB}$，它只用 [[Chapter 8 平面几何 (I)|平面几何 (I)]] §8.1「基本元素」小节的共线直观与公理（两点连线），不用坐标也不用斜率，故 §20.2 起各节都能直接引用。「点落在直线上」怎么用坐标验算，留到 §20.3.1。

### 20.1.1　回顾：方程作为代数约束

第 15 章 §15.2.1 曾指出：平面上一个几何图形的**方程**，是对其上点的坐标 $(x, y)$ 所施加的**代数约束条件**。三类最简单的情形已经把「约束」这个词说清楚了。

**水平线 $y = k$**：约束是「$y$ 必须等于 $k$」，$x$ 自由。在这条线上任取两点 $P_1$、$P_2$，它们的纵坐标同为 $k$，横坐标 $x_1$、$x_2$ 各取任何值都可以，如图 20-1A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.7,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.3) -- (0,2.1) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.5,1.3) -- (2.5,1.3);
  \node[above right] at (1.6,1.3) {$y = k$};
  \draw[dashed] (-1.4,1.3) -- (-1.4,0);
  \draw[dashed] (0.9,1.3) -- (0.9,0);
  \fill (-1.4,1.3) circle (1.3pt) node[above left] {$P_1$};
  \fill (0.9,1.3) circle (1.3pt) node[above left] {$P_2$};
  \node[below] at (-1.4,0) {$x_1$};
  \node[below] at (0.9,0) {$x_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-1A：水平线 $y = k$。
>
> $P_1$、$P_2$ 的虚线垂足给出各自的横坐标 $x_1$、$x_2$，两点的高度相同。

**铅垂线 $x = h$**：约束是「$x$ 必须等于 $h$」，$y$ 自由。同样任取两点 $P_1$、$P_2$，横坐标同为 $h$，纵坐标 $y_1$、$y_2$ 任意，如图 20-1B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.2,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.9) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (1.3,-1.7) -- (1.3,1.7);
  \node[right] at (1.3,1.25) {$x = h$};
  \draw[dashed] (1.3,-0.9) -- (0,-0.9);
  \draw[dashed] (1.3,0.8) -- (0,0.8);
  \fill (1.3,-0.9) circle (1.3pt) node[below right] {$P_1$};
  \fill (1.3,0.8) circle (1.3pt) node[above right] {$P_2$};
  \node[left] at (0,-0.9) {$y_1$};
  \node[left] at (0,0.8) {$y_2$};
  \node[below left] at (1.3,0) {$h$};
\end{tikzpicture}
\end{document}
```

> 图 20-1B：铅垂线 $x = h$。
>
> $P_1$、$P_2$ 的虚线水平足给出各自的纵坐标 $y_1$、$y_2$，两点离 $y$ 轴一样远。

**斜直线 $L$**：约束是 $x$ 与 $y$ 之间的某种线性关系。两个坐标都不自由，也没有被单独定死：定下 $P_1$ 的横坐标 $x_1$，它的纵坐标 $y_1$ 就跟着定了，定下 $P_2$ 的横坐标 $x_2$，$y_2$ 也同样跟着定。这个关系具体长什么样，正是本章要回答的问题，如图 20-1C 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.7,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.7) -- (0,2.0) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-1.3) -- (2.2,1.3833);
  \node[below right] at (2.2,1.3833) {$L$};
  \draw[dashed] (-1.5,-0.775) -- (-1.5,0);
  \draw[dashed] (-1.5,-0.775) -- (0,-0.775);
  \draw[dashed] (0.6,0.45) -- (0.6,0);
  \draw[dashed] (0.6,0.45) -- (0,0.45);
  \fill (-1.5,-0.775) circle (1.3pt) node[below right] {$P_1$};
  \fill (0.6,0.45) circle (1.3pt) node[above left] {$P_2$};
  \node[below] at (-1.5,0) {$x_1$};
  \node[left] at (0,-0.775) {$y_1$};
  \node[below] at (0.6,0) {$x_2$};
  \node[left] at (0,0.45) {$y_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-1C：一条斜直线 $L$。
>
> $P_1$、$P_2$ 的坐标 $(x_1, y_1)$、$(x_2, y_2)$ 由虚线足标出，两组坐标受同一个关系约束。

「找出方程」就是从图形上点的坐标中提炼出这个约束；反过来，给定一个约束，满足它的所有点就构成一个图形。第 15 章用「选点 → 观察 → 归纳」的方法处理了水平线和铅垂线，本章要处理的是斜直线。

### 20.1.2　用集合论语言重述

第 16 章集合论给了我们更精确的语言。坐标平面 $\mathbb{R}^2$ 上的一个几何图形，本质上是 $\mathbb{R}^2$ 的一个**子集**；约束条件 $P(x, y)$（关于坐标 $x, y$ 的命题）恰好通过**描述法**（§16.1.3）确定这个子集：

$$\text{图形} = \{(x, y) \in \mathbb{R}^2 \mid P(x, y)\}$$

即「所有使 $P(x, y)$ 为真的点组成的集合」。约束的强弱直接变成集合的包含关系：若 $P(x, y) \implies Q(x, y)$，则

$$\{(x, y) \in \mathbb{R}^2 \mid P(x, y)\} \subseteq \{(x, y) \in \mathbb{R}^2 \mid Q(x, y)\},$$

满足强约束的点必定满足弱约束，故约束越强、集合越小，图形也就越受限。

````ad-def
title: 定义（几何图形的方程，集合论表述） | Definition（Equation of a Geometric Figure, Set-Theoretic Formulation）

设 $G$ 为坐标平面 $\mathbb{R}^2$ 上的一个几何图形。$G$ 的**方程**是一个关于坐标 $(x, y)$ 的约束条件 $P(x, y)$，使得
$$G = \{(x, y) \in \mathbb{R}^2 \mid P(x, y)\}$$
即 $G$ 恰由所有满足 $P(x, y)$ 的点组成。此时称 $P(x, y)$ 为 $G$ 的方程，记作 $G: P(x, y)$。

点 $Q(x_0, y_0)$ 在图形 $G$ 上 $\iff$ $Q \in G$ $\iff$ $P(x_0, y_0)$ 为真。

下图把这三句话画在一起：$A$、$B$ 两点的坐标使 $P(x, y)$ 为真，故 $A \in G$、$B \in G$；点 $Q(x_0, y_0)$ 的坐标使 $P(x_0, y_0)$ 为假，故 $Q \notin G$，如图 20-2 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.7,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.9) -- (0,2.1) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-1.2) -- (2.2,1.4833);
  \node[below right] at (2.2,1.4833) {$G$};
  \fill (-1.6,-0.7333) circle (1.3pt) node[below right] {$A$};
  \fill (0.8,0.6667) circle (1.3pt) node[above left] {$B$};
  \fill (1.5,-1.1) circle (1.3pt) node[below right] {$Q$};
  \draw[dashed] (1.5,-1.1) -- (1.5,0);
  \draw[dashed] (1.5,-1.1) -- (0,-1.1);
  \node[below] at (1.5,0) {$x_0$};
  \node[left] at (0,-1.1) {$y_0$};
\end{tikzpicture}
\end{document}
```

> 图 20-2：图形 $G$ 与它内外的点。
>
> $A$、$B$ 在 $G$ 上；$Q$ 不在 $G$ 上，虚线足给出它的坐标 $(x_0, y_0)$。
````

这个定义把三件事焊接在一起：**图形上的点**（几何）$\iff$ **满足方程的解**（代数）$\iff$ **集合的元素**（集合论）。三者说的是同一回事，只是语言不同。

````ad-example
title: 示例（用集合语言表述水平线） | Example（Horizontal Line in Set Language）

第 15 章中水平线 $L: y = k$ 的约束是「$y = k$」。用集合论语言：
$$L = \{(x, y) \in \mathbb{R}^2 \mid y = k\}$$
把 $(3, k)$ 的纵坐标代入约束 $y = k$ 得 $k = k$，为真，故 $(3, k) \in L$；把 $(3, 5)$ 代入得 $5 = k$，当 $k \ne 5$ 时为假，故 $(3, 5) \notin L$。
````

````ad-note
title:（记号约定） | （Notation Convention）

为简化书写，本章约定：将直线（及一般的几何图形）的方程直接记为
$$L : \ldots$$
其中 $\ldots$ 为约束条件。其完整含义为
$$L = \{(x, y) \in \mathbb{R}^2 \mid \ldots\}$$
即 $L$ 是 $\mathbb{R}^2$ 中所有满足该约束的点组成的集合。

例如 $L : y = k$ 即表示 $L = \{(x, y) \in \mathbb{R}^2 \mid y = k\}$。

此记号在本章及后续解析几何章节中统一使用。
````

直线也照这个办法写成点集。§8.1「基本元素」小节把点、线、面列为几何学的原始概念，并给出公理（两点连线）：经过任意两个不同点，存在且仅存在一条直线。下面这个定义不推翻这一点，它给的是另一样东西：直线作为 $\mathbb{R}^2$ 的一个子集的身份，以及「点 $P$ 落在这条直线上」这句话的含义。

````ad-def
title: 定义（平面上的直线） | Definition（Straight Line in the Plane）

设 $A$、$B$ 为平面上两个定点，$A \ne B$。

**共线**：点 $P$ 与 $A$、$B$ 共线，指 $P$ 落在 $A$、$B$ 所确定的那条直线上。

**直线 $AB$**：与 $A$、$B$ 共线的所有点组成的集合，记作

$$L_{AB} = \{\, P : P \text{ 与 } A、B \text{ 共线} \,\}$$

它是 $\mathbb{R}^2$ 的一个子集，也就是定义（几何图形的方程，集合论表述）里说的那个几何图形。

由公理（两点连线），过 $A$、$B$ 存在且仅存在一条直线，故 $L_{AB}$ 恰为那条直线上的全部点，这个集合良定义。

例如 $P$ 介于 $A$、$B$ 之间，$Q$ 在 $B$ 那一侧的延长线上，$R$ 在 $A$ 那一侧的延长线上，三点都与 $A$、$B$ 共线，故都属于 $L_{AB}$，如图 20-3 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.2,0) -- (3,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.5) -- (0,1.7) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.9,-0.96) -- (2.6,1.24);
  \node[below right] at (2.6,1.24) {$L_{AB}$};
  \fill (-2.6,-0.84) circle (1.3pt) node[above left] {$R$};
  \fill (-1.6,-0.44) circle (1.3pt) node[below right] {$A$};
  \fill (-0.4,0.04) circle (1.3pt) node[above left] {$P$};
  \fill (0.8,0.52) circle (1.3pt) node[below right] {$B$};
  \fill (2.0,1.0) circle (1.3pt) node[above left] {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 20-3：直线 $L_{AB}$ 上的点。
>
> $R$、$A$、$P$、$B$、$Q$ 五点都在 $L_{AB}$ 上，其中 $A$、$B$ 是给定的两个定点。

````

往后说「点 $Q$ 在直线 $L$ 上」，指的就是 $Q \in L$；说「$A$、$B$、$C$ 三点共线」，指的是三点同属某个 $L_{AB}$。这个定义只用到共线的直观，不用坐标也不用斜率，故本章往后各节都能直接引用它；至于「$Q$ 与 $A$、$B$ 共线」怎么用坐标验算，§20.3.1 的两条引理才给答案。

水平线与铅垂线的方程已由第 15 章用「选点 $\to$ 观察 $\to$ 归纳」得到，斜直线却还只是一个「某种线性关系」。本章按下面的次序把这个关系逼出来：§20.2 先把斜率这件工具打磨利，斜率的定义 §15.2.6 已经给出，那里补上两条此前只是断言的性质；§20.3.1 用三点共线的两条引理把上面这个点集定义翻译成只含坐标的条件，并顺手得到直线的斜率刻画与过两点的直线方程，直线与二元一次方程的解集由此互为充要；§20.3.2 把这类方程记作一般式 $Ax + By + C = 0$，从它的系数读出斜率；§20.3.3 至 §20.3.5 把同一方程按不同已知条件改写为点斜式（含两点式）、斜截式与截距式，由已知条件写出方程就靠这几种形式；§20.4 再从这个方程读出两直线的位置关系，并在讲完交点之后给两个截距下定义；§20.5 读出距离。

---

## 20.2　斜率 (Slope)

> **本节难度上限**：T B+ ｜ C D+ ｜ E C+ ｜ Q C

> 斜率是直线「倾斜程度」的数值度量，它的定义 §15.2.6 已经给出。本节不重下定义，只补上「斜率与取点无关」这条此前只是断言的性质，再把斜率的符号与绝对值读成直线的走向与陡峭程度；铅垂线的缺口留给 §20.3.1。直线本身已在 §20.1.2 定义为共线点集 $L_{AB}$，本节直接引用；三点共线的斜率判定要等坐标判据到手才证，见 §20.3.1 的推论（三点共线的斜率判定）。全程不依赖三角函数。

### 20.2.1　斜率：回顾与两件事

斜率这个量 §15.2.6 已经定义过：设 $A(x_1, y_1)$ 与 $B(x_2, y_2)$ 为平面上两点且 $x_1 \ne x_2$，则直线 $AB$ 的斜率记作 $m_{AB}$，

$$m_{AB} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}$$

分子 $\Delta y = y_2 - y_1$ 是从第一点走到第二点时的**铅垂变化 (vertical change)**，分母 $\Delta x = x_2 - x_1$ 是**水平变化 (horizontal change)**。本章沿用这个定义与记号，不再重下。在直线 $L$ 上取两点 $P_1(x_1, y_1)$、$P_2(x_2, y_2)$，沿水平方向走 $\Delta x$、再沿铅垂方向走 $\Delta y$ 就从 $P_1$ 到了 $P_2$，如图 20-4 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.7,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-1.26) -- (2.4,1.62);
  \node[right] at (2.4,1.62) {$L$};
  \draw[dashed] (-1.8,-0.9) -- (1.6,-0.9);
  \draw[dashed] (1.6,-0.9) -- (1.6,1.14);
  \draw (1.4,-0.9) -- (1.4,-0.7) -- (1.6,-0.7);
  \fill (-1.8,-0.9) circle (1.3pt) node[below left] {$P_1(x_1,y_1)$};
  \fill (1.6,1.14) circle (1.3pt) node[above right] {$P_2(x_2,y_2)$};
  \node[below] at (-0.1,-0.9) {$\Delta x$};
  \node[right] at (1.6,0.12) {$\Delta y$};
\end{tikzpicture}
\end{document}
```

> 图 20-4：斜率的两个变化量。
>
> 两段虚线合成一个直角，水平一段长 $\Delta x$，铅垂一段长 $\Delta y$，直角在右下角。

要把斜率当作刻画直线的工具，还差两件事。

**取点无关性**：$m_{AB}$ 由 $A$、$B$ 两点算出，要说它是「直线 $L$ 的斜率」，就得先证明换一对点重算得到同一个数，否则这个说法没有意义。§15.2.6 把这件事当作断言写下，下面给出证明。

**铅垂线的缺口**：定义要求 $x_1 \ne x_2$，铅垂线整个被排除在外。这一半要到 §20.3.1 的引理（三点共线的坐标判据）才补上。

````ad-thm
title: 定理（斜率与取点无关） | Theorem（Slope Does Not Depend on the Points Chosen）

设 $L$ 为一条不铅垂的直线，$P_1(x_1, y_1)$、$P_2(x_2, y_2)$ 与 $Q_1(x_1', y_1')$、$Q_2(x_2', y_2')$ 是 $L$ 上两组点，每组两点的横坐标互不相同。则

$$\frac{y_2 - y_1}{x_2 - x_1} = \frac{y_2' - y_1'}{x_2' - x_1'}$$
````

````ad-proof
title: 证明 | Proof

设 $L$ 为一条不铅垂的直线，$P_1(x_1, y_1)$、$P_2(x_2, y_2)$ 与 $Q_1(x_1', y_1')$、$Q_2(x_2', y_2')$ 是 $L$ 上两组点，每组两点的横坐标互不相同。

把一组里的两点顺序对调，分子与分母同时变号而比值不变，

$$\frac{y_1 - y_2}{x_1 - x_2} \equiv \frac{-(y_2 - y_1)}{-(x_2 - x_1)} \equiv \frac{y_2 - y_1}{x_2 - x_1},$$

故可设

$$\begin{aligned} &x_1 < x_2, \\ &x_1' < x_2' \end{aligned}$$

记 $R = (x_2, y_1)$、$R' = (x_2', y_1')$。

$R$ 与 $P_1$ 的纵坐标同为 $y_1$、与 $P_2$ 的横坐标同为 $x_2$，故 $P_1R$ 水平而 $RP_2$ 铅垂，$\triangle P_1P_2R$ 在 $R$ 处是直角三角形；

$R'$ 与 $Q_1$ 的纵坐标同为 $y_1'$、与 $Q_2$ 的横坐标同为 $x_2'$，故 $Q_1R'$ 水平而 $R'Q_2$ 铅垂，$\triangle Q_1Q_2R'$ 在 $R'$ 处是直角三角形。

$P_1R$ 与 $Q_1R'$ 都是水平线段，故互相平行。

由 $x_1 < x_2$ 与 $x_1' < x_2'$ 得 $P_1R = x_2 - x_1 > 0$、$Q_1R' = x_2' - x_1' > 0$，两段都指向 $x$ 增大的一侧，
而 $L$ 同时截这两条平行线。
由 §8.1「平行线与截线」小节的同位角相等，得 $\angle P_2P_1R = \angle Q_2Q_1R'$，
连同两个直角，两三角形有两角对应相等，故 $\triangle P_1P_2R \sim \triangle Q_1Q_2R'$（§8.4 相似三角形的判定条件）。

两组点与两个直角三角形如图 20-5 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.1,0) -- (3.1,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.7) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (2.8,1.4);
  \node[right] at (2.8,1.4) {$L$};
  \draw[red!70!black, thick] (-2.2,-1.1) -- (-0.6,-1.1);
  \draw[blue!70!black, thick] (-0.6,-1.1) -- (-0.6,-0.3);
  \draw[red!70!black, thick] (0.4,0.2) -- (2.4,0.2);
  \draw[blue!70!black, thick] (2.4,0.2) -- (2.4,1.2);
  \draw (-0.78,-1.1) -- (-0.78,-0.92) -- (-0.6,-0.92);
  \draw (2.22,0.2) -- (2.22,0.38) -- (2.4,0.38);
  \fill (-2.2,-1.1) circle (1.3pt) node[below left] {$P_1$};
  \fill (-0.6,-0.3) circle (1.3pt) node[above left] {$P_2$};
  \fill (-0.6,-1.1) circle (1.3pt) node[below right] {$R$};
  \fill (0.4,0.2) circle (1.3pt) node[above left] {$Q_1$};
  \fill (2.4,1.2) circle (1.3pt) node[above left] {$Q_2$};
  \fill (2.4,0.2) circle (1.3pt) node[below right] {$R'$};
\end{tikzpicture}
\end{document}
```

> 图 20-5：斜率与取点无关。
>
> 同色线段是相似三角形的对应边：两段水平腿互相对应，两段铅垂腿互相对应，直角分别在 $R$、$R'$。

同位角与两个直角如图 20-6 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.1,0) -- (3.1,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.7) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (2.8,1.4);
  \node[right] at (2.8,1.4) {$L$};
  \draw[red!70!black, thick] (-2.2,-1.1) -- (-0.6,-1.1);
  \draw[blue!70!black, thick] (-0.6,-1.1) -- (-0.6,-0.3);
  \draw[red!70!black, thick] (0.4,0.2) -- (2.4,0.2);
  \draw[blue!70!black, thick] (2.4,0.2) -- (2.4,1.2);
  \fill[red, opacity=0.18] (-2.2,-1.1) -- ++(0.5,0) arc (0:26.565:0.5) -- cycle;
  \fill[red, opacity=0.18] (0.4,0.2) -- ++(0.5,0) arc (0:26.565:0.5) -- cycle;
  \draw (-0.78,-1.1) -- (-0.78,-0.92) -- (-0.6,-0.92);
  \draw (2.22,0.2) -- (2.22,0.38) -- (2.4,0.38);
  \fill (-2.2,-1.1) circle (1.3pt) node[below left] {$P_1$};
  \fill (-0.6,-0.3) circle (1.3pt) node[above left] {$P_2$};
  \fill (-0.6,-1.1) circle (1.3pt) node[below right] {$R$};
  \fill (0.4,0.2) circle (1.3pt) node[above left] {$Q_1$};
  \fill (2.4,1.2) circle (1.3pt) node[above left] {$Q_2$};
  \fill (2.4,0.2) circle (1.3pt) node[below right] {$R'$};
\end{tikzpicture}
\end{document}
```

> 图 20-6：两三角形的两组对应角。
>
> 两个红色角楔是 $\angle P_2P_1R$ 与 $\angle Q_2Q_1R'$，直角方块分别在 $R$、$R'$。

两段铅垂腿与两段水平腿是对应边，对应边成比例，而 $P_1R = x_2 - x_1$、$P_2R = \lvert y_2 - y_1 \rvert$、$Q_1R' = x_2' - x_1'$、$Q_2R' = \lvert y_2' - y_1' \rvert$，于是

$$\frac{\lvert y_2 - y_1 \rvert}{x_2 - x_1} = \frac{\lvert y_2' - y_1' \rvert}{x_2' - x_1'}$$

两个分母 $x_2 - x_1$、$x_2' - x_1'$ 都由 $x_1 < x_2$、$x_1' < x_2'$ 知为正数。

又 $\angle P_2P_1R = \angle Q_2Q_1R'$，两段水平腿都指向 $x$ 增大的一侧，故两段铅垂腿也同向。

两段水平腿与两段铅垂腿的指向如图 20-7 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.1,0) -- (3.1,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.7) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (2.8,1.4);
  \node[right] at (2.8,1.4) {$L$};
  \draw[red!70!black, thick, ->] (-2.2,-1.1) -- (-0.6,-1.1);
  \draw[blue!70!black, thick, ->] (-0.6,-1.1) -- (-0.6,-0.3);
  \draw[red!70!black, thick, ->] (0.4,0.2) -- (2.4,0.2);
  \draw[blue!70!black, thick, ->] (2.4,0.2) -- (2.4,1.2);
  \fill (-2.2,-1.1) circle (1.3pt) node[below left] {$P_1$};
  \fill (-0.6,-0.3) circle (1.3pt) node[above left] {$P_2$};
  \fill (-0.6,-1.1) circle (1.3pt) node[below right] {$R$};
  \fill (0.4,0.2) circle (1.3pt) node[above left] {$Q_1$};
  \fill (2.4,1.2) circle (1.3pt) node[above left] {$Q_2$};
  \fill (2.4,0.2) circle (1.3pt) node[below right] {$R'$};
\end{tikzpicture}
\end{document}
```

> 图 20-7：四条腿的指向。
>
> 两段红色水平腿都指向 $x$ 增大的一侧，两段蓝色铅垂腿都指向上方，故 $y_2 - y_1$ 与 $y_2' - y_1'$ 同号。
即 $y_2 - y_1$ 与 $y_2' - y_1'$ 同号，两个分子的绝对值可以同时去掉，得

$$\frac{y_2 - y_1}{x_2 - x_1} = \frac{y_2' - y_1'}{x_2' - x_1'}$$

$x_1 = x_2$ 时同一条铅垂线上任意两点的横坐标都相同，$m_{P_1P_2}$ 的分母为零，斜率无从定义，本定理管不到铅垂线。

铅垂线的那一半由 §20.3.1 的引理（三点共线的坐标判据）接管。
````

````ad-example
title: 示例（求斜率） | Example（Finding the Slope）

求过以下每对点的直线的斜率：

(a) $A(1, 2)$ 与 $B(4, 8)$

(b) $C(-2, 5)$ 与 $D(3, -1)$

---

(a) $m = \dfrac{8 - 2}{4 - 1} = \dfrac{6}{3} = 2$。

(b) $m = \dfrac{-1 - 5}{3 - (-2)} = \dfrac{-6}{5}$。
````

### 20.2.2　斜率的几何意义

斜率的符号决定直线的走向，绝对值决定它的陡峭程度。四种情形各画一幅。

**$m > 0$**：取 $x_1 < x_2$，则 $\Delta x = x_2 - x_1 > 0$，而 $\Delta y = m\,\Delta x > 0$，两段变化量同号，沿 $x$ 增大的方向走直线上升，从左下升到右上，如图 20-8A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.6,0) -- (2.5,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.4) -- (0,1.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.4,-0.9) -- (1.6,0.9);
  \node[right] at (1.6,0.9) {$m > 0$};
\end{tikzpicture}
\end{document}
```

> 图 20-8A：$m > 0$ 的直线。
>
> 沿 $x$ 增大方向走，直线上升。

**$m < 0$**：取 $x_1 < x_2$，则 $\Delta x > 0$ 而 $\Delta y = m\,\Delta x < 0$，两段变化量异号，沿 $x$ 增大的方向走直线下降，从左上降到右下，如图 20-8B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.6,0) -- (2.5,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.4) -- (0,1.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.4,0.9) -- (1.6,-0.9);
  \node[right] at (1.6,-0.9) {$m < 0$};
\end{tikzpicture}
\end{document}
```

> 图 20-8B：$m < 0$ 的直线。
>
> 沿 $x$ 增大方向走，直线下降。

**$m = 0$**：$\Delta y = m\,\Delta x = 0$ 而 $\Delta x \ne 0$，线上任取两点的纵坐标都相等，它是水平线 $y = k$，如图 20-8C 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.6,0) -- (2.5,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.4) -- (0,1.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.4,0.7) -- (1.6,0.7);
  \node[right] at (1.6,0.7) {$m = 0$};
\end{tikzpicture}
\end{document}
```

> 图 20-8C：$m = 0$ 的直线，即水平线。
>
> 直线上每一点的纵坐标相同。

**$m$ 不存在**：$x_1 = x_2$ 使 $\Delta x = 0$，分式 $\dfrac{\Delta y}{\Delta x}$ 无意义，线上任取两点的横坐标都相等，它是铅垂线 $x = h$，如图 20-9 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.6,0) -- (2.5,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.4) -- (0,1.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (0.7,-1.2) -- (0.7,1.2);
  \node[above right] at (0.7,0.95) {$x = h$};
\end{tikzpicture}
\end{document}
```

> 图 20-9：斜率不存在的直线，即铅垂线 $x = h$。
>
> 直线上每一点的横坐标相同，$\Delta x = 0$。

陡峭程度由定长水平腿上的铅垂腿量出来：取 $\Delta x = 1$，铅垂腿就是 $\Delta y = m$，$m = 1$ 时上升 $1$，$m = 3$ 时上升 $3$，$\lvert m \rvert$ 越大铅垂腿越长。过同一点 $O$ 的这两条直线如图 20-10 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.9,0) -- (1.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.9) -- (0,2.7) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.55,-0.55) -- (1.3,1.3);
  \draw[red!70!black, very thick] (-0.28,-0.84) -- (0.8,2.4);
  \node[below right] at (1.3,1.3) {$m = 1$};
  \node[right] at (0.8,2.4) {$m = 3$};
  \fill (0,0) circle (1.3pt) node[below left] {$O$};
\end{tikzpicture}
\end{document}
```

> 图 20-10：$m = 1$ 与 $m = 3$ 的两条直线。
>
> 两条都过原点 $O$，$m = 3$ 的那条更陡。

````ad-note
title: 注记（倾斜角） | Note（Angle of Inclination）

用直线与 $x$ 轴的夹角刻画斜率是另一条路。§15.2.6 已经给出**倾斜角 (angle of inclination)** 的定义：$x$ 轴正方向逆时针旋转至直线时的最小非负角 $\alpha$（$0^{\circ} \le \alpha < 180^{\circ}$），并写出 $m = \tan\alpha$。

本章不使用这条关系。$\tan\alpha$ 在 $90^{\circ} \le \alpha < 180^{\circ}$ 时要靠钝角的正切，而钝角的三角函数要到 [[Chapter 26 三角函数|三角函数]] 那一章才建立。因此本章的一切推论都只用两点坐标式的斜率 $m = \dfrac{y_2 - y_1}{x_2 - x_1}$，它不需要任何三角函数，已足以处理直线方程的全部内容。倾斜角与 $m = \tan\alpha$ 的完整讨论留待**解析几何(II)**。
````

---

## 20.3　直线的方程 (Equations of a Line)

> **本节难度上限**：T B- ｜ C C+ ｜ E B- ｜ Q C+

> 本节是全章的主干。§20.3.1 用三点共线的两条引理把 §20.1.2 的点集定义翻译成只含坐标的条件，顺带得到斜率判定、直线的斜率刻画与过两点的直线方程，直线与二元一次方程的解集由此互为充要；§20.3.2 把这类方程记作一般式 $Ax + By + C = 0$，从它的系数读出直线的几何信息；§20.3.3 至 §20.3.5 把同一方程按不同已知条件改写为点斜式（含两点式）、斜截式与截距式，由已知条件写出方程走的就是这几种形式；§20.3.6 交代它们与一般式的关系与选用。两个截距是直线与坐标轴的交点坐标，要等 §20.4.1 讲完交点才有定义，故住在 §20.4.2；斜截式与截距式在本节只说「过轴上那一点」，名字到那里才补上。

### 20.3.1　三点共线的刻画

直线在 §20.1.2 已定义为共线点集 $L_{AB}$，但那里的「$P$ 与 $A$、$B$ 共线」还是第 8 章的直观说法：给出三点的坐标也没法验算。本节把它翻译成能算的条件。建立坐标系后设 $A(x_1, y_1)$、$B(x_2, y_2)$、$P(x, y)$，下面两条引理各给一个判据：距离刻画只用三个距离，不涉及坐标轴的朝向；坐标判据只用四个坐标差，一条等式把铅垂线一并覆盖。两条引理之后依次得到三点共线的斜率判定、直线的斜率刻画与过两点的直线方程，节末把五种说法并排对照。

````ad-lem
title: 引理（三点共线的距离刻画） | Lemma（Collinearity Characterized by Distances）

设 $A$、$B$、$P$ 为平面上三点，$AB$、$PA$、$PB$ 依次为相应两点间的距离（§8.1「线段的记法与长度」小节）。考察下面三式：

$$\begin{aligned} &PA + PB = AB, \\[1ex] &PA + AB = PB, \\[1ex] &PB + AB = PA \end{aligned}$$

则

$$\text{三点共线} \iff \text{三式中至少有一式成立}$$

三点互不重合时，三式中恰有一式成立。

共线时三点只有三种相对位置，$P$ 介于 $A$、$B$ 之间的那一种如图 20-11 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-2,0);
  \coordinate (P) at (0.5,0);
  \coordinate (B) at (2,0);
  \draw[very thick] (-2.7,0) -- (2.7,0);
  \fill (A) circle (1.3pt) node[below] {$A$};
  \fill (P) circle (1.3pt) node[above] {$P$};
  \fill (B) circle (1.3pt) node[below] {$B$};
  \draw[thin] (-2,0.5) -- (-2,0.72) -- (0.5,0.72) -- (0.5,0.5);
  \node at (-0.75,0.98) {$PA$};
  \draw[thin] (0.5,0.5) -- (0.5,0.72) -- (2,0.72) -- (2,0.5);
  \node at (1.25,0.98) {$PB$};
  \draw[thin] (-2,-0.5) -- (-2,-0.72) -- (2,-0.72) -- (2,-0.5);
  \node at (0,-0.98) {$AB$};
\end{tikzpicture}
\end{document}
```

> 图 20-11：$P$ 介于 $A$、$B$ 之间。
>
> 上方两段刻度依次为 $PA$、$PB$，下方整段为 $AB$。
````

````ad-proof
title: 证明 | Proof

设 $A$、$B$、$P$ 为平面上三点，$AB$、$PA$、$PB$ 依次为相应两点间的距离。

先设三点互不重合。

**充分性（三式中至少一式成立 $\Longrightarrow$ 三点共线）：** 用反证法，待否证的命题是：三式中至少一式成立时，$P$、$A$、$B$ 三点共线。

假设 $P$、$A$、$B$ 不共线。

不共线的三点与它们构成的三角形如图 20-12 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-2,-0.8) -- (2,-0.4) -- (0.3,1.3) -- cycle;
  \fill (-2,-0.8) circle (1.3pt) node[below left] {$A$};
  \fill (2,-0.4) circle (1.3pt) node[below right] {$B$};
  \fill (0.3,1.3) circle (1.3pt) node[above] {$P$};
  \node[below] at (0,-0.95) {$AB$};
  \node[above left] at (-0.85,0.25) {$PA$};
  \node at (1.33,0.63) {$PB$};
\end{tikzpicture}
\end{document}
```

> 图 20-12：不共线的三点构成三角形。
>
> 三条边依次是 $AB$、$PA$、$PB$，三角形的任一边都短于另外两边之和。

不共线的三点构成一个三角形，由 §8.7 的三角形不等式，得

$$\begin{aligned} &PA + PB > AB, \\ &PA + AB > PB, \\ &PB + AB > PA, \end{aligned}$$

即三式无一能取等号，与题设「三式中至少一式取等号」直接冲突，被否定的正是「$P$、$A$、$B$ 不共线」这一临时假设，

于是三点共线。

**必要性（三点共线 $\Longrightarrow$ 三式中至少一式成立）：** 三点共线时，$P$ 相对于 $A$、$B$ 只有三种位置：$P$ 介于 $A$、$B$ 之间，或 $A$ 介于 $P$、$B$ 之间，或 $B$ 介于 $A$、$P$ 之间。

$P$ 介于 $A$、$B$ 之间时，线段 $AB$ 被 $P$ 分成 $PA$、$PB$ 两段，故 $PA + PB = AB$。

$A$ 介于 $P$、$B$ 之间时，线段 $PB$ 被 $A$ 分成 $PA$、$AB$ 两段，故 $PA + AB = PB$，如图 20-13A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (P) at (-2.5,0);
  \coordinate (A) at (-1,0);
  \coordinate (B) at (2,0);
  \draw[very thick] (-3.2,0) -- (2.7,0);
  \fill (P) circle (1.3pt) node[above] {$P$};
  \fill (A) circle (1.3pt) node[below] {$A$};
  \fill (B) circle (1.3pt) node[below] {$B$};
  \draw[thin] (-2.5,0.5) -- (-2.5,0.72) -- (-1,0.72) -- (-1,0.5);
  \node at (-1.75,0.98) {$PA$};
  \draw[thin] (-1,0.5) -- (-1,0.72) -- (2,0.72) -- (2,0.5);
  \node at (0.5,0.98) {$AB$};
  \draw[thin] (-2.5,-0.5) -- (-2.5,-0.72) -- (2,-0.72) -- (2,-0.5);
  \node at (-0.25,-0.98) {$PB$};
\end{tikzpicture}
\end{document}
```

> 图 20-13A：$A$ 介于 $P$、$B$ 之间。
>
> 上方两段刻度依次为 $PA$、$AB$，下方整段为 $PB$。

$B$ 介于 $A$、$P$ 之间时，线段 $AP$ 被 $B$ 分成 $AB$、$BP$ 两段，故 $AB + BP = AP$，即 $PB + AB = PA$，如图 20-13B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-2,0);
  \coordinate (B) at (1,0);
  \coordinate (P) at (2.5,0);
  \draw[very thick] (-2.7,0) -- (3.2,0);
  \fill (A) circle (1.3pt) node[below] {$A$};
  \fill (B) circle (1.3pt) node[below] {$B$};
  \fill (P) circle (1.3pt) node[above] {$P$};
  \draw[thin] (-2,0.5) -- (-2,0.72) -- (1,0.72) -- (1,0.5);
  \node at (-0.5,0.98) {$AB$};
  \draw[thin] (1,0.5) -- (1,0.72) -- (2.5,0.72) -- (2.5,0.5);
  \node at (1.75,0.98) {$BP$};
  \draw[thin] (-2,-0.5) -- (-2,-0.72) -- (2.5,-0.72) -- (2.5,-0.5);
  \node at (0.25,-0.98) {$AP$};
\end{tikzpicture}
\end{document}
```

> 图 20-13B：$B$ 介于 $A$、$P$ 之间。
>
> 上方两段刻度依次为 $AB$、$BP$，下方整段为 $AP$。

三种位置必居其一，故三式中至少一式成立。

哪一个点位于中间又唯一决定取等号的是哪一式，故三点互不重合时恰有一式成立。

两点重合时结论仍成立。

若 $P = A$，则 $PA = 0$、$PB = AB$，三式中的 $PA + PB = AB$ 成为 $AB = AB$。

又 $P$ 与 $A$ 是同一点，过 $A$、$B$ 的直线（§8.1「基本元素」小节的公理（两点连线））也经过 $P$，故三点共线。

$P$ 与 $A$ 重合时三点的位置如图 20-14 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[very thick] (-2.7,0) -- (2.7,0);
  \fill (-1.5,0) circle (1.3pt) node[above] {$A = P$};
  \fill (2,0) circle (1.3pt) node[above] {$B$};
  \draw[thin] (-1.5,-0.5) -- (-1.5,-0.72) -- (2,-0.72) -- (2,-0.5);
  \node at (0.25,-0.98) {$PB = AB$};
\end{tikzpicture}
\end{document}
```

> 图 20-14：$P$ 与 $A$ 重合。
>
> $A$ 与 $P$ 是同一点，$PA = 0$，下方的整段既是 $PB$ 也是 $AB$。

若 $P = B$，则 $PB = 0$、$PA = AB$，取等号的是 $PB + AB = PA$，它同样成为 $AB = AB$，而 $P$ 与 $B$ 是同一点，三点共线。

若 $A = B$，则 $AB = 0$ 且 $PA = PB$，$PA + AB = PB$ 与 $PB + AB = PA$ 都化成恒等式，而三点只剩两个不同点，过这两点的直线同时经过它们，故共线。

````

````ad-lem
title: 引理（三点共线的坐标判据） | Lemma（Collinearity Characterized by Coordinates）

设 $A(x_1, y_1)$、$B(x_2, y_2)$、$P(x, y)$ 为平面上三点，$A \ne B$。则

$$\text{三点共线} \iff (x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1)$$

两端都只含给定的坐标与坐标差，不出现斜率，故铅垂线也在覆盖之内。

三点的位置与它们的坐标如图 20-15 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.8,0) -- (3.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.5) -- (0,2.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-0.95) -- (3.4,1.95);
  \fill (-1.5,-0.5) circle (1.3pt) node[above left] {$A(x_1,y_1)$};
  \fill (1,0.75) circle (1.3pt) node[below right] {$B(x_2,y_2)$};
  \fill (3,1.75) circle (1.3pt) node[above left] {$P(x,y)$};
\end{tikzpicture}
\end{document}
```

> 图 20-15：坐标判据里的三点。
>
> $A$、$B$、$P$ 的坐标依次是 $(x_1, y_1)$、$(x_2, y_2)$、$(x, y)$，三点在同一条直线上。
````

````ad-proof
title: 证明 | Proof

设 $A(x_1, y_1)$、$B(x_2, y_2)$、$P(x, y)$ 为平面上三点，$A \ne B$，$AB$、$PA$、$PB$ 依次为相应两点间的距离。把四个坐标差依次记作 $p$、$q$、$r$、$s$：

$$\begin{aligned} p &= x_2 - x_1, & q &= y_2 - y_1, \\ r &= x - x_1, & s &= y - y_1 \end{aligned}$$

坐标判据 $ps = qr$ 写成完整的坐标式就是

$$(x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1)$$

由引理（三点共线的距离刻画），三点共线当且仅当下面三个等式中至少有一个成立：

$$\begin{aligned} &PA + PB = AB, \\ &PA + AB = PB, \\ &PB + AB = PA \end{aligned}$$

三个距离都是坐标的根式，直接处理困难，证明的路线是：把 $AB$、$PA$、$PB$ 用 $p$、$q$、$r$、$s$ 表示出来，只对它们的平方做运算，把三个等式全部平方后逐个验证，看每个等式各化成 $p$、$q$、$r$、$s$ 的什么条件。

这四段坐标差是线段 $AB$ 与 $PA$ 各自的水平腿与铅垂腿，如图 20-16 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-1,-0.5);
  \coordinate (B) at (2,1);
  \coordinate (P) at (4,2);
  \draw[gray!60, ->] (-2.4,0) -- (4.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,2.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (4.4,2.2);
  \draw[dashed] (-1,-0.5) -- (2,-0.5) -- (2,1);
  \draw[dashed] (-1,-0.5) -- (4,-0.5) -- (4,2);
  \node[below] at (0.5,-0.5) {$x_2 - x_1$};
  \node[right] at (2,0.25) {$y_2 - y_1$};
  \node[below] at (1.5,-0.5) {$x - x_1$};
  \node[right] at (4,0.75) {$y - y_1$};
  \fill (A) circle (1.3pt) node[below left] {$A$};
  \fill (B) circle (1.3pt) node[above left] {$B$};
  \fill (P) circle (1.3pt) node[above right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 20-16：四个坐标差是线段 $AB$ 与 $PA$ 各自的水平腿与铅垂腿。
>
> $A(-1,-0.5)$、$B(2,1)$、$P(4,2)$ 同在直线 $y = \dfrac{1}{2}x$ 上，虚线依次给出 $x_2 - x_1$、$y_2 - y_1$ 与 $x - x_1$、$y - y_1$。

三个距离的平方由 §15.2.2 的两点距离公式给出，用 $p$、$q$、$r$、$s$ 写出来：

$$\begin{aligned} AB^2 &= p^2 + q^2, \\ PA^2 &= r^2 + s^2, \\ PB^2 &= (r - p)^2 + (s - q)^2 \end{aligned}$$

线段 $BP$ 的水平腿与铅垂腿如图 20-17 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.4,0) -- (4.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,2.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (4.4,2.2);
  \draw[dashed] (2,1) -- (4,1) -- (4,2);
  \node[below] at (3,1) {$r - p$};
  \node[right] at (4,1.5) {$s - q$};
  \fill (-1,-0.5) circle (1.3pt) node[below left] {$A$};
  \fill (2,1) circle (1.3pt) node[above left] {$B$};
  \fill (4,2) circle (1.3pt) node[above left] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 20-17：$BP$ 的两条腿。
>
> 虚线的水平腿长 $r - p$、铅垂腿长 $s - q$，它们是 $B$ 与 $P$ 的横坐标之差与纵坐标之差。

展开 $PB^2$，得三个等式共用的代入关系：

$$\begin{aligned} PB^2 &\equiv p^2 + q^2 + r^2 + s^2 - 2(pr + qs) \\ &= AB^2 + PA^2 - 2(pr + qs) \end{aligned}$$

下面对三个等式逐个平方验证。

每个等式的量都非负，平方是等价变形；
代入 $PB^2 = AB^2 + PA^2 - 2(pr + qs)$ 把另一端用 $p$、$q$、$r$、$s$ 写出，再平方一次并展开两个距离平方的乘积，根号就全部消去。

**$PA + PB = AB$：** 平方并移项得

$$\begin{aligned} PA + PB = AB &\iff PA^2 + PB^2 + 2\,PA \cdot PB = AB^2 \\ &\iff 2\,PA \cdot PB = AB^2 - PA^2 - PB^2 \end{aligned}$$

代入 $PB^2 = AB^2 + PA^2 - 2(pr + qs)$，右端就是

$$AB^2 - PA^2 - PB^2 \equiv 2(pr + qs) - 2\,PA^2,$$

故原等式等价于 $PA \cdot PB = pr + qs - PA^2$。

左端 $PA \cdot PB$ 非负，等式成立要求右端也非负，两边平方得

$$\begin{aligned} PA \cdot PB = pr + qs - PA^2 &\iff PA^2 \cdot PB^2 = (pr + qs - PA^2)^2 \\ &\quad \text{且}\ pr + qs \ge PA^2 \end{aligned}$$

展开左端 $PA^2 \cdot PB^2$ 得

$$\begin{aligned} PA^2 \cdot PB^2 &= (r^2 + s^2)\big[(r - p)^2 + (s - q)^2\big] \\ &\equiv (pr + qs - PA^2)^2 + (ps - qr)^2, \end{aligned}$$

于是两边平方后的等式 $PA^2 \cdot PB^2 = (pr + qs - PA^2)^2$ 化成 $(ps - qr)^2 = 0$，即 $ps = qr$，故

$$\begin{aligned} PA + PB = AB &\iff ps = qr\ \text{且}\ pr + qs \ge PA^2 \end{aligned}$$

**$PA + AB = PB$：** 平方并移项得

$$\begin{aligned} PA + AB = PB &\iff PA^2 + AB^2 + 2\,PA \cdot AB = PB^2 \\ &\iff 2\,PA \cdot AB = PB^2 - PA^2 - AB^2 \end{aligned}$$

代入 $PB^2 = AB^2 + PA^2 - 2(pr + qs)$，右端就是

$$PB^2 - PA^2 - AB^2 \equiv -2(pr + qs),$$

故原等式等价于 $PA \cdot AB = -(pr + qs)$。

左端 $PA \cdot AB$ 非负，等式成立要求 $pr + qs \le 0$，两边平方得

$$\begin{aligned} PA \cdot AB = -(pr + qs) &\iff PA^2 \cdot AB^2 = (pr + qs)^2 \\ &\quad \text{且}\ pr + qs \le 0 \end{aligned}$$

展开左端 $PA^2 \cdot AB^2$ 得

$$\begin{aligned} PA^2 \cdot AB^2 &= (r^2 + s^2)(p^2 + q^2) \\ &\equiv (pr + qs)^2 + (ps - qr)^2, \end{aligned}$$

于是两边平方后的等式 $PA^2 \cdot AB^2 = (pr + qs)^2$ 化成 $(ps - qr)^2 = 0$，即 $ps = qr$，故

$$\begin{aligned} PA + AB = PB &\iff ps = qr\ \text{且}\ pr + qs \le 0 \end{aligned}$$

**$PB + AB = PA$：** 平方并移项得

$$\begin{aligned} PB + AB = PA &\iff PB^2 + AB^2 + 2\,PB \cdot AB = PA^2 \\ &\iff 2\,PB \cdot AB = PA^2 - PB^2 - AB^2 \end{aligned}$$

代入 $PB^2 = AB^2 + PA^2 - 2(pr + qs)$，右端就是

$$PA^2 - PB^2 - AB^2 \equiv 2(pr + qs) - 2\,AB^2,$$

故原等式等价于 $PB \cdot AB = pr + qs - AB^2$。

左端 $PB \cdot AB$ 非负，等式成立要求右端也非负，两边平方得

$$\begin{aligned} PB \cdot AB = pr + qs - AB^2 &\iff PB^2 \cdot AB^2 = (pr + qs - AB^2)^2 \\ &\quad \text{且}\ pr + qs \ge AB^2 \end{aligned}$$

展开左端 $PB^2 \cdot AB^2$ 得

$$\begin{aligned} PB^2 \cdot AB^2 &= \big[(r - p)^2 + (s - q)^2\big](p^2 + q^2) \\ &\equiv (pr + qs - AB^2)^2 + (ps - qr)^2, \end{aligned}$$

于是两边平方后的等式 $PB^2 \cdot AB^2 = (pr + qs - AB^2)^2$ 化成 $(ps - qr)^2 = 0$，即 $ps = qr$，故

$$\begin{aligned} PB + AB = PA &\iff ps = qr\ \text{且}\ pr + qs \ge AB^2 \end{aligned}$$

**充分性（坐标判据成立 $\Longrightarrow$ 三点共线）：** 设 $ps = qr$，则 $(ps - qr)^2 = 0$，代进 $PA^2 \cdot AB^2 \equiv (pr + qs)^2 + (ps - qr)^2$ 得

$$(pr + qs)^2 = PA^2 \cdot AB^2,$$

而 $PA \cdot AB$ 非负，开平方得

$$\begin{aligned} &pr + qs = PA \cdot AB, \\ \text{或}\quad &pr + qs = -PA \cdot AB \end{aligned}$$

若 $pr + qs = -PA \cdot AB$，则 $pr + qs \le 0$，由 $PA + AB = PB$ 的等价式得 $PA + AB = PB$。

若 $pr + qs = PA \cdot AB$，则 $PA \ge AB$ 与 $AB \ge PA$ 必居其一：

$$\begin{aligned} PA \ge AB &\implies pr + qs = PA \cdot AB \ge AB^2 \implies PB + AB = PA, \\ AB \ge PA &\implies pr + qs = PA \cdot AB \ge PA^2 \implies PA + PB = AB \end{aligned}$$

无论哪个分支，三个等式中至少有一个成立，由引理（三点共线的距离刻画），三点共线。

**必要性（三点共线 $\Longrightarrow$ 坐标判据成立）：** 设三点共线。由引理（三点共线的距离刻画），三个等式中至少有一个成立，
而三个等价式的右端都含有 $ps = qr$，故坐标判据 $ps = qr$ 成立。

把 $p = 0$ 代进判据：$0 \cdot s = qr$，而 $p = 0$ 与 $A \ne B$ 给出 $q \ne 0$，故 $r = 0$，
即 $x = x_1$，$P$ 与 $A$、$B$ 同在铅垂线 $x = x_1$ 上。

整个过程只有展开、代入与开平方，没有除以 $p$、$q$、$r$、$s$ 中任何一个，也没有假定 $P$ 与 $A$、$B$ 不重合，故铅垂线与两点重合都不用另证，如图 20-18 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (1.5,-1);
  \coordinate (B) at (1.5,1);
  \coordinate (P) at (1.5,2.2);
  \draw[gray!60, ->] (-2.4,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.8) -- (0,2.8) node[above] {$y$};
  \draw[blue!65!black, very thick, ->] (1.5,-1.8) -- (1.5,2.6);
  \node[right] at (1.5,-1.55) {$x = x_1$};
  \node[below left] at (1.45,-0.05) {$x_1$};
  \fill (A) circle (1.3pt) node[below right] {$A$};
  \fill (B) circle (1.3pt) node[right] {$B$};
  \fill (P) circle (1.3pt) node[above right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 20-18：$p = 0$ 的铅垂线，三段斜边都落在直线 $x = x_1$ 上。
>
> 图中直线标作 $x = x_1$，$A$、$B$、$P$ 都在这条线上。

于是三点共线 $\iff ps = qr$，也就是引理陈述里的那条坐标式。
````

````ad-cor
title: 推论（三点共线的斜率判定） | Corollary（Collinearity Test by Slopes）

设 $A(x_1, y_1)$、$B(x_2, y_2)$、$C(x_3, y_3)$ 为平面上三点，$x_2 \ne x_1$、$x_3 \ne x_1$。则

$$\text{三点共线} \iff m_{AB} = m_{AC}$$

共线时 $AB$ 与 $AC$ 是同一条直线的两段，如图 20-19 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.7,0) -- (2.9,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-0.9) -- (2.4,1.5);
  \node[right] at (2.4,1.5) {$L$};
  \fill (-1.8,-0.6) circle (1.3pt) node[below left] {$A$};
  \fill (0.2,0.4) circle (1.3pt) node[above left] {$B$};
  \fill (2.0,1.3) circle (1.3pt) node[above left] {$C$};
\end{tikzpicture}
\end{document}
```

> 图 20-19：$A$、$B$、$C$ 三点共线。
>
> 三点同在直线 $L$ 上。
````

````ad-proof
title: 证明 | Proof

设 $A(x_1, y_1)$、$B(x_2, y_2)$、$C(x_3, y_3)$ 为平面上三点，$x_2 \ne x_1$、$x_3 \ne x_1$。

按 §15.2.6 的斜率定义写出两段斜率，两个分母都不为零：

$$\begin{aligned} m_{AB} &= \dfrac{y_2 - y_1}{x_2 - x_1}, \\ m_{AC} &= \dfrac{y_3 - y_1}{x_3 - x_1} \end{aligned}$$

$m_{AB}$ 与 $m_{AC}$ 各自的水平腿与铅垂腿如图 20-20 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.9,0) -- (3.1,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.1) -- (0,2.1) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-0.9) -- (2.6,1.6);
  \node[above left] at (2.6,1.6) {$L$};
  \draw[orange!85!black, dashed] (-1.8,-0.6) -- (2,-0.6) -- (2,1.3);
  \draw[red!70!black, dashed] (-1.8,-0.6) -- (0.2,-0.6) -- (0.2,0.4);
  \draw[thin] (-1.8,-0.75) -- (-1.8,-0.95) -- (0.2,-0.95) -- (0.2,-0.75);
  \node at (-0.8,-1.2) {$x_2 - x_1$};
  \draw[thin] (-1.8,-1.35) -- (-1.8,-1.55) -- (2,-1.55) -- (2,-1.35);
  \node at (0.1,-1.8) {$x_3 - x_1$};
  \node[right] at (0.2,-0.25) {$y_2 - y_1$};
  \node[right] at (2,0.6) {$y_3 - y_1$};
  \fill (-1.8,-0.6) circle (1.3pt) node[above left] {$A$};
  \fill (0.2,0.4) circle (1.3pt) node[below right] {$B$};
  \fill (2,1.3) circle (1.3pt) node[above left] {$C$};
\end{tikzpicture}
\end{document}
```

> 图 20-20：两段斜率的水平腿与铅垂腿。
>
> 红色直角的两条腿给出 $m_{AB}$，橙色直角的两条腿给出 $m_{AC}$，两个直角都在 $A$ 的高度上；下方两道刻度依次标出 $x_2 - x_1$ 与 $x_3 - x_1$。

由引理（三点共线的坐标判据）（$P$ 换成 $C$）与 §15.2.6 的斜率定义，$x_2 - x_1$ 与 $x_3 - x_1$ 都不为零，同乘或同除以它们的积是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} \text{三点共线} &\iff (x_2 - x_1)(y_3 - y_1) = (y_2 - y_1)(x_3 - x_1) \\ &\iff (y_2 - y_1)(x_3 - x_1) = (y_3 - y_1)(x_2 - x_1) \\ &\iff \frac{y_2 - y_1}{x_2 - x_1} = \frac{y_3 - y_1}{x_3 - x_1} \\ &\iff m_{AB} = m_{AC} \end{aligned}$$
````

斜率判定说的是三个给定点怎么判共线。把其中两点固定成一条直线，就得到「点在直线上」的斜率说法：

````ad-thm
title: 定理（直线的斜率刻画） | Theorem（A Line Characterized by Its Slope）

设 $L$ 为斜率是 $m$ 的直线，$P_1(x_1, y_1)$ 为 $L$ 上一点，$Q(x, y)$ 为平面上一点且 $x \ne x_1$。则

$$Q \in L \iff m_{P_1Q} = m$$

直线 $L$、它上面的定点 $P_1$ 与点 $Q$ 的两条腿如图 20-21 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.0,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,1.5) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (2.6,1.3);
  \node[above left] at (2.6,1.3) {$L$};
  \draw[dashed] (-2,-1) -- (1.5,-1);
  \draw[dashed] (1.5,-1) -- (1.5,0.75);
  \draw[thin] (1.32,-1) -- (1.32,-0.82) -- (1.5,-0.82);
  \node[above] at (0.6,-1.05) {$x - x_1$};
  \node[right] at (1.5,-0.5) {$y - y_1$};
  \fill (-2,-1) circle (1.3pt) node[above left] {$P_1(x_1,y_1)$};
  \fill (1.5,0.75) circle (1.3pt) node[below right] {$Q(x,y)$};
\end{tikzpicture}
\end{document}
```

> 图 20-21：直线的斜率刻画。
>
> $L$ 过定点 $P_1(x_1, y_1)$、斜率是 $m$；虚线的水平腿长 $x - x_1$、铅垂腿长 $y - y_1$，两者之比是 $m_{P_1Q}$，它等于 $m$ 时 $Q$ 就落在 $L$ 上。
````

````ad-proof
title: 证明 | Proof

设 $L$ 为斜率是 $m$ 的直线，$P_1(x_1, y_1)$ 为 $L$ 上一点，$Q(x, y)$ 为平面上一点且 $x \ne x_1$。

先在 $L$ 上取另一点 $P_2(x_2, y_2)$，$x_2 \ne x_1$。这样的点存在：按 §20.1.2 的定义，$L = L_{AB}$ 而 $A$、$B$ 都在 $L$ 上、$A \ne B$；若 $x_A = x_B$，引理（三点共线的坐标判据）给出 $L$ 上每一点的横坐标都是 $x_A$，$L$ 是铅垂线、斜率不存在，与 $L$ 的斜率是 $m$ 冲突，故 $x_A \ne x_B$，而 $x_A$ 与 $x_B$ 中至少有一个不等于 $x_1$，取那一点为 $P_2$。

点 $P_2$ 与它的两条腿如图 20-22 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.0,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,1.5) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,-1.4) -- (2.6,1.3);
  \node[above left] at (2.6,1.3) {$L$};
  \draw[dashed] (-2,-1) -- (-1,-1);
  \draw[dashed] (-1,-1) -- (-1,-0.5);
  \draw[thin] (-1.18,-1) -- (-1.18,-0.82) -- (-1,-0.82);
  \node[below] at (-1.5,-1.05) {$x_2 - x_1$};
  \node[right] at (-1,-0.78) {$y_2 - y_1$};
  \fill (-2,-1) circle (1.3pt) node[above left] {$P_1$};
  \fill (-1,-0.5) circle (1.3pt) node[above left] {$P_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-22：在 $L$ 上另取一点 $P_2$。
>
> $P_1$、$P_2$ 都在 $L$ 上且横坐标互异，虚线的水平腿长 $x_2 - x_1$、铅垂腿长 $y_2 - y_1$。

横坐标互异给出 $P_1 \ne P_2$，由 §8.1「基本元素」小节的公理（两点连线），过 $P_1$、$P_2$ 的直线只有一条，故

$$L = L_{P_1P_2}$$

而 $P_1$、$P_2$ 与 $A$、$B$ 是 $L$ 上两组横坐标互异的点，由定理（斜率与取点无关），

$$m_{P_1P_2} = m$$

由 §20.1.2 的定义、引理（三点共线的坐标判据）与 §15.2.6 的斜率定义，$x_2 - x_1$ 与 $x - x_1$ 都不为零，同乘或同除以它们的积是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} Q \in L &\iff Q \in L_{P_1P_2} \\ &\iff (x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1) \\ &\iff \frac{y - y_1}{x - x_1} = \frac{y_2 - y_1}{x_2 - x_1} \\ &\iff m_{P_1Q} = m_{P_1P_2} \\ &\iff m_{P_1Q} = m \end{aligned}$$
````

三种判据里，坐标判据一个式子管到底，铅垂线与两点重合都在它的覆盖之内；把它展开移项，就得到直线的方程。

````ad-cor
title: 推论（过两点的直线方程） | Corollary（Equation of the Line Through Two Points）

设 $A(x_1, y_1)$、$B(x_2, y_2)$，$A \ne B$，动点为 $P(x, y)$。则

$$P \in L_{AB} \iff (y_1 - y_2)\,x + (x_2 - x_1)\,y + \big[(x_1 - x_2) y_1 + (y_2 - y_1) x_1\big] = 0$$

右端是一个二元一次方程：$x$、$y$ 的系数 $y_1 - y_2$ 与 $x_2 - x_1$ 由 $A \ne B$ 保证不全为零。$L_{AB}$ 连同其上的动点 $P$ 如图 20-23 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.9,0) -- (2.9,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.5) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick, <->] (-2.6,-1.0) -- (2.6,1.6);
  \node[below right] at (-2.2,-0.8) {$L_{AB}$};
  \fill (-1.4,-0.4) circle (1.3pt) node[above left] {$A(x_1,y_1)$};
  \fill (1.0,0.8) circle (1.3pt) node[below right] {$B(x_2,y_2)$};
  \fill (2.0,1.3) circle (1.3pt) node[above left] {$P(x,y)$};
\end{tikzpicture}
\end{document}
```

> 图 20-23：过 $A$、$B$ 的直线。
>
> 直线 $L_{AB}$ 向两端无限延伸，$A(x_1, y_1)$、$B(x_2, y_2)$ 是给定的两点，$P(x, y)$ 是其上的动点。
````

````ad-proof
title: 证明 | Proof

设 $A(x_1, y_1)$、$B(x_2, y_2)$，$A \ne B$，动点为 $P(x, y)$。

由 §20.1.2 的定义，$P \in L_{AB}$ 说的就是 $A$、$B$、$P$ 三点共线，故引理（三点共线的坐标判据）把它写成一条等式，而展开、相消、移项都是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} P \in L_{AB} &\iff (x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1) \\ &\iff x_2 y - x_2 y_1 - x_1 y + x_1 y_1 = y_2 x - y_2 x_1 - y_1 x + y_1 x_1 \\ &\iff x_2 y - x_2 y_1 - x_1 y = y_2 x - y_2 x_1 - y_1 x \\ &\iff (y_1 - y_2)\,x + (x_2 - x_1)\,y + \big[(x_1 - x_2) y_1 + (y_2 - y_1) x_1\big] = 0 \end{aligned}$$
````

这条推论把「$S$ 是一条直线」与「$S$ 是一个二元一次方程的解集」焊在一起，是全章主干的理论枢纽，却不是一条用来求方程的公式：三个系数都要先算一遍再展开，比别的形式都难记。已知两点求直线方程，走 §20.3.3 的两点式或点斜式；已知斜率与截距，走 §20.3.4 的斜截式与 §20.3.5 的截距式。

````ad-note
title: 注记（五种说法的对照） | Note（Five Ways of Saying the Same Thing）

「点在某条直线上」这句话，到此处已经有了五种说法。前四种把直线交给两个定点 $A$、$B$，第五种把直线交给一个定点与一个斜率。五种说法圈定的都是同一批点，各自的用处与限制却不相同。

**几何说法**：$P$ 与 $A$、$B$ 共线，写成集合语言是

$$P \in L_{AB}$$

这是 §20.1.2 的定义给出的原始说法，它把「点在直线上」变成一个明确的数学陈述，但没给出可以拿坐标验算的东西。

**距离说法**：三个距离 $PA$、$PB$、$AB$ 满足

$$\begin{aligned} &PA + PB = AB, \\ &PA + AB = PB, \\ &PB + AB = PA \end{aligned}$$

三式中至少有一式成立，$P$ 就与 $A$、$B$ 共线（引理（三点共线的距离刻画））。这条判据只用到距离，与坐标轴怎么摆、$A$ 与 $B$ 谁左谁右都无关，代价是要算三个平方根。

**坐标说法**：四个坐标差满足一条等式

$$(x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1)$$

它由距离说法推出来，反过来也推出距离说法（引理（三点共线的坐标判据）），只做乘、减与比较，不开平方；铅垂线（$x_2 = x_1$）与两点重合都落在它的覆盖之内，不必另作交代。

**斜率说法**：两段斜率相等

$$m_{AB} = m_{AP}$$

它是坐标说法两边同除以非零的 $(x_2 - x_1)(x - x_1)$ 得到的（推论（三点共线的斜率判定）），因此只在 $x_2 \ne x_1$ 且 $x \ne x_1$ 时可用；一旦 $A$、$B$ 的横坐标相同，斜率不存在，这条说法就失效，得回到坐标说法。

**点斜说法**：直线由定点 $P_1(x_1, y_1)$ 与斜率 $m$ 给出时，$Q \in L$ 说的是

$$m_{P_1Q} = m$$

它由斜率说法把 $A$、$B$ 固定成 $L$ 上的两点得到（定理（直线的斜率刻画）），须 $x \ne x_1$；$x = x_1$ 时 $Q$ 只能是 $P_1$ 本身。§20.3.3 的点斜式就是这一说法的展开。

五种说法的分工列在下面。

| 说法 | 数学表达 | 用到的量 | 覆盖范围 |
|---|---|---|---|
| 共线（几何） | $P \in L_{AB}$ | 共线的直观与公理（两点连线） | 全部情形，但不可直接验算 |
| 距离 | 三式中至少一式取等号 | 两点间的距离 | 全部情形，须算三个距离 |
| 坐标 | $(x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1)$ | 四个坐标差 | 全部情形，一个等式即可 |
| 斜率 | $m_{AB} = m_{AP}$ | 斜率 | 只覆盖 $x_2 \ne x_1$ 且 $x \ne x_1$ 的情形 |
| 点斜 | $m_{P_1Q} = m$ | 一个定点与直线的斜率 | 直线由一点与斜率给出时用，须 $x \ne x_1$ |

把坐标说法里的 $P(x, y)$ 当作动点，展开移项就得到推论（过两点的直线方程）：

$$P \in L_{AB} \iff (y_1 - y_2)\,x + (x_2 - x_1)\,y + \big[(x_1 - x_2) y_1 + (y_2 - y_1) x_1\big] = 0$$

这条等价式的左端是几何语言「$P$ 在直线上」，右端是代数语言「$P$ 的坐标满足一个二元一次方程」，中间的双箭头说的正是两者圈定同一批点。§20.3.2 把右端那个方程记作一般式，§20.3.3 至 §20.3.5 按已知条件把同一方程改写成别的形式，§20.4 与 §20.5 再从它的系数读出两直线的位置关系与距离。至于「某个点在不在某条直线上」这个问题，从此就只是把它的坐标代进方程、看等式成不成立。
````

### 20.3.2　一般式

§20.3.1 的推论已经把过两点的直线写成了一个二元一次方程。本节给这类方程一个名字，交代用斜率写不出来的铅垂线在它里面怎么表示，再说明怎样从三个系数读出斜率、怎样判断一个点在不在直线上。两个截距是直线与坐标轴的交点坐标，要等 §20.4.1 讲完交点才有严格定义，故住在 §20.4.2。

````ad-def
title: 定义（一般式） | Definition（General Form）

形如

$$Ax + By + C = 0$$

的方程称为直线的**一般式 (general form)**，其中 $A$、$B$、$C$ 为常数，且 $A$、$B$ 不全为零，即

$$A^2 + B^2 \ne 0$$

按 §20.1.2 的记号约定，$L : Ax + By + C = 0$ 读作

$$L = \{\, (x, y) \in \mathbb{R}^2 : Ax + By + C = 0 \,\}$$

即 $L$ 是这个方程的解集。
````

一般式只要求 $A$、$B$ 不全为零，其中一个尽可以是零。这一个许可把两类与坐标轴平行的直线收了进来，其中铅垂线正是用斜率怎么也写不出来的那一类。

````ad-note
title: 注记（铅垂线与水平线的一般式） | Note（Vertical and Horizontal Lines in General Form）

**水平线**：与 $x$ 轴平行或重合的直线，其上每一点的纵坐标同为常数 $c$，方程是 $y = c$（§20.1.1）。写成一般式，取 $A = 0$、$B = 1$、$C = -c$：

$$0 \cdot x + 1 \cdot y + (-c) = 0 \iff y = c$$

$A = 0$ 就是「水平」的代数特征：此时直线上任意两点的纵坐标相同，$\Delta y = 0$ 而 $\Delta x \ne 0$，斜率为 $0$（§20.2.2）。水平线与 $y$ 轴交于 $(0, c)$，与 $x$ 轴在 $c \ne 0$ 时没有公共点，如图 20-24A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.5,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.0) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.2,1.1) -- (2.4,1.1);
  \node[above left] at (2.4,1.1) {$y = c$};
  \fill (0,1.1) circle (1.3pt) node[below left] {$(0,c)$};
  \node[below right] at (-2.2,1.1) {$A = 0$};
\end{tikzpicture}
\end{document}
```

> 图 20-24A：水平线 $y = c$，即 $A = 0$ 的一般式。
>
> 直线与 $y$ 轴交于 $(0, c)$，与 $x$ 轴平行；图内的 $A = 0$ 标出它的一般式的系数特征，图中取 $c > 0$。

**铅垂线**：与 $y$ 轴平行或重合的直线，其上每一点的横坐标同为常数 $a$，方程是 $x = a$（§20.1.1）。写成一般式，取 $A = 1$、$B = 0$、$C = -a$：

$$1 \cdot x + 0 \cdot y + (-a) = 0 \iff x = a$$

$B = 0$ 就是「铅垂」的代数特征：此时直线上任意两点的横坐标相同，$\Delta x = 0$，斜率的分母为零，斜率不存在（§20.2.2），故这条直线写不成任何含斜率的形式。铅垂线与 $x$ 轴交于 $(a, 0)$，与 $y$ 轴在 $a \ne 0$ 时没有公共点，如图 20-24B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.5,0) -- (2.7,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.8) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (1.5,-1.5) -- (1.5,1.6);
  \node[below right] at (1.5,1.6) {$x = a$};
  \fill (1.5,0) circle (1.3pt) node[above left] {$(a,0)$};
  \node[above left] at (1.5,-1.5) {$B = 0$};
\end{tikzpicture}
\end{document}
```

> 图 20-24B：铅垂线 $x = a$，即 $B = 0$ 的一般式。
>
> 直线与 $x$ 轴交于 $(a, 0)$，与 $y$ 轴平行；图内的 $B = 0$ 标出它的一般式的系数特征，图中取 $a > 0$。

**过原点的直线**：$C = 0$ 时把 $(0, 0)$ 代入 $Ax + By + C$ 得 $A \cdot 0 + B \cdot 0 + 0 = 0$，为真，故原点在直线上；反过来，直线过原点，就是把 $(0, 0)$ 代入它的方程得到 $C = 0$。此时 $A$、$B$ 仍只要求不全为零，直线可以斜、可以水平、也可以铅垂，如图 20-24C 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.5,0) -- (2.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.7) -- (0,1.7) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.9,-1.14) -- (2.2,1.32);
  \node[below right] at (2.2,1.32) {$L$};
  \fill (0,0) circle (1.3pt) node[above left] {$O$};
  \node[below right] at (1.2,0.72) {$C = 0$};
\end{tikzpicture}
\end{document}
```

> 图 20-24C：$C = 0$ 的直线过原点。
>
> 原点 $O$ 的坐标使方程成立，故 $O$ 在直线 $L$ 上；图内的 $C = 0$ 标出它的一般式的系数特征。

三个系数各管一件事：$A = 0$ 给水平线，$B = 0$ 给铅垂线，$C = 0$ 给过原点的直线。用斜率写不出来的铅垂线，一般式照样写得出来；§20.3.1 的引理与推论又已把「是一条直线」与「是一个二元一次方程的解集」钉成互为充要。这两点就是把一般式当主干形式的理由。
````

直线的几何信息都藏在一般式的三个系数里。本节先读斜率与「点在不在直线上」两件事；两个截距要等 §20.4.1 的交点到手才读，见 §20.4.2。

````ad-cor
title: 推论（由一般式读斜率） | Corollary（Slope from the General Form）

设直线 $L : Ax + By + C = 0$，且 $B \ne 0$。则

$$L : y = -\frac{A}{B}\,x - \frac{C}{B}$$

即 $L$ 的斜率为 $-\dfrac{A}{B}$。
````

````ad-proof
title: 证明 | Proof

设直线 $L : Ax + By + C = 0$，且 $B \ne 0$。

移项与两边同除以非零的 $B$ 都是等价变形，解集不变：

$$\begin{aligned} L : Ax + By + C = 0 &\iff By = -Ax - C \\ &\iff y = -\frac{A}{B}\,x - \frac{C}{B} \end{aligned}$$

在 $L$ 上取横坐标为 $0$ 与 $1$ 的两点 $\left(0, -\dfrac{C}{B}\right)$、$\left(1, -\dfrac{A}{B} - \dfrac{C}{B}\right)$，按 §15.2.6 的斜率定义算出

$$\begin{aligned} m &= \frac{\left(-\dfrac{A}{B} - \dfrac{C}{B}\right) - \left(-\dfrac{C}{B}\right)}{1 - 0} \\ &\equiv \frac{-\dfrac{A}{B}}{1} \equiv -\frac{A}{B} \end{aligned}$$

$L$ 与斜率的两个变化量如图 20-25 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.1) -- (0,2.1) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.6,-0.56) -- (2.4,1.84);
  \node[below right] at (2.4,1.84) {$L$};
  \draw[dashed] (0,0.4) -- (1,0.4);
  \draw[dashed] (1,0.4) -- (1,1.0);
  \draw (0.82,0.4) -- (0.82,0.58) -- (1,0.58);
  \fill (0,0.4) circle (1.3pt);
  \node[below] at (0.5,0.4) {$1$};
  \node[right] at (1,0.7) {$-A/B$};
\end{tikzpicture}
\end{document}
```

> 图 20-25：由一般式读斜率。
>
> 虚线的水平腿长 $1$、铅垂腿长 $-A/B$，两者之比就是斜率；水平腿的左端是 $L$ 上横坐标为 $0$ 的点 $\left(0, -\frac{C}{B}\right)$。
````

````ad-note
title: 注记（从系数读几何信息） | Note（Reading Geometry off the Coefficients）

把 $L : Ax + By + C = 0$ 的三个系数看一遍，两个问题就都有答案。

- **斜率**：$B \ne 0$ 时为 $-\dfrac{A}{B}$；$B = 0$ 时 $L$ 是铅垂线 $x = -\dfrac{C}{A}$，斜率不存在。

- **某点在不在 $L$ 上**：按 §20.1.2 的定义，$Q(x_0, y_0) \in L \iff Ax_0 + By_0 + C = 0$，代入即知。

两条都只用到 $A$、$B$、$C$ 三个系数，不必先把方程改写成别的形式。两个截距同样只是系数的一次式，但它们要先有「交点」这件工具，故与读法一起住在 §20.4.2 的注记（由一般式读两截距）。
````

````ad-example
title: 示例（由一般式读斜率） | Example（Reading the Slope off the General Form）

就下面每条直线，读出斜率；不存在时说明理由。

(a) $L_1 : 3x + 4y - 12 = 0$

(b) $L_2 : 2x + 5 = 0$

(c) $L_3 : x - 3y = 0$

---

**(a)** $A = 3$、$B = 4$、$C = -12$，$B \ne 0$，由推论（由一般式读斜率），

$$m = -\frac{A}{B} = -\frac{3}{4}$$

$L_1$ 与斜率的两个变化量如图 20-26 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.9,0) -- (5.4,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.1) -- (0,4.0) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.6,3.45) -- (5.0,-0.75);
  \node[below left] at (5.0,-0.75) {$L_1$};
  \draw[dashed] (0,3) -- (1,3);
  \draw[dashed] (1,3) -- (1,2.25);
  \draw[thin] (1.18,3) -- (1.18,2.82) -- (1,2.82);
  \node[above] at (0.5,3.02) {$1$};
  \node[right] at (1,2.6) {$-\frac{3}{4}$};
  \fill (0,3) circle (1.3pt);
\end{tikzpicture}
\end{document}
```

> 图 20-26：$L_1 : 3x + 4y - 12 = 0$ 的斜率。
>
> 虚线的水平腿长 $1$、铅垂腿长 $\frac{3}{4}$ 且朝下，带上符号就是斜率 $-\frac{3}{4}$；水平腿的左端是 $L_1$ 上横坐标为 $0$ 的点。

**(b)** $A = 2$、$B = 0$、$C = 5$。$B = 0$，按注记（从系数读几何信息），$L_2$ 是铅垂线 $x = -\dfrac{5}{2}$，斜率不存在。

**(c)** $A = 1$、$B = -3$、$C = 0$。$B \ne 0$，故

$$m = -\frac{A}{B} = -\frac{1}{-3} = \frac{1}{3}$$

$C = 0$ 说的是 $L_3$ 过原点，出处是注记（铅垂线与水平线的一般式）。
````

### 20.3.3　点斜式

一般式回答的是「直线长什么样」；可是要由已知条件把方程写出来，一般式并不顺手，它的三个系数都要先算一遍再展开。本节起三节按已知条件把同一个方程改写为点斜式（含两点式）、斜截式与截距式。改写只是换一件外衣，说的仍是同一条直线，但已知条件一交出来，方程就跟着写出来了。

````ad-thm
title: 定理（点斜式） | Theorem（Point-Slope Form）

设 $m$ 为实数，$P_1(x_1, y_1)$ 为平面上一点，$L$ 为斜率是 $m$ 且过 $P_1$ 的直线。则对任意一点 $Q(x, y)$，

$$Q \in L \iff y - y_1 = m(x - x_1)$$

定点 $P_1$、直线上另一点 $Q$ 与两个变化量如图 20-27 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.6,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.2,-1.12) -- (2.2,1.52);
  \node[above left] at (2.2,1.52) {$L$};
  \draw[dashed] (-1.4,-0.64) -- (1.4,-0.64);
  \draw[dashed] (1.4,-0.64) -- (1.4,1.04);
  \draw (1.22,-0.64) -- (1.22,-0.46) -- (1.4,-0.46);
  \fill (-1.4,-0.64) circle (1.3pt) node[above left] {$P_1(x_1,y_1)$};
  \fill (1.4,1.04) circle (1.3pt) node[above left] {$Q(x,y)$};
  \node[below] at (0,-0.64) {$x - x_1$};
  \node[right] at (1.4,0.2) {$y - y_1$};
\end{tikzpicture}
\end{document}
```

> 图 20-27：点斜式的配置。
>
> $L$ 过定点 $P_1(x_1, y_1)$，$Q(x, y)$ 是 $L$ 上另一点；虚线的水平腿长 $x - x_1$，铅垂腿长 $y - y_1$，两者之比就是 $m$。
````

````ad-proof
title: 证明 | Proof

设 $m$ 为实数，$P_1(x_1, y_1)$ 为平面上一点，$L$ 为斜率是 $m$ 且过 $P_1$ 的直线，$Q(x, y)$ 为平面上任意一点。

**$x \ne x_1$：** 由定理（直线的斜率刻画）与 §15.2.6 的斜率定义，$x - x_1 \ne 0$，同乘它是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} Q \in L &\iff m_{P_1Q} = m \\ &\iff \frac{y - y_1}{x - x_1} = m \\ &\iff y - y_1 = m(x - x_1) \end{aligned}$$

**$x = x_1$：** 方程 $y - y_1 = m(x - x_1)$ 化成 $y - y_1 = m \cdot 0 = 0$，即 $y = y_1$，说的就是 $Q = P_1$，而 $P_1 \in L$。不铅垂的 $L$ 与铅垂线 $x = x_1$ 只有一个公共点 $P_1$，如图 20-28 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.6,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-1.24) -- (2.6,1.76);
  \node[above left] at (2.6,1.76) {$L$};
  \draw[dashed] (-1.4,-1.4) -- (-1.4,1.0);
  \node[above right] at (-1.4,0.85) {$x = x_1$};
  \fill (-1.4,-0.64) circle (1.3pt) node[below right] {$P_1 = Q$};
\end{tikzpicture}
\end{document}
```

> 图 20-28：$x = x_1$ 时 $Q$ 与 $P_1$ 重合。
>
> 铅垂线 $x = x_1$（虚线）与不铅垂的 $L$ 只有一个公共点 $P_1$，故方程的解只能是 $Q = P_1$。

反过来，$Q \in L$ 而 $x = x_1$ 时 $Q$ 也只能是 $P_1$：若 $Q \ne P_1$，则 $P_1$、$Q$ 是 $L$ 上两个不同的点，由 §8.1「基本元素」小节的公理（两点连线）得 $L = L_{P_1Q}$，而两点横坐标相同使 $L_{P_1Q}$ 是铅垂线、斜率不存在，与 $L$ 的斜率是 $m$ 冲突。横坐标相同而纵坐标不同的两点所确定的直线是铅垂线，如图 20-29 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.6,0) -- (1.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.8) -- (0,1.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.2,-1.5) -- (-1.2,1.5);
  \node[above left] at (-1.2,1.5) {$x = x_1$};
  \draw[dashed] (-1.2,-0.6) -- (0,-0.6);
  \draw[dashed] (-1.2,0.8) -- (0,0.8);
  \node[right] at (0,-0.6) {$y_1$};
  \node[right] at (0,0.8) {$y$};
  \fill (-1.2,-0.6) circle (1.3pt) node[below right] {$P_1$};
  \fill (-1.2,0.8) circle (1.3pt) node[above right] {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 20-29：$Q$ 与 $P_1$ 横坐标相同而纵坐标不同。
>
> 过 $P_1$、$Q$ 的直线是铅垂线 $x = x_1$，它的斜率不存在，与 $L$ 的斜率是 $m$ 冲突。

故 $Q = P_1$，方程两端都是 $0$，等式成立；$Q \in L$ 与方程成立仍然互为充要。

$Q$ 的横坐标要么等于 $x_1$、要么不等于 $x_1$，两种可能都已给出 $Q \in L \iff y - y_1 = m(x - x_1)$。
````

````ad-example
title: 示例（由一点与斜率求直线方程） | Example（Equation of a Line from a Point and a Slope）

求过 $P(3, -2)$、斜率为 $-\dfrac{1}{2}$ 的直线方程。

---

一点与斜率都已知，用定理（点斜式）。所求直线、它的定点与斜率的两条腿如图 20-30 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.9,0) -- (4.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.9) -- (0,1.1) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.6,0.3) -- (4.2,-2.6);
  \node[above right] at (4.2,-2.6) {$L$};
  \draw[dashed] (1,-2) -- (3,-2);
  \draw[dashed] (1,-2) -- (1,-1);
  \draw[thin] (1.18,-2) -- (1.18,-1.82) -- (1,-1.82);
  \node[below] at (2,-2.02) {$2$};
  \node[right] at (1,-1.5) {$1$};
  \fill (3,-2) circle (1.3pt) node[above right] {$P(3,-2)$};
\end{tikzpicture}
\end{document}
```

> 图 20-30：过 $P(3, -2)$、斜率为 $-\frac{1}{2}$ 的直线。
>
> 虚线的水平腿长 $2$ 且朝左、铅垂腿长 $1$ 且朝上，带上符号两者之比就是斜率 $-\frac{1}{2}$。

取 $(x_1, y_1) = (3, -2)$、$m = -\dfrac{1}{2}$ 代入点斜式：

$$y - (-2) = -\frac{1}{2}\,(x - 3)$$

去分母、展开与移项都是等价变形：

$$\begin{aligned} y + 2 = -\frac{1}{2}\,(x - 3) &\iff 2y + 4 = -(x - 3) \\ &\iff 2y + 4 = -x + 3 \\ &\iff x + 2y + 1 = 0 \end{aligned}$$

即直线的方程是 $x + 2y + 1 = 0$，写成斜截式是 $y = -\dfrac{1}{2}\,x - \dfrac{1}{2}$。
````

把点斜式里的 $m$ 换成由两点算出的斜率，就得到只依赖两个点的写法。

````ad-cor
title: 推论（两点式） | Corollary（Two-Point Form）

设 $P_1(x_1, y_1)$、$P_2(x_2, y_2)$ 为平面上两点，$x_1 \ne x_2$ 且 $y_1 \ne y_2$，$L$ 为过这两点的直线。则对任意一点 $Q(x, y)$，

$$Q \in L \iff \frac{y - y_1}{y_2 - y_1} = \frac{x - x_1}{x_2 - x_1}$$

两个定点、动点 $Q$ 与它们的坐标如图 20-31 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3,0) -- (3.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.9) -- (0,2.3) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.6,-0.24) -- (2.8,1.92);
  \node[above left] at (2.8,1.92) {$L$};
  \draw[dashed] (-1.5,0.2) -- (-1.5,0);
  \draw[dashed] (-1.5,0.2) -- (0,0.2);
  \draw[dashed] (1.5,1.4) -- (1.5,0);
  \draw[dashed] (1.5,1.4) -- (0,1.4);
  \fill (-1.5,0.2) circle (1.3pt) node[above left] {$P_1$};
  \fill (1.5,1.4) circle (1.3pt) node[above left] {$P_2$};
  \fill (2.5,1.8) circle (1.3pt) node[above left] {$Q(x,y)$};
  \node[below] at (-1.5,0) {$x_1$};
  \node[left] at (0,0.2) {$y_1$};
  \node[below] at (1.5,0) {$x_2$};
  \node[left] at (0,1.4) {$y_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-31：两点式的配置。
>
> $P_1$、$P_2$ 是已知的两点，$Q(x, y)$ 是 $L$ 上的动点，虚线足给出 $x_1$、$y_1$、$x_2$、$y_2$。
````

````ad-proof
title: 证明 | Proof

设 $P_1(x_1, y_1)$、$P_2(x_2, y_2)$，$x_1 \ne x_2$ 且 $y_1 \ne y_2$，$L$ 为过这两点的直线，$Q(x, y)$ 为平面上任意一点。

$x_1 \ne x_2$ 说明 $L$ 不铅垂，故斜率存在且 $m = m_{P_1P_2} = \dfrac{y_2 - y_1}{x_2 - x_1}$（§15.2.6）。

两组水平腿与铅垂腿如图 20-32 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.2,0) -- (3.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.6) -- (0,3.0) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.8,0.28) -- (3.2,2.68);
  \node[above left] at (3.2,2.68) {$L$};
  \draw[orange!85!black, dashed] (-2,0.6) -- (2,0.6) -- (2,2.2);
  \draw[red!70!black, dashed] (-2,0.6) -- (0.5,0.6) -- (0.5,1.6);
  \node[below] at (-1.2,0.6) {$x_2 - x_1$};
  \node[below] at (1.3,0.6) {$x - x_1$};
  \node[right] at (0.5,1.0) {$y_2 - y_1$};
  \node[right] at (2,1.4) {$y - y_1$};
  \fill (-2,0.6) circle (1.3pt) node[below left] {$P_1$};
  \fill (0.5,1.6) circle (1.3pt) node[above left] {$P_2$};
  \fill (2,2.2) circle (1.3pt) node[below right] {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 20-32：两点式里的两组变化量。
>
> 红色直角的两条腿给出 $m_{P_1P_2}$，橙色直角的两条腿给出 $m_{P_1Q}$，两个直角都在 $P_1$ 的高度上。

把 $m$ 代进定理（点斜式），再由 $y_2 - y_1$ 与 $x_2 - x_1$ 都不为零、同乘或同除以它们是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} Q \in L &\iff y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1) \\ &\iff \frac{y - y_1}{y_2 - y_1} = \frac{x - x_1}{x_2 - x_1} \end{aligned}$$
````

````ad-note
title: 注记（两点式的两种退化） | Note（Two Degenerate Cases of the Two-Point Form）

推论（两点式）要求 $x_1 \ne x_2$ 且 $y_1 \ne y_2$，两种退化各自另有答案。

- **$x_1 = x_2$**：两点横坐标同为 $x_1$，此时 $y_2 - y_1 \ne 0$，坐标判据的等式化为 $0 = (y_2 - y_1)(x - x_1)$，即 $x = x_1$，故 $L$ 是铅垂线 $x = x_1$。

- **$y_1 = y_2$**：两点纵坐标同为 $y_1$，此时 $x_2 - x_1 \ne 0$，坐标判据的等式化为 $(x_2 - x_1)(y - y_1) = 0$，即 $y = y_1$，故 $L$ 是水平线 $y = y_1$。

于是「已知两点求直线方程」的常规走法是先看两点的横坐标：横坐标不同就先算斜率再代点斜式，或直接套推论（两点式）；横坐标相同就是铅垂线 $x = x_1$，纵坐标相同就是水平线 $y = y_1$，两种退化直接写出方程，不必套公式。
````

````ad-example
title: 示例（由两点求直线方程） | Example（Equation of the Line Through Two Points）

求过 $A(2, 1)$ 与 $B(5, 7)$ 的直线方程。

---

两点的横坐标与纵坐标都互异，用推论（两点式）。取 $(x_1, y_1) = (2, 1)$、$(x_2, y_2) = (5, 7)$：

$$\frac{y - 1}{7 - 1} = \frac{x - 2}{5 - 2}$$

交叉相乘、展开、移项与约去公因数都是等价变形：

$$\begin{aligned} \frac{y - 1}{6} = \frac{x - 2}{3} &\iff 3(y - 1) = 6(x - 2) \\ &\iff 3y - 3 = 6x - 12 \\ &\iff 6x - 3y - 9 = 0 \\ &\iff 2x - y - 3 = 0 \end{aligned}$$

即直线的方程是 $2x - y - 3 = 0$，写成斜截式是 $y = 2x - 3$。
````

### 20.3.4　斜截式

这一形式通称**斜截式**，它是点斜式把定点取在 $y$ 轴上的结果。名字里的「截」指 $c$，也就是 $L$ 与 $y$ 轴交点的纵坐标，这个称呼要到 §20.4.2 才有定义；本节只用到「$L$ 过点 $(0, c)$」这件事实。

````ad-thm
title: 定理（斜截式） | Theorem（Slope-Intercept Form）

设 $m$、$c$ 为实数，$L$ 为斜率是 $m$ 且过点 $(0, c)$ 的直线。则对任意一点 $Q(x, y)$，

$$Q \in L \iff y = mx + c$$

$L$、它与 $y$ 轴的交点 $(0, c)$ 与斜率的两个变化量如图 20-33 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.2,0) -- (2.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.2) -- (0,2.3) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.8,-0.76) -- (2.2,2.04);
  \node[below right] at (2.2,2.04) {$L$};
  \draw[dashed] (0,0.5) -- (1,0.5);
  \draw[dashed] (1,0.5) -- (1,1.2);
  \draw (0.82,0.5) -- (0.82,0.68) -- (1,0.68);
  \fill (0,0.5) circle (1.3pt);
  \node[left] at (0,0.5) {$(0,c)$};
  \node[below] at (0.5,0.5) {$1$};
  \node[right] at (1,0.85) {$m$};
\end{tikzpicture}
\end{document}
```

> 图 20-33：斜截式的配置。
>
> $L$ 与 $y$ 轴交于 $(0, c)$，虚线的水平腿长 $1$、铅垂腿长 $m$，两者之比就是斜率。
````

````ad-proof
title: 证明 | Proof

设 $m$、$c$ 为实数，$L$ 为斜率是 $m$ 且过点 $(0, c)$ 的直线，$Q(x, y)$ 为平面上任意一点。

$L$ 过 $(0, c)$ 且斜率为 $m$，由定理（点斜式）取 $P_1(0, c)$；而 $x - 0 \equiv x$、两边加 $c$ 都是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} Q \in L &\iff y - c = m(x - 0) \\ &\iff y - c = mx \\ &\iff y = mx + c \end{aligned}$$
````

上一章 §19.3.2 定义了线性函数 $f(x) = kx + b$（$k \neq 0$），其图像为直线，$k$ 为斜率，$b$ 是图像与 $y$ 轴交点的纵坐标（§20.4.2 称为 $y$ 截距）。两种记号的对应关系如下：

| 来源 | 斜率记号 | 与 $y$ 轴交点的纵坐标 | 方程形式 |
|------|---------|---------|---------|
| 第 19 章（函数视角） | $k$ | $b$ | $f(x) = kx + b$ |
| 本章（直线方程视角） | $m$ | $c$ | $y = mx + c$ |

两种记号指的是同一个量：$m$ 即 $k$，$c$ 即 $b$。函数视角强调「输入 $x$ 经变换得输出 $y$」，直线方程视角强调「坐标 $(x, y)$ 满足的约束条件」。本章统一采用 $m, c$ 记号。

````ad-example
title: 示例（由斜截式求直线） | Example（Line from Its Slope and a Point on the $y$-Axis）

求斜率为 $-3$、过点 $(0, 4)$ 的直线方程，并求它与 $x$ 轴交点的横坐标。

---

由定理（斜截式），直线的方程是 $y = -3x + 4$，化为一般式是 $3x + y - 4 = 0$。

求它与 $x$ 轴交点的横坐标，即令 $y = 0$：

$$-3x + 4 = 0 \iff x = \frac{4}{3}$$

故交点是 $\left(\dfrac{4}{3},\ 0\right)$。把 $y = 0$ 直接代进一般式 $3x + y - 4 = 0$ 也解出同一个 $x$，两法一致。
````

### 20.3.5　截距式

这一形式通称**截距式**，它是过两点的直线方程把那两个点取在两根坐标轴上时的化简形。$a$、$b$ 这两个名字（$x$ 截距与 $y$ 截距）要到 §20.4.2 才有定义；本节只用到「$L$ 过 $A(a, 0)$ 与 $B(0, b)$」这件事实。

````ad-thm
title: 定理（截距式） | Theorem（Intercept Form）

设 $a \ne 0$、$b \ne 0$，$L$ 为过 $A(a, 0)$ 与 $B(0, b)$ 的直线。则对任意一点 $Q(x, y)$，

$$Q \in L \iff \frac{x}{a} + \frac{y}{b} = 1$$

$L$ 与它在两轴上的交点 $A(a, 0)$、$B(0, b)$ 如图 20-34 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.2,0) -- (2.9,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.9) -- (0,2.1) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.6,1.82) -- (2.4,-0.28);
  \node[below right] at (2.4,-0.28) {$L$};
  \fill (2.0,0) circle (1.3pt) node[above right] {$A(a,0)$};
  \fill (0,1.4) circle (1.3pt) node[above right] {$B(0,b)$};
\end{tikzpicture}
\end{document}
```

> 图 20-34：截距式的配置。
>
> $L$ 与 $x$ 轴交于 $A(a, 0)$、与 $y$ 轴交于 $B(0, b)$，图中 $a$、$b$ 都取正值。
````

````ad-proof
title: 证明 | Proof

设 $a \ne 0$、$b \ne 0$，$L$ 为过 $A(a, 0)$ 与 $B(0, b)$ 的直线，$Q(x, y)$ 为平面上任意一点。

$a \ne 0$ 而 $A$ 的纵坐标为 $0$、$B$ 的横坐标为 $0$，故 $A \ne B$。

由 §20.3.1 的推论（过两点的直线方程），取 $(x_1, y_1) = (a, 0)$、$(x_2, y_2) = (0, b)$；而 $a \ne 0$ 且 $b \ne 0$ 给出 $ab \ne 0$，故展开、移项与两边同除以 $ab$ 都是等价变形，整条链就是所要的充要条件：

$$\begin{aligned} Q \in L &\iff (0 - b)\,x + (0 - a)\,y + \big[(a - 0) \cdot 0 + (b - 0) \cdot a\big] = 0 \\ &\iff -bx - ay + ab = 0 \\ &\iff bx + ay = ab \\ &\iff \frac{x}{a} + \frac{y}{b} = 1 \end{aligned}$$
````

截距式要求 $a \ne 0$ 且 $b \ne 0$，也就是直线既不过原点也不平行于坐标轴：过原点时 $A$ 与 $B$ 都是原点、两点重合，平行于 $x$ 轴时与 $x$ 轴没有交点，平行于 $y$ 轴时与 $y$ 轴没有交点，与坐标轴重合时交点又不唯一，这几种情况都写不成截距式，但都写得出一般式。

````ad-example
title: 示例（由两轴上的交点求直线方程） | Example（Line from Its Two Axis Intersections）

求过 $x$ 轴上一点 $A(4, 0)$ 与 $y$ 轴上一点 $B(0, -2)$ 的直线方程。

---

两点各在一根轴上，横坐标与纵坐标各有一个是零，用定理（截距式）比两点式省事。所求直线与它在两轴上的交点如图 20-35 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.0,0) -- (5.0,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.7) -- (0,1.0) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.5,-2.25) -- (4.6,0.3);
  \node[above left] at (4.6,0.3) {$L$};
  \fill (4,0) circle (1.3pt) node[above left] {$(4,0)$};
  \fill (0,-2) circle (1.3pt) node[above left] {$(0,-2)$};
\end{tikzpicture}
\end{document}
```

> 图 20-35：过 $A(4, 0)$ 与 $B(0, -2)$ 的直线。
>
> 直线与 $x$ 轴交于 $(4, 0)$、与 $y$ 轴交于 $(0, -2)$，一个横坐标为正、一个纵坐标为负。

取 $a = 4$、$b = -2$ 代入截距式：

$$\frac{x}{4} + \frac{y}{-2} = 1$$

去分母与移项都是等价变形：

$$\begin{aligned} \frac{x}{4} - \frac{y}{2} = 1 &\iff x - 2y = 4 \\ &\iff x - 2y - 4 = 0 \end{aligned}$$

即直线的方程是 $x - 2y - 4 = 0$，写成斜截式是 $y = \dfrac{1}{2}\,x - 2$。
````

### 20.3.6　形式的关系与选用

一般式是主干，其余四种是它在特定已知条件下的改写。五种写法连同各自的已知条件、化回一般式的结果与适用范围列在下面。

| 形式 | 方程 | 已知条件 | 化为一般式 | 适用范围 |
|------|------|---------|-----------|---------|
| 一般式 | $Ax + By + C = 0$ | 无，任何直线都写得成 | 本身 | $A$、$B$ 不全为零 |
| 点斜式 | $y - y_1 = m(x - x_1)$ | 一点与斜率 | $mx - y + (y_1 - mx_1) = 0$ | 斜率存在 |
| 两点式 | $\dfrac{y - y_1}{y_2 - y_1} = \dfrac{x - x_1}{x_2 - x_1}$ | 两点 | 交叉相乘后展开移项 | 两点横坐标互异且纵坐标互异 |
| 斜截式 | $y = mx + c$ | 斜率与 $y$ 轴交点的纵坐标 | $mx - y + c = 0$ | 斜率存在 |
| 截距式 | $\dfrac{x}{a} + \dfrac{y}{b} = 1$ | 两轴交点的坐标 | $bx + ay - ab = 0$ | $a \ne 0$ 且 $b \ne 0$ |

读法有三条：

- **按已知条件选形式**：给一点一斜率写点斜式，给两点写两点式，给斜率与 $y$ 轴上一点写斜截式，给两轴上的交点写截距式。四种都是立式的方法，算完再化成一般式或斜截式作为答案。

- **任何形式都能化为一般式**：表中第四列就是化法，故一般式是把不同答案对齐比较的通用形式。

- **反过来不总行**：$B = 0$（铅垂线）时一般式化不回斜截式与截距式，$A = 0$（水平线）或 $C = 0$（过原点）时化不回截距式。

````ad-note
title: 注记（一般式的不唯一性） | Note（General Form is Not Unique）

同一条直线的一般式不唯一：$k \ne 0$ 时，$Ax + By + C = 0$ 与 $kAx + kBy + kC = 0$ 同解，故两者是同一个点集、同一条直线。

习惯上把 $x$ 的系数取正，并把三个系数的公因数约掉，例如把 $-6x + 3y + 9 = 0$ 写成 $2x - y - 3 = 0$。
````

````ad-example
title: 示例（三角形三边的直线方程） | Example（Equations of the Three Sides of a Triangle）

已知 $\triangle ABC$ 的三个顶点 $A(0, 0)$、$B(4, 0)$、$C(2, 3)$，求三边 $AB$、$BC$、$CA$ 所在直线的方程。

---

三角形与三边所在的直线如图 20-36 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.9,0) -- (4.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.8) -- (0,3.8) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.5,0) -- (4.5,0);
  \draw[blue!65!black, very thick] (4.35,-0.525) -- (1.7,3.45);
  \draw[blue!65!black, very thick] (2.25,3.375) -- (-0.25,-0.375);
  \fill (4,0) circle (1.3pt) node[above right] {$B$};
  \fill (2,3) circle (1.3pt);
  \node[above] at (2,3.3) {$C$};
  \node at (-0.34,-0.12) {$A$};
  \fill (0,0) circle (1.3pt);
\end{tikzpicture}
\end{document}
```

> 图 20-36：$\triangle ABC$ 与三边所在的直线。
>
> 三条蓝线依次是边 $AB$、$BC$、$CA$ 所在的直线；$AB$ 落在 $x$ 轴上，$CA$ 过原点。

三边各由两个顶点确定，用推论（两点式）。

**边 $AB$**：$A$、$B$ 的纵坐标同为 $0$，两点式不适用，按注记（两点式的两种退化），$AB$ 是水平线，即直线的方程是 $y = 0$。

**边 $BC$**：取 $(x_1, y_1) = (4, 0)$、$(x_2, y_2) = (2, 3)$，

$$\frac{y - 0}{3 - 0} = \frac{x - 4}{2 - 4}$$

交叉相乘、展开与移项都是等价变形：

$$\begin{aligned} \frac{y}{3} = \frac{x - 4}{-2} &\iff -2y = 3(x - 4) \\ &\iff -2y = 3x - 12 \\ &\iff 3x + 2y - 12 = 0 \end{aligned}$$

即直线的方程是 $3x + 2y - 12 = 0$。

**边 $CA$**：取 $(x_1, y_1) = (2, 3)$、$(x_2, y_2) = (0, 0)$，

$$\frac{y - 3}{0 - 3} = \frac{x - 2}{0 - 2}$$

同样交叉相乘、展开与移项：

$$\begin{aligned} \frac{y - 3}{-3} = \frac{x - 2}{-2} &\iff -2(y - 3) = -3(x - 2) \\ &\iff -2y + 6 = -3x + 6 \\ &\iff 3x - 2y = 0 \end{aligned}$$

即直线的方程是 $3x - 2y = 0$。

三条答案都是一般式。其中 $AB$ 的 $x$ 系数为零（水平线）、$CA$ 的常数项为零（过原点），正好对上 §20.3.2 注记（铅垂线与水平线的一般式）里「三个系数各管一件事」的说法。
````

---

## 20.4　两直线的位置关系 (Position Relations of Two Lines)

> **本节难度上限**：T B ｜ C C ｜ E C+ ｜ Q B-

> 直线已经是方程，两条直线的位置关系就变成两个方程之间的关系。本节把相交、平行、重合三种位置关系与联立方程组的解一一对应，坐标轴本身也是直线，所以直线与两轴的交点是相交的特例，它的坐标有个专门名字，放在 §20.4.2 讲，而平行与垂直的判据正好要用到它。

### 20.4.1　相交与交点

平面上两条直线 $L_1$、$L_2$ 的位置关系有且仅有三种：**相交**（恰有一个公共点）、**平行**（没有公共点）、**重合**（每一个点都是公共点，即 $L_1 = L_2$）。三种位置关系各画一幅。

**相交**：两条直线恰有一个公共点 $P$，如图 20-37A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-2.2,-1.32) -- (2.2,1.32);
  \draw[red!70!black, very thick] (-1.6,1.64) -- (2.4,0.04);
  \node[above right] at (2.2,1.32) {$L_1$};
  \node[below right] at (2.4,0.04) {$L_2$};
  \fill (1,0.6) circle (1.3pt);
  \node[above] at (0.88,0.68) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 20-37A：$L_1$ 与 $L_2$ 相交。
>
> 两条直线恰有一个公共点 $P$。

**平行**：两条直线没有公共点，如图 20-37B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-2.4,-0.6) -- (2.4,1.8);
  \draw[red!70!black, very thick] (-2.4,-2.0) -- (2.4,0.4);
  \node[above left] at (2.4,1.8) {$L_1$};
  \node[above right] at (2.4,0.4) {$L_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-37B：$L_1$ 与 $L_2$ 平行。
>
> 两条直线没有公共点。

**重合**：两条直线是同一个点集，画出来只有一条线，如图 20-37C 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-2.4,-1.0) -- (2.4,1.4);
  \node[above left] at (2.4,1.4) {$L_1 = L_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-37C：$L_1$ 与 $L_2$ 重合。
>
> 图上只有一条直线，因为 $L_1$ 与 $L_2$ 是同一个点集。

设 $L_1 : A_1 x + B_1 y + C_1 = 0$，$L_2 : A_2 x + B_2 y + C_2 = 0$。求两直线的交点，就是找一个点 $Q(x_0, y_0)$ 同时在 $L_1$ 和 $L_2$ 上，即求**同时满足两个方程**的 $(x_0, y_0)$，也就是解联立方程组：

$$\begin{cases} A_1 x + B_1 y + C_1 = 0 \\ A_2 x + B_2 y + C_2 = 0 \end{cases}$$

按 §20.1.2 的定义，$L_1$、$L_2$ 各是一个点集，「同时在两条直线上」就是「同属两个点集」，故交点问题与联立求解是同一件事。

````ad-cor
title: 推论（联立解集即交集） | Corollary（Solution Set is the Intersection）

设 $L_1 : A_1 x + B_1 y + C_1 = 0$，$L_2 : A_2 x + B_2 y + C_2 = 0$。则对任意一点 $Q(x_0, y_0)$，

$$Q \in L_1 \cap L_2 \iff \begin{cases} A_1 x_0 + B_1 y_0 + C_1 = 0 \\ A_2 x_0 + B_2 y_0 + C_2 = 0 \end{cases}$$

两条直线与它们的公共点如图 20-38 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.2,0) -- (3.3,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.8) -- (0,2.5) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.4,-1.44) -- (2.8,1.08);
  \draw[red!70!black, very thick] (-1.6,2.15) -- (3.0,-0.15);
  \node[above left] at (2.8,1.08) {$L_1$};
  \node[above right] at (-1.6,2.15) {$L_2$};
  \draw[dashed] (1.77,0.46) -- (1.77,0);
  \draw[dashed] (1.77,0.46) -- (0,0.46);
  \fill (1.77,0.46) circle (1.3pt) node[above left] {$Q(x_0,y_0)$};
  \node[below] at (1.77,0) {$x_0$};
  \node[left] at (0,0.46) {$y_0$};
\end{tikzpicture}
\end{document}
```

> 图 20-38：公共点 $Q$ 同时满足两个方程。
>
> $Q(x_0, y_0)$ 在 $L_1$ 上也在 $L_2$ 上，虚线足给出它的两个坐标，故 $Q \in L_1 \cap L_2$。
````

````ad-proof
title: 证明 | Proof

设 $L_1 : A_1 x + B_1 y + C_1 = 0$，$L_2 : A_2 x + B_2 y + C_2 = 0$，$Q(x_0, y_0)$ 为平面上任意一点。

把 §20.1.2 的定义与交集的定义各读一遍，整条链就是所要的充要条件：

$$\begin{aligned} Q \in L_1 \cap L_2 &\iff Q \in L_1\ \text{且}\ Q \in L_2 \\ &\iff A_1 x_0 + B_1 y_0 + C_1 = 0\ \text{且}\ A_2 x_0 + B_2 y_0 + C_2 = 0 \end{aligned}$$
````

这条推论把三种位置关系与联立方程组的三种解况焊在一起：方程组有唯一解 $(x_0, y_0)$，就是交集恰含一个点，两直线相交于一点；方程组无解，就是交集为空，两直线平行；方程组有两个不同的解 $Q_1$、$Q_2$ 时，这两点同属 $L_1$ 又同属 $L_2$，由公理（两点连线）与 §20.1.2 的定义得 $L_1 = L_{Q_1Q_2} = L_2$，两直线重合，而整条直线上的点都同时满足两个方程，解也就有无穷多个。三种对应列在下面。

````ad-note
title: 注记（三重对照一览） | Note（The Triple Correspondence）

| 联立方程的解 | 几何位置关系 | 集合关系 |
|---|---|---|
| 唯一解 $(x_0, y_0)$ | 相交于一点 | $L_1 \cap L_2 = \{(x_0, y_0)\}$（单元素集） |
| 无解 | 平行（不相交） | $L_1 \cap L_2 = \varnothing$（空集，两集互斥） |
| 无穷多解 | 重合 | $L_1 \cap L_2 = L_1 = L_2$（$L_1 \subseteq L_2$ 且 $L_2 \subseteq L_1$） |

这张表说的是同一件事的三种语言：**代数**（方程组的解）、**几何**（直线的位置）、**集合**（点集的交集）。往后遇到「两直线的位置关系」，三条路随便挑一条走。
````

````ad-example
title: 示例（相遇问题） | Example（A Meeting Problem）

甲车从原点 $A(0, 0)$ 出发，沿直线 $L_1: y = 60x$ 以速率 $60\text{ km/h}$ 行驶（$x$ 为时间，单位小时，$y$ 为路程）。乙车从 $B(0, 120)$ 出发，沿直线 $L_2: y = -40x + 120$ 以速率 $40\text{ km/h}$ 朝甲车方向行驶。求两车相遇的时间与位置。两条直线与它们的交点 $P$ 如图 20-39 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.5,0) -- (3,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.6) -- (0,2.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (0,0) -- (2.8,2.24);
  \draw[red!70!black, very thick] (0,1.6) -- (2.8,0.2);
  \node[above left] at (2.8,2.24) {$L_1$};
  \node[below left] at (2.8,0.2) {$L_2$};
  \fill (1.2308,0.9846) circle (1.3pt);
  \node[above] at (1.2308,1.15) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 20-39：相遇问题中的两条直线。
>
> $L_1$ 过原点向右上、$L_2$ 从 $y$ 轴上一点向右下，两者交于 $P$；$P$ 的横坐标是相遇时刻，纵坐标是相遇位置。

---

相遇即两车在同一时刻 $x$ 位于同一位置 $y$，即求 $L_1$ 与 $L_2$ 的交点。联立方程：

$$\begin{cases} y = 60x \\ y = -40x + 120 \end{cases}$$

解这个方程组，两边同加 $40x$、再同除以 $100$ 都是等价变形，代回 $L_1$ 的方程即得相遇位置：

$$\begin{aligned} 60x &= -40x + 120 \iff 100x = 120 \iff x = 1.2 \\ y &= 60 \times 1.2 = 72 \end{aligned}$$

两车在出发后 $1.2$ 小时（即 $1$ 小时 $12$ 分）于位置 $y = 72\text{ km}$ 处相遇。方程组有唯一解，对应的位置关系是相交于一点。
````

### 20.4.2　直线与坐标轴的交点：截距 (Intercepts)

坐标轴本身也是直线：$y$ 轴是 $x = 0$，$x$ 轴是 $y = 0$。所以一条直线与坐标轴的交点，就是 §20.4.1 那个联立方程组的解。这两个交点的坐标各有一个专门名字。

````ad-def
title: 定义（$x$ 截距与 $y$ 截距） | Definition（$x$-Intercept and $y$-Intercept）

设 $L$ 为平面上的一条直线。

**$y$ 截距 (y-intercept)**：$L$ 与 $y$ 轴恰有一个公共点 $(0, c)$ 时，$c$ 称为 $L$ 的 $y$ 截距，即

$$L \cap \{\, (0, y) : y \in \mathbb{R} \,\} = \{\, (0, c) \,\}$$

直线 $L$ 与它同 $y$ 轴的唯一交点如图 20-40 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.7,0) -- (3.1,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.9) -- (0,1.3) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.5,-1.4) -- (2.8,0.32);
  \node[above left] at (-1.5,-1.4) {$L$};
  \fill (0,-0.8) circle (1.3pt) node[below right] {$(0,c)$};
\end{tikzpicture}
\end{document}
```

> 图 20-40：$y$ 截距。
>
> $L$ 与 $y$ 轴恰有一个公共点 $(0, c)$，$c$ 就是 $y$ 截距；图中 $c < 0$。

**$x$ 截距 (x-intercept)**：$L$ 与 $x$ 轴恰有一个公共点 $(a, 0)$ 时，$a$ 称为 $L$ 的 $x$ 截距，即

$$L \cap \{\, (x, 0) : x \in \mathbb{R} \,\} = \{\, (a, 0) \,\}$$

直线 $L$ 与它同 $x$ 轴的唯一交点如图 20-41 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.7,0) -- (3.1,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.9) -- (0,1.3) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.5,-1.4) -- (2.8,0.32);
  \node[above left] at (-1.5,-1.4) {$L$};
  \fill (2,0) circle (1.3pt) node[below right] {$(a,0)$};
\end{tikzpicture}
\end{document}
```

> 图 20-41：$x$ 截距。
>
> $L$ 与 $x$ 轴恰有一个公共点 $(a, 0)$，$a$ 就是 $x$ 截距；图中 $a > 0$。
````

````ad-note
title: 注记（截距是坐标，不是距离） | Note（Intercepts Are Coordinates, Not Distances）

$x$ 截距 $a$ 与 $y$ 截距 $c$ 各是一个实数，可正、可负、可为零，符号由交点落在轴上原点的哪一侧决定，不取绝对值。
````

````ad-cor
title: 推论（由一般式读两截距） | Corollary（Both Intercepts from the General Form）

设直线 $L : Ax + By + C = 0$，且 $A \ne 0$、$B \ne 0$。则 $L$ 的 $x$ 截距为 $-\dfrac{C}{A}$、$y$ 截距为 $-\dfrac{C}{B}$。
````

````ad-proof
title: 证明 | Proof

设直线 $L : Ax + By + C = 0$，且 $A \ne 0$、$B \ne 0$。

$y$ 轴就是直线 $x = 0$，由 §20.4.1 的推论（联立解集即交集），公共点的坐标同时满足两个方程；而 $B \ne 0$，两边同除以它是等价变形：

$$\begin{aligned} \begin{cases} Ax + By + C = 0 \\ x = 0 \end{cases} &\iff \begin{cases} By + C = 0 \\ x = 0 \end{cases} \\ &\iff \begin{cases} y = -\dfrac{C}{B} \\ x = 0 \end{cases} \end{aligned}$$

这个方程组有唯一解，故 $L$ 与 $y$ 轴恰有一个公共点 $\left(0, -\dfrac{C}{B}\right)$，按定义（$x$ 截距与 $y$ 截距），$y$ 截距为 $-\dfrac{C}{B}$。

$x$ 轴就是直线 $y = 0$，由 §20.4.1 的推论（联立解集即交集），公共点的坐标同时满足两个方程；而 $A \ne 0$，两边同除以它是等价变形：

$$\begin{aligned} \begin{cases} Ax + By + C = 0 \\ y = 0 \end{cases} &\iff \begin{cases} Ax + C = 0 \\ y = 0 \end{cases} \\ &\iff \begin{cases} x = -\dfrac{C}{A} \\ y = 0 \end{cases} \end{aligned}$$

故 $L$ 与 $x$ 轴恰有一个公共点 $\left(-\dfrac{C}{A},\ 0\right)$，按定义（$x$ 截距与 $y$ 截距），$x$ 截距为 $-\dfrac{C}{A}$。

$L$ 与它在两轴上的交点如图 20-42 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.1,0) -- (3.4,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.1) -- (0,2.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.6,1.95) -- (2.8,-0.6);
  \node[above right] at (2.8,-0.6) {$L$};
  \fill (2,0) circle (1.3pt);
  \node at (2,-0.32) {$-\frac{C}{A}$};
  \fill (0,1.5) circle (1.3pt);
  \node[left] at (0,1.5) {$-\frac{C}{B}$};
\end{tikzpicture}
\end{document}
```

> 图 20-42：由一般式读两截距。
>
> $L$ 与 $x$ 轴交于横坐标 $-\frac{C}{A}$ 的点、与 $y$ 轴交于纵坐标 $-\frac{C}{B}$ 的点，这两个坐标就是两截距。
````

````ad-note
title: 注记（由一般式读两截距） | Note（Reading Both Intercepts off the Coefficients）

把 $L : Ax + By + C = 0$ 的三个系数看一遍，两个截距连同它们不存在的时机就都有了。

- **$y$ 截距**：$B \ne 0$ 时为 $-\dfrac{C}{B}$；$B = 0$ 时 $L$ 是铅垂线，与 $y$ 轴平行或重合，没有 $y$ 截距。

- **$x$ 截距**：$A \ne 0$ 时为 $-\dfrac{C}{A}$；$A = 0$ 时 $L$ 是水平线，与 $x$ 轴平行或重合，没有 $x$ 截距。

$C = 0$ 时两个截距都是 $0$，那是「过原点」，不是「不存在」。
````

§20.3.4 斜截式里的 $c$ 就是这里的 $y$ 截距，§20.3.5 截距式里的 $a$、$b$ 就是这里的 $x$ 截距与 $y$ 截距：那两节只用「直线过轴上那一点」把方程写出来，名字到这里才补上。

````ad-example
title: 示例（由一般式读两截距） | Example（Reading Both Intercepts off the General Form）

就下面每条直线，读出 $y$ 截距与 $x$ 截距；不存在时说明理由。

(a) $L_1 : 3x + 4y - 12 = 0$

(b) $L_2 : 2x + 5 = 0$

(c) $L_3 : x - 3y = 0$

---

**(a)** $A = 3$、$B = 4$、$C = -12$，$A$、$B$ 都不为零，由推论（由一般式读两截距），$y$ 截距 $c$ 与 $x$ 截距 $a$ 分别是

$$\begin{aligned} c &= -\frac{C}{B} = -\frac{-12}{4} = 3, \\ a &= -\frac{C}{A} = -\frac{-12}{3} = 4 \end{aligned}$$

$L_1$ 与它在两轴上的交点如图 20-43 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.9,0) -- (5.4,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.0) -- (0,3.9) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.6,3.45) -- (5.0,-0.75);
  \node[below left] at (5.0,-0.75) {$L_1$};
  \fill (0,3) circle (1.3pt) node[left] {$(0,3)$};
  \fill (4,0) circle (1.3pt) node[above left] {$(4,0)$};
\end{tikzpicture}
\end{document}
```

> 图 20-43：$L_1 : 3x + 4y - 12 = 0$ 的两截距。
>
> $L_1$ 与 $y$ 轴交于 $(0, 3)$、与 $x$ 轴交于 $(4, 0)$，两个交点的坐标就是两截距。

**(b)** $A = 2$、$B = 0$、$C = 5$。$B = 0$，按注记（由一般式读两截距），$L_2$ 是铅垂线 $x = -\dfrac{5}{2}$，与 $y$ 轴平行，没有 $y$ 截距；$A \ne 0$，$x$ 截距为 $-\dfrac{5}{2}$。

**(c)** $A = 1$、$B = -3$、$C = 0$。$A$、$B$ 都不为零，故 $y$ 截距 $c$ 与 $x$ 截距 $a$ 分别是

$$\begin{aligned} c &= -\frac{0}{-3} = 0, \\ a &= -\frac{0}{1} = 0 \end{aligned}$$

$C = 0$ 说的是 $L_3$ 过原点，两个截距都是 $0$，而不是不存在。
````

### 20.4.3　平行与重合

§20.4.1 用的是「有没有公共点」，本节把它换成斜率与截距的语言。两条直线都写成 $y = mx + c$，判定就只是比较两组数。

````ad-thm
title: 定理（平行的斜率判定） | Theorem（Parallel Lines by Slopes）

设 $L_1 : y = m_1 x + c_1$、$L_2 : y = m_2 x + c_2$ 为两条直线。则

$$L_1 \parallel L_2 \iff m_1 = m_2\ \text{且}\ c_1 \ne c_2$$

两条平行线与它们的斜率三角形、$y$ 截距如图 20-44 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2,0) -- (2.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.9) -- (0,2.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.8,-0.28) -- (2.0,2.0);
  \draw[red!70!black, very thick] (-1.8,-1.78) -- (2.0,0.5);
  \node[above left] at (2.0,2.0) {$L_1$};
  \node[above right] at (2.0,0.5) {$L_2$};
  \draw[dashed] (0,0.8) -- (1,0.8);
  \draw[dashed] (1,0.8) -- (1,1.4);
  \draw (0.82,0.8) -- (0.82,0.98) -- (1,0.98);
  \draw[dashed] (0,-0.7) -- (1,-0.7);
  \draw[dashed] (1,-0.7) -- (1,-0.1);
  \draw (0.82,-0.7) -- (0.82,-0.52) -- (1,-0.52);
  \fill (0,0.8) circle (1.3pt);
  \fill (0,-0.7) circle (1.3pt);
  \node[left] at (0,0.8) {$(0,c_1)$};
  \node[left] at (0,-0.7) {$(0,c_2)$};
  \node[right] at (1,1.1) {$m_1$};
  \node[right] at (1,-0.4) {$m_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-44：$L_1 \parallel L_2$。
>
> 两条直线的水平腿同为 $1$、铅垂腿分别长 $m_1$、$m_2$，两三角形同形即 $m_1 = m_2$；$y$ 截距 $(0, c_1)$、$(0, c_2)$ 是 $y$ 轴上两个不同的点。
````

````ad-proof
title: 证明 | Proof

设 $L_1 : y = m_1 x + c_1$、$L_2 : y = m_2 x + c_2$ 为两条直线。

两条直线有无公共点，由一次项系数 $m_1 - m_2$ 就能算出来：任取一点 $Q(x_0, y_0)$，

$$\begin{aligned} Q \in L_1 \cap L_2 &\iff m_1 x_0 + c_1 = y_0\ \text{且}\ y_0 = m_2 x_0 + c_2 \\ &\iff m_1 x_0 + c_1 = m_2 x_0 + c_2 \\ &\iff (m_1 - m_2)x_0 = c_2 - c_1 \end{aligned}$$

**充分性（$m_1 = m_2$ 且 $c_1 \ne c_2$ $\Longrightarrow$ $L_1 \parallel L_2$）：** 设 $m_1 = m_2$ 且 $c_1 \ne c_2$。

此时 $m_1 - m_2 = 0$ 而 $c_2 - c_1 \ne 0$，故

$$\begin{aligned} (m_1 - m_2)x_0 = c_2 - c_1 &\iff 0 \cdot x_0 = c_2 - c_1 \\ &\iff 0 = c_2 - c_1 \end{aligned}$$

而 $c_2 - c_1 \ne 0$，这条等式对任何实数 $x_0$ 都不成立，
故没有任何点同时属于两条直线，$L_1 \cap L_2 = \varnothing$，即 $L_1 \parallel L_2$。

**必要性（$L_1 \parallel L_2$ $\Longrightarrow$ $m_1 = m_2$ 且 $c_1 \ne c_2$）：** 设 $L_1 \cap L_2 = \varnothing$。

若 $m_1 \ne m_2$，则 $m_1 - m_2 \ne 0$，方程 $(m_1 - m_2)x_0 = c_2 - c_1$ 两边同除以 $m_1 - m_2$ 解出唯一的

$$\begin{aligned} x_0 &= \frac{c_2 - c_1}{m_1 - m_2}, \\ y_0 &= m_1 x_0 + c_1 \equiv m_1 \cdot \frac{c_2 - c_1}{m_1 - m_2} + c_1 \equiv \frac{m_1 c_2 - m_2 c_1}{m_1 - m_2} \end{aligned}$$

两条斜率不同的直线必交于一点，如图 20-45 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.4,0) -- (2.9,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,2.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.8,-1.24) -- (2.6,2.28);
  \draw[red!70!black, very thick] (-2.0,2.2) -- (2.8,0.76);
  \node[below right] at (2.6,2.28) {$L_1$};
  \node[below right] at (2.8,0.76) {$L_2$};
  \fill (1.2727,1.2182) circle (1.3pt);
  \node at (1.35,1.55) {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 20-45：$m_1 \ne m_2$ 时两条直线相交。
>
> $m_1 \ne m_2$ 使 $m_1 - m_2 \ne 0$，两条直线交于唯一的点 $Q$，它与 $L_1 \cap L_2 = \varnothing$ 冲突。

这个点 $Q(x_0, y_0)$ 同时满足两个方程，即 $Q \in L_1 \cap L_2$，与 $L_1 \cap L_2 = \varnothing$ 冲突，被否定的正是「$m_1 \ne m_2$」这一临时假设，
故 $m_1 = m_2$。

若还有 $c_1 = c_2$，则 $(m_1 - m_2)x_0 = c_2 - c_1$ 成为 $0 \cdot x_0 = 0$，任何 $x_0$ 都满足它，取 $x_0 = 0$ 并配上 $y_0 = m_1 \cdot 0 + c_1 = c_1$，得 $(0, c_1)$ 同属两条直线，与 $L_1 \cap L_2 = \varnothing$ 冲突，被否定的是「$c_1 = c_2$」这一临时假设，
故 $c_1 \ne c_2$。
````

````ad-thm
title: 定理（重合的判定） | Theorem（Coincident Lines）

设 $L_1 : y = m_1 x + c_1$、$L_2 : y = m_2 x + c_2$ 为两条直线。则

$$L_1 = L_2 \iff m_1 = m_2\ \text{且}\ c_1 = c_2$$

重合时图上只有一条直线，它与 $y$ 轴的交点也只有一个，如图 20-46 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.2,0) -- (2.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.4) -- (0,2.3) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.0,-0.7) -- (2.2,1.82);
  \node[above left] at (2.2,1.82) {$L_1 = L_2$};
  \fill (0,0.5) circle (1.3pt);
  \node[left] at (0,0.5) {$(0,c)$};
\end{tikzpicture}
\end{document}
```

> 图 20-46：$L_1$ 与 $L_2$ 重合。
>
> 两个方程逐字相同，故只画出一条直线；它与 $y$ 轴交于唯一的点 $(0, c)$，即 $c_1 = c_2 = c$。
````

````ad-proof
title: 证明 | Proof

设 $L_1 : y = m_1 x + c_1$、$L_2 : y = m_2 x + c_2$ 为两条直线。

**充分性（$m_1 = m_2$ 且 $c_1 = c_2$ $\Longrightarrow$ $L_1 = L_2$）：** 设 $m_1 = m_2$、$c_1 = c_2$，则对任意一点 $Q(x_0, y_0)$，

$$\begin{aligned} Q \in L_1 &\iff m_1 x_0 + c_1 = y_0 \\ &\iff m_2 x_0 + c_2 = y_0 \iff Q \in L_2 \end{aligned}$$

两个解集互相包含，由第 16 章的外延公理得 $L_1 = L_2$。

**必要性（$L_1 = L_2$ $\Longrightarrow$ $m_1 = m_2$ 且 $c_1 = c_2$）：** 设 $L_1 = L_2$。

点 $(0, c_1)$ 满足 $m_1 \cdot 0 + c_1 = c_1$，故在 $L_1$ 上，也在 $L_2$ 上，代入 $L_2$ 的方程得

$$c_1 = m_2 \cdot 0 + c_2 = c_2$$

点 $(1,\ m_1 + c_1)$ 满足 $m_1 \cdot 1 + c_1 = m_1 + c_1$，故在 $L_1$ 上，也在 $L_2$ 上，代入 $L_2$ 的方程，两边减 $c_1$ 并用 $c_1 = c_2$ 得

$$\begin{aligned} m_1 + c_1 &= m_2 \cdot 1 + c_2 \\ &\iff m_1 = m_2 + c_2 - c_1 = m_2 \end{aligned}$$

用来定出 $c_1 = c_2$ 与 $m_1 = m_2$ 的两个点如图 20-47 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.2,0) -- (2.9,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.6) -- (0,2.2) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.8,-0.52) -- (2.6,1.68);
  \node[above left] at (2.6,1.68) {$L_1 = L_2$};
  \draw[dashed] (1,0.88) -- (1,0);
  \node[below] at (1,0) {$1$};
  \fill (0,0.38) circle (1.3pt) node[below right] {$(0,c_1)$};
  \fill (1,0.88) circle (1.3pt) node[below right] {$(1,m_1 + c_1)$};
\end{tikzpicture}
\end{document}
```

> 图 20-47：重合时用来读出 $c$ 与 $m$ 的两个点。
>
> 横坐标为 $0$ 的点给出 $c_1 = c_2$，横坐标为 $1$ 的点给出 $m_1 = m_2$，虚线足标出它的横坐标 $1$。
````

### 20.4.4　垂直

````ad-thm
title: 定理（垂直的斜率判据） | Theorem（Perpendicular Lines by Slopes）

设 $L_1 : y = m_1 x + c_1$、$L_2 : y = m_2 x + c_2$ 为两条直线。则

$$L_1 \perp L_2 \iff m_1 m_2 = -1$$

两条互相垂直的直线与它们的交点 $O$ 如图 20-48A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-1.6,-1.62) -- (2.4,0.78);
  \draw[red!70!black, very thick] (-1.0,2.3667) -- (1.8,-2.3);
  \draw (0.7887,-0.1868) -- (0.9018,-0.3755) -- (0.7132,-0.4887);
  \node[above left] at (2.4,0.78) {$L_1$};
  \node[above right] at (-1.0,2.3667) {$L_2$};
  \fill (0.6,-0.3) circle (1.3pt);
  \node at (0.72,0.14) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 20-48A：$L_1 \perp L_2$。
>
> 两条直线交于 $O$，在 $O$ 处成直角。
````

````ad-proof
title: 证明 | Proof

设 $L_1 : y = m_1 x + c_1$、$L_2 : y = m_2 x + c_2$ 为两条直线，两者的斜率都存在。

**充分性（$m_1 m_2 = -1$ $\Longrightarrow$ $L_1 \perp L_2$）：** 设 $m_1 m_2 = -1$，则 $m_1$、$m_2$ 异号，故 $m_1 \ne m_2$、$m_1 - m_2 \ne 0$。

联立两个方程求公共点，两边同除以非零的 $m_1 - m_2$ 是等价变形：

$$\begin{aligned} m_1 x + c_1 = m_2 x + c_2 &\iff (m_1 - m_2)x = c_2 - c_1 \\ &\iff x = \frac{c_2 - c_1}{m_1 - m_2} \end{aligned}$$

解唯一，故两直线交于一点，把交点记作 $O(x_*, y_*)$。

在 $L_1$ 上取横坐标为 $x_* + 1$ 的点 $A$、在 $L_2$ 上取横坐标为 $x_* + 1$ 的点 $B$，并记 $H(x_* + 1,\ y_*)$。

$A$、$O$ 都满足 $L_1$ 的方程，$B$、$O$ 都满足 $L_2$ 的方程，两式相减并把括号展开得

$$\begin{aligned} y_A - y_* &= \big(m_1(x_* + 1) + c_1\big) - \big(m_1 x_* + c_1\big) \equiv m_1, \\ y_B - y_* &= \big(m_2(x_* + 1) + c_2\big) - \big(m_2 x_* + c_2\big) \equiv m_2 \end{aligned}$$

即 $A(x_* + 1,\ y_* + m_1)$、$B(x_* + 1,\ y_* + m_2)$，而 $OH$ 水平且长 $1$，$HA$ 与 $HB$ 都铅垂。

这个构造如图 20-48B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-1.6,-1.62) -- (2.4,0.78);
  \draw[red!70!black, very thick] (-1.0,2.3667) -- (1.8,-2.3);
  \draw[dashed] (0.6,-0.3) -- (1.6,-0.3);
  \draw[dashed] (1.6,0.3) -- (1.6,-1.9667);
  \draw (0.7887,-0.1868) -- (0.9018,-0.3755) -- (0.7132,-0.4887);
  \node[above left] at (2.4,0.78) {$L_1$};
  \node[above right] at (-1.0,2.3667) {$L_2$};
  \fill (0.6,-0.3) circle (1.3pt);
  \node at (0.72,0.14) {$O$};
  \fill (1.6,-0.3) circle (1.3pt);
  \node[above right] at (1.6,-0.3) {$H$};
  \fill (1.6,0.3) circle (1.3pt);
  \node[above left] at (1.6,0.3) {$A$};
  \fill (1.6,-1.9667) circle (1.3pt);
  \node[below left] at (1.6,-1.9667) {$B$};
  \node[below] at (1.1,-0.3) {$1$};
  \node[left] at (1.58,0.0) {$m_1$};
  \node[right] at (1.62,-1.13) {$m_2$};
\end{tikzpicture}
\end{document}
```

> 图 20-48B：证明中的构造。
>
> $O$ 是两直线的交点，$A$ 在 $L_1$ 上、$B$ 在 $L_2$ 上，两者的横坐标同为 $x_* + 1$，故 $A$、$H$、$B$ 在同一条铅垂线上（虚线）；水平腿 $OH$ 长 $1$，两条铅垂腿的变化量依次为 $m_1$、$m_2$。

$m_1 \ne m_2$ 给出 $A \ne B$，而 $O$ 的横坐标是 $x_*$，不等于 $A$、$B$ 的横坐标 $x_* + 1$，故 $O$、$A$、$B$ 是一个三角形的三个顶点。

按 §15.2.2 的两点距离公式算出三条边的平方，三角形 $OAB$ 与它的三条边如图 20-48C 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (-1.6,-1.62) -- (2.4,0.78);
  \node[above left] at (2.4,0.78) {$L_1$};
  \node[above right] at (-1.0,2.3667) {$L_2$};
  \draw[red!70!black, very thick] (-1.0,2.3667) -- (1.8,-2.3);
  \draw[dashed] (1.6,0.3) -- (1.6,-1.9667);
  \draw (0.7887,-0.1868) -- (0.9018,-0.3755) -- (0.7132,-0.4887);
  \fill (0.6,-0.3) circle (1.3pt);
  \fill (1.6,0.3) circle (1.3pt);
  \fill (1.6,-1.9667) circle (1.3pt);
  \node at (0.72,0.14) {$O$};
  \node[above left] at (1.6,0.3) {$A$};
  \node[below left] at (1.6,-1.9667) {$B$};
  \node[above left] at (1.35,0.15) {$OA$};
  \node at (0.886,-1.259) {$OB$};
  \node[right] at (1.65,-0.8) {$AB$};
\end{tikzpicture}
\end{document}
```

> 图 20-48C：三角形 $OAB$ 与它的三条边。
>
> 顶点依次是交点 $O$、$L_1$ 上的 $A$ 与 $L_2$ 上的 $B$，边 $AB$ 铅垂（虚线），直角方块标出待证的 $\angle AOB$。

$$\begin{aligned} OA^2 &= 1 + m_1^2, \\ OB^2 &= 1 + m_2^2, \\ AB^2 &= (m_1 - m_2)^2 \end{aligned}$$

于是

$$\begin{aligned} OA^2 + OB^2 - AB^2 &= \big(1 + m_1^2\big) + \big(1 + m_2^2\big) - \big(m_1 - m_2\big)^2 \\ &\equiv 1 + m_1^2 + 1 + m_2^2 - m_1^2 + 2m_1 m_2 - m_2^2 \\ &\equiv 2 + 2m_1 m_2 = 2 + 2(-1) = 0 \end{aligned}$$

即 $OA^2 + OB^2 = AB^2$，由 §8.5 的毕氏定理的逆定理得 $\angle AOB = 90^{\circ}$。

$OA$ 在 $L_1$ 上、$OB$ 在 $L_2$ 上，$\angle AOB$ 正是两直线在交点处所成的角，按 §8.1「角与度量」小节的定义 $L_1 \perp L_2$。

**必要性（$L_1 \perp L_2$ $\Longrightarrow$ $m_1 m_2 = -1$）：** 设 $L_1 \perp L_2$，按 §8.1「角与度量」小节的定义两直线相交成直角，把交点记作 $O(x_*, y_*)$。

若 $m_1 = m_2$，把 $O$ 的坐标代入两个方程相减得 $0 = c_2 - c_1$，两个方程逐字相同，$L_1$ 与 $L_2$ 是同一个点集，不可能交成直角，
故 $m_1 \ne m_2$，两条直线只有一个公共点 $O$。

在 $L_1$ 上取横坐标为 $x_* + 1$ 的点 $A$、在 $L_2$ 上取横坐标为 $x_* + 1$ 的点 $B$，照同样的算法把两式相减得

$$\begin{aligned} y_A - y_* &= m_1, \\ y_B - y_* &= m_2 \end{aligned}$$

即 $A(x_* + 1,\ y_* + m_1)$、$B(x_* + 1,\ y_* + m_2)$，$O$、$A$、$B$ 三点构成三角形，而 $\angle AOB$ 就是两直线在 $O$ 处所成的直角。

直角在 $O$ 处已经由条件给出，三角形 $OAB$ 如图 20-49 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[blue!65!black, very thick] (0.6,-0.3) -- (1.6,0.3);
  \draw[red!70!black, very thick] (0.6,-0.3) -- (1.6,-1.9667);
  \draw[very thick] (1.6,0.3) -- (1.6,-1.9667);
  \fill[blue, opacity=0.18] (0.6,-0.3) -- (0.9001,-0.1198) arc (30.96:-59.04:0.35) -- cycle;
  \fill (0.6,-0.3) circle (1.3pt);
  \fill (1.6,0.3) circle (1.3pt);
  \fill (1.6,-1.9667) circle (1.3pt);
  \node at (0.72,0.14) {$O$};
  \node[above left] at (1.6,0.3) {$A$};
  \node[below left] at (1.6,-1.9667) {$B$};
  \node at (1.04,-0.41) {$90^\circ$};
\end{tikzpicture}
\end{document}
```

> 图 20-49：必要条件里的三角形 $OAB$。
>
> 蓝色扇形标出条件给出的直角 $\angle AOB$，三条边依次是 $OA$、$OB$、$AB$，其中 $AB$ 铅垂。

由 §8.5 的毕氏定理得 $OA^2 + OB^2 = AB^2$，把三条边的平方代进去，展开、合并同类项与两边同除以 $-2$ 都是等价变形：

$$\begin{aligned} \big(1 + m_1^2\big) + \big(1 + m_2^2\big) &= \big(m_1 - m_2\big)^2 \\ &\iff 2 + m_1^2 + m_2^2 = m_1^2 - 2m_1 m_2 + m_2^2 \\ &\iff 2 = -2m_1 m_2 \\ &\iff m_1 m_2 = -1 \end{aligned}$$

$m_1 m_2 = -1$ 与 $L_1 \perp L_2$ 互为充要。
````

````ad-note
title: 注记（铅垂线与水平线） | Note（Vertical and Horizontal Lines）

定理（垂直的斜率判据）要求两条直线的斜率都存在，故它管不到铅垂线。补上这一半：

- **一条铅垂、一条水平时两者垂直**：铅垂线 $x = h$ 的斜率不存在，水平线 $y = k$ 的斜率为 $0$，$m_1 m_2$ 无从算起，但按 §8.1「角与度量」小节的定义它们成直角。

- **两条铅垂线不垂直**：它们的斜率都不存在，位置关系是平行（§20.4.3）。

于是完整的判定是：两条直线的斜率都存在时用 $m_1 m_2 = -1$；其中一条铅垂时，另一条必须是水平线。
````

一般式是本章的主干，位置关系也应能从它的系数直接读出。下面两条结论超出常规课程的要求，作扩展阅读。

````ad-note
title: 注记（一般式下的平行与垂直） | Note（Parallelism and Perpendicularity in General Form）

设 $L_1 : A_1 x + B_1 y + C_1 = 0$、$L_2 : A_2 x + B_2 y + C_2 = 0$，两组系数都不全为零。

- **平行或重合**：$A_1 B_2 = A_2 B_1$。两条直线的斜率都存在时它就是 $m_1 = m_2$；$B_1 = B_2 = 0$ 时它说的是「两条都是铅垂线」，同样平行。

- **垂直**：$A_1 A_2 + B_1 B_2 = 0$。斜率都存在时它就是 $m_1 m_2 = -1$；一条铅垂（$B_1 = 0$、$A_1 \ne 0$）另一条水平（$A_2 = 0$、$B_2 \ne 0$）时等式也成立。

两条都可由 §20.3.2 的推论（由一般式读斜率）读出斜率：$B_1$、$B_2$ 都不为零时，

$$\begin{aligned} m_1 &= -\dfrac{A_1}{B_1}, \\ m_2 &= -\dfrac{A_2}{B_2} \end{aligned}$$

代进斜率判据得

$$\begin{aligned} m_1 = m_2 &\iff -\frac{A_1}{B_1} = -\frac{A_2}{B_2} \iff \frac{A_1}{B_1} = \frac{A_2}{B_2} \iff A_1 B_2 = A_2 B_1, \\ m_1 m_2 = -1 &\iff \frac{A_1 A_2}{B_1 B_2} = -1 \iff A_1 A_2 = -B_1 B_2 \iff A_1 A_2 + B_1 B_2 = 0, \end{aligned}$$

而 $B_1 = B_2 = 0$（两条都是铅垂线）时 $A_1B_2 = A_2B_1$ 仍成立，$B_1 = 0$ 且 $A_2 = 0$（一铅垂一水平）时 $A_1A_2 + B_1B_2 = 0$ 也成立。
````

````ad-example
title: 示例（矩形的对角线） | Example（Diagonals of a Rectangle）

在矩形 $ABCD$ 中，$A(0, 0)$、$B(4, 0)$、$C(4, 3)$、$D(0, 3)$。求两条对角线 $AC$ 与 $BD$ 的斜率，并判断它们是否互相垂直。矩形与它的两条对角线如图 20-50 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.6,0) -- (5,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.6) -- (0,3.8) node[above] {$y$};
  \draw[blue!65!black, very thick] (0,0) -- (4,0) -- (4,3) -- (0,3) -- cycle;
  \draw (0,0) -- (4,3);
  \draw (4,0) -- (0,3);
  \fill (0,0) circle (1.3pt) node[below left] {$A$};
  \fill (4,0) circle (1.3pt) node[below right] {$B$};
  \fill (4,3) circle (1.3pt) node[above right] {$C$};
  \fill (0,3) circle (1.3pt) node[above left] {$D$};
  \node[above] at (1.0,1.0) {$AC$};
  \node[above] at (3.0,1.0) {$BD$};
\end{tikzpicture}
\end{document}
```

> 图 20-50：矩形 $ABCD$ 与它的两条对角线。
>
> 四个顶点依次为 $A(0,0)$、$B(4,0)$、$C(4,3)$、$D(0,3)$，对角线 $AC$、$BD$ 交于矩形内部。

---

对角线 $AC$（从 $A(0,0)$ 到 $C(4,3)$）：

$$m_{AC} = \frac{3 - 0}{4 - 0} = \frac{3}{4}$$

对角线 $BD$（从 $B(4,0)$ 到 $D(0,3)$）：

$$m_{BD} = \frac{3 - 0}{0 - 4} = -\frac{3}{4}$$

斜率之积：

$$m_{AC} \cdot m_{BD} = \frac{3}{4} \times \left(-\frac{3}{4}\right) = -\frac{9}{16} \ne -1$$

由 §20.4.4 的定理（垂直的斜率判据），两条对角线不互相垂直。这与几何上的事实一致：矩形的对角线一般不垂直，只有正方形才垂直。斜率之积给出一条代数判据，不必画图就能下结论。
````

````ad-example
title: 示例（等腰三角形底边上的中线） | Example（Median to the Base of an Isosceles Triangle）

已知 $\triangle ABC$ 的顶点为 $A(1, 3)$、$B(0, 0)$、$C(4, 2)$。验证 $AB = AC$，并用坐标法说明底边 $BC$ 上的中线 $AM$ 垂直于 $BC$。三角形、中线与直角记号如图 20-51 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-0.8,0) -- (4.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.8) -- (0,3.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (0,0) -- (4,2);
  \draw[blue!65!black, very thick] (1,3) -- (2,1);
  \draw (0,0) -- (1,3);
  \draw (1,3) -- (4,2);
  \draw (1.8658,1.2683) -- (2.1341,1.4025) -- (2.2683,1.1342);
  \fill (1,3) circle (1.3pt) node[above] {$A$};
  \fill (0,0) circle (1.3pt) node[below left] {$B$};
  \fill (4,2) circle (1.3pt) node[below right] {$C$};
  \fill (2,1) circle (1.3pt);
  \node[below right] at (2.05,0.92) {$M$};
\end{tikzpicture}
\end{document}
```

> 图 20-51：等腰三角形 $ABC$ 与底边上的中线。
>
> $M$ 是 $BC$ 的中点，中线 $AM$ 与底边 $BC$ 在 $M$ 处成直角。

---

**先验证 $AB = AC$。** 按 §15.2.2 的两点距离公式：

$$\begin{aligned} AB &= \sqrt{(1-0)^2 + (3-0)^2} = \sqrt{10}, \\ AC &= \sqrt{(1-4)^2 + (3-2)^2} = \sqrt{10} \end{aligned}$$

故 $AB = AC$，$\triangle ABC$ 是以 $BC$ 为底边的等腰三角形。

**再求底边的中点 $M$。** 按 §15.2.3 的中点公式：

$$M = \left(\frac{0+4}{2},\ \frac{0+2}{2}\right) = (2, 1)$$

**然后算两条斜率并验它们的积。**

$$\begin{aligned} m_{BC} &= \frac{2-0}{4-0} = \frac{1}{2}, \\ m_{AM} &= \frac{1-3}{2-1} = -2 \end{aligned}$$

$$m_{BC} \cdot m_{AM} = \frac{1}{2} \times (-2) = -1$$

两条直线的斜率都存在且都不为零，由 §20.4.4 的定理（垂直的斜率判据）得 $AM \perp BC$。
````

---

## 20.5　距离 (Distance)

> **本节难度上限**：T B+ ｜ C B ｜ E B ｜ Q B

> 直线既然是一般式，距离也就成了系数的一次代入。本节建立点到直线的距离公式，再用它推出两平行线间的距离。证明的核心是构造一个直角三角形，把同一个面积算两遍。

### 20.5.1　点到直线的距离

````ad-thm
title: 定理（点到直线的距离） | Theorem（Distance from a Point to a Line）

设 $L : Ax + By + C = 0$，其中 $A$、$B$ 不全为零；又设 $P(x_0, y_0)$ 为平面上一点，$d$ 为 $P$ 到 $L$ 的距离，即 $P$ 到 $L$ 的垂线段的长（§8.6「距离的概念」小节）。则

$$d = \frac{\lvert Ax_0 + By_0 + C \rvert}{\sqrt{A^2 + B^2}}$$

点 $P$、直线 $L$ 与垂线段 $d$ 如图 20-52 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.2,0) -- (3.4,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.2) -- (0,2.8) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.8,2.1) -- (3.0,-0.75);
  \node[below right] at (3.0,-0.75) {$L$};
  \draw[dashed] (2.6,1.9) -- (1.472,0.396);
  \draw (1.616,0.288) -- (1.724,0.432) -- (1.58,0.54);
  \fill (2.6,1.9) circle (1.3pt) node[above right] {$P(x_0,y_0)$};
  \fill (1.472,0.396) circle (1.3pt) node[below left] {$H$};
  \node[above left] at (2.036,1.148) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 20-52：点到直线的距离。
>
> $H$ 是 $P$ 在 $L$ 上的垂足，虚线段 $PH$ 的长就是 $d$，直角方块标出 $PH$ 与 $L$ 垂直。
````

````ad-proof
title: 证明（直角三角形面积法） | Proof（Right-Triangle Area Method）

设 $L : Ax + By + C = 0$，$A$、$B$ 不全为零。

又设 $P(x_0, y_0)$ 为平面上一点，$d$ 为 $P$ 到 $L$ 的垂线段的长。

下面先算 $A$、$B$ 都不为零的一般情形，再核对 $A = 0$ 与 $B = 0$ 两条特殊直线。

**$A \ne 0$ 且 $B \ne 0$（斜直线）：** $L$ 既非水平也非铅垂。

过点 $P$ 作水平线 $y = y_0$ 与 $L$ 交于 $Q_1$，作铅垂线 $x = x_0$ 与 $L$ 交于 $Q_2$。把 $y = y_0$ 与 $x = x_0$ 分别代进 $L$ 的方程，解出另一个坐标（$A \ne 0$、$B \ne 0$，故两边同除以它们是等价变形）：

$$\begin{aligned} Ax + B y_0 + C = 0 &\iff Ax = -By_0 - C \iff x = -\frac{By_0 + C}{A}, \\ A x_0 + By + C = 0 &\iff By = -Ax_0 - C \iff y = -\frac{Ax_0 + C}{B} \end{aligned}$$

故

$$\begin{aligned} Q_1 &= \left(-\frac{By_0 + C}{A},\ y_0\right), \\ Q_2 &= \left(x_0,\ -\frac{Ax_0 + C}{B}\right) \end{aligned}$$

$PQ_1$ 水平而 $PQ_2$ 铅垂，故 $\triangle PQ_1Q_2$ 在 $P$ 处是直角三角形。

$P$ 到 $L$ 的垂足落在斜边 $Q_1Q_2$ 上，垂线段的长就是 $d$。

整个构造如图 20-53 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.2,0) -- (3,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.9) -- (0,2.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.75,2.4) -- (2.75,-1.8);
  \node[above right] at (2.75,-1.8) {$L$};
  \draw[dashed] (2.2,1.6) -- (-0.0833,1.6);
  \draw[dashed] (2.2,1.6) -- (2.2,-1.14);
  \draw[dashed] (2.2,1.6) -- (0.8525,0.477);
  \draw (1.98,1.6) -- (1.98,1.38) -- (2.2,1.38);
  \draw (1.0061,0.605) -- (1.1342,0.4464) -- (0.9806,0.3234);
  \fill (2.2,1.6) circle (1.3pt) node[above right] {$P$};
  \fill (-0.0833,1.6) circle (1.3pt);
  \node[below] at (-0.25,1.5) {$Q_1$};
  \fill (2.2,-1.14) circle (1.3pt) node[below left] {$Q_2$};
  \node[above] at (1.0,1.6) {$PQ_1$};
  \node[left] at (2.2,0.23) {$PQ_2$};
  \node[above left] at (1.526,1.039) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 20-53：证明中的直角三角形。
>
> $Q_1$ 是过 $P$ 的水平线与 $L$ 的交点，$Q_2$ 是过 $P$ 的铅垂线与 $L$ 的交点，直角在 $P$；$P$ 到 $L$ 的垂线段（虚线）长 $d$，垂足在 $Q_1Q_2$ 上。

若 $P \in L$，则 $Ax_0 + By_0 + C = 0$，公式两端都是 $0$，等式已成立。

下设 $P \notin L$，此时 $Q_1 \ne Q_2$，$\triangle PQ_1Q_2$ 是真正的直角三角形。

两条直角边的长是

$$\begin{aligned} \lvert PQ_1 \rvert &= \left\lvert x_0 + \frac{By_0 + C}{A} \right\rvert \\ &\equiv \frac{\lvert Ax_0 + By_0 + C \rvert}{\lvert A \rvert} \end{aligned}$$

$$\begin{aligned} \lvert PQ_2 \rvert &= \left\lvert y_0 + \frac{Ax_0 + C}{B} \right\rvert \\ &\equiv \frac{\lvert Ax_0 + By_0 + C \rvert}{\lvert B \rvert} \end{aligned}$$

由 §8.5 的毕氏定理算斜边：

$$\begin{aligned} \lvert Q_1Q_2 \rvert &= \sqrt{\lvert PQ_1 \rvert^2 + \lvert PQ_2 \rvert^2} \\ &= \lvert Ax_0 + By_0 + C \rvert \sqrt{\frac{1}{A^2} + \frac{1}{B^2}} \\ &\equiv \frac{\lvert Ax_0 + By_0 + C \rvert\,\sqrt{A^2 + B^2}}{\lvert AB \rvert} \end{aligned}$$

$d$ 是 $\triangle PQ_1Q_2$ 中以斜边 $Q_1Q_2$（它落在 $L$ 上）为底时的高，故同一个面积有两种算法：

$$\frac{1}{2}\,\lvert PQ_1 \rvert \cdot \lvert PQ_2 \rvert = \frac{1}{2}\,\lvert Q_1Q_2 \rvert \cdot d$$

解出 $d$，把 $\lvert PQ_1 \rvert$、$\lvert PQ_2 \rvert$、$\lvert Q_1Q_2 \rvert$ 的表达式代入：

$$\begin{aligned} d &= \frac{\lvert PQ_1 \rvert \cdot \lvert PQ_2 \rvert}{\lvert Q_1Q_2 \rvert} \\ &= \frac{\dfrac{\lvert Ax_0 + By_0 + C \rvert}{\lvert A \rvert} \cdot \dfrac{\lvert Ax_0 + By_0 + C \rvert}{\lvert B \rvert}}{\dfrac{\lvert Ax_0 + By_0 + C \rvert\,\sqrt{A^2 + B^2}}{\lvert AB \rvert}} \\ &\equiv \frac{\lvert Ax_0 + By_0 + C \rvert}{\sqrt{A^2 + B^2}} \end{aligned}$$

**$A = 0$ 或 $B = 0$（水平线与铅垂线）：** 距离就是两个坐标之差。

$A = 0$ 时 $B \ne 0$，$L$ 是水平线 $y = -\dfrac{C}{B}$，垂足 $H$ 与 $P$ 的横坐标相同，如图 20-54A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.2,0) -- (2.6,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.2) -- (0,2.2) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.0,0.4) -- (2.4,0.4);
  \node[above right] at (2.4,0.4) {$L$};
  \draw[dashed] (0.9,1.8) -- (0.9,0.4);
  \draw (0.72,0.4) -- (0.72,0.58) -- (0.9,0.58);
  \fill (0.9,1.8) circle (1.3pt) node[above right] {$P$};
  \fill (0.9,0.4) circle (1.3pt) node[below right] {$H$};
  \node[right] at (0.9,1.1) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 20-54A：$A = 0$，即水平线。
>
> $L$ 是水平线，垂足 $H$ 在 $P$ 正下方，$d$ 是两个纵坐标之差。

此时 $A = 0$，公式的右端直接化成垂线段的长：

$$\begin{aligned} \frac{\lvert Ax_0 + By_0 + C \rvert}{\sqrt{A^2 + B^2}} &= \frac{\lvert By_0 + C \rvert}{\lvert B \rvert} \equiv \left\lvert y_0 + \frac{C}{B} \right\rvert \\ &= d, \end{aligned}$$

公式与按定义算出的距离是同一个数。

$B = 0$ 时 $A \ne 0$，$L$ 是铅垂线 $x = -\dfrac{C}{A}$，垂足 $H$ 与 $P$ 的纵坐标相同，如图 20-54B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-1.4,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.8) -- (0,1.8) node[above] {$y$};
  \draw[blue!65!black, very thick] (0.4,-1.5) -- (0.4,1.5);
  \node[above right] at (0.4,1.5) {$L$};
  \draw[dashed] (2.0,0.7) -- (0.4,0.7);
  \draw (0.4,0.52) -- (0.58,0.52) -- (0.58,0.7);
  \fill (2.0,0.7) circle (1.3pt) node[above right] {$P$};
  \fill (0.4,0.7) circle (1.3pt) node[above left] {$H$};
  \node[above] at (1.2,0.7) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 20-54B：$B = 0$，即铅垂线。
>
> $L$ 是铅垂线，垂足 $H$ 在 $P$ 正左方，$d$ 是两个横坐标之差。

此时 $B = 0$，同样把公式的右端直接算出来：

$$\begin{aligned} \frac{\lvert Ax_0 + By_0 + C \rvert}{\sqrt{A^2 + B^2}} &= \frac{\lvert Ax_0 + C \rvert}{\lvert A \rvert} \equiv \left\lvert x_0 + \frac{C}{A} \right\rvert \\ &= d, \end{aligned}$$

又是同一个数。

$A$、$B$ 都不为零、$A = 0$、$B = 0$ 三种情况合起来，公式对一切 $A$、$B$ 不全为零的直线都成立。
````

````ad-example
title: 示例（三直线围成的三角形面积） | Example（Area of the Triangle Bounded by Three Lines）

求三条直线 $L_1: x = 0$（$y$ 轴）、$L_2: y = 0$（$x$ 轴）、$L_3: 2x + 3y - 6 = 0$ 所围成三角形的面积。三条直线与它们围出的三角形如图 20-55 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \fill[blue, opacity=0.18] (0,0) -- (3,0) -- (0,2) -- cycle;
  \draw[gray!60, ->] (-0.8,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-0.8) -- (0,3.2) node[above] {$y$};
  \draw[blue!65!black, very thick] (-0.3,2.2) -- (3.8,-0.5333);
  \node[above right] at (3.5,-0.3333) {$L_3$};
  \fill (0,0) circle (1.3pt) node[below left] {$A$};
  \fill (3,0) circle (1.3pt);
  \node[below] at (3,-0.12) {$B$};
  \fill (0,2) circle (1.3pt) node[above right] {$C$};
\end{tikzpicture}
\end{document}
```

> 图 20-55：三条直线围成的三角形。
>
> $L_1$ 是 $y$ 轴、$L_2$ 是 $x$ 轴、$L_3$ 是斜边所在直线，三个顶点依次为 $A(0,0)$、$B(3,0)$、$C(0,2)$，阴影部分就是所求的三角形。

---

**先求三个顶点（两两交点）：**

- $L_1 \cap L_2$：$\begin{cases} x=0 \\ y=0 \end{cases}$，得 $A(0, 0)$
- $L_2 \cap L_3$：把 $y = 0$ 代入 $2x + 3y - 6 = 0$ 得 $2x - 6 = 0$，即 $x = 3$，故 $B(3, 0)$
- $L_1 \cap L_3$：把 $x = 0$ 代入 $2x + 3y - 6 = 0$ 得 $3y - 6 = 0$，即 $y = 2$，故 $C(0, 2)$

**再算面积：** $\triangle ABC$ 以 $AB$（在 $x$ 轴上，长 $3$）为底，$C$ 到 $x$ 轴的距离（即 $C$ 的纵坐标）$= 2$ 为高：

$$\text{面积} = \frac{1}{2} \times 3 \times 2 = 3$$

也可用 §20.5.1 的定理（点到直线的距离）复核高：$C(0,2)$ 到 $L_2 : y = 0$（即 $0 \cdot x + 1 \cdot y + 0 = 0$）的距离为 $d = \dfrac{\lvert 1 \cdot 2 \rvert}{\sqrt{1}} = 2$ ✓。
````

````ad-example
title: 示例（点在直线的哪一侧） | Example（Which Side of a Line a Point Lies On）

判定点 $P(1, 2)$ 在直线 $L: 3x + 4y - 10 = 0$ 的哪一侧。直线、$P$ 与原点 $O$ 如图 20-56 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \fill[blue, opacity=0.18] (-1.2,3.4) -- (3.5,3.4) -- (3.5,-0.125) -- cycle;
  \fill[red, opacity=0.18] (-1.2,3.4) -- (-1.4,3.4) -- (-1.4,-1.1) -- (3.5,-1.1) -- (3.5,-0.125) -- cycle;
  \draw[gray!60, ->] (-1.6,0) -- (3.9,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-1.3) -- (0,3.7) node[above] {$y$};
  \draw[blue!65!black, very thick] (-1.2,3.4) -- (3.5,-0.125);
  \node[above right] at (2.6,0.55) {$L$};
  \fill (1,2) circle (1.3pt) node[above right] {$P(1,2)$};
  \fill (0,0) circle (1.3pt) node[below left] {$O$};
  \node at (2.3,2.5) {$>0$};
  \node at (0.5,-0.55) {$<0$};
\end{tikzpicture}
\end{document}
```

> 图 20-56：直线把平面分成两侧。
>
> 蓝色一侧代入 $3x + 4y - 10$ 得正值，红色一侧得负值；$P(1,2)$ 在蓝色一侧，原点 $O$ 在红色一侧。

---

代入 $Ax_0 + By_0 + C$：

$$3(1) + 4(2) - 10 = 3 + 8 - 10 = 1 > 0$$

作为对照，原点 $O(0,0)$ 代入得 $3(0) + 4(0) - 10 = -10 < 0$。

直线 $L$ 把平面分成两部分：使 $Ax + By + C > 0$ 的一侧与使 $Ax + By + C < 0$ 的一侧。由 $3(1) + 4(2) - 10 = 1 > 0$ 与 $3(0) + 4(0) - 10 = -10 < 0$ 异号，故 $P$ 与 $O$ 在 $L$ 的两侧，$P$ 在 $3x + 4y - 10 > 0$ 的那一侧。
````

### 20.5.2　两平行线间的距离

````ad-thm
title: 定理（两平行线间的距离） | Theorem（Distance Between Two Parallel Lines）

设两平行线

$$\begin{aligned} L_1 &: Ax + By + C_1 = 0, \\ L_2 &: Ax + By + C_2 = 0 \end{aligned}$$

其中 $A$、$B$ 不全为零且 $C_1 \ne C_2$。则 $L_1$ 与 $L_2$ 之间的距离为

$$d = \frac{\lvert C_1 - C_2 \rvert}{\sqrt{A^2 + B^2}}$$

两条平行线与它们之间的一条垂线段如图 20-57 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.8,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.8) -- (0,2.3) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-0.94) -- (2.4,1.94);
  \draw[blue!65!black, very thick] (-2.4,-2.64) -- (2.4,0.24);
  \node[above left] at (2.4,1.94) {$L_1$};
  \node[below right] at (2.4,0.24) {$L_2$};
  \draw[very thick] (0,0.5) -- (0.75,-0.75);
  \draw (0.6368,-0.5613) -- (0.8255,-0.4481) -- (0.9387,-0.6368);
  \fill (0,0.5) circle (1.3pt) node[above left] {$P$};
  \node[above right] at (0.375,-0.125) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 20-57：两平行线间的距离。
>
> 在 $L_1$ 上取一点 $P$，它到 $L_2$ 的垂线段长 $d$；按 §8.6 的定理（平行线间距离处处相等），$P$ 取在哪里都一样。
````

````ad-proof
title: 证明 | Proof

设 $L_1 : Ax + By + C_1 = 0$、$L_2 : Ax + By + C_2 = 0$，其中 $A$、$B$ 不全为零且 $C_1 \ne C_2$。

在 $L_1$ 上任取一点 $P(x_0, y_0)$，则 $Ax_0 + By_0 + C_1 = 0$，即 $Ax_0 + By_0 = -C_1$。

$L_1$ 上任取的一点 $P$ 与它到 $L_2$ 的垂线段如图 20-58 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-2.8,0) -- (2.8,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.5) -- (0,2.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-2.4,-0.34) -- (2.4,2.06);
  \draw[blue!65!black, very thick] (-2.4,-2.04) -- (2.4,0.36);
  \node[above left] at (2.4,2.06) {$L_1$};
  \node[below right] at (2.4,0.36) {$L_2$};
  \draw[very thick] (-1,0.36) -- (-0.32,-1.0);
  \draw (-0.141,-0.911) -- (-0.23,-0.732) -- (-0.409,-0.821);
  \fill (-1,0.36) circle (1.3pt) node[above left] {$P(x_0,y_0)$};
  \node[right] at (-0.6,-0.3) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 20-58：$P$ 到 $L_2$ 的垂线段。
>
> $P$ 是 $L_1$ 上任取的一点，粗线段的长就是 $d$，直角方块标出它与 $L_2$ 垂直。

由 §8.6「距离的概念」小节的定义（平行线之间的距离）与定理（平行线间距离处处相等），$P$ 到 $L_2$ 的距离就是 $L_1$ 与 $L_2$ 之间的距离，且与 $P$ 的取法无关。
由 §20.5.1 的定理（点到直线的距离），

$$\begin{aligned} d &= \frac{\lvert Ax_0 + By_0 + C_2 \rvert}{\sqrt{A^2 + B^2}} \\ &= \frac{\lvert -C_1 + C_2 \rvert}{\sqrt{A^2 + B^2}} \\ &\equiv \frac{\lvert C_1 - C_2 \rvert}{\sqrt{A^2 + B^2}} \end{aligned}$$

等式链的末端 $\dfrac{\lvert C_1 - C_2 \rvert}{\sqrt{A^2 + B^2}}$ 里没有 $x_0$、$y_0$，故 $d$ 与 $P$ 在 $L_1$ 上取在哪里无关，正是 §8.6 的定理（平行线间距离处处相等）所说的那件事。
````

用这条公式前，需先把两条直线化为 $A$、$B$ 系数相同的一般式：若两个方程的系数成比例，先约简到相同（§20.3.6 的注记（一般式的不唯一性））。

````ad-example
title: 示例（求平行线间的距离） | Example（Distance Between Two Parallel Lines）

求两平行线 $L_1: 2x + 3y - 6 = 0$ 与 $L_2: 4x + 6y + 3 = 0$ 间的距离。

---

$L_2$ 的系数是 $L_1$ 的 $2$ 倍，先把 $L_2$ 约简：$2x + 3y + \dfrac{3}{2} = 0$。

现在 $A = 2$，$B = 3$，$C_1 = -6$，$C_2 = \dfrac{3}{2}$。

$$\begin{aligned} d &= \frac{\left\lvert -6 - \dfrac{3}{2} \right\rvert}{\sqrt{2^2 + 3^2}} = \frac{\dfrac{15}{2}}{\sqrt{13}} \\ &= \frac{15\sqrt{13}}{26} \end{aligned}$$
````

---

## 20.6　小结 (Summary)

### 一条主干与四条支线

1. **主干：直线就是一般式的解集**（§20.1.2、§20.3.1、§20.3.2）。直线 $AB$ 在 §20.1.2 定义为与 $A$、$B$ 共线的所有点组成的集合 $L_{AB}$；「共线」在 §20.3.1 由两条引理翻译成可检验的条件（距离刻画、坐标判据），坐标判据的证明先把共线换成「三式中至少一式取等号」，再对四个坐标差做展开与代入；斜率判定只是坐标判据两边同乘非零因子的推论，坐标判据展开即推论（过两点的直线方程），两个方向就此焊死：$S$ 是一条直线 $\iff$ 存在实数 $A$、$B$、$C$（$A$、$B$ 不全为零），使 $S$ 是 $Ax + By + C = 0$ 的解集；§20.3.2 把这类方程命名为一般式。
2. **斜率是把直线写成方程的工具**（§20.2）。它的定义在 §15.2.6，本章补了此前只是断言的一条性质：斜率与取点无关（相似三角形）。三点共线的斜率判定不在 §20.2 证，而是 §20.3.1 坐标判据的推论：它管不到铅垂线，那个缺口正由坐标判据补上。§20.3.1 再由它得到定理（直线的斜率刻画）：直线上一点连同斜率就把这条直线完全定下来，点斜式正是这一说法的展开。
3. **其余形式都是改写，也是求方程的常规走法**（§20.3.3 至 §20.3.6）。点斜式、两点式、斜截式、截距式各对应一种已知条件，一律能化为一般式；反过来，$B = 0$ 时化不回斜截式与截距式，$A = 0$ 或 $C = 0$ 时化不回截距式。§20.3.1 的推论（过两点的直线方程）是主干的理论枢纽，三个系数都不好转，求方程不走它。
4. **位置关系与距离都从系数读出**（§20.4、§20.5）。相交、平行、重合分别对应联立方程组的唯一解、无解、无穷多解，也就是交集为单元素集、空集、两条直线相等；坐标轴也是直线，直线与两轴的交点坐标就是两个截距（§20.4.2）；垂直的判据是 $m_1 m_2 = -1$；点到直线的距离与两平行线间的距离各有一条公式。

### 方程形式总表

| 形式 | 方程 | 已知条件 | 化为一般式 |
|------|------|---------|-----------|
| 一般式 | $Ax + By + C = 0$ | 无，任何直线都写得成 | 本身 |
| 点斜式 | $y - y_1 = m(x - x_1)$ | 一点与斜率 | $mx - y + (y_1 - mx_1) = 0$ |
| 两点式 | $\dfrac{y - y_1}{y_2 - y_1} = \dfrac{x - x_1}{x_2 - x_1}$ | 两点 | 交叉相乘后展开移项 |
| 斜截式 | $y = mx + c$ | 斜率与 $y$ 轴交点的纵坐标 | $mx - y + c = 0$ |
| 截距式 | $\dfrac{x}{a} + \dfrac{y}{b} = 1$ | 两轴交点的坐标 | $bx + ay - ab = 0$ |

### 位置关系总表

| 位置关系 | 联立方程的解 | 集合关系 | 斜率条件（斜率都存在时） | 一般式条件 |
|---|---|---|---|---|
| 相交于一点 | 唯一解 | $L_1 \cap L_2 = \{P\}$ | $m_1 \ne m_2$ | $A_1 B_2 \ne A_2 B_1$ |
| 平行 | 无解 | $L_1 \cap L_2 = \varnothing$ | $m_1 = m_2$ 且 $c_1 \ne c_2$ | $A_1 B_2 = A_2 B_1$ 且两式不成比例 |
| 重合 | 无穷多解 | $L_1 = L_2$ | $m_1 = m_2$ 且 $c_1 = c_2$ | 两式成比例 |
| 垂直（相交的特例） | 唯一解 | $L_1 \cap L_2 = \{P\}$ | $m_1 m_2 = -1$ | $A_1 A_2 + B_1 B_2 = 0$ |

表中最后一列属扩展阅读，出处是 §20.4.4 的注记（一般式下的平行与垂直）。

### 双视角

- **方程视角**：直线 $=$ 方程 $Ax + By + C = 0$；交点 $=$ 联立方程的解。
- **集合视角**：直线 $=$ 点集 $\{(x,y) \in \mathbb{R}^2 : Ax+By+C=0\}$；交点 $=$ 交集 $L_1 \cap L_2$。

### 延后内容

倾斜角 $\alpha$ 与 $m = \tan\alpha$ 的定义 §15.2.6 已经给出，但钝角的正切要到第 26 章三角函数才有定义，故本章一切推论只用两点坐标式的斜率；倾斜角的完整讨论留待**解析几何(II)**。

---

## 中英对照词汇表（Glossary）

| 中文术语 | 英文 | 符号或简写 | 备注 |
|------|------|------|------|
| 代数约束 | algebraic constraint |  | 对图形上点的坐标所施加的条件，§20.1.1 |
| 几何图形的方程 | equation of a geometric figure | $G : P(x, y)$ | 集合论表述见 §20.1.2 |
| 水平变化 | horizontal change | $\Delta x$ | $\Delta x = x_2 - x_1$ |
| 铅垂变化 | vertical change | $\Delta y$ | $\Delta y = y_2 - y_1$ |
| 斜率 | slope / gradient | $m$、$m_{AB}$ | 定义见 §15.2.6，§20.2.1 回指并补定理（斜率与取点无关） |
| 倾斜角 | angle of inclination | $\alpha$ | $m = \tan\alpha$，完整讨论留待解析几何(II) |
| 三点共线 | collinearity of three points |  | 五种说法的对照见 §20.3.1 末的注记 |
| 共线 | collinear |  | §20.1.2 的定义：$P$ 落在 $A$、$B$ 所确定的直线上 |
| 直线（平面上的） | straight line in the plane | $L_{AB}$ | §20.1.2 定义为与 $A$、$B$ 共线的所有点组成的集合；坐标刻画见 §20.3.1 |
| 一般式 | general form | $Ax + By + C = 0$ | $A$、$B$ 不全为零；与直线互为充要见 §20.3.1 |
| $y$ 截距 | y-intercept | $c$ | 直线与 $y$ 轴唯一交点的纵坐标，定义见 §20.4.2 |
| $x$ 截距 | x-intercept | $a$ | 直线与 $x$ 轴唯一交点的横坐标，定义见 §20.4.2 |
| 点斜式 | point-slope form | $y - y_1 = m(x - x_1)$ | 已知一点与斜率；由 §20.3.1 的定理（直线的斜率刻画）展开 |
| 两点式 | two-point form | $\dfrac{y - y_1}{y_2 - y_1} = \dfrac{x - x_1}{x_2 - x_1}$ | 已知两点；两种退化见 §20.3.3 的注记 |
| 斜截式 | slope-intercept form | $y = mx + c$ | 已知斜率与 $y$ 轴交点的纵坐标（§20.4.2 称为 $y$ 截距）；对应 §19.3.2 的 $f(x) = kx + b$ |
| 截距式 | intercept form | $\dfrac{x}{a} + \dfrac{y}{b} = 1$ | 已知两轴交点的坐标（§20.4.2 称为两截距），要求 $a \ne 0$ 且 $b \ne 0$ |
| 联立方程 | simultaneous equations |  | 求交点的代数方法 |
| 交点 | point of intersection | $L_1 \cap L_2$ | 联立解集即交集，见 §20.4.1 |
| 相交 | intersect |  | $L_1 \cap L_2$ 为单元素集 |
| 平行 | parallel | $L_1 \parallel L_2$ | $L_1 \cap L_2 = \varnothing$ |
| 重合 | coincide | $L_1 = L_2$ | 由第 16 章的外延公理判定 |
| 垂直 | perpendicular | $L_1 \perp L_2$ | 定义见 §8.1「角与度量」小节，坐标判据见 §20.4.4 |
| 点到直线的距离 | distance from a point to a line | $d$ | $\dfrac{\lvert Ax_0 + By_0 + C \rvert}{\sqrt{A^2 + B^2}}$，见 §20.5.1 |
| 平行线间的距离 | distance between parallel lines | $d$ | $\dfrac{\lvert C_1 - C_2 \rvert}{\sqrt{A^2 + B^2}}$，两式 $A$、$B$ 须先化同，见 §20.5.2 |
| 双视角 | dual perspective |  | 方程视角与集合视角，见 §20.6 |

---

## 备课提示（Teaching Notes）

* **主干是一句话**：全章的核心是「平面上的直线恰好就是二元一次方程 $Ax + By + C = 0$（$A$、$B$ 不全为零）的解集」。两个方向都由 §20.3.1 的两条引理与推论（过两点的直线方程）承担。课堂宜先把这句话写在黑板一角，讲完 §20.3.2 再回来逐字对照，其余各节都挂在它下面。
* **§20.1 备语言，并就地定义直线**：本节回顾第 15 章「方程 $=$ 代数约束」，用第 16 章的描述法把几何图形写成点集，建立记号约定 $L : \ldots$，节末再用同一套语言给出定义（平面上的直线）$L_{AB}=\{P:P\text{ 与 }A、B\text{ 共线}\}$。这条定义只用 §8.1 的共线直观与公理（两点连线），不用坐标也不用斜率，所以 §20.2 讨论斜率时不必再靠「沿用直观」过日子，三点共线也有了正式说法；「点落在直线上」的坐标验算仍留到 §20.3.1。集合论表述与这条点集定义都属【完全超纲】（对照文件 Ch20 §20.1 行），习题册侧的裁定照旧：这类表述不命题，§20.1 的题目只考描述法与代入检验。
* **斜率不再重下定义**：§20.2.1 回指 §15.2.6，只补一件 Ch15 没有做的事，即「斜率与取点无关」的相似三角形证明（此前是断言）。三点共线的斜率判定已下移为 §20.3.1 坐标判据的推论，证法是两边同乘或同除非零的 $(x_2-x_1)(x_3-x_1)$，§20.2 不再承担它。能力一般的班级可以只讲「换两点算出来一样」并让学生验几个例子，能力强的班级走完整相似论证。
* **倾斜角的口径**：§15.2.6 已给定义（倾角）与 $m = \tan\alpha$，但钝角的正切要到第 26 章才有定义，属 Ch15 侧的术语前置，已登记待整改。本章一律不调用 $\tan$，只用两点坐标式。学生若问「为什么不用 $\tan$」，答「钝角的正切还没定义」即可，不宜展开。
* **两条引理为什么放在 §20.3.1**：直线的点集定义在 §20.1.2，但「共线」在那里还是直观说法；三点共线的两条引理是「直线 $\to$ 方程」这一步的全部工具，故与一般式同住 §20.3.1 与 §20.3.2。坐标判据的证明以距离刻画为桥：先把「共线」换成「三式中至少一式取等号」，再把三个距离的平方逐个代入那三式、平方消根，各自化成「判据＋符号条件」的等价式，全程不除以可能为零的量，铅垂线与两点重合都不用另证。两条引理因此要同讲；板书可只写三条平方等价式与充分、必要两段，距离刻画的三式让学生自己验算。斜率判定如今是坐标判据的推论，讲完坐标判据后一句话带过即可。**定理（直线的斜率刻画）**紧接斜率判定讲：它说的是「直线上一点连同斜率就把这条直线定死」，证明只是在 $L$ 上另取一点 $P_2$、由公理（两点连线）认出 $L = L_{P_1P_2}$，再把坐标判据两边同除非零的横坐标差，一条等价链到底；§20.3.3 的点斜式直接引它，不再另证，也不作「延长铅垂线求交点」那类本章还没工具的构造。节末的注记（五种说法的对照）把几何、距离、坐标、斜率、点斜五种说法与展开后的方程并排列出，是这一节的收束，宜留足时间对读；此后判断一个点在不在一条直线上，一律走坐标说法。
* **一般式是主干，却不是求方程的工具**：先有 §20.3.2 的一般式，点斜式、两点式、斜截式、截距式才都是它的改写；四种形式的推导一律由一般式或其推论出发，不再各证一遍。但由已知条件求方程不要走 §20.3.1 的推论（过两点的直线方程）：那条公式的三个系数都要先算一遍再展开，难记，它的用处是把「是一条直线」与「是一个二元一次方程的解集」焊成互为充要，课堂上当理论枢纽讲一句即可。求方程一律走两点式或点斜式，两种退化（横坐标相同、纵坐标相同）直接写出 $x = x_1$、$y = y_1$。§20.3.2 只读斜率与「某点在不在直线上」，两截距的读法在 §20.4.2，求方程的示例集中在 §20.3.3 至 §20.3.6，每个示例末句一律落到「即直线的方程是 …」。§20.3.6 的表是复习用的总表，可留到章末再发。「一般式与直线互为充要」2026-09-26 第三轮由定理降为推论、2026-09-27 第四轮整块删除：两个方向正是 §20.3.1 引理与推论（过两点的直线方程）的内容，讲到一般式时回指一句即可，不必另立板块重证。
* **由一般式读斜率与截距属课程要求**：必修 10.1 明列「须由方程描述斜率、与两轴的截距、某点是否在直线上」，本章分两处承担：§20.3.2 的推论（由一般式读斜率）与其后的注记（从系数读几何信息）管斜率与「某点在不在直线上」，§20.4.2 的定义（$x$ 截距与 $y$ 截距）、推论（由一般式读两截距）与注记（由一般式读两截距）管两截距，务必都讲到；截距之所以住在 §20.4.2，是因为它以「直线与坐标轴的交点」立定义，而交点要到 §20.4.1 才教；同节的注记（铅垂线与水平线的一般式）交代 $A = 0$、$B = 0$、$C = 0$ 各给哪一类直线，学生问「铅垂线怎么写」时直接翻它。
* **截距是坐标，不是距离**：定义（§20.4.2）以「恰有一个公共点」立界：与轴平行时无公共点，与轴重合时公共点不唯一，都没有截距；从系数读存在性与数值见 §20.4.2 的注记（由一般式读两截距），「截距是一个坐标，不是一段距离」另立注记。学生把截距答成正数、或说铅垂线「截距为 0」时，一律翻回定义与这两个注记。
* **斜截式与截距式用「过点」语言陈述**：这两节住在 §20.3，而截距的定义在 §20.4.2（截距以「直线与坐标轴的交点」立定义，交点要到 §20.4.1 才教），故两条定理的陈述一律写成「$L$ 为斜率是 $m$ 且过点 $(0, c)$ 的直线」「$L$ 为过 $A(a, 0)$ 与 $B(0, b)$ 的直线」，不出现「截距」二字，证明也因此少一步（不必先由定义推出「$L$ 过 $(0, c)$」）；两节导语各交代一句「名字到 §20.4.2 才补上」，§20.4.2 末再回指一次。学生问「为什么这里不叫截距」，答「交点还没讲」即可。§20.3.6 与 §20.6 两处总表的「已知条件」栏同口径写「斜率与 $y$ 轴交点的纵坐标」「两轴交点的坐标」；示例题干也照此措辞（「过点 $(0, 4)$」「过 $x$ 轴上一点 $A(4, 0)$ 与 $y$ 轴上一点 $B(0, -2)$」），不用「$y$ 截距为 $4$」「$x$ 截距为 $4$」。
* **恒等号与多行排版的口径**：本章的代数变形一律多行 `aligned`、一步一行；表达式的恒等变形（展开、合并同类项、通分、约分）用 $\equiv$，方程之间的等价变形用 $\iff$，代入求值与假设下的条件等式用 $=$。板书照讲义的分行写，学生才看得出哪一步是恒等变形、哪一步是等价变形；把三步链条写成一行的旧板书习惯要改。
* **等价链就是双向证明**：本章凡能一条 $\iff$ 链走到底的双向结论（三点共线的斜率判定、直线的斜率刻画、过两点的直线方程、点斜式、两点式、斜截式、截距式、联立解集即交集），证明只写这条链，链前一句交代每步为何等价（分母非零、同乘非零因子、展开移项），链后不再补「充分性」「必要性」两段复述；只有两方向路线确实不同的（距离刻画的反证与中间点三分、坐标判据的三条平方等价式与开平方定符号、平行与重合的反证、垂直的毕氏定理逆定理）才分段。$x = x_1$ 一类使斜率无定义的退化按条件分两情形，每情形各自给出一条等价链，仍不写方向段。板书画链时逐步换行，学生才看得出双向都成立。
* **垂直判据本轮补了初等证明**：§20.4.4 用两点距离公式（§15.2.2）与毕氏定理的逆定理（§8.5）证 $m_1 m_2 = -1$，不用三角函数，全程在本章工具之内。Ch15 §15.2.7 原写「将在第 21 章直线方程中给出」（章号错）已改正并删去推诿句。习题册 Ch20 题 58 原以「补全初等证明」作黑框理由，现与讲义同法，该题的框色与难度判定需复核。2026-09-26 第三轮把这条证明改为多行排版并补出中间展开步骤（$OA^2 + OB^2 - AB^2$ 逐行化到 $2 + 2m_1m_2$ 再代入 $m_1m_2 = -1$），构造图移入构造句之下，另增三角形 $OAB$ 与必要性两幅配图；反证段落按 4.4 体例点名冲突的两条陈述并说明被否定的是临时假设。
* **一般式下的平行与垂直判据属增润**：§20.4.4 末的注记给出 $A_1 B_2 = A_2 B_1$ 与 $A_1 A_2 + B_1 B_2 = 0$，正文已自标「超出常规课程的要求，作扩展阅读」，只述结论不给证明。课堂可按学生能力取舍，不进入统一测验范围。
* **跨课题例题**：§20.4.1 相遇问题（Ch7 速率）、§20.4.4 矩形对角线（Ch8 矩形）与等腰三角形中线（Ch8 等腰三角形的性质）、§20.5.1 三直线围三角形面积（Ch15 面积）与点在直线哪一侧（Ch11 不等式，并为 Ch28 半平面铺路）。这些例题既复习旧知又巩固新知，建议在教学中充分利用。
* **联立方程的几何意义**：§20.4.1 的推论（联立解集即交集）与其后的注记（三重对照一览）是本章第二个重点。讲清「解 $(x_0, y_0)$ ＝ 同时在两条直线上的点 ＝ 交点 ＝ 交集 $L_1 \cap L_2$ 的元素」。第 16 章的外延公理在 §20.4.3 定理（重合的判定）中再次出现，可呼应复习。
* **距离公式的直角三角形面积法**：§20.5.1 的证明思路是「过点 $P$ 作水平线与铅垂线交 $L$ 于 $Q_1$、$Q_2$，构造直角三角形 $\triangle PQ_1Q_2$，把同一个面积算两遍」。此法不需坐标三角形面积公式，仅用毕氏定理与基本面积公式，思路初等且适用于 $C = 0$ 的情形。建议重点板书主情形（$A$、$B$ 都非零），退化情形（水平线、铅垂线）配图简述即可。
* **平行线距离公式的预处理**：§20.5.2 强调使用公式前需将两直线化为 $A$、$B$ 系数相同的一般式。学生常忘记这一步直接代入，需通过例题强化。
* **TikZ 插图**：全章 70 幅，分布为 §20.1（5 幅）、§20.2（9 幅）、§20.3（29 幅）、§20.4（19 幅）、§20.5（8 幅）；图号按题注出现顺序连编（首幅带分幅后缀、末幅为 58），分幅 A／B／C 计入所属整数号。2026-09-26 第三轮按 4.5 第 14 条给 17 个证明逐步配图，新增 24 幅；相交／平行／重合三幅与垂直的两幅一律去掉坐标轴（两直线的位置关系与轴的取向无关），垂直两幅的交点改取一般位置（不再画成过原点），原堆在垂直证明末尾的构造图移入构造句之下（4.5 第 13 条）。2026-09-27 第四轮删去随推论（一般式与直线互为充要）及其证明删除的 4 幅与原截距合并图，新立 $y$ 截距、$x$ 截距两幅分图。2026-09-30 第六轮删去点斜式证明里「延长铅垂线求交点」的构造图一幅（该构造用了 §20.4.1 才教的交点），原「三点共线」一幅改为定理（直线的斜率刻画）的陈述配图并随定理迁入 §20.3.1；新增 6 幅（斜率刻画证明里取另一点一幅、点斜式的横坐标退化一幅、四个新示例各一幅）。**2026-09-30 第七轮把截距整块自 §20.3.2 迁入新立的 §20.4.2**：两幅截距定义图随块整单元迁移；原「由一般式读斜率与 $y$ 截距」的推论配图与示例配图各拆为两幅（斜率三角形一半留在 §20.3.2 并去掉交点标记，两轴交点一半跟截距走），图号按题注出现顺序全章重编（改号 34 个、改动 78 行）。70 块本机 pdflatex 全过、全部 70 幅 `pdftotext -bbox-layout` 标签互叠 0，仍待用户在 Obsidian 内目视确认（DoD 16）。

✅ 已執行（2026-09-18）：按用戶指示把第三十章 §30.1.2 的「三点共线的距离刻画与坐标判据」搬入本章，作为引出直线方程的手段。①§20.1.2 末新增 ad-lem 引理（距离判据三式与坐标判据 $(\ast)$ 各列行间公式）＋ ad-proof（先以直线上的点序证充分方向，再以 §8.7 三角形不等式逆否证必要方向；坐标判据分 $x_1 \ne x_2$ 与 $x_1 = x_2$ 两情形，顺带补上 §20.2.3 斜率判定顾不到铅垂线的缺口）；证明内每幅图各带自己的单图号锚句。②引理之后接一段推导：把 $(\ast)$ 展开移项得 $(y_1 - y_2)x + (x_2 - x_1)y + [(x_1 - x_2)y_1 + (y_2 - y_1)x_1] = 0$，系数由 $A \ne B$ 保证不全为零，故共线点集恰是二元一次方程的解集；本章余下各节就是把这一方程写成各种形式。③§20.2.3 证明块后新增注记（斜率判定管不到的那一半），回指本引理。④配图 5 幅自 Ch30 搬入并改号：图 20-1A／1B／1C（三点共线的三种相对位置）、图 20-2A／2B（坐标判据的斜线与铅垂线情形），本章由无图变为 5 幅。⑤同步改动：前置行补入平面几何(I)（引理要用 §8.7 三角形不等式）；§20.1 难度上限由 T C ｜ C D ｜ E C ｜ Q B 调为 T C+ ｜ C D ｜ E C+ ｜ Q B（新增带双向证明的引理与分情形论证）；§20.6 小结第 1 条改写；备课提示补「以三点共线引出直线方程」一条；词汇表「三点共线」行补注判据所在。⑥顺带修掉三处表格内裸竖线（4.7 红线）：斜率不存在行的空单元格、点到直线距离与平行线间距离两行改用 $\lvert \cdots \rvert$。⑦登记两处遗留：备课提示原记有「斜率定义、三种位置关系、垂直、点到直线距离、集合视角」五张图而正文无题注，应系早前编辑遗失，待查回或重绘；§20.4.3 定理（垂直的斜率判据）与其后引理（注记）两块无配套 ad-proof，属历史存量。⑨改址（同日，用户指出）：引理的证明要用斜率（情形 1 比较 $m_{AP}=m_{AB}$），放在 §20.1.2 属术语前置违规。已将 ad-lem、ad-proof、导语与推导段整体移至 **§20.2.3**（三点共线的斜率判定定理与其注记之后），图 20-1A／1B／1C、20-2A／2B 随迁、图号不变；§20.2.3 的注记改为就地引出该引理，证明内的「§20.2.3 斜率判定」改称「上面定理」，图 20-2B 题注去自指；§20.1.2 收尾段改为本章路线预告。⑧难度上限同步回评：§20.1 由 T C+ ｜ C D ｜ E C+ ｜ Q B **回退**为 T C ｜ C D ｜ E C ｜ Q B，§20.2 由 T B- ｜ C D+ ｜ E C ｜ Q C **上调**为 T B ｜ C D+ ｜ E C+ ｜ Q C；小结第 1 条、词汇表、备课提示两条随改。⑨验证：全章 868 行、围栏配对 0 错、层级错置 0、注释符零残留、板块全在白名单、5 个 tikz 块本机编译全过、题注 5 条连号且各有单图号锚句、图扎堆 0、表格裸竖线 0、难度行 5 ＝教学节 5、全库节号死链 0。

✅ 已執行（2026-09-25）：按用戶會話提案全章重排（方案章節九個岔口全取推薦檔，詳情見《給讀者的簡介》同日條目）。①**一般式提前為第一個形式**：§20.3 改名「直線的方程」，子節由 4 增為 6，新序 §20.3.1 平面上的直線／§20.3.2 一般式／§20.3.3 點斜式（含推論（兩點式））／§20.3.4 斜截式／§20.3.5 截距式／§20.3.6 形式的關係與選用，三種形式的證明一律改由一般式或其推論出發。②**新增定義（平面上的直線）**於 §20.3.1：直線 $AB$ 定義為與 $A$、$B$ 共線的所有點組成的集合 $L_{AB}$，並說明 §8.1 列直線為原始概念、本定義給的是「點落在直線上」的可檢驗條件與點集身份；2026-09-18 搬入 §20.2.3 的引理移入本節並拆為引理（三點共線的距離刻畫）與引理（三點共線的坐標判據）兩塊各配雙向證明，另立推論（過兩點的直線方程）與注記（三種共線判據的分工）。③補上「直線＝二元一次方程的解集」缺的那一半：§20.3.2 定理（一般式與直線互為充要）雙向證明，並修掉原稿把該結論錯掛 §20.1.2 名下的回指。④補官方必修 10.1 缺項：推論（由一般式讀斜率與 $y$ 截距）＋注記（從係數讀幾何信息），$x$／$y$ 截距首次嚴格定義。⑤撤去與 §15.2.6 重複的斜率 ad-def 改回指，並補兩條原為未證斷言的性質（斜率與取點無關的相似證明；三點共線斜率判定改用公理（兩點連線）與 $x=x_1+1$ 的交點構造）。⑥§20.4.3 垂直判據補初等證明（兩點距離公式＋畢氏定理的逆定理，不用三角函數），刪環境誤用的 ad-lem 改注記（鉛垂線與水平線），新增注記（一般式下的平行與垂直）（增潤、只述結論）。⑦修四處硬傷：§20.4.1 三種位置關係的列舉斷句補完並三態各配一圖；§20.4.3 示例末前提自相矛盾的引用塊注整段刪除，示例換非退化構型 $A(1,3)$、$B(0,0)$、$C(4,2)$；示例（矩形的對角線）自 §20.2.3 遷入 §20.4.3 並改題干；備課提示兩條斷句補完。⑧結論板塊按「定理陳述的形式」整改：平行與重合拆兩條定理各配證明，三重對照表改為單一 $\iff$ 式的推論（聯立解集即交集）＋證明、表格降為注記。⑨配圖 5→43 幅（新繪 38、自 Ch30 遷入 5），圖號按題注出現順序重編為圖 20-1A 至 20-29，每幅各帶只提本圖號的錨句。⑩體例歸並：詞匯表改「中英對照詞匯表（Glossary）」四列 25 條、備課提示標題全角括號 14 條、正文 em dash 清零、兩個 title 的英文部分去中文。⑪難度上限重評：§20.2 → T B+ ｜ C D+ ｜ E C+ ｜ Q C，§20.3 → T B- ｜ C C+ ｜ E B- ｜ Q C+，§20.4 → T B ｜ C C ｜ E C+ ｜ Q B-，§20.1／§20.5 不變。⑫姊妹側同步：Ch30 §30.1.2 直線條目降為注記回指 §20.3.1（板塊 41→42）與 13 處出處改指、Ch15 §15.2.7 錯章號「第 21 章」改正、Ch16／Ch19／Ch28 各一處、關聯分析 Ch20 第二部分六節概要全重寫、第三部分六行判定與覆蓋缺口改寫，Ch30 第三部分一行與第二部分兩處、詞匯表補 5 條、習題冊 Ch20 六處＋補建 7.6／7.7 兩個板塊（實算：B 檔 6 題佔 10.2% 低於 30%、五節全未觸頂、§20.1／§20.2／§20.4 三節有超限題，四類均為既有狀態，依 4.6「衝突仲裁」只登記待裁定；題 58 的 E 維 B→C+、框色黑改紅，.tex 待重編）、規範 L16 登記 Ch15 傾角前置。⑬驗證：全文件 2511 行、板塊 58、結論板塊與 ad-proof 17∶17 全配對、行間公式 76、43 個 tikz 塊本機 pdflatex 全過，圍欄配對／層級／難度行 5＝教學節 5／注釋符／原生 Callout／環境白名單／標籤詞／表格裸豎線／em dash／措辭禁區／題注連號／圖引用（0 懸空 0 多引 0 未引）／錨句尺／圖內規範／本章與跨章節號死鏈／內鏈死鏈／繁體殘留全部 0 違規；Ch30 複跑同口徑 0 違規、37 塊全過。⑭遺留待用戶目視（DoD 16）：本輪新繪 38 幅。
✅ 已執行（2026-09-26）：按用戶批注「將 Chapter 20 三點共線的坐標判據引理的證明過程進行修改：等價命題的证明必須要明確地分成充分性跟必要性兩部分証明，不要先分類討論。對於整份文檔盡量用計算取代文字論証，不要使用編號來進行引用」改寫本引理並把後兩條推廣到全章（用戶另選：坐標判據改走距離刻画＋兩條代數恒等式的路線；方向標籤以「判据为条件」定名並在標籤後括注蘊含方向；全章 17 個 ad-proof 一律復核；式號＋情形號＋步驟號＋位置回指全清；圖 20-11A／11B 都留、只換錨句與題注）。①**坐標判據證明重寫，不再先分類討論**：把四個坐標差記作 $p$、$q$、$r$、$s$，判據即 $ps = qr$；先展開驗證兩條关系 $pr + qs = (AB^2 + PA^2 - PB^2)/2$ 與 $AB^2 \cdot PA^2 = (pr + qs)^2 + (ps - qr)^2$，再分**充分性**（$ps = qr \Rightarrow (pr + qs)^2 = AB^2 \cdot PA^2 \Rightarrow PB = \lvert AB \mp PA\rvert \Rightarrow$ 三式之一取等號）與**必要性**（共線 $\Rightarrow$ 三式之一取等號 $\Rightarrow$ 三行展開的右端絕對值同為 $2\,AB \cdot PA \Rightarrow ps = qr$）兩段，全程只有展開、代入、開平方，不除以可能為零的量，鉛垂線（$p = 0$）與兩點重合都無需另証；同時补一筆 $p = 0$ 的直接代入验算。②**距離刻畫**改為「充分性（三式之一 $\Rightarrow$ 共線，§8.7 三角形不等式反証）＋必要性（共線 $\Rightarrow$ 三式之一，按中間點逐段寫出線段相加的等式）」，兩點重合的各案改為逐一代入等式验算。③**全章方向標籤**：13 個雙向結論板塊一律寫成「**充分性（… $\Longrightarrow$ …）：**」「**必要性（… $\Longrightarrow$ …）：**」（口徑同 Ch0 §0.5），原用的（$\Longrightarrow$）／（$\Longleftarrow$）標籤全部退場；斜率判定、過兩點方程、一般式充要、點斜式、兩點式、斜截式、截距式、聯立解集、平行、重合、垂直逐塊重排，垂直判据原稿「先说明两种假设下都必相交」再混証双向，現拆為兩段各自完成交點存在與三邊計算。④**編號引用清零**：删去式 $(\ast)$、$(\ast_1)$–$(\ast_3)$、$(1)$、$(2)$、「情形 1／情形 2／情形一／情形二」「第一種位置」「第一步／第二步／第三步」「第一件／第二件」「上面两条」「末式」「同法」「同理」「已证」「两个方向合起来」等编号与位置回指，改按内容或板块名称呼（「坐标判据的等式」「三式中取等号的那一式」「§15.2.2 的两点距离公式」「§8.5 的毕氏定理的逆定理」…）；图号、节号、板块名按规范保留。⑤**文字论证改计算**：约束强弱补 $\{P\}\subseteq\{Q\}$ 包含式；水平线示例改为代入验真；$\Delta x$、$\Delta y$ 升降四条各给 $\Delta y = m\,\Delta x$ 的符号计算；陡度删「明显」，改给 $\Delta x = 1$ 时铅垂腿 $1$ 与 $3$；平行的斜率判定改为「$(m_1 - m_2)x_0 = c_2 - c_1$ 的零系数判别」一条等价链；重合判定、点到直线距离、两平行线间距离各补中间展开步骤与出处；截距式两种退化由坐标判据直接算出 $x = x_1$、$y = y_1$；一般式下的平行与垂直注记（增润）把「再单独核对 $B = 0$ 的情形」换成两条代入等价链。⑥**修三处硬伤**：§20.3.2 定理（一般式与直线互为充要）原陈述把 $A$、$B$ 固定而只断言「存在常数 $C$」，该方向不成立（给定 $A$、$B$ 只能表出同一方向的直线），改为「存在实数 $A$、$B$、$C$（$A$、$B$ 不全为零）」，与 §20.6 小结口径对齐；§20.4.1 由「无穷多解」直推 $L_1 = L_2$ 的跳步改为「两个不同公共点 $\Rightarrow$ 公理（两点连线）$\Rightarrow$ 同一条直线」；§20.5.1 缺 $P \in L$ 的退化交代，已补「两端都是 $0$」。⑦**配图**：图 43 幅、图号全部不变；图 20-11A 改锚在「四个坐标差是 $AB$、$PA$ 的水平腿与铅垂腿」，图 20-11B 改锚在「证明不除以 $p$、$q$、$r$、$s$，铅垂线与重合不另证」，两幅题注去「情形」字样；图 20-15、图 20-16 的动点标号由 $P(x,y)$ 改为正文所用的 $Q(x,y)$；图 20-13A／13B 题注改按 $B \ne 0$、$B = 0$ 称说，并在图前一句给任取的 $P$ 身份。⑧**跨章同步**：Ch30 §30.1.2 四处「式 $(\ast)$」回指（该式号已在本章删除）改为「这条等式／这条坐标等式」；§20.6 小结第 1 条补坐标判据的证明路线；备课提示「引理为什么放在 §20.3.1」一条改写——坐标判据既以距离刻画为桥，两条引理须同讲，「距离刻画作为选讲」的说法作废。⑨难度上限复核：改动全在证明内部，判据、公式与定理的陈述不变，各节可支撑的题目难度不变，五条难度行照旧，习题册 7.6／7.7 无需重算。⑩验证：全文件 2223 行、板块 58、结论板块与 ad-proof 17∶17 全配对、tikz 43＝题注 43、43 个 tikz 块本机 pdflatex 全过；围栏配对／层级／难度行 5＝教学节 5／注释符／原生 Callout／环境白名单／标签词／表格裸竖线／em dash／措辞禁区／题注连号／图引用（0 悬空 0 多引 0 未引）／锚句尺／图内规范／本章节号死链全部 0 违规；本轮专用尺 refcheck 编号引用 HARD 0、13 个双向板块方向分段 13／13 合规。
✅ 已執行（2026-09-26·第二輪）：按用戶提案調整「直線定義」與「斜率」的先後（原話：「一開始討論斜率在研究直線的性質時，一直在運用直線上的各種性質，但直線的集合表示卻是在下一章才給出的，變相導致了上面關於共力的討論太過複雜，我覺得在一開始 20.1 就應該引入由共線來定義直線的方法，然後再討論斜率，討論完後在20.3引入三點共線的距離刻畫跟坐標刻畫，這樣可以簡化整個討論。」），四個岔口經提問全取推薦檔（定義落點 §20.1.2 末、配圖隨定義遷移並全章重編圖號、斜率判定下移降為推論、§20.1 難度上限不動只改裁定措辭）。①**定義（平面上的直線）$L_{AB}=\{P:P\text{ 與 }A、B\text{ 共線}\}$ 連同陳述配圖（原圖 20-9）自 §20.3.1 整塊移入 §20.1.2 末**，緊接 注記（記號約定）；該定義只用 §8.1 的共線直觀與公理（兩點連線），不用坐標也不用斜率，故不構成術語前置；塊內「按 §20.1.2 的說法」自指改為「定義（幾何圖形的方程，集合論表述）裡說的那個幾何圖形」，並補回導語中丟失的兩處行內公式（$\mathbb{R}^2$、$P$）；§20.1 導語「本節不定義直線……沿用第 8 章直觀」與 §20.2 導語「『平面上的直線』要到 §20.3.1 才正式定義」兩句作廢改写，§20.1 末路線段、§20.3 節首導語同步。②**§20.2.3 整節刪除**：定理（三點共線的斜率判定）下移為 §20.3.1 的**推論（三點共線的斜率判定）**（陳述與陳述圖照舊，證明重寫為充分性／必要性各一段的三行計算：兩邊同乘或同除非零的 $(x_2-x_1)(x_3-x_1)$ 即得坐標判據（$P$ 換成 $C$）），原證明裡「$L$ 向兩端無限延伸，故至少有一個交點又至多有一個交點」這段無坐標依據的論證與 $D$／$D'$ 構造、構造圖（原圖 20-8B）一併刪除；注記（斜率判定管不到的那一半）因內容已被 注記（三種共線判據的分工）覆蓋而刪除；注記（傾斜角）保留並歸入 §20.2.2 末。③**§20.3.1 改名「三點共線的刻畫」**，節內次序＝距離刻畫 → 坐標判據 → 斜率判定推論 → 分工注記（表格「斜率判定」行的所在節由 §20.2.3 改 §20.3.1、$m_{AP}$ 改 $m_{AC}$）→ 過兩點的直線方程；坐標判據證明末句刪去「這正是 §20.2.3 的斜率判定管不到的那一半」（該推論現居其後）；§20.3.3 點斜式證明改引「推論（三點共線的斜率判定）」。④**圖號按題注出現順序重編**：原圖 20-9→20-3、原 20-3 至 20-7 各 +1（20-4 至 20-8）、原 20-8A 先去單幅後綴再→20-11、原 20-10A 至 20-11B 各 −1（20-9A 至 20-10B）、圖 20-12 起不變；題注 42 條、改號 14 條、改動 28 行。⑤**难度上限**：改動只在板塊歸屬與證明內部，判據、公式與定理陳述未變，五節難度行一律不動（§20.1 仍 T C｜C D｜E C｜Q B），習題冊 7.6／7.7 無需重算；§20.1 新增的點集定義仍屬【完全超綱】表述，「此類表述不命題」的裁定照舊適用於它。⑥**內部與姊妹側同步**：小結主幹條與斜率條、詞匯表（共線、直線（平面上的）、斜率三行）、備課提示四條（§20.1 條改「備語言並就地定義直線」、斜率條、引理條改「兩條引理為什麼放在 §20.3.1」、TikZ 插圖條改 42 幅與新分布）；Ch30 七處「直線定義在 §20.3.1」改指 §20.1.2；《官方考綱與課題講義關聯分析》§20.1／§20.2／§20.3 概要與計數、第三部分三行判定共 12 處；習題冊 Ch20 規劃新增一條講義側同步；《給讀者的簡介》新增同日期第二條。⑦**驗證**：全文件 2180 行、板塊 57（§20.1=4、§20.2=4、§20.3=28、§20.4=14、§20.5=7；ad-def ×3、ad-thm ×10、ad-cor ×5、ad-lem ×2、ad-proof ×17、ad-example ×11、ad-note ×9）、結論板塊與 ad-proof 17∶17 全配對、tikz 42＝題注 42、42 個 tikz 塊本機 pdflatex 全過且標籤互疊 0；圍欄配對／層級／難度行 5＝教學節 5／注釋符／原生 Callout／環境白名單／標籤詞／表格裸豎線／em dash／措辭禁區／題注連號／圖引用（0 懸空 0 多引 0 未引）／錨句尺／圖內規範／本章節號死鏈／繁體殘留全部 0 違規；本輪專用尺 refcheck 編號引用 HARD 0、13 個雙向板塊方向分段 13／13 合規；Ch30 複跑 0 違規。
✅ 已執行（2026-09-26·第三輪）：按用戶 8 處 `%%` 批注直接修改（開場指示「我注释了 chapter 20 课题讲义，直接修改。」＝免方案章節、改完逕行歸併本行），八個岔口經提問全取推薦檔（配圖擴量＝17 個 ad-proof 逐步配圖；多行排版＝全章 `$$` 塊逐塊復核；恒等號＝嚴按規範 4.4＋DoD 9＋Ch23 排查清單體例；一般式充要＝降為推論＋極短證明並另立板塊擴寫鉛垂線／水平線；截距＝立 ad-def＋配圖；§20.3.1 末總結＝ad-note 散文＋對照表；去坐標軸＝垂直兩幅重畫並同類的相交／平行／重合三幅一併去軸；規範回寫＝4.7 加一條、不新增 DoD 項），七批串行、每批一個校驗驅動的腳本（先 DRY RUN 校驗唯一匹配、再 --apply）落地。批注原話：「直接写出完整公式」「上面那么多细碎的引理跟推论，这边要用一些篇幅总结一下整体在说什么，共线，斜率，在直线上，满足的代数方程之间的关系全部要说清楚。」「这个定理没必要证，这不是上面过两点的直线方程推论的结果吗？相反，你把铅直线水平线的表示用一段小文字略微带过，根本没讲重点。」「为什么不用定义？」「配图错误，两条直线不一定相较于原点，不用画坐标轴」「我不是说了配图要放在相应位置之下吗？怎么直接放底下啊，以及全文的所有配图太少了，每个证明内的配图需要更加精细化，最好对每一个独立的步骤都配图」「许多数学公式块没有进行多行排版，恒等变换的过程也没有用恒等号。」①**一般式與直線互為充要由定理降為推論**：證明由「分 $B\ne0$／$B=0$ 各取兩點、逐段代進坐標判據」的長證明縮為短證明，兩個方向都由 §20.3.1 的推論（過兩點的直線方程）給出（充分性在 $S$ 中取 $A_0\left(0,-\frac CB\right)$、$B_0\left(1,-\frac{A+C}{B}\right)$，$B=0$ 時取 $A_0\left(-\frac CA,0\right)$、$B_0\left(-\frac CA,1\right)$，代進該推論得 $L_{A_0B_0}$ 的方程與 $S$ 的方程同解；必要性在 $S$ 上取兩點定係數）；原「三類特殊直線都寫得成一般式」那段小文字擴為 **注記（鉛垂線與水平線的一般式）**（水平線 $A=0$、鉛垂線 $B=0$、過原點 $C=0$ 三條各配一幅圖，並點明鉛垂線是斜率寫不出來的那一類、這正是把一般式當主幹的理由）；ad-thm 10→9、ad-cor 5→6，全庫按名引用同批改稱（章首主幹句、§20.3 導語、點斜式證明、§20.6 小結主幹條、備課提示兩條）。②**$x$／$y$ 截距立定義**：正文加粗術語升為 **定義（$x$ 截距與 $y$ 截距）**，按 4.4「定義內部的排版」分段＋行間公式——概念本質（與軸交點的縱／橫坐標）、符號式（$c$ 是 $y$ 截距 $\iff(0,c)\in L$、$a$ 是 $x$ 截距 $\iff(a,0)\in L$）、存在條件（$L$ 有 $y$ 截距 $\iff L$ 不鉛垂 $\iff B\ne0$，$x$ 截距同理）、與軸重合時交點不唯一故不談截距、「截距是一個坐標，不是一段距離」，配一幅圖；下游三處「按 §20.3.2 的約定」改「按 §20.3.2 的定義（$x$ 截距與 $y$ 截距）」，詞匯表兩行備注補「定義見 §20.3.2」，與 Ch19 §19.3.2「將在直線方程那一章嚴格定義（§20.3.2）」的承諾對上。③**§20.3.1 節末總結**：刪除 注記（三種共線判據的分工），節末改立 **注記（四種說法的對照）**——幾何（$P\in L_{AB}$）、距離（三式之一取等號）、坐標（$(x_2-x_1)(y-y_1)=(y_2-y_1)(x-x_1)$）、斜率（$m_{AB}=m_{AP}$）四種說法各給行間式與適用限制，四行對照表（說法｜數學表達｜用到的量｜覆蓋範圍），末段說明坐標說法展開移項即推論（過兩點的直線方程）、這條等價式是全章樞紐、此後「點在不在直線上」只是代入驗算；不新增節號，外部引用零影響。坐標判據的证明就地寫出完整坐標式，證明末句不再重複「換回四個坐標差」。④**配圖 42→66 幅**：17 個 ad-proof 一律逐步配圖（4.5 第 14 條「證明中每一到兩個推理步驟配一幅分幅圖、純代數代換型證明亦不豁免」的存量違規清掉），新增 24 幅——§20.2 取點無關證明補同位角與相似、四條腿的指向兩幅；§20.3.1 距離刻畫補反證三角形與 $P=A$ 重合兩幅、坐標判據補陳述圖與 $BP$ 兩條腿兩幅、斜率判定補兩組變化量一幅；§20.3.2 一般式充要補陳述圖與必要性取點兩幅；§20.3.3 點斜式補构造 $P_2$、$Q$ 與 $P_1$、$P_2$ 共線、必要性反證三幅，兩點式補兩組變化量一幅；§20.4.1 聯立解集補陳述圖一幅；§20.4.2 平行補「$m_1\ne m_2$ 則相交」一幅、重合補「讀出 $c$ 與 $m$ 的兩點」一幅；§20.4.3 垂直補三角形 $OAB$ 與必要性直角兩幅；§20.5.1 距離補陳述圖一幅；§20.5.2 補「$L_1$ 上任取 $P$」一幅。**相交／平行／重合三幅（圖 20-36A／36B／36C）與垂直兩幅（圖 20-43A／43B）一律去掉坐標軸**（兩直線的位置關係與軸的取向無關），垂直兩幅的交點改取一般位置、不再畫成過原點，直角方塊由兩射線單位向量實算；**原堆在垂直證明末尾的構造圖移入構造句之下**（4.5 第 13 條），必要性另配一幅以免同圖兩引。圖號按題注出現順序全章重編為圖 20-1A 至 20-53（改號 59 條、改動 118 行），插入新圖後被拆散的五個分幅家族去掉孤立後綴（原 9A／10A／10B／21A／21B 的位置）。⑤**恒等號 0→25 處**：嚴按規範 4.4＋DoD 9＋Ch23 排查清單體例全章排查——表達式的恒等變形（展開、合併同類項、通分、約分、變號）用 `\equiv`（坐標判據的兩條恒等式與 $PB^2$ 的展開、$AB^2+PA^2-(AB-PA)^2$ 三行、$OA^2+OB^2-AB^2$ 的化簡、$y_A-y_*$／$y_B-y_*$ 的展開、距離公式的通分與約分、$m$ 與 $y_0$ 的化簡等）；示例與證明裡表等價改寫的 `\implies` 全部改 `\iff`（三角形三邊、由兩點求直線、由斜截式求直線三個示例），全章只留 3 處真正的單向蘊含（§20.1.2 的約束強弱、坐標判據充分性的取等號分支、點斜式裡 $P_2$ 的坐標）；定義式、賦值、代入求值與假設下的條件等式仍用 `=`（依 Ch6「假設成立時是條件等式、不得用 $\equiv$」的辨析）。⑥**多行排版**：全章 111 個 `$$` 塊逐塊復核，`aligned` 塊由 6 增至 53——凡變形鏈一律一步一行、`&` 對齊在關係符前，散文裡的「移項得…」「兩邊除以…得…」落進公式塊（由一般式讀斜率與 $y$ 截距、點斜式、兩點式、斜截式、截距式、平行、重合、垂直、相遇問題示例、三角形三邊示例、點到直線距離、兩平行線間距離），`\qquad` 串在一行的並列公式（$p$、$q$、$r$、$s$ 四個賦值、$A_0$／$B_0$ 兩點、$OA^2$／$OB^2$／$AB^2$、$Q_1$／$Q_2$、兩條直線的兩個方程、兩個截距的存在條件、距離刻畫的三式）一律拆成逐條一行；定理陳述按 4.4「定理陳述的形式」仍保持單一行間式，不拆行。⑦**附带修掉的硬伤與存量**：推論（過兩點的直線方程）证明裡「由 §20.3.1 的定義」自指錯節（該定義第二輪已移入 §20.1.2）改「由 §20.1.2 的定義」，§20.4.1 由無窮多解推重合處的同型引用同改；點斜式证明裡「$L$ 與鉛垂線 $x=x_1+1$ 至少有一個交點又至多有一個交點」這段無坐標依據的論證改為「一般式裡 $B\ne0$，把 $x=x_1+1$ 代進 $Ax+By+C=0$ 解出唯一的 $y$」；平行判定的反證按 4.4 體例點名衝突的兩條陳述並說明被否定的是臨時假設；兩點式证明刪去與前行逐字重複的一句；截距式與斜截式证明的「上面那條一般式」「據上面那條充要關係」等位置回指改按板塊名稱呼；「第一行拆開絕對值…第二行就是」「不論取到哪一行」等改按內容呼；`ad-proof` 內一行含 ≥2 個句末標點的 13 行存量（DoD 23／歷史存量 L15）全部拆行清零。⑧**難度上限復評**：改動在證明內部、板塊歸屬與命名、配圖與排版，判據、公式與定理陳述的數學內容未變，五節難度行一行未動（§20.1 T C｜C D｜E C｜Q B、§20.2 T B+｜C D+｜E C+｜Q C、§20.3 T B-｜C C+｜E B-｜Q C+、§20.4 T B｜C C｜E C+｜Q B-、§20.5 T B+｜C B｜E B｜Q B），習題冊 7.6／7.7 無需重算，三類既有衝突仍待用戶裁定。⑨**姊妹側同步**（子代理執行）：《官方考綱與課題講義關聯分析》Ch20 第二部分四節概要（板塊數、配圖數、定理改推論、新定義與兩個新注記、去軸與重畫）與第三部分 §20.3 行；《給讀者的簡介》同日新增第三條；Ch30 §30.1.2 一覽表與正文的「§20.3.2 的定理」改稱推論；習題冊 Ch20 規劃新增一條「✅ 講義側同步（2026-09-26·第三輪）」（題面、數據與分題結構不變，難度上限未動故 7.6／7.7 不重算）；《課題講義寫作規範》4.7 新增「數學公式塊的多行排版」一條（判定口徑：單行 `$$` 內 ≥4 個關係符或以 `\qquad` 並列兩條以上同型公式即違規；定理陳述例外）＋十二章修訂記錄一行，DoD 不新增項、排查復用 DoD 9。⑩**驗證**：全文件 2861 行、掃描區 1..2854；板塊 59（§20.1＝4、§20.2＝4、§20.3＝30、§20.4＝14、§20.5＝7；ad-def×4、ad-thm×9、ad-cor×6、ad-lem×2、ad-proof×17、ad-example×11、ad-note×10）；結論板塊與 ad-proof 17∶17 全配對；tikz 66＝題注 66；行間公式 111、`aligned` 53、正文 `\equiv` 25 處（備課提示另有一處口徑說明）；圍欄配對／層級與編號／難度行 5＝教學節 5／注釋符 0／原生 Callout／環境白名單／`title:` 標籤詞與英文部分含中文／表格裸豎線／em dash／措辭禁區／題注連號與加粗／圖引用（0 懸空 0 多引 0 未引）／錨句尺（含合併錨句）／圖內中文與單塊 40 行／本章節號死鏈／繁體殘留全部 0 違規；66 個 tikz 塊本機 pdflatex 全過、`pdftotext -bbox-layout` 標籤互疊 0；另抽出全部 111 個 `$$` 塊（`\text{}` 內的中文代換為占位符後）以 pdflatex 編譯，數學語法 0 錯（先查出 1 處 $OA$ 與 $O$ 互疊、已移標籤復檢為 0）；本輪專用尺（恒等號／多行排版／證明分行／位置回指／方向分段 13∶13／繁體）0 違規，餘 1 項「長公式未多行」為 定理（重合的判定）的陳述行（4.4 要求單一行间式，屬例外）、1 項「同法」在備課提示（教師向，不在正文口徑內）。⑪**遺留待用戶目視（DoD 16）**：本輪新繪 24 幅、重畫 2 幅（圖 20-43A／43B）、去坐標軸 3 幅（圖 20-36A／36B／36C）；另 Ch30 第六輪的 8 幅仍待目視。
✅ 已執行（2026-09-27·第四輪）：按用戶 7 處 `%%` 批注直接修改（開場指示「我注释了 Chapter 20 课题讲义，直接修改，保持文风简洁简短，重点突出。」＝免方案章節、改完逕行歸併本行），批注均為局部指令（刪塊＋定義重寫＋逐概念配圖）、無重排級岔口，故未另行提問。批注原話：「这一部分直接删掉，直线的良定义的处理早就在上一部分被那些引理跟推论验证了」「这是在定义吗？定义环境那就只写定义，别写其他东西。」「这里的配图呢？」「你整个截距的定义就不严谨。后面还写那么多话来推各种情形，到最后还否定了自己的定义。你直接定义 y 轴截距就是直线与 y 轴的唯一交点的 Y 坐标不就行了？ X 轴截距同理。」「我都说了对每一个几何概念单独配图，你还在底下直接画一个整体配图」。①**推論（一般式與直線互為充要）連同證明整塊刪除**（原圖 20-23、20-24A、20-24B、20-25 隨刪）：兩個方向早已由 §20.3.1 的兩條引理與推論（過兩點的直線方程）驗證，§20.3.2 不再複述；章首主幹句與路線段、§20.3 導語、§20.3.1 注記（四種說法的對照）末段、§20.3.2 導語、注記（鉛垂線與水平線的一般式）收尾段、§20.6 小結主幹條、詞匯表一般式行（改指 §20.3.1）、備課提示兩條，連同點斜式证明末引用該推論的存在性尾段三段（「屬一般式…它的解集是一條直線」「確實存在」）同批處置（共十二處）：一律改為回指 §20.3.1，尾段逕删（定理假設已給定 $L$，充分／必要兩段證畢即足）。②**定義（$x$ 截距與 $y$ 截距）重寫**：定義環境只留定義——$L$ 與 $y$ 軸恰有一個公共點 $(0, c)$ 時，$c$ 稱為 $L$ 的 $y$ 截距（行間式 $L \cap \{(0,y):y\in\mathbb{R}\}=\{(0,c)\}$），$x$ 截距同理；原「$c$ 是 $y$ 截距 $\iff(0,c)\in L$」在 $L$ 與 $y$ 軸重合時自相矛盾（每個 $c$ 都「成立」），作廢；$B\ne0$／$B=0$ 兩段分情形推導與存在條件行間式撤出定義塊，存在性與數值改由注記（從係數讀幾何信息）兩條以「$B=0$／$A=0$ 時不存在」承擔（涵蓋與軸重合的情形）；「截距是一個坐標，不是一段距離」移出定義、另立一行注記（截距是坐標，不是距離）。③**截距配圖一分為二**：原合併圖 20-26 拆為 $y$ 截距（新圖 20-23）與 $x$ 截距（新圖 20-24）兩幅分圖，各置所屬定義的錨句正下方（4.5 第 13、19 條），幾何沿用已驗證的原圖。④**下游措辭統一為「恰有一個公共點」**：推論（由一般式讀斜率與 $y$ 截距）证明改「解出唯一的 $y=-C/B$…恰有一個公共點」，斜截式证明同改，詞匯表 $x$／$y$ 截距兩行改「直線與軸唯一交點的縱／橫坐標」。⑤**圖號按題注出現順序全章重編**：原圖 20-27 至 20-53 各 −2（成為 20-25 至 20-51），分幅後綴不變，題注與正文引用同批改，改號 27 個、改動 64 行；圖引用 0 懸空 0 多引 0 未引。⑥難度上限一行未動（刪塊屬【深度超出】內容、截距定義名與節號不變，命題工具不變），習題冊 7.6／7.7 免重算、已落一條 ✅ 說明，並同批改準命題範圍兩行的殘留出處（三點共線斜率判定的歸屬、§20.3 條開頭措辭）。⑦規範回寫：4.4.2（二）新增「定義環境只寫定義」一條正文細則（存在唯一性寫進定義句、分情形推導與存在條件式移出、多概念塊每概念各配一幅圖，含判定口徑），DoD 不新增項，十二章修訂記錄加一行。⑧姊妹側同步：《官方考綱與課題講義關聯分析》Ch20 第二部分 §20.3 概要三處與 §20.6 匯總行統計、第三部分 §20.3 行；《給讀者的簡介》同日新增第四輪條目。⑨驗證：全文件 2735 行、掃描區 1..2677；板塊 58（§20.1＝4、§20.2＝4、§20.3＝29、§20.4＝14、§20.5＝7；ad-def×4、ad-thm×9、ad-cor×5、ad-lem×2、ad-proof×16、ad-example×11、ad-note×11）；結論板塊與 ad-proof 16∶16 全配對；tikz 63＝題注 63；行間公式 104、`aligned` 48、正文 `\equiv` 25 處；圍欄配對／層級與編號／難度行 5＝教學節 5／注釋符 0／原生 Callout／環境白名單／`title:` 標籤詞／題注連號與體例／圖引用（0 懸空 0 多引 0 未引）／錨句尺／圖內無中文與單塊 ≤40 行／表格裸豎線／em dash／措辭禁區／繁體殘留全部 0 違規；63 個 tikz 塊本機 pdflatex 全過、104 個 `$$` 塊編譯全過、新圖 20-23／20-24 `pdftotext -bbox-layout` 標籤互疊 0（其餘 61 幅未動，沿用第三輪的全量互疊 0）；雙向板塊方向分段 12∶12 合規。⑩**遺留待用戶目視（DoD 16）**：新圖 20-23、20-24 兩幅。
✅ 已執行（2026-09-27·第五輪）：按用戶對引理（三點共線的坐標判據）证明的 1 處 `%%` 批注直接修改（開場指示「我注释了三点共线的坐标判据引理的证明，直接修改。」＝免方案章節、改完逕行歸併本行），批注為证明内部改寫指令（補計算目的與直接路線）、無岔口未提問。批注原話：「你上面的推导防御性太强了，你根本就没有说为什么要做这些推导，它们的目的又是什么。你要直接说出你的计算目的，你要计算什么东西？算这个来干嘛？这些目的你都没有说。你得先说明将 PA，PB，AB 分别用 p,q,r,s 表示出来，而且证明的逻辑选择得直接一些，本质上就是在用符号表示 PA，PB，AB，只不过因为是根式难算，所以考虑他们的平方，所以也要接着把要证的等式 PA+PB=AB ... 三个全部平方后逐个验证，你这样写才清楚和直接，一开始就绕这么多弯子，且不说这么计算的目的，谁看得懂？。」①**证明改為目的先行**：原「而 $A \ne B$ 说的是 $p$、$q$ 不全为零，故 $AB > 0$」句刪除（後文未用），改立目的段——由引理（三點共線的距離刻画），共線 $\iff$ 三個等式至少一式成立（$PA+PB=AB$、$PA+AB=PB$、$PB+AB=PA$ 三式逐行列出），並明說路線「三個距離是坐標的根式、直接處理困難 $\to$ 把 $AB$、$PA$、$PB$ 用 $p$、$q$、$r$、$s$ 表示出來、只對平方做運算 $\to$ 三個等式全部平方後逐個驗證」。②**三個等式逐個平方驗證取代兩條無動機預置恒等式**（「把同一組字母各展開兩次」段、$AB^2 \cdot PA^2 = (pr+qs)^2 + (ps-qr)^2$ 段與「充分性與必要性兩段共用」句全刪）：每個等式走「平方移項 $\to$ 代入 $PB^2 = AB^2 + PA^2 - 2(pr+qs)$ $\to$ 再平方一次（左端非負、等式成立要求右端非負，符號條件隨列）$\to$ 展開兩個距離平方的乘積（各多出 $(ps-qr)^2$ 項）」，得三條等價式 $PA+PB=AB \iff ps=qr$ 且 $pr+qs \ge PA^2$、$PA+AB=PB \iff ps=qr$ 且 $pr+qs \le 0$、$PB+AB=PA \iff ps=qr$ 且 $pr+qs \ge AB^2$；關係 $PB^2 \equiv AB^2 + PA^2 - 2(pr+qs)$ 保留為共用代入關係（原鏈末行 $\iff pr+qs = (AB^2+PA^2-PB^2)/2$ 隨舊必要性段刪除）。③**充分性改寫**：$ps=qr$ 代進 $PA^2 \cdot AB^2 \equiv (pr+qs)^2 + (ps-qr)^2$ 得 $(pr+qs)^2 = PA^2 \cdot AB^2$，開平方得 $pr+qs = \pm PA \cdot AB$：負號時 $pr+qs \le 0$ 由第二條等價式得 $PA+AB=PB$；正號時 $PA \ge AB$ 給 $pr+qs \ge AB^2$ 得 $PB+AB=PA$、$AB \ge PA$ 給 $pr+qs \ge PA^2$ 得 $PA+PB=AB$。**必要性縮為兩句**：共線 $\Rightarrow$ 三式之一成立 $\Rightarrow$ 對應等價式右端直接給出 $ps=qr$（原「三式解出 $PB$ 逐一代入的三行展開」段刪除）。④$p=0$ 直接驗算段、圖 20-16／17／18 三幅連錨句題注、「全程不除以 $p$、$q$、$r$、$s$」段與收尾句一律原位不動，圖號全章不變，「鉛垂線與兩點重合不用另證」的聲明照舊成立。⑤備課提示「兩條引理為什麼放在 §20.3.1」同批改口：板書由「兩條恒等式」改「三條平方等價式」。⑥規範回寫：4.4.2（三）新增「**計算前先說目的**」一條正文細則（預置公式或展開鏈前先用一句話交代算的是什麼量、接著要用它做什麼，不得預置無動機恒等式，優先選直接歸約目標結論的路線；含判定口徑），DoD 不新增項，十二章修訂記錄加一行。⑦姊妹側同步：《官方考綱與課題講義關聯分析》Ch20 §20.3 概要行補證明改寫說明；《給讀者的簡介》同日新增本輪條目。⑧難度上限一行未動（改動全在证明内部，判據与引理陳述不變），習題冊 7.6／7.7 免重算（純证明内部改動依 2026-09-26 判據改寫輪先例不落習題冊側 ✅）。⑨驗證：全文件 2810 行、掃描區 1..2751；板塊 58 不變、結論板塊與 ad-proof 16∶16 全配對、tikz 63＝題注 63、圖引用 0 懸空 0 多引 0 未引、雙向分段 12∶12；結構尺（圍欄配對／空行衛生／注釋符 0／em dash／繁體殘留／措辭禁區／表格裸豎線／題注體例／錨句尺／圖內無中文與單塊 ≤40 行）0 違規；行間公式 121、`aligned` 64、`\equiv` 27，121 個 `$$` 塊 pdflatex 編譯全過；圖本輪未觸動，沿用第四輪的 63 塊編譯全過與 bbox 互疊 0 結果。⑩遺留待用戶目視（DoD 16）：本輪無新繪或重畫圖。⑪**補正（同日，用戶追加指令「不是，多栏排版呢？你全文都没有多栏排版，完全没有换行」）**：並列同型公式一律逐行 `aligned` 化，共十處——三個距離的平方（$AB^2 = p^2+q^2$、$PA^2 = r^2+s^2$、$PB^2 = (r-p)^2+(s-q)^2$）逐行列出、$PB^2$ 展開鏈獨立成塊、三個「兩個距離平方的乘積」展開各拆兩行（一步一行）、充分性開平方的兩個結果與兩個分支各自成塊、斜率判定证明的 $m_{AB}$／$m_{AC}$ 兩式逐行、注記（四種說法的對照）距離說法三式棄 `\quad \text{或}` 單行改逐行（第三輪掃描只查 `\qquad` 的漏網存量）、§20.4.3 注記的 $m_1$／$m_2$ 內聯並列同批修；規範 4.7「多行排版」判定口徑同批擴充（`\quad` 含 `\text{或}` 串聯、散文內聯並列同型公式入尺；詳十二章修訂記錄）；行間公式 116→121、`aligned` 55→64，圖與圖號零變動。
✅ 已執行（2026-09-30·第六輪）：按用戶 5 處 `%%` 批注修改（開場指示「我注释了 Chapter 20 课题讲义」，未附「直接修改」，且批注③末句明寫「整章整改」、批注②質疑 §20.3 的編排重心，屬重排級，故七個岔口經提問全取推薦檔後落地），七批串行、每批一個 marker 驅動的腳本（先 DRY RUN 校驗唯一命中、再 --apply）。批注原話：「这里加例子演示如何透过该推论求出直线的斜率与 y 轴截距。」「方程的求法先放一边，你不介绍点斜式，两点式，斜截式截句式这些形式之前，只有一般式是很难求的，上帝的这个推论非常难以记忆，也不是考试里常用的方法。」「这个证明写得太冗长了，Q 在直线上用回 "定理（斜率与取点无关）" 不就行了？还有像这种延伸出一条新的垂直线做交点的方法全部不能用，这里都没有教直线的交点怎么求。另外，给定一个直线上的点，若另一点跟该点的连线等于直线的斜率，那么这一点就显然在直线上，这个作为一个定理可以在三点共线的刻画章节上证明，这里直接用。其次，你要直接说 "即直线的方程是..." 这才是篇章的重点。以及缺乏示例。整章整改。」「不是你自己都证完了，你为什么还要在下面写充分性和必要性的论证？你都直接用等价链等价出来了」「你这里跟斜截式的证明也一样」。①**§20.3.1 新立定理（直线的斜率刻画）**（批注③）：設 $L$ 的斜率是 $m$、$P_1(x_1,y_1)\in L$、$Q(x,y)$ 且 $x\ne x_1$，則 $Q\in L\iff m_{P_1Q}=m$；證明＝先在 $L$ 上另取 $P_2(x_2,y_2)$（$x_2\ne x_1$，存在性由「若 $x_A=x_B$ 則坐標判據使 $L$ 上每點橫坐標都是 $x_A$、$L$ 成鉛垂線而斜率不存在」反證得出）、由 §8.1 公理（兩點連線）認出 $L=L_{P_1P_2}$、由定理（斜率與取點無關）得 $m_{P_1P_2}=m$，再一條等價鏈 $Q\in L\iff Q\in L_{P_1P_2}\iff$ 坐標判據 $\iff m_{P_1Q}=m_{P_1P_2}\iff m_{P_1Q}=m$ 走到底，不分方向段；板塊置於推論（三點共線的斜率判定）與推論（過兩點的直線方程）之間，配陈述圖與取 $P_2$ 圖各一幅。②**定理（點斜式）證明重寫**（批注③）：原「$L$ 的斜率是 $m$ 故 $L$ 不鉛垂、一般式裡 $B\ne0$，把 $x=x_1+1$ 代進 $Ax+By+C=0$ 解出唯一的 $y$，得 $L$ 與鉛垂線的交點 $P_2$，再算出 $P_2=(x_1+1,\,y_1+m)$」整段連同其构造圖刪除（求交點要到 §20.4.1 才教，屬工具前置）；改引定理（直線的斜率刻畫）：$x\ne x_1$ 走一條三行等價鏈，$x=x_1$ 分兩句（方程化成 $y=y_1$ 即 $Q=P_1\in L$；反過來若 $Q\ne P_1$ 則 $L=L_{P_1Q}$ 是鉛垂線、與斜率存在衝突），原「$Q$ 與 $P_1$ 橫坐標相同」的反證圖保留並另配「鉛垂線 $x=x_1$ 與不鉛垂的 $L$ 只有一個公共點」一幅；必要性由定理（斜率與取點無關）承擔（批注原話指定）。③**等價鏈即證明，删去複述方向的兩段**（批注④⑤，並按批注③「整章整改」推到全章 17 個 ad-proof）：推論（三點共線的斜率判定）、推論（過兩點的直線方程）、推論（兩點式）、定理（斜截式）、定理（截距式）、推論（聯立解集即交集）六塊的「**充分性（…）：**／**必要性（…）：**」複述段全刪，各留一條完整 $\iff$ 鏈＋鏈前一句交代每步為何等價（分母非零、同乘非零因子、展開移項、把定義各讀一遍）；兩方向路線確實不同的五塊（距離刻畫的反證與中間點三分、坐標判據的三條平方等價式與開平方定符號、平行與重合的反證、垂直的畢氏定理逆定理）照舊分段，方向分段由 12∶12 降為 5∶5。④**求方程重心整體後移、推論（過兩點的直線方程）降為理論枢纽**（批注②）：§20.3.2 的示例（三角形三邊的直線方程）刪除（它靠那條難記的推論），改立**示例（由一般式讀斜率與兩截距）**（批注①：$3x+4y-12=0$ 讀 $m=-\frac34$、$y$ 截距 $3$、$x$ 截距 $4$，另判鉛垂線 $2x+5=0$ 與過原點 $x-3y=0$ 兩個退化，配一幅圖）；三角形三邊示例遷入 §20.3.6 並改用兩點式（$AB$ 走注記（兩點式的兩種退化）的水平線退化），頂點改 $A(0,0)$、$B(4,0)$、$C(2,3)$；推論（過兩點的直線方程）證明後加一段明示它是主幹的理論枢纽、三個係數都不好轉、求方程走兩點式或點斜式；注記（兩點式的兩種退化）末段「有兩條路」改為常規走法（先看橫坐標，不同就兩點式或點斜式，相同直接寫 $x=x_1$、$y=y_1$）；§20.3.6 表格與 §20.6 方程形式總表的兩點式「化為一般式」欄由「見 §20.3.1 的推論」改「交叉相乘後展開移項」，三條讀法第一條刪「（或直接用 §20.3.1 的推論）」並補「四種都是立式的方法，算完再化成一般式或斜截式作為答案」。⑤**示例補足，末句一律落到「即直線的方程是 …」**（批注③）：新增 示例（由一點與斜率求直線方程）（§20.3.3，過 $P(3,-2)$、$m=-\frac12$，得 $x+2y+1=0$）、示例（由兩截距求直線方程）（§20.3.5，$a=4$、$b=-2$，得 $x-2y-4=0$）；示例（由兩點求直線方程）改為只走兩點式（刪「推論這條路」與兩法對照段）；示例（由斜截式求直線）首句改「由定理（斜截式），直線的方程是 $y=-3x+4$」；四例各配一幅圖，§20.3 的 ad-example 由 3 增至 6。⑥**注記（四種說法的對照）擴為注記（五種說法的對照）**：加「點斜說法」$m_{P_1Q}=m$（定理（直線的斜率刻畫），須 $x\ne x_1$，$x=x_1$ 時 $Q$ 只能是 $P_1$，§20.3.3 的點斜式就是它的展開）一段與對照表第五行，首段框定由「點 $P$ 在過 $A$、$B$ 的那條直線上」改為「點在某條直線上」，並補「前四種把直線交給兩個定點 $A$、$B$，第五種交給一個定點與一個斜率」，末段刪去與推論後新段重複的「它是全章的枢纽」；詞匯表「三點共線」行、§20.3.1 導語、備課提示同批改口（計數一致性）。⑦**同步改口**：章首主幹句（補「四種常規走法」）與 §20.1.2 路線段、§20.3 導語、§20.3.3 導語（刪「做題時」並改「一般式並不順手，三個係數都要先算一遍再展開」）、§20.6 小結第 2 條（補定理（直線的斜率刻畫））與第 3 條（改「其餘形式都是改写，也是求方程的常規走法」並點明推論不用來求方程）、詞匯表點斜式行（補出處）、備課提示三條（兩條引理條補定理（直線的斜率刻畫）的講法與「不作本章還沒工具的構造」、「一般式提前為第一個形式」條改「一般式是主幹，卻不是求方程的工具」、新增「等價鏈就是雙向證明」一條，16→17 條）。⑧**配圖 63→68 幅**：刪 1（$x=x_1+1$ 构造圖）、遷 1（原「$Q$ 與 $P_1$、$P_2$ 共線」改為斜率刻畫的陈述圖、幾何沿用並去掉 $P_2$、補直角方块）、新增 6（斜率刻畫證明取 $P_2$、點斜式 $x=x_1$ 退化、四個新示例各一幅），圖號按題注出現順序全章重編為圖 20-1A 至 20-56（改號 36 個、改動 86 行），圖引用 0 懸空 0 多引 0 未引。⑨難度上限一行未動（新定理與四個示例都在 §20.3 原有 T B-｜C C+｜E B-｜Q C+ 之內，判據與公式的數學內容未變），習題冊 7.6／7.7 免重算；習題冊側只登記不改編（推論降為理論枢纽後，題 14／17／26(c) 等 4 處判定理由仍以該推論為解題工具，是否改走兩點式待裁定）。⑩規範回寫：《課題講義寫作規範》4.4.2（三）新增「等價鏈即雙向證明」一條正文細則（單鏈即雙向證明、鏈前一句交代每步為何等價、兩方向路線確實不同才分段、使工具失效的退化條件按條件分情形各給一鏈），DoD 不新增項，十二章修訂記錄加一行、最後校核日改 2026-09-30；2026-09-26 只存記憶庫的「雙向證明一律按充分性／必要性分節且不得先分類討論」準則同批改口為「按路線分」。⑪姊妹側同步：《官方考綱與課題講義關聯分析》Ch20 第二部分 §20.3 概要與 §20.6 匯總行、第三部分 §20.3 行；《給讀者的簡介》同日新增第六輪條目；習題冊 Ch20 規劃「十、待確認事項」登記一條。⑫驗證：全文件 2977 行、掃描區 1..2967；板塊 63（§20.1＝4、§20.2＝4、§20.3＝34、§20.4＝14、§20.5＝7；ad-def×4、ad-thm×10、ad-cor×5、ad-lem×2、ad-proof×17、ad-example×14、ad-note×11）；結論板塊與 ad-proof 17∶17 全配對；tikz 68＝題注 68；行間公式 131、正文 `aligned` 67、正文 `\equiv` 26；圍欄配對／層級與編號／難度行 5＝教學節 5／注釋符 0／原生 Callout／環境白名單／`title:` 標籤詞與英文部分含中文／題注連號與體例／圖引用／錨句尺／圖內無中文與單塊 ≤40 行／表格裸豎線／em dash／措辭禁區／繁體殘留全部 0 違規；68 個 tikz 塊本機 pdflatex 全過、131 個 `$$` 塊編譯全過、68 幅 `pdftotext -bbox-layout` 標籤互叠 0；方向分段 5∶5（皆為兩方向路線不同者）；詞匯表 25 條、備課提示 17 條。⑬**遺留待用戶目視（DoD 16）**：本輪新繪 6 幅、遷移並改題注 1 幅。
✅ 已執行（2026-09-30·第七輪）：按用戶會話指示「有关直线的 x y 轴截距，也要移到相交与交点之后再讲」把截距整塊自 §20.3.2 遷入新立的 **§20.4.2**（屬重排級，七個岔口經提問：Q1–Q6 全取推薦檔、Q7 選「不回寫規範、只存記憶庫」）。**動因＝工具前置**：截距以「$L$ 與坐標軸**恰有一個公共點**」立定義，而兩直線的交點要到 §20.4.1 才教（與第六輪點斜式「延長鉛垂線求交點」同類硬伤）。①**新立 §20.4.2「直线与坐标轴的交点：截距 (Intercepts)」**：坐標軸本身也是直線（$y$ 軸是 $x=0$、$x$ 軸是 $y=0$），故與軸的交點就是 §20.4.1 聯立解的特例；節內次序＝定義（$x$ 截距與 $y$ 截距）（原塊連兩幅圖**整單元遷入**、陳述一字未改）→注記（截距是坐標，不是距離）→**推論（由一般式讀兩截距）**（新立：$A\ne0$、$B\ne0$ 時 $x$ 截距 $=-C/A$、$y$ 截距 $=-C/B$；證明＝把 $y$ 軸當直線 $x=0$、由 §20.4.1 的推論（聯立解集即交集）各解一次聯立，兩條等價鏈，不用「同法」回指）→注記（由一般式讀兩截距）（存在條件：$B=0$ 鉛垂線與 $y$ 軸平行或重合故無 $y$ 截距、$A=0$ 水平線無 $x$ 截距；$C=0$ 是「過原點、兩截距都是 $0$」而非不存在）→回指句（斜截式的 $c$、截距式的 $a$、$b$ 到此才有名字）→示例（由一般式讀兩截距）。②**§20.3.2 一般式節瘦身（板塊 8→6）**：推論（由一般式讀斜率與 $y$ 截距）拆半改名**推論（由一般式讀斜率）**（證明刪去「再令 $x=0$，解出唯一的 $y=-C/B$…按定義…$y$ 截距為 $-C/B$」一段）；注記（從係數讀幾何信息）由四條收為兩條（斜率、某點在不在 $L$ 上）並補一句指向 §20.4.2；示例（由一般式讀斜率與兩截距）拆半改名**示例（由一般式讀斜率）**；節首導語與節內過渡句同批改口。③**斜截式與截距式改用「過點」語言**（Q2 推薦檔，零前向依賴）：定理（斜截式）陳述由「$L$ 為斜率是 $m$、$y$ 截距是 $c$ 的直線」改為「$L$ 為斜率是 $m$ **且過點 $(0,c)$** 的直線」，證明刪去「按 §20.3.2 的定義…恰有一個公共點 $(0,c)$，故 $L$ 過 $(0,c)$」一步；定理（截距式）由「$L$ 為 $x$ 截距是 $a$、$y$ 截距是 $b$ 的直線」改為「$L$ 為**過 $A(a,0)$ 與 $B(0,b)$** 的直線」，證明同刪一步；兩節各加一段導語交代「名字到 §20.4.2 才補上」；截距式節末段改口（過原點時 $A$、$B$ 重合，平行於軸時無交點，與軸重合時交點不唯一）；Ch19 記號對照段「$b$ 為 $y$ 截距」改「$b$ 是圖像與 $y$ 軸交點的縱坐標（§20.4.2 稱為 $y$ 截距）」、表頭「截距記號」改「與 $y$ 軸交點的縱坐標」；示例（由斜截式求直線）題干改「過點 $(0,4)$…求它與 $x$ 軸交點的橫坐標」、示例（由兩截距求直線方程）改名**示例（由兩軸上的交點求直線方程）**、題干改「過 $x$ 軸上一點 $A(4,0)$ 與 $y$ 軸上一點 $B(0,-2)$」。④**兩處總表與三條讀法改口**：§20.3.6 五形式總表與 §20.6 方程形式總表的「已知條件」欄，斜截式改「斜率與 $y$ 軸交點的縱坐標」、截距式改「兩軸交點的坐標」；三條讀法第一條改「給斜率與 $y$ 軸上一點寫斜截式，給兩軸上的交點寫截距式」。⑤**`###` 級重編、`##` 級零重編**（依 rules「節號重編」分檔口徑）：原 §20.4.2 平行與重合→**§20.4.3**、原 §20.4.3 垂直→**§20.4.4**；正文 7 處「§20.4.3」改「§20.4.4」、2 處指平行／重合的「§20.4.2」改「§20.4.3」（其餘 6 處「§20.4.2」是本輪新寫的指向新節的引用，不動；歷史 ✅ 行一律不改）；§20.4.3 導語「前一節用的是『有沒有公共點』」改為「§20.4.1 用的是…」（去位置回指）；§20.4.4 內「§20.3.2 的推論（由一般式讀斜率與 $y$ 截距）」改「…（由一般式讀斜率）」。⑥**§20.4 節名「兩直線的位置關係」不動**（Q4 推薦檔），節首導語補一句接住截距（坐標軸本身也是直線、與軸相交是相交的特例、平行與垂直的判據正好要用到它）。⑦**同步改口**：章首主幹句、§20.1.2 路線段、§20.3 導語、§20.6 小結第 4 條、詞匯表四行（$x$／$y$ 截距兩行改指 §20.4.2，斜截式／截距式兩行改「過點」措辭）、備課提示四條（「由一般式讀斜率與截距屬課程要求」改為分兩處承擔並記遷移動因、「截距是坐標」條改指 §20.4.2、「一般式是主幹」條改口、**新增「斜截式與截距式用『過點』語言陳述」一條**，17→18 條）。⑧**配圖 68→70 幅**：兩幅截距定義圖隨塊整單元遷移；原「由一般式讀斜率與 $y$ 截距」的推論配圖拆為「斜率三角形」一幅（留 §20.3.2、去掉交點 $E$ 的標記）與「$L$ 與兩軸交點標 $-C/A$、$-C/B$」一幅（新，入 §20.4.2 推論證明）；原示例配圖同法拆為「斜率三角形」一幅（留 §20.3.2、去掉兩交點標記）與「兩軸交點 $(0,3)$、$(4,0)$」一幅（新，入 §20.4.2 示例）；圖號按題注出現順序全章重編為圖 20-1A 至 **20-58**（改號 34 個、改動 78 行），0 懸空／0 多引／0 未引。⑨**難度上限五節一行未動**（判定問句「本節可支撐的題目會不會多出一類」：§20.3 少了截距定義但斜截式／截距式仍以「過點」語言支撐同類題目，§20.4 新增的截距讀取屬基本代入，兩節題型未增未減），習題冊 7.6／7.7 免重算；習題冊側同批改出處（板塊清單、越界條款、約 11 處判定理由的「§20.3.2 的截距定義」改指）並在「十、待確認事項」**新增第 19 項**登記新越界風險（題 21(b)、23、26 等原以截距定義為出處、現該定義住 §20.4.2，而這幾題在 §20.3 題號範圍內；三選：改題面措辭為「與軸交點的坐標」／移到 §20.4 題組／加例外條款）。⑩**規範不回寫**（Q7 用戶選「都不加，只存記憶庫」）：「以兩圖形的交點定義的量須住在講過求交點之後」這條準則改記於記憶庫 rules「安置位置三條件」條與「通讀體檢清單」⑭工具前置。⑪姊妹側同步：Ch19 §19.3.2 承諾句「將在直線方程那一章嚴格定義（§20.3.2）」改指 §20.4.2、Ch15 §15.2.7 垂直證明回指 §20.4.3→§20.4.4、《官方考綱與課題講義關聯分析》Ch20 第二部分 §20.3／§20.4 概要與 §20.6 匯總行、第三部分 §20.3／§20.4 行與覆蓋缺口行，《給讀者的簡介》同日新增第七輪條目。⑫驗證：全文件 **3078** 行、掃描區 1..3067；板塊 **67**（§20.1＝4、§20.2＝4、§20.3＝**32**、§20.4＝**20**、§20.5＝7；ad-def×4、ad-thm×10、ad-cor×**6**、ad-lem×2、ad-proof×**18**、ad-example×**15**、ad-note×**12**）；結論板塊與 ad-proof **18∶18** 全配對；tikz **70**＝題注 70；行間公式 **135**、正文 `aligned` **69**、正文 `\equiv` **27**；雙向方向分段仍 5∶5；圍欄配對／層級與編號／難度行 5＝教學節 5／注釋符 0／原生 Callout／環境白名單／`title:` 標籤詞與英文部分含中文／題注連號與體例／圖引用／錨句尺／圖內無中文與單塊 ≤40 行／表格裸豎線／em dash／措辭禁區／繁體殘留全部 **0 違規**（gen_check 違規 0）；refcheck 編號引用 HARD 0；**70 個 tikz 塊本機 pdflatex 全過、135 個 `$$` 塊編譯全過、70 幅 `pdftotext -bbox-layout` 標籤互疊 0**；詞匯表 25 條、備課提示 18 條、✅ 9 行。⑬**遺留待用戶目視（DoD 16）**：本輪新繪 2 幅、拆圖改畫 2 幅、隨塊遷移 2 幅。
