/**
 * 平台适配器
 * 提供跨平台适配器接口和工厂
 * @module platform/adapter
 */

import type {
  PlatformType,
  PlatformInfo,
  PlatformCapabilities,
  PlatformConfig,
} from './types';
import {
  DEFAULT_PLATFORM_CAPABILITIES,
  DEFAULT_PLATFORM_CONFIG,
} from './types';
import { detectPlatform } from './detector';

// ==================== 适配器接口 ====================

/**
 * 平台适配器接口
 * @description 定义所有平台适配器必须实现的接口
 */
export interface IPlatformAdapter {
  /** 平台类型 */
  readonly platformType: PlatformType;

  /** 获取平台信息 */
  getPlatformInfo(): PlatformInfo;

  /** 获取平台能力 */
  getCapabilities(): PlatformCapabilities;

  /** 获取平台配置 */
  getConfig(): PlatformConfig;

  /** 检查是否支持某个能力 */
  isCapabilitySupported(capability: keyof PlatformCapabilities): boolean;

  /** 获取默认单位 */
  getDefaultUnit(): 'px' | 'rpx' | 'rem';

  /** 获取设计稿宽度 */
  getDesignWidth(): number;

  /** 获取设备像素比 */
  getDevicePixelRatio(): number;
}

// ==================== 基础适配器实现 ====================

/**
 * 基础平台适配器
 * @description 提供平台适配器的基础实现
 */
export class BasePlatformAdapter implements IPlatformAdapter {
  protected _platformInfo: PlatformInfo;
  protected _capabilities: PlatformCapabilities;
  protected _config: PlatformConfig;

  constructor(platformType?: PlatformType) {
    this._platformInfo = detectPlatform();
    const type = platformType ?? this._platformInfo.type;
    this._capabilities = DEFAULT_PLATFORM_CAPABILITIES[type];
    this._config = DEFAULT_PLATFORM_CONFIG[type];
  }

  get platformType(): PlatformType {
    return this._platformInfo.type;
  }

  getPlatformInfo(): PlatformInfo {
    return this._platformInfo;
  }

  getCapabilities(): PlatformCapabilities {
    return { ...this._capabilities };
  }

  getConfig(): PlatformConfig {
    return { ...this._config };
  }

  isCapabilitySupported(capability: keyof PlatformCapabilities): boolean {
    return this._capabilities[capability] ?? false;
  }

  getDefaultUnit(): 'px' | 'rpx' | 'rem' {
    return this._config.defaultUnit;
  }

  getDesignWidth(): number {
    return this._config.designWidth;
  }

  getDevicePixelRatio(): number {
    // 优先使用系统信息中的像素比
    if (this._platformInfo.system?.pixelRatio) {
      return this._platformInfo.system.pixelRatio;
    }
    return this._config.devicePixelRatio;
  }
}

// ==================== 特定平台适配器 ====================

/**
 * 微信小程序适配器
 */
export class WeappAdapter extends BasePlatformAdapter {
  constructor() {
    super('weapp');
  }
}

/**
 * 支付宝小程序适配器
 */
export class AlipayAdapter extends BasePlatformAdapter {
  constructor() {
    super('alipay');
  }
}

/**
 * 百度小程序适配器
 */
export class SwanAdapter extends BasePlatformAdapter {
  constructor() {
    super('swan');
  }
}

/**
 * 字节跳动小程序适配器
 */
export class TTAdapter extends BasePlatformAdapter {
  constructor() {
    super('tt');
  }
}

/**
 * QQ小程序适配器
 */
export class QQAdapter extends BasePlatformAdapter {
  constructor() {
    super('qq');
  }
}

/**
 * 京东小程序适配器
 */
export class JDAdapter extends BasePlatformAdapter {
  constructor() {
    super('jd');
  }
}

/**
 * H5 适配器
 */
export class H5Adapter extends BasePlatformAdapter {
  constructor() {
    super('h5');
  }

  override getDevicePixelRatio(): number {
    // H5 环境下使用 window.devicePixelRatio
    if (typeof window !== 'undefined' && window.devicePixelRatio) {
      return window.devicePixelRatio;
    }
    return super.getDevicePixelRatio();
  }
}

/**
 * React Native 适配器
 */
export class RNAdapter extends BasePlatformAdapter {
  constructor() {
    super('rn');
  }
}

/**
 * 鸿蒙适配器
 */
export class HarmonyAdapter extends BasePlatformAdapter {
  constructor() {
    super('harmony');
  }
}

/**
 * 未知平台适配器
 */
export class UnknownAdapter extends BasePlatformAdapter {
  constructor() {
    super('unknown');
  }
}

// ==================== 适配器工厂 ====================

/**
 * 适配器映射表
 */
const adapterMap: Record<PlatformType, new () => IPlatformAdapter> = {
  weapp: WeappAdapter,
  alipay: AlipayAdapter,
  swan: SwanAdapter,
  tt: TTAdapter,
  qq: QQAdapter,
  jd: JDAdapter,
  h5: H5Adapter,
  rn: RNAdapter,
  harmony: HarmonyAdapter,
  unknown: UnknownAdapter,
};

/**
 * 缓存的适配器实例
 */
let cachedAdapter: IPlatformAdapter | null = null;

/**
 * 创建平台适配器
 * @param platformType 平台类型（可选，默认自动检测）
 * @returns 平台适配器实例
 */
export function createAdapter(platformType?: PlatformType): IPlatformAdapter {
  const type = platformType ?? detectPlatform().type;
  const AdapterClass = adapterMap[type] ?? UnknownAdapter;
  return new AdapterClass();
}

/**
 * 获取平台适配器（单例模式）
 * @param forceRefresh 是否强制刷新
 * @returns 平台适配器实例
 */
export function getAdapter(forceRefresh = false): IPlatformAdapter {
  if (!cachedAdapter || forceRefresh) {
    cachedAdapter = createAdapter();
  }
  return cachedAdapter;
}

/**
 * 清除适配器缓存
 * @description 主要用于测试或需要重新创建适配器的场景
 */
export function clearAdapterCache(): void {
  cachedAdapter = null;
}

/**
 * 注册自定义适配器
 * @param platformType 平台类型
 * @param AdapterClass 适配器类
 */
export function registerAdapter(
  platformType: PlatformType,
  AdapterClass: new () => IPlatformAdapter,
): void {
  adapterMap[platformType] = AdapterClass;
  // 清除缓存以便下次获取时使用新的适配器
  clearAdapterCache();
}
