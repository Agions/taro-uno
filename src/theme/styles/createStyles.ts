/**
 * 组件样式创建函数模块
 * 提供 createComponentStyles、mergeStyles、extendStyles 等核心函数
 * @module theme/styles/createStyles
 */

import type { CSSProperties } from 'react';
import type { StyleObject, MergeableStyle, StyleMergeOptions } from '../../types/style';
import type { DesignTokens } from '../tokens';

// ==================== 类型定义 ====================

/**
 * 样式定义接口
 * 用于定义组件的完整样式结构
 */
export interface StyleDefinition {
  /**
   * 基础样式（继承的通用样式）
   * 可以是单个样式对象或样式对象数组
   */
  base?: StyleObject | StyleObject[];

  /**
   * 根元素样式
   */
  root?: StyleObject;

  /**
   * 变体样式
   * 根据不同的 prop 值应用不同的样式
   */
  variants?: {
    size?: Record<string, StyleObject>;
    type?: Record<string, StyleObject>;
    variant?: Record<string, StyleObject>;
    shape?: Record<string, StyleObject>;
    status?: Record<string, StyleObject>;
    [key: string]: Record<string, StyleObject> | undefined;
  };

  /**
   * 状态样式
   * 根据组件状态应用不同的样式
   */
  states?: {
    disabled?: StyleObject;
    loading?: StyleObject;
    hover?: StyleObject;
    active?: StyleObject;
    focus?: StyleObject;
    checked?: StyleObject;
    selected?: StyleObject;
    error?: StyleObject;
    [key: string]: StyleObject | undefined;
  };

  /**
   * 子元素样式
   * 用于定义组件内部子元素的样式
   */
  slots?: {
    [key: string]: StyleObject;
  };
}

/**
 * 样式函数类型
 * 接收设计令牌并返回样式定义
 */
export type StyleDefinitionFunction = (tokens: DesignTokens) => StyleDefinition;

/**
 * 组件样式 Props
 * 用于计算最终样式的 props
 */
export interface ComponentStyleProps {
  size?: string;
  type?: string;
  variant?: string;
  shape?: string;
  status?: string;
  disabled?: boolean;
  loading?: boolean;
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
  checked?: boolean;
  selected?: boolean;
  error?: boolean;
  [key: string]: unknown;
}

/**
 * 计算后的样式结果
 */
export interface ComputedStyles {
  /** 根元素样式 */
  root: StyleObject;
  /** 子元素样式 */
  slots: Record<string, StyleObject>;
}

// ==================== 核心函数 ====================

/**
 * 合并多个样式对象
 * 后面的样式会覆盖前面的样式
 *
 * @param styles - 要合并的样式对象数组
 * @returns 合并后的样式对象
 *
 * @example
 * ```typescript
 * const merged = mergeStyles(
 *   { color: 'red', fontSize: '14px' },
 *   { color: 'blue', padding: '10px' }
 * );
 * // 结果: { color: 'blue', fontSize: '14px', padding: '10px' }
 * ```
 */
export function mergeStyles(...styles: MergeableStyle[]): StyleObject {
  return styles.reduce<StyleObject>((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});
}

/**
 * 扩展现有样式
 * 在基础样式上添加或覆盖属性
 *
 * @param base - 基础样式
 * @param extension - 扩展样式
 * @returns 扩展后的样式对象
 *
 * @example
 * ```typescript
 * const extended = extendStyles(
 *   { color: 'red', fontSize: '14px' },
 *   { fontSize: '16px', fontWeight: 'bold' }
 * );
 * // 结果: { color: 'red', fontSize: '16px', fontWeight: 'bold' }
 * ```
 */
export function extendStyles(
  base: StyleObject,
  extension: StyleObject,
): StyleObject {
  return { ...base, ...extension };
}

/**
 * 深度合并样式对象
 * 支持嵌套对象的合并
 *
 * @param target - 目标样式对象
 * @param source - 源样式对象
 * @param options - 合并选项
 * @returns 深度合并后的样式对象
 */
export function deepMergeStyles(
  target: StyleObject,
  source: StyleObject,
  options: StyleMergeOptions = {},
): StyleObject {
  const { filterEmpty = true, clone = false } = options;

  const result: StyleObject = clone ? { ...target } : target;

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key as keyof StyleObject];
    const targetValue = result[key as keyof StyleObject];

    // 过滤空值
    if (filterEmpty && (sourceValue === undefined || sourceValue === null)) {
      return;
    }

    // 如果两者都是对象，递归合并
    if (
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      typeof targetValue === 'object' &&
      targetValue !== null &&
      !Array.isArray(sourceValue) &&
      !Array.isArray(targetValue)
    ) {
      (result as Record<string, unknown>)[key] = deepMergeStyles(
        targetValue as StyleObject,
        sourceValue as StyleObject,
        options,
      );
    } else {
      (result as Record<string, unknown>)[key] = sourceValue;
    }
  });

  return result;
}

/**
 * 创建组件样式函数
 * 根据样式定义和设计令牌生成样式计算函数
 *
 * @param definition - 样式定义或样式定义函数
 * @returns 样式计算函数
 *
 * @example
 * ```typescript
 * const useButtonStyles = createComponentStyles({
 *   base: [commonStyles.layout.inlineFlex, commonStyles.interaction.clickable],
 *   root: {
 *     padding: '8px 16px',
 *     borderRadius: '4px',
 *   },
 *   variants: {
 *     size: {
 *       sm: { padding: '4px 8px', fontSize: '12px' },
 *       md: { padding: '8px 16px', fontSize: '14px' },
 *       lg: { padding: '12px 24px', fontSize: '16px' },
 *     },
 *     type: {
 *       primary: { backgroundColor: '#0ea5e9', color: '#fff' },
 *       default: { backgroundColor: '#f3f4f6', color: '#374151' },
 *     },
 *   },
 *   states: {
 *     disabled: { opacity: 0.5, cursor: 'not-allowed' },
 *     loading: { opacity: 0.7 },
 *   },
 * });
 *
 * // 使用
 * const styles = useButtonStyles(tokens, { size: 'md', type: 'primary', disabled: false });
 * ```
 */
export function createComponentStyles<T extends StyleDefinition>(
  definition: T | StyleDefinitionFunction,
): (tokens: DesignTokens, props: ComponentStyleProps) => ComputedStyles {
  return (tokens: DesignTokens, props: ComponentStyleProps): ComputedStyles => {
    // 解析样式定义
    const styles: StyleDefinition =
      typeof definition === 'function' ? definition(tokens) : definition;

    // 1. 合并基础样式
    let rootStyle: StyleObject = {};

    if (styles.base) {
      const baseStyles = Array.isArray(styles.base) ? styles.base : [styles.base];
      baseStyles.forEach((style) => {
        rootStyle = mergeStyles(rootStyle, style);
      });
    }

    // 2. 合并根样式
    if (styles.root) {
      rootStyle = mergeStyles(rootStyle, styles.root);
    }

    // 3. 合并变体样式
    if (styles.variants) {
      Object.entries(styles.variants).forEach(([variantKey, variants]) => {
        if (!variants) return;

        const propValue = props[variantKey] as string | undefined;
        if (propValue && variants[propValue]) {
          rootStyle = mergeStyles(rootStyle, variants[propValue]);
        }
      });
    }

    // 4. 合并状态样式
    if (styles.states) {
      Object.entries(styles.states).forEach(([stateKey, stateStyle]) => {
        if (!stateStyle) return;

        const stateValue = props[stateKey];
        if (stateValue === true) {
          rootStyle = mergeStyles(rootStyle, stateStyle);
        }
      });
    }

    // 5. 处理子元素样式
    const slots: Record<string, StyleObject> = {};
    if (styles.slots) {
      Object.entries(styles.slots).forEach(([slotKey, slotStyle]) => {
        slots[slotKey] = slotStyle;
      });
    }

    return {
      root: rootStyle,
      slots,
    };
  };
}

/**
 * 创建简单样式函数
 * 用于不需要变体和状态的简单样式
 *
 * @param styles - 样式对象或样式函数
 * @returns 样式计算函数或样式对象
 */
export function createStyles<T extends Record<string, unknown>>(
  styles: T,
): T;
export function createStyles(
  styles: StyleObject | ((tokens: DesignTokens) => StyleObject),
): (tokens: DesignTokens) => StyleObject;
export function createStyles<T extends Record<string, unknown>>(
  styles: T | StyleObject | ((tokens: DesignTokens) => StyleObject),
): T | ((tokens: DesignTokens) => StyleObject) {
  // If it's a function, return a function that calls it with tokens
  if (typeof styles === 'function') {
    return (tokens: DesignTokens): StyleObject => {
      return styles(tokens);
    };
  }

  // If it's an object with CSS properties (has common CSS property names), wrap it
  const hasCommonCSSProps = styles && typeof styles === 'object' &&
    ('display' in styles || 'color' in styles || 'backgroundColor' in styles ||
      'padding' in styles || 'margin' in styles || 'width' in styles || 'height' in styles);

  if (hasCommonCSSProps) {
    return (_tokens: DesignTokens): StyleObject => {
      return styles as StyleObject;
    };
  }

  // Otherwise, return the object as-is (for class name based styles)
  return styles as T;
}

/**
 * 条件样式合并
 * 根据条件决定是否包含某个样式
 *
 * @param condition - 条件
 * @param trueStyle - 条件为真时的样式
 * @param falseStyle - 条件为假时的样式（可选）
 * @returns 样式对象或空对象
 */
export function conditionalStyle(
  condition: boolean,
  trueStyle: StyleObject,
  falseStyle?: StyleObject,
): StyleObject {
  if (condition) {
    return trueStyle;
  }
  return falseStyle || {};
}

/**
 * 从 props 中提取样式相关的属性
 * 用于将 style 和 className 从其他 props 中分离
 *
 * @param props - 组件 props
 * @returns 分离后的样式 props 和其他 props
 */
export function extractStyleProps<T extends { style?: CSSProperties; className?: string }>(
  props: T,
): { styleProps: { style?: CSSProperties; className?: string }; restProps: Omit<T, 'style' | 'className'> } {
  const { style, className, ...restProps } = props;
  return {
    styleProps: { style, className },
    restProps: restProps as Omit<T, 'style' | 'className'>,
  };
}

/**
 * 组合多个样式计算函数
 * 将多个样式函数的结果合并
 *
 * @param styleFns - 样式计算函数数组
 * @returns 组合后的样式计算函数
 */
export function composeStyles(
  ...styleFns: Array<(tokens: DesignTokens, props: ComponentStyleProps) => ComputedStyles>
): (tokens: DesignTokens, props: ComponentStyleProps) => ComputedStyles {
  return (tokens: DesignTokens, props: ComponentStyleProps): ComputedStyles => {
    let combinedRoot: StyleObject = {};
    const combinedSlots: Record<string, StyleObject> = {};

    styleFns.forEach((fn) => {
      const result = fn(tokens, props);
      combinedRoot = mergeStyles(combinedRoot, result.root);

      Object.entries(result.slots).forEach(([key, style]) => {
        combinedSlots[key] = mergeStyles(combinedSlots[key] || {}, style);
      });
    });

    return {
      root: combinedRoot,
      slots: combinedSlots,
    };
  };
}

/**
 * 创建响应式样式
 * 根据断点生成不同的样式
 *
 * @param breakpointStyles - 断点样式映射
 * @param currentBreakpoint - 当前断点
 * @returns 当前断点对应的样式
 */
export function createResponsiveStyle(
  breakpointStyles: Record<string, StyleObject>,
  currentBreakpoint: string,
): StyleObject {
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  let result: StyleObject = {};

  // 从最小断点开始，逐步合并到当前断点
  for (let i = 0; i <= currentIndex; i++) {
    const bp = breakpointOrder[i];
    if (bp && breakpointStyles[bp]) {
      result = mergeStyles(result, breakpointStyles[bp]);
    }
  }

  return result;
}

// ==================== 导出 ====================

export default {
  mergeStyles,
  extendStyles,
  deepMergeStyles,
  createComponentStyles,
  createStyles,
  conditionalStyle,
  extractStyleProps,
  composeStyles,
  createResponsiveStyle,
};
