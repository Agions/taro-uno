/**
 * 主题工具函数
 * 提供主题相关的实用工具和辅助函数
 */

import { ThemeConfig } from './types';

// 颜色工具
export class ColorUtils {
  /**
   * 将十六进制颜色转换为RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1] || '0', 16),
          g: parseInt(result[2] || '0', 16),
          b: parseInt(result[3] || '0', 16),
        }
      : null;
  }

  /**
   * 将RGB转换为十六进制颜色
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * 将十六进制颜色转换为HSL
   */
  static hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  /**
   * 将HSL转换为十六进制颜色
   */
  static hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return this.rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  /**
   * 调整颜色亮度
   */
  static adjustBrightness(hex: string, amount: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const adjust = (color: number): number => {
      const newColor = color + amount;
      return Math.max(0, Math.min(255, newColor));
    };

    return this.rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
  }

  /**
   * 调整颜色饱和度
   */
  static adjustSaturation(hex: string, amount: number): string {
    const hsl = this.hexToHsl(hex);
    if (!hsl) return hex;

    const newS = Math.max(0, Math.min(100, hsl.s + amount));
    return this.hslToHex(hsl.h, newS, hsl.l);
  }

  /**
   * 调整颜色色相
   */
  static adjustHue(hex: string, amount: number): string {
    const hsl = this.hexToHsl(hex);
    if (!hsl) return hex;

    const newH = (hsl.h + amount) % 360;
    return this.hslToHex(newH, hsl.s, hsl.l);
  }

  /**
   * 生成颜色渐变
   */
  static generateGradient(color1: string, color2: string, steps: number): string[] {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) return [];

    const gradient: string[] = [];

    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);

      gradient.push(this.rgbToHex(r, g, b));
    }

    return gradient;
  }

  /**
   * 检查颜色对比度
   */
  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) return 0;

    const getLuminance = (r: number, g: number, b: number): number => {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * (rs || 0) + 0.7152 * (gs || 0) + 0.0722 * (bs || 0);
    };

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * 检查是否满足WCAG对比度标准
   */
  static meetsWCAGStandard(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
    const ratio = this.getContrastRatio(color1, color2);

    if (level === 'AA') {
      return ratio >= 4.5;
    } else {
      return ratio >= 7;
    }
  }
}

// 响应式工具
export class ResponsiveUtils {
  /**
   * 获取当前屏幕尺寸
   */
  static getScreenSize(): { width: number; height: number } {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * 获取当前断点
   */
  static getCurrentBreakpoint(breakpoints: Record<string, number>): string {
    const width = this.getScreenSize().width;

    const breakpointEntries = Object.entries(breakpoints).sort(([, a], [, b]) => b - a);

    for (const [name, value] of breakpointEntries) {
      if (width >= value) {
        return name;
      }
    }

    return breakpointEntries[breakpointEntries.length - 1]?.[0] || 'md';
  }

  /**
   * 检查是否为移动设备
   */
  static isMobile(): boolean {
    if (typeof window === 'undefined') return false;

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * 检查是否为平板设备
   */
  static isTablet(): boolean {
    if (typeof window === 'undefined') return false;

    const width = this.getScreenSize().width;
    return width >= 768 && width <= 1024;
  }

  /**
   * 检查是否为桌面设备
   */
  static isDesktop(): boolean {
    if (typeof window === 'undefined') return false;

    const width = this.getScreenSize().width;
    return width > 1024;
  }
}

// 主题验证工具
export class ThemeValidator {
  /**
   * 验证主题配置
   */
  static validateTheme(theme: Partial<ThemeConfig>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证颜色
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        if (!this.isValidColor(value)) {
          errors.push(`Invalid color value for ${key}: ${value}`);
        }
      });
    }

    // 验证间距
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        if (key !== 'breakpoints' && typeof value !== 'number') {
          errors.push(`Invalid spacing value for ${key}: ${value}`);
        }
      });
    }

    // 验证字体大小
    if (theme.typography?.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        if (typeof value !== 'number') {
          errors.push(`Invalid font size value for ${key}: ${value}`);
        }
      });
    }

    // 验证字体粗细
    if (theme.typography?.fontWeight) {
      Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
        if (typeof value !== 'number') {
          errors.push(`Invalid font weight value for ${key}: ${value}`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * 检查是否为有效的颜色值
   */
  static isValidColor(color: string): boolean {
    const colorRegex =
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$|^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$|^hsl\(\s*\d+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)$|^hsla\(\s*\d+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)$|[a-zA-Z]+$/;
    return colorRegex.test(color);
  }

  /**
   * 检查主题的可访问性
   */
  static checkAccessibility(theme: ThemeConfig): { score: number; issues: string[] } {
    const issues: string[] = [];
    let score = 100;

    // 检查文本与背景的对比度
    const textContrast = ColorUtils.getContrastRatio(theme.colors.text, theme.colors.background);
    if (textContrast < 4.5) {
      issues.push(`Text contrast ratio is too low: ${textContrast.toFixed(2)} (should be at least 4.5)`);
      score -= 20;
    }

    // 检查次要文本的对比度
    const secondaryTextContrast = ColorUtils.getContrastRatio(theme.colors.textSecondary, theme.colors.background);
    if (secondaryTextContrast < 3) {
      issues.push(
        `Secondary text contrast ratio is too low: ${secondaryTextContrast.toFixed(2)} (should be at least 3)`,
      );
      score -= 10;
    }

    // 检查按钮文本的对比度
    const buttonTextContrast = ColorUtils.getContrastRatio(theme.colors.textInverse, theme.colors.primary);
    if (buttonTextContrast < 4.5) {
      issues.push(`Button text contrast ratio is too low: ${buttonTextContrast.toFixed(2)} (should be at least 4.5)`);
      score -= 15;
    }

    return {
      score: Math.max(0, score),
      issues,
    };
  }
}

// 性能监控工具
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  /**
   * 记录性能指标
   */
  static recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  /**
   * 获取性能统计
   */
  static getStats(name: string): { count: number; average: number; min: number; max: number } {
    const values = this.metrics.get(name) || [];

    if (values.length === 0) {
      return { count: 0, average: 0, min: 0, max: 0 };
    }

    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
      count: values.length,
      average,
      min,
      max,
    };
  }

  /**
   * 清理性能指标
   */
  static clearMetrics(): void {
    this.metrics.clear();
  }

  /**
   * 获取所有性能报告
   */
  static getReport(): Record<string, any> {
    const report: Record<string, any> = {};

    this.metrics.forEach((_, name) => {
      report[name] = this.getStats(name);
    });

    return report;
  }
}

// 主题预设
export const ThemePresets = {
  // 默认主题
  default: {
    name: '默认主题',
    description: '标准的蓝色主题',
    colors: {
      primary: '#0ea5e9',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // 紫色主题
  purple: {
    name: '紫色主题',
    description: '优雅的紫色主题',
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // 绿色主题
  green: {
    name: '绿色主题',
    description: '清新的绿色主题',
    colors: {
      primary: '#10b981',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // 橙色主题
  orange: {
    name: '橙色主题',
    description: '温暖的橙色主题',
    colors: {
      primary: '#f97316',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // 粉色主题
  pink: {
    name: '粉色主题',
    description: '浪漫的粉色主题',
    colors: {
      primary: '#ec4899',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
};

// 导出工具函数
export const themeUtils = {
  color: ColorUtils,
  responsive: ResponsiveUtils,
  validator: ThemeValidator,
  performance: PerformanceMonitor,
  presets: ThemePresets,
};

export default themeUtils;
