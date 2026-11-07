'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { openSearch } from './SearchDialog';

const NAV = [
  { href: '/projects/', label: 'CASE FILES' },
  { href: '/wiki/', label: 'DATABANK' },
  { href: '/experience/', label: 'RECORD' },
];

export default function NeonHud() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('--:--:--');
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('de-CH', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="hud neon-only">
      <div className="hud-in">
        <Link href="/" className="logo" aria-label="Oliver Zingg, home">OZ<b>-</b>2026</Link>
        <nav id="hud-nav" className={open ? 'open' : undefined} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}>{n.label}</Link>
          ))}
          <Link href="/#tx">TRANSMIT</Link>
          <button className="hud-btn" onClick={() => { setOpen(false); openSearch(); }}>SCAN /</button>
        </nav>
        <div className="hud-right">
          <span className="clock" aria-hidden>ZRH {time} <i>▮</i></span>
          <ThemeToggle to="clean" />
          <button className="menu" aria-expanded={open} aria-controls="hud-nav" onClick={() => setOpen((v) => !v)}>{open ? 'X' : 'MENU'}</button>
        </div>
      </div>
    </header>
  );
}
