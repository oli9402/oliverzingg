import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Oliver Zingg · {site.location}</span>
        <nav aria-label="Footer">
          <Link href="/projects/">projects</Link>
          <Link href="/wiki/">wiki</Link>
          <Link href="/experience/">experience</Link>
          <Link href="/now/">now</Link>
          <a href={site.links.github} target="_blank" rel="noopener">github</a>
          <a href={site.links.linkedin} target="_blank" rel="noopener">linkedin</a>
        </nav>
      </div>
    </footer>
  );
}
