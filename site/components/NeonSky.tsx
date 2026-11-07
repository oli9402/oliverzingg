'use client';

import { useEffect, useRef } from 'react';
import { isNeon, SKIN_EVENT } from '@/lib/theme';

/**
 * Backdrop for the neon skin: a night skyline with lit windows, a few signs,
 * haze, and rain falling in front of it. Drawn on one canvas, only while the
 * skin is on. Reduced motion gets a still frame; hidden tabs pause.
 */
export default function NeonSky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const g = c.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let city: HTMLCanvasElement | null = null;
    let drops: { x: number; y: number; l: number; v: number; a: number }[] = [];
    let w = 0, h = 0, dpr = 1;

    // deterministic noise so the skyline is the same on every visit
    let seed = 1984;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    function buildCity() {
      seed = 1984;
      const off = document.createElement('canvas');
      off.width = w * dpr; off.height = h * dpr;
      const o = off.getContext('2d')!;
      o.scale(dpr, dpr);
      // sky: near-black at the top, polluted magenta glow at the horizon
      const sky = o.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#03040a');
      sky.addColorStop(0.55, '#0a0820');
      sky.addColorStop(0.82, '#2a0b33');
      sky.addColorStop(1, '#3a0d2e');
      o.fillStyle = sky; o.fillRect(0, 0, w, h);

      const layer = (base: number, minH: number, maxH: number, color: string, winA: number, step: number) => {
        let x = -20;
        while (x < w + 20) {
          const bw = step * (0.6 + rnd() * 1.4);
          const bh = minH + rnd() * (maxH - minH);
          const top = h - base - bh;
          o.fillStyle = color;
          o.fillRect(x, top, bw, bh + base);
          if (rnd() < 0.25) o.fillRect(x + bw * 0.45, top - 18 - rnd() * 30, 2, 20 + rnd() * 30); // antenna
          // windows
          for (let yy = top + 6; yy < h - base - 4; yy += 7) {
            for (let xx = x + 4; xx < x + bw - 4; xx += 6) {
              const r = rnd();
              if (r < winA) {
                o.fillStyle = r < winA * 0.18 ? 'rgba(60,232,255,0.75)' : r < winA * 0.3 ? 'rgba(255,63,176,0.7)' : 'rgba(255,190,110,0.55)';
                o.fillRect(xx, yy, 2, 3);
              }
            }
          }
          // occasional vertical sign
          if (rnd() < 0.12 && bh > maxH * 0.5) {
            const sx = x + bw - 8, sy = top + 20, sh = 40 + rnd() * 60;
            const col = rnd() < 0.5 ? '#ff3fb0' : '#3ce8ff';
            o.shadowColor = col; o.shadowBlur = 14; o.fillStyle = col;
            o.fillRect(sx, sy, 4, sh);
            o.shadowBlur = 0;
          }
          x += bw + 1;
        }
      };
      layer(0, h * 0.18, h * 0.38, '#0b0b1d', 0.05, 46);
      // haze between layers
      const haze = o.createLinearGradient(0, h * 0.5, 0, h);
      haze.addColorStop(0, 'rgba(255,63,176,0)');
      haze.addColorStop(1, 'rgba(120,30,110,0.28)');
      o.fillStyle = haze; o.fillRect(0, h * 0.5, w, h * 0.5);
      layer(0, h * 0.08, h * 0.24, '#06060f', 0.09, 64);
      // street glow
      const street = o.createLinearGradient(0, h - 60, 0, h);
      street.addColorStop(0, 'rgba(60,232,255,0)');
      street.addColorStop(1, 'rgba(60,232,255,0.12)');
      o.fillStyle = street; o.fillRect(0, h - 60, w, 60);
      // darken the upper-left reading area a little more
      const read = o.createRadialGradient(w * 0.3, h * 0.25, 0, w * 0.3, h * 0.25, Math.max(w, h) * 0.7);
      read.addColorStop(0, 'rgba(3,4,10,0.55)');
      read.addColorStop(1, 'rgba(3,4,10,0)');
      o.fillStyle = read; o.fillRect(0, 0, w, h);
      city = off;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildCity();
      const n = Math.round((w * h) / 9000);
      drops = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, l: 8 + Math.random() * 16, v: 6 + Math.random() * 8, a: 0.08 + Math.random() * 0.22 }));
    }

    function frame() {
      if (!city) return;
      g.drawImage(city, 0, 0, w, h);
      g.lineWidth = 1;
      for (const d of drops) {
        g.strokeStyle = `rgba(170,200,255,${d.a})`;
        g.beginPath(); g.moveTo(d.x, d.y); g.lineTo(d.x - d.l * 0.18, d.y + d.l); g.stroke();
        if (!reduce.matches) {
          d.y += d.v; d.x -= d.v * 0.18;
          if (d.y > h) { d.y = -d.l; d.x = Math.random() * (w + 60); }
        }
      }
      if (!reduce.matches) raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (!isNeon() || document.hidden) return;
      resize();
      frame();
    }

    const onResize = () => { if (isNeon()) start(); };
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    start();
    window.addEventListener(SKIN_EVENT, start);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    reduce.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(SKIN_EVENT, start);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={ref} className="neon-sky" aria-hidden />;
}
