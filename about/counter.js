document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number");

  counters.forEach(counter => {
    let target = +counter.dataset.target; // angka tujuan
    let count = 0;                        // mulai dari 0
    let step = Math.ceil(target / 200);   // ubah 200 kalau mau lebih cepat/lambat

    let update = setInterval(() => {
      count += step;
      if (count >= target) {
        counter.innerText = target.toLocaleString();
        clearInterval(update);
      } else {
        counter.innerText = count.toLocaleString();
      }
    }, 20); // tiap 20ms update angka
  });
});
