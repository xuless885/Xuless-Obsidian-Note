/*!
 * graph.js —— Obsidian 风格的关系图（原生 <canvas> + 自写力导向布局，零依赖、零 CDN）
 * 站点：Xuless 数字花园 ｜ 归属：task-4「关系图与检索」
 *
 * 设计要点
 *  1) 纯函数层（buildGraph / simulateStep / fitView / zoomAt / pickNode …）不碰任何 DOM，
 *     可以被 node 直接 require 做 headless 自测（见 .build/test_graph_search.js）。
 *  2) 浏览器层只在 #graph-app[data-graph-root] 存在时启动；挂载点缺失 → 安静退出，绝不抛异常。
 *  3) 物理由 requestAnimationFrame 驱动，alpha 衰减到阈值后**停止调度**，静止时 0 CPU 空转。
 *  4) 坐标系：所有节点坐标是「世界坐标」；视图 view = {k(缩放), x, y(平移)}；
 *     屏幕坐标 = 世界坐标 * k + (x, y)。
 */
(function () {
  'use strict';

  var HAS_DOM = (typeof document !== 'undefined' && typeof window !== 'undefined');

  /* ==========================================================================
   * 第一部分：纯函数层（无 DOM 依赖，可被 node require）
   * ========================================================================== */

  /** 物理参数（世界坐标单位 ≈ CSS 像素 @k=1） */
  var PHYSICS = {
    repulsion: 1750,       // 斥力系数：a = repulsion / d²（调大 → 节点铺得更开、更有张力）
    spring: 0.18,          // 弹簧系数
    linkDistance: 52,      // 弹簧自然长度基准
    linkDistanceScale: 4,  // 每单位度数的额外长度（高度节点连线更长，像 Obsidian）
    center: 0.00022,       // 向心力：a = center * 到原点距离
    damping: 0.86,         // 速度阻尼
    alphaDecay: 0.985,     // alpha 每步衰减
    alphaMin: 0.006,       // 低于此值即认为静止 → 停止 rAF
    maxVelocity: 14,       // 单步位移上限（防爆）
    maxForce: 60,          // 单点加速度上限（防爆）
    minDist2: 25,          // 软核：距离平方下限
    collision: 1.35,       // 短程碰撞系数：圆点重叠时额外推开（0 = 关闭）
    collidePad: 7,         // 碰撞判定的额外间隙：节点之间始终留白，不贴边
    collideKick: 0.30,     // 碰撞时同时给一点速度（硬分离 + 弹性观感，避免静摩擦糊死）
    preSettleSteps: 420    // 首帧前的同步预收敛步数（避免开场炸开 + 首帧即收敛）
  };

  function clamp(v, lo, hi) {
    v = +v;
    if (!isFinite(v)) return lo;
    return v < lo ? lo : (v > hi ? hi : v);
  }

  /** 确定性 PRNG：布局可复现（测试与「重新布局」都能拿到稳定结果） */
  function mulberry32(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function str(v) { return (typeof v === 'string') ? v : (v === null || v === undefined ? '' : String(v)); }

  /**
   * 由 docs.json 的 docs[] 与 links.json 的 edges[] 构建图模型。
   * 对脏数据完全容忍：缺字段、重复 id、未知 id、自环、非数组一律不抛异常。
   * @returns {{nodes:Array, edges:Array, byId:Object, dropped:number, derived:boolean}}
   */
  function buildGraph(rawDocs, rawEdges, opts) {
    opts = opts || {};
    var docs = Array.isArray(rawDocs) ? rawDocs : [];
    var nodes = [];
    var byId = Object.create(null);
    var i, d, id;

    for (i = 0; i < docs.length; i++) {
      d = docs[i];
      if (!d || typeof d !== 'object') continue;
      id = str(d.id);
      if (!id || byId[id]) continue; // 缺 id / 重复 id 直接跳过
      var tags = [];
      if (Array.isArray(d.tags)) {
        for (var ti = 0; ti < d.tags.length; ti++) {
          var tg = str(d.tags[ti]);
          if (tg && tags.indexOf(tg) < 0) tags.push(tg);
        }
      }
      var node = {
        i: nodes.length,
        id: id,
        path: str(d.path),
        title: str(d.title) || str(d.path) || id,
        category: str(d.category) || '未分类',
        parentDir: str(d.parentDir),
        tags: tags,
        degree: 0,
        inDeg: 0,
        outDeg: 0,
        x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0,
        r: 3,
        active: true,
        pinned: false,
        catIndex: 0
      };
      byId[id] = node;
      nodes.push(node);
    }

    var edges = [];
    var seen = Object.create(null);
    var dropped = 0;

    function pushEdge(s, t, kind) {
      if (!s || !t || s === t) { dropped++; return; }
      var a = byId[s], b = byId[t];
      if (!a || !b) { dropped++; return; }          // 未知 id → 丢弃，不造幽灵节点
      var k = (kind === 'embed') ? 'embed' : 'link';
      var key = s + '\u0001' + t + '\u0001' + k;
      if (seen[key]) return;
      seen[key] = 1;
      edges.push({ s: s, t: t, kind: k, si: a.i, ti: b.i, active: true });
    }

    var list = Array.isArray(rawEdges) ? rawEdges : [];
    for (i = 0; i < list.length; i++) {
      var e = list[i];
      if (!e || typeof e !== 'object') { dropped++; continue; }
      pushEdge(str(e.s), str(e.t), e.kind);
    }

    // 兜底：links.json 缺失/为空时，用 docs.outgoing / docs.incoming 推导，保证图不空
    var derived = false;
    if (edges.length === 0 && nodes.length) {
      derived = true;
      for (i = 0; i < docs.length; i++) {
        d = docs[i];
        if (!d || typeof d !== 'object') continue;
        var sid = str(d.id);
        var outs = Array.isArray(d.outgoing) ? d.outgoing : [];
        for (var oi = 0; oi < outs.length; oi++) pushEdge(sid, str(outs[oi]), 'link');
        var ins = Array.isArray(d.incoming) ? d.incoming : [];
        for (var ii = 0; ii < ins.length; ii++) pushEdge(str(ins[ii]), sid, 'link');
      }
      // 推导出来的边不改变「未知 id 计数」的语义，这里复位 dropped 里由推导引入的部分
      dropped = 0;
      for (i = 0; i < list.length; i++) {
        var ee = list[i];
        if (!ee || typeof ee !== 'object') { dropped++; continue; }
        if (!byId[str(ee.s)] || !byId[str(ee.t)]) dropped++;
      }
    }

    var adj = [];
    for (i = 0; i < nodes.length; i++) adj.push([]);
    for (i = 0; i < edges.length; i++) {
      var ed = edges[i];
      var na = nodes[ed.si], nb = nodes[ed.ti];
      if (!na || !nb) continue;
      na.outDeg++; nb.inDeg++;
      if (adj[ed.si].indexOf(ed.ti) < 0) adj[ed.si].push(ed.ti);
      if (adj[ed.ti].indexOf(ed.si) < 0) adj[ed.ti].push(ed.si);
    }
    for (i = 0; i < nodes.length; i++) nodes[i].degree = nodes[i].inDeg + nodes[i].outDeg;

    return { nodes: nodes, edges: edges, byId: byId, adj: adj, dropped: dropped, derived: derived };
  }

  /** 度 → 半径映射（3px → 12px，sqrt 分布更均匀） */
  function degreeRadius(deg, maxDeg) {
    var m = maxDeg > 0 ? maxDeg : 1;
    var t = Math.sqrt(Math.max(0, deg || 0) / m);
    return 3 + 9 * clamp(t, 0, 1);
  }

  /**
   * 画出来的半径（世界坐标）—— 与 degreeRadius 的区别：
   * 世界半径直接乘 k 时，默认 fit 视角下节点能有 25px、放大后更是撑满一屏
   * （用户截图：「节点图标太大，不能随缩放变换」）。这里把**屏幕半径**夹在
   * [minPx, maxPx] 再换回世界坐标：节点始终是 3–13px 的圆点，
   * 放大不会变成大饼，缩到很远也还看得见。物理/碰撞仍用 degreeRadius，观感不受影响。
   */
  function screenRadius(worldR, k, minPx, maxPx) {
    var kk = k || 1;
    var lo = (minPx === undefined) ? 2.6 : minPx;
    var hi = (maxPx === undefined) ? 13 : maxPx;
    return clamp((worldR || 3) * kk, lo, hi) / kk;
  }

  /** 标签字号：屏幕上恒定在 [10.5, 13]px（世界坐标 = 屏幕字号 / k） */
  function labelFontScreen(k) {
    return clamp(11.0 * (0.84 + 0.12 * (k || 1)), 10.5, 13);
  }

  /** 初始位置：同心圆 + 确定性抖动（像 Obsidian 开场那样铺开） */
  function initPositions(nodes, seed) {
    var rnd = mulberry32(seed || 1013904223);
    var n = (nodes && nodes.length) || 0;
    var R = 14 * Math.sqrt(n || 1) + 60;
    for (var i = 0; i < n; i++) {
      var nd = nodes[i];
      var ang = (i / (n || 1)) * Math.PI * 2 + rnd() * 0.7;
      var rr = R * (0.5 + rnd() * 0.5);
      nd.x = Math.cos(ang) * rr;
      nd.y = Math.sin(ang) * rr;
      nd.vx = 0; nd.vy = 0;
      nd.pinned = false;
    }
    return nodes;
  }

  /**
   * 力导向「一步」更新：斥力(O(n²)) + 弹簧 + 向心力 → 速度 → 位置。
   * 任何非有限值都会被就地修复，保证不产生 NaN/Infinity。
   * @returns {number} 本步最大速度（用于判断是否静止）
   */
  function simulateStep(nodes, edges, state, params) {
    var p = params || PHYSICS;
    var alpha = clamp(state && state.alpha, 0, 1);
    var n = (nodes && nodes.length) || 0;
    var i, j, a, b, dx, dy, d2, d, f, ax, ay;

    for (i = 0; i < n; i++) { nodes[i].ax = 0; nodes[i].ay = 0; }

    // 1) 斥力：所有「可见」节点两两相斥
    for (i = 0; i < n; i++) {
      a = nodes[i];
      if (a.active === false) continue;
      for (j = i + 1; j < n; j++) {
        b = nodes[j];
        if (b.active === false) continue;
        dx = b.x - a.x; dy = b.y - a.y;
        d2 = dx * dx + dy * dy;
        if (!(d2 > 1e-6)) {                       // 完全重合 → 确定性微扰，避免 0 除法
          dx = ((i % 7) - 3) * 0.31 + 0.117;
          dy = ((j % 5) - 2) * 0.29 + 0.073;
          d2 = dx * dx + dy * dy;
        }
        if (d2 < p.minDist2) d2 = p.minDist2;     // 软核
        d = Math.sqrt(d2);
        f = p.repulsion / d2;
        // 短程碰撞：两个圆点（含间隙）重叠时**硬**推开 + 给一点速度。
        // 只加加速度的话，节点会在阻尼下停在「刚好挨着」的位置，看起来像糊在一起；
        // 改成直接修正坐标（硬分离）并叠加速度冲击，才有多体碰撞的弹性观感。
        var pad = (p.collidePad != null) ? p.collidePad : 1.5;
        var rsum = (a.r || 3) + (b.r || 3) + pad;
        if (p.collision > 0 && d < rsum) {
          f += (rsum - d) * p.collision;
          // 硬分离：直接修正坐标。
          // 注意**不要**再叠加速度冲击（试过 collideKick）：速度在积分时还要乘 alpha，
          // 会让重叠节点一步弹开十几像素，模拟久久不收敛、首帧耗时飙升。
          var overlap = (rsum - d);
          if (overlap > 0) {
            var nx = dx / d, ny = dy / d;
            var push = overlap * 0.5;             // 各退一半
            if (!a.pinned) { a.x -= nx * push; a.y -= ny * push; }
            if (!b.pinned) { b.x += nx * push; b.y += ny * push; }
          }
        }
        if (f > p.maxForce) f = p.maxForce;
        ax = (dx / d) * f; ay = (dy / d) * f;
        a.ax -= ax; a.ay -= ay;
        b.ax += ax; b.ay += ay;
      }
    }

    // 2) 弹簧：边的两端互相拉近（embed 边更松）
    var m = (edges && edges.length) || 0;
    for (i = 0; i < m; i++) {
      var ed = edges[i];
      if (ed.active === false) continue;
      a = nodes[ed.si]; b = nodes[ed.ti];
      if (!a || !b || a.active === false || b.active === false) continue;
      dx = b.x - a.x; dy = b.y - a.y;
      d2 = dx * dx + dy * dy;
      if (!(d2 > 1e-6)) { dx = 0.31; dy = 0.29; d2 = dx * dx + dy * dy; }
      d = Math.sqrt(d2);
      var L = p.linkDistance + p.linkDistanceScale * Math.min(((a.degree || 0) + (b.degree || 0)), 12);
      f = ((d - L) / d) * p.spring * (ed.kind === 'embed' ? 0.6 : 1);
      if (f > p.maxForce) f = p.maxForce; else if (f < -p.maxForce) f = -p.maxForce;
      ax = dx * f; ay = dy * f;
      a.ax += ax; a.ay += ay;
      b.ax -= ax; b.ay -= ay;
    }

    // 3) 向心力：把整体拉回原点，避免漂移
    for (i = 0; i < n; i++) {
      a = nodes[i];
      if (a.active === false) continue;
      a.ax -= a.x * p.center;
      a.ay -= a.y * p.center;
    }

    // 4) 积分（被拖动的节点是「钉住」的，不参与积分）
    var maxSpeed = 0;
    for (i = 0; i < n; i++) {
      a = nodes[i];
      if (a.active === false) continue;
      if (a.pinned) { a.vx = 0; a.vy = 0; if (a.ax || a.ay) { a.ax = 0; a.ay = 0; } continue; }
      var vx = (a.vx + a.ax * alpha) * p.damping;
      var vy = (a.vy + a.ay * alpha) * p.damping;
      var sp2 = vx * vx + vy * vy;
      if (!isFinite(sp2)) { vx = 0; vy = 0; sp2 = 0; }
      var sp = Math.sqrt(sp2);
      if (sp > p.maxVelocity) { var s = p.maxVelocity / sp; vx *= s; vy *= s; sp = p.maxVelocity; }
      a.vx = vx; a.vy = vy;
      a.x += vx; a.y += vy;
      if (!isFinite(a.x) || !isFinite(a.y)) { a.x = 0; a.y = 0; a.vx = 0; a.vy = 0; sp = 0; }
      if (sp > maxSpeed) maxSpeed = sp;
    }
    return maxSpeed;
  }

  /** 一步 + alpha 衰减 + 静止判定 */
  function runStep(nodes, edges, state, params) {
    var p = params || PHYSICS;
    var maxSpeed = simulateStep(nodes, edges, state, p);
    state.alpha = clamp(state.alpha, 0, 1) * p.alphaDecay;
    state.maxSpeed = maxSpeed;
    state.settled = state.alpha < p.alphaMin;
    return state;
  }

  /** 同步跑满 steps 步（用于首帧预收敛 / prefers-reduced-motion 直接跳到稳态） */
  function settle(nodes, edges, state, steps, params) {
    var p = params || PHYSICS;
    var total = Math.max(0, steps | 0);
    state = state || { alpha: 1 };
    for (var i = 0; i < total; i++) runStep(nodes, edges, state, p);
    state.alpha = 0;
    state.settled = true;
    return state;
  }

  /** 世界 → 屏幕 */
  function worldToScreen(view, wx, wy) {
    return { x: view.x + wx * view.k, y: view.y + wy * view.k };
  }

  /** 屏幕 → 世界 */
  function screenToWorld(view, sx, sy) {
    var k = view.k || 1;
    return { x: (sx - view.x) / k, y: (sy - view.y) / k };
  }

  /**
   * 以 (sx, sy) 为锚点缩放：锚点下的世界坐标保持不动（滚轮缩放的核心）。
   * 纯函数：返回新 view，不修改入参。
   */
  function zoomAt(view, sx, sy, factor, minK, maxK) {
    minK = (minK === undefined) ? 0.15 : minK;
    maxK = (maxK === undefined) ? 4 : maxK;
    var k0 = view.k || 1;
    var k1 = clamp(k0 * factor, minK, maxK);
    var w = screenToWorld(view, sx, sy);
    return { k: k1, x: sx - w.x * k1, y: sy - w.y * k1 };
  }

  /** 自动适配视图：把所有可见节点装进 width×height（含节点半径） */
  function fitView(nodes, width, height, opts) {
    opts = opts || {};
    var pad = (opts.padding === undefined) ? 48 : opts.padding;
    var labelPad = opts.labelPad || 0;      // 标签画在节点下方，适配时要把这段留出来
    var minK = (opts.minK === undefined) ? 0.15 : opts.minK;
    var maxK = (opts.maxK === undefined) ? 4 : opts.maxK;
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, any = false;
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      if (!a || a.active === false) continue;
      var r = (a.r || 3) + 2;
      if (a.x - r < minX) minX = a.x - r;
      if (a.x + r > maxX) maxX = a.x + r;
      if (a.y - r < minY) minY = a.y - r;
      if (a.y + r > maxY) maxY = a.y + r;
      any = true;
    }
    if (!any) return { k: 1, x: width / 2, y: height / 2 };
    if (labelPad) { minX -= labelPad * 0.6; maxX += labelPad * 0.6; maxY += labelPad; }
    var w = Math.max(maxX - minX, 1);
    var h = Math.max(maxY - minY, 1);
    var k = Math.min((width - pad * 2) / w, (height - pad * 2) / h);
    if (!isFinite(k) || k <= 0) k = 1;
    k = clamp(k, minK, maxK);
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    return { k: k, x: width / 2 - cx * k, y: height / 2 - cy * k };
  }

  /** 命中测试：世界坐标 (wx, wy) 下最靠上的可见节点（半径外留 3/k 的容差） */
  function pickNode(nodes, wx, wy, k, tol) {
    var best = -1, bestD = Infinity;
    var pad = (tol === undefined ? 3 : tol) / (k || 1);
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      if (!a || a.active === false) continue;
      var dx = wx - a.x, dy = wy - a.y;
      var d2 = dx * dx + dy * dy;
      var rr = (a.r || 3) + pad;
      if (d2 <= rr * rr && d2 < bestD) { bestD = d2; best = i; }
    }
    return best;
  }

  /** 一跳邻居集合（不含自身） */
  function oneHop(adj, idx) {
    var out = Object.create(null);
    var row = (adj && adj[idx]) || [];
    for (var i = 0; i < row.length; i++) out[row[i]] = 1;
    return out;
  }

  /** HTML 转义（DOM 文本一律走 textContent；需要拼 HTML 时用这个） */
  function escapeHtml(s) {
    return str(s).replace(/[&<>"'`]/g, function (c) {
      switch (c) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        case '`': return '&#96;';
        default: return c;
      }
    });
  }

  /** 逐段 encodeURIComponent，保留 "/"，用于把 docs.path 变成安全 URL */
  function encodeDocPath(path) {
    var p = str(path);
    if (!p) return '';
    var segs = p.split('/');
    var out = [];
    for (var i = 0; i < segs.length; i++) {
      if (segs[i]) out.push(encodeURIComponent(segs[i]));
    }
    return out.join('/');
  }

  var PURE = {
    PHYSICS: PHYSICS,
    clamp: clamp,
    mulberry32: mulberry32,
    buildGraph: buildGraph,
    degreeRadius: degreeRadius,
    screenRadius: screenRadius,
    labelFontScreen: labelFontScreen,
    initPositions: initPositions,
    simulateStep: simulateStep,
    runStep: runStep,
    settle: settle,
    worldToScreen: worldToScreen,
    screenToWorld: screenToWorld,
    zoomAt: zoomAt,
    fitView: fitView,
    pickNode: pickNode,
    oneHop: oneHop,
    escapeHtml: escapeHtml,
    encodeDocPath: encodeDocPath
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = PURE;
  if (HAS_DOM) window.DSH_GRAPH_PURE = PURE;

  /* ==========================================================================
   * 第二部分：浏览器层（仅当挂载点存在时启动）
   * ========================================================================== */

  if (!HAS_DOM) return;

  // —— 颜色工具：把 CSS 计算值解析成 {r,g,b,a}，并缓存 rgba 字符串 ——
  var colorCache = Object.create(null);

  function parseColor(input) {
    var s = String(input == null ? '' : input).trim();
    if (!s) return null;
    if (s.charAt(0) === '#') {
      var hex = s.slice(1);
      if (hex.length === 3 || hex.length === 4) {
        return {
          r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
          g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
          b: parseInt(hex.charAt(2) + hex.charAt(2), 16),
          a: hex.length === 4 ? parseInt(hex.charAt(3) + hex.charAt(3), 16) / 255 : 1
        };
      }
      if (hex.length === 6 || hex.length === 8) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
          a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
        };
      }
      return null;
    }
    var m = s.match(/^rgba?\(([^)]+)\)$/i);
    if (m) {
      var parts = m[1].split(/[,\s/]+/).filter(function (x) { return x !== ''; });
      if (parts.length < 3) return null;
      var f = function (x, scale) {
        var v = parseFloat(x);
        if (!isFinite(v)) v = 0;
        if (/%$/.test(x)) v = v * 255 / 100;
        return clamp(Math.round(v), 0, 255);
      };
      var a = parts.length > 3 ? parseFloat(parts[3]) : 1;
      if (!isFinite(a)) a = 1;
      if (parts.length > 3 && /%$/.test(parts[3])) a = a / 100;
      return { r: f(parts[0]), g: f(parts[1]), b: f(parts[2]), a: clamp(a, 0, 1) };
    }
    var m2 = s.match(/^hsla?\(([^)]+)\)$/i);
    if (m2) {
      var pp = m2[1].split(/[,\s/]+/).filter(function (x) { return x !== ''; });
      if (pp.length < 3) return null;
      var h = ((parseFloat(pp[0]) % 360) + 360) % 360 / 360;
      var sat = clamp(parseFloat(pp[1]) / 100, 0, 1);
      var li = clamp(parseFloat(pp[2]) / 100, 0, 1);
      var a2 = pp.length > 3 ? clamp(parseFloat(pp[3]), 0, 1) : 1;
      var q = li < 0.5 ? li * (1 + sat) : li + sat - li * sat;
      var pp2 = 2 * li - q;
      var hue = function (t) {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return pp2 + (q - pp2) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return pp2 + (q - pp2) * (2 / 3 - t) * 6;
        return pp2;
      };
      return {
        r: Math.round(hue(h + 1 / 3) * 255),
        g: Math.round(hue(h) * 255),
        b: Math.round(hue(h - 1 / 3) * 255),
        a: isFinite(a2) ? a2 : 1
      };
    }
    return null;
  }

  function rgba(c, alpha) {
    if (!c) c = { r: 128, g: 128, b: 128, a: 1 };
    var a = (alpha === undefined) ? c.a : alpha;
    a = clamp(a, 0, 1);
    var key = c.r + ',' + c.g + ',' + c.b + '@' + a.toFixed(2);
    var hit = colorCache[key];
    if (hit) return hit;
    var out = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')';
    colorCache[key] = out;
    return out;
  }

  var FALLBACK_CATS = ['#4c6ef5', '#f59f00', '#37b24d', '#e8590c', '#ae3ec9', '#0c8599'];

  function readTheme(el) {
    var cs = window.getComputedStyle(el);
    function tok(name, fb) {
      var v = '';
      try { v = (cs.getPropertyValue(name) || '').trim(); } catch (e) { v = ''; }
      return v || fb;
    }
    var cats = [];
    for (var i = 1; i <= 6; i++) {
      cats.push(parseColor(tok('--graph-c' + i, '')) || parseColor(FALLBACK_CATS[i - 1]));
    }
    // canvas 的 font 需要用「干净的」字体栈：折叠换行/多余空白，去掉可能的尾分号
    var fontStack = tok('--font-sans', 'system-ui, sans-serif')
      .replace(/\s+/g, ' ').replace(/;\s*$/, '').trim() || 'system-ui, sans-serif';
    return {
      bg: parseColor(tok('--bg', '#ffffff')) || { r: 255, g: 255, b: 255, a: 1 },
      elev: parseColor(tok('--bg-elev', '#ffffff')) || { r: 255, g: 255, b: 255, a: 1 },
      fg: parseColor(tok('--fg', '#1f2328')) || { r: 31, g: 35, b: 40, a: 1 },
      muted: parseColor(tok('--fg-muted', '#6b7280')) || { r: 107, g: 114, b: 128, a: 1 },
      subtle: parseColor(tok('--fg-subtle', '#9ca3af')) || { r: 156, g: 163, b: 175, a: 1 },
      border: parseColor(tok('--border', 'rgba(0,0,0,0.12)')) || { r: 0, g: 0, b: 0, a: 0.12 },
      accent: parseColor(tok('--accent', '#3b82f6')) || { r: 59, g: 130, b: 246, a: 1 },
      accent2: parseColor(tok('--accent-2', '#8b5cf6')) || { r: 139, g: 92, b: 246, a: 1 },
      cats: cats,
      font: fontStack
    };
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  function rootPrefix() {
    var r = window.DSH_ROOT;
    if (typeof r === 'string' && r) return r.replace(/\/+$/, '');
    return '..';
  }

  function dataUrl(file) { return rootPrefix() + '/site-lib/data/' + file; }

  function fetchJson(file) {
    if (typeof window.fetch !== 'function') return Promise.reject(new Error('no fetch'));
    return window.fetch(dataUrl(file), { cache: 'force-cache' }).then(function (res) {
      if (!res || !res.ok) throw new Error('HTTP ' + (res && res.status));
      return res.json();
    });
  }

  function openDoc(url) {
    try { window.location.href = url; } catch (e) { /* ignore */ }
  }

  function docUrl(path) {
    if (window.DSH && typeof window.DSH.docUrl === 'function') {
      try { return window.DSH.docUrl(path); } catch (e) { /* fallthrough */ }
    }
    var enc = encodeDocPath(path);
    return enc ? (rootPrefix() + '/' + enc) : '#';
  }

  var REDUCED = false;
  try {
    REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) { REDUCED = false; }

  function bootGraph() {
    var app = document.querySelector('[data-graph-root]') || document.getElementById('graph-app');
    if (!app) return; // 骨架缺失 → 安静退出
    var controls = document.getElementById('graph-controls') ||
      document.querySelector('[data-graph-controls]');

    // —— 让「画布 + 侧栏」在任意父容器下都能并排（只加一个自己的类，不动主题的 DOM）——
    try {
      var shell = app.parentElement;
      if (shell && controls && shell === controls.parentElement) {
        var kids = shell.children;
        var count = 0;
        for (var ci = 0; ci < kids.length; ci++) {
          if (kids[ci] === app || kids[ci] === controls) count++;
        }
        if (count === 2) shell.classList.add('graph-shell');
      }
    } catch (e) { /* ignore */ }

    var canvas = el('canvas', 'graph-canvas');
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('role', 'application');
    canvas.setAttribute('aria-label', '文档关系图：方向键平移，+/- 缩放，Tab 聚焦后可用键盘操作');
    app.textContent = '';
    app.appendChild(canvas);
    var hint = el('div', 'graph-hint', '滚轮缩放 · 拖动平移 · 拖节点调整 · 点击看详情');
    app.appendChild(hint);
    var toast = el('div', 'graph-toast');
    toast.hidden = true;
    app.appendChild(toast);
    var loading = el('div', 'graph-loading skeleton');
    loading.setAttribute('aria-hidden', 'true');
    app.appendChild(loading);

    var ctx = canvas.getContext('2d');
    if (!ctx) { app.appendChild(el('p', 'empty-state', '当前浏览器不支持 canvas，无法渲染关系图。')); return; }

    var S = {
      nodes: [], edges: [], adj: [], byId: Object.create(null),
      categories: [], catIndex: Object.create(null),
      activeCats: Object.create(null),
      allTags: [], activeTags: Object.create(null),
      minDegree: 0, maxDegree: 0,
      showIsolated: false, showArrows: true,
      query: '', matchSet: null, matchList: [],
      labelOrder: null, labelKey: '', labelWidths: null,
      hover: -1, selected: -1,
      view: { k: 1, x: 0, y: 0 },
      alpha: 0, settled: true, rafId: 0,
      drag: null, clickCandidate: -1,
      width: 0, height: 0, dpr: 1,
      theme: null, themeKey: '',
      userTouched: false,
      counts: { nodes: 0, edges: 0, totalNodes: 0, totalEdges: 0 },
      detail: null
    };

    function setToast(msg) {
      toast.textContent = msg;
      toast.hidden = !msg;
      if (msg) {
        window.clearTimeout(setToast._t);
        setToast._t = window.setTimeout(function () { toast.hidden = true; toast.textContent = ''; }, 2600);
      }
    }

    /* ---------------- 尺寸 / 主题 ---------------- */

    function resize() {
      var rect = app.getBoundingClientRect();
      var w = Math.max(240, Math.round(rect.width || app.clientWidth || 640));
      var h = Math.max(240, Math.round(rect.height || app.clientHeight || 480));
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.width = w; S.height = h;
      canvas.width = Math.round(w * S.dpr);
      canvas.height = Math.round(h * S.dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      if (!S.userTouched) S.view = fitGraph();
    }

    function themeKeyOf(t) {
      return [t.bg.r, t.bg.g, t.bg.b, t.fg.r, t.fg.g, t.fg.b, t.accent.r, t.accent.g, t.accent.b].join('-');
    }

    function refreshTheme(force) {
      var t = readTheme(canvas);
      var key = themeKeyOf(t);
      if (!force && key === S.themeKey) return false;
      S.themeKey = key;
      S.theme = t;
      return true;
    }

    /* ---------------- 渲染 ---------------- */

    var dotTile = null, dotTileKey = '';

    function dotPattern(spacing) {
      var key = spacing + '|' + rgba(S.theme.subtle, 0.55);
      if (dotTile && dotTileKey === key) return dotTile;
      var tw = Math.max(4, Math.round(spacing * S.dpr));
      var c = document.createElement('canvas');
      c.width = tw; c.height = tw;
      var g = c.getContext('2d');
      var dot = Math.max(1, Math.round(1.15 * S.dpr));
      var off = Math.round(tw / 2 - dot / 2);
      g.fillStyle = rgba(S.theme.subtle, 0.5);
      g.fillRect(off, off, dot, dot);
      dotTile = { canvas: c, size: tw / S.dpr, pattern: null, ctx: g };
      dotTileKey = key;
      dotTile.pattern = ctx.createPattern(c, 'repeat');
      return dotTile;
    }

    function drawBackground() {
      var W = S.width, H = S.height;
      ctx.fillStyle = rgba(S.theme.bg, 1);
      ctx.fillRect(0, 0, W, H);
      var spacing = clamp(Math.round(22 * clamp(S.view.k, 0.55, 1.9)), 12, 44);
      var tile = dotPattern(spacing);
      if (!tile || !tile.pattern) return;
      var sp = tile.size;
      var ox = ((S.view.x % sp) + sp) % sp - sp / 2;
      var oy = ((S.view.y % sp) + sp) % sp - sp / 2;
      ctx.save();
      ctx.translate(ox, oy);
      ctx.fillStyle = tile.pattern;
      ctx.fillRect(-ox - sp, -oy - sp, W + sp * 2, H + sp * 2);
      ctx.restore();
    }

    function focusInfo() {
      var idx = S.hover >= 0 ? S.hover : S.selected;
      if (idx < 0) return null;
      var set = oneHop(S.adj, idx);
      set[idx] = 1;
      return { idx: idx, set: set };
    }

    function edgeAlpha(focus, si, ti) {
      if (!focus) return clamp(0.18 + 0.42 * S.view.k, 0.14, 0.62);
      if (si === focus.idx || ti === focus.idx) return 0.85;
      if (focus.set[si] && focus.set[ti]) return 0.45;
      return 0.05;
    }

    /** 连线的轻微弧度控制点（确定性：由端点坐标导出，保证每帧一致） */
    function edgeCtrl(a, b) {
      var dx = b.x - a.x, dy = b.y - a.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var k = Math.min(d * 0.10, 16);            // 长边弧更明显，短边几乎直
      // 垂直方向偏移；符号由坐标决定，双向边会自然分开
      var sgn = ((a.x + b.x + a.y - b.y) >= 0) ? 1 : -1;
      return { x: (a.x + b.x) / 2 - dy / d * k * sgn,
               y: (a.y + b.y) / 2 + dx / d * k * sgn };
    }

    /** 画一条（可能是弧的）连线；返回终点控制信息供箭头使用 */
    function strokeEdge(a, b, curved) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      if (curved) {
        var c = edgeCtrl(a, b);
        ctx.quadraticCurveTo(c.x, c.y, b.x, b.y);
      } else {
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();
      return curved ? edgeCtrl(a, b) : null;
    }

    function drawArrow(a, b, color, alpha, ctrl) {
      var dx, dy, d, ux, uy, ex, ey;
      if (ctrl) {
        // 弧线：用控制点到终点的方向作为箭头朝向（切线近似）
        dx = b.x - ctrl.x; dy = b.y - ctrl.y;
      } else {
        dx = b.x - a.x; dy = b.y - a.y;
      }
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      ux = dx / d; uy = dy / d;
      ex = b.x - ux * ((b.r || 3) + 1.2);
      ey = b.y - uy * ((b.r || 3) + 1.2);
      var size = 4.6;
      ctx.fillStyle = rgba(color, alpha);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - ux * size - uy * size * 0.52, ey - uy * size + ux * size * 0.52);
      ctx.lineTo(ex - ux * size + uy * size * 0.52, ey - uy * size - ux * size * 0.52);
      ctx.closePath();
      ctx.fill();
    }

    function drawEdges(focus) {
      var i, ed, a, b;
      var arrowOn = S.showArrows && S.view.k >= 0.8; // 缩放 <0.8 时隐藏箭头（省性能）
      var edgeColor = S.theme.subtle;
      ctx.lineCap = 'round';
      ctx.lineWidth = clamp(1 / S.view.k, 0.35, 3);

      if (!focus) {
        // 无高亮 → 按样式批量成两条路径，减少 stroke 调用。
        // 拖动/缩放中用直线（快），静止时用轻微弧线（好看）——
        // 弧线要逐条 quadraticCurveTo，批量路径的优势会丢一半。
        var curved = !(S.drag && S.drag.mode);
        ctx.beginPath();
        for (i = 0; i < S.edges.length; i++) {
          ed = S.edges[i];
          if (ed.active === false || ed.kind === 'embed') continue;
          a = S.nodes[ed.si]; b = S.nodes[ed.ti];
          ctx.moveTo(a.x, a.y);
          if (curved) {
            var c0 = edgeCtrl(a, b);
            ctx.quadraticCurveTo(c0.x, c0.y, b.x, b.y);
          } else {
            ctx.lineTo(b.x, b.y);
          }
        }
        ctx.strokeStyle = rgba(edgeColor, edgeAlpha(null));
        ctx.stroke();
        ctx.save();
        ctx.setLineDash([3.5, 3.5]);
        ctx.beginPath();
        for (i = 0; i < S.edges.length; i++) {
          ed = S.edges[i];
          if (ed.active === false || ed.kind !== 'embed') continue;
          a = S.nodes[ed.si]; b = S.nodes[ed.ti];
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        }
        ctx.stroke();
        ctx.restore();
        if (arrowOn) {
          for (i = 0; i < S.edges.length; i++) {
            ed = S.edges[i];
            if (ed.active === false) continue;
            a = S.nodes[ed.si]; b = S.nodes[ed.ti];
            drawArrow(a, b, edgeColor, edgeAlpha(null), curved ? edgeCtrl(a, b) : null);
          }
        }
        return;
      }

      // 有高亮：逐条画，用弧线 + 主题色的渐变描边，突出重点关系
      for (i = 0; i < S.edges.length; i++) {
        ed = S.edges[i];
        if (ed.active === false) continue;
        var al = edgeAlpha(focus, ed.si, ed.ti);
        a = S.nodes[ed.si]; b = S.nodes[ed.ti];
        ctx.save();
        if (ed.kind === 'embed') ctx.setLineDash([3.5, 3.5]);
        ctx.strokeStyle = rgba(edgeColor, al);
        var c1 = edgeCtrl(a, b);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(c1.x, c1.y, b.x, b.y);
        ctx.stroke();
        ctx.restore();
        if (arrowOn && al > 0.2) drawArrow(a, b, edgeColor, al, c1);
      }
    }

    function drawNodes(focus) {
      var i, n, r, col;
      var dim = 0.12;
      var kk = S.view.k || 1;
      for (i = 0; i < S.nodes.length; i++) {
        n = S.nodes[i];
        if (n.active === false) continue;
        r = screenRadius(n.r || 3, kk);      // 屏幕半径有上下限，见 screenRadius 注释
        col = S.theme.cats[(n.catIndex || 0) % 6];
        var al = 1;
        if (focus) al = focus.set[i] ? 1 : dim;
        else if (S.matchSet && !S.matchSet[i]) al = 0.3;

        // 光晕：给每个节点加一层柔光，整体更有「发光图」的观感。
        // 只对度数较高的节点加，避免几百个节点时 glow 反而糊成一片。
        // 旧浏览器/测试桩可能没有 createRadialGradient —— 拿不到就跳过光晕，
        // 绝不让它抛异常打断渲染循环（否则整个图谱「静止」不下来）。
        if ((n.degree || 0) >= 2 && al > 0.5 && typeof ctx.createRadialGradient === "function") {
          var glowR = r * 2.6;
          var g = ctx.createRadialGradient(n.x, n.y, r * 0.6, n.x, n.y, glowR);
          if (g && typeof g.addColorStop === "function") {
            g.addColorStop(0, rgba(col, 0.30 * al));
            g.addColorStop(1, rgba(col, 0));
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
          }
        }

        // 节点圆：径向渐变制造球感（高光偏左上）；无渐变能力时退回纯色
        ctx.globalAlpha = al;
        var fill = rgba(col, 0.95);
        if (typeof ctx.createRadialGradient === "function") {
          var rg = ctx.createRadialGradient(
            n.x - r * 0.35, n.y - r * 0.35, r * 0.15,
            n.x, n.y, r);
          if (rg && typeof rg.addColorStop === "function") {
            rg.addColorStop(0, rgba(col, 1));
            rg.addColorStop(1, rgba(col, 0.72));
            fill = rg;
          }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 1.2 / clamp(S.view.k, 0.4, 2);
        ctx.strokeStyle = rgba(S.theme.bg, 0.9);
        ctx.stroke();

        // 选中 / 命中 / 悬停 的环
        if (i === S.selected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 3.2, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(S.theme.accent, 0.95);
          ctx.lineWidth = 2 / clamp(S.view.k, 0.5, 2);
          ctx.stroke();
        } else if (S.matchSet && S.matchSet[i]) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2.6, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(S.theme.accent2, 0.9);
          ctx.lineWidth = 1.8 / clamp(S.view.k, 0.5, 2);
          ctx.stroke();
        } else if (i === S.hover) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2.6, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(S.theme.accent, 0.7);
          ctx.lineWidth = 1.6 / clamp(S.view.k, 0.5, 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }

    function labelTextOf(n) {
      if (n._label === undefined) {
        var t = n.title || '';
        if (t.length > 17) t = t.slice(0, 16) + '…';
        n._label = t;
      }
      return n._label;
    }

    function labelWidth(ctx2, txt) {
      var cache = S.labelWidths;
      if (!cache) { cache = S.labelWidths = Object.create(null); }
      var w = cache[txt];
      if (w === undefined) {
        try { w = ctx2.measureText(txt).width; } catch (e) { w = txt.length * 6; }
        if (!isFinite(w) || w <= 0) w = txt.length * 6;
        cache[txt] = w;
      }
      return w;
    }

    /** 标签：放大时淡入（像 Obsidian），并做一次轻量遮挡剔除，避免糊成一团
     *  字号：屏幕上恒定 10.5–13.5px（世界字号 = 屏幕字号 / k），
     *  否则默认 fit（k≈1.5–2.4）下标签会有 28px 那么大，糊满画布。 */
    function drawLabels(focus) {
      var k = S.view.k;
      var base = clamp((k - 0.62) / 0.25, 0, 1);
      if (base <= 0.02) base = 0;
      var fs = labelFontScreen(k) / (k || 1);
      var gap = 3.5 / (k || 1);
      var fontKey = fs.toFixed(2) + '|' + S.theme.font;
      if (S.labelKey !== fontKey) { S.labelKey = fontKey; S.labelWidths = Object.create(null); }

      var i, n;
      var forced = [];
      var auto = [];
      for (i = 0; i < S.nodes.length; i++) {
        n = S.nodes[i];
        if (n.active === false) continue;
        if (i === S.hover || i === S.selected || (focus && focus.set[i]) || (S.matchSet && S.matchSet[i])) forced.push(i);
        else if (base > 0) auto.push(i);
      }
      if (!forced.length && !auto.length) return;

      ctx.font = '600 ' + fs + 'px ' + S.theme.font;
      if (!ctx.font || ctx.font.indexOf(fs + 'px') < 0) ctx.font = '600 ' + fs + 'px sans-serif'; // 字体栈异常时兜底
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.lineJoin = 'round';

      var rects = [];
      var draw = function (idx, alpha) {
        n = S.nodes[idx];
        var txt = labelTextOf(n);
        var w = labelWidth(ctx, txt);
        var y = n.y + screenRadius(n.r || 3, k) + gap;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 3.2 / (k || 1);
        ctx.strokeStyle = rgba(S.theme.bg, 0.92);
        ctx.strokeText(txt, n.x, y);
        ctx.fillStyle = rgba(S.theme.fg, 0.92);
        ctx.fillText(txt, n.x, y);
        ctx.globalAlpha = 1;
        return { x0: n.x - w / 2 - 1, x1: n.x + w / 2 + 1, y0: y - 1, y1: y + fs + 1 };
      };

      for (i = 0; i < forced.length; i++) rects.push(draw(forced[i], 1));

      if (auto.length) {
        var order = S.labelOrder && S.labelOrder.length ? S.labelOrder : null;
        var list = auto;
        if (order) {
          var autoSet = Object.create(null);
          for (i = 0; i < auto.length; i++) autoSet[auto[i]] = 1;
          list = [];
          for (i = 0; i < order.length; i++) { if (autoSet[order[i]]) list.push(order[i]); }
        }
        for (i = 0; i < list.length; i++) {
          n = S.nodes[list[i]];
          var txt = labelTextOf(n);
          var w = labelWidth(ctx, txt);
          var y = n.y + screenRadius(n.r || 3, k) + gap;
          var r = { x0: n.x - w / 2 - 1, x1: n.x + w / 2 + 1, y0: y - 1, y1: y + fs + 1 };
          var hit = false;
          for (var q = 0; q < rects.length; q++) {
            var o = rects[q];
            if (r.x0 < o.x1 && r.x1 > o.x0 && r.y0 < o.y1 && r.y1 > o.y0) { hit = true; break; }
          }
          if (hit) continue;                        // 与已绘制的标签重叠 → 让位
          rects.push(draw(list[i], base * (focus && !focus.set[list[i]] ? 0.35 : 1)));
        }
      }
    }

    function render() {
      if (!S.width || !S.height || !S.theme) return; // 数据/主题未就绪时静默跳过
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      ctx.clearRect(0, 0, S.width, S.height);
      drawBackground();
      var focus = focusInfo();
      ctx.save();
      ctx.translate(S.view.x, S.view.y);
      ctx.scale(S.view.k, S.view.k);
      drawEdges(focus);
      drawNodes(focus);
      drawLabels(focus);
      ctx.restore();
    }

    function requestRender() {
      if (S.rafId) return;
      S.rafId = window.requestAnimationFrame(frame);
    }

    function frame() {
      S.rafId = 0;
      if (S.alpha > PHYSICS.alphaMin) runStep(S.nodes, S.edges, S, PHYSICS);
      render();
      if (S.alpha > PHYSICS.alphaMin) requestRender(); // 静止后不再调度 → 0 空转
    }

    /**
     * 自动适配视图（fit）。
     *  · maxK 上限 1.15：本站只有 30–40 个节点，不设上限时 fit 会把 k 顶到 2.4，
     *    节点与标签被放大到糊满画布（用户截图原话「太大」）。上限让图平铺开。
     *  · labelPad：标签画在节点下方，适配时要把这段高度留出来，否则底部标签被卡片裁掉。
     */
    function fitGraph(extra) {
      var opts = { padding: 56, maxK: 2.4, labelPad: labelFontScreen(1) + 16 };
      if (extra) { for (var kk in extra) { if (Object.prototype.hasOwnProperty.call(extra, kk)) opts[kk] = extra[kk]; } }
      return fitView(S.nodes, S.width, S.height, opts);
    }

    function heat(level, interactive) {
      S.alpha = Math.max(S.alpha, level === undefined ? 0.28 : level);
      // 降级（prefers-reduced-motion）：**只**用于开场的自动布局 —— 用户自己发起的
      // 拖动/筛选/重新布局永远播动画，否则手感就是「节点纹丝不动、没有物理效果」
      // （用户反馈原话）。降级时也要让 alpha 走完，拖完能自然回落。
      if (REDUCED && !interactive) {
        settle(S.nodes, S.edges, S, 260, PHYSICS);
        render();
        return;
      }
      requestRender();
    }

    /* ---------------- 过滤 ---------------- */

    function applyFilters(reheat) {
      var i, n, ed;
      var activeCats = S.activeCats, activeTags = S.activeTags;
      var anyCat = false, anyTag = false, key;
      for (key in activeCats) { if (activeCats[key]) { anyCat = true; break; } }
      for (key in activeTags) { if (activeTags[key]) { anyTag = true; break; } }

      var visibleNodes = 0, visibleEdges = 0;
      for (i = 0; i < S.nodes.length; i++) {
        n = S.nodes[i];
        var ok = true;
        if (anyCat && !activeCats[n.category]) ok = false;
        if (ok && anyTag) {
          ok = false;
          for (var t = 0; t < n.tags.length; t++) { if (activeTags[n.tags[t]]) { ok = true; break; } }
        }
        if (ok && !S.showIsolated && n.degree === 0) ok = false;
        if (ok && S.minDegree > 0 && n.degree < S.minDegree) ok = false;
        n.active = ok;
        if (ok) visibleNodes++;
      }
      for (i = 0; i < S.edges.length; i++) {
        ed = S.edges[i];
        var a = S.nodes[ed.si], b = S.nodes[ed.ti];
        ed.active = !!(a && b && a.active && b.active);
        if (ed.active) visibleEdges++;
      }
      S.counts.nodes = visibleNodes;
      S.counts.edges = visibleEdges;
      renderCounts();
      if (reheat !== false) heat(0.34, true);   // 筛选是用户操作 → 一定播动画
      else render();
    }

    function renderCounts() {
      if (!countsEl) return;
      countsEl.textContent = '可见 ' + S.counts.nodes + ' / ' + S.counts.totalNodes + ' 个节点 · ' +
        S.counts.edges + ' / ' + S.counts.totalEdges + ' 条连线';
    }

    /* ---------------- 控件 ---------------- */

    var countsEl = null, detailEl = null, searchInput = null;

    function buildDetail(host) {
      var box = el('section', 'graph-detail');
      box.hidden = true;
      var title = el('h3', 'graph-detail-title');
      var meta = el('div', 'graph-detail-meta');
      var cat = el('span', 'chip');
      var tags = el('div', 'graph-detail-tags chip-row');
      var stats = el('p', 'graph-detail-stats');
      var actions = el('div', 'graph-detail-actions');
      var open = el('a', 'btn btn-primary', '打开文档');
      open.setAttribute('rel', 'noopener');
      var center = el('button', 'btn btn-ghost', '以此为中心');
      center.type = 'button';
      actions.appendChild(open);
      actions.appendChild(center);
      meta.appendChild(cat);
      box.appendChild(title);
      box.appendChild(meta);
      box.appendChild(tags);
      box.appendChild(stats);
      box.appendChild(actions);
      host.appendChild(box);

      S.detail = {
        box: box, title: title, cat: cat, tags: tags, stats: stats, open: open, center: center
      };

      center.addEventListener('click', function () {
        if (S.selected < 0) return;
        centerOn(S.selected, true);
      });
    }

    function showDetail(idx) {
      S.selected = idx;
      var d = S.detail;
      if (!d) return;
      var n = S.nodes[idx];
      if (!n) { d.box.hidden = true; return; }
      d.box.hidden = false;
      d.title.textContent = n.title;
      d.cat.textContent = n.category;
      d.tags.textContent = '';
      if (n.tags.length) {
        for (var i = 0; i < n.tags.length && i < 12; i++) {
          d.tags.appendChild(el('span', 'tag-pill', n.tags[i]));
        }
        d.tags.hidden = false;
      } else {
        d.tags.hidden = true;
      }
      d.stats.textContent = '入链 ' + n.inDeg + ' · 出链 ' + n.outDeg + ' · 连线合计 ' + n.degree;
      d.open.href = docUrl(n.path);
      d.open.setAttribute('title', n.path || '');
      render();
    }

    function centerOn(idx, zoomIn) {
      var n = S.nodes[idx];
      if (!n) return;
      var k = S.view.k;
      if (zoomIn) k = clamp(Math.max(k, 1.25), 0.15, 4);
      S.view = { k: k, x: S.width / 2 - n.x * k, y: S.height / 2 - n.y * k };
      S.userTouched = true;
      render();
    }

    function buildControls(host) {
      if (!host) {
        countsEl = el('p', 'graph-count');
        countsEl.hidden = true;
        return;
      }
      host.textContent = '';
      var wrap = el('div', 'graph-controls-inner');

      // 标题
      wrap.appendChild(el('h2', 'graph-controls-title', '知识图谱'));
      wrap.appendChild(el('p', 'graph-controls-sub', '拖动 · 缩放 · 点击节点查看详情'));

      // 搜索
      var sBox = el('div', 'graph-field');
      sBox.appendChild(el('label', 'graph-label', '在图中搜索'));
      searchInput = el('input', 'search-field graph-search');
      searchInput.type = 'search';
      searchInput.placeholder = '标题 / 标签…';
      searchInput.setAttribute('aria-label', '在关系图中搜索节点');
      sBox.appendChild(searchInput);
      wrap.appendChild(sBox);

      // 分类
      var cBox = el('div', 'graph-field');
      cBox.appendChild(el('label', 'graph-label', '分类'));
      var cList = el('div', 'graph-checks');
      cBox.appendChild(cList);
      for (var i = 0; i < S.categories.length; i++) {
        (function (cat) {
          var id = 'graph-cat-' + i;
          var row = el('label', 'graph-check');
          var cb = el('input');
          cb.type = 'checkbox';
          cb.checked = true;
          cb.id = id;
          cb.addEventListener('change', function () {
            if (cb.checked) S.activeCats[cat] = true; else delete S.activeCats[cat];
            applyFilters(true);
          });
          var dot = el('span', 'graph-dot');
          dot.style.background = rgba(S.theme.cats[i % 6], 0.95);
          row.appendChild(cb);
          row.appendChild(dot);
          row.appendChild(el('span', 'graph-check-text', cat));
          cList.appendChild(row);
        })(S.categories[i]);
      }
      cBox.appendChild(el('p', 'graph-hint-line', '取消勾选可隐藏整类节点'));
      wrap.appendChild(cBox);

      // 标签
      var tBox = el('div', 'graph-field');
      tBox.appendChild(el('label', 'graph-label', '标签'));
      var tList = el('div', 'graph-tags');
      var topTags = S.allTags.slice(0, 18);
      for (var ti = 0; ti < topTags.length; ti++) {
        (function (tag) {
          var b = el('button', 'graph-tag', tag);
          b.type = 'button';
          b.setAttribute('aria-pressed', 'false');
          b.addEventListener('click', function () {
            if (S.activeTags[tag]) { delete S.activeTags[tag]; b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false'); }
            else { S.activeTags[tag] = true; b.classList.add('is-on'); b.setAttribute('aria-pressed', 'true'); }
            applyFilters(true);
          });
          tList.appendChild(b);
        })(topTags[ti]);
      }
      if (!topTags.length) tList.appendChild(el('p', 'graph-hint-line', '暂无标签数据'));
      tBox.appendChild(tList);
      wrap.appendChild(tBox);

      // 度阈值
      var dBox = el('div', 'graph-field');
      var dLabel = el('label', 'graph-label', '最小连接数');
      dLabel.setAttribute('for', 'graph-degree');
      dBox.appendChild(dLabel);
      var dRange = el('input', 'graph-range');
      dRange.type = 'range';
      dRange.id = 'graph-degree';
      dRange.min = '0';
      dRange.max = String(Math.max(1, S.maxDegree));
      dRange.step = '1';
      dRange.value = '0';
      var dOut = el('span', 'graph-range-out', 'degree ≥ 0');
      dRange.addEventListener('input', function () {
        S.minDegree = parseInt(dRange.value, 10) || 0;
        dOut.textContent = 'degree ≥ ' + S.minDegree;
        applyFilters(true);
      });
      dBox.appendChild(dRange);
      dBox.appendChild(dOut);
      wrap.appendChild(dBox);

      // 开关
      var swBox = el('div', 'graph-field graph-switches');
      function switchRow(label, init, onChange) {
        var row = el('label', 'graph-switch');
        var cb = el('input');
        cb.type = 'checkbox';
        cb.checked = !!init;
        cb.addEventListener('change', function () {
          onChange(cb.checked);
          render();
        });
        row.appendChild(cb);
        row.appendChild(el('span', null, label));
        swBox.appendChild(row);
        return cb;
      }
      switchRow('显示孤立节点', false, function (v) { S.showIsolated = v; applyFilters(true); });
      switchRow('显示箭头', true, function (v) { S.showArrows = v; });
      wrap.appendChild(swBox);

      // 按钮
      var btnRow = el('div', 'graph-buttons');
      var bReset = el('button', 'btn btn-ghost', '重置视图');
      bReset.type = 'button';
      bReset.addEventListener('click', function () {
        S.userTouched = false;
        S.selected = -1; S.hover = -1;
        if (S.detail) S.detail.box.hidden = true;
        S.view = fitGraph();
        render();
      });
      var bRelayout = el('button', 'btn btn-ghost', '重新布局');
      bRelayout.type = 'button';
      bRelayout.addEventListener('click', function () {
        initPositions(S.nodes, (Date.now() & 0x7fffffff) || 1);
        S.nodes.forEach(function (n) { n.vx = 0; n.vy = 0; n.pinned = false; });
        S.alpha = 1;
        // 「重新布局」是用户点的按钮 → 永远播动画（连 prefers-reduced-motion 也不该让它瞬间跳完）
        requestRender();
        window.setTimeout(function () {
          S.view = fitGraph();
          S.userTouched = false;
          render();
        }, 900);
      });
      btnRow.appendChild(bReset);
      btnRow.appendChild(bRelayout);
      wrap.appendChild(btnRow);

      // 计数
      countsEl = el('p', 'graph-count');
      countsEl.setAttribute('aria-live', 'polite');
      wrap.appendChild(countsEl);

      // 详情
      buildDetail(wrap);

      host.appendChild(wrap);

      if (searchInput) {
        var timer = 0;
        searchInput.addEventListener('input', function () {
          window.clearTimeout(timer);
          timer = window.setTimeout(function () { runNodeSearch(searchInput.value); }, 120);
        });
        searchInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            runNodeSearch(searchInput.value);
            if (S.matchList.length) centerOn(S.matchList[0], true);
          }
        });
      }
    }

    function runNodeSearch(q) {
      S.query = String(q || '').trim().toLowerCase();
      S.matchSet = null;
      S.matchList = [];
      if (S.query) {
        var set = Object.create(null);
        for (var i = 0; i < S.nodes.length; i++) {
          var n = S.nodes[i];
          if (n.active === false) continue;
          var hay = (n.title + ' ' + n.tags.join(' ') + ' ' + n.category).toLowerCase();
          if (hay.indexOf(S.query) >= 0) { set[i] = 1; S.matchList.push(i); }
        }
        S.matchSet = set;
        if (S.matchList.length) {
          centerOn(S.matchList[0], false);
          setToast('命中 ' + S.matchList.length + ' 个节点，已聚焦第 1 个');
        } else {
          setToast('没有匹配「' + q + '」的节点');
        }
      }
      render();
    }

    /* ---------------- 交互 ---------------- */

    function localPos(ev) {
      var r = canvas.getBoundingClientRect();
      return { x: ev.clientX - r.left, y: ev.clientY - r.top };
    }

    function onPointerDown(ev) {
      var p = localPos(ev);
      var w = screenToWorld(S.view, p.x, p.y);
      var idx = pickNode(S.nodes, w.x, w.y, S.view.k);
      canvas.setPointerCapture && canvas.setPointerCapture(ev.pointerId);
      if (idx >= 0) {
        S.drag = { mode: 'node', idx: idx, id: ev.pointerId, moved: 0, sx: p.x, sy: p.y };
        S.nodes[idx].pinned = true;
        S.nodes[idx].x = w.x; S.nodes[idx].y = w.y;
        S.clickCandidate = idx;
        heat(0.62, true);   // 抓住节点：给足 alpha，邻居才会被弹簧拉着动起来
      } else {
        S.drag = { mode: 'pan', id: ev.pointerId, moved: 0, sx: p.x, sy: p.y, vx: S.view.x, vy: S.view.y };
        S.clickCandidate = -1;
      }
      canvas.classList.add('is-grabbing');
      if (ev.preventDefault) ev.preventDefault();
    }

    function onPointerMove(ev) {
      var p = localPos(ev);
      if (S.drag && S.drag.id === ev.pointerId) {
        var dx = p.x - S.drag.sx, dy = p.y - S.drag.sy;
        S.drag.moved = Math.max(S.drag.moved, Math.abs(dx) + Math.abs(dy));
        if (S.drag.mode === 'pan') {
          S.view.x = S.drag.vx + dx;
          S.view.y = S.drag.vy + dy;
          S.userTouched = true;
          render();
        } else {
          var w = screenToWorld(S.view, p.x, p.y);
          var n = S.nodes[S.drag.idx];
          n.x = w.x; n.y = w.y;
          heat(0.62, true);   // 拖动全程持续供能，物理不衰减（否则拖到一半就「冻住」）
        }
        return;
      }
      var wpos = screenToWorld(S.view, p.x, p.y);
      var idx = pickNode(S.nodes, wpos.x, wpos.y, S.view.k);
      if (idx !== S.hover) {
        S.hover = idx;
        canvas.style.cursor = idx >= 0 ? 'pointer' : 'grab';
        render();
      }
    }

    function onPointerUp(ev) {
      canvas.classList.remove('is-grabbing');
      if (!S.drag || S.drag.id !== ev.pointerId) return;
      var wasNode = S.drag.mode === 'node';
      var idx = S.drag.idx;
      var moved = S.drag.moved;
      S.drag = null;
      if (wasNode && idx !== undefined) {
        S.nodes[idx].pinned = false;
        if (moved < 5) showDetail(idx);
        heat(0.5, true);    // 松手后让子图回弹收敛 —— 这段回弹就是「物理效果」
      }
      try { canvas.releasePointerCapture && ev.pointerId !== undefined && canvas.releasePointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
    }

    function onWheel(ev) {
      if (ev.preventDefault) ev.preventDefault();
      var p = localPos(ev);
      var delta = ev.deltaY;
      if (ev.deltaMode === 1) delta *= 16;
      else if (ev.deltaMode === 2) delta *= S.height;
      var factor = Math.exp(-clamp(delta, -240, 240) * 0.0016);
      S.view = zoomAt(S.view, p.x, p.y, factor, 0.2, 3);
      S.userTouched = true;
      render();
    }

    function onKeyDown(ev) {
      var step = 46;
      var handled = true;
      switch (ev.key) {
        case 'ArrowLeft': S.view.x += step; break;
        case 'ArrowRight': S.view.x -= step; break;
        case 'ArrowUp': S.view.y += step; break;
        case 'ArrowDown': S.view.y -= step; break;
        case '+': case '=': S.view = zoomAt(S.view, S.width / 2, S.height / 2, 1.2, 0.2, 3); break;
        case '-': case '_': S.view = zoomAt(S.view, S.width / 2, S.height / 2, 1 / 1.2, 0.2, 3); break;
        case '0': S.view = fitGraph(); S.userTouched = false; break;
        case 'Escape': S.selected = -1; if (S.detail) S.detail.box.hidden = true; break;
        default: handled = false;
      }
      if (handled) {
        ev.preventDefault();
        if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp' || ev.key === 'ArrowDown') S.userTouched = true;
        render();
      }
    }

    /* ---------------- 数据 ---------------- */

    function normalizeDocs(json) {
      if (!json) return [];
      if (Array.isArray(json)) return json;
      if (Array.isArray(json.docs)) return json.docs;
      return [];
    }

    function normalizeEdges(json) {
      if (!json) return [];
      if (Array.isArray(json)) return json;
      if (Array.isArray(json.edges)) return json.edges;
      if (Array.isArray(json.links)) return json.links;
      return [];
    }

    function normalizeTags(json) {
      if (!json) return [];
      var arr = Array.isArray(json) ? json : (Array.isArray(json.tags) ? json.tags : []);
      var out = [];
      for (var i = 0; i < arr.length; i++) {
        var t = arr[i];
        if (!t) continue;
        if (typeof t === 'string') out.push({ name: t, count: 0 });
        else if (t.name) out.push({ name: String(t.name), count: +t.count || 0 });
      }
      out.sort(function (a, b) { return (b.count || 0) - (a.count || 0); });
      return out;
    }

    function startGraph(docsRaw, edgesRaw, tagsRaw, manifest) {
      var g = buildGraph(normalizeDocs(docsRaw), normalizeEdges(edgesRaw));
      S.nodes = g.nodes;
      S.edges = g.edges;
      S.adj = g.adj;
      S.byId = g.byId;
      S.counts.totalNodes = S.nodes.length;
      S.counts.totalEdges = S.edges.length;

      // 分类：优先 manifest.categories，其次文档出现顺序
      var cats = [];
      if (manifest && Array.isArray(manifest.categories)) {
        for (var i = 0; i < manifest.categories.length; i++) {
          var c = String(manifest.categories[i] || '');
          if (c && cats.indexOf(c) < 0) cats.push(c);
        }
      }
      for (var j = 0; j < S.nodes.length; j++) {
        if (cats.indexOf(S.nodes[j].category) < 0) cats.push(S.nodes[j].category);
      }
      S.categories = cats;
      for (var m = 0; m < cats.length; m++) S.catIndex[cats[m]] = m;
      for (var q = 0; q < S.nodes.length; q++) {
        var ci = cats.indexOf(S.nodes[q].category);
        S.nodes[q].catIndex = ci < 0 ? 0 : ci;
        S.activeCats[S.nodes[q].category] = true;
      }

      // 标签
      var tagList = normalizeTags(tagsRaw);
      if (!tagList.length) {
        var seen = Object.create(null);
        for (var ti = 0; ti < S.nodes.length; ti++) {
          for (var tj = 0; tj < S.nodes[ti].tags.length; tj++) {
            var nm = S.nodes[ti].tags[tj];
            seen[nm] = (seen[nm] || 0) + 1;
          }
        }
        for (var key in seen) tagList.push({ name: key, count: seen[key] });
        tagList.sort(function (a, b) { return b.count - a.count; });
      }
      S.allTags = tagList.map(function (t) { return t.name; });

      // 半径 + 最大度数
      var maxDeg = 0;
      for (var d = 0; d < S.nodes.length; d++) maxDeg = Math.max(maxDeg, S.nodes[d].degree);
      S.maxDegree = maxDeg;
      for (var r = 0; r < S.nodes.length; r++) {
        S.nodes[r].r = degreeRadius(S.nodes[r].degree, maxDeg);
      }
      // 标签遮挡剔除的绘制顺序：大节点优先（预排序一次，避免每帧排序）
      S.labelOrder = S.nodes.map(function (_, i) { return i; }).sort(function (a, b) {
        return (S.nodes[b].r || 0) - (S.nodes[a].r || 0);
      });

      refreshTheme(true);
      resize();
      initPositions(S.nodes, 20240601);
      // ★ 顺序很关键：先按筛选条件落定 active 标记，再跑物理。
      //   被隐藏的节点（如默认关掉的孤立节点）不能参与力导向 —— 否则它们会把可见子图推向四周，
      //   自动适配视图时缩放被压到标签阈值以下，整个图既散又看不到标签。
      applyFilters(false);
      S.alpha = 1;
      settle(S.nodes, S.edges, S, PHYSICS.preSettleSteps, PHYSICS); // 首帧前同步收敛
      S.view = fitGraph();
      buildControls(controls);
      renderCounts();
      render();
      if (g.dropped) {
        try { console.warn('[graph] 丢弃了 ' + g.dropped + ' 条无效连线（未知 id / 自环）'); } catch (e) { /* ignore */ }
      }
    }

    function fail(msg) {
      app.textContent = '';
      var box = el('div', 'empty-state');
      box.appendChild(el('p', null, msg));
      var tip = el('p', 'graph-hint-line', '请通过本地 HTTP 服务打开（例如 python -m http.server），直接双击 file:// 打开时浏览器会拦截数据读取。');
      box.appendChild(tip);
      app.appendChild(box);
    }

    function ready() {
      if (loading.parentNode) loading.parentNode.removeChild(loading);
      if (canvas.parentNode !== app) {
        app.textContent = '';
        app.appendChild(canvas);
        app.appendChild(hint);
        app.appendChild(toast);
      }
    }

    // 事件绑定
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', function () {
      if (S.hover >= 0 && !S.drag) { S.hover = -1; render(); }
    });
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    canvas.addEventListener('dblclick', function (ev) {
      var p = localPos(ev);
      var w = screenToWorld(S.view, p.x, p.y);
      var idx = pickNode(S.nodes, w.x, w.y, S.view.k);
      if (idx >= 0) { S.view = zoomAt(S.view, S.width / 2, S.height / 2, 1.5, 0.2, 3); centerOn(idx, true); }
    });

    /**
     * 只读自检钩子：给无头浏览器验收用（.build/probe/verify_graph.mjs）。
     * 不暴露任何写操作，页面行为不受影响。
     */
    window.DSH_GRAPH_STATE = function () {
      return {
        k: S.view.k, alpha: S.alpha, settled: S.alpha <= PHYSICS.alphaMin,
        view: { k: S.view.k, x: S.view.x, y: S.view.y },
        width: S.width, height: S.height,
        nodes: S.nodes.length,
        active: S.counts.nodes, edges: S.counts.edges,
        dragging: !!(S.drag && S.drag.mode === 'node'),
        dragIdx: (S.drag && S.drag.mode === 'node') ? S.drag.idx : -1,
        reduced: REDUCED,
        labelScreenPx: labelFontScreen(S.view.k),
        maxNodeScreenPx: (function () {
          var m = 0;
          for (var i = 0; i < S.nodes.length; i++) {
            if (S.nodes[i].active === false) continue;
            var px = screenRadius(S.nodes[i].r || 3, S.view.k) * S.view.k;
            if (px > m) m = px;
          }
          return m;
        })(),
        positions: S.nodes.map(function (n) { return [Math.round(n.x * 10) / 10, Math.round(n.y * 10) / 10]; }),
      };
    };

    try {
      if (window.ResizeObserver) {
        var ro = new window.ResizeObserver(function () { resize(); render(); });
        ro.observe(app);
      } else {
        window.addEventListener('resize', function () { resize(); render(); });
      }
    } catch (e) { /* ignore */ }

    try {
      if (window.MutationObserver) {
        new window.MutationObserver(function () {
          if (refreshTheme(false)) { dotTile = null; render(); }
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
      }
    } catch (e) { /* ignore */ }

    // 数据加载：三份并行，任意一份失败都不影响其它两份
    var loads = [
      fetchJson('docs.json').catch(function () { return null; }),
      fetchJson('links.json').catch(function () { return null; }),
      fetchJson('tags.json').catch(function () { return null; }),
      fetchJson('manifest.json').catch(function () { return null; })
    ];
    Promise.all(loads).then(function (res) {
      var docs = res[0];
      if (!docs || !normalizeDocs(docs).length) {
        fail('暂时读不到文档数据（site-lib/data/docs.json）。');
        return;
      }
      ready();
      startGraph(docs, res[1], res[2], res[3]);
    }).catch(function (err) {
      fail('关系图初始化失败：' + ((err && err.message) || '未知错误'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootGraph);
  } else {
    bootGraph();
  }
})();
