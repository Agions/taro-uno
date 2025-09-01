import { Platform } from '@tarojs/taro';
import type { ColProps, ColSpan, ColOffset, ColOrder } from './Col.types';
import type { RowGutter } from '../Row/Row.types';

/** Col组件样式管理器 */
export const colStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 8,
    medium: 16,
    large: 24,
    default: 16,
  } as const,

  /**
   * 解析尺寸值
   */
  parseSize: (size: Size | number | `${number}${CSSUnit}`): number | string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }

    if (typeof size === 'string') {
      if (size in colStyles.SIZE_MAP) {
        return `${colStyles.SIZE_MAP[size as keyof typeof colStyles.SIZE_MAP]}px`;
      }
      return size;
    }

    return `${colStyles.SIZE_MAP.default}px`;
  },

  /**
   * 解析间距值
   */
  parseGutter: (gutter: RowGutter): string => {
    if (Array.isArray(gutter)) {
      const [rowGutter, colGutter] = gutter;
      return `${colStyles.parseSize(rowGutter)} ${colStyles.parseSize(colGutter)}`;
    }
    return colStyles.parseSize(gutter);
  },

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: ColProps): React.CSSProperties => {
    const { span = 24, offset = 0, order = 0, gutter = 0, flex, style = {} } = props;

    // 计算跨度
    const spanValue = typeof span === 'number' ? span : parseInt(span);
    const width = `${(spanValue / 24) * 100}%`;

    // 计算偏移量
    const offsetValue = typeof offset === 'number' ? offset : parseInt(offset);
    const marginLeft = `${(offsetValue / 24) * 100}%`;

    // 计算排序
    const orderValue = typeof order === 'number' ? order : parseInt(order);

    // 计算间距
    const gutterStyle = gutter
      ? {
          paddingLeft: Array.isArray(gutter)
            ? `${colStyles.parseSize(gutter[0]) / 2}`
            : `${colStyles.parseSize(gutter) / 2}`,
          paddingRight: Array.isArray(gutter)
            ? `${colStyles.parseSize(gutter[0]) / 2}`
            : `${colStyles.parseSize(gutter) / 2}`,
          paddingTop: Array.isArray(gutter)
            ? `${colStyles.parseSize(gutter[1]) / 2}`
            : `${colStyles.parseSize(gutter) / 2}`,
          paddingBottom: Array.isArray(gutter)
            ? `${colStyles.parseSize(gutter[1]) / 2}`
            : `${colStyles.parseSize(gutter) / 2}`,
        }
      : {};

    // 计算柔性布局
    const flexStyle =
      flex !== undefined
        ? {
            flex: flex === 'auto' ? '1' : flex === 'none' ? 'none' : flex,
          }
        : {};

    return {
      width,
      marginLeft,
      order: orderValue,
      boxSizing: 'border-box',
      ...gutterStyle,
      ...flexStyle,
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: ColProps): string => {
    const { span = 24, offset = 0, flex, className = '' } = props;

    const baseClass = 'taro-uno-col';
    const spanClass = `${baseClass}--span-${span}`;
    const offsetClass = offset > 0 ? `${baseClass}--offset-${offset}` : '';
    const flexClass = flex !== undefined ? `${baseClass}--flex-${flex}` : '';

    return [baseClass, spanClass, offsetClass, flexClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (responsive: ColProps['responsive']): React.CSSProperties => {
    if (!responsive) return {};

    const responsiveStyle: React.CSSProperties = {};

    Object.entries(responsive).forEach(([breakpoint, props]) => {
      if (props) {
        const mediaQuery = `@media (min-width: ${colStyles.getBreakpointValue(breakpoint)}px)`;
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
