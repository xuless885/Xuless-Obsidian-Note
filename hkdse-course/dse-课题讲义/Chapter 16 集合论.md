---
tags: DSE课程笔记
---

# 16　集合论（Set Theory）

> 在上一章概率中，我们把事件说成「样本空间中的一部分结果」；在上一章解析几何中，我们用坐标描述点的位置。本章要补上它们背后的共同语言：**集合（Set）**。
>
> 集合语言的目的不是把题目写得更复杂，而是把「哪些对象属于同一类」「两个范围怎样重叠」「一个条件的解在哪里」说清楚。

前置：[[Chapter 0 基础概念|基础概念]]、[[Chapter 1 数系(I)|数系(I)]]、[[Chapter 11 不等式 (I)|不等式 (I)]]、[[Chapter 14 概率(I)|概率(I)]]、[[Chapter 15 解析几何 (I)|解析几何 (I)]]

本章分为三条主线：

1. 从开放命题出发，建立集合的逻辑基础：概括原则、属于关系、描述法、外延公理、列举法及其等价性；
2. 学习集合代数：子集、空集、全集、常用数集、笛卡尔积、$\mathbb{R}^n$ 与 $\mathbb{C}^n$、交集、并集、差集与余集、互斥集合，以及集合运算的基本性质；
3. 用集合语言描述实数区间，引入元素计数与容斥原理，并进一步讨论最大值、最小值、上界、下界、上确界、下确界与完备性公理。

> **怎样证明集合命题？** 本章的证明几乎都遵循同一套路。要证明两个集合 $A=B$，就用**外延公理**：任取对象 $x$，证明 $x\in A\iff x\in B$，即两边同时满足的条件完全一样。要证明 $A\subseteq B$，就用**子集定义**：任取 $x\in A$，推出 $x\in B$。掌握这两把钥匙，本章的证明就能看懂、能仿写。

---

## 16.1　集合的逻辑定义（Logical Foundation of Sets）

> **本节难度上限**：T B ｜ C D ｜ E B ｜ Q C

### 16.1.1　开放命题与概括原则（Open Proposition and Principle of Comprehension）


在前面几章中，我们已经多次使用「满足某个条件的对象」这种说法。例如：

- 满足 $x>0$ 的数；
- 满足 $x^2=4$ 的实数；
- 满足「$x$ 是 $6$ 的正因数」的正整数。

这些说法背后都有同一个结构：先给出一个开放命题 $P(x)$，再收集所有使 $P(x)$ 为真的对象。

> 什么是开放命题？开放命题 $P(x)$ 是含有自由变量 $x$ 的陈述句。给定 $x$ 一个具体值后，$P(x)$ 要么为真（$\mathbb{T}$），要么为假（$\mathbb{F}$）。例如 $P(x)=(x>0)$，当 $x=3$ 时 $P(3)=\mathbb{T}$，当 $x=-1$ 时 $P(-1)=\mathbb{F}$。

````ad-axi
title: 公理（概括原则） | Axiom（Principle of Comprehension）


设 $P(x)$ 为关于变量 $x$ 的开放命题。存在一个集合，记作
$$\{x \mid P(x)\},$$
其元素恰好是所有使 $P(x)$ 为真的对象 $x$。
````

概括原则说明：每一个开放命题都可以概括出一个集合。换言之，**集合是开放命题的外延（Extension）**。

> 「外延」可以理解为「实际收集到的成员名单」。两个开放命题即使写法不同，只要收集到的成员完全一样，它们就是同一个集合。这一点将在外延公理中严格表达。

````ad-example
title: 示例 | Example


将下列开放命题对应到集合：

| 开放命题 $P(x)$ | 对应集合 $\{x\mid P(x)\}$ |
|:---|:---|
| $x$ 是偶数 | 全体偶数的集合 |
| $x>0$ | 全体正数的集合 |
| $x$ 是 $6$ 的正因数 | $\{1,2,3,6\}$ |
| $x\neq x$ | $\varnothing$ |

---

前三行分别收集满足条件的对象。

最后一行中，任何对象都不可能满足 $x\neq x$，所以得到空集 $\varnothing$。
````

### 16.1.2　属于关系（Membership）


````ad-def
title: 定义（属于关系） | Definition（Membership）

设
$$A=\{x\mid P(x)\}.$$
对任意对象 $a$，若 $P(a)=\mathbb{T}$，则称 $a$ 是 $A$ 的**元素（Element）**，记作
$$a\in A.$$

若 $P(a)=\mathbb{F}$，则称 $a$ 不属于 $A$，记作
$$a\notin A.$$
````


属于关系把集合与命题连接起来：
$$a\in\{x\mid P(x)\}\quad\iff\quad P(a)=\mathbb{T}.$$

> 这条等价关系是本章的「翻译器」：凡是遇到 $\in$，就把它翻译成开放命题取真值；凡是遇到开放命题取真值，就把它翻译成 $\in$。后续证明中会反复使用这个翻译。

````ad-example
title: 示例 | Example


设
$$A=\{x\mid x\text{ 是 }12\text{ 的正因数}\}.$$
判断以下命题的真假：

(a) $3\in A$

(b) $5\in A$

(c) $12\notin A$

---

$A=\{1,2,3,4,6,12\}$。

(a) 真，因为 $3$ 是 $12$ 的正因数。

(b) 假，因为 $5$ 不是 $12$ 的正因数。

(c) 假，因为 $12\in A$。
````

### 16.1.3　描述法（Set-Builder Notation）


````ad-def
title: 定义（描述法） | Definition（Set-Builder Notation）

是用条件描述集合中的元素。

标准形式为
$$\{x\mid P(x)\},$$
读作「所有使 $P(x)$ 为真的 $x$ 所组成的集合」。
````
竖线 $\mid$ 左边写变量，右边写条件。条件本质上是开放命题。

描述法适合元素数目庞大或无限、但性质 $P(x)$ 易于表述的情况。本册两处最常靠它把「条件」变成「集合」：[[Chapter 20 直线方程|直线方程]] §20.1.2 把几何图形写成满足约束的点集，§20.3.2 再证明直线恰好就是二元一次方程的解集；[[Chapter 30 轨迹|轨迹]] §30.1.1 把几何条件写成点的轨迹，并在同节的注记（轨迹的方程）里指出：条件的代数式就是该轨迹的方程（按 §19.2.1 的注记），它的解集与轨迹同一。

> 有时会在竖线左侧限定变量取值范围，如 $\{x\in\mathbb{R}\mid x^2=4\}$，表示只考虑实数中满足 $x^2=4$ 的那些 $x$。若省略范围，则默认在当前讨论的全域中选取。

````ad-example
title: 示例 | Example


用描述法表示以下集合：

(a) 全体质数

(b) 所有满足 $x^2=4$ 的实数

(c) 所有满足 $1\le x\le 5$ 的实数

---

(a) 可写作
$$\{x\mid x\text{ 是质数}\}.$$

(b) 可写作
$$\{x\in\mathbb{R}\mid x^2=4\}.$$
这个集合也可列举为 $\{-2,2\}$。

(c) 可写作
$$\{x\in\mathbb{R}\mid 1\le x\le 5\}.$$
这就是区间 $[1,5]$。
````

### 16.1.4　外延公理（Axiom of Extensionality）


前面已经把集合当作「开放命题所刻画出来的对象」来理解。现在要进一步说明：一个集合到底是什么，不看它怎么写，只看它有哪些元素。这就是外延公理要表达的意思。

> 外延公理是本章最重要的判等工具。在后续证明中，要证明 $A=B$，几乎都是先用 $\in$ 把等式翻译成命题等价，再由外延公理得出集合相等。可以把外延公理想象成一座桥：一边是集合世界，另一边是命题世界，桥把「集合相等」翻译成「命题等价」。

````ad-axi
title: 公理（外延公理） | Axiom（of Extensionality）


两个集合相等，当且仅当它们含有完全相同的元素：
$$A=B\quad\iff\quad \forall x\,(x\in A\leftrightarrow x\in B).$$
````

外延公理说明：集合是什么，只由它包含哪些元素决定，不由写法、顺序或描述方式决定。

````ad-cor
title: 推论（命题等价则集合相等） | Corollary（Equivalence of Propositions Implies Set Equality）

若
$$A=\{x\mid P(x)\},\quad B=\{x\mid Q(x)\},$$
且对任意 $x$，都有
$$P(x)\iff Q(x),$$
则
$$A=B.$$
````

````ad-proof
title: 证明 | Proof

任取对象 $a$。

因为 $A=\{x\mid P(x)\}$，所以
$$a\in A\iff P(a) = \mathbb T$$

因为 $B=\{x\mid Q(x)\}$，所以
$$a\in B\iff Q(a)= \mathbb T$$

又已知 $P(a)\iff Q(a)$，故
$$a\in A\iff a\in B.$$

由于任意对象 $a$ 都满足此关系，由外延公理，$A=B$。
````

> 上面这个推论的证明就是「外延公理翻译法」的标准范例：先任取 $a$，用 $\in$ 的定义把 $a\in A$ 翻译成 $P(a)$，把 $a\in B$ 翻译成 $Q(a)$，再利用已知 $P(a)\iff Q(a)$ 搭桥，最后由外延公理收尾。后续很多证明都是这个模板。

````ad-example
title: 示例 | Example


判断以下集合是否相等：

$$A=\{1,2,3\},\quad B=\{3,2,1\},\quad C=\{1,1,2,3\}.$$

---

三个集合实际含有的元素都是 $1,2,3$。

顺序不影响集合，重复写同一元素也不改变集合。

因此
$$A=B=C.$$
````

### 16.1.5　列举法（Roster Method）


有了外延公理，我们就可以严格说明列举法与描述法之间的关系了。

````ad-def
title: 定义（列举法） | Definition（Roster Method）

是把集合的元素逐一写在花括号内，并用逗号分隔。

例如：
$$\{1,2,3,6\}.$$

列举法适合元素数目不多，或元素虽多但规律清楚的情况。若元素按明确规律继续下去，可使用省略号 $\cdots$。
````

列举法的作用，是把「已经知道有哪些元素」直接写出来。它和描述法刚好相反：描述法先写条件，再由条件筛出元素；列举法先给元素，再让读者看清楚有哪些成员。

````ad-example
title: 示例 | Example


用列举法表示以下集合：

(a) $6$ 的全体正因数

(b) 四季组成的集合

(c) 全体质数

---

(a) $\{1,2,3,6\}$。

(b) $\{\text{春},\text{夏},\text{秋},\text{冬}\}$。

(c) $\{2,3,5,7,11,13,\cdots\}$。省略号表示按质数规律继续。
````

````ad-thm
title: 定理（列举法与描述法的等价性） | Theorem（Equivalence of Roster and Set-Builder Notation）

若一个有限集合以列举法表示，则它亦可被描述法表示。

更具体地说，若
$$A=\{a_1,a_2,\cdots,a_n\},$$
则
$$A=\{x\mid (x=a_1)\lor(x=a_2)\lor\cdots\lor(x=a_n)\}.$$
````

这个命题的重点不在于某个具体集合，而在于所有有限列举集合都一样成立。只要集合中的元素写成有限个成员的列表，就能把「是其中一个成员」翻译成一个析取条件。

反过来，描述法 $\{x\mid P(x)\}$ 并不总能化为有限的列举，当满足 $P(x)$ 的对象有无穷多时，描述法是唯一可行的写法。

````ad-proof
title: 证明 | Proof

记
$$B=\{x\mid (x=a_1)\lor(x=a_2)\lor\cdots\lor(x=a_n)\}.$$

任取对象 $y$。

现在分两边证明。

若 $y\in A$，由于 $A=\{a_1,a_2,\cdots,a_n\}$，所以 $y$ 必等于 $a_1,a_2,\cdots,a_n$ 之中的某一个。

因此命题
$$(y=a_1)\lor(y=a_2)\lor\cdots\lor(y=a_n)$$
为真，所以 $y\in B$。

反过来，若 $y\in B$，则上述析取命题为真，所以 $y$ 必等于 $a_1,a_2,\cdots,a_n$ 之中的某一个。

因此 $y\in A$。

所以对任意对象 $y$，都有
$$y\in A\leftrightarrow y\in B.$$

由外延公理，$A=B$。
````

> 这个证明的写法就是标准的「双向论证」：先证 $A$ 的元素都属于 $B$（$A\subseteq B$），再证 $B$ 的元素都属于 $A$（$B\subseteq A$），最后由外延公理得 $A=B$。任何集合等式的证明都可以套用这个结构。

---

## 16.2　子集、空集与全集（Subsets, Empty Set and Universal Set）

> **本节难度上限**：T B- ｜ C D ｜ E B ｜ Q C

上一节解决了「怎样由条件形成集合」。接下来要解决的是「集合与集合之间怎样比较」。在概率中，事件 $A$ 若发生时事件 $B$ 必然发生，就表示 $A$ 是 $B$ 的一部分；在几何中，正方形同时也是矩形，也是在说一个类别被包含在另一个类别中。这类关系都由子集语言表达。

### 16.2.1　子集（Subset）


````ad-def
title: 定义（子集） | Definition（Subset）

若集合 $A$ 的每一个元素都属于集合 $B$，则称 $A$ 是 $B$ 的**子集（Subset）**，记作
$$A\subseteq B.$$

也就是说，
$$A\subseteq B\quad\iff\quad \forall x\,(x\in A\to x\in B).$$
````

> 子集定义是本章第二把钥匙。要证 $A\subseteq B$，只需任取 $x\in A$，推出 $x\in B$。注意 $A\subseteq B$ 不要求 $A\neq B$；如果 $A$ 是 $B$ 的一部分但不等于 $B$，则用真子集记号。

````ad-def
title: 定义（真子集） | Definition（Proper Subset）

若 $A\subseteq B$ 且 $A\neq B$，则称 $A$ 是 $B$ 的**真子集（Proper Subset）**，记作
$$A\subsetneq B.$$
````

判断子集时，不是看集合写得长不长，而是检查前一个集合的每一个元素是否都能在后一个集合中找到。

````ad-example
title: 示例 | Example


设
$$A=\{1,2\},\quad B=\{1,2,3\},\quad C=\{2,4\}.$$
判断以下关系是否成立：

(a) $A\subseteq B$

(b) $B\subseteq A$

(c) $C\subseteq B$

---

(a) 成立。$A$ 的元素 $1,2$ 都属于 $B$。

(b) 不成立。$3\in B$，但 $3\notin A$。

(c) 不成立。$4\in C$，但 $4\notin B$。
````

````ad-example
title: 示例 | Example


设全集为某班全体学生。令

$M$：参加数学学会的学生集合；

$S$：参加 STEM 校队的学生集合；

$H$：需要留校训练的学生集合。

若每个 STEM 校队成员都需要留校训练，判断 $S\subseteq H$ 是否成立。

---

成立。

$S\subseteq H$ 的意思是：每一个属于 $S$ 的学生都属于 $H$。

题目说每个 STEM 校队成员都需要留校训练，正是「每个 $S$ 的元素都是 $H$ 的元素」。

因此 $S\subseteq H$。
````

````ad-thm
title: 定理（子集自反性） | Theorem（Reflexivity of Subset）

对任意集合 $A$，都有
$$A\subseteq A$$
````

````ad-proof
title: 证明 | Proof

任取对象 $x$。

若 $x\in A$，则当然有 $x\in A$。

因此对任意 $x$，命题 $x\in A\to x\in A$ 恒真。

所以 $A\subseteq A$。
````

> 这个证明看似「什么都没做」，但它展示了子集证明的最简模板：任取 $x\in A$，推出 $x\in$（目标集合）。即使目标和起点相同，逻辑结构也不可省略。

### 16.2.2　空集（Empty Set）


````ad-def
title: 定义（空集） | Definition（Empty Set）

是不含任何元素的集合，记作
$$\varnothing$$

用描述法可写为
$$\varnothing=\{x\mid x\neq x\}$$
````

因为 $x=x$ 对任何对象都成立，所以 $x\neq x$ 对任何对象都为假。没有对象满足这个条件，因此得到空集。

````ad-thm
title: 定理（空集唯一性） | Theorem（Uniqueness of Empty Set）

空集是唯一的。
````

````ad-proof
title: 证明 | Proof

设 $E_1$ 与 $E_2$ 都是空集。

因为 $E_1$ 没有元素，所以任意对象 $x$ 都不属于 $E_1$。

因为 $E_2$ 没有元素，所以任意对象 $x$ 都不属于 $E_2$。

因此对任意 $x$，$x\in E_1$ 与 $x\in E_2$ 同时为假，故
$$x\in E_1\Longleftrightarrow x\in E_2.$$

由外延公理，$E_1=E_2$。

所以空集唯一。
````

> 这个证明再次用了外延公理翻译法：任取 $x$，把 $x\in E_1$ 和 $x\in E_2$ 分别翻译成命题，两边都是假，所以等价，由外延公理得 $E_1=E_2$。

````ad-thm
title: 定理（空集为子集） | Theorem（Empty Set as Subset）

对任意集合 $A$，都有
$$\varnothing\subseteq A.$$
````

````ad-proof
title: 证明 | Proof

要证明 $\varnothing\subseteq A$，需证明：对任意 $x$，若 $x\in\varnothing$，则 $x\in A$。

但不存在任何 $x$ 使得 $x\in\varnothing$。

因此前提 $x\in\varnothing$ 永远不成立，条件句自动为真。

所以 $\varnothing\subseteq A$。
````

> 这种「前提恒假，条件句自动为真」的推理在逻辑中称为**空真（Vacuous Truth）**。直觉上可以理解为：空集没有元素，所以「每个元素都满足某条件」这个承诺永远不会被违反。

````ad-example
title: 示例 | Example


写出以下集合：

(a) 小于 $0$ 的正整数所组成的集合

(b) 同时为奇数和偶数的整数所组成的集合

---

(a) 没有正整数小于 $0$，所以集合为 $\varnothing$。

(b) 没有整数能同时为奇数和偶数，所以集合为 $\varnothing$。
````

### 16.2.3　全集（Universal Set）


````ad-def
title: 定义（全集） | Definition（Universal Set）

设 $A, B, \cdots$ 为一组集合。若集合 $U$ 满足
$$A\cup B\cup\cdots\subseteq U,$$
则称 $U$ 为 $A, B, \cdots$ 的**全集（Universal Set）**。

也就是说，$U$ 是 $A, B, \cdots$ 的全集，当且仅当 $A, B, \cdots$ 的并集是 $U$ 的子集。
````

> 换句话说，全集就是「把所有相关集合的元素都装进去」的那个大集合。全集由题目或语境决定，不是固定不变的。若题目讨论一班学生，则全集是该班全体学生；若题目讨论 $1$ 至 $10$ 的整数，则全集是 $\{1,2,3,4,5,6,7,8,9,10\}$。

````ad-example
title: 示例 | Example


设
$$A=\{1,2,3\},\quad B=\{3,4,5\}.$$
判断 $U=\{1,2,3,4,5,6\}$ 是否为 $A, B$ 的全集。

---

先求并集：
$$A\cup B=\{1,2,3,4,5\}.$$

因为 $\{1,2,3,4,5\}\subseteq\{1,2,3,4,5,6\}$，所以 $U$ 是 $A, B$ 的全集。

注意 $U$ 比并集多了一个元素 $6$，这完全合法：全集只需要包含并集，不要求恰好等于并集。
````

````ad-example
title: 示例 | Example


设全集
$$U=\{1,2,3,4,5,6,7,8,9,10\}.$$
设 $A$ 为其中偶数所组成的集合。写出 $A$。

---

在 $U$ 中，偶数为 $2,4,6,8,10$，所以
$$A=\{2,4,6,8,10\}.$$
````

---

## 16.3　常用数集与笛卡尔积（Common Number Sets and Cartesian Product）

> **本节难度上限**：T C ｜ C D ｜ E C ｜ Q B

集合不只用来装数字，也可以装点、颜色、学生、结果甚至有序对。为了把解析几何和概率的语言统一起来，我们需要两个工具：常用数集记号，以及由两个集合产生有序对集合的笛卡尔积。

### 16.3.1　常用数集（Common Number Sets）


````ad-def
title: 定义（常用数集） | Definition（Common Number Sets）

常用数集记号如下：

| 记号 | 中文 | English |
|------|------|---------|
| $\mathbb{N}$ | 自然数集 | Natural Numbers |
| $\mathbb{Z}$ | 整数集 | Integers |
| $\mathbb{Q}$ | 有理数集 | Rational Numbers |
| $\mathbb{R}$ | 实数集 | Real Numbers |

写开如下：

- $\mathbb{N}$：自然数集，所有自然数组成的集合。
- $\mathbb{Z}$：整数集，所有整数（包括正整数、$0$ 和负整数）组成的集合。
- $\mathbb{Q}$：有理数集，所有可以写成 $\frac{a}{b}$（其中 $a,b\in\mathbb{Z}$，且 $b\neq0$）的数组成的集合。
- $\mathbb{R}$：实数集，所有实数组成的集合。
````

本章只需要知道这些符号代表常见数集。它们的更细致构造与性质会在后续数系章节继续处理。

> 这些数集之间有包含关系：$\mathbb{N}\subseteq\mathbb{Z}\subseteq\mathbb{Q}\subseteq\mathbb{R}$。自然数都是整数，整数都是有理数，有理数都是实数。反过来则不成立。

````ad-example
title: 示例 | Example


判断以下说法是否正确：

(a) $-3\in\mathbb{Z}$

(b) $\frac{2}{5}\in\mathbb{Z}$

(c) $\sqrt{2}\in\mathbb{R}$

---

(a) 正确，$-3$ 是整数。

(b) 错误，$\frac{2}{5}$ 是有理数，但不是整数。

(c) 正确，$\sqrt{2}$ 是无理数，也属于实数。
````

### 16.3.2　笛卡尔积（Cartesian Product）


````ad-def
title: 定义（笛卡尔积） | Definition（Cartesian Product）

设 $A,B$ 为集合。$A$ 与 $B$ 的**笛卡尔积（Cartesian Product）** 定义为
$$A\times B=\{(a,b)\mid a\in A\text{ 且 }b\in B\}.$$

即所有第一项来自 $A$、第二项来自 $B$ 的有序对组成的集合。
````

笛卡尔积中的元素是有序对，所以顺序重要。一般来说，$A\times B$ 与 $B\times A$ 不一定相同。

> 笛卡尔积的名字来自法国数学家笛卡尔（Descartes），他发明了坐标系。事实上，坐标平面就是 $\mathbb{R}\times\mathbb{R}$，即 $\mathbb{R}^2$。笛卡尔积把「两个集合配对」这件事变成了一个新的集合。

````ad-example
title: 示例 | Example


设
$$A=\{1,2\},\quad B=\{x,y\}.$$
写出 $A\times B$ 与 $B\times A$。

---

$$A\times B=\{(1,x),(1,y),(2,x),(2,y)\}.$$

$$B\times A=\{(x,1),(x,2),(y,1),(y,2)\}.$$

例如 $(1,x)\neq(x,1)$，所以一般来说 $A\times B\neq B\times A$。
````

````ad-example
title: 示例 | Example


一间咖啡店有两种杯型
$$C=\{\text{小杯},\text{大杯}\},$$
三种口味
$$F=\{\text{拿铁},\text{美式},\text{摩卡}\}.$$
用笛卡尔积表示所有「杯型，口味」组合，并数出共有多少种。

---

所有组合为
$$\begin{aligned}
C\times F=\{& (\text{小杯},\text{拿铁}),(\text{小杯},\text{美式}),(\text{小杯},\text{摩卡}),\\
& (\text{大杯},\text{拿铁}),(\text{大杯},\text{美式}),(\text{大杯},\text{摩卡})\}.
\end{aligned}$$

共 $2\times3=6$ 种组合。
````

### 16.3.3　$\mathbb{R}^n$（Real Coordinate Spaces）


````ad-def
title: 定义（$\mathbb{R}^n$） | Definition（Real Coordinate Spaces）

对正整数 $n$，定义
$$\mathbb{R}^n=\{(x_1,x_2,\cdots,x_n)\mid x_i\in\mathbb{R}\text{ 对每个 }i\text{ 成立}\}.$$

即 $\mathbb{R}^n$ 是所有 $n$ 元有序实数组组成的集合。
````

$\mathbb{R}^2$ 可理解为直角坐标平面，元素 $(x,y) \in \mathbb R^2$ 可视为平面上的点。$\mathbb{R}^3$ 可理解为三维空间，元素 $(x,y,z)\in \mathbb R^3$ 可视为空间中的点。这些空间中的元素称为**点**或**向量**，可进行分量加法及纯量乘法，为后续解析几何的公式推导提供了统一工具。

> 这里提到的分量加法和纯量乘法，在第 15 章解析几何中已经介绍过。在第 15 章中，我们把平面上的点 $(x,y)$ 视为向量，定义了向量加法 $(a,b)+(c,d)=(a+c,b+d)$ 和纯量乘法 $k(a,b)=(ka,kb)$。现在用集合语言来看，那些运算的对象恰好是 $\mathbb{R}^2$ 的元素。换言之，第 15 章的坐标平面就是 $\mathbb{R}^2$，本章只是给它一个正式的集合论身份。

````ad-example
title: 示例 | Example


判断以下对象属于哪个集合：

(a) $(2,-1)$

(b) $(0,3,5)$

(c) $(1,\sqrt{2})$

---

(a) $(2,-1)$ 是两个实数组成的有序对，所以 $(2,-1)\in\mathbb{R}^2$。

(b) $(0,3,5)$ 是三个实数组成的有序三元组，所以 $(0,3,5)\in\mathbb{R}^3$。

(c) $1$ 与 $\sqrt{2}$ 都是实数，所以 $(1,\sqrt{2})\in\mathbb{R}^2$。
````

---

## 16.4　集合运算（Operations on Sets）

> **本节难度上限**：T B+ ｜ C D ｜ E B ｜ Q C

当我们同时面对两个条件时，最常见的问题有三类：两者共同满足什么、至少满足其中一个是什么、从一个集合中去掉另一个集合的元素后还剩什么。交集、并集和差集正是这三类问题的符号化表达。

### 16.4.1　交集（Intersection）


````ad-def
title: 定义（交集） | Definition（Intersection）

集合 $A$ 与集合 $B$ 的**交集（Intersection）** 是同时属于 $A$ 和 $B$ 的元素所组成的集合，记作
$$A\cap B.$$

即
$$A\cap B=\{x\mid x\in A\text{ 且 }x\in B\}.$$
````

交集对应逻辑中的合取，即「且」。一个元素要进入 $A\cap B$，必须同时满足 $A$ 与 $B$ 对应的两个条件。

````ad-example
title: 示例 | Example


设
$$A=\{1,2,3,4\},\quad B=\{3,4,5,6\}.$$
求 $A\cap B$。

---

同时属于 $A$ 和 $B$ 的元素为 $3,4$，所以
$$A\cap B=\{3,4\}.$$
````

````ad-example
title: 示例 | Example


设全集为一副标准扑克牌。令

$R$ 为红色牌的集合，$F$ 为人头牌的集合。

用文字解释 $R\cap F$。

---

$R\cap F$ 是同时属于 $R$ 和 $F$ 的牌。

因此它表示「红色的人头牌」，即红桃或方块中的 J、Q、K。
````

### 16.4.2　并集（Union）


````ad-def
title: 定义（并集） | Definition（Union）

集合 $A$ 与集合 $B$ 的**并集（Union）** 是属于 $A$ 或属于 $B$ 的元素所组成的集合，记作
$$A\cup B.$$

即
$$A\cup B=\{x\mid x\in A\text{ 或 }x\in B\}.$$
````

这里的「或」与逻辑中的析取一致：属于其中一个即可，同时属于两个也可以。

````ad-example
title: 示例 | Example


设
$$A=\{1,2,3,4\},\quad B=\{3,4,5,6\}.$$
求 $A\cup B$。

---

属于 $A$ 或 $B$ 的元素为 $1,2,3,4,5,6$。

注意 $3,4$ 不重复书写，所以
$$A\cup B=\{1,2,3,4,5,6\}.$$
````

### 16.4.3　差集与余集（Set Difference and Complement）


````ad-def
title: 定义（差集） | Definition（Set Difference）

设 $A,B$ 为任意两个集合。$A$ 与 $B$ 的**差集（Set Difference）** 是属于 $A$ 但不属于 $B$ 的元素所组成的集合，记作
$$A\setminus B.$$

即
$$A\setminus B=\{x\in A\mid x\notin B\}.$$

差集也常写作 $A-B$，即 $A\setminus B = A - B$，两种记法完全等价。
````


差集不需要全集。它只从 $A$ 中拿走 $B$ 的元素，剩下什么就是什么。

````ad-example
title: 示例 | Example


设
$$A=\{1,2,3,4\},\quad B=\{3,4,5,6\}.$$
求 $A\setminus B$ 与 $B\setminus A$。

---

$A\setminus B$ 是属于 $A$ 但不属于 $B$ 的元素，即 $\{1,2\}$。

$B\setminus A$ 是属于 $B$ 但不属于 $A$ 的元素，即 $\{5,6\}$。

注意 $A\setminus B\neq B\setminus A$，差集一般不满足交换律。
````

````ad-def
title: 定义（余集） | Definition（Complement）

设 $U$ 为 $A$ 的全集。$A$ 的**余集（Complement）** 是 $U$ 中不属于 $A$ 的元素所组成的集合，记作
$$A^c=U\setminus A.$$

即
$$A^c=\{x\in U\mid x\notin A\}.$$
````

> 余集其实就是差集的特例：取 $U\setminus A$，就得到 $A$ 的余集。所以余集 $A^c$ 一定依赖全集 $U$。没有全集，就无法判断「不属于 $A$」的对象应从哪里选。后面遇到需要「从某个范围中排除 $A$」的情况，都可以用差集或余集来表达。

````ad-example
title: 示例 | Example


设
$$U=\{1,2,3,4,5,6,7,8,9,10\},\quad A=\{2,4,6,8,10\}.$$
求 $A^c$。

---

在 $U$ 中但不属于 $A$ 的元素为 $1,3,5,7,9$，所以
$$A^c=\{1,3,5,7,9\}.$$
````

### 16.4.4　互斥集合（Disjoint Sets）


````ad-def
title: 定义（互斥集合） | Definition（Disjoint Sets）

若两个集合没有共同元素，则称它们为**互斥集合（Disjoint Sets）**，也叫**不相交集合**。

即若
$$A\cap B=\varnothing,$$
则 $A$ 与 $B$ 互斥（不相交）。
````

> 「互斥」和「不相交」是同一个概念的不同说法。在概率中通常说「互斥事件」，在集合论中通常说「不相交集合」，意思完全一样：两个集合没有共同元素。

````ad-example
title: 示例 | Example


设
$$A=\{1,3,5\},\quad B=\{2,4,6\}.$$
判断 $A$ 与 $B$ 是否互斥。

---

$A$ 中元素全为奇数，$B$ 中元素全为偶数，二者没有共同元素。

所以
$$A\cap B=\varnothing,$$
故 $A$ 与 $B$ 互斥（不相交）。
````

### 16.4.5　集合运算的基本性质（Basic Laws of Set Operations）


````ad-thm
title: 定理（交换律） | Theorem（Commutative Law）

对任意集合 $A,B$，有
$$A\cap B=B\cap A,$$
$$A\cup B=B\cup A.$$

即交集和并集满足交换律。
````

````ad-proof
title: 证明 | Proof

先证 $A\cap B=B\cap A$。

任取对象 $x$。

$$\begin{aligned}
x\in A\cap B
&\iff (x\in A\text{ 且 }x\in B) \\
&\iff (x\in B\text{ 且 }x\in A) \\
&\iff x\in B\cap A.
\end{aligned}$$

由外延公理，$A\cap B=B\cap A$。

并集同理：
$$\begin{aligned}
x\in A\cup B
&\iff (x\in A\text{ 或 }x\in B) \\
&\iff (x\in B\text{ 或 }x\in A) \\
&\iff x\in B\cup A.
\end{aligned}$$

由外延公理，$A\cup B=B\cup A$。
````

> 上面这个证明的套路：任取 $x$，把 $\in A\cap B$ 翻译成「$x\in A$ 且 $x\in B$」，利用逻辑中「且」的交换性得到「$x\in B$ 且 $x\in A$」，再翻译回 $\in B\cap A$。整个证明就是在外延公理的桥上来回翻译。并集的证明完全一样，只是把「且」换成「或」。

````ad-example
title: 示例 | Example


设 $U=\{1,2,3,4,5\}$，$A=\{1,3,5\}$。

(a) 求 $A^c$；

(b) 验证 $A\cup A^c=U$ 和 $A\cap A^c=\varnothing$。

---

(a) $A^c=\{2,4\}$。

(b) $A\cup A^c=\{1,2,3,4,5\}=U$，验证成立。

$A\cap A^c$：没有元素同时属于 $A$ 和 $A^c$，故 $A\cap A^c=\varnothing$，验证成立。
````

````ad-thm
title: 定理（余集性质） | Theorem（Properties of Complement）

设全集为 $U$。对任意集合 $A\subseteq U$，有
$$A\cup A^c=U,$$
$$A\cap A^c=\varnothing.$$
````

````ad-proof
title: 证明 | Proof

任取 $x\in U$。

若 $x\in A$，则 $x\in A\cup A^c$。

若 $x\notin A$，则由余集定义，$x\in A^c$，所以 $x\in A\cup A^c$。

因此 $U$ 中每个元素都属于 $A\cup A^c$，且 $A\cup A^c$ 的元素本来都来自 $U$，所以 $A\cup A^c=U$。

对第二式，若 $x\in A\cap A^c$，则 $x\in A$ 且 $x\in A^c$。

但 $x\in A^c$ 表示 $x\notin A$，矛盾。

所以没有元素属于 $A\cap A^c$，故 $A\cap A^c=\varnothing$。
````

> 第二式用的是反证法：假设存在 $x\in A\cap A^c$，推出 $x\in A$ 且 $x\notin A$，矛盾。这种「假设存在，推出矛盾」的手法在集合证明中很常见。


---

## 16.5　集合的元素数目（Number of Elements）

> **本节难度上限**：T C+ ｜ C C ｜ E C ｜ Q B-

集合语言在概率和统计中最直接的作用是计数。很多概率题本质上是在问「某个事件集合有多少个结果」。不过，当两个条件有重叠时，直接相加会重复计数，容斥原理就是专门处理这种重叠的工具。

### 16.5.1　有限集与元素数目（Finite Set and Cardinality）


````ad-def
title: 定义（有限集与基数） | Definition（Finite Set and Cardinality）

若集合 $A$ 只有有限多个元素，则称 $A$ 为**有限集（Finite Set）**。

有限集 $A$ 的元素数目称为 $A$ 的**基数（Cardinality）**，记作
$$n(A).$$
````


> 「基数」和「元素数目」是同一件事的两种说法。在初等数学中常说「元素数目」，在高等数学中则习惯说「基数」。对于有限集，基数就是一个非负整数。对于无限集（如 $\mathbb{N}$），基数也可以定义，但需要更深入的理论，这里暂不展开。在 DSE 中，$n(A)$ 始终表示有限集的元素个数。
>
> 除了 $n(A)$ 外，基数还有其他常见记法：$|A|$、$\text{card}(A)$、$\#A$。在 DSE 中统一使用 $n(A)$，但在高等数学中 $|A|$ 更常见。注意 $|A|$ 与绝对值记号相同，需根据上下文区分。

````ad-example
title: 示例 | Example


设
$$A=\{2,4,6,8,10\}.$$
求 $n(A)$。

---

集合 $A$ 中有 $5$ 个元素，所以
$$n(A)=5.$$
````

````ad-example
title: 示例 | Example


设 $A=\{a,b,c\}$，$B=\{x\in\mathbb{Z}\mid 1\le x\le 10\}$。求 $n(A)$ 和 $n(B)$。

---

$A$ 有 $3$ 个元素，所以 $n(A)=3$。

$B$ 是 $1$ 到 $10$ 的全体整数，共 $10$ 个，所以 $n(B)=10$。
````

### 16.5.2　容斥原理（Inclusion-Exclusion Principle）


假设班上有 $24$ 人参加数学学会，$18$ 人参加科学学会。能说至少参加一个学会的有 $24+18=42$ 人吗？不一定。因为有些学生可能同时参加两个学会，直接相加会把他们重复计算。容斥原理就是用来处理这种「有重叠时的计数」问题。

````ad-thm
title: 定理（容斥原理） | Theorem（Inclusion-Exclusion Principle）

设 $A,B$ 为有限集，则
$$n(A\cup B)=n(A)+n(B)-n(A\cap B).$$

这称为**容斥原理（Inclusion-Exclusion Principle）**。
````


````ad-proof
title: 证明 | Proof

计算 $n(A)+n(B)$ 时，属于 $A$ 但不属于 $B$ 的元素被数一次，属于 $B$ 但不属于 $A$ 的元素也被数一次。

但同时属于 $A$ 和 $B$ 的元素被数了两次：一次在 $n(A)$ 中，一次在 $n(B)$ 中。

因此要减去一次 $n(A\cap B)$，使共同元素只保留一次。

所以
$$n(A\cup B)=n(A)+n(B)-n(A\cap B).$$
````

> 这个证明的思路是「数清楚每个区域被数了几次」。可以把 $A\cup B$ 想成三个不重叠的区域：只在 $A$ 中的、只在 $B$ 中的、同时在 $A$ 和 $B$ 中的。$n(A)+n(B)$ 把第三个区域数了两次，所以减一次。

````ad-cor
title: 推论（互斥集合计数） | Corollary（Counting Disjoint Sets）

若 $A$ 与 $B$ 互斥（不相交），则
$$n(A\cup B)=n(A)+n(B).$$
````


````ad-proof
title: 证明 | Proof

若 $A$ 与 $B$ 互斥，则 $A\cap B=\varnothing$。

因为 $n(\varnothing)=0$，由容斥原理，
$$\begin{aligned}
n(A\cup B)
&=n(A)+n(B)-n(A\cap B)\\
&=n(A)+n(B)-0\\
&=n(A)+n(B).
\end{aligned}$$
````

````ad-example
title: 示例 | Example


某班有 $40$ 名学生，其中 $24$ 人参加数学学会，$18$ 人参加科学学会，$10$ 人同时参加两个学会。问至少参加一个学会的学生有多少人？

---

设 $A$ 为参加数学学会的学生集合，$B$ 为参加科学学会的学生集合。

已知
$$n(A)=24,\quad n(B)=18,\quad n(A\cap B)=10.$$

由容斥原理：
$$\begin{aligned}
n(A\cup B)
&=n(A)+n(B)-n(A\cap B)\\
&=24+18-10\\
&=32.
\end{aligned}$$

所以至少参加一个学会的学生有 $32$ 人。
````

````ad-example
title: 示例 | Example


一个网上商店统计 $100$ 名顾客的购买记录。$48$ 人买过书，$35$ 人买过文具，$20$ 人两者都买过。问至少买过其中一种的顾客有多少人？另有多少人两者都没有买过？

---

设 $B$ 为买过书的顾客集合，$S$ 为买过文具的顾客集合。

至少买过其中一种的人数为
$$\begin{aligned}
n(B\cup S)
&=n(B)+n(S)-n(B\cap S)\\
&=48+35-20\\
&=63.
\end{aligned}$$

两者都没有买过的人数为
$$100-63=37.$$

所以至少买过其中一种的顾客有 $63$ 人，两者都没有买过的顾客有 $37$ 人。
````

````ad-lem
title: 引理（拓展） | Lemma（Extension）

三个有限集的容斥公式为
$$\begin{aligned}
n(A\cup B\cup C)
&=n(A)+n(B)+n(C)\\
&\quad -n(A\cap B)-n(B\cap C)-n(C\cap A)\\
&\quad +n(A\cap B\cap C).
\end{aligned}$$
这不是本章基础要求，但它解释了为什么重叠部分要「先减后加」。
````

````ad-example
title: 示例 | Example


某班有 $50$ 名学生，其中 $30$ 人学钢琴，$20$ 人学小提琴，$15$ 人学画画。同时学钢琴和小提琴的有 $10$ 人，同时学小提琴和画画的有 $5$ 人，同时学钢琴和画画的有 $8$ 人，三项都学的有 $3$ 人。求至少学一项的学生有多少人。

---

设 $P$ 为学钢琴的学生集合，$V$ 为学小提琴的学生集合，$D$ 为学画画的学生集合。

由三集合容斥公式：
$$\begin{aligned}
n(P\cup V\cup D)
&=n(P)+n(V)+n(D)\\
&\quad -n(P\cap V)-n(V\cap D)-n(D\cap P)\\
&\quad +n(P\cap V\cap D)\\
&=30+20+15-10-5-8+3\\
&=45.
\end{aligned}$$

所以至少学一项的学生有 $45$ 人。
````

---

## 16.6　区间（Intervals）

> **本节难度上限**：T C+ ｜ C C ｜ E C ｜ Q C

区间是描述法在实数集 $\mathbb{R}$ 上最重要的一类应用。它以简洁记号表示数线上的连续范围。

学习区间的动机很直接：不等式的解通常不是几个孤立的数，而是一整段连续范围。例如 $1<x<5$ 的解不是单个数，而是 $1$ 与 $5$ 之间所有实数。区间记号就是为了高效表达这些范围。

其实在上一章估算中，我们已经接触过区间的记号，例如用 $(1,5)$ 表示 $1$ 与 $5$ 之间的实数。本章正式用集合语言定义区间，把它作为描述法在实数集上的重要应用。

### 16.6.1　开区间、闭区间与半开区间（Open, Closed and Half-Open Intervals）


````ad-def
title: 定义（区间） | Definition（Interval）

设 $a,b\in\mathbb{R}$ 且 $a<b$。

- **开区间（Open Interval）**：
 $$(a,b)=\{x\in\mathbb{R}\mid a<x<b\}.$$
- **闭区间（Closed Interval）**：
 $$[a,b]=\{x\in\mathbb{R}\mid a\le x\le b\}.$$
- **左闭右开区间（Half-Open Interval）**：
 $$[a,b)=\{x\in\mathbb{R}\mid a\le x<b\}.$$
- **左开右闭区间（Half-Open Interval）**：
 $$(a,b]=\{x\in\mathbb{R}\mid a<x\le b\}.$$
````


$a$ 称为左端点，$b$ 称为右端点。圆括号表示不包含端点，方括号表示包含端点。区间的本质是以不等式作为开放命题 $P(x)$ 的描述法实例：
$$[a,b]=\{x\in\mathbb{R}\mid P(x)\},\quad P(x): a\le x\le b.$$

> 什么时候用圆括号、什么时候用方括号？记忆方法是：方括号 $[$ 像「墙壁」，把端点围在里面，所以包含端点；圆括号 $($ 像「开口」，端点可以溜走，所以不包含端点。

````ad-example
title: 示例 | Example


将以下不等式写成区间：

(a) $1<x<5$

(b) $-2\le x\le 3$

(c) $0\le x<4$

---

(a) 两端都不包含，故为 $(1,5)$。

(b) 两端都包含，故为 $[-2,3]$。

(c) 左端包含，右端不包含，故为 $[0,4)$。
````

````ad-example
title: 示例 | Example


解以下不等式，并用区间表示解集：

(a) $2x-1<5$

(b) $3\le 2x+1<7$

(c) $x^2\le 9$

---

(a) 解不等式：
$$2x-1<5\implies 2x<6\implies x<3.$$
解集为 $(-\infty,3)$。

(b) 对不等式各部分同减 $1$ 再除以 $2$：
$$3\le 2x+1<7\implies 2\le 2x<6\implies 1\le x<3.$$
解集为 $[1,3)$。

(c) 由 $x^2\le 9$ 得 $|x|\le 3$，即 $-3\le x\le 3$。
解集为 $[-3,3]$。
````

### 16.6.2　无限区间（Unbounded Intervals）


````ad-def
title: 定义（无限区间） | Definition（Unbounded Interval）

若区间向左或向右无限延伸，可用 $\infty$ 或 $-\infty$ 表示方向。

例如：
$$[a,\infty)=\{x\in\mathbb{R}\mid x\ge a\},$$
$$(-\infty,b)=\{x\in\mathbb{R}\mid x<b\}.$$
````


无限区间（如 $[a,\infty)$ 和 $(-\infty,b)$）有时也称为**射线（Ray）**，因为它们在数线上只向一个方向延伸。

$\infty$ 不是实数，所以靠近 $\infty$ 或 $-\infty$ 的一端一定使用圆括号。

> $\infty$（无穷大）只是一个方向标记，表示「一直往右延伸」，它本身不是一个数，不能作为元素属于任何集合。因此 $[a,\infty]$ 是错误的写法，必须写成 $[a,\infty)$。

````ad-example
title: 示例 | Example


将以下不等式写成区间：

(a) $x\ge2$

(b) $x<-1$

---

(a) $x$ 从 $2$ 开始向右延伸，并包含 $2$，故为 $[2,\infty)$。

(b) $x$ 在 $-1$ 左方，并不包含 $-1$，故为 $(-\infty,-1)$。
````

### 16.6.3　区间与有序对的记号区别（Intervals and Ordered Pairs）


````ad-note
title: 注记 | Note

$(a,b)$ 在不同语境中可能表示开区间，也可能表示有序对。

当 $a,b$ 为数且涉及不等式时，$(a,b)$ 通常表示开区间。

当讨论坐标或笛卡尔积时，$(a,b)$ 表示有序对。
````


若两种含义同时出现，应使用花括号和条件清楚说明。例如
$$\{(x,y)\mid x\in(0,1),\ y\in[0,2]\}$$
表示所有横坐标在 $(0,1)$ 中，纵坐标在 $[0,2]$ 中的点。

````ad-example
title: 示例 | Example


解释下列记号中的 $(0,1)$ 含义：

(a) $x\in(0,1)$

(b) $(0,1)\in\mathbb{R}^2$

---

(a) 此处 $(0,1)$ 是开区间，表示 $0<x<1$。

(b) 此处 $(0,1)$ 是有序对，表示坐标平面中的一个点。
````

### 16.6.4　区间的交与并（Intersection and Union of Intervals）


区间本身就是实数集合，所以可以对区间取交集和并集。求区间的交并时，关键是找出端点之间的关系：交集取两端点中「更紧」的范围，并集取「更松」的范围。

````ad-example
title: 示例 | Example


设
$$A=[1,5],\quad B=(3,8).$$
求 $A\cap B$ 与 $A\cup B$。

---

同时属于 $A$ 和 $B$ 的数必须满足 $3<x\le5$，所以
$$A\cap B=(3,5].$$

属于 $A$ 或 $B$ 的数覆盖从 $1$ 到 $8$ 的连续范围，其中 $1$ 包含，$8$ 不包含，所以
$$A\cup B=[1,8).$$
````

````ad-example
title: 示例 | Example


某机器的安全工作温度为 $10\le T\le 35$。另一项材料限制要求 $T<30$。用区间表示同时满足两项要求的温度范围。

---

第一项要求为 $[10,35]$。

第二项要求为 $(-\infty,30)$。

同时满足两项要求，即取交集：
$$[10,35]\cap(-\infty,30)=[10,30).$$

所以安全且符合材料限制的温度范围为 $[10,30)$。
````

---

## 16.7　实数集的界与确界（Bounds, Supremum and Infimum）

> **本节难度上限**：T B+ ｜ C D ｜ E B ｜ Q C

区间让我们能描述一段范围，但很多时候我们还要问：这个范围有没有最高点、最低点、天花板或地板？例如分数范围、物价范围、函数取值范围，都需要这种语言。最大值、最小值、上界、下界和确界正是为了区分这些细节。

### 16.7.1　最大值与最小值（Maximum and Minimum）


````ad-def
title: 定义（最大值与最小值） | Definition（Maximum and Minimum）

设 $S\subseteq\mathbb{R}$ 且 $S\neq\varnothing$。

若存在 $M\in S$，使得对任意 $x\in S$，都有 $x\le M$，则称 $M$ 为 $S$ 的**最大值（Maximum）**，记作 $\max S=M$。

若存在 $m\in S$，使得对任意 $x\in S$，都有 $m\le x$，则称 $m$ 为 $S$ 的**最小值（Minimum）**，记作 $\min S=m$。
````


最大值和最小值必须属于集合本身。若端点不被包含，就不能把它当作最大值或最小值。

> 最大值和最小值的关键特征是「必须属于集合」。例如 $(1,5)$ 中所有数都小于 $5$，但 $5\notin(1,5)$，所以 $5$ 不是最大值。这个区别是后面引入确界概念的动机。

````ad-example
title: 示例 | Example


判断以下集合是否有最大值和最小值：

(a) $[1,5]$

(b) $(1,5)$

(c) $[1,5)$

---

(a) $[1,5]$ 有最小值 $1$，最大值 $5$。

(b) $(1,5)$ 没有最小值，也没有最大值，因为 $1$ 与 $5$ 都不属于该集合。

(c) $[1,5)$ 有最小值 $1$，但没有最大值，因为 $5$ 不属于该集合。
````

### 16.7.2　上界、下界与有界集（Upper Bound, Lower Bound and Bounded Set）


````ad-def
title: 定义（上界、下界与有界集） | Definition（Upper Bound, Lower Bound and Bounded Set）

设 $S\subseteq\mathbb{R}$ 且 $S\neq\varnothing$。

若存在实数 $M$，使得对任意 $x\in S$，都有 $x\le M$，则称 $M$ 为 $S$ 的一个**上界（Upper Bound）**。

若存在实数 $m$，使得对任意 $x\in S$，都有 $m\le x$，则称 $m$ 为 $S$ 的一个**下界（Lower Bound）**。

若 $S$ 既有上界又有下界，则称 $S$ 为**有界集（Bounded Set）**。
````
上界和下界不一定属于集合。最大值必须属于集合，上界只需要压在集合上方即可。

> 上界不唯一：如果 $M$ 是上界，那么任何比 $M$ 大的数也是上界。例如对 $(1,5)$，$5$ 是上界，$6$、$100$ 都是上界。同样，下界也不唯一。既然上界有无穷多个，自然要问：有没有一个「最紧」的上界？这就是上确界。

````ad-example
title: 示例 | Example


设
$$S=(1,5).$$
判断 $5,6,1,0$ 是否为 $S$ 的上界或下界。

---

对任意 $x\in(1,5)$，都有 $x<5$，所以 $5$ 是上界。

$6$ 也在所有元素上方，所以 $6$ 也是上界。

对任意 $x\in(1,5)$，都有 $1<x$，所以 $1$ 是下界。

$0$ 也在所有元素下方，所以 $0$ 也是下界。

因此 $(1,5)$ 有上界也有下界，是有界集。
````

### 16.7.3　上确界与下确界（Supremum and Infimum）


最大值要求「最大那个数」本身属于集合。但有些集合没有最大值，却仍然有一个最 “紧” 的上界。例如 $(1,5)$ 没有最大值，因为 $5\notin(1,5)$；但所有元素都小于 $5$，而且任何小于 $5$ 的数都“压不住” 整个集合。因此 $5$ 是它的最小上界。

> 上确界与最大值的区别是本章最微妙的概念。可以这样记忆：
> - **最大值** = 集合中最高那个成员（必须在集合内）
> - **上确界** = 集合的天花板（不一定在集合内，但是最紧的上界）
>
> 如果集合有最大值，那么最大值就是上确界。如果集合没有最大值，上确界仍然可能存在，它「贴着」集合但不一定属于集合。

````ad-def
title: 定义（上确界） | Definition（Supremum）

设 $S\subseteq\mathbb{R}$ 且 $S\neq\varnothing$。

若 $M$ 是 $S$ 的上界，并且 $M$ 小于或等于 $S$ 的每一个上界，则称 $M$ 为 $S$ 的**上确界（Supremum）**，记作
$$\sup S=M.$$

换言之，上确界是 $S$ 的**最小上界（Least Upper Bound）**。
````


````ad-def
title: 定义（下确界） | Definition（Infimum）

设 $S\subseteq\mathbb{R}$ 且 $S\neq\varnothing$。

若 $m$ 是 $S$ 的下界，并且 $m$ 大于或等于 $S$ 的每一个下界，则称 $m$ 为 $S$ 的**下确界（Infimum）**，记作
$$\inf S=m.$$

换言之，下确界是 $S$ 的**最大下界（Greatest Lower Bound）**。
````


最大值与上确界的关键分别是：最大值必须属于集合，上确界不一定属于集合。最小值与下确界也同理。

````ad-example
title: 示例 | Example


求以下集合的最大值、最小值、上确界和下确界：

(a) $[1,5]$

(b) $(1,5)$

(c) $[1,5)$

---

(a) $[1,5]$ 有最小值 $1$、最大值 $5$。它的下确界为 $1$，上确界为 $5$。

即
$$\inf[1,5]=1,\quad \sup[1,5]=5.$$

(b) $(1,5)$ 没有最小值，也没有最大值，因为 $1,5$ 都不属于集合。但它的下确界为 $1$，上确界为 $5$。

即
$$\inf(1,5)=1,\quad \sup(1,5)=5.$$

(c) $[1,5)$ 有最小值 $1$，没有最大值。它的下确界为 $1$，上确界为 $5$。

即
$$\inf[1,5)=1,\quad \sup[1,5)=5.$$
````

````ad-example
title: 示例 | Example


设
$$S=\left\{1-\frac{1}{n}\mid n\in\mathbb{N}\text{ 且 }n\ge1\right\}.$$
直观判断 $S$ 的最大值、最小值、上确界和下确界。

---

代入 $n=1,2,3,4,\cdots$，得到
$$S=\left\{0,\frac12,\frac23,\frac34,\cdots\right\}.$$

最小值为 $0$，因为 $n=1$ 时取到 $0$。

这些数逐渐接近 $1$，但永远小于 $1$，所以没有最大值。

因此
$$\inf S=0,\quad \sup S=1.$$

注意 $1\notin S$，所以 $1$ 是上确界，但不是最大值。
````

> 这个例子最能说明确界与最大值的区别：$1$ 不在集合 $S$ 中，所以不是最大值；但 $S$ 中所有数都小于 $1$，而且可以无限接近 $1$，任何小于 $1$ 的数都压不住整个集合，所以 $1$ 是上确界。

````ad-thm
title: 定理（最大值与上确界的关系） | Theorem（Relationship between Maximum and Supremum）

若实数集合 $S$ 有最大值，则
$$\sup S=\max S.$$

若实数集合 $S$ 有最小值，则
$$\inf S=\min S.$$
````


````ad-proof
title: 证明 | Proof

设 $M=\max S$。

因为 $M$ 是最大值，所以对任意 $x\in S$，都有 $x\le M$。因此 $M$ 是 $S$ 的一个上界。

又因为 $M\in S$，任何上界 $U$ 都必须满足 $M\le U$，否则 $U$ 不能压住集合中的元素 $M$。

所以 $M$ 小于或等于每一个上界，即 $M$ 是最小上界。

因此 $\sup S=M=\max S$。

最小值的情形同理：若 $m=\min S$，则 $m$ 是下界，且任何下界 $L$ 都满足 $L\le m$，所以 $m$ 是最大下界，即 $\inf S=m=\min S$。
````

### 16.7.4　完备性公理（Completeness Axiom）


有理数中会出现「有上界但没有有理数上确界」的现象。实数之所以能形成连续的数线，核心原因是它满足下面的公理。

> 有理数集 $\mathbb{Q}$ 中，集合 $\{x\in\mathbb{Q}\mid x^2<2\}$ 有上界（例如 $2$ 是上界），但在 $\mathbb{Q}$ 中没有上确界，因为 $\sqrt{2}\notin\mathbb{Q}$。这说明有理数集有「洞」。实数集没有这个缺陷，正是因为完备性公理。

````ad-axi
title: 公理（完备性公理） | Axiom（Completeness Axiom）


实数集 $\mathbb{R}$ 的任意非空、有上界的子集，必有上确界，并且这个上确界属于 $\mathbb{R}$。
````

````ad-example
title: 示例 | Example


设
$$S=\{x\in\mathbb{R}\mid x^2<2\text{ 且 }x>0\}.$$
直观说明 $S$ 的上确界是什么。

---

集合 $S$ 由所有正的、平方小于 $2$ 的实数组成。

这些数都小于 $\sqrt{2}$，而且可以无限接近 $\sqrt{2}$。

因此
$$\sup S=\sqrt{2}.$$

注意 $\sqrt{2}\notin S$，因为 $(\sqrt{2})^2=2$，不满足 $x^2<2$。所以 $S$ 没有最大值，但有上确界。
````

````ad-note
title: 注记 | Note

完备性公理是公理，不由本章前面的内容证明。它的作用是保证数线没有「洞」。后续学习极限、连续性与微积分时，这条公理会成为底层依据。
````


---

## 16.8　本章总结（Chapter Summary）

1. 集合可由开放命题 $P(x)$ 概括为 $\{x\mid P(x)\}$，集合是开放命题的外延。
2. $a\in A$ 表示 $a$ 是集合 $A$ 的元素；$a\notin A$ 表示 $a$ 不是集合 $A$ 的元素。
3. 描述法用条件刻画元素，列举法把元素直接列出。
4. 外延公理说明：集合相等只看元素是否完全相同，不看书写顺序或重复次数。若两个开放命题逻辑等价，则它们定义的集合相同。
5. 列举法本质上也是描述法的一种缩写：若 $A=\{a_1,a_2,\cdots,a_n\}$，则 $A=\{x\mid(x=a_1)\lor\cdots\lor(x=a_n)\}$。
6. $A\subseteq B$ 表示 $A$ 的每一个元素都属于 $B$；$A\subsetneq B$ 表示真子集。
7. 空集 $\varnothing$ 不含任何元素，且是任意集合的子集，空集唯一。
8. $U$ 为 $A, B, \cdots$ 的全集，当且仅当 $A\cup B\cup\cdots\subseteq U$。
9. 常用数集包括 $\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R}$，且有 $\mathbb{N}\subseteq\mathbb{Z}\subseteq\mathbb{Q}\subseteq\mathbb{R}$。
10. 笛卡尔积 $A\times B$ 是所有 $(a,b)$ 所组成的集合，其中 $a\in A$ 且 $b\in B$。
11. $\mathbb{R}^n$ 是所有 $n$ 元有序实数组组成的集合，$\mathbb{R}^2$ 即第 15 章的坐标平面。
12. 交集 $A\cap B$ 对应「且」，并集 $A\cup B$ 对应「或」，差集 $A\setminus B$ 对应「属于 $A$ 但不属于 $B$」，余集 $A^c=U\setminus A$ 依赖全集 $U$。交与并满足交换律。
13. 互斥集合（不相交集合）指 $A\cap B=\varnothing$ 的两个集合。
14. 有限集的元素数目称为基数，记作 $n(A)$。两个集合的容斥公式为
    $$n(A\cup B)=n(A)+n(B)-n(A\cap B).$$
    若 $A$ 与 $B$ 互斥，则 $n(A\cup B)=n(A)+n(B)$。
15. 区间是实数集合的常用表示，圆括号表示不包含端点，方括号表示包含端点。$(a,b)$ 也可表示有序对，需根据语境区分。不等式的解集可用区间表示。
16. 最大值和最小值必须属于集合，上界和下界不一定属于集合。
17. 上确界是最小上界，下确界是最大下界。若集合有最大值，则最大值等于上确界；若集合有最小值，则最小值等于下确界。
18. 完备性公理说明：实数集的任意非空、有上界子集必有实数上确界。

---

## 16.9　中英对照词汇表（Glossary）

| 中文 | English |
|------|---------|
| 集合 | Set |
| 元素 | Element |
| 外延 | Extension |
| 概括原则 | Principle of Comprehension |
| 属于 | Belongs to / Is an element of |
| 不属于 | Does not belong to |
| 列举法 | Roster Method |
| 描述法 | Set-Builder Notation |
| 开放命题 | Open Proposition |
| 外延公理 | Axiom of Extensionality |
| 自然数集 | Natural Numbers |
| 整数集 | Integers |
| 有理数集 | Rational Numbers |
| 实数集 | Real Numbers |
| 子集 | Subset |
| 真子集 | Proper Subset |
| 空集 | Empty Set |
| 全集 | Universal Set |
| 笛卡尔积 | Cartesian Product |
| 有序对 | Ordered Pair |
| 交集 | Intersection |
| 并集 | Union |
| 差集 | Set Difference |
| 余集 | Complement |
| 互斥集合 | Disjoint Sets |
| 不相交集合 | Disjoint Sets |
| 交换律 | Commutative Law |
| 有限集 | Finite Set |
| 元素数目 | Number of Elements |
| 基数 | Cardinality |
| 容斥原理 | Inclusion-Exclusion Principle |
| 区间 | Interval |
| 开区间 | Open Interval |
| 闭区间 | Closed Interval |
| 半开区间 | Half-Open Interval |
| 无限区间 | Unbounded Interval |
| 左端点 | Left Endpoint |
| 右端点 | Right Endpoint |
| 最大值 | Maximum |
| 最小值 | Minimum |
| 上界 | Upper Bound |
| 下界 | Lower Bound |
| 有界集 | Bounded Set |
| 上确界 | Supremum |
| 下确界 | Infimum |
| 最小上界 | Least Upper Bound |
| 最大下界 | Greatest Lower Bound |
| 完备性公理 | Completeness Axiom |
| 空真 | Vacuous Truth |
