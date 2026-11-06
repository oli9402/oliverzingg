import { getAreas, getProjects } from '@/lib/content';
import type { SearchDoc } from '@/components/SearchDialog';

export const dynamic = 'force-static';

export function GET() {
  const docs: SearchDoc[] = [
    ...getProjects().map((p) => ({
      u: `/projects/${p.slug}/`, t: p.title, k: `Project · ${p.kind}`, s: p.summary,
      h: [...p.tags, ...p.headings.map((h) => h.text)].join(' · '), x: p.text.slice(0, 4000),
    })),
    ...getAreas().flatMap((a) =>
      a.notes.map((n) => ({
        u: `/wiki/${a.slug}/${n.slug}/`, t: n.title, k: `Knowledge · ${a.title}`, s: n.summary,
        h: n.headings.map((h) => h.text).join(' · '), x: n.text.slice(0, 6000),
      })),
    ),
  ];
  return Response.json(docs);
}
