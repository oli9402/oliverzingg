export type Theme = 'light' | 'dark';
export const THEME_KEY = 'oz-theme';
export const SKIN_KEY = 'oz-skin';
export const SKIN_EVENT = 'oz:skin';

/**
 * Runs in <head> before first paint. With no stored choice nothing is set and the
 * stylesheet follows the system setting; a stored 'light' or 'dark' wins.
 * The neon skin is a separate switch layered on top (data-skin="neon").
 */
export const themeBootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark')d.dataset.theme=t;if(localStorage.getItem('${SKIN_KEY}')==='neon')d.dataset.skin='neon'}catch(e){}})();`;

export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function toggleTheme() {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch { /* private mode: lasts for this page view */ }
}

export const isNeon = () => document.documentElement.dataset.skin === 'neon';

export function setNeon(on: boolean) {
  const d = document.documentElement;
  if (on) d.dataset.skin = 'neon';
  else delete d.dataset.skin;
  try { if (on) localStorage.setItem(SKIN_KEY, 'neon'); else localStorage.removeItem(SKIN_KEY); } catch { /* private mode */ }
  window.dispatchEvent(new CustomEvent(SKIN_EVENT, { detail: on }));
}
