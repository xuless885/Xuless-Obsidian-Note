前置：[[Ch08 平面几何 (I)]]；[[Ch16 集合论]]

**模块目标：** 在 Ch08 全等三角形、相似三角形、四边形性质的基础上，系统建立圆的几何理论。全章分为三个层次：(1) 圆的基本性质——弧、弦与角的关系，以及圆内接四边形的性质与判别（含四点共圆）；(2) 切线几何——切线与半径的垂直关系、外点切线定理，以及交错弓形角定理（弦切角定理）；(3) 三角形的四心——重心、外心、内心、垂心的定义、构造与核心性质。

---

## 29.1 圆的基本知识 (Basic Properties of Circles)

> 本节建立圆的基本几何概念，从弧与弦的关系出发，逐步引入圆上的角（圆心角、圆周角），最终推导出圆内接四边形的完整理论——包括性质与判别条件（四点共圆判别法）。这是 DSE 演绎几何中最核心的课题。

### 29.1.1 圆上的弧与弦 (Arcs and Chords)

- **定义 29.1 (圆 / Circle)**
  平面上到一定点（**圆心**，center）的距离等于定长（**半径**，radius）的所有点的集合。记圆心为 $O$、半径为 $r$ 的圆为 $C(O, r)$：
  $$C(O, r) = \{P \in \mathbb{R}^2 : OP = r\}$$

- **定义 29.2 (弦、弧、弓形与扇形 / Chord, Arc, Segment, Sector)**
  设 $A, B$ 为圆上两点：
  - **弦 (Chord)：** 连接 $A, B$ 的线段 $AB$。
  - **弧 (Arc)：** 圆周上 $A$ 至 $B$ 的两段连续曲线之一。记较短的弧为**劣弧** $\widehat{AB}$，较长的弧为**优弧** $\widehat{ACB}$（$C$ 为优弧上另一点）。
  - **弓形 (Segment)：** 弦与其所对之弧围成的区域。
  - **扇形 (Sector)：** 两条半径与其所截之弧围成的区域。

- **定义 29.3 (弦心距 / Distance from Center to Chord)**
  圆心到一条弦的垂直距离，称为该弦的**弦心距**。

---

- **定理 29.1 (等弦对等弧 / Equal Chords, Equal Arcs)**
  在同圆（或等圆）中：
  1. 等弦所对的劣弧相等（长度相等）。
  2. 等弧所对的弦相等。

  **证明：** 设弦 $AB = CD$。连接半径 $OA, OB, OC, OD$。在 $\triangle OAB$ 与 $\triangle OCD$ 中，$OA = OC = r$，$OB = OD = r$，$AB = CD$（已知）。由 SSS 判定，$\triangle OAB \cong \triangle OCD$。因此 $\angle AOB = \angle COD$。弧长与圆心角成正比（弧长 $= r\theta$，其中 $\theta$ 为圆心角的弧度），故 $\widehat{AB} = \widehat{CD}$。逆命题同理——若 $\widehat{AB} = \widehat{CD}$，则 $\angle AOB = \angle COD$，由 SAS 得 $\triangle OAB \cong \triangle OCD$，故 $AB = CD$。

- **推论 29.1 (等弦的弦心距相等 / Equal Chords Equidistant from Center)**
  在同圆（或等圆）中，等弦的弦心距相等；反之，弦心距相等的弦等长。

  **证明：** 设 $M$ 为弦 $AB$ 的中点，由定理 29.2（见下文）知 $OM \perp AB$。在 $\triangle OAM$ 中，$OM^2 = r^2 - AM^2 = r^2 - (AB/2)^2$。若 $AB = CD$，则 $OM = ON$（$N$ 为 $CD$ 的中点），即弦心距相等。反之亦然。

- **定理 29.2 (圆心至弦的垂线平分弦 / Perpendicular from Center to Chord)**
  从圆心到一条弦的垂线平分该弦。

  **证明：** 设弦 $AB$，$M$ 为自圆心 $O$ 到 $AB$ 的垂足（即 $OM \perp AB$）。连接 $OA, OB$。在 $\triangle OAM$ 与 $\triangle OBM$ 中：
  - $OA = OB = r$（半径）
  - $OM$ 为公共边
  - $\angle OMA = \angle OMB = 90^\circ$
  由 RHS 判定，$\triangle OAM \cong \triangle OBM$。因此 $AM = BM$，即 $M$ 为 $AB$ 的中点。

- **推论 29.2 (弦的垂直平分线经过圆心)**
  一条弦的垂直平分线必定经过圆心。

  **证明：** 设 $M$ 为弦 $AB$ 的中点。连接 $OM$。由 $\triangle OAM \cong \triangle OBM$（SSS：$OA=OB=r$，$AM=BM$，$OM$ 公共），得 $\angle OMA = \angle OMB = 90^\circ$，故 $OM \perp AB$。因此过 $M$ 且垂直于 $AB$ 的直线即为 $OM$，经过 $O$。

---

### 29.1.2 圆上的角 (Angles in a Circle)

> 本节讨论圆上两类核心的角——**圆心角**（顶点在圆心）与**圆周角**（顶点在圆周上）——以及它们之间的基本关系。

- **定义 29.4 (圆心角 / Angle at the Center)**
  顶点在圆心，两边为半径的角。$\angle AOB$ 称为弧 $\widehat{AB}$（劣弧或优弧）所对的圆心角。

- **定义 29.5 (圆周角 / Angle at the Circumference)**
  顶点在圆周上，两边均为弦的角。$\angle APB$（$P$ 在圆周上，$P \neq A, B$）称为弧 $\widehat{AB}$ 所对的圆周角。

- **定理 29.3 (圆心角定理 / Angle at the Center Theorem)**
  同弧所对的圆心角等于圆周角的两倍：
  $$\angle AOB = 2\angle APB$$
  其中 $O$ 为圆心，$P$ 为圆周上任意一点（$P \neq A, B$）。

  **证明：** 分三种情况处理。

  **情况 1：** $O$ 在 $\angle APB$ 的内部。延长 $PO$ 交圆周于 $Q$。由于 $OA = OP = r$，$\triangle OAP$ 为等腰三角形，故 $\angle OAP = \angle OPA = \alpha$。外角 $\angle AOQ = \angle OAP + \angle OPA = 2\alpha$。同理，设 $\angle OPB = \beta$，则 $\angle BOQ = 2\beta$。因此
  $$\angle AOB = \angle AOQ + \angle BOQ = 2\alpha + 2\beta = 2(\alpha + \beta) = 2\angle APB$$

  **情况 2：** $O$ 在 $\angle APB$ 的外部。不失一般性，设 $P, O$ 在弦 $AB$ 的同侧，且 $O$ 在 $\angle APB$ 的外部。延长 $PO$ 交圆周于 $Q$。设 $\angle OPB = \beta$，$\angle OPA = \alpha$（其中 $\alpha > \beta$）。则 $\angle APB = \alpha - \beta$。在等腰 $\triangle OAP$ 与 $\triangle OBP$ 中，
  $$\angle AOQ = 2\alpha, \quad \angle BOQ = 2\beta$$
  $$\angle AOB = \angle AOQ - \angle BOQ = 2\alpha - 2\beta = 2(\alpha - \beta) = 2\angle APB$$

  **情况 3：** $O$ 在 $\angle APB$ 的边上（即 $P$ 在通过 $O$ 的直径上）。此为情况 2 的退化情况（$\beta = 0$ 或 $\alpha = 0$），结论仍成立。

- **推论 29.3 (同弓形内的圆周角相等 / Angles in the Same Segment)**
  同弧（或等弧）所对的所有圆周角相等：
  $$\angle APB = \angle AQB$$
  其中 $P, Q$ 为圆周上位于弦 $AB$ 同侧的任意两点。

  **证明：** 由定理 29.3，$\angle APB = \frac{1}{2}\angle AOB = \angle AQB$。

  **Remark：** 推论 29.3 是 DSE 中“倒角”（angle chasing）最频繁使用的结论之一。其几何直观为：顶点在圆周上沿着同一弧滑动时，视角保持不变。

- **推论 29.4 (半圆上的圆周角 / Angle in a Semicircle)**
  直径所对的圆周角为直角：
  $$AB \text{ 为直径} \implies \angle APB = 90^\circ$$

  **证明：** 若 $AB$ 为直径，则 $O$ 为 $AB$ 的中点，$\angle AOB = 180^\circ$。由定理 29.3，
  $$\angle APB = \frac{1}{2}\angle AOB = \frac{1}{2} \times 180^\circ = 90^\circ$$

- **推论 29.5 (半圆判别——逆命题 / Converse of Angle in a Semicircle)**
  若 $\angle APB = 90^\circ$，则 $AB$ 为过 $A, B, P$ 三点之圆的直径。

  **证明：** 设 $\triangle ABP$ 的外接圆（过三点之圆唯一，见定理 29.10）圆心为 $O$。由定理 29.3，$\angle AOB = 2\angle APB = 180^\circ$，故 $A, O, B$ 共线，且 $OA = OB = r$，故 $AB = 2r$ 为直径。

  **Remark：** 判定直角三角形最长边为外接圆直径——此为 DSE 几何证明题中建立垂直关系的有力工具。

---

### 29.1.3 内接四边形 (Cyclic Quadrilaterals)

> 本节建立圆内接四边形的完整理论——先给出性质（对角互补、外角等于内对角），再建立判别条件（四点共圆的四种判定方法）。这是 DSE 非基础课题的核心内容。

- **定义 29.6 (圆内接四边形 / Cyclic Quadrilateral)**
  四个顶点均在同一圆上的四边形。该圆称为此四边形的**外接圆 (Circumcircle)**。

- **定理 29.4 (对角互补 / Opposite Angles Supplementary)**
  圆内接四边形的对角之和为 $180^\circ$：
  $$\angle A + \angle C = 180^\circ, \quad \angle B + \angle D = 180^\circ$$

  **证明：** 设四边形 $ABCD$ 内接于圆 $O$。$\angle A$（即 $\angle DAB$）所对的弧为 $\widehat{BCD}$（不含 $A$ 的那段弧）。$\angle C$（即 $\angle BCD$）所对的弧为 $\widehat{BAD}$（不含 $C$ 的那段弧）。由定理 29.3，
  $$\angle A = \frac{1}{2}\angle BOD_{\text{(reflex)}}, \quad \angle C = \frac{1}{2}\angle BOD_{\text{(acute)}}$$
  其中 $\angle BOD_{\text{(reflex)}}$ 为优角（$> 180^\circ$），$\angle BOD_{\text{(acute)}}$ 为锐角（$< 180^\circ$），且
  $$\angle BOD_{\text{(reflex)}} + \angle BOD_{\text{(acute)}} = 360^\circ$$
  因此 $\angle A + \angle C = \frac{1}{2} \times 360^\circ = 180^\circ$。同理可证 $\angle B + \angle D = 180^\circ$。

  **Remark：** 此证明的关键在于弧 $\widehat{BCD}$ 与 $\widehat{BAD}$ 合起来是整个圆周——对应的两个圆心角之和为 $360^\circ$。此为“对角互补”的几何本质。

- **定理 29.5 (外角等于内对角 / Exterior Angle = Interior Opposite Angle)**
  圆内接四边形的任一外角等于其内对角：
  $$\angle CBE = \angle ADC$$
  其中 $\angle CBE$ 为延长 $AB$ 后所得的 $\angle B$ 的外角。

  **证明：** $\angle CBE$ 为 $\angle ABC$ 的外角，故 $\angle ABC + \angle CBE = 180^\circ$。由定理 29.4，$\angle ABC + \angle ADC = 180^\circ$。两式相减即得 $\angle CBE = \angle ADC$。

---

#### 四点共圆的判别条件 (Tests for Concyclic Points) ⬆️

> 以下四个判别条件为 DSE 非基础课题。它们是证明四点共圆（进而应用圆性质推导其他结论）的核心工具。

- **定理 29.6 (四点共圆判别法 / Tests for Concyclic Points)** ⬆️
  设 $A, B, C, D$ 为平面上四点。以下任一条件成立时，$A, B, C, D$ 四点共圆：

  **判别法 1 (同底同侧等角法)：** 若 $C, D$ 在 $AB$ 的同侧，且 $\angle ACB = \angle ADB$，则 $A, B, C, D$ 四点共圆。

  **证明：** 作过 $A, B, C$ 三点的圆（见定理 29.10）。若 $D$ 亦在此圆上，则结论成立。若不然，设 $D'$ 为此圆与直线 $BD$（延长线）的交点（$D' \neq D$）。由推论 29.3，$\angle AD'B = \angle ACB$。但已知 $\angle ADB = \angle ACB$，故 $\angle ADB = \angle AD'B$。然而 $D, D'$ 均在 $AB$ 同侧，若 $D \neq D'$，此不可能（因固定底边 $AB$ 与顶角大小的点之轨迹为对称的两段弧，同侧仅有一段）。故 $D = D'$，四点共圆。

  **判别法 2 (对角互补法)：** 若 $\angle A + \angle C = 180^\circ$（或 $\angle B + \angle D = 180^\circ$），则 $A, B, C, D$ 四点共圆。

  **证明：** 作过 $A, B, C$ 三点的圆。设 $D'$ 为此圆与直线 $AD$（延长线）的交点。由定理 29.4，$\angle B + \angle D' = 180^\circ$。已知 $\angle B + \angle D = 180^\circ$，故 $\angle D' = \angle D$。若 $D \neq D'$，则与三角形的外角性质矛盾。故 $D = D'$，四点共圆。

  **判别法 3 (外角等于内对角法)：** 若 $\angle CBE = \angle D$（其中 $\angle CBE$ 为 $\angle B$ 的外角，$E$ 在 $AB$ 的延长线上），则 $A, B, C, D$ 四点共圆。

  **证明：** $\angle CBE + \angle ABC = 180^\circ$（邻角）。若 $\angle CBE = \angle D$，则 $\angle ABC + \angle D = 180^\circ$。由判别法 2，四点共圆。

  **判别法 4 (等弧所对等角之逆)：** 若 $C, D$ 在 $AB$ 的同侧，且 $\angle ACB = \angle ADB$，则 $A, B, C, D$ 四点共圆。（此为判别法 1 的等价表述。）

  **Remark：** 判别法 1（同底同侧等角）是 DSE 中最直观且最常用的四点共圆判别方式；判别法 2（对角互补）则适用于已知角度关系可直接判定对角之和为 $180^\circ$ 的场合。

---

## 29.2 涉及切线的几何 (Tangent Geometry)

> 本节研究直线与圆相切时的几何关系。从切线的基本定义出发，建立切线垂直半径定理、外点切线定理，以及交错弓形角定理（弦切角定理）。这些均为 DSE 非基础课题。

- **定义 29.7 (切线 / Tangent)**
  若一条直线与圆恰好有一个公共点，则该直线称为圆的**切线**，公共点称为**切点 (Point of Tangency)**。

  **Remark：** “恰有一个公共点”是切线的几何定义。其解析等价条件为：将直线方程代入圆方程所得二次方程的判别式 $\Delta = 0$。

- **定理 29.7 (切线垂直半径 / Tangent $\perp$ Radius)** ⬆️
  圆的切线垂直于过切点的半径：
  $$AB \text{ 切圆 } O \text{ 于 } P \implies OP \perp AB$$

  **证明：** 设 $AB$ 切圆 $O$ 于 $P$。若 $OP$ 不垂直于 $AB$，则自 $O$ 引 $AB$ 的垂线，设垂足为 $Q$（$Q \neq P$）。在 $\triangle OQP$ 中，$\angle OQP = 90^\circ$，故 $OQ < OP = r$。但 $OQ$ 为圆心到直线 $AB$ 的距离——若 $OQ < r$，则直线 $AB$ 与圆相交于两点（对称于 $Q$），与切线定义矛盾。因此 $OP \perp AB$。

- **推论 29.6 (逆命题 / Converse: Perpendicular $\implies$ Tangent)** ⬆️
  若过圆上一点 $P$ 的直线垂直于半径 $OP$，则该直线为圆的切线。

  **证明：** 设过 $P$ 的直线 $\ell$ 满足 $\ell \perp OP$。若 $\ell$ 与圆尚有另一交点 $Q \neq P$，则在等腰 $\triangle OPQ$（$OP = OQ = r$）中，$OP \perp \ell$ 且 $Q \in \ell$，但 $OQ$ 亦为 $r$——此矛盾。故 $\ell$ 与圆仅交于 $P$，$\ell$ 为切线。

- **定理 29.8 (外点切线定理 / Two-Tangent Theorem)** ⬆️
  从圆外一点 $T$ 引圆的两条切线 $TA$ 和 $TB$（$A, B$ 为切点），则：
  1. $TA = TB$（切线段等长）；
  2. $OT$ 平分 $\angle ATB$；
  3. $OT$ 平分 $\angle AOB$。

  **证明：** 连接 $OA$ 与 $OB$。由定理 29.7，$OA \perp TA$ 且 $OB \perp TB$。在 $\triangle OAT$ 与 $\triangle OBT$ 中：
  - $OA = OB = r$
  - $OT$ 为公共斜边
  - $\angle OAT = \angle OBT = 90^\circ$
  由 RHS 判定，$\triangle OAT \cong \triangle OBT$。
  因此 $TA = TB$（对应边），$\angle ATO = \angle BTO$（$OT$ 平分 $\angle ATB$），$\angle AOT = \angle BOT$（$OT$ 平分 $\angle AOB$）。

  **Remark：** 外点切线等长定理是 DSE 中计算线段长度及证明全等的常用工具。其几何直观为：从同一外点引出的两条切线像“手臂”般对称于连接外点与圆心的直线。

- **定理 29.9 (交错弓形角定理 / Alternate Segment Theorem)** ⬆️
  弦切角等于其所夹弧所对的圆周角（即交错弓形内的圆周角）：
  $$\angle BAY = \angle ACB$$
  其中 $XY$ 切圆于 $A$，$AB$ 为弦，$C$ 为交错弓形（不含 $A$ 的弧 $\widehat{AB}$ 所对的弓形）上的任意一点。

  **证明：** 考虑最一般的情况。设 $O$ 为圆心，连接 $OA, OB$。由定理 29.7，$OA \perp XY$，故 $\angle BAY = 90^\circ - \angle OAB$。

  在等腰 $\triangle OAB$ 中，$OA = OB$，故 $\angle OAB = \frac{1}{2}(180^\circ - \angle AOB) = 90^\circ - \frac{1}{2}\angle AOB$。

  因此 $\angle BAY = 90^\circ - (90^\circ - \frac{1}{2}\angle AOB) = \frac{1}{2}\angle AOB$。

  由定理 29.3（圆心角定理），$\frac{1}{2}\angle AOB = \angle ACB$（$C$ 在交错弓形内）。

  故 $\angle BAY = \angle ACB$。同理可证 $\angle BAX = \angle ADB$（$D$ 在另一交错弓形内）。

  **Remark：** 交错弓形角定理是 DSE 中最容易被学生“视而不见”的定理。其几何直观为：切线与弦的夹角“等于”该弦所对的另一侧弓形中的圆周角。建议在练习中以多个不同方向的变式图形进行训练。

---

## 29.3 三角形的四心问题 (Four Centers of a Triangle)

> 本节系统定义并讨论三角形的四个核心点——重心、外心、内心、垂心——各自的构造方式（三线共点）与核心性质。这些概念在初中阶段已有初步接触（初中学习单位 24），本章在圆的理论基础上进行深化与统一。

### 29.3.1 四心的定义与基本性质

- **定义 29.8 (重心（形心） / Centroid $G$)**
  三角形三条**中线 (Medians)** 的交点。中线为连接顶点与对边中点的线段。

- **定理 29.10 (重心定理 / Centroid Theorem)**
  重心将每条中线分为 $2:1$ 的比（顶点到重心距离 $:$ 重心到对边中点距离 $= 2:1$）：
  $$AG : GM_a = BG : GM_b = CG : GM_c = 2 : 1$$
  其中 $M_a, M_b, M_c$ 分别为边 $BC, CA, AB$ 的中点。

  **证明：** 设 $M_a$ 为 $BC$ 的中点，$M_b$ 为 $CA$ 的中点。连接 $M_aM_b$。由中点定理（Ch08），$M_aM_b \parallel AB$ 且 $M_aM_b = \frac{1}{2}AB$。

  中线 $AM_a$ 与 $BM_b$ 交于 $G$。在 $\triangle GAB$ 与 $\triangle GM_aM_b$ 中：
  - $M_aM_b \parallel AB$，故 $\angle GM_aM_b = \angle GAB$、$\angle GM_bM_a = \angle GBA$（内错角）
  - 因此 $\triangle GAB \sim \triangle GM_aM_b$（AA）
  - 相似比为 $AB : M_aM_b = 2 : 1$

  故 $AG : GM_a = 2 : 1$、$BG : GM_b = 2 : 1$。同理可证第三条中线 $CM_c$ 亦经过 $G$，且 $CG : GM_c = 2 : 1$。

  **Remark：** 重心是三角形的物理重心（均匀密度薄板的质心）。此为“重心”名称的物理来源。三中线共点亦可用 Ceva 定理证明，惟 DSE 范围内以中点定理 + 相似三角形的证明更为直接。

---

- **定义 29.9 (外心 / Circumcenter $O$)**
  三角形三条**垂直平分线 (Perpendicular Bisectors)** 的交点。

- **定理 29.11 (外心定理 / Circumcenter Theorem)**
  外心到三角形三个顶点的距离相等：
  $$OA = OB = OC$$
  此公共距离即为三角形**外接圆 (Circumcircle)** 的半径 $R$。

  **证明：** 设 $O$ 为边 $AB$ 与边 $BC$ 的垂直平分线的交点。由于 $O$ 在 $AB$ 的垂直平分线上，由垂直平分线的性质（Ch08），$OA = OB$。由于 $O$ 亦在 $BC$ 的垂直平分线上，$OB = OC$。故 $OA = OB = OC$。因此 $O$ 亦在 $CA$ 的垂直平分线上——三条垂直平分线共点。

  **Remark：** 锐角三角形的外心在三角形内部；直角三角形的外心在斜边中点；钝角三角形的外心在三角形外部。此可由推论 29.5 直接推导——斜边为直径时，其垂直平分线交点即为斜边中点。

---

- **定义 29.10 (内心 / Incenter $I$)**
  三角形三条**角平分线 (Angle Bisectors)** 的交点。

- **定理 29.12 (内心定理 / Incenter Theorem)**
  内心到三角形三条边的距离相等：
  $$d(I, BC) = d(I, CA) = d(I, AB)$$
  此公共距离即为三角形**内切圆 (Incircle)** 的半径 $r$。

  **证明：** 设 $I$ 为 $\angle A$ 与 $\angle B$ 的角平分线的交点。由于 $I$ 在 $\angle A$ 的角平分线上，由角平分线的性质（Ch08），$I$ 到 $AB$ 与 $AC$ 的距离相等。由于 $I$ 亦在 $\angle B$ 的角平分线上，$I$ 到 $BA$ 与 $BC$ 的距离相等。因此 $I$ 到三边的距离均相等。由此 $I$ 亦在 $\angle C$ 的角平分线上——三条角平分线共点。

  **Remark：** 内心**恒在三角形内部**（无论锐角、直角、钝角三角形）。这是内心与外心的重要区别。

  **定理 29.13 (内切圆面积公式 / Incircle Area Formula)**
  设三角形面积为 $\Delta$，半周长为 $s = \frac{a+b+c}{2}$，内切圆半径为 $r$，则：
  $$\Delta = rs$$

  **证明：** 连接 $IA, IB, IC$，将 $\triangle ABC$ 分解为三个子三角形：$\triangle IBC, \triangle ICA, \triangle IAB$。每个子三角形以 $I$ 到对应边的距离为高，故
  $$\Delta = \frac{1}{2}ar + \frac{1}{2}br + \frac{1}{2}cr = \frac{1}{2}(a+b+c)r = rs$$

  **Remark：** 此公式与希罗公式（Ch14）结合可求得一般三角形的内切圆半径：$r = \frac{\Delta}{s} = \frac{\sqrt{s(s-a)(s-b)(s-c)}}{s}$。

---

- **定义 29.11 (垂心 / Orthocenter $H$)**
  三角形三条**高 (Altitudes)**（顶点到对边的垂线）的交点。

- **定理 29.14 (垂心定理 / Orthocenter Theorem)**
  锐角三角形的三条高共点（交于垂心）。

  **证明：** 设 $\triangle ABC$ 为锐角三角形。过 $A, B, C$ 分别作对边的平行线，构成一个新三角形 $A'B'C'$（其中 $B'C' \parallel BC$ 且过 $A$，等等）。则 $ABC$ 为 $A'B'C'$ 的中点三角形（因平行四边形的性质）。$A$ 为 $B'C'$ 的中点，$B$ 为 $C'A'$ 的中点，$C$ 为 $A'B'$ 的中点。

  $\triangle ABC$ 中自 $A$ 引的高垂直于 $BC$，由于 $B'C' \parallel BC$，该高亦垂直于 $B'C'$。但 $A$ 为 $B'C'$ 的中点，故该高即为 $B'C'$ 的垂直平分线。同理，$\triangle ABC$ 的三条高即为 $\triangle A'B'C'$ 的三条垂直平分线。由定理 29.11，三垂直平分线共点，故 $\triangle ABC$ 的三条高亦共点——交点即为垂心 $H$。

  **Remark：** 上述证明仅适用于锐角三角形。对于直角三角形，垂心即为直角顶点；对于钝角三角形，垂心在三角形外部，需以仿射几何的推广方式处理。DSE 阶段重点掌握锐角三角形的垂心即可。

---

### 29.3.2 四心的区别与记忆

> 下表汇总四心的定义与核心性质，以便比较与记忆。

| | **重心 $G$** (Centroid) | **外心 $O$** (Circumcenter) | **内心 $I$** (Incenter) | **垂心 $H$** (Orthocenter) |
|:---|:---|:---|:---|:---|
| **构造线** | 三条中线 | 三条垂直平分线 | 三条角平分线 | 三条高 |
| **核心性质** | $AG : GM_a = 2 : 1$（截距比） | $OA = OB = OC = R$（到顶点等距） | $d(I, \text{各边}) = r$（到边等距） | 利用四点共圆解题 |
| **所在圆** | — | 外接圆 (Circumcircle) | 内切圆 (Incircle) | — |
| **位置** | 恒在三角形内部 | 锐角：内部；直角：斜边中点；钝角：外部 | 恒在三角形内部 | 锐角：内部；直角：直角顶点；钝角：外部 |

**记忆口诀：**
- **重心**：中线交点 $\rightarrow$ “截”——截距比 $2:1$
- **外心**：中垂线交点 $\rightarrow$ “顶等”——到**顶点**距离相等
- **内心**：角平分线交点 $\rightarrow$ “边等”——到**边**距离相等
- **垂心**：高的交点 $\rightarrow$ “垂”——垂直

**区分外心与内心的关键策略：**
- **外**心 $\rightarrow$ **外**接圆 $\rightarrow$ 包在外面 $\rightarrow$ 手拉手围住顶点 $\rightarrow$ 离**顶点**等距
- **内**心 $\rightarrow$ **内**切圆 $\rightarrow$ 在里面 $\rightarrow$ 怕撞到边 $\rightarrow$ 离**边**等距

---

## 第二十九章总结

1. **弧、弦与弦心距（定理 29.1–29.2、推论 29.1–29.2）：** 等弦对等弧，等弦的弦心距相等。圆心至弦的垂线平分该弦；弦的垂直平分线必经圆心。这些是圆的基本对称性质——圆的对称轴为任意直径所在的直线。

2. **圆上的角（定理 29.3、推论 29.3–29.5）：** 圆心角定理（$\angle AOB = 2\angle APB$）是整个圆几何理论的基石——同弓形角相等与半圆角 $= 90^\circ$ 均是它的直接推论。推论 29.5（半圆判别）是建立垂直关系的重要工具。

3. **圆内接四边形（定理 29.4–29.5、定理 29.6）** ⬆️：对角互补（$\angle A + \angle C = 180^\circ$）与外角等于内对角为圆内接四边形的两大性质。四点共圆有四种判别方式——最常用者为“同底同侧等角法”（判别法 1）与“对角互补法”（判别法 2）。这些是 DSE 非基础课题的核心内容。

4. **切线几何（定理 29.7–29.9、推论 29.6）** ⬆️：切线垂直过切点的半径（及其逆命题）；外点引出的两条切线段等长（对称性）；交错弓形角定理——弦切角等于交错弓形内的圆周角。弦切角定理是“倒角”中最容易被遗漏的定理，需刻意训练。

5. **三角形的四心（定理 29.10–29.14）：** 重心为三中线交点（截距比 $2:1$）；外心为三垂直平分线交点（到顶点等距，外接圆圆心）；内心为三角平分线交点（到边等距，内切圆圆心）；垂心为三高交点（锐角三角形内部）。内心公式 $\Delta = rs$ 连结了面积、半周长与内切圆半径，为实用计算工具。

---

## 章节练习

（待编写）

---

### 备课建议

1. **圆心角定理的证明——三种情况必须全部覆盖：**
   定理 29.3 的证明涉及圆心相对于圆周角的三种位置（内部、边上、外部）。许多教科书仅证明“圆心在角内部”一种情况便下结论，这在逻辑上是不完整的。建议教学时至少演示情况 1 与情况 2，情况 3 可留作学生自行验证的练习。

2. **四点共圆——先性质后判别：**
   教学顺序应为：先建立圆内接四边形的性质（对角互补）作为“已知四点共圆时的便利工具”，再引入四点共圆的判别条件作为“证明四点共圆的武器”。这样学生才能理解“为什么要证明四点共圆”——因为一旦确认四点共圆，即可应用圆的所有性质进行推导。

3. **交错弓形角定理——DSE 高频综合考点：**
   弦切角定理经常与圆周角定理、圆内接四边形结合成为 DSE 几何证明题的核心链条。建议在课堂上演示一道典型综合题——从切线出发，利用弦切角定理建立与圆周角的等量关系，再以四点共圆判别法得出新的共圆结论——完整展示“切线 $\to$ 圆周角 $\to$ 对角互补 $\to$ 共圆”的推理链。

4. **四心的记忆——构造线决定一切：**
   避免要求学生死记硬背四心的性质。正确策略为：先让学生熟练四心的**构造方式**（画中线、垂直平分线、角平分线、高），再从构造方式自然推导性质。例如：
   - 内心由角平分线构造 $\to$ 角平分线上任意点到两边等距 $\to$ 内心到三边等距
   - 外心由垂直平分线构造 $\to$ 垂直平分线上任意点到两端点等距 $\to$ 外心到三顶点等距

   这样学生不需要“记忆”性质，而是从构造逻辑中“推导”出性质。

5. **外心与内心——最容易混淆的两心：**
   检查是否混淆的最简单问题：“外心到 _____ 等距？”——若回答“边”，则已混淆。记忆策略见 29.3.2 节的区分方法。建议在课堂上反复以填充题形式快速提问，形成条件反射。

6. **倒角技巧——用 $\alpha, \beta$ 标记未知角：**
   本章综合题往往需要结合圆周角相等、内接四边形对角互补、弦切角定理进行连续倒角。建议教授系统的倒角方法：用 $\alpha, \beta, \gamma$ 等希腊字母标记图中的未知角，利用各定理建立等量关系，最后透过三角形内角和（$180^\circ$）或直线上的邻角（$180^\circ$）列出方程求解。
