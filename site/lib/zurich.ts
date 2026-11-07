// Live conditions in Zürich for the neon city: local time of day plus current weather
// from Open-Meteo (free, no key, CORS-enabled). Cached for 15 minutes per browser session.

export type Phase = 'night' | 'dawn' | 'day' | 'dusk';
export type Sky = 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm';
export type Env = {
  phase: Phase;
  sky: Sky;
  /** 0..1, how hard it rains or snows */
  intensity: number;
  tempC: number | null;
  label: string;
  live: boolean;
};

const ZRH = { lat: 47.3769, lon: 8.5417 };
const KEY = 'oz-zrh-weather';
const TTL = 15 * 60 * 1000;

export function zurichHour(d = new Date()) {
  const [h, m] = d.toLocaleTimeString('en-GB', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit', hour12: false }).split(':').map(Number);
  return h + m / 60;
}

export function phaseAt(hour: number, isDay?: boolean): Phase {
  if (hour >= 5.5 && hour < 8) return 'dawn';
  if (hour >= 17.5 && hour < 21) return 'dusk';
  if (isDay === false) return 'night';
  return hour >= 8 && hour < 17.5 ? 'day' : 'night';
}

// WMO weather interpretation codes
function skyFrom(code: number, precip: number): { sky: Sky; intensity: number; label: string } {
  if (code >= 95) return { sky: 'storm', intensity: 1, label: 'THUNDERSTORM' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { sky: 'snow', intensity: Math.min(1, 0.35 + precip / 3), label: 'SNOW' };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { sky: 'rain', intensity: Math.min(1, 0.45 + precip / 4), label: precip > 4 ? 'HEAVY RAIN' : 'RAIN' };
  if (code >= 51 && code <= 57) return { sky: 'drizzle', intensity: 0.25, label: 'DRIZZLE' };
  if (code === 45 || code === 48) return { sky: 'fog', intensity: 0, label: 'FOG' };
  if (code >= 2) return { sky: 'cloudy', intensity: 0, label: code === 3 ? 'OVERCAST' : 'CLOUDY' };
  return { sky: 'clear', intensity: 0, label: 'CLEAR' };
}

/** What the city shows before (or without) live data: the signature rainy night look, at the right time of day. */
export function fallbackEnv(): Env {
  return { phase: phaseAt(zurichHour()), sky: 'drizzle', intensity: 0.3, tempC: null, label: 'NO SIGNAL', live: false };
}

export async function fetchEnv(): Promise<Env> {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      const c = JSON.parse(raw);
      if (Date.now() - c.at < TTL) return { ...c.env, phase: phaseAt(zurichHour(), c.env.isDay) };
    }
  } catch { /* storage blocked */ }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${ZRH.lat}&longitude=${ZRH.lon}&current=temperature_2m,precipitation,weather_code,is_day&timezone=Europe%2FZurich`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 5000);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    const cur = j.current || {};
    const s = skyFrom(Number(cur.weather_code) || 0, Number(cur.precipitation) || 0);
    const isDay = cur.is_day === 1;
    const env: Env & { isDay: boolean } = { phase: phaseAt(zurichHour(), isDay), ...s, tempC: typeof cur.temperature_2m === 'number' ? Math.round(cur.temperature_2m) : null, live: true, isDay };
    try { sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), env })); } catch { /* ignore */ }
    return env;
  } catch {
    return fallbackEnv();
  } finally {
    clearTimeout(t);
  }
}

export const ENV_EVENT = 'oz:env';

declare global { interface Window { __ozEnv?: Env } }
