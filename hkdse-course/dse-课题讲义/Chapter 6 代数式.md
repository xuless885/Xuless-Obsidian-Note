---
tags: DSE课程笔记
---

# 6　代数式（Algebraic Expressions）

> 本章处理三个核心主题：公式的主项变换与代入法、恒等式及其在因式分解中的应用、以及方根与代数分式的运算与化简。这些工具是代数变形的基础，贯穿中学数学始终。

前置：[[Chapter 4 多项式(I)|多项式(I)]]

---

## 6.1　公式及代入法（Formulas & Substitution）

> **本节难度上限**：T C+ ｜ C C ｜ E C ｜ Q D

> 公式是描述量之间关系的等式。代入法让我们在已知某些量的值后求出其余量，而变换主项则让我们能灵活改变公式的表达形式。

### 6.1.1　公式

> 回顾[[Chapter 0 基础概念|基础概念]]：等式是连接两个对象、断言其一致的命题。当等式中含有变量时，它成为一个开放命题（Open Statement），即真值取决于变量取值的命题。公式是其中特殊的一类：它专用于描述量之间的普遍关系。

````ad-def
title: 定义（公式） | Definition（Formula）

用数学符号表示量之间关系的等式。
````

公式是方程的子集——所有公式都是方程，但并非所有方程都是公式。一般方程（如 $2x+1=5$）在求解时往往能唯一确定未知数的值；而公式描述的是多个变量之间的普遍关系，通常无法由公式自身唯一确定各变量的取值，需要有额外的已知条件才能确定其余变量。

例如 $A = \ell w$ 是公式（面积与长宽的关系），单独看它无法确定 $\ell$ 或 $w$ 的具体值：必须至少知道其中一个才能求出另一个。

### 6.1.2　代入法

> 代入法的逻辑基础来自基础概念中介绍的莱布尼茨定律：若两个东西相等，则它们在任何命题中可以互换而不改变命题的真值。

````ad-def
title: 定义（代入法） | Definition（Substitution）

由莱布尼茨定律（同一者不可分原理）直接导出的一种代换方法。
````

其逻辑基础为公理（莱布尼茨定律 / Leibniz's Law）：
$$\forall x, y,\quad (x = y) \implies (P(x) \iff P(y))$$
含义为：若两个对象相等，则任一关于前者的命题均可替换为关于后者的命题而不改变真值。

在公式中的应用：若已知某变量 $x$ 的取值为 $a$（即 $x = a$），则由莱布尼茨定律，公式中所有 $x$ 的出现均可替换为 $a$，从而将多变量公式化为仅含已知数的算式，进而求得其余变量的值。

具体方法：将已知量的值直接替换公式中对应变量的所有出现，计算得出未知量的值。代入时须注意单位一致性；代入代数式时须加括号——例如代入 $x=-2$ 到 $x^2$ 时若写成 $-2^2$ 就会误算成 $-4$ 而非 $4$。

````ad-example
title: 示例 | Example


已知公式 $v = u + at$，若 $u = 2$，$a = 3$，$t = 4$，求 $v$。

---

代入 $u=2, a=3, t=4$：
$$
\begin{aligned}
v &= u + at \\
 &= 2 + 3 \times 4 \\
 &= 2 + 12 \\
 &= 14
\end{aligned}
$$
````

### 6.1.3　公式的主项
````ad-def
title: 定义（公式的主项） | Definition（Subject of a Formula）

在公式中，被单独表示在等号一侧（通常为左侧），且系数为 $1$ 的变量。
````

例如在 $V = IR$ 中，$V$ 已经是主项（系数为 $1$，单独在左侧）。若需要以 $I$ 为主项，则需将公式变形为 $I = \dfrac{V}{R}$。

**方法（Method，变换主项 / Change of Subject）**

利用等式的性质，将公式变形，使另一个变量成为主项。根据公式的结构，分为以下四种基本情形：

> **情形 I：线性情形（Linear Case）**
> 主项仅以一次形式出现，不涉及分母或乘方。
> *   **方法：** 利用等式的加减乘除性质直接移项。
> *   **解释：** 所有运算都是加减乘除的一元一次结构，直接逆运算即可解出。


````ad-example
title: 示例（情形 I） | Example（情形 I）


对 $y = mx + c$，以 $x$ 为主项：
$$
\begin{aligned}
y &= mx + c \\
y - c &= mx \\
x &= \frac{y - c}{m} \qquad (m \neq 0)
\end{aligned}
$$
````


> **情形 II：含分母情形（Fractional Case）**
> 主项出现在分母中。
> *   **方法：** 先两边同乘分母消去分数，再按线性情形处理。
> *   **解释：** 分母引入了一个额外的嵌套，必须先「脱掉」这层分母，本质是对方程两边乘以同一个非零量。

````ad-example
title: 示例（情形 II） | Example（情形 II）


对 $\dfrac{1}{f} = \dfrac{1}{u} + \dfrac{1}{v}$，以 $f$ 为主项：
$$
\begin{aligned}
\frac{1}{f} &= \frac{1}{u} + \frac{1}{v} \\
\frac{1}{f} &= \frac{v + u}{uv} \\
f &= \frac{uv}{u+v}
\end{aligned}
$$
````

> **情形 III：含平方/开方情形（Square / Square Root Case）**
> 主项以平方形式出现或在根号内。
> *   **方法：** 若主项为 $x^2$，先解出 $x^2$，再开方得 $x = \pm \sqrt{\cdots}$；若主项在根号内，先两边平方，再解出主项。
> *   **解释：** 平方与开方互为逆运算。注意开方后会出现 $\pm$，因为正数的平方与负数的平方结果相同。

````ad-example
title: 示例（情形 III） | Example（情形 III）


对 $E = \dfrac{1}{2}mv^2$，以 $v$ 为主项：
$$
\begin{aligned}
E &= \frac{1}{2}mv^2 \\
2E &= mv^2 \\
v^2 &= \frac{2E}{m} \\
v &= \pm\sqrt{\frac{2E}{m}}
\end{aligned}
$$
````

> **情形 IV：主项出现多次（Multiple Occurrences）**
> 主项在公式的不同项中出现。
> *   **方法：** 将所有含主项的项移到一侧，不含主项的项移到另一侧，提取公因式（即主项），再解出主项。
> *   **解释：** 当主项散落在多处时，无法直接移项。必须先「收集」到同一边，提取公因式后化为一个整体，再按情形 I 处理。

````ad-example
title: 示例（情形 IV） | Example（情形 IV）


对 $ax + b = cx + d$，以 $x$ 为主项：
$$
\begin{aligned}
ax + b &= cx + d \\
ax - cx &= d - b \\
(a-c)x &= d - b \\
x &= \frac{d-b}{a-c} \qquad (a \neq c)
\end{aligned}
$$
````

---

## 6.2　恒等式（Identities）

> **本节难度上限**：T B- ｜ C C ｜ E C ｜ Q C

> 恒等式是对变量所有允许取值均成立的等式。掌握核心恒等式的正用（展开）与逆用（因式分解）是代数运算的基本功。

### 6.2.1　恒等式与其判定

> 回顾[[Chapter 0 基础概念|基础概念]]：等式是连接两个对象、断言其一致的命题。当等式中含有变量时，它成为一个开放命题 $P(x_1, \dots, x_n)$，其真值取决于变量的取值。

````ad-def
title: 定义（恒等式） | Definition（Identity）

设 $P(x_1, x_2, \dots, x_n)$ 为一个含有变量 $x_1, \dots, x_n$ 的等式（开放命题）。若对变量在其取值范围内的**任意**赋值，该等式均成立，则称该等式为恒等式。用数理逻辑表示为：
$$\forall x_1,\ \forall x_2,\ \dots,\ \forall x_n,\quad P(x_1, x_2, \dots, x_n) = \mathbb{T}$$
````

关键区别在于量词：方程用**存在量词** $\exists$（「存在某个 $x$」），恒等式用**全称量词** $\forall$（「对所有 $x$」）。具体而言：

*   **方程：** 含有变量的等式（开放命题），我们寻求某些特定取值使命题为真，即 $\exists x,\ P(x) = \mathbb{T}$。
*   **恒等式：** 含有变量的等式（开放命题），对**所有**取值均为真，即 $\forall x,\ P(x) = \mathbb{T}$。

````ad-example
title: 示例 | Example


1. $2x + 1 = 5$ 是**方程**（仅当 $x = 2$ 时成立）；
2. $2(x+1) = 2x+2$ 是**恒等式**（对任意 $x$ 均成立）。此时我们要写：
$$2(x+1) \equiv 2x+2$$
````


### 6.2.2　核心恒等式

> 以下公式对于任意实数 $a, b$ 均成立。它们既有正向的展开运用，也有逆向的因式分解运用——两个方向同等重要。

````ad-thm
title: 定理（平方差公式） | Theorem（Difference of Squares）

$$(a+b)(a-b) \equiv a^2 - b^2$$
````

其逆用为因式分解公式：$a^2 - b^2 \equiv (a+b)(a-b)$。

````ad-proof
title: 证明 | Proof

利用乘法对加法的分配律展开：
$$
\begin{aligned}
(a+b)(a-b) &\equiv (a+b)a - (a+b)b \\
          &\equiv a^2 + ba - ab - b^2 \\
          &\equiv a^2 + ab - ab - b^2 \\
          &\equiv a^2 - b^2
\end{aligned}
$$
````

````ad-thm
title: 定理（完全平方公式） | Theorem（Perfect Square）

$$(a \pm b)^2 \equiv a^2 \pm 2ab + b^2$$
````

记忆口诀：首平方，尾平方，积的二倍放中央。其逆用为因式分解公式：$a^2 \pm 2ab + b^2 \equiv (a \pm b)^2$。

````ad-proof
title: 证明 | Proof

利用平方差公式或直接展开：
$$
\begin{aligned}
(a+b)^2 &\equiv (a+b)(a+b) \\
       &\equiv a(a+b) + b(a+b) \\
       &\equiv a^2 + ab + ba + b^2 \\
       &\equiv a^2 + 2ab + b^2
\end{aligned}
$$
对于 $(a-b)^2$，将 $b$ 替换为 $-b$ 即得：
$$
\begin{aligned}
(a-b)^2 &\equiv [a + (-b)]^2 \\
       &\equiv a^2 + 2a(-b) + (-b)^2 \\
       &\equiv a^2 - 2ab + b^2
\end{aligned}
$$
````

````ad-thm
title: 定理（立方和与立方差公式） | Theorem（Sum and Difference of Cubes）

$$a^3 + b^3 \equiv (a+b)(a^2 - ab + b^2)$$
$$a^3 - b^3 \equiv (a-b)(a^2 + ab + b^2)$$
````

注意事项：二次项部分 $(-ab$ 或 $+ab)$ 的系数是 $1$，不是 $2$，不要与完全平方公式混淆。立方差公式相比立方和公式，仅将 $b$ 替换为 $-b$ 即可得到。

````ad-proof
title: 证明 | Proof

先证立方和公式（直接展开右侧）：
$$
\begin{aligned}
(a+b)(a^2 - ab + b^2)
 &\equiv a(a^2 - ab + b^2) + b(a^2 - ab + b^2) \\
 &\equiv a^3 - a^2b + ab^2 + a^2b - ab^2 + b^3 \\
 &\equiv a^3 + b^3
\end{aligned}
$$
对于立方差公式，将 $b$ 替换为 $-b$：
$$
\begin{aligned}
a^3 - b^3 &\equiv a^3 + (-b)^3 \\
         &\equiv [a + (-b)][a^2 - a(-b) + (-b)^2] \\
         &\equiv (a-b)(a^2 + ab + b^2)
\end{aligned}
$$
````

````ad-example
title: 示例（平方差展开） | Example（平方差展开）


展开 $(2x+3y)(2x-3y)$：

---
$$
\begin{aligned}
(2x+3y)(2x-3y) &\equiv (2x)^2 - (3y)^2 \\
              &\equiv 4x^2 - 9y^2
\end{aligned}
$$
````

````ad-example
title: 示例（完全平方展开） | Example（完全平方展开）


展开 $(3x-4)^2$：

---
$$
\begin{aligned}
(3x-4)^2 &\equiv (3x)^2 - 2 \cdot 3x \cdot 4 + 4^2 \\
        &\equiv 9x^2 - 24x + 16
\end{aligned}
$$
````

````ad-example
title: 示例（立方和公式展开） | Example（立方和公式展开）


展开 $(x+5)(x^2 - 5x + 25)$：

---
$$
\begin{aligned}
(x+5)(x^2 - 5x + 25) &\equiv x^3 + 5^3 \\
                     &\equiv x^3 + 125
\end{aligned}
$$
````

**方法（Method，证明恒等式的四种途径）**

证明一个等式为恒等式，可选用以下四种方法之一：

*   **方法 I：** 从较复杂的一侧出发，逐步化简为另一侧。
    *   **原理：** 恒等变形保持真值不变。从复杂侧出发更容易找到化简方向。
*   **方法 II：** 分别化简两侧，证明它们等于同一个表达式。
    *   **原理：** 若 $LHS \equiv E$ 且 $RHS \equiv E$，则 $LHS \equiv RHS$（传递性）。
*   **方法 III：** 证明 $LHS - RHS \equiv 0$。
    *   **原理：** $A = B \iff A - B = 0$。移到同一侧后化简，若结果恒为零则原等式为恒等式。
*   **方法 IV：** 利用比较系数法（多项式恒等式，见[[Chapter 4 多项式(I)|多项式(I)]]）。

````ad-example
title: 示例（方法 I） | Example（方法 I）


证明 $(2x+1)(2x-1) \equiv 4x^2 - 1$：

---
$$
\begin{aligned}
LHS &\equiv (2x+1)(2x-1) \\
   &\equiv (2x)^2 - 1^2 && \text{（平方差公式）} \\
   &\equiv 4x^2 - 1 \\
   &\equiv RHS
\end{aligned}
$$
````

````ad-example
title: 示例（方法 II） | Example（方法 II）


证明 $(x+1)(x-1) + 1 \equiv x^2$：

---
$$
\begin{aligned}
LHS &\equiv (x+1)(x-1) + 1 \\
   &\equiv (x^2 - 1) + 1 && \text{（平方差公式）} \\
   &\equiv x^2
\end{aligned}
$$
$$
\begin{aligned}
RHS &\equiv x^2
\end{aligned}
$$
两侧均化简为 $x^2$，故 $(x+1)(x-1) + 1 \equiv x^2$ 为恒等式。
````

````ad-example
title: 示例（方法 III） | Example（方法 III）


证明 $(x+2)^2 \equiv x^2 + 4x + 4$：

---
$$
\begin{aligned}
LHS - RHS &\equiv (x+2)^2 - (x^2 + 4x + 4) \\
         &\equiv (x^2 + 4x + 4) - (x^2 + 4x + 4) \\
         &\equiv 0
\end{aligned}
$$
由于差值**恒为零**，因此 $(x+2)^2 \equiv x^2 + 4x + 4$ 为恒等式。
````

````ad-example
title: 示例（方法 IV） | Example（方法 IV）


证明 $x^2 + 5x + 6 \equiv (x+2)(x+3)$：

---
$$
\begin{aligned}
RHS &\equiv (x+2)(x+3) \\
   &\equiv x^2 + 3x + 2x + 6 \\
   &\equiv x^2 + 5x + 6
\end{aligned}
$$
展开后 $RHS \equiv x^2 + 5x + 6$，与 $LHS$ 各项系数一致（$x^2$ 系数均为 $1$，$x$ 系数均为 $5$，常数项均为 $6$），由比较系数法知两者恒等。
````

### 6.2.3　恒等式的应用：因式分解

> 恒等式的逆用（从右到左）即为因式分解。当多项式可被识别为某种恒等式的展开形式时，可直接套用公式进行因式分解。
>
> 因式分解的核心思想：把展开后「散落」的各项重新打包成因式的乘积形式。恒等式（平方差、完全平方、立方和差）提供了最常用的打包模板。

**方法（Method，利用恒等式进行因式分解的步骤）**

1. 先检查是否有公因式可提取。
2. 再观察剩余部分是否符合某种恒等式的形式并套用公式。

> 三种典型识别模式：
> *   形如 $a^2 - b^2$，识别为平方差。
> *   形如 $a^2 \pm 2ab + b^2$，识别为完全平方。
> *   形如 $a^3 \pm b^3$，识别为立方和/差。

````ad-example
title: 示例（平方差因式分解） | Example（平方差因式分解）


分解 $x^2 - 9$：

---
$$
\begin{aligned}
x^2 - 9 &\equiv x^2 - 3^2 \\
       &\equiv (x+3)(x-3)
\end{aligned}
$$
````

````ad-example
title: 示例（完全平方因式分解） | Example（完全平方因式分解）


分解 $x^2 + 6x + 9$：

---
$$
\begin{aligned}
x^2 + 6x + 9 &\equiv x^2 + 2 \cdot 3 \cdot x + 3^2 \\
            &\equiv (x+3)^2
\end{aligned}
$$
````

````ad-example
title: 示例（立方差因式分解） | Example（立方差因式分解）


分解 $x^3 - 8$：

---
$$
\begin{aligned}
x^3 - 8 &\equiv x^3 - 2^3 \\
       &\equiv (x-2)(x^2 + 2x + 4)
\end{aligned}
$$
````

````ad-example
title: 示例（综合运用） | Example（综合运用）


分解 $2x^3 - 16$：

---
$$
\begin{aligned}
2x^3 - 16 &\equiv 2(x^3 - 8) && \text{（先提取公因式 $2$）} \\
         &\equiv 2(x-2)(x^2+2x+4) && \text{（再套用立方差公式）}
\end{aligned}
$$
````

---

## 6.3　方根（Roots）

> **本节难度上限**：T B- ｜ C D ｜ E B ｜ Q C

> 方根是乘方的逆运算。本节从平方根的性质出发，逐步推广至立方根及一般的 $n$ 次方根。

### 6.3.1　$2$ 次方根

> 回顾[[Chapter 1 数系(I)|数系(I)]]中平方根的定义：若 $a = b^2$，则 $b = \pm \sqrt{a}$，其中 $\sqrt{a}$ 为 $a$ 的**算术平方根**（Principal Square Root），即非负的那个平方根。本节进一步讨论平方根的代数性质。

````ad-lem
title: 引理（$a^2=b^2 \implies a=b$） | Lemma（$a,b \ge 0$）

设 $a, b \ge 0$。若 $a^2 = b^2$，则 $a = b$。
````

此引理的关键前提是 $a,b \ge 0$。若去掉此条件则不成立，例如 $(-2)^2 = 2^2$ 但 $-2 \neq 2$。

````ad-proof
title: 证明 | Proof

$$
\begin{aligned}
a^2 = b^2 &\iff a^2 - b^2 = 0 \\
         &\iff (a+b)(a-b) = 0 \qquad \text{（平方差公式，$a^2-b^2 \equiv (a+b)(a-b)$）}
\end{aligned}
$$
*   当 $a=b=0$ 时显然成立。
*   当 $a,b$ 至少有一个不为 $0$ 时，$a+b>0$。两边同除以 $a+b$ 得 $a-b=0$，即 $a=b$。
````

> 读者在此可能有一个疑问：为何我们写 " $a^2 - b^2 = 0$ " 这些步骤不需要用恒等号？
>
> 因为证明过程是在假设 " $a^2 = b^2$ " 成立的基础上开始的。在此假设下，写 " $a^2 - b^2 \equiv 0$ " 就意味着声明对所有 $a, b \geq 0$ 都成立，这显然是错误的——恒等号要求无条件成立，而我们的推导是在特定假设下进行的。更本质地说，当假设成立时，$a, b$ 之间的关系是**方程**（条件等式），而非**恒等式**。
>
> 读者可能进一步追问：为何第二步可以将 " $a^2 - b^2 = 0$ " 等价为 " $(a+b)(a-b) = 0$ "？这中间使用了恒等式 " $a^2 - b^2 \equiv (a+b)(a-b)$ "，但为何可以在此使用？
>
> 因为恒等式的定义保证了**对任意** $a, b$，$a^2 - b^2 = (a+b)(a-b)$。它自然包括了假设成立的情况，所以可以直接代入。
 
````ad-lem
title: 引理（$\sqrt{n^2}=n$） | Lemma（$n \ge 0$）

若 $n \ge 0$，则 $\sqrt{n^2} = n$。
````

此引理表明：对非负数先平方再开算术平方根，结果不变。这是平方与开平方互逆关系的直接体现。注意当 $n < 0$ 时引理不成立：例如 $n=-1$，则 $$\sqrt{(-1)^2} = \sqrt{1} = 1 \neq -1$$
````ad-proof
title: 证明 | Proof

由算术平方根定义： $(\sqrt{n^2})^2 = n^2$。因 $n \ge 0$，由上一引理得 $\sqrt{n^2} = n$。
````

````ad-def
title: 定义（绝对值） | Definition（Absolute Value）

对任意实数 $n$，定义 $n$ 的**绝对值**为
$$|n| = \sqrt{n^2}.$$
````

````ad-lem
title: 引理（绝对值的分段表示） | Lemma（Piecewise Form of Absolute Value）

对任意实数 $n$，
$$|n| = \begin{cases} n, & n \ge 0 \\ -n, & n < 0 \end{cases}$$
````

````ad-proof
title: 证明 | Proof

当 $n \ge 0$ 时，由引理 $\sqrt{n^2}=n$ 得 $|n| = \sqrt{n^2} = n$。

当 $n < 0$ 时，$-n > 0$，故
$$\sqrt{n^2} = \sqrt{(-n)^2} = -n,$$
因此 $|n| = \sqrt{n^2} = -n$。
````

````ad-example
title: 示例 | Example


求下列各数的绝对值：

1. $|3|$
2. $|-5|$
3. $|0|$

---

1. $|3| = 3$（$3 \ge 0$）。

2. $|-5| = 5$（$-5 < 0$，取相反数）。

3. $|0| = 0$。
````

````ad-thm
title: 定理（平方根的乘法性质） | Theorem（平方根的乘法性质）

设 $a, b \ge 0$，则 $\sqrt{ab} = \sqrt{a}\sqrt{b}$。
````

此定理表明「乘积的平方根」等于「平方根的乘积」。它让我们能将一个大的平方根拆解为几个小的平方根分别计算，是方根运算最基本的工具。

````ad-proof
title: 证明 | Proof

$$
\begin{aligned}
(\sqrt{a}\sqrt{b})^2 &\equiv (\sqrt{a})^2 (\sqrt{b})^2 \\
                   &\equiv ab
\end{aligned}
$$
因此 $(\sqrt{a}\sqrt{b})^2 = ab$。对等式两边开平方根，注意 $\sqrt{a}\sqrt{b} \geq 0$，因此：
$$
\begin{aligned}
\sqrt{(\sqrt{a}\sqrt{b})^2} &= \sqrt{ab}
\end{aligned}
$$
由上一引理（注意 $\sqrt{a}\sqrt{b} \ge 0$，因为 $\sqrt{a},\sqrt{b} \ge 0$）得：
$$\sqrt{a}\sqrt{b} = \sqrt{ab}$$
````

此定理与指数律 $(ab)^n = a^n b^n$ 形式一致，表明平方根自然蕴含指数性质。由此，我们也可以用分数指数表示平方根：$a^{\frac{1}{2}} = \sqrt{a}$（$a \ge 0$）。

````ad-example
title: 示例 | Example


计算 $\sqrt{2}\sqrt{18}$：

---
$$
\begin{aligned}
\sqrt{2}\sqrt{18} &= \sqrt{2 \cdot 18} \\
                 &= \sqrt{36} \\
                 &= \sqrt{6^2} \\
                 &= 6
\end{aligned}
$$
````

````ad-example
title: 示例 | Example


计算 $\sqrt{27} + \sqrt{75}$：

---
$$
\begin{aligned}
\sqrt{27} &= \sqrt{9 \times 3} = \sqrt{9} \cdot \sqrt{3} = 3\sqrt{3} \\
\sqrt{75} &= \sqrt{25 \times 3} = \sqrt{25} \cdot \sqrt{3} = 5\sqrt{3}
\end{aligned}
$$
$$
\begin{aligned}
\sqrt{27} + \sqrt{75} &= 3\sqrt{3} + 5\sqrt{3} \\
                     &= 8\sqrt{3}
\end{aligned}
$$
````

### 6.3.2　$3$ 次方根

````ad-def
title: 定义（实数的 $3$ 次方根记法） | Definition（实数的 $3$ 次方根记法）

设 $m$ 为实数。若实数 $n$ 满足 $m = n^3$，则称 $n$ 为 $m$ 的**立方根**（Cube Root）。$m$ 的立方根只有一个，记为：
$$n = \sqrt[3]{m}$$
````

此外，对任意实数 $a$，记 $a \times \sqrt[3]{m} = a\sqrt[3]{m}$。

与平方根不同，立方根可对负数开——负数的立方根仍为负数。这是因为奇数次方不改变符号。

````ad-def
title: 定义（分数指数） | Definition（Fractional Exponents）

若 $a$ 为实数，则 $a^{\frac{1}{3}} = \sqrt[3]{a}$。
````

这与平方根的分数指数 $a^{\frac{1}{2}} = \sqrt{a}$（$a \ge 0$）形式一致。关键区别在于立方根不要求底数非负，因为任何实数都有立方根。

````ad-lem
title: 引理（$a^3=b^3 \implies a=b$） | Lemma（$a^3=b^3 \implies a=b$）

设 $a, b$ 为实数。若 $a^3 = b^3$，则 $a = b$。
````


````ad-proof
title: 证明 | Proof

$$
\begin{aligned}
a^3=b^3 &\iff a^3 - b^3 = 0 \\
       &\iff (a-b)(a^2 + ab + b^2) = 0 \qquad \text{（立方差公式）}
\end{aligned}
$$
*   当 $a=b=0$ 时显然成立。
*   当 $a,b>0$ 时，$a^2+ab+b^2 > 0$（三项均为正），故 $a-b=0$，即 $a=b$。
*   当 $a,b<0$ 时，$a^2+ab+b^2 > 0$（$a^2,b^2$ 均为正，$ab$ 为两负数之积亦为正），故 $a-b=0$，即 $a=b$。

> 补充说明：若 $a,b$ 异号（一正一负），则 $a^3,b^3$ 异号（奇数次方保持符号），两者不可能相等，故该情形自然排除，无需讨论。因此以上三种情况已涵盖所有可能。
````

与平方根的对应引理不同，此引理对**所有**实数成立（无需限定 $a,b \ge 0$）。

````ad-lem
title: 引理（$\sqrt[3]{n^3}=n$） | Lemma（$\sqrt[3]{n^3}=n$）

若 $n$ 为实数，则 $\sqrt[3]{n^3} = n$。
````

````ad-proof
title: 证明 | Proof

由立方根定义 $(\sqrt[3]{n^3})^3 = n^3$。由上一引理得 $\sqrt[3]{n^3} = n$。
````

````ad-thm
title: 定理（立方根的乘法性质） | Theorem（Multiplication Property of Cube Roots）

设 $a, b$ 为实数，则 $\sqrt[3]{ab} = \sqrt[3]{a}\sqrt[3]{b}$。
````

````ad-proof
title: 证明 | Proof

$$
\begin{aligned}
(\sqrt[3]{a}\sqrt[3]{b})^3 &\equiv (\sqrt[3]{a})^3 (\sqrt[3]{b})^3 \\
                          &\equiv ab
\end{aligned}
$$
因此 $(\sqrt[3]{a}\sqrt[3]{b})^3 = ab$。对等式两边开立方根：
$$
\begin{aligned}
\sqrt[3]{(\sqrt[3]{a}\sqrt[3]{b})^3} &= \sqrt[3]{ab}
\end{aligned}
$$
由上一引理得 $\sqrt[3]{a}\sqrt[3]{b} = \sqrt[3]{ab}$。
````

````ad-example
title: 示例 | Example


计算 

1. $\sqrt[3]{27}$，

2. $\sqrt[3]{-64}$：

---

1. 因 $27 = 3^3$，故 $\sqrt[3]{27} = 3$。

2. 因 $-64 = (-4)^3$，故 $\sqrt[3]{-64} = -4$。
````

````ad-example
title: 示例 | Example


计算 $\sqrt[3]{216}$：

---
$$
\begin{aligned}
216 &= 8 \times 27 \\
   &= 2^3 \times 3^3 \\[4pt]
\sqrt[3]{216} &= \sqrt[3]{2^3 \cdot 3^3} \\
             &= \sqrt[3]{2^3} \cdot \sqrt[3]{3^3} \\
             &= 2 \cdot 3 \\
             &= 6
\end{aligned}
$$
````

### 6.3.3　$n$ 次方根

> 将平方根和立方根的性质推广至一般的 $n$ 次方根。关键区分在于 $n$ 的奇偶性，这决定了方根的个数。

````ad-def
title: 定义（非负实数的偶数次方根记法） | Definition（Even-th Root Notation for Non-negative Reals）

设 $n$ 为一**偶数**，$a \ge 0$。若存在实数 $m$ 使得 $m^n = a$，则 $m$ 称为 $a$ 的 $n$ 次方根（$n$th Root）。$a$ 的 $n$ 次方根有两个，记为：
$$m = \pm\sqrt[n]{a}$$
其中非负的那个 $\sqrt[n]{a}$ 称为 $a$ 的**算术 $n$ 次方根**（Principal $n$th Root）。
````

限定 $a \ge 0$ 是因为实数的偶数次方必定非负，不存在 $m^n$ 等于负数的情况。例如不存在实数 $m$ 使得 $m^2 = -4$，因此 $\sqrt{-4}$ 在实数范围内无意义。

````ad-def
title: 定义（实数的奇数次方根记法） | Definition（Odd-th Root Notation for Reals）

设 $n$ 为一**奇数**，$a$ 为实数。若存在实数 $m$ 使得 $m^n = a$，则 $m$ 称为 $a$ 的 $n$ 次方根（$n$th Root）。$a$ 的 $n$ 次方根只有一个，记为：
$$m = \sqrt[n]{a}$$
````

奇数次方不改变符号——正数的奇数次方仍为正，负数的奇数次方仍为负。因此允许 $a < 0$。例如 $\sqrt[3]{-8} = -2$，因为 $(-2)^3 = -8$。

````ad-thm
title: 定理（$n$ 次方根的乘法性质） | Theorem（Multiplication Property of $n$th Roots）

$$\sqrt[n]{ab} = \sqrt[n]{a}\sqrt[n]{b}$$
*   当 $n$ 为奇数时，$a, b$ 为任意实数。
*   当 $n$ 为偶数时，$a, b$ 为任意非负实数。
````

此定理是平方根和立方根乘法性质的统一推广。条件范围的差异源于偶数次需非负、奇数次无限制。

````ad-proof
title: 证明 | Proof

证明结构与平方根、立方根一致：
$$
\begin{aligned}
(\sqrt[n]{a}\sqrt[n]{b})^n &\equiv (\sqrt[n]{a})^n (\sqrt[n]{b})^n \\
                          &\equiv ab
\end{aligned}
$$
因此 $(\sqrt[n]{a}\sqrt[n]{b})^n = ab$。对等式两边开 $n$ 次方根：
$$
\begin{aligned}
\sqrt[n]{(\sqrt[n]{a}\sqrt[n]{b})^n} &= \sqrt[n]{ab}
\end{aligned}
$$

由 $n$ 次方根定义中 $\sqrt[n]{x^n} = x$（当 $n$ 为奇数时 $x$ 为任意实数；$n$ 为偶数时 $x \ge 0$）：
$$
\begin{aligned}
\sqrt[n]{(\sqrt[n]{a}\sqrt[n]{b})^n} &= \sqrt[n]{a}\sqrt[n]{b}
\end{aligned}
$$
故 $\sqrt[n]{a}\sqrt[n]{b} = \sqrt[n]{ab}$。
````

---

## 6.4　代数分式及根式（Algebraic Fractions & Radicals）

> **本节难度上限**：T C+ ｜ C C+ ｜ E C ｜ Q C

> 本节讨论代数分式的四则运算与化简，以及根式的运算、化简与分母有理化。

### 6.4.1　代数分式的运算

````ad-def
title: 定义（代数分式） | Definition（Algebraic Fraction）

形如 $\dfrac{P}{Q}$ 的式子，其中 $P, Q$ 为多项式，且 $Q \neq 0$。
````

代数分式可以理解为「多项式的分数」。与算术分数一样，分母不能为零。代数分式的四则运算规则本质上与普通分数一致，只是分子分母是多项式而非具体数字。

````ad-thm
title: 定理（代数分式的乘除运算） | Theorem（Multiplication and Division of Algebraic Fractions）

设 $\dfrac{a}{b}$ 与 $\dfrac{c}{d}$ 为两个代数分式（$b,d \neq 0$），则：
$$
\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}
$$
$$
\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc} \qquad (c \neq 0)
$$
````

````ad-proof
title: 证明 | Proof

乘法运算：由分式乘法的定义，分子乘分子、分母乘分母即得 $\dfrac{ac}{bd}$。即：
$$
\begin{aligned}
\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}
\end{aligned}
$$

除法运算：分式的除法等价于乘以除数的倒数：
$$
\begin{aligned}
\frac{a}{b} \div \frac{c}{d}
 &\equiv \frac{a}{b} \cdot \frac{1}{\frac{c}{d}} \\
 &\equiv \frac{a}{b} \cdot \frac{d}{c} \\
 &\equiv \frac{ad}{bc}
\end{aligned}
$$
````

````ad-thm
title: 定理（代数分式的加减运算） | Theorem（Addition and Subtraction of Algebraic Fractions）

设 $\dfrac{a}{m}$ 与 $\dfrac{b}{m}$ 为同分母分式（$m \neq 0$），则：
$$\frac{a}{m} \pm \frac{b}{m} = \frac{a \pm b}{m}$$

对于异分母分式，先通分（取各分母的最小公倍式 LCM 为新分母），再按同分母规则进行加减。
````

````ad-proof
title: 证明 | Proof

同分母情形：利用乘法分配律的逆用（提取公因式 $\frac{1}{m}$）：
$$
\begin{aligned}
\frac{a}{m} \pm \frac{b}{m}
 &\equiv a \cdot \frac{1}{m} \pm b \cdot \frac{1}{m} \\
 &\equiv (a \pm b) \cdot \frac{1}{m} \\
 &\equiv \frac{a \pm b}{m}
\end{aligned}
$$
异分母情形：通分后各分式分母相同，退化为同分母情形。
````

````ad-example
title: 示例（乘法） | Example（Multiplication）


计算 $\dfrac{x}{y} \cdot \dfrac{3y}{2x}$（$x,y \neq 0$）：

---
$$
\begin{aligned}
\frac{x}{y} \cdot \frac{3y}{2x}
 &\equiv \frac{x \cdot 3y}{y \cdot 2x} \\
 &\equiv \frac{3xy}{2xy} \\
 &\equiv \frac{3}{2} \quad (x, y \ne 0)
\end{aligned}
$$
> 注意：为何在最后一步需要注明 “ $(x, y \ne 0)$ ”？ 因为我们使用的是恒等式的符号：即 $\dfrac{x}{y} \cdot \dfrac{3y}{2x} \equiv \dfrac{3}{2}$，但 “ $\dfrac{3}{2}$ ” 不含 $x,y$，因此在 $(x,y = 0)$ 时仍然是成立的，而此时 $\dfrac{x}{y} \cdot \dfrac{3y}{2x}$ 会遇到算术上 “ 除以零 ”的问题。
````

````ad-example
title: 示例（加减法） | Example（Addition and Subtraction）


计算 $\dfrac{1}{x} + \dfrac{1}{x+1}$（$x \neq 0, -1$）：

---
$$
\begin{aligned}
\forall x \ne 0, -1,\quad \frac{1}{x} + \frac{1}{x+1}
 &\equiv \frac{(x+1) + x}{x(x+1)} \\
 &\equiv \frac{2x+1}{x(x+1)}
\end{aligned}
$$
> 注意：在这个例子中，我们在一开始就注明了 $x \ne 0, -1$，因此在结尾时便不必声明恒等式的变量取值了。
````

### 6.4.2　化简代数分式
**方法（Method，化简代数分式）**

分子分母有公因式时须约分。

*   **关键步骤：** 当分子或分母为多项式时，**先因式分解再约分**——这与化简分数时「先分解质因数再约分」的思路一致。
*   **注意：** 约分的前提是公因式不为零（否则分式无定义）。

````ad-example
title: 示例 | Example


化简 $\dfrac{x^2 - 1}{x-1}$（$x \neq 1$）：

---
$$
\begin{aligned}
\frac{x^2-1}{x-1}
 &\equiv \frac{(x+1)(x-1)}{x-1} && \text{（分子用平方差公式因式分解）} \\
 &\equiv x+1 && \text{（约去公因式 $x-1$）}
\end{aligned}
$$
````

````ad-example
title: 示例 | Example


化简 $\dfrac{x^3 - 8}{x-2}$（$x \neq 2$）：

---
$$
\begin{aligned}
\frac{x^3-8}{x-2}
 &\equiv \frac{(x-2)(x^2+2x+4)}{x-2} && \text{（分子用立方差公式因式分解）} \\
 &\equiv x^2+2x+4 && \text{（约去公因式 $x-2$）}
\end{aligned}
$$
````

### 6.4.3　根式的定义与运算
````ad-def
title: 定义（根式） | Definition（Radical）

含有根号的代数式。
````

例如 $\sqrt{3}$、$\sqrt[3]{x+1}$、$2+\sqrt{5}$ 均为根式。根式可以像普通代数式一样参与四则运算，但需要特殊的化简规则。

````ad-thm
title: 定理（根式的积商法则） | Theorem（Product and Quotient Rules for Radicals）

由 $n$ 次方根的乘法性质直接导出：

$$
\sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}} \qquad (b \neq 0)
$$
适用范围：$n$ 为奇数时 $a,b$ 为任意实数；$n$ 为偶数时 $a \ge 0, b > 0$。
````

````ad-proof
title: 证明 | Proof

积的法则即上节所证的 $n$ 次方根乘法性质定理。

商的法则：
$$
\begin{aligned}
\left( \frac{\sqrt[n]{a}}{\sqrt[n]{b}} \right)^n
 &\equiv \frac{(\sqrt[n]{a})^n}{(\sqrt[n]{b})^n} \\
 &\equiv \frac{a}{b}
\end{aligned}
$$
对等式两边开 $n$ 次方根，由 $\sqrt[n]{x^n}=x$（在相应范围内）得 $\dfrac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\dfrac{a}{b}}$。
````

````ad-def
title: 定义（同类根式） | Definition（Like Radicals）

化为最简根式后，被开方数相同的根式。
````

同类根式可进行加减合并，类比多项式中的同类项合并。

````ad-example
title: 示例 | Example


计算 $\sqrt{8} + \sqrt{18}$：

---
$$
\begin{aligned}
\sqrt{8} &= \sqrt{4 \times 2} = 2\sqrt{2} \\
\sqrt{18} &= \sqrt{9 \times 2} = 3\sqrt{2} \\[4pt]
\sqrt{8} + \sqrt{18} &= 2\sqrt{2} + 3\sqrt{2} \\
                     &= 5\sqrt{2}
\end{aligned}
$$
````

### 6.4.4　根式的化简
````ad-def
title: 定义（最简根式） | Definition（Simplest Radical Form）

满足以下两个条件的根式：
1. 被开方数不含分母。
2. 被开方数中不含能开得尽方的因数（或因式）。
````

这与「最简分数」的概念类似——最简根式也是某种「标准形式」。判断一个根式是否为最简，只需检查这两个条件。

**方法（Method，化简根式的步骤）**

1. 将被开方数分解为方幂因子与非方幂因子的乘积。
2. 利用积的法则将能开尽方的因子移出根号。

> 原理：$\sqrt[n]{a^n \cdot b} = \sqrt[n]{a^n} \cdot \sqrt[n]{b} = a\sqrt[n]{b}$（当条件满足时）。这相当于把「完美 $n$ 次方」的部分从根号里拿出来。

````ad-example
title: 示例 | Example


化简 $\sqrt{72}$：

---
$$
\begin{aligned}
72 &= 36 \times 2 = 6^2 \times 2 \\[4pt]
\sqrt{72} &= \sqrt{6^2 \times 2} \\
         &= \sqrt{6^2} \cdot \sqrt{2} \\
         &= 6\sqrt{2}
\end{aligned}
$$
````

````ad-example
title: 示例 | Example


化简 $\sqrt[3]{54}$：

---
$$
\begin{aligned}
54 &= 27 \times 2 = 3^3 \times 2 \\[4pt]
\sqrt[3]{54} &= \sqrt[3]{3^3 \times 2} \\
            &= \sqrt[3]{3^3} \cdot \sqrt[3]{2} \\
            &= 3\sqrt[3]{2}
\end{aligned}
$$
````

### 6.4.5　共轭根式与分母有理化

````ad-def
title: 定义（共轭根式） | Definition（Conjugate Radicals）

$p\sqrt{a} + q\sqrt{b}$ 的共轭式为 $p\sqrt{a} - q\sqrt{b}$。
````

二者之积为有理数：
$$(p\sqrt{a} + q\sqrt{b})(p\sqrt{a} - q\sqrt{b}) \equiv p^2 a - q^2 b$$

此性质源于平方差公式 $(A+B)(A-B) \equiv A^2 - B^2$，取 $A = p\sqrt{a}$，$B = q\sqrt{b}$ 即得。两个含有根号的式子相乘后「根号消失」——这正是分母有理化的核心工具。

````ad-def
title: 定义（分母有理化） | Definition（Rationalization of Denominator）

将分母中的无理数转化为有理数的过程。
````

其目的是将分式化为「分子含根号、分母为有理数」的标准形式，便于后续计算和比较。

**方法（Method，分母有理化）**

**方法 I：单项式分母**
分子分母同乘该根式。
*   示例：$\dfrac{1}{\sqrt{a}} = \dfrac{\sqrt{a}}{a}$。
*   **原理：** $\sqrt{a} \cdot \sqrt{a} = a$，分母中的根号被自身消去。

**方法 II：二项式分母（利用共轭根式）**
分子分母同乘分母的共轭式。
*   示例：$\dfrac{1}{\sqrt{x} - \sqrt{y}} = \dfrac{\sqrt{x} + \sqrt{y}}{x - y}$。
*   **原理：** $(\sqrt{x} - \sqrt{y})(\sqrt{x} + \sqrt{y}) = x - y$（平方差），分母中的两个根号同时消去。

````ad-example
title: 示例（单项式分母） | Example（单项式分母）


有理化 $\dfrac{5}{\sqrt{3}}$：

---
$$
\begin{aligned}
\frac{5}{\sqrt{3}}
 &= \frac{5\sqrt{3}}{\sqrt{3} \cdot \sqrt{3}} \\
 &= \frac{5\sqrt{3}}{3}
\end{aligned}
$$
````

````ad-example
title: 示例（二项式分母） | Example（二项式分母）


有理化 $\dfrac{1}{1 + \sqrt{2}}$：

---
$$
\begin{aligned}
\frac{1}{1 + \sqrt{2}}
 &= \frac{1 \cdot (1 - \sqrt{2})}{(1 + \sqrt{2})(1 - \sqrt{2})} \\
 &= \frac{1 - \sqrt{2}}{1 - 2} \\
 &= \frac{1 - \sqrt{2}}{-1} \\
 &= \sqrt{2} - 1
\end{aligned}
$$
````

---

## 6.5　代数分式方程（Fractional Equations）

> **本节难度上限**：T B- ｜ C C+ ｜ E C ｜ Q C

> [[Chapter 5 解方程方法(I)|解方程方法(I)]]中，我们系统学习了一元一次方程和二元一次方程组的解法。在 §5.2.2 的解方程步骤中，第一步「去分母」处理的是**常数分母**（如 $\dfrac{x}{2} - \dfrac{x+1}{3} = 1$，分母为 $2$ 和 $3$）。本节将去分母推广到**代数分母**的情形——即分母本身也含有未知数，如 $\dfrac{2}{x-1} = 3$。

### 6.5.1　代数分式方程的定义

````ad-def
title: 定义（代数分式方程） | Definition（Fractional Equation）

未知数出现在分母中的方程。
````

代数分式方程与多项式方程的关键区别在于：多项式方程 $P = 0$ 对任意实数 $x$ 均有意义；而代数分式方程只在其所有分母均不为零时才有意义——若某个分母为零，则相应的代数分式无法计算。因此，解代数分式方程时必须始终关注分母是否为零。

本节仅讨论分子、分母均为**一元一次多项式**的代数分式方程，且去分母后所得的多项式方程仍为一次方程。

````ad-example
title: 示例（判断是否为代数分式方程） | Example（判断是否为代数分式方程）


判断下列方程是否为代数分式方程：
1. $\dfrac{x}{2} + 1 = 3$：**否**。分母 $2$ 为常数，不含未知数。
2. $\dfrac{2}{x-1} = 3$：**是**。分母 $x-1$ 含未知数 $x$。
3. $\dfrac{x+1}{x-2} + \dfrac{3}{x+1} = 1$：**是**。分母 $x-2$ 与 $x+1$ 均含未知数 $x$。
````

### 6.5.2　去分母法

> 回顾[[Chapter 0 基础概念|基础概念]]中等式性质定理的**乘除法不变性**：
> $$a = b \iff ac = bc, \quad c \neq 0$$
> 这条公理告诉我们：方程两边同乘一个**非零**量，所得方程与原方程等价。在 §5.2.2 中，我们去分母乘的是常数（如 LCM of $2, 3 = 6$），常数恒不为零，故等价性始终成立。

现在分母从常数变为含 $x$ 的多项式。去分母时，两边同乘的是所有分母的最小公倍式 $D$——而 $D$ 是一个**含未知数的多项式**，它在某些 $x$ 处可能等于零。这正是增根产生的根源，将在 §6.5.3 中详细讨论。

**方法（Method，去分母法 / Clearing Denominators）**

1. **因式分解**：将所有分母因式分解（若需要），确定各分母的 LCM $D$。
2. **去分母**：方程两边同乘 $D$，消去所有分母。
3. **解多项式方程**：解所得的多项式方程（本节中均为一元一次方程，用 [[Chapter 5 解方程方法(I)|解方程方法(I)]] §5.2 的方法）。
4. **验根**：将所得的每个根代入原方程，检查是否使任何分母为零（见 §6.5.3）。

````ad-example
title: 示例（去分母法，无增根） | Example（去分母法，无增根）


解 $\dfrac{x+1}{x-2} = 3$。

---

分母为 $x-2$，LCM 为 $D = x-2$。两边同乘 $(x-2)$：
$$
\begin{aligned}
(x+1) &= 3(x-2) \\
x + 1 &= 3x - 6 \\
-2x &= -7 \\
x &= \frac{7}{2}
\end{aligned}
$$
验根：$x - 2 = \dfrac{7}{2} - 2 = \dfrac{3}{2} \neq 0$ ✓

故原方程的根为 $x = \dfrac{7}{2}$。
````

````ad-example
title: 示例（多分母通分） | Example（多分母通分）


解 $\dfrac{3}{x+1} - \dfrac{2}{x-1} = \dfrac{1}{x^2-1}$。

---

先因式分解：$x^2 - 1 = (x+1)(x-1)$，故 LCM 为 $D = (x+1)(x-1)$。两边同乘 $D$：
$$
\begin{aligned}
3(x-1) - 2(x+1) &= 1 \\
3x - 3 - 2x - 2 &= 1 \\
x - 5 &= 1 \\
x &= 6
\end{aligned}
$$
验根：$x + 1 = 7 \neq 0$ ✓，$x - 1 = 5 \neq 0$ ✓

故原方程的根为 $x = 6$。
````

### 6.5.3　增根与验根

> 去分母时，方程两边同乘 $D$。回顾乘除法不变性 $a = b \iff ac = bc$（$c \neq 0$），等价性的前提是**所乘的量非零**。但 $D$ 是含未知数的多项式，它在某些 $x$ 处可能为零。当 $D = 0$ 时，乘除法不变性的前提被破坏，等价性不再成立——这就是增根产生的根本原因。

````ad-thm
title: 定理（去分母的等价性） | Theorem（Equivalence of Clearing Denominators）

设代数分式方程中所有分母的 LCM 为 $D$。将方程两边同乘 $D$ 后得到多项式方程 $P = 0$。则：

(i) 原方程的每一个根都是 $P = 0$ 的根；

(ii) $P = 0$ 的根中，使 $D \neq 0$ 的根是原方程的根，使 $D = 0$ 的根**不是**原方程的根。
````

````ad-proof
title: 证明 | Proof

**(i)** 设 $x_0$ 为原方程的根。因原方程在 $x_0$ 处有定义，故当 $x = x_0$ 时 $D \neq 0$。由乘除法不变性（所乘的 $D \neq 0$），两边同乘 $D$ 后等式仍成立，即 $x_0$ 也是 $P = 0$ 的根。

**(ii)** 设 $x_0$ 为 $P = 0$ 的根。去分母时 $P$ 由原方程两边同乘 $D$ 所得，故当 $x = x_0$ 时有 $D \cdot Q = 0$（$Q$ 为去分母前方程两端的代数式之差）。

*   若当 $x = x_0$ 时 $D \neq 0$：由乘除法不变性，两边同除以 $D$（$D \neq 0$）恢复 $Q = 0$，即 $x_0$ 为原方程的根。
*   若当 $x = x_0$ 时 $D = 0$：原方程的分母为零，方程无定义，故 $x_0$ **不是**原方程的根。
````

定理 (ii) 的后半部分所描述的那些使 $D = 0$ 的根，就是**增根**。

````ad-def
title: 定义（增根） | Definition（Extraneous Root）

去分母后所得多项式方程的根中，使原方程的某个分母为零的根。增根不是原方程的根。
````

````ad-def
title: 定义（验根） | Definition（Verification of Roots）

将去分母后求得的每个根代入原方程，检查是否使任何分母为零。若为零，则该根为增根，须舍去。
````

验根是解代数分式方程**不可省略**的步骤——这正是它与多项式方程求解的关键区别。根据定理 (ii)，验根只需检查分母是否为零：若 $x_0$ 不使任何分母为零，则等式必然成立，无需再验证等式本身。

````ad-example
title: 示例（增根的产生） | Example（增根的产生）


解 $\dfrac{2x}{x-3} = \dfrac{6}{x-3} + 1$。

---

分母为 $x-3$，LCM 为 $D = x-3$。两边同乘 $(x-3)$：
$$
\begin{aligned}
2x &= 6 + (x - 3) \\
2x &= x + 3 \\
x &= 3
\end{aligned}
$$
验根：$x - 3 = 3 - 3 = 0$ ✗ —— **增根，舍去**。

故原方程**无解**。

> 直观理解：当 $x = 3$ 时，原方程的两项 $\dfrac{2x}{x-3}$ 与 $\dfrac{6}{x-3}$ 均无定义。去分母操作「抹掉」了 $x = 3$ 处分母为零这一事实，制造了一个本不存在的根。
````

````ad-example
title: 示例（无增根的多分母方程） | Example（无增根的多分母方程）


解 $\dfrac{4}{x+1} - \dfrac{3}{x-1} = \dfrac{1}{x^2-1}$。

---

先因式分解：$x^2 - 1 = (x+1)(x-1)$，故 LCM 为 $D = (x+1)(x-1)$。两边同乘 $D$：
$$
\begin{aligned}
4(x-1) - 3(x+1) &= 1 \\
4x - 4 - 3x - 3 &= 1 \\
x - 7 &= 1 \\
x &= 8
\end{aligned}
$$
验根：$x + 1 = 9 \neq 0$ ✓，$x - 1 = 7 \neq 0$ ✓

故原方程的根为 $x = 8$。此例无增根——并非所有代数分式方程都产生增根，但验根步骤始终不可省略。
````

````ad-example
title: 示例（综合运用） | Example（综合运用）


解 $\dfrac{5}{x+2} - \dfrac{3}{x-2} = \dfrac{8}{x^2-4}$。

---

先因式分解：$x^2 - 4 = (x+2)(x-2)$，故 LCM 为 $D = (x+2)(x-2)$。两边同乘 $D$：
$$
\begin{aligned}
5(x-2) - 3(x+2) &= 8 \\
5x - 10 - 3x - 6 &= 8 \\
2x - 16 &= 8 \\
2x &= 24 \\
x &= 12
\end{aligned}
$$
验根：$x + 2 = 14 \neq 0$ ✓，$x - 2 = 10 \neq 0$ ✓

故原方程的根为 $x = 12$。
````

---

## 6.6　章末总结

1. **公式及代入法：** 公式是描述量之间关系的等式。代入法将已知值替换变量以求未知量。变换主项即将公式变形使指定变量成为主项，分线性、含分母、含平方/开方、主项多次出现四种情形处理。
2. **恒等式：** 对变量的所有允许取值均成立的等式。三大核心恒等式——平方差、完全平方、立方和差——的正向（展开）与逆向（因式分解）运用同等重要，每个公式均附有完整证明。证明恒等式可从一侧化简至另一侧，或利用比较系数法。
3. **方根：**
   *   $2$ 次方根（平方根）：$\sqrt{a^2}=a \quad(a \geq 0)$，$\sqrt{ab}=\sqrt{a}\sqrt{b}$（$a,b \ge 0$）。
   *   $3$ 次方根（立方根）：可对负数开立方根，$\sqrt[3]{ab}=\sqrt[3]{a}\sqrt[3]{b}$（$a,b$ 为任意实数）。
   *   $n$ 次方根：偶数次限定 $a \ge 0$（两个根），奇数次对任意实数成立（一个根），均有 $\sqrt[n]{ab}=\sqrt[n]{a}\sqrt[n]{b}$。
4. **代数分式及根式：** 代数分式的四则运算（通分、约分）中，先因式分解再约分是关键。根式化简须化为最简根式（被开方数无分母、无开得尽方的因数）。分母有理化分单项式分母（同乘根式）和二项式分母（利用共轭根式）两种方法。
5. **代数分式方程：** 未知数出现在分母中的方程。解法为去分母法：取所有分母的 LCM $D$，两边同乘后化为多项式方程求解。由于 $D$ 是含未知数的多项式，可能在某些 $x$ 处为零，破坏乘除法不变性（$a = b \iff ac = bc$，$c \neq 0$）的前提，从而引入**增根**。故**验根不可省略**：使任何分母为零的根须舍去。

---

## 中英对照词汇表（Glossary）

| 中文 | English |
|------|---------|
| 代数式 | Algebraic Expression |
| 公式 | Formula |
| 代入法 | Substitution |
| 主项 | Subject |
| 变换主项 | Change of Subject |
| 恒等式 | Identity |
| 开放命题 | Open Statement |
| 平方差公式 | Difference of Squares |
| 完全平方公式 | Perfect Square |
| 立方和公式 | Sum of Cubes |
| 立方差公式 | Difference of Cubes |
| 平方根 | Square Root |
| 算术平方根 | Principal Square Root |
| 立方根 | Cube Root |
| $n$ 次方根 | $n$th Root |
| 算术 $n$ 次方根 | Principal $n$th Root |
| 分数指数 | Fractional Exponent |
| 代数分式 | Algebraic Fraction |
| 通分 | Common Denominator |
| 最小公倍式 | Least Common Multiple (LCM) |
| 根式 | Radical |
| 最简根式 | Simplest Radical Form |
| 同类根式 | Like Radicals |
| 共轭根式 | Conjugate Radicals |
| 分母有理化 | Rationalization of Denominator |
| 比较系数法 | Method of Comparing Coefficients |
| 因式分解 | Factorization |
| 莱布尼茨定律 | Leibniz's Law |
| 全称量词 | Universal Quantifier ($\forall$) |
| 存在量词 | Existential Quantifier ($\exists$) |
| 代数分式方程 | Fractional Equation |
| 去分母法 | Clearing Denominators |
| 增根 | Extraneous Root |
| 验根 | Verification of Roots |
| 乘除法不变性 | Multiplication Property of Equality |
