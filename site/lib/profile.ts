import 'server-only';
import { getAreas, getLog, getProjects } from './content';
import { education, work, formatRange, skills, languages } from './cv';
import { site } from './site';

/** Compact, serialisable summary of the site for the terminal and the quick dossier. */
export function getProfile() {
  const projects = getProjects();
  const areas = getAreas();
  const current = work.find((w) => !w.end)!;
  const log = getLog().entries;
  return {
    name: site.name,
    email: site.email,
    links: site.links,
    role: 'Psychologist and data scientist in Zürich',
    pitch: 'I design the study, model the data and explain what it means.',
    availability: 'Open to full-time data science roles from January 2027',
    now: `${current.title} at ${current.org} (since ${formatRange(current).split(' – ')[0]})`,
    thesis: 'M.Sc. thesis (HSLU): leveraging double machine learning for robust decision-making, due December 2026',
    education: education.map((e) => `${formatRange(e).padEnd(20)} ${e.title}, ${e.org}`),
    work: work.filter((w) => w.id !== 'vebego').map((w) => `${formatRange(w).padEnd(20)} ${w.title}, ${w.org}`),
    skills: skills.map((s) => `${s.group}: ${s.items.join(', ')}`),
    languages: languages.map((l) => `${l.name}: ${l.level}`),
    projects: projects.map((p) => ({ slug: p.slug, title: p.title, kind: p.kind, year: p.year, summary: p.summary, cover: p.cover })),
    areas: areas.map((a) => ({ slug: a.slug, title: a.title, notes: a.notes.map((n) => ({ slug: n.slug, title: n.title, minutes: n.minutes })) })),
    log: log.slice(0, 5).map((l) => ({ label: l.label, text: l.text })),
  };
}

export type Profile = ReturnType<typeof getProfile>;
