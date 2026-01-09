/**
 * 平台检测器
 * 提供跨平台检测功能
 * @module platform/detector
 */

import Taro from '@tarojs/taro';
import type { PlatformType, PlatformInfo, SystemInfo } from './types';
import { isMiniProgramPlatform } from './types';

// ==================== 全局类型声明 ====================

// 注意：Window 接口的扩展已在 platform/index.ts 中声明
// 这里只声明鸿蒙相关的全局变量
declare global {

  var ohosApplication: unknown;
}

// ==================== 平台检测缓存 ====================

let cachedPlatformInfo: PlatformInfo | null = null;

// ==================== 平台检测函数 ====================

/**
 * 检测当前平台类型
 * @returns 平台类型
 */
export function detectPlatformType(): PlatformType {
  try {
    const env = Taro.getEnv();

    switch (env) {
      case Taro.ENV_TYPE.WEAPP:
        return 'weapp';
      case Taro.ENV_TYPE.ALIPAY:
        return 'alipay';
      case Taro.ENV_TYPE.SWAN:
        return 'swan';
      case Taro.ENV_TYPE.TT:
        return 'tt';
      case Taro.ENV_TYPE.QQ:
        return 'qq';
      case Taro.ENV_TYPE.JD:
        return 'jd';
      case Taro.ENV_TYPE.WEB:
        return 'h5';
      case Taro.ENV_TYPE.RN:
        return 'rn';
      default:
        // 检测鸿蒙
        if (isHarmonyEnvironment()) {
          return 'harmony';
        }
        // 尝试通过全局对象检测
        return detectPlatformByGlobal();
    }
  } catch {
    // Taro.getEnv() 可能在某些环境下不可用
    return detectPlatformByGlobal();
  }
}

/**
 * 检测是否为鸿蒙环境
 * @returns 是否为鸿蒙环境
 */
function isHarmonyEnvironment(): boolean {
  try {
    // 检测鸿蒙特有的全局对象
    if (typeof globalThis !== 'undefined' && 'ohosApplication' in globalThis) {
      return true;
    }
    // 检测鸿蒙的 ArkTS 环境
    if (typeof globalThis !== 'undefined' && (globalThis as Record<string, unknown>)['__arkts__'] !== undefined) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * 通过全局对象检测平台
 * @returns 平台类型
 */
function detectPlatformByGlobal(): PlatformType {
  // 检测小程序环境
  if (typeof window !== 'undefined') {
    if (window.wx && typeof window.wx.getSystemInfo === 'function') {
      return 'weapp';
    }
    if (window.my && typeof window.my.getSystemInfo === 'function') {
      return 'alipay';
    }
    if (window.swan && typeof window.swan.getSystemInfo === 'function') {
      return 'swan';
    }
    if (window.tt && typeof window.tt.getSystemInfo === 'function') {
      return 'tt';
    }
    if (window.qq && typeof window.qq.getSystemInfo === 'function') {
      return 'qq';
    }
    if (window.jd && typeof window.jd.getSystemInfo === 'function') {
      return 'jd';
    }
  }

  // 检测 React Native 环境
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return 'rn';
  }

  // 检测 H5 环境
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'h5';
  }

  return 'unknown';
}

/**
 * 获取系统信息
 * @returns 系统信息
 */
function getSystemInfo(): SystemInfo | undefined {
  try {
    const info = Taro.getSystemInfoSync();
    return {
      brand: info.brand,
      model: info.model,
      platform: info.platform,
      version: info.system,
      language: info.language,
      screenWidth: info.screenWidth,
      screenHeight: info.screenHeight,
      windowWidth: info.windowWidth,
      windowHeight: info.windowHeight,
      pixelRatio: info.pixelRatio,
      statusBarHeight: info.statusBarHeight,
      safeArea: info.safeArea ? {
        top: info.safeArea.top,
        bottom: info.safeArea.bottom,
        left: info.safeArea.left,
        right: info.safeArea.right,
        width: info.safeArea.width,
        height: info.safeArea.height,
      } : undefined,
    };
  } catch {
    // 在某些环境下可能无法获取系统信息
    return undefined;
  }
}

/**
 * 获取 SDK 版本
 * @param platformType 平台类型
 * @returns SDK 版本
 */
function getSDKVersion(platformType: PlatformType): string | undefined {
  if (!isMiniProgramPlatform(platformType)) {
    return undefined;
  }

  try {
    if (platformType === 'weapp') {
      const accountInfo = Taro.getAccountInfoSync();
      const miniProgram = accountInfo.miniProgram as unknown as Record<string, unknown>;
      return miniProgram['sdkVersion'] as string | undefined;
    }
    // 其他小程序平台的 SDK 版本获取方式可能不同
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * 获取应用版本
 * @param platformType 平台类型
 * @returns 应用版本
 */
function getAppVersion(platformType: PlatformType): string | undefined {
  if (!isMiniProgramPlatform(platformType)) {
    return undefined;
  }

  try {
    if (platformType === 'weapp') {
      const accountInfo = Taro.getAccountInfoSync();
      return accountInfo.miniProgram.version;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

// ==================== 主要导出函数 ====================

/**
 * 检测当前平台
 * @param forceRefresh 是否强制刷新缓存
 * @returns 平台信息
 */
export function detectPlatform(forceRefresh = false): PlatformInfo {
  // 使用缓存
  if (cachedPlatformInfo && !forceRefresh) {
    return cachedPlatformInfo;
  }

  const type = detectPlatformType();
  const isMiniProgram = isMiniProgramPlatform(type);

  const platformInfo: PlatformInfo = {
    type,
    isMiniProgram,
    isH5: type === 'h5',
    isRN: type === 'rn',
    isHarmony: type === 'harmony',
    SDKVersion: getSDKVersion(type),
    version: getAppVersion(type),
    system: getSystemInfo(),
  };

  // 缓存结果
  cachedPlatformInfo = platformInfo;

  return platformInfo;
}

/**
 * 清除平台检测缓存
 * @description 主要用于测试或需要重新检测平台的场景
 */
export function clearPlatformCache(): void {
  cachedPlatformInfo = null;
}

/**
 * 判断当前是否为指定平台
 * @param platform 目标平台
 * @returns 是否为指定平台
 */
export function isPlatform(platform: PlatformType): boolean {
  return detectPlatform().type === platform;
}

/**
 * 判断当前是否为小程序环境
 * @returns 是否为小程序环境
 */
export function isMiniProgram(): boolean {
  return detectPlatform().isMiniProgram;
}

/**
 * 判断当前是否为 H5 环境
 * @returns 是否为 H5 环境
 */
export function isH5(): boolean {
  return detectPlatform().isH5;
}

/**
 * 判断当前是否为 React Native 环境
 * @returns 是否为 React Native 环境
 */
export function isRN(): boolean {
  return detectPlatform().isRN;
}

/**
 * 判断当前是否为鸿蒙环境
 * @returns 是否为鸿蒙环境
 */
export function isHarmony(): boolean {
  return detectPlatform().isHarmony;
}

/**
 * 获取当前平台类型
 * @returns 平台类型
 */
export function getPlatformType(): PlatformType {
  return detectPlatform().type;
}
