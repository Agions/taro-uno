/**
 * 统一设计系统
 * 集中管理所有设计令牌和主题配置
 */

import { defaultDesignTokens } from './design-tokens';

// ==================== 设计令牌类型定义 ====================
export interface DesignSystemColors {
  // 基础颜色
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  neutral: ColorScale;

  // 语义化颜色
  text: SemanticColors;
  background: SemanticColors;
  border: {
    default: string;
    light: string;
    focus?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  shadow: ShadowColors;
  status: StatusColors;
  interactive: InteractiveColors;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled?: string;
  inverse?: string;
  placeholder?: string;
  link?: string;
  card?: string;
  input?: string;
  mask?: string;
  hover?: string;
  active?: string;
}

export interface ShadowColors {
  default: string;
  light: string;
  medium: string;
  dark: string;
  colored: string;
}

export interface StatusColors {
  online: string;
  offline: string;
  busy: string;
  away: string;
}

export interface InteractiveColors {
  hover: string;
  active: string;
  focus: string;
  selected: string;
}

export interface DesignSystemSpacing {
  // 基础间距
  px: string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '18': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;

  // 组件间距
  component: ComponentSpacing;

  // 布局间距
  layout: LayoutSpacing;
}

export interface ComponentSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface LayoutSpacing {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface DesignSystemTypography {
  // 字体族
  fontFamily: FontFamilies;

  // 字体大小
  fontSize: FontSizes;

  // 字体粗细
  fontWeight: FontWeights;

  // 行高
  lineHeight: LineHeights;

  // 字母间距
  letterSpacing: LetterSpacings;

  // 段落间距
  paragraphSpacing: ParagraphSpacings;
}

export interface FontFamilies {
  sans: string[];
  serif: string[];
  mono: string[];
  display: string[];
  body: string[];
}

export interface FontSizes {
  '3xs': string;
  '2xs': string;
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
}

export interface FontWeights {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
}

export interface LineHeights {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
}

export interface LetterSpacings {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export interface ParagraphSpacings {
  none: string;
  tight: string;
  normal: string;
  relaxed: string;
  loose: string;
}

export interface DesignSystemBorderRadius {
  // 基础圆角
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;

  // 组件专用圆角
  button: ComponentBorderRadius;
  input: ComponentBorderRadius;
  card: ComponentBorderRadius;
  modal: string;
  dropdown: string;
}

export interface ComponentBorderRadius {
  sm: string;
  md: string;
  lg: string;
}

export interface DesignSystemShadow {
  // 基础阴影
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  inner: string;
  colored: string;

  // 组件专用阴影
  button: ComponentShadow;
  card: ComponentShadow;
  modal: string;
  tooltip: string;
  dropdown: string;
}

export interface ComponentShadow {
  sm: string;
  md: string;
  lg: string;
}

export interface DesignSystemAnimation {
  // 持续时间
  duration: AnimationDurations;

  // 缓动函数
  easing: AnimationEasings;

  // 延迟
  delay: AnimationDelays;
}

export interface AnimationDurations {
  '75': string;
  '100': string;
  '150': string;
  '200': string;
  '300': string;
  '500': string;
  '700': string;
  '1000': string;
}

export interface AnimationEasings {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  'in-quad': string;
  'in-cubic': string;
  'in-quart': string;
  'in-quint': string;
  'in-sine': string;
  'in-expo': string;
  'in-circ': string;
  'in-back': string;
  'out-quad': string;
  'out-cubic': string;
  'out-quart': string;
  'out-quint': string;
  'out-sine': string;
  'out-expo': string;
  'out-circ': string;
  'out-back': string;
  'in-out-quad': string;
  'in-out-cubic': string;
  'in-out-quart': string;
  'in-out-quint': string;
  'in-out-sine': string;
  'in-out-expo': string;
  'in-out-circ': string;
  'in-out-back': string;
}

export interface AnimationDelays {
  '75': string;
  '100': string;
  '150': string;
  '200': string;
  '300': string;
  '500': string;
  '700': string;
  '1000': string;
}

export interface DesignSystemBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface DesignSystemZIndex {
  hide: string;
  auto: string;
  base: string;
  dropdown: string;
  sticky: string;
  fixed: string;
  'modal-backdrop': string;
  modal: string;
  'popover-backdrop': string;
  popover: string;
  tooltip: string;
  max: string;
}

export interface DesignSystemTransition {
  none: string;
  all: string;
  common: string;
  colors: string;
  opacity: string;
  shadow: string;
  transform: string;

  // 组件专用过渡
  button: string;
  input: string;
  modal: string;
  tooltip: string;
  dropdown: string;
}

export interface DesignSystem {
  colors: DesignSystemColors;
  spacing: DesignSystemSpacing;
  typography: DesignSystemTypography;
  borderRadius: DesignSystemBorderRadius;
  shadow: DesignSystemShadow;
  animation: DesignSystemAnimation;
  breakpoints: DesignSystemBreakpoints;
  zIndex: DesignSystemZIndex;
  transition: DesignSystemTransition;
}

// ==================== 统一设计系统实例 ====================
export const designSystem: DesignSystem = {
  colors: defaultDesignTokens.colors,
  spacing: defaultDesignTokens.spacing,
  typography: defaultDesignTokens.typography,
  borderRadius: defaultDesignTokens.borderRadius,
  shadow: defaultDesignTokens.boxShadow,
  animation: defaultDesignTokens.animation,
  breakpoints: defaultDesignTokens.breakpoints,
  zIndex: defaultDesignTokens.zIndex,
  transition: defaultDesignTokens.transition,
};

// ==================== 设计系统工具类 ====================
export class DesignSystemUtils {
  /**
   * 获取颜色值
   */
  static getColor(path: string): string {
    const keys = path.split('.');
    let value: any = designSystem.colors;

    for (const key of keys) {
      value = value?.[key];
    }

    return value || '#000000';
  }

  /**
   * 获取间距值
   */
  static getSpacing(key: string): string {
    return String(designSystem.spacing[key as keyof DesignSystemSpacing] || '0');
  }

  /**
   * 获取字体大小
   */
  static getFontSize(key: string): string {
    return designSystem.typography.fontSize[key as keyof FontSizes] || '16px';
  }

  /**
   * 获取字体粗细
   */
  static getFontWeight(key: string): string {
    return designSystem.typography.fontWeight[key as keyof FontWeights] || '400';
  }

  /**
   * 获取圆角值
   */
  static getBorderRadius(key: string): string {
    return String(designSystem.borderRadius[key as keyof DesignSystemBorderRadius] || '0');
  }

  /**
   * 获取阴影值
   */
  static getShadow(key: string): string {
    return String(designSystem.shadow[key as keyof DesignSystemShadow] || 'none');
  }

  /**
   * 获取动画持续时间
   */
  static getAnimationDuration(key: string): string {
    return designSystem.animation.duration[key as keyof AnimationDurations] || '300ms';
  }

  /**
   * 获取动画缓动函数
   */
  static getAnimationEasing(key: string): string {
    return designSystem.animation.easing[key as keyof AnimationEasings] || 'ease';
  }

  /**
   * 获取断点值
   */
  static getBreakpoint(key: string): string {
    return designSystem.breakpoints[key as keyof DesignSystemBreakpoints] || '0';
  }

  /**
   * 获取Z-index值
   */
  static getZIndex(key: string): string {
    return designSystem.zIndex[key as keyof DesignSystemZIndex] || 'auto';
  }

  /**
   * 生成CSS变量
   */
  static generateCSSVariables(): string {
    let css = ':root {\n';

    // 递归生成CSS变量
    const generateSection = (obj: any, prefix: string = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          generateSection(value, `${prefix}${key}-`);
        } else {
          const variableName = `--${prefix}${key}`;
          css += `  ${variableName}: ${value};\n`;
        }
      });
    };

    generateSection(designSystem);
    css += '}\n';

    return css;
  }

  /**
   * 生成暗色主题CSS变量
   */
  static generateDarkThemeCSS(): string {
    return `
      [data-theme="dark"] {
        --colors-text-primary: #f9fafb;
        --colors-text-secondary: #d1d5db;
        --colors-text-disabled: #6b7280;
        --colors-text-inverse: #111827;
        --colors-text-placeholder: #6b7280;

        --colors-background-primary: #111827;
        --colors-background-secondary: #1f2937;
        --colors-background-tertiary: #374151;
        --colors-background-card: #1f2937;
        --colors-background-input: #374151;
        --colors-background-mask: rgba(0, 0, 0, 0.8);
        --colors-background-hover: #374151;
        --colors-background-active: #4b5563;

        --colors-border-default: #374151;
        --colors-border-light: #4b5563;

        --colors-shadow-default: rgba(0, 0, 0, 0.3);
        --colors-shadow-light: rgba(0, 0, 0, 0.1);
        --colors-shadow-medium: rgba(0, 0, 0, 0.4);
        --colors-shadow-dark: rgba(0, 0, 0, 0.5);
      }
    `;
  }
}

export default DesignSystemUtils;
