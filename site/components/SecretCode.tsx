'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ↑ ↑ ↓ ↓ ← → ← → B A opens the neon-noir version of the site.
const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function SecretCode() {
  const router = useRouter();
  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === CODE[i] ? i + 1 : k === CODE[0] ? 1 : 0;
      if (i === CODE.length) {
        i = 0;
        document.documentElement.classList.add('to-neon');
        setTimeout(() => router.push('/neon/'), 450);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);
  return null;
}
