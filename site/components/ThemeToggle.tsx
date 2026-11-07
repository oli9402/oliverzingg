'use client';

import { toggleTheme } from '@/lib/theme';

export default function ThemeToggle() {
  return (
    <button className="icon-btn theme-btn" type="button" onClick={toggleTheme} aria-label="Switch between light and dark mode" title="Light / dark">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="8" cy="8" r="5.75" />
        <path d="M8 2.25a5.75 5.75 0 0 1 0 11.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
