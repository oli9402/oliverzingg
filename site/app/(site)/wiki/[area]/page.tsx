import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WikiNav from '@/components/WikiNav';
import { getArea, getAreas } from '@/lib/content';

export const dynamicParams = false;
export function generateStaticParams() {
  return getAreas().map((a) => ({ area: a.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const a = getArea((await params).area);
  return a ? { title: `${a.title} notes`, description: a.summary } : {};
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const a = getArea(area);
  if (!a) notFound();
  return (
    <div className="wrap">
      <header className="article-head">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/wiki/">wiki</Link><span aria-hidden>/</span><span>{a.slug}</span></nav>
        <h1 className="h-page">{a.title}</h1>
        <p className="lede">{a.summary}</p>
      </header>
      <div className="doc has-nav nav-only">
        <aside className="doc-aside"><WikiNav areas={getAreas()} current={{ area }} /></aside>
        <div className="doc-main">
          <ul className="note-list">
            {a.notes.map((n) => (
              <li key={n.slug}>
                <Link href={`/wiki/${a.slug}/${n.slug}/`}>
                  <span><b>{n.title}</b><small>{n.summary}</small></span>
                  <span className="min">{n.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
