---
name: Oliver Zingg
description: Portfolio and public knowledge base of a psychologist and data scientist in Zürich.
colors:
  ultramarine: "#2340d9"
  ultramarine-deep: "#1a31b0"
  ultramarine-mist: "#dce2ff"
  ultramarine-wash: "#eef1ff"
  signal-yellow: "#ffd84d"
  signal-yellow-deep: "#f2c200"
  ink: "#101322"
  ink-soft: "#2b3047"
  slate: "#5a5f72"
  rule: "#e4e5ea"
  rule-strong: "#cfd1da"
  paper: "#ffffff"
  surface: "#f4f5f9"
  night-mute: "#b9bdd0"
typography:
  display-name:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(64px, 10.4vw, 150px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  page-title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(40px, 5.6vw, 80px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  section-title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(34px, 4vw, 56px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  article-title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 58px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  prose-h2:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17.5px"
    fontWeight: 400
    lineHeight: 1.7
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  pill: "999px"
spacing:
  gutter: "40px"
  gutter-mobile: "16px"
  wrap: "1280px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.signal-yellow-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  button-ink-hover:
    backgroundColor: "{colors.ultramarine}"
  button-ghost-on-blue:
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  tab:
    textColor: "{colors.slate}"
    rounded: "7px"
    padding: "10px 18px"
  tab-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  badge-now:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "2px 7px"
  callout:
    backgroundColor: "{colors.ultramarine-wash}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
    padding: "18px 22px"
---

# Design System: Oliver Zingg

## Overview

**Creative North Star: "The Confident Standard"**

A classic portfolio structure, executed with total commitment. The site does not hide behind a metaphor. It says who Oliver is in the first viewport with a full-bleed ultramarine field and his name set as monumental wide capitals, then gets out of the way so projects, notes and experience can be read. Boldness comes from scale and colour at page size, never from effects.

Inner pages carry the world through a slim ultramarine title band and the same wide display type, then settle into a quiet white reading surface built for long notes with code, formulas and figures. Daylight-office scene: light ground, high contrast, no dark mode.

**Key Characteristics:**
- One saturated field (ultramarine) that owns whole regions: the hero, page title bands.
- Signal yellow used only for "now" and the single primary action.
- Archivo throughout; display set extra-wide (`font-stretch: 125%`) and uppercase only for the name.
- Hairline rules (1px `#e4e5ea`) and one heavy 2px ink rule under section heads.
- Flat surfaces; shadow appears only to lift something under the pointer.

## Colors

Restrained ground, committed field: white and cool neutrals for reading, ultramarine as the identity colour at page scale, yellow as a signal.

### Primary
- **Zürich Ultramarine** (`#2340d9`): the hero field, page title bands, links, active states, the knowledge counts. Text on it is white or Ultramarine Mist.
- **Deep Ultramarine** (`#1a31b0`): code keywords, callout titles, selected wiki nav text.
- **Ultramarine Mist** (`#dce2ff`): secondary text on the blue field (passes AA on `#2340d9`).
- **Ultramarine Wash** (`#eef1ff`): callouts, education bars, selected nav item, hover wash on rows.

### Secondary
- **Signal Yellow** (`#ffd84d`): the primary button, "Now" badges, the today marker, the closing contact band, text selection.

### Neutral
- **Ink** (`#101322`): text, the status strip, footer, current-job bar.
- **Soft Ink** (`#2b3047`): prose body text.
- **Slate** (`#5a5f72`): metadata, secondary text (5.9:1 on white).
- **Rule** (`#e4e5ea`) / **Strong Rule** (`#cfd1da`): hairlines, input borders.
- **Surface** (`#f4f5f9`): chips, tab track, work bars, table heads.

### Named Rules
**The One Field Rule.** Ultramarine appears at page scale (hero, title bands) or as small functional accents. Never as a mid-size decorative card fill.

**The Signal Rule.** Yellow means "now" or "act here". One yellow action per viewport.

## Typography

**Display and body:** Archivo (variable, `wght` + `wdth` axes, self-hosted via `next/font`).
**Code:** JetBrains Mono, only for code, timeline years and keyboard hints.

**Character:** one grotesque doing every job. Hierarchy comes from width and weight (800 at 112–125% width for display, 400 at 100% for reading), not from a second face.

### Hierarchy
- **Name** (800, `clamp(64px, 10.4vw, 150px)`, 0.86, 125% width, uppercase): the home hero only.
- **Page title** (800, `clamp(40px, 5.6vw, 80px)`, 118% width): title bands.
- **Section title** (800, `clamp(34px, 4vw, 56px)`, 112% width): home sections.
- **Article title** (800, `clamp(34px, 4.2vw, 58px)`): project and note pages.
- **Prose H2/H3** (800/700, 30px/22px): inside articles.
- **Body** (400, 17px/1.6); **prose** (400, 17.5px/1.7, max 72ch).

### Named Rules
**The Width Rule.** Wide (125%) uppercase is reserved for the name and the brand mark. Everything else stays sentence case.

## Layout

12-column thinking inside a 1280px wrap with 40px gutters (16px under 960px). Sections are separated by 80–112px of space and introduced by a section head that sits on a 2px ink rule. Reading pages use a three-column doc grid: wiki nav (240px), prose (fluid, 72ch measure), table of contents (220px); the side columns drop away below 1180px and 900px.

The timeline is a fixed-proportion axis (one column per year, 2018 to 2027) that scrolls horizontally on small screens and opens scrolled to the present.

## Elevation & Depth

Flat by default. Depth is a response to the pointer, not a resting state.

### Shadow Vocabulary
- **Lift** (`0 12px 24px -14px rgba(16,19,34,.45)`): timeline bars on hover/focus.
- **Tab** (`0 2px 8px -2px rgba(16,19,34,.18)`): the selected tab only.
- **Dialog** (`0 32px 80px -24px rgba(16,19,34,.5)`): the search dialog.

### Named Rules
**The Flat-At-Rest Rule.** Nothing carries a shadow at rest except the selected tab and open dialogs.

## Shapes

Gently squared corners: 6px for buttons, bars and images, 10px for larger containers (code blocks, callouts, pager cards), pills only for chips and filters. Photos and figures never get circular masks.

## Components

### Buttons
- **Primary** (Signal Yellow, ink text, 6px, 14px 22px, 600): one per viewport. Hover deepens to `#f2c200` and lifts 1px.
- **Ink** (ink fill, white text): contact and print actions; hover turns ultramarine.
- **Ghost** (1.5px border): outlined white on blue, strong rule on white.

### Tabs
Segmented control on a Surface track; the selected tab is a white pill with the Tab shadow. Arrow keys move between tabs.

### Project card
Image (4:3, 16:9.4 when wide) with type and year on one row, then a 22px bold title. Photos fill with `cover`; R/Python figures (`.png`/`.svg`) are framed on white with `contain`, so charts are never cropped.

### Timeline bar
Education bars sit above a 2px ink axis in Ultramarine Wash (ongoing: solid ultramarine); work bars below in Surface (ongoing: ink). The today marker is a yellow rule with a yellow label. The future slot is a dashed ultramarine outline.

### Prose
Migrated Quarto HTML and Markdown share one style: tinted code blocks with a single syntax palette (keywords deep ultramarine, strings green, numbers amber, comments slate italic), dashed borders on code output, "Show code" toggles as wash pills, callouts as tinted panels with no side stripe, and KaTeX math.

## Do's and Don'ts

### Do:
- **Do** keep the ultramarine field full-bleed: hero and title bands span the viewport.
- **Do** frame plots on white with `object-fit: contain`.
- **Do** use real facts in the "now" signals (status strip, badges, today marker) and update them in `lib/cv.ts`.
- **Do** keep reading text at 72ch and 17.5px.

### Don't:
- **Don't** add a dark or "techy" theme, neon, glow or terminal styling (user-confirmed anti-reference).
- **Don't** add eyebrow labels above headings or decorative section numbers.
- **Don't** use coloured side stripes on callouts or cards, gradient text, glass, or hard offset shadows.
- **Don't** introduce a second display face; width and weight carry hierarchy.
- **Don't** invent metrics or skill ratings; every number on the site is a count or a date.
