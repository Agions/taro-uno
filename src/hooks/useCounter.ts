/**
 * useCounter Hook
 * Manage counter state with increment, decrement, and reset
 * 
 * @example
 * ```typescript
 * const { count, increment, decrement, reset, set } = useCounter(0, { min: 0, max: 100 });
 * increment(); // 1
 * increment(5); // 6
 * decrement(3); // 3
 * ```
 */

import { useState, useCallback } from 'react';

export interface UseCounterOptions {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step size for increment/decrement */
  step?: number;
}

export interface UseCounterReturn {
  /** Current count value */
  count: number;
  /** Increment count */
  increment: (step?: number) => void;
  /** Decrement count */
  decrement: (step?: number) => void;
  /** Reset to initial value */
  reset: () => void;
  /** Set to specific value */
  set: (value: number) => void;
}

/**
 * Hook for managing counter state with constraints
 */
export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {},
): UseCounterReturn {
  const { min, max, step: defaultStep = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const clamp = useCallback(
    (value: number): number => {
      let result = value;
      if (min !== undefined && result < min) result = min;
      if (max !== undefined && result > max) result = max;
      return result;
    },
    [min, max],
  );

  const increment = useCallback(
    (step: number = defaultStep) => {
      setCount(c => clamp(c + step));
    },
    [defaultStep, clamp],
  );

  const decrement = useCallback(
    (step: number = defaultStep) => {
      setCount(c => clamp(c - step));
    },
    [defaultStep, clamp],
  );

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback(
    (value: number) => {
      setCount(clamp(value));
    },
    [clamp],
  );

  return {
    count,
    increment,
    decrement,
    reset,
    set,
  };
}
