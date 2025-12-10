/**
 * useToggle Hook
 * Simple boolean state toggle with optional callbacks
 *
 * @example
 * ```typescript
 * const [isOpen, toggle, setIsOpen] = useToggle(false);
 * toggle(); // true
 * toggle(); // false
 * setIsOpen(true); // true
 * ```
 */

import { useState, useCallback } from 'react';

export interface UseToggleReturn {
  /** Current boolean value */
  value: boolean;
  /** Toggle the value */
  toggle: () => void;
  /** Set to true */
  setTrue: () => void;
  /** Set to false */
  setFalse: () => void;
  /** Set to specific value */
  setValue: (value: boolean) => void;
}

/**
 * Hook for managing boolean toggle state
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}
