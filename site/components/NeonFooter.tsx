import Link from 'next/link';
import { site } from '@/lib/site';

export default function NeonFooter() {
  return (
    <footer className="nz-footer neon-only">
      <div className="nz-footer-in">
        <span>© {new Date().getFullYear()} OLIVER ZINGG · ZÜRICH SECTOR · OPEN TO DATA SCIENCE ROLES 01.2027</span>
        <span>
          <a href={`mailto:${site.email}`}>EMAIL</a> · <a href={site.links.github} target="_blank" rel="noopener">GITHUB</a> ·{' '}
          <a href={site.links.linkedin} target="_blank" rel="noopener">LINKEDIN</a> · <Link href="/now/">LOG</Link> · <span className="nz-hint">PRESS ` FOR TERMINAL</span>
        </span>
      </div>
    </footer>
  );
}
