---
tags: DSE课程笔记
---

# 29　平面几何 (II)（Plane Geometry (II)）

> [[Chapter 8 平面几何 (I)|平面几何(I)]] 把平面几何建立在直线图形上：全等与相似的判定、平行线与截线、毕氏定理、特殊四边形。本章把舞台交给圆。曲线图形同样经得起严格的演绎论证，而且结论比直线图形更为整齐，因为圆具有无穷的对称性：任何一条直径所在的直线都是它的对称轴。

> 全章三条主线。第一，**圆的基本性质**。弦与弧的关系由圆心角挂钩：等弦截取等弧，圆心到弦的垂线平分该弦，等弦与圆心等距。进一步的枢纽是圆心角定理 $\angle AOB = 2\angle APB$，同弓形内的圆周角相等、半圆上的圆周角是直角、圆内接四边形对角互补，全是它的推论。再往反面走一步：给了角度关系，怎样判定四点共圆，这是 DSE 几何证明题的主要工具。第二，**涉及切线的几何**。切线与圆只有一个公共点，切点便是圆心到直线的最近点，故半径垂直于切线；「直线与圆的位置关系」定理则把相交、相切、相离统一成 $d$ 与 $r$ 的比较；弦切角等于内错弓形上的圆周角，则是倒角题中最容易被忽视的一条。本章另以圆幂定理把两弦相交的长度关系统一起来，该定理超出常规课程要求，作扩展阅读处理。第三，**三角形的四心**。重心、外心、内心、垂心的差别只在构造线不同，而外心与内心正是外接圆与内切圆的圆心，与前两条主线在此汇合。

> 本章按此铺排：§29.1 圆的基本性质（弧与弦、圆上的角、圆内接四边形与四点共圆）；§29.2 涉及切线的几何（切线的性质与判定、弦切角与内错弓形、圆幂定理）；§29.3 三角形的四心（特殊线段与两条等距性质、内心与外心、重心与垂心、四心的比较）；§29.4 作全章总结。

前置：[[Chapter 8 平面几何 (I)|平面几何(I)]]、[[Chapter 9 三角学(I)|三角学(I)]]、[[Chapter 16 集合论|集合论]]、[[Chapter 18 解方程方法(II)|解方程方法(II)]]

---

## 29.1　圆的基本性质（Basic Properties of Circles）

> **本节难度上限**：T B+ ｜ C C ｜ E B- ｜ Q C+

### 29.1.1　圆上的弧与弦（Arcs and Chords）

[[Chapter 8 平面几何 (I)|平面几何(I)]] §8.9 已经给出圆的直观定义：平面上到定点的距离等于定长的所有点的集合。[[Chapter 16 集合论|集合论]] 为这句话提供了符号形式：把平面视为 $\mathbb{R}^2$（§16.3.2 的笛卡尔积），圆心 $O$ 与动点 $P$ 都是其中的元素，$OP$ 表示两点间的距离。定义先写成集合，再用文字复述。

````ad-def
title: 定义（圆、圆心与半径） | Definition（Circle, Centre and Radius）

以 $O$ 为**圆心**（Centre）、$r$ 为**半径**（Radius）的圆记作

$$C(O, r) = \{P \in \mathbb{R}^2 : OP = r\},$$

即所有到 $O$ 的距离等于 $r$ 的点组成的集合。圆周（Circumference）是这条曲线本身，其长度为 $2\pi r$。
经过圆心且两端在圆周上的线段称为**直径**（Diameter），长度 $d = 2r$。半径相等的两圆称为**等圆**（Equal Circles）。

````

定义中不等号两侧的距离 $OP$ 是点与点之间的数量关系，圆因此完全由「定点＋定长」两个数据决定。下列各元素都是圆上两点之间的构造。

````ad-def
title: 定义（弦、弧、弓形、扇形与弦心距） | Definition（Chord, Arc, Segment, Sector and Distance from Centre to Chord）

设 $A$、$B$ 为圆 $C(O, r)$ 上的两点。

- **弦（Chord）**：连接 $A$、$B$ 的线段 $\overline{AB}$。经过圆心的弦即直径，它是圆中最长的弦。
- **弧（Arc）**：圆周被 $A$、$B$ 分成的两段连续曲线之一（如图 29-1 所示）。不超过半圆的称为**劣弧**（Minor Arc），记作 $\widehat{AB}$；超过半圆的称为**优弧**（Major Arc），通常在两段弧上另取一点 $C$ 而记作 $\widehat{ACB}$，以指明所指。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\draw (O) circle (2);
\coordinate (A) at (205:2);
\coordinate (B) at (335:2);
\coordinate (C) at (85:2);
\draw (A) -- (B);
\draw[dashed] (O) -- (A) (O) -- (B);
\path[draw, blue!65!black, very thick] (205:2.12) arc (205:335:2.12);
\path[draw, red!65!black, very thick] (335:2.12) arc (335:565:2.12);
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[right] at (C) {$C$};
\fill (O) circle (1.2pt) node[below right] {$O$};
\node[blue!65!black] at (270:2.6) {$\widehat{AB}$};
\node[red!65!black] at (90:2.62) {$\widehat{ACB}$};
\end{tikzpicture}
\end{document}
```

> 图 29-1：弦 $AB$ 把圆周分成劣弧 $\widehat{AB}$ 与优弧 $\widehat{ACB}$，$C$ 是优弧上用来指明所指的点。

- **弓形（Segment）**：一条弦与它所对的弧围成的区域，如图 29-2 的阴影部分。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\fill[blue, opacity=0.18] (205:2) arc (205:335:2) -- cycle;
\fill[red, opacity=0.18] (O) -- (35:2) arc (35:145:2) -- cycle;
\draw (O) circle (2);
\draw (205:2) -- (335:2);
\draw (O) -- (35:2) (O) -- (145:2);
\fill (O) circle (1.2pt) node[right] {$O$};
\node at (270:1.2) {segment};
\node at (90:1.3) {sector};
\end{tikzpicture}
\end{document}
```

> 图 29-2：蓝色阴影是弦 $AB$ 与劣弧 $\widehat{AB}$ 围成的弓形（Segment），红色阴影是以 $O$ 为顶点的扇形（Sector）。

- **扇形（Sector）**：两条半径与它们所截的弧围成的区域。
- **弦心距（Distance from Centre to Chord）**：圆心到该弦的垂线段长度，即 §8.6 意义下点 $O$ 到直线 $AB$ 的距离。
````

> 弦与弧的分别是：弦是直线段，量的是两端点之间的直线距离；弧是曲线，量的是沿圆周走过的长度。§8.9 已指出「弧长与圆心角成正比」，本章把它作为既定事实使用。

下面第一条定理把弦与弧的关系化归为全等三角形。

````ad-thm
title: 定理（等弦截取等弧） | Theorem（Equal Chords Cut Off Equal Arcs）

在同圆或等圆中，等弦所对的劣弧相等，如图 29-3 所示；反之，等弧所对的弦相等。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (160:2);
  \coordinate (B) at (245:2);
  \coordinate (C) at (20:2);
  \coordinate (D) at (105:2);
  \draw[green!55!black, very thick] (A) -- (B) (C) -- (D);
  \path[draw, blue!65!black, very thick] (160:2) arc (160:245:2);
  \path[draw, red!65!black, very thick] (20:2) arc (20:105:2);
  \draw (O) -- (A) (O) -- (B);
  \draw (O) -- (C) (O) -- (D);
  \draw[blue!65!black] (160:0.5) arc (160:245:0.5);
  \node[blue!65!black] at (202.5:0.8) {$2\alpha$};
  \draw[red!65!black] (20:0.5) arc (20:105:0.5);
  \node[red!65!black] at (62.5:0.8) {$2\alpha$};
  \fill (O) circle (1.2pt) node[above right] {$O$};
  \node[below left] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[above right] at (D) {$D$};
  \node[blue!65!black] at (220:2.42) {$\widehat{AB}$};
  \node[red!65!black] at (62:2.42) {$\widehat{CD}$};
\end{tikzpicture}
\end{document}
```

> 图 29-3：等弦 $AB = CD$ 所对的劣弧 $\widehat{AB} = \widehat{CD}$（蓝、红两段粗弧），圆心角同为 $2\alpha$。
````

````ad-proof
title: 证明 | Proof

设圆 $C(O, r)$ 中弦 $AB = CD$，如图 29-4 所示。

连接 $OA$、$OB$、$OC$、$OD$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\draw (O) circle (2);
\coordinate (A) at (170:2);
\coordinate (B) at (230:2);
\coordinate (C) at (20:2);
\coordinate (D) at (80:2);
\draw[green!55!black, very thick] (A) -- (B) (C) -- (D);
\draw[red, very thick, dashed] (O) -- (A) (O) -- (C);
\draw[blue, very thick, dashed] (O) -- (B) (O) -- (D);
\fill (O) circle (1.2pt) node[above right] {$O$};
\node[left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\node[above right] at (D) {$D$};
\node at (200:0.75) {$\alpha$};
\node at (50:0.75) {$\alpha$};
\end{tikzpicture}
\end{document}
```

>图 29-4：$AB = CD$ 时 $\triangle OAB \cong \triangle OCD$（SSS）。
>
>同色边对应相等：红（$OA = OC$）、蓝（$OB = OD$）、绿（$AB = CD$），故两弦所对的圆心角同为 $\alpha$，所截的劣弧也相等。

在 $\triangle OAB$ 与 $\triangle OCD$ 中，$OA = OC = r$、$OB = OD = r$、$AB = CD$（已知），三边对应相等，由 SSS 得

$$\triangle OAB \cong \triangle OCD, \qquad \text{故} \qquad \angle AOB = \angle COD.$$

两弦所对的圆心角相等。

由 §8.9 的「弧长与圆心角成正比」，在半径同为 $r$ 的两圆中，圆心角相等则所对的劣弧长度相等，即 $\widehat{AB} = \widehat{CD}$。

反之，若 $\widehat{AB} = \widehat{CD}$，同样由「弧长与圆心角成正比」得 $\angle AOB = \angle COD$。

此时在 $\triangle OAB$ 与 $\triangle OCD$ 中，$OA = OC = r$、$\angle AOB = \angle COD$、$OB = OD = r$，两边及其夹角对应相等，由 SAS 得 $\triangle OAB \cong \triangle OCD$，故 $AB = CD$。

````

弦的性质集中在一条垂线上。

````ad-thm
title: 定理（圆心至弦的垂线平分该弦） | Theorem（Perpendicular from the Centre Bisects a Chord）

从圆心向一条弦引的垂线平分该弦，如图 29-5 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (210:2);
  \coordinate (B) at (330:2);
  \coordinate (M) at (0,-1);
  \draw (A) -- (B);
  \draw[very thick] (O) -- (M);
  \draw (M) -- ++(0,0.22) -- ++(0.22,0) -- ++(0,-0.22);
  \draw[dashed] (O) -- (A) (O) -- (B);
  \fill (O) circle (1.2pt) node[above right] {$O$};
  \node[below left] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[below left] at (M) {$M$};
  \node[right] at (0,-0.5) {$d$};
  \draw[green!55!black, very thick] (-0.866,-1.12) -- (-0.866,-0.88);
  \draw[green!55!black, very thick] (0.866,-1.12) -- (0.866,-0.88);
\end{tikzpicture}
\end{document}
```

> 图 29-5：圆心 $O$ 到弦 $AB$ 的垂线 $OM$ 的垂足 $M$ 平分 $AB$，即 $AM = MB$。
````

````ad-proof
title: 证明 | Proof

设 $M$ 为圆心 $O$ 到弦 $AB$ 的垂足，即 $OM \perp AB$，如图 29-6 所示。

连接 $OA$、$OB$。

在 $\triangle OAM$ 与 $\triangle OBM$ 中，$\angle OMA = \angle OMB = 90^\circ$，斜边 $OA = OB = r$，直角边 $OM$ 为公共边。

由 RHS 得 $\triangle OAM \cong \triangle OBM$，故 $AM = BM$，即 $M$ 为 $AB$ 的中点。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\draw (O) circle (2);
\coordinate (A) at (195:2);
\coordinate (B) at (345:2);
\coordinate (M) at (270:0.52);
\draw (A) -- (B);
\draw[very thick] (O) -- (M);
\draw (M) -- ++(-0.2,0) -- ++(0,0.2) -- ++(0.2,0);
\draw[dashed] (O) -- (A) (O) -- (B);
\fill (O) circle (1.2pt) node[above right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[below left] at (M) {$M$};
\node[right] at (270:0.26) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 29-6：$OM \perp AB$ 则 $M$ 为 $AB$ 的中点；
>
> $OM$ 的长度 $d$ 即弦 $AB$ 的弦心距。
````

````ad-cor
title: 推论（圆心与弦中点的连线垂直于该弦） | Corollary（Line Joining the Centre to the Mid-point of a Chord is Perpendicular to It）

连结圆心与一条弦（直径除外）的中点的线段垂直于该弦，如图 29-7 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (-1.88,0.68);
  \coordinate (B) at (-1.70,-1.06);
  \coordinate (M) at (-1.79,-0.19);
  \draw (A) -- (B);
  \draw[very thick] (O) -- (M);
  \draw[blue!70!black, thick] (-1.6806,-0.1784) -- (-1.6919,-0.069) -- (-1.8013,-0.0806);
  \draw[blue!70!black, very thick] (-1.87,-0.46) -- (-1.65,-0.43);
  \draw[blue!70!black, very thick] (-1.92,0.06) -- (-1.71,0.08);
  \draw[dashed] (O) -- (A);
  \draw[dashed] (O) -- (B);
  \fill (O) circle (1.2pt) node[above right] {$O$};
  \node[above left] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[left] at (M) {$M$};
\end{tikzpicture}
\end{document}
```

> 图 29-7：弦 $AB$ 的中点 $M$，直线 $OM$ 垂直于 $AB$（$M$ 处为直角）。
````

````ad-proof
title: 证明 | Proof

设 $M$ 为弦 $AB$ 的中点，连接 $OM$，如图 29-8A 所示。

在 $\triangle OAM$ 与 $\triangle OBM$ 中，$OA = OB = r$、$AM = BM$、$OM$ 为公共边，由 SSS 得 $\triangle OAM \cong \triangle OBM$，故 $\angle OMA = \angle OMB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (195:2);
\coordinate (B) at (345:2);
\coordinate (M) at (270:0.52);
\fill[blue, opacity=0.18] (O) -- (A) -- (M) -- cycle;
\fill[red, opacity=0.18] (O) -- (M) -- (B) -- cycle;
\draw (O) circle (2);
\draw (A) -- (B);
\draw[dashed] (O) -- (A) (O) -- (B);
\draw[very thick] (O) -- (M);
\draw (-0.97,-0.64) -- (-0.97,-0.40) (0.97,-0.64) -- (0.97,-0.40);
\node at (-1.28,-0.3) {$r$};
\node at (1.28,-0.3) {$r$};
\fill (O) circle (1.2pt) node[above right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[below] at (M) {$M$};
\end{tikzpicture}
\end{document}
```

> 图 29-8A：蓝色 $\triangle OAM$ 与红色 $\triangle OBM$ 中，$OA = OB = r$、$AM = BM$（单撇）、$OM$（粗线）为公共边，由 SSS 得两三角形全等。

又 $A$、$M$、$B$ 共线，$\angle OMA + \angle OMB = 180^\circ$（平角，如图 29-8B 所示）。
两式合并得 $\angle OMA = \angle OMB = 90^\circ$，即 $OM \perp AB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-2,0);
\coordinate (B) at (2,0);
\coordinate (M) at (0,0);
\coordinate (O) at (0,1.9);
\draw (A) -- (B);
\draw (O) -- (A) (O) -- (B);
\draw[very thick] (O) -- (M);
\draw (0.55,0) arc (0:90:0.55);
\draw (-0.55,0) arc (180:90:0.55);
\node at (0.44,0.32) {$\alpha$};
\node at (-0.44,0.32) {$\alpha$};
\fill (M) circle (1.2pt) node[below] {$M$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above right] at (O) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 29-8B：全等给出 $\angle OMA = \angle OMB = \alpha$，而 $A$、$M$、$B$ 共线使两者合成平角，$2\alpha = 180^\circ$，故 $OM \perp AB$。
````

> 推论中「直径除外」不可省：若 $AB$ 为直径，圆心 $O$ 已在 $AB$ 上，其中点 $M$ 与 $O$ 重合，线段 $\overline{OM}$ 退化为一个点，谈不上与 $AB$ 垂直。这也说明同一条直线可以与圆有两个交点而又经过圆心，此时弦心距为 $0$。

垂直平分线与「到两端点等距」是同一件事的两面，这一点在下一节讨论弦的垂直平分线时会直接用。

````ad-lem
title: 引理（垂直平分线的等距性质） | Lemma（Property of the Perpendicular Bisector）

若一点在一线段的垂直平分线上，则该点到线段两端点的距离相等，如图 29-9 所示；反之，到一线段两端点距离相等的点，必在该线段的垂直平分线上。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (0,0);
  \coordinate (B) at (2,0);
  \coordinate (M) at (1,0);
  \coordinate (P) at (1,1.8);
  \coordinate (N) at (1,-0.9);
  \coordinate (Q) at (1,-1.6);
  \draw (A) -- (B);
  \draw (1,-2.1) -- (1,2.3);
  \draw (P) -- (A) (P) -- (B);
  \draw (Q) -- (A) (Q) -- (B);
  \draw (M) -- ++(0,0.22) -- ++(0.22,0) -- ++(0,-0.22);
  \fill (A) circle (1.2pt) node[below left] {$A$};
  \fill (B) circle (1.2pt) node[below right] {$B$};
  \fill (M) circle (1.2pt) node[below left] {$M$};
  \fill (P) circle (1.2pt) node[right] {$P$};
  \fill (N) circle (1.2pt);
  \node[right] at (1.12,-0.9) {$N$};
  \fill (Q) circle (1.2pt) node[right] {$Q$};
  \node[right] at (1.1,2.05) {$\ell$};
  \node[blue] at (0.5,1.05) {$PA$};
  \node[blue] at (1.56,1.05) {$PB$};
\end{tikzpicture}
\end{document}
```

> 图 29-9：点 $P$ 在线段 $\overline{AB}$ 的垂直平分线 $\ell$ 上，则 $PA = PB$；
>
> 反之 $PA = PB$ 的点也落在 $\ell$ 上。
````

````ad-proof
title: 证明 | Proof

设 $M$ 为 $AB$ 的中点，直线 $\ell$ 过 $M$ 且 $\ell \perp AB$，$P$ 为 $\ell$ 上任意一点，如图 29-10A 所示。

在 $\triangle PAM$ 与 $\triangle PBM$ 中，$AM = BM$、$\angle PMA = \angle PMB = 90^\circ$、$PM$ 为公共边，两边及其夹角对应相等，由 SAS 得 $\triangle PAM \cong \triangle PBM$，故 $PA = PB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-2,0);
\coordinate (B) at (2,0);
\coordinate (M) at (0,0);
\coordinate (P) at (0,2.2);
\draw (A) -- (B);
\draw[->] (0,-0.55) -- (0,2.9) node[right] {$\ell$};
\draw (P) -- (A) (P) -- (B);
\draw[very thick] (M) -- (P);
\draw (0.3,0) -- (0.3,0.3) -- (0,0.3);
\draw (-1,-0.12) -- (-1,0.12) (1,-0.12) -- (1,0.12);
\fill (A) circle (1.2pt) node[below left] {$A$};
\fill (B) circle (1.2pt) node[below right] {$B$};
\fill (M) circle (1.2pt) node[below] {$M$};
\fill (P) circle (1.2pt) node[right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-10A：$\ell$ 过 $AB$ 的中点 $M$ 且 $\ell \perp AB$，$\ell$ 上任取的点 $P$ 都满足 $PA = PB$；
>
> $AM = BM$ 以单撇标出，粗线 $PM$ 为两三角形的公共边。

反之，设 $PA = PB$。

若 $P$ 在直线 $AB$ 上，则 $P$ 只能是 $AB$ 的中点（若 $P$ 在 $A$、$B$ 之外，它到较远一端点的距离较大，不可能等距；

在 $A$、$B$ 之间且到两端点等距的点按定义为中点），结论已成立。

若 $P$ 不在直线 $AB$ 上，则 $\triangle PAB$ 为等腰三角形，$PA$、$PB$ 为两腰，如图 29-10B 所示。

设 $M$ 为底边 $AB$ 的中点，由 §8.7 等腰三角形「三线合一」的推论，底边上的中线 $PM$ 亦为底边的垂直平分线，故 $P$ 在 $AB$ 的垂直平分线上。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-2,0);
\coordinate (B) at (2,0);
\coordinate (M) at (0,0);
\coordinate (P) at (0,2.6);
\fill[gray, opacity=0.18] (A) -- (B) -- (P) -- cycle;
\draw (A) -- (B);
\draw[dashed] (0,-0.5) -- (0,3.1) node[right] {$\ell$};
\draw (P) -- (A) (P) -- (B);
\draw[very thick] (M) -- (P);
\draw (0.3,0) -- (0.3,0.3) -- (0,0.3);
\draw (-1,-0.12) -- (-1,0.12) (1,-0.12) -- (1,0.12);
\draw (-1.052,1.429) -- (-0.862,1.282) (-1.138,1.318) -- (-0.948,1.171);
\draw (0.862,1.282) -- (1.052,1.429) (0.948,1.171) -- (1.138,1.318);
\fill (A) circle (1.2pt) node[below left] {$A$};
\fill (B) circle (1.2pt) node[below right] {$B$};
\fill (M) circle (1.2pt) node[below] {$M$};
\fill (P) circle (1.2pt) node[right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-10B：反之，若 $PA = PB$（双撇标出），则底边上的中线 $PM$（粗线）即 $AB$ 的垂直平分线，故 $P$ 落在虚线 $\ell$ 上。
````

````ad-cor
title: 推论（弦的垂直平分线经过圆心） | Corollary（Perpendicular Bisector of a Chord Passes through the Centre）

一条弦的垂直平分线必经过圆心，如图 29-11 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (A) at (0.6,1.908);
  \coordinate (B) at (-1.908,-0.6);
  \coordinate (M) at (-0.654,0.654);
  \draw (O) circle (2);
  \draw (A) -- (B);
  \draw (2.45,-2.45) -- (-2.45,2.45);
  \draw[very thick] (O) -- (M);
  \draw (-0.5267,0.7813) -- (-0.654,0.9086) -- (-0.7813,0.7813);
  \draw[very thick] (O) -- (A);
  \draw[very thick] (O) -- (B);
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \node[above right] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[left] at (M) {$M$};
  \node[right] at (2.25,-2.15) {$\ell$};
\end{tikzpicture}
\end{document}
```

> 图 29-11：弦 $AB$ 的垂直平分线 $\ell$ 经过圆心 $O$，即 $O$ 到 $A$、$B$ 等距。
````

````ad-proof
title: 证明 | Proof

设 $\ell$ 为弦 $AB$ 的垂直平分线，$O$ 为圆心。

因为 $OA = OB = r$，圆心到弦的两端点等距，由上面的引理，$O$ 在 $AB$ 的垂直平分线上，即 $\ell$ 经过 $O$，如图 29-12 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (200:2);
\coordinate (B) at (340:2);
\coordinate (M) at (0,-0.68);
\draw (O) circle (2);
\draw (A) -- (B);
\draw[dashed] (0,-1.7) -- (0,2.3) node[right] {$\ell$};
\draw[dashed] (O) -- (A) (O) -- (B);
\draw (0.3,-0.68) -- (0.3,-0.38) -- (0,-0.38);
\draw (-0.94,-0.80) -- (-0.94,-0.56) (0.94,-0.80) -- (0.94,-0.56);
\fill (O) circle (1.2pt) node[right] {$O$};
\fill (M) circle (1.2pt) node[below right] {$M$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\end{tikzpicture}
\end{document}
```

> 图 29-12：$OA = OB = r$，圆心到弦的两端点等距（$AM = MB$ 以单撇标出），由引理 $O$ 必在 $AB$ 的垂直平分线 $\ell$ 上。
````

````ad-thm
title: 定理（等弦与弦心距） | Theorem（Equal Chords are Equidistant from the Centre）

在同一圆或相等的两个圆中，圆心到两条长度相等的弦的弦心距相等（如图 29-13 所示）；反之，若两条弦的弦心距相等，则这两条弦的长度相等。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (130:2);
  \coordinate (B) at (230:2);
  \coordinate (C) at (280:2);
  \coordinate (D) at (20:2);
  \coordinate (M) at (-1.2856,0);
  \coordinate (N) at (1.1133,-0.6428);
  \draw[green!55!black, very thick] (A) -- (B) (C) -- (D);
  \draw[dashed, very thick] (O) -- (M) (O) -- (N);
  \draw (-1.0856,0) -- (-1.0856,0.2) -- (-1.2856,0.2);
  \draw (0.9401,-0.5428) -- (1.0401,-0.3696) -- (1.2133,-0.4696);
  \draw[green!55!black, very thick] (-1.3456,0.06) -- (-1.2256,0.06);
  \draw[green!55!black, very thick] (-1.3456,-0.06) -- (-1.2256,-0.06);
  \draw[green!55!black, very thick] (1.1353,-0.7247) -- (1.0314,-0.6647);
  \draw[green!55!black, very thick] (1.1953,-0.6208) -- (1.0914,-0.5608);
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \node[left] at (A) {$A$};
  \node[left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[right] at (D) {$D$};
  \node[below left] at (M) {$M$};
  \node[below right] at (N) {$N$};
  \node[blue] at (-0.6428,0.22) {$d$};
  \node[blue] at (0.4467,-0.5114) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 29-13：等弦 $AB = CD$（绿色，各带等长的双划标记）到圆心 $O$ 的距离相等，同为 $d$。
````

````ad-proof
title: 证明 | Proof

设 $M$、$N$ 分别为弦 $AB$、$CD$ 的中点，由「圆心至弦的垂线平分该弦」的推论，$OM \perp AB$、$ON \perp CD$，故 $OM$、$ON$ 即两弦的弦心距，如图 29-14 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\draw (O) circle (2);
\coordinate (A) at (170:2);
\coordinate (B) at (50:2);
\coordinate (M) at (110:1);
\coordinate (C) at (210:2);
\coordinate (D) at (330:2);
\coordinate (N) at (270:1);
\draw (A) -- (B) (C) -- (D);
\draw[very thick] (O) -- (M) (O) -- (N);
\draw[dashed] (O) -- (A) (O) -- (B) (O) -- (C) (O) -- (D);
\fill (O) circle (1.2pt) node[right] {$O$};
\node[left] at (A) {$A$};
\node[above right] at (B) {$B$};
\node[above left] at (M) {$M$};
\node[below left] at (C) {$C$};
\node[below right] at (D) {$D$};
\node[above left] at (N) {$N$};
\node[left] at (110:0.5) {$d$};
\node[right] at (270:0.5) {$d$};
\end{tikzpicture}
\end{document}
```

> 图 29-14：$AB = CD$ 时两弦的弦心距同为 $d$；
>
> 反之，两弦的弦心距相等则弦等长。
>
> 相等的两弦可以位于圆心的同侧或异侧。

在直角三角形 $OAM$ 中，由毕氏定理（§8.5）

$$OM^2 = OA^2 - AM^2 = r^2 - \left(\dfrac{AB}{2}\right)^2,$$

同理 $ON^2 = r^2 - \left(\dfrac{CD}{2}\right)^2$。

若 $AB = CD$，则两式右端相等，故 $OM^2 = ON^2$，因长度均为正数得 $OM = ON$。

反之，若 $OM = ON$，则 $r^2 - \left(\dfrac{AB}{2}\right)^2 = r^2 - \left(\dfrac{CD}{2}\right)^2$，消去 $r^2$ 后得 $AB = CD$。

````

````ad-warning
title: 警告（弦长不与圆心角成正比） | Warning（Chord Length is Not Proportional to the Angle at the Centre）

§8.9 学过「弧长与圆心角成正比」。这条正比关系对**弧**成立，对**弦**不成立：圆心角加倍，所对的弦并不会加倍。原因是弦把「沿圆走」的距离改成了「走直线」，而直角三角形的斜边与它的对边之间不是倍数关系。
````

````ad-example
title: 示例（圆心角加倍，弦长如何变化） | Example（Doubling the Angle at the Centre）

同一圆 $C(O, r)$ 中，圆心角 $\angle AOB = 60^\circ$、$\angle COD = 120^\circ$。求 $AB$ 与 $CD$（用 $r$ 表示），并判断弦长是否与圆心角成正比。

---

$OA = OB = r$ 且 $\angle AOB = 60^\circ$，故 $\triangle OAB$ 为等腰三角形且底角

$$\angle OAB = \angle OBA = \dfrac{180^\circ - 60^\circ}{2} = 60^\circ,$$

三角皆相等，$\triangle OAB$ 为等边三角形，得 $AB = r$，如图 29-15A 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (240:2);
\coordinate (B) at (300:2);
\draw (O) circle (2);
\draw (O) -- (A) (O) -- (B) (A) -- (B);
\draw (-0.25,-0.43) arc (240:300:0.5);
\node at (0,-0.95) {$60^\circ$};
\node at (-1.30,-0.95) {$r$};
\node at (1.30,-0.95) {$r$};
\node at (0,-2.35) {$AB = r$};
\fill (O) circle (1.2pt) node[above right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\end{tikzpicture}
\end{document}
```

> 图 29-15A：圆心角 $60^\circ$ 时 $\angle OAB = \angle OBA = 60^\circ$，$\triangle OAB$ 等边，弦 $AB = r$。

又 $\triangle OCD$ 为等腰三角形，$OC = OD = r$，顶角 $120^\circ$。作 $ON \perp CD$ 于 $N$，由「圆心至弦的垂线平分该弦」，$N$ 为 $CD$ 的中点，且

$$CN = OC\sin 60^\circ = \dfrac{\sqrt{3}}{2}r,$$

故 $CD = 2CN = \sqrt{3}r$，如图 29-15B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (C) at (210:2);
\coordinate (D) at (330:2);
\coordinate (N) at (0,-1);
\draw (O) circle (2);
\draw (O) -- (C) (O) -- (D) (C) -- (D);
\draw[very thick] (O) -- (N);
\draw (-0.43,-0.25) arc (210:330:0.5);
\node at (-0.62,-0.92) {$120^\circ$};
\draw (0.3,-1) -- (0.3,-0.7) -- (0,-0.7);
\node at (0,-2.35) {$CD = \sqrt{3}\,r$};
\fill (O) circle (1.2pt) node[above right] {$O$};
\fill (N) circle (1.2pt) node[below left] {$N$};
\node[below left] at (C) {$C$};
\node[below right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-15B：圆心角 $120^\circ$ 时弦心距 $ON$（粗线）平分弦，$CD = 2CN = \sqrt{3}\,r$，不是 $2r$。

比较两式：圆心角由 $60^\circ$ 增至 $120^\circ$ 是 $2$ 倍，弦长却由 $r$ 增至 $\sqrt{3}r$，只有 $\sqrt{3} \approx 1.732$ 倍。两者不成正比。

> 本例中 $\sin 60^\circ$ 的值取自 [[Chapter 9 三角学(I)|三角学(I)]] §9.2 的特殊角表；若尚未学到正弦比，可改用毕氏定理：在 $\triangle OCN$ 中 $ON = \dfrac{r}{2}$，故 $CN^2 = r^2 - \dfrac{r^2}{4} = \dfrac{3r^2}{4}$，同样得 $CN = \dfrac{\sqrt{3}}{2}r$。
````

圆由「圆心＋半径」两个数据决定，而三个不共线的点恰好也能决定这两个数据。这个事实将在四点共圆的判别法中反复使用。

````ad-thm
title: 定理（过三点的圆） | Theorem（The Circle through Three Points）

给定平面上三个不共线的点，有而且只有一个圆经过这三点，如图 29-16 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (A) at (200:2.1);
  \coordinate (B) at (340:2.1);
  \coordinate (C) at (75:2.1);
  \draw[black!35] (O) circle (2.1);
  \draw[very thick] (A) -- (B) -- (C) -- cycle;
  \draw[gray!70] (0,1.25) -- (0,-1.35);
  \draw[gray!70] (-0.3544,-0.1846) -- (1.6834,0.8769);
  \draw[gray!70] (0.2947,-0.2702) -- (-0.9947,0.9121);
  \draw[dashed] (O) -- (A) (O) -- (B) (O) -- (C);
  \draw[gray!70] (0.18,-0.7173) -- (0.18,-0.5373) -- (0,-0.5373);
  \draw[gray!70] (1.1756,0.8152) -- (1.3353,0.8983) -- (1.4184,0.7386);
  \draw[gray!70] (-0.8364,0.5229) -- (-0.9690,0.6445) -- (-0.8474,0.7771);
  \fill (O) circle (1.3pt) node[above left] {$O$};
  \node[below left] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[above right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-16：三条边的垂直平分线交于唯一的点 $O$，以 $O$ 为圆心、$OA = OB = OC = r$ 为半径的圆经过 $A$、$B$、$C$。
````

````ad-proof
title: 证明 | Proof

**存在性。** 设 $A$、$B$、$C$ 为不共线的三点。

作 $AB$ 的垂直平分线 $\ell_1$ 与 $BC$ 的垂直平分线 $\ell_2$，如图 29-17 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (205:1.9);
\coordinate (B) at (310:1.9);
\coordinate (C) at (60:1.9);
\coordinate (O) at (0,0);
\draw (O) circle (1.9);
\draw[dashed] (A) -- (B) -- (C);
\draw[gray!70] (77.5:2.3) -- (257.5:2.3);
\draw[gray!70] (5:2.3) -- (185:2.3);
\fill (O) circle (1.2pt) node[below right] {$O$};
\fill (A) circle (1.2pt) node[below left] {$A$};
\fill (B) circle (1.2pt) node[below right] {$B$};
\fill (C) circle (1.2pt) node[above right] {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-17：$AB$ 与 $BC$ 的两条垂直平分线交于 $O$，$OA = OB = OC$，圆 $C(O, OA)$ 即过三点的唯一圆。

先说明 $\ell_1$ 与 $\ell_2$ 必相交。

若 $\ell_1 \parallel \ell_2$，因 $AB \perp \ell_1$，由「一条直线垂直于两平行线之一，亦垂直于另一条」得 $AB \perp \ell_2$；
而 $BC \perp \ell_2$，由「垂直于同一直线的两直线平行」得 $AB \parallel BC$。

两直线同过点 $B$，故 $AB$ 与 $BC$ 实为同一直线，即 $A$、$B$、$C$ 共线，与已知矛盾。
所以 $\ell_1$ 与 $\ell_2$ 相交，设交点为 $O$。

$O$ 在 $\ell_1$ 上，由垂直平分线的等距性质 $OA = OB$；

$O$ 在 $\ell_2$ 上，同理 $OB = OC$。
故 $OA = OB = OC$。

以 $O$ 为圆心、$OA$ 为半径作圆 $C(O, OA)$，由欧几里得第三公设这样的圆存在，它同时经过 $A$、$B$、$C$。

**唯一性。** 设圆 $C(O', r')$ 也经过 $A$、$B$、$C$。

则 $O'A = O'B = O'C = r'$，即 $O'$ 到 $A$、$B$ 等距，故 $O'$ 在 $\ell_1$ 上；
同理 $O'$ 在 $\ell_2$ 上。

两直线只有一个交点 $O$，故 $O' = O$，而半径 $r' = O'A = OA$ 也随之确定。

经过三点的圆因此唯一。

> 若三点共线，则 $\ell_1 \parallel \ell_2$ 而不相交，不存在经过这三点的圆，这正是定理须排除共线情形的原因。
````

这条定理管的是存在与唯一，没有给出坐标。用坐标求过三点的圆有两条路：一条是待定系数法（设一般方程、把三点坐标代入，解三元一次方程组），另一条是几何法（用中点公式与垂直线的斜率条件写出两条垂直平分线，再求它们的交点），见 §31.1.4。

````ad-example
title: 示例（平行弦之间的距离） | Example（Distance between Parallel Chords）

圆 $C(O, 10\,\text{cm})$ 中，两平行弦 $AB$、$CD$ 的长度分别为 $12\,\text{cm}$ 与 $16\,\text{cm}$。求两弦之间的距离。

---

设 $M$、$N$ 分别为 $AB$、$CD$ 的中点。由「圆心至弦的中点的连线垂直于该弦」，$OM \perp AB$、$ON \perp CD$。又 $AB \parallel CD$，过一点只有一条直线与已知直线垂直，故 $O$、$M$、$N$ 三点共线，$MN$ 即所求距离。
由毕氏定理，

$$OM = \sqrt{10^2 - 6^2} = 8\,\text{cm}, \qquad ON = \sqrt{10^2 - 8^2} = 6\,\text{cm}.$$

两弦可在圆心的同侧，也可在异侧（如图 29-18A、图 29-18B 所示），故须分情况：
(a) 同侧：$MN = OM - ON = 8 - 6 = 2\,\text{cm}$；

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.7);
\draw[very thick] (1.36,-1.02) -- (1.36,1.02);
\draw[very thick] (1.02,-1.36) -- (1.02,1.36);
\draw (-1.7,0) -- (1.7,0);
\fill (0,0) circle (1.2pt) node[below left] {$O$};
\node[right] at (1.36,1.02) {$A$};
\node[right] at (1.36,-1.02) {$B$};
\node[right] at (1.02,1.36) {$C$};
\node[right] at (1.02,-1.36) {$D$};
\draw[<->] (0,-2.05) -- (1.02,-2.05) node[midway, below] {\tiny $6$};
\draw[<->] (1.02,-2.05) -- (1.36,-2.05) node[midway, below] {\tiny $2$};
\draw[<->] (0,-1.75) -- (1.36,-1.75) node[midway, above] {\tiny $8$};
\end{tikzpicture}
\end{document}
```

> 图 29-18A：两弦在圆心同侧。
>
> 弦心距分别为 $8$ 与 $6$，两弦之间的距离 $= 8 - 6 = 2$。

(b) 异侧：$MN = OM + ON = 8 + 6 = 14\,\text{cm}$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.7);
\draw[very thick] (1.36,-1.02) -- (1.36,1.02);
\draw[very thick] (-1.02,-1.36) -- (-1.02,1.36);
\draw (-1.7,0) -- (1.7,0);
\fill (0,0) circle (1.2pt) node[below] {$O$};
\node[right] at (1.36,1.02) {$A$};
\node[right] at (1.36,-1.02) {$B$};
\node[left] at (-1.02,1.36) {$C$};
\node[left] at (-1.02,-1.36) {$D$};
\draw[<->] (0,-1.75) -- (1.36,-1.75) node[midway, above] {\tiny $8$};
\draw[<->] (-1.02,-1.75) -- (0,-1.75) node[midway, above] {\tiny $6$};
\draw[<->] (-1.02,-2.05) -- (1.36,-2.05) node[midway, below] {\tiny $14$};
\end{tikzpicture}
\end{document}
```

> 图 29-18B：两弦在圆心异侧。
>
> 此时两弦之间的距离 $= 8 + 6 = 14$。

两弦之间的距离为 $2\,\text{cm}$ 或 $14\,\text{cm}$。

> 题目只说「两平行弦」而未指定位置时，两种情形都须写出，这是漏解的高发处。
````

### 29.1.2　圆上的角（Angles in a Circle）

弧与弦的关系是「形」的关系，把角引进圆里，才能得到本章真正的主力工具。圆上的角按顶点的位置分两类。

````ad-def
title: 定义（圆心角与圆周角） | Definition（Angle at the Centre and Angle at the Circumference）

1. 顶点在圆心、两边都是半径的角称为**圆心角**（Angle at the Centre）；
2. 顶点在圆周上、两边都是弦的角称为**圆周角**（Angle at the Circumference）。
   
 设 $A$、$B$、$P$ 为圆 $C(O, r)$ 上互异的三点。弦 $AB$ 把圆周分成两段弧，其中不含 $P$ 的一段称为圆周角 $\angle APB$ **所对的弧**；该弧所对的圆心角记作 $\angle AOB$（如图 29-19A 所示）。  
 
```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (335:2);
\draw (90:2) -- (A) (90:2) -- (B);
\draw[dashed] (0,0) -- (A) (0,0) -- (B);
\draw (200:0.55) arc (200:335:0.55);
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above] at (90:2) {$P$};
\node at (270:0.92) {$\angle AOB$};
\node at (0,1.4) {$\angle APB$};
\end{tikzpicture}
\end{document}
```

> 图 29-19A：弦 $AB$ 把圆周分成两段弧，不含 $P$ 的一段即圆周角 $\angle APB$ 所对的弧。
>
> 该弧所对的圆心角是 $\angle AOB$。

若所对的弧为优弧，则相应的圆心角取**反角**（Reflex Angle，即 §8.1 中介于 $180^\circ$ 与 $360^\circ$ 之间的角），如图 29-19B 所示。 

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (110:2);
  \coordinate (B) at (250:2);
  \coordinate (P) at (180:2);
  \draw (P) -- (A) (P) -- (B);
  \draw[dashed] (O) -- (A) (O) -- (B);
  \draw[->] (O) ++(250:0.62) arc (250:470:0.62);
  \node at (0.95,0.06) {$\angle AOB$};
  \draw (P) ++(305:0.45) arc (305:415:0.45);
  \node at (-1.2,0.22) {$\angle APB$};
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \node[above right] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[above] at (P) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-19B：$P$ 落在劣弧上时，$\angle APB$ 所对的弧是优弧 $\widehat{AB}$。
>
> 带箭头的角是这个优弧所对的圆心角，即大于 $180^\circ$ 的反角 $\angle AOB$。
````

圆心角与圆周角之间的定量关系是整章的枢纽。

````ad-thm
title: 定理（圆心角定理） | Theorem（Angle at the Centre Theorem）

在同圆中，一段弧所对的圆心角是这段弧所对的圆周角的两倍：
（如图 29-20A、图 29-20B 所示）
$\angle AOB = 2\angle APB.$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (40:2);
  \coordinate (B) at (265:2);
  \coordinate (P) at (330:2);
  \draw (O) -- (A) (O) -- (B) (O) -- (P);
  \draw (A) -- (P) (B) -- (P);
  \draw[blue!65!black] (40:0.55) arc (40:265:0.55);
  \node[blue!65!black] at (152.5:0.8) {$2\theta$};
  \draw[red!65!black] (P) ++(207.5:0.45) arc (207.5:95:0.45);
  \node[red!65!black] at (0.5822,-0.9799) {$\theta$};
  \begin{scope}
    \clip (P) circle (0.42);
    \fill[black, opacity=0.18] (P) -- ++(207.5:0.45) arc (207.5:95:0.45) -- cycle;
  \end{scope}
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \node[above right] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[right] at (P) {$P$};
\end{tikzpicture}
\end{document}
```
> 图 29-20A：所对的弧 $\widehat{AB}$（不含 $P$）是优弧，圆心角取带箭头的反角，仍有 $\angle AOB = 2\angle APB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (40:2);
  \coordinate (B) at (320:2);
  \coordinate (P) at (180:2);
  \draw (O) -- (A) (O) -- (B);
  \draw (A) -- (P) (B) -- (P);
  \draw[blue!65!black] (O) ++(320:0.55) arc (320:400:0.55);
  \node[blue!65!black] at (0.88,0) {$2\theta$};
  \draw[red!65!black] (P) ++(340:0.45) arc (340:20:0.45);
  \fill[red, opacity=0.18] (P) -- ++(340:0.45) arc (340:20:0.45) -- cycle;
  \node[red!65!black] at (-1.2,0.12) {$\theta$};
  \fill (O) circle (1.2pt) node[above right] {$O$};
  \node[above right] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[above] at (P) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-20B：所对的弧是劣弧时圆心角不大于 $180^\circ$，结论 $\angle AOB = 2\angle APB$ 照旧。

````

````ad-proof
title: 证明 | Proof

设 $A$、$B$、$P$ 是圆 $C(O,r)$ 上互异的三点，$\angle APB$ 所对的弧为不含 $P$ 的那段，记该弧所对的圆心角为 $\angle AOB$。

作射线 $PO$ 交圆于另一点 $Q$，则 $PQ$ 是圆的直径。

按圆心 $O$ 相对于 $\angle APB$ 的位置，以及 $\angle APB$ 所对的弧是劣弧还是优弧，分四种情形逐一证明；

每种情形各自用完等腰三角形与外角定理，各自收在本情形的结论上。

**情况 1（$O$ 在 $\angle APB$ 的内部，所对的弧为劣弧）**：如图 29-21A 所示，记 $\angle OPA=\alpha$、$\angle OPB=\beta$。

由 $OA=OP=r$，$\triangle OAP$ 是等腰三角形，故 $\angle OAP=\angle OPA=\alpha$。

又 $P$、$O$、$Q$ 共线，$\angle AOQ$ 是 $\triangle OAP$ 在顶点 $O$ 处的外角，由外角定理（§8.2：三角形的一个外角等于与它不相邻的两个内角之和）得 $$\angle AOQ=\angle OAP+\angle OPA=2\alpha$$

同理，由 $OB=OP$ 与外角定理得 $\angle BOQ=2\beta$。

此时射线 $PQ$ 落在 $\angle APB$ 内，故 $\angle APB=\alpha+\beta$；
而 $\angle AOB=\angle AOQ+\angle QOB=2\alpha+2\beta$。
所以 $\angle AOB=2(\alpha+\beta)=2\angle APB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (335:2);
\draw[dashed] (0,2) -- (0,-2);
\draw (0,2) -- (A) (0,2) -- (B);
\draw[dotted] (0,0) -- (A) (0,0) -- (B);
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above] at (0,2) {$P$};
\node[below] at (0,-2) {$Q$};
\node at (-0.2,1.42) {$\alpha$};
\node at (0.2239,1.232) {$\beta$};
\end{tikzpicture}
\end{document}
```

> 图 29-21A：情况 1。$O$ 在 $\angle APB$ 的内部，$\angle APB=\alpha+\beta$。
>
> 虚线 $PQ$ 是直径，点线 $OA$、$OB$ 是两个等腰三角形的腰。

**情况 2（$O$ 在 $\angle APB$ 的外部，所对的弧为劣弧）**：如图 29-21B 所示，不妨设射线 $PB$ 落在 $\angle APQ$ 内（$PA$、$PB$ 分居 $PQ$ 两侧时论证完全相同，只须把下面的差改作和）。

记 $\angle OPA=\alpha$、$\angle OPB=\beta$。

由 $OA=OP$ 与外角定理得 $\angle AOQ=2\alpha$；

由 $OB=OP$ 与外角定理得 $\angle BOQ=2\beta$。

此时 $\angle APB=\alpha-\beta$，而 $\angle AOB=\angle AOQ-\angle BOQ=2\alpha-2\beta$。
所以 $\angle AOB=2(\alpha-\beta)=2\angle APB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (300:2);
\draw[dashed] (170:2) -- (350:2);
\draw (170:2) -- (A) (170:2) -- (B);
\draw[dotted] (0,0) -- (A) (0,0) -- (B);
\fill (0,0) circle (1.2pt) node[above] {$O$};
\node[above left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above left] at (170:2) {$P$};
\node[below right] at (350:2) {$Q$};
\node at (-1.55,-0.32) {$\alpha$};
\node at (-1.139,0.003) {$\beta$};
\end{tikzpicture}
\end{document}
```

> 图 29-21B：情况 2。$O$ 在 $\angle APB$ 的外部，$\angle APB=\alpha-\beta$。
>
> 虚线 $PQ$ 是直径，点线 $OA$、$OB$ 是两个等腰三角形的腰。

**情况 3（$O$ 落在 $\angle APB$ 的一边上）**：如图 29-21C 所示，此时射线 $PO$ 与 $PA$ 重合，即 $PA$ 为直径，$\alpha=0^\circ$，是情况 2 的退化。

由 $OB=OP$ 与外角定理仍得 $\angle AOB=\angle QOB=2\beta=2\angle APB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (335:2);
\draw[dashed] (20:2) -- (200:2);
\draw (20:2) -- (B);
\draw[dotted] (0,0) -- (B);
\fill (0,0) circle (1.2pt) node[above right] {$O$};
\node[below left] at (200:2) {$A$};
\node[below right] at (B) {$B$};
\node[above right] at (20:2) {$P$};
\node at (1.45,0.15) {$\beta$};
\end{tikzpicture}
\end{document}
```

> 图 29-21C：情况 3。$O$ 在边 $PA$ 上，即 $PA$ 为直径，此时 $\alpha=0^\circ$、$\angle APB=\beta$。

**情况 4（$P$ 落在劣弧上，所对的弧为优弧，圆心角取反角）**：这是定义中「所对的弧为优弧则圆心角取反角」所指的情形，须单独交代。

仍作直径 $PQ$，此时 $Q$ 落在不含 $P$ 的那段优弧上，$O$ 仍在 $\angle APB$ 的内部。

记 $\angle OPA=\alpha$、$\angle OPB=\beta$。

由 $OA=OP$ 与外角定理得 $\angle AOQ=2\alpha$；

由 $OB=OP$ 与外角定理得 $\angle BOQ=2\beta$。

按定义，$\angle APB$ 所对优弧的圆心角是经过 $Q$ 的那个角，即 $\angle AOB$ 的反角，故 $\angle AOB=\angle AOQ+\angle QOB=2\alpha+2\beta=2\angle APB$，如图 29-22 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (335:2);
\coordinate (P) at (270:2);
\coordinate (Q) at (90:2);
\draw[dashed] (P) -- (Q);
\draw (P) -- (A) (P) -- (B);
\draw[dotted] (0,0) -- (A) (0,0) -- (B);
\draw[->] (0,0) ++(335:0.62) arc (335:560:0.62);
\node at (0.95,0.05) {$2\alpha+2\beta$};
\node at (-0.276,-1.446) {$\alpha$};
\node at (0.289,-1.441) {$\beta$};
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[below] at (P) {$P$};
\node[above] at (Q) {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 29-22：情况 4。$P$ 落在劣弧 $\widehat{AB}$ 上，故 $\angle APB$ 所对的弧是优弧。
>
> 带箭头的角是经过 $Q$ 的反角 $\angle AOB$，它等于 $2\alpha+2\beta$。

四种情形已穷尽 $P$ 在圆周上的全部位置：$O$ 或在角内、或在角外、或在角的一边上；

所对的弧或是劣弧、或是优弧（恰为半圆时两者合一，结论显然）。
故在同圆中，一段弧所对的圆心角恒为该弧所对圆周角的两倍。

````

圆心角定理第一条立即可用的推论，是倒角题中使用频率最高的一条。

````ad-cor
title: 推论（同弓形内的圆周角相等） | Corollary（Angles in the Same Segment）

在同圆中，同一段弧所对的圆周角彼此相等。设 $P$、$Q$ 在弦 $AB$ 的同一侧（如图 29-23 所示），则

$$\angle APB = \angle AQB.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (335:2);
\draw (A) -- (B);
\draw (60:2) -- (A) (60:2) -- (B);
\draw (115:2) -- (A) (115:2) -- (B);
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above right] at (60:2) {$P$};
\node[above left] at (115:2) {$Q$};
\node at (1.05,1.35) {$\theta$};
\node at (-0.85,1.2) {$\theta$};
\end{tikzpicture}
\end{document}
```

> 图 29-23：$P$、$Q$ 在弦 $AB$ 的同一侧，$\angle APB = \angle AQB = \theta$。
````

````ad-proof
title: 证明 | Proof

$P$、$Q$ 同在弦 $AB$ 的同一侧（如图 29-23 所示），即同落在弧 $AB$ 的同一个弓形内，两角所对的是同一段弧，该弧所对的圆心角 $\angle AOB$ 对两者是同一个角。

由圆心角定理，

$$\angle APB = \dfrac{1}{2}\angle AOB = \angle AQB.$$
````

> 「同弓形内的圆周角」这一名称来自弓形的划分：弦 $AB$ 把圆面分成两个弓形，顶点在同一弓形内的圆周角张向同一段弧，故彼此相等；顶点落在另一个弓形内时张向另一段弧，与本组一般不再相等。两侧的关系由 §29.1.3 的对角互补给出。

````ad-cor
title: 推论（半圆内的圆周角为直角） | Corollary（Angle in a Semicircle）

直径所对的圆周角为直角。若 $AB$ 为圆 $C(O, r)$ 的直径，$P$ 为圆周上异于 $A$、$B$ 的任意一点（如图 29-24 所示），则

$$\angle APB = 90^\circ.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\draw (-2,0) -- (2,0);
\draw (60:2) -- (-2,0) (60:2) -- (2,0);
\draw (250:2) -- (-2,0) (250:2) -- (2,0);
\draw (-0.8102,-1.6992) -- (-0.63,-1.573) -- (-0.5038,-1.7532);
\draw (0.81,1.62) -- (0.92,1.43) -- (1.11,1.54);
\fill (0,0) circle (1.2pt) node[below] {$O$};
\node[left] at (-2,0) {$A$};
\node[right] at (2,0) {$B$};
\node[above right] at (60:2) {$P$};
\node[below left] at (250:2) {$P'$};
\end{tikzpicture}
\end{document}
```

> 图 29-24：$AB$ 为直径时，圆周上任一点（$P$ 或 $P'$）对 $AB$ 的张角皆为 $90^\circ$；
>
> 反之，若张角为 $90^\circ$，则 $AB$ 必为直径。
````

````ad-proof
title: 证明 | Proof

$AB$ 为直径，则不含 $P$ 的弧 $\widehat{AB}$ 为半圆，其所对的圆心角 $\angle AOB$ 为平角，即 $180^\circ$。

由圆心角定理 $\angle AOB = 2\angle APB$，故

$$\angle APB = \dfrac{180^\circ}{2} = 90^\circ.$$
````

````ad-cor
title: 推论（直角圆周角所对的弦是直径） | Corollary（A Right Angle at the Circumference Stands on a Diameter）

若圆周角 $\angle APB = 90^\circ$（如图 29-25 所示），则弦 $AB$ 经过圆心，即 $AB$ 为该圆的直径。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (315:2);
  \coordinate (B) at (135:2);
  \coordinate (P) at (90:2);
  \draw[very thick] (A) -- (B);
  \draw (P) -- (A) (P) -- (B);
  \draw (P) -- ++(0.1148,-0.2772) -- ++(-0.2772,-0.1148) -- ++(-0.1148,0.2772);
  
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \node[below left] at (A) {$A$};
  \node[above left] at (B) {$B$};
  \node[above] at (P) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-25：圆周角 $\angle APB = 90^\circ$ 时，它所对的弦 $AB$ 经过圆心 $O$，即 $AB$ 是该圆的直径。
````

````ad-proof
title: 证明 | Proof

记 $AB$ 所对（不含 $P$ 的一侧）的圆心角为 $\angle AOB$。

由圆心角定理（如图 29-24 所示），$\angle AOB = 2\angle APB = 2 \times 90^\circ = 180^\circ$，该圆心角为平角。
于是 $A$、$O$、$B$ 三点共线，弦 $AB$ 经过圆心 $O$，按定义为直径。

````

> 后一条推论给出「从直角跳到圆心」的路线：题中一旦出现 $\angle APB = 90^\circ$ 且 $A$、$B$、$P$ 同在一张圆上，即可断定 $AB$ 为直径，圆心就是 $AB$ 的中点。这一点在 §29.3 的外心处会再次用到。

````ad-cor
title: 推论（弧与圆周角成正比） | Corollary（Arcs are Proportional to the Angles Standing on Them）

在同圆中，两段弧所对的圆周角之比等于这两段弧的长度之比，如图 29-26 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (O2) at (4.4,0);
  \draw (O) circle (1.6);
  \draw (O2) circle (1.6);
  \coordinate (A) at (150:1.6);
  \coordinate (B) at (30:1.6);
  \coordinate (C) at (270:1.6);
  \draw (A) -- (B);
  \draw[red!65!black, very thick] (150:1.6) arc (150:30:1.6);
  \draw (C) -- (A) (C) -- (B);
  \draw[red!65!black] (C) ++(60:0.35) arc (60:120:0.35);
  \node[red!65!black] at (-0,-0.98) {$\theta_1$};
  \node[red!65!black] at (90:1.98) {$\widehat{AB}$};
  \node[below left] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[below] at (C) {$C$};
  \draw[gray!40] (2.2,-1.9) -- (2.2,1.9);
  \begin{scope}[shift={(O2)}]
    \draw (150:1.6) -- (0:1.6);
    \draw[blue!65!black, very thick] (150:1.6) arc (150:0:1.6);
    \draw (270:1.6) -- (150:1.6) (270:1.6) -- (0:1.6);
    \draw[blue!65!black] (270:1.6) ++(45:0.35) arc (45:120:0.35);
    \node[blue!65!black] at (0.0783,-1.0051) {$\theta_2$};
    \node[blue!65!black] at (75:1.98) {$\widehat{CD}$};
    \node[below left] at (150:1.6) {$C$};
    \node[right] at (0:1.6) {$D$};
    \node[below] at (270:1.6) {$E$};
  \end{scope}
\end{tikzpicture}
\end{document}
```

> 图 29-26：两段弧 $\widehat{AB}$、$\widehat{CD}$ 所对的圆周角 $\theta_1$、$\theta_2$ 之比等于两弧长度之比。
````

````ad-proof
title: 证明 | Proof

设两段弧所对的圆心角依次为 $\theta_1$、$\theta_2$。

由 §8.9 的「弧长与圆心角成正比」，两段弧的长度之比即 $\theta_1 : \theta_2$。
又由圆心角定理，两段弧所对的圆周角依次为 $\dfrac{\theta_1}{2}$、$\dfrac{\theta_2}{2}$，其比仍为 $\theta_1 : \theta_2$。

两比相同（如图 29-27 所示），推论成立。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (P) at (95:2);
\coordinate (A) at (200:2);
\coordinate (B) at (260:2);
\coordinate (C) at (320:2);
\draw (O) circle (2);
\draw (P) -- (A) (P) -- (B) (P) -- (C);
\draw (-0.4039,1.5452) arc (242.5:272.5:0.5);
\draw (-0.1525,1.4929) arc (272.5:302.5:0.5);
\node at (-0.3474,1.2116) {$\alpha$};
\node at (0.0663,1.2302) {$\alpha$};
\draw (-1.2213,-1.4555) -- (-1.3499,-1.6087);
\draw (0.7182,-1.7854) -- (0.6498,-1.9734);
\fill (O) circle (1.2pt) node[below] {$O$};
\node[above] at (P) {$P$};
\node[below left] at (A) {$A$};
\node[below] at (B) {$B$};
\node[below right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-27：$\widehat{AB}$ 与 $\widehat{BC}$ 等长（弧上单撇），两段所对的圆周角同为 $\alpha$；
>
> 弧长成倍（$\widehat{AC} = 2\widehat{AB}$），圆周角也成倍（$\angle APC = 2\alpha$）。
````

> 这条推论把弧的倍数关系与角的倍数关系打通：若 $\widehat{AB} = 2\,\widehat{CD}$，则 $\angle AOB = 2\angle COD$，且同圆中两段弧所对的圆周角也成两倍关系。它与 §29.1.1 的警告并不矛盾：与角成正比的是弧，不是弦。

````ad-example
title: 示例（劣弧与优弧上的两个圆周角） | Example（Two Angles Standing on the Same Chord）

圆 $C(O, r)$ 中，弦 $AB$ 所对的劣弧的圆心角 $\angle AOB = 130^\circ$。点 $D$ 在优弧上，点 $C$ 在劣弧上，如图 29-28 所示。求 $\angle ADB$ 与 $\angle ACB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (200:2);
\coordinate (B) at (330:2);
\draw[dotted] (0,0) -- (A) (0,0) -- (B);
\draw (80:2) -- (A) (80:2) -- (B);
\draw (265:2) -- (A) (265:2) -- (B);
\draw (200:0.5) arc (200:330:0.5);
\fill (0,0) circle (1.2pt) node[above right] {$O$};
\node[above left] at (A) {$A$};
\node[above right] at (B) {$B$};
\node[above] at (80:2) {$D$};
\node[below] at (265:2) {$C$};
\node at (258:1.1) {$130^\circ$};
\end{tikzpicture}
\end{document}
```

> 图 29-28：$\angle ADB$ 张向劣弧，$\angle ACB$ 张向优弧，两角互补。

---

$D$ 在优弧上，$\angle ADB$ 张向劣弧 $\widehat{AB}$，其所对的圆心角为 $130^\circ$。由圆心角定理

$$\angle ADB = \dfrac{130^\circ}{2} = 65^\circ.$$

$C$ 在劣弧上，$\angle ACB$ 张向优弧 $\widehat{AB}$，其所对的圆心角为反角

$$360^\circ - 130^\circ = 230^\circ,$$

故 $\angle ACB = \dfrac{230^\circ}{2} = 115^\circ$。
两角之和为 $65^\circ + 115^\circ = 180^\circ$。弦 $AB$ 两侧的圆周角互补，这一现象将在 §29.1.3 以「对角互补」的形式系统处理。

````

````ad-example
title: 示例（对角线平分顶角则截等弦） | Example（An Angle Bisector Cuts Off Equal Chords）

四边形 $ABCD$ 的四个顶点同在圆 $C(O, r)$ 上，且对角线 $AC$ 平分 $\angle BAD$（如图 29-29 所示）。求证 $BC = CD$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (110:2);
\coordinate (B) at (190:2);
\coordinate (C) at (260:2);
\coordinate (D) at (330:2);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\draw[dashed] (A) -- (C);
\node[above right] at (A) {$A$};
\node[left] at (B) {$B$};
\node[below left] at (C) {$C$};
\node[below right] at (D) {$D$};
\node at (-0.95,1.25) {$\alpha$};
\node at (-0.35,1.25) {$\alpha$};
\draw[green!55!black, very thick] (-1.208,-1.208) -- (-1.109,-1.109);
\draw[green!55!black, very thick] (0.722,-1.5482) -- (0.6628,-1.4214);
\end{tikzpicture}
\end{document}
```

> 图 29-29：$AC$ 平分 $\angle BAD$ 时，弦 $BC$ 与 $CD$ 各有一划标记（所对的弧 $\widehat{BC}$、$\widehat{CD}$ 也相等），故 $BC = CD$。

---

因 $AC$ 平分 $\angle BAD$，$\angle BAC = \angle CAD$，记作 $\alpha$。
$\angle BAC$ 与 $\angle CAD$ 分别张向弧 $\widehat{BC}$ 与弧 $\widehat{CD}$。由圆心角定理，弧所对的圆心角为该弧所对圆周角的两倍，故

$$\angle BOC = 2\angle BAC = 2\alpha = 2\angle CAD = \angle COD.$$

两段弧所对的圆心角相等，由 §8.9「弧长与圆心角成正比」得 $\widehat{BC} = \widehat{CD}$；再由「等弧所对的弦相等」，

$$BC = CD.$$
````

### 29.1.3　圆内接四边形与四点共圆（Cyclic Quadrilaterals and Concyclic Points）

上节末的示例已经出现一个现象：同一条弦两侧的两个圆周角互补。把它写成一般形式，就是圆内接四边形的理论。

````ad-def
title: 定义（圆内接四边形与外接圆） | Definition（Cyclic Quadrilateral and Circumcircle）

四个顶点都在同一个圆上的四边形称为**圆内接四边形**（Cyclic Quadrilateral），这个圆称为该四边形的**外接圆**（Circumscribed Circle）。
设四边形 $ABCD$ 内接于圆，则其顶点依 $A$、$B$、$C$、$D$ 的顺序落在圆周上（如图 29-30 所示）；$\angle A$ 与 $\angle C$、$\angle B$ 与 $\angle D$ 互为**对角**。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (120:2);
\coordinate (B) at (210:2);
\coordinate (C) at (300:2);
\coordinate (D) at (25:2);
\draw (O) circle (2);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\node at (-0.70,1.19) {$\angle A$};
\node at (0.70,-1.19) {$\angle C$};
\node at (-1.13,-0.84) {$\angle B$};
\node at (1.26,0.56) {$\angle D$};
\fill (O) circle (1.2pt) node[below right] {$O$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-30：四边形 $ABCD$ 内接于圆 $C(O, r)$，这个圆称为它的外接圆；
>
> $\angle A$ 与 $\angle C$、$\angle B$ 与 $\angle D$ 是两对对角。
````

````ad-thm
title: 定理（圆内接四边形的对角互补） | Theorem（Opposite Angles of a Cyclic Quadrilateral are Supplementary）

圆内接四边形的对角互补：
$$\angle A + \angle C = 180^\circ, \qquad \angle B + \angle D = 180^\circ.$$

（如图 29-31 所示）

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (125:2);
  \coordinate (B) at (40:2);
  \coordinate (C) at (-70:2);
  \coordinate (D) at (-170:2);
  \draw[very thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[red!65!black] (A) ++(247.5:0.5) arc (247.5:352.5:0.5);
  \node[red!65!black] at (-0.7222,0.9022) {$\alpha$};
  \draw[blue!65!black] (C) ++(75:0.5) arc (75:150:0.5);
  \node[blue!65!black] at (0.2822,-0.9093) {$\gamma$};
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \node[above left] at (A) {$A$};
  \node[above right] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[below left] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-31：圆内接四边形 $ABCD$，对角 $\angle A = \alpha$ 与 $\angle C = \gamma$ 互补。
````

````ad-proof
title: 证明 | Proof

设四边形 $ABCD$ 内接于圆 $C(O, r)$，顶点按圆周顺序排列，如图 29-32A 所示。

连接 $OB$、$OD$，于是 $\angle BOD$ 有两个：不含 $C$ 的那个（不大于 $180^\circ$）与经过 $C$ 的反角，两者合成一个周角。

$\angle C$（即 $\angle BCD$）张向不含 $C$ 的弧 $\widehat{BAD}$，该弧所对的圆心角正是 $\angle BOD$；

由圆心角定理，

$$2\angle C = \angle BOD.$$
$\angle A$（即 $\angle DAB$）张向含 $C$ 的弧 $\widehat{BCD}$，该弧所对的圆心角是那个反角，即 $360^\circ-\angle BOD$；
再由圆心角定理，

$$2\angle A = 360^\circ-\angle BOD.$$
两式相加，$\angle BOD$ 恰好消去，如图 29-32B 所示：
$$2\angle A+2\angle C=360^\circ,$$
两端同除以 $2$，即得 $\angle A+\angle C=180^\circ$。

连接 $OA$、$OC$，完全同样的两步给出 $\angle B+\angle D=180^\circ$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (115:2);
  \coordinate (B) at (200:2);
  \coordinate (C) at (285:2);
  \coordinate (D) at (25:2);
  \draw (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[dashed] (O) -- (B) (O) -- (D);
  \node at (118:1.35) {$\angle A$};
  \node at (282:1.35) {$\angle C$};
  \fill (O) circle (1.2pt) node[above right] {$O$};
  \node[above left] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below] at (C) {$C$};
  \node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-32A：连接 $OB$、$OD$（虚线）。
>
> $\angle A$ 张向含 $C$ 的弧 $\widehat{BCD}$，$\angle C$ 张向含 $A$ 的弧 $\widehat{BAD}$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (A) at (115:2);
  \coordinate (B) at (200:2);
  \coordinate (C) at (285:2);
  \coordinate (D) at (25:2);
  \draw (O) circle (2);
  \draw (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[dashed] (O) -- (B) (O) -- (D);
  \draw[->] (-0.56,-0.21) arc (200:385:0.6);
  \draw (0.54,0.25) arc (25:200:0.6);
  \node at (0.38,-0.95) {$2\angle A$};
  \node at (-0.41,0.99) {$2\angle C$};
  \fill (O) circle (1.2pt) node[right] {$O$};
  \node[above left] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below] at (C) {$C$};
  \node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-32B：标 $2\angle C$ 的是 $\angle BOD$ 的非反角，带箭头标 $2\angle A$ 的是它的反角。
>
> 两个角同以 $OB$、$OD$ 为边，合成周角 $360^\circ$。
````

````ad-def
title: 定义（四边形的外角与内对角） | Definition（Exterior Angle and Interior Opposite Angle）

1. 沿用 §8.3 多边形外角的说法：把多边形的一条边沿一个方向延长，延长线与相邻一边所夹的角，称为多边形在该顶点处的**外角**（Exterior Angle）。  

2. 四边形 $ABCD$ 中延长 $AB$ 至 $E$，则 $\angle CBE$ 是它在顶点 $B$ 处的外角。与该外角不相邻的那个内角，即顶点 $B$ 的对角 $D$ 处的内角，称为这个外角的**内对角**（Interior Opposite Angle）；
   
   上例中 $\angle CBE$ 的内对角是 $\angle ADC$。同一个顶点处沿两个方向延长各得一个外角，两者是对顶角、大小相等，故「外角」一词不致引起歧义，如图 29-33 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (110:2);
  \coordinate (B) at (200:2);
  \coordinate (C) at (320:2);
  \coordinate (D) at (2.2,0.6);
  \coordinate (E) at (-2.258,-1.5);
  \draw[very thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[very thick] (B) -- (E);
  \draw[red!65!black] (B) ++(245:0.5) arc (245:350:0.5);
  \node[red!65!black,left] at (-2.05,-1.15) {$\angle CBE$};
  \draw[blue!65!black] (D) ++(156.1:0.5) arc (156.1:250.5:0.5);
  \node[blue!65!black] at (1.28,0.2) {$\angle ADC$};
  \node[above right] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[above right] at (D) {$D$};
  \node[below left] at (E) {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-33：四边形 $ABCD$ 中延长 $AB$ 至 $E$。
>
> 红色角 $\angle CBE$ 是顶点 $B$ 处的外角，蓝色角 $\angle ADC$ 是它的内对角。
````

外角与内对角都定了，下面的定理说的就是这两个角的关系。

````ad-thm
title: 定理（外角等于内对角） | Theorem（Exterior Angle Equals the Interior Opposite Angle）

圆内接四边形的任一外角等于它的内对角。延长 $AB$ 至 $E$，则
$$\angle CBE = \angle ADC.$$

（如图 29-34 所示）

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (150:2);
  \coordinate (B) at (40:2);
  \coordinate (C) at (-60:2);
  \coordinate (D) at (255:2);
  \coordinate (E) at (2.5283,1.3727);
  \draw[very thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[very thick] (B) -- (E);
  \draw[red!65!black] (B) ++(185:0.5) arc (185:260:0.5);
  \node[red!65!black] at (0.6474,0.4749) {$(180^{\circ}-\beta)$};
  \draw[blue!65!black] (D) ++(7.5:0.5) arc (7.5:112.5:0.5);
  \node[blue!65!black] at (-0.0426,-1.1091) {$\beta$};
  \draw[green!55!black] (B) ++(260:0.62) arc (260:365:0.62);
  \node[green!55!black] at (2.2415,0.5114) {$\beta$};
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \node[above left] at (A) {$A$};
  \node[above right] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[below left] at (D) {$D$};
  \node[above right] at (E) {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-34：延长 $AB$ 至 $E$，圆内接四边形 $ABCD$ 在顶点 $B$ 处的外角 $\angle CBE$ 等于内对角 $\angle ADC$。

````

````ad-proof
title: 证明 | Proof

$A$、$B$、$E$ 共线，故 $\angle ABC + \angle CBE = 180^\circ$（平角，如图 29-35 所示）。
又由「对角互补」，$\angle ABC + \angle ADC = 180^\circ$。
两式左端相等，消去公共项 $\angle ABC$，得

$$\angle CBE = \angle ADC.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (190:2);
\coordinate (B) at (320:2);
\coordinate (C) at (55:2);
\coordinate (D) at (100:2);
\coordinate (E) at (2.69,-1.6);
\draw (O) circle (2);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\draw (B) -- (E);
\draw (1.48,-0.87) arc (97.5:-15:0.42);
\draw (-0.59,1.63) arc (-125:-12.5:0.42);
\node at (2.04,-0.84) {$\gamma$};
\node at (-0.10,1.34) {$\gamma$};
\fill (O) circle (1.2pt) node[below right] {$O$};
\node[below left] at (A) {$A$};
\node[below] at (B) {$B$};
\node[above right] at (C) {$C$};
\node[above left] at (D) {$D$};
\node[right] at (E) {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-35：$E$ 在 $AB$ 的延长线上。
>
> 外角 $\angle CBE$ 与内对角 $\angle ADC$ 同为 $\gamma$，因为它们都与 $\angle ABC$ 互补。

````

> 对角互补的用处不限于求角。若图中出现 $\angle A + \angle C = 180^\circ$ 这样的条件而没有圆，先反过来问一句「这四点是否共圆」，往往比硬算角度更能打开局面。这就是下面的判别法。

````ad-example
title: 示例（圆内接四边形中的倒角） | Example（Angle Chasing in a Cyclic Quadrilateral）

圆内接四边形 $ABCD$ 的两条对角线交于圆内一点 $X$。已知 $\angle BAC = 40^\circ$、$\angle CAD = 60^\circ$、$\angle ABD = 35^\circ$，如图 29-36 所示。求：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (90:2);
\coordinate (B) at (180:2);
\coordinate (C) at (260:2);
\coordinate (D) at (20:2);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\draw (A) -- (C) (B) -- (D);
\node[above] at (A) {$A$};
\node[left] at (B) {$B$};
\node[below left] at (C) {$C$};
\node[right] at (D) {$D$};
\node at (-0.26,1.44) {$40^\circ$};
\node at (0.26,1.44) {$60^\circ$};
\node at (-1.45,0.29) {$35^\circ$};
\fill (-0.146,0.326) circle (1.3pt);
\node at (-0.36,0.1) {$X$};
\end{tikzpicture}
\end{document}
```

> 图 29-36：对角线交于 $X$；
>
> $\angle BAC = 40^\circ$、$\angle CAD = 60^\circ$、$\angle ABD = 35^\circ$。

(a) $\angle CDB$；
(b) $\angle ACB$；
(c) $\angle BCD$。

---

(a) 点 $D$ 与点 $A$ 在直线 $CB$ 的同侧，$\angle CDB$ 与 $\angle CAB$ 张向同一段弧 $\widehat{CB}$，由同弓形内的圆周角相等，

$$\angle CDB = \angle CAB = 40^\circ.$$

(b) 因 $X$ 在四边形内部，射线 $AC$ 在 $\angle DAB$ 之内，故

$$\angle DAB = \angle DAC + \angle CAB = 60^\circ + 40^\circ = 100^\circ.$$

在 $\triangle ABD$ 中，由内角和定理（§8.2）

$$\angle ADB = 180^\circ - \angle DAB - \angle ABD = 180^\circ - 100^\circ - 35^\circ = 45^\circ.$$

又 $\angle ACB$ 与 $\angle ADB$ 同张弧 $\widehat{AB}$，故 $\angle ACB = \angle ADB = 45^\circ$。
(c) $\angle BCD$ 与 $\angle DAB$ 为圆内接四边形 $ABCD$ 的一对对角，故

$$\angle BCD = 180^\circ - \angle DAB = 180^\circ - 100^\circ = 80^\circ.$$

> 检验：(b)、(c) 与已知数据应自洽。$\angle ACD = \angle BCD - \angle ACB = 80^\circ - 45^\circ = 35^\circ$，而 $\angle ACD$ 与 $\angle ABD$ 同张弧 $\widehat{AD}$，两者确实同为 $35^\circ$。
````

#### 四点共圆的判别（Tests for Concyclic Points）

有了性质，接着问反面问题：凭什么断定四点共圆？这一组判别法是演绎几何证明题的主力工具：图中常常并没有圆，却有一对角相等或互补，此时先问一句「这四点共圆吗」，往往比硬算角度更能打开局面。判别法一共有三条，思路都是同一法：先作过其中三点的圆，再证明第四点落在这个圆上。

````ad-thm
title: 定理（同侧等角判别法） | Theorem（Concyclic Test by Equal Angles on the Same Side）

设 $C$、$D$ 在直线 $AB$ 的同一侧，且 $\angle ACB = \angle ADB$（该角不等于 $0^\circ$ 也不等于 $180^\circ$，如图 29-37 所示），则 $A$、$B$、$C$、$D$ 四点共圆。图中的虚线圆即结论所要断言的那个圆，$O$ 是它的圆心；写图时先把它画出来，但它此刻还只是一个示意。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw[dashed] (O) circle (2);
  \coordinate (A) at (105:2);
  \coordinate (B) at (255:2);
  \coordinate (C) at (330:2);
  \coordinate (D) at (30:2);
  \draw[very thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw (A) -- (C) (B) -- (D);
  \draw[red!65!black] (C) ++(202.5:0.45) arc (202.5:127.5:0.45);
  \node[red!65!black] at (0.9593,-0.7929) {$\theta$};
  \draw[red!65!black] (D) ++(232.5:0.45) arc (232.5:157.5:0.45);
  \node[red!65!black] at (0.9593,0.7929) {$\theta$};
  \fill (O) circle (1.2pt) node[right] {$O$};
  \node[above left] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-37：$C$、$D$ 在直线 $AB$ 的同侧，$\angle ACB = \angle ADB = \theta$。
>
> 虚线圆是结论要断言存在的那个圆，$O$ 为其圆心；粗实线是四边形 $ABCD$ 的四条边，细实线是它的两条对角线。
````

````ad-proof
title: 证明 | Proof

因 $\angle ACB \ne 0^\circ$ 且 $\ne 180^\circ$，$A$、$B$、$C$ 三点不共线。
于是可作过这三点的圆 $\Gamma$，其圆心记作 $O$，如图 29-38 所示。

以下证明 $D$ 在 $\Gamma$ 上。

反设 $D$ 不在 $\Gamma$ 上，则点与圆的位置只有三种（§29.2.1），$D$ 必在 $\Gamma$ 外或在 $\Gamma$ 内，两个临时假设逐一否证。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (105:2);
  \coordinate (B) at (255:2);
  \coordinate (C) at (330:2);
  \coordinate (D) at (30:2);
  \draw[very thick] (A) -- (B) -- (C) -- (D);
  \draw[dashed] (D) -- (A);
  \draw (A) -- (C);
  \draw[dashed] (B) -- (D);
  \draw[red!65!black] (C) ++(202.5:0.45) arc (202.5:127.5:0.45);
  \node[red!65!black] at (0.9593,-0.7929) {$\theta$};
  \draw[red!65!black] (D) ++(232.5:0.45) arc (232.5:157.5:0.45);
  \node[red!65!black] at (0.9593,0.7929) {$\theta$};
  \fill (O) circle (1.2pt) node[right] {$O$};
  \node[above left] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-38：过 $A$、$B$、$C$ 三点的圆 $\Gamma$ 已经作出（实线圆），$O$ 是其圆心。
>
> 虚线的 $\angle ADB$ 才是本节要安置的角：待证之事是点 $D$ 落在 $\Gamma$ 上。

**情形 1：$D$ 在 $\Gamma$ 外。** 线段 $\overline{AD}$ 与圆周另有交点 $E$（$E$ 在 $A$、$D$ 之间），连接 $BE$，如图 29-39A 所示。

因为 $E$ 在线段 $\overline{AD}$ 上，而 $D$ 与 $C$ 在直线 $AB$ 的同侧，故 $E$ 也与 $C$ 同在直线 $AB$ 的这一侧。

$E$ 与 $C$ 同在 $\Gamma$ 上且同张弧 $\widehat{AB}$，由同弓形内的圆周角相等，

$$\angle AEB = \angle ACB. \qquad (1)$$
另一方面，$A$、$E$、$D$ 共线，$\angle AEB$ 是 $\triangle BED$ 在顶点 $E$ 处的外角，由外角定理的推论（§8.2：外角大于与它不相邻的任一内角）得
$$\angle AEB > \angle EDB = \angle ADB. \qquad (2)$$
$(1)$ 与 $(2)$ 不能同时成立：把 $(1)$ 代入 $(2)$ 得 $\angle ACB > \angle ADB$，与题设 $\angle ACB = \angle ADB$ 正面冲突。
故临时假设「$D$ 在 $\Gamma$ 外」不成立。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (205:2);
  \coordinate (B) at (335:2);
  \coordinate (C) at (95:2);
  \coordinate (E) at (33.5411:2);
  \coordinate (D) at (2.55,1.6);
  \draw (0,0) circle (2);
  \draw (D) -- (A);
  \draw[dashed] (C) -- (A) (C) -- (B);
  \draw[dashed] (E) -- (B);
  \node at (1.78,1.46) {$E$};
  \node[below left] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[above left] at (C) {$C$};
  \node[right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-39A：临时假设 $D$ 在圆外，线段 $\overline{AD}$ 与圆周交于 $E$，虚线 $BE$ 为辅助线。
>
> $\angle AEB$ 与 $\angle ACB$ 同张弧 $\widehat{AB}$；$\angle AEB$ 又是 $\triangle BED$ 在 $E$ 处的外角。

**情形 2：$D$ 在 $\Gamma$ 内。** 延长 $AD$ 交圆周于 $F$（$D$ 在 $A$、$F$ 之间），连接 $BF$，如图 29-39B 所示。

$F$ 与 $C$ 同在直线 $AB$ 的这一侧且同在 $\Gamma$ 上，由同弓形内的圆周角相等，

$$\angle AFB = \angle ACB. \qquad (3)$$
而 $A$、$D$、$F$ 共线，$\angle ADB$ 是 $\triangle BDF$ 在顶点 $D$ 处的外角，由 §8.2 的推论，
$$\angle ADB > \angle DFB = \angle AFB. \qquad (4)$$
$(3)$ 与 $(4)$ 合起来给出 $\angle ADB > \angle ACB$，同样与题设 $\angle ACB = \angle ADB$ 冲突。
故临时假设「$D$ 在 $\Gamma$ 内」也不成立。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (205:2);
  \coordinate (B) at (335:2);
  \coordinate (C) at (95:2);
  \coordinate (F) at (35:2);
  \coordinate (D) at (-0.26,0.05);
  \draw (0,0) circle (2);
  \draw (A) -- (B) -- (C) -- cycle;
  \draw (A) -- (D);
  \draw[dashed] (D) -- (F);
  \draw[dashed] (B) -- (F);
  \draw (B) -- (D);
  \node[below left] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[above left] at (C) {$C$};
  \node[above right] at (F) {$F$};
  \node[above] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-39B：临时假设 $D$ 在圆内，延长 $AD$ 交圆周于 $F$，虚线 $DF$、$BF$ 为辅助线。
>
> $\angle ADB$ 是 $\triangle BDF$ 在 $D$ 处的外角，故大于内角 $\angle DFB$。

两个临时假设都被否定，而点与圆的位置只有「在圆上、在圆内、在圆外」三种，故 $D$ 在 $\Gamma$ 上，即 $A$、$B$、$C$、$D$ 四点共圆。
````

> 上面两条「线段与圆周必有交点」的步骤用到一条直观事实：圆是凸的闭曲线，连结圆上一点与圆外（圆内）一点的线段必与圆周再次相交。严格论证需要「连续性」一类的事实，超出中学范围；本讲义对此按既定事实处理，立场与 §8.9 中「弧长与圆心角成正比」不作证明而直接使用相同。

````ad-thm
title: 定理（对角互补判别法） | Theorem（Concyclic Test by Supplementary Opposite Angles）

凸四边形 $ABCD$ 中，若有一对对角互补，即 $\angle A + \angle C = 180^\circ$（或 $\angle B + \angle D = 180^\circ$，如图 29-40 所示），则 $A$、$B$、$C$、$D$ 四点共圆。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (125:2);
  \coordinate (B) at (30:2);
  \coordinate (C) at (-75:2);
  \coordinate (D) at (180:2);
  \draw[very thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[red!65!black] (A) ++(242.5:0.5) arc (242.5:347.5:0.5);
  \node[red!65!black] at (-0.7879,0.8679) {$\alpha$};
  \draw[blue!65!black] (C) ++(67.5:0.5) arc (67.5:142.5:0.5);
  \node[blue!65!black] at (0.2459,-0.9176) {$(180^{\circ}-\alpha)$};
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \node[above left] at (A) {$A$};
  \node[above right] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[below left] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-40：凸四边形 $ABCD$ 中一对对角互补（$\angle A = \alpha$，$\angle C = 180^\circ - \alpha$），则 $A$、$B$、$C$、$D$ 四点共圆。
````

````ad-proof
title: 证明 | Proof

设凸四边形 $ABCD$ 满足 $\angle DAB+\angle BCD=180^\circ$。

这是本证明唯一的假设。

由四边形内角和为 $360^\circ$（§8.3），假设立即给出另一对对角也互补：

$$\angle ABC+\angle ADC=360^\circ-\left(\angle DAB+\angle BCD\right)=180^\circ. \qquad (\ast)$$
凸四边形的两个顶点 $B$、$D$ 分居对角线 $AC$ 所在直线的两侧，故 $A$、$B$、$C$ 三点不共线，可作过这三点的圆 $\Gamma$（§29.1.1）。

以下证明 $D$ 在 $\Gamma$ 上。

反设 $D$ 不在 $\Gamma$ 上，则 $D$ 在 $\Gamma$ 外或在 $\Gamma$ 内（§29.2.1），两个临时假设逐一否证。

**情形 1：$D$ 在 $\Gamma$ 外。** 线段 $\overline{AD}$ 与圆周交于点 $E$（$E$ 在 $A$、$D$ 之间），连接 $CE$，如图 29-41A 所示。

因 $E$ 在射线 $AD$ 上，$E$ 与 $D$ 同在直线 $AC$ 的 $D$ 侧，故 $E$ 落在不含 $B$ 的弧 $\widehat{AC}$ 上，$ABCE$ 是圆内接四边形。

由对角互补定理，$\angle AEC=180^\circ-\angle ABC$；
再代入 $(\ast)$，得

$$\angle AEC=\angle ADC. \qquad (1)$$
另一方面，$A$、$E$、$D$ 共线，$\angle AEC$ 是 $\triangle DEC$ 在顶点 $E$ 处的外角，由外角定理的推论（§8.2：外角大于与它不相邻的任一内角）得
$$\angle AEC>\angle EDC=\angle ADC. \qquad (2)$$
$(1)$ 与 $(2)$ 不能同时成立。

$(2)$ 只用到作图事实与 §8.2；

$(1)$ 的全部依据是「$ABCE$ 内接」与 $(\ast)$，而 $(\ast)$ 正是假设 $\angle DAB+\angle BCD=180^\circ$ 的改写。
故冲突出自临时假设「$D$ 在 $\Gamma$ 外」，此情形不可能。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (120:2);
\coordinate (B) at (210:2);
\coordinate (C) at (300:2);
\coordinate (D) at (2.898,-0.776);
\coordinate (E) at (1.9907,-0.1922);
\draw (0,0) circle (2);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\draw[dashed] (C) -- (E);
\node at (2.5543,-0.8724) {$\beta$};
\node at (1.3848,-0.3237) {$\beta$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\node[below] at (D) {$D$};
\node at (2.28,-0.13) {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-41A：临时假设 $D$ 在 $\Gamma$ 外，线段 $\overline{AD}$ 与圆周交于 $E$，虚线 $CE$ 为辅助线。
>
> 两处 $\beta$ 分别是 $\angle AEC$ 与 $\angle ADC$；前者又是 $\triangle DEC$ 在 $E$ 处的外角。

**情形 2：$D$ 在 $\Gamma$ 内。** 延长 $AD$ 交圆周于 $F$（$D$ 在 $A$、$F$ 之间），连接 $CF$，如图 29-41B 所示。
同理 $ABCF$ 是圆内接四边形，由对角互补定理与 $(\ast)$，

$$\angle AFC=180^\circ-\angle ABC=\angle ADC. \qquad (3)$$
而 $A$、$D$、$F$ 共线，$\angle ADC$ 是 $\triangle DFC$ 在顶点 $D$ 处的外角，由 §8.2 的推论，
$$\angle ADC>\angle DFC=\angle AFC. \qquad (4)$$
$(3)$ 与 $(4)$ 不能同时成立，同样的归因表明冲突出自临时假设「$D$ 在 $\Gamma$ 内」，此情形也不可能。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (120:2);
\coordinate (B) at (210:2);
\coordinate (C) at (300:2);
\coordinate (D) at (0.646,-0.373);
\coordinate (F) at (1.4398,-1.3882);
\draw (0,0) circle (2);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\draw[dashed] (D) -- (F);
\draw[dashed] (C) -- (F);
\node at (-0.2056,-0.7941) {$\beta$};
\node at (0.8244,-1.3129) {$\beta$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\node[above right] at (D) {$D$};
\node[below] at (F) {$F$};
\end{tikzpicture}
\end{document}
```

> 图 29-41B：临时假设 $D$ 在 $\Gamma$ 内，延长 $AD$ 交圆周于 $F$，虚线 $DF$、$CF$ 为辅助线。
>
> 两处 $\beta$ 分别是 $\angle AFC$ 与 $\angle ADC$；后者又是 $\triangle DFC$ 在 $D$ 处的外角。

两个临时假设都被否定，而点与圆的位置只有「在圆上、在圆内、在圆外」三种，故 $D$ 必在 $\Gamma$ 上，即 $A$、$B$、$C$、$D$ 四点共圆。

若给定的是另一对对角互补（$\angle ABC+\angle ADC=180^\circ$），把上述论证中的 $A$、$C$ 换成 $B$、$D$，逐步相同。

````

````ad-cor
title: 推论（外角等于内对角判别法） | Corollary（Concyclic Test by the Exterior Angle）

四边形 $ABCD$ 中，若顶点 $B$ 处的外角等于其内对角，即延长 $AB$ 至 $E$ 后 $\angle CBE = \angle ADC$（如图 29-42 所示），则 $A$、$B$、$C$、$D$ 四点共圆。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw[dashed] (O) circle (2);
  \coordinate (A) at (150:2);
  \coordinate (B) at (40:2);
  \coordinate (C) at (-60:2);
  \coordinate (D) at (255:2);
  \coordinate (E) at (2.5283,1.3727);
  \draw[very thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[very thick] (B) -- (E);
  \draw[blue!65!black] (D) ++(7.5:0.5) arc (7.5:112.5:0.5);
  \node[blue!65!black] at (-0.0426,-1.1091) {$\beta$};
  \draw[green!55!black] (B) ++(260:0.55) arc (260:365:0.55);
  \node[green!55!black] at (2.1739,0.5852) {$\beta$};
  \node[above left] at (A) {$A$};
  \node[above right] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[below left] at (D) {$D$};
  \node[above right] at (E) {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-42：四边形 $ABCD$ 在顶点 $B$ 处的外角 $\angle CBE$ 等于内对角 $\angle ADC$。
````

````ad-proof
title: 证明 | Proof

$A$、$B$、$E$ 共线，$\angle ABC + \angle CBE = 180^\circ$（如图 29-43 所示）。
代入已知 $\angle CBE = \angle ADC$，得 $\angle ABC + \angle ADC = 180^\circ$，即四边形 $ABCD$ 有一对对角互补。

由对角互补判别法，四点共圆。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (190:2);
\coordinate (B) at (320:2);
\coordinate (C) at (55:2);
\coordinate (D) at (100:2);
\coordinate (E) at (2.69,-1.6);
\draw (A) -- (B) -- (C) -- (D) -- cycle;
\draw (B) -- (E);
\draw (1.48,-0.87) arc (97.5:-15:0.42);
\draw (-0.59,1.63) arc (-125:-12.5:0.42);
\node at (2.04,-0.84) {$\gamma$};
\node at (-0.10,1.34) {$\gamma$};
\node[below left] at (A) {$A$};
\node[below] at (B) {$B$};
\node[above right] at (C) {$C$};
\node[above left] at (D) {$D$};
\node[right] at (E) {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-43：此时尚无圆，四点共圆是待证结论。
>
> 外角 $\angle CBE$ 与内对角 $\angle ADC$ 同为 $\gamma$，与 $\angle ABC$ 各成一对互补，故对角互补判别法适用。
````

> 三条判别法的使用场合：**同侧等角**用于图中已有（或已证出）两个对同一条底边张角相等的点；**对角互补**用于已知两条直线分别平行或已有补角关系可以凑出 $180^\circ$；**外角等于内对角**在延长线已经画出（例如题目中出现四边形的边的延长线）时最省事。判定共圆之后，圆的一切性质（圆心角、同弓形角、切线、弦切角）便同时可用，这正是判别法的价值所在。

````ad-example
title: 示例（两条高给出的四点共圆） | Example（Two Altitudes Give Concyclic Points）

在锐角三角形 $ABC$ 中，$AD \perp BC$ 于 $D$，$BE \perp AC$ 于 $E$，如图 29-44 所示。求证：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (1,3);
\coordinate (B) at (0,0);
\coordinate (C) at (5,0);
\coordinate (D) at (1,0);
\coordinate (E) at (1.8,2.4);
\draw (A) -- (B) -- (C) -- cycle;
\draw (A) -- (D);
\draw (B) -- (E);
\draw[dashed] (D) -- (E);
\draw (0.8,0) -- (0.8,0.2) -- (1,0.2);
\fill (A) circle (1.2pt) node[above] {$A$};
\fill (B) circle (1.2pt) node[below left] {$B$};
\fill (C) circle (1.2pt) node[below right] {$C$};
\fill (D) circle (1.2pt) node[below] {$D$};
\fill (E) circle (1.2pt) node[right] {$E$};
\end{tikzpicture}
\end{document}
```

> 图 29-44：两条高 $AD$、$BE$ 使 $\angle ADB = \angle AEB = 90^\circ$，故 $A$、$B$、$D$、$E$ 共圆；
>
> 虚线 $DE$ 与 $AB$ 形成一对相似三角形。

(a) $A$、$B$、$D$、$E$ 四点共圆；
(b) $\angle CDE = \angle CAB$。

---

(a) 因 $AD \perp BC$，$\angle ADB = 90^\circ$；因 $BE \perp AC$，$\angle AEB = 90^\circ$。
$D$ 在边 $BC$ 上，$E$ 在边 $AC$ 上，锐角三角形中两点同在直线 $AB$ 的靠 $C$ 的一侧。于是 $D$、$E$ 对同一条底边 $AB$ 张出的角相等（同为 $90^\circ$），由同侧等角判别法，$A$、$B$、$D$、$E$ 四点共圆。
(b) 由 (a)，四边形 $ABDE$ 为圆内接四边形，其在圆周上的顺序为 $A$、$B$、$D$、$E$。点 $C$ 在 $BD$ 的延长线上，故 $\angle CDE$ 是四边形 $ABDE$ 在顶点 $D$ 处的外角，其内对角为 $\angle BAE$。由外角等于内对角，

$$\angle CDE = \angle BAE = \angle CAB,$$

最后一步因 $E$ 在边 $AC$ 上，射线 $AE$ 与射线 $AC$ 重合。

> (b) 的结论还可再用一次：$\triangle CDE$ 与 $\triangle CAB$ 有公共角 $\angle C$，再由 $\angle CDE = \angle CAB$，由 AA 得 $\triangle CDE \sim \triangle CAB$。这类「先证四点共圆、再证三角形相似」的链条是 DSE 演绎几何题的典型结构。
````

## 29.2　涉及切线的几何（Geometry Involving Tangents）

> **本节难度上限**：T B+ ｜ C C+ ｜ E B ｜ Q B-

### 29.2.1　切线的性质与判定（Tangents to a Circle）

圆与直线的关系，最终都要落到「圆心到直线的距离」这一个数量上。本节先把这个数量关系摆清楚，切线的性质与判定便是它的两次读图。

````ad-def
title: 定义（切线与割线） | Definition（Tangent and Secant）

与圆恰有一个公共点的直线称为圆的**切线**（Tangent），该公共点称为**切点**（Point of Contact）。与圆有两个公共点的直线称为圆的**割线**（Secant），如图 29-45 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw[black!35] (-3.6,0) circle (1.5);
\draw[black!35] (0,0) circle (1.5);
\draw[black!35] (3.6,0) circle (1.5);
\draw (-5.3,-1.5) -- (-1.9,-1.5) node[right] {$\ell_1$};
\fill (-3.6,-1.5) circle (1.3pt);
\draw (-2,-0.82) -- (2,-0.82) node[right] {$\ell_2$};
\fill (-1.253,-0.82) circle (1.3pt) node[above left] {$A$};
\fill (1.253,-0.82) circle (1.3pt) node[above right] {$B$};
\draw (2,2.2) -- (5.2,2.2) node[right] {$\ell_3$};
\fill (-3.6,0) circle (1.2pt) node[above] {$O$};
\fill (0,0) circle (1.2pt) node[above] {$O$};
\fill (3.6,0) circle (1.2pt) node[above] {$O$};
\node at (-3.6,-2.4) {$d=r$};
\node at (0,-2.4) {$d<r$};
\node at (3.6,-2.4) {$d>r$};
\end{tikzpicture}
\end{document}
```

> 图 29-45：同一圆与三条直线的关系：$\ell_1$ 相切（$d=r$，公共点恰一个）、$\ell_2$ 相交（$d<r$，公共点 $A$、$B$ 两个）、$\ell_3$ 相离（$d>r$，无公共点）。
````

````ad-def
title: 定义（点在圆内、圆上、圆外） | Definition（Interior, On and Exterior to a Circle）

设 $\Gamma = C(O, r)$，$P$ 为平面上一点。按 $OP$ 与 $r$ 的大小关系（如图 29-46 所示），把点分为三类：

$$OP < r \implies P \text{ 在 } \Gamma \text{ 内}; \qquad OP = r \implies P \text{ 在 } \Gamma \text{ 上}; \qquad OP > r \implies P \text{ 在 } \Gamma \text{ 外}.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (O) at (0,0);
\coordinate (P1) at (0.6,-0.3);
\coordinate (P2) at (110:1.8);
\coordinate (P3) at (2.6,0.9);
\draw[dashed] (O) -- (P1) (O) -- (P2) (O) -- (P3);
\fill (O) circle (1.2pt) node[above left] {$O$};
\fill (P1) circle (1.3pt) node[below right] {$P_1$};
\fill (P2) circle (1.3pt) node[above left] {$P_2$};
\fill (P3) circle (1.3pt) node[above right] {$P_3$};
\node at (0.5,-1.15) {$OP_1<r$};
\node at (-1.35,1.62) {$OP_2=r$};
\node at (2.35,-0.72) {$OP_3>r$};
\end{tikzpicture}
\end{document}
```

> 图 29-46：$OP_1<r$ 时 $P_1$ 在圆内，$OP_2=r$ 时 $P_2$ 在圆上，$OP_3>r$ 时 $P_3$ 在圆外。

用集合语言写，$\Gamma$ 的内部就是 $\{P \in \mathbb{R}^2 : OP < r\}$。
````

````ad-thm
title: 定理（直线与圆的位置关系） | Theorem（Position of a Line Relative to a Circle）

设直线 $\ell$ 到圆心 $O$ 的距离为 $d$（即 §8.6 意义下点 $O$ 到 $\ell$ 的垂线段长度），圆的半径为 $r$。则：
(a) $d < r \iff \ell$ 为圆的割线（与圆恰有两个公共点）；
(b) $d = r \iff \ell$ 与圆相切（恰有一个公共点）；
(c) $d > r \iff \ell$ 与圆没有公共点。三情形如图 29-47 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.2);
\draw (-1.8,-0.6) -- (1.8,-0.6);
\draw[dashed] (0,0) -- (0,-0.6);
\fill (0,0) circle (1.2pt) node[above] {$O$};
\fill (1.04,-0.6) circle (1.3pt);
\fill (-1.04,-0.6) circle (1.3pt);
\node[right] at (0,-0.3) {$d$};
\node[below] at (0,-1.9) {$d < r$};
\begin{scope}[xshift=4.6cm]
\draw (0,0) circle (1.2);
\draw (-1.8,-1.2) -- (1.8,-1.2);
\draw[dashed] (0,0) -- (0,-1.2);
\fill (0,0) circle (1.2pt) node[above] {$O$};
\fill (0,-1.2) circle (1.5pt) node[below right] {$P$};
\node[right] at (0,-0.6) {$d$};
\node[below] at (0,-1.9) {$d = r$};
\end{scope}
\begin{scope}[xshift=9.2cm]
\draw (0,0) circle (1.2);
\draw (-1.8,-1.9) -- (1.8,-1.9);
\draw[dashed] (0,0) -- (0,-1.9);
\fill (0,0) circle (1.2pt) node[above] {$O$};
\node[right] at (0,-0.95) {$d$};
\node[below] at (0,-2.2) {$d > r$};
\end{scope}
\end{tikzpicture}
\end{document}
```

> 图 29-47：同一圆半径 $r$ 固定，只把直线平移，$d$ 与 $r$ 的大小关系就决定了公共点的个数：两个、恰一个（切点 $P$）、零个。
````

````ad-proof
title: 证明 | Proof

设 $H$ 为 $O$ 在 $\ell$ 上的垂足，则 $OH = d$，且对 $\ell$ 上任意一点 $P$，由「垂线段最短」与毕氏定理（§8.5），在直角三角形 $OHP$ 中（$P \ne H$ 时 $\angle OHP = 90^\circ$）

$$OP^2 = OH^2 + HP^2 = d^2 + HP^2, \qquad \text{而 } OP \ge OH = d \text{（} P = H \text{ 时取等号）.} \qquad \cdots (1)$$

这一式子是三种情形共用的地基，如图 29-48 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (H) at (0,-2.4);
  \coordinate (P) at (1.3,-2.4);
  \coordinate (R) at (45:1.8);
  \draw (O) circle (1.8);
  \draw[very thick] (-2.4,-2.4) -- (2.4,-2.4) node[right] {$\ell$};
  \draw[dashed] (O) -- (H);
  \draw[very thick] (O) -- (P);
  \draw[dotted] (O) -- (R);
  \draw (0.18,-2.4) -- (0.18,-2.22) -- (0,-2.22);
  \node[left] at (0,-1.2) {$d$};
  \node[above left] at (0.6,0.62) {$r$};
  \node[right] at (0.85,-1.15) {$OP$};
  \node[below] at (0.65,-2.4) {$HP$};
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \fill (H) circle (1.2pt) node[below left] {$H$};
  \fill (P) circle (1.3pt) node[below right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-48：$H$ 是圆心 $O$ 在 $\ell$ 上的垂足，$OH = d$；$P$ 是 $\ell$ 上任取的一点。
>
> 直角三角形 $OHP$ 即式 $(1)$ 的依据：$OP \ge OH = d$，仅 $P = H$ 时取等。
>
> 图中取 $d > r$ 的位置作示意，点 $R$ 处的虚线段为半径 $r$。

下面按陈述的顺序 (a)、(b)、(c) 逐一证明，每一情形都含双向两个半句。

**(a)** 若 $d < r$，则 $r^2 - d^2 > 0$，记 $h = \sqrt{r^2 - d^2}$。

在 $\ell$ 上自 $H$ 向两侧各截取 $HP = HQ = h$（线段可在射线上截取等长，欧几里得第三公设允许此一作图）。

由 (1)，

$$OP^2 = d^2 + h^2 = d^2 + (r^2 - d^2) = r^2, \qquad OQ^2 = d^2 + h^2 = r^2,$$

故 $OP = OQ = r$，$P$、$Q$ 都在圆上，且 $H$ 分居两点之间，故 $P \ne Q$。

反之，若 $\ell$ 与圆有两个公共点，则 (1) 表明这两点到 $H$ 的距离都等于 $\sqrt{r^2 - d^2}$；

两点不同，故该值不为 $0$，从而 $r^2 > d^2$，即 $d < r$。

两向合起来，(a) 成立，如图 29-49 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (H) at (0,-1);
  \coordinate (P) at (-1.4967,-1);
  \coordinate (Q) at (1.4967,-1);
  \draw (O) circle (1.8);
  \draw[very thick] (-2.4,-1) -- (2.4,-1) node[right] {$\ell$};
  \draw[dashed] (O) -- (H) (O) -- (P) (O) -- (Q);
  \node[below] at (-0.75,-1) {$h$};
  \node[below] at (0.75,-1) {$h$};
  \node[above right] at (0.8,-0.42) {$r$};
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \fill (H) circle (1.2pt) node[below] {$H$};
  \fill (P) circle (1.4pt) node[below left] {$P$};
  \fill (Q) circle (1.4pt) node[below right] {$Q$};
\end{tikzpicture}
\end{document}
```

> 图 29-49：$d<r$ 时，自垂足 $H$ 向两侧各截取长 $h$ 得点 $P$、$Q$。
>
> 两段虚线 $OP$、$OQ$ 同为圆的半径。

**(b)** 若 $d = r$，垂足 $H$ 满足 $OH = r$，故 $H$ 在圆上。

若 $\ell$ 上另有 $P \ne H$ 也在圆上，由 (1) 得 $OP^2 = d^2 + HP^2 > d^2 = r^2$，即 $OP > r$，与 $P$ 在圆上冲突。
故 $\ell$ 与圆恰有一个公共点 $H$，即 $\ell$ 与圆相切。

反之，若 $\ell$ 与圆恰有一个公共点 $P$，则 $d \le OP = r$（垂线段最短）。

若 $d < r$，由 (a) 已知 $\ell$ 与圆有两个公共点，与「恰有一个」冲突。
故只能 $d = r$，(b) 的双向成立，如图 29-50 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (H) at (0,-1.8);
  \draw (O) circle (1.8);
  \draw[very thick] (-2.4,-1.8) -- (2.4,-1.8) node[right] {$\ell$};
  \draw[dashed] (O) -- (H);
  \draw (0.18,-1.8) -- (0.18,-1.62) -- (0,-1.62);
  \node[right] at (0,-0.9) {$d = r$};
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \fill (H) circle (1.5pt) node[below left] {$H$};
\end{tikzpicture}
\end{document}
```

> 图 29-50：$d=r$ 时垂足 $H$ 本身就在圆上。
>
> 虚线段 $\overline{OH}$ 同时是圆的半径与圆心到 $\ell$ 的距离。

**(c)** 若 $d > r$，由 (1) 得 $\ell$ 上每一点 $P$ 都满足 $OP \ge d > r$，故 $\ell$ 上无点在圆上。

反之，若 $\ell$ 与圆无公共点而 $d \le r$：$d = r$ 时垂足 $H$ 满足 $OH = r$，$H$ 就在圆上，冲突；

$d < r$ 时 (a) 的构造给出两个公共点，也冲突。
故 $d > r$，(c) 的双向成立，如图 29-51 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \coordinate (R) at (45:1.8);
  \coordinate (H) at (0,-2.4);
  \coordinate (P) at (1.2,-2.4);
  \draw (O) circle (1.8);
  \draw[very thick] (-2.4,-2.4) -- (2.4,-2.4) node[right] {$\ell$};
  \draw[dashed] (O) -- (H);
  \draw[very thick] (O) -- (P);
  \draw[dotted] (O) -- (R);
  \draw (0.18,-2.4) -- (0.18,-2.22) -- (0,-2.22);
  \node[above left] at (0.6,0.62) {$r$};
  \node[left] at (-0.3,-1.2) {$d$};
  \draw[<->] (-0.3,0) -- (-0.3,-2.4);
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \fill (H) circle (1.2pt) node[below left] {$H$};
  \fill (P) circle (1.3pt) node[below right] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-51：$d>r$ 时整条 $\ell$ 落在圆外。
>
> 虚线 $OH$ 被圆周截出的较短一段即半径 $r$，剩下的一段才是 $d$ 超过 $r$ 的部分。

三种情形合起来，$\ell$ 与圆的位置关系完全由 $d$ 与 $r$ 的大小比较决定。
````

> 这条定理把「相交、相切、相离」三种位置完全翻译成一个不等式或等式，比较的双方是 $d$ 与 $r$。它与 §31.2.2 用判别式 $\Delta'$ 数出公共点个数的结论是同一件事的几何版本与代数版本；而定义（点在圆内、圆上、圆外）里的 $OP \gtrless r$，到了坐标里就成了把点的坐标代入方程左端看符号（§31.2.1）。

由 (b) 立即得到本章最重要的两条。

````ad-thm
title: 定理（切线垂直于过切点的半径） | Theorem（Tangent is Perpendicular to the Radius at the Point of Contact）

圆的切线垂直于经过切点的半径：若 $\ell$ 切圆 $C(O, r)$ 于 $P$，则
$$OP \perp \ell.$$
（如图 29-52 所示）

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (90:2);
  \coordinate (A) at (-2.4,2);
  \coordinate (B) at (2.4,2);
  \draw[very thick] (A) -- (B);
  \draw[very thick] (O) -- (P);
  \draw (0.28,2) -- (0.28,1.72) -- (0,1.72);
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \fill (P) circle (1.4pt) node[above] {$P$};
  \node[left] at (B) {$\ell$};
  \node[right] at (0,1) {$r$};
\end{tikzpicture}
\end{document}
```

> 图 29-52：切线 $\ell$ 切圆 $C(O, r)$ 于 $P$，半径 $OP$ 垂直于 $\ell$（$P$ 处为直角）。

````

````ad-proof
title: 证明 | Proof

设 $\ell$ 切圆 $C(O, r)$ 于 $P$，则 $P$ 在圆上，$OP$ 是一条半径，故 $OP = r$。

对 $\ell$ 上任一异于 $P$ 的点 $Q$，因 $Q$ 不是公共点，它不在圆上，故 $OQ > r = OP$。

这说明 $OP$ 是 $O$ 到 $\ell$ 上各点连线中的最短线段。

设 $H$ 为 $O$ 在 $\ell$ 上的垂足，由「垂线段最短」（§8.6）有 $OH \leqslant OP$；

若 $H \neq P$，则 $OP$ 是从 $O$ 到 $\ell$ 的斜线段，必有 $OH < OP$，与上一句「$OP$ 最短」冲突。
故 $H = P$，即 $OP \perp \ell$，如图 29-53 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (O) at (0,0);
\coordinate (P) at (90:1.8);
\coordinate (Q) at (2.1,1.8);
\draw (-2.4,1.8) -- (2.4,1.8) node[right] {$\ell$};
\draw[very thick] (O) -- (P);
\draw[dashed] (O) -- (Q);
\draw (0.28,1.8) -- (0.28,1.52) -- (0,1.52);
\fill (O) circle (1.2pt) node[above right] {$O$};
\fill (P) circle (1.4pt) node[above left] {$P$};
\fill (Q) circle (1.3pt) node[above right] {$Q$};
\node at (0.55,1.17) {$OQ>OP$};
\end{tikzpicture}
\end{document}
```

> 图 29-53：$\ell$ 上除切点 $P$ 外另取一点 $Q$，$Q$ 在圆外，故 $OQ > OP$。

````

````ad-cor
title: 推论（切线的判定） | Corollary（Test for a Tangent）

经过半径的外端并且垂直于这条半径的直线是圆的切线：若 $P$ 在圆 $C(O, r)$ 上，直线 $\ell$ 过 $P$ 且 $\ell \perp OP$（如图 29-54 所示），则 $\ell$ 切圆于 $P$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (55:2);
  \coordinate (A) at (3.0804,0.2847);
  \coordinate (B) at (-0.786,2.9919);
  \draw[very thick] (A) -- (B);
  \draw[very thick] (O) -- (P);
  \draw (0.9751,1.3926) -- (1.2208,1.2205) -- (1.3929,1.4662);
  \fill (O) circle (1.2pt) node[left] {$O$};
  \fill (P) circle (1.4pt) node[left] {$P$};
  \node[above right] at (B) {$\ell$};
\end{tikzpicture}
\end{document}
```

> 图 29-54：点 $P$ 在圆 $C(O, r)$ 上，直线 $\ell$ 经过 $P$ 且 $\ell \perp OP$（$P$ 处为直角），则 $\ell$ 切圆于 $P$。
````

````ad-proof
title: 证明 | Proof

设 $P$ 在圆 $C(O, r)$ 上，直线 $\ell$ 过 $P$ 且 $\ell \perp OP$。

因 $\ell \perp OP$ 且 $P$ 在 $\ell$ 上，$P$ 就是 $O$ 在 $\ell$ 上的垂足，圆心到 $\ell$ 的距离 $d = OP = r$。

也可直接看出 $\ell$ 与圆别无公共点：对 $\ell$ 上任一异于 $P$ 的点 $Q$，直角三角形 $OPQ$ 中 $OQ$ 是斜边，由毕氏定理（§8.5）

$$OQ^2 = OP^2 + PQ^2 > r^2,$$
故 $Q$ 在圆外，$\ell$ 与圆只有一个公共点 $P$。

由「直线与圆的位置关系」的 (b)，$\ell$ 切圆于 $P$，如图 29-55 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (O) at (0,0);
\coordinate (P) at (90:1.8);
\coordinate (Q) at (1.7,1.8);
\draw (-2.3,1.8) -- (2.3,1.8) node[right] {$\ell$};
\draw[very thick] (O) -- (P);
\draw[dashed] (O) -- (Q);
\draw (0.28,1.8) -- (0.28,1.52) -- (0,1.52);
\fill (O) circle (1.2pt) node[above right] {$O$};
\fill (P) circle (1.4pt) node[above left] {$P$};
\fill (Q) circle (1.3pt) node[above right] {$Q$};
\node at (2.15,1.15) {$OQ>OP$};
\end{tikzpicture}
\end{document}
```

> 图 29-55：$\ell\perp OP$ 于圆上的点 $P$；$\ell$ 上另取的点 $Q$ 落在圆外，$OQ$ 是直角三角形 $OPQ$ 的斜边。
````

````ad-cor
title: 推论（过切点垂直于切线的直线经过圆心） | Corollary（The Perpendicular to a Tangent at the Point of Contact Passes through the Centre）

若直线 $m$ 经过切点 $P$ 且垂直于切线 $\ell$（如图 29-56 所示），则 $m$ 经过圆心 $O$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (90:2);
  \coordinate (A) at (-2.4,2);
  \coordinate (B) at (2.4,2);
  \coordinate (C) at (0,3.3);
  \coordinate (D) at (0,-0.6);
  \draw[very thick] (A) -- (B);
  \draw[dashed, very thick] (O) -- (P);
  \draw[very thick] (C) -- (D);
  \draw (0.28,2) -- (0.28,1.72) -- (0,1.72);
  \fill (O) circle (1.2pt) node[left] {$O$};
  \fill (P) circle (1.4pt) node[right] {$P$};
  \node[right] at (2.4,2) {$\ell$};
  \node[right] at (0.1,3.3) {$m$};
\end{tikzpicture}
\end{document}
```

> 图 29-56：直线 $m$ 经过切点 $P$ 且垂直于切线 $\ell$，则 $m$ 经过圆心 $O$。
````

````ad-proof
title: 证明 | Proof

由切线性质定理，$OP \perp \ell$，故直线 $OP$ 是一条过 $P$ 且垂直于 $\ell$ 的直线。

在同一个平面内，过一点垂直于已知直线的直线只有一条（§8.6 定义点到直线的距离时所用的垂线即此唯一垂线），故 $m$ 与直线 $OP$ 重合，$m$ 经过 $O$（如图 29-57 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (P) at (270:1.8);
\draw (-2.3,-1.8) -- (2.3,-1.8) node[right] {$\ell$};
\draw (0,-2.7) -- (0,2.7) node[right] {$m$};
\draw[very thick,dashed] (0,0) -- (P);
\draw (0.28,-1.8) -- (0.28,-1.52) -- (0,-1.52);
\fill (0,0) circle (1.4pt) node[above right] {$O$};
\fill (P) circle (1.4pt) node[below left] {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-57：$OP \perp \ell$，而题设 $m \perp \ell$ 且 $m$ 过 $P$。
>
> 过一点垂直于已知直线的直线只有一条，故 $m$ 与 $OP$ 所在直线重合（粗虚线），$m$ 经过圆心 $O$。
````

> 三条结论的用法各不相同：证**垂直**时想到「切线 $\perp$ 半径」；证**切线**时想到「过半径外端作垂线」（或转而证 $d = r$）；要从「切线」反推**圆心位置**（例如求圆心、证三点共线）时，用第三条。

````ad-thm
title: 定理（外点的两条切线） | Theorem（Two Tangents from an External Point）

从圆外一点 $P$ 向圆 $C(O, r)$ 引两条切线 $PA$、$PB$，$A$、$B$ 为切点（如图 29-58 所示），则

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.5);
\coordinate (O) at (0,0);
\coordinate (A) at (122.3924:1.5);
\coordinate (B) at (237.6076:1.5);
\coordinate (P) at (-2.8,0);
\draw (P) -- (A) (P) -- (B);
\draw (O) -- (A) (O) -- (B);
\draw[dashed] (O) -- (P);
\fill (O) circle (1.2pt) node[above right] {$O$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[left] at (P) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 29-58：从外点 $P$ 引的两条切线关于直线 $OP$ 左右对称，$PA = PB$、$\angle APO = \angle OPB$、$\angle AOP = \angle POB$。

(a) $PA = PB$；
(b) $OP$ 平分 $\angle APB$；
(c) $OP$ 平分 $\angle AOB$。

````

````ad-proof
title: 证明 | Proof

连接 $OA$、$OB$。

$PA$、$PB$ 为切线，由「切线垂直于过切点的半径」，$OA \perp PA$、$OB \perp PB$，即 $\angle OAP = \angle OBP = 90^\circ$。

在直角三角形 $OAP$ 与 $OBP$ 中，斜边 $OP$ 为公共边，直角边 $OA = OB = r$。

由 RHS 得

$$\triangle OAP \cong \triangle OBP.$$

对应边与对应角相等，即 $PA = PB$、$\angle APO = \angle OPB$、$\angle AOP = \angle POB$，三条结论同时成立（如图 29-59 所示）。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (P) at (3.3,0);
\coordinate (A) at (0.982,1.509);
\coordinate (B) at (0.982,-1.509);
\fill[blue, opacity=0.18] (O) -- (A) -- (P) -- cycle;
\fill[red, opacity=0.18] (O) -- (B) -- (P) -- cycle;
\draw (O) circle (1.8);
\draw (P) -- (A) (P) -- (B);
\draw[very thick] (O) -- (P);
\draw[dashed] (O) -- (A) (O) -- (B);
\draw (0.851,1.307) -- (1.052,1.177) -- (1.183,1.378);
\draw (0.851,-1.307) -- (1.052,-1.177) -- (1.183,-1.378);
\fill (O) circle (1.2pt) node[above left] {$O$};
\node[above right] at (P) {$P$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\end{tikzpicture}
\end{document}
```

> 图 29-59：蓝色 $\triangle OAP$ 与红色 $\triangle OBP$ 中，$\angle OAP = \angle OBP = 90^\circ$、直角边 $OA = OB = r$、斜边 $OP$（粗线）公共，由 RHS 全等，三条结论同时成立。

> 顺带一条常用结论：由 $PA = PB$ 知 $P$ 到 $A$、$B$ 等距，由 $OA = OB$ 知 $O$ 亦然，两点都在线段 $\overline{AB}$ 的垂直平分线上（§29.1.1 的引理），故 **$OP$ 是弦 $AB$ 的垂直平分线**，$OP \perp AB$ 且平分 $AB$。DSE 中「两切点连线」的题目多用这一条。

````ad-example
title: 示例（两切线的夹角与切线长） | Example（Angle Between Two Tangents and the Tangent Length）

从圆外一点 $P$ 引圆 $C(O, 3\,\text{cm})$ 的两条切线 $PA$、$PB$，切点为 $A$、$B$，$\angle APB = 60^\circ$，如图 29-60 所示。求：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.3);
\draw (-0.65,-1.126) -- (-0.65,1.126);
\coordinate (A) at (120:1.3);
\coordinate (B) at (240:1.3);
\coordinate (P) at (-2.6,0);
\draw (P) -- (A) (P) -- (B);
\draw (0,0) -- (A) (0,0) -- (B);
\draw[dashed] (0,0) -- (P);
\fill (0,0) circle (1.2pt) node[above right] {$O$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[left] at (P) {$P$};
\node[above right] at (-0.32,0.56) {$3$};
\node at (-0.36,0.2) {$60^\circ$};
\node at (-1.8273,0.2071) {$30^\circ$};
\node at (-1.8273,-0.2071) {$30^\circ$};
\draw (-0.575,0.9959) -- (-0.7049,0.9209) -- (-0.7799,1.0508);
\draw (-0.575,-0.9959) -- (-0.7049,-0.9209) -- (-0.7799,-1.0508);
\node[below] at (-1.3,-0.05) {$6$};
\end{tikzpicture}
\end{document}
```

> 图 29-60：直角在切点 $A$、$B$；
>
> $OP$ 平分 $\angle APB$ 与 $\angle AOB$，故 $\angle AOP = 60^\circ$、$\angle AOB = 120^\circ$，而 $OP = 6$、$PA = 3\sqrt{3}$。

(a) $\angle AOB$；
(b) 切线长 $PA$。

---

(a) $OA \perp PA$、$OB \perp PB$，故 $\angle OAP = \angle OBP = 90^\circ$。四边形 $OAPB$ 的内角和为 $360^\circ$（§8.3），于是

$$\angle AOB = 360^\circ - 90^\circ - 90^\circ - 60^\circ = 120^\circ.$$

(b) $OP$ 平分 $\angle AOB$，故 $\angle AOP = \dfrac{120^\circ}{2} = 60^\circ$。在直角三角形 $OAP$ 中（直角在 $A$），

$$PA = OA \tan\angle AOP = 3 \times \sqrt{3} = 3\sqrt{3}\,\text{cm}.$$

> 若尚未熟用正切比，可改用特殊角的边角关系：$\angle APO = 90^\circ - 60^\circ = 30^\circ$，故 $OP = 2OA = 6\,\text{cm}$，再由毕氏定理 $PA = \sqrt{6^2 - 3^2} = \sqrt{27} = 3\sqrt{3}\,\text{cm}$。
````

### 29.2.2　弦切角与内错弓形（The Angle in the Alternate Segment）

切线与弦在切点处夹出一个角，这个角与圆内的圆周角有直接的等量关系。本节内容属延伸内容，但在倒角题里它常常是唯一能「把圆外的角搬进圆内」的一条路。

````ad-def
title: 定义（弦切角与内错弓形） | Definition（Angle between a Tangent and a Chord, and Alternate Segment）

顶点在切点、一边沿切线、另一边为弦的角称为**弦切角**。设直线 $XY$ 切圆于 $A$，$AB$ 为弦，则 $\angle BAY$ 与 $\angle BAX$ 是一对弦切角，且

$$\angle BAY + \angle BAX = 180^\circ.$$

弦 $AB$ 把圆面分成两个弓形。弦切角内部所含的那段弧（角的内部与圆面相交的弧）称为该弦切角**截取的弧**；不含这段弧的弓形称为该弦切角的**内错弓形**（Alternate Segment）。如图 29-61，$\angle BAY$ 截取弧 $\widehat{AB}$（靠 $Y$ 的一段），其内错弓形是含 $C$ 的那一个。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\fill[blue, opacity=0.18] (270:2) arc (270:390:2) -- (0,-2) -- cycle;
\draw (0,0) circle (2);
\draw (-2.9,-2) -- (2.9,-2);
\draw (0,-2) -- (30:2);
\draw[dashed] (30:2) -- (140:2) -- (0,-2);
\draw (0,-2) -- (0,2);
\node[below left] at (-2.9,-2) {$X$};
\node[below right] at (2.9,-2) {$Y$};
\node[right] at (30:2) {$B$};
\node[above left] at (140:2) {$C$};
\node[below left] at (0,-2) {$A$};
\node[right] at (0,2) {$D$};
\node at (-0.8768,0.8267) {$\theta$};
\node at (0.6495,-1.625) {$\theta$};
\end{tikzpicture}
\end{document}
```

> 图 29-61：$\angle BAY$ 为弦切角，它截取靠 $Y$ 的劣弧 $\widehat{AB}$（蓝色弓形即该弧与弦 $AB$ 围成）；
>
> 其内错弓形是含 $C$ 的另一个弓形，两处的角同标为 $\theta$。
>
> $AD$ 为直径，供情形一的证明使用。
````

````ad-thm
title: 定理（弦切角定理） | Theorem（Angle in the Alternate Segment Theorem）

弦切角等于它所截取的弧所对的圆周角，即等于内错弓形内的圆周角：
（如图 29-62 所示）

$$\angle BAY = \angle ACB.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (90:2);
  \coordinate (B) at (300:2);
  \coordinate (C) at (190:2);
  \coordinate (X) at (-2.7,2);
  \coordinate (Y) at (2.7,2);
  \draw[very thick] (X) -- (Y);
  \draw[very thick] (A) -- (B);
  \draw (C) -- (A) (C) -- (B);
  \draw[red!65!black] (A) ++(-75:0.55) arc (-75:0:0.55);
  \node[red!65!black] at (0.714,1.452) {$\theta$};
  \draw[red!65!black] (C) ++(-25:0.5) arc (-25:50:0.5);
  \node[red!65!black] at (-1.14,-0.163) {$\theta$};
  \node[above] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[above left] at (C) {$C$};
  \node[above left] at (X) {$X$};
  \node[above right] at (Y) {$Y$};
\end{tikzpicture}
\end{document}
```

> 图 29-62：直线 $XY$ 切圆于 $A$，弦 $AB$ 与切线夹出弦切角 $\angle BAY$；$C$ 落在弦 $AB$ 的另一侧弓形（内错弓形）内，$\angle ACB$ 是该弓形内的圆周角，两者同为 $\theta$。

````

````ad-proof
title: 证明 | Proof

按 $\angle BAY$ 所截的弧分三种情形。

**情形一：所截的弧为劣弧（$\angle BAY < 90^\circ$）。** 作直径 $AD$，连接 $DB$，如图 29-63A。

$AD$ 过圆心且 $AD \perp XY$（切线垂直于过切点的半径），故 $\angle DAY = 90^\circ$。

此时射线 $AB$ 落在 $\angle DAY$ 内部，

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (A) at (270:1.8);
\coordinate (B) at (330:1.8);
\coordinate (D) at (90:1.8);
\draw (-2.6,-1.8) -- (2.6,-1.8) node[right] {$Y$};
\node[left] at (-2.6,-1.8) {$X$};
\draw (A) -- (D) (A) -- (B) (B) -- (D);
\draw (0.28,-1.8) -- (0.28,-1.52) -- (0,-1.52);
\draw (1.335,-1.03) -- (1.205,-0.805) -- (1.434,-0.675);
\node at (0.695,-1.614) {$\alpha$};
\node at (0.35,-1.195) {$\beta$};
\node at (0.3882,0.3511) {$\alpha$};
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-63A：作直径 $AD$、连 $DB$，则 $\angle DAY = 90^\circ$、$\angle ABD = 90^\circ$。
>
> $\angle BAY = \alpha$ 与 $\angle ADB = \alpha$ 同为 $\beta$ 的余角。

$$\angle BAY = 90^\circ - \angle BAD.$$

又 $AD$ 为直径，由「半圆内的圆周角为直角」，$\angle ABD = 90^\circ$。

在 $\triangle ABD$ 中由内角和定理，

$$\angle ADB = 180^\circ - 90^\circ - \angle BAD = 90^\circ - \angle BAD,$$

故 $\angle BAY = \angle ADB$。

$D$ 与 $C$ 同在内错弓形内（同在弦 $AB$ 的同一侧，如图 29-63B），由同弓形内的圆周角相等，$\angle ACB = \angle ADB$。
两式合并即得 $\angle BAY = \angle ACB$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (A) at (270:1.8);
\coordinate (B) at (330:1.8);
\coordinate (C) at (150:1.8);
\coordinate (D) at (90:1.8);
\draw (-2.6,-1.8) -- (2.6,-1.8) node[right] {$Y$};
\node[left] at (-2.6,-2.04) {$X$};
\draw (A) -- (B) (C) -- (A) (C) -- (B) (D) -- (A) (D) -- (B);
\node at (-1.064,0.405) {$\alpha$};
\node at (0.194,1.075) {$\alpha$};
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above left] at (C) {$C$};
\node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-63B：$C$ 与 $D$ 同在弦 $AB$ 的上侧弓形内，张向同一段弧 $\widehat{AB}$，故 $\angle ACB = \angle ADB = \alpha$。

**情形二：$AB$ 为直径（如图 29-64 所示）。** 所截的弧为半圆，且 $\angle BAY = 90^\circ$（切线与直径垂直）。

此时 $C$ 在任一半圆上，由「半圆内的圆周角为直角」，$\angle ACB = 90^\circ = \angle BAY$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (A) at (270:1.8);
\coordinate (B) at (90:1.8);
\coordinate (C) at (200:1.8);
\fill[blue, opacity=0.18] (0,0) -- (90:1.8) arc (90:270:1.8) -- cycle;
\draw (-2.6,-1.8) -- (2.6,-1.8) node[right] {$Y$};
\node[left] at (-2.6,-1.8) {$X$};
\draw (A) -- (B) (A) -- (C) (B) -- (C);
\draw (0.28,-1.8) -- (0.28,-1.52) -- (0,-1.52);
\draw (-1.4621,-0.7762) -- (-1.3015,-0.5469) -- (-1.5308,-0.3863);
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below left] at (A) {$A$};
\node[above right] at (B) {$B$};
\node[above left] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-64：$AB$ 为直径时 $\angle BAY = 90^\circ$（切线垂直于直径），而 $\angle ACB$ 是半圆（蓝色部分）内的圆周角，也是 $90^\circ$。

**情形三：所截的弧为优弧（$\angle BAY > 90^\circ$）。** 此时另一弦切角 $\angle BAX = 180^\circ - \angle BAY < 90^\circ$，它截取的是靠 $X$ 的劣弧 $\widehat{AB}$（这段弧含 $C$）。

取 $D$ 为另一段弧（靠 $Y$ 的优弧）上一点，则对 $\angle BAX$ 而言 $D$ 落在它的内错弓形中，由情形一（如图 29-65A 所示），

$$\angle BAX = \angle ADB.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (A) at (270:1.8);
\coordinate (B) at (200:1.8);
\coordinate (D) at (90:1.8);
\draw (-2.6,-1.8) node[left] {$X$} -- (2.6,-1.8) node[right] {$Y$};
\draw (A) -- (B) (A) -- (D) (B) -- (D);
\node at (-0.715,-1.568) {$\alpha$};
\node at (-0.227,1.085) {$\alpha$};
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below right] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[above] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-65A：$\angle BAY$ 为钝角时改看另一侧的弦切角 $\angle BAX = \alpha$，它截取含 $X$ 的劣弧 $\widehat{AB}$；
>
> $D$ 在另一段弧上，情形一给出 $\angle ADB = \alpha$。

$C$ 与 $D$ 分居弦 $AB$ 两侧，故四点在圆周上的顺序为 $A$、$C$、$B$、$D$，四边形 $ACBD$（如图 29-65B 所示）为圆内接四边形，由对角互补得 $\angle ACB + \angle ADB = 180^\circ$。
于是

$$\angle ACB = 180^\circ - \angle ADB = 180^\circ - \angle BAX = \angle BAY.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (A) at (270:1.8);
\coordinate (B) at (200:1.8);
\coordinate (C) at (235:1.8);
\coordinate (D) at (90:1.8);
\draw (-2.6,-1.8) node[left] {$X$} -- (2.6,-1.8) node[right] {$Y$};
\draw (A) -- (C) -- (B) -- (D) -- cycle;
\node at (-0.632,-0.903) {$\beta$};
\node at (-0.227,1.085) {$\alpha$};
\fill (0,0) circle (1.2pt) node[right] {$O$};
\node[below right] at (A) {$A$};
\node[above left] at (B) {$B$};
\node[below left] at (C) {$C$};
\node[above right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-65B：$C$ 与 $D$ 分居弦 $AB$ 两侧，$ACBD$ 为圆内接四边形，$\angle ACB = \beta$ 与 $\angle ADB = \alpha$ 互补，故 $\beta = 180^\circ - \alpha = \angle BAY$。

三种情形合并，定理成立。
同理 $\angle BAX = \angle ADB$ 恒成立，即一对弦切角分别与两个弓形内的圆周角相等。

````

````ad-thm
title: 定理（弦切角定理的逆） | Theorem（Converse of the Angle in the Alternate Segment Theorem）

设直线 $XY$ 经过圆 $C(O, r)$ 上一点 $A$，与弦 $AB$ 构成 $\angle BAY$。若 $\angle BAY$ 等于射线 $AY$ 一侧那段弧 $\widehat{AB}$ 所对的圆周角（如图 29-66 所示），则 $XY$ 与圆相切。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (A) at (110:2);
  \coordinate (B) at (330:2);
  \coordinate (C) at (210:2);
  \coordinate (X) at (-2.939,1.058);
  \coordinate (Y) at (1.571,2.7);
  \draw[very thick] (X) -- (Y);
  \draw[very thick] (A) -- (B);
  \draw (C) -- (A) (C) -- (B);
  \draw[red!65!black] (A) ++(-50:0.55) arc (-50:20:0.55);
  \node[red!65!black] at (0.234,1.633) {$\theta$};
  \draw[red!65!black] (C) ++(0:0.5) arc (0:70:0.5);
  \node[red!65!black] at (-1.036,-0.512) {$\theta$};
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \fill (A) circle (1.4pt);
  \node[above left] at (A) {$A$};
  \node[below right] at (B) {$B$};
  \node[below left] at (C) {$C$};
  \node[below left] at (X) {$X$};
  \node[above right] at (Y) {$Y$};
\end{tikzpicture}
\end{document}
```

> 图 29-66：已知条件只是 $\angle BAY = \angle ACB$（两处同标 $\theta$）；$XY$ 与圆相切于 $A$ 是本定理要证的结论，故图中不预画半径与直角。
````

````ad-proof
title: 证明 | Proof

过 $A$ 作圆的切线 $AT$，并使射线 $AT$ 与 $Y$ 在直线 $AB$ 的同一侧（这样的切线存在，即 §29.2.1 中过 $A$ 垂直于 $OA$ 的直线；
而射线 $AT$ 由「在 $AB$ 的给定一侧，以 $A$ 为端点且与 $AB$ 成定角的射线唯一」确定），如图 29-67 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.8);
\coordinate (A) at (215:1.8);
\coordinate (B) at (350:1.8);
\coordinate (C) at (120:1.8);
\coordinate (Y) at (-0.098,-2.998);
\coordinate (X) at (-2.852,0.934);
\draw (X) -- (Y) node[below right] {$Y(T)$};
\node[above left] at (X) {$X$};
\draw (A) -- (B) (C) -- (A) (C) -- (B);
\draw[dashed] (0,0) -- (A);
\node at (-0.724,-1.317) {$\alpha$};
\node at (-0.266,0.854) {$\alpha$};
\fill (0,0) circle (1.2pt) node[above right] {$O$};
\node[above left] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[above] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-67：过 $A$ 作真切线 $AT$（与 $Y$ 同侧），弦切角定理给出 $\angle BAT = \angle BCA = \alpha$；
>
> 题设 $\angle BAY$ 也等于 $\angle BCA$，同侧定角射线唯一，故两射线重合，$XY$ 就是切线。

$AT$ 为切线，由弦切角定理，$\angle BAT$ 等于它所截的弧所对的圆周角。

射线 $AT$ 与 $AY$ 同在 $AB$ 的这一侧，两角截取的是同一段弧，故

$$\angle BAT = \angle BAY$$

（两者都等于题设的那个圆周角）。
又在直线 $AB$ 的同一侧，以 $AB$ 为一边、大小给定的角只有唯一一个，故射线 $AT$ 与射线 $AY$ 重合，直线 $XY$ 与直线 $AT$ 重合。

$AT$ 为切线，所以 $XY$ 切圆于 $A$。

````

````ad-note
title: 注记（辨认弦切角） | Note（Spotting the Angle in the Alternate Segment）

弦切角是倒角题里最容易被「视而不见」的一条，因为它藏得不像定理。辨认只看三件事：

1. 顶点在圆周上；
2. 一条边落在切线上（题目常把切线画成过该点的线段或其延长线，不一定标出「切线」二字）；
3. 另一条边是弦。

三条齐备，就写「弦切角等于内错弓形内的圆周角」。若图中只给了「一条过圆上一点的直线与弦所成的角等于该弦所对的圆周角」，反过来用逆定理，即得这条直线是切线。
````

````ad-example
title: 示例（切线上的两个弦切角） | Example（Two Angles at the Point of Contact）

直线 $XY$ 切圆于 $A$，$B$、$C$ 在圆上，$B$ 靠 $Y$ 一侧、$C$ 靠 $X$ 一侧，如图 29-68 所示。已知 $\angle BAY = 46^\circ$、$\angle CAX = 32^\circ$。求：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\draw (-2.7,-2) -- (2.7,-2);
\draw (0,-2) -- (2:2) (0,-2) -- (206:2);
\draw (2:2) -- (206:2);
\node[below left] at (-2.7,-2) {$X$};
\node[below right] at (2.7,-2) {$Y$};
\node[below left] at (0,-2) {$A$};
\node[right] at (2:2) {$B$};
\node[left] at (206:2) {$C$};
\node at (0.649,-1.734) {$46^\circ$};
\node at (-0.674,-1.809) {$32^\circ$};
\end{tikzpicture}
\end{document}
```

> 图 29-68：两个弦切角 $\angle BAY = 46^\circ$、$\angle CAX = 32^\circ$ 分别把 $\angle ACB$ 与 $\angle ABC$ 从圆外搬到圆内。

(a) $\angle ACB$；
(b) $\angle ABC$；
(c) $\angle BAC$。

---

(a) $\angle BAY$ 是弦切角，截取靠 $Y$ 的弧 $\widehat{AB}$；$C$ 在其内错弓形内，故

$$\angle ACB = \angle BAY = 46^\circ.$$

(b) 同理，$\angle CAX$ 截取靠 $X$ 的弧 $\widehat{AC}$，$B$ 在其内错弓形内，故

$$\angle ABC = \angle CAX = 32^\circ.$$

(c) $X$、$A$、$Y$ 共线，射线 $AB$、$AC$ 在其间，故

$$\angle BAC = 180^\circ - \angle BAY - \angle CAX = 180^\circ - 46^\circ - 32^\circ = 102^\circ.$$

> 检验：$\triangle ABC$ 的三个内角之和 $= 102^\circ + 46^\circ + 32^\circ = 180^\circ$（§8.2 内角和定理），与 (a)、(b)、(c) 一致。
````

````ad-example
title: 示例（切线平行于弦的两问） | Example（A Tangent Parallel to a Chord）

圆 $\Gamma$ 中，$A$、$B$、$C$ 在圆上，过 $A$ 的切线 $\ell$ 平行于弦 $BC$。$D$ 是不含 $A$ 的弧 $\widehat{BC}$ 上一点，弦 $AD$ 与 $BC$ 交于 $X$，如图 29-69 所示。求证：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (2);
\coordinate (A) at (60:2);
\coordinate (B) at (280:2);
\coordinate (C) at (200:2);
\coordinate (D) at (250:2);
\draw (A) -- (B) -- (C) -- cycle;
\draw (A) -- (D);
\draw (B) -- (D);
\draw (-0.7,2.7127) -- (2.7,0.7513);
\node[above] at (-0.56,2.63) {$\ell$};
\fill (2.56,0.8319) circle (1.2pt) node[below right] {$T$};
\fill (0,0) circle (1.2pt) node[above right] {$O$};
\fill (A) circle (1.2pt) node[above] {$A$};
\fill (B) circle (1.2pt) node[below right] {$B$};
\fill (C) circle (1.2pt) node[above left] {$C$};
\fill (D) circle (1.2pt) node[below] {$D$};
\fill (-0.499,-1.482) circle (1.5pt) node[above right] {$X$};
\end{tikzpicture}
\end{document}
```

> 图 29-69：$\ell$ 切圆于 $A$ 且 $\ell \parallel BC$，$T$ 为 $\ell$ 上与 $C$ 分居 $AB$ 两侧的一点；
>
> $X$ 为弦 $AD$ 与 $BC$ 的交点。
>
> (a) 用弦切角与内错角，(b) 用等弦对等弧与 AA 相似。

(a) $AB = AC$；
(b) $AB^2 = AX \cdot AD$。

---

(a) 在切线 $\ell$ 上取一点 $T$，使 $T$ 与 $C$ 分居直线 $AB$ 的两侧。$\angle TAB$ 的一边沿切线、另一边为弦 $AB$，是弦切角，它截取不含 $C$ 的那段弧 $\widehat{AB}$，故 $C$ 在其内错弓形内，由弦切角定理

$$\angle TAB = \angle ACB.$$

又 $\ell \parallel BC$，截线为 $AB$，而 $T$ 与 $C$ 在 $AB$ 两侧，故 $\angle TAB$ 与 $\angle ABC$ 为内错角，

$$\angle TAB = \angle ABC.$$

两式合并得 $\angle ABC = \angle ACB$。在 $\triangle ABC$ 中，等角对等边（§8.7），故

$$AB = AC.$$

(b) 因 $X$ 在弦 $AD$ 上，射线 $AX$ 与射线 $AD$ 重合，故 $\angle BAX = \angle DAB$，即 $\triangle ABX$ 与 $\triangle ADB$ 有公共角 $\angle A$。
又 $X$ 在边 $BC$ 上，射线 $BX$ 与射线 $BC$ 重合，故 $\angle ABX = \angle ABC$。由 (a) 的 $AB = AC$，据「等弦截取等弧」，两弦所对的劣弧 $\widehat{AB}$ 与劣弧 $\widehat{AC}$ 相等。$\angle ADB$ 张向劣弧 $\widehat{AB}$（$D$ 在另一段弧上），$\angle ABC$ 张向劣弧 $\widehat{AC}$，由圆心角定理，等弧所对的圆周角相等，故

$$\angle ABX = \angle ABC = \angle ADB.$$

两对角相等，由 AA 得 $\triangle ABX \sim \triangle ADB$，对应边成比例：

$$\dfrac{AB}{AD} = \dfrac{AX}{AB},$$

去分母即得 $AB^2 = AX \cdot AD$。

> (b) 的形状是「一条线段之积等于另一线段的平方」，正是下一小节圆幂定理的形状：$AX \cdot AD$ 是过 $A$ 的弦被交点分成的两段之积，$AB$ 则扮演切线段的角色。
````

### 29.2.3　圆幂定理（Power of a Point）

两条弦（或割线）相交，交点把每条弦分成两段。下面两条定理说明：无论怎样转动这两条线，两段乘积都不变。这两条超出常规课程的要求，此处作为扩展阅读给出，证明只用本章的圆周角与 §8.4 的相似三角形；结论是解析几何中「点与圆的幂」这一概念的几何原型。

````ad-thm
title: 定理（相交弦定理） | Theorem（Intersecting Chords Theorem）

圆内两条弦 $AB$、$CD$ 交于点 $P$（如图 29-70 所示），则

$$PA \cdot PB = PC \cdot PD.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.6);
\draw (-1.386,0.8) -- (0.415,-1.546);
\draw (-1.504,-0.547) -- (0.676,1.45);
\fill (0,0) circle (1.2pt) node[right] {$O$};
\fill (-0.83,0.07) circle (1.5pt) node[above] {$P$};
\node[above left] at (-1.386,0.8) {$A$};
\node[below right] at (0.415,-1.546) {$B$};
\node[below left] at (-1.504,-0.547) {$C$};
\node[above right] at (0.676,1.45) {$D$};
\node[below] at (0,-2.1) {$(a)$};
\begin{scope}[xshift=5.6cm]
\draw (0,0) circle (1.6);
\coordinate (P) at (-3.1,-0.9);
\draw (P) -- (1.323,-0.9);
\draw (P) -- (1.166,1.092);
\draw[dashed] (0,0) -- (P);
\fill (0,0) circle (1.2pt) node[right] {$O$};
\fill (P) circle (1.2pt) node[left] {$P$};
\node[below] at (-1.323,-0.9) {$A$};
\node[right] at (1.323,-0.9) {$B$};
\node[above left] at (-1.588,-0.194) {$C$};
\node[above right] at (1.166,1.092) {$D$};
\node[below] at (0,-2.1) {$(b)$};
\end{scope}
\end{tikzpicture}
\end{document}
```

> 图 29-70：(a) 两弦交于圆内一点 $P$；
>
> (b) 两割线（其一可为切线）交于圆外一点 $P$。
>
> 两种情形下「过 $P$ 的弦被分成的两段之积」都是同一个数。
````

````ad-proof
title: 证明 | Proof

连接 $AC$、$BD$，如图 29-70(a)。

在 $\triangle APC$ 与 $\triangle DPB$ 中：

- $\angle APC = \angle DPB$（对顶角）；
- $\angle CAP$ 即 $\angle CAB$，$\angle BDP$ 即 $\angle BDC$，两角同在弦 $CB$ 的同一侧、张向同一段弧 $\widehat{CB}$，由同弓形内的圆周角相等，$\angle CAP = \angle BDP$。

由 AA 得 $\triangle APC \sim \triangle DPB$（如图 29-71 所示），对应边成比例：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (A) at (20:1.8);
\coordinate (B) at (215:1.8);
\coordinate (C) at (110:1.8);
\coordinate (D) at (315:1.8);
\coordinate (P) at (0.474,-0.018);
\fill[blue, opacity=0.18] (A) -- (P) -- (C) -- cycle;
\fill[red, opacity=0.18] (D) -- (P) -- (B) -- cycle;
\draw (O) circle (1.8);
\draw (A) -- (B) (C) -- (D) (A) -- (C) (B) -- (D);
\node at (0.42,0.28) {$\theta$};
\node at (0.53,-0.33) {$\theta$};
\node at (1.28,0.42) {$\alpha$};
\node at (0.8453,-1.0134) {$\alpha$};
\fill (P) circle (1.3pt) node[below right] {$P$};
\node[above right] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[above left] at (C) {$C$};
\node[below right] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-71：连 $AC$、$BD$。
>
> 蓝色 $\triangle APC$ 与红色 $\triangle DPB$ 中，$\theta$ 是一对对顶角，$\alpha$ 是同弓形内张向 $\widehat{CB}$ 的两个圆周角，由 AA 相似。

$$\dfrac{AP}{DP} = \dfrac{PC}{PB}.$$

去分母即得 $PA \cdot PB = PC \cdot PD$。
````

````ad-thm
title: 定理（切割线定理） | Theorem（Secant-Tangent Theorem）

从圆外一点 $P$ 引两条割线 $PAB$、$PCD$（$A$、$C$ 为较近的交点），则（如图 29-72A 所示）
$$PA \cdot PB = PC \cdot PD.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (3,0);
  \coordinate (A) at (1.9884,0.215);
  \coordinate (B) at (-1.729,1.0052);
  \coordinate (C) at (1.8956,-0.6376);
  \coordinate (D) at (-0.3956,-1.9605);
  \draw[very thick] (P) -- (B);
  \draw[very thick] (P) -- (D);
  \fill (P) circle (1.4pt) node[right] {$P$};
  \node[above] at (A) {$A$};
  \node[above left] at (B) {$B$};
  \node[above right] at (C) {$C$};
  \node[below left] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-72A：从圆外一点 $P$ 引的两条割线 $PAB$、$PCD$，$A$、$C$ 分别是各线上较近的交点。

特别地，若 $PT$ 为切线、$T$ 为切点，则（如图 29-72B 所示）
$$PT^2 = PA \cdot PB.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (3,0);
  \coordinate (A) at (1.9884,0.215);
  \coordinate (B) at (-1.729,1.0052);
  \coordinate (T) at (1.3333,-1.4907);
  \draw[very thick] (P) -- (B);
  \draw[very thick] (P) -- (T);
  \fill (P) circle (1.4pt) node[right] {$P$};
  \fill (T) circle (1.4pt);
  \node[above] at (A) {$A$};
  \node[above left] at (B) {$B$};
  \node[below right] at (T) {$T$};
\end{tikzpicture}
\end{document}
```

> 图 29-72B：把其中一条割线转到与圆相切，切点为 $T$，同一乘积即成 $PT^2 = PA \cdot PB$。

````

````ad-proof
title: 证明 | Proof

**两割线。** 连接 $AD$、$CB$，如图 29-70(b)。

在 $\triangle PAD$ 与 $\triangle PCB$ 中：

- $\angle APD = \angle CPB$（同一个角 $\angle P$）；
- $\angle PAD$ 与 $\angle PCB$：因 $A$ 在 $P$、$B$ 之间，射线 $AP$ 与射线 $AB$ 相反，故 $\angle PAD = 180^\circ - \angle BAD$；同理 $\angle PCB = 180^\circ - \angle BCD$。而 $\angle BAD$ 与 $\angle BCD$ 同在弦 $BD$ 的同一侧、张向同一段弧 $\widehat{BD}$，由同弓形内的圆周角相等，$\angle BAD = \angle BCD$，故 $\angle PAD = \angle PCB$。

由 AA 得 $\triangle PAD \sim \triangle PCB$（如图 29-73 所示），于是

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (P) at (3.4,0.4);
\coordinate (A) at (1.623,0.778);
\coordinate (B) at (-1.167,1.371);
\coordinate (C) at (1.799,-0.059);
\coordinate (D) at (-1.494,-1.003);
\fill[blue, opacity=0.18] (P) -- (A) -- (D) -- cycle;
\fill[red, opacity=0.18] (P) -- (C) -- (B) -- cycle;
\draw (0,0) circle (1.8);
\draw (P) -- (B) (P) -- (D) (A) -- (D) (C) -- (B);
\node[above right] at (P) {$P$};
\node[above] at (A) {$A$};
\node[above left] at (B) {$B$};
\node[below right] at (C) {$C$};
\node[below left] at (D) {$D$};
\end{tikzpicture}
\end{document}
```

> 图 29-73：连 $AD$、$CB$。
>
> 蓝色 $\triangle PAD$ 与红色 $\triangle PCB$ 共用 $P$ 处的角 $\theta$；
>
> $\angle BAD = \angle BCD$（张向同一段弧 $\widehat{BD}$），其补角 $\angle PAD = \angle PCB$，由 AA 相似。

$$\dfrac{PA}{PC} = \dfrac{PD}{PB}, \qquad \text{即} \qquad PA \cdot PB = PC \cdot PD.$$

**切线情形。** 连接 $TA$、$TB$。

在 $\triangle PTA$ 与 $\triangle PBT$ 中，$\angle TPA = \angle BPT$（同一个角 $\angle P$）；
又 $PT$ 为切线、$TA$ 为弦，$\angle PTA$ 是弦切角，截取弧 $\widehat{TA}$，而 $\angle PBT$ 即 $\angle TBA$ 张向同一段弧 $\widehat{TA}$，由弦切角定理 $\angle PTA = \angle TBA = \angle PBT$。

由 AA 得 $\triangle PTA \sim \triangle PBT$（如图 29-74 所示），于是

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (P) at (3.4,0);
\coordinate (T) at (0.9533,1.5269);
\coordinate (A) at (1.691,0.623);
\coordinate (B) at (-0.893,1.563);
\fill[blue, opacity=0.18] (P) -- (T) -- (A) -- cycle;
\fill[red, opacity=0.18] (P) -- (B) -- (T) -- cycle;
\draw (0,0) circle (1.8);
\draw (P) -- (T) (P) -- (B) (T) -- (A) (T) -- (B);
\node[above right] at (P) {$P$};
\node[above right] at (T) {$T$};
\node[below] at (A) {$A$};
\node[above left] at (B) {$B$};
\end{tikzpicture}
\end{document}
```

> 图 29-74：连 $TA$、$TB$。
>
> 蓝色 $\triangle PTA$ 与红色 $\triangle PBT$ 共用角 $P$；
>
> $\angle PTA$ 是弦切角，截取 $\widehat{TA}$，等于同弧所对的圆周角 $\angle PBT$，故两三角形相似。

$$\dfrac{PT}{PB} = \dfrac{PA}{PT}, \qquad \text{即} \qquad PT^2 = PA \cdot PB.$$
````

````ad-cor
title: 推论（过一点的两段乘积为定值） | Corollary（The Product is Constant for a Given Point）

设 $\Gamma = C(O, r)$，$P$ 为一点，$OP = h$。过 $P$ 的任意一条割线与 $\Gamma$ 交于 $A$、$B$ 两点，则

$$PA \cdot PB = \lvert r^2 - h^2 \rvert,$$

（如图 29-75A、图 29-75B 所示）
即该乘积与割线的方向无关。$P$ 在圆内时取 $r^2 - h^2$，$P$ 在圆外时取 $h^2 - r^2 = PT^2$（$PT$ 为切线长）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (0.6,0);
  \coordinate (A) at (-1.6908,-1.0682);
  \coordinate (B) at (1.9051,0.6086);
  \draw[very thick] (A) -- (B);
  \draw[dashed] (O) -- (P);
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \fill (P) circle (1.4pt) node[below] {$P$};
  \node[below left] at (A) {$A$};
  \node[above right] at (B) {$B$};
  \node[above] at (0.32,0) {$h$};
\end{tikzpicture}
\end{document}
```

> 图 29-75A：$P$ 在 $\Gamma$ 内（$h < r$），过 $P$ 的一条一般割线交圆于 $A$、$B$，虚线 $OP = h$。
>
> 此时 $PA \cdot PB = r^2 - h^2$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (3.4,0);
  \coordinate (A) at (1.9265,0.5363);
  \coordinate (B) at (-1.1312,1.6491);
  \draw[very thick] (P) -- (B);
  \draw[dashed] (O) -- (P);
  \fill (O) circle (1.2pt) node[below right] {$O$};
  \fill (P) circle (1.4pt) node[below] {$P$};
  \node[below] at (A) {$A$};
  \node[above left] at (B) {$B$};
  \node[above] at (1.7,0) {$h$};
\end{tikzpicture}
\end{document}
```

> 图 29-75B：$P$ 在 $\Gamma$ 外（$h > r$），过 $P$ 的一条一般割线交圆于 $A$、$B$（$A$ 较近），虚线 $OP = h$。
>
> 此时 $PA \cdot PB = h^2 - r^2$，恰等于切线长的平方。

````

````ad-proof
title: 证明 | Proof

设 $\Gamma = C(O, r)$，$P$ 为一点，记 $OP = h$。
过 $P$ 任作一条割线，与 $\Gamma$ 交于 $A$、$B$ 两点。
设 $M$ 为弦 $AB$ 的中点，连接 $OM$ 与 $OA$。

由「圆心至弦的垂线平分该弦」（§29.1.1），$OM \perp AB$，故 $\triangle OMP$ 与 $\triangle OMA$ 都是直角三角形（$P$、$M$ 都在直线 $AB$ 上）。
由毕氏定理，

$$OM^2 + MP^2 = OP^2 = h^2, \qquad OM^2 + MA^2 = OA^2 = r^2,$$

两式相减，公共的 $OM^2$ 消去，得

$$MA^2 - MP^2 = r^2 - h^2. \qquad (\ast)$$

**$P$ 在圆内**（$h < r$）时，$P$ 落在弦 $AB$ 之内，故 $PA = MA + MP$、$PB = MA - MP$，如图 29-76A 所示。
代入 $(\ast)$ 的左端，

$$PA \cdot PB = (MA + MP)(MA - MP) = MA^2 - MP^2 = r^2 - h^2.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (0.6,0);
  \coordinate (A) at (-1.6908,-1.0682);
  \coordinate (B) at (1.9051,0.6086);
  \coordinate (M) at (0.1072,-0.2298);
  \draw[very thick] (A) -- (B);
  \draw[dashed] (O) -- (M) (O) -- (P) (O) -- (A);
  \draw (0.0226,-0.0485) -- (0.2039,0.036) -- (0.2885,-0.1453);
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \fill (P) circle (1.4pt) node[below] {$P$};
  \fill (M) circle (1.2pt) node[below right] {$M$};
  \node[below left] at (A) {$A$};
  \node[above right] at (B) {$B$};
  \node[above] at (0.3,0) {$h$};
\end{tikzpicture}
\end{document}
```

> 图 29-76A：$P$ 在圆内（$h<r$）的证明图。
>
> $M$ 是弦 $AB$ 的中点，$OM \perp AB$（$M$ 处为直角）；虚线 $OP = h$、$OA = r$，两个直角三角形 $\triangle OMP$ 与 $\triangle OMA$ 共用直角边 $OM$。

**$P$ 在圆外**（$h > r$）时，$A$、$B$ 在 $P$ 的同一侧且 $A$ 较近，故 $PA = MP - MA$、$PB = MP + MA$，如图 29-76B 所示。
代入 $(\ast)$ 的左端，

$$PA \cdot PB = (MP - MA)(MP + MA) = MP^2 - MA^2 = h^2 - r^2.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (O) at (0,0);
  \draw (O) circle (2);
  \coordinate (P) at (3.4,0);
  \coordinate (A) at (1.9265,0.5363);
  \coordinate (B) at (-1.1312,1.6491);
  \coordinate (M) at (0.3977,1.0927);
  \draw[very thick] (P) -- (B);
  \draw[dashed] (O) -- (M) (O) -- (P) (O) -- (A);
  \draw (0.3293,0.9048) -- (0.5173,0.8364) -- (0.5856,1.0243);
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \fill (P) circle (1.4pt) node[right] {$P$};
  \fill (M) circle (1.2pt) node[above] {$M$};
  \node[below] at (A) {$A$};
  \node[above left] at (B) {$B$};
  \node[above] at (1.7,0) {$h$};
\end{tikzpicture}
\end{document}
```

> 图 29-76B：$P$ 在圆外（$h>r$）的证明图。
>
> 构型与图 29-76A 全同，只是 $P$ 移到形外：$A$、$B$ 同在 $P$ 一侧，$PA = MP - MA$、$PB = MP + MA$。

两个表达式都只含 $r$ 与 $h$，与割线的方向无关。
$P$ 在圆外时取割线为切线的极限（$A$、$B$ 合并为切点 $T$），即得 $PT^2 = h^2 - r^2$，与上一定理的 $PT^2 = PA \cdot PB$ 相容。

````

````ad-def
title: 定义（点对圆的幂） | Definition（Power of a Point）

点 $P$ 对圆 $\Gamma = C(O, r)$ 的**幂**定义为

$$\mathrm{Pow}_\Gamma(P) = OP^2 - r^2.$$

$P$ 在圆外时幂为正，等于切线长的平方；$P$ 在圆上时幂为 $0$；$P$ 在圆内时幂为负，其绝对值即过 $P$ 的弦被 $P$ 分成的两段之积。上面三条定理可合成一句话：**过 $P$ 的任一条割线，被圆截出的两段之积（取绝对值）恒等于 $\lvert \mathrm{Pow}_\Gamma(P) \rvert$。**

> 名称中的「幂」取「平方」之义：圆外情形下该幂恰为切线长的二次幂。
````

在坐标系里，$OP^2 = (x_0 - h)^2 + (y_0 - k)^2$，故这个幂与切线长都能用坐标算出来，见 §31.2.3 的推论（切线长的坐标式）。

````ad-example
title: 示例（圆幂的两问） | Example（Two Uses of the Power of a Point）

圆内一点 $P$ 把过它的弦 $AB$ 分成 $PA = 3\,\text{cm}$、$PB = 8\,\text{cm}$。另一条过 $P$ 的弦 $CD$ 全长 $11\,\text{cm}$。求：
(a) $PC$ 与 $PD$；
(b) 若改自圆外一点 $Q$ 引切线 $QT$（$QT = 6\,\text{cm}$）与割线 $QAB$（$QA = 4\,\text{cm}$），求 $AB$。

---

(a) 由相交弦定理，$PC \cdot PD = PA \cdot PB = 3 \times 8 = 24$。
又 $P$ 在弦 $CD$ 之内，故 $PC + PD = CD = 11$。设 $PC = x$，则 $PD = 11 - x$，

$$x(11 - x) = 24 \implies x^2 - 11x + 24 = 0 \implies (x - 3)(x - 8) = 0,$$

解得 $x = 3$ 或 $x = 8$。故 $\{PC, PD\} = \{3\,\text{cm}, 8\,\text{cm}\}$，即这条弦与 $AB$ 的分割相同，只是两端互换。
(b) 由切割线定理，$QT^2 = QA \cdot QB$，即

$$36 = 4 \times QB \implies QB = 9\,\text{cm},$$

故 $AB = QB - QA = 9 - 4 = 5\,\text{cm}$（$A$ 为较近的交点，三点在割线上依次为 $Q$、$A$、$B$）。

> 本例说明圆幂定理的两种典型用途：圆内给出「一段求另一段」，圆外把切线长与割线段互相换算。
````

## 29.3　三角形的四心（Four Centres of a Triangle）

> **本节难度上限**：T B ｜ C C- ｜ E C+ ｜ Q C+

### 29.3.1　三角形的特殊线段与两条等距性质（Special Segments and Two Equidistance Properties）

重心、外心、内心、垂心并称三角形的「四心」。四心的定义都建立在四条特殊线段上：中线、高、角平分线、边的垂直平分线。四心的差别只在用的是哪一条线，而每条线各配一条等距性质；性质记牢，四心的结论便不必死背。四心与角锥顶点在底面上投影的对应关系见 §32.3.2（[[Chapter 32 立体几何 (II)|立体几何 (II)]]）。

````ad-def
title: 定义（三角形的中线、高、角平分线与边的垂直平分线） | Definition（Median, Altitude, Angle Bisector and Perpendicular Bisector of a Triangle）

设 $ABC$ 为三角形。

- **中线（Median）**：连接一个顶点与对边中点的线段。$\triangle ABC$ 有三条中线。
- **高（Altitude）**：从一个顶点向对边所在的直线作垂线，顶点与垂足之间的线段称为该边上的高；垂足到顶点的距离即 §8.6 意义下点到直线的距离。$\triangle ABC$ 有三条高。
- **角平分线（Angle Bisector）**：一个内角的平分线与该角对边相交，顶点与交点之间的线段称为该角的角平分线。$\triangle ABC$ 有三条角平分线。
- **边的垂直平分线（Perpendicular Bisector of a Side）**：过某边中点且垂直于该边的直线。$\triangle ABC$ 有三条，它们是直线而非线段（三类线段的落点比较如图 29-77 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,2.2) -- (-2.6,0) -- (1.8,0) -- cycle;
\draw[very thick] (0,2.2) -- (0,0);
\draw (0.2,0) -- (0.2,0.2) -- (0,0.2);
\fill (0,2.2) circle (1.2pt) node[above] {$A$};
\fill (-2.6,0) circle (1.2pt) node[below left] {$B$};
\fill (1.8,0) circle (1.2pt) node[below right] {$C$};
\fill (0,0) circle (1.2pt) node[below] {$H$};
\node[below] at (-0.4,-0.75) {$(a)$};
\begin{scope}[xshift=5.3cm]
\draw (0,2.2) -- (-2.6,0) -- (1.8,0) -- cycle;
\draw[very thick] (0,2.2) -- (-0.4,0);
\draw (-1.55,-0.09) -- (-1.47,0.09);
\draw (0.65,-0.09) -- (0.73,0.09);
\fill (0,2.2) circle (1.2pt) node[above] {$A$};
\fill (-2.6,0) circle (1.2pt) node[below left] {$B$};
\fill (1.8,0) circle (1.2pt) node[below right] {$C$};
\fill (-0.4,0) circle (1.2pt) node[below] {$M$};
\node[below] at (0.1,-0.75) {$(b)$};
\end{scope}
\begin{scope}[xshift=10.6cm]
\draw (0,2.2) -- (-2.6,0) -- (1.8,0) -- cycle;
\draw[very thick] (0,2.2) -- (-0.2,0);
\draw (-0.344,1.909) arc (220.2:264.65:0.45);
\draw (-0.042,1.752) arc (264.65:309.1:0.45);
\draw (-0.1761,1.8632) -- (-0.2409,1.7392);
\draw (0.1105,1.8364) -- (0.1512,1.7025);
\fill (0,2.2) circle (1.2pt) node[above] {$A$};
\fill (-2.6,0) circle (1.2pt) node[below left] {$B$};
\fill (1.8,0) circle (1.2pt) node[below right] {$C$};
\fill (-0.2,0) circle (1.2pt) node[below] {$P$};
\node[below] at (-0.2,-0.75) {$(c)$};
\end{scope}
\end{tikzpicture}
\end{document}
```

> 图 29-77：自同一顶点 $A$ 引出的三条线段。
>
> (a) 高 $AH$，$H$ 为垂足；
>
> (b) 中线 $AM$，$M$ 为 $BC$ 的中点（$BM$、$MC$ 各有一划）；
>
> (c) 角平分线 $AP$，$\angle BAP = \angle PAC$（两弧各有一划）。
>
> 三点 $H$、$M$、$P$ 一般互不相同。
````

````ad-note
title: 注记（高可能落在三角形外部） | Note（An Altitude May Fall Outside the Triangle）

钝角三角形中，夹钝角的两边上的高，其垂足落在对边的延长线上，因而高在三角形之外；钝角顶点上的高仍在内部。作图时须先把两条边延长，再从对面的顶点作垂线（如图 29-78 所示）。直角三角形的三条高有两条与直角边重合，垂足就是直角顶点。
「三线共点」因此不能只画锐角三角形就下结论：钝角三角形的三条高所在直线仍然共点，只是交点跑到了三角形外面（见 §29.3.3）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) -- (4,0) -- (-1.2,1.2) -- cycle;
\draw[dotted] (4,0) -- (-1.2,0);
\draw[dotted] (-1.2,1.2) -- (2,-2);
\draw[dashed] (-1.2,1.2) -- (-1.2,0);
\draw[dashed] (4,0) -- (2,-2);
\draw[dashed] (0,0) -- (0.202,0.876);
\fill (0,0) circle (1.2pt) node[above left] {$A$};
\fill (4,0) circle (1.2pt) node[below right] {$B$};
\fill (-1.2,1.2) circle (1.2pt) node[above left] {$C$};
\fill (-1.2,0) circle (1.2pt) node[below left] {$H_1$};
\fill (2,-2) circle (1.2pt) node[below right] {$H_2$};
\fill (0.202,0.876) circle (1.2pt) node[above right] {$H_3$};
\end{tikzpicture}
\end{document}
```

> 图 29-78：$\angle BAC$ 为钝角。
>
> 三条高 $CH_1$、$BH_2$、$AH_3$ 中，$H_1$、$H_2$ 落在边的延长线上（点线为延长线）。
>
> 只有 $AH_3$ 在三角形内部。
````

两条等距性质是四心一切论证的支点。第一条关于角平分线，第二条已在 §29.1.1 建立。

````ad-lem
title: 引理（角平分线上的点到两边等距） | Lemma（A Point on an Angle Bisector is Equidistant from the Arms）

若一点在角的平分线上，则该点到角的两边等距，如图 29-79 所示；反之，角的内部到两边等距的点在该角的平分线上。

```tikz
\begin{document}
\begin{tikzpicture}[scale=2]
  \coordinate (O) at (0,0);
  \coordinate (X) at (0:3);
  \coordinate (Y) at (80:3);
  \coordinate (Q) at (1.3023,0);
  \coordinate (R) at (0.2261,1.2825);
  \coordinate (P) at (40:1.7);
  \draw (O) -- (X);
  \draw (O) -- (Y);
  \draw (O) -- (P);
  \draw (P) -- (Q);
  \draw (P) -- (R);
  \draw (O) ++(40:0.5) arc (40:0:0.5);
  \draw (O) ++(40:0.5) arc (40:80:0.5);
  \node at (20:0.78) {$\theta$};
  \node at (60:0.78) {$\theta$};
  \draw (1.3023,0.16) -- (1.1423,0.16) -- (1.1423,0);
  \draw (0.3837,1.2547) -- (0.3559,1.0971) -- (0.1984,1.1249);
  \fill (O) circle (1.2pt) node[below left] {$O$};
  \fill (P) circle (1.4pt) node[above right] {$P$};
  \fill (Q) circle (1.2pt) node[below right] {$Q$};
  \fill (R) circle (1.2pt) node[above left] {$R$};
  \node[below left] at (X) {$X$};
  \node[above left] at (Y) {$Y$};
\end{tikzpicture}
\end{document}
```

> 图 29-79：点 $P$ 在 $\angle XOY$ 的平分线上，$PQ \perp OX$、$PR \perp OY$，则 $PQ = PR$。
````

````ad-proof
title: 证明 | Proof

设 $OP$ 平分 $\angle XOY$，$P$ 为该平分线上一点。

自 $P$ 向两边作垂线，垂足依次为 $Q$、$R$（$PQ \perp OX$、$PR \perp OY$），则 $PQ$、$PR$ 就是 $P$ 到两边的距离，如图 29-80A。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw[->] (0,0) -- (4.6,0) node[below right] {$X$};
\draw[->] (0,0) -- (3.87,3.32) node[above right] {$Y$};
\draw (0,0) -- (3.65,1.35);
\draw[dashed] (3.19,1.18) -- (3.19,0) (3.19,1.18) -- (2.42,2.08);
\draw (3.0,0) -- (3.0,0.19) -- (3.19,0.19);
\fill (0,0) circle (1.2pt) node[below left] {$O$};
\fill (3.19,1.18) circle (1.2pt) node[right] {$P$};
\fill (3.19,0) circle (1.2pt) node[below] {$Q$};
\fill (2.42,2.08) circle (1.2pt) node[above left] {$R$};
\node at (1.15,0.13) {$\alpha$};
\node at (0.98,0.62) {$\alpha$};
\end{tikzpicture}
\end{document}
```

> 图 29-80A：$P$ 在 $\angle XOY$ 的平分线上，$PQ$、$PR$ 为两条垂线段。
>
> $\triangle OPQ \cong \triangle OPR$（AAS），故 $PQ = PR$。

在 $\triangle OPQ$ 与 $\triangle OPR$ 中，$\angle OQP = \angle ORP = 90^\circ$，$\angle QOP = \angle POR$（$OP$ 为角平分线），$OP$ 为公共边。

两角及一角的对边对应相等，由 AAS 得 $\triangle OPQ \cong \triangle OPR$，故 $PQ = PR$。

反之，设 $P$ 在 $\angle XOY$ 的内部，两垂足为 $Q$、$R$，且 $PQ = PR$。

在直角三角形 $OPQ$ 与 $OPR$ 中，斜边 $OP$ 公共、直角边 $PQ = PR$，由 RHS 得 $\triangle OPQ \cong \triangle OPR$，故 $\angle QOP = \angle POR$，即 $OP$ 平分 $\angle XOY$，如图 29-80B 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (O) at (0,0);
\coordinate (X) at (3.4,0);
\coordinate (Y) at (1.905,2.819);
\coordinate (P) at (2.207,1.174);
\coordinate (Q) at (2.207,0);
\coordinate (R) at (1.234,1.829);
\draw (O) -- (X) node[below right] {$X$};
\draw (O) -- (Y) node[above right] {$Y$};
\draw[very thick] (O) -- (P);
\draw[dashed] (P) -- (Q) (P) -- (R);
\draw (2.207,0.24) -- (1.967,0.24) -- (1.967,0);
\draw (1.4166,1.706) -- (1.2936,1.5239) -- (1.111,1.6468);
\draw (2.087,0.587) -- (2.327,0.587);
\draw (1.654,1.402) -- (1.788,1.601);
\fill (O) circle (1.2pt) node[below left] {$O$};
\fill (P) circle (1.3pt) node[above right] {$P$};
\fill (Q) circle (1.2pt) node[below right] {$Q$};
\fill (R) circle (1.2pt) node[above left] {$R$};
\end{tikzpicture}
\end{document}
```

> 图 29-80B：$P$ 在角的内部且 $PQ = PR$（单撇），斜边 $OP$ 公共，由 RHS 得 $\triangle OPQ \cong \triangle OPR$，故 $OP$ 平分 $\angle XOY$。
````

> 两条等距性质成对使用：角平分线管「到**边**等距」，垂直平分线管「到**端点**等距」（§29.1.1）。下面两个心，正是把这两条各用三次。

### 29.3.2　内心与外心（Incentre and Circumcentre）

````ad-thm
title: 定理（三条角平分线共点，且到三边等距） | Theorem（The Angle Bisectors are Concurrent and Equidistant from the Sides）

三角形的三条角平分线交于一点，该点到三边等距，如图 29-81 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (0.60,2.60);
  \coordinate (B) at (-1.80,0);
  \coordinate (C) at (2.20,0);
  \coordinate (I) at (0.44,0.98);
  \coordinate (P) at (0.44,0);
  \coordinate (Q) at (1.28,1.50);
  \coordinate (R) at (-0.28,1.65);
  \draw[very thick] (A) -- (B) -- (C) -- cycle;
  \draw[gray!70] (I) -- (A) (I) -- (B) (I) -- (C);
  \draw[dashed] (I) -- (P) (I) -- (Q) (I) -- (R);
  \draw (I) circle (0.982);
  \draw (0.44,0.15) -- (0.59,0.15) -- (0.59,0);
  \draw (-0.1702,1.5478) -- (-0.0683,1.6579) -- (-0.1781,1.76);
  \draw (1.1525,1.421) -- (1.2309,1.2932) -- (1.3584,1.3721);
  \fill (I) circle (1.3pt) node[below right] {$I$};
  \node[above] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[below left] at (P) {$P$};
  \node[above right] at (Q) {$Q$};
  \node[above left] at (R) {$R$};
  \node[left] at (0.44,0.49) {$r$};
\end{tikzpicture}
\end{document}
```

> 图 29-81：三条角平分线交于一点 $I$；
>
> $I$ 到三边的垂线段 $IP = IQ = IR = r$，即以 $I$ 为圆心、$r$ 为半径的圆与三边都相切。
````

````ad-proof
title: 证明 | Proof

设 $\angle B$ 与 $\angle C$ 的平分线交于 $I$，如图 29-82 所示。

这样的交点存在：由内角和定理（§8.2），$\angle B + \angle C < 180^\circ$，两条平分线与 $BC$ 所成的两个半角之和 $\dfrac{\angle B + \angle C}{2} < 90^\circ$，故它们在三角形内部相交。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0.168,0.823) circle (0.823);
\draw (0.3,2.3) -- (-1.55,0) -- (1.55,0) -- cycle;
\draw[gray!60] (0.3,2.3) -- (0.094,0) (-1.55,0) -- (0.91,1.178) (1.55,0) -- (-0.546,1.248);
\draw[dashed] (0.168,0.823) -- (0.168,0) (0.168,0.823) -- (0.888,1.219) (0.168,0.823) -- (-0.473,1.339);
\draw (0.35,0.02) -- (0.35,0.19) -- (0.17,0.19);
\fill (0.168,0.823) circle (1.3pt) node[below right] {$I$};
\node[above] at (0.3,2.3) {$A$};
\node[below left] at (-1.55,0) {$B$};
\node[below right] at (1.55,0) {$C$};
\node[below left] at (0.168,0) {$P$};
\node[above right] at (0.888,1.219) {$Q$};
\node[above left] at (-0.473,1.339) {$R$};
\node[left] at (0.1,0.45) {$r$};
\end{tikzpicture}
\end{document}
```

> 图 29-82：三条角平分线共点于 $I$；
>
> $IP = IQ = IR = r$，以内切圆（实线圆）与三边相切。
>
> 灰色线为三条角平分线，虚线为三条垂线段。

自 $I$ 向三边作垂线，垂足依次为 $P$（在 $BC$ 上）、$Q$（在 $CA$ 上）、$R$（在 $AB$ 上）。

$I$ 在 $\angle B$ 的平分线上，由角平分线的等距性质，$IR = IP$；

$I$ 在 $\angle C$ 的平分线上，同理 $IP = IQ$。
故

$$IR = IP = IQ,$$

即 $I$ 到三边等距。
再由该性质的逆，$I$ 在 $\angle A$ 的平分线上。
于是三条角平分线共点于 $I$，公共距离 $IP$ 记作 $r$；

以 $I$ 为圆心、$r$ 为半径的圆与三边各恰有一个公共点（§29.2.1「直线与圆的位置关系」中 $d = r$ 的情形），即三边都是该圆的切线。

````

````ad-def
title: 定义（内心与内切圆） | Definition（Incentre and Incircle）

由上面的定理，三角形的三条角平分线交于一点，且该点到三边等距。这个交点称为**内心**（Incentre），记作 $I$（如图 29-83 所示）。以 $I$ 为圆心、以 $I$ 到任一边的距离为半径的圆称为三角形的**内切圆**（Inscribed Circle / Incircle），它与三边都相切。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-0.4,2.3);
\coordinate (B) at (-2.2,-1.1);
\coordinate (C) at (2.4,-1.1);
\coordinate (I) at (-0.179,0.117);
\coordinate (X) at (-0.179,-1.1);
\coordinate (Y) at (0.761,0.891);
\coordinate (Z) at (-1.254,0.686);
\draw (I) circle (1.217);
\draw (A) -- (B) -- (C) -- cycle;
\draw[dashed] (A) -- (I) (B) -- (I) (C) -- (I);
\draw[dashed] (I) -- (X) (I) -- (Y) (I) -- (Z);
\draw (-0.179,-0.86) -- (0.061,-0.86) -- (0.061,-1.1);
\fill (I) circle (1.4pt) node[above right] {$I$};
\node[above] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-83：三条角平分线交于 $I$；
>
> $I$ 到三边的垂线段（虚线）都是内切圆的半径 $r$，圆与三边各切于一点。
````

````ad-thm
title: 定理（三边垂直平分线共点，且到三顶点等距） | Theorem（The Perpendicular Bisectors are Concurrent and Equidistant from the Vertices）

三角形三边的垂直平分线交于一点，该点到三个顶点等距，如图 29-84 所示；这一点正是外接圆的圆心。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-1.6,2.3);
  \coordinate (B) at (-1.2,0);
  \coordinate (C) at (2.2,0);
  \coordinate (O) at (0.5,1.4804);
  \coordinate (M) at (-1.4,1.15);
  \coordinate (N) at (0.3,1.15);
  \coordinate (K) at (0.5,0);
  \draw[very thick] (A) -- (B) -- (C) -- cycle;
  \draw[gray!70] (-2.6315,0.9358) -- (-0.1685,1.3642);
  \draw[gray!70] (-0.3473,0.0806) -- (0.9473,2.2194);
  \draw[gray!70] (0.5,-1.25) -- (0.5,1.25);
  \draw[dashed] (O) -- (A) (O) -- (B) (O) -- (C);
  \draw[dashed] (O) circle (2.2543);
  \draw (-1.2424,1.1774) -- (-1.2698,1.335) -- (-1.4274,1.3076);
  \draw (0.3828,1.2869) -- (0.5197,1.204) -- (0.4369,1.0672);
  \draw (0.5,0.16) -- (0.34,0.16) -- (0.34,0);
  \fill (O) circle (1.3pt) node[below right] {$O$};
  \node[above left] at (A) {$A$};
  \node[left] at (B) {$B$};
  \node[below right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-84：三边的垂直平分线交于一点 $O$；
>
> $O$ 到三顶点等距，虚线圆是以 $O$ 为圆心、$OA = OB = OC$ 为半径的外接圆。
````

````ad-proof
title: 证明 | Proof

设 $AB$ 的垂直平分线与 $BC$ 的垂直平分线交于 $O$（§29.1.1「过三点的圆」的证明已说明这两条直线必相交）。

$O$ 在 $AB$ 的垂直平分线上，由垂直平分线的等距性质，$OA = OB$；

$O$ 在 $BC$ 的垂直平分线上，同理 $OB = OC$。
故

$$OA = OB = OC,$$

即 $O$ 到三顶点等距（如图 29-85 所示）。
于是 $O$ 也在 $CA$ 的垂直平分线上（到 $C$、$A$ 等距），三条垂直平分线共点。

以 $O$ 为圆心、$OA$ 为半径的圆同时经过 $A$、$B$、$C$，即为外接圆。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (0.2,2.5);
\coordinate (B) at (-2.6,-1);
\coordinate (C) at (2.4,-1);
\coordinate (O) at (-0.1,-0.13);
\coordinate (M) at (-0.1,-1);
\draw[black!35] (O) circle (2.639);
\draw (A) -- (B) -- (C) -- cycle;
\draw[dashed] (M) -- (-0.1,1.05);
\draw[dashed] (-1.904,1.313) -- (0.603,-0.693);
\draw[dashed] (1.936,1.149) -- (-0.736,-0.529);
\draw (0.14,-1) -- (0.14,-0.86) -- (0,-0.86);
\draw (-1.062,0.922) -- (-0.89,0.785) -- (-1.028,0.612);
\draw (1.417,0.564) -- (1.23,0.447) -- (1.113,0.633);
\fill (O) circle (1.4pt) node[above right] {$O$};
\node[above] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-85：三条虚线是三边的垂直平分线（直角记号画在各边中点处），两两之交同为 $O$；
>
> $OA = OB = OC$，故虚线圆过三个顶点。
````

````ad-def
title: 定义（外心与外接圆） | Definition（Circumcentre and Circumcircle）

由上面的定理，三角形三条边的垂直平分线交于一点，且该点到三顶点等距。这个交点称为**外心**（Circumcentre），记作 $O$（如图 29-86 所示）。以 $O$ 为圆心、$OA$ 为半径的圆经过三个顶点，称为三角形的**外接圆**（Circumscribed Circle / Circumcircle），其半径记作 $R$。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-0.4,2.3);
\coordinate (B) at (-2.2,-1.1);
\coordinate (C) at (2.4,-1.1);
\coordinate (O) at (0.1,-0.141);
\draw[black!40] (O) circle (2.492);
\draw (A) -- (B) -- (C) -- cycle;
\draw[dashed] (O) -- (A) (O) -- (B) (O) -- (C);
\fill (O) circle (1.4pt) node[below right] {$O$};
\node[above] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-86：外接圆的圆心即外心 $O$，三条虚线半径 $OA = OB = OC$ 都等于 $R$。
````

> 本定理与 §29.1.1「过三点的圆」是同一件事的两面：那里由三点造圆，这里由三边找圆心。两者互相呼应，也说明「外接圆存在而且唯一」。

````ad-thm
title: 定理（外心的位置） | Theorem（Where the Circumcentre Lies）

锐角三角形的外心在三角形内部；直角三角形的外心在斜边的中点；钝角三角形的外心在三角形外部。三种情形如图 29-87 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \begin{scope}[shift={(0,0)}]
    \draw (0,0) circle (1.3);
    \draw (1.3,0) -- (-0.4446,1.2216) -- (-0.8356,-0.9959) -- cycle;
    \draw[dashed] (0,0) -- (1.3,0) (0,0) -- (-0.4446,1.2216) (0,0) -- (-0.8356,-0.9959);
    %
    \fill (0,0) circle (1.2pt) node[below right] {$O$};
    \node[right] at (1.30,0) {$A$};
    \node[above left] at (-0.445,1.221) {$B$};
    \node[below left] at (-0.836,-0.996) {$C$};
    \node[below] at (0,-1.9) {$(a)$};
  \end{scope}
  \begin{scope}[shift={(3.9,-0.45)}]
    \draw (0,0) circle (1.3);
    \draw (-1.30,0) -- (1.30,0) -- (0.66,1.12) -- cycle;
    \draw[dashed] (0,0) -- (-1.30,0) (0,0) -- (1.30,0) (0,0) -- (0.66,1.12);
    \draw[black] (0.4864,1.0208) -- (0.5856,0.8471) -- (0.7592,0.9464);
    \fill (0,0) circle (1.2pt) node[below right] {$O$};
    \node[below left] at (-1.30,0) {$A$};
    \node[below right] at (1.30,0) {$B$};
    \node[above] at (0.66,1.12) {$C$};
    \node[below] at (0,-1.9) {$(b)$};
  \end{scope}
  \begin{scope}[shift={(7.8,-0.25)}]
    \draw (0,0) circle (1.3);
    \draw (1.30,0) -- (0.65,1.13) -- (-1.13,0.65) -- cycle;
    \draw[dashed] (0,0) -- (1.30,0) (0,0) -- (0.65,1.13) (0,0) -- (-1.13,0.65);
    %
    \fill (0,0) circle (1.2pt) node[below right] {$O$};
    \node[right] at (1.30,0) {$A$};
    \node[left] at (0.65,1.13) {$B$};
    \node[above] at (-1.13,0.65) {$C$};
    \node[below] at (0,-1.9) {$(c)$};
  \end{scope}
\end{tikzpicture}
\end{document}
```

> 图 29-87：外心的三种位置：(a) 锐角三角形在内部；
>
> (b) 直角三角形在斜边中点；
>
> (c) 钝角三角形在外部。
````

外心位置的判别只要求会判断，下面的论证属扩展阅读。要点是把「外心与某顶点是否在对应边的同侧」翻译成「该角是否为锐角」。

````ad-proof
title: 证明 | Proof

先看一条边 $BC$。

弦 $BC$ 把圆面分成两个弓形，含圆心 $O$ 的那个弓形较大，所对的弧为优弧。

顶点 $A$ 与 $O$ 在直线 $BC$ 的同侧（如图 29-88 所示），当且仅当 $A$ 落在含 $O$ 的那个弓形内，当且仅当 $\angle BAC$ 所对（不含 $A$）的弧 $\widehat{BC}$ 为劣弧。

由圆心角定理，$\angle BAC$ 等于该弧所对圆心角的一半，于是

$$\angle BAC < 90^\circ \iff \text{弧 } \widehat{BC} \text{ 为劣弧} \iff A \text{ 与 } O \text{ 在 } BC \text{ 同侧}.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0,0) circle (1.6);
\draw (60:1.6) -- (175:1.6) -- (285:1.6) -- cycle;
\fill (0,0) circle (1.4pt) node[right] {$O$};
\node[above right] at (60:1.6) {$A$};
\node[above left] at (175:1.6) {$B$};
\node[below right] at (285:1.6) {$C$};
\node[below] at (0,-2.05) {$(a)$};
\begin{scope}[xshift=4.4cm]
\draw (0,0) circle (1.6);
\draw (60:1.6) -- (240:1.6) -- (330:1.6) -- cycle;
\fill (0,0) circle (1.4pt) node[above left] {$O$};
\node[above right] at (60:1.6) {$A$};
\node[below left] at (240:1.6) {$B$};
\node[below right] at (330:1.6) {$C$};
\node[below] at (0,-2.05) {$(b)$};
\end{scope}
\begin{scope}[xshift=8.8cm]
\draw (0,0) circle (1.6);
\draw (0:1.6) -- (25:1.6) -- (140:1.6) -- cycle;
\fill (0,0) circle (1.4pt) node[below right] {$O$};
\node[right] at (0:1.6) {$A$};
\node[above right] at (25:1.6) {$B$};
\node[above left] at (140:1.6) {$C$};
\node[below] at (0,-2.05) {$(c)$};
\end{scope}
\end{tikzpicture}
\end{document}
```

> 图 29-88：外心的三种位置。
>
> (a) 锐角三角形，$O$ 在内部；
>
> (b) 直角三角形（$\angle C = 90^\circ$），$O$ 为斜边 $AB$ 的中点；
>
> (c) 钝角三角形（钝角在 $B$），$O$ 在外部。

点 $O$ 在三角形内部，当且仅当 $O$ 与 $A$ 在 $BC$ 同侧、与 $B$ 在 $CA$ 同侧、与 $C$ 在 $AB$ 同侧。

由上式，这三个条件就是 $\angle A$、$\angle B$、$\angle C$ 全为锐角。
故锐角三角形的外心在内部，钝角或直角三角形的外心不在内部。

若 $\angle A = 90^\circ$，由 §29.1.2「直角圆周角所对的弦是直径」，$BC$ 为外接圆的直径，圆心即 $BC$ 的中点，落在三角形的边上。

若 $\angle A > 90^\circ$，则 $A$ 与 $O$ 分居 $BC$ 两侧，$O$ 在三角形之外。

````

````ad-cor
title: 推论（直角三角形的外接圆半径） | Corollary（Circumradius of a Right-Angled Triangle）

直角三角形的外接圆半径等于斜边的一半，如图 29-89 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (-2,0);
  \coordinate (B) at (0.5,0);
  \coordinate (C) at (-2,2.5);
  \coordinate (O) at (-0.75,1.25);
  \draw (O) circle (1.7678);
  \draw[very thick] (A) -- (B) -- (C) -- cycle;
  \draw[dashed] (O) -- (A) (O) -- (C);
  \draw (A) -- ++(0.25,0) -- ++(0,0.25) -- ++(-0.25,0);
  \fill (O) circle (1.2pt) node[above left] {$O$};
  \node[below left] at (A) {$A$};
  \node[right] at (B) {$B$};
  \node[left] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-89：直角三角形中 $BC$ 是外接圆的直径，外心 $O$ 为斜边 $BC$ 的中点，故 $R = OB = OC = \dfrac{BC}{2}$。
````

````ad-proof
title: 证明 | Proof

设 $\angle BAC = 90^\circ$，斜边为 $BC$。

由上定理，外心为 $BC$ 的中点 $O$（如图 29-90 所示），故

$$R = OB = \dfrac{BC}{2}.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw[black!35] (0,0) circle (1.8);
\coordinate (O) at (0,0);
\coordinate (B) at (-1.8,0);
\coordinate (C) at (1.8,0);
\coordinate (A) at (130:1.8);
\draw[very thick] (B) -- (C);
\draw (A) -- (B) (A) -- (C);
\draw (-1.267,1.143) -- (-1.031,1.033) -- (-0.921,1.269);
\draw[dashed] (O) -- (A);
\fill (O) circle (1.4pt) node[below left] {$O$};
\node[above left] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-90：$\angle BAC = 90^\circ$ 时 $BC$ 就是外接圆的直径，外心 $O$ 即 $BC$ 的中点，故 $R = OB = \dfrac{BC}{2}$。
````

````ad-note
title: 注记（用三边判断外心位置） | Note（Deciding from the Three Sides）

设 $BC$ 为最长边，$\theta$ 为它所对的角 $\angle BAC$。以 $BC$ 为直径作圆，由 §29.1.2 的两条推论：顶点在圆上时 $\theta = 90^\circ$；顶点在圆内时 $\theta > 90^\circ$（把角的边延长至与圆周相交，再用外角定理比较即得）；顶点在圆外时 $\theta < 90^\circ$。
把「顶点到 $BC$ 中点的距离与 $\dfrac{BC}{2}$ 比较」翻译成边的平方。设 $AD$ 为 $BC$ 上的高，$BD = x$、$DC = y$、$AD = h$。因 $BC$ 为最长边，$\angle B$、$\angle C$ 皆锐，垂足 $D$ 落在 $BC$ 之内，故 $x + y = BC$。由毕氏定理，

$$CA^2 + AB^2 - BC^2 = (h^2 + y^2) + (h^2 + x^2) - (x + y)^2 = 2(h^2 - xy),$$

再取 $M$ 为 $BC$ 的中点，则 $MD = \left| x - \dfrac{BC}{2} \right|$，且 $MA^2 = MD^2 + AD^2$，于是

$$MA < \dfrac{BC}{2} \iff h^2 + \left(x - \dfrac{BC}{2}\right)^2 < \dfrac{BC^2}{4} \iff h^2 < x(BC - x) = xy \iff CA^2 + AB^2 < BC^2.$$

三条链起来，即得实用的判别法：

$$CA^2 + AB^2 = BC^2 \iff \theta = 90^\circ, \qquad CA^2 + AB^2 < BC^2 \iff \theta > 90^\circ, \qquad CA^2 + AB^2 > BC^2 \iff \theta < 90^\circ.$$

第一条就是 §8.5 毕氏定理的逆定理，这里把钝、锐两种情形一并补齐。
````

内切圆给出一条把面积、周长与半径连起来的实用公式。

````ad-thm
title: 定理（内切圆半径与面积） | Theorem（Incircle Radius and Area）

设三角形的面积为 $a$、周长为 $p$、内切圆半径为 $r$，则
（如图 29-91 所示）

$$pr = 2a.$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (0.60,2.60);
  \coordinate (B) at (-1.80,0);
  \coordinate (C) at (2.20,0);
  \coordinate (I) at (0.44,0.98);
  \coordinate (P) at (0.44,0);
  \coordinate (Q) at (1.28,1.50);
  \coordinate (R) at (-0.28,1.65);
  \fill[blue, opacity=0.18] (I) -- (B) -- (C) -- cycle;
  \fill[red, opacity=0.18] (I) -- (C) -- (A) -- cycle;
  \fill[green, opacity=0.18] (I) -- (A) -- (B) -- cycle;
  \draw[very thick] (A) -- (B) -- (C) -- cycle;
  \draw[dashed] (I) -- (A) (I) -- (B) (I) -- (C);
  \draw (I) circle (0.982);
  \draw[dashed] (I) -- (P) (I) -- (Q) (I) -- (R);
  \draw (0.44,0.15) -- (0.59,0.15) -- (0.59,0);
  \draw (-0.1702,1.5478) -- (-0.0683,1.6579) -- (-0.1781,1.76);
  \draw (1.1525,1.421) -- (1.2309,1.2932) -- (1.3584,1.3721);
  \fill (I) circle (1.3pt) node[above right] {$I$};
  \node[above] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[left] at (0.44,0.49) {$r$};
\end{tikzpicture}
\end{document}
```

> 图 29-91：内切圆切三边，圆心为 $I$、半径为 $r$；
>
> 连接 $I$ 与三顶点，$\triangle ABC$ 分成三个高为 $r$ 的小三角形。

````

````ad-proof
title: 证明 | Proof

内心 $I$ 在三角形内部，连接 $IA$、$IB$、$IC$，把 $\triangle ABC$ 分成三个子三角形 $\triangle IBC$、$\triangle ICA$、$\triangle IAB$，如图 29-92 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\fill[blue, opacity=0.18] (0.168,0.823) -- (-1.55,0) -- (1.55,0) -- cycle;
\fill[red, opacity=0.18] (0.168,0.823) -- (1.55,0) -- (0.3,2.3) -- cycle;
\fill[green, opacity=0.18] (0.168,0.823) -- (0.3,2.3) -- (-1.55,0) -- cycle;
\draw (0.3,2.3) -- (-1.55,0) -- (1.55,0) -- cycle;
\draw[dashed] (0.168,0.823) -- (0.168,0);
\draw (0.168,0.823) circle (0.823);
\fill (0.168,0.823) circle (1.3pt) node[right] {$I$};
\node[above] at (0.3,2.3) {$A$};
\node[below left] at (-1.55,0) {$B$};
\node[below right] at (1.55,0) {$C$};
\node[below] at (0,0) {$BC$};
\node[right] at (0.95,1.1) {$CA$};
\node[left] at (-0.62,1.15) {$AB$};
\node[right] at (0.168,0.4) {$r$};
\end{tikzpicture}
\end{document}
```

> 图 29-92：$\triangle ABC$ 被分成三块（蓝、红、绿），三块的高都是内切圆半径 $r$，底依次为 $BC$、$CA$、$AB$。

$I$ 到三边的距离都是 $r$，故以三边为底时，三个子三角形的高都是 $r$：

$$a = \dfrac{1}{2}BC \cdot r + \dfrac{1}{2}CA \cdot r + \dfrac{1}{2}AB \cdot r = \dfrac{1}{2}(AB + BC + CA)r = \dfrac{1}{2}pr,$$
````

> 外接圆半径 $R$ 也能由三边求出（三边之积除以四倍面积），但其推导要用到后续章节的正弦定理，本章不预支；求 $R$ 目前最可靠的路线仍是「找斜边」或「找垂直平分线的交点」。

````ad-example
title: 示例（直角三角形的内切圆半径与外接圆半径） | Example（Inradius and Circumradius of a Right-Angled Triangle）

直角三角形的两条直角边为 $6\,\text{cm}$、$8\,\text{cm}$。求其内切圆半径 $r$ 与外接圆半径 $R$（如图 29-93 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (C) at (0,0);
\coordinate (B) at (2.4,0);
\coordinate (A) at (0,1.8);
\coordinate (I) at (0.6,0.6);
\coordinate (O) at (1.2,0.9);
\draw[black!40] (O) circle (1.5);
\draw (I) circle (0.6);
\draw (A) -- (B) -- (C) -- cycle;
\draw[dashed] (O) -- (A) (O) -- (B) (O) -- (C);
\draw (0.16,0) -- (0.16,0.16) -- (0,0.16);
\node[left] at (0,0.9) {$6$};
\node[below] at (1.2,0) {$8$};
\node[above right] at (1.78,0.6) {$10$};
\fill (I) circle (1.3pt) node[below left] {$I$};
\fill (O) circle (1.3pt) node[above right] {$O$};
\node[above] at (A) {$A$};
\node[below right] at (B) {$B$};
\node[below left] at (C) {$C$};
\end{tikzpicture}
\end{document}
```

> 图 29-93：同一直角三角形上的内切圆（圆心 $I$、半径 $r$）与外接圆（圆心 $O$ 在斜边中点、半径 $R$）。
>
> 三边标号 $6$、$8$、$10$ 以厘米为单位。

---

斜边 $= \sqrt{6^2 + 8^2} = 10\,\text{cm}$（毕氏定理，§8.5）。
**内切圆半径。** 面积 $a = \dfrac{1}{2} \times 6 \times 8 = 24\,\text{cm}^2$，周长 $p = 6 + 8 + 10 = 24\,\text{cm}$。由 $pr = 2a$，

$$r = \dfrac{2a}{p} = \dfrac{2 \times 24}{24} = 2\,\text{cm}.$$

**外接圆半径。** 直角三角形的外心在斜边中点，故

$$R = \dfrac{10}{2} = 5\,\text{cm}.$$

> 直角三角形的内切圆半径另有一条快捷公式：两直角边为 $x$、$y$、斜边为 $z$ 时 $r = \dfrac{x + y - z}{2}$。本例给出 $\dfrac{6 + 8 - 10}{2} = 2$，与上面一致。此式由 $pr = 2a$ 与 $a = \dfrac{1}{2}xy$ 化简可得，宜用于验算。
````

````ad-example
title: 示例（判断外心的位置） | Example（Deciding Where the Circumcentre Lies）

三角形的三边长依次为 $5\,\text{cm}$、$6\,\text{cm}$、$9\,\text{cm}$。判断其外心在三角形内部、边上还是外部（如图 29-94 所示）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (-0.214,1.1);
\coordinate (B) at (-1.575,0);
\coordinate (C) at (1.575,0);
\coordinate (O) at (0,-0.556);
\draw[black!40] (O) circle (1.67);
\draw (A) -- (B) -- (C) -- cycle;
\draw[dashed] (O) -- (A) (O) -- (B) (O) -- (C);
\node[above] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\fill (O) circle (1.4pt) node[below right] {$O$};
\node[left] at (-1.2,0.62) {$5$};
\node[right] at (0.85,0.5) {$6$};
\node[below] at (-0.7,-0.05) {$9$};
\end{tikzpicture}
\end{document}
```

> 图 29-94：最长边 $9$ 所对的 $\angle A$ 为钝角，外心 $O$ 落在三角形之外（在 $BC$ 的另一侧）。
>
> 三边标号以厘米为单位。

---

最长边为 $9\,\text{cm}$，只需判断它所对的角 $\theta$。比较平方：

$$5^2 + 6^2 = 25 + 36 = 61, \qquad 9^2 = 81.$$

因 $61 < 81$，即两短边的平方和小于最长边的平方，$\theta$ 为钝角（§29.3.2 注记的判别法）。
由「外心的位置」定理，钝角三角形的外心在三角形**外部**。

> 同一数据的对照：若第三边改为 $\sqrt{61} \approx 7.81\,\text{cm}$，则 $\theta = 90^\circ$，外心在该边中点；若第三边为 $7\,\text{cm}$，则 $25 + 36 > 49$，三角皆锐，外心在内部。
````

### 29.3.3　重心与垂心（Centroid and Orthocentre）

初中阶段只要求「认识」三条中线共点、三条高共点，不要求证明（初中学习重点 24.3）。本节在已建立的圆理论与相似工具之上，把这两件事证出来；证明本身属扩展阅读，结论则必须记牢。

````ad-thm
title: 定理（三条中线共点，且按 $2:1$ 分割） | Theorem（The Medians are Concurrent and Divide Each Other in the Ratio $2:1$）

三角形的三条中线交于一点，该点把每条中线分成 $2:1$ 两段，其中靠顶点的一段较长：

$$AG : GM_a = BG : GM_b = CG : GM_c = 2 : 1,$$

（如图 29-95 所示）
其中 $M_a$、$M_b$、$M_c$ 依次为边 $BC$、$CA$、$AB$ 的中点。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (0.60,2.60);
  \coordinate (B) at (-1.80,0);
  \coordinate (C) at (2.20,0);
  \coordinate (Ma) at (0.20,0);
  \coordinate (Mb) at (1.40,1.30);
  \coordinate (Mc) at (-0.60,1.30);
  \coordinate (G) at (0.33,0.87);
  \draw (A) -- (B) -- (C) -- cycle;
  \draw[very thick] (A) -- (Ma);
  \draw[dashed] (B) -- (Mb) (C) -- (Mc);
  \draw[green!55!black, very thick] (A) -- (G);
  \draw[green!55!black, very thick] (G) -- (Ma);
  \fill (G) circle (1.4pt) node[right] {$G$};
  \node[above] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[below left] at (Ma) {$M_a$};
  \node[above right] at (Mb) {$M_b$};
  \node[above left] at (Mc) {$M_c$};
\end{tikzpicture}
\end{document}
```

> 图 29-95：三条中线 $AM_a$、$BM_b$、$CM_c$ 交于一点 $G$，且 $AG : GM_a = BG : GM_b = CG : GM_c = 2 : 1$。

````

````ad-proof
title: 证明 | Proof

先取两条中线 $AM_a$ 与 $BM_b$，设其交点为 $G$，如图 29-96。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (0.5,3.4);
\coordinate (B) at (-3.4,-1);
\coordinate (C) at (3.6,-1.4);
\coordinate (Ma) at (0.1,-1.2);
\coordinate (Mb) at (2.05,1);
\coordinate (Mc) at (-1.45,1.2);
\coordinate (G) at (0.233,0.333);
\draw (A) -- (B) -- (C) -- cycle;
\draw (A) -- (Ma);
\draw (B) -- (Mb);
\draw (C) -- (Mc);
\draw[dashed] (Ma) -- (Mb);
\fill (A) circle (1.2pt) node[above] {$A$};
\fill (B) circle (1.2pt) node[below left] {$B$};
\fill (C) circle (1.2pt) node[below right] {$C$};
\fill (G) circle (1.5pt) node[above right] {$G$};
\node[below] at (Ma) {$M_a$};
\node[right] at (Mb) {$M_b$};
\node[above left] at (Mc) {$M_c$};
\end{tikzpicture}
\end{document}
```

> 图 29-96：三条中线共点于 $G$；
>
> 虚线 $M_aM_b$ 为 $\triangle ABC$ 的中位线，$\triangle GM_aM_b \sim \triangle GAB$，相似比 $1:2$。

连接 $M_aM_b$。

在 $\triangle ABC$ 中，$M_a$、$M_b$ 分别为 $BC$、$CA$ 的中点，由中点定理（§8.6），

$$M_aM_b \parallel AB \qquad \text{且} \qquad M_aM_b = \dfrac{1}{2}AB.$$

因 $M_aM_b \parallel AB$，以 $AM_a$ 为截线得 $\angle GM_aM_b = \angle GAB$（内错角），以 $BM_b$ 为截线得 $\angle GM_bM_a = \angle GBA$（内错角）。
故 $\triangle GM_aM_b$ 与 $\triangle GAB$ 三角对应相等，由 AA 相似：

$$\triangle GM_aM_b \sim \triangle GAB, \qquad \text{相似比} = M_aM_b : AB = 1 : 2.$$

对应边成比例，得

$$AG = 2\,GM_a, \qquad BG = 2\,GM_b,$$

即 $AG : GM_a = 2 : 1$、$BG : GM_b = 2 : 1$。

剩下说明第三条中线 $CM_c$ 也经过 $G$。

设 $CM_c$ 与 $AM_a$ 交于 $G'$。

把上面已证的结论用于中线对 $CM_c$ 与 $AM_a$：在 $\triangle ABC$ 中，$M_cM_a$ 是连接 $AB$、$BC$ 中点的中位线，$M_cM_a \parallel AC$ 且 $M_cM_a = \dfrac{1}{2}AC$，完全同样的论证给出 $AG' = 2\,G'M_a$，即 $G'$ 把 $AM_a$ 分成 $2:1$。
而线段 $AM_a$ 上满足 $AX = 2\,XM_a$ 的点只有一个（该式即 $AX = \dfrac{2}{3}AM_a$），故 $G' = G$。

三条中线共点于 $G$，且 $CG : GM_c = 2 : 1$ 同样成立（对中线对 $BM_b$、$CM_c$ 重复上述论证）。

````

````ad-def
title: 定义（重心） | Definition（Centroid）

由上面的定理，三角形的三条中线交于一点。这个交点称为**重心**（Centroid），记作 $G$。
````

> 重心是均匀薄板的质心：把三角形纸板顶在指尖上，恰好平衡之点就是重心。物理上的「重心」与几何上的「形心」重合，这一事实要等到力学中用杠杆原理才证得，此处只作名称由来的说明。

````ad-thm
title: 定理（三条高共点） | Theorem（The Three Altitudes are Concurrent）

任意三角形的三条高所在直线交于一点，如图 29-97 所示；该交点落在锐角三角形内部、直角三角形的直角顶点上、钝角三角形外部。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
  \coordinate (A) at (1.10,2.40);
  \coordinate (B) at (-1.70,0);
  \coordinate (C) at (1.90,0);
  \coordinate (H) at (1.1,0.9333);
  \coordinate (H1) at (1.10,0);
  \coordinate (H2) at (1.54,1.08);
  \coordinate (H3) at (0.38,1.78);
  \coordinate (Ap) at (-0.90,-2.40);
  \coordinate (Bp) at (4.70,2.40);
  \coordinate (Cp) at (-2.50,2.40);
  \draw[gray, dashed] (-0.63,-2.17) -- (4.43,2.17);
  \draw[gray, dashed] (4.35,2.40) -- (-2.15,2.40);
  \draw[gray, dashed] (-2.39,2.07) -- (-1.01,-2.07);
  \draw[very thick] (A) -- (B) -- (C) -- cycle;
  \draw[very thick] (A) -- (H);
  \draw[very thick] (B) -- (H);
  \draw[very thick] (C) -- (H);
  \draw[gray!70] (1.10,0.18) -- (1.10,0.09) -- (1.01,0) -- (0.92,0);
  \draw[gray!70] (1.37,1.02) -- (1.45,1.05) -- (1.57,0.99) -- (1.60,0.91);
  \draw[gray!70] (0.49,1.64) -- (0.43,1.71) -- (0.44,1.84) -- (0.51,1.90);
  \fill (H) circle (1.4pt) node[above right] {$H$};
  \node[above] at (A) {$A$};
  \node[below left] at (B) {$B$};
  \node[below right] at (C) {$C$};
  \node[above left] at (Ap) {$A'$};
  \node[above right] at (Bp) {$B'$};
  \node[right] at (Cp) {$C'$};
\end{tikzpicture}
\end{document}
```

> 图 29-97：三条高 $AH_1$、$BH_2$、$CH_3$ 交于一点 $H$；
>
> 以原三角形为 medial triangle 的 $\triangle A'B'C'$（灰色虚线）中，三条高恰为其三边的垂直平分线。
````

````ad-proof
title: 证明 | Proof

**共点性。** 过 $A$、$B$、$C$ 分别作对边的平行线：过 $A$ 作 $\ell_A \parallel BC$、过 $B$ 作 $\ell_B \parallel CA$、过 $C$ 作 $\ell_C \parallel AB$。

三条直线两两相交，记

$$A' = \ell_B \cap \ell_C, \qquad B' = \ell_C \cap \ell_A, \qquad C' = \ell_A \cap \ell_B,$$

得 $\triangle A'B'C'$，如图 29-98 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw[gray!60,dashed] (5,3) -- (-3,3) -- (3,-3) -- cycle;
\draw (0,0) -- (4,0) -- (1,3) -- cycle;
\draw[very thick] (0,0) -- (2,2);
\draw[very thick] (4,0) -- (0.4,1.2);
\draw[very thick] (1,3) -- (1,0);
\fill (0,0) circle (1.2pt) node[below left] {$A$};
\fill (4,0) circle (1.2pt) node[below right] {$B$};
\fill (1,3) circle (1.2pt) node[above] {$C$};
\fill (1,1) circle (1.5pt) node[below right] {$H$};
\node[right] at (5,3) {$A'$};
\node[left] at (-3,3) {$B'$};
\node[right] at (3,-3) {$C'$};
\draw (1.1,0) -- (1.1,0.18) -- (0.92,0.18);
\end{tikzpicture}
\end{document}
```

> 图 29-98：过三顶点作对边的平行线得 $\triangle A'B'C'$（灰虚线），$A$、$B$、$C$ 为其三边中点。
>
> $\triangle ABC$ 的三条高（粗线）恰为 $\triangle A'B'C'$ 的三条垂直平分线，故共点于 $H$，即 $\triangle A'B'C'$ 的外心。

先说明 $A$、$B$、$C$ 依次为 $\triangle A'B'C'$ 三边的中点。

看点 $B'$：$B'$ 在 $\ell_A$ 上，故 $AB' \parallel BC$；

$B'$ 又在 $\ell_C$ 上，故 $CB' \parallel AB$。
于是四边形 $AB'CB$ 的两组对边分别平行，是平行四边形（§8.8），故 $AB' = BC$。
同理，$C'$ 在 $\ell_A$ 与 $\ell_B$ 上，四边形 $BC'AC$ 为平行四边形，故 $AC' = BC$。

点 $B'$、$C'$ 都在过 $A$ 且平行于 $BC$ 的直线 $\ell_A$ 上，且分居 $A$ 的两侧（因 $\triangle ABC$ 在直线 $\ell_A$ 的另一侧），而 $AB' = AC' = BC$，故 $A$ 为 $B'C'$ 的中点。
同理 $B$ 为 $A'C'$ 的中点、$C$ 为 $A'B'$ 的中点。

再看高与垂直平分线的关系。

$\triangle ABC$ 中 $A$ 处的高垂直于 $BC$，而 $B'C' \parallel BC$，故该高垂直于 $B'C'$；
又它过 $B'C'$ 的中点 $A$，所以它就是边 $B'C'$ 的垂直平分线。
同理，$B$ 处、$C$ 处的高分别是 $A'C'$、$A'B'$ 的垂直平分线。

由「三边垂直平分线共点」定理，$\triangle A'B'C'$ 的三条垂直平分线共点（交点即 $\triangle A'B'C'$ 的外心），故 $\triangle ABC$ 的三条高也共点。

**位置。** 直角三角形中，夹直角的两条边本身就是两条高（直角边互相垂直），它们交于直角顶点，第三条高也过该点，故垂心为直角顶点。

钝角三角形的两条高落在形外（§29.3.1 注记、图 29-78），其交点亦在形外。

锐角三角形的三条高都在形内，交点亦在形内。

````

````ad-def
title: 定义（垂心） | Definition（Orthocentre）

由上面的定理，三角形三条高所在的直线交于一点。这个交点称为**垂心**（Orthocentre），记作 $H$。
````

````ad-example
title: 示例（重心与中线长度） | Example（The Centroid and the Length of a Median）

$\triangle ABC$ 中，$D$ 为 $BC$ 的中点，$AD = 6\,\text{cm}$、$BC = 6\,\text{cm}$，且 $AD \perp BC$（如图 29-99 所示）。设 $G$ 为重心。求：

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\coordinate (A) at (0,2.4);
\coordinate (B) at (-1.2,0);
\coordinate (C) at (1.2,0);
\coordinate (D) at (0,0);
\coordinate (G) at (0,0.8);
\draw (A) -- (B) -- (C) -- cycle;
\draw[very thick] (A) -- (D);
\draw[dashed] (B) -- (0.6,1.2) (C) -- (-0.6,1.2);
\draw (0.14,0) -- (0.14,0.14) -- (0,0.14);
\draw (-0.6,0.12) -- (-0.6,-0.12) (0.6,0.12) -- (0.6,-0.12);
\node[above] at (A) {$A$};
\node[below left] at (B) {$B$};
\node[below right] at (C) {$C$};
\node[below right] at (D) {$D$};
\fill (G) circle (1.5pt) node[right] {$G$};
\node[left] at (0,1.6) {$2$};
\node[left] at (0,0.4) {$1$};
\end{tikzpicture}
\end{document}
```

> 图 29-99：$AD$ 既是中线也是高（$AD \perp BC$，$BD = DC$ 以单撇标出）；
>
> 三条中线（粗线 $AD$ 与两条虚线）交于重心 $G$，$AG$ 与 $GD$ 之比为 $2:1$。

(a) $GD$ 与 $AG$；
(b) $\triangle ABC$ 的面积；
(c) $GA + GB + GC$。

---

(a) 因 $D$ 为 $BC$ 的中点，$AD$ 是中线。重心把中线分成 $2:1$（靠顶点一段较长），故

$$AG = \dfrac{2}{3}AD = 4\,\text{cm}, \qquad GD = \dfrac{1}{3}AD = 2\,\text{cm}.$$

(b) 以 $BC$ 为底，$AD$ 为该底上的高（$AD \perp BC$），故

$$a = \dfrac{1}{2} \times 6 \times 6 = 18\,\text{cm}^2.$$

(c) $BD = DC = 3\,\text{cm}$。在直角三角形 $GDB$ 中（$\angle GDB = 90^\circ$），

$$GB = GC = \sqrt{GD^2 + BD^2} = \sqrt{2^2 + 3^2} = \sqrt{13}\,\text{cm}.$$

又 $GA = 4\,\text{cm}$，故

$$GA + GB + GC = 4 + 2\sqrt{13}\,\text{cm}.$$
````

````ad-example
title: 示例（垂心给出的角） | Example（An Angle at the Orthocentre）

$\triangle ABC$ 为锐角三角形，$AD$、$BE$、$CF$ 为三条高，交点为垂心 $H$。求证 $\angle BHC = 180^\circ - \angle BAC$，并求 $\angle BAC = 70^\circ$ 时 $\angle BHC$ 的度数。

---

在四边形 $AFHE$ 中，$F$ 在 $AB$ 上、$E$ 在 $AC$ 上，如图 29-100 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\fill[green, opacity=0.18] (0,3.5) -- (-0.642,2.601) -- (0,2.143) -- (0.671,2.718) -- cycle;
\draw (0,3.5) -- (-2.5,0) -- (3,0) -- cycle;
\draw (0,3.5) -- (0,0);
\draw (-2.5,0) -- (0.671,2.718);
\draw (3,0) -- (-0.642,2.601);
\fill (0,3.5) circle (1.2pt) node[above] {$A$};
\fill (-2.5,0) circle (1.2pt) node[below left] {$B$};
\fill (3,0) circle (1.2pt) node[below right] {$C$};
\fill (0,2.143) circle (1.5pt) node[right] {$H$};
\fill (0,0) circle (1.2pt) node[below left] {$D$};
\fill (0.671,2.718) circle (1.2pt) node[right] {$E$};
\fill (-0.642,2.601) circle (1.2pt) node[left] {$F$};
\fill (-0.642,2.601) circle (1.2pt) node[left] {$F$};
\end{tikzpicture}
\end{document}
```

> 图 29-100：三条高共点于 $H$。
>
> 绿色四边形 $AFHE$ 的两个直角给出 $\angle FHE = 180^\circ - \angle BAC$，而 $\angle BHC$ 与 $\angle FHE$ 为对顶角。

$\angle AFH = 90^\circ$（$CF \perp AB$，$H$ 在 $CF$ 上）、$\angle AEH = 90^\circ$（$BE \perp AC$，$H$ 在 $BE$ 上）。四边形内角和为 $360^\circ$（§8.3），故

$$\angle FHE = 360^\circ - 90^\circ - 90^\circ - \angle BAC = 180^\circ - \angle BAC.$$

因三角形为锐角三角形，垂心 $H$ 落在三条高的内部线段上，故 $B$、$H$、$E$ 共线且 $C$、$H$、$F$ 共线，$\angle BHC$ 与 $\angle EHF$ 为对顶角，

$$\angle BHC = \angle FHE = 180^\circ - \angle BAC.$$

代入 $\angle BAC = 70^\circ$，得 $\angle BHC = 110^\circ$。

> 另一条路：四边形 $AFHE$ 中 $\angle AFH + \angle AEH = 180^\circ$，即一对对角互补，由对角互补判别法知 $A$、$F$、$H$、$E$ 四点共圆；于是 $\angle FHE = 180^\circ - \angle FAE = 180^\circ - \angle BAC$ 也可直接由内接四边形读出。「高线加四点共圆」是 DSE 演绎题里常见的搭配。
````

### 29.3.4　四心的比较（Comparison of the Four Centres）

四心的构造线不同，等距的对象也就不同。下表把全节的结论并置，供解题时快速检索；同一三角形中四心的位置对比如图 29-101 所示。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
\draw (0.25,0.25) circle (2.761);
\draw[gray!50] (0.25,0.25) -- (0,3) (0.25,0.25) -- (-2.5,0) (0.25,0.25) -- (3,0);
\draw[dashed] (0.081,1.209) circle (1.209);
\draw (0,3) -- (-2.5,0) -- (3,0) -- cycle;
\draw[gray!50] (0,3) -- (0.25,0);
\draw[gray!50] (0,3) -- (0,0);
\fill (0.25,0.25) circle (1.4pt) node[above right] {$O$};
\fill (0.081,1.209) circle (1.4pt) node[left] {$I$};
\fill (0.167,1) circle (1.4pt) node[right] {$G$};
\fill (0,2.5) circle (1.4pt) node[left] {$H$};
\node[above] at (0,3) {$A$};
\node[below left] at (-2.5,0) {$B$};
\node[below right] at (3,0) {$C$};
\node[below left] at (-0.03,-0.03) {$D$};
\node[below right] at (0.3,-0.03) {$M$};
\end{tikzpicture}
\end{document}
```

> 图 29-101：同一锐角三角形中的四个心。
>
> 外接圆过三顶点（圆心 $O$），内切圆切三边（圆心 $I$），$G$ 在中线 $AM$ 上且 $AG = 2GM$，$H$ 在高 $AD$ 上。
>
> 四心一般不重合，只有等边三角形时四心合一。

| | **重心 $G$** | **外心 $O$** | **内心 $I$** | **垂心 $H$** |
|:---|:---|:---|:---|:---|
| 构造线 | 三条中线 | 三边垂直平分线 | 三内角平分线 | 三条高 |
| 等距对象 | 无（截距成比例） | 三**顶点**：$OA = OB = OC = R$ | 三**边**：$d = r$ | 无（提供垂直关系） |
| 关联圆 | 无 | 外接圆 | 内切圆 | 无 |
| 关键数量 | $AG : GM_a = 2 : 1$ | 斜边中点（直角时） | $pr = 2a$ | 垂心角 $= 180^\circ -$ 对应顶角 |
| 位置 | 恒在内部 | 锐角内、直角边上、钝角外 | 恒在内部 | 锐角内、直角顶点、钝角外 |

````ad-note
title: 注记（外心与内心最容易混淆） | Note（Circumcentre versus Incentre）

两个心的名字只差一个字，等距对象正好相反：**外**心配外**接**圆，圆过顶点，故到**顶点**等距；**内**心配内**切**圆，圆切边，故到**边**等距。判断该用哪一个时，看题目的圆与三角形是「过点」还是「切线」：过点用外心（垂直平分线），切线用内心（角平分线）。
另需注意：外心可以跑到三角形外面，内心与重心永远在内部。

````

````ad-example
title: 示例（内心角与外心角） | Example（Angles at the Incentre and at the Circumcentre）

$\triangle ABC$ 为锐角三角形，$I$ 为内心、$O$ 为外心，$\angle BAC = 70^\circ$（如图 29-101 所示）。求：
(a) $\angle BIC$；
(b) $\angle BOC$。

---

(a) $BI$、$CI$ 分别平分 $\angle B$、$\angle C$，故

$$\angle IBC + \angle ICB = \dfrac{\angle B + \angle C}{2} = \dfrac{180^\circ - \angle BAC}{2} = \dfrac{180^\circ - 70^\circ}{2} = 55^\circ.$$

在 $\triangle BIC$ 中，

$$\angle BIC = 180^\circ - 55^\circ = 125^\circ = 90^\circ + \dfrac{\angle BAC}{2}.$$

(b) $O$ 为外心，故 $A$、$B$、$C$ 在外接圆上，$\angle BAC$ 为圆周角、$\angle BOC$ 为同弧 $\widehat{BC}$（不含 $A$ 的一段）所对的圆心角。由圆心角定理，

$$\angle BOC = 2\angle BAC = 140^\circ.$$

> 两问的公式性质不同：(b) 的 $\angle BOC = 2\angle A$ 只在 $\angle A$ 为锐角（即 $O$ 与 $A$ 在 $BC$ 同侧）时成立，$\angle A$ 为钝角时应取 $360^\circ - 2\angle A$；(a) 的 $\angle BIC = 90^\circ + \dfrac{\angle A}{2}$ 对任意三角形都成立，因为内心恒在内部。
````

> 等边三角形的三线重合，四心合一，这一点在 §8.7 的「三线合一」处已露端倪。反过来，若一个三角形的内心与外心重合，则该三角形必为等边三角形。

## 29.4　小结（Summary）

````ad-note
title: 注记（本章主线与易错点） | Note（Main Threads and Common Pitfalls）

**五条主线：**

1. **弦、弧与弦心距（§29.1.1）**：三者由圆心角串在一起。等弦 $\iff$ 等弧 $\iff$ 等圆心角 $\iff$ 等弦心距，四个「等」互相推导，工具只是全等（SSS、SAS、RHS）与毕氏定理。圆心到弦的垂线、弦的中点、弦的垂直平分线、圆心，这四者的关系反复互用；「过三点的圆存在而且唯一」把圆与三角形连了起来。
2. **圆上的角（§29.1.2）**：圆心角定理 $\angle AOB = 2\angle APB$ 是全章枢纽，同弓形角相等、半圆上的角是直角、直角所对的弦是直径、弧与圆周角成正比，四条推论都由它一步得出。圆心相对圆周角的位置与所对弧的优劣合起来构成四种情形，逐一证完，证明才算完整。
3. **内接四边形与四点共圆（§29.1.3）**：性质与判别是一互一逆的两组。性质是「共圆 $\implies$ 角的关系」（对角互补、外角等于内对角）；判别是「角的关系 $\implies$ 共圆」（同侧等角、对角互补、外角等于内对角）。三条判别法都用同一法：先作过三点的圆，再证第四点在圆上。
4. **切线（§29.2.1、§29.2.2）**：切线垂直于过切点的半径另有直接证法（切点即最近点），而「$d$ 与 $r$ 比较」的位置关系定理把相切、相交、相离统一起来：过半径外端的垂线是切线、过切点垂直切线的直线过圆心三条同时到位。外点两切线由 RHS 得对称性。弦切角定理把圆外的角搬进圆内，其逆定理又把「角相等」翻回「是切线」；圆幂定理（§29.2.3，扩展）用相似把两弦相交的长度关系统一起来。
5. **四心（§29.3）**：构造线决定一切。两条等距性质（角平分线到**边**等距、垂直平分线到**端点**等距）各用三次，就得到内心与外心；重心靠中点定理与相似；垂心靠「过顶点作对边平行线」把高转成外接圆的垂直平分线。四心的位置差异（可在形内、形外、形上）都源于此。

**易错点：**

- 把「弧与圆心角成正比」搬到**弦**上：圆心角加倍，弦不加倍（§29.1.1 警告框）。
- 顶点落在劣弧上时，所对的是优弧，圆心角要取**反角**；此时圆周角大于 $90^\circ$。
- 同弓形的圆周角**相等**，弦两侧的圆周角**互补**，两者别混。
- 弦切角要配对正确的内错弓形：角内部含哪段弧，就用另一段弧上的圆周角。
- 用切线判定时，「经过半径的外端」与「垂直于这条半径」两个条件缺一不可。
- 相交弦、切割线里的线段是**从交点量到两个交点**的两段，不是整条割线；圆外一点引切线时 $PT^2 = PA \cdot PB$，$PA$ 是短段、$PB$ 是长段。
- 外心到**顶点**等距、内心到**边**等距，二者相反；外心与垂心都可能跑到三角形外部。
- 判别法与性质定理的方向用反：写证明时先确认「已经共圆」还是「正要证共圆」。
- 两平行弦的距离题，同侧与异侧两解都要写。
````

### 方法总表

| 目标            | 已知条件                 | 方法                                          | 主要依据            |
| :------------ | :------------------- | :------------------------------------------ | :-------------- |
| 证两弦（两弧）相等     | 圆心角相等，或弦心距相等         | 全等三角形或毕氏定理                                  | §29.1.1         |
| 求弦心距、弦长       | 半径与弦（或弦心距）           | 垂线平分弦，构成直角三角形                               | §29.1.1         |
| 求圆周角          | 同弧的圆心角               | 圆心角定理 $\angle APB = \dfrac{1}{2}\angle AOB$ | §29.1.2         |
| 求同弧上另一顶点的角    | 顶点在同侧或异侧             | 同弓形角相等；两侧互补                                 | §29.1.2、§29.1.3 |
| 证直径或直角        | 圆周角 $90^\circ$，或弦为直径 | 半圆推论与其逆                                     | §29.1.2         |
| 证四点共圆         | 同侧等角／对角互补／外角等于内对角    | 同一法（作过三点的圆）                                 | §29.1.3         |
| 证两线垂直         | 切线与过切点的半径            | 切线性质定理                                      | §29.2.1         |
| 证切线           | 过圆上一点的直线             | 证该直线垂直于过该点的半径，或证 $d = r$，或用弦切角逆定理           | §29.2.1、§29.2.2 |
| 求切线长          | 外点与圆心距、半径            | 两切线全等（RHS）加毕氏定理                             | §29.2.1         |
| 求两弦相交的分段      | 一条弦的两段与另一弦全长         | 相交弦定理（AA 相似）                                | §29.2.3         |
| 求圆外割线段        | 切线长与割线一段             | 切割线定理 $PT^2 = PA \cdot PB$                  | §29.2.3         |
| 找三角形的外心、内心    | 三边或三角                | 分别作垂直平分线、角平分线                               | §29.3.2         |
| 求内切圆半径        | 面积 $a$ 与周长 $p$       | $r = \dfrac{2a}{p}$                         | §29.3.2         |
| 求外接圆半径（直角三角形） | 斜边 $a$               | $R = \dfrac{a}{2}$                          | §29.3.2         |
| 求重心分中线的比      | 中线长                  | $2:1$（靠顶点较长）                                | §29.3.3         |
| 用垂直关系解题       | 三条高、垂心               | 垂心与共高线形成的直角、四边形内角和                          | §29.3.3         |

回顾全章：圆的全部性质都只靠两件事推出来，一是**把圆上的图形还原成等腰三角形**（半径相等），二是**圆心角与圆周角的两倍关系**。有了这两件工具，等腰三角形、全等判定与相似（[[Chapter 8 平面几何 (I)|平面几何(I)]] 的老朋友）便足以撑起所有证明。下一章把视野从「已知图形找性质」转向「按条件找点」，即 §30 的轨迹：本章反复出现的「到圆心距离等于半径」正是轨迹语言的第一句话。

---

## 中英对照词汇表（Glossary）

| 中文术语 | 英文 | 符号或简写 | 备注 |
| --- | --- | --- | --- |
| 圆 | Circle | $C(O, r)$ | 到定点距离等于定长的点的集合 |
| 圆心 | Centre | $O$ |  |
| 半径 | Radius | $r$ |  |
| 直径 | Diameter | $d$ | $d = 2r$，圆中最长的弦 |
| 圆周 | Circumference |  | 周长 $2\pi r$，见 §8.9 |
| 等圆 | Equal Circles |  | 半径相等的两圆 |
| 弦 | Chord |  | 两端在圆周上的线段 |
| 弧 | Arc | $\widehat{AB}$ |  |
| 劣弧 | Minor Arc |  | 不超过半圆的弧 |
| 优弧 | Major Arc | $\widehat{ACB}$ | 超过半圆的弧 |
| 弓形 | Segment |  | 弦与所对弧围成 |
| 扇形 | Sector |  | 两半径与所截弧围成 |
| 弦心距 | Distance from Centre to Chord | $d$ | 圆心到弦的垂线段长 |
| 等弦截取等弧 | Equal Chords Cut Off Equal Arcs |  |  |
| 垂直平分线 | Perpendicular Bisector |  | 到线段两端点等距的点的集合 |
| 过三点的圆 | Circle through Three Points |  | 三点不共线时存在而且唯一 |
| 圆心角 | Angle at the Centre | $\angle AOB$ |  |
| 圆周角 | Angle at the Circumference | $\angle APB$ |  |
| 反角 | Reflex Angle |  | $180^\circ$ 至 $360^\circ$ 的角 |
| 圆心角定理 | Angle at the Centre Theorem | $\angle AOB = 2\angle APB$ |  |
| 同弓形内的圆周角 | Angles in the Same Segment |  | 顶点须在同侧 |
| 半圆内的圆周角 | Angle in a Semicircle | $90^\circ$ |  |
| 圆内接四边形 | Cyclic Quadrilateral |  | 四顶点共圆 |
| 外接圆 | Circumscribed Circle / Circumcircle | $R$ | 半径记作 $R$ |
| 对角互补 | Opposite Angles Supplementary | $\angle A + \angle C = 180^\circ$ |  |
| 四边形的外角与内对角 | Exterior Angle and Interior Opposite Angle | $\angle CBE$ 与 $\angle ADC$ | 先定义再用，见 §29.1.3 |
| 外角等于内对角 | Exterior Angle Equals Interior Opposite Angle | $\angle CBE = \angle ADC$ |  |
| 四点共圆 | Concyclic Points |  |  |
| 同侧等角判别法 | Concyclic Test by Equal Angles |  | 延伸内容 |
| 对角互补判别法 | Concyclic Test by Supplementary Angles |  | 延伸内容 |
| 同一法 | Method of Coincidence |  | 先作圆再证第四点在上 |
| 切线 | Tangent |  | 与圆恰有一个公共点 |
| 切点 | Point of Contact |  |  |
| 割线 | Secant |  | 与圆有两个公共点 |
| 弦切角 | Angle in the Alternate Segment |  | 延伸内容 |
| 内错弓形 | Alternate Segment |  |  |
| 外点两切线 | Two Tangents from an External Point | $PA = PB$ | 延伸内容 |
| 切线长 | Tangent Length | $PT$ | $PT^2 = OP^2 - r^2$ |
| 相交弦定理 | Intersecting Chords Theorem | $PA \cdot PB = PC \cdot PD$ | 超出常规课程要求 |
| 切割线定理 | Secant-Tangent Theorem | $PT^2 = PA \cdot PB$ | 超出常规课程要求 |
| 点对圆的幂 | Power of a Point | $\mathrm{Pow}_\Gamma(P)$ | $OP^2 - r^2$ |
| 中线 | Median |  | 顶点到对边中点 |
| 高 | Altitude |  | 顶点到对边所在直线的垂线段 |
| 角平分线 | Angle Bisector |  |  |
| 重心 | Centroid | $G$ | 三中线交点，$2:1$ |
| 外心 | Circumcentre | $O$ | 三垂直平分线交点，到顶点等距 |
| 内心 | Incentre | $I$ | 三角平分线交点，到边等距 |
| 内切圆 | Inscribed Circle / Incircle | $r$ | $pr = 2a$ |
| 垂心 | Orthocentre | $H$ | 三高交点 |
| 周长 | Perimeter | $p$ | $p = AB + BC + CA$ |
| 中位线 | Midline |  | 连接两边中点，见 §8.6 中点定理 |

## 备课提示（Teaching Notes）

1. **圆心角定理的证明四种情形都要讲。** 许多教科书只证「圆心在圆周角内部」便下结论，逻辑上不完整。建议课堂完整演示情况 1 与情况 2，情况 3、4 留作学生自行验证；四种情形共用的辅助线是直径 $PQ$，务必让学生亲手画过。

2. **四点共圆先性质后判别。** 教学顺序应先立内接四边形的性质（已知共圆时的便利工具），再引入判别法（证共圆的武器），学生才会明白「为什么要证四点共圆」：一旦共圆，圆的一切性质同时可用。三条判别法中，同侧等角在证明题里出场最多，对角互补在读题时最容易看出。

3. **弦切角是「视而不见」的重灾区，要刻意训练。** 建议按不同方位（切线在上、在下、在侧面）给出四五个变式图形，让学生每次先答三问：顶点在圆上吗？一边是切线吗？一边是弦吗？再配一道完整链条题（切线 $\to$ 弦切角 $\to$ 圆周角 $\to$ 对角互补 $\to$ 新的共圆结论），本章 §29.2.2 末的「切线平行于弦」示例即为此设计。

4. **倒角先用 $\alpha$、$\beta$ 标角，再列方程。** 本章综合题往往需要连续倒角。规范做法：把未知角标成 $\alpha$、$\beta$，用同弓形角、对角互补、弦切角建立等量关系，最后用三角形内角和或直线上的邻角（同为 $180^\circ$）封口。让学生把标好角的图交上来检查，比只看答案有效。

5. **四心以构造线带性质，不死背。** 让学生先熟练画四条线（中线、高、角平分线、垂直平分线），再从构造方式现场推导：角平分线 $\to$ 到两边等距 $\to$ 内心到三边等距；垂直平分线 $\to$ 到两端点等距 $\to$ 外心到三顶点等距。混淆外心与内心时，用一句话检测：「外心到哪个对象等距？」答「边」即已混淆。

6. **外心、垂心会跑到形外，务必配钝角图形。** 每个与四心有关的结论都要在锐角、直角、钝角三种三角形上各演示一次（图 29-88 已并列三幅）；作图训练时特别要求钝角三角形的高要先延长边。

7. **增润与超出常规课程的内容按板块定位处理。** §29.1.3 的四点共圆判别法、§29.2 的弦切角与外点切线属延伸内容，正文已自标；§29.2.3 圆幂定理、§29.3.3 重心与垂心的共点证明、「外心的位置」定理的证明均属超出 DSE 常规课程要求的扩展，课堂上可视学生能力取舍，不进入统一测验范围。

8. **与后续章节的接口。** 本章刻意不用「轨迹」语言（「到定点等距的点的集合」只在定义圆时以集合式出现一次），把轨迹的系统处理留给下一章；圆与直线的代数交点、圆方程留给 §31；圆内接四边形的面积公式、三角形的正弦定理与外接圆半径公式（三边之积除以四倍面积）留给后续含正弦定理的章节。

9. **动态几何软件可作探究起点。** 官方课程阐释建议本单元以动态几何软件让学生自行探索圆的性质再作证明。课堂可用软件拖动圆周上的点 $P$ 观察 $\angle APB$ 不变（同弓形角）、拖动弦 $AB$ 观察弦心距与弦长的关系，再把观察所得转写成演绎证明。

10. **常见漏解与答题规范。** 两平行弦的距离题两解都要写；证切线必须写明「经过半径的外端」与「垂直」两个条件；用弦切角定理时，若题目没有先证共圆或切线，不可默认某直线为切线；证明题中的每一步都要有依据（全等或相似判定、圆的定理编号写「定理名称」而非编号）。

---

✅ 已執行（2026-09-11）：落实三处批注。①章首全局批注（配图可嵌入任何数学环境、重审全部配图位置、证明过程与定理演示都要配图、证明中每一步分别配图、配图 scale = 1.5）：38 处 `\begin{tikzpicture}` 一律改 `[scale=1.5]`，全章填充由 `blue!12` 一类不透明淡色改为「纯色 + `opacity=0.18`」，原 38 幅图除 1 幅重绘外全部移入其说明对象所在的 ad 板块并贴到对应步骤之后，另按「每一到两步一幅」新增 37 幅（垂径定理 RHS 两三角形、中点连线垂直之平角、弦的垂直平分线过圆心、圆心角加倍之弦长对比、半圆内圆周角、直角圆周角所对弦为直径、弧与圆周角成正比、圆内接四边形与外接圆、对角互补之两段弧与圆心角、外角等于内对角、同侧等角与对角互补两条判别法之同一法构图、外角判别推论、切线与割线、点在圆内外、切线垂直半径与切线判定与过切点垂线过圆心、外点两切线 RHS、弦切角定理三情形与逆定理、相交弦与切割线与点幂定值之相似构图、角平分线等距之逆、三边垂直平分线共点、直角三角形外接圆半径、内心与外心之定义图、三则示例之构图），图号按题注出现顺序统一重编为图 29-1 至 29-63（含分幅 A/B，共 75 幅），正文引用与题注同步。②原图 29-8（垂直平分线等距引理）画错（$\ell$ 被画成斜线且 $P$、$Q$ 不在线上），已重绘并拆为正、逆两幅嵌进证明。③§29.3.2 记号依用户「写 pr=2a，a 是面积」改为：面积记 $a$、周长记 $p$、三边一律写 $AB$、$BC$、$CA$，公式 $pr = 2a$；定理陈述与证明、其后外接圆半径行、快捷公式、直角三角形示例、小结表、方法总表、词汇表、图内底边标号一并同步，相邻注记「用三边判断外心位置」的 $a,b,c$ 亦改为 $AB,BC,CA$。验证：正文 75 个 tikz 块本机 `pdflatex` 全部编译通过、`pdftotext -bbox-layout` 标签重叠 0 处、围栏配对 0 错、图内无中文、单块均 ≤40 行、图号连号且每题注在正文均有引用；本批只加配图与改记号，无新定理与新方法，§29.1／§29.2／§29.3 三节难度上限不变。

✅ 已執行（2026-09-16）：落实第二轮四条注释（配图位置与定理配图）。①位置纠正：以「如图 N-K 所示」引用句为锚逐幅复核全文图的相邻性，把 31 幅原本堆在板块末尾或落在引用句之前的图搬到其引用步骤之后；按情形分置的分幅家族图（图 29-18B、29-21A/B/C、29-36A）保持在各情形段落之后。判定口径已回写规范 4.5 第 13 条：图与锚句之间只容许隔一个空行与紧随其后的公式显示，行距超过 4 行、图在锚句之前或堆在板块末尾均属违规。②结论板块陈述配图：按用户批注「全文涉及几何的所有的定理也要同步配图」，给 30 个 ad-thm／ad-cor／ad-lem 陈述板块各补一幅陈述配图（等弦截取等弧、圆心至弦的垂线平分弦、圆心与弦中点连线垂直、垂直平分线等距引理及其过圆心推论、等弦与弦心距、过三点的圆、圆心角定理、直角圆周角所对的弦是直径、弧与圆周角成正比、内接四边形对角互补、外角等于内对角、同侧等角判别法、对角互补判别法、外角判别法、切线垂直于过切点半径、切线判定、过切点垂线过圆心、弦切角定理及其逆、切割线定理、点幂定值、角平分线等距引理、三条角平分线共点、三边垂直平分线共点、外心的位置、直角三角形外接圆半径、内切圆半径与面积、三条中线共点、三条高共点），题注均在正文以「如图」句引用。③图 29-4 按「建议将对应的全等三角形的边进行染色」改为同色对应边（红 $OA=OC$、蓝 $OB=OD$、绿 $AB=CD$），题注同步说明同色对应。④图号按题注出现顺序统一重编为图 29-1 至 29-93（共 105 幅，含分幅 A/B/C），正文引用同步。⑤验证：105 个 tikz 块本机 pdflatex 全部编译通过、pdftotext -bbox-layout 标签重叠 0 处、围栏配对 0 错、注解符号零残留、每题注均有正文引用、100/105 幅图与引用句行距 ≤4（余 5 幅为按情形分置的分幅家族图，其锚句为家族引言句）。规范侧同步：4.5 第 13 条改写为「配图嵌放与『跟着那一步走』」并加判定口径，新增第 15 条「结论板块自带陈述配图（对应元素同色）」。
✅ 已執行（2026-09-16）：第三轮——全章配图几何关系逐幅核查与修正。方法：把 105 个 tikz 块逐块喂 pdflatex 编译，再用脚本解析每幅图的坐标（极坐标按「角度:半径」换算），对题注与正文声明的每一条关系做实算复核——点在圆上比 |XP| 与半径、垂直用点积、平行用叉积、中点与比例、角弧反推圆心与张角、标签落在哪个角内、直角小方块两边是否平行于该直角两边、等长划落在那条线上；16 组子代理分块核查，本人另独立复算其中 12 幅。结果：25 幅存在几何关系层面的硬伤，17 幅属标记方向、标签落点或题注元素缺画，均已修正（共 71 处改动），其余图经核算无误。主要修正：①系统性错法——角弧写成绝对极坐标 `(θ:r) arc(θ:θ':r)` 时圆心落在原点 O，故凡顶点在圆周上的角（弦切角、内接四边形内角、圆周角）的角标都画到了圆心里，图 29-20、29-25、29-30、29-32、29-37、29-39、29-55、29-59 改为 `(V) ++(θ:r) arc(θ:θ':r)` 并同步移动标签；②图 29-47 的「切线」偏移向量沿半径方向，实为过圆心的割线（d(O,ℓ)=0.001，应为 r=2），改为沿切向 ±(−sin55°,cos55°)，d=2.00000；③图 29-35 同侧等角判别法的 C、D 画在 AB 异侧（∠ACB=105°、∠ADB=75°），移到同侧后两角同为 75°；④图 29-77 的 O 不是外心（三半径 2.737/1.596/1.889，真外心 (0.5,1.4804)、R=2.2543），三条「垂直平分线」两条不过中点也不垂直，已全部重算；⑤图 29-71 的 X、Y 同为 (40:3)、Q、R 同为 (40:2)，∠XOY 退化成一条射线且 PQ、PR 与边重合，改为 OX 在 0°、OY 在 80°、垂足按投影算，PQ=PR=1.0927；⑥图 29-89 的垂心 H 误抄成垂足 H₂=(1.54,1.08)，真垂心 (1.10,0.9333)，改后三高与对边点积 ≤5e-3；⑦图 29-13「等弦」实为 100° 与 80°（3.064 与 2.571）、弦心距 1.286 与 1.879 却同标 d，改 CD 为 (280:2) 使两弦两距全等，并把等长双划与 d 标签移到该在的线上；⑧图 29-28 AC 不平分 ∠BAD（30°/40°），C 由 250° 改 260°，两角同为 35°、两弦同为 2.2943；⑨图 29-32、29-39 的 E 不在 AB 延长线上（∠ABE=16°，∠CBE=91°≠∠ADC=105°），改为 B+1.0·(B−A)/|B−A|，共线偏差 3e-5；⑩反证法辅助点：29-36A 的 E、29-38A 的 E、29-38B 的 F 都不在 AD 与圆的交点上（偏 0.72、0.10、0.57），已按解析交点重算，并补画 29-36B 的 BF；⑪圆幂两图：29-65 的 A、B 不在圆上（|OA|=1、|OB|=5）、T 与 C 重合、P、C、D 不共线、PA·PB=4≠PT²=5.009，改为两割线一切线共点于 P 且 PA·PB=PC·PD=PT²=5.0000；29-68 的 C、D 与 P 不共线，改后 PC·PD=3.6400=r²−h²；⑫图 29-79 的 (a) 是钝角三角形（100.01°）且 O 在形外、(b) 两顶点在 r=1.3 圆外（1.10）且 ∠C=78.98° 却画了直角块，(a) 改为 0°/110°/230°（三角 60/65/55，O 在内）、(b) 顶点改 ±1.30 使 ∠C=90.000°；图 29-81 外接圆半径 1.6 应为 BC/2=1.7678；⑬直角小方块方向错：29-7（折线不含直角）、29-24（方块偏 37°、黑楔偏 22.5°，两套旧坐标残留）、29-45、29-49（转了 45°）、29-57（两邻边夹角 81.2°），均按该顶点两射线单位向量重算；29-20 的黑楔改覆盖 95°→207.5°；④′标签落点：29-21A 的 β 越出 PB 11°、29-21C 把 β 写成 α、29-54 两处 θ 不在所标角内、29-64 第二个 α 偏出 ∠BDC 49.5°、29-43 的 OP₃>r 横压虚线、29-46、29-48 的 OQ>OP 被虚线切角、29-49 的 ℓ 标签被自身线横穿并残留两个空节点、29-53 的 30° 标签被切线斜穿、29-92 的角关系长句压住 AC，全部重定位或删除（题注已有同义表述）；⑮题注声明而图上缺画的元素：29-16 的外接圆、29-23 之 P′ 直角、29-53 之 A、B 两处直角、29-74 的 IP 虚线、29-69 两弧上的短划，已补齐；29-57 的蓝色区域本应是含 C 的半圆，实为 110° 扇形且 C 在其外，改为左半圆；29-32 定理框内重复的公式行已删一处，29-16 的 O 与三边中点改取精确外心 (0.5528,0.4566)、R=2.0533（三半径全等），29-51 的切点角改为 122.3924°/237.6076° 使 OA⊥PA 精确成立。追加修正：图 29-16 的 O 与三边中点改取精确外心 (0.5528,0.4566)、R=2.0533（三半径全等），三条中垂线段均延长到覆盖 O；图 29-51 的切点角改为 122.3924°/237.6076°、图 29-62 的 ℓ 改为过 A 的真切线（d(O,ℓ)=2.00000、与 BC 方向差 3.5e-4）并把 T 落到 ℓ 上、图 29-36A 的 E 改为线段 AD 与圆的交点（极角 33.5411°，原 (55:2) 离 AD 有 0.72）。
验证：105 个 tikz 块全部 pdflatex 编译通过、围栏配对 0 错、单块均 ≤40 行、图内无中文、填充仍为 opacity=0.18、图号 29-1…29-93 连号未变；另写复算脚本把全部图的重载关系逐条重跑（共 203 项断言全通过）：含 29-13 两弦两距全等 3.0642/1.2856、29-77 与 29-16 三半径全等、29-65 与 29-68 的 PA·PB=PC·PD=PT²=r²∓h²、29-89 三高与对边点积 ≤4e-3、29-20 反角 225°=2×112.5°、29-47 与 29-51、29-52 的 d(O,切线)=r、以及 14 处标签与直角方块的落点与角度区间判定。本批只改配图坐标、标记与两处文字（重复公式、图注措辞），无新增定理与方法，§29.1／§29.2／§29.3 三节难度上限不变。

✅ 已執行（2026-09-16）：第三轮补充——模型恢复图像输入后，把改过的图逐张渲染成 PNG 目检，实算查不到的四类缺陷被揪出并修掉：①图 29-24 的黑色角楔写成 `(P) ++… arc … -- cycle`，闭合走弦而非两条半径，渲染成「月牙」且与 P 处直角方块叠在一起 → 该直角已由方块表达，删去楔形（图 29-20 同写法改为 `(P) -- ++… arc … -- cycle` 的真扇形）；②标签互撞/压线：图 29-85 斜边标号「10」与外心「O」重叠成「Ø0」→「10」移到 (1.78,0.6)；图 29-48「OQ>OP」被粗线 OP 穿字 → 移到圆外 (2.15,1.15)；图 29-49 的 ℓ 标签被自身切线与 m 夹击 → 移到线端 (2.4,2)；图 29-55／29-59 切点 A 与方向标 Y 挤在一起 → 切线两端由 ±1 单位拉长到 ±1.9 单位；图 29-20 的 θ 恰压在 OP 上（∠APB 的平分线 151.25° 与 P→O 的 150° 只差 1.25°）→ 移到角内 179°／半径 1.15 处；图 29-21B 的 β 楔只有 7.5° 宽，任何文字都必压线 → 把 B 由 335° 改 300°，使 α=75°、β=25°、∠APB=50°、∠AOB=100° 仍是「情况 2」的标准构型且楔形可容字；图 29-69 三幅面板 xshift=4.2/8.4cm 使 (a) 的 C 与 (b) 的 B 标签相撞 → 拉开到 5.3/10.6cm。③教训：多面板图的 xshift 必须按「半宽之和＋标签余量」算，不能凭感觉取整；窄角（<10°）不放文字标签，改取点放大角或把标签移到角外。④复核：105 块再次全部编译通过，203 项几何断言 0 失败，围栏/行数/无中文/opacity=0.18/图号连号全部保持。

✅ 已執行（2026-09-16）：落实第四轮 27 处批注（排版两条经问答定案，作用域扩为 Ch29＋Ch30＋Ch28）。①内容侧六处论证改写：圆心角定理的证明重写为四种情形的线性自足叙述，删去「先准备一件事」的公共编号式，并把原以一句「逐字照搬」带过的优弧取反角情形列为**情况 4 并给出完整证明与配图**；圆内接四边形对角互补改为连接 $OB$、$OD$ 后对两个圆心角各用一次圆心角定理，删去 $\theta_{\widehat{}}$ 弧记号记账；直线与圆的位置关系的证明由 (c)(a)(b) 乱序改为 (a)(b)(c) 顺序、每情形含双向并各配一图；切线垂直于过切点的半径改用「切点在圆上故 $OP$ 是半径、异于切点的点在圆外故 $OP$ 最短、最短者即垂线段」的直接证法；切线判定推论把「$\ell$ 上异于 $P$ 的点都在圆外」从题注搬回正文；四点共圆三条判别法的反证统一为「写明唯一假设、给冲突双方编号、点名被否定的是临时假设」。②§29.1.3 新增**定义（四边形的外角与内对角）**（沿用 §8.3 多边形外角，首次定义「内对角」并配术语图），补上此前直接用而未定义的两个术语，词汇表相应补条。③图面缺陷 12 处修正：彩色粗弧改画在圆周上（图 29-3、29-26）、直角小方块按该角两边方向实算三点（图 29-11）、图 29-16 三点改取一般锐角三角形以免像直角三角形、点标签避让所压线条（图 29-34、29-39A/B、29-42）、正文未用到的圆心记号删去（图 29-39B、29-41A/B、29-42）、待作与临时对象统一改虚线（图 29-37、29-38、29-39A/B、29-41A/B）、补画此前根本未画的 $DF$ 延长段（图 29-41B）、角楔填充改「纯色加 opacity 0.18」（图 29-20A）、图 29-27 整体转十度使弦 $PB$ 不再穿过圆心。④新增 9 幅配图（图 29-19B、29-20B、29-22、29-33、29-38、29-48 至 29-51），全章 105 幅增至 114 幅，图号按题注出现顺序整体重编为图 29-1 至图 29-100（含分幅 A/B/C，分幅以三幅为限）。⑤排版体例：全章 114 条图题注一律改为引用块并逐句分行；35 个证明板块内的叙述逐句另起一行，其中逻辑紧扣的相邻句用软换行（同段不留空行）、其余句子之间隔一个空行分段，段首粗体标签不计为一句；定义、定理、注记与示例解答一律用常规写法。题注不再携带正文没有的推理。⑥正文删去「非基础课题（只出现在卷一与卷二乙部）」一类考纲归属（含 §29.1.2 引言、词汇表备注列与备课提示第 7 条），超纲内容只以自然语言自标；顺带补回章首引入段缺失的公式定界符。⑦规范回写八条：4.1 第 4 条补 `>` 的题注用途；4.4 新增「证明板块叙述逐句成行」「反证与同一法的书写体例」并为「超纲内容正文标注」补措辞边界；4.5 第 10 条改写（题注引用块、逐句分行、分幅以 A/B/C 为限）、第 12 条③ 改为「判断结果先写正文」，新增第 16 条「题注不得引入新信息」、第 17 条「图内线型层级与元素必要性」、第 18 条「图不得越权」；第十章 DoD 11 扩写并新增 22、23 两项，历史存量新增 L14、L15。⑧姊妹文件同步：`大纲/官方考纲与课题讲义关联分析.md` §29 四行的图号与统计（55、33、26、114 幅与板块计数）全部更新；`大纲/DSE 数学词汇表.md` 补「四边形的外角」；更新日志记本轮与 Ch30、Ch28 两个排版批次，并补登此前缺记的第三轮配图核查。⑨同批把新体例施于 Ch30（题注 34 条、证明段 14 段）与 Ch28（题注 33 条、证明段 24 段），两章图号与正文内容未动。验证：114 个 tikz 块本机 pdflatex 全部编译通过，标签重叠 0，单块均不超过 40 行，图内无中文，填充一律带透明度；围栏配对 219 开 219 闭、无未闭合；图号连号无跳无重、每题注均被正文引用且无悬空引用；批注符零残留；表格内数学式无裸竖线；结论板块与相邻证明配对无缺；层级与编号错位 0；难度行 3 对 3；内链零死链；粗体标签未被拆行；题注文字与执行前快照逐字守恒（本轮有意改写者除外）。难度上限按 4.6 重评：本轮属补齐定义与把已有分情况论证做实，无新定理与新方法，§29.1／§29.2／§29.3 三节 T/C/E/Q 不变。待办：DoD 16 需你在 Obsidian 内目视确认新图与改图。
✅ 已執行（2026-09-16）：落实第五轮 6 处批注（用户指示直接修改，不另立方案章节）。①**弦切角定理陈述图（图 29-62）重画**：原图切点 A 处四条线挤作一团、切线端点 X、Y 与 A 的标签叠在一起无法辨认，改为切线 $XY$ 水平切圆于顶点 $A$、弦 $AB$ 斜下、$C$ 落在内错弓形内，两处角同标 $\theta$；正文未用到的圆心记号随之删去。②**弦切角定理的逆陈述图（图 29-66）重画并去越权**：原图预画虚线半径 $OA$ 与 $OA \perp XY$ 的直角方块，而「$XY$ 与圆相切」正是本定理待证的结论，属图把结论画进前提（违 4.5 第 18 条），已删去两者，并改取倾斜构型以免与图 29-62 雷同；题注改为只索引已知条件「$\angle BAY = \angle ACB$」。③**切割线定理图（图 29-72）拆为两幅分幅**：原图把两条割线、一条切线、以及属于证明图的辅助弦 $AD$、$CB$ 全叠在一幅里，现按「一图一事」拆为图 29-72A（两条割线 $PAB$、$PCD$）与图 29-72B（一割线一切线 $PT$），各紧跟其引用句，证明用的辅助弦不再出现在陈述图中。④**乘积定值推论图（图 29-75）图文相符**：图上画了 $C$、$D$ 而题注与正文都未交代其身份，题注现写明「过 $P$ 的两条割线分别交圆于 $A$、$B$ 与 $C$、$D$，$AB$ 取成直径以示 $r^2-h^2$，$CD$ 表另一方向以示与方向无关」；已作出的割线 $CD$ 由虚线改实线。⑤**图 29-79B 顶点 $R$ 处的直角方块重算**：原三点 $(1.433,1.695)\to(1.299,1.496)\to(1.099,1.43)$ 的第三点方向错（方块不成方形），改按 $R$ 到 $P$ 与 $R$ 到 $O$ 两射线单位向量各取 0.22 实算为 $(1.4166,1.706)\to(1.2936,1.5239)\to(1.111,1.6468)$。⑥**§29.3.2 与 §29.3.3 的良定义次序改正**：内心、外心、重心、垂心四处定义原先都写作「三角形三条某线的交点称为……」，而共点性要到其后的定理才证明，属以未证的共点下定义；现将四个定义板块移到各自共点定理与证明之后，定义首句改为「由上面的定理，……交于一点。这个交点称为……」，共点定理的陈述图与证明图题注亦把「交于内心／外心／重心／垂心」改为「交于一点 $I$／$O$／$G$／$H$」，垂心定理陈述句同步改用「该交点」表述，内切圆半径在证明中先记作 $r$ 再由定义命名。⑦**图号随板块移位整体重编**：全章 115 个题注仍为图 29-1 至 图 29-100（切割线一图为两幅分幅），正文引用同步，考纲对照 §29.2、§29.3 两行的图号与幅数（34、115）一并更新。⑧规范回写两条：**4.4 新增「定义的后置条件（良定义性）」**、**4.5 新增第 19 条「一图一事」**，DoD 22 的题注核对项补「图内元素是否都有身份交代」。验证：115 个 tikz 块本机编译全部通过、标签重叠 0、单块均不超 40 行、图内无中文、填充带透明度；围栏 220 开 220 闭无未闭合；图号连号无跳无重、每题注均被正文引用、无悬空引用；批注符零残留；表格内数学式无裸竖线；层级与编号错位 0、难度行 3 对 3、内链零死链、粗体标签未拆行、`ad-proof` 逐句成段违例 0；三节难度上限不变（本轮只调整叙述次序与配图，无新定理与新方法）。待办：DoD 16 仍请你在 Obsidian 内目视本轮重画与拆分的五幅图。
✅ 已執行（2026-09-17）：落实第六轮 4 处批注（按指示直接修改，不另立方案章节）。①**图 29-73（两割线证明图）删去圆心 $O$**：该点既不在定理条件里、也不在证明里出现，属无身份元素，圆改为直接 `\draw (0,0) circle (1.8)`。②**图 29-74（切线情形证明图）改一般构型并删 $O$**：原图 $A=(1.8,0)$、$B=(-1.8,0)$、$P=(3.4,0)$ 三点共线于 $x$ 轴，割线 $PAB$ 恰成直径，是「太特殊」的画法；现取过 $P$ 的一般割线（$A=(1.691,0.623)$、$B=(-0.893,1.563)$，与 $P$ 共线偏差 $<10^{-3}$），并删去无身份的圆心与虚线半径 $OT$。③**图 29-75（乘积定值推论陈述图）按「一图一事」拆为两幅**：原图把 $P$ 在圆内与圆外两种情形、直径与一般割线叠在一起，且 $C$、$D$ 从未在上文出现。现拆为图 29-75A（$P$ 在圆内，一条一般割线交圆于 $A$、$B$，虚线 $OP=h$）与图 29-75B（$P$ 在圆外，同构型），$C$、$D$ 一律删去；两图坐标均实算满足 $PA\cdot PB=\lvert r^2-h^2\rvert$（圆内 $2.5277\times1.4401=3.6400=r^2-h^2$，圆外 $1.5680\times4.8220=7.5600=h^2-r^2$）。④**证明重写**：开头不再沿用推论陈述里的条件，而是把全套假设重述一遍（设 $\Gamma=C(O,r)$、$P$ 为一点、$OP=h$、过 $P$ 任作割线交圆于 $A$、$B$、$M$ 为弦 $AB$ 中点、连 $OM$ 与 $OA$），再按两情形各配一幅证明图（图 29-76A、图 29-76B，含 $OM\perp AB$ 的直角方块，方块三点由该顶点两射线单位向量实算），并把公共的毕氏两步与 $(\ast)$ 式提到分情形之前只用一次。⑤**图号随之重编**：全章 118 个题注＝图 29-1 至 图 29-101（含分幅 A/B/C），**下一个可用新号 29-102**；考纲对照 §29.2、§29.3、§29.4 三行的图号与幅数（37、118）同步。验证：118 个 tikz 块本机编译全部通过、标签重叠 0、单块均不超 40 行；围栏 223 开 223 闭无未闭合；图号连号无跳无重、每题注均被正文引用、无悬空引用；批注符零残留；表格内数学式无裸竖线；`ad-proof` 逐句成段违例 0；结论板块与相邻证明配对无缺；层级与编号错位 0；难度行 3 对 3；粗体标签未拆行。三节难度上限不变（本轮只改配图与证明的假设交代，无新定理与新方法）。待办：DoD 16 仍请你在 Obsidian 内目视本轮改动的六幅图（图 29-73、29-74、29-75A、29-75B、29-76A、29-76B）。
✅ 已執行（2026-10-01）：配合 Chapter 31 上线，补三处指向坐标层的互相回指。①§29.1.1 定理（过三点的圆）之后补一句：用坐标求过三点的圆有两条路（待定系数法与几何法），见 §31.1.4。②§29.2.1 定理（直线与圆的位置关系）之后原有的「与 §31 圆方程一节用判别式得到的结论是同一件事」改为精确指涉 §31.2.2 的判别式判据，并补一句：定义（点在圆内、圆上、圆外）里的 $OP \gtrless r$，在坐标里就是代入方程左端看符号，见 §31.2.1。③§29.2.3 定义（点对圆的幂）之后补一句：在坐标系里 $OP^2=(x_0-h)^2+(y_0-k)^2$，幂与切线长都能用坐标算，见 §31.2.3 的推论（切线长的坐标式）。三处均只增正文句子，不动任何板块、标题与图。验证：重跑结构尺，Ch29 存量违规数与改动前一致（⑥b 46、⑧ 8、⑩ 4、⑯ 37、⑨ 1、⑪ 1），新写入的三行零违规；节号死链扫描通过（§31.1.4／§31.2.1／§31.2.2／§31.2.3 均已存在）。

✅ 已執行（2026-10-12·Ch32 开编联动）：§29.3 引言补一句前向链接，四心在角锥顶点投影中的对应指向 §32.3.2；正文其余未动。

✅ 已執行（2026-10-13·記號整改）：按規範 4.4.3「線段長與線段」新則，全章 10 處「線段 $XY$」改「線段 $\overline{XY}$」；本章線段長原已裸寫（$PA\cdot PB$），$|r^2-h^2|$ 屬實數絕對值按口徑保留；無平面小寫希臘記號。純記號整改，結構、圖塊與編譯零涉及，圍欄/$ 配對複核與整改前一致。
