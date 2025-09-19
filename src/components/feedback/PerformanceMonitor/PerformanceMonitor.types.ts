/**
 * 性能监控组件类型定义
 */

import React from 'react';
import { CardProps } from '@/components/display/Card/Card.types';

export interface PerformanceMonitorProps extends Omit<CardProps, 'title'> {
  /** 是否自动启动监控 */
  autoStart?: boolean;
  /** 监控间隔（毫秒） */
  interval?: number;
  /** 是否显示图表 */
  showChart?: boolean;
  /** 是否显示优化建议 */
  showRecommendations?: boolean;
  /** 性能阈值 */
  thresholds?: {
    renderTime?: number;
    memoryUsage?: number;
    interactionTime?: number;
  };
}

export interface PerformanceData {
  timestamp: number;
  metrics: {
    renderTime: number;
    renderCount: number;
    lastRenderTime: number;
    memoryUsage?: {
      used: number;
      total: number;
      percentage: number;
    };
    interactionTime?: number;
    firstInputDelay?: number;
  };
}

export interface Recommendation {
  type: 'render' | 'memory' | 'interaction' | 'network';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  solution: string;
}

export interface PerformanceChartProps {
  /** 性能数据历史 */
  data: PerformanceData[];
  /** 当前选中的指标 */
  metric: keyof PerformanceData['metrics'];
  /** 图表高度 */
  height?: number;
  /** 图表颜色 */
  color?: string;
  /** 是否显示网格线 */
  showGrid?: boolean;
  /** 是否显示工具提示 */
  showTooltip?: boolean;
}

export interface MetricCardProps {
  /** 指标标题 */
  title: string;
  /** 指标值 */
  value: number;
  /** 指标单位 */
  unit: string;
  /** 指标状态 */
  status: 'good' | 'warning' | 'error';
  /** 阈值 */
  threshold?: number;
  /** 是否显示趋势 */
  showTrend?: boolean;
  /** 趋势数据 */
  trendData?: number[];
}

export interface RecommendationItemProps {
  /** 建议标题 */
  title: string;
  /** 建议描述 */
  description: string;
  /** 解决方案 */
  solution: string;
  /** 优先级 */
  priority: 'high' | 'medium' | 'low';
  /** 建议类型 */
  type: 'render' | 'memory' | 'interaction' | 'network';
  /** 是否可关闭 */
  dismissible?: boolean;
  /** 关闭回调 */
  onDismiss?: () => void;
}

export interface PerformanceReport {
  /** 报告时间戳 */
  timestamp: string;
  /** 性能指标 */
  metrics: PerformanceData['metrics'];
  /** 性能评分 */
  score: {
    overall: number;
    render: number;
    memory: number;
    interaction: number;
  };
  /** 优化建议 */
  recommendations: Recommendation[];
  /** 性能趋势 */
  trends: {
    renderTime: number[];
    memoryUsage: number[];
    interactionTime: number[];
  };
  /** 统计信息 */
  statistics: {
    averageRenderTime: number;
    maxRenderTime: number;
    minRenderTime: number;
    averageMemoryUsage: number;
    maxMemoryUsage: number;
    totalRenderCount: number;
  };
}

export interface PerformanceMonitorRef {
  /** 开始监控 */
  startMonitoring: () => void;
  /** 停止监控 */
  stopMonitoring: () => void;
  /** 重置监控 */
  resetMonitoring: () => void;
  /** 生成报告 */
  generateReport: () => PerformanceReport;
  /** 获取当前指标 */
  getCurrentMetrics: () => PerformanceData['metrics'];
  /** 获取历史数据 */
  getHistoryData: () => PerformanceData[];
  /** 清除历史数据 */
  clearHistory: () => void;
}

export type PerformanceStatus = 'good' | 'warning' | 'error';

export interface PerformanceThresholds {
  /** 渲染时间阈值（毫秒） */
  renderTime: number;
  /** 内存使用阈值（MB） */
  memoryUsage: number;
  /** 交互时间阈值（毫秒） */
  interactionTime: number;
  /** 首次输入延迟阈值（毫秒） */
  firstInputDelay: number;
}

export interface PerformanceConfig {
  /** 是否启用渲染监控 */
  enableRenderMonitor: boolean;
  /** 是否启用内存监控 */
  enableMemoryMonitor: boolean;
  /** 是否启用交互监控 */
  enableInteractionMonitor: boolean;
  /** 是否启用网络监控 */
  enableNetworkMonitor: boolean;
  /** 性能阈值 */
  thresholds: PerformanceThresholds;
  /** 监控间隔（毫秒） */
  interval: number;
  /** 最大历史记录数 */
  maxHistorySize: number;
  /** 是否自动清理历史记录 */
  autoCleanup: boolean;
  /** 清理间隔（毫秒） */
  cleanupInterval: number;
}

export interface PerformanceEvent {
  /** 事件类型 */
  type: 'warning' | 'error' | 'info';
  /** 事件时间 */
  timestamp: number;
  /** 事件消息 */
  message: string;
  /** 相关指标 */
  metrics?: PerformanceData['metrics'];
  /** 事件详情 */
  details?: Record<string, any>;
}

export interface PerformanceMonitorContextType {
  /** 当前监控状态 */
  isMonitoring: boolean;
  /** 当前性能指标 */
  metrics: PerformanceData['metrics'];
  /** 性能历史 */
  history: PerformanceData[];
  /** 性能事件 */
  events: PerformanceEvent[];
  /** 配置 */
  config: PerformanceConfig;
  /** 开始监控 */
  startMonitoring: () => void;
  /** 停止监控 */
  stopMonitoring: () => void;
  /** 重置监控 */
  resetMonitoring: () => void;
  /** 更新配置 */
  updateConfig: (config: Partial<PerformanceConfig>) => void;
  /** 生成报告 */
  generateReport: () => PerformanceReport;
}

// React 组件类型扩展
declare module 'react' {
  interface ForwardRefRenderFunction<T, P> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null;
  }
}

export default PerformanceMonitorProps;