import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, ThemeMode } from './types';
import { defaultTheme, darkTheme } from './defaults';
import { generateStyles } from './styles';
import { DesignSystemUtils } from './design-system';
import { isBrowserEnvironment, safeLocalStorage, safeMatchMedia } from '../utils/environment';

interface ThemeContextType {
  theme: ThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  setCustomTheme: (theme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (themeData: string) => boolean;
  // 新增工具方法
  getThemeValue: (path: string) => any;
  generateThemeCSS: () => string;
  isSystemDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeConfig;
  defaultMode?: ThemeMode;
  persistKey?: string;
  followSystem?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme: initialTheme = defaultTheme,
  defaultMode = 'light',
  persistKey = 'taro-uno-theme',
  followSystem = true,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode as ThemeMode);
  const [customTheme, setCustomTheme] = useState<Partial<ThemeConfig> | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // 计算当前主题
  const theme: ThemeConfig = React.useMemo(() => {
    const baseTheme = themeMode === 'dark' ? darkTheme : initialTheme;
    return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
  }, [themeMode, customTheme, initialTheme]);

  const isDark = themeMode === 'dark';

  // 初始化主题（从本地存储读取）
  useEffect(() => {
    if (!isBrowserEnvironment()) {
      setIsInitialized(true);
      return;
    }

    try {
      const savedTheme = safeLocalStorage.getItem(persistKey);
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme);
        setThemeMode((parsed.mode || defaultMode) as ThemeMode);
        if (parsed.custom) {
          setCustomTheme(parsed.custom);
        }
      } else if (followSystem) {
        const mediaQuery = safeMatchMedia('(prefers-color-scheme: dark)');
        const prefersDark = mediaQuery?.matches ?? false;
        setIsSystemDark(prefersDark);
        if (prefersDark && defaultMode === 'auto') {
          setThemeMode('dark');
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }

    setIsInitialized(true);
  }, [defaultMode, persistKey, followSystem]);

  // 保存主题到本地存储
  useEffect(() => {
    if (!isInitialized || !isBrowserEnvironment()) {
      return;
    }

    try {
      const themeData = {
        mode: themeMode,
        custom: customTheme,
      };
      safeLocalStorage.setItem(persistKey, JSON.stringify(themeData));
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  }, [themeMode, customTheme, isInitialized, persistKey]);

  // 应用主题到DOM
  useEffect(() => {
    if (!isBrowserEnvironment()) {
      return;
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', themeMode);
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${themeMode}-theme`);

    const cssVariables = generateStyles(theme);
    let styleElement = document.getElementById('theme-variables');

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'theme-variables';
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = cssVariables;
  }, [theme, themeMode]);

  // 监听系统主题变化
  useEffect(() => {
    if (!followSystem) {
      return undefined;
    }

    const mediaQuery = safeMatchMedia('(prefers-color-scheme: dark)');
    if (!mediaQuery) {
      return undefined;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setIsSystemDark(event.matches);
      if (defaultMode === 'auto') {
        setThemeMode(event.matches ? 'dark' : 'light');
      }
    };

    setIsSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, [defaultMode, followSystem]);

  // 切换主题
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 设置自定义主题
  const setCustomThemeData = (themeData: Partial<ThemeConfig>) => {
    setCustomTheme((prev) => ({
      ...prev,
      ...themeData,
    }));
  };

  // 重置主题
  const resetTheme = () => {
    setCustomTheme(null);
    setThemeMode(defaultMode);
  };

  // 导出主题
  const exportTheme = (): string => {
    const themeData = {
      mode: themeMode,
      custom: customTheme,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
    return JSON.stringify(themeData, null, 2);
  };

  // 导入主题
  const importTheme = (themeData: string): boolean => {
    try {
      const parsed = JSON.parse(themeData);

      // 验证主题数据格式
      if (parsed.mode && ['light', 'dark', 'auto'].includes(parsed.mode)) {
        setThemeMode(parsed.mode);
      }

      if (parsed.custom && typeof parsed.custom === 'object') {
        setCustomTheme(parsed.custom);
      }

      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  };

  // 获取主题值
  const getThemeValue = (path: string): any => {
    // 支持路径格式：'colors.primary'、'spacing.md'等
    const keys = path.split('.');
    let value: any = theme;

    for (const key of keys) {
      value = value?.[key];
    }

    return value;
  };

  // 生成主题CSS
  const generateThemeCSS = (): string => {
    return DesignSystemUtils.generateCSSVariables() + DesignSystemUtils.generateDarkThemeCSS();
  };

  const contextValue: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
    isDark,
    setCustomTheme: setCustomThemeData,
    resetTheme,
    exportTheme,
    importTheme,
    getThemeValue,
    generateThemeCSS,
    isSystemDark,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 新增：主题工具Hook
export const useThemeUtils = () => {
  const { isDark, getThemeValue } = useTheme();

  const getColor = (colorPath: string): string => {
    return getThemeValue(`colors.${colorPath}`) || '#000000';
  };

  const getSpacing = (spacingKey: string): string => {
    return getThemeValue(`spacing.${spacingKey}`) || '0';
  };

  const getFontSize = (fontKey: string): string => {
    return getThemeValue(`typography.fontSize.${fontKey}`) || '16px';
  };

  const getBorderRadius = (radiusKey: string): string => {
    return getThemeValue(`borderRadius.${radiusKey}`) || '0';
  };

  const getShadow = (shadowKey: string): string => {
    return getThemeValue(`shadow.${shadowKey}`) || 'none';
  };

  return {
    isDark,
    getColor,
    getSpacing,
    getFontSize,
    getBorderRadius,
    getShadow,
  };
};

export default ThemeProvider;
