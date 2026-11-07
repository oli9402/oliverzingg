import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <Link href="/" className="brand">Oliver<span>·</span>Zingg</Link>
          <p style={{ margin: 0, maxWidth: '34ch' }}>Psychologist and data scientist in Zürich. Open to data science roles from January 2027.</p>
        </div>
        <div>
          <h2>Site</h2>
          <ul>
            <li><Link href="/projects/">Projects</Link></li>
            <li><Link href="/wiki/">Knowledge base</Link></li>
            <li><Link href="/experience/">Experience</Link></li>
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.location}</li>
          </ul>
        </div>
        <div>
          <h2>Elsewhere</h2>
          <ul>
            <li><a href={site.links.github} target="_blank" rel="noopener">GitHub</a></li>
            <li><a href={site.links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
        <div className="fine">
          <span>© {new Date().getFullYear()} Oliver Zingg</span>
          <span>Notes are my own learning material. Corrections welcome.</span>
          <Link href="/neon/" className="secret" title="Or type the code anywhere on the site">↑↑↓↓←→←→BA</Link>
        </div>
      </div>
    </footer>
  );
}
