import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';

/** LazyComponent 组件 Props */
export interface LazyComponentProps {
  /** 懒加载的组件 */
  component: LazyExoticComponent<ComponentType<unknown>> | (() => Promise<ComponentType<unknown>>);
  /** 组件属性 */
  props?: Record<string, unknown>;
  /** 加载状态显示 */
  fallback?: ReactNode;
  /** 错误状态显示 */
  errorFallback?: ReactNode;
  /** 预加载延迟（毫秒） */
  preloadDelay?: number;
  /** 是否预加载 */
  preload?: boolean;
  /** 加载超时时间（毫秒） */
  timeout?: number;
}

/** LazyComponent 配置选项 */
export interface LazyComponentOptions {
  /** 加载策略 */
  strategy?: 'eager' | 'lazy' | 'prefetch';
  /** 错误重试次数 */
  retryCount?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 缓存配置 */
  cache?: boolean;
}
