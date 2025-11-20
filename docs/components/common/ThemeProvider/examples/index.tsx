import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import { ThemeProvider, useTheme } from '../../../../src/components/common/ThemeProvider';

// 基本用法示例
function BasicUsage() {
  return (
    <View className="example-container">
      <Text className="example-title">基本用法</Text>
      <View className="content">
        <Text>ThemeProvider 包裹整个应用，提供全局主题支持</Text>
      </View>
    </View>
  );
}

// 主题切换示例
function ThemeSwitcher() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <View className="example-container">
      <Text className="example-title">主题切换</Text>
      <View className="theme-buttons">
        <Button 
          onClick={() => setTheme('light')}
          className={`theme-button ${theme === 'light' ? 'active' : ''}`}
        >
          亮色模式
        </Button>
        <Button 
          onClick={() => setTheme('dark')}
          className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
        >
          暗色模式
        </Button>
        <Button 
          onClick={() => setTheme('auto')}
          className={`theme-button ${theme === 'auto' ? 'active' : ''}`}
        >
          自动模式
        </Button>
      </View>
      <View className="status">
        <Text>当前主题: {theme}</Text>
        <Text>是否为暗色模式: {isDark ? '是' : '否'}</Text>
      </View>
    </View>
  );
}

// 主题感知组件示例
function ThemeAwareComponent() {
  const { isDark, colors } = useTheme();

  return (
    <View 
      className={`example-container theme-aware-component ${isDark ? 'dark' : 'light'}`}
      style={{ backgroundColor: isDark ? '#1f2937' : '#ffffff' }}
    >
      <Text className="example-title">主题感知组件</Text>
      <View className="content">
        <Text style={{ color: isDark ? colors.text.primary : colors.text.primary }}>
          这个组件会根据当前主题自动调整样式
        </Text>
        <View 
          className="card" 
          style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6' }}
        >
          <Text style={{ color: isDark ? colors.text.secondary : colors.text.secondary }}>
            主题感知卡片
          </Text>
        </View>
      </View>
    </View>
  );
}

// 设计令牌示例
function DesignTokensExample() {
  const { colors, spacing, typography } = useTheme();

  return (
    <View className="example-container">
      <Text className="example-title">设计令牌</Text>
      <View className="tokens-container">
        <Text style={{ 
          fontSize: typography.h2.fontSize, 
          fontWeight: typography.h2.fontWeight,
          marginBottom: `${spacing.sm}px`
        }}>
          标题（使用排版令牌）
        </Text>
        <Text style={{ 
          color: colors.text.secondary,
          marginBottom: `${spacing.md}px`
        }}>
          副标题（使用颜色令牌）
        </Text>
        <View style={{ 
          display: 'flex', 
          gap: `${spacing.sm}px`,
          marginBottom: `${spacing.md}px`
        }}>
          <View style={{ width: `${spacing.lg}px`, height: `${spacing.lg}px`, backgroundColor: colors.primary }} />
          <View style={{ width: `${spacing.lg}px`, height: `${spacing.lg}px`, backgroundColor: colors.secondary }} />
          <View style={{ width: `${spacing.lg}px`, height: `${spacing.lg}px`, backgroundColor: colors.success }} />
          <View style={{ width: `${spacing.lg}px`, height: `${spacing.lg}px`, backgroundColor: colors.warning }} />
          <View style={{ width: `${spacing.lg}px`, height: `${spacing.lg}px`, backgroundColor: colors.error }} />
        </View>
        <Button style={{ 
          backgroundColor: colors.primary, 
          color: '#fff',
          padding: `${spacing.sm}px ${spacing.md}px`
        }}>
          按钮（使用颜色和间距令牌）
        </Button>
      </View>
    </View>
  );
}

// 综合示例组件
function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <View className="theme-provider-example">
        <BasicUsage />
        <ThemeSwitcher />
        <ThemeAwareComponent />
        <DesignTokensExample />
      </View>
    </ThemeProvider>
  );
}

export default ThemeProviderExample;

// 样式
import './index.scss';