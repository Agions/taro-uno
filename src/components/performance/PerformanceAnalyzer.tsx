/**
 * 性能分析器组件
 * 用于实时监控和分析应用性能
 */

import React, { useEffect, useState, useCallback } from 'react';
import { usePerformanceMonitor, PerformanceMetrics } from '@/hooks/usePerformanceMonitor';
import classNames from 'classnames';

export interface PerformanceAnalyzerProps {
  // 是否启用分析器
  enabled?: boolean;
  // 显示模式
  mode?: 'compact' | 'detailed' | 'minimal';
  // 位置
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  // 刷新间隔（毫秒）
  refreshInterval?: number;
  // 自定义指标
  customMetrics?: Record<string, () => number>;
  // 性能阈值
  thresholds?: {
    renderTime?: number;
    memoryUsage?: number;
    interactionTime?: number;
  };
  // 回调函数
  onPerformanceWarning?: (metrics: PerformanceMetrics) => void;
  onCriticalPerformanceIssue?: (metrics: PerformanceMetrics) => void;
  className?: string;
}

export interface PerformanceData {
  metrics: PerformanceMetrics;
  timestamp: number;
  warnings: string[];
  criticalIssues: string[];
  recommendations: string[];
}

const defaultThresholds = {
  renderTime: 16, // 60fps
  memoryUsage: 50 * 1024 * 1024, // 50MB
  interactionTime: 100, // 100ms
};

const PerformanceAnalyzer: React.FC<PerformanceAnalyzerProps> = ({
  enabled = true,
  mode = 'compact',
  position = 'top-right',
  refreshInterval = 1000,
  customMetrics = {},
  thresholds = defaultThresholds,
  onPerformanceWarning,
  onCriticalPerformanceIssue,
  className,
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [history, setHistory] = useState<PerformanceData[]>([]);

  const { metrics, recordCustomMetric /*, getPerformanceReport */ } = usePerformanceMonitor({
    enableRenderMonitor: true,
    enableMemoryMonitor: true,
    enableNetworkMonitor: true,
    enableInteractionMonitor: true,
    thresholds,
    onPerformanceWarning,
    onCriticalPerformanceIssue,
  });

  // 分析性能数据
  const analyzePerformance = useCallback(() => {
    const warnings: string[] = [];
    const criticalIssues: string[] = [];
    const recommendations: string[] = [];

    // 分析渲染性能
    if (metrics.renderTime > thresholds.renderTime!) {
      warnings.push(`渲染时间过长: ${metrics.renderTime.toFixed(2)}ms`);
      recommendations.push('考虑使用 React.memo、useMemo 优化组件渲染');
    }

    if (metrics.renderTime > 100) {
      criticalIssues.push(`严重渲染性能问题: ${metrics.renderTime.toFixed(2)}ms`);
      recommendations.push('立即优化渲染性能，检查是否有长时间运行的同步操作');
    }

    // 分析内存使用
    if (metrics.memoryUsage?.used && metrics.memoryUsage.used > thresholds.memoryUsage!) {
      warnings.push(`内存使用过高: ${(metrics.memoryUsage.used / 1024 / 1024).toFixed(2)}MB`);
      recommendations.push('检查内存泄漏，优化大数据处理');
    }

    if (metrics.memoryUsage?.percentage && metrics.memoryUsage.percentage > 90) {
      criticalIssues.push(`严重内存问题: 使用率 ${metrics.memoryUsage.percentage.toFixed(2)}%`);
      recommendations.push('立即清理内存，避免内存泄漏');
    }

    // 分析交互性能
    if (metrics.interactionTime && metrics.interactionTime > thresholds.interactionTime!) {
      warnings.push(`交互响应时间过长: ${metrics.interactionTime.toFixed(2)}ms`);
      recommendations.push('优化事件处理，使用防抖节流');
    }

    // 分析渲染频率
    if (metrics.renderCount > 60) {
      warnings.push(`渲染次数过多: ${metrics.renderCount}`);
      recommendations.push('检查是否有不必要的重新渲染');
    }

    // 收集自定义指标
    Object.entries(customMetrics).forEach(([name, getter]) => {
      try {
        const value = getter();
        recordCustomMetric(name, value);
      } catch (error) {
        console.warn(`获取自定义指标 ${name} 失败:`, error);
      }
    });

    const data: PerformanceData = {
      metrics,
      timestamp: Date.now(),
      warnings,
      criticalIssues,
      recommendations,
    };

    setPerformanceData(data);
    setHistory((prev) => [...prev.slice(-19), data]); // 保留最近20条记录

    return data;
  }, [metrics, thresholds, customMetrics, recordCustomMetric]);

  // 定时更新性能数据
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      analyzePerformance();
    }, refreshInterval);

    // 立即执行一次
    analyzePerformance();

    return () => clearInterval(interval);
  }, [enabled, refreshInterval, analyzePerformance]);

  // 切换显示状态
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // 格式化数值
  // const formatValue = (value: number, unit: string) => {
  //   if (unit === 'bytes') {
  //     return (value / 1024 / 1024).toFixed(2) + 'MB';
  //   }
  //   if (unit === 'ms') {
  //     return value.toFixed(2) + 'ms';
  //   }
  //   return value.toString();
  // }; // Commented out - unused

  // 获取性能等级
  const getPerformanceLevel = () => {
    if (!performanceData) return 'unknown';

    const { warnings, criticalIssues } = performanceData;
    if (criticalIssues.length > 0) return 'critical';
    if (warnings.length > 0) return 'warning';
    return 'good';
  };

  // 渲染紧凑模式
  const renderCompact = () => {
    if (!performanceData) return null;

    const level = getPerformanceLevel();
    const levelColors = {
      good: 'text-green-500',
      warning: 'text-yellow-500',
      critical: 'text-red-500',
      unknown: 'text-gray-500',
    };

    return (
      <div className={classNames('performance-analyzer-compact', levelColors[level])}>
        <div className="performance-indicator" onClick={toggleVisibility}>
          <div className="performance-dot"></div>
          <span className="performance-text">{metrics.renderTime.toFixed(0)}ms</span>
        </div>
      </div>
    );
  };

  // 渲染详细模式
  const renderDetailed = () => {
    if (!performanceData) return null;

    const level = getPerformanceLevel();
    const levelColors = {
      good: 'bg-green-100 border-green-300',
      warning: 'bg-yellow-100 border-yellow-300',
      critical: 'bg-red-100 border-red-300',
      unknown: 'bg-gray-100 border-gray-300',
    };

    return (
      <div className={classNames('performance-analyzer-detailed', levelColors[level])}>
        <div className="performance-header" onClick={toggleVisibility}>
          <h3>性能分析器</h3>
          <span className="performance-level">{level}</span>
        </div>

        <div className="performance-metrics">
          <div className="metric-item">
            <span className="metric-label">渲染时间:</span>
            <span className="metric-value">{metrics.renderTime.toFixed(2)}ms</span>
          </div>

          <div className="metric-item">
            <span className="metric-label">渲染次数:</span>
            <span className="metric-value">{metrics.renderCount}</span>
          </div>

          {metrics.memoryUsage && (
            <div className="metric-item">
              <span className="metric-label">内存使用:</span>
              <span className="metric-value">{(metrics.memoryUsage.used / 1024 / 1024).toFixed(2)}MB</span>
            </div>
          )}

          {metrics.interactionTime && (
            <div className="metric-item">
              <span className="metric-label">交互时间:</span>
              <span className="metric-value">{metrics.interactionTime.toFixed(2)}ms</span>
            </div>
          )}
        </div>

        {performanceData.warnings.length > 0 && (
          <div className="performance-warnings">
            <h4>警告</h4>
            <ul>
              {performanceData.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {performanceData.criticalIssues.length > 0 && (
          <div className="performance-critical">
            <h4>严重问题</h4>
            <ul>
              {performanceData.criticalIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {performanceData.recommendations.length > 0 && (
          <div className="performance-recommendations">
            <h4>优化建议</h4>
            <ul>
              {performanceData.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // 渲染最小模式
  const renderMinimal = () => {
    if (!performanceData) return null;

    const level = getPerformanceLevel();
    const levelColors = {
      good: 'bg-green-500',
      warning: 'bg-yellow-500',
      critical: 'bg-red-500',
      unknown: 'bg-gray-500',
    };

    return (
      <div
        className={classNames('performance-analyzer-minimal', levelColors[level])}
        onClick={toggleVisibility}
        title={`性能等级: ${level}`}
      >
        <div className="performance-dot"></div>
      </div>
    );
  };

  // 渲染历史图表
  const renderHistoryChart = () => {
    if (history.length < 2) return null;

    const maxRenderTime = Math.max(...history.map((h) => h.metrics.renderTime));
    const chartHeight = 100;
    const chartWidth = 200;

    return (
      <div className="performance-history-chart">
        <h4>渲染时间历史</h4>
        <svg width={chartWidth} height={chartHeight}>
          {history.map((data, index) => {
            const x = (index / (history.length - 1)) * chartWidth;
            const y = chartHeight - (data.metrics.renderTime / maxRenderTime) * chartHeight;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={2}
                fill={data.metrics.renderTime > thresholds.renderTime! ? '#ef4444' : '#10b981'}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  if (!enabled) return null;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={classNames('performance-analyzer', positionClasses[position], className)}>
      {isVisible ? (
        <div className="performance-panel">
          {mode === 'compact' && renderCompact()}
          {mode === 'detailed' && renderDetailed()}
          {mode === 'minimal' && renderMinimal()}

          {mode === 'detailed' && renderHistoryChart()}

          <div className="performance-controls">
            <button onClick={() => setHistory([])}>清除历史</button>
            <button onClick={toggleVisibility}>隐藏</button>
          </div>
        </div>
      ) : (
        <div className="performance-toggle" onClick={toggleVisibility}>
          {mode === 'compact' && renderCompact()}
          {mode === 'minimal' && renderMinimal()}
          {mode === 'detailed' && <button className="performance-show-btn">显示分析器</button>}
        </div>
      )}
    </div>
  );
};

export default PerformanceAnalyzer;
