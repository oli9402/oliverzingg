import Link from 'next/link';
import PixelCover from './PixelCover';

export type CardProject = { slug: string; title: string; summary: string; year: number; kind: string; cover?: string; art?: string };

export const isFigure = (src?: string) => !!src && /\.(png|svg)$/i.test(src);

export default function ProjectCard({ p, wide, showSummary }: { p: CardProject; wide?: boolean; showSummary?: boolean }) {
  return (
    <Link href={`/projects/${p.slug}/`} className={`pcard${wide ? ' wide' : ''}`}>
      <div className={`img${isFigure(p.cover) ? ' is-figure' : ''}`}>
        {p.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.cover} alt="" loading="lazy" />
        ) : (
          <div className="noimg" aria-hidden>{p.kind}</div>
        )}
        <span className="neon-only pc-art"><PixelCover slug={p.slug} kind={p.kind} art={p.art} /></span>
      </div>
      <div className="row"><span>{p.kind}</span><span className="num">{p.year}</span></div>
      <h3>{p.title}</h3>
      {showSummary && <p>{p.summary}</p>}
    </Link>
  );
}
