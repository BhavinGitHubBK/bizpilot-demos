### Task 4: End-to-end verification

**Files:**
- Verify only (no code unless bugs found)
- Test: browser + image path checks

**Interfaces:**
- Consumes: Tasks 1â€“3 deliverables
- Produces: confirmation against success criteria

- [ ] **Step 1: Confirm image files exist**

```powershell
@(
  'advocate-demo/assets/images/lady-justice-hero.png',
  'jewellery-demo/assets/images/hero/jewellery-hero.png',
  'kirana-demo/assets/images/banners/freshbasket-hero.png'
) | ForEach-Object { "$_ â†’ $(Test-Path $_)" }
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
