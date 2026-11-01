/* 高中数学讲义页：两层标签筛选章节 */
(function () {
  var side = document.querySelector(".hs-side");
  if (!side) return;

  var tabs = side.querySelectorAll(".hs-tab[data-subject]");
  function showSubject(sub) {
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("is-on", tabs[i].dataset.subject === sub);
    var groups = side.querySelectorAll(".hs-subject");
    for (var j = 0; j < groups.length; j++) groups[j].hidden = groups[j].dataset.subject !== sub;
  }
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      if (this.classList.contains("is-on")) {
        for (var t = 0; t < tabs.length; t++) tabs[t].classList.remove("is-on");
        var all = side.querySelectorAll(".hs-subject");
        for (var g = 0; g < all.length; g++) all[g].hidden = false;
        return;
      }
      showSubject(this.dataset.subject);
    });
  }
  var active = side.querySelector(".hs-tab.is-on");
  if (active) showSubject(active.dataset.subject);

  var folders = side.querySelectorAll(".hs-folder");
  for (var k = 0; k < folders.length; k++) {
    folders[k].addEventListener("click", function () {
      var open = !this.classList.contains("is-open");
      this.classList.toggle("is-open", open);
      this.setAttribute("aria-expanded", String(open));
      var body = this.nextElementSibling;
      if (body && body.classList.contains("hs-folder-body")) body.hidden = !open;
    });
  }

  // 右侧目录：滚动时高亮当前节（无 JS 也可用）
  var links = document.querySelectorAll(".hs-page .un-toc-link");
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    for (var k = 0; k < links.length; k++) {
      var href = links[k].getAttribute("href") || "";
      if (href.charAt(0) === "#") map[decodeURIComponent(href.slice(1))] = links[k];
    }
    var heads = document.querySelectorAll(".hs-doc h2[id], .hs-doc h3[id]");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var id in map) map[id].classList.remove("is-on");
        var l = map[en.target.id];
        if (l) l.classList.add("is-on");
      });
    }, { rootMargin: "-84px 0px -70% 0px", threshold: 0 });
    for (var h = 0; h < heads.length; h++) obs.observe(heads[h]);
  }
})();
