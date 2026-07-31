### Task 3: Replace tilt JS with scroll reveal

**Files:**
- Modify: `assets/js/launcher.js` (full replace)
- Test: browser scroll + reduced-motion path

**Interfaces:**
- Consumes: `.lookbook-row` elements from Task 1
- Produces: toggles class `is-visible` on each `.lookbook-row` when intersecting

- [ ] **Step 1: Replace `assets/js/launcher.js`**

Overwrite with:

```js
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
```

- [ ] **Step 2: Confirm tilt code is gone**

Run:

```powershell
Select-String -Path assets/js/launcher.js -Pattern 'pointermove|--ry|IntersectionObserver|is-visible|prefers-reduced-motion'
```

Expected: matches for `IntersectionObserver`, `is-visible`, `prefers-reduced-motion`. No matches for `pointermove` or `--ry`.

- [ ] **Step 3: Commit**

```powershell
git add assets/js/launcher.js
git commit -m "Reveal lookbook rows on scroll instead of card tilt."
```

---
