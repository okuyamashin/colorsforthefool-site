(function () {
  document.querySelectorAll("button.film-face").forEach(function (button) {
    button.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      var src = button.getAttribute("data-src") || "";
      frame.src = src + (src.indexOf("?") === -1 ? "?" : "&") + "autoplay=1";
      frame.title = button.getAttribute("data-title") || "";
      frame.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      frame.allowFullscreen = true;
      button.replaceWith(frame);
    });
  });
})();
