'use client';
import { useEffect, useRef } from 'react';

/** Horizontal scroller that opens on its most recent (right-hand) end. */
export default function ScrollToEnd({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth;
  }, []);
  return <div ref={ref} className={className} role="region" aria-label={label} tabIndex={0}>{children}</div>;
}
