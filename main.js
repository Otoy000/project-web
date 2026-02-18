document.addEventListener("DOMContentLoaded", function () {
  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach((el) => {
        if (el !== item) {
          el.classList.remove("active");
          el.querySelector(".faq-question")?.setAttribute(
            "aria-expanded",
            "false",
          );
        }
      });

      const isOpen = item.classList.toggle("active");
      question.setAttribute("aria-expanded", isOpen);
    });
  });

  /* ================= SEARCH BUTTON ================= */
  const searchBtn = document.getElementById("searchBtn");
  const propertySelect = document.getElementById("propertyType");

  if (searchBtn && propertySelect) {
    searchBtn.addEventListener("click", function () {
      const selected = propertySelect.value.trim();

      const routes = {
        "Rumah Subsidi": "listing-rumah/listing-rumah-subsidi.html",
        "Rumah Komersil": "listing-rumah/listing-rumah-komersil.html",
        Kavling: "listing-rumah/listing-tanah-kavling.html",
      };

      if (routes[selected]) {
        window.location.href = routes[selected];
      } else {
        alert("Silakan pilih tipe properti terlebih dahulu!");
      }
    });
  }

  /* ================= HAMBURGER MENU ================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  /* ================= NEWSLETTER FORM ================= */
  const form = document.getElementById("newsletterForm");
  const message = document.getElementById("message");

  if (form && message) {
    const scriptURL = "https://formspree.io/f/manpwrnz";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("emailInput");
      if (!emailInput) return;

      fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.value }),
      })
        .then((res) => {
          if (res.ok) {
            message.textContent =
              "✅ Terima kasih, email kamu berhasil dikirim!";
            message.style.color = "limegreen";
            form.reset();
          } else {
            message.textContent = "❌ Gagal menyimpan email.";
            message.style.color = "red";
          }
        })
        .catch(() => {
          message.textContent = "❌ Terjadi kesalahan koneksi.";
          message.style.color = "red";
        });
    });
  }
});
