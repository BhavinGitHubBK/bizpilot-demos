const canTilt = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 961px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canTilt && !reducedMotion) {
  document.querySelectorAll('.demo-card').forEach(card => {
    let frame;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * .13;
      currentY += (targetY - currentY) * .13;
      card.style.setProperty('--ry', `${currentX * 4}deg`);
      card.style.setProperty('--rx', `${currentY * 3}deg`);
      card.style.setProperty('--img-x', `${currentX * -7}px`);
      card.style.setProperty('--img-y', `${currentY * -6}px`);
      if (Math.abs(targetX - currentX) > .002 || Math.abs(targetY - currentY) > .002) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = undefined;
      }
    };

    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      targetX = (x - .5) * 2;
      targetY = (.5 - y) * 2;
      if (!frame) frame = requestAnimationFrame(animate);
    });

    card.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
      if (!frame) frame = requestAnimationFrame(animate);
    });
  });
}
