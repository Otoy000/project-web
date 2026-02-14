document.addEventListener("DOMContentLoaded", function () {
  const phoneNumber = "6282269585523";
  const message =
    "Halo, saya tertarik dengan properti Anda. Bisa minta info lebih lanjut?";

  const waButton = document.createElement("a");
  waButton.id = "wa-floating-btn";
  waButton.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  waButton.target = "_blank";

  waButton.innerHTML = `
    <i class="fab fa-whatsapp"></i>
    <span class="wa-tooltip">Chat Bantuan</span>
  `;

  document.body.appendChild(waButton);
});
