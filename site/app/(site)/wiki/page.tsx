import type { Metadata } from 'next';
import Link from 'next/link';
import { getAreas } from '@/lib/content';
import { openSearchLabel } from './search-label';
import SearchButton from './SearchButton';

export const metadata: Metadata = {
  title: 'Knowledge base',
  description: 'My public notes on statistics, linear algebra, Python, SQL and research methods.',
};

export default function WikiIndex() {
  const areas = getAreas();
  const total = areas.reduce((n, a) => n + a.notes.length, 0);
  return (
    <div className="wrap">
      <header className="page-band">
        <p className="call"><b>&gt;</b><code>fs::dir_tree(&quot;wiki&quot;)</code><span className="cmt"># {total} notes</span></p>
        <h1 className="h-page">Knowledge base</h1>
        <p className="lede">{total} notes I keep while learning: written for my future self, open in case they help you. Formulas, code and worked examples included.</p>
        <div style={{ marginTop: 24 }}><SearchButton label={openSearchLabel} /></div>
      </header>
      <div className="areas">
        {areas.map((a) => (
          <section key={a.slug} className="area-row" aria-labelledby={`a-${a.slug}`}>
            <div className="n num" aria-hidden>{a.notes.length}<small>{a.notes.length === 1 ? 'note' : 'notes'}</small></div>
            <div>
              <h2 id={`a-${a.slug}`}><Link href={`/wiki/${a.slug}/`}>{a.title}</Link></h2>
              <p>{a.summary}</p>
            </div>
            <ul className="note-list">
              {a.notes.map((n) => (
                <li key={n.slug}>
                  <Link href={`/wiki/${a.slug}/${n.slug}/`}>
                    <span><b>{n.title}</b></span>
                    <span className="min">{n.minutes} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
