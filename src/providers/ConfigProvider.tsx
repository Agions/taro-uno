/**
 * 配置 Provider
 * 提供全局配置上下文，包括 HTTP 配置、组件默认配置等
 * @module providers/ConfigProvider
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Size } from '../types/common';

// ==================== 类型定义 ====================

/**
 * HTTP 配置
 */
export interface HttpConfig {
  /**
   * 基础 URL
   * 用于解决跨域问题
   */
  baseURL?: string;

  /**
   * 默认超时时间（毫秒）
   * @default 30000
   */
  timeout?: number;

  /**
   * 默认请求头
   */
  headers?: Record<string, string>;

  /**
   * 是否携带凭证
   * @default false
   */
  withCredentials?: boolean;

  /**
   * 重试次数
   * @default 0
   */
  retryCount?: number;

  /**
   * 重试延迟（毫秒）
   * @default 1000
   */
  retryDelay?: number;
}

/**
 * 组件默认配置
 */
export interface ComponentConfig {
  /**
   * 默认尺寸
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否启用波纹效果
   * @default true
   */
  ripple?: boolean;

  /**
   * 是否启用动画
   * @default true
   */
  animation?: boolean;

  /**
   * 组件类名前缀
   * @default 'taro-uno'
   */
  classPrefix?: string;
}

/**
 * 国际化配置
 */
export interface LocaleConfig {
  /**
   * 语言代码
   * @default 'zh-CN'
   */
  locale?: string;

  /**
   * 是否为 RTL 布局
   * @default false
   */
  rtl?: boolean;
}

/**
 * 全局配置
 */
export interface GlobalConfig {
  /**
   * HTTP 配置
   */
  http?: HttpConfig;

  /**
   * 组件配置
   */
  component?: ComponentConfig;

  /**
   * 国际化配置
   */
  locale?: LocaleConfig;
}

/**
 * 配置上下文值
 */
export interface ConfigContextValue {
  /**
   * HTTP 配置
   */
  http: Required<HttpConfig>;

  /**
   * 组件配置
   */
  component: Required<ComponentConfig>;

  /**
   * 国际化配置
   */
  locale: Required<LocaleConfig>;

  /**
   * 获取配置值
   * @param path - 配置路径
   */
  getConfig: <T = unknown>(path: string) => T | undefined;
}

/**
 * ConfigProvider Props
 */
export interface ConfigProviderProps {
  /**
   * 子元素
   */
  children: ReactNode;

  /**
   * HTTP 配置
   */
  http?: HttpConfig;

  /**
   * 组件配置
   */
  component?: ComponentConfig;

  /**
   * 国际化配置
   */
  locale?: LocaleConfig;

  /**
   * 完整配置（优先级低于单独配置）
   */
  config?: GlobalConfig;
}

// ==================== 默认配置 ====================

/**
 * 默认 HTTP 配置
 */
const defaultHttpConfig: Required<HttpConfig> = {
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  retryCount: 0,
  retryDelay: 1000,
};

/**
 * 默认组件配置
 */
const defaultComponentConfig: Required<ComponentConfig> = {
  size: 'md',
  ripple: true,
  animation: true,
  classPrefix: 'taro-uno',
};

/**
 * 默认国际化配置
 */
const defaultLocaleConfig: Required<LocaleConfig> = {
  locale: 'zh-CN',
  rtl: false,
};

// ==================== 上下文 ====================

/**
 * 配置上下文
 */
const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// ==================== 工具函数 ====================

/**
 * 合并配置
 */
function mergeConfig<T extends Record<string, unknown>>(defaultConfig: T, userConfig?: Partial<T>): T {
  if (!userConfig) {
    return defaultConfig;
  }
  return { ...defaultConfig, ...userConfig };
}

/**
 * 根据路径获取配置值
 */
function getConfigByPath<T = unknown>(config: Record<string, unknown>, path: string): T | undefined {
  const keys = path.split('.');
  let value: unknown = config;

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
 * 配置 Provider 组件
 *
 * @example
 * ```tsx
 * import { ConfigProvider } from 'taro-uno-ui';
 *
 * function App() {
 *   return (
 *     <ConfigProvider
 *       http={{
 *         baseURL: 'https://api.example.com',
 *         timeout: 10000,
 *       }}
 *       component={{
 *         size: 'md',
 *         ripple: true,
 *       }}
 *     >
 *       <YourApp />
 *     </ConfigProvider>
 *   );
 * }
 * ```
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, http, component, locale, config }) => {
  // 合并配置
  const mergedHttpConfig = useMemo(() => {
    const baseConfig = config?.http || {};
    const finalConfig = http || baseConfig;
    return mergeConfig(defaultHttpConfig, finalConfig);
  }, [http, config?.http]);

  const mergedComponentConfig = useMemo(() => {
    const baseConfig = config?.component || {};
    const finalConfig = component || baseConfig;
    return mergeConfig(defaultComponentConfig, finalConfig);
  }, [component, config?.component]);

  const mergedLocaleConfig = useMemo(() => {
    const baseConfig = config?.locale || {};
    const finalConfig = locale || baseConfig;
    return mergeConfig(defaultLocaleConfig, finalConfig);
  }, [locale, config?.locale]);

  // 获取配置值
  const getConfig = useMemo(() => {
    const fullConfig = {
      http: mergedHttpConfig,
      component: mergedComponentConfig,
      locale: mergedLocaleConfig,
    };

    return <T = unknown,>(path: string): T | undefined => {
      return getConfigByPath<T>(fullConfig, path);
    };
  }, [mergedHttpConfig, mergedComponentConfig, mergedLocaleConfig]);

  // 上下文值
  const contextValue = useMemo<ConfigContextValue>(
    () => ({
      http: mergedHttpConfig,
      component: mergedComponentConfig,
      locale: mergedLocaleConfig,
      getConfig,
    }),
    [mergedHttpConfig, mergedComponentConfig, mergedLocaleConfig, getConfig],
  );

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

// ==================== Hooks ====================

/**
 * 使用配置上下文
 *
 * @returns 配置上下文值
 * @throws 如果在 ConfigProvider 外部使用则抛出错误
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { http, component } = useConfigContext();
 *
 *   console.log('Base URL:', http.baseURL);
 *   console.log('Default size:', component.size);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useConfigContext(): ConfigContextValue {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
}

/**
 * 使用 HTTP 配置
 *
 * @returns HTTP 配置
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const httpConfig = useHttpConfig();
 *
 *   const fetchData = async () => {
 *     const response = await fetch(`${httpConfig.baseURL}/api/data`, {
 *       headers: httpConfig.headers,
 *     });
 *     return response.json();
 *   };
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useHttpConfig(): Required<HttpConfig> {
  const context = useContext(ConfigContext);
  return context?.http ?? defaultHttpConfig;
}

/**
 * 使用组件配置
 *
 * @returns 组件配置
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const componentConfig = useComponentConfig();
 *
 *   return (
 *     <div className={`${componentConfig.classPrefix}-my-component`}>
 *       ...
 *     </div>
 *   );
 * }
 * ```
 */
export function useComponentConfig(): Required<ComponentConfig> {
  const context = useContext(ConfigContext);
  return context?.component ?? defaultComponentConfig;
}

/**
 * 使用国际化配置
 *
 * @returns 国际化配置
 */
export function useLocaleConfig(): Required<LocaleConfig> {
  const context = useContext(ConfigContext);
  return context?.locale ?? defaultLocaleConfig;
}

/**
 * 使用类名前缀
 *
 * @returns 类名前缀
 */
export function useClassPrefix(): string {
  const componentConfig = useComponentConfig();
  return componentConfig.classPrefix;
}

// ==================== 导出 ====================

export default ConfigProvider;
