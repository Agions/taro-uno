/**
 * Hooks 单元测试
 * 测试所有核心 Hooks 的基本功能
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

// State Hooks
import { useBoolean } from '../../src/hooks/state/useBoolean';
import { useToggle } from '../../src/hooks/state/useToggle';

// Lifecycle Hooks
import { useMount, useMounted, useIsMounted } from '../../src/hooks/lifecycle/useMount';
import { useUnmount, useCleanup } from '../../src/hooks/lifecycle/useUnmount';

// Effect Hooks
import { useDebounce, useDebouncedCallback } from '../../src/hooks/effect/useDebounce';
import { useThrottle, useThrottledCallback } from '../../src/hooks/effect/useThrottle';

// ==================== State Hooks Tests ====================

describe('useBoolean', () => {
  it('should initialize with default value false', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  it('should set true', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  it('should set false', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });

  it('should set specific value', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });

  it('should call onChange callback', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useBoolean({ initialValue: false, onChange }),
    );

    act(() => {
      result.current.toggle();
    });
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('useToggle', () => {
  it('should initialize with default boolean value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('should toggle boolean value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  it('should toggle between custom values', () => {
    const { result } = renderHook(() => useToggle('light', 'dark'));

    expect(result.current.value).toBe('light');

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe('dark');

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe('light');
  });

  it('should set left value', () => {
    const { result } = renderHook(() => useToggle('a', 'b'));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe('b');

    act(() => {
      result.current.setLeft();
    });
    expect(result.current.value).toBe('a');
  });

  it('should set right value', () => {
    const { result } = renderHook(() => useToggle('a', 'b'));

    expect(result.current.value).toBe('a');

    act(() => {
      result.current.setRight();
    });
    expect(result.current.value).toBe('b');
  });
});

// ==================== Lifecycle Hooks Tests ====================

describe('useMount', () => {
  it('should call callback on mount', () => {
    const callback = vi.fn();
    renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback on rerender', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('useMounted', () => {
  it('should return function that returns true when mounted', () => {
    const { result } = renderHook(() => useMounted());

    expect(result.current()).toBe(true);
  });

  it('should return false after unmount', () => {
    const { result, unmount } = renderHook(() => useMounted());

    expect(result.current()).toBe(true);

    unmount();
    expect(result.current()).toBe(false);
  });
});

describe('useUnmount', () => {
  it('should call callback on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useUnmount(callback));

    expect(callback).not.toHaveBeenCalled();

    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback on rerender', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useUnmount(callback));

    rerender();
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('useCleanup', () => {
  it('should call cleanup on unmount', () => {
    const cleanup = vi.fn();
    const { unmount } = renderHook(() => useCleanup(cleanup));

    expect(cleanup).not.toHaveBeenCalled();

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});

// ==================== Effect Hooks Tests ====================

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value updates', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset timer on value change', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'b' });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: 'c' });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('c');
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce callback execution', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current.callback('arg1');
      result.current.callback('arg2');
      result.current.callback('arg3');
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg3');
  });

  it('should cancel pending execution', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current.callback('arg');
    });

    act(() => {
      result.current.cancel();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should report pending state', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    expect(result.current.isPending()).toBe(false);

    act(() => {
      result.current.callback('arg');
    });

    expect(result.current.isPending()).toBe(true);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.isPending()).toBe(false);
  });
});

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should throttle value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 500),
      { initialProps: { value: 'a' } },
    );

    expect(result.current).toBe('a');

    // Update value - should be throttled
    rerender({ value: 'b' });
    // Value doesn't update immediately due to throttling
    expect(result.current).toBe('a');

    // After interval passes, value should update
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('b');

    // Rapid updates should be throttled
    rerender({ value: 'c' });
    expect(result.current).toBe('b');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('c');
  });
});

describe('useThrottledCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute immediately on first call', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 500));

    act(() => {
      result.current.callback('arg1');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg1');
  });

  it('should throttle subsequent calls', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 500));

    act(() => {
      result.current.callback('arg1');
      result.current.callback('arg2');
      result.current.callback('arg3');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg1');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('arg3');
  });

  it('should cancel pending execution', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 500));

    act(() => {
      result.current.callback('arg1');
      result.current.callback('arg2');
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.cancel();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
