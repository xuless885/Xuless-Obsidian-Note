/*!
 * site.js — Xuless 数字花园 · 站点通用脚本
 * ---------------------------------------------------------------------------
 * 纯原生 JS，无依赖，无构建，defer 引入。承载：
 *   · window.DSH_ROOT 规范化，暴露 window.DSH 工具集（escapeHtml / docUrl / fetchJSON …）
 *   · 浅色/深色主题切换（localStorage["dsh-theme"] = "light" | "dark"）
 *   · 移动端导航开合
 *   · .reveal 滚动入场动效（IntersectionObserver）
 *   · 搜索快捷键（" / " 或 Ctrl/Cmd + K）
 *   · 相对时间格式化
 * 重要约束：79 个既有 Obsidian 导出页也会加载本脚本，页面上可能**没有**任何本脚本要操作的
 * 元素，因此每一段初始化都必须容错，绝不允许抛出未捕获异常。
 * 路径约束：站点部署在 GitHub Pages 项目站点（子路径），所有资源 URL 一律由
 * window.DSH_ROOT 前缀拼出，禁止出现 root-absolute 的 "/site-lib/..." 写法。
 */
(function () {
    "use strict";

    /* ======================================================================
       0. 环境与工具底座
       ====================================================================== */
    var DSH = (window.DSH = window.DSH || {});
    var THEME_KEY = "dsh-theme";
    /* 既有内容页（task-3 注入）沿用了旧站的 localStorage 键 "theme"：这里作为兼容读取，
       写入时两个键一起写，避免两套脚本互相覆盖。 */
    var THEME_KEY_LEGACY = "theme";
    var doc = document;
    /* 幂等标记：init* 函数可能被调用两次（defer 执行一次 + ready 回调一次），不得重复绑定事件 */
    var bound = {};

    function safe(fn, label) {
        try {
            return fn();
        } catch (err) {
            /* 单点失败不影响其它功能，也不要把错误抛到 window.onerror */
            if (window.console && console.warn) {
                console.warn("[site.js] " + (label || "init") + " 失败：", err);
            }
            return null;
        }
    }

    /* DSH_ROOT 规范化：去掉尾部斜杠；空串回落 "."。root 页填 "."，blog 页填 ".." */
    function normalizeRoot(value) {
        var v = typeof value === "string" ? value.trim() : "";
        if (!v || v === "/" || v === "./") {
            return ".";
        }
        v = v.replace(/\/+$/, "");
        return v === "" ? "." : v;
    }

    /* 从本脚本自身的 src 反推仓库根前缀。
       为什么必须这样：rendered 出来的内容页（hkdse-course/<栏目>/xxx.html）**不设**
       window.DSH_ROOT，而 normalizeRoot 会把空值回落成 "."；这些页面在两层目录下，
       正确的根前缀是 "../.."。回落成 "." 会让所有取数变成
       /hkdse-course/<栏目>/site-lib/... → 404，
       表现就是「反向链接/引用面板加载失败」「侧栏图谱缩略图不见」。
       外壳页（index.html 等）会在内联脚本里显式设置 DSH_ROOT，所以优先尊重它。 */
    function deriveRoot() {
        try {
            var list = document.querySelectorAll("script[src]");
            for (var i = 0; i < list.length; i++) {
                var raw = list[i].getAttribute("src") || "";
                if (raw.indexOf("site-lib/scripts/site.js") !== -1) {
                    var k = raw.indexOf("site-lib/");
                    if (k > 0) {
                        var pre = raw.slice(0, k).replace(/\/+$/, "");
                        return pre || ".";
                    }
                }
            }
        } catch (err) { /* ignore */ }
        return ".";
    }

    var explicit = (typeof window.DSH_ROOT === "string" && window.DSH_ROOT.trim() !== "")
        ? window.DSH_ROOT
        : deriveRoot();
    var ROOT = normalizeRoot(explicit);
    window.DSH_ROOT = ROOT;

    /* 逐段 encodeURIComponent，保留 "/"，与站点既有的中文文件名共存 */
    function encodePath(path) {
        return String(path == null ? "" : path)
            .split("/")
            .filter(function (seg) {
                return seg !== "";
            })
            .map(function (seg) {
                try {
                    return encodeURIComponent(seg);
                } catch (e) {
                    return seg;
                }
            })
            .join("/");
    }

    /* root 前缀 + 路径：root="." → "./x"；root=".." → "../x" */
    function rootUrl(path) {
        var p = String(path == null ? "" : path).replace(/^\/+/, "");
        if (!p) {
            return ROOT === "." ? "./" : ROOT + "/";
        }
        return ROOT + "/" + p;
    }

    /* 文档路径 → 站内可点 URL（编码每段、保留层级） */
    function docUrl(path) {
        return rootUrl(encodePath(path));
    }

    function escapeHtml(input) {
        if (input == null) {
            return "";
        }
        return String(input)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function escapeAttr(input) {
        return escapeHtml(input);
    }

    function toTime(value) {
        if (value == null || value === "") {
            return NaN;
        }
        if (typeof value === "number") {
            /* 兼容秒级时间戳 */
            return value < 1e12 ? value * 1000 : value;
        }
        if (value instanceof Date) {
            return value.getTime();
        }
        var s = String(value).trim();
        if (/^\d+$/.test(s)) {
            var n = Number(s);
            return n < 1e12 ? n * 1000 : n;
        }
        var parsed = Date.parse(s);
        return isNaN(parsed) ? NaN : parsed;
    }

    function pad2(n) {
        return (n < 10 ? "0" : "") + n;
    }

    function formatDate(value) {
        var t = toTime(value);
        if (isNaN(t)) {
            return "";
        }
        var d = new Date(t);
        return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
    }

    function formatDateTime(value) {
        var t = toTime(value);
        if (isNaN(t)) {
            return "";
        }
        var d = new Date(t);
        return formatDate(t) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes());
    }

    function relTime(value) {
        var t = toTime(value);
        if (isNaN(t)) {
            return "";
        }
        var diff = Date.now() - t;
        if (diff < 0) {
            return "刚刚";
        }
        var MIN = 60000,
            HOUR = 3600000,
            DAY = 86400000;
        if (diff < MIN) {
            return "刚刚";
        }
        if (diff < HOUR) {
            return Math.floor(diff / MIN) + " 分钟前";
        }
        if (diff < DAY) {
            return Math.floor(diff / HOUR) + " 小时前";
        }
        if (diff < DAY * 30) {
            return Math.floor(diff / DAY) + " 天前";
        }
        if (diff < DAY * 365) {
            return Math.floor(diff / (DAY * 30)) + " 个月前";
        }
        return formatDate(t);
    }

    function formatNumber(n) {
        var num = Number(n);
        if (!isFinite(num)) {
            return "0";
        }
        return num.toLocaleString("zh-CN");
    }

    /* URL 参数 */
    function getParam(name, fallback) {
        return safe(function () {
            var params = new URLSearchParams(window.location.search);
            var v = params.get(name);
            return v === null || v === "" ? (fallback === undefined ? "" : fallback) : v;
        }, "getParam") || (fallback === undefined ? "" : fallback);
    }

    /* 异步取 JSON：任何失败（404 / 解析错误 / 断网）都返回 null，不抛异常 */
    function fetchJSON(path) {
        var url = /^(https?:)?\/\//.test(path) ? path : rootUrl(path);
        if (typeof window.fetch !== "function") {
            return Promise.resolve(null);
        }
        return window
            .fetch(url, { credentials: "same-origin" })
            .then(function (res) {
                if (!res || !res.ok) {
                    return null;
                }
                return res.json().catch(function () {
                    return null;
                });
            })
            .catch(function () {
                return null;
            });
    }

    function ready(fn) {
        if (typeof fn !== "function") {
            return;
        }
        if (doc.readyState === "loading") {
            doc.addEventListener("DOMContentLoaded", function () {
                safe(fn, "ready");
            });
        } else {
            safe(fn, "ready");
        }
    }

    function qs(selector, scope) {
        return safe(function () {
            return (scope || doc).querySelector(selector);
        }, "qs");
    }

    function qsa(selector, scope) {
        return (
            safe(function () {
                return Array.prototype.slice.call((scope || doc).querySelectorAll(selector));
            }, "qsa") || []
        );
    }

    /* ======================================================================
       1. 主题（浅色 / 深色）
       ====================================================================== */
    var THEME_META = { light: "#f5f5f3", dark: "#101015" };

    function readStore(key) {
        return safe(function () {
            var v = window.localStorage.getItem(key);
            return v === "light" || v === "dark" ? v : null;
        }, "readStore:" + key);
    }

    function writeStore(key, value) {
        safe(function () {
            window.localStorage.setItem(key, value);
        }, "writeStore:" + key);
    }

    function storedTheme() {
        return readStore(THEME_KEY) || readStore(THEME_KEY_LEGACY);
    }

    function systemTheme() {
        return safe(function () {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return "dark";
            }
        }, "systemTheme") || "light";
    }

    function currentTheme() {
        return (
            safe(function () {
                var attr = doc.documentElement.getAttribute("data-theme");
                return attr === "light" || attr === "dark" ? attr : null;
            }, "currentTheme") ||
            storedTheme() ||
            systemTheme()
        );
    }

    /* 同时打到 html[data-theme] / html.theme-* 与 body.theme-*，三种钩子都可用 */
    function paintTheme(theme) {
        var t = theme === "dark" ? "dark" : "light";
        safe(function () {
            var html = doc.documentElement;
            html.setAttribute("data-theme", t);
            html.style.colorScheme = t;
            html.classList.toggle("theme-dark", t === "dark");
            html.classList.toggle("theme-light", t === "light");
        }, "paintTheme:html");
        safe(function () {
            var body = doc.body;
            if (!body) {
                return;
            }
            body.classList.toggle("theme-dark", t === "dark");
            body.classList.toggle("theme-light", t === "light");
        }, "paintTheme:body");
        safe(function () {
            var meta = doc.querySelector('meta[name="theme-color"]');
            if (meta) {
                meta.setAttribute("content", THEME_META[t]);
            }
        }, "paintTheme:meta");
        return t;
    }

    function syncThemeControls(theme) {
        var iconChar = theme === "dark" ? "☀" : "☾";
        qsa("[data-theme-toggle], .theme-toggle").forEach(function (btn) {
            safe(function () {
                btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
                btn.setAttribute(
                    "aria-label",
                    theme === "dark" ? "切换到浅色主题" : "切换到深色主题"
                );
                btn.setAttribute("title", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
                var icon = btn.querySelector("[data-theme-icon], .theme-toggle-icon");
                if (icon) {
                    icon.textContent = iconChar;
                } else if (btn.hasAttribute("data-dsh-theme-autofill")) {
                    /* 前面已经由本脚本补过图标（既有内容页的空按钮），直接更新 */
                    btn.textContent = iconChar;
                } else if (!btn.children.length && !String(btn.textContent || "").trim()) {
                    /* 既有内容页里的按钮是空的，补一个图标字符，避免出现一个没有内容的圆点 */
                    btn.setAttribute("data-dsh-theme-autofill", "1");
                    btn.textContent = iconChar;
                }
            }, "syncThemeControls");
        });
    }

    function setTheme(theme, persist) {
        var t = paintTheme(theme);
        if (persist !== false) {
            writeStore(THEME_KEY, t);
            writeStore(THEME_KEY_LEGACY, t);
        }
        syncThemeControls(t);
        return t;
    }

    function initTheme() {
        /* 幂等：重复调用只重新上色与同步控件，不会重复注册监听 */
        var t = paintTheme(currentTheme());
        syncThemeControls(t);

        if (!bound.themeToggle) {
            bound.themeToggle = true;
            /* 文档级委托：既容忍脚本早于 DOM 就绪执行，也支持之后才插入的按钮。
               若同页另有脚本已经处理过这次点击（约定：调用 preventDefault），这里不再重复切换。 */
            doc.addEventListener("click", function (ev) {
                if (ev.defaultPrevented) {
                    return;
                }
                var target = ev.target;
                var btn =
                    target && target.closest
                        ? target.closest("[data-theme-toggle], .theme-toggle")
                        : null;
                if (!btn) {
                    return;
                }
                ev.preventDefault();
                setTheme(currentTheme() === "dark" ? "light" : "dark", true);
            });
        }

        /* 用户没有手动选择时，跟随系统变化 */
        if (!bound.matchMedia) {
            bound.matchMedia = true;
            safe(function () {
                if (!window.matchMedia) {
                    return;
                }
                var mq = window.matchMedia("(prefers-color-scheme: dark)");
                var onChange = function () {
                    if (!storedTheme()) {
                        setTheme(mq.matches ? "dark" : "light", false);
                    }
                };
                if (typeof mq.addEventListener === "function") {
                    mq.addEventListener("change", onChange);
                } else if (typeof mq.addListener === "function") {
                    mq.addListener(onChange);
                }
            }, "initTheme:matchMedia");
        }
    }

    /* ======================================================================
       2. 移动端导航
       ====================================================================== */
    var NAV_TOGGLE_SEL = "[data-nav-toggle], .site-nav-burger, .nav-toggle";

    function initNav() {
        if (bound.nav) {
            return;
        }
        bound.nav = true;

        function closeAll() {
            qsa(".site-nav.is-open").forEach(function (nav) {
                nav.classList.remove("is-open");
            });
            qsa(NAV_TOGGLE_SEL).forEach(function (b) {
                b.setAttribute("aria-expanded", "false");
            });
        }

        qsa(NAV_TOGGLE_SEL).forEach(function (btn) {
            btn.setAttribute("aria-expanded", "false");
        });

        /* 文档级委托：与主题按钮同一套约定（已被别处 preventDefault 的点击不再重复处理） */
        doc.addEventListener("click", function (ev) {
            if (ev.defaultPrevented) {
                return;
            }
            var target = ev.target;
            if (!target || !target.closest) {
                return;
            }
            var btn = target.closest(NAV_TOGGLE_SEL);
            if (!btn) {
                return;
            }
            ev.preventDefault();
            var nav =
                btn.closest(".site-nav") ||
                btn.closest("[data-site-nav]") ||
                doc.querySelector(".site-nav");
            if (!nav) {
                return;
            }
            var willOpen = !nav.classList.contains("is-open");
            closeAll();
            if (willOpen) {
                nav.classList.add("is-open");
                btn.setAttribute("aria-expanded", "true");
            }
        });

        doc.addEventListener("keydown", function (ev) {
            if (ev.key === "Escape") {
                closeAll();
            }
        });

        doc.addEventListener("click", function (ev) {
            var target = ev.target;
            if (!target || !target.closest) {
                return;
            }
            if (target.closest(".site-nav")) {
                if (target.closest(".nav-link")) {
                    closeAll();
                }
                return;
            }
            closeAll();
        });
    }

    /* ======================================================================
       3. .reveal 滚动入场
       ====================================================================== */
    var revealObserver = null;

    function ensureRevealObserver() {
        if (revealObserver || typeof window.IntersectionObserver !== "function") {
            return revealObserver;
        }
        revealObserver = new window.IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        safe(function () {
                            revealObserver.unobserve(entry.target);
                        }, "reveal:unobserve");
                    }
                });
            },
            { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
        );
        return revealObserver;
    }

    function reveal(scope) {
        safe(function () {
            doc.documentElement.classList.add("js");
        }, "reveal:js-class");
        var nodes = qsa(".reveal:not(.is-visible)", scope || doc);
        if (!nodes.length) {
            return;
        }
        var observer = ensureRevealObserver();
        if (!observer) {
            /* 无 IntersectionObserver：直接全部显示，绝不留白 */
            nodes.forEach(function (n) {
                n.classList.add("is-visible");
            });
            return;
        }
        nodes.forEach(function (n, i) {
            if (!n.hasAttribute("data-delay")) {
                n.setAttribute("data-delay", String((i % 5) + 1));
            }
            observer.observe(n);
        });
    }

    function initReveal() {
        reveal(doc);
        /* 主题/数据异步渲染后可能新增节点，暴露 DSH.reveal 供其它脚本调用 */
    }

    /* ======================================================================
       4. 搜索快捷键（" / " 与 Ctrl/Cmd + K）
       ====================================================================== */
    function isTypingTarget(el) {
        if (!el || !el.tagName) {
            return false;
        }
        var tag = el.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") {
            return true;
        }
        return el.isContentEditable === true;
    }

    function focusSearchField() {
        var input =
            qs("[data-search-input]") ||
            qs(".search-field input") ||
            qs("#nav-search-input") ||
            qs('input[type="search"]');
        if (!input) {
            return false;
        }
        input.focus();
        safe(function () {
            if (typeof input.select === "function") {
                input.select();
            }
        }, "focusSearchField:select");
        return true;
    }

    function initSearchShortcut() {
        if (bound.searchKeys) {
            return;
        }
        bound.searchKeys = true;
        doc.addEventListener("keydown", function (ev) {
            if (ev.defaultPrevented || ev.altKey) {
                return;
            }
            var key = ev.key;
            var cmdK = (ev.ctrlKey || ev.metaKey) && (key === "k" || key === "K");
            var slash = key === "/" && !ev.ctrlKey && !ev.metaKey;
            if (!cmdK && !slash) {
                return;
            }
            if (isTypingTarget(ev.target)) {
                /* 在输入框里按 "/" 应正常输入；Ctrl+K 仍允许跳回搜索框 */
                if (!cmdK) {
                    return;
                }
            }
            safe(function () {
                if (focusSearchField()) {
                    ev.preventDefault();
                }
            }, "initSearchShortcut");
        });
    }

    /* ======================================================================
       5. 杂项：相对时间占位符自动填充
       ====================================================================== */
    function initTimeStamps() {
        var nodes = qsa("[data-rel-time]");
        if (!nodes.length) {
            return;
        }
        nodes.forEach(function (node) {
            safe(function () {
                var raw = node.getAttribute("data-rel-time");
                var text = relTime(raw);
                if (text) {
                    node.textContent = text;
                }
                var abs = formatDate(raw);
                if (abs && !node.getAttribute("title")) {
                    node.setAttribute("title", abs);
                }
            }, "initTimeStamps");
        });
    }

    /* ======================================================================
       6. 对外暴露
       ====================================================================== */
    DSH.root = ROOT;
    DSH.rootUrl = rootUrl;
    DSH.docUrl = docUrl;
    DSH.encodePath = encodePath;
    DSH.escapeHtml = escapeHtml;
    DSH.escapeAttr = escapeAttr;
    DSH.fetchJSON = fetchJSON;
    DSH.ready = ready;
    DSH.qs = qs;
    DSH.qsa = qsa;
    DSH.getParam = getParam;
    DSH.relTime = relTime;
    DSH.formatDate = formatDate;
    DSH.formatDateTime = formatDateTime;
    DSH.formatNumber = formatNumber;
    DSH.toTime = toTime;
    DSH.reveal = reveal;
    DSH.theme = {
        get: currentTheme,
        set: setTheme,
        toggle: function () {
            return setTheme(currentTheme() === "dark" ? "light" : "dark", true);
        },
        stored: storedTheme,
        system: systemTheme,
        KEY: THEME_KEY
    };

    /* ======================================================================
       7. 启动（每段独立容错；整页只初始化一次）
       ====================================================================== */
    safe(function () {
        doc.documentElement.classList.add("js");
    }, "boot:js-class");

    if (window.__DSH_SITE_BOOTED__) {
        /* 同一页面被重复引入 site.js：只做一次无副作用的主题同步，绝不重复绑定事件 */
        safe(function () {
            syncThemeControls(paintTheme(currentTheme()));
        }, "boot:already-booted");
        return;
    }
    window.__DSH_SITE_BOOTED__ = true;

    safe(initTheme, "initTheme");
    safe(initNav, "initNav");
    safe(initSearchShortcut, "initSearchShortcut");

    ready(function () {
        /* 上面几个 init 都是幂等的（见 bound 标记）：脚本若早于 DOM 就绪执行，
           这里补齐 body 级同步；已跑过则只重新上色，不会重复绑定事件。 */
        safe(initTheme, "initTheme:ready");
        safe(initNav, "initNav:ready");
        safe(initReveal, "initReveal");
        safe(initTimeStamps, "initTimeStamps");
    });
})();
