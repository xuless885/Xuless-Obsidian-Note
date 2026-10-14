---
tags: DSE课程笔记
---

# 0　基础概念（Fundamental Concepts）

> 数学之于其他自然科学的核心区别是：自然科学探索现实世界中的运行规律，数学所探索的是纯粹的**逻辑过程**（logical process），不依赖现实，只需一套基本的逻辑规则便可建立。本章建立公理体系，逐步推演出算术与代数的基本定理。

前置：无（本章为全册体系起点，不依赖其他章节）

---

## 0.1　数理逻辑（Mathematical Logic）
> **本节难度上限**：T C+ ｜ C D ｜ E C ｜ Q D


### 0.1.1　定义与对象

> 在正式进入数学世界之前，需要先厘清一些最基础的「元概念」，即定义、对象、公理、定理、推论、引理。这些术语不依赖任何数学知识，却能支撑起整座数学大厦。

````ad-def
title: 定义 | Definition

对某个概念赋予陈述句进行解释。
````

````ad-def
title: 定义（对象） | Definition（Object）

不构成陈述句的事物（如词语「猫」、符号 $x, 1, 2, \dots$）。
````

 「对象」这个概念很宽泛，人类语言中凡是不能判断真假的，词语、数字、变量，都属于对象。而下面要学习的「命题」则正好相反：它的价值就在于**可以被判断真假**。区分「对象」和「命题」是学习本章的根本。在此基础上，贯穿现代数学的四个核心术语呼之欲出：
 1. 公理（axiom），被承认为真的出发点
 2. 定理（theorem），从公理推导出的真命题
 3. 推论（corollary），从定理直接得出的结论
 4. 引理（Lemma），为证明某个定理而准备的辅助命题

### 0.1.2　命题逻辑（Propositional Logic）

#### 命题与开放命题

> 「命题」这个概念虽然主要在数学中使用，但它其实**抽象自人类自身的思维过程**。我们日常生活中无时无刻不在做判断，「今天会下雨」「这道菜很好吃」，这些判断要么为真、要么为假。数学只是将这种自然思维形式化：它要求命题必须是**客观陈述句**，排除了感叹、疑问和主观感受。

````ad-def
title: 定义（命题） | Definition（Proposition）

一个陈述性语句，客观描述一个只可能为真（true）或假（false）的现象。
````

````ad-def
title: 定义（开放命题） | Definition（Open Proposition）

包含一些可自由决定的对象 $x,y,\cdots$ 的命题 $P$，记作 $$P(x, y, \dots)$$
1. 这些对象 $x,y,\cdots$ 被称为变量。
2. 赋予变量具体值之前 $P(x,y,\cdots)$ 无真假之分。
````

>一般而言，我们会将命题写作 $$P(在此罗列变量) = (具体内容)$$ 的形式。

````ad-def
title: 定义（真值） | Definition（Truth Value）

真命题记 $\mathbb{T}$，假命题记 $\mathbb{F}$。
````

````ad-example
title: 示例 | Example


判断以下各个语句哪些是命题，哪些不是；若是命题，判别其真假。

1. "英文字母有 26 个"
2. "今天天气真好！"
3. "$5 + 8 = 13$" 和 "$5 - 2 = 1$"
4. $P(x) = (x \leq 10)$，并判断 $x=6$ 和 $x=11$ 时的真值。

---

1. "英文字母有 26 个"是一个陈述句，客观描述了英文字母的数量这一事实。它可被验证为真，故它是一个**真命题**（$= \mathbb{T}$）。
2. "今天天气真好！"是感叹句，不是陈述句。既然不是陈述句，就不是命题。这提醒我们：命题必须是一个「对或错能判定」的句子。
3. "$5 + 8 = 13$"是陈述句，算术上成立，故为真命题（$= \mathbb{T}$）。而"$5-2=1$"虽也是陈述句，但算术上不成立，故为假命题（$= \mathbb{F}$）。这两个例子说明：**命题不一定是真的**，它只需要「有可能去判定真假」。
4. $P(x) = (x \leq 10)$ 包含变量 $x$，在 $x$ 的值确定之前，无从判断它到底是真是假，这就是**开放命题**。取 $x=6$，$6 \leq 10$ 成立，故 $P(6)=\mathbb{T}$；取 $x=11$，$11 \leq 10$ 不成立，故 $P(11)=\mathbb{F}$。这体现了开放命题的核心特征：**真值取决于变量取值**。
````

#### 等号与等式

> 接下来从逻辑上严格定义「$=$」到底是什么意思。以往在学习中，我们将 $=$ 理解为「两个对象完全一致」时使用的符号。一个经典的例子是 $3 + 2$ 与 $5$，虽然它们**写法和形态不一样**（一个是算式、一个是单独的数字），但它们表示的是**同一个数**。用语言说就是「3 加 2 等于 5」。
> 
> 因此 $=$ 本质是一个**断言**：它断言两个对象是不可区分的，这样的断言本身构成一个命题。

````ad-def
title: 定义（等式） | Definition（Equality）

若断言两对象 $A, B$ 一致，则写 $A = B$（读作 "$A$ 等于 $B$"）。$A = B$ 本身构成一个命题。若断言不一致，则写 $A \neq B$（读作 "$A$ 不等于 $B$"）。
````

>结合前文所定义的命题的真值，我们做出如下约定：
>1. 若一个命题 $P(变量)$ 为真，我们通常写为 $$ P(变量) = \mathbb T$$ 反之则写 $$ P(变量) = \mathbb F$$
>    因此，在此约定下 “ $= \mathbb T$ ” 中的等号并非传统意义上的等号，只是作为一个形式符号存在。
>2.  如果我们想用一些符号指代某一段命题，例如将  “ $1+1 = 2$ ” 指定为 $P$，那么我们写：
>$$P = (1+1=2)$$

> ($=$)是作用於對象上的工具。兩命題邏輯上相同稱為(等價)，不能用($=$)表示。

````ad-example
title: 示例 | Example


3. $P_1 = (3 + 2 = 5)$ 是真命题（$P_1 = \mathbb{T}$）。对象 $3+2$ 与 $5$ 写法不同，但表示同一个数。
4. $P_2 = (1 + 1 = 3)$ 是假命题（$P_2 = \mathbb{F}$），因为 $1+1$ 并不等于 $3$。
5. $P_3 = (\text{妈妈} = \text{母亲})$ 是真命题（两个词指同一对象）。
6. $P_4 = (\text{妈妈} \neq \text{父亲})$ 是真命题。
````


### 0.1.3　命题逻辑的运算

> 人类的语言当然不止于单个命题。日常话语中，「及」「或」「如果……就……」这些连接词无处不在，它们是人类处理多个命题之间关系的手段。现代逻辑学把这些连接词抽象为命题之间的**运算**，就像加减乘除处理数字，逻辑运算处理命题的真假。

设 $P, Q$ 为命题。

````ad-def
title: 定义（否定） | Definition（Negation）

设 $P$ 为命题，定义 $P$ 的否定命題 $\neg P$（读作(非 $P$)），其真值由 $P$ 的真值決定：

| $P$ | $\neg P$ |
|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ |

> 直观理解：否定就是将命题「颠倒」过来。「人类生活在地球」的否定是「人类**不**生活在地球」。$P$ 真则 $\neg P$ 假，$P$ 假则 $\neg P$ 真。在数学中，$(x = 7)$ 的否定是 $(x \neq 7)$。
````

````ad-def
title: 定义（合取） | Definition（Conjunction）

设 $P, Q$ 为两命题，定义合取命題 $P \land Q$（读作($P$ 及 $Q$)），仅当 $P, Q$ 同时为真时 $P \land Q$ 为真：

| $P$ | $Q$ | $P \land Q$ |
|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ |

> 直观理解：「及」要求**两者都满足**。「今天下雨且地面是干的」只有在两个条件同时成立时才为真。
````

````ad-def
title: 定义（析取） | Definition（Disjunction）

设 $P, Q$ 为两命题，定义析取命題 $P \lor Q$（读作($P$ 或 $Q$)），当 $P, Q$ 至少一真时 $P \lor Q$ 为真：

| $P$ | $Q$ | $P \lor Q$ |
|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ |

> 直观理解：「或」是宽松的，**只要有一个成立就行**，两个都成立也可以。「周末去公园或去电影院」，至少去了一个，就算为真。
````

````ad-def
title: 定义（条件句） | Definition（Conditional）

设 $P, Q$ 为两命题，定义条件命題 $P \to Q$（读作(若 $P$，则 $Q$)），其中 $P$ 称为**假设**（hypothesis），$Q$ 称为**结论**（conclusion）。仅当 $P$ 真而 $Q$ 假时，$P \to Q$ 为假：

| $P$ | $Q$ | $P \to Q$ |
|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |

> 直观理解：条件句是五个运算中最容易让人困惑的一个。关键口诀，**「前提为假时，条件句自动为真」**。例如「若我是鸟，则我会飞」，前提（我是鸟）为假，整个条件句恒真。条件句只在一种情况下为假：前提成立但结论不成立。
````

````ad-def
title: 定义（双条件） | Definition（Biconditional）

设 $P, Q$ 为两命题，定义双条件命題 $P \leftrightarrow Q$（读作($P$ 当且仅当 $Q$)），当 $P, Q$ 真值一致时为真：

| $P$ | $Q$ | $P \leftrightarrow Q$ |
|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |

> 直观理解：$P \leftrightarrow Q$ 就是两个条件句的合取，$P \to Q$ 且 $Q \to P$。说「$P$ 当且仅当 $Q$」意味着两者要么同时成立、要么同时不成立。
````

我们将以上五种运算综合为真值表：

|     $P$      |     $Q$      |   $\neg P$   | $P \land Q$  |  $P \lor Q$  |  $P \to Q$   | $P \leftrightarrow Q$ |
| :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :-------------------: |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |     $\mathbb{T}$      |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |     $\mathbb{F}$      |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |     $\mathbb{F}$      |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |     $\mathbb{T}$      |
它表格显示了 $P,Q$ 在不同真值的情况下对应运算的结果。

````ad-example
title: 示例 | Example


设 $P = \mathbb{T}$（今天下雨），$Q = \mathbb{F}$（地面是干的，注意，下雨时地面通常是湿的，所以"地面是干的"为假）。求以下各运算命题的真值：

1. $\neg P$：今天不下雨
2. $P \land Q$：今天下雨且地面是干的
3. $P \lor Q$：今天下雨或地面是干的
4. $P \to Q$：若今天下雨，则地面是干的

---

1. 否定：$\neg P$ 与 $P$ 真值相反。$P = \mathbb{T}$，故 $\neg P = \mathbb{F}$。（今天不下雨是假的，因为确实在下雨。）

2. 合取：要求两者皆真。$P = \mathbb{T}$ 但 $Q = \mathbb{F}$，不全为真，故 $P \land Q = \mathbb{F}$。（「今天下雨且地面是干的」为假，因为两者矛盾。）

3. 析取：只要至少一真即可。$P = \mathbb{T}$，已经满足了「至少一真」，故 $P \lor Q = \mathbb{T}$。（「今天下雨或地面是干的」为真，下雨这一条就足够了。）

4. 条件句：仅当 $P$ 真而 $Q$ 假时为假。这里正好 $P = \mathbb{T}$ 且 $Q = \mathbb{F}$，前提成立但结论不成立。故 $P \to Q = \mathbb{F}$。（「若下雨，则地面是干的」这句话本身是错的，现实中下雨后地面是湿的，并非干的。这正展示了条件句为假的唯一情形：**前提真而结论假**。）
````

#### 逻辑蕴含与逻辑等价

````ad-def
title: 定义（逻辑蕴含） | Definition（Logical Implication）

若 $P \to Q = \mathbb{T}$，即 $P$ 为真时 $Q$ 必为真，则记为 $P \implies Q$，读作「$P$ 蕴含 $Q$」或「$P$ 推出 $Q$」。
````

````ad-def
title: 定义（逻辑等价） | Definition（Logical Equivalence）

若 $(P \to Q) \land (Q \to P) = \mathbb{T}$，则记为 $P \iff Q$，读作「$P$ 等价于 $Q$」或「$P$ 当且仅当 $Q$」。
````

 这两个概念是数学推理的核心工具，需要从「直观含义」和「判定方法」两方面来理解。

> **逻辑蕴含 $P \implies Q$ 的直观含义：** 说「$P$ 蕴含 $Q$」意味着只要你确认 $P$ 为真，就必然可以得出 $Q$ 为真。它建立了一条「从 $P$ 到 $Q$ 的因果通道」。注意，$P \implies Q$ 并不要求 $P$ 本身为真，它只承诺「**如果** $P$ 为真，**那么** $Q$ 必为真」。
>
> **判定方法：** 要验证 $P \implies Q$，只需检查：当 $P = \mathbb{T}$ 时，$Q$ 是否一定为 $\mathbb{T}$？若存在某情况让 $P = \mathbb{T}$ 但 $Q = \mathbb{F}$，则 $P \not\implies Q$。

> **逻辑等价 $P \iff Q$ 的直观含义：** 说「$P$ 等价于 $Q$」意味着 $P$ 和 $Q$ 在逻辑上**完全不可区分**，它们要么同时为真，要么同时为假。等价意味着：$P$ 的内容和 $Q$ 的内容虽然在写法上可能不同，但它们表达的「逻辑事实」是一样的。
>
> **判定方法：** 要验证 $P \iff Q$，只需核对 $P$ 和 $Q$ 在所有情况下的真值是否完全一致。在 0.5 节时我们会学习一个新的验证方法：先证 $P \implies Q$（充分性），再证 $Q \implies P$（必要性），两者都成立则 $P \iff Q$。

````ad-example
title: 示例 | Example


判别下列各对命题之间是否存在蕴含或等价关系。

1. $P =$ (太阳升起)，$Q =$ (天空变亮)
2. $P =$ (小明将红黄颜料混合)，$Q =$ (小明得到橙色颜料)
3. $P(x) = (x = 5 + 1)$，$Q(x) = (x = 4 + 2)$

---

1. 太阳升起必然导致天空变亮，前者为真时后者不可能为假，故 $P \implies Q$。但反过来，天空变亮未必仅来自太阳升起（可能是灯光），故 $Q \not\implies P$。因此 $P$ 和 $Q$ 是「蕴含但不等价」的关系。

2. 红黄混合必然得到橙色，故 $P \implies Q$。但得到橙色未必来自亲自混合（可能是别人送的），故 $Q \not\implies P$。同样，$P$ 和 $Q$ 是「蕴含但不等价」。这个例子和第 1 个结构完全相同，说明逻辑蕴含关心的只是**两个命题的真值关系**，与具体情境无关。

3. $P(x)$ 等价于 $x = 6$，$Q(x)$ 也等价于 $x = 6$。对任意 $x$，两者的真值完全一致：$x=6$ 时皆真，$x \neq 6$ 时皆假。故 $P \iff Q$。这个例子说明：两个在写法上不同的命题，只要表达的是同一事实，它们就是逻辑等价的。
````

### 0.1.4　全称量词与存在量词

设 $P(x)$ 为开放命题。这里 $x$ 指代了一系列变量。

````ad-def
title: 定义（全称量词） | Definition（Universal Quantifier）

$\forall x, P(x)$，读作(对所有 $x$，$P(x)$ 为真)。断言每一个对象都使命题成立。
````

````ad-def
title: 定义（存在量词） | Definition（Existential Quantifier）

$\exists x, P(x)$，读作(存在 $x$，$P(x)$ 为真)。断言至少有一个对象使命题成立。
````

| 量词   | 符号        | 含义      | 何时为假         |
| ---- | --------- | ------- | ------------ |
| 全称量词 | $\forall$ | 对**所有** | 存在一个反例       |
| 存在量词 | $\exists$ | 对**某些** | 没有任何对象能使命题成立 |

````ad-example
title: 示例 | Example


1. $P(x) =$($x$ 是需要呼吸氧气的)。取 $x$ 为(地球上的哺乳动物)：
  $\forall x, P(x)$ 为真，因为每个哺乳动物都需要呼吸氧气。

2. $P(x) =$($x$ 是奇数)。$x$ 可取 $\{1, 3, 5, 8\}$：
  $\forall x, P(x)$ 为假（$\mathbb{F}$），因为 $8$ 是偶数，构成反例。

3. $Q(x) =$($x + 5 = 12$)。$x$ 取全体正整数：
  $\exists x, Q(x)$ 为真（$\mathbb{T}$），因为 $x = 7$ 使命题成立。

4. $Q(x) =$($x + 10 = 5$)。$x$ 取全体正整数：
  $\exists x, Q(x)$ 为假（$\mathbb{F}$），因为没有任何正整数满足等式。
````

### 0.1.5　现代数学的规则

> 任何游戏都需要先定好规则才能开始，象棋有象棋的规则，足球有足球的规则。数学同样如此：它的「游戏规则」就是**公理**。公理是不需要证明、被直接承认为真的命题，它们是所有数学推理的起点。
>
> 不同数学分支可能有不同的公理体系（就像不同运动有不同的规则），本章只介绍最基础、最通用的一组公理，它们定义了「等于」的含义和基本的推理方式。

````ad-def
title: 定义（公理） | Definition（Axiom）

被定义为真命题的命题。公理是数学推理的出发点。
````

现在我们来看规定一些公理，这些公理定义了最基本的几个事实：

````ad-axi
title: 公理（等式公理） | Axiom（Equality Axioms）

对任何对象 $a, b, c$：
1. **反身性（Reflexivity）：** $a = a$
2. **对称性（Symmetry）：** $a = b \iff b = a$
3. **传递性（Transitivity）：** $(a = b) \land (b = c) \implies a = c$

> 传递性可写为 $a = b = c \iff (a = b) \land (b = c)$。
````

````ad-axi
title: 公理（莱布尼茨定律 / 同一者不可分原理） | Axiom（Leibniz's Law）

设 $x, y$ 为两对象，$P(x)$ 是关于 $x$ 的命题，则 $\forall x, y$：
$$(x = y) \implies (P(x) \iff P(y))$$

两个相同的对象具有完全相同的性质。凡对 $x$ 成立的命题，对等于 $x$ 的 $y$ 也同样成立。
````

````ad-example
title: 示例 | Example


设 $x = 2 + 3$，$y = 5$，并取 $P(A) =$($A$ 是奇数)。已知 $P(5) = \mathbb{T}$，求 $P(2+3)$ 的真值。

---

显然 $x = y$。由莱布尼茨定律：
$$(x = y) \implies (P(x) \iff P(y))$$
故 $P(2+3) = P(5) = \mathbb{T}$，即 $2 + 3$ 也是奇数。
````

莱布尼茨定律是逻辑学的一个基本事实，往后的许多证明中都会用到，但它会以一个更形象但更狭义的名词出现：代入法（Chapter 06）。
### 0.1.6　定理与数学证明

````ad-def
title: 定义（定理） | Definition（Theorem）

在既定公理下的真命题。定理通常写为 $$(\text{前提}) \implies (\text{结论})$$
````

````ad-def
title: 定义（数学证明） | Definition（Mathematical Proof）

基于公理和已证定理推导出命题为真的逻辑过程。
````

> 写证明的本质是**搭建逻辑链条**：从前提出发，每一步依据公理或已证定理向前推进，直到抵达结论。这就像沿着一条由 $\implies$ 连接的道路前进，$A \implies B$，$B \implies C$，$C \implies D$……最终 $A \implies Z$。下面的假言三段论正好刻画了这种「传递性」。

````ad-thm
title: 定理（假言三段论） | Theorem（Hypothetical Syllogism）

对命题 $X, Y, Z$：
$$(X \to Y) \land (Y \to Z) \implies (X \to Z)$$
````

````ad-proof
title: 证明 | Proof

我们的目标是证明命题 $(X \to Y) \land (Y \to Z) \to (X \to Z)$ 恒真（即 $= \mathbb{T}$ 对一切 $X,Y,Z$ 成立）。要验证这一点，我们用真值表穷举 $X,Y,Z$ 的所有真值组合（共 $2^3 = 8$ 种），并逐步计算每个中间命题的真值。

**第一步：** 列出 $X, Y, Z$ 的所有真值组合。

| $X$ | $Y$ | $Z$ |
|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ |

注：由于 $X,Y,Z$ 是完全独立的命题，它们在真值上没有互相制约的关系。因此真值组合表就是三个命题各自取真值 $\{\mathbb T,\mathbb F\}$ 的所有可能，共 $8$ 行。

**第二步：** 从单个条件句开始，分别计算 $X \to Y$ 和 $Y \to Z$。回忆条件句的定义：仅当「前提真且结论假」时为 $\mathbb{F}$，其余均为 $\mathbb{T}$。

| $X$ | $Y$ | $Z$ | $X \to Y$ | $Y \to Z$ |
|:---:|:---:|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |

我们可以观察到：$X \to Y$ 在第 3、5 行为 $\mathbb{F}$（此时 $X=\mathbb{T}, Y=\mathbb{F}$）；$Y \to Z$ 在第 2、6 行为 $\mathbb{F}$（此时 $Y=\mathbb{T}, Z=\mathbb{F}$）。这些正是条件句定义中「前提真而结论假」的情形。

**第三步：** 计算前提 $(X \to Y) \land (Y \to Z)$。回忆合取 $\land$ 的定义：两者皆为真时才为真。

| $X$ | $Y$ | $Z$ | $X \to Y$ | $Y \to Z$ | $(X \to Y) \land (Y \to Z)$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |

合取的结果（最右列）中，只有第 1、4、7、8 行为 $\mathbb{T}$，这些行中 $X \to Y$ 和 $Y \to Z$ 同时为真。

**第四步：** 计算结论 $X \to Z$，并将完整的条件命题 $(X \to Y) \land (Y \to Z) \to (X \to Z)$ 写入：

| $X$ | $Y$ | $Z$ | $(X \to Y) \land (Y \to Z)$ | $X \to Z$ | $(X \to Y) \land (Y \to Z) \to (X \to Z)$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |

观察最右列：**全部 $8$ 行均为 $\mathbb{T}$**。这意味着命题
$$(X \to Y) \land (Y \to Z) \to (X \to Z)$$
对 $X,Y,Z$ 的**任何**取值都恒真，即它是一个恒真命题（$= \mathbb{T}$）。

既然该条件句恒真，由逻辑蕴含的定义（$P \to Q = \mathbb{T}$ 即 $P \implies Q$），我们立即得到：
$$(X \to Y) \land (Y \to Z) \implies (X \to Z)$$
这便完成了假言三段论的证明。
````

````ad-example
title: 示例 | Example


已知：(1) 若小明所在的球队赢球，则他们会进入决赛。 (2) 若他们进入决赛，则学校发放奖学金。

问：若小明球队赢球，能否推出学校发放奖学金？

---

设 $P=$（小明球队赢球），$Q=$（进入决赛），$R=$（学校发放奖学金）。由已知得 $P \to Q$ 与 $Q \to R$。由假言三段论：
$$(P \to Q) \land (Q \to R) \implies (P \to R)$$
故 $P \to R$ 成立，即若小明球队赢球，则学校发放奖学金。逻辑链：赢球 $\to$ 决赛 $\to$ 奖学金。
````

````ad-def
title: 定义（推论） | Definition（Corollary）

从定理直接推出的结论。
````

````ad-def
title: 定义（引理） | Definition（Lemma）

为证明主要定理而准备的辅助命题。
````

>在写数学证明时，切记几点：
>
>1. 数学证明是以逻辑推断来论证某个命题恒真或恒假。
>
>2. 要证明某个定理，就要从该定理的前提条件出发，一步步用已知的结论推断出该定理的结论。

以下给出两个实例，分别从生活及数学情景入手，直观体会如何从前提一步一步推出结论。

````ad-example
title: 示例 | Example


**生活实例：**

已知：(1) 若下雨，则小明会带伞。 (2) 若小明带伞，则他不会淋湿。

今观察发现「正在下雨」。证明：小明不会淋湿。

---

**证明：**
1. 由前提 (1)："若下雨，则小明会带伞"（即 $P \to Q$）。
2. 观察事实：正在下雨（$P = \mathbb{T}$），故由 $P \implies Q$，小明带了伞（$Q = \mathbb{T}$）。
3. 由前提 (2)："若小明带伞，则他不会淋湿"（即 $Q \to R$）。
4. 已知 $Q = \mathbb{T}$，故 $R = \mathbb{T}$（因为是前提条件，因此默认正确。），即小明不会淋湿。

核心结构：$P \implies Q \implies R$，每一步依据已知条件（或公理）向前推进。
````

````ad-example
title: 示例 | Example


**数学实例：** 证明 $13 + 7$ 是偶数。

设偶数（even number）定义为：可被二整除的数。

---

**证明：**
1. 计算：$13 + 7 = 20$。
2. $20$ 是一个偶数。
3. 故 $13 + 7$ 是偶数。（莱布尼茨法则）
````

---

## 0.2　基础算术（Basic Arithmetic）
> **本节难度上限**：T B+ ｜ C C ｜ E B+ ｜ Q C


> 上一节搭建了逻辑推理的「骨架」，命题、公理、证明。现在，我们将这套骨架应用于最具体、最熟悉的数学对象：**数**。从自然数开始，借助公理定义加法、减法、乘法、除法，所有算术「常识」（如交换律、结合律）都将从公理出发得到严格证明，而不再只是「老师说的」。

### 0.2.1　自然数

````ad-def
title: 定义（自然数） | Definition（Natural Number）

全体正整数 $\{1, 2, 3, \dots\}$（亦常包含 $0$）。源于计数行为。
````

### 0.2.2　数的运算

````ad-def
title: 定义（算式） | Definition（Arithmetic Expression）

只含有自然数及其运算的对象。
> Note: “$=$” 是逻辑符号而非运算。
````

> 现阶段暂时借用小学数学的直觉定义运算，严谨的运算将在函数及其图像一章中严谨定义。
> 
> 同时，对于两个自然数 $a, b$，我们称其相等时写 $a = b$。即我们断言它们在数值上相同。
#### 加法与减法

````ad-axi
title: 公理（自然数的加法公理） | Axiom（自然数的加法公理）

对任意自然数 $a, b, c$：
1. **交换律（Commutativity）：** $a + b = b + a$
2. **结合律（Associativity）：** $(a + b) + c = a + (b + c)$
3. **单位元（Identity）：** $a + 0 = a$
````

````ad-def
title: 定义（减号） | Definition（Minus Sign）

对任意自然数 $a, b, c$，若 $a = b + c$，则定义 $c = a - b$。称 $c$ 为 $a$ 与 $b$ 之差。同理 $b = a - c$。

即 $a = b + c \iff c = a - b$。
````

````ad-example
title: 示例 | Example


验证公理 0.2.1 中的三条定律，并应用减号的定义。

1. 取 $a=1, b=4, c=6$，验证交换律、结合律、单位元
2. 将 $13 = 6 + 7$ 转换为减法形式

---

1. 加法公理验证：
  - $1 + 4 = 4 + 1 = 5$（交换律：两数相加，交换顺序结果不变）；
  - $(1+4)+6 = 1+(4+6) = 11$（结合律：加法可以任意改变分组顺序）；
  - $5+0=5$（单位元：加 $0$ 不改变原数）。
2. 减号应用：由 $a = b + c \iff c = a - b$，将 $a=13, b=6, c=7$ 代入：
  - $13 = 6 + 7$ 等价于 $13-6=7$
  - 也等价于 $13-7=6$
````

````ad-thm
title: 定理 | Theorem

对任意自然数 $a$，$a - a = 0$。
````

````ad-proof
title: 证明 | Proof

据减号定义：
$$a - a = 0 \iff a = a + 0$$
右端 $a = a + 0$ 由公理 0.2.1(3) 及等式反身性恒真。故 $a - a = 0$ 恒真。
````

````ad-cor
title: 推论 | Corollary

对任意自然数 $a$，$0 + a = a$。
````

````ad-proof
title: 证明 | Proof

由加法交换律（公理 0.2.1(1)），$0 + a = a + 0$。再由加法单位元（公理 0.2.1(3)），$a + 0 = a$。故 $0 + a = a$。
````

#### 乘法与除法

````ad-axi
title: 公理（自然数的乘法公理） | Axiom（自然数的乘法公理）

对任意自然数 $a, b, c$：
1. **交换律（Commutativity）：** $a \times b = b \times a$
2. **单位元（Identity）：** $a \times 1 = 1 \times a = a$
3. **结合律（Associativity）：** $(ab) \times c = a \times (bc)$
4. **分配律（Distributivity）：** $a \times (b + c) = a \times b + a \times c$
````

````ad-example
title: 示例 | Example


验证公理 0.2.2 中的四条乘法定律。

1. $3 \times 4$ 与 $4 \times 3$
2. $5 \times 1$
3. $(2 \times 4) \times 6$ 与 $2 \times (4 \times 6)$
4. $3 \times (5 + 7)$

---

1. $3 \times 4 = 12$，$4 \times 3 = 12$，两者结果相同（交换律：乘法顺序不影响结果）。
2. $5 \times 1 = 5$，$1 \times 5 = 5$（单位元：乘以 $1$ 不改变原数）。
3. $(2 \times 4) \times 6 = 8 \times 6 = 48$，而 $2 \times (4 \times 6) = 2 \times 24 = 48$，两者一致（结合律：乘法可以任意改变分组顺序）。
4. $3 \times (5 + 7) = 3 \times 12 = 36$，而 $3 \times 5 + 3 \times 7 = 15 + 21 = 36$，两者一致（分配律：乘法「分配」到括号内每一项）。
````

````ad-def
title: 定义（整除） | Definition（Divisibility）

若一个自然数 $n \neq 0$ 可写成 $n = p \times q$（$p, q \neq 0$），则称 $p$ 整除 $n$，记为 $p \mid n$，或 $n \div p = q$。特别地，$0$ 可被所有非零自然数整除。
````

````ad-example
title: 示例 | Example


判断 $9$、$2$、$6$、$3$ 是否整除 $18$。

---

因 $18 = 9 \times 2$，故 $9 \mid 18$ 且 $2 \mid 18$，且 $18 \div 9 = 2$，$18 \div 2 = 9$。又 $18 = 6 \times 3$，故 $6 \mid 18$ 且 $3 \mid 18$ 也成立。
````

#### 乘方的记号

````ad-def
title: 定义（乘方） | Definition（Exponentiation）

设 $a$ 为底数，$n$ 为指数（$a, n$ 均为自然数，$n \geq 1$），定义
$$a^n = \underbrace{a \cdot a \cdots a}_{n \text{ 个 } a}$$

$n^2$ 称 $n$ 的平方（square），$n^3$ 称 $n$ 的立方（cube）。
````

- 乘法记号：已知数之间用 $\times$ 或 $\cdot$；未知量之间可省略（如 $2x$、$nxyz$）。

同时，我们透过计算 $3^2\cdot 3^3$ 与 $3^5$，经过对比可以发现：
$$a^m \times a^n = a^{m+n}$$
此外，我们约定 $n^0 = 1$（$n \neq 0$）

````ad-example
title: 示例 | Example


计算下列各式的值：
1. $3^2$
2. $4^3$
3. $2^5 \times 2^3$
4. $7^0$

---

1. $3^2 = 3 \times 3 = 9$（$3$ 的平方）。
2. $4^3 = 4 \times 4 \times 4 = 64$（$4$ 的立方）。
3. $2^5 \times 2^3 = 2^{5+3} = 2^{8} = 256$（运用 $a^m \times a^n = a^{m+n}$）。
4. $7^0 = 1$（由约定，$n \neq 0$）。
````

#### 公因数与公倍数

````ad-def
title: 定义（因数） | Definition（Factor）

若 $p \mid n$，则 $p$ 为 $n$ 的因数。
````

````ad-example
title: 示例 | Example


求下列各数的因数：
1. $6$
2. $12$

---

1. $6 = 1 \times 6 = 2 \times 3$，故 $6$ 的因数为 $1, 2, 3, 6$。
2. $12 = 1 \times 12 = 2 \times 6 = 3 \times 4$，故 $12$ 的因数为 $1, 2, 3, 4, 6, 12$。
````

````ad-def
title: 定义（公因数） | Definition（Common Factor）

若 $p \mid n$ 且 $p \mid m$，则 $p$ 为 $n, m$ 的公因数。
````

````ad-example
title: 示例 | Example


求下列各组数的公因数：
1. $6$ 与 $15$
2. $12$ 与 $18$

---

1. $6$ 的因数为 $1, 2, 3, 6$；$15$ 的因数为 $1, 3, 5, 15$。故公因数为 $1, 3$。
2. $12$ 的因数为 $1, 2, 3, 4, 6, 12$；$18$ 的因数为 $1, 2, 3, 6, 9, 18$。故公因数为 $1, 2, 3, 6$。
````

````ad-def
title: 定义（最大公因数 H.C.F.） | Definition（Highest Common Factor）

$\gcd(m, n)$ 为 $n, m$ 所有公因数中最大者。
````

````ad-example
title: 示例 | Example


求下列各组数的最大公因数：
1. $\gcd(70, 55)$
2. $\gcd(210, 385)$（用短除法）

---

1. $70$ 的因数为 $\{1,2,5,7,10,14,35,70\}$，$55$ 的因数为 $\{1,5,11,55\}$，公因数为 $\{1,5\}$，故 $\gcd(70, 55) = 5$。
2. 短除法：
   $$\begin{array}{c|cc} 5 & 210 & 385 \\ \hline 7 & 42 & 77 \\ \hline & 6 & 11 \end{array}$$
   故 $\gcd(210, 385) = 5 \times 7 = 35$。
````

````ad-def
title: 定义（倍数） | Definition（Multiple）

若 $p \mid n$，则 $n$ 为 $p$ 的倍数。
````

````ad-example
title: 示例 | Example


列出下列各数的前几个倍数：
1. $6$
2. $15$

---

1. $6$ 的倍数：$6, 12, 18, 24, 30, \dots$
2. $15$ 的倍数：$15, 30, 45, 60, 75, \dots$
````

````ad-def
title: 定义（公倍数） | Definition（Common Multiple）

若 $p \mid n$ 且 $q \mid n$，则 $n$ 为 $p, q$ 的公倍数。
````

````ad-example
title: 示例 | Example


找出 $6$ 与 $15$ 的几个公倍数。

---

由上例，$6$ 的倍数为 $6, 12, 18, 24, 30, \dots$，$15$ 的倍数为 $15, 30, 45, 60, 75, \dots$。两者共同出现的 $30, 60, 90, \dots$ 即为 $6$ 与 $15$ 的公倍数。
````

````ad-def
title: 定义（最小公倍数 L.C.M.） | Definition（Least Common Multiple）

$n, m$ 的所有公倍数中最小者，称为 $n, m$ 的最小公倍数，记作 $\operatorname{lcm}(n, m)$。
````

````ad-example
title: 示例 | Example


求下列各组数的最小公倍数：
1. $\operatorname{lcm}(6, 15)$
2. $\operatorname{lcm}(210, 385)$（用短除法）

---

1. 由上例，$6$ 与 $15$ 的公倍数中最小者为 $30$，故 $\operatorname{lcm}(6, 15) = 30$。
2. 用短除法（同上短除表格），$\operatorname{lcm}(210, 385) = 5 \times 7 \times 6 \times 11 = 2310$。
````

````ad-cor
title: 推论 | Corollary

若 $n = p \times q$，则 $p, q$ 均为 $n$ 的因数。
````

````ad-proof
title: 证明 | Proof

由 $n = p \times q$ 得 $n \div p = q$（$p \neq 0$），即 $p \mid n$，故 $p$ 为 $n$ 的因数。同理 $n \div q = p$（$q \neq 0$），即 $q \mid n$，故 $q$ 亦为 $n$ 的因数。
````

#### 四则运算

> 以上我们分别定义了加法、减法、乘法、除法四种运算。它们统称为**四则运算**，是后续所有数学计算的基础。有几个重要的书写和计算约定需要先记牢：

- **四则运算（Four Arithmetic Operations）：** 加法、减法、乘法、除法。
- **表示法：** 乘法可用 $a \times b$、$a \cdot b$、$ab$；除法可用 $a \div b$、$a/b$、$\frac{a}{b}$。
- **运算优先级：** 先乘除、后加减；有括号先算括号内。

````ad-example
title: 示例 | Example


计算下列各式：
1. $3 + 2 \times 4$
2. $\frac{6}{2} + 1$
3. $(5 - 2) \times 3$

---

1. $3 + 2 \times 4 = 3 + 8 = 11$（先乘后加）。
2. $\frac{6}{2} + 1 = 3 + 1 = 4$（除法可写为分式）。
3. $(5 - 2) \times 3 = 3 \times 3 = 9$（先算括号内）。
````


---

## 0.3　反证法（Proof by Contradiction）

> **本节难度上限**：T B+ ｜ C D ｜ E B ｜ Q C

> 在 §0.2 中我们学习了自然数及其四则运算，并接触了初步的数学证明。本节正式介绍一种重要的证明策略，**反证法**（proof by contradiction）。与从前提正向推导至结论不同，反证法从反面切入：假设结论不成立，若由此推导出矛盾，则原结论必真。

````ad-def
title: 定义（反证法） | Definition（by Contradiction）

要证明某个命题 $Q$ 为真，先**假设 $\neg Q$ 成立**（即假设结论的否定为真），然后由此推导出一个**矛盾**（contradiction），即一个恒假的命题（如 $0 = 1$，或某个形如 $P \land \neg P$ 的命题）。矛盾的出现说明最初的假设 $\neg Q$ 不可能为真，从而 $Q$ 必须为真。

````

> 反证法之所以有效，是因为数学世界不允许矛盾存在：若某个假设导致矛盾，则该假设本身就错了。这类似侦探推理，「假设他是凶手，但案发时他在飞机上」，这个矛盾证明「他是凶手」的假设不成立。

````ad-example
title: 示例 | Example


证明：不存在最大的自然数。

---

```ad-proof
title: 证明 | Proof

假设存在最大的自然数 $N$（即 $\neg Q$）。

由于 $N$ 是自然数，$N + 1$ 也是自然数（自然数对加法封闭）。

而 $N + 1 > N$，与「$N$ 是最大自然数」矛盾。

因此假设不成立，即**不存在最大的自然数**。
```
````

````ad-example
title: 示例 | Example


某日下午，教室的玻璃被打破了。已知以下事实：
(1) 若小明是打破玻璃的人，则他当天下午到过学校；
(2) 小明当天下午因病请假，没有到过学校。

证明：小明不是打破玻璃的人。

---

```ad-proof
title: 证明 | Proof

设 $P =$ (小明是打破玻璃的人)，$Q =$ (小明当天下午到过学校)。

要证明的结论是 $\neg P$（小明不是打破玻璃的人）。使用反证法：

假设 $\neg(\neg P) = P$ 成立，即**小明是打破玻璃的人**。

由事实 (1)：$P \to Q$，结合假设 $P = \mathbb{T}$，可得 $Q = \mathbb{T}$（小明到过学校）。

但事实 (2) 明确指出 $Q = \mathbb{F}$（小明没有到过学校）。

于是同时有 $Q = \mathbb{T}$ 和 $Q = \mathbb{F}$，这构成了一个矛盾（形如 $P \land \neg P$）。

因此假设 $P = \mathbb{T}$ 不成立，即小明不是打破玻璃的人。
```
````



````ad-example
title: 示例 | Example


证明：$7$ 不是 $3$ 的倍数。

---

```ad-proof
title: 证明 | Proof

假设结论不成立，即 **$7$ 是 $3$ 的倍数**（$\neg Q$）。

则存在自然数 $k$ 使 $7 = 3k$。

逐一尝试 $k = 1, 2, 3, \dots$：
- $k = 1$：$3 \times 1 = 3$
- $k = 2$：$3 \times 2 = 6$
- $k = 3$：$3 \times 3 = 9$

$3 < 7 < 9$，即 $7$ 不在 $3$ 的倍数序列中。

故不存在自然数 $k$ 使 $7 = 3k$，与假设矛盾。

因此假设不成立，即 $7$ 不是 $3$ 的倍数。
```
````

---

## 0.4　逆否命题（Contrapositive）

> **本节难度上限**：T B+ ｜ C D ｜ E B ｜ Q C+

> 在 §0.1.3 中我们学习了条件句 $P \to Q$，上一节（反证法）中学习了从否定结论出发导出矛盾的反证法。本节介绍另一种常用的证明策略，**逆否命题法**：不导出矛盾，而是直接将条件句转化为一个逻辑等价的命题来证明。

````ad-def
title: 定义（逆否命题） | Definition（Contrapositive）

设 $P, Q$ 为命题。条件句 $P \to Q$ 的**逆否命题**（contrapositive）是 $$\neg Q \to \neg P$$读作「若非 $Q$，则非 $P$」。
````

````ad-thm
title: 定理（逆否命题的等价性） | Theorem（逆否命题的等价性）

条件句与其逆否命题逻辑等价：
$$(P \to Q) \iff (\neg Q \to \neg P)$$
````

````ad-proof
title: 证明 | Proof

列出 $P, Q$ 所有真值组合（$2^2 = 4$ 种），逐步计算：

| $P$ | $Q$ | $\neg Q$ | $\neg P$ | $P \to Q$ | $\neg Q \to \neg P$ | $(P \to Q) \leftrightarrow (\neg Q \to \neg P)$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |

最右列全部为 $\mathbb{T}$，故命题 $(P \to Q) \leftrightarrow (\neg Q \to \neg P)$ 恒真，即 $(P \to Q) \iff (\neg Q \to \neg P)$。
````

> 这一等价性的意义在于：要证明 $P \to Q$，只需证明 $\neg Q \to \neg P$ 即可。有时从反面假设 $\neg Q$ 并正向推导出 $\neg P$，比从 $P$ 出发直接推导出 $Q$ 更容易。
>
> **与反证法的关系：** 反证法（上一节）和逆否命题法都从否定结论出发，但路径不同：
> - 反证法：假设 $\neg Q$，推导出**矛盾**（形如 $P \land \neg P$），从而推翻 $\neg Q$。
> - 逆否命题法：将原命题 $P \to Q$ 等价替换为 $\neg Q \to \neg P$，**不涉及矛盾**，而是正向证明后一命题。

````ad-example
title: 示例 | Example


写出命题「若下雨，则地面是湿的」的逆否命题，并说明两者的等价关系。

---

设 $P =$（下雨），$Q =$（地面是湿的），原命题为 $P \to Q$。其逆否命题为 $\neg Q \to \neg P$，即「若地面不是湿的，则没有下雨」。由逆否命题的等价性，两者逻辑等价：观察地面干爽即可推断未下雨。
````

````ad-example
title: 示例 | Example


**例 2：** 设 $n$ 为自然数。已知「若 $n$ 是 6 的倍数，则 $n$ 是 3 的倍数」为真。写出其逆否命题，并验证它同样为真。

---

原命题是 $P \to Q$，其中 $P =$ ($n$ 是 6 的倍数)，$Q =$ ($n$ 是 3 的倍数)。

逆否命题 $\neg Q \to \neg P$：
> 若 $n$ 不是 3 的倍数，则 $n$ 不是 6 的倍数。

设 $n$ 是 6 的倍数，即存在自然数 $k$ 使 $n = 6 \times k$。

则 $n = 3 \times (2k)$，故 $n$ 也是 3 的倍数。

$P \to Q$ 得证。由逆否命题的等价性，$\neg Q \to \neg P$ 自动为真，即「若 $n$ 不是 3 的倍数，则 $n$ 不是 6 的倍数」必然成立。

> 此例展示了逆否命题法的典型用法：先证明原命题 $P \to Q$（此处直接验证即可），逆否命题的真假便自动确定，因为二者逻辑等价。

````

````ad-example
title: 示例 | Example


**例 3：** 设 $a, b$ 为自然数。证明：若 $ab$ 是奇数，则 $a$ 与 $b$ 均为奇数。

---

原命题的逆否命题：
> 若 $a$ 或 $b$ 中至少有一个是偶数（即并非两者均为奇数），则 $ab$ 是偶数。

假设 $a, b$ 中至少有一个是偶数。

若 $a$ 是偶数，则存在自然数 $k$ 使 $a = 2k$。此时 $ab = (2k) \times b = 2 \times (kb)$，故 $ab$ 是偶数。

若 $b$ 是偶数，同理 $ab$ 也是偶数。

因此 $\neg Q \to \neg P$ 得证。

由逆否命题的等价性，原命题 $P \to Q$ 成立，即若 $ab$ 为奇数，则 $a$ 与 $b$ 均为奇数。

> 注意：此例中逆否命题的证明只需要「若某数为偶数，则乘任何自然数仍为偶数」这一简单事实，无需复杂的代数展开。这正体现了逆否命题法的优势，将难证的原命题转化为易证的逆否命题。
````

---

## 0.5　逻辑等价的证明（Proving Logical Equivalence）

> **本节难度上限**：T B+ ｜ C C ｜ E B ｜ Q C+

> 在逆否命题的讨论中，我们用到了「$P \to Q$ 与 $\neg Q \to \neg P$ 等价」这一事实。本节系统讲解如何证明两个命题逻辑等价。

````ad-thm
title: 定理（逻辑等价的拆分） | Theorem（Decomposition of Equivalence）

对任意两命题 $P, Q$：
$$(P \leftrightarrow Q) \iff \big((P \to Q) \land (Q \to P)\big)$$
即「$P$ 与 $Q$ 等价」当且仅当「$P$ 蕴含 $Q$ **且** $Q$ 蕴含 $P$」同时成立。
````

````ad-proof
title: 证明 | Proof

列出 $P, Q$ 所有真值组合，逐步计算：

| $P$ | $Q$ | $P \to Q$ | $Q \to P$ | $(P \to Q) \land (Q \to P)$ | $P \leftrightarrow Q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ |

最右两列，$(P \to Q) \land (Q \to P)$ 与 $P \leftrightarrow Q$，**真值完全一致**。因此它们逻辑等价，定理得证。
````

> 这个定理揭示了一个极其重要的证明策略：要证明「$P$ 等价于 $Q$」，我们**不需要从头开始构造**，而是将 $P \iff Q$ 拆成两个小目标：
> 1. **充分性**（$P \implies Q$）：证明若 $P$ 成立，则 $Q$ 成立。
> 2. **必要性**（$Q \implies P$）：证明若 $Q$ 成立，则 $P$ 成立。
>
> 只要两个方向都证完，便自然得到 $P \iff Q$。

````ad-example
title: 示例 | Example


证明：一个自然数 $n$ 是偶数，当且仅当 $n^2$ 是偶数。

设 $P =$ ($n$ 是偶数)，$Q =$ ($n^2$ 是偶数)。

---

**充分性（$P \implies Q$）：** 若 $n$ 是偶数，则 $n = 2k$。于是 $n^2 = (2k)^2 = 4k^2 = 2 \times (2k^2)$，故 $n^2$ 也是偶数。✓

**必要性（$Q \implies P$）：** 若 $n^2$ 是偶数。我们采用逆否命题法：证明「若 $n$ 不是偶数（即 $n$ 是奇数），则 $n^2$ 不是偶数」。设 $n = 2k + 1$（奇数形式），则 $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$，为奇数，不是偶数。逆否命题成立，故必要性得证。✓

两个方向均证毕，因此 $n$ 是偶数 $\iff$ $n^2$ 是偶数。
````

````ad-example
title: 示例 | Example


证明：小明昨天打了篮球，当且仅当昨天是晴天且小明有空。

设 $P =$ (小明昨天打了篮球)，$Q =$ (昨天是晴天且小明有空)。

---

**充分性（$P \implies Q$）：** 要证明若小明昨天打了篮球，则昨天是晴天且小明有空。小明只会在晴天才去打篮球（雨天球场关闭），并且他只有在有空时才会去打球。这两个条件叠加，便组成 $Q$。因此 $P \implies Q$。

**必要性（$Q \implies P$）：** 要证明若昨天是晴天且小明有空，则小明昨天打了篮球。小明是一个篮球爱好者，只要晴天且有自由时间，他一定会去打篮球。因此 $Q \implies P$。

两个方向均证毕，故 $P \iff Q$。
````

---

## 0.6　基础代数（Basic Algebra）
> **本节难度上限**：T B- ｜ C D+ ｜ E C ｜ Q C+


> 算术处理的是具体的数字（$3+5=8$），而**代数**将数字替换为字母（$a+b=c$），使我们可以一次性描述一整类计算的规律。但变量和代数式不是命题，它们只是**对象**；只有当等号出现、或问题变为「求 $x$ 使得……」，才转化为可以判真假的**命题**。区分「对象」和「命题」是本章最核心的能力，现在通过代数来巩固这个区分。

### 0.6.1　对象与命题在代数中的体现

````ad-def
title: 定义（变量） | Definition（Variable）

用来表示未知数或可变数值的符号，通常用字母（$x, y, z, \dots$）表示。
> 变量本身是一个**对象**。
````

````ad-example
title: 示例 | Example


判断以下说法是否正确，并解释理由。

1. $x$ 本身就是一个代数式
2. $5$ 是代数式吗

---

1. 正确。变量是最基本的代数式，因为一个单独的字母已经包含了一个「对象」所需要的全部要素。事实上，所有代数式都是由变量通过运算组合而成的。
2. $5$ 是代数式。虽然它不含变量，但它是用数字组成的式子。在不含变量时，代数式退化为常数。
````

````ad-def
title: 定义（代数式） | Definition（Algebraic Expression）

由数、变量和运算符号组成的式子（如 $3x + 5y - 2$）。
> 代数式是一个**对象**，即不含真假。
````

````ad-example
title: 示例 | Example


判断下列各式中，哪些是代数式（对象），哪些不是，并说明原因。

1. $5a + 3b$
2. $2(x - 1) + 4$
3. $\dfrac{x}{y} + z^2$
4. $3x + 1 = 7$

---

1. $5a + 3b$ 是代数式。它由变量 $a, b$ 及常数 $5, 3$ 通过加法和乘法组成，没有出现等号，不含真假，因此是一个对象。
2. $2(x - 1) + 4$ 是代数式。括号只是表示运算顺序，不涉及真假判断，它仍然是代数式（对象）。
3. $\dfrac{x}{y} + z^2$ 是代数式。除法和乘方也属于运算，它们同样不引入真假，因此它仍是代数式。
4. $3x + 1 = 7$ **不是**代数式，它是**方程**（一个开放命题）。因为出现了「$=$」，它已经是一个可以判真假的命题，而非纯粹的对象。
````

>代数式与变量均为对象，但前者可由后者组合而成。换言之，变量本身就是代数式的一种。写为逻辑符号：
>$$ \text{变量} \implies \text{代数式} $$


````ad-def
title: 定义（等式） | Definition（Equation as Equality）

以 “$=$” 连接两个对象（代数式），断言两者在数值上一致。
> 等式是一个**命题**。
````


````ad-example
title: 示例 | Example


分析以下三个等式的真值情况，并说明它们各属于哪一类命题。

1. $P_1 = (3 + 4 = 7)$
2. $P_2 = (2 \times 3 = 5)$
3. $P_3(a, b) = (a + b = b + a)$

---

1. $P_1 = (3 + 4 = 7)$：不含变量，左边 $3+4$ 计算得 $7$，与右边相等，故 $P_1 = \mathbb{T}$。这是一个**恒真命题**。

2. $P_2 = (2 \times 3 = 5)$：不含变量，左边 $2 \times 3 = 6 \neq 5$，故 $P_2 = \mathbb{F}$。虽然它是假命题，但它仍然是**等式**，只不过内容是错误的。这再次说明：命题不一定要为真，只要可判真假即可。

3. $P_3(a, b) = (a + b = b + a)$：含变量 $a, b$，但无论 $a, b$ 取何值，加法交换律恒成立，故对任意自然数 $a, b$ 有 $P_3(a, b) = \mathbb{T}$。这是恒真命题。注意它虽然含变量，但因为它是**公理**（加法交换律），已被规定为恒真。
````

````ad-def
title: 定义（方程） | Definition（Equation as Open Proposition）

含有变量的等式，即一个**开放命题**（如 $P(x) = (2x - 5 = 11)$）。其真值取决于变量的取值。
````

````ad-example
title: 示例 | Example


对以下每个方程，写出它的 $P(x)$ 或 $P(x,y)$ 表达形式，并找出使其为真的变量取值（即「解」）。

1. $2x - 5 = 11$
2. $x = 2$
3. $y^2 = 9$
4. $x + y = 10$

---

- $P(x) = (2x - 5 = 11)$。代入 $x=8$：$P(8) = (16-5=11) = (11=11) = \mathbb{T}$；代入 $x=3$：$P(3) = (6-5=11) = (1=11) = \mathbb{F}$。故 $x=8$ 是唯一解（**单解**）。
- $P(x) = (x = 2)$。$x=2$ 时 $P(2) = \mathbb{T}$；其余取值均使 $P(x) = \mathbb{F}$。解为 $x=2$（**单解**）。
- $P(y) = (y^2 = 9)$。$y=3$ 时 $P(3)=\mathbb{T}$；$y=-3$ 时 $P(-3)=\mathbb{T}$。故解为 $y=3$ 或 $y=-3$（**多解**）。
- $P(x, y) = (x + y = 10)$。含两个变量，解为一组配对，如 $(3,7)$、$(6,4)$ 等（**无穷多解**）。
````

> **框架回顾：** 本章建立了一条贯穿代数与逻辑的主线，可用四组对应串起：
>
> - **代数式 $\leftrightarrow$ 对象**：代数式（如 $3+4$、$2x-5$）本身没有真假可言，它只是某个数学对象（一个数或一个值待定的式子）。
> - **等式 $\leftrightarrow$ 命题**：用「$=$」连接两个代数式便得到一个等式（如 $3+4=7$、$2x-5=11$），它可判真假，因而是命题。
> - **方程 $\leftrightarrow$ 开放命题**：含变量的等式其真值取决于变量取值，故为开放命题 $P(x)$。
> - **解方程 $\leftrightarrow$ 求使开放命题为真的对象**：解方程就是找出所有使 $P(x)=\mathbb{T}$ 的 $x$，即把「开放」变为「确定」。
>
> 换言之，代数式提供对象，等式把对象关系化为命题，方程把命题留给变量去判定，解方程则反过来由真值锁定变量。这条链条是后续所有代数章节的底层骨架。


### 0.6.2　等式的性质

````ad-thm
title: 定理（等式的性质） | Theorem（Properties of Equality）

1. **加减法不变性：** $a = b \implies a + c = b + c$
2. **乘除法不变性：** 若 $c \neq 0$，则 $a = b \iff ac = bc$
````

````ad-proof
title: 证明 | Proof

> 以下证明核心运用了 §0.5 中讲授的「逻辑等价的证明」策略，请读者对照阅读。

**加减法不变性（$a = b \implies a + c = b + c$）**

设 $P(x)$ 为命题 $(x + c = a + c)$。由莱布尼茨定律：
$$a = b \implies (P(a) \iff P(b))$$
即 $a = b$ 蕴含了 $P(a)$ 与 $P(b)$ **逻辑等价**，这正是 §0.5 中所讲的 $P \iff Q$ 结构。

根据 §0.5 的定理：$P \iff Q$ 意味着 $(P \to Q) \land (Q \to P)$，即等价可拆分为两个方向的蕴含。这里我们只需要其中一个方向，从 $P(a)$ 推出 $P(b)$：
$$P(a) \implies P(b)$$

而 $P(a) = (a + c = a + c)$，由等式的反身性恒真（$= \mathbb{T}$）。既然 $P(a)$ 为真且 $P(a) \implies P(b)$，则 $P(b)$ 亦为真。而 $P(b) = (b + c = a + c)$，即：
$$a + c = b + c$$
加减法不变性得证。

**乘除法不变性（$a = b \iff ac = bc$，$c \neq 0$）**

这个定理的形式是**双向的**（$\iff$），对应 §0.5 的核心方法，将等价拆为**充分性**和**必要性**两部分分别证明。

**充分性（$a = b \implies ac = bc$）：**
设 $P(x)$ 为命题 $(xc = ac)$。由莱布尼茨定律：
$$a = b \implies (P(a) \iff P(b))$$
即 $a = b \implies ((ac = ac) \iff (bc = ac))$。同样提取 $\implies$ 方向（$P(a) \implies P(b)$），而 $P(a) = (ac = ac)$ 由反身性恒真，故 $P(b) = (bc = ac)$ 亦真，即 $ac = bc$。充分性得证。

**必要性（$ac = bc \implies a = b$，$c \neq 0$）：**
假设 $ac = bc$ 且 $c \neq 0$。由充分性已证的结论 $ac = bc$（此处恰好成立），两端除以 $c$（因 $c \neq 0$）即得 $a = b$。

两个方向均已证毕，根据 §0.5 的拆分原理，乘除法不变性的双条件语句（$a = b \iff ac = bc$）得证。
````

````ad-example
title: 示例 | Example


运用等式的性质解以下方程：

1. 解 $P(x) = (x - 5 = 3)$
2. 解 $P(x) = (3x = 12)$

---

1. 设 $P(x) = (x - 5 = 3)$。由加减法不变性，等式两端加 $5$：
  $$(x - 5) + 5 = 3 + 5 \implies x = 8$$
  将 $x=8$ 代回：$P(8) = (8-5=3) = \mathbb{T}$，故解为 $x = 8$。

2. 设 $P(x) = (3x = 12)$。由乘除法不变性（$c = 1/3 \neq 0$），两端除以 $3$：
  $$x = 4$$
  代回验证：$P(4) = (3 \times 4 = 12) = \mathbb{T}$，故解为 $x = 4$。

这两个例子展示了等式性质在**解方程**中的核心应用：通过在等式两端同步操作，我们可以逐步「剥离」变量周围的运算，最终求出变量的值。
````

### 0.6.3　简易代数运算

- 代数式中的四则运算同样遵循交换律、结合律、分配律。

````ad-def
title: 定义（代入法） | Definition（Substitution）

将具体数值或代数式替换公式中对应的变量，从而计算结果的过程。本质上是将开放命题中的变量赋予特定对象。
````

>本质上，代入法就是对莱布尼茨法则在代数下的应用。我们将在**第六章往后**的课题正式使用“代入法” 取代 “莱布尼茨法则” 表示取代变量的过程。

````ad-example
title: 示例 | Example


运用代入法计算以下公式中未知数的值：

1. 已知 $y = 2x + 1$，求 $x=3$ 时的 $y$
2. 已知 $d = vt$，当 $v = 60 \text{ km/h}$、$t = 2 \text{ h}$ 时，求 $d$

---

1. 将 $x = 3$ 代入公式 $y = 2x + 1$：$y = 2(3) + 1 = 6 + 1 = 7$。代入法的本质就是将变量替换为具体数值，然后按四则运算规则计算结果。
2. 将 $v = 60$、$t = 2$ 代入 $d = vt$：$d = 60 \times 2 = 120 \text{ km}$。注意单位也随数字一起「代入」，$v$ 的单位 $\text{km/h}$ 乘 $t$ 的单位 $\text{h}$，得到 $d$ 的单位 $\text{km}$。
````

---

## 0.7　物理量与单位表示（Physical Quantities and Units）

> **本节难度上限**：T C+ ｜ C C ｜ E C ｜ Q C+

````ad-def
title: 定义（物理量） | Definition（Physical Quantity）

由数值和单位共同组成（如 $5 \text{ m}$（5 米）、$20 \text{ kg}$（20 千克））。
````

- 不同单位的量不能直接加减（如 $3 \text{ kg} + 5 \text{ cm}$ 无意义）。
- 运算时单位也需参与：速度（$\text{m/s}$）$\times$ 时间（$\text{s}$）$=$ 路程（$\text{m}$）。

````ad-example
title: 示例 | Example


进行单位换算和物理量计算：

1. 将 $1.5 \text{ m}$ 换算为 $\text{cm}$
2. 以 $v = 5 \text{ m/s}$ 的速度跑了 $t = 10 \text{ s}$，求路程 $d$

---

1. $1 \text{ m} = 100 \text{ cm}$，故 $1.5 \text{ m} = 1.5 \times 100 \text{ cm} = 150 \text{ cm}$。换算的本质是将原单位替换为等价的新单位，数值随之缩放。
2. 由物理公式 $d = vt$，代入得 $d = 5 \text{ m/s} \times 10 \text{ s} = 50 \text{ m}$。注意，这里的单位 $\text{m/s}$ 和 $\text{s}$ 也可以像数字一样参与运算，$\text{m/s} \times \text{s} = \text{m}$。这是物理量计算的一个重要特点：**单位也要参与运算**。
````

下表列出常用单位之间的换算关系，供后续计算查阅：

| 类别 | 单位换算 |
|------|----------|
| **长度** | $1 \text{ km} = 1000 \text{ m}$；$1 \text{ m} = 100 \text{ cm} = 1000 \text{ mm}$ |
| **时间** | $1 \text{ h} = 60 \text{ min} = 3600 \text{ s}$；$1 \text{ min} = 60 \text{ s}$ |
| **质量** | $1 \text{ kg} = 1000 \text{ g}$；$1 \text{ t} = 1000 \text{ kg}$ |
| **面积** | $1 \text{ m}^2 = 10000 \text{ cm}^2$；$1 \text{ km}^2 = 10^6 \text{ m}^2$ |


---
## 章末总结

### 一、本章学习的核心概念

| 类别        | 内容                                                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **逻辑基础**  | 对象（Object）与命题（Proposition）的区分；开放命题 $P(x)$；真值 $\mathbb{T}/\mathbb{F}$                                                              |
| **逻辑运算**  | 否定 $\neg$、合取 $\land$、析取 $\lor$、条件句 $\to$、双条件 $\leftrightarrow$                                                                    |
| **逻辑关系**  | 逻辑蕴含 $P \implies Q$（$P$ 真时 $Q$ 必真）；逻辑等价 $P \iff Q$（两者真假一致）                                                                        |
| **量词**    | 全称量词 $\forall$（对所有的…）、存在量词 $\exists$（存在某个…）                                                                                       |
| **公理**    | 等式公理（反身性、对称性、传递性）；莱布尼茨定律 $(x=y) \implies (P(x) \iff P(y))$                                                                        |
| **定理与证明** | 假言三段论 $(X \to Y) \land (Y \to Z) \implies (X \to Z)$；证明是逻辑链条；反证法（假设 $\neg Q$ 推出矛盾则 $Q$ 真）；逆否命题法（$P \to Q \iff \neg Q \to \neg P$） |
| **自然数**   | 加法/乘法公理（交换律、结合律、分配律、单位元）；减号定义                                                                                                     |
| **整除与因数** | 整除记号 $p \mid n$；因数、公因数、最大公因数（H.C.F.）；倍数、公倍数、最小公倍数（L.C.M.）                                                                         |
| **乘方**    | $a^n$ 标记法；$a^m \times a^n = a^{m+n}$；$n^0 = 1$（$n \neq 0$）                                                                        |
| **四则运算**  | 优先级：先乘除后加减，有括号先算括号内                                                                                                               |
| **代数基础**  | 变量 $\leftrightarrow$ 对象；代数式 $\leftrightarrow$ 对象；等式 $\leftrightarrow$ 命题；方程 $\leftrightarrow$ 开放命题                                |
| **等式性质**  | 加减法不变性（$a=b \implies a+c=b+c$）；乘除法不变性（$a=b \iff ac=bc,\ c \neq 0$）                                                                |
| **代入法**   | 莱布尼茨定律在代数中的应用；将变量替换为具体值                                                                                                           |
| **物理量**   | 数值 + 单位；不同单位不可直接加减                                                                                                                |

### 二、核心技巧

1. **区分对象与命题**：代数式（如 $3x+5$）不含真假，等式（如 $3x+5=11$）才是命题。这是全章的根本能力。
2. **真值表穷举法**：处理逻辑命题的终极工具。列尽所有变量组合，逐行检验。
3. **判定逻辑蕴含**：要判断 $P \implies Q$，只需检查「$P$ 真且 $Q$ 假」是否可能发生；若不可能，则蕴含成立。
4. **写证明的基本流程**：前提 $\to$ 第 1 步依据 $\to$ 第 2 步依据 $\to \cdots \to$ 结论。每一步必须有公理或已证定理作为依据。
5. **短除法求 H.C.F. / L.C.M.**：将两数列在一侧，逐层提取公因数，直到两数互质。
6. **反证法（Proof by Contradiction）**：假设结论的否定成立，推导出矛盾（如 $a = b$ 且 $a \neq b$），从而推翻假设，证明原结论为真。
7. **逆否命题法（Contrapositive）**：将 $P \to Q$ 等价替换为 $\neg Q \to \neg P$ 再证明。先对结论取否定作为新前提，正向推导出前提的否定即可。

### 三、注意事项

- **「$=$」只能作用于对象**，不能作用于命题。命题的「相等」用 $\iff$（逻辑等价）。
- **条件句 $\to$ 最容易混淆**：前提为假时条件句恒真。例如「若我是鸟，则我会飞」，因为我本非鸟，故该条件句为真。
- **反例是推翻全称命题的最有力武器**：$\forall x, P(x)$ 只需一个不满足的 $x$ 即可证伪。
- **公理不用证明**，它们是数学推理的「游戏规则」；定理必须从公理出发证明。
- **逆否命题 $\neg Q \to \neg P$ 与原命题 $P \to Q$ 等价**，但不要与逆命题 $Q \to P$ 混淆，逆命题一般不等价于原命题。
- **物理量运算时单位也要参与**：$3 \text{ kg} + 5 \text{ cm}$ 无意义；单位换算要先做。

---

## 中英对照词汇表（Glossary）

| 中文       | English                        |
| -------- | ------------------------------ |
| 定义       | Definition                     |
| 对象       | Object                         |
| 公理       | Axiom                          |
| 定理       | Theorem                        |
| 推论       | Corollary                      |
| 引理       | Lemma                          |
| 证明       | Proof                          |
| 命题       | Proposition                    |
| 开放命题     | Open Proposition               |
| 真值       | Truth Value                    |
| 变量       | Variable                       |
| 等式       | Equality                       |
| 否定       | Negation                       |
| 合取       | Conjunction                    |
| 析取       | Disjunction                    |
| 条件句      | Conditional                    |
| 双条件      | Biconditional                  |
| 逻辑蕴含     | Logical Implication            |
| 逻辑等价     | Logical Equivalence            |
| 全称量词     | Universal Quantifier           |
| 存在量词     | Existential Quantifier         |
| 反身性      | Reflexivity                    |
| 对称性      | Symmetry                       |
| 传递性      | Transitivity                   |
| 莱布尼茨定律   | Leibniz's Law                  |
| 同一者不可分原理 | Identity of Indiscernibles     |
| 假言三段论    | Hypothetical Syllogism         |
| 反证法      | Proof by Contradiction         |
| 矛盾       | Contradiction                  |
| 逆否命题     | Contrapositive                 |
| 自然数      | Natural Number                 |
| 算式       | Arithmetic Expression          |
| 加法       | Addition                       |
| 减法       | Subtraction                    |
| 乘法       | Multiplication                 |
| 除法       | Division                       |
| 乘方 / 指数  | Exponentiation                 |
| 交换律      | Commutative Law                |
| 结合律      | Associative Law                |
| 分配律      | Distributive Law               |
| 单位元      | Identity Element               |
| 整除       | Divisibility                   |
| 因数       | Factor                         |
| 公因数      | Common Factor                  |
| 最大公因数    | Highest Common Factor (H.C.F.) |
| 倍数       | Multiple                       |
| 公倍数      | Common Multiple                |
| 最小公倍数    | Least Common Multiple (L.C.M.) |
| 四则运算     | Four Arithmetic Operations     |
| 代数式      | Algebraic Expression           |
| 方程       | Equation                       |
| 代入法      | Substitution                   |
| 物理量      | Physical Quantity              |
| 单位       | Unit                           |
