/**
 * 懒加载组件
 * 用于实现组件的按需加载，提高初始加载性能
 */

import React, { Suspense, ComponentType, LazyExoticComponent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export interface LazyComponentProps {
  // 组件加载器
  loader: () => Promise<{ default: ComponentType<any> }>;
  // 加载状态显示
  fallback?: React.ReactNode;
  // 错误状态显示
  errorFallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  // 加载延迟（毫秒）
  delay?: number;
  // 预加载
  preload?: boolean;
  // 组件属性
  [key: string]: any;
}

export interface LazyComponentConfig {
  // 距离可视区域多少像素开始加载
  rootMargin?: string;
  // 触发阈值
  threshold?: number;
  // 最大重试次数
  maxRetries?: number;
  // 重试延迟
  retryDelay?: number;
  // 启用性能监控
  enablePerformanceMonitor?: boolean;
}

const defaultConfig: Required<LazyComponentConfig> = {
  rootMargin: '200px',
  threshold: 0.1,
  maxRetries: 3,
  retryDelay: 1000,
  enablePerformanceMonitor: true,
};

/**
 * 性能优化的懒加载组件
 */
const LazyComponent: React.FC<LazyComponentProps> = ({
  loader,
  fallback = <div className="lazy-loading">加载中...</div>,
  errorFallback = <div className="lazy-error">加载失败</div>,
  delay = 0,
  preload = false,
  ...props
}) => {
  const [Component, setComponent] = useState<LazyExoticComponent<ComponentType<any>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(preload);

  const { recordCustomMetric } = usePerformanceMonitor({
    enableRenderMonitor: defaultConfig.enablePerformanceMonitor,
    enableMemoryMonitor: defaultConfig.enablePerformanceMonitor,
  });

  const { ref, inView, entry } = useInView({
    rootMargin: defaultConfig.rootMargin,
    threshold: defaultConfig.threshold,
    triggerOnce: true,
  });

  // 加载组件
  const loadComponent = async () => {
    const loadStartTime = performance.now();

    try {
      recordCustomMetric('lazyLoadStart', Date.now());

      const loadedModule = await loader();
      const LazyLoadedComponent = React.lazy(() => loader());

      setComponent(LazyLoadedComponent);
      setError(null);

      const loadTime = performance.now() - loadStartTime;
      recordCustomMetric('lazyLoadTime', loadTime);
      recordCustomMetric('lazyLoadSuccess', 1);
    } catch (err) {
      console.error('懒加载组件失败:', err);
      setError(err as Error);
      recordCustomMetric('lazyLoadError', 1);

      // 重试逻辑
      if (retryCount < defaultConfig.maxRetries) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          loadComponent();
        }, defaultConfig.retryDelay);
      }
    }
  };

  // 处理可视区域变化
  useEffect(() => {
    if (inView && !Component && !error) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldLoad(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShouldLoad(true);
      }
    }
  }, [inView, Component, error, delay]);

  // 执行加载
  useEffect(() => {
    if (shouldLoad && !Component && !error) {
      loadComponent();
    }
  }, [shouldLoad, Component, error]);

  // 预加载处理
  useEffect(() => {
    if (preload && !Component && !error) {
      // 立即预加载
      loader().catch(() => {
        // 预加载失败不影响主流程
      });
    }
  }, [preload, loader, Component, error]);

  // 渲染组件
  const renderComponent = () => {
    if (error) {
      if (typeof errorFallback === 'function') {
        return errorFallback(error);
      }
      return errorFallback;
    }

    if (!Component) {
      return fallback;
    }

    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  return (
    <div ref={ref} className="lazy-component">
      {renderComponent}
    </div>
  );
};

export default LazyComponent;

/**
 * 创建懒加载组件的高阶函数
 */
export function createLazyComponent<P>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  config: LazyComponentConfig = {},
) {
  return React.forwardRef<any, P & LazyComponentProps>((props, ref) => {
    return <LazyComponent loader={loader} {...config} {...props} ref={ref} />;
  });
}

/**
 * 懒加载组件集合
 */
export const LazyComponents = {
  // 创建懒加载组件的工厂函数
  create: createLazyComponent,

  // 预加载工具
  preload: async (loader: () => Promise<{ default: ComponentType<any> }>) => {
    try {
      await loader();
      return true;
    } catch (error) {
      console.error('预加载失败:', error);
      return false;
    }
  },

  // 批量预加载
  preloadBatch: async (loaders: Array<() => Promise<{ default: ComponentType<any> }>>) => {
    const results = await Promise.allSettled(loaders.map((loader) => LazyComponents.preload(loader)));

    return {
      success: results.filter((r) => r.status === 'fulfilled' && r.value).length,
      failed: results.filter((r) => r.status === 'rejected').length,
      total: loaders.length,
    };
  },
};

export default LazyComponent;
