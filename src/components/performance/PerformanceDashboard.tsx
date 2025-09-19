/**
 * Performance Dashboard Component
 * Real-time performance monitoring and analytics dashboard
 */

import React, { useState, useEffect, useMemo } from 'react';
import { usePerformanceMonitor, PerformanceMetrics } from '@/hooks/usePerformanceMonitor';
import { PerformanceAnalyzer } from './PerformanceAnalyzer';
import classNames from 'classnames';

interface PerformanceDashboardProps {
  // Dashboard configuration
  refreshInterval?: number;
  maxDataPoints?: number;
  enableRealtimeMonitoring?: boolean;
  // Display options
  showCharts?: boolean;
  showMetrics?: boolean;
  showRecommendations?: boolean;
  // Performance thresholds
  thresholds?: {
    renderTime?: number;
    memoryUsage?: number;
    interactionTime?: number;
    bundleSize?: number;
  };
  // Callbacks
  onPerformanceAlert?: (metrics: PerformanceMetrics) => void;
  onOptimizationSuggestion?: (suggestions: string[]) => void;
}

interface PerformanceChartData {
  timestamp: number;
  renderTime: number;
  memoryUsage: number;
  interactionTime: number;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: number;
  metric: string;
  value: number;
  threshold: number;
}

/**
 * Performance Dashboard Component
 * Provides comprehensive performance monitoring and analytics
 */
export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  refreshInterval = 1000,
  maxDataPoints = 60,
  enableRealtimeMonitoring = true,
  showCharts = true,
  showMetrics = true,
  showRecommendations = true,
  thresholds = {
    renderTime: 16,
    memoryUsage: 50 * 1024 * 1024, // 50MB
    interactionTime: 100,
    bundleSize: 1024 * 1024, // 1MB
  },
  onPerformanceAlert,
  onOptimizationSuggestion,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chartData, setChartData] = useState<PerformanceChartData[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'renderTime' | 'memoryUsage' | 'interactionTime'>('renderTime');
  const [performanceScore, setPerformanceScore] = useState(100);

  // Performance monitoring
  const { metrics, recordCustomMetric, getPerformanceReport } = usePerformanceMonitor({
    enableRenderMonitor: true,
    enableMemoryMonitor: true,
    enableInteractionMonitor: true,
    thresholds,
    onPerformanceWarning: (metrics) => {
      handlePerformanceWarning(metrics);
    },
    onCriticalPerformanceIssue: (metrics) => {
      handleCriticalPerformanceIssue(metrics);
    },
  });

  // Calculate performance score
  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100;

    // Render time impact (30%)
    if (metrics.renderTime > thresholds.renderTime!) {
      score -= Math.min(30, (metrics.renderTime / thresholds.renderTime! - 1) * 30);
    }

    // Memory usage impact (25%)
    if (metrics.memoryUsage?.used && metrics.memoryUsage.used > thresholds.memoryUsage!) {
      score -= Math.min(25, (metrics.memoryUsage.used / thresholds.memoryUsage! - 1) * 25);
    }

    // Interaction time impact (25%)
    if (metrics.interactionTime && metrics.interactionTime > thresholds.interactionTime!) {
      score -= Math.min(25, (metrics.interactionTime / thresholds.interactionTime! - 1) * 25);
    }

    // Render count impact (20%)
    if (metrics.renderCount > 60) {
      score -= Math.min(20, (metrics.renderCount - 60) * 0.5);
    }

    return Math.max(0, Math.round(score));
  };

  // Handle performance warnings
  const handlePerformanceWarning = (metrics: PerformanceMetrics) => {
    const alert: PerformanceAlert = {
      id: `warning-${Date.now()}`,
      type: 'warning',
      message: `Performance warning: Render time ${metrics.renderTime.toFixed(2)}ms exceeds threshold`,
      timestamp: Date.now(),
      metric: 'renderTime',
      value: metrics.renderTime,
      threshold: thresholds.renderTime!,
    };

    setAlerts(prev => [...prev.slice(-9), alert]);
    onPerformanceAlert?.(metrics);
  };

  // Handle critical performance issues
  const handleCriticalPerformanceIssue = (metrics: PerformanceMetrics) => {
    const alert: PerformanceAlert = {
      id: `critical-${Date.now()}`,
      type: 'error',
      message: `Critical performance issue detected`,
      timestamp: Date.now(),
      metric: 'renderTime',
      value: metrics.renderTime,
      threshold: thresholds.renderTime!,
    };

    setAlerts(prev => [...prev.slice(-9), alert]);
    onPerformanceAlert?.(metrics);
  };

  // Update chart data
  const updateChartData = () => {
    const newDataPoint: PerformanceChartData = {
      timestamp: Date.now(),
      renderTime: metrics.renderTime,
      memoryUsage: metrics.memoryUsage?.used || 0,
      interactionTime: metrics.interactionTime || 0,
    };

    setChartData(prev => {
      const newData = [...prev, newDataPoint];
      return newData.slice(-maxDataPoints);
    });

    // Update performance score
    const newScore = calculatePerformanceScore(metrics);
    setPerformanceScore(newScore);

    // Record custom metrics
    recordCustomMetric('performanceScore', newScore);
    recordCustomMetric('dashboardUpdateCount', 1);
  };

  // Real-time monitoring
  useEffect(() => {
    if (!enableRealtimeMonitoring) return;

    const interval = setInterval(updateChartData, refreshInterval);
    updateChartData(); // Initial update

    return () => clearInterval(interval);
  }, [enableRealtimeMonitoring, refreshInterval, metrics]);

  // Generate optimization suggestions
  const generateOptimizationSuggestions = useMemo(() => {
    const suggestions: string[] = [];

    if (metrics.renderTime > thresholds.renderTime!) {
      suggestions.push('Consider using React.memo or useMemo to optimize component rendering');
    }

    if (metrics.memoryUsage?.used && metrics.memoryUsage.used > thresholds.memoryUsage!) {
      suggestions.push('Memory usage is high. Check for memory leaks and optimize data structures');
    }

    if (metrics.interactionTime && metrics.interactionTime > thresholds.interactionTime!) {
      suggestions.push('Interaction time is slow. Consider debouncing event handlers');
    }

    if (metrics.renderCount > 60) {
      suggestions.push('High render count detected. Check for unnecessary re-renders');
    }

    if (suggestions.length > 0) {
      onOptimizationSuggestion?.(suggestions);
    }

    return suggestions;
  }, [metrics, thresholds, onOptimizationSuggestion]);

  // Chart rendering functions
  const renderChart = () => {
    if (!showCharts || chartData.length < 2) return null;

    const maxValue = Math.max(
      ...chartData.map(d => d[selectedMetric]),
      thresholds[selectedMetric]!
    );

    const chartWidth = 300;
    const chartHeight = 100;
    const padding = 20;

    return (
      <div className="performance-chart">
        <h4>{selectedMetric} History</h4>
        <svg width={chartWidth} height={chartHeight}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={`grid-${index}`}
              x1={padding}
              y1={chartHeight - padding - (chartHeight - 2 * padding) * ratio}
              x2={chartWidth - padding}
              y2={chartHeight - padding - (chartHeight - 2 * padding) * ratio}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Threshold line */}
          <line
            x1={padding}
            y1={chartHeight - padding - (chartHeight - 2 * padding) * (thresholds[selectedMetric]! / maxValue)}
            x2={chartWidth - padding}
            y2={chartHeight - padding - (chartHeight - 2 * padding) * (thresholds[selectedMetric]! / maxValue)}
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Data line */}
          <polyline
            points={chartData.map((point, index) => {
              const x = padding + ((chartWidth - 2 * padding) / (chartData.length - 1)) * index;
              const y = chartHeight - padding - (chartHeight - 2 * padding) * (point[selectedMetric] / maxValue);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Data points */}
          {chartData.map((point, index) => {
            const x = padding + ((chartWidth - 2 * padding) / (chartData.length - 1)) * index;
            const y = chartHeight - padding - (chartHeight - 2 * padding) * (point[selectedMetric] / maxValue);
            const isOverThreshold = point[selectedMetric] > thresholds[selectedMetric]!;

            return (
              <circle
                key={`point-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill={isOverThreshold ? '#ef4444' : '#10b981'}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  // Render metrics
  const renderMetrics = () => {
    if (!showMetrics) return null;

    return (
      <div className="performance-metrics">
        <div className="metric-item">
          <span className="metric-label">Performance Score:</span>
          <span className={classNames('metric-value', {
            'text-green-500': performanceScore >= 80,
            'text-yellow-500': performanceScore >= 60 && performanceScore < 80,
            'text-red-500': performanceScore < 60,
          })}>
            {performanceScore}/100
          </span>
        </div>

        <div className="metric-item">
          <span className="metric-label">Render Time:</span>
          <span className={classNames('metric-value', {
            'text-green-500': metrics.renderTime <= thresholds.renderTime!,
            'text-red-500': metrics.renderTime > thresholds.renderTime!,
          })}>
            {metrics.renderTime.toFixed(2)}ms
          </span>
        </div>

        <div className="metric-item">
          <span className="metric-label">Memory Usage:</span>
          <span className="metric-value">
            {metrics.memoryUsage ? `${(metrics.memoryUsage.used / 1024 / 1024).toFixed(2)}MB` : 'N/A'}
          </span>
        </div>

        <div className="metric-item">
          <span className="metric-label">Render Count:</span>
          <span className="metric-value">{metrics.renderCount}</span>
        </div>

        {metrics.interactionTime && (
          <div className="metric-item">
            <span className="metric-label">Interaction Time:</span>
            <span className="metric-value">{metrics.interactionTime.toFixed(2)}ms</span>
          </div>
        )}
      </div>
    );
  };

  // Render alerts
  const renderAlerts = () => {
    if (alerts.length === 0) return null;

    return (
      <div className="performance-alerts">
        <h4>Recent Alerts</h4>
        {alerts.slice(-5).map((alert) => (
          <div
            key={alert.id}
            className={classNames('alert-item', {
              'alert-warning': alert.type === 'warning',
              'alert-error': alert.type === 'error',
              'alert-info': alert.type === 'info',
            })}
          >
            <span className="alert-time">
              {new Date(alert.timestamp).toLocaleTimeString()}
            </span>
            <span className="alert-message">{alert.message}</span>
          </div>
        ))}
      </div>
    );
  };

  // Render recommendations
  const renderRecommendations = () => {
    if (!showRecommendations || generateOptimizationSuggestions.length === 0) return null;

    return (
      <div className="performance-recommendations">
        <h4>Optimization Suggestions</h4>
        <ul>
          {generateOptimizationSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Toggle dashboard visibility
  const toggleDashboard = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <div className="performance-dashboard-toggle">
        <button onClick={toggleDashboard} className="dashboard-toggle-btn">
          📊 Performance ({performanceScore})
        </button>
      </div>
    );
  }

  return (
    <div className="performance-dashboard">
      <div className="dashboard-header">
        <h3>Performance Dashboard</h3>
        <div className="dashboard-controls">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="metric-selector"
          >
            <option value="renderTime">Render Time</option>
            <option value="memoryUsage">Memory Usage</option>
            <option value="interactionTime">Interaction Time</option>
          </select>
          <button onClick={toggleDashboard} className="close-btn">
            ✕
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {renderMetrics()}
        {renderChart()}
        {renderAlerts()}
        {renderRecommendations()}

        <div className="dashboard-actions">
          <button onClick={() => setChartData([])}>Clear Data</button>
          <button onClick={() => setAlerts([])}>Clear Alerts</button>
          <button onClick={() => {
            const report = getPerformanceReport();
            console.log('Performance Report:', report);
          }}>
            Export Report
          </button>
        </div>
      </div>

      <PerformanceAnalyzer
        enabled={true}
        mode="minimal"
        position="bottom-right"
        refreshInterval={2000}
        onPerformanceWarning={handlePerformanceWarning}
      />
    </div>
  );
};

PerformanceDashboard.displayName = 'PerformanceDashboard';

export default PerformanceDashboard;