'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Profile } from '@/lib/profile';
import { isFigure } from './ProjectCard';

const EVENT = 'oz:dossier';
export const openDossier = () => window.dispatchEvent(new Event(EVENT));

/** One screen for busy recruiters: who, three strongest projects, availability, contact. */
export default function Dossier({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const open = () => { if (!ref.current?.open) ref.current?.showModal(); };
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);
  const close = () => ref.current?.close();
  const top = profile.projects.slice(0, 3);

  return (
    <dialog ref={ref} className="dossier" aria-labelledby="dossier-title" onClick={(e) => { if (e.target === ref.current) close(); }}>
      <div className="dossier-in">
        <header className="dossier-head">
          <span className="dossier-tag">QUICK DOSSIER · 30 SEC READ</span>
          <button className="dossier-x" onClick={close} aria-label="Close dossier">X</button>
        </header>
        <h2 id="dossier-title">{profile.name.toUpperCase()}</h2>
        <p className="dossier-role">{profile.role}. {profile.pitch}</p>
        <dl className="dossier-facts">
          <dt>STATUS</dt><dd className="hi">{profile.availability}</dd>
          <dt>NOW</dt><dd>{profile.now}</dd>
          <dt>THESIS</dt><dd>{profile.thesis}</dd>
          <dt>EDUCATION</dt><dd>M.Sc. Psychology (UZH, 5.6) · M.Sc. Applied Information &amp; Data Science (HSLU, Dec 2026)</dd>
          <dt>TOOLS</dt><dd>R, Python, SQL, Matlab · Power BI, Tableau · mixed models, ML, BERTopic</dd>
        </dl>
        <h3>TOP CASE FILES</h3>
        <ol className="dossier-cases">
          {top.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}/`} onClick={close}>
                <span className={`dc-img${isFigure(p.cover) ? ' fig' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.cover && <img src={p.cover} alt="" loading="lazy" />}
                </span>
                <span className="dc-t"><b>{p.title}</b><small>{p.kind} · {p.year}</small></span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="dossier-acts">
          <a className="btn" href={`mailto:${profile.email}`}>▶ EMAIL {profile.email.toUpperCase()}</a>
          <Link className="btn btn-ghost" href="/experience/" onClick={close}>FULL RECORD</Link>
          <a className="dossier-link" href={profile.links.linkedin} target="_blank" rel="noopener">LINKEDIN ↗</a>
        </div>
      </div>
    </dialog>
  );
}
