document.addEventListener("DOMContentLoaded", function () {
  // Buat elemen banner
  const banner = document.createElement("div");
  banner.id = "promo-banner";
  banner.innerHTML = `
    <span class="banner-icon">📣</span>
    <span class="banner-message">
      Diskon Biaya Notaris bulan ini – 
      <a href="https://blog.kamu.com/promo-notaris" target="_blank" rel="noopener noreferrer">klik untuk info</a>
    </span>
    <span class="banner-close">&times;</span>
  `;
  document.body.appendChild(banner);

  // Tampilkan banner dengan animasi slide + bounce
  setTimeout(() => {
    banner.classList.add("show");
    banner.classList.add("shown"); // animasi bounce
  }, 500);

  // Auto-hide setelah 10 detik
  setTimeout(() => {
    banner.classList.remove("show");
    banner.classList.add("hide");
  }, 10000);

  // Tombol close manual
  banner.querySelector(".banner-close").addEventListener("click", () => {
    banner.classList.remove("show");
    banner.classList.add("hide");
  });
});
