# BizPilot Launcher Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the BizPilot launcher into a premium dark brand hero + light editorial lookbook that links to the three existing demos.

**Architecture:** Single static page. `index.html` owns structure; `assets/css/launcher.css` owns all presentation (hero, lookbook, footer, motion, responsive); `assets/js/launcher.js` only handles scroll-reveal for lookbook rows and respects `prefers-reduced-motion`. No build step, no frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid/Flex, `@media`, `@keyframes`), vanilla JS (`IntersectionObserver`), Google Fonts (Fraunces + Outfit).

## Global Constraints

- Scope: only `index.html`, `assets/css/launcher.css`, `assets/js/launcher.js`
- Do not modify `advocate-demo/`, `jewellery-demo/`, or `kirana-demo/`
- Demo links must remain `advocate-demo/index.html`, `jewellery-demo/index.html`, `kirana-demo/index.html` with `target="_blank"` and `rel="noopener noreferrer"`
- Reuse existing hero images at the paths listed in the content table below
- No purple glow themes; no Inter/Roboto/Arial/system-only stacks; no terracotta-on-cream serif cliché
- Honor `prefers-reduced-motion: reduce`
- First viewport: brand first — no demo cards, stats, badges, or secondary chrome in the hero

**Spec:** `docs/superpowers/specs/2026-07-31-bizpilot-launcher-redesign-design.md`

---

## File Structure

| File | Responsibility |
|------|----------------|
| `index.html` | Hero markup, lookbook rows, footer, font + asset links |
| `assets/css/launcher.css` | Tokens, hero, lookbook, footer, hover motion, reduced-motion, breakpoints |
| `assets/js/launcher.js` | IntersectionObserver row reveal; no tilt/parallax |

---

### Task 1: Rewrite launcher markup

**Files:**
- Modify: `index.html`
- Test: structure checks via PowerShell `Select-String`

**Interfaces:**
- Consumes: existing demo image paths and demo URLs
- Produces: DOM hooks `.hero`, `.lookbook`, `.lookbook-row`, `.lookbook-row.is-visible` (class toggled later by JS)

- [ ] **Step 1: Replace `index.html` with the new structure**

Overwrite `index.html` with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Choose from three premium BizPilot business website demos.">
  <meta name="theme-color" content="#0c0e12">
  <title>BizPilot — Choose a Business Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/launcher.css">
  <script src="assets/js/launcher.js" defer></script>
</head>
<body>
  <header class="hero">
    <div class="hero-atmosphere" aria-hidden="true"></div>
    <div class="hero-inner">
      <a class="brand" href="index.html" aria-label="BizPilot home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44" width="56" height="56">
            <defs>
              <linearGradient id="logoFace" x1="5" y1="3" x2="39" y2="42" gradientUnits="userSpaceOnUse">
                <stop stop-color="#fff"/>
                <stop offset="1" stop-color="#c8d4e7"/>
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="42" height="42" rx="12" fill="url(#logoFace)"/>
            <path d="M12 27.5V21a2.5 2.5 0 0 1 5 0v6.5a2.5 2.5 0 0 1-5 0Z" fill="#0A0E15"/>
            <path d="M19.5 27.5V14.8a2.5 2.5 0 0 1 5 0v12.7a2.5 2.5 0 0 1-5 0Z" fill="#0A0E15"/>
            <path d="M27 27.5v-9.2a2.5 2.5 0 0 1 5 0v9.2a2.5 2.5 0 0 1-5 0Z" fill="#0A0E15"/>
            <path d="M11.5 34c7.8 2.8 15 1.8 21-3" fill="none" stroke="#657996" stroke-width="1.4" stroke-linecap="round"/>
            <circle cx="33.5" cy="30.4" r="1.7" fill="#57D892"/>
          </svg>
        </span>
        <span class="brand-copy">
          <strong>BizPilot</strong>
          <small>Business Demo Platform</small>
        </span>
      </a>
      <h1 class="hero-title">Business demos, ready to explore</h1>
      <p class="hero-support">Explore one of three curated website experiences.</p>
      <a class="scroll-cue" href="#lookbook">
        <span>View demos</span>
        <span class="scroll-cue-icon" aria-hidden="true"></span>
      </a>
    </div>
  </header>

  <main id="lookbook" class="lookbook">
    <p class="lookbook-kicker">Curated experiences</p>
    <h2 class="lookbook-heading">Choose a demo</h2>

    <a class="lookbook-row legal" href="advocate-demo/index.html" target="_blank" rel="noopener noreferrer">
      <div class="lookbook-media">
        <img src="advocate-demo/assets/images/lady-justice-hero.png" width="960" height="660" alt="Lady Justice representing the Rajan Legal Associates website" loading="lazy">
      </div>
      <div class="lookbook-copy">
        <p class="lookbook-category">Professional Services</p>
        <h3>Rajan Legal Associates</h3>
        <span class="lookbook-cta">Open demo <i aria-hidden="true">→</i></span>
      </div>
    </a>

    <a class="lookbook-row zivara" href="jewellery-demo/index.html" target="_blank" rel="noopener noreferrer">
      <div class="lookbook-media">
        <img src="jewellery-demo/assets/images/hero/jewellery-hero.png" width="960" height="660" alt="Luxury jewellery representing the Zivara website" loading="lazy">
      </div>
      <div class="lookbook-copy">
        <p class="lookbook-category">Luxury Commerce</p>
        <h3>Zivara</h3>
        <span class="lookbook-cta">Open demo <i aria-hidden="true">→</i></span>
      </div>
    </a>

    <a class="lookbook-row freshbasket" href="kirana-demo/index.html" target="_blank" rel="noopener noreferrer">
      <div class="lookbook-media">
        <img src="kirana-demo/assets/images/banners/freshbasket-hero.png" width="960" height="660" alt="Fresh groceries representing the FreshBasket Mart website" loading="lazy">
      </div>
      <div class="lookbook-copy">
        <p class="lookbook-category">Everyday Commerce</p>
        <h3>FreshBasket Mart</h3>
        <span class="lookbook-cta">Open demo <i aria-hidden="true">→</i></span>
      </div>
    </a>
  </main>

  <footer class="site-footer">
    <span>© 2026 BizPilot</span>
    <span>Digital experiences for modern businesses.</span>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Verify required structure exists**

Run from repo root:

```powershell
Select-String -Path index.html -Pattern 'class="hero"|id="lookbook"|lookbook-row legal|lookbook-row zivara|lookbook-row freshbasket|advocate-demo/index.html|jewellery-demo/index.html|kirana-demo/index.html' | ForEach-Object { $_.Line.Trim() }
```

Expected: matches for hero, lookbook id, three rows, and all three demo hrefs.

- [ ] **Step 3: Commit**

```powershell
git add index.html
git commit -m "Rebuild launcher markup for dark hero and lookbook."
```

---

### Task 2: Restyle launcher CSS

**Files:**
- Modify: `assets/css/launcher.css` (full replace)
- Test: open `index.html` in browser; structure already committed

**Interfaces:**
- Consumes: classes from Task 1 (`hero`, `lookbook-row`, `legal` / `zivara` / `freshbasket`, `is-visible`)
- Produces: visual system tokens and responsive layout; `.lookbook-row.is-visible` reveal styles

- [ ] **Step 1: Replace `assets/css/launcher.css` entirely**

Overwrite with:

```css
:root {
  --hero-bg: #0c0e12;
  --hero-text: #f4f1ea;
  --hero-muted: #9aa1ab;
  --lookbook-bg: #ece8e1;
  --lookbook-ink: #1a1c1f;
  --lookbook-muted: #5c6168;
  --gold: #a8893a;
  --rose: #b56b86;
  --green: #3d8f62;
  --ease: cubic-bezier(.22, .75, .25, 1);
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Outfit", "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; min-width: 320px; }
body {
  margin: 0;
  color: var(--lookbook-ink);
  background: var(--lookbook-bg);
  font-family: var(--font-body);
}

a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; height: auto; }
:focus-visible { outline: 2px solid var(--green); outline-offset: 4px; }

/* —— Hero —— */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: var(--hero-text);
  background:
    radial-gradient(ellipse 70% 50% at 50% 35%, rgba(90, 105, 125, .18), transparent 60%),
    radial-gradient(ellipse 40% 30% at 80% 80%, rgba(61, 143, 98, .08), transparent 50%),
    linear-gradient(180deg, #12151b 0%, var(--hero-bg) 100%);
}
.hero-atmosphere {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .22;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}
.hero-inner {
  position: relative;
  z-index: 1;
  width: min(720px, calc(100% - 48px));
  text-align: center;
  padding: 48px 0 72px;
  animation: heroIn .9s var(--ease) both;
}
.brand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-bottom: 40px;
}
.brand-mark {
  display: block;
  filter: drop-shadow(0 12px 28px rgba(0, 0, 0, .35));
}
.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.brand-copy strong {
  font-family: var(--font-display);
  font-weight: 650;
  font-size: clamp(3.4rem, 8vw, 5.5rem);
  line-height: .95;
  letter-spacing: -.04em;
}
.brand-copy small {
  font-size: .72rem;
  font-weight: 500;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--hero-muted);
}
.hero-title {
  margin: 0 auto;
  max-width: 16ch;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.35rem, 2.6vw, 1.85rem);
  line-height: 1.25;
  letter-spacing: -.02em;
  color: #d7dbe2;
}
.hero-support {
  margin: 14px auto 0;
  max-width: 36ch;
  color: var(--hero-muted);
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 400;
}
.scroll-cue {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 48px;
  color: var(--hero-muted);
  font-size: .72rem;
  font-weight: 500;
  letter-spacing: .18em;
  text-transform: uppercase;
  transition: color .25s;
}
.scroll-cue:hover { color: var(--hero-text); }
.scroll-cue-icon {
  width: 1px;
  height: 36px;
  background: linear-gradient(180deg, rgba(255,255,255,.55), transparent);
  animation: cuePulse 1.8s ease-in-out infinite;
}

/* —— Lookbook —— */
.lookbook {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 88px 0 40px;
}
.lookbook-kicker {
  margin: 0 0 10px;
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--lookbook-muted);
}
.lookbook-heading {
  margin: 0 0 56px;
  font-family: var(--font-display);
  font-weight: 650;
  font-size: clamp(2rem, 4vw, 2.75rem);
  letter-spacing: -.03em;
}
.lookbook-row {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
  padding: 36px 0;
  border-top: 1px solid rgba(26, 28, 31, .12);
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .7s var(--ease), transform .7s var(--ease);
}
.lookbook-row.is-visible {
  opacity: 1;
  transform: none;
}
.lookbook-row.zivara {
  grid-template-columns: .85fr 1.15fr;
}
.lookbook-row.zivara .lookbook-media { order: 2; }
.lookbook-row.zivara .lookbook-copy { order: 1; text-align: right; }
.lookbook-row.zivara .lookbook-cta { margin-left: auto; }
.lookbook-media {
  overflow: hidden;
  background: #d5d0c7;
  aspect-ratio: 16 / 11;
}
.lookbook-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .7s var(--ease);
}
.lookbook-row:hover .lookbook-media img { transform: scale(1.04); }
.legal .lookbook-media img { object-position: 60% center; }
.zivara .lookbook-media img { object-position: 62% center; }
.freshbasket .lookbook-media img { object-position: 67% center; }
.lookbook-category {
  margin: 0 0 12px;
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
}
.legal .lookbook-category { color: var(--gold); }
.zivara .lookbook-category { color: var(--rose); }
.freshbasket .lookbook-category { color: var(--green); }
.lookbook-copy h3 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 650;
  font-size: clamp(1.75rem, 3vw, 2.45rem);
  letter-spacing: -.03em;
  line-height: 1.1;
}
.lookbook-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--lookbook-muted);
  transition: color .25s, border-color .25s;
}
.lookbook-cta i {
  font-style: normal;
  transition: transform .3s var(--ease);
}
.lookbook-row:hover .lookbook-cta {
  color: var(--lookbook-ink);
  border-bottom-color: currentColor;
}
.lookbook-row:hover .lookbook-cta i { transform: translateX(6px); }

.site-footer {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 48px;
  border-top: 1px solid rgba(26, 28, 31, .12);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--lookbook-muted);
  font-size: .72rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

@keyframes heroIn {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}
@keyframes cuePulse {
  0%, 100% { opacity: .35; transform: scaleY(.85); }
  50% { opacity: 1; transform: scaleY(1); }
}

@media (max-width: 860px) {
  .lookbook-row,
  .lookbook-row.zivara {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .lookbook-row.zivara .lookbook-media,
  .lookbook-row.zivara .lookbook-copy { order: initial; }
  .lookbook-row.zivara .lookbook-copy { text-align: left; }
  .lookbook-row.zivara .lookbook-cta { margin-left: 0; }
  .lookbook { padding-top: 64px; }
}

@media (max-width: 560px) {
  .hero-inner { width: calc(100% - 32px); padding-bottom: 56px; }
  .brand-copy strong { font-size: clamp(2.8rem, 14vw, 3.6rem); }
  .lookbook,
  .site-footer { width: calc(100% - 32px); }
  .site-footer { flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .hero-inner,
  .lookbook-row,
  .lookbook-media img,
  .lookbook-cta i,
  .scroll-cue-icon {
    animation: none !important;
    transition: none !important;
  }
  .lookbook-row {
    opacity: 1;
    transform: none;
  }
  .lookbook-row:hover .lookbook-media img { transform: none; }
}
```

- [ ] **Step 2: Spot-check CSS tokens and breakpoints**

Run:

```powershell
Select-String -Path assets/css/launcher.css -Pattern '--hero-bg|--lookbook-bg|Fraunces|lookbook-row.is-visible|prefers-reduced-motion|max-width: 860px' | ForEach-Object { "$($_.LineNumber): $($_.Line.Trim())" }
```

Expected: hits for hero/lookbook tokens, Fraunces, `is-visible`, reduced-motion, and 860px breakpoint.

- [ ] **Step 3: Commit**

```powershell
git add assets/css/launcher.css
git commit -m "Restyle launcher with dark hero and light lookbook."
```

---

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

### Task 4: End-to-end verification

**Files:**
- Verify only (no code unless bugs found)
- Test: browser + image path checks

**Interfaces:**
- Consumes: Tasks 1–3 deliverables
- Produces: confirmation against success criteria

- [ ] **Step 1: Confirm image files exist**

```powershell
@(
  'advocate-demo/assets/images/lady-justice-hero.png',
  'jewellery-demo/assets/images/hero/jewellery-hero.png',
  'kirana-demo/assets/images/banners/freshbasket-hero.png'
) | ForEach-Object { "$_ → $(Test-Path $_)" }
```

Expected: all three `True`.

- [ ] **Step 2: Open and visually verify in browser**

Open: `http://localhost/bizpilot-demos/index.html` (or `file:///C:/xampp/htdocs/bizpilot-demos/index.html`)

Checklist:

1. First viewport shows large **BizPilot** brand; demos are not in the first screen.
2. Scroll cue jumps/smooth-scrolls to `#lookbook`.
3. Lookbook is light stone background with three full-width rows; Zivara row mirrors image to the right on desktop.
4. Each row opens the correct demo in a new tab.
5. On load, hero fades/rises; on scroll, rows reveal; hover shifts image slightly and underlines CTA.
6. Resize to ~375px width: rows stack, brand still dominates hero.
7. In DevTools, emulate `prefers-reduced-motion: reduce`: rows appear visible immediately; no hero/cue animation.

- [ ] **Step 3: Fix any issues found, then commit if needed**

If CSS/JS/HTML tweaks were required:

```powershell
git add index.html assets/css/launcher.css assets/js/launcher.js
git commit -m "Polish launcher redesign after verification."
```

If no changes, skip commit.

---

## Self-Review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Dark brand-first hero | Task 1 + 2 |
| Light lookbook rows | Task 1 + 2 |
| Accents gold/rose/green | Task 2 |
| Fraunces + Outfit (not Inter/system) | Task 1 + 2 |
| Reuse images + keep links | Task 1 + 4 |
| Hero fade, scroll reveal, hover | Task 2 + 3 |
| Reduced motion | Task 2 + 3 + 4 |
| Alternate image side (Zivara) | Task 2 |
| Mobile stack | Task 2 + 4 |
| No demo folder changes | Global Constraints |

No placeholders remaining. Class names consistent: `.lookbook-row` + `.is-visible` across HTML/CSS/JS.
