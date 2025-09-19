/**
 * 增强的主题系统
 * 提供完整的主题管理、切换和自定义功能
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DesignTokens, defaultDesignTokens, DesignTokenGenerator } from './design-tokens';
import { ThemeConfig } from './types';
import { defaultTheme, darkTheme } from './defaults';

// 主题上下文类型
interface ThemeContextType {
  // 当前主题
  currentTheme: ThemeConfig;
  
  // 设计令牌
  designTokens: DesignTokens;
  
  // 主题模式
  mode: 'light' | 'dark' | 'auto';
  
  // 切换主题模式
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  
  // 自定义主题
  customTheme: ThemeConfig | null;
  
  // 设置自定义主题
  setCustomTheme: (theme: ThemeConfig) => void;
  
  // 重置主题
  resetTheme: () => void;
  
  // 导出主题
  exportTheme: () => string;
  
  // 导入主题
  importTheme: (themeData: string) => boolean;
  
  // 主题预设
  themePresets: Record<string, ThemeConfig>;
  
  // 应用主题预设
  applyThemePreset: (presetName: string) => void;
  
  // 设计令牌生成器
  tokenGenerator: DesignTokenGenerator;
}

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题预设
const themePresets: Record<string, ThemeConfig> = {
  light: defaultTheme,
  dark: darkTheme,
  
  // 蓝色主题
  blue: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      brand: '#3b82f6',
      accent: '#8b5cf6',
      link: '#3b82f6',
    },
  },
  
  // 绿色主题
  green: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#10b981',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      brand: '#10b981',
      accent: '#f59e0b',
      link: '#10b981',
    },
  },
  
  // 紫色主题
  purple: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#8b5cf6',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      brand: '#8b5cf6',
      accent: '#ec4899',
      link: '#8b5cf6',
    },
  },
  
  // 橙色主题
  orange: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#f97316',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      brand: '#f97316',
      accent: '#f59e0b',
      link: '#f97316',
    },
  },
  
  // 高对比度主题
  'high-contrast': {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      text: '#000000',
      textSecondary: '#333333',
      textDisabled: '#666666',
      textInverse: '#ffffff',
      background: '#ffffff',
      backgroundCard: '#ffffff',
      backgroundInput: '#ffffff',
      border: '#000000',
      borderLight: '#cccccc',
      borderFocus: '#000000',
    },
  },
  
  // 暖色主题
  warm: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#ea580c',
      secondary: '#78716c',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626',
      info: '#0891b2',
      brand: '#ea580c',
      accent: '#dc2626',
      link: '#ea580c',
      background: '#fef7ed',
      backgroundCard: '#fff7ed',
    },
  },
  
  // 冷色主题
  cool: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#0284c7',
      secondary: '#64748b',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#0891b2',
      brand: '#0284c7',
      accent: '#7c3aed',
      link: '#0284c7',
      background: '#f0f9ff',
      backgroundCard: '#e0f2fe',
    },
  },
};

// 主题提供者组件
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeConfig;
  initialMode?: 'light' | 'dark' | 'auto';
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  initialMode = 'light',
  storageKey = 'taro-uno-theme',
}) => {
  // 状态管理
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(initialTheme || defaultTheme);
  const [designTokens, _setDesignTokens] = useState<DesignTokens>(defaultDesignTokens);
  const [mode, setModeState] = useState<'light' | 'dark' | 'auto'>(initialMode);
  const [customTheme, setCustomTheme] = useState<ThemeConfig | null>(null);
  const [tokenGenerator] = useState(() => new DesignTokenGenerator(defaultDesignTokens));

  // 检测系统主题偏好
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return 'light';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // 获取当前有效的主题模式
  const getEffectiveMode = useCallback((): 'light' | 'dark' => {
    if (mode === 'auto') {
      return getSystemTheme();
    }
    return mode;
  }, [mode, getSystemTheme]);

  // 应用主题到DOM
  const applyThemeToDOM = useCallback((_theme: ThemeConfig, effectiveMode: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // 移除现有的主题类
    root.classList.remove('light-theme', 'dark-theme');
    
    // 应用新的主题类
    root.classList.add(`${effectiveMode}-theme`);
    
    // 设置data-theme属性
    root.setAttribute('data-theme', effectiveMode);
    
    // 应用CSS变量
    const cssVariables = tokenGenerator.generateCSSVariables();
    const darkCSSVariables = tokenGenerator.generateDarkThemeCSSVariables();
    
    // 移除现有的样式
    const existingStyle = document.getElementById('theme-variables');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // 添加新的样式
    const style = document.createElement('style');
    style.id = 'theme-variables';
    style.textContent = cssVariables + darkCSSVariables;
    document.head.appendChild(style);
  }, [tokenGenerator]);

  // 初始化主题
  useEffect(() => {
    // 从本地存储加载主题设置
    try {
      const savedMode = localStorage.getItem(`${storageKey}-mode`);
      const savedTheme = localStorage.getItem(`${storageKey}-config`);
      
      if (savedMode) {
        setModeState(savedMode as 'light' | 'dark' | 'auto');
      }
      
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setCustomTheme(parsedTheme);
        setCurrentTheme(parsedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  // 应用主题
  useEffect(() => {
    const effectiveMode = getEffectiveMode();
    const themeToApply = effectiveMode === 'dark' ? darkTheme : currentTheme;
    
    applyThemeToDOM(themeToApply, effectiveMode);
    
    // 保存到本地存储
    try {
      localStorage.setItem(`${storageKey}-mode`, mode);
      if (customTheme) {
        localStorage.setItem(`${storageKey}-config`, JSON.stringify(customTheme));
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [currentTheme, mode, customTheme, getEffectiveMode, applyThemeToDOM, storageKey]);

  // 监听系统主题变化
  useEffect(() => {
    if (mode !== 'auto') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const effectiveMode = getEffectiveMode();
      const themeToApply = effectiveMode === 'dark' ? darkTheme : currentTheme;
      applyThemeToDOM(themeToApply, effectiveMode);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, currentTheme, getEffectiveMode, applyThemeToDOM]);

  // 设置主题模式
  const setMode = useCallback((newMode: 'light' | 'dark' | 'auto') => {
    setModeState(newMode);
  }, []);

  // 设置自定义主题
  const applyCustomTheme = useCallback((theme: ThemeConfig) => {
    setCustomTheme(theme);
    setCurrentTheme(theme);
  }, []);

  // 重置主题
  const resetTheme = useCallback(() => {
    setCustomTheme(null);
    setCurrentTheme(defaultTheme);
    setModeState('light');
    
    try {
      localStorage.removeItem(`${storageKey}-mode`);
      localStorage.removeItem(`${storageKey}-config`);
    } catch (error) {
      console.warn('Failed to clear theme from localStorage:', error);
    }
  }, [storageKey]);

  // 导出主题
  const exportTheme = useCallback((): string => {
    const themeData = {
      currentTheme,
      customTheme,
      mode,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
    
    return JSON.stringify(themeData, null, 2);
  }, [currentTheme, customTheme, mode]);

  // 导入主题
  const importTheme = useCallback((themeData: string): boolean => {
    try {
      const parsed = JSON.parse(themeData);
      
      if (parsed.currentTheme) {
        setCustomTheme(parsed.currentTheme);
        setCurrentTheme(parsed.currentTheme);
      }
      
      if (parsed.mode) {
        setModeState(parsed.mode);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }, [setCustomTheme, setModeState]);

  // 应用主题预设
  const applyThemePreset = useCallback((presetName: string) => {
    const preset = themePresets[presetName];
    if (preset) {
      setCustomTheme(preset);
      setCurrentTheme(preset);
    }
  }, []);

  // 上下文值
  const contextValue: ThemeContextType = {
    currentTheme,
    designTokens,
    mode,
    setMode,
    customTheme,
    setCustomTheme: applyCustomTheme,
    resetTheme,
    exportTheme,
    importTheme,
    themePresets,
    applyThemePreset,
    tokenGenerator,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的Hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 主题切换器组件
interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showLabel = true,
}) => {
  const { mode, setMode } = useTheme();

  const toggleMode = () => {
    const modes: ('light' | 'dark' | 'auto')[] = ['light', 'dark', 'auto'];
    const currentIndex = modes.indexOf(mode || 'light');
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex] as 'light' | 'dark' | 'auto');
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
        return '🌗';
      default:
        return '🌞';
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'light':
        return '浅色';
      case 'dark':
        return '深色';
      case 'auto':
        return '自动';
      default:
        return '浅色';
    }
  };

  return (
    <button
      className={`theme-switcher ${className}`}
      onClick={toggleMode}
      title={`切换主题：${getModeLabel()}`}
    >
      <span className="theme-switcher-icon">{getModeIcon()}</span>
      {showLabel && <span className="theme-switcher-label">{getModeLabel()}</span>}
    </button>
  );
};

// 主题选择器组件
interface ThemeSelectorProps {
  className?: string;
  showPresets?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = '',
  showPresets = true,
}) => {
  const { themePresets, applyThemePreset, customTheme } = useTheme();

  const handlePresetChange = (presetName: string) => {
    applyThemePreset(presetName);
  };

  const getCurrentPreset = () => {
    if (customTheme) {
      // 检查是否是预设主题
      for (const [name, preset] of Object.entries(themePresets)) {
        if (JSON.stringify(preset) === JSON.stringify(customTheme)) {
          return name;
        }
      }
      return 'custom';
    }
    return 'light';
  };

  return (
    <div className={`theme-selector ${className}`}>
      {showPresets && (
        <select
          value={getCurrentPreset()}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="theme-selector-select"
        >
          <option value="light">浅色主题</option>
          <option value="dark">深色主题</option>
          <option value="blue">蓝色主题</option>
          <option value="green">绿色主题</option>
          <option value="purple">紫色主题</option>
          <option value="orange">橙色主题</option>
          <option value="warm">暖色主题</option>
          <option value="cool">冷色主题</option>
          <option value="high-contrast">高对比度</option>
          {customTheme && <option value="custom">自定义主题</option>}
        </select>
      )}
    </div>
  );
};

export default ThemeProvider;