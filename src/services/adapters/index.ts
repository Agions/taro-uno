/**
 * HTTP Adapters Factory
 * Automatically selects the appropriate adapter based on platform
 * @module services/adapters
 */

import type { PlatformType } from '../../platform/types';
import { detectPlatform } from '../../platform/detector';
import type { IHttpAdapter } from './adapter.interface';
import { createWeappAdapter } from './weapp.adapter';
import { createH5Adapter } from './h5.adapter';
import { createRNAdapter } from './rn.adapter';
import { createHarmonyAdapter } from './harmony.adapter';

// 导出所有适配器类型和工厂函数
export type { IHttpAdapter, AdapterFactory } from './adapter.interface';
export { BaseHttpAdapter } from './adapter.interface';
export { WeappAdapter, createWeappAdapter } from './weapp.adapter';
export { H5Adapter, createH5Adapter } from './h5.adapter';
export { RNAdapter, createRNAdapter } from './rn.adapter';
export { HarmonyAdapter, createHarmonyAdapter } from './harmony.adapter';

/**
 * 适配器缓存
 * 避免重复创建适配器实例
 */
const adapterCache = new Map<PlatformType, IHttpAdapter>();

/**
 * 根据平台类型创建适配器
 * @param platformType 平台类型
 * @returns HTTP 适配器实例
 */
export function createAdapterForPlatform(platformType: PlatformType): IHttpAdapter {
  switch (platformType) {
    case 'weapp':
    case 'alipay':
    case 'swan':
    case 'tt':
    case 'qq':
    case 'jd':
      // 所有小程序平台使用 WeApp 适配器（基于 Taro.request）
      return createWeappAdapter();

    case 'h5':
      return createH5Adapter();

    case 'rn':
      return createRNAdapter();

    case 'harmony':
      return createHarmonyAdapter();

    case 'unknown':
    default:
      // 未知平台默认使用 H5 适配器（基于 fetch）
      return createH5Adapter();
  }
}

/**
 * 自动检测平台并创建适配器
 * @param useCache 是否使用缓存（默认 true）
 * @returns HTTP 适配器实例
 */
export function createAdapter(useCache = true): IHttpAdapter {
  const platformInfo = detectPlatform();
  const platformType = platformInfo.type;

  // 检查缓存
  if (useCache && adapterCache.has(platformType)) {
    const cachedAdapter = adapterCache.get(platformType);
    if (cachedAdapter) {
      return cachedAdapter;
    }
  }

  // 创建新适配器
  const adapter = createAdapterForPlatform(platformType);

  // 缓存适配器
  if (useCache) {
    adapterCache.set(platformType, adapter);
  }

  return adapter;
}

/**
 * 清除适配器缓存
 */
export function clearAdapterCache(): void {
  adapterCache.clear();
}

/**
 * 获取当前平台的适配器类型名称
 * @returns 适配器类型名称
 */
export function getAdapterTypeName(): string {
  const platformInfo = detectPlatform();
  const platformType = platformInfo.type;

  switch (platformType) {
    case 'weapp':
    case 'alipay':
    case 'swan':
    case 'tt':
    case 'qq':
    case 'jd':
      return 'WeappAdapter';

    case 'h5':
      return 'H5Adapter';

    case 'rn':
      return 'RNAdapter';

    case 'harmony':
      return 'HarmonyAdapter';

    case 'unknown':
    default:
      return 'H5Adapter';
  }
}

/**
 * 检查适配器是否支持上传功能
 * @param adapter 适配器实例
 * @returns 是否支持上传
 */
export function supportsUpload(adapter: IHttpAdapter): boolean {
  return typeof adapter.upload === 'function';
}

/**
 * 检查适配器是否支持下载功能
 * @param adapter 适配器实例
 * @returns 是否支持下载
 */
export function supportsDownload(adapter: IHttpAdapter): boolean {
  return typeof adapter.download === 'function';
}
