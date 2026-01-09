/**
 * 样式相关类型定义
 * 提供 CSS 值、样式对象和响应式值的类型定义
 * @module types/style
 */

import type { CSSProperties } from 'react';
import type { Breakpoint } from './common';

// ==================== CSS 单位类型 ====================

/**
 * CSS 单位类型
 * @description 定义支持的 CSS 单位
 */
export type CSSUnit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%' | 'rpx' | 'vmin' | 'vmax';

/**
 * CSS 数值类型
 * @description 带单位的 CSS 数值
 */
export type CSSNumericValue = `${number}${CSSUnit}`;

/**
 * CSS 值类型
 * @description 可以是数字、带单位的字符串或关键字
 */
export type CSSValue = number | CSSNumericValue | 'auto' | 'inherit' | 'initial' | 'unset';

// ==================== 尺寸值类型 ====================

/**
 * 尺寸值类型
 * @description 用于宽度、高度等尺寸属性
 */
export type SizeValue = number | CSSNumericValue | 'auto' | 'fit-content' | 'max-content' | 'min-content' | '100%';

/**
 * 间距值类型
 * @description 用于 margin、padding 等间距属性
 */
export type SpacingValue = number | CSSNumericValue | 'auto';

/**
 * 边框半径值类型
 * @description 用于 border-radius 属性
 */
export type BorderRadiusValue = number | CSSNumericValue | '50%' | 'inherit';

// ==================== 颜色值类型 ====================

/**
 * 十六进制颜色
 * @description 3位或6位十六进制颜色值
 */
export type HexColor = `#${string}`;

/**
 * RGB 颜色
 * @description RGB 颜色函数
 */
export type RGBColor = `rgb(${number}, ${number}, ${number})`;

/**
 * RGBA 颜色
 * @description RGBA 颜色函数
 */
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;

/**
 * HSL 颜色
 * @description HSL 颜色函数
 */
export type HSLColor = `hsl(${number}, ${number}%, ${number}%)`;

/**
 * 颜色值类型
 * @description 支持的颜色值类型
 */
export type ColorValue = HexColor | RGBColor | RGBAColor | HSLColor | 'transparent' | 'currentColor' | 'inherit' | string;

// ==================== 样式对象类型 ====================

/**
 * 样式对象类型
 * @description React CSSProperties 的别名
 */
export type StyleObject = CSSProperties;

/**
 * 部分样式对象类型
 * @description 可选的样式属性
 */
export type PartialStyleObject = Partial<CSSProperties>;

/**
 * 样式函数类型
 * @description 根据 props 动态生成样式的函数
 * @template P Props 类型
 */
export type StyleFunction<P = Record<string, unknown>> = (props: P) => StyleObject;

/**
 * 样式或样式函数类型
 * @description 可以是静态样式对象或动态样式函数
 * @template P Props 类型
 */
export type StyleOrFunction<P = Record<string, unknown>> = StyleObject | StyleFunction<P>;

// ==================== 响应式值类型 ====================

/**
 * 响应式值类型
 * @description 根据断点定义不同的值
 * @template T 值的类型
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * 响应式样式对象
 * @description 根据断点定义不同的样式
 */
export type ResponsiveStyleObject = ResponsiveValue<StyleObject>;

/**
 * 响应式尺寸值
 * @description 根据断点定义不同的尺寸
 */
export type ResponsiveSizeValue = ResponsiveValue<SizeValue>;

/**
 * 响应式间距值
 * @description 根据断点定义不同的间距
 */
export type ResponsiveSpacingValue = ResponsiveValue<SpacingValue>;

/**
 * 响应式布尔值
 * @description 根据断点定义不同的布尔值
 */
export type ResponsiveBoolean = ResponsiveValue<boolean>;

// ==================== 样式变体类型 ====================

/**
 * 样式变体映射
 * @description 变体名称到样式的映射
 * @template K 变体名称类型
 */
export type StyleVariants<K extends string = string> = Record<K, StyleObject>;

/**
 * 复合变体配置
 * @description 多个变体组合的样式配置
 */
export interface CompoundVariant<V extends Record<string, string>> {
  /**
   * 变体条件
   */
  variants: Partial<V>;

  /**
   * 匹配时应用的样式
   */
  style: StyleObject;
}

/**
 * 样式配方配置
 * @description 类似 vanilla-extract 的样式配方
 * @template V 变体配置类型
 */
export interface StyleRecipe<V extends Record<string, Record<string, StyleObject>>> {
  /**
   * 基础样式
   */
  base?: StyleObject;

  /**
   * 变体样式
   */
  variants?: V;

  /**
   * 复合变体
   */
  compoundVariants?: CompoundVariant<{ [K in keyof V]: keyof V[K] extends string ? keyof V[K] : never }>[];

  /**
   * 默认变体
   */
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
}

// ==================== 过渡和动画类型 ====================

/**
 * 过渡配置
 * @description CSS 过渡效果配置
 */
export interface TransitionConfig {
  /**
   * 过渡属性
   * @default 'all'
   */
  property?: string;

  /**
   * 过渡时间（毫秒）
   * @default 300
   */
  duration?: number;

  /**
   * 过渡函数
   * @default 'ease'
   */
  timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;

  /**
   * 过渡延迟（毫秒）
   * @default 0
   */
  delay?: number;
}

/**
 * 动画配置
 * @description CSS 动画效果配置
 */
export interface AnimationConfig {
  /**
   * 动画名称
   */
  name: string;

  /**
   * 动画时间（毫秒）
   * @default 300
   */
  duration?: number;

  /**
   * 动画函数
   * @default 'ease'
   */
  timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;

  /**
   * 动画延迟（毫秒）
   * @default 0
   */
  delay?: number;

  /**
   * 动画迭代次数
   * @default 1
   */
  iterationCount?: number | 'infinite';

  /**
   * 动画方向
   * @default 'normal'
   */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

  /**
   * 动画填充模式
   * @default 'none'
   */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// ==================== 阴影类型 ====================

/**
 * 阴影配置
 * @description CSS 阴影效果配置
 */
export interface ShadowConfig {
  /**
   * 水平偏移
   */
  offsetX: number;

  /**
   * 垂直偏移
   */
  offsetY: number;

  /**
   * 模糊半径
   */
  blurRadius: number;

  /**
   * 扩展半径
   */
  spreadRadius?: number;

  /**
   * 阴影颜色
   */
  color: ColorValue;

  /**
   * 是否为内阴影
   */
  inset?: boolean;
}

// ==================== 类名类型 ====================

/**
 * 类名值类型
 * @description 支持的类名值类型
 */
export type ClassNameValue = string | undefined | null | false | 0;

/**
 * 类名对象类型
 * @description 条件类名对象
 */
export type ClassNameObject = Record<string, boolean | undefined | null>;

/**
 * 类名数组类型
 * @description 类名数组
 */
export type ClassNameArray = ClassNameValue[];

/**
 * 类名参数类型
 * @description classnames 函数的参数类型
 */
export type ClassNameArg = ClassNameValue | ClassNameObject | ClassNameArray;

// ==================== 样式合并类型 ====================

/**
 * 样式合并选项
 * @description 样式合并时的配置选项
 */
export interface StyleMergeOptions {
  /**
   * 是否深度合并
   * @default false
   */
  deep?: boolean;

  /**
   * 是否过滤空值
   * @default true
   */
  filterEmpty?: boolean;

  /**
   * 是否克隆对象
   * @default false
   */
  clone?: boolean;
}

/**
 * 可合并的样式类型
 * @description 可以传入样式合并函数的类型
 */
export type MergeableStyle = StyleObject | undefined | null | false;
