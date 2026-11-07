'use client';

import { useEffect, useRef } from 'react';
import { ENV_EVENT, fallbackEnv, fetchEnv, phaseAt, zurichHour, type Env, type Phase } from '@/lib/zurich';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const running = () => document.documentElement.dataset.theme !== 'clean' && !document.hidden;

// sky bands, top to bottom, per time of day
const SKIES: Record<Phase, string[]> = {
  night: ['#07040f', '#0d0820', '#160c33', '#221046', '#34145a', '#4d1a66', '#6e2168'],
  dawn: ['#0d0f2a', '#1b1d45', '#33285e', '#5a3870', '#8a4a78', '#b8627a', '#d9857a'],
  day: ['#3a2236', '#5a2d3a', '#7f3c3c', '#a2523e', '#c06b42', '#d6874a', '#e2a35a'],
  dusk: ['#120a26', '#2a1240', '#521a52', '#86285a', '#b83c5a', '#d9605a', '#e88a5a'],
};
const LIGHTS: Record<Phase, { win: number; sign: number; haze: string }> = {
  night: { win: 1, sign: 1, haze: 'rgba(255,46,136,0.08)' },
  dawn: { win: 0.6, sign: 0.75, haze: 'rgba(255,170,150,0.08)' },
  day: { win: 0.25, sign: 0.45, haze: 'rgba(255,190,120,0.12)' },
  dusk: { win: 0.8, sign: 0.9, haze: 'rgba(255,110,120,0.1)' },
};

/** The 16-bit city behind every page in neon mode. It follows Zürich's real time of day and weather. */
export default function NeonBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const cv = ref.current;
    const g = cv?.getContext('2d');
    if (!cv || !g) return;

    let env: Env = window.__ozEnv || fallbackEnv();
    const publish = (e: Env) => { env = e; window.__ozEnv = e; window.dispatchEvent(new CustomEvent(ENV_EVENT, { detail: e })); };
    publish(env);
    fetchEnv().then(publish);
    // re-check the time of day every minute and the weather every 15 minutes
    const tPhase = window.setInterval(() => publish({ ...env, phase: phaseAt(zurichHour()) }), 60_000);
    const tWx = window.setInterval(() => fetchEnv().then(publish), 15 * 60_000);
    cleanups.push(() => { clearInterval(tPhase); clearInterval(tWx); });

    const W = 320, H = 180;
    g.imageSmoothingEnabled = false;
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const F: Record<string, string> = { A: '010101111101101', C: '011100100100011', D: '110101101101110', H: '101101111101101', I: '111010010010111', O: '010101101101010', P: '110101110100100', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', Y: '101101010010010', Z: '111001010100111', 2: '110001010100111', 0: '010101101101010', 6: '011100110101010', ' ': '000000000000000' };
    const word = (s: string, x: number, y: number, c: string) => {
      g.fillStyle = c;
      [...s].forEach((ch, i) => { const p = F[ch] || F[' ']; for (let k = 0; k < 15; k++) if (p[k] === '1') g.fillRect(x + i * 4 + (k % 3), y + ((k / 3) | 0), 1, 1); });
    };
    const far: { x: number; w: number; h: number }[] = [];
    const mid: { x: number; w: number; h: number; win: [number, number, string, number][] }[] = [];
    let x = 0;
    while (x < W) { const w = (8 + rnd() * 18) | 0, h = (40 + rnd() * 70) | 0; far.push({ x, w, h }); x += w - 2; }
    x = -10;
    while (x < W) { const w = (14 + rnd() * 26) | 0, h = (30 + rnd() * 60) | 0; mid.push({ x, w, h, win: [] }); x += w + ((rnd() * 6) | 0); }
    mid.forEach((b) => {
      for (let yy = 4; yy < b.h - 4; yy += 4) for (let xx = 2; xx < b.w - 2; xx += 3)
        if (rnd() < 0.38) b.win.push([xx, yy, rnd() < 0.5 ? '#ffb238' : rnd() < 0.5 ? '#3ef2ff' : '#ff2e88', rnd()]);
    });
    const signs = [
      { t: 'DATA', x: 46, y: 70, c: '#3ef2ff' }, { t: 'PSYCH', x: 200, y: 58, c: '#ff2e88' },
      { t: 'ZURICH', x: 120, y: 88, c: '#ffb238' }, { t: 'R', x: 272, y: 80, c: '#7b4dff' }, { t: '2026', x: 10, y: 96, c: '#ff2e88' },
    ];
    const MAX = 320;
    const drops = Array.from({ length: MAX }, () => ({ x: rnd() * W, y: rnd() * H, s: 2 + rnd() * 2, l: 2 + ((rnd() * 3) | 0), ph: rnd() * 6.28 }));
    const stars = Array.from({ length: 40 }, () => [rnd() * W, rnd() * 60, rnd()]);
    const car = { x: -30, y: 52, v: 0.55 };
    let t = 0, raf = 0, flash = 0;

    const frame = () => {
      t++;
      const sky = SKIES[env.phase], L = LIGHTS[env.phase];
      const bh = 15;
      sky.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, i * bh, W, bh + 1); });
      g.fillStyle = sky[sky.length - 1]; g.fillRect(0, sky.length * bh, W, H);
      for (let i = 1; i < sky.length; i++) { g.fillStyle = sky[i]; for (let xx = i % 2; xx < W; xx += 2) g.fillRect(xx, i * bh - 1, 1, 1); }
      // stars only on clear nights; a pale sun disc through the smog by day
      if (env.phase === 'night' && env.sky === 'clear') stars.forEach(([sx, sy, p]) => { if (Math.sin(t / 40 + p * 20) > 0) { g.fillStyle = '#e8e2ff'; g.fillRect(sx | 0, sy | 0, 1, 1); } });
      if (env.phase === 'day' && (env.sky === 'clear' || env.sky === 'cloudy')) { g.fillStyle = 'rgba(255,220,160,0.55)'; g.beginPath(); g.arc(70, 40, 9, 0, 6.28); g.fill(); }
      if (env.phase === 'dusk' || env.phase === 'dawn') { g.fillStyle = 'rgba(255,170,110,0.5)'; g.fillRect(env.phase === 'dusk' ? 34 : 270, 96, 18, 2); g.fillRect(env.phase === 'dusk' ? 36 : 272, 94, 14, 2); }
      g.fillStyle = L.haze; g.fillRect(0, 70, W, 40);
      // clouds roll over when it's cloudy, raining or snowing
      if (env.sky !== 'clear' && env.sky !== 'fog') {
        g.fillStyle = env.phase === 'day' ? 'rgba(90,60,70,0.35)' : 'rgba(20,12,40,0.45)';
        for (let k = 0; k < 6; k++) { const cx = ((k * 70 + t * 0.08) % (W + 80)) - 40; g.fillRect(cx | 0, 8 + (k % 3) * 9, 60, 7); g.fillRect((cx + 10) | 0, 4 + (k % 3) * 9, 36, 5); }
      }
      // searchlights
      g.fillStyle = env.phase === 'day' ? 'rgba(62,242,255,0.03)' : 'rgba(62,242,255,0.07)';
      const a1 = Math.sin(t / 90) * 0.6, a2 = Math.cos(t / 120) * 0.5;
      g.beginPath(); g.moveTo(90, 140); g.lineTo(90 + Math.sin(a1) * 200 - 10, 0); g.lineTo(90 + Math.sin(a1) * 200 + 14, 0); g.fill();
      g.beginPath(); g.moveTo(250, 140); g.lineTo(250 + Math.sin(a2) * 200 - 10, 0); g.lineTo(250 + Math.sin(a2) * 200 + 14, 0); g.fill();
      // skyline
      g.fillStyle = env.phase === 'day' ? '#3a2234' : '#1a0f3d'; far.forEach((b) => g.fillRect(b.x, H - b.h - 30, b.w, b.h + 30));
      g.fillStyle = env.phase === 'day' ? '#2a1828' : '#120a2c'; g.beginPath(); g.moveTo(150, 150); g.lineTo(190, 46); g.lineTo(230, 150); g.fill();
      g.fillStyle = '#ffb238';
      for (let yy = 60; yy < 148; yy += 6) for (let xx = 190 - (yy - 46) * 0.38 + 2; xx < 190 + (yy - 46) * 0.38 - 1; xx += 4) if (((xx * 7 + yy * 3) | 0) % 5 === 0 && ((xx + yy) % 10) / 10 < L.win) g.fillRect(xx | 0, yy, 1, 1);
      ([[26, 120], [300, 112]] as const).forEach(([fx, fy], i) => {
        g.fillStyle = '#0b0620'; g.fillRect(fx, fy, 3, H - fy);
        if ((t + i * 40) % 160 < 70) {
          const f = ((t / 3) | 0) % 3;
          g.fillStyle = '#ffb238'; g.fillRect(fx - 1, fy - 4 - f, 5, 4 + f);
          g.fillStyle = '#fff3c4'; g.fillRect(fx, fy - 2 - f, 3, 2 + f);
          g.fillStyle = 'rgba(255,178,56,0.15)'; g.fillRect(fx - 8, fy - 14, 19, 14);
        }
      });
      mid.forEach((b) => {
        g.fillStyle = env.phase === 'day' ? '#1e1220' : '#0a0618'; g.fillRect(b.x, H - b.h, b.w, b.h);
        g.fillStyle = env.phase === 'day' ? '#4a2a3a' : '#1f1446'; g.fillRect(b.x, H - b.h, 1, b.h);
        b.win.forEach(([wx, wy, c, ph]) => { if (ph < L.win && Math.sin(t / 60 + ph * 40) > -0.85) { g.fillStyle = c; g.fillRect(b.x + wx, H - b.h + wy, 1, 1); } });
      });
      g.globalAlpha = L.sign;
      signs.forEach((s, i) => {
        if ((t + i * 37) % 300 < 6 && ((t / 2) | 0) % 2) return;
        g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(s.x - 2, s.y - 2, s.t.length * 4 + 3, 9);
        g.fillStyle = s.c + '33'; g.fillRect(s.x - 4, s.y - 4, s.t.length * 4 + 7, 13);
        word(s.t, s.x, s.y, s.c);
      });
      g.fillStyle = '#05030c'; g.fillRect(232, 96, 40, 26);
      for (let k = 0; k < 6; k++) { g.fillStyle = k % 2 ? '#ff2e88' : '#7b4dff'; g.fillRect(234, 98 + ((k * 4 + ((t / 4) | 0)) % 22), 36, 2); }
      word('OZ', 246, 106, '#ffffff');
      g.globalAlpha = 1;
      car.x += car.v;
      if (car.x > W + 40) { car.x = -40; car.y = 30 + rnd() * 40; }
      const cy = car.y + Math.sin(t / 20) * 1.2;
      g.fillStyle = '#2a1f4f'; g.fillRect(car.x, cy, 16, 4); g.fillRect(car.x + 4, cy - 2, 8, 2);
      g.fillStyle = '#3ef2ff'; g.fillRect(car.x + 15, cy + 1, 2, 1);
      g.fillStyle = '#ff2e88'; g.fillRect(car.x - 1, cy + 2, 1, 1);
      if (((t / 8) | 0) % 2) { g.fillStyle = '#ffb238'; g.fillRect(car.x + 7, cy + 4, 2, 1); }
      // ground fog, much thicker on foggy days
      const fog = env.sky === 'fog' ? 3 : 1;
      for (let k = 0; k < 3 * fog; k++) { g.fillStyle = `rgba(${env.phase === 'day' ? '200,170,170' : '123,77,255'},${0.05 + (k % 3) * 0.03})`; g.fillRect(0, H - 20 * fog + k * 6, W, 6); }
      // precipitation
      const n = env.sky === 'storm' ? MAX : Math.round(MAX * env.intensity);
      if (env.sky === 'snow') {
        g.fillStyle = 'rgba(240,240,255,0.85)';
        for (let i = 0; i < n; i++) { const d = drops[i]; d.y += d.s * 0.25; d.x += Math.sin(t / 30 + d.ph) * 0.3; if (d.y > H) { d.y = -2; d.x = rnd() * W; } g.fillRect(d.x | 0, d.y | 0, 1, 1); }
      } else if (n) {
        g.fillStyle = env.phase === 'day' ? 'rgba(220,200,220,0.5)' : 'rgba(160,200,255,0.55)';
        const wind = env.sky === 'storm' ? 0.7 : 0.35;
        for (let i = 0; i < n; i++) {
          const d = drops[i]; d.y += d.s; d.x -= d.s * wind;
          if (d.y > H) { d.y = -4; d.x = rnd() * (W + 60); }
          for (let k = 0; k < d.l; k++) g.fillRect((d.x + k * wind) | 0, (d.y - k) | 0, 1, 1);
        }
      }
      // lightning: rare in rain, frequent in storms
      const every = env.sky === 'storm' ? 240 : env.sky === 'rain' ? 1200 : 0;
      if (every && t % every === 0) flash = 3 + ((rnd() * 3) | 0);
      if (flash > 0) { flash--; g.fillStyle = 'rgba(232,226,255,0.22)'; g.fillRect(0, 0, W, H); }
      if (!reduced() && running()) raf = requestAnimationFrame(frame);
    };
    frame();
    const resume = () => { cancelAnimationFrame(raf); if (running() && !reduced()) raf = requestAnimationFrame(frame); else if (running()) frame(); };
    const onEnv = (e: Event) => { env = (e as CustomEvent<Env>).detail; if (reduced()) frame(); };
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('oz:theme', resume);
    window.addEventListener(ENV_EVENT, onEnv);
    cleanups.push(() => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', resume); window.removeEventListener('oz:theme', resume); window.removeEventListener(ENV_EVENT, onEnv); });
    return () => cleanups.forEach((f) => f());
  }, []);
  return (
    <div className="neon-only" aria-hidden>
      <canvas ref={ref} className="nz-city" width={320} height={180} />
      <div className="nz-crt" />
    </div>
  );
}
