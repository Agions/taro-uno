import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { PerformanceMonitor } from '../../theme/utils';
import { View, Text, Button } from '@tarojs/components';

interface ThemePerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showMetrics?: boolean;
}

const ThemePerformanceMonitor: React.FC<ThemePerformanceMonitorProps> = ({
  enabled = true,
  position = 'top-right',
  showMetrics = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const { theme } = useTheme();

  const positionStyles = {
    'top-right': {
      top: 20,
      right: 20,
    },
    'top-left': {
      top: 20,
      left: 20,
    },
    'bottom-right': {
      bottom: 20,
      right: 20,
    },
    'bottom-left': {
      bottom: 20,
      left: 20,
    },
  };

  useEffect(() => {
    if (!enabled) return;

    // 监控主题切换性能
    // const handleThemeChange = () => {
    //   const startTime = performance.now();

    //   // 模拟主题切换的开销
    //   setTimeout(() => {
    //     const endTime = performance.now();
    //     const duration = endTime - startTime;

    //     PerformanceMonitor.recordMetric('themeSwitch', duration);
    //     setMetrics(PerformanceMonitor.getReport());
    //   }, 0);
    // }; // Commented out - unused

    // 监控CSS变量生成性能
    // const handleCSSGeneration = () => {
    //   const startTime = performance.now();

    //   // 模拟CSS变量生成的开销
    //   setTimeout(() => {
    //     const endTime = performance.now();
    //     const duration = endTime - startTime;

    //     PerformanceMonitor.recordMetric('cssGeneration', duration);
    //     setMetrics(PerformanceMonitor.getReport());
    //   }, 0);
    // }; // Commented out - unused

    // 监控渲染性能
    // const handleRender = () => {
    //   const startTime = performance.now();

    //   // 模拟渲染开销
    //   setTimeout(() => {
    //     const endTime = performance.now();
    //     const duration = endTime - startTime;

    //     PerformanceMonitor.recordMetric('render', duration);
    //     setMetrics(PerformanceMonitor.getReport());
    //   }, 0);
    // }; // Commented out - unused

    // 定期更新指标
    const interval = setInterval(() => {
      setMetrics(PerformanceMonitor.getReport());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [enabled]);

  const formatMetric = (value: number): string => {
    if (value < 1) {
      return `${(value * 1000).toFixed(2)}μs`;
    } else if (value < 1000) {
      return `${value.toFixed(2)}ms`;
    } else {
      return `${(value / 1000).toFixed(2)}s`;
    }
  };

  const getPerformanceScore = (): number => {
    const themeSwitchStats = PerformanceMonitor.getStats('themeSwitch');
    const cssGenerationStats = PerformanceMonitor.getStats('cssGeneration');
    const renderStats = PerformanceMonitor.getStats('render');

    const themeSwitchScore = themeSwitchStats.count > 0 ? Math.max(0, 100 - themeSwitchStats.average * 10) : 100;
    const cssGenerationScore = cssGenerationStats.count > 0 ? Math.max(0, 100 - cssGenerationStats.average * 5) : 100;
    const renderScore = renderStats.count > 0 ? Math.max(0, 100 - renderStats.average * 2) : 100;

    return Math.round((themeSwitchScore + cssGenerationScore + renderScore) / 3);
  };

  const getPerformanceColor = (score: number): string => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  if (!enabled) return null;

  const performanceScore = getPerformanceScore();

  return (
    <>
      {/* 性能监控按钮 */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          ...positionStyles[position],
          zIndex: 9999,
          backgroundColor: theme.colors.backgroundCard,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          padding: '12px',
          boxShadow: theme.shadow.lg,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <View style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: getPerformanceColor(performanceScore),
        }} />
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.colors.text }}>
          {performanceScore}
        </Text>
      </Button>

      {/* 性能监控面板 */}
      {isVisible && (
        <View style={{
          position: 'fixed',
          top: 60,
          right: 20,
          width: 320,
          maxHeight: '80vh',
          backgroundColor: theme.colors.backgroundCard,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadow.xl,
          zIndex: 9998,
          overflow: 'hidden',
        }}>
          <View style={{
            padding: 16,
            borderBottom: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
          }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text }}>
                主题性能监控
              </Text>
              <Button onClick={() => setIsVisible(false)}>
                <Text style={{ fontSize: 18, color: theme.colors.textSecondary, cursor: 'pointer' }}>
                  ✕
                </Text>
              </Button>
            </View>
          </View>

          <View style={{ padding: 16, maxHeight: '60vh', overflowY: 'auto' }}>
            {/* 性能评分 */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
                性能评分
              </Text>
              <View style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <View style={{
                  flex: 1,
                  height: 8,
                  backgroundColor: theme.colors.border,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <View style={{
                    width: `${performanceScore}%`,
                    height: '100%',
                    backgroundColor: getPerformanceColor(performanceScore),
                    transition: 'width 0.3s ease',
                  }} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: getPerformanceColor(performanceScore) }}>
                  {performanceScore}
                </Text>
              </View>
            </View>

            {/* 性能指标 */}
            {showMetrics && Object.entries(metrics).map(([metricName, stats]) => (
              <View key={metricName} style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
                  {metricName}
                </Text>
                <View style={{
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.md,
                  padding: 12,
                }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                      次数
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.text }}>
                      {stats.count}
                    </Text>
                  </View>
                  <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                      平均
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.text }}>
                      {formatMetric(stats.average)}
                    </Text>
                  </View>
                  <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                      最小
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.text }}>
                      {formatMetric(stats.min)}
                    </Text>
                  </View>
                  <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                      最大
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.text }}>
                      {formatMetric(stats.max)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {/* 性能建议 */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
                性能建议
              </Text>
              <View style={{ fontSize: 12, color: theme.colors.textSecondary, lineHeight: 1.5 }}>
                {performanceScore >= 80 && (
                  <Text>✓ 主题性能优秀，无需优化</Text>
                )}
                {performanceScore >= 60 && performanceScore < 80 && (
                  <Text>⚠ 主题性能良好，建议关注切换速度</Text>
                )}
                {performanceScore < 60 && (
                  <Text>⚠ 主题性能需要优化，建议减少动画效果</Text>
                )}
              </View>
            </View>

            {/* 操作按钮 */}
            <View style={{ display: 'flex', gap: 8 }}>
              <Button
                onClick={() => {
                  PerformanceMonitor.clearMetrics();
                  setMetrics({});
                }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.textInverse,
                  borderRadius: theme.borderRadius.md,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                清除数据
              </Button>
              
              <Button
                onClick={() => {
                  const data = JSON.stringify(metrics, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `theme-performance-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.textInverse,
                  borderRadius: theme.borderRadius.md,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                导出数据
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default ThemePerformanceMonitor;