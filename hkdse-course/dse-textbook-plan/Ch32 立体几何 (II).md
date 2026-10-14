前置：[[Ch31 解析几何 (II)]]；[[Ch27 解方程方法 (III)]]

**模块目标：** 熟练运用正弦定理与余弦定理作为空间切面问题的计算工具；掌握线与平面的交角（线面角）及两平面的交角（二面角）的定义与求法；理解三垂线定理及其逆定理，建立空间垂直关系的判定能力；探究角锥体顶点投影与底面三角形四心的关系；能综合运用上述工具解决三维空间中的几何应用题。

---

## 32.1 预备知识：解三角形工具箱

> 本节回顾与三维空间切面计算密切相关的三角形公式。这些工具在 Ch09 三角学(I) 中已有完整论述，此处仅以定理形式总结，便于后续引用。

### 32.1.1 三角形面积公式

- **定理 32.1（SAS 面积公式 / Area Formula (SAS)）**
  已知三角形的两边 $a, b$ 及其夹角 $C$，则其面积为：
  $$S = \frac{1}{2}ab \sin C$$

  *Remark：* 同理可得对称公式 $S = \frac{1}{2}bc \sin A = \frac{1}{2}ca \sin B$。此公式在立体几何中尤为常用——当三角形的一边位于两平面的交线上时，$\sin C$ 直接关联到二面角。

- **定理 32.2（海伦公式 / Heron's Formula）**
  已知三角形的三边 $a, b, c$，设半周长 $p = \dfrac{a+b+c}{2}$，则面积为：
  $$S = \sqrt{p(p-a)(p-b)(p-c)}$$

  *Remark：* 海伦公式的优点是不需要计算任何角度。在已知三边长但不便求角的情况下（例如三角锥底面三边均由毕氏定理从空间坐标算出），海伦公式可直接给出面积。

### 32.1.2 正弦定理

- **定理 32.3（正弦定理 / Sine Law）**
  在 $\triangle ABC$ 中，设外接圆半径为 $R$，则：
  $$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$

  **证明：** 见 Ch09 定理 9.x。$\square$

  *使用场景：*“知二角一边”或“知两边及一边的对角”。

### 32.1.3 余弦定理

- **定理 32.4（余弦定理 / Cosine Law）**
  在 $\triangle ABC$ 中：
  $$\begin{aligned}
  a^2 &= b^2 + c^2 - 2bc\cos A \\[4pt]
  \cos A &= \frac{b^2 + c^2 - a^2}{2bc}
  \end{aligned}$$

  **证明：** 见 Ch09 定理 9.x。$\square$

  *使用场景：*“知三边求角”或“知两边夹角求第三边”。在立体几何中，空间对角线的长度、侧棱的长度等常需通过余弦定理求取。

---

## 32.2 三维空间中的几何

> 本节遵循“距离 → 投影 → 垂直 → 角度”的逻辑链。在尚未定义空间角度的前提下，所有定义均以**最短距离**为原始出发点，逐步构建垂直与角度的概念。

### 32.2.1 点到平面的距离与投影

- **定义 32.1（点到平面的距离 / Distance from a Point to a Plane）**
  设 $P$ 为空间中一点，$\alpha$ 为一平面。定义 $P$ 到 $\alpha$ 的**距离**为 $P$ 到 $\alpha$ 上各点的最短距离：
  $$d(P, \alpha) = \min\{\,|PQ| : Q \in \alpha\,\}$$

  由于 $\alpha$ 上的点到 $P$ 的距离没有上界，但必有下界，此最小值唯一存在。

- **定义 32.2（点在平面上的投影 / Projection of a Point onto a Plane）**
  在平面 $\alpha$ 上使 $|PO| = d(P, \alpha)$ 的唯一点 $O$ 称为 $P$ 在 $\alpha$ 上的**投影**（或正投影）。若 $P \in \alpha$，则 $O = P$。

  *直观：* $O$ 是 $\alpha$ 上离 $P$“最近”的点。

- **定理 32.5（投影的基本性质 / Fundamental Property of Projection）**
  设 $O$ 为 $P$ 在平面 $\alpha$ 上的投影，则线段 $PO$ 垂直于 $\alpha$ 上任意一条过 $O$ 的直线。即：对任意 $Q \in \alpha$（$Q \neq O$），在 $\triangle POQ$ 中恒有 $PO \perp OQ$。

  **证明：** （反证法）假设存在 $Q \in \alpha$（$Q \neq O$）使得 $PO \not\perp OQ$。在平面 $POQ$ 中，从 $P$ 向直线 $OQ$ 作垂线，垂足记为 $R$。由于 $R \in OQ \subset \alpha$，故 $R \in \alpha$。但由 2D 几何（Ch08）——点到直线的最短距离为垂线段长——可知 $PR < PO$。这与 $O$ 为 $P$ 到 $\alpha$ 的最短距离点矛盾。因此 $PO \perp OQ$ 对所有 $Q \in \alpha$ 成立。$\square$

  *Remark：* 定理 32.5 是本章的基石。它揭示了“最短距离”与“垂直”之间的内在联系——最短距离点必然满足垂直条件。这一性质使我们可以在距离的基础上定义直线与平面之间的垂直关系。

### 32.2.2 直线与平面的垂直关系

- **定义 32.3（直线与平面垂直 / Line Perpendicular to a Plane）**
  设直线 $l$ 与平面 $\alpha$ 相交于点 $A$。若 $l$ 上任意异于 $A$ 的点 $P$ 在 $\alpha$ 上的投影均为 $A$，则称 $l$ **垂直于** $\alpha$，记作 $l \perp \alpha$。

  *等价表述（由定理 32.5 直接得出）：* $l \perp \alpha$ $\iff$ $l$ 垂直于 $\alpha$ 上所有过交点 $A$ 的直线。

  *Remark：* 此定义将“垂直”还原为最基本的概念——若直线垂直于平面，则直线上的每一点都以交点为唯一的最短距离点。定理 32.5 保证了这一性质与“垂直于所有平面内直线”的等价性。

### 32.2.3 直线在平面上的投影

- **定义 32.4（直线在平面上的投影 / Projection of a Line onto a Plane）**
  设 $l$ 为空间中一直线，$\alpha$ 为一平面。$l$ 上所有点在 $\alpha$ 上的投影的集合，称为 $l$ 在 $\alpha$ 上的**投影**。

  - 若 $l \perp \alpha$，则 $l$ 上所有点的投影均为交点（定义 32.3），故投影为**一点**。
  - 若 $l \not\perp \alpha$，则 $l$ 在 $\alpha$ 上的投影为**一直线**。取 $l$ 上任意不垂直于 $\alpha$ 的两点，其投影的连线即为 $l$ 的投影。
  - 若 $l \subset \alpha$，则投影即为 $l$ 自身。

### 32.2.4 直线与平面的交角（线面角）

- **定义 32.5（线面角 / Angle between a Line and a Plane）**
  设直线 $l$ 与平面 $\alpha$ 相交于点 $A$（$l \not\subset \alpha$）。对于 $l$ 上任意异于 $A$ 的点 $B$，以及 $\alpha$ 上任意异于 $A$ 的点 $Q$，考虑 $\angle BAQ$。定义 $l$ 与 $\alpha$ 的**交角**（线面角）为所有此类夹角的最小值：
  $$\theta = \min\{\,\angle BAQ : B \in l,\; B \neq A;\; Q \in \alpha,\; Q \neq A\,\}$$

- **定理 32.6（线面角的刻画 / Characterization of Line-Plane Angle）**
  在上述设定下，设 $O$ 为 $l$ 上某一点 $B$（$B \neq A$）在 $\alpha$ 上的投影。则：
  1. 线面角 $\theta = \angle BAO$，即 $\theta$ 在 $AQ$ 取为投影线 $AO$ 时取得最小值。
  2. $\theta = 90^\circ \iff l \perp \alpha$。
  3. $\theta = 0^\circ \iff l \parallel \alpha$（或 $l \subset \alpha$）。

  **证明思路：** (1) 对于 $\alpha$ 上任意 $Q \neq A$，在 $\triangle BAQ$ 中比较 $\angle BAQ$ 与 $\angle BAO$。由定理 32.5，$BO \perp$ 平面 $\alpha$，故 $BO \perp AQ$。在直角 $\triangle BOA$ 与直角 $\triangle BOQ$ 中利用三角比关系可证 $\angle BAQ \ge \angle BAO$。(2)–(3) 由定义 32.3 直接得出。$\square$

  *Remark：* 定理 32.6 的第一条结论与定义 32.5 的“最小夹角”定义完全吻合——**线面角就是直线与其投影之间的夹角**。这为后续计算提供了实际操作方法（方法 32.1）。第二条将“最小夹角 $= 90^\circ$”与定义 32.3 中的垂直概念统一起来，确保定义的一致性。

- **方法 32.1（求线面角的步骤）**
  1. 确定直线与平面的交点 $A$；
  2. 在直线上取另一点 $B$（$B \neq A$），求 $B$ 在 $\alpha$ 上的投影 $O$；
  3. 连接 $AO$，则 $\angle BAO$ 即为线面角；
  4. 在 $\triangle BAO$ 中计算：因 $BO \perp AO$（定理 32.5），$\sin(\text{线面角}) = \dfrac{BO}{BA}$，$\cos(\text{线面角}) = \dfrac{AO}{BA}$。

### 32.2.5 两平面的交线与二面角

- **定义 32.6（两平面的位置关系 / Relative Position of Two Planes）**
  空间中两个不同的平面 $\alpha$ 与 $\beta$ 只有两种可能：
  - **相交：** $\alpha \cap \beta$ 为一条直线；
  - **平行：** $\alpha \cap \beta = \varnothing$（无交点）。

  >在本章中，只讨论两平面相交的情形。

- **定义 32.7（两平面的交线／棱 / Line of Intersection / Edge）**
  若两平面 $\alpha$ 与 $\beta$ 相交，其交线 $l = \alpha \cap \beta$ 称为此二面角的**棱**。

- **定义 32.8（二面角 / Dihedral Angle）**
  设两平面 $\alpha$ 与 $\beta$ 相交于直线 $l$（棱）。过 $l$ 上任一点 $P$，分别在 $\alpha$ 和 $\beta$ 内作 $l$ 的垂线 $PA$（$PA \subset \alpha$）和 $PB$（$PB \subset \beta$），则 $\angle APB$ 称为此二面角的**平面角**（plane angle of the dihedral angle），其大小定义为 $\alpha$ 与 $\beta$ 的二面角。

  二面角的取值范围为 $[0^\circ, 180^\circ]$。在 DSE 应用题中，常见的二面角为锐角。

  *Remark：* $P$ 在棱上的位置不影响平面角的大小——沿棱平移 $P$，两条垂线 $PA$ 和 $PB$ 随之平移，但夹角保持不变。

- **方法 32.2（求二面角的步骤）**
  1. 确定两平面的交线（棱）$l$；
  2. 在 $l$ 上选取适当的一点 $P$（选择标准：方便作出垂线，或为图形的顶点／棱的中点）；
  3. 分别在两个平面内，过 $P$ 作 $l$ 的垂线；
  4. 两条垂线所夹的角即为所求二面角的平面角，在所得三角形中计算。

  *Remark：* 在实际问题中，二面角的两条垂线往往分别是某个侧面的高线或斜高。找出它们并计算其长度与夹角是问题的关键。

### 32.2.6 三垂线定理

> 三垂线定理是立体几何中最强大的垂直判定工具。其本质是：在一条“竖杆”（垂直于平面的线段）存在的前提下，平面内的“影”与“斜线”在垂直性上等价。

- **定理 32.7（三垂线定理 / Theorem of Three Perpendiculars）**
  设 $PO \perp \alpha$ 于 $O$，$A$ 为 $\alpha$ 上一点（$A \neq O$），连接 $PA$（称为**斜线**，$A$ 为斜足）。若直线 $l \subset \alpha$ 且 $l$ 过 $A$，则：
  $$l \perp OA \;\Longrightarrow\; l \perp PA$$

  **证明：** $PO \perp \alpha$ $\implies$ $PO \perp l$（因 $l \subset \alpha$，由定义 32.3 的等价表述）。又 $l \perp OA$（已知），故 $l \perp$ 平面 $POA$（因 $l$ 垂直于平面内两条相交直线 $PO$ 和 $OA$）。而 $PA \subset$ 平面 $POA$，因此 $l \perp PA$。$\square$

- **定理 32.8（三垂线定理的逆定理 / Converse of TPT）**
  在定理 32.7 的设定下：
  $$l \perp PA \;\Longrightarrow\; l \perp OA$$

  **证明：** $PO \perp \alpha$ $\implies$ $PO \perp l$。又 $l \perp PA$（已知），故 $l \perp$ 平面 $POA$。而 $OA \subset$ 平面 $POA$，因此 $l \perp OA$。$\square$

  *记忆口诀：* “线射垂直 $\iff$ 线斜垂直”（前提：$PO \perp \alpha$）。

  *使用提示：* 在空间图形中，三垂线定理的最常见用法是“帮你找到哪里有直角”——一旦确认 $PO \perp \alpha$，则平面 $\alpha$ 内与 $OA$ 垂直的直线必然同时与 $PA$ 垂直。反之亦然。这使得在三垂线定理的框架下，线面角和二面角的垂线往往相互关联，大大简化了作图。

---

## 32.3 涉及三维空间中的几何问题

> 本节综合运用 §32.1–32.2 的工具，解决各类空间角度的求解问题。不同几何体中求角度的策略各有侧重——并无一个“万能通法”，而是根据图形的对称性和已知条件选择最便捷的途径。

### 32.3.1 常见几何体中的角度问题

本小节以三种最常考查的几何体为例，说明线面角和二面角的求解策略。

- **方法 32.3（正方体中的角度）**
  正方体是对称性最强的多面体，其所有面均为全等的正方形，所有棱等长且互相垂直或平行。

  1. **体对角线与面的交角（线面角）：** 设正方体棱长为 $a$。体对角线 $AG$ 在底面 $ABCD$ 上的投影为面对角线 $AC$——因为 $G$ 在底面的投影为 $C$（$GC \perp$ 底面），而 $A$ 本身在底面上。故 $\angle GAC$ 即为所求线面角。由 $\tan(\angle GAC) = \dfrac{GC}{AC} = \dfrac{a}{a\sqrt{2}} = \dfrac{1}{\sqrt{2}}$，得 $\angle GAC \approx 35.3^\circ$。
  2. **两相邻侧面的二面角：** 正方体中相邻面互相垂直，二面角为 $90^\circ$（可直接由定义 32.3 验证）。
  3. **截面与面的二面角：** 若截面为对角面 $ACC'A'$，其与底面 $ABCD$ 的交线为 $AC$，而 $CC' \perp$ 底面，故对角面 $\perp$ 底面，二面角为 $90^\circ$。

- **方法 32.4（正四面体中的角度）**
  正四面体的四个面均为全等的等边三角形。

  1. **棱与面的交角（线面角）：** 设棱长为 $a$。取顶点 $V$ 及底面 $\triangle ABC$。由对称性，$V$ 在底面的投影 $O$ 为底面 $\triangle ABC$ 的中心（四心合一）。等边三角形中心到顶点的距离为 $OA = \dfrac{a}{\sqrt{3}}$，棱长 $VA = a$。由 $\triangle VOA$ 中 $VO \perp OA$（定理 32.5），线面角 $\theta$ 满足 $\cos\theta = \dfrac{OA}{VA} = \dfrac{1}{\sqrt{3}}$，或 $\sin\theta = \dfrac{VO}{VA}$（$VO = \sqrt{a^2 - a^2/3} = a\sqrt{2/3}$）。
  2. **两相邻面的二面角：** 取棱 $AB$。在面 $VAB$ 中，$M$ 为 $AB$ 中点，则 $VM \perp AB$（等腰三角形中线即高线）；在面 $CAB$ 中，$CM \perp AB$。故 $\angle VMC$ 为二面角的平面角（定义 32.8）。由 $VM = CM = \dfrac{\sqrt{3}}{2}a$，$VC = a$，在 $\triangle VMC$ 中用余弦定理：$\cos\angle VMC = \dfrac{1}{3}$。

- **方法 32.5（正棱锥中的角度）**
  设底面为正 $n$ 边形的正棱锥，顶点 $V$ 在底面的投影 $O$ 为底面中心。

  1. **侧棱与底面的交角（线面角）：** $\angle VAO$，其中 $A$ 为底面任一顶点，$O$ 为中心。在直角 $\triangle VAO$ 中计算。
  2. **侧面与底面的二面角：** 取底面一边 $BC$，设其中点为 $M$。$VM \perp BC$（等腰 $\triangle VBC$ 的中线即高线），$OM \perp BC$（正多边形中心到边中点的连线垂直于该边）。故 $\angle VMO$ 为二面角的平面角，在直角 $\triangle VMO$ 中计算。

### 32.3.2 角锥顶点投影与三角形四心的关系

> 本节是本章的核心亮点。在三角锥 $V$-$ABC$ 中，顶点 $V$ 在底面 $\triangle ABC$ 上的投影 $O$ 落在底面的哪个特殊点（外心、内心、垂心、重心），取决于该三角锥满足何种几何条件。这四个定理将平面几何的“四心”概念与空间几何的“侧棱／侧面／对棱”条件建立了精确的对应关系。

设三角锥 $V$-$ABC$，$VO \perp$ 底面 $ABC$，$O$ 为垂足（即投影，定义 32.2）。

---

- **定理 32.9（投影为外心 / Projection as Circumcenter）**
  $O$ 为 $\triangle ABC$ 的**外心** $\iff$ $VA = VB = VC$（三条侧棱等长）。

  **证明：**
  $(\Rightarrow)$ 若 $O$ 为 $\triangle ABC$ 的外心，则 $OA = OB = OC$。在直角 $\triangle VOA$、$\triangle VOB$、$\triangle VOC$ 中（定理 32.5 保证 $VO \perp OA, OB, OC$），由毕氏定理：
  $$VA^2 = VO^2 + OA^2,\quad VB^2 = VO^2 + OB^2,\quad VC^2 = VO^2 + OC^2$$
  因 $OA = OB = OC$，故 $VA = VB = VC$。

  $(\Leftarrow)$ 若 $VA = VB = VC$，则同理 $OA^2 = VA^2 - VO^2 = VB^2 - VO^2 = OB^2 = VC^2 - VO^2 = OC^2$，即 $OA = OB = OC$。$O$ 为底面上一点到三个顶点等距，故 $O$ 为 $\triangle ABC$ 的外心。$\square$

  *应用场景：* 若题目给出“三角锥的三条侧棱相等”$\implies$ 顶点投影为底面外心 $\implies$ 可利用底面外接圆半径等信息辅助计算。

---

- **定理 32.10（投影为内心 / Projection as Incenter）**
  $O$ 为 $\triangle ABC$ 的**内心** $\iff$ 顶点 $V$ 到底面三边 $AB, BC, CA$ 的距离相等。
  等价于：三个侧面与底面所成的**二面角相等**。

  **证明：**
  设 $O$ 到 $AB$、$BC$、$CA$ 的距离分别为 $d_1, d_2, d_3$。过 $O$ 作 $OM_1 \perp AB$（垂足 $M_1 \in AB$）。由 $VO \perp$ 底面及三垂线定理（定理 32.7），$VM_1 \perp AB$。$VM_1$ 即为 $V$ 到 $AB$ 的距离。

  在直角 $\triangle VOM_1$ 中：$VM_1 = \sqrt{VO^2 + d_1^2}$。同理，$V$ 到 $BC$ 的距离为 $\sqrt{VO^2 + d_2^2}$，到 $CA$ 的距离为 $\sqrt{VO^2 + d_3^2}$。

  $O$ 为内心 $\iff$ $O$ 到三边的距离相等，即 $d_1 = d_2 = d_3$。
  由此 $\iff$ $\sqrt{VO^2 + d_1^2} = \sqrt{VO^2 + d_2^2} = \sqrt{VO^2 + d_3^2}$，即 $V$ 到底面三边的距离相等。

  对于二面角：侧面 $VAB$ 与底面 $ABC$ 的二面角的平面角即为 $\angle VM_1O$（因 $VM_1 \perp AB$、$OM_1 \perp AB$，符合定义 32.8）。在直角 $\triangle VOM_1$ 中：
  $$\tan(\angle VM_1O) = \frac{VO}{d_1}$$
  同理，其余两个二面角的正切分别为 $VO/d_2$ 和 $VO/d_3$。故 $d_1 = d_2 = d_3 \iff$ 三个二面角相等。$\square$

  *应用场景：* 若题目说“三角锥的三个侧面与底面成等角”或“顶点到底面三边等距”$\implies$ 顶点投影为底面内心 $\implies$ 可利用内切圆半径 $r = \dfrac{2S}{a+b+c}$ 等辅助计算。

---

- **定理 32.11（投影为垂心 / Projection as Orthocenter）**
  $O$ 为 $\triangle ABC$ 的**垂心** $\iff$ 三组对棱互相垂直：$VA \perp BC$，$VB \perp CA$，$VC \perp AB$。

  **证明：**
  $(\Rightarrow)$ 若 $O$ 为垂心，则 $AO \perp BC$（垂心定义：顶点与垂心的连线垂直于对边）。由三垂线定理（定理 32.7）：$VO \perp$ 底面 $ABC$，$AO \perp BC$（$AO \subset$ 底面），故 $VA \perp BC$（斜线垂直于 $BC$）。同理得 $VB \perp CA$、$VC \perp AB$。

  $(\Leftarrow)$ 若 $VA \perp BC$，由三垂线定理的逆定理（定理 32.8）：$VO \perp$ 底面，$VA \perp BC$，故投影 $AO \perp BC$。同理 $BO \perp CA$、$CO \perp AB$。即 $O$ 为底面三条高线的交点——垂心。$\square$

  *应用场景：* 此定理清晰地展示了三垂线定理的威力——对棱垂直这一空间条件，通过三垂线定理直接转化为底面内的垂心条件。

---

- **定理 32.12（投影为重心 / Projection as Centroid）**
  $O$ 为 $\triangle ABC$ 的**重心** $\iff$ $O$ 将 $\triangle ABC$ 分割为三个等面积的小三角形，即
  $$\operatorname{Area}(\triangle OAB) = \operatorname{Area}(\triangle OBC) = \operatorname{Area}(\triangle OCA)$$
  等价于：三个小三棱锥 $V$-$OAB$、$V$-$OBC$、$V$-$OCA$ 具有相等的体积。

  **证明：**
  $O$ 为 $\triangle ABC$ 的重心 $\iff$ $O$ 是三条中线的交点。重心的性质之一：它将三角形分割为三个等面积的小三角形（因每条中线平分面积，且三中线共点）。

  三个小三棱锥 $V$-$OAB$、$V$-$OBC$、$V$-$OCA$ 均以 $VO$ 为公共高（定理 32.5），底面分别为 $\triangle OAB$、$\triangle OBC$、$\triangle OCA$。由锥体体积公式 $V = \dfrac{1}{3} \times \text{底面积} \times VO$，体积相等 $\iff$ 底面积相等。$\square$

  *Remark：* 重心条件不同于前三心的“简单线段相等或垂直条件”——它涉及面积。在 DSE 题目中，若考察投影为重心情境，通常会直接给出 $O$ 为底面重心的条件（如“顶点投影在底面中线的交点处”），然后要求利用重心将中线分为 $2:1$ 的性质进行计算。

---

- **推论 32.1（正三棱锥的投影 / Projection in a Regular Triangular Pyramid）**
  若三角锥 $V$-$ABC$ 的底面为正三角形，且三条侧棱等长（即为**正三棱锥**），则顶点 $V$ 在底面的投影 $O$ 同时为 $\triangle ABC$ 的**外心、内心、垂心与重心**（四心合一）。

  **证明：** 底面为正三角形 $\implies$ 四心合一。侧棱等长由定理 32.9 得 $O$ 为外心。既为外心，在正三角形中即同时为内心、垂心与重心。$\square$

  *Remark：* 推论 32.1 提供了处理正三棱锥的捷径——一旦确认是正三棱锥，即可直接利用底面的四心合一性质，并结合定理 32.9–32.12 中的任何一个等价条件进行计算。

---

以下表格总结了四种投影位置的等价条件：

| $O$ 为 | 等价条件 | 关键工具 |
|:------:|---------|---------|
| **外心** | $VA = VB = VC$ | 毕氏定理 |
| **内心** | $V$ 到底面三边等距；或三个侧面与底面成等角 | 毕氏定理 + 正切关系 |
| **垂心** | $VA \perp BC$，$VB \perp CA$，$VC \perp AB$ | 三垂线定理 |
| **重心** | $\operatorname{Area}(\triangle OAB) = \operatorname{Area}(\triangle OBC) = \operatorname{Area}(\triangle OCA)$ | 重心面积性质 |

### 32.3.3 面积投影法与二面角

> 当二面角难以通过“在棱上作垂线”的方法直接求得时，面积投影定理提供了另一条途径——通过比较图形与其投影的面积来间接计算二面角。

- **定理 32.13（面积投影定理 / Area Projection Theorem）**
  设平面图形 $\Gamma$ 位于平面 $\beta$ 上，$\Gamma'$ 为 $\Gamma$ 在平面 $\alpha$ 上的**正投影**（按定义 32.2 逐点投影）。若 $\alpha$ 与 $\beta$ 的二面角为 $\phi$（$0^\circ \le \phi \le 90^\circ$），则：
  $$\operatorname{Area}(\Gamma') = \operatorname{Area}(\Gamma) \cdot \cos\phi$$

  等价地：
  $$\cos\phi = \frac{\operatorname{Area}(\Gamma')}{\operatorname{Area}(\Gamma)}$$

  **证明思路：** 将 $\Gamma$ 分解为大量平行于棱的细长矩形条。每个矩形条的宽度（垂直于棱的方向）在投影中保持不变，而长度（平行于棱的方向）按因子 $\cos\phi$ 缩短。因此面积整体缩放 $\cos\phi$ 倍。$\square$

  *使用场景：* 在三角锥中，侧面 $\triangle VAB$ 在底面 $ABC$ 上的正投影为 $\triangle OAB$（$O$ 为 $V$ 的投影）。已知两者的面积，即可求得侧面与底面之间的二面角：
  $$\cos\phi = \frac{\operatorname{Area}(\triangle OAB)}{\operatorname{Area}(\triangle VAB)}$$

  *Remark：* 面积投影法在“投影面积容易求出但二面角的垂线难以构作”时特别有用。例如当侧面为任意三角形（不一定等腰），难以在棱上找到恰当点同时作出两条垂线时，直接计算面积比更为简便。

---

## 32.4 延伸内容：空间中的代数 —— 向量

> ⬆️ 本节为延伸内容。向量方法提供了一种将空间几何问题转化为代数运算的途径——无需寻找巧妙的辅助线，通过坐标化和内积运算即可求解角度、距离和投影。但应注意：向量法计算量大，适合对称性较低的复杂图形；对称性高的图形（如正方体、正四面体）仍以几何法更快捷。

### 32.4.1 向量的概念

本小节仅给出三维向量的基本定义与坐标表示。

- **定义 32.9（三维向量 / Vector in $\mathbb{R}^3$）**
  空间中的有向线段。若起点为 $A(x_1, y_1, z_1)$，终点为 $B(x_2, y_2, z_2)$，则向量
  $$\overrightarrow{AB} = (x_2 - x_1,\; y_2 - y_1,\; z_2 - z_1)$$
  其模长（长度）为：
  $$|\overrightarrow{AB}| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

### 32.4.2 向量的内积

- **定义 32.10（内积 / Dot Product）**
  两向量 $\vec{a} = (x_1, y_1, z_1)$ 与 $\vec{b} = (x_2, y_2, z_2)$ 的内积定义为：
  $$\vec{a} \cdot \vec{b} = x_1x_2 + y_1y_2 + z_1z_2$$

  几何定义（等价形式）：
  $$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos\theta$$
  其中 $\theta$ 为两向量的夹角（$0^\circ \le \theta \le 180^\circ$）。

- **定理 32.14（内积的性质）**
  1. $\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{a}$（交换律）
  2. $\vec{a} \cdot \vec{a} = |\vec{a}|^2 \ge 0$
  3. $\vec{a} \cdot \vec{b} = 0 \iff \vec{a} \perp \vec{b}$（正交条件）

- **应用：求两向量的夹角**
  $$\cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|}$$

  在空间几何中，将欲求夹角的两直线方向以向量表示，代入上式即得。

### 32.4.3 向量的投影

- **定义 32.11（标量投影 / Scalar Projection）**
  向量 $\vec{a}$ 在向量 $\vec{b}$ 方向上的**标量投影**为：
  $$\operatorname{proj}_{\vec{b}} \vec{a} = \frac{\vec{a} \cdot \vec{b}}{|\vec{b}|} = |\vec{a}| \cos\theta$$

  *几何意义：* 标量投影即为 $\vec{a}$ 在 $\vec{b}$ 所在直线上的“影长”。在三维空间中，若 $\vec{b}$ 取为平面的法向量方向，则标量投影可用于计算点到平面的距离。

---

## 第三十二章总结

1. **解三角形工具箱（§32.1）：** SAS 面积公式（定理 32.1）、海伦公式（定理 32.2）、正弦定理（定理 32.3）、余弦定理（定理 32.4）。这些是空间切面的基本计算工具。

2. **空间几何的逻辑链（§32.2）：**
   - **距离 → 投影：** 点到平面的最短距离（定义 32.1）→ 投影为达到最短距离的点（定义 32.2）。
   - **投影 → 垂直：** 投影点到原点连线垂直于平面内所有过投影点的直线（定理 32.5）→ 直线垂直于平面的定义由此建立（定义 32.3）。
   - **垂直 → 角度：** 线面角定义为直线与平面上各方向的最小夹角（定义 32.5），且 $\theta = 90^\circ \iff l \perp \alpha$（定理 32.6）。
   - **二面角：** 先确立两平面的交线（定义 32.7），再在棱上作垂线定义二面角的平面角（定义 32.8）。

3. **求角度的方法（§32.2）：**
   - **线面角：** 取直线上一点，求其在平面的投影 → $\angle BAO$（方法 32.1）。
   - **二面角：** 定棱 → 在两平面内分别作棱的垂线 → 两垂线夹角（方法 32.2）。

4. **三垂线定理（§32.2.6）：** $PO \perp \alpha$ 的前提下，$l \perp$（投影）$\iff$ $l \perp$（斜线）（定理 32.7–32.8）。这是空间垂直判定的核心工具。

5. **常见几何体的角度（§32.3.1）：** 正方体（方法 32.3）、正四面体（方法 32.4）、正棱锥（方法 32.5）各有其对称性带来的最优求法。

6. **角锥顶点投影与四心（§32.3.2，本章核心）：**
   | 投影位置 | 等价条件 |
   |:--------:|---------|
   | 外心 | 三条侧棱等长（定理 32.9） |
   | 内心 | 顶点到底面三边等距；三侧面与底面成等角（定理 32.10） |
   | 垂心 | 三组对棱互相垂直（定理 32.11） |
   | 重心 | 底面被分为三个等面积小三角形（定理 32.12） |
   正三棱锥中四心合一（推论 32.1）。

7. **面积投影法（§32.3.3）：** $\operatorname{Area}(\text{投影}) = \operatorname{Area}(\text{原图形}) \cdot \cos\phi$（定理 32.13）。提供不依赖垂线构作的二面角计算途径。

8. **向量方法（§32.4，⬆️ 延伸）：** 三维向量坐标表示（定义 32.9）、内积与夹角公式（定义 32.10、定理 32.14）、标量投影（定义 32.11）。

---

## 章节练习

（待编写）
