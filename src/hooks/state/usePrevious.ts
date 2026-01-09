/**
 * usePrevious Hook
 * Get the previous value of a variable from the last render
 *
 * @example
 * ```typescript
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count); // Get the previous count value
 * ```
 */

import { useRef, useEffect } from 'react';

/**
 * Hook for getting the previous value of a variable from the last render
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
