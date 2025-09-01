/**
 * Taro-Uno UI 组件库核心工具函数
 * 提供多端开发所需的通用工具函数
 */

import * as Taro from '@tarojs/taro';

// ==================== 平台检测工具 ====================

/** 平台类型 */
export type Platform = 'h5' | 'weapp' | 'alipay' | 'swan' | 'tt' | 'qq' | 'jd' | 'rn';

/** 平台信息接口 */
export interface PlatformInfo {
  platform: Platform;
  isMiniProgram: boolean;
  isH5: boolean;
  isRN: boolean;
  system: Taro.getSystemInfoSync.Result;
  SDKVersion?: string;
  version?: string;
}

/** 平台检测工具类 */
export class PlatformDetector {
  private static platformCache: Platform | null = null;
  private static platformInfoCache: PlatformInfo | null = null;

  /** 获取当前平台 */
  static getPlatform(): Platform {
    if (this.platformCache) {
      return this.platformCache;
    }

    let platform: Platform = 'h5';

    // 根据环境判断平台
    if (typeof window !== 'undefined' && window.wx && (window.wx as any).getSystemInfo) {
      platform = 'weapp';
    } else if (typeof window !== 'undefined' && window.my && (window.my as any).getSystemInfo) {
      platform = 'alipay';
    } else if (typeof window !== 'undefined' && window.swan && (window.swan as any).getSystemInfo) {
      platform = 'swan';
    } else if (typeof window !== 'undefined' && window.tt && (window.tt as any).getSystemInfo) {
      platform = 'tt';
    } else if (typeof window !== 'undefined' && window.qq && (window.qq as any).getSystemInfo) {
      platform = 'qq';
    } else if (typeof window !== 'undefined' && window.jd && (window.jd as any).getSystemInfo) {
      platform = 'jd';
    } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      platform = 'rn';
    }

    this.platformCache = platform;
    return platform;
  }

  /** 获取平台信息 */
  static getPlatformInfo(): PlatformInfo {
    if (this.platformInfoCache) {
      return this.platformInfoCache;
    }

    const platform = this.getPlatform();
    const system = Taro.getSystemInfoSync();

    const platformInfo: PlatformInfo = {
      platform,
      isMiniProgram: ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'].includes(platform),
      isH5: platform === 'h5',
      isRN: platform === 'rn',
      system,
    };

    // 获取小程序特定信息
    if (platformInfo.isMiniProgram) {
      try {
        const accountInfo = Taro.getAccountInfoSync();
        platformInfo.SDKVersion = (accountInfo.miniProgram as any).sdkVersion || accountInfo.miniProgram.version;
        platformInfo.version = accountInfo.miniProgram.version;
      } catch (error) {
        // 忽略获取版本信息失败的情况
      }
    }

    this.platformInfoCache = platformInfo;
    return platformInfo;
  }

  /** 判断是否为指定平台 */
  static is(targetPlatform: Platform): boolean {
    return this.getPlatform() === targetPlatform;
  }

  /** 判断是否为小程序环境 */
  static isMiniProgram(): boolean {
    return this.getPlatformInfo().isMiniProgram;
  }

  /** 判断是否为H5环境 */
  static isH5(): boolean {
    return this.getPlatformInfo().isH5;
  }

  /** 判断是否为React Native环境 */
  static isRN(): boolean {
    return this.getPlatformInfo().isRN;
  }

  /** 清除缓存 */
  static clearCache(): void {
    this.platformCache = null;
    this.platformInfoCache = null;
  }
}

// ==================== 格式化工具函数 ====================

/** 格式化工具类 */
export class FormatUtils {
  /** 格式化金额 */
  static formatMoney(
    amount: number,
    options?: {
      currency?: string;
      decimals?: number;
      separator?: string;
      decimalPoint?: string;
    },
  ): string {
    const { currency = '¥', decimals = 2, separator = ',', decimalPoint = '.' } = options || {};

    const formattedAmount = amount.toFixed(decimals);
    const [integerPart, decimalPart] = formattedAmount.split('.');

    // 添加千位分隔符
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return `${currency}${formattedInteger}${decimalPoint}${decimalPart}`;
  }

  /** 格式化日期 */
  static formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  /** 格式化文件大小 */
  static formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  }

  /** 格式化手机号 */
  static formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
    }
    return phone;
  }

  /** 格式化身份证号 */
  static formatIdCard(idCard: string): string {
    const cleaned = idCard.replace(/\D/g, '');
    if (cleaned.length === 18) {
      return `${cleaned.slice(0, 6)}********${cleaned.slice(14)}`;
    } else if (cleaned.length === 15) {
      return `${cleaned.slice(0, 6)}*****${cleaned.slice(11)}`;
    }
    return idCard;
  }

  /** 格式化数字 */
  static formatNumber(
    num: number,
    options?: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      useGrouping?: boolean;
    },
  ): string {
    const { minimumFractionDigits = 0, maximumFractionDigits = 2, useGrouping = true } = options || {};

    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(num);
  }

  /** 格式化百分比 */
  static formatPercent(value: number, decimals: number = 2): string {
    return `${(value * 100).toFixed(decimals)}%`;
  }

  /** 格式化距离 */
  static formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    } else {
      return `${(meters / 1000).toFixed(1)}km`;
    }
  }

  /** 格式化时长 */
  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    } else {
      return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  }
}

// ==================== 验证工具函数 ====================

/** 验证工具类 */
export class ValidationUtils {
  /** 验证邮箱 */
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /** 验证手机号 */
  static isPhone(phone: string): boolean {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  }

  /** 验证身份证号 */
  static isIdCard(idCard: string): boolean {
    const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return idCardRegex.test(idCard);
  }

  /** 验证URL */
  static isUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /** 验证数字 */
  static isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  /** 验证整数 */
  static isInteger(value: any): boolean {
    return Number.isInteger(value);
  }

  /** 验证字符串 */
  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  /** 验证数组 */
  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /** 验证对象 */
  static isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  /** 验证函数 */
  static isFunction(value: any): boolean {
    return typeof value === 'function';
  }

  /** 验证日期 */
  static isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  /** 验证必填 */
  static isRequired(value: any): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  }

  /** 验证长度范围 */
  static isLength(value: string | any[], min: number, max?: number): boolean {
    const length = value.length;
    if (max !== undefined) {
      return length >= min && length <= max;
    }
    return length >= min;
  }

  /** 验证数值范围 */
  static isRange(value: number, min: number, max?: number): boolean {
    if (max !== undefined) {
      return value >= min && value <= max;
    }
    return value >= min;
  }

  /** 验证正则表达式 */
  static isPattern(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }

  /** 验证密码强度 */
  static isStrongPassword(password: string): boolean {
    // 至少8位，包含大小写字母、数字和特殊字符
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /** 验证中文 */
  static isChinese(text: string): boolean {
    const chineseRegex = /^[\u4e00-\u9fa5]+$/;
    return chineseRegex.test(text);
  }

  /** 验证英文 */
  static isEnglish(text: string): boolean {
    const englishRegex = /^[a-zA-Z]+$/;
    return englishRegex.test(text);
  }

  /** 验证字母数字 */
  static isAlphanumeric(text: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(text);
  }
}

// ==================== 事件处理工具 ====================

/** 事件处理工具类 */
export class EventUtils {
  /** 防抖函数 */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate: boolean = false,
  ): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let timeout: NodeJS.Timeout | null = null;

    const debounced = function (this: any, ...args: Parameters<T>) {
      const context = this;

      const later = () => {
        timeout = null;
        if (!immediate) {
          return func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(later, wait);

      if (callNow) {
        return func.apply(context, args);
      }
    };

    debounced.cancel = function () {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    return debounced;
  }

  /** 节流函数 */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
  ): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let inThrottle: boolean;
    let lastResult: ReturnType<T>;

    const throttled = function (this: any, ...args: Parameters<T>) {
      const context = this;

      if (!inThrottle) {
        func.apply(context, args);
        lastResult = func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }

      return lastResult;
    };

    throttled.cancel = function () {
      inThrottle = false;
    };

    return throttled;
  }

  /** 只执行一次的函数 */
  static once<T extends (...args: any[]) => any>(func: T): T {
    let executed = false;
    let result: ReturnType<T>;

    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
      if (!executed) {
        executed = true;
        result = func.apply(this, args);
      }
      return result;
    } as T;
  }

  /** 延迟执行函数 */
  static delay<T extends (...args: any[]) => any>(func: T, wait: number, ...args: Parameters<T>): NodeJS.Timeout {
    return setTimeout(() => func(...args), wait);
  }

  /** 定时执行函数 */
  static interval<T extends (...args: any[]) => any>(func: T, wait: number, ...args: Parameters<T>): NodeJS.Timeout {
    return setInterval(() => func(...args), wait);
  }

  /** 停止定时器 */
  static clearTimer(timer: NodeJS.Timeout): void {
    clearTimeout(timer);
    clearInterval(timer);
  }

  /** 等待函数 */
  static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /** 重试函数 */
  static async retry<T>(func: () => Promise<T>, maxAttempts: number = 3, delayMs: number = 1000): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await func();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await this.wait(delayMs);
        }
      }
    }

    throw lastError!;
  }

  /** 链式调用函数 */
  static pipe<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => functions.reduce((acc, fn) => fn(acc), arg);
  }

  /** 组合函数 */
  static compose<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => functions.reduceRight((acc, fn) => fn(acc), arg);
  }

  /** 记忆化函数 */
  static memoize<T extends (...args: any[]) => any>(func: T, keyGenerator?: (...args: Parameters<T>) => string): T {
    const cache = new Map<string, ReturnType<T>>();

    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
      const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key)!;
      }

      const result = func.apply(this, args);
      cache.set(key, result);
      return result;
    } as T;
  }
}

// ==================== 性能监控工具 ====================

/** 性能监控工具类 */
export class PerformanceUtils {
  private static marks: Map<string, number> = new Map();
  private static measures: Map<string, number> = new Map();

  /** 开始计时 */
  static start(name: string): void {
    this.marks.set(name, performance.now());
  }

  /** 结束计时 */
  static end(name: string): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      throw new Error(`No mark found for name: ${name}`);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;
    this.measures.set(name, duration);
    this.marks.delete(name);

    return duration;
  }

  /** 获取计时结果 */
  static getMeasure(name: string): number | undefined {
    return this.measures.get(name);
  }

  /** 获取所有计时结果 */
  static getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.measures);
  }

  /** 清除计时器 */
  static clear(name?: string): void {
    if (name) {
      this.marks.delete(name);
      this.measures.delete(name);
    } else {
      this.marks.clear();
      this.measures.clear();
    }
  }

  /** 测量异步函数执行时间 */
  static async measureAsync<T>(name: string, func: () => Promise<T>): Promise<T> {
    this.start(name);
    try {
      const result = await func();
      this.end(name);
      return result;
    } catch (error) {
      this.clear(name);
      throw error;
    }
  }

  /** 测量同步函数执行时间 */
  static measureSync<T>(name: string, func: () => T): T {
    this.start(name);
    try {
      const result = func();
      this.end(name);
      return result;
    } catch (error) {
      this.clear(name);
      throw error;
    }
  }

  /** 获取性能指标 */
  static getMetrics(): PerformanceEntry[] {
    if (typeof performance === 'undefined') return [];
    return performance.getEntriesByType('measure');
  }

  /** 获取内存使用情况 */
  static getMemoryInfo(): {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null {
    if (typeof performance === 'undefined' || !('memory' in performance)) {
      return null;
    }

    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }

  /** 获取网络信息 */
  static async getNetworkInfo(): Promise<Taro.getNetworkType.SuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      Taro.getNetworkType({
        success: resolve,
        fail: reject,
      });
    });
  }

  /** 获取电池信息 */
  static async getBatteryInfo(): Promise<Taro.getBatteryInfo.SuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      Taro.getBatteryInfo({
        success: resolve,
        fail: reject,
      });
    });
  }
}

// ==================== 样式工具 ====================

export type SizeValue = number | string;
export type ColorValue = string;
export type CSSUnit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%' | 'rpx';

/** 样式工具类 */
export class StyleUtils {
  /** 转换CSS单位 */
  static convertUnit(value: SizeValue, targetUnit: CSSUnit = 'px'): string {
    if (typeof value === 'number') {
      return `${value}${targetUnit}`;
    }

    // 如果已经是目标单位，直接返回
    if (value.endsWith(targetUnit)) {
      return value;
    }

    // 提取数值和单位
    const match = value.match(/^(\d+(?:\.\d+)?)(px|rem|em|vw|vh|%|rpx)$/);
    if (!match) {
      return value;
    }

    const [, numStr, unit] = match;
    const num = parseFloat(numStr);

    // 单位转换逻辑
    switch (unit) {
      case 'px':
        switch (targetUnit) {
          case 'rem':
            return `${num / 16}rem`;
          case 'rpx':
            return `${num * 2}rpx`;
          default:
            return `${num}${targetUnit}`;
        }
      case 'rpx':
        switch (targetUnit) {
          case 'px':
            return `${num / 2}px`;
          case 'rem':
            return `${num / 32}rem`;
          default:
            return `${num}${targetUnit}`;
        }
      case 'rem':
        switch (targetUnit) {
          case 'px':
            return `${num * 16}px`;
          case 'rpx':
            return `${num * 32}rpx`;
          default:
            return `${num}${targetUnit}`;
        }
      default:
        return `${num}${targetUnit}`;
    }
  }

  /** 生成CSS变量 */
  static generateCSSVars(prefix: string, values: Record<string, any>): Record<string, string> {
    const result: Record<string, string> = {};

    Object.entries(values).forEach(([key, value]) => {
      const cssVarName = `--${prefix}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      result[cssVarName] = typeof value === 'string' ? value : String(value);
    });

    return result;
  }

  /** 生成过渡CSS */
  static generateTransition(properties: string[], duration: number = 300, timing: string = 'ease'): string {
    return properties.map((prop) => `${prop} ${duration}ms ${timing}`).join(', ');
  }

  /** 生成动画CSS */
  static generateAnimation(
    name: string,
    duration: number = 300,
    timing: string = 'ease',
    delay: number = 0,
    iteration: string = '1',
    direction: string = 'normal',
    fill: string = 'none',
  ): string {
    return `${name} ${duration}ms ${timing} ${delay}ms ${iteration} ${direction} ${fill}`;
  }

  /** 生成阴影CSS */
  static generateShadow(level: number = 1): string {
    const shadows = [
      '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ];

    return shadows[Math.min(level - 1, shadows.length - 1)] || shadows[0];
  }

  /** 解析颜色值 */
  static parseColor(color: ColorValue): {
    r: number;
    g: number;
    b: number;
    a: number;
  } | null {
    if (typeof color !== 'string') return null;

    // 处理hex颜色
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
      return {
        r: parseInt(hexMatch[1] || '0', 16),
        g: parseInt(hexMatch[2] || '0', 16),
        b: parseInt(hexMatch[3] || '0', 16),
        a: 1,
      };
    }

    // 处理rgb颜色
    const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1] || '0', 10),
        g: parseInt(rgbMatch[2] || '0', 10),
        b: parseInt(rgbMatch[3] || '0', 10),
        a: 1,
      };
    }

    // 处理rgba颜色
    const rgbaMatch = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)$/);
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1] || '0', 10),
        g: parseInt(rgbaMatch[2] || '0', 10),
        b: parseInt(rgbaMatch[3] || '0', 10),
        a: parseFloat(rgbaMatch[4] || '0'),
      };
    }

    return null;
  }

  /** 调整颜色亮度 */
  static adjustColor(color: ColorValue, amount: number): string {
    const parsed = this.parseColor(color);
    if (!parsed) return color;

    const adjust = (value: number) => {
      const newValue = value + amount;
      return Math.max(0, Math.min(255, newValue));
    };

    const { r, g, b, a } = parsed;
    return `rgba(${adjust(r)}, ${adjust(g)}, ${adjust(b)}, ${a})`;
  }

  /** 混合颜色 */
  static mixColors(color1: ColorValue, color2: ColorValue, ratio: number = 0.5): string {
    const parsed1 = this.parseColor(color1);
    const parsed2 = this.parseColor(color2);

    if (!parsed1 || !parsed2) return color1;

    const r = Math.round(parsed1.r * (1 - ratio) + parsed2.r * ratio);
    const g = Math.round(parsed1.g * (1 - ratio) + parsed2.g * ratio);
    const b = Math.round(parsed1.b * (1 - ratio) + parsed2.b * ratio);
    const a = parsed1.a * (1 - ratio) + parsed2.a * ratio;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

// ==================== 类名合并工具 ====================

/** 类名合并工具函数 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// ==================== 导出工具函数 ====================

/** 创建工具函数的快捷访问 */
export const platform = PlatformDetector;
export const format = FormatUtils;
export const validate = ValidationUtils;
export const event = EventUtils;
export const perf = PerformanceUtils;
export const style = StyleUtils;
