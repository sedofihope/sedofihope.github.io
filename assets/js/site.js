// Theme toggle, "priority+" section navigation and active section indicator.
// The page is complete without JavaScript: the navigation then wraps onto
// several lines and the theme follows the system setting.
(function () {
  "use strict";

  var root = document.documentElement;

  // ---------------------------------------------------------------------
  // Theme toggle. The stored choice is applied before first paint by the
  // inline script in <head>; without a stored choice the system wins.
  // ---------------------------------------------------------------------
  var themeButton = document.getElementById("theme-toggle");
  if (themeButton) {
    var system = window.matchMedia("(prefers-color-scheme: dark)");
    var currentTheme = function () {
      return root.getAttribute("data-theme") || (system.matches ? "dark" : "light");
    };
    var renderTheme = function () {
      themeButton.setAttribute("aria-label", currentTheme() === "dark"
        ? themeButton.dataset.toLight
        : themeButton.dataset.toDark);
    };
    themeButton.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      renderTheme();
    });
    if (system.addEventListener) system.addEventListener("change", renderTheme);
    themeButton.hidden = false;
    renderTheme();
  }

  // ---------------------------------------------------------------------
  // Priority+ navigation: keep as many sections as fit in the bar, move
  // the rest into the "Menu" drop-down, recompute on every width change.
  // ---------------------------------------------------------------------
  var nav = document.getElementById("primary-nav");
  if (!nav) return;
  var list = nav.querySelector(".nav-list");
  var items = Array.prototype.slice.call(list.children);
  var more = nav.querySelector(".nav-more");
  var moreButton = more.querySelector(".nav-more-button");
  var overflow = more.querySelector(".nav-overflow");
  var overflowItems = Array.prototype.slice.call(overflow.children);

  var widths = [];
  var moreWidth = 0;
  var gap = 0;
  var activeId = null;

  function measure() {
    items.forEach(function (li) { li.hidden = false; });
    more.hidden = false;
    widths = items.map(function (li) { return li.getBoundingClientRect().width; });
    moreWidth = more.getBoundingClientRect().width;
    gap = parseFloat(getComputedStyle(list).columnGap) || 0;
  }

  function layout() {
    var available = nav.clientWidth;
    var total = widths.reduce(function (sum, w) { return sum + w; }, 0) + gap * (widths.length - 1);
    var visible = widths.length;

    if (total > available) {
      var room = available - moreWidth - gap;
      var used = 0;
      visible = 0;
      while (visible < widths.length && used + widths[visible] + (visible ? gap : 0) <= room) {
        used += widths[visible] + (visible ? gap : 0);
        visible++;
      }
    }

    items.forEach(function (li, i) { li.hidden = i >= visible; });
    overflowItems.forEach(function (li, i) { li.hidden = i < visible; });
    more.hidden = visible === widths.length;
    nav.classList.toggle("nav-collapsed", visible === 0);
    if (more.hidden) closeMenu();
    markActive(activeId);
  }

  function openMenu() {
    overflow.hidden = false;
    moreButton.setAttribute("aria-expanded", "true");
    // Keep the drop-down inside the viewport.
    overflow.style.left = "0px";
    var rect = overflow.getBoundingClientRect();
    var limit = document.documentElement.clientWidth - 12;
    if (rect.right > limit) overflow.style.left = (limit - rect.right) + "px";
  }

  function closeMenu() {
    overflow.hidden = true;
    moreButton.setAttribute("aria-expanded", "false");
  }

  moreButton.addEventListener("click", function () {
    if (overflow.hidden) openMenu(); else closeMenu();
  });
  overflow.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", function (e) {
    if (!more.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overflow.hidden) {
      closeMenu();
      moreButton.focus();
    }
  });

  function refresh() {
    measure();
    layout();
  }

  // ---------------------------------------------------------------------
  // Active section indicator.
  // ---------------------------------------------------------------------
  function markActive(id) {
    var inOverflow = false;
    nav.querySelectorAll("a[data-section]").forEach(function (a) {
      var on = a.dataset.section === id;
      if (on) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
      if (on && a.closest(".nav-overflow") && !a.parentElement.hidden) inOverflow = true;
    });
    moreButton.classList.toggle("has-active", inOverflow);
  }

  refresh();
  root.classList.add("nav-ready");
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () { layout(); }).observe(nav);
  } else {
    window.addEventListener("resize", layout);
  }
  // Label widths change once the fonts are final.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"))
    .filter(function (s) { return nav.querySelector('a[data-section="' + s.id + '"]'); });
  if (!sections.length || !("IntersectionObserver" in window)) return;

  var visibleSections = {};

  function updateActive() {
    var id = null;
    // At the very bottom of the page, the last section wins.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      id = sections[sections.length - 1].id;
    } else {
      // Otherwise, the first section crossing the band below the bar.
      for (var i = 0; i < sections.length; i++) {
        if (visibleSections[sections[i].id]) { id = sections[i].id; break; }
      }
    }
    if (id && id !== activeId) {
      activeId = id;
      markActive(activeId);
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { visibleSections[entry.target.id] = entry.isIntersecting; });
    updateActive();
  }, { rootMargin: "-" + (nav.offsetHeight + 16) + "px 0px -55% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
  window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) updateActive();
  }, { passive: true });
})();
