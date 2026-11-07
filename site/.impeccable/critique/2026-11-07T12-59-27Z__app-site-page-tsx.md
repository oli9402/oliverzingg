---
target: neon theme, whole site (home primary) — after fixes
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/oliverzingg/portfolio-website/site/app/(site)/page.tsx"
target_fingerprint: "sha256:0ecd73ef7eb8167e75147c6c36667d563cbafc746b7d8c75f852e6c0d6c393c3"
target_path: /Users/oliverzingg/portfolio-website/site/app/(site)/page.tsx
timestamp: 2026-11-07T12-59-27Z
slug: app-site-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser) — re-run after fixes

## Design Health Score: 25/36 (n/a: 10)
1 status 3 · 2 real world 3 · 3 control 2 · 4 consistency 3 · 5 error prevention 2 · 6 recognition 3 · 7 efficiency 3 · 8 minimalist 3 · 9 recovery 3 · 10 n/a
(3 and 5 were dragged down by a boot key-handler bug; fixed after the run.)

## Detector
437 CLI findings; 0 overflow at 360/390/1280/1440. Real defects found and fixed after the run: Press Start 2P at 9px (4 places), --dim/--text drift on home, VT323 leading 1.25. Accepted by design: 10px label floor, glow on neon text/LEDs, pixel bevels, ticker, timeline stripes, blinking cursors. False positives: design-system-color on clean-theme borders, katex font, empty stat-bar pips, cramped padding on full-bleed bands.

## Priority issues (all addressed after this run)
- [P0] Boot keydown listener stayed live after the boot was skipped: first Esc swallowed, digits navigated (even in the terminal). Fixed: listener removed when boot is skipped or finished; ignores inputs.
- [P1] Mobile timeline opened at 2018. Fixed: opens scrolled to today with an edge fade.
- [P1] Hero CTAs ambiguous ("VIEW RECORD" → timeline). Fixed: SEE PROJECTS / CV · EXPERIENCE.
- [P2] Timeline label collisions. Fixed: lane labels in a gutter, full names.
- [P2] Translucent bands under text. Fixed: near-solid void bands.
Minor fixed: /now bracket, databank wraps at slashes/dashes, 404 gets HUD + footer + dialogs, empty band before footer, thesis filters grouped, footer key hint.

## Open questions
- Should the current HSLU thesis (double ML) become the first case file once it has a write-up?
