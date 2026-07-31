const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cards = document.querySelectorAll('.demo-card');

if (!cards.length) {
  // nothing to animate
} else if (reducedMotion) {
  cards.forEach(card => card.classList.add('is-visible'));
} else {
  // Staggered reveal on load (cards already in viewport)
  requestAnimationFrame(() => {
    cards.forEach(card => card.classList.add('is-visible'));
  });
}
