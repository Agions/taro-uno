import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { ThemeConfig } from '../theme';

/**
 * 样式工具Hook
 * 提供便捷的样式生成和操作功能
 */
export const useStyle = () => {
  const { theme, createStyleGenerator } = useTheme();
  const currentTheme = theme;
  const styleGenerator = useMemo(() => createStyleGenerator(), [theme]);

  /**
   * 创建类名字符串
   * @param classes 类名数组或对象
   * @returns 合并后的类名字符串
   */
  const cn = (...classes: (string | undefined | null | false | { [key: string]: boolean })[]): string => {
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
  };

  /**
   * 创建样式对象
   * @param styles 样式对象或函数
   * @returns 合并后的样式对象
   */
  const css = (
    ...styles: (Record<string, unknown> | undefined | null | ((theme: ThemeConfig) => Record<string, unknown>))[]
  ): Record<string, unknown> => {
    return styles.reduce<Record<string, unknown>>(
      (acc, style) => {
        if (!style) return acc;

        const resolvedStyle = typeof style === 'function' ? style(currentTheme) : style;
        return { ...acc, ...resolvedStyle };
      },
      {} as Record<string, unknown>,
    );
  };

  /**
   * 创建响应式样式
   * @param breakpoints 断点配置
   * @returns 响应式样式对象
   */
  const responsive = (breakpoints: {
    base?: Record<string, unknown>;
    sm?: Record<string, unknown>;
    md?: Record<string, unknown>;
    lg?: Record<string, unknown>;
    xl?: Record<string, unknown>;
    xxl?: Record<string, unknown>;
  }): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    if (breakpoints.base) {
      Object.assign(result, breakpoints.base);
    }

    // 添加媒体查询样式
    const mediaQueries = {
      sm: `@media (min-width: ${currentTheme.spacing.breakpoints.sm}px)`,
      md: `@media (min-width: ${currentTheme.spacing.breakpoints.md}px)`,
      lg: `@media (min-width: ${currentTheme.spacing.breakpoints.lg}px)`,
      xl: `@media (min-width: ${currentTheme.spacing.breakpoints.xl}px)`,
      xxl: `@media (min-width: ${currentTheme.spacing.breakpoints.xxl}px)`,
    };

    Object.entries(mediaQueries).forEach(([key, query]) => {
      const style = breakpoints[key as keyof typeof breakpoints];
      if (style) {
        result[query as keyof Record<string, unknown>] = style;
      }
    });

    return result;
  };

  /**
   * 创建条件样式
   * @param condition 条件
   * @param trueStyle 条件为真时的样式
   * @param falseStyle 条件为假时的样式
   * @returns 样式对象
   */
  const conditional = (
    condition: boolean,
    trueStyle: Record<string, unknown>,
    falseStyle?: Record<string, unknown>,
  ): Record<string, unknown> => {
    return condition ? trueStyle : falseStyle || {};
  };

  /**
   * 创建悬停样式
   * @param hoverStyle 悬停样式
   * @param baseStyle 基础样式
   * @returns 包含悬停效果的样式对象
   */
  const hover = (hoverStyle: Record<string, unknown>, baseStyle?: Record<string, unknown>): Record<string, unknown> => {
    return {
      ...baseStyle,
      '&:hover': hoverStyle,
    };
  };

  /**
   * 创建焦点样式
   * @param focusStyle 焦点样式
   * @param baseStyle 基础样式
   * @returns 包含焦点效果的样式对象
   */
  const focus = (focusStyle: Record<string, unknown>, baseStyle?: Record<string, unknown>): Record<string, unknown> => {
    return {
      ...baseStyle,
      '&:focus': focusStyle,
    };
  };

  /**
   * 创建激活样式
   * @param activeStyle 激活样式
   * @param baseStyle 基础样式
   * @returns 包含激活效果的样式对象
   */
  const active = (activeStyle: Record<string, unknown>, baseStyle?: Record<string, unknown>): Record<string, unknown> => {
    return {
      ...baseStyle,
      '&:active': activeStyle,
    };
  };

  /**
   * 创建禁用样式
   * @param disabledStyle 禁用样式
   * @param baseStyle 基础样式
   * @returns 包含禁用效果的样式对象
   */
  const disabled = (disabledStyle: Record<string, unknown>, baseStyle?: Record<string, unknown>): Record<string, unknown> => {
    return {
      ...baseStyle,
      '&:disabled': disabledStyle,
    };
  };

  /**
   * 创建组合交互样式
   * @param interactions 交互配置
   * @returns 包含所有交互效果的样式对象
   */
  const interactions = (
    interactions: {
      hover?: Record<string, unknown>;
      focus?: Record<string, unknown>;
      active?: Record<string, unknown>;
      disabled?: Record<string, unknown>;
    },
    baseStyle?: Record<string, unknown>,
  ): Record<string, unknown> => {
    const result: Record<string, unknown> = { ...baseStyle };

    if (interactions.hover) {
      result['&:hover'] = interactions.hover;
    }

    if (interactions.focus) {
      result['&:focus'] = interactions.focus;
    }

    if (interactions.active) {
      result['&:active'] = interactions.active;
    }

    if (interactions.disabled) {
      result['&:disabled'] = interactions.disabled;
    }

    return result;
  };

  /**
   * 创建动画样式
   * @param animation 动画配置
   * @returns 动画样式对象
   */
  const animate = (animation: {
    name: string;
    duration?: string | number;
    delay?: string | number;
    ease?: string;
    iterationCount?: string | number;
    direction?: string;
    fillMode?: string;
  }): Record<string, unknown> => {
    const {
      name,
      duration = currentTheme.animation.duration.normal,
      delay = 0,
      ease = currentTheme.animation.easing.ease,
      iterationCount = 1,
      direction = 'normal',
      fillMode = 'forwards',
    } = animation;

    return {
      animation: `${name} ${duration} ${ease} ${delay} ${iterationCount} ${direction} ${fillMode}`,
    };
  };

  /**
   * 创建变换样式
   * @param transforms 变换配置
   * @returns 变换样式对象
   */
  const transform = (transforms: {
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
  }): Record<string, unknown> => {
    const transformFunctions: string[] = [];

    if (transforms.translateX !== undefined) {
      transformFunctions.push(
        `translateX(${
          typeof transforms.translateX === 'number' ? `${transforms.translateX}px` : transforms.translateX
        })`,
      );
    }

    if (transforms.translateY !== undefined) {
      transformFunctions.push(
        `translateY(${
          typeof transforms.translateY === 'number' ? `${transforms.translateY}px` : transforms.translateY
        })`,
      );
    }

    if (transforms.translateZ !== undefined) {
      transformFunctions.push(
        `translateZ(${
          typeof transforms.translateZ === 'number' ? `${transforms.translateZ}px` : transforms.translateZ
        })`,
      );
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
      transformFunctions.push(
        `rotate(${typeof transforms.rotate === 'number' ? `${transforms.rotate}deg` : transforms.rotate})`,
      );
    }

    if (transforms.rotateX !== undefined) {
      transformFunctions.push(
        `rotateX(${typeof transforms.rotateX === 'number' ? `${transforms.rotateX}deg` : transforms.rotateX})`,
      );
    }

    if (transforms.rotateY !== undefined) {
      transformFunctions.push(
        `rotateY(${typeof transforms.rotateY === 'number' ? `${transforms.rotateY}deg` : transforms.rotateY})`,
      );
    }

    if (transforms.rotateZ !== undefined) {
      transformFunctions.push(
        `rotateZ(${typeof transforms.rotateZ === 'number' ? `${transforms.rotateZ}deg` : transforms.rotateZ})`,
      );
    }

    if (transforms.skewX !== undefined) {
      transformFunctions.push(
        `skewX(${typeof transforms.skewX === 'number' ? `${transforms.skewX}deg` : transforms.skewX})`,
      );
    }

    if (transforms.skewY !== undefined) {
      transformFunctions.push(
        `skewY(${typeof transforms.skewY === 'number' ? `${transforms.skewY}deg` : transforms.skewY})`,
      );
    }

    return {
      transform: transformFunctions.join(' '),
    };
  };

  /**
   * 创建渐变背景
   * @param gradient 渐变配置
   * @returns 渐变样式对象
   */
  const gradient = (gradient: {
    type?: 'linear' | 'radial';
    direction?: string | number;
    colors: string[];
  }): Record<string, unknown> => {
    const { type = 'linear', direction = 'to right', colors } = gradient;

    const gradientString =
      type === 'linear'
        ? `linear-gradient(${direction}, ${colors.join(', ')})`
        : `radial-gradient(${colors.join(', ')})`;

    return {
      backgroundImage: gradientString,
    };
  };

  /**
   * 创建阴影样式
   * @param shadow 阴影配置
   * @returns 阴影样式对象
   */
  const shadow = (shadow: {
    x?: number;
    y?: number;
    blur?: number;
    spread?: number;
    color?: string;
    inset?: boolean;
  }): Record<string, unknown> => {
    const { x = 0, y = 0, blur = 0, spread = 0, color = currentTheme.colors.shadow, inset = false } = shadow;

    return {
      boxShadow: `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`,
    };
  };

  /**
   * 创建文本样式
   * @param text 文本配置
   * @returns 文本样式对象
   */
  const text = (text: {
    size?: keyof ThemeConfig['typography']['fontSize'];
    weight?: keyof ThemeConfig['typography']['fontWeight'];
    color?: string | keyof ThemeConfig['colors'];
    align?: 'left' | 'center' | 'right' | 'justify';
    decoration?: 'none' | 'underline' | 'line-through';
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    spacing?: keyof ThemeConfig['typography']['letterSpacing'];
    lineHeight?: keyof ThemeConfig['typography']['lineHeight'];
  }): Record<string, unknown> => {
    const {
      size = 'base',
      weight = 'normal',
      color = 'text',
      align,
      decoration,
      transform,
      spacing,
      lineHeight,
    } = text;

    return {
      fontSize: `${currentTheme.typography.fontSize[size]}px`,
      fontWeight: currentTheme.typography.fontWeight[weight],
      color: typeof color === 'string' ? color : currentTheme.colors[color],
      textAlign: align,
      textDecoration: decoration,
      textTransform: transform,
      letterSpacing: spacing ? currentTheme.typography.letterSpacing[spacing] : undefined,
      lineHeight: lineHeight ? currentTheme.typography.lineHeight[lineHeight] : undefined,
    };
  };

  /**
   * 创建布局样式
   * @param layout 布局配置
   * @returns 布局样式对象
   */
  const layout = (layout: {
    display?: 'flex' | 'grid' | 'block' | 'inline' | 'inline-block' | 'none';
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: number | keyof ThemeConfig['spacing'];
    padding?: number | keyof ThemeConfig['spacing'];
    margin?: number | keyof ThemeConfig['spacing'];
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
  }): Record<string, any> => {
    const {
      display = 'block',
      direction,
      justify,
      align,
      wrap,
      gap,
      padding,
      margin,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
    } = layout;

    const result: Record<string, unknown> = {
      display,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
    };

    if (display === 'flex') {
      result['flexDirection'] = direction;
      result['justifyContent'] = justify;
      result['alignItems'] = align;
      result['flexWrap'] = wrap;
    }

    if (gap !== undefined) {
      result['gap'] = typeof gap === 'number' ? `${gap}px` : `${currentTheme.spacing[gap]}px`;
    }

    if (padding !== undefined) {
      result['padding'] = typeof padding === 'number' ? `${padding}px` : `${currentTheme.spacing[padding]}px`;
    }

    if (margin !== undefined) {
      result['margin'] = typeof margin === 'number' ? `${margin}px` : `${currentTheme.spacing[margin]}px`;
    }

    return result;
  };

  /**
   * 创建边框样式
   * @param border 边框配置
   * @returns 边框样式对象
   */
  const border = (border: {
    width?: number;
    style?: 'solid' | 'dashed' | 'dotted' | 'double';
    color?: string | keyof ThemeConfig['colors'];
    radius?: number | keyof ThemeConfig['borderRadius'];
    sides?: 'all' | 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical';
  }): Record<string, unknown> => {
    const { width = 1, style = 'solid', color = 'border', radius = 'md', sides = 'all' } = border;

    const colorValue = typeof color === 'string' ? color : currentTheme.colors[color];
    const radiusValue = typeof radius === 'number' ? radius : currentTheme.borderRadius[radius];

    const result: Record<string, unknown> = {
      borderRadius: `${radiusValue}px`,
    };

    if (sides === 'all') {
      result['border'] = `${width}px ${style} ${colorValue}`;
    } else if (sides === 'horizontal') {
      result['borderLeft'] = `${width}px ${style} ${colorValue}`;
      result['borderRight'] = `${width}px ${style} ${colorValue}`;
    } else if (sides === 'vertical') {
      result['borderTop'] = `${width}px ${style} ${colorValue}`;
      result['borderBottom'] = `${width}px ${style} ${colorValue}`;
    } else {
      result[`border${sides.charAt(0).toUpperCase() + sides.slice(1)}` as keyof Record<string, unknown>] =
        `${width}px ${style} ${colorValue}`;
    }

    return result;
  };

  return {
    // 基础样式工具
    cn,
    css,
    responsive,
    conditional,

    // 交互样式
    hover,
    focus,
    active,
    disabled,
    interactions,

    // 高级样式
    animate,
    transform,
    gradient,
    shadow,
    text,
    layout,
    border,

    // 样式生成器
    styleGenerator,
  };
};

export default useStyle;
