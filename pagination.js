// pagination.js (robust version)
const pages = document.querySelectorAll(".pagination .page");
const prev = document.querySelector(".pagination .prev");
const next = document.querySelector(".pagination .next");
const contentContainer = document.getElementById("content");

// Validasi awal
if (!contentContainer) {
  console.error("Element #content tidak ditemukan. Pastikan ada <section id=\"content\"> di index.html");
  alert("Error: element #content tidak ditemukan. Buka console untuk detail.");
  throw new Error("Missing #content");
}
if (!prev || !next || pages.length === 0) {
  console.warn("Pagination selectors: prev/next/pages mungkin tidak lengkap. pages length =", pages.length);
  // tetap lanjutkan supaya dev bisa ngetes fungsi loadPage manual
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

// loadPage: coba beberapa kemungkinan nama file (tanpa/ dengan spasi), anti-cache
async function loadPage(index) {
  const pageNum = index + 1;
  const ts = Date.now();
  // jika dijalankan langsung dari file:// => fetch akan error; beri tahu user
  if (location.protocol === "file:") {
    const msg = "fetch tidak didukung di file:// — jalankan Live Server / http://localhost";
    console.error(msg);
    contentContainer.innerHTML = `<p style="color:red">${msg}</p>`;
    return;
  }

  // kandidat URL: prefer tanpa spasi, lalu dengan spasi
  const candidates = [
    `pages/page${pageNum}.html?ts=${ts}`,
    `pages/page%20${pageNum}.html?ts=${ts}`, // encoded space
    `pages/page ${pageNum}.html?ts=${ts}`    // literal (untuk server yang men-decode)
  ];

  let lastError = null;
  for (const url of candidates) {
    try {
      console.log("Mencoba load:", url);
      const res = await fetch(url);
      if (res.ok) {
        const html = await res.text();
        contentContainer.innerHTML = html;
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

  // kalau semua gagal
  contentContainer.innerHTML = `<p style="color:red">Gagal load pages/page${pageNum}.html — cek nama file, lokasi folder "pages", dan jalankan via Live Server. (lihat console untuk detail)</p>`;
  console.error("All fetch attempts failed. Last error:", lastError);
}

// Event listeners untuk pagination
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

// inisialisasi: pastikan ada active, lalu load halaman 1
if (pages.length) {
  pages.forEach(p => p.classList.remove("active"));
  pages[0].classList.add("active");
  loadPage(0).catch(err => console.error(err));
}
updateButtons();
