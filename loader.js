window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
    document.body.classList.remove("loading");
  }, 300);

  loader.addEventListener("transitionend", () => {
    loader.remove();
  });
});
