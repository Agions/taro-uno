/**
 * usePlatform Hook
 * 平台信息 Hook，提供获取当前平台信息的功能
 *
 * @example
 * ```typescript
 * const { platform, isMiniProgram, isH5, isRN, isHarmony } = usePlatform();
 *
 * if (isMiniProgram) {
 *   // 小程序特定逻辑
 * }
 *
 * if (isH5) {
 *   // H5 特定逻辑
 * }
 * ```
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  detectPlatform,
  isPlatform,
  clearPlatformCache,
} from '../../platform/detector';
import type {
  PlatformType,
  PlatformInfo,
  PlatformCapabilities,
  PlatformConfig,
} from '../../platform/types';
import {
  DEFAULT_PLATFORM_CAPABILITIES,
  DEFAULT_PLATFORM_CONFIG,
} from '../../platform/types';

/**
 * usePlatform Hook 返回类型
 */
export interface UsePlatformReturn {
  /** 平台信息 */
  platform: PlatformInfo;
  /** 平台类型 */
  platformType: PlatformType;
  /** 是否为小程序 */
  isMiniProgram: boolean;
  /** 是否为 H5 */
  isH5: boolean;
  /** 是否为 React Native */
  isRN: boolean;
  /** 是否为鸿蒙 */
  isHarmony: boolean;
  /** 是否为微信小程序 */
  isWeapp: boolean;
  /** 是否为支付宝小程序 */
  isAlipay: boolean;
  /** 是否为百度小程序 */
  isSwan: boolean;
  /** 是否为字节跳动小程序 */
  isTT: boolean;
  /** 是否为 QQ 小程序 */
  isQQ: boolean;
  /** 是否为京东小程序 */
  isJD: boolean;
  /** 平台能力 */
  capabilities: PlatformCapabilities;
  /** 平台配置 */
  config: PlatformConfig;
  /** 检查是否为指定平台 */
  checkPlatform: (platform: PlatformType) => boolean;
  /** 检查平台是否支持某能力 */
  hasCapability: (capability: keyof PlatformCapabilities) => boolean;
  /** 刷新平台信息 */
  refresh: () => void;
}

/**
 * 平台信息 Hook
 *
 * 提供当前运行平台的详细信息和能力检测
 *
 * @returns 平台相关状态和方法
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { platform, isMiniProgram, isH5, hasCapability } = usePlatform();
 *
 *   // 根据平台显示不同内容
 *   if (isMiniProgram) {
 *     return <MiniProgramView />;
 *   }
 *
 *   // 检查平台能力
 *   if (hasCapability('scan')) {
 *     return <ScanButton />;
 *   }
 *
 *   return <WebView />;
 * }
 * ```
 */
export function usePlatform(): UsePlatformReturn {
  const [platform, setPlatform] = useState<PlatformInfo>(() => detectPlatform());

  // 初始化时检测平台
  useEffect(() => {
    const info = detectPlatform();
    setPlatform(info);
  }, []);

  /**
   * 平台类型
   */
  const platformType = platform.type;

  /**
   * 平台能力
   */
  const capabilities = useMemo<PlatformCapabilities>(() => {
    return DEFAULT_PLATFORM_CAPABILITIES[platformType] ?? DEFAULT_PLATFORM_CAPABILITIES.unknown;
  }, [platformType]);

  /**
   * 平台配置
   */
  const config = useMemo<PlatformConfig>(() => {
    return DEFAULT_PLATFORM_CONFIG[platformType] ?? DEFAULT_PLATFORM_CONFIG.unknown;
  }, [platformType]);

  /**
   * 检查是否为指定平台
   */
  const checkPlatform = useCallback(
    (targetPlatform: PlatformType): boolean => {
      return isPlatform(targetPlatform);
    },
    [],
  );

  /**
   * 检查平台是否支持某能力
   */
  const hasCapability = useCallback(
    (capability: keyof PlatformCapabilities): boolean => {
      return capabilities[capability] ?? false;
    },
    [capabilities],
  );

  /**
   * 刷新平台信息
   */
  const refresh = useCallback(() => {
    clearPlatformCache();
    const info = detectPlatform(true);
    setPlatform(info);
  }, []);

  return {
    platform,
    platformType,
    isMiniProgram: platform.isMiniProgram,
    isH5: platform.isH5,
    isRN: platform.isRN,
    isHarmony: platform.isHarmony,
    isWeapp: platformType === 'weapp',
    isAlipay: platformType === 'alipay',
    isSwan: platformType === 'swan',
    isTT: platformType === 'tt',
    isQQ: platformType === 'qq',
    isJD: platformType === 'jd',
    capabilities,
    config,
    checkPlatform,
    hasCapability,
    refresh,
  };
}

/**
 * 检查是否为 H5 平台
 * @returns 是否为 H5 平台
 */
export function useIsH5(): boolean {
  const { isH5 } = usePlatform();
  return isH5;
}

/**
 * 检查是否为小程序平台
 * @returns 是否为小程序平台
 */
export function useIsMiniProgram(): boolean {
  const { isMiniProgram } = usePlatform();
  return isMiniProgram;
}

/**
 * 检查是否为 React Native 平台
 * @returns 是否为 React Native 平台
 */
export function useIsReactNative(): boolean {
  const { isRN } = usePlatform();
  return isRN;
}

/**
 * 检查是否为鸿蒙平台
 * @returns 是否为鸿蒙平台
 */
export function useIsHarmony(): boolean {
  const { isHarmony } = usePlatform();
  return isHarmony;
}

export default usePlatform;
