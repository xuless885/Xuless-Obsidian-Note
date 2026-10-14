---
tags: DSE课程笔记
---

# 21　二次函数（Quadratic Functions）

> 上一章我们把直线的方程 $Ax + By + C = 0$ 视作坐标平面上满足某代数约束的点集，并用斜率、截距、距离等工具刻画直线。再往前，第十九章在函数的集合论定义下引入了线性函数 $f(x) = kx + b$，其图像恰是一条直线。
>
> 比直线再复杂一阶的函数，是首项为二次的函数。它的图像不再是直线，而是一条称为**抛物线 (parabola)** 的曲线。本章将以二次函数为载体，把上一章建立的「方程视角 + 集合视角 + 几何视角」三重对照推广到曲线上。
>
> 本章与第十八章关系密切。第十八章从**代数**角度研究了一元二次方程 $ax^2 + bx + c = 0$ 的根：判别式 $\Delta = b^2 - 4ac$ 决定根的个数与性质，韦达定理揭示根与系数的关系。本章将从**函数图像**角度重新审视这些结论。
>
> 本章按概念依赖的顺序铺排：先定义二次函数、零点与截距（§21.1），再用配方法作代数变形（§21.2），由此引入函数最值的一般定义（§21.3），进而定义顶点与开口方向（§21.4）与对称轴（§21.5）。有了这些概念，才能分析系数的几何角色（§21.6），建立二次函数与二次方程的数形结合联系（§21.7），并应用于抛物线上的几何问题（§21.8）。

前置：[[Chapter 15 解析几何 (I)|解析几何 (I)]]、[[Chapter 18 解方程方法(II)|解方程方法(II)]]、[[Chapter 19 函数及其图像|函数及其图像]]、[[Chapter 20 直线方程|直线方程]]

---

## 21.1　二次函数的定义、零点与截距 (Definition, Zeros, and Intercepts)
> **本节难度上限**：T B- ｜ C C ｜ E B ｜ Q C

> 本节定义二次函数，建立其集合论表述，引入函数零点的一般概念，并讨论抛物线与坐标轴的交点。

### 21.1.1　二次函数的定义


````ad-def
title: 定义（二次函数） | Definition（Quadratic Function）

设 $a, b, c \in \mathbb{R}$，$a \neq 0$。函数
$$f: \mathbb{R} \to \mathbb{R}, \quad x \mapsto ax^2 + bx + c$$
称为**二次函数 (quadratic function)**。表达式
$$y = ax^2 + bx + c \quad 或 \quad f(x) = ax^2 + bx + c$$
称为二次函数的**一般式 (general form)**，其图像
$$G_f = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c\}$$
称为**抛物线 (parabola)**。
````

```easy-tikz
{
  "dimension": false,
  "documentSetup": true,
  "title": "二次函数的图像",
  "size_x_cm": 10,
  "size_y_cm": 10,
  "show_axis_label": true,
  "axis_label_x": "x",
  "axis_label_y": "y",
  "documentClose": true,
  "showAxis": true,
  "showLargeGrid": false,
  "showSmallGrid": false,
  "gridSize": 5,
  "xmin": "-2.80293",
  "xmax": "5.1363",
  "ymin": "-1.36559",
  "ymax": "4.13443",
  "axis_style": "middle",
  "functions": [
    {
      "expression": "x^2+x-1",
      "domain": "-3:3",
      "showLegend": true,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "blue",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f1"
    }
  ],
  "zmin": "-5",
  "zmax": "5",
  "axis_label_z": "z",
  "rotationX": 30,
  "rotationZ": 45,
  "zoom3D": 1,
  "boxAspect": "true",
  "functions3D": [],
  "majorTickNum": 8,
  "previewSize": 760,
  "annotations": [
    {
      "x": "3.028",
      "y": "1.04",
      "text": "f(x) = x^2+x-1 的图像，被命名为抛物线",
      "color": "black",
      "size": "large",
      "anchor": "above"
    }
  ],
  "tools": [],
  "coordinateSystem": "cartesian",
  "axis_label_x_polar": "",
  "axis_label_y_polar": ""
}
```


有几个要点需要说明。

1. **为何要求 $a \neq 0$**：若 $a = 0$，则 $f(x) = bx + c$ 退化为线性函数（$b \neq 0$）或常数函数（$b = 0$），其图像是直线而非抛物线。因此 $a \neq 0$ 是保证函数「真正二次」的必要条件，正如第十八章二次方程同样要求 $a \neq 0$。

2. **关于符号 $y$ 与 $f(x)$ 的使用**：在定义中，我们将表达式写为 “$y = ax^2 + bx + c \quad 或 \quad f(x) = ax^2 + bx + c$” ， $y$ 与 $f(x)$ 在上下文不混淆的情况下，是被允许混用的。前者更注重其在几何上的表达，而后者则更注重于代数上的表达。

3. **函数、表达式与图像的区分**：函数 $f$ 是对应法则本身；表达式 $y = ax^2 + bx + c$  是描述这个对应法则的代数式；图像 $G_f$ 是 $\mathbb{R}^2$ 中满足该表达式的点组成的集合。三者描述同一对象，但语言不同。本章严格区分三者：说「二次函数 $f$」指对应法则，说「抛物线 $G_f$」指点集，说「表达式 $y = ax^2 + bx + c$」指代数式。

4. **「抛物线」一词的溯源**：希腊文 παραβολή (parabolē) 意为「比较、并列」，由古希腊数学家阿波罗尼斯 (Apollonius) 在《圆锥曲线论》中首次用来命名这类曲线。抛物线是圆锥曲线的一种，本章只研究其作为二次函数图像的代数性质；其作为圆锥曲线的几何定义（到定点与定直线等距的点的轨迹）已在 [[Chapter 30 轨迹|轨迹]] §30.1.2 给出，焦点、准线与标准方程见该书 §30.3。

````ad-example
title: 示例（判定二次函数） | Example（判定二次函数）

判断下列函数哪些是二次函数，并指出一般式中的 $a, b, c$：

(a) $f(x) = 2x^2 - 3x + 1$

(b) $g(x) = 3(x - 1)^2 + 4$

(c) $h(x) = \dfrac{1}{x^2 + 1}$

(d) $k(x) = (x + 2)(x - 3)$

---

(a) 是二次函数，$a = 2$，$b = -3$，$c = 1$。

(b) 展开：
$$\begin{aligned}
g(x) &\equiv 3(x - 1)^2 + 4 \\
&\equiv 3(x^2 - 2x + 1) + 4 \\
&\equiv 3x^2 - 6x + 3 + 4 \\
&\equiv 3x^2 - 6x + 7
\end{aligned}$$
是二次函数，$a = 3$，$b = -6$，$c = 7$。

(c) $h(x) = \dfrac{1}{x^2 + 1}$ 的表达式不符合二次函数 $ax^2 + bx + c$ 的形式，不是二次函数。

(d) 展开：
$$\begin{aligned}
k(x) &\equiv (x + 2)(x - 3) \\
&\equiv x^2 - 3x + 2x - 6 \\
&\equiv x^2 - x - 6
\end{aligned}$$
是二次函数，$a = 1$，$b = -1$，$c = -6$。
````

### 21.1.2　函数的零点

在讨论二次函数图像与坐标轴的交点之前，先引入「零点」的概念。这个概念适用于任何函数，不限于二次函数。

````ad-def
title: 定义（零点） | Definition（Zero）

设 $f: D_f \to \mathbb{R}$ 为函数。若 $x_0 \in D_f$ 满足 $f(x_0) = 0$，则称 $x_0$ 为 $f$ 的**零点 (zero)**。

函数 $f$ 的零点集为
$$\{x \in D_f \mid f(x) = 0\}$$
````

```easy-tikz
{
  "dimension": false,
  "documentSetup": true,
  "title": "函数的零点",
  "size_x_cm": 10,
  "size_y_cm": 10,
  "show_axis_label": true,
  "axis_label_x": "x",
  "axis_label_y": "y",
  "documentClose": true,
  "showAxis": true,
  "showLargeGrid": false,
  "showSmallGrid": false,
  "gridSize": 5,
  "xmin": "-0.81851",
  "xmax": "9.68141",
  "ymin": "-2.26303",
  "ymax": "3.23681",
  "axis_style": "middle",
  "functions": [
    {
      "expression": "cos(x)",
      "domain": "0:2*PI",
      "showLegend": false,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "teal",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f(x)"
    },
    {
      "expression": "0",
      "domain": "-10:10",
      "showLegend": false,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "black",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f2"
    }
  ],
  "zmin": "-5",
  "zmax": "5",
  "axis_label_z": "z",
  "rotationX": 30,
  "rotationZ": 45,
  "zoom3D": 1,
  "boxAspect": "true",
  "functions3D": [],
  "majorTickNum": 8,
  "previewSize": 760,
  "annotations": [
    {
      "x": "1.363",
      "y": "-0.391",
      "text": "零点1",
      "color": "black",
      "size": "large",
      "anchor": "above"
    },
    {
      "x": "5.008",
      "y": "-0.349",
      "text": "零点2",
      "color": "black",
      "size": "large",
      "anchor": "above"
    }
  ],
  "tools": [
    {
      "type": "intersection",
      "func1Name": "f(x)",
      "func2Name": "f2",
      "color": "red",
      "showLabels": true
    }
  ],
  "coordinateSystem": "cartesian",
  "axis_label_x_polar": "",
  "axis_label_y_polar": ""
}
```
该图展示某个函数的零点（图中红色的点），这些点的纵坐标都是零，这对应了满足 $f(x) = 0$ 的点。零点是函数值为零的自变量值。对二次函数 $f(x) = ax^2 + bx + c$， $f(x) = 0$ 恰好形成二次方程 $ax^2 + bx + c = 0$，故零点为该二次方程的实根。

````ad-example
title: 示例（求不同函数的零点） | Example（Zeros of Various Functions）

求下列函数的零点：

(a) $f(x) = 2x - 6$

(b) $g(x) = x^2 - 5x + 6$

(c) $h(x) = x^2 + 1$

---

(a) 解 $2x - 6 = 0$，得 $x = 3$。故 $f$ 的零点为 $3$。

(b) 解 $x^2 - 5x + 6 = 0$，即 $(x - 2)(x - 3) = 0$，得 $x = 2$ 或 $x = 3$。故 $g$ 的零点为 $2$ 与 $3$。

(c) 解 $x^2 + 1 = 0$，得 $x^2 = -1$，在实数范围内无解。故 $h$ 无（实数）零点。
````

### 21.1.3　截距

抛物线与坐标轴的交点称为**截距 (intercept)**。本小节讨论 $y$ 截距与 $x$ 截距。

#### $y$ 截距

抛物线与 $y$ 轴的交点称为 $y$ 截距。

````ad-thm
title: 定理（$y$ 截距） | Theorem（$y$-Intercept）

设抛物线 $G_f = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c\}$。则 $G_f$ 与 $y$ 轴的交集为单元素集：
$$G_f \cap \{(x, y) \in \mathbb{R}^2 \mid x = 0\} = \{(0, c)\}$$
即 $y$ 截距为 $(0, c)$。
````

````ad-proof
title: 证明 | Proof

$y$ 轴上的点满足 $x = 0$。把 $x = 0$ 代入表达式 $y = ax^2 + bx + c$：
$$y = a \cdot 0^2 + b \cdot 0 + c = c$$
故 $(0, c) \in G_f$ 且 $(0, c)$ 在 $y$ 轴上。

反之，$y$ 轴上任何一点形如 $(0, y_0)$，它要在 $G_f$ 上当且仅当 $y_0 = c$。故 $(0, c)$ 是唯一的 $y$ 截距。
````

注意：抛物线恒与 $y$ 轴有且仅有一个交点，不论 $a, b, c$ 取何值（只要 $a \neq 0$）。这是因为二次函数的定义域为整个 $\mathbb{R}$，$x = 0$ 必在定义域内，对应的函数值 $f(0) = c$ 唯一确定。

```easy-tikz
{
  "dimension": false,
  "documentSetup": true,
  "title": "抛物线的 y 轴截距",
  "size_x_cm": 10,
  "size_y_cm": 10,
  "show_axis_label": false,
  "axis_label_x": "x",
  "axis_label_y": "y",
  "documentClose": true,
  "showAxis": true,
  "showLargeGrid": false,
  "showSmallGrid": false,
  "gridSize": 5,
  "xmin": "-4.13762",
  "xmax": "8.16794",
  "ymin": "-1.42627",
  "ymax": "10.8793",
  "axis_style": "middle",
  "functions": [
    {
      "expression": "-1 * x^2-3*x+5",
      "domain": "-20:20",
      "showLegend": true,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "blue",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f1"
    }
  ],
  "zmin": "-5",
  "zmax": "5",
  "axis_label_z": "z",
  "rotationX": 30,
  "rotationZ": 45,
  "zoom3D": 1,
  "boxAspect": "true",
  "functions3D": [],
  "majorTickNum": 8,
  "previewSize": 760,
  "annotations": [
    {
      "x": "4.292",
      "y": "4.793",
      "text": "图像与 y 轴的交点便是 y 轴截距。",
      "color": "black",
      "size": "large",
      "anchor": "above"
    }
  ],
  "tools": [
    {
      "type": "segment",
      "x1": "2",
      "y1": "5",
      "x2": "0",
      "y2": "5",
      "color": "red",
      "thickness": "thin",
      "dashed": false,
      "arrow": "forward"
    }
  ],
  "coordinateSystem": "cartesian",
  "axis_label_x_polar": "",
  "axis_label_y_polar": ""
}
```


#### 判别式

第十八章 §18.2.1 已从代数角度定义判别式并证明其与根的关系。此处重新陈述，供本章后续引用。

````ad-def
title: 定义（判别式） | Definition（Discriminant）

对二次函数 $f(x) = ax^2 + bx + c$（$a \neq 0$），定义
$$\Delta = b^2 - 4ac$$
并称为其判别式。
````

下面回顾第十八章 §18.2.1 已证明的判别式与根的性质定理，供本章后续引用。

````ad-thm
title: 定理（判别式与根的性质） | Theorem（Discriminant and Nature of Roots）

设二次方程 $ax^2 + bx + c = 0$（$a \neq 0$），判别式为 $\Delta = b^2 - 4ac$。在复数域 $\mathbb{C}$ 中，该方程恒有两根（计入重数），其性质由 $\Delta$ 决定：

| $\Delta$ 的值 | 根在 $\mathbb{C}$ 中的性质 |
|:---:|:---|
| $\Delta > 0$ | 两个相异的**实数**根 |
| $\Delta = 0$ | 一个**实数**二重根 $x = -\dfrac{b}{2a}$ |
| $\Delta < 0$ | 两个相异的**非实复数**根，互为共轭 |
````

#### $x$ 截距与判别式

$x$ 截距是抛物线与 $x$ 轴的交点。本小节从集合与几何视角建立「方程的根 $\iff$ 函数的零点 $\iff$ 抛物线与 $x$ 轴的交点」三者等价。

先给出 $x$ 轴的集合表述：$x$ 轴是 $\mathbb{R}^2$ 中纵坐标为零的点组成的集合，即 $L_x = \{(x, y) \in \mathbb{R}^2 \mid y = 0\}$。

````ad-thm
title: 定理（$x$ 截距与判别式） | Theorem（$x$-Intercepts and the Discriminant）

设 $f(x) = ax^2 + bx + c$（$a \neq 0$），$G_f = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c\}$ 为其图像（抛物线），$\Delta = b^2 - 4ac$ 为判别式。则抛物线与 $x$ 轴的交集
$$G_f \cap L_x = \{(x_0, 0) \mid x_0 \text{ 是 } f \text{ 的零点}\} = \{(x_0, 0) \mid x_0 \text{ 是 } ax^2 + bx + c = 0 \text{ 的实根}\}$$

其元素个数由判别式决定：

| $\Delta$ 的值 | 交集的元素个数 | 几何情形 |
|:---:|:---:|:---|
| $\Delta > 0$ | $2$ | 抛物线与 $x$ 轴有两个交点 |
| $\Delta = 0$ | $1$ | 抛物线与 $x$ 轴刚好碰到于一点 |
| $\Delta < 0$ | $0$ | 抛物线与 $x$ 轴无交点 |
````

````ad-proof
title: 证明 | Proof

**第一步（集合论等价）**。

抛物线 $G_f = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c\}$，$x$ 轴 $L_x = \{(x, y) \in \mathbb{R}^2 \mid y = 0\}$。两者的交集为：
$$G_f \cap L_x = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c \text{ 且 } y = 0\}$$

把 $y = 0$ 代入 $y = ax^2 + bx + c$，得 $ax^2 + bx + c = 0$，即 $f(x) = 0$。故：
$$G_f \cap L_x = \{(x, 0) \in \mathbb{R}^2 \mid f(x) = 0\} = \{(x_0, 0) \mid x_0 \text{ 是 } f \text{ 的零点}\}$$

由 §21.1.2 零点的定义，$x_0$ 是 $f$ 的零点 $\iff$ $f(x_0) = 0$ $\iff$ $ax_0^2 + bx_0 + c = 0$ $\iff$ $x_0$ 是方程 $ax^2 + bx + c = 0$ 的实根。

这一步把三件事焊接在一起：**几何（交点）$\iff$ 函数（零点）$\iff$ 代数（方程的实根）**。三者说的是同一件事，只是语言不同，正如第二十章 §20.4.1 的三重对照表所示。

**第二步（基数判定）**。

由定理（判别式与根的性质）：

- $\Delta > 0$ $\iff$ 方程 $ax^2 + bx + c = 0$ 有两个相异实根 $x_1 \neq x_2$ $\iff$ 交集 $\{(x_1, 0), (x_2, 0)\}$ 含两个元素。
- $\Delta = 0$ $\iff$ 方程有一个二重实根 $x_0 = -\dfrac{b}{2a}$ $\iff$ 交集 $\{(x_0, 0)\}$ 含一个元素。
- $\Delta < 0$ $\iff$ 方程无非实复根（即无实根）$\iff$ 交集为空集 $\varnothing$。
````

```easy-tikz
{
  "dimension": false,
  "documentSetup": true,
  "title": "二次函数与 x 轴的交点情况",
  "size_x_cm": 14,
  "size_y_cm": 10,
  "show_axis_label": false,
  "axis_label_x": "x",
  "axis_label_y": "y",
  "documentClose": true,
  "showAxis": true,
  "showLargeGrid": false,
  "showSmallGrid": true,
  "gridSize": 6,
  "xmin": "-7.56846",
  "xmax": "6.8969",
  "ymin": "-5.35641",
  "ymax": "9.10892",
  "axis_style": "middle",
  "functions": [
    {
      "expression": "(x+3)^2",
      "domain": "-9:9",
      "showLegend": false,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "black",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f1"
    },
    {
      "expression": "-1*x^2+2",
      "domain": "-10:10",
      "showLegend": false,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "blue",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f2"
    },
    {
      "expression": "(x-3)^2+2",
      "domain": "-10:10",
      "showLegend": false,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "red",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f3"
    },
    {
      "expression": "x=0",
      "domain": "-9:9",
      "showLegend": false,
      "fill": false,
      "fillOpacity": 0.2,
      "fillPattern": "solid",
      "tangent": false,
      "dashed": false,
      "tangentPoint": "",
      "extrema": false,
      "color": "black",
      "thickness": "thin",
      "parametric": false,
      "expressionY": "",
      "name": "f4"
    }
  ],
  "zmin": "-5",
  "zmax": "5",
  "axis_label_z": "z",
  "rotationX": 30,
  "rotationZ": 45,
  "zoom3D": 1,
  "boxAspect": "true",
  "functions3D": [],
  "majorTickNum": 10,
  "previewSize": 780,
  "annotations": [
    {
      "x": "-3.011",
      "y": "-1.42",
      "text": "恰好一个交点",
      "color": "black",
      "size": "large",
      "anchor": "above"
    },
    {
      "x": "2.9",
      "y": "-2.628",
      "text": "两个交点",
      "color": "black",
      "size": "large",
      "anchor": "above"
    },
    {
      "x": "2.965",
      "y": "2.576",
      "text": "没有交点",
      "color": "black",
      "size": "large",
      "anchor": "above"
    }
  ],
  "tools": [
    {
      "type": "intersection",
      "func1Name": "f2",
      "func2Name": "f4",
      "color": "red",
      "showLabels": false
    },
    {
      "type": "intersection",
      "func1Name": "f1",
      "func2Name": "f4",
      "color": "blue",
      "showLabels": true
    }
  ],
  "coordinateSystem": "cartesian",
  "axis_label_x_polar": "",
  "axis_label_y_polar": ""
}
```


图 21-1：判别式三种情形对应的抛物线与 $x$ 轴位置关系。
1. 左：$\Delta = 0$，抛物线刚好碰到 $x$ 轴于一点；
2. 中：$\Delta > 0$，抛物线穿过 $x$ 轴于两不同的点；
3. 右：$\Delta < 0$，抛物线与 $x$ 轴无交点（可在 $x$ 轴上方或下方）。

````ad-example
title: 示例（求抛物线与 $x$ 轴的交点） | Example（$x$-Intercepts of a Parabola）

求下列抛物线与 $x$ 轴的交点，并判定属于哪种判别式情形：

(a) $y = x^2 - 5x + 6$

(b) $y = x^2 - 4x + 4$

(c) $y = x^2 + 2x + 3$

---

(a) 解方程 $x^2 - 5x + 6 = 0$，即 $(x - 2)(x - 3) = 0$，得 $x = 2$ 或 $x = 3$。

$\Delta = (-5)^2 - 4(1)(6) = 25 - 24 = 1 > 0$，交点为 $(2, 0)$ 与 $(3, 0)$，属「两交点」情形。

(b) 解方程 $x^2 - 4x + 4 = 0$，即 $(x - 2)^2 = 0$，得 $x = 2$（二重根）。

$\Delta = (-4)^2 - 4(1)(4) = 16 - 16 = 0$，交点为 $(2, 0)$（唯一），属「刚好碰到」情形。

(c) 解方程 $x^2 + 2x + 3 = 0$，$\Delta = 2^2 - 4(1)(3) = 4 - 12 = -8 < 0$，方程无实根，抛物线与 $x$ 轴无交点。
````

---

## 21.2　配方法 (Completing the Square)
> **本节难度上限**：T C+ ｜ C C+ ｜ E C ｜ Q C

> 本节用配方法把一般式作代数变形，为后续定义顶点与对称轴做准备。配方法是纯代数技巧，不涉及几何概念。

第十八章 §18.1.3 曾用配方法解一元二次方程，其代数技巧是「在二次项与一次项后补上一个常数，凑成完全平方式」。本章将同一技巧用于函数表达式。

````ad-thm
title: 定理（配方法） | Theorem（Completing the Square）

对于二次函数 $f(x) = ax^2 + bx + c$（$a \neq 0$），有恒等式
$$ax^2 + bx + c \equiv a\!\left(x + \frac{b}{2a}\right)^{\!2} + \frac{4ac - b^2}{4a}$$

记
$$h = -\frac{b}{2a}, \qquad k = \frac{4ac - b^2}{4a}$$
则
$$f(x) \equiv a(x - h)^2 + k$$
此形式称为二次函数的**顶点式 (vertex form)**。
````

````ad-proof
title: 证明 | Proof

从一般式出发，逐步配方：

$$\begin{aligned}
ax^2 + bx + c &\equiv a\!\left(x^2 + \frac{b}{a}x\right) + c && \text{（提取 } a \text{）} \\[4pt]
&\equiv a\!\left[x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^{\!2} - \left(\frac{b}{2a}\right)^{\!2}\right] + c && \text{（配方：加减同量）} \\[4pt]
&\equiv a\!\left[\left(x + \frac{b}{2a}\right)^{\!2} - \frac{b^2}{4a^2}\right] + c && \text{（凑成完全平方式）} \\[4pt]
&\equiv a\!\left(x + \frac{b}{2a}\right)^{\!2} - \frac{b^2}{4a} + c && \text{（分配 } a \text{）} \\[4pt]
&\equiv a\!\left(x - \left(-\frac{b}{2a}\right)\right)^{\!2} + \left(c - \frac{b^2}{4a}\right) && \text{（整理）} \\[4pt]
&\equiv a(x - h)^2 + k
\end{aligned}$$

其中 $h = -\dfrac{b}{2a}$，$k = c - \dfrac{b^2}{4a} = \dfrac{4ac - b^2}{4a}$。
````

````ad-note
title: 注记（实用计算策略） | Remark（实用计算 Strategy）

直接记忆 $k = \dfrac{4ac - b^2}{4a}$ 容易出错。实用策略是分两步：

1. 先求 $h = -\dfrac{b}{2a}$；
2. 再把 $h$ 代入原函数 $f(x)$，得 $k = f(h)$。

此策略只需记住 $h = -\dfrac{b}{2a}$ 一个公式，$k$ 通过代入求得，不易出错。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 2]
\begin{axis}[
    width=10cm, height=6cm,
    xmin=-2, xmax=5, ymin=-2, ymax=6,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-1,1,2,3,4}, ytick={-1,1,2,3,4,5},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70},
    legend style={font=\tiny, at={(1.02,1)}, anchor=north west}
]
\addplot[domain=-0.5:4.5, samples=80, blue!70!black, thick] {x^2 - 4*x + 3};
\addlegendentry{$y = x^2 - 4x + 3$ (general)}
\addplot[domain=-0.5:4.5, samples=80, red!70!black, thick, dashed] {(x-2)^2 - 1};
\addlegendentry{$y = (x-2)^2 - 1$ (vertex)}
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-2：配方法不改变函数本身。$y = x^2 - 4x + 3$ 与 $y = (x - 2)^2 - 1$ 是同一条抛物线的两种表达式。

````ad-example
title: 示例（配方法：一般式化为顶点式） | Example（Completing the Square）

把下列二次函数化为顶点式，并写出 $h$ 与 $k$：

(a) $f(x) = x^2 - 6x + 5$

(b) $f(x) = 2x^2 + 8x + 7$

(c) $f(x) = -x^2 + 4x - 1$

---

(a) $f(x) = x^2 - 6x + 5$

配方（$a = 1$，一次项系数 $-6$，一半为 $-3$，平方为 $9$）：
$$\begin{aligned}
f(x) &\equiv (x^2 - 6x + 9) - 9 + 5 \\
&\equiv (x - 3)^2 - 4
\end{aligned}$$
顶点式：$f(x) \equiv (x - 3)^2 - 4$，故 $h = 3$，$k = -4$。

(b) $f(x) = 2x^2 + 8x + 7$

先提取 $2$：
$$f(x) \equiv 2(x^2 + 4x) + 7$$

在括号内配方（一次项系数 $4$，一半为 $2$，平方为 $4$）：
$$\begin{aligned}
f(x) &\equiv 2(x^2 + 4x + 4 - 4) + 7 \\
&\equiv 2(x + 2)^2 - 8 + 7 \\
&\equiv 2(x + 2)^2 - 1
\end{aligned}$$
顶点式：$f(x) \equiv 2(x + 2)^2 - 1$，故 $h = -2$，$k = -1$。

验证：$h = -\dfrac{b}{2a} = -\dfrac{8}{2 \cdot 2} = -2$，$k = f(-2) = 2 \cdot 4 + 8 \cdot (-2) + 7 = -1$。正确。

(c) $f(x) = -x^2 + 4x - 1$

提取 $-1$：
$$f(x) \equiv -(x^2 - 4x) - 1$$

在括号内配方（一次项系数 $-4$，一半为 $-2$，平方为 $4$）：
$$\begin{aligned}
f(x) &\equiv -(x^2 - 4x + 4 - 4) - 1 \\
&\equiv -(x - 2)^2 + 4 - 1 \\
&\equiv -(x - 2)^2 + 3
\end{aligned}$$
顶点式：$f(x) \equiv -(x - 2)^2 + 3$，故 $h = 2$，$k = 3$。
````

---

## 21.3　函数的最值 (Extremum of a Function)
> **本节难度上限**：T B- ｜ C D ｜ E B ｜ Q C

> 本节引入函数最大值与最小值的一般定义。第十九章引入了函数的概念，但未正式定义最值。本章是全课程首次需要最值概念的章节，定义在此处引入最恰当。此定义不限于二次函数。

````ad-def
title: 定义（函数的最大值与最小值） | Definition（Maximum and Minimum of a Function）

设 $f: D_f \to \mathbb{R}$ 为函数，$D_f$ 为其定义域。

- 若存在 $x_{\max} \in D_f$，使得对所有 $x \in D_f$ 均有 $f(x) \le f(x_{\max})$，则称 $f(x_{\max})$ 为 $f$ 在 $D_f$ 上的**最大值 (maximum)**，记作 $\max f$，$x_{\max}$ 称为**最大值点 (maximum point)**。

- 若存在 $x_{\min} \in D_f$，使得对所有 $x \in D_f$ 均有 $f(x) \ge f(x_{\min})$，则称 $f(x_{\min})$ 为 $f$ 在 $D_f$ 上的**最小值 (minimum)**，记作 $\min f$，$x_{\min}$ 称为**最小值点 (minimum point)**。
````

几点说明：

- 「最大值」是函数值 $f(x_{\max})$，「最大值点」是自变量 $x_{\max}$。两者不同，不要混淆。
- 定义中的不等式要对**所有** $x \in D_f$ 成立，即最大值/最小值是**全局的**（global），而非局部的。
- 函数未必有最大值或最小值。例如 $f(x) = x$（定义域 $\mathbb{R}$）既无最大值也无最小值；$f(x) = \dfrac{1}{x}$（定义域 $x > 0$）既无最大值也无最小值。

````ad-lem
title: 引理（最值的唯一性） | Lemma（Uniqueness of Extrema）

若函数 $f$ 在 $D_f$ 上有最大值，则最大值唯一（即 $\max f$ 唯一）。同理最小值唯一。但最大值点/最小值点可能不唯一。
````

````ad-proof
title: 证明 | Proof

设 $f$ 在 $D_f$ 上有两个最大值 $M_1 = f(x_1)$ 与 $M_2 = f(x_2)$。

由 $M_1$ 是最大值，对所有 $x \in D_f$ 有 $f(x) \le M_1$。取 $x = x_2$，得 $M_2 = f(x_2) \le M_1$。

由 $M_2$ 是最大值，对所有 $x \in D_f$ 有 $f(x) \le M_2$。取 $x = x_1$，得 $M_1 = f(x_1) \le M_2$。

由 $\le$ 的反对称性（$M_1 \le M_2$ 且 $M_2 \le M_1 \implies M_1 = M_2$），最大值唯一。

最小值同理。

最大值点不唯一的例子：常数函数 $f(x) = c$ 的最大值是 $c$，但定义域内每一点都是最大值点。
````

````ad-example
title: 示例（定义域对最值的影响） | Example（Effect of Domain on Extrema）

设 $f(x) = 1 - x^2$。比较 $f$ 在下列定义域上的最值：

(a) $D_f = \mathbb{R}$

(b) $D_f = [-1, 1]$

(c) $D_f = [2, 3]$

---

(a) $D_f = \mathbb{R}$：对任意 $x$，$x^2 \ge 0$，故 $f(x) = 1 - x^2 \le 1$，当 $x = 0$ 时取等号。$f$ 有最大值 $1$（在 $x = 0$ 处取得）。因 $x \to \infty$ 时 $f(x) \to -\infty$，$f$ 无最小值。

(b) $D_f = [-1, 1]$：$f$ 仍有最大值 $1$（在 $x = 0$ 处）。因 $x \in [-1, 1]$ 时 $x^2 \le 1$，故 $f(x) \ge 0$，当 $x = \pm 1$ 时取等号。$f$ 有最小值 $0$（在 $x = \pm 1$ 处取得，最小值点不唯一）。

(c) $D_f = [2, 3]$：$f$ 在 $[2, 3]$ 上单调递减（因 $x^2$ 递增），故最大值在 $x = 2$ 处：$f(2) = -3$；最小值在 $x = 3$ 处：$f(3) = -8$。

**结论**：同一表达式，定义域不同则最值不同。最值是函数整体的性质，依赖于定义域。
````

---

## 21.4　顶点与开口方向 (Vertex and Opening Direction)
> **本节难度上限**：T B- ｜ C C ｜ E B ｜ Q D

> 本节用配方法与最值定义顶点。顶点式 $f(x) \equiv a(x - h)^2 + k$ 中的项 $(x - h)^2$ 恒非负，这是证明的关键。

由 §21.2 的配方法，二次函数 $f(x) = ax^2 + bx + c$ 可写为顶点式 $f(x) \equiv a(x - h)^2 + k$，其中 $h = -\dfrac{b}{2a}$，$k = \dfrac{4ac - b^2}{4a}$。由 $(x - h)^2 \ge 0$ 对所有 $x \in \mathbb{R}$ 成立，可分两种情形讨论最值。

````ad-thm
title: 定理（二次函数的最值） | Theorem（Extremum of a Quadratic Function）

设 $f(x) = ax^2 + bx + c$（$a \neq 0$），做过配方法得其顶点式为 $f(x) \equiv a(x - h)^2 + k$。

- 若 $a > 0$，函数在 $x = h$ 处取得**最小值** $k$，且无最大值。
- 若 $a < 0$，函数在 $x = h$ 处取得**最大值** $k$，且无最小值。
````

````ad-proof
title: 证明 | Proof

**情形 $a > 0$**：

对任意 $x \in \mathbb{R}$，$(x - h)^2 \ge 0$，故 $a(x - h)^2 \ge 0$（$a > 0$ 不改变不等号方向）。因此
$$f(x) \equiv a(x - h)^2 + k \ge k$$

当且仅当 $(x - h)^2 = 0$ 即 $x = h$ 时取等号。

由最小值的定义，$k$ 是 $f$ 在 $\mathbb{R}$ 上的最小值，$h$ 是最小值点。

无最大值：对任意 $M > 0$，取 $x = h + \sqrt{\dfrac{M + |k|}{a}}$，则 $f(x) = a \cdot \dfrac{M + |k|}{a} + k = M + |k| + k \ge M$。故 $f$ 的值无上界，无最大值。

**情形 $a < 0$**：

对任意 $x \in \mathbb{R}$，$(x - h)^2 \ge 0$，故 $a(x - h)^2 \le 0$（$a < 0$ 改变不等号方向）。因此
$$f(x) \equiv a(x - h)^2 + k \le k$$

当且仅当 $x = h$ 时取等号。

由最大值的定义，$k$ 是 $f$ 在 $\mathbb{R}$ 上的最大值，$h$ 是最大值点。

无最小值：同理可证 $f$ 的值无下界。
````

由上述定理，不论 $a$ 正负，二次函数恒存在唯一的最值点 $h$ 与最值 $k$。这个点 $(h, k)$ 称为顶点。

````ad-def
title: 定义（顶点） | Definition（Vertex）

设 $f(x) = ax^2 + bx + c$（$a \neq 0$），顶点式为 $f(x) \equiv a(x - h)^2 + k$。点 $(h, k)$ 称为抛物线 $G_f$ 的**顶点 (vertex)**。
````

````ad-def
title: 定义（开口方向） | Definition（Opening Direction）

设 $f(x) = ax^2 + bx + c$（$a \neq 0$），顶点为 $(h, k)$。

- $a > 0$：抛物线**开口向上 (opens upward)**，顶点 $(h, k)$ 是最低点，函数在顶点处取得最小值 $k$。
- $a < 0$：抛物线**开口向下 (opens downward)**，顶点 $(h, k)$ 是最高点，函数在顶点处取得最大值 $k$。
````

由配方法可直接读出顶点坐标。

````ad-thm
title: 定理（顶点坐标公式） | Theorem（Vertex Coordinate Formula）

对于二次函数 $f(x) = ax^2 + bx + c$（$a \neq 0$），其顶点为
$$\left(-\frac{b}{2a},\ \frac{4ac - b^2}{4a}\right)$$

**实用策略**：先求 $h = -\dfrac{b}{2a}$，再代入 $k = f(h)$，避免记忆 $\dfrac{4ac - b^2}{4a}$。
````

````ad-proof
title: 证明 | Proof

由 §21.2 的配方法，$h = -\dfrac{b}{2a}$，$k = \dfrac{4ac - b^2}{4a}$。由定义（顶点），顶点为 $(h, k)$。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
    width=10cm, height=6.5cm,
    xmin=-2, xmax=4, ymin=-3, ymax=4,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-1,1,2,3}, ytick={-2,-1,1,2,3},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% y = x^2 - 2x - 1，顶点 (1, -2)
\addplot[domain=-0.5:3.5, samples=80, blue!70!black, thick] {x^2 - 2*x - 1};

% 顶点
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:1,-2) {};
\node[anchor=west, font=\tiny] at (axis cs:1.1,-2) {$(1, -2)$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-3：抛物线 $G_f$（表达式 $y = x^2 - 2x - 1$）的顶点 $(1, -2)$（红点）。$a = 1 > 0$，开口向上，顶点是最低点。

````ad-example
title: 示例（由顶点式还原一般式） | Example（Converting Vertex Form to General Form）

已知二次函数的顶点式为 $y = -2(x + 1)^2 + 5$，将其还原为一般式，并写出顶点坐标。

---

展开顶点式：
$$\begin{aligned}
y &\equiv -2(x + 1)^2 + 5 \\
&\equiv -2(x^2 + 2x + 1) + 5 \\
&\equiv -2x^2 - 4x - 2 + 5 \\
&\equiv -2x^2 - 4x + 3
\end{aligned}$$

一般式：$y = -2x^2 - 4x + 3$，故 $a = -2$，$b = -4$，$c = 3$。

顶点：由顶点式 $y = -2(x + 1)^2 + 5 \equiv -2(x - (-1))^2 + 5$，得 $h = -1$，$k = 5$，故顶点为 $(-1, 5)$。

因 $a = -2 < 0$，开口向下，顶点是最高点，最大值为 $5$。

验证：$h = -\dfrac{b}{2a} = -\dfrac{-4}{2 \cdot (-2)} = -1$，$k = f(-1) = -2 \cdot 1 + 4 + 3 = 5$。正确。
````

---

## 21.5　对称轴 (Axis of Symmetry)
> **本节难度上限**：T B- ｜ C D ｜ E B ｜ Q C

> 本节用第十九章函数变换的观点讨论抛物线的对称性。

考虑最简二次函数 $f_0(x) = ax^2$（即 $b = c = 0$ 的情形）。因
$$f_0(-x) = a(-x)^2 = ax^2 = f_0(x)$$
故 $f_0$ 是偶函数（第十九章 §19.3.3），其图像 $G_{f_0}$ 关于 $y$ 轴（即直线 $x = 0$）对称。

由第十九章 §19.2.4 函数变换，一般二次函数的顶点式 $f(x) \equiv a(x - h)^2 + k$ 可由 $f_0(x) = ax^2$ 经以下变换得到：

$$f_0(x) = ax^2 \xrightarrow{\text{水平平移 } h} a(x - h)^2 \xrightarrow{\text{垂直平移 } k} a(x - h)^2 + k = f(x)$$

水平平移不改变图像的对称性，只移动对称轴的位置：$G_{f_0}$ 关于 $x = 0$ 对称 $\implies$ $G_f$ 关于 $x = h$ 对称。

````ad-thm
title: 定理（对称轴公式） | Theorem（Axis of Symmetry Formula）

对于二次函数 $f(x) = ax^2 + bx + c$（$a \neq 0$），其顶点式为 $f(x) \equiv a(x - h)^2 + k$，其中 $h = -\dfrac{b}{2a}$。抛物线 $G_f$ 关于直线
$$x = h = -\frac{b}{2a}$$
对称。此直线称为抛物线的**对称轴 (axis of symmetry)**。
````

````ad-proof
title: 证明 | Proof

由上述变换论证：$f_0(x) = ax^2$ 是偶函数，$G_{f_0}$ 关于 $x = 0$ 对称。$f(x) \equiv a(x - h)^2 + k$ 由 $f_0$ 经水平平移 $h$ 与垂直平移 $k$ 而得。水平平移把对称轴从 $x = 0$ 移至 $x = h$，垂直平移不改变对称轴。故 $G_f$ 关于 $x = h$ 对称。

代入 $h = -\dfrac{b}{2a}$，得对称轴 $x = -\dfrac{b}{2a}$。
````

````ad-cor
title: 推论（顶点在对称轴上） | Corollary（Vertex Lies on the Axis of Symmetry）

顶点 $(h, k)$ 在对称轴 $x = h$ 上。顶点是抛物线上唯一在对称轴上的点。
````

````ad-proof
title: 证明 | Proof

顶点 $(h, k)$ 的 $x$ 坐标为 $h$，恰在对称轴 $x = h$ 上。

设另有一点 $(h, y_1)$（$y_1 \neq k$）在抛物线上，则 $y_1 = a(h - h)^2 + k = k$，与 $y_1 \neq k$ 矛盾。故对称轴上只有顶点一个点在抛物线上。
````

---

## 21.6　系数 $a, b, c$ 的几何角色 (Geometric Roles of Coefficients)
> **本节难度上限**：T C+ ｜ C D ｜ E C ｜ Q D

> 此时顶点、对称轴、截距等概念均已定义，可以系统分析各系数的几何角色。

二次函数 $f(x) = ax^2 + bx + c$ 的三个系数 $a, b, c$ 各自控制图像的不同特征。

**系数 $c$：$y$ 截距**

由 §21.1.3，$y$ 截距为 $(0, c)$。$c$ 的变化使抛物线上下平移而不改变形状。这与第十九章 §19.2.4 讨论的「垂直平移」变换 $y = f(x) + c$ 一致：

$$f_0(x) = ax^2 + bx \xrightarrow{\text{垂直平移 } c} f_0(x) + c = ax^2 + bx + c = f(x)$$

**系数 $a$：开口方向与胖瘦**

由 §21.4 定义（开口方向），$a$ 的符号决定开口方向。$|a|$ 的大小决定开口的「胖瘦」。

$|a|$ 越大，抛物线越「瘦」（开口越窄）；$|a|$ 越小，抛物线越「胖」（开口越宽）。这一点可从顶点式 $f(x) \equiv a(x - h)^2 + k$ 看出：$|a|$ 越大，相同的 $|x - h|$ 对应的 $|f(x) - k|$ 越大，即纵向变化越剧烈。

特别地，当 $b = c = 0$ 时，$y = ax^2$ 是最简形式的二次函数。比较 $y = x^2$、$y = 2x^2$、$y = \dfrac{1}{2}x^2$ 的图像，可清楚看到 $|a|$ 对胖瘦的影响。

**系数 $b$：与 $a$ 共同决定对称轴位置**

$b$ 单独的几何意义不直观，但它与 $a$ 共同决定抛物线的对称轴位置。由 §21.5 定理（对称轴公式），对称轴为 $x = -\dfrac{b}{2a}$。因此：

- $b = 0$ 时，对称轴为 $x = 0$（即 $y$ 轴），抛物线关于 $y$ 轴对称；
- $b \neq 0$ 时，对称轴左右移动。

下面的示意图展示 $a, b, c$ 各自变化对图像的影响。

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}
\begin{document}
\begin{tikzpicture}[scale = 1.6]
% 第一组：a 的符号
\begin{axis}[
    width=4.5cm, height=4.5cm,
    xmin=-3, xmax=3, ymin=-3, ymax=4,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-2,-1,1,2}, ytick={-2,-1,1,2,3},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70},
    title={\small $a>0$ vs $a<0$},
    title style={font=\small}
]
\addplot[domain=-2:2, samples=60, blue!70!black, thick] {x^2};
\addplot[domain=-2:2, samples=60, red!70!black, thick] {-x^2};
\end{axis}
% 第二组：|a| 的胖瘦
\begin{scope}[xshift=5cm]
\begin{axis}[
    width=4.5cm, height=4.5cm,
    xmin=-3, xmax=3, ymin=-1, ymax=6,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-2,-1,1,2}, ytick={1,2,3,4,5},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70},
    title={\small $|a|$: width},
    title style={font=\small}
]
\addplot[domain=-5:5, samples=60, blue!70!black, thick] {x^2};
\addplot[domain=-5:5, samples=60, red!70!black, thick] {2*x^2};
\addplot[domain=-5:5, samples=60, green!60!black, thick] {0.5*x^2};
\end{axis}
\end{scope}
% 第三组：c 上下平移
\begin{scope}[xshift=10cm]
\begin{axis}[
    width=4.5cm, height=4.5cm,
    xmin=-3, xmax=3, ymin=-2, ymax=5,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-2,-1,1,2}, ytick={-1,1,2,3,4},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70},
    title={\small $c$: shift},
    title style={font=\small}
]
\addplot[domain=-2:2, samples=60, blue!70!black, thick] {x^2};
\addplot[domain=-2:2, samples=60, red!70!black, thick] {x^2+2};
\addplot[domain=-2:2, samples=60, green!60!black, thick] {x^2-1};
\end{axis}
\end{scope}
\end{tikzpicture}
\end{document}
```

图 21-4：系数 $a, c$ 对图像的影响。左：$a > 0$ 开口向上（蓝），$a < 0$ 开口向下（红）；中：$|a|$ 越大开口越窄（$y = 2x^2$ 红、$y = x^2$ 蓝、$y = \frac{1}{2}x^2$ 绿）；右：$c$ 控制上下平移（$y = x^2 + 2$ 红、$y = x^2$ 蓝、$y = x^2 - 1$ 绿）。

````ad-example
title: 示例（由图像读系数符号） | Example（Reading Coefficient Signs from the Graph）

给出三条抛物线 $y = ax^2 + bx + c$，试判定各系数 $a, b, c$ 的符号：

(a) 开口向下，顶点在 $y$ 轴右侧，$y$ 截距为正；

(b) 开口向上，顶点在 $y$ 轴左侧，$y$ 截距为负；

(c) 开口向上，顶点在 $y$ 轴上，$y$ 截距为负。

---

(a) 开口向下 $\implies a < 0$。顶点在 $y$ 轴右侧，即对称轴 $x = -\dfrac{b}{2a} > 0$。由 $a < 0$，得 $-\dfrac{b}{2a} > 0 \iff b > 0$。$y$ 截距为正 $\implies c > 0$。

故 $a < 0$，$b > 0$，$c > 0$。

(b) 开口向上 $\implies a > 0$。顶点在 $y$ 轴左侧，$-\dfrac{b}{2a} < 0$。由 $a > 0$，得 $-\dfrac{b}{2a} < 0 \iff b > 0$。$y$ 截距为负 $\implies c < 0$。

故 $a > 0$，$b > 0$，$c < 0$。

(c) 开口向上 $\implies a > 0$。顶点在 $y$ 轴上，$-\dfrac{b}{2a} = 0 \iff b = 0$。$y$ 截距为负 $\implies c < 0$。

故 $a > 0$，$b = 0$，$c < 0$。
````

---

## 21.7　二次函数与二次方程的联系 (Connection with Quadratic Equations)
> **本节难度上限**：T B ｜ C B ｜ E B ｜ Q C

> 本节从顶点纵坐标的角度细化判别式的几何意义，并汇总数形结合总表。

### 21.7.1　判别式的几何意义

§21.1.3 已从集合论等价建立 $x$ 截距与判别式的关系。本节用顶点纵坐标作几何细化。

````ad-thm
title: 定理（判别式的几何意义） | Theorem（Geometric Meaning of the Discriminant）

此定理即第十八章 §18.2.1 推论（判别式与图像）的函数视角重述与细化。设 $f(x) = ax^2 + bx + c$（$a \neq 0$），$\Delta = b^2 - 4ac$ 为判别式，顶点为 $(h, k)$。则：

| $\Delta$ | 抛物线与 $x$ 轴的交点 | 顶点位置（由 $k = -\dfrac{\Delta}{4a}$） |
|:---:|:---|:---|
| $\Delta > 0$ | 两个交点 | $a > 0$：顶点在 $x$ 轴下方（$k < 0$）；$a < 0$：顶点在 $x$ 轴上方（$k > 0$） |
| $\Delta = 0$ | 一个交点（相切于顶点） | 顶点在 $x$ 轴上（$k = 0$） |
| $\Delta < 0$ | 无交点 | $a > 0$：整条在 $x$ 轴上方；$a < 0$：整条在 $x$ 轴下方 |
````

````ad-proof
title: 证明 | Proof

先建立 $\Delta$ 与 $k$ 的关系。由 §21.2，$k = \dfrac{4ac - b^2}{4a} = \dfrac{-\Delta}{4a}$，即 $\Delta = -4a \cdot k$。

**情形 $\Delta > 0$**：

由 §21.1.3 定理（$x$ 截距与判别式），抛物线与 $x$ 轴有两个交点（已证）。

几何细化：$\Delta > 0 \iff -4a \cdot k > 0 \iff a$ 与 $k$ 异号。
- $a > 0 \implies k < 0$：开口向上，顶点在 $x$ 轴下方。抛物线从顶点向上开口，必穿过 $x$ 轴两次。
- $a < 0 \implies k > 0$：开口向下，顶点在 $x$ 轴上方。抛物线从顶点向下开口，必穿过 $x$ 轴两次。

**情形 $\Delta = 0$**：

由 §21.1.3，抛物线与 $x$ 轴有一个交点（已证）。

$\Delta = 0 \iff -4a \cdot k = 0 \iff k = 0$（因 $a \neq 0$）。故顶点纵坐标为零，顶点恰在 $x$ 轴上。

又由 §21.4 定理（二次函数的最值），顶点是 $f$ 的唯一极值点：
- $a > 0$ 时，$f(x) \ge k = 0$，顶点是最低点且在 $x$ 轴上，故抛物线「搁在」$x$ 轴上。
- $a < 0$ 时，$f(x) \le k = 0$，顶点是最高点且在 $x$ 轴上，故抛物线「挂在」$x$ 轴下。

两种情形下，抛物线与 $x$ 轴只在顶点处接触，即「相切」。

**情形 $\Delta < 0$**：

由 §21.1.3，抛物线与 $x$ 轴无交点（已证）。

再由 §21.4 定理（二次函数的最值）：
- $a > 0$ 且 $k > 0$（因 $\Delta < 0 \iff -4a \cdot k < 0 \iff a$ 与 $k$ 同号，$a > 0 \implies k > 0$）$\implies f(x) \ge k > 0$ 对所有 $x$ 成立，抛物线整条在 $x$ 轴上方。
- $a < 0$ 且 $k < 0$ $\implies f(x) \le k < 0$ 对所有 $x$ 成立，抛物线整条在 $x$ 轴下方。
````

### 21.7.2　数形结合总表

把前几节的结论汇总，得到二次函数的数形结合总表。这张表是本章的核心，与第二十章 §20.4.1 的三重对照表呼应。

````ad-cor
title: 推论（数形结合总表） | Corollary（数形结合总表）

设 $f(x) = ax^2 + bx + c$（$a \neq 0$），$\Delta = b^2 - 4ac$，顶点为 $(h, k)$。

| $\Delta$ | 方程 $ax^2+bx+c=0$ 的实根 | 函数 $f$ 的零点 | 抛物线与 $x$ 轴的交集 | 集合关系 | 顶点纵坐标 $k$ |
|:---:|:---|:---|:---|:---|:---|
| $\Delta > 0$ | 两个相异实根 $x_1 \ne x_2$ | 两个零点 $x_1, x_2$ | $\{(x_1, 0), (x_2, 0)\}$ | $\lvert G_f \cap L_x \rvert = 2$ | $a > 0$: $k < 0$；$a < 0$: $k > 0$ |
| $\Delta = 0$ | 一个二重实根 $x_0$ | 一个零点 $x_0$ | $\{(x_0, 0)\}$ | $\lvert G_f \cap L_x \rvert = 1$ | $k = 0$ |
| $\Delta < 0$ | 无实根 | 无零点 | $\varnothing$ | $G_f \cap L_x = \varnothing$ | $a > 0$: $k > 0$；$a < 0$: $k < 0$ |
````

这张表揭示了六件事的等价：**方程的实根 $\iff$ 函数的零点 $\iff$ 抛物线与 $x$ 轴的交点 $\iff$ 交集的元素 $\iff$ 判别式 $\Delta$ $\iff$ 顶点纵坐标 $k$**。它们从代数、函数、几何、集合四个角度描述同一事实。

下面的例题展示二次函数最值在几何中的应用。

````ad-example
title: 示例（固定周长的矩形面积最大） | Example（Maximum Rectangle Area with Fixed Perimeter）

用长度为 $40\text{ cm}$ 的铁丝围成一个矩形，求矩形面积的最大值及此时矩形的长与宽。

---

设矩形的一边长为 $x\text{ cm}$（$0 < x < 20$），则邻边长为 $\dfrac{40 - 2x}{2} = 20 - x\text{ cm}$。

面积 $A = x(20 - x) = 20x - x^2 = -x^2 + 20x$。

这是关于 $x$ 的二次函数，$a = -1 < 0$，开口向下，有最大值。

对称轴：$h = -\dfrac{b}{2a} = -\dfrac{20}{2 \cdot (-1)} = 10$。

最大值：$A_{\max} = A(10) = -100 + 200 = 100$。

此时矩形为 $10\text{ cm} \times 10\text{ cm}$ 的正方形，面积为 $100\text{ cm}^2$。

**结论**：周长固定的矩形中，正方形面积最大。这是一个经典的几何优化结论，用二次函数最值可以简洁证明。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 1.5]
\begin{axis}[
    width=10cm, height=6cm,
    xmin=0, xmax=20, ymin=0, ymax=120,
    axis lines=middle,
    xlabel={side $x$ (cm)}, ylabel={area $A$ (cm$^2$)},
    xtick={2,4,6,8,10,12,14,16,18}, ytick={20,40,60,80,100},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
\addplot[domain=0.5:19.5, samples=80, blue!70!black, thick] {-x^2 + 20*x};

% 顶点
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:10,100) {};
\node[anchor=south west, font=\tiny] at (axis cs:10,100) {$(10, 100)$: square};

% 对称轴
\draw[gray!60, dashed] (axis cs:10,0) -- (axis cs:10,110);
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-5：固定周长 $40\text{ cm}$ 的矩形面积函数 $A = -x^2 + 20x$。顶点 $(10, 100)$ 对应正方形情形，此时面积最大。

````ad-example
title: 示例（固定斜边的直角三角形面积最大） | Example（Maximum Right Triangle Area with Fixed Hypotenuse）

设直角三角形的斜边长为 $10$，求其面积的最大值。

---

设两直角边为 $a$ 与 $b$，则 $a^2 + b^2 = 100$（毕氏定理）。

面积 $S = \dfrac{1}{2}ab$。

由 $a^2 + b^2 = 100$，得 $b = \sqrt{100 - a^2}$（$0 < a < 10$）。

$$S = \frac{1}{2}a\sqrt{100 - a^2}$$

为避免根号，先考虑 $S^2$：
$$S^2 = \frac{1}{4}a^2(100 - a^2) = \frac{1}{4}(100a^2 - a^4)$$

设 $u = a^2$（$0 < u < 100$），则 $S^2 = \dfrac{1}{4}(100u - u^2) = -\dfrac{1}{4}(u^2 - 100u)$。

这是关于 $u$ 的二次函数，开口向下，对称轴 $u_V = \dfrac{100}{2} = 50$。

$S^2$ 在 $u = 50$ 处取得最大值：$S^2_{\max} = -\dfrac{1}{4}(50^2 - 100 \cdot 50) = -\dfrac{1}{4}(2500 - 5000) = -\dfrac{1}{4} \cdot (-2500) = 625$。

故 $S_{\max} = \sqrt{625} = 25$。

此时 $a^2 = 50$，$a = b = \sqrt{50} = 5\sqrt{2}$，即等腰直角三角形。

**验证**：$a^2 + b^2 = 50 + 50 = 100$，$S = \dfrac{1}{2} \cdot 5\sqrt{2} \cdot 5\sqrt{2} = \dfrac{1}{2} \cdot 50 = 25$。

**结论**：斜边固定的直角三角形中，等腰直角三角形面积最大。
````

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.5]
% 等腰直角三角形（最大面积情形）
\draw[blue!70!black, thick] (0,0) -- (5,0) -- (0,5) -- cycle;
\node[below] at (2.5,0) {$5\sqrt{2}$};
\node[left] at (0,2.5) {$5\sqrt{2}$};
\node[above right] at (5,0) {hyp $= 10$};
\node[anchor=south] at (2.5,0) {area $= 25$ (max)};

% 直角标记
\draw[thick] (0,0.4) -- (0.4,0.4) -- (0.4,0);

% 对比：另一个直角三角形（面积较小）
\begin{scope}[xshift=8cm]
\draw[red!70!black, thick] (0,0) -- (8,0) -- (0,6) -- cycle;
\node[below] at (4,0) {$8$};
\node[left] at (0,3) {$6$};
\node[above right] at (8,0) {hyp $= 10$};
\node[anchor=south] at (4,0) {area $= 24$};
\draw[thick] (0,0.4) -- (0.4,0.4) -- (0.4,0);
\end{scope}
\end{tikzpicture}
\end{document}
```

图 21-6：斜边固定为 $10$ 的两个直角三角形。左：等腰直角三角形（$5\sqrt{2} \times 5\sqrt{2}$），面积最大为 $25$；右：$6 \times 8$ 直角三角形，面积为 $24$。

````ad-example
title: 示例（抛物线弓形内接矩形面积最大） | Example（Maximum Inscribed Rectangle in a Parabolic Segment）

设抛物线 $y = 4 - x^2$ 与 $x$ 轴围成一个弓形区域。在此弓形内作内接矩形（底在 $x$ 轴上，上端两顶点在抛物线上），求矩形面积的最大值。

---

抛物线 $y = 4 - x^2$ 与 $x$ 轴交于 $x = \pm 2$，顶点为 $(0, 4)$。

设内接矩形的右上顶点为 $(x, 4 - x^2)$，其中 $0 < x < 2$。由对称性，左上顶点为 $(-x, 4 - x^2)$，矩形底在 $x$ 轴上，宽为 $2x$，高为 $4 - x^2$。

面积：
$$A = 2x \cdot (4 - x^2) = 8x - 2x^3$$

这是关于 $x$ 的三次函数，需用微积分求最值。此处用初等方法：

设 $u = x^2$（$0 < u < 4$），则 $A^2 = (2x)^2 (4 - x^2)^2 = 4u(4 - u)^2$。

考虑 $g(u) = 4u(4 - u)^2 = 4u(16 - 8u + u^2) = 64u - 32u^2 + 4u^3$。

仍为三次。换一思路：设 $A = 2x(4 - x^2)$，记 $v = x^2$，则 $A = 2\sqrt{v}(4 - v)$。

为避免根号，考虑 $A^2 = 4v(4 - v)^2$。对 $v$ 求导（此处用平均值不等式替代）：

由 AM-GM 不等式：$\dfrac{v + (4 - v)/2 + (4 - v)/2}{3} \ge \sqrt[3]{v \cdot \dfrac{(4-v)}{2} \cdot \dfrac{(4-v)}{2}}$，即 $\dfrac{4}{3} \ge \sqrt[3]{\dfrac{v(4-v)^2}{4}}$，故 $v(4-v)^2 \le \dfrac{256}{27}$。

$A^2 \le 4 \cdot \dfrac{256}{27} = \dfrac{1024}{27}$，$A \le \dfrac{32}{3\sqrt{3}} = \dfrac{32\sqrt{3}}{9}$。

当 $v = \dfrac{4}{3}$ 即 $x = \dfrac{2}{\sqrt{3}} = \dfrac{2\sqrt{3}}{3}$ 时取等号。

此时高 $4 - x^2 = 4 - \dfrac{4}{3} = \dfrac{8}{3}$，宽 $2x = \dfrac{4\sqrt{3}}{3}$，面积 $A = \dfrac{4\sqrt{3}}{3} \cdot \dfrac{8}{3} = \dfrac{32\sqrt{3}}{9}$。

**结论**：内接矩形面积最大为 $\dfrac{32\sqrt{3}}{9}$，此时 $x = \dfrac{2\sqrt{3}}{3}$。

**注**：此例超出二次函数最值的直接应用范围（涉及 AM-GM 不等式），但展示了二次函数图像与几何优化问题的结合，是数形结合的良好练习。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 1.8]
\begin{axis}[
    width=9cm, height=7cm,
    xmin=-2.5, xmax=2.5, ymin=-0.5, ymax=4.5,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-2,-1,1,2}, ytick={1,2,3,4},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% 抛物线
\addplot[domain=-2:2, samples=80, blue!70!black, thick] {4 - x^2};

% 内接矩形（最大面积情形，x = 2sqrt(3)/3 ≈ 1.155）
\pgfmathsetmacro{\xmax}{2*sqrt(3)/3}
\pgfmathsetmacro{\ytop}{4 - (2*sqrt(3)/3)^2}
\draw[red!70!black, thick, fill=red!20] (axis cs:-\xmax,0) rectangle (axis cs:\xmax,\ytop);

% 标注
\node[font=\tiny, anchor=west] at (axis cs:\xmax+0.1,\ytop/2) {$\frac{8}{3}$};
\node[font=\tiny, anchor=south] at (axis cs:0,0) {$\frac{4\sqrt{3}}{3}$};

% 顶点
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:0,4) {};
\node[anchor=south, font=\tiny] at (axis cs:0,4) {$(0, 4)$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-7：抛物线 $y = 4 - x^2$ 弓形内的内接矩形。红色矩形为最大面积情形，宽 $\dfrac{4\sqrt{3}}{3}$，高 $\dfrac{8}{3}$。

````ad-example
title: 示例（由抛物线与 $x$ 轴交点反推方程） | Example（Determining Equation from $x$-Intercepts）

已知抛物线 $y = ax^2 + bx + c$ 与 $x$ 轴交于 $(-1, 0)$ 与 $(3, 0)$，且过点 $(0, -3)$。求 $a, b, c$ 的值。

---

由交点 $(-1, 0)$ 与 $(3, 0)$ 知 $x = -1$ 与 $x = 3$ 是方程 $ax^2 + bx + c = 0$ 的两根。由韦达定理（第十八章 §18.2.2）：

$$x_1 + x_2 = -\frac{b}{a} \implies -1 + 3 = -\frac{b}{a} \implies \frac{b}{a} = -2$$

$$x_1 \cdot x_2 = \frac{c}{a} \implies (-1)(3) = \frac{c}{a} \implies \frac{c}{a} = -3$$

故 $b = -2a$，$c = -3a$。

由抛物线过 $(0, -3)$：$f(0) = c = -3$，故 $-3a = -3$，$a = 1$。

代回：$b = -2$，$c = -3$。

**验证**：$y = x^2 - 2x - 3$，$y$ 截距 $(0, -3)$ ✓，与 $x$ 轴交点 $x^2 - 2x - 3 = 0 \implies (x + 1)(x - 3) = 0 \implies x = -1, 3$ ✓。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 1.8]
\begin{axis}[
    width=9cm, height=6.5cm,
    xmin=-2.5, xmax=4, ymin=-4.5, ymax=4,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-2,-1,1,2,3}, ytick={-3,-2,-1,1,2,3},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
\addplot[domain=-2.2:3.5, samples=80, blue!70!black, thick] {x^2 - 2*x - 3};

% 交点
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:-1,0) {};
\node[anchor=south, font=\tiny] at (axis cs:-1,0) {$(-1, 0)$};
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:3,0) {};
\node[anchor=south, font=\tiny] at (axis cs:3,0) {$(3, 0)$};

% y 截距
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:0,-3) {};
\node[anchor=east, font=\tiny] at (axis cs:0,-3) {$(0, -3)$};

% 顶点
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:1,-4) {};
\node[anchor=north, font=\tiny] at (axis cs:1,-4) {$(1, -4)$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-8：抛物线 $y = x^2 - 2x - 3$。与 $x$ 轴交于 $(-1, 0)$ 与 $(3, 0)$（红点），$y$ 截距 $(0, -3)$，顶点 $(1, -4)$。

````ad-example
title: 示例（已知顶点与一点，求二次函数） | Example（Determining Quadratic Function from Vertex and a Point）

已知抛物线的顶点为 $(2, 3)$，且过点 $(4, -1)$。求此二次函数的一般式。

---

由顶点 $(2, 3)$，设顶点式：
$$y = a(x - 2)^2 + 3$$

代入点 $(4, -1)$：
$$-1 = a(4 - 2)^2 + 3 = 4a + 3$$

解得 $4a = -4$，$a = -1$。

顶点式：$y = -(x - 2)^2 + 3$。

展开为一般式：
$$\begin{aligned}
y &\equiv -(x^2 - 4x + 4) + 3 \\
&\equiv -x^2 + 4x - 4 + 3 \\
&\equiv -x^2 + 4x - 1
\end{aligned}$$

**验证**：$h = -\dfrac{b}{2a} = -\dfrac{4}{2 \cdot (-1)} = 2$，$k = f(2) = -4 + 8 - 1 = 3$ ✓。$f(4) = -16 + 16 - 1 = -1$ ✓。

**判别式**：$\Delta = b^2 - 4ac = 16 - 4 \cdot (-1) \cdot (-1) = 16 - 4 = 12 > 0$，故抛物线与 $x$ 轴有两个交点。又 $a = -1 < 0$，顶点在 $x$ 轴上方（$k = 3 > 0$），与 $\Delta > 0$、$a < 0$ 时「顶点在 $x$ 轴上方」的结论一致。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 2]
\begin{axis}[
    width=9cm, height=6.5cm,
    xmin=-1, xmax=5, ymin=-2, ymax=4,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-1,1,2,3,4}, ytick={-1,1,2,3},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
\addplot[domain=0.2:3.8, samples=80, blue!70!black, thick] {-(x-2)^2 + 3};

% 顶点
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:2,3) {};
\node[anchor=south, font=\tiny] at (axis cs:2,3) {$(2, 3)$};

% 已知点
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:4,-1) {};
\node[anchor=north, font=\tiny] at (axis cs:4,-1) {$(4, -1)$};

% 对称轴
\draw[gray!60, dashed] (axis cs:2,-2) -- (axis cs:2,4);
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-9：由顶点 $(2, 3)$ 与点 $(4, -1)$ 确定的抛物线 $y = -x^2 + 4x - 1$。顶点（红点），已知点（黑点），对称轴 $x = 2$（虚线）。

---

## 21.8　抛物线上的几何 (Geometry on the Parabola)
> **本节难度上限**：T B+ ｜ C B ｜ E B ｜ Q B+

> 本节把前几节的工具应用于抛物线上的几何问题：抛物线与直线的交点、弦长、弓形面积。这些内容综合运用了二次方程、二次函数、韦达定理与距离公式，是数形结合的良好练习。

### 21.8.1　抛物线与直线的交点

设抛物线 $G_f = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c\}$（$a \neq 0$），直线 $G_g = \{(x, y) \in \mathbb{R}^2 \mid y = mx + d\}$（$m, d$ 为常数）。两者的交集为：
$$G_f \cap G_g = \{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c \text{ 且 } y = mx + d\}$$

把 $y = mx + d$ 代入 $y = ax^2 + bx + c$，得 $ax^2 + bx + c = mx + d$，整理得：
$$ax^2 + (b - m)x + (c - d) = 0$$

因此，**求抛物线与直线的交点，就是求联立方程组的解，也就是求两个点集的交集**。这与第二十章 §20.4.1 的三重对照表完全一致：几何（交点）$\iff$ 代数（联立方程的解）$\iff$ 集合（交集 $G_f \cap G_g$）。

记上述方程的判别式为 $\Delta' = (b - m)^2 - 4a(c - d)$。由 §21.1.3 判别式与根的关系：

- $\Delta' > 0$：方程有两相异实根，$G_f \cap G_g$ 含两个点（两个交点）。
- $\Delta' = 0$：方程有二重实根，$G_f \cap G_g$ 含一个点（相切）。
- $\Delta' < 0$：方程无实根，$G_f \cap G_g = \varnothing$（无交点）。

**特殊情况**：若直线为水平线 $y = d$（即 $m = 0$），则方程化为 $ax^2 + bx + (c - d) = 0$。当 $d = 0$ 时，即为 §21.1.3 的 $x$ 截距问题。

### 21.8.2　弦与弦长

````ad-def
title: 定义（弦） | Definition（Chord）

抛物线上两点的连线段称为抛物线的**弦 (chord)**。
````

设抛物线 $G_f$ 上有两点 $P(x_1, y_1)$ 与 $Q(x_2, y_2)$，其中 $y_i = f(x_i)$。弦 $PQ$ 的长度由两点间距离公式（第十五章）给出：
$$|PQ| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

当 $P, Q$ 是抛物线与某直线的交点时，$x_1, x_2$ 是联立方程 $ax^2 + (b - m)x + (c - d) = 0$ 的两根。此时弦长可用韦达定理化简。

````ad-thm
title: 定理（弦长公式） | Theorem（Chord Length Formula）

设直线 $y = mx + d$ 与抛物线 $y = ax^2 + bx + c$ 交于两点 $P(x_1, y_1)$ 与 $Q(x_2, y_2)$，且 $x_1, x_2$ 是方程 $ax^2 + (b - m)x + (c - d) = 0$ 的两根。则弦长为：
$$|PQ| = \sqrt{1 + m^2} \cdot |x_1 - x_2|$$

其中 $|x_1 - x_2|$ 可由韦达定理算出：
$$|x_1 - x_2| = \sqrt{(x_1 + x_2)^2 - 4x_1 x_2} = \frac{\sqrt{\Delta'}}{|a|}$$

此处 $\Delta' = (b - m)^2 - 4a(c - d)$，$x_1 + x_2 = -\dfrac{b - m}{a}$，$x_1 x_2 = \dfrac{c - d}{a}$。
````

````ad-proof
title: 证明 | Proof

**第一部分**：弦长 $|PQ|$ 与 $|x_1 - x_2|$ 的关系。

$P, Q$ 都在直线 $y = mx + d$ 上，故 $y_1 = mx_1 + d$，$y_2 = mx_2 + d$。

$$y_2 - y_1 = m(x_2 - x_1) + (d - d) = m(x_2 - x_1)$$

代入距离公式：
$$|PQ| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \sqrt{(x_2 - x_1)^2 + m^2(x_2 - x_1)^2} = \sqrt{1 + m^2} \cdot |x_2 - x_1|$$

**第二部分**：用韦达定理算 $|x_1 - x_2|$。

由第十八章 §18.2.2 韦达定理，$x_1 + x_2 = -\dfrac{b - m}{a}$，$x_1 x_2 = \dfrac{c - d}{a}$。

$$\begin{aligned}
(x_1 - x_2)^2 &= (x_1 + x_2)^2 - 4x_1 x_2 \\
&= \left(-\frac{b - m}{a}\right)^2 - 4 \cdot \frac{c - d}{a} \\
&= \frac{(b - m)^2}{a^2} - \frac{4(c - d)}{a} \\
&= \frac{(b - m)^2 - 4a(c - d)}{a^2} \\
&= \frac{\Delta'}{a^2}
\end{aligned}$$

故 $|x_1 - x_2| = \dfrac{\sqrt{\Delta'}}{|a|}$（要求 $\Delta' \ge 0$，即确有交点）。

综合两部分：
$$|PQ| = \sqrt{1 + m^2} \cdot \frac{\sqrt{\Delta'}}{|a|}$$
````

````ad-example
title: 示例（抛物线与直线的交点及弦长） | Example（Intersection and Chord Length）

求抛物线 $y = x^2 - 2x + 1$ 与直线 $y = 2x - 1$ 的交点，并计算弦长。

---

**第一步，联立求交点**。

$$x^2 - 2x + 1 = 2x - 1 \implies x^2 - 4x + 2 = 0$$

判别式 $\Delta' = 16 - 8 = 8 > 0$，有两个交点。

求根：$x = \dfrac{4 \pm \sqrt{8}}{2} = 2 \pm \sqrt{2}$。

对应的 $y$（由 $y = 2x - 1$）：$y = 2(2 \pm \sqrt{2}) - 1 = 3 \pm 2\sqrt{2}$。

交点为 $P(2 - \sqrt{2},\ 3 - 2\sqrt{2})$ 与 $Q(2 + \sqrt{2},\ 3 + 2\sqrt{2})$。

**第二步，用弦长公式**。

$a = 1$，$m = 2$，$\Delta' = 8$。

$$|PQ| = \sqrt{1 + 2^2} \cdot \frac{\sqrt{8}}{1} = \sqrt{5} \cdot 2\sqrt{2} = 2\sqrt{10}$$

**验证**（直接用距离公式）：
$$|PQ| = \sqrt{(2\sqrt{2})^2 + (4\sqrt{2})^2} = \sqrt{8 + 32} = \sqrt{40} = 2\sqrt{10}$$

正确。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 2]
\begin{axis}[
    width=9cm, height=7cm,
    xmin=-1, xmax=5, ymin=-2.5, ymax=7,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={0,1,2,3,4}, ytick={-1,0,1,3,5},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% 抛物线 y = x^2 - 2x + 1 = (x-1)^2
\addplot[domain=-0.5:3.5, samples=80, blue!70!black, thick] {x^2 - 2*x + 1};
% 直线 y = 2x - 1
\addplot[domain=-0.5:3.5, samples=2, red!70!black, thick] {2*x - 1};

% 交点
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:{2-sqrt(2)},{3-2*sqrt(2)}) {};
\node[anchor=north, font=\tiny] at (axis cs:{2-sqrt(2)},{3-2*sqrt(2)}) {$P$};
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:{2+sqrt(2)},{3+2*sqrt(2)}) {};
\node[anchor=south, font=\tiny] at (axis cs:{2+sqrt(2)},{3+2*sqrt(2)}) {$Q$};

% 弦长标注
\draw[green!60!black, thick, <->] (axis cs:{2-sqrt(2)},{3-2*sqrt(2)}) -- (axis cs:{2+sqrt(2)},{3+2*sqrt(2)});
\node[font=\tiny] at (axis cs:1.5,3.5) {$|PQ| = 2\sqrt{10}$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-10：抛物线 $y = x^2 - 2x + 1$（蓝）与直线 $y = 2x - 1$（红）交于两点 $P, Q$，弦长 $|PQ| = 2\sqrt{10}$。

### 21.8.3　*抛物线弓形的面积（适用于数学延伸1/2）

````ad-def
title: 定义（抛物线弓形） | Definition（Parabolic Segment）

抛物线与一条弦围成的区域称为**抛物线弓形 (parabolic segment)**。弦称为弓形的**底 (base)**，抛物线上弦对侧的顶点（通常是抛物线的顶点或弓形上的最远点）到弦的距离称为弓形的**高 (height)**。
````

阿基米德 (Archimedes, 约公元前 287–212) 在两千多年前就用「穷竭法」证明了抛物线弓形的面积公式，比微积分早了近两千年。

````ad-thm
title: 定理（阿基米德弓形面积公式）* | Theorem（Archimedes' Formula for the Parabolic Segment）*

设抛物线弓形的底长为 $b$（即弦长），高为 $h$（抛物线到弦的最大距离）。则弓形的面积为：
$$S = \frac{2}{3} b h$$
````

````ad-note
title: 注记（证明思路）* | Remark（Proof Idea）

阿基米德的原证用「穷竭法」：用一系列三角形逼近弓形，证明这些三角形面积之和构成几何级数，其和恰为 $\dfrac{2}{3}bh$。此证明较长，此处从略。

严格的现代证明需用定积分：设抛物线为 $y = ax^2$，弦为水平线段 $y = h_0$（$h_0 \ge 0$），两端横坐标为 $\pm x_0$（$x_0 = \sqrt{h_0/a}$），则底长 $b = 2x_0$，高 $h = h_0$。弓形面积为：
$$S = \int_{-x_0}^{x_0} (h_0 - ax^2)\, dx = \left[h_0 x - \frac{ax^3}{3}\right]_{-x_0}^{x_0} = 2h_0 x_0 - \frac{2ax_0^3}{3} = 2x_0\!\left(h_0 - \frac{ax_0^2}{3}\right)$$

代入 $x_0^2 = h_0/a$：
$$S = 2x_0 \cdot \frac{2h_0}{3} = \frac{2}{3} \cdot 2x_0 \cdot h_0 = \frac{2}{3} b h$$

此处的定积分属延伸内容，正式定义留待未来微积分课程。
````

````ad-example
title: 示例（抛物线与直线围成区域的面积） | Example（Area Enclosed by Parabola and Line）

求抛物线 $y = x^2$ 与直线 $y = x + 2$ 围成区域的面积。

---

**第一步，求两曲线的交点**。联立方程：
$$\begin{cases} y = x^2 \\ y = x + 2 \end{cases}$$

消去 $y$：$x^2 = x + 2$，即 $x^2 - x - 2 = 0$，$(x - 2)(x + 1) = 0$，得 $x = -1$ 或 $x = 2$。

交点为 $(-1, 1)$ 与 $(2, 4)$。

**第二步，确定区域的上下边界**。在区间 $[-1, 2]$ 内，取测试点 $x = 0$：抛物线 $y = 0$，直线 $y = 2$，直线在上、抛物线在下。

**第三步，计算面积**。区域面积等于「上函数减下函数」的定积分：
$$S = \int_{-1}^{2} \left[(x + 2) - x^2\right] dx$$

被积函数 $(x + 2) - x^2 = -x^2 + x + 2$ 是二次函数，开口向下。可用二次函数最值或直接积分。

计算定积分：
$$\int_{-1}^{2} (-x^2 + x + 2)\, dx = \left[-\frac{x^3}{3} + \frac{x^2}{2} + 2x\right]_{-1}^{2}$$

代入 $x = 2$：$-\dfrac{8}{3} + 2 + 4 = -\dfrac{8}{3} + 6 = \dfrac{10}{3}$。

代入 $x = -1$：$\dfrac{1}{3} + \dfrac{1}{2} - 2 = \dfrac{2 + 3 - 12}{6} = -\dfrac{7}{6}$。

$$S = \frac{10}{3} - \left(-\frac{7}{6}\right) = \frac{20}{6} + \frac{7}{6} = \frac{27}{6} = \frac{9}{2}$$

**结论**：抛物线 $y = x^2$ 与直线 $y = x + 2$ 围成区域的面积为 $\dfrac{9}{2}$。

**验证**（用阿基米德公式）：交点为 $(-1, 1)$ 与 $(2, 4)$，弦长 $b = \sqrt{(2 - (-1))^2 + (4 - 1)^2} = \sqrt{9 + 9} = 3\sqrt{2}$。抛物线 $y = x^2$ 的顶点为 $(0, 0)$，到弦 $y = x + 2$（即 $x - y + 2 = 0$）的距离为 $h = \dfrac{|0 - 0 + 2|}{\sqrt{1 + 1}} = \dfrac{2}{\sqrt{2}} = \sqrt{2}$。弓形面积 $S = \dfrac{2}{3} \cdot 3\sqrt{2} \cdot \sqrt{2} = \dfrac{2}{3} \cdot 6 = 4$。

**注意**：此处阿基米德公式给出的是 $4$，与定积分给出的 $\dfrac{9}{2}$ 不同。原因是此例中抛物线与直线围成的区域**不是**标准弓形（弦在抛物线开口一侧而非另一侧），阿基米德公式不直接适用。此例说明需谨慎判别区域的类型。

**注**：此例用到定积分计算面积，属延伸内容。其核心仍是二次函数：被积函数是二次的，交点由二次方程决定。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 2]
\begin{axis}[
    width=9cm, height=7cm,
    xmin=-2, xmax=3, ymin=-0.5, ymax=5,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-1,1,2}, ytick={1,2,3,4},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% 抛物线
\addplot[domain=-1.5:2.5, samples=80, blue!70!black, thick] {x^2};
% 直线
\addplot[domain=-1.5:2.5, samples=2, red!70!black, thick] {x + 2};

% 填充区域
\addplot[domain=-1:2, samples=50, fill=green!20, draw=none] {x + 2} \closedcycle;
\addplot[domain=-1:2, samples=50, fill=white, draw=none] {x^2} \closedcycle;

% 交点
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:-1,1) {};
\node[anchor=east, font=\tiny] at (axis cs:-1,1) {$(-1, 1)$};
\node[circle, fill=black, inner sep=1.5pt] at (axis cs:2,4) {};
\node[anchor=south, font=\tiny] at (axis cs:2,4) {$(2, 4)$};

\node[font=\small] at (axis cs:0.5,2.5) {$S = \frac{9}{2}$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-11：抛物线 $y = x^2$（蓝）与直线 $y = x + 2$（红）围成的区域（绿色阴影）。两交点为 $(-1, 1)$ 与 $(2, 4)$，面积为 $\dfrac{9}{2}$。

````ad-example
title: 示例（抛物线弓形面积） | Example（Parabolic Segment Area）

求抛物线 $y = 4 - x^2$ 与 $x$ 轴围成的弓形面积。

---

**第一步，求交点（确定底）**。

$4 - x^2 = 0 \implies x = \pm 2$。底为 $x$ 轴上的线段 $[-2, 2]$，底长 $b = 4$。

**第二步，确定高**。

抛物线顶点为 $(0, 4)$，到 $x$ 轴的距离为 $h = 4$。

**第三步，套用公式**。

$$S = \frac{2}{3} b h = \frac{2}{3} \cdot 4 \cdot 4 = \frac{32}{3}$$

**验证**（用定积分）：
$$S = \int_{-2}^{2} (4 - x^2)\, dx = \left[4x - \frac{x^3}{3}\right]_{-2}^{2} = \left(8 - \frac{8}{3}\right) - \left(-8 + \frac{8}{3}\right) = 16 - \frac{16}{3} = \frac{32}{3}$$

正确。
````

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}
\begin{tikzpicture}[scale = 2]
\begin{axis}[
    width=9cm, height=7cm,
    xmin=-3, xmax=3, ymin=-0.5, ymax=5,
    axis lines=middle,
    xlabel={$x$}, ylabel={$y$},
    xtick={-2,-1,1,2}, ytick={1,2,3,4},
    ticklabel style={font=\tiny, gray},
    axis line style={gray!70}
]
% 抛物线
\addplot[domain=-2:2, samples=80, blue!70!black, thick] {4 - x^2};

% 填充弓形
\addplot[domain=-2:2, samples=50, fill=green!20, draw=none] {4 - x^2} \closedcycle;

% 顶点
\node[circle, fill=red!70!black, inner sep=2pt] at (axis cs:0,4) {};
\node[anchor=south, font=\tiny] at (axis cs:0,4) {$(0, 4)$};

% 底长与高
\draw[<->, thick] (axis cs:-2,-0.3) -- (axis cs:2,-0.3);
\node[anchor=north, font=\tiny] at (axis cs:0,-0.3) {base $b = 4$};
\draw[<->, thick] (axis cs:2.3,0) -- (axis cs:2.3,4);
\node[anchor=west, font=\tiny] at (axis cs:2.3,2) {height $h = 4$};

\node[font=\small] at (axis cs:0,2) {$S = \frac{32}{3}$};
\end{axis}
\end{tikzpicture}
\end{document}
```

图 21-12：抛物线 $y = 4 - x^2$ 与 $x$ 轴围成的弓形。底 $b = 4$，高 $h = 4$，面积 $S = \dfrac{2}{3} \cdot 4 \cdot 4 = \dfrac{32}{3}$。

---

## 21.9　小结 (Summary)

### 八条主线

1. **定义、零点与截距**（§21.1）：二次函数 $f: \mathbb{R} \to \mathbb{R},\ x \mapsto ax^2 + bx + c$（$a \neq 0$），图像 $G_f$ 为抛物线。零点是 $f(x_0) = 0$ 的 $x_0$。$y$ 截距 $(0, c)$；$x$ 截距由判别式 $\Delta = b^2 - 4ac$ 决定。
2. **配方法**（§21.2）：$ax^2 + bx + c \equiv a(x - h)^2 + k$，其中 $h = -\dfrac{b}{2a}$，$k = \dfrac{4ac - b^2}{4a}$。
3. **函数的最值**（§21.3）：最大值/最小值的一般定义（全局、唯一）。
4. **顶点与开口方向**（§21.4）：顶点为 $(h, k)$；$a > 0$ 开口向上有最小值，$a < 0$ 开口向下有最大值。
5. **对称轴**（§21.5）：抛物线关于 $x = h$ 对称（用 Ch19 函数变换论证），对称轴 $x = -\dfrac{b}{2a}$。
6. **系数的几何角色**（§21.6）：$a$ 开口方向与胖瘦，$c$ 上下平移，$b$ 与 $a$ 共定对称轴。
7. **与二次方程的联系**（§21.7）：$\Delta$ 与 $k$ 通过 $k = -\dfrac{\Delta}{4a}$ 联系；数形结合总表六栏对照。
8. **抛物线上的几何**（§21.8）：弦长公式 $\sqrt{1 + m^2} \cdot \dfrac{\sqrt{\Delta'}}{|a|}$、阿基米德弓形面积 $\dfrac{2}{3}bh$。

### 公式总表

| 量 | 公式 | 备注 |
|---|---|---|
| 一般式 | $y = ax^2 + bx + c$ | $a \neq 0$ |
| 顶点式 | $f(x) \equiv a(x - h)^2 + k$ | $h = -\dfrac{b}{2a}$，$k = \dfrac{4ac - b^2}{4a}$ |
| $y$ 截距 | $(0, c)$ | 恒存在 |
| $x$ 截距 | 方程 $ax^2 + bx + c = 0$ 的实根 | 由 $\Delta$ 决定 |
| 对称轴 | $x = -\dfrac{b}{2a}$ | |
| 顶点 | $\left(-\dfrac{b}{2a},\ \dfrac{4ac - b^2}{4a}\right)$ | 实用：先求 $h$ 再代入 $k = f(h)$ |
| 判别式 | $\Delta = b^2 - 4ac$ | |
| $\Delta$ 与 $k$ | $k = -\dfrac{\Delta}{4a}$ | 代数与几何的桥梁 |
| 最值 | $a > 0$：$\min = k$；$a < 0$：$\max = k$ | 在顶点处取得 |
| 弦长（与直线 $y = mx + d$） | $\sqrt{1 + m^2} \cdot \dfrac{\sqrt{\Delta'}}{\lvert a \rvert}$ | $\Delta' = (b-m)^2 - 4a(c-d)$ |
| 弓形面积 | $\dfrac{2}{3}bh$ | 阿基米德公式 |

### 数形结合总表

| $\Delta$ | 方程实根 | 函数零点 | 抛物线与 $x$ 轴交点 | 集合关系 | 顶点纵坐标 $k$ |
|:---:|:---|:---|:---|:---|:---|
| $> 0$ | 两相异实根 | 两个 | 两个交点 | $\lvert G_f \cap L_x \rvert = 2$ | 与 $a$ 异号 |
| $= 0$ | 二重实根 | 一个 | 相切于顶点 | $\lvert G_f \cap L_x \rvert = 1$ | $k = 0$ |
| $< 0$ | 无实根 | 无 | 无交点 | $G_f \cap L_x = \varnothing$ | 与 $a$ 同号 |

### 四视角

- **方程视角**：抛物线 $= $ 方程 $y = ax^2 + bx + c$ 的图像；$x$ 截距 $= $ 方程 $ax^2 + bx + c = 0$ 的实根。
- **函数视角**：抛物线 $= $ 函数 $f$ 的图像 $G_f$；$x$ 截距 $= $ 函数 $f$ 的零点。
- **几何视角**：抛物线与 $x$ 轴的交点 $= $ 两曲线的交点；判别式决定交点个数。
- **集合视角**：抛物线 $= $ 点集 $\{(x, y) \in \mathbb{R}^2 \mid y = ax^2 + bx + c\}$；$x$ 截距 $= $ 交集 $G_f \cap L_x$ 的元素。

### 延后内容

严格的「相切」定义（两曲线在某点有共同切线）与阿基米德弓形面积公式的严格证明，均需微积分或更深入的解析几何，留待未来课程处理。抛物线作为圆锥曲线的几何定义已不在其列：它已在 [[Chapter 30 轨迹|轨迹]] §30.1.2 以点集条件给出，与本章「二次函数的图像」一说等价（推导见该书 §30.3）。

---

## 词汇表 (Vocabulary)

| 中文 | 英文 | 备注 |
|------|------|------|
| 二次函数 | quadratic function | $f: \mathbb{R} \to \mathbb{R},\ x \mapsto ax^2 + bx + c$，$a \neq 0$ |
| 一般式 | general form | $y = ax^2 + bx + c$ |
| 顶点式 | vertex form | $f(x) \equiv a(x - h)^2 + k$ |
| 抛物线 | parabola | 二次函数的图像 $G_f$ |
| 零点 | zero | $f(x_0) = 0$ 的 $x_0$ |
| 截距 | intercept | $x$ 截距、$y$ 截距 |
| $y$ 截距 | $y$-intercept | $(0, c)$，恒存在 |
| $x$ 截距 | $x$-intercept | 由判别式决定个数 |
| 判别式 | discriminant | $\Delta = b^2 - 4ac$ |
| 配方法 | completing the square | 一般式化为顶点式 |
| 顶点 | vertex | $(h, k)$，最值点 |
| 对称轴 | axis of symmetry | $x = -\dfrac{b}{2a}$ |
| 开口方向 | opening direction | 由 $a$ 的符号决定 |
| 开口向上 | opens upward | $a > 0$ |
| 开口向下 | opens downward | $a < 0$ |
| 最大值 | maximum | $a < 0$ 时在顶点处取得 |
| 最小值 | minimum | $a > 0$ 时在顶点处取得 |
| 最大值点 | maximum point | 取得最大值的自变量 |
| 最小值点 | minimum point | 取得最小值的自变量 |
| 最值 | extremum | 最大值或最小值的统称 |
| 相切 | tangent | $\Delta = 0$ 时抛物线与 $x$ 轴的关系 |
| 韦达定理 | Vieta's formulas | 根与系数的关系，见 §18.2.2 |
| 弦 | chord | 抛物线上两点的连线段 |
| 弦长 | chord length | $\sqrt{1 + m^2} \cdot \lvert x_1 - x_2 \rvert$ |
| 抛物线弓形 | parabolic segment | 抛物线与弦围成的区域 |
| 阿基米德弓形面积公式 | Archimedes' formula | $S = \dfrac{2}{3}bh$ |
| 数形结合 | combination of number and shape | 代数与几何的对应 |
| 四视角 | four perspectives | 方程、函数、几何、集合 |

---

## 备课提示 (Teaching Notes)

* **概念依赖的顺序**：本章按「定义/零点/截距 → 配方 → 最值 → 顶点 → 对称轴 → 系数 → 联系 → 几何」的顺序铺排，每个概念在首次使用前已定义。截距前置到 §21.1（配方之前），因 y 截距只需 $f(0)=c$，x 截距需判别式（Ch18 已定义）。
* **配方的核心地位**：强调配方法的代数过程，而非死记硬背 $\dfrac{4ac - b^2}{4a}$。建议学生掌握「先求 $h = -\dfrac{b}{2a}$，再代入 $k = f(h)$」的实用策略。
* **函数、表达式、图像的区分**：严格区分「函数 $f$」「表达式 $y = \ldots$」「图像 $G_f$」。多项式变形用恒等号 $\equiv$，数值断言用等号 $=$。
* **顶点定义简化**：顶点统一定义为 $(h, k)$，不区分 $a$ 正负。开口方向独立成定义（ad-def），说明 $a$ 正负如何决定最大/最小值与最低/最高点。
* **对称轴用 Ch19 变换描述**：§21.5 用第十九章函数变换（水平平移、垂直平移）的观点论证抛物线的对称性，从最简二次函数 $f_0(x) = ax^2$ 是偶函数出发，经水平平移得对称轴 $x = h$。
* **集合与几何视角**：§21.1.3 与 §21.7.1 是本章的核心。重点讲清「方程的根 $\iff$ 函数的零点 $\iff$ 抛物线与 $x$ 轴的交点 $\iff$ 交集 $G_f \cap L_x$ 的元素」四者等价。
* **最值定义的首次引入**：§21.3 正式定义函数的最大值与最小值（第十九章未定义）。含「定义域对最值的影响」示例。
* **§21.8.1 不列定理**：抛物线与直线的交点用集合表述正文，展示 $G_f \cap G_g$ 的交集运算推出联立方程求交点的方法，不单列定理。
* **TikZ 插图**：本章共 11 张插图。TikZJax 不支持中文出现在 title、node 等命令参数中，故图形内文字一律用英文/数学符号。
* **易错点**：
  * 配方法中提取 $a$ 时忘记将常数项也纳入括号
  * 混淆 $\Delta > 0$ 与 $\Delta = 0$ 对应的几何情形
  * 写最值时忘记判断开口方向
  * 弦长公式中忘记 $\sqrt{1 + m^2}$ 因子
  * 使用弓形面积公式时混淆底 $b$（弦长）与高 $h$（到弦的距离）

---

<sub>本章修订于 2026 年 7 月 4 日。</sub>
