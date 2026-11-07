import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Download, Mail } from '@/components/Icons';
import PrintButton from './PrintButton';
import { certificates, education, formatRange, languages, skills, theses, work } from '@/lib/cv';
import { site, withBase } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work, education, theses, skills and languages of Oliver Zingg, psychologist and data scientist in Zürich.',
};

export default function ExperiencePage() {
  return (
    <div className="wrap">
      <header className="page-band">
        <p className="call"><b>&gt;</b><code>cv</code><span className="cmt"># updated November 2026</span></p>
        <h1 className="h-page">Experience</h1>
        <p className="lede">M.Sc. Psychology (UZH) and M.Sc. Applied Information and Data Science (HSLU, December 2026). Working student in data science at Zurich Insurance. Open to full-time roles from January 2027.</p>
      </header>
      <div className="cv-grid">
        <aside className="cv-side">
          <nav aria-label="On this page">
            <a href="#work">Work</a>
            <a href="#education">Education</a>
            <a href="#theses">Theses</a>
            <a href="#skills">Skills &amp; languages</a>
            <a href="#certificates">Certificates</a>
          </nav>
          {site.cvPdf ? (
            <a className="btn btn-ink" href={withBase(site.cvPdf)} download><Download /> Download CV (PDF)</a>
          ) : (
            <PrintButton />
          )}
          <a className="btn btn-ghost" href={`mailto:${site.email}`}><Mail /> Email me</a>
        </aside>

        <div>
          <section className="cv-block" aria-labelledby="work">
            <h2 id="work" className="cv-h">Work</h2>
            {work.map((e) => (
              <div className="cv-entry" id={e.id} key={e.id}>
                <div className="d num">{formatRange(e)}<br />{e.place}</div>
                <div>
                  <h3>{e.title} {!e.end && <span className="badge-now">Now</span>}</h3>
                  <div className="org">{e.org}</div>
                  <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </div>
              </div>
            ))}
          </section>

          <section className="cv-block" aria-labelledby="education">
            <h2 id="education" className="cv-h">Education</h2>
            {education.map((e) => (
              <div className="cv-entry" id={e.id} key={e.id}>
                <div className="d num">{formatRange(e)}<br />{e.place}</div>
                <div>
                  <h3>{e.title} {!e.end && <span className="badge-now">Now</span>}</h3>
                  <div className="org">{e.org}</div>
                  <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  {e.link && <Link className="link-arrow no-print" href={e.link}>Read the thesis summary <ArrowRight /></Link>}
                </div>
              </div>
            ))}
          </section>

          <section className="cv-block" aria-labelledby="theses">
            <h2 id="theses" className="cv-h">Theses</h2>
            {theses.map((t) => (
              <div className="cv-entry" key={t.title}>
                <div className="d">{t.level}</div>
                <div>
                  <h3>{t.title}</h3>
                  <div className="org">{t.grade}</div>
                  <p className="meta" style={{ margin: '6px 0 0' }}>Supervised by {t.supervisor}</p>
                  {t.link && <Link className="link-arrow no-print" href={t.link}>Read more <ArrowRight /></Link>}
                </div>
              </div>
            ))}
          </section>

          <section className="cv-block" aria-labelledby="skills">
            <h2 id="skills" className="cv-h">Skills &amp; languages</h2>
            <div className="cv-cols">
              {skills.map((s) => (
                <div key={s.group}><h3>{s.group}</h3><ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
              ))}
            </div>
            <div className="cv-cols" style={{ marginTop: 40 }}>
              {languages.map((l) => (
                <div key={l.name}><h3>{l.name}</h3><ul><li>{l.level}</li></ul></div>
              ))}
            </div>
          </section>

          <section className="cv-block" aria-labelledby="certificates">
            <h2 id="certificates" className="cv-h">Certificates</h2>
            {certificates.map((c) => (
              <div className="cv-entry" key={c.title}>
                <div className="d">{c.date}</div>
                <div><h3>{c.title}</h3><div className="org">{c.by}</div></div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
