/**
 * 工具函数库统一导出文件
 * 提供所有工具函数的统一访问入口
 */

// ==================== 导入已存在的工具函数 ====================

// 导入安全工具函数
import * as xssProtection from './security/xss-protection';
import * as apiSecurity from './security/api-security';
import { httpClient as defaultHttpClient } from './http/http-client';

// 导入类型工具函数
import { deepEqual } from './typeHelpers';

// ==================== 创建命名空间和工具类 ====================

/** 平台检测工具类 */
export class PlatformDetector {
  private static cache: Map<string, unknown> = new Map();

  static is(platform: string): boolean {
    return process.env['TARO_ENV'] === platform;
  }

  static isMiniProgram(): boolean {
    return this.is('weapp') || this.is('alipay') || this.is('swan') || this.is('tt') || this.is('qq') || this.is('jd');
  }

  static isH5(): boolean {
    return this.is('h5');
  }

  static isRN(): boolean {
    return this.is('rn');
  }

  static getPlatform(): string {
    return process.env['TARO_ENV'] || 'unknown';
  }

  static isMobile(): boolean {
    return this.isMiniProgram() || (this.isH5() && window.innerWidth < 768);
  }

  static getPlatformInfo(): { platform: string; isMiniProgram: boolean; isH5: boolean; isRN: boolean; env: string } {
    const platform = this.getPlatform();
    if (this.cache.has(platform)) {
      return this.cache.get(platform) as {
        platform: string;
        isMiniProgram: boolean;
        isH5: boolean;
        isRN: boolean;
        env: string;
      };
    }

    const info = {
      platform,
      isMiniProgram: this.isMiniProgram(),
      isH5: this.isH5(),
      isRN: this.isRN(),
      env: process.env['NODE_ENV'] || 'development',
    };

    this.cache.set(platform, info);
    return info;
  }

  static clearCache(): void {
    this.cache.clear();
  }
}

// 类名工具函数
export const cn = (...classes: Array<string | undefined | null | false>): string => {
  return classes.filter(Boolean).join(' ');
};

// 便捷访问实例
export { PlatformDetector as platform };

// ==================== 通用工具函数 ====================

/** 通用工具函数 */
export const utils = {
  // 安全工具
  security: {
    ...xssProtection,
    api: apiSecurity,
  },
  http: {
    httpClient: defaultHttpClient,
  },

  // 平台工具
  platform: PlatformDetector,

  // 类型工具
  types: {
    deepEqual,
  },

  // 工具函数快捷访问
  cn,
};

// ==================== 默认导出 ====================

export default utils;

// platform已通过export { PlatformDetector as platform }导出
