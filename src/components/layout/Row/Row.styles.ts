import type { RowProps, RowGutter } from './Row.types';

/** Row组件样式管理器 */
export const rowStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 8,
    medium: 16,
    large: 24,
    default: 16,
  } as const,

  /** 对齐方式映射表 */
  ALIGN_MAP: {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
  } as const,

  /** 对齐方式映射表 */
  JUSTIFY_MAP: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between',
    'space-evenly': 'space-evenly',
  } as const,

  /**
   * 解析尺寸值
   */
  parseSize: (size: any): string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }

    if (typeof size === 'string') {
      if (size in rowStyles.SIZE_MAP) {
        return `${rowStyles.SIZE_MAP[size as keyof typeof rowStyles.SIZE_MAP]}px`;
      }
      return size;
    }

    return `${rowStyles.SIZE_MAP.default}px`;
  },

  /**
   * 解析尺寸值为数字
   */
  parseSizeNumber: (size: any): number => {
    if (typeof size === 'number') {
      return size;
    }

    if (typeof size === 'string') {
      if (size in rowStyles.SIZE_MAP) {
        return rowStyles.SIZE_MAP[size as keyof typeof rowStyles.SIZE_MAP];
      }
      // Try to parse number from string
      const match = size && size.match ? size.match(/^(\d+)/) : null;
      return match && match[1] ? parseInt(match[1], 10) : rowStyles.SIZE_MAP.default;
    }

    return rowStyles.SIZE_MAP.default;
  },

  /**
   * 解析间距值
   */
  parseGutter: (gutter: RowGutter): string => {
    if (Array.isArray(gutter)) {
      const [rowGutter, colGutter] = gutter;
      return `${rowStyles['parseSize'](rowGutter)} ${rowStyles['parseSize'](colGutter)}`;
    }
    return rowStyles['parseSize'](gutter);
  },

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: RowProps): React.CSSProperties => {
    const { gutter = 0, align = 'top', justify = 'start', wrap = true, style = {} } = props;

    // 计算对齐方式
    const alignItems = rowStyles['ALIGN_MAP'][align];
    const justifyContent = rowStyles['JUSTIFY_MAP'][justify];

    return {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems,
      justifyContent,
      marginLeft: Array.isArray(gutter)
        ? `-${rowStyles['parseSizeNumber'](gutter[0]) / 2}px`
        : `-${rowStyles['parseSizeNumber'](gutter) / 2}px`,
      marginRight: Array.isArray(gutter)
        ? `-${rowStyles['parseSizeNumber'](gutter[0]) / 2}px`
        : `-${rowStyles['parseSizeNumber'](gutter) / 2}px`,
      marginTop: Array.isArray(gutter)
        ? `-${rowStyles['parseSizeNumber'](gutter[1]) / 2}px`
        : `-${rowStyles['parseSizeNumber'](gutter) / 2}px`,
      marginBottom: Array.isArray(gutter)
        ? `-${rowStyles['parseSizeNumber'](gutter[1]) / 2}px`
        : `-${rowStyles['parseSizeNumber'](gutter) / 2}px`,
      boxSizing: 'border-box',
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: RowProps): string => {
    const { align = 'top', justify = 'start', wrap = true, className = '' } = props;

    const baseClass = 'taro-uno-row';
    const alignClass = `${baseClass}--${align}`;
    const justifyClass = `${baseClass}--${justify}`;
    const wrapClass = wrap ? `${baseClass}--wrap` : `${baseClass}--nowrap`;

    return [baseClass, alignClass, justifyClass, wrapClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (responsive: RowProps['responsive']): React.CSSProperties => {
    if (!responsive) return {};

    const responsiveStyle: React.CSSProperties = {};

    Object.entries(responsive).forEach(([_breakpoint, props]) => {
      if (props) {
        // 这里需要配合CSS-in-JS库来处理响应式样式
        // 暂时返回空对象
      }
    });

    return responsiveStyle;
  },

  /**
   * 获取断点值
   */
  getBreakpointValue: (breakpoint: string): number => {
    const breakpoints = {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    };
    return breakpoints[breakpoint as keyof typeof breakpoints] || 0;
  },
};
