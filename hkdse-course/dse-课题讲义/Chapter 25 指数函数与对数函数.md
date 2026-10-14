---
tags: DSE课程笔记
---

# 25　指数函数与对数函数（Exponential and Logarithmic Functions）

> 第三章把指数记号从正整数推广至全体整数，建立了五大整数指数定律。第六章又引入了 $n$ 次方根与分数指数记号 $a^{1/2}=\sqrt{a}$、$a^{1/3}=\sqrt[3]{a}$。本章把这些零散的线索汇成一条主线：把指数从整数推广到有理数、再到全体实数，从而定义**指数函数** $E_a: x \mapsto a^x$；再由指数函数的严格单调性引入其逆变换，即**对数函数** $L_a: x \mapsto \log_a x$。
>
> 对数并非凭空发明。1614 年，苏格兰贵族纳皮尔（John Napier）为简化天文与航海中的大数乘除运算而发明对数，其核心思想是「把乘法化为加法」，这正是对数运算律 $\log_a(MN) \equiv \log_a M+\log_a N$ 的历史根源。其后布里格斯（Henry Briggs）改良为以 10 为底的常用对数，制作了对数表，使三代科学家与工程师在电子计算器出现之前得以高效完成数值计算。本章末尾的小结将回到这条历史脉络。
>
> 本章按概念依赖顺序铺排：先建立 $n$ 次方根的严格理论并推广至有理指数的完整定义与运算律（§25.1）；再用确界把指数扩张至实数，定义指数函数并讨论其性质与图像（§25.2）；由严格单调性引入对数，建立对数的运算律、换底公式与对数函数的图像（§25.3）；随后处理最基本的指数与对数方程（§25.4）；最后讨论对数坐标变换（线性化）（§25.5），并作全章总结（§25.6）。

前置：[[Chapter 3 整数指数律与进制|整数指数律与进制]]、[[Chapter 6 代数式|代数式]]、[[Chapter 16 集合论|集合论]]、[[Chapter 17 数系(II)|数系(II)]]、[[Chapter 19 函数及其图像|函数及其图像]]

---

## 25.1　有理数指数（Rational Exponents）

> **本节难度上限**：T B+ ｜ C C ｜ E B ｜ Q C

> 本节把指数从整数推广至有理数。关键步骤是先严格建立 $n$ 次方根的理论（§25.1.1），再用方根定义 $a^{m/n}$（§25.1.2），最后验证五大指数运算律在有理指数上仍然成立（§25.1.3）。

### 25.1.1　$n$ 次方根


````ad-def
title: 定义（$n$ 次方根） | Definition（$n$-th Root）

设 $n \ge 2$ 为正整数，$a$ 为实数。若存在实数 $x$ 使得 $x^n = a$，则称 $x$ 为 $a$ 的一个 **$n$ 次方根（$n$-th root）**。
````

$n$ 次方根的个数与存在性取决于 $n$ 的奇偶性及 $a$ 的正负。以下定理给出完整结论。

````ad-thm
title: 定理（$n$ 次方根的存在性与唯一性） | Theorem（Existence and Uniqueness of $n$-th Roots）

设 $n \ge 2$ 为正整数，$a$ 为实数。考虑方程 $x^n = a$：

1. 若 $n$ 为**奇数**，则对任意实数 $a$，方程 $x^n = a$ 恰有**唯一**实根，记为 $\sqrt[n]{a}$。
2. 若 $n$ 为**偶数**且 $a > 0$，则方程有**两个**实根：$\sqrt[n]{a}$ 与 $-\sqrt[n]{a}$。
3. 若 $n$ 为**偶数**且 $a = 0$，则方程的唯一实根为 $0$。
4. 若 $n$ 为**偶数**且 $a < 0$，则方程**无实根**。
````

````ad-proof
title: 证明 | Proof

**奇数情形（$n$ 奇）：** 考虑函数 $f(x) = x^n$。当 $n$ 为奇数时，$f$ 在 $\mathbb{R}$ 上严格递增：若 $x_1 < x_2$，则 $x_1^n < x_2^n$（奇数次幂保号且递增）。

> 与偶数情形同理，根的存在性需要用到连续函数的介值定理，这对当前课程范围而言是超纲的，故以下证明作欣赏之用：
>
> 因 $f(x) = x^n$ 连续，且当 $x \to +\infty$ 时 $f(x) \to +\infty$、$x \to -\infty$ 时 $f(x) \to -\infty$，由介值定理，对任意实数 $a$，方程 $x^n = a$ 至少有一个实根。

再由严格递增性，此根唯一。

**偶数情形（$n$ 偶，$a > 0$）：** 当 $n$ 为偶数时 $x^n = (-x)^n$，故根成对出现。
>证明 $\sqrt[n]{a}$ 的存在性需要用到数学分析中的“介值定理”，这对当前课程范围而言是超纲的，故以下证明此作欣赏之用：
>
>在 $x \ge 0$ 上 $f(x) = x^n$ 严格递增且连续，$f(0) = 0 < a$，且 $f(x) \to +\infty$（$x \to +\infty$），由介值定理存在唯一正根 $\sqrt[n]{a}$。由对称性 $(-\sqrt[n]{a})^n = a$，故 $-\sqrt[n]{a}$ 亦为根，且无其他根。

**偶数情形（$n$ 偶，$a = 0$）：** $x^n = 0 \iff x = 0$，唯一根为 $0$。

**偶数情形（$n$ 偶，$a < 0$）：** 偶数次幂 $x^n \ge 0$ 恒成立，故 $x^n = a < 0$ 无实根。
````

````ad-note
title: 注记（连续性与介值定理） | Note（Continuity and Intermediate Value Theorem）

上述证明用到了**连续函数的介值定理**：若 $f$ 在区间 $[a,b]$ 上连续，且 $f(a)$ 与 $f(b)$ 异号，则存在 $c \in (a,b)$ 使 $f(c) = 0$。这是微积分的核心结论之一，超出 DSE 必修范围。

此处将连续性与介值定理作为已知事实接受，严格证明留待大学微积分课程。
````

在偶数情形中，$a > 0$ 有两个方根 $\pm\sqrt[n]{a}$，其中非负的那个 $\sqrt[n]{a}$ 需要一个专门名称。

````ad-def
title: 定义（算术 $n$ 次方根） | Definition（Principal $n$-th Root）

设 $n \ge 2$ 为正整数。在 $n$ 次方根存在的前提下，**非负**的那个方根称为 **算术 $n$ 次方根（principal $n$-th root）**，记为 $\sqrt[n]{a}$。

- 当 $n$ 为偶数且 $a > 0$ 时，$\sqrt[n]{a}$ 为正根，另一根为 $-\sqrt[n]{a}$。
- 当 $n$ 为奇数时，$\sqrt[n]{a}$ 为唯一根（可正可负）。
````

 后续讨论有理指数（§25.2.1）的单调性时，需要用到「算术 $n$ 次方根保持大小关系」这一性质；而它又可由「幂的保序性」推出。
 
 这些序关系此前都未严格证明，故在此先补三条「保序」引理：第一条给出差幂的因式分解恒等式作为工具，第二条由它推出幂的保序性，第三条再由幂的保序性反证出算术 $n$ 次方根的保序性。

````ad-lem
title: 引理（差幂的因式分解） | Lemma（Factorization of the Difference of Powers）

设 $t_1, t_2$ 为实数，$n$ 为正整数，则

$$t_2^n - t_1^n \equiv (t_2 - t_1)\left(t_2^{n-1} + t_2^{n-2}t_1 + \cdots + t_2 t_1^{n-2} + t_1^{n-1}\right).$$
````

````ad-proof
title: 证明 | Proof

将右边展开：

$$(t_2 - t_1)\left(t_2^{n-1} + t_2^{n-2}t_1 + \cdots + t_2 t_1^{n-2} + t_1^{n-1}\right) \equiv \left(t_2^n + t_2^{n-1}t_1 + \cdots + t_2 t_1^{n-1}\right) - \left(t_2^{n-1}t_1 + \cdots + t_2 t_1^{n-1} + t_1^n\right) \equiv t_2^n - t_1^n,$$

中间 $n-1$ 个交叉项两两抵消。
````

> 有了差幂的因式分解恒等式，便能证明「幂保持大小关系」——这是本组引理的核心结论。

````ad-lem
title: 引理（幂的保序性） | Lemma（Order-preserving Property of Powers）

设 $n$ 为正整数。若 $0 \le t_1 < t_2$，则 $t_1^n < t_2^n$。
````

````ad-proof
title: 证明 | Proof

由差幂的因式分解引理，

$$t_2^n - t_1^n \equiv (t_2 - t_1)\left(t_2^{n-1} + t_2^{n-2}t_1 + \cdots + t_2 t_1^{n-2} + t_1^{n-1}\right).$$

因 $t_2 - t_1 > 0$，且括号内每一项都 $\ge 0$（因 $t_2, t_1 \ge 0$）且首项 $t_2^{n-1} > 0$，故括号内整体 $> 0$，从而 $t_2^n - t_1^n > 0$，即 $t_1^n < t_2^n$。
````

由幂的保序性，反证即可得到「算术 $n$ 次方根保持大小关系」。

````ad-lem
title: 引理（算术 $n$ 次方根的保序性） | Lemma（Order-preserving Property of Principal $n$-th Roots）

设 $n$ 为正整数。若 $0 \le t_1 < t_2$，则 $\sqrt[n]{t_1} < \sqrt[n]{t_2}$。
````

````ad-proof
title: 证明 | Proof

（反证法）假设 $\sqrt[n]{t_1} \ge \sqrt[n]{t_2}$。若 $\sqrt[n]{t_1} = \sqrt[n]{t_2}$，则两边 $n$ 次方得 $t_1 = t_2$，与 $t_1 < t_2$ 矛盾；若 $\sqrt[n]{t_1} > \sqrt[n]{t_2}$，因 $\sqrt[n]{t_1}, \sqrt[n]{t_2} \ge 0$，由幂的保序性得 $t_2 = \left(\sqrt[n]{t_2}\right)^n < \left(\sqrt[n]{t_1}\right)^n = t_1$，与 $t_1 < t_2$ 矛盾。故 $\sqrt[n]{t_1} < \sqrt[n]{t_2}$。
````

````ad-thm
title: 定理（$n$ 次方根的乘法性质） | Theorem（Multiplicative Property of $n$-th Roots）

$$\sqrt[n]{ab} \equiv \sqrt[n]{a}\,\sqrt[n]{b}$$

- 当 $n$ 为奇数时，$a, b$ 为任意实数。
- 当 $n$ 为偶数时，$a, b$ 为任意非负实数。
````

此定理已在[[Chapter 6 代数式|第六章]] §6.3.3 证明，此处不再重复。

````ad-note
title: 注记（底数约定） | Note（Convention on the Base）

为使后续有理指数 $a^{m/n}$ 的推广对所有有理数 $m/n$ 均有实数结果，本章约定**底数 $a > 0$**。此约定同时避免了偶次方根中负底数无实根的问题。在此约定下，$\sqrt[n]{a}$ 恒为正实数（算术根），使 $a^{1/n}$ 的定义良定义。
````

````ad-example
title: 示例 | Example


计算下列各式的值，并指出其中的算术根。

1. $\sqrt[4]{16}$
2. $\sqrt[3]{-27}$
3. $\sqrt[6]{64}$

---

1. $2^4 = 16$，故 $\sqrt[4]{16} = 2$（算术根，另一根为 $-2$）。
2. $(-3)^3 = -27$，故 $\sqrt[3]{-27} = -3$（奇数次唯一根）。
3. $2^6 = 64$，故 $\sqrt[6]{64} = 2$（算术根，另一根为 $-2$）。
````

````ad-example
title: 示例 | Example


判断下列方根是否为实数。

1. $\sqrt[4]{-81}$
2. $\sqrt[5]{-32}$
3. $\sqrt[6]{-1}$

---

1. $n=4$ 为偶数，$a = -81 < 0$，由定理**无实根**。
2. $n=5$ 为奇数，对任意实数 $a$ 均有唯一实根。$(-2)^5 = -32$，故 $\sqrt[5]{-32} = -2$。
3. $n=6$ 为偶数，$a = -1 < 0$，由定理**无实根**。
````

---

### 25.1.2　有理数指数的定义

> 本节把指数从整数推广至有理数。推广的核心原则与第三章一致：**保持指数运算律对所有指数成立**。

由指数律 $(a^p)^q \equiv a^{pq}$，若取 $p = 1/n$，则 $(a^{1/n})^n \equiv a$，即 $a^{1/n}$ 是方程 $x^n = a$ 的解。须强调的是：当 $n$ 为偶数且 $a > 0$ 时，$x^n = a$ 有两个解 $\pm\sqrt[n]{a}$，而 $a^{1/n}$ 约定取其中的**算术 $n$ 次方根** $\sqrt[n]{a}$（非负主根）。因本章底数约定 $a > 0$，算术根 $\sqrt[n]{a}$ 为正实数，使 $a^{1/n}$ 良定义。

````ad-def
title: 定义（有理数指数） | Definition（Rational Exponent）

设 $a > 0$，$m, n$ 为正整数，$n \ge 2$：

1. $a^{1/n} = \sqrt[n]{a}$（算术 $n$ 次方根）。
2. $a^{m/n} = \left(a^{1/n}\right)^m = \left(\sqrt[n]{a}\right)^m$。
3. $a^{-m/n} = \dfrac{1}{a^{m/n}}$。
4. $a^0 = 1$。
   
````

此定义与[[Chapter 6 代数式|第六章]]已引入的分数指数记号 $a^{1/2} = \sqrt{a}$、$a^{1/3} = \sqrt[3]{a}$ 相一致，本节将其推广至一般的有理指数 $a^{m/n}$。

````ad-thm
title: 定理（有理指数的良定义性） | Theorem（Well-definedness of Rational Exponents）

设 $a > 0$。若 $\dfrac{m}{n} = \dfrac{p}{q}$（$m, n, p, q$ 为正整数），则 $a^{m/n} = a^{p/q}$。

即有理指数的值不依赖于分数的表示方式。
````

````ad-proof
title: 证明 | Proof

设 $\dfrac{m}{n} = \dfrac{p}{q}$，则 $mq = np$。

为使两个分母 $n$、$q$ 都化为 $nq$ 的约数，取公共基准 $b = a^{1/(nq)}$（即 $a$ 的 $nq$ 次方根）。则

$$a^{m/n} = \left(a^{1/n}\right)^m = \left(\left(a^{1/(nq)}\right)^q\right)^m = b^{qm} = b^{mq}$$

同理，对 $a^{p/q}$ 亦化到同一基准：

$$a^{p/q} = \left(a^{1/q}\right)^p = \left(\left(a^{1/(nq)}\right)^n\right)^p = b^{np}$$

由 $mq = np$ 知 $b^{mq} = b^{np}$，故 $a^{m/n} = a^{p/q}$。

即有理指数的值只取决于比值本身，与分数的具体表示无关。
````

在证明了有理指数的良定义性后，可知对有理指数的那四条定义与既有定义相容：当 $n = 1$ 时 $a^{m/1} = a^m$，退化为整数指数。

````ad-example
title: 示例 | Example


计算下列各式的值。

1. $8^{2/3}$
2. $27^{-2/3}$
3. $16^{3/4}$

---

1. $8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4$。
2. $27^{-2/3} = \dfrac{1}{27^{2/3}} = \dfrac{1}{\left(\sqrt[3]{27}\right)^2} = \dfrac{1}{3^2} = \dfrac{1}{9}$。
3. $16^{3/4} = \left(\sqrt[4]{16}\right)^3 = 2^3 = 8$。
````

````ad-example
title: 示例 | Example


将下列根式表为有理指数形式。

1. $\sqrt[3]{x^2}$
2. $\sqrt{(a+b)^5}$

---

1. $\sqrt[3]{x^2} = (x^2)^{1/3} = x^{2/3}$。
2. $\sqrt{(a+b)^5} = \left((a+b)^5\right)^{1/2} = (a+b)^{5/2}$。
````

---

### 25.1.3　有理指数运算律


````ad-thm
title: 定理（有理指数运算律） | Theorem（Laws of Rational Exponents）

设 $a, b > 0$，$p, q \in \mathbb{Q}$，则：

1. $a^p \cdot a^q \equiv a^{p+q}$
2. $\dfrac{a^p}{a^q} \equiv a^{p-q}$
3. $(a^p)^q \equiv a^{pq}$
4. $(ab)^p \equiv a^p b^p$
5. $\left(\dfrac{a}{b}\right)^p \equiv \dfrac{a^p}{b^p}$
````

````ad-proof
title: 证明 | Proof

设 $p = \dfrac{m}{n}$，$q = \dfrac{r}{s}$（$m, n, r, s$ 为正整数，负指数情形由 $a^{-p} = 1/a^p$ 化归）。令 $b = a^{1/(ns)}$，则

$$a^{m/n} = \left(a^{1/n}\right)^m = \left(\left(a^{1/(ns)}\right)^s\right)^m = b^{ms},$$

$$a^{r/s} = \left(a^{1/s}\right)^r = \left(\left(a^{1/(ns)}\right)^n\right)^r = b^{nr}.$$

**律 1（乘法）**：

$$a^{m/n} \cdot a^{r/s} = b^{ms} \cdot b^{nr} = b^{ms+nr} = a^{(ms+nr)/(ns)} = a^{m/n + r/s}.$$

**律 2（除法）**：

$$\dfrac{a^{m/n}}{a^{r/s}} = \dfrac{b^{ms}}{b^{nr}} = b^{ms-nr} = a^{(ms-nr)/(ns)} = a^{m/n - r/s}.$$

**律 3（幂的幂）**：

$$\left(a^{m/n}\right)^{r/s} = \left(b^{ms}\right)^{r/s} = \left(\left(b^{ms}\right)^{1/s}\right)^r = \left(b^{m}\right)^r = b^{mr} = a^{mr/(ns)} = a^{(m/n)(r/s)}.$$

**律 4（积的幂）**：由 §25.1.1 方根乘法性质 $\sqrt[n]{ab} \equiv \sqrt[n]{a}\,\sqrt[n]{b}$，即 $(ab)^{1/n} \equiv a^{1/n}b^{1/n}$，故

$$(ab)^{m/n} = \left((ab)^{1/n}\right)^m = \left(a^{1/n}b^{1/n}\right)^m = a^{m/n}\,b^{m/n}.$$

**律 5（商的幂）**：在律 4 中以 $\dfrac{1}{b}$ 代 $b$，得

$$\left(\dfrac{a}{b}\right)^{m/n} = \left(a \cdot \dfrac{1}{b}\right)^{m/n} = a^{m/n}\left(\dfrac{1}{b}\right)^{m/n} = \dfrac{a^{m/n}}{b^{m/n}}.$$
````

````ad-note
title: 注记（与整数指数律的形式对照） | Note（Formal Parallel with Integer Exponent Laws）

有理指数运算律与[[Chapter 3 整数指数律与进制|第三章]]的整数指数定律形式完全一致。这是推广「形式不变」的体现：无论指数是整数还是有理数，运算律的写法不变。
````

````ad-example
title: 示例 | Example


化简下列各式。

1. $a^{2/3} \cdot a^{5/6}$
2. $\left(x^{3/4}\right)^{8/3}$
3. $\dfrac{a^{1/2} b^{1/3}}{a^{1/3} b^{1/2}}$

---

1. $a^{2/3} \cdot a^{5/6} \equiv a^{2/3 + 5/6} \equiv a^{4/6 + 5/6} \equiv a^{9/6} \equiv a^{3/2}$。
2. $\left(x^{3/4}\right)^{8/3} \equiv x^{(3/4)(8/3)} \equiv x^{2}$。
3.
$$\begin{aligned}[t]
\dfrac{a^{1/2} b^{1/3}}{a^{1/3} b^{1/2}} &\equiv a^{1/2 - 1/3}\, b^{1/3 - 1/2} \\
&\equiv a^{1/6}\, b^{-1/6} \\
&\equiv \dfrac{a^{1/6}}{b^{1/6}} \\
&\equiv \left(\dfrac{a}{b}\right)^{1/6}.
\end{aligned}$$
````

---

## 25.2　指数函数（Exponential Functions）

> **本节难度上限**：T A ｜ C D+ ｜ E B+ ｜ Q C+

> 本节先把指数从有理数扩张至全体实数（§25.2.1），再定义指数函数（§25.2.2），讨论其代数与分析性质（§25.2.3），最后绘制其图像（§25.2.4）。

### 25.2.1　实数指数的扩张

定理 25.3 已将五条指数运算律确立在有理指数上。但指数尚未扩张至全体实数，例如 $a^{\sqrt{2}}$ 中 $\sqrt{2}$ 是无理数，其意义尚待定义。

扩张的策略与[[Chapter 17 数系(II)|第十七章]]中从有理数构造实数的思路一致：**用有理数逼近**。第十七章以戴德金分割定义实数，每个实数 $x$ 由全体不超过 $x$ 的有理数所刻画。实数指数的定义亦然：$a^x$ 由全体 $a^r$（$r \in \mathbb{Q}$，$r \le x$）的确界所定义。

为此，先确立一条定理与一条引理，再给出正式定义。

````ad-thm
title: 定理（有理指数的单调性） | Theorem（Monotonicity of Rational Exponents）

设 $a > 0$，$r_1 < r_2$ 为有理数。

1. 若 $a > 1$，则 $a^{r_1} < a^{r_2}$（即函数 $r \mapsto a^r$ 在 $\mathbb{Q}$ 上严格递增）。
2. 若 $0 < a < 1$，则 $a^{r_1} > a^{r_2}$（即函数 $r \mapsto a^r$ 在 $\mathbb{Q}$ 上严格递减）。
````

````ad-proof
title: 证明 | Proof

设 $a > 1$。令 $h = r_2 - r_1 > 0$ 为有理数，则 $a^{r_2} = a^{r_1}\cdot a^h$。

只须证 $a^h > 1$：设 $h = \dfrac{m}{n}$（$m, n$ 为正整数），由 §25.1.1 引理（幂的保序性）得 $1^m < a^m$，即 $a^m > 1$；再由 §25.1.1 引理（算术 $n$ 次方根的保序性）得 $\sqrt[n]{1} < \sqrt[n]{a^m}$，即 $1 < a^h$。

$0 < a < 1$ 情形：令 $b = 1/a > 1$，则 $a^h = b^{-h} < 1$，故 $a^{r_2} < a^{r_1}$。
````

````ad-lem
title: 引理（$S_x$ 的有界性） | Lemma（Boundedness of $S_x$）

设 $a > 0$，$x \in \mathbb{R}$，集合 $S_x = \{\, a^r \mid r \in \mathbb{Q},\ r \le x \,\}$。

1. 若 $a > 1$，则 $S_x$ 有上界。
2. 若 $0 < a < 1$，则 $S_x$ 有下界。
````

````ad-proof
title: 证明 | Proof

由[[Chapter 17 数系(II)|第十七章]]有理数集的稠密性，取有理数 $R > x$。

- 若 $a > 1$，则由有理指数单调性，对任意 $r \le x < R$ 有 $a^r < a^R$，故 $a^R$ 是 $S_x$ 的一个上界。
- 若 $0 < a < 1$，则由有理指数单调性，对任意 $r \le x < R$ 有 $a^r > a^R$，故 $a^R$ 是 $S_x$ 的一个下界。
````

再由实数集的完备性公理（[[Chapter 16 集合论|第十六章]] §16.7），$a > 1$ 时 $\sup S_x$ 存在，$0 < a < 1$ 时 $\inf S_x$ 存在。据此给出实数指数的定义：

````ad-def
title: 定义（实数指数） | Definition（Real Exponent）

设 $a > 0$，对任意实数 $x \in \mathbb{R}$，定义集合
$$S_x = \{\, a^r \mid r \in \mathbb{Q},\ r \le x \,\}$$

1. 若 $a > 1$，定义 $a^x = \sup S_x$。
2. 若 $0 < a < 1$，定义 $a^x = \inf S_x$。
3. 若 $a = 1$，定义 $a^x = 1$（平凡情形）。

由前述定理与引理，$\sup S_x$（$a > 1$）与 $\inf S_x$（$0 < a < 1$）均存在，故该定义是良定义的。
````

**为什么对 $a > 1$ 取上确界，对 $0 < a < 1$ 取下确界？**

核心原因是单调性方向不同：

- 当 $a > 1$ 时，$r \mapsto a^r$ 在 $\mathbb{Q}$ 上**严格递增**，故 $S_x$ 的元素随 $r$ 增大而增大，其「最紧的上界」就是 $\sup S_x$。
- 当 $0 < a < 1$ 时，$r \mapsto a^r$ 在 $\mathbb{Q}$ 上**严格递减**，故 $S_x$ 的元素随 $r$ 增大而减小，其「最紧的下界」就是 $\inf S_x$。

取上确界（或下确界）是为了捕捉这个「最紧的界」，它比任意一个普通的上界/下界都更精确地刻画 $a^x$ 应有的值。

````ad-note
title: 注记（与戴德金分割的平行结构） | Note（Parallel with Dedekind Cuts）

这一定义的深层结构与[[Chapter 17 数系(II)|第十七章]] §17.1.3 的戴德金分割平行：$\{a^r \mid r \le x\}$ 的角色类似分割的「下半部」，而 $a^x$ 正是该分割所定义的实数。戴德金分割用有理数集的切口定义实数，实数指数则用有理指数集的确界定义实数指数，两者都是「用有理逼近无理」思想的体现。
````

````ad-thm
title: 定理（实数指数与有理指数的相容性） | Theorem（Compatibility with Rational Exponents）

若 $x \in \mathbb{Q}$，则上述定义所给出的 $a^x$ 与 §25.1.2 的有理指数定义一致。
````

````ad-proof
title: 证明 | Proof

当 $x \in \mathbb{Q}$ 时，取 $r = x \in \mathbb{Q}$ 即得 $a^x \in S_x$。若 $a > 1$，则由 $r \mapsto a^r$ 的严格递增性，$S_x$ 中所有元素 $\le a^x$，故 $a^x$ 是 $S_x$ 的最大值，从而 $a^x = \sup S_x$。若 $0 < a < 1$，则 $S_x$ 中所有元素 $\ge a^x$，故 $a^x$ 是 $S_x$ 的最小值，从而 $a^x = \inf S_x$。两情形均与 §25.1.2 的定义一致。
````

````ad-thm
title: 定理（实数指数运算律） | Theorem（Laws of Real Exponents）

设 $a, b > 0$，$p, q \in \mathbb{R}$，定理 25.3 的五条运算律对全体实数指数成立：

1. $a^p \cdot a^q \equiv a^{p+q}$
2. $\dfrac{a^p}{a^q} \equiv a^{p-q}$
3. $(a^p)^q \equiv a^{pq}$
4. $(ab)^p \equiv a^p b^p$
5. $\left(\dfrac{a}{b}\right)^p \equiv \dfrac{a^p}{b^p}$
````

````ad-proof
title: 证明 | Proof

以运算律 (1) $a^p \cdot a^q \equiv a^{p+q}$ 为例，其余四条同理。设 $a > 1$（$0 < a < 1$ 改用下确界，论证对称），由定义 $a^p = \sup S_p$、$a^q = \sup S_q$。

**上界**：对任意有理数 $r \le p$、$s \le q$，由 $r \mapsto a^r$ 的单调性有 $a^r \le a^p$、$a^s \le a^q$，故 $a^{r+s} = a^r a^s \le a^p a^q$。因此 $a^p a^q$ 是集合 $S_{p+q} = \{\, a^{t} \mid t \in \mathbb{Q},\ t \le p+q \,\}$ 的一个上界，从而 $a^{p+q} = \sup S_{p+q} \le a^p a^q$。

**最紧性**：若 $a^p a^q$ 不是最小上界，则存在更小的上界 $M < a^p a^q$。由确界的逼近性，可取有理数 $r \le p$、$s \le q$ 使 $a^r$、$a^s$ 分别任意接近 $a^p$、$a^q$，从而 $a^{r+s} = a^r a^s$ 任意接近 $a^p a^q$，可大于 $M$，这与 $M$ 为上界矛盾。故 $a^p a^q$ 正是 $S_{p+q}$ 的最小上界，$a^{p+q} = a^p a^q$。

严格的 $\sup$/$\inf$ 论证涉及实数完备性的深层应用，超出 DSE 范围；此处按确界框架给出完整证明，其余四条运算律的论证同理。
````

````ad-example
title: 示例 | Example


估计 $2^{\sqrt{2}}$ 的值。

---

$\sqrt{2} \approx 1.4142\ldots$，取有理数列 $1.4,\ 1.41,\ 1.414,\ 1.4142,\ \ldots$ 逼近 $\sqrt{2}$：

$$2^{1.4} = 2^{7/5} \approx 2.639$$
$$2^{1.41} = 2^{141/100} \approx 2.657$$
$$2^{1.414} \approx 2.665$$
$$2^{1.4142} \approx 2.6651$$

故 $2^{\sqrt{2}} = \sup\{2^r \mid r \in \mathbb{Q},\ r \le \sqrt{2}\} \approx 2.6651$。
````

---

### 25.2.2　指数函数的定义

````ad-def
title: 定义（指数函数） | Definition（Exponential Function）

设 $a > 0$ 且 $a \ne 1$。定义映射
$$E_a: \mathbb{R} \longrightarrow (0, +\infty), \quad x \longmapsto a^x$$

称为以 $a$ 为底的**指数函数（exponential function）**。

- **定义域**：$\mathbb{R}$
- **值域**：$(0, +\infty)$
````

````ad-note
title: 注记（约定 $a \ne 1$ 的原因） | Note（Why $a \ne 1$）

$1^x = 1$ 为常数函数，不具备指数函数的特有性质（严格单调、可逆等），故不纳入指数函数的讨论。
````

````ad-cor
title: 推论（指数函数的特征值） | Corollary（Characteristic Values）

$E_a(0) = a^0 = 1$，$E_a(1) = a^1 = a$。
````

---

### 25.2.3　指数函数的性质

````ad-thm
title: 定理（指数函数的代数性质） | Theorem（Algebraic Properties of Exponential Functions）

设 $a > 0$，$a \ne 1$，对任意 $x, y \in \mathbb{R}$：

1. $E_a(x + y) \equiv E_a(x) \cdot E_a(y)$，即 $a^{x+y} \equiv a^x \cdot a^y$
2. $E_a(x - y) \equiv \dfrac{E_a(x)}{E_a(y)}$，即 $a^{x-y} \equiv \dfrac{a^x}{a^y}$
3. $E_a(-x) \equiv \dfrac{1}{E_a(x)}$，即 $a^{-x} \equiv \dfrac{1}{a^x}$
````

这三条可直接由定理 25.5（实数指数运算律）推出，只是对其在形式上进行改写而已。

````ad-thm
title: 定理（指数函数的分析性质） | Theorem（Analytic Properties of Exponential Functions）

设 $a > 0$，$a \ne 1$：

1. **严格单调性**：
   - 若 $a > 1$，则 $E_a(x)$ 在 $\mathbb{R}$ 上**严格递增**：$x_1 < x_2 \implies a^{x_1} < a^{x_2}$。
   - 若 $0 < a < 1$，则 $E_a(x)$ 在 $\mathbb{R}$ 上**严格递减**：$x_1 < x_2 \implies a^{x_1} > a^{x_2}$。

1. **单射性**：$a^{x_1} = a^{x_2} \implies x_1 = x_2$。
````

````ad-proof
title: 证明 | Proof

**单调性，$a > 1$ 情形**：

设 $h > 0$，需证 $a^{x+h} > a^x$，即 $a^x(a^h - 1) > 0$。因 $a^x > 0$，只需证 $a^h > 1$。

对有理数 $h > 0$，由 §25.2.1 的有理指数单调性，$0 < h \implies a^h > a^0 = 1$。

对无理数 $h > 0$，由有理数集的稠密性，存在有理数 $r$ 满足 $0 < r < h$。由有理指数单调性 $a^r > 1$，再由定义 $a^h = \sup\{a^r \mid r \le h,\ r \in \mathbb{Q}\}$，得 $a^h \ge a^r > 1$。

故 $a^{x+h} > a^x$，$E_a$ 严格递增。

$0 < a < 1$ 情形：令 $b = 1/a > 1$，则 $a^x = b^{-x}$。当 $x_1 < x_2$ 时 $-x_1 > -x_2$，由 $b > 1$ 的递增性 $b^{-x_1} > b^{-x_2}$，即 $a^{x_1} > a^{x_2}$，$E_a$ 严格递减。

**单射性**：由严格单调性直接推出（严格单调函数必为单射）。
````


````ad-note
title: 注记（严格单调性是对数引入的理论根基） | Note（Strict Monotonicity as Foundation for Logarithms）

严格单调性保证了「不同输入对应不同输出」，这意味着对值域中的任一 $y = a^x$，其对应的输入 $x$ 是唯一的。这一性质是 §25.3 引入对数（作为指数函数的逆变换）的理论根基。
````

````ad-example
title: 示例 | Example


比较下列各组数的大小。

1. $3^{1.2}$ 与 $3^{1.5}$
2. $\left(\dfrac{1}{2}\right)^{-1}$ 与 $\left(\dfrac{1}{2}\right)^{-2}$

---

1. 底数 $3 > 1$，$E_3$ 严格递增。$1.2 < 1.5$，故 $3^{1.2} < 3^{1.5}$。
2. 底数 $\dfrac{1}{2} \in (0,1)$，$E_{1/2}$ 严格递减。$-1 > -2$，故 $\left(\dfrac{1}{2}\right)^{-1} < \left(\dfrac{1}{2}\right)^{-2}$。
````

````ad-example
title: 示例 | Example


已知 $a^x = a^{2x-1}$（$a > 0$，$a \ne 1$），求 $x$。

---

由指数函数的单射性，$a^x = a^{2x-1} \implies x = 2x - 1$，解得 $x = 1$。
````

---

### 25.2.4　指数函数的图像

````ad-thm
title: 定理（指数函数图像的几何特征） | Theorem（Geometric Features of Exponential Graphs）

设 $y = a^x$（$a > 0$，$a \ne 1$）：

1. **截距**：$y$ 截距为 $(0, 1)$；无 $x$ 截距（因 $a^x > 0$ 恒成立）。
2. **关键点**：过 $(0, 1)$ 和 $(1, a)$。
3. **对称性**：$y = a^x$ 与 $y = \left(\dfrac{1}{a}\right)^x$ 的图像关于 $y$ 轴对称，因为 $\left(\dfrac{1}{a}\right)^x \equiv a^{-x}$。
4. **渐近线**：$x$ 轴（$y = 0$）为水平渐近线。
````

> **渐近线的直观几何含义**：当 $a > 1$ 时，随着 $x$ 沿负方向越走越远，图像向右下延伸并无限逼近 $x$ 轴，但始终位于 $x$ 轴上方、永不触及（因 $a^x > 0$ 恒成立）；当 $0 < a < 1$ 时方向相反，图像沿正方向无限逼近 $x$ 轴。这条被无限逼近却永不触及的直线 $y = 0$ 称为**水平渐近线（horizontal asymptote）**。

````ad-proof
title: 证明 | Proof

证 $a > 1$ 情形（$0 < a < 1$ 情形令 $b = 1/a > 1$ 化归）。

设 $\delta = a - 1 > 0$。由二项式展开 $a^m = (1+\delta)^m \ge 1 + m\delta$（$m$ 为正整数），故对任意 $\varepsilon > 0$，取足够大的 $m$ 使 $1 + m\delta > \dfrac{1}{\varepsilon}$，即 $a^m > \dfrac{1}{\varepsilon}$，从而 $a^{-m} < \varepsilon$。

令 $r = -m$。对任意 $x < r$，由 $E_a$ 严格递增得 $a^x < a^r = a^{-m} < \varepsilon$，且 $a^x > 0$ 恒成立。故 $0 < a^x < \varepsilon$。

即当 $x$ 沿负方向足够远时，$a^x$ 可任意接近 $0$ 而恒为正、永不触及 $0$，故 $y = 0$ 为水平渐近线。
````

````ad-cor
title: 推论（两种底数情形比较） | Corollary（Comparison of Two Base Cases）

| 底数 | $a > 1$ | $0 < a < 1$ |
|------|---------|-------------|
| 单调性 | 严格递增 | 严格递减 |
| 图像走向 | 从左下方上升至右上方 | 从左上方下降至右下方 |
| $x > 0$ 时 | $a^x > 1$ | $0 < a^x < 1$ |
| $x < 0$ 时 | $0 < a^x < 1$ | $a^x > 1$ |
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    xlabel={$x$}, ylabel={$y$},
    xmin=-3, xmax=3, ymin=-0.5, ymax=5,
    axis lines=middle,
    legend pos=north west,
    samples=80, domain=-3:3,
    grid=both, grid style={dashed, gray!30}
]
\addplot[blue!70!black, thick] {2^x};
\addlegendentry{$y=2^x$};
\addplot[red!70!black, thick, dashed] {(1/2)^x};
\addlegendentry{$y=(1/2)^x$};
\addplot[gray, thin] {0};
\node[anchor=south west] at (axis cs:0,1) {$(0,1)$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 25-1：$y = 2^x$（$a > 1$，蓝色实线）与 $y = (1/2)^x$（$0 < a < 1$，红色虚线）的图像对比。两者关于 $y$ 轴对称，均过 $(0, 1)$，以 $x$ 轴为水平渐近线。

````ad-example
title: 示例 | Example


绘制 $y = 3^x$ 与 $y = (1/3)^x$ 的草图，指出关键点与对称关系。

---

两函数均过 $(0, 1)$。$y = 3^x$ 严格递增，过 $(1, 3)$；$y = (1/3)^x$ 严格递减，过 $(1, 1/3)$。

由 $\left(\dfrac{1}{3}\right)^x \equiv 3^{-x}$，两图像关于 $y$ 轴对称。两者均以 $x$ 轴为水平渐近线。
````

---

## 25.3　对数函数（Logarithmic Functions）

> **本节难度上限**：T B ｜ C B- ｜ E B ｜ Q C

> 由 §25.2.3，指数函数 $E_a$ 严格单调（$a > 1$ 时递增、$0 < a < 1$ 时递减），故不同输入对应不同输出。这意味着对值域中的任一 $y = a^x$，其对应输入 $x$ 唯一，可定义一个「逆变换」，从输出 $y$ 找回输入 $x$。这个逆变换即为**对数**。

### 25.3.1　对数的定义


$$x \;\xrightarrow{\,E_a\,}\; a^x \;\xrightarrow{\,\log_a\,}\; x$$

同理，从 $y$ 出发的路径为 $y \;\xrightarrow{\,\log_a\,}\; \log_a y \;\xrightarrow{\,E_a\,}\; y$。两条路径都体现了「变换与逆变换」的往返本质。

````ad-def
title: 定义（对数） | Definition（Logarithm）

设 $a > 0$，$a \ne 1$，$N > 0$。若 $a^x = N$，则称 $x$ 为**以 $a$ 为底 $N$ 的对数（logarithm）**，记为
$$\log_a N = x \iff a^x = N$$

其中 $a$ 称为**底数（base）**，$N$ 称为**真数（argument）**。

- **定义域**：$(0, +\infty)$（真数须为正）
- **值域**：$\mathbb{R}$
````

````ad-thm
title: 定理（逆变换恒等式） | Theorem（Inverse Identities）

1. $\log_a(a^x) \equiv x$，对所有 $x \in \mathbb{R}$。
2. $a^{\log_a N} \equiv N$，对所有 $N > 0$。
````

````ad-proof
title: 证明 | Proof

1. 对任意 $x \in \mathbb{R}$，设 $t = a^x$。由对数定义 $\log_a t = x \iff a^x = t$，故 $\log_a(a^x) = x$。

2. 对任意 $N > 0$，设 $t = \log_a N$。由对数定义 $a^t = N$，即 $a^{\log_a N} = N$。
````

````ad-cor
title: 推论（两个特值） | Corollary（Two Special Values）

设 $a > 0$，$a \ne 1$。则
1. $\log_a 1 = 0$。
2. $\log_a a = 1$。
````

```ad-proof
1. 因 $a^0 = 1$。故 $\log_a 1 = 0$。
2. 因 $a^1 = a$。故 $\log_a a = 1$。
```

````ad-def
title: 定义（常用对数） | Definition（Common Logarithm）

以 $10$ 为底的对数称为**常用对数（common logarithm）**，记为 $\log N$（即 $\log_{10} N$）。

> 有些教材会使用 $\mathrm{lg}$ 记号。**本章约定** 不带底数的 $\log$ 一律指以 10 为底的常用对数。
````

````ad-example
title: 示例 | Example


把下列指数式改写为对数式。

1. $2^5 = 32$
2. $10^{-2} = 0.01$
3. $a^0 = 1$

---

1. $2^5 = 32 \iff \log_2 32 = 5$。
2. $10^{-2} = 0.01 \iff \log 0.01 = -2$。
3. $a^0 = 1 \iff \log_a 1 = 0$。
````

````ad-example
title: 示例 | Example


把下列对数式改写为指数式。

1. $\log_3 81 = 4$
2. $\log 1000 = 3$
3. $\log_a a = 1$

---

1. $\log_3 81 = 4 \iff 3^4 = 81$。
2. $\log 1000 = 3 \iff 10^3 = 1000$。
3. $\log_a a = 1 \iff a^1 = a$。
````

````ad-example
title: 示例 | Example


求下列各式的值。

1. $\log_2 32$
2. $\log 0.001$
3. $\log_5 1$
4. $\log_4 8$

---

1. 设 $x = \log_2 32$，则 $2^x = 32 = 2^5$，由指数函数的单射性得 $x = 5$，故 $\log_2 32 = 5$。

2. 设 $x = \log 0.001$，则 $10^x = 0.001 = 10^{-3}$，由单射性得 $x = -3$，故 $\log 0.001 = -3$。

3. 设 $x = \log_5 1$，则 $5^x = 1 = 5^0$，由单射性得 $x = 0$，故 $\log_5 1 = 0$。

4. 设 $x = \log_4 8$，则 $4^x = 8$，即 $2^{2x} = 2^3$，由单射性得 $2x = 3$，故 $x = \dfrac{3}{2}$，即 $\log_4 8 = \dfrac{3}{2}$。
````

---

### 25.3.2　对数的运算性质

````ad-thm
title: 定理（对数的基本运算律） | Theorem（Laws of Logarithms）

设 $a > 0$，$a \ne 1$，$M, N > 0$，$k \in \mathbb{R}$：

1. $\log_a(MN) \equiv \log_a M + \log_a N$（积的对数 $\equiv$ 对数的和）
2. $\log_a\left(\dfrac{M}{N}\right) \equiv \log_a M - \log_a N$（商的对数 $\equiv$ 对数的差）
3. $\log_a(M^k) \equiv k\,\log_a M$（幂的对数 $\equiv$ 指数 $\times$ 对数）
````

````ad-proof
title: 证明（运算律 1） | Proof（Law 1）

设 $p = \log_a M$，$q = \log_a N$，则 $M = a^p$，$N = a^q$。由实数指数运算律：

$$MN = a^p \cdot a^q \equiv a^{p+q}$$

取以 $a$ 为底的对数：

$$\log_a(MN) = p + q = \log_a M + \log_a N$$

运算律 (2)、(3) 的证明类似，分别利用 $M/N \equiv a^{p-q}$ 与 $M^k \equiv (a^p)^k \equiv a^{pk}$。
````

````ad-cor
title: 推论 | Corollary

1. $\log_a\left(\dfrac{1}{N}\right) \equiv -\log_a N$
2. $\log_a\sqrt[n]{M} \equiv \dfrac{1}{n}\log_a M$
````

```ad-proof
该推论的证明留做练习。
```

````ad-note
title: 注记（Napier 发明对数的历史动机） | Note（Napier's Motivation for Inventing Logarithms）

对数运算律正是纳皮尔发明对数的初衷：把乘除化为加减，把乘方开方化为乘除，从而把大数运算的复杂度整体降一级。在没有电子计算器的时代，对数表让科学家与工程师把乘除运算的时间从数小时缩短到数分钟。运算律 (1) 的「积化为和」是这一思想的核心。
````

````ad-example
title: 示例 | Example


化简下列各式。

1. $\log_2 8 + \log_2 4$
2. $\log 50 - \log 5$

---

1. $\log_2 8 + \log_2 4 = \log_2(8 \times 4) = \log_2 32 = 5$。
2. $\log 50 - \log 5 = \log\left(\dfrac{50}{5}\right) = \log 10 = 1$。
````

````ad-example
title: 示例 | Example


用计算器求下列各式的值（精确至三位小数）。先用计算器读出 $\log 2 \approx 0.301$、$\log 3 \approx 0.477$。

1. $\log_2 48$
2. $\log_2\sqrt[3]{6}$

---

1. 用换底公式（推论 2）化为常用对数：

$$\log_2 48 = \dfrac{\log 48}{\log 2} = \dfrac{\log(2^4 \times 3)}{\log 2} = \dfrac{4\log 2 + \log 3}{\log 2} \approx \dfrac{4(0.301) + 0.477}{0.301} = \dfrac{1.681}{0.301} \approx 5.585$$

2. 同理：

$$\log_2\sqrt[3]{6} = \dfrac{\log 6^{1/3}}{\log 2} = \dfrac{\frac{1}{3}(\log 2 + \log 3)}{\log 2} \approx \dfrac{\frac{1}{3}(0.301 + 0.477)}{0.301} = \dfrac{0.259}{0.301} \approx 0.861$$
````

````ad-example
title: 示例 | Example


用对数运算律展开 $\log_a\dfrac{x^2\sqrt{y}}{z^3}$（$x, y, z > 0$）。

---

$$\log_a\dfrac{x^2\sqrt{y}}{z^3} \equiv \log_a(x^2\sqrt{y}) - \log_a z^3 \equiv \log_a x^2 + \log_a\sqrt{y} - \log_a z^3 \equiv 2\log_a x + \dfrac{1}{2}\log_a y - 3\log_a z$$
````

---

### 25.3.3　换底公式

````ad-thm
title: 定理（换底公式） | Theorem（Change of Base Formula）

设 $a, b > 0$，$a, b \ne 1$，$N > 0$，则：

$$\log_b N \equiv \dfrac{\log_a N}{\log_a b}$$
````

````ad-proof
title: 证明 | Proof

设 $x = \log_b N$，则 $b^x = N$。两边取以 $a$ 为底的对数：

$$\log_a(b^x) = \log_a N \implies x\,\log_a b = \log_a N \implies x = \dfrac{\log_a N}{\log_a b}$$

即 $\log_b N = \dfrac{\log_a N}{\log_a b}$。
````

````ad-cor
title: 推论（换底公式的推论） | Corollary（Consequences of Change of Base）

1. $\log_a b \cdot \log_b a \equiv 1$，即 $\log_b a \equiv \dfrac{1}{\log_a b}$
2. $\log_a N \equiv \dfrac{\log N}{\log a}$（任意底换为常用对数）
3. $\log_{a^k} N \equiv \dfrac{1}{k}\log_a N$
4. $\log_a N \equiv \log_{1/a}\left(\dfrac{1}{N}\right)$
````

````ad-proof
title: 证明 | Proof

1. 在换底公式 $\log_b N \equiv \dfrac{\log_a N}{\log_a b}$ 中取 $N = a$，得 $\log_b a = \dfrac{\log_a a}{\log_a b} = \dfrac{1}{\log_a b}$，故 $\log_a b \cdot \log_b a = 1$。

2. 在换底公式中把新底取为 $10$（常用对数）：$\log_a N = \dfrac{\log_{10} N}{\log_{10} a} = \dfrac{\log N}{\log a}$。

3. 在换底公式中把新底取为 $a^k$：$\log_{a^k} N = \dfrac{\log_a N}{\log_a(a^k)} = \dfrac{\log_a N}{k\log_a a} = \dfrac{\log_a N}{k}$。

4. 在换底公式中把底取为 $1/a$、真数取为 $1/N$：$\log_{1/a}\left(\dfrac{1}{N}\right) = \dfrac{\log_a(1/N)}{\log_a(1/a)} = \dfrac{-\log_a N}{-1} = \log_a N$。
````

````ad-example
title: 示例 | Example


已知 $\log 3 \approx 0.4771$、$\log 5 \approx 0.6990$，计算 $\log_3 5$。

---

由换底公式（推论 2）：

$$\log_3 5 = \dfrac{\log 5}{\log 3} \approx \dfrac{0.6990}{0.4771} \approx 1.465$$
````

````ad-example
title: 示例 | Example


证明 $\log_2 3 \cdot \log_3 4 \cdot \log_4 5 = \log_2 5$。

---

由换底公式，$\log_3 4 = \dfrac{\log_2 4}{\log_2 3}$，$\log_4 5 = \dfrac{\log_2 5}{\log_2 4}$。故

$$\log_2 3 \cdot \log_3 4 \cdot \log_4 5 = \log_2 3 \cdot \dfrac{\log_2 4}{\log_2 3} \cdot \dfrac{\log_2 5}{\log_2 4} = \log_2 5$$
````

---

### 25.3.4　对数函数的定义与性质

````ad-def
title: 定义（对数函数） | Definition（Logarithmic Function）

设 $a > 0$，$a \ne 1$。定义映射
$$L_a: (0, +\infty) \longrightarrow \mathbb{R}, \quad x \longmapsto \log_a x$$

称为以 $a$ 为底的**对数函数（logarithmic function）**。本章统一用函数值记号 $\log_a x$ 表示它（即 $L_a(x) = \log_a x$）。

- **定义域**：$(0, +\infty)$
- **值域**：$\mathbb{R}$

$\log_a$ 与 $E_a$ 互为逆变换：$\log_a(a^x) = x$，$a^{\log_a x} = x$。
````

````ad-thm
title: 定理（对数函数的分析性质） | Theorem（Analytic Properties of Logarithmic Functions）

设 $a > 0$，$a \ne 1$：

1. **单射性**：$\log_a x_1 = \log_a x_2 \iff x_1 = x_2$。
2. **严格单调性**：
   - 若 $a > 1$，则 $\log_a x$ 在 $(0, +\infty)$ 上**严格递增**。
   - 若 $0 < a < 1$，则 $\log_a x$ 在 $(0, +\infty)$ 上**严格递减**。
````

````ad-proof
title: 证明 | Proof

**单射性**：若 $\log_a x_1 = \log_a x_2 = t$，则由定义 $x_1 = a^t = x_2$。反方向显然。

**单调性（$a > 1$ 情形）**：设 $0 < x_1 < x_2$，令 $t_1 = \log_a x_1$，$t_2 = \log_a x_2$，则 
$$x_1 = a^{t_1} ,\quad x_2 = a^{t_2}$$ 
若 $t_1 \ge t_2$，则由 $E_a$ 的严格递增性（$a > 1$）有 $x_1 = a^{t_1} \ge a^{t_2} = x_2$，与 $x_1 < x_2$ 矛盾。故 $t_1 < t_2$，即 $\log_a x_1 < \log_a x_2$。

$0 < a < 1$ 情形类似，利用 $E_a$ 的严格递减性。
````

````ad-example
title: 示例 | Example


比较下列各组数的大小。

1. $\log_2 3$ 与 $\log_2 5$
2. $\log_{1/2} 3$ 与 $\log_{1/2} 5$

---

1. 底数 $2 > 1$，$\log_2 x$ 严格递增。$3 < 5$，故 $\log_2 3 < \log_2 5$。
2. 底数 $\dfrac{1}{2} \in (0,1)$，$\log_{1/2} x$ 严格递减。$3 < 5$，故 $\log_{1/2} 3 > \log_{1/2} 5$。
````

````ad-example
title: 示例 | Example


已知 $\log_a x = \log_a(2x-1)$（$a > 0$，$a \ne 1$），求 $x$。

---

由对数函数的单射性，$\log_a x = \log_a(2x-1) \implies x = 2x - 1$，解得 $x = 1$。

验证：$x = 1 > 0$ 且 $2x - 1 = 1 > 0$，真数为正，合法。
````

---

### 25.3.5　对数函数的图像

````ad-thm
title: 定理（对数函数图像的几何特征） | Theorem（Geometric Features of Logarithmic Graphs）

设 $y = \log_a x$（$a > 0$，$a \ne 1$）：

1. **截距**：$x$ 截距为 $(1, 0)$；无 $y$ 截距（定义域不含 $x \le 0$）。
2. **关键点**：过 $(1, 0)$ 和 $(a, 1)$。
3. **与指数函数的对称性**：$y = \log_a x$ 的图像与 $y = a^x$ 的图像关于直线 $y = x$ 对称。
4. **渐近线**：$y$ 轴（$x = 0$）为垂直渐近线。
````

````ad-proof
title: 证明 | Proof

1. **截距与关键点**：由推论「两个特值」$\log_a 1 = 0$、$\log_a a = 1$，得 $x$ 截距 $(1,0)$ 及关键点 $(1,0)$、$(a,1)$。定义域 $(0,+\infty)$ 不含 $x \le 0$，故无 $y$ 截距。

2. **对称性**：点 $(p,q)$ 在 $y = a^x$ 上 $\iff q = a^p \iff p = \log_a q \iff$ 点 $(q,p)$ 在 $y = \log_a x$ 上。两图像的点互为 $(x,y) \leftrightarrow (y,x)$，这正是关于直线 $y = x$ 对称的代数表述，也是 $\log_a$ 与 $E_a$ 互为逆变换的几何体现。

3. **渐近线**：以 $a > 1$ 为例。对任意 $M < 0$，取 $x_M = a^M > 0$，则 $\log_a x_M = M$。当 $0 < x < x_M$ 时，由 $\log_a$ 的严格递增性得 $\log_a x < M$。即当 $x$ 从右侧足够接近 $0$ 时，$\log_a x$ 可任意小（无下界）。故图像沿 $y$ 轴向下无限逼近直线 $x = 0$，且因定义域为 $x > 0$ 永不触及 $x = 0$，$x = 0$ 为垂直渐近线。$0 < a < 1$ 情形同理（此时 $\log_a x$ 无上界地增大）。
````

````ad-cor
title: 推论（两种底数情形比较） | Corollary（Comparison of Two Base Cases）

| 底数 | $a > 1$ | $0 < a < 1$ |
|------|---------|-------------|
| 单调性 | 严格递增 | 严格递减 |
| $x > 1$ 时 | $\log_a x > 0$ | $\log_a x < 0$ |
| $0 < x < 1$ 时 | $\log_a x < 0$ | $\log_a x > 0$ |
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    xlabel={$x$}, ylabel={$y$},
    xmin=-3, xmax=5, ymin=-3, ymax=5,
    axis lines=middle,
    legend pos=north west,
    samples=80, domain=0.01:5,
    grid=both, grid style={dashed, gray!30}
]
\addplot[blue!70!black, thick, domain=-3:5] {2^x};
\addlegendentry{$y=2^x$};
\addplot[red!70!black, thick] {ln(x)/ln(2)};
\addlegendentry{$y=\log_2 x$};
\addplot[gray, thick, domain=-3:5] {x};
\addlegendentry{$y=x$};
\node[anchor=south west] at (axis cs:1,0) {$(1,0)$};
\node[anchor=south east] at (axis cs:0,1) {$(0,1)$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 25-2：$y = 2^x$（蓝色）与 $y = \log_2 x$（红色）关于直线 $y = x$（灰色）对称。指数函数过 $(0, 1)$，对数函数过 $(1, 0)$，两者的关键点互为 $(x, y) \leftrightarrow (y, x)$。

````ad-example
title: 示例 | Example


绘制 $y = \log_3 x$ 与 $y = \log_{1/3} x$ 的草图，指出对称关系。

---

$y = \log_3 x$ 严格递增，过 $(1, 0)$ 与 $(3, 1)$。$y = \log_{1/3} x$ 严格递减，过 $(1, 0)$ 与 $(1/3, 1)$。

由 $\log_{1/3} x \equiv \log_{3^{-1}} x \equiv -\log_3 x$（换底推论 3），两图像关于 $x$ 轴对称。两者均以 $y$ 轴为垂直渐近线。
````

---

## 25.4　指数方程与对数方程（基本形式）

> **本节难度上限**：T C ｜ C C ｜ E C ｜ Q D

> 本节仅处理最简单的指数方程与对数方程，即可化为 $a^x = b$ 或 $\log_a x = b$ 的形式者。更复杂的情况（如含 $f(x), g(x)$ 的一般形式、可变换为二次的方程、含真数约束的增根检验等）留待[[Chapter 27 解方程方法 (III)|第二十七章]]讨论。

### 25.4.1　基本指数方程

````ad-thm
title: 定理（基本指数方程的解） | Theorem（Solution of Basic Exponential Equations）

形如 $a^x = b$（$a > 0$，$a \ne 1$，$b > 0$）的方程，由对数的定义直接得解：

$$a^x = b \iff x = \log_a b$$
````

````ad-proof
title: 证明 | Proof

（$\Rightarrow$）若 $a^x = b$，两边取以 $a$ 为底的对数，由逆变换恒等式 $\log_a(a^x) = x$ 得 $x = \log_a b$。

（$\Leftarrow$）若 $x = \log_a b$，则由逆变换恒等式 $a^{\log_a b} = b$ 得 $a^x = b$。
````

````ad-note
title: 注记（$b \le 0$ 时无解） | Note（No Solution When $b \le 0$）

因 $a^x > 0$ 恒成立，当 $b \le 0$ 时方程 $a^x = b$ 无实数解。
````

解基本指数方程的方法：识别 $a^x = b$ 形式，直接写出 $x = \log_a b$；若需要数值结果，用换底公式化为 $\log b / \log a$ 计算。当 $b$ 恰为 $a$ 的整数幂时，可直接化同底求解。

````ad-example
title: 示例 | Example


解下列指数方程。

1. $2^x = 32$
2. $3^x = 10$

---

1. $32 = 2^5$，故 $2^x = 2^5 \implies x = 5$（化同底法）。
2. $3^x = 10 \implies x = \log_3 10 = \dfrac{\log 10}{\log 3} \approx \dfrac{1}{0.4771} \approx 2.096$（取对数法 + 换底公式）。
````

````ad-example
title: 示例 | Example


解 $5^{x-1} = 7$。

---

$$5^{x-1} = 7 \implies x - 1 = \log_5 7 \implies x = 1 + \log_5 7 = 1 + \dfrac{\log 7}{\log 5} \approx 1 + \dfrac{0.8451}{0.6990} \approx 2.209$$
````

---

### 25.4.2　基本对数方程

````ad-thm
title: 定理（基本对数方程的解） | Theorem（Solution of Basic Logarithmic Equations）

形如 $\log_a x = b$（$a > 0$，$a \ne 1$）的方程，由对数的定义还原为指数形式：

$$\log_a x = b \iff x = a^b$$
````

````ad-proof
title: 证明 | Proof

（$\Rightarrow$）若 $\log_a x = b$，两边取以 $a$ 为底的指数，由逆变换恒等式 $a^{\log_a x} = x$ 得 $x = a^b$。

（$\Leftarrow$）若 $x = a^b$，则由逆变换恒等式 $\log_a(a^b) = b$ 得 $\log_a x = b$。
````

验根仅需确认 $x = a^b > 0$，由于 $a > 0$ 此条件自动成立。

````ad-note
title: 注记（复杂对数方程的预告） | Note（Preview of Complex Logarithmic Equations）

含真数约束的复杂对数方程（如 $\log_a(x-1) + \log_a(x+2) = 1$）需要对数运算律化简后求解，并须检验真数是否为正（避免增根）。此类问题留待[[Chapter 27 解方程方法 (III)|第二十七章]]。
````

````ad-example
title: 示例 | Example


解下列对数方程。

1. $\log_3 x = 2$
2. $\log x = -1$

---

1. $\log_3 x = 2 \implies x = 3^2 = 9$。
2. $\log x = -1 \implies x = 10^{-1} = 0.1$。
````

````ad-example
title: 示例 | Example


解 $\log_2(3x - 1) = 4$。

---

$$\log_2(3x - 1) = 4 \implies 3x - 1 = 2^4 = 16 \implies 3x = 17 \implies x = \dfrac{17}{3}$$

验证：$3x - 1 = 16 > 0$，真数为正，合法。
````

---

## 25.5　对数坐标变换（线性化）

> **本节难度上限**：T B- ｜ C C+ ｜ E C ｜ Q C

> 许多现实世界的数据关系呈现指数模型 $y = ka^x$ 或幂律模型 $y = kx^n$。对这些关系取对数后，可转化为线性关系，使我们能从直线图像的斜率和截距推断未知常数。此技术称为**线性化（linearization）**，在 DSE 题型中常见。

### 25.5.1　指数模型的线性化

````ad-thm
title: 定理（指数模型的线性化） | Theorem（Linearization of Exponential Models）

设 $y$ 是 $x$ 的函数，满足 $y = f(x) = ka^x$（$k > 0$，$a > 0$，$a \ne 1$）。因 $y = ka^x$ 两边均为正数，且对数函数 $\log$ 是 $(0, +\infty) \to \mathbb{R}$ 的**单射**，故对两边取常用对数得到等价方程：

$$\log y \equiv \log k + x\,\log a$$

令 $Y = \log y$，则 $Y = \log k + (\log a)\,x$，即 **$Y$（$=\log y$）是 $x$ 的线性函数**，斜率为 $\log a$、截距为 $\log k$。
````

````ad-proof
title: 证明 | Proof

$$\log y = \log(ka^x) \equiv \log k + \log(a^x) \equiv \log k + x\,\log a$$

两边取对数的合法性：因 $y > 0$ 且 $ka^x > 0$，而 $\log$ 是单射（同底对数相等 $\iff$ 真数相等），故由 $y = ka^x$ 取对数不增不减解，得到的是等价方程。
````

> **配图**：左图为原数据 $(x, y)$ 在普通坐标轴（横轴 $x$、纵轴 $y$）上的指数曲线；右图为同一数据在半对数图（横轴 $x$、纵轴 $\log y$）上被拉直为一条直线，其斜率 $= \log a$、截距 $= \log k$。

**坐标轴命名**：线性化后的图，横轴仍是 $x$（称为**水平轴**），纵轴是 $\log y$（称为**垂直轴**），写作「$\log y$ 对 $x$」；避免把纵轴误当成原来的 $y$ 轴。

````ad-example
title: 示例 | Example


已知 $y = ka^x$ 满足 $(1, 6)$ 与 $(3, 54)$，求 $k$ 与 $a$。

---

对 $y = ka^x$ 两边取对数：$\log y = \log k + x\,\log a$。

代入 $(1, 6)$：$\log 6 = \log k + \log a$，即 $\log k + \log a = \log 6$。

代入 $(3, 54)$：$\log 54 = \log k + 3\log a$。

两式相减：$2\log a = \log 54 - \log 6 = \log 9$，故 $\log a = \dfrac{1}{2}\log 9 = \log 3$，$a = 3$。

代回：$\log k = \log 6 - \log 3 = \log 2$，$k = 2$。

故 $y = 2 \cdot 3^x$。验证：$y(1) = 6$ ✓，$y(3) = 54$ ✓。
````

````ad-example
title: 示例 | Example


在半对数图中，$\log y$ 对 $x$ 的直线斜率为 $0.3010$、截距为 $0.7782$，求原指数模型的 $k$ 与 $a$。

---

由 $Y = \log y = \log k + (\log a)\,x$，直线的斜率 $m = \log a$、截距 $c = \log k$。

$$a = 10^{0.3010} \approx 2, \qquad k = 10^{0.7782} \approx 6$$

故原模型为 $y = 6 \cdot 2^x$。
````


---

### 25.5.2　幂律模型的线性化

````ad-thm
title: 定理（幂律模型的线性化） | Theorem（Linearization of Power-Law Models）

设 $y$ 是 $x$ 的函数，满足 $y = f(x) = kx^n$（$k > 0$，$x > 0$，$n \in \mathbb{R}$）。因两边均为正数且 $\log$ 是单射，对两边取常用对数得到等价方程：

$$\log y \equiv \log k + n\,\log x$$

令 $Y = \log y$、$X = \log x$，则 $Y = \log k + n\,X$，即 **$Y$（$=\log y$）是 $X$（$=\log x$）的线性函数**，斜率为 $n$、截距为 $\log k$。
````

````ad-proof
title: 证明 | Proof

$$\log y = \log(kx^n) \equiv \log k + \log(x^n) \equiv \log k + n\,\log x$$

两边取对数的合法性同 §25.5.1：因 $y > 0$、$kx^n > 0$ 且 $\log$ 为单射，取对数得到等价方程。
````

````ad-cor
title: 推论（双对数图判别法） | Corollary（Log-Log Plot Test）

若以 $\log y$ 对 $\log x$ 作图得到一条直线，则原数据 $(x, y)$ 适合幂律模型 $y = kx^n$。直线的斜率为 $n$、截距为 $\log k$。
````

**坐标轴命名**：双对数图的横轴是 $\log x$（**水平轴**）、纵轴是 $\log y$（**垂直轴**），写作「$\log y$ 对 $\log x$」；两者都不是原来的 $x$、$y$ 轴，须注意区分。

````ad-example
title: 示例 | Example


已知 $y = kx^n$ 满足 $(2, 8)$ 与 $(4, 32)$，求 $k$ 与 $n$。

---

对 $y = kx^n$ 两边取对数：$\log y = \log k + n\,\log x$。

代入 $(2, 8)$：$\log 8 = \log k + n\,\log 2$。

代入 $(4, 32)$：$\log 32 = \log k + n\,\log 4$。

两式相减：$n(\log 4 - \log 2) = \log 32 - \log 8 = \log 4$，即 $n\,\log 2 = \log 4 = 2\log 2$，故 $n = 2$。

代回：$\log k = \log 8 - 2\log 2 = \log 8 - \log 4 = \log 2$，$k = 2$。

故 $y = 2x^2$。验证：$y(2) = 8$ ✓，$y(4) = 32$ ✓。
````

---

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    xlabel={$x$}, ylabel={$\log y$},
    xmin=-0.5, xmax=5, ymin=0, ymax=2.5,
    axis lines=middle,
    legend pos=north west,
    samples=80, domain=0:5,
    grid=both, grid style={dashed, gray!30}
]
\addplot[blue!70!black, thick, mark=*, only marks] coordinates {(0,0.30)(1,0.60)(2,0.90)(3,1.20)(4,1.50)};
\addlegendentry{$\log y$ vs $x$};
\addplot[red!70!black, thick, dashed] {0.30 + 0.30*x};
\addlegendentry{Linear fit};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 25-3：半对数图示例。原数据 $(x, y)$ 呈指数增长，$\log y$ 对 $x$ 作图得一直线（红色虚线为线性拟合），斜率 $m \approx 0.30$，截距 $c \approx 0.30$。

````ad-note
title: 注记（不同底数对数不影响最终参数） | Note（Base Independence）

以上讨论以常用对数 $\log$ 为例。若使用其他底数的对数，仅改变斜率与截距的数值（如以 $b$ 为底时 $a = b^m$，$k = b^c$），不影响最终求出的 $k, a, n$。在 DSE 考试中，通常按题目指定的对数底数作答。
````

---

## 25.6　小结（Summary）

````ad-note
title: 注记（本章主线与易错点） | Note（Main Threads and Common Pitfalls）

**五条主线：**

1. **有理指数与实数指数的扩张**：从 $n$ 次方根出发定义 $a^{m/n}$，建立有理指数五大运算律；再用确界（$\sup$/$\inf$）把指数扩张至全体实数，五大运算律形式不变。扩张的指导原则是「保持运算律形式不变」。

2. **指数函数** $E_a: \mathbb{R} \to (0, +\infty)$，$x \mapsto a^x$（$a > 0$，$a \ne 1$）：严格单调（$a > 1$ 递增，$0 < a < 1$ 递减），图像过 $(0, 1)$ 与 $(1, a)$，以 $x$ 轴为水平渐近线。严格单调性保证了「不同输入对应不同输出」，是引入对数的理论根基。

3. **对数作为 $E_a$ 的逆变换**：$\log_a N = x \iff a^x = N$。三条基本运算律：积化为和 $\log_a(MN) \equiv \log_a M + \log_a N$、商化为差 $\log_a(M/N) \equiv \log_a M - \log_a N$、幂化为倍数 $\log_a(M^k) \equiv k\,\log_a M$。换底公式 $\log_b N \equiv \dfrac{\log_a N}{\log_a b}$ 使任意底的对数可互相转换。对数函数 $\log_a$ 与 $E_a$ 关于 $y = x$ 对称。

4. **基本指数与对数方程**：$a^x = b \iff x = \log_a b$，$\log_a x = b \iff x = a^b$。二者均为对数定义的直接推论。更复杂的情形留待 Ch27。

5. **线性化技术**：指数模型 $y = ka^x$ 取对数后变为 $\log y \equiv \log k + x\,\log a$（半对数直线）；幂律模型 $y = kx^n$ 取对数后变为 $\log y \equiv \log k + n\,\log x$（双对数直线）。从线性化图像的斜率和截距可反求原模型的未知常数。

**易错点：**

- $a^{1/n}$ 取**算术 $n$ 次方根**（非负主根），不是所有方根。偶数情形 $x^n = a$ 有两根，但 $a^{1/n}$ 只取正根。
- $\log_a N$ 中真数 $N > 0$，底数 $a > 0$ 且 $a \ne 1$。
- $\log_a(MN) \equiv \log_a M + \log_a N$ 要求 $M, N > 0$，不能对负数使用。
- $\log_a(M + N) \ne \log_a M + \log_a N$（对数运算律只对乘除有效，对加减无效）。
- 解对数方程后须检验真数是否为正，避免增根。
````

````ad-note
title: 注记（对数概念的历史与逻辑顺序） | Note（Historical vs Logical Order of Logarithms）

从历史上看，对数先于指数函数被发明。纳皮尔在 1614 年发表对数时，指数函数的概念尚未明确建立，他是从「把乘法化为加法」的实用目标出发，直接构造对数表。其后布里格斯改良为以 10 为底的常用对数，并出版了详细的对数表，使之成为三百年间科学家与工程师的标准计算工具。

现代教科书则采用相反的逻辑顺序：先定义指数函数，再由指数函数的逆变换引入对数。这一「逻辑顺序」更为严谨，但掩盖了「历史顺序」中对数作为计算工具的实用起源。本章的叙述遵循逻辑顺序（先指数后对数），但在章首与小结中回溯历史，以期兼顾严谨与直观。

从计算工具到函数视角，对数概念的演变体现了数学发展的典型模式：实用需求催生工具（对数表），工具被形式化（运算律），形式化纳入更大的理论框架（函数与逆变换）。
````

### 公式总表

| 类别 | 公式 | 备注 |
|------|------|------|
| 有理指数定义 | $a^{m/n} = (\sqrt[n]{a})^m$ | $a > 0$ |
| 有理指数运算律 | $a^p \cdot a^q \equiv a^{p+q}$ 等（五大律） | $a, b > 0$，$p, q \in \mathbb{Q}$ |
| 实数指数定义 | $a^x = \sup\{a^r \mid r \in \mathbb{Q}, r \le x\}$（$a > 1$） | 由完备性保证良定义 |
| 实数指数运算律 | 五大律对 $p, q \in \mathbb{R}$ 成立 | |
| 对数定义 | $\log_a N = x \iff a^x = N$ | $a > 0$，$a \ne 1$，$N > 0$ |
| 逆变换恒等式 | $\log_a(a^x) = x$，$a^{\log_a N} = N$ | |
| 对数运算律 | $\log_a(MN) \equiv \log_a M + \log_a N$ 等（三律） | $M, N > 0$ |
| 换底公式 | $\log_b N \equiv \dfrac{\log_a N}{\log_a b}$ | |
| 基本指数方程 | $a^x = b \iff x = \log_a b$ | $b > 0$ |
| 基本对数方程 | $\log_a x = b \iff x = a^b$ | |
| 指数模型线性化 | $\log y \equiv \log k + x\,\log a$ | 半对数图 |
| 幂律模型线性化 | $\log y \equiv \log k + n\,\log x$ | 双对数图 |

### 指数函数与对数函数对照表

| 性质 | 指数函数 $E_a$ | 对数函数 $\log_a$ |
|------|---------------|---------------|
| 定义域 | $\mathbb{R}$ | $(0, +\infty)$ |
| 值域 | $(0, +\infty)$ | $\mathbb{R}$ |
| 关键点 | $(0, 1)$、$(1, a)$ | $(1, 0)$、$(a, 1)$ |
| $a > 1$ 单调性 | 严格递增 | 严格递增 |
| $0 < a < 1$ 单调性 | 严格递减 | 严格递减 |
| 渐近线 | $y = 0$（水平） | $x = 0$（垂直） |
| 对称关系 | $y = a^x$ 与 $y = \log_a x$ 关于 $y = x$ 对称 | |

---

## 词汇表

| 中文 | 英文 | 备注 |
|------|------|------|
| $n$ 次方根 | $n$-th root | $\sqrt[n]{a}$ |
| 算术 $n$ 次方根 | principal $n$-th root | 非负主根 |
| 有理数指数 | rational exponent | $a^{m/n}$ |
| 良定义性 | well-definedness | 与分数表示无关 |
| 有理指数运算律 | laws of rational exponents | 五大律 |
| 实数指数 | real exponent | 用 $\sup$/$\inf$ 定义 |
| 上确界 | supremum ($\sup$) | [[Chapter 16 集合论|Ch16]] §16.7 |
| 下确界 | infimum ($\inf$) | [[Chapter 16 集合论|Ch16]] §16.7 |
| 完备性公理 | completeness axiom | [[Chapter 16 集合论|Ch16]]/[[Chapter 17 数系(II)|Ch17]] |
| 戴德金分割 | Dedekind cut | [[Chapter 17 数系(II)|Ch17]] §17.1.3 |
| 指数函数 | exponential function | $E_a: x \mapsto a^x$ |
| 底数 | base | $a$ |
| 严格单调 | strictly monotonic | 递增/递减 |
| 对数 | logarithm | $\log_a N$ |
| 真数 | argument | $N$ |
| 常用对数 | common logarithm | $\log N$（以 10 为底） |
| 自然对数 | natural logarithm | $\ln N$，M1/M2 |
| 逆变换 | inverse transformation | $\log_a$ 与 $E_a$ 互逆 |
| 对数运算律 | laws of logarithms | 积化和/商化差/幂化倍 |
| 换底公式 | change of base formula | $\log_b N \equiv \log_a N / \log_a b$ |
| 对数函数 | logarithmic function | $x \mapsto \log_a x$ |
| 指数方程 | exponential equation | $a^x = b$ |
| 对数方程 | logarithmic equation | $\log_a x = b$ |
| 线性化 | linearization | 对数坐标变换 |
| 半对数图 | semi-log plot | $\log y$ 对 $x$ |
| 双对数图 | log-log plot | $\log y$ 对 $\log x$ |
| 纳皮尔 | John Napier | 对数发明者 |
| 布里格斯 | Henry Briggs | 常用对数改良者 |
