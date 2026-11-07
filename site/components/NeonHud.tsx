'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { openSearch } from './SearchDialog';
import { ENV_EVENT, type Env } from '@/lib/zurich';
import { installSound, isSoundOn, setSound } from '@/lib/sound';
import { openTerminal } from './Terminal';
import { openDossier } from './Dossier';

const NAV = [
  { href: '/projects/', label: 'PROJECTS' },
  { href: '/wiki/', label: 'NOTES' },
  { href: '/experience/', label: 'EXPERIENCE · CV' },
  { href: '/now/', label: 'NOW' },
];

export default function NeonHud() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('--:--:--');
  const [env, setEnv] = useState<Env | null>(null);
  const [sound, setSoundState] = useState(false);
  useEffect(() => {
    installSound();
    setSoundState(isSoundOn());
    if (window.__ozEnv) setEnv(window.__ozEnv);
    const onEnv = (e: Event) => setEnv((e as CustomEvent<Env>).detail);
    const onSound = (e: Event) => setSoundState((e as CustomEvent<boolean>).detail);
    window.addEventListener(ENV_EVENT, onEnv);
    window.addEventListener('oz:sound', onSound);
    return () => { window.removeEventListener(ENV_EVENT, onEnv); window.removeEventListener('oz:sound', onSound); };
  }, []);
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
          <Link href="/#tx">CONTACT</Link>
          <button className="hud-btn" onClick={() => { setOpen(false); openSearch(); }} title="Search projects and notes (press /)">SEARCH</button>
          <button className="hud-btn" onClick={() => { setOpen(false); openTerminal(); }} title="Open the terminal (press ` anywhere)">TERMINAL</button>
          <button className="hud-btn menu-only" onClick={() => setSound(!sound)} aria-pressed={sound}>{sound ? 'SOUND: ON' : 'SOUND: OFF'}</button>
        </nav>
        <div className="hud-right">
          <button className="dossier-btn" onClick={() => { setOpen(false); openDossier(); }} title="One-screen summary: role, availability, top projects, contact">DOSSIER</button>
          <span className="clock" title={env?.live ? 'Live weather in Zürich (Open-Meteo)' : 'Weather unavailable'}>
            ZRH {time}{env && <> · {env.tempC !== null ? `${env.tempC}°C ` : ''}{env.label}</>} <i aria-hidden>▮</i>
          </span>
          <button className={`sound-btn${sound ? ' on' : ''}`} onClick={() => setSound(!sound)} aria-pressed={sound} title={sound ? 'Sound on: click to mute' : 'Sound off: click for rain and 8-bit blips'}>
            {sound ? '♪ ON' : '♪ OFF'}
          </button>
          <ThemeToggle to="clean" />
          <button className="menu" aria-expanded={open} aria-controls="hud-nav" onClick={() => setOpen((v) => !v)}>{open ? 'X' : 'MENU'}</button>
        </div>
      </div>
    </header>
  );
}
