'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const W = 320, H = 180, DURATION = 620;

/**
 * Page-change transition for neon mode: a sheet of rain sweeps diagonally across
 * the screen while the old page washes out underneath (see ::view-transition-*(.rain)).
 */
export default function RainWipe() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const cv = ref.current, g = cv?.getContext('2d');
    if (!cv || !g) return;
    if (document.documentElement.dataset.theme === 'clean' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let seed = 99;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const streaks = Array.from({ length: 900 }, () => ({ x: rnd() * 1.6 - 0.3, y: rnd() * H, l: 6 + rnd() * 14, a: 0.3 + rnd() * 0.6 }));
    const start = performance.now();
    let raf = 0;
    cv.style.opacity = '1';
    const frame = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2; // ease in-out
      const front = -0.35 + e * 1.7; // sheet centre, in screen widths
      g.clearRect(0, 0, W, H);
      // the sheet: a dense band of falling streaks with a misty core, slanted with the wind
      for (const s of streaks) {
        const yy = (s.y + p * 260) % H;
        const x = (s.x + (front - 0.5)) * W - yy * 0.35;
        const d = Math.abs(x / W - front + yy * 0.35 / W);
        if (d > 0.22) continue;
        const k = 1 - d / 0.22;
        g.fillStyle = `rgba(190,220,255,${s.a * k})`;
        for (let i = 0; i < s.l * k; i++) g.fillRect((x + i * 0.35) | 0, (yy - i) | 0, 1, 1);
      }
      const grd = g.createLinearGradient((front - 0.2) * W, 0, (front + 0.2) * W, 0);
      grd.addColorStop(0, 'rgba(62,242,255,0)'); grd.addColorStop(0.5, 'rgba(120,160,255,0.22)'); grd.addColorStop(1, 'rgba(62,242,255,0)');
      g.fillStyle = grd; g.fillRect(0, 0, W, H);
      if (p < 1) raf = requestAnimationFrame(frame);
      else { g.clearRect(0, 0, W, H); cv.style.opacity = '0'; }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <canvas ref={ref} className="nz-rainwipe neon-only" width={W} height={H} aria-hidden />;
}
