import { CSSProperties } from 'react';
import { TypographyProps, TypographySize, TypographyColor, TypographyWeight } from './Typography.types';

/**
 * Typography 样式配置
 */
export const typographyStyles = {
  /**
   * 基础样式
   */
  base: {
    display: 'block',
    margin: 0,
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: 1.5,
    color: '#1f2937',
  } as CSSProperties,

  /**
   * 标题样式
   */
  headings: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    } as CSSProperties,
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
      marginBottom: '0.5rem',
    } as CSSProperties,
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      marginBottom: '0.5rem',
    } as CSSProperties,
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '0.5rem',
    } as CSSProperties,
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
      marginBottom: '0.5rem',
    } as CSSProperties,
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
      marginBottom: '0.5rem',
    } as CSSProperties,
  },

  /**
   * 段落样式
   */
  paragraph: {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '1rem',
    color: '#374151',
  } as CSSProperties,

  /**
   * 文本样式
   */
  text: {
    display: 'inline',
    fontSize: '1rem',
    lineHeight: 1.5,
    color: '#374151',
  } as CSSProperties,

  /**
   * 链接样式
   */
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#2563eb',
      textDecoration: 'underline',
    },
    '&:active': {
      color: '#1d4ed8',
    },
  } as CSSProperties,

  /**
   * 尺寸映射
   */
  sizes: {
    xs: { fontSize: '0.75rem', lineHeight: 1.25 },
    sm: { fontSize: '0.875rem', lineHeight: 1.375 },
    md: { fontSize: '1rem', lineHeight: 1.5 },
    lg: { fontSize: '1.125rem', lineHeight: 1.625 },
    xl: { fontSize: '1.25rem', lineHeight: 1.75 },
    xxl: { fontSize: '1.5rem', lineHeight: 1.875 },
  } as Record<TypographySize, CSSProperties>,

  /**
   * 颜色映射
   */
  colors: {
    primary: { color: '#3b82f6' },
    secondary: { color: '#6b7280' },
    success: { color: '#10b981' },
    warning: { color: '#f59e0b' },
    danger: { color: '#ef4444' },
    inherit: { color: 'inherit' },
  } as Record<TypographyColor, CSSProperties>,

  /**
   * 权重映射
   */
  weights: {
    normal: { fontWeight: 400 },
    medium: { fontWeight: 500 },
    semibold: { fontWeight: 600 },
    bold: { fontWeight: 700 },
  } as Record<TypographyWeight, CSSProperties>,

  /**
   * 类型映射
   */
  types: {
    primary: { color: '#3b82f6' },
    secondary: { color: '#6b7280' },
    success: { color: '#10b981' },
    warning: { color: '#f59e0b' },
    danger: { color: '#ef4444' },
  } as Record<string, CSSProperties>,

  /**
   * 状态样式
   */
  states: {
    disabled: {
      color: '#9ca3af',
      cursor: 'not-allowed',
    } as CSSProperties,
    copyable: {
      cursor: 'pointer',
      position: 'relative',
      '&:hover': {
        backgroundColor: '#f3f4f6',
      },
    } as CSSProperties,
    editable: {
      cursor: 'text',
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
    } as CSSProperties,
  },

  /**
   * 装饰样式
   */
  decorations: {
    delete: {
      textDecoration: 'line-through',
      color: '#6b7280',
    } as CSSProperties,
    underline: {
      textDecoration: 'underline',
    } as CSSProperties,
    code: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      backgroundColor: '#f3f4f6',
      padding: '0.125rem 0.25rem',
      borderRadius: '0.25rem',
      fontSize: '0.875em',
      border: '1px solid #e5e7eb',
    } as CSSProperties,
    keyboard: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderBottomWidth: '2px',
      borderRadius: '0.25rem',
      padding: '0.125rem 0.375rem',
      fontSize: '0.875em',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    } as CSSProperties,
  },

  /**
   * 对齐样式
   */
  alignments: {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    justify: { textAlign: 'justify' },
  } as Record<string, CSSProperties>,

  /**
   * 省略号样式
   */
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as CSSProperties,

  /**
   * 多行省略号样式
   */
  multiLineEllipsis: (maxRows: number) => ({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxRows,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as CSSProperties),
};

/**
 * 计算 Typography 样式
 */
export const calculateTypographyStyles = (props: TypographyProps): CSSProperties => {
  const {
    variant = 'p',
    type,
    align,
    disabled,
    copyable,
    editable,
    delete: isDelete,
    underline,
    code,
    keyboard,
    strong,
    italic,
    style,
    size,
    color,
    weight,
    ellipsis,
    maxRows,
    wrap,
  } = props;

  const styles: CSSProperties = { ...typographyStyles['base'] };

  // 根据变体设置样式
  if (variant && variant in typographyStyles['headings']) {
    Object.assign(styles, typographyStyles['headings'][variant as keyof typeof typographyStyles['headings']]);
  } else if (variant === 'p') {
    Object.assign(styles, typographyStyles['paragraph']);
  } else if (variant === 'span') {
    Object.assign(styles, typographyStyles['text']);
  }

  // 类型样式
  if (type && type in typographyStyles['types']) {
    Object.assign(styles, typographyStyles['types'][type]);
  }

  // 对齐样式
  if (align && align in typographyStyles['alignments']) {
    Object.assign(styles, typographyStyles['alignments'][align]);
  }

  // 状态样式
  if (disabled) {
    Object.assign(styles, typographyStyles['states'].disabled);
  }
  if (copyable) {
    Object.assign(styles, typographyStyles['states'].copyable);
  }
  if (editable) {
    Object.assign(styles, typographyStyles['states'].editable);
  }

  // 装饰样式
  if (isDelete) {
    Object.assign(styles, typographyStyles['decorations'].delete);
  }
  if (underline) {
    Object.assign(styles, typographyStyles['decorations'].underline);
  }
  if (code) {
    Object.assign(styles, typographyStyles['decorations'].code);
  }
  if (keyboard) {
    Object.assign(styles, typographyStyles['decorations'].keyboard);
  }

  // 权重样式
  if (strong) {
    Object.assign(styles, typographyStyles['weights'].bold);
  }
  if (italic) {
    styles.fontStyle = 'italic';
  }

  // 尺寸样式
  if (size && size in typographyStyles['sizes']) {
    Object.assign(styles, typographyStyles['sizes'][size as TypographySize]);
  }

  // 颜色样式
  if (color && color in typographyStyles['colors']) {
    Object.assign(styles, typographyStyles['colors'][color as TypographyColor]);
  }

  // 权重样式
  if (weight && weight in typographyStyles['weights']) {
    Object.assign(styles, typographyStyles['weights'][weight]);
  }

  // 省略号样式
  if (ellipsis) {
    if (maxRows && maxRows > 1) {
      Object.assign(styles, typographyStyles['multiLineEllipsis'](maxRows));
    } else {
      Object.assign(styles, typographyStyles['ellipsis']);
    }
  }

  // 换行样式
  if (wrap === false) {
    Object.assign(styles, {
      whiteSpace: 'nowrap',
    });
  }

  // 合并自定义样式
  if (style) {
    Object.assign(styles, style);
  }

  return styles;
};