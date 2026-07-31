const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rows = document.querySelectorAll('.lookbook-row');

if (!rows.length) {
  // nothing to reveal
} else if (reducedMotion) {
  rows.forEach(row => row.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    root: null,
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  rows.forEach(row => observer.observe(row));
} else {
  rows.forEach(row => row.classList.add('is-visible'));
}
