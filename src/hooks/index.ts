/**
 * 自定义Hooks统一导出文件
 * 提供所有自定义hooks的统一访问入口
 */

import { useState, useEffect, useCallback, useRef } from 'react';
export * from './useAsync';

// ==================== 通用Hook工具类型 ====================

/** Hook返回值的通用类型 */
export type HookResult<T> = [T, (value: T) => void];

/** 异步Hook返回值类型 */
export type AsyncHookResult<T, E = Error> = {
  data: T | null;
  loading: boolean;
  error: E | null;
  execute: () => Promise<void>;
  reset: () => void;
};

/** 事件处理Hook返回值类型 */
export type EventHandlerResult = {
  handler: (event: unknown) => void;
  cancel: () => void;
};

// ==================== 便捷Hook ====================

/** 获取最新状态值的Hook */
export function useLatestState<T>(initialValue: T): [T, (value: T) => void, T] {
  const [state, setState] = useState<T>(initialValue);
  const latestRef = useRef<T>(state);

  const setLatestState = useCallback((value: T) => {
    latestRef.current = value;
    setState(value);
  }, []);

  return [state, setLatestState, latestRef.current];
}

/** 条件执行的Hook */
export function useConditionalEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
  condition: (deps: React.DependencyList) => boolean
) {
  return useEffect(() => {
    if (condition(deps)) {
      return effect();
    }
  }, deps);
}

// ==================== Hook验证工具 ====================

/** Hook依赖验证 */
export function useHookDepsValidator(
  hookName: string,
  deps: React.DependencyList,
  validator: (deps: React.DependencyList) => boolean
): void {
  useEffect(() => {
    if (!validator(deps)) {
      console.warn(`[${hookName}] Invalid dependencies detected`, deps);
    }
  }, deps);
}

/** Hook性能监控 */
export function useHookPerformance(hookName: string): void {
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const endTime = Date.now();
    const duration = endTime - startTime.current;

    if (duration > 16) { // 超过一帧的时间
      console.warn(`[${hookName}] Hook execution took ${duration}ms`);
    }

    startTime.current = Date.now();
  });
}

// ==================== Hook组合模式 ====================

/** 组合多个Hook的返回值 */
export function useCombinedHooks<T extends Record<string, unknown>>(
  hooks: { [K in keyof T]: () => T[K] }
): T {
  const result = {} as T;

  for (const key in hooks) {
    result[key] = hooks[key]();
  }

  return result;
}

/** 条件Hook执行 */
export function useConditionalHook<T>(
  condition: boolean,
  hook: () => T,
  fallback?: () => T
): T | undefined {
  return condition ? hook() : fallback?.();
}
