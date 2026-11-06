import type { MetadataRoute } from 'next';
import { getAreas, getProjects } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  return [
    ...['/', '/projects/', '/wiki/', '/experience/'].map((p) => ({ url: u(p) })),
    ...getProjects().map((p) => ({ url: u(`/projects/${p.slug}/`) })),
    ...getAreas().flatMap((a) => [{ url: u(`/wiki/${a.slug}/`) }, ...a.notes.map((n) => ({ url: u(`/wiki/${a.slug}/${n.slug}/`) }))]),
  ];
}
