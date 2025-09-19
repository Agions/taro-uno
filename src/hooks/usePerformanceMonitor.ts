/**
 * 性能监控 Hook
 * 用于监控组件性能指标
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export interface PerformanceMetrics {
  // 渲染性能
  renderTime: number;
  renderCount: number;
  lastRenderTime: number;

  // 内存性能
  memoryUsage?: {
    used: number;
    total: number;
    percentage: number;
  };

  // 网络性能
  loadTime?: number;
  resourceLoadTimes?: Array<{
    name: string;
    duration: number;
    size?: number;
  }>;

  // 用户交互性能
  interactionTime?: number;
  firstInputDelay?: number;

  // 自定义指标
  customMetrics?: Record<string, number>;
}

export interface PerformanceMonitorOptions {
  // 监控选项
  enableRenderMonitor?: boolean;
  enableMemoryMonitor?: boolean;
  enableNetworkMonitor?: boolean;
  enableInteractionMonitor?: boolean;

  // 性能阈值
  thresholds?: {
    renderTime?: number;
    memoryUsage?: number;
    interactionTime?: number;
  };

  // 回调函数
  onPerformanceWarning?: (metrics: PerformanceMetrics) => void;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void;
  onCriticalPerformanceIssue?: (metrics: PerformanceMetrics) => void;
}

const defaultOptions: PerformanceMonitorOptions = {
  enableRenderMonitor: true,
  enableMemoryMonitor: true,
  enableNetworkMonitor: false,
  enableInteractionMonitor: false,
  thresholds: {
    renderTime: 16, // 60fps
    memoryUsage: 50, // 50MB
    interactionTime: 100, // 100ms
  },
};

/**
 * 性能监控 Hook
 * @param options 监控选项
 * @returns 性能指标和控制函数
 */
export function usePerformanceMonitor(options: PerformanceMonitorOptions = {}) {
  const config = { ...defaultOptions, ...options };
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    renderCount: 0,
    lastRenderTime: 0,
  });

  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);
  const observerRef = useRef<PerformanceObserver | null>(null);
  const customMetricsRef = useRef<Record<string, number>>({});

  // 监控渲染性能
  const monitorRenderPerformance = useCallback(() => {
    if (!config.enableRenderMonitor) return;

    renderStartTime.current = performance.now();
    renderCount.current++;
  }, [config.enableRenderMonitor]);

  // 完成渲染监控
  const completeRenderMonitoring = useCallback(() => {
    if (!config.enableRenderMonitor) return;

    const renderTime = performance.now() - renderStartTime.current;
    const lastRenderTime = Date.now();

    setMetrics((prev) => ({
      ...prev,
      renderTime,
      renderCount: renderCount.current,
      lastRenderTime,
    }));

    // 检查渲染性能
    if (config.thresholds?.renderTime && renderTime > config.thresholds.renderTime) {
      console.warn(`渲染性能警告: 渲染时间 ${renderTime.toFixed(2)}ms 超过阈值 ${config.thresholds.renderTime}ms`);
      config.onPerformanceWarning?.({
        ...metrics,
        renderTime,
        renderCount: renderCount.current,
        lastRenderTime,
      });
    }

    // 严重性能问题
    if (renderTime > 100) {
      // 超过100ms认为是严重问题
      config.onCriticalPerformanceIssue?.({
        ...metrics,
        renderTime,
        renderCount: renderCount.current,
        lastRenderTime,
      });
    }

    config.onPerformanceUpdate?.({
      ...metrics,
      renderTime,
      renderCount: renderCount.current,
      lastRenderTime,
    });
  }, [config, metrics]);

  // 监控内存使用
  const monitorMemoryUsage = useCallback(() => {
    if (!config.enableMemoryMonitor || !('memory' in performance)) return;

    try {
      const memory = (performance as any).memory;
      const memoryUsage = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };

      setMetrics((prev) => ({
        ...prev,
        memoryUsage,
      }));

      // 检查内存使用
      if (config.thresholds?.memoryUsage && memoryUsage.used > config.thresholds.memoryUsage * 1024 * 1024) {
        console.warn(`内存使用警告: ${memoryUsage.used / 1024 / 1024}MB 超过阈值 ${config.thresholds.memoryUsage}MB`);
        config.onPerformanceWarning?.({
          ...metrics,
          memoryUsage,
        });
      }
    } catch (error) {
      console.warn('内存监控不可用:', error);
    }
  }, [config, metrics]);

  // 监控网络性能
  const monitorNetworkPerformance = useCallback(() => {
    if (!config.enableNetworkMonitor || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const resourceLoadTimes = entries.map((entry) => ({
          name: entry.name,
          duration: entry.duration,
          size: (entry as any).transferSize,
        }));

        setMetrics((prev) => ({
          ...prev,
          resourceLoadTimes,
        }));
      });

      observer.observe({ entryTypes: ['resource'] });
      observerRef.current = observer;
    } catch (error) {
      console.warn('网络监控不可用:', error);
    }
  }, [config.enableNetworkMonitor]);

  // 监控用户交互性能
  const monitorInteractionPerformance = useCallback(() => {
    if (!config.enableInteractionMonitor || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-input') {
            const firstInputDelay = (entry as any).processingStart - entry.startTime;

            setMetrics((prev) => ({
              ...prev,
              interactionTime: entry.duration,
              firstInputDelay,
            }));

            // 检查交互性能
            if (config.thresholds?.interactionTime && entry.duration > config.thresholds.interactionTime) {
              console.warn(
                `交互性能警告: ${entry.duration.toFixed(2)}ms 超过阈值 ${config.thresholds.interactionTime}ms`,
              );
              config.onPerformanceWarning?.({
                ...metrics,
                interactionTime: entry.duration,
                firstInputDelay,
              });
            }
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      observerRef.current = observer;
    } catch (error) {
      console.warn('交互监控不可用:', error);
    }
  }, [config, metrics]);

  // 记录自定义指标
  const recordCustomMetric = useCallback((name: string, value: number) => {
    customMetricsRef.current[name] = value;
    setMetrics((prev) => ({
      ...prev,
      customMetrics: { ...customMetricsRef.current },
    }));
  }, []);

  // 开始性能监控
  const startMonitoring = useCallback(() => {
    if (config.enableMemoryMonitor) {
      const memoryInterval = setInterval(monitorMemoryUsage, 5000);
      return () => clearInterval(memoryInterval);
    }
    return () => {};
  }, [config, monitorMemoryUsage]);

  // 停止性能监控
  const stopMonitoring = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  // 重置指标
  const resetMetrics = useCallback(() => {
    setMetrics({
      renderTime: 0,
      renderCount: 0,
      lastRenderTime: 0,
    });
    customMetricsRef.current = {};
    renderCount.current = 0;
  }, []);

  // 获取性能报告
  const getPerformanceReport = useCallback(() => {
    return {
      timestamp: new Date().toISOString(),
      metrics,
      summary: {
        renderPerformance: metrics.renderTime > (config.thresholds?.renderTime || 16) ? 'poor' : 'good',
        memoryUsage: metrics.memoryUsage?.percentage
          ? metrics.memoryUsage.percentage > 80
            ? 'high'
            : 'normal'
          : 'unknown',
        interactionPerformance: metrics.interactionTime
          ? metrics.interactionTime > (config.thresholds?.interactionTime || 100)
            ? 'poor'
            : 'good'
          : 'unknown',
      },
      recommendations: generateRecommendations(metrics, config.thresholds),
    };
  }, [metrics, config.thresholds]);

  // 生成优化建议
  const generateRecommendations = (metrics: PerformanceMetrics, thresholds?: any) => {
    const recommendations = [];

    if (metrics.renderTime > (thresholds?.renderTime || 16)) {
      recommendations.push({
        type: 'render',
        issue: '渲染时间过长',
        suggestion: '考虑使用 React.memo、useMemo、useCallback 优化组件渲染',
      });
    }

    if (metrics.memoryUsage?.percentage && metrics.memoryUsage.percentage > 80) {
      recommendations.push({
        type: 'memory',
        issue: '内存使用率过高',
        suggestion: '检查内存泄漏，优化大数据处理，及时清理不再需要的数据',
      });
    }

    if (metrics.interactionTime && metrics.interactionTime > (thresholds?.interactionTime || 100)) {
      recommendations.push({
        type: 'interaction',
        issue: '交互响应时间过长',
        suggestion: '优化事件处理函数，使用防抖节流，避免长时间运行的任务',
      });
    }

    return recommendations;
  };

  // 初始化监控
  useEffect(() => {
    const cleanup = startMonitoring();
    monitorNetworkPerformance();
    monitorInteractionPerformance();

    return () => {
      cleanup?.();
      stopMonitoring();
    };
  }, [startMonitoring, monitorNetworkPerformance, monitorInteractionPerformance, stopMonitoring]);

  return {
    metrics,
    monitorRenderPerformance,
    completeRenderMonitoring,
    recordCustomMetric,
    startMonitoring,
    stopMonitoring,
    resetMetrics,
    getPerformanceReport,
  };
}

export default usePerformanceMonitor;
