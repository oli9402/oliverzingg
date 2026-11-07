'use client';

import Link from 'next/link';
import { Fragment, useMemo, useState } from 'react';
import type { Snippet } from '@/lib/snippets';
import { withBase } from '@/lib/site';

export type TableProject = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  kind: string; // short factor level, e.g. "thesis"
  source: string; // original kind, e.g. "Master's thesis, UZH"
  grade?: string;
  cover?: string;
  snippet?: Snippet;
};

const isFigure = (src?: string) => !!src && /\.(png|svg)$/i.test(src);

/** Highlights NA in printed R output, the way the console colours missing values. */
function Output({ text }: { text: string }) {
  const parts = text.split(/(<NA>|\bNA\b|\bnegative\b)/g);
  return <>{parts.map((p, i) => (i % 2 ? <span key={i} className="na">{p}</span> : p))}</>;
}

function Code({ s }: { s: Snippet }) {
  const lines = s.code.split('\n');
  const first = s.lang === 'R' ? '> ' : '>>> ';
  const cont = s.lang === 'R' ? '+ ' : '... ';
  return (
    <pre>
      {lines.map((l, i) => (
        <Fragment key={i}>
          <span className="p">{i === 0 ? first : cont}</span>{l}{'\n'}
        </Fragment>
      ))}
    </pre>
  );
}

function Detail({ p }: { p: TableProject }) {
  const s = p.snippet;
  const href = `/projects/${p.slug}/`;
  const figure = s?.figure || p.cover;
  if (s) {
    return (
      <div className="det">
        <div className="cell">
          <h4><span>{s.lang}</span><span>{s.file}</span></h4>
          <Code s={s} />
          <pre className="out"><Output text={s.output} /></pre>
        </div>
        <div className="cell">
          {figure ? (
            <>
              <h4><span>plot</span><span>{figure.split('/').pop()}</span></h4>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(figure)} alt="" loading="lazy" />
              {s.note && <p style={{ marginTop: 12 }}>{s.note}</p>}
            </>
          ) : (
            <><h4><span>about</span></h4><p>{p.summary}</p></>
          )}
          <p><Link className="link-arrow" href={href}>Read the project →</Link></p>
        </div>
      </div>
    );
  }
  return (
    <div className="det">
      <div className="cell">
        <h4><span>about</span><span>{p.source}</span></h4>
        <p>{p.summary}</p>
        <p><Link className="link-arrow" href={href}>Read the project →</Link></p>
      </div>
      <div className="cell">
        {p.cover ? (
          <>
            <h4><span>{isFigure(p.cover) ? 'plot' : 'cover'}</span><span>{p.cover.split('/').pop()}</span></h4>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(p.cover)} alt="" loading="lazy" className={isFigure(p.cover) ? undefined : 'photo'} />
          </>
        ) : (
          <><h4><span>figure</span></h4><p>No figure for this one. The project page has the full code.</p></>
        )}
      </div>
    </div>
  );
}

export default function ProjectTable({ projects, initialOpen = [], total, showAllLink }: {
  projects: TableProject[];
  initialOpen?: string[];
  total?: number;
  showAllLink?: boolean;
}) {
  const kinds = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => m.set(p.kind, (m.get(p.kind) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);
  const [kind, setKind] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set(initialOpen));
  const list = kind ? projects.filter((p) => p.kind === kind) : projects;
  const toggle = (slug: string) => setOpen((o) => { const n = new Set(o); if (n.has(slug)) n.delete(slug); else n.add(slug); return n; });
  const rest = (total ?? projects.length) - projects.length;

  return (
    <div className="tib">
      <div className="tib-meta">
        <span># A tibble: {list.length} × 4</span>
        <div className="tib-filters" role="group" aria-label="Filter projects by kind">
          <button type="button" aria-pressed={kind === null} onClick={() => setKind(null)}>all</button>
          {kinds.map(([k, n]) => (
            <button type="button" key={k} aria-pressed={kind === k} onClick={() => setKind(k)}>{k}<span className="n">{n}</span></button>
          ))}
        </div>
      </div>
      <div className="tib-scroll">
        <table>
          <thead>
            <tr>
              <th aria-hidden></th>
              <th>year<small>&lt;int&gt;</small></th>
              <th>kind<small>&lt;fct&gt;</small></th>
              <th>title<small>&lt;chr&gt;</small></th>
              <th>grade<small>&lt;dbl&gt;</small></th>
              <th><span className="sr-only">Details</span></th>
            </tr>
          </thead>
          <tbody aria-live="polite">
            {list.map((p, i) => {
              const isOpen = open.has(p.slug);
              return (
                <Fragment key={p.slug}>
                  <tr className="row" aria-expanded={isOpen} onClick={(e) => { if (!(e.target as HTMLElement).closest('a')) toggle(p.slug); }}>
                    <td className="c-i">{i + 1}</td>
                    <td className="c-y">{p.year}</td>
                    <td className="c-k">{p.kind}</td>
                    <td className="c-t">
                      <b><Link href={`/projects/${p.slug}/`} onClick={(e) => e.stopPropagation()}>{p.title}</Link></b>
                      <span>{p.summary}</span>
                      <em className="m-meta">{p.year} · {p.kind} · grade {p.grade ?? <span className="na">NA</span>}</em>
                    </td>
                    <td className="c-g">{p.grade ?? <span className="na">NA</span>}</td>
                    <td className="c-x">
                      <button type="button" className="tog" aria-expanded={isOpen} aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${p.title}`} onClick={(e) => { e.stopPropagation(); toggle(p.slug); }}>
                        {isOpen ? '−' : '+'}
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="detail"><td colSpan={6}><Detail p={p} /></td></tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="tib-foot">
        <span>{rest > 0 ? `# ℹ ${rest} more rows` : '# grade is NA for projects outside a degree'}</span>
        {showAllLink && <Link href="/projects/">View all {total ?? projects.length} projects →</Link>}
      </div>
    </div>
  );
}
