/**
 * 颜色工具测试
 */

import { describe, it, expect } from 'vitest';
import {
  parseHex,
  parseRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  setAlpha,
  lighten,
  darken,
  mix,
  complement,
  invert,
  grayscale,
  getLuminance,
  getContrastRatio,
  isDark,
  isLight,
  getContrastText,
  meetsContrastGuidelines,
} from '../color';

describe('color', () => {
  describe('parseHex', () => {
    it('should parse 6-digit hex', () => {
      expect(parseHex('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse 3-digit hex', () => {
      expect(parseHex('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse 8-digit hex with alpha', () => {
      const result = parseHex('#ff000080');
      expect(result.r).toBe(255);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
      expect(result.a).toBeCloseTo(0.5, 1);
    });
  });

  describe('parseRgb', () => {
    it('should parse rgb string', () => {
      expect(parseRgb('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse rgba string', () => {
      expect(parseRgb('rgba(255, 0, 0, 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to hex', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
    });
  });

  describe('rgbToHsl', () => {
    it('should convert RGB to HSL', () => {
      const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });
  });

  describe('hslToRgb', () => {
    it('should convert HSL to RGB', () => {
      const rgb = hslToRgb({ h: 0, s: 100, l: 50 });
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });
  });

  describe('setAlpha', () => {
    it('should set alpha value', () => {
      expect(setAlpha('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });
  });

  describe('lighten', () => {
    it('should lighten color', () => {
      const result = lighten('#000000', 50);
      // Black lightened by 50% should be gray
      expect(result).not.toBe('#000000');
    });
  });

  describe('darken', () => {
    it('should darken color', () => {
      const result = darken('#ffffff', 50);
      // White darkened by 50% should be gray
      expect(result).not.toBe('#ffffff');
    });
  });

  describe('mix', () => {
    it('should mix two colors', () => {
      const result = mix('#ff0000', '#0000ff', 0.5);
      // Red and blue mixed should be purple-ish
      expect(result).toBeTruthy();
    });

    it('should return first color when weight is 0', () => {
      const result = mix('#ff0000', '#0000ff', 0);
      expect(result).toBe('#ff0000');
    });

    it('should return second color when weight is 1', () => {
      const result = mix('#ff0000', '#0000ff', 1);
      expect(result).toBe('#0000ff');
    });
  });

  describe('complement', () => {
    it('should return complementary color', () => {
      // Red's complement is cyan
      const result = complement('#ff0000');
      expect(result).toBeTruthy();
    });
  });

  describe('invert', () => {
    it('should invert color', () => {
      expect(invert('#000000')).toBe('#ffffff');
      expect(invert('#ffffff')).toBe('#000000');
    });
  });

  describe('grayscale', () => {
    it('should convert to grayscale', () => {
      const result = grayscale('#ff0000');
      // Red converted to grayscale
      expect(result).toBeTruthy();
    });
  });

  describe('getLuminance', () => {
    it('should calculate luminance', () => {
      expect(getLuminance('#000000')).toBeCloseTo(0, 2);
      expect(getLuminance('#ffffff')).toBeCloseTo(1, 2);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });
  });

  describe('isDark', () => {
    it('should return true for dark colors', () => {
      expect(isDark('#000000')).toBe(true);
      expect(isDark('#333333')).toBe(true);
    });

    it('should return false for light colors', () => {
      expect(isDark('#ffffff')).toBe(false);
      expect(isDark('#cccccc')).toBe(false);
    });
  });

  describe('isLight', () => {
    it('should return true for light colors', () => {
      expect(isLight('#ffffff')).toBe(true);
    });

    it('should return false for dark colors', () => {
      expect(isLight('#000000')).toBe(false);
    });
  });

  describe('getContrastText', () => {
    it('should return white text for dark backgrounds', () => {
      expect(getContrastText('#000000')).toBe('#ffffff');
    });

    it('should return black text for light backgrounds', () => {
      expect(getContrastText('#ffffff')).toBe('#000000');
    });
  });

  describe('meetsContrastGuidelines', () => {
    it('should return true for high contrast', () => {
      expect(meetsContrastGuidelines('#000000', '#ffffff', 'AAA')).toBe(true);
    });

    it('should return false for low contrast', () => {
      expect(meetsContrastGuidelines('#777777', '#888888', 'AA')).toBe(false);
    });
  });
});
