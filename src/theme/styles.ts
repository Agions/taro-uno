import { ThemeConfig } from './types';

// 样式工具类型定义
export interface StyleUtils {
  // 间距工具
  spacing: {
    px: (value: number) => string;
    rem: (value: number) => string;
    em: (value: number) => string;
    get: (key: keyof ThemeConfig['spacing']) => string;
  };

  // 颜色工具
  colors: {
    get: (key: keyof ThemeConfig['colors']) => string;
    opacity: (color: string, opacity: number) => string;
    lighten: (color: string, amount: number) => string;
    darken: (color: string, amount: number) => string;
    mix: (color1: string, color2: string, weight: number) => string;
  };

  // 字体工具
  typography: {
    get: (key: keyof ThemeConfig['typography']) => string;
    responsive: (key: keyof ThemeConfig['typography']['fontSize']) => string;
    family: (type: keyof ThemeConfig['typography']['fontFamily']) => string;
  };

  // 布局工具
  layout: {
    flex: (direction?: 'row' | 'column', align?: string, justify?: string) => string;
    grid: (columns: number, gap?: number) => string;
    position: (type: 'relative' | 'absolute' | 'fixed' | 'sticky', top?: number, left?: number) => string;
  };

  // 响应式工具
  responsive: {
    mobile: (styles: string) => string;
    tablet: (styles: string) => string;
    desktop: (styles: string) => string;
    custom: (breakpoint: number, styles: string) => string;
  };

  // 动画工具
  animation: {
    get: (key: keyof ThemeConfig['animation']['keyframes']) => string;
    transition: (properties: string[], duration?: string, easing?: string) => string;
    transform: (transforms: string[]) => string;
  };

  // 阴影工具
  shadow: {
    get: (key: keyof ThemeConfig['shadow']) => string;
    custom: (x: number, y: number, blur: number, color: string) => string;
  };

  // 边框工具
  border: {
    radius: (key: keyof ThemeConfig['borderRadius']) => string;
    width: (width: number, style?: string, color?: string) => string;
  };

  // Z-index工具
  zIndex: {
    get: (key: keyof typeof zIndexLevels) => string;
  };
}

// Z-index层级定义
const zIndexLevels = {
  modal: 1000,
  drawer: 900,
  popover: 800,
  tooltip: 700,
  dropdown: 600,
  sticky: 500,
  header: 400,
  footer: 300,
  default: 100,
  below: -1,
} as const;

// 颜色工具函数
const colorUtils = {
  // 将颜色转换为RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1] || '0', 16),
          g: parseInt(result[2] || '0', 16),
          b: parseInt(result[3] || '0', 16),
        }
      : null;
  },

  // 将RGB转换为HEX
  rgbToHex: (r: number, g: number, b: number): string => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  // 颜色透明度处理
  addOpacity: (hex: string, opacity: number): string => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  },

  // 颜色变亮
  lighten: (hex: string, amount: number): string => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * amount));
    const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * amount));
    const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * amount));

    return colorUtils.rgbToHex(r, g, b);
  },

  // 颜色变暗
  darken: (hex: string, amount: number): string => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.max(0, Math.floor(rgb.r * (1 - amount)));
    const g = Math.max(0, Math.floor(rgb.g * (1 - amount)));
    const b = Math.max(0, Math.floor(rgb.b * (1 - amount)));

    return colorUtils.rgbToHex(r, g, b);
  },

  // 颜色混合
  mix: (color1: string, color2: string, weight: number): string => {
    const rgb1 = colorUtils.hexToRgb(color1);
    const rgb2 = colorUtils.hexToRgb(color2);

    if (!rgb1 || !rgb2) return color1;

    const w = weight / 100;
    const r = Math.round(rgb1.r * (1 - w) + rgb2.r * w);
    const g = Math.round(rgb1.g * (1 - w) + rgb2.g * w);
    const b = Math.round(rgb1.b * (1 - w) + rgb2.b * w);

    return colorUtils.rgbToHex(r, g, b);
  },
};

// 创建样式工具实例
export const createStyleUtils = (theme: ThemeConfig): StyleUtils => {
  const spacing = {
    px: (value: number): string => `${value}px`,
    rem: (value: number): string => `${value / 16}rem`,
    em: (value: number): string => `${value}em`,
    get: (key: keyof ThemeConfig['spacing']): string => {
      const value = (theme.spacing as any)[key];
      if (typeof value === 'number') return `${value}px`;
      if (key === 'breakpoints' && typeof value === 'object') {
        return JSON.stringify(value);
      }
      return String(value);
    },
  };

  const colors = {
    get: (key: keyof ThemeConfig['colors']): string => theme.colors[key],
    opacity: (color: string, opacity: number): string => colorUtils.addOpacity(color, opacity),
    lighten: (color: string, amount: number): string => colorUtils.lighten(color, amount),
    darken: (color: string, amount: number): string => colorUtils.darken(color, amount),
    mix: (color1: string, color2: string, weight: number): string => colorUtils.mix(color1, color2, weight),
  };

  const typography = {
    get: (key: keyof ThemeConfig['typography']): string => {
      const value = (theme.typography as any)[key];
      if (typeof value === 'number') return `${value}px`;
      if (Array.isArray(value)) return value.join(', ');
      return String(value);
    },
    responsive: (key: keyof ThemeConfig['typography']['fontSize']): string => {
      const fontSize = theme.typography.fontSize[key];
      const baseSize = theme.typography.fontSize.base;

      return `
        font-size: ${fontSize}px;
        @media (max-width: ${theme.spacing.breakpoints.md}px) {
          font-size: ${Math.max(fontSize - 4, baseSize)}px;
        }
        @media (max-width: ${theme.spacing.breakpoints.sm}px) {
          font-size: ${Math.max(fontSize - 8, baseSize - 4)}px;
        }
      `;
    },
    family: (type: keyof ThemeConfig['typography']['fontFamily']): string => {
      return theme.typography.fontFamily[type].join(', ');
    },
  };

  const layout = {
    flex: (direction: 'row' | 'column' = 'row', align?: string, justify?: string): string => {
      const styles = ['display: flex'];
      if (direction === 'column') styles.push('flex-direction: column');
      if (align) styles.push(`align-items: ${align}`);
      if (justify) styles.push(`justify-content: ${justify}`);
      return styles.join('; ');
    },
    grid: (columns: number, gap: number = theme.spacing.gap): string => {
      return `
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        gap: ${gap}px;
      `;
    },
    position: (type: 'relative' | 'absolute' | 'fixed' | 'sticky', top?: number, left?: number): string => {
      const styles = [`position: ${type}`];
      if (top !== undefined) styles.push(`top: ${top}px`);
      if (left !== undefined) styles.push(`left: ${left}px`);
      return styles.join('; ');
    },
  };

  const responsive = {
    mobile: (styles: string): string => {
      return `@media (max-width: ${theme.spacing.breakpoints.sm}px) { ${styles} }`;
    },
    tablet: (styles: string): string => {
      return `@media (min-width: ${theme.spacing.breakpoints.sm}px) and (max-width: ${theme.spacing.breakpoints.lg}px) { ${styles} }`;
    },
    desktop: (styles: string): string => {
      return `@media (min-width: ${theme.spacing.breakpoints.lg}px) { ${styles} }`;
    },
    custom: (breakpoint: number, styles: string): string => {
      return `@media (max-width: ${breakpoint}px) { ${styles} }`;
    },
  };

  const animation = {
    get: (key: keyof ThemeConfig['animation']['keyframes']): string => {
      return theme.animation.keyframes[key];
    },
    transition: (
      properties: string[],
      duration: string = theme.animation.duration.normal,
      easing: string = theme.animation.easing.ease,
    ): string => {
      return `transition: ${properties.join(', ')} ${duration} ${easing}`;
    },
    transform: (transforms: string[]): string => {
      return `transform: ${transforms.join(' ')}`;
    },
  };

  const shadow = {
    get: (key: keyof ThemeConfig['shadow']): string => {
      return theme.shadow[key];
    },
    custom: (x: number, y: number, blur: number, color: string): string => {
      return `${x}px ${y}px ${blur}px ${color}`;
    },
  };

  const border = {
    radius: (key: keyof ThemeConfig['borderRadius']): string => {
      const value = theme.borderRadius[key];
      return typeof value === 'number' ? `${value}px` : String(value);
    },
    width: (width: number, style: string = 'solid', color: string = theme.colors.border): string => {
      return `${width}px ${style} ${color}`;
    },
  };

  const zIndex = {
    get: (key: keyof typeof zIndexLevels): string => {
      return String(zIndexLevels[key]);
    },
  };

  return {
    spacing,
    colors,
    typography,
    layout,
    responsive,
    animation,
    shadow,
    border,
    zIndex,
  };
};

// 样式生成器 - 生成基础的CSS变量
export const generateStyles = (theme: ThemeConfig): string => {
  const utils = createStyleUtils(theme);

  return `
    /* 主题变量 */
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
      --spacing-xs: ${utils.spacing.get('xs')};
      --spacing-sm: ${utils.spacing.get('sm')};
      --spacing-md: ${utils.spacing.get('md')};
      --spacing-lg: ${utils.spacing.get('lg')};
      --spacing-xl: ${utils.spacing.get('xl')};
      --spacing-xxl: ${utils.spacing.get('xxl')};

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

      /* 圆角变量 */
      --radius-none: ${utils.border.radius('none')};
      --radius-sm: ${utils.border.radius('sm')};
      --radius-md: ${utils.border.radius('md')};
      --radius-lg: ${utils.border.radius('lg')};
      --radius-xl: ${utils.border.radius('xl')};
      --radius-full: ${utils.border.radius('full')};

      /* 阴影变量 */
      --shadow-none: ${utils.shadow.get('none')};
      --shadow-sm: ${utils.shadow.get('sm')};
      --shadow-md: ${utils.shadow.get('md')};
      --shadow-lg: ${utils.shadow.get('lg')};
      --shadow-xl: ${utils.shadow.get('xl')};
      --shadow-2xl: ${utils.shadow.get('2xl')};

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

    /* 暗色主题 */
    [data-theme="dark"] {
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
      --shadow-color: ${theme.colors.shadow};
      --shadow-light: ${theme.colors.shadowLight};
      --divider-color: ${theme.colors.divider};
    }
  `;
};

// 创建样式函数（用于组件样式）
export const createStyles = (styles: Record<string, any>) => {
  return styles;
};

// 默认样式工具导出（延迟初始化，避免循环导入）
let _defaultStyleUtils: StyleUtils | null = null;
export const styleUtils = (theme?: ThemeConfig): StyleUtils => {
  if (!theme && !_defaultStyleUtils) {
    const { defaultTheme } = require('./defaults');
    _defaultStyleUtils = createStyleUtils(defaultTheme);
  }
  return theme ? createStyleUtils(theme) : _defaultStyleUtils!;
};

export default createStyleUtils;
