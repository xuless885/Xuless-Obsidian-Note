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

  /**
   * 物理参数（世界坐标单位 ≈ CSS 像素 @k=1）。
   *
   * 2026-10-31：整套换成 **Obsidian Publish 图谱同构** 的 d3-force 模型 ——
   * 线上 help.obsidian.md 的关系图由一个 Worker 跑 /sim.js（d3-force 打包），
   * 参数取自该文件本身：向心 `forceX/forceY(0.1)`、连线 `forceLink(250)`（强度默认
   * `1/min(度数)`）、斥力 `forceManyBody(-1000, distanceMin 30)`、碰撞
   * `forceCollide(半径 60, strength 0.5)`、`velocityDecay 0.6`、
   * alpha 300 tick 从 1 降到 0.001。旧实现用「斥力 3050/d² + 硬分离 + 拖拽专用阻尼」
   * 去糊手感，结果邻居会来回掉头（实测 27–35%），越调越抖；这里直接回到同构模型。
   */
  var PHYSICS = {
    linkDistance: 250,     // 连线自然长度（d3 forceLink distance）
    linkStrength: 1,       // 乘 1/min(两端度数) —— d3 默认
    centerStrength: 0.1,   // forceX / forceY 强度
    repel: 1000,           // forceManyBody 强度（取正数，内部按排斥用）
    distanceMin: 30,       // forceManyBody distanceMin
    collideRadius: 60,     // forceCollide 半径（所有节点同一半径，Obsidian 即如此）
    collideStrength: 0.5,  // forceCollide strength
    velocityDecay: 0.6,    // 每 tick 速度保留比例（d3 velocityDecay = 1-0.4）
    alphaDecay: 1 - Math.pow(0.001, 1 / 300), // 300 tick 从 1 衰减到 0.001
    alphaMin: 0.001,       // 低于此值即静止 → 停止 rAF
    dragAlpha: 0.3,        // 拖拽时 alphaTarget（Obsidian 拖动时发 alpha:0.3 / alphaTarget:0.3）
    maxVelocity: 60,       // 单步位移安全阀（正常远达不到，只防初始位置极端时炸开）
    preSettleSteps: 420,   // 首帧前的同步预收敛步数（避免开场炸开；之后静止 0 CPU）
    // 兼容旧字段（外部测试/工具会读 PHYSICS.damping）
    damping: 0.6
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

    // 标记「互为反向」的边（A→B 与 B→A 同时存在）：画直线时各偏一点，避免两条完全重叠。
    // 数据里目前有 2 对；纯标记，不影响物理与度数。
    var hasRev = Object.create(null);
    for (i = 0; i < edges.length; i++) hasRev[edges[i].si + '>' + edges[i].ti] = 1;
    for (i = 0; i < edges.length; i++) {
      edges[i]._mutual = !!hasRev[edges[i].ti + '>' + edges[i].si];
    }

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
   * Obsidian 的节点屏幕尺寸走 `nodeScale = sqrt(1/scale)`（Publish app.js），
   * 即**屏幕半径 ∝ sqrt(k)**：放大时缓慢变大、缩小时缓慢变小，不会放大成大饼、
   * 也不会缩没。这里按同一规律换算回世界坐标（渲染是在 scale(k) 的上下文里画的）。
   */
  function screenRadius(worldR, k, minPx, maxPx) {
    var kk = Math.max(0.01, k || 1);
    var lo = (minPx === undefined) ? 1.8 : minPx;
    var hi = (maxPx === undefined) ? 24 : maxPx;
    return clamp((worldR || 3) * Math.sqrt(kk), lo, hi) / kk;
  }

  /** 标签字号：同 Obsidian，屏幕字号 ∝ sqrt(k)，锚在 fit 视角 ≈12.8px，两端夹住 */
  function labelFontScreen(k) {
    var kk = Math.max(0.01, k || 1);
    return clamp(12.8 * Math.sqrt(kk / 1.05), 9.5, 16);
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
   * 力导向「一步」更新（d3-force 语义：力直接作用在速度上，随后统一乘 velocityDecay 再积分）。
   *
   * 与 Obsidian Publish /sim.js 保持一致的四条力：
   *   1) many-body：strength -1000、distanceMin 30，力度 ∝ 1/d² × alpha
   *   2) link：distance 250，strength = 1/min(两端度数)（d3 默认；两端按度数平分修正）
   *   3) center：forceX / forceY，strength 0.1
   *   4) collide：半径 60、strength 0.5（不乘 alpha；采样位置含本帧速度，d3 同款）
   *
   * 被拖拽的节点（pinned）位置由交互层每帧写入，积分时速度清零、坐标不动。
   * 任何非有限值都会被就地修复，保证不产生 NaN/Infinity。
   * @returns {number} 本步最大速度（用于判断是否静止）
   */
  function simulateStep(nodes, edges, state, params) {
    var p = params || PHYSICS;
    var alpha = clamp(state && state.alpha, 0, 1);
    var n = (nodes && nodes.length) || 0;
    if (!n) return 0;
    var i, j, a, b, ed;

    // 只对可见节点积分；隐藏节点（筛选掉/孤立节点关闭）不参与物理
    var list = [];
    for (i = 0; i < n; i++) {
      a = nodes[i];
      if (a.active === false) continue;
      if (!isFinite(a.x)) a.x = 0;
      if (!isFinite(a.y)) a.y = 0;
      if (!isFinite(a.vx)) a.vx = 0;
      if (!isFinite(a.vy)) a.vy = 0;
      list.push(i);
    }
    var m = list.length;
    if (!m) return 0;

    // 可见子图的度数：决定连线的 strength 与两端修正比（d3 的默认 link strength）
    var deg = new Array(n);
    for (i = 0; i < n; i++) deg[i] = 0;
    var el = (edges && edges.length) || 0;
    for (i = 0; i < el; i++) {
      ed = edges[i];
      if (!ed || ed.active === false) continue;
      a = nodes[ed.si]; b = nodes[ed.ti];
      if (!a || !b || a.active === false || b.active === false) continue;
      deg[ed.si]++; deg[ed.ti]++;
    }

    // 1) many-body 斥力（精确 n²；42 个节点的量级下 Barnes-Hut 没有意义）
    var rep = p.repel * alpha;
    var minD2 = p.distanceMin * p.distanceMin;
    for (var ii = 0; ii < m; ii++) {
      i = list[ii]; a = nodes[i];
      for (var jj = ii + 1; jj < m; jj++) {
        j = list[jj]; b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d2 = dx * dx + dy * dy;
        if (!(d2 > 1e-6)) {                       // 完全重合 → 确定性微扰，避免 0 除法
          dx = ((i % 7) - 3) * 0.31 + 0.117;
          dy = ((j % 5) - 2) * 0.29 + 0.073;
          d2 = dx * dx + dy * dy;
        }
        if (d2 < minD2) d2 = minD2;               // distanceMin
        var f = rep / d2;
        a.vx += dx * f; a.vy += dy * f;
        b.vx -= dx * f; b.vy -= dy * f;
      }
    }

    // 2) 弹簧：端点用「位置 + 当前速度」算距离（d3-force v3 的做法，能压掉一部分振荡）
    for (i = 0; i < el; i++) {
      ed = edges[i];
      if (!ed || ed.active === false) continue;
      a = nodes[ed.si]; b = nodes[ed.ti];
      if (!a || !b || a.active === false || b.active === false) continue;
      var ldx = (b.x + b.vx) - (a.x + a.vx);
      var ldy = (b.y + b.vy) - (a.y + a.vy);
      var ld = Math.sqrt(ldx * ldx + ldy * ldy);
      if (!(ld > 1e-6)) { ldx = 0.31; ldy = 0.29; ld = Math.sqrt(ldx * ldx + ldy * ldy); }
      var da = deg[ed.si] || 1, db = deg[ed.ti] || 1;
      var strength = p.linkStrength / Math.min(da, db);
      var bias = da / (da + db);
      var lf = ((ld - p.linkDistance) / ld) * alpha * strength;
      var fx = ldx * lf, fy = ldy * lf;
      a.vx += fx * (1 - bias); a.vy += fy * (1 - bias);
      b.vx -= fx * bias;       b.vy -= fy * bias;
    }

    // 3) 向心力（forceX / forceY）
    for (ii = 0; ii < m; ii++) {
      a = nodes[list[ii]];
      a.vx += (0 - a.x) * p.centerStrength * alpha;
      a.vy += (0 - a.y) * p.centerStrength * alpha;
    }

    // 4) 碰撞（d3 同款：不乘 alpha；采样位置带本帧速度；等半径时先算的一方拿全量、
    //    另一方按 r²/(r²+r²) 拿一半 —— 照抄 d3-force 的非对称分配）
    var rr = p.collideRadius * 2;
    var rr2 = rr * rr;
    for (ii = 0; ii < m; ii++) {
      i = list[ii]; a = nodes[i];
      for (jj = ii + 1; jj < m; jj++) {
        j = list[jj]; b = nodes[j];
        var cdx = (a.x + a.vx) - (b.x + b.vx);
        var cdy = (a.y + a.vy) - (b.y + b.vy);
        var cd2 = cdx * cdx + cdy * cdy;
        if (!(cd2 < rr2)) continue;
        if (!(cd2 > 1e-6)) { cdx = ((i % 7) - 3) * 0.31 + 0.117; cdy = ((j % 5) - 2) * 0.29 + 0.073; cd2 = cdx * cdx + cdy * cdy; }
        var cd = Math.sqrt(cd2);
        var cf = ((rr - cd) / cd) * p.collideStrength;
        a.vx += cdx * cf; a.vy += cdy * cf;
        b.vx -= cdx * cf * 0.5; b.vy -= cdy * cf * 0.5;
      }
    }

    // 5) 积分：钉住的节点（正在拖拽）不参与；其余乘 velocityDecay 后位移
    var maxSpeed = 0;
    for (ii = 0; ii < m; ii++) {
      a = nodes[list[ii]];
      if (a.pinned) { a.vx = 0; a.vy = 0; continue; }
      var vx = a.vx, vy = a.vy;
      var sp2 = vx * vx + vy * vy;
      if (!isFinite(sp2)) { vx = 0; vy = 0; sp2 = 0; }
      var sp = Math.sqrt(sp2);
      if (sp > p.maxVelocity) { var s = p.maxVelocity / sp; vx *= s; vy *= s; sp = p.maxVelocity; }
      vx *= p.velocityDecay; vy *= p.velocityDecay;
      a.vx = vx; a.vy = vy;
      a.x += vx; a.y += vy;
      if (!isFinite(a.x) || !isFinite(a.y)) { a.x = 0; a.y = 0; a.vx = 0; a.vy = 0; sp = 0; }
      if (sp > maxSpeed) maxSpeed = sp;
    }
    return maxSpeed;
  }

  /** 一步 + alpha 衰减 + 静止判定（d3：alpha += (alphaTarget - alpha) * alphaDecay） */
  function runStep(nodes, edges, state, params) {
    var p = params || PHYSICS;
    var maxSpeed = simulateStep(nodes, edges, state, p);
    var target = (state && typeof state.alphaTarget === 'number' && isFinite(state.alphaTarget)) ? state.alphaTarget : 0;
    state.alpha = clamp(clamp(state.alpha, 0, 1) + (target - clamp(state.alpha, 0, 1)) * p.alphaDecay, 0, 1);
    state.maxSpeed = maxSpeed;
    state.settled = state.alpha < p.alphaMin;
    return state;
  }

  /** 同步跑满 steps 步（用于首帧预收敛 / prefers-reduced-motion 直接跳到稳态） */
  function settle(nodes, edges, state, steps, params) {
    var p = params || PHYSICS;
    var total = Math.max(0, steps | 0);
    state = state || { alpha: 1 };
    state.alphaTarget = 0;
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
      // 命中半径跟「画出来的」节点一致（随 sqrt(k) 缩放的屏幕半径换算回世界坐标）
      var rr = screenRadius(a.r || 3, k || 1) + pad;
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

    /* 悬浮控制窗的开关（全屏图谱）：面板默认展开，状态记在 localStorage。
       面板收起时点节点仍要能看到详情 → 见 showDetail() 里的 ensurePanelOpen()。 */
    var page = document.getElementById('graph-page') || app.parentElement;
    var PANEL_KEY = 'dsh-graph-panel';
    function panelOpen() {
      return !(page && page.classList.contains('is-panel-hidden'));
    }
    function setPanel(open, persist) {
      if (!page) return;
      page.classList.toggle('is-panel-hidden', !open);
      var btn = document.getElementById('graph-panel-toggle');
      if (btn) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('title', open ? '收起设置' : '展开设置');
        var txt = btn.querySelector('.graph-panel-toggle-text');
        if (txt) txt.textContent = open ? '收起' : '设置';
      }
      if (controls) controls.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (persist) { try { localStorage.setItem(PANEL_KEY, open ? '1' : '0'); } catch (e) { /* 隐私模式忽略 */ } }
    }
    function ensurePanelOpen() { if (!panelOpen()) setPanel(true, true); }
    try { setPanel(localStorage.getItem(PANEL_KEY) !== '0', false); } catch (e) { setPanel(true, false); }
    var panelBtn = document.getElementById('graph-panel-toggle');
    if (panelBtn) {
      panelBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setPanel(!panelOpen(), true);
      });
    }

    /* ---- 动画小工具：开场进度 + 视图缓动 ----------------------------------
       1) introT()：首帧起 620ms 内让节点淡入 + 轻微放大（比“啪一下全出现”自然）；
       2) animateViewTo()：重置视图 / 双击缩放 / 键盘 0 都用缓动过渡，
          而不是瞬间跳变；缓动跑完就不再要帧（静止仍 0 CPU）。 */
    function nowMs() {
      return (window.performance && window.performance.now) ? window.performance.now() : Date.now();
    }
    var INTRO_MS = 620;
    var viewAnim = null;
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function introT() {
      if (!S.introStart || REDUCED) return 1;   // 降级偏好：跳过装饰性开场（交互动画不受影响）
      var t = (nowMs() - S.introStart) / INTRO_MS;
      return t >= 1 ? 1 : (t <= 0 ? 0 : easeOutCubic(t));
    }
    function animateViewTo(target, ms) {
      if (!target) return;
      S.zoom = null;                            // 视图缓动接管时取消滚轮缩放
      viewAnim = { from: { k: S.view.k, x: S.view.x, y: S.view.y },
                   to: { k: target.k, x: target.x, y: target.y },
                   t0: nowMs(), dur: ms || 420 };
      requestRender();
    }
    function stepViewAnim() {
      if (!viewAnim) return false;
      var t = (nowMs() - viewAnim.t0) / viewAnim.dur;
      var to = viewAnim.to, from = viewAnim.from;
      if (!(t < 1)) {
        S.view = { k: to.k, x: to.x, y: to.y };
        viewAnim = null;
        return false;
      }
      var e = easeOutCubic(t);
      S.view = { k: from.k + (to.k - from.k) * e,
                 x: from.x + (to.x - from.x) * e,
                 y: from.y + (to.y - from.y) * e };
      return true;
    }

    /**
     * 滚轮缩放缓动：Obsidian 的 updateZoom() 是**逐帧**把当前缩放逼近目标
     * （`scale = scale*.85 + target*.15`），不是每个 wheel 事件直接跳到位。
     * 我们沿用同一比例：每帧走剩余差的 15%，锚点（光标）下的世界坐标保持不动，
     * 所以连续滚轮是「顺滑推近/拉远」，而不是一格一跳。
     */
    var ZOOM_EASE = 0.15;
    function stepZoom() {
      var z = S.zoom;
      if (!z) return false;
      var k0 = S.view.k || 1;
      var k1 = z.k;
      if (Math.abs(k1 - k0) <= Math.max(0.0005, k0 * 0.0015)) {
        S.zoom = null;
        return false;
      }
      var nk = k0 + (k1 - k0) * ZOOM_EASE;
      var f = nk / k0;
      S.view = { k: nk,
                 x: z.ax - (z.ax - S.view.x) * f,
                 y: z.ay - (z.ay - S.view.y) * f };
      return true;
    }

    /**
     * 「重新布局」的补间：新布局先在后台同步算好（settle），再把节点从旧坐标
     * 缓动到新坐标。这样既能看见「图在重排」，又绝不会出现 alpha=1 起步时的爆炸位移。
     */
    function stepMorph() {
      var m = S.morph;
      if (!m) return false;
      var t = (nowMs() - m.t0) / m.dur;
      if (!(t < 1)) {
        for (var j = 0; j < S.nodes.length; j++) {
          if (m.to[j]) { S.nodes[j].x = m.to[j][0]; S.nodes[j].y = m.to[j][1]; }
          S.nodes[j].vx = 0; S.nodes[j].vy = 0;
        }
        S.morph = null;
        return false;
      }
      var t0 = Math.max(0, Math.min(1, t));
      var e = t0 * t0 * (3 - 2 * t0);   // smoothstep：起止速度都是 0，重排不「猛地一窜」
      for (var i = 0; i < S.nodes.length; i++) {
        var from = m.from[i], to = m.to[i];
        if (!from || !to) continue;
        S.nodes[i].x = from[0] + (to[0] - from[0]) * e;
        S.nodes[i].y = from[1] + (to[1] - from[1]) * e;
        S.nodes[i].vx = 0; S.nodes[i].vy = 0;
      }
      return true;
    }

    var canvas = el('canvas', 'graph-canvas');
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('role', 'application');
    canvas.setAttribute('aria-label', '文档关系图：方向键平移，+/- 缩放，Tab 聚焦后可用键盘操作');
    app.textContent = '';
    app.appendChild(canvas);
    var hint = el('div', 'graph-hint', '滚轮缩放 · 拖动平移 · 拖节点调整 · 单击看详情 · 双击进入文档');
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
      alpha: 0, alphaTarget: 0, settled: true, rafId: 0,
      zoom: null,                 // 滚轮缩放的缓动目标 { k, ax, ay }
      morph: null,                // 「重新布局」：旧坐标 → 新坐标的补间
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

    /** 焦点外节点的目标亮度（配合每节点缓动 _a 使用；Obsidian 的 Vo = 0.2） */
    var FOCUS_DIM = 0.2;

    function edgeAlpha(focus, si, ti) {
      var ambient = clamp(0.18 + 0.42 * S.view.k, 0.14, 0.62);
      if (!focus) return ambient;
      // 用两端节点**缓动后的**亮度做插值 → 悬停/取消悬停时连线淡入淡出，而不是瞬间跳变
      var f = 0.5 * (focusRatio(si) + focusRatio(ti));
      var focused;
      if (si === focus.idx || ti === focus.idx) focused = 0.85;
      else if (focus.set[si] && focus.set[ti]) focused = 0.45;
      else focused = 0.05;
      return ambient + (focused - ambient) * f;
    }

    /** 节点「在焦点里的程度」0..1（由缓动后的 _a 归一化而来），供连线与标签共用 */
    function focusRatio(i) {
      var n = S.nodes[i];
      var a = (n && n._a !== undefined) ? n._a : 1;
      return clamp((a - FOCUS_DIM) / (1 - FOCUS_DIM), 0, 1);
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

    /**
     * 边的几何：全部走**直线**（2026-10-16 按用户要求把弧线改成直箭头）。
     * 唯一例外是「互为反向」的两条边（A→B 与 B→A 同时存在，本站有 2 对）：
     * 各往法线方向偏 1.7 世界像素，避免两条线完全重叠 —— 仍然是直线。
     */
    function edgeGeom(a, b, off) {
      var dx = b.x - a.x, dy = b.y - a.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (!(d > 1e-6)) d = 1e-6;
      var nx = -dy / d, ny = dx / d;
      var o = off || 0;
      var x1 = a.x + nx * o, y1 = a.y + ny * o;
      var x2 = b.x + nx * o, y2 = b.y + ny * o;
      return { x1: x1, y1: y1, x2: x2, y2: y2, ux: (x2 - x1) / d, uy: (y2 - y1) / d };
    }

    function edgeOffsetOf(ed) {
      if (!ed || !ed._mutual) return 0;
      return (ed.si < ed.ti ? 1 : -1) * 1.7;
    }

    /** 直线箭头：三角形尖端贴在**画出来的**节点圆边上（不是物理半径上） */
    function drawArrowGeo(g, b, color, alpha) {
      var rr = screenRadius(b.r || 3, S.view.k) + 1.2;
      var ex = g.x2 - g.ux * rr;
      var ey = g.y2 - g.uy * rr;
      var size = 5.0;
      ctx.fillStyle = rgba(color, alpha);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - g.ux * size - g.uy * size * 0.48, ey - g.uy * size + g.ux * size * 0.48);
      ctx.lineTo(ex - g.ux * size + g.uy * size * 0.48, ey - g.uy * size - g.ux * size * 0.48);
      ctx.closePath();
      ctx.fill();
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
      ex = b.x - ux * (screenRadius(b.r || 3, S.view.k) + 1.2);
      ey = b.y - uy * (screenRadius(b.r || 3, S.view.k) + 1.2);
      var size = 5.0;
      ctx.fillStyle = rgba(color, alpha);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - ux * size - uy * size * 0.48, ey - uy * size + ux * size * 0.48);
      ctx.lineTo(ex - ux * size + uy * size * 0.48, ey - uy * size - ux * size * 0.48);
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
        // 无高亮 → 批量成两条路径，减少 stroke 调用；连线一律直线（含互为反向的偏移）
        ctx.beginPath();
        for (i = 0; i < S.edges.length; i++) {
          ed = S.edges[i];
          if (ed.active === false || ed.kind === 'embed') continue;
          a = S.nodes[ed.si]; b = S.nodes[ed.ti];
          var g = edgeGeom(a, b, edgeOffsetOf(ed));
          ctx.moveTo(g.x1, g.y1);
          ctx.lineTo(g.x2, g.y2);
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
          var ge = edgeGeom(a, b, edgeOffsetOf(ed));
          ctx.moveTo(ge.x1, ge.y1); ctx.lineTo(ge.x2, ge.y2);
        }
        ctx.stroke();
        ctx.restore();
        if (arrowOn) {
          for (i = 0; i < S.edges.length; i++) {
            ed = S.edges[i];
            if (ed.active === false) continue;
            a = S.nodes[ed.si]; b = S.nodes[ed.ti];
            drawArrowGeo(edgeGeom(a, b, edgeOffsetOf(ed)), b, edgeColor, edgeAlpha(null));
          }
        }
        return;
      }

      // 有高亮：逐条画（直线），用主题色描边突出重点关系
      for (i = 0; i < S.edges.length; i++) {
        ed = S.edges[i];
        if (ed.active === false) continue;
        var al = edgeAlpha(focus, ed.si, ed.ti);
        a = S.nodes[ed.si]; b = S.nodes[ed.ti];
        var g1 = edgeGeom(a, b, edgeOffsetOf(ed));
        ctx.save();
        if (ed.kind === 'embed') ctx.setLineDash([3.5, 3.5]);
        ctx.strokeStyle = rgba(edgeColor, al);
        ctx.beginPath();
        ctx.moveTo(g1.x1, g1.y1);
        ctx.lineTo(g1.x2, g1.y2);
        ctx.stroke();
        ctx.restore();
        if (arrowOn && al > 0.2) drawArrowGeo(g1, b, edgeColor, al);
      }
    }

    function drawNodes(focus) {
      var i, n, r, col;
      var kk = S.view.k || 1;
      var intro = introT();                 // 开场 0→1（节点淡入 + 轻微放大）
      var animating = intro < 1;
      for (i = 0; i < S.nodes.length; i++) {
        n = S.nodes[i];
        if (n.active === false) continue;
        // 悬停/选中：半径与高亮环做 0.28 步长的缓动，不再瞬间跳变
        var wantT = (i === S.hover || i === S.selected) ? 1 : 0;
        if (n._t === undefined) n._t = wantT;
        else if (Math.abs(n._t - wantT) > 0.004) { n._t += (wantT - n._t) * 0.28; animating = true; }
        else n._t = wantT;
        // 亮度（焦点内外）也走缓动：光标移入/移出节点时，其余节点是淡出而不是闪一下
        var wantA = 1;
        if (focus) wantA = focus.set[i] ? 1 : FOCUS_DIM;
        else if (S.matchSet && !S.matchSet[i]) wantA = 0.3;
        if (n._a === undefined) n._a = wantA;
        else if (Math.abs(n._a - wantA) > 0.005) { n._a += (wantA - n._a) * 0.12; animating = true; } // Obsidian：每帧 10%（Ce 的 g5=.9）
        else n._a = wantA;
        r = screenRadius(n.r || 3, kk) * (1 + 0.16 * n._t) * (0.6 + 0.4 * intro);
        col = S.theme.cats[(n.catIndex || 0) % 6];
        var al = n._a * intro;

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

        // 选中 / 命中 / 悬停 的环（随 n._t 缓动淡入淡出）
        if (i === S.selected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 3.2, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(S.theme.accent, 0.95);
          ctx.lineWidth = 2 / clamp(S.view.k, 0.5, 2);
          ctx.stroke();
        } else if (S.matchSet && S.matchSet[i]) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2.6, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(S.theme.accent2, 0.9 * (0.4 + 0.6 * (n._t || 0)));
          ctx.lineWidth = 1.8 / clamp(S.view.k, 0.5, 2);
          ctx.stroke();
        } else if (i === S.hover) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2.6, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(S.theme.accent, 0.7 * (0.35 + 0.65 * (n._t || 0)));
          ctx.lineWidth = 1.6 / clamp(S.view.k, 0.5, 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      if (animating) requestRender();        // 缓动没走完就继续要帧；走完自然停（静止 0 CPU）
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
      // 缓存键必须带字号：标签屏幕字号随 k 变化（sqrt(k)），只按文本缓存会把
      // 放大后的宽度读成旧值 → 遮挡剔除算错、标签叠在一起。
      var key = (ctx2.font || '') + '|' + txt;
      var w = cache[key];
      if (w === undefined) {
        try { w = ctx2.measureText(txt).width; } catch (e) { w = txt.length * 6; }
        if (!isFinite(w) || w <= 0) w = txt.length * 6;
        cache[key] = w;
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
      var intro = introT();                 // 标签与节点一起淡入，避免开场“字先跳出来”
      if (intro <= 0.02) return;
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

      for (i = 0; i < forced.length; i++) rects.push(draw(forced[i], intro));

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
          rects.push(draw(list[i], base * intro * (0.35 + 0.65 * focusRatio(list[i]))));
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
      if (introT() < 1) requestRender();      // 开场动画未走完 → 继续要帧
    }

    function requestRender() {
      if (S.rafId) return;
      S.rafId = window.requestAnimationFrame(frame);
    }

    function frame() {
      S.rafId = 0;
      var morphing = stepMorph();
      if (!morphing && S.alpha > PHYSICS.alphaMin) runStep(S.nodes, S.edges, S, PHYSICS);
      var viewMoving = stepViewAnim();
      var zoomMoving = stepZoom();
      render();
      // 静止后不再调度 → 0 空转；只有物理还热、补间/视图/缩放缓动中、或开场未结束才继续
      if (morphing || S.alpha > PHYSICS.alphaMin || viewMoving || zoomMoving) requestRender();
    }

    /**
     * 自动适配视图（fit）。
     *  · maxK 上限 3.2：全屏画布（1600×940）下 35 个节点要铺满整屏需要 k≈3，
     *    而节点半径与标签字号都是「屏幕尺寸夹在区间内」的，放大不会糊（见 screenRadius /
     *    labelFontScreen）；上限只防「几个节点时被放到荒唐大小」。
     *  · labelPad：标签画在节点下方，适配时要把这段高度留出来，否则底部标签被卡片裁掉。
     */
    function fitGraph(extra) {
      var opts = { padding: 56, maxK: 3.2, labelPad: labelFontScreen(1) + 16 };
      if (extra) { for (var kk in extra) { if (Object.prototype.hasOwnProperty.call(extra, kk)) opts[kk] = extra[kk]; } }
      var v = fitView(S.nodes, S.width, S.height, opts);
      // 控制窗是**浮**在画布上的：把视图中心右移半个面板宽，图就不会被它压住
      // （面板收起时不做偏移；窄屏面板贴底，也不需要）
      if (controls && S.width > 700 && panelOpen()) {
        var pw = 0;
        try { pw = controls.getBoundingClientRect().width || 0; } catch (e) { pw = 0; }
        if (pw > 0) v.x += Math.round(pw / 2) + 8;
      }
      return v;
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
      ensurePanelOpen();          // 面板收起时点节点也要看得到「节点详情」
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
      if (zoomIn) k = clamp(Math.max(k, 1.25), 0.22, 3.5);
      S.userTouched = true;
      // 缓动过去（双击节点不再“瞬移”）
      animateViewTo({ k: k, x: S.width / 2 - n.x * k, y: S.height / 2 - n.y * k }, 380);
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
        animateViewTo(fitGraph(), 460);      // 缓动回位，不再瞬移
      });
      var bRelayout = el('button', 'btn btn-ghost', '重新布局');
      bRelayout.type = 'button';
      bRelayout.addEventListener('click', function () {
        // 在后台同步算好一份新布局（与首帧同一套预收敛），然后把节点从旧坐标
        // 缓动到新坐标：既能看见「图在重排」，又不会出现 alpha=1 起步时的爆炸位移。
        var old = S.nodes.map(function (n) { return [n.x, n.y]; });
        initPositions(S.nodes, (Date.now() & 0x7fffffff) || 1);
        S.nodes.forEach(function (n) { n.vx = 0; n.vy = 0; n.pinned = false; });
        S.alpha = 1; S.alphaTarget = 0;
        settle(S.nodes, S.edges, S, PHYSICS.preSettleSteps, PHYSICS);
        var to = S.nodes.map(function (n) { return [n.x, n.y]; });
        // 先按新坐标取一次最终视野，再把节点放回旧坐标开始补间
        S.nodes.forEach(function (n, i) { n.x = to[i][0]; n.y = to[i][1]; });
        var targetView = fitGraph();
        S.nodes.forEach(function (n, i) { n.x = old[i][0]; n.y = old[i][1]; });
        S.morph = { from: old, to: to, t0: nowMs(), dur: 650 };
        S.alpha = 0;
        S.userTouched = false;
        animateViewTo(targetView, 650);    // 视野与新布局同步收拢
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
      S.morph = null;             // 用户一动手就接管当前坐标
      if (idx >= 0) {
        S.drag = { mode: 'node', idx: idx, id: ev.pointerId, moved: 0, sx: p.x, sy: p.y };
        S.nodes[idx].pinned = true;
        S.nodes[idx].x = w.x; S.nodes[idx].y = w.y;
        S.nodes[idx].vx = 0; S.nodes[idx].vy = 0;
        S.clickCandidate = idx;
        // 与 Obsidian 的 dragNode 一致：钉住节点，并把物理重新加热到 alphaTarget 0.3
        // （它在 pointermove 里也是发 `{alpha: .3, alphaTarget: .3}`）。拖动期间 alpha
        // 稳定在 0.3，邻居被弹簧带着走；松手后 alphaTarget=0，让子图自然回落。
        S.alphaTarget = PHYSICS.dragAlpha;
        S.alpha = Math.max(S.alpha, PHYSICS.dragAlpha);
        requestRender();
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
          // 钉住节点 = 指针在哪它就在哪（Obsidian 也是 fx/fy 直接等于指针世界坐标）
          var w = screenToWorld(S.view, p.x, p.y);
          var n = S.nodes[S.drag.idx];
          n.x = w.x; n.y = w.y;
          n.vx = 0; n.vy = 0;
          requestRender();          // 物理在跑（alphaTarget=0.3），这个请求只是保证下一帧立刻画
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
        var nd = S.nodes[idx];
        nd.pinned = false;
        // **不甩**：Obsidian 松手只是把 fx/fy 清空、alphaTarget 归零，没有额外惯性。
        // 之前注入的「甩出速度」（最多 14px/帧）正是松手后飘/抖的来源。
        nd.vx = 0; nd.vy = 0;
        S.alphaTarget = 0;
        S.alpha = Math.max(S.alpha, PHYSICS.dragAlpha * 0.8); // 让子图回落有余温
        if (moved < 5) showDetail(idx);
        requestRender();
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
      // 目标值基于当前**缓动目标**（连续滚轮会累乘，不会互相覆盖成一次跳变）
      var baseK = S.zoom ? S.zoom.k : (S.view.k || 1);
      var targetK = Math.min(3.5, Math.max(0.22, baseK * factor));
      S.zoom = { k: targetK, ax: p.x, ay: p.y };
      S.userTouched = true;
      requestRender();
    }

    function onKeyDown(ev) {
      var step = 46;
      var handled = true;
      switch (ev.key) {
        case 'ArrowLeft': S.view.x += step; break;
        case 'ArrowRight': S.view.x -= step; break;
        case 'ArrowUp': S.view.y += step; break;
        case 'ArrowDown': S.view.y -= step; break;
        case '+': case '=': S.view = zoomAt(S.view, S.width / 2, S.height / 2, 1.2, 0.22, 3.5); break;
        case '-': case '_': S.view = zoomAt(S.view, S.width / 2, S.height / 2, 1 / 1.2, 0.22, 3.5); break;
        case '0': S.userTouched = false; animateViewTo(fitGraph(), 460); break;
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
      S.alphaTarget = 0;
      settle(S.nodes, S.edges, S, PHYSICS.preSettleSteps, PHYSICS); // 首帧前同步收敛
      S.view = fitGraph();
      S.zoom = null;
      S.introStart = nowMs();               // 开场淡入 + 轻微放大从这里计时
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
      if (idx < 0) return;
      var n = S.nodes[idx];
      var url = docUrl(n.path);
      if (url) window.location.href = url;      // 双击节点 = 进入该篇文档（用户 2026-10-16 要求）
    });

    /**
     * 只读自检钩子：给无头浏览器验收用（.build/probe/verify_graph.mjs）。
     * 不暴露任何写操作，页面行为不受影响。
     */
    window.DSH_GRAPH_STATE = function () {
      return {
        k: S.view.k, alpha: S.alpha, alphaTarget: S.alphaTarget, settled: S.alpha <= PHYSICS.alphaMin,
        view: { k: S.view.k, x: S.view.x, y: S.view.y },
        zooming: !!S.zoom, zoomTargetK: S.zoom ? S.zoom.k : S.view.k,
        width: S.width, height: S.height,
        nodes: S.nodes.length,
        active: S.counts.nodes, edges: S.counts.edges,
        dragging: !!(S.drag && S.drag.mode === 'node'),
        dragIdx: (S.drag && S.drag.mode === 'node') ? S.drag.idx : -1,
        reduced: REDUCED,
        // 焦点缓动状态（验收用：悬停时 min 应平滑下降，而不是一步到位）
        focusMin: (function () {
          var m = 1;
          for (var i = 0; i < S.nodes.length; i++) {
            var a = S.nodes[i]._a;
            if (typeof a === 'number' && a < m) m = a;
          }
          return Math.round(m * 1000) / 1000;
        })(),
        hover: S.hover,
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
        // 哪些节点当前可见（验收脚本算抖动时要跳过被过滤掉的节点）
        activeFlags: S.nodes.map(function (n) { return n.active === false ? 0 : 1; }),
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
