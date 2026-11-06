import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { basePath } from './site';

const CONTENT = path.join(process.cwd(), 'content');

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  kind: string;
  tags: string[];
  order: number;
  cover?: string;
  html: string;
  headings: Heading[];
  text: string;
  minutes: number;
};

export type Area = { slug: string; title: string; summary: string; order: number; notes: Note[] };

export type Note = {
  area: string;
  slug: string;
  title: string;
  order: number;
  summary: string;
  html: string;
  headings: Heading[];
  text: string;
  minutes: number;
};

/* ---------- rendering ---------- */

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeKatex, { strict: false, throwOnError: false })
  .use(rehypeHighlight, { detect: false, ignoreMissing: true } as never)
  .use(rehypeStringify);

function render(body: string, format: string) {
  let html = format === 'html' ? body : String(markdown.processSync(body));
  // tables scroll inside the column instead of the page
  html = html.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, '</table></div>');
  // external links open in a new tab
  html = html.replace(/<a href="(https?:[^"]+)"(?![^>]*target=)/g, '<a href="$1" target="_blank" rel="noopener"');
  if (basePath) html = html.replace(/(src|href)="\/(?!\/)/g, `$1="${basePath}/`);
  return html;
}

const stripTags = (s: string) =>
  s
    .replace(/<span class="katex-html"[\s\S]*?<\/span><\/span><\/span>/g, ' ')
    .replace(/<(script|style|annotation)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&[#a-z0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function headingsOf(html: string): Heading[] {
  const out: Heading[] = [];
  // Quarto sections carry the id on <section>; markdown carries it on the heading
  const re = /<(?:section id="([^"]+)"[^>]*>\s*<h([23])[^>]*>|h([23]) id="([^"]+)"[^>]*>)([\s\S]*?)<\/h[23]>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const id = m[1] || m[4];
    const level = Number(m[2] || m[3]) as 2 | 3;
    const text = stripTags(m[5]);
    if (id && text) out.push({ id, text, level });
  }
  return out;
}

function firstSentence(text: string, max = 150) {
  const s = text.slice(0, 400).split(/(?<=[.!?])\s/)[0] || text;
  return s.length > max ? s.slice(0, max).replace(/\s\S*$/, '') + '…' : s;
}

function readFile(file: string) {
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const html = render(content, data.format || 'markdown');
  // drop code from the text used for search and reading time
  const prose = stripTags(html.replace(/<pre[\s\S]*?<\/pre>/g, ' '));
  // code is read slower than prose but skimmed in practice; count it at half weight
  const codeWords = stripTags((html.match(/<pre[\s\S]*?<\/pre>/g) || []).join(' ')).split(' ').length;
  const minutes = Math.max(1, Math.round((prose.split(' ').length + codeWords / 2) / 220));
  return { data, html, headings: headingsOf(html), text: prose, minutes };
}

/* ---------- projects ---------- */

let projectsCache: Project[] | null = null;
export function getProjects(): Project[] {
  if (projectsCache) return projectsCache;
  const dir = path.join(CONTENT, 'projects');
  projectsCache = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, html, headings, text, minutes } = readFile(path.join(dir, f));
      return {
        slug: f.replace(/\.md$/, ''),
        title: data.title,
        summary: data.summary,
        year: data.year,
        kind: data.kind,
        tags: data.tags || [],
        order: data.order ?? 99,
        cover: data.cover ? `${basePath}${data.cover}` : undefined,
        html,
        headings,
        text,
        minutes,
      };
    })
    .sort((a, b) => a.order - b.order);
  return projectsCache;
}

export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

/* ---------- wiki ---------- */

let areasCache: Area[] | null = null;
export function getAreas(): Area[] {
  if (areasCache) return areasCache;
  const root = path.join(CONTENT, 'wiki');
  areasCache = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = path.join(root, d.name);
      const meta = matter(fs.readFileSync(path.join(dir, '_area.md'), 'utf8')).data;
      const notes: Note[] = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.md') && f !== '_area.md')
        .map((f) => {
          const { data, html, headings, text, minutes } = readFile(path.join(dir, f));
          return {
            area: d.name,
            slug: f.replace(/\.md$/, ''),
            title: data.title,
            order: data.order ?? 99,
            summary: data.summary || firstSentence(text),
            html,
            headings,
            text,
            minutes,
          };
        })
        .sort((a, b) => a.order - b.order);
      return { slug: d.name, title: meta.title, summary: meta.summary, order: meta.order ?? 99, notes };
    })
    .sort((a, b) => a.order - b.order);
  return areasCache;
}

export const getArea = (slug: string) => getAreas().find((a) => a.slug === slug);
export const getAllNotes = () => getAreas().flatMap((a) => a.notes);
export function getNote(area: string, slug: string) {
  const a = getArea(area);
  const i = a?.notes.findIndex((n) => n.slug === slug) ?? -1;
  if (!a || i < 0) return undefined;
  return { area: a, note: a.notes[i], prev: a.notes[i - 1], next: a.notes[i + 1] };
}
