---
tags: DSE课程笔记
---

# 17　数系(II)（Number Systems II）

> 在第 16 章集合论中，我们用集合语言描述了实数区间与确界。本章要深入理解实数系本身的连续性本质，并从实数扩充至复数系，掌握复数的代数运算与几何意义。
>
> 实数系不是凭空出现的，它通过「填补有理数之间的空隙」而变得连续；而复数则让所有多项式方程都有解。

> 本章分成两条主线：
> 1. 从有理数到实数：稠密性、戴德金分割与实数的完备性；
> 2. 复数的引入与运算：虚数单位、复数形式、运算规则与复平面。

前置：[[Chapter 0 基础概念|基础概念]]、[[Chapter 1 数系(I)|数系(I)]]、[[Chapter 6 代数式|代数式]]、[[Chapter 16 集合论|集合论]]

---

## 17.1　实数的本质（The Nature of Real Numbers）

> **本节难度上限**：T A- ｜ C B- ｜ E B+ ｜ Q B

> 在第 01 章数系(I)中，我们认识了自然数 $\mathbb{N}$、整数 $\mathbb{Z}$ 与有理数 $\mathbb{Q}$，以及整数指数律与进制。在第 16 章集合论中，我们学会了用区间和确界描述实数的子集。
>
> 现在的问题是：$\mathbb{Q}$ 和 $\mathbb{R}$ 之间究竟差了什么？为什么有理数「不够用」？本节将给出答案。

### 17.1.1　数系回顾与无理数

> 首先回顾第 16 章建立的基本数系包含链：

````ad-thm
title: 定理 | Theorem

自然数集 $\mathbb{N}$、整数集 $\mathbb{Z}$、有理数集 $\mathbb{Q}$ 与实数集 $\mathbb{R}$ 满足以下包含关系：
$$\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}.$$

其中：
*   $\mathbb{N}=\{1,2,3,\dots\}$，
*   $\mathbb{Z}=\{\dots,-2,-1,0,1,2,\dots\}$，
*   $\mathbb{Q}=\left\{\dfrac{p}{q}\;\middle|\;p,q\in\mathbb{Z},\;q\neq 0\right\}$，
*   $\mathbb{R}$ 为全体实数（有理数与无理数的并集）。
````

然而，数轴上还有大量点不属于 $\mathbb{Q}$。例如，在 Ch01 中我们证明了 $\sqrt{2}$ 不是有理数。这类数即实数中对 $\mathbb{Q}$ 的「补充」。

%%加一幅配图展示包含关系%%

````ad-def
title: 定义（无理数） | Definition（Irrational Number）

不能表示为 $\dfrac{p}{q}$（$p,q\in\mathbb{Z}$，$q\neq 0$）形式的实数称为**无理数（Irrational Number）**。

全体无理数组成的集合记作 $\mathbb{R}\setminus\mathbb{Q}$。
````


经典的无理数包括 $\sqrt{2}$、$\pi$ 等。

````ad-example
title: 示例 | Example


下列各数中，哪些是有理数？哪些是无理数？

(a) $\dfrac{3}{5}$ 

(b) $\sqrt{3}$ 

(c) $0.333...$ 

(d) $\pi$ 

---

(a) 有理数。$\dfrac{3}{5}$ 是两个整数的比。

(b) 无理数。$\sqrt{3}$ 不能写成两个整数的比（证明类似 Ch01 中对 $\sqrt{2}$ 的论证，此处略）。

(c) 有理数。$0.333... = \dfrac{1}{3}$，是循环小数，必为有理数。

(d) 无理数。$\pi$ 是圆周率，经典结论为其不是有理数。
````

### 17.1.2　稠密性（Denseness）

有理数是否「足够密」地铺满了数轴？下面的概念给出精确的回答。

````ad-def
title: 定义（稠密） | Definition（Dense）

设 $A\subseteq\mathbb{R}$ 且 $A\neq\varnothing$。若对任意 $a,b\in\mathbb{R}$ 且 $a<b$，都存在 $x\in A$ 使得 $a<x<b$，则称 $A$ 在 $\mathbb{R}$ 中**稠密（Dense）**。
````


通俗地说：无论你把视野缩得多小，在任何两个实数之间总能找到 $A$ 中的元素。这并不要求数轴上没有空隙，只要求 $A$ 的元素「到处都有」。事实上，我们有如下结论：

1. **有理数集** $\mathbb{Q}$ 在 $\mathbb{R}$ 中稠密。
2. **无理数集** $\mathbb{R}\setminus\mathbb{Q}$ 在 $\mathbb{R}$ 中也是稠密的。

这两个定理的证明依赖于上一章（[[Chapter 16 集合论|Ch.16 集合论]]）引入的完备性公理。证明有理数稠密性的过程中，需要用到**阿基米德性质**，我们先将其作为引理单独陈述并证明。

````ad-lem
title: 引理（阿基米德性质 Archimedean Property） | Lemma（阿基米德性质 Archimedean Property）

对任意正实数 $x>0$，存在正整数 $n$ 使得 $n>x$。

> 等价说法：正整数集 $\mathbb{N}$ 在 $\mathbb{R}$ 中没有上界。
````

````ad-proof
title: 证明 | Proof

反证法。假设 $\mathbb{N}$ 有上界，即存在 $M\in\mathbb{R}$ 使得对任意 $n\in\mathbb{N}$ 都有 $n\leq M$。

此时 $\mathbb{N}$ 是 $\mathbb{R}$ 的非空、有上界的子集，根据上一章的完备性公理：

```ad-axi
title: 公理（完备性公理） | Axiom（Completeness Axiom）

实数集 $\mathbb{R}$ 的任意非空、有上界的子集，必有上确界，并且这个上确界属于 $\mathbb{R}$。
```

$\mathbb{N}$ 必有上确界 $s=\sup\mathbb{N}\in\mathbb{R}$。

> 回顾：上确界 $s$ 的含义：$s$ 是 $\mathbb{N}$ 的上界（每个自然数都不超过 $s$），并且任何比 $s$ 小的数都不是 $\mathbb{N}$ 的上界。

因为 $s-1<s$，所以 $s-1$ 不是 $\mathbb{N}$ 的上界。这意味着存在某个 $n\in\mathbb{N}$ 使得
$$n>s-1.$$
两边加 $1$ 得到
$$n+1>s.$$
但 $n+1$ 也是自然数（自然数加 $1$ 还是自然数），而 $s$ 是 $\mathbb{N}$ 的上界，应当满足 $n+1\leq s$。这与 $n+1>s$ 矛盾。

> 矛盾的根源：$s$ 既是 $\mathbb{N}$ 的上确界（最小上界），又被 $n+1$ 超过了。这说明 $\mathbb{N}$ 根本不可能有上界。

因此 $\mathbb{N}$ 没有上界，即对任意 $x>0$，都存在 $n\in\mathbb{N}$ 使得 $n>x$。
````

````ad-note
title: 注记 | Remark

阿基米德性质看似「显而易见」：自然数可以无限增大，当然能超过任何给定的实数。但严格证明它需要完备性公理，这说明「自然数无上界」并非理所当然，而是实数连续性的一个推论。在有理数集 $\mathbb{Q}$ 中，同样可以证明阿基米德性质成立，但它的根基仍然是 $\mathbb{R}$ 的完备性。
````

现在用阿基米德性质来证明有理数集的稠密性：

````ad-thm
title: 定理（有理数集的稠密性） | Theorem（Denseness of Q）

有理数集 $\mathbb{Q}$ 在 $\mathbb{R}$ 中稠密。
````

````ad-proof
title: 证明（有理数集的稠密性） | Proof（有理数集的稠密性）

设 $a,b\in\mathbb{R}$ 且 $a<b$。要证：存在有理数 $r$ 使得 $a<r<b$。

> 直觉：在 $a$ 与 $b$ 之间找一个分数 $r=\dfrac{m}{n}$。关键在于把区间 $(a,b)$ 「放大」到至少长为 $1$，这样放大后的区间内一定会落进一个整数。

令 $d=b-a>0$（即 $a$ 与 $b$ 之间的距离）。

**第一步：用阿基米德性质「放大」区间。**

由阿基米德性质，存在正整数 $n$ 使得 $n>\dfrac{1}{d}$，即
$$\frac{1}{n}<d.$$

> 这一步的含义：把 $a$ 和 $b$ 同时乘以 $n$，则 $na$ 与 $nb$ 之间的距离为 $nb-na=n(b-a)=nd>1$。距离大于 $1$ 意味着 $na$ 与 $nb$ 之间至少有一个整数，我们下一步就来找到它。

---

**第二步：从 $na$ 开始往右找第一个整数。**

考虑集合
$$T=\{k\in\mathbb{Z}\mid k\geq na\}.$$

> $T$ 收集了所有不小于 $na$ 的整数。我们要找的是「从 $na$ 往右看，第一个遇到的整数」，也就是 $T$ 中的最小值 $m$。

$T$ 非空：由阿基米德性质，存在正整数 $n_0$ 使得 $n_0>na$，从而 $n_0\in T$。

$T$ 有下界 $na$（$T$ 的定义就是所有不小于 $na$ 的整数）。$T$ 是整数集的子集，有下界的整数子集必有最小值，记作 $m=\min T$。

由 $m$ 的定义：
$$m-1<na\leq m.$$

> 不等式解读：$m$ 不小于 $na$（即 $m$ 在 $na$ 右侧或恰好在 $na$ 上），但 $m-1$ 小于 $na$（即再往左一步就不够了）。

---

**第三步：验证 $r=\dfrac{m}{n}$ 就是我们要找的有理数。**

将上式除以正数 $n$ 得到
$$\frac{m-1}{n}<a\leq\frac{m}{n}.$$

先证 $a < r$。若 $na < m$（即等号不成立），则 $a < \dfrac{m}{n} = r$，直接成立。若 $na = m$，即 $a = \dfrac{m}{n} = r$，此时改取 $r' = \dfrac{m+1}{n}$，由第一步 $\dfrac{1}{n} < d$ 得
$$r' = r + \frac{1}{n} < a + d = b,$$
且 $r' > r = a$，故 $a < r' < b$，仍符合要求。

再证 $r < b$。对 $b$ 与 $r$ 做差：
$$b - r = b - \frac{m}{n} = \frac{nb - m}{n}.$$
由 $m - 1 < na$ 得 $m < na + 1$，代入分子：
$$nb - m > nb - (na + 1) = n(b - a) - 1 = nd - 1.$$
由第一步 $n > \dfrac{1}{d}$ 得 $nd > 1$，即 $nd - 1 > 0$。因此 $b - r > 0$，即 $r < b$。

> 做差法的思路：要证 $r < b$，只需证 $b - r > 0$。把 $nb - m$ 用 $m < na + 1$ 放缩，归结为 $nd - 1 > 0$，而这正是第一步 $n > 1/d$ 的直接结果。

因此 $r = \dfrac{m}{n}$ 是有理数（$m$ 与 $n$ 都是整数，$n \neq 0$），且满足 $a < r < b$（等号情况改取 $r'$ 同理）。$\mathbb{Q}$ 在 $\mathbb{R}$ 中稠密得证。
````

有理数稠密性得证后，无理数的情形可通过「有理数乘无理数」的技巧转化。为此先证明一个引理。

````ad-lem
title: 引理 | Lemma

若 $r\in\mathbb{Q}$ 且 $r\neq 0$，$\alpha$ 是无理数，则 $r\alpha$ 必为无理数。
````

````ad-proof
title: 证明 | Proof

反证法。假设 $r\alpha\in\mathbb{Q}$。因为 $r\in\mathbb{Q}$ 且 $r\neq 0$，倒数 $1/r\in\mathbb{Q}$。由 Ch01 中已证的结论：两个有理数相乘仍为有理数，故 $\dfrac{r\alpha}{r}=\alpha\in\mathbb{Q}$，与 $\alpha$ 是无理数矛盾。
````

 现在，我们开始证明无理数集的稠密性：

````ad-thm
title: 定理（无理数集的稠密性） | Theorem（Denseness of R\Q）

无理数集 $\mathbb{R}\setminus\mathbb{Q}$ 在 $\mathbb{R}$ 中也是稠密的。
````


````ad-proof
title: 证明（无理数集的稠密性） | Proof（无理数集的稠密性）

设 $a,b\in\mathbb{R}$ 且 $a<b$。要证：存在无理数 $x$ 使得 $a<x<b$。

因为 $\sqrt{2}>0$，有 $\dfrac{a}{\sqrt{2}}<\dfrac{b}{\sqrt{2}}$。由已证明的有理数稠密性，存在 $r\in\mathbb{Q}$ 使得
$$\frac{a}{\sqrt{2}}<r<\frac{b}{\sqrt{2}}.$$

若 $r=0$，则 $a<0<b$。此时可以取一个非零有理数 $r'$ 代替 $r$（例如取 $r'=1$ 若 $0<1<b/\sqrt{2}$，否则缩小范围另取）。因此不妨设 $r\neq 0$。

两边乘 $\sqrt{2}$ 得到
$$a<r\sqrt{2}<b.$$

由引理，$r$ 是非零有理数，$\sqrt{2}$ 在 Ch01 中已证为无理数，故 $r\sqrt{2}$ 是无理数。取 $x=r\sqrt{2}$，即得 $a<x<b$ 且 $x$ 为无理数。无理数集在 $\mathbb{R}$ 中稠密得证。
````

````ad-note
title: 注记（稠密性与连续性的区别） | Remark（Denseness vs Continuity）

上面证明了 $\mathbb{Q}$ 具有稠密性，但 $\mathbb{Q}$ **不具有连续性**：数轴上 $\mathbb{Q}$ 的元素之间仍然存在「空隙」，例如 $\sqrt{2}$ 所在的位置不是有理数，但它的两侧都有有理数无限逼近。

$\mathbb{R}$ 同时具有稠密性与连续性：数轴上的每一点都对应唯一的一个实数，不存在任何「空隙」。

两个稠密性定理的证明根源都在 Ch16 的完备性公理：完备性保证了实数集中「最小上界必然存在」，由此导出阿基米德性质，进而证明了稠密性。可以看到，$\mathbb{Q}$ 的「密」并非因为它自身性质好，而是因为 $\mathbb{R}$ 提供了足够多的点让它「嵌入」其中。
````

````ad-example
title: 示例 | Example


在 $1.414$ 与 $1.415$ 之间分别找出一个有理数和一个无理数。

---

有理数：例如 $1.4142=\dfrac{14142}{10000}$。

无理数：例如 $\sqrt{2}$（因为 $1.414<\sqrt{2}<1.415$），或用 $\pi-3$ 等自行构造小数。
````

### 17.1.3　戴德金分割与实数的连续性（Dedekind Cut and Continuity）

既然有理数有空隙，能不能精确描述这些空隙，并以此构造实数？戴德金分割给出了一种严格的方案。

````ad-def
title: 定义（戴德金分割） | Definition（Dedekind Cut）

设 $A,B\subseteq\mathbb{Q}$ 为有理数集的两个子集，且 $A\neq\varnothing$，$B\neq\varnothing$。若满足：
1. $A\cup B=\mathbb{Q}$，$A\cap B=\varnothing$；
2. $\forall a\in A,\;\forall b\in B$，有 $a<b$；
3. $A$ 没有最大值；

则称有序对 $(A,B)$ 为 $\mathbb{Q}$ 上的一个**戴德金分割（Dedekind Cut）**。

该分割**定义**了一个实数 $\alpha$：
*   若 $B$ 有最小值 $b_{\min}$，则 $\alpha=b_{\min}$，且 $\alpha\in\mathbb{Q}$；
*   若 $B$ 没有最小值，则 $\alpha\notin\mathbb{Q}$，即 $\alpha$ 是一个无理数。
````


直观理解：用一把刀切断有理数的数轴。若刀恰好落在某个有理数 $q$ 上，该分割定义了有理数 $q$；若刀落在两个有理数之间的「空隙」处，该分割就定义了一个无理数，填补了这个空隙。

从上一章确界理论的角度看，戴德金分割的结构非常清晰：
*   $A$ 的每一个元素都小于 $B$ 的每一个元素，因此 $A$ 的每一个元素都是 $B$ 的一个下界，$B$ 的每一个元素都是 $A$ 的一个上界。
*   条件 $A$ 没有最大值保证了分割点不在 $A$ 内部。此时分割所定义的实数 $\alpha$ 即 $A$ 的上确界，也等于 $B$ 的下确界：
    $$\alpha=\sup A=\inf B.$$
*   若 $B$ 有最小值 $b_{\min}$，则 $b_{\min}\in\mathbb{Q}$ 且 $\alpha=b_{\min}$；若 $B$ 没有最小值，则 $\alpha$ 是不在 $\mathbb{Q}$ 中的上确界，即为无理数。

这正好回答了上一章的完备性公理是如何「实现」的：每个戴德金分割给出 $\mathbb{Q}$ 的一个上确界，正是这个上确界填补了有理数之间的空隙。

````ad-note
title: 注记 | Remark

以下例子涉及较为细致的代数推导，对中学生而言稍难理解。若感觉吃力，可以先跳过，待后续回顾时再细读。
````


````ad-example
title: 示例 | Example


构造一个戴德金分割，使其定义无理数 $\sqrt{2}$。

---

令
$$A=\{r\in\mathbb{Q}\mid r\leq 0\text{ 或 }r^2<2\},\qquad B=\{r\in\mathbb{Q}\mid r>0\text{ 且 }r^2\geq 2\}.$$
容易验证：
*   $A\cup B=\mathbb{Q}$，$A\cap B=\varnothing$；
*   $A$ 的每一个元素都小于 $B$ 的每一个元素。

剩下要验证 $A$ 没有最大值。思路：对任意 $r\in A$，找一个比 $r$ 稍大但平方仍小于 $2$ 的有理数 $r'\in A$。

> 为什么取 $r'=r+\dfrac{1}{n}$？因为 $r\in A$ 且 $r>0$ 时，$r$ 已经很接近 $\sqrt{2}$ 了，$r'$ 只需比 $r$ 大一点点就能保证 $r'^2$ 仍然小于 $2$。「大一点点」最自然的方式就是加一个很小的正分数 $\dfrac{1}{n}$，而 $n$ 越大，$\dfrac{1}{n}$ 就越小，$r'$ 就越接近 $r$，$r'^2$ 就越不容易超过 $2$。

若 $r\leq 0$，取 $r'=1\in A$ 即有 $r'>r$，显然成立。下设 $r>0$ 且 $r^2<2$。

令 $r'=r+\dfrac{1}{n}$（$n$ 为待定的正整数）。展开 $r'^2$：
$$r'^2=\left(r+\frac{1}{n}\right)^2=r^2+\frac{2r}{n}+\frac{1}{n^2}.$$

> 观察 $r'^2$ 的结构：它是 $r^2$ 加上两项正的修正 $\dfrac{2r}{n}$ 和 $\dfrac{1}{n^2}$。我们希望 $r'^2<2$，即 $r^2+\dfrac{2r}{n}+\dfrac{1}{n^2}<2$。由于 $\dfrac{1}{n^2}\leq\dfrac{1}{n}$（$n\geq 1$），只需保证 $r^2+\dfrac{2r+1}{n}<2$ 即可。

因为 $\dfrac{1}{n^2}\leq\dfrac{1}{n}$，所以
$$r'^2 \leq r^2+\frac{2r}{n}+\frac{1}{n}=r^2+\frac{2r+1}{n}.$$
要使 $r'^2<2$，只需
$$r^2+\frac{2r+1}{n}<2,$$
即
$$\frac{2r+1}{n}<2-r^2.$$
因为 $r^2<2$，所以 $2-r^2>0$，上述不等式等价于
$$n>\frac{2r+1}{2-r^2}.$$
由阿基米德性质，满足此条件的正整数 $n$ 一定存在。取定这样的 $n$，则 $r'=r+\dfrac{1}{n}\in\mathbb{Q}$，$r'>r$，且 $r'^2<2$，即 $r'\in A$。

因此 $A$ 没有最大值。

此时 $B$ 没有最小值（因为 $\sqrt{2}\notin\mathbb{Q}$，它是无理数），因此 $\alpha=\sqrt{2}\notin\mathbb{Q}$。
````

````ad-thm
title: 定理（戴德金分割定理） | Theorem（Dedekind Cut Theorem）

对 $\mathbb{Q}$ 上的每一个戴德金分割 $(A,B)$，存在唯一的实数 $\alpha$ 满足：
$$\forall a\in A,\;\forall b\in B,\quad a\leq\alpha\leq b.$$

用确界语言表述：$\alpha=\sup A=\inf B$。这一性质称为实数集的**完备性（Completeness）**，亦称为**连续性（Continuity）**。
````


````ad-proof
title: 证明 | Proof

将 $A$ 视为 $\mathbb{R}$ 的子集（有理数自动是实数）。由戴德金分割的条件，$A$ 非空，且 $B$ 的任一元素都是 $A$ 的上界，因此 $A$ 有上界。

根据上一章的完备性公理（§16.7.4），$\mathbb{R}$ 的非空有上界子集必有上确界。令 $\alpha=\sup A\in\mathbb{R}$。

由上确界的定义：
*   $\alpha$ 是 $A$ 的上界，故 $\forall a\in A,\;a\leq\alpha$；
*   $B$ 的每一元素都是 $A$ 的上界，而 $\alpha$ 是最小上界，故 $\forall b\in B,\;\alpha\leq b$。

因此 $\forall a\in A,\;\forall b\in B$，有 $a\leq\alpha\leq b$。唯一性由上确界的唯一性保证。

换言之，$A$ 的上确界 $\alpha$ 正是该分割所定义的实数；同时 $\alpha$ 也是 $B$ 的下确界（因为 $B$ 是全体不小于 $A$ 中任何数的有理数，$\alpha$ 即其最大下界）。

这样，本章的戴德金分割定理与上一章的完备性公理本质上说的是同一件事：实数集中每一个有上界的子集都有上确界，这意味着数轴是连续的。
````

````ad-note
title: 注记 | Remark

戴德金分割由 Richard Dedekind 于 1872 年提出，是严格构造实数系的经典方法。通过确界的语言，戴德金分割与上一章完备性公理建立了清晰的联系：分割的上半部 $B$ 的所有元素都是下半部 $A$ 的上界，$\alpha=\sup A=\inf B$ 正是分割所定义的实数。实数集的连续性是其区别于有理数集的根本特征，也是微积分得以建立的基础。
````


---

## 17.2　复数（Complex Numbers）

> **本节难度上限**：T C+ ｜ C B ｜ E B ｜ Q B

> 实数轴虽然是连续的，但它仍然受限于一维。方程 $x^2+1=0$ 在实数中无解，说明我们现有的数系还不够大。
>
> 本节将扩充实数系，引入**复数（Complex Numbers）**。复数不仅让 $x^2+1=0$ 这类方程有解，还提供了复平面这一强有力的几何工具。

### 17.2.1　引入动机

> **代数动机：** 方程 $x^2+1=0$ 在实数范围内无解。因为对任意 $x\in\mathbb{R}$，有 $x^2\geq 0$，从而 $x^2+1\geq 1>0$，永不为零。
>
> **历史动机：** 16 世纪意大利数学家（Cardano、Bombelli 等）在解三次方程时发现：即使最终得到的解是实数，中间步骤也不可避免地要对负数开平方。这迫使数学界接纳这种当时的「虚构」之数。

严格证明如下：

````ad-thm
title: 定理 | Theorem

方程 $x^2+1=0$ 在 $\mathbb{R}$ 中无解。
````

````ad-proof
title: 证明 | Proof

对任意 $x\in\mathbb{R}$，有 $x^2\geq 0$，从而 $x^2+1\geq 1>0$。因此不存在实数 $x$ 使得 $x^2+1=0$。
````

更一般地：

````ad-thm
title: 定理 | Theorem

设 $c>0$。方程 $x^2+c=0$ 在 $\mathbb{R}$ 中无解。
````

````ad-proof
title: 证明 | Proof

对任意 $x\in\mathbb{R}$，有 $x^2\geq 0$。又 $c>0$，故 $x^2+c\geq c>0$，不存在实数 $x$ 使得 $x^2+c=0$。
````

这意味着：若要使这类方程有解，必须突破 $\mathbb{R}$ 的范围。下一小节将引入虚数单位 $i$ 来解决这个问题。

### 17.2.2　虚数单位与复数定义


````ad-def
title: 定义（虚数单位） | Definition（Imaginary Unit）

定义符号 $i$ 满足：
$$i^2=-1.$$
称 $i$ 为**虚数单位（Imaginary Unit）**。
````


````ad-def
title: 定义（复数） | Definition（Complex Number）

形如
$$z=a+bi$$
的数称为**复数（Complex Number）**，其中 $a,b\in\mathbb{R}$。

全体复数的集合记作 $\mathbb{C}$%%写开 C 的描述%%。
````


````ad-example
title: 示例 | Example


验证 $x=i$ 是方程 $x^2+1=0$ 的解。

---

代入 $x=i$：$i^2+1=-1+1=0$。类似地，$x=-i$ 也是解（$(-i)^2+1=i^2+1=0$）。
````

````ad-def
title: 定义（实部与虚部） | Definition（Real Part and Imaginary Part）

对复数 $z=a+bi$（$a,b\in\mathbb{R}$）：
*   $a$ 称为 $z$ 的**实部（Real Part）**，记作 $\operatorname{Re}(z)=a$；
*   $b$ 称为 $z$ 的**虚部（Imaginary Part）**，记作 $\operatorname{Im}(z)=b$。

**注意：** 虚部是实数 $b$，而非 $bi$。
````

> 当 $b=0$ 时，$z=a$ 为实数，因此 $\mathbb{R}\subset\mathbb{C}$。

````ad-def
title: 定义（纯虚数） | Definition（Purely Imaginary Number）

若复数 $z=bi$ 满足 $b\in\mathbb{R}$ 且 $b\neq 0$（即实部为零但虚部不为零），则称 $z$ 为**纯虚数（Purely Imaginary Number）**。
````


````ad-example
title: 示例 | Example


写出 $z=3-4i$ 的实部和虚部，并判断它是实数还是纯虚数。

---

$\operatorname{Re}(z)=3$，$\operatorname{Im}(z)=-4$。

它既不是实数（虚部不为 $0$），也不是纯虚数（实部不为 $0$）。
````

### 17.2.3　复数的相等与四则运算

````ad-axi
title: 公理 | Axiom

设 $z_1=a+bi$，$z_2=c+di$，其中 $a,b,c,d\in\mathbb{R}$。则
$$z_1=z_2\quad\iff\quad a=c\ \text{且}\ b=d.$$

即两个复数相等当且仅当实部与虚部分别相等。

特别地，$a+bi=0\iff a=0$ 且 $b=0$。
````

同样地，复数同样需要像实数那样定义运算，对于复数，实部和虚部都是实数，对应定义的加法，非常自然地会联想到将对应的实部跟虚部分别相加：

````ad-def
title: 定义（复数的加减法） | Definition（Addition and Subtraction）

设 $z_1=a+bi$，$z_2=c+di$（$a,b,c,d\in\mathbb{R}$）。

**加法与减法：**
$$z_1\pm z_2=(a\pm c)+(b\pm d)i.$$

即实部与实部相加减，虚部与虚部相加减。
````

对于乘法而言，可以笼统地将 $i$ 看成一个类似变量的对象，那么整个复数 $a+bi$ 的 “结构” 就会对应一个一元一次多项式 $a+bx$，基于此直觉可以自然地定义一个复数的乘法：

````ad-def
title: 定义（复数的乘法） | Definition（Multiplication）

设 $z_1=a+bi$，$z_2=c+di$（$a,b,c,d\in\mathbb{R}$）。复数的乘法按多项式展开，并利用 $i^2=-1$ 合并同类项：
$$\begin{aligned}
z_1z_2&=(a+bi)(c+di)\\
&=ac+adi+bci+bdi^2\\
&=(ac-bd)+(ad+bc)i\quad(\text{由 }i^2=-1).
\end{aligned}$$
````

为了验证我们定义的加法跟乘法足够 “良好”，我们需要去检查它是否满足在实数中的加法跟乘法那样的性质，即交换率、结合率和分配率：

````ad-thm
title: 定理（复数乘法的运算律） | Theorem（Laws of Complex Multiplication）

对任意 $z_1,z_2,z_3\in\mathbb{C}$：
1. $z_1z_2=z_2z_1$（交换律）；
2. $(z_1z_2)z_3=z_1(z_2z_3)$（结合律）；
3. $z_1(z_2+z_3)=z_1z_2+z_1z_3$（分配律）。
````

````ad-proof
title: 证明 | Proof

设 $z_1=a_1+b_1i$，$z_2=a_2+b_2i$，$z_3=a_3+b_3i$，其中 $a_k,b_k\in\mathbb{R}$（$k=1,2,3$）。

**交换律：**
$$z_1z_2=(a_1a_2-b_1b_2)+(a_1b_2+b_1a_2)i,$$
$$z_2z_1=(a_2a_1-b_2b_1)+(a_2b_1+b_2a_1)i.$$
由实数的交换律，$a_1a_2=a_2a_1$，$b_1b_2=b_2b_1$，$a_1b_2+b_1a_2=a_2b_1+b_2a_1$，故 $z_1z_2=z_2z_1$。

**结合律与分配律**的验证方法相同：将复数写成 $a+bi$ 形式展开，逐一比较实部与虚部，验证过程仅依赖实数的运算律，此处从略。
````

````ad-example
title: 示例 | Example


计算 $(2+3i)(4-i)$。

---

展开：
$$\begin{aligned}
(2+3i)(4-i)&=2\cdot4+2\cdot(-i)+3i\cdot4+3i\cdot(-i)\\
&=8-2i+12i-3i^2\\
&=8+10i+3=11+10i.
\end{aligned}$$
````

````ad-example
title: 示例 | Example


设 $z_1=1+2i$，$z_2=3-i$。求 $z_1+z_2$ 与 $z_1-z_2$。

---

$z_1+z_2=(1+3)+(2-1)i=4+i$。

$z_1-z_2=(1-3)+(2-(-1))i=-2+3i$。
````

**复数的整数幂（Integer Powers of Complex Numbers）**

复数的乘方仍按重复乘法定义：对正整数 $n$，
$$z^n=\underbrace{z\cdot z\cdots z}_{n\text{ 个}}.$$
由复数乘法的交换律与结合律（上面的运算律定理），指数运算律与实数完全一致：对正整数 $m,n$，
$$z^mz^n=z^{m+n},\qquad (z^m)^n=z^{mn},$$
并约定 $z^0=1$（$z\ne0$）。负整数指数幂 $z^{-n}=\dfrac{1}{z^{n}}$ 须待除法建立（§17.2.4）之后再处理。

先看虚数单位 $i$ 自身的幂，它有漂亮的周期规律。由 $i^2=-1$ 可逐次计算：

````ad-thm
title: 定理（$i$ 的幂的循环规律） | Theorem（Cyclic Powers of $i$）

对任意正整数 $n$，$i^n$ 的值按 $4$ 为周期循环：
$$i^1=i,\quad i^2=-1,\quad i^3=-i,\quad i^4=1.$$
一般地，设 $n=4q+r$（$q$ 为非负整数，$r\in\{0,1,2,3\}$），则
$$i^n=i^r.$$
````

````ad-proof
title: 证明 | Proof

逐次计算：
$$i^1=i,\quad i^2=-1,\quad i^3=i^2\cdot i=(-1)\cdot i=-i,\quad i^4=i^3\cdot i=(-i)\cdot i=-i^2=1.$$

对一般情形，由 [[Chapter 1 数系(I)]] 的带余除法，设 $n=4q+r$（$r\in\{0,1,2,3\}$），则
$$i^n=i^{4q+r}=(i^4)^q\cdot i^r=1^q\cdot i^r=i^r.$$
````

> 这个 $4$ 循环规律使得计算 $i$ 的高次幂变得简单：只需把指数除以 $4$ 取余数，再查表即可。

````ad-example
title: 示例 | Example

计算 $i^5$、$i^{10}$ 和 $i^{2026}$。

---

$i^5$：$5=4\times 1+1$，余数为 $1$，故 $i^5=i^1=i$。

$i^{10}$：$10=4\times 2+2$，余数为 $2$，故 $i^{10}=i^2=-1$。

$i^{2026}$：$2026=4\times 506+2$，余数为 $2$，故 $i^{2026}=i^2=-1$。
````

一般复数的正整数幂，靠多项式（二项式）展开与 $i$ 的幂循环化简：展开后各项 $i$ 的指数除以 $4$ 取余数查表，再合并实部与虚部。

````ad-example
title: 示例 | Example

计算 (a) $(1+i)^2$；(b) $(1+i)^4$；(c) $(2-i)^3$。

---

1. $(1+i)^2=1+2i+i^2=1+2i-1=2i$。
2. $(1+i)^4=\left((1+i)^2\right)^2=(2i)^2=4i^2=-4$。
3. $(2-i)^2=4-4i+i^2=3-4i$，故 $(2-i)^3=(3-4i)(2-i)=6-3i-8i+4i^2=2-11i$。

（(b) 中 $1+i$ 实部虚部皆非零，四次方却已是负实数，这正是 $i$ 的幂循环的直接体现。）
````

> 复数的整数幂与 $i$ 的幂循环不属 DSE 常规课程要求（官方仅要求复数四则运算），此处为使乘法框架完整、并为下一章二次方程复根情形作工具准备。

### 17.2.4　共轭复数与除法

````ad-def
title: 定义（共轭复数） | Definition（Conjugate）

对复数 $z=a+bi$，其**共轭复数（Conjugate）**定义为：
$$\overline{z}=a-bi.$$
````


````ad-thm
title: 定理（共轭的基本性质） | Theorem（Basic Properties of Conjugate）

对 $z=a+bi$（$a,b\in\mathbb{R}$）：
1. $\overline{\overline{z}}=z$；
2. $\operatorname{Re}(z)=\dfrac{z+\overline{z}}{2}$，$\operatorname{Im}(z)=\dfrac{z-\overline{z}}{2i}$；
3. $z\in\mathbb{R}\iff\overline{z}=z$；
4. $z$ 为纯虚数 $\iff\overline{z}=-z$ 且 $z\neq 0$；
5. $z\cdot\overline{z}=a^2+b^2\geq 0$，总为非负实数。
````


````ad-proof
title: 证明 | Proof

每条均可由定义直接验证。

(1) $\overline{z}=a-bi$，故 $\overline{\overline{z}}=a+bi=z$。

(2) $z+\overline{z}=(a+bi)+(a-bi)=2a$，故 $\dfrac{z+\overline{z}}{2}=a=\operatorname{Re}(z)$；类似得 $\operatorname{Im}(z)$。

(3) 若 $z\in\mathbb{R}$，则 $b=0$，$\overline{z}=a=z$；反之若 $\overline{z}=z$，则 $bi=-bi$，推出 $b=0$。

(4) 类似 (3)，$z$ 为纯虚数时 $a=0$ 且 $b\neq 0$，故 $\overline{z}=-bi=-z$。

(5) $z\cdot\overline{z}=(a+bi)(a-bi)=a^2-(bi)^2=a^2+b^2$。
````

````ad-thm
title: 定理（共轭的运算性质） | Theorem（Conjugate under Operations）

对 $z_1,z_2\in\mathbb{C}$：
$$\begin{aligned}
\overline{z_1+z_2}&=\overline{z_1}+\overline{z_2},\\
\overline{z_1-z_2}&=\overline{z_1}-\overline{z_2},\\
\overline{z_1z_2}&=\overline{z_1}\cdot\overline{z_2}.
\end{aligned}$$
````


````ad-proof
title: 证明 | Proof

设 $z_1=a+bi$，$z_2=c+di$。直接代入验证即可。

以乘法为例：$z_1z_2=(ac-bd)+(ad+bc)i$，故 $\overline{z_1z_2}=(ac-bd)-(ad+bc)i$。而 $\overline{z_1}\cdot\overline{z_2}=(a-bi)(c-di)=(ac-bd)-(ad+bc)i$，两者相等。加法与减法类似。
````

有了共轭，就可以处理复数除法。关键在于**分母实数化**。

````ad-alg
title: 算法 | Algorithm

设 $z_1=a+bi$，$z_2=c+di\neq 0$。则
$$\begin{aligned}
\frac{z_1}{z_2}&=\frac{a+bi}{c+di}\\[2ex]
&=\frac{(a+bi)(c-di)}{(c+di)(c-di)}\\[2ex]
&=\frac{(ac+bd)+(bc-ad)i}{c^2+d^2}
\end{aligned}$$

核心技巧：分子分母同乘分母的共轭 $c-di$，利用 $z_2\cdot\overline{z_2}=c^2+d^2$ 为正实数将分母化为实数。
````


````ad-example
title: 示例 | Example


计算 $\dfrac{2+3i}{1-i}$，并将结果写成 $a+bi$ 的标准形式。

---

分子分母同乘共轭 $1+i$：
$$\begin{aligned}
\frac{2+3i}{1-i}&=\frac{(2+3i)(1+i)}{(1-i)(1+i)}\\[2ex]
&=\frac{2+2i+3i+3i^2}{1^2+(-1)^2}\\[2ex]
&=\frac{2+5i-3}{2}\\[2ex]
&=\frac{-1+5i}{2}=-\frac{1}{2}+\frac{5}{2}i
\end{aligned}$$
````

````ad-example
title: 示例 | Example


将 $\dfrac{1}{i}$ 写成 $a+bi$ 的标准形式。

---

分母 $i$ 的共轭为 $-i$：
$$\frac{1}{i}=\frac{1\cdot(-i)}{i\cdot(-i)}=\frac{-i}{-i^2}=\frac{-i}{1}=-i.$$
````

除法共轭性质与加减乘类似，现在除法已定义，可以完整陈述：

````ad-thm
title: 定理（除法的共轭性质） | Theorem（Conjugate of Division）

对 $z_1,z_2\in\mathbb{C}$（$z_2\neq 0$）：
$$\overline{\left(\dfrac{z_1}{z_2}\right)}=\dfrac{\overline{z_1}}{\overline{z_2}}.$$
````


````ad-proof
title: 证明 | Proof

设 $z_1=a+bi$，$z_2=c+di\neq 0$。由除法公式：
$$\dfrac{z_1}{z_2}=\dfrac{(ac+bd)+(bc-ad)i}{c^2+d^2}.$$
故
$$\overline{\left(\dfrac{z_1}{z_2}\right)}=\dfrac{(ac+bd)-(bc-ad)i}{c^2+d^2}.$$
另一方面，
$$\dfrac{\overline{z_1}}{\overline{z_2}}=\dfrac{a-bi}{c-di}=\dfrac{(a-bi)(c+di)}{(c-di)(c+di)}=\dfrac{(ac+bd)-(bc-ad)i}{c^2+d^2}.$$
两者相等。
````

### 17.2.5　复数的模与复平面

> 本节复平面（Argand 图）不属 DSE 必修课程要求（官方课程阐释明示极式、阿根图、棣美弗定理均不属课程），此处作为几何直觉与后续学习预铺垫保留。

````ad-def
title: 定义（模） | Definition（Modulus）

对复数 $z=a+bi$，其**模（Modulus）**定义为：
$$|z|=\sqrt{a^2+b^2}.$$

注：$|z|=\sqrt{z\cdot\overline{z}}$，且 $|z|\geq 0$。当且仅当 $z=0$ 时 $|z|=0$。
````


````ad-thm
title: 定理（模的性质） | Theorem（Properties of Modulus）

对 $z_1,z_2\in\mathbb{C}$：
1. $|z_1z_2|=|z_1|\cdot|z_2|$；
2. $\left|\dfrac{z_1}{z_2}\right|=\dfrac{|z_1|}{|z_2|}$（$z_2\neq 0$）；
3. $|\overline{z}|=|z|$；
4. $|\operatorname{Re}(z)|\leq|z|$，$|\operatorname{Im}(z)|\leq|z|$。
````


````ad-proof
title: 证明 | Proof

(1) 利用 $|z|^2=z\cdot\overline{z}$ 与上一节共轭的运算性质：
$$|z_1z_2|^2=(z_1z_2)(\overline{z_1z_2})=z_1z_2\cdot\overline{z_1}\cdot\overline{z_2}=|z_1|^2|z_2|^2.$$
开方即得。

(2) 由 (1) 推出：$|z_1|=\left|\dfrac{z_1}{z_2}\cdot z_2\right|=\left|\dfrac{z_1}{z_2}\right|\cdot|z_2|$。

(3) $|\overline{z}|=\sqrt{a^2+(-b)^2}=\sqrt{a^2+b^2}=|z|$。

(4) 由 $a^2\leq a^2+b^2$ 两边开方（非负数开方保序）即得 $|\operatorname{Re}(z)|=|a|\leq\sqrt{a^2+b^2}=|z|$。虚部同理。
````

````ad-def
title: 定义（复平面） | Definition（Complex Plane）

建立直角坐标系，以横轴为**实轴（Real Axis）**，以纵轴为**虚轴（Imaginary Axis）**。复数 $z=a+bi$ 与平面上的点 $(a,b)$ 一一对应。此平面称为**复平面（Complex Plane）**，亦称为 **Argand 图（Argand Diagram）**。
````


````ad-example
title: 示例 | Example


在复平面上标出 $z=-3+4i$，求其模，并标出其共轭 $\overline{z}$。

---

$z=-3+4i$ 对应点 $(-3,4)$。

模：$|z|=\sqrt{(-3)^2+4^2}=\sqrt{9+16}=5$。

$\overline{z}=-3-4i$ 对应点 $(-3,-4)$，与 $z$ 关于实轴对称。
````

由定义可得到以下几何解释：

> 实数 $a$ 对应实轴上的点 $(a,0)$；纯虚数 $bi$ 对应虚轴上的点 $(0,b)$；共轭 $z$ 与 $\overline{z}$ 关于实轴对称；模 $|z|$ 等于点 $(a,b)$ 到原点的距离。
>
> 复数的加法：将 $z_1$ 与 $z_2$ 看作从原点出发的箭头，$z_1+z_2$ 正好是以这两个箭头为邻边的平行四边形的对角线。复数的减法 $z_1-z_2$ 则是从 $z_2$ 的位置指向 $z_1$ 的位置的箭头。

---

### 17.2.6　负实数的平方根

> 在 §17.2.1 中，我们证明了方程 $x^2+c=0$（$c>0$）在 $\mathbb{R}$ 中无解。现在有了复数系 $\mathbb{C}$，这类方程终于有了着落。本节将给出负实数在复数范围内的「平方根」的严格定义，并厘清根式的乘积律、商律扩充到负数后的失效情形。这些结论是下一章解二次方程的重要工具。

在实数范围内，$\sqrt{a}$ 只对 $a\geq 0$ 有定义。现在我们把这个概念扩充到负实数。

````ad-thm
title: 定理（负实数的复数平方根） | Theorem（Complex Square Root of Negative Reals）

设 $a<0$ 为负实数。定义
$$\sqrt{a}=i\sqrt{|a|},$$
则 $\left(i\sqrt{|a|}\right)^2=a$。
````

````ad-proof
title: 证明 | Proof

因为 $a<0$，故 $|a|=-a>0$。由 $i^2=-1$ 得
$$\left(i\sqrt{|a|}\right)^2=i^2\cdot(\sqrt{|a|})^2=(-1)\cdot|a|=-|a|=a.$$
因此 $i\sqrt{|a|}$ 确实是 $a$ 的一个平方根。
````

> 注意：与正实数的平方根不同，负实数的平方根是纯虚数。符号 $\sqrt{a}$（$a<0$）在本讲义中约定取「主平方根」$i\sqrt{|a|}$；另一个平方根是 $-i\sqrt{|a|}$。

````ad-example
title: 示例 | Example


求下列各式的值：

(a) $\sqrt{-4}$

(b) $\sqrt{-9}+\sqrt{-1}$

(c) 解方程 $x^2+3=0$。

---

(a) $\sqrt{-4}=i\sqrt{|-4|}=i\sqrt{4}=2i$。

(b) $\sqrt{-9}=i\sqrt{9}=3i$，$\sqrt{-1}=i\sqrt{1}=i$，故 $\sqrt{-9}+\sqrt{-1}=3i+i=4i$。

(c) 方程 $x^2+3=0$ 即 $x^2=-3$。由定义，$x=\pm\sqrt{-3}=\pm i\sqrt{3}$。因此方程的复数解为 $x=i\sqrt{3}$ 或 $x=-i\sqrt{3}$。
````

再来看根式与乘除法的相容性。在 [[Chapter 6 代数式|代数式]] 中我们证明过：$a,b\ge0$ 时 $\sqrt{ab}=\sqrt a\sqrt b$。但为负实数约定 $\sqrt a=i\sqrt{|a|}$（$a<0$）之后，这条运算律不再普遍成立。问题的根源全在 $i$ 的符号上：开方提出来的 $i$ 相乘会产生 $i^2=-1$，把符号吞掉；而分子分母各有一个 $i$ 时又能对消。按被开方数的符号分四种组合逐一讨论。

**乘积律** $\sqrt a\cdot\sqrt b$ 与 $\sqrt{ab}$ 的比较：

- $a,b$ 中至少一个非负时，$i$ 至多出现一个，两边相同，律仍成立；
- $a<0$ 且 $b<0$ 时，
$$\sqrt a\cdot\sqrt b=\left(i\sqrt{|a|}\right)\left(i\sqrt{|b|}\right)=i^2\sqrt{|a|}\sqrt{|b|}=-\sqrt{ab},$$
而 $\sqrt{ab}=\sqrt{|a|\,|b|}>0$，律**失效**，两边恰差一个负号。

**商律** $\dfrac{\sqrt a}{\sqrt b}$ 与 $\sqrt{\dfrac ab}$ 的比较（$b\ne0$）：

- 分母非负（$b>0$）时，两边同为一个 $i$（或无 $i$），律成立；
- $a\ge0$、$b<0$ 时，
$$\frac{\sqrt a}{\sqrt b}=\frac{\sqrt a}{i\sqrt{|b|}}=-\,i\sqrt{\frac{a}{|b|}},\qquad \sqrt{\frac ab}=i\sqrt{\frac{a}{|b|}},$$
律**失效**（倒数把 $i$ 换成 $-i$ 所致），两边恰差一个负号；
- $a<0$、$b<0$ 时，分子分母的 $i$ 对消，$\dfrac{\sqrt a}{\sqrt b}=\sqrt{\dfrac{a}{b}}$，律反而**成立**。

汇总为一张判别表（被开方数为实数）：

| 被开方数符号 | $\sqrt a\cdot\sqrt b=\sqrt{ab}$ | $\dfrac{\sqrt a}{\sqrt b}=\sqrt{\dfrac ab}$ |
| :---: | :---: | :---: |
| $a\ge0$，$b>0$ | 成立 | 成立 |
| $a<0$，$b>0$ | 成立 | 成立 |
| $a\ge0$，$b<0$ | 成立 | 失效（差负号） |
| $a<0$，$b<0$ | 失效（差负号） | 成立 |

一句话总则：**乘积律两负即失效；商律只分母负（分子非负）时失效；失效时两边都恰差一个负号**。根源是同一个：$\sqrt{\ }$ 是按约定取主平方根的记号，负数开方提出的 $i$ 在相乘时以 $i^2=-1$ 改变符号，在相除时则可能因 $\dfrac{1}{i}=-i$ 改变符号。

````ad-warning
title: 警告（根式不能“分配”） | Warning（Radicals Do Not Distribute）

根号不是可以随意合并、拆分的运算符号：$\sqrt{ab}=\sqrt a\sqrt b$ 成立的前提是 $a,b\ge0$（[[Chapter 6 代数式|代数式]] 定理），被开方数一旦掺入负数就可能失效。铁律：**凡被开方数出现负数，先改写为 $i\sqrt{|a|}$，再按复数四则运算法则计算**，切勿先合并根号。
````

````ad-example
title: 示例 | Example

下面是有人给出的“证明”：
$$-1=i\cdot i=\sqrt{-1}\cdot\sqrt{-1}=\sqrt{(-1)\times(-1)}=\sqrt{1}=1.$$
指出“证明”中错在哪一步，并说明理由。

---

错在第三个等号 $\sqrt{-1}\cdot\sqrt{-1}=\sqrt{(-1)(-1)}$：它使用了 $\sqrt a\sqrt b=\sqrt{ab}$，而该律的前提是 $a,b\ge0$，此处 $a=b=-1$ 两负，律失效。正确算法：$\sqrt{-1}\cdot\sqrt{-1}=i\cdot i=i^2=-1$；而 $\sqrt{(-1)(-1)}=\sqrt{1}=1$，两边恰差一个负号，与上表第四行第一列一致。
````

````ad-example
title: 示例 | Example


化简 $\sqrt{-8}\cdot\sqrt{-2}$，并与 $\sqrt{(-8)\times(-2)}$ 比较。

---

$\sqrt{-8}=i\sqrt{8}=2i\sqrt{2}$，$\sqrt{-2}=i\sqrt{2}$，故
$$\sqrt{-8}\cdot\sqrt{-2}=(2i\sqrt{2})(i\sqrt{2})=2i^2\cdot 2=2\cdot(-1)\cdot 2=-4.$$

而 $\sqrt{(-8)\times(-2)}=\sqrt{16}=4$。

> 两者并不相等。这说明实数范围内「$\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}$」的性质**不能**直接应用于负数情形。正确做法是先将 $\sqrt{a}$（$a<0$）化为 $i\sqrt{|a|}$，再按复数乘法展开。
````

````ad-example
title: 示例 | Example

化简 (a) $\dfrac{\sqrt{-12}}{\sqrt{-3}}$；(b) $\dfrac{\sqrt{8}}{\sqrt{-2}}$。

---

1. (a) 两负，$i$ 对消，律成立：$\dfrac{\sqrt{-12}}{\sqrt{-3}}=\dfrac{2i\sqrt{3}}{i\sqrt{3}}=2$，与 $\sqrt{\dfrac{-12}{-3}}=\sqrt{4}=2$ 一致。
2. (b) 只分母负，律失效：$\dfrac{\sqrt{8}}{\sqrt{-2}}=\dfrac{2\sqrt{2}}{i\sqrt{2}}=\dfrac{2}{i}=-2i$；而 $\sqrt{\dfrac{8}{-2}}=\sqrt{-4}=2i$，恰差一个负号。若误用商律合并根号，会得错解 $2i$。
````

---

## 17.3　本章小结

本章完成了从有理数到实数、再从实数到复数的两步扩充：
1. 证明了有理数集与无理数集均在 $\mathbb{R}$ 中稠密（证明根源在 Ch16 的完备性公理）；
2. 通过戴德金分割，理解了实数系的连续性，并以确界语言 $\alpha=\sup A=\inf B$ 将分割与完备性公理联系起来；
3. 通过引入虚数单位 $i$ 并扩充至复数系 $\mathbb{C}$，使方程 $x^2+1=0$ 这类在 $\mathbb{R}$ 中无解的方程有了复数解，并获得复平面这一几何工具，同时建立复数的整数幂与 $i$ 的幂的 $4$ 循环规律；
4. 将平方根概念扩充至负实数 $\sqrt{a}=i\sqrt{|a|}$（$a<0$），并厘清根式乘积律、商律扩充后的失效情形，为下一章解二次方程奠定基础。

复数不仅是代数上的扩充数系，其几何解释（复平面、模、共轭等）为后续解析几何与三角学提供了新的连接点。

---

## 中英对照词汇表

| 中文 | 英文 | 备注 |
|------|------|------|
| 实数集 | set of real numbers $\mathbb{R}$ | |
| 有理数 | rational number | 形如 $\frac{p}{q}$ |
| 无理数 | irrational number | $\mathbb{R}\setminus\mathbb{Q}$ |
| 稠密性 | denseness | |
| 稠密 | dense | |
| 阿基米德性质 | Archimedean property | $\forall x>0,\exists n\in\mathbb{N}, n>x$ |
| 戴德金分割 | Dedekind cut | 构造实数的方法 |
| 上确界 | supremum $\sup$ | 最小上界 |
| 下确界 | infimum $\inf$ | 最大下界 |
| 完备性 | completeness | |
| 连续性 | continuity | |
| 虚数单位 | imaginary unit $i$ | $i^2=-1$ |
| 复数 | complex number | 形如 $a+bi$ |
| 实部 | real part $\operatorname{Re}(z)$ | |
| 虚部 | imaginary part $\operatorname{Im}(z)$ | 虚部为实数 $b$ |
| 纯虚数 | purely imaginary number | $bi$（$b\neq0$） |
| 共轭复数 | conjugate $\overline{z}$ | $a-bi$ |
| 分母实数化 | rationalizing the denominator | |
| 模 | modulus $\lvert z\rvert$ | $\sqrt{a^2+b^2}$ |
| 复平面 | complex plane | Argand 图 |
| 实轴 | real axis | |
| 虚轴 | imaginary axis | |
| 负实数的平方根 | complex square root of negative real | $\sqrt{a}=i\sqrt{\lvert a\rvert}$（$a<0$） |
| $i$ 的幂的循环 | cyclic powers of $i$ | 周期为 $4$ |

---

**备课提示：**
*   有理数稠密性的证明是本章的技术难点，核心思路分三步：完备性公理 → 阿基米德性质（已作为引理单独列出） → 选整数夹逼。阿基米德性质本身由完备性公理反证得出，建议先让学生接受「自然数无上界」的直觉，再看严格证明。稠密性证明中每一步都附有 `>` 解释块，帮助学生理解「放大区间 → 找整数 → 验证范围」的逻辑。
*   无理数稠密性由有理数情形经「除以 $\sqrt{2}$ → 取有理数 → 乘回 $\sqrt{2}$」得出，关键引理是非零有理数乘无理数仍为无理数（反证即得）。
*   戴德金分割与上下确界的关系 $\alpha=\sup A=\inf B$ 是连接 Ch16 与 Ch17 的桥梁，务必点明：分割所定义的实数就是 $A$ 的上确界，也是 $B$ 的下确界。
*   戴德金分割可用「剪刀切绳子」比喻讲解，不必陷入集合论验证。
*   引入复数的动机是方程 $x^2+1=0$ 在 $\mathbb{R}$ 中无解，教学中可先让学生尝试在 $\mathbb{R}$ 中找解，再引出虚数单位 $i$。
*   复数加减法配合平行四边形法则演示；共轭关于实轴的反射是几何直觉的核心。
*   乘以 $i$ 相当于逆时针旋转 $90^\circ$（后续三角函数章节深入展开）。
*   分母实数化技巧与初中二次根式分母有理化思路一致，是 DSE 常考点。
*   复数的整数幂与 $i$ 的幂循环（§17.2.3）可让学生背诵 $i,-1,-i,1$ 序列；§17.2.6 负实数的平方根是下一章解二次方程的关键工具，务必让学生掌握 $\sqrt{a}=i\sqrt{|a|}$（$a<0$）的约定。根式运算律扩充后不再普遍成立（乘积律两负即失效、商律只分母负失效），铁律是先化 $i\sqrt{|a|}$ 再作四则运算。
*   本章复数内容为后续解方程（二次方程复根情形）及三角函数中的复数指数形式奠定基础。

（本讲义基于 LaTeX 源文件 `chapter17数系.tex` 与 Textbook Plan `Ch17 数系(II).md` 撰写，取两者并集，严格遵循 DSE 考纲与讲义格式规范）


✅ 已執行（2026-09-02）：注释 1、2 已落实。§17.2.3 末新增「复数的整数幂」块（$i$ 幂循环定理自 §17.2.6 整体移入，附二项式展开示例与超纲自标注）；§17.2.6 根式不可分配性系统扩充（乘积律/商律四情形推导 + 判别表 + 警示框 + 伪证辨误示例 + 商式练习），既有示例保留；§17.2.5 补超纲自标注；小结与备课提示同步；习题册现稿与大纲对照文件随批同步。注释标记与方案细节已删除。
