import { Platform } from '@tarojs/taro';
import type { SpaceProps, SpaceDirection, SpaceAlign, SpaceWrap, SpaceSize, SpaceGap } from './Space.types';

/** Space组件样式管理器 */
export const spaceStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 8,
    medium: 16,
    large: 24,
    default: 16,
  } as const,

  /** 方向映射表 */
  DIRECTION_MAP: {
    horizontal: 'row',
    vertical: 'column',
  } as const,

  /** 对齐方式映射表 */
  ALIGN_MAP: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  } as const,

  /** 换行方式映射表 */
  WRAP_MAP: {
    nowrap: 'nowrap',
    wrap: 'wrap',
    'wrap-reverse': 'wrap-reverse',
  } as const,

  /**
   * 解析尺寸值
   */
  parseSize: (size: SpaceSize): number | string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }

    if (typeof size === 'string') {
      if (size in spaceStyles.SIZE_MAP) {
        return `${spaceStyles.SIZE_MAP[size as keyof typeof spaceStyles.SIZE_MAP]}px`;
      }
      return size;
    }

    return `${spaceStyles.SIZE_MAP.default}px`;
  },

  /**
   * 解析间距值
   */
  parseGap: (gap: SpaceGap): string => {
    if (Array.isArray(gap)) {
      const [rowGap, columnGap] = gap;
      return `${spaceStyles.parseSize(rowGap)} ${spaceStyles.parseSize(columnGap)}`;
    }
    return spaceStyles.parseSize(gap);
  },

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: SpaceProps): React.CSSProperties => {
    const {
      direction = 'horizontal',
      align = 'center',
      wrap = 'nowrap',
      size = 'default',
      gap,
      block = false,
      compact = false,
      split = false,
      maxCount,
      style = {},
    } = props;

    // 计算间距
    const gapValue = gap ? spaceStyles.parseGap(gap) : spaceStyles.parseSize(size);

    // 计算显示方式
    const display = block ? 'flex' : 'inline-flex';

    // 计算方向
    const flexDirection = spaceStyles.DIRECTION_MAP[direction];

    // 计算对齐方式
    const alignItems = spaceStyles.ALIGN_MAP[align];

    // 计算换行方式
    const flexWrap = maxCount ? 'wrap' : spaceStyles.WRAP_MAP[wrap];

    // 计算紧凑模式
    const compactStyle = compact
      ? {
          gap: gapValue,
          '& > *': {
            margin: 0,
          },
        }
      : {};

    // 计算等分模式
    const splitStyle = split
      ? {
          flex: 1,
          minWidth: 0,
        }
      : {};

    return {
      display,
      flexDirection,
      alignItems,
      flexWrap,
      gap: gapValue,
      ...compactStyle,
      ...splitStyle,
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: SpaceProps): string => {
    const {
      direction = 'horizontal',
      align = 'center',
      wrap = 'nowrap',
      size = 'default',
      block = false,
      compact = false,
      split = false,
      className = '',
    } = props;

    const baseClass = 'taro-uno-space';
    const directionClass = `${baseClass}--${direction}`;
    const alignClass = `${baseClass}--${align}`;
    const wrapClass = `${baseClass}--${wrap}`;
    const sizeClass = `${baseClass}--${size}`;
    const blockClass = block ? `${baseClass}--block` : '';
    const compactClass = compact ? `${baseClass}--compact` : '';
    const splitClass = split ? `${baseClass}--split` : '';

    return [
      baseClass,
      directionClass,
      alignClass,
      wrapClass,
      sizeClass,
      blockClass,
      compactClass,
      splitClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  },

  /**
   * 获取分隔符样式
   */
  getSeparatorStyle: (): React.CSSProperties => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px',
      color: 'var(--text-color-secondary)',
      fontSize: '14px',
    };
  },

  /**
   * 获取子元素样式
   */
  getItemStyle: (index: number, total: number, split: boolean): React.CSSProperties => {
    const style: React.CSSProperties = {
      flexShrink: 0,
    };

    if (split && index < total - 1) {
      style.marginRight = '8px';
    }

    return style;
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (responsive: SpaceProps['responsive']): React.CSSProperties => {
    if (!responsive) return {};

    const responsiveStyle: React.CSSProperties = {};

    Object.entries(responsive).forEach(([breakpoint, props]) => {
      if (props) {
        const mediaQuery = `@media (min-width: ${spaceStyles.getBreakpointValue(breakpoint)}px)`;
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

  /**
   * 获取省略样式
   */
  getEllipsisStyle: (): React.CSSProperties => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px',
      color: 'var(--text-color-secondary)',
      fontSize: '14px',
      cursor: 'pointer',
    };
  },

  /**
   * 获取最大计数样式
   */
  getMaxCountStyle: (maxCount: number, direction: SpaceDirection): React.CSSProperties => {
    const style: React.CSSProperties = {};

    if (direction === 'horizontal') {
      style.maxWidth = `${maxCount * 100}px`;
    } else {
      style.maxHeight = `${maxCount * 40}px`;
    }

    return style;
  },
};
