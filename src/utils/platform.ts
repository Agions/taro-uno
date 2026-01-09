/**
 * 平台检测工具
 * 提供跨平台检测和适配功能
 */

import {
  detectPlatform,
  detectPlatformType,
  clearPlatformCache,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isHarmony,
  getPlatformType,
} from '../platform/detector';
import type { PlatformType, PlatformInfo } from '../platform/types';

// ==================== 重新导出核心函数 ====================

export {
  detectPlatform,
  detectPlatformType,
  clearPlatformCache,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isHarmony,
  getPlatformType,
};

export type { PlatformType, PlatformInfo };

// ==================== 扩展工具函数 ====================

/**
 * 平台特定值选择器
 * 根据当前平台返回对应的值
 *
 * @example
 * ```typescript
 * const fontSize = selectByPlatform({
 *   weapp: 14,
 *   h5: 16,
 *   rn: 15,
 *   default: 14,
 * });
 * ```
 */
export function selectByPlatform<T>(options: Partial<Record<PlatformType | 'default', T>>): T | undefined {
  const platform = getPlatformType();
  return options[platform] ?? options.default;
}

/**
 * 条件执行平台特定代码
 *
 * @example
 * ```typescript
 * runOnPlatform('weapp', () => {
 *   // 仅在微信小程序中执行
 * });
 * ```
 */
export function runOnPlatform(platform: PlatformType | PlatformType[], fn: () => void): void {
  const currentPlatform = getPlatformType();
  const platforms = Array.isArray(platform) ? platform : [platform];

  if (platforms.includes(currentPlatform)) {
    fn();
  }
}

/**
 * 条件执行平台特定代码（异步版本）
 *
 * @example
 * ```typescript
 * await runOnPlatformAsync('h5', async () => {
 *   // 仅在 H5 中执行
 * });
 * ```
 */
export async function runOnPlatformAsync<T>(
  platform: PlatformType | PlatformType[],
  fn: () => Promise<T>,
): Promise<T | undefined> {
  const currentPlatform = getPlatformType();
  const platforms = Array.isArray(platform) ? platform : [platform];

  if (platforms.includes(currentPlatform)) {
    return fn();
  }
  return undefined;
}

/**
 * 判断是否为移动端环境
 */
export function isMobile(): boolean {
  const info = detectPlatform();

  // 小程序和 RN 都是移动端
  if (info.isMiniProgram || info.isRN) {
    return true;
  }

  // H5 环境下通过 UA 或屏幕宽度判断
  if (info.isH5 && typeof window !== 'undefined') {
    const ua = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'windows phone'];
    if (mobileKeywords.some(keyword => ua.includes(keyword))) {
      return true;
    }
    // 屏幕宽度小于 768px 视为移动端
    return window.innerWidth < 768;
  }

  return false;
}

/**
 * 判断是否为桌面端环境
 */
export function isDesktop(): boolean {
  return !isMobile();
}

/**
 * 判断是否为 iOS 系统
 */
export function isIOS(): boolean {
  const info = detectPlatform();

  if (info.system?.platform) {
    return info.system.platform.toLowerCase() === 'ios';
  }

  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
  }

  return false;
}

/**
 * 判断是否为 Android 系统
 */
export function isAndroid(): boolean {
  const info = detectPlatform();

  if (info.system?.platform) {
    return info.system.platform.toLowerCase() === 'android';
  }

  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('android');
  }

  return false;
}

/**
 * 判断是否为微信环境（包括微信小程序和微信内置浏览器）
 */
export function isWechat(): boolean {
  const platform = getPlatformType();

  if (platform === 'weapp') {
    return true;
  }

  if (platform === 'h5' && typeof navigator !== 'undefined') {
    return /micromessenger/i.test(navigator.userAgent);
  }

  return false;
}

/**
 * 判断是否为支付宝环境（包括支付宝小程序和支付宝内置浏览器）
 */
export function isAlipay(): boolean {
  const platform = getPlatformType();

  if (platform === 'alipay') {
    return true;
  }

  if (platform === 'h5' && typeof navigator !== 'undefined') {
    return /alipay/i.test(navigator.userAgent);
  }

  return false;
}

/**
 * 获取屏幕信息
 */
export function getScreenInfo(): {
  width: number;
  height: number;
  pixelRatio: number;
} {
  const info = detectPlatform();

  if (info.system) {
    return {
      width: info.system.screenWidth ?? 0,
      height: info.system.screenHeight ?? 0,
      pixelRatio: info.system.pixelRatio ?? 1,
    };
  }

  if (typeof window !== 'undefined') {
    return {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio || 1,
    };
  }

  return { width: 0, height: 0, pixelRatio: 1 };
}

/**
 * 获取安全区域信息
 */
export function getSafeArea(): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  const info = detectPlatform();

  if (info.system?.safeArea) {
    return {
      top: info.system.safeArea.top,
      bottom: info.system.safeArea.bottom,
      left: info.system.safeArea.left,
      right: info.system.safeArea.right,
    };
  }

  // 默认安全区域
  return { top: 0, bottom: 0, left: 0, right: 0 };
}

/**
 * 判断是否支持某个特性
 */
export function supportsFeature(feature: string): boolean {
  const platform = getPlatformType();

  // 特性支持矩阵
  const featureMatrix: Record<string, PlatformType[]> = {
    // 存储相关
    localStorage: ['h5'],
    sessionStorage: ['h5'],
    taroStorage: ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],

    // 网络相关
    fetch: ['h5', 'rn'],
    taroRequest: ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],
    websocket: ['h5', 'weapp', 'alipay', 'rn'],

    // 媒体相关
    camera: ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],
    audio: ['h5', 'weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],
    video: ['h5', 'weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],

    // 设备相关
    vibrate: ['h5', 'weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],
    clipboard: ['h5', 'weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],
    geolocation: ['h5', 'weapp', 'alipay', 'swan', 'tt', 'qq', 'jd', 'rn', 'harmony'],

    // 支付相关
    wechatPay: ['weapp'],
    alipayPay: ['alipay'],

    // 分享相关
    share: ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'],
  };

  const supportedPlatforms = featureMatrix[feature];
  if (!supportedPlatforms) {
    return false;
  }

  return supportedPlatforms.includes(platform);
}

/**
 * 创建平台适配器
 * 用于创建跨平台兼容的函数
 *
 * @example
 * ```typescript
 * const showToast = createPlatformAdapter({
 *   weapp: (msg) => Taro.showToast({ title: msg }),
 *   h5: (msg) => alert(msg),
 *   default: (msg) => console.log(msg),
 * });
 * ```
 */
export function createPlatformAdapter<T extends (...args: unknown[]) => unknown>(
  adapters: Partial<Record<PlatformType | 'default', T>>,
): T {
  const platform = getPlatformType();
  const adapter = adapters[platform] ?? adapters.default;

  if (!adapter) {
    throw new Error(`No adapter found for platform: ${platform}`);
  }

  return adapter;
}

// ==================== 默认导出 ====================

export default {
  detectPlatform,
  detectPlatformType,
  clearPlatformCache,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isHarmony,
  getPlatformType,
  selectByPlatform,
  runOnPlatform,
  runOnPlatformAsync,
  isMobile,
  isDesktop,
  isIOS,
  isAndroid,
  isWechat,
  isAlipay,
  getScreenInfo,
  getSafeArea,
  supportsFeature,
  createPlatformAdapter,
};
