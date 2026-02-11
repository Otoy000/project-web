const images = [
  "url('images/BG1.PNG')",
  "url('images/BG2.PNG')",
  "url('images/BG3.PNG')",
  "url('images/BG4.PNG')"
];

const titles = [
  "Buka Pintu Hunian Idaman",
  "Hidup Indah Bersama Keluarga",
  "Nyaman Hari Ini, Investasi Esok",
  "Ruang Nyaman, Hidup Lebih Tenang"
];

const subtitles = [
  "Kami hadir untuk membantu Anda menemukan rumah yang sesuai dengan gaya hidup dan impian.",
  "Nikmati setiap momen berharga bersama orang tercinta di rumah yang nyaman dan penuh kehangatan.",
  "Hunian di lingkungan asri yang tidak hanya nyaman ditinggali, tapi juga bernilai untuk masa depan.",
  "Desain modern minimalis untuk kenyamanan Anda, menciptakan suasana rumah yang damai setiap hari.",
];

let current = 0;

window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-wrap");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");

  // layer gambar
  const slideCurrent = document.createElement("div");
  const slideNext = document.createElement("div");

  [slideCurrent, slideNext].forEach(slide => {
    slide.style.position = "absolute";
    slide.style.top = 0;
    slide.style.left = 0;
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
    slide.style.transition = "transform 1s ease, scale 1s ease";
    slide.style.transform = "scale(1.05)";
    slide.style.willChange = "transform"; // optimasi performa
    hero.appendChild(slide);
  });

  slideCurrent.style.backgroundImage = images[current];
  heroTitle.textContent = titles[current];
  heroSubtitle.textContent = subtitles[current];

  // shadow teks untuk kesan premium
  heroTitle.style.textShadow = "0 4px 25px rgba(0,0,0,0.6)";
  heroSubtitle.style.textShadow = "0 2px 20px rgba(0,0,0,0.5)";

  // efek parallax ringan saat mouse move
  hero.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // geser ±10px
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    slideCurrent.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    slideNext.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });

  function changeSlide() {
    const nextIndex = (current + 1) % images.length;

    slideNext.style.backgroundImage = images[nextIndex];
    slideNext.style.transform = "translateX(100%) scale(1.05)";

    requestAnimationFrame(() => {
      slideCurrent.style.transform = "translateX(-100%) scale(1)";
      slideNext.style.transform = "translateX(0) scale(1)";
    });

    slideNext.addEventListener("transitionend", function handler() {
      heroTitle.textContent = titles[nextIndex];
      heroSubtitle.textContent = subtitles[nextIndex];

      // reset slideCurrent untuk loop berikutnya
      slideCurrent.style.transform = "translateX(0) scale(1.05)";
      slideCurrent.style.backgroundImage = images[nextIndex];

      slideNext.style.transform = "translateX(100%) scale(1.05)";

      current = nextIndex;

      slideNext.removeEventListener("transitionend", handler);
    });
  }

  setInterval(changeSlide, 5000);
});
