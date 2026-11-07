import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Press_Start_2P, VT323 } from 'next/font/google';
import './neon.css';
import NeonEffects from './NeonEffects';
import { getAreas, getProjects } from '@/lib/content';
import { education, work, skills, languages, certificates, toYear, TODAY } from '@/lib/cv';
import { site, withBase } from '@/lib/site';

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-pixel', display: 'swap' });
const vt = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt', display: 'swap' });

export const metadata: Metadata = {
  title: 'Neon mode',
  description: 'Oliver Zingg’s portfolio, rendered as a rain-soaked 16-bit city.',
  robots: { index: false },
};

const START = 2018;
const END = 2028;
const pct = (ym: string) => ((toYear(ym) - START) / (END - START)) * 100;

// skill bars use the CV's own wording, never invented scores
const LEVEL: Record<string, number> = { 'very good': 9, good: 7, 'good basics': 5 };

export default function NeonPage() {
  const projects = getProjects();
  const areas = getAreas();
  const noteCount = areas.reduce((n, a) => n + a.notes.length, 0);
  const featured = projects.slice(0, 5);
  const programming = skills.find((s) => s.group === 'Programming')!.items.map((i) => {
    const m = i.match(/^(.*?) \((.*)\)$/);
    return { name: (m?.[1] || i).toUpperCase(), level: m?.[2] || '' };
  });
  const tools = skills.filter((s) => s.group !== 'Programming').flatMap((s) => s.items);

  const blocks = {
    edu: education.map((e) => ({
      id: e.id, start: e.start, end: e.end ?? '2026-12', on: !e.end,
      t: e.title.replace('Applied Information and Data Science', 'Data Sci').replace('Psychology', 'Psych').toUpperCase(),
      s: e.org.match(/\((\w+)\)/)?.[1] || e.org,
    })),
    wrk: [
      { id: 'vebego', start: '2019-07', end: '2019-12', t: 'VB', s: 'airport' },
      { id: 'tx-intern', start: '2023-11', end: '2025-01', t: 'TX GROUP', s: 'market res.' },
      { id: 'helsana', start: '2025-01', end: '2025-07', t: 'HLS', s: 'Helsana' },
      { id: 'zurich', start: '2025-11', end: '2026-12', t: 'ZURICH', s: 'data sci.', on: true },
    ],
  };
  const current = work.find((w) => !w.end)!;
  const hslu = education.find((e) => !e.end)!;

  const ticker = [
    `NOW: ${current.org.toUpperCase()} — DATA SCIENCE & PM`,
    `M.SC. DATA SCIENCE @ HSLU UNTIL 12.2026`,
    `M.SC. & B.SC. PSYCHOLOGY @ UZH`,
    `2 THESES · GRADE 6`,
    `${noteCount} NOTES IN DATABANK`,
    `OPEN TO FULL-TIME ROLES FROM 01.2027`,
  ];

  const databank = areas.map((a) => ({
    dir: a.slug,
    notes: a.notes.map((n) => ({ slug: n.slug, title: n.title, minutes: n.minutes, href: withBase(`/wiki/${a.slug}/${n.slug}/`) })),
  }));

  return (
    <div className={`neon-root ${pixel.variable} ${vt.variable}`}>
      <canvas id="city" width={320} height={180} aria-hidden />
      <div className="crt" aria-hidden />

      <div id="boot" role="presentation">
        <a href="#top" className="nz-skip" id="skip">[ESC] SKIP</a>
        <pre id="bootlog" />
      </div>

      <header className="hud">
        <div className="wrap">
          <a className="logo flicker" href="#top">OZ<b>-</b>2026</a>
          <nav aria-label="Main">
            <a href="#log">MISSION LOG</a>
            <a href="#cases">CASE FILES</a>
            <a href="#bank">DATABANK</a>
            <a href="#tx">TRANSMIT</a>
            <Link href="/" className="exit">EXIT ⏏</Link>
          </nav>
          <Link href="/" className="mobile-exit">EXIT ⏏</Link>
          <span className="clock"><span id="clock">ZRH --:--:--</span> <span className="blink">▮</span></span>
        </div>
      </header>

      <main id="top">
        <div className="wrap hero">
          <div className="nz-copy">
            <h1 className="name glitch">OLIVER<br />ZINGG</h1>
            <p className="ident"><span id="type" /><span className="cur blink" /></p>
            <p className="lede">
              Psychologist and data scientist, Zürich sector. I design the study, model the data and explain what it means.{' '}
              <b>M.Sc. Applied Information &amp; Data Science, HSLU — December 2026.</b>
            </p>
            <div className="acts">
              <a className="btn" href="#cases">▶ ACCESS FILES</a>
              <a className="btn ghost" href="#log">VIEW RECORD</a>
            </div>
          </div>
          <div className="card-id panel pix">
            <span className="stamp">CLEARED<br />FOR HIRE</span>
            <div className="photo">
              <canvas data-src={withBase('/images/oliver.jpg')} data-w="96" data-h="120" role="img" aria-label="Portrait of Oliver Zingg, pixelated" />
              <div className="scan" />
            </div>
            <dl className="meta">
              <dt>SUBJECT</dt><dd>ZINGG, OLIVER</dd>
              <dt>CLASS</dt><dd>PSYCH // DATA</dd>
              <dt>SECTOR</dt><dd>ZÜRICH, CH</dd>
              <dt>STATUS</dt><dd style={{ color: 'var(--amber)' }}>AVAILABLE 01.2027</dd>
            </dl>
          </div>
        </div>

        <div className="ticker" aria-label="Status">
          <div>
            {[...ticker, ...ticker].map((t, i) => (
              <Fragment key={i}>{t}<span>◆</span></Fragment>
            ))}
          </div>
        </div>

        <section className="s wrap" id="log">
          <div className="sh"><h2>MISSION LOG</h2><p>Education above the line. Field work below.</p></div>
          <div className="panel pix log">
            <div className="log-inner" id="tl">
              <div className="years">
                {Array.from({ length: END - START }, (_, i) => START + i).map((y) => (
                  <span key={y} className={y === 2027 ? 'nx' : undefined}>{y}</span>
                ))}
              </div>
              {(['edu', 'wrk'] as const).map((lane) => (
                <div key={lane} className={`lane ${lane}`}>
                  <span className="lane-l">{lane === 'edu' ? 'EDU' : 'OPS'}</span>
                  {blocks[lane].map((b) => (
                    <Link
                      key={b.id}
                      href={`/experience/#${b.id}`}
                      className={`blk${'on' in b && b.on ? ' on' : ''}`}
                      style={{ left: `${pct(b.start)}%`, width: `${pct(b.end) - pct(b.start) - 0.4}%` }}
                    >
                      <b>{b.t}</b>{b.s}
                    </Link>
                  ))}
                  {lane === 'wrk' && (
                    <a href="#tx" className="blk next" style={{ left: `${pct('2027-01')}%`, width: `${100 - pct('2027-01') - 0.4}%` }}>
                      <b>NEXT?</b>your team
                    </a>
                  )}
                </div>
              ))}
              <div className="now" style={{ left: `${pct(TODAY)}%` }} />
            </div>
          </div>

          <div className="sheet">
            <div className="panel pix">
              <h3>// COMBAT STATS</h3>
              {programming.map((p) => (
                <div className="stat" key={p.name}>
                  <span>{p.name}</span>
                  <div className="bar" aria-label={`${p.name}: ${p.level}`}>
                    {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < (LEVEL[p.level] ?? 5) ? 'f' : undefined} />)}
                  </div>
                  <small>{p.level}</small>
                </div>
              ))}
            </div>
            <div className="panel pix">
              <h3>// INVENTORY</h3>
              <ul>{tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="panel pix">
              <h3>// LANGUAGE MODULES</h3>
              <ul>{languages.map((l) => <li key={l.name}>{l.name} — {l.level.split(',')[0].toLowerCase()}</li>)}</ul>
              <p className="certs">Certs: {certificates.map((c) => c.title).join(' · ')} (DeepLearning.AI &amp; Stanford)</p>
            </div>
          </div>
        </section>

        <section className="s wrap" id="cases">
          <div className="sh"><h2>CASE FILES</h2><p>{projects.length} files on record. Showing the priority cases.</p></div>
          <div className="cases">
            {featured.map((p, i) => (
              <Link key={p.slug} href={`/projects/${p.slug}/`} className={`case${i === 0 ? ' big' : ''}`}>
                <div className="thumb">
                  {p.cover ? <canvas data-src={p.cover} data-w={i === 0 ? 128 : 80} data-h={i === 0 ? 80 : 50} aria-hidden /> : null}
                </div>
                <div className="no"><span>CASE {String(i + 1).padStart(3, '0')} · {p.kind.toUpperCase()}</span><span>{p.year}</span></div>
                <h3>{p.title}</h3>
                {i < 2 && <p>{p.summary}</p>}
              </Link>
            ))}
          </div>
          <p className="more"><Link href="/projects/">▶ OPEN ALL {projects.length} CASE FILES</Link></p>
        </section>

        <section className="s wrap" id="bank">
          <div className="sh"><h2>DATABANK</h2><p>Personal knowledge base. {noteCount} entries, {areas.length} directories.</p></div>
          <div className="panel pix bank">
            <div className="dirs" role="tablist" aria-label="Directories" id="dirs" />
            <div className="term">
              <div><span className="prompt">oz@zrh:~/databank$</span> <span id="cmd">ls</span></div>
              <div id="rows" style={{ marginTop: 10 }} />
              <label className="query">
                <span>QUERY&gt;</span>
                <input id="q" placeholder="grep the databank, e.g. eigen, glm, rag" autoComplete="off" />
              </label>
            </div>
          </div>
        </section>

        <section className="s wrap" id="tx">
          <div className="panel pix tx">
            <h2>INCOMING TRANSMISSION?<br />I ASK THE RIGHT<br />QUESTION FIRST.</h2>
            <p>Hiring for data science in Zürich or remote? Open a channel.</p>
            <a className="btn" href={`mailto:${site.email}`}>▶ TRANSMIT: {site.email.toUpperCase()}</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} OLIVER ZINGG · ZÜRICH SECTOR · {hslu.org.match(/\((\w+)\)/)?.[1]} CLASS OF 2026</span>
          <span>
            <a href={site.links.github} target="_blank" rel="noopener">GITHUB</a> · <a href={site.links.linkedin} target="_blank" rel="noopener">LINKEDIN</a> ·{' '}
            <Link href="/">EXIT NEON MODE</Link>
          </span>
        </div>
      </footer>

      <script id="databank-data" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(databank) }} />
      <NeonEffects projectCount={projects.length} noteCount={noteCount} />
    </div>
  );
}
