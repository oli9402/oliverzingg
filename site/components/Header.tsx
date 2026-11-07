'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Close } from './Icons';
import { openSearch } from './SearchDialog';
import ThemeToggle from './ThemeToggle';
import SkinToggle from './SkinToggle';

const NAV = [
  { href: '/projects/', label: 'projects' },
  { href: '/wiki/', label: 'wiki' },
  { href: '/experience/', label: 'experience' },
  { href: '/now/', label: 'now' },
];

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Oliver Zingg, home">oliver-zingg<span>.ch</span></Link>
        <nav id="site-nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}>{n.label}</Link>
          ))}
          <Link href="/#contact">contact</Link>
        </nav>
        <div className="head-r">
          <button className="jump" type="button" onClick={openSearch} aria-haspopup="dialog">
            <span className="lbl">Jump to…</span>
            <span className="kbd">{mac ? '⌘K' : 'Ctrl K'}</span>
          </button>
          <SkinToggle />
          <ThemeToggle />
          <button className="icon-btn menu-btn" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
            {open ? <Close /> : <Menu />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
