/**
 * useTheme Hook
 * 主题管理 Hook，提供获取当前主题和切换主题的功能
 *
 * @example
 * ```typescript
 * const { theme, themeMode, isDark, toggleTheme, setThemeMode } = useTheme();
 *
 * // 切换主题
 * toggleTheme();
 *
 * // 设置特定主题模式
 * setThemeMode('dark');
 *
 * // 获取主题值
 * const primaryColor = theme.colors.primary;
 * ```
 */

import { useContext, createContext, useMemo, useCallback } from 'react';
import type { ThemeConfig, ThemeMode } from '../../theme/types';
import { defaultTheme } from '../../theme/defaults';

/**
 * 主题上下文类型
 */
export interface ThemeContextType {
  /** 当前主题配置 */
  theme: ThemeConfig;
  /** 当前主题模式 */
  themeMode: ThemeMode;
  /** 是否为暗色主题 */
  isDark: boolean;
  /** 是否跟随系统主题 */
  isSystemDark: boolean;
  /** 设置主题模式 */
  setThemeMode: (mode: ThemeMode) => void;
  /** 切换主题（明/暗） */
  toggleTheme: () => void;
  /** 设置自定义主题 */
  setCustomTheme: (theme: Partial<ThemeConfig>) => void;
  /** 重置主题为默认值 */
  resetTheme: () => void;
  /** 导出主题配置为 JSON 字符串 */
  exportTheme: () => string;
  /** 导入主题配置 */
  importTheme: (themeData: string) => boolean;
  /** 获取主题值（支持路径格式如 'colors.primary'） */
  getThemeValue: <T = unknown>(path: string) => T | undefined;
  /** 生成主题 CSS 变量 */
  generateThemeCSS: () => string;
}

/**
 * 主题上下文
 * 注意：实际使用时应从 ThemeProvider 获取上下文
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * useTheme Hook 返回类型
 */
export interface UseThemeReturn {
  /** 当前主题配置 */
  theme: ThemeConfig;
  /** 当前主题模式 */
  themeMode: ThemeMode;
  /** 是否为暗色主题 */
  isDark: boolean;
  /** 是否跟随系统主题 */
  isSystemDark: boolean;
  /** 设置主题模式 */
  setThemeMode: (mode: ThemeMode) => void;
  /** 切换主题（明/暗） */
  toggleTheme: () => void;
  /** 设置自定义主题 */
  setCustomTheme: (theme: Partial<ThemeConfig>) => void;
  /** 重置主题为默认值 */
  resetTheme: () => void;
  /** 导出主题配置 */
  exportTheme: () => string;
  /** 导入主题配置 */
  importTheme: (themeData: string) => boolean;
  /** 获取主题值 */
  getThemeValue: <T = unknown>(path: string) => T | undefined;
  /** 生成主题 CSS */
  generateThemeCSS: () => string;
  /** 获取颜色值 */
  getColor: (colorKey: keyof ThemeConfig['colors']) => string;
  /** 获取间距值 */
  getSpacing: (spacingKey: keyof ThemeConfig['spacing']) => number | string;
  /** 获取圆角值 */
  getBorderRadius: (radiusKey: keyof ThemeConfig['borderRadius']) => number;
  /** 获取阴影值 */
  getShadow: (shadowKey: keyof ThemeConfig['shadow']) => string;
  /** 获取字体大小 */
  getFontSize: (sizeKey: keyof ThemeConfig['typography']['fontSize']) => number;
}

/**
 * 主题管理 Hook
 *
 * 提供主题获取、切换、自定义等功能
 *
 * @returns 主题相关状态和方法
 * @throws 如果在 ThemeProvider 外部使用会抛出错误
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, isDark, toggleTheme } = useTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Button onClick={toggleTheme}>
 *         {isDark ? '切换到亮色' : '切换到暗色'}
 *       </Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  // 如果没有 Provider，提供默认值（用于测试或独立使用）
  const defaultContext: ThemeContextType = useMemo(
    () => ({
      theme: defaultTheme,
      themeMode: 'light' as ThemeMode,
      isDark: false,
      isSystemDark: false,
      setThemeMode: () => {
        console.warn('useTheme: setThemeMode called outside ThemeProvider');
      },
      toggleTheme: () => {
        console.warn('useTheme: toggleTheme called outside ThemeProvider');
      },
      setCustomTheme: () => {
        console.warn('useTheme: setCustomTheme called outside ThemeProvider');
      },
      resetTheme: () => {
        console.warn('useTheme: resetTheme called outside ThemeProvider');
      },
      exportTheme: () => JSON.stringify({ mode: 'light', custom: null }),
      importTheme: () => false,
      getThemeValue: <T,>(path: string): T | undefined => {
        const keys = path.split('.');
        let value: unknown = defaultTheme;
        for (const key of keys) {
          value = (value as Record<string, unknown>)?.[key];
        }
        return value as T | undefined;
      },
      generateThemeCSS: () => '',
    }),
    [],
  );

  const ctx = context ?? defaultContext;

  /**
   * 获取颜色值
   */
  const getColor = useCallback(
    (colorKey: keyof ThemeConfig['colors']): string => {
      return ctx.theme.colors[colorKey] ?? '#000000';
    },
    [ctx.theme.colors],
  );

  /**
   * 获取间距值
   */
  const getSpacing = useCallback(
    (spacingKey: keyof ThemeConfig['spacing']): number | string => {
      const value = ctx.theme.spacing[spacingKey];
      return typeof value === 'number' ? value : (value as unknown as { md?: number })?.md ?? 8;
    },
    [ctx.theme.spacing],
  );

  /**
   * 获取圆角值
   */
  const getBorderRadius = useCallback(
    (radiusKey: keyof ThemeConfig['borderRadius']): number => {
      return ctx.theme.borderRadius[radiusKey] ?? 0;
    },
    [ctx.theme.borderRadius],
  );

  /**
   * 获取阴影值
   */
  const getShadow = useCallback(
    (shadowKey: keyof ThemeConfig['shadow']): string => {
      return ctx.theme.shadow[shadowKey] ?? 'none';
    },
    [ctx.theme.shadow],
  );

  /**
   * 获取字体大小
   */
  const getFontSize = useCallback(
    (sizeKey: keyof ThemeConfig['typography']['fontSize']): number => {
      return ctx.theme.typography.fontSize[sizeKey] ?? 14;
    },
    [ctx.theme.typography.fontSize],
  );

  return {
    theme: ctx.theme,
    themeMode: ctx.themeMode,
    isDark: ctx.isDark,
    isSystemDark: ctx.isSystemDark,
    setThemeMode: ctx.setThemeMode,
    toggleTheme: ctx.toggleTheme,
    setCustomTheme: ctx.setCustomTheme,
    resetTheme: ctx.resetTheme,
    exportTheme: ctx.exportTheme,
    importTheme: ctx.importTheme,
    getThemeValue: ctx.getThemeValue,
    generateThemeCSS: ctx.generateThemeCSS,
    getColor,
    getSpacing,
    getBorderRadius,
    getShadow,
    getFontSize,
  };
}

export default useTheme;
