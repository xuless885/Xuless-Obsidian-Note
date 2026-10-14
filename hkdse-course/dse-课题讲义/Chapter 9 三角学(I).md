---
tags: DSE课程笔记
---

# 9　三角学（I）（Trigonometry I）

前置：[[Chapter 3 整数指数律与进制|整数指数律与进制]]、[[Chapter 6 代数式|代数式]]、[[Chapter 8 平面几何 (I)|平面几何 (I)]]

---

## 9.1　锐角三角比 (Trigonometric Ratios of Acute Angles)

> **本节难度上限**：T C ｜ C C- ｜ E D ｜ Q C

> 本节从相似三角形出发，建立锐角的正弦、余弦及正切的定义。

### 9.1.1　直角三角形的边 (Sides of a Right-Angled Triangle)

在直角三角形中，关注其中一个锐角 $\theta$，三边命名如下：

````ad-def
title: 定义（斜边） | Definition（Hypotenuse）

直角三角形中，直角（$90^\circ$）所对的边，亦是最长的边。记作 Hyp。
````

````ad-def
title: 定义（对边） | Definition（Opposite Side）

角 $\theta$ 正对着的边。记作 Opp。
````

````ad-def
title: 定义（邻边） | Definition（Adjacent Side）

与角 $\theta$ 相邻的直角边（即非斜边的另一边）。记作 Adj。
````

![[C9 G1.png|918]]


> **注：** 对边与邻边的归属取决于所参考的锐角。对于同一直角三角形，若改以另一锐角为 $\theta$，则原来的邻边变成对边，对边变成邻边。
  
### 9.1.2　锐角的正弦、余弦与正切 (Sine, Cosine, and Tangent)              

对直角三角形中的任意一个锐角 $\theta$，定义六个三角比中最基本的三个：

````ad-def
title: 定义（正弦） | Definition（Sine）

$$\sin \theta = \frac{\text{对边}}{\text{斜边}} = \frac{\text{Opp}}{\text{Hyp}}$$
````

````ad-def
title: 定义（余弦） | Definition（Cosine）

$$\cos \theta = \frac{\text{邻边}}{\text{斜边}} = \frac{\text{Adj}}{\text{Hyp}}$$
````

````ad-def
title: 定义（正切） | Definition（Tangent）

$$\tan \theta = \frac{\text{对边}}{\text{邻边}} = \frac{\text{Opp}}{\text{Adj}}$$
````

> **关键洞察：** 对于一个固定的锐角 $\theta$，所有包含 $\theta$ 的直角三角形皆为相似三角形（Similar Triangles），这保证了上述三个边长比 $\sin\theta, \cos\theta, \tan\theta$ 均是**仅依赖于 $\theta$ 的常数**，与三角形的大小无关。

````ad-example
title: 示例 | Example


在直角三角形 $ABC$ 中，$\angle ACB = 90^\circ$，$\angle BAC = 30^\circ$，$AB = 10$，$BC = 5$，$AC = 5\sqrt{3}$。若取 $\theta = \angle BAC = 30^\circ$，求 $\sin 30^\circ$、$\cos 30^\circ$ 及 $\tan 30^\circ$ 的值。

- 对边 $= BC = 5$，邻边 $= AC = 5\sqrt{3}$，斜边 $= AB = 10$

---

$\sin 30^\circ = \dfrac{5}{10} = \dfrac{1}{2}$，$\cos 30^\circ = \dfrac{5\sqrt{3}}{10} = \dfrac{\sqrt{3}}{2}$，$\tan 30^\circ = \dfrac{5}{5\sqrt{3}} = \dfrac{1}{\sqrt{3}}$
````

---

## 9.2　三角恒等式 (Trigonometric Identities)

> **本节难度上限**：T B- ｜ C C ｜ E C ｜ Q C

> 本节推导三个基本三角恒等式（Identities），揭示 $\sin\theta$、$\cos\theta$ 与 $\tan\theta$ 之间的内在关系。

### 9.2.1　平方和恒等式 (Pythagorean Identity)

````ad-thm
title: 定理（平方和恒等式） | Theorem（Pythagorean Identity）

对于任意锐角 $\theta$，
$$\sin^2\theta + \cos^2\theta \equiv 1$$
````

````ad-proof
title: 证明 | Proof

由定义 $\sin\theta = \dfrac{\text{Opp}}{\text{Hyp}}$，$\cos\theta = \dfrac{\text{Adj}}{\text{Hyp}}$，代入得对于任意锐角 $\theta$：
$$\sin^2\theta + \cos^2\theta \equiv \left(\frac{\text{Opp}}{\text{Hyp}}\right)^2 + \left(\frac{\text{Adj}}{\text{Hyp}}\right)^2 \equiv \frac{\text{Opp}^2 + \text{Adj}^2}{\text{Hyp}^2}$$

```ad-thm
title: 定理（毕氏定理） | Theorem（Pythagoras' Theorem）


在直角三角形中，斜边长度的平方等于两条直角边长度的平方和。设直角三角形 $ABC$ 中 $\angle ACB = 90^\circ$，$c$ 为斜边，则：
$$a^2 + b^2 = c^2$$
```

由毕氏定理知分子等于分母，故比值为 $1$。
````


````ad-example
title: 示例 | Example


已知 $\sin\theta = \dfrac{3}{5}$ 且 $\theta$ 为锐角，求 $\cos\theta$ 的值。

---

由平方和恒等式：
$$\cos^2\theta = 1 - \sin^2\theta = 1 - \left(\frac{3}{5}\right)^2 = 1 - \frac{9}{25} = \frac{16}{25}$$
$$\cos\theta = \pm \frac{4}{5}$$
因 $\cos\theta = \dfrac{\text{Adj}}{\text{Hyp}}$，边长均为正数，比值必为正，故 $\cos\theta = \dfrac{4}{5}$。
````

### 9.2.2　商数恒等式 (Quotient Identity)

````ad-thm
title: 定理（商数恒等式） | Theorem（商数恒等式）

对于任意锐角 $\theta$，
$$\tan \theta \equiv \frac{\sin \theta}{\cos \theta}$$
````

````ad-proof
title: 证明 | Proof

由定义 $\sin\theta = \dfrac{\text{Opp}}{\text{Hyp}}$ 及 $\cos\theta = \dfrac{\text{Adj}}{\text{Hyp}}$：
$$\frac{\sin \theta}{\cos \theta} \equiv \frac{\text{Opp}/\text{Hyp}}{\text{Adj}/\text{Hyp}} \equiv \frac{\text{Opp}}{\text{Hyp}} \cdot \frac{\text{Hyp}}{\text{Adj}} \equiv \frac{\text{Opp}}{\text{Adj}} \equiv \tan \theta$$
````



### 9.2.3　互余关系 (Complementary Angle Relations)

在直角三角形中，两锐角互为余角（Complementary Angles），即和为 $90^\circ$。若取一角为 $\theta$，则另一角为 $90^\circ - \theta$。注意到 $\theta$ 的对边即为 $(90^\circ - \theta)$ 的邻边，反之亦然。

````ad-cor
title: 推论（互余关系） | Corollary（互余关系）

对于任意锐角 $\theta$，
$$\sin(90^\circ - \theta) = \cos \theta$$
$$\cos(90^\circ - \theta) = \sin \theta$$
$$\tan(90^\circ - \theta) = \frac{1}{\tan \theta}$$
````

````ad-proof
title: 证明 | Proof

前两式直接由定义及对边／邻边互换的事实得出。第三式推导如下：
$$\tan(90^\circ - \theta) \equiv \frac{\sin(90^\circ - \theta)}{\cos(90^\circ - \theta)} \equiv \frac{\cos\theta}{\sin\theta} \equiv \frac{1}{\tan\theta}$$
最后一步使用了商数恒等式的逆用形式 $\dfrac{\cos\theta}{\sin\theta} \equiv \dfrac{1}{\tan\theta}$。
````

````ad-example
title: 示例 | Example


不查表，求 $\sin 60^\circ$ 与 $\cos 60^\circ$ 的值。

---

由互余关系：$\sin 60^\circ = \sin(90^\circ - 30^\circ) = \cos 30^\circ$，$\cos 60^\circ = \cos(90^\circ - 30^\circ) = \sin 30^\circ$。
若已知 $\sin 30^\circ = \dfrac{1}{2}$，$\cos 30^\circ = \dfrac{\sqrt{3}}{2}$，则 $\sin 60^\circ = \dfrac{\sqrt{3}}{2}$，$\cos 60^\circ = \dfrac{1}{2}$。
````

---

## 9.3　特殊角的三角比 (Trigonometric Ratios of Special Angles)

> **本节难度上限**：T C+ ｜ C C- ｜ E C ｜ Q C

> $30^\circ$、$45^\circ$ 及 $60^\circ$ 称为**特殊角**（Special Angles），因为它们的三角比可以用根式精确表示，无需使用计算器。这三组角度出现在等腰直角三角形及等边三角形的几何性质中，是 DSE 常考内容，必须能够背诵。

### 9.3.1　$45^\circ$-$45^\circ$-$90^\circ$ 三角形

````ad-thm
title: 定理（$45^\circ$-$45^\circ$-$90^\circ$ 三角形的边长比） | Theorem（$45^\circ$-$45^\circ$-$90^\circ$ 三角形的边长比）

在等腰直角三角形（Isosceles Right Triangle）中，两锐角均为 $45^\circ$，设两腰长为 $1$，则斜边长度为 $\sqrt{1^2 + 1^2} = \sqrt{2}$。三边比例为 $1 : 1 : \sqrt{2}$。

![[C9 G2.png]]

````

````ad-proof
title: 证明 | Proof

由毕氏定理，斜边长 $= \sqrt{1^2 + 1^2} = \sqrt{2}$，故三边比例为 $1:1:\sqrt{2}$。据此计算三角比：
$$\sin 45^\circ = \frac{\text{对边}}{\text{斜边}} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2},\quad \cos 45^\circ = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2},\quad \tan 45^\circ = \frac{1}{1} = 1$$
````

### 9.3.2　$30^\circ$-$60^\circ$-$90^\circ$ 三角形
````ad-thm
title: 定理（$30^\circ$-$60^\circ$-$90^\circ$ 三角形的边长比） | Theorem（$30^\circ$-$60^\circ$-$90^\circ$ 三角形的边长比）

取一个边长为 $2$ 的等边三角形，从一顶点向对边引高线（Altitude）。此高线同时为中线及角平分线，将等边三角形分成两个全等的直角三角形，其锐角为 $30^\circ$ 与 $60^\circ$。在其中一个直角三角形中：
- 对 $30^\circ$ 角的边长 $= 1$（底边的一半），
- 斜边 $= 2$，
- 高 $= \sqrt{2^2 - 1^2} = \sqrt{3}$。

三边比例为 $1 : \sqrt{3} : 2$（对应 $30^\circ$ 对边、$60^\circ$ 对边、斜边）。

![[C9 G3.png]]

````

````ad-proof
title: 证明 | Proof

高线将底边等分为两段，每段长为 $1$。由毕氏定理，高 $= \sqrt{2^2 - 1^2} = \sqrt{3}$。据此计算三角比：
$$\sin 30^\circ = \frac{1}{2},\quad \cos 30^\circ = \frac{\sqrt{3}}{2},\quad \tan 30^\circ = \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}$$
$$\sin 60^\circ = \frac{\sqrt{3}}{2},\quad \cos 60^\circ = \frac{1}{2},\quad \tan 60^\circ = \frac{\sqrt{3}}{1} = \sqrt{3}$$
````

### 9.3.3　数值表与记忆规律

综合上述两个定理，特殊角的三角比精确值如下：

|   $\theta$   |      $30^\circ$       |      $45^\circ$       |      $60^\circ$       | $90^\circ$ |
| :----------: | :-------------------: | :-------------------: | :-------------------: | ---------- |
| $\sin\theta$ |    $\dfrac{1}{2}$     | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{\sqrt{3}}{2}$ | $$1$$      |
| $\cos\theta$ | $\dfrac{\sqrt{3}}{2}$ | $\dfrac{\sqrt{2}}{2}$ |    $\dfrac{1}{2}$     | $$0$$      |
| $\tan\theta$ | $\dfrac{\sqrt{3}}{3}$ |          $1$          |      $\sqrt{3}$       | 未定义        |

````ad-lem
title: 引理（记忆规律：） | Lemma（记忆规律：）

- $\sin 30^\circ, \sin 45^\circ, \sin 60^\circ$ 的分子依次为 $\sqrt{1}, \sqrt{2}, \sqrt{3}$，分母均为 $2$。
- $\cos$ 的顺序与 $\sin$ 恰好相反：$\cos 30^\circ = \sin 60^\circ$，$\cos 60^\circ = \sin 30^\circ$（由互余关系可得）。
- $\tan 30^\circ = \dfrac{\sqrt{3}}{3}$，$\tan 60^\circ = \sqrt{3}$，建议直接死记，不必每次都从 $\dfrac{\sin\theta}{\cos\theta}$ 重新计算。
````

````ad-example
title: 示例 | Example


计算 $\sin^2 45^\circ + \cos^2 45^\circ$ 及 $\tan 30^\circ \cdot \tan 60^\circ$ 的精确值。

---

$\sin^2 45^\circ + \cos^2 45^\circ \equiv \left(\dfrac{\sqrt{2}}{2}\right)^2 + \left(\dfrac{\sqrt{2}}{2}\right)^2 \equiv \dfrac{2}{4} + \dfrac{2}{4} \equiv 1$（验证平方和恒等式）。

$\tan 30^\circ \cdot \tan 60^\circ \equiv \dfrac{\sqrt{3}}{3} \cdot \sqrt{3} \equiv \dfrac{3}{3} \equiv 1$（一般地，$\tan\theta \cdot \tan(90^\circ - \theta) \equiv 1$ 由互余关系推出）。
````

---

## 9.4　三角学的应用 (Applications of Trigonometry)

> **本节难度上限**：T B ｜ C C+ ｜ E C ｜ Q C+

> 利用三角比及反三角比（Inverse Trigonometric Ratios），可对**直角三角形**进行「已知一角一边求另一边」或「已知两边求角度」的求解，并应用于仰角（Angle of Elevation）、俯角（Angle of Depression）等实际测量问题。

### 9.4.1　解直角三角形 (Solving Right Triangles)

````ad-def
title: 定义（反三角比） | Definition（Inverse Trigonometric Ratios）

当已知某锐角的三角比值时，可用以下记号直接标示该角：
- $\sin^{-1} y$（或 $\arcsin y$）：表示满足 $\sin\theta = y$ 的锐角 $\theta$。读作「反正弦 $y$」。
- $\cos^{-1} y$（或 $\arccos y$）：表示满足 $\cos\theta = y$ 的锐角 $\theta$。读作「反余弦 $y$」。
- $\tan^{-1} y$（或 $\arctan y$）：表示满足 $\tan\theta = y$ 的锐角 $\theta$。读作「反正切 $y$」。

> **注意：** $\sin^{-1} y$ 中的上标 $-1$ 是记号的一部分，**不是指数**，故 $\sin^{-1} y \neq \dfrac{1}{\sin y}$。
````

![[C9 G6.png]]

**解直角三角形的两种基本情形：**

**情形一：已知一角一边（Given One Angle and One Side)**

选取以已知边和未知边构成的三角比，建立方程求解：

- 已知斜边和 $\theta$，求对边 $\Rightarrow$ 用 $\sin\theta$
- 已知斜边和 $\theta$，求邻边 $\Rightarrow$ 用 $\cos\theta$
- 已知邻边和 $\theta$，求对边 $\Rightarrow$ 用 $\tan\theta$

````ad-example
title: 示例 | Example


在直角三角形 $ABC$ 中，$\angle ACB = 90^\circ$，$\angle BAC = 35^\circ$，$AC = 12$ cm。求 $BC$ 和 $AB$ 的长度（答案保留三位有效数字）。

---

取 $\theta = \angle BAC = 35^\circ$：
- 邻边 $AC = 12$，对边 $= BC$，用 $\tan\theta$：$BC = AC \cdot \tan 35^\circ = 12 \times \tan 35^\circ \approx 12 \times 0.700 = 8.40$ cm
- 邻边 $AC = 12$，斜边 $= AB$，用 $\cos\theta$：$AB = \dfrac{AC}{\cos 35^\circ} = \dfrac{12}{\cos 35^\circ} \approx \dfrac{12}{0.819} = 14.6$ cm
````

**情形二：已知两边求角度（Given Two Sides, Find an Angle）**

先由两边计算合适的三角比（$\sin\theta, \cos\theta$ 或 $\tan\theta$），再以反三角比记号表示 $\theta$。

> **选择建议：** 一般优先选用 $\tan\theta$（只涉及两条直角边，无需用到斜边），或优先使用题目给出的已知边长，以避免误差传递。

````ad-example
title: 示例 | Example


在直角三角形 $XYZ$ 中，$\angle YZX = 90^\circ$，$XZ = 8$ cm，$YZ = 6$ cm。求 $\angle YXZ$（答案保留三位有效数字）。

---

取 $\theta = \angle YXZ$：对边 $= YZ = 6$，邻边 $= XZ = 8$。
$$\tan\theta = \frac{\text{对边}}{\text{邻边}} = \frac{6}{8} = 0.75$$
故 $\theta = \tan^{-1}(0.75) \approx 36.9^\circ$（或 $\arctan(0.75) \approx 36.9^\circ$）。
````

### 9.4.2　仰角与俯角 (Angles of Elevation and Depression)

在现实测量问题中，观测者的视线与水平线之间形成特定角度：

````ad-def
title: 定义（仰角） | Definition（Angle of Elevation）

视线在水平线**上方**时，视线与水平线之间的夹角。
````

````ad-def
title: 定义（俯角） | Definition（Angle of Depression）

视线在水平线**下方**时，视线与水平线之间的夹角。
````

![[C9 G4.png]]

````ad-thm
title: 定理（仰角与俯角的相等关系） | Theorem（仰角与俯角的相等关系）

若观测点 $A$ 仰望目标点 $B$ 的仰角为 $\alpha$，则从 $B$ 俯视 $A$ 的俯角亦为 $\alpha$。
````

````ad-proof
title: 证明 | Proof

设 $A, B$ 两点不共水平面。过 $A$ 作水平线 $L_A$，过 $B$ 作水平线 $L_B$，则 $L_A \parallel L_B$。视线 $AB$ 是 $L_A$ 与 $L_B$ 之间的截线（Transversal），由平行线的内错角（Alternate Interior Angles）相等，故仰角与俯角度数相同。

![[C9 G5.png]]

（该定理证明的视觉展示。）
````



````ad-example
title: 示例 | Example


从地面一点 $A$ 测得塔顶 $B$ 的仰角为 $40^\circ$。若观测者沿水平方向向塔走近 $50$ m 到达点 $C$，测得塔顶的仰角变为 $65^\circ$。求塔高 $h$（答案准确至三位有效数字）。

---

设塔底为 $D$，则 $\triangle ABD$ 与 $\triangle CBD$ 均为直角三角形，$\angle ADB = \angle CDB = 90^\circ$，塔高 $BD = h$。
- 在 $\triangle CBD$ 中：$\tan 65^\circ = \dfrac{h}{CD}$，故 $CD = \dfrac{h}{\tan 65^\circ}$
- 在 $\triangle ABD$ 中：$\tan 40^\circ = \dfrac{h}{AD} = \dfrac{h}{CD + 50}$

代入消去 $CD$：$h = (CD + 50)\tan 40^\circ = \left(\dfrac{h}{\tan 65^\circ} + 50\right)\tan 40^\circ$

整理得 $h\left(1 - \dfrac{\tan 40^\circ}{\tan 65^\circ}\right) = 50\tan 40^\circ$，代入数值可解得 $h \approx 48.8$ m。
````

---

## 9.5　本章总结

1. **锐角三角比：** $\sin\theta = \dfrac{\text{Opp}}{\text{Hyp}}$，$\cos\theta = \dfrac{\text{Adj}}{\text{Hyp}}$，$\tan\theta = \dfrac{\text{Opp}}{\text{Adj}}$。这些比值由相似三角形保证仅依赖于 $\theta$。
2. **三角恒等式：**
   - **平方和：** $\sin^2\theta + \cos^2\theta \equiv 1$（由毕氏定理直接推出）。
   - **商数：** $\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$（由定义直接推出）。
   - **互余关系：** $\sin(90^\circ - \theta) = \cos\theta$，$\cos(90^\circ - \theta) = \sin\theta$，$\tan(90^\circ - \theta) = \dfrac{1}{\tan\theta}$。
3. **特殊角三角比精确值（必须背诵）：**

|   $\theta$   |      $30^\circ$       |      $45^\circ$       |      $60^\circ$       | $90^\circ$ |
| :----------: | :-------------------: | :-------------------: | :-------------------: | ---------- |
| $\sin\theta$ |    $\dfrac{1}{2}$     | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{\sqrt{3}}{2}$ | $$1$$      |
| $\cos\theta$ | $\dfrac{\sqrt{3}}{2}$ | $\dfrac{\sqrt{2}}{2}$ |    $\dfrac{1}{2}$     | $$0$$      |
| $\tan\theta$ | $\dfrac{\sqrt{3}}{3}$ |          $1$          |      $\sqrt{3}$       | 未定义        |

4. **解直角三角形：** 已知一角一边 $\Rightarrow$ 选合适三角比求另一边；已知两边 $\Rightarrow$ 以反三角比记号表示角。
5. **仰角与俯角：** 仰角与俯角均以水平线为基准；由于水平线平行，仰角度数与俯角度数相同（内错角相等）。

---

## 中英对照词汇表

| 中文 | English |
|:--|:--|
| 锐角三角比 | Trigonometric Ratios of Acute Angles |
| 斜边 | Hypotenuse |
| 对边 | Opposite Side |
| 邻边 | Adjacent Side |
| 正弦 | Sine |
| 余弦 | Cosine |
| 正切 | Tangent |
| 三角恒等式 | Trigonometric Identities |
| 平方和恒等式 | Pythagorean Identity |
| 商数恒等式 | Quotient Identity |
| 互余关系 | Complementary Angle Relations |
| 特殊角的三角比 | Trigonometric Ratios of Special Angles |
| 等腰直角三角形 | Isosceles Right Triangle |
| 等边三角形 | Equilateral Triangle |
| 反三角比 / 反三角函数 | Inverse Trigonometric Ratios / Inverse Trigonometric Functions |
| 反正弦 | Arcsine |
| 反余弦 | Arccosine |
| 反正切 | Arctangent |
| 解直角三角形 | Solving Right Triangles |
| 仰角 | Angle of Elevation |
| 俯角 | Angle of Depression |
| 相似三角形 | Similar Triangles |
| 余角 | Complementary Angles |
| 高线 | Altitude |
| 截线 | Transversal |
| 内错角 | Alternate Interior Angles |

## 备课提示（Teaching Notes）

> 因为绘图工作量庞大，本章许多概念并未配好插图，插图稍后会更新。

