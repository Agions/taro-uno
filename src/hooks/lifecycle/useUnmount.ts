/**
 * useUnmount Hook
 * 组件卸载生命周期 Hook，在组件卸载时执行回调
 *
 * @example
 * ```typescript
 * useUnmount(() => {
 *   console.log('组件即将卸载');
 *   // 清理逻辑
 * });
 * ```
 */

import { useEffect, useRef } from 'react';

/**
 * 卸载回调类型
 */
export type UnmountCallback = () => void;

/**
 * 组件卸载 Hook
 *
 * 在组件卸载时执行回调函数，用于清理副作用
 *
 * @param callback 卸载时执行的回调函数
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [timer, setTimer] = useState<number | null>(null);
 *
 *   useMount(() => {
 *     const id = setInterval(() => {
 *       console.log('tick');
 *     }, 1000);
 *     setTimer(id);
 *   });
 *
 *   useUnmount(() => {
 *     // 清理定时器
 *     if (timer) {
 *       clearInterval(timer);
 *     }
 *     console.log('组件已卸载，定时器已清理');
 *   });
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useUnmount(callback: UnmountCallback): void {
  // 使用 ref 存储回调，确保始终使用最新的回调
  const callbackRef = useRef<UnmountCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, []);
}

/**
 * 组件卸载时执行清理函数
 *
 * @param cleanup 清理函数
 *
 * @example
 * ```tsx
 * function WebSocketComponent() {
 *   const wsRef = useRef<WebSocket | null>(null);
 *
 *   useMount(() => {
 *     wsRef.current = new WebSocket('ws://example.com');
 *   });
 *
 *   useCleanup(() => {
 *     wsRef.current?.close();
 *   });
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useCleanup(cleanup: UnmountCallback): void {
  useUnmount(cleanup);
}

/**
 * 带条件的卸载 Hook
 *
 * @param callback 卸载时执行的回调函数
 * @param condition 是否启用卸载回调
 *
 * @example
 * ```tsx
 * function ConditionalCleanup({ shouldCleanup }) {
 *   useConditionalUnmount(
 *     () => {
 *       console.log('执行清理');
 *     },
 *     shouldCleanup
 *   );
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useConditionalUnmount(
  callback: UnmountCallback,
  condition: boolean,
): void {
  const callbackRef = useRef<UnmountCallback>(callback);
  const conditionRef = useRef<boolean>(condition);

  callbackRef.current = callback;
  conditionRef.current = condition;

  useEffect(() => {
    return () => {
      if (conditionRef.current) {
        callbackRef.current();
      }
    };
  }, []);
}

export default useUnmount;
