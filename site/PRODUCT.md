# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) with static export (`output: 'export'`), so the build is plain HTML/CSS/JS that any static host can serve. Hosting is undecided (candidates: Vercel, Netlify, Cloudflare Pages, GitHub Pages, a VPS). Content lives as Markdown/MDX in the repo, migrated from the Quarto project at `../Portfolio-Quarto` (the old site stays as source material, not a dependency).

## Users

Primary: recruiters and hiring managers filling full-time data science and analytics roles, mainly in Switzerland. Oliver finishes his M.Sc. in Applied Information and Data Science (HSLU) in December 2026 and is looking for his first full-time role after that. These visitors are screening candidates. They need to judge competence, range and fit quickly, then reach the CV or contact details.

Secondary: peers and students who land on individual wiki pages while looking up a statistics, linear algebra or Python topic.

## Product Purpose

A personal portfolio and public knowledge base for Oliver Zingg. It exists to get him hired into data science. It does that by showing (a) completed work (theses, analyses, R/Python projects), (b) how deeply he understands the methods (the wiki), and (c) applied industry experience. Success: a hiring visitor leaves convinced enough to read the CV or get in touch.

## Positioning

Three angles, weighted equally:

1. **Psychology + data science.** Trained in research design, psychometrics and inferential statistics (M.Sc. Psychology, UZH) and in modern data science and ML (M.Sc. AIDS, HSLU). He can design a study as well as model the data it produces.
2. **Thinks in public.** The wiki shows how he learns and explains methods, from GLMs and mixed models to eigenvalues, RAG and LLMs. Depth of understanding is the evidence.
3. **Business impact.** Industry work for real stakeholders: Power BI dashboards and data landscape at Zurich Insurance, studies and BERTopic coding at Helsana, market research at TX Group.

No single angle should push out the others. The site should show the range.

## Operating Context

- The previous site was Quarto (`../Portfolio-Quarto`, served by GitHub Pages at `oli9402.github.io/Portfolio`, repo `github.com/oli9402/Portfolio`). Its posts and wiki pages are the content source; R/Python code outputs (plots, tables) come from its frozen renders.
- Posts and wiki pages contain code with outputs, math, and figures. Code and output must stay readable; math must render.
- Visitors arrive from LinkedIn, the CV PDF, job applications, or search (wiki pages).

## Capabilities and Constraints

- Pages: Home (hero, featured projects, wiki topics), About, Projects (listing of `posts/`), Wiki (docked sidebar: Statistics, Linear Algebra, Python, SQL, Research Methods), CV.
- **Language: English only.** The current German content (home hero lead, `CV.qmd`, CV PDF text) is to be translated over time. Do not add new German copy.
- `CV.qmd` is out of date. It still describes a 2024 job search for a marketing/UX internship and lacks the HSLU degree and the Zurich Insurance, Helsana and TX Group roles. The current source of truth is the CV PDF (`../CV-202611.pdf`, dated 2026-11-06).
- Must build to a static site deployable to any static host. No server-only features until hosting is chosen.

## Brand Commitments

- The user does not want a template look or hacker clichés (green-on-black, matrix rain, fake typing, glitch effects, sounds, boot screens).
- Standing preference (2026-11-07, replaces the 2026-11-06 "not techy" line): technical and terminal-inspired but clean, in light and dark. The site reads like an R session (calls and printed results, data-frame tables, real code and output), with a working command bar. Running text stays in a sans at reading size; monospace is for structure, tables and code.

- Name: Oliver Zingg. Site title "Oliver Zingg".
- Contact channels: email (oliver9402@gmail.com), GitHub (oli9402), LinkedIn, X.
- Voice in existing copy: friendly, first-person, modest ("written for my future self, shared in case they help someone else").

## Evidence on Hand

- Theses: Master's thesis (EEG, mixed-effects models, psychiatric disorders in children and adolescents; grade 6) and Bachelor's thesis (SVM vs. CNN for Alzheimer's classification from MRI; grade 6), in `posts/Masterarbeit/` and `posts/Bachelorarbeit/`.
- Projects in `posts/`: Google headlines sentiment analysis, first R package, Likert and semantic-differential visualisations, ggplot themes, Simpson's paradox, variable selection simulation, Quarto interactive presentations.
- Wiki: about 30 pages under `wiki/`.
- Degrees and grade averages: B.Sc. Psychology UZH (5.5, minor in film studies), M.Sc. Psychology UZH (5.6), M.Sc. AIDS HSLU (ongoing, ends Dec 2026).
- Work history: see CV PDF.
- Photos: `oliver.png` (rope swing, mountain valley), `oli.jpg`, `oli2.jpg`.
- **Absent, do not fabricate:** testimonials, client logos, quantified business results from the industry roles, publications.
