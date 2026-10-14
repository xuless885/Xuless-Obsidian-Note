---
tags: DSE课程笔记
---

# 23　多项式 (II)（Polynomials II）

> 第四章定义了多项式（即单项式的和），并学习了提公因式、分组分解、十字相乘等因式分解方法。但那些方法依赖「观察」与「技巧」，缺乏系统化的理论支撑。
>
> 本章将视野收窄到**单变量多项式** $P(z)$（或 $P(x)$），引入三大核心工具：**除法算法**（§23.2）、**余式定理**（§23.3）、**因式定理**（§23.4）。这三者协同，构成了系统化分解多项式的核心机制，不再依赖灵感，而是有一套确定的算法流程。
>
> 回顾第十七章，复数系 $\mathbb{C}$ 是 $\mathbb{R}$ 的扩张。本章将先在实数域 $\mathbb{R}$ 上讨论根与因式的关系，再借助**代数基本定理**提升至复数域 $\mathbb{C}$，得出多项式的完全因式分解，最后回到 $\mathbb{R}$，明确实系数多项式的不可约因式分类。
>
> 本章按概念依赖顺序铺排：先建立单变量多项式的记法与基本概念（§23.1），引入除法算法与长除法（§23.2），推导余式定理（§23.3），建立因式定理并深入讨论根与因式的结构（§23.4），最后将因式分解应用于求最大公因式与最小公倍式（§23.5），并作全章总结（§23.6）。

前置：[[Chapter 1 数系(I)|数系(I)]]、[[Chapter 4 多项式(I)|多项式(I)]]、[[Chapter 6 代数式|代数式]]、[[Chapter 17 数系(II)|数系(II)]]、[[Chapter 19 函数及其图像|函数及其图像]]

---

## 23.1　单变量多项式的记法与基本概念

> **本节难度上限**：T C+ ｜ C D+ ｜ E D ｜ Q C

> 本节回顾第四章的多项式定义，将其限定到单变量情形，建立记法约定与基本概念（首项、首一多项式、相等条件）。



### 23.1.1　单变量多项式的记法

第四章定义了多项式：由单项式的和构成的代数表达式。当多项式仅含一个变量时，即为**单变量多项式**。回顾第十九章，函数是集合间的对应 $f: A \to B$。一个单变量多项式正是这样一类函数：

````ad-def
title: 定义（多项式函数） | Definition（Polynomial Function）

**（一）单变量多项式。** 一个**单变量多项式 (univariate polynomial)** 是形如

$$P: \mathbb{C} \to \mathbb{C}, \qquad P(z) = a_n z^n + a_{n-1} z^{n-1} + \cdots + a_1 z + a_0$$

的函数，其中 $a_0, a_1, \dots, a_n \in \mathbb{C}$ 且 $n \in \mathbb{N}_0$。$a_i$ 称为 $z^i$ 项的**系数 (coefficient)**。全体单变量多项式构成的集合记为 $\mathbb{C}[z]$。

---

**（二）单变量实多项式。** 若限定系数 $a_i \in \mathbb{R}$，则

$$P: \mathbb{R} \to \mathbb{R}, \qquad P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$$

称为**单变量实多项式 (univariate real polynomial)**。全体单变量实多项式构成的集合记为 $\mathbb{R}[x]$。

> **注意：** 单变量实多项式是一个**实函数**，只接受实数输入，输出实数。后面 §23.4.2 讨论共轭根定理时，「实系数多项式」指系数为实数的多项式（见下方术语），它作为复多项式的特例可以接受复数输入，与此处的「单变量实多项式」不同。

---

**（三）术语。** 上述两类多项式共享以下术语：

- 若 $a_n \neq 0$，则 $a_n z^n$（或 $a_n x^n$）称为**首项 (leading term)**，$a_n$ 为**首项系数 (leading coefficient)**。
- $a_0$ 为**常数项 (constant term)**。
- 当所有 $a_i = 0$ 时，$P(z) = 0$ 称为**零多项式 (zero polynomial)**。
- 非零多项式的**次数 (degree)** 为变量的最高幂次，记为 $\deg P$；零多项式定义 $\deg 0 = -1$。
- **实系数多项式 (real-coefficient polynomial)**：系数 $a_i \in \mathbb{R}$ 的单变量多项式。作为 $\mathbb{C}[z]$ 的子集，
  > 实系数多项式可以接受复数输入（$P(z)$，$z \in \mathbb{C}$），只是系数为实数。这与（二）中的「单变量实多项式」（$\mathbb{R} \to \mathbb{R}$ 的实函数）不同，后者不能接受复数输入。
````

````ad-note
title: 注记（将多项式视为函数） | Remark（Polynomials as Functions）

多项式不只是一串系数的排列，它定义了一个从 $\mathbb{C}$（或 $\mathbb{R}$）到自身的映射。这使得「代入求值」$P(a)$ 成为函数求值的自然结果（而非代数式的形式替换）。
````

````ad-note
title: 注记（变量记号约定） | Remark（Notation Convention for the Variable）

本章以 $z$ 为通用变量，因所述定理对 $\mathbb{C}$ 和 $\mathbb{R}$ 均成立。当上下文明确限定变量与系数均在 $\mathbb{R}$ 上时，约定将 $z$ 写回 $x$，即 $P(x) \in \mathbb{R}[x]$，以示此时仅在实数域中考虑。
````



在因式分解的讨论中，常将因式归一化为首项系数为 $1$ 的形式，以便比较。

````ad-def
title: 定义（首一多项式） | Definition（Monic Polynomial）

若非零单变量多项式 $P(z)$ 的首项系数为 $1$，即

$$P(z) = z^n + a_{n-1} z^{n-1} + \cdots + a_1 z + a_0$$

则称 $P(z)$ 为**首一多项式 (monic polynomial)**。
````

任意非零单变量多项式 $P(z) = a_n z^n + \cdots + a_0$（$a_n \neq 0$）可通过提取首项系数化为首一形式：

$$P(z) \equiv a_n \left( z^n + \frac{a_{n-1}}{a_n} z^{n-1} + \cdots + \frac{a_0}{a_n} \right)$$

这类似于整数质因数分解中取正质数的约定：归一化使比较与运算有统一基准。

````ad-example
title: 示例（辨认单变量多项式） | Example（Identifying Univariate Polynomials）

判断以下各表达式是否为单变量多项式；若是，指出其次数、首项系数与常数项。

1. $P(z) = 3z^4 - 2z^2 + 7$；
2. $Q(z) = z^{-1} + 2$；
3. $R(z) = 5$。

---

**1.** $P(z) = 3z^4 - 2z^2 + 7$ 是单变量多项式，$P \in \mathbb{R}[z]$。次数 $\deg P = 4$，首项系数为 $3$，常数项为 $7$。

**2.** $Q(z) = z^{-1} + 2$ 不是单变量多项式，因 $z^{-1}$ 的指数为负整数，不满足定义中 $n \in \mathbb{N}_0$ 的要求。

**3.** $R(z) = 5$ 是单变量多项式（零次多项式，即常数函数），$\deg R = 0$，首项系数 $=$ 常数项 $= 5$。
````

````ad-example
title: 示例（化为首一形式） | Example（Reducing to Monic Form）

将 $P(z) = 4z^3 - 8z^2 + 12z - 16$ 化为首一形式。

---

提取首项系数 $4$：

$$P(z) \equiv 4(z^3 - 2z^2 + 3z - 4)$$

括号内 $z^3 - 2z^2 + 3z - 4$ 即为首一多项式。
````

### 23.1.2　单变量多项式的相等



回顾第四章，多项式的**最简表示**是指将同类项合并后、按降幂排列的形式。以下讨论多项式相等时，均默认已化为最简表示。


````ad-thm
title: 定理（单变量多项式相等的等价条件） | Theorem（Equivalent Condition for Equality of Univariate Polynomials）

设 $P(z) = a_n z^n + a_{n-1} z^{n-1} + \cdots + a_1 z + a_0$，$Q(z) = b_m z^m + b_{m-1} z^{m-1} + \cdots + b_1 z + b_0$ 均为最简表示。则 $P \equiv Q$ 当且仅当：

1. $n = m$（次数相同），及
2. $a_i = b_i$ 对所有 $i$ 成立（各项系数相等）。
````

````ad-example
title: 示例（利用多项式相等求未知系数） | Example（Finding Unknown Coefficients via Polynomial Equality）

已知 $P(z) = az^2 + bz + c$ 与 $Q(z) = 2z^2 - z + 5$ 相等，求 $a, b, c$。

---

由多项式相等的等价条件，次数相同且各项系数相等。$P$ 与 $Q$ 均为二次，比较各次系数：

$$\begin{cases} a = 2 \quad &\text{（$z^2$ 项系数）} \\ b = -1 \quad &\text{（$z$ 项系数）} \\ c = 5 \quad &\text{（常数项）} \end{cases}$$

故 $a = 2$，$b = -1$，$c = 5$。
````

> 此为第四章多项式相等的等价条件在单变量情形下的特例。

---

## 23.2　单变量多项式的除法

> **本节难度上限**：T B+ ｜ C B ｜ E C ｜ Q C

> 本节建立多项式的除法算法，即本章的核心结构定理。它保证了商式与余式的存在性与唯一性，是余式定理与因式定理的理论根基。

### 23.2.1　除法算法

类似整数的带余除法（被除数 $=$ 除数 $\times$ 商 $+$ 余数，且余数 $<$ 除数），单变量多项式也存在唯一的除法算法。

````ad-thm
title: 定理（多项式除法算法） | Theorem（Division Algorithm for Polynomials）

设 $P(z), D(z)$ 为两个单变量多项式，$D(z) \neq 0$。则存在唯一的单变量多项式 $Q(z)$ 和 $R(z)$，使得

$$P(z) \equiv D(z) \cdot Q(z) + R(z)$$

其中 $0 \leq \deg R < \deg D$。

- $P(z)$ 称为**被除式 (dividend)**，$D(z)$ 为**除式 (divisor)**。
- $Q(z)$ 称为**商式 (quotient)**，$R(z)$ 为**余式 (remainder)**。
````


````ad-proof
title: 证明 | Proof

**存在性。** 对 $\deg P$ 进行归纳。

*基础情形*：若 $\deg P < \deg D$，取 $Q \equiv 0$，$R \equiv P$ 即满足 $P \equiv D \cdot 0 + P$，且 $\deg R = \deg P < \deg D$。

*归纳步骤*：设 $\deg P \ge \deg D$，记 $p = \deg P$，$d = \deg D$。写出首项

$$P(z) \equiv a_p z^p + \cdots, \qquad D(z) \equiv b_d z^d + \cdots \quad (b_d \neq 0)$$

构造商式的第一项 $Q_1(z) = \dfrac{a_p}{b_d} z^{p-d}$，使 $Q_1(z) \cdot D(z)$ 的首项恰好消去 $P(z)$ 的首项：

$$\begin{aligned} P_1(z) &\equiv P(z) - Q_1(z) \, D(z) \\ &\equiv (a_p z^p + \cdots) - \frac{a_p}{b_d} z^{p-d} (b_d z^d + \cdots) \\ &\equiv (a_p z^p + \cdots) - (a_p z^p + \cdots) \end{aligned}$$

首项 $a_p z^p$ 被消去，故 $\deg P_1 < p$。对 $P_1$ 应用归纳假设，存在 $Q_2, R$ 使得 $P_1 \equiv D \, Q_2 + R$（$\deg R < \deg D$）。令 $Q = Q_1 + Q_2$，则

$$P \equiv D \, Q_1 + P_1 \equiv D \, Q_1 + D \, Q_2 + R \equiv D(Q_1 + Q_2) + R \equiv D \, Q + R$$

**唯一性。** 假设 $P \equiv D Q_1 + R_1 \equiv D Q_2 + R_2$，其中 $\deg R_1, \deg R_2 < \deg D$（或为零）。则

$$D(Q_1 - Q_2) \equiv R_2 - R_1$$

若 $Q_1 \not \equiv Q_2$，则左边次数 $\ge \deg D$，但右边次数 $< \deg D$，矛盾。故 $Q_1 \equiv Q_2$，进而 $R_1 \equiv R_2$。
````


> **与整数除法的类比：** 整数带余除法中，$a = b \cdot q + r$，$0 \le r < b$；多项式除法中，$P = D \cdot Q + R$，$\deg R < \deg D$。整数比较「大小」，多项式比较「次数」。

当余式为零（零多项式）时，除式整除被除式。

````ad-def
title: 定义（整除） | Definition（Divisibility）

设 $P(z), D(z) \in \mathbb{C}[z]$，$D(z) \neq 0$。若存在 $Q(z) \in \mathbb{C}[z]$ 使得

$$P(z) \equiv D(z) \cdot Q(z)$$

则称 $D(z)$ **整除 (divides)** $P(z)$（或 $P(z)$ 可被 $D(z)$ 整除），记为 $D(z) \mid P(z)$。此时 $D(z)$ 称为 $P(z)$ 的**因式 (factor)**，$P(z)$ 称为 $D(z)$ 的**倍式 (multiple)**。

若不存在这样的 $Q(z)$，则记为 $D(z) \nmid P(z)$。
````

> 除法算法为整除判定提供了等价刻画：$D(z) \mid P(z)$ 当且仅当 $P(z)$ 除以 $D(z)$ 的余式 $R(z) = 0$。这与整数中 $a \mid b \iff b \div a$ 的余数为 $0$ 完全平行。

### 23.2.2　长除法

除法算法的存在性证明是构造性的：它给出了执行除法的具体步骤。这一步骤称为**长除法**。

````ad-alg
title: 算法（长除法） | Algorithm（Long Division）

利用除法算法的构造性证明，按以下步骤执行多项式长除法：

1. 将 $P(z)$（被除式）和 $D(z)$（除式）按 $z$ 的**降幂排列**。
2. 以 $P(z)$ 的首项除以 $D(z)$ 的首项，得商式的下一项。
3. 将该项乘以 $D(z)$，从 $P(z)$ 中减去。
4. 以所得新多项式为新的被除式，重复步骤 2–3，直至余式的次数小于 $D(z)$ 的次数。
````

> 长除法与整数长除法（如 $1234 \div 11$）结构完全平行：整数按「位值」（$10$ 的幂）排列，多项式按 $z$ 的幂排列。

````ad-example
title: 示例（长除法基本计算） | Example（Basic Long Division）

求 $(z^3 - 2z^2 + 3z - 1) \div (z - 2)$ 的商式与余式。

---

被除式 $z^3 - 2z^2 + 3z - 1$，除式 $z - 2$，均已降幂排列。初始列式为：

$$\begin{array}{r} \phantom{z^2 + 3} \\[-3pt] z - 2 \,\overline{\big)\, z^3 - 2z^2 + 3z - 1} \end{array}$$

**第一轮。** 首项相除：$z^3 \div z = z^2$，得商式首项 $z^2$。计算 $z^2 \cdot (z - 2) \equiv z^3 - 2z^2$，相减：

$$(z^3 - 2z^2 + 3z - 1) - (z^3 - 2z^2) \equiv 3z - 1$$

此时列式为：

$$\begin{array}{r} z^2 \phantom{{}+3} \\[-3pt] z - 2 \,\overline{\big)\, z^3 - 2z^2 + 3z - 1} \\[-3pt] \underline{-(z^3 - 2z^2\phantom{{}+3z-1})} \\ 3z - 1 \end{array}$$

**第二轮。** 余式 $3z - 1$，次数 $1 \ge \deg(z - 2) = 1$，继续。首项相除：$3z \div z = 3$，商式下一项 $+3$。计算 $3 \cdot (z - 2) = 3z - 6$，相减：

$$(3z - 1) - (3z - 6) = 5$$

此时列式为：

$$\begin{array}{r} z^2 + 3 \\[-3pt] z - 2 \,\overline{\big)\, z^3 - 2z^2 + 3z - 1} \\[-3pt] \underline{-(z^3 - 2z^2\phantom{{}+3z-1})} \\ 3z - 1 \\ \underline{-(3z - 6)} \\ 5 \end{array}$$

**终止。** 余式 $5$，次数 $0 < 1 = \deg(z - 2)$，终止。

故商式 $Q(z) = z^2 + 3$，余式 $R(z) = 5$，即

$$z^3 - 2z^2 + 3z - 1 \equiv (z - 2)(z^2 + 3) + 5$$
````

````ad-example
title: 示例（除式为二次式） | Example（Divisor of Degree Two）

求 $(z^4 + 1) \div (z^2 + 1)$ 的商式与余式。

---

初始列式为：

$$\begin{array}{r} \phantom{z^2 - 1} \\[-3pt] z^2 + 1 \,\overline{\big)\, z^4 \phantom{+ z^2} + 1} \end{array}$$

**第一轮。** 首项 $z^4 \div z^2 = z^2$，商式首项 $z^2$。计算 $z^2(z^2 + 1) = z^4 + z^2$，相减：

$$(z^4 + 1) - (z^4 + z^2) = -z^2 + 1$$

此时列式为：

$$\begin{array}{r} z^2 \phantom{{}-1} \\[-3pt] z^2 + 1 \,\overline{\big)\, z^4 \phantom{+ z^2} + 1} \\[-3pt] \underline{-(z^4 + z^2\phantom{{}+1})} \\ -z^2 + 1 \end{array}$$

**第二轮。** 首项 $-z^2 \div z^2 = -1$，商式下一项 $-1$。计算 $(-1)(z^2 + 1) = -z^2 - 1$，相减：

$$(-z^2 + 1) - (-z^2 - 1) = 2$$

此时列式为：

$$\begin{array}{r} z^2 - 1 \\[-3pt] z^2 + 1 \,\overline{\big)\, z^4 \phantom{+ z^2} + 1} \\[-3pt] \underline{-(z^4 + z^2\phantom{{}+1})} \\ -z^2 + 1 \\ \underline{-(-z^2 - 1)} \\ 2 \end{array}$$

**终止。** 余式 $2$，次数 $0 < 2 = \deg(z^2 + 1)$，终止。

故商式 $Q(z) = z^2 - 1$，余式 $R(z) = 2$，即

$$z^4 + 1 \equiv (z^2 + 1)(z^2 - 1) + 2$$

> 注意：除式为二次式时，余式次数可为 $0$ 或 $1$。余式定理（§23.3）仅适用于一次除式，此处必须用长除法。
````

````ad-example
title: 示例（判断整除） | Example（Testing Divisibility）

判断 $(z - 1)$ 是否整除 $P(z) = z^3 - 3z^2 + 3z - 1$。

---

执行长除法 $P(z) \div (z - 1)$。初始列式为：

$$\begin{array}{r} \phantom{z^2 - 2z + 1} \\[-3pt] z - 1 \,\overline{\big)\, z^3 - 3z^2 + 3z - 1} \end{array}$$

**第一轮。** $z^3 \div z = z^2$，$z^2(z-1) = z^3 - z^2$，相减得 $-2z^2 + 3z - 1$。此时列式为：

$$\begin{array}{r} z^2 \phantom{{}-2z+1} \\[-3pt] z - 1 \,\overline{\big)\, z^3 - 3z^2 + 3z - 1} \\[-3pt] \underline{-(z^3 - z^2\phantom{{}+3z-1})} \\ -2z^2 + 3z - 1 \end{array}$$

**第二轮。** $-2z^2 \div z = -2z$，$-2z(z-1) = -2z^2 + 2z$，相减得 $z - 1$。此时列式为：

$$\begin{array}{r} z^2 - 2z \phantom{{}+1} \\[-3pt] z - 1 \,\overline{\big)\, z^3 - 3z^2 + 3z - 1} \\[-3pt] \underline{-(z^3 - z^2\phantom{{}+3z-1})} \\ -2z^2 + 3z - 1 \\ \underline{-(-2z^2 + 2z\phantom{{}-1})} \\ z - 1 \end{array}$$

**第三轮。** $z \div z = 1$，$1 \cdot (z-1) = z - 1$，相减得 $0$。此时列式为：

$$\begin{array}{r} z^2 - 2z + 1 \\[-3pt] z - 1 \,\overline{\big)\, z^3 - 3z^2 + 3z - 1} \\[-3pt] \underline{-(z^3 - z^2\phantom{{}+3z-1})} \\ -2z^2 + 3z - 1 \\ \underline{-(-2z^2 + 2z\phantom{{}-1})} \\ z - 1 \\ \underline{-(z - 1)} \\ 0 \end{array}$$

余式为 $0$，故 $(z - 1) \mid P(z)$，且

$$z^3 - 3z^2 + 3z - 1 \equiv (z - 1)(z^2 - 2z + 1) \equiv (z - 1)^3$$

> 此例中 $z = 1$ 实为 $P(z)$ 的三重根（参见 §23.4.2）。
````



### 23.2.3　待定系数法求商式与余式

> 长除法提供了执行除法算法的具体步骤，但当除式次数较高或被除式较复杂时，逐项计算可能繁琐。本节介绍另一种方法，即**待定系数法 (method of undetermined coefficients)**：利用除法算式 $P(z) \equiv D(z) Q(z) + R(z)$ 是恒等式的性质，设出 $Q(z)$ 与 $R(z)$ 的一般形式（含待定系数），展开比较系数求解。

#### 核心原理

由除法算法，$P(z) \equiv D(z) Q(z) + R(z)$，其中 $\deg R < \deg D$。若 $P, D$ 已知，$Q, R$ 未知，则：

1. $\deg Q = \deg P - \deg D$（商式次数确定）；
2. $\deg R < \deg D$（余式次数受限）。

由此可设 $Q(z)$ 与 $R(z)$ 的一般形式（含待定系数），代入除法算式展开，比较对应系数，得到方程组求解。

````ad-note
title: 注记（与第四章、第六章对比系数法的联系） | Remark（Connection with the Method of Comparing Coefficients）

对比系数法在第四章（多项式相等的等价条件）和第六章（恒等式中待定系数求未知量）已介绍。此处将其应用于除法算式，本质相同：两个多项式恒等当且仅当对应系数相等。区别在于：此处利用**次数限制**（$\deg Q = \deg P - \deg D$，$\deg R < \deg D$）确定 $Q$ 与 $R$ 的结构，这是除法算法赋予的额外信息。
````

#### 技巧：利用次数限制设出结构

设商式与余式的结构时，关键是利用次数限制：

- 若 $\deg P = n$，$\deg D = d$，则 $\deg Q = n - d$，设 $Q(z) = q_{n-d} z^{n-d} + \cdots + q_1 z + q_0$。
- $\deg R < d$，设 $R(z) = r_{d-1} z^{d-1} + \cdots + r_1 z + r_0$（当 $d = 1$ 时 $R = r_0$ 为常数；当 $d = 2$ 时 $R(z) = r_1 z + r_0$ 为一次式）。

````ad-alg
title: 算法（待定系数法求商式与余式） | Algorithm（Method of Undetermined Coefficients）

1. **确定次数。** 计算 $\deg Q = \deg P - \deg D$，$\deg R < \deg D$。
2. **设结构。** 按次数设 $Q(z)$ 与 $R(z)$ 的一般形式（含待定系数）。
3. **代入展开。** 将 $Q(z), R(z)$ 代入 $P(z) \equiv D(z) Q(z) + R(z)$，展开右边。
4. **比较系数。** 对比左右两边各次项系数，得到方程组。
5. **求解。** 解方程组得待定系数，写出 $Q(z)$ 与 $R(z)$。
6. **验证（可选）。** 用长除法或代入特殊值验证结果。
````

````ad-example
title: 示例（待定系数法：一次除式） | Example（Undetermined Coefficients: Linear Divisor）

求 $(2z^3 - 3z^2 + z - 5) \div (z - 1)$ 的商式与余式。

---

**确定次数。** $\deg P = 3$，$\deg D = 1$，故 $\deg Q = 2$，$\deg R < 1$（即 $R$ 为常数）。

**设结构。** 设 $Q(z) = az^2 + bz + c$，$R = r$。

**代入展开。**

$$\begin{aligned} (z - 1)(az^2 + bz + c) + r &\equiv az^3 + bz^2 + cz - az^2 - bz - c + r \\ &\equiv az^3 + (b - a)z^2 + (c - b)z + (r - c) \end{aligned}$$

**比较系数。** 与 $2z^3 - 3z^2 + z - 5$ 对比：

$$\begin{cases} a = 2 \\ b - a = -3 \\ c - b = 1 \\ r - c = -5 \end{cases}$$

**求解。** $a = 2 \implies b = -1 \implies c = 0 \implies r = -5$。

故商式 $Q(z) = 2z^2 - z$，余式 $R = -5$，即

$$2z^3 - 3z^2 + z - 5 \equiv (z - 1)(2z^2 - z) + (-5)$$

> **验证（长除法）：** $2z^3 \div z = 2z^2$，$2z^2(z-1) = 2z^3 - 2z^2$，相减得 $-z^2 + z - 5$；$-z^2 \div z = -z$，$-z(z-1) = -z^2 + z$，相减得 $-5$。结果一致。✓
````

````ad-example
title: 示例（待定系数法：二次除式） | Example（Undetermined Coefficients: Quadratic Divisor）

求 $(z^4 + 2z^3 - z + 3) \div (z^2 + z + 1)$ 的商式与余式。

---

**确定次数。** $\deg P = 4$，$\deg D = 2$，故 $\deg Q = 2$，$\deg R < 2$（$R$ 为一次式）。

**设结构。** 设 $Q(z) = az^2 + bz + c$，$R(z) = dz + e$。

**代入展开。**

$$\begin{aligned} &(z^2 + z + 1)(az^2 + bz + c) + (dz + e) \\ &\equiv az^4 + bz^3 + cz^2 + az^3 + bz^2 + cz + az^2 + bz + c + dz + e \\ &\equiv az^4 + (a + b)z^3 + (a + b + c)z^2 + (b + c + d)z + (c + e) \end{aligned}$$

**比较系数。** 与 $z^4 + 2z^3 + 0z^2 - z + 3$ 对比：

$$\begin{cases} a = 1 \\ a + b = 2 \\ a + b + c = 0 \\ b + c + d = -1 \\ c + e = 3 \end{cases}$$

**求解。** $a = 1 \implies b = 1 \implies c = -2 \implies d = 0 \implies e = 5$。

故商式 $Q(z) = z^2 + z - 2$，余式 $R(z) = 5$，即

$$z^4 + 2z^3 - z + 3 \equiv (z^2 + z + 1)(z^2 + z - 2) + 5$$

> **验证：** 展开右边 $(z^2 + z + 1)(z^2 + z - 2) + 5 = z^4 + 2z^3 - z - 2 + 5 = z^4 + 2z^3 - z + 3$。✓
````

````ad-example
title: 示例（待定系数法：含零系数项） | Example（Undetermined Coefficients: with Zero Coefficients）

求 $(z^3 + 1) \div (z^2 - 1)$ 的商式与余式。

---

**确定次数。** $\deg P = 3$，$\deg D = 2$，故 $\deg Q = 1$，$\deg R < 2$（$R$ 为一次式）。

**设结构。** 注意被除式 $z^3 + 1$ 缺 $z^2$ 项与 $z$ 项（系数为 $0$）。设 $Q(z) = az + b$，$R(z) = cz + d$。

**代入展开。**

$$\begin{aligned} (z^2 - 1)(az + b) + (cz + d) &\equiv az^3 + bz^2 - az - b + cz + d \\ &\equiv az^3 + bz^2 + (c - a)z + (d - b) \end{aligned}$$

**比较系数。** 与 $z^3 + 0z^2 + 0z + 1$ 对比：

$$\begin{cases} a = 1 \\ b = 0 \\ c - a = 0 \\ d - b = 1 \end{cases}$$

**求解。** $a = 1, b = 0 \implies c = 1, d = 1$。

故商式 $Q(z) = z$，余式 $R(z) = z + 1$，即

$$z^3 + 1 \equiv (z^2 - 1) \cdot z + (z + 1)$$

> **验证：** $z(z^2 - 1) + (z + 1) = z^3 - z + z + 1 = z^3 + 1$。✓
````

````ad-example
title: 示例（待定系数法：高次被除式） | Example（Undetermined Coefficients: Higher-Degree Dividend）

求 $(3z^5 - 2z^4 + z^3 - z^2 + 4z - 1) \div (z^2 + 1)$ 的商式与余式。

---

**确定次数。** $\deg P = 5$，$\deg D = 2$，故 $\deg Q = 3$，$\deg R < 2$（$R$ 为一次式）。

**设结构。** 设 $Q(z) = az^3 + bz^2 + cz + d$，$R(z) = ez + f$。

**代入展开。** $(z^2 + 1)(az^3 + bz^2 + cz + d) + (ez + f)$：

$$\begin{aligned} &\equiv az^5 + bz^4 + cz^3 + dz^2 + az^3 + bz^2 + cz + d + ez + f \\ &\equiv az^5 + bz^4 + (a + c)z^3 + (b + d)z^2 + (c + e)z + (d + f) \end{aligned}$$

**比较系数。** 与 $3z^5 - 2z^4 + z^3 - z^2 + 4z - 1$ 对比：

$$\begin{cases} a = 3 \\ b = -2 \\ a + c = 1 \\ b + d = -1 \\ c + e = 4 \\ d + f = -1 \end{cases}$$

**求解。** $a = 3, b = -2 \implies c = -2 \implies d = 1 \implies e = 6 \implies f = -2$。

故商式 $Q(z) = 3z^3 - 2z^2 - 2z + 1$，余式 $R(z) = 6z - 2$，即

$$3z^5 - 2z^4 + z^3 - z^2 + 4z - 1 \equiv (z^2 + 1)(3z^3 - 2z^2 - 2z + 1) + (6z - 2)$$

> **验证：** 展开右边 $(z^2+1)(3z^3 - 2z^2 - 2z + 1) = 3z^5 - 2z^4 - 2z^3 + z^2 + 3z^3 - 2z^2 - 2z + 1 = 3z^5 - 2z^4 + z^3 - z^2 - 2z + 1$，加 $(6z - 2)$ 得 $3z^5 - 2z^4 + z^3 - z^2 + 4z - 1$。✓
````

---

## 23.3　余式定理

> **本节难度上限**：T B- ｜ C C ｜ E C ｜ Q C

> 本节推导除法算法在除式为一次式时的简洁推论，即余式定理。它使余式的计算无需执行长除法，仅需代入求值。

### 23.3.1　余式定理

当除式为一次式 $(z - a)$ 时，除法算法中的余式 $R(z)$ 满足 $\deg R < 1$，即 $R$ 为常数。这个常数有一个极为简洁的计算方法。

````ad-thm
title: 定理（余式定理） | Theorem（Remainder Theorem）

设 $P(z)$ 为单变量多项式。$P(z)$ 除以 $(z - a)$ 的余式等于 $P(a)$。
````

````ad-proof
title: 证明 | Proof

由除法算法，存在 $Q(z)$ 和常数 $R$（因 $\deg(z - a) = 1$，故 $\deg R < 1$，即 $R$ 为常数），使得

$$P(z) \equiv (z - a) \cdot Q(z) + R$$

代入 $z = a$：

$$P(a) = (a - a) \cdot Q(a) + R = 0 + R = R$$

故 $R = P(a)$。
````

余式定理可推广到除式为一般一次式 $(az - b)$ 的情形。

````ad-cor
title: 推论（除以 $(az-b)$ 的余式） | Corollary（Remainder upon Division by $(az-b)$）

设 $P(z)$ 为单变量多项式，$a \neq 0$。$P(z)$ 除以 $(az - b)$ 的余式等于 $P\!\left(\dfrac{b}{a}\right)$。
````

````ad-proof
title: 证明 | Proof

由 $az - b = a\!\left(z - \dfrac{b}{a}\right)$，除以 $(az - b)$ 等价于除以 $\left(z - \dfrac{b}{a}\right)$（常数因子 $a$ 被吸收进商式中，不影响余式）。由余式定理，余式 $= P\!\left(\dfrac{b}{a}\right)$。
````

### 23.3.2　余式定理的意义

余式定理提供了一种无需执行长除法即可计算余式的方法，仅需代入 $z = a$ 计算 $P(a)$。这在除式为一次式时极大简化了计算。

> **适用范围：** 余式定理仅适用于除式为一次式 $(z - a)$ 的情形。当除式为高次式（如 $z^2 + 1$）时，余式不再是常数，必须用长除法（参见 §23.2 示例）。

````ad-example
title: 示例（余式定理基本应用） | Example（Basic Application of the Remainder Theorem）

已知 $P(z) = z^3 - 4z^2 + 5z - 2$，求 $P(z) \div (z - 1)$ 的余式。

---

由余式定理，余式 $= P(1)$：

$$P(1) = 1 - 4 + 5 - 2 = 0$$

故余式为 $0$，即 $(z - 1) \mid P(z)$。
````

````ad-example
title: 示例（除以 $(az-b)$ 的余式） | Example（Remainder upon Division by $(az-b)$）

已知 $P(z)$ 除以 $(2z - 3)$ 的余式为 $5$，求 $P\!\left(\dfrac{3}{2}\right)$ 的值。

---

由推论，$P(z)$ 除以 $(2z - 3)$ 的余式 $= P\!\left(\dfrac{3}{2}\right)$。已知余式为 $5$，故

$$P\!\left(\frac{3}{2}\right) = 5$$
````

````ad-example
title: 示例（余式定理不适用于高次除式） | Example（Remainder Theorem Does Not Apply to Higher-Degree Divisors）

求 $P(z) = z^3 - 2z + 1$ 除以 $(z^2 - 1)$ 的余式。

---

除式 $(z^2 - 1)$ 为二次式，余式次数可能为 $0$ 或 $1$，余式定理不适用。须用长除法。

第一轮：$z^3 \div z^2 = z$，$z(z^2 - 1) = z^3 - z$，相减：

$$(z^3 - 2z + 1) - (z^3 - z) = -z + 1$$

余式 $-z + 1$，次数 $1 < 2 = \deg(z^2 - 1)$，终止。故

$$z^3 - 2z + 1 \equiv (z^2 - 1) \cdot z + (-z + 1)$$

商式 $Q(z) = z$，余式 $R(z) = -z + 1$（一次式）。

> 此例中余式 $R(z) = -z + 1$ 为一次式，展示了二次除式下余式的一般情形。若误用余式定理，将无法得到正确结果：余式定理仅适用于一次除式。
````

---

## 23.4　因式与根的关系

> **本节难度上限**：T B+ ｜ C B- ｜ E B+ ｜ Q C+

> 本节是本章核心。先建立因式定理（因式与根的基本双向等价），再分实数域 $\mathbb{R}$ 和复数域 $\mathbb{C}$ 两个层次深化根与因式的结构关系，最后将理论应用于系统化分解多项式。

### 23.4.1　因式定理

余式定理告诉我们，$P(z)$ 除以 $(z - a)$ 的余式为 $P(a)$。当 $P(a) = 0$ 时，余式为零，即 $(z - a)$ 整除 $P(z)$。这就是因式定理。

````ad-thm
title: 定理（因式定理） | Theorem（Factor Theorem）

设 $P(z)$ 为单变量多项式。$(z - a)$ 是 $P(z)$ 的因式（即 $(z - a) \mid P(z)$），当且仅当 $P(a) = 0$。
````

````ad-proof
title: 证明 | Proof

由余式定理，$P(z)$ 除以 $(z - a)$ 的余式为 $P(a)$。而

$$(z - a) \mid P(z) \iff \text{余式 } R = 0 \iff P(a) = 0$$

其中第一个等价来自整除的定义（余式为零），第二个等价来自余式定理。
````

````ad-def
title: 定义（多项式的根） | Definition（Root of a Polynomial）

若 $P(a) = 0$，则称 $a$ 为多项式 $P(z)$ 的一个**根 (root)**（或**零点 (zero)**）。
````

因式定理建立了根与因式之间的第一层联系：每个根 $a$ 对应一个一次因式 $(z - a)$。然而，一个多项式可能有多个根；同一个根也可能「重复出现」。下一节将系统地深化这层关系。

````ad-example
title: 示例（因式定理的基本应用） | Example（Basic Application of the Factor Theorem）

判断 $(z - 2)$ 是否为 $P(z) = z^3 - z - 6$ 的因式。

---

计算 $P(2)$：

$$P(2) = 8 - 2 - 6 = 0$$

由因式定理，$(z - 2) \mid P(z)$，即 $(z - 2)$ 是 $P(z)$ 的因式。
````

````ad-example
title: 示例（利用因式定理求未知系数） | Example（Finding an Unknown Coefficient via the Factor Theorem）

已知 $(z + 1)$ 是 $P(z) = z^3 + kz^2 - 3z - 4$ 的因式，求 $k$。

---

$(z + 1) = (z - (-1))$，由因式定理，$P(-1) = 0$：

$$(-1)^3 + k(-1)^2 - 3(-1) - 4 = 0$$

$$-1 + k + 3 - 4 = 0$$

$$k - 2 = 0$$

故 $k = 2$。
````

### 23.4.2　根与因式的深层关系

####  重根与因式的整除性质

一个根 $a$ 可能使 $(z - a)$ 在 $P(z)$ 的因式分解中「重复出现」多次。

````ad-def
title: 定义（重根与重数） | Definition（Multiple Root and Multiplicity）

设 $P(z)$ 为单变量多项式，$a$ 为 $P(z)$ 的一个根。若 $(z - a)^m \mid P(z)$ 但 $(z - a)^{m+1} \nmid P(z)$，则称 $a$ 为 $P(z)$ 的 **$m$ 重根 (root of multiplicity $m$)**。$m$ 称为该根的**重数 (multiplicity)**。

- $m = 1$：**单根 (simple root)**。
- $m = 2$：**二重根 (double root)**。
- $m \ge 2$：统称** $m$ 重根 (multiple root)**。
````

> 因式定理给出的是 $m = 1$ 的情形（$(z - a) \mid P$ 但未讨论更高次幂）。重根概念是对因式定理的自然推广，对 $\mathbb{R}$ 和 $\mathbb{C}$ 均适用。

重数可以从图像上直观理解：单根处函数图像**穿过** $x$ 轴，二重根处图像与 $x$ 轴**相切**但不穿过。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 2]
\begin{axis}[
    width=10cm, height=7cm,
    xmin=-0.5, xmax=3.5, ymin=-2.5, ymax=4,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={1,2}, ytick={-2,2},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% P(x) = (x-1)(x-2)^2 = x^3 - 5x^2 + 8x - 4
\addplot[domain=0.3:3.2, samples=80, blue!70!black, thick] {x^3 - 5*x^2 + 8*x - 4};
% simple root at x=1
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:1,0) {};
\node[anchor=north, font=\tiny, red!70!black] at (axis cs:1,0) {simple root};
% double root at x=2
\node[circle, fill=green!60!black, inner sep=2pt] at (axis cs:2,0) {};
\node[anchor=west, font=\tiny, green!60!black] at (axis cs:2,0) {double root};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 23-1：$P(x) = (x - 1)(x - 2)^2$ 的图像。$x = 1$ 为单根，图像穿过 $x$ 轴；$x = 2$ 为二重根，图像与 $x$ 轴相切但不穿过。

以下定理描述了一次因式在整除乘积时的行为。它是多项式版本的「欧几里得引理」（回顾第一章）。

````ad-thm
title: 定理（因式的整除传递性） | Theorem（Divisibility Transitivity of a Factor）

设 $P(z) = A(z) \cdot B(z)$ 为两个多项式的乘积。若 $(z - a) \mid P(z)$ 但 $(z - a) \nmid A(z)$，则 $(z - a) \mid B(z)$。
````

````ad-proof
title: 证明 | Proof

由 $(z - a) \mid P(z)$ 及因式定理，$P(a) = 0$，即

$$A(a) \cdot B(a) = 0$$

在 $\mathbb{C}$（或 $\mathbb{R}$）中，乘积为零蕴含至少一个因子为零。由 $(z - a) \nmid A(z)$ 及因式定理，$A(a) \neq 0$。因此 $B(a) = 0$，再由因式定理得 $(z - a) \mid B(z)$。
````

````ad-note
title: 注记（与欧几里得引理的对照） | Remark（Analogy with Euclid's Lemma）

此定理是数论中**欧几里得引理 (Euclid's lemma)**（第一章）的多项式版本：

| | 数论（$\mathbb{Z}$） | 多项式（$\mathbb{C}[z]$ 或 $\mathbb{R}[z]$） |
|:---|:---|:---|
| 不可约元素 | 质数 $p$ | 一次因式 $(z - a)$ |
| 命题 | 若 $p \mid ab$ 且 $p \nmid a$，则 $p \mid b$ | 若 $(z - a) \mid A(z)B(z)$ 且 $(z - a) \nmid A(z)$，则 $(z - a) \mid B(z)$ |
| 证明工具 | 贝祖等式 | 因式定理 |

欧几里得引理是整数质因数分解唯一性的基石；因式的整除传递性在多项式因式分解中扮演完全平行的角色：一次因式在多项式中具有「质数性」。
````

####  实数域 $\mathbb{R}$ 上的结构

现在限定在实数域 $\mathbb{R}$ 上讨论（变量写回 $x$）。首先，$n$ 次多项式的根的个数有上界。

````ad-thm
title: 定理（$n$ 次多项式的根数上界） | Theorem（Upper Bound on the Number of Roots）

设 $P(x)$ 为非零单变量多项式，$\deg P = n \ge 0$。则 $P(x)$ 在 $\mathbb{R}$（或任意域）中至多有 $n$ 个不同的根。
````

````ad-proof
title: 证明 | Proof

假设 $P(x)$ 有 $k$ 个不同的根 $a_1, a_2, \dots, a_k$。对每个 $a_i$，由因式定理知 $(x - a_i) \mid P(x)$。由于 $a_1, \dots, a_k$ 两两不同，诸多项式 $(x - a_1), (x - a_2), \dots, (x - a_k)$ 两两互质，故其乘积整除 $P(x)$：

$$(x - a_1)(x - a_2) \cdots (x - a_k) \;\Big|\; P(x)$$

因此

$$k = \deg\!\Big[(x - a_1)(x - a_2) \cdots (x - a_k)\Big] \le \deg P = n$$

即 $k \le n$。
````

````ad-example
title: 示例（利用因式定理分析根） | Example（Analyzing Roots via the Factor Theorem）

给定 $P(x) = x^3 - x^2 - x + 1$，利用因式定理分解并分析其根。

---

测试 $x = 1$：$P(1) = 1 - 1 - 1 + 1 = 0$，故 $(x - 1) \mid P(x)$。长除法得 $P(x) = (x - 1)(x^2 - 1) = (x - 1)^2(x + 1)$。

- $x = 1$：$(x - 1)^2 \mid P(x)$ 但 $(x - 1)^3 \nmid P(x)$，故 $1$ 为**二重根**。
- $x = -1$：$(x + 1) \mid P(x)$ 但 $(x + 1)^2 \nmid P(x)$，故 $-1$ 为**单根**。

不同根有 $2$ 个（$1$ 和 $-1$），$\le \deg P = 3$，符合根数上界。计重数共 $2 + 1 = 3$ 个根，等于 $\deg P$。
````


````ad-cor
title: 推论（根数上界的推论） | Corollary（Consequence of the Root Bound）

若一个 $n$ 次多项式在 $\mathbb{R}$ 中的根多于 $n$ 个，则它必为零多项式。
````

````ad-proof
title: 证明 | Proof

设 $P(x)$ 为 $n$ 次多项式，且在 $\mathbb{R}$ 中有超过 $n$ 个不同的根。

若 $P(x) \neq 0$，则 $\deg P = n$，由根数上界定理，$P(x)$ 至多有 $n$ 个不同的根，与假设矛盾。

故 $P(x) \equiv 0$（零多项式）。
````

根数上界告诉我们根「不会太多」，但并未说明根与因式如何组织。以下定理给出实数域上的根—因式结构。

````ad-thm
title: 定理（实数域上的根—因式结构） | Theorem（Root-Factor Structure over $\mathbb{R}$）

设 $P(x)$ 为非零单变量多项式，$\deg P = n$，首项系数为 $a_n$。若 $P(x)$ 在 $\mathbb{R}$ 中的所有根为 $a_1, a_2, \dots, a_k$，且对应的重数分别为 $m_1, m_2, \dots, m_k$，则存在多项式 $Q(x)$ 满足：

$$P(x) \equiv a_n \cdot (x - a_1)^{m_1} (x - a_2)^{m_2} \cdots (x - a_k)^{m_k} \cdot Q(x)$$

其中 $Q(x)$ 在 $\mathbb{R}$ 上无根（即 $Q(x)$ 在 $\mathbb{R}$ 上不可再分解出一次因式），且 $\deg Q = n - (m_1 + m_2 + \cdots + m_k)$。
````

````ad-proof
title: 证明 | Proof

对 $P(x)$ 反复应用因式定理及除法算法。对每个实根 $a_i$（$i = 1, 2, \dots, k$），连续除以 $(x - a_i)$ 共 $m_i$ 次：

第一次除以 $(x - a_i)$，由因式定理（因 $a_i$ 是根）得 $P(x) = (x - a_i) P_1(x)$，$\deg P_1 = n - 1$；
  
  若 $a_i$ 是 $m_i$ 重根，则可继续除以 $(x - a_i)$ 共 $m_i$ 次，每次降次 $1$，得到 $P(x) = (x - a_i)^{m_i} P_i(x)$。

对每个实根 $a_1, a_2, \dots, a_k$ 依次执行此操作（因不同根对应的一次因式两两互质，操作可叠加），最终得到

$$P(x) \equiv a_n \cdot (x - a_1)^{m_1} (x - a_2)^{m_2} \cdots (x - a_k)^{m_k} \cdot Q(x)$$

其中 $Q(x)$ 是最后剩下的商式。由于所有实根已被提取，$Q(x)$ 在 $\mathbb{R}$ 上无根（否则该根应已被提取）。每次降次 $1$，共降次 $m_1 + m_2 + \cdots + m_k$，故 $\deg Q = n - (m_1 + m_2 + \cdots + m_k)$。
````

> **$Q(x)$ 的局限：** 定理中的 $Q(x)$ 在 $\mathbb{R}$ 上无根，但**并不意味** $Q(x)$ 一定不可再分解。例如 $x^4 + 1$ 在 $\mathbb{R}$ 上无根，却可分解为 $$(x^2 + \sqrt{2}\,x + 1)(x^2 - \sqrt{2}\,x + 1)$$要彻底解决分解的终点问题，必须提升至复数域。

####  提升至复数域 $\mathbb{C}$

回顾第十七章，复数系 $\mathbb{C}$ 是 $\mathbb{R}$ 的扩张。在 $\mathbb{R}$ 上，$x^2 + 1$ 无根；但在 $\mathbb{C}$ 上，$i$ 和 $-i$ 都是它的根。这一扩张彻底改变了根与因式的结构。

````ad-thm
title: 定理（代数基本定理） | Theorem（Fundamental Theorem of Algebra）

设 $P(z)$ 为次数 $n \ge 1$ 的复系数多项式。则 $P(z)$ 在 $\mathbb{C}$ 中至少有一个根。
````

````ad-note
title: 注记（代数基本定理的证明超出范围） | Remark（Proof Beyond Scope）

代数基本定理的证明需要复分析或拓扑学工具，超出 DSE 范围。此处作为已知事实接受。

这一定理是代数学最深刻的结论之一：它断言复数系 $\mathbb{C}$ 已经「足够大」，使得每个非常数多项式都能在其中找到根。这也是我们在 $\mathbb{R}$ 之外引入 $\mathbb{C}$ 的根本动机。
````

````ad-note
title: 注记（代数基本定理的复分析证明） | Remark（Complex-Analytic Proof of the FTA）

代数基本定理可用复分析中的**刘维尔定理 (Liouville's theorem)** 证明，此处列出供欣赏。

> **刘维尔定理：** 若整函数 $f: \mathbb{C} \to \mathbb{C}$（即在全平面 $\mathbb{C}$ 上可导的函数）有界，则 $f$ 必为常数。

**证明思路。** 设 $P(z)$ 为次数 $n \ge 1$ 的多项式，假设 $P(z)$ 在 $\mathbb{C}$ 中无根。令 $f(z) = \dfrac{1}{P(z)}$，则 $f$ 为整函数（因 $P(z) \neq 0$）。又当 $|z| \to \infty$ 时 $|P(z)| \to \infty$（因 $n \ge 1$），故 $|f(z)| \to 0$，$f$ 在 $\mathbb{C}$ 上有界。由刘维尔定理，$f$ 为常数，即 $P$ 为常数，与 $n \ge 1$ 矛盾。故 $P(z)$ 在 $\mathbb{C}$ 中必有根。

> 此证明需复分析知识（整函数、刘维尔定理），超出 DSE 范围，仅供欣赏。
````

由代数基本定理，反复应用因式定理与除法算法，可将多项式在 $\mathbb{C}$ 上完全分解。

````ad-cor
title: 推论（$\mathbb{C}$ 上的完全因式分解） | Corollary（Complete Factorization over $\mathbb{C}$）

设 $P(z)$ 为次数 $n \ge 1$ 的复系数多项式，首项系数为 $a_n$。则 $P(z)$ 可**完全分解 (completely factorized)** 为 $n$ 个一次因式的乘积：

$$P(z) \equiv a_n (z - z_1)(z - z_2) \cdots (z - z_n)$$

其中 $z_1, z_2, \dots, z_n \in \mathbb{C}$ 为 $P(z)$ 的所有根（计重数）。
````

````ad-proof
title: 证明 | Proof

对次数 $n$ 进行归纳。

*基础情形*（$n = 1$）：$P(z) = a_1 z + a_0$（$a_1 \neq 0$），根为 $z_1 = -a_0 / a_1$，$P(z) = a_1(z - z_1)$，已为一次因式之积。

*归纳步骤*：设 $n \ge 2$，结论对 $n - 1$ 次多项式成立。由代数基本定理，$P(z)$ 在 $\mathbb{C}$ 中有根 $z_1$。由因式定理，$P(z) = (z - z_1) P_1(z)$，其中 $\deg P_1 = n - 1$。对 $P_1(z)$ 应用归纳假设，$P_1(z) = a_n (z - z_2)(z - z_3) \cdots (z - z_n)$。故

$$P(z) \equiv (z - z_1) \cdot a_n (z - z_2) \cdots (z - z_n) \equiv a_n (z - z_1)(z - z_2) \cdots (z - z_n)$$

得证。
````

将重根合并后，可写为：

$$P(z) \equiv a_n (z - z_1)^{m_1} (z - z_2)^{m_2} \cdots (z - z_k)^{m_k}, \qquad m_1 + m_2 + \cdots + m_k = n$$

> **对照实数域定理：** 在 $\mathbb{R}$ 上，定理中的 $Q(x)$ 未必为常数；在 $\mathbb{C}$ 上，本推论断言 $Q(z) = a_n$（常数），即一切非常数多项式在 $\mathbb{C}$ 上均可彻底分解为一次因式之积。这是复数域相较于实数域的根本优势。

对于**实系数**多项式，复数根有一个重要的对称性质。

````ad-thm
title: 定理（共轭根定理） | Theorem（Conjugate Root Theorem）

设 $P(x)$ 为**实系数**多项式（即所有系数 $a_i \in \mathbb{R}$）。若复数 $z \in \mathbb{C} \setminus \mathbb{R}$ 是 $P(x)$ 的一个根，则其共轭 $\overline{z}$ 也是 $P(x)$ 的根，且两者的重数相同。
````

````ad-proof
title: 证明 | Proof

设 $P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$，其中 $a_i \in \mathbb{R}$，故 $\overline{a_i} = a_i$。若 $P(z) = 0$，即 $a_n z^n + \cdots + a_1 z + a_0 = 0$，则

$$\begin{aligned} P(\overline{z}) &\equiv a_n \overline{z}^{\,n} + a_{n-1} \overline{z}^{\,n-1} + \cdots + a_1 \overline{z} + a_0 \\ &\equiv \overline{a_n}\,\overline{z^{\,n}} + \overline{a_{n-1}}\,\overline{z^{\,n-1}} + \cdots + \overline{a_1}\,\overline{z} + \overline{a_0} \\ &\equiv \overline{a_n z^n} + \overline{a_{n-1} z^{n-1}} + \cdots + \overline{a_1 z} + \overline{a_0} \\ &\equiv \overline{a_n z^n + a_{n-1} z^{n-1} + \cdots + a_1 z + a_0} \\ &\equiv \overline{P(z)} = \overline{0} = 0 \end{aligned}$$

其中第二行用了 $\overline{a_i} = a_i$（实系数），第三行用了共轭运算的性质 $\overline{a_i z^i} = \overline{a_i}\,\overline{z^{\,i}}$，第四行用了共轭运算保持求和（$\overline{u + v} = \overline{u} + \overline{v}$）。故 $\overline{z}$ 也是根。

由对称性（$z$ 与 $\overline{z}$ 互为共轭），两者的重数相同。
````


```tikz
\begin{document}
\begin{tikzpicture}[scale=1.3]
% real axis
\draw[->, gray!70] (-3.5,0) -- (3.5,0) node[right, font=\tiny, black] {$\operatorname{Re}$};
% imaginary axis
\draw[->, gray!70] (0,-2.5) -- (0,2.5) node[above, font=\tiny, black] {$\operatorname{Im}$};
% point z = a + bi
\node[circle, fill=blue!70!black, inner sep=2pt] at (1.5,1.5) {};
\node[anchor=south west, font=\tiny, blue!70!black] at (1.5,1.5) {$z = a+bi$};
% point conjugate z = a - bi
\node[circle, fill=red!70!black, inner sep=2pt] at (1.5,-1.5) {};
\node[anchor=north west, font=\tiny, red!70!black] at (1.5,-1.5) {$\overline{z} = a-bi$};
% dashed line connecting them
\draw[dashed, gray!50] (1.5,1.5) -- (1.5,-1.5);
% projection on real axis
\node[circle, fill=black, inner sep=1.5pt] at (1.5,0) {};
\node[anchor=north, font=\tiny] at (1.5,0) {$a$};
\end{tikzpicture}
\end{document}
```



图 23-2：复平面上，共轭根 $z = a + bi$ 与 $\overline{z} = a - bi$ 关于实轴对称。

> **共轭根定理的意义：** 实系数多项式的非实复根总是**成对**出现。这意味着实系数多项式在 $\mathbb{C}$ 上的完全分解中，非实复根成对贡献两个一次因式 $(z - z_0)(z - \overline{z_0})$，其乘积为实系数二次式。

由共轭根定理，实系数多项式在 $\mathbb{R}$ 上的不可约因式只有两类。

````ad-cor
title: 推论（实系数多项式在 $\mathbb{R}$ 上的不可约因式） | Corollary（Irreducible Factors of Real Polynomials over $\mathbb{R}$）

设 $P(x)$ 为实系数多项式。则 $P(x)$ 在 $\mathbb{R}$ 上的**不可约因式 (irreducible factor)** 仅有两类：

1. **一次因式** $(x - a)$，其中 $a \in \mathbb{R}$（对应实根）；
2. **二次因式** $x^2 + px + q$，其中判别式 $\Delta = p^2 - 4q < 0$（对应一对共轭复根 $z, \overline{z}$）。

因 $(x - z)(x - \overline{z}) = x^2 - 2\operatorname{Re}(z)\,x + |z|^2$，系数均为实数。
````

````ad-proof
title: 证明 | Proof

由 $\mathbb{C}$ 上的完全分解，$P(x) = a_n (x - z_1)(x - z_2) \cdots (x - z_n)$，其中 $z_1, \dots, z_n \in \mathbb{C}$。将这些根分为两类：实根 $a_1, \dots, a_k \in \mathbb{R}$ 与非实复根。

由共轭根定理，非实复根成对出现：$z_j$ 与 $\overline{z_j}$ 同为根且重数相同。每对 $(z_j, \overline{z_j})$ 对应的乘积为

$$(x - z_j)(x - \overline{z_j}) = x^2 - (z_j + \overline{z_j})\,x + z_j \overline{z_j} = x^2 - 2\operatorname{Re}(z_j)\,x + |z_j|^2$$

其实部 $2\operatorname{Re}(z_j)$ 与模 $|z_j|$ 均为实数，故此乘积为实系数二次式。又判别式 $\Delta = 4\operatorname{Re}(z_j)^2 - 4|z_j|^2 = -4\operatorname{Im}(z_j)^2 < 0$（因 $z_j \notin \mathbb{R}$，$\operatorname{Im}(z_j) \neq 0$）。

将所有一次实因式 $(x - a_i)$ 与二次共轭对因式 $(x - z_j)(x - \overline{z_j})$ 相乘，即得 $P(x)$ 在 $\mathbb{R}$ 上的因式分解。故实系数多项式在 $\mathbb{R}$ 上的不可约因式仅有一次式与 $\Delta < 0$ 的二次式两类。
````

> 这解释了实数域定理中 $Q(x)$ 的情形：$Q(x)$ 无实根，但必可分解为若干个判别式 $< 0$ 的二次因式之积。

####  $\mathbb{R}$ 与 $\mathbb{C}$ 的小结

| 域            | 根的存在性                      | 因式分解结构                                                | 不可约因式                  |
| :----------- | :------------------------- | :---------------------------------------------------- | :--------------------- |
| $\mathbb{R}$ | $n$ 次多项式未必有实根（如 $x^2 + 1$） | $P(x) = a_n \prod (x - a_i)^{m_i} \cdot Q(x)$，$Q$ 无实根 | 一次式及 $\Delta < 0$ 的二次式 |
| $\mathbb{C}$ | 每个非常数多项式必有根                | $P(z) = a_n \prod (z - z_i)$，完全分解                     | 仅有一次式                  |

````ad-example
title: 示例（判断重根） | Example（Determining Multiplicity）

判断 $x = 2$ 是 $P(x) = x^3 - 4x^2 + 5x - 2$ 的几重根。

---

计算 $P(2) = 8 - 16 + 10 - 2 = 0$，故 $x = 2$ 是根。用长除法分解：

$$P(x) \equiv (x - 2)(x^2 - 2x + 1) \equiv (x - 2)(x - 1)^2$$

继续检验 $x = 2$：商式 $Q(x) = x^2 - 2x + 1$，$Q(2) = 4 - 4 + 1 = 1 \neq 0$，故 $(x - 2)$ 不再整除 $Q(x)$。

因此 $x = 2$ 是 $P(x)$ 的**单根**（$m = 1$）。

> 另注意 $x = 1$ 是 $P(x)$ 的**二重根**（因 $(x - 1)^2 \mid P(x)$ 但 $(x - 1)^3 \nmid P(x)$）。
````

````ad-example
title: 示例（实数域上的因式分解） | Example（Factorization over $\mathbb{R}$）

已知 $P(x) = x^3 - 3x^2 + 4$ 有一个实根 $x = -1$，完成 $P(x)$ 在 $\mathbb{R}$ 上的因式分解。

---

由因式定理，$(x + 1) \mid P(x)$。用长除法：

$$P(x) \equiv (x + 1)(x^2 - 4x + 4) \equiv (x + 1)(x - 2)^2$$

故 $P(x) = (x + 1)(x - 2)^2$。根为 $x = -1$（单根）与 $x = 2$（二重根），均在 $\mathbb{R}$ 中，$Q(x) = 1$（常数）。
````

````ad-example
title: 示例（利用共轭根定理分解） | Example（Factorization via the Conjugate Root Theorem）

实系数多项式 $P(x) = x^4 + 4$ 已知一根为 $1 + i$，求 $P(x)$ 在 $\mathbb{R}$ 上的因式分解。

---

**验证。** $P(1+i) = (1+i)^4 = \left((1+i)^2\right)^2 = (2i)^2 = -4$，故 $P(1+i) = -4 + 4 = 0$。✓

**共轭根。** 由共轭根定理（$P$ 为实系数），$1 - i$ 也是根。这两个根对应的因式之积为

$$(x - (1+i))(x - (1-i)) = (x - 1)^2 - i^2 = (x - 1)^2 + 1 = x^2 - 2x + 2$$

**长除法。** $P(x) \div (x^2 - 2x + 2)$，得商式 $x^2 + 2x + 2$：

$$P(x) \equiv (x^2 - 2x + 2)(x^2 + 2x + 2)$$

**检验不可约性。**

$$\Delta_1 = (-2)^2 - 4 \cdot 2 = -4 < 0, \qquad \Delta_2 = 2^2 - 4 \cdot 2 = -4 < 0$$

两者判别式均小于 $0$，在 $\mathbb{R}$ 上不可约。故 $P(x) = (x^2 - 2x + 2)(x^2 + 2x + 2)$ 已在 $\mathbb{R}$ 上完全分解。

> **验证：** $(x^2 - 2x + 2)(x^2 + 2x + 2) = (x^2 + 2)^2 - (2x)^2 = x^4 + 4x^2 + 4 - 4x^2 = x^4 + 4$。✓
````

````ad-example
title: 示例（无实根但仍可约） | Example（No Real Roots but Still Reducible）

证明 $x^4 + 1$ 在 $\mathbb{R}$ 上无实根，但可分解为两个二次因式之积。

---

**无实根。** 对任意 $x \in \mathbb{R}$，$x^4 \ge 0$，故 $x^4 + 1 \ge 1 > 0$。因此 $x^4 + 1$ 在 $\mathbb{R}$ 上无根。

**仍可分解。** 设 $x^4 + 1 = (x^2 + ax + 1)(x^2 + bx + 1)$（取常数项为 $1$，$x^4$ 系数为 $1$，利用对称性）。展开：

$$(x^2 + ax + 1)(x^2 + bx + 1) \equiv x^4 + (a+b)x^3 + (ab + 2)x^2 + (a+b)x + 1$$

与 $x^4 + 1$ 比较系数：$a + b = 0$，$ab + 2 = 0$。由 $b = -a$，得 $-a^2 + 2 = 0$，即 $a^2 = 2$，$a = \sqrt{2}$（取正根），$b = -\sqrt{2}$。故

$$x^4 + 1 \equiv (x^2 + \sqrt{2}\,x + 1)(x^2 - \sqrt{2}\,x + 1)$$

两个二次因式的判别式均为 $\Delta = 2 - 4 = -2 < 0$，在 $\mathbb{R}$ 上不可约。

> 此例说明：实数域定理中的 $Q(x)$ 无实根，不意味 $Q(x)$ 不可再分解。$x^4 + 1$ 在 $\mathbb{R}$ 上无根，却可分解为两个判别式 $< 0$ 的二次因式。这正是推论所断言的：实系数多项式在 $\mathbb{R}$ 上的不可约因式仅有一次式与 $\Delta < 0$ 的二次式两类。
````

### 23.4.3　因式定理与除法算法的协同：分解多项式



因式定理与除法算法的分工如下：

| 步骤 | 所用定理 | 作用 |
|:---|:---|:---|
| 检测 | 因式定理 | 计算 $P(a)$：若 $P(a) = 0$，则 $(z - a)$ 为因式 |
| 提取 | 除法算法 | 计算 $P(z) \div (z - a)$，得商式 $Q(z)$，满足 $P(z) = (z - a) \cdot Q(z)$ |

这是一个「检测 → 提取」的迭代循环：每找到一个因式，立即用除法算法将其提取出来，降低多项式次数，然后在新的商式上继续检测。由于除法算法保证了 $\deg Q = \deg P - 1$，每次迭代都使问题规模严格缩小，循环必然在有限步内终止。

````ad-alg
title: 算法（利用除法算法分解多项式） | Algorithm（Factoring Polynomials via the Division Algorithm）

1. **寻找候选根。** 从 $P(0), P(\pm 1), P(\pm 2), \dots$ 逐个测试。对于整系数多项式，整数根必为常数项 $a_0$ 的因数，因此只需测试有限个候选值。
2. **检测（因式定理）。** 代入候选值 $a$，计算 $P(a)$。若 $P(a) \neq 0$，则 $a$ 不是根，返回步骤 1。若 $P(a) = 0$，则 $(z - a)$ 为因式，进入步骤 3。
3. **提取（除法算法）。** 以 $P(z)$ 为被除式，$(z - a)$ 为除式，执行长除法，得 $P(z) = (z - a) \cdot Q(z)$，其中 $\deg Q = \deg P - 1$。
4. **检查重数。** 对商式 $Q(z)$ 再次检测 $Q(a)$：若 $Q(a) = 0$，则 $a$ 为重根，以 $Q(z)$ 为新的被除式，返回步骤 3 继续除以 $(z - a)$；否则 $a$ 的处理完成。
5. **迭代。** 以最终得到的降次多项式为新的 $P(z)$，返回步骤 1 继续搜寻其他根。

**终止条件**取决于所处的域：
- 在 $\mathbb{R}$ 上：无法再找到整数根，或剩余多项式为二次式可直接用十字相乘法处理；若剩余为高次且无实根，则由实数不可约因式推论可分解为判别式 $< 0$ 的二次因式之积。
- 在 $\mathbb{C}$ 上：由代数基本定理，循环会一直进行直至商式为常数，即多项式完全分解为一次因式之积。
````


> 此算法的效率来自除法算法的降次性质：每次成功提取一个一次因式，多项式次数严格减少 $1$，确保了算法的有限终止性。这与整数的质因数分解完全平行。

````ad-example
title: 示例（完全分解：三个单根） | Example（Complete Factorization: Three Simple Roots）

完全分解 $P(x) = x^3 - 6x^2 + 11x - 6$。

---

**寻找候选根。** 常数项 $-6$ 的因数为 $\pm 1, \pm 2, \pm 3, \pm 6$。测试 $x = 1$：

$$P(1) = 1 - 6 + 11 - 6 = 0$$

**提取。** $(x - 1) \mid P(x)$。长除法 $P(x) \div (x - 1)$，得 $Q(x) = x^2 - 5x + 6$。

**检查重数。** $Q(1) = 1 - 5 + 6 = 2 \neq 0$，故 $x = 1$ 为单根。

**迭代。** 对 $Q(x) = x^2 - 5x + 6$ 用十字相乘法（第四章）：

$$x^2 - 5x + 6 \equiv (x - 2)(x - 3)$$

故

$$P(x) \equiv (x - 1)(x - 2)(x - 3)$$

三个根 $1, 2, 3$ 均为单根，分解完成。
````

````ad-example
title: 示例（完全分解：含二重根） | Example（Complete Factorization: with a Double Root）

完全分解 $P(x) = x^4 - 2x^3 - 3x^2 + 4x + 4$。

---

**测试 $x = 1$。** $P(1) = 1 - 2 - 3 + 4 + 4 = 4 \neq 0$。

**测试 $x = -1$。** $P(-1) = 1 + 2 - 3 - 4 + 4 = 0$。✓

**提取。** 长除法 $P(x) \div (x + 1)$，得 $Q_1(x) = x^3 - 3x^2 + 4$。

**检查重数。** $Q_1(-1) = -1 - 3 + 4 = 0$。✓ 故 $x = -1$ 为重根。

**再次提取。** 长除法 $Q_1(x) \div (x + 1)$，得 $Q_2(x) = x^2 - 2x + 4$。

**检查重数。** $Q_2(-1) = 1 + 2 + 4 = 7 \neq 0$。故 $x = -1$ 为二重根。

**处理 $Q_2(x) = x^2 - 2x + 4$。** 判别式 $\Delta = 4 - 16 = -12 < 0$，在 $\mathbb{R}$ 上不可约。

故在 $\mathbb{R}$ 上：

$$P(x) \equiv (x + 1)^2 (x^2 - 2x + 4)$$

> 若在 $\mathbb{C}$ 上分解：$x^2 - 2x + 4 = 0$ 的根为 $x = \dfrac{2 \pm \sqrt{-12}}{2} = 1 \pm \sqrt{3}\,i$，故
> $$P(z) \equiv (z + 1)^2 (z - 1 - \sqrt{3}\,i)(z - 1 + \sqrt{3}\,i)$$
````

````ad-example
title: 示例（一个实根加不可约二次因式） | Example（One Real Root and an Irreducible Quadratic）

在 $\mathbb{R}$ 上分解 $P(x) = x^3 + x - 2$。

---

**测试 $x = 1$。** $P(1) = 1 + 1 - 2 = 0$。✓

**提取。** 长除法 $P(x) \div (x - 1)$，得 $Q(x) = x^2 + x + 2$。

**检查重数。** $Q(1) = 1 + 1 + 2 = 4 \neq 0$。故 $x = 1$ 为单根。

**处理 $Q(x) = x^2 + x + 2$。** 判别式 $\Delta = 1 - 8 = -7 < 0$，在 $\mathbb{R}$ 上不可约。

故在 $\mathbb{R}$ 上：

$$P(x) \equiv (x - 1)(x^2 + x + 2)$$

> $x^2 + x + 2$ 在 $\mathbb{R}$ 上无实根，但在 $\mathbb{C}$ 上有根 $x = \dfrac{-1 \pm \sqrt{7}\,i}{2}$。这正对应了实数域定理中 $Q(x)$ 无实根的情形，即 $Q(x)$ 为判别式 $< 0$ 的二次不可约因式。
````

---

## 23.5　最大公因式与最小公倍式

> **本节难度上限**：T B- ｜ C C+ ｜ E C ｜ Q C+

> 本节将整数的 H.C.F. 与 L.C.M. 概念迁移至单变量多项式。核心方法依赖于完全因式分解：在 $\mathbb{R}$ 上分解至一次及不可约二次因式，在 $\mathbb{C}$ 上分解至一次因式。

### 23.5.1　最大公因式

回顾第四章，公因式与最大公因式的概念适用于一般多项式。在单变量多项式语境下，可给出更具操作性的定义。

````ad-def
title: 定义（单变量多项式的最大公因式） | Definition（HCF of Univariate Polynomials）

设 $P(x), Q(x)$ 为两个非零单变量多项式，其完全因式分解为（将所有因式归一化为首一形式）：

$$P(x) = k \cdot f_1(x)^{p_1} f_2(x)^{p_2} \cdots f_r(x)^{p_r}, \qquad Q(x) = \ell \cdot f_1(x)^{q_1} f_2(x)^{q_2} \cdots f_r(x)^{q_r}$$

其中 $f_i(x)$ 为不可再分解的首一多项式，$p_i, q_i \ge 0$（若 $P$ 不含 $f_i$，则 $p_i = 0$）。则 $P$ 与 $Q$ 的**最大公因式 (highest common factor, H.C.F.)** 为所有公共因式取最低次幂的乘积：

$$\text{HCF}(P, Q) = f_1(x)^{\min(p_1, q_1)} f_2(x)^{\min(p_2, q_2)} \cdots f_r(x)^{\min(p_r, q_r)}$$

系数部分取 $k, \ell$ 的最大公因数。
````

````ad-alg
title: 算法（求最大公因式） | Algorithm（Finding the HCF）

1. 将每个多项式**完全因式分解**（运用第四章的因式分解方法、本章的因式定理及第六章的恒等式）。
2. 将所有因式归一化为**首一形式**。
3. 找出所有**公共的因式**。
4. 取每个公共因式的**最低次幂**相乘。
5. 系数部分取各多项式首项系数的最大公因数。
````

````ad-example
title: 示例（求 HCF：已分解的多项式） | Example（HCF of Factored Polynomials）

求 $P(x) = (x - 1)^2(x + 2)$ 与 $Q(x) = (x - 1)(x + 3)^3$ 的 HCF。

---

$P$ 与 $Q$ 已完全分解。公共因式为 $(x - 1)$（$P$ 中 $2$ 次，$Q$ 中 $1$ 次，取 $\min = 1$）。$(x + 2)$ 与 $(x + 3)$ 非公共因式。

$$\text{HCF}(P, Q) = (x - 1)$$
````

````ad-example
title: 示例（求 HCF：需先因式分解） | Example（HCF Requiring Factorization First）

求 $P(x) = x^2 - 1$ 与 $Q(x) = x^3 + x^2 - x - 1$ 的 HCF。

---

先因式分解。$P(x) \equiv (x - 1)(x + 1)$。

$Q(x)$：测试 $x = 1$，$1 + 1 - 1 - 1 = 0$，由因式定理 $(x - 1) \mid Q(x)$。长除法得 $Q(x) \equiv (x - 1)(x^2 + 2x + 1) \equiv (x - 1)(x + 1)^2$。

故 $P(x) = (x - 1)(x + 1)$，$Q(x) = (x - 1)(x + 1)^2$。公共因式为 $(x - 1)$（取 $1$ 次）、$(x + 1)$（取 $\min(1, 2) = 1$ 次）。

$$\text{HCF}(P, Q) = (x - 1)(x + 1) \equiv x^2 - 1$$
````

````ad-example
title: 示例（求 HCF：含重根） | Example（HCF with Multiple Roots）

求 $P(x) = (x - 2)^3(x + 1)$ 与 $Q(x) = (x - 2)^2(x - 3)$ 的 HCF。

---

$P$ 与 $Q$ 已完全分解。公共因式为 $(x - 2)$（$P$ 中 $3$ 次，$Q$ 中 $2$ 次，取 $\min = 2$）。

$$\text{HCF}(P, Q) = (x - 2)^2$$
````

### 23.5.2　最小公倍式

````ad-def
title: 定义（单变量多项式的最小公倍式） | Definition（LCM of Univariate Polynomials）

设 $P(x), Q(x)$ 为两个非零单变量多项式，其完全因式分解同上。则 $P$ 与 $Q$ 的**最小公倍式 (least common multiple, L.C.M.)** 为所有不同因式取最高次幂的乘积：

$$\text{LCM}(P, Q) = f_1(x)^{\max(p_1, q_1)} f_2(x)^{\max(p_2, q_2)} \cdots f_r(x)^{\max(p_r, q_r)}$$

系数部分取各多项式首项系数的最小公倍数。
````

````ad-alg
title: 算法（求最小公倍式） | Algorithm（Finding the LCM）

1. 将每个多项式**完全因式分解**。
2. 将所有因式归一化为**首一形式**。
3. 找出所有出现过的**不同因式**。
4. 取每个不同因式的**最高次幂**相乘。
5. 系数部分取各多项式首项系数的最小公倍数。
````

````ad-example
title: 示例（求 LCM：已分解的多项式） | Example（LCM of Factored Polynomials）

求 $P(x) = (x - 1)^2(x + 2)$ 与 $Q(x) = (x - 1)(x + 3)^3$ 的 LCM。

---

$P$ 与 $Q$ 已完全分解。所有不同因式为 $(x - 1)$、$(x + 2)$、$(x + 3)$，各取最高次幂：

$$\text{LCM}(P, Q) = (x - 1)^2(x + 2)(x + 3)^3$$
````

````ad-example
title: 示例（求 LCM：需先因式分解） | Example（LCM Requiring Factorization First）

求 $P(x) = x^2 - 1$ 与 $Q(x) = x^3 + x^2 - x - 1$ 的 LCM。

---

由 HCF 示例 2 已知 $P(x) \equiv (x - 1)(x + 1)$，$Q(x) \equiv (x - 1)(x + 1)^2$。所有不同因式为 $(x - 1)$、$(x + 1)$，各取最高次幂：

$$\text{LCM}(P, Q) = (x - 1)(x + 1)^2$$
````

````ad-example
title: 示例（求 LCM：三次×三次） | Example（LCM of Two Cubics）

求 $P(x) = (x - 2)^3(x + 1)$ 与 $Q(x) = (x - 2)^2(x - 3)$ 的 LCM。

---

$P$ 与 $Q$ 已完全分解。所有不同因式为 $(x - 2)$、$(x + 1)$、$(x - 3)$，各取最高次幂：

$$\text{LCM}(P, Q) = (x - 2)^3(x + 1)(x - 3)$$

> **验证 HCF·LCM 关系：** $\text{HCF} = (x-2)^2$（见 HCF 示例 3），$\text{HCF} \cdot \text{LCM} = (x-2)^5(x+1)(x-3) = P \cdot Q$。✓
````

### 23.5.3　HCF 与 LCM 的关系

````ad-thm
title: 定理（HCF 与 LCM 的关系） | Theorem（Relationship between HCF and LCM）

对任意两个非零单变量多项式 $P(x), Q(x)$，

$$\text{HCF}(P, Q) \cdot \text{LCM}(P, Q) = c \cdot P(x) \cdot Q(x)$$

其中 $c$ 为常数因子（来自系数归一化）。若忽略常数倍数的差异，可简记为：

$$\text{HCF}(P, Q) \cdot \text{LCM}(P, Q) \sim P(x) \cdot Q(x)$$
````

````ad-proof
title: 证明 | Proof

设 $P(x) = k \cdot f_1(x)^{p_1} f_2(x)^{p_2} \cdots f_r(x)^{p_r}$，$Q(x) = \ell \cdot f_1(x)^{q_1} f_2(x)^{q_2} \cdots f_r(x)^{q_r}$（将所有因式归一化为首一形式，$p_i, q_i \ge 0$）。则

$$\text{HCF}(P, Q) = \prod_i f_i(x)^{\min(p_i, q_i)}, \qquad \text{LCM}(P, Q) = \prod_i f_i(x)^{\max(p_i, q_i)}$$

对每个因式 $f_i$，由 $\min(p_i, q_i) + \max(p_i, q_i) = p_i + q_i$（两个数中较小者加较大者等于两者之和），故

$$\text{HCF}(P, Q) \cdot \text{LCM}(P, Q) = \prod_i f_i(x)^{\min(p_i, q_i) + \max(p_i, q_i)} = \prod_i f_i(x)^{p_i + q_i} = \prod_i f_i(x)^{p_i} \cdot \prod_i f_i(x)^{q_i}$$

而 $P(x) \cdot Q(x) = k\ell \cdot \prod_i f_i(x)^{p_i + q_i}$，故 $\text{HCF} \cdot \text{LCM} = \dfrac{1}{k\ell} \cdot P \cdot Q$，即 $\text{HCF} \cdot \text{LCM} \sim P \cdot Q$（差常数因子 $\dfrac{1}{k\ell}$）。
````

````ad-example
title: 示例（验证 HCF·LCM 关系） | Example（Verifying the HCF·LCM Relationship）

设 $P(x) = (x - 1)^2(x + 2)$，$Q(x) = (x - 1)(x + 2)^3$。验证 $\text{HCF} \cdot \text{LCM} \sim P \cdot Q$。

---

**HCF。** 公共因式为 $(x - 1)$、$(x + 2)$，取最低次幂：

$$\text{HCF} = (x - 1)^{\min(2,1)}(x + 2)^{\min(1,3)} = (x - 1)(x + 2)$$

**LCM。** 所有因式为 $(x - 1)$、$(x + 2)$，取最高次幂：

$$\text{LCM} = (x - 1)^{\max(2,1)}(x + 2)^{\max(1,3)} = (x - 1)^2(x + 2)^3$$

**验证。**

$$\text{HCF} \cdot \text{LCM} = (x - 1)(x + 2) \cdot (x - 1)^2(x + 2)^3 = (x - 1)^3(x + 2)^4$$

$$P \cdot Q = (x - 1)^2(x + 2) \cdot (x - 1)(x + 2)^3 = (x - 1)^3(x + 2)^4$$

两者相等。✓
````

### 23.5.4　与整数的类比

多项式 HCF/LCM 与整数的 HCF/LCM 在结构上完全平行：

| 概念 | 整数 | 单变量多项式 |
|:---|:---|:---|
| 基本构成单元 | 质数 | 不可约首一多项式（一次因式等） |
| 规范化约定 | 取正质数 | 归一化为首一形式 |
| HCF | 公共质因数取最低次幂 | 公共因式取最低次幂 |
| LCM | 所有质因数取最高次幂 | 所有因式取最高次幂 |
| HCF × LCM | $= a \times b$ | $\sim P(x) \cdot Q(x)$ |

### 23.5.5　有理函数的运算

回顾第四章，代数分式的运算原则是「先因式分解再约分」。有了 HCF 与 LCM，这些运算有了更系统的工具。

- **约分**：分子分母同除以 HCF。
- **通分**：分母取 LCM。
- **乘除**：先因式分解，约去公因式后相乘（除法取倒数转化为乘法）。
- **加减**：通分后分子加减，分母保持 LCM。

````ad-example
title: 示例（求 HCF 与 LCM） | Example（Finding HCF and LCM）

求 $P(x) = x^2 - 4$ 与 $Q(x) = x^2 + 4x + 4$ 的 HCF 与 LCM。

---

**完全因式分解。**

$$P(x) = (x - 2)(x + 2), \qquad Q(x) = (x + 2)^2$$

归一化为首一形式（已满足）。

**HCF。** 公共因式为 $(x + 2)$，最低次幂：$P$ 中 $1$ 次，$Q$ 中 $2$ 次，取 $\min(1, 2) = 1$。

$$\text{HCF}(P, Q) = (x + 2)$$

**LCM。** 所有因式为 $(x - 2)$、$(x + 2)$，最高次幂：$(x - 2)$ 取 $1$ 次，$(x + 2)$ 取 $\max(1, 2) = 2$ 次。

$$\text{LCM}(P, Q) = (x - 2)(x + 2)^2$$

>  $\text{HCF} \cdot \text{LCM} \equiv (x+2)(x-2)(x+2)^2 \equiv (x-2)(x+2)^3$，而 $P \cdot Q \equiv (x-2)(x+2)(x+2)^2 = (x-2)(x+2)^3$。两者相等。
````

````ad-example
title: 示例（有理分式的约分） | Example（Simplifying a Rational Expression by Cancellation）

化简 $\dfrac{x^3 - 3x + 2}{x^3 - 1}$。

---

分子 $x^3 - 3x + 2$：测试 $x = 1$，$1 - 3 + 2 = 0$，由因式定理 $(x - 1) \mid (x^3 - 3x + 2)$。长除法得 $x^3 - 3x + 2 = (x - 1)(x^2 + x - 2) = (x - 1)^2(x + 2)$。

分母 $x^3 - 1$：由第六章立方差恒等式，$x^3 - 1 = (x - 1)(x^2 + x + 1)$。

故

$$\frac{x^3 - 3x + 2}{x^3 - 1} \equiv \frac{(x - 1)^2 (x + 2)}{(x - 1)(x^2 + x + 1)}$$

分子与分母的 HCF 为 $(x - 1)$。约去公因式：

$$\frac{(x - 1)^2 (x + 2)}{(x - 1)(x^2 + x + 1)} \equiv \frac{(x - 1)(x + 2)}{x^2 + x + 1}$$
````

````ad-example
title: 示例（有理分式的加减） | Example（Addition of Rational Expressions）

计算 $\dfrac{1}{x^3 - 1} + \dfrac{1}{x^2 - 1}$。

---

分母因式分解：

$$x^3 - 1 \equiv (x - 1)(x^2 + x + 1), \qquad x^2 - 1 \equiv (x - 1)(x + 1)$$

两个分母的 LCM 为 $(x - 1)(x + 1)(x^2 + x + 1)$。通分：

$$\frac{1}{(x-1)(x^2+x+1)} + \frac{1}{(x-1)(x+1)} \equiv \frac{x+1}{(x-1)(x+1)(x^2+x+1)} + \frac{x^2+x+1}{(x-1)(x+1)(x^2+x+1)}$$

分子相加：

$$\frac{(x+1) + (x^2+x+1)}{(x-1)(x+1)(x^2+x+1)} \equiv \frac{x^2 + 2x + 2}{(x-1)(x+1)(x^2+x+1)}$$
````

---

## 23.6　小结 (Summary)

### 六条主线

1. **单变量多项式**（§23.1）：仅含一个变量的多项式，记为 $P(z) = a_n z^n + \cdots + a_0$。$P$ 是从 $\mathbb{C}$（或 $\mathbb{R}$）到自身的函数，使「代入求值」$P(a)$ 成为函数求值。**首一多项式**为首项系数 $= 1$ 者，因式分解中常将因式归一化为首一形式以便比较。相等条件为次数相同且各项系数相等。

2. **除法算法与整除**（§23.2）：对任意 $P(z), D(z) \neq 0$，存在唯一的 $Q(z), R(z)$ 使得 $P = DQ + R$，$\deg R < \deg D$。长除法是执行此算法的标准方法。**整除**：$D(z) \mid P(z) \iff$ 存在 $Q(z)$ 使 $P = DQ$ $\iff$ 余式 $R = 0$。

3. **余式定理**（§23.3）：$P(z)$ 除以 $(z - a)$ 的余式 $= P(a)$。推论：除以 $(az - b)$ 的余式 $= P(b/a)$。仅适用于一次除式；高次除式须用长除法。

4. **因式定理**（§23.4.1）：$(z - a) \mid P(z) \iff P(a) = 0$。建立了根与因式之间的基本双向联系。与除法算法形成「检测 → 提取」的协同机制：因式定理判断因式，除法算法将其分离，每次降次 $1$，迭代至分解完成。

5. **根与因式的深层关系**（§23.4.2，分 $\mathbb{R}$ 和 $\mathbb{C}$ 两个层次）：
   - **重根**：$(z - a)^m \mid P$ 但 $(z - a)^{m+1} \nmid P$，$m$ 为重数。
   - **因式的整除传递性**：多项式版本的欧几里得引理：一次因式在多项式中具有「质数性」。
   - **在 $\mathbb{R}$ 上**：$n$ 次多项式至多有 $n$ 个不同的根；$P(x) = a_n \prod (x - a_i)^{m_i} \cdot Q(x)$，$Q(x)$ 无实根。
   - **提升至 $\mathbb{C}$**：代数基本定理（非常数复系数多项式必有复根）$\implies$ 完全分解 $P(z) = a_n \prod (z - z_i)$。共轭根定理（实系数多项式的非实复根成对出现）$\implies$ 实系数多项式在 $\mathbb{R}$ 上的不可约因式仅有一次式及 $\Delta < 0$ 的二次式。

6. **HCF 与 LCM**（§23.5）：将多项式完全因式分解并归一化为首一形式后，公共因式取最低次幂得 HCF，所有因式取最高次幂得 LCM。满足 $\text{HCF} \cdot \text{LCM} \sim P \cdot Q$。有理函数的约分用 HCF，通分用 LCM。

### 公式总表

| 定理 / 概念 | 公式 / 结论 | 适用范围 |
|:---|:---|:---|
| 除法算法 | $P = DQ + R$，$\deg R < \deg D$ | 任意除式 |
| 余式定理 | 余式 $= P(a)$ | 除式为 $(z - a)$ |
| 余式定理推论 | 余式 $= P(b/a)$ | 除式为 $(az - b)$ |
| 因式定理 | $(z - a) \mid P \iff P(a) = 0$ | 一次因式 |
| 根数上界 | $n$ 次多项式至多 $n$ 个不同根 | $\mathbb{R}$ 或任意域 |
| $\mathbb{R}$ 上结构 | $P = a_n \prod (x - a_i)^{m_i} \cdot Q$，$Q$ 无实根 | $\mathbb{R}$ |
| $\mathbb{C}$ 完全分解 | $P = a_n \prod (z - z_i)$（计重数） | $\mathbb{C}$ |
| 共轭根定理 | 实系数 $\implies$ 非实复根成对 | 实系数多项式 |
| $\mathbb{R}$ 不可约因式 | 仅一次式及 $\Delta < 0$ 的二次式 | 实系数多项式 |
| HCF | $\prod f_i^{\min(p_i, q_i)}$ | $\mathbb{R}$ 或 $\mathbb{C}$ |
| LCM | $\prod f_i^{\max(p_i, q_i)}$ | $\mathbb{R}$ 或 $\mathbb{C}$ |
| HCF × LCM | $\sim P \cdot Q$ | $\mathbb{R}$ 或 $\mathbb{C}$ |

### $\mathbb{R}$ 与 $\mathbb{C}$ 对照表

| 域 | 根的存在性 | 因式分解结构 | 不可约因式 |
|:---|:---|:---|:---|
| $\mathbb{R}$ | $n$ 次多项式未必有实根 | $P = a_n \prod (x - a_i)^{m_i} \cdot Q$，$Q$ 无实根 | 一次式及 $\Delta < 0$ 的二次式 |
| $\mathbb{C}$ | 每个非常数多项式必有根 | $P = a_n \prod (z - z_i)$，完全分解 | 仅有一次式 |

---

## 词汇表 (Vocabulary)

| 中文 | 英文 | 备注 |
|------|------|------|
| 单变量多项式 | univariate polynomial | $P(z) \in \mathbb{C}[z]$ |
| 首项 | leading term | $a_n z^n$ |
| 首项系数 | leading coefficient | $a_n$ |
| 首一多项式 | monic polynomial | 首项系数 $= 1$ |
| 零多项式 | zero polynomial | $P(z) = 0$，$\deg 0 = -1$ |
| 次数 | degree | $\deg P$ |
| 除法算法 | division algorithm | $P = DQ + R$，$\deg R < \deg D$ |
| 被除式 | dividend | $P(z)$ |
| 除式 | divisor | $D(z)$ |
| 商式 | quotient | $Q(z)$ |
| 余式 | remainder | $R(z)$ |
| 长除法 | long division | |
| 整除 | divisibility | $D(z) \mid P(z)$ |
| 因式 | factor | $D(z) \mid P(z)$ |
| 倍式 | multiple | $P(z) = D(z) Q(z)$ |
| 余式定理 | remainder theorem | 余式 $= P(a)$ |
| 因式定理 | factor theorem | $(z - a) \mid P \iff P(a) = 0$ |
| 根 / 零点 | root / zero | $P(a) = 0$ |
| 重根 | multiple root | $m \ge 2$ |
| 重数 | multiplicity | $m$ |
| 单根 | simple root | $m = 1$ |
| 二重根 | double root | $m = 2$ |
| 代数基本定理 | fundamental theorem of algebra | 非常数复系数多项式必有复根 |
| 完全因式分解 | complete factorization | $\mathbb{C}$ 上分解为一次因式之积 |
| 共轭根定理 | conjugate root theorem | 实系数多项式的非实复根成对 |
| 不可约因式 | irreducible factor | $\mathbb{R}$ 上：一次式或 $\Delta < 0$ 的二次式 |
| 最大公因式 | highest common factor (H.C.F.) | 公共因式取最低次幂 |
| 最小公倍式 | least common multiple (L.C.M.) | 所有因式取最高次幂 |
| 有理函数 | rational function | 多项式之商 |

---

## 备课提示 (Teaching Notes)

* **变量记号 $z$ 的引入**：本章以 $z$ 为通用变量，因所述定理对 $\mathbb{C}$ 和 $\mathbb{R}$ 均成立。须在 §23.1 明确约定：当上下文限定 $\mathbb{R}$ 时写回 $x$。提醒学生 $z$ 与 $x$ 的切换不是随意的，而是域的标识。

* **除法算法的定位**：除法算法是本章的核心结构定理，它保证了商式与余式的存在性与唯一性，是余式定理与因式定理的理论根基。存在性证明用归纳法（对 $\deg P$），唯一性用反证法。建议存在性详讲，唯一性简述。

* **余式定理的适用范围**：余式定理仅适用于除式为一次式 $(z - a)$ 的情形。当除式为高次式（如 $z^2 + 1$）时，余式不再是常数，必须用长除法。这是学生常犯的错误（见 §23.3 示例。

* **因式定理的「检测—提取」循环**：因式定理负责检测，除法算法负责提取。每次提取降次 $1$，保证有限终止。这是系统化分解多项式的核心机制，须让学生动手执行完整流程。

* **$\mathbb{R}$ 与 $\mathbb{C}$ 的对照**：本章最深刻的结论是「实系数多项式在 $\mathbb{C}$ 上可完全分解为一次因式之积，在 $\mathbb{R}$ 上则分解为一次式与 $\Delta < 0$ 的二次式之积」。须用对照表强化，并用具体例子（如 $x^4 + 1$）说明 $Q(x)$ 无实根但仍可分解为二次式。

* **共轭根定理的证明**：此证明简洁优美，展示了共轭运算的性质（$\overline{a_i} = a_i$ 对实系数成立）。建议完整呈现，作为「实系数」条件的关键应用。

* **代数基本定理的处理**：证明超出 DSE 范围（需复分析或拓扑学），作为已知事实接受。须明确告知学生这是「接受」而非「证明」，避免误解。

* **HCF/LCM 与整数的类比**：多项式 HCF/LCM 与整数 HCF/LCM 在结构上完全平行。建议用对照表呈现，帮助学生迁移已有知识。规范化约定：整数取正质数，多项式归一化为首一形式。

* **有理根定理的定位**：作为寻找候选根的系统化工具，给结论但不证明。实务上亦可从 $P(0), P(\pm 1), P(\pm 2), \dots$ 逐个测试。强调这是「候选」，仍须用因式定理验证。

* **TikZ 插图**：本章共 2 张插图。图 23-1 展示单根与重根的图像特征（穿过 $x$ 轴 vs 相切），帮助学生直观理解重数。图 23-2 展示复平面上的共轭根对，强化「成对出现」的几何直观。TikZJax 不支持中文出现在 title、node 等命令参数中，故图形内文字一律用英文/数学符号。

---

<sub>本章撰写于 2026 年 7 月 19 日。</sub>
