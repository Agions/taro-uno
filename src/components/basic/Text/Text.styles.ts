import { PlatformDetector } from '@/utils';
import type { TextProps, TextSize, TextWeight, TextColor, TextStatus } from './Text.types';

/** 样式工具类 */
export class TextStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platform = PlatformDetector.getPlatform();
    return `taro-uno-${platform}-text`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<TextSize, { fontSize: number; lineHeight: number }> = {
    xs: { fontSize: 20, lineHeight: 1.25 },
    sm: { fontSize: 24, lineHeight: 1.375 },
    md: { fontSize: 28, lineHeight: 1.5 },
    lg: { fontSize: 32, lineHeight: 1.625 },
    xl: { fontSize: 36, lineHeight: 1.75 },
    '2xl': { fontSize: 40, lineHeight: 1.875 },
    '3xl': { fontSize: 48, lineHeight: 2 },
    '4xl': { fontSize: 56, lineHeight: 2.125 },
    '5xl': { fontSize: 64, lineHeight: 2.25 },
    '6xl': { fontSize: 72, lineHeight: 2.375 },
    '7xl': { fontSize: 80, lineHeight: 2.5 },
    '8xl': { fontSize: 96, lineHeight: 2.625 },
    '9xl': { fontSize: 112, lineHeight: 2.75 },
  };

  /** 权重映射 */
  static readonly WEIGHT_MAP: Record<TextWeight, number> = {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };

  /** 颜色映射 */
  static readonly COLOR_MAP: Record<TextColor, string> = {
    primary: '#0ea5e9',
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    disabled: '#9ca3af',
    inherit: 'inherit',
    current: 'currentColor',
  };

  /** 状态映射 */
  static readonly STATUS_MAP: Record<TextStatus, { opacity: number; cursor: string; pointerEvents: string }> = {
    normal: { opacity: 1, cursor: 'default', pointerEvents: 'auto' },
    active: { opacity: 0.8, cursor: 'pointer', pointerEvents: 'auto' },
    disabled: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    loading: { opacity: 0.7, cursor: 'not-allowed', pointerEvents: 'none' },
  };

  /** 行高映射 */
  static readonly LINE_HEIGHT_MAP: Record<string, number> = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  };

  /** 字母间距映射 */
  static readonly LETTER_SPACING_MAP: Record<string, string> = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  };

  /** 生成文本类名 */
  static getClassName(props: Partial<TextProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      weight = 'normal',
      color = 'inherit',
      align = 'left',
      decoration = 'none',
      transform = 'none',
      overflow = 'clip',
      direction = 'ltr',
      fontStyle = 'normal',
      variant = 'normal',
      letterSpacing = 'normal',
      lineHeight = 'normal',
      status = 'normal',
      type = 'body',
      clickable = false,
      loading = false,
      disabled = false,
      block = false,
      inlineBlock = false,
      selectable = false,
      copyable = false,
      animated = false,
      underline = false,
      strikethrough = false,
      highlight = false,
      ellipsis = false,
      wrap = true,
      breakWord = false,
      className = '',
    } = props;

    const classes = [
      prefix,
      `${prefix}--${size}`,
      `${prefix}--${weight}`,
      `${prefix}--${color}`,
      `${prefix}--${align}`,
      `${prefix}--${decoration}`,
      `${prefix}--${transform}`,
      `${prefix}--${overflow}`,
      `${prefix}--${direction}`,
      `${prefix}--${fontStyle}`,
      `${prefix}--${variant}`,
      `${prefix}--${status}`,
      `${prefix}--${type}`,
      clickable && `${prefix}--clickable`,
      loading && `${prefix}--loading`,
      disabled && `${prefix}--disabled`,
      block && `${prefix}--block`,
      inlineBlock && `${prefix}--inline-block`,
      selectable && `${prefix}--selectable`,
      copyable && `${prefix}--copyable`,
      animated && `${prefix}--animated`,
      underline && `${prefix}--underline`,
      strikethrough && `${prefix}--strikethrough`,
      highlight && `${prefix}--highlight`,
      ellipsis && `${prefix}--ellipsis`,
      wrap && `${prefix}--wrap`,
      breakWord && `${prefix}--break-word`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成文本样式 */
  static getStyle(props: Partial<TextProps>): React.CSSProperties {
    const {
      size = 'md',
      weight = 'normal',
      color = 'inherit',
      align = 'left',
      decoration = 'none',
      transform = 'none',
      overflow = 'clip',
      direction = 'ltr',
      fontStyle = 'normal',
      variant = 'normal',
      letterSpacing = 'normal',
      lineHeight = 'normal',
      status = 'normal',
      loading = false,
      disabled = false,
      maxLines,
      animated = false,
      animationDuration = 300,
      underline = false,
      strikethrough = false,
      highlight = false,
      highlightColor = '#fef3c7',
      ellipsis = false,
      wrap = true,
      breakWord = false,
      textShadow,
      textOutline,
      gradient,
      fontFamily,
      wordSpacing,
      textIndent,
      whiteSpace,
      verticalAlign,
      writingMode,
      textRendering,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const weightStyles = this.WEIGHT_MAP[weight];
    const colorStyles = this.COLOR_MAP[color];
    const statusStyles = this.STATUS_MAP[status];

    // 处理字母间距
    const letterSpacingValue =
      typeof letterSpacing === 'string' ? this.LETTER_SPACING_MAP[letterSpacing] : `${letterSpacing}px`;

    // 处理行高
    const lineHeightValue = typeof lineHeight === 'string' ? this.LINE_HEIGHT_MAP[lineHeight] : lineHeight;

    // 处理文本装饰
    const textDecorationValue = [];
    if (underline) textDecorationValue.push('underline');
    if (strikethrough) textDecorationValue.push('line-through');
    const finalDecoration = textDecorationValue.length > 0 ? textDecorationValue.join(' ') : decoration;

    // 处理渐变背景
    const backgroundStyle = gradient
      ? {
          backgroundImage: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.start}, ${gradient.end})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        }
      : {};

    // 处理最大行数
    const overflowStyle = maxLines
      ? {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: maxLines,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : {};

    // 处理省略号
    const ellipsisStyle = ellipsis
      ? {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : {};

    // 处理换行
    const wrapStyle = !wrap
      ? {
          whiteSpace: 'nowrap',
        }
      : {};

    // 处理断词
    const breakWordStyle = breakWord
      ? {
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }
      : {};

    return {
      ...sizeStyles,
      fontWeight: weightStyles,
      color: colorStyles,
      textAlign: align,
      textDecoration: finalDecoration,
      textTransform: transform,
      textOverflow: overflow,
      direction,
      fontStyle,
      fontVariant: variant,
      letterSpacing: letterSpacingValue,
      lineHeight: lineHeightValue,
      opacity: statusStyles.opacity,
      cursor: statusStyles.cursor,
      pointerEvents: statusStyles.pointerEvents,
      transition: animated ? `all ${animationDuration}ms ease-in-out` : 'none',
      backgroundColor: highlight ? highlightColor : 'transparent',
      textShadow,
      textStroke: textOutline,
      fontFamily: Array.isArray(fontFamily) ? fontFamily.join(', ') : fontFamily,
      wordSpacing: typeof wordSpacing === 'number' ? `${wordSpacing}px` : wordSpacing,
      textIndent: typeof textIndent === 'number' ? `${textIndent}px` : textIndent,
      whiteSpace,
      verticalAlign,
      writingMode,
      textRendering,
      ...backgroundStyle,
      ...overflowStyle,
      ...ellipsisStyle,
      ...wrapStyle,
      ...breakWordStyle,
      ...style,
    };
  }

  /** 生成链接样式 */
  static getLinkStyle(props: {
    color?: string;
    underline?: boolean;
    visited?: boolean;
    active?: boolean;
    hover?: boolean;
  }): React.CSSProperties {
    const { color = '#0ea5e9', underline = true, visited, active, hover } = props;

    return {
      color: visited ? '#7c3aed' : active ? '#0369a1' : hover ? '#0284c7' : color,
      textDecoration: underline ? 'underline' : 'none',
      cursor: 'pointer',
      transition: 'color 0.2s ease-in-out',
    };
  }

  /** 生成代码样式 */
  static getCodeStyle(props: { variant?: 'inline' | 'block'; language?: string }): React.CSSProperties {
    const { variant = 'inline', language } = props;

    const baseStyle: React.CSSProperties = {
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      fontSize: '0.875em',
      backgroundColor: '#f3f4f6',
      padding: variant === 'inline' ? '0.125em 0.25em' : '0.5em',
      borderRadius: '0.25em',
      border: '1px solid #e5e7eb',
    };

    if (variant === 'block') {
      return {
        ...baseStyle,
        display: 'block',
        padding: '1em',
        overflowX: 'auto',
        whiteSpace: 'pre',
      };
    }

    return baseStyle;
  }

  /** 生成引用样式 */
  static getQuoteStyle(props: {
    variant?: 'solid' | 'dashed' | 'dotted';
    position?: 'left' | 'right';
  }): React.CSSProperties {
    const { variant = 'solid', position = 'left' } = props;

    return {
      fontStyle: 'italic',
      borderLeft: position === 'left' ? `4px ${variant} #e5e7eb` : 'none',
      borderRight: position === 'right' ? `4px ${variant} #e5e7eb` : 'none',
      paddingLeft: position === 'left' ? '1em' : '0',
      paddingRight: position === 'right' ? '1em' : '0',
      margin: '1em 0',
      color: '#6b7280',
    };
  }

  /** 生成标题样式 */
  static getHeadingStyle(level: 1 | 2 | 3 | 4 | 5 | 6): React.CSSProperties {
    const styles = {
      1: { fontSize: '2.5em', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.5em' },
      2: { fontSize: '2em', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5em' },
      3: { fontSize: '1.75em', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.5em' },
      4: { fontSize: '1.5em', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.5em' },
      5: { fontSize: '1.25em', fontWeight: 500, lineHeight: 1.6, marginBottom: '0.5em' },
      6: { fontSize: '1em', fontWeight: 500, lineHeight: 1.7, marginBottom: '0.5em' },
    };

    return styles[level];
  }

  /** 生成加载动画样式 */
  static getLoadingStyle(): React.CSSProperties {
    return {
      display: 'inline-block',
      width: '1em',
      height: '1em',
      border: '2px solid transparent',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      verticalAlign: 'middle',
      marginRight: '0.5em',
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --text-primary-color: #0ea5e9;
        --text-secondary-color: #6b7280;
        --text-success-color: #22c55e;
        --text-warning-color: #f59e0b;
        --text-error-color: #ef4444;
        --text-info-color: #3b82f6;
        --text-disabled-color: #9ca3af;
        --text-disabled-opacity: 0.5;
        --text-loading-opacity: 0.7;
        --text-animation-duration: 300ms;
        --text-highlight-color: #fef3c7;
        --text-link-color: #0ea5e9;
        --text-link-hover-color: #0284c7;
        --text-link-visited-color: #7c3aed;
        --text-code-background: #f3f4f6;
        --text-code-border: #e5e7eb;
        --text-quote-border: #e5e7eb;
        --text-quote-color: #6b7280;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideIn {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0);
        }
      }

      @keyframes typewriter {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes blink {
        0%, 50% {
          opacity: 1;
        }
        51%, 100% {
          opacity: 0;
        }
      }
    `;
  }

  /** 获取尺寸类名 */
  static getSizeClassName(size: TextSize): string {
    return `taro-uno-text--${size}`;
  }

  /** 获取权重类名 */
  static getWeightClassName(weight: TextWeight): string {
    return `taro-uno-text--${weight}`;
  }

  /** 获取颜色类名 */
  static getColorClassName(color: TextColor): string {
    return `taro-uno-text--${color}`;
  }

  /** 获取状态类名 */
  static getStatusClassName(status: TextStatus): string {
    return `taro-uno-text--${status}`;
  }

  /** 获取类型类名 */
  static getTypeClassName(type: string): string {
    return `taro-uno-text--${type}`;
  }
}

/** 导出样式工具 */
export const textStyles = TextStyles;
