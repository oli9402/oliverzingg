import Link from 'next/link';
import CareerTimeline from '@/components/CareerTimeline';
import CopyEmail from '@/components/CopyEmail';
import ProjectTable from '@/components/ProjectTable';
import { getAreas, getNote } from '@/lib/content';
import { tableProjects } from '@/lib/table';
import { site, withBase } from '@/lib/site';

const HOME_ROWS = 8;

export default function Home() {
  const projects = tableProjects();
  const areas = getAreas();
  const notes = areas.reduce((n, a) => n + a.notes.length, 0);
  const featured = getNote('statistics', 'generalized-linear-models');

  // fs::dir_tree("wiki"): two notes per area, the rest summarised as "+n". Guide lines are CSS, not box-drawing glyphs.
  const tree = areas.map((a) => {
    const shown = a.notes.slice(0, 2);
    return { a, shown, more: a.notes.length - shown.length };
  });

  return (
    <div className="wrap">
      <section className="hero" aria-labelledby="hero-name">
        <div>
          <p className="call"><b>&gt;</b><code>oliver</code><span className="cmt"># psychologist × data scientist</span></p>
          <h1 id="hero-name">Oliver<br />Zingg<span className="cursor" aria-hidden /></h1>
          <p className="lede">
            I design the study, model the data and <strong>explain what it means.</strong> Trained in research methods at UZH and
            in machine learning at HSLU, working with data at Zurich Insurance.
          </p>
          <dl className="str">
            <div><dt>status</dt><span className="ty">&lt;chr&gt;</span><dd className="ok">● open to full-time data science roles from Jan 2027</dd></div>
            <div><dt>now</dt><span className="ty">&lt;chr&gt;</span><dd>Working student, data science · Zurich Insurance</dd></div>
            <div><dt>thesis</dt><span className="ty">&lt;chr&gt;</span><dd>Double machine learning for robust decisions · due Dec 2026</dd></div>
            <div><dt>stack</dt><span className="ty">&lt;list&gt;</span><dd>R, Python, SQL, Power BI, Quarto</dd></div>
            <div><dt>based_in</dt><span className="ty">&lt;chr&gt;</span><dd>{site.location}</dd></div>
          </dl>
          <div className="cta">
            {site.cvPdf ? (
              <a className="btn btn-primary" href={withBase(site.cvPdf)} download>Download CV <span aria-hidden>↓</span></a>
            ) : (
              <Link className="btn btn-primary" href="/experience/">View CV <span aria-hidden>→</span></Link>
            )}
            <CopyEmail />
          </div>
        </div>
        <figure className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase('/images/oliver.jpg')} alt="Portrait of Oliver Zingg outdoors in Zürich" fetchPriority="high" />
          <figcaption><span>oliver.jpg</span><span>Zürich</span></figcaption>
        </figure>
      </section>

      <section className="home-sec" id="projects" aria-labelledby="projects-title">
        <p className="call"><b>&gt;</b><code>projects |&gt; arrange(rank)</code></p>
        <div className="sec-head">
          <h2 id="projects-title" className="h-section">Projects</h2>
          <p>Theses, statistics and visualisation work in R and Python. Open a row to see the code and what it printed.</p>
        </div>
        <ProjectTable projects={projects.slice(0, HOME_ROWS)} total={projects.length} initialOpen={[projects[0].slug, 'simpsons-paradox']} showAllLink />
      </section>

      <section className="home-sec" id="experience" aria-labelledby="xp-title">
        <p className="call"><b>&gt;</b><code>cv |&gt; plot_timeline(from = 2018)</code></p>
        <div className="sec-head">
          <h2 id="xp-title" className="h-section">Experience</h2>
          <p>Two degrees in psychology, one in data science, and three companies alongside. <Link className="link-arrow" href="/experience/">Full CV →</Link></p>
        </div>
        <CareerTimeline />
      </section>

      <section className="home-sec" id="wiki" aria-labelledby="wiki-title">
        <p className="call"><b>&gt;</b><code>fs::dir_tree(&quot;wiki&quot;)</code></p>
        <div className="sec-head">
          <h2 id="wiki-title" className="h-section">Knowledge base</h2>
          <p>{notes} notes written for my future self, shared in case they help someone else.</p>
        </div>
        <div className="wiki-home">
          <nav className="tree" aria-label="Knowledge base folders">
            <Link href="/wiki/" className="d">wiki</Link>
            <ul>
              {tree.map(({ a, shown, more }) => (
                <li key={a.slug}>
                  <span className="dir"><Link href={`/wiki/${a.slug}/`} className="d">{a.slug}/</Link><span className="m">{a.notes.length} {a.notes.length === 1 ? 'note' : 'notes'}</span></span>
                  <ul>
                    {shown.map((n, i) => (
                      <li key={n.slug}>
                        <Link href={`/wiki/${a.slug}/${n.slug}/`}>{n.slug}</Link>
                        {i === shown.length - 1 && more > 0 && <span className="m"> +{more}</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          {featured && (
            <article className="note-card">
              <div className="crumb">wiki / {featured.area.slug} / {featured.note.slug}</div>
              <h3>{featured.note.title}</h3>
              <p>{featured.note.summary}</p>
              {featured.note.headings.some((h) => h.level === 2) && (
                <ol>{featured.note.headings.filter((h) => h.level === 2).slice(0, 5).map((h) => <li key={h.id}>{h.text}</li>)}</ol>
              )}
              <div className="foot">
                <Link className="link-arrow" href={`/wiki/${featured.area.slug}/${featured.note.slug}/`}>Read the note →</Link>
                <span>{featured.note.minutes} min</span>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="call"><b>&gt;</b><code>contact()</code></p>
          <h2 id="contact-title">Hiring for data science in Switzerland? I&apos;d like to hear about it.</h2>
        </div>
        <pre className="ret">
          <span>$email</span>{'\n'}<a href={`mailto:${site.email}`}>&quot;{site.email}&quot;</a>{'\n\n'}
          <span>$github</span>{'\n'}<a href={site.links.github} target="_blank" rel="noopener">&quot;github.com/oli9402&quot;</a>{'\n\n'}
          <span>$linkedin</span>{'\n'}<a href={site.links.linkedin} target="_blank" rel="noopener">&quot;in/oliver-zingg&quot;</a>
        </pre>
      </section>
    </div>
  );
}
