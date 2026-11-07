'use client';

import { useMemo, useState } from 'react';
import ProjectCard, { type CardProject } from './ProjectCard';

const group = (k: string) => (/thesis/i.test(k) ? 'Theses' : k);

export default function ProjectGrid({ projects }: { projects: CardProject[] }) {
  const kinds = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => m.set(group(p.kind), (m.get(group(p.kind)) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);
  const [kind, setKind] = useState<string | null>(null);
  const list = kind ? projects.filter((p) => group(p.kind) === kind) : projects;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by type">
        <button className="filter" aria-pressed={kind === null} onClick={() => setKind(null)}>All<span className="num">{projects.length}</span></button>
        {kinds.map(([k, n]) => (
          <button key={k} className="filter" aria-pressed={kind === k} onClick={() => setKind(k)}>{k}<span className="num">{n}</span></button>
        ))}
      </div>
      <h2 className="sr-only">{kind ? `${kind} projects` : 'All projects'}</h2>
      <div className="pgrid" aria-live="polite">
        {list.map((p, i) => <ProjectCard key={p.slug} p={p} wide={!kind && i === 0} showSummary morph />)}
      </div>
    </>
  );
}
