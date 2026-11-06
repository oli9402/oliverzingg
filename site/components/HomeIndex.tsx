'use client';

import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import ProjectCard, { type CardProject } from './ProjectCard';
import { ArrowRight } from './Icons';

type AreaSummary = { slug: string; title: string; summary: string; count: number; notes: { slug: string; title: string }[] };
type Row = { id: string; range: string; title: string; org: string; short: string; now: boolean };

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function HomeIndex({ projects, projectCount, areas, work, education }: {
  projects: CardProject[]; projectCount: number; areas: AreaSummary[]; work: Row[]; education: Row[];
}) {
  const [tab, setTab] = useState<TabId>('projects');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const n = (i + d + TABS.length) % TABS.length;
    setTab(TABS[n].id);
    refs.current[n]?.focus();
  };

  const rows = (list: Row[]) => (
    <div className="rows">
      {list.map((r) => (
        <Link key={r.id} href={`/experience/#${r.id}`}>
          <span className="d num">{r.range}</span>
          <div>
            <h3>{r.org} {r.now && <span className="badge-now">Now</span>}</h3>
            <span className="c">{r.short}</span>
          </div>
          <span className="d">{r.title}</span>
          <span className="arr" aria-hidden>→</span>
        </Link>
      ))}
    </div>
  );

  return (
    <section className="index wrap" aria-labelledby="index-title">
      <div className="index-head">
        <h2 id="index-title" className="h-section">The work, the notes,<br />the path.</h2>
        <div className="tabs" role="tablist" aria-label="Browse">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              className="tab"
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" id="panel-projects" aria-labelledby="tab-projects" hidden={tab !== 'projects'}>
        <div className="pgrid">
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} wide={i === 0} />)}
        </div>
        <div className="tab-foot"><Link className="link-arrow" href="/projects/">All {projectCount} projects <ArrowRight /></Link></div>
      </div>

      <div role="tabpanel" id="panel-knowledge" aria-labelledby="tab-knowledge" hidden={tab !== 'knowledge'}>
        <div className="kgrid">
          {areas.map((a) => (
            <div className="kcol" key={a.slug}>
              <div className="n num">{a.count}</div>
              <h3><Link href={`/wiki/${a.slug}/`}>{a.title}</Link></h3>
              <p>{a.summary}</p>
              <ul>
                {a.notes.map((n) => <li key={n.slug}><Link href={`/wiki/${a.slug}/${n.slug}/`}>{n.title}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="tab-foot"><Link className="link-arrow" href="/wiki/">Open the knowledge base <ArrowRight /></Link></div>
      </div>

      <div role="tabpanel" id="panel-work" aria-labelledby="tab-work" hidden={tab !== 'work'}>
        {rows(work)}
        <div className="tab-foot"><Link className="link-arrow" href="/experience/">Full experience <ArrowRight /></Link></div>
      </div>

      <div role="tabpanel" id="panel-education" aria-labelledby="tab-education" hidden={tab !== 'education'}>
        {rows(education)}
        <div className="tab-foot"><Link className="link-arrow" href="/experience/#education">Theses, skills and certificates <ArrowRight /></Link></div>
      </div>
    </section>
  );
}
