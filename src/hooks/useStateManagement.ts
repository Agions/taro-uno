/**
 * 状态管理相关的自定义hooks
 * 提供通用的状态管理逻辑，包括受控/非受控模式、状态同步等
 */

import { useState, useEffect, useRef, useCallback } from 'react';
type ValidationResult = { valid: boolean; message?: string };

// ==================== 受控/非受控状态管理 ====================

/** 受控/非受控状态管理hook */
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue];
}

// ==================== 状态同步管理 ====================

/** 状态同步管理hook */
export function useSyncedState<T>(value: T, dependencies: unknown[] = []): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, dependencies);

  return [internalValue, setInternalValue];
}

// ==================== 状态历史管理 ====================

interface StateHistoryOptions<_T> {
  maxSize?: number;
  enableUndo?: boolean;
  enableRedo?: boolean;
}

/** 状态历史管理hook */
export function useStateHistory<T>(initialState: T, options: StateHistoryOptions<T> = {}) {
  const { maxSize = 50, enableUndo = true, enableRedo = true } = options;

  const [state, setState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateState = useCallback(
    (newState: T) => {
      setState(newState);

      // 添加到历史记录
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(newState);

      // 限制历史记录大小
      if (newHistory.length > maxSize) {
        newHistory.shift();
      } else {
        setCurrentIndex(newHistory.length - 1);
      }

      setHistory(newHistory);
    },
    [history, currentIndex, maxSize],
  );

  const undo = useCallback(() => {
    if (enableUndo && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setState(history[newIndex] as T);
    }
  }, [enableUndo, currentIndex, history]);

  const redo = useCallback(() => {
    if (enableRedo && currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setState(history[newIndex] as T);
    }
  }, [enableRedo, currentIndex, history]);

  const canUndo = enableUndo && currentIndex > 0;
  const canRedo = enableRedo && currentIndex < history.length - 1;

  return {
    state,
    setState: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    currentIndex,
  };
}

// ==================== 状态验证管理 ====================

interface ValidationState<T> {
  value: T;
  isValid: boolean;
  error?: string;
  isDirty: boolean;
  isTouched: boolean;
}

/** 状态验证管理hook */
export function useValidatedState<T>(
  initialValue: T,
  validator?: (value: T) => ValidationResult,
  options: {
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validateOnMount?: boolean;
  } = {},
) {
  const {
    validateOnBlur: _validateOnBlur = true,
    validateOnChange: _validateOnChange = false,
    validateOnMount = false,
  } = options;

  const [state, setState] = useState<ValidationState<T>>({
    value: initialValue,
    isValid: true,
    isDirty: false,
    isTouched: false,
  });

  const validate = useCallback(
    (value: T): ValidationResult => {
      if (!validator) return { valid: true };
      return validator(value);
    },
    [validator],
  );

  const setValue = useCallback(
    (newValue: T) => {
      const validationResult = validate(newValue);
      setState((prev) => ({
        ...prev,
        value: newValue,
        isValid: validationResult.valid,
        error: validationResult.valid ? undefined : validationResult.message,
        isDirty: true,
      }));
    },
    [validate],
  );

  const markAsTouched = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isTouched: true,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      value: initialValue,
      isValid: true,
      isDirty: false,
      isTouched: false,
    });
  }, [initialValue]);

  useEffect(() => {
    if (validateOnMount) {
      const validationResult = validate(initialValue);
      setState((prev) => ({
        ...prev,
        isValid: validationResult.valid,
        error: validationResult.valid ? undefined : validationResult.message,
      }));
    }
  }, [validateOnMount, initialValue, validate]);

  return {
    ...state,
    setValue,
    markAsTouched,
    reset,
    validate,
  };
}

// ==================== 状态批量更新 ====================

/** 状态批量更新hook */
export function useBatchStateUpdate<T extends Record<string, unknown>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const pendingUpdates = useRef<Partial<T>>({});

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    pendingUpdates.current[field] = value;
  }, []);

  const commitUpdates = useCallback(() => {
    if (Object.keys(pendingUpdates.current).length > 0) {
      setState((prev) => ({ ...prev, ...pendingUpdates.current }));
      pendingUpdates.current = {};
    }
  }, []);

  const resetUpdates = useCallback(() => {
    pendingUpdates.current = {};
  }, []);

  return {
    state,
    updateField,
    commitUpdates,
    resetUpdates,
  };
}

// ==================== 状态持久化 ====================

interface PersistenceOptions {
  key: string;
  storage?: 'localStorage' | 'sessionStorage';
  serialize?: (value: unknown) => string;
  deserialize?: (value: string) => unknown;
}

/** 状态持久化hook */
export function usePersistentState<T>(initialValue: T, options: PersistenceOptions) {
  const { key, storage = 'localStorage', serialize, deserialize } = options;

  const getStorage = () => {
    return storage === 'localStorage' ? localStorage : sessionStorage;
  };

  const defaultSerialize = useCallback((value: T) => JSON.stringify(value), []);
  const defaultDeserialize = useCallback((value: string) => JSON.parse(value), []);

  const serializer = serialize || defaultSerialize;
  const deserializer = deserialize || defaultDeserialize;

  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = getStorage().getItem(key);
      if (storedValue) {
        return deserializer(storedValue);
      }
    } catch (error) {
      console.warn(`Failed to load persisted state for ${key}:`, error);
    }
    return initialValue;
  });

  const setValue = useCallback(
    (newValue: T) => {
      setState(newValue);
      try {
        getStorage().setItem(key, serializer(newValue));
      } catch (error) {
        console.warn(`Failed to persist state for ${key}:`, error);
      }
    },
    [key, serializer],
  );

  const clearValue = useCallback(() => {
    setState(initialValue);
    try {
      getStorage().removeItem(key);
    } catch (error) {
      console.warn(`Failed to clear persisted state for ${key}:`, error);
    }
  }, [key, initialValue]);

  return [state, setValue, clearValue] as const;
}

// ==================== 状态选择器 ====================

/** 状态选择器hook */
export function useStateSelector<T, R>(state: T, selector: (state: T) => R): R {
  return selector(state);
}
