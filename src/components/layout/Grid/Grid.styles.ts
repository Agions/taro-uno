import { Platform } from '@tarojs/taro';
import type { GridProps, GridAlign, GridJustify, GridGap, GridCols } from './Grid.types';

/** Grid组件样式管理器 */
export const gridStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 8,
    medium: 16,
    large: 24,
    default: 16,
  } as const,

  /** 对齐方式映射表 */
  ALIGN_MAP: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  } as const,

  /** 对齐方式映射表 */
  JUSTIFY_MAP: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  } as const,

  /**
   * 解析尺寸值
   */
  parseSize: (size: Size | number | `${number}${CSSUnit}`): number | string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }

    if (typeof size === 'string') {
      if (size in gridStyles.SIZE_MAP) {
        return `${gridStyles.SIZE_MAP[size as keyof typeof gridStyles.SIZE_MAP]}px`;
      }
      return size;
    }

    return `${gridStyles.SIZE_MAP.default}px`;
  },

  /**
   * 解析间距值
   */
  parseGap: (gap: GridGap): string => {
    if (Array.isArray(gap)) {
      const [rowGap, columnGap] = gap;
      return `${gridStyles.parseSize(rowGap)} ${gridStyles.parseSize(columnGap)}`;
    }
    return gridStyles.parseSize(gap);
  },

  /**
   * 解析列数
   */
  parseCols: (cols: GridCols): string => {
    if (typeof cols === 'number') {
      return `repeat(${cols}, 1fr)`;
    }
    return `repeat(${parseInt(cols)}, 1fr)`;
  },

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: GridProps): React.CSSProperties => {
    const {
      cols = 1,
      rows,
      gap = 'default',
      rowGap,
      columnGap,
      align = 'stretch',
      justify = 'start',
      style = {},
    } = props;

    // 计算网格模板列
    const gridTemplateColumns = gridStyles.parseCols(cols);

    // 计算网格模板行
    const gridTemplateRows = rows ? `repeat(${rows}, 1fr)` : undefined;

    // 计算间距
    const gapValue =
      rowGap || columnGap
        ? `${rowGap ? gridStyles.parseSize(rowGap) : gridStyles.parseSize(gap)} ${
            columnGap ? gridStyles.parseSize(columnGap) : gridStyles.parseSize(gap)
          }`
        : gridStyles.parseGap(gap);

    // 计算对齐方式
    const alignItems = gridStyles.ALIGN_MAP[align];
    const justifyContent = gridStyles.JUSTIFY_MAP[justify];

    return {
      display: 'grid',
      gridTemplateColumns,
      gridTemplateRows,
      gap: gapValue,
      alignItems,
      justifyContent,
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: GridProps): string => {
    const { cols = 1, align = 'stretch', justify = 'start', gap = 'default', className = '' } = props;

    const baseClass = 'taro-uno-grid';
    const colsClass = `${baseClass}--cols-${cols}`;
    const alignClass = `${baseClass}--${align}`;
    const justifyClass = `${baseClass}--${justify}`;
    const gapClass = `${baseClass}--gap-${gap}`;

    return [baseClass, colsClass, alignClass, justifyClass, gapClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取子元素样式
   */
  getItemStyle: (index: number, total: number, cols: GridCols): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: 'relative',
      minWidth: 0,
      minHeight: 0,
    };

    // 计算网格位置
    const colCount = typeof cols === 'number' ? cols : parseInt(cols);
    const row = Math.floor(index / colCount);
    const col = index % colCount;

    style.gridColumn = `${col + 1} / span 1`;
    style.gridRow = `${row + 1} / span 1`;

    return style;
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (responsive: GridProps['responsive']): React.CSSProperties => {
    if (!responsive) return {};

    const responsiveStyle: React.CSSProperties = {};

    Object.entries(responsive).forEach(([breakpoint, props]) => {
      if (props) {
        const mediaQuery = `@media (min-width: ${gridStyles.getBreakpointValue(breakpoint)}px)`;
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
