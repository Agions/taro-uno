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
import Taro from '@tarojs/taro';

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
  const { serializer = JSON.stringify, deserializer = JSON.parse, initializeWithValue = true } = options;

  // Get initial value from storage or use provided initial value
  const readValue = useCallback((): T => {
    try {
      // In Taro, we need to use async storage API, but for initial value
      // we'll use the provided initial value and fetch asynchronously later
      return initialValue;
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  // Set value in storage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(valueToStore);

        // Save to storage using Taro API
        Taro.setStorageSync(key, serializer(valueToStore));
      } catch (error) {
        console.warn(`Error setting storage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  // Remove value from storage
  const removeValue = useCallback(() => {
    try {
      Taro.removeStorageSync(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Fetch initial value from storage asynchronously
  useEffect(() => {
    const fetchInitialValue = () => {
      try {
        const item = Taro.getStorageSync(key);
        if (item.data) {
          setStoredValue(deserializer(item.data));
        }
      } catch (error) {
        console.warn(`Error reading storage key "${key}":`, error);
      }
    };

    fetchInitialValue();
  }, [key, initialValue, deserializer]);

  // Fetch initial value from storage asynchronously
  useEffect(() => {
    const fetchInitialValue = () => {
      try {
        const item = Taro.getStorageSync(key);
        if (item.data) {
          setStoredValue(deserializer(item.data));
        }
      } catch (error) {
        console.warn(`Error reading storage key "${key}":`, error);
      }
    };

    fetchInitialValue();
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
  const { serializer = JSON.stringify, deserializer = JSON.parse, initializeWithValue = true } = options;

  const readValue = useCallback((): T => {
    try {
      // In Taro, we need to use async storage API, but for initial value
      // we'll use the provided initial value and fetch asynchronously later
      return initialValue;
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
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
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        Taro.setStorageSync(key, serializer(valueToStore));
      } catch (error) {
        console.warn(`Error setting storage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      Taro.removeStorageSync(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
