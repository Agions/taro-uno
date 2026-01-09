/**
 * 响应式工具
 * 提供屏幕尺寸检测、断点管理、响应式样式生成等功能，适配Taro.js多平台环境
 */

import { useMemo, useState, useEffect } from 'react';
import Taro from '@tarojs/taro';

// 断点配置
interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

// 默认断点配置
const defaultBreakpoints: BreakpointConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// 屏幕尺寸类型
type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 响应式值类型
type ResponsiveValue<T> = T | Partial<Record<ScreenSize, T>>;

// 响应式样式接口
interface ResponsiveStyle {
  [key: string]: ResponsiveValue<string | number>;
}

// 平台类型
type Platform = 'web' | 'weapp' | 'swan' | 'alipay' | 'tt' | 'qq' | 'h5' | 'rn';

class ResponsiveUtils {
  private breakpoints: BreakpointConfig;
  private platform: Platform;

  constructor(breakpoints?: Partial<BreakpointConfig>) {
    this.breakpoints = { ...defaultBreakpoints, ...breakpoints };

    // 检测当前平台
    if (process.env && process.env['TARO_ENV']) {
      this.platform = process.env['TARO_ENV'] as Platform;
    } else {
      this.platform = 'web'; // 默认为web
    }
  }

  /**
   * 获取当前屏幕尺寸
   * @param width 屏幕宽度
   * @returns 屏幕尺寸类型
   */
  getScreenSize(width: number): ScreenSize {
    const { sm, md, lg, xl, '2xl': xxl } = this.breakpoints;

    if (width >= xxl) return '2xl';
    if (width >= xl) return 'xl';
    if (width >= lg) return 'lg';
    if (width >= md) return 'md';
    if (width >= sm) return 'sm';
    return 'xs';
  }

  /**
   * 检查是否匹配指定屏幕尺寸
   * @param size 屏幕尺寸
   * @param currentWidth 当前屏幕宽度
   * @returns 是否匹配
   */
  matchScreenSize(size: ScreenSize, currentWidth: number): boolean {
    const currentSize = this.getScreenSize(currentWidth);

    const sizeOrder: ScreenSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = sizeOrder.indexOf(currentSize);
    const targetIndex = sizeOrder.indexOf(size);

    return currentIndex >= targetIndex;
  }

  /**
   * 获取响应式值
   * @param value 响应式值
   * @param currentWidth 当前屏幕宽度
   * @returns 匹配的值
   */
  getResponsiveValue<T>(value: ResponsiveValue<T>, currentWidth: number): T | undefined {
    if (typeof value !== 'object' || value === null) {
      return value as T;
    }

    const size = this.getScreenSize(currentWidth);
    const responsiveValue = value as Partial<Record<ScreenSize, T>>;

    // 如果当前尺寸有值，直接返回
    if (responsiveValue[size] !== undefined) {
      return responsiveValue[size] as T;
    }

    // 从当前尺寸向小尺寸查找（fallback to smaller breakpoints）
    const sizeOrder: ScreenSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = sizeOrder.indexOf(size);

    // 先向小尺寸查找
    for (let i = currentIndex - 1; i >= 0; i--) {
      const sizeKey = sizeOrder[i];
      if (sizeKey && responsiveValue[sizeKey] !== undefined) {
        return responsiveValue[sizeKey] as T;
      }
    }

    // 再向大尺寸查找
    for (let i = currentIndex + 1; i < sizeOrder.length; i++) {
      const sizeKey = sizeOrder[i];
      if (sizeKey && responsiveValue[sizeKey] !== undefined) {
        return responsiveValue[sizeKey] as T;
      }
    }

    // 如果没有找到，返回undefined
    return undefined;
  }

  /**
   * 生成响应式样式
   * @param styles 响应式样式对象
   * @param currentWidth 当前屏幕宽度
   * @returns 样式对象
   */
  generateResponsiveStyles(styles: ResponsiveStyle, currentWidth: number): Record<string, string | number> {
    const result: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(styles)) {
      const responsiveValue = this.getResponsiveValue(value, currentWidth);
      if (responsiveValue !== undefined) {
        result[key] = responsiveValue;
      }
    }

    return result;
  }

  /**
   * 获取平台特定的样式
   * @param webStyles Web平台样式
   * @param weappStyles 小程序平台样式
   * @param otherStyles 其他平台样式
   * @returns 当前平台的样式
   */
  getPlatformStyles<T>(webStyles: T, weappStyles: T, otherStyles?: Partial<Record<Platform, T>>): T {
    if (this.platform === 'web' || this.platform === 'h5') {
      return webStyles;
    }

    if (this.platform === 'weapp') {
      return weappStyles;
    }

    if (otherStyles && otherStyles[this.platform]) {
      return otherStyles[this.platform]!;
    }

    // 默认返回小程序样式
    return weappStyles;
  }

  /**
   * 获取当前平台
   * @returns 平台类型
   */
  getPlatform(): Platform {
    return this.platform;
  }

  /**
   * 检查是否为移动设备
   * @param width 屏幕宽度
   * @returns 是否为移动设备
   */
  isMobile(width: number): boolean {
    return width < this.breakpoints.md;
  }

  /**
   * 检查是否为平板设备
   * @param width 屏幕宽度
   * @returns 是否为平板设备
   */
  isTablet(width: number): boolean {
    return width >= this.breakpoints.md && width < this.breakpoints.lg;
  }

  /**
   * 检查是否为桌面设备
   * @param width 屏幕宽度
   * @returns 是否为桌面设备
   */
  isDesktop(width: number): boolean {
    return width >= this.breakpoints.lg;
  }

  /**
   * 获取安全区域（适配刘海屏）
   * @returns 安全区域配置
   */
  getSafeArea(): { top: number; bottom: number; left: number; right: number } {
    // Taro.js环境下的安全区域获取
    if (Taro.getSystemInfoSync) {
      const systemInfo = Taro.getSystemInfoSync();
      return {
        top: systemInfo.safeArea?.top || 0,
        bottom: systemInfo.safeArea?.bottom || systemInfo.screenHeight,
        left: systemInfo.safeArea?.left || 0,
        right: systemInfo.safeArea?.right || systemInfo.screenWidth,
      };
    }

    // 默认值
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  /**
   * 获取状态栏高度
   * @returns 状态栏高度
   */
  getStatusBarHeight(): number {
    if (Taro.getSystemInfoSync) {
      const systemInfo = Taro.getSystemInfoSync();
      return systemInfo.statusBarHeight || 0;
    }

    // 默认值
    return 0;
  }

  /**
   * 获取导航栏高度
   * @returns 导航栏高度
   */
  getNavigationBarHeight(): number {
    if (Taro.getSystemInfoSync) {
      const systemInfo = Taro.getSystemInfoSync();
      // 小程序导航栏高度通常为44px
      return systemInfo.statusBarHeight ? systemInfo.statusBarHeight + 44 : 44;
    }

    // 默认值
    return 44;
  }

  /**
   * 获取胶囊按钮信息（仅小程序）
   * @returns 胶囊按钮信息
   */
  getMenuButtonBoundingClientRect(): any {
    if (Taro.getMenuButtonBoundingClientRect) {
      return Taro.getMenuButtonBoundingClientRect();
    }

    // 默认值
    return null;
  }
}

// 创建单例实例
const responsiveUtils = new ResponsiveUtils();

// 响应式Hook
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({ windowWidth: 375, windowHeight: 667 });

  useEffect(() => {
    const updateWindowSize = () => {
      try {
        const systemInfo = Taro.getSystemInfoSync();
        setWindowSize({
          windowWidth: systemInfo.windowWidth || 375,
          windowHeight: systemInfo.windowHeight || 667,
        });
      } catch (e) {
        // 如果获取失败，使用默认值
        setWindowSize({ windowWidth: 375, windowHeight: 667 });
      }
    };

    // 初始化获取窗口尺寸
    updateWindowSize();

    // 监听窗口尺寸变化（仅Web/H5环境）
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWindowSize);
    }

    // 清理函数
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateWindowSize);
      }
    };
  }, []);

  const { windowWidth, windowHeight } = windowSize;

  const screenSize = useMemo(() => responsiveUtils.getScreenSize(windowWidth), [windowWidth]);
  const isMobile = useMemo(() => responsiveUtils.isMobile(windowWidth), [windowWidth]);
  const isTablet = useMemo(() => responsiveUtils.isTablet(windowWidth), [windowWidth]);
  const isDesktop = useMemo(() => responsiveUtils.isDesktop(windowWidth), [windowWidth]);
  const platform = useMemo(() => responsiveUtils.getPlatform(), []);
  const safeArea = useMemo(() => responsiveUtils.getSafeArea(), []);
  const statusBarHeight = useMemo(() => responsiveUtils.getStatusBarHeight(), []);
  const navigationBarHeight = useMemo(() => responsiveUtils.getNavigationBarHeight(), []);

  return {
    windowWidth,
    windowHeight,
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    platform,
    safeArea,
    statusBarHeight,
    navigationBarHeight,
    getResponsiveValue: <T>(value: ResponsiveValue<T>) => responsiveUtils.getResponsiveValue(value, windowWidth),
    generateResponsiveStyles: (styles: ResponsiveStyle) =>
      responsiveUtils.generateResponsiveStyles(styles, windowWidth),
    getPlatformStyles: <T>(webStyles: T, weappStyles: T, otherStyles?: Partial<Record<Platform, T>>) =>
      responsiveUtils.getPlatformStyles(webStyles, weappStyles, otherStyles),
    matchScreenSize: (size: ScreenSize) => responsiveUtils.matchScreenSize(size, windowWidth),
  };
};

// 导出便捷方法
export const getScreenSize = (width: number) => responsiveUtils.getScreenSize(width);
export const matchScreenSize = (size: ScreenSize, width: number) => responsiveUtils.matchScreenSize(size, width);
export const getResponsiveValue = <T>(value: ResponsiveValue<T>, width: number): T | undefined =>
  responsiveUtils.getResponsiveValue(value, width);
export const generateResponsiveStyles = (styles: ResponsiveStyle, width: number) =>
  responsiveUtils.generateResponsiveStyles(styles, width);
export const getPlatformStyles = <T>(webStyles: T, weappStyles: T, otherStyles?: Partial<Record<Platform, T>>) =>
  responsiveUtils.getPlatformStyles(webStyles, weappStyles, otherStyles);
export const getPlatform = () => responsiveUtils.getPlatform();
export const isMobile = (width: number) => responsiveUtils.isMobile(width);
export const isTablet = (width: number) => responsiveUtils.isTablet(width);
export const isDesktop = (width: number) => responsiveUtils.isDesktop(width);
export const getSafeArea = () => responsiveUtils.getSafeArea();
export const getStatusBarHeight = () => responsiveUtils.getStatusBarHeight();
export const getNavigationBarHeight = () => responsiveUtils.getNavigationBarHeight();
export const getMenuButtonBoundingClientRect = () => responsiveUtils.getMenuButtonBoundingClientRect();

// 导出类型
export type { BreakpointConfig, ScreenSize, ResponsiveValue, ResponsiveStyle, Platform };
export default responsiveUtils;
