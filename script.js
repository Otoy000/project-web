document.addEventListener("DOMContentLoaded", function () {
  // --- 1. DATA SLIDE ---
  const slides = [
    {
      img: "/images/bg1.png",
      title: "Cara Termudah <br>Mencari Properti",
      desc: "Temukan rumah impian Anda bersama PT GABE JAI PRO. Dipercaya oleh ribuan orang.",
    },
    {
      img: "/images/bg2.png",
      title: "Hidup Indah <br>Bersama Keluarga",
      desc: "Nikmati setiap momen berharga bersama orang tercinta di rumah yang nyaman.",
    },
    {
      img: "/images/bg3.png",
      title: "Investasi Cerdas <br>Untuk Masa Depan",
      desc: "Hunian di lingkungan asri yang bernilai investasi tinggi.",
    },
  ];

  // --- 2. PRELOAD GAMBAR ---
  slides.forEach((slide) => {
    new Image().src = slide.img;
  });

  // --- 3. AMBIL ELEMEN DARI HTML ---
  const heroSection = document.getElementById("hero-section");
  const dynamicContent = document.getElementById("dynamic-content");
  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-subtitle");

  let i = 0;

  // --- 4. FUNGSI GANTI SLIDE ---
  function changeSlide() {
    i = (i + 1) % slides.length;
    const currentSlide = slides[i];
    heroSection.style.backgroundImage = `url('${currentSlide.img}')`;

    dynamicContent.classList.add("fade-out");

    setTimeout(() => {
      titleEl.innerHTML = currentSlide.title;
      descEl.innerHTML = currentSlide.desc;

      dynamicContent.classList.remove("fade-out");
    }, 500);
  }
  setInterval(changeSlide, 5000);
});
