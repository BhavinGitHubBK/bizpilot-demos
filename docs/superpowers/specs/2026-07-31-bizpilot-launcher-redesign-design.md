# BizPilot Launcher Redesign

**Date:** 2026-07-31  
**Scope:** `index.html`, `assets/css/launcher.css`, `assets/js/launcher.js` only  
**Out of scope:** `advocate-demo/`, `jewellery-demo/`, `kirana-demo/`

## Goal

Make the demo launcher feel premium: brand-first dark hero, then a light editorial lookbook of the three demos. Replace the current dark three-card showroom.

## Approach

**Dark hero + light lookbook** (Approach 1).

Two acts on one page:

1. Full-bleed dark first viewport — BizPilot dominates; one headline, one support line, scroll cue. No demos, stats, or badges.
2. Light lookbook — three full-width editorial rows linking to the existing demos.

## Structure

### Hero (first viewport)

- Edge-to-edge near-black atmosphere: soft gradient depth + subtle grain (no purple glow).
- Brand mark + **BizPilot** as the largest typographic signal.
- Headline (secondary to brand), e.g. “Business demos, ready to explore”.
- One short support line about curated website experiences.
- Quiet scroll affordance only (no CTA buttons competing with brand).

### Lookbook

- Warm off-white / stone ground (avoid cream + terracotta + display-serif cliché).
- Three stacked full-width rows, order: Legal → Jewellery → Grocery.
- Each row: large demo photography (existing assets) + category label + business name + “Open demo”.
- Entire row is the click target; `target="_blank"` + `rel="noopener noreferrer"` unchanged.
- Accent used sparingly per row: gold (legal), rose (jewellery), green (grocery).

### Footer

- Minimal: © 2026 BizPilot + short tagline under the lookbook.

## Visual language

| Token | Direction |
|-------|-----------|
| Hero background | Near-black with soft depth, grain |
| Lookbook background | Warm stone / off-white |
| Brand type | Distinct display pairing (not Inter, Roboto, Arial, or system default stack) |
| Body type | Clean readable sans complementary to display |
| Accents | Gold / rose / green only as row cues |

**Hierarchy:** Brand name > headline > support copy > lookbook labels.

## Motion

Exactly 2–3 intentional motions:

1. Hero content fade/rise on load.
2. Lookbook rows reveal on scroll (intersection-driven).
3. Row hover: subtle image shift and/or CTA underline.

Honor `prefers-reduced-motion: reduce` (disable or simplify all three).

Remove current 3D card tilt / pointer parallax behavior.

## Content

| Element | Copy |
|---------|------|
| Brand | BizPilot / Business Demo Platform |
| Hero headline | Business demos, ready to explore |
| Hero support | Explore one of three curated website experiences. |
| Row 1 | Professional Services · Rajan Legal Associates · Open demo |
| Row 2 | Luxury Commerce · Zivara · Open demo |
| Row 3 | Everyday Commerce · FreshBasket Mart · Open demo |
| Footer | © 2026 BizPilot · Digital experiences for modern businesses. |

### Image sources (reuse)

- Legal: `advocate-demo/assets/images/lady-justice-hero.png`
- Jewellery: `jewellery-demo/assets/images/hero/jewellery-hero.png`
- Grocery: `kirana-demo/assets/images/banners/freshbasket-hero.png`

### Links (unchanged)

- `advocate-demo/index.html`
- `jewellery-demo/index.html`
- `kirana-demo/index.html`

## Responsive

- **Desktop:** Each lookbook row is image + text side-by-side; alternate image side per row (left / right / left) for rhythm.
- **Mobile:** Stacked — image above text; hero remains brand-first within the first viewport.
- Min width stays usable at ~320px.

## Files to change

1. `index.html` — new markup for hero + lookbook + footer.
2. `assets/css/launcher.css` — full restyle for the new composition.
3. `assets/js/launcher.js` — replace tilt with scroll reveal (+ reduced-motion guard).

## Success criteria

- First viewport reads as BizPilot brand, not a demo dashboard.
- Light lookbook feels editorial/premium, not a card grid.
- All three demos open correctly in a new tab.
- Motion is present but restrained; reduced-motion users get a static experience.
- Desktop and mobile both load and read clearly.
