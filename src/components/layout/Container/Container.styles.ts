import type { ContainerProps, ContainerSize, ContainerAlign } from './Container.types';

/** Container组件样式管理器 */
export const containerStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 320,
    medium: 768,
    large: 1024,
    default: 1200,
    full: '100%',
    fluid: '100%',
  } as const,

  /** 对齐方式映射表 */
  ALIGN_MAP: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  } as const,

  /**
   * 解析尺寸值
   */
  parseSize: (size: Size | number | `${number}${CSSUnit}`): number | string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }

    if (typeof size === 'string') {
      if (size in containerStyles.SIZE_MAP) {
        return containerStyles.SIZE_MAP[size as keyof typeof containerStyles.SIZE_MAP];
      }
      return size;
    }

    return `${containerStyles.SIZE_MAP.default}px`;
  },

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: ContainerProps): React.CSSProperties => {
    const {
      size = 'default',
      maxWidth,
      padding = 'medium',
      margin = 'medium',
      align = 'stretch',
      center = false,
      scrollable = false,
      scrollDirection = 'vertical',
      style = {},
    } = props;

    // 计算宽度
    const width = size === 'fluid' ? '100%' : containerStyles.parseSize(size);

    // 计算最大宽度
    const finalMaxWidth =
      maxWidth !== undefined
        ? containerStyles.parseSize(maxWidth)
        : size === 'fluid'
        ? 'none'
        : containerStyles.SIZE_MAP[size as keyof typeof containerStyles.SIZE_MAP];

    // 计算内边距
    const paddingValue =
      typeof padding === 'number'
        ? `${padding}px`
        : typeof padding === 'string' && padding in containerStyles.SIZE_MAP
        ? `${containerStyles.SIZE_MAP[padding as keyof typeof containerStyles.SIZE_MAP]}px`
        : containerStyles.parseSize(padding);

    // 计算外边距
    const marginValue =
      typeof margin === 'number'
        ? `${margin}px`
        : typeof margin === 'string' && margin in containerStyles.SIZE_MAP
        ? `${containerStyles.SIZE_MAP[margin as keyof typeof containerStyles.SIZE_MAP]}px`
        : containerStyles.parseSize(margin);

    // 计算对齐方式
    const justifyContent = center ? 'center' : containerStyles.ALIGN_MAP[align];

    // 计算滚动样式
    const overflow = scrollable
      ? {
          overflowX: scrollDirection === 'horizontal' || scrollDirection === 'both' ? 'auto' : 'hidden',
          overflowY: scrollDirection === 'vertical' || scrollDirection === 'both' ? 'auto' : 'hidden',
        }
      : {
          overflow: 'visible',
        };

    return {
      width,
      maxWidth: finalMaxWidth,
      padding: paddingValue,
      margin: center ? '0 auto' : marginValue,
      display: 'flex',
      flexDirection: 'column',
      justifyContent,
      alignItems: center,
      boxSizing: 'border-box',
      ...overflow,
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: ContainerProps): string => {
    const { size = 'default', align = 'stretch', center = false, scrollable = false, className = '' } = props;

    const baseClass = 'taro-uno-container';
    const sizeClass = `${baseClass}--${size}`;
    const alignClass = `${baseClass}--${align}`;
    const centerClass = center ? `${baseClass}--center` : '';
    const scrollableClass = scrollable ? `${baseClass}--scrollable` : '';

    return [baseClass, sizeClass, alignClass, centerClass, scrollableClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (responsive: ContainerProps['responsive']): React.CSSProperties => {
    if (!responsive) return {};

    const responsiveStyle: React.CSSProperties = {};

    Object.entries(responsive).forEach(([breakpoint, props]) => {
      if (props) {
        const mediaQuery = `@media (min-width: ${containerStyles.getBreakpointValue(breakpoint)}px)`;
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
