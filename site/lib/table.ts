import 'server-only';
import { getProjects } from './content';
import { snippets } from './snippets';
import type { TableProject } from '@/components/ProjectTable';

/** Factor level for the `kind` column: "Master's thesis, UZH" → "thesis", "NLP" → "nlp". */
const level = (kind: string) => (/thesis/i.test(kind) ? 'thesis' : kind.toLowerCase());

export function tableProjects(): TableProject[] {
  return getProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    year: p.year,
    kind: level(p.kind),
    source: p.kind,
    // both psychology theses were graded 6 (CV, 6 November 2026); other projects sit outside a degree
    grade: /thesis/i.test(p.kind) ? '6.0' : undefined,
    cover: p.cover,
    snippet: snippets[p.slug],
  }));
}
