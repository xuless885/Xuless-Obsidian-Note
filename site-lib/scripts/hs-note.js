/* 高中数学讲义页：两层标签筛选章节 */
(function () {
  var side = document.querySelector(".hs-side");
  if (!side) return;

  function active(row, key) {
    var btn = side.querySelector(".hs-tab-row--" + row + " .hs-tab.is-on");
    return btn && btn.dataset[key] ? btn.dataset[key] : null;
  }

  function apply() {
    var sub = active("subject", "subject") || side.dataset.subject || "algebra";
    var stage = active("stage", "stage") || side.dataset.stage || "junior";
    var items = side.querySelectorAll(".hs-chap[data-subject][data-stage]");
    for (var i = 0; i < items.length; i++) {
      var a = items[i];
      a.hidden = !(a.dataset.subject === sub && a.dataset.stage === stage);
    }
  }

  var tabs = side.querySelectorAll(".hs-tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      var row = this.parentElement;
      var siblings = row.querySelectorAll(".hs-tab");
      for (var j = 0; j < siblings.length; j++) siblings[j].classList.toggle("is-on", siblings[j] === this);
      apply();
    });
  }
  apply();

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
