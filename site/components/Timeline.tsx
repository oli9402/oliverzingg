import Link from 'next/link';
import ScrollToEnd from './ScrollToEnd';
import { education, work, toYear, TIMELINE_START, TIMELINE_END, TODAY, type Entry } from '@/lib/cv';

const span = TIMELINE_END - TIMELINE_START;
const pct = (ym: string) => ((toYear(ym) - TIMELINE_START) / span) * 100;
// ongoing entries run to their planned end, or to the end of 2026
const endOf = (e: Entry) => e.end ?? '2026-12';
const years = Array.from({ length: span }, (_, i) => TIMELINE_START + i);

type BarProps = { id: string; start: string; end: string; title: string; sub: string; now?: boolean; label: string };

function Bar({ id, start, end, title, sub, now, label }: BarProps) {
  const left = pct(start);
  const width = pct(end) - left - 0.3; // hairline gap between neighbours
  return (
    <Link
      href={`/experience/#${id}`}
      className={`tl-bar${now ? ' is-now' : ''}${width < 7 ? ' is-narrow' : ''}`}
      style={{ left: `${left}%`, width: `${width}%` }}
      aria-label={label}
      title={label}
    >
      <b>{title}</b>
      <span>{sub}</span>
    </Link>
  );
}

export default function Timeline() {
  const edu = education.map((e) => ({
    id: e.id, start: e.start, end: endOf(e), now: !e.end,
    title: e.title.replace('Applied Information and Data Science', 'Data Science'),
    sub: e.org.replace(/ \((UZH|HSLU)\)$/, '').replace('Lucerne University of Applied Sciences', 'HSLU Lucerne'),
    label: `${e.title}, ${e.org}`,
  }));
  // Short temporary jobs stay on the full CV. TX Group (intern, then freelance) is one engagement;
  // its bar stops where Helsana starts so both labels stay readable.
  const zurich = work.find((w) => w.id === 'zurich')!;
  const helsana = work.find((w) => w.id === 'helsana')!;
  const jobs = [
    { id: 'tx-intern', start: '2023-11', end: '2025-01', title: 'TX Group', sub: 'Market research', label: 'TX Group: market research intern, then freelancer, Nov 2023 – Mar 2025' },
    { id: 'helsana', start: helsana.start, end: helsana.end!, title: 'Helsana', sub: 'Insights', label: `${helsana.title}, Helsana` },
    { id: 'zurich', start: zurich.start, end: endOf(zurich), title: 'Zurich', sub: 'Data science', now: true, label: `${zurich.title}, Zurich Insurance` },
  ];

  return (
    <ScrollToEnd className="tl-scroll" label="Timeline of education and work, 2018 to 2027">
      <div className="tl">
        <div className="tl-years num" aria-hidden style={{ gridTemplateColumns: `repeat(${span}, 1fr)` }}>
          {years.map((y) => <span key={y} className={y === 2027 ? 'is-next' : undefined}>{y}</span>)}
        </div>
        <div className="tl-lane edu">
          {edu.map((b) => <Bar key={b.id} {...b} />)}
        </div>
        <div className="tl-lane work">
          {jobs.map((b) => <Bar key={b.id} {...b} />)}
          <Link href="/#contact" className="tl-next" style={{ left: `${pct('2027-01')}%`, width: `${100 - pct('2027-01')}%` }}>
            <b>Next</b>
            <span>Full-time role</span>
          </Link>
        </div>
        <div className="tl-today" style={{ left: `${pct(TODAY)}%` }} aria-hidden />
      </div>
    </ScrollToEnd>
  );
}
