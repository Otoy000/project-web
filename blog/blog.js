// pagination.js (versi blog)
const pages = document.querySelectorAll(".pagination .page");
const prev = document.querySelector(".pagination .prev");
const next = document.querySelector(".pagination .next");
const contentContainer = document.getElementById("content");
const breadcrumb = document.getElementById("breadcrumb");

// Validasi awal
if (!contentContainer) {
  console.error("Element #content tidak ditemukan. Pastikan ada <section id=\"content\"> di index.html");
  alert("Error: element #content tidak ditemukan. Buka console untuk detail.");
  throw new Error("Missing #content");
}
if (!prev || !next || pages.length === 0) {
  console.warn("Pagination selectors: prev/next/pages mungkin tidak lengkap. pages length =", pages.length);
}

// helper: index aktif
function getActiveIndex() {
  return [...pages].findIndex(p => p.classList.contains("active"));
}

function updateButtons() {
  const idx = getActiveIndex();
  if (prev) prev.classList.toggle("disabled", idx === 0 || idx === -1);
  if (next) next.classList.toggle("disabled", idx === pages.length - 1 || idx === -1);
}

function updateBreadcrumb(pageIndex) {
  if (!breadcrumb) return;
  breadcrumb.innerHTML = `Home / Blog / Page ${pageIndex + 1}`;
}

function showLoading() {
  contentContainer.innerHTML = `<div class="loading-spinner">Loading...</div>`;
}

async function loadPage(index) {
  const pageNum = index + 1;
  const ts = Date.now();

  if (location.protocol === "file:") {
    const msg = "fetch tidak didukung di file:// — jalankan Live Server / http://localhost";
    console.error(msg);
    contentContainer.innerHTML = `<p style="color:red">${msg}</p>`;
    return;
  }

  const candidates = [
    `pages/blog-page${pageNum}.html?ts=${ts}`,
    `pages/blog-page%20${pageNum}.html?ts=${ts}`,
    `pages/blog-page ${pageNum}.html?ts=${ts}`
  ];

  let lastError = null;
  showLoading();

  for (const url of candidates) {
    try {
      console.log("Mencoba load:", url);
      const res = await fetch(url);
      if (res.ok) {
        const html = await res.text();
        contentContainer.innerHTML = html;
        document.title = `Blog - Page ${pageNum}`;
        updateBreadcrumb(index);
        console.log("Berhasil load:", url);
        return;
      } else {
        lastError = new Error(`HTTP ${res.status} saat load ${url}`);
        console.warn(lastError.message);
      }
    } catch (err) {
      lastError = err;
      console.warn("Fetch error untuk", url, err);
    }
  }

  contentContainer.innerHTML = `<p style="color:red">Gagal load halaman blog Page ${pageNum}. Cek nama file, folder "pages", dan jalankan via Live Server.</p>`;
  console.error("All fetch attempts failed. Last error:", lastError);
}

// Event listeners
pages.forEach((page, i) => {
  page.addEventListener("click", (e) => {
    e.preventDefault();
    pages.forEach(p => p.classList.remove("active"));
    page.classList.add("active");
    loadPage(i).catch(err => console.error(err));
    updateButtons();
  });
});

if (next) {
  next.addEventListener("click", (e) => {
    e.preventDefault();
    let idx = getActiveIndex();
    if (idx < 0) idx = 0;
    if (idx < pages.length - 1) {
      pages[idx].classList.remove("active");
      pages[idx + 1].classList.add("active");
      loadPage(idx + 1).catch(err => console.error(err));
      updateButtons();
    }
  });
}

if (prev) {
  prev.addEventListener("click", (e) => {
    e.preventDefault();
    let idx = getActiveIndex();
    if (idx < 1) return;
    pages[idx].classList.remove("active");
    pages[idx - 1].classList.add("active");
    loadPage(idx - 1).catch(err => console.error(err));
    updateButtons();
  });
}

// Inisialisasi
if (pages.length) {
  pages.forEach(p => p.classList.remove("active"));
  pages[0].classList.add("active");
  loadPage(0).catch(err => console.error(err));
}
updateButtons();
