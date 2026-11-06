#!/usr/bin/env node
/**
 * One-off migration: Quarto site (../Portfolio-Quarto/docs, already rendered with
 * frozen R/Python outputs) -> content/*.md files with `format: html` bodies.
 *
 * Usage: npm run migrate -- --force
 * Migrated files have since been edited by hand (translations, labels), so the
 * script refuses to run without --force, which overwrites them.
 */
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import katex from 'katex';

const ROOT = path.resolve(import.meta.dirname, '..');
const QUARTO = path.resolve(ROOT, '../Portfolio-Quarto/docs');
const CONTENT = path.join(ROOT, 'content');
const MEDIA = path.join(ROOT, 'public/media');

/** posts/<dir> -> project */
const PROJECTS = [
  { dir: 'Masterarbeit', slug: 'masters-thesis', order: 1, year: 2023, kind: "Master's thesis",
    title: 'Learning and memory formation in children and adolescents with psychiatric disorders',
    summary: 'EEG data from children and adolescents with various psychiatric disorders, analysed with linear mixed-effects models to track successful learning. Graded 6.',
    tags: ['EEG', 'Mixed-effects models', 'Psychiatric disorders', 'R'] },
  { dir: 'Bachelorarbeit', slug: 'bachelors-thesis', order: 2, year: 2021, kind: "Bachelor's thesis",
    title: "Support vector machines vs. CNNs for Alzheimer's disease classification",
    summary: 'A systematic review comparing classical machine learning and deep learning for classifying Alzheimer’s disease from MRI images. Graded 6.',
    tags: ['Machine learning', 'MRI', 'Systematic review'] },
  { dir: 'Simpsons_Paradox', slug: 'simpsons-paradox', order: 3, year: 2023, kind: 'Statistics',
    title: "Simpson's paradox and mixed-effects models",
    summary: 'How a trend can flip once you account for hierarchical structure, shown with the palmerpenguins data and random effects.',
    tags: ['Mixed-effects models', 'Random effects', 'R'] },
  { dir: 'Visualizing Likert Scale', slug: 'likert-scales', order: 4, year: 2024, kind: 'Visualisation',
    title: 'Visualising Likert scales',
    summary: 'Diverging bar plots that make positive and negative opinions in survey data readable at a glance.',
    tags: ['Survey data', 'ggplot2'] },
  { dir: 'Presentation using Quarto', slug: 'quarto-presentations', order: 5, year: 2024, kind: 'Tools',
    title: 'Interactive presentations with Quarto',
    summary: 'Reveal.js slides with interactive echarts4r plots, rendered to a single HTML file anyone can open.',
    tags: ['Quarto', 'echarts4r', 'Reveal.js'] },
  { dir: 'Google Headlines Sentiment Analysis', slug: 'headline-sentiment', order: 6, year: 2023, kind: 'NLP',
    title: 'Sentiment analysis of Google News headlines',
    summary: 'Scraping news headlines and scoring their sentiment in Python.',
    tags: ['Python', 'Sentiment analysis', 'Web scraping'] },
  { dir: 'Semdif', slug: 'semantic-differential', order: 7, year: 2024, kind: 'Visualisation',
    title: 'Visualising semantic differential scales',
    summary: 'Plotting User Experience Questionnaire results, where people rate a product between pairs of opposite adjectives.',
    tags: ['UX research', 'Survey data', 'ggplot2'] },
  { dir: 'variable_selection', slug: 'variable-selection', order: 8, year: 2022, kind: 'Simulation',
    title: 'How sample size affects variable selection',
    summary: 'A simulation of how often lm() and stepwise selection pick the true predictors as the sample grows.',
    tags: ['Simulation', 'Regression', 'R'] },
  { dir: 'confidence_intervals', slug: 'confidence-intervals', order: 9, year: 2023, kind: 'Statistics',
    title: 'Confidence intervals by simulation',
    summary: 'Simulating repeated samples of voters to show what a 95% confidence interval does and does not promise.',
    tags: ['Simulation', 'Inference', 'R'] },
  { dir: 'Data Visualization with R', slug: 'ggplot-annotations', order: 10, year: 2023, kind: 'Visualisation',
    title: 'Themes and annotations in ggplot2',
    summary: 'Using themes and annotations to surface the story in a chart, with the gapminder data.',
    tags: ['ggplot2', 'Visualisation', 'R'] },
  { dir: 'Theme', slug: 'company-theme', order: 11, year: 2023, kind: 'Visualisation',
    title: 'Building a company theme for ggplot2',
    summary: 'A reusable ggplot2 theme for consistent, on-brand charts.',
    tags: ['ggplot2', 'Design systems', 'R'] },
  { dir: 'First R Package', slug: 'first-r-package', order: 12, year: 2024, kind: 'Tools',
    title: 'Building my first R package',
    summary: 'Notes on structuring an R package: dependencies, DESCRIPTION files, documentation and testing.',
    tags: ['R', 'Package development'] },
];

const AREAS = {
  statistics: { title: 'Statistics', order: 1, summary: 'Statistical modelling and machine learning, from confidence intervals to graph neural networks.' },
  'linear-algebra': { title: 'Linear algebra', order: 2, summary: 'The maths underneath the models: linear systems, bases, linear maps and eigenvalues.' },
  python: { title: 'Python & ML engineering', order: 3, summary: 'Working notes on Python, retrieval-augmented generation, LLMs and git.' },
  sql: { title: 'SQL', order: 4, summary: 'How queries are executed, with exercises.' },
  'research-methods': { title: 'Research methods', order: 5, summary: 'Designing studies and questionnaires people can trust.' },
};

/** wiki/<file>.html -> note */
const NOTES = [
  { src: 'wiki/Statistics/ci.html', area: 'statistics', slug: 'confidence-intervals', title: 'Confidence intervals', order: 1 },
  { src: 'wiki/Statistics/glm.html', area: 'statistics', slug: 'generalized-linear-models', title: 'Generalized linear models', order: 2 },
  { src: 'wiki/Statistics/modeldiagnostic.html', area: 'statistics', slug: 'model-diagnostics', title: 'Model diagnostics', order: 3 },
  { src: 'wiki/Statistics/longitudinal.html', area: 'statistics', slug: 'longitudinal-data', title: 'Longitudinal data', order: 4 },
  { src: 'wiki/Statistics/graphNN.html', area: 'statistics', slug: 'graph-neural-networks', title: 'Graph neural networks', order: 5 },
  { md: 'scripts/source/dl.md', area: 'statistics', slug: 'deep-learning-cheatsheet', title: 'Deep learning cheatsheet', order: 6 },
  { src: 'wiki/LinAlg/sys.html', area: 'linear-algebra', slug: 'systems-of-linear-equations', title: 'Systems of linear equations', order: 1 },
  { src: 'wiki/LinAlg/basis.html', area: 'linear-algebra', slug: 'basis', title: 'Basis and dimension', order: 2 },
  { src: 'wiki/LinAlg/linear-maps.html', area: 'linear-algebra', slug: 'linear-maps', title: 'Linear maps', order: 3 },
  { src: 'wiki/LinAlg/eigen.html', area: 'linear-algebra', slug: 'eigenvalues', title: 'Eigenvalues and eigenvectors', order: 4 },
  { src: 'wiki/LinAlg/norm.html', area: 'linear-algebra', slug: 'orthonormal-basis', title: 'Orthonormal bases', order: 5 },
  { src: 'wiki/Python/basics.html', area: 'python', slug: 'python-basics', title: 'Python basics', order: 1 },
  { src: 'wiki/Python/rag.html', area: 'python', slug: 'retrieval-augmented-generation', title: 'Retrieval-augmented generation', order: 2 },
  { src: 'wiki/Python/LLM.html', area: 'python', slug: 'large-language-models', title: 'Large language models', order: 3 },
  { src: 'wiki/Python/git.html', area: 'python', slug: 'git', title: 'Git', order: 4 },
  { src: 'wiki/SQL/index.html', area: 'sql', slug: 'sql-exercises', title: 'SQL execution order and exercises', order: 1 },
  { src: 'wiki/DOE/doe.html', area: 'research-methods', slug: 'research-design', title: 'Research design', order: 1 },
  { src: 'wiki/Questionnaires/start.html', area: 'research-methods', slug: 'questionnaires', title: 'Questionnaires', order: 2 },
];

// old rendered path -> new route, for rewriting internal links
const ROUTES = new Map();
for (const p of PROJECTS) ROUTES.set(`posts/${p.dir}/index.html`, `/projects/${p.slug}/`);
for (const n of NOTES) if (n.src) ROUTES.set(n.src, `/wiki/${n.area}/${n.slug}/`);
ROUTES.set('wiki/Statistics/dl.html', '/wiki/statistics/deep-learning-cheatsheet/');
ROUTES.set('wiki/Statistics/dl.pdf', '/wiki/statistics/deep-learning-cheatsheet/');
ROUTES.set('wiki.html', '/wiki/');
ROUTES.set('projects.html', '/projects/');
ROUTES.set('index.html', '/');
ROUTES.set('CV.html', '/experience/');
ROUTES.set('about.html', '/experience/');

function yaml(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(', ')}]`);
    else lines.push(`${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function copyAsset(absSrc, collection, slug) {
  if (!fs.existsSync(absSrc) || fs.statSync(absSrc).isDirectory()) return null;
  const name = path.basename(absSrc).replace(/\s+/g, '-');
  const destDir = path.join(MEDIA, collection, slug);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(absSrc, path.join(destDir, name));
  return `/media/${collection}/${slug}/${name}`;
}

function renderMath(tex, display) {
  return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false, output: 'html' });
}

function convertHtml(relSrc, collection, slug) {
  const abs = path.join(QUARTO, relSrc);
  const dir = path.dirname(abs);
  const $ = cheerio.load(fs.readFileSync(abs, 'utf8'));
  const main = $('#quarto-document-content');

  main.find('header#title-block-header, .quarto-title-banner, script, style, .anchorjs-link, .code-copy-button, #quarto-margin-sidebar, nav').remove();
  // empty line-number anchors inside code blocks
  main.find('pre a[aria-hidden="true"]').each((_, a) => { if (!$(a).text().trim()) $(a).remove(); });
  main.find('.code-with-copy').removeClass('code-with-copy');
  main.find('details.code-fold > summary').text('Show code');

  // tabsets -> stacked panels with their tab label as a heading
  main.find('.panel-tabset').each((_, ts) => {
    const labels = $(ts).find('[role="tab"], .nav-link').map((i, e) => $(e).text().trim()).get();
    $(ts).find('ul.nav, [role="tablist"]').remove();
    $(ts).find('.tab-pane').each((i, pane) => {
      $(pane).removeClass('fade tab-pane active show').addClass('tab-panel');
      if (labels[i]) $(pane).prepend(`<h4 class="tab-label">${labels[i]}</h4>`);
    });
    $(ts).removeClass('panel-tabset').addClass('stacked-tabs');
  });

  // math
  main.find('.math.inline').each((_, el) => {
    const tex = $(el).text().replace(/^\\\(/, '').replace(/\\\)$/, '');
    $(el).replaceWith(renderMath(tex, false));
  });
  main.find('.math.display').each((_, el) => {
    const tex = $(el).text().replace(/^\\\[/, '').replace(/\\\]$/, '');
    $(el).replaceWith(renderMath(tex, true));
  });

  // images and local file links
  const assets = [];
  main.find('img[src]').each((_, img) => {
    const src = $(img).attr('src');
    if (/^(https?:|data:)/.test(src)) return;
    const url = copyAsset(path.resolve(dir, decodeURIComponent(src)), collection, slug);
    if (url) { $(img).attr('src', url); assets.push(url); }
    $(img).attr('loading', 'lazy');
    $(img).removeAttr('class');
  });
  main.find('a[href]').each((_, a) => {
    const href = $(a).attr('href');
    if (/^(https?:|mailto:|#)/.test(href)) {
      if (/^https?:/.test(href)) $(a).attr({ target: '_blank', rel: 'noopener' });
      return;
    }
    const [p, hash] = href.split('#');
    const rel = path.relative(QUARTO, path.resolve(dir, decodeURIComponent(p)));
    if (ROUTES.has(rel)) { $(a).attr('href', ROUTES.get(rel) + (hash ? `#${hash}` : '')); return; }
    const url = copyAsset(path.resolve(dir, decodeURIComponent(p)), collection, slug);
    if (url) $(a).attr('href', url);
  });

  // the page template renders the title; drop the document's own first h1
  main.find('h1').first().remove();
  // pages that use several h1 sections: shift every heading down one level
  if (main.find('h1').length) {
    for (const lvl of [5, 4, 3, 2, 1]) {
      main.find(`h${lvl}`).each((_, h) => { h.tagName = `h${lvl + 1}`; });
    }
  }

  // Quarto callouts -> <aside class="callout callout-note"><p class="callout-title">…</p>…</aside>
  main.find('.callout').each((_, c) => {
    const type = ($(c).attr('class').match(/callout-(note|tip|warning|important|caution)/) || [, 'note'])[1];
    const label = type[0].toUpperCase() + type.slice(1);
    const raw = $(c).find('.callout-title-container').text().replace(/\s+/g, ' ').trim();
    const title = raw.replace(new RegExp(`^${label}(?=\\S)`), '') || label;
    const body = $(c).find('.callout-body-container').html() || '';
    $(c).replaceWith(`<aside class="callout callout-${type}"><p class="callout-title">${title}</p>${body}</aside>`);
  });

  // drop empty paragraphs
  main.find('p').each((_, p) => { if (!$(p).text().trim() && !$(p).find('img,svg,iframe').length) $(p).remove(); });

  const html = main.html().replace(/\n{3,}/g, '\n\n').trim();
  return { html, firstImage: assets[0] };
}

function write(file, front, body) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, yaml(front) + body + '\n');
}

if (!process.argv.includes('--force') && fs.existsSync(path.join(CONTENT, 'projects'))) {
  console.error('content/ already exists and may contain hand edits. Re-run with --force to overwrite it.');
  process.exit(1);
}
fs.rmSync(MEDIA, { recursive: true, force: true });

for (const p of PROJECTS) {
  const rel = `posts/${p.dir}/index.html`;
  const { html, firstImage } = convertHtml(rel, 'projects', p.slug);
  // the Quarto listing image (front matter `image:`) is the card cover
  const qmd = fs.readFileSync(path.resolve(QUARTO, '..', 'posts', p.dir, 'index.qmd'), 'utf8');
  const imgMatch = qmd.match(/^image:\s*['"]?([^'"\n]+)['"]?/m);
  let cover = imgMatch ? copyAsset(path.resolve(QUARTO, '..', 'posts', p.dir, imgMatch[1].trim()), 'projects', p.slug) : null;
  cover ||= firstImage;
  write(path.join(CONTENT, 'projects', `${p.slug}.md`), {
    title: p.title, summary: p.summary, year: p.year, kind: p.kind, tags: p.tags,
    order: p.order, cover: cover || undefined, format: 'html',
  }, html);
  console.log('project', p.slug, cover ? '' : '(no cover)');
}

for (const [slug, a] of Object.entries(AREAS)) {
  write(path.join(CONTENT, 'wiki', slug, '_area.md'), { title: a.title, summary: a.summary, order: a.order }, '');
}

for (const n of NOTES) {
  const file = path.join(CONTENT, 'wiki', n.area, `${n.slug}.md`);
  const front = { title: n.title, order: n.order };
  if (n.md) {
    let md = fs.readFileSync(path.join(ROOT, n.md), 'utf8').replace(/^#\s*\n/, '');
    write(file, { ...front, format: 'markdown' }, md.trim());
  } else {
    const { html } = convertHtml(n.src, `wiki/${n.area}`, n.slug);
    write(file, { ...front, format: 'html' }, html);
  }
  console.log('note', n.area, n.slug);
}
