# Oliver Zingg — portfolio and knowledge base

Next.js 16 (App Router, TypeScript), exported as a fully static site. No server, database or runtime needed to host it.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, hot reload
npm run build      # writes the static site to ./out
npm start          # serves ./out on http://localhost:3000 to check the real build
```

Node 20 or newer.

## Where things live

| Path | What |
| --- | --- |
| `lib/cv.ts` | Work, education, theses, skills, languages, certificates. Edit here to update the timeline, home page and Experience page together. `TODAY` moves the yellow "today" marker. |
| `lib/site.ts` | Name, email, links, site URL, and `cvPdf` (see below). |
| `content/projects/*.md` | One file per project. |
| `content/wiki/<area>/*.md` | Knowledge-base notes. Each area folder has an `_area.md` with its title, summary and order. |
| `public/media/` | Images used by projects and notes. |
| `app/` | Pages and routes. `app/globals.css` holds every design token and style. |
| `DESIGN.md` | The design system (colours, type, rules). Read it before adding new pages. |
| `PRODUCT.md` | Who the site is for and what it must say. |

## Add a project

Create `content/projects/my-project.md`:

```markdown
---
title: "Short, specific title"
summary: "One or two sentences shown on cards and in search."
year: 2026
kind: "Machine learning"        # used for the filter on /projects
tags: ["Python", "scikit-learn"]
order: 3                        # lower = earlier; the first five appear on the home page
cover: "/media/projects/my-project/cover.jpg"   # optional; put the file in public/media/...
---

## The question

Write in Markdown. Math works inline $\hat\beta$ and in blocks:

$$
\operatorname{logit}(p) = \beta_0 + \beta_1 x
$$

```python
print("code is highlighted")
```
```

Covers ending in `.png` or `.svg` are treated as charts (shown whole on white). Photos (`.jpg`) fill their frame.

## Add a note

Create `content/wiki/statistics/bayesian-inference.md` with `title` and `order` in the front matter, then write Markdown. A new area is a new folder with an `_area.md`. Notes get a table of contents (from `##`/`###` headings), previous/next links and search automatically.

## The old Quarto content

`scripts/migrate-quarto.mjs` converted `../Portfolio-Quarto/docs` (the rendered site, with R/Python outputs) into `content/`. Those files are `format: "html"` and have since been edited by hand (the Simpson's paradox post was translated to English), so the script refuses to run again unless you pass `--force`, which would overwrite those edits. For new writing use Markdown. To bring over a new Quarto analysis, render it in Quarto first, then copy the figures into `public/media/` and write the text in Markdown.

## CV download

`site.cvPdf` in `lib/site.ts` is `null`, so the Experience page offers **Save as PDF** (a print stylesheet turns the page into a clean CV). The PDF in `../CV-202611.pdf` includes your home address, phone number, date of birth and transcripts, so it is not published. To offer a PDF, export a public version, put it at `public/cv/Oliver-Zingg-CV.pdf`, and set `cvPdf: '/cv/Oliver-Zingg-CV.pdf'`.

## Deploy

`npm run build` produces `./out`. Upload that folder anywhere that serves static files. Set `SITE_URL` so the sitemap and social previews use your domain:

```bash
SITE_URL=https://your-domain.ch npm run build
```

- **Netlify / Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **Vercel:** import the repo; it detects Next.js. Static export works as is.
- **GitHub Pages (project site, e.g. `oli9402.github.io/Portfolio`):** build with `BASE_PATH=/Portfolio SITE_URL=https://oli9402.github.io/Portfolio npm run build`, then publish `out/` (add an empty `out/.nojekyll` so `_next/` is served).
- **Any server (nginx, a VPS):** copy `out/` to the web root. Pages are folders with `index.html` (`trailingSlash: true`), so no rewrite rules are needed; point 404s at `/404.html`.

If you later want server features (a contact form, analytics, drafts), remove `output: 'export'` from `next.config.ts` and host on a Node-capable platform.

## Search

`/search-index.json` is generated at build time from every project and note. The search dialog (press `/` or ⌘K) loads it on first use and searches entirely in the browser.
