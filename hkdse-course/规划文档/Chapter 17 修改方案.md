# Chapter 17 修改方案

基于 `%%...%%` 注释扫描结果，共 21 处需修改。按类型分类如下。

---

## 一、数学环境标题补充（15 处）

规则：`title: 环境名（名称） | 英文环境名（英文名称）`，无名称省略括号。

| # | 位置（行号） | 当前 title | 改为 |
|---|------------|-----------|------|
| T1 | L42 `ad-def` | `定义 | Definition` | `定义（无理数） | Definition（Irrational Number）` |
| T2 | L85 `ad-def` | `定义 | Definition` | `定义（稠密） | Definition（Dense）` |
| T3 | L149 `ad-thm` | `定理 | Theorem` | `定理（有理数集的稠密性） | Theorem（Denseness of Q）` |
| T4 | L229 `ad-thm` | `定理 | Theorem` | `定理（无理数集的稠密性） | Theorem（Denseness of R\Q）` |
| T5 | L283 `ad-def` | `定义 | Definition` | `定义（戴德金分割） | Definition（Dedekind Cut）` |
| T6 | L362 `ad-thm` | `定理 | Theorem` | `定理（戴德金分割定理） | Theorem（Dedekind Cut Theorem）` |
| T7 | L449 `ad-def` | `定义 | Definition` | `定义（虚数单位） | Definition（Imaginary Unit）` |
| T8 | L461 `ad-def` | `定义 | Definition` | `定义（复数） | Definition（Complex Number）` |
| T9 | L486 `ad-def` | `定义 | Definition` | `定义（实部与虚部） | Definition（Real Part and Imaginary Part）` |
| T10 | L502 `ad-def` | `定义 | Definition` | `定义（纯虚数） | Definition（Purely Imaginary Number）` |
| T11 | L538 `ad-def` | `定义 | Definition` | `定义（复数的加减法） | Definition（Addition and Subtraction）` |
| T12 | L567 `ad-thm` | `定理 | Theorem` | `定理（复数乘法的运算律） | Theorem（Laws of Complex Multiplication）` |
| T13 | L622 `ad-def` | `定义 | Definition` | `定义（共轭复数） | Definition（Conjugate）` |
| T14 | L633 `ad-thm` | `定理 | Theorem` | `定理（共轭的基本性质） | Theorem（Basic Properties of Conjugate）` |
| T15 | L664 `ad-thm` | `定理 | Theorem` | `定理（共轭的运算性质） | Theorem（Properties of Conjugate under Operations）` |

**备注：** 共轭相关的两个定理（L633 与 L664）区分：前者是共轭自身的 5 条性质，后者是共轭与加减乘的关系。

---

## 二、中英标题缺失（2 处）

| # | 位置 | 当前 title | 改为 |
|---|------|-----------|------|
| B1 | L117 嵌套 `ad-axi`（完备性公理） | `公理 | Axiom` | `公理（完备性公理） | Axiom（Completeness Axiom）` |
| B2 | L734 `ad-thm`（除法共轭性质） | `定理 | Theorem` | `定理（除法的共轭性质） | Theorem（Conjugate of Division）` |

---

## 三、标题补充（续：模与复平面相关）

| # | 位置 | 当前 title | 改为 |
|---|------|-----------|------|
| T16 | L759 `ad-def` | `定义 | Definition` | `定义（模） | Definition（Modulus）` |
| T17 | L772 `ad-thm` | `定理 | Theorem` | `定理（模的性质） | Theorem（Properties of Modulus）` |
| T18 | L800 `ad-def` | `定义 | Definition` | `定义（复平面） | Definition（Complex Plane）` |

---

## 四、环境类型错误（2 处）

| # | 位置 | 当前环境 | 问题 | 改为 |
|---|------|---------|------|------|
| E1 | L255 `ad-lem` | 引理（稠密性与连续性是两种根本不同的性质） | 内容是注记/讨论，不是引理 | `ad-note`，title: `注记 | Remark`，正文不变 |
| E2 | L312 `ad-axi` | 公理（来自数学分析中的示例） | 内容是「此例较难可跳过」的提示，不是公理 | `ad-note`，title: `注记 | Remark` |
| E3 | L393 `ad-lem` | 引理（注记） | 标题已写「注记」却用引理环境 | `ad-note`，title: `注记 | Remark` |

---

## 五、排版改写（1 处）

| # | 位置 | 内容 | 改为 |
|---|------|------|------|
| R1 | L553 `ad-def`（乘法） | 直接给出公式，缺少引入文字 | 添加引入：`设 $z_1=a+bi$，$z_2=c+di$（$a,b,c,d\in\mathbb{R}$）。**乘法：** 按多项式展开并用 $i^2=-1$ 合并：`，再接公式块 |

---

## 六、新增章节（1 处）

| # | 位置 | 需求 | 方案 |
|---|------|------|------|
| N1 | L833 注释 | 需新增 §17.2.6 介绍 $\sqrt{a}=i\sqrt{|a|}$（$a<0$），衔接前文，搭配例题 | 新增 `### 17.2.6 负实数的复数平方根`，内容包括：<br>1. **动机**：§17.2.1 已证 $x^2+c=0$（$c>0$）无实数解，现在有了复数，可以给出解的复数形式<br>2. **定义/定理**：对 $a<0$，定义 $\sqrt{a}=i\sqrt{|a|}$，并证明 $(i\sqrt{|a|})^2=a$<br>3. **推广**：$i$ 的幂的循环规律 $i^n$（$n=1,2,3,4$ 循环）<br>4. **例题**：(a) 求 $\sqrt{-4}$；(b) 求 $\sqrt{-9}+\sqrt{-1}$；(c) 解方程 $x^2+3=0$；(d) 计算 $i^5,i^{10},i^{2026}$ |

---

## 七、词汇表排版修复

| # | 位置 | 问题 | 改为 |
|---|------|------|------|
| V1 | L872 模行 | `modulus $ | z | $` 格式破碎，多余空列 | 修复为 `modulus \|z\|`，删除多余列分隔符 |

---

## 八、删除所有 `%%...%%` 注释

执行以上修改后，逐一删除所有 `%%...%%` 标记。

---

**总计：21 处标题补充 + 3 处环境类型修正 + 1 处排版改写 + 1 处新增章节 + 1 处词汇表修复 + 注释清除。**
