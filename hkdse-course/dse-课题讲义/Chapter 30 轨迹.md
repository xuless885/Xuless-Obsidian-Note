---
tags: DSE课程笔记
---

# 30　轨迹（Locus）

> [[Chapter 29 平面几何 (II)|平面几何(II)]] 的结束语留了一个钩子：上一章从已知的图形找性质，这一章反其道而行，从条件找图形。其实上一章已经做了不少轨迹的工作而不自知：外心是「到三顶点等距」的点，内心是「到三边等距」的点，两条等距引理恰好把「线段的垂直平分线」与「角的平分线」刻画成完整的点集。本章给这类「条件定图形」的思考一个正式的名字：**轨迹**，并把它系统化。

> 全章三条主线。第一，几何视角（§30.1）：建立轨迹的概念，先用轨迹语言把线段、圆、半平面与抛物线这些基本对象重新定义一次，直线则按 §20.1.2 的定义作轨迹语言的重述（§30.1.2），再逐条走一遍课程要求的两类同型条件的轨迹（§30.1.3），并把「轨迹的方程」由条件式直接给出（§30.1.1 注记（轨迹的方程））。它们全是老朋友，改用「满足条件的点的集合」来描述之后，视角就统一了。第二，代数视角（§30.2）：把几何条件嵌进直角坐标系，用「建、设、限、代、化」五步法把条件翻译成关于 $x$、$y$ 的方程，配合直接法、定义法与参数法（增润）三种策略；课程要求会求轨迹为直线、圆和抛物线（形如 $y = ax^2 + bx + c$）的方程，三类都会在正文出现。第三，延伸视角（§30.3，超出常规课程要求）：重新审视抛物线：在 [[Chapter 21 二次函数|二次函数]] 里它是 $y = ax^2 + bx + c$ 的图像，在本章它是「到定点与定直线等距」的点的轨迹，系数 $a$ 与焦距的倒数关系将揭开开口宽窄的几何本源。

> 生活中处处是轨迹：长时间曝光的照片把运动光点的痕迹固定成一条亮线，转弯的汽车在底片上画出一段圆弧，星星因地球自转画出以天极为圆心的星迹。本章就从这些痕迹说起：§30.1 平面几何中的轨迹；§30.2 轨迹的代数方程；§30.3 延伸：抛物线的几何本源；§30.4 全章小结。

前置：[[Chapter 6 代数式|代数式]]、[[Chapter 8 平面几何 (I)|平面几何(I)]]、[[Chapter 15 解析几何 (I)|解析几何(I)]]、[[Chapter 16 集合论|集合论]]、[[Chapter 19 函数及其图像|函数及其图像]]、[[Chapter 20 直线方程|直线方程]]、[[Chapter 21 二次函数|二次函数]]、[[Chapter 26 三角函数|三角函数]]、[[Chapter 28 不等式 (II)|不等式(II)]]、[[Chapter 29 平面几何 (II)|平面几何(II)]]

---

## 30.1　平面几何中的轨迹（Loci in Plane Geometry）

> **本节难度上限**：T B- ｜ C D+ ｜ E B- ｜ Q B-

> 本节从纯几何的角度建立轨迹的概念，先用它把几个基本几何对象各写成一条点集条件（§30.1.2），再逐条走一遍两条同型条件的基本轨迹（§30.1.3），为 §30.2 的一切计算备好语言。至于求解时的等价性风险，留到 §30.2.1 的第五步就地处理。工具都是老朋友：[[Chapter 16 集合论|集合论]] 的集合语言、[[Chapter 8 平面几何 (I)|平面几何(I)]] 的两点间距离与点到直线的距离、[[Chapter 20 直线方程|直线方程]] 的斜率与三点共线判定、[[Chapter 28 不等式 (II)|不等式(II)]] 的半平面，以及上一章 §29.1.1 与 §29.3.1 的两条等距引理。

### 30.1.1　动点的限制条件（Constraints on a Moving Point）

§16.1.1 把含自由变量的陈述句称为**开放命题**，概括原则说明：每一个开放命题都概括出一个集合，集合就是开放命题的外延，用描述法记作 $\{x : P(x)\}$。§20.1.2 又用这套语言重述了几何图形，§20.3.2 更进一步：一条直线恰好就是一个二元一次方程的解集。本节要建立的概念属于同一家族：把开放命题换成**几何条件**，它概括出的集合称为**轨迹**。

````ad-def
title: 定义（轨迹） | Definition（Locus）

把平面视为 $\mathbb{R}^2$（§16.3.2 的笛卡尔积），$C(P)$ 是含点变量 $P$ 的开放命题（§16.1.1 意义下），它给出点 $P$ 所受的一个几何条件。由概括原则，所有满足条件 $C$ 的点组成集合

$$\mathcal{L} = \{\,P \in \mathbb{R}^2 : C(P)\,\},$$

$\mathcal{L}$ 称为条件 $C$ 所确定的**轨迹**（Locus），或称作点 $P$ 的**轨迹**。

**动点**：轨迹中的点 $P$ 惯称为**动点**（Moving Point）：位置受条件 $C$ 约束而变化，全部可能位置的集合就是 $\mathcal{L}$。

**坐标形式**：建立坐标系后动点记作 $P(x, y)$，条件成为关于两个实变元的开放命题 $C(x, y)$，轨迹随之有

$$\mathcal{L} = \{\,(x, y) \in \mathbb{R}^2 : C(x, y) \text{ 为真}\,\}.$$

**逐点判据**：任取一点 $(x_0, y_0)$，

$$(x_0, y_0) \in \mathcal{L} \iff C(x_0, y_0) \text{ 为真}.$$

> 描述法只是「取全部使 $C(P)$ 为真的 $P$」的记号缩写，不增添新含义；用文字说，轨迹就是满足某一特定几何条件的所有点组成的集合。

**直观理解**：设想平面上有一个点按某种规则运动：规则是「与定点 $O$ 保持距离 $r$」，它划过的痕迹是圆（如图 30-1 所示）；规则是「与两定点 $A$、$B$ 保持等距」，它划过的痕迹是线段 $\overline{AB}$ 的垂直平分线。规则不同，痕迹不同。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-2.6,0)--(2.9,0);
  \draw[gray,->] (0,-2.6)--(0,2.9);
  \draw[blue!65!black,very thick] (0,0) circle (2);
  \coordinate (O) at (0,0);
  \coordinate (P1) at (1,1.7321);
  \coordinate (P2) at (-1.9696,0.3473);
  \coordinate (P3) at (1,-1.7321);
  \coordinate (Q) at (0.6,-0.5);
  \draw[dashed] (O)--(P1);
  \draw[dashed] (O)--(P2);
  \draw[dashed] (O)--(P3);
  \draw[gray,densely dashed,thick] (O)--(Q);
  \draw (0.408,0.919)--(0.592,0.813);
  \draw (0.739,0.535)--(0.775,0.743);
  \draw (0.408,-0.919)--(0.592,-0.813);
  \fill (O) circle (1.6pt);
  \fill (P1) circle (2.4pt);
  \fill (P2) circle (2.4pt);
  \fill (P3) circle (2.4pt);
  \fill (Q) circle (2.0pt);
  \node[above right] at (1.08,1.79) {$P_1$};
  \node[above left] at (-2.03,0.42) {$P_2$};
  \node[below right] at (1.08,-1.79) {$P_3$};
  \node[above right] at (0.66,-0.44) {$Q$};
  \node[left] at (0.52,1.02) {$r$};
  \node[right] at (1.05,-0.85) {$OQ<r$};
  \node at (2.78,-0.24) {$x$};
  \node at (-0.28,2.78) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-1：条件 $OP=r$ 确定的轨迹，是以 $O$ 为圆心、$r$ 为半径的圆。
>
> $P_1$、$P_2$、$P_3$ 到 $O$ 的距离都等于 $r$（三道单撇），都在轨迹上；
>
> $Q$ 满足 $OQ<r$，不满足条件，也不在轨迹上。

````

````ad-note
title: 注记（轨迹的方程） | Note（Equation of a Locus）

条件 $C(P)$ 写成坐标，就是一个含 $x$、$y$ 的代数式。例如「$OP = r$」写成

$$\sqrt{x^2 + y^2} = r,$$

「$PA = PB$」写成

$$\sqrt{(x - x_A)^2 + (y - y_A)^2} = \sqrt{(x - x_B)^2 + (y - y_B)^2};$$

把式子整理成一端为零的形状，就记作 $F(x, y) = 0$。

这个代数式就是轨迹 $\mathcal{L}$ 的**方程**（Equation of a Locus）：它不是新对象，只是同一条条件的另一种写法；$x$、$y$ 正是动点 $P$ 的坐标，方程的解集就是轨迹本身。§20.3.2 把直线认作二元一次方程的解集，是这条对应关系最现成的实例。
````

````ad-note
title: 注记（轨迹的几何意义） | Note（Geometric Meaning of a Locus）

轨迹 $\mathcal{L}$ 是一个点集，它的**几何意义**（Geometric Meaning）就是把这个点集放到平面上说清楚它呈现什么**形状**（Shape）、占在什么**位置**（Position）：形状说的是它属于哪一类图形，位置说的是它是这一类里的哪一个。

两件实例：轨迹「以 $O$ 为圆心、$r$ 为半径的圆」（§30.1.1 的定义（轨迹）与图 30-1），形状是圆，位置由圆心与半径说定；轨迹「线段 $\overline{AB}$ 的垂直平分线」（§30.1.3 基本轨迹一），形状是直线，位置由垂直平分线这一条件说定。

形状与位置缺一不可：只说「一个圆」或「一条直线」，读者不知道是哪一个圆、哪一条直线，几何意义就没有说全。**完整描述一条轨迹，就是把它的形状与位置一并说出来**；这是本章一切描述题的标准，§30.1.3 的警告与 §30.2.2 注记（课程要求的三类轨迹方程）用的都是这个口径。

几何意义与方程分工不同：几何意义是轨迹自身的形状与位置，与坐标系无关；方程是轨迹嵌入坐标系后的代数写法（注记（轨迹的方程）），同一个圆取不同的坐标原点，方程随之改变，几何意义不变。
````

````ad-note
title: 注记（完备性与纯粹性） | Note（Completeness and Exclusiveness）

把「$(x_0, y_0) \in \mathcal{L} \iff C(x_0, y_0)$ 为真」拆成两个方向，就得到轨迹的两个性质。它们不列入定义，却是从本节到 §30.2 一切检验的标准：

1. **完备性（Completeness）**：所有满足条件 $C$ 的点都在轨迹上，即 $C(x_0, y_0)$ 为真 $\implies (x_0, y_0) \in \mathcal{L}$，轨迹「不少」；
2. **纯粹性（Exclusiveness）**：轨迹上的每一点都满足条件 $C$，即 $(x_0, y_0) \in \mathcal{L} \implies C(x_0, y_0)$ 为真，轨迹「不多」。

两个方向各有一幅对照图，条件都取作「$OP = r$」（轨迹应是以 $O$ 为圆心、$r$ 为半径的圆）。先看完备性被破坏的情形：候选的点集漏掉了圆上一点 $P$，它满足条件却不在集合里（如图 30-2A 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-2.6,0)--(2.9,0);
  \draw[gray,->] (0,-2.6)--(0,2.9);
  \draw[blue!65!black,very thick] (0,0) circle (2);
  \coordinate (O) at (0,0);
  \coordinate (P) at (1.7321,1.0);
  \draw[dashed] (O)--(P);
  \fill (O) circle (1.6pt);
  \draw[fill=white] (1.7321,1.0) circle (2.2pt);
  \node[below left] at (1.62,0.88) {$P$};
  \node[left] at (0.94,0.9) {$r$};
  \node at (2.78,-0.24) {$x$};
  \node at (-0.28,2.78) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-2A：集合少了一点。
>
> 空心点 $P$ 在圆上，满足 $OP=r$，却没被收进集合。

再看纯粹性被破坏的情形：候选的点集把圆心 $O$ 也收了进来，而 $OO = 0 < r$，它并不满足条件（如图 30-2B 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-2.6,0)--(2.9,0);
  \draw[gray,->] (0,-2.6)--(0,2.9);
  \draw[blue!65!black,very thick] (0,0) circle (2);
  \coordinate (O) at (0,0);
  \coordinate (P1) at (-1,1.7321);
  \coordinate (P2) at (1.5321,-1.2856);
  \draw[dashed] (O)--(P1);
  \draw[dashed] (O)--(P2);
  \draw[red!65!black,very thick] (O) circle (0.32);
  \draw[red!65!black,very thick] (-0.19,-0.19)--(0.19,0.19);
  \draw[red!65!black,very thick] (-0.19,0.19)--(0.19,-0.19);
  \fill (P1) circle (2.4pt);
  \fill (P2) circle (2.4pt);
  \fill (O) circle (2.6pt);
  \node[right] at (0.44,0.16) {$O$};
  \node[above left] at (-0.84,1.86) {$P_1$};
  \node[right] at (1.62,-1.36) {$P_2$};
  \node at (2.78,-0.24) {$x$};
  \node at (-0.28,2.78) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-2B：集合多了一点。
>
> $P_1$、$P_2$ 满足 $OP=r$，在轨迹上；被叉号标出的圆心 $O$ 不满足条件，却混在集合里。

两个方向同时成立，条件与点集才互相完全确定：漏一点则不完备，多一点也不纯粹。

````

````ad-note
title: 注记（轨迹不一定涉及运动） | Note（A Locus Need Not Involve Motion）

「动点」只是直观形象，数学中的轨迹不一定涉及点的移动。轨迹是一个集合，由条件 $C$ 一次性确定：其上的点并非依次「运动」到位，描述法 $\{P : C(P)\}$ 里也没有时间与速度的位置。运动的图景帮助想象与描绘，集合的视角保证论证的严格，两种视角相辅相成。证明「$\mathcal{L}$ 就是某图形」时，用的是完备性与纯粹性的双向论证，而不是「看着点跑到哪里」。
````

集合的视角立好之后，许多熟悉的图形都可以改用轨迹的语言来说。本节余下两小节的分工是：§30.1.2 把线段、圆、半平面与拋物线各写成一条点集条件，直线则只作轨迹语言的重述；§30.1.3 逐一走一遍条件同型的两种基本轨迹。两节连起来，为 §30.2 的一切代数计算备好语言。它们的成果最后都要按几何意义说出来：轨迹是什么形状、在什么位置。

### 30.1.2　几何对象的轨迹定义（Defining Geometric Objects by Loci）

> 本节把 §30.1.1 建立的语言反过来用：不是「给图形找方程」，而是「给条件定图形」。线段、圆、拋物线这些老朋友，本节把它们改写成一句话的**轨迹定义**：说清动点在什么条件下运动，它形成的轨迹就是什么图形。直线已在 §20.1.2 定义过，本节只用轨迹语言重述一次。本节不引入新的课程要求；角与垂直沿用第八、九章的说法（§8.1 已给两直线垂直的定义），本节不重述。

前面各章认出这些图形，走过三条路：

- **直观**：§8.1「基本元素」小节把点、线、面列为几何学的原始概念，直线靠图形与记号认识；
- **作图动作**：圆规两脚保持定长转一周画出圆，三角尺贴着定直线推一格画出平行线；
- **方程**（§20.3.2、§21.1.1）：先有方程，再认它的解集是什么图形。

三条路各有各的用处，但都不是轨迹题要的方向。轨迹要的是**先给几何条件，再问条件定出什么图形**。本节就按这个方向，把几个常用图形各写一次定义；往后各章再说「线段」「圆」「拋物线」，指的都是本节给出的点集。三点共线的判据已在 §20.3.1 建立，本节直接取用它的两条引理。

每条定义都写成同一个句式：**动点 $P$ 满足某个条件 $\iff$ $P$ 落在某个图形上**；按 §30.1.1 的定义，这个条件确定的点集就是动点 $P$ 的轨迹，也就是那个图形本身。条件只用到两样东西：§20.3.1 的共线判据，与 §8.1、§8.6 的两类距离。

先把「三点在同一条直线上」的判据摆好。这件事 §20.3.1 已办完：那里的两条引理（三点共线的距离刻画、三点共线的坐标判据）与推论（过两点的直线方程）把直线写成一个方程，本节取用它们的结论。

其一，距离判据。三点共线 $\iff$ 三式 $PA + PB = AB$、$PA + AB = PB$、$PB + AB = PA$ 中至少有一式成立（三点互不重合时恰有一式成立）；其中 $PA + PB = AB$ 这一式，就是「$P$ 介于 $A$、$B$ 之间」的距离说法，本节下面把它写成一个集合。

其二，坐标判据。设 $A(x_1, y_1)$、$B(x_2, y_2)$、$P(x, y)$，则三点共线 $\iff$ 下面这条等式成立：

$$(x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1).$$

它不含斜率，因而铅垂线的情形也在内。把这条等式展开、移项就是 $ax + by + c = 0$（§20.3.1 的推论），所以共线点集天然就是一个二元一次方程的解集。

有了这两条判据，下面几个图形都能写成动点的轨迹。

````ad-def
title: 定义（线段） | Definition（Line Segment）

设 $A$、$B$ 为平面上两个定点，$A \ne B$，坐标依次为 $A(x_1, y_1)$、$B(x_2, y_2)$，动点记作 $P(x, y)$。

**介于两点之间**：动点 $P$ 满足 $PA + PB = AB$ 时，称 $P$ **介于** $A$、$B$ 之间（含 $P = A$、$P = B$ 两个端点）。由 §20.3.1 的引理（三点共线的距离刻画），这一等式自动保证 $P$ 与 $A$、$B$ 共线。

**线段 $\overline{AB}$**：动点 $P$ 在条件 $PA + PB = AB$ 下运动，它形成的轨迹就是以 $A$、$B$ 为两端点的**线段**，即介于 $A$、$B$ 之间的所有点的集合：

$$\overline{AB} = \{\,P : PA + PB = AB\,\}.$$

这条线段如图 30-3A 所示，粗蓝部分即所求点集。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-2,-1);
  \coordinate (B) at (2,1);
  \draw[gray!60, ->] (-3.6,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.2) -- (0,2.4) node[above] {$y$};
  \draw[gray!50, dashed] (-3.6,-1.8) -- (3.6,1.8);
  \draw[blue!65!black, very thick] (A) -- (B);
  \fill (A) circle (1.3pt) node[below left] {$A$};
  \fill (B) circle (1.3pt) node[above right] {$B$};
\end{tikzpicture}
\end{document}
```

> 图 30-3A：线段 $\overline{AB}$。
>
> 粗蓝部分为 $PA + PB = AB$ 的点集；两端之外的部分以灰虚线画出，表示不在线段上。
````

````ad-note
title: 注记（直线的轨迹读法） | Note（A Straight Line Read as a Locus）

直线不在本节定义：它已在 §20.1.2 定义为与 $A$、$B$ 共线的所有点组成的集合 $L_{AB}$，本节只把它改写成轨迹语言，不另下定义。

**直线 $AB$**：动点 $P$ 在条件「$P$ 与 $A$、$B$ 共线」下运动，它形成的轨迹就是过 $A$、$B$ 两点的**直线**，即与 $A$、$B$ 共线的所有点的集合：

$$\overleftrightarrow{AB} = \{\,P : P \text{ 与 } A\text{、} B \text{ 共线}\,\} = L_{AB}$$

用 §20.3.1 的引理（三点共线的坐标判据）把「共线」换成坐标，就得到它的坐标形式

$$\overleftrightarrow{AB} = \{\,(x, y) : (x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1)\,\}$$

本节两幅图共用同一条直线 $y = \dfrac{1}{2}x$ 与同一对点 $A$、$B$，差别只在粗线画到哪。

轨迹的条件是关于 $P$ 的开放命题，按 §30.1.1 确定一个点集，「$P$ 在图形上」与「$P$ 满足条件」互为等价；线段 $\overline{AB}$ 与直线 $AB$ 都是如此。直线 $AB$ 如图 30-3B 所示。
```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-2,-1);
  \coordinate (B) at (2,1);
  \draw[gray!60, ->] (-3.6,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.2) -- (0,2.4) node[above] {$y$};
  \draw[blue!65!black, very thick, <->] (-3.6,-1.8) -- (3.6,1.8);
  \fill (A) circle (1.3pt) node[below left] {$A$};
  \fill (B) circle (1.3pt) node[above right] {$B$};
\end{tikzpicture}
\end{document}
```

> 图 30-3B：直线 $AB$。
>
> 整条线都是点集，两端都无限延伸；$A$、$B$ 是其上两个定点。
````

这里有一层分寸：§8.1「基本元素」小节把直线列为几何学的原始概念，§20.1.2 与本节都不推翻这一点，「直线是什么样的东西」仍由公理回答，给出的是**点 $P$ 落在直线 $AB$ 上**的可检验条件。有了这个条件，直线与线段就成了 $\mathbb{R}^2$ 的两个可运算的子集，「$P$ 在线段 $\overline{AB}$ 上吗」这类问题从此有非此即彼的答案。

````ad-note
title: 注记（直线与二元一次方程的两种读法） | Note（A Line and a Linear Equation, Read Two Ways）

坐标式再化一步就是 $ax + by + c = 0$ 的形状：把这条坐标等式展开、移项，得

$$(y_1 - y_2)\,x + (x_2 - x_1)\,y + \big[(x_1 - x_2) y_1 + (y_2 - y_1) x_1\big] = 0,$$

其中 $x$、$y$ 的系数 $y_1 - y_2$ 与 $x_2 - x_1$ 由 $A \ne B$ 保证不全为零，故它确是一条直线。

于是「直线 $=$ 过 $A$、$B$ 的共线点集」与「直线 $=$ 二元一次方程的解集」（§20.1.2 的定义、§20.3.1 的推论、§20.3.2 的推论）说的是同一批点集。

「直线方程」与「直线型轨迹的方程」于是是同一对象的两种读法：动点 $P$ 满足 $ax + by + c = 0$，轨迹是一条直线 $L$；反过来给定直线 $L$，它的方程就是这样一个二元一次方程，如图 30-4 所示。下文两种基本轨迹的图形都由直线组成，用坐标算出的方程也就是一次方程。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (P) at (-2,0);
  \coordinate (Q) at (0,1);
  \coordinate (R) at (2,2);
  \draw[gray!60, ->] (-3.6,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.2) -- (0,3.4) node[above] {$y$};
  \draw[blue!65!black, very thick] (-3.4,-0.7) -- (3.4,2.7);
  \node[blue!65!black, below right] at (3.2,2.55) {$\ell: ax+by+c=0$};
  \fill (P) circle (1.3pt) node[below left] {$P$};
  \fill (Q) circle (1.3pt) node[above left] {$Q$};
  \fill (R) circle (1.3pt) node[below right] {$R$};
\end{tikzpicture}
\end{document}
```

> 图 30-4：直线 $\ell$ 与其方程互为确定。
>
> 直线 $\ell$ 上每一点（如图中的 $P$、$Q$、$R$）的坐标都满足 $ax + by + c = 0$；
>
> 反过来，这个方程的每一个解 $(x, y)$ 对应的点都在 $\ell$ 上。
````

直线与线段对付的是「共线」，圆与抛物线对付的则是「距离的比较」。圆所满足的条件正是课程要求里「与一点保持固定距离」这一类，本节把它与紧挨着的两类点集一并写清。

````ad-def
title: 定义（圆、圆的内部与圆盘） | Definition（Circle, Interior and Disk）

设 $O$ 为定点，$r > 0$ 为常数，动点记作 $P(x, y)$。

**圆**：动点 $P$ 到定点 $O$ 的距离恒等于定长 $r$，它形成的轨迹就是以 $O$ 为**圆心**、$r$ 为**半径**的**圆**，记作 $C(O, r)$：

$$C(O, r) = \{\,P : OP = r\,\};$$

以 $O$ 为原点建立坐标系时，两边平方得它的坐标形式

$$x^2 + y^2 = r^2$$

（两边非负，平方是等价变形，§6.3.1）。这个条件正是课程要求里「与一点保持固定距离」那一类，答案已在定义里给出，§30.1.3 与 §30.2.1 都不再另立定理，如图 30-5A 所示：$P_1$、$P_2$ 是圆上两点，$OP_1 = OP_2 = r$，虚线段 $\overline{OP_1}$ 即半径。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (P1) at (60:2);
  \coordinate (P2) at (200:2);
  \draw[blue!65!black, very thick] (O) circle (2);
  \draw[dashed] (O) -- (P1);
  \node[left] at (0.55,0.87) {$r$};
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \fill (P1) circle (1.3pt) node[above right] {$P_1$};
  \fill (P2) circle (1.3pt) node[below left] {$P_2$};
\end{tikzpicture}
\end{document}
```

> 图 30-5A：圆 $C(O, r)$。
>
> 曲线即 $\{\,P : OP = r\,\}$。

**圆的内部**与**圆的外部**：条件分别换成 $OP < r$ 与 $OP > r$，动点 $P$ 的轨迹就是圆的内部与外部：

$$\{\,P : OP < r\,\}, \qquad \{\,P : OP > r\,\}.$$

图 30-5B 中 $Q$ 落在圆内（$OQ < r$），$R$ 落在圆外（$OR > r$），两处虚线段即两个距离。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (Q) at (0.5,0.7);
  \coordinate (R) at (2.9,1.3);
  \draw[thick] (O) circle (2);
  \draw[dashed] (O) -- (Q);
  \draw[dashed] (O) -- (R);
  \node[left] at (0.25,0.35) {$OQ<r$};
  \node[below right] at (2.2,0.9) {$OR>r$};
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \fill (Q) circle (1.3pt) node[above right] {$Q$};
  \fill (R) circle (1.3pt) node[above right] {$R$};
\end{tikzpicture}
\end{document}
```

> 图 30-5B：圆的内部与外部。
>
> 圆以细线画出，$OQ < r$ 与 $OR > r$ 两段以虚线连出。

**圆盘**：条件换成 $OP \le r$，动点 $P$ 的轨迹就是圆及其内部的并，称为**圆盘**：

$$\{\,P : OP \le r\,\}.$$

图 30-5C 的阴影部分即圆盘（含边界圆），$P$ 为盘中一点。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (P) at (1.2,0.9);
  \fill[gray, opacity=0.18] (O) circle (2);
  \draw[blue!65!black, very thick] (O) circle (2);
  \draw[dashed] (O) -- (P);
  \node[above] at (0.5,0.95) {$OP \le r$};
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \fill (P) circle (1.3pt) node[above right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 30-5C：圆盘。
>
> 阴影部分含边界圆。

````

圆周、周长、圆盘三种说法的分界要分清：

- **圆周**是 $OP = r$ 那条曲线本身；
- **周长**是圆周这条曲线的长度 $2\pi r$；
- **圆的面积**严格说是**圆盘**这个区域的面积 $\pi r^2$。

§8.9「圆的基本概念」小节已把**圆周**（那条曲线本身）与**周长**（圆周一周的长度 $2\pi r$）分立；本节再加一层集合式的分界：$OP = r$ 是圆周，$OP < r$ 是圆的内部，$OP \le r$ 是圆盘；同节说「圆面积 $\pi r^2$」，指的也是圆盘。§29.2.1 讨论点与圆的位置关系时比较 $OP$ 与 $r$ 的大小，做的正是判定 $P$ 落在上面哪一个集合里。

再说「在哪一侧」。好几处论证要靠位置断言：§28.2.2 的可行区域、§30.2.1 里的「分居 $L$ 两侧」与「夹在 $L_1$、$L_2$ 之间」，说的都是同一件事，此前只凭直观。

````ad-def
title: 定义（半平面、同侧与异侧） | Definition（Half-Planes, Same Side and Opposite Sides）

设直线 $L : ax + by + c = 0$，其中 $a$、$b$ 不全为零。

**半平面**：动点 $P(x, y)$ 在 $ax + by + c > 0$ 下运动的轨迹记作 $H_{+}$，在 $ax + by + c < 0$ 下运动的轨迹记作 $H_{-}$：

$$H_{+} = \{\,(x, y) : ax + by + c > 0\,\}, \qquad H_{-} = \{\,(x, y) : ax + by + c < 0\,\}$$

两者称为 $L$ 确定的两个**半平面**，不含边界 $L$。

**闭半平面**：把边界 $L$ 并进来，所得的集合

$$\{\,(x, y) : ax + by + c \ge 0\,\}, \qquad \{\,(x, y) : ax + by + c \le 0\,\}$$

称为闭半平面。至于 $ax + by + c = 0$，它就是直线 $L$ 自身的轨迹（上面已把直线写成共线点集）。

**三块之分**：任一实数或正、或负、或零，故 $H^{+}$、$L$、$H^{-}$ 两两不相交，而且并为整个平面。

**同侧**：两点 $P(x_P, y_P)$、$Q(x_Q, y_Q)$ 使

$$(ax_P + by_P + c)(ax_Q + by_Q + c) > 0,$$

即两值同号，则称 $P$、$Q$ 在 $L$ **同侧**，如图 30-6A 所示（两点都取在 $L$ 的上方一侧）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.9,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.4) -- (0,3.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (-3.5,-0.75) -- (3.5,2.75);
  \node[below right] at (-3.4,-0.7) {$\ell: ax+by+c=0$};
  \fill (0,3) circle (1.3pt) node[above right] {$P$};
  \fill (2,3) circle (1.3pt) node[above right] {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 30-6A：同侧的两点。
>
> 两点都在 $\ell$ 的上方一侧，代入 $ax + by + c$ 所得两值同号。

**异侧**：把上面的乘积换成小于 $0$，即两值异号，则称 $P$、$R$ 在 $L$ **异侧**，如图 30-6B 所示（$P$ 在 $L$ 上方、$R$ 在 $L$ 下方）。至少有一点在 $L$ 上时，同侧与异侧都不谈。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray!60, ->] (-3.9,0) -- (4.2,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.6) -- (0,3.6) node[above] {$y$};
  \draw[blue!65!black, very thick] (-3.5,-0.75) -- (3.5,2.75);
  \node[below right] at (-3.4,-0.7) {$\ell: ax+by+c=0$};
  \fill (0,3) circle (1.3pt) node[above right] {$P$};
  \fill (2,-1) circle (1.3pt) node[below right] {$R$};
\end{tikzpicture}
\end{document}
```

> 图 30-6B：异侧的两点。
>
> $P$ 在 $\ell$ 上方、$R$ 在 $\ell$ 下方，两值异号。

````

这就是 §28.2.1 半平面定理中 $H_{+}$、$H_{-}$ 的正式名字，也说明「同侧」的判据为什么只看乘积的符号而不看大小：$ax + by + c$ 是定义在 $\mathbb{R}^2$ 上的一个表达式，被 $L$ 分成的两块区域上它各取一种符号。往后各节说「$P$ 在 $L$ 的某一侧」，一律按这一条判定；§28.2.2 的可行区域随之读作若干个闭半平面的交。

最后是抛物线。§21.1.1 把抛物线定义为二次函数 $y = ax^2 + bx + c$ 的图像，并已把它的几何定义指向本节；本节就把它写成一条动点条件。

````ad-def
title: 定义（抛物线） | Definition（Parabola）

设 $F$ 为平面内一定点，$\ell$ 为一条不经过 $F$ 的定直线，$d(P, \ell)$ 表示点 $P$ 到 $\ell$ 的距离（§8.6，坐标公式见 §20.5.1）。

**抛物线**：动点 $P(x, y)$ 在条件

$$PF = d(P, \ell)$$

下运动，即它到定点 $F$ 的距离始终等于它到定直线 $\ell$ 的距离。这样形成的轨迹称为一条**抛物线**，记作 $\mathcal{P}$：

$$\mathcal{P} = \{\,P : PF = d(P, \ell)\,\}.$$

如图 30-7 所示，$M$ 为 $P$ 向 $\ell$ 所作垂线的垂足，条件即 $PF = PM$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (F) at (0,1.5);
  \coordinate (P) at (3,1.5);
  \coordinate (M) at (3,-1.5);
  \draw[gray!60, ->] (-4.2,0) -- (4.4,0) node[below] {$x$};
  \draw[gray!60, ->] (0,-2.2) -- (0,3.4) node[above] {$y$};
  \draw[dashed] (-4.2,-1.5) -- (4.2,-1.5);
  \node[below left] at (-4.1,-1.5) {$\ell$};
  \draw[blue!65!black, very thick, domain=-3.6:3.6, samples=80] plot (\x, {\x*\x/6});
  \draw[dashed] (F) -- (P);
  \draw[dashed] (P) -- (M);
  \draw (1.5,1.6) -- (1.5,1.4);
  \draw (3.1,-0.75) -- (2.9,-0.75);
  \fill (F) circle (1.3pt) node[below left] {$F$};
  \fill (P) circle (1.3pt) node[above right] {$P$};
  \fill (M) circle (1.2pt) node[below right] {$M$};
\end{tikzpicture}
\end{document}
```

> 图 30-7：抛物线的定义条件。
>
> 定点 $F$、定直线 $\ell$（虚线，不经过 $F$）；$P$ 为抛物线上一点，$PM$ 垂直于 $\ell$，垂足为 $M$。
>
> $PF$ 与 $PM$ 各带一道单撇，表示两段相等。
````

定点 $F$ 与定直线 $\ell$ 各有专名（焦点、准线），抛物线另有顶点、对称轴与焦距，五个要素合起来把一条抛物线说定；这些都留在 §30.3.1 交代，本节只把「抛物线」这个名字挂到一个动点条件上。为什么要挂：§30.2.2 起本章要会求「抛物线型的轨迹方程」，而 $\{P : PF = d(P, \ell)\}$ 正是这类轨迹的条件式。至于它为什么与 $y = ax^2 + bx + c$ 的图像是同一条曲线，由 §30.3.2 与 §30.3.3 推导：开口向上、顶点在原点时，两者同为 $x^2 = 4py$ 与 $y = \dfrac{1}{4p}x^2$。

````ad-note
title: 注记（同一模式还能定义的图形） | Note（More Figures Defined by the Same Pattern）

本注记只述结论、不作证明，以下曲线超出 DSE 常规课程的要求。把定义里的等式换一个写法，同一套「条件 $\to$ 点集」的做法还能给出别的曲线：

**椭圆**：动点 $P$ 到两定点 $A$、$B$ 的距离之和恒为常数 $k$，且 $k > AB$：

$$PA + PB = k,$$

它形成的轨迹就是椭圆，如图 30-8A 所示（$P$ 在曲线上，虚线两段即 $PA$、$PB$）。§30.2.2 直接法之四会取 $A(-1, 0)$、$B(1, 0)$、$k = 4$，把这条曲线的方程一并算出来。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-1.5,0);
  \coordinate (B) at (1.5,0);
  \coordinate (P) at (1,1.1456);
  \draw[blue!65!black, very thick] (0,0) ellipse (2 and 1.3229);
  \draw[dashed] (P) -- (A);
  \draw[dashed] (P) -- (B);
  \node[above] at (-0.4,0.65) {$PA$};
  \node[above] at (1.35,0.6) {$PB$};
  \node[above] at (0,1.45) {$PA+PB=k>AB$};
  \fill (A) circle (1.2pt) node[below left] {$A$};
  \fill (B) circle (1.2pt) node[below right] {$B$};
  \fill (P) circle (1.3pt) node[above right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 30-8A：椭圆。
>
> $A$、$B$ 为两定点，$P$ 为曲线上的点，$PA$、$PB$ 以虚线连出；此处 $PA + PB = k > AB$。

**双曲线**：动点 $P$ 到两定点 $A$、$B$ 的距离之差的绝对值恒为常数 $k$，且 $0 < k < AB$：

$$\lvert PA - PB \rvert = k,$$

它形成的轨迹就是双曲线，两支各对应差取正与取负的一种，如图 30-8B 所示（$P$ 画在右支上）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-2,0);
  \coordinate (B) at (2,0);
  \coordinate (P) at (1.5,1.9365);
  \draw[blue!65!black, very thick, variable=\t, domain=-1.35:1.35, samples=60] plot ({cosh(\t)}, {1.7321*sinh(\t)});
  \draw[blue!65!black, very thick, variable=\t, domain=-1.35:1.35, samples=60] plot ({-cosh(\t)}, {1.7321*sinh(\t)});
  \draw[dashed] (P) -- (A);
  \draw[dashed] (P) -- (B);
  \node[above] at (-0.25,1.15) {$PA$};
  \node[right] at (1.72,0.9) {$PB$};
  \node[above] at (0,2.45) {$\left|PA-PB\right|=k<AB$};
  \fill (A) circle (1.2pt) node[below left] {$A$};
  \fill (B) circle (1.2pt) node[below right] {$B$};
  \fill (P) circle (1.3pt) node[above right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 30-8B：双曲线。
>
> 曲线分左、右两支，$P$ 画在右支上，$PA$、$PB$ 以虚线连出；此处 $\lvert PA - PB \rvert = k < AB$。

**阿波罗尼斯圆**：动点 $P$ 到两定点的距离之比恒为常数 $k$，且 $k > 0$、$k \ne 1$：

$$PA = k \cdot PB,$$

它形成的轨迹是一个圆。$k = 1$ 时条件退化成 $PA = PB$，轨迹就是基本轨迹一的垂直平分线。

同一个条件，只把动点活动的舞台从平面换成空间，轨迹就换一个图形：$OP = r$ 在空间里给出的不是圆而是**球面**，球形「球面上所有点与球心等距」的说法正出于此。

抛物线之所以例外地写进定义，是因为「求抛物线型的轨迹方程」本身属课程要求。

````

各对象的轨迹刻画放在一起对照，可以看出「条件定图形」这套做法的规格。

````ad-note
title: 注记（几何对象的轨迹刻画一览） | Note（Geometric Objects Written as Loci）

| 图形（即轨迹） | 动点 $P$ 满足的条件 | 轨迹的坐标式 | 前文的说法 | 本节改写为 |
|:---|:---|:---|:---|:---|
| 直线 $AB$ | $P$ 与 $A$、$B$ 共线 | $(x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1)$（§20.3.1） | §20.1.2 的定义（平面上的直线） | 无；定义在 §20.1.2，判据与方程已在 §20.3.1、§20.3.2 建立 |
| 线段 $\overline{AB}$ | $PA + PB = AB$ | 直线式再加两端之间的限制 | §8.1「线段的记法与长度」小节「两点之间的部分」 | 「之间」的距离刻画 |
| 圆 $C(O, r)$ | $OP = r$ | $x^2 + y^2 = r^2$（$O$ 为原点） | §8.9「圆的基本概念」小节文字集合、§29.1.1 符号式 | 与内部、圆盘分立；即「与一点保持固定距离」这一类条件 |
| 圆的内部／圆盘 | $OP < r$／$OP \le r$ | 同型不等式 | §29.2.1 比 $OP$ 与 $r$ 的大小 | 正式的集合式；圆面积即圆盘面积 |
| 半平面／同侧 | $ax + by + c > 0$；两值同号 | 同左 | §28.2.1 内嵌于定理 | 术语的正式定义与符号判据 |
| 抛物线 | $PF = d(P, \ell)$，$F \notin \ell$ | 标准方程见 §30.3.2 | §21.1.1 二次函数的图像 | 几何定义前置，专名留 §30.3.1 |
| 角、垂直 | 不写成条件（遵从直观） | 垂直的坐标判据 $m_1 m_2 = -1$（§20.4.3） | §8.1「角与度量」小节（角、直角的分类与两直线垂直的定义） | 本节不重定义 |

读法只有一条：表中第二列是动点 $P$ 满足的条件，第一列就是这个条件确定的轨迹。表中七行的条件只用到两样原料：两点间的距离（§8.1「线段的记法与长度」小节）与点到直线的距离（§8.6），而把这两样写成方程的语言由坐标系提供。条件不同，轨迹不同，这就是「条件定图形」的全部内容。
````

对象有了定义，下一节把课程要求的五类条件逐一带到这些定义上去。其中三类先已有着落：「与一点保持固定距离」就是圆的定义本身；「与一直线保持固定距离」与「与两平行线保持相等距离」两类都有现成的坐标公式可用，一并留给 §30.2.1 的定理。余下两类同型，条件都是「两段距离相等」，下一节各立定理与证明。

### 30.1.3　两种基本轨迹（The Two Basic Loci）

点到直线的距离（§8.6 的意义，坐标公式见 §20.5.1）记作 $d(P, L)$。上一节把「条件 $\to$ 图形」这条路铺好。课程要求列出五类条件，本节要立定理的是其中同型的两类：与两点保持相等距离、与两相交直线保持相等距离；另三类里，「与一点保持固定距离」就是上一节圆的定义，「与一直线保持固定距离」与「与两平行线保持等距」留到 §30.2.1 用坐标算。

描述轨迹时，**类型与位置都要说全**：「线段 $\overline{AB}$ 的垂直平分线」是完整的描述，只说「一条直线」不是；「以 $O$ 为圆心、$r$ 为半径的圆」是完整的描述，只说「一个圆」不是。

两条轨迹的呈现方式一致：条件与图形各说一次，条件写成点集，图形由定理点名；证明的两个方向分别对应纯粹性与完备性，工具是 §29.1.1、§29.3.1 两条等距引理。另外三类的描述与集合式不在这里重列：圆留在 §30.1.2 的定义里，「与定直线保持固定距离」与「与两平行线保持等距」两类连同其方程留在 §30.2.1 的定理里。

先看第一条。§29.1.1 的垂直平分线等距引理说「垂直平分线上的点到两端点等距，且到两端点等距的点在垂直平分线上」，用轨迹的语言重读，前半句是纯粹性，后半句是完备性。

````ad-thm
title: 定理（到两定点等距的点的轨迹） | Theorem（Locus of Points Equidistant from Two Fixed Points）

**基本轨迹一**：设 $A$、$B$ 为两定点，$\ell$ 为线段 $\overline{AB}$ 的垂直平分线。到 $A$、$B$ 距离相等的动点 $P(x, y)$ 的轨迹，就是整条 $\ell$：

$$\mathcal{L}_1 = \{\,P : PA = PB\,\} = \ell, \qquad \text{即} \qquad PA = PB \iff P \in \ell.$$

图形如图 30-9 所示。
```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-2,0);
\coordinate (B) at (2,0);
\coordinate (M) at (0,0);
\coordinate (P) at (0,1.8);
\draw (A) -- (B);
\draw[->] (0,-0.55) -- (0,2.5) node[right] {$\ell$};
\draw[dashed] (P) -- (A) (P) -- (B);
\draw (0.22,0) -- (0.22,0.22) -- (0,0.22);
\draw (-1,-0.1) -- (-1,0.1) (1,-0.1) -- (1,0.1);
\draw (-1.067,0.974) -- (-0.933,0.826) (0.933,0.826) -- (1.067,0.974);
\fill (A) circle (1.2pt) node[below left] {$A$};
\fill (B) circle (1.2pt) node[below right] {$B$};
\fill (M) circle (1.2pt) node[below left] {$M$};
\fill (P) circle (1.3pt) node[right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 30-9：$\ell$ 过 $AB$ 的中点 $M$ 且垂直于 $AB$（直角记号）。
>
> $\ell$ 上任一点 $P$ 到 $A$、$B$ 等距（$PA$、$PB$ 上的单撇），$AM = MB$（双撇）。
````

````ad-proof
title: 证明 | Proof

设 $A$、$B$ 为两定点，$\ell$ 为线段 $\overline{AB}$ 的垂直平分线，$P(x, y)$ 为动点。§29.1.1 的垂直平分线等距引理已经把两个方向都证好了：

> 「若一点在一线段的垂直平分线上，则该点到线段两端点的距离相等；反之，到一线段两端点距离相等的点，必在该线段的垂直平分线上。」

前半句即纯粹性：$\ell$ 上的点 $P$ 满足 $PA = PB$；

后半句即完备性：满足 $PA = PB$ 的点必在 $\ell$ 上。

两个方向合并，$PA = PB \iff P \in \ell$，即 $\mathcal{L}_1 = \ell$，轨迹恰为整条垂直平分线。

````

第二条轨迹同样来自上一章：§29.3.1 证明了角平分线的等距性质。这次条件换成「到两条相交直线等距」，答案比一条角平分线多一半：两对对顶角各有一条平分线，故陈述要一次给出两个结论。

````ad-thm
title: 定理（到两相交直线等距的点的轨迹） | Theorem（Locus of Points Equidistant from Two Intersecting Lines）

**基本轨迹二**：设直线 $L_1$、$L_2$ 相交于点 $O$，$b_1$、$b_2$ 为 $L_1$、$L_2$ 的两条角平分线（两对对顶角各一条）。到 $L_1$、$L_2$ 距离相等的动点 $P(x, y)$ 满足两个结论：

- **轨迹是两条角平分线**：$\mathcal{L}_2 = \{\,P : d(P, L_1) = d(P, L_2)\,\} = b_1 \cup b_2$；
- **两条角平分线互相垂直**：$b_1 \perp b_2$。

第一条用属于记号写开，就是对每一点 $P$ 都有

$$d(P, L_1) = d(P, L_2) \iff P \in b_1 \cup b_2.$$

两相交直线与它们的角平分线如图 30-10 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (-10:2.2) -- (170:2.2);
\draw (65:2.2) -- (245:2.2);
\draw[blue!65!black, very thick] (27.5:2.2) -- (207.5:2.2);
\draw[blue!65!black, very thick] (117.5:2.2) -- (297.5:2.2);
\node[above right] at (-10:2.3) {$L_1$};
\node[above right] at (65:2.3) {$L_2$};
\node[above right] at (27.5:2.32) {$b_1$};
\node[above left] at (117.5:2.32) {$b_2$};
\fill (0,0) circle (1.2pt);
\node at (271:0.5) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 30-10：$L_1$、$L_2$ 相交于 $O$，$b_1$、$b_2$ 是它们的两条角平分线。
>
> $b_1$ 平分一对对顶角，$b_2$ 平分另一对，两者都过交点 $O$。
````

````ad-proof
title: 证明 | Proof

设 $L_1$、$L_2$ 相交于 $O$，$b_1$、$b_2$ 是 $L_1$、$L_2$ 的两条角平分线，$P(x, y)$ 为动点；要证的有两条：$\mathcal{L}_2 = b_1 \cup b_2$，以及 $b_1 \perp b_2$。

**先证 $b_1 \perp b_2$**。

$L_1$、$L_2$ 的一对邻补角度数设为 $\alpha$、$\beta$，则 $\alpha + \beta = 180^\circ$（直线上的邻角，前文所学）。

两邻角的平分线各取一半，它们所夹角的度数为

$$\dfrac{\alpha}{2} + \dfrac{\beta}{2} = \dfrac{\alpha + \beta}{2} = \dfrac{180^\circ}{2} = 90^\circ,$$

故 $b_1 \perp b_2$，如图 30-11A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (-3.1,0) -- (3.1,0);
\draw (-1.6,-2.771) -- (1.6,2.771);
\draw[blue!65!black, very thick] (-2.25,-1.3) -- (2.25,1.3);
\draw[red!65!black, very thick] (1.3,-2.252) -- (-1.3,2.252);
\draw (0.2425,0.14) -- (0.1025,0.3825) -- (-0.14,0.2425);
\node[below] at (2.9,0.02) {$L_1$};
\node[right] at (1.62,2.75) {$L_2$};
\node[right] at (2.27,1.28) {$b_1$};
\node[left] at (-1.32,2.23) {$b_2$};
\fill (0,0) circle (1.2pt) node[below right] {$O$};
\end{tikzpicture}
\end{document}
```

> 图 30-11A：$L_1$、$L_2$ 相交于 $O$，四条平分线合成两条直线。
>
> $b_1$（蓝）平分一对对顶角，$b_2$（红）平分另一对，$O$ 处的直角记号即 $b_1 \perp b_2$。

**再证轨迹为两条角平分线**。

**（$\Leftarrow$）**设 $P$ 在 $b_1$ 上，$b_2$ 的情形同理。

若 $P = O$，则 $P$ 到两直线的距离同为 $0$，条件成立。

若 $P \ne O$，则 $P$ 位于 $b_1$ 所平分的两对顶角之一的内部（平分线与 $L_1$、$L_2$ 只有公共点 $O$）。

§29.3.1 的角平分线等距引理说：

> 「若一点在角的平分线上，则该点到角的两边等距。」

把它用在 $P$ 所在的那个角上：$P$ 到角两边（分别是 $L_1$、$L_2$ 的一部分）的距离相等，即 $d(P, L_1) = d(P, L_2)$，如图 30-11B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (P) at (1.905,1.1);
\coordinate (Q) at (1.905,0);
\coordinate (R) at (0.9526,1.6499);
\draw (-0.6,0) -- (3.2,0);
\draw (-0.3,-0.52) -- (1.55,2.684);
\draw[blue!65!black, very thick] (O) -- (2.45,1.4145);
\draw[dashed] (P) -- (Q) (P) -- (R);
\draw (1.755,0) -- (1.755,0.15) -- (1.905,0.15);
\draw (1.0276,1.7799) -- (1.1576,1.7049) -- (1.0826,1.5749);
\draw (1.845,0.55) -- (1.965,0.55);
\draw (1.3938,1.3144) -- (1.4638,1.4356);
\draw (0.75,0) arc (0:60:0.75);
\node[below] at (3.05,0.02) {$L_1$};
\node[right] at (1.57,2.66) {$L_2$};
\node[right] at (2.2,1.28) {$b_1$};
\node[below left] at (O) {$O$};
\fill (P) circle (1.3pt) node[above right] {$P$};
\fill (Q) circle (1.2pt) node[below right] {$Q$};
\fill (R) circle (1.2pt) node[above left] {$R$};
\end{tikzpicture}
\end{document}
```

> 图 30-11B：（$\Leftarrow$ 方向）$P$ 在平分线 $b_1$ 上，$Q$、$R$ 分别是 $P$ 到 $L_1$、$L_2$ 的垂足（两处直角记号），由角平分线等距引理 $PQ = PR$（单撇），即 $d(P, L_1) = d(P, L_2)$。

**（$\Longrightarrow$）**设 $d(P, L_1) = d(P, L_2)$。

若 $P$ 在 $L_1$ 上，则 $d(P, L_1) = 0$，于是 $d(P, L_2) = 0$，$P$ 同时在 $L_1$、$L_2$ 上，即 $P = O$；
而 $O$ 在 $b_1$、$b_2$ 两条线上。

$P$ 在 $L_2$ 上的情形相同。

若 $P$ 不在两条直线上，则 $P$ 位于 $L_1$、$L_2$ 所分四个角中某一个的内部，§29.3.1 引理的逆说：

> 「角的内部到两边等距的点在该角的平分线上。」

故 $P$ 在该角的平分线上，而四个角的平分线恰为 $b_1$、$b_2$ 两条直线。

两个方向合并，$\mathcal{L}_2 = b_1 \cup b_2$；连同先证的 $b_1 \perp b_2$，两条结论齐备。

````

剩下的一类条件（到两条平行线保持等距）同对着直线，它的答案用坐标算比用综合几何证省事，故连同方程一并交给 §30.2.1 的定理，本节不重列。

两条基本轨迹至此齐备。放在一起看，条件、轨迹、集合记号与依据一并列出：

````ad-note
title: 注记（两种基本轨迹一览） | Note（The Two Basic Loci at a Glance）

| 条件（动点 $P$） | 轨迹（类型 + 位置） | 图形 | 集合记号 | 依据 |
|:---|:---|:---|:---|:---|
| $PA = PB$ | 线段 $\overline{AB}$ 的垂直平分线 | 一条直线 | $\mathcal{L}_1 = \ell$ | §29.1.1 引理 |
| $d(P, L_1) = d(P, L_2)$，$L_1$、$L_2$ 相交 | $L_1$、$L_2$ 的两条角平分线 | 两条互相垂直的直线 | $\mathcal{L}_2 = b_1 \cup b_2$ | §29.3.1 引理 |

另外三类条件不在本表：与一点保持固定距离（圆）见 §30.1.2 圆的定义，与一直线保持固定距离、与两平行线保持等距两类见 §30.2.1 的定理。两类轨迹的条件只用到两类距离：两点间距离（§8.1）给出 $\mathcal{L}_1$，点到直线距离（§8.6）给出 $\mathcal{L}_2$。集合记号一列把「轨迹是什么」写成一条点集等式，右端的 $\ell$、$b_1$、$b_2$ 都是 §30.1.2 定义过的直线；要说全「类型 ＋ 位置」，说的就是第二、三两列。
````

描绘轨迹时按三步走：先判定**类型**（直线还是圆，一条还是两条），再定**位置**（过哪些关键点：圆心与半径、中点、交点），最后照描述作图；被剔除的点（若有）用空心点标出。

````ad-warning
title: 警告（描述轨迹要「类型 + 位置」齐全） | Warning（State Both Type and Position）

描述轨迹的标准答案是**类型 + 位置**：答「到 $A$、$B$ 等距的点的轨迹是一条直线」不合格，要答「线段 $\overline{AB}$ 的垂直平分线」；答「一个圆」不合格，要答「以 $O$ 为圆心、$r$ 为半径的圆」。另一类高频错误是数错图形：$d(P, L) = d$ 是**两条**直线而非一条，到两相交直线等距是**两条**互相垂直的平分线而非一条。描绘完毕回读一遍条件，检查有没有漏掉对称的另一支。
````

条件、点集、方程三者的关系说到此处才算闭合：§30.1.1 给「条件定轨迹」，并就地说明条件的代数式就是轨迹的方程；§30.1.2 给「条件定图形」；§30.1.3 立下两种基本轨迹的定理。剩下的问题只有一个：怎样把 $C(P)$ 化成 $F(x, y) = 0$，以及在哪一步容易失手，这就是 §30.2 的内容。

---

## 30.2　轨迹的代数方程（Algebraic Equations of Loci）

> **本节难度上限**：T B+ ｜ C C+ ｜ E C+ ｜ Q B

> §30.1 把「条件 $\to$ 点集」、点集的名字与「条件的代数式就是轨迹的方程」一次补齐（§30.1.1 注记（轨迹的方程），回指 §19.2.1）。本节要办的是本章的主业：**怎样把几何条件翻译成关于 $x$、$y$ 的方程，再化简到最简形式，并检验两边的等价性**。工具是 [[Chapter 15 解析几何 (I)|解析几何(I)]] 的坐标公式；直线与圆的方程分别在 [[Chapter 20 直线方程|直线方程]] 与下一章系统展开，本节建立的是「怎样把它们求出来」的通用流程与策略。

### 30.2.1　求轨迹方程的五步法（The Five-Step Method for Locus Equations）

§30.1.1 注记（轨迹的方程）已把「条件确定的点集」与「方程的解集」说成同一个集合，剩下的问题就只是怎么把 $C(P)$ 变成 $F(x, y) = 0$。翻译并非一步到位，拆开看共有五件事要做，每件事都有它的理由。下面拿 §30.1.2 圆的轨迹定义（动点 $P$ 到定点 $O$ 的距离恒为 $r$）作贯穿示例，五步各走一遍。

**建**：方程总是相对于某个坐标系而言的，所以第一步是建系，即题目没给坐标系时自己建立。选取的原则是利用对称，让尽量多的定点落在原点或坐标轴上、定线落在坐标轴上，使已知量的坐标最简单（§15.5.1 的坐标化策略说的就是这件事）。本例只有一个定点 $O$，把它取作原点就够了。

**设**：轨迹的主角是动点，所以第二步是设动点为 $P(x, y)$，所求方程里的 $x$、$y$ 正是它的坐标（如图 30-12A 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-0.6,0)--(2.7,0);
  \draw[gray,->] (0,-0.6)--(0,2.2);
  \coordinate (O) at (0,0);
  \coordinate (P) at (1.8,1.2);
  \draw[gray,densely dashed,thick] (P)--(1.8,0);
  \draw[gray,densely dashed,thick] (P)--(0,1.2);
  \fill (O) circle (1.6pt);
  \fill (P) circle (2.4pt);
  \node[below left] at (0.04,-0.06) {$O$};
  \node[right] at (1.9,1.32) {$P(x,y)$};
  \node at (2.58,-0.24) {$x$};
  \node at (-0.26,2.08) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-12A：建系与设点。
>
> 定点 $O$ 取作原点，动点记作 $P(x, y)$。
>
> 过 $P$ 向两轴所作的两条灰色虚线只用来读出坐标 $x$ 与 $y$。

**限**：几何条件要先写成符号等式才能操作，所以第三步是把 $C(P)$ 写成数学式子；本例的条件就是 $OP = r$，另一些问题里则可能是 $PA = PB$、$PA \perp PB$ 或 $d(P, L) = 3$。

**代**：几何量与坐标之间由公式搭桥，所以第四步是用两点距离公式（§15.2.2）、斜率公式（§15.2.6）或点到直线的距离公式（§20.5.1）把符号等式翻译成关于 $x$、$y$ 的方程；本例用距离公式，得 $\sqrt{x^2 + y^2} = r$（如图 30-12B 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-0.6,0)--(3.1,0);
  \draw[gray,->] (0,-0.6)--(0,2.2);
  \coordinate (O) at (0,0);
  \coordinate (P) at (1.8,1.2);
  \draw[gray,densely dashed,thick] (P)--(1.8,0);
  \draw[gray,densely dashed,thick] (P)--(0,1.2);
  \draw[blue!65!black,very thick,dashed] (O)--(P);
  \fill (O) circle (1.6pt);
  \fill (P) circle (2.4pt);
  \node[below left] at (0.04,-0.06) {$O$};
  \node[right] at (1.72,1.48) {$P(x,y)$};
  \node[above left] at (0.86,0.64) {$r$};
  \node at (2.92,-0.24) {$x$};
  \node at (-0.26,2.08) {$y$};
  \node[anchor=south east] at (2.45,-0.13) {$\sqrt{x^{2}+y^{2}}=r$};
\end{tikzpicture}
\end{document}
```

> 图 30-12B：限与代。
>
> 粗蓝虚线段就是条件里的 $OP = r$。
>
> 式子 $\sqrt{x^{2}+y^{2}}=r$ 是把这段长度用坐标写出的结果。

**化**：翻译出的方程通常杂乱，且翻译过程未必可逆，所以第五步是化简到最简形式并加以检验。本例两边都非负，平方是等价变形（§6.3.1），化简得

$$x^2 + y^2 = r^2,$$

它正是 §30.1.2 里圆的坐标形式；两个方向回代都成立，既无增根也无漏点（如图 30-12C 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-2.6,0)--(2.7,0);
  \draw[gray,->] (0,-2.6)--(0,2.6);
  \draw[blue!65!black,very thick] (0,0) circle (2);
  \coordinate (O) at (0,0);
  \coordinate (P1) at (1.5321,1.2856);
  \coordinate (P2) at (-1.7321,-1);
  \fill (O) circle (1.6pt);
  \fill (P1) circle (2.4pt);
  \fill (P2) circle (2.4pt);
  \node[above right] at (1.62,1.34) {$P_1$};
  \node[below left] at (-1.82,-1.08) {$P_2$};
  \node[anchor=north west] at (0.8,2.4) {$x^{2}+y^{2}=r^{2}$};
  \node at (2.58,-0.24) {$x$};
  \node at (-0.26,2.48) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-12C：化。
>
> 方程 $x^2 + y^2 = r^2$ 的解集是以 $O$ 为圆心、$r$ 为半径的圆。
>
> $P_1$、$P_2$ 是圆上两点，它们的坐标都使 $OP = r$ 成立。

五件事合起来就是求轨迹方程的标准流程：

````ad-alg
title: 算法（求轨迹方程的五步法） | Algorithm（Five-Step Method for Locus Equations）

1. **建**：建立适当的直角坐标系（题目未给时，利用对称性：定点取在原点或坐标轴上，定线取为坐标轴）；
2. **设**：设动点为 $P(x, y)$；
3. **限**：写出 $P$ 所满足的几何条件的符号形式；
4. **代**：用距离公式、斜率公式等把条件翻译成关于 $x$、$y$ 的代数方程；
5. **化**：化简方程，再检验等价性：方程的解与满足条件的点，两个方向都要对得上（详见下面的警告）。

第四步最常用的三件工具（$Q(x_Q, y_Q)$ 为定点，$L : ax + by + c = 0$；§20.5.1 原文把直线写成 $Ax + By + C = 0$，本章一律改用小写）：

- 两点距离：$PQ = \sqrt{(x - x_Q)^2 + (y - y_Q)^2}$（§15.2.2）；
- 斜率：$m_{PQ} = \dfrac{y - y_Q}{x - x_Q}$（$x \ne x_Q$ 时，§15.2.6）；
- 点到直线的距离：$d(P, L) = \dfrac{\lvert ax + by + c \rvert}{\sqrt{a^2 + b^2}}$（§20.5.1）。
````

````ad-warning
title: 警告（第五步的检验：增根、漏点与退化位置） | Warning（Checking the Fifth Step）

轨迹的方程要求恒等（§30.1.1 注记（轨迹的方程）），求解做的却往往是单向变形，三类问题最常出现：

1. **不可逆变形引入增根**：两边平方把 $a = b$ 变成 $a^2 = b^2$，混进了 $a = -b$ 的可能。是否真的混进，取决于两边的符号，必须回代检查。坐标满足方程却不满足条件的点，称为**增根**（Extraneous Root）。
2. **公式的隐含前提**：斜率公式以 $x \ne x_Q$ 为前提，铅垂线没有斜率。用公式代替条件时，公式失效的位置要单独讨论，否则会有满足条件却没被方程收进来的点，称为**漏点**（Lost Point）。
3. **题意的退化位置**：题目说 $P$ 是三角形的顶点，三点共线的位置就要剔除；题目说 $P$ 在圆上运动，与某定点重合的位置可能使条件失去意义。方程即使包含这些点，轨迹也不包含。

两个方向各查一次，解集与轨迹才互相完全确定。
````

直线型的两类条件（与一直线保持固定距离、与两平行线保持相等距离）用得上这套流程：它们的方程用坐标算，三行就能算完，顺带把「分居两侧」「位于正中间」这类位置说法一次清算。§30.1.3 没有为它们立综合几何定理，两条定理写在下面。

````ad-thm
title: 定理（与定直线保持固定距离的点的轨迹） | Theorem（Locus at a Fixed Distance from a Line）

设 $a$、$b$ 不全为零，定直线 $L_1 : ax + by + c_1 = 0$，常数 $d > 0$，动点为 $P(x, y)$。记

$$L^{\pm} : ax + by + c_1 = \pm\, d\sqrt{a^2 + b^2},$$

则

$$d(P, L_1) = d \iff P \in L^{+} \cup L^{-}.$$

即轨迹是两条与 $L_1$ 平行、各距 $L_1$ 为 $d$、分居 $L_1$ 两侧的直线，如图 30-13 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw[blue!65!black, very thick] (-3,-0.5) -- (3,2.5);
\draw (-3,-1.5) -- (3,1.5);
\draw[blue!65!black, very thick] (-3,-2.5) -- (3,0.5);
\draw[dashed] (0,1) -- (0.4,0.2);
\draw (0.534,0.267) -- (0.467,0.401) -- (0.333,0.334);
\node[right] at (0.55,0.68) {$d$};
\node[right] at (3,2.42) {$L^{+}$};
\node[right] at (3,1.42) {$L_1$};
\node[right] at (3,0.42) {$L^{-}$};
\end{tikzpicture}
\end{document}
```

> 图 30-13：与 $L_1$ 相距 $d$ 的两条直线 $L^{+}$、$L^{-}$。
>
> 虚线段自 $L^{+}$ 上一点引向 $L_1$（直角记号），其长即 $d$。
````

````ad-proof
title: 证明 | Proof

设 $a$、$b$ 不全为零，$L_1 : ax + by + c_1 = 0$，$d > 0$ 为常数，动点为 $P(x, y)$，并记

$$u = ax + by, \qquad \delta = d\sqrt{a^2 + b^2}.$$

由 $a$、$b$ 不全为零知 $\sqrt{a^2 + b^2} > 0$，故 $\delta > 0$。

由 §20.5.1 的点到直线距离公式，$d(P, L_1) = \dfrac{\lvert u + c_1 \rvert}{\sqrt{a^2 + b^2}}$，条件 $d(P, L_1) = d$ 于是等价于

$$\lvert u + c_1 \rvert = \delta.$$

按 §6.3.1 的绝对值分段表示逐支验算，上式当且仅当 $u + c_1 = \delta$ 或 $u + c_1 = -\delta$，正是 $L^{+}$、$L^{-}$ 的方程。两个方向全由等价变形串成，无增根、无漏点，故轨迹恰为 $L^{+} \cup L^{-}$。

两条直线上 $x$、$y$ 的系数都是 $(a, b)$，与 $L_1$ 相同，故 $L^{+} \parallel L_1 \parallel L^{-}$（§20.5.2）。

把 $L^{+}$ 上一点代回距离公式，分子为 $\lvert \delta \rvert = \delta$，故该点到 $L_1$ 的距离为 $\dfrac{\delta}{\sqrt{a^2 + b^2}} = d$，$L^{-}$ 同理。

最后看两侧：$L^{+}$ 上的点使 $ax + by + c_1 = \delta > 0$，$L^{-}$ 上的点使 $ax + by + c_1 = -\delta < 0$，两值异号，按 §30.1.2 的同侧判据，两线分居 $L_1$ 两侧。
````

````ad-thm
title: 定理（两平行线的中线方程） | Theorem（Equation of the Midline of Two Parallel Lines）

设 $a$、$b$ 不全为零，两条平行线 $L_1 : ax + by + c_1 = 0$、$L_2 : ax + by + c_2 = 0$（$c_1 \ne c_2$），动点为 $P(x, y)$。记

$$m : ax + by + \frac{c_1 + c_2}{2} = 0,$$

则

$$d(P, L_1) = d(P, L_2) \iff P \in m.$$

$m$ 称为 $L_1$、$L_2$ 的**中线**（Midline of two parallel lines）：它与两者平行，到两者的距离都是两线间距之半。取 $L_1 : y - 1 = 0$、$L_2 : y + 2 = 0$，中线即 $y + \dfrac{1}{2} = 0$，如图 30-14 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (-2.8,1) -- (2.8,1);
\draw[blue!65!black, very thick] (-2.8,-0.5) -- (2.8,-0.5);
\draw (-2.8,-2) -- (2.8,-2);
\draw[dashed] (-1.6,1) -- (-1.6,-2);
\draw (-1.69,0.25) -- (-1.51,0.25);
\draw (-1.69,-1.25) -- (-1.51,-1.25);
\fill (-1.6,-0.5) circle (1.3pt) node[below right] {$P$};
\node[right] at (2.9,1) {$L_1: y-1=0$};
\node[right] at (2.9,-0.5) {$m: y+\frac{1}{2}=0$};
\node[right] at (2.9,-2) {$L_2: y+2=0$};
\end{tikzpicture}
\end{document}
```

> 图 30-14：中线方程的左端是两直线方程左端的平均。
>
> $L_1 : y-1=0$ 与 $L_2 : y+2=0$ 的中线为 $m : y+\frac{1}{2}=0$；
>
> 过 $m$ 上一点 $P$ 的虚线公垂线段被 $m$ 平分（两道单撇）。
````

````ad-proof
title: 证明 | Proof

设 $a$、$b$ 不全为零，$L_1 : ax + by + c_1 = 0$、$L_2 : ax + by + c_2 = 0$（$c_1 \ne c_2$），动点为 $P(x, y)$，仍记 $u = ax + by$。由 §20.5.1，条件 $d(P, L_1) = d(P, L_2)$ 即

$$\frac{\lvert u + c_1 \rvert}{\sqrt{a^2 + b^2}} = \frac{\lvert u + c_2 \rvert}{\sqrt{a^2 + b^2}}, \qquad \text{亦即} \qquad \lvert u + c_1 \rvert = \lvert u + c_2 \rvert.$$

两边非负，平方是等价变形（§6.3.1），展开后相减：

$$(u + c_1)^2 - (u + c_2)^2 = 0 \iff (c_1 - c_2)(2u + c_1 + c_2) = 0.$$

由 $c_1 \ne c_2$，只能 $2u + c_1 + c_2 = 0$，即 $m : ax + by + \dfrac{c_1 + c_2}{2} = 0$；以上步步可逆，故轨迹恰为整条 $m$。

$m$ 上 $x$、$y$ 的系数同为 $(a, b)$，故三线平行。再由 §20.5.2，$m$ 到 $L_1$ 的距离为

$$\frac{\left\lvert \dfrac{c_1 + c_2}{2} - c_1 \right\rvert}{\sqrt{a^2 + b^2}} = \frac{\lvert c_2 - c_1 \rvert}{2\sqrt{a^2 + b^2}},$$

恰好是两线间距 $\dfrac{\lvert c_1 - c_2 \rvert}{\sqrt{a^2 + b^2}}$ 的一半；$m$ 到 $L_2$ 的距离同理。故 $m$ 夹在两线之间且与两者等距。

中线的左端 $ax + by + \dfrac{c_1 + c_2}{2}$ 恰为 $L_1$、$L_2$ 两式左端的算术平均。几何那句「位于正中间」，在方程里就是取一次平均。
````

「中线」一词另有两味，不要相混：三角形的**中线**指顶点到对边中点的线段（§29.3.1），三角形的**中位线**指两边中点的连线（§8.6 的中点定理）；上面两条定理里说的都是两平行线的等距线。

下面用一道「条件是垂直」的题目完整走一遍五步法，三类检验里的前两类都会出现。

````ad-example
title: 示例（五步法求轨迹方程） | Example（Locus Equation by the Five-Step Method）

定点 $A(-3, 0)$、$B(3, 0)$，动点 $P$ 满足 $PA \perp PB$。求 $P$ 的轨迹方程，并说明轨迹是什么图形。

---

**建**：题目已给坐标：直线 $AB$ 就是 $x$ 轴，$AB$ 的垂直平分线就是 $y$ 轴，$A$、$B$ 关于原点对称。坐标系已经建好，直接用。

**设**：设 $P(x, y)$。

**限**：$PA \perp PB$。

**代**：当 $x \ne \pm 3$ 时，$PA$、$PB$ 都不是铅垂线，

$$m_{PA} = \dfrac{y - 0}{x - (-3)} = \dfrac{y}{x + 3}, \qquad m_{PB} = \dfrac{y - 0}{x - 3} = \dfrac{y}{x - 3}.$$

由垂直线的斜率条件（§15.2.7），$PA \perp PB \iff m_{PA} \cdot m_{PB} = -1$：

$$\dfrac{y}{x + 3} \cdot \dfrac{y}{x - 3} = -1.$$

**化**：两边乘以 $(x + 3)(x - 3)$（在 $x \ne \pm 3$ 的前提下非零，变形可逆）：

$$y^2 = -(x^2 - 9), \qquad \text{即} \qquad x^2 + y^2 = 9.$$

**检验**：「代」的一步排除了 $x = \pm 3$，这些位置要单独讨论。$P(3, y)$ 使 $PB$ 铅垂，此时 $PA \perp PB$ 当且仅当 $PA$ 水平，即 $y = 0$，$P$ 与 $B$ 重合；同理 $P(-3, y)$ 只可能与 $A$ 重合。重合位置上 $P$、$A$、$B$ 三点构不成角（三角形退化），应当剔除。反过来，满足 $x^2 + y^2 = 9$ 且 $x \ne \pm 3$ 的点代回斜率之积都得 $-1$，无增根、无漏点。故轨迹方程为

$$x^2 + y^2 = 9 \quad (x \ne \pm 3).$$

从几何上看：由 §29.1.2 的半圆推论，以 $AB$ 为直径的圆上任意一点（$A$、$B$ 除外）对 $AB$ 的张角恰为 $90^\circ$；反过来，上面已证张角为 $90^\circ$ 的点都被方程收尽。所以轨迹就是**以 $AB$ 为直径的圆，去掉两个端点 $A$、$B$**，如图 30-15 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (-2.4,0);
\coordinate (B) at (2.4,0);
\coordinate (P) at (1.44,1.92);
\draw[gray!60, ->] (-3.4,0) -- (3.4,0);
\draw[gray!60, ->] (0,-2.9) -- (0,2.9);
\draw (O) circle (2.4);
\draw (P) -- (A) (P) -- (B);
\draw (1.2253,1.8127) -- (1.3326,1.598) -- (1.5473,1.7053);
\draw[fill=white] (A) circle (2.2pt);
\draw[fill=white] (B) circle (2.2pt);
\fill (O) circle (1.2pt) node[below left] {$O$};
\fill (P) circle (1.3pt) node[above right] {$P$};
\node[left] at (-2.5,0.05) {$A$};
\node[right] at (2.5,0.05) {$B$};
\end{tikzpicture}
\end{document}
```

> 图 30-15：轨迹是以 $AB$ 为直径的圆，去掉 $A$、$B$ 两点（空心点表示被剔除）。
>
> 圆上任一点 $P$ 满足 $\angle APB = 90^\circ$（直角记号）；
>
> 方程为 $x^2 + y^2 = 9$（$x \ne \pm 3$）。
````

这道题的轨迹恰好又是圆，但它不是从「到定点等距」的定义认出来的，而是从垂直条件算出来的。条件千变万化，五步法以不变应万变；不过当条件恰好命中基本轨迹时，还有更省力的走法。

### 30.2.2　求轨迹方程的三种方法（Three Methods for Finding Locus Equations）

五步法是通用流程。按条件的形态，实际求解有三条路线：直接法逐步翻译，定义法对照基本轨迹，参数法借道中间变量。三条路线在本小节各配示例。
**直接法**就是五步法直落：把几何条件直接翻译成坐标代数式，化简即得轨迹方程。条件直接涉及距离、斜率等基本量时都适用，是最通用的方法。

````ad-example
title: 示例（直接法之一：距离条件给出圆） | Example（Direct Method I: A Distance Condition Gives a Circle）

定点 $A(2, -1)$，动点 $P$ 到 $A$ 的距离恒为 $3$。求 $P$ 的轨迹方程。

---

**设**与**限**：坐标系已由 $A$ 的坐标给出，设 $P(x, y)$，条件写成 $PA = 3$。

**代**：由两点距离公式（§15.2.2），

$$\sqrt{(x - 2)^2 + (y + 1)^2} = 3.$$

**化**：两边非负，平方是等价变形（§6.3.1），得

$$(x - 2)^2 + (y + 1)^2 = 9.$$

**检验**：方程上任一点代回都使 $PA = 3$，无增根；变形步步可逆，无漏点。按 §30.1.2 圆的定义（课程要求的「与一点保持固定距离」这一类条件），轨迹是以 $A(2, -1)$ 为圆心、半径为 $3$ 的圆，如图 30-16 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-1.9,0)--(6.0,0);
  \draw[gray,->] (0,-4.6)--(0,2.9);
  \draw[blue!65!black,very thick] (2,-1) circle (3);
  \coordinate (A) at (2,-1);
  \coordinate (P) at (3.5,1.5981);
  \draw[dashed] (A)--(P);
  \fill (A) circle (2.4pt);
  \fill (P) circle (2.4pt);
  \node[below right] at (2.06,-1.12) {$A(2,-1)$};
  \node[right] at (3.62,1.66) {$P$};
  \node[below right] at (2.68,0.1) {$3$};
  \node[anchor=north west] at (3.6,2.5) {$(x-2)^{2}+(y+1)^{2}=9$};
  \node at (5.88,-0.24) {$x$};
  \node at (-0.26,2.78) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-16：轨迹 $(x-2)^2 + (y+1)^2 = 9$ 是以 $A$ 为圆心、半径为 $3$ 的圆。
>
> $P$ 为圆上任一点，虚线段 $AP = 3$。
````

````ad-example
title: 示例（直接法之二：到定点与定直线等距给出抛物线） | Example（Direct Method II: Equidistance from a Point and a Line Gives a Parabola）

定点 $F(0, 2)$，定直线 $\ell: y = -2$。动点 $P$ 到 $F$ 的距离等于到 $\ell$ 的距离。求 $P$ 的轨迹方程，并说明轨迹是什么图形。

---

**设**：设 $P(x, y)$。

**限**：$PF = d(P, \ell)$。

**代**：$PF = \sqrt{(x - 0)^2 + (y - 2)^2} = \sqrt{x^2 + (y - 2)^2}$；$\ell$ 是水平线，$d(P, \ell) = \lvert y - (-2) \rvert = \lvert y + 2 \rvert$（即 §20.5.1 的公式里 $a = 0$、$b = 1$、$c = 2$ 的特例）。列方程：

$$\sqrt{x^2 + (y - 2)^2} = \lvert y + 2 \rvert.$$

**化**：两边非负，平方是等价变形：

$$x^2 + (y - 2)^2 = (y + 2)^2,$$

$$x^2 + y^2 - 4y + 4 = y^2 + 4y + 4.$$

两边消去 $y^2$ 与 $4$，移项：

$$x^2 = 8y.$$

**检验**：由 $x^2 = 8y$ 知 $y \ge 0$，故 $y + 2 > 0$，$\lvert y + 2\rvert = y + 2$。回代：

$$PF = \sqrt{x^2 + (y - 2)^2} = \sqrt{8y + y^2 - 4y + 4} = \sqrt{(y + 2)^2} = y + 2 = d(P, \ell),$$

曲线上的点都满足条件，无增根；以上变形步步可逆，无漏点。
故轨迹方程为 $x^2 = 8y$，即 $y = \dfrac{1}{8}x^2$：一条开口向上的**抛物线**（如图 30-17 所示），正是第二十一章研究过的二次函数的图像。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (F) at (0,2);
\coordinate (P) at (4,2);
\coordinate (M) at (4,-2);
\draw[gray!60, ->] (-6.8,0) -- (6.8,0) node[right] {$x$};
\draw[gray!60, ->] (0,-3.1) -- (0,5.5) node[above] {$y$};
\draw[dashed] (-5.6,-2) -- (5.6,-2);
\draw[blue!65!black, thick, domain=-6.2:6.2, samples=60, smooth] plot (\x,{\x*\x/8});
\draw (F) -- (P);
\draw[dashed] (P) -- (M);
\draw (2,1.9) -- (2,2.1);
\draw (3.9,0) -- (4.1,0);
\draw (3.85,-2) -- (3.85,-1.85) -- (4,-1.85);
\fill (O) circle (1.2pt) node[below left] {$O$};
\fill (F) circle (1.3pt) node[left] {$F$};
\fill (P) circle (1.3pt) node[above right] {$P$};
\fill (M) circle (1.2pt) node[below right] {$M$};
\node[above] at (4.8,-2) {$\ell: y=-2$};
\end{tikzpicture}
\end{document}
```

> 图 30-17：$PF$（实线）与 $PM$（虚线，$PM \perp \ell$）相等（单撇）。
>
> 条件 $PF = d(P, \ell)$ 化简得 $x^2 = 8y$：开口向上的抛物线（蓝）。
>
> 定点 $F$ 与定直线 $\ell$ 将在 §30.3 获得「焦点」与「准线」的名字。
````

````ad-example
title: 示例（直接法之三：两点等距给出垂直平分线） | Example（Direct Method III: Equidistance from Two Fixed Points）

定点 $A(-1, 1)$、$B(3, 5)$，动点 $P$ 满足 $PA = PB$。求 $P$ 的轨迹方程。

---

**设**：设 $P(x, y)$（坐标系已由 $A$、$B$ 的坐标给出，不必另建）。

**限**：$PA = PB$。

**代**：由两点距离公式（§15.2.2）：

$$\sqrt{(x + 1)^2 + (y - 1)^2} = \sqrt{(x - 3)^2 + (y - 5)^2}.$$

**化**：两边都是算术根，非负，平方是等价变形。展开两边：

$$x^2 + 2x + 1 + y^2 - 2y + 1 = x^2 - 6x + 9 + y^2 - 10y + 25,$$

两边消去 $x^2$、$y^2$ 后移项整理：

$$8x + 8y - 32 = 0, \qquad \text{即} \qquad x + y - 4 = 0.$$

**检验**：平方在两边非负时步步可逆，无增根、无漏点；$A$、$B$ 两点也不满足条件（在 $A$ 处 $PA = 0$、$PB = \sqrt{32}$），不会自成孤点混进解集。

故轨迹方程为 $x + y - 4 = 0$，一条直线。它正是线段 $\overline{AB}$ 的垂直平分线：中点 $(1, 3)$ 满足方程，直线的斜率 $-1$ 与 $AB$ 的斜率 $1$ 之积为 $-1$（§15.2.7），如图 30-18 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-1,1);
\coordinate (B) at (3,5);
\coordinate (M) at (1,3);
\coordinate (P) at (3,1);
\draw[gray!60, ->] (-2.4,0) -- (4.8,0) node[right] {$x$};
\draw[gray!60, ->] (0,-1.3) -- (0,6.2) node[above] {$y$};
\draw[blue!65!black, very thick] (-0.45,4.45) -- (4.45,-0.45);
\draw[dashed] (A) -- (P) -- (B);
\draw (1,1.1) -- (1,0.9);
\draw (2.9,3) -- (3.1,3);
\draw (1.156,2.844) -- (1.312,3) -- (1.156,3.156);
\fill (A) circle (1.3pt) node[below left] {$A$};
\fill (B) circle (1.3pt) node[above right] {$B$};
\fill (M) circle (1.2pt);
\fill (P) circle (1.3pt) node[below] {$P$};
\node at (1,2.6) {$M$};
\node[right, blue!65!black] at (3.6,0.4) {$x+y-4=0$};
\end{tikzpicture}
\end{document}
```

> 图 30-18：$PA = PB$ 的轨迹。
>
> 定点 $A$、$B$ 关于蓝色直线对称，$P$ 在直线上，$PA$ 与 $PB$（虚线，均标单撇）相等。
>
> 直线的方程为 $x + y - 4 = 0$，中点 $M$ 处两线垂直（直角符号）。
````

条件稍作改动，直接法立刻给出一个陌生的面孔。下面这一例的轨迹是 §30.1.2 注记提到的**椭圆**，属增润内容、超出 DSE 常规课程的要求，放在这里只为看清直接法的通用。

````ad-example
title: 示例（直接法之四：到两定点距离之和为定值） | Example（Direct Method IV: A Constant Sum of Distances）

定点 $A(-1, 0)$、$B(1, 0)$，动点 $P$ 满足 $PA + PB = 4$。求 $P$ 的轨迹方程。

---

**设**：设 $P(x, y)$。

**限**：$PA + PB = 4$。

**代**：$PA = \sqrt{(x + 1)^2 + y^2}$、$PB = \sqrt{(x - 1)^2 + y^2}$，列式：

$$\sqrt{(x + 1)^2 + y^2} + \sqrt{(x - 1)^2 + y^2} = 4.$$

**化**：两个根式不能直接平方，先把一个根式单独留在一边：

$$\sqrt{(x + 1)^2 + y^2} = 4 - \sqrt{(x - 1)^2 + y^2}.$$

两边平方并整理：

$$(x + 1)^2 + y^2 = 16 - 8\sqrt{(x - 1)^2 + y^2} + (x - 1)^2 + y^2,$$

$$4x = 16 - 8\sqrt{(x - 1)^2 + y^2}, \qquad \text{即} \qquad \sqrt{(x - 1)^2 + y^2} = 2 - \frac{1}{2}x.$$

再平方一次：

$$x^2 - 2x + 1 + y^2 = 4 - 2x + \frac{1}{4}x^2,$$

$$\frac{3}{4}x^2 + y^2 = 3, \qquad \text{即} \qquad 3x^2 + 4y^2 = 12.$$

**检验**：第一次平方要求 $4 - PB \ge 0$，第二次平方要求 $2 - \dfrac{1}{2}x \ge 0$（即 $x \le 4$）。由 $3x^2 + 4y^2 = 12$ 得 $x^2 \le 4$，即 $-2 \le x \le 2$，两个前提都自动满足；反过来，方程上任一点都满足 $x \le 2$，于是

$$PB = \left\lvert 2 - \frac{1}{2}x \right\rvert = 2 - \frac{1}{2}x, \qquad PA = \left\lvert \frac{1}{2}x + 2 \right\rvert = \frac{1}{2}x + 2,$$

$$PA + PB = 4,$$

两个方向都守住，既无增根也无漏点。

故轨迹方程为 $3x^2 + 4y^2 = 12$。它不是一次方程，也不是二次函数的图像，而是椭圆（如图 30-19 所示）：同一个流程，条件一换，答案就长成没学过的样子。这正是直接法的通用之处。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-1,0);
\coordinate (B) at (1,0);
\coordinate (P) at (1.2,1.3856);
\draw[gray!60, ->] (-3.1,0) -- (3.1,0) node[right] {$x$};
\draw[gray!60, ->] (0,-2.4) -- (0,2.6) node[above] {$y$};
\draw[blue!65!black, thick] (0,0) ellipse (2 and 1.7321);
\draw[dashed] (A) -- (P) -- (B);
\fill (A) circle (1.3pt) node[below left] {$A$};
\fill (B) circle (1.3pt) node[below right] {$B$};
\fill (P) circle (1.3pt) node[above right] {$P$};
\node[blue!65!black] at (1.05,2.05) {$3x^2+4y^2=12$};
\end{tikzpicture}
\end{document}
```

> 图 30-19：到两定点距离之和为定值的轨迹。
>
> $A(-1, 0)$、$B(1, 0)$ 为两定点，动点 $P$ 到两者的距离（虚线）之和恒为 $4$。
>
> 化简得 $3x^2 + 4y^2 = 12$：椭圆（蓝）。
````

**定义法**走的是另一条路：条件恰好命中已判明的轨迹类型时（§30.1.2 定义的圆、§30.1.3 的两种基本轨迹，以及 §30.2.1 两条定直线型定理给出的直线），不再列根式方程，先按定义点名图形，再借定义确定图形所需的少量几何量（一个点、一个方向），最后写成方程。

````ad-example
title: 示例（定义法：先认图形再写方程） | Example（Definition Method: Name the Figure First）

动点 $P$ 到 $A(0, 0)$ 的距离等于到 $B(4, 2)$ 的距离。求 $P$ 的轨迹方程。

---

条件是 $PA = PB$，命中基本轨迹一：轨迹是线段 $\overline{AB}$ 的**垂直平分线**。要写出它的方程，只需要两个几何量：一个点（$AB$ 的中点）与一个方向（与 $AB$ 垂直）。

$AB$ 的中点为

$$M\left(\frac{0 + 4}{2}, \frac{0 + 2}{2}\right) = (2, 1)$$

（§15.2.3 中点公式）。$AB$ 的斜率为 $m_{AB} = \dfrac{2 - 0}{4 - 0} = \dfrac{1}{2}$（§15.2.6），由垂直线的斜率条件（§15.2.7），垂直平分线的斜率 $m$ 与 $m_{AB}$ 之积等于 $-1$：

$$m_{AB} \cdot m = -1, \qquad \text{故} \qquad m = -\frac{1}{1/2} = -2.$$

于是垂直平分线过 $(2, 1)$、斜率为 $-2$，由点斜式（§20.3.3）：

$$y - 1 = -2(x - 2), \qquad \text{即} \qquad 2x + y - 5 = 0.$$

这条轨迹不必再逐点检验：整条垂直平分线都由与 $A$、$B$ 等距的点构成，反之亦然（§29.1.1 的引理），如图 30-20 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (0,0);
\coordinate (B) at (4,2);
\coordinate (M) at (2,1);
\coordinate (P) at (1,3);
\draw[gray!60, ->] (-1.4,0) -- (5.2,0) node[right] {$x$};
\draw[gray!60, ->] (0,-1.4) -- (0,5.4) node[above] {$y$};
\draw[blue!65!black, very thick] (0,5) -- (2.5,0);
\draw[dashed] (A) -- (P) -- (B);
\draw (0.41,1.53) -- (0.59,1.47);
\draw (2.47,2.41) -- (2.53,2.59);
\draw (2.197,1.098) -- (2.295,0.901) -- (2.098,0.803);
\fill (A) circle (1.3pt) node[below left] {$A$};
\fill (B) circle (1.3pt) node[above right] {$B$};
\fill (M) circle (1.2pt);
\fill (P) circle (1.3pt) node[above right] {$P$};
\node at (1.75,0.7) {$M$};
\node[right, blue!65!black] at (3,0.6) {$2x+y-5=0$};
\end{tikzpicture}
\end{document}
```

> 图 30-20：$PA = PB$（单撇）命中基本轨迹一，轨迹是线段 $\overline{AB}$ 的垂直平分线（蓝色粗线，方程 $2x + y - 5 = 0$）。
>
> 中点 $M$ 处两线垂直（直角符号）。
````

对照一下：同一个「两点等距」的条件，用直接法要列两个根式、两边平方、展开、化简，才得到 $x + y - 4 = 0$；定义法先认出它是垂直平分线，再用中点与「斜率之积等于 $-1$」两样现成的工具，几步写出方程。定义法快，但只在条件命中已判明的轨迹类型时可用；直接法步骤多，却处处可行：条件越陌生，越显出它的通用性。两法并用：先看看条件像不像已知的轨迹类型，不像再逐步翻译。

````ad-note
title: 注记（课程要求的三类轨迹方程） | Note（The Three Required Types of Locus Equations）

课程要求会求轨迹为**直线**、**圆**和形式如 $y = ax^2 + bx + c$ 的**抛物线**的方程。三类都已现身：直线型见直接法之三（$x + y - 4 = 0$）与定义法示例（$2x + y - 5 = 0$）；圆型见直接法之一（$(x - 2)^2 + (y + 1)^2 = 9$）与五步法示例（$x^2 + y^2 = 9$，$x \ne \pm 3$）；抛物线型见直接法之二（$x^2 = 8y$）。识别轨迹类型后再动笔，等于先知道答案的形状。另：直接法之四的椭圆 $3x^2 + 4y^2 = 12$ 不属课程要求的这三类，它只为演示直接法的通用性。
````

**参数法**超出 DSE 常规课程的要求，作增润处理。有时动点的两个坐标 $x$、$y$ 之间的关系不易直接建立，它们却都依赖同一个中间变量：动点的位置经由时间、角度或另一个动点间接确定。这时引入**参数**（parameter，通常记 $t$ 或 $\theta$），先把 $x$、$y$ 分别用参数表示，得到**参数方程**

$$\begin{cases} x = f(t), \\ y = g(t), \end{cases}$$

再从两式中**消去** $t$，得到只含 $x$、$y$ 的方程 $F(x, y) = 0$。消参的常用手段：从一个式子解出 $t$ 代入另一个式子；或借助恒等式直接消去，例如 [[Chapter 26 三角函数|三角函数]] §26.2.3 的基本恒等式 $\sin^2\theta + \cos^2\theta \equiv 1$。

````ad-example
title: 示例（参数法之一：单位圆的参数方程） | Example（Parameter Method I: Parametric Equations of the Unit Circle）

动点 $P$ 的坐标为 $x = \cos\theta$、$y = \sin\theta$，其中 $\theta$ 在 $0^\circ \le \theta < 360^\circ$ 内变化。求 $P$ 的轨迹方程。

---

两个参数方程平方相加，由基本恒等式 $\sin^2\theta + \cos^2\theta \equiv 1$（§26.2.3）消去 $\theta$：

$$x^2 + y^2 = \cos^2\theta + \sin^2\theta = 1.$$

由 §26.2.2 的单位圆定义，角 $\theta$ 的终边与单位圆的交点坐标恰为 $(\cos\theta, \sin\theta)$；$\theta$ 从 $0^\circ$ 扫到 $360^\circ$，$P$ 恰好绕单位圆一周。故轨迹是完整的圆

$$x^2 + y^2 = 1,$$

没有漏点，如图 30-21 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (P) at (0.868,1.034);
\draw[gray!60, ->] (-1.75,0) -- (1.75,0);
\draw[gray!60, ->] (0,-1.75) -- (0,1.75);
\draw (O) circle (1.35);
\draw (O) -- (P);
\draw[dashed] (P) -- (0.868,0) (P) -- (0,1.034);
\draw (0.42,0) arc (0:50:0.42);
\draw (1.35,0.06) -- (1.35,-0.06);
\draw (0.06,1.35) -- (-0.06,1.35);
\fill (O) circle (1.2pt) node[below left] {$O$};
\fill (P) circle (1.3pt) node[above right] {$P$};
\node at (0.58,0.24) {$\theta$};
\node[below] at (0.868,-0.08) {$\cos\theta$};
\node[left] at (-0.06,1.034) {$\sin\theta$};
\node[below right] at (1.38,0) {$1$};
\node[above left] at (0,1.38) {$1$};
\end{tikzpicture}
\end{document}
```

> 图 30-21：$P(\cos\theta, \sin\theta)$ 正是角 $\theta$ 的终边与单位圆的交点（§26.2.2），两坐标是 $\theta$ 的函数；
>
> 消去 $\theta$ 得 $x^2 + y^2 = 1$。
````

````ad-warning
title: 警告（参数的范围决定轨迹是否完整） | Warning（The Parameter Range Decides Completeness）

消去参数只给出「动点所在的曲线」，参数的实际范围还决定「动点跑到曲线的哪一部分」。前一个示例里若把 $\theta$ 限制在 $0^\circ \le \theta \le 90^\circ$，轨迹就只是第一象限的四分之一圆弧，而不是整个圆。消参之后务必回看参数范围，检查要不要给方程附加限制。
````

````ad-example
title: 示例（参数法之二：滑动杆中点的轨迹） | Example（Parameter Method II: Midpoint of a Sliding Rod）

长为 $2$ 的杆，端点 $A$ 在 $x$ 轴上滑动、端点 $B$ 在 $y$ 轴上滑动（杆可以处于任何位置）。$M$ 为 $AB$ 的中点。求 $M$ 的轨迹方程。

---

$M$ 的位置由 $A$、$B$ 决定，$A$、$B$ 的位置又由杆的倾斜程度决定，动点经由另一个变动量间接确定，适合参数法。取 $\theta$ 为参数，设

$$A(2\cos\theta, 0), \qquad B(0, 2\sin\theta) \qquad (0^\circ \le \theta < 360^\circ).$$

对任意 $\theta$，$AB = \sqrt{(2\cos\theta)^2 + (2\sin\theta)^2} = \sqrt{4(\cos^2\theta + \sin^2\theta)} = 2$，杆长恒为 $2$；且 $\theta$ 扫过一周时，$A$ 跑遍 $x$ 轴上、$B$ 跑遍 $y$ 轴上到原点距离为 $2$ 的全部位置，杆取遍一切可能位置。由中点公式（§15.2.3）：

$$M\left(\dfrac{2\cos\theta + 0}{2},\ \dfrac{0 + 2\sin\theta}{2}\right) = (\cos\theta,\ \sin\theta).$$

与参数法之一完全相同，消去 $\theta$ 得 $M$ 的轨迹方程

$$x^2 + y^2 = 1,$$

轨迹是整个单位圆，如图 30-22 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A1) at (1.6,0);
\coordinate (B1) at (0,2.771);
\coordinate (M1) at (0.8,1.386);
\coordinate (A2) at (-3.007,0);
\coordinate (B2) at (0,1.094);
\coordinate (M2) at (-1.503,0.547);
\draw[gray!60, ->] (-3.8,0) -- (2.9,0);
\draw[gray!60, ->] (0,-2.2) -- (0,3.3);
\draw[dashed] (O) circle (1.6);
\draw[very thick] (A1) -- (B1);
\draw[very thick] (A2) -- (B2);
\draw[dashed] (O) -- (M1) (O) -- (M2);
\draw (0.331,0.733) -- (0.469,0.653);
\draw (-0.779,0.199) -- (-0.725,0.349);
\fill (O) circle (1.2pt) node[below left] {$O$};
\fill (A1) circle (1.3pt) node[below right] {$A_1$};
\fill (B1) circle (1.3pt) node[right] {$B_1$};
\fill (M1) circle (1.3pt) node[right] {$M_1$};
\fill (A2) circle (1.3pt) node[below left] {$A_2$};
\fill (B2) circle (1.3pt) node[above left] {$B_2$};
\fill (M2) circle (1.3pt) node[above left] {$M_2$};
\end{tikzpicture}
\end{document}
```

> 图 30-22：杆的两个位置（粗线）与对应的中点 $M_1$、$M_2$。
>
> 虚线圆即所求轨迹，$OM_1$ 与 $OM_2$ 各带一道单撇。
````

这道题也有不用参数的走法，下面两条路都不引入参数。
- **直接法**：设 $A(a, 0)$、$B(0, b)$，杆长给出 $a^2 + b^2 = 4$；设 $M(x, y)$，中点公式给出 $a = 2x$、$b = 2y$，代入即得 $x^2 + y^2 = 1$。
- **纯几何法**：$\triangle AOB$ 在 $O$ 处是直角，$OM$ 是斜边上的中线，由 §29.3.2 的推论（直角三角形的外接圆半径等于斜边之半），$OM = \dfrac{AB}{2} = 1$ 恒定，按 §30.1.2 圆的定义，轨迹是以 $O$ 为圆心、$1$ 为半径的圆。

参数法的「参数」$\theta$ 与直接法的中间量 $a$、$b$ 本质是同一件事：先用中间量表示动点，再消去中间量。
直接法的抛物线示例还留下两个问题：定点 $F$ 与定直线 $\ell$ 有没有名字？系数 $\dfrac{1}{8}$ 从哪里来？下一节从几何视角给出系统回答；该节为延伸内容，超出 DSE 常规课程的要求。

---

## 30.3　延伸：抛物线的几何本源（Extension: The Geometric Origin of the Parabola）

> **本节难度上限**：T B- ｜ C C+ ｜ E B- ｜ Q B-

> 本节内容超出 DSE 常规课程的要求，属扩展阅读。第二十一章把抛物线当作二次函数的图像研究，§30.2.2 又从「到定点与定直线等距」算出了一条抛物线。这不是巧合：抛物线与圆一样，是由距离条件定义的轨迹（§30.1.2 已给出定义），圆由「一个定点、一个定长」确定，抛物线由「一个定点、一条定直线」确定。本节给这条轨迹配上专名与要素，并推导标准方程，说明系数 $a$ 的几何本源。

### 30.3.1　抛物线的几何定义（Geometric Definition of the Parabola）

§30.2.2 的抛物线示例中，定点 $F(0, 2)$ 与定直线 $\ell: y = -2$ 各有专名。抛物线本身已在 §30.1.2 定义为 $\{\,P : PF = d(P, \ell)\,\}$，本节要定义的是这条轨迹身上的五个要素。

````ad-def
title: 定义（焦点、准线、顶点、对称轴与焦距） | Definition（Focus, Directrix, Vertex, Axis and Focal Length）

设 $F$ 为平面内一定点，$\ell$ 为一条不经过 $F$ 的定直线，$\mathcal{P} = \{\,P : PF = d(P, \ell)\,\}$ 是 §30.1.2 定义的**抛物线**。这条轨迹的五个要素定义如下：

$F$ 称为抛物线的**焦点**（Focus），$\ell$ 称为抛物线的**准线**（Directrix）。
自 $F$ 向 $\ell$ 作垂线，垂足为 $K$，其余三个要素随之确定（如图 30-23 所示）：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (F) at (0,1.2);
\coordinate (K) at (0,-1.2);
\coordinate (V) at (0,0);
\coordinate (P) at (2.4,1.2);
\coordinate (M) at (2.4,-1.2);
\draw[dashed] (0,-2.0) -- (0,2.7);
\draw[dashed] (-3.1,-1.2) -- (3.1,-1.2);
\draw[blue!65!black, thick, domain=-2.9:2.9, samples=50, smooth] plot (\x,{\x*\x/4.8});
\draw (F) -- (P);
\draw[dashed] (P) -- (M);
\draw (1.2,1.12) -- (1.2,1.28);
\draw (2.32,0) -- (2.48,0);
\draw (0.2,-1.2) -- (0.2,-1.0) -- (0,-1.0);
\fill (F) circle (1.3pt) node[right] {$F$};
\fill (K) circle (1.2pt) node[below left] {$K$};
\fill (V) circle (1.2pt) node[left] {$V$};
\fill (P) circle (1.3pt) node[right] {$P$};
\fill (M) circle (1.2pt) node[below right] {$M$};
\node[left] at (-3.0,-1.2) {$\ell$};
\node[right, gray!70] at (0.03,2.55) {axis};
\node[right] at (0.07,0.6) {$p$};
\node[right] at (0.07,-0.6) {$p$};
\end{tikzpicture}
\end{document}
```

> 图 30-23：定点 $F$、定直线 $\ell$ 与垂足 $K$。
>
> $V$ 是 $FK$ 的中点，粗蓝曲线是 $\{P : PF = d(P, \ell)\}$。
>
> $P$ 为曲线上一点，$M$ 是 $P$ 向 $\ell$ 所作垂线的垂足，$PF$ 与 $PM$ 各带一道单撇。

- **顶点（Vertex）**：线段 $\overline{FK}$ 的中点 $V$。$V$ 到 $F$ 与到 $\ell$ 的距离都是 $\dfrac{FK}{2}$，故 $V$ 在抛物线上，而且是抛物线上离准线最近的点。
- **对称轴（Axis of Symmetry）**：直线 $FK$，即过焦点且垂直于准线的直线。
- **焦距（Focal Length）**：$p = VF = VK$（$p > 0$），于是 $FK = 2p$。

````

````ad-note
title: 注记（对称性与开口方向） | Note（Symmetry and Opening Direction）

抛物线关于对称轴对称：设 $P$ 满足 $PF = d(P, \ell)$，把 $P$ 关于直线 $FK$ 反射得到 $P'$。反射保持距离，故 $P'F = PF$、$d(P', \ell) = d(P, \ell)$，$P'$ 也满足条件、也在抛物线上。顶点 $V$ 在对称轴上，是抛物线的「转折点」。
抛物线朝着「背对准线」的方向张开：上面配置图里 $F$ 在 $V$ 上方，抛物线开口向上。$F$ 在准线的下方、左方、右方时，抛物线分别开口向下、向左、向右，这些图形都可由开口向上的情形经反射（§15.4.2）得到。§30.3.2 只推导开口向上的情形，其余方向同理。

````

### 30.3.2　标准方程的推导（Derivation of the Standard Equation）

定义给的是距离等式，下一步照 §30.2.1 的五步法把它翻译成关于 $x$、$y$ 的方程。关键在「建」：把顶点放在原点、对称轴放在 $y$ 轴上、开口向上，$F$ 与 $\ell$ 就取到最简单的形式。

````ad-thm
title: 定理（抛物线的标准方程） | Theorem（Standard Equation of the Parabola）

设 $p > 0$。到定点 $F(0, p)$ 与到定直线 $\ell: y = -p$ 距离相等的点的轨迹是抛物线

$$x^2 = 4py, \qquad \text{即} \qquad y = \dfrac{1}{4p}\,x^2,$$

顶点在原点，对称轴为 $y$ 轴，开口向上（如图 30-24 所示）。这个方程称为抛物线的**标准方程**。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \draw[gray,->] (-3.6,0)--(3.8,0);
  \draw[gray,->] (0,-2.5)--(0,2.9);
  \coordinate (V) at (0,0);
  \coordinate (F) at (0,1.5);
  \coordinate (K) at (0,-1.5);
  \draw[blue!65!black,very thick] plot[variable=\x, domain=-3.2:3.2, samples=60, smooth] (\x,{\x*\x/6});
  \draw[gray,densely dashed,thick] (-3.1,-1.5)--(K)--(2.4,-1.5);
  \draw[very thick] (0,0.14)--(0,0.39);
  \draw[very thick] (0,-0.39)--(0,-0.14);
  \fill (V) circle (2.2pt);
  \fill (F) circle (2.4pt);
  \node[right] at (0.14,1.56) {$F(0,p)$};
  \node[right] at (0.14,0.32) {$p$};
  \node[below right] at (0.1,-0.06) {$V$};
  \node[left] at (-0.2,-0.32) {$p$};
  \node[right] at (-3.1,-1.68) {$\ell: y=-p$};
  \node at (3.68,-0.24) {$x$};
  \node at (-0.28,2.78) {$y$};
\end{tikzpicture}
\end{document}
```

> 图 30-24：抛物线 $x^2=4py$ 的配置。
>
> 顶点 $V$ 在原点，对称轴为 $y$ 轴，焦点 $F(0,p)$，准线 $\ell: y=-p$，开口向上。
````

````ad-proof
title: 证明 | Proof

**建系与设点（如图 30-25 所示）**：顶点取为原点，对称轴取为 $y$ 轴，开口向上。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (F) at (0,1.5);
\coordinate (K) at (0,-1.5);
\coordinate (P) at (2.4,0.96);
\coordinate (M) at (2.4,-1.5);
\draw[gray!60, ->] (-3.4,0) -- (3.4,0) node[right] {$x$};
\draw[gray!60, ->] (0,-2.3) -- (0,2.9) node[above] {$y$};
\draw[dashed] (-3.1,-1.5) -- (3.1,-1.5);
\draw[blue!65!black, domain=-2.8:2.8, samples=50, smooth] plot (\x,{\x*\x/6});
\draw (F) -- (P);
\draw[dashed] (P) -- (M);
\draw (1.182,1.152) -- (1.218,1.308);
\draw (2.32,-0.27) -- (2.48,-0.27);
\draw (2.25,-1.5) -- (2.25,-1.35) -- (2.4,-1.35);
\fill (O) circle (1.2pt) node[below left] {$V$};
\fill (F) circle (1.3pt) node[right] {$F(0,p)$};
\fill (K) circle (1.2pt) node[below left] {$K$};
\fill (P) circle (1.3pt) node[above right] {$P(x,y)$};
\fill (M) circle (1.2pt) node[below right] {$M$};
\node[above left] at (-3.0,-1.5) {$\ell: y=-p$};
\node[right] at (0.07,0.75) {$p$};
\node[right] at (0.07,-0.75) {$p$};
\end{tikzpicture}
\end{document}
```

> 图 30-25：建系。
>
> 顶点 $V$ 在原点，对称轴为 $y$ 轴，$F(0, p)$、$K(0, -p)$，准线 $\ell: y = -p$。
>
> 轨迹上任一点 $P(x, y)$ 满足 $PF = PM$（单撇），$M$ 为垂足。

$F$ 到顶点距离为 $p$，故 $F(0, p)$；

$V$ 是 $FK$ 的中点，故 $K(0, -p)$，准线 $\ell: y = -p$。

设 $P(x, y)$ 为轨迹上任一点，$PM \perp \ell$，垂足为 $M$。

**列式**：由抛物线定义，$PF = d(P, \ell)$：

$$\sqrt{x^2 + (y - p)^2} = \lvert y - (-p) \rvert = \lvert y + p \rvert.$$

**化简**：两边非负，平方是等价变形：

$$x^2 + (y - p)^2 = (y + p)^2.$$

两边展开：

$$x^2 + y^2 - 2py + p^2 = y^2 + 2py + p^2.$$

消去两边的 $y^2$ 与 $p^2$，移项：

$$x^2 = 4py.$$

取 $p = 1$ 时，方程就是 $x^2 = 4y$（如图 30-26 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (F) at (0,1);
\draw[gray!60, ->] (-3.5,0) -- (3.5,0) node[right] {$x$};
\draw[gray!60, ->] (0,-1.8) -- (0,3.0) node[above] {$y$};
\draw[dashed] (-3.1,-1) -- (3.1,-1);
\draw[blue!65!black, thick, domain=-3.15:3.15, samples=60, smooth] plot (\x,{\x*\x/4});
\fill (O) circle (1.2pt) node[below left] {$V$};
\fill (F) circle (1.3pt) node[right] {$F(0,1)$};
\node[above left] at (-3.0,-1) {$\ell: y=-1$};
\node[blue!65!black] at (2.55,2.35) {$x^2=4y$};
\end{tikzpicture}
\end{document}
```

> 图 30-26：$p = 1$ 时标准方程为 $x^2 = 4y$，即 $y = \dfrac{1}{4}x^2$（蓝）；
>
> 焦点 $F(0, 1)$，准线 $\ell: y = -1$。

**检验等价性**：由 $x^2 = 4py$ 与 $p > 0$ 知 $y \ge 0$，轨迹上的点都在 $x$ 轴及其上方，与「顶点在原点、开口向上」一致。

反过来，任取满足 $x^2 = 4py$ 的点 $(x, y)$，有 $y + p \ge p > 0$，回代：

$$PF = \sqrt{x^2 + (y - p)^2} = \sqrt{4py + y^2 - 2py + p^2} = \sqrt{(y + p)^2} = y + p = d(P, \ell),$$

确实满足条件。

两个方向都成立，轨迹恰为 $x^2 = 4py$ 的全部解。

````

````ad-note
title: 注记（与二次函数一般式的关系） | Note（Relation to the General Quadratic Form）

把标准方程写成 $y = \dfrac{1}{4p}x^2$，与第二十一章的二次函数对照。配方法（§21.2）把任何 $y = ax^2 + bx + c$（$a \ne 0$）化成顶点式 $y = a(x - h)^2 + k$，顶点为 $(h, k)$。把标准抛物线平移（§15.4.1）后即得

$$(x - h)^2 = 4p(y - k),$$

焦点为 $(h, k + p)$，准线为 $y = k - p$（$a > 0$ 时；$a < 0$ 时开口向下，焦点为 $(h, k - p)$，准线为 $y = k + p$，由反射 §15.4.2 得到）。比较系数：

$$\lvert a \rvert = \dfrac{1}{4p}, \qquad \text{即} \qquad p = \dfrac{1}{4\lvert a \rvert}.$$

于是任何形如 $y = ax^2 + bx + c$ 的抛物线都是「到定点与定直线等距」的轨迹，这正是 §30.2.2 注记所说三类轨迹方程中抛物线一类的完整几何身份。§30.2.2 示例中的抛物线 $x^2 = 8y$ 对应 $4p = 8$，即 $p = 2$：焦点 $(0, 2)$，准线 $y = -2$，与题目所给完全一致。
````

### 30.3.3　系数 $a$ 的几何意义（Geometric Meaning of the Coefficient）

§21.6 已总结过代数观察：$\lvert a \rvert$ 越大，开口越窄；$\lvert a \rvert$ 越小，开口越宽。有了 $p = \dfrac{1}{4\lvert a \rvert}$，这个「宽窄」有了几何解释。对 $y = ax^2$（顶点在原点、对称轴为 $y$ 轴）：

$$p = \dfrac{1}{4\lvert a \rvert};$$

$a > 0$ 时焦点为 $(0, p)$、准线为 $y = -p$；$a < 0$ 时开口向下，焦点为 $(0, -p)$、准线为 $y = p$。下面把 $a > 0$ 的两条抛物线画在一起作比较。

````ad-note
title: 注记（焦距越大，开口越宽） | Note（Larger Focal Length, Wider Opening）

1. **$a$ 由焦距决定**：二次项系数不是一个任意的「拉伸因子」，它与焦距 $p$ 互为倒数（相差因子 $4$）。$\lvert a \rvert$ 相同的抛物线焦距相同，形状完全一样（相差平移与反射）。
2. **反比关系**：$p$ 越大，焦点离顶点越远，$\lvert a \rvert$ 越小，开口越宽；$p$ 越小，焦点离顶点越近，$\lvert a \rvert$ 越大，开口越窄（如图 30-27 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (F1) at (0,0.25);
\coordinate (F2) at (0,1);
\draw[gray!60, ->] (-3.6,0) -- (3.6,0) node[right] {$x$};
\draw[gray!60, ->] (0,-1.7) -- (0,2.9) node[above] {$y$};
\draw[dashed, red!65!black] (-1.0,-0.25) -- (1.0,-0.25);
\draw[dashed, blue!65!black] (-2.4,-1) -- (2.4,-1);
\draw[red!65!black, thick, domain=-1.5:1.5, samples=40, smooth] plot (\x,{\x*\x});
\draw[blue!65!black, thick, domain=-3.0:3.0, samples=60, smooth] plot (\x,{\x*\x/4});
\fill[red!65!black] (F1) circle (1.4pt);
\fill[blue!65!black] (F2) circle (1.4pt);
\fill (O) circle (1.2pt) node[below left] {$V$};
\node[red!65!black] at (1.62,2.45) {$y=x^2$};
\node[blue!65!black] at (2.55,2.35) {$y=\frac{1}{4}x^2$};
\end{tikzpicture}
\end{document}
```

> 图 30-27：红色 $y = x^2$：$\lvert a \rvert = 1$，焦距 $p = \dfrac{1}{4}$，焦点 $\left(0, \dfrac{1}{4}\right)$（红点），准线 $y = -\dfrac{1}{4}$（红虚线），开口窄；
>
> 蓝色 $y = \dfrac{1}{4}x^2$：$\lvert a \rvert = \dfrac{1}{4}$，$p = 1$，焦点 $(0, 1)$（蓝点），准线 $y = -1$（蓝虚线），开口宽。
>
> 焦距越大，开口越宽。

一句话：按几何意义说，$\lvert a \rvert$ 说的是抛物线的**形状**，$\lvert a \rvert$ 相同则张开的程度相同；焦点与顶点的距离 $p$ 说的才是**位置**，焦点离顶点多远，抛物线就有多宽。

````

````ad-note
title: 注记（抛物线的光学性质） | Note（Optical Property of the Parabola）

以下光学性质超出 DSE 常规课程的要求，作增润处理。
平行于对称轴的光线射向抛物面，经反射后全部通过焦点 $F$；反过来，把光源放在焦点处，经抛物面反射后得到一束平行于对称轴的光（如图 30-28 所示）。这条性质可以用光的反射定律与抛物线在入射点处的切线证明，证明超出本章范围。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (F) at (0,1);
\coordinate (Q1) at (-2,1);
\coordinate (Q2) at (2,1);
\coordinate (Q3) at (0.8,0.16);
\draw[blue!65!black, thick, domain=-3:3, samples=60, smooth] plot (\x,{\x*\x/4});
\draw[dashed, gray!70] (0,-0.8) -- (0,3.2);
\draw[->, gray] (-2,3.0) -- (-2,1.16);
\draw[->, gray] (2,3.0) -- (2,1.16);
\draw[->, gray] (0.8,2.4) -- (0.8,0.32);
\draw[->, red!65!black] (Q1) -- (-0.16,1);
\draw[->, red!65!black] (Q2) -- (0.16,1);
\draw[->, red!65!black] (Q3) -- (0.11,0.885);
\fill (F) circle (1.4pt) node[right] {$F$};
\fill (Q1) circle (1.2pt) node[left] {$Q_1$};
\fill (Q2) circle (1.2pt) node[right] {$Q_2$};
\fill (Q3) circle (1.2pt) node[below right] {$Q_3$};
\node[right, gray!70] at (0.03,3.05) {axis};
\end{tikzpicture}
\end{document}
```

> 图 30-28：抛物线为 $y = \dfrac{1}{4}x^2$（焦距 $1$，焦点 $F$）。
>
> 三束平行于对称轴的光线（灰色箭头）射到抛物线上的 $Q_1$、$Q_2$、$Q_3$，反射后（红色箭头）全部通过焦点 $F$。

应用随处可见：卫星天线与射电望远镜用「接收」方向，平行信号经反射汇聚于焦点，接收器就装在焦点处；汽车前灯与探照灯用「发射」方向，灯泡装在焦点处，射出的光束平行。「焦点」一词，正来自这种光的汇聚。

````

回到第二十一章的 $y = ax^2 + bx + c$：现在知道它的图像都是「到定点与定直线等距」的轨迹，$a$ 与焦距互为倒数，开口宽窄不再是代数的神秘现象，而是焦点远近的几何事实。

---

## 30.4　小结（Summary）

````ad-note
title: 注记（本章主线与易错点） | Note（Main Threads and Common Pitfalls）

**三条主线：**

1. **几何视角（§30.1）**：轨迹是满足几何条件的点的集合，$\mathcal{L} = \{P : C(P)\}$；纯粹性（不多）与完备性（不少）对应 $\iff$ 的两个方向，论证一条轨迹必须双向进行。基本对象改用条件定义：线段 $\overline{AB}$ 是 $PA + PB = AB$、圆是 $OP = r$、圆盘是 $OP \le r$、半平面是 $ax + by + c$ 的符号、抛物线是 $PF = d(P, \ell)$；直线 $AB$ 是共线点集，定义在 §20.1.2，本章只作轨迹语言的重述。两种基本轨迹各有一条集合等式：$\mathcal{L}_1 = \ell$（垂直平分线）、$\mathcal{L}_2 = b_1 \cup b_2$（两条互相垂直的角平分线）。另外三类条件的轨迹不在 §30.1.3：圆就是 §30.1.2 的定义本身，与定直线保持固定距离、与两平行线保持等距两类由 §30.2.1 的两条坐标定理给出。两条几何定理的证明全由旧工具组装：上一章的两条等距引理。方程一侧的语言也归在几何视角里：条件的代数式就是轨迹的方程（§30.1.1 注记（轨迹的方程），回指 §19.2.1），化简与检验归 §30.2.1 的第五步。把轨迹说完整，还要按几何意义报出它的形状与位置（§30.1.1 注记（轨迹的几何意义））。
2. **代数视角（§30.2）**：轨迹方程 $F(x, y) = 0$ 必须与条件 $C(P)$ 等价，等价一坏就出增根或漏点。五步法（建、设、限、代、化）是通用流程；三种策略各有场合：直接法逐步翻译，定义法对照基本轨迹，参数法（增润）借中间变量过渡。检验守住三道关：不可逆变形的增根、公式的隐含前提、题意的退化位置。直线型的两类条件在本节算清：$d(P, L_1) = d$ 拆绝对值即得 $L^{+}$、$L^{-}$ 两条平行线；两平行线 $ax + by + c_1 = 0$ 与 $ax + by + c_2 = 0$ 的中线是 $ax + by + \frac{c_1 + c_2}{2} = 0$，「正中间」原来是取平均。课程要求的轨迹方程有三类：直线、圆、抛物线。
3. **抛物线作为轨迹（§30.3，延伸）**：抛物线是到定点（焦点）与定直线（准线）等距的点的轨迹，顶点在原点、开口向上时标准方程为 $x^2 = 4py$；与 $y = ax^2$ 比较得 $p = \dfrac{1}{4\lvert a \rvert}$，开口宽窄的几何本源是焦距。

**易错点：**

- 描述轨迹不完整：只说类型不说位置（「一条直线」而非「线段 $\overline{AB}$ 的垂直平分线」），或数错图形（$d(P, L) = d$ 是两条直线，到两相交直线等距是两条互相垂直的平分线）。
- 求出方程后忘记排除退化点（如三角形顶点与另两点共线的位置），或忘记附加限制（如 $x \ne \pm 3$）。
- 两边平方后不检验等价性，混入增根。
- 变形前后不核对定义域：式子在某点无意义（根号内为负、分母为零），该点就不是方程的解，轨迹上也不该出现（§19.1.3 的自然定义域）。
- 把点到直线的距离与两点距离混用：$d(P, L)$ 是垂线段的长。
- 参数法消参后忘记检查参数范围，把一部分曲线误答成整条曲线。
- 把焦距 $p$ 当成焦点到准线的距离：后者是 $2p$，$p$ 是焦点到顶点的距离。
````

### 方法总表

| 目标 | 已知条件 | 方法 | 主要依据 |
|:---|:---|:---|:---|
| 描述并描绘轨迹 | 距离型条件（对定点、对定直线） | 对照两种基本轨迹一览的集合记号，与圆、两条平行线的定义，答「类型 + 位置」 | §30.1.2、§30.1.3、§30.2.1 |
| 说出轨迹的几何意义 | 已求得的轨迹或它的方程 | 报出形状（哪一类图形）与位置（圆心与半径、顶点与对称轴等） | §30.1.1、§30.3.3 |
| 把已知几何对象写成点集条件 | 图形名称（直线、圆、抛物线等） | 按一览反查距离等式或不等式 | §30.1.2 |
| 判断某个方程是否所求轨迹的方程 | 条件 $C(P)$ 与候选方程 $F(x, y) = 0$ | 两个方向各查一次：方程的解都满足条件，满足条件的点都是解 | §30.1.1、§30.2.1 |
| 求轨迹方程（通用） | 任何几何条件 | 五步法：建、设、限、代、化 | §30.2.1 |
| 求直线型轨迹的方程 | $d(P, L_1) = d$，或两平行线等距 | 用 §20.5.1 的距离公式拆绝对值；中线取两式左端的平均 | §30.2.1 |
| 快速求轨迹方程 | 条件命中基本轨迹 | 定义法：先点名图形，再化为方程 | §30.2.2 |
| 求轨迹方程（动点间接确定） | 动点依赖另一变动量 | 参数法（增润）：设参数、消参数 | §30.2.2 |
| 求抛物线型的轨迹方程 | 到定点与定直线等距 | 直接法逐步翻译，或认出焦点与准线 | §30.2.2、§30.3.2 |
| 求 $y = ax^2 + bx + c$ 的焦点与准线 | 二次函数 | 配方定顶点 $(h, k)$，$p = \dfrac{1}{4\lvert a\rvert}$ | §30.3.3 |

回顾全章：轨迹是「条件 → 点集」的对应，在几何世界里描述图形，在坐标世界里写出方程，两边由等价性衔接。五类条件中圆排第一，这一安排意味深长：本章从「到定点等距」出发得到了 $x^2 + y^2 = r^2$，下一章将把圆的方程系统展开，讨论圆的一般方程、直线与圆的交点和圆的切线。届时本章的「轨迹方程」将长成解析几何的完整篇章。

---

## 中英对照词汇表（Glossary）

| 中文术语 | 英文 | 符号或简写 | 备注 |
| --- | --- | --- | --- |
| 轨迹 | Locus | $\mathcal{L}$ | 满足几何条件的点的集合 |
| 动点 | Moving Point | $P$ | 属于轨迹的点 |
| 几何意义（轨迹的） | Geometric Meaning |  | 轨迹的形状与位置；§30.1.1 注记（轨迹的几何意义） |
| 完备性 | Completeness |  | 满足条件的点都在轨迹上（不少、无漏点） |
| 纯粹性 | Exclusiveness |  | 轨迹上的每一点都满足条件（不多、无增根） |
| 三点共线 | Collinearity |  | 距离与坐标判据见 §20.3.1 的两条引理 |
| 介于两点之间 | Betweenness |  | $PA + PB = AB$，见 §20.3.1 |
| 线段 | Line Segment |  | $\{\,P : PA + PB = AB\,\}$ |
| 圆的内部 | Interior of a Circle |  | $\{\,P : OP < r\,\}$ |
| 圆盘 | Closed Disk |  | $\{\,P : OP \le r\,\}$，圆及其内部 |
| 半平面 | Half-plane | $H_{+}$、$H_{-}$ | $ax + by + c$ 的正负两块（记号同 §28.2.1） |
| 同侧与异侧 | Same Side and Opposite Sides |  | 代入直线方程所得两值同号与否 |
| 基本轨迹 | Basic Locus | $\mathcal{L}_1$、$\mathcal{L}_2$ | §30.1.3 立定理的两条：两点等距、两相交直线等距；集合式与依据见该节一览 |
| 点到直线的距离 | Distance from a Point to a Line | $d(P, L)$ | 见 §8.6、§20.5.1 |
| 垂直平分线 | Perpendicular Bisector |  | 基本轨迹一，引理见 §29.1.1 |
| 角平分线 | Angle Bisector |  | 基本轨迹二，两条互相垂直 |
| 中线（两平行线的） | Midline of two parallel lines | $m$ | §30.2.1 定理；方程为两式左端的平均；与三角形的中线（§29.3.1）、中位线（§8.6）无关 |
| 方程的定义域 | Domain of an Equation | $D_f$ | 使 $F(x, y)$ 有意义的点集（§19.1.3 自然定义域，记号同彼节） |
| 方程的解集 | Solution Set | $\mathcal{S}$ | $\{\,(x, y) : F(x, y) = 0\,\}$（§20.1.2 起沿用） |
| 方程的图形 | Graph of an Equation |  | 解集这个点集（§19.2.1 注记）；轨迹的方程要求 $\mathcal{L} = \mathcal{S}$ |
| 轨迹的方程 | Equation of a Locus | $F(x, y) = 0$ | 条件的代数式，与条件等价（§30.1.1 注记（轨迹的方程）） |
| 增根 | Extraneous Root |  | 不可逆变形引入、不满足原条件的解（§30.2.1 警告） |
| 漏点 | Lost Point |  | 满足条件却未被方程收进的点（§30.2.1 警告） |
| 五步法 | Five-Step Method |  | 建、设、限、代、化 |
| 退化 | Degenerate |  | 共线、重合等使图形塌缩 |
| 直接法 | Direct Method |  | 条件直接翻译成代数 |
| 定义法 | Definition Method |  | 先照定义点名图形，再写方程（§30.2.2） |
| 参数法 | Parameter Method |  | 增润；消去参数 |
| 参数 | Parameter | $t$、$\theta$ | 中间变量 |
| 参数方程 | Parametric Equations | $x = f(t)$、$y = g(t)$ | 增润 |
| 抛物线 | Parabola |  | 到定点与定直线等距的轨迹 |
| 焦点 | Focus | $F$ |  |
| 准线 | Directrix | $\ell$ |  |
| 顶点 | Vertex | $V$ | $FK$ 的中点，离准线最近 |
| 对称轴 | Axis of Symmetry |  | 过焦点且垂直于准线的直线 |
| 焦距 | Focal Length | $p$ | $p = \dfrac{1}{4\lvert a \rvert}$ |
| 标准方程 | Standard Equation | $x^2 = 4py$ | 顶点在原点、开口向上 |
| 光学性质 | Optical Property |  | 增润；平行光反射后过焦点 |

## 备课提示（Teaching Notes）

1. **用长时间曝光照片与动态几何软件引入。** 官方课程阐释建议以汽车照明灯、星流迹的长时间曝光照片引入轨迹概念，课堂可用动态几何软件拖动点 $P$ 观察痕迹。同时要强调官方特别提醒的一点：数学中的轨迹不一定涉及点的移动，建立直观后要及时回到集合视角（§30.1.1 注记（轨迹不一定涉及运动）为此而设）。

2. **与上一章衔接、避免重复。** 圆的定义、两条等距引理、直角三角形的外接圆半径公式都已在第二十九章建立，本章只是把它们重新组装成轨迹语言。圆在本册出现三次的分工要讲清：§8.9「圆的基本概念」小节给文字集合式、§29.1.1 给符号式、§30.1.2 把它认作「到定点等距」这一条件所确定的轨迹，三者不是重复而是逐层收紧。建议课堂先让学生复述两条等距引理，再证基本轨迹一与二，体会「用已建立的定理组装新结论」的方法；这也是本教材一贯的方法构建原则：不新增中间概念，用前文定理直接搭桥。

3. **等价性是本章的灵魂。** 纯粹性与完备性、轨迹方程所要求的恒等（§30.1.1 注记（轨迹的方程））、五步法第五步的检验、增根与退化，是同一件事在不同位置的表现。§30.2.1 的示例（$PA \perp PB$）有两个「洞」：斜率公式在 $x = \pm 3$ 失效、$P$ 与 $A$ 或 $B$ 重合时三角形退化，建议让学生亲手把这两个洞找出来，体会为什么检验不可省。

4. **描述规范要刻意训练。** 课程的描绘与描述题要求「类型 + 位置」齐全：线段 $\overline{AB}$ 的垂直平分线、$L$ 两侧各距 $d$ 的两条平行线、两条互相垂直的角平分线。常见的第一种错误是只答类型；其次是数错图形条数（$d(P,L)=d$ 答成一条、角平分线答成一条）。这个要求就是 §30.1.1 注记（轨迹的几何意义）所指的形状与位置两件：训练时先让学生分别答出这两件，再合成一句完整描述。

5. **五类条件的落点与证明深度。** DSE 要求的五类条件本章分三处结清：与一点保持固定距离的那一类就是 §30.1.2 圆的定义，就地说明即可；与一直线保持固定距离、与两平行线保持等距那两类不另给综合几何证明，直接到 §30.2.1 用距离公式拆绝对值，三行算完，学生也更容易记住是「两条」；余下两类（两点等距、两相交直线等距）在 §30.1.3 各有一条双向证明，用到 §29.1.1、§29.3.1 两条等距引理：能力一般的班级可以只作图演示、用刻度尺量距接受结论；能力强的班级应完整走双向论证，为「轨迹题必须证两个方向」的答题格式打底。

6. **增润内容的定位。** 参数法（§30.2.2）与 §30.3 全部（焦点与准线定义、标准方程、系数 $a$ 的几何意义、光学性质）超出 DSE 常规课程要求，正文已自标，课堂可视学生能力取舍，不进入统一测验范围。但须区分：**求抛物线型的轨迹方程本身属课程要求**（考纲要求会求轨迹为直线、圆和形如 $y = ax^2 + bx + c$ 的抛物线的方程），核心示例已放在 §30.2.2（直接法之二），必须讲。

7. **与习题册的接口。** 本章各节命题以节首难度上限为上确界；参数法与 §30.3 内容属增润，不作为「各章小节」命题素材，如需入题只可放综合练习或理论习题。

8. **§30.1.2 是补课节，不新增考点。** 三点共线的判据与「直线 $=$ 一次方程的解集」已在 §20.3.1、§20.3.2 建立并证明，§30.1.2 只作轨迹视角的重述；「方程」这一组概念（定义域、解集、图形）已在 §19.2.1 的注记、§19.1.3 与 §20.1.2 讲定，本章不再另立定义，只在 §30.1.1 注记（轨迹的方程）里接到轨迹上，课堂点到位即可，不必展开一般方程的讨论。

9. **与后续章节的接口。** 圆的方程将在下一章系统展开（标准方程与一般方程、直线与圆的交点、圆的切线）；抛物线的平移与反射接 §15.4 与 §21.2 的配方法；「条件 → 点集」的思考方式与第二十八章不等式解集、可行区域的视角一脉相承，可提醒学生互相印证。

---

✅ 已執行（2026-09-14）：第二輪八處批注落實，集中 §30.1。①重寫定義（軌跡）：「條件 $C$ 所確定的軌跡」後補「或稱作點 $P$ 的軌跡」；就地聲明動點並顯式給出座標形式 $\mathcal{L} = \{(x, y) : C(x, y) \text{ 為真}\}$，「直觀理解」段併入，原「定義（動點）」塊撤銷；「對任意一點 $P$」改「任取一點 $(x_0, y_0)$」，完備性與純粹性式中點記號同步，免 $P$ 一身兩職。②完備性與純粹性兩條、收束句與圖 30-1 自定義塊下移，新建「注記（完備性與純粹性）」。③過渡句改「其實都可以用軌跡的定義來描述」。④§30.1.2 開頭改「先定義、後定理」：「基本軌跡一：圓」由注記改為定義環境並補座標形式 $x^2 + y^2 = r^2$ 與圓規畫圓說法，新增「定義（直線的軌跡語言）」（§20.1.2 重述、作「條件 ↔ 方程」成例），其後交代其餘四種為定理。⑤基本軌跡二至五陳述統一寫出動點 $P(x, y)$。⑥連帶壓縮 §30.2.1 開頭段防重複。無新增定理與方法，三節難度上限不變；圖號 30-1 至 30-15 不變，21 個 tikz 塊原樣搬移並重編譯通過、圍欄配對 0 錯、註解符號清零。同步：關聯分析第二部分 §30.1 行（14→15 板塊）與第三部分 §30.1.1、§30.1.2 兩行改寫；《給讀者的簡介》更新日志當日之前追加 Ch30（修訂）條。

✅ 已執行（2026-09-18）：第三輪：按用戶指示「先前對於各種幾何圖形的定義不完備……建議在這裡先從軌跡的角度出發重新定義一次」新增 §30.1.2「幾何對象的軌跡定義」補課節，原 §30.1.2「五種基本軌跡」順延為 §30.1.3。①新節：引理（三點共線的距離刻畫與座標判據）＋證明（以 $PA+PB=AB$ 等三式刻畫共線與「介於」，座標判據分斜線／鉛垂線兩情形，補上 §20.2.3 因用斜率而排除鉛垂線的缺口）；定義（線段、射線與直線）（三者作點集，座標式展開即 $ax+by+c=0$，與 §20.1.2 會合）；定義（圓、圓的內部與圓盤）（附圓周／周長／圓盤辨異）；定義（半平面、同側與異側）（§28.2.1 所用語言的正式定義與符號判據）；定義（拋物線）（$\{P : PF = d(P,\ell)\}$，兌現 §21.1.1 的預告，專名留 §30.3.1）；注記（同一模式還能定義的圖形）（橢圓／雙曲線／阿波羅尼斯圓／球面，自標常規課程不作要求、只述結論）；注記（幾何對象的軌跡刻畫一覽）。用戶指定：角、角的內部、夾角與垂直不在此重定義（遵從直觀），亦不引入向量概念。②§30.1.3 去重：「定義（基本軌跡一：圓）」改為定理＋證明，「定義（直線的軌跡語言）」整塊迁入新節，五種軌跡全部以定理呈現，必修 12.2 五條不缺；並刪去一句不成立的回指（原文稱圓「仍是 §8.9 里用圓規畫出的那個圖形」，全庫檢索「圓規」一詞僅此一处，§8.9 原文無）。③配圖：按用戶「要引入大量配圖」新增 17 幅（共線三位置、三角形對照、座標判據兩情形、線段／射線／直線三態、直線與方程、圓／內部／圓盤、同側／異側、拋物線、橢圓／雙曲線），幾何量一律實算；全章圖號按題注出現順序重編為圖 30-1 至圖 30-37（51 個 tikz 塊），改動 94 行，正文引用同步。④連帶同步：章首主線段、§30.1 引言工具清單、§30.1.1 末過渡段、§30.2.1 與 §30.2.2 節號引用、§30.4 小結主線 1、方法總表（改 §30.1.3 並新增「把已知幾何對象寫成點集條件」一行）、詞彙表（27→35 條）、備課提示（第 2 條補圓的三處分工，新增第 8 條，原第 8 條順延為第 9 條）；§30.3.1 定義塊改為「定義（焦點、準線、頂點與焦距）」以免重複。⑤難度上限：§30.1 的 Q 維由 C+ 上調為 B-（一覽式定義把 Ch8、Ch16、Ch20、Ch28 四條線並到一處），T／C／E 不變。驗證：51 個 tikz 塊本機 pdflatex 全部編譯通過；圍欄配對 0 錯、層級與編號錯置 0、註解符零殘留、板塊全在 4.2 白名單、7 個結論板塊與 ad-proof 一一配對、51 條題注連號無懸空且均被正文引用、表格內無裸豎線、單塊均不超 40 行。⑥補正（同日，兩次往復）：用戶先指出分幅圖連排、我錯在只給每幅圖補了一句指針式錨句而圖仍堆在板塊末尾；用戶再問「你的配圖位置怎麼沒改」後，才把圖單元（圖塊連題注）整體搬到各自的概念句之下。新節 14 幅：30-3A 留在引理，30-3B、30-3C 移入證明「第二、三種位置」兩句之後；30-6A/B/C 分貼線段、射線、直線三條定義；30-8A/B/C 分貼圓、內部與外部、圓盤；30-9A/B 分貼同側、異側；30-11A/B 分貼橢圓、雙曲線（該三項由列表改為段落，免圖塊插進列表斷了渲染）。舊批次遺留 10 幅（30-17A/B/C、30-19A/B/C、30-32、30-34、30-36、30-37）一并上移貼錨。判據同時升級：新增「圖扎堆」審計（相鄰兩圖之間若沒有點名後圖的概念句即報扎堆），不再單靠「圖上方有無圖號」這種會被指針句瞞過的判据。終檢：51 幅扎堆 0、錨句違規 0、圍欄 0 錯、題注 51 條連號無孤兒、51 個 tikz 塊編譯全過。⑦補正（同日）：用戶指出本節定義只給了點集寫法、未落到軌跡語言，已把每條定義前補上同一句式「動點 $P$ 在某條件下運動，它形成的軌跡就是某圖形」（介於、線段、射線、直線、圓、圓的內部與外部、圓盤、兩個半平面、拋物線各一句），注記裡的橢圓／雙曲線／阿波羅尼斯圓／球面同步改寫，一覽表表頭改為「圖形（即軌跡）｜動點 $P$ 滿足的條件｜軌跡的坐標式」並加讀法一句，節首與 §30.1.3 開頭各補一句交代這個句式。⑧補正（同日）：用戶指出定義中各概念的敘述擠在一起、引入的公式只作行內。現按「一段一義」重排：引理的三式與坐標判據、線段／射線／直線各自的集合式與坐標形式、圓的坐標形式 $x^2+y^2=r^2$、半平面與閉半平面的集合式、同側與異側的乘積判據、橢圓／雙曲線／阿波羅尼斯圓的條件式，一律提成行間公式（新節現共 21 條行間公式）；圓周／周長／圓盤辨異改為列表；半平面條目拆為半平面、閉半平面、三塊之分、同側、異側五段；拋物線條目拆為專名句、條件式、軌跡記號三段。工具教訓：在 PowerShell 命令的參數位上寫「字串 + 運算元」會被當成額外參數而靜默丟掉尾巴，第一次批量替換因此截掉九處尾句，已全部補回並複檢（懸空句尾掃描 0、圍欄 0 錯、51 圖扎堆 0、錨句 0、編譯 51/51）。⑩改址（同日）：用戶再指出引理證明要用斜率（情形 1 比 $m_{AP}=m_{AB}$），擱在 §20.1.2 屬術語前置違規，已把 ad-lem、ad-proof、推導段與五幅圖整體移至 §20.2.3（斜率判定定理與其注記之後），Ch30 全節的 §20.1.2 引用改指 §20.2.3，Ch20 §20.1 難度上限回退為 T C ｜ C D ｜ E C ｜ Q B、§20.2 調為 T B ｜ C D+ ｜ E C+ ｜ Q C。⑨改寫（同日）：用戶指示把「三点共線的距離刻畫」搬到 Ch20 當作引出直線方程的手段，Ch30 只留軌跡視角的描述與重定義，並刪除射線相關內容。Ch30 側：ad-lem 與 ad-proof 兩塊連同其五幅圖（原 30-3A/B/C、30-5A/B）移出，改為節首三段交代「判據已在 §20.1.2 建立，本節取用其距離判據與坐標判據」；「定義（線段、射線與直線）」改名「定義（線段與直線）」，射線條目與其圖刪除；一覽表刪射線行、直線行的前文出處改註 §20.1.2 引理；詞彙表刪射線行、三點共線與介於兩行改指 §20.1.2；備課提示第 8 條改為「不必重證引理」。全章圖號按題注入出現順序重編為圖 30-1 至圖 30-34（44 個 tikz 塊，改動 88 行），下一新號 30-35；板塊 43 → 41（§30.1 由 24 → 22）。
姊妹側同步：Ch8 補「定義（兩直線垂直）」與圓的周長用詞、Ch21／Ch28 加前向鏈接、規範 4.4 新增「定義的完備性」通則並列歷史存量 L16、考綱對照 Ch8／Ch30 四行改寫、本欄更新日志。

✅ 已執行（2026-09-18）：第四輪十二處批注（用戶開場指示「我註釋了 Chapter 30 的課題講義，直接修改。」，免寫方案章節、直接落地）。①**章節重排**（批注：「事實上，在一開始簡介軌跡的時候就已經利用集合論的方法了。而集合論本身就是定義 $R^2$ 上方程的必需工具，本章節主要講述如何求解軌跡的方程，相關的定義應該在 30.1 講明白。以此新目標重新編排整個章節」）：新增 §30.1.4「軌跡的方程」，§30.2.1 的定義（軌跡的方程）連其圖上移至該節，前置以「定義（二元方程的定義域、解集與圖形）」（$\mathcal{S}\subseteq D\subseteq\mathbb{R}^2$，以 $F(x,y)=\sqrt{x^2+y^2-1}$ 作定義域隨式子而變之例），後接「注記（檢驗為何必要：增根與漏點）」；§30.2.1 由「軌跡在坐標系中的嵌入」改名「求軌跡方程的五步法」，只留流程、坐標定理與示例。全章節號零重編（§30.2、§30.3 不動）。②**基本軌跡一**（批注：「這個已經變成定義了，刪掉」）：ad-thm＋ad-proof 連陳述圖刪除，改為加粗標題塊＋集合式 $\mathcal{L}_1=\{P:OP=r\}=C(O,r)$，明說條件與 §30.1.2 圓的定義同式、完備性與純粹性合成一次對讀、無須再證。③**集合記法**（批注：「欠缺集合記法。」）：二、三、四、五的陳述一律補 $\mathcal{L}_k=\{\,P:\cdots\,\}=$ 圖形，文字式 $\iff$ 改寫為 $P\in\cdots$；五種軌跡一覽表（批注：「記得同步改這個表格」）增「集合記號」「依據」兩列、行序按一至五重排，並補讀法一句。④**基本軌跡三**（批注：「這裡說的太繞了，有代數符號為什麼不用？說『是 $L_1$、$L_2$ 的兩條角平分線 $b_1$、$b_2$』」＋「這個定理明明給出了兩種結論……為什麼不用列表分別列出？」）：敘述改為「$b_1$、$b_2$ 為 $L_1$、$L_2$ 的兩條角平分線」，兩條結論（軌跡是兩條角平分線／$b_1\perp b_2$）分列為列表兩項，$\iff$ 另作行間式；圖隨之重畫（見⑥）。⑤**基本軌跡四**（批注：「刪掉這一個定理吧。」）：經提問確認取「刪幾何定理塊、改由坐標定理覆蓋」一檔——ad-thm＋ad-proof 連四幅圖（原 30-13、30-14A/B/C）刪除，§30.1.3 只留加粗說明與 $\mathcal{L}_4=L^{+}\cup L^{-}$ 並前指 §30.2.1，官方必修 12.2 五條仍全覆蓋。⑥**坐標定理入 §30.2.1**（批注：「這裡對中線的敘述不嚴謹，沒有說明什麼是『位於正中間』……我建議放到代數方程那裡作為定理：直接給出 $L_1$ 跟 $L_2$ 的一般方程，說明中線是 $L_1$ 與 $L_2$ 的平均」）：新增 ad-thm（平行線對與中線的方程）＋ad-proof，$d(P,L_1)=d$ 依 §20.5.1 化為 $\lvert u+c_1\rvert=\delta$ 再按 §6.3.1 拆為兩解即 $L^{\pm}$，兩側性由 §30.1.2 同側判據（代入值異號）判定；兩平行線等距由 $(u+c_1)^2=(u+c_2)^2$ 得 $(c_1-c_2)(2u+c_1+c_2)=0$，故中線為 $m:ax+by+\frac{c_1+c_2}{2}=0$，再由 §20.5.2 核出 $m$ 到兩線距離各為間距之半。§30.1.3 的基本軌跡五隨之改口：去「位於正中間」的直觀語，作「到兩者的距離都等於兩線間距離的一半」，中線一詞改由該軌跡自身定義，「正中間」的精確含義交給上述定理。⑦**配圖**（批注：「配圖錯誤」「配圖有問題，缺少了一個虛線段」「這幅配圖意義不明」「這個設立意義不明……不用給示例」）：基本軌跡三的陳述圖重畫（原圖只畫了一個圓與兩條平分線，既無 $L_1$、$L_2$ 又有無身份的 $P$、$Q$，現改畫兩相交直線與兩條角平分線，不預畫直角——那是待證的第二條結論）；基本軌跡五的陳述圖補上 $P$ 向 $L_2$ 的第二條虛線垂線段，兩垂足各加直角記號與等長單撇，並刪去屬於證明構造的 $AC$ 線及其等長記號（圖不得預畫結論）；刪除五步法 ad-alg 內誤掛的一句示例引語與其那一幅滑動桿中點圖（圖文不符、與五步法無關）及「五件事合起來……（如圖所示）」的懸空引用；新增四幅（定義域、解集、與 $L_1$ 相距 $d$ 的兩條平行線、中線取平均）。⑧**排版與自足性**：五步法「五件事」由 1.–5. 列表改為五段加粗標題（列表項內嵌 tikz 會斷渲染，規範 4.4）；基本軌跡二、三、五的 ad-proof 開頭各補一句重述本定理條件與新引入對象（規範 4.4「證明的自足性」）；軌跡三證明加「先證垂直／再證軌跡為兩條角平分線」分條；軌跡五證明補記 $AN=NB=h$（該記號原只見於題注，圖內符號須有身份）；圖 30-11A 題注改為逐句分行。⑨**連帶同步**：章首三條主線段改列 §30.1.2／§30.1.3／§30.1.4 三步、前置行補 [[Chapter 6 代数式|代數式]]（新定理用 §6.3.1）、§30.1 引言與 §30.1.1 末過渡段、§30.4 小結主線 1／2（補五條集合等式與方程定義）與易錯點（新增「變形前後不核對定義域」一條）、方法總表（新增「判斷某個方程是否所求軌跡的方程」§30.1.4 一行與「求直線型基本軌跡的方程」§30.2.1 一行）、詞彙表 34→37 條（定義域、解集、方程的圖形，另改基本軌跡／中線／軌跡的方程三行）、備課提示第 3、5、8 條。⑩**順帶修錯**：§30.1.2 節首一句「三點共線的判據……搬入 §20.1.2」係上輪改址漏網，已更正為 §20.2.3。⑪**難度上限回評**：§30.1 的 Q 維 B- → B（定義層再加一層：定義域、解集、圖形、方程）；§30.2 的 T 維 B → B+、Q 維 B- → B（新增帶雙向證明與分情形論證的坐標定理）；兩節的 C、E 維不變。板塊總數 41（§30.1 由 22 → 21、§30.2 由 11 → 12：刪軌跡一與四的 4 塊，增定義 1、注記 1、定理與證明各 1）。驗證：42 個 tikz 塊本機 pdflatex 全部編譯通過、單塊均不超 40 行；圍欄配對 0 錯、層級與編號錯置 0、註解符零殘留、板塊全在 4.2 白名單、5 個結論板塊與 5 個 ad-proof 一一配對、題注按出現順序連號為圖 30-1 至圖 30-34（42 幅，含分幅 A/B/C，圖號改動 31 行，下一新號 30-35）、無懸空引用亦無未引用題注、錨句審計 42 幅 0 違規、扎堆審計 0、表格內無裸豎線、全庫節號死鏈 0。
姊妹側同步：《官方考纲与课题讲义关联分析》Ch30 第二部分概要三行與第三部分§30.1.3／§30.2.1 等行改寫（§30.2.1 行標題隨改名更新、新增 §30.1.4 一行、全章配圖-statistic 改為 42 幅）、《給讀者的簡介》更新日志 2026-09-18 第四輪條置於同日段首、規範 4.4 新增「定義層的落點（章節重排的依據）」與「定義與判據的重複處置」兩條通則並改寫歷史存量 L16 的復核口徑、Ch16 §16.1.3 描寫法處加指向 §30.1.1／§30.1.4 的前向鏈接、Ch30 前置行補 Ch6。

✅ 已執行（2026-09-18）：第五輪十二處批注（用戶開場指示「我註釋了 chapter 30 課題講義，直接修改。」，免寫方案章節、直接落地），全章 `%%` 批注回收到零。①**§30.1.3 由五條收為三條**（批注：「標題改一改，不是五種，對應的措辭都需要改」；提問後用戶選定「三條：刪基本軌跡一與四」）：「基本軌跡一（圓）」與「基本軌跡四（到定直線距離為定值）」兩個 ad-thm／ad-proof 塊連同配圖刪除（圓即 §30.1.2 的定義、兩條平行線由 §30.2.1 的坐標定理給出），原二、三、五重編為一、二、三，符號改為 $\mathcal{L}_1=\ell$（垂直平分線）、$\mathcal{L}_2=b_1\cup b_2$（兩條角平分線）、$\mathcal{L}_3=m$（中線），全章的 $\mathcal{L}_4$、$\mathcal{L}_5$ 與「基本軌跡四／五」「五種基本軌跡」稱法一併清除；節首三段、規範段、呈現方式段、末過渡段與「三種基本軌跡至此齊備」改寫，一覽表由五行縮為三行、注記改名「注記（三種基本軌跡一覽）」；三條證明的符號同步（垂直平分線證明 $\mathcal{L}_2\to\mathcal{L}_1$、角平分線證明兩處 $\mathcal{L}_3\to\mathcal{L}_2$）、圖 30-12 題注同步；§30.1.2 的圓定義段、前指 §30.1.3 之句、阿波羅尼斯圓注記（基本軌跡二→一）、一覽表圓行備註、「位於 $L$ 兩側」措辭、「下文四種基本軌跡」→「三種」，另修好一列只有兩格的壞表格列（直線 $AB$ 行補齊五格）。②**§30.1.1 新增注記（軌跡的方程）**（批注：「以及我說的軌跡的方程，是在最一開始動點的限制條件定義裡加入的。即說 C(P) 的代數表達就是它的方程。可以寫成 F(x, y) = 0 的形式，這一點應該作為注釋提出」）：寫在定義（軌跡）之後、完備性注記之前，把 $OP=r$、$PA=PB$ 兩條條件就地寫成坐標式，依 §19.2.1 的注記（幾何圖形作為點集）說明條件的代數式就是軌跡的方程、$F(x,y)=0$ 的解集就是軌跡本身，並以 §20.1.2「直線＝二元一次方程的解集」為例，末句留出 §30.1.4 與 §30.2.1 第五步的接口。③**§30.1.4 改為「本節不另立定義」**（批注：「為什麼給出這個二元方程的定義？一個圖形的方程我早就在之前的課題定義過了」「定義錯誤，C(P) 的代數表達本身就是方程，你這一部分完全沒有看之前課題打下的定義」「刪除」「這一部分在 Chapter 19 全部定義過」「這一段文字全部刪除」）：刪去「定義（二元方程的定義域、解集與圖形）」（含兩幅圖）、「定義（軌跡的方程）」（含一幅圖）與「雙向箭頭不是可有可無的裝飾」一段，共 2 個 ad-def 塊、3 幅圖；節號與節名保留，節首改為回指 §19.2.1 的注記、§19.1.3 的自然定義域與 §20.1.2，本節只留「注記（檢驗為何必要：增根與漏點）」（首句改指「軌跡的方程要求恆等（§30.1.1 的注記）」）；章首三條主線段、§30.1 引言行、§30.2 引言行、小結主線 1、易錯點「變形前後不核對定義域」條、方法總表兩行、詞彙表三行、備課提示第 8 條同步改寫（不再引 §30.1.4 的三層包含，改指 §19.1.3）。④**§30.2.2 例題重編**（批注：「再給一條用直接法求一個垂直平分線的軌跡方程。再給另一條，關鍵是要凸顯直接法的泛用性，透過分析條件來解出軌跡方程，即便該方程最後是一個沒有學過的形態」「這個方程太特殊了，來些更一般的方程。而且現在這個例子沒有體現出這類方法的通用技巧，即斜率相乘等於負 -1 這一性質」「同步修改注釋」「切記不要給出用定義法求圓，因為此時沒有學習過圓的方程」）：新增直接法第三例 $PA=PB$（$A(-1,1)$、$B(3,5)$）得 $x+y-4=0$（五步俱全，檢驗段說明平方可逆、$A$、$B$ 不入解集，末句點出中點在線上、斜率之積 $-1$；配圖帶直角記號與單撇等長記號）；新增直接法第四例 $PA+PB=4$（$A(-1,0)$、$B(1,0)$）得 $3x^2+4y^2=12$（用戶選定「給橢圓，到兩定點之和為常數」；兩次平方的等價性寫足兩方向——前提 $x\le4$ 由 $x^2\le4$ 自動滿足，反向以 $PB=2-\frac12 x$、$PA=\frac12 x+2$ 之和為 $4$ 驗回；例前一句自標增潤、超出常規課程要求）；定義法示例由 $x=0$ 改為一般位置 $A(0,0)$、$B(4,2)$ 得 $2x+y-5=0$，逐步用 §15.2.3 中點公式、§15.2.6 斜率、§15.2.7 斜率之積 $-1$ 與 §20.3.1 點斜式，配圖重畫；「對照一下」段改以同條件兩題對讀；注記（考試要求的三類軌跡方程）同步改指（直線型改指第三例與定義法示例、聲明第四例橢圓不屬三類）；§30.1.2 橢圓注記加前指。⑤**§30.2.1 落點與措辭**：定理（平行線對與中線的方程）的導言、陳述與證明中的 $\mathcal{L}_4$、$\mathcal{L}_5$ 撤除，改作「與 $L_1$ 保持固定距離 $d$ 的動點」與「§30.1.3 的基本軌跡三（中線 $m=\mathcal{L}_3$）」，並在該處補齊這兩類條件的「類型＋位置」描述（官方必修 12.2 的落點）；§30.2.2 直接法第一例與參數法滑動桿例的「由基本軌跡一」改作「按 §30.1.2 圓的定義」。⑥**連帶同步**：小結主線 1（改列三條集合等式＋圓與兩平行線的分工）、主線 2、方法總表兩行、詞彙表六行（基本軌跡、垂直平分線、角平分線、中線、軌跡的方程、定義法）、備課提示第 5 條（改述為「五類條件的落點與證明深度」）與第 8 條。⑦**配圖與圖號**：刪 3 幅、增 2 幅，全章按題注出現順序重編為 41 個 tikz 塊＝圖 30-1 至圖 30-33（含分幅 A/B/C，改動 42 行，下一新號 30-34）。⑧**難度上限**：§30.1 的 Q 維 B → B-（定義層隨兩個定義撤去而回落），T／C／E 三維與 §30.2、§30.3 不變。板塊總數 42（§30.1 由 21 → 20：增注記 1、撤定義 2；§30.2 由 12 → 14：增示例 2）。驗證：41 個 tikz 塊本機 pdflatex 全部編譯通過、單塊均不超 40 行；圍欄配對 0 錯（其間抓出一處真錯——新增橢圓例漏掉收尾圍欄而吞掉後續段落，已補）、題注按出現順序連號為圖 30-1 至圖 30-33（33 基號／41 幅，含分幅 A/B/C）、每幅皆有錨句且無懸空引用、圖內無中文、表格格數一致且無裸豎線、板塊全在 4.2 白名單、板塊標題中英格式全合規、`%%` 零殘留、「五種基本軌跡／基本軌跡四／基本軌跡五／$\mathcal{L}_4$／$\mathcal{L}_5$」零殘留、全庫節號死鏈 0。
姊妹側同步：《官方考纲与课题讲义关联分析》Ch30 第二部分概要三行與第三部分 §30.1.1／§30.1.2／§30.1.3／§30.1.4／§30.2.1／§30.2.2 六行改寫（§30.1.3 行標題改為「三種基本軌跡」、§30.1.4 行改為「本節不另立定義」）與覆蓋缺口段改寫（官方 12.2 五類條件的落點分三處結清）、《給讀者的簡介》更新日志 2026-09-18 第五輪條置於同日段首。

✅ 已執行（2026-09-19）：第六輪九處批注與通讀自查所見三十四處（用戶開場指示「通讀全文，規劃總體的修改方案」，方案岔口全取推薦檔）。①**§30.1.3 收為兩種**（批注：「我不是將這個定理移到 30.2 的部分了嗎？怎麼還沒刪啊？同步修改所有的上下文。」）：ad-thm（基本軌跡三）＋其 ad-proof 連圖 30-12、30-13A／B／C 與「中線」辨異段整塊移出，節名改「兩種基本軌跡（The Two Basic Loci）」，一覽表由三行縮為兩行、$\mathcal{L}_3$ 退役，全章「三種／三條／餘下三類」計數與工具清單（§8.8 平行四邊形判定、平行公理）同步清零。②**§30.1.4 整節刪除**（批注：「30.1.4 刪除」）：節內注記（檢驗為何必要：增根與漏點）併入 §30.2.1 的 ad-warning（兩處原已逐字重複），增根／漏點就地命名，十處 §30.1.4 回指改指 §30.1.1 注記（軌跡的方程）與 §30.2.1 第五步。③**§30.2.1 五步法改貫穿示例**（批注：「這裡的幾個步驟講解使用一些確定的例子，拿圓的軌跡定義來說明。重新編排這裡。」）：五段各就地演示 $OP=r\to\sqrt{x^{2}+y^{2}}=r\to x^{2}+y^{2}=r^{2}$，舊圖 30-14、30-15（提前用掉本節末示例的數據與結論）換為分幅圖 30-12A／B／C；§30.2.2 直接法之一改不過原點的一般圓 $A(2,-1)$、$r=3$，五個示例 title 加序（之一～之四、定義法：先認圖形再寫方程）。④**定理拆兩條**（批注：「定義寫得太拖沓……我在第零章的時候就說過定理，通常只能寫成 A \implies P, A \iff P 這樣的形式，你怎麼把兩個軌跡方程合併成一個定理了，分開寫。」）：定理（與定直線保持固定距離的點的軌跡）陳述 $d(P,L_1)=d\iff P\in L^{+}\cup L^{-}$、定理（兩平行線的中線方程）陳述 $d(P,L_1)=d(P,L_2)\iff P\in m$，各配雙向證明；「中線」定名與三角形中線（§29.3.1）／中位線（§8.6 中點定理）辨異迁入該節末。⑤**措辭與情景意識清掃**（批注：「這是一份面向學生的講義，不是面向老師的」「什麼叫『要補的是』？……對全文用詞與過渡段進行修改」「不要用『失分點』這樣的考試導向用語」）：§30.1.2 節首長段改為「直觀／作圖／方程」列表＋學生向立場句，全章清「交給學生、要補的是、本冊、本講義、流水線、鄰居、兌現那筆預約、兩個尾巴、答卷上、失分、考試要求」等（「DSE 考試要求」改「課程要求」，「超出常規課程要求／不作要求」自然語言自標保留），警告塊改名「警告（第五步的檢驗：增根、漏點與退化位置）」。⑥**定義（軌跡）重排**（批注 L35、L80）：按「一段一義＋加粗條目」寫成前提／軌跡／動點／坐標形式／逐點判據五段，逐點判据自塊末上移至直觀理解之前，「描述法只是記號縮寫」降為 `>` 補充句。⑦**自查改正**：完備性與純粹性的定義與英文名整對調（完備性＝不漏、純粹性＝不多），圖 30-2 改為 2A「集合少一點」／2B「集合多一點」對照分幅；**圖 30-27、30-31 原以 `circle` 代拋物線（編譯可過而畫錯）**，30-27 重畫為真拋物線配置圖、30-29（無曲線且 $P$ 不在曲線上）與 30-31 連同其題注刪除，圖 30-32 的敘述句改為不點圖號以去雙重引用、$p=1$ 對照圖錨句後移到標準方程之後；拋物線要素統一為五個（原「四個要素」「三個元素」互矛），刪定義塊內游離的 $\mathcal{L}=\{P:PF=d(P,\ell)\}$ 孤行；圖 30-1 點標籤與條件 $C$ 撞名、無身份弧線一併清除；L159 懸掛的「於是」殘句補全；外章引用十處錯指改正（垂直判據 §20.3→§20.4.3、「平行線之垂」§8.6→原句見 §29.1.1、「中位線」§29.3.1→§8.6 中點定理、$\lvert t\rvert=\delta$ 與「兩邊非負平方等價」兩處出處互換、「係數相同故平行」§20.4.2→§20.5.2、§20.1.2「證明」→§20.2.3、§8.9 圓周／周長張冠李戴、§21.1.1 預告語已被 Ch21 改掉故改寫、半平面記號改 $H_{+}/H_{-}$ 以同 §28.2.1、「三件工具」$A$（點）與 $A$（係數）撞名改小寫並改用 $Q(x_Q,y_Q)$）；前置行補 Ch8、Ch19、Ch28。⑧**連帶同步**：圖號按題注出現順序重編為 **37 個 tikz 塊＝圖 30-1 至圖 30-28**（含分幅 A／B／C，改動 38 行，下一新號 30-29）；板塊 42 → **41**（§30.1 由 20 → 17、§30.2 由 14 → 16）；詞彙表 37 條（完備性／純粹性兩行定義對調、半平面下標、基本軌跡兩條、中線歸 §30.2.1、軌跡的方程只回指 §30.1.1、增根／漏點出處 §30.2.1、方程的定義域記號依 §19.1.3）；方法總表 9 行；小結主線 1／2 與易錯點、備課提示第 1／3／5／6／8 條同步；em dash 20 個清零；並補回 §30.2.1 警告塊丟失的收尾圍欄（缺它會吞掉其後一條定理塊）。**難度上限**按 4.6 同批复評後三節維持不變（§30.1 T B-｜C D+｜E B-｜Q B-；§30.2 T B+｜C C+｜E C+｜Q B；§30.3 T B-｜C C+｜E B-｜Q B-）：§30.1 所刪者為綜合幾何證明與回指段，跨課題取用面未減；§30.2 拆條與改例不增最長推理鏈。**驗證**：37 個 tikz 塊本機 pdflatex 全部編譯通過（新圖八幅先在庫外 standalone 試編並目視）、單塊均不超 40 行、圖內無中文；圍欄配對 0 錯、層級與編號錯置 0、`%%` 零殘留、板塊全在 4.2 白名單、5 個結論板塊與 5 個 ad-proof 一一配對、題注 37 條連號且每幅恰被引用一次（懸空 0、多引 0、未引 0）、錨句審計 0 違規、扎堆審計 0、表格內無裸豎線、em dash 0、全庫節號死鏈 0。
姊妹側同步：《官方考纲与课题讲义关联分析》Ch30 第二部分四行概要与第三部分前知衔接／逐小节对照／覆盖缺口改写（§30.1.3 行标题改「两种基本轨迹」、§30.1.4 行删除、12.2 五类条件的新落点为「圆→§30.1.2、两类等距→§30.1.3、另两类→§30.2.1 两条定理」，全章配图统计改 41 块／37 幅）；《給讀者的簡介》更新日志 2026-09-19 段新增 Ch30（修訂·第六輪）與跨章同步條；《课题讲义写作规范》4.4 新增「定理陈述的形式」「读者视角与措辞禁区」两条、4.5 第 17 条补「圆锥曲线配图须用 plot 画曲线本体」、DoD 新增 24「措辞禁区」25「曲线本体」、历史存量新增 L17；Ch16 §16.1.3 前向链改指 §30.1.1 注记（轨迹的方程）；Ch8 圆周／周长用词与本节口径复核无冲突。

✅ 已執行（2026-10-01）：第七輪，用戶指示「Chapter 30 沒有介紹什麼是幾何意義一詞，即描述軌跡的形狀與位置」——全章兩處「幾何意義」（§30.3.3 節標題、備課提示第 6 條）均為直接用詞、從未交代，而《DSE 數學詞彙表》已登記該詞；第 19 章 §19.2.4 的定義係為函數圖像變換所寫，不覆蓋軌跡的形狀與位置。三個岔口經提問全取推薦檔。①**§30.1.1 新增「注記（軌跡的幾何意義）」**（置於注記（軌跡的方程）之後、注記（完備性與純粹性）之前）：幾何意義＝把點集放到平面上說清它呈現什麼**形狀**（哪一類圖形）與占在什麼**位置**（這一類裏的哪一個）；兩件實例取讀者已見的對象（以 $O$ 為圓心 $r$ 為半徑的圓、線段 $AB$ 的垂直平分線）逐件拆出形狀與位置；接一句「形狀與位置缺一不可」把本章描述題的標準釘在此處（與 §30.1.3 警告、§30.2.2 注記（課程要求的三類軌跡方程）同口徑）；末段分清幾何意義與方程的分工（前者與坐標系無關、後者隨坐標系而變）。②**§30.3.3 末句改寫**：原「張開程度的幾何本源是焦點的距離」改為按新定義直說形狀與位置（$\lvert a\rvert$ 說形狀、焦點到頂點的距離 $p$ 說位置），節標題與「幾何解釋」「幾何身份」「幾何本源」等同族措辭照舊（用戶裁定不一併收斂）。③**同步面**：章首 §30.1.1 末過渡段補「成果最後都要按幾何意義說出來」一句、小結主線 1 補一句、方法總表新增「說出軌跡的幾何意義」一行、詞彙表 37 → **38 條**（新增「幾何意義（軌跡的）｜Geometric Meaning」，位置按正文出現順序插在「動點」之後）、備課提示第 4 條補「分別答出形狀與位置再合成完整描述」並順帶清掉該條殘留的「考試的」「失分」兩處應試向措辭（規範 4.4「讀者視角與措辭禁區」）。④**規範依據**：4.7 破折號禁用（默認級）——本批新寫入行初稿用了兩處 em dash，自查後改為冒號與逗號，全章 em dash 維持 0。⑤**板塊 41 → 42**（§30.1 由 17 → 18，新增 ad-note 一條）；難度上限三節一行未動（新增的是稱法與描述口徑，不加推理鏈與計算量）；圖 37 塊／37 幅零變動（本條為術語交代，不觸發配圖判定）。**驗證**：全文件 2032 行、結構尺 0 違規（圍欄配對、層級編號、難度行數、白名單、結論板塊與 ad-proof 5∶5 配對、題注 37 條連號無懸空、表格無裸豎線、tikz 規格、em dash 0、繁體 0、板塊緊鄰空行、行內公式完整性、title 雙語體例、詞彙表 38 條列數、§30.x 死鏈 0）；37 個 tikz 塊本機 pdflatex 全部編譯通過。**遺留待用戶目視（DoD 16）**：新注記的插件渲染（無新圖）。
姊妹側同步：《給讀者的簡介》更新日志 2026-10-01 新增一條；規範不回寫（本輪為單術語交代，未開檔位詢問）。

✅ 已執行（2026-10-13·記號整改）：按規範 4.4.3「線段長與線段」新則，全章 20 處「線段 $XY$」改「線段 $\overline{XY}$」；$2\pi r$、$\pi r^2$ 之 $\pi$ 屬圓周率、$|PA-PB|$ 屬實數絕對值，均按口徑保留；本章無平面記號。純記號整改，結構未動。
