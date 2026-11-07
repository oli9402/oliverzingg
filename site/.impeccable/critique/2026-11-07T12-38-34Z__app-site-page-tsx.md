---
target: neon theme, whole site (home primary)
total_score: 24
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/oliverzingg/portfolio-website/site/app/(site)/page.tsx"
target_fingerprint: "sha256:0ecd73ef7eb8167e75147c6c36667d563cbafc746b7d8c75f852e6c0d6c393c3"
target_path: /Users/oliverzingg/portfolio-website/site/app/(site)/page.tsx
timestamp: 2026-11-07T12-38-34Z
slug: app-site-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score (neon theme, Experience mode)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Portrait spends most of its loop pixelated |
| 2 | Match system / real world | 2 | CASE FILES / DATABANK / RECORD / TRANSMIT / SCAN / OPS need translating |
| 3 | User control and freedom | 3 | Skip, clean toggle, sound off by default |
| 4 | Consistency and standards | 2 | Nav labels ≠ page titles; glyph icons mixed with SVG icons |
| 5 | Error prevention | 3 | Little input to get wrong |
| 6 | Recognition vs recall | 3 | Metaphor labels cost recognition |
| 7 | Flexibility and efficiency | 3 | Terminal, `/` search, dossier |
| 8 | Aesthetic and minimalist | 2 | Too many ambient layers; hero repeats itself |
| 9 | Error recovery | 3 | Terminal errors name the fix |
| 10 | Help and documentation | n/a | Portfolio |
| **Total** | | **24/36** | Acceptable, edge of Good |

## Design specificity verdict
Strongly authored: boot log, pixel covers drawn from each project, live Zürich weather, NEXT? slot. Weakness is vocabulary: generic cyberpunk/RPG labels, and nothing in the world says psychology except the EEG cover.
Detector: 524 CLI findings / 157 in-browser on 4 neon pages, 0 on clean home. 151 design-system-* are false positives (DESIGN.md documents only the clean theme and still bans neon). Real: undersized 8-10px Press Start labels (201), low contrast (footer hint 3.8:1, placeholders 3.8:1, databank count badge 2.7:1, case dim text 4.4:1), skipped headings (#### in thesis md, h1→h3 on /projects). Intentional-to-world: dark-glow, hard offset shadows, marquee ticker, stripes, blinking cursors (reduced-motion guarded).

## Priority issues
- [P1] Portrait hides the person: scan loop keeps the face pixelated most of the time. Fix: scan once on load, settle on the clean photo, pixel effect on hover. (animate / quieter)
- [P1] Jargon nav, mismatched page titles, no CV entry point. Fix: plain primary labels (PROJECTS, NOTES, EXPERIENCE·CV, NOW, CONTACT), flavour secondary; persistent DOSSIER/CV button. (clarify)
- [P1] Home order buries the work: 3 skill panels before any project; 10-cell bars turn ordinal CV wording into fake precision. Fix: case files right after timeline, skills in one compact strip with word levels. (layout, distill)
- [P2] Ambient noise and collisions: city signs behind headings, translucent HUD shows content through, truncated timeline blocks, 7px horizontal overflow on phones (HUD right cluster). (quieter, polish, adapt)
- [P2] Close and boot underserve recruiters: TRANSMIT offers only email; boot bottom-heavy, faint skip, wrapped dot leaders on mobile. (onboard, adapt)

## Persona red flags
- Hiring manager (90 s, laptop): waits ~3 s for boot, can't find "CV" (it's RECORD), face is noise, scrolls past RPG panels, thesis says "1 min read", two "Master's thesis" items unlabelled by school.
- Mobile visitor: 7px sideways scroll, timeline needs sideways scan, work ~4 screens down, databank filenames wrap mid-word.
- Non-technical recruiter: `ls`, `.md`, QUERY>, grep, OPS, SCAN, TERM at decision points; "Explore the city" has no stated outcome.
- Accessibility: 8-10px pixel labels, perpetual motion without reduced-motion setting.

## Minor
Terminal help column collision ("streetchange"), cat cv lines clipped; status-log date chip wraps; hero lede ~27ch; "dependet" typo; CASE 001–005 numbering and type kickers above titles (craft-floor ban); 2px blockquote side stripe; ▶ ◆ ♪ glyphs mixed with SVG icons; VT323 for the hero pitch and card summaries is the hardest face where the pitch lives.

## Questions
1. What if the dossier were the first fold, with the city as the reward behind "Explore"?
2. Where is the psychologist in this world?
3. If every label were plain English and only the visuals stayed neon, would anything be lost?

## Audit (technical)
| Dimension | Score | Key finding |
|---|---|---|
| Accessibility | 2 | 8-10px labels; 4 contrast fails; heading skips |
| Performance | 3 | Canvas city ~30 fps headless; paused when hidden/clean |
| Theming | 3 | Tokens per theme; DESIGN.md stale for neon |
| Responsive | 2 | 7px overflow at 390; footer links 20px tall; logo 12px tall target |
| Implementation integrity | 2 | Coherent world, but kickers/section numbers/fake-precision bars ride on it; design record contradicts the build |
| **Total** | **12/20** | Acceptable |
