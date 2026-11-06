'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from './Icons';
import { basePath } from '@/lib/site';

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

  return (
    <dialog
      ref={ref}
      className="search-dialog"
      aria-label="Search the site"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      <div className="search-input">
        <Search />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects and notes, e.g. mixed models, eigenvalues, RAG"
          aria-label="Search"
          aria-controls="search-results"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === 'Enter' && results[sel]) go(results[sel].u);
          }}
        />
        <kbd>Esc</kbd>
      </div>
      {failed ? (
        <p className="search-empty">The search index didn&apos;t load. Check your connection and try again.</p>
      ) : !terms.length ? (
        <p className="search-empty">Type at least two letters. Search covers every project and knowledge-base note.</p>
      ) : !docs ? (
        <p className="search-empty">Loading the index…</p>
      ) : results.length === 0 ? (
        <p className="search-empty">Nothing matches “{q}”. Try a broader term, like “regression” or “python”.</p>
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
                <span className="k">{r.k}</span>
                <b>{highlight(r.t, terms)}</b>
                <small>{highlight(snippet(r, terms), terms)}</small>
              </a>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  );
}
