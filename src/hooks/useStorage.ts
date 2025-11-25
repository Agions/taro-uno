/**
 * useLocalStorage Hook
 * Persist state to localStorage with automatic serialization
 * 
 * @example
 * ```typescript
 * const [user, setUser, removeUser] = useLocalStorage<User>('user', null);
 * setUser({ id: 1, name: 'John' }); // Saved to localStorage['user']
 * removeUser(); // Clears from localStorage
 * ```
 */

import { useState, useCallback, useEffect } from 'react';

export interface UseStorageOptions<T> {
  /** Custom serializer */
  serializer?: (value: T) => string;
  /** Custom deserializer */
  deserializer?: (value: string) => T;
  /** Initialize from storage on mount */
  initializeWithValue?: boolean;
}

/**
 * Hook for persisting state to localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    initializeWithValue = true,
  } = options;

  // Get initial value from localStorage or use provided initial value
  const readValue = useCallback((): T => {
    // Check if localStorage is available (server-side rendering)
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  // Set value in localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      // Check if localStorage is available
      if (typeof window === 'undefined') {
        console.warn('localStorage is not available');
        return;
      }

      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(valueToStore);

        // Save to localStorage
        window.localStorage.setItem(key, serializer(valueToStore));

        // Dispatch storage event for cross-tab synchronization
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: serializer(valueToStore),
        }));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      // Dispatch storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue: null,
      }));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        if (e.newValue === null) {
          setStoredValue(initialValue);
        } else {
          try {
            setStoredValue(deserializer(e.newValue));
          } catch (error) {
            console.warn('Error deserializing storage event:', error);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, deserializer]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for persisting state to sessionStorage
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    initializeWithValue = true,
  } = options;

  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.sessionStorage.setItem(key, serializer(valueToStore));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
