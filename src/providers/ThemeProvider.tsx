/**
 * 主题 Provider
 * 提供主题上下文和主题切换功能
 * @module providers/ThemeProvider
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { DesignTokens } from '../theme/tokens';
import { defaultDesignTokens } from '../theme/tokens';
import { deepMerge } from '../theme/utils/deepMerge';
import { isBrowserEnvironment, safeLocalStorage, safeMatchMedia } from '../utils/environment';

// ==================== 类型定义 ====================

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 主题配置
 */
export interface ThemeConfig {
  /**
   * 主题模式
   */
  mode: ThemeMode;

  /**
   * 设计令牌
   */
  tokens: DesignTokens;

  /**
   * 自定义令牌覆盖
   */
  customTokens?: Partial<DesignTokens>;
}

/**
 * 主题上下文值
 */
export interface ThemeContextValue {
  /**
   * 当前主题模式
   */
  mode: ThemeMode;

  /**
   * 是否为暗色模式
   */
  isDark: boolean;

  /**
   * 设计令牌
   */
  tokens: DesignTokens;

  /**
   * 设置主题模式
   */
  setMode: (mode: ThemeMode) => void;

  /**
   * 切换主题（light <-> dark）
   */
  toggleTheme: () => void;

  /**
   * 设置自定义令牌
   */
  setCustomTokens: (tokens: Partial<DesignTokens>) => void;

  /**
   * 重置主题到默认值
   */
  resetTheme: () => void;

  /**
   * 获取令牌值
   * @param path - 令牌路径，如 'colors.primary.500'
   */
  getToken: <T = unknown>(path: string) => T | undefined;

  /**
   * 系统是否为暗色模式
   */
  isSystemDark: boolean;
}

/**
 * 主题 Provider Props
 */
export interface ThemeProviderProps {
  /**
   * 子元素
   */
  children: ReactNode;

  /**
   * 默认主题模式
   * @default 'light'
   */
  defaultMode?: ThemeMode;

  /**
   * 默认设计令牌
   */
  defaultTokens?: DesignTokens;

  /**
   * 暗色主题令牌
   */
  darkTokens?: Partial<DesignTokens>;

  /**
   * 持久化存储键名
   * @default 'taro-uno-theme'
   */
  persistKey?: string;

  /**
   * 是否跟随系统主题
   * @default true
   */
  followSystem?: boolean;

  /**
   * 主题变化回调
   */
  onThemeChange?: (mode: ThemeMode, tokens: DesignTokens) => void;
}

// ==================== 暗色主题令牌 ====================

/**
 * 默认暗色主题令牌覆盖
 */
const defaultDarkTokens: Partial<DesignTokens> = {
  colors: {
    ...defaultDesignTokens.colors,
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
      tertiary: '#6b7280',
      disabled: '#4b5563',
      inverse: '#111827',
      link: '#38bdf8',
      placeholder: '#6b7280',
    },
    background: {
      primary: '#111827',
      secondary: '#1f2937',
      tertiary: '#374151',
      card: '#1f2937',
      input: '#374151',
      mask: 'rgba(0, 0, 0, 0.7)',
      hover: '#374151',
      active: '#4b5563',
    },
    border: {
      default: '#374151',
      light: '#4b5563',
      focus: '#38bdf8',
      error: '#f87171',
      success: '#4ade80',
      warning: '#fbbf24',
    },
  },
};

// ==================== 上下文 ====================

/**
 * 主题上下文
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ==================== 工具函数 ====================

/**
 * 根据路径获取对象值
 */
function getValueByPath<T = unknown>(obj: Record<string, unknown>, path: string): T | undefined {
  const keys = path.split('.');
  let value: unknown = obj;

  for (const key of keys) {
    if (value === null || value === undefined) {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }

  return value as T | undefined;
}

// ==================== Provider 组件 ====================

/**
 * 主题 Provider 组件
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from 'taro-uno-ui';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultMode="light" followSystem>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'light',
  defaultTokens = defaultDesignTokens,
  darkTokens = defaultDarkTokens,
  persistKey = 'taro-uno-theme',
  followSystem = true,
  onThemeChange,
}) => {
  // 状态
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [customTokens, setCustomTokensState] = useState<Partial<DesignTokens> | null>(null);
  const [isSystemDark, setIsSystemDark] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 计算是否为暗色模式
  const isDark = useMemo(() => {
    if (mode === 'auto') {
      return isSystemDark;
    }
    return mode === 'dark';
  }, [mode, isSystemDark]);

  // 计算当前令牌
  const tokens = useMemo(() => {
    // 基础令牌
    let baseTokens = defaultTokens;

    // 如果是暗色模式，合并暗色令牌
    if (isDark) {
      baseTokens = deepMerge(
        defaultTokens as unknown as Record<string, unknown>,
        darkTokens as unknown as Partial<Record<string, unknown>>,
      ) as unknown as DesignTokens;
    }

    // 如果有自定义令牌，合并自定义令牌
    if (customTokens) {
      baseTokens = deepMerge(
        baseTokens as unknown as Record<string, unknown>,
        customTokens as unknown as Partial<Record<string, unknown>>,
      ) as unknown as DesignTokens;
    }

    return baseTokens;
  }, [defaultTokens, darkTokens, isDark, customTokens]);

  // 初始化：从本地存储读取主题
  useEffect(() => {
    if (!isBrowserEnvironment()) {
      setIsInitialized(true);
      return;
    }

    try {
      const savedData = safeLocalStorage.getItem(persistKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.mode && ['light', 'dark', 'auto'].includes(parsed.mode)) {
          setModeState(parsed.mode);
        }
        if (parsed.customTokens) {
          setCustomTokensState(parsed.customTokens);
        }
      } else if (followSystem) {
        // 检测系统主题
        const mediaQuery = safeMatchMedia('(prefers-color-scheme: dark)');
        const prefersDark = mediaQuery?.matches ?? false;
        setIsSystemDark(prefersDark);
      }
    } catch (error) {
      console.warn('[ThemeProvider] Failed to load theme from storage:', error);
    }

    setIsInitialized(true);
  }, [persistKey, followSystem]);

  // 监听系统主题变化
  useEffect(() => {
    if (!followSystem || !isBrowserEnvironment()) {
      return undefined;
    }

    const mediaQuery = safeMatchMedia('(prefers-color-scheme: dark)');
    if (!mediaQuery) {
      return undefined;
    }

    const handleChange = (event: MediaQueryListEvent): void => {
      setIsSystemDark(event.matches);
    };

    setIsSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, [followSystem]);

  // 持久化主题设置
  useEffect(() => {
    if (!isInitialized || !isBrowserEnvironment()) {
      return;
    }

    try {
      const data = {
        mode,
        customTokens,
      };
      safeLocalStorage.setItem(persistKey, JSON.stringify(data));
    } catch (error) {
      console.warn('[ThemeProvider] Failed to save theme to storage:', error);
    }
  }, [mode, customTokens, isInitialized, persistKey]);

  // 主题变化回调
  useEffect(() => {
    if (isInitialized) {
      onThemeChange?.(mode, tokens);
    }
  }, [mode, tokens, isInitialized, onThemeChange]);

  // 应用主题到 DOM
  useEffect(() => {
    if (!isBrowserEnvironment()) {
      return;
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(isDark ? 'dark-theme' : 'light-theme');
  }, [isDark]);

  // 设置主题模式
  const setMode = useCallback((newMode: ThemeMode): void => {
    setModeState(newMode);
  }, []);

  // 切换主题
  const toggleTheme = useCallback((): void => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // 设置自定义令牌
  const setCustomTokens = useCallback((newTokens: Partial<DesignTokens>): void => {
    setCustomTokensState((prev) => {
      if (prev) {
        return deepMerge(
          prev as unknown as Record<string, unknown>,
          newTokens as unknown as Partial<Record<string, unknown>>,
        ) as unknown as Partial<DesignTokens>;
      }
      return newTokens;
    });
  }, []);

  // 重置主题
  const resetTheme = useCallback((): void => {
    setModeState(defaultMode);
    setCustomTokensState(null);
  }, [defaultMode]);

  // 获取令牌值
  const getToken = useCallback(
    <T = unknown,>(path: string): T | undefined => {
      return getValueByPath<T>(tokens as unknown as Record<string, unknown>, path);
    },
    [tokens],
  );

  // 上下文值
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark,
      tokens,
      setMode,
      toggleTheme,
      setCustomTokens,
      resetTheme,
      getToken,
      isSystemDark,
    }),
    [mode, isDark, tokens, setMode, toggleTheme, setCustomTokens, resetTheme, getToken, isSystemDark],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// ==================== Hooks ====================

/**
 * 使用主题上下文
 *
 * @returns 主题上下文值
 * @throws 如果在 ThemeProvider 外部使用则抛出错误
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isDark, toggleTheme, tokens } = useThemeContext();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {isDark ? '切换到亮色' : '切换到暗色'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

/**
 * 使用设计令牌
 *
 * @returns 当前设计令牌
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const tokens = useDesignTokens();
 *
 *   return (
 *     <div style={{ color: tokens.colors.primary[500] }}>
 *       Primary Color
 *     </div>
 *   );
 * }
 * ```
 */
export function useDesignTokens(): DesignTokens {
  const { tokens } = useThemeContext();
  return tokens;
}

/**
 * 使用主题模式
 *
 * @returns 主题模式相关的值和方法
 */
export function useThemeMode(): {
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
} {
  const { mode, isDark, setMode, toggleTheme } = useThemeContext();
  return { mode, isDark, setMode, toggleTheme };
}

// ==================== 导出 ====================

export default ThemeProvider;
