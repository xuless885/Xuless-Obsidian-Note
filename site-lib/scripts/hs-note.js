/* 高中数学讲义页：两层标签筛选章节 */
(function () {
  var side = document.querySelector(".hs-side");
  if (!side) return;

  var tabs = side.querySelectorAll(".hs-tab[data-subject]");
  var chapLinks = side.querySelectorAll(".hs-chap[data-subject]");
  var folders = side.querySelectorAll(".hs-folder");

  function countFolders() {
    for (var f = 0; f < folders.length; f++) {
      var body = folders[f].nextElementSibling;
      var n = 0;
      if (body) n = body.querySelectorAll(".hs-chap[data-subject]:not([hidden])").length;
      var num = folders[f].querySelector(".hs-folder-n");
      if (num) num.textContent = String(n);
    }
  }

  function filterLinks(sub) {
    for (var l = 0; l < chapLinks.length; l++) {
      chapLinks[l].hidden = !!(sub && chapLinks[l].dataset.subject !== sub);
    }
    countFolders();
  }

  function showSubject(sub) {
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle("is-on", tabs[i].dataset.subject === sub);
    }
    filterLinks(sub);
  }

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      if (this.classList.contains("is-on")) {
        for (var t = 0; t < tabs.length; t++) tabs[t].classList.remove("is-on");
        filterLinks(null);
        return;
      }
      showSubject(this.dataset.subject);
    });
  }
  var active = side.querySelector(".hs-tab.is-on");
  if (active) showSubject(active.dataset.subject); else filterLinks(null);

  for (var k = 0; k < folders.length; k++) {
    folders[k].addEventListener("click", function () {
      var open = !this.classList.contains("is-open");
      this.classList.toggle("is-open", open);
      this.setAttribute("aria-expanded", String(open));
      var body = this.nextElementSibling;
      if (body && body.classList.contains("hs-folder-body")) body.hidden = !open;
    });
  }

  // 右侧目录：滚动时高亮当前节（支持简单列表与旧文档树形 TOC）
  var tocLinks = document.querySelectorAll(".hs-page .un-toc-link, .hs-page .hs-tree-toc .tree-item-self[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    for (var k = 0; k < tocLinks.length; k++) {
      var href = tocLinks[k].getAttribute("href") || "";
      if (href.charAt(0) !== "#") continue;
      var id = decodeURIComponent(href.slice(1));
      if (!map[id]) map[id] = tocLinks[k];
    }
    var heads = document.querySelectorAll(".hs-doc h2[id], .hs-doc h3[id], .hs-doc h4[id]");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var id in map) {
          map[id].classList.remove("is-active");
          map[id].classList.remove("is-on");
        }
        var l = map[en.target.id];
        if (l) {
          l.classList.add("is-active");
          l.classList.add("is-on");
        }
      });
    }, { rootMargin: "-84px 0px -70% 0px", threshold: 0 });
    for (var h = 0; h < heads.length; h++) obs.observe(heads[h]);
  }

  // 树形 TOC 折叠
  var tree = document.querySelector(".hs-tree-toc #outline");
  if (tree) {
    var icons = tree.querySelectorAll(".tree-item.mod-collapsible > .tree-item-self .collapse-icon");
    for (var c = 0; c < icons.length; c++) {
      icons[c].addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = this.closest(".tree-item");
        if (item) item.classList.toggle("is-collapsed");
      });
    }
    var all = tree.querySelector(".tree-collapse-all");
    if (all) all.addEventListener("click", function (e) {
      e.preventDefault();
      var items = tree.querySelectorAll(".tree-item.mod-collapsible");
      var collapse = !tree.classList.contains("is-all-collapsed");
      tree.classList.toggle("is-all-collapsed", collapse);
      for (var i = 0; i < items.length; i++) items[i].classList.toggle("is-collapsed", collapse);
    });
  }
})();
