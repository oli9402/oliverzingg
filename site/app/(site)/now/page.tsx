import type { Metadata } from 'next';
import { getLog } from '@/lib/content';

export const metadata: Metadata = { title: 'Status log', description: 'Dated updates from Oliver Zingg: current work, thesis and what he is looking for.' };

export default function NowPage() {
  const log = getLog();
  return (
    <div className="wrap">
      <header className="page-band">
        <p className="call"><b>&gt;</b><code>log |&gt; arrange(desc(date))</code></p>
        <h1 className="h-page">{log.title}</h1>
        <p className="lede">{log.summary}</p>
      </header>
      <div>
        <ol className="statuslog">
          {log.entries.map((e, i) => (
            <li key={e.date} className={i === 0 ? 'is-latest' : undefined}>
              <time dateTime={e.date}>{e.label}</time>
              <div className="prose" dangerouslySetInnerHTML={{ __html: e.html }} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
