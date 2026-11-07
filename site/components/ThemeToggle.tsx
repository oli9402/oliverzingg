'use client';

import { setTheme, type Theme } from '@/lib/theme';

/** One button per theme; each lives in that theme's header. */
export default function ThemeToggle({ to }: { to: Theme }) {
  const neon = to === 'neon';
  const go = () => {
    if (neon) {
      document.documentElement.classList.add('to-neon');
      setTimeout(() => { setTheme('neon'); document.documentElement.classList.remove('to-neon'); }, 420);
    } else setTheme('clean');
  };
  return neon ? (
    <button className="theme-toggle-clean" onClick={go} title="Switch to the 16-bit neon design">
      <span aria-hidden>▚</span> 16-bit mode
    </button>
  ) : (
    <button className="theme-toggle-neon" onClick={go} title="Switch to a clean, minimal design">
      CLEAN MODE
    </button>
  );
}
