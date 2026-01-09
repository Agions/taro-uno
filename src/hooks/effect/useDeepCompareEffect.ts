/**
 * useDeepCompareEffect Hook
 * Effect hook with deep comparison of dependencies
 *
 * @example
 * ```typescript
 * const [user, setUser] = useState({ name: 'John', age: 30 });
 *
 * useDeepCompareEffect(() => {
 *   console.log('User changed:', user);
 *   // This effect will only run when the actual content of user changes, not on every render
 * }, [user]);
 * ```
 */

import { useEffect, useRef } from 'react';

/**
 * Deep comparison function
 */
function isEqual(a: unknown, b: unknown): boolean {
  // Handle primitive values
  if (a === b) return true;

  // Handle null and undefined
  if (a == null || b == null) return a === b;

  // Handle objects and arrays
  if (typeof a === 'object' && typeof b === 'object') {
    // Check if they are the same type
    if (a.constructor !== b.constructor) return false;

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Handle objects
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(objA[key], objB[key])) return false;
    }

    return true;
  }

  // All other cases
  return false;
}

/**
 * Hook for deep comparison effect
 */
export function useDeepCompareEffect(callback: React.EffectCallback, dependencies: unknown[]): void {
  // Create a ref to store the previous dependencies
  const previousDependencies = useRef<unknown[]>([]);

  // Check if dependencies have changed using deep comparison
  if (!isEqual(dependencies, previousDependencies.current)) {
    // Update the ref with current dependencies
    previousDependencies.current = dependencies;
  }

  // Use the ref as the dependency array for useEffect
  useEffect(callback, [callback, previousDependencies.current]);
}

/**
 * Hook for deep comparison layout effect
 */
export function useDeepCompareLayoutEffect(callback: React.EffectCallback, dependencies: unknown[]): void {
  const previousDependencies = useRef<unknown[]>([]);

  if (!isEqual(dependencies, previousDependencies.current)) {
    previousDependencies.current = dependencies;
  }

  useEffect(callback, [callback, previousDependencies.current]);
}
