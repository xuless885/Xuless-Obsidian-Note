---
tags: DSE课程笔记
---

# 27　解方程方法 (III)（Methods of Solving Equations (III)）

> [[Chapter 5 解方程方法(I)|解方程方法(I)]] 建立了一元一次方程与二元一次方程组的解法；[[Chapter 18 解方程方法(II)|解方程方法(II)]] 建立了一元二次方程的三种解法（因式分解法、配方法、二次公式），并在 §18.4 提炼出**换元法**的一般框架：当未知数只以某个表达式 $f(x)$ 的幂次形式出现时，令 $u = f(x)$，可把方程降次为关于 $u$ 的一元二次方程。但那两章处理的都是代数方程，未知数只出现在多项式、根式或分式之中。本章进入**超越方程（transcendental equation）**的领域：未知数出现在指数上、对数里、三角函数内。
>
> 解这类方程，要调用前两章建立的函数理论。[[Chapter 25 指数函数与对数函数|指数函数与对数函数]] 证明了指数函数与对数函数都严格单调（从而是单射），且两者互为逆变换；[[Chapter 26 三角函数|三角函数]] 给出了三角函数的周期性、三角方程的通解公式与解三角方程的通解法。本章把这些工具组合起来，系统处理三类方程：**指数方程**、**对数方程**与**三角方程**。核心策略有三条：**利用单射性化简**（同底法、对数合并法），**直接使用对数的定义**（取对数法、转化为指数式），以及**换元化为二次方程**（$u = a^x$、$u = \log_a x$、$u = \sin\theta$）。
>
> 本章按方程类型铺排：§27.1 指数方程（三种解法均不产生增根，但换元后要舍去非正的 $u$）；§27.2 对数方程（定义域约束是核心，**验根**贯穿全节）；§27.3 三角方程（角度制，解通常限于 $0^\circ \le \theta < 360^\circ$）；最后 §27.4 作全章总结。

前置：[[Chapter 18 解方程方法(II)|解方程方法(II)]]、[[Chapter 25 指数函数与对数函数|指数函数与对数函数]]、[[Chapter 26 三角函数|三角函数]]

---

## 27.1　指数方程（Exponential Equations）

> **本节难度上限**：T B- ｜ C C+ ｜ E C+ ｜ Q C+

> 本节处理未知数出现在指数上的方程。三种解法对应三种结构：两边可化为同底（§27.1.1）、两边底数不同（§27.1.2）、指数项呈二次形式（§27.1.3）。前两种是等价变换；第三种换元后须舍去非正的根。

### 27.1.1　同底法（Same Base Method）

上一章 §25.4 的示例中，我们解 $2^x = 32$ 时把 $32$ 写成 $2^5$，再比较指数。这一步之所以成立，靠的是指数函数的单射性。把它写成一般定理：

````ad-thm
title: 定理（同底法） | Theorem（Same Base Method）

设 $a > 0$，$a \ne 1$，$f(x)$、$g(x)$ 为关于 $x$ 的实值表达式。则

$$a^{f(x)} = a^{g(x)} \iff f(x) = g(x)$$
````

````ad-proof
title: 证明 | Proof

上一章指数函数的分析性质定理指出：指数函数 $E_a: x \mapsto a^x$ 严格单调（$a > 1$ 时严格递增，$0 < a < 1$ 时严格递减），故为单射，即 $a^{x_1} = a^{x_2} \implies x_1 = x_2$。

取 $x_1 = f(x)$，$x_2 = g(x)$：若 $a^{f(x)} = a^{g(x)}$，由单射性得 $f(x) = g(x)$；反之，若 $f(x) = g(x)$，两边代入同一幂自然相等。故两者等价。
````

````ad-alg
title: 算法（同底法） | Algorithm（Same Base Method）

1. **识别**：确认方程两边都可写成同一底数 $a$（$a > 0$，$a \ne 1$）的幂。
2. **化同底**：利用指数运算律，把两边改写为同底幂。
3. **比较指数**：令两边的指数相等，得关于 $x$ 的代数方程。
4. **求解**：解该代数方程。由定理（同底法），此变换等价，无需验根。
````

````ad-note
title: 注记（常见的化同底变形） | Note（Common Rewritings to a Same Base）

- $(a^m)^x = a^{mx}$，如 $4^x = (2^2)^x = 2^{2x}$，$8^x = 2^{3x}$；
- $\left(\dfrac{1}{a}\right)^x = a^{-x}$，如 $\left(\dfrac{1}{3}\right)^x = 3^{-x}$；
- $\sqrt{a^x} = a^{x/2}$，一般地 $\sqrt[n]{a^x} = a^{x/n}$。

底数的选择不必唯一：$4^x = 8$ 既可化底为 $2$ 得 $2^{2x} = 2^3$，也可写成 $4^x = 4^{3/2}$，两者都给出 $x = \dfrac{3}{2}$。
````

````ad-example
title: 示例 | Example

解下列方程。

1. $9^x = 27^{x-2}$
2. $2^{x^2} = 8^x$

---

1. 化底为 $3$：$(3^2)^x = (3^3)^{x-2}$，即 $3^{2x} = 3^{3x-6}$。比较指数：$2x = 3x - 6$，解得 $x = 6$。
2. 化底为 $2$：$2^{x^2} = 2^{3x}$，故 $x^2 = 3x$，即 $x(x-3) = 0$，解得 $x = 0$ 或 $x = 3$。

（第 2 题的指数本身含 $x^2$，比较指数后得到二次方程，故有两个解。）
````

### 27.1.2　取对数法（Taking Logarithms）

同底法要求两边能化为同一底数。若两边底数不同且无法互化（如 $2^x = 5^{x-1}$ 中的 $2$ 与 $5$），同底法失效。此时的出路是对数：它能把指数「拉」下来。

先处理较简单的情形：方程一边是常数，即形如 $a^{f(x)} = b$。上一章 §25.4 的基本指数方程结论（$a^x = b \iff x = \log_a b$，要求 $b > 0$）直接推广为

$$a^{f(x)} = b \iff f(x) = \log_a b,$$

解出这个关于 $x$ 的方程即可。若 $b \le 0$，则方程无实数解，因为指数函数的值恒为正（$E_a$ 的值域为 $(0, +\infty)$）。

两边都是幂、而底数不同时，用下面的定理：

````ad-thm
title: 定理（取对数法） | Theorem（Taking Logarithms）

设 $a > 0$，$b > 0$，$a \ne 1$，$b \ne 1$，且底数 $a$ 与 $b$ 无法化为同底。则方程

$$a^{f(x)} = b^{g(x)}$$

等价于两边取任意合法底数 $c$（$c > 0$，$c \ne 1$）的对数后所得的方程

$$f(x)\log_c a = g(x)\log_c b.$$

通常取常用对数（$c = 10$，即 $\log$）。
````

````ad-proof
title: 证明 | Proof

由指数函数的定义，$E_a$ 的值域为 $(0, +\infty)$，故对任意实数 $x$ 恒有 $a^{f(x)} > 0$，$b^{g(x)} > 0$，方程两边均为正数，取对数有意义。

对数函数是单射：上一章对数函数的分析性质定理指出 $\log_c x_1 = \log_c x_2 \iff x_1 = x_2$。因此，对正数两边取以 $c$ 为底的对数是等价变换：

$$a^{f(x)} = b^{g(x)} \iff \log_c\left(a^{f(x)}\right) = \log_c\left(b^{g(x)}\right).$$

再由对数的幂运算律（上一章对数的基本运算律：$\log_c(M^k) \equiv k\log_c M$），右端化为 $f(x)\log_c a = g(x)\log_c b$。
````

````ad-alg
title: 算法（取对数法） | Algorithm（Taking Logarithms）

适用于 $a^{f(x)} = b^{g(x)}$（两边底数不同且无法化同底）。

1. **两边取常用对数**：$\log\left(a^{f(x)}\right) = \log\left(b^{g(x)}\right)$。
2. **用对数幂运算律展开**：$f(x)\log a = g(x)\log b$。
3. **整理并解出 $x$**：当 $f$、$g$ 为一次式时，这是一元一次方程。
4. **代入数值**：$\log a$、$\log b$ 用计算器（或换底公式）取值，得数值解。
````

从图像角度看，解 $a^{f(x)} = b^{g(x)}$ 就是求两条曲线 $y = a^{f(x)}$ 与 $y = b^{g(x)}$ 交点的横坐标：

```tikz
\usepackage{pgfplots}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
  xlabel={$x$}, ylabel={$y$},
  xmin=-0.2, xmax=2.6, ymin=0, ymax=6.5,
  legend pos=north west,
]
\addplot[domain=-0.2:2.6, samples=80, blue!70!black, thick] {2^x};
\addlegendentry{$y=2^x$}
\addplot[domain=-0.2:2.6, samples=80, red!70!black, thick] {5^(x-1)};
\addlegendentry{$y=5^{x-1}$}
\draw[dashed, gray] (axis cs:1.756,0) -- (axis cs:1.756,3.38);
\filldraw[black] (axis cs:1.756,3.38) circle (2pt);
\node[above right] at (axis cs:1.76,3.30) {$(1.76,\ 3.38)$};
\end{axis}
\end{tikzpicture}
\end{document}
```

> 图 27-1：方程 $2^x = 5^{x-1}$ 的解，即曲线 $y = 2^x$ 与 $y = 5^{x-1}$ 交点的横坐标（约 $1.76$）。

````ad-example
title: 示例 | Example

解下列方程。

1. $2^x = 5^{x-1}$
2. $3^{2x-1} = 20$

---

1. 底数 $2$ 与 $5$ 无法化同底，两边取常用对数：$\log 2^x = \log 5^{x-1}$，即 $x\log 2 = (x-1)\log 5$。展开整理：$x\log 2 = x\log 5 - \log 5$，故 $x(\log 5 - \log 2) = \log 5$，解得

   $$x = \dfrac{\log 5}{\log 5 - \log 2} = \dfrac{\log 5}{\log 2.5} \approx \dfrac{0.6990}{0.3979} \approx 1.756.$$

2. 这是 $a^{f(x)} = b$ 的形式，直接化为对数式：$2x - 1 = \log_3 20$，故

   $$x = \dfrac{1 + \log_3 20}{2}.$$

   由换底公式，$\log_3 20 = \dfrac{\log 20}{\log 3} \approx \dfrac{1.3010}{0.4771} \approx 2.727$，故 $x \approx 1.86$。
````

### 27.1.3　换元法：可化为二次方程（Substitution: Reducible to Quadratic）

当方程中的指数项只以 $k^x$ 的幂次出现时（如 $4^x$ 可写成 $(2^x)^2$），就可以套用 [[Chapter 18 解方程方法(II)|解方程方法(II)]] §18.4 的换元法框架：识别模式、换元、解二次方程、回代、检验。

````ad-alg
title: 算法（指数换元法） | Algorithm（Substitution for Exponential Equations）

适用于形如

$$A \cdot k^{2x} + B \cdot k^x + C = 0 \quad (A \neq 0,\ k > 0,\ k \neq 1)$$

的方程（以及可化为该形式的方程）。

1. **换元**：令 $u = k^x$。注意 $u > 0$，且 $k^{2x} = (k^x)^2 = u^2$，原方程化为 $Au^2 + Bu + C = 0$。
2. **解二次方程**：解出 $u$ 的值（因式分解法或二次公式，见第十八章 §18.1）。
3. **舍根**：舍去 $u \le 0$ 的根，因为 $k^x > 0$ 恒成立，这样的 $u$ 没有对应的实数 $x$。
4. **回代**：对每个保留的 $u$，解 $k^x = u$，得 $x = \log_k u$；若 $u$ 恰为 $k$ 的整数幂，直接比较指数。
````

换元为什么「不丢解、不增解」？下面的定理给出精确刻画：

````ad-thm
title: 定理（指数换元法的解的存在性） | Theorem（Solvability of Exponential Substitution）

方程 $A \cdot k^{2x} + B \cdot k^x + C = 0$（$A \neq 0$，$k > 0$，$k \neq 1$）有实数解，当且仅当二次方程 $Au^2 + Bu + C = 0$ 有正实根。
````

````ad-proof
title: 证明 | Proof

换元 $u = k^x$ 建立了 $x \in \mathbb{R}$ 与 $u \in (0, +\infty)$ 之间的一一对应：由指数函数的定义，$E_k$ 的值域为 $(0, +\infty)$；由上一章指数函数的分析性质定理，$E_k$ 严格单调，故为单射。两者合起来，$E_k$ 是从 $\mathbb{R}$ 到 $(0, +\infty)$ 的双射。

因此，原方程的每个实数解 $x$ 对应二次方程的一个正根 $u = k^x$；反之，二次方程的每个正根 $u$ 唯一对应回 $x = \log_k u$（对数的定义）。故原方程有实数解当且仅当二次方程有正实根。
````

````ad-cor
title: 推论（多项式型指数方程的推广） | Corollary（Polynomial-form Exponential Equations）

更一般地，若方程形如 $\displaystyle\sum_{i=0}^{n} A_i (k^x)^i = 0$（即关于 $k^x$ 的多项式方程），均可令 $u = k^x$ 化为关于 $u$ 的多项式方程，且回代时同样只取正根。DSE 范围内常见的是 $n = 2$ 的二次情形。
````

> 此推论为扩展阅读；DSE 常规课程只要求上述算法中的二次情形。

````ad-example
title: 示例 | Example

解下列方程。

1. $4^x - 3 \cdot 2^x - 4 = 0$
2. $4^x - 3 \cdot 2^x + 2 = 0$

---

1. 令 $u = 2^x$（$u > 0$），则 $4^x = (2^x)^2 = u^2$，原方程化为

   $$u^2 - 3u - 4 = 0,$$

   即 $(u-4)(u+1) = 0$，故 $u = 4$ 或 $u = -1$。因 $u = 2^x > 0$，舍去 $u = -1$。回代 $u = 4$：$2^x = 4 = 2^2$，比较指数得 $x = 2$。

2. 同样令 $u = 2^x$，得 $u^2 - 3u + 2 = 0$，即 $(u-1)(u-2) = 0$，故 $u = 1$ 或 $u = 2$。两者均为正，回代：

   - $2^x = 1 = 2^0 \implies x = 0$；
   - $2^x = 2 = 2^1 \implies x = 1$。

   故 $x = 0$ 或 $x = 1$。
````

---

## 27.2　对数方程（Logarithmic Equations）

> **本节难度上限**：T B- ｜ C C+ ｜ E C+ ｜ Q C+

> 本节处理未知数出现在对数里的方程。与指数方程不同，对数方程自带定义域约束：真数必须为正。各种化简（合并对数、去对数）可能放宽这一约束，从而引入**增根（extraneous root）**。**验根**是本节贯穿始终的主题。

### 27.2.1　转化为指数式（定义法）（Definition Approach）

上一章 §25.4 已解过最基本的对数方程 $\log_a x = b \iff x = a^b$。当真数是一般的表达式 $f(x)$ 时，结论直接推广：

````ad-thm
title: 定理（定义法） | Theorem（Definition Approach）

设 $a > 0$，$a \ne 1$。则

$$\log_a f(x) = b \iff f(x) = a^b,$$

且真数条件 $f(x) > 0$ 由 $a^b > 0$ 自动满足。
````

````ad-proof
title: 证明 | Proof

对数的定义（上一章）为：$\log_a N = b \iff a^b = N$，其中 $N > 0$。取 $N = f(x)$ 即得等价关系。

又 $a > 0$，故对任意实数 $b$ 恒有 $a^b > 0$。于是 $f(x) = a^b$ 的解自动满足真数条件 $f(x) > 0$，此变换等价，不引入增根。
````

````ad-example
title: 示例 | Example

解方程 $\log_3(x^2 - 2x) = 1$。

---

由定义法：$x^2 - 2x = 3^1 = 3$，即 $x^2 - 2x - 3 = 0$，分解得 $(x-3)(x+1) = 0$，故 $x = 3$ 或 $x = -1$。

验证：$x = 3$ 时，真数 $9 - 6 = 3 > 0$；$x = -1$ 时，真数 $1 + 2 = 3 > 0$。两解均有效。

（定义法是等价变换，理论上不产生增根；但代入验证仍值得养成习惯。）
````

### 27.2.2　对数合并法（Condensing Logarithms）

当方程含有多个对数项时，先用对数运算律把它们合并，使方程两边各化为**一个**同底的对数式，再「去对数」。去对数的依据是对数函数的单射性：

````ad-thm
title: 定理（对数合并法） | Theorem（Condensing Logarithms）

设 $a > 0$，$a \ne 1$。若 $F(x) > 0$ 且 $G(x) > 0$，则

$$\log_a F(x) = \log_a G(x) \iff F(x) = G(x).$$
````

````ad-proof
title: 证明 | Proof

上一章对数函数的分析性质定理指出：对数函数 $L_a: x \mapsto \log_a x$ 是单射，即 $\log_a x_1 = \log_a x_2 \iff x_1 = x_2$。

取 $x_1 = F(x)$，$x_2 = G(x)$。前提条件 $F(x) > 0$、$G(x) > 0$ 保证两边的对数式有定义；在此前提下，由单射性即得等价关系。
````

````ad-alg
title: 算法（对数合并法） | Algorithm（Condensing Logarithms）

给定含多个对数项的方程：

1. **合并对数**：利用对数运算律（上一章对数的基本运算律）把各项合并：
   - $\log_a M + \log_a N = \log_a(MN)$；
   - $\log_a M - \log_a N = \log_a\left(\dfrac{M}{N}\right)$；
   - $k\log_a M = \log_a(M^k)$。
2. **去对数**：合并后方程两边各为一个同底对数式，形如 $\log_a F(x) = \log_a G(x)$，由对数函数的单射性得 $F(x) = G(x)$。
3. **求解**：解代数方程 $F(x) = G(x)$。
4. **验根**：把每个根代入**原方程**，检查所有对数项的真数是否为正；不满足的根是增根，舍去（见 §27.2.4）。
````

````ad-warning
title: 警告（验根不可省略） | Warning（Verification Is Mandatory）

步骤 2「去对数」丢弃了 $F(x) > 0$、$G(x) > 0$ 两个约束；步骤 1「合并对数」还可能进一步放宽约束（见 §27.2.4 的定理）。因此步骤 3 解出的根必须逐一代回原方程检验。
````

````ad-example
title: 示例 | Example

解下列方程。

1. $\log_2(x-1) + \log_2(x+2) = 2$
2. $\log(x+5) - \log x = 1$

---

1. 合并左边：$\log_2[(x-1)(x+2)] = 2$。去对数：$(x-1)(x+2) = 2^2 = 4$，即 $x^2 + x - 6 = 0$，分解得 $(x+3)(x-2) = 0$，故 $x = -3$ 或 $x = 2$。

   验根：$x = 2$ 时，真数 $x - 1 = 1 > 0$，$x + 2 = 4 > 0$，有效。$x = -3$ 时，真数 $x - 1 = -4 < 0$，$x + 2 = -1 < 0$，原方程左边无定义，为增根，舍去。故 $x = 2$。

   （注意 $x = -3$ 使乘积 $(x-1)(x+2) = 4 > 0$，满足合并后方程的定义域，却不满足原方程：这正是「合并对数放宽真数条件」的典型情形。）
2. 合并左边：$\log\dfrac{x+5}{x} = 1$。去对数：$\dfrac{x+5}{x} = 10^1 = 10$，即 $x + 5 = 10x$，解得 $x = \dfrac{5}{9}$。

   验根：$x + 5 > 0$，$x > 0$，有效。故 $x = \dfrac{5}{9}$。
````

### 27.2.3　换元法：可化为二次方程（Substitution: Reducible to Quadratic）

与指数方程平行：当方程中只以 $\log_a x$ 的幂次出现时，令 $u = \log_a x$ 即可化为二次方程。

````ad-alg
title: 算法（对数换元法） | Algorithm（Substitution for Logarithmic Equations）

适用于形如

$$A(\log_a x)^2 + B(\log_a x) + C = 0 \quad (A \neq 0)$$

的方程。

1. **换元**：令 $u = \log_a x$，原方程化为 $Au^2 + Bu + C = 0$。
2. **解二次方程**：解出 $u$ 的值。
3. **回代**：对每个 $u$，由对数的定义 $u = \log_a x \iff x = a^u$ 解出 $x$。
4. **验根**：$x = a^u > 0$ 恒成立（$a > 0$），故本形式的回代不产生增根；但若原方程的真数不是单纯的 $x$（见下方推论），仍须检验真数条件。
````

````ad-cor
title: 推论（一般真数表达式） | Corollary（General Argument）

若方程形如 $A(\log_a f(x))^2 + B(\log_a f(x)) + C = 0$，令 $u = \log_a f(x)$，解出 $u$ 后回代解 $f(x) = a^u$。此时真数条件 $f(x) > 0$ 虽由 $a^u > 0$ 自动满足，仍须确认所得 $x$ 使原方程中**所有**对数项有定义。
````

````ad-example
title: 示例 | Example

解下列方程。

1. $(\log_3 x)^2 - 5\log_3 x + 6 = 0$
2. $(\log_2(x-1))^2 - \log_2(x-1) - 2 = 0$

---

1. 令 $u = \log_3 x$，得 $u^2 - 5u + 6 = 0$，即 $(u-2)(u-3) = 0$，故 $u = 2$ 或 $u = 3$。回代：

   - $\log_3 x = 2 \implies x = 3^2 = 9$；
   - $\log_3 x = 3 \implies x = 3^3 = 27$。

   两解均使真数为正，有效。
2. 令 $u = \log_2(x-1)$，得 $u^2 - u - 2 = 0$，即 $(u-2)(u+1) = 0$，故 $u = 2$ 或 $u = -1$。回代：

   - $x - 1 = 2^2 = 4 \implies x = 5$；
   - $x - 1 = 2^{-1} = \dfrac{1}{2} \implies x = \dfrac{3}{2}$。

   验根：两解均使真数 $x - 1 > 0$，有效。故 $x = 5$ 或 $x = \dfrac{3}{2}$。
````

### 27.2.4　验根原则（Verification of Roots）

对数方程为什么必须验根？增根究竟从何而来？下面的定理把来源逐一说清。

````ad-thm
title: 定理（对数方程的增根来源） | Theorem（Sources of Extraneous Roots）

解对数方程的过程中，下列三类操作的增根风险各不相同：

1. **合并对数**：$\log_a M + \log_a N = \log_a(MN)$ 成立的前提是 $M > 0$ 且 $N > 0$。合并后的形式 $\log_a(MN)$ 只要求 $MN > 0$，条件更弱，可能引入使 $M$、$N$ 同时为负（但 $MN > 0$）的增根。
2. **去对数**：由 $\log_a F(x) = \log_a G(x)$ 化为 $F(x) = G(x)$ 时，丢弃了 $F(x) > 0$ 与 $G(x) > 0$ 两个约束，可能引入使真数非正的增根。
3. **定义转换**：$\log_a f(x) = b$ 化为 $f(x) = a^b$ 是等价变换，不产生增根（因 $a^b > 0$ 自动保证 $f(x) > 0$）。
````

````ad-proof
title: 证明 | Proof

对第 1 条：等式 $\log_a M + \log_a N = \log_a(MN)$ 的左边要求 $M > 0$ 且 $N > 0$，右边只要求 $MN > 0$。当 $M < 0$ 且 $N < 0$ 时，$MN > 0$ 满足右边的定义域，但左边的两个对数项均无定义。因此，从合并后的方程解出的根，可能使各真数同时为负，代回原方程时左边无定义，即为增根。

对第 2 条：由对数函数的单射性，$\log_a F(x) = \log_a G(x) \iff F(x) = G(x)$ 仅在 $F(x) > 0$、$G(x) > 0$ 的前提下成立。去掉对数后解 $F(x) = G(x)$，解集可能扩大。

对第 3 条：由对数的定义，$\log_a f(x) = b \iff f(x) = a^b$；又 $a > 0$ 时 $a^b > 0$，故真数条件自动满足，变换等价。
````

````ad-alg
title: 算法（对数方程的验根步骤） | Algorithm（Verification Procedure）

对解出的每一个 $x$ 值，代入**原方程**（不是化简后的代数方程）逐项检查：

1. 底数是否满足 $a > 0$ 且 $a \ne 1$（本书中底数均为常数，此步自动通过）。
2. 每个对数项的真数是否**严格大于零**。
3. 若某项真数不大于零，则该 $x$ 为增根，舍去；否则保留。
````

````ad-example
title: 示例 | Example

解方程 $\log_2(x-3) + \log_2(x-1) = 3$。

---

合并左边：$\log_2[(x-3)(x-1)] = 3$。去对数：$(x-3)(x-1) = 2^3 = 8$，即 $x^2 - 4x + 3 = 8$，整理得 $x^2 - 4x - 5 = 0$，分解得 $(x-5)(x+1) = 0$，故 $x = 5$ 或 $x = -1$。

代回原方程逐一验证：

- $x = 5$：$\log_2 2 + \log_2 4 = 1 + 2 = 3$，有效。
- $x = -1$：真数 $x - 3 = -4$，$x - 1 = -2$ 均为负，原方程左边无定义，舍去。

故 $x = 5$。

（$x = -1$ 正是「两真数同负而乘积为正」的情形：$(-4)(-2) = 8 > 0$ 满足合并后方程，却不满足原方程。这就是验根必须代回原方程的原因。）
````

---

## 27.3　三角方程（Trigonometric Equations）

> **本节难度上限**：T B+ ｜ C B- ｜ E C+ ｜ Q C+

> 本节在上一章三角方程理论的基础上，处理两类新方程：可换元化为二次方程的（§27.3.2），以及需要先用恒等式统一为单一三角函数的（§27.3.3）。自变量以度计，与上一章主线一致；DSE 试题中，三角方程的解通常限于指定区间，最常见为 $0^\circ \le \theta < 360^\circ$。

### 27.3.1　基本三角方程回顾（Recap of Basic Trigonometric Equations）

上一章（§26.2.6）已建立了三角方程的完整理论，本章直接引用。通解公式为：

> 1. 若 $\sin\theta = \sin\alpha$，则 $\theta = \alpha + 360^\circ k$ 或 $\theta = 180^\circ - \alpha + 360^\circ k$（$k \in \mathbb{Z}$）；
> 2. 若 $\cos\theta = \cos\alpha$，则 $\theta = \pm\alpha + 360^\circ k$（$k \in \mathbb{Z}$）；
> 3. 若 $\tan\theta = \tan\alpha$，则 $\theta = \alpha + 180^\circ k$（$k \in \mathbb{Z}$）。

求指定区间内解的标准流程是**通解法**（见 §26.2.6）：化方程为 $\sin\theta = k$（或 $\cos$、$\tan$）；判解况；由 $k$ 的符号与 ASTC 法则（各象限符号定理）定出解所在象限；取任一特解 $\alpha$，按通解公式展开；最后截取指定区间内的全部解。

> 通解公式给出全部解的结构；实际解题时，先写通解、再截取指定区间，是不漏解的稳妥做法。DSE 试题中三角方程的解通常限于 $0^\circ$ 至 $360^\circ$ 的区间。

### 27.3.2　可化为二次的三角方程（Trigonometric Equations Reducible to Quadratic）

若三角函数值只以 $\sin\theta$（或 $\cos\theta$、$\tan\theta$）的幂次出现，便可换元化为二次方程。与指数、对数换元的唯一区别在于：换元变量 $u = \sin\theta$ 的取值受值域限制，$|u| \le 1$。

````ad-alg
title: 算法（三角换元法） | Algorithm（Substitution for Trigonometric Equations）

适用于 $A\sin^2\theta + B\sin\theta + C = 0$（$A \neq 0$）及 $\cos$、$\tan$ 的类似形式。

1. **换元**：令 $u = \sin\theta$，原方程化为 $Au^2 + Bu + C = 0$。
2. **解二次方程并筛选**：解出 $u$，**只保留满足 $|u| \le 1$ 的根**（$\sin\theta$ 的值域为 $[-1, 1]$；$|u| > 1$ 的根无对应的实数 $\theta$）。
3. **回代解三角方程**：对每个保留的 $u$，用通解法解 $\sin\theta = u$，写出指定区间（通常 $0^\circ \le \theta < 360^\circ$）内的全部解。
4. **指定区间截取**：若题目指定其他区间，先写通解再截取。

$\cos$ 换元同理（$|u| \le 1$）；$\tan$ 换元时 $u$ 可取任意实数，无额外筛选。
````

````ad-thm
title: 定理（三角换元法的约束条件） | Theorem（Constraints of Trigonometric Substitution）

设 $A \neq 0$。方程 $A\sin^2\theta + B\sin\theta + C = 0$（及 $\cos$、$\tan$ 的类似形式）的实数解，由二次方程 $Au^2 + Bu + C = 0$ 中满足下列条件的根 $u$ 决定：

1. 换元为 $u = \sin\theta$ 或 $u = \cos\theta$ 时，$u$ 必须满足 $|u| \le 1$；
2. 换元为 $u = \tan\theta$ 时，$u$ 可取任意实数。

对每个符合条件的 $u$，解 $\sin\theta = u$（或 $\cos\theta = u$、$\tan\theta = u$），再截取指定区间内的解。
````

````ad-proof
title: 证明 | Proof

上一章三角函数的定义给出：$\sin$ 与 $\cos$ 的值域均为 $[-1, 1]$，$\tan$ 的值域为 $\mathbb{R}$（$\tan$ 在 $\cos\theta = 0$ 处无定义，其余各值均可取到）。

因此，当 $u = \sin\theta$（或 $\cos\theta$）时，必有 $|u| \le 1$；$|u| > 1$ 的根使方程 $\sin\theta = u$（或 $\cos\theta = u$）无实数解，应予舍去。当 $u = \tan\theta$ 时，任意实数 $u$ 都有对应的 $\theta$，无需筛选。
````

````ad-example
title: 示例 | Example

解下列方程，其中 $0^\circ \le \theta < 360^\circ$。

1. $2\sin^2\theta - 3\sin\theta + 1 = 0$
2. $2\cos^2\theta + 5\cos\theta - 3 = 0$

---

1. 令 $u = \sin\theta$，得 $2u^2 - 3u + 1 = 0$，即 $(2u-1)(u-1) = 0$，故 $u = \dfrac{1}{2}$ 或 $u = 1$，均满足 $|u| \le 1$。

   - $\sin\theta = \dfrac{1}{2}$：取特解 $\alpha = 30^\circ$，通解为 $\theta = 30^\circ + 360^\circ n$ 或 $\theta = 150^\circ + 360^\circ n$；按 ASTC，$\sin$ 在第一、二象限为正，区间内得 $\theta = 30^\circ$ 或 $150^\circ$。
   - $\sin\theta = 1$：$\theta = 90^\circ$。

   故 $\theta = 30^\circ,\ 90^\circ,\ 150^\circ$。
2. 令 $u = \cos\theta$，得 $2u^2 + 5u - 3 = 0$，即 $(2u-1)(u+3) = 0$，故 $u = \dfrac{1}{2}$ 或 $u = -3$。因 $|\cos\theta| \le 1$，舍去 $u = -3$（方程 $\cos\theta = -3$ 无实数解）。

   - $\cos\theta = \dfrac{1}{2}$：取特解 $\alpha = 60^\circ$，通解为 $\theta = \pm 60^\circ + 360^\circ n$；$\cos$ 在第一、四象限为正，区间内得 $\theta = 60^\circ$ 或 $300^\circ$。

   故 $\theta = 60^\circ,\ 300^\circ$。
````

### 27.3.3　利用恒等式统一为同一种三角函数（Unification via Identity）

当方程同时含有 $\sin\theta$、$\cos\theta$（或 $\tan\theta$）的混合项时，不能直接换元，须先用恒等式把方程统一为**单一**三角函数的代数方程，再换元。上一章的恒等式转换法（示例 $2\cos^2\theta + \sin\theta - 1 = 0$）正是此思路；本节把它固化成一般算法，并说清哪几步是等价变形、哪几步可能漏解。

````ad-alg
title: 算法（恒等式统一法） | Algorithm（Unification via Identity）

1. **选择目标函数**：观察方程结构，选定一种三角函数为目标（通常为 $\sin\theta$ 或 $\cos\theta$；各项次数相同的「齐次」方程也可选 $\tan\theta$）。
2. **恒等式转换**：
   - 以 $\sin$ 为目标：用 $\cos^2\theta \equiv 1 - \sin^2\theta$；
   - 以 $\cos$ 为目标：用 $\sin^2\theta \equiv 1 - \cos^2\theta$；
   - 以 $\tan$ 为目标：用 $\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$，即两边同除以 $\cos\theta$ 的适当幂次（**先检查 $\cos\theta = 0$ 的角**，见定理（恒等式转换的等价性））。
3. **换元化为二次**：统一后的方程形如 $A(\text{目标函数})^2 + B(\text{目标函数}) + C = 0$，按算法（三角换元法）处理。
4. **验根**：若变换涉及除法，确认被排除的角（$\cos\theta = 0$，即 $\theta = 90^\circ + 180^\circ k$）已单独检验；汇总全部解。
````

````ad-thm
title: 定理（恒等式转换的等价性） | Theorem（Equivalence of Identity Substitution）

1. 利用 $\sin^2\theta + \cos^2\theta \equiv 1$ 进行代换（如以 $1 - \sin^2\theta$ 替换 $\cos^2\theta$）是**等价变换**：不引入增根，也不遗漏解。
2. 利用 $\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$ 进行代换时，原方程须排除 $\cos\theta = 0$ 的角。若化简中两边约去含 $\cos\theta$ 的因式，可能遗漏 $\cos\theta = 0$ 的解，须先把这些角代入原方程单独检验。
````

````ad-proof
title: 证明 | Proof

对第 1 条：$\sin^2\theta + \cos^2\theta \equiv 1$ 对一切角 $\theta$ 成立（上一章基本恒等式定理），故以 $1 - \sin^2\theta$ 替换 $\cos^2\theta$（或反之）是恒等变形，变形前后的方程解集完全相同。

对第 2 条：$\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$ 仅在 $\cos\theta \neq 0$ 时成立（由 $\tan$ 的定义，$\cos\theta = 0$ 处 $\tan\theta$ 无定义）。两边同除以 $\cos\theta$ 或其幂次，等价性只在 $\cos\theta \neq 0$ 的范围内保持；$\cos\theta = 0$ 的角必须单独代入原方程检验，方能保证不漏解。
````

````ad-example
title: 示例 | Example

解下列方程，其中 $0^\circ \le \theta < 360^\circ$。

1. $2\sin^2\theta - \cos\theta - 2 = 0$
2. $\sin^2\theta - 2\sin\theta\cos\theta - 3\cos^2\theta = 0$

---

1. 以 $\cos$ 为目标，用 $\sin^2\theta \equiv 1 - \cos^2\theta$ 代入：

   $$2(1 - \cos^2\theta) - \cos\theta - 2 = 0,$$

   即 $-2\cos^2\theta - \cos\theta = 0$，亦即 $-\cos\theta(2\cos\theta + 1) = 0$。故 $\cos\theta = 0$ 或 $\cos\theta = -\dfrac{1}{2}$。

   - $\cos\theta = 0$：$\theta = 90^\circ$ 或 $270^\circ$；
   - $\cos\theta = -\dfrac{1}{2}$：由 $\cos(180^\circ - 60^\circ) \equiv -\cos 60^\circ$，取特解 $\alpha = 120^\circ$，通解为 $\theta = \pm 120^\circ + 360^\circ n$；$\cos$ 在第二、三象限为负，得 $\theta = 120^\circ$ 或 $240^\circ$。

   故 $\theta = 90^\circ,\ 120^\circ,\ 240^\circ,\ 270^\circ$。
2. 方程各项对 $\sin\theta$、$\cos\theta$ 均为二次（齐次），以 $\tan$ 为目标。**先检查 $\cos\theta = 0$ 的角**：代入 $\theta = 90^\circ$ 或 $270^\circ$，左边 $= 1 \neq 0$，均非解。故解中必有 $\cos\theta \neq 0$，可两边同除以 $\cos^2\theta$：

   $$\tan^2\theta - 2\tan\theta - 3 = 0,$$

   即 $(\tan\theta - 3)(\tan\theta + 1) = 0$，故 $\tan\theta = 3$ 或 $\tan\theta = -1$。

   - $\tan\theta = -1$：由 $\tan(180^\circ - 45^\circ) \equiv -\tan 45^\circ$，取特解 $\alpha = 135^\circ$，通解为 $\theta = 135^\circ + 180^\circ n$；区间内 $\theta = 135^\circ$ 或 $315^\circ$；
   - $\tan\theta = 3$：用计算器取特解 $\alpha \approx 71.6^\circ$（满足 $\tan\alpha = 3$ 的角），通解为 $\theta \approx 71.6^\circ + 180^\circ n$；$\tan$ 在第一、三象限为正，得 $\theta \approx 71.6^\circ$ 或 $251.6^\circ$。

   故 $\theta \approx 71.6^\circ,\ 135^\circ,\ 251.6^\circ,\ 315^\circ$。
````

---

## 27.4　小结（Summary）

````ad-note
title: 注记（本章主线与易错点） | Note（Main Threads and Common Pitfalls）

**三条主线：**

1. **指数方程（§27.1）**：同底法（指数函数是单射，同底幂相等当且仅当指数相等）；取对数法（两边底数不同时取对数，把指数拉下来）；换元法（令 $u = a^x$，化为二次方程，回代时只取正根 $u$）。前两者是等价变换，不产生增根。
2. **对数方程（§27.2）**：定义法（$\log_a f(x) = b \iff f(x) = a^b$，等价变换）；对数合并法（运算律合并后，用对数函数的单射性去对数）；换元法（令 $u = \log_a x$）。核心挑战是**增根**：合并对数放宽真数条件、去对数丢弃正性约束，所有解必须代回原方程检验。
3. **三角方程（§27.3）**：在通解公式与通解法的基础上，换元法（令 $u = \sin\theta$ 等，注意 $|u| \le 1$ 的筛选）；恒等式统一法（用 $\sin^2\theta + \cos^2\theta \equiv 1$ 化为单一三角函数后换元）。$\sin^2\theta + \cos^2\theta \equiv 1$ 的代换是等价的；除以 $\cos\theta$ 的幂次前必须先检验 $\cos\theta = 0$ 的角。

**易错点：**

- 指数换元后忘记 $u = a^x > 0$ 恒成立，没有舍去负的 $u$。
- 对数方程去对数后不验根：解出的根可能使真数非正，原方程左边无定义。
- 合并对数时误以为 $MN > 0$ 就够了：原方程要求各真数**分别**为正。
- 换元 $u = \sin\theta$ 时忘记 $|u| \le 1$ 的约束（如 $\sin\theta = 2$ 无实数解）。
- 解 $\sin\theta = k$ 时只写一个象限的解：每次解完都问「ASTC 中哪些象限符合符号」。
- 含 $\tan\theta$ 的方程两边除以 $\cos\theta$ 前，没有先检验 $\cos\theta = 0$ 的角。
````

### 方法总表

| 方程类型 | 典型形式 | 方法 | 关键步骤 | 增根风险 |
| --- | --- | --- | --- | --- |
| 指数 | $a^{f(x)} = a^{g(x)}$ | 同底法 | 比较指数 | 无（等价变换） |
| 指数 | $a^{f(x)} = b^{g(x)}$（不同底） | 取对数法 | 两边取对数，化为代数方程 | 无 |
| 指数 | $Ak^{2x} + Bk^x + C = 0$ | 换元 $u = k^x$ | 解二次后回代 | 舍去 $u \le 0$ |
| 对数 | $\log_a f(x) = b$ | 定义法 | 转化为指数式 $f(x) = a^b$ | 无 |
| 对数 | 多个对数项的和差 | 对数合并法 | 合并后去对数 | **高**：代回原方程验根 |
| 对数 | $A(\log_a x)^2 + B\log_a x + C = 0$ | 换元 $u = \log_a x$ | 解二次后回代 | 低：回代自动为正；复杂真数须验 |
| 三角 | $\sin\theta$（$\cos$、$\tan$）的二次形式 | 换元 $u = \sin\theta$ | $\lvert u\rvert \le 1$ 筛选，通解法取解 | 舍去 $\lvert u\rvert > 1$ |
| 三角 | $\sin$、$\cos$、$\tan$ 混合 | 恒等式统一法 | 统一为单一函数再换元 | 除以 $\cos\theta$ 前检验 $\cos\theta = 0$ |

回顾全章：指数方程、对数方程、三角方程形式各异，策略却高度统一。用单射性化简，用定义互相转化，用换元降次为二次方程。最后一条正是 [[Chapter 18 解方程方法(II)|解方程方法(II)]] §18.4 换元法框架的延续：分式方程、根式方程与本章的超越方程，走的是同一条「换元、解 $u$、回代、检验」的路线。分式方程与根式方程的处理可回顾该节。

---

## 词汇表

| 中文 | 英文 | 备注 |
| --- | --- | --- |
| 超越方程 | transcendental equation | 指数/对数/三角方程的统称 |
| 指数方程 | exponential equation | 未知数在指数上 |
| 对数方程 | logarithmic equation | 未知数在对数内 |
| 三角方程 | trigonometric equation | 解常限于 $0^\circ \le \theta < 360^\circ$ |
| 同底法 | same base method | 比较指数 |
| 取对数法 | taking logarithms | 两边底数不同时 |
| 定义法 | definition approach | 对数式转指数式 |
| 对数合并法 | condensing logarithms | 用对数运算律 |
| 换元法 | method of substitution | 令 $u = f(x)$ |
| 增根 | extraneous root | 化简引入的无效根 |
| 验根 | verification of roots | 代回原方程检验 |
| 齐次三角方程 | homogeneous trigonometric equation | 除以 $\cos^n\theta$ 统一为 $\tan$ |
