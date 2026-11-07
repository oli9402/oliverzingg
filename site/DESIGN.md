---
name: Oliver Zingg
description: Portfolio and public knowledge base of a psychologist and data scientist in Zürich. Default theme neon (16-bit night city); secondary theme clean (ultramarine).
colors:
  void: "#07040f"
  panel: "#0b071c"
  violet: "#7b4dff"
  violet-deep: "#3a2580"
  pink: "#ff2e88"
  pink-deep: "#a3125a"
  cyan: "#3ef2ff"
  cyan-deep: "#127a8a"
  amber: "#ffb238"
  amber-deep: "#9a5a00"
  text: "#ece7ff"
  reading: "#e4defa"
  dim: "#a39bc9"
  dim-soft: "#b9b1de"
  bezel-text: "#b3abd9"
  on-accent: "#12001f"
  frame-dark: "#2a1f5c"
  black: "#000000"
  status-blue-deep: "#0d1458"
  status-text: "#c9d1ff"
  edu-text: "#cbbcff"
  work-text: "#ffc2dc"
  billboard-white: "#fff3fb"
  status-blue: "#18238a"
  status-gold: "#ffd84d"
  clean-ultramarine: "#2340d9"
  clean-ink: "#101322"
  clean-yellow: "#ffd84d"
  clean-paper: "#ffffff"
typography:
  name-display:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: "clamp(34px, 6.2vw, 84px)"
    fontWeight: 400
    lineHeight: 1.08
  page-title:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: "clamp(20px, 3.2vw, 38px)"
    fontWeight: 400
    lineHeight: 1.4
  title:
    fontFamily: "'Pixelify Sans', 'VT323', monospace"
    fontSize: "clamp(28px, 3.6vw, 48px)"
    fontWeight: 700
    lineHeight: 1.1
  card-title:
    fontFamily: "'Pixelify Sans', monospace"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
  ui:
    fontFamily: "'VT323', monospace"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.3
  label:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  clean-display:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(64px, 10.4vw, 150px)"
    fontWeight: 800
    lineHeight: 0.86
  clean-body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  monitor: "16px"
  status-window: "8px"
  clean-md: "6px"
  clean-lg: "10px"
spacing:
  hud: "68px"
  wrap: "1240px"
  gutter: "24px"
  section: "110px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "15px 18px"
  button-ghost:
    textColor: "{colors.cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "15px 18px"
  hud-link:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    padding: "10px 8px"
  dossier-button:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    padding: "10px 12px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "28px"
  chip:
    backgroundColor: "#24165a"
    textColor: "#d6ccff"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  badge-now:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    padding: "4px 6px"
  clean-button-primary:
    backgroundColor: "{colors.clean-yellow}"
    textColor: "{colors.clean-ink}"
    typography: "{typography.clean-body}"
    rounded: "{rounded.clean-md}"
    padding: "14px 22px"
---

# Design System: Oliver Zingg

## Overview

**Creative North Star: "Night Shift in the Zürich Sector"**

The site is a 16-bit night city you look out over while reading someone's file. A live pixel skyline fills the background and follows Zürich's real time of day and weather. Content sits on solid dark panels in front of it, so the world sets the mood and never competes with the reading. The world is built from Oliver's own facts: the boot log mounts his degrees, each project has pixel cover art drawn from what it is about, and the timeline ends in an empty "NEXT?" slot.

The world serves a hiring manager's 90 seconds first: a quick dossier one click away, plain-language navigation, the photo sharp after one scan, projects right after the hero. The flavour lives in headings, art, motion and the terminal, never in the words a visitor has to decode to find the CV.

A second, **clean** theme (ultramarine field, Archivo, white reading surface) is one toggle away for visitors who don't want the 16-bit look. Both themes render the same pages; `<html data-theme>` picks the chrome. Clean-theme styles live in `app/globals.css`, neon in `app/theme-neon.css` and `app/theme-neon-home.css`.

**Key Characteristics:**
- A living backdrop: rooftop parallax city on overview pages, a rain-streaked apartment window behind reading pages.
- Solid reading panels with 4px violet frames over the city; the header is opaque.
- Three pixel voices with clear jobs: Press Start 2P for short labels and page titles, Pixelify Sans for long titles, VT323 for UI copy; JetBrains Mono for anything read at length.
- Neon accents with roles: amber = primary action and "now", cyan = links and focus, pink = markers and current entry, violet = frames and selection.
- Each home section has its own form: CRT monitor wall, JRPG status window, terminal window, neon billboard.

## Colors

### Primary
- **Sodium Amber** (#ffb238): primary buttons, the DOSSIER button, "NOW" badges, the today marker, section titles.
- **Signal Cyan** (#3ef2ff): links, focus rings, the terminal frame, active states on reading pages.

### Secondary
- **Neon Pink** (#ff2e88): prefix markers (`>`, `##`), the current timeline block, the HUD's bottom rule, terminal errors.
- **Grid Violet** (#7b4dff): panel frames, selected nav items, education blocks.

### Neutral
- **Void** (#07040f): page ground, HUD, footer.
- **Panel** (rgba(11,7,28,0.95)): reading surfaces over the city.
- **On-accent ink** (#12001f): text on amber and cyan fills.
- **Phosphor White** (#ece7ff) for UI text, **Reading** (#e4defa) for prose; **Dim Lilac** (#a39bc9) for secondary text (at least 4.5:1 on void). Use #b3abd9 on the lighter monitor bezels.

### Clean theme
Ultramarine #2340d9 owns the hero and title bands; ink #101322; signal yellow #ffd84d for "now" and the single primary action; white reading ground.

### Named Rules
**The Readable Ground Rule.** Text never sits directly on the moving city. Every block of copy, section head and link row has a solid or near-solid void/panel behind it.

**The Accent Job Rule.** Each neon colour has one job (above). Don't use amber for a link or cyan for a primary action.

## Typography

**Display:** Press Start 2P · **Titles:** Pixelify Sans · **UI:** VT323 · **Reading:** JetBrains Mono · **Clean theme:** Archivo.

### Hierarchy
- **Name** (Press Start 2P, clamp(34px, 6.2vw, 84px), chromatic offset shadow): home hero only.
- **Page title** (Press Start 2P, clamp(20px, 3.2vw, 38px), amber with a hard 3px shadow).
- **Long titles** (Pixelify Sans 600–700): project cards 20–27px, article titles clamp(28px, 3.6vw, 48px), note headings 21–27px.
- **UI copy** (VT323 20–22px): ledes, meta, nav lists, chips.
- **Labels** (Press Start 2P, 10–11px floor): HUD links, buttons, card meta rows, timeline years.
- **Reading** (JetBrains Mono 16px/1.8, max 76ch): notes, articles, experience bullets, terminal.

### Named Rules
**The Pixel Budget Rule.** Press Start 2P only for strings of about four words or fewer. Longer strings move to Pixelify Sans; anything read for more than a sentence moves to JetBrains Mono.

**The 10px Floor.** No Press Start 2P below 10px.

## Layout

A 1240px wrap with 24px gutters. Sections are separated by about 110px. Section heads sit on a dark band (a void gradient) with the title left and a one-line description right.

The home order is: hero, status ticker, case files, mission log (timeline plus status window), databank, contact billboard.

Reading pages use a three-column doc grid (wiki nav, prose, TOC) that collapses below 1180px and 900px. The header fits from 360px up: the clock and the terminal link drop out first, and sound moves into the menu on phones.

## Elevation & Depth

Depth comes from layers, not blur. The city sits at the back, and panels have a 4px frame with an inset 4px tint. Buttons use a hard 4px zero-blur offset shadow, the native bevel of pixel UI, which collapses on press.

### Shadow Vocabulary
- **Pixel bevel** (`4px 4px 0 <deep accent>`): buttons; `2px` on hover, `0` on press.
- **Monitor** (inset bezel plus a soft drop): case-file CRTs only.
- **Glow** (`0 0 8–28px <accent>`): neon text and LEDs only, never on panels.

### Named Rules
**The Bevel-Not-Blur Rule.** Interactive elements get hard offset bevels; soft blurred shadows are reserved for the monitor wall and dialogs.

## Shapes

Square by default (0 radius), with stepped pixel corners on panels. Three exceptions, each with a reason: CRT monitors (16px bezel, curved screens), the JRPG status window (8px), and the clean theme (6–10px).

## Components

### HUD (header)
Opaque void bar with a 4px pink rule. The logo is left. In the middle, plain labels in Press Start 2P 10px: PROJECTS · NOTES · EXPERIENCE · CV · NOW · CONTACT · SEARCH · TERMINAL. On the right: the amber DOSSIER button, Zürich time and weather, sound, and CLEAN MODE. The current page is marked in amber with an underline.

### Buttons
- **Primary:** amber fill, void text, pixel bevel.
- **Ghost:** cyan text with a 3px cyan inset outline and a cyan bevel.

### Case-file card (project)
A 16:10 screen showing the project's generated pixel art (`components/PixelCover.tsx`). Hover switches channel to the real image with a static flash. A pink meta row sits above the Pixelify title, then a VT323 summary.

### Quick dossier
An amber-framed dialog: role, status, thesis, education, tools, three top projects, email and the full record. Reachable from the HUD, the boot menu ([1]) and the terminal (`dossier`).

### Timeline (mission log)
Education sits above a pink axis and work below; the current entry is filled. A "YOU ARE HERE" marker sits at today and a dashed amber "NEXT?" slot at 2027. Narrow blocks show one full word.

### Terminal
A cyan-framed dialog opened with the backtick key. JetBrains Mono, with commands, tab completion and history.

### Prose
Notes and articles: JetBrains Mono on a solid panel. h2 in Pixelify Sans amber with a `##` marker, h3 in cyan. Code sits on near-black, program output in dashed cyan boxes, and plots on white frames so R charts stay legible. Callouts are tinted frames with no side stripe.

## Do's and Don'ts

### Do:
- **Do** keep every piece of copy on a solid panel or dark band (The Readable Ground Rule).
- **Do** lead navigation and calls to action with plain words; keep the world's flavour in headings, art and the terminal.
- **Do** keep the portrait sharp at rest: one scan on load, replay on hover.
- **Do** give new projects an `art:` scene or rely on the `kind` fallback, so every case file has a cover.
- **Do** respect `prefers-reduced-motion`: freeze the city, skip transitions, show the photo clean.

### Don't:
- **Don't** set Press Start 2P below 10px or on anything longer than about four words.
- **Don't** put text directly on the animated city or behind a translucent header.
- **Don't** invent numbers. Skill bars map the CV's own words (very good 9, good 7, good basics 5); every other number is a count or a date.
- **Don't** add another background animation layer on top of the city, CRT and ticker.
- **Don't** use gradient text, glass panels, or coloured side stripes wider than 1px.
