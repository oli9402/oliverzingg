'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { basePath, site } from '@/lib/site';
import { isNeon, setNeon, toggleTheme } from '@/lib/theme';

type Quick = { k: string; t: string; u?: string; e?: string; run?: () => void };

export type SearchDoc = { u: string; t: string; k: string; s: string; h: string; x: string };

const EVENT = 'oz:open-search';
export const openSearch = () => window.dispatchEvent(new Event(EVENT));

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function score(doc: SearchDoc, terms: string[]) {
  const t = norm(doc.t), h = norm(doc.h), s = norm(doc.s), x = norm(doc.x);
  let total = 0;
  for (const term of terms) {
    let v = 0;
    if (t.includes(term)) v += t.startsWith(term) ? 14 : 10;
    if (h.includes(term)) v += 5;
    if (s.includes(term)) v += 3;
    if (x.includes(term)) v += 1;
    if (!v) return 0; // every term must match somewhere
    total += v;
  }
  return total;
}

function snippet(doc: SearchDoc, terms: string[]) {
  const x = doc.x;
  const nx = norm(x);
  let at = -1;
  for (const term of terms) { at = nx.indexOf(term); if (at >= 0) break; }
  if (at < 0) return doc.s || x.slice(0, 140);
  const start = Math.max(0, at - 50);
  return (start ? '…' : '') + x.slice(start, start + 150).trim() + '…';
}

function highlight(text: string, terms: string[]) {
  if (!terms.length) return text;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

export default function SearchDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const router = useRouter();

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    setTimeout(() => inputRef.current?.focus(), 0);
    if (!docs) {
      fetch(`${basePath}/search-index.json`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then(setDocs)
        .catch(() => setFailed(true));
    }
  }, [docs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(EVENT, open);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener(EVENT, open); };
  }, [open]);

  const terms = useMemo(() => norm(q).split(/\s+/).filter((t) => t.length > 1), [q]);
  const results = useMemo(() => {
    if (!docs || !terms.length) return [];
    return docs
      .map((d) => ({ d, v: score(d, terms) }))
      .filter((r) => r.v > 0)
      .sort((a, b) => b.v - a.v)
      .slice(0, 12)
      .map((r) => r.d);
  }, [docs, terms]);

  useEffect(() => setSel(0), [q]);

  const go = (u: string) => {
    ref.current?.close();
    setQ('');
    router.push(u);
  };

  // Shown before anything is typed: pages and actions, so the bar works as a launcher too.
  const quick: Quick[] = [
    { k: 'page', t: 'Projects', u: '/projects/' },
    { k: 'page', t: 'Knowledge base', u: '/wiki/' },
    { k: 'page', t: 'Experience and CV', u: '/experience/' },
    { k: 'page', t: 'Status log', u: '/now/' },
    { k: 'action', t: 'Copy email address', e: site.email, run: () => { navigator.clipboard?.writeText(site.email).catch(() => {}); ref.current?.close(); } },
    { k: 'action', t: 'Switch light / dark', run: () => { toggleTheme(); ref.current?.close(); } },
    { k: 'action', t: 'Toggle neon mode', run: () => { setNeon(!isNeon()); ref.current?.close(); } },
    { k: 'link', t: 'GitHub', e: 'oli9402', run: () => { window.open(site.links.github, '_blank', 'noopener'); ref.current?.close(); } },
    { k: 'link', t: 'LinkedIn', run: () => { window.open(site.links.linkedin, '_blank', 'noopener'); ref.current?.close(); } },
  ];
  const runQuick = (item: Quick) => (item.u ? go(item.u) : item.run?.());
  const listLen = terms.length ? results.length : quick.length;

  return (
    <dialog
      ref={ref}
      className="search-dialog"
      aria-label="Jump to a page, project or note"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      <div className="search-input">
        <span className="pr" aria-hidden>&gt;</span>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects and notes, e.g. mixed models, eigenvalues, RAG"
          aria-label="Search"
          aria-controls="search-results"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, listLen - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === 'Enter') {
              if (terms.length && results[sel]) go(results[sel].u);
              if (!terms.length && quick[sel]) runQuick(quick[sel]);
            }
          }}
        />
        <span className="kbd">esc</span>
      </div>
      {!terms.length ? (
        <ul className="search-results" id="search-results" role="listbox">
          {quick.map((item, i) => (
            <li key={item.t}>
              <button type="button" role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)} onClick={() => runQuick(item)}>
                <span className="k">{item.k}</span>
                <span className="t"><b>{item.t}</b></span>
                {item.e && <em>{item.e}</em>}
              </button>
            </li>
          ))}
        </ul>
      ) : failed ? (
        <p className="search-empty">The search index didn&apos;t load. Check your connection and try again.</p>
      ) : !docs ? (
        <p className="search-empty">Loading the index…</p>
      ) : results.length === 0 ? (
        <p className="search-empty">No match for “{q}”. Try a broader term, like “regression” or “python”.</p>
      ) : (
        <ul className="search-results" id="search-results" role="listbox">
          {results.map((r, i) => (
            <li key={r.u}>
              <a
                href={`${basePath}${r.u}`}
                role="option"
                aria-selected={i === sel}
                onMouseEnter={() => setSel(i)}
                onClick={(e) => { e.preventDefault(); go(r.u); }}
              >
                <span className="k">{r.k.toLowerCase()}</span>
                <span className="t">
                  <b>{highlight(r.t, terms)}</b>
                  <small>{highlight(snippet(r, terms), terms)}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="search-foot"><span><span className="kbd">↑↓</span> move</span><span><span className="kbd">↵</span> open</span><span><span className="kbd">esc</span> close</span></div>
    </dialog>
  );
}
