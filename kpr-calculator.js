document.addEventListener("DOMContentLoaded", function () {
  // ===== Floating Button =====
  const btn = document.createElement("div");
  btn.className = "kpr-btn";
  btn.innerHTML = "💰 KPR";
  document.body.appendChild(btn);

  // ===== Modal =====
  const modal = document.createElement("div");
  modal.className = "kpr-modal";
  modal.innerHTML = `
    <div class="kpr-content">
      <span class="kpr-close">&times;</span>
      <h2>Kalkulator KPR</h2>

      <label>Harga Properti</label>
      <input type="number" id="harga" placeholder="500000000" />

      <label>DP (%)</label>
      <input type="number" id="dp" placeholder="20" />

      <label>Bunga (% per tahun)</label>
      <input type="number" id="bunga" placeholder="10" />

      <label>Tenor (tahun)</label>
      <input type="number" id="tenor" placeholder="15" />

      <button id="hitung">Hitung Cicilan</button>
      <p id="hasil"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // ===== Show Modal dengan animasi =====
  btn.onclick = () => {
    modal.style.display = "flex";         // tampilkan modal
    setTimeout(() => modal.classList.add("show"), 50); // animasi scale
  };

  // ===== Close Modal =====
  const closeBtn = modal.querySelector(".kpr-close");
  closeBtn.onclick = () => {
    modal.classList.remove("show");       // animasi keluar
    setTimeout(() => modal.style.display = "none", 300); // sembunyikan
  };

  // Tutup modal jika klik di luar konten
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 300);
    }
  });

  // ===== Hitung Cicilan =====
  document.getElementById("hitung").onclick = () => {
    const harga = parseFloat(document.getElementById("harga").value) || 0;
    const dp = parseFloat(document.getElementById("dp").value) / 100 * harga || 0;
    const bunga = parseFloat(document.getElementById("bunga").value) / 100 / 12 || 0;
    const tenor = parseInt(document.getElementById("tenor").value) * 12 || 0;
    const pinjaman = harga - dp;

    if (pinjaman <= 0 || bunga <= 0 || tenor <= 0) {
      document.getElementById("hasil").innerText = "Mohon isi semua data dengan benar!";
      return;
    }

    const cicilan = (pinjaman * bunga) / (1 - Math.pow(1 + bunga, -tenor));
    document.getElementById("hasil").innerText =
      "Cicilan per bulan: Rp " + cicilan.toLocaleString("id-ID");
  };
});
