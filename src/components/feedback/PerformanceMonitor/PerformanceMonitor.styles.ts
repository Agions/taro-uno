/**
 * 性能监控组件样式配置
 */

import type { CSSProperties } from 'react';

export interface PerformanceMonitorStylesType {
  container: CSSProperties;
  metrics: CSSProperties;
  chart: CSSProperties;
  recommendations: CSSProperties;
  [key: string]: CSSProperties;
}

export const performanceMonitorStyles: PerformanceMonitorStylesType = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  chart: {
    height: '200px',
    marginBottom: '16px',
  },
  recommendations: {
    marginTop: '16px',
  },
};

export default performanceMonitorStyles;