---
tags: DSE课程笔记
---

# 26　三角函数（Trigonometric Functions）

> [[Chapter 9 三角学(I)|三角学(I)]] 建立了锐角 $\theta\in(0^\circ,90^\circ)$ 的正弦、余弦与正切：$\sin\theta=\dfrac{\text{对边}}{\text{斜边}}$、$\cos\theta=\dfrac{\text{邻边}}{\text{斜边}}$、$\tan\theta=\dfrac{\text{对边}}{\text{邻边}}$，并推得平方和恒等式、商数恒等式、互余关系与特殊角的精确值。但那套定义有两处局限：其一，它只对锐角有意义，无法回答 $\sin 120^\circ$、$\cos 270^\circ$ 是什么；其二，它把 $\sin\theta$ 看作「直角三角形的一个比值」，而非「以角为自变量的函数」。本章的任务正是消除这两处局限：先把角推广到任意角，再把三角比推广为定义在任意角上的**函数**。
>
> DSE 常规课程中，三角函数的自变量一律以**角度制**（度）给出，弧度制仅作一般讲解。弧度制的价值在于提供一个换算关系：任意角度都可以换算成一个实数（其弧度值），因此以角度为自变量的三角函数，本质上仍是一个定义在实数上的函数。本章主线采用角度制，仅在 §26.1 简述这一换算关系。
>
> 本章按概念依赖顺序铺排：先简述弧度制，说明「角度可换算为实数」（§26.1）；再用单位圆把三角比从锐角推广到任意角，得到定义在任意角上的三角函数，并建立符号法则、化锐角公式与周期性（§26.2）；据此绘制并分析正弦、余弦、正切的图像与变换（§26.3）；最后因周期性导致非单射，限制定义域定义反三角函数（§26.4），并作全章总结。

前置：[[Chapter 9 三角学(I)|三角学(I)]]、[[Chapter 19 函数及其图像|函数及其图像]]、[[Chapter 16 集合论|集合论]]

---

## 26.1　弧度法（Radian Measure）

> **本节难度上限**：T C ｜ C D ｜ E D ｜ Q D

> 本节一般讲解弧度制，重点落在「角度 $\to$ 实数」的换算关系上。本节内容 DSE 常规课程不作要求，仅作概念说明。

### 26.1.1　弧度：角度与实数的换算

[[Chapter 9 三角学(I)|三角学(I)]] 中讨论的角以「度」（$^\circ$）为单位。度是把周角分为 $360$ 等份的几何度量，本身并非实数。要把三角函数理解为以实数为自变量的函数，需要一种把角度换算成实数的方法，这正是弧度制的用途。

````ad-def
title: 定义（弧度） | Definition（Radian）

在半径为 $r$ 的圆中，若一段弧的长度等于 $r$，则该弧所对的圆心角定义为 **$1$ 弧度（$1$ radian，记作 $1$ rad）**。一般地，弧长为 $s$ 的弧所对的圆心角为：

$$\theta = \frac{s}{r} \quad (\text{rad})$$
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.5,0) -- (2.0,0) node[right]{$x$};
\draw[->] (0,-0.6) -- (0,1.5) node[above]{$y$};
% circle of radius r = 1.2
\draw[thick] (0,0) circle (1.2);
% initial side (x-axis) and terminal side at angle theta
\draw[thick] (0,0) -- node[below]{$r$} (1.2,0);
\draw[thick] (0,0) -- node[above left]{$r$} (1.2*0.819, 1.2*0.574);
% the arc s highlighted
\draw[very thick, red] (1.2,0) arc (0:35:1.2);
\node[red] at (1.42,0.38) {$s$};
% central angle theta
\node at (0.36,0.14) {$\theta$};
% terminal point
\node at (1.2*0.819+0.12, 1.2*0.574+0.08) {$P$};
\end{tikzpicture}
\end{document}
```

> 图 26-1：弧长 $s$ 与半径 $r$ 的比值 $\dfrac{s}{r}$ 给出圆心角 $\theta$ 的弧度数。

整个圆周的弧长 $s=2\pi r$，由弧度定义得整个圆周对应 $2\pi$ rad；而整个圆周对应 $360^\circ$，故 $\pi\text{ rad}=180^\circ$。由此得到角度与弧度的换算公式：

$$\theta_{\text{rad}} = \frac{\pi}{180^\circ}\times\theta_{\text{deg}},\qquad \theta_{\text{deg}} = \frac{180^\circ}{\pi}\times\theta_{\text{rad}}$$

常用对照：$30^\circ=\dfrac{\pi}{6}$、$45^\circ=\dfrac{\pi}{4}$、$60^\circ=\dfrac{\pi}{3}$、$90^\circ=\dfrac{\pi}{2}$、$180^\circ=\pi$、$360^\circ=2\pi$。

````ad-note
title: 注记（关键结论） | Note（Key Conclusion）

弧度是弧长与半径的比值，两个长度之比，因而是**纯数**（无量纲）。任意角度 $\theta^\circ$ 经 $\theta_{\text{rad}}=\dfrac{\pi}{180}\theta$ 都唯一对应一个实数（其弧度值）。因此，以角度为自变量的三角函数 $\sin\theta,\cos\theta,\tan\theta$，其自变量实质上是一个实数，三角函数是定义在实数（经弧度换算）上的实函数。这正是「角度制为表、实函数为里」的含义。
````

````ad-note
title: 注记（弧度的意义，为 M1/M2 学生说明） | Note（Significance of Radians）

弧度制在微积分中不可或缺：$(\sin x)'=\cos x$ 等公式仅在弧度制下成立，其根源在于 $\lim_{x\to0}\dfrac{\sin x}{x}=1$ 的证明依赖于弧度的定义。DSE 必修课程不涉及这一层，此处仅作了解。
````

````ad-example
title: 示例 | Example

半径为 $4$ cm 的圆中，一段弧长为 $6$ cm，求该弧所对圆心角的弧度数。

---

由 $\theta=\dfrac{s}{r}=\dfrac{6}{4}=\dfrac{3}{2}$，故圆心角为 $\dfrac{3}{2}$ rad。
````

---

## 26.2　任意角的三角比（Trigonometric Ratios of Any Angle）

> **本节难度上限**：T B+ ｜ C B- ｜ E B ｜ Q C

> 本节以角度制为自变量，用单位圆把 [[Chapter 9 三角学(I)|三角学(I)]] 的锐角三角比推广到任意角，得到三角函数并建立符号法则、化锐角公式与周期性。

### 26.2.1　任意角的概念

在平面中，一条射线从初始位置 $OA$ 绕端点 $O$ 旋转到终止位置 $OB$，所形成的旋转量称为一个**角**。旋转既可以超过 $90^\circ$（多圈），也可以沿顺时针方向进行，因此角可以是任意实数。

````ad-def
title: 定义（任意角） | Definition（General Angle）

在平面中，一条射线从初始位置 $OA$（始边，initial side）绕端点 $O$ 旋转到终止位置 $OB$（终边，terminal side），所形成的旋转量称为一个**角（general angle）**。

- 逆时针旋转 $\Rightarrow$ 角取**正值**；顺时针旋转 $\Rightarrow$ 角取**负值**。
- 旋转量为零 $\Rightarrow$ **零角（zero angle）**。
- 角的大小可超过 $360^\circ$（多圈旋转）。
````

````ad-def
title: 定义（终边相同的角） | Definition（Coterminal Angles）

对任意角 $\theta$，所有与 $\theta$ 终边相同的角可表示为：

$$\theta+360^\circ k \quad (k\in\mathbb{Z})$$
````

将角的顶点置于原点、始边与 $x$ 轴正半轴重合，称该角处于**标准位置（standard position）**。本章自此起，所有角均置于标准位置讨论。

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.5,0) -- (1.6,0) node[right]{$x$};
\draw[->] (0,-1.5) -- (0,1.6) node[above]{$y$};
% initial side on positive x-axis
\draw[thick, ->] (0,0) -- (1.3,0) node[below]{$A$};
% terminal side at 120 degrees
\draw[thick, ->] (0,0) -- (-0.65,1.126) node[above left]{$B$};
% rotation arc from A to B (counterclockwise)
\draw[->, red, thick] (0.55,0) arc (0:120:0.55);
\node[red] at (-0.2,0.62) {$120^{\circ}$};
% origin
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-2：标准位置的任意角。始边 $OA$ 与 $x$ 轴正半轴重合，逆时针旋转 $120^\circ$ 得到终边 $OB$。

### 26.2.2　单位圆定义

[[Chapter 9 三角学(I)|三角学(I)]] 中的直角三角形定义仅适用于锐角（$0<\theta<90^\circ$）。要定义任意角的三角函数，需要一套不依赖「直角三角形」的新定义，即单位圆定义。

````ad-def
title: 定义（单位圆定义） | Definition（Unit Circle Definition）

以原点 $O$ 为心、半径 $1$ 的圆称为**单位圆（unit circle）**。设角 $\theta$ 处于标准位置，其终边与单位圆交于点 $P(x,y)$，则：

$$\sin\theta=y,\qquad \cos\theta=x,\qquad \tan\theta=\frac{y}{x}\quad(x\neq0)$$
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.2) -- (0,1.3) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% point P at theta = 50 degrees
\coordinate (P) at (0.643, 0.766);
\draw[thick] (0,0) -- (P) node[above right]{$P(x,y)$};
% projection onto x-axis
\draw[dashed] (P) -- (0.643,0);
% horizontal segment (cos theta) and vertical segment (sin theta)
\draw[blue, very thick] (0,0) -- (0.643,0);
\draw[red, very thick] (0.643,0) -- (P);
\node[blue] at (0.32,-0.18) {$\cos\theta$};
\node[red] at (0.88,0.38) {$\sin\theta$};
% right angle mark at the foot
\draw (0.52,0) -- (0.52,0.12) -- (0.643,0.12);
% angle theta
\node at (0.24,0.10) {$\theta$};
% unit marker
\node at (0.5,-0.32) {$1$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-3：单位圆定义。$\sin\theta$ 是点 $P$ 的纵坐标，$\cos\theta$ 是横坐标，$OP=1$。

````ad-note
title: 注记（一致性验证） | Note（Consistency Check）

当 $\theta$ 为锐角时，终边点 $P(\cos\theta,\sin\theta)$ 恰为[[Chapter 9 三角学(I)|三角学(I)]] 中直角三角形定义的对应点：以 $OP=1$ 为斜边、$P$ 到 $x$ 轴的垂足构成直角三角形，其对边 $=\sin\theta$、邻边 $=\cos\theta$。故单位圆定义是锐角定义的自然推广。
````

### 26.2.3　三角函数

由单位圆定义，每个角 $\theta$ 唯一对应终边点 $P(x,y)$，故 $\sin\theta=y$、$\cos\theta=x$ 是「角到实数」的确定对应，$\tan\theta=\dfrac{y}{x}$ 在 $x\neq0$ 时有定义。又由 §26.1，角 $\theta$ 经弧度换算为一个实数，故三者实质上是定义在实数上的函数。

````ad-def
title: 定义（三角函数） | Definition（Trigonometric Functions）

$$\sin:\mathbb{R}\longrightarrow[-1,1],\quad \theta\longmapsto\sin\theta$$

$$\cos:\mathbb{R}\longrightarrow[-1,1],\quad \theta\longmapsto\cos\theta$$

$$\tan:\mathbb{R}\setminus\{90^\circ+180^\circ k\}\longrightarrow\mathbb{R},\quad \theta\longmapsto\tan\theta$$

自变量 $\theta$ 以度计，为实数（经 §26.1 的弧度换算），到达域即值域的包含集。$\tan$ 在 $\theta=90^\circ+180^\circ k$ 无定义（此处 $\cos\theta=0$），故定义域挖去这些点。
````

````ad-thm
title: 定理（基本恒等式） | Theorem（Fundamental Identities）

对所有角 $\theta$（使 $\tan\theta$ 有定义者）：

1. $\sin^2\theta+\cos^2\theta \equiv 1$
2. $\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$
````

````ad-proof
title: 证明 | Proof

(1) 点 $P(\cos\theta,\sin\theta)$ 在单位圆上，故到原点距离为 $1$，即 $\cos^2\theta+\sin^2\theta=1$。

(2) 由定义 $\tan\theta=\dfrac{y}{x}=\dfrac{\sin\theta}{\cos\theta}$（$x=\cos\theta\neq0$ 时）。
````

> 图 26-3 正是基本恒等式的几何图像：点 $P$ 在单位圆上，$OP=1$ 即 $\sin^2\theta+\cos^2\theta \equiv 1$。

### 26.2.4　各象限的符号（ASTC）


````ad-thm
title: 定理（各象限符号） | Theorem（ASTC Rule）

| 象限 | $\cos\theta$ | $\sin\theta$ | $\tan\theta$ | 为正的函数 |
| :---: | :---: | :---: | :---: | :--- |
| I（$0<\theta<90^\circ$） | $+$ | $+$ | $+$ | **A**ll |
| II（$90^\circ<\theta<180^\circ$） | $-$ | $+$ | $-$ | **S**ine |
| III（$180^\circ<\theta<270^\circ$） | $-$ | $-$ | $+$ | **T**angent |
| IV（$270^\circ<\theta<360^\circ$） | $+$ | $-$ | $-$ | **C**osine |
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% quadrant labels
\node at (0.42,0.42) {\textbf{A}};
\node at (-0.42,0.42) {\textbf{S}};
\node at (-0.42,-0.42) {\textbf{T}};
\node at (0.42,-0.42) {\textbf{C}};
% quadrant markers
\node[below left] at (0,0) {$O$};
\node at (1.12,1.08) {I};
\node at (-1.12,1.08) {II};
\node at (-1.12,-1.08) {III};
\node at (1.12,-1.08) {IV};
\end{tikzpicture}
\end{document}
```

> 图 26-4：单位圆四象限与 ASTC 符号。逆时针读各象限首字母恰为 A-S-T-C。

````ad-note
title: 注记（符号的记忆与化归） | Note（Memory Aid）

由 $\sin\theta=y$、$\cos\theta=x$：第一、二象限 $y>0$ 故 $\sin\theta>0$；第一、四象限 $x>0$ 故 $\cos\theta>0$。又 $\tan\theta\equiv\dfrac{\sin\theta}{\cos\theta}$，当 $\sin\theta$ 与 $\cos\theta$ 同号时 $\tan\theta>0$（第一、三象限），异号时 $\tan\theta<0$（第二、四象限）。逆时针读单位圆四象限的首字母恰为 **A-S-T-C**，即口诀「All Students Take Calculus」。
````

### 26.2.5　化锐角公式

任意角的三角比，都可以借助单位圆的对称性化归为某个锐角 $\alpha$ 的三角比。这样，[[Chapter 9 三角学(I)|三角学(I)]] 建立的锐角三角比（含特殊角精确值）就够用了。

按主轴 $90^\circ$、$180^\circ$、$270^\circ$、$360^\circ$ 分组，诱导公式分为四组定理，每组有独立的对称几何：$90^\circ$ 与 $270^\circ$ 令 $\sin$ 与 $\cos$ 互换（余函数），$180^\circ$ 令函数名不变、只改符号，$360^\circ$ 与负角由同终边给出。

````ad-thm
title: 定理（$90^\circ$ 的诱导公式） | Theorem（Reduction Formulas about $90^\circ$）

$$\sin(90^\circ-\alpha)\equiv\cos\alpha,\quad \cos(90^\circ-\alpha)\equiv\sin\alpha,\quad \tan(90^\circ-\alpha)\equiv\dfrac{1}{\tan\alpha}$$

$$\sin(90^\circ+\alpha)\equiv\cos\alpha,\quad \cos(90^\circ+\alpha)\equiv-\sin\alpha,\quad \tan(90^\circ+\alpha)\equiv-\dfrac{1}{\tan\alpha}$$

$\sin$ 与 $\cos$ 互换（余函数），符号按**变换前的函数**在变换后角所在象限的正负决定：$90^\circ-\alpha$ 在第一象限，$\sin,\cos,\tan$ 全正；$90^\circ+\alpha$ 在第二象限，$\sin$ 正、$\cos,\tan$ 负。$90^\circ-\alpha$ 一行与[[Chapter 9 三角学(I)|三角学(I)]] 互余关系一致。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.2) -- (0,1.3) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% line y = x (mirror axis)
\draw[dashed, gray] (-1.1,-1.1) -- (1.1,1.1);
% P(alpha) at 50 deg, P(90-alpha) mirror over y=x, P(90+alpha)
\coordinate (P) at (0.643,0.766);
\coordinate (P1) at (0.766,0.643);
\coordinate (P2) at (-0.766,0.643);
\draw[blue, thick] (0,0) -- (P);
\draw[red, thick] (0,0) -- (P1);
\draw[green!60!black, thick] (0,0) -- (P2);
\filldraw[blue] (P) circle (0.5pt);
\filldraw[red] (P1) circle (0.5pt);
\filldraw[green!60!black] (P2) circle (0.5pt);
\node[blue, above] at (P) {$P(x,y)$};
\node[red,  right] at (P1) {$P'(y,x)$};
\node[green!60!black, above left] at (P2) {$P''(-y,x)$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-5A：设 $\alpha$ 的终边点为 $P(x,y)$。$P'(y,x)$ 即 $90^\circ-\alpha$ 的终边点，是 $P$ 关于直线 $y=x$ 的对称点；$P''(-y,x)$ 即 $90^\circ+\alpha$ 的终边点，由 $P$ 逆时针旋转 $90^\circ$ 得到。

````ad-proof
title: 证明 | Proof

设 $\alpha$ 的终边点为 $P(x,y)$，其中 $x=\cos\alpha$、$y=\sin\alpha$。$90^\circ-\alpha$ 的终边点是 $P$ 关于直线 $y=x$ 的对称点 $P'(y,x)$，故 $\sin(90^\circ-\alpha)\equiv\cos\alpha$、$\cos(90^\circ-\alpha)\equiv\sin\alpha$、$\tan(90^\circ-\alpha)\equiv\dfrac{\cos\alpha}{\sin\alpha}\equiv\dfrac{1}{\tan\alpha}$。

$90^\circ+\alpha$ 的终边点是 $P$ 逆时针旋转 $90^\circ$ 所得 $P''(-y,x)$，故 $\sin(90^\circ+\alpha)\equiv\cos\alpha$、$\cos(90^\circ+\alpha)\equiv-\sin\alpha$、$\tan(90^\circ+\alpha)\equiv-\dfrac{1}{\tan\alpha}$。
````


````ad-example
title: 示例 | Example

求 $\sin 150^\circ$ 的值。

---

$\sin 150^\circ=\sin(90^\circ+60^\circ)=\cos 60^\circ=\dfrac{1}{2}$。
````

````ad-thm
title: 定理（$180^\circ$ 的诱导公式） | Theorem（Reduction Formulas about $180^\circ$）

$$\sin(180^\circ-\alpha)\equiv\sin\alpha,\quad \cos(180^\circ-\alpha)\equiv-\cos\alpha,\quad \tan(180^\circ-\alpha)\equiv-\tan\alpha$$

$$\sin(180^\circ+\alpha)\equiv-\sin\alpha,\quad \cos(180^\circ+\alpha)\equiv-\cos\alpha,\quad \tan(180^\circ+\alpha)\equiv\tan\alpha$$

函数名不变，符号按变换前的函数判：$180^\circ-\alpha$ 在第二象限 $\sin$ 正，$180^\circ+\alpha$ 在第三象限 $\tan$ 正。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% P(alpha), P(180-alpha) y-axis mirror, P(180+alpha) origin mirror
\coordinate (P) at (0.643,0.766);
\coordinate (P1) at (-0.643,0.766);
\coordinate (P2) at (-0.643,-0.766);
\draw[blue, thick] (0,0) -- (P);
\draw[red, thick] (0,0) -- (P1);
\draw[orange, thick] (0,0) -- (P2);
% symmetry dashed lines
\draw[dashed, gray] (P) -- (P1);
\draw[dashed, gray] (P) -- (P2);
\filldraw[blue] (P) circle (1.5pt);
\filldraw[red] (P1) circle (1.5pt);
\filldraw[orange] (P2) circle (1.5pt);
\node[blue, above right] at (P) {$P(x,y)$};
\node[red, above left] at (P1) {$P'(-x,y)$};
\node[orange, below left] at (P2) {$P''(-x,-y)$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-5B：设 $\alpha$ 的终边点为 $P(x,y)$。$P'(-x,y)$ 即 $180^\circ-\alpha$ 的终边点，关于 $y$ 轴对称；$P''(-x,-y)$ 即 $180^\circ+\alpha$ 的终边点，关于原点对称。

````ad-proof
title: 证明 | Proof

设 $\alpha$ 的终边点为 $P(x,y)$。$180^\circ-\alpha$ 的终边点是 $P$ 关于 $y$ 轴的对称点 $P'(-x,y)$，故 $\sin(180^\circ-\alpha)\equiv\sin\alpha$、$\cos(180^\circ-\alpha)\equiv-\cos\alpha$、$\tan(180^\circ-\alpha)\equiv-\tan\alpha$。

$180^\circ+\alpha$ 的终边点是 $P$ 关于原点的对称点 $P''(-x,-y)$，故 $\sin(180^\circ+\alpha)\equiv-\sin\alpha$、$\cos(180^\circ+\alpha)\equiv-\cos\alpha$、$\tan(180^\circ+\alpha)\equiv\tan\alpha$。
````

````ad-example
title: 示例 | Example

求 $\sin 120^\circ$ 的值。

---

$\sin 120^\circ=\sin(180^\circ-60^\circ)=\sin 60^\circ=\dfrac{\sqrt{3}}{2}$。
````

````ad-thm
title: 定理（$270^\circ$ 的诱导公式） | Theorem（Reduction Formulas about $270^\circ$）

$$\sin(270^\circ-\alpha)\equiv-\cos\alpha,\quad \cos(270^\circ-\alpha)\equiv-\sin\alpha,\quad \tan(270^\circ-\alpha)\equiv\dfrac{1}{\tan\alpha}$$

$$\sin(270^\circ+\alpha)\equiv-\cos\alpha,\quad \cos(270^\circ+\alpha)\equiv\sin\alpha,\quad \tan(270^\circ+\alpha)\equiv-\dfrac{1}{\tan\alpha}$$

$\sin$ 与 $\cos$ 互换，符号按变换前的函数判：$270^\circ-\alpha$ 在第三象限 $\tan$ 正，$270^\circ+\alpha$ 在第四象限 $\cos$ 正。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% P(alpha), P(270-alpha), P(270+alpha)
\coordinate (P) at (0.643,0.766);
\coordinate (P1) at (-0.766,-0.643);
\coordinate (P2) at (0.766,-0.643);
\draw[blue, thick] (0,0) -- (P);
\draw[red, thick] (0,0) -- (P1);
\draw[green!60!black, thick] (0,0) -- (P2);
\filldraw[blue] (P) circle (1.5pt);
\filldraw[red] (P1) circle (1.5pt);
\filldraw[green!60!black] (P2) circle (1.5pt);
\node[blue, above right] at (P) {$P(x,y)$};
\node[red, below left] at (P1) {$P'(-y,-x)$};
\node[green!60!black, below right] at (P2) {$P''(y,-x)$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-5C：设 $\alpha$ 的终边点为 $P(x,y)$。$P'(-y,-x)$ 即 $270^\circ-\alpha$ 的终边点（第三象限），$P''(y,-x)$ 即 $270^\circ+\alpha$ 的终边点（第四象限）。

````ad-proof
title: 证明 | Proof

$270^\circ-\alpha=180^\circ+(90^\circ-\alpha)$，令 $\beta=90^\circ-\alpha$（锐角），套用 $180^\circ$ 组：$\sin(270^\circ-\alpha)\equiv-\sin\beta\equiv-\sin(90^\circ-\alpha)\equiv-\cos\alpha$、$\cos(270^\circ-\alpha)\equiv-\cos\beta\equiv-\cos(90^\circ-\alpha)\equiv-\sin\alpha$、$\tan(270^\circ-\alpha)\equiv\tan\beta\equiv\tan(90^\circ-\alpha)\equiv\dfrac{1}{\tan\alpha}$。

$270^\circ+\alpha=180^\circ+(90^\circ+\alpha)$，套用 $180^\circ$ 组：$\sin(270^\circ+\alpha)\equiv-\sin(90^\circ+\alpha)\equiv-\cos\alpha$、$\cos(270^\circ+\alpha)\equiv-\cos(90^\circ+\alpha)\equiv\sin\alpha$、$\tan(270^\circ+\alpha)\equiv\tan(90^\circ+\alpha)\equiv-\dfrac{1}{\tan\alpha}$。
````

````ad-example
title: 示例 | Example

求 $\sin 240^\circ$ 的值。

---

$\sin 240^\circ=\sin(270^\circ-30^\circ)=-\cos 30^\circ=-\dfrac{\sqrt{3}}{2}$。
````

````ad-thm
title: 定理（$360^\circ$ 与负角的诱导公式） | Theorem（Reduction Formulas about $360^\circ$ and Negative Angles）

$$\sin(360^\circ-\alpha)\equiv-\sin\alpha,\quad \cos(360^\circ-\alpha)\equiv\cos\alpha,\quad \tan(360^\circ-\alpha)\equiv-\tan\alpha$$

$$\sin(-\alpha)\equiv-\sin\alpha,\quad \cos(-\alpha)\equiv\cos\alpha,\quad \tan(-\alpha)\equiv-\tan\alpha$$

设 $\alpha$ 的终边点为 $P(x,y)$。$360^\circ-\alpha$ 与 $-\alpha$ 的终边点同为 $P'(x,-y)$，是 $P$ 关于 $x$ 轴的对称点。$-\alpha$ 一行即奇偶性（$\sin,\tan$ 奇、$\cos$ 偶），与[[Chapter 19 函数及其图像|函数及其图像]] 的奇偶性定义衔接。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.2) -- (0,1.3) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% P(alpha) and its x-axis mirror
\coordinate (P) at (0.643,0.766);
\coordinate (P1) at (0.643,-0.766);
\draw[blue, thick] (0,0) -- (P);
\draw[red, thick] (0,0) -- (P1);
\draw[dashed, gray] (P) -- (P1);
\filldraw[blue] (P) circle (1.5pt);
\filldraw[red] (P1) circle (1.5pt);
\node[blue, above right] at (P) {$P(x,y)$};
\node[red, below right] at (P1) {$P'(x,-y)$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-5D：$P'(x,-y)$ 即 $360^\circ-\alpha$ 与 $-\alpha$ 的终边点，是 $P$ 关于 $x$ 轴的对称点。

````ad-proof
title: 证明 | Proof

设 $\alpha$ 的终边点为 $P(x,y)$。$-\alpha$ 的终边点是 $P'(x,-y)=(\cos(-\alpha),\sin(-\alpha))=(\cos\alpha,-\sin\alpha)$，即 $P$ 关于 $x$ 轴的对称点，故 $\sin(-\alpha)\equiv-\sin\alpha$、$\cos(-\alpha)\equiv\cos\alpha$、$\tan(-\alpha)\equiv-\tan\alpha$。由 $360^\circ-\alpha$ 与 $-\alpha$ 终边相同，$\sin(360^\circ-\alpha)\equiv\sin(-\alpha)\equiv-\sin\alpha$、$\cos(360^\circ-\alpha)\equiv\cos\alpha$、$\tan(360^\circ-\alpha)\equiv-\tan\alpha$。
````

````ad-example
title: 示例 | Example

求 $\sin 300^\circ$ 的值。

---

$\sin 300^\circ=\sin(360^\circ-60^\circ)=-\sin 60^\circ=-\dfrac{\sqrt{3}}{2}$。
````

### 诱导公式汇总表

设 $\alpha\in(0^\circ,90^\circ)$ 为锐角：

| 角 | $\sin$ | $\cos$ | $\tan$ |
| :---: | :---: | :---: | :---: |
| $-\alpha$ | $-\sin\alpha$ | $\cos\alpha$ | $-\tan\alpha$ |
| $90^\circ-\alpha$ | $\cos\alpha$ | $\sin\alpha$ | $\dfrac{1}{\tan\alpha}$ |
| $90^\circ+\alpha$ | $\cos\alpha$ | $-\sin\alpha$ | $-\dfrac{1}{\tan\alpha}$ |
| $180^\circ-\alpha$ | $\sin\alpha$ | $-\cos\alpha$ | $-\tan\alpha$ |
| $180^\circ+\alpha$ | $-\sin\alpha$ | $-\cos\alpha$ | $\tan\alpha$ |
| $270^\circ-\alpha$ | $-\cos\alpha$ | $-\sin\alpha$ | $\dfrac{1}{\tan\alpha}$ |
| $270^\circ+\alpha$ | $-\cos\alpha$ | $\sin\alpha$ | $-\dfrac{1}{\tan\alpha}$ |
| $360^\circ-\alpha$ | $-\sin\alpha$ | $\cos\alpha$ | $-\tan\alpha$ |
| $360^\circ+\alpha$ | $\sin\alpha$ | $\cos\alpha$ | $\tan\alpha$ |

记忆要点：$90^\circ$、$270^\circ$ 组 $\sin\leftrightarrow\cos$ 互换（余函数），$180^\circ$、$360^\circ$ 组函数名不变。**符号由变换前的三角函数决定**：把变换后的角（如 $90^\circ+\alpha$、$180^\circ-\alpha$）当作新角，看它落在哪个象限，按 ASTC 判断变换前的函数（如 $\sin$、$\cos$、$\tan$）在该象限的正负，将符号写在新函数前。

> 口诀：**九十、二百七，余函数互换；一百八、三百六，函数名不变。符号看变换后之角，ASTC 定原函数正负。**

例如 $\sin(90^\circ+\alpha)$：新函数是 $\cos$，变换后的角 $90^\circ+\alpha$ 在第二象限，变换前的函数 $\sin$ 在第二象限为正，故 $\sin(90^\circ+\alpha)=+\cos\alpha$。若误按新函数 $\cos$ 判号，会错得负号，这是最容易出错的一步。

此外，$360^\circ+\alpha$ 与 $\alpha$ 终边相同（§26.2.1 的终边相同角），即 $\sin(360^\circ+\alpha)\equiv\sin\alpha$、$\cos(360^\circ+\alpha)\equiv\cos\alpha$、$\tan(360^\circ+\alpha)\equiv\tan\alpha$，它与 $360^\circ-\alpha$ 一并构成 $360^\circ$ 组的完整诱导公式，也是最小正周期 $360^\circ$ 在图像上的体现（§26.2.6）。

### 26.2.6　三角函数的周期性与解三角方程

````ad-thm
title: 定理（周期性） | Theorem（Periodicity）

1. $\sin(\theta+360^\circ) \equiv \sin\theta$，$\cos(\theta+360^\circ) \equiv \cos\theta$，最小正周期 $T=360^\circ$。
2. $\tan(\theta+180^\circ) \equiv \tan\theta$，最小正周期 $T=180^\circ$。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% P at theta = 50 deg, opposite point at theta+180 deg
\coordinate (P) at (0.643,0.766);
\coordinate (Pp) at (-0.643,-0.766);
\draw[blue, thick] (0,0) -- (P);
\draw[red, thick] (0,0) -- (Pp);
\filldraw[blue] (P) circle (1.5pt);
\filldraw[red] (Pp) circle (1.5pt);
% rotation arc at O (partial turn)
\draw[->, gray, thick] (0.3,0) arc (0:50:0.3);
\node[blue, above right] at (P) {$P(x,y)$};
\node[red, below left] at (Pp) {$P'(-x,-y)$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-6：周期性的几何本质是旋转。设角 $\theta$ 的终边点为 $P(x,y)$：转满 $360^\circ$ 终边回到同一点 $P(x,y)$，转 $180^\circ$ 到对径点 $P'(-x,-y)$。

````ad-proof
title: 证明 | Proof

旋转 $360^\circ$ 后终边回到单位圆上同一点，故 $\sin(\theta+360^\circ)=\sin\theta$、$\cos(\theta+360^\circ)=\cos\theta$。旋转 $180^\circ$ 后终边点变为 $P'(-x,-y)$，此时 $\tan$ 值 $\dfrac{-y}{-x}=\dfrac{y}{x}$ 不变，故 $\tan(\theta+180^\circ)=\tan\theta$。

最小性可用反证法验证。

1. 以 $\sin$ 为例：若存在正周期 $T<360^\circ$，则 $\sin(\theta+T)\equiv\sin\theta$ 对所有 $\theta$ 成立，代入 $\theta=0$ 得 $\sin T=0$，在 $0<T<360^\circ$ 内解得 $T=180^\circ$。
但 $\sin(\theta+180^\circ)\equiv-\sin\theta$，对 $\sin\theta\neq0$ 的 $\theta$ 不恒等于 $\sin\theta$，矛盾，故 $360^\circ$ 是 $\sin$ 的最小正周期。

2. $\cos$ 同理（代入 $\theta=0$ 得 $\cos T=1$，在 $0<T<360^\circ$ 内无解）；

3. $\tan$ 若存在正周期 $T<180^\circ$，代入 $\theta=0$ 得 $\tan T=0$，而 $0<T<180^\circ$ 内 $\tan T=0$ 无解（$T=90^\circ$ 处无定义），矛盾，故 $180^\circ$ 是 $\tan$ 的最小正周期。
````


周期性是解三角方程的理论基础：方程的一个解会「复制」出无穷多个解。

````ad-thm
title: 定理（三角方程的通解公式） | Theorem（General Solutions of Trigonometric Equations）

1. 若 $\sin\theta=\sin\alpha$，则 $\theta=\alpha+360^\circ k$ 或 $\theta=180^\circ-\alpha+360^\circ k$（$k\in\mathbb{Z}$）。
2. 若 $\cos\theta=\cos\alpha$，则 $\theta=\pm\alpha+360^\circ k$（$k\in\mathbb{Z}$）。
3. 若 $\tan\theta=\tan\alpha$，则 $\theta=\alpha+180^\circ k$（$k\in\mathbb{Z}$）。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% horizontal line y = sin(50 deg) = 0.766
\draw[dashed, gray, thick] (-1.35,0.766) -- (1.35,0.766);
\coordinate (P1) at (0.643,0.766);
\coordinate (P2) at (-0.643,0.766);
\filldraw[blue] (P1) circle (1.6pt);
\filldraw[red] (P2) circle (1.6pt);
\draw[blue, thick] (0,0) -- (P1);
\draw[red, thick] (0,0) -- (P2);
\node[blue,above right] at (P1) {$\alpha$};
\node[red,above left] at (P2) {$180^{\circ}-\alpha$};
\node[left] at (-1.8,0.766) {$\sin\alpha$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-7：解 $\sin\theta=\sin\alpha$ 等价于「在单位圆上找纵坐标等于 $\sin\alpha$ 的点」。水平线恰好与单位圆交于角 $\alpha$ 与 $180^\circ-\alpha$ 两个终边点。

````ad-proof
title: 证明 | Proof

1. 单位圆上纵坐标 $y=\sin\alpha$ 的点有两个：角 $\alpha$ 与角 $180^\circ-\alpha$ 的终边点。连同它们的终边相同角（各加 $360^\circ k$），即得 $\theta=\alpha+360^\circ k$ 或 $\theta=180^\circ-\alpha+360^\circ k$。
2. 单位圆上横坐标 $x=\cos\alpha$ 的点有两个：角 $\alpha$ 与角 $-\alpha$ 的终边点，故 $\theta=\pm\alpha+360^\circ k$。
3. 因 $\tan$ 的周期为 $180^\circ$，$\tan\theta=\tan\alpha$ 的解为 $\theta=\alpha+180^\circ k$。
````

通解公式刻画了三角方程的全部解，而实际问题通常只要求指定范围（最常见 $0^\circ\le\theta<360^\circ$）内的那几组解。解法的理论依据就是前面已经建立的定理，不需要引入任何新概念：$k$ 的符号经 ASTC 法则定出解所在的象限，从而知道每组周期内有几个解；化锐角公式背后的单位圆对称（$\sin$ 值关于 $y$ 轴镜像不变、$\cos$ 值关于 $x$ 轴镜像不变、$\tan$ 值随终边共线不变）保证每个象限的解都能写成一个角的三角值；通解公式则把单个解展开为全体解。流程固定为四步：**判解况 → 找特解 → 通解展开 → 限范围**，称为**通解法（general solution method）**。下面对 $\sin\theta=k$、$\cos\theta=k$、$\tan\theta=k$ 三类方程逐个演示，每一类配一个贯穿例子，并在讨论后总结算法。

**解 $\sin\theta=k$**

**判解况**：$\sin$ 的值域是 $[-1,1]$，故 $|k|>1$ 时无解。边界值可直接由单位圆读出：在 $0^\circ\le\theta<360^\circ$ 内，$\sin\theta=1$ 仅当 $\theta=90^\circ$，$\sin\theta=-1$ 仅当 $\theta=270^\circ$，$\sin\theta=0$ 当 $\theta=0^\circ,180^\circ$。

**找特解**：对 $0<|k|<1$，只需找**任意一个**满足 $\sin\alpha=k$ 的角 $\alpha$。特殊值可由特殊角表与化锐角公式直接写出（例如 $\sin(-30^\circ)\equiv-\sin 30^\circ=-\dfrac12$）；其余数值用计算器给出一个使 $\sin\alpha=k$ 的角（$\sin$ 情形计算器返回的角在 $[-90^\circ,90^\circ]$ 内）。特解的取法不唯一，取哪一个都不影响最终解集，只影响解的书写形式。

**通解展开**：把特解 $\alpha$ 代入通解公式：若 $\sin\theta=\sin\alpha$，则 $\theta=\alpha+360^\circ n$ 或 $\theta=180^\circ-\alpha+360^\circ n$（$n\in\mathbb{Z}$）。两支的由来正是化锐角公式的对称几何：第一支是同终边角（周期性），第二支 $180^\circ-\alpha$ 是 $\alpha$ 关于 $y$ 轴的镜像角，$\sin(180^\circ-\alpha)\equiv\sin\alpha$（$180^\circ$ 组）保证两支同值（图 26-7：水平线 $y=k$ 与单位圆恰交于这样两个终边点）。

**限范围**：取适当的 $n$ 把两支解化入指定范围（通常 $0^\circ\le\theta<360^\circ$）。用 ASTC 自查：$k>0$ 时解应在第一、二象限，$k<0$ 时在第三、四象限，两组解互为 $y$ 轴镜像，一支都不能缺。

**贯穿例**：解 $\sin\theta=-\dfrac12$（$0^\circ\le\theta<360^\circ$）。判解况：$\left|-\dfrac12\right|<1$，有解且非边界值；找特解：由 $\sin(-30^\circ)\equiv-\sin 30^\circ=-\dfrac12$（$-\alpha$ 行），取 $\alpha=-30^\circ$；通解展开：$\theta=-30^\circ+360^\circ n$ 或 $\theta=180^\circ-(-30^\circ)+360^\circ n=210^\circ+360^\circ n$；限范围：第一支取 $n=1$ 得 $330^\circ$，第二支取 $n=0$ 得 $210^\circ$，故 $\theta=210^\circ$ 或 $330^\circ$。自查：$k<0$，解落在第三、四象限，与 ASTC 一致。

把 $\sin\theta=k$ 的解汇总如下（$n\in\mathbb{Z}$，$\alpha$ 为满足 $\sin\alpha=k$ 的任一特解）：

| 条件 | 全部解（通解） | $0^\circ\le\theta<360^\circ$ 内 | 解的个数 |
| :---: | :---: | :---: | :---: |
| $\lvert k\rvert>1$ | 无解 | 无解 | $0$ |
| $k=1$ | $\theta=90^\circ+360^\circ n$ | $90^\circ$ | $1$ |
| $0<k<1$ | $\theta=\alpha+360^\circ n$ 或 $180^\circ-\alpha+360^\circ n$ | 第一、二象限各一组 | $2$ |
| $k=0$ | $\theta=180^\circ n$ | $0^\circ$，$180^\circ$ | $2$ |
| $-1<k<0$ | $\theta=\alpha+360^\circ n$ 或 $180^\circ-\alpha+360^\circ n$ | 第三、四象限各一组 | $2$ |
| $k=-1$ | $\theta=270^\circ+360^\circ n$ | $270^\circ$ | $1$ |

````ad-alg
title: 算法（通解法：解 $\sin\theta=k$） | Algorithm（General Solution Method: Solving $\sin\theta=k$）

1. **判解况**：若 $|k|>1$，无解；若 $k=0,\pm1$，由上表直接写出解；否则进入第 2 步。
2. **找特解**：任取一个满足 $\sin\alpha=k$ 的角 $\alpha$（特殊值用特殊角表与化锐角公式，其余用计算器）。
3. **通解展开**：$\theta=\alpha+360^\circ n$ 或 $\theta=180^\circ-\alpha+360^\circ n$（$n\in\mathbb{Z}$）。
4. **限范围**：取适当的 $n$ 把两支解化入指定范围（通常 $0^\circ\le\theta<360^\circ$），按 ASTC 自查象限与解数。
````

````ad-example
title: 示例 | Example

解方程 $\sin\theta=\dfrac12$，其中 $0^\circ\le\theta<360^\circ$。

---

判解况：$\left|\dfrac12\right|<1$，有解且非边界值。

找特解：查特殊角表得 $\alpha=30^\circ$。

通解展开：$\theta=30^\circ+360^\circ n$ 或 $\theta=150^\circ+360^\circ n$。

限范围：两支取 $n=0$，得 $\theta=30^\circ$ 或 $150^\circ$。

自查：$k>0$，$30^\circ$、$150^\circ$ 分居第一、二象限。

（若只写 $30^\circ$ 就漏了第二象限的 $150^\circ$。通解公式的两支各对应一个象限，一支都不能丢。）
````

````ad-example
title: 示例 | Example

解下列方程，其中 $0^\circ\le\theta<360^\circ$：

(1) $\sin\theta=1$；

(2) $\sin\theta=1.5$。

---

1. $k=1$ 为边界值：在 $0^\circ\le\theta<360^\circ$ 内，$\sin\theta=1$ 仅当 $\theta=90^\circ$。
2. $\sin$ 的值域为 $[-1,1]$，而 $1.5>1$，故方程无解。
````

**解 $\cos\theta=k$**

流程与 $\sin$ 完全平行，只换两处：值域判定同为 $[-1,1]$；展开对称改用 $\cos$ 的 $x$ 轴镜像，即 $\cos(-\alpha)\equiv\cos\alpha$（$-\alpha$ 行，与 $\cos(360^\circ-\alpha)\equiv\cos\alpha$ 等价，因两者终边相同），于是通解为 $\theta=\pm\alpha+360^\circ n$（$n\in\mathbb{Z}$）。

**判解况**：$|k|>1$ 时无解；边界值在 $0^\circ\le\theta<360^\circ$ 内：$\cos\theta=1$ 仅当 $\theta=0^\circ$，$\cos\theta=-1$ 仅当 $\theta=180^\circ$，$\cos\theta=0$ 当 $\theta=90^\circ,270^\circ$。

**找特解**：任取满足 $\cos\alpha=k$ 的角（特殊值用特殊角表与化锐角公式；其余用计算器，$\cos$ 情形计算器返回的角在 $[0^\circ,180^\circ]$ 内）。

**通解展开与限范围**：$\theta=\alpha+360^\circ n$ 或 $\theta=-\alpha+360^\circ n$；取适当的 $n$ 化入指定范围。按 ASTC 自查：$k>0$ 时解在第一、四象限，$k<0$ 时在第二、三象限，两支互为 $x$ 轴镜像（图 26-7B：竖直线 $x=k$ 与单位圆的两个交点）。

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% vertical line x = cos(50 deg) = 0.643
\draw[dashed, gray, thick] (0.643,-1.35) -- (0.643,1.35);
\coordinate (P1) at (0.643,0.766);
\coordinate (P2) at (0.643,-0.766);
\filldraw[blue] (P1) circle (1.6pt);
\filldraw[red] (P2) circle (1.6pt);
\draw[blue, thick] (0,0) -- (P1);
\draw[red, thick] (0,0) -- (P2);
\node[blue, above right] at (P1) {$\alpha$};
\node[red, below right] at (P2) {$360^{\circ}-\alpha$};
\node[below] at (0.643,-1.42) {$\cos\alpha$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-7B：$\cos$ 是终边点的横坐标，解 $\cos\theta=\cos\alpha$ 等价于「在单位圆上找横坐标等于 $\cos\alpha$ 的点」。竖直线恰好与单位圆交于角 $\alpha$ 与 $360^\circ-\alpha$ 两个终边点；若 $k<0$，竖直直线移到 $y$ 轴左侧，交点对应第二、三象限。

**贯穿例**：解 $\cos\theta=\dfrac{\sqrt2}{2}$（$0^\circ\le\theta<360^\circ$）。有解且非边界值；查特殊角表取特解 $\alpha=45^\circ$；通解展开：$\theta=45^\circ+360^\circ n$ 或 $\theta=-45^\circ+360^\circ n$；限范围：第一支取 $n=0$ 得 $45^\circ$，第二支取 $n=1$ 得 $315^\circ$，故 $\theta=45^\circ$ 或 $315^\circ$。自查：$k>0$，解分居第一、四象限。

把 $\cos\theta=k$ 的解汇总如下（$n\in\mathbb{Z}$，$\alpha$ 为满足 $\cos\alpha=k$ 的任一特解）：

| 条件 | 全部解（通解） | $0^\circ\le\theta<360^\circ$ 内 | 解的个数 |
| :---: | :---: | :---: | :---: |
| $\lvert k\rvert>1$ | 无解 | 无解 | $0$ |
| $k=1$ | $\theta=360^\circ n$ | $0^\circ$ | $1$ |
| $0<k<1$ | $\theta=\pm\alpha+360^\circ n$ | 第一、四象限各一组 | $2$ |
| $k=0$ | $\theta=90^\circ+180^\circ n$ | $90^\circ$，$270^\circ$ | $2$ |
| $-1<k<0$ | $\theta=\pm\alpha+360^\circ n$ | 第二、三象限各一组 | $2$ |
| $k=-1$ | $\theta=180^\circ+360^\circ n$ | $180^\circ$ | $1$ |

````ad-alg
title: 算法（通解法：解 $\cos\theta=k$） | Algorithm（General Solution Method: Solving $\cos\theta=k$）

1. **判解况**：若 $|k|>1$，无解；若 $k=0,\pm1$，由上表直接写出解；否则进入第 2 步。
2. **找特解**：任取一个满足 $\cos\alpha=k$ 的角 $\alpha$（特殊值用特殊角表与化锐角公式，其余用计算器）。
3. **通解展开**：$\theta=\pm\alpha+360^\circ n$（$n\in\mathbb{Z}$）。
4. **限范围**：取适当的 $n$ 把两支解化入指定范围（通常 $0^\circ\le\theta<360^\circ$），按 ASTC 自查象限与解数。
````

````ad-example
title: 示例 | Example

解方程 $\cos\theta=-\dfrac{\sqrt3}{2}$，其中 $0^\circ\le\theta<360^\circ$。

---

有解且非边界值。找特解：由 $\cos(180^\circ-30^\circ)\equiv-\cos 30^\circ=-\dfrac{\sqrt3}{2}$（$180^\circ$ 组），取 $\alpha=150^\circ$。通解展开：$\theta=150^\circ+360^\circ n$ 或 $\theta=-150^\circ+360^\circ n$。限范围：第一支取 $n=0$ 得 $150^\circ$，第二支取 $n=1$ 得 $210^\circ$，故 $\theta=150^\circ$ 或 $210^\circ$。自查：$k<0$，解在第二、三象限。
````

**解 $\tan\theta=k$**

$\tan\theta=k$ 与前两类有两点不同。其一，$\tan$ 的值域是全体实数，故对任意实数 $k$ 都有解，判解况永不淘汰。其二，$\tan$ 值的对称是终边共线：$\tan(180^\circ+\alpha)\equiv\tan\alpha$（$180^\circ$ 组），同一条过原点的直线与单位圆的两个交点恰相差 $180^\circ$（图 26-7C），因此通解 $\theta=\alpha+180^\circ n$ 只有一支，在 $0^\circ\le\theta<360^\circ$ 内恒有两组解。另需注意：$\tan$ 在 $\theta=90^\circ,270^\circ$ 无定义，写出的解必须避开这两个角。

**找特解**：$k=0$ 时取 $\alpha=0^\circ$；$k\neq0$ 时由特殊角表与化锐角公式写出，或用计算器（$\tan$ 情形计算器返回的角在 $(-90^\circ,90^\circ)$ 内）。

**通解展开与限范围**：$\theta=\alpha+180^\circ n$（$n\in\mathbb{Z}$），取 $n=0,1$ 即得 $[0^\circ,360^\circ)$ 内的两组解。按 ASTC 自查：$k>0$ 时解在第一、三象限，$k<0$ 时在第二、四象限，两组解在同一条过原点的直线上。

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
% coordinate axes
\draw[->] (-1.4,0) -- (1.4,0) node[right]{$x$};
\draw[->] (0,-1.4) -- (0,1.4) node[above]{$y$};
% unit circle
\draw[thick] (0,0) circle (1);
% terminal-side line through O with slope tan(50 deg) = 1.19 (k > 0 case)
\draw[thick, blue!70!black] (-0.739,-0.881) -- (0.739,0.881);
\coordinate (P1) at (0.643,0.766);
\coordinate (P2) at (-0.643,-0.766);
\filldraw[blue] (P1) circle (1.6pt);
\filldraw[red] (P2) circle (1.6pt);
\node[blue, above right] at (P1) {$\alpha$};
\node[red, below left] at (P2) {$180^{\circ}+\alpha$};
\node[blue!70!black, above right] at (0.8,0.98) {$y=(\tan\alpha)\,x$};
\node[below left] at (0,0) {$O$};
\end{tikzpicture}
\end{document}
```

> 图 26-7C：$\tan\theta=\tan\alpha$（$k>0$）的终边都落在同一条过原点的直线 $y=(\tan\alpha)x$ 上，直线与单位圆的两个交点即 $0^\circ\le\theta<360^\circ$ 内的两组解 $\alpha$ 与 $180^\circ+\alpha$；若 $k<0$，直线穿过第二、四象限，同理得两组解。

**贯穿例**：解 $\tan\theta=\sqrt3$（$0^\circ\le\theta<360^\circ$）。任意实数 $k$ 均有解；查特殊角表取特解 $\alpha=60^\circ$；通解展开：$\theta=60^\circ+180^\circ n$；限范围：$n=0$ 得 $60^\circ$，$n=1$ 得 $240^\circ$，故 $\theta=60^\circ$ 或 $240^\circ$。自查：$k>0$，解分居第一、三象限。

把 $\tan\theta=k$ 的解汇总如下（$n\in\mathbb{Z}$，$\alpha$ 为满足 $\tan\alpha=k$ 的任一特解）：

| 条件 | 全部解（通解） | $0^\circ\le\theta<360^\circ$ 内 | 解的个数 |
| :---: | :---: | :---: | :---: |
| $k>0$ | $\theta=\alpha+180^\circ n$ | 第一、三象限各一组 | $2$ |
| $k=0$ | $\theta=180^\circ n$ | $0^\circ$，$180^\circ$ | $2$ |
| $k<0$ | $\theta=\alpha+180^\circ n$ | 第二、四象限各一组 | $2$ |

````ad-alg
title: 算法（通解法：解 $\tan\theta=k$） | Algorithm（General Solution Method: Solving $\tan\theta=k$）

1. **判解况**：对任意实数 $k$ 均有解；若 $k=0$，解为 $\theta=180^\circ n$。
2. **找特解**：任取一个满足 $\tan\alpha=k$ 的角 $\alpha$（特殊值用特殊角表与化锐角公式，其余用计算器）。
3. **通解展开**：$\theta=\alpha+180^\circ n$（$n\in\mathbb{Z}$，单支）。
4. **限范围**：取 $n=0,1$ 得 $[0^\circ,360^\circ)$ 内的两组解（相差 $180^\circ$），按 ASTC 自查并排除 $90^\circ,270^\circ$。
````

````ad-example
title: 示例 | Example

解方程 $\tan\theta=-1$，其中 $0^\circ\le\theta<360^\circ$。

---

找特解：由 $\tan(180^\circ-45^\circ)\equiv-\tan 45^\circ=-1$（$180^\circ$ 组），取 $\alpha=135^\circ$。通解展开：$\theta=135^\circ+180^\circ n$。限范围：$n=0$ 得 $135^\circ$，$n=1$ 得 $315^\circ$，故 $\theta=135^\circ$ 或 $315^\circ$。自查：$k<0$，解在第二、四象限。
````

最后强调两点。其一，特解的取法不影响结果：以 $\sin\theta=-\dfrac12$ 为例，若取 $\alpha=210^\circ$，通解为 $210^\circ+360^\circ n$ 与 $-30^\circ+360^\circ n$；若取 $\alpha=330^\circ$，通解为 $330^\circ+360^\circ n$ 与 $-150^\circ+360^\circ n$。两组写法只是支与支对调、角与角同终边，解集完全相同。这正是通解公式对任意角 $\alpha$ 成立所带来的自由。其二，上述解集都是「$0^\circ\le\theta<360^\circ$ 内的解」；在其他范围求解，先把通解写出，再按范围截取 $n$。若所给范围是 $0^\circ\le\theta\le360^\circ$ 这类闭区间，还需检查端点 $\theta=360^\circ$ 是否为解。

当方程同时出现多种三角函数时（如 $\sin$ 与 $\cos$ 同时出现），通解法不能直接套用，需要先用恒等式把方程统一为单一三角函数，再回到通解法，这就是**恒等式转换法（solving via identity substitution）**。

````ad-alg
title: 算法（恒等式转换法） | Algorithm（Solving via Identity Substitution）

用 $\sin^2\theta+\cos^2\theta \equiv 1$ 等恒等式将方程统一为同一种三角函数的代数方程，解出三角函数值后再用通解法求角度。因变形可能引入增根，须代入检验。
````


````ad-example
title: 示例 | Example

解方程 $2\cos^2\theta+\sin\theta-1=0$，其中 $0^\circ\le\theta<360^\circ$。

---

由 $\cos^2\theta=1-\sin^2\theta$ 代入：$2(1-\sin^2\theta)+\sin\theta-1=0$，即 $2\sin^2\theta-\sin\theta-1=0$，分解得 $(2\sin\theta+1)(\sin\theta-1)=0$，故 $\sin\theta=-\dfrac{1}{2}$ 或 $\sin\theta=1$。

- $\sin\theta=-\dfrac{1}{2}$：取特解 $\alpha=-30^\circ$，通解 $\theta=-30^\circ+360^\circ n$ 或 $\theta=210^\circ+360^\circ n$，限于 $[0^\circ,360^\circ)$ 得 $\theta=330^\circ$ 或 $210^\circ$。
- $\sin\theta=1$：$\theta=90^\circ$。

综上 $\theta=90^\circ,210^\circ,330^\circ$（代入原方程检验均成立）。
````

---

## 26.3　三角函数的图像（Graphs of Trigonometric Functions）

> **本节难度上限**：T B ｜ C C ｜ E C ｜ Q C

> 本节掌握正弦、余弦、正切函数的图像特征，通过图像直观理解周期性、对称性与图像变换。自变量 $\theta$ 以度计。

### 26.3.1　正弦、余弦、正切的图像

有了 §26.2 的周期性，就可以把正弦、余弦、正切的图像画出来了。三者的图像各有特点：正弦是「波浪线」，余弦与它形状相同、只是水平错开 $90^\circ$，正切则被垂直渐近线切成一段段上升的弧线。下面逐个讨论。

先看正弦。图像不是「定理」直接掉下来的，而是来自 §26.2 的定义：取若干角度，逐点代入算出纵坐标，标出散点，再用平滑曲线串联。在 $0^\circ\le\theta\le360^\circ$ 上取关键角（来自[[Chapter 9 三角学(I)|三角学(I)]] 的特殊角精确值）：

| $\theta$ | $0^\circ$ | $30^\circ$ | $90^\circ$ | $150^\circ$ | $180^\circ$ | $210^\circ$ | $270^\circ$ | $330^\circ$ | $360^\circ$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $\sin\theta$ | $0$ | $\dfrac12$ | $1$ | $\dfrac12$ | $0$ | $-\dfrac12$ | $-1$ | $-\dfrac12$ | $0$ |

先在坐标系中标出这九个点，再用平滑曲线把它们串联起来，就得到 $[0^\circ,360^\circ]$ 上的正弦曲线。其余各点的值介于这些关键点之间（可用计算器估算），曲线自然连续。下图（图 26-8）即是用电脑绘出的完整正弦曲线，散点已连成形状。

曲线画出来后，值域、周期、奇偶性、零点与极值都能直接从图像上看出来：

- 值域 $[-1,1]$；周期 $360^\circ$。
- 奇函数：$\sin(-\theta)\equiv-\sin\theta$（图像关于原点对称）。
- 零点：$\theta=180^\circ k$；极大值 $1$ 于 $\theta=90^\circ+360^\circ k$；极小值 $-1$ 于 $\theta=270^\circ+360^\circ k$。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=5cm,
    xmin=-380, xmax=380,
    ymin=-1.4, ymax=1.4,
    xtick={-360,-270,-180,-90,0,90,180,270,360},
    xticklabels={$-360^{\circ}$,$-270^{\circ}$,$-180^{\circ}$,$-90^{\circ}$,$0^{\circ}$,$90^{\circ}$,$180^{\circ}$,$270^{\circ}$,$360^{\circ}$},
    ytick={-1,0,1},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,scale = 2
]
\addplot[domain=-360:360, blue, very thick] {sin(x)};
\node[blue] at (axis cs:230,0.72) {$y=\sin\theta$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-8：$y=\sin\theta$ 的图像（$[-360^\circ,360^\circ]$）。波形在 $[-1,1]$ 间振荡，周期 $360^\circ$。

余弦的图像可同样描点得到（$0^\circ\to1$、$90^\circ\to0$、$180^\circ\to-1$、$270^\circ\to0$、$360^\circ\to1$），也可由相位关系从正弦平移而来（§26.3.2 详述）。曲线画出来后，性质同样从图像上读出：

- 值域 $[-1,1]$；周期 $360^\circ$。
- 偶函数：$\cos(-\theta)\equiv\cos\theta$（图像关于 $y$ 轴对称）。
- 零点：$\theta=90^\circ+180^\circ k$；极大值 $1$ 于 $\theta=360^\circ k$；极小值 $-1$ 于 $\theta=180^\circ+360^\circ k$。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=5cm,
    xmin=-380, xmax=380,
    ymin=-1.4, ymax=1.4,
    xtick={-360,-270,-180,-90,0,90,180,270,360},
    xticklabels={$-360^{\circ}$,$-270^{\circ}$,$-180^{\circ}$,$-90^{\circ}$,$0^{\circ}$,$90^{\circ}$,$180^{\circ}$,$270^{\circ}$,$360^{\circ}$},
    ytick={-1,0,1},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,scale = 2
]
\addplot[domain=-360:360, red, very thick] {cos(x)};
\node[red] at (axis cs:210,-0.72) {$y=\cos\theta$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-9：$y=\cos\theta$ 的图像（$[-360^\circ,360^\circ]$）。与正弦波形相同，只是水平错开 $90^\circ$。

正切与前两者有本质不同：它的值域是全体实数，且在 $\theta=90^\circ+180^\circ k$ 处无定义。先取 $\theta=0^\circ,\pm45^\circ$ 及接近 $90^\circ$ 的值（如 $89^\circ,91^\circ$）描点，会「看到」$y$ 随 $\theta$ 逼近 $90^\circ$ 而趋向无穷，图像在 $\theta=90^\circ+180^\circ k$ 处被垂直渐近线隔开。曲线画出来后，性质同样从图像上读出：

- 值域 $\mathbb{R}$；周期 $180^\circ$。
- 奇函数：$\tan(-\theta)\equiv-\tan\theta$。
- 垂直渐近线 $\theta=90^\circ+180^\circ k$；零点 $\theta=180^\circ k$；在每个区间 $(-90^\circ+180^\circ k,\;90^\circ+180^\circ k)$ 内严格递增。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=6cm,
    xmin=-380, xmax=380,
    ymin=-4, ymax=4,
    xtick={-360,-270,-180,-90,0,90,180,270,360},
    xticklabels={$-360^{\circ}$,$-270^{\circ}$,$-180^{\circ}$,$-90^{\circ}$,$0^{\circ}$,$90^{\circ}$,$180^{\circ}$,$270^{\circ}$,$360^{\circ}$},
    ytick={-3,-1,0,1,3},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,scale = 2
]
\addplot[domain=-360:-271, orange, very thick] {tan(x)};
\addplot[domain=-269:-91, orange, very thick] {tan(x)};
\addplot[domain=-89:89, orange, very thick] {tan(x)};
\addplot[domain=91:269, orange, very thick] {tan(x)};
\addplot[domain=271:360, orange, very thick] {tan(x)};
% vertical asymptotes
\draw[dashed, gray] (axis cs:-270,-4) -- (axis cs:-270,4);
\draw[dashed, gray] (axis cs:-90,-4) -- (axis cs:-90,4);
\draw[dashed, gray] (axis cs:90,-4) -- (axis cs:90,4);
\draw[dashed, gray] (axis cs:270,-4) -- (axis cs:270,4);
\node[orange] at (axis cs:250,2.2) {$y=\tan\theta$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-10：$y=\tan\theta$ 的图像。在各区间内递增，被垂直渐近线 $\theta=90^\circ+180^\circ k$ 隔开，周期 $180^\circ$。

````ad-example
title: 示例 | Example

写出 $y=\sin\theta$ 在 $[0^\circ,360^\circ]$ 上的零点、极大值点与极小值点。

---

零点：$\theta=0^\circ,180^\circ,360^\circ$。极大值点：$(90^\circ,1)$。极小值点：$(270^\circ,-1)$。
````

### 26.3.2　周期性在图像上的表现

在 §26.2.5 的 $90^\circ$ 组诱导公式中，$\sin(90^\circ+\theta)\equiv\cos\theta$，即 $\cos\theta\equiv\sin(\theta+90^\circ)$。这告诉我们：余弦曲线就是把正弦曲线向左平移 $90^\circ$ 的结果（下图）。反过来 $\sin\theta\equiv\cos(\theta-90^\circ)$，正弦曲线也是余弦曲线向右平移 $90^\circ$ 的结果。相位关系本质上就是诱导公式在图像上的翻译，由 §26.2.5 的 $90^\circ+\alpha$ 一行直接得到，无需另证。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=5cm,
    xmin=0, xmax=380,
    ymin=-1.4, ymax=1.4,
    xtick={0,90,180,270,360},
    xticklabels={$0^{\circ}$,$90^{\circ}$,$180^{\circ}$,$270^{\circ}$,$360^{\circ}$},
    ytick={-1,0,1},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,
    scale = 2
]
\addplot[domain=0:360, blue, very thick] {sin(x)};
\addplot[domain=0:360, red, very thick] {cos(x)};
\node[blue] at (axis cs:250,0.65) {$y=\sin\theta$};
\node[red] at (axis cs:130,-0.75) {$y=\cos\theta$};
\draw[<->, gray] (axis cs:90,1.28) -- (axis cs:0,1.28);
\node[gray] at (axis cs:45,1.4) {$90^{\circ}$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-11：相位关系。$y=\cos\theta$（红色）是 $y=\sin\theta$（蓝色）向左平移 $90^\circ$ 的结果。

这个平移的画面，正是[[Chapter 19 函数及其图像|函数及其图像]] 中「函数变换」的一个实例。回忆 Ch19：对一般函数 $y=f(\theta)$，$y=Af(B\theta+C)+D$ 中四个参数各司其职，$A$ 控制竖直拉伸（负 $A$ 还含关于 $\theta$ 轴的反射），$B$ 控制水平伸缩，$+\dfrac{C}{B}$ 控制水平平移，$+D$ 控制竖直平移。刚看到的相位关系恰好就是这套语言的一个实例：$\cos\theta=\sin(\theta+90^\circ)$ 是把 $y=\sin\theta$ 向左平移 $90^\circ$，并非正弦特有的巧合。

既然平移可以做，拉伸、压缩、反射当然也可以。把这些变换组合起来作用于 $y=\sin\theta$，就得到 $y=A\sin(B\theta+C)+D$ 这个「最基本的形式」；逐个弄清四个参数对应的几何效果，就是下面的定理。

````ad-thm
title: 定理（图像变换） | Theorem（Graph Transformations）

对于 $y=A\sin(B\theta+C)+D$（$A,B\neq0$，$\theta$ 以度计）：

- $|A|$ 为**振幅（amplitude）**。
- 周期 $T=\dfrac{360^\circ}{|B|}$。
- 相位平移 $-\dfrac{C}{B}$（水平方向，度）。
- 垂直平移 $D$。
````

````ad-proof
title: 证明 | Proof

用[[Chapter 19 函数及其图像|函数及其图像]] 的**变换链**证明。改写

$$y=A\sin(B\theta+C)+D=A\sin\!\left(B\left(\theta+\dfrac{C}{B}\right)\right)+D,$$

则从 $y=\sin\theta$ 出发的变换链为

$$\sin\theta \xrightarrow{\text{水平伸缩：}\,\theta\mapsto B\theta} \sin(B\theta) \xrightarrow{\text{水平平移：}\,\theta\mapsto\theta+\frac{C}{B}} \sin(B\theta+C) \xrightarrow{\text{竖直伸缩：}\,y\mapsto Ay} A\sin(B\theta+C) \xrightarrow{\text{竖直平移：}\,y\mapsto y+D} A\sin(B\theta+C)+D.$$

逐步验证：

1. **水平伸缩**：$\sin\theta$ 的周期为 $360^\circ$，经 $\theta\mapsto B\theta$ 后，$\sin(B\theta)$ 的周期 $T$ 满足 $|B|T=360^\circ$，即 $T=\dfrac{360^\circ}{|B|}$。
2. **水平平移**：$\sin(B\theta+C)=\sin\!\left(B\left(\theta+\dfrac{C}{B}\right)\right)$ 是 $\sin(B\theta)$ 向左平移 $\dfrac{C}{B}$，即相位平移 $-\dfrac{C}{B}$（如 $C=-90^\circ$、$B=3$ 时向右平移 $30^\circ$）。
3. **竖直伸缩**：$|\sin(B\theta+C)|\le1$，乘 $A$ 后值域为 $[-|A|,|A|]$，故振幅为 $|A|$；$A<0$ 时还关于 $\theta$ 轴反射。
4. **竖直平移**：$+D$ 将图像向上平移 $D$（$D>0$）。

余弦变换规律一致；正切 $y=A\tan(B\theta+C)+D$ 的周期为 $\dfrac{180^\circ}{|B|}$，无振幅概念。
````

````ad-example
title: 示例 | Example

用变换链演示 $y=2\sin(3\theta-90^\circ)+1$ 的生成过程，并读出振幅、周期、相位平移与垂直平移。

---

改写 $y=2\sin(3\theta-90^\circ)+1=2\sin\!\left(3\left(\theta-30^\circ\right)\right)+1$，变换链为

$$\sin\theta \xrightarrow{\text{水平伸缩：}\,\theta\mapsto3\theta} \sin 3\theta \xrightarrow{\text{水平平移：}\,\theta\mapsto\theta-30^\circ} \sin(3\theta-90^\circ) \xrightarrow{\text{竖直伸缩：}\,y\mapsto2y} 2\sin(3\theta-90^\circ) \xrightarrow{\text{竖直平移：}\,y\mapsto y+1} 2\sin(3\theta-90^\circ)+1.$$

- 振幅 $=|2|=2$；
- 周期 $=\dfrac{360^\circ}{|3|}=120^\circ$；
- 相位平移 $=-\dfrac{C}{B}=-\dfrac{-90^\circ}{3}=30^\circ$（向右平移 $30^\circ$）；
- 垂直平移 $=1$（向上平移 $1$）。
````

---

## 26.4　反三角函数（Inverse Trigonometric Functions）

> **本节难度上限**：T B ｜ C C ｜ E B ｜ Q C

> 三角函数因周期性非单射：同一函数值对应无穷多个角。为从函数值**唯一找回角度**，需将定义域限制到适当的**单调区间**，由此定义反正弦、反余弦、反正切（三角函数的逆变换）。本节掌握 $\arcsin,\arccos,\arctan$ 的定义域、值域及基本恒等式，反三角函数的值以角度给出。

### 26.4.1　定义

$\sin,\cos,\tan$ 作为函数均**非单射**：周期性导致同一 $y$ 值对应无穷多个角。回顾[[Chapter 25 指数函数与对数函数|指数函数与对数函数]] 引入对数的做法：指数函数**严格单调**，不同输入对应不同输出，故对值域中任一 $y=a^x$，其对应输入 $x$ 唯一，可定义一个「逆变换」从输出找回输入。

三角函数在**单调区间**上也满足同样性质：把定义域限制到一段单调区间后，不同角对应不同函数值，于是对值域中任一 $y$，对应的角唯一。反正弦、反余弦、反正切就是这样引入的。三个函数各有一段可用的单调区间：$\sin$ 在 $[-90^\circ,90^\circ]$ 上严格递增（值域覆盖 $[-1,1]$），$\cos$ 在 $[0^\circ,180^\circ]$ 上严格递减（值域覆盖 $[-1,1]$），$\tan$ 在 $(-90^\circ,90^\circ)$ 上严格递增（值域覆盖 $\mathbb{R}$）。这三段就是后面选作主值区间的候选，下面三图（图 26-12A/B/C）把它们逐一画出。

````ad-def
title: 定义（反正弦） | Definition（Arcsine）

设 $x\in[-1,1]$。若 $\sin\theta=x$ 且 $\theta\in[-90^\circ,90^\circ]$，则称 $\theta$ 为 $x$ 的**反正弦（arcsine）**，记作

$$\arcsin x=\theta \iff \sin\theta=x \qquad (\theta\in[-90^\circ,90^\circ])$$

亦记作 $\sin^{-1}x$。由 $\sin$ 在 $[-90^\circ,90^\circ]$ 上严格递增，满足条件的 $\theta$ 唯一。

> **注意：** $\sin^{-1}x\neq\dfrac{1}{\sin x}$，其中 $-1$ 是逆变换记号，不是指数。
````


**图 26-12A：限制 $\sin$ 到 $[-90^\circ,90^\circ]$（蓝色主值支）**

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=5cm,
    xmin=-200, xmax=200,
    ymin=-1.4, ymax=1.4,
    xtick={-180,-90,0,90,180},
    xticklabels={$-180^{\circ}$,$-90^{\circ}$,$0^{\circ}$,$90^{\circ}$,$180^{\circ}$},
    ytick={-1,0,1},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,
]
% full sine curve (light)
\addplot[domain=-180:180, gray!40, thick] {sin(x)};
% principal branch (bold)
\addplot[domain=-90:90, blue, very thick] {sin(x)};
% boundary of principal interval
\draw[dashed, gray] (axis cs:-90,-1) -- (axis cs:-90,1);
\draw[dashed, gray] (axis cs:90,-1) -- (axis cs:90,1);
\node[blue] at (axis cs:-130,0.9) {principal branch};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-12A：$\sin$ 的主值支 $[-90^\circ,90^\circ]$（蓝色加粗），其余部分（灰色）被舍去。


反正弦回答了「正弦等于 $x$ 的角」。类似地，反余弦回答「余弦等于 $x$ 的角」，它的主值区间选在 $\cos$ 单调递减的 $[0^\circ,180^\circ]$。

````ad-def
title: 定义（反余弦） | Definition（Arccosine）

设 $x\in[-1,1]$。若 $\cos\theta=x$ 且 $\theta\in[0^\circ,180^\circ]$，则称 $\theta$ 为 $x$ 的**反余弦（arccosine）**，记作

$$\arccos x=\theta \iff \cos\theta=x \qquad (\theta\in[0^\circ,180^\circ])$$

亦记作 $\cos^{-1}x$。由 $\cos$ 在 $[0^\circ,180^\circ]$ 上严格递减，满足条件的 $\theta$ 唯一。
````

**图 26-12B：限制 $\cos$ 到 $[0^\circ,180^\circ]$（红色主值支）**

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=5cm,
    xmin=-200, xmax=200,
    ymin=-1.4, ymax=1.4,
    xtick={-180,-90,0,90,180},
    xticklabels={$-180^{\circ}$,$-90^{\circ}$,$0^{\circ}$,$90^{\circ}$,$180^{\circ}$},
    ytick={-1,0,1},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,
]
% full cosine curve (light)
\addplot[domain=-180:180, gray!40, thick] {cos(x)};
% principal branch (bold)
\addplot[domain=0:180, red, very thick] {cos(x)};
% boundary of principal interval
\draw[dashed, gray] (axis cs:0,-1) -- (axis cs:0,1);
\draw[dashed, gray] (axis cs:180,-1) -- (axis cs:180,1);
\node[red] at (axis cs:-90,0.85) {principal branch};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-12B：$\cos$ 的主值支 $[0^\circ,180^\circ]$（红色加粗），其余部分（灰色）被舍去。


正切的值域是整个实数集，因此 $\arctan$ 的定义域是全体实数；它的主值区间选在 $\tan$ 单调递增的 $(-90^\circ,90^\circ)$。

````ad-def
title: 定义（反正切） | Definition（Arctangent）

设 $x\in\mathbb{R}$。若 $\tan\theta=x$ 且 $\theta\in(-90^\circ,90^\circ)$，则称 $\theta$ 为 $x$ 的**反正切（arctangent）**，记作

$$\arctan x=\theta \iff \tan\theta=x \qquad (\theta\in(-90^\circ,90^\circ))$$

亦记作 $\tan^{-1}x$。由 $\tan$ 在 $(-90^\circ,90^\circ)$ 上严格递增，满足条件的 $\theta$ 唯一。
````

````ad-note
title: 注记（与反三角比的关系） | Note（Relation to Inverse Trigonometric Ratios）

[[Chapter 9 三角学(I)|三角学(I)]] 中的 $\sin^{-1}$、$\cos^{-1}$、$\tan^{-1}$ 等为锐角范围内的角度记号。本章将反正弦、反余弦、反正切定义为完整的逆变换：$\arcsin$、$\arccos$、$\arctan$ 的值域分别含负角与 $[0^\circ,180^\circ]$，覆盖了锐角范围并推广到非锐角。反三角函数的输出是「角度」，经 §26.1 的换算亦可视为实数。
````


**图 26-12C：限制 $\tan$ 到 $(-90^\circ,90^\circ)$（橙色主值支）**

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=12cm, height=5cm,
    xmin=-200, xmax=200,
    ymin=-4, ymax=4,
    xtick={-180,-90,0,90,180},
    xticklabels={$-180^{\circ}$,$-90^{\circ}$,$0^{\circ}$,$90^{\circ}$,$180^{\circ}$},
    ytick={-3,-1,0,1,3},
    axis lines=middle,
    xlabel={$\theta$}, ylabel={$y$},
    samples=200,
]
% full tangent curves (light)
\addplot[domain=-180:-91, gray!40, thick] {tan(x)};
\addplot[domain=-89:89, gray!40, thick] {tan(x)};
\addplot[domain=91:180, gray!40, thick] {tan(x)};
% principal branch (bold)
\addplot[domain=-89:89, orange, very thick] {tan(x)};
% vertical asymptotes
\draw[dashed, gray] (axis cs:-90,-4) -- (axis cs:-90,4);
\draw[dashed, gray] (axis cs:90,-4) -- (axis cs:90,4);
\node[orange] at (axis cs:-140,3.2) {principal branch};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 26-12C：$\tan$ 的主值支 $(-90^\circ,90^\circ)$（橙色加粗），其余分支（灰色）被舍去。

这三段单调区间正是后面选作主值区间的候选：$\sin$ 选 $[-90^\circ,90^\circ]$（递增）、$\cos$ 选 $[0^\circ,180^\circ]$（递减）、$\tan$ 选 $(-90^\circ,90^\circ)$（递增）。

在主值区间内，先取三角函数再取逆变换应回到原角（即 $\arcsin(\sin\theta)=\theta$ 等，记为「往返还原」$f^{-1}\circ f=\text{id}$）。例如 $\arcsin(\sin 30^\circ)=30^\circ$、$\arccos(\cos 120^\circ)=120^\circ$、$\arctan(\tan 45^\circ)=45^\circ$，三个角都在各自主值区间内，先取三角函数再取逆变换，都回到原角。这一性质的完整表述见 §26.4.2。


### 26.4.2　反三角恒等式

由定义 $\arcsin x=\theta \iff \sin\theta=x$，逆变换与原来的变换构成「往返」：从 $x$ 出发先取反正弦再取正弦，或先取正弦再取反正弦（限主值区间内），都会回到出发点。

两个方向的成立范围并不相同，第一方向恒成立：$\sin(\arcsin x)\equiv x$（$x\in[-1,1]$），因为 $\arcsin x$ 的定义正是「正弦等于 $x$ 的那个角」。第二方向则受限：$\arcsin(\sin\theta)\equiv\theta$ 只在 $\theta\in[-90^\circ,90^\circ]$ 成立。原因是 $\sin$ 为周期函数，$\sin\theta$ 相同的角有无穷多个（$\theta+360^\circ k$ 等），而 $\arcsin$ 只能返回落在主值区间 $[-90^\circ,90^\circ]$ 的那一个；当 $\theta$ 不在主值区间时，$\arcsin(\sin\theta)$ 得到的是与 $\theta$ 相关、却被拉回主值区间的角，未必是 $\theta$ 本身。

````ad-thm
title: 定理（基本互逆关系） | Theorem（Fundamental Inverse Relations）

1. $\sin(\arcsin x)\equiv x$（$x\in[-1,1]$）；$\arcsin(\sin\theta)\equiv\theta$（$\theta\in[-90^\circ,90^\circ]$）。
2. $\cos(\arccos x)\equiv x$（$x\in[-1,1]$）；$\arccos(\cos\theta)\equiv\theta$（$\theta\in[0^\circ,180^\circ]$）。
3. $\tan(\arctan x)\equiv x$（$x\in\mathbb{R}$）；$\arctan(\tan\theta)\equiv\theta$（$\theta\in(-90^\circ,90^\circ)$）。
````

````ad-note
title: 注记（关键陷阱与处理方法） | Note（Key Trap and How to Handle It）

$\theta$ 超出主值区间时 $\arcsin(\sin\theta)\neq\theta$。例如 $\arcsin(\sin 120^\circ)=\arcsin\dfrac{\sqrt{3}}{2}=60^\circ$，而非 $120^\circ$。原因在于 $120^\circ$ 不在主值区间 $[-90^\circ,90^\circ]$ 内。

**处理方法：** 当 $\theta$ 不在主值区间时，用**化锐角公式**（§26.2.5 的表）把 $\sin\theta$（或 $\cos\theta$、$\tan\theta$）化为 $\pm$ 某锐角 $\alpha$ 的三角值，再取逆变换。步骤：
1. 判断 $\theta$ 所在象限；
2. 用化锐角公式化为 $\pm\sin\alpha$（或 $\pm\cos\alpha$、$\pm\tan\alpha$），$\alpha$ 为锐角；
3. 据符号取逆变换值（正得 $\alpha$，负得 $-\alpha$；$\cos$ 情形注意 $\arccos$ 主值区间是 $[0^\circ,180^\circ]$）。
   
例如 $\arcsin(\sin 120^\circ)$：$120^\circ$ 在第二象限，由 $\sin 120^\circ\equiv\sin(180^\circ-60^\circ)\equiv\sin 60^\circ$，故 $\arcsin(\sin 120^\circ)=\arcsin(\sin 60^\circ)=60^\circ$。
````

````ad-example
title: 示例 | Example

求 $\arcsin(\sin 150^\circ)$ 与 $\arccos\left(-\dfrac{\sqrt{3}}{2}\right)$ 的值。

---

$150^\circ$ 不在主值区间 $[-90^\circ,90^\circ]$ 内，先用化锐角公式把 $150^\circ$ 平移回主值区间：$\sin 150^\circ\equiv\sin(180^\circ-30^\circ)\equiv\sin 30^\circ$，故 $\arcsin(\sin 150^\circ)=\arcsin\dfrac{1}{2}=30^\circ$。

求 $\arccos\left(-\dfrac{\sqrt{3}}{2}\right)$ 即求 $[0^\circ,180^\circ]$ 内使 $\cos\theta=-\dfrac{\sqrt{3}}{2}$ 的角。由化锐角公式的 $180^\circ-\alpha$ 行，$\cos(180^\circ-30^\circ)\equiv-\cos 30^\circ\equiv-\dfrac{\sqrt{3}}{2}$，故 $\theta=150^\circ$，即 $\arccos\left(-\dfrac{\sqrt{3}}{2}\right)=150^\circ$。
````

下面两个推论（互补关系、负角关系）的证明核心都是 §26.2.5 的化锐角公式：互补关系用 $90^\circ-\alpha$ 一行的**互余关系**，负角关系用 $-\alpha$ 一行的**奇偶性**。两条推论本质上是把化锐角公式「翻译」成反三角函数的语言。

````ad-cor
title: 推论（互补关系） | Corollary（Complementary Relation）

$$\arcsin x+\arccos x \equiv 90^\circ\quad(x\in[-1,1])$$
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=2]
% right triangle: O(left-bottom), A(right-bottom, right angle), B(right-top)
\coordinate (O) at (0,0);
\coordinate (A) at (3,0);
\coordinate (B) at (3,1.8);
\draw[thick] (O) -- (A) node[midway, below] {$\cos\alpha=\sqrt{1-x^2}$};
\draw[thick] (A) -- (B) node[midway, right] {$\sin\alpha=x$};
\draw[thick] (B) -- (O) node[midway, above left] {$1$};
% right angle mark at A
\draw (2.7,0) -- (2.7,0.3) -- (3,0.3);
% angle alpha at O
\draw (0.55,0) arc (0:31:0.55);
\node at (0.36,0.28) {$\alpha=\arcsin x$};
% angle beta at B
\draw (2.66,1.52) arc (235:270:0.5);
\node at (2.58,1.78) {$\beta=\arccos x$};
\end{tikzpicture}
\end{document}
```

> 图 26-13：互补关系的直角三角形解释。在斜边为 $1$ 的直角三角形中，$\alpha=\arcsin x$ 与 $\beta=\arccos x$ 恰为两锐角，其和为 $90^\circ$。

````ad-proof
title: 证明 | Proof

令 $\alpha=\arcsin x\in[-90^\circ,90^\circ]$，则 $\sin\alpha=x$。又 $\cos(90^\circ-\alpha)\equiv\sin\alpha=x$，且 $90^\circ-\alpha\in[0^\circ,180^\circ]$（即 $\arccos$ 的主值区间），故 $\arccos x=90^\circ-\alpha=90^\circ-\arcsin x$，移项得 $\arcsin x+\arccos x=90^\circ$。
````

````ad-example
title: 示例 | Example

求 $\arcsin\dfrac35+\arccos\dfrac35$ 的值。

---

$\dfrac35$ 不是特殊角，无法直接写出 $\arcsin\dfrac35$ 与 $\arccos\dfrac35$ 的角度值。但由互补关系，对任意 $x\in[-1,1]$ 有 $\arcsin x+\arccos x\equiv90^\circ$，取 $x=\dfrac35$ 即得

$$\arcsin\dfrac35+\arccos\dfrac35=90^\circ.$$
````

````ad-cor
title: 推论（负角关系） | Corollary（Negative Argument Relations）

$$\arcsin(-x)\equiv-\arcsin x,\qquad \arctan(-x)\equiv-\arctan x$$

即 $\arcsin$ 与 $\arctan$ 为奇函数。而

$$\arccos(-x)\equiv 180^\circ-\arccos x$$
````

````ad-proof
title: 证明 | Proof

设 $\alpha=\arcsin x\in[-90^\circ,90^\circ]$，则 $\sin\alpha=x$。由 §26.2.5 的 $-\alpha$ 行：$\sin(-\alpha)\equiv-\sin\alpha\equiv-x$，且 $-\alpha\in[-90^\circ,90^\circ]$（即 $\arcsin$ 的主值区间），故 $\arcsin(-x)=-\alpha=-\arcsin x$。$\arctan$ 同理。

$\arccos(-x)$ 由互补关系推出：$\arccos(-x)=90^\circ-\arcsin(-x)=90^\circ+\arcsin x=90^\circ+(90^\circ-\arccos x)=180^\circ-\arccos x$。
````

````ad-example
title: 示例 | Example

求 $\arcsin\left(-\dfrac12\right)+\arccos\left(-\dfrac12\right)$ 的值。

---

由负角关系逐项化归：$\arcsin\left(-\dfrac12\right)=-\arcsin\dfrac12=-30^\circ$，$\arccos\left(-\dfrac12\right)=180^\circ-\arccos\dfrac12=180^\circ-60^\circ=120^\circ$，故

$$\arcsin\left(-\dfrac12\right)+\arccos\left(-\dfrac12\right)=-30^\circ+120^\circ=90^\circ.$$
````

---

## 26.5　小结（Summary）

````ad-note
title: 注记（本章主线与易错点） | Note（Main Threads and Common Pitfalls）

**四条主线：**

1. **弧度换算（§26.1）**：弧度 $\theta=\dfrac{s}{r}$（纯数），$\pi\text{ rad}=180^\circ$。角度经弧度换算为实数，故三角函数是实函数。本节仅一般讲解。

2. **任意角的三角比（§26.2）**：单位圆定义 $\sin\theta=y$、$\cos\theta=x$、$\tan\theta=\dfrac{y}{x}$（$\theta$ 以度计），与锐角定义一致；基本恒等式 $\sin^2\theta+\cos^2\theta \equiv 1$、$\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$；ASTC 法则；化锐角公式；周期性（$\sin,\cos$ 周期 $360^\circ$，$\tan$ 周期 $180^\circ$）与三角方程通解。

3. **三角函数的图像（§26.3）**：$\sin$ 奇函数、$\cos$ 偶函数、$\tan$ 有垂直渐近线；相位关系 $\cos\theta\equiv\sin(\theta+90^\circ)$；$y=A\sin(B\theta+C)+D$ 的振幅 $|A|$、周期 $\dfrac{360^\circ}{|B|}$、相位平移 $-\dfrac{C}{B}$、垂直平移 $D$。

4. **反三角函数（§26.4）**：$\arcsin:[-1,1]\to[-90^\circ,90^\circ]$、$\arccos:[-1,1]\to[0^\circ,180^\circ]$、$\arctan:\mathbb{R}\to(-90^\circ,90^\circ)$；互逆关系仅在主值区间成立；$\arcsin x+\arccos x\equiv 90^\circ$；$\arcsin,\arctan$ 为奇函数，$\arccos(-x)\equiv 180^\circ-\arccos x$。

**易错点：**

- 解 $\sin\theta=k$ 时最容易只写一个解；每次解完都问「ASTC 中哪些象限 $\sin$ 为正（或负）」。
- $\sin^{-1}x\neq\dfrac{1}{\sin x}$，$-1$ 是逆变换记号。
- $\arcsin(\sin\theta)=\theta$ 只在 $\theta\in[-90^\circ,90^\circ]$ 成立；超出主值区间要用化锐角公式先化回。
- $\tan$ 在 $\theta=90^\circ+180^\circ k$ 无定义（此处 $\cos\theta=0$），图像有垂直渐近线。
````

### 公式总表

| 类别 | 公式 | 备注 |
| --- | --- | --- |
| 弧度定义 | $\theta=\dfrac{s}{r}$ | 纯数 |
| 角度换算 | $\pi\text{ rad}=180^\circ$ | 角度 $\to$ 实数 |
| 单位圆定义 | $\sin\theta=y$，$\cos\theta=x$，$\tan\theta=\dfrac{y}{x}$ | $\theta$ 以度计，$x\neq0$ |
| 基本恒等式 | $\sin^2\theta+\cos^2\theta \equiv 1$，$\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$ | |
| 周期性 | $\sin,\cos$：$360^\circ$；$\tan$：$180^\circ$ | 最小正周期 |
| 通解 | $\sin\theta=\sin\alpha\Rightarrow\theta=\alpha+360^\circ k$ 或 $180^\circ-\alpha+360^\circ k$ | $k\in\mathbb{Z}$ |
| 图像变换 | $y=A\sin(B\theta+C)+D$：振幅 $|A|$、周期 $\dfrac{360^\circ}{|B|}$、相位 $-\dfrac{C}{B}$、垂直 $D$ | |
| 反三角 | $\arcsin x+\arccos x \equiv 90^\circ$，$\arccos(-x) \equiv 180^\circ-\arccos x$ | |

正弦定理、余弦定理及三角形面积公式（含希罗公式）将在[[Chapter 32 立体几何 (II)|立体几何 (II)]] 中作为预备知识系统引入。本章聚焦于三角函数作为「函数」的性质（定义、周期、图像、逆变换），是后续三角解题的工具基础。

---

## 词汇表

| 中文        | 英文                             | 备注                   |
| --------- | ------------------------------ | -------------------- |
| 弧度        | radian                         | $\theta=s/r$，一般讲解    |
| 弧度法       | radian measure                 |                      |
| 弧长        | arc length                     |                      |
| 圆心角       | central angle                  |                      |
| 任意角       | general angle                  |                      |
| 始边        | initial side                   |                      |
| 终边        | terminal side                  |                      |
| 标准位置      | standard position              |                      |
| 零角        | zero angle                     |                      |
| 终边相同的角    | coterminal angles              | $\theta+360^\circ k$ |
| 单位圆       | unit circle                    |                      |
| 三角函数      | trigonometric function         |                      |
| 周期 / 周期性  | period / periodicity           |                      |
| 最小正周期     | fundamental period             |                      |
| 象限        | quadrant                       |                      |
| 化锐角公式     | reduction formula              |                      |
| 通解        | general solution               |                      |
| 振幅        | amplitude                      | $A$                  |
| 相位 / 相位平移 | phase / phase shift            |                      |
| 垂直平移      | vertical shift                 |                      |
| 反三角函数     | inverse trigonometric function |                      |
| 反正弦       | arcsine                        | $\arcsin$            |
| 反余弦       | arccosine                      | $\arccos$            |
| 反正切       | arctangent                     | $\arctan$            |
| 主值区间      | principal value interval       |                      |
| 渐近线       | asymptote                      |                      |
| 奇函数       | odd function                   |                      |
| 偶函数       | even function                  |                      |
| 单调区间      | monotonic interval             |                      |

---

✅ 已執行（2026-09-02）：注释 1（L621，全面重写参考角法）已落实。§26.2.6 参考角法全量重写：三类方程 $\sin\theta=k$、$\cos\theta=k$、$\tan\theta=k$ 逐类分情况讨论并配解汇总表与独立算法框（统一步骤口径），贯穿例与示例扩充，新增单位圆示意图图 26-7B、图 26-7C。注释标记与方案细节已删除。

✅ 已執行（2026-09-02）：第二轮方案已落实。§26.2.6 解法脱离参考角、重构为通解法（判解况 → 找特解 → 通解展开 → 限范围），图 26-7/7B/7C 保留；恒等式转换法 3 处、§26.4.2 2 处措辞与词汇表「参考角」行同步处理；Ch27 讲义 10 处与考纲对照文件随批同步；Textbook Plan 按方案默认不动。方案细节已删除。
