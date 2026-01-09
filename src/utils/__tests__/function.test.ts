/**
 * 函数工具测试
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  debounce,
  throttle,
  once,
  memoize,
  delay,
  compose,
  pipe,
  negate,
  noop,
  identity,
  constant,
  tryCatch,
} from '../function';

describe('function', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('debounce', () => {
    it('should debounce function calls', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should support leading option', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100, { leading: true, trailing: false });

      debounced();
      expect(fn).toHaveBeenCalledTimes(1);

      debounced();
      debounced();
      vi.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should support cancel', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced.cancel();
      vi.advanceTimersByTime(100);

      expect(fn).not.toHaveBeenCalled();
    });

    it('should support pending check', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      expect(debounced.pending()).toBe(false);
      debounced();
      expect(debounced.pending()).toBe(true);
      vi.advanceTimersByTime(100);
      expect(debounced.pending()).toBe(false);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('once', () => {
    it('should only execute function once', () => {
      const fn = vi.fn().mockReturnValue(42);
      const onceFn = once(fn);

      expect(onceFn()).toBe(42);
      expect(onceFn()).toBe(42);
      expect(onceFn()).toBe(42);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('memoize', () => {
    it('should cache function results', () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should use custom resolver', () => {
      const fn = vi.fn((a: number, b: number) => a + b);
      const memoized = memoize(fn, (a, b) => `${a}-${b}`);

      expect(memoized(1, 2)).toBe(3);
      expect(memoized(1, 2)).toBe(3);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('delay', () => {
    it('should delay execution', async () => {
      const promise = delay(100);

      vi.advanceTimersByTime(100);
      await promise;

      // Test passes if promise resolves after advancing timers
      expect(true).toBe(true);
    });
  });

  describe('compose', () => {
    it('should compose functions from right to left', () => {
      const addOne = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const composed = compose(double, addOne);

      expect(composed(5)).toBe(12); // (5 + 1) * 2
    });
  });

  describe('pipe', () => {
    it('should pipe functions from left to right', () => {
      const addOne = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const piped = pipe(addOne, double);

      expect(piped(5)).toBe(12); // (5 + 1) * 2
    });
  });

  describe('negate', () => {
    it('should negate predicate function', () => {
      const isEven = (n: number) => n % 2 === 0;
      const isOdd = negate(isEven);

      expect(isOdd(3)).toBe(true);
      expect(isOdd(4)).toBe(false);
    });
  });

  describe('noop', () => {
    it('should do nothing', () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe('identity', () => {
    it('should return the same value', () => {
      expect(identity(42)).toBe(42);
      expect(identity('hello')).toBe('hello');
      const obj = { a: 1 };
      expect(identity(obj)).toBe(obj);
    });
  });

  describe('constant', () => {
    it('should return a function that always returns the same value', () => {
      const always42 = constant(42);
      expect(always42()).toBe(42);
      expect(always42()).toBe(42);
    });
  });

  describe('tryCatch', () => {
    it('should return result on success', () => {
      const [result, error] = tryCatch(() => 42);
      expect(result).toBe(42);
      expect(error).toBeNull();
    });

    it('should return error on failure', () => {
      const [result, error] = tryCatch(() => {
        throw new Error('test error');
      });
      expect(result).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toBe('test error');
    });
  });
});
