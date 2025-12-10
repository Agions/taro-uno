/**
 * 优化的CSS变量系统
 * 提供类型安全的CSS变量管理和继承机制
 */

import { ThemeConfig } from './types';

// CSS变量类型定义
export interface CSSVariables {
  // 颜色变量
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: string;
    textSecondary: string;
    textDisabled: string;
    textInverse: string;
    background: string;
    backgroundCard: string;
    backgroundInput: string;
    backgroundMask: string;
    border: string;
    borderLight: string;
    borderFocus: string;
    shadow: string;
    shadowLight: string;
    brand: string;
    accent: string;
    link: string;
    divider: string;
  };

  // 间距变量
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    padding: string;
    margin: string;
    gap: string;
  };

  // 字体变量
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
      mono: string;
      heading: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
      loose: string;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
    };
  };

  // 边框变量
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
    circle: string;
  };

  // 阴影变量
  shadow: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };

  // 动画变量
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      linear: string;
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };

  // 响应式断点
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  // Z-index变量
  zIndex: {
    dropdown: string;
    sticky: string;
    fixed: string;
    modal: string;
    popover: string;
    tooltip: string;
  };

  // 过渡变量
  transition: {
    base: string;
    fast: string;
    slow: string;
  };
}

// 变量继承配置
export interface VariableInheritance {
  parent: string;
  child: string;
  transform?: (value: string) => string;
}

// 变量组配置
export interface VariableGroup {
  name: string;
  prefix: string;
  variables: string[];
  inheritance?: VariableInheritance[];
}

// CSS变量生成器
export class CSSVariableGenerator {
  private theme: ThemeConfig;

  constructor(theme: ThemeConfig) {
    this.theme = theme;
    this.initializeVariableGroups();
  }

  // 初始化变量组
  private initializeVariableGroups(): VariableGroup[] {
    return [
      {
        name: 'colors',
        prefix: 'color',
        variables: [
          'primary',
          'primaryLight',
          'primaryDark',
          'secondary',
          'success',
          'warning',
          'error',
          'info',
          'text',
          'textSecondary',
          'textDisabled',
          'textInverse',
          'background',
          'backgroundCard',
          'backgroundInput',
          'backgroundMask',
          'border',
          'borderLight',
          'borderFocus',
          'shadow',
          'shadowLight',
          'brand',
          'accent',
          'link',
          'divider',
        ],
        inheritance: [
          {
            parent: 'primary',
            child: 'primaryLight',
            transform: (value) => this.lightenColor(value, 0.2),
          },
          {
            parent: 'primary',
            child: 'primaryDark',
            transform: (value) => this.darkenColor(value, 0.2),
          },
        ],
      },
      {
        name: 'spacing',
        prefix: 'spacing',
        variables: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'padding', 'margin', 'gap'],
      },
      {
        name: 'typography',
        prefix: 'font',
        variables: ['family-sans', 'family-serif', 'family-mono', 'family-heading'],
      },
      {
        name: 'fontSize',
        prefix: 'text',
        variables: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      },
      {
        name: 'fontWeight',
        prefix: 'weight',
        variables: ['light', 'normal', 'medium', 'semibold', 'bold'],
      },
      {
        name: 'lineHeight',
        prefix: 'leading',
        variables: ['tight', 'normal', 'relaxed', 'loose'],
      },
      {
        name: 'letterSpacing',
        prefix: 'tracking',
        variables: ['tight', 'normal', 'wide'],
      },
      {
        name: 'borderRadius',
        prefix: 'radius',
        variables: ['none', 'sm', 'md', 'lg', 'xl', 'full', 'circle'],
      },
      {
        name: 'shadow',
        prefix: 'shadow',
        variables: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'],
      },
      {
        name: 'animation',
        prefix: 'duration',
        variables: ['fast', 'normal', 'slow'],
      },
      {
        name: 'easing',
        prefix: 'ease',
        variables: ['linear', 'ease', 'easeIn', 'easeOut', 'easeInOut'],
      },
      {
        name: 'breakpoints',
        prefix: 'breakpoint',
        variables: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      },
      {
        name: 'zIndex',
        prefix: 'z',
        variables: ['dropdown', 'sticky', 'fixed', 'modal', 'popover', 'tooltip'],
      },
      {
        name: 'transition',
        prefix: 'transition',
        variables: ['base', 'fast', 'slow'],
      },
    ];
  }

  // 生成CSS变量
  public generateVariables(): CSSVariables {
    const variables: Partial<CSSVariables> = {};

    // 生成颜色变量
    variables.colors = this.generateColorVariables();

    // 生成间距变量
    variables.spacing = this.generateSpacingVariables();

    // 生成字体变量
    variables.typography = this.generateTypographyVariables();

    // 生成边框变量
    variables.borderRadius = this.generateBorderRadiusVariables();

    // 生成阴影变量
    variables.shadow = this.generateShadowVariables();

    // 生成动画变量
    variables.animation = this.generateAnimationVariables();

    // 生成断点变量
    variables.breakpoints = this.generateBreakpointVariables();

    // 生成Z-index变量
    variables.zIndex = this.generateZIndexVariables();

    // 生成过渡变量
    variables.transition = this.generateTransitionVariables();

    return variables as CSSVariables;
  }

  // 生成颜色变量
  private generateColorVariables(): CSSVariables['colors'] {
    const { colors } = this.theme;

    return {
      primary: colors.primary,
      primaryLight: this.lightenColor(colors.primary, 0.2),
      primaryDark: this.darkenColor(colors.primary, 0.2),
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      text: colors.text,
      textSecondary: colors.textSecondary,
      textDisabled: colors.textDisabled,
      textInverse: colors.textInverse,
      background: colors.background,
      backgroundCard: colors.backgroundCard,
      backgroundInput: colors.backgroundInput,
      backgroundMask: colors.backgroundMask,
      border: colors.border,
      borderLight: colors.borderLight,
      borderFocus: colors.borderFocus,
      shadow: colors.shadow,
      shadowLight: colors.shadowLight,
      brand: colors.brand,
      accent: colors.accent,
      link: colors.link,
      divider: colors.divider,
    };
  }

  // 生成间距变量
  private generateSpacingVariables(): CSSVariables['spacing'] {
    const { spacing } = this.theme;

    return {
      xs: `${spacing.xs}px`,
      sm: `${spacing.sm}px`,
      md: `${spacing.md}px`,
      lg: `${spacing.lg}px`,
      xl: `${spacing.xl}px`,
      xxl: `${spacing.xxl}px`,
      padding: `${spacing.padding}px`,
      margin: `${spacing.margin}px`,
      gap: `${spacing.gap}px`,
    };
  }

  // 生成字体变量
  private generateTypographyVariables(): CSSVariables['typography'] {
    const { typography } = this.theme;

    return {
      fontFamily: {
        sans: typography.fontFamily.sans.join(', '),
        serif: typography.fontFamily.serif.join(', '),
        mono: typography.fontFamily.mono.join(', '),
        heading: typography.fontFamily.heading.join(', '),
      },
      fontSize: {
        xs: `${typography.fontSize.xs}px`,
        sm: `${typography.fontSize.sm}px`,
        base: `${typography.fontSize.base}px`,
        lg: `${typography.fontSize.lg}px`,
        xl: `${typography.fontSize.xl}px`,
        '2xl': `${typography.fontSize['2xl']}px`,
        '3xl': `${typography.fontSize['3xl']}px`,
        '4xl': `${typography.fontSize['4xl']}px`,
        '5xl': `${typography.fontSize['5xl']}px`,
      },
      fontWeight: {
        light: typography.fontWeight.light.toString(),
        normal: typography.fontWeight.normal.toString(),
        medium: typography.fontWeight.medium.toString(),
        semibold: typography.fontWeight.semibold.toString(),
        bold: typography.fontWeight.bold.toString(),
      },
      lineHeight: {
        tight: typography.lineHeight.tight.toString(),
        normal: typography.lineHeight.normal.toString(),
        relaxed: typography.lineHeight.relaxed.toString(),
        loose: typography.lineHeight.loose.toString(),
      },
      letterSpacing: {
        tight: typography.letterSpacing.tight,
        normal: typography.letterSpacing.normal,
        wide: typography.letterSpacing.wide,
      },
    };
  }

  // 生成边框变量
  private generateBorderRadiusVariables(): CSSVariables['borderRadius'] {
    const { borderRadius } = this.theme;

    return {
      none: `${borderRadius.none}px`,
      sm: `${borderRadius.sm}px`,
      md: `${borderRadius.md}px`,
      lg: `${borderRadius.lg}px`,
      xl: `${borderRadius.xl}px`,
      full: `${borderRadius.full}px`,
      circle: `${borderRadius.circle}%`,
    };
  }

  // 生成阴影变量
  private generateShadowVariables(): CSSVariables['shadow'] {
    const { shadow } = this.theme;

    return {
      none: shadow.none,
      sm: shadow.sm,
      md: shadow.md,
      lg: shadow.lg,
      xl: shadow.xl,
      '2xl': shadow['2xl'],
      inner: shadow.inner,
    };
  }

  // 生成动画变量
  private generateAnimationVariables(): CSSVariables['animation'] {
    const { animation } = this.theme;

    return {
      duration: animation.duration,
      easing: animation.easing,
    };
  }

  // 生成断点变量
  private generateBreakpointVariables(): CSSVariables['breakpoints'] {
    const { breakpoints } = this.theme.spacing;

    return {
      xs: `${breakpoints.xs}px`,
      sm: `${breakpoints.sm}px`,
      md: `${breakpoints.md}px`,
      lg: `${breakpoints.lg}px`,
      xl: `${breakpoints.xl}px`,
      xxl: `${breakpoints.xxl}px`,
    };
  }

  // 生成Z-index变量
  private generateZIndexVariables(): CSSVariables['zIndex'] {
    return {
      dropdown: '1000',
      sticky: '1020',
      fixed: '1030',
      modal: '1040',
      popover: '1050',
      tooltip: '1060',
    };
  }

  // 生成过渡变量
  private generateTransitionVariables(): CSSVariables['transition'] {
    const { animation } = this.theme;

    return {
      base: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
      fast: `all ${animation.duration.fast} ${animation.easing.easeInOut}`,
      slow: `all ${animation.duration.slow} ${animation.easing.easeInOut}`,
    };
  }

  // 生成CSS变量字符串
  public generateCSSString(): string {
    const variables = this.generateVariables();

    let css = ':root {\n';

    // 递归生成变量
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

    generateSection(variables);
    css += '}\n';

    // 生成暗色主题变量
    css += '[data-theme="dark"] {\n';
    const darkVariables = this.generateDarkThemeVariables();
    Object.entries(darkVariables).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`;
    });
    css += '}\n';

    return css;
  }

  // 生成暗色主题变量
  private generateDarkThemeVariables(): Record<string, string> {
    const darkColors = this.generateColorVariables();

    return {
      'color-text': darkColors.text,
      'color-text-secondary': darkColors.textSecondary,
      'color-text-disabled': darkColors.textDisabled,
      'color-text-inverse': darkColors.textInverse,
      'color-background': darkColors.background,
      'color-background-card': darkColors.backgroundCard,
      'color-background-input': darkColors.backgroundInput,
      'color-background-mask': darkColors.backgroundMask,
      'color-border': darkColors.border,
      'color-border-light': darkColors.borderLight,
      'color-shadow': darkColors.shadow,
      'color-shadow-light': darkColors.shadowLight,
      'color-divider': darkColors.divider,
    };
  }

  // 颜色处理工具方法
  private lightenColor(hex: string, amount: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * amount));
    const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * amount));
    const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * amount));

    return this.rgbToHex(r, g, b);
  }

  private darkenColor(hex: string, amount: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.max(0, Math.floor(rgb.r * (1 - amount)));
    const g = Math.max(0, Math.floor(rgb.g * (1 - amount)));
    const b = Math.max(0, Math.floor(rgb.b * (1 - amount)));

    return this.rgbToHex(r, g, b);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1] || '0', 16),
          g: parseInt(result[2] || '0', 16),
          b: parseInt(result[3] || '0', 16),
        }
      : null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}

// 导出工具函数
export const createCSSVariables = (theme: ThemeConfig): CSSVariables => {
  const generator = new CSSVariableGenerator(theme);
  return generator.generateVariables();
};

export const generateCSSVariablesString = (theme: ThemeConfig): string => {
  const generator = new CSSVariableGenerator(theme);
  return generator.generateCSSString();
};

export default CSSVariableGenerator;
