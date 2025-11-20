import type { Platform } from '../types';

/**
 * Detect whether code executes in a browser-like environment.
 */
export const isBrowserEnvironment = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Detect whether Taro runtime is available (mini-program / native bridge).
 */
export const isTaroEnvironment = (): boolean => {
  return typeof process !== 'undefined' && typeof process.env !== 'undefined' && typeof process.env['TARO_ENV'] !== 'undefined';
};

/**
 * Resolve the current platform in a resilient manner.
 */
export const resolvePlatform = (): Platform | 'unknown' => {
  if (isTaroEnvironment()) {
    return (process.env['TARO_ENV'] as Platform) || 'unknown';
  }
  return 'h5';
};

/**
 * Safe local storage wrapper guarding non-browser runtimes.
 */
export const safeLocalStorage = {
  getItem(key: string): string | null {
    if (!isBrowserEnvironment()) {
      return null;
    }

    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.warn('[safeLocalStorage] getItem failed:', error);
      return null;
    }
  },

  setItem(key: string, value: string): void {
    if (!isBrowserEnvironment()) {
      return;
    }

    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn('[safeLocalStorage] setItem failed:', error);
    }
  },

  removeItem(key: string): void {
    if (!isBrowserEnvironment()) {
      return;
    }

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn('[safeLocalStorage] removeItem failed:', error);
    }
  },

  clear(): void {
    if (!isBrowserEnvironment()) {
      return;
    }

    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn('[safeLocalStorage] clear failed:', error);
    }
  },
};

/**
 * Guarded matchMedia helper for SSR / mini-program runtimes.
 */
export const safeMatchMedia = (query: string): MediaQueryList | null => {
  if (!isBrowserEnvironment() || typeof window.matchMedia !== 'function') {
    return null;
  }

  try {
    return window.matchMedia(query);
  } catch (error) {
    console.warn('[safeMatchMedia] failed:', error);
    return null;
  }
};
