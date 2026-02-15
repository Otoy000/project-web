document.addEventListener("DOMContentLoaded", function () {
  const slides = [
    {
      image: "images/BG1.png",
      title: "Cara Termudah <br>Mencari Properti",
      subtitle:
        "Temukan rumah impian Anda bersama PT GABE JAI PRO. Dipercaya oleh ribuan orang, memberikan penawaran properti terbaik untuk Anda.",
    },
    {
      image: "images/BG2.png",
      title: "Hidup Indah <br>Bersama Keluarga",
      subtitle:
        "Nikmati setiap momen berharga bersama orang tercinta di rumah yang nyaman dan penuh kehangatan.",
    },
    {
      image: "images/BG3.png",
      title: "Nyaman Hari Ini, <br>Investasi Esok",
      subtitle:
        "Hunian di lingkungan asri yang tidak hanya nyaman ditinggali, tapi juga bernilai tinggi untuk masa depan.",
    },
    {
      image: "images/BG4.png",
      title: "Ruang Nyaman, <br>Hidup Lebih Tenang",
      subtitle:
        "Desain modern minimalis untuk kenyamanan Anda, menciptakan suasana rumah yang damai setiap hari.",
    },
  ];

  // Preload gambar
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.image;
  });

  let currentIndex = 0;
  const heroSection = document.querySelector(".hero-wrap");

  // 👉 Script mencari elemen ini. Kalau HTML Langkah 1 tidak diupdate, ini akan Error/Null
  const textContent = document.getElementById("text-content");
  const titleEl = document.getElementById("hero-title");
  const subtitleEl = document.getElementById("hero-subtitle");

  function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[currentIndex];

    // 1. Ganti Gambar
    if (heroSection) {
      heroSection.style.backgroundImage = `url('${nextSlide.image}')`;
    }

    // 2. Ganti Teks (Cek apakah textContent ditemukan?)
    if (textContent) {
      // Fade Out (Hilang)
      textContent.classList.add("hidden");

      // Tunggu 0.5 detik (sesuai CSS transition), baru ganti teks
      setTimeout(() => {
        if (titleEl) titleEl.innerHTML = nextSlide.title;
        if (subtitleEl) subtitleEl.textContent = nextSlide.subtitle;

        // Fade In (Muncul)
        textContent.classList.remove("hidden");
      }, 500);
    } else {
      console.error(
        "Elemen id='text-content' tidak ditemukan! Cek file HTML Anda.",
      );
    }
  }

  setInterval(changeSlide, 5000);
});
