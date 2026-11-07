'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

export default function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <>
      <button type="button" className="btn btn-ghost" onClick={copy}>{site.email} <span aria-hidden>⧉</span></button>
      <span className="copied" role="status">{done ? 'copied' : ''}</span>
    </>
  );
}
