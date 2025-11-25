/**
 * useClickOutside Hook
 * Detect clicks outside of a specific element
 * 
 * @example
 * ```typescript
 * const ref = useClickOutside<HTMLDivElement>(() => {
 *   console.log('Clicked outside!');
 *   setIsOpen(false);
 * });
 * 
 * return <div ref={ref}>Content</div>;
 * ```
 */

import { useEffect, useRef, RefObject } from 'react';

/**
 * Hook for detecting clicks outside an element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      const target = event.target as Node;

      // Check if click is outside the element
      if (element && !element.contains(target)) {
        handler(event);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}
