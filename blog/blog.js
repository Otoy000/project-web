document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("blog-content");
  const pageLinks = document.querySelectorAll(".page");
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");

  let currentPage = 1;
  const totalPages = 3;
  async function loadPage(pageNumber) {
    contentContainer.innerHTML = `<div style="text-align:center; padding:50px;">Loading...</div>`;

    document
      .querySelector(".blog-section")
      .scrollIntoView({ behavior: "smooth" });

    try {
      const response = await fetch(`section-blog/blog-page${pageNumber}.html`);

      if (!response.ok) throw new Error("Gagal mengambil data");

      const html = await response.text();
      contentContainer.innerHTML = html;

      updatePagination(pageNumber);
      currentPage = pageNumber;
    } catch (error) {
      console.error(error);
      contentContainer.innerHTML = `
        <div style="text-align:center; color:red; padding:20px;">
          <p>Gagal memuat konten.</p>
          <p><strong>PENTING:</strong> Pastikan membuka via <em>Live Server</em> (bukan double click file).</p>
        </div>`;
    }
  }

  function updatePagination(page) {
    pageLinks.forEach((link) => link.classList.remove("active"));

    const activeLink = document.querySelector(`.page[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add("active");

    if (page === 1) prevBtn.classList.add("disabled");
    else prevBtn.classList.remove("disabled");

    if (page === totalPages) nextBtn.classList.add("disabled");
    else nextBtn.classList.remove("disabled");
  }

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(link.getAttribute("data-page"));
      loadPage(page);
    });
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) loadPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) loadPage(currentPage + 1);
  });

  loadPage(1);
});
