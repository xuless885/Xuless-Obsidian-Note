---
tags: DSE课程笔记
---

# 5　解方程方法(I)（Methods of Solving Equations (I)）

> 本章系统学习方程的基本概念，回顾等式、方程、根的定义及相关的恒等变换。在此基础上，重点讨论一元一次方程和二元一次方程组的经典解法：代入消元法与加减消元法，并初步了解矩阵表示与高斯消元的思想。

前置：[[Chapter 0 基础概念|基础概念]]、[[Chapter 4 多项式(I)|多项式(I)]]

---

## 5.1　方程的基本概念（Fundamentals of Equations）

> **本节难度上限**：T C ｜ C D ｜ E D ｜ Q C

### 5.1.1　方程的定义

> 在第零章我们学过「等式」是由 $=$ 所连接的代数式，例如 $5 = 4+1$，$a = a+0$ 都是等式的例子。等式本身是一个命题 $P$（因为「$=$」本身具有构建命题的作用）。若等式中出现变量，则这些等式是开放命题——我们称这些等式为**方程**。

````ad-def
title: 定义（方程） | Definition（Equation）

1. 方程是含有未知数（变量）的等式。
2. 若等式 $P(x,y,z,\cdots)$ 为方程，则称变量 $x,y,z,\cdots$ 为方程的**变量**（Variables）。
3. 方程内变量的数量称为该方程的「**元**」。例如一元方程代表该方程有一个变量。
````

> 务须分清等式与表达式（代数式）的区别：等式是指以 $=$ 连接的代数式，而表达式只是由数字、字母与其他运算构成的数学命题。

````ad-example
title: 示例 | Example


判断下列各式是否为方程：
1. $x+5$
2. $xy = 1$
3. $2+3=5$

---

1. 不是方程。$x+5$ 只是表达式，没有以 $=$ 连接。
2. 是方程。以 $=$ 连接 $xy$ 与 $1$，且含变量 $x, y$。
3. 不是方程。虽是等式，但不含变量。
````

````ad-example
title: 示例（求方程的变量与元） | Example（求方程的变量与元）


求下列各方程的变量与元：
1. $x - 2y = 1$
2. $x^2 - 5x + 25 = 0$
3. $x^2 + 2xyz + y^2 = 0$

---

1. 变量为 $x, y$，是一个二元方程。
2. 变量为 $x$，是一个一元方程。
3. 变量为 $x, y, z$，是一个三元方程。
````

---

### 5.1.2　方程的恒等变换（Equivalent Transformations）

> 由于 $=$ 的性质，在 $=$ 两边做相同的「操作」不会改变两边的相等性。回顾等式的性质：$\forall$ 实数 $a, b, k$，有
> 1. $a = b \iff a + k = b + k$
> 2. $a = b \iff ak = bk$，其中 $k \neq 0$

````ad-def
title: 定义（恒等变换） | Definition（Equivalent Transformation）

对每一个方程，对两边同时加任意实数或乘以任意非零实数都不会改变这个等式（作为命题的真假性不变）。我们将这样的操作称为**恒等变换**。

> 操作前后的两个命题只是形式不同，实则是等价的。
````

````ad-example
title: 示例（恒等变换的演示） | Example（Demonstration of Equivalent Transformations）

利用恒等变换解方程 $2x + 1 = 5$。

---

对方程施行恒等变换：

1. 两边同减 $1$：$$2x + 1 = 5 \iff 2x = 4$$
2. 两边同除以 $2$：$$2x = 4 \iff x = 2$$

> 每一步都用 $\iff$ 连接，表示前后等价。

最终 $x = 2$ 是原方程的根。
````

需留意：方程的恒等变换并不局限于上述所示，其他的恒等变换（如代入、替换）需要进一步学习。

---

### 5.1.3　多项式方程与最简表示

````ad-def
title: 定义（多项式方程） | Definition（Polynomial Equation）

若方程两端的代数式均为多项式，则该方程称为**多项式方程**。
````

````ad-example
title: 示例（判断多项式方程） | Example（Identifying Polynomial Equations）

判断下列等式是否为多项式方程：
1. $x^2 - 3x + 2 = 0$
2. $\dfrac{1}{x} + 5 = 7$
3. $\sqrt{x} = 4$

---

1. 是。两端均为多项式（左为 $x^2-3x+2$，右为 $0$）。
2. 否。$\dfrac{1}{x}+5$ 含分式，不是多项式。
3. 否。$\sqrt{x}$ 不是多项式。
````

我们在多项式的课题中学习到了多项式的最简表示。同样，我们可以将多项式方程进行最简表示，以方便讨论：

````ad-def
title: 定义（多项式方程的最简表示） | Definition（Simplest Form）

多项式方程 $P_1 = P_2$ 可表示为 $P_1 - P_2 = 0$，设 $Q$ 为 $P_1 - P_2$ 的最简表示，则
$$Q = 0$$
是该方程的最简表示。
````

> 例如 $x - 2 = 3x$，我们将两边同时减去 $3x$（恒等变换，因为 $3x$ 也是实数）：
> $$\begin{aligned} x - 2 &= 3x \\ x - 2 - 3x &= 3x - 3x \\ -2x - 2 &= 0 \end{aligned}$$
> 因此原方程的最简表示为 $-2x - 2 = 0$。

> 本质上，我们透过强制规定方程的一端为 $0$ 来限制方程的形式。否则方程的两端可能有非常多不同的表示，例如：
> $$x - 1 = 3x + 1,\quad x = 3x + 2,\quad x + 1 = 3x + 3,\ \cdots$$
> 这些方程都与 $x - 2 = 3x$ 完全等价，它们是由恒等变换所得出的。

````ad-def
title: 定义（方程的次数） | Definition（Degree of an Equation）

若 $Q$ 为最简多项式，对于多项式方程 $Q = 0$，我们将 $Q$ 的次数称为该方程的**次数**。

例如方程 $x^2 + y^3 = 1$ 有两个变量 $x$ 与 $y$，$x$ 的幂为 $2$，$y$ 的幂为 $3$。这是一个二元三次方程。
````

````ad-example
title: 示例 | Example


指出下列方程的最简表示与次数：
1. $3x + 1 = 5$
2. $2x^2 - 3 = x^2 + 1$

---

1. 最简表示为 $-3x + 4 = 0$，是一元一次方程。
2. 最简表示为 $x^2 - 4 = 0$，是一元二次方程。
````

---

### 5.1.4　解方程与方程的根（Solving Equations and Roots）

> 方程本质上是一个开放命题，因此可能存在一些变量的取值使得该命题为真，也有一些变量的取值使得该命题为假。

````ad-def
title: 定义（方程的根 / 解） | Definition（Root / Solution）

对于某个方程 $P(x, y, z, \cdots)$，若存在一组变量的取值 $(x_0, y_0, z_0, \cdots)$ 使得该方程成立（即等式 $P(x_0, y_0, z_0, \cdots) = \mathbb T$），我们称该组变量 $(x_0, y_0, z_0, \cdots)$ 为方程的**解**，或**根**。
````

````ad-example
title: 示例（验证根） | Example（Verifying Roots）

判断 $x = 2$ 和 $x = 3$ 是否为方程 $2x - 5 = 1$ 的根。

---

1. 代入 $x = 2$：$2(2) - 5 = 4 - 5 = -1 \neq 1$，故 $x = 2$ 不是根。
2. 代入 $x = 3$：$2(3) - 5 = 6 - 5 = 1$，等式成立，故 $x = 3$ 是根。
````

````ad-def
title: 定义（解方程） | Definition（Solving Equations）

对于某个方程，求出满足该方程的根的过程称为**解方程**。
1. 若方程的根有 $n$ 个，称该方程有 $n$ 个解。特别地，只有一个解的方程称为有唯一解。
2. 若方程的根有无限个，称该方程有无穷多解。
3. (1)、(2) 合称为方程有解。
4. 若该方程没有根，则称该方程**无解**。
````

````ad-example
title: 示例（验证解） | Example（验证解）


验证 $x = 1, y = 6$ 是方程 $xy + 2x^2 - 8 = 0$ 的解。

---

当 $x = 1, y = 6$ 时，计算 $xy + 2x^2 - 8$：
$$(1)(6) + 2(1)^2 - 8 = 6 + 2 - 8 = 0$$
因此等式成立，即 $x = 1, y = 6$ 是该方程的解。
````

````ad-example
title: 示例（简单求解） | Example（简单求解）


解方程 $x + 2 = 3$：

---

利用等式的性质，两边同时减 $2$（恒等变换）：
$$x + 2 = 3 \iff x = 1$$
因此 $x = 1$ 为该方程的根（唯一解）。
````

>我们重新回顾有关等式的性质：

````ad-thm
title: 定理（等式的性质） | Theorem（Properties of Equality）

1. **加减法不变性：** $a = b \implies a + c = b + c$
2. **乘除法不变性：** 若 $c \neq 0$，则 $a = b \iff ac = bc$
````

---

### 5.1.5　方程的等价性（Equivalence of Equations）

> 由于方程本质上是等式，等式本质上是命题，因此方程等价就是命题等价。即从解方程角度看，**等价的方程有相同的根**。

> 直观地说，两个方程若同根则等价。解方程过程中每一步恒等变换都应保证等价，否则可能「增根」（引入非解）或「失根」（遗漏真解）。

````ad-def
title: 定义（等价方程） | Definition（Equivalent Equations）

若两个方程 $E_1$ 与 $E_2$ 的解集完全相同，则称 $E_1$ 与 $E_2$ **等价**，记作 $E_1 \iff E_2$。
````

````ad-example
title: 示例（等价与不等价） | Example（Equivalence and Non-Equivalence）

1. 验证 $2x + 1 = 5$ 与 $2x = 4$ 等价。
2. 验证 $x = 1$ 与 $x^2 = 1$ 不等价。

---

1. $2x + 1 = 5 \iff 2x = 4 \iff x = 2$。两者解集均为 $\{2\}$，故等价。
2. $x = 1$ 的解集为 $\{1\}$；$x^2 = 1$ 的解集为 $\{1, -1\}$。解集不同，故不等价（$x^2 = 1$ 比 $x = 1$ 多一根 $-1$）。
````

这一概念确保我们在解方程过程中所做的每一步恒等变换都不会丢失或引入额外的根。

---

## 5.2　一元一次方程（Linear Equations in One Variable）

> **本节难度上限**：T C ｜ C C ｜ E D ｜ Q D

### 5.2.1　形式与唯一解

````ad-def
title: 定义（一元一次方程的形式） | Definition（Form of Linear Equation in One Variable）

对于多项式方程 $P_1 = P_2$，设其最简表示为 $Q = 0$。我们称 $P_1 = P_2$ 为**一元一次方程**当且仅当 $Q$ 是一元一次多项式。
````

> 例如 $2x + 3 = 5x - 4$，计算 $(2x+3) - (5x-4) = -3x + 7$，为单变量一次多项式，因此该方程是一元一次方程。

````ad-example
title: 示例（判断一元一次方程） | Example（Identifying Linear Equations in One Variable）

判断下列方程是否为一元一次方程：
1. $4x - 7 = 2x + 1$
2. $x^2 + 3 = 0$
3. $2x + 1 = 2x + 3$

---

1. 是。最简表示 $2x - 8 = 0$，$x$ 项系数 $2 \neq 0$。
2. 否。最简表示 $x^2 + 3 = 0$，为二次方程。
3. 否。最简表示 $0 = 2$，$x$ 项系数为 $0$（矛盾方程，无解）。
````

````ad-thm
title: 定理（一元一次方程的标准形式） | Theorem（一元一次方程的标准形式）

一元一次方程可被表示为 $ax + b = 0$ 的形式，其中 $a, b$ 为实数且 $a \neq 0$。
````

````ad-proof
title: 证明 | Proof

$P_1 = P_2$ 为一元一次方程 $\iff Q = P_1 - P_2$ 是一元一次多项式 $\iff Q = ax + b$，其中 $a, b$ 为实数且 $a \neq 0$。
````

````ad-example
title: 示例（化为标准形式） | Example（Reducing to Standard Form）

将方程 $3(2x - 1) = 4x + 7$ 化为标准形式 $ax + b = 0$，并写出 $a, b$。

---

$$\begin{aligned} 3(2x - 1) &= 4x + 7 \\ 6x - 3 &= 4x + 7 \\ 6x - 4x &= 7 + 3 \\ 2x - 10 &= 0 \end{aligned}$$
故标准形式为 $2x - 10 = 0$，$a = 2$，$b = -10$。
````

````ad-thm
title: 定理（一元一次方程的唯一解） | Theorem（一元一次方程的唯一解）

一元一次方程 $ax + b = 0$ 的唯一解为 $x = -\dfrac{b}{a}$。
````

````ad-proof
title: 证明 | Proof

利用恒等变换操作等式：
$$\begin{aligned} ax + b = 0 &\iff ax = -b \\ &\iff \frac{1}{a} \cdot (ax) = \frac{1}{a}(-b) \\ &\iff x = -\frac{b}{a} \end{aligned}$$
注意此证明已蕴含了唯一性，因为 $ax + b = 0$ 完全等价于 $x = -\dfrac{b}{a}$ 这一个根。
````

````ad-example
title: 示例 | Example


解方程 $2x + 3 = 5x - 4$：

---

化为最简表示：
$$\begin{aligned} 2x + 3 &= 5x - 4 \\ &\iff 2x + 3 - 5x + 4 = 0 \\ &\iff -3x + 7 = 0 \\ &\iff -3x = -7 \\ &\iff x = \frac{7}{3} \end{aligned}$$
````

````ad-example
title: 示例 | Example


解方程 $3(x - 2) = 2x + 1$：

---

$$\begin{aligned} 3(x - 2) &= 2x + 1 \\ &\iff 3x - 6 = 2x + 1 \\ &\iff 3x - 2x = 1 + 6 \\ &\iff x = 7 \end{aligned}$$
> 一般而言，我们约定忽略掉解方程过程中的 “ $\iff$ "。
````

> 务必留意**并非所有**的 $P_1 = P_2$（其中 $P_1, P_2$ 为一元一次多项式）所构成的方程都为一元一次方程。如果 $P_1, P_2$ 的 $x$ 项系数一致（设为 $a$），而常数项不同（分别设为 $b, k$，$b \neq k$）：
> $$P_1 = P_2 \iff ax + b = ax + k \iff b = k$$
> 明显矛盾于 $b \neq k$。换言之该方程是无解的。

---

### 5.2.2　解一元一次方程的步骤

> 以下是解一元一次方程的标准算法：

1. **去分母**（Remove Denominators）：方程两边同乘各分母的最小公倍数。
2. **去括号**（Remove Brackets）：利用分配律展开括号。
3. **移项**（Transposition）：将含未知数的项移到等号一边，常数项移到另一边（注意变号）。
4. **合并同类项**（Combine Like Terms）：化为 $ax = b$ 的形式。
5. **系数化为 1**（Make Coefficient 1）：方程两边同除以 $a$。

````ad-example
title: 示例（完整步骤） | Example（完整步骤）


解方程 $\dfrac{x}{2} - \dfrac{x+1}{3} = 1$：

---

1. **去分母**：两边同乘 $6$（LCM of $2, 3$）：
  $$3x - 2(x+1) = 6$$
2. **去括号**：
  $$3x - 2x - 2 = 6$$
3. **合并同类项**：
  $$x - 2 = 6$$
4. **移项**：
  $$x = 8$$
````

````ad-example
title: 示例（含括号与分母） | Example（With Brackets and Denominators）

解方程 $\dfrac{2x - 1}{3} - \dfrac{x + 2}{4} = 1$。

---

1. **去分母**：两边同乘 $12$（LCM of $3, 4$）：
  $$4(2x - 1) - 3(x + 2) = 12$$
2. **去括号**：
  $$8x - 4 - 3x - 6 = 12$$
3. **合并同类项**：
  $$5x - 10 = 12$$
4. **移项**：
  $$5x = 22$$
5. **系数化为 $1$**：
  $$x = \dfrac{22}{5}$$
````

---

## 5.3　二元一次方程与方程组（Linear Equations in Two Variables & Systems）

> **本节难度上限**：T B- ｜ C C ｜ E D ｜ Q D

### 5.3.1　二元一次方程

````ad-def
title: 定义（二元一次方程） | Definition（Linear Equation in Two Variables）

对于多项式方程 $P_1 = P_2$，设其最简表示为 $Q = 0$。我们称 $P_1 = P_2$ 为**二元一次方程**当且仅当 $Q$ 是二元一次多项式。
````

````ad-example
title: 示例（判断二元一次方程） | Example（Identifying Linear Equations in Two Variables）

判断下列方程是否为二元一次方程：
1. $3x + 2y = 7$
2. $xy = 4$
3. $5x - 3 = 2$

---

1. 是。最简表示 $3x + 2y - 7 = 0$，为二元一次多项式。
2. 否。$xy$ 项次数为 $2$，非一次。
3. 否。只有一个变量 $x$，是一元一次方程。
````

````ad-thm
title: 定理（二元一次方程的表示） | Theorem（Representation of Linear Equations in Two Variables）

二元一次方程可被表示为 $ax + by + c = 0$ 的形式，其中 $a, b, c$ 为实数且 $a, b \neq 0$。
````

````ad-proof
title: 证明 | Proof

由定义，二元一次方程的最简表示 $Q = P_1 - P_2$ 是二元一次多项式。由二元一次多项式的定义，$Q$ 可写为 $ax + by + c$（$a, b, c$ 为实数）。因 $Q$ 含两个变量 $x, y$ 且各变量次数均为 $1$，故 $a \neq 0$ 且 $b \neq 0$。即 $Q = ax + by + c = 0$。
````

````ad-example
title: 示例 | Example


将方程 $2x - 8y = 9 - x + y$ 表示为 $ax + by + c = 0$ 的形式：

---

$$\begin{aligned} 2x - 8y &= 9 - x + y \\ 2x - 8y - y &= 9 - x \\ 2x - 9y &= 9 - x \\ 2x - 9y + x &= 9 \\ 3x - 9y &= 9 \\ 3x - 9y - 9 &= 0 \\ x - 3y - 3 &= 0 \quad (\text{两边同除以 }3) \end{aligned}$$
因此 $a = 1$，$b = -3$，$c = -3$。
````

````ad-thm
title: 定理（二元一次方程有无穷多解） | Theorem（二元一次方程有无穷多解）

二元一次方程 $ax + by + c = 0$ 有无穷多解。
````

````ad-proof
title: 证明 | Proof

取 $x = n$ 为任意整数，则：
$$an + by + c = 0$$
对于每个整数 $n$，这是关于 $y$ 的一元一次方程，其有一个解。由于整数有无穷多个，解也有无穷多个。

> $x$ 不仅可以取整数，也可以取有理数、无理数。因此上述推导过程所得到的解并非方程的所有解。
````

---

### 5.3.2　方程组（System of Equations）

````ad-def
title: 定义（方程组） | Definition（System of Equations）

设 $Eq_1, Eq_2, \cdots, Eq_n$ 为 $n$ 个方程，定义：
$$(E) = \begin{cases} Eq_1 \\ \ \ \vdots \\ Eq_n \end{cases} \iff (Eq_1) \land (Eq_2) \land \cdots \land (Eq_n)$$
表示一方程组，是连接多个方程的**逻辑命题**。
1. 根据逻辑合取的定义，其解为同时满足这 $n$ 个方程的未知数组；若不存在同时满足所有方程的未知数组，则称其无解。
2. 方程组 $(E)$ 的变量是 $(E)$ 中出现的所有方程的变量。
````

````ad-example
title: 示例（方程组及其解） | Example（方程组及其解）


考虑方程组：
$$(E) = \begin{cases} y = x \\ y - 2x = -1 \end{cases}$$
取 $x = 1, y = 1$：
- 第一个方程：$y = x$ 成立（$\mathbb T$）。
- 第二个方程：$y - 2x = 1 - 2(1) = -1$ 成立（$\mathbb T$）。

因此 $x = 1, y = 1$ 同时是这两个方程的解，即 $(x,y) = (1,1)$ 是方程组 $(E)$ 的解。
````

> 方程组的解取决于两个方程是否相容——有的方程组有唯一解，有的有无穷多解，有的则无解。这将在 §5.4.4 系统讨论。

---

### 5.3.3　方程组的等价性

> 我们可以将方程的等价性推广到方程组上：

````ad-def
title: 定义（等价方程组） | Definition（Equivalent Systems）

若两个方程组 $(E_1)$ 和 $(E_2)$ 拥有完全相同的解，则称 $(E_1)$ 和 $(E_2)$ 是**等价的**。
````


````ad-thm
title: 定理（方程替换定理） | Theorem（方程替换定理）

设方程组：
$$(E) = \begin{cases} Eq_1 \\ \ \ \vdots \\ Eq_k \\ \ \ \vdots \\ Eq_n \end{cases}$$
若对其中某个方程 $Eq_k$，存在方程 $R$ 使得 $Eq_k \iff R$（即 $Eq_k$ 与 $R$ 等价），则将 $Eq_k$ 替换为 $R$ 所得的新方程组 $(E^*)$ 等价于 $(E)$。
````

````ad-proof
title: 证明 | Proof

由假设： $Eq_k \iff R$ 知 $Eq_k$ 与 $R$ 拥有相同的根。

因此对于所有 $(E)$ 的根，它必然是 $(E^*)$ 的根，反之亦然。故 $(E) \iff (E^*)$。
````

````ad-example
title: 示例（替换定理的应用） | Example（替换定理的应用）

考虑方程组：
$$(E) = \begin{cases} y = x - 2 & \cdots\cdots E_1 \\ y - x + 1 = 0 & \cdots\cdots E_2 \end{cases}$$
对 $E_1$ 两边同时加 $3$，证明所得方程组与 $(E)$ 等价。

---

$E_1 \iff y + 3 = x + 1$（两边同加 $3$，恒等变换）。由方程替换定理，将 $E_1$ 替换为 $y + 3 = x + 1$，所得新方程组等价于 $(E)$：
$$(E) \iff \begin{cases} y + 3 = x + 1 \\ y - x + 1 = 0 \end{cases}$$
````

````ad-example
title: 示例（用替换定理证两方程等价） | Example（Proving Equivalence via Substitution）

证明方程 $2x + 3 = 7$ 与 $x = 2$ 等价。

---

对 $2x + 3 = 7$ 连续施行恒等变换：
$$\begin{aligned} 2x + 3 = 7 &\iff 2x = 4 \quad (\text{两边同减 } 3) \\ &\iff x = 2 \quad (\text{两边同除以 } 2) \end{aligned}$$
每一步都是恒等变换（替换定理的特例），故 $2x + 3 = 7 \iff x = 2$，两方程等价。
````

---

### 5.3.4　初等行变换（Elementary Row Operations）

> 加减消元法的核心是以下引理，它告诉我们如何对方程组中的方程进行线性组合而不改变解集：

````ad-lem
title: 引理（初等行变换） | Lemma（Elementary Row Operation）

设 $k, r$ 为非零实数，对于方程组：
$$(E) = \begin{cases} P_1 = P_2 \\ Q_1 = Q_2 \end{cases}$$
有：
$$(E) \iff \begin{cases} kP_1 + rQ_1 = kP_2 + rQ_2 \\ Q_1 = Q_2 \end{cases}$$
即将方程 $Q_1 = Q_2$ 乘以某个倍数后加到另一个方程上，所得方程组依然与原方程组等价。
````

````ad-proof
title: 证明 | Proof

对 $(E)$ 所含的两个方程做恒等变换并进行替换，由上述替换定理可得其等价表示：
$$(E) = \begin{cases} P_1 = P_2 \\ Q_1 = Q_2 \end{cases} \iff \begin{cases} kP_1 = kP_2 \\ rQ_1 = rQ_2 \end{cases} \iff \begin{cases} kP_1 + 0 = kP_2 & \cdots E_1 \\ rQ_1 - rQ_2 = 0 & \cdots E_2 \end{cases}$$
根据莱布尼茨定律，将 $E_1$ 中的 $0$ 替换为 $E_2$ 的左式：
$$(E) \iff \begin{cases} kP_1 + (rQ_1 - rQ_2) = kP_2 \\ rQ_1 - rQ_2 = 0 \end{cases} \iff \begin{cases} kP_1 + rQ_1 = kP_2 + rQ_2 \\ rQ_1 - rQ_2 = 0 \end{cases}$$
由于 $rQ_1 - rQ_2 = 0 \iff Q_1 = Q_2$，因此
$$(E) \iff \begin{cases} kP_1 + rQ_1 = kP_2 + rQ_2 \\ Q_1 = Q_2 \end{cases}$$
````

````ad-example
title: 示例（初等行变换的应用） | Example（Application of Elementary Row Operations）

设方程组 $(E) = \begin{cases} x + y = 5 & \cdots (1) \\ 2x - y = 4 & \cdots (2) \end{cases}$，用初等行变换将其化为等价形式。

---

取 $k = -2$、$r = 1$（即 $(1) \times (-2) + (2)$）：
$$-2(x + y) + (2x - y) = -2 \cdot 5 + 4 \iff -3y = -6$$
由初等行变换引理（保留 $(2)$ 不变）：
$$(E) \iff \begin{cases} -3y = -6 & \cdots (1) \times (-2) + (2) \\ 2x - y = 4 & \cdots (2) \end{cases}$$
再解 $-3y = -6 \iff y = 2$，回代 $(2)$ 得 $x = 3$。
````

### 5.3.5　方程组的记号约定

> 一般对方程组
> $$(E) = \begin{cases} Eq_1 \\ \ \ \vdots \\ Eq_n \end{cases}$$
> 我们通常自上而下地将第 $k$ 个方程记为 $E_k$ 或 $(k)$。

> 例如对方程组 $\begin{cases} x + y = 5 \\ 2x - y = 4 \end{cases}$，$(1)$ 指第一个方程 $x + y = 5$，$(2)$ 指第二个方程 $2x - y = 4$。据此可写 $2(1) + (2)$ 表示「第一个方程乘以 $2$ 再加第二个方程」。注意 $(k)$ 是「第 $k$ 个方程」的记号，不是「乘以 $k$」，实际书写中建议用罗马字符 (I)、(II) 或 $(Eq_k)$ 等以避免混淆。

---

## 5.4　二元一次方程组的解法（Methods for Solving Systems of Two Linear Equations）

> **本节难度上限**：T B- ｜ C B ｜ E C ｜ Q D

````ad-def
title: 定义（二元一次方程组） | Definition（System of Linear Equations in Two Variables）

设 $P_1 = P_2$、$Q_1 = Q_2$ 为两个二元一次方程。方程组
$$\begin{cases} P_1 = P_2 \\ Q_1 = Q_2 \end{cases}$$
称为**二元一次方程组**。
````

该方程组可等价地表示为：
$$\begin{cases} ax + by + c = 0 \\ dx + ey + f = 0 \end{cases} \qquad \text{或} \qquad \begin{cases} P = 0 \\ Q = 0 \end{cases}$$
其中 $a, b, c, d, e, f$ 为实数且 $a, b, d, e \neq 0$，$P, Q$ 分别为 $P_1 = P_2$ 与 $Q_1 = Q_2$ 的最简表示。

````ad-thm
title: 定理（二元一次方程组的等价表示） | Theorem（Equivalent Representations of Linear Systems）

设 $\begin{cases} P_1 = P_2 \\ Q_1 = Q_2 \end{cases}$ 为二元一次方程组，$P = P_1 - P_2$、$Q = Q_1 - Q_2$ 为其最简表示，则
$$\begin{cases} P_1 = P_2 \\ Q_1 = Q_2 \end{cases} \iff \begin{cases} P = 0 \\ Q = 0 \end{cases}$$
````

````ad-proof
title: 证明 | Proof

由恒等变换，$P_1 = P_2 \iff P_1 - P_2 = 0 \iff P = 0$（两边同减 $P_2$）。同理 $Q_1 = Q_2 \iff Q = 0$。

由方程替换定理，将方程组中的 $P_1 = P_2$ 替换为 $P = 0$、$Q_1 = Q_2$ 替换为 $Q = 0$，所得方程组与原方程组等价。故
$$\begin{cases} P_1 = P_2 \\ Q_1 = Q_2 \end{cases} \iff \begin{cases} P = 0 \\ Q = 0 \end{cases}$$
````

> **核心思想**：消元（Elimination）——将方程组转化为一元一次方程来求解。因为现階段我们唯一可解的方程只有一元一次方程。

---

### 5.4.1　代入消元法（Substitution Method）

````ad-lem
title: 引理（变量的分离） | Lemma（Separation of Variables）

$\forall$ 二元一次方程 $P_1 = P_2$，设其变量为 $x, y$。则 $\exists$ 变量为 $y$ 的一元一次多项式 $Q$ 使得
$$P_1 = P_2 \iff x = Q$$
````

````ad-proof
title: 证明 | Proof

首先将二元一次方程写为其最简形式 $P = 0$，其中 $P = ax + by + c$（$a, b \neq 0$）。因此
$$\begin{aligned} P_1 = P_2 \iff P = 0 &\iff ax + by + c = 0 \\ &\iff ax = -c - by \\ &\iff x = \frac{1}{a}(-c - by) \\ &\iff x = -\frac{c}{a} - \frac{b}{a}y \end{aligned}$$
设 $Q = -\dfrac{c}{a} - \dfrac{b}{a}y$，可见 $Q$ 为变量为 $y$ 的一元一次多项式，且 $P_1 = P_2 \iff x = Q$。
````

> **代入消元法步骤：**
> 1. **变形**（Rearrange）：从方程组中选一个系数较简单的方程，将其中一个未知数用另一个未知数表示。
> 2. **代入**（Substitute）：将该表达式代入另一个方程中，替换对应的未知数，得到一个一元一次方程。
> 3. **求解**（Solve）：解出这个一元一次方程，得到第一个未知数的值。
> 4. **回代**（Back-substitute）：将求得的值代回步骤 1 中的表达式，求出另一个未知数的值。

````ad-example
title: 示例（代入消元法） | Example（代入消元法）


解方程组 $E = \begin{cases} x - 2y = -3 & \cdots\cdots (1)\\ 2x + y = -1 & \cdots\cdots (2) \end{cases}$

---

**步骤 1 — 变形**：将 $(2)$ 做恒等变换：
$$\begin{aligned} 2x + y = -1 &\iff 2x = -y - 1 \\ &\iff x = -\frac{1}{2}y - \frac{1}{2} \end{aligned}$$
因此 $E \iff \begin{cases} {\color{red}x} - 2y = -3 & \cdots\cdots (1)\\ {\color{red}x} = -\dfrac{1}{2}y - \dfrac{1}{2} & \cdots\cdots (4) \end{cases}$

**步骤 2 — 代入**：将 $(4)$ 代入 $(1)$ 中的 $x$（莱布尼茨定律）：
$$E \iff \begin{cases} {\color{red}\left(-\dfrac{1}{2}y - \dfrac{1}{2}\right)} - 2y = -3 & \cdots\cdots (3)\\ x = -\dfrac{1}{2}y - \dfrac{1}{2} & \cdots\cdots (4) \end{cases}$$

**步骤 3 — 求解**：$(3)$ 是关于 $y$ 的一元一次方程：
$$\begin{aligned} -\frac{1}{2}y - \frac{1}{2} - 2y = -3 &\iff -\frac{5}{2}y = -\frac{5}{2} \\ &\iff y = 1 \end{aligned}$$
$$E \iff \begin{cases} y = 1 \\ x = -\dfrac{1}{2}y - \dfrac{1}{2} \end{cases}$$

**步骤 4 — 回代**：将 $y = 1$ 代入 $(4)$：
$$\begin{aligned} x &= -\frac{1}{2}(1) - \frac{1}{2} \\ &= -1 \end{aligned}$$

因此方程组的解为 $x = -1, y = 1$。
````

````ad-example
title: 示例（代入消元法） | Example（Substitution Method）

解方程组 $E = \begin{cases} 3x + 2y = 8 & \cdots\cdots (1) \\ x - y = 1 & \cdots\cdots (2) \end{cases}$

---

**步骤 1 — 变形**：将 $(2)$ 改写为用 $x$ 表示 $y$：
$$x - y = 1 \iff y = x - 1$$

**步骤 2 — 代入**：将 $y = x - 1$ 代入 $(1)$：
$$3x + 2(x - 1) = 8$$

**步骤 3 — 求解**：
$$\begin{aligned} 3x + 2x - 2 &= 8 \\ 5x &= 10 \\ x &= 2 \end{aligned}$$

**步骤 4 — 回代**：$y = x - 1 = 2 - 1 = 1$。

因此方程组的解为 $x = 2, y = 1$。
````

---

### 5.4.2　加减消元法（Elimination Method）

 加减消元法的核心是上文的初等行变换引理。我们规定以下记号：对于方程组
 $$(E) = \begin{cases} P_1 = Q_1 & \cdots\cdots (1) \\ P_2 = Q_2 & \cdots\cdots (2) \end{cases}$$
 - 记法 $a(k) + b$ 表示对方程两边同时乘以 $a$ 加上 $b$，即 $aP_k + b = aQ_k + b$。
 - 记法 $(k) \pm (r)$ 表示对方程 $(k)$ 及 $(r)$ 的左右侧分别进行加减运算，即 $P_k \pm P_r = Q_k \pm Q_r$。

>  读者切記不要将 $(k)$ 与「乘以 $k$」的写法混淆。实际书写中建议使用其他记号，如罗马字符 (I), (II), (III), ... 或 $(Eq_k)$ 等。

> **加减消元法步骤：**
> 1. **变形**（Adjust Coefficients）：将两个方程分别乘以适当的非零常数，使其中一个未知数在两个方程中的系数绝对值相等。
> 2. **加减**（Add / Subtract）：若该未知数的系数符号相反，则将两个方程**相加**消去该未知数；若符号相同，则**相减**消去该未知数。
> 3. **求解**（Solve）：消元后得到一个一元一次方程，解出剩下的未知数。
> 4. **回代**（Back-substitute）：将求得的值代入原方程组中任一方程，求出另一个未知数。

````ad-example
title: 示例（加减消元法） | Example（加减消元法）


解方程组 $E = \begin{cases} x - 2y = -3 & \cdots\cdots (A)\\ 2x + y = -1 & \cdots\cdots (B) \end{cases}$

---

**步骤 1 — 变形**：将 $(A)$ 乘以 $2$：
$$2(A) \iff 2(x - 2y) = 2(-3) \iff 2x - 4y = -6$$
$$E \iff \begin{cases} {\color{red}2x} - 4y = -6 & \cdots\cdots 2(A)\\ {\color{red}2x} + y = -1 & \cdots\cdots (B) \end{cases}$$

**步骤 2 — 加减**：$2(A)$ 与 $(B)$ 的 $x$ 项系数均为 $2$（符号相同），故考虑 $(2A) - (B)$：
$$\begin{aligned} 2(A) - (B) &\iff (2x - 4y) - (2x + y) = -6 - (-1) \\ &\iff 2x - 2x - 4y - y = -5 \\ &\iff -5y = -5 \\ &\iff y = 1 \end{aligned}$$
根据初等行变换引理：
$$E \iff \begin{cases} y = 1 & \cdots\cdots 2(A)-(B)\\ 2x + y = -1 & \cdots\cdots (B) \end{cases}$$

**步骤 4 — 回代**：将 $y = 1$ 代入 $(B)$：
$$\begin{aligned} 2x + 1 = -1 &\iff 2x = -2 \\ &\iff x = -1 \end{aligned}$$

因此方程组的解为 $x = -1, y = 1$。
````

````ad-example
title: 示例（加减消元法） | Example（Elimination Method）

解方程组 $E = \begin{cases} 3x + 2y = 8 & \cdots\cdots (A) \\ x - y = 1 & \cdots\cdots (B) \end{cases}$

---

**步骤 1 — 变形**：将 $(B)$ 乘以 $2$，使 $y$ 项系数与 $(A)$ 相反：
$$2(B) \iff 2x - 2y = 2$$

**步骤 2 — 加减**：$(A) + 2(B)$ 消去 $y$：
$$\begin{aligned} (3x + 2y) + (2x - 2y) &= 8 + 2 \\ 5x &= 10 \\ x &= 2 \end{aligned}$$

**步骤 3 — 回代**：将 $x = 2$ 代入 $(B)$：
$$2 - y = 1 \iff y = 1$$

因此方程组的解为 $x = 2, y = 1$。
````

---

### 5.4.3　两种方法的比较

| 比较维度     | 代入消元法                      | 加减消元法                 |
| :------- | :------------------------- | :-------------------- |
| **适用场景** | 某一未知数的系数为 $1$ 或 $-1$ 时特别方便 | 同一未知数的系数成倍数关系或易于配平时使用 |
| **优势**   | 思路直观，步骤机械                  | 避免分数运算，计算量常较小         |
| **劣势**   | 代入后可能产生较复杂的代数式             | 需要先判断系数关系并决定乘何数       |
| **选择原则** | 看系数！哪个方法能让计算最简单就用哪个        | 熟练后两种方法应都能灵活运用        |


---

### 5.4.4　二元一次方程组解的讨论（Discussion on Solutions of Linear Systems）

#### 确定目标

回顾 §5.3.1，单个二元一次方程 $ax + by + c = 0$ 有无穷多解。然而方程组要求**同时**满足两个方程（逻辑与），解集必然缩小。在前面的例题中，方程组都有唯一解（如 $x = -1, y = 1$）。

考虑另一个方程组：
$$\begin{cases} x - y = 1 \\ 2x - 2y = 0 \end{cases}$$
将第一个方程乘以 $2$ 得 $2x - 2y = 2$，与第二个方程 $2x - 2y = 0$ 矛盾，故该方程组无解。

同样是两个二元一次方程构成的方程组，为何有的有唯一解、有的却无解？这正是本节要系统讨论的问题。回顾 §5.3.2，方程组 $(E) = Eq_1 \land \cdots \land Eq_n$ 是一个合取命题，其解为同时满足所有方程的取值；解的「有/无/多寡」正是该命题真值集的大小问题。我们需要一个系统的方法来判断它属于哪种情况：唯一解、无解、还是无穷多解。

#### 方法：观察等价变换是否引出矛盾

核心原理在于：等价变换（恒等变换与初等行变换）**不改变方程组的解集**。因此，对原方程组施行消元后，观察所得等价方程组的形式即可判断。

对方程组 $\begin{cases} a_1 x + b_1 y + c_1 = 0 \\ a_2 x + b_2 y + c_2 = 0 \end{cases}$ 施行消元（代入或加减），消去一个变量后可能出现三种结果：

| 消元后形式 | 含义 | 原方程组 |
|:---|:---|:---|
| 得到一个有效的一元一次方程（如 $3y = 6$） | 可解出唯一值 | **唯一解** |
| 引出矛盾（如 $0 = 5$） | 对任意取值均不成立 | **无解** |
| 得到恒等式（如 $0 = 0$） | 对任意取值均成立，两个方程提供的信息相同 | **无穷多解** |

**矛盾情况：** 等价变换后得到 $0 = 5$ 这类矛盾命题，它恒为假。由于等价变换保持解集不变，原方程组的解集也为空，即无解。

**恒等情况：** 等价变换后得到 $0 = 0$ 这类恒真命题，它不提供任何约束。此时方程组退化为单个方程，而单个二元一次方程有无穷多解（§5.3.1 已证），故原方程组亦有无穷多解。

#### 例题

````ad-example
title: 示例（唯一解） | Example（唯一解）


解方程组 $\begin{cases} 2x + y = 5 & \cdots\cdots (1) \\ x - y = 1 & \cdots\cdots (2) \end{cases}$

---

消元：$(1) + (2)$ 得 $3x = 6 \implies x = 2$，回代得 $y = 1$。

得到有效的一元一次方程，故方程组有唯一解 $(x, y) = (2, 1)$。
````


````ad-example
title: 示例（无解） | Example（无解）


判断方程组 $\begin{cases} x + 2y = 3 & \cdots\cdots (1) \\ 2x + 4y = 5 & \cdots\cdots (2) \end{cases}$ 是否有解。

---

消元：$(1) \times 2$ 得 $2x + 4y = 6$，与 $(2)$ 相减得：
$$0 = 1$$
引出矛盾，故原方程组无解。

````


````ad-example
title: 示例（无穷多解） | Example（无穷多解）


判断方程组 $\begin{cases} 2x + 3y = 6 & \cdots\cdots (1) \\ 4x + 6y = 12 & \cdots\cdots (2) \end{cases}$ 是否有解。

---

消元：$(1) \times 2$ 得 $4x + 6y = 12$，与 $(2)$ 相减得：
$$0 = 0$$
得到恒等式，两个方程提供的信息相同，故原方程组有无穷多解。

````


````ad-example
title: 示例（含参数讨论） | Example（含参数讨论）


设方程组 $\begin{cases} 2x + 3y = 6 & \cdots\cdots (1) \\ 4x + ky = m & \cdots\cdots (2) \end{cases}$，其中 $k, m$ 为实数。就 $k, m$ 的取值讨论方程组解的情况。

---

消元：$(1) \times 2$ 得 $4x + 6y = 12$，与 $(2)$ 相减（消去 $x$）：
$$(k - 6)y = m - 12$$

观察这个等价方程：

1. **唯一解**：当 $k - 6 \neq 0$（即 $k \neq 6$）时，得到有效的一元一次方程，可解出 $y = \dfrac{m - 12}{k - 6}$，再回代得唯一解。
2. **无解**：当 $k - 6 = 0$（即 $k = 6$）且 $m - 12 \neq 0$（即 $m \neq 12$）时，方程化为 $0 = m - 12 \neq 0$，引出矛盾，故无解。
3. **无穷多解**：当 $k = 6$ 且 $m = 12$ 时，方程化为 $0 = 0$，恒真，两个方程提供的信息相同，故有无穷多解。
````

---

## 5.5　试根法（Method of Trial and Error / Inspection）

> **本节难度上限**：T C- ｜ C D ｜ E C ｜ Q C

> 针对某些特殊形式或难以用常规代数方法直接求解的方程（如简单的指数方程），可尝试代入特殊值求解。

````ad-def
title: 定义（试根法） | Definition（Method of Trial and Error）

根据方程的特征，选取一些可能的数值（通常是整数，如 $0, \pm 1, \pm 2$ 等）代入方程进行验证。若等式成立，则该数值即为方程的根。

**适用场景：**
- 简单的整系数高次方程。
- 特殊情况下的指数方程（如 $2^x = 8$）。
````

````ad-example
title: 示例（试根法） | Example（试根法）


解方程 $3^x = 81$：

---

- 尝试 $x = 1$：$3^1 = 3 \neq 81$。
- 尝试 $x = 2$：$3^2 = 9 \neq 81$。
- 尝试 $x = 3$：$3^3 = 27 \neq 81$。
- 尝试 $x = 4$：$3^4 = 81$，成立。

故 $x = 4$。
````

> 试根法不是乱猜，而是有规律的尝试（通常从因数入手）。这在将来解决高次多项式因式分解（因式定理）时非常有用。

---

## 5.6　*方程组的矩阵表示与高斯消元（拓展 / Extension）

> **本节难度上限**：T B ｜ C C ｜ E B ｜ Q D

> 本节为拓展内容。学习用矩阵语言描述方程组，通过规范化的行变换来求解，为将来学习线性代数打下基础。

### 5.6.1　增广矩阵

````ad-def
title: 定义（增广矩阵） | Definition（Augmented Matrix）

将方程组的系数和常数项按顺序排列成的矩形阵列。

方程组 $\begin{cases} ax + by = c \\ dx + ey = f \end{cases}$ 的增广矩阵为：
$$\left[ \begin{array}{cc|c} a & b & c \\ d & e & f \end{array} \right]$$
竖线左侧为**系数矩阵**，右侧为**常数向量**。
````

> 矩阵只是把方程组的系数与常数项按行列排好、省去变量与等号的简写形式。以方程组 $\begin{cases} 2x + 3y = 8 \\ x - y = 1 \end{cases}$ 为例：第一行 $[2\;3\;|\;8]$ 对应第一个方程 $2x + 3y = 8$，其中 $2$ 是 $x$ 的系数、$3$ 是 $y$ 的系数、$8$ 是常数项；第二行同理。竖线左侧每一列对应一个变量的系数，右侧一列对应常数项。

### 5.6.2　初等行变换

````ad-thm
title: 定理（初等行变换） | Theorem（Elementary Row Operations）

对矩阵的行进行以下三种操作，且不改变方程组的解（同解变形）：
1. **交换**（Swap）：交换两行（$R_i \leftrightarrow R_j$）。
2. **倍乘**（Scale）：某一行乘以非零常数 $k$（$kR_i \to R_i$）。
3. **倍加**（Add）：将某一行的 $k$ 倍加到另一行上（$R_i + kR_j \to R_i$）。
````

该定理实质上是初等行变换引理在二元一次方程组中的特例：§5.3.4 中的引理（初等行变换）已经给出了完整的陈述与证明。

> **记号说明：** 上式中的 $R_i$ 指矩阵的第 $i$ 行。箭头 $\to$ 表示「把左式替换为右式」（赋值更新），即运算结果覆盖原行；$\leftrightarrow$ 表示两行互换。例如 $R_1 + 2R_2 \to R_1$ 意为「将第 1 行加上第 2 行的 2 倍，结果仍记为第 1 行」。

### 5.6.3　高斯消元法

> **基本流程：**
> 1. **构造**：写出方程组的增广矩阵。
> 2. **消元**：利用初等行变换，将矩阵化为**行阶梯形**（Row Echelon Form），即主对角线下方全为 $0$：
>   $$\left[ \begin{array}{cc|c} * & * & * \\ 0 & * & * \end{array} \right]$$
> 3. **回代**：将矩阵还原为方程组。最后一行通常直接给出最后一个未知数的值，然后向上逐级回代求解。

````ad-example
title: 示例（高斯消元法） | Example（Gaussian Elimination）

用高斯消元法解方程组 $\begin{cases} x + y = 5 & \cdots (1) \\ 2x - y = 4 & \cdots (2) \end{cases}$

---

**步骤 1 — 构造增广矩阵：**
$$\left[ \begin{array}{cc|c} 1 & 1 & 5 \\ 2 & -1 & 4 \end{array} \right]$$

**步骤 2 — 消元**（$R_2 - 2R_1 \to R_2$，消去第二行首项）：
$$\left[ \begin{array}{cc|c} 1 & 1 & 5 \\ 0 & -3 & -6 \end{array} \right]$$

**步骤 3 — 回代**：还原为方程组：
$$\begin{cases} x + y = 5 \\ -3y = -6 \end{cases} \implies y = 2, \quad x = 5 - 2 = 3$$

故解为 $x = 3, y = 2$。
````

````ad-example
title: 示例（高斯消元法，含交换） | Example（Gaussian Elimination with Row Swap）

用高斯消元法解方程组 $\begin{cases} 2x + 4y = 10 & \cdots (1) \\ x + 3y = 7 & \cdots (2) \end{cases}$

---

**步骤 1 — 构造增广矩阵：**
$$\left[ \begin{array}{cc|c} 2 & 4 & 10 \\ 1 & 3 & 7 \end{array} \right]$$

**步骤 2 — 消元**：为避免分数，先交换 $R_1 \leftrightarrow R_2$：
$$\left[ \begin{array}{cc|c} 1 & 3 & 7 \\ 2 & 4 & 10 \end{array} \right]$$
再 $R_2 - 2R_1 \to R_2$：
$$\left[ \begin{array}{cc|c} 1 & 3 & 7 \\ 0 & -2 & -4 \end{array} \right]$$

**步骤 3 — 回代**：$-2y = -4 \implies y = 2$，$x + 3(2) = 7 \implies x = 1$。

故解为 $x = 1, y = 2$。
````

---

## 5.7　章末总结

### 一、方程的基本概念

| 内容 | 关键结论 |
|------|----------|
| **方程** | 含有未知数（变量）的等式。变量的数量称为「元」。 |
| **根 / 解** | 使方程成立的变量取值。 |
| **恒等变换** | 两边同时加减/乘除（非零）不改变等式。 |
| **最简表示** | 多项式方程化为 $Q = 0$ 的形式。 |
| **次数** | 最简形式中多项式的次数。 |

### 二、一元一次方程

| 内容 | 关键结论 |
|------|----------|
| **标准形式** | $ax + b = 0$（$a \neq 0$） |
| **解** | $x = -\dfrac{b}{a}$（唯一解） |
| **特殊情况** | 若 $x$ 项系数相同而常数项不同，则无解。 |

### 三、二元一次方程组

| 内容 | 关键结论 |
|------|----------|
| **形式** | $\begin{cases} ax + by + c = 0 \\ dx + ey + f = 0 \end{cases}$ |
| **代入消元法** | 将一变量表示为另一变量的函数 → 代入 → 化为一元一次方程 |
| **加减消元法** | 配平系数 → 加减消去一变量 → 化为一元一次方程 |
| **初等行变换** | $(E) \iff \begin{cases} kP_1 + rQ_1 = kP_2 + rQ_2 \\ Q_1 = Q_2 \end{cases}$ |
| **解的讨论** | 消元后得有效一元一次方程 $\to$ 唯一解；引出矛盾（如 $0=5$）$\to$ 无解；得恒等式（如 $0=0$）$\to$ 无穷多解 |

### 四、注意事项

- 去分母时，分子是多项式的要加括号。常数项（没分母的项）容易漏乘分母。
- 等價的方程組有相同的解——所有恒等变换均保證等價性。
- 记号 $(k)$ 与「乘以 $k$」容易混淆，实际书写中建议使用罗马字符或 $(Eq_k)$ 等记号。
- 试根法不是乱猜——通常从因数入手。
- 矩阵是省略了变量和等号的简写形式。

---

## 中英对照词汇表（Glossary）

| 中文 | English |
|------|---------|
| 方程 | Equation |
| 等式 | Equality |
| 变量 / 未知数 | Variable / Unknown |
| 元 | Number of Variables |
| 恒等变换 | Equivalent Transformation |
| 多项式方程 | Polynomial Equation |
| 最简表示 | Simplest Form |
| 次数 | Degree |
| 解 / 根 | Solution / Root |
| 解方程 | Solving Equations |
| 唯一解 | Unique Solution |
| 无穷多解 | Infinitely Many Solutions |
| 无解 | No Solution |
| 一元一次方程 | Linear Equation in One Variable |
| 二元一次方程 | Linear Equation in Two Variables |
| 方程组 | System of Equations |
| 等价方程组 | Equivalent Systems |
| 消元 | Elimination |
| 代入消元法 | Substitution Method |
| 加减消元法 | Elimination Method |
| 回代 | Back-Substitution |
| 初等行变换 | Elementary Row Operation |
| 矩阵 | Matrix |
| 增广矩阵 | Augmented Matrix |
| 行阶梯形 | Row Echelon Form |
| 高斯消元法 | Gaussian Elimination |
| 试根法 | Method of Trial and Error / Inspection |
| 去分母 | Remove Denominators |
| 去括号 | Remove Brackets |
| 移项 | Transposition |
| 合并同类项 | Combine Like Terms |
| 矛盾 | Contradiction |
| 恒真式 | Tautology / Always True |
