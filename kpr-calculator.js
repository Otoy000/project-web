document.addEventListener("DOMContentLoaded", function () {
  // ===========================
  // 1️⃣ Buat Tombol Floating KPR
  // ===========================
  const kprBtn = document.createElement("button");
  kprBtn.id = "kpr-floating-btn";
  kprBtn.innerHTML = `<i class="fas fa-calculator"></i>`;
  // Tambahkan tooltip
  const tooltip = document.createElement("span");
  tooltip.className = "kpr-tooltip";
  tooltip.innerText = "Hitung KPR";
  kprBtn.appendChild(tooltip);

  document.body.appendChild(kprBtn);

  // ===========================
  // 2️⃣ Buat Modal Kalkulator
  // ===========================
  const kprModal = document.createElement("div");
  kprModal.id = "kpr-modal";
  kprModal.innerHTML = `
    <div class="kpr-box">
      <div class="kpr-header">
        <h3><i class="fas fa-calculator"></i> Hitung KPR</h3>
        <span class="close-kpr">&times;</span>
      </div>
      <div class="kpr-body">
        <div class="input-group">
          <label>Harga Properti (Rp)</label>
          <input type="text" id="kpr-harga" placeholder="Contoh: 500.000.000" onkeyup="formatRupiah(this)">
        </div>
        <div class="input-row">
          <div class="input-group">
            <label>DP (%)</label>
            <input type="number" id="kpr-dp-persen" placeholder="20">
          </div>
          <div class="input-group">
            <label>Bunga (%/thn)</label>
            <input type="number" id="kpr-bunga" placeholder="8.5">
          </div>
        </div>
        <div class="input-group">
          <label>Jangka Waktu (Tahun)</label>
          <input type="range" id="kpr-tenor" min="5" max="30" value="15" oninput="updateTenorVal(this.value)">
          <span id="tenor-val">15 Tahun</span>
        </div>
        
        <div class="kpr-result" id="kpr-result">
          <p class="label">Estimasi Cicilan:</p>
          <h4 id="cicilan-bulanan">Rp 0</h4>
          <p class="detail">Pinjaman: <span id="total-pinjaman">Rp 0</span></p>
        </div>

        <button id="hitung-kpr-btn">Hitung Sekarang</button>
      </div>
    </div>
  `;
  document.body.appendChild(kprModal);

  // ===========================
  // 3️⃣ Logic & Event Listeners
  // ===========================

  // Buka Modal
  kprBtn.addEventListener("click", () => {
    kprModal.style.display = "flex";
    setTimeout(() => kprModal.classList.add("active"), 10);
  });

  // Tutup Modal
  const closeBtn = kprModal.querySelector(".close-kpr");
  closeBtn.addEventListener("click", closeModal);
  kprModal.addEventListener("click", (e) => {
    if (e.target === kprModal) closeModal();
  });

  function closeModal() {
    kprModal.classList.remove("active");
    setTimeout(() => (kprModal.style.display = "none"), 300);
  }

  // Update Slider Tenor
  window.updateTenorVal = (val) => {
    document.getElementById("tenor-val").innerText = val + " Tahun";
  };

  // Format Rupiah Input
  window.formatRupiah = (input) => {
    let value = input.value.replace(/[^,\d]/g, "").toString();
    let split = value.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    input.value = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  };

  // Hitung KPR (Rumus Anuitas)
  document.getElementById("hitung-kpr-btn").addEventListener("click", () => {
    // Ambil nilai dan bersihkan format titik
    let hargaStr = document
      .getElementById("kpr-harga")
      .value.replace(/\./g, "");
    let harga = parseFloat(hargaStr) || 0;

    let dpPersen =
      parseFloat(document.getElementById("kpr-dp-persen").value) || 0;
    let bungaTahun =
      parseFloat(document.getElementById("kpr-bunga").value) || 0;
    let tenorTahun = parseInt(document.getElementById("kpr-tenor").value) || 0;

    if (harga <= 0) {
      alert("Masukkan harga properti yang valid!");
      return;
    }

    // Perhitungan
    let dpNominal = (harga * dpPersen) / 100;
    let pokokPinjaman = harga - dpNominal;

    let bungaBulan = bungaTahun / 100 / 12;
    let tenorBulan = tenorTahun * 12;

    // Rumus Cicilan Anuitas: P * (i / (1 - (1+i)^-n))
    let cicilan = 0;
    if (bungaBulan > 0) {
      cicilan =
        pokokPinjaman *
        (bungaBulan / (1 - Math.pow(1 + bungaBulan, -tenorBulan)));
    } else {
      cicilan = pokokPinjaman / tenorBulan;
    }

    // Tampilkan Hasil
    document.getElementById("cicilan-bulanan").innerText =
      formatCurrency(cicilan) + " / bln";
    document.getElementById("total-pinjaman").innerText =
      formatCurrency(pokokPinjaman);

    // Efek highlight hasil
    const resBox = document.getElementById("kpr-result");
    resBox.style.animation = "none";
    resBox.offsetHeight; /* trigger reflow */
    resBox.style.animation = "pulse 0.5s";
  });

  function formatCurrency(num) {
    return (
      "Rp " +
      Math.ceil(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  }
});
