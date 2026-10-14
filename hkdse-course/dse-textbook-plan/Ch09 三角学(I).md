**前置：** [[Ch08 平面几何 (I)]]；[[Ch03 整数指数律与进制]]；[[Ch06 代数式]]

**模块目标：** 在直角三角形背景下理解正弦、余弦、正切的定义，熟记 $30^\circ$、$45^\circ$、$60^\circ$ 三个特殊角的三角比，掌握平方和恒等式、商数恒等式及互余关系，并能运用反三角函数解直角三角形及处理仰角、俯角等实际应用问题。

---

## 9.1 锐角三角比 (Trigonometric Ratios of Acute Angles)

> 本节从相似三角形出发，建立锐角的正弦、余弦及正切的定义。

### 9.1.1 直角三角形的边 (Sides of a Right-Angled Triangle)

在直角三角形中，关注其中一个锐角 $\theta$，三边命名如 下：

- **定义 9.1 (斜边 / Hypotenuse, Hyp)**
  直角三角形中，直角（$90^\circ$）所对的边，亦是最长的边。

- **定义 9.2 (对边 / Opposite Side, Opp)**
  角 $\theta$ 正对着的边。

- **定义 9.3 (邻边 / Adjacent Side, Adj)**
  与角 $\theta$ 相邻的直角边（即非斜边的另一边）。

> **注：** 对边与邻边的归属取决于所参考的锐角。对于同一直角三角形，若改以另一锐角为 $\theta$，则原来的邻边变成对边，对边变成邻边。

### 9.1.2 锐角的正弦、余弦与正切 (Sine, Cosine, and Tangent of an Acute Angle)

对直角三角形中的任意一个锐角 $\theta$，定义六个三角比中最基本的三个：

- **定义 9.4 (正弦 / Sine)**
  $$\sin \theta = \frac{\text{对边}}{\text{斜边}} = \frac{\text{Opp}}{\text{Hyp}}$$

- **定义 9.5 (余弦 / Cosine)**
  $$\cos \theta = \frac{\text{邻边}}{\text{斜边}} = \frac{\text{Adj}}{\text{Hyp}}$$

- **定义 9.6 (正切 / Tangent)**
  $$\tan \theta = \frac{\text{对边}}{\text{邻边}} = \frac{\text{Opp}}{\text{Adj}}$$

> **由相似三角形保证：** 对于一个固定的锐角 $\theta$，所有包含 $\theta$ 的直角三角形皆为相似三角形——这保证了上述三个边长比 $\sin\theta, \cos\theta, \tan\theta$ 均是**仅依赖于 $\theta$** 的常数，与三角形的大小无关。

---

## 9.2 三角恒等式 (Trigonometric Identities)

> 本节推导三个基本三角恒等式，揭示 $\sin\theta$、$\cos\theta$ 与 $\tan\theta$ 之间的内在关系。

### 9.2.1 平方和恒等式 (Pythagorean Identity)

- **定理 9.1 (平方和恒等式 / Pythagorean Identity)**
  对于任意锐角 $\theta$，
  $$\sin^2\theta + \cos^2\theta = 1$$

  **证明思路：** 由定义 $\sin\theta = \frac{\text{Opp}}{\text{Hyp}}$，$\cos\theta = \frac{\text{Adj}}{\text{Hyp}}$，代入：
  $$\sin^2\theta + \cos^2\theta = \left(\frac{\text{Opp}}{\text{Hyp}}\right)^2 + \left(\frac{\text{Adj}}{\text{Hyp}}\right)^2 = \frac{\text{Opp}^2 + \text{Adj}^2}{\text{Hyp}^2}$$
  由毕氏定理（定理 8.15），$\text{Opp}^2 + \text{Adj}^2 = \text{Hyp}^2$，故分子 $=$ 分母，比值为 $1$。

### 9.2.2 商数恒等式 (Quotient Identity)

- **定理 9.2 (商数恒等式 / Quotient Identity)**
  对于任意锐角 $\theta$，
  $$\tan \theta = \frac{\sin \theta}{\cos \theta}$$

  **证明思路：** 由定义 $\sin\theta = \frac{\text{Opp}}{\text{Hyp}}$ 及 $\cos\theta = \frac{\text{Adj}}{\text{Hyp}}$，
  $$\frac{\sin \theta}{\cos \theta} = \frac{\text{Opp}/\text{Hyp}}{\text{Adj}/\text{Hyp}} = \frac{\text{Opp}}{\text{Hyp}} \cdot \frac{\text{Hyp}}{\text{Adj}} = \frac{\text{Opp}}{\text{Adj}} = \tan \theta$$

### 9.2.3 互余关系 (Complementary Angle Relations)

在直角三角形中，两锐角互为余角（和为 $90^\circ$）。若取一角为 $\theta$，则另一角为 $90^\circ - \theta$。注意到 $\theta$ 的对边即为 $(90^\circ - \theta)$ 的邻边，反之亦然。

- **推论 9.1 (互余关系 / Complementary Angle Relations)**
  对于任意锐角 $\theta$，
  $$\sin(90^\circ - \theta) = \cos \theta$$
  $$\cos(90^\circ - \theta) = \sin \theta$$
  $$\tan(90^\circ - \theta) = \frac{1}{\tan \theta}$$

  **证明思路：** 前两式直接由定义及对边／邻边互换的事实得出。第三式由 $\tan(90^\circ - \theta) = \frac{\sin(90^\circ - \theta)}{\cos(90^\circ - \theta)} = \frac{\cos\theta}{\sin\theta} = \frac{1}{\tan\theta}$ 推出。

---

## 9.3 特殊角的三角比 (Trigonometric Ratios of Special Angles)

> $30^\circ$、$45^\circ$ 及 $60^\circ$ 的三角比可由等腰直角三角形及等边三角形的几何性质精确求出，无需使用计算器。

### 9.3.1 推导过程

- **推论 9.2 ($45^\circ$-$45^\circ$-$90^\circ$ 三角形的边长比 / Side Ratio of a 45°-45°-90° Triangle)**
  在等腰直角三角形中，设两腰长 $1$，则斜边 $= \sqrt{1^2 + 1^2} = \sqrt{2}$。三边比例为 $1 : 1 : \sqrt{2}$。

- **推论 9.3 ($30^\circ$-$60^\circ$-$90^\circ$ 三角形的边长比 / Side Ratio of a 30°-60°-90° Triangle)**
  取一个边长为 $2$ 的等边三角形，从一顶点向对边引高线——此高线将等边三角形分成两个全等的直角三角形。注意此高线同时为中线及角平分线，故：
  - 对 $30^\circ$ 角的边长 $= 1$（底边的一半），
  - 斜边 $= 2$，
  - 高 $= \sqrt{2^2 - 1^2} = \sqrt{3}$。
  三边比例为 $1 : \sqrt{3} : 2$（对应 $30^\circ$ 对边、$60^\circ$ 对边、斜边）。

### 9.3.2 数值表

由上述推论，精确值如下：

| $\theta$ | $\sin \theta$ | $\cos \theta$ | $\tan \theta$ |
| :---: | :---: | :---: | :---: |
| **$30^\circ$** | $\displaystyle \frac{1}{2}$ | $\displaystyle \frac{\sqrt{3}}{2}$ | $\displaystyle \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}$ |
| **$45^\circ$** | $\displaystyle \frac{\sqrt{2}}{2}$ | $\displaystyle \frac{\sqrt{2}}{2}$ | $1$ |
| **$60^\circ$** | $\displaystyle \frac{\sqrt{3}}{2}$ | $\displaystyle \frac{1}{2}$ | $\sqrt{3}$ |

**记忆规律：**
- $\sin 30^\circ, \sin 45^\circ, \sin 60^\circ$ 的分子依次为 $\sqrt{1}, \sqrt{2}, \sqrt{3}$，分母均为 $2$。
- $\cos$ 的顺序与 $\sin$ 恰好相反：$\cos 30^\circ = \sin 60^\circ$，$\cos 60^\circ = \sin 30^\circ$（由互余关系可得）。
- $\tan$ 可由 $\displaystyle \frac{\sin\theta}{\cos\theta}$ 直接计算。

---

## 9.4 三角学的应用 (Applications of Trigonometry)

> 利用三角比及反三角函数，可对直角三角形进行“已知一角一边求另一边”或“已知两边求角度”的求解，并应用于仰角、俯角等实际测量问题。

### 9.4.1 解直角三角形 (Solving Right Triangles)

- **定义 9.7 (反三角比 / Inverse Trigonometric Ratios)**
  当已知某锐角的三角比值时，可用以下记号直接标示该角：
  - $\sin^{-1} y$（或 $\arcsin y$）：表示满足 $\sin\theta = y$ 的锐角 $\theta$。读作“反正弦 $y$”。
  - $\cos^{-1} y$（或 $\arccos y$）：表示满足 $\cos\theta = y$ 的锐角 $\theta$。读作“反余弦 $y$”。
  - $\tan^{-1} y$（或 $\arctan y$）：表示满足 $\tan\theta = y$ 的锐角 $\theta$。读作“反正切 $y$”。
  > **注意：** $\sin^{-1} y$ 中的 $-1$ 是角度记号的一部分，**不是指数**，$\sin^{-1} y \neq \frac{1}{\sin y}$。

**解直角三角形的两种基本情形：**

- **方法 9.1 (已知一角一边 / Given One Angle and One Side)**
  选取以已知边和未知边构成的三角比，建立方程求解。
  - 已知斜边和 $\theta$，求对边 $\Rightarrow$ 用 $\sin\theta$。
  - 已知斜边和 $\theta$，求邻边 $\Rightarrow$ 用 $\cos\theta$。
  - 已知邻边和 $\theta$，求对边 $\Rightarrow$ 用 $\tan\theta$。

- **方法 9.2 (已知两边求角度 / Given Two Sides, Find an Angle)**
  先由两边计算合适的三角比（$\sin\theta, \cos\theta$ 或 $\tan\theta$），再以反三角比记号（定义 9.7）表示 $\theta$。
  > **选择建议：** 一般优先选用 $\tan\theta$（只涉及两条直角边，无需用到斜边），或优先使用题目给出的已知边长，以避免误差传递。

### 9.4.2 仰角与俯角 (Angles of Elevation and Depression)

在现实测量问题中，观测者的视线与水平线之间形成特定角度：

- **定义 9.8 (仰角 / Angle of Elevation)**
  视线在水平线**上方**时，视线与水平线之间的夹角。

- **定义 9.9 (俯角 / Angle of Depression)**
  视线在水平线**下方**时，视线与水平线之间的夹角。

- **定理 9.3 (仰角与俯角的相等关系 / Equality of Elevation and Depression)**
  若观测点 $A$ 仰望目标点 $B$ 的仰角为 $\alpha$，则从 $B$ 俯视 $A$ 的俯角亦为 $\alpha$。

  **证明思路：** 设 $A, B$ 两点不共水平面。过 $A$ 作水平线 $L_A$，过 $B$ 作水平线 $L_B$，$L_A \parallel L_B$。视线 $AB$ 是 $L_A$ 与 $L_B$ 之间的截线，由平行线内错角相等，仰角 $=$ 俯角。

---

## 9.5 第九章总结

1. **锐角三角比：** $\sin\theta = \dfrac{\text{Opp}}{\text{Hyp}}$，$\cos\theta = \dfrac{\text{Adj}}{\text{Hyp}}$，$\tan\theta = \dfrac{\text{Opp}}{\text{Adj}}$。这些比值由相似三角形保证仅依赖于 $\theta$。
2. **三角恒等式：**
   - **平方和：** $\sin^2\theta + \cos^2\theta = 1$（由毕氏定理直接推出）。
   - **商数：** $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$（由定义直接推出）。
   - **互余关系：** $\sin(90^\circ - \theta) = \cos\theta$，$\cos(90^\circ - \theta) = \sin\theta$，$\tan(90^\circ - \theta) = \dfrac{1}{\tan\theta}$。
3. **特殊角三角比精确值（必须背诵）：**

   | $\theta$ | $30^\circ$ | $45^\circ$ | $60^\circ$ |
   | :---: | :---: | :---: | :---: |
   | $\sin\theta$ | $\dfrac{1}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{\sqrt{3}}{2}$ |
   | $\cos\theta$ | $\dfrac{\sqrt{3}}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{1}{2}$ |
   | $\tan\theta$ | $\dfrac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ |

4. **解直角三角形：** 已知一角一边 $\Rightarrow$ 选合适三角比求另一边；已知两边 $\Rightarrow$ 以反三角比记号表示角。
5. **仰角与俯角：** 仰角与俯角均以水平线为基准；由于水平线平行，$\text{仰角} = \text{俯角}$（内错角相等）。

---

## 9.6 章节练习

（待编写）

---

### 备课建议

1. **从相似三角形引入：** 建议先在相似三角形的背景下引入三角比——证明无论三角形大小如何，只要角度不变，边长之比就是常数。这一步骤有助学生理解“为何三角比仅依赖于角度”。
2. **`sin` 是一个不可拆分符号：** 学生容易犯 $\dfrac{\sin x}{x} = \sin 1$ 或 $\sin(x+1) = \sin x + \sin 1$ 等错误。应反复强调 $\sin$、$\cos$、$\tan$ 是**函数符号**，不可与参数拆分或约分。
3. **计算器模式检查：** 处理实际计算时，确保计算器处于 **Degree（角度制）** 模式而非 Radian（弧度制），这是学生的常见失分点。
4. **特殊角推导重于死记：** 与其机械背诵表格，不如让学生亲手画出 $45^\circ$-$45^\circ$-$90^\circ$ 及 $30^\circ$-$60^\circ$-$90^\circ$ 三角形并标记边长比，强化几何直觉。
5. **俯角的方向判定：** 俯角**永远是与水平线的夹角**，而非与垂直线的夹角。建议用平行线内错角相等的图示加强理解。
6. **解三角形时选择三角比的策略：** 教导学生优先使用题目给出的已知边长来选择三角比，避免用已计算出的中间结果（可能带有误差），从而减少误差传递。
