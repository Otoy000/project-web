document.addEventListener("DOMContentLoaded", function () {
  const slides = [
    {
      img: "images/bg1.png",
      title: "Cara Termudah <br>Mencari Properti",
      desc: "Temukan rumah impian Anda bersama PT GABE JAI PRO. Dipercaya oleh ribuan orang.",
    },
    {
      img: "images/bg2.png",
      title: "Hidup Indah <br>Bersama Keluarga",
      desc: "Nikmati setiap momen berharga bersama orang tercinta di rumah yang nyaman.",
    },
    {
      img: "images/bg3.png",
      title: "Investasi Cerdas <br>Untuk Masa Depan",
      desc: "Hunian di lingkungan asri yang bernilai investasi tinggi.",
    },
  ];

  const heroBg = document.querySelector(".hero-bg");
  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-subtitle");

  let currentIndex = 0;

  function setSlide(index) {
    const slide = slides[index];

    heroBg.style.backgroundImage = `url('${slide.img}')`;
    titleEl.innerHTML = slide.title;
    descEl.innerHTML = slide.desc;
  }

  // 🔥 SET SLIDE PERTAMA LANGSUNG
  setSlide(0);

  // 🔥 PRELOAD GAMBAR (biar slide berikutnya tidak delay)
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.img;
  });

  function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    setSlide(currentIndex);
  }

  setInterval(changeSlide, 5000);
});
