'use client';

import { useEffect, useState } from 'react';
import { isNeon, setNeon, SKIN_EVENT } from '@/lib/theme';

export default function SkinToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(isNeon());
    const sync = (e: Event) => setOn((e as CustomEvent<boolean>).detail);
    window.addEventListener(SKIN_EVENT, sync);
    return () => window.removeEventListener(SKIN_EVENT, sync);
  }, []);
  return (
    <button
      type="button"
      className="skin-btn"
      aria-pressed={on}
      onClick={() => setNeon(!on)}
      title={on ? 'Back to the clean console design' : 'Switch to the neon night-city design'}
    >
      <i aria-hidden />
      <span className="lbl">{on ? 'exit neon' : 'neon mode'}</span>
      <span className="sr-only">{on ? '' : ' (switch design)'}</span>
    </button>
  );
}
