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

## Writing posts and notes

Everything in `content/` is plain Markdown. No R, Quarto or build step is needed to write.

**Start a new one:**

```bash
npm run new -- project "Double machine learning for pricing"
npm run new -- note statistics "Bayesian inference"
npm run new -- note causal-inference "Instrumental variables"   # new area, folder is created
```

That creates the file with its front matter filled in. Run `npm run dev` and the page updates as you type. You can also edit any file directly on github.com (open it, click the pencil, commit); the site redeploys in about two minutes.

**Front matter (projects):**

```yaml
---
title: "Short, specific title"
summary: "One or two sentences shown on cards and in search."
year: 2026
kind: "Machine learning"        # the filter on /projects
tags: ["Python", "scikit-learn"]
order: 3                        # lower comes first; the first five are on the home page
cover: "/media/projects/my-project/cover.jpg"   # optional
---
```

Notes only need `title` and `order`. Each area folder has an `_area.md` with the area's title, summary and order.

**What you can write:**

| You write | You get |
| --- | --- |
| `## Heading`, `### Subheading` | Sections and the "On this page" list |
| `$\hat\beta$` | Inline math |
| `$$` on its own line, TeX, `$$` | Display math (use `aligned`, not `align`, inside it) |
| A fenced block with a language, e.g. three backticks plus `r` or `python` | Highlighted code; blocks over 12 lines start folded behind "Show code" |
| A fenced block marked `output` | Printed program output (dashed box) |
| `![Alt text](/media/projects/my-project/plot.png)` | An image; put the file in `public/media/...` |
| `> [!NOTE] Optional title` followed by `> text` lines | A callout. Also `TIP`, `IMPORTANT`, `WARNING`, `CAUTION` |
| `\$` | A literal dollar sign (a bare `$` starts math) |
| GitHub-style tables, lists, links, footnotes | As usual |

Covers ending in `.png` or `.svg` are treated as charts (shown whole on white). Photos (`.jpg`) fill their frame.

To show results from R or Python, run the code wherever you like, paste the code into a code block, paste printed results into an `output` block, and save plots as images in `public/media/`.

## CV download

`site.cvPdf` in `lib/site.ts` is `null`, so the Experience page offers **Save as PDF** (a print stylesheet turns the page into a clean CV). The PDF in `../CV-202611.pdf` includes your home address, phone number, date of birth and transcripts, so it is not published. To offer a PDF, export a public version, put it at `public/cv/Oliver-Zingg-CV.pdf`, and set `cvPdf: '/cv/Oliver-Zingg-CV.pdf'`.

## Deploy

`npm run build` produces `./out`. Upload that folder anywhere that serves static files. Set `SITE_URL` so the sitemap and social previews use your domain:

```bash
SITE_URL=https://your-domain.ch npm run build
```

- **Netlify / Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **Vercel:** import the repo; it detects Next.js. Static export works as is.
- **GitHub Pages (set up):** `.github/workflows/deploy.yml` builds and publishes on every push to `main`, at `https://oli9402.github.io/oliverzingg/`. One-time step: in the repo, Settings → Pages → Source: **GitHub Actions**. To preview that exact build locally: `BASE_PATH=/oliverzingg npm run build`.
- **Custom domain later:** add the domain in Settings → Pages, put the domain name in `site/public/CNAME`, and in the workflow set `BASE_PATH: ""` and `SITE_URL: https://your-domain`.
- **Any server (nginx, a VPS):** copy `out/` to the web root. Pages are folders with `index.html` (`trailingSlash: true`), so no rewrite rules are needed; point 404s at `/404.html`.

If you later want server features (a contact form, analytics, drafts), remove `output: 'export'` from `next.config.ts` and host on a Node-capable platform.

## Search

`/search-index.json` is generated at build time from every project and note. The search dialog (press `/` or ⌘K) loads it on first use and searches entirely in the browser.
