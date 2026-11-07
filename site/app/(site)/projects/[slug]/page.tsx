import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Toc, { MobileToc } from '@/components/Toc';
import { isFigure } from '@/components/ProjectCard';
import PixelCover from '@/components/PixelCover';
import { getProject, getProjects } from '@/lib/content';

export const dynamicParams = false;
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary, openGraph: p.cover ? { images: [p.cover] } : undefined } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const all = getProjects();
  const i = all.findIndex((x) => x.slug === slug);
  const prev = all[i - 1];
  const next = all[i + 1];

  return (
    <article className="wrap">
      <header className="article-head">
        <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
          <div className="article-art neon-only"><PixelCover slug={p.slug} kind={p.kind} art={p.art} /></div>
        </ViewTransition>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/projects/">Projects</Link><span aria-hidden>/</span><span>{p.kind}</span>
        </nav>
        <h1 className="h-page h-article">{p.title}</h1>
        <p className="lede">{p.summary}</p>
        <div className="article-facts">
          <span><b>{p.kind}</b></span>
          <span className="num">{p.year}</span>
          <span>{p.minutes} min read</span>
          {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        {p.cover && !p.html.includes(p.cover) && (
          <div className={`article-cover${isFigure(p.cover) ? ' is-figure' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover} alt="" />
          </div>
        )}
      </header>
      <div className="doc">
        <div className="doc-main">
          <MobileToc headings={p.headings} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
          <nav className="pager" aria-label="More projects">
            {prev && <Link href={`/projects/${prev.slug}/`}><small>Previous project</small><b>{prev.title}</b></Link>}
            {next && <Link className="next" href={`/projects/${next.slug}/`}><small>Next project</small><b>{next.title}</b></Link>}
          </nav>
        </div>
        <aside className="doc-aside doc-toc"><Toc headings={p.headings} /></aside>
      </div>
    </article>
  );
}
