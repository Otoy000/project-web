(function () {
  function hideLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    loader.classList.add("hide");
    document.body.classList.remove("loading");

    loader.addEventListener(
      "transitionend",
      () => {
        loader.remove();
      },
      { once: true },
    );
  }

  // DOM siap
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loading");
  });

  // Semua asset selesai (gambar, font, dll)
  window.addEventListener("load", () => {
    setTimeout(hideLoader, 400);
  });

  // ⛑️ SAFETY FALLBACK (kalau load event gagal di hosting)
  setTimeout(hideLoader, 3000);
})();
