前置：[[Ch16 集合论]]

**模块目标：** 深入理解实数的连续性本质，并从实数系扩充至复数系，掌握复数的代数运算与几何意义。

---

## 第一部分：实数的本质 (The Nature of Real Numbers)

> **学习目标：** 理解有理数与实数的关键区别——连续性与稠密性之分，初步接触实数完备性的概念。

### 1. 数系回顾

*   **定理 (数系的包含关系):**
    $$
    \mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}
    $$
    其中：
    *   $\mathbb{N} = \{1, 2, 3, \dots\}$：自然数集
    *   $\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}$：整数集
    *   $\mathbb{Q} = \{\frac{p}{q} \mid p, q \in \mathbb{Z},\ q \neq 0\}$：有理数集
    *   $\mathbb{R}$：实数集（有理数与无理数的并集）

*   **定义 (无理数 Irrational Number):**
    不能表示为两个整数之比的实数。记无理数集为 $\mathbb{R} \setminus \mathbb{Q}$。
    *   *经典实例：* $\sqrt{2}$、$\pi$、$e$ 均为无理数。

### 2. 稠密性 (Denseness)

*   **定义 (稠密性 Denseness):**
    设 $A$ 是实数集的子集。若对任意两数 $a, b \in \mathbb{R}$ 满足 $a < b$，均存在 $x \in A$ 使得 $a < x < b$，则称 $A$ 在 $\mathbb{R}$ 中**稠密 (dense)**。
    

*   **定理 (有理数集的稠密性):**
    有理数集 $\mathbb{Q}$ 在 $\mathbb{R}$ 中是稠密的。即：对任意两个不相等的实数 $a < b$，总存在有理数 $r$ 满足 $a < r < b$。

*   **定理 (无理数集的稠密性):**
    无理数集 $\mathbb{R} \setminus \mathbb{Q}$ 在 $\mathbb{R}$ 中也是稠密的。

*   **注记 (稠密性 vs 连续性):**
    稠密性和连续性是两种根本不同的性质。
    *   有理数集 $\mathbb{Q}$ 具有**稠密性**，但不具有**连续性**：在数轴上，有理数之间仍然存在“空隙”（例如 $\sqrt{2}$ 所在的位置不是有理数，但两侧都有有理数无限逼近）。
    *   实数集 $\mathbb{R}$ 同时具有稠密性和连续性：数轴上的每一点都对应唯一的一个实数，不存在任何“空隙”。

### 3. 戴德金分割 (Dedekind Cut)

*   **定义 (戴德金分割 Dedekind Cut):**
    设 $A, B \subset \mathbb{Q}$ 为有理数集的两个非空子集，若满足：
    1.  $A \cup B = \mathbb{Q}$，$A \cap B = \varnothing$；（将全体有理数分为互斥的两部分）
    2.  $\forall a \in A, \forall b \in B$，有 $a < b$；（$A$ 的每个元素均小于 $B$ 的每个元素）
    3.  $A$ 没有最大值；

    则称 $(A, B)$ 为有理数集 $\mathbb{Q}$ 上的一个**戴德金分割**。

    该分割**定义**了一个实数 $\alpha$：
    *   若 $B$ 有最小值 $b_{\min}$，则 $\alpha = b_{\min}$，且 $\alpha \in \mathbb{Q}$；
    *   若 $B$ 没有最小值，则 $\alpha \notin \mathbb{Q}$（即 $\alpha$ 为无理数）。

    **直观理解：** 想象用一把刀切断有理数的数轴。若刀恰好落在某个有理数 $q$ 上，则该分割定义了有理数 $q$；若刀落在两个有理数之间的“空隙”处，则该分割定义了一个无理数——它“填补”了这个空隙。

*   **定理 (实数集的连续性):**
    对 $\mathbb{Q}$ 上的每一个戴德金分割 $(A, B)$，存在唯一的实数 $\alpha$ 满足：
    $$\forall a \in A,\ \forall b \in B,\quad a \leq \alpha \leq b$$
    这一性质称为实数集的**完备性 (Completeness)** 或**连续性 (Continuity)**。

*   **注记:**
    戴德金分割是严格构造实数系的一种经典方法（由 Richard Dedekind 于 1872 年提出）。实数集的连续性是其区别于有理数集的根本特征——这也是微积分得以建立的基础。

---

## 第二部分：复数 (Complex Numbers)

> **学习目标：** 突破实数轴的限制，理解虚数单位 $i$ 及其运算规则，掌握复数的代数运算与几何表示。

### 1. 复数的引入动机

*   **问题:** 方程 $x^2 + 1 = 0$ 在实数范围内无解，因为 $\forall x \in \mathbb{R}$，$x^2 \geq 0$，故 $x^2 + 1 \geq 1 > 0$。
*   **历史注记:** 16 世纪的意大利数学家（Cardano、Bombelli 等）在解三次方程的过程中，即使最终解是实数，中间步骤也不可避免地出现了负数的平方根。这驱使数学界接纳了这种当时的“虚构”之数。

### 2. 虚数单位

*   **定义 (虚数单位 Imaginary Unit):**
    定义符号 $i$ 满足：
    $$
    i^2 = -1
    $$
    称 $i$ 为**虚数单位 (imaginary unit)**。

*   **引理 (纯虚数 Purely Imaginary Number):**
    形如 $bi$（其中 $b \in \mathbb{R}$，$b \neq 0$）的数称为**纯虚数 (purely imaginary number)**。

### 3. 复数的基本形式

*   **定义 (复数 Complex Number):**
    形如
    $$
    z = a + bi
    $$
    的数称为**复数**，其中 $a, b \in \mathbb{R}$。全体复数的集合记作 $\mathbb{C}$。

*   **定义 (实部与虚部 Real and Imaginary Parts):**
    对复数 $z = a + bi$（$a, b \in \mathbb{R}$）：
    *   $a$ 称为 $z$ 的**实部 (real part)**，记作 $\operatorname{Re}(z) = a$；
    *   $b$ 称为 $z$ 的**虚部 (imaginary part)**，记作 $\operatorname{Im}(z) = b$。
    *   *注意：虚部是实数 $b$，而非 $bi$。*

*   **特例:**
    *   当 $b = 0$ 时，$z = a$ 为实数。即 $\mathbb{R} \subset \mathbb{C}$。
    *   当 $a = 0$ 且 $b \neq 0$ 时，$z = bi$ 为纯虚数。

### 4. 复数的相等

*   **公理 (复数相等的条件):**
    设 $z_1 = a + bi$，$z_2 = c + di$（$a, b, c, d \in \mathbb{R}$），则
    $$
    z_1 = z_2 \iff a = c \text{ 且 } b = d
    $$
    即两个复数相等当且仅当它们的实部和虚部分别相等。

    *   *推论：* $a + bi = 0 \iff a = 0 \text{ 且 } b = 0$。

### 5. 复数的四则运算

设 $z_1 = a + bi$，$z_2 = c + di$（$a, b, c, d \in \mathbb{R}$）。

*   **定义 (加法与减法 Addition and Subtraction):**
    $$
    z_1 \pm z_2 = (a \pm c) + (b \pm d)i
    $$
    即实部与实部相加减，虚部与虚部相加减。

*   **定义 (乘法 Multiplication):**
    $$
    \begin{aligned}
    z_1 z_2 &= (a + bi)(c + di) \\
    &= ac + adi + bci + bdi^2 \\
    &= (ac - bd) + (ad + bc)i \quad (\because i^2 = -1)
    \end{aligned}
    $$

*   **性质 (乘法的交换律与结合律):**
    对任意 $z_1, z_2, z_3 \in \mathbb{C}$：
    1.  $z_1 z_2 = z_2 z_1$（交换律）；
    2.  $(z_1 z_2) z_3 = z_1 (z_2 z_3)$（结合律）；
    3.  $z_1(z_2 + z_3) = z_1 z_2 + z_1 z_3$（分配律）。

### 6. 共轭复数 (Conjugate)

*   **定义 (共轭复数 Conjugate):**
    对复数 $z = a + bi$，其**共轭复数**（简称为**共轭**）定义为：
    $$
    \overline{z} = a - bi
    $$

*   **定理 (共轭复数的基本性质):**
    对 $z = a + bi$（$a, b \in \mathbb{R}$）：
    1.  $\overline{\overline{z}} = z$；
    2.  $\operatorname{Re}(z) = \dfrac{z + \overline{z}}{2}$，$\operatorname{Im}(z) = \dfrac{z - \overline{z}}{2i}$；
    3.  $z \in \mathbb{R} \iff \overline{z} = z$（实数⇔自共轭）；
    4.  $z$ 为纯虚数 $\iff \overline{z} = -z$ 且 $z \neq 0$；
    5.  $z \cdot \overline{z} = a^2 + b^2$，总为非负实数。

*   **定理 (共轭的运算性质):**
    对 $z_1, z_2 \in \mathbb{C}$：
    $$
    \begin{aligned}
    \overline{z_1 + z_2} &= \overline{z_1} + \overline{z_2} \\
    \overline{z_1 - z_2} &= \overline{z_1} - \overline{z_2} \\
    \overline{z_1 z_2} &= \overline{z_1} \cdot \overline{z_2} \\
    \overline{\left(\dfrac{z_1}{z_2}\right)} &= \dfrac{\overline{z_1}}{\overline{z_2}} \quad (z_2 \neq 0)
    \end{aligned}
    $$

### 7. 复数的除法

*   **算法 (复数除法 —— 分母实数化):**
    对 $z_1 = a + bi$，$z_2 = c + di \neq 0$：
    $$
    \begin{aligned}
    \frac{z_1}{z_2} &= \frac{a + bi}{c + di} \\
    &= \frac{(a + bi)(c - di)}{(c + di)(c - di)} \\
    &= \frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}
    \end{aligned}
    $$
    核心技巧：分子分母同乘分母的共轭 $c - di$，使分母化为实数 $c^2 + d^2$。

### 8. 复数的模 (Modulus)

*   **定义 (复数的模 Modulus):**
    对复数 $z = a + bi$，其**模 (modulus)** 定义为：
    $$
    |z| = \sqrt{a^2 + b^2}
    $$
    *   *注：* $|z| = \sqrt{z \cdot \overline{z}}$，且 $|z| \geq 0$。当且仅当 $z = 0$ 时 $|z| = 0$。

*   **性质 (模的基本性质):**
    对 $z_1, z_2 \in \mathbb{C}$：
    1.  $|z_1 z_2| = |z_1| \cdot |z_2|$；
    2.  $\left|\dfrac{z_1}{z_2}\right| = \dfrac{|z_1|}{|z_2|}$（$z_2 \neq 0$）；
    3.  $|\overline{z}| = |z|$；
    4.  $|\operatorname{Re}(z)| \leq |z|$，$|\operatorname{Im}(z)| \leq |z|$。

### 9. 复平面 (Complex Plane / Argand Diagram)

*   **定义 (复平面 Complex Plane):**
    建立直角坐标系，以横轴为**实轴 (Real Axis)**，纵轴为**虚轴 (Imaginary Axis)**。复数 $z = a + bi$ 与平面上的点 $(a, b)$（或位置向量 $\overrightarrow{OZ}$）一一对应。此平面称为**复平面**或 **Argand 图 (Argand Diagram)**。

*   **几何解释:**
    *   实数 $a$ 对应实轴上的点 $(a, 0)$；
    *   纯虚数 $bi$ 对应虚轴上的点 $(0, b)$；
    *   共轭复数 $z$ 与 $\overline{z}$ 关于实轴对称；
    *   模 $|z|$ 等于点 $(a, b)$ 到原点的距离：$|z| = \sqrt{a^2 + b^2}$。

*   **几何解释 (加法与减法):**
    *   复数的加法对应向量的平行四边形法则。
    *   复数的减法 $z_1 - z_2$ 对应从 $z_2$ 的终点指向 $z_1$ 的终点的向量。

### 10. 复数与二次方程

*   **定理 (二次方程在复数域中恒有解):**
    对二次方程 $ax^2 + bx + c = 0$（$a, b, c \in \mathbb{R}$，$a \neq 0$）：
    *   若判别式 $\Delta = b^2 - 4ac \geq 0$，则有两实根；
    *   若判别式 $\Delta = b^2 - 4ac < 0$，则有两共轭复根：
    $$
    x = \frac{-b \pm i\sqrt{-\Delta}}{2a}
    $$
    *   在复数域 $\mathbb{C}$ 中，每个二次方程恒有两根（计入重数），且实系数二次方程的复根必然成共轭对出现。

*   **定理 (代数基本定理 —— 预告):**
    在复数域 $\mathbb{C}$ 中，任何次数 $n \geq 1$ 的复系数多项式方程恰有 $n$ 个复根（计入重数）。这一深刻的结果简称为代数基本定理，将于后续章节课时详述。

---

### **备课建议**

1.  **戴德金分割的通俗化：**
    *   用“剪刀剪断绳子”的比喻即可：绳子上的点要么属于左边，要么属于右边，那个“切点”就是唯一的实数。不要陷入过多的集合论验证。
    *   强调无理数填补了有理数之间的“空隙”，而不仅仅是一类“奇怪”的数。

2.  **复数运算几何化：**
    *   在讲解复数加减法时，利用**平行四边形法则**（类比向量加法）进行演示，能帮助学生建立直观理解。
    *   共轭的几何解释（关于实轴的反射）极其直观，务必配合复平面示意图讲解。

3.  **i 的几何意义：**
    *   乘以 $i$ 等价于将复平面上的点逆时针旋转 $90^\circ$（后续将在三角函数章节深入展开）。这是理解复数乘法的核心几何直觉。

4.  **分母实数化：**
    *   复数的除法是 DSE 非基础课题的常考项。务必强调“分子分母同乘分母的共轭”这一标准技巧，与初中二次根式分母有理化的思路完全一致。

5.  **衔接提示：**
    *   本章的复数内容为后续 Ch18“一元二次方程”中判别式 $\Delta < 0$ 时的复根情形以及 Ch25“指数函数与对数函数”中复数指数形式（选讲）奠定基础。
    *   实数的完备性（戴德金分割）是微积分极限理论的基石，M1/M2 学生应有所了解。
