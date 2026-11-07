'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ENV_EVENT, fallbackEnv, fetchEnv, phaseAt, zurichHour, type Env, type Phase } from '@/lib/zurich';
import { resolveScene, SCENE_EVENT, storedChoice, type Scene, type SceneChoice } from '@/lib/scene';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const running = () => document.documentElement.dataset.theme !== 'clean' && !document.hidden;

const W = 320, H = 180;
const SKIES: Record<Phase, string[]> = {
  night: ['#07040f', '#0d0820', '#160c33', '#221046', '#34145a', '#4d1a66', '#6e2168'],
  dawn: ['#0d0f2a', '#1b1d45', '#33285e', '#5a3870', '#8a4a78', '#b8627a', '#d9857a'],
  day: ['#3a2236', '#5a2d3a', '#7f3c3c', '#a2523e', '#c06b42', '#d6874a', '#e2a35a'],
  dusk: ['#120a26', '#2a1240', '#521a52', '#86285a', '#b83c5a', '#d9605a', '#e88a5a'],
};
const LIGHTS: Record<Phase, { win: number; sign: number }> = { night: { win: 1, sign: 1 }, dawn: { win: 0.6, sign: 0.75 }, day: { win: 0.25, sign: 0.45 }, dusk: { win: 0.8, sign: 0.9 } };
const WIN = ['#ffb238', '#3ef2ff', '#ff2e88', '#ffe6a8'];
const FONT: Record<string, string> = { A: '010101111101101', C: '011100100100011', D: '110101101101110', E: '111100110100111', H: '101101111101101', I: '111010010010111', M: '101111111101101', N: '101111111111101', O: '010101101101010', P: '110101110100100', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', Y: '101101010010010', Z: '111001010100111', 2: '110001010100111', 0: '010101101101010', 6: '011100110101010', ' ': '000000000000000' };

type G = CanvasRenderingContext2D;
type Ctx = { g: G; env: Env; t: number; rnd: () => number; scroll: number };

function word(g: G, s: string, x: number, y: number, c: string, scale = 1) {
  g.fillStyle = c;
  [...s].forEach((ch, i) => { const p = FONT[ch] || FONT[' ']; for (let k = 0; k < 15; k++) if (p[k] === '1') g.fillRect(x + (i * 4 + (k % 3)) * scale, y + ((k / 3) | 0) * scale, scale, scale); });
}
function sky(c: Ctx) {
  const { g, env } = c, s = SKIES[env.phase], bh = H / s.length;
  s.forEach((col, i) => { g.fillStyle = col; g.fillRect(0, i * bh, W, bh + 1); });
  for (let i = 1; i < s.length; i++) { g.fillStyle = s[i]; for (let x = i % 2; x < W; x += 2) g.fillRect(x, (i * bh - 1) | 0, 1, 1); }
}
const mix = (a: string, b: string, k: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * k)).join(',')})`;
};

/* ---------- precipitation, shared by the outdoor scenes ---------- */
type Drop = { x: number; y: number; z: number; ph: number };
const makeDrops = (rnd: () => number, n = 360): Drop[] => Array.from({ length: n }, () => ({ x: rnd() * W, y: rnd() * H, z: 0.5 + rnd(), ph: rnd() * 6.28 }));
function weather(c: Ctx, drops: Drop[], limitY = H) {
  const { g, env, t, rnd } = c;
  const n = env.sky === 'storm' ? drops.length : Math.round(drops.length * env.intensity);
  if (env.sky === 'snow') {
    for (let i = 0; i < n; i++) { const d = drops[i]; d.y += 0.25 * d.z; d.x += Math.sin(t / 30 + d.ph) * 0.3; if (d.y > limitY) { d.y = -2; d.x = rnd() * W; } g.fillStyle = `rgba(240,240,255,${0.45 + d.z * 0.35})`; const s = d.z > 1.2 ? 2 : 1; g.fillRect(d.x | 0, d.y | 0, s, s); }
    return;
  }
  const wind = env.sky === 'storm' ? 0.7 : 0.32;
  for (let i = 0; i < n; i++) {
    const d = drops[i], sp = 2.2 * d.z + 0.8, len = Math.round(2 + d.z * 3);
    d.y += sp; d.x -= sp * wind;
    if (d.y > limitY) { d.y = -6; d.x = rnd() * (W + 80); }
    g.fillStyle = env.phase === 'day' ? `rgba(225,205,225,${0.25 + d.z * 0.25})` : `rgba(165,205,255,${0.25 + d.z * 0.32})`;
    for (let k = 0; k < len; k++) g.fillRect((d.x + k * wind) | 0, (d.y - k) | 0, 1, 1);
  }
}

/* ======================================================================
   SCENE 1: rooftop city with parallax depth
   ====================================================================== */
function makeRooftop(rnd: () => number) {
  const layer = (step: number, minH: number, maxH: number, minW: number, maxW: number, gap: number) => {
    const out: { x: number; w: number; h: number; ant: number; win: [number, number, number, number][] }[] = [];
    let x = -20;
    while (x < W + 20) {
      const w = (minW + rnd() * (maxW - minW)) | 0, h = (minH + rnd() * (maxH - minH)) | 0;
      const win: [number, number, number, number][] = [];
      for (let yy = 3; yy < h - 2; yy += step) for (let xx = 2; xx < w - 2; xx += step === 3 ? 2 : 3) if (rnd() < 0.36) win.push([xx, yy, (rnd() * WIN.length) | 0, rnd()]);
      out.push({ x, w, h, ant: rnd() < 0.3 ? 4 + ((rnd() * 10) | 0) : 0, win });
      x += w + ((rnd() * gap) | 0);
    }
    return out;
  };
  return {
    far: layer(3, 30, 80, 6, 16, 2),
    mid: layer(4, 40, 100, 14, 30, 6),
    steam: Array.from({ length: 40 }, () => ({ x: 0, y: 0, a: 0, src: 0 })),
    cars: [
      { y: 44, v: 0.25, x: 30, s: 1, c: '#3ef2ff' }, { y: 58, v: -0.4, x: 200, s: 1, c: '#ff2e88' },
      { y: 72, v: 0.6, x: 120, s: 2, c: '#ffb238' }, { y: 34, v: -0.18, x: 260, s: 1, c: '#7b4dff' },
    ],
  };
}
type Roof = ReturnType<typeof makeRooftop>;

function drawRooftop(c: Ctx, s: Roof, drops: Drop[], flash: number) {
  const { g, env, t } = c, L = LIGHTS[env.phase], day = env.phase === 'day', sk = SKIES[env.phase];
  // parallax: deeper layers move less as you scroll (in canvas pixels)
  const par = (k: number) => Math.min(70, c.scroll * k);
  sky(c);
  if (env.phase === 'night' && env.sky === 'clear') for (let i = 0; i < 50; i++) { if (Math.sin(t / 40 + i) > 0.2) { g.fillStyle = '#e8e2ff'; g.fillRect((i * 97) % W, (i * 37) % 70, 1, 1); } }
  if (day && env.sky !== 'rain' && env.sky !== 'storm') { g.fillStyle = 'rgba(255,220,160,0.5)'; g.beginPath(); g.arc(64, 36 - par(0.02), 10, 0, 6.28); g.fill(); }
  if (env.sky !== 'clear') {
    g.fillStyle = day ? 'rgba(120,70,80,0.35)' : 'rgba(28,16,56,0.55)';
    for (let k = 0; k < 7; k++) { const cx = ((k * 61 + t * 0.06) % (W + 90)) - 45; g.fillRect(cx | 0, 6 + (k % 3) * 8, 70, 6); g.fillRect((cx + 12) | 0, 3 + (k % 3) * 8, 40, 4); }
  }
  g.fillStyle = day ? 'rgba(62,242,255,0.03)' : 'rgba(62,242,255,0.06)';
  ([[70, 90], [245, 120]] as const).forEach(([bx, sp], i) => { const a = Math.sin(t / sp + i) * 0.55; g.beginPath(); g.moveTo(bx, 130); g.lineTo(bx + Math.sin(a) * 220 - 9, 0); g.lineTo(bx + Math.sin(a) * 220 + 13, 0); g.fill(); });

  // distant megastructure in haze
  const my = par(0.03);
  g.fillStyle = mix(sk[4], sk[6], 0.4);
  g.beginPath(); g.moveTo(170, 150 - my); g.lineTo(214, 36 - my); g.lineTo(258, 150 - my); g.fill();
  g.fillRect(206, 24 - my, 16, 14); g.fillRect(212, 10 - my, 4, 14);
  if ((t / 40) % 2 < 1) { g.fillStyle = '#ff4040'; g.fillRect(213, 9 - my, 2, 1); }
  g.fillStyle = 'rgba(255,178,56,0.5)';
  for (let y = 50; y < 148; y += 6) for (let x = 214 - (y - 36) * 0.38 + 2; x < 214 + (y - 36) * 0.38 - 1; x += 4) if (((x * 7 + y * 3) | 0) % 5 === 0 && ((x + y) % 10) / 10 < L.win) g.fillRect(x | 0, (y - my) | 0, 1, 1);
  g.fillStyle = day ? 'rgba(230,150,110,0.18)' : 'rgba(110,33,104,0.25)'; g.fillRect(0, 96, W, 40);

  // far skyline with blinking aircraft lights
  const fy = 150 - par(0.06), farC = mix(sk[3], sk[5], 0.25);
  s.far.forEach((b, i) => {
    g.fillStyle = farC; g.fillRect(b.x, fy - b.h, b.w, b.h + 80);
    b.win.forEach(([x, y, ci, ph]) => { if (ph < L.win * 0.7) { g.fillStyle = WIN[ci] + '99'; g.fillRect(b.x + x, fy - b.h + y, 1, 1); } });
    if (b.ant) { g.fillStyle = farC; g.fillRect(b.x + (b.w >> 1), fy - b.h - b.ant, 1, b.ant); if ((t + i * 23) % 90 < 45) { g.fillStyle = '#ff3355'; g.fillRect(b.x + (b.w >> 1), fy - b.h - b.ant - 1, 1, 1); } }
  });
  // traffic lanes between the layers
  s.cars.forEach((car) => {
    car.x += car.v; if (car.x > W + 20) car.x = -20; if (car.x < -20) car.x = W + 20;
    const y = car.y - par(0.08) + Math.sin(t / 25 + car.y) * 0.8, w = 6 * car.s;
    g.fillStyle = '#1c1538'; g.fillRect(car.x, y, w, 2 * car.s); g.fillRect(car.x + car.s * 2, y - car.s, w - car.s * 4, car.s);
    g.fillStyle = car.c; g.fillRect(car.v > 0 ? car.x + w : car.x - 1, y + car.s - 1, 1, 1);
    g.fillStyle = car.v > 0 ? '#ff2e88' : '#3ef2ff'; g.fillRect(car.v > 0 ? car.x - 1 : car.x + w, y + car.s - 1, 1, 1);
  });
  g.fillStyle = day ? 'rgba(200,120,90,0.14)' : 'rgba(77,26,102,0.22)'; g.fillRect(0, 118, W, 30);

  // mid skyline with windows and neon signs
  const myy = 168 - par(0.14);
  s.mid.forEach((b) => {
    g.fillStyle = day ? '#2e1a2c' : '#0e0920'; g.fillRect(b.x, myy - b.h, b.w, b.h + 80);
    g.fillStyle = day ? '#4a2a3a' : '#22174a'; g.fillRect(b.x, myy - b.h, 1, b.h);
    b.win.forEach(([x, y, ci, ph]) => { if (ph < L.win && Math.sin(t / 70 + ph * 50) > -0.9) { g.fillStyle = WIN[ci]; g.fillRect(b.x + x, myy - b.h + y, 1, 1); } });
  });
  g.globalAlpha = L.sign;
  ([['DATA', 34, '#3ef2ff'], ['PSYCH', 150, '#ff2e88'], ['ZURICH', 252, '#ffb238']] as const).forEach(([w, x, col], i) => {
    if ((t + i * 41) % 320 < 5 && (t >> 1) % 2) return;
    const y = myy - 78 + i * 9;
    g.fillStyle = 'rgba(0,0,0,0.65)'; g.fillRect(x - 2, y - 2, w.length * 4 + 3, 9);
    g.fillStyle = col + '30'; g.fillRect(x - 5, y - 5, w.length * 4 + 9, 15);
    word(g, w, x, y, col);
  });
  g.globalAlpha = 1;

  // near rooftop: ledge, water tower, AC units, vents, antenna, a small sign
  const ny = 160 - par(0.28);
  g.fillStyle = day ? '#1a0f18' : '#06040c'; g.fillRect(0, ny, W, H - ny + 80);
  g.fillStyle = day ? '#5a3546' : '#2a1f4f'; g.fillRect(0, ny, W, 1);
  g.fillStyle = day ? '#24141f' : '#0b0718';
  g.fillRect(28, ny - 22, 18, 14); g.fillRect(30, ny - 8, 2, 8); g.fillRect(42, ny - 8, 2, 8); g.fillRect(26, ny - 24, 22, 2);
  g.fillRect(70, ny - 7, 14, 7); g.fillRect(88, ny - 5, 10, 5);
  g.fillRect(140, ny - 12, 3, 12); g.fillRect(196, ny - 9, 3, 9);
  g.fillRect(286, ny - 46, 2, 46); g.fillRect(280, ny - 30, 14, 1); g.fillRect(282, ny - 38, 10, 1);
  if (t % 80 < 40) { g.fillStyle = '#ff3355'; g.fillRect(286, ny - 47, 2, 1); g.fillStyle = 'rgba(255,51,85,0.25)'; g.fillRect(283, ny - 50, 8, 6); }
  g.fillStyle = (t >> 3) % 2 ? '#3ef2ff' : '#1d8a95'; g.fillRect(74, ny - 5, 2, 1);
  g.globalAlpha = L.sign;
  g.fillStyle = 'rgba(255,46,136,0.18)'; g.fillRect(222, ny - 20, 26, 16);
  g.fillStyle = '#05030a'; g.fillRect(226, ny - 17, 18, 10); word(g, 'OZ', 229, ny - 15, t % 400 < 6 ? '#5a1030' : '#ff2e88');
  g.fillStyle = '#0b0718'; g.fillRect(234, ny - 7, 2, 7);
  g.globalAlpha = 1;
  s.steam.forEach((p, i) => {
    if (p.a <= 0) { p.src = i % 2; p.x = p.src ? 197 : 141; p.y = ny - (p.src ? 10 : 13); p.a = 0.5 + (i % 5) * 0.08; }
    p.y -= 0.18; p.x -= 0.12 + Math.sin(t / 30 + i) * 0.05; p.a -= 0.004;
    g.fillStyle = day ? `rgba(240,210,200,${p.a * 0.4})` : `rgba(190,170,230,${p.a * 0.35})`;
    const r = 1 + (((1 - p.a) * 4) | 0); g.fillRect(p.x | 0, p.y | 0, r, r);
  });
  weather(c, drops);
  if (flash > 0) { g.fillStyle = 'rgba(232,226,255,0.22)'; g.fillRect(0, 0, W, H); }
}

/* ======================================================================
   SCENE 2: the city through a rain-streaked apartment window
   ====================================================================== */
function makeWindow(rnd: () => number) {
  const off = document.createElement('canvas'); off.width = 80; off.height = 45;
  return {
    off,
    blds: Array.from({ length: 16 }, (_, i) => ({ x: i * 5 + ((rnd() * 3) | 0) - 2, w: 4 + ((rnd() * 5) | 0), h: 10 + ((rnd() * 26) | 0) })),
    lights: Array.from({ length: 34 }, () => ({ x: rnd() * W, y: 40 + rnd() * 110, r: 2 + rnd() * 6, c: WIN[(rnd() * WIN.length) | 0], ph: rnd() * 6 })),
    beads: Array.from({ length: 260 }, () => ({ x: rnd() * W, y: rnd() * H, r: rnd() < 0.85 ? 1 : 2 })),
    sliders: Array.from({ length: 26 }, () => ({ x: rnd() * W, y: rnd() * H, v: 0, wait: rnd() * 200, trail: [] as [number, number][] })),
  };
}
type Win = ReturnType<typeof makeWindow>;

function drawWindow(c: Ctx, s: Win) {
  const { g, env, t, rnd } = c, L = LIGHTS[env.phase], day = env.phase === 'day', sk = SKIES[env.phase];
  // 1. the city outside: drawn tiny, scaled up smooth = out of focus
  const o = s.off.getContext('2d')!;
  sk.forEach((col, i) => { o.fillStyle = col; o.fillRect(0, (i * 45) / sk.length, 80, 45 / sk.length + 1); });
  s.blds.forEach((b) => {
    o.fillStyle = day ? '#3a2234' : '#120a26'; o.fillRect(b.x, 45 - b.h, b.w, b.h);
    for (let y = 45 - b.h + 2; y < 44; y += 3) for (let x = b.x + 1; x < b.x + b.w - 1; x += 2) if (((x * 13 + y * 7) % 10) / 10 < 0.45 * L.win) { o.fillStyle = WIN[(x + y) % WIN.length]; o.fillRect(x, y, 1, 1); }
  });
  if (env.sky === 'snow') for (let i = 0; i < 40; i++) { o.fillStyle = 'rgba(255,255,255,0.7)'; o.fillRect((i * 17 + t * 0.1) % 80, (i * 11 + t * 0.2) % 45, 1, 1); }
  g.imageSmoothingEnabled = true; g.drawImage(s.off, 0, 0, W, H); g.imageSmoothingEnabled = false;
  s.lights.forEach((l) => { // bokeh
    const a = Math.max(0, (0.18 + Math.sin(t / 50 + l.ph) * 0.06) * L.sign);
    const gr = g.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
    gr.addColorStop(0, l.c + Math.round(a * 255).toString(16).padStart(2, '0')); gr.addColorStop(1, l.c + '00');
    g.fillStyle = gr; g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
  });
  // 2. the glass: tint, and a faint reflection of the room behind you
  g.fillStyle = day ? 'rgba(40,20,30,0.18)' : 'rgba(10,6,28,0.3)'; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(255,190,120,0.06)'; g.beginPath(); g.moveTo(40, 150); g.lineTo(52, 120); g.lineTo(64, 150); g.fill(); g.fillRect(51, 150, 2, 16);
  g.fillStyle = 'rgba(62,242,255,0.05)'; g.fillRect(208, 118, 46, 30); g.fillRect(228, 148, 6, 8);
  // 3. rain on the glass: still beads, and drops that slide in fits and starts, leaving trails
  const wet = env.sky === 'rain' || env.sky === 'storm' || env.sky === 'drizzle' ? 1 : env.sky === 'snow' || env.sky === 'fog' ? 0.35 : 0.2;
  for (let i = 0, nb = Math.round(s.beads.length * wet); i < nb; i++) {
    const b = s.beads[i];
    g.fillStyle = 'rgba(220,230,255,0.35)'; g.fillRect(b.x | 0, b.y | 0, b.r, b.r);
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(b.x | 0, (b.y + b.r) | 0, b.r, 1);
  }
  const ns = Math.round(s.sliders.length * (env.sky === 'storm' ? 1 : env.sky === 'rain' ? 0.8 : env.sky === 'drizzle' ? 0.45 : 0));
  for (let i = 0; i < ns; i++) {
    const d = s.sliders[i];
    if (d.wait > 0) d.wait--;
    else {
      d.v = Math.min(1.6, d.v + 0.05 + rnd() * 0.04); d.y += d.v; d.x += (rnd() - 0.5) * 0.6;
      if (rnd() < 0.02) { d.v = 0; d.wait = 10 + rnd() * 40; }
      d.trail.push([d.x, d.y]); if (d.trail.length > 46) d.trail.shift();
    }
    d.trail.forEach(([x, y], k) => { g.fillStyle = `rgba(200,215,255,${(k / d.trail.length) * 0.22})`; g.fillRect(x | 0, y | 0, 1, 1); });
    g.fillStyle = 'rgba(235,240,255,0.75)'; g.fillRect(d.x | 0, d.y | 0, 2, 2); g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(d.x | 0, (d.y + 2) | 0, 2, 1);
    if (d.y > H) { d.y = -4; d.x = rnd() * W; d.v = 0; d.wait = rnd() * 120; d.trail = []; }
  }
  if (env.sky === 'snow') for (let i = 0; i < 240; i++) { const x = (i * 53) % 46, y = (i * 29) % 46; if (x + y < 46) { g.fillStyle = 'rgba(230,240,255,0.12)'; g.fillRect(x, y, 1, 1); g.fillRect(W - 1 - x, H - 1 - y, 1, 1); } }
  // 4. window frame and sill with a mug and a plant
  const frame = day ? '#1c111a' : '#05030a', edge = day ? '#5a3546' : '#24194a';
  g.fillStyle = frame; g.fillRect(0, 0, W, 6); g.fillRect(0, 0, 6, H); g.fillRect(W - 6, 0, 6, H); g.fillRect(157, 0, 6, H); g.fillRect(0, 92, W, 5); g.fillRect(0, 166, W, 14);
  g.fillStyle = edge; g.fillRect(6, 6, 1, 160); g.fillRect(163, 6, 1, 86); g.fillRect(163, 97, 1, 69); g.fillRect(0, 166, W, 1);
  g.fillStyle = day ? '#2a1a26' : '#0d0920'; g.fillRect(250, 156, 12, 10); g.fillRect(262, 158, 3, 5);
  g.fillStyle = 'rgba(255,255,255,0.12)'; if ((t >> 4) % 3 === 0) g.fillRect(254, 150 - ((t >> 2) % 6), 1, 3); // steam off the mug
  g.fillStyle = '#2f6b3a'; g.fillRect(278, 148, 3, 14); g.fillRect(274, 151, 3, 6); g.fillRect(282, 146, 3, 6);
  g.fillStyle = day ? '#3a2234' : '#140c30'; g.fillRect(274, 160, 12, 6);
}

/* ======================================================================
   SCENE 3: street level (hidden; terminal: scene street)
   ====================================================================== */
function makeStreet(rnd: () => number) {
  return {
    people: Array.from({ length: 9 }, (_, i) => ({ x: rnd() * W, v: (rnd() < 0.5 ? -1 : 1) * (0.2 + rnd() * 0.25), c: WIN[i % WIN.length], h: 9 + ((rnd() * 3) | 0) })),
    steam: Array.from({ length: 24 }, () => ({ x: 0, y: 0, a: 0 })),
  };
}
type Street = ReturnType<typeof makeStreet>;

function drawStreet(c: Ctx, s: Street, drops: Drop[], flash: number) {
  const { g, env, t } = c, L = LIGHTS[env.phase], day = env.phase === 'day';
  sky(c);
  g.fillStyle = day ? '#2a1828' : '#0a0618'; g.fillRect(0, 26, W, 104);
  for (let x = 0; x < W; x += 40) {
    g.fillStyle = day ? '#33202f' : '#100a26'; g.fillRect(x, 26, 38, 104);
    for (let y = 32; y < 80; y += 8) for (let k = 4; k < 34; k += 8) if (((x + y + k) * 7) % 10 < 6 * L.win) { g.fillStyle = WIN[(x + y + k) % 4] + 'bb'; g.fillRect(x + k, y, 3, 4); }
  }
  const shops: [string, number, string][] = [['RAMEN', 14, '#ff2e88'], ['DATA', 96, '#3ef2ff'], ['PSYCH', 168, '#ffb238'], ['OPEN', 252, '#7b4dff']];
  shops.forEach(([w, x, col], i) => {
    const on = !((t + i * 51) % 260 < 5 && (t >> 1) % 2);
    g.fillStyle = '#05030a'; g.fillRect(x - 4, 86, w.length * 8 + 8, 14);
    if (on) { g.globalAlpha = L.sign; g.fillStyle = col + '33'; g.fillRect(x - 8, 82, w.length * 8 + 16, 22); word(g, w, x, 89, col, 2); g.globalAlpha = 1; }
    g.fillStyle = col + '88'; for (let k = 0; k < w.length * 8 + 8; k += 4) g.fillRect(x - 4 + k, 104, 2, 3);
    if (on) { g.fillStyle = col + '22'; g.fillRect(x - 4, 108, w.length * 8 + 8, 22); }
  });
  g.fillStyle = day ? '#1e1220' : '#05030c'; g.fillRect(0, 130, W, 50);
  g.fillStyle = day ? '#5a3546' : '#24194a'; g.fillRect(0, 130, W, 1);
  shops.forEach(([w, x, col]) => { // reflections in the wet street, rippling
    g.globalAlpha = 0.28 * L.sign;
    for (let row = 0; row < 14; row++) { g.fillStyle = col; g.fillRect(x - 4 + Math.sin(t / 12 + row) * 1.5, 133 + row * 3, w.length * 8 + 8, 1); }
    g.globalAlpha = 1;
  });
  s.people.forEach((p) => {
    p.x += p.v; if (p.x > W + 8) p.x = -8; if (p.x < -8) p.x = W + 8;
    const y = 130 - p.h, step = ((t / 8) | 0) % 2;
    g.fillStyle = '#05030a'; g.fillRect(p.x, y, 3, p.h); g.fillRect(p.x + (step ? 0 : 2), y + p.h, 1, 2);
    g.fillStyle = p.c; g.fillRect(p.x - 3, y - 3, 9, 1); g.fillRect(p.x - 2, y - 4, 7, 1); g.fillRect(p.x + 1, y - 2, 1, 2);
    g.fillStyle = p.c + '40'; g.fillRect(p.x - 3, 132, 9, 2);
  });
  s.steam.forEach((p, i) => {
    if (p.a <= 0) { p.x = 210 + (i % 5) * 2; p.y = 140; p.a = 0.6; }
    p.y -= 0.25; p.x += Math.sin(t / 20 + i) * 0.2; p.a -= 0.006;
    g.fillStyle = `rgba(200,180,240,${p.a * 0.3})`; const r = 1 + (((0.6 - p.a) * 8) | 0); g.fillRect(p.x | 0, p.y | 0, r, r);
  });
  g.fillStyle = '#1a1238'; g.fillRect(206, 140, 14, 2);
  weather(c, drops, 178);
  if (env.sky === 'rain' || env.sky === 'storm') for (let i = 0; i < 12; i++) { const x = (i * 71 + t * 3) % W, y = 140 + ((i * 13) % 36); g.fillStyle = 'rgba(180,210,255,0.5)'; g.fillRect(x, y, 1, 1); g.fillRect(x - 1, y - 1, 1, 1); g.fillRect(x + 1, y - 1, 1, 1); }
  if (flash > 0) { g.fillStyle = 'rgba(232,226,255,0.2)'; g.fillRect(0, 0, W, H); }
}

/** The neon city behind every page: rooftop parallax by default, a rainy window behind reading pages. */
export default function NeonBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname() || '/';
  const pathRef = useRef(pathname);
  const pickRef = useRef<() => void>(() => {});
  useEffect(() => { pathRef.current = pathname; pickRef.current(); }, [pathname]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const cv = ref.current, g = cv?.getContext('2d');
    if (!cv || !g) return;
    g.imageSmoothingEnabled = false;
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    let env: Env = window.__ozEnv || fallbackEnv();
    const publish = (e: Env) => { env = e; window.__ozEnv = e; window.dispatchEvent(new CustomEvent(ENV_EVENT, { detail: e })); };
    publish(env);
    fetchEnv().then(publish);
    const tPhase = window.setInterval(() => publish({ ...env, phase: phaseAt(zurichHour()) }), 60_000);
    const tWx = window.setInterval(() => fetchEnv().then(publish), 15 * 60_000);
    cleanups.push(() => { clearInterval(tPhase); clearInterval(tWx); });

    const roof = makeRooftop(rnd), win = makeWindow(rnd), street = makeStreet(rnd), drops = makeDrops(rnd);
    let scene: Scene = 'rooftop', choice: SceneChoice = storedChoice();
    const pick = () => {
      scene = resolveScene(pathRef.current, choice);
      document.documentElement.dataset.scene = scene;
      window.dispatchEvent(new CustomEvent(SCENE_EVENT, { detail: scene }));
    };
    pickRef.current = pick;
    pick();
    const onChoice = (e: Event) => { choice = (e as CustomEvent<SceneChoice>).detail; pick(); };
    window.addEventListener('oz:scene-choice', onChoice);

    let scroll = 0;
    const onScroll = () => { scroll = window.scrollY / (window.innerHeight / H); };
    window.addEventListener('scroll', onScroll, { passive: true });

    let t = 0, raf = 0, flash = 0;
    const frame = () => {
      t++;
      const every = env.sky === 'storm' ? 240 : env.sky === 'rain' ? 1300 : 0;
      if (every && t % every === 0) flash = 3 + ((rnd() * 3) | 0);
      if (flash > 0) flash--;
      const c: Ctx = { g, env, t, rnd, scroll };
      if (scene === 'window') drawWindow(c, win);
      else if (scene === 'street') drawStreet(c, street, drops, flash);
      else drawRooftop(c, roof, drops, flash);
      if (!reduced() && running()) raf = requestAnimationFrame(frame);
    };
    frame();
    const resume = () => { cancelAnimationFrame(raf); if (running() && !reduced()) raf = requestAnimationFrame(frame); else if (running()) frame(); };
    const redraw = () => { if (reduced()) frame(); };
    const onEnv = (e: Event) => { env = (e as CustomEvent<Env>).detail; redraw(); };
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('oz:theme', resume);
    window.addEventListener(ENV_EVENT, onEnv);
    window.addEventListener(SCENE_EVENT, redraw);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('oz:theme', resume);
      window.removeEventListener(ENV_EVENT, onEnv);
      window.removeEventListener(SCENE_EVENT, redraw);
      window.removeEventListener('oz:scene-choice', onChoice);
      window.removeEventListener('scroll', onScroll);
    });
    return () => cleanups.forEach((f) => f());
  }, []);

  return (
    <div className="neon-only" aria-hidden>
      <canvas ref={ref} className="nz-city" width={W} height={H} />
      <div className="nz-crt" />
    </div>
  );
}
