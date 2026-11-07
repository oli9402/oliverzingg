import Link from 'next/link';
import { education, work, toYear, TIMELINE_START, TIMELINE_END, TODAY, type Entry } from '@/lib/cv';

const span = TIMELINE_END - TIMELINE_START;
const pct = (ym: string) => ((toYear(ym) - TIMELINE_START) / span) * 100;
const years = Array.from({ length: span }, (_, i) => TIMELINE_START + i);
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (ym: string) => `${MONTH[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;

// short facts per degree (lib/cv.ts: grade averages and thesis grades)
const SUB: Record<string, string> = { hslu: 'part-time', 'msc-psy': 'avg 5.6 · thesis 6', 'bsc-psy': 'avg 5.5 · thesis 6' };

type Row ={ id: string; name: string; sub: string; start: string; end: string; edu?: boolean; live?: boolean; planEnd?: string };

function Lane({ r }: { r: Row }) {
  const left = pct(r.start);
  const right = r.live ? pct(TODAY) : pct(r.end);
  return (
    <div className="lane" aria-hidden>
      <span className={`bar${r.edu ? ' edu' : ''}${r.live ? ' live' : ''}`} style={{ left: `${left}%`, width: `${right - left}%` }} />
      {r.planEnd && <span className="bar plan" style={{ left: `${pct(TODAY) + 0.9}%`, width: `${pct(r.planEnd) - pct(TODAY) - 0.9}%` }} />}
    </div>
  );
}

export default function CareerTimeline() {
  const z = work.find((w) => w.id === 'zurich')!;
  const h = work.find((w) => w.id === 'helsana')!;
  const jobs: Row[] = [
    { id: 'zurich', name: 'Zurich Insurance', sub: `data science & PM · ${fmt(z.start)} – now`, start: z.start, end: TODAY, live: true },
    { id: 'helsana', name: 'Helsana', sub: `insights · ${fmt(h.start)} – ${fmt(h.end!)}`, start: h.start, end: h.end! },
    // intern, then on-call freelancer: one engagement
    { id: 'tx-intern', name: 'TX Group', sub: 'market research · Nov 2023 – Mar 2025', start: '2023-11', end: '2025-03' },
  ];
  const range = (e: Entry) => (e.yearOnly ? `${e.start.slice(0, 4)} – ${e.end!.slice(0, 4)}` : `${e.start.slice(0, 4)} – ${e.endLabel}`);
  const edu: Row[] = education.map((e) => ({
    id: e.id,
    name: e.id === 'hslu' ? 'M.Sc. Data Science, HSLU' : `${e.title}, UZH`,
    sub: `${SUB[e.id] ?? e.short} · ${range(e)}`,
    start: e.start,
    end: e.end ?? TODAY,
    edu: true,
    live: !e.end,
    planEnd: !e.end ? '2026-12' : undefined,
  }));

  const row = (r: Row) => (
    <Link key={r.id} href={`/experience/#${r.id}`} className="tl-row" aria-label={`${r.name}, ${r.sub}`}>
      <div className="who"><b>{r.name}</b><span>{r.sub}</span></div>
      <Lane r={r} />
    </Link>
  );

  return (
    <div className="tl" role="region" aria-label="Timeline of work and education, 2018 to 2027" tabIndex={0}>
      <div className="tl-in">
        <div className="tl-key" aria-hidden>
          <span><i style={{ background: 'var(--ink)' }} />work</span>
          <span><i style={{ boxShadow: 'inset 0 0 0 1.5px var(--ink)' }} />education</span>
          <span><i style={{ background: 'var(--accent)' }} />now</span>
          <span><i style={{ background: 'repeating-linear-gradient(90deg, var(--accent) 0 4px, transparent 4px 7px)' }} />planned</span>
        </div>
        <div className="tl-group">work</div>
        {jobs.map(row)}
        <div className="tl-group">education</div>
        {edu.map(row)}
        <div className="tl-axis" aria-hidden>
          <div />
          <div>{years.map((y) => <span key={y} className={y === 2027 ? 'next' : undefined}>{y}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
