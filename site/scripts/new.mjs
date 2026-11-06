#!/usr/bin/env node
/**
 * Create a new project or knowledge-base note with its front matter filled in.
 *
 *   npm run new -- project "Double machine learning for pricing"
 *   npm run new -- note statistics "Bayesian inference"
 *   npm run new -- note causal-inference "Instrumental variables"   (new area: folder is created)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const [kind, ...rest] = process.argv.slice(2);

const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const title = (s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
const nextOrder = (dir) => {
  const orders = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== '_area.md')
        .map((f) => Number((fs.readFileSync(path.join(dir, f), 'utf8').match(/^order:\s*(\d+)/m) || [])[1] || 0))
    : [];
  return Math.max(0, ...orders) + 1;
};
const fail = (msg) => { console.error(msg); process.exit(1); };
const create = (file, body) => {
  if (fs.existsSync(file)) fail(`Already exists: ${path.relative(ROOT, file)}`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  console.log(`Created ${path.relative(ROOT, file)}`);
};

if (kind === 'project') {
  const name = rest.join(' ').trim() || fail('Give the project a title: npm run new -- project "My title"');
  const slug = slugify(name);
  create(
    path.join(ROOT, 'content/projects', `${slug}.md`),
    `---
title: ${JSON.stringify(name)}
summary: "One or two sentences for cards and search."
year: ${new Date().getFullYear()}
kind: "Analysis"
tags: []
order: ${nextOrder(path.join(ROOT, 'content/projects'))}
---

## The question

What did you want to find out, and why does it matter?

## Data and method

## Results

## What I learned
`,
  );
  console.log(`Images go in public/media/projects/${slug}/ and are linked as /media/projects/${slug}/file.png`);
} else if (kind === 'note') {
  const [area, ...words] = rest;
  if (!area || !words.length) fail('Usage: npm run new -- note <area> "Note title"');
  const areaSlug = slugify(area);
  const dir = path.join(ROOT, 'content/wiki', areaSlug);
  if (!fs.existsSync(path.join(dir, '_area.md'))) {
    const areas = fs.readdirSync(path.join(ROOT, 'content/wiki')).length;
    create(path.join(dir, '_area.md'), `---\ntitle: ${JSON.stringify(title(areaSlug))}\nsummary: "What this area covers, in one sentence."\norder: ${areas + 1}\n---\n`);
  }
  const name = words.join(' ').trim();
  create(
    path.join(dir, `${slugify(name)}.md`),
    `---
title: ${JSON.stringify(name)}
order: ${nextOrder(dir)}
---

Start with the one-sentence idea.

## First section
`,
  );
} else {
  fail('Usage:\n  npm run new -- project "Title"\n  npm run new -- note <area> "Title"\nAreas: ' +
    fs.readdirSync(path.join(ROOT, 'content/wiki')).join(', '));
}
