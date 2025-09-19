/**
 * 性能监控组件
 * 实时显示性能指标和优化建议
 */

import React, { useState, useEffect, useCallback } from 'react';
import { usePerformanceMonitor, PerformanceMetrics } from '@/hooks/usePerformanceMonitor';
import { throttle } from '@/utils/performance';
import { Card, CardProps } from '@/components/display/Card';
import { Button } from '@/components/basic/Button';
import { Text } from '@/components/basic/Text';
import './PerformanceMonitor.styles.scss';

interface PerformanceMonitorProps extends Omit<CardProps, 'title'> {
  // 是否自动启动监控
  autoStart?: boolean;
  // 监控间隔（毫秒）
  interval?: number;
  // 是否显示图表
  showChart?: boolean;
  // 是否显示优化建议
  showRecommendations?: boolean;
  // 性能阈值
  thresholds?: {
    renderTime?: number;
    memoryUsage?: number;
    interactionTime?: number;
  };
}

interface PerformanceData {
  timestamp: number;
  metrics: PerformanceMetrics;
}

interface Recommendation {
  type: 'render' | 'memory' | 'interaction' | 'network';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  solution: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  autoStart = true,
  interval = 5000,
  showChart = true,
  showRecommendations = true,
  thresholds,
  className,
  ...props
}) => {
  const [isMonitoring, setIsMonitoring] = useState(autoStart);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceData[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<keyof PerformanceMetrics>('renderTime');

  const performanceConfig = {
    enableRenderMonitor: true,
    enableMemoryMonitor: true,
    enableInteractionMonitor: true,
    enableNetworkMonitor: false,
    thresholds: {
      renderTime: thresholds?.renderTime || 16,
      memoryUsage: thresholds?.memoryUsage || 50,
      interactionTime: thresholds?.interactionTime || 100,
    },
    onPerformanceWarning: handlePerformanceWarning,
    onCriticalPerformanceIssue: handleCriticalPerformanceIssue,
  };

  const { metrics, startMonitoring, stopMonitoring, resetMetrics, getPerformanceReport } = 
    usePerformanceMonitor(performanceConfig);

  // 性能警告处理
  function handlePerformanceWarning(metrics: PerformanceMetrics) {
    console.warn('Performance warning:', metrics);
    updateRecommendations(metrics);
  }

  // 严重性能问题处理
  function handleCriticalPerformanceIssue(metrics: PerformanceMetrics) {
    console.error('Critical performance issue:', metrics);
    updateRecommendations(metrics);
  }

  // 更新优化建议
  const updateRecommendations = useCallback((metrics: PerformanceMetrics) => {
    const newRecommendations: Recommendation[] = [];

    // 渲染性能建议
    if (metrics.renderTime > (thresholds?.renderTime || 16)) {
      newRecommendations.push({
        type: 'render',
        priority: 'high',
        title: '渲染性能问题',
        description: `渲染时间 ${metrics.renderTime.toFixed(2)}ms 超过阈值`,
        solution: '使用 React.memo、useMemo、useCallback 优化组件渲染'
      });
    }

    // 内存使用建议
    if (metrics.memoryUsage?.percentage && metrics.memoryUsage.percentage > 80) {
      newRecommendations.push({
        type: 'memory',
        priority: 'high',
        title: '内存使用过高',
        description: `内存使用率 ${metrics.memoryUsage.percentage.toFixed(2)}%`,
        solution: '检查内存泄漏，优化大数据处理'
      });
    }

    // 交互性能建议
    if (metrics.interactionTime && metrics.interactionTime > (thresholds?.interactionTime || 100)) {
      newRecommendations.push({
        type: 'interaction',
        priority: 'medium',
        title: '交互响应慢',
        description: `交互时间 ${metrics.interactionTime.toFixed(2)}ms`,
        solution: '使用防抖节流，优化事件处理'
      });
    }

    setRecommendations(newRecommendations);
  }, [thresholds]);

  // 记录性能历史
  const recordPerformanceHistory = useCallback(() => {
    if (!isMonitoring) return;

    const newData: PerformanceData = {
      timestamp: Date.now(),
      metrics: { ...metrics }
    };

    setPerformanceHistory(prev => {
      const updated = [...prev, newData];
      // 保留最近100条记录
      return updated.slice(-100);
    });
  }, [isMonitoring, metrics]);

  // 节流记录历史
  const throttledRecord = throttle(recordPerformanceHistory, 1000);

  // 定时记录性能数据
  useEffect(() => {
    if (!isMonitoring) return;

    const intervalId = setInterval(() => {
      throttledRecord();
    }, interval);

    return () => clearInterval(intervalId);
  }, [isMonitoring, interval, throttledRecord]);

  // 启动/停止监控
  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  }, [isMonitoring, startMonitoring, stopMonitoring]);

  // 格式化性能数据
  const formatMetricValue = (value: number, unit: string = 'ms'): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}s`;
    }
    return `${value.toFixed(2)}${unit}`;
  };

  // 获取性能状态
  const getPerformanceStatus = (type: keyof PerformanceMetrics): 'good' | 'warning' | 'error' => {
    let value: number | undefined;
    let threshold: number | undefined;

    // Handle different metric types properly
    switch (type) {
      case 'renderTime':
      case 'renderCount':
        value = metrics[type] as number;
        threshold = thresholds?.renderTime;
        break;
      case 'interactionTime':
        value = metrics[type] as number;
        threshold = thresholds?.interactionTime;
        break;
      case 'memoryUsage':
        // Handle nested memory usage object
        if (metrics.memoryUsage && typeof metrics.memoryUsage === 'object') {
          value = (metrics.memoryUsage as any).percentage || (metrics.memoryUsage as any).used;
        }
        threshold = thresholds?.memoryUsage;
        break;
      default:
        return 'good';
    }

    if (!threshold || value === undefined) return 'good';
    if (value > threshold * 2) return 'error';
    if (value > threshold) return 'warning';
    return 'good';
  };

  // 获取状态颜色
  const getStatusColor = (status: 'good' | 'warning' | 'error'): string => {
    switch (status) {
      case 'good': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // 生成性能报告
  const handleGenerateReport = () => {
    const report = getPerformanceReport();
    console.log('Performance Report:', report);
    
    // 下载报告
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 重置监控
  const handleReset = () => {
    resetMetrics();
    setPerformanceHistory([]);
    setRecommendations([]);
  };

  // 渲染性能指标卡片
  const renderMetricCard = (title: string, value: number, unit: string, type: keyof PerformanceMetrics) => {
    const status = getPerformanceStatus(type);
    const color = getStatusColor(status);

    return (
      <div className="performance-metric-card">
        <div className="metric-header">
          <Text variant="body2" color="secondary">{title}</Text>
          <div
            className="status-indicator"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="metric-value">
          <Text variant="h4" weight="bold" style={{ color }}>
            {formatMetricValue(value, unit)}
          </Text>
        </div>
      </div>
    );
  };

  // 渲染优化建议
  const renderRecommendations = () => {
    if (!showRecommendations || recommendations.length === 0) return null;

    return (
      <div className="recommendations-section">
        <Text variant="h6" weight="bold" className="section-title">
          优化建议
        </Text>
        <div className="recommendations-list">
          {recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-item priority-${rec.priority}`}>
              <div className="recommendation-header">
                <Text variant="body2" weight="bold">{rec.title}</Text>
                <span className={`priority-badge ${rec.priority}`}>
                  {rec.priority}
                </span>
              </div>
              <Text variant="body" color="secondary" className="recommendation-description">
                {rec.description}
              </Text>
              <Text variant="body" className="recommendation-solution">
                💡 {rec.solution}
              </Text>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card
      title="性能监控"
      className={`performance-monitor ${className || ''}`}
      {...props}
    >
      <div className="monitor-controls">
        <Button
          variant={isMonitoring ? 'solid' : 'solid'}
          size="small"
          onClick={() => setIsMonitoring(!isMonitoring)}
        >
          {isMonitoring ? '停止监控' : '开始监控'}
        </Button>
        <Button variant="outline" size="small" onClick={handleReset}>
          重置
        </Button>
        <Button variant="outline" size="small" onClick={handleGenerateReport}>
          生成报告
        </Button>
      </div>

      <div className="metrics-grid">
        {renderMetricCard('渲染时间', metrics.renderTime, 'ms', 'renderTime')}
        {renderMetricCard('渲染次数', metrics.renderCount, '', 'renderCount')}
        {metrics.memoryUsage && typeof metrics.memoryUsage === 'object' && (
          <>
            {renderMetricCard('内存使用', (metrics.memoryUsage as any).used / 1024 / 1024, 'MB', 'memoryUsage')}
            {renderMetricCard('内存使用率', (metrics.memoryUsage as any).percentage, '%', 'memoryUsage')}
          </>
        )}
        {metrics.interactionTime && (
          <>{renderMetricCard('交互时间', metrics.interactionTime, 'ms', 'interactionTime')}</>
        )}
      </div>

      {showChart && performanceHistory.length > 0 && (
        <div className="chart-section">
          <div className="chart-controls">
            <Text variant="body2" weight="bold">性能趋势</Text>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as keyof PerformanceMetrics)}
              className="metric-selector"
            >
              <option value="renderTime">渲染时间</option>
              <option value="memoryUsage">内存使用</option>
              <option value="interactionTime">交互时间</option>
            </select>
          </div>
          <div className="performance-chart">
            {/* 这里可以集成图表库，如 Chart.js 或 Recharts */}
            <div className="chart-placeholder">
              <Text variant="body2" color="secondary">
                图表区域 - 显示 {selectedMetric} 的历史趋势
              </Text>
            </div>
          </div>
        </div>
      )}

      {renderRecommendations()}
    </Card>
  );
};

export default PerformanceMonitor;