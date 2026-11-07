'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Profile } from '@/lib/profile';
import { setTheme } from '@/lib/theme';
import { isSoundOn, setSound, sfx } from '@/lib/sound';
import { openDossier } from './Dossier';
import { openSearch } from './SearchDialog';

const EVENT = 'oz:terminal';
export const openTerminal = () => window.dispatchEvent(new Event(EVENT));

type Line = { t: string; c?: 'dim' | 'ok' | 'err' | 'acc' | 'in'; href?: string };

const COMMANDS: [string, string][] = [
  ['help', 'list commands'],
  ['whoami', 'who is Oliver?'],
  ['ls [dir]', 'list projects/, wiki/, wiki/<area>/, log/'],
  ['cd <dir>', 'change directory (cd .. to go up)'],
  ['cat <file>', 'cv, log, or a project / note name'],
  ['open <name>', 'go to a project, note or page'],
  ['grep <text>', 'search every project and note'],
  ['dossier', 'one-screen summary for recruiters'],
  ['hire', 'how to reach me'],
  ['weather', 'live conditions in Zürich'],
  ['theme neon|clean', 'switch the look'],
  ['sound on|off', 'rain and 8-bit blips'],
  ['history · clear · exit', ''],
];

const PAGES: Record<string, string> = { home: '/', projects: '/projects/', wiki: '/wiki/', knowledge: '/wiki/', experience: '/experience/', cv: '/experience/', log: '/now/', now: '/now/' };

export default function Terminal({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const [cwd, setCwd] = useState('~');
  const hist = useRef<string[]>([]);
  const hi = useRef(-1);

  const print = useCallback((...l: Line[]) => setLines((x) => [...x, ...l]), []);
  const greet = useCallback(() => {
    setLines([
      { t: 'OZ-TERM v2.026 · ZÜRICH SECTOR', c: 'acc' },
      { t: `Type "help" for commands. Tab completes, ↑/↓ for history, Esc closes.`, c: 'dim' },
      { t: '' },
    ]);
  }, []);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    if (!lines.length) greet();
    d.showModal();
    setTimeout(() => input.current?.focus(), 0);
  }, [lines.length, greet]);
  const close = () => ref.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
      if (!typing && (e.key === '`' || e.key === '~' || e.code === 'Backquote')) { e.preventDefault(); open(); }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(EVENT, open);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener(EVENT, open); };
  }, [open]);
  useEffect(() => { out.current?.scrollTo(0, out.current.scrollHeight); }, [lines]);

  // everything addressable by name
  const files = useCallback(() => {
    const p = profile.projects.map((x) => ({ name: x.slug, title: x.title, href: `/projects/${x.slug}/`, kind: 'project', text: `${x.kind} · ${x.year} — ${x.summary}` }));
    const n = profile.areas.flatMap((a) => a.notes.map((x) => ({ name: x.slug, title: x.title, href: `/wiki/${a.slug}/${x.slug}/`, kind: `note in ${a.slug}`, text: `${a.title} · ${x.minutes} min read` })));
    return [...p, ...n];
  }, [profile]);
  const find = (q: string) => {
    const s = q.toLowerCase().replace(/\.md$/, '').replace(/\/$/, '');
    const all = files();
    return all.find((f) => f.name === s) || all.find((f) => f.name.startsWith(s)) || all.find((f) => (f.name + ' ' + f.title).toLowerCase().includes(s));
  };

  const run = (raw: string) => {
    const cmdline = raw.trim();
    print({ t: `${cwd} $ ${cmdline}`, c: 'in' });
    if (!cmdline) return;
    hist.current = [cmdline, ...hist.current.filter((h) => h !== cmdline)].slice(0, 50);
    hi.current = -1;
    const [cmd, ...args] = cmdline.split(/\s+/);
    const arg = args.join(' ');
    const dir = (a: string) => {
      const p = (a || cwd).replace(/^~\/?/, '').replace(/\/$/, '');
      return p === '..' ? '' : p;
    };
    switch (cmd.toLowerCase()) {
      case 'help':
        print(...COMMANDS.map(([c, d]) => ({ t: `  ${c.padEnd(24)}${d}` })));
        break;
      case 'whoami':
        print({ t: `${profile.name} — ${profile.role}.`, c: 'acc' }, { t: profile.pitch }, { t: profile.now }, { t: profile.availability, c: 'ok' });
        break;
      case 'ls': {
        const d = dir(arg);
        if (!d) { print({ t: 'projects/   wiki/   log/   cv.txt   contact.txt', c: 'acc' }); break; }
        if (d === 'projects') { print(...profile.projects.map((p) => ({ t: `  ${String(p.year)}  ${p.slug}.md`, href: `/projects/${p.slug}/` }))); break; }
        if (d === 'wiki') { print(...profile.areas.map((a) => ({ t: `  ${a.slug}/  (${a.notes.length})`, c: 'acc' as const }))); break; }
        if (d === 'log') { print(...profile.log.map((l) => ({ t: `  [${l.label}] ${l.text.slice(0, 70)}${l.text.length > 70 ? '…' : ''}` }))); break; }
        const area = profile.areas.find((a) => `wiki/${a.slug}` === d || a.slug === d);
        if (area) { print(...area.notes.map((n) => ({ t: `  ${n.slug}.md  ${n.minutes}m`, href: `/wiki/${area.slug}/${n.slug}/` }))); break; }
        print({ t: `ls: ${arg}: no such directory`, c: 'err' }); sfx.error();
        break;
      }
      case 'cd': {
        const d = dir(arg);
        if (!arg || arg === '~' || d === '') { setCwd('~'); break; }
        const target = d.startsWith('wiki/') || ['projects', 'wiki', 'log'].includes(d) ? d : profile.areas.some((a) => a.slug === d) && cwd === '~/wiki' ? `wiki/${d}` : d;
        if (['projects', 'wiki', 'log'].includes(target) || profile.areas.some((a) => `wiki/${a.slug}` === target)) setCwd(`~/${target}`);
        else { print({ t: `cd: ${arg}: no such directory`, c: 'err' }); sfx.error(); }
        break;
      }
      case 'cat': {
        const a = arg.toLowerCase().replace(/\.(txt|md)$/, '');
        if (a === 'cv') {
          print({ t: 'WORK', c: 'acc' }, ...profile.work.map((t) => ({ t: `  ${t}` })), { t: 'EDUCATION', c: 'acc' }, ...profile.education.map((t) => ({ t: `  ${t}` })),
            { t: 'SKILLS', c: 'acc' }, ...profile.skills.map((t) => ({ t: `  ${t}` })), { t: 'LANGUAGES', c: 'acc' }, ...profile.languages.map((t) => ({ t: `  ${t}` })),
            { t: 'Full record: open experience', c: 'dim', href: '/experience/' });
          break;
        }
        if (a === 'log') { print(...profile.log.map((l) => ({ t: `[${l.label}] ${l.text}` }))); break; }
        if (a === 'contact') { print({ t: `email     ${profile.email}`, href: `mailto:${profile.email}` }, { t: `linkedin  ${profile.links.linkedin}`, href: profile.links.linkedin }, { t: `github    ${profile.links.github}`, href: profile.links.github }); break; }
        const f = a && find(a);
        if (f) print({ t: f.title, c: 'acc' }, { t: f.text }, { t: `→ open ${f.name}`, c: 'dim', href: f.href });
        else { print({ t: `cat: ${arg || '(nothing)'}: no such file. Try "ls".`, c: 'err' }); sfx.error(); }
        break;
      }
      case 'open': case 'goto': case 'cd..': {
        const a = arg.toLowerCase();
        if (PAGES[a]) { print({ t: `opening ${PAGES[a]}`, c: 'ok' }); close(); router.push(PAGES[a]); break; }
        const f = a && find(a);
        if (f) { print({ t: `opening ${f.title}`, c: 'ok' }); close(); router.push(f.href); }
        else { print({ t: `open: nothing matches "${arg}". Try "grep ${arg}".`, c: 'err' }); sfx.error(); }
        break;
      }
      case 'grep': case 'search': case 'find': {
        if (!arg) { print({ t: 'usage: grep <text>', c: 'err' }); break; }
        const q = arg.toLowerCase();
        const hits = files().filter((f) => `${f.name} ${f.title} ${f.text}`.toLowerCase().includes(q));
        if (hits.length) print(...hits.slice(0, 12).map((h) => ({ t: `  ${h.kind.padEnd(22)} ${h.title}`, href: h.href })), ...(hits.length > 12 ? [{ t: `  … ${hits.length - 12} more`, c: 'dim' as const }] : []));
        else print({ t: `no matches for "${arg}" in titles. Full-text search: opening SCAN…`, c: 'dim' });
        if (!hits.length) { close(); openSearch(); }
        break;
      }
      case 'dossier': close(); openDossier(); break;
      case 'hire': case 'contact': case 'mail':
        print({ t: profile.availability, c: 'ok' }, { t: `email ${profile.email}  (click to write)`, href: `mailto:${profile.email}` }, { t: `linkedin ${profile.links.linkedin}`, href: profile.links.linkedin });
        break;
      case 'sudo':
        if (/hire/.test(arg)) print({ t: '[sudo] password for recruiter: ********', c: 'dim' }, { t: 'Access granted. Opening a channel…', c: 'ok' }, { t: `email ${profile.email}`, href: `mailto:${profile.email}` });
        else print({ t: 'Nice try. This incident will be reported to the Zürich sector.', c: 'err' });
        break;
      case 'rm':
        print({ t: 'rm: refusing to delete the city. It took a while to draw.', c: 'err' }); sfx.error();
        break;
      case 'weather': {
        const e = window.__ozEnv;
        if (!e) { print({ t: 'weather: no signal yet', c: 'err' }); break; }
        print({ t: `Zürich: ${e.tempC !== null ? `${e.tempC}°C, ` : ''}${e.label.toLowerCase()}, ${e.phase}`, c: 'acc' }, { t: e.live ? 'Live from Open-Meteo. The city outside follows it.' : 'Live data unavailable; showing the default rainy night.', c: 'dim' });
        break;
      }
      case 'theme':
        if (arg === 'clean' || arg === 'neon') { setTheme(arg); print({ t: `theme: ${arg}`, c: 'ok' }); }
        else print({ t: 'usage: theme neon|clean', c: 'err' });
        break;
      case 'sound':
        if (arg === 'on' || arg === 'off') { setSound(arg === 'on'); print({ t: `sound: ${arg}`, c: 'ok' }); }
        else print({ t: `sound is ${isSoundOn() ? 'on' : 'off'}. usage: sound on|off` });
        break;
      case 'history': print(...[...hist.current].reverse().map((h, i) => ({ t: `  ${String(i + 1).padStart(3)}  ${h}`, c: 'dim' as const }))); break;
      case 'clear': greet(); break;
      case 'exit': case 'quit': case 'q': close(); break;
      case 'pwd': print({ t: cwd.replace('~', '/home/oz') }); break;
      case 'date': print({ t: new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' }) + ' (Zürich)' }); break;
      case 'echo': print({ t: arg }); break;
      default:
        print({ t: `${cmd}: command not found. Type "help".`, c: 'err' }); sfx.error();
    }
  };

  const complete = () => {
    const parts = value.split(/\s+/);
    if (parts.length === 1) {
      const names = COMMANDS.map(([c]) => c.split(' ')[0]).filter((c) => c.startsWith(parts[0]));
      if (names.length === 1) setValue(names[0] + ' ');
      else if (names.length) print({ t: names.join('   '), c: 'dim' });
      return;
    }
    const last = parts[parts.length - 1].toLowerCase();
    const pool = [...files().map((f) => f.name), 'projects/', 'wiki/', 'log/', 'cv', ...profile.areas.map((a) => a.slug + '/'), ...Object.keys(PAGES)];
    const m = [...new Set(pool.filter((n) => n.startsWith(last)))];
    if (m.length === 1) setValue([...parts.slice(0, -1), m[0]].join(' ') + (m[0].endsWith('/') ? '' : ' '));
    else if (m.length) print({ t: m.slice(0, 16).join('   '), c: 'dim' });
  };

  return (
    <dialog ref={ref} className="term-dialog" aria-label="Terminal" onClick={(e) => { if (e.target === ref.current) close(); else input.current?.focus(); }}>
      <div className="term-bar"><span>oz@zrh: {cwd}</span><button onClick={close} aria-label="Close terminal">X</button></div>
      <div className="term-out" ref={out} role="log" aria-live="polite">
        {lines.map((l, i) =>
          l.href ? (
            <a key={i} className={`tl ${l.c || ''}`} href={l.href} onClick={(e) => { if (l.href!.startsWith('/')) { e.preventDefault(); close(); router.push(l.href!); } }}>{l.t || ' '}</a>
          ) : (
            <div key={i} className={`tl ${l.c || ''}`}>{l.t || ' '}</div>
          ),
        )}
      </div>
      <form className="term-in" onSubmit={(e) => { e.preventDefault(); run(value); setValue(''); }}>
        <label htmlFor="term-input">{cwd} $</label>
        <input
          id="term-input"
          ref={input}
          value={value}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => { setValue(e.target.value); sfx.key(); }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') { e.preventDefault(); complete(); }
            if (e.key === 'ArrowUp') { e.preventDefault(); hi.current = Math.min(hi.current + 1, hist.current.length - 1); setValue(hist.current[hi.current] ?? ''); }
            if (e.key === 'ArrowDown') { e.preventDefault(); hi.current = Math.max(hi.current - 1, -1); setValue(hi.current < 0 ? '' : hist.current[hi.current]); }
            if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); greet(); }
          }}
        />
      </form>
    </dialog>
  );
}
