**前置：** [[Ch06 代数式]]；[[Ch00 基础概念]]

**模块目标：** 建立严谨的几何逻辑体系。从欧氏几何公理出发，掌握点、线、角的基本性质，理解平行线与截线所形成的角关系，熟练运用三角形、多边形及特殊四边形的角度定理，掌握毕氏定理及其逆定理，能运用全等与相似的判定条件进行计算与证明，并初步认识圆的弧长／扇形面积及图形的对称性。

---

## 8.1 几何公理与基础 (Axioms and Foundations)

> 本节建立欧氏平面几何的逻辑起点：点、线、面三类基本对象及其公理。

### 8.1.1 基本元素 (Basic Elements)

- **定义 8.1 (点 / Point)**
  几何图形最基本的元素，表示位置，没有大小、没有长度、没有面积。
  - **定点 (Fixed Point)：** 位置固定的点。
  - **动点 (Moving Point / Locus)：** 依据特定条件移动的点（详见第 30 章）。

- **定义 8.2 (直线 / Straight Line)**
  两点确定一条且仅一条直线，向两端无限延伸。直线无粗幼。
  - **射线 (Ray)：** 直线被其上一点分成的两部分之一，有一个端点，向一端无限延伸。
  - **线段 (Line Segment)：** 直线上两点之间的部分，有两个端点，长度有限。

- **定义 8.3 (平面 / Plane)**
  一个平坦的二维表面，向所有方向无限延伸。

- **公理 8.1 (两点连线 / Two Points Determine a Line)**
  经过任意两个不同点，存在且仅存在一条直线。

### 8.1.2 角与度量 (Angles and Measurement)

- **定义 8.4 (角 / Angle)**
  由从同一点（顶点）出发的两条射线所组成的图形。这两个射线称为角的**边**。
  - 记法：$\angle ABC$，其中 $B$ 为顶点。

- **定义 8.5 (角度制 / Degree System)**
  角的度量单位。将一个周角等分为 $360$ 份，每一份称为 $1$ 度（记为 $1^\circ$）。
  - 周角 $= 360^\circ$
  - 平角 $= 180^\circ$
  - 直角 $= 90^\circ$
  - $1^\circ = 60'$（分），$1' = 60''$（秒）

- **定义 8.6 (角的分类 / Classification of Angles)**
  | 类型 | 条件 | 名称 (英) |
  |------|------|-----------|
  | 锐角 | $0^\circ < \theta < 90^\circ$ | Acute Angle |
  | 直角 | $\theta = 90^\circ$ | Right Angle |
  | 钝角 | $90^\circ < \theta < 180^\circ$ | Obtuse Angle |
  | 平角 | $\theta = 180^\circ$ | Straight Angle |
  | 反角 | $180^\circ < \theta < 360^\circ$ | Reflex Angle |
  | 周角 | $\theta = 360^\circ$ | Round Angle |

- **定义 8.7 (角的对顶角、邻角、补角、余角)**
  - **对顶角 (Vertically Opposite Angles)：** 两直线相交，所形成的两对相对的角。对顶角相等。
  - **邻补角 (Adjacent Angles on a Straight Line)：** 在一条直线上的两个邻角，它们的和为 $180^\circ$。
  - **同顶角和 (Angles at a Point)：** 环绕同一点的若干角之和为 $360^\circ$。

### 8.1.3 欧氏几何公理 (Euclid's Axioms)

- **公理 8.2 (欧几里得五公理 / Euclid's Five Postulates)**
  1. 任意两点可连一条直线。
  2. 任意有限线段可沿直线方向无限延长。
  3. 给定任意线段，可以其一个端点为圆心、该线段为半径作一圆。
  4. 所有直角都相等。
  5. **平行公设 (Parallel Postulate)：** 若一直线与两直线相交，且同侧内角之和小于 $180^\circ$，则这两直线在该侧无限延长后必相交。

  **Remark:** 第五公设的等价形式——过直线外一点，有且仅有一条直线与该直线平行——是平面几何区别于非欧几何的关键。

### 8.1.4 平行线与截线 (Parallel Lines and Transversals)

- **定义 8.8 (平行线 / Parallel Lines)**
  在同一平面内，永不相交的两条直线。记作 $\ell_1 \parallel \ell_2$。

- **定义 8.9 (截线 / Transversal)**
  与两条（或以上）直线相交的一条直线。

- **定理 8.1 (平行线的角关系 / Angle Relationships with Parallel Lines)**
  设两平行线被一条截线所截，则：
  1. **同位角相等 (Corresponding Angles)：** $\angle a = \angle b$
  2. **内错角相等 (Alternate Interior Angles)：** $\angle c = \angle d$
  3. **同侧内角互补 (Co-interior Angles / Allied Angles)：** $\angle e + \angle f = 180^\circ$

  **证明思路：** 由平行线定义及欧氏第五公设的等价形式推导。以同位角为例——若同位角不等，则两直线会在某一侧相交，与平行假定矛盾。

- **推论 8.1 (平行线判定 / Tests for Parallel Lines)**
  上述三组关系的逆命题同样成立，可用作平行线的判定条件：
  - 若同位角相等，则两直线平行。
  - 若内错角相等，则两直线平行。
  - 若同侧内角互补（和为 $180^\circ$），则两直线平行。

---

## 8.2 三角形 (Triangles)

### 8.2.1 三角形的内角和 (Angle Sum of a Triangle)

- **定理 8.2 (三角形内角和定理 / Triangle Angle Sum Theorem)**
  三角形三个内角的和等于 $180^\circ$。
  $$\angle A + \angle B + \angle C = 180^\circ$$

  **证明思路：** 过顶点 $A$ 作直线平行于 $BC$。由同位角和内错角的相等关系，将 $\angle B$ 和 $\angle C$ 平移至 $A$ 点处，与 $\angle A$ 共同构成一个平角（$180^\circ$）。

### 8.2.2 三角形的外角 (Exterior Angle of a Triangle)

- **定义 8.10 (三角形的外角 / Exterior Angle)**
  将三角形的一边延长，延长线与相邻边之间所形成的角称为外角。一个三角形共有 $6$ 个外角（每个顶点两个，对顶角相等）。

- **定理 8.3 (外角定理 / Exterior Angle Theorem)**
  三角形的一个外角等于与它不相邻的两个内角之和。
  $$\text{外角} = \text{不相邻内角}_1 + \text{不相邻内角}_2$$

  **证明：** 设 $\angle ACD$ 为 $\triangle ABC$ 在顶点 $C$ 处的外角。由平角关系 $\angle ACB + \angle ACD = 180^\circ$，又由定理 8.2 $\angle A + \angle B + \angle ACB = 180^\circ$。两式对比即得 $\angle ACD = \angle A + \angle B$。

- **推论 8.2**
  三角形的任意一个外角均大于与其不相邻的任一内角。

### 8.2.3 三角形的分类 (Classification of Triangles)

- **定义 8.11 (按边分类 / Classification by Sides)**
  - **等边三角形 (Equilateral Triangle)：** 三条边的长度均相等。三个角均为 $60^\circ$。
  - **等腰三角形 (Isosceles Triangle)：** 至少有两条边的长度相等。相等的两边称为**腰**，第三边称为**底**。
  - **不等边三角形 (Scalene Triangle)：** 三条边的长度均不相等。

- **定义 8.12 (按角分类 / Classification by Angles)**
  - **锐角三角形 (Acute Triangle)：** 三个角均为锐角（$<90^\circ$）。
  - **直角三角形 (Right Triangle)：** 有一个角为直角（$=90^\circ$）。
  - **钝角三角形 (Obtuse Triangle)：** 有一个角为钝角（$>90^\circ$）。

  **Remark:** 一个三角形不可能有多于一个直角或钝角（否则内角和大于 $180^\circ$，与定理 8.2 矛盾）。

### 8.2.4 等腰三角形的性质 (Properties of Isosceles Triangles)

- **定理 8.4 (等腰三角形底角相等 / Base Angles of Isosceles Triangle)**
  在等腰三角形中，两腰所对的底角相等。
  $$\text{若 } AB = AC \text{，则 } \angle B = \angle C$$

  **证明思路：** 作顶角 $\angle A$ 的角平分线交 $BC$ 于 $D$。由 SAS 全等条件 $\triangle ABD \cong \triangle ACD$，得 $\angle B = \angle C$。

- **推论 8.3 (等角对等边)**
  若三角形有两角相等，则这两角所对的边也相等。即 $\angle B = \angle C \implies AB = AC$。

- **推论 8.4 (等腰三角形三线合一)**
  在等腰三角形中，顶角的角平分线、底边的垂直平分线、以及底边上的中线，三条线重合。

### 8.2.5 三角形不等式 (Triangle Inequality)

- **定理 8.5 (三角形不等式 / Triangle Inequality)**
  三角形中任意两边之和大于第三边。
  $$a + b > c,\quad b + c > a,\quad c + a > b$$

  **证明思路：** 两点之间直线（线段）最短。在 $\triangle ABC$ 中，$AB$ 为 $A$ 到 $B$ 的最短路径，而 $AC + CB$ 为经过 $C$ 的折线路径，故 $AB < AC + CB$。

  **Remark:** 反过来说，若三条线段不能满足三角不等式，则它们无法构成一个三角形。

---

## 8.3 多边形 (Polygons)

### 8.3.1 多边形的定义 (Definition of a Polygon)

- **定义 8.13 (多边形 / Polygon)**
  由三条或以上的线段首尾顺次相连所形成的封闭平面图形。
  - **凸多边形 (Convex Polygon)：** 所有内角均 $< 180^\circ$，且任意两点的连线段都完全落在多边形内部。
  - **凹多边形 (Concave Polygon)：** 至少有一个内角 $> 180^\circ$。
  - $n$ 边形有 $n$ 个顶点、$n$ 条边、$n$ 个内角。

### 8.3.2 多边形的内角和 (Sum of Interior Angles)

- **定理 8.6 (多边形内角和公式 / Sum of Interior Angles of an $n$-gon)**
  对于任意 $n$ 边形（$n \ge 3$），其内角和为：
  $$\text{内角和} = (n-2) \times 180^\circ$$

  **证明思路：** 从一个顶点出发，可将 $n$ 边形划分为 $(n-2)$ 个三角形。每个三角形内角和为 $180^\circ$，且这些三角形的内角共同构成多边形的全部内角，故总和为 $(n-2) \times 180^\circ$。

### 8.3.3 多边形的外角和 (Sum of Exterior Angles)

- **定义 8.14 (多边形的外角 / Exterior Angle of a Polygon)**
  将多边形的一条边沿一个方向延长，延长线与相邻边之间的夹角。一般取每个顶点处的一个外角（所有外角朝同一方向）。

- **定理 8.7 (多边形外角和 / Sum of Exterior Angles)**
  任意凸多边形的外角和恒等于 $360^\circ$，与边数 $n$ 无关。
  $$\text{外角和} = 360^\circ$$

  **证明思路：** 在每个顶点处，内角 $+$ 外角 $= 180^\circ$。对 $n$ 个顶点求和：$\sum(\text{内角} + \text{外角}) = n \times 180^\circ$。即 $(n-2) \times 180^\circ + \text{外角和} = n \times 180^\circ$，解得外角和 $= 360^\circ$。

---

## 8.4 特殊四边形 (Special Quadrilaterals)

### 8.4.1 平行四边形 (Parallelograms)

- **定义 8.15 (平行四边形 / Parallelogram)**
  两组对边分别平行的四边形。记作 $\square ABCD$。

- **定理 8.8 (平行四边形的性质 / Properties of a Parallelogram)**
  在平行四边形 $ABCD$ 中：
  1. 对边相等：$AB = CD$，$BC = DA$
  2. 对角相等：$\angle A = \angle C$，$\angle B = \angle D$
  3. 对角线互相平分：对角线 $AC$ 与 $BD$ 的交点为两者的中点

  **证明思路（以 3 为例）：** 连对角线 $AC$ 和 $BD$，设交点为 $O$。由 $AB \parallel CD$ 得 $\angle ABO = \angle CDO$（内错角）；由 $BC \parallel DA$ 得 $\angle BAO = \angle DCO$。再由 $AB = CD$ 得 $\triangle AOB \cong \triangle COD$（ASA），故 $AO = CO$，$BO = DO$。

- **定理 8.9 (平行四边形的判定条件 / Conditions for a Parallelogram)**
  以下任一条件成立时，四边形为平行四边形：
  1. 两组对边分别平行。（定义）
  2. 两组对边分别相等。
  3. 两组对角分别相等。
  4. 对角线互相平分。
  5. 一组对边平行且相等。

### 8.4.2 特殊的平行四边形 (Special Parallelograms)

- **定义 8.16 (矩形 / Rectangle)**
  四个角均为直角的平行四边形。
  - **性质：** 对角线相等（$AC = BD$）。

- **定义 8.17 (菱形 / Rhombus)**
  四条边均相等的平行四边形。
  - **性质：** 对角线互相垂直（$AC \perp BD$），且对角线平分各组内角。

- **定义 8.18 (正方形 / Square)**
  四条边均相等且四个角均为直角的四边形。
  - 正方形既是矩形又是菱形，集两者性质于一身。

- **Remark：** 集合包含关系——
  $$\text{正方形} \subset \text{菱形} \subset \text{平行四边形}$$
  $$\text{正方形} \subset \text{矩形} \subset \text{平行四边形}$$
  即正方形是菱形和矩形的交集。

### 8.4.3 梯形 (Trapezium)

- **定义 8.19 (梯形 / Trapezium)**
  只有一组对边平行的四边形。
  - **等腰梯形 (Isosceles Trapezium)：** 非平行的一组对边（腰）相等的梯形。其底角相等，对角线相等。

---

## 8.5 毕氏定理 (Pythagoras' Theorem)

### 8.5.1 毕氏定理

- **定理 8.10 (毕氏定理 / Pythagoras' Theorem)**
  在直角三角形中，斜边长度的平方等于两条直角边长度的平方和。设直角三角形 $ABC$ 中 $\angle C = 90^\circ$，$c$ 为斜边，则：
  $$a^2 + b^2 = c^2$$

  **证明思路（面积法）：** 以直角三角形 $ABC$ 的四个全等副本拼成一个大正方形，边长为 $a+b$。大正方形面积等于四个三角形面积之和加上中间小正方形（边长 $c$）的面积：$(a+b)^2 = 4 \cdot \frac{1}{2}ab + c^2$。展开左边 $a^2+2ab+b^2 = 2ab+c^2$，约去 $2ab$ 得 $a^2+b^2=c^2$。

### 8.5.2 毕氏定理的逆定理 (Converse of Pythagoras' Theorem)

- **定理 8.11 (毕氏定理的逆定理 / Converse of Pythagoras' Theorem)**
  若三角形的三边长度满足 $a^2 + b^2 = c^2$，则该三角形为直角三角形，且边长为 $c$ 的边所对的角为直角。

  **证明思路：** 构造另一个直角三角形，两直角边为 $a, b$，则其斜边 $\sqrt{a^2+b^2}$。但由条件 $a^2+b^2=c^2$ 知斜边长等于 $c$。原三角形与此直角三角形的三边均相等，由 SSS 知两三角形全等，故原三角形亦为直角三角形。

---

## 8.6 全等与相似 (Congruence and Similarity)

### 8.6.1 全等三角形 (Congruent Triangles)

- **定义 8.20 (全等 / Congruence, $\cong$)**
  两个图形（尤其是三角形）的形状和大小完全一样，即它们可以通过平移、旋转或反射而完全重合。此时对应边相等，对应角相等。

  记作 $\triangle ABC \cong \triangle DEF$。书写时须严格对应顶点次序。

- **定理 8.12 (全等三角形的判定条件 / Congruence Conditions)**
  以下任何一组条件成立时，两个三角形全等：

  | 条件 | 含义 | 所需对应元素 |
  |------|------|-------------|
  | **SSS** | Side-Side-Side | 三边对应相等 |
  | **SAS** | Side-Angle-Side | 两边及其夹角对应相等 |
  | **ASA** | Angle-Side-Angle | 两角及其夹边对应相等 |
  | **AAS** | Angle-Angle-Side | 两角及其中一角的对边对应相等 |
  | **RHS** | Right angle-Hypotenuse-Side | 直角三角形中，斜边及一条直角边对应相等 |

  **Remark:** RHS 是 SAS 在直角三角形中的特例——已知直角、斜边、一直角边相当于 SAS（直角为夹角）。

### 8.6.2 相似三角形 (Similar Triangles)

- **定义 8.21 (相似 / Similarity, $\sim$)**
  两个图形形状相同，但大小可以不同。对于两个相似三角形：
  - 对应角相等。
  - 对应边成比例（设比例常数为 $k > 0$，即相似比）。

  记作 $\triangle ABC \sim \triangle DEF$。

- **定理 8.13 (相似三角形的判定条件 / Similarity Conditions)**
  | 条件 | 含义 |
  |------|------|
  | **AAA** (或 **AA**) | 三个角对应相等（两个角对应相等即已足够，因内角和固定） |
  | **三边成比例** (3 sides proportional) | 三组对应边成相同比例 |
  | **两边成比例且夹角相等** (ratio of 2 sides, inc. $\angle$) | 两组对应边成比例，且两边的夹角相等 |

- **定理 8.14 (全等与相似的关系 / Relationship)**
  全等是相似在相似比 $k = 1$ 时的特例。即：
  $$\cong \ \subset \ \sim$$

---

## 8.7 圆形及扇形 (Circles and Sectors)

### 8.7.1 圆的基本概念 (Basic Concepts of a Circle)

- **定义 8.22 (圆 / Circle)**
  平面上到定点（圆心，$O$）的距离等于定长（半径，$r$）的所有点的集合。
  - **半径 (Radius, $r$)：** 圆心到圆周上任意点的距离。
  - **直径 (Diameter, $d$)：** 穿过圆心且两端在圆周上的线段长度，$d = 2r$。
  - **圆周 (Circumference, $C$)：** 圆的一周长度，$C = 2\pi r$（或 $\pi d$）。
  - **弦 (Chord)：** 连接圆周上任意两点的线段。
  - **弧 (Arc)：** 圆周的一部分。

### 8.7.2 弧长 (Arc Length)

- **定理 8.15 (弧长公式 / Arc Length Formula)**
  设圆半径为 $r$，扇形圆心角为 $\theta$，则该弧的长度 $L$ 为：
  $$L = 2\pi r \times \frac{\theta}{360^\circ}$$

  **证明：** 整个圆周的长度为 $2\pi r$，对应圆心角 $360^\circ$。弧长与其对应的圆心角成正比，故 $L : 2\pi r = \theta : 360^\circ$。

### 8.7.3 扇形面积 (Sector Area)

- **定理 8.16 (扇形面积公式 / Sector Area Formula)**
  设圆半径为 $r$，扇形圆心角为 $\theta$，则该扇形的面积 $A$ 为：
  $$A = \pi r^2 \times \frac{\theta}{360^\circ}$$

  **证明：** 整个圆的面积为 $\pi r^2$，对应圆心角 $360^\circ$。扇形面积与其圆心角成正比。

  **Remark：** 学生常犯错误——在计算扇形周长时忘记加上两条半径：扇形周长 $= L + 2r$。

---

## 8.8 图形的对称性 (Symmetry of Figures)

### 8.8.1 反射对称（轴对称） (Reflectional Symmetry)

- **定义 8.23 (轴对称 / Reflectional Symmetry / Line Symmetry)**
  图形能沿某一直线（对称轴）折叠后，两部分能完全重合，则称该图形关于此直线具有轴对称性。
  - 等边三角形有 $3$ 条对称轴。
  - 正方形有 $4$ 条对称轴。
  - 等腰三角形仅有 $1$ 条对称轴（底边的垂直平分线／顶角的角平分线）。
  - 不等边三角形没有对称轴。

### 8.8.2 旋转对称 (Rotational Symmetry)

- **定义 8.24 (旋转对称 / Rotational Symmetry)**
  图形绕某定点（旋转中心）旋转一定角度后（$< 360^\circ$），能与自身完全重合，则称该图形具有旋转对称性。
  - **$n$ 重旋转对称 ($n$-fold Rotational Symmetry)：** 旋转 $\dfrac{360^\circ}{n}$ 后与自身重合。
  - 正方形具有 $4$ 重旋转对称。
  - 等边三角形具有 $3$ 重旋转对称。

### 8.8.3 中心对称 (Point Symmetry)

- **定义 8.25 (中心对称 / Point Symmetry)**
  旋转 $180^\circ$ 后能与自身重合的图形。即具有 $2$ 重旋转对称。
  - 平行四边形具有中心对称性（旋转 $180^\circ$ 后与自身重合）。

---

## 8.9 三角形的心 (Centers of a Triangle)

- **定义 8.26 (三角形的四心 / Four Centers of a Triangle)**

| 名称 (中) | 名称 (英) | 符号 | 构造线 | 关键性质 |
|----------|----------|------|--------|---------|
| **重心** | Centroid | $G$ | 三条**中线** (Medians) | 将中线分为 $2:1$（顶点到重心：重心到中点 $= 2:1$） |
| **内心** | Incenter | $I$ | 三条**角平分线** (Angle Bisectors) | 到三条边的距离相等；为**内切圆**圆心 |
| **外心** | Circumcenter | $O$ | 三条**垂直平分线** (Perpendicular Bisectors) | 到三个顶点的距离相等；为**外接圆**圆心 |
| **垂心** | Orthocenter | $H$ | 三条**高** (Altitudes) | 垂心可在三角形外（钝角三角形） |

**Remark：** 区分内心与外心的记忆方法——
- **内**心 $\to$ **内**切圆 $\to$ 在三角形内 $\to$ 到各**边**距离相等。
- **外**心 $\to$ **外**接圆 $\to$ 包在三角形外 $\to$ 到各**顶点**距离相等。

---

## 第八章总结

1. **几何基础：** 欧几里得五公理奠定平面几何的逻辑基石。点、线、面为基本对象；角以“度”为单位，周角 $=360^\circ$。
2. **平行线与角：** 同位角相等、内错角相等、同侧内角互补——三者互为充要条件，既是平行线的性质也是判定。
3. **三角形：** 内角和 $=180^\circ$（定理 8.2）；外角 $=$ 不相邻两内角之和（定理 8.3）；等腰三角形底角相等（定理 8.4）；三角不等式 $a+b>c$（定理 8.5）。
4. **多边形：** 内角和 $=(n-2) \times 180^\circ$（定理 8.6）；外角和恒为 $360^\circ$（定理 8.7）。
5. **特殊四边形：** 平行四边形对边／对角相等、对角线互相平分（定理 8.8）；矩形、菱形、正方形层层递进；菱形与矩形的交集为正方形。
6. **毕氏定理：** $a^2+b^2=c^2$（定理 8.10）及其逆定理（定理 8.11），是计算直角三角形边长的核心工具。
7. **全等与相似：** 全等（$\cong$）的判定为 SSS、SAS、ASA、AAS、RHS；相似（$\sim$）的判定为 AA／三边成比例／两边成比例且夹角相等。全等是相似比 $k=1$ 的特例。
8. **圆形及扇形：** 圆周 $C=2\pi r$，弧长 $L=2\pi r \times \theta/360^\circ$（定理 8.15），扇形面积 $A=\pi r^2 \times \theta/360^\circ$（定理 8.16）。
9. **对称性：** 轴对称（折叠重合）、旋转对称（绕点旋转重合）、中心对称（$180^\circ$ 旋转对称）。
10. **三角形的心：** 重心（中线）、内心（角平分线）、外心（垂直平分线）、垂心（高）。

---

## 章节练习

（待编写）

---

### 备课建议

1. **平行线的角关系是“倒角”的基础：**
   整章的几何证明题几乎都在“倒角”（Angle Chasing）——利用平行线的角关系、三角形的内角和外角定理，将已知角与未知角联系起来。建议先用简单的平行线图形做大量口头练习，让学生熟练“看到平行线立刻反应出哪些角相等或互补”。

2. **等腰三角形三线合一：**
   等腰三角形的顶角平分线、底边垂直平分线、底边中线三线重合（推论 8.4），这是全等证明中“辅助线”的核心来源之一。遇到等腰三角形而苦无对应条件时，画这条线往往就是突破口。

3. **毕氏定理与逆定理的区分：**
   毕氏定理用于已知直角三角形求边长；逆定理用于已知三边长判断是否为直角三角形。学生经常在证明题中混淆两者的使用方向，建议明确区分“正定理 = 性质”、“逆定理 = 判定”。

4. **全等与相似的书写规范：**
   在书写 $\triangle ABC \cong \triangle DEF$ 时必须严格对应顶点次序——$A \leftrightarrow D$、$B \leftrightarrow E$、$C \leftrightarrow F$。次序错误虽然不影响图形的全等／相似性，但会导致阅卷者难以核对对应边和对应角。这是 DSE 扣分重灾区。

5. **扇形题目的易错点：**
   计算扇形周长时，学生容易只计算弧长而遗漏两条半径（$L + 2r$）。建议在每次涉及扇形周长的练习中刻意强调这一点，形成条件反射。

6. **三角形的心之记忆与区分：**
   内心和外表是学生最易混淆的两个心。可用“内 $\to$ 内切圆 $\to$ 与边等距”、“外 $\to$ 外接圆 $\to$ 与顶点等距”的对联进行记忆。同时提醒：垂心对于钝角三角形在三角形外部。
