import { useState, useEffect, useCallback } from 'react';
import { ls } from '../utils';

// ─── useLocalStorage ──────────────────────────────────────────────────────────
/**
 * Syncs state to localStorage automatically.
 */
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => ls.get(key, initialValue));

  const setAndPersist = useCallback((value) => {
    setState((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      ls.set(key, next);
      return next;
    });
  }, [key]);

  return [state, setAndPersist];
}

// ─── useNotify ────────────────────────────────────────────────────────────────
/**
 * Toast notification system.
 * Returns { notes, push } where push(msg, type) adds a toast.
 */
export function useNotify() {
  const [notes, setNotes] = useState([]);

  const push = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setNotes((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setNotes((prev) => prev.filter((n) => n.id !== id)), 3500);
  }, []);

  return { notes, push };
}

// ─── useCountdown ─────────────────────────────────────────────────────────────
/**
 * Counts down to a given Date object.
 * Returns { d, h, m, s }
 */
export function useCountdown(endDate) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = endDate - Date.now();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000)  / 60000),
        s: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return time;
}

// ─── useTheme ─────────────────────────────────────────────────────────────────
/**
 * Manages dark/light theme via data-theme on <body>.
 */
export function useTheme() {
  const [dark, setDark] = useLocalStorage('elsonny_dark', true);

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);
  return { dark, toggleTheme };
}
