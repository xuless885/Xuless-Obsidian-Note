/* ============================================================================
   大学数学内容 · 「现代数学」液态玻璃知识地图（canvas 引擎）
   ----------------------------------------------------------------------------
   数据：window.UNI_MAP（由 .build/restructure/write_uni.py 注入）
   结构：中心节点（现代数学）→ 6 大类 → 15 分支 → 32 课题，外加跨分支关联边。
   视觉：径向分层布局；每个节点是一枚会缓慢形变的「囊泡」，玻璃材质用屏幕背景的
        模糊采样 + 高光/内阴影合成；连线是带流向光点的液态带。
   交互：拖动平移 / 滚轮·双指缩放 / 单击进入笔记 / 双击聚焦 / 悬停高亮三级亮度 /
        目录抽屉 / 键盘 Esc·0·±。
   只读钩子：window.DSH_UNI_STATE()（验收脚本用，不许删）。
   ========================================================================== */
(function () {
  "use strict";

  var M = window.UNI_MAP;
  if (!M) return;

  var stage = document.getElementById("uni-stage");
  var canvas = document.getElementById("uni-canvas");
  var panel = document.getElementById("uni-panel");
  var tip = document.getElementById("uni-tip");
  var tipPath = document.getElementById("uni-tip-path");
  var tipName = document.getElementById("uni-tip-name");
  var tipEn = document.getElementById("uni-tip-en");
  var tipGo = document.getElementById("uni-tip-go");
  var drawer = document.getElementById("uni-drawer");
  var listBtn = document.getElementById("uni-list-btn");
  var resetBtn = document.getElementById("uni-reset-btn");
  var drawerClose = document.getElementById("uni-drawer-close");
  var veilHint = document.getElementById("uni-veil-hint");
  var legend = document.getElementById("uni-legend");
  var motionBtn = document.getElementById("uni-motion-btn");

  var ctx = canvas.getContext("2d", { alpha: false });
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var SANS = '"Segoe UI","PingFang SC","Microsoft YaHei",system-ui,sans-serif';
  var BG_S = 0.34;                       // 背景极光烘焙分辨率（低分辨率=天然模糊，玻璃取景就靠它）

  var REDUCE = false;
  try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  /* ---------------------------------------------------------------- 数据整理 */
  var NODES = M.nodes.map(function (n, i) {
    return {
      id: n.id, lvl: n.lvl, name: n.name, en: n.en, desc: n.desc, href: n.href,
      parent: n.parent, cat: n.cat, color: n.color || "#6f86ff",
      index: i, children: [], seed: (i * 2.39996) % (Math.PI * 2),
      x: 0, y: 0, rx: 20, ry: 20, sx: 0, sy: 0, srx: 0, sry: 0,
      lit: 1, litT: 1, litD: 1, vis: 1, visT: 1, pop: 1, popT: 1, depth: 0, path: []
    };
  });
  var BY = {};
  NODES.forEach(function (n) { BY[n.id] = n; });
  var EDGES = M.edges.map(function (e) { return { a: BY[e[0]], b: BY[e[1]] }; }).filter(function (e) { return e.a && e.b; });
  var CROSS = M.cross.map(function (e) { return { a: BY[e[0]], b: BY[e[1]] }; }).filter(function (e) { return e.a && e.b; });
  var ADJ = {};
  NODES.forEach(function (n) { ADJ[n.id] = {}; });
  EDGES.concat(CROSS).forEach(function (e) { ADJ[e.a.id][e.b.id] = 1; ADJ[e.b.id][e.a.id] = 1; });

  (function buildTree() {
    NODES.forEach(function (n) {
      if (n.parent && BY[n.parent]) BY[n.parent].children.push(n);
    });
    var walk = function (n, path, depth) {
      n.path = path.concat([n]);
      n.depth = depth;
      n.children.forEach(function (c) { walk(c, n.path, depth + 1); });
    };
    walk(BY[M.center.id], [], 0);
  })();

  var CENTER = BY[M.center.id];
  var CATS = NODES.filter(function (n) { return n.lvl === 1; });

  /* 短英文名（画在囊泡里用；完整名走悬停卡） */
  var EN_SHORT = {
    analysis: "Analysis", algebra: "Algebra", geometry: "Geometry",
    topology: "Topology", "computational-mathematics": "Computation",
    "probability-statistics": "Probability"
  };

  /* 长课题名的两行断法（中文不能自动分词，手工给出更自然的断点） */
  var WRAP = {
    "数值线性代数": ["数值", "线性代数"],
    "数值微分方程": ["数值", "微分方程"],
    "中心极限定理": ["中心", "极限定理"],
    "矩阵与线性映射": ["矩阵", "线性映射"],
    "矩阵与线性变换": ["矩阵与", "线性变换"],
    "希尔伯特空间": ["希尔伯特", "空间"],
    "勒贝格积分": ["勒贝格", "积分"],
    "巴拿赫空间": ["巴拿赫", "空间"],
    "偏微分方程": ["偏微分方程"],
    "常微分方程": ["常微分方程"],
    "欧氏几何": ["欧氏几何"],
    "解析几何": ["解析几何"],
    "假设检验": ["假设检验"],
    "估计理论": ["估计理论"],
    "随机变量": ["随机变量"],
    "大数定律": ["大数定律"],
    "基本群": ["基本群"],
    "同调论": ["同调论"],
    "拓扑空间": ["拓扑空间"],
    "紧致性": ["紧致性"],
    "微分形式": ["微分形式"],
    "光滑流形": ["光滑流形"],
    "群论": ["群论"],
    "环与域": ["环与域"],
    "特征值与对角化": ["特征值与", "对角化"],
    "向量空间": ["向量空间"],
    "微积分": ["微积分"],
    "级数": ["级数"],
    "测度论": ["测度论"],
    "全纯函数": ["全纯函数"],
    "留数定理": ["留数定理"],
    "凸优化": ["凸优化"],
    "迭代法": ["迭代法"]
  };
  function linesOf(n) {
    if (n.lvl !== 3) return [n.name];
    var w = WRAP[n.name];
    if (w) return w;
    if (n.name.length <= 4) return [n.name];
    var mid = Math.ceil(n.name.length / 2);
    return [n.name.slice(0, mid), n.name.slice(mid)];
  }

  /* 每个节点的尺寸与字号（世界坐标；屏幕尺寸 = ×k） */
  var FONT = {
    0: { name: 28, sub: 9.5, weight: 800 },
    1: { name: 18.5, sub: 8.5, weight: 750 },
    2: { name: 13.2, sub: 0, weight: 650 },
    3: { name: 11.4, sub: 0, weight: 600 }
  };
  function measure() {
    NODES.forEach(function (n) {
      var f = FONT[n.lvl];
      n.lines = linesOf(n);
      var maxLen = 0;
      n.lines.forEach(function (l) { maxLen = Math.max(maxLen, l.length); });
      var nameW = 0;
      // 中文按字号近似，英文按 0.56 字号近似
      n.lines.forEach(function (l) {
        var w = 0;
        for (var i = 0; i < l.length; i++) w += /[\u4e00-\u9fff]/.test(l[i]) ? f.name : f.name * 0.56;
        nameW = Math.max(nameW, w);
      });
      if (n.lvl === 0) {
        n.rx = n.ry = 67;
      } else if (n.lvl === 1) {
        n.rx = n.ry = 48;
      } else if (n.lvl === 2) {
        n.rx = Math.max(31, nameW / 2 + 12);
        n.ry = Math.max(24, n.rx * 0.82);
      } else {
        var lineH = f.name * 1.22;
        n.rx = Math.max(25, nameW / 2 + 10);
        n.ry = n.lines.length > 1 ? Math.max(21, lineH + 12) : Math.max(20, Math.min(n.rx * 0.84, lineH / 2 + 9));
      }
      n.lineH = f.name * 1.24;
    });
  }

  /* ------------------------------------------------------------------ 布局 */
  function layout() {
    var S0 = Math.max(Math.min(S.w, S.h) / 2, 300);
    var R1 = S0 * 0.40, R2 = S0 * 0.625, R3 = S0 * 0.80, R3b = S0 * 0.895;
    var weights = CATS.map(function (c) {
      var nT = 0;
      c.children.forEach(function (b) { nT += b.children.length; });
      return nT + c.children.length * 1.15;
    });
    var totalW = weights.reduce(function (a, b) { return a + b; }, 0);
    var GAP = 0.045;
    var usable = Math.PI * 2 - GAP * CATS.length;
    var ang = -Math.PI / 2;
    CATS.forEach(function (cat, ci) {
      var span = usable * weights[ci] / totalW;
      var a0 = ang;
      var a1 = ang + span;
      ang = a1 + GAP;
      cat.a0 = a0; cat.a1 = a1;
      var mid = (a0 + a1) / 2;
      cat.x = Math.cos(mid) * R1;
      cat.y = Math.sin(mid) * R1;

      var brs = cat.children;
      var bw = brs.map(function (b) { return Math.max(1, b.children.length); });
      var bwT = bw.reduce(function (a, b) { return a + b; }, 0);
      var BPAD = 0.016;
      var bSpan = (a1 - a0) - BPAD * Math.max(0, brs.length - 1);
      var ba = a0;
      brs.forEach(function (br, bi) {
        var bwk = bSpan * bw[bi] / bwT;
        var bMid = ba + bwk / 2;
        var rJit = (hash01(br.id) - 0.5) * R2 * 0.05;
        br.x = Math.cos(bMid) * (R2 + rJit);
        br.y = Math.sin(bMid) * (R2 + rJit);
        ba += bwk + BPAD;

        var tps = br.children;
        var USE = Math.min(bwk * 0.78, 0.62);
        var startA = bMid - USE / 2;
        tps.forEach(function (tp, ti) {
          var frac = tps.length === 1 ? 0.5 : ti / (tps.length - 1);
          var ta = startA + USE * frac;
          var ring = ti % 2;
          var r = (ring ? R3b : R3) + (hash01(tp.id) - 0.5) * S0 * 0.035;
          tp.x = Math.cos(ta) * r;
          tp.y = Math.sin(ta) * r;
        });
      });
    });
    if (S.narrow) {
      var yS = 1.22;
      NODES.forEach(function (n) { n.y *= yS; });
    }
    CENTER.x = 0; CENTER.y = 0;
  }
  function hash01(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ((h >>> 0) % 100000) / 100000;
  }

  /* ------------------------------------------------------------------ 状态 */
  var S = {
    w: 0, h: 0, dpr: DPR, narrow: false,
    cam: { x: 0, y: 0, k: 1 }, camT: { x: 0, y: 0, k: 1 },
    fit: { x: 0, y: 0, k: 1 },
    hover: null, hoverId: "", focusId: "",
    pointer: { x: 0, y: 0, inside: false },
    drag: null, touch: null, moved: 0,
    t: 0, reduce: REDUCE,
    ready: false, theme: "light",
    ms: 0, fps: 0,
    activating: null, pulse: 0
  };

  var THEME = {
    light: {
      base: "#cfd9f2",
      aurora: 1.55,
      vignette: "rgba(54,72,132,.34)",
      ink: "#121629", inkSoft: "#5a6178",
      label: "rgba(15,19,38,.95)", labelSoft: "rgba(15,19,38,.68)",
      edge: 0.5, rimA: "rgba(255,255,255,1)", rimB: "rgba(104,126,178,.36)",
      glassTint: 0.26, glassColor: 0.22, spec: 0.85, shade: 0.17,
      topLight: "rgba(255,255,255,.5)", darken: "rgba(25,33,60,.10)",
      shadow: 0.34, glint: 0.85
    },
    dark: {
      base: "#04050a",
      aurora: 0.74,
      vignette: "rgba(0,0,0,.52)",
      ink: "#eef2ff", inkSoft: "#9da7c0",
      label: "rgba(242,246,255,.96)", labelSoft: "rgba(220,230,255,.72)",
      edge: 0.8, rimA: "rgba(255,255,255,.74)", rimB: "rgba(255,255,255,.05)",
      glassTint: 0.12, glassColor: 0.30, spec: 0.5, shade: 0.42,
      topLight: "rgba(255,255,255,.2)", darken: "rgba(0,0,0,.4)",
      shadow: 0.72, glint: 0.62
    }
  };
  function T() { return THEME[S.theme] || THEME.light; }

  /* -------------------------------------------------------------- 画布尺寸 */
  var bgCanvas = document.createElement("canvas");
  var bgCtx = bgCanvas.getContext("2d");
  // 玻璃取景用的「背后画面」快照（CSS 分辨率；每帧在画完背景与连线后拍一张，
  // clamp 后的折射取样都从这里来 —— 参考 shuding/liquid-glass 的 backdrop 模型）
  var waveCanvas = document.createElement("canvas");
  var waveCtx = waveCanvas.getContext("2d");
  function bakeWaves() {
    waveCanvas.width = S.w; waveCanvas.height = S.h;
    var g = waveCtx, N = 22;
    g.clearRect(0, 0, S.w, S.h);
    g.lineWidth = 1;
    for (var wi = 0; wi < N; wi++) {
      var yb = (wi + 0.5) / N * S.h;
      var amp = 3 + (wi % 4) * 1.6;
      g.strokeStyle = S.theme === "dark" ? "rgba(190,212,255,.09)" : "rgba(255,255,255,.24)";
      g.beginPath();
      for (var wx = 0; wx <= S.w; wx += 8) {
        var wy = yb + Math.sin(wx * 0.006 + wi * 0.66) * amp;
        if (wx === 0) g.moveTo(wx, wy); else g.lineTo(wx, wy);
      }
      g.stroke();
    }
  }

  var snapCanvas = document.createElement("canvas");
  var snapCtx = snapCanvas.getContext("2d");

  function takeSnapshot() {
    snapCtx.setTransform(1, 0, 0, 1, 0, 0);
    snapCtx.globalCompositeOperation = "copy";
    snapCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, S.w, S.h);
    snapCtx.globalCompositeOperation = "source-over";
  }

  /** 把背后画面按 s（<1 = 向中心收）缩放后铺满整个囊泡矩形；调用方负责剪裁。 */
  function lensDraw(cx, cy, rx, ry, s, alpha) {
    var sw = 2 * rx * s, sh = 2 * ry * s;
    if (sw < 1 || sh < 1) return;
    ctx.globalAlpha = alpha;
    ctx.drawImage(snapCanvas, cx - rx * s, cy - ry * s, sw, sh, cx - rx, cy - ry, rx * 2, ry * 2);
  }

  function resize() {
    var r = stage.getBoundingClientRect();
    var w = Math.max(320, Math.round(r.width));
    var h = Math.max(320, Math.round(r.height));
    if (w === S.w && h === S.h) return false;
    S.w = w; S.h = h;
    S.narrow = w < 760;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    bgCanvas.width = Math.max(2, Math.round(w * BG_S));
    bgCanvas.height = Math.max(2, Math.round(h * BG_S));
    snapCanvas.width = w;
    snapCanvas.height = h;
    bakeWaves();
    measure();
    layout();
    fitCamera();
    applyCamera(true);
    return true;
  }

  function bbox() {
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    NODES.forEach(function (n) {
      if (S.narrow && n.lvl > 1) return;
      x0 = Math.min(x0, n.x - n.rx); x1 = Math.max(x1, n.x + n.rx);
      y0 = Math.min(y0, n.y - n.ry); y1 = Math.max(y1, n.y + n.ry);
    });
    return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 };
  }
  function fitCamera() {
    var b = bbox();
    var padX = S.w < 900 ? 26 : 66;
    var padTop = S.w < 900 ? 100 : 44;
    var padBot = S.w < 900 ? 52 : 38;
    var k = Math.min((S.w - padX * 2) / b.w, (S.h - padTop - padBot) / b.h);
    k = Math.max(0.42, Math.min(k, 1.7));
    var cyShift = (padTop - padBot) / 2 / k;
    S.fit = { x: b.cx, y: b.cy - cyShift, k: k };
    S.camT.x = S.fit.x; S.camT.y = S.fit.y; S.camT.k = S.fit.k;
  }
  function applyCamera(force) {
    if (!force) return;
    S.cam.x = S.camT.x; S.cam.y = S.camT.y; S.cam.k = S.camT.k;
  }

  /* ------------------------------------------------------------ 玻璃材质贴图 */
  var spriteCache = {};
  function bodySprite(lvl, color) {
    var key = "b|" + S.theme + "|" + lvl + "|" + color;
    var hit = spriteCache[key];
    if (hit) return hit;
    var SZ = 224, C = SZ / 2, R = 68;
    var cv = document.createElement("canvas");
    cv.width = cv.height = SZ;
    var g = cv.getContext("2d");
    var th = T();
    var bodyA = [0.30, 0.25, 0.20, 0.16][lvl];
    var colorA = [0.14, 0.24, 0.20, 0.15][lvl];
    if (S.theme === "dark") { bodyA = [0.12, 0.10, 0.08, 0.06][lvl]; colorA = [0.24, 0.36, 0.30, 0.22][lvl]; }

    // 底色：左上亮 → 右下透
    var lg = g.createLinearGradient(C - R * 0.7, C - R * 0.8, C + R * 0.6, C + R * 0.9);
    lg.addColorStop(0, "rgba(255,255,255," + (bodyA * (S.theme === "dark" ? 0.85 : 1.4)) + ")");
    lg.addColorStop(0.5, "rgba(255,255,255," + bodyA * 0.55 + ")");
    lg.addColorStop(1, "rgba(255,255,255," + bodyA * 0.18 + ")");
    g.fillStyle = lg;
    g.fillRect(0, 0, SZ, SZ);

    // 类别色晕染（右下角）
    var rg = g.createRadialGradient(C + R * 0.26, C + R * 0.38, R * 0.04, C + R * 0.2, C + R * 0.3, R * 1.3);
    rg.addColorStop(0, hexA(color, colorA));
    rg.addColorStop(0.6, hexA(color, colorA * 0.45));
    rg.addColorStop(1, hexA(color, 0));
    g.fillStyle = rg;
    g.fillRect(0, 0, SZ, SZ);

    // 边缘内反光（玻璃厚度的折射带）
    var eg = g.createRadialGradient(C, C, R * 0.62, C, C, R * 1.0);
    eg.addColorStop(0, hexA(color, 0));
    eg.addColorStop(0.72, hexA(color, S.theme === "dark" ? 0.05 : 0.07));
    eg.addColorStop(0.94, "rgba(255,255,255," + (S.theme === "dark" ? 0.10 : 0.22) + ")");
    eg.addColorStop(1, hexA(color, 0));
    g.fillStyle = eg;
    g.fillRect(0, 0, SZ, SZ);

    // 顶部高光（液面反光）
    var sg = g.createRadialGradient(C - R * 0.44, C - R * 0.52, R * 0.02, C - R * 0.4, C - R * 0.48, R * 1.02);
    sg.addColorStop(0, "rgba(255,255,255," + th.spec + ")");
    sg.addColorStop(0.3, "rgba(255,255,255," + th.spec * 0.34 + ")");
    sg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = sg;
    g.beginPath(); g.ellipse(C - R * 0.34, C - R * 0.44, R * 0.66, R * 0.46, -0.5, 0, Math.PI * 2); g.fill();

    // 底部内阴影（玻璃厚度）
    var dg = g.createLinearGradient(C, C + R * 0.1, C, C + R * 1.02);
    dg.addColorStop(0, "rgba(0,0,0,0)");
    dg.addColorStop(1, "rgba(0,0,0," + th.shade + ")");
    g.fillStyle = dg;
    g.fillRect(0, 0, SZ, SZ);

    spriteCache[key] = { img: cv, R: R, SZ: SZ };
    return spriteCache[key];
  }
  function shadowSprite() {
    var key = "s|" + S.theme;
    var hit = spriteCache[key];
    if (hit) return hit;
    var SZ = 128, C = SZ / 2;
    var cv = document.createElement("canvas");
    cv.width = cv.height = SZ;
    var g = cv.getContext("2d");
    var a = T().shadow;
    var rg = g.createRadialGradient(C, C, 2, C, C, C);
    rg.addColorStop(0, "rgba(6,10,24," + a + ")");
    rg.addColorStop(0.55, "rgba(6,10,24," + a * 0.55 + ")");
    rg.addColorStop(1, "rgba(6,10,24,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, SZ, SZ);
    spriteCache[key] = { img: cv };
    return spriteCache[key];
  }
  function haloCache(color) {
    var key = "h|" + S.theme + "|" + color;
    var hit = spriteCache[key];
    if (hit) return hit;
    var SZ = 160, C = SZ / 2;
    var cv = document.createElement("canvas");
    cv.width = cv.height = SZ;
    var g = cv.getContext("2d");
    var rg = g.createRadialGradient(C, C, 4, C, C, C);
    var a = S.theme === "dark" ? 0.34 : 0.34;
    rg.addColorStop(0, hexA(color, a));
    rg.addColorStop(0.42, hexA(color, a * 0.42));
    rg.addColorStop(1, hexA(color, 0));
    g.fillStyle = rg;
    g.fillRect(0, 0, SZ, SZ);
    spriteCache[key] = { img: cv };
    return spriteCache[key];
  }
  function hexA(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* -------------------------------------------------------------- 背景极光 */
  var AURORA = [];
  (function () {
    var extra = [
      { color: "#8fa8ff", x: -0.62, y: -0.72, r: 0.62, a: 0.30, ph: 0.7 },
      { color: "#ffd6a5", x: 0.72, y: 0.78, r: 0.55, a: 0.22, ph: 2.4 },
      { color: "#b8f0e2", x: 0.62, y: -0.68, r: 0.5, a: 0.24, ph: 4.1 }
    ];
    AURORA = extra;
  })();

  var MOTES = [];
  (function () {
    for (var i = 0; i < 18; i++) {
      var h1 = hash01("mote" + i), h2 = hash01("mote-b" + i);
      MOTES.push({ x: h1, y: h2, r: 1.2 + h2 * 2.2, sp: 0.006 + h1 * 0.01, a: 0.1 + h1 * 0.16, ph: h1 * 6.28 });
    }
  })();

  var noisePattern = null;
  function makeNoise() {
    var n = 128, cv = document.createElement("canvas");
    cv.width = cv.height = n;
    var g = cv.getContext("2d");
    var img = g.createImageData(n, n), d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    noisePattern = ctx.createPattern(cv, "repeat");
  }

  function drawBackground(t) {
    var g = bgCtx;
    var bw = bgCanvas.width, bh = bgCanvas.height;
    var th = T();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = "source-over";
    g.globalAlpha = 1;
    g.fillStyle = th.base;
    g.fillRect(0, 0, bw, bh);

    // 类别色光团：位置跟随各分类在屏幕上的方位，越外越淡 —— 颜色与结构对应
    var items = [];
    var mind = Math.min(S.w, S.h);
    CATS.forEach(function (c, i) {
      var p = toScreen(c.x, c.y);
      var dx = p[0] - S.w / 2, dy = p[1] - S.h / 2;
      var d = Math.hypot(dx, dy) || 1;
      items.push({
        color: c.color,
        x: (S.w / 2 + dx / d * mind * 0.42) * BG_S,
        y: (S.h / 2 + dy / d * mind * 0.42) * BG_S,
        r: Math.max(S.w, S.h) * (0.34 + 0.05 * Math.sin(t * 0.18 + i)) * BG_S,
        a: th.aurora * (0.95 + 0.15 * Math.sin(t * 0.22 + i * 1.3)),
        ph: i
      });
    });
    AURORA.forEach(function (a, i) {
      items.push({
        color: a.color,
        x: (S.w / 2 + a.x * S.w * 0.5 + Math.sin(t * 0.09 + a.ph) * S.w * 0.03) * BG_S,
        y: (S.h / 2 + a.y * S.h * 0.5 + Math.cos(t * 0.075 + a.ph) * S.h * 0.03) * BG_S,
        r: Math.max(S.w, S.h) * a.r * 0.8 * BG_S,
        a: a.a * (S.theme === "dark" ? 1.05 : 0.8),
        ph: 10 + i
      });
    });
    if (S.theme === "dark") g.globalCompositeOperation = "lighter";
    items.forEach(function (it) {
      var rg = g.createRadialGradient(it.x, it.y, 0, it.x, it.y, it.r);
      rg.addColorStop(0, hexA(it.color, it.a));
      rg.addColorStop(0.5, hexA(it.color, it.a * 0.32));
      rg.addColorStop(1, hexA(it.color, 0));
      g.fillStyle = rg;
      g.fillRect(0, 0, bw, bh);
    });
    g.globalCompositeOperation = "source-over";

    // 中心光源：让「现代数学」坐在一束柔光里
    var cg = g.createRadialGradient(bw / 2, bh / 2, 0, bw / 2, bh / 2, Math.max(bw, bh) * (S.theme === "dark" ? 0.36 : 0.5));
    cg.addColorStop(0, S.theme === "dark" ? "rgba(160,190,255,.10)" : "rgba(255,255,255,.34)");
    cg.addColorStop(0.35, S.theme === "dark" ? "rgba(120,150,255,.03)" : "rgba(255,255,255,.12)");
    cg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = cg;
    g.fillRect(0, 0, bw, bh);

    // 暗角：拉开中心与边缘的层次
    var vg = g.createRadialGradient(bw / 2, bh / 2, Math.min(bw, bh) * 0.18, bw / 2, bh / 2, Math.max(bw, bh) * 0.76);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, th.vignette);
    g.fillStyle = vg;
    g.fillRect(0, 0, bw, bh);

    // 漂浮微粒：一点点生气，不抢结构
    var mAlpha = S.theme === "dark" ? 1 : 0.55;
    for (var mi = 0; mi < MOTES.length; mi++) {
      var m = MOTES[mi];
      var my = ((m.y - t * m.sp) % 1 + 1) % 1;
      var mx = m.x + Math.sin(t * 0.12 + m.ph) * 0.01;
      var mr = m.r * ((bw + bh) / 2000);
      g.fillStyle = S.theme === "dark" ? "rgba(190,212,255," + (m.a * mAlpha) + ")" : "rgba(255,255,255," + (m.a * mAlpha + 0.18) + ")";
      if (mr < 0.4) continue;
      g.beginPath();
      g.arc(mx * bw, my * bh, mr, 0, Math.PI * 2);
      g.fill();
    }
  }

  /* ------------------------------------------------------------------ 相机 */
  function toScreen(x, y) {
    return [(x - S.cam.x) * S.cam.k + S.w / 2, (y - S.cam.y) * S.cam.k + S.h / 2];
  }
  function toWorld(sx, sy) {
    return [(sx - S.w / 2) / S.cam.k + S.cam.x, (sy - S.h / 2) / S.cam.k + S.cam.y];
  }

  function updateCamera(dt) {
    var f = S.reduce ? 1 : 1 - Math.exp(-dt * 0.014);
    S.cam.x += (S.camT.x - S.cam.x) * f;
    S.cam.y += (S.camT.y - S.cam.y) * f;
    var lk = Math.log(S.cam.k) + (Math.log(S.camT.k) - Math.log(S.cam.k)) * f;
    S.cam.k = Math.exp(lk);
    if (Math.abs(S.camT.k - S.cam.k) < 0.0004) S.cam.k = S.camT.k;
  }

  function zoomAt(sx, sy, factor) {
    var wpt = toWorld(sx, sy);
    var k = clamp(S.camT.k * factor, S.fit.k * 0.72, S.fit.k * 4.4);
    S.camT.k = k;
    S.camT.x = wpt[0] - (sx - S.w / 2) / k;
    S.camT.y = wpt[1] - (sy - S.h / 2) / k;
  }
  function goFocus(node) {
    if (!node) { S.focusId = ""; resetView(); return; }
    S.focusId = node.id;
    S.camT.x = node.x; S.camT.y = node.y;
    S.camT.k = clamp(S.fit.k * 1.85, S.fit.k, S.fit.k * 2.4);
    updateVeil();
  }
  function resetView() {
    S.focusId = "";
    S.camT.x = S.fit.x; S.camT.y = S.fit.y; S.camT.k = S.fit.k;
    updateVeil();
  }
  function updateVeil() {
    if (!veilHint) return;
    var zoomed = S.camT.k > S.fit.k * 1.28 || Math.hypot(S.camT.x - S.fit.x, S.camT.y - S.fit.y) > Math.min(S.w, S.h) * 0.08;
    veilHint.hidden = !zoomed;
  }

  /* ------------------------------------------------------------- 悬停/高亮 */
  function neighborsOf(node) {
    var out = [];
    for (var id in ADJ[node.id]) out.push(BY[id]);
    return out;
  }
  function descendantsOf(node, out) {
    out = out || [];
    node.children.forEach(function (c) { out.push(c); descendantsOf(c, out); });
    return out;
  }
  function ancestorsOf(node, out) {
    out = out || [];
    if (node.parent && BY[node.parent]) { out.push(BY[node.parent]); ancestorsOf(BY[node.parent], out); }
    return out;
  }

  function setHover(node) {
    var id = node ? node.id : "";
    if (S.hoverId === id) return;
    S.hoverId = id;
    S.hover = node;
    computeLights();
    canvas.classList.toggle("is-hover", !!node);
    if (node) {
      showTip(node);
      Array.prototype.forEach.call(legend ? legend.children : [], function (li) {
        li.classList.toggle("is-hot", li.getAttribute("data-cat") === node.cat || (node.lvl === 1 && li.getAttribute("data-cat") === node.id));
      });
    } else {
      hideTip();
      Array.prototype.forEach.call(legend ? legend.children : [], function (li) { li.classList.remove("is-hot"); });
    }
  }
  function computeLights() {
    NODES.forEach(function (n) { n.litT = 1; n.popT = 1; });
    var h = S.hover;
    if (!h) return;
    NODES.forEach(function (n) { n.litT = 0.42; });
    h.litT = 1; h.popT = 1.14;
    neighborsOf(h).forEach(function (n) { n.litT = Math.max(n.litT, 0.84); });
    descendantsOf(h).forEach(function (n) { n.litT = Math.max(n.litT, 0.72); });
    ancestorsOf(h).forEach(function (n) { n.litT = Math.max(n.litT, 0.88); });
  }
  function updateLights(dt) {
    var f = S.reduce ? 1 : 1 - Math.exp(-dt * 0.012);
    var zr = S.cam.k / Math.max(0.001, S.fit.k);
    var t2 = 1, t3 = 1;
    if (S.narrow) {
      t2 = clamp((zr - 1.18) / 0.22, 0, 1);
      t3 = clamp((zr - 1.55) / 0.30, 0, 1);
    }
    NODES.forEach(function (n) {
      n.lit += (n.litT - n.lit) * f;
      n.pop += (n.popT - n.pop) * (S.reduce ? 1 : 1 - Math.exp(-dt * 0.02));
      var vt = n.lvl === 3 ? t3 : (n.lvl === 2 ? t2 : 1);
      n.vis += (vt - n.vis) * f;
      n.litD = n.lit * n.vis;
    });
  }

  /* ------------------------------------------------------------------ 提示卡 */
  function showTip(node) {
    if (!tip) return;
    var path = node.path.slice(0, -1).map(function (n) { return n.name; }).join(" · ");
    tipPath.textContent = path || "知识地图";
    tipName.textContent = node.name;
    tipEn.textContent = node.en || "";
    tipGo.innerHTML = node.href ? '进入笔记 <span aria-hidden="true">&#8594;</span>' : '回到总览 <span aria-hidden="true">&#8594;</span>';
    tip.hidden = false;
    requestAnimationFrame(function () { tip.classList.add("is-on"); });
    placeTip();
  }
  function hideTip() {
    if (!tip) return;
    tip.classList.remove("is-on");
    tip.hidden = true;
  }
  function placeTip() {
    if (!tip || tip.hidden) return;
    var n = S.hover;
    if (!n) return;
    var p = toScreen(n.x, n.y);
    var tx = p[0] + n.srx + 18;
    var ty = p[1] - 12;
    var tw = 196, th = 96;
    if (tx + tw > S.w - 16) tx = p[0] - n.srx - tw - 18;
    if (ty + th > S.h - 16) ty = S.h - th - 16;
    if (ty < 76) ty = 76;
    tip.style.transform = "translate3d(" + Math.round(tx) + "px," + Math.round(ty) + "px,0)";
    tip.dataset.sx = String(Math.round(tx));
  }

  /* ------------------------------------------------------------------ 绘制 */
  function blobPath(cx, cy, rx, ry, seed, amp, noBegin) {
    var N = 44;
    if (!noBegin) ctx.beginPath();
    for (var i = 0; i <= N; i++) {
      var a = i / N * Math.PI * 2;
      var w = 1 + amp * (Math.sin(a * 3 + S.t * 0.55 + seed) * 0.62 +
                         Math.sin(a * 5 - S.t * 0.4 + seed * 1.7) * 0.38);
      var px = cx + Math.cos(a) * rx * w;
      var py = cy + Math.sin(a) * ry * w;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function drawEdges(t) {
    var th = T();
    // 先画跨分支关联（细虚线，从中心附近绕行），再画主树（液体带）
    CROSS.forEach(function (e) {
      var a = e.a, b = e.b;
      var pa = toScreen(a.x, a.y), pb = toScreen(b.x, b.y);
      var mx = (pa[0] + pb[0]) / 2, my = (pa[1] + pb[1]) / 2;
      var cx = S.w / 2 + (mx - S.w / 2) * 0.42;
      var cy = S.h / 2 + (my - S.h / 2) * 0.42;
      var lit = Math.min(a.litD, b.litD);
      var litBoost = (S.hover && (S.hover.id === a.id || S.hover.id === b.id)) ? 1 : 0;
      var alpha = lit * (0.22 + litBoost * 0.5) * (S.theme === "dark" ? 1.2 : 1);
      var grad = ctx.createLinearGradient(pa[0], pa[1], pb[0], pb[1]);
      grad.addColorStop(0, hexA(a.color, alpha));
      grad.addColorStop(1, hexA(b.color, alpha));
      ctx.save();
      ctx.setLineDash([2, 7]);
      ctx.lineDashOffset = -(t * 14 + a.index * 5) % 9;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.35;
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.quadraticCurveTo(cx, cy, pb[0], pb[1]);
      ctx.stroke();
      ctx.restore();
    });

    EDGES.forEach(function (e) {
      var p = e.a, c = e.b;
      var pa = p, cb = c;
      var psx = p.sx, psy = p.sy, csx = c.sx, csy = c.sy;
      var dx = csx - psx, dy = csy - psy;
      var d = Math.hypot(dx, dy);
      if (d < 2) return;
      var ux = dx / d, uy = dy / d;
      var nx = -uy, ny = ux;
      var pr = Math.min(p.srx, p.sry), cr = Math.min(c.srx, c.sry);
      var ax = psx + ux * pr * 0.16, ay = psy + uy * pr * 0.16;
      var bx = csx - ux * cr * 0.16, by = csy - uy * cr * 0.16;
      var wob = S.reduce ? 0 : Math.sin(S.t * 0.5 + p.seed + c.seed) * Math.min(d * 0.035, 9);
      var mx = (ax + bx) / 2 + nx * wob, my = (ay + by) / 2 + ny * wob;
      var w1 = Math.max(1.8, pr * (p.lvl === 0 ? 0.15 : 0.21));
      var w2 = Math.max(1.3, cr * 0.18);
      var lit = Math.min(p.litD, c.litD);
      var hot = S.hover && (S.hover.id === p.id || S.hover.id === c.id) ? 0.4 : 0;
      var aBase = (p.lvl === 0 ? 0.20 : 0.28) * lit + hot * (p.lvl === 0 ? 0.3 : 0.5);
      if (aBase < 0.02) return;

      var g1 = ctx.createLinearGradient(ax, ay, bx, by);
      g1.addColorStop(0, hexA(p.color, aBase * (S.theme === "dark" ? 1.25 : 1)));
      g1.addColorStop(1, hexA(c.color, aBase * (S.theme === "dark" ? 1.25 : 1) * 0.75));
      ctx.fillStyle = g1;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(ax + nx * w1 * 2.4, ay + ny * w1 * 2.4);
      ctx.quadraticCurveTo(mx + nx * (w1 + w2) * 1.2, my + ny * (w1 + w2) * 1.2, bx + nx * w2 * 2.2, by + ny * w2 * 2.2);
      ctx.lineTo(bx - nx * w2 * 2.2, by - ny * w2 * 2.2);
      ctx.quadraticCurveTo(mx - nx * (w1 + w2) * 1.2, my - ny * (w1 + w2) * 1.2, ax - nx * w1 * 2.4, ay - ny * w1 * 2.4);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(ax + nx * w1, ay + ny * w1);
      ctx.quadraticCurveTo(mx + nx * (w1 + w2) / 2, my + ny * (w1 + w2) / 2, bx + nx * w2, by + ny * w2);
      ctx.lineTo(bx - nx * w2, by - ny * w2);
      ctx.quadraticCurveTo(mx - nx * (w1 + w2) / 2, my - ny * (w1 + w2) / 2, ax - nx * w1, ay - ny * w1);
      ctx.closePath();
      ctx.fill();

      // 玻璃高光线
      var g2 = ctx.createLinearGradient(ax, ay, bx, by);
      var la = lit * (S.theme === "dark" ? 0.34 : 0.30) + hot * 0.4;
      g2.addColorStop(0, hexA(p.color, la));
      g2.addColorStop(1, hexA(c.color, la * 0.35));
      ctx.strokeStyle = g2;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(mx, my, bx, by);
      ctx.stroke();

      // 流向光点（只给主干级别加，避免噪声）
      if (p.lvl <= 1 && !S.reduce && lit > 0.5) {
        for (var k = 0; k < 2; k++) {
          var u = (S.t * (0.10 + 0.02 * k) + (p.index * 0.17 + c.index * 0.31 + k * 0.5)) % 1;
          var iu = 1 - u;
          var qx = iu * iu * ax + 2 * iu * u * mx + u * u * bx;
          var qy = iu * iu * ay + 2 * iu * u * my + u * u * by;
          ctx.fillStyle = "rgba(255,255,255," + (0.28 * lit + hot * 0.5) + ")";
          ctx.beginPath();
          ctx.arc(qx, qy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  }

  function drawNodes(t) {
    var th = T();
    var order = NODES.slice().sort(function (a, b) {
      if (a.lvl !== b.lvl) return b.lvl - a.lvl;
      return a.index - b.index;
    });
    // 光晕 + 玻璃体
    order.forEach(function (n) {
      if (n.litD < 0.03) return;
      var pop = 1 + (n.pop - 1) * 0.85;
      var rx = n.srx * pop, ry = n.sry * pop;
      var cx = n.sx, cy = n.sy;
      var amp = S.reduce ? 0 : [0.05, 0.042, 0.034, 0.028][n.lvl];

      // 投影：把玻璃泡从背景上抬起来
      var sh = shadowSprite();
      var shr = Math.max(rx, ry) * 1.55;
      ctx.globalAlpha = n.litD;
      ctx.save();
      ctx.translate(cx, cy + ry * 0.34);
      ctx.scale(1, 0.55);
      ctx.drawImage(sh.img, -shr, -shr, shr * 2, shr * 2);
      ctx.restore();

      // 外光晕（只做类别色提示，压低避免发白）
      var halo = haloCache(n.color);
      var hr = Math.max(rx, ry) * (n.lvl === 0 ? 2.3 : 1.9);
      ctx.globalAlpha = n.litD * (S.theme === "dark" ? 0.55 : 0.42) * (n.lvl === 1 ? 1.2 : n.lvl === 3 ? 0.7 : 1);
      ctx.drawImage(halo.img, cx - hr, cy - hr, hr * 2, hr * 2);

      // 玻璃体：按 shuding/liquid-glass 的模型做「背景折射」——
      // 边缘取样向中心收（位移最大），中心保持 1:1；玻璃本身不铺白色，
      // 通透感来自折射 + 取景时预提的 contrast/saturate + 内阴影。
      var big = n.lvl <= 1;
      var edgeS = [0.42, 0.48, 0.60, 0.70][n.lvl];
      var stepK = 0.92 - edgeS;
      function f(rad) {
        var tt = clamp((rad - 0.10) / 0.90, 0, 1);
        tt = tt * tt * (3 - 2 * tt);
        return 0.92 - stepK * tt;
      }
      var cuts = n.lvl <= 1 ? [0.84, 0.72, 0.60, 0.48, 0.36, 0.24, 0.12]
             : n.lvl === 2 ? [0.78, 0.58, 0.36, 0.14]
             : [0.56];

      ctx.save();
      blobPath(cx, cy, rx, ry, n.seed, amp);
      ctx.clip();
      ctx.globalAlpha = n.litD;
      // 1) 边缘一圈：折射最强（evenodd 挖掉内圈）
      ctx.save();
      blobPath(cx, cy, rx, ry, n.seed, amp, true);
      ctx.ellipse(cx, cy, rx * cuts[0], ry * cuts[0], 0, 0, Math.PI * 2);
      ctx.clip("evenodd");
      lensDraw(cx, cy, rx, ry, f((cuts[0] + 1) / 2), n.litD);
      ctx.restore();
      // 2) 内侧圆盘：越靠中心越接近 1:1（相邻盘尺度差只有 2–5%，接缝几乎不可见）
      for (var ri = 0; ri < cuts.length; ri++) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx * cuts[ri], ry * cuts[ri], 0, 0, Math.PI * 2);
        ctx.clip();
        lensDraw(cx, cy, rx, ry, f(cuts[ri]), n.litD);
        ctx.restore();
      }
      // 3) 内阴影：上沿厚度 + 下沿暗边（对应参考实现的 inset 阴影）
      var topShade = ctx.createLinearGradient(cx, cy - ry, cx, cy + ry * 0.12);
      topShade.addColorStop(0, S.theme === "dark" ? "rgba(0,0,0,.30)" : "rgba(14,20,40,.10)");
      topShade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topShade;
      ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      var botShade = ctx.createLinearGradient(cx, cy + ry * 0.48, cx, cy + ry);
      botShade.addColorStop(0, "rgba(0,0,0,0)");
      botShade.addColorStop(1, S.theme === "dark" ? "rgba(0,0,0,.26)" : "rgba(14,20,40,.07)");
      ctx.fillStyle = botShade;
      ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      // 4a) 淡淡的白：让玻璃有体量（参考实现也有一层很淡的玻璃白）
      var fillA = [0.08, 0.08, 0.07, 0.06][n.lvl];
      ctx.fillStyle = S.theme === "dark"
        ? "rgba(255,255,255," + (fillA * 0.45) + ")"
        : "rgba(255,255,255," + fillA + ")";
      ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      // 4b) 类别色浸染：右下更浓，给每一类保留身份色（不是白）
      var cg2 = ctx.createLinearGradient(cx - rx * 0.8, cy - ry * 0.9, cx + rx * 0.9, cy + ry);
      var tintA = [0.50, 0.58, 0.44, 0.28][n.lvl];
      if (S.theme === "dark") tintA *= 1.15;
      cg2.addColorStop(0, hexA(n.color, tintA * 0.28));
      cg2.addColorStop(0.45, hexA(n.color, tintA * 0.62));
      cg2.addColorStop(0.8, hexA(n.color, tintA * 0.9));
      cg2.addColorStop(1, hexA(n.color, tintA));
      ctx.fillStyle = cg2;
      ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      // 5) 极轻的顶光：只在左上角一点，不再整片泛白
      var sheen = ctx.createRadialGradient(cx - rx * 0.4, cy - ry * 0.44, 0,
                                           cx - rx * 0.4, cy - ry * 0.44, Math.max(rx, ry) * 0.62);
      sheen.addColorStop(0, S.theme === "dark" ? "rgba(255,255,255,.10)" : "rgba(255,255,255,.14)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      ctx.restore();

      // 轮廓：细暗边 + 左上 1px 高光弧 + 类别色细环
      ctx.save();
      blobPath(cx, cy, rx, ry, n.seed, amp);
      // 边缘：一道很淡的暗线压形 + 柔光带 + 细亮线（参考实现是柔和的亮边玻璃）
      ctx.globalAlpha = n.litD * 0.3;
      ctx.strokeStyle = S.theme === "dark" ? "rgba(0,0,0,.5)" : "rgba(20,28,50,.12)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = n.litD * 0.22;
      ctx.strokeStyle = S.theme === "dark" ? "rgba(220,235,255,.45)" : "rgba(255,255,255,.85)";
      ctx.lineWidth = 3.4;
      ctx.stroke();
      ctx.globalAlpha = n.litD * (S.hoverId === n.id ? 0.95 : 0.8);
      ctx.strokeStyle = S.theme === "dark" ? "rgba(234,244,255,.55)" : "rgba(255,255,255,.92)";
      ctx.lineWidth = 1.15;
      ctx.stroke();
      ctx.globalAlpha = n.litD * (S.hoverId === n.id ? 0.9 : 0.5);
      ctx.strokeStyle = hexA(n.color, S.theme === "dark" ? 0.75 : 0.55);
      ctx.lineWidth = 1;
      ctx.stroke();
      // 色散：内侧极淡的红/青边（只给大类与中心，省描边开销）
      if (n.lvl <= 1) {
      ctx.save();
      blobPath(cx, cy, rx, ry, n.seed, amp);
      ctx.clip();
      ctx.globalAlpha = n.litD * 0.55;
      ctx.translate(-0.9, -0.6);
      ctx.strokeStyle = "rgba(255,96,120,.16)";
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.translate(1.8, 1.2);
      ctx.strokeStyle = "rgba(80,190,255,.16)";
      ctx.stroke();
      ctx.restore();
      }
      var gl1 = 3.55 + (S.reduce ? 0 : Math.sin(S.t * 0.33 + n.seed) * 0.1);
      ctx.globalAlpha = n.litD * (S.theme === "dark" ? 0.5 : 0.7);
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx * 0.95, ry * 0.95, 0, gl1, gl1 + 0.5);
      ctx.stroke();
      ctx.restore();

      // 4) 悬停脉冲环
      if (S.hoverId === n.id) {
        var pr2 = Math.max(rx, ry) * (1.3 + Math.sin(S.t * 2.2) * 0.02);
        ctx.save();
        var gl = ctx.createRadialGradient(cx, cy, Math.max(rx, ry) * 0.9, cx, cy, pr2 * 1.16);
        gl.addColorStop(0, hexA(n.color, 0));
        gl.addColorStop(0.72, hexA(n.color, S.theme === "dark" ? 0.28 : 0.2));
        gl.addColorStop(1, hexA(n.color, 0));
        ctx.globalAlpha = n.litD;
        ctx.fillStyle = gl;
        ctx.beginPath();
        ctx.ellipse(cx, cy, pr2 * 1.16, pr2 * 1.16 * (ry / rx), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = hexA(n.color, 0.95);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, pr2, pr2 * (ry / rx), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = "rgba(255,255,255,.9)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, pr2 + 3.5, (pr2 + 3.5) * (ry / rx), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    });

    // 文本（最后画，保证清晰）
    order.forEach(function (n) {
      if (n.litD < 0.05) return;
      var f = FONT[n.lvl];
      var pop = 1 + (n.pop - 1) * 0.55;
      var lines = n.lines;
      var lh = n.lineH * pop;
      var hasSub = n.lvl === 0 || n.lvl === 1;
      var subH = hasSub ? (n.lvl === 0 ? 15 : 11) * pop : 0;
      var total = lines.length * lh + subH;
      var y0 = n.sy - total / 2 + lh / 2;
      ctx.save();
      ctx.globalAlpha = n.litD * (n.litD < 0.5 ? 0.85 : 1);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = th.label;
      lines.forEach(function (line, i) {
        var size = f.name * pop;
        ctx.font = (f.weight || 600) + " " + size.toFixed(1) + "px " + SANS;
        if (n.lvl <= 1) {
          ctx.strokeStyle = S.theme === "dark" ? "rgba(0,0,0,.35)" : "rgba(255,255,255,.55)";
          ctx.lineWidth = Math.max(2, size * 0.16);
          ctx.strokeText(line, n.sx, y0 + i * lh);
        }
        ctx.fillText(line, n.sx, y0 + i * lh);
      });
      if (hasSub) {
        var sub = n.lvl === 0 ? n.en : (EN_SHORT[n.id] || n.en);
        if (sub) {
          var sa = n.lvl === 0 ? 0.68 : 0.55;
          ctx.globalAlpha = n.litD * sa;
          ctx.fillStyle = th.labelSoft;
          ctx.font = "600 " + (f.sub * pop).toFixed(1) + "px " + SANS;
          ctx.fillText(String(sub).toUpperCase(), n.sx, y0 + lines.length * lh + subH * 0.15);
        }
      }
      ctx.restore();
    });
  }

  function updateNodesScreen() {
    for (var i = 0; i < NODES.length; i++) {
      var n = NODES[i];
      var p = toScreen(n.x, n.y);
      n.sx = p[0]; n.sy = p[1];
      n.srx = n.rx * S.cam.k;
      n.sry = n.ry * S.cam.k;
    }
  }

  var frameNo = 0;
  function draw() {
    var t0 = performance.now();
    updateNodesScreen();
    if ((frameNo++ % 2) === 0) drawBackground(S.t);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(bgCanvas, 0, 0, S.w, S.h);
    ctx.drawImage(waveCanvas, 0, 0);
    drawEdges(S.t);
    if ((frameNo % 2) === 1) takeSnapshot();
    drawNodes(S.t);
    if (S.hover) placeTip();
    // 激活涟漪（点击后 0~1）
    if (S.activating) {
      var n = S.activating, p = toScreen(n.x, n.y), rr = Math.max(n.srx, n.sry) * (1 + S.pulse * 1.6);
      ctx.save();
      ctx.globalAlpha = (1 - S.pulse) * 0.55;
      ctx.strokeStyle = hexA(n.color, 0.9);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p[0], p[1], rr, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    S.ms = S.ms ? S.ms * 0.9 + (performance.now() - t0) * 0.1 : (performance.now() - t0);
  }

  /* ------------------------------------------------------------------ 主循环 */
  var last = 0, running = false, fpsAcc = 0, fpsN = 0;
  function frame(ts) {
    if (!running) return;
    var dt = last ? Math.min(48, ts - last) : 16;
    last = ts;
    S.t = S.reduce ? 0 : ts / 1000;
    fpsAcc += dt; fpsN++;
    if (fpsN >= 30) { S.fps = Math.round(1000 / (fpsAcc / fpsN)); fpsAcc = 0; fpsN = 0; }
    updateCamera(dt);
    updateLights(dt);
    if (S.activating) S.pulse = Math.min(1, S.pulse + dt / 300);
    draw();
    if (!S.ready) {
      S.ready = true;
      document.documentElement.classList.add("uni-ready");
    }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------ 交互 */
  function localXY(e) {
    var r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }

  function hitTest(sx, sy) {
    var best = null, bestScore = 1.06;
    for (var i = 0; i < NODES.length; i++) {
      var n = NODES[i];
      if (!n.srx || n.vis < 0.2) continue;
      var dx = (sx - n.sx) / (n.srx * 1.05), dy = (sy - n.sy) / (n.sry * 1.05);
      var q = dx * dx + dy * dy;
      if (q <= 1 && q < bestScore) { bestScore = q; best = n; }
    }
    return best;
  }

  function onPointerDown(e) {
    if (e.target !== canvas) return;
    clearTimeout(navTimer);
    S.activating = null;
    closeDrawer();
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    var lp = localXY(e);
    if (e.pointerType === "touch") {
      if (!S.touch) S.touch = {};
      S.touch[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(S.touch);
      if (ids.length === 2) {
        var a = S.touch[ids[0]], b = S.touch[ids[1]];
        var rc = canvas.getBoundingClientRect();
        var pcx = (a.x + b.x) / 2 - rc.left, pcy = (a.y + b.y) / 2 - rc.top;
        S.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: S.camT.k, cx: pcx, cy: pcy, wx: 0, wy: 0 };
        var wp = toWorld(pcx, pcy);
        S.pinch.wx = wp[0]; S.pinch.wy = wp[1];
      } else {
        S.drag = { x: e.clientX, y: e.clientY, camx: S.camT.x, camy: S.camT.y, id: e.pointerId };
        S.moved = 0;
      }
      return;
    }
    S.drag = { x: e.clientX, y: e.clientY, camx: S.camT.x, camy: S.camT.y, id: e.pointerId };
    S.moved = 0;
    setHover(hitTest(lp[0], lp[1]));
    canvas.classList.add("is-dragging");
  }

  function onPointerMove(e) {
    S.pointer.x = e.clientX; S.pointer.y = e.clientY;
    if (S.pinch && S.touch) {
      var ids = Object.keys(S.touch);
      if (ids.length >= 2) {
        S.touch[e.pointerId] = { x: e.clientX, y: e.clientY };
        var a = S.touch[ids[0]], b = S.touch[ids[1]];
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        var k = clamp(S.pinch.k * (d / Math.max(1, S.pinch.d)), S.fit.k * 0.72, S.fit.k * 4.4);
        var rc2 = canvas.getBoundingClientRect();
        var cx = (a.x + b.x) / 2 - rc2.left, cy = (a.y + b.y) / 2 - rc2.top;
        S.camT.k = k;
        S.camT.x = S.pinch.wx - (cx - S.w / 2) / k;
        S.camT.y = S.pinch.wy - (cy - S.h / 2) / k;
        S.moved = 99;
        return;
      }
    }
    if (S.drag) {
      var dx = e.clientX - S.drag.x, dy = e.clientY - S.drag.y;
      S.moved = Math.max(S.moved, Math.hypot(dx, dy));
      if (S.moved > 3) {
        S.camT.x = S.drag.camx - dx / S.cam.k;
        S.camT.y = S.drag.camy - dy / S.cam.k;
        S.cam.x = S.camT.x; S.cam.y = S.camT.y;
        updateVeil();
      }
      return;
    }
    var lpm = localXY(e);
    var n = hitTest(lpm[0], lpm[1]);
    setHover(n);
  }

  function onPointerUp(e) {
    if (e.pointerType === "touch" && S.touch) {
      delete S.touch[e.pointerId];
      if (Object.keys(S.touch).length < 2) S.pinch = null;
      if (Object.keys(S.touch).length === 1) {
        var left = S.touch[Object.keys(S.touch)[0]];
        S.drag = { x: left.x, y: left.y, camx: S.camT.x, camy: S.camT.y, id: e.pointerId };
        S.moved = 0;
      }
      if (Object.keys(S.touch).length === 0) {
        if (S.moved < 8) {
          var lp2 = localXY(e);
          var node = hitTest(lp2[0], lp2[1]);
          if (node) tapNode(node);
        }
        S.drag = null;
        S.moved = 0;
      }
      return;
    }
    canvas.classList.remove("is-dragging");
    var wasDrag = S.moved > 6;
    S.drag = null;
    if (wasDrag) return;
    var lpu = localXY(e);
    var n = hitTest(lpu[0], lpu[1]);
    if (n) tapNode(n);
  }

  var navTimer = 0;
  function tapNode(node) {
    clearTimeout(navTimer);
    if (!node.href) { resetView(); return; }
    S.activating = node;
    S.pulse = 0;
    setHover(node);
    var href = node.href;
    navTimer = setTimeout(function () { window.location.href = href; }, 230);
  }

  function onWheel(e) {
    if (e.target !== canvas) return;
    e.preventDefault();
    var factor = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0016));
    factor = clamp(factor, 0.82, 1.22);
    var lpw = localXY(e);
    zoomAt(lpw[0], lpw[1], factor);
    updateVeil();
  }

  function onDblClick(e) {
    if (e.target !== canvas) return;
    clearTimeout(navTimer);
    var lpd = localXY(e);
    var n = hitTest(lpd[0], lpd[1]);
    if (n && n.lvl >= 1 && n.lvl <= 2) goFocus(n);
    else if (n && n.href) { window.location.href = n.href; }
    else resetView();
  }

  function onKey(e) {
    if (e.key === "Escape") { closeDrawer(); hideTip(); return; }
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === "0") { resetView(); e.preventDefault(); }
    if (e.key === "+" || e.key === "=") { zoomAt(S.w / 2, S.h / 2, 1.18); e.preventDefault(); }
    if (e.key === "-" || e.key === "_") { zoomAt(S.w / 2, S.h / 2, 1 / 1.18); e.preventDefault(); }
  }

  function openDrawer() {
    drawer.hidden = false;
    listBtn.setAttribute("aria-expanded", "true");
    hideTip();
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.hidden = true;
    listBtn.setAttribute("aria-expanded", "false");
  }
  function toggleDrawer() { if (drawer.hidden) openDrawer(); else closeDrawer(); }

  /* ------------------------------------------------------------------ 主题 */
  function readTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    return t === "dark" ? "dark" : "light";
  }
  function syncTheme() {
    var t = readTheme();
    if (t === S.theme) return;
    S.theme = t;
    spriteCache = {};
    drawBackground(S.t);
  }

  /* ------------------------------------------------------------------ 初始化 */
  function init() {
    if (!stage || !canvas) return;
    S.theme = readTheme();
    // 默认开着动效（这张图的核心体验）；用户在「动效」按钮上的选择优先并记住，
    // 系统 prefers-reduced-motion 只作为初始参考之外的显式开关入口。
    S.reduce = false;
    try {
      var savedMotion = localStorage.getItem("dsh-uni-motion");
      if (savedMotion === "off") S.reduce = true;
    } catch (e) {}
    syncMotionBtn();
    resize();
    if (listBtn) listBtn.addEventListener("click", toggleDrawer);
    if (motionBtn) motionBtn.addEventListener("click", toggleMotion);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (resetBtn) resetBtn.addEventListener("click", function () { resetView(); });
    if (legend) {
      Array.prototype.forEach.call(legend.children, function (li) {
        var id = li.getAttribute("data-cat");
        li.addEventListener("pointerenter", function () { var n = BY[id]; if (n) { S.legendHover = true; setHover(n); } });
        li.addEventListener("pointerleave", function () { if (S.legendHover) { S.legendHover = false; setHover(null); } });
        li.addEventListener("click", function () { goFocus(BY[id]); });
      });
    }
    var zoomBtns = stage.querySelectorAll("[data-uni-zoom]");
    Array.prototype.forEach.call(zoomBtns, function (b) {
      b.addEventListener("click", function () {
        zoomAt(S.w / 2, S.h / 2, b.getAttribute("data-uni-zoom") === "in" ? 1.22 : 1 / 1.22);
        updateVeil();
      });
    });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", function () { if (!S.drag && !S.pinch) setHover(null); });
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("dblclick", onDblClick);
    document.addEventListener("keydown", onKey);
    try {
      new MutationObserver(syncTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    } catch (e) {}
    try {
      window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function (ev) {
        S.reduce = ev.matches; REDUCE = ev.matches;
      });
    } catch (e) {}

    var roTimer = 0;
    var onResize = function () {
      clearTimeout(roTimer);
      roTimer = setTimeout(function () {
        if (resize()) { spriteCache = {}; }
      }, 140);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // 字体就绪后重排（中文近似宽度 → 真实字形宽度）
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); layout(); fitCamera(); });
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; last = 0; requestAnimationFrame(frame); }
    });

    running = true;
    requestAnimationFrame(frame);
    updateVeil();
  }

  /* --------------------------------------------------------------- 只读钩子 */
  window.DSH_UNI_STATE = function () {
    return {
      ready: S.ready, theme: S.theme, w: S.w, h: S.h, dpr: DPR,
      cam: { x: +S.cam.x.toFixed(2), y: +S.cam.y.toFixed(2), k: +S.cam.k.toFixed(3), kt: +S.camT.k.toFixed(3) },
      fit: { x: +S.fit.x.toFixed(2), y: +S.fit.y.toFixed(2), k: +S.fit.k.toFixed(3) },
      hover: S.hover ? S.hover.id : "", hoverName: S.hover ? S.hover.name : "",
      focus: S.focusId, ms: +S.ms.toFixed(2), fps: S.fps,
      counts: M.counts, edges: EDGES.length, cross: CROSS.length,
      nodes: NODES.map(function (n) {
        return {
          id: n.id, name: n.name, lvl: n.lvl, cat: n.cat, href: n.href,
          sx: +n.sx.toFixed(1), sy: +n.sy.toFixed(1), srx: +n.srx.toFixed(1), sry: +n.sry.toFixed(1),
          lit: +n.lit.toFixed(3), litD: +n.litD.toFixed(3), vis: +n.vis.toFixed(3), pop: +n.pop.toFixed(3),
          x: +n.x.toFixed(1), y: +n.y.toFixed(1)
        };
      })
    };
  };
  function syncMotionBtn() {
    if (!motionBtn) return;
    motionBtn.setAttribute("aria-pressed", String(!S.reduce));
    motionBtn.classList.toggle("is-off", S.reduce);
    var label = motionBtn.querySelector("span:last-child");
    if (label) label.textContent = S.reduce ? "动效关" : "动效开";
  }
  function toggleMotion() {
    S.reduce = !S.reduce;
    try { localStorage.setItem("dsh-uni-motion", S.reduce ? "off" : "on"); } catch (e) {}
    if (!S.reduce) { S.t = performance.now() / 1000; }
    syncMotionBtn();
  }
  window.DSH_UNI_MOTION = function (on) { S.reduce = !on; syncMotionBtn(); };
  window.DSH_UNI_HOVER = function (id) { setHover(id ? BY[id] : null); };
  window.DSH_UNI_ZOOM = function (f) { zoomAt(S.w / 2, S.h / 2, f); updateVeil(); };
  window.DSH_UNI_RESET = function () { resetView(); };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
