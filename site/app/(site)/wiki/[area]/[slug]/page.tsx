import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Toc, { MobileToc } from '@/components/Toc';
import WikiNav from '@/components/WikiNav';
import { getAreas, getNote } from '@/lib/content';

export const dynamicParams = false;
export function generateStaticParams() {
  return getAreas().flatMap((a) => a.notes.map((n) => ({ area: a.slug, slug: n.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{ area: string; slug: string }> }): Promise<Metadata> {
  const { area, slug } = await params;
  const r = getNote(area, slug);
  return r ? { title: r.note.title, description: r.note.summary } : {};
}

export default async function NotePage({ params }: { params: Promise<{ area: string; slug: string }> }) {
  const { area, slug } = await params;
  const r = getNote(area, slug);
  if (!r) notFound();
  const { note, prev, next } = r;
  return (
    <div className="wrap">
      <div className="doc has-nav">
        <aside className="doc-aside"><WikiNav areas={getAreas()} current={{ area, slug }} /></aside>
        <article className="doc-main">
          <header className="article-head" style={{ paddingTop: 0 }}>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/wiki/">wiki</Link><span aria-hidden>/</span><Link href={`/wiki/${area}/`}>{area}</Link><span aria-hidden>/</span><span>{slug}</span>
            </nav>
            <h1 className="h-page h-article">{note.title}</h1>
            <div className="article-facts"><span>{note.minutes} min read</span><span>{note.headings.filter((h) => h.level === 2).length || 1} sections</span></div>
          </header>
          <div style={{ paddingTop: 36 }}>
            <MobileToc headings={note.headings} />
            <div className="prose" dangerouslySetInnerHTML={{ __html: note.html }} />
          </div>
          <nav className="pager" aria-label={`More in ${r.area.title}`}>
            {prev && <Link href={`/wiki/${area}/${prev.slug}/`}><small>Previous</small><b>{prev.title}</b></Link>}
            {next && <Link className="next" href={`/wiki/${area}/${next.slug}/`}><small>Next</small><b>{next.title}</b></Link>}
          </nav>
        </article>
        <aside className="doc-aside doc-toc"><Toc headings={note.headings} /></aside>
      </div>
    </div>
  );
}
