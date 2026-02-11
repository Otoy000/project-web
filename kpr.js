document.addEventListener("DOMContentLoaded", function () {
  // Floating button
  const btn = document.createElement("div");
  btn.className = "kpr-btn";
  btn.innerHTML = "💰 KPR";
  document.body.appendChild(btn);

  // Modal
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

  // Show/Hide modal
  btn.onclick = () => modal.style.display = "flex";
  modal.querySelector(".kpr-close").onclick = () => modal.style.display = "none";

  // Hitung cicilan
  document.getElementById("hitung").onclick = () => {
    const harga = parseFloat(document.getElementById("harga").value);
    const dp = parseFloat(document.getElementById("dp").value) / 100 * harga;
    const bunga = parseFloat(document.getElementById("bunga").value) / 100 / 12;
    const tenor = parseInt(document.getElementById("tenor").value) * 12;
    const pinjaman = harga - dp;

    const cicilan = (pinjaman * bunga) / (1 - Math.pow(1 + bunga, -tenor));
    document.getElementById("hasil").innerText = 
      "Cicilan per bulan: Rp " + cicilan.toLocaleString();
  };
});
