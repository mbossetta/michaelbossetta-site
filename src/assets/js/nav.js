(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-navigation");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();
