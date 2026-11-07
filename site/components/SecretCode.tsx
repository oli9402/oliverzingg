'use client';

import { useEffect } from 'react';
import { setTheme } from '@/lib/theme';

// ↑ ↑ ↓ ↓ ← → ← → B A flips between the neon and clean themes.
const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function SecretCode() {
  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === CODE[i] ? i + 1 : k === CODE[0] ? 1 : 0;
      if (i === CODE.length) {
        i = 0;
        const next = document.documentElement.dataset.theme === 'clean' ? 'neon' : 'clean';
        document.documentElement.classList.add('to-neon');
        setTimeout(() => { setTheme(next); document.documentElement.classList.remove('to-neon'); }, 420);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return null;
}
