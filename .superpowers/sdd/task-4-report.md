# Task 4: End-to-end verification report

Working directory: C:\xampp\htdocs\bizpilot-demos

Checklist (PASS/FAIL)

1. Image files exist (advocate, jewellery, kirana) — PASS
2. `index.html` shows large BizPilot brand; demos not inside hero — PASS
3. Hero does not contain lookbook rows (lookbook is separate) — PASS
4. Three lookbook rows present with correct hrefs (advocate-demo/, jewellery-demo/, kirana-demo/) — PASS
5. Scroll cue links to `#lookbook` and page uses smooth scroll — PASS
6. Fonts: Fraunces + Outfit linked in head — PASS
7. CSS: hero `min-height` includes `100vh` and `100dvh` — PASS
8. CSS: lookbook uses light stone background (`--lookbook-bg`) — PASS
9. CSS: `.lookbook-row.zivara` alternate layout present — PASS
10. CSS: `prefers-reduced-motion` rules present and disable animations — PASS
11. No `.demo-card` class present in launcher CSS/JS — PASS
12. JS: `IntersectionObserver` present and reduced-motion path handled — PASS
13. JS: launcher.js contains no `pointermove` or `--ry` usage — PASS
14. HTTP check: `http://localhost/bizpilot-demos/index.html` — FAIL (no response / server not reachable)

Notes and concerns
- All launcher-specific checks passed. Images were opened successfully from disk.
- The local HTTP server (XAMPP) did not respond to a request during verification; please ensure XAMPP/Apache is running if an HTTP verification is required.
- Several demo subdirectories contain `pointermove` handlers and CSS vars like `--review-ry` (used for tilt effects) in their own demo JS/CSS (expected). The launcher (assets/js/launcher.js) intentionally avoids pointermove and tilt behavior.

Actions taken
- Reviewed: `index.html`, `assets/css/launcher.css`, `assets/js/launcher.js`
- Read image files to confirm presence.
- Attempted HTTP GET; received no response.

No code changes were necessary; no commits were made.

Additional actions
- 2026-07-31: Normalized launcher special characters in `index.html` and converted mojibake CSS comments to ASCII in `assets/css/launcher.css`. Replaced lookbook arrows with `&rarr;` (3 instances), `©` with `&copy;`, and title em dash with `&mdash;`. Committed changes.

