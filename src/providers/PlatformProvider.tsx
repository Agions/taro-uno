/**
 * 平台 Provider
 * 提供平台上下文，包括平台检测、能力查询等
 * @module providers/PlatformProvider
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { PlatformType, PlatformInfo, PlatformCapabilities, PlatformConfig } from '../platform/types';
import { DEFAULT_PLATFORM_CAPABILITIES, DEFAULT_PLATFORM_CONFIG } from '../platform/types';
import { detectPlatform, clearPlatformCache } from '../platform/detector';

// ==================== 类型定义 ====================

/**
 * 平台上下文值
 */
export interface PlatformContextValue {
  /**
   * 平台类型
   */
  type: PlatformType;

  /**
   * 平台信息
   */
  info: PlatformInfo;

  /**
   * 平台能力
   */
  capabilities: PlatformCapabilities;

  /**
   * 平台配置
   */
  config: PlatformConfig;

  /**
   * 是否为小程序
   */
  isMiniProgram: boolean;

  /**
   * 是否为 H5
   */
  isH5: boolean;

  /**
   * 是否为 React Native
   */
  isRN: boolean;

  /**
   * 是否为鸿蒙
   */
  isHarmony: boolean;

  /**
   * 检查平台能力
   * @param capability - 能力名称
   */
  hasCapability: (capability: keyof PlatformCapabilities) => boolean;

  /**
   * 刷新平台信息
   */
  refresh: () => void;
}

/**
 * PlatformProvider Props
 */
export interface PlatformProviderProps {
  /**
   * 子元素
   */
  children: ReactNode;

  /**
   * 自定义平台配置
   */
  config?: Partial<PlatformConfig>;

  /**
   * 平台信息变化回调
   */
  onPlatformChange?: (info: PlatformInfo) => void;
}

// ==================== 上下文 ====================

/**
 * 平台上下文
 */
const PlatformContext = createContext<PlatformContextValue | undefined>(undefined);

// ==================== Provider 组件 ====================

/**
 * 平台 Provider 组件
 *
 * @example
 * ```tsx
 * import { PlatformProvider } from 'taro-uno-ui';
 *
 * function App() {
 *   return (
 *     <PlatformProvider>
 *       <YourApp />
 *     </PlatformProvider>
 *   );
 * }
 * ```
 */
export const PlatformProvider: React.FC<PlatformProviderProps> = ({
  children,
  config: customConfig,
  onPlatformChange,
}) => {
  // 状态
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>(() => detectPlatform());

  // 平台类型
  const platformType = platformInfo.type;

  // 平台能力
  const capabilities = useMemo(() => {
    return DEFAULT_PLATFORM_CAPABILITIES[platformType] || DEFAULT_PLATFORM_CAPABILITIES.unknown;
  }, [platformType]);

  // 平台配置
  const config = useMemo(() => {
    const defaultConfig = DEFAULT_PLATFORM_CONFIG[platformType] || DEFAULT_PLATFORM_CONFIG.unknown;
    if (customConfig) {
      return { ...defaultConfig, ...customConfig };
    }
    return defaultConfig;
  }, [platformType, customConfig]);

  // 检查平台能力
  const hasCapability = useCallback(
    (capability: keyof PlatformCapabilities): boolean => {
      return capabilities[capability] ?? false;
    },
    [capabilities],
  );

  // 刷新平台信息
  const refresh = useCallback((): void => {
    clearPlatformCache();
    const newInfo = detectPlatform(true);
    setPlatformInfo(newInfo);
  }, []);

  // 平台信息变化回调
  useEffect(() => {
    onPlatformChange?.(platformInfo);
  }, [platformInfo, onPlatformChange]);

  // 上下文值
  const contextValue = useMemo<PlatformContextValue>(
    () => ({
      type: platformType,
      info: platformInfo,
      capabilities,
      config,
      isMiniProgram: platformInfo.isMiniProgram,
      isH5: platformInfo.isH5,
      isRN: platformInfo.isRN,
      isHarmony: platformInfo.isHarmony,
      hasCapability,
      refresh,
    }),
    [platformType, platformInfo, capabilities, config, hasCapability, refresh],
  );

  return <PlatformContext.Provider value={contextValue}>{children}</PlatformContext.Provider>;
};

// ==================== Hooks ====================

/**
 * 使用平台上下文
 *
 * @returns 平台上下文值
 * @throws 如果在 PlatformProvider 外部使用则抛出错误
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { type, isMiniProgram, hasCapability } = usePlatformContext();
 *
 *   if (hasCapability('payment')) {
 *     // 显示支付按钮
 *   }
 *
 *   return <div>Platform: {type}</div>;
 * }
 * ```
 */
export function usePlatformContext(): PlatformContextValue {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatformContext must be used within a PlatformProvider');
  }
  return context;
}

/**
 * 使用平台信息
 *
 * @returns 平台信息
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const platformInfo = usePlatformInfo();
 *
 *   return (
 *     <div>
 *       <p>Platform: {platformInfo.type}</p>
 *       <p>Is Mini Program: {platformInfo.isMiniProgram ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePlatformInfo(): PlatformInfo {
  const context = useContext(PlatformContext);
  if (context) {
    return context.info;
  }
  // 如果没有 Provider，直接检测平台
  return detectPlatform();
}

/**
 * 使用平台类型
 *
 * @returns 平台类型
 */
export function usePlatformType(): PlatformType {
  const info = usePlatformInfo();
  return info.type;
}

/**
 * 使用平台能力
 *
 * @returns 平台能力
 */
export function usePlatformCapabilities(): PlatformCapabilities {
  const context = useContext(PlatformContext);
  if (context) {
    return context.capabilities;
  }
  const info = detectPlatform();
  return DEFAULT_PLATFORM_CAPABILITIES[info.type] || DEFAULT_PLATFORM_CAPABILITIES.unknown;
}

/**
 * 使用平台配置
 *
 * @returns 平台配置
 */
export function usePlatformConfig(): PlatformConfig {
  const context = useContext(PlatformContext);
  if (context) {
    return context.config;
  }
  const info = detectPlatform();
  return DEFAULT_PLATFORM_CONFIG[info.type] || DEFAULT_PLATFORM_CONFIG.unknown;
}

/**
 * 检查是否为特定平台
 *
 * @param platform - 目标平台
 * @returns 是否为指定平台
 */
export function useIsPlatform(platform: PlatformType): boolean {
  const info = usePlatformInfo();
  return info.type === platform;
}

/**
 * 检查平台能力
 *
 * @param capability - 能力名称
 * @returns 是否支持该能力
 */
export function useHasCapability(capability: keyof PlatformCapabilities): boolean {
  const capabilities = usePlatformCapabilities();
  return capabilities[capability] ?? false;
}

// ==================== 导出 ====================

export default PlatformProvider;
