// Light/dark toggle. The stored choice is applied before first paint by the
// inline script in <head>; without a stored choice the system setting wins.
(function () {
  var button = document.getElementById("theme-toggle");
  if (!button) return;
  var root = document.documentElement;
  var system = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.getAttribute("data-theme") || (system.matches ? "dark" : "light");
  }

  function render() {
    button.textContent = current() === "dark" ? button.dataset.toLight : button.dataset.toDark;
  }

  button.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    render();
  });

  if (system.addEventListener) system.addEventListener("change", render);
  button.hidden = false;
  render();
})();
