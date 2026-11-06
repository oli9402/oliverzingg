'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/content';

export default function Toc({ headings, title = 'On this page' }: { headings: Heading[]; title?: string }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);
  if (headings.length < 2) return null;
  return (
    <>
      <h2>{title}</h2>
      <ul className="toc">
        {headings.map((h) => (
          <li key={h.id} className={`l${h.level}`}>
            <a href={`#${h.id}`} className={active === h.id ? 'is-active' : undefined}>{h.text}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function MobileToc({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;
  return (
    <details className="mobile-toc">
      <summary>On this page</summary>
      <ul className="toc">
        {headings.map((h) => <li key={h.id} className={`l${h.level}`}><a href={`#${h.id}`}>{h.text}</a></li>)}
      </ul>
    </details>
  );
}
