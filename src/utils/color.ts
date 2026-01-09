/**
 * 颜色处理工具
 * 提供颜色转换、混合、对比度计算等功能
 */

/** RGB 颜色对象 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** RGBA 颜色对象 */
export interface RGBA extends RGB {
  a: number;
}

/** HSL 颜色对象 */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/** HSLA 颜色对象 */
export interface HSLA extends HSL {
  a: number;
}

// ==================== 解析函数 ====================

/**
 * 解析十六进制颜色
 *
 * @example
 * ```typescript
 * parseHex('#ff0000') // => { r: 255, g: 0, b: 0 }
 * parseHex('#f00') // => { r: 255, g: 0, b: 0 }
 * parseHex('#ff000080') // => { r: 255, g: 0, b: 0, a: 0.5 }
 * ```
 */
export function parseHex(hex: string): RGBA {
  let h = hex.replace('#', '');

  // 处理简写形式
  if (h.length === 3) {
    h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
  } else if (h.length === 4) {
    h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2) + h.charAt(3) + h.charAt(3);
  }

  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : 1;

  return { r, g, b, a };
}

/**
 * 解析 RGB/RGBA 字符串
 *
 * @example
 * ```typescript
 * parseRgb('rgb(255, 0, 0)') // => { r: 255, g: 0, b: 0, a: 1 }
 * parseRgb('rgba(255, 0, 0, 0.5)') // => { r: 255, g: 0, b: 0, a: 0.5 }
 * ```
 */
export function parseRgb(rgb: string): RGBA {
  const match = rgb.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);

  if (!match) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  return {
    r: parseInt(match[1] ?? '0', 10),
    g: parseInt(match[2] ?? '0', 10),
    b: parseInt(match[3] ?? '0', 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

/**
 * 解析 HSL/HSLA 字符串
 *
 * @example
 * ```typescript
 * parseHsl('hsl(0, 100%, 50%)') // => { h: 0, s: 100, l: 50, a: 1 }
 * parseHsl('hsla(0, 100%, 50%, 0.5)') // => { h: 0, s: 100, l: 50, a: 0.5 }
 * ```
 */
export function parseHsl(hsl: string): HSLA {
  const match = hsl.match(/hsla?\s*\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/);

  if (!match) {
    return { h: 0, s: 0, l: 0, a: 1 };
  }

  return {
    h: parseInt(match[1] ?? '0', 10),
    s: parseFloat(match[2] ?? '0'),
    l: parseFloat(match[3] ?? '0'),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

/**
 * 解析任意颜色字符串
 *
 * @example
 * ```typescript
 * parseColor('#ff0000') // => { r: 255, g: 0, b: 0, a: 1 }
 * parseColor('rgb(255, 0, 0)') // => { r: 255, g: 0, b: 0, a: 1 }
 * ```
 */
export function parseColor(color: string): RGBA {
  if (color.startsWith('#')) {
    return parseHex(color);
  }
  if (color.startsWith('rgb')) {
    return parseRgb(color);
  }
  if (color.startsWith('hsl')) {
    const hsla = parseHsl(color);
    return hslaToRgba(hsla);
  }
  // 默认返回黑色
  return { r: 0, g: 0, b: 0, a: 1 };
}

// ==================== 转换函数 ====================

/**
 * RGB 转十六进制
 *
 * @example
 * ```typescript
 * rgbToHex({ r: 255, g: 0, b: 0 }) // => '#ff0000'
 * ```
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number): string => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * RGBA 转十六进制（包含透明度）
 *
 * @example
 * ```typescript
 * rgbaToHex({ r: 255, g: 0, b: 0, a: 0.5 }) // => '#ff000080'
 * ```
 */
export function rgbaToHex(rgba: RGBA): string {
  const hex = rgbToHex(rgba);
  if (rgba.a === 1) {
    return hex;
  }
  const alphaHex = Math.round(rgba.a * 255).toString(16);
  return hex + (alphaHex.length === 1 ? '0' + alphaHex : alphaHex);
}

/**
 * RGB 转 HSL
 *
 * @example
 * ```typescript
 * rgbToHsl({ r: 255, g: 0, b: 0 }) // => { h: 0, s: 100, l: 50 }
 * ```
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * HSL 转 RGB
 *
 * @example
 * ```typescript
 * hslToRgb({ h: 0, s: 100, l: 50 }) // => { r: 255, g: 0, b: 0 }
 * ```
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * HSLA 转 RGBA
 */
export function hslaToRgba(hsla: HSLA): RGBA {
  const rgb = hslToRgb(hsla);
  return { ...rgb, a: hsla.a };
}

/**
 * RGBA 转 HSLA
 */
export function rgbaToHsla(rgba: RGBA): HSLA {
  const hsl = rgbToHsl(rgba);
  return { ...hsl, a: rgba.a };
}

// ==================== 颜色操作函数 ====================

/**
 * 调整颜色透明度
 *
 * @example
 * ```typescript
 * setAlpha('#ff0000', 0.5) // => 'rgba(255, 0, 0, 0.5)'
 * ```
 */
export function setAlpha(color: string, alpha: number): string {
  const rgba = parseColor(color);
  rgba.a = Math.max(0, Math.min(1, alpha));
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

/**
 * 调整颜色亮度
 *
 * @example
 * ```typescript
 * lighten('#ff0000', 20) // => 亮度增加 20%
 * darken('#ff0000', 20) // => 亮度减少 20%
 * ```
 */
export function adjustLightness(color: string, amount: number): string {
  const rgba = parseColor(color);
  const hsla = rgbaToHsla(rgba);
  hsla.l = Math.max(0, Math.min(100, hsla.l + amount));
  const newRgba = hslaToRgba(hsla);
  return rgba.a < 1
    ? `rgba(${newRgba.r}, ${newRgba.g}, ${newRgba.b}, ${newRgba.a})`
    : rgbToHex(newRgba);
}

/**
 * 使颜色变亮
 */
export function lighten(color: string, amount: number): string {
  return adjustLightness(color, amount);
}

/**
 * 使颜色变暗
 */
export function darken(color: string, amount: number): string {
  return adjustLightness(color, -amount);
}

/**
 * 调整颜色饱和度
 *
 * @example
 * ```typescript
 * saturate('#ff0000', 20) // => 饱和度增加 20%
 * desaturate('#ff0000', 20) // => 饱和度减少 20%
 * ```
 */
export function adjustSaturation(color: string, amount: number): string {
  const rgba = parseColor(color);
  const hsla = rgbaToHsla(rgba);
  hsla.s = Math.max(0, Math.min(100, hsla.s + amount));
  const newRgba = hslaToRgba(hsla);
  return rgba.a < 1
    ? `rgba(${newRgba.r}, ${newRgba.g}, ${newRgba.b}, ${newRgba.a})`
    : rgbToHex(newRgba);
}

/**
 * 增加饱和度
 */
export function saturate(color: string, amount: number): string {
  return adjustSaturation(color, amount);
}

/**
 * 减少饱和度
 */
export function desaturate(color: string, amount: number): string {
  return adjustSaturation(color, -amount);
}

/**
 * 混合两种颜色
 *
 * @example
 * ```typescript
 * mix('#ff0000', '#0000ff', 0.5) // => 红蓝混合
 * ```
 */
export function mix(color1: string, color2: string, weight = 0.5): string {
  const rgba1 = parseColor(color1);
  const rgba2 = parseColor(color2);

  const w = Math.max(0, Math.min(1, weight));
  const w1 = 1 - w;

  const r = Math.round(rgba1.r * w1 + rgba2.r * w);
  const g = Math.round(rgba1.g * w1 + rgba2.g * w);
  const b = Math.round(rgba1.b * w1 + rgba2.b * w);
  const a = rgba1.a * w1 + rgba2.a * w;

  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return rgbToHex({ r, g, b });
}

/**
 * 获取颜色的补色
 *
 * @example
 * ```typescript
 * complement('#ff0000') // => '#00ffff'
 * ```
 */
export function complement(color: string): string {
  const rgba = parseColor(color);
  const hsla = rgbaToHsla(rgba);
  hsla.h = (hsla.h + 180) % 360;
  const newRgba = hslaToRgba(hsla);
  return rgba.a < 1
    ? `rgba(${newRgba.r}, ${newRgba.g}, ${newRgba.b}, ${newRgba.a})`
    : rgbToHex(newRgba);
}

/**
 * 反转颜色
 *
 * @example
 * ```typescript
 * invert('#ff0000') // => '#00ffff'
 * ```
 */
export function invert(color: string): string {
  const rgba = parseColor(color);
  return rgba.a < 1
    ? `rgba(${255 - rgba.r}, ${255 - rgba.g}, ${255 - rgba.b}, ${rgba.a})`
    : rgbToHex({ r: 255 - rgba.r, g: 255 - rgba.g, b: 255 - rgba.b });
}

/**
 * 转换为灰度
 *
 * @example
 * ```typescript
 * grayscale('#ff0000') // => '#4c4c4c'
 * ```
 */
export function grayscale(color: string): string {
  const rgba = parseColor(color);
  // 使用加权平均值计算灰度
  const gray = Math.round(rgba.r * 0.299 + rgba.g * 0.587 + rgba.b * 0.114);
  return rgba.a < 1
    ? `rgba(${gray}, ${gray}, ${gray}, ${rgba.a})`
    : rgbToHex({ r: gray, g: gray, b: gray });
}

// ==================== 对比度和可访问性 ====================

/**
 * 计算颜色的相对亮度
 * 基于 WCAG 2.0 标准
 */
export function getLuminance(color: string): number {
  const rgba = parseColor(color);

  const toLinear = (c: number): number => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const r = toLinear(rgba.r);
  const g = toLinear(rgba.g);
  const b = toLinear(rgba.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * 计算两种颜色的对比度
 * 基于 WCAG 2.0 标准
 *
 * @example
 * ```typescript
 * getContrastRatio('#000000', '#ffffff') // => 21
 * ```
 */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 判断颜色是否为深色
 *
 * @example
 * ```typescript
 * isDark('#000000') // => true
 * isDark('#ffffff') // => false
 * ```
 */
export function isDark(color: string): boolean {
  return getLuminance(color) < 0.5;
}

/**
 * 判断颜色是否为浅色
 */
export function isLight(color: string): boolean {
  return !isDark(color);
}

/**
 * 获取适合在指定背景色上显示的文字颜色
 *
 * @example
 * ```typescript
 * getContrastText('#000000') // => '#ffffff'
 * getContrastText('#ffffff') // => '#000000'
 * ```
 */
export function getContrastText(
  backgroundColor: string,
  lightText = '#ffffff',
  darkText = '#000000',
): string {
  return isDark(backgroundColor) ? lightText : darkText;
}

/**
 * 检查颜色对比度是否符合 WCAG 标准
 *
 * @param level 'AA' 或 'AAA'
 * @param size 'normal' 或 'large'
 */
export function meetsContrastGuidelines(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal',
): boolean {
  const ratio = getContrastRatio(color1, color2);

  const thresholds = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  return ratio >= thresholds[level][size];
}

// ==================== 格式化函数 ====================

/**
 * 格式化为 RGB 字符串
 */
export function toRgbString(color: string): string {
  const rgba = parseColor(color);
  return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
}

/**
 * 格式化为 RGBA 字符串
 */
export function toRgbaString(color: string): string {
  const rgba = parseColor(color);
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

/**
 * 格式化为 HSL 字符串
 */
export function toHslString(color: string): string {
  const rgba = parseColor(color);
  const hsl = rgbToHsl(rgba);
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

/**
 * 格式化为 HSLA 字符串
 */
export function toHslaString(color: string): string {
  const rgba = parseColor(color);
  const hsla = rgbaToHsla(rgba);
  return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
}

/**
 * 格式化为十六进制字符串
 */
export function toHexString(color: string): string {
  const rgba = parseColor(color);
  return rgba.a < 1 ? rgbaToHex(rgba) : rgbToHex(rgba);
}

// ==================== 默认导出 ====================

export default {
  parseHex,
  parseRgb,
  parseHsl,
  parseColor,
  rgbToHex,
  rgbaToHex,
  rgbToHsl,
  hslToRgb,
  hslaToRgba,
  rgbaToHsla,
  setAlpha,
  adjustLightness,
  lighten,
  darken,
  adjustSaturation,
  saturate,
  desaturate,
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
  toRgbString,
  toRgbaString,
  toHslString,
  toHslaString,
  toHexString,
};
