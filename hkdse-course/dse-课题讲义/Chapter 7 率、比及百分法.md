---
tags: DSE课程笔记
---

# 7　率、比及百分法（Rates, Ratios and Percentages）

> 本章处理五个核心主题：百分法的基本概念与商业应用（含盈利/亏损百分率计算）、单位换算与量纲分析、比的运算与连比、比例（含性质、正反比例与混合比例应用）、以及率：当比的双方来自不同量纲时，比值即成为带有复合单位的率（速率、增长率）。

前置：[[Chapter 5 解方程方法(I)|解方程方法(I)]]、[[Chapter 6 代数式|代数式]]


---

## 7.1　百分法（Percentages）

> **本节难度上限**：T C+ ｜ C D+ ｜ E C ｜ Q C

> 百分法是将数值以「百分之几」的方式表示的计算系统。我们日常生活中接触的折扣、利率、通胀、统计数据等无不以百分数呈现。

### 7.1.1　百分比

````ad-def
title: 定义（百分比） | Definition（Percentage）

分母为 $100$ 的分数的另一种记法。记作
$$x\% \equiv \frac{x}{100}$$
````

换言之，$\%$ 符号的意义是「除以 $100$」：$1\% = \dfrac{1}{100} = 0.01$，$100\% = 1$，$200\% = 2$。

**方法（Method，百分数、分数与小数的换算 / Conversion Between Percentages, Fractions, and Decimals）**

1. **百分数 $\to$ 小数：** $p\% = \dfrac{p}{100}$，直接除以 $100$（小数点左移两位）。
2. **小数 $\to$ 百分数：** 乘以 $100\%$（小数点右移两位后加上 $\%$ 符号）。
3. **分数 $\to$ 百分数：** 先化为小数，再乘以 $100\%$；或直接 $\dfrac{a}{b} = \left(\dfrac{a}{b} \times 100\right)\%$。

*   **核心思想：** 百分数、小数、分数是同一数量的三种不同写法。换算的本质是「乘以 $1$ 的变形」：乘以 $100\%$（$=1$）或除以 $100$（不影响数量大小，只改变表示形式）。

````ad-example
title: 示例（小数转百分数） | Example（小数转百分数）


将 $0.375$ 化为百分数：

---
$$0.375 = 0.375 \times 100\% = 37.5\%$$
````

````ad-example
title: 示例（分数转百分数） | Example（Fraction to Percentage）


将 $\dfrac{3}{8}$ 化为百分数：

---
$$\frac{3}{8} = \left(\frac{3}{8} \times 100\right)\% = (0.375 \times 100)\% = 37.5\%$$
````

---

### 7.1.2　百分变化（Percentage Change）

> 百分变化描述一个数值相对于原值的增减幅度，是衡量变化最直观的方法。

````ad-def
title: 定义（百分变化） | Definition（Percentage Change）

设原值为 $V_0$，新值为 $V_1$，则
$$\text{百分变化} = \frac{V_1 - V_0}{V_0} \times 100\%$$

*   若结果为正，表示**增加**（Increase）。
*   若结果为负，表示**减少**（Decrease）。
````

这个定义将「绝对变化」$(V_1 - V_0)$ 除以「原值」$V_0$，使不同量级的变化可以横向比较。例如 $100$ 增加到 $110$ 与 $1000$ 增加到 $1010$ 的绝对增加都是 $10$，但前者增加 $10\%$，后者仅增加 $1\%$。

````ad-thm
title: 定理（新值与原值的关系） | Theorem（Relationship Between New and Original Values）

设百分变化为 $r\%$（$r>0$ 表增加，$r<0$ 表减少），则
$$V_1 = V_0 \times \left(1 + \frac{r}{100}\right)$$
````

````ad-proof
title: 证明 | Proof

由定义 $r\% = \dfrac{V_1 - V_0}{V_0} \times 100\%$，即 $\dfrac{r}{100} = \dfrac{V_1 - V_0}{V_0}$。

两边同乘 $V_0$ 得 $\dfrac{r}{100} V_0 = V_1 - V_0$，移项即得
$$V_1 = V_0 + \frac{r}{100}V_0 = V_0\left(1 + \frac{r}{100}\right)$$
````

此定理提供了从原值和百分变化直接求新值的快捷公式。括号中的 $1$ 代表原值本身，$\dfrac{r}{100}$ 代表变化部分。

````ad-example
title: 示例（百分增加） | Example（百分增加）


某商品原价 $\$200$，加价 $15\%$。求新售价：

---
$$V_1 = 200 \times \left(1 + \frac{15}{100}\right) = 200 \times 1.15 = \$230$$
````

````ad-example
title: 示例（百分减少） | Example（百分减少）


某商品原价 $\$200$，八折出售。求售价：

---
$20\%$ 折扣即 $r = -20$。
$$V_1 = 200 \times \left(1 + \frac{-20}{100}\right) = 200 \times 0.8 = \$160$$
````

````ad-example
title: 示例（连续百分变化） | Example（Successive Percentage Change）


某城市人口第一年增加 $10\%$，第二年减少 $10\%$。若原有人口 $P$，求两年后人口。

---

第一年末：$P_1 = P(1 + 0.1) = 1.1P$。

第二年末：$P_2 = 1.1P(1 - 0.1) = 1.1P \times 0.9 = 0.99P$。

> 最终人口为原人口的 $99\%$，即**净减少 $1\%$**。注意：先加 $10\%$ 再减 $10\%$ 并非回到原值，因为减少 $10\%$ 的基数已经是 $1.1P$，扣除的绝对值更大。连续百分变化**不可直接加减百分率**（$+10\% - 10\% \neq 0\%$）。
````

---

### 7.1.3　百分法的应用（Applications of Percentages）

> 百分法在商业中最基本的应用是成本、售价与盈利的关系。掌握这些概念不仅有助于日常财务决策，也是学习利息与增长率的基础。

#### 7.1.3.1　成本、售价与盈利

````ad-def
title: 定义（成本、售价与盈利 / Cost, Selling Price, and Profit） | Definition（成本、售价与盈利 / Cost, Selling Price, and Profit）


*   **成本**（Cost，$C$）：购入该商品所花费的金额。
*   **售价**（Selling Price，$S$）：出售该商品所收取的金额。
*   **盈利/亏损**（Profit / Loss，$P$）：$P = S - C$。
   *   若 $P > 0$，则为**盈利**（Profit）。
   *   若 $P < 0$，则为**亏损**（Loss）。
````

````ad-example
title: 示例 | Example


某商品成本 $\$80$，以 $\$120$ 售出，则盈利为：

---
$$P = 120 - 80 = \$40$$
````

#### 7.1.3.2　盈利百分率与亏损百分率

> 盈利/亏损的绝对数值并不能直接反映「赚了多少」，因为 $\$10$ 的盈利对 $\$50$ 成本的商品与对 $\$500$ 成本的商品来说，含义完全不同。因此通常以盈利占成本的百分比来衡量。

````ad-def
title: 定义（盈利百分率与亏损百分率） | Definition（Profit and Loss Percentage）

一般情况下，盈利／亏损百分率以**成本**为基准：
$$\text{盈利百分率} = \frac{\text{盈利}}{\text{成本}} \times 100\% = \frac{S - C}{C} \times 100\%$$
$$\text{亏损百分率} = \frac{\text{亏损}}{\text{成本}} \times 100\% = \frac{C - S}{C} \times 100\%$$

> **Remark:** 除非题目明确指明「利润率基于售价」，否则一律以成本为基准。
````

````ad-cor
title: 推论（售价公式） | Corollary（Selling Price Formula）

设盈利百分率为 $r\%$（亏损时 $r$ 取负值），则
$$S = C \times \left(1 + \frac{r}{100}\right)$$

即：$S = C \times (1 + \text{盈利}\%)$ 或 $S = C \times (1 - \text{亏损}\%)$。
````

这与百分变化的新值公式 $V_1 = V_0(1 + r/100)$ 一致，其中 $V_0 = C$，$V_1 = S$，即盈利百分率本质上就是以成本为基准的百分变化。

````ad-example
title: 示例（求盈利百分率） | Example（求盈利百分率）


成本 $\$150$，售价 $\$180$。求盈利百分率：

---
$$\text{盈利百分率} = \frac{180 - 150}{150} \times 100\% = \frac{30}{150} \times 100\% = 20\%$$
````

````ad-example
title: 示例（由盈利百分率求售价） | Example（由盈利百分率求售价）


成本 $\$200$，盈利 $25\%$。求售价：

---
$$S = 200 \times \left(1 + \frac{25}{100}\right) = 200 \times 1.25 = \$250$$
````

````ad-example
title: 示例（已知售价与盈利率，反求成本） | Example（已知售价与盈利率，反求成本）


一部手機以 $\$4500$ 出售，盈利 $20\%$。求成本。

---

设成本为 $C$，由 $S = C(1 + r/100)$：
$$4500 = C \times 1.2 \implies C = \frac{4500}{1.2} = \$3750$$

> **Remark:** 反求成本时，常见错误是用 $C = S \times (1 - r\%)$。例如本题若误写 $C = 4500 \times 0.8 = 3600$，就会出错。因为「售价的 $80\%$」不等于「成本的 $120\%$」的逆运算，基数不同。
````

````ad-example
title: 示例（标价→折扣→售价→盈利综合题） | Example（标价→折扣→售价→盈利综合题）


某書店一本書標價 $\$120$，打七五折出售。若成本為 $\$80$，求：
1. 售價；2. 盈利百分率。

---

1. 售價 $= 120 \times 0.75 = \$90$。

2. 盈利 $= 90 - 80 = \$10$。

$$\text{盈利百分率} = \frac{10}{80} \times 100\% = 12.5\%$$

> 此題涉及三個層次：折扣 → 售價 → 盈利。DSE 考試中常以 « 標價 → 折扣 → 售價 → 盈利 » 的鏈式結構出現，需逐一處理。注意盈利百分率的分母始終是**成本**而非標價或售價。
````

---
## 7.2　单位的运算（Operations with Units）

> **本节难度上限**：T C ｜ C D+ ｜ E C ｜ Q C

> 单位是物理量的标尺。熟练掌握单位换算是解决实际应用问题的基本能力，它确保不同来源的数据可以统一后在同一个框架内进行比较和运算。

### 7.2.1　常用单位的回顾（Review of Common Units）

常用的基本量及其单位：

| 量（Quantity） | 单位（Unit）        | 换算关系                                                           |
| ----------- | --------------- | -------------------------------------------------------------- |
| 长度（Length）  | 米 m，千米 km，厘米 cm | $1\,\text{km} = 1000\,\text{m}$，$1\,\text{m} = 100\,\text{cm}$ |
| 时间（Time）    | 秒 s，小时 h，分 min  | $1\,\text{h} = 60\,\text{min} = 3600\,\text{s}$                |
| 质量（Mass）    | 千克 kg，克 g       | $1\,\text{kg} = 1000\,\text{g}$                                |
| 容量（Volume）  | 升 L，毫升 mL       | $1\,\text{L} = 1000\,\text{mL}$                                |

---

### 7.2.2　量纲（Dimensions）

#### 7.2.2.1　概念

````ad-def
title: 定义（量纲与单位） | Definition（Dimension and Unit）


*   **量纲**（Dimension）：物理量的本质类别，如长度 $L$、时间 $T$、质量 $M$。
*   **单位**（Unit）：量度该物理量所使用的标准，如米（m）、秒（s）、千克（kg）。

同一量纲可以有多种单位，但不同量纲的物理量不可直接比较或相加。
````

例如，「$3$ 米 $+ 2$ 秒」是无意义的：长度和时间属于不同量纲。但「$3$ 米 $+ 200$ 厘米」是可以的，因为它们同属长度量纲，只需统一单位后即可相加。

#### 7.2.2.2　带量纲的数之间的运算

**方法（Method，量纲分析 / Dimensional Analysis）**

将单位视为**代数符号**，同一量纲的不同单位之间存在已知的等式关系。例如：

*   $\text{km} = 1000\,\text{m}$（因为 $1\,\text{km} = 1000\,\text{m}$）
*   $\text{h} = 3600\,\text{s}$（因为 $1\,\text{h} = 3600\,\text{s}$）
*   $\text{kg} = 1000\,\text{g}$（因为 $1\,\text{kg} = 1000\,\text{g}$）

````ad-axi
title: 公理（量纲的代数性质） | Axiom（Algebraic Nature of Dimensions）

量纲符号仅参与**乘法**与**除法**运算，遵循交换律与结合律。同一量纲的不同单位之间由给定的等式关系连接，这些关系可视作代数恒等式，可直接代入表达式进行替换。
````

量纲符号之间不可进行加减，因为不同量纲的加法没有意义（如「$3\,\text{m} + 2\,\text{s}$」不合法）。

**换算步骤：**

1. 写出原量的代数形式（将复合单位展开为量纲符号的乘除，如 $\text{km/h} = \dfrac{\text{km}}{\text{h}}$）。
2. 利用已知的等式关系（如 $\text{km} = 1000\,\text{m}$，$\text{h} = 3600\,\text{s}$），逐一替换掉原单位符号。
3. 简化数值系数，合并同类量纲符号。

*   **核心思想：** 量纲符号像代数中的变量，不同单位之间由等式关系连接。代入这些等式即完成换算。
*   **步骤说明：** 第一步将原量拆成代数乘积形式（量纲符号之间的乘除）；第二步代数代入；第三步纯数值化简。

````ad-example
title: 示例（速率换算：代数代入法） | Example（速率换算：代数代入法）


将 $72\,\text{km/h}$ 换算为 $\text{m/s}$。

---

写出代数形式：$\displaystyle 72\,\frac{\text{km}}{\text{h}}$。

利用等式关系 $\text{km} = 1000\,\text{m}$，$\text{h} = 3600\,\text{s}$，逐一代入：
$$
\begin{aligned}
72\,\frac{\text{km}}{\text{h}}
 &= 72 \times \frac{1000\,\text{m}}{3600\,\text{s}} \\[4pt]
 &= 72 \times \frac{1000}{3600}\,\frac{\text{m}}{\text{s}} \\[4pt]
 &= 20\,\text{m/s}
\end{aligned}
$$
````

````ad-example
title: 示例（密度换算：代数代入法） | Example（密度换算：代数代入法）


将 $1\,\text{g/cm}^3$ 换算为 $\text{kg/m}^3$。

---

写出代数形式：$\displaystyle 1\,\frac{\text{g}}{\text{cm}^3}$。

等式关系：$\text{g} = \dfrac{1}{1000}\,\text{kg}$，$\text{cm} = \dfrac{1}{100}\,\text{m}$。代入：
$$
\begin{aligned}
1\,\frac{\text{g}}{\text{cm}^3}
 &= 1 \times \frac{\frac{1}{1000}\,\text{kg}}{\left(\frac{1}{100}\,\text{m}\right)^3} \\[4pt]
 &= 1 \times \frac{\frac{1}{1000}}{\frac{1}{1{,}000{,}000}}\,\frac{\text{kg}}{\text{m}^3} \\[4pt]
 &= 1 \times 1000\,\frac{\text{kg}}{\text{m}^3} \\[4pt]
 &= 1000\,\text{kg/m}^3
\end{aligned}
$$
````

> **备选方法：换算因子法（Conversion Factor Method）**
>
> 上述代数代入法与传统的「换算因子」法等价。换算因子法的思路为：将一个等式关系（如 $1\,\text{km} = 1000\,\text{m}$）写成分数形式 $\dfrac{1000\,\text{m}}{1\,\text{km}} =1$ 乘到原量上即可。例如：
> $$72\,\frac{\text{km}}{\text{h}}= \frac{72\,\text{km}}{1\,\text{h}} \times \frac{1000\,\text{m}}{1\,\text{km}} \times \frac{1\,\text{h}}{3600\,\text{s}}= 20\,\text{m/s}$$
>
>  两种方法的本质相同：代数代入法将等式关系直接代入替换，换算因子法将等式关系构造成值为 $1$ 的分数再相乘。
> 
> > 推荐优先掌握代数代入法（更接近直觉），换算因子法作为备选验证手段。

---
## 7.3　比与比例（Ratios and Proportions）

> **本节难度上限**：T C ｜ C D ｜ E C ｜ Q B-

> 比和比例是数学中比较相对大小的基本工具。从烹饪的配比到地图的比例尺，从化学的摩尔比到金融的杠杆比率，比无处不在。掌握了「同类量之比」后，下一节将推广至「异类量之比」，即率。

### 7.3.1　基本概念（Basic Concepts）

````ad-def
title: 定义（比） | Definition（Ratio）

比较两个**同类**（单位相同）的量的相对大小。记作 $a : b$，其定义为
$$a : b = \frac{a}{b}$$
其中 $a$ 称为**前项**（Antecedent），$b$ 称为**后项**（Consequent），且 $b \neq 0$。

> **Remark:** 比的结果**没有单位**（因相同单位在相除时约去）。
````

````ad-def
title: 定义（比例） | Definition（Proportion）

表示两个比相等的等式：
$$a : b = c : d \quad \iff \quad \frac{a}{b} = \frac{c}{d}$$
````

````ad-thm
title: 定理（比的基本性质） | Theorem（Fundamental Property of Ratios）

$$a : b = ka : kb \quad (k \neq 0)$$
即比的前项和后项同乘（或同除）一个非零常数，比值不变。
````

````ad-proof
title: 证明 | Proof

$\dfrac{ka}{kb} = \dfrac{a}{b}$，因 $k$ 在分子分母中约去。
````

此性质意味着一个比可以有无穷多种写法，我们通常将其化简为最简整数比。

````ad-example
title: 示例（化简比） | Example（化简比）


化 $24 : 36$ 为最简比：

---
$$24 : 36 = \frac{24}{12} : \frac{36}{12} = 2 : 3$$
````

````ad-example
title: 示例（分数的比） | Example（分数的比）


化 $\dfrac{2}{3} : \dfrac{5}{6}$ 为最简整数比：

---
同乘分母的 LCM $=6$：
$$\frac{2}{3} : \frac{5}{6} = \left(\frac{2}{3} \times 6\right) : \left(\frac{5}{6} \times 6\right) = 4 : 5$$
````

````ad-def
title: 定义（连比） | Definition（Continued Ratio）

三个或以上量的比称为**连比**，记作 $a : b : c$。其含义为同时陈述两个比：
$$a:b \quad \text{及} \quad b:c$$
换言之，连比 $a:b:c$ 是将两个共享中间项 $b$ 的比合并为一个简洁记法。
````

````ad-thm
title: 定理（连比的基本性质） | Theorem（Fundamental Property of  Continued Ratios）

$$a : b : c = ka : kb : kc \quad (k \neq 0)$$
即连比的各个项同乘（或同除）一个非零常数，比值不变。
````

````ad-proof
title: 证明 | Proof

连比 $a:b:c$ 同时陈述 $a:b$ 与 $b:c$。由比的基本性质 $a:b = ka:kb$（$k \neq 0$），$a:b$ 的各项同乘 $k$ 后比值不变；同理 $b:c$ 的各项同乘 $k$ 后比值也不变。故连比 $a:b:c$ 的各项同乘 $k$ 后仍等于原连比：$a:b:c = ka:kb:kc$。
````

````ad-def
title: 定义（连比例） | Definition（Proportion）

表示两个连比相等的等式：
$$a : b :c = d : e : f \quad \iff \quad a:b = d:e \quad及 \quad b:c = e:f$$
````

````ad-example
title: 示例（连比例） | Example（连比例）


判断下列是否为连比例：

---
1. $2:3:4 = 4:6:8$：由连比基本性质，$2:3:4$ 各项同乘 $2$ 即得 $4:6:8$，故**是连比例**（两个连比本质相同，只是用不同系数表示）。

2. $1:2:3 = 2:4:9$：逐项比较 $1:2 \neq 2:4$（第一对不等），故**不是连比例**。

> 连比例的判定只需看前项 $a:b$ 与 $d:e$ 是否成比例即可，后项 $b:c = e:f$ 由连比基本性质自动成立。
````


### 7.3.2　两组比的合并方法（Method to Combine two Ratios）

>当两组比的中间项系数不同时，需要先统一中间项。关键是利用前文的定理：$a:b = ka:kb$（$k \neq 0$）。
>
>若已知 $a:b = p:q$ 且 $b:c = s:r$ 且 $q \ne s$，则通过该定理，可以透过选择常数 $k$ 乘在第二组比上：
>$$b:c = ks : kr$$
> 选择一个特殊的 $k$ 使得 $ks = q$，解该方程可以得到 $k = \dfrac{q}{s}$，故此时我们便使后者 $b$ 的项系数等于前者 $b$ 的项系数。由此可得如下方法：

**方法（Method，求连比 / Finding Continued Ratios）**

设 $a:b = p:q$，$b:c = s:r$（其中 $q \neq s$）。利用比的基本性质缩放两组比，使中间项 $b$ 对齐：

1. 对 $a:b = p:q$ 同乘 $s$：$a:b = ps : qs$。
2. 对 $b:c = s:r$ 同乘 $q$：$b:c = qs : qr$。
3. 此时 $b$ 在两组比中均为 $qs$，合并得连比：
   $$a:b:c = ps : qs : qr$$

*   **核心思想：** 两组比的中间项系数分别为 $q$ 与 $s$，对齐的关键是使它们相等。交叉相乘，即第一组比乘 $s$、第二组比乘 $q$，保证了中间项均变为 $qs$。这等价于令 $k = q/s$ 代入第二组比。
*   **步骤说明：** 第一步与第二步是比的基本性质 $a:b = ka:kb$ 的直接应用，缩放操作不改变原比值；第三步将已对齐的两个比拼接为连比。

````ad-example
title: 示例（求连比） | Example（求连比）


若 $a:b = 2:3$ 且 $b:c = 4:5$，求 $a:b:c$。

---

**解法 I（交叉相乘）：** $p=2$，$q=3$，$s=4$，$r=5$。
$$a:b = 2 \times 4 : 3 \times 4 = 8 : 12$$
$$b:c = 4 \times 3 : 5 \times 3 = 12 : 15$$
$$\implies a:b:c = 8 : 12 : 15$$

**解法 II（分式视角）：** 由 $\dfrac{a}{b} = \dfrac{2}{3}$ 且 $\dfrac{b}{c} = \dfrac{4}{5}$，直接链乘：
$$\frac{a}{c} = \frac{a}{b} \cdot \frac{b}{c} = \frac{2}{3} \cdot \frac{4}{5} = \frac{8}{15}$$
故 $a:c = 8:15$，配合原比即得 $a:b:c = 8:12:15$。
````

````ad-example
title: 示例（三项连比应用题） | Example（三项连比应用题）


$A$、$B$、$C$ 三人投资金额比为 $3:4:5$，总利润 $\$6000$ 按投资比分，求 $A$ 所得：

---

**解法 I（份數法）：** 总份数 $= 3+4+5 = 12$。
$$A\text{ 所得} = \frac{3}{12} \times 6000 = \$1500$$

**解法 II（比例常数法）：** 由 $A:B = 3:4$ 与 $B:C = 4:5$，设 $A = 3k,\; B = 4k,\; C = 5k$。由 $A+B+C=6000$：
$$k(3+4+5) = 6000 \implies 12k = 6000 \implies k = 500$$
$$A = 3k = \$1500$$
````

---

## 7.4　比例常数

> **本节难度上限**：T C+ ｜ C C ｜ E C ｜ Q B-

````ad-thm
title: 定理（比例常数） | Theorem（Proportionality Constant）

若  $a,b,c,d$ 均为常数且 $b,d \ne 0$，则 $a:b = c:d \iff \exists k \ne 0$ 使得 $$a=kc \quad 及 \quad b=kd$$ 
> 我们将该 $k$ 称为比例常数。
````

````ad-proof
title: 证明 | Proof

($\Rightarrow$) 若 $a:b = c:d$（$b,d \neq 0$），即 $\dfrac{a}{b} = \dfrac{c}{d}$。设 $k = \dfrac{a}{c}$（由 $\dfrac{a}{b} = \dfrac{c}{d}$ 知 $a,c$ 必同时为零或同时非零；若同时为零则 $a:b=c:d$ 平凡成立；否则 $k = a/c = b/d \neq 0$），则 $a = kc$，$b = kd$。

($\Leftarrow$) 若存在 $k \neq 0$ 使 $a = kc$ 且 $b = kd$，则 $a:b = kc:kd$。由连比基本性质 $kc:kd = c:d$（同除 $k$），故 $a:b = c:d$。
````

换句话说，当 $x:y = a:b$ 时，可**设 $x = ak$、$y = bk$**，利用题目给出的额外条件（如总和、差值、乘积等）解出 $k$，再回代求各项。

该定理把比的关系转化为一次方程，适用于正比例、混合比例等更广泛的情境。

````ad-example
title: 示例（比例常数法） | Example（比例常数法）


若 $x:y = 3:5$ 且 $x + y = 40$，求 $x$ 與 $y$。

---
設 $x = 3k,\; y = 5k$。由 $x + y = 40$：
$$3k + 5k = 40 \implies 8k = 40 \implies k = 5$$

$x = 3 \times 5 = 15$，$y = 5 \times 5 = 25$。

> 若用交叉相乘：$5x = 3y$ 配合 $x+y=40$ 解二元一次方程组，亦可，但比例常数法只需解一个一元一次方程。
````

````ad-example
title: 示例（等比定理 + 比例常数法） | Example（等比定理 + 比例常数法）


$A,B,C$ 三人投资比为 $2:3:5$，总利润 $\$2000$。用等比定理求各人所得。

---
由 $A:B = 2:3$ 与 $B:C = 3:5$，设 $A = 2k,\; B = 3k,\; C = 5k$（$k$ 为比例常数）。等比定理即
$$(A+B+C):(2+3+5) = 2k:2 = k:1$$
由 $A+B+C = 2000$，得 $k(2+3+5) = 2000 \implies k = 200$。

$A = 2 \times 200 = 400$，$B = 3 \times 200 = 600$，$C = 5 \times 200 = 1000$。
````

---

### 7.4.1　比例的性质（Properties of Proportions）

> 比例 $a:b = c:d$ 不仅是两个比相等的陈述，它还可以派生出多种等价形式。

````ad-thm
title: 定理（更比定理） | Theorem（Alternendo）

若 $a:b = c:d$（$a,b,c,d \neq 0$），则
$$a:c = b:d$$
````

````ad-proof
title: 证明 | Proof

由 $a:b = c:d$ 即 $\dfrac{a}{b} = \dfrac{c}{d}$，两边同乘 $bd$ 得 $ad = bc$，再两边同除以 $cd$ 得 $\dfrac{a}{c} = \dfrac{b}{d}$，即 $a:c = b:d$。

几何意义：在比例 $a:b = c:d$ 中交换两个内项（或两个外项）的位置，等号仍成立。
````

````ad-thm
title: 定理（合比定理） | Theorem（Componendo）

若 $a:b = c:d$（$b,d \neq 0$），则
$$(a+b):b = (c+d):d$$
````

````ad-proof
title: 证明 | Proof

由 $a:b = c:d$ 即 $\dfrac{a}{b} = \dfrac{c}{d}$，两边各加 $1$：
$$\frac{a}{b} + 1 = \frac{c}{d} + 1 \implies \frac{a+b}{b} = \frac{c+d}{d}$$
即 $(a+b):b = (c+d):d$。
````

````ad-example
title: 示例（合比定理应用） | Example（合比定理应用）


若 $x:y = 3:4$ 且 $x+y = 35$，求 $x$ 与 $y$。

---
由合比定理：$(x+y):y = (3+4):4 = 7:4$。

代入 $x+y=35$：$35:y = 7:4 \implies y = 35 \times \dfrac{4}{7} = 20$。

$x = 35 - 20 = 15$。
````

````ad-thm
title: 定理（分比定理） | Theorem（Dividendo）

若 $a:b = c:d$（$b,d \neq 0$），则
$$(a-b):b = (c-d):d$$
````

````ad-proof
title: 证明 | Proof

由 $a:b = c:d$ 即 $\dfrac{a}{b} = \dfrac{c}{d}$，两边各减 $1$：
$$\frac{a}{b} - 1 = \frac{c}{d} - 1 \implies \frac{a-b}{b} = \frac{c-d}{d}$$
即 $(a-b):b = (c-d):d$。
````

````ad-thm
title: 定理（等比定理） | Theorem（等比定理）

若 $a_1:b_1 = a_2:b_2 = \cdots = a_n:b_n$（$b_i \neq 0$），则
$$(a_1 + a_2 + \cdots + a_n):(b_1 + b_2 + \cdots + b_n) = a_i:b_i$$
````

````ad-proof
title: 证明 | Proof

设公共比值为 $k$，即 $a_i:b_i = k$，则 $a_i = k b_i$（$i = 1,2,\dots,n$），故 $\displaystyle\sum a_i = k\sum b_i$，即 $(\sum a_i):(\sum b_i) = k = a_i:b_i$。
````

---

#### 7.4.1.1　正比例（Direct Proportion）

````ad-def
title: 定义（正比例） | Definition（Direct Proportion）

设 $x, y$ 为两个变量，$k \neq 0$ 为常数。若
$$\frac{y}{x} = k \quad \text{或} \quad y = kx$$
则称 $y$ 与 $x$ 成**正比例**，$k$ 称为**比例常数**（Constant of Proportionality）。

> **特征：**
> *   $x$ 增大 $n$ 倍，$y$ 亦增大 $n$ 倍。
> *   $y$ 对 $x$ 的图像为一条通过原点的直线。
````

当两项的比始终不变时，它们是成正比变化的。例如「总价 $=$ 单价 $\times$ 数量」中，若单价不变，总价与数量成正比例。

````ad-example
title: 示例（正比例） | Example（正比例）


若 $y \propto x$，且 $x = 4$ 时 $y = 12$。求

1. $y = kx$ 中的 $k$；

2. $x = 7$ 时的 $y$。

---
1. $y = kx$，代入 $x=4, y=12$：
$$12 = k \cdot 4 \implies k = 3$$
故 $y = 3x$。

2. $x=7$ 时：$y = 3 \times 7 = 21$。
````

````ad-example
title: 示例（正比例应用题） | Example（正比例应用题）


某地圖的比例尺為 $1:50{,}000$。若兩地在地圖上的距離為 $8\,\text{cm}$，求實際距離（以 km 表示）。

---

實際距離 $d$ 與地圖距離成正比，比例常數 $k = 50{,}000$：
$$d = 8 \times 50{,}000 = 400{,}000\,\text{cm}$$

換算為 km：
$$400{,}000\,\text{cm} = 400{,}000 \div 100{,}000 = 4\,\text{km}$$

> 地圖比例尺是正比例的經典應用：$y = kx$ 中 $k$ 即為比例尺的分母。注意單位一致性：cm 須先換算至 km。
````

````ad-example
title: 示例（相似图形的边长比与面积比） | Example（相似图形的边长比与面积比）


两个相似长方形的边长比为 $2:3$。若小长方形的面积为 $20\,\text{cm}^2$，求大长方形的面积。

---
相似图形中，面积比 $=$ 边长比的平方：
$$\frac{A_{\text{大}}}{A_{\text{小}}} = \left(\frac{3}{2}\right)^2 = \frac{9}{4}$$

$$A_{\text{大}} = 20 \times \frac{9}{4} = 45\,\text{cm}^2$$

> 注意面积与边长的关系不是正比例（$y = kx$），而是平方关系（$A \propto \ell^2$）。但 $\ell^2$ 与 $A$ 成正比例，理解「谁与谁成正比」是做这类题的关键。
````

#### 7.4.1.2　反比例（Inverse Proportion）

````ad-def
title: 定义（反比例） | Definition（Inverse Proportion）

设 $x, y$ 为两个变量，$k \neq 0$ 为常数。若
$$xy = k \quad \text{或} \quad y = \frac{k}{x}$$
则称 $y$ 与 $x$ 成**反比例**。

> **特征：**
> *   $x$ 增大 $n$ 倍，$y$ 减小至原来的 $\dfrac{1}{n}$。
> *   $y$ 对 $x$ 的图像为一条双曲线（$x, y > 0$ 时出现在第一象限）。
````

当两项的乘积始终不变时，它们是成反比变化的。例如总距离不变时，速度与时间成反比。

````ad-example
title: 示例（反比例：比例常数法） | Example（反比例：比例常数法）


若 $x \cdot y = 30$，且 $x = 2$ 时 $y = 15$。求

1. 验证比例常数；

2. $x = 6$ 时的 $y$。

---

1. 由 $x=2, y=15$，比例常数 $k = 2 \times 15 = 30$。

2. $x=6$ 时：$y = 30/6 = 5$。

> 反比例下两量的乘积为常数 $k$，故 $y$ 可写作 $y = k/x$，这里的 $k$ 同时承担 $x$ 与 $y$ 之间的「比例常数」角色。
````

````ad-example
title: 示例（反比例应用题：工程问题，比例常数法） | Example（反比例应用题：工程问题，比例常数法）


$6$ 个工人 $10$ 天可完成一项工程，若 $4$ 个工人，需几天完成？（假设效率相同）

---
设工人数为 $w$，天数为 $d$。总工作量 $W$（即比例常数）为 $w \cdot d$。当 $w = 6$、$d = 10$ 时 $W = 60$。

$w = 4$ 时：
$$4 \cdot d = 60 \implies d = 15 \text{ 天}$$

> 反比例下 $w$ 与 $d$ 的乘积固定为 $W$。这里的 $W$ 即为「比例常数」，它将 $w$ 与 $d$ 唯一绑定。
````

````ad-example
title: 示例（反比例应用题：固定距离问题，比例常数法） | Example（反比例应用题：固定距离问题，比例常数法）


行駛固定距離 $180\,\text{km}$，若速率為 $v\,\text{km/h}$，所需時間為 $t\,\text{h}$。

1. 寫出 $v$ 與 $t$ 的關係式。

2. 若速率由 $60\,\text{km/h}$ 增至 $90\,\text{km/h}$，時間節省了多少？

---

1. 固定距离 $D = v \cdot t = 180$。即 $v$ 與 $t$ 成反比例，比例常数 $k = 180$。

2. $v=60$ 時 $t = \dfrac{180}{60} = 3\,\text{h}$；
$v=90$ 時 $t = \dfrac{180}{90} = 2\,\text{h}$。
節省時間 $= 3 - 2 = 1\,\text{h}$。

> 反比例的核心判据是**乘积恒定**（$xy = k$）。这里的 $k = 180$ 即固定距离 $D$ 本身，它将 $v$ 与 $t$ 唯一绑定。
````

---

### 7.4.2　混合比例（Mixture Problems）

> 将两种（或以上）不同单价/成本的物品混合，所得混合物的单价由加权平均决定。这是比例在商业中最常见的应用之一。

**方法（Method，加权平均 / Weighted Average）**

设物品 1 的重量为 $w_1$，单价为 $p_1$；物品 2 的重量为 $w_2$，单价为 $p_2$。混合后的**平均单价**（即每单位重量成本）为：

$$\text{平均单价} = \frac{p_1 w_1 + p_2 w_2}{w_1 + w_2}$$

*   **核心思想：** 分子是「总成本」（各物品自身成本之和），分母是「总重量」。平均单价并非两个单价的简单算术平均（除非 $w_1 = w_2$），而是以重量为权的加权平均。
*   **三种基本题型：** 正向求平均成本；逆向已知平均成本求混合比例；逆向已知总重量与总成本求各自重量。

````ad-example
title: 示例（正向求平均成本） | Example（正向求平均成本）


将 $3\,\text{kg}$ 咖啡豆（$\$80/$kg）与 $2\,\text{kg}$ 咖啡豆（$\$120/$kg）混合。求混合后每 kg 成本。

---
$$\text{总成本} = 80 \times 3 + 120 \times 2 = 240 + 240 = \$480$$
$$\text{总重量} = 3 + 2 = 5\,\text{kg}$$
$$\text{平均单价} = \frac{480}{5} = \$96/ \text{kg}$$

> 注意 $\$96$ 并非 $80$ 与 $120$ 的算术平均 ($100$)，较便宜的咖啡豆佔了更多重量（$3\,\text{kg} > 2\,\text{kg}$），拉低了平均值。
````

````ad-example
title: 示例（逆向求混合量：方程组法） | Example（逆向求混合量：方程组法）


每 kg $\$60$ 的茶叶与每 kg $\$90$ 的茶叶混合，得 $10\,\text{kg}$ 混合物，总成本 $\$720$。求两种茶叶各用多少 kg。

---
设 $\$60/$kg 的茶叶为 $x\,\text{kg}$，$\$90/$kg 的茶叶为 $y\,\text{kg}$。

重量条件：$x + y = 10$。

成本条件：$60x + 90y = 720$。

化简成本式 $(\div 30)$：$2x + 3y = 24$。

解 $\begin{cases} x + y = 10 \\ 2x + 3y = 24 \end{cases}$：由一式 $y = 10 - x$，代入二式：
$$2x + 3(10-x) = 24 \implies 2x + 30 - 3x = 24 \implies -x = -6 \implies x = 6$$
$$y = 10 - 6 = 4$$

故 $\$60/$kg 的茶叶用 $6\,\text{kg}$，$\$90/$kg 的用 $4\,\text{kg}$。
````

````ad-example
title: 示例（逆向求混合比例：加权平均方程） | Example（逆向求混合比例：加权平均方程）


将单价 $\$50/$kg 与 $\$80/$kg 的糖果混合，欲使混合后单价为 $\$62/$kg。求两种糖果的重量比。

---
设 $\$50/$kg 糖果用 $x\,\text{kg}$，$\$80/$kg 糖果用 $y\,\text{kg}$。由加权平均公式：
$$\frac{50x + 80y}{x + y} = 62$$

为消除分母，两边同乘 $(x+y)$：
$$50x + 80y = 62(x + y)$$
$$50x + 80y = 62x + 62y$$
$$18y = 12x$$
$$\frac{x}{y} = \frac{18}{12} = \frac{3}{2}$$

故混合重量比为 $x:y = 3:2$（即较便宜的糖果用量更大，使平均价偏向 $\$50$）。
````

---

## 7.5　率（Rates）

> **本节难度上限**：T C+ ｜ C D+ ｜ E C ｜ Q C

> 上一节学习了比，即比较同类量、结果无单位。当我们将比的概念推广至**不同类**的量（即量纲不同的量），比值便获得了一个复合单位，这就是**率**。从「车速 $60\,\text{km/h}$」到「菜价 $\$12/$ 斤」，率无处不在。

### 7.5.1　现实意义（Real-World Meaning）

````ad-def
title: 定义（率） | Definition（率）

是比较两个**不同类**（单位不同）的量的比值。

> *   **特征：** 结果带有复合单位（如 $\text{km/h}$、$\text{元/kg}$、$\text{kg/m}^3$）。
> *   **与比的关系：** 率是比的自然推广：当比的双方来自同一量纲，结果为无单位的比；当比的双方来自不同量纲，结果为带复合单位的率。
````

关键区分在于「同类」还是「异类」：

*   男生与女生人数 → 同类量 → **比**（结果无单位，如 $3:2$）
*   距离与时间 → 异类量 → **率**（结果有单位，如 $60\,\text{km/h}$）
*   价格与重量 → 异类量 → **率**（结果有单位，如 $\$12/$ 斤）

````ad-example
title: 示例（区分比与率） | Example（区分比与率）


判断下列属于「比」还是「率」：
*   1. $120\,\text{km} : 2\,\text{h} \to \text{60 km/h}$ → **率**（距离与时间异类）
*   2. $15\,\text{男} : 10\,\text{女} \to 3:2$ → **比**（同一类量）
*   3. $500\,\text{g} : 2\,\text{L} \to 250\,\text{g/L}$ → **率**（质量与容量异类）
````

---

### 7.5.2　一些常见的率（Some Common Rates）

#### 7.5.2.1　速率（Speed）

````ad-def
title: 定义（平均速率） | Definition（Average Speed）

物体在总距离内的平均移动快慢：
$$\text{平均速率} = \frac{\text{总距离}}{\text{总时间}} \qquad \left(v = \frac{d}{t}\right)$$

> **Remark:** 平均速率 ≠ 速率的算术平均值。只有在各段时间相等时，两者才一致。
````

这是一个容易出错的点。举例说明：前半段路以 $60\,\text{km/h}$ 行驶，后半段路以 $40\,\text{km/h}$ 行驶，平均速率并非 $(60+40)/2 = 50\,\text{km/h}$，因为两段所用时间不同。

````ad-example
title: 示例（平均速率 ≠ 算术平均） | Example（平均速率 ≠ 算术平均）


小明骑单车：前 $2\,\text{km}$ 以 $20\,\text{km/h}$ 骑行，后 $2\,\text{km}$ 以 $10\,\text{km/h}$ 骑行。求全程平均速率。

---

前段用时：$\dfrac{2}{20} = 0.1\,\text{h}$；
后段用时：$\dfrac{2}{10} = 0.2\,\text{h}$。

$$\text{平均速率} = \frac{2+2}{0.1+0.2} = \frac{4}{0.3} \approx 13.3\,\text{km/h}$$

并非 $(20+10)/2 = 15\,\text{km/h}$。
````

````ad-example
title: 示例（來回程平均速率） | Example（來回程平均速率）


小明駕車從 $A$ 地到 $B$ 地，距離 $120\,\text{km}$。去程速率 $60\,\text{km/h}$，回程速率 $40\,\text{km/h}$。求全程平均速率。

---
去程用時：$\dfrac{120}{60} = 2\,\text{h}$；回程用時：$\dfrac{120}{40} = 3\,\text{h}$。

$$\text{平均速率} = \frac{120+120}{2+3} = \frac{240}{5} = 48\,\text{km/h}$$

> **关键观察：** (1) 来回距离相同但速率不同，用时必不等，速率慢的回程占了更多时间，因此全程平均速率偏向较慢的一方（$48$ 接近 $40$ 而非 $50$）。(2) 全程平均速率 $=48\,\text{km/h}$，**并非** $(60+40)/2 = 50\,\text{km/h}$，算术平均只在各段时间相等时才等于平均速率。
````

#### 7.5.2.2　增长率（Growth Rate）

````ad-def
title: 定义（增长率） | Definition（Growth Rate）

描述某量在单位时间内的增长幅度，通常以百分数表示，即 $\dfrac{\text{增长量}}{\text{原值}} \times 100\%$。本质上是百分变化在时间维度上的具体化。
````

增长率 = 百分变化 $+$ 时间限定。例如「人口年增长率 $2\%$」意为每年人口增加为现有数量的 $2\%$。

````ad-example
title: 示例 | Example


某城市年初人口 $500{,}000$，年末人口 $515{,}000$，求年增长率：

---
$$\text{增长率} = \frac{515{,}000 - 500{,}000}{500{,}000} \times 100\% = \frac{15{,}000}{500{,}000} \times 100\% = 3\%$$
````

---

## 第七章总结

1. **百分法：**
   *   $x\% = \dfrac{x}{100}$；百分数、小数、分数三者可互相转换。
   *   百分变化 $= \dfrac{V_1 - V_0}{V_0} \times 100\%$；新值 $V_1 = V_0(1 + r/100)$。
   *   **连续百分变化不可直接加减百分率**，例如先 $+10\%$ 再 $-10\%$，最终为 $0.99$ 倍而非恢复原值。
   *   商业应用中，盈利 $P = S - C$，盈利百分率以成本为基准：$\dfrac{S-C}{C} \times 100\%$。售价公式 $S = C(1 + r/100)$（$r$ 为盈利百分率，亏损时 $r<0$）。
   *   **DSE 常見鏈式結構**：標價 $\to$ 折扣 $\to$ 售價 $\to$ 盈利。每個環節的基數不同，須逐一處理。反求成本時不可簡單地用 $(1-r\%)$ 乘售價。

2. **单位与量纲：**
   *   量纲是物理量的本质类别（长度 $L$、时间 $T$、质量 $M$ 等）；单位是量度的标准。量纲符号仅参与乘除，不参与加减。
   *   同一量纲的不同单位由等式关系连接（如 $\text{km} = 1000\,\text{m}$，$\text{h} = 3600\,\text{s}$）。单位换算有两种等价方法：（i）代数代入法：直接将等式关系代入替换；（ii）换算因子法：将等式关系构造成值为 $1$ 的分数相乘。

3. **比：**
   *   **比**（$a:b$）：比较同类量，结果无单位。定义 $a:b = a/b$。
   *   **比的基本性质**：$a:b = ka:kb$（$k \neq 0$），即比的前项和后项同乘非零常数，比值不变。
   *   **连比**（$a:b:c$）：同时陈述两个比 $a:b$ 与 $b:c$ 的简洁记法。**连比基本性质**：$a:b:c = ka:kb:kc$（$k \neq 0$）。
   *   **求连比**：对 $a:b = p:q$ 乘 $s$、对 $b:c = s:r$ 乘 $q$，得 $a:b:c = ps:qs:qr$。

4. **比例与比例常数：**
   *   **比例**（$a:b = c:d$）：两个比相等的等式。比的基本性质保证了这种等式可以传递。
   *   **连比例**（$a:b:c = d:e:f$）：两个连比相等的等式，等价于 $a:b = d:e$（后项 $b:c = e:f$ 由连比基本性质自动成立）。
   *   **比例常数法**：若 $a:b = c:d$，则 $\exists k \neq 0$ 使 $a = kc,\; b = kd$。这将比的关系转化为一次方程：若 $x:y = a:b$，可设 $x = ak,\; y = bk$，由额外条件（如总和、差值、乘积）解 $k$。
   *   **比例的性质**：更比定理（$a:b=c:d \implies a:c=b:d$）、合比定理（$(a+b):b = (c+d):d$）、分比定理（$(a-b):b = (c-d):d$）、等比定理（$(\sum a_i):(\sum b_i) = a_i:b_i$）。
   *   **正比例**（$y = kx$）：比值恒定，图像为过原点的直线。比例常数 $k$ 与 7.4 定理中的 $k$ 同源。
   *   **反比例**（$y = k/x$）：乘积恒定为 $k$，图像为双曲线。**DSE 判據**：「固定____」字眼 → 積不變。
   *   **混合比例**：加权平均 $\text{平均單價} = \dfrac{\sum p_i w_i}{\sum w_i}$。正向求平均成本、逆向（方程组或方程）求混合量或混合比。

5. **率：**
   *   率是比较**异类**量的比值，结果带复合单位（如 $\text{km/h}$）。可视为比的自然推广：当比的双方来自不同量纲时，比值获得复合单位。
   *   常见率包括：速率（$v = d/t$，注意平均速率 ≠ 速率的算术平均）及增长率（百分变化在时间维度的具体化）。

---

## 中英对照词汇表（Glossary）

| 中文 | English |
|------|---------|
| 百分法 | Percentage |
| 百分比 | Percent |
| 百分变化 | Percentage Change |
| 增加 | Increase |
| 减少 | Decrease |
| 成本 | Cost |
| 售价 | Selling Price |
| 盈利 | Profit |
| 亏损 | Loss |
| 盈利百分率 | Profit Percentage |
| 亏损百分率 | Loss Percentage |
| 折扣 | Discount |
| 单位 | Unit |
| 量纲 | Dimension |
| 量纲分析 | Dimensional Analysis |
| 换算因子 | Conversion Factor |
| 复合单位 | Compound Unit |
| 率 | Rate |
| 速率 | Speed |
| 平均速率 | Average Speed |
| 增长率 | Growth Rate |
| 比 | Ratio |
| 前项 | Antecedent |
| 后项 | Consequent |
| 最简比 | Simplest Ratio |
| 连比 | Continued Ratio |
| 连比例 | Continued Proportion |
| 比例 | Proportion |
| 内项 | Mean (terms) |
| 外项 | Extreme (terms) |
| 交叉相乘 | Cross-multiplication |
| 正比例 | Direct Proportion |
| 反比例 | Inverse Proportion |
| 比例常数 | Constant of Proportionality |
| 更比定理 | Alternendo |
| 合比定理 | Componendo |
| 分比定理 | Dividendo |
| 等比定理 | Theorem of Equal Ratios |
| 加权平均 | Weighted Average |
| 混合比例 | Mixture Problem |
| 相似图形 | Similar Figures |
| 面积比 | Area Ratio |
| 最小公倍数 | Least Common Multiple (LCM) |
