(function () {
  document.body.classList.add("loading");

  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
      loader.classList.add("hide");
      document.body.classList.remove("loading");
    }, 400);

    loader.addEventListener("transitionend", () => {
      loader.remove();
    });
  });
})();
