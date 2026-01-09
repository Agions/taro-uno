/**
 * 单位转换工具
 * 提供 px, rpx, rem 等单位的互转功能
 * @module utils/unit
 */

import { getAdapter } from '../platform/adapter';
import type { PlatformType } from '../platform/types';

// ==================== 类型定义 ====================

/**
 * 支持的单位类型
 */
export type UnitType = 'px' | 'rpx' | 'rem';

/**
 * 单位转换配置
 */
export interface UnitConversionConfig {
  /** 设计稿宽度（默认 750） */
  designWidth: number;
  /** 设备像素比（默认 2） */
  devicePixelRatio: number;
  /** 根字体大小（默认 16） */
  rootFontSize: number;
  /** 屏幕宽度（默认 375） */
  screenWidth: number;
}

/**
 * 默认单位转换配置
 */
const DEFAULT_CONFIG: UnitConversionConfig = {
  designWidth: 750,
  devicePixelRatio: 2,
  rootFontSize: 16,
  screenWidth: 375,
};

// ==================== 配置管理 ====================

let currentConfig: UnitConversionConfig = { ...DEFAULT_CONFIG };

/**
 * 设置单位转换配置
 * @param config 配置选项
 */
export function setUnitConfig(config: Partial<UnitConversionConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

/**
 * 获取当前单位转换配置
 * @returns 当前配置
 */
export function getUnitConfig(): UnitConversionConfig {
  return { ...currentConfig };
}

/**
 * 重置单位转换配置为默认值
 */
export function resetUnitConfig(): void {
  currentConfig = { ...DEFAULT_CONFIG };
}

/**
 * 从平台适配器初始化配置
 */
export function initConfigFromPlatform(): void {
  try {
    const adapter = getAdapter();
    const platformConfig = adapter.getConfig();
    const platformInfo = adapter.getPlatformInfo();

    currentConfig = {
      designWidth: platformConfig.designWidth,
      devicePixelRatio: adapter.getDevicePixelRatio(),
      rootFontSize: platformConfig.rootFontSize,
      screenWidth: platformInfo.system?.screenWidth ?? DEFAULT_CONFIG.screenWidth,
    };
  } catch {
    // 如果无法获取平台信息，使用默认配置
    currentConfig = { ...DEFAULT_CONFIG };
  }
}

// ==================== 基础转换函数 ====================

/**
 * px 转 rpx
 * @param px px 值
 * @param config 可选配置
 * @returns rpx 值
 * @description rpx = px * (designWidth / screenWidth)
 */
export function pxToRpx(px: number, config?: Partial<UnitConversionConfig>): number {
  const { designWidth, screenWidth } = { ...currentConfig, ...config };
  return px * (designWidth / screenWidth);
}

/**
 * rpx 转 px
 * @param rpx rpx 值
 * @param config 可选配置
 * @returns px 值
 * @description px = rpx * (screenWidth / designWidth)
 */
export function rpxToPx(rpx: number, config?: Partial<UnitConversionConfig>): number {
  const { designWidth, screenWidth } = { ...currentConfig, ...config };
  return rpx * (screenWidth / designWidth);
}

/**
 * px 转 rem
 * @param px px 值
 * @param config 可选配置
 * @returns rem 值
 * @description rem = px / rootFontSize
 */
export function pxToRem(px: number, config?: Partial<UnitConversionConfig>): number {
  const { rootFontSize } = { ...currentConfig, ...config };
  return px / rootFontSize;
}

/**
 * rem 转 px
 * @param rem rem 值
 * @param config 可选配置
 * @returns px 值
 * @description px = rem * rootFontSize
 */
export function remToPx(rem: number, config?: Partial<UnitConversionConfig>): number {
  const { rootFontSize } = { ...currentConfig, ...config };
  return rem * rootFontSize;
}

/**
 * rpx 转 rem
 * @param rpx rpx 值
 * @param config 可选配置
 * @returns rem 值
 * @description rem = rpxToPx(rpx) / rootFontSize
 */
export function rpxToRem(rpx: number, config?: Partial<UnitConversionConfig>): number {
  const px = rpxToPx(rpx, config);
  return pxToRem(px, config);
}

/**
 * rem 转 rpx
 * @param rem rem 值
 * @param config 可选配置
 * @returns rpx 值
 * @description rpx = pxToRpx(remToPx(rem))
 */
export function remToRpx(rem: number, config?: Partial<UnitConversionConfig>): number {
  const px = remToPx(rem, config);
  return pxToRpx(px, config);
}

// ==================== 通用转换函数 ====================

/**
 * 单位转换
 * @param value 数值
 * @param from 源单位
 * @param to 目标单位
 * @param config 可选配置
 * @returns 转换后的数值
 */
export function convertUnit(
  value: number,
  from: UnitType,
  to: UnitType,
  config?: Partial<UnitConversionConfig>,
): number {
  // 相同单位直接返回
  if (from === to) {
    return value;
  }

  // 先转换为 px
  let pxValue: number;
  switch (from) {
    case 'px':
      pxValue = value;
      break;
    case 'rpx':
      pxValue = rpxToPx(value, config);
      break;
    case 'rem':
      pxValue = remToPx(value, config);
      break;
    default:
      pxValue = value;
  }

  // 再从 px 转换为目标单位
  switch (to) {
    case 'px':
      return pxValue;
    case 'rpx':
      return pxToRpx(pxValue, config);
    case 'rem':
      return pxToRem(pxValue, config);
    default:
      return pxValue;
  }
}

// ==================== 平台相关函数 ====================

/**
 * 根据平台获取默认单位
 * @param platformType 平台类型（可选，默认自动检测）
 * @returns 默认单位
 */
export function getDefaultUnit(platformType?: PlatformType): UnitType {
  try {
    const adapter = getAdapter();
    if (platformType) {
      // 如果指定了平台类型，根据平台类型返回默认单位
      const miniProgramPlatforms: PlatformType[] = ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'];
      if (miniProgramPlatforms.includes(platformType)) {
        return 'rpx';
      }
      return 'px';
    }
    return adapter.getDefaultUnit();
  } catch {
    return 'px';
  }
}

/**
 * 转换为平台默认单位
 * @param value 数值
 * @param from 源单位
 * @param config 可选配置
 * @returns 转换后的数值
 */
export function toPlatformUnit(
  value: number,
  from: UnitType,
  config?: Partial<UnitConversionConfig>,
): number {
  const defaultUnit = getDefaultUnit();
  return convertUnit(value, from, defaultUnit, config);
}

// ==================== 字符串处理函数 ====================

/**
 * 解析带单位的字符串
 * @param value 带单位的字符串（如 "16px", "32rpx", "1rem"）
 * @returns 解析结果 { value: number, unit: UnitType } 或 null
 */
export function parseUnitValue(value: string): { value: number; unit: UnitType } | null {
  const match = value.match(/^(-?\d+(?:\.\d+)?)(px|rpx|rem)$/);
  if (!match || !match[1] || !match[2]) {
    return null;
  }
  return {
    value: parseFloat(match[1]),
    unit: match[2] as UnitType,
  };
}

/**
 * 格式化为带单位的字符串
 * @param value 数值
 * @param unit 单位
 * @param precision 小数精度（默认 2）
 * @returns 带单位的字符串
 */
export function formatUnitValue(value: number, unit: UnitType, precision = 2): string {
  const roundedValue = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  return `${roundedValue}${unit}`;
}

/**
 * 转换带单位的字符串
 * @param value 带单位的字符串
 * @param to 目标单位
 * @param config 可选配置
 * @returns 转换后的带单位字符串，如果解析失败返回原值
 */
export function convertUnitString(
  value: string,
  to: UnitType,
  config?: Partial<UnitConversionConfig>,
): string {
  const parsed = parseUnitValue(value);
  if (!parsed) {
    return value;
  }
  const converted = convertUnit(parsed.value, parsed.unit, to, config);
  return formatUnitValue(converted, to);
}

// ==================== 批量转换函数 ====================

/**
 * 批量转换数值
 * @param values 数值数组
 * @param from 源单位
 * @param to 目标单位
 * @param config 可选配置
 * @returns 转换后的数值数组
 */
export function convertUnits(
  values: number[],
  from: UnitType,
  to: UnitType,
  config?: Partial<UnitConversionConfig>,
): number[] {
  return values.map((value) => convertUnit(value, from, to, config));
}

/**
 * 转换样式对象中的单位值
 * @param styles 样式对象
 * @param from 源单位
 * @param to 目标单位
 * @param config 可选配置
 * @returns 转换后的样式对象
 */
export function convertStyleUnits(
  styles: Record<string, string | number>,
  from: UnitType,
  to: UnitType,
  config?: Partial<UnitConversionConfig>,
): Record<string, string | number> {
  const result: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(styles)) {
    if (typeof value === 'number') {
      result[key] = convertUnit(value, from, to, config);
    } else if (typeof value === 'string') {
      result[key] = convertUnitString(value, to, config);
    } else {
      result[key] = value;
    }
  }

  return result;
}
