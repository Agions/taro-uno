/**
 * 样式处理工具
 * 提供样式对象的合并、转换和处理功能
 */

import type { CSSProperties } from 'react';

/** 样式值类型 */
export type StyleValue = CSSProperties | undefined | null | false;

/** 响应式样式值 */
export type ResponsiveStyleValue<T> = T | { sm?: T; md?: T; lg?: T; xl?: T };

/**
 * 合并多个样式对象
 * 后面的样式会覆盖前面的样式
 *
 * @example
 * ```typescript
 * mergeStyles({ color: 'red' }, { fontSize: 14 }) // => { color: 'red', fontSize: 14 }
 * mergeStyles({ color: 'red' }, { color: 'blue' }) // => { color: 'blue' }
 * ```
 */
export function mergeStyles(...styles: StyleValue[]): CSSProperties {
  const result: CSSProperties = {};

  for (const style of styles) {
    if (!style) continue;
    Object.assign(result, style);
  }

  return result;
}

/**
 * 条件样式
 * 根据条件返回样式或空对象
 *
 * @example
 * ```typescript
 * conditionalStyle({ opacity: 0.5 }, isDisabled) // => { opacity: 0.5 } or {}
 * ```
 */
export function conditionalStyle(
  style: CSSProperties,
  condition: boolean | undefined | null,
): CSSProperties {
  return condition ? style : {};
}

/**
 * 从样式对象中选取指定属性
 *
 * @example
 * ```typescript
 * pickStyles({ color: 'red', fontSize: 14, padding: 10 }, ['color', 'fontSize'])
 * // => { color: 'red', fontSize: 14 }
 * ```
 */
export function pickStyles<K extends keyof CSSProperties>(
  style: CSSProperties,
  keys: K[],
): Pick<CSSProperties, K> {
  const result = {} as Pick<CSSProperties, K>;

  for (const key of keys) {
    if (key in style) {
      result[key] = style[key];
    }
  }

  return result;
}

/**
 * 从样式对象中排除指定属性
 *
 * @example
 * ```typescript
 * omitStyles({ color: 'red', fontSize: 14, padding: 10 }, ['padding'])
 * // => { color: 'red', fontSize: 14 }
 * ```
 */
export function omitStyles<K extends keyof CSSProperties>(
  style: CSSProperties,
  keys: K[],
): Omit<CSSProperties, K> {
  const result = { ...style };
  const keysSet = new Set<string>(keys as string[]);

  for (const key of Object.keys(result)) {
    if (keysSet.has(key)) {
      delete result[key as keyof CSSProperties];
    }
  }

  return result;
}

/**
 * 将样式对象转换为内联样式字符串
 *
 * @example
 * ```typescript
 * styleToString({ color: 'red', fontSize: '14px' }) // => 'color: red; font-size: 14px;'
 * ```
 */
export function styleToString(style: CSSProperties): string {
  if (!style || Object.keys(style).length === 0) {
    return '';
  }

  return Object.entries(style)
    .map(([key, value]) => {
      if (value === undefined || value === null) return '';
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .filter(Boolean)
    .join('; ');
}

/**
 * 将内联样式字符串转换为样式对象
 *
 * @example
 * ```typescript
 * stringToStyle('color: red; font-size: 14px') // => { color: 'red', fontSize: '14px' }
 * ```
 */
export function stringToStyle(styleString: string): CSSProperties {
  if (!styleString || typeof styleString !== 'string') {
    return {};
  }

  const result: Record<string, string> = {};
  const declarations = styleString.split(';').filter(Boolean);

  for (const declaration of declarations) {
    const [property, ...valueParts] = declaration.split(':');
    if (!property || valueParts.length === 0) continue;

    const key = property
      .trim()
      .replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
    const value = valueParts.join(':').trim();

    if (key && value) {
      result[key] = value;
    }
  }

  return result as CSSProperties;
}

/**
 * 添加单位到数值
 *
 * @example
 * ```typescript
 * addUnit(10) // => '10px'
 * addUnit(10, 'rem') // => '10rem'
 * addUnit('10px') // => '10px'
 * ```
 */
export function addUnit(value: string | number | undefined | null, unit = 'px'): string {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return `${value}${unit}`;
}

/**
 * 从带单位的值中提取数值
 *
 * @example
 * ```typescript
 * parseUnit('10px') // => 10
 * parseUnit('1.5rem') // => 1.5
 * parseUnit(10) // => 10
 * ```
 */
export function parseUnit(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === '') {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

/**
 * 创建间距样式
 *
 * @example
 * ```typescript
 * createSpacing(10) // => { margin: '10px' }
 * createSpacing([10, 20]) // => { marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px' }
 * createSpacing([10, 20, 30, 40]) // => { marginTop: '10px', marginRight: '20px', marginBottom: '30px', marginLeft: '40px' }
 * ```
 */
export function createSpacing(
  value: number | [number, number] | [number, number, number, number],
  property: 'margin' | 'padding' = 'margin',
  unit = 'px',
): CSSProperties {
  if (typeof value === 'number') {
    return { [property]: addUnit(value, unit) };
  }

  if (value.length === 2) {
    const [vertical, horizontal] = value;
    return {
      [`${property}Top`]: addUnit(vertical, unit),
      [`${property}Bottom`]: addUnit(vertical, unit),
      [`${property}Left`]: addUnit(horizontal, unit),
      [`${property}Right`]: addUnit(horizontal, unit),
    };
  }

  const [top, right, bottom, left] = value;
  return {
    [`${property}Top`]: addUnit(top, unit),
    [`${property}Right`]: addUnit(right, unit),
    [`${property}Bottom`]: addUnit(bottom, unit),
    [`${property}Left`]: addUnit(left, unit),
  };
}

/**
 * 创建 flex 布局样式
 *
 * @example
 * ```typescript
 * createFlexStyle({ justify: 'center', align: 'center' })
 * // => { display: 'flex', justifyContent: 'center', alignItems: 'center' }
 * ```
 */
export function createFlexStyle(options: {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
  inline?: boolean;
}): CSSProperties {
  const { direction, justify, align, wrap, gap, inline } = options;

  const style: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
  };

  if (direction) style.flexDirection = direction;
  if (justify) style.justifyContent = justify;
  if (align) style.alignItems = align;
  if (wrap) style.flexWrap = wrap;
  if (gap !== undefined) style.gap = typeof gap === 'number' ? addUnit(gap) : gap;

  return style;
}

/**
 * 创建定位样式
 *
 * @example
 * ```typescript
 * createPositionStyle('absolute', { top: 0, left: 0 })
 * // => { position: 'absolute', top: 0, left: 0 }
 * ```
 */
export function createPositionStyle(
  position: 'relative' | 'absolute' | 'fixed' | 'sticky',
  offsets?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  },
): CSSProperties {
  const style: CSSProperties = { position };

  if (offsets) {
    if (offsets.top !== undefined) style.top = offsets.top;
    if (offsets.right !== undefined) style.right = offsets.right;
    if (offsets.bottom !== undefined) style.bottom = offsets.bottom;
    if (offsets.left !== undefined) style.left = offsets.left;
  }

  return style;
}

/**
 * 创建尺寸样式
 *
 * @example
 * ```typescript
 * createSizeStyle(100) // => { width: '100px', height: '100px' }
 * createSizeStyle(100, 200) // => { width: '100px', height: '200px' }
 * createSizeStyle('100%', 'auto') // => { width: '100%', height: 'auto' }
 * ```
 */
export function createSizeStyle(
  width: number | string,
  height?: number | string,
): CSSProperties {
  return {
    width: typeof width === 'number' ? addUnit(width) : width,
    height: typeof (height ?? width) === 'number' ? addUnit(height ?? width) : (height ?? width),
  };
}

// 默认导出
export default {
  mergeStyles,
  conditionalStyle,
  pickStyles,
  omitStyles,
  styleToString,
  stringToStyle,
  addUnit,
  parseUnit,
  createSpacing,
  createFlexStyle,
  createPositionStyle,
  createSizeStyle,
};
