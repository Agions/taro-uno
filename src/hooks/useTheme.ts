import { useTheme as useThemeContext } from '../theme/ThemeProvider';
import type { ThemeConfig, ThemeMode } from '../theme/types';

/**
 * 主题管理Hook
 * 提供主题切换、样式获取等功能
 */
export const useTheme = () => {
  const context = useThemeContext();

  const { theme, themeMode, setThemeMode, toggleTheme, isDark } = context;

  /**
   * 获取主题颜色
   * @param key 颜色键名
   * @returns 颜色值
   */
  const getColor = (key: keyof ThemeConfig['colors']): string => {
    return theme.colors[key];
  };

  /**
   * 获取主题间距
   * @param key 间距键名
   * @returns 间距值(px)
   */
  const getSpacing = (key: keyof ThemeConfig['spacing']): number => {
    const value = theme.spacing[key];
    return typeof value === 'number' ? value : value.md || 8;
  };

  /**
   * 获取主题字体配置
   * @param key 字体键名
   * @returns 字体配置
   */
  const getTypography = (key: keyof ThemeConfig['typography']): any => {
    return theme.typography[key];
  };

  /**
   * 获取主题圆角
   * @param key 圆角键名
   * @returns 圆角值(px)
   */
  const getBorderRadius = (key: keyof ThemeConfig['borderRadius']): number => {
    return theme.borderRadius[key];
  };

  /**
   * 获取主题阴影
   * @param key 阴影键名
   * @returns 阴影CSS值
   */
  const getShadow = (key: keyof ThemeConfig['shadow']): string => {
    return theme.shadow[key];
  };

  /**
   * 获取主题动画配置
   * @param key 动画键名
   * @returns 动画配置
   */
  const getAnimation = (key: keyof ThemeConfig['animation']): any => {
    return theme.animation[key];
  };

  /**
   * 生成CSS变量
   * @returns CSS变量字符串
   */
  const generateCSSVariables = (): string => {
    return `
      :root {
        --primary-color: ${theme.colors.primary};
        --secondary-color: ${theme.colors.secondary};
        --success-color: ${theme.colors.success};
        --warning-color: ${theme.colors.warning};
        --error-color: ${theme.colors.error};
        --info-color: ${theme.colors.info};
        --text-color: ${theme.colors.text};
        --text-color-secondary: ${theme.colors.textSecondary};
        --text-color-disabled: ${theme.colors.textDisabled};
        --text-color-inverse: ${theme.colors.textInverse};
        --background-color: ${theme.colors.background};
        --background-card: ${theme.colors.backgroundCard};
        --background-input: ${theme.colors.backgroundInput};
        --background-mask: ${theme.colors.backgroundMask};
        --border-color: ${theme.colors.border};
        --border-light: ${theme.colors.borderLight};
        --border-focus: ${theme.colors.borderFocus};
        --shadow-color: ${theme.colors.shadow};
        --shadow-light: ${theme.colors.shadowLight};
        --brand-color: ${theme.colors.brand};
        --accent-color: ${theme.colors.accent};
        --link-color: ${theme.colors.link};
        --divider-color: ${theme.colors.divider};
        
        /* 间距变量 */
        --spacing-xs: ${theme.spacing.xs}px;
        --spacing-sm: ${theme.spacing.sm}px;
        --spacing-md: ${theme.spacing.md}px;
        --spacing-lg: ${theme.spacing.lg}px;
        --spacing-xl: ${theme.spacing.xl}px;
        --spacing-xxl: ${theme.spacing.xxl}px;
        
        /* 圆角变量 */
        --radius-none: ${theme.borderRadius.none}px;
        --radius-sm: ${theme.borderRadius.sm}px;
        --radius-md: ${theme.borderRadius.md}px;
        --radius-lg: ${theme.borderRadius.lg}px;
        --radius-xl: ${theme.borderRadius.xl}px;
        --radius-full: ${theme.borderRadius.full}px;
        
        /* 字体变量 */
        --font-size-xs: ${theme.typography.fontSize.xs}px;
        --font-size-sm: ${theme.typography.fontSize.sm}px;
        --font-size-base: ${theme.typography.fontSize.base}px;
        --font-size-lg: ${theme.typography.fontSize.lg}px;
        --font-size-xl: ${theme.typography.fontSize.xl}px;
        --font-size-2xl: ${theme.typography.fontSize['2xl']}px;
        --font-size-3xl: ${theme.typography.fontSize['3xl']}px;
        --font-size-4xl: ${theme.typography.fontSize['4xl']}px;
        --font-size-5xl: ${theme.typography.fontSize['5xl']}px;
        
        /* 动画变量 */
        --duration-fast: ${theme.animation.duration.fast};
        --duration-normal: ${theme.animation.duration.normal};
        --duration-slow: ${theme.animation.duration.slow};
        
        --easing-linear: ${theme.animation.easing.linear};
        --easing-ease: ${theme.animation.easing.ease};
        --easing-ease-in: ${theme.animation.easing.easeIn};
        --easing-ease-out: ${theme.animation.easing.easeOut};
        --easing-ease-in-out: ${theme.animation.easing.easeInOut};
      }
    `;
  };

  /**
   * 获取响应式断点样式
   * @param breakpoint 断点名称
   * @param styles 样式字符串
   * @returns 媒体查询字符串
   */
  const getResponsiveStyle = (breakpoint: keyof ThemeConfig['spacing']['breakpoints'], styles: string): string => {
    const breakpoints = theme.spacing.breakpoints;
    return `@media (min-width: ${breakpoints[breakpoint]}px) { ${styles} }`;
  };

  /**
   * 获取字体样式
   * @param size 字体大小
   * @param weight 字体粗细
   * @param lineHeight 行高
   * @returns 字体样式对象
   */
  const getFontStyle = (
    size: keyof ThemeConfig['typography']['fontSize'] = 'base',
    weight: keyof ThemeConfig['typography']['fontWeight'] = 'normal',
    lineHeight: keyof ThemeConfig['typography']['lineHeight'] = 'normal',
  ): Record<string, any> => {
    return {
      fontSize: `${theme.typography.fontSize[size]}px`,
      fontWeight: theme.typography.fontWeight[weight],
      lineHeight: theme.typography.lineHeight[lineHeight],
      fontFamily: theme.typography.fontFamily.sans.join(', '),
    };
  };

  /**
   * 获取间距样式
   * @param spacing 间距值或键名
   * @param property CSS属性名
   * @returns 间距样式对象
   */
  const getSpacingStyle = (
    spacing: number | keyof ThemeConfig['spacing'],
    property: 'margin' | 'padding' | 'gap' = 'margin',
  ): React.CSSProperties => {
    const value = typeof spacing === 'number' ? spacing : theme.spacing[spacing];
    return {
      [property]: typeof value === 'number' ? `${value}px` : value,
    };
  };

  /**
   * 获取颜色样式
   * @param color 颜色值或键名
   * @param property CSS属性名
   * @returns 颜色样式对象
   */
  const getColorStyle = (
    color: string | keyof ThemeConfig['colors'],
    property: 'color' | 'backgroundColor' | 'borderColor' = 'color',
  ): React.CSSProperties => {
    const value = typeof color === 'string' ? color : theme.colors[color];
    return {
      [property]: value,
    };
  };

  /**
   * 获取边框样式
   * @param width 边框宽度
   * @param color 边框颜色
   * @param radius 边框圆角
   * @returns 边框样式对象
   */
  const getBorderStyle = (
    width: number = 1,
    color: string | keyof ThemeConfig['colors'] = 'border',
    radius: number | keyof ThemeConfig['borderRadius'] = 'md',
  ): React.CSSProperties => {
    const colorValue = typeof color === 'string' ? color : theme.colors[color];
    const radiusValue = typeof radius === 'number' ? radius : theme.borderRadius[radius];

    return {
      border: `${width}px solid ${colorValue}`,
      borderRadius: `${radiusValue}px`,
    };
  };

  /**
   * 获取阴影样式
   * @param shadow 阴影键名
   * @returns 阴影样式对象
   */
  const getShadowStyle = (shadow: keyof ThemeConfig['shadow'] = 'md'): React.CSSProperties => {
    return {
      boxShadow: theme.shadow[shadow],
    };
  };

  /**
   * 获取动画样式
   * @param duration 动画时长
   * @param easing 动画缓动
   * @returns 动画样式对象
   */
  const getAnimationStyle = (
    duration: keyof ThemeConfig['animation']['duration'] = 'normal',
    easing: keyof ThemeConfig['animation']['easing'] = 'ease',
  ): React.CSSProperties => {
    return {
      transition: `all ${theme.animation.duration[duration]} ${theme.animation.easing[easing]}`,
    };
  };

  /**
   * 创建样式生成器
   * @returns 样式生成器对象
   */
  const createStyleGenerator = () => {
    return {
      // 基础样式
      font: (
        size?: keyof ThemeConfig['typography']['fontSize'],
        weight?: keyof ThemeConfig['typography']['fontWeight'],
        lineHeight?: keyof ThemeConfig['typography']['lineHeight'],
      ) => getFontStyle(size, weight, lineHeight),

      spacing: (spacing: number | keyof ThemeConfig['spacing'], property?: 'margin' | 'padding' | 'gap') =>
        getSpacingStyle(spacing, property),

      color: (color: string | keyof ThemeConfig['colors'], property?: 'color' | 'backgroundColor' | 'borderColor') =>
        getColorStyle(color, property),

      border: (
        width?: number,
        color?: string | keyof ThemeConfig['colors'],
        radius?: number | keyof ThemeConfig['borderRadius'],
      ) => getBorderStyle(width, color, radius),

      shadow: (shadow?: keyof ThemeConfig['shadow']) => getShadowStyle(shadow),

      animation: (
        duration?: keyof ThemeConfig['animation']['duration'],
        easing?: keyof ThemeConfig['animation']['easing'],
      ) => getAnimationStyle(duration, easing),

      // 布局样式
      flex: (direction: 'row' | 'column' = 'row', justify?: string, align?: string) => ({
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
      }),

      grid: (columns: number, gap?: number) => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap ? `${gap}px` : `${theme.spacing.gap}px`,
      }),

      position: (type: 'relative' | 'absolute' | 'fixed' | 'sticky', top?: number, left?: number) => ({
        position: type,
        top: top ? `${top}px` : undefined,
        left: left ? `${left}px` : undefined,
      }),

      // 响应式样式
      responsive: (breakpoint: keyof ThemeConfig['spacing']['breakpoints'], styles: React.CSSProperties) => ({
        [`@media (min-width: ${theme.spacing.breakpoints[breakpoint]}px)`]: styles,
      }),
    };
  };

  return {
    // 主题配置
    theme,
    themeMode,
    isDark,

    // 主题操作
    setThemeMode,
    toggleTheme,

    // 样式获取方法
    getColor,
    getSpacing,
    getTypography,
    getBorderRadius,
    getShadow,
    getAnimation,

    // 样式生成方法
    generateCSSVariables,
    getResponsiveStyle,
    getFontStyle,
    getSpacingStyle,
    getColorStyle,
    getBorderStyle,
    getShadowStyle,
    getAnimationStyle,

    // 样式生成器
    createStyleGenerator,
  };
};

export default useTheme;

/**
 * 主题相关类型定义
 */
export type { ThemeConfig, ThemeMode };
