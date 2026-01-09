/**
 * useStyle Hook
 * 动态样式生成 Hook，提供便捷的样式创建和组合功能
 *
 * @example
 * ```typescript
 * const { css, cn, responsive, conditional } = useStyle();
 *
 * // 合并类名
 * const className = cn('base', isActive && 'active', { disabled: isDisabled });
 *
 * // 创建样式对象
 * const styles = css({ color: 'red' }, { fontSize: 14 });
 *
 * // 响应式样式
 * const responsiveStyles = responsive({
 *   base: { padding: 8 },
 *   md: { padding: 16 },
 *   lg: { padding: 24 }
 * });
 * ```
 */

import { useCallback, CSSProperties } from 'react';
import { useTheme } from './useTheme';
import type { ThemeConfig } from '../../theme/types';

/**
 * 类名参数类型
 */
export type ClassNameValue = string | undefined | null | false | { [key: string]: boolean };

/**
 * 样式参数类型
 */
export type StyleValue =
  | CSSProperties
  | undefined
  | null
  | ((theme: ThemeConfig) => CSSProperties);

/**
 * 响应式断点配置
 */
export interface ResponsiveBreakpoints<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}

/**
 * 交互样式配置
 */
export interface InteractionStyles {
  hover?: CSSProperties;
  focus?: CSSProperties;
  active?: CSSProperties;
  disabled?: CSSProperties;
}

/**
 * 变换配置
 */
export interface TransformConfig {
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  skewX?: number | string;
  skewY?: number | string;
}

/**
 * 渐变配置
 */
export interface GradientConfig {
  type?: 'linear' | 'radial';
  direction?: string | number;
  colors: string[];
}

/**
 * 阴影配置
 */
export interface ShadowConfig {
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
  color?: string;
  inset?: boolean;
}

/**
 * useStyle Hook 返回类型
 */
export interface UseStyleReturn {
  /** 合并类名 */
  cn: (...classes: ClassNameValue[]) => string;
  /** 合并样式对象 */
  css: (...styles: StyleValue[]) => CSSProperties;
  /** 创建响应式样式 */
  responsive: (breakpoints: ResponsiveBreakpoints<CSSProperties>) => CSSProperties;
  /** 条件样式 */
  conditional: (
    condition: boolean,
    trueStyle: CSSProperties,
    falseStyle?: CSSProperties,
  ) => CSSProperties;
  /** 悬停样式 */
  hover: (hoverStyle: CSSProperties, baseStyle?: CSSProperties) => CSSProperties;
  /** 焦点样式 */
  focus: (focusStyle: CSSProperties, baseStyle?: CSSProperties) => CSSProperties;
  /** 激活样式 */
  active: (activeStyle: CSSProperties, baseStyle?: CSSProperties) => CSSProperties;
  /** 禁用样式 */
  disabled: (disabledStyle: CSSProperties, baseStyle?: CSSProperties) => CSSProperties;
  /** 组合交互样式 */
  interactions: (
    interactionStyles: InteractionStyles,
    baseStyle?: CSSProperties,
  ) => CSSProperties;
  /** 变换样式 */
  transform: (transforms: TransformConfig) => CSSProperties;
  /** 渐变背景 */
  gradient: (config: GradientConfig) => CSSProperties;
  /** 阴影样式 */
  shadow: (config: ShadowConfig) => CSSProperties;
  /** 文本样式 */
  text: (config: {
    size?: keyof ThemeConfig['typography']['fontSize'];
    weight?: keyof ThemeConfig['typography']['fontWeight'];
    color?: string | keyof ThemeConfig['colors'];
    align?: 'left' | 'center' | 'right' | 'justify';
    decoration?: 'none' | 'underline' | 'line-through';
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    lineHeight?: keyof ThemeConfig['typography']['lineHeight'];
  }) => CSSProperties;
  /** 布局样式 */
  layout: (config: {
    display?: 'flex' | 'grid' | 'block' | 'inline' | 'inline-block' | 'none';
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: number | keyof ThemeConfig['spacing'];
    padding?: number | keyof ThemeConfig['spacing'];
    margin?: number | keyof ThemeConfig['spacing'];
  }) => CSSProperties;
  /** 边框样式 */
  border: (config: {
    width?: number;
    style?: 'solid' | 'dashed' | 'dotted' | 'double';
    color?: string | keyof ThemeConfig['colors'];
    radius?: number | keyof ThemeConfig['borderRadius'];
    sides?: 'all' | 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical';
  }) => CSSProperties;
  /** 当前主题 */
  theme: ThemeConfig;
}

/**
 * 动态样式生成 Hook
 *
 * @returns 样式工具方法集合
 *
 * @example
 * ```tsx
 * function MyComponent({ isActive, isDisabled }) {
 *   const { cn, css, conditional, layout } = useStyle();
 *
 *   const className = cn(
 *     'my-component',
 *     isActive && 'active',
 *     { disabled: isDisabled }
 *   );
 *
 *   const containerStyle = css(
 *     layout({ display: 'flex', direction: 'column', gap: 'md' }),
 *     conditional(isActive, { borderColor: 'blue' })
 *   );
 *
 *   return <View className={className} style={containerStyle}>...</View>;
 * }
 * ```
 */
export function useStyle(): UseStyleReturn {
  const { theme } = useTheme();

  /**
   * 合并类名
   */
  const cn = useCallback((...classes: ClassNameValue[]): string => {
    return classes
      .filter(Boolean)
      .map((item) => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null) {
          return Object.entries(item)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(' ');
        }
        return '';
      })
      .filter(Boolean)
      .join(' ');
  }, []);

  /**
   * 合并样式对象
   */
  const css = useCallback(
    (...styles: StyleValue[]): CSSProperties => {
      return styles.reduce<CSSProperties>((acc, style) => {
        if (!style) return acc;
        const resolvedStyle = typeof style === 'function' ? style(theme) : style;
        return { ...acc, ...resolvedStyle };
      }, {});
    },
    [theme],
  );

  /**
   * 创建响应式样式
   */
  const responsive = useCallback(
    (breakpoints: ResponsiveBreakpoints<CSSProperties>): CSSProperties => {
      const result: CSSProperties = {};

      if (breakpoints.base) {
        Object.assign(result, breakpoints.base);
      }

      // 注意：CSS-in-JS 中媒体查询需要特殊处理
      // 这里返回基础样式，实际响应式需要配合 CSS 或运行时检测
      return result;
    },
    [],
  );

  /**
   * 条件样式
   */
  const conditional = useCallback(
    (
      condition: boolean,
      trueStyle: CSSProperties,
      falseStyle?: CSSProperties,
    ): CSSProperties => {
      return condition ? trueStyle : falseStyle ?? {};
    },
    [],
  );

  /**
   * 悬停样式
   */
  const hover = useCallback(
    (_hoverStyle: CSSProperties, baseStyle?: CSSProperties): CSSProperties => {
      return { ...baseStyle };
    },
    [],
  );

  /**
   * 焦点样式
   */
  const focus = useCallback(
    (_focusStyle: CSSProperties, baseStyle?: CSSProperties): CSSProperties => {
      return { ...baseStyle };
    },
    [],
  );

  /**
   * 激活样式
   */
  const active = useCallback(
    (_activeStyle: CSSProperties, baseStyle?: CSSProperties): CSSProperties => {
      return { ...baseStyle };
    },
    [],
  );

  /**
   * 禁用样式
   */
  const disabled = useCallback(
    (_disabledStyle: CSSProperties, baseStyle?: CSSProperties): CSSProperties => {
      return { ...baseStyle };
    },
    [],
  );

  /**
   * 组合交互样式
   */
  const interactions = useCallback(
    (
      _interactionStyles: InteractionStyles,
      baseStyle?: CSSProperties,
    ): CSSProperties => {
      return { ...baseStyle };
    },
    [],
  );

  /**
   * 变换样式
   */
  const transform = useCallback((transforms: TransformConfig): CSSProperties => {
    const transformFunctions: string[] = [];

    if (transforms.translateX !== undefined) {
      const value =
        typeof transforms.translateX === 'number'
          ? `${transforms.translateX}px`
          : transforms.translateX;
      transformFunctions.push(`translateX(${value})`);
    }

    if (transforms.translateY !== undefined) {
      const value =
        typeof transforms.translateY === 'number'
          ? `${transforms.translateY}px`
          : transforms.translateY;
      transformFunctions.push(`translateY(${value})`);
    }

    if (transforms.translateZ !== undefined) {
      const value =
        typeof transforms.translateZ === 'number'
          ? `${transforms.translateZ}px`
          : transforms.translateZ;
      transformFunctions.push(`translateZ(${value})`);
    }

    if (transforms.scale !== undefined) {
      transformFunctions.push(`scale(${transforms.scale})`);
    }

    if (transforms.scaleX !== undefined) {
      transformFunctions.push(`scaleX(${transforms.scaleX})`);
    }

    if (transforms.scaleY !== undefined) {
      transformFunctions.push(`scaleY(${transforms.scaleY})`);
    }

    if (transforms.rotate !== undefined) {
      const value =
        typeof transforms.rotate === 'number'
          ? `${transforms.rotate}deg`
          : transforms.rotate;
      transformFunctions.push(`rotate(${value})`);
    }

    if (transforms.rotateX !== undefined) {
      const value =
        typeof transforms.rotateX === 'number'
          ? `${transforms.rotateX}deg`
          : transforms.rotateX;
      transformFunctions.push(`rotateX(${value})`);
    }

    if (transforms.rotateY !== undefined) {
      const value =
        typeof transforms.rotateY === 'number'
          ? `${transforms.rotateY}deg`
          : transforms.rotateY;
      transformFunctions.push(`rotateY(${value})`);
    }

    if (transforms.rotateZ !== undefined) {
      const value =
        typeof transforms.rotateZ === 'number'
          ? `${transforms.rotateZ}deg`
          : transforms.rotateZ;
      transformFunctions.push(`rotateZ(${value})`);
    }

    if (transforms.skewX !== undefined) {
      const value =
        typeof transforms.skewX === 'number'
          ? `${transforms.skewX}deg`
          : transforms.skewX;
      transformFunctions.push(`skewX(${value})`);
    }

    if (transforms.skewY !== undefined) {
      const value =
        typeof transforms.skewY === 'number'
          ? `${transforms.skewY}deg`
          : transforms.skewY;
      transformFunctions.push(`skewY(${value})`);
    }

    return {
      transform: transformFunctions.join(' ') || 'none',
    };
  }, []);

  /**
   * 渐变背景
   */
  const gradient = useCallback((config: GradientConfig): CSSProperties => {
    const { type = 'linear', direction = 'to right', colors } = config;

    const gradientString =
      type === 'linear'
        ? `linear-gradient(${direction}, ${colors.join(', ')})`
        : `radial-gradient(${colors.join(', ')})`;

    return {
      backgroundImage: gradientString,
    };
  }, []);

  /**
   * 阴影样式
   */
  const shadowFn = useCallback(
    (config: ShadowConfig): CSSProperties => {
      const {
        x = 0,
        y = 0,
        blur = 0,
        spread = 0,
        color = theme.colors.shadow ?? 'rgba(0, 0, 0, 0.1)',
        inset = false,
      } = config;

      return {
        boxShadow: `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`,
      };
    },
    [theme.colors.shadow],
  );

  /**
   * 文本样式
   */
  const text = useCallback(
    (config: {
      size?: keyof ThemeConfig['typography']['fontSize'];
      weight?: keyof ThemeConfig['typography']['fontWeight'];
      color?: string | keyof ThemeConfig['colors'];
      align?: 'left' | 'center' | 'right' | 'justify';
      decoration?: 'none' | 'underline' | 'line-through';
      transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
      lineHeight?: keyof ThemeConfig['typography']['lineHeight'];
    }): CSSProperties => {
      const {
        size = 'base',
        weight = 'normal',
        color = 'text',
        align,
        decoration,
        transform: textTransform,
        lineHeight,
      } = config;

      const colorValue =
        typeof color === 'string' && color in theme.colors
          ? theme.colors[color as keyof ThemeConfig['colors']]
          : color;

      return {
        fontSize: theme.typography.fontSize[size],
        fontWeight: theme.typography.fontWeight[weight],
        color: colorValue,
        textAlign: align,
        textDecoration: decoration,
        textTransform: textTransform,
        lineHeight: lineHeight ? theme.typography.lineHeight[lineHeight] : undefined,
      };
    },
    [theme],
  );

  /**
   * 布局样式
   */
  const layout = useCallback(
    (config: {
      display?: 'flex' | 'grid' | 'block' | 'inline' | 'inline-block' | 'none';
      direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
      justify?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
      align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
      wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
      gap?: number | keyof ThemeConfig['spacing'];
      padding?: number | keyof ThemeConfig['spacing'];
      margin?: number | keyof ThemeConfig['spacing'];
    }): CSSProperties => {
      const {
        display = 'block',
        direction,
        justify,
        align,
        wrap,
        gap,
        padding,
        margin,
      } = config;

      const result: CSSProperties = { display };

      if (display === 'flex') {
        if (direction) result.flexDirection = direction;
        if (justify) result.justifyContent = justify;
        if (align) result.alignItems = align;
        if (wrap) result.flexWrap = wrap;
      }

      if (gap !== undefined) {
        const gapValue =
          typeof gap === 'number'
            ? gap
            : (theme.spacing[gap] as number) ?? 0;
        result.gap = gapValue;
      }

      if (padding !== undefined) {
        const paddingValue =
          typeof padding === 'number'
            ? padding
            : (theme.spacing[padding] as number) ?? 0;
        result.padding = paddingValue;
      }

      if (margin !== undefined) {
        const marginValue =
          typeof margin === 'number'
            ? margin
            : (theme.spacing[margin] as number) ?? 0;
        result.margin = marginValue;
      }

      return result;
    },
    [theme.spacing],
  );

  /**
   * 边框样式
   */
  const borderFn = useCallback(
    (config: {
      width?: number;
      style?: 'solid' | 'dashed' | 'dotted' | 'double';
      color?: string | keyof ThemeConfig['colors'];
      radius?: number | keyof ThemeConfig['borderRadius'];
      sides?: 'all' | 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical';
    }): CSSProperties => {
      const {
        width = 1,
        style = 'solid',
        color = 'border',
        radius = 'md',
        sides = 'all',
      } = config;

      const colorValue =
        typeof color === 'string' && color in theme.colors
          ? theme.colors[color as keyof ThemeConfig['colors']]
          : color;

      const radiusValue =
        typeof radius === 'number' ? radius : theme.borderRadius[radius] ?? 0;

      const result: CSSProperties = {
        borderRadius: radiusValue,
      };

      const borderValue = `${width}px ${style} ${colorValue}`;

      if (sides === 'all') {
        result.border = borderValue;
      } else if (sides === 'horizontal') {
        result.borderLeft = borderValue;
        result.borderRight = borderValue;
      } else if (sides === 'vertical') {
        result.borderTop = borderValue;
        result.borderBottom = borderValue;
      } else {
        const sideKey = `border${sides.charAt(0).toUpperCase() + sides.slice(1)}` as keyof CSSProperties;
        (result as Record<string, unknown>)[sideKey] = borderValue;
      }

      return result;
    },
    [theme.colors, theme.borderRadius],
  );

  return {
    cn,
    css,
    responsive,
    conditional,
    hover,
    focus,
    active,
    disabled,
    interactions,
    transform,
    gradient,
    shadow: shadowFn,
    text,
    layout,
    border: borderFn,
    theme,
  };
}

export default useStyle;
