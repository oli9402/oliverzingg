export type Theme = 'neon' | 'clean';
export const THEME_KEY = 'oz-theme';

/** Runs in <head> before first paint so a stored choice never flashes the other theme. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.dataset.theme=t==='clean'?'clean':'neon'}catch(e){}})();`;

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(THEME_KEY, t); } catch { /* private mode: choice lasts for this page view */ }
  window.dispatchEvent(new CustomEvent('oz:theme', { detail: t }));
}
