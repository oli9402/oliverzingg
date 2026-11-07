// Neon-mode sound: rain and city hum from filtered noise, plus 8-bit blips on hover and click.
// Everything is synthesised with Web Audio; no audio files. Off by default.

import { ENV_EVENT, type Env } from './zurich';

const KEY = 'oz-sound';
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let rainGain: GainNode | null = null;
let humGain: GainNode | null = null;
let rainLp: BiquadFilterNode | null = null;
let on = false;
let lastBlip = 0;

const neon = () => document.documentElement.dataset.theme !== 'clean';

function noiseBuffer(c: AudioContext) {
  const len = c.sampleRate * 2;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } // brown noise
  return buf;
}

function build() {
  if (ctx) return;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  const buf = noiseBuffer(ctx);
  // rain: brighter noise
  const rain = ctx.createBufferSource(); rain.buffer = buf; rain.loop = true;
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 500;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5000; rainLp = lp;
  rainGain = ctx.createGain(); rainGain.gain.value = 0.25;
  rain.connect(hp).connect(lp).connect(rainGain).connect(master); rain.start();
  // city hum: deep rumble
  const hum = ctx.createBufferSource(); hum.buffer = buf; hum.loop = true; hum.playbackRate.value = 0.5;
  const hlp = ctx.createBiquadFilter(); hlp.type = 'lowpass'; hlp.frequency.value = 180;
  humGain = ctx.createGain(); humGain.gain.value = 0.5;
  hum.connect(hlp).connect(humGain).connect(master); hum.start();
  applyEnv(window.__ozEnv);
  applyScene(document.documentElement.dataset.scene);
}

// behind glass the rain sounds muffled and closer
function applyScene(scene?: string) {
  if (!ctx || !rainLp) return;
  rainLp.frequency.setTargetAtTime(scene === 'window' ? 1400 : 5000, ctx.currentTime, 0.4);
}

function applyEnv(env?: Env) {
  if (!ctx || !rainGain) return;
  const k = !env ? 0.3 : env.sky === 'storm' ? 1 : env.sky === 'snow' ? 0.05 : env.intensity;
  rainGain.gain.setTargetAtTime(0.06 + k * 0.5, ctx.currentTime, 0.8);
}

function blip(freq: number, dur = 0.045, type: OscillatorType = 'square', vol = 0.05) {
  if (!on || !ctx || !master || !neon()) return;
  const o = ctx.createOscillator(), gn = ctx.createGain();
  o.type = type; o.frequency.value = freq;
  gn.gain.setValueAtTime(vol, ctx.currentTime);
  gn.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  o.connect(gn).connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime + dur + 0.02);
}

export const sfx = {
  hover: () => { const now = performance.now(); if (now - lastBlip < 70) return; lastBlip = now; blip(1320, 0.03, 'square', 0.025); },
  click: () => { blip(660, 0.05); setTimeout(() => blip(990, 0.07), 45); },
  key: () => blip(220 + Math.random() * 60, 0.025, 'square', 0.03),
  error: () => { blip(180, 0.12, 'sawtooth', 0.05); },
};

export function isSoundOn() { return on; }

export function setSound(next: boolean) {
  on = next;
  try { localStorage.setItem(KEY, next ? 'on' : 'off'); } catch { /* ignore */ }
  if (next) {
    build();
    ctx!.resume();
    master!.gain.setTargetAtTime(neon() ? 0.35 : 0, ctx!.currentTime, 0.4);
    sfx.click();
  } else if (ctx && master) {
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
  }
  window.dispatchEvent(new CustomEvent('oz:sound', { detail: next }));
}

let installed = false;
/** Wire global listeners once: hover/click blips, theme and weather changes, stored preference. */
export function installSound() {
  if (installed) return;
  installed = true;
  const isUI = (el: EventTarget | null) => el instanceof Element && !!el.closest('a, button, [role="tab"], summary');
  document.addEventListener('pointerover', (e) => { if (isUI(e.target)) sfx.hover(); });
  document.addEventListener('click', (e) => { if (isUI(e.target)) sfx.click(); });
  window.addEventListener(ENV_EVENT, (e) => applyEnv((e as CustomEvent<Env>).detail));
  window.addEventListener('oz:scene', (e) => applyScene((e as CustomEvent<string>).detail));
  window.addEventListener('oz:theme', () => { if (ctx && master) master.gain.setTargetAtTime(on && neon() ? 0.35 : 0, ctx.currentTime, 0.3); });
  // browsers only allow audio after a gesture: resume a stored "on" at the first one
  let stored = false;
  try { stored = localStorage.getItem(KEY) === 'on'; } catch { /* ignore */ }
  if (stored) {
    const start = () => { setSound(true); window.removeEventListener('pointerdown', start); window.removeEventListener('keydown', start); };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    on = true;
    window.dispatchEvent(new CustomEvent('oz:sound', { detail: true }));
  }
}
