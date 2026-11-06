import Link from 'next/link';
import type { Area } from '@/lib/content';

export default function WikiNav({ areas, current }: { areas: Area[]; current?: { area: string; slug?: string } }) {
  return (
    <>
      <h2>Knowledge base</h2>
      <ul className="wnav">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link className="area" href={`/wiki/${a.slug}/`} aria-current={current?.area === a.slug && !current.slug ? 'page' : undefined}>{a.title}</Link>
            <ul>
              {a.notes.map((n) => (
                <li key={n.slug}>
                  <Link href={`/wiki/${a.slug}/${n.slug}/`} aria-current={current?.area === a.slug && current.slug === n.slug ? 'page' : undefined}>{n.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
