# Chapter 11 不等式（I）(Inequalities I) — 題集 1 補充修訂規劃

> 本文件處理 `Ch11_PS1.tex` 中現有的 `%%` 注釋及三方向擴展規劃。以下題目以 `hkdse-math-question-style` Skill 規範的措辭、句式與分題結構撰寫，嚴格不���出 Ch11 講義範圍。**宣稱判斷題不設獨立計算分題**——學生須在判斷過程中自行完成必要推算。

---

## 一、注釋處理：Q21 重寫

### 注釋位置

`Ch11_PS1.tex` Line 505：
```
%% ？这题意义不明，重写。
```

### 原題

> 某人宣稱「不等式 $x\ge 3$ 與 $x>3$ 表示相同的 $x$ 範圍」。你是否同意？試解釋你的答案。

**問題分析**：無求解步驟、無數軸操作、無前後分題關聯。

### 重寫方案（§3，藍框 recquestion）

**題幹：**

解不等式 $2(3-x)>x-9$。

(a) 將解以數軸表示。

(b) 某人宣稱「在該不等式的正整數解中，最大的一個為 $5$」。你是否同意？試解釋你的答案。

**英文翻譯：**

Solve the inequality $2(3-x)>x-9$.

(a) Represent the solution on a number line.

(b) Someone claims that ``among the positive integer solutions of this inequality, the largest one is $5$.'' Do you agree? Explain your answer.

> **考核目標與簡略答案：** (a) $2(3-x)>x-9\implies 6-2x>x-9\implies -3x>-15\implies x<5$。數軸上 $x=5$ 處以空心圓向左畫箭頭。(b) 解為 $x<5$，學生須自行列舉正整數解 $1,2,3,4$，最大者為 $4$——不同意，宣稱漏計了 $x=5$ 本身不屬解的事實。三層遞進：求解→圖示→自行推算整數解並判斷。

---

## 二、方向一：§2 增加 DSE 風格判斷題

現有 §2 末題（Q15）為變號陷阱判斷題。新增一題以「解→數軸→自行推算不等式性質並判斷」收尾。宣稱本身需要學生自行完成計算，不設獨立代值分題。

**§2 新增題**（藍框 recquestion）——插於 §2 末尾

**題幹：**

解不等式 $\dfrac{5x-2}{3}\le 2x-1$。

(a) 將解以數軸表示。

(b) 某人宣稱「對該不等式的任何一個解 $x$，$2x-1$ 的值均不小於 $1$」。你是否同意？試解釋你的答案。

**英文翻譯：**

Solve the inequality $\dfrac{5x-2}{3}\le 2x-1$.

(a) Represent the solution on a number line.

(b) Someone claims that ``for any solution $x$ of this inequality, the value of $2x-1$ is not less than $1$.'' Do you agree? Explain your answer.

> **考核目標與簡略答案：** (a) $\frac{5x-2}{3}\le 2x-1\implies 5x-2\le 6x-3\implies -x\le -1\implies x\ge 1$。數軸上 $x=1$ 處以實心點向右畫箭頭。(b) 學生需自行完成兩步推理：(i) 解的範圍為 $x\ge 1$；(ii) 當 $x\ge 1$ 時 $2x-1\ge 1$（$2x-1$ 隨 $x$ 遞增，$x=1$ 時取得最小值 $1$）。同意。宣稱本身即一次完整推算，不設獨立代值分題。

---

## 三、方向二：§4 增加「作差法 + 文字情境」綜合題

現有 §4 全為純代數證明。新增一題以定價情境包裝作差法，第二分題要求學生基於作差結果進行推理判斷。

**§4 新增題**（藍框 recquestion）——插於 §4 末尾

**題幹：**

某商店有兩款瓶裝水。A 款每瓶售價為 \$ $(x+5)$，B 款每瓶售價為 \$ $(2x+1)$，其中 $x$ 為正實數。小明購買 $n$ 瓶 A 款及 $n$ 瓶 B 款，總費用分別為 $P_A$ 及 $P_B$。

(a) 以 $n$ 及 $x$ 表示 $P_B-P_A$。

(b) 某人宣稱「存在某個 $x$ 的值，使得不論 $n$ 為任何正整數，兩款總費用均相等」��你是否同意？試解釋你的答案。

**英文翻譯：**

A shop sells two types of bottled water. The price per bottle of type A is \$ $(x+5)$, and the price per bottle of type B is \$ $(2x+1)$, where $x$ is a positive real number. Ming buys $n$ bottles of type A and $n$ bottles of type B. Let the total costs be $P_A$ and $P_B$ respectively.

(a) Express $P_B-P_A$ in terms of $n$ and $x$.

(b) Someone claims that ``there exists a value of $x$ such that, no matter what positive integer $n$ is, the total costs of the two types are always equal.'' Do you agree? Explain your answer.

> **考核目標與簡略答案：** (a) $P_A=n(x+5)=nx+5n$，$P_B=n(2x+1)=2nx+n$，$P_B-P_A=nx-4n=n(x-4)$。(b) 學生需自行從 (a) 的結果出發推理：$P_A=P_B\iff n(x-4)=0$。由於 $n>0$，需 $x-4=0$ 即 $x=4$。存在這樣的 $x$（$x=4$）——同意。不設獨立計算分題，判斷過程即推理鏈。

---

## 四、方向三：§5 增加「某人宣稱……試解釋」判斷題

§5 現有 Q30–Q35 均非 DSE 判斷句式。新增一題以水溫情境包裝，宣稱本身需要學生自行完成帶有不確定性的數值推算與端點檢驗。

**§5 新增題**（藍框 recquestion）——插於 §5 末尾

**題幹：**

某水族箱的水溫須維持在 $22$°C 至 $28$°C 之間（包含兩端）。設水溫為 $T$°C。

(a) 以不等式表示 $T$ 的允許範圍。

(b) 某日上午水溫為 $25$°C，下午上升了 $r$°C，晚上又下降�� $3$°C。某人宣稱「若上升量 $r$ 不大於 $4$，則水溫整天均在允許範圍內」。你是否同意？試解釋你的答案。

**英文翻譯：**

The water temperature of an aquarium must be maintained between $22$°C and $28$°C (inclusive). Let the water temperature be $T$°C.

(a) Express the allowable range of $T$ as an inequality.

(b) In the morning, the water temperature is $25$°C. It rises by $r$°C in the afternoon, then drops by $3$°C in the evening. Someone claims that ``if the rise $r$ is not greater than $4$, the water temperature remains within the allowable range throughout the day.'' Do you agree? Explain your answer.

> **考核目標與簡略答案：** (a) $22\le T\le 28$。(b) 學生須自行考慮三個時間點的水溫：上午 $25$（在範圍內 ✓）；下午 $25+r$，若 $r\le 4$ 則最大值為 $25+4=29$，$29>28$，超出範圍 ✗；晚上 $(25+r)-3=22+r$，若 $r\le 4$ 則範圍為 $22$ 至 $26$，均在 $[22,28]$ 內。不同意——下午可能超溫。此題要求學生在未提示「考慮最壞情況」的前提下，自行檢驗邊界值 $r=4$ 並發現問題。所涉 $22\le T\le 28$ 屬講義 11.2.2 雙端點數軸形式，不涉及複合不等式求解。

---

## 五、審批後執行事項

1. 修改 `Ch11_PS1.tex`：替換 §3 Q21、插入 §2/§4/§5 各一新增題，同步更新英文翻譯。
2. 更新 `Answer/Ch11_PS1_Answer.tex`：同步更新 Q21 答案，並新增三題答案。
3. 編譯驗證後交付。

請審閱以上修訂方案，確認後即執行。
