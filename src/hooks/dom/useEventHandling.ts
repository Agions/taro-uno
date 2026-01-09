/**
 * 事件处理相关的自定义hooks
 * 提供通用的事件处理逻辑，包括防抖、节流、点击处理等
 */

import { useRef, useEffect, useCallback, useMemo } from 'react';
import type { ITouchEvent } from '@tarojs/components';

// ==================== 防抖处理 ====================

interface DebounceOptions {
  delay?: number;
  leading?: boolean;
  trailing?: boolean;
}

/** 防抖事件处理hook */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  options: DebounceOptions = {},
): T & { cancel: () => void } {
  const { delay = 300, leading = false, trailing = true } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTime = useRef<number>(0);

  return useMemo(() => {
    const debounced = function (this: unknown, ...args: Parameters<T>) {
      const now = Date.now();
      const shouldCallLeading = leading && !timeoutRef.current;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (shouldCallLeading) {
        callback.apply(this, args);
        lastCallTime.current = now;
      }

      timeoutRef.current = setTimeout(
        () => {
          if (trailing && !leading) {
            callback.apply(this, args);
          }
          timeoutRef.current = null;
        },
        delay - (now - lastCallTime.current),
      );
    } as T;

    (debounced as unknown as { cancel: () => void }).cancel = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    return debounced as T & { cancel: () => void };
  }, [callback, delay, leading, trailing]);
}

// ==================== 节流处理 ====================

interface ThrottleOptions {
  delay?: number;
  leading?: boolean;
  trailing?: boolean;
}

/** 节流事件处理hook */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  options: ThrottleOptions = {},
): T & { cancel: () => void } {
  const { delay = 300, leading = true, trailing = false } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTime = useRef<number>(0);

  return useMemo(() => {
    const throttled = function (this: unknown, ...args: Parameters<T>) {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime.current;

      const shouldCall = leading && timeSinceLastCall >= delay;

      if (shouldCall) {
        callback.apply(this, args);
        lastCallTime.current = now;
      }

      if (trailing && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          callback.apply(this, args);
          lastCallTime.current = Date.now();
          timeoutRef.current = null;
        }, delay - timeSinceLastCall);
      }
    } as T;

    (throttled as unknown as { cancel: () => void }).cancel = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    return throttled as T & { cancel: () => void };
  }, [callback, delay, leading, trailing]);
}

// ==================== 点击处理 ====================

interface ClickOptions {
  disabled?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  debounceTime?: number;
  throttleTime?: number;
  doubleClickDelay?: number;
}

/** 点击事件处理hook */
export function useClickHandler(onClick?: (event: ITouchEvent) => void, options: ClickOptions = {}) {
  const {
    disabled = false,
    stopPropagation = false,
    preventDefault = false,
    debounceTime = 0,
    throttleTime = 0,
    doubleClickDelay = 300,
  } = options;

  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(
    (event: ITouchEvent) => {
      if (disabled) return;

      if (stopPropagation) {
        event.stopPropagation();
      }

      if (preventDefault) {
        event.preventDefault();
      }

      // 处理双击
      clickCount.current++;
      if (clickCount.current === 2) {
        clickCount.current = 0;
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
          clickTimer.current = null;
        }
        onClick?.(event);
        return;
      }

      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
        onClick?.(event);
        clickTimer.current = null;
      }, doubleClickDelay);
    },
    [disabled, stopPropagation, preventDefault, onClick, doubleClickDelay],
  );

  // 应用防抖或节流
  const finalHandler = useMemo(() => {
    if (debounceTime > 0) {
      return useDebounce<(...args: unknown[]) => unknown>((...args) => handleClick(args[0] as ITouchEvent), {
        delay: debounceTime,
      });
    }
    if (throttleTime > 0) {
      return useThrottle<(...args: unknown[]) => unknown>((...args) => handleClick(args[0] as ITouchEvent), {
        delay: throttleTime,
      });
    }
    return handleClick;
  }, [handleClick, debounceTime, throttleTime]);

  useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  return finalHandler;
}

// ==================== 长按处理 ====================

interface LongPressOptions {
  delay?: number;
  moveThreshold?: number;
  onLongPress?: (event: ITouchEvent) => void;
  onLongPressEnd?: (event: ITouchEvent) => void;
}

/** 长按事件处理hook */
export function useLongPress(options: LongPressOptions = {}) {
  const { delay = 500, moveThreshold = 10, onLongPress, onLongPressEnd } = options;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPressedRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback(
    (event: ITouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startPositionRef.current = { x: touch.clientX, y: touch.clientY };

      timerRef.current = setTimeout(() => {
        isPressedRef.current = true;
        onLongPress?.(event);
      }, delay);
    },
    [delay, onLongPress],
  );

  const handleTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (!timerRef.current) return;

      const touch = event.touches[0];
      if (!touch) return;
      const distance = Math.sqrt(
        Math.pow(touch.clientX - startPositionRef.current.x, 2) +
        Math.pow(touch.clientY - startPositionRef.current.y, 2),
      );

      if (distance > moveThreshold) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    },
    [moveThreshold],
  );

  const handleTouchEnd = useCallback(
    (event: ITouchEvent) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (isPressedRef.current) {
        isPressedRef.current = false;
        onLongPressEnd?.(event);
      }
    },
    [onLongPressEnd],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

// ==================== 拖拽处理 ====================

interface DragOptions {
  onDragStart?: (event: ITouchEvent) => void;
  onDragMove?: (event: ITouchEvent, delta: { x: number; y: number }) => void;
  onDragEnd?: (event: ITouchEvent) => void;
  threshold?: number;
}

/** 拖拽事件处理hook */
export function useDrag(options: DragOptions = {}) {
  const { onDragStart, onDragMove, onDragEnd, threshold = 5 } = options;

  const isDraggingRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback(
    (event: ITouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startPositionRef.current = { x: touch.clientX, y: touch.clientY };
      lastPositionRef.current = { x: touch.clientX, y: touch.clientY };
      onDragStart?.(event);
    },
    [onDragStart],
  );

  const handleTouchMove = useCallback(
    (event: ITouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - lastPositionRef.current.x;
      const deltaY = touch.clientY - lastPositionRef.current.y;

      // 检查是否超过阈值
      if (!isDraggingRef.current) {
        const distance = Math.sqrt(
          Math.pow(touch.clientX - startPositionRef.current.x, 2) +
          Math.pow(touch.clientY - startPositionRef.current.y, 2),
        );

        if (distance >= threshold) {
          isDraggingRef.current = true;
        } else {
          return;
        }
      }

      lastPositionRef.current = { x: touch.clientX, y: touch.clientY };
      onDragMove?.(event, { x: deltaX, y: deltaY });
    },
    [threshold, onDragMove],
  );

  const handleTouchEnd = useCallback(
    (event: ITouchEvent) => {
      isDraggingRef.current = false;
      onDragEnd?.(event);
    },
    [onDragEnd],
  );

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

// ==================== 键盘事件处理 ====================

interface KeyboardOptions {
  key?: string;
  keyCode?: number;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/** 键盘事件处理hook */
export function useKeyboard(onKeyPress?: (event: KeyboardEvent) => void, options: KeyboardOptions = {}) {
  const {
    key,
    keyCode,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
    metaKey = false,
    preventDefault = false,
    stopPropagation = false,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // 检查按键匹配
      if (key && event.key !== key) return;
      if (keyCode && event.keyCode !== keyCode) return;
      if (ctrlKey && !event.ctrlKey) return;
      if (shiftKey && !event.shiftKey) return;
      if (altKey && !event.altKey) return;
      if (metaKey && !event.metaKey) return;

      if (preventDefault) {
        event.preventDefault();
      }

      if (stopPropagation) {
        event.stopPropagation();
      }

      onKeyPress?.(event);
    },
    [key, keyCode, ctrlKey, shiftKey, altKey, metaKey, preventDefault, stopPropagation, onKeyPress],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

// ==================== 事件委托 ====================

interface EventDelegateOptions {
  selector?: string;
  filter?: (element: Element) => boolean;
}

/** 事件委托hook */
export function useEventDelegate<T extends keyof DocumentEventMap>(
  eventType: T,
  handler: (event: DocumentEventMap[T]) => void,
  options: EventDelegateOptions = {},
) {
  const { selector, filter } = options;

  const handleEvent = useCallback(
    (event: DocumentEventMap[T]) => {
      if (selector) {
        const target = event.target as Element;
        const element = target.closest(selector);
        if (element && (!filter || filter(element))) {
          handler(event);
        }
      } else {
        handler(event);
      }
    },
    [selector, filter, handler],
  );

  useEffect(() => {
    document.addEventListener(eventType, handleEvent);
    return () => {
      document.removeEventListener(eventType, handleEvent);
    };
  }, [eventType, handleEvent]);
}
