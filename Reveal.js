const items = document.querySelectorAll('.testimonial-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target); // optional, supaya hanya sekali
    }
  });
}, { threshold: 0.1 }); // muncul saat 10% card terlihat

items.forEach(item => observer.observe(item));
