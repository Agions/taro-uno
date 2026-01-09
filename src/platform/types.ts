/**
 * 平台类型定义
 * 提供跨平台开发的类型定义
 * @module platform/types
 */

// ==================== 平台类型 ====================

/**
 * 平台类型
 * @description 定义支持的运行平台
 * - `weapp` - 微信小程序
 * - `alipay` - 支付宝小程序
 * - `swan` - 百度小程序
 * - `tt` - 字节跳动小程序
 * - `qq` - QQ小程序
 * - `jd` - 京东小程序
 * - `h5` - H5/Web
 * - `rn` - React Native
 * - `harmony` - 鸿蒙 OS
 * - `unknown` - 未知平台
 */
export type PlatformType =
  | 'weapp'
  | 'alipay'
  | 'swan'
  | 'tt'
  | 'qq'
  | 'jd'
  | 'h5'
  | 'rn'
  | 'harmony'
  | 'unknown';

/**
 * 小程序平台类型
 * @description 所有小程序平台的联合类型
 */
export type MiniProgramPlatform = 'weapp' | 'alipay' | 'swan' | 'tt' | 'qq' | 'jd';

/**
 * 判断是否为小程序平台
 * @param platform 平台类型
 * @returns 是否为小程序平台
 */
export function isMiniProgramPlatform(platform: PlatformType): platform is MiniProgramPlatform {
  return ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'].includes(platform);
}

// ==================== 系统信息类型 ====================

/**
 * 系统信息接口
 * @description 描述设备系统的详细信息
 */
export interface SystemInfo {
  /** 设备品牌 */
  brand?: string;
  /** 设备型号 */
  model?: string;
  /** 操作系统平台 */
  platform?: string;
  /** 操作系统版本 */
  version?: string;
  /** 系统语言 */
  language?: string;
  /** 屏幕宽度 */
  screenWidth?: number;
  /** 屏幕高度 */
  screenHeight?: number;
  /** 可使用窗口宽度 */
  windowWidth?: number;
  /** 可使用窗口高度 */
  windowHeight?: number;
  /** 设备像素比 */
  pixelRatio?: number;
  /** 状态栏高度 */
  statusBarHeight?: number;
  /** 安全区域 */
  safeArea?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
  };
}

// ==================== 平台信息类型 ====================

/**
 * 平台信息接口
 * @description 描述当前运行平台的详细信息
 */
export interface PlatformInfo {
  /** 平台类型 */
  type: PlatformType;
  /** 是否为小程序 */
  isMiniProgram: boolean;
  /** 是否为 H5 */
  isH5: boolean;
  /** 是否为 React Native */
  isRN: boolean;
  /** 是否为鸿蒙 */
  isHarmony: boolean;
  /** SDK 版本 */
  SDKVersion?: string;
  /** 应用版本号 */
  version?: string;
  /** 系统信息 */
  system?: SystemInfo;
}

// ==================== 平台能力类型 ====================

/**
 * 平台能力接口
 * @description 描述平台支持的能力
 */
export interface PlatformCapabilities {
  /** 是否支持存储 */
  storage: boolean;
  /** 是否支持网络请求 */
  request: boolean;
  /** 是否支持导航 */
  navigation: boolean;
  /** 是否支持剪贴板 */
  clipboard: boolean;
  /** 是否支持扫码 */
  scan: boolean;
  /** 是否支持支付 */
  payment: boolean;
  /** 是否支持分享 */
  share: boolean;
  /** 是否支持生物识别 */
  biometrics: boolean;
  /** 是否支持位置服务 */
  location: boolean;
  /** 是否支持相机 */
  camera: boolean;
  /** 是否支持文件操作 */
  file: boolean;
  /** 是否支持振动 */
  vibrate: boolean;
}

/**
 * 默认平台能力配置
 */
export const DEFAULT_PLATFORM_CAPABILITIES: Record<PlatformType, PlatformCapabilities> = {
  weapp: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: true,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  alipay: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: true,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  swan: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: false,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  tt: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: false,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  qq: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: false,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  jd: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: false,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  h5: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: false,
    payment: false,
    share: true,
    biometrics: false,
    location: true,
    camera: true,
    file: false,
    vibrate: true,
  },
  rn: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: true,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  harmony: {
    storage: true,
    request: true,
    navigation: true,
    clipboard: true,
    scan: true,
    payment: true,
    share: true,
    biometrics: true,
    location: true,
    camera: true,
    file: true,
    vibrate: true,
  },
  unknown: {
    storage: false,
    request: false,
    navigation: false,
    clipboard: false,
    scan: false,
    payment: false,
    share: false,
    biometrics: false,
    location: false,
    camera: false,
    file: false,
    vibrate: false,
  },
};

// ==================== 平台配置类型 ====================

/**
 * 平台配置接口
 * @description 平台相关的配置选项
 */
export interface PlatformConfig {
  /** 默认单位 */
  defaultUnit: 'px' | 'rpx' | 'rem';
  /** 设计稿宽度（用于单位转换） */
  designWidth: number;
  /** 设备像素比 */
  devicePixelRatio: number;
  /** 根字体大小（用于 rem 计算） */
  rootFontSize: number;
}

/**
 * 默认平台配置
 */
export const DEFAULT_PLATFORM_CONFIG: Record<PlatformType, PlatformConfig> = {
  weapp: {
    defaultUnit: 'rpx',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  alipay: {
    defaultUnit: 'rpx',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  swan: {
    defaultUnit: 'rpx',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  tt: {
    defaultUnit: 'rpx',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  qq: {
    defaultUnit: 'rpx',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  jd: {
    defaultUnit: 'rpx',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  h5: {
    defaultUnit: 'px',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  rn: {
    defaultUnit: 'px',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  harmony: {
    defaultUnit: 'px',
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
  },
  unknown: {
    defaultUnit: 'px',
    designWidth: 750,
    devicePixelRatio: 1,
    rootFontSize: 16,
  },
};
