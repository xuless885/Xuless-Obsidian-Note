---
tags: DSE课程笔记
---

# 18　解方程方法(II)（Methods of Solving Equations (II)）

> 在第五章中，我们学习了一元一次方程与二元一次方程组的解法，当时能解的方程只有一次方程。本章将解方程的能力推广到二次：一元二次方程是最基本的非线性方程，它的解法与根的性质构成了中学代数的核心。
>
> 上一章（数系 II）中，我们从实数扩充到复数系 $\mathbb{C}$，使方程 $x^2+1=0$ 有了解。本章将看到：在复数域中，任何一元二次方程恒有两个根（计入重数）。

> 本章分成四条主线：
> 1. 一元二次方程的三种解法：因式分解法、配方法、二次公式；
> 2. 判别式与韦达定理：根的性质与根和系数的关系；
> 3. 联立二元一次与二元二次方程组；
> 4. 换元法：将高次方程化为二次方程求解。
>
> 此外，第五节作为延伸，将第五章的矩阵方法推广到三元方程组。

前置：[[Chapter 4 多项式(I)|多项式(I)]]、[[Chapter 5 解方程方法(I)|解方程方法(I)]]、[[Chapter 6 代数式|代数式]]、[[Chapter 17 数系(II)|数系(II)]]

---

## 18.1　一元二次方程的解法（Solving Quadratic Equations）

> **本节难度上限**：T B- ｜ C C+ ｜ E C ｜ Q C+

> 本节掌握因式分解法、配方法与二次公式，并能根据方程特征选择最优解法。

### 18.1.1　一元二次方程的标准形式

````ad-def
title: 定义（一元二次方程） | Definition（Quadratic Equation）

形如
$$ax^2 + bx + c = 0$$
的方程称为**一元二次方程**，其中 $a, b, c \in \mathbb{R}$ 为常数，且 $a \neq 0$。

*   $a$ 称为**二次项系数（quadratic coefficient）**；
*   $b$ 称为**一次项系数（linear coefficient）**；
*   $c$ 称为**常数项（constant term）**。
````

条件 $a \neq 0$ 是必要的：若 $a = 0$，方程退化为 $bx + c = 0$，这是一元一次方程，属于第五章的范畴。

> 回顾第六章的逻辑分析：$ax^2+bx+c=0$ 是一个含有变量 $x$ 的**开放命题**（方程），我们寻求是否存在 $x$ 使命题为真，而非对一切 $x$ 成立的恒等式。

````ad-example
title: 示例 | Example


判断下列各方程是否为一元二次方程：

(a) $2x^2 - 3x + 1 = 0$

(b) $x^2 = x + 1$

(c) $x^3 + 2x = 0$

(d) $3x + 1 = 0$

---

(a) 是。已是标准形式，$a=2\neq 0$。

(b) 是。移项得 $x^2 - x - 1 = 0$，$a=1\neq 0$。

(c) 不是。最高次为三次，属一元三次方程。

(d) 不是。$a=0$，退化为一次方程。
````

### 18.1.2　因式分解法

因式分解法的核心是以下性质：当两个数的乘积为零时，至少其中一个为零。

````ad-thm
title: 定理（零积性质） | Theorem（Zero Product Property）

设 $A, B$ 为代数式。若 $AB = 0$，则 $A = 0$ 或 $B = 0$。即
$$AB = 0 \iff A = 0 \;\lor\; B = 0.$$
````

````ad-proof
title: 证明 | Proof

若 $AB = 0$ 且 $A \neq 0$，由第五章的等式性质（两边同乘 $\dfrac{1}{A}$，$A\neq 0$）：
$$B = AB \cdot \frac{1}{A} = 0 \cdot \frac{1}{A} = 0.$$
故 $A = 0$ 或 $B = 0$。反之，$A = 0$ 或 $B = 0$ 时显然 $AB = 0$。
````

> **回顾：** 本节及后续配方法将使用第六章 §6.2 已教授的完全平方公式与平方差公式：
> $$\begin{aligned} (a+b)^2 &\equiv a^2 + 2ab + b^2, \\ (a-b)^2 &\equiv a^2 - 2ab + b^2, \\ a^2 - b^2 &\equiv (a-b)(a+b). \end{aligned}$$

````ad-alg
title: 算法（因式分解法步骤） | Algorithm (Steps of Factoring)

1. **化标准形：** 将所有项移至等号一侧，使方程为 $ax^2 + bx + c = 0$。
2. **因式分解：** 将左侧的二次三项式分解为两个一次因式的乘积：
   $$ax^2 + bx + c \equiv (px + q)(rx + s).$$
   分解方法详见第四章（提公因式法、分组分解法、十字相乘法）。
3. **应用零积性质：** 令每个因式分别等于零：
   $$px + q = 0 \quad\text{或}\quad rx + s = 0.$$
4. **求解一次方程：** 分别解这两个一元一次方程，得两根。
````

> **特例（提取公因式）：** 当 $c = 0$ 时，$ax^2 + bx \equiv x(ax + b)$，直接提取公因式即得两根 $x = 0$ 或 $x = -\dfrac{b}{a}$。

````ad-example
title: 示例 | Example


解方程 $x^2 - 5x + 6 = 0$。

---

用十字相乘法分解：$x^2 - 5x + 6 \equiv (x-2)(x-3)$。由零积性质：
$$x - 2 = 0 \quad\text{或}\quad x - 3 = 0,$$
故 $x = 2$ 或 $x = 3$。
````

````ad-example
title: 示例 | Example


解方程 $2x^2 + 7x + 3 = 0$。

---

用十字相乘法分解：$2x^2 + 7x + 3 \equiv (2x+1)(x+3)$。由零积性质：
$$2x + 1 = 0 \quad\text{或}\quad x + 3 = 0,$$
故 $x = -\dfrac{1}{2}$ 或 $x = -3$。
````

考虑因式分解 $ax^2 + bx + c \equiv a(x - r_1)(x - r_2)$。当 $r_1 \neq r_2$ 时，零积性质给出两个相异根。但当 $r_1 = r_2$ 时，方程化为 $a(x - r)^2 = 0$，只有一个解 $x = r$。为了在所有情形下都能统一表述「二次方程恒有两根」，需要引入根的重数概念。

````ad-def
title: 定义（根的重数） | Definition（Multiplicity of a Root）

设 $r$ 是方程 $ax^2 + bx + c = 0$（$a \neq 0$）的根，且二次三项式可分解为
$$ax^2 + bx + c \equiv a(x - r)^k \cdot Q(x),$$
其中 $k$ 为正整数，$Q(x)$ 为多项式且 $Q(r) \neq 0$。称 $k$ 为根 $r$ 的**重数（multiplicity）**，$r$ 称为该方程的 **$k$ 重根（root of multiplicity $k$）**。

* $k = 1$ 时，$r$ 称为**单根（simple root）**；
* $k = 2$ 时，$r$ 称为**二重根（double root）**；
* $k \geq 2$ 时，$r$ 统称为**重根（multiple root）**。
````

条件 $Q(r) \neq 0$ 保证因式 $(x - r)$ 恰好出现 $k$ 次，不会更多。对于一元二次方程，$ax^2 + bx + c$ 至多含两个一次因式，故重数 $k$ 只能取 $1$ 或 $2$。

> **重数与计数：** 单根计为 $1$ 个根，二重根计为 $2$ 个根。因此，「二次方程恒有两根（计入重数）」在所有情形下成立：两个相异单根计 $1 + 1 = 2$，一个二重根计 $2$。

````ad-example
title: 示例 | Example


判断下列各方程根的重数：

(a) $x^2 - 5x + 6 = 0$

(b) $x^2 - 4x + 4 = 0$

(c) $x^2 + 6x + 9 = 0$

---

(a) 因式分解 $x^2 - 5x + 6 \equiv (x-2)(x-3)$。两因式相异，$x = 2$ 与 $x = 3$ 均为单根。计入重数共两个根。

(b) 因式分解 $x^2 - 4x + 4 \equiv (x-2)^2$。因式 $(x-2)$ 出现两次，$x = 2$ 为二重根。虽只有一个值，计入重数仍为两个根。

(c) 因式分解 $x^2 + 6x + 9 \equiv (x+3)^2$。因式 $(x+3)$ 出现两次，$x = -3$ 为二重根。
````

> **注记：** 一般地，$n$ 次多项式方程在 $\mathbb{C}$ 中恰有 $n$ 个根（计入重数），此结论称为**代数基本定理（Fundamental Theorem of Algebra）**，将在后续课程中证明。对于二次方程（$n = 2$），此结论由配方法与二次公式直接保证。

### 18.1.3　配方法

配方法通过代数变形，将二次三项式化为 $(x+m)^2 = n$ 的形式，再利用平方根直接求解。

**配方法的动机：**

因式分解法虽然简洁，但并非所有二次三项式都能在有理数范围内因式分解。例如 $x^2 + 6x + 2 = 0$，我们无法找到两个有理数 $p, q$ 使 $x^2 + 6x + 2 \equiv (x+p)(x+q)$（因为需要 $p + q = 6$ 且 $pq = 2$，此方程组无有理数解）。此时需要一种更一般的方法。

配方法的核心想法是利用第六章的完全平方公式
$$(x + m)^2 \equiv x^2 + 2mx + m^2,$$
将一般的二次三项式 $x^2 + bx$ "补全"为一个完全平方式，再开方求解。

关键洞察在于：比较 $x^2 + bx$（手中已有的部分）与 $x^2 + 2mx + m^2$（完全平方式的展开），若令 $2m = b$，即 $m = \dfrac{b}{2}$，则完全平方所需的常数项为
$$m^2 = \left(\frac{b}{2}\right)^2.$$
这就是「一次项系数一半的平方」这一配方法则的由来。通过在方程两边同时加上这个量，左侧便凑成完全平方式，右侧变为常数，从而可以开方求解。

 **配方思路拆解：** 以 $x^2 + 6x + 2 = 0$ 为例，先不套步骤，理解"补什么"。

 比较左侧已有的 $x^2 + 6x$ 与完全平方的展开 $x^2 + 2mx + m^2$：
 - 令 $2m = 6$，得 $m = 3$；
 - 完全平方需要常数项 $m^2 = 9$，而当前方程移项后左侧只有 $x^2 + 6x$；
 - 在两边同时加 $9$（等式性质：两边加同一数保持等式），左侧变为 $x^2 + 6x + 9 \equiv (x+3)^2$，右侧变为 $-2 + 9 = 7$。

 这一步"凑出"完全平方的过程，就是配方的本质。

在正式给出一般步骤之前，先建立一个关于 $x^2 = a$ 的引理，它是配方法与二次公式的逻辑基石。

````ad-lem
title: 引理（方程 $x^2 = a$ 在 $\mathbb{C}$ 中的根） | Lemma（方程 $x^2 = a$ 在 $\mathbb{C}$ 中的根）

设 $a \in \mathbb{R}$。在复数域 $\mathbb{C}$ 中，方程 $x^2 = a$ 恒有两根（计入重数）：
1. 若 $a > 0$，则 $x = \pm\sqrt{a}$（两个相异实数根）；
2. 若 $a = 0$，则 $x = 0$（二重实根）；
3. 若 $a < 0$，则 $x = \pm i\sqrt{|a|}$（两个相异纯虚数根，互为共轭）。
````

````ad-proof
title: 证明 | Proof

**情形 1（$a > 0$）：** $\sqrt{a}$ 是正实数，$(\pm\sqrt{a})^2 = a$，且 $\sqrt{a} \neq -\sqrt{a}$，故两根相异。

**情形 2（$a = 0$）：** $x^2 = 0$ 即 $x \cdot x = 0$，由零积性质 $x = 0$，为二重根。

**情形 3（$a < 0$）：** 此时 $|a| = -a > 0$，$\sqrt{|a|}$ 是正实数。由上一章复数乘法定义：
$$(\pm i\sqrt{|a|})^2 = i^2 \cdot |a| = -|a| = a.$$
且 $i\sqrt{|a|} \neq -i\sqrt{|a|}$（因 $\sqrt{|a|} > 0$），故两根相异且互为共轭。
````

> **推广：** 对形如 $(x+m)^2 = n$（$m, n \in \mathbb{R}$）的方程，令 $u = x + m$，则 $u^2 = n$。由上述引理，在 $\mathbb{C}$ 中恒有两解 $u$，回代得 $x = u - m$。

````ad-alg
title: 算法（配方法步骤） | Algorithm (Steps of Completing the Square)

给定 $ax^2 + bx + c = 0$（$a \neq 0$）：
1. **移常数项：** $ax^2 + bx = -c$。
2. **二次项系数化一：** 两边同除以 $a$（$a \neq 0$）：
   $$x^2 + \frac{b}{a}x = -\frac{c}{a}.$$
3. **配方：** 两边同时加上一次项系数一半的平方 $\left(\dfrac{b}{2a}\right)^2$：
   $$x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2.$$
4. **写成完全平方：** 左侧用完全平方公式 $(x+m)^2 \equiv x^2+2mx+m^2$（取 $m = \dfrac{b}{2a}$）：
   $$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}.$$
5. **开方求解：** 由引理，$u^2 = \dfrac{b^2-4ac}{4a^2}$ 在 $\mathbb{C}$ 中恒有两解。因 $\pm$ 号可吸收分母中 $|a|$ 的符号：
   $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.$$
````

````ad-example
title: 示例 | Example


解方程 $x^2 + 6x + 2 = 0$。

---

**移常数项：** $x^2 + 6x = -2$。

**配方：** 一次项系数为 $6$，一半为 $3$，平方为 $9$。两边加 $9$：
$$x^2 + 6x + 9 = -2 + 9 = 7,$$
即 $(x+3)^2 = 7$。

**开方：** 由引理，$x + 3 = \pm\sqrt{7}$，故
$$x = -3 \pm \sqrt{7}.$$
````

````ad-example
title: 示例 | Example


解方程 $2x^2 - 8x + 1 = 0$。

---

二次项系数不为 $1$，先两边同除以 $2$：
$$x^2 - 4x + \frac{1}{2} = 0.$$

**移常数项：** $x^2 - 4x = -\dfrac{1}{2}$。

**配方：** 一次项系数为 $-4$，一半为 $-2$，平方为 $4$。两边加 $4$：
$$x^2 - 4x + 4 = -\frac{1}{2} + 4 = \frac{7}{2},$$
即 $(x-2)^2 = \dfrac{7}{2}$。

**开方：** 由引理，$x - 2 = \pm\sqrt{\dfrac{7}{2}}$。由第六章分母有理化，$\sqrt{\dfrac{7}{2}} = \dfrac{\sqrt{14}}{2}$，故
$$x = 2 \pm \frac{\sqrt{14}}{2}.$$
````

````ad-example
title: 示例 | Example


解方程 $x^2 + 2x + 5 = 0$。

---

**移常数项：** $x^2 + 2x = -5$。

**配方：** 一次项系数为 $2$，一半为 $1$，平方为 $1$。两边加 $1$：
$$x^2 + 2x + 1 = -5 + 1 = -4,$$
即 $(x+1)^2 = -4$。

**开方：** 由引理情形 3，$(x+1)^2 = -4 < 0$，故 $x + 1 = \pm i\sqrt{4} = \pm 2i$。因此
$$x = -1 \pm 2i.$$
> 两根为共轭复数，这是上一章数系扩充的直接成果。
````

### 18.1.4　二次公式

将配方法的一般推导结果提炼为定理，即得二次公式。

````ad-thm
title: 定理（求根公式） | Theorem（Quadratic Formula）

设 $a, b, c \in \mathbb{R}$，$a \neq 0$。在复数域 $\mathbb{C}$ 中，一元二次方程
$$ax^2 + bx + c = 0$$
的两个根（计入重数）由以下公式统一给出：
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.$$
````

````ad-proof
title: 证明 | Proof

由 $ax^2 + bx + c = 0$（$a \neq 0$），逐步配方：

1. **移常数项：** $ax^2 + bx = -c$。
2. **二次项系数化一：** 两边同除以 $a$（$a \neq 0$）：
   $$x^2 + \frac{b}{a}x = -\frac{c}{a}.$$
3. **配方：** 两边加上一次项系数一半的平方 $\left(\dfrac{b}{2a}\right)^2$：
   $$x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2.$$
4. **写成完全平方：** 左侧用完全平方公式 $(x+m)^2 \equiv x^2+2mx+m^2$（取 $m = \dfrac{b}{2a}$）：
   $$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}.$$
5. **开方：** 由 $x^2=a$ 引理，$u^2 = \dfrac{b^2-4ac}{4a^2}$ 在 $\mathbb{C}$ 中恒有两解。因 $\pm$ 号可吸收分母中 $|a|$ 的符号：
   $$x + \frac{b}{2a} = \pm\frac{\sqrt{b^2-4ac}}{2a}.$$
6. **移项：**
   $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.$$

即求根公式得证。
````

> **注记：** 配方法不仅是推导二次公式的工具，更是一种典型的**构造性证明（constructive proof）**。它不满足于断言「根必然存在」，而是通过有限步可操作的代数步骤，显式地构造出根的具体表达式。这种「不仅告诉你存在，还告诉你如何得到」的证明风格，与第五章的高斯消元法一脉相承。

````ad-example
title: 示例 | Example


解方程 $2x^2 - 4x + 5 = 0$。

---

这里 $a=2$，$b=-4$，$c=5$。代入二次公式：
$$x = \frac{-(-4) \pm \sqrt{(-4)^2 - 4 \cdot 2 \cdot 5}}{2 \cdot 2} = \frac{4 \pm \sqrt{16 - 40}}{4} = \frac{4 \pm \sqrt{-24}}{4}.$$
因 $\Delta = -24 < 0$，$\sqrt{-24} = i\sqrt{24} = 2i\sqrt{6}$（由上一章复数定义），故
$$x = \frac{4 \pm 2i\sqrt{6}}{4} = \frac{2 \pm i\sqrt{6}}{2}.$$
两根为共轭复数，这是上一章数系扩充的直接成果。
````

---

## 18.2　一元二次方程的根（Roots of Quadratic Equations）

> **本节难度上限**：T B- ｜ C B- ｜ E C ｜ Q C+

> 本节利用判别式判断根的性质，掌握韦达定理并灵活运用于根与系数相关问题。

### 18.2.1　判别式

> 上一节推导出的二次公式
> $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
> 中，根号内的表达式 $b^2 - 4ac$ 扮演了关键角色。根据上一章的复数定义，对一个实数 $D$ 开平方 $\sqrt{D}$ 时：
> * 若 $D > 0$，$\sqrt{D}$ 为正实数，$\pm$ 给出两个相异实数；
> * 若 $D = 0$，$\sqrt{D} = 0$，$\pm$ 给出同一个实数（二重根）；
> * 若 $D < 0$，$\sqrt{D} = i\sqrt{|D|}$ 为纯虚数，$\pm$ 给出两个共轭复数。
>
> 因此，$b^2 - 4ac$ 的正负直接决定了开方后产生的是实数还是复数，进而决定了根的性质。这个表达式值得单独命名。

````ad-def
title: 定义（判别式） | Definition（Discriminant）

对一元二次方程 $ax^2 + bx + c = 0$（$a, b, c \in \mathbb{R}$，$a \neq 0$），二次公式根号内的表达式
$$\Delta = b^2 - 4ac$$
称为该方程的**判别式**。
````

判别式 $\Delta$ 的值决定了二次公式中 $\sqrt{\Delta}$ 是实数还是虚数，从而决定了根的性质。

````ad-thm
title: 定理（判别式与根的性质） | Theorem（Discriminant and Nature of Roots）

设 $ax^2 + bx + c = 0$（$a, b, c \in \mathbb{R}$，$a \neq 0$），$\Delta = b^2 - 4ac$。在复数域 $\mathbb{C}$ 中，该方程恒有两根（计入重数），其性质由 $\Delta$ 决定：

| $\Delta$ 的值 | 根在 $\mathbb{C}$ 中的性质 |
|:---:|:---|
| $\Delta > 0$ | 两个相异的**实数**根 |
| $\Delta = 0$ | 一个**实数**二重根 $x = -\dfrac{b}{2a}$ |
| $\Delta < 0$ | 两个相异的**非实复数**根，互为共轭：$x = \dfrac{-b \pm i\sqrt{\lvert\Delta\rvert}}{2a}$ |
````

````ad-proof
title: 证明 | Proof

由求根公式，$x = \dfrac{-b \pm \sqrt{\Delta}}{2a}$。分三种情形：

**$\Delta > 0$：** $\sqrt{\Delta}$ 为正实数，$-b+\sqrt{\Delta} \neq -b-\sqrt{\Delta}$，故给出两个相异实根。

**$\Delta = 0$：** $\sqrt{\Delta} = 0$，$\pm$ 给出同一值 $x = -\dfrac{b}{2a}$，为二重实根。

**$\Delta < 0$：** 由上一章，$\sqrt{\Delta} = i\sqrt{|\Delta|}$（$|\Delta| = -\Delta > 0$），故
$$x = \frac{-b \pm i\sqrt{|\Delta|}}{2a},$$
两根实部相同、虚部互为相反数，互为共轭复数，且相异。
````

> **注记：** 上表不应被理解为「$\Delta < 0$ 时方程无解」。恰恰相反，方程在 $\mathbb{C}$ 中恒有两根。判别式 $\Delta$ 的作用是区分这两根属于 $\mathbb{R}$ 还是 $\mathbb{C} \setminus \mathbb{R}$（即是否在实轴上），而非判定解的存在性。这一视角的转换是上一章数系扩充的直接后果。

````ad-cor
title: 推论（判别式与因式分解） | Corollary（判别式与因式分解）

在复数域 $\mathbb{C}$ 中，二次三项式 $ax^2+bx+c$ 恒可分解为两个一次因式的乘积：
$$ax^2+bx+c \equiv a(x-\alpha)(x-\beta),$$
其中 $\alpha, \beta$ 为方程的两根。若 $\Delta \geq 0$，此分解的系数均在 $\mathbb{R}$ 中；若 $\Delta < 0$，则 $\alpha, \beta$ 为共轭复数，分解仅在 $\mathbb{C}$ 上成立。
````

````ad-cor
title: 推论（判别式与图像） | Corollary（判别式与图像）

二次函数 $y = ax^2+bx+c$ 的图像与 $x$ 轴的交点个数等于方程 $ax^2+bx+c=0$ 的实根个数：
*   $\Delta > 0$ $\Longleftrightarrow$ 与 $x$ 轴有两交点；
*   $\Delta = 0$ $\Longleftrightarrow$ 与 $x$ 轴相切（一个交点）；
*   $\Delta < 0$ $\Longleftrightarrow$ 与 $x$ 轴无交点。

详见第二十二章二次函数。
````

````ad-example
title: 示例 | Example


判断下列各方程根的性质：

(a) $x^2 - 4x + 3 = 0$

(b) $x^2 - 4x + 4 = 0$

(c) $x^2 - 4x + 5 = 0$

---

(a) $\Delta = (-4)^2 - 4(1)(3) = 16 - 12 = 4 > 0$，有两个相异实根。

(b) $\Delta = 16 - 16 = 0$，有一个二重实根 $x = \dfrac{4}{2} = 2$。

(c) $\Delta = 16 - 20 = -4 < 0$，有两个共轭复根 $x = \dfrac{4 \pm i\sqrt{4}}{2} = 2 \pm i$。
````

### 18.2.2　韦达定理

韦达定理揭示了二次方程的根与系数之间的代数关系，无需具体求出根即可知道两根之和与积。

````ad-thm
title: 定理（韦达定理） | Theorem（Vieta's Formulas）

设 $ax^2 + bx + c = 0$（$a \neq 0$）在 $\mathbb{C}$ 中的两根为 $\alpha, \beta$（计入重数），则：
1. **两根之和：** $\alpha + \beta = -\dfrac{b}{a}$；
2. **两根之积：** $\alpha\beta = \dfrac{c}{a}$。
````

韦达定理可用两种方法证明，分别基于因式分解与二次公式。证明（一）需要以下引理作为基础。

````ad-lem
title: 引理（根与因式分解） | Lemma（Roots and Factorization）

设 $\alpha, \beta$ 为方程 $ax^2+bx+c=0$（$a\neq 0$）在 $\mathbb{C}$ 中的两根（计入重数），则
$$ax^2+bx+c \equiv a(x-\alpha)(x-\beta).$$
````

````ad-proof
title: 证明 | Proof

**第一步：** 因 $\alpha$ 为根，有 $a\alpha^2+b\alpha+c=0$，故 $c=-a\alpha^2-b\alpha$。代入：
$$ax^2+bx+c \equiv ax^2+bx-a\alpha^2-b\alpha \equiv a(x^2-\alpha^2)+b(x-\alpha) \equiv (x-\alpha)[a(x+\alpha)+b].$$

**第二步：** 因 $\beta$ 亦为根，$a\beta^2+b\beta+c=0$。代入 $c=-a\alpha^2-b\alpha$：
$$a(\beta^2-\alpha^2)+b(\beta-\alpha) = 0,$$
$$(\beta-\alpha)[a(\alpha+\beta)+b] = 0.$$

**情形 1（$\beta\neq\alpha$）：** 得 $a(\alpha+\beta)+b=0$，即 $a\alpha+b=-a\beta$。故
$$a(x+\alpha)+b = ax+(a\alpha+b) = a(x-\beta).$$
代回第一步：$ax^2+bx+c \equiv (x-\alpha)\cdot a(x-\beta) = a(x-\alpha)(x-\beta)$。

**情形 2（$\beta=\alpha$，二重根）：** 由二次公式 $\alpha=-\dfrac{b}{2a}$（$\Delta=0$），故 $b=-2a\alpha$，$a\alpha+b=-a\alpha$。故
$$a(x+\alpha)+b = a(x-\alpha).$$
代回第一步：$ax^2+bx+c \equiv (x-\alpha)\cdot a(x-\alpha) = a(x-\alpha)^2$。

两种情形均得 $ax^2+bx+c \equiv a(x-\alpha)(x-\beta)$。
````

````ad-proof
title: 证明（一） | Proof（由因式形式）

由上述引理，$ax^2+bx+c \equiv a(x - \alpha)(x - \beta) \equiv a\left[x^2 - (\alpha + \beta)x + \alpha\beta\right]$。与原式 $ax^2 + bx + c$ 用第四章的比较系数法比较对应项系数：
$$\begin{aligned} -a(\alpha + \beta) &= b \implies \alpha + \beta = -\frac{b}{a}, \\ a\alpha\beta &= c \implies \alpha\beta = \frac{c}{a}. \end{aligned}$$
````

````ad-proof
title: 证明（二） | Proof（由二次公式）

由二次公式，两根为 $\alpha = \dfrac{-b + \sqrt{\Delta}}{2a}$，$\beta = \dfrac{-b - \sqrt{\Delta}}{2a}$。

**求和：**
$$\alpha + \beta = \frac{-b + \sqrt{\Delta} - b - \sqrt{\Delta}}{2a} = \frac{-2b}{2a} = -\frac{b}{a}.$$

**求积：**
$$\alpha\beta = \frac{(-b + \sqrt{\Delta})(-b - \sqrt{\Delta})}{4a^2} = \frac{b^2 - \Delta}{4a^2} = \frac{b^2 - (b^2 - 4ac)}{4a^2} = \frac{4ac}{4a^2} = \frac{c}{a}.$$
其中求积用了平方差公式 $(-b+\sqrt{\Delta})(-b-\sqrt{\Delta}) \equiv (-b)^2 - (\sqrt{\Delta})^2 = b^2 - \Delta$。
````

> **注记：** 韦达定理在 $\mathbb{C}$ 上无条件成立。当 $\Delta < 0$ 时，$\alpha, \beta$ 为共轭复数（$\beta = \overline{\alpha}$），由上一章共轭的性质：$\alpha+\beta = 2\operatorname{Re}(\alpha) \in \mathbb{R}$，$\alpha\beta = |\alpha|^2 \in \mathbb{R}$，与定理一致。

````ad-cor
title: 推论（由已知根建立二次方程） | Corollary（Constructing Quadratic from Known Roots）

由引理，$ax^2+bx+c \equiv a(x-\alpha)(x-\beta)$，两边除以 $a$（$a\neq 0$）即得方程的另一种写法。若已知 $\alpha, \beta \in \mathbb{C}$ 为一元二次方程的两根，则该方程可写为：
$$x^2 - (\alpha + \beta)x + \alpha\beta = 0,$$
或更一般地（乘以非零系数 $k$）：
$$k\left[x^2 - (\alpha + \beta)x + \alpha\beta\right] = 0 \quad (k \neq 0).$$
````

````ad-example
title: 示例 | Example


已知方程 $3x^2 - 7x + 2 = 0$，不求根，求两根之和与积。

---

由韦达定理，$a=3$，$b=-7$，$c=2$：
$$\alpha + \beta = -\frac{-7}{3} = \frac{7}{3}, \qquad \alpha\beta = \frac{2}{3}.$$
````

````ad-example
title: 示例 | Example


已知某二次方程的两根之和为 $5$，两根之积为 $6$，求该方程。

---

由推论，方程为 $x^2 - 5x + 6 = 0$。（可验证：$x^2-5x+6 \equiv (x-2)(x-3)$，两根 $2, 3$，和为 $5$，积为 $6$。）
````

---

## 18.3　联立二元一次与二元二次方程（Simultaneous Linear and Quadratic Equations）

> **本节难度上限**：T C+ ｜ C C+ ｜ E C ｜ Q B

> 本节将第五章的代入消元法从线性方程组推广至含二次方程的联立方程组。

### 18.3.1　问题的形式

````ad-def
title: 定义（联立二元一次与二元二次方程组） | Definition（联立二元一次与二元二次方程组）

由一个二元一次方程和一个二元二次方程组成的方程组，其一般形式为：
$$\begin{cases} px + qy + r = 0 & \text{(一次方程)} \\ ax^2 + bxy + cy^2 + dx + ey + f = 0 & \text{(二次方程)} \end{cases}$$
其中 $a, b, c$ 不全为零。
````

> 在 DSE 范围内，最常见的形式是二次方程不含交叉项 $xy$（即 $b = 0$），例如直线与圆、直线与抛物线的交点问题。

### 18.3.2　代入消元法
> **代入消元法步骤（衔接第五章）：**
> 
> 1. **变形：** 从一次方程中，将一个未知数用另一个表示。通常选取系数较简单的未知数。
> 
> 2. **代入：** 将该表达式代入二次方程，得到一个一元二次方程。
> 
> 3. **解二次方程：** 利用 §18.1 的方法解此方程，得第一个未知数的值（通常有两解）。
> 
> 4. **回代：** 将每个值代回步骤 1 的一次表达式，求出对应的另一个未知数。
> 
> 5. **写解：** 以有序对 $(x, y)$ 写出所有解。

> **解的情况：** 代入后得到的一元二次方程最多有两个根，因此此类方程组在实数范围内最多有两组解。解的个数取决于该二次方程的判别式 $\Delta$：$\Delta > 0$ 两组，$\Delta = 0$ 一组，$\Delta < 0$ 无实数解。
> 
> > 这是第三十一章解析几何(II) 中直线与圆锥曲线交点问题的基础。

````ad-example
title: 示例 | Example


解方程组
$$\begin{cases} y = x - 1 & \cdots\cdots (1) \\ x^2 + y^2 = 5 & \cdots\cdots (2) \end{cases}$$

---

**代入：** 将 $(1)$ 代入 $(2)$：
$$x^2 + (x-1)^2 = 5.$$
展开并化简：
$$x^2 + x^2 - 2x + 1 = 5 \implies 2x^2 - 2x - 4 = 0 \implies x^2 - x - 2 = 0.$$
因式分解：$(x-2)(x+1) \equiv 0$，故 $x = 2$ 或 $x = -1$。

**回代：**
*   $x = 2 \implies y = 2 - 1 = 1$；
*   $x = -1 \implies y = -1 - 1 = -2$。

故方程组的解为 $(x, y) = (2, 1)$ 与 $(-1, -2)$。
````

---

## 18.4　可化为二次方程的方程（Equations Reducible to Quadratic）

> **本节难度上限**：T B+ ｜ C B+ ｜ E B ｜ Q C+

> 本节通过换元法将某些特定形式的高次方程降次，化为一元二次方程来求解。

### 18.4.1　换元法

> **原理：** 对某些形式特殊的高次方程，若未知数 $x$ 仅以某个特定表达式（如 $x^2$、$\sqrt{x}$ 等）的幂次形式出现，可引入新变量 $u$ 替换该表达式，将原方程转化为关于 $u$ 的一元二次方程。求解 $u$ 后再回代解出 $x$。

> **换元法步骤：**
> 1. **识别模式：** 观察方程中未知数的出现模式，确定可统一替换的表达式 $f(x)$。
> 2. **换元：** 令 $u = f(x)$，将原方程化为关于 $u$ 的二次方程。
> 3. **解 $u$：** 解出 $u$ 的值。
> 4. **回代：** 对每个 $u$ 值，解 $f(x) = u$，得 $x$ 的值。
> 5. **检验：** 对含根式或分母的方程，须检验所得解是否满足原方程的定义域，排除增根。

### 18.4.2　常见类型

#### 类型 I：双二次方程

形如
$$ax^4 + bx^2 + c = 0 \quad (a \neq 0)$$
的方程称为**双二次方程（biquadratic equation）**。

> **策略：** 令 $u = x^2$，则 $x^4 = u^2$，代入得 $au^2 + bu + c = 0$。回代时，若 $u \geq 0$ 则 $x = \pm\sqrt{u}$；若 $u < 0$，在实数范围内无对应 $x$（在 $\mathbb{C}$ 中 $x = \pm i\sqrt{|u|}$）。

````ad-example
title: 示例 | Example


解方程 $x^4 - 5x^2 + 4 = 0$。

---

令 $u = x^2$，则 $u^2 - 5u + 4 = 0$。因式分解：$(u-1)(u-4) \equiv 0$，故 $u = 1$ 或 $u = 4$。

**回代：**
*   $u = 1 \implies x^2 = 1 \implies x = \pm 1$；
*   $u = 4 \implies x^2 = 4 \implies x = \pm 2$。

故方程有四个实根 $x = \pm 1,\ \pm 2$。
````

#### 类型 II：含根式的方程

形如
$$ax + b\sqrt{x} + c = 0 \quad (b \neq 0)$$
的方程。条件 $b \neq 0$ 保证方程确实含根式项；若 $b = 0$，方程退化为线性方程 $ax + c = 0$，不属于本类型。

> **回顾：** 本类型涉及根式 $\sqrt{x}$，其定义与性质已在第六章 §6.3 给出：$\sqrt{x}$ 为 $x$ 的算术平方根，即 $\sqrt{x} \geq 0$ 且 $(\sqrt{x})^2 = x$（要求 $x \geq 0$）。

````ad-cor
title: 推论（负实数不能为根） | Corollary（负实数不能为根）

对方程 $ax + b\sqrt{x} + c = 0$（$a, b, c \in \mathbb{R}$，$b \neq 0$），任何负实数都不能成为其根。
````

````ad-proof
title: 证明 | Proof

设 $x$ 为负实数。由上一章复数定义，$\sqrt{x} = i\sqrt{|x|}$ 为纯虚数。代入方程：
$$(ax + c) + ib\sqrt{|x|} = 0.$$
因 $a, b, c, x$ 均为实数，实部 $ax + c \in \mathbb{R}$，虚部为 $b\sqrt{|x|}$。由 $b \neq 0$ 及 $x < 0 \implies |x| > 0 \implies \sqrt{|x|} > 0$，故虚部 $b\sqrt{|x|} \neq 0$。左端虚部不为零，不可能等于零。因此 $x < 0$ 不成立，任何负实数都不能成为这类方程的根。
````

> **策略：** 令 $u = \sqrt{x}$（$u \geq 0$），则 $x = u^2$，代入得 $au^2 + bu + c = 0$。由上述推论，解出的 $x$ 须满足 $x \geq 0$；又因 $u = \sqrt{x} \geq 0$（算术平方根非负），须排除 $u < 0$ 的解。

````ad-example
title: 示例 | Example


解方程 $x - 3\sqrt{x} - 4 = 0$。

---

令 $u = \sqrt{x}$（$u \geq 0$），则 $x = u^2$，方程化为 $u^2 - 3u - 4 = 0$。因式分解：$(u-4)(u+1) \equiv 0$，故 $u = 4$ 或 $u = -1$。

因 $u \geq 0$，舍去 $u = -1$。由 $u = 4$ 得 $\sqrt{x} = 4$，故 $x = 16$。

**检验：** 代入原方程 $16 - 3\sqrt{16} - 4 = 16 - 12 - 4 = 0$，成立。
````

#### 类型 III：含倒数的分式方程

形如
$$a\left(x + \frac{1}{x}\right)^2 + b\left(x + \frac{1}{x}\right) + c = 0$$
的方程。

> **回顾：** 本类型涉及代数分式 $\dfrac{1}{x}$（分母含变量）。第六章 §6.4 已定义代数分式并教授其运算，此处直接使用。须注意 $x \neq 0$。

> **策略：** 令 $u = x + \dfrac{1}{x}$，得 $au^2 + bu + c = 0$。解出 $u$ 后回代 $x + \dfrac{1}{x} = u$，两边乘 $x$ 化为 $x^2 - ux + 1 = 0$ 再解。

````ad-example
title: 示例 | Example


解方程 $\left(x + \dfrac{1}{x}\right)^2 - \left(x + \dfrac{1}{x}\right) - 6 = 0$。

---

令 $u = x + \dfrac{1}{x}$，则 $u^2 - u - 6 = 0$。因式分解：$(u-3)(u+2) \equiv 0$，故 $u = 3$ 或 $u = -2$。

**回代：**
*   $u = 3 \implies x + \dfrac{1}{x} = 3 \implies x^2 - 3x + 1 = 0$。由二次公式：$x = \dfrac{3 \pm \sqrt{5}}{2}$。
*   $u = -2 \implies x + \dfrac{1}{x} = -2 \implies x^2 + 2x + 1 = 0 \implies (x+1)^2 = 0 \implies x = -1$。

**检验：** 各根均满足 $x \neq 0$。故方程的解为 $x = \dfrac{3 \pm \sqrt{5}}{2}$ 与 $x = -1$。
````

#### 类型 IV：分式方程化为二次方程

形如
$$\frac{ax + b}{cx + d} = \frac{ex + f}{gx + h}$$
的分式方程。

> **回顾：** 代数分式的运算已在第六章 §6.4 教授。此处的方法是第五章「去分母」技巧的自然推广。

> **策略：** 等式两边交叉相乘，消去分母，化为多项式方程。若去分母后得到二次方程，则用 §18.1 的方法求解。检验时须确保原方程各分母均不为零。

````ad-example
title: 示例 | Example


解方程 $\dfrac{x+1}{x-1} = \dfrac{2x+3}{x+2}$。

---

**去分母（交叉相乘）：**
$$(x+1)(x+2) = (2x+3)(x-1).$$
展开两边：
$$x^2 + 3x + 2 = 2x^2 + x - 3.$$
移项化简：
$$x^2 - 2x - 5 = 0.$$
由二次公式：$x = \dfrac{2 \pm \sqrt{4 + 20}}{2} = \dfrac{2 \pm \sqrt{24}}{2} = 1 \pm \sqrt{6}$。

**检验：** $x \neq 1$ 且 $x \neq -2$。$1 \pm \sqrt{6} \neq 1$ 且 $\neq -2$，均满足。故解为 $x = 1 \pm \sqrt{6}$。
````

---

## 18.5　*延伸：三元方程组的矩阵解法（Extension: Matrix Method for Three-Variable Systems）

> **本节难度上限**：T B ｜ C C+ ｜ E B ｜ Q C

> 本节为拓展内容。第五章 §5.6 已详述增广矩阵、初等行变换与高斯消元法在二元方程组中的应用，本节将其推广至三元方程组。

### 18.5.1　三元一次方程组

三元一次方程组的一般形式为：
$$\begin{cases} a_1 x + b_1 y + c_1 z = d_1 \\ a_2 x + b_2 y + c_2 z = d_2 \\ a_3 x + b_3 y + c_3 z = d_3 \end{cases}$$

其增广矩阵为一个 $3 \times 4$ （三行四列）矩阵：
$$\left[\begin{array}{ccc|c} a_1 & b_1 & c_1 & d_1 \\ a_2 & b_2 & c_2 & d_2 \\ a_3 & b_3 & c_3 & d_3 \end{array}\right]$$

### 18.5.2　高斯消元法（三元）
> 第五章已证：对增广矩阵施行初等行变换（交换、倍乘、倍加），等价于对原方程组施行同解变形，不改变解。三元的情形完全相同。

> **三元高斯消元法步骤：**
> 1. **构造：** 写出增广矩阵。
> 2. **消元：** 利用初等行变换，依次将第一列主对角线下方、第二列主对角线下方化为零，得到**行阶梯形**（上三角形式）：
>    $$\left[\begin{array}{ccc|c} * & * & * & * \\ 0 & * & * & * \\ 0 & 0 & * & * \end{array}\right]$$
> 3. **回代：** 从最后一行直接读出 $z$，依次向上回代求出 $y$ 和 $x$。

````ad-example
title: 示例 | Example


解方程组
$$\begin{cases} x + y + z = 6 & \cdots\cdots (1) \\ 2x - y + z = 3 & \cdots\cdots (2) \\ x + 2y - z = 2 & \cdots\cdots (3) \end{cases}$$

---

**构造增广矩阵：**
$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 2 & -1 & 1 & 3 \\ 1 & 2 & -1 & 2 \end{array}\right]$$

**消元：**
*   $R_2 \to R_2 - 2R_1$：将第二行第一列化为零。
   $$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & -1 & -9 \\ 1 & 2 & -1 & 2 \end{array}\right]$$
*   $R_3 \to R_3 - R_1$：将第三行第一列化为零。
   $$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & -1 & -9 \\ 0 & 1 & -2 & -4 \end{array}\right]$$
*   $R_3 \to R_3 + \dfrac{1}{3}R_2$：将第三行第二列化为零。
   $$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & -1 & -9 \\ 0 & 0 & -\frac{7}{3} & -7 \end{array}\right]$$

此即行阶梯形。

**回代：** 还原为方程组：
$$\begin{cases} x + y + z = 6 \\ -3y - z = -9 \\ -\frac{7}{3}z = -7 \end{cases}$$
*   由第三式：$z = (-7)\div\left(-\dfrac{7}{3}\right) = 3$。
*   代入第二式：$-3y - 3 = -9 \implies -3y = -6 \implies y = 2$。
*   代入第一式：$x + 2 + 3 = 6 \implies x = 1$。

故方程组的解为 $(x, y, z) = (1, 2, 3)$。
````

---

## 18.6　本章小结

本章将解方程的能力从一次推广到二次，核心内容如下：

1. **三种解法：** 因式分解法（依赖零积性质）、配方法（化为 $(x+m)^2=n$）、二次公式 $x = \dfrac{-b \pm \sqrt{b^2-4ac}}{2a}$。三者中，配方法是推导二次公式的工具，二次公式是一般性结论。
2. **判别式与韦达定理：** $\Delta = b^2-4ac$ 区分根属于 $\mathbb{R}$ 还是 $\mathbb{C}\setminus\mathbb{R}$；韦达定理 $\alpha+\beta = -\dfrac{b}{a}$、$\alpha\beta = \dfrac{c}{a}$ 描述根与系数的关系。两者在 $\mathbb{C}$ 上均无条件成立，这是上一章数系扩充的直接成果。
3. **联立方程组：** 代入消元法将含二次方程的方程组化为一元二次方程，最多两组解。
4. **换元法：** 对双二次方程等特殊形式的高次方程，通过换元 $u = f(x)$ 降次为二次方程。换元后须检验增根。
5. **矩阵方法（延伸）：** 高斯消元法从二元推广到三元，通过初等行变换化增广矩阵为行阶梯形后回代求解。

---

## 中英对照词汇表

| 中文 | 英文 | 备注 |
|------|------|------|
| 一元二次方程 | quadratic equation | $ax^2+bx+c=0$，$a\neq 0$ |
| 二次项系数 | quadratic coefficient | $a$ |
| 一次项系数 | linear coefficient | $b$ |
| 常数项 | constant term | $c$ |
| 零积性质 | zero product property | $AB=0 \iff A=0\lor B=0$ |
| 因式分解法 | factoring method | |
| 配方法 | completing the square | |
| 完全平方 | perfect square | $(a\pm b)^2$ |
| 二次公式 | quadratic formula | $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$ |
| 构造性证明 | constructive proof | |
| 判别式 | discriminant | $\Delta=b^2-4ac$ |
| 二重根 | double root | $\Delta=0$ 时 |
| 单根 | simple root | $k=1$ |
| 重数 | multiplicity | 因式 $(x-r)$ 出现的次数 $k$ |
| 代数基本定理 | fundamental theorem of algebra | $n$ 次方程在 $\mathbb{C}$ 中有 $n$ 个根（计入重数） |
| 共轭复根 | conjugate complex roots | $\Delta<0$ 时 |
| 韦达定理 | Vieta's formulas | 根与系数关系 |
| 比较系数法 | method of comparing coefficients | 第四章 |
| 联立方程组 | simultaneous equations | |
| 代入消元法 | substitution method | 衔接第五章 |
| 回代 | back-substitution | |
| 换元法 | method of substitution | 令 $u=f(x)$ |
| 双二次方程 | biquadratic equation | $ax^4+bx^2+c=0$ |
| 增根 | extraneous root | 换元或去分母后需检验 |
| 行阶梯形 | row echelon form | |
| 高斯消元法 | Gaussian elimination | 衔接第五章 §5.6 |

---

**备课提示：**
*   完全平方公式 $(a\pm b)^2$ 与平方差公式 $a^2-b^2$ 是因式分解法与配方法的基础工具，第六章 §6.2 已教授。教学时可引导学生回顾第六章的恒等式，确保熟练运用。
*   配方法是本章的重点与难点，它不仅是推导二次公式的工具，更是后续第二十二章二次函数求顶点、第三十一章解析几何中圆方程配方化的核心技巧。教学中应强调「方法是内容，不是手段」。
*   判别式与韦达定理在 $\mathbb{C}$ 上均无条件成立。务必纠正「$\Delta<0$ 无解」的误解：方程在 $\mathbb{C}$ 中恒有两根，$\Delta<0$ 仅意味着两根不在实轴上。这是上一章数系扩充的成果落地。
*   韦达定理的两种证明（因式形式、二次公式）各有价值：前者体现根与因式分解的联系，后者直接从公式验证。建议两种都讲。
*   联立方程组的解的个数与代入后二次方程的 $\Delta$ 有关，是第三十一章直线与圆锥曲线交点问题的基础。
*   换元法的关键是检验增根。类型 II（根式）、类型 III/IV（分式）在换元或去分母时可能引入增根，必须回到原方程验证。类型 II 根式与类型 III/IV 分式所依赖的根式与代数分式均已在第六章教授。指数方程留待解方程方法(III)中讨论。
*   第五节三元高斯消元为拓展内容，不纳入 DSE 基础考核，但矩阵语言在处理三元以上方程组时的系统性优势值得有能力的学生了解。

（本讲义基于 LaTeX 源文件 `chapter18解方程方法(II).tex` 与 Textbook Plan `Ch18 解方程方法 (II).md` 撰写，取两者并集，严格遵循 DSE 考纲与讲义格式规范）
