'use client';

import { useEffect, useRef } from 'react';

/**
 * Hand-authored 16-bit cover art, drawn at 160×100 and scaled with hard pixels.
 * Each scene shows what the project is actually about. New projects fall back
 * to a scene chosen by their `kind`, seeded by slug so it never changes.
 */

const W = 160, H = 100;
const C = {
  void: '#07040f', night: '#0d0820', grid: '#1b1240', violet: '#7b4dff', violetD: '#3a2580',
  pink: '#ff2e88', pinkD: '#a3125a', cyan: '#3ef2ff', cyanD: '#127a8a', amber: '#ffb238', amberD: '#9a5a00',
  green: '#7dff6a', white: '#ece7ff', dim: '#6d6496',
};

type G = CanvasRenderingContext2D;
type Rnd = () => number;

const px = (g: G, x: number, y: number, c: string, w = 1, h = 1) => { g.fillStyle = c; g.fillRect(x | 0, y | 0, w, h); };
const line = (g: G, x0: number, y0: number, x1: number, y1: number, c: string) => {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0;
  for (let i = 0; i <= n; i++) px(g, x0 + ((x1 - x0) * i) / (n || 1), y0 + ((y1 - y0) * i) / (n || 1), c);
};
const dashed = (g: G, x0: number, y0: number, x1: number, y1: number, c: string) => {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0;
  for (let i = 0; i <= n; i++) if ((i >> 2) % 2 === 0) px(g, x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, c);
};
const F: Record<string, string> = {
  A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', G: '011100101101011',
  H: '101101111101101', I: '111010010010111', K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '101111111111101',
  O: '010101101101010', P: '110101110100100', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111',
  V: '101101101101010', X: '101101010101101', Y: '101101010010010', '+': '000010111010000', '-': '000000111000000', '|': '010010010010010', ' ': '000000000000000',
  0: '111101101101111', 1: '010110010010111', 2: '110001010100111', 3: '110001010001110', 4: '101101111001001', 5: '111100110001110', 6: '011100110101010', 7: '111001010010010', 8: '010101010101010', 9: '010101011001010',
};
const text = (g: G, s: string, x: number, y: number, c: string) => {
  [...s.toUpperCase()].forEach((ch, i) => { const p = F[ch] || F[' ']; for (let k = 0; k < 15; k++) if (p[k] === '1') px(g, x + i * 4 + (k % 3), y + ((k / 3) | 0), c); });
};
function ground(g: G, accent = C.grid) {
  g.fillStyle = C.night; g.fillRect(0, 0, W, H);
  for (let x = 0; x < W; x += 10) for (let y = 0; y < H; y += 2) px(g, x, y, accent);
  for (let y = 0; y < H; y += 10) for (let x = 0; x < W; x += 2) px(g, x, y, accent);
}
function axes(g: G, x0 = 14, y0 = 88, x1 = 150, y1 = 10) {
  line(g, x0, y1, x0, y0, C.dim); line(g, x0, y0, x1, y0, C.dim);
  for (let x = x0; x <= x1; x += 17) px(g, x, y0 + 1, C.dim, 1, 2);
  for (let y = y0; y >= y1; y -= 13) px(g, x0 - 2, y, C.dim, 2, 1);
}
const disc = (g: G, cx: number, cy: number, r: number, c: string) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * 0.6) px(g, cx + x, cy + y, c); };
const ring = (g: G, cx: number, cy: number, rx: number, ry: number, c: string) => { for (let a = 0; a < 6.283; a += 0.04) px(g, cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, c); };

const ART: Record<string, (g: G, r: Rnd) => void> = {
  // EEG traces over a head with electrodes
  eeg(g, r) {
    ground(g);
    ring(g, 26, 50, 18, 22, C.white); px(g, 8, 48, C.white, 2, 6); px(g, 23, 27, C.white, 6, 2);
    [[18, 36], [30, 32], [38, 44], [16, 54], [30, 62], [40, 58]].forEach(([x, y]) => { px(g, x - 1, y - 1, C.pink, 3, 3); px(g, x, y, C.white); });
    const cols = [C.cyan, C.pink, C.amber, C.violet, C.green];
    cols.forEach((c, i) => {
      const y0 = 16 + i * 17;
      let py = y0;
      for (let x = 52; x < 156; x++) {
        const spike = (x + i * 13) % 37 === 0 ? (r() < 0.5 ? -7 : 7) : 0;
        const y = y0 + Math.sin(x / (3 + i)) * 3 + (r() - 0.5) * 3 + spike;
        line(g, x - 1, py, x, y, c); py = y;
      }
    });
    text(g, 'EEG', 6, 88, C.amber);
  },
  // grid of MRI slices, one flagged
  mri(g) {
    ground(g, '#140c30');
    for (let i = 0; i < 12; i++) {
      const cx = 22 + (i % 4) * 39, cy = 14 + ((i / 4) | 0) * 26, hit = i === 6;
      disc(g, cx, cy, 10, hit ? '#3a1530' : '#16203a');
      ring(g, cx, cy, 10, 10, hit ? C.pink : C.cyanD);
      for (let k = 0; k < 16; k++) { const a = k * 0.7, d = 2 + (k % 4) * 2; px(g, cx + Math.cos(a) * d, cy + Math.sin(a) * d, hit ? C.pink : C.cyan); }
      line(g, cx, cy - 7, cx, cy + 7, hit ? C.pinkD : C.cyanD);
    }
    px(g, 0, 88, C.void, W, 12); text(g, 'SVM VS CNN', 6, 91, C.amber); text(g, 'MRI', 140, 91, C.dim);
  },
  // Simpson's paradox: groups trend up, the pooled line trends down
  simpson(g, r) {
    ground(g); axes(g);
    const groups: [string, number, number][] = [[C.pink, 28, 30], [C.cyan, 70, 52], [C.amber, 112, 74]];
    groups.forEach(([c, gx, gy]) => {
      for (let i = 0; i < 18; i++) { const x = gx + (r() - 0.5) * 30, y = gy - (x - gx) * 0.6 + (r() - 0.5) * 10; px(g, x, y, c, 2, 2); }
      line(g, gx - 16, gy + 10, gx + 16, gy - 9, c);
    });
    dashed(g, 18, 22, 148, 80, C.white);
    text(g, 'R', 140, 6, C.dim);
  },
  // diverging Likert bars around a centre line
  likert(g) {
    ground(g);
    const rows = [[18, 30], [26, 24], [10, 40], [34, 14], [22, 28], [14, 36], [30, 20]];
    rows.forEach(([neg, pos], i) => {
      const y = 12 + i * 11;
      px(g, 80 - neg, y, C.pinkD, neg, 7); px(g, 80 - Math.round(neg * 0.45), y, C.pink, Math.round(neg * 0.45), 7);
      px(g, 81, y, C.cyanD, pos, 7); px(g, 81 + Math.round(pos * 0.55), y, C.cyan, pos - Math.round(pos * 0.55), 7);
      px(g, 10, y + 2, C.dim, 22, 3);
    });
    line(g, 80, 6, 80, 94, C.white);
    text(g, '- AGREE +', 98, 92, C.amber);
  },
  // a slide with an interactive chart and a play button
  slides(g, r) {
    ground(g);
    px(g, 14, 10, C.violetD, 132, 80); px(g, 16, 12, '#140c30', 128, 76);
    px(g, 22, 18, C.amber, 50, 4); px(g, 22, 25, C.dim, 34, 2);
    for (let i = 0; i < 8; i++) { const h = 10 + ((r() * 34) | 0); px(g, 28 + i * 10, 80 - h, i === 5 ? C.pink : C.cyan, 6, h); }
    line(g, 24, 80, 112, 80, C.dim);
    for (let y = 0; y < 14; y++) line(g, 122, 42 + y, 122 + (y < 7 ? y : 14 - y), 42 + y, C.amber);
    text(g, 'HTML', 120, 64, C.cyan);
  },
  // headlines scored positive / negative
  headlines(g, r) {
    ground(g);
    for (let i = 0; i < 7; i++) {
      const y = 10 + i * 12, w = 50 + ((r() * 60) | 0), s = r();
      px(g, 12, y, C.white, 4, 5);
      px(g, 20, y + 1, C.dim, w, 3);
      text(g, s > 0.55 ? '+' : s < 0.35 ? '-' : ' ', 134, y, s > 0.55 ? C.green : C.pink);
      px(g, 142, y + 1, s > 0.55 ? C.green : s < 0.35 ? C.pink : C.dim, ((s * 12) | 0) + 2, 3);
    }
    text(g, 'NEWS', 12, 92, C.amber);
  },
  // semantic differential: 7-point scales with a profile line
  semdif(g, r) {
    ground(g);
    let prev: [number, number] | null = null;
    for (let i = 0; i < 7; i++) {
      const y = 12 + i * 12;
      px(g, 10, y, C.pink, 12, 3); px(g, 138, y, C.cyan, 12, 3);
      for (let k = 0; k < 7; k++) px(g, 34 + k * 15, y, C.dim, 3, 3);
      const k = 1 + ((r() * 5) | 0), x = 35 + k * 15;
      if (prev) line(g, prev[0], prev[1], x, y + 1, C.amber);
      disc(g, x, y + 1, 2, C.amber); prev = [x, y + 1];
    }
  },
  // simulation: accuracy climbing with sample size
  simulation(g, r) {
    ground(g); axes(g);
    let py = 82;
    for (let x = 16; x < 148; x++) {
      const t = (x - 16) / 132, y = 84 - 70 * (1 - Math.exp(-4 * t));
      line(g, x - 1, py, x, y, C.cyan); py = y;
      if (x % 6 === 0) px(g, x, y + (r() - 0.5) * 16, C.pink, 2, 2);
    }
    dashed(g, 14, 16, 150, 16, C.amber);
    text(g, 'N', 146, 92, C.dim);
  },
  // 95% intervals: most cover the true mean, a few miss
  ci(g, r) {
    ground(g);
    line(g, 80, 4, 80, 96, C.cyan);
    for (let i = 0; i < 18; i++) {
      const y = 6 + i * 5, c = 80 + (r() - 0.5) * 30, w = 12 + r() * 12, miss = i === 4 || i === 13;
      const cc = miss ? c + (c > 80 ? 22 : -22) : c;
      line(g, cc - w, y, cc + w, y, miss ? C.pink : C.white);
      px(g, cc - 1, y - 1, miss ? C.pink : C.amber, 3, 3);
    }
    text(g, '95', 140, 90, C.amber);
  },
  // annotated line chart
  annotate(g, r) {
    ground(g); axes(g);
    let py = 70;
    const pts: [number, number][] = [];
    for (let x = 16; x < 150; x += 2) { const y = 70 - (x - 16) * 0.32 + Math.sin(x / 9) * 6 + (r() - 0.5) * 3; line(g, x - 2, py, x, y, C.cyan); py = y; pts.push([x, y]); }
    const [ax, ay] = pts[44];
    disc(g, ax, ay, 3, C.pink);
    line(g, ax, ay - 4, ax - 20, ay - 26, C.white);
    px(g, ax - 58, ay - 36, C.amber, 40, 11); text(g, 'NOTE', ax - 54, ay - 33, C.void);
  },
  // boxplots in a brand palette
  boxplot(g, r) {
    ground(g); axes(g);
    [C.pink, C.cyan, C.amber, C.violet, C.green].forEach((c, i) => {
      const x = 28 + i * 25, mid = 30 + r() * 36, q = 8 + r() * 8;
      line(g, x + 5, mid - q - 12, x + 5, mid + q + 12, C.dim);
      px(g, x, mid - q, c, 11, q * 2); px(g, x + 1, mid - q + 1, C.night, 9, q * 2 - 2);
      line(g, x, mid, x + 10, mid, c);
    });
  },
  // a hex sticker with a box: an R package
  rpkg(g) {
    ground(g);
    const cx = 80, cy = 50, R = 34;
    for (let y = -R; y <= R; y++) for (let x = -R; x <= R; x++) {
      const ax = Math.abs(x), ay = Math.abs(y);
      if (ay <= R * 0.86 && ax * 0.5 + ay * 0.866 <= R * 0.866) px(g, cx + x, cy + y, Math.abs(ax * 0.5 + ay * 0.866 - R * 0.866) < 2 || Math.abs(ay - R * 0.86) < 2 ? C.cyan : '#1b2a6a');
    }
    px(g, 66, 38, C.amber, 28, 18); px(g, 68, 40, '#3a2a10', 24, 14); line(g, 66, 38, 80, 30, C.amber); line(g, 94, 38, 80, 30, C.amber);
    text(g, 'R', 78, 60, C.white); text(g, 'PKG', 74, 70, C.pink);
  },
  // fallback: scatter with a fitted line
  scatter(g, r) {
    ground(g); axes(g);
    for (let i = 0; i < 46; i++) { const x = 18 + r() * 128, y = 80 - (x - 18) * 0.45 + (r() - 0.5) * 26; px(g, x, y, i % 3 ? C.cyan : C.pink, 2, 2); }
    line(g, 18, 80, 146, 22, C.amber);
  },
};

const BY_SLUG: Record<string, string> = {
  'masters-thesis': 'eeg', 'bachelors-thesis': 'mri', 'simpsons-paradox': 'simpson', 'likert-scales': 'likert',
  'quarto-presentations': 'slides', 'headline-sentiment': 'headlines', 'semantic-differential': 'semdif',
  'variable-selection': 'simulation', 'confidence-intervals': 'ci', 'ggplot-annotations': 'annotate',
  'company-theme': 'boxplot', 'first-r-package': 'rpkg',
};
const BY_KIND: Record<string, string> = { Visualisation: 'likert', Statistics: 'ci', Tools: 'slides', NLP: 'headlines', Simulation: 'simulation' };

export function artFor(slug: string, kind?: string, art?: string) {
  return (art && ART[art] && art) || BY_SLUG[slug] || (kind && BY_KIND[kind]) || 'scatter';
}

export default function PixelCover({ slug, kind, art, className }: { slug: string; kind?: string; art?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const g = ref.current?.getContext('2d');
    if (!g) return;
    let s = [...slug].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 2147483647, 7) || 7;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    ART[artFor(slug, kind, art)](g, r);
  }, [slug, kind, art]);
  return <canvas ref={ref} width={W} height={H} className={`pixel-cover${className ? ` ${className}` : ''}`} aria-hidden />;
}
