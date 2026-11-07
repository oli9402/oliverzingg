'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { openDossier } from './Dossier';

type Bank = { dir: string; notes: { slug: string; title: string; minutes: number; href: string }[] }[];

const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Neon home page: boot log, typewriter, pixel portrait, databank terminal. */
export default function NeonHomeEffects({ projectCount, noteCount }: { projectCount: number; noteCount: number }) {
  const router = useRouter();

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

    /* ---------- boot sequence (once per browser session) ---------- */
    const boot = $('boot'), log = $('bootlog');
    let typing = false;
    const startTyping = () => {
      if (typing) return;
      typing = true;
      const el = $('type');
      if (!el) return;
      const msgs = ['> IDENT: PSYCHOLOGIST // DATA SCIENTIST', '> SKILLS: STUDY DESIGN · MIXED MODELS · ML', '> STATUS: SEEKING FULL-TIME ROLE, 2027'];
      if (reduced()) { el.textContent = msgs[0]; return; }
      let m = 0, c = 0, del = false, h = 0;
      const tick = () => {
        const s = msgs[m];
        el.textContent = s.slice(0, c);
        if (!del && c++ > s.length + 22) del = true;
        if (del && --c < 2) { del = false; m = (m + 1) % msgs.length; }
        h = window.setTimeout(tick, del ? 18 : 45);
      };
      tick();
      cleanups.push(() => clearTimeout(h));
    };
    if (boot && log) {
      let seen = false;
      try { seen = sessionStorage.getItem('oz-neon-booted') === '1'; } catch { /* storage blocked: show the boot */ }
      const lines = [
        'OZ-BIOS v2.026  (c) ZÜRICH SECTOR',
        'MEM CHECK ........................ 640K OK',
        'MOUNT /dev/uzh/psychology ........ OK',
        'MOUNT /dev/hslu/data_science ..... OK (until 12.2026)',
        `LOAD  knowledge_base.db .......... ${noteCount} entries`,
        `LOAD  case_files ................. ${projectCount} records`,
        'LINK  zurich_insurance ........... ACTIVE',
        '',
        'IDENTITY VERIFIED: ZINGG, OLIVER',
        'SELECT ACCESS MODE:',
      ];
      let i = 0, done = false, h = 0;
      let menu = false;
      const choose = (k: string) => {
        if (k === '1') { finish(); window.setTimeout(openDossier, 350); }
        else if (k === '2') { finish(); router.push('/experience/'); }
        else finish();
      };
      const showMenu = () => {
        if (done || menu) return;
        menu = true;
        const m = document.createElement('div');
        m.className = 'boot-menu';
        m.setAttribute('role', 'group');
        m.setAttribute('aria-label', 'Choose how to view the site');
        [['1', '[1] QUICK DOSSIER · 30s'], ['2', '[2] FULL RECORD'], ['3', '[3] EXPLORE THE CITY']].forEach(([k, label]) => {
          const b = document.createElement('button');
          b.textContent = label;
          b.onclick = (e) => { e.stopPropagation(); choose(k); };
          m.appendChild(b);
        });
        log.parentElement!.appendChild(m);
        (m.firstChild as HTMLButtonElement).focus();
      };
      const finish = () => {
        if (done) return;
        done = true;
        boot.classList.add('gone');
        try { sessionStorage.setItem('oz-neon-booted', '1'); } catch { /* ignore */ }
        window.setTimeout(() => boot.remove(), 500);
        startTyping();
      };
      const step = () => {
        if (done) return;
        if (i < lines.length) { log.textContent += lines[i++] + '\n'; h = window.setTimeout(step, i === lines.length ? 500 : 150 + Math.random() * 120); }
        else showMenu();
      };
      const onKey = (e: KeyboardEvent) => {
        if (done) return;
        if (['1', '2', '3'].includes(e.key)) { e.preventDefault(); if (!menu) { log.textContent = lines.join('\n') + '\n'; showMenu(); } choose(e.key); return; }
        if (e.key === 'Escape') { e.preventDefault(); finish(); return; }
        // Enter/space before the menu appears skips the typing; on the menu they press the focused button
        if ((e.key === 'Enter' || e.key === ' ') && !menu) { e.preventDefault(); i = lines.length; log.textContent = lines.join('\n') + '\n'; showMenu(); }
      };
      document.getElementById('skip')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); finish(); });
      boot.addEventListener('click', () => { if (menu) finish(); else { i = lines.length; log.textContent = lines.join('\n') + '\n'; showMenu(); } });
      window.addEventListener('keydown', onKey);
      cleanups.push(() => { clearTimeout(h); window.removeEventListener('keydown', onKey); });
      const neonOn = document.documentElement.dataset.theme !== 'clean';
      if (seen || !neonOn) { boot.remove(); startTyping(); }
      else if (reduced()) { log.textContent = lines.join('\n'); h = window.setTimeout(finish, 300); }
      else step();
    }

    /* ---------- pixel-art images: downscale + ordered dither to the neon palette ---------- */
    const PAL = [[7, 4, 15], [36, 22, 90], [90, 60, 140], [123, 77, 255], [255, 46, 136], [201, 107, 138], [240, 190, 170], [62, 242, 255], [255, 178, 56], [232, 226, 255], [18, 122, 138], [163, 18, 90]];
    const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
    const nearest = (r: number, g: number, b: number) => {
      let best = PAL[0], d = Infinity;
      for (const p of PAL) { const e = (p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2; if (e < d) { d = e; best = p; } }
      return best;
    };
    document.querySelectorAll<HTMLCanvasElement>('.neon-root canvas[data-src]').forEach((cv) => {
      const w = +cv.dataset.w!, h = +cv.dataset.h!;
      cv.width = w; cv.height = h;
      const ctx = cv.getContext('2d');
      const img = new Image();
      img.onload = () => {
        if (!ctx) return;
        const ar = w / h, iar = img.width / img.height;
        let sw = img.width, sh = img.height, sx = 0, sy = 0;
        if (iar > ar) { sw = img.height * ar; sx = (img.width - sw) / 2; } else { sh = img.width / ar; sy = (img.height - sh) / 4; }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        const d = ctx.getImageData(0, 0, w, h), a = d.data;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const k = (y * w + x) * 4, t = (BAYER[y % 4][x % 4] / 16 - 0.5) * 30;
          const p = nearest(a[k] + t, a[k + 1] + t, a[k + 2] + t);
          a[k] = p[0]; a[k + 1] = p[1]; a[k + 2] = p[2];
        }
        ctx.putImageData(d, 0, 0);
      };
      img.src = cv.dataset.src!;
    });

    /* ---------- databank terminal ---------- */
    const bank: Bank = JSON.parse(document.getElementById('databank-data')?.textContent || '[]');
    const dirs = $('dirs'), rows = $('rows'), cmd = $('cmd'), q = $<HTMLInputElement>('q');
    if (dirs && rows && cmd && q && bank.length) {
      const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
      const show = (list: { dir: string; slug: string; minutes: number; href: string }[], c: string) => {
        cmd.textContent = c;
        rows.innerHTML = list.length
          ? list.map((n, i) => `<div class="row"><span class="i">${String(i + 1).padStart(2, '0')}</span><a href="${esc(n.href)}" data-nav>${esc(n.dir)}/${esc(n.slug)}.md</a><span class="m">${n.minutes}m read</span></div>`).join('')
          : '<div class="row"><span class="i">--</span><span style="color:var(--pink)">no match. try "linear" or "llm"</span><span></span></div>';
      };
      const select = (i: number) => {
        dirs.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
        q.value = '';
        show(bank[i].notes.map((n) => ({ ...n, dir: bank[i].dir })), `ls ${bank[i].dir}/`);
      };
      dirs.innerHTML = '';
      bank.forEach((b, i) => {
        const btn = document.createElement('button');
        btn.setAttribute('role', 'tab');
        btn.innerHTML = `${esc(b.dir)}/ <span>${b.notes.length}</span>`;
        btn.onclick = () => select(i);
        dirs.appendChild(btn);
      });
      select(0);
      const onInput = () => {
        const t = q.value.trim().toLowerCase();
        if (!t) { const i = [...dirs.querySelectorAll('button')].findIndex((b) => b.getAttribute('aria-selected') === 'true'); return select(Math.max(0, i)); }
        const all = bank.flatMap((b) => b.notes.map((n) => ({ ...n, dir: b.dir }))).filter((n) => `${n.dir} ${n.slug} ${n.title}`.toLowerCase().includes(t));
        show(all, `grep -ri "${t}" .`);
      };
      q.addEventListener('input', onInput);
      // databank links are plain anchors; route them through Next for instant navigation
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[data-nav]') as HTMLAnchorElement | null;
        if (!a || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
        router.push(a.getAttribute('href')!.slice(base.length));
      };
      rows.addEventListener('click', onClick);
      cleanups.push(() => { q.removeEventListener('input', onInput); rows.removeEventListener('click', onClick); });
    }

    document.documentElement.classList.remove('to-neon');
    return () => cleanups.forEach((f) => f());
  }, [router, projectCount, noteCount]);

  return null;
}
