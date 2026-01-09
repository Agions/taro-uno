/**
 * responsiveUtils 单元测试
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useResponsive, getScreenSize, matchScreenSize, getResponsiveValue, generateResponsiveStyles } from '../responsiveUtils';

// 模拟Taro环境
vi.mock('@tarojs/taro', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      getSystemInfoSync: vi.fn(() => ({
        windowWidth: 375,
        windowHeight: 667,
        screenWidth: 375,
        screenHeight: 667,
        statusBarHeight: 20,
        safeArea: { top: 20, bottom: 667, left: 0, right: 375 },
      })),
      getMenuButtonBoundingClientRect: vi.fn(() => ({
        width: 87,
        height: 32,
        top: 26,
        right: 365,
        bottom: 58,
        left: 278,
      })),
    },
    getSystemInfoSync: vi.fn(() => ({
      windowWidth: 375,
      windowHeight: 667,
      screenWidth: 375,
      screenHeight: 667,
      statusBarHeight: 20,
      safeArea: { top: 20, bottom: 667, left: 0, right: 375 },
    })),
    getMenuButtonBoundingClientRect: vi.fn(() => ({
      width: 87,
      height: 32,
      top: 26,
      right: 365,
      bottom: 58,
      left: 278,
    })),
  };
});

describe('responsiveUtils', () => {
  describe('getScreenSize', () => {
    it('应该返回xs对于小屏幕', () => {
      expect(getScreenSize(320)).toBe('xs');
    });

    it('应该返回sm对于中等小屏幕', () => {
      expect(getScreenSize(640)).toBe('sm');
    });

    it('应该返回md对于中等屏幕', () => {
      expect(getScreenSize(768)).toBe('md');
    });

    it('应该返回lg对于大屏幕', () => {
      expect(getScreenSize(1024)).toBe('lg');
    });

    it('应该返回xl对于超大屏幕', () => {
      expect(getScreenSize(1280)).toBe('xl');
    });

    it('应该返回2xl对于最大屏幕', () => {
      expect(getScreenSize(1536)).toBe('2xl');
    });
  });

  describe('matchScreenSize', () => {
    it('应该正确匹配屏幕尺寸', () => {
      expect(matchScreenSize('xs', 320)).toBe(true);
      expect(matchScreenSize('sm', 320)).toBe(false);
      expect(matchScreenSize('sm', 640)).toBe(true);
      expect(matchScreenSize('md', 640)).toBe(false);
      expect(matchScreenSize('md', 768)).toBe(true);
    });
  });

  describe('getResponsiveValue', () => {
    it('应该返回基本值', () => {
      expect(getResponsiveValue('basic value', 375)).toBe('basic value');
    });

    it('应该返回匹配屏幕尺寸的值', () => {
      const responsiveValue = {
        xs: 'small',
        sm: 'medium',
        md: 'large',
      };

      expect(getResponsiveValue(responsiveValue, 320)).toBe('small');
      expect(getResponsiveValue(responsiveValue, 640)).toBe('medium');
      expect(getResponsiveValue(responsiveValue, 768)).toBe('large');
    });

    it('应该向上查找匹配的值', () => {
      const responsiveValue = {
        sm: 'medium',
        lg: 'large',
      };

      // 对于xs尺寸，应该向上查找sm的值（最近的较大断点）
      expect(getResponsiveValue(responsiveValue, 320)).toBe('medium');

      // 对于md尺寸，应该向下查找sm的值（最近的较小断点）
      expect(getResponsiveValue(responsiveValue, 768)).toBe('medium');
    });

    it('应该处理undefined值', () => {
      const responsiveValue = {
        xs: 'small',
        lg: undefined,
      };

      expect(getResponsiveValue(responsiveValue, 320)).toBe('small');
      // md尺寸应该向下查找xs的值
      expect(getResponsiveValue(responsiveValue, 768)).toBe('small');
    });
  });

  describe('generateResponsiveStyles', () => {
    it('应该生成基本样式', () => {
      const styles = {
        color: 'red',
        fontSize: '16px',
      };

      const result = generateResponsiveStyles(styles, 375);
      expect(result).toEqual({
        color: 'red',
        fontSize: '16px',
      });
    });

    it('应该生成响应式样式', () => {
      const styles = {
        padding: {
          xs: '8px',
          sm: '16px',
          md: '24px',
        },
        margin: {
          xs: 0,
          sm: 'auto',
        },
      };

      // 对于xs屏幕
      let result = generateResponsiveStyles(styles, 320);
      expect(result).toEqual({
        padding: '8px',
        margin: 0,
      });

      // 对于sm屏幕
      result = generateResponsiveStyles(styles, 640);
      expect(result).toEqual({
        padding: '16px',
        margin: 'auto',
      });

      // 对于md屏幕
      result = generateResponsiveStyles(styles, 768);
      expect(result).toEqual({
        padding: '24px',
        margin: 'auto',
      });
    });

    it('应该忽略undefined值', () => {
      const styles = {
        padding: {
          xs: '8px',
          sm: undefined,
        },
        margin: {
          xs: 0,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = generateResponsiveStyles(styles as any, 640);
      // sm尺寸的padding是undefined，应该向下查找xs的值
      expect(result).toEqual({
        padding: '8px',
        margin: 0,
      });
    });
  });

  describe('useResponsive Hook', () => {
    it('应该返回正确的响应式值', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current.windowWidth).toBe(375);
      expect(result.current.windowHeight).toBe(667);
      expect(result.current.screenSize).toBe('xs');
      expect(result.current.isMobile).toBe(true);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(false);
    });

    it('应该提供getResponsiveValue函数', () => {
      const { result } = renderHook(() => useResponsive());

      const responsiveValue = {
        xs: 'small',
        sm: 'medium',
        md: 'large',
      };

      expect(result.current.getResponsiveValue(responsiveValue)).toBe('small');
    });

    it('应该提供generateResponsiveStyles函数', () => {
      const { result } = renderHook(() => useResponsive());

      const styles = {
        padding: {
          xs: '8px',
          sm: '16px',
        },
      };

      const generatedStyles = result.current.generateResponsiveStyles(styles);
      expect(generatedStyles).toEqual({
        padding: '8px',
      });
    });

    it('应该提供matchScreenSize函数', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current.matchScreenSize('xs')).toBe(true);
      expect(result.current.matchScreenSize('sm')).toBe(false);
    });

    it('应该返回平台信息', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current.platform).toBeDefined();
      expect(['web', 'weapp', 'h5']).toContain(result.current.platform);
    });

    it('应该返回安全区域信息', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current.safeArea).toEqual({
        top: 20,
        bottom: 667,
        left: 0,
        right: 375,
      });
    });

    it('应该返回状态栏高度', () => {
      const { result } = renderHook(() => useResponsive());

      expect(result.current.statusBarHeight).toBe(20);
    });

    it('应该返回导航栏高度', () => {
      const { result } = renderHook(() => useResponsive());

      // 状态栏高度(20) + 导航栏高度(44) = 64
      expect(result.current.navigationBarHeight).toBe(64);
    });
  });

  describe('响应式值综合测试', () => {
    it('应该正确处理复杂的响应式配置', () => {
      const { result } = renderHook(() => useResponsive());

      const complexConfig = {
        padding: {
          xs: '8px',
          sm: '16px',
          md: '24px',
          lg: '32px',
        },
        margin: {
          xs: 0,
          sm: 'auto',
          lg: 'auto',
        },
        fontSize: {
          xs: '14px',
          sm: '16px',
          md: '18px',
        },
        display: 'flex',
      };

      const styles = result.current.generateResponsiveStyles(complexConfig);

      expect(styles).toEqual({
        padding: '8px',
        margin: 0,
        fontSize: '14px',
        display: 'flex',
      });
    });

    it('应该正确处理混合类型的响应式值', () => {
      const { result } = renderHook(() => useResponsive());

      const mixedConfig = {
        padding: '8px', // 基本值
        margin: {
          xs: 0,
          sm: 'auto',
        },
        borderRadius: {
          xs: '4px',
          md: 8,
        },
        color: 'red', // 基本值
      };

      const styles = result.current.generateResponsiveStyles(mixedConfig);

      expect(styles).toEqual({
        padding: '8px',
        margin: 0,
        borderRadius: '4px',
        color: 'red',
      });
    });
  });
});