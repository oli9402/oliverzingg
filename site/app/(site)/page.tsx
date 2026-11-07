import Link from 'next/link';
import Timeline from '@/components/Timeline';
import HomeIndex from '@/components/HomeIndex';
import { ArrowRight, Mail } from '@/components/Icons';
import { getAreas, getProjects } from '@/lib/content';
import { education, work, formatRange } from '@/lib/cv';
import { site, withBase } from '@/lib/site';

export default function Home() {
  const projects = getProjects();
  const areas = getAreas();
  const toRow = (e: (typeof work)[number]) => ({ id: e.id, range: formatRange(e), title: e.title, org: e.org, short: e.short, now: !e.end });

  return (
    <>
      <section className="field on-blue" aria-labelledby="hero-name">
        <div className="wrap hero">
          <div>
            <h1 id="hero-name" className="display hero-name">Oliver<br />Zingg</h1>
            <p className="hero-copy">
              <strong>Psychologist and data scientist in Zürich.</strong> I design the study, model the data and explain what it
              means. M.Sc. in Applied Information and Data Science at HSLU, December&nbsp;2026.
            </p>
            <div className="hero-actions">
              <Link href="/projects/" className="btn btn-hi">See my work <ArrowRight /></Link>
              <Link href="/experience/" className="btn btn-ghost-light">View CV</Link>
            </div>
          </div>
          <div className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase('/images/oliver.jpg')} alt="Portrait of Oliver Zingg outdoors in Zürich" fetchPriority="high" />
          </div>
        </div>
      </section>

      <div className="status">
        <div className="wrap">
          <div className="status-item now"><b>Zurich Insurance</b>Data science, since Nov 2025</div>
          <div className="status-item"><b>HSLU</b>M.Sc. Data Science, until Dec 2026</div>
          <div className="status-item"><b>University of Zurich</b>M.Sc. &amp; B.Sc. Psychology</div>
          <div className="status-item"><b>Available</b>Full-time from January 2027</div>
        </div>
      </div>

      <section className="path wrap" aria-labelledby="path-title">
        <div className="path-head">
          <div>
            <h2 id="path-title" className="h-section">Two tracks, one path.</h2>
            <p className="lede">Six years of psychology and a data science degree, alongside market research, insights and analytics work.</p>
          </div>
          <div className="legend" aria-hidden>
            <span><i style={{ background: 'var(--blue)' }} />Education</span>
            <span><i style={{ background: 'var(--ink)' }} />Work</span>
          </div>
        </div>
        <Timeline />
      </section>

      <HomeIndex
        projects={projects.slice(0, 5).map(({ slug, title, summary, year, kind, cover }) => ({ slug, title, summary, year, kind, cover }))}
        projectCount={projects.length}
        areas={areas.map((a) => ({ slug: a.slug, title: a.title, summary: a.summary, count: a.notes.length, notes: a.notes.slice(0, 3).map(({ slug, title }) => ({ slug, title })) }))}
        work={work.filter((w) => w.id !== 'vebego' && w.id !== 'tx-freelance').map((w) => (w.id === 'tx-intern' ? { ...toRow(w), range: 'Nov 2023 – Mar 2025', title: 'Intern, then freelancer' } : toRow(w)))}
        education={education.map(toRow)}
      />

      <section className="close" id="contact" aria-labelledby="close-title">
        <div className="wrap">
          <h2 id="close-title">Looking for someone who asks the right question first?</h2>
          <div className="close-actions">
            <a className="btn btn-ink" href={`mailto:${site.email}`}><Mail /> {site.email}</a>
            <a className="link-arrow" style={{ color: 'var(--ink)' }} href={site.links.linkedin} target="_blank" rel="noopener">Connect on LinkedIn <ArrowRight /></a>
          </div>
        </div>
      </section>
    </>
  );
}
