/**
 * useMount Hook
 * 组件挂载生命周期 Hook，在组件挂载时执行回调
 *
 * @example
 * ```typescript
 * useMount(() => {
 *   console.log('组件已挂载');
 *   // 初始化逻辑
 * });
 *
 * // 支持异步回调
 * useMount(async () => {
 *   const data = await fetchData();
 *   setData(data);
 * });
 * ```
 */

import { useEffect, useRef } from 'react';

/**
 * 挂载回调类型
 */
export type MountCallback = () => void | Promise<void>;

/**
 * 组件挂载 Hook
 *
 * 在组件首次挂载时执行回调函数，仅执行一次
 *
 * @param callback 挂载时执行的回调函数
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [data, setData] = useState(null);
 *
 *   useMount(() => {
 *     console.log('组件已挂载');
 *     // 执行初始化逻辑
 *   });
 *
 *   useMount(async () => {
 *     // 支持异步操作
 *     const result = await fetchInitialData();
 *     setData(result);
 *   });
 *
 *   return <View>{data}</View>;
 * }
 * ```
 */
export function useMount(callback: MountCallback): void {
  // 使用 ref 存储回调，避免闭包问题
  const callbackRef = useRef<MountCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    callbackRef.current();

  }, []);
}

/**
 * 检查组件是否已挂载
 *
 * @returns 是否已挂载
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useMounted();
 *
 *   useEffect(() => {
 *     fetchData().then((data) => {
 *       // 只有在组件仍然挂载时才更新状态
 *       if (isMounted()) {
 *         setData(data);
 *       }
 *     });
 *   }, []);
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useMounted(): () => boolean {
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return () => mountedRef.current;
}

/**
 * 组件挂载状态 Hook
 *
 * @returns 是否已挂载
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useIsMounted();
 *
 *   return (
 *     <View>
 *       {isMounted ? '已挂载' : '未挂载'}
 *     </View>
 *   );
 * }
 * ```
 */
export function useIsMounted(): boolean {
  const isMounted = useMounted();
  return isMounted();
}

export default useMount;
