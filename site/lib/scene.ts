// Which background scene the neon city shows.
// auto: rooftop city on overview pages, the rainy window behind long reading pages.

export type Scene = 'rooftop' | 'window' | 'street';
export type SceneChoice = Scene | 'auto';

const KEY = 'oz-scene';
export const SCENE_EVENT = 'oz:scene';

export function readingPage(pathname: string) {
  return /^\/(wiki\/[^/]+\/[^/]+|projects\/[^/]+|now)\/?$/.test(pathname.replace(process.env.NEXT_PUBLIC_BASE_PATH || '', ''));
}

export function storedChoice(): SceneChoice {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'rooftop' || v === 'window' || v === 'street') return v;
  } catch { /* ignore */ }
  return 'auto';
}

export function resolveScene(pathname: string, choice: SceneChoice = storedChoice()): Scene {
  if (choice !== 'auto') return choice;
  return readingPage(pathname) ? 'window' : 'rooftop';
}

export function setSceneChoice(c: SceneChoice) {
  try { if (c === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, c); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('oz:scene-choice', { detail: c }));
}
