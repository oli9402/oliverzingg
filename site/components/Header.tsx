'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Close, Search } from './Icons';
import { openSearch } from './SearchDialog';

const NAV = [
  { href: '/projects/', label: 'Projects' },
  { href: '/wiki/', label: 'Knowledge' },
  { href: '/experience/', label: 'Experience' },
];

export default function Header() {
  const pathname = usePathname() || '/';
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header${isHome ? ' is-home on-blue' : ''}`}>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Oliver Zingg, home">
          Oliver<span>·</span>Zingg
        </Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
          {open ? <Close /> : <Menu />}
          <span className="sr-only">Menu</span>
        </button>
        <nav id="site-nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/#contact">Contact</Link>
          <button className="search-btn" onClick={() => { setOpen(false); openSearch(); }}>
            <Search /> Search <kbd>/</kbd>
          </button>
        </nav>
      </div>
    </header>
  );
}
