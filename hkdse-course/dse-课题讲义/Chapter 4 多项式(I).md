---
tags: DSE课程笔记
---

# 4　多项式(I)（Polynomials (I)）

> 本章处理由未知数的加法、减法与乘法组成的特殊代数式——多项式。我们从最基本的构成单元「单项式」开始，逐步推进至多项式的运算、分类与性质，最后讨论展开的逆运算：因式分解。

前置：[[Chapter 0 基础概念|基础概念]]、[[Chapter 3 整数指数律与进制|整数指数律与进制]]

---

## 4.1　单项式（Monomials）

> **本节难度上限**：T B+ ｜ C C ｜ E C ｜ Q D（2026-09-12 修訂：原 C C- ｜ E D，因本節同類項合併與恆等辨析題按《習題難度標記方案》「數量疊加加半級」口徑重標後仍需 C、E 各留一檔空間；Q D 不變，本節不設跨章聯動題）

### 4.1.1　单项式的定义

> 单项式是多项式的基本构成单元。它由常数与未知数的乘积组成。

````ad-def
title: 定义（单项式） | Definition（Monomial）

考虑自然数 $n \geq 0$：
1. 当 $n > 0$ 时，给定 $n$ 个可重复的未知数 $x_1, x_2, \ldots, x_n$ 与一个常数 $k$，它们的积
  $$kx_1 x_2 \cdots x_n$$
  称为单项式。
2. 当 $n = 0$ 时，所有常数 $k$ 也是单项式，称为常数单项式。
3. 特别地，$0$ 称为零单项式。

> 单项式包含常数单项式，常数单项式包含零单项式。
````

> 我们在课程中约定 “ 未知数 ” 在未指明的条件下就是指**取值为实数的变量**。

例如 $5xy$、$17z^2$ 均为单项式。

````ad-example
title: 示例 | Example


判断下列代数式是否为单项式：$4x^3y$，$x+5y$，$\dfrac{xy}{z}$，$x^4-y^4$。

---

- $4x^3y$：是。由常数 $4$ 与未知数 $x, y$ 的积组成。
- $x+5y$：否。包含「$+$」。
- $\dfrac{xy}{z}$：否。包含不可约的分式。
- $x^4-y^4$：否。包含「$-$」。
````

> 一般来说，若我们要使用一些符号（如 $P$）来指代某个单项式（如 $x^2$），则我们会使用 “ $=$ ” 链接它们（如 $P = x^2$）。
---

### 4.1.2　单项式的系数、次数与变量

> 为方便描述单项式，我们定义四个指标：系数、次数、变量部分与变量。

````ad-def
title: 定义（单项式的系数、次数与变量） | Definition（Coefficient, Degree, and Variables of a Monomial）

对于非常数单项式 $kx_1 x_2 \cdots x_n$（$k$ 为常数，$x_1, \ldots, x_n$ 为 $n$ 个可重复的未知数）：
1. $n$ 为该单项式的**次数**（Degree）。
2. $k$ 为该单项式的**系数**（Coefficient）。
3. $x_1 x_2 \cdots x_n$ 为该单项式的**变量部分**（Variable Part）。
4. 所有不同的未知数为单项式的**变量**（Variables）。

常数单项式 $k$ 没有次数，系数即为 $k$，也没有变量部分与变量。
````

例如单项式 $5x^5 y^3$：系数 $5$，次数 $5+3=8$，变量部分 $x^5 y^3$，变量 $x, y$。

````ad-example
title: 示例（单项式的四个指标） | Example（Four Indices of a Monomial）

写出下列各单项式的系数、次数、变量部分与变量：
1. $-7x^2 y$
2. $3ab^2 c^3$

---

1. $-7x^2 y$：系数 $-7$，次数 $2+1=3$，变量部分 $x^2 y$，变量 $x, y$。
2. $3ab^2 c^3$：系数 $3$，次数 $1+2+3=6$，变量部分 $ab^2 c^3$，变量 $a, b, c$。
````

````ad-def
title: 定义（单项式内变量的次数） | Definition（Degree of Each Variable）

非常数单项式中每一个变量的指数即为该单项式内该变量的次数。
````

一个单项式内每个变量的次数之和等于该单项式的次数。利用系数、变量及每个变量的次数这三个指标可以完全确定任意单项式。

````ad-example
title: 示例 | Example


1. 写出单项式 $12x^2y^3$ 的系数、次数、变量部分与变量。
2. 根据以下描述写出单项式：「系数为 $28$，次数为 $6$，变量为 $x, y, z$，$x, y$ 的次数均为 $2$」。

---

1. 系数：$12$，次数：$2+3=5$，变量部分：$x^2 y^3$，变量：$x, y$。
2. 由 $x, y$ 的次数均为 $2$ 得 $x^2 y^2$ 为该单项式的一部分。次数为 $6$，故 $z$ 的次数为 $6 - 2 - 2 = 2$。结合系数 $28$，所求单项式为 $28x^2 y^2 z^2$。
````

---
### 4.1.3　单项式的相等条件

> 有了四个指标后，我们可以考察两个单项式何时「本质上相同」。单项式同样含有变量，可赋予实数值，因此和多项式一样，我们从取值相等出发。

````ad-def
title: 定义（单项式的相等） | Definition（Equality of Monomials）

设 $P$ 和 $Q$ 为两个单项式。若对变量的**任意**实数值赋值，$P$ 与 $Q$ 的值均相等，则称 $P$ 与 $Q$ **相等**。写为 $P \equiv Q$
````

````ad-example
title: 示例（单项式相等） | Example（Equality of Monomials）

验证 $P = 3xy^2$ 与 $Q = y^2 \cdot x \cdot 3$ 相等。

---

由乘法交换律，对任意实数 $x, y$：
$$x \cdot y^2 \cdot 3 = 3 \cdot x \cdot y^2 = 3xy^2$$
即 $P$ 与 $Q$ 对任意取值均相等，故 $P \equiv Q$。

> 可见交换因子的顺序不改变单项式的值，这正是单项式恒等判别法（下文定理）的直观体现。
````

例如 $P = 2xy$ 与 $Q = y \cdot 2x$：对任意 $x, y$ 的取值，两者结果均相同，故 $P$ 与 $Q$ 相等。

> 逐一验证所有赋值不切实际。单项式的四个指标给出了一个简洁的判别法，我们先看一个引理：

````ad-lem
title: 引理（$2^n = 2^m \implies n = m$） | Lemma（$2^n = 2^m \implies n = m$）

对任意自然数 $n, m$，若 $2^n = 2^m$，则 $n = m$。
````

````ad-proof
title: 证明 | Proof

已知 $2^n = 2^m$。不妨设 $n \geq m$，令 $n = m + b$（$b \geq 0$ 为自然数）。则
$$2^{m+b} = 2^m \;\implies\; 2^m \cdot 2^b = 2^m$$
两端同除以 $2^m$（$2^m \neq 0$），得 $2^b = 1$。
若 $b > 0$，则 $2^b \geq 2^1 = 2 > 1$，矛盾。故 $b = 0$，即 $n = m$。
````

````ad-thm
title: 定理（单项式恒等的等价条件） | Theorem（Equivalent Condition for Monomial Identity）

两单项式 $P, Q$ 对所有变量取值均相等，当且仅当：
1. 系数相同，及
2. 变量部分相同（即变量相同，且每个变量的次数相同）。
````

````ad-proof
title: 证明 | Proof

$(\impliedby)$ 方向显然：系数相同且变量部分相同，则对任意赋值两式自然相等。

$(\implies)$：设 $P = k x_1^{a_1} \cdots x_m^{a_m}$，$Q = t x_1^{b_1} \cdots x_m^{b_m}$（若某变量不出现在 $P$ 或 $Q$ 中，取指数 $0$）。对任意变量取值均有 $P = Q$。
- 取 $x_1 = \cdots = x_m = 1$，得 $k = t$。故系数相同。
- 若 $k = t = 0$，两者均为零单项式，已成立。否则消去 $k$，余下 $x_1^{a_1} \cdots x_m^{a_m} \equiv x_1^{b_1} \cdots x_m^{b_m}$。
- 对每个 $i$，取 $x_i = 2$、其余变量取 $1$，得 $2^{a_i} = 2^{b_i}$。由上述引理知 $a_i = b_i$。即每个变量的次数相同，变量部分相同。
````

> 我们将这种结构上的相同称为**恒等**（Identity），记作 $P \equiv Q$，读作「$P$ 恒等于 $Q$」。
>
> 例如 $5x^2y \equiv 5yx^2$（系数均为 $5$、变量部分均为 $x^2 y$）；而 $5x^2y$ 与 $3x^2y$ 不恒等（$5 \neq 3$），尽管它们拥有相同的变量部分——这正是下一节要讨论的「同类项」概念。

---
### 4.1.4　同类单项式

> 若放宽对系数的要求，仅要求变量部分相同，则得到「同类项」的概念。同类项可以透过加减合并——因为合并的结果仍为单项式（见下述定理），而合并过程本身是一次恒等变形。

````ad-def
title: 定义（同类与异类单项式） | Definition（Like and Unlike Terms）

1. 若两个单项式拥有相同的变量（或都没有变量），且每个变量的次数都完全相同，则两单项式为**同类项**（Like Terms）。
2. 否则为**异类项**（Unlike Terms）。
````

````ad-example
title: 示例（判断同类与异类项） | Example（Like and Unlike Terms）

判断下列各组单项式是同类项还是异类项：
1. $5x^2 y$ 与 $-3x^2 y$
2. $2ab$ 与 $2a^2 b$
3. $7xy$ 与 $4yx$

---

1. 同类项：变量均为 $x, y$，$x$ 的次数均为 $2$，$y$ 的次数均为 $1$。
2. 异类项：变量均为 $a, b$，但 $a$ 的次数分别为 $1$ 和 $2$，不等。
3. 同类项：变量均为 $x, y$（$yx \equiv xy$），次数均为 $2$，仅系数不同。
````

````ad-thm
title: 定理（同类项的加减） | Theorem（Addition and Subtraction of Like Terms）

若 $P, Q$ 为两个同类单项式，则 $P \pm Q$ 仍然为一个单项式。
````

````ad-proof
title: 证明（只证 $P+Q$ 部分，$P-Q$ 留作练习） | Proof（$P+Q$ case; $P-Q$ left as exercise）

常数单项式的情况是显然的。考虑 $n > 0$ 个可重复的变量 $x_1, x_2, \cdots, x_n$。由于 $P, Q$ 是同类单项式，它们拥有相同的变量且每个变量的指数完全相同，即 $P, Q$ 的系数可以不同。设
$$P = k x_1 x_2 \cdots x_n \quad \text{及} \quad Q = t x_1 x_2 \cdots x_n$$
其中 $k, t$ 为常数。根据乘法分配律：
$$P + Q \equiv k x_1 x_2 \cdots x_n + t x_1 x_2 \cdots x_n \equiv (k+t) x_1 x_2 \cdots x_n$$
因 $k+t$ 仍为常数，故 $P+Q$ 为单项式。
````

>该定理表明只有同类项才可以透过加减合并。合并同类项的过程称为单项式的**化简**。此类 “ 恒等变形 ” 我们统一使用 $\equiv$。

````ad-example
title: 示例 | Example


判断下列各组是否同类项：
1. $-7x^2$ 与 $8x$
2. $4xy$ 与 $-4xz$
3. $9xy$ 与 $-41yx$
4. $12xyz$ 与 $-3xyz$

---

1. 异类项：变量均为 $x$，但次数分别为 $2$ 和 $1$，不等。
2. 异类项：变量不同（$x,y$ vs $x,z$）。
3. 同类项：变量均为 $x, y$（$yx \equiv xy$），次数均为 $2$。
4. 同类项：变量均为 $x, y, z$，次数均为 $3$。
````


````ad-example
title: 示例 | Example


计算下列各式：
1. $x^2 - 5x^2$
2. $8xy - 14xy + 5xy$
3. $4z^3 - 5z^3$
4. $5(9xy - 13xy)$

---

1. $x^2 - 5x^2 \equiv (1-5)x^2 \equiv -4x^2$
2. $8xy - 14xy + 5xy \equiv (8-14)xy + 5xy \equiv -6xy + 5xy \equiv -xy$
3. $4z^3 - 5z^3 \equiv (4-5)z^3 \equiv -z^3$
4. $5(9xy - 13xy) \equiv 5((9-13)xy) \equiv 5(-4xy) \equiv -20xy$
````

> 上述化简全程使用恒等号 $\equiv$，而非等号 $=$。原因在于：化简是对**任意**变量取值都成立的变形，例如 $x^2 - 5x^2 \equiv -4x^2$ 不论 $x$ 取何值都成立。等号 $=$ 则用于两种情形：①对**某些特定取值**成立（如方程 $x = 2$ 时 $x^2 = 4$）；②断言两个**数值**相等，即没有变量时（如 $5 = 3 + 2$、$1 - 5 = -4$）。这一区别将在 §4.2.3 多项式恒等中再次出现。


---

## 4.2　多项式（Polynomials）

> **本节难度上限**：T B+ ｜ C C+ ｜ E C ｜ Q C

### 4.2.1　多项式的定义

> 基于单项式，我们可以定义多项式：将若干个单项式以加法连接得到的代数式。

````ad-def
title: 定义（多项式） | Definition（Polynomial）

设 $P_1, P_2, \ldots, P_m$ 为 $m$ 个单项式，它们的和
$$P_1 + P_2 + \cdots + P_m$$
称为一个多项式。特别地，取 $m = 1$（或所有项均为同类项），则 上述多项式变为一个单项式。

> $P_1, \ldots, P_m$ 的差仍为多项式（因 $-P_i$ 仍为单项式）。
````

> 即单项式是多项式的特殊情形。

例如三个单项式 $4x^2$、$2xy$、$5y^2$ 的和 $4x^2 + 2xy + 5y^2$ 是一个多项式。

````ad-example
title: 示例（判断多项式） | Example（Identifying Polynomials）

判断下列代数式是否为多项式：
1. $3x^2 + 2x - 1$
2. $\dfrac{1}{x} + 5$
3. $4xy^2$

---

1. 是。由三个单项式 $3x^2$、$2x$、$-1$ 的和组成。
2. 否。$\dfrac{1}{x}$ 含不可约分式，不是单项式。
3. 是。单项式本身也是多项式（$m = 1$ 的特殊情形）。
````

> 一般来说，若我们要使用一些符号（如 $P$）来指代某个多项式（如 $x+1$），则我们会使用 “ $=$ ” 链接它们（如 $P = x+1$）。

````ad-def
title: 定义（多项式的最简表示） | Definition（Simplest Form）

对多项式 $P = P_1 + \cdots + P_m$，若每个 $P_i$ 两两之间均为异类项，则此表示称为 $P$ 的最简表示。
````

将非最简表示转化为最简表示的过程称为多项式的**化简**。我们可利用加法交换律排列各项，合并同类项完成化简。具体操作将在 §4.2.4「多项式的运算」中讨论。

````ad-example
title: 示例（化简为最简表示） | Example（Simplification to Simplest Form）

将 $2x^2 + 3x + x^2 - 1$ 化为最简表示。

---

合并同类项：
$$2x^2 + 3x + x^2 - 1 \equiv (2x^2 + x^2) + 3x - 1 \equiv 3x^2 + 3x - 1$$
故最简表示为 $3x^2 + 3x - 1$。
````

---

### 4.2.2　多项式的分类

> 类似于单项式，我们可以定义多项式的项、系数、次数与变量。

````ad-def
title: 定义（多项式的项） | Definition（Terms of a Polynomial）

对于多项式 $P$ 的最简表示 $P = P_1 + \cdots + P_m$：
- 每个 $P_i$ 的变量部分称为 $P$ 的一个「项」。
- 项的总数称为**项数**（Number of Terms）。
- $P$ 中的常数单项式称为**常数项**（Constant Term）。
- 若某个变量部分不出现在 $P$ 中，则称其对应的项为 $0$。
````

````ad-example
title: 示例（多项式的项） | Example（Terms of a Polynomial）

指出多项式 $P = 4x^3 - 2x + 7$ 的各项、项数与常数项。

---

- 各项：$x^3$ 项、$x$ 项、常数项。
- 项数：$3$。
- 常数项：$7$。
- $x^2$ 项不出现，记为 $0$。
````

````ad-def
title: 定义（多项式的系数） | Definition（Coefficients of a Polynomial）

对于最简表示 $P = P_1 + \cdots + P_m$：
- 每个 $P_i$ 的系数称为其对应项的**系数**。
- 常数项的系数为其本身。
- 若某项不出现在 $P$ 中，则其对应的系数为 $0$。
````

````ad-example
title: 示例（多项式的系数） | Example（Coefficients of a Polynomial）

写出多项式 $P = 6x^3 - 2x + 5$ 各项的系数。

---

- $x^3$ 项系数：$6$
- $x^2$ 项系数：$0$（该项不出现）
- $x$ 项系数：$-2$
- 常数项系数：$5$
````

````ad-def
title: 定义（多项式的次数） | Definition（Degree of a Polynomial）

对于最简表示 $P = P_1 + \cdots + P_m$：
- $P$ 的**次数**为所有 $P_i$ 中最大者，记为 $\deg P$。
- 若 $P$ 为非零常数单项式，则 $\deg P = 0$。
- 若 $P = 0$（零单项式），则 $\deg P = -1$。
- 若 $\deg P = n$，则称 $P$ 为 $n$ **次多项式**。
````

````ad-example
title: 示例（多项式的次数） | Example（Degree of a Polynomial）

求下列各多项式（或单项式）的次数：
1. $P = 3x^4 - 2x^2 + 1$
2. $Q = 7$
3. $R = 0$

---

1. $\deg P = 4$（各项次数 $4, 2, 0$ 中取最大）。
2. $\deg Q = 0$（$Q$ 为非零常数单项式）。
3. $\deg R = -1$（$R$ 为零单项式）。
````

````ad-def
title: 定义（多项式的变量） | Definition（Variables of a Polynomial）

对于最简表示 $P = P_1 + \cdots + P_m$：
- $P$ 中出现的所有变量称为该多项式的**变量**。
- 变量的总数称为多项式的「元」。拥有 $n$ 个变量的多项式称为 $n$ **元多项式**。
````

````ad-example
title: 示例（多项式的变量与元数） | Example（Variables and Number of Variables）

指出下列各多项式的变量与元数：
1. $P = 2x^2 - 3x + 1$
2. $Q = xy + y^2$
3. $R = a^2b + abc - c$

---

1. 变量：$x$。元数：$1$（一元多项式）。
2. 变量：$x, y$。元数：$2$（二元多项式）。
3. 变量：$a, b, c$。元数：$3$（三元多项式）。
````

````ad-example
title: 示例 | Example


多项式 $P = 5x^2yt - 9xyz + 21x - 4y - 13$ 的：
- 变量：$x, y, t, z$
- 项数：$5$（$x^2yt$、$xyz$、$x$、$y$、常数项）
- 各系数：$x^2yt$ 项为 $5$，$xyz$ 项为 $-9$，$x$ 项为 $21$，$y$ 项为 $-4$，常数项为 $-13$（切记不要遗漏常数项）
- 次数：$\deg P = 4$（$5x^2yt$ 的次数为 $2+1+1=4$）
````

---

### 4.2.3　多项式的相等条件

> 多项式中的变量可以取任意实数值。给每个变量赋予具体数值后，多项式便确定一个数值。两个多项式何时算「本质上相同」？这引出了多项式相等的概念。

#### 多项式相等与恒等

````ad-def
title: 定义（多项式的相等） | Definition（Equality of Polynomials）

设 $P$ 和 $Q$ 为两个多项式。若对变量的**任意**实数值赋值，$P$ 与 $Q$ 的值均相等，则称 $P$ 与 $Q$ **相等**，记作 $P \equiv Q$。
````

例如，$P(x) = 2(x+1)$ 与 $Q(x) = 2x + 2$：对任意实数 $x$ ，由乘法的分配律均有 $$2(x+1) \equiv 2x + 2$$

故 $P \equiv Q$。

> 然而，验证「对所有取值都相等」在实践中不可行——变量有无限多种赋值。幸运的是，多项式的结构（次数、系数）给出了一个等价且更易操作的判别法：

````ad-thm
title: 定理（多项式恒等的等价条件） | Theorem（Equivalent Condition for Polynomial Identity）

对两多项式 $P, Q$ ，$P \equiv Q$ 当且仅当：
1. $\deg P = \deg Q$，及
2. $P, Q$ 的各项系数相等。
````

````ad-proof
title: 证明 | Proof

$(\implies)$ 方向是显然的。

$(\impliedby)$：设 $P = P_n + \cdots + P_1$，$Q = Q_m + \cdots + Q_1$ 为两多项式的最简表示，用反证法：
1. 若 $\deg P \neq \deg Q$，不妨设 $\deg P > \deg Q$，则至少存在 $P$ 中一个单项式次数大于 $Q$ 所有项，导致 $P - Q \neq 0$，即 $P \neq Q$。
2. 若 $P, Q$ 有系数不相等的两项，则这两项之差不为零，且其他项不可能与此项合并（最简表示），故 $P - Q \neq 0$，即 $P \neq Q$。
````

> 定理表明：多项式上的相等，等价于它们**结构上**的相同。为明确区分这两种视角，我们引入**恒等号** $\equiv$：
>
> - 等号 $=$：申明两个表达式在**一些数值上**相等（可能仅限于某些特定取值，例如 $x = 2$ 时 $x^2 = 4$），或断言两个**数值**相等（无变量时，如 $5 = 3 + 2$）。
> - 恒等号 $\equiv$：申明两个多项式在**结构上**完全相同，对**任意**取值均成立，读作「恒等于」。
>
> 此处的辨析与 §4.1.4 一致：化简等恒等变形用 $\equiv$，数值断言与特定取值的等式用 $=$。凡涉及多项式结构恒等变形一律使用 $\equiv$，切勿与方程中仅在特定解成立的等号 $=$ 混淆。

````ad-example
title: 示例（展开作为恒等变形） | Example（Expansion as Identity Transformation）


求多项式 $P = (4s^2 - 5t^2)(s + t)$ 的变量、项数、各系数与次数。

---

先通过恒等变形化为最简形式：
$$\begin{aligned} (4s^2 - 5t^2)(s + t) &\equiv (4s^2 - 5t^2) \cdot s + (4s^2 - 5t^2) \cdot t \\ &\equiv 4s^3 - 5st^2 + 4s^2t - 5t^3 \end{aligned}$$
- 变量：$s, t$
- 项数：$4$
- 系数：$s^3$ 项为 $4$，$st^2$ 项为 $-5$，$s^2t$ 项为 $4$，$t^3$ 项为 $-5$（无常数项）
- 次数：$\deg P = 3$
````

除此之外，上文的定理引导出了**比较系数法**（Method of Comparing Coefficients），在已知多项式恒等但部分系数未知时求解。

````ad-example
title: 示例 | Example


已知 $2x^6 - x^5 - 10x^3 + 5x^2 \equiv (Ax^3 - 5)(Bx^3 - x^2)$，求 $A, B$。

---
展开右侧：
$$\begin{aligned} (Ax^3 - 5)(Bx^3 - x^2) &\equiv (Ax^3)(Bx^3) - (Ax^3)(x^2) - 5(Bx^3) + 5(x^2) \\ &\equiv ABx^6 - Ax^5 - 5Bx^3 + 5x^2 \end{aligned}$$
比较各项系数得：
$$AB = 6, \quad -A = -1, \quad -5B = -10$$
解得 $A = 1$，$B = 2$。
````

````ad-example
title: 示例 | Example


已知 $3x^3 + x^2 + 12x + 4 \equiv (Ax + 1)(x^2 + B)$，求 $A, B$。

---
展开右侧：
$$\begin{aligned} (Ax + 1)(x^2 + B) &\equiv Ax^3 + ABx + x^2 + B \\ &\equiv Ax^3 + x^2 + ABx + B \end{aligned}$$
比较系数得 $A = 3$，$B = 4$，$AB = 12$。

检验 $3 \times 4 = 12$ 成立。故 $A = 3$，$B = 4$。
````

````ad-example
title: 示例 | Example


已知 $x^3 + 2x^2 - 5x - 6 \equiv (x + A)(x^2 + x + B)$，求 $A, B$。

---
展开右侧：
$$\begin{aligned} (x + A)(x^2 + x + B) &\equiv x(x^2 + x + B) + A(x^2 + x + B) \\ &\equiv x^3 + x^2 + Bx + Ax^2 + Ax + AB \\ &\equiv x^3 + (1+A)x^2 + (A+B)x + AB \end{aligned}$$
比较系数得 $1+A = 2$，$A+B = -5$，$AB = -6$。

由第一式得 $A = 1$，代入第二式得 $B = -6$，检验 $1 \times (-6) = -6$ 成立。

故 $A = 1$，$B = -6$。
````

#### 乘法性质 —— 乘积的次数

> 多项式相乘后，结果的次数如何变化？这关系到展开后化简、判断最高次项等实际问题。我们先从单项式乘积入手，再推广到多项式。

````ad-lem
title: 引理（非零单项式乘积的次数） | Lemma（Degree of Product of Non-Zero Monomials）

设 $P, Q$ 为两非零单项式，$\deg P = p$，$\deg Q = q$，则
$$\deg(P \cdot Q) = \deg P + \deg Q = p + q$$
````

````ad-proof
title: 证明 | Proof

设 $P = k x_1 \cdots x_p$，$Q = t y_1 \cdots y_q$（$k, t$ 为非零常数），则
$$PQ = kt \, x_1 \cdots x_p \, y_1 \cdots y_q$$
共有 $p+q$ 个变量，故 $\deg(PQ) = p + q$。
````

````ad-example
title: 示例（单项式乘积的次数） | Example（Degree of Product of Monomials）

求单项式 $P = 3x^2 y$ 与 $Q = -2x y^3 z$ 之积的次数。

---

$\deg P = 2 + 1 = 3$，$\deg Q = 1 + 3 + 1 = 5$。由引理：
$$\deg(PQ) = \deg P + \deg Q = 3 + 5 = 8$$
验证：$PQ = -6x^3 y^4 z$，次数 $3 + 4 + 1 = 8$，吻合。
````

````ad-thm
title: 定理（多项式乘积的次数） | Theorem（Degree of Product of Polynomials）

设 $P, Q$ 为两非零多项式，$\deg P = p$，$\deg Q = q$，则
$$\deg(P \cdot Q) = \deg P + \deg Q = p + q$$
````

````ad-proof
title: 证明 | Proof

设 $P, Q$ 的最简表示分别为 $P = P_1 + \cdots + P_n$ 及 $Q = Q_1 + \cdots + Q_m$。利用分配律，$PQ$ 展开后每项为 $P_i Q_j$。由引理，
$$\deg(P_i Q_j) = \deg P_i + \deg Q_j \leq p + q$$
且至少存在一对 $P_i, Q_j$ 使得次数达到 $p+q$。即 $\deg(PQ) = p + q$。
````

````ad-example
title: 示例 | Example


1. 求 $xz^2 - zy$ 与 $x^3 - 5y^3$ 之积的次数。
2. 求 $P = x^2 + x^3 + y^5$ 与 $Q = (x - 8y)(x^3 - 7y)$ 之积的次数。

---

1. 两多项式均为 $3$ 次，故积为 $3 + 3 = 6$ 次。

2. $P$ 为 $5$ 次；$Q$ 是两个 $1$ 次多项式之积，故为 $2$ 次。因此 $PQ$ 为 $5 + 2 = 7$ 次。
````

---

### 4.2.4　多项式的运算

> 多项式的加减运算遵循「去括号后合并同类项」的原则。
> 
> 对任意两个多项式，它们的和与差均为多项式。以下所有恒等变形均使用 $\equiv$，因为每一个等号对变量的任意取值均成立。

**加减运算要点：**
- 括号前为「$+$」：去括号后各项符号不变。
- 括号前为「$-$」：去括号后各项均需变号（$-(a+b) = -a-b$）。

````ad-example
title: 示例 | Example


化简下列各式：
1. $7x^2 - 8 + 5x^2 + 10$
2. $(5xy - 6y) - (4x - 5xy)$
3. $(4x^2 + 4xy - 3) + (2xy + 5x^2)$

---

1. $\begin{aligned} 7x^2 - 8 + 5x^2 + 10 &\equiv 7x^2 + 5x^2 - 8 + 10 \equiv 12x^2 + 2 \end{aligned}$

2. $\begin{aligned} (5xy - 6y) - (4x - 5xy) &\equiv 5xy - 6y - 4x + 5xy \\ &\equiv 10xy - 6y - 4x \end{aligned}$

3. $\begin{aligned} (4x^2 + 4xy - 3) + (2xy + 5x^2) &\equiv 4x^2 + 5x^2 + 4xy + 2xy - 3 \\ &\equiv 9x^2 + 6xy - 3 \end{aligned}$
````

**乘法运算：** 利用乘法对加减法的分配律 $a(b \pm c) = ab \pm ac$ 及交换律 $ab = ba$。将处理多项式乘法剔除括弧的过程称为**展开**（Expansion）。两个多项式的乘积仍为多项式。

````ad-example
title: 示例 | Example


展开下列各式：
1. $x(x-1)$
2. $5xy(x^2 - 1)$
3. $(xz - 1)(5 - 2xz)$
4. $(x-1)(x^2 + x + 1)$

---

1. $x(x-1) \equiv x \cdot x - x \cdot 1 \equiv x^2 - x$

2. $5xy(x^2 - 1) \equiv 5xy \cdot x^2 - 5xy \cdot 1 \equiv 5x^3y - 5xy$

3. $\begin{aligned} (xz - 1)(5 - 2xz) &\equiv (xz - 1) \cdot 5 - (xz - 1) \cdot (2xz) \\ &\equiv 5xz - 5 - 2x^2z^2 + 2xz \\ &\equiv -2x^2z^2 + 7xz - 5 \end{aligned}$

4. $\begin{aligned} (x-1)(x^2 + x + 1) &\equiv x(x^2 + x + 1) - 1(x^2 + x + 1) \\ &\equiv x^3 + x^2 + x - x^2 - x - 1 \\ &\equiv x^3 - 1 \end{aligned}$
````

> 多项式的化简包含了多项式的展开——展开是化简的一部分。若未指明其他情况，最终结果必须为化简后的最简形式（多项式的最简形式）。

---

## 4.3　因式分解（Factorization）

> **本节难度上限**：T B- ｜ C B- ｜ E C ｜ Q C

### 4.3.1　因式分解的概念
> 展开是将多个多项式的乘积化为单个多项式。反过来的过程，即将单个多项式分解为多个多项式的乘积，称为因式分解。两者互为逆运算：
> $$\text{多项式} \xrightleftharpoons[\text{展开 (Expansion)}]{\text{因式分解 (Factorization)}} \text{多项式之积}$$

````ad-def
title: 定义（因式分解） | Definition（Factorization）

若多项式 $P$ 可写成多个多项式 $P_1, P_2, \ldots, P_n$ 的积：
$$P \equiv P_1 P_2 \cdots P_n$$
则称 $P_1, P_2, \ldots, P_n$ 为 $P$ 的**因式**（Factor），此等式称为 $P$ 的因式分解。

> 因式分解不唯一。若分解出的因式还可继续分解，则应继续分解直至无法分解为止。
````

````ad-example
title: 示例（因式分解） | Example（Factorization）

将下列多项式因式分解：
1. $x^2 - 1$
2. $2x^2 + 4x$

---

1. $x^2 - 1 \equiv (x-1)(x+1)$
2. $2x^2 + 4x \equiv 2x(x + 2)$

> 第 1 题的 $(x-1)$ 与 $(x+1)$ 均无法再分解；第 2 题的 $2x$ 与 $(x+2)$ 亦然，故已分解到底。
````

---

### 4.3.2　方法一：提公因式法（Taking out Common Factors）

> 该方法源自乘法对加法的分配律 $a(b+c) = ab + ac$。从右向左看：$ab + ac = a(b+c)$，即「抽出」公共因子。

````ad-def
title: 定义（公因式与最大公因式） | Definition（Common Factor and GCF）

设 $P = AB$，$Q = AC$（$A, B, C$ 为多项式）：
1. $A$ 称为 $P$ 与 $Q$ 的**公因式**（Common Factor）。
2. 若 $B, C$ 的公因式只有 $\pm 1$，则 $A$ 称为 $P, Q$ 的**最大公因式**（Greatest Common Factor, GCF）。
````

**提公因式的步骤：**
1. 定系数：取各项系数的最大公因数。
2. 定变量：取各项共有的变量，指数取最低者。
3. 利用 $ma + mb = m(a+b)$ 抽出公因式。

> 特别注意：若某项本身即为公因式，则抽因子后该项剩余 $1$（因 $1 \times a = a$）。

````ad-example
title: 示例 | Example


找出 $x^2y^3$ 与 $4xy^4$ 的最大公因式。

---

将两式写开：
$$x^2y^3 \equiv x \cdot x \cdot y \cdot y \cdot y$$
$$4xy^4 \equiv 4 \cdot x \cdot y \cdot y \cdot y \cdot y$$
两者共同出现了一个 $x$ 和三个 $y$，故 $xy^3$ 为公因式。由于剩余的 $x$ 与 $4y$ 无其他公因子，$xy^3$ 即为最大公因式。
````

````ad-example
title: 示例 | Example


找出 $6x^2$ 与 $18x^4$ 的最大公因式。

---

1. 系数方面：$6$ 与 $18$ 的最大公因数为 $6$。
2. 变量方面：$x^2$ 与 $x^4$ 公共部分为 $x^2$（取指数最小者）。

故最大公因式为 $6x^2$。
````

````ad-example
title: 示例 | Example


找出 $(x-1)(x+1)$ 与 $(x-2)^2(x+1)^3$ 的最大公因式。

---

将两式写开：
$$(x-1)(x+1) \equiv (x-1) \cdot (x+1)$$
$$(x-2)^2(x+1)^3 \equiv (x-2)^2 \cdot (x+1) \cdot (x+1)^2$$
共同出现了一个 $(x+1)$，且剩余的 $(x-1)$ 与 $(x-2)^2(x+1)^2$ 无其他公因子，故最大公因式为 $(x+1)$。
````

````ad-example
title: 示例 | Example


找出下列各组多项式的最大公因式：
1. $6x$ 与 $9$：$$6x \equiv 3 \cdot 2x$$
$$9 = 3 \cdot 3$$

公因式为 $3$。

2. $8x^2$ 与 $x^5$：
$$8x^2 \equiv 8 \cdot x^2$$
$$x^5 \equiv x^3 \cdot x^2$$
公因式为 $x^2$。

3. $x^2y^2$ 与 $x^3y$：
$$x^2y^2 \equiv (x^2y) \cdot y$$
$$x^3y \equiv (x^2y) \cdot x$$
公因式为 $x^2y$。

4. $(3x-1)^2 y$ 与 $(3x-1)y^4$：公因式为 $(3x-1)y$。
````

> 上例中 $9 = 3 \cdot 3$ 是纯数值断言（无变量），用等号 $=$；而 $6x \equiv 3 \cdot 2x$ 是含变量的恒等变形，用恒等号 $\equiv$。



````ad-example
title: 示例 | Example


因式分解 $x^2y + x^3$：

---

$x^2y$ 与 $x^3$ 有公因式 $x^2$：
$$\begin{aligned} x^2y + x^3 &\equiv x^2 \cdot y + x^2 \cdot x\\ &\equiv x^2(y + x) \end{aligned}$$
````

````ad-example
title: 示例 | Example


因式分解 $6x^2 - 3xy$：

---

$6x^2$ 与 $-3xy$ 有公因式 $3x$：
$$\begin{aligned} 6x^2 - 3xy &\equiv 3x(2x - y) \end{aligned}$$
````

````ad-example
title: 示例 | Example


因式分解 $2x^2 + x$：

---

$2x^2$ 与 $x$ 有公因式 $x$。由于 $x = x \cdot 1$，抽因子后该项剩余 $1$：
$$\begin{aligned} 2x^2 + x &\equiv x(2x + 1) \end{aligned}$$
````

````ad-example
title: 示例 | Example


因式分解 $x^2y - x^2$：

---

$x^2y$ 与 $-x^2$ 有公因式 $x^2$：
$$\begin{aligned} x^2y - x^2 &\equiv x^2 \cdot y - x^2 \cdot 1 \\
&\equiv x^2(y - 1) \end{aligned}$$
````

````ad-example
title: 示例 | Example


因式分解下列各式：
1. $6x - xy$：
$$6x - xy \equiv x(6 - y)$$

2. $2x - 2y$：
$$2x - 2y \equiv 2(x - y)$$

3. $2x^3 - 5x^2$：
$$2x^3 - 5x^2 \equiv x^2(2x - 5)$$

4. $6x^2 - 3x$：
$$6x^2 - 3x \equiv 3x(2x - 1)$$
````

---

### 4.3.3　方法二：分组分解法（Grouping Method）

> 当多项式项数较多（如四项）且无整体公因式时，可先分组分别因式分解，再合并提取共同的因式。

````ad-example
title: 示例 | Example


因式分解 $xy + 3y + x + 3$：

---

将前两项与后两项分组：
$$\begin{aligned} xy + 3y + x + 3 &\equiv (xy + 3y) + (x + 3) \\ &\equiv y(x + 3) + (x + 3) \\ &\equiv y(x + 3) + 1 \cdot (x + 3) \\ &\equiv (x + 3)(y + 1) \end{aligned}$$
````

````ad-example
title: 示例 | Example


因式分解 $2ax - 4bx - a + 2b$：

---

分组：$(2ax - 4bx) + (-a + 2b)$
- 第一组提取 $2x$：$2x(a - 2b)$
- 第二组配合第一组，提取 $-1$：$-a + 2b = -(a - 2b)$

$$\begin{aligned} 2ax - 4bx - a + 2b &\equiv 2x(a - 2b) - 1 \cdot (a - 2b) \\ &\equiv (a - 2b)(2x - 1) \end{aligned}$$
````

---

### 4.3.4　方法三：十字相乘法（Cross-Multiplication Method）

> 十字相乘法适用于二次多项式 $P = Ax^2 + Bxy + Cy^2$。其原理是假设 $P \equiv (ax + by)(cx + dy)$，展开后比较系数：
> $$\begin{aligned} (ax + by)(cx + dy) &\equiv (ac)x^2 + (ad + bc)xy + (bd)y^2 \end{aligned}$$
> 因此需要找到 $A = ac$，$C = bd$，使得 $ad + bc = B$。
>
> 我们将 $A$ 叫**首项系数**，$C$ 叫**尾项系数**，$B$ 叫**中间项系数**。

````ad-thm
title: 定理（十字相乘法的算法） | Theorem（Algorithm of Cross-Multiplication）

对于 $P = Ax^2 + Bxy + Cy^2$，按以下步骤执行：
1. **竖向拆分：** 将 $A$ 分解为 $a \times c$（通常 $a, c$ 为正），将 $C$ 分解为 $b \times d$（注意符号，$C$ 为负时 $b, d$ 异号）。
2. **交叉相乘：** 计算 $(ad)xy$ 与 $(bc)xy$。
3. **相加检验：** 若 $ad + bc = B$，则成功；否则调整拆分或符号重试。
4. **横向写解：** $P \equiv (ax + by)(cx + dy)$。

> 十字相乘法不止可用于二元二次多项式。其核心是选择 $A, C$ 的因子，并使其交叉相乘后的和等于中间项系数。
````

````ad-example
title: 示例 | Example


因式分解 $P = 3x^2 + 10xy + 3y^2$。

---

首尾系数均为 $3$。
1. 拆分 $A = 3$：$1 \times 3$（即 $a=1, c=3$）；
2. 拆分 $C = 3$：$3 \times 1$（即 $b=3, d=1$）：
- 左上 $x$ $\times$ 右下 $y$ $= xy$
- 左下 $3x$ $\times$ 右上 $3y$ $= 9xy$
- 和 $= xy + 9xy = 10xy$，等于中间项。

横向得出：$P \equiv (x + 3y)(3x + y)$。
````

````ad-example
title: 示例 | Example


因式分解 $P = 2x^2 - xy - 3y^2$。

---

1. 拆分 $A = 2$：$2 \times 1$（$a=2, c=1$）。
2. 拆分 $C = -3$：尝试 $(-3) \times 1$（$b=-3, d=1$）：
- 左上 $2x$ $\times$ 右下 $y$ $= 2xy$
- 左下 $x$ $\times$ 右上 $(-3y)$ $= -3xy$
- 和 $= 2xy - 3xy = -xy$，等于中间项。

横向得出：$P \equiv (2x - 3y)(x + y)$。
````

---

## 4.4　章末总结

### 一、单项式

| 内容      | 关键结论                                    |
| ------- | --------------------------------------- |
| **定义**  | 由常数与未知数的积组成。常数单项式（含零单项式）是特殊情形。          |
| **指标**  | 系数、次数（各变量次数之和）、变量部分、变量——四个指标可完全确定任意单项式。 |
| **同类项** | 变量相同且每个变量的次数相同方可合并。只有同类项可透过加减合并为新单项式。   |

### 二、多项式

| 内容       | 关键结论                                                    |
| -------- | ------------------------------------------------------- |
| **定义**   | 单项式的和。单项式是多项式的特殊情形。最简表示：各项均为异类项。                        |
| **运算**   | 加减：去括号后合并同类项。乘法：分配律展开后化简。展开是化简的一部分。                     |
| **分类指标** | 项（term）、项数、系数、次数（$\deg P$）、变量、元数。                       |
| **相等条件** | 次数相同且各项系数相等 → 比较系数法。多项式恒等（$\equiv$）表示结构相同，区别于数值等号（$=$）。 |
| **积的次数** | $\deg(PQ) = \deg P + \deg Q$（$P, Q$ 均非零）。               |

### 三、因式分解

| 方法 | 原理 | 适用场景 |
|------|------|----------|
| **提公因式法** | $ab + ac = a(b+c)$ | 各项有公因式 |
| **分组分解法** | 分组后分别提取再合并 | 项数 ≥ 4，无整体公因式 |
| **十字相乘法** | $Ax^2 + Bxy + Cy^2 \to (ax+by)(cx+dy)$，需 $ac=A$，$bd=C$，$ad+bc=B$ | 二元二次多项式 |

### 四、注意事项

- 常数单项式没有次数和变量，零单项式的次数为 $-1$。
- 抽公因式时，若某项本身即为公因式，抽后该项剩余 $1$。
- 十字相乘法要注意符号：$C$ 为负时 $b, d$ 异号。
- 因式分解结果应继续分解直至无法分解为止。
- 恒等号 $\equiv$ 表示多项式结构上的相同（对任意取值均成立），区别于可能仅在某些取值成立等号 $=$。凡展开、化简、因式分解等恒等变形，一律使用 $\equiv$。

---

## 中英对照词汇表（Glossary）

| 中文 | English |
|------|---------|
| 单项式 | Monomial |
| 多项式 | Polynomial |
| 系数 | Coefficient |
| 次数 | Degree |
| 变量 | Variable |
| 变量部分 | Variable Part |
| 同类项 | Like Terms |
| 异类项 | Unlike Terms |
| 常数项 | Constant Term |
| 项数 | Number of Terms |
| $n$ 次多项式 | $n$th Degree Polynomial |
| $n$ 元多项式 | Polynomial in $n$ Variables |
| 最简表示 | Simplest Form |
| 化简 | Simplification |
| 恒等 | Identity |
| 恒等号 | Identity Sign |
| 展开 | Expansion |
| 因式分解 | Factorization |
| 因式 | Factor |
| 公因式 | Common Factor |
| 最大公因式 | Greatest Common Factor (GCF) |
| 提公因式法 | Taking out Common Factors |
| 分组分解法 | Grouping Method |
| 十字相乘法 | Cross-Multiplication Method |
| 比较系数法 | Method of Comparing Coefficients |
| 首项系数 | Leading Coefficient |
| 尾项系数 | Constant Term Coefficient |
| 中间项系数 | Middle Term Coefficient |
