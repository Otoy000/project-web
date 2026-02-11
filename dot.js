const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.testimonial-item');
const wrapper = document.querySelector('.testimonial-wrapper');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // reset semua active
    dots.forEach(d => d.classList.remove('active'));
    items.forEach(i => i.classList.remove('active'));

    // aktifkan dot & card
    dot.classList.add('active');
    items[index].classList.add('active');

    // scroll ke card yang aktif
    items[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  });
});
