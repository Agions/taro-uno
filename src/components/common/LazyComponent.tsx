/**
 * 懒加载组件
 * 提供组件级别的懒加载和代码分割
 */

import React, { Suspense, ComponentType, LazyExoticComponent, ReactNode } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { ErrorBoundary } from './ErrorBoundary';
import { Loading } from '../feedback/Loading';

export interface LazyComponentProps {
  /**
   * 懒加载的组件
   */
  component: LazyExoticComponent<ComponentType<any>> | (() => Promise<ComponentType<any>>);

  /**
   * 组件属性
   */
  props?: Record<string, any>;

  /**
   * 加载状态显示
   */
  fallback?: ReactNode;

  /**
   * 错误状态显示
   */
  errorFallback?: ReactNode;

  /**
   * 预加载延迟（毫秒）
   */
  preloadDelay?: number;

  /**
   * 是否预加载
   */
  preload?: boolean;

  /**
   * 加载超时时间（毫秒）
   */
  timeout?: number;
}

export interface LazyComponentOptions {
  /**
   * 加载策略
   */
  strategy?: 'eager' | 'lazy' | 'prefetch';

  /**
   * 错误重试次数
   */
  retryCount?: number;

  /**
   * 重试延迟（毫秒）
   */
  retryDelay?: number;

  /**
   * 缓存配置
   */
  cache?: boolean;
}

// 组件缓存
const componentCache = new Map<string, ComponentType<any>>();

// 默认加载组件
const DefaultFallback = () => (
  <View className="flex items-center justify-center p-4">
    <Loading type="spinner" size="lg" />
  </View>
);

// 默认错误组件
const DefaultErrorFallback = ({ error, reset }: { error: Error; reset: () => void }) => (
  <View className="flex flex-col items-center justify-center p-4 text-center">
    <Text className="text-red-500 mb-2">组件加载失败</Text>
    <Text className="text-sm text-gray-600 mb-4">{error.message}</Text>
    <Button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      重试
    </Button>
  </View>
);

/**
 * 创建懒加载组件
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {},
): LazyExoticComponent<T> {
  const { strategy = 'lazy', retryCount = 3, retryDelay = 1000, cache = true } = options;

  const cacheKey = JSON.stringify(importFn.toString());

  const loadComponent = async (): Promise<{ default: T }> => {
    // 检查缓存
    if (cache && componentCache.has(cacheKey)) {
      return Promise.resolve({ default: componentCache.get(cacheKey)! as T });
    }

    let lastError: Error | null = null;
    let attempts = 0;

    while (attempts < retryCount) {
      try {
        const module = await importFn();

        // 缓存组件
        if (cache) {
          componentCache.set(cacheKey, module.default as T);
        }

        return { default: module.default as T };
      } catch (error) {
        lastError = error as Error;
        attempts++;

        if (attempts < retryCount) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }

    throw lastError || new Error('Component loading failed');
  };

  const lazyComp = React.lazy(loadComponent);

  // 预加载
  if (strategy === 'eager') {
    loadComponent();
  } else if (strategy === 'prefetch') {
    setTimeout(() => {
      loadComponent().catch(() => {
        // 预加载失败不抛出错误
      });
    }, 0);
  }

  return lazyComp as LazyExoticComponent<T>;
}

/**
 * 懒加载组件包装器
 */
export const LazyComponent: React.FC<LazyComponentProps> = ({
  component,
  props = {},
  fallback = <DefaultFallback />,
  errorFallback,
  preloadDelay = 0,
  preload = false,
}) => {
  const [error, setError] = React.useState<Error | null>(null);

  // 预加载逻辑
  React.useEffect(() => {
    if (preload && preloadDelay > 0) {
      const timer = setTimeout(() => {
        if (typeof component === 'function') {
          const loadFn = component as () => Promise<ComponentType<any>>;
          loadFn().catch((err: Error) => {
            console.error('Preload failed:', err);
            // 预加载失败不抛出错误
          });
        }
      }, preloadDelay);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [preload, preloadDelay, component]);

  const handleError = React.useCallback((err: Error) => {
    setError(err);
  }, []);

  const handleReset = React.useCallback(() => {
    setError(null);
  }, []);

  if (error) {
    if (errorFallback) {
      return <>{errorFallback}</>;
    }
    return <DefaultErrorFallback error={error} reset={handleReset} />;
  }

  const ActualComponent = typeof component === 'function' ? React.lazy(component as any) : component;

  return (
    <ErrorBoundary onError={handleError}>
      <Suspense fallback={fallback}>
        <ActualComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

/**
 * 路由级别的懒加载
 */
export function createLazyRoute<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {},
) {
  return createLazyComponent(importFn, {
    ...options,
    strategy: 'lazy',
  });
}

/**
 * 批量懒加载组件
 */
export function createLazyComponents(
  components: Record<string, () => Promise<{ default: ComponentType<any> }>>,
  options: LazyComponentOptions = {},
): Record<string, LazyExoticComponent<ComponentType<any>>> {
  const result: Record<string, LazyExoticComponent<ComponentType<any>>> = {};

  Object.entries(components).forEach(([key, importFn]) => {
    result[key] = createLazyComponent(importFn as any, options);
  });

  return result;
}

// 预加载工具
export const preloadComponent = () => {
  // 触发组件预加载（React.lazy 无公开 preload，使用空实现避免错误）
  // 可选：如果需要实际预加载，可在创建时手动调用 loadComponent
};

// 清理缓存
export const clearComponentCache = () => {
  componentCache.clear();
};

export default LazyComponent;
