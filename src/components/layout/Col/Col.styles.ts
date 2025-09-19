import type { ColProps } from './Col.types';
import type { RowGutter } from '../Row/Row.types';
import type { Size, CSSUnit } from '../../../types';

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
  parseSize: (size: any): number | string => {
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
   * 提取数值部分（用于计算）
   */
  extractNumericValue: (value: string | number): number => {
    if (typeof value === 'number') {
      return value;
    }
    // 提取数字部分，支持各种CSS单位
    const match = value.match(/^(-?\d*\.?\d+)/);
    return match && match[1] ? parseFloat(match[1]) : 0;
  },

  /**
   * 分割数值和单位
   */
  splitValueAndUnit: (value: string | number): { value: number; unit: string } => {
    if (typeof value === 'number') {
      return { value, unit: 'px' };
    }
    const match = value.match(/^(-?\d*\.?\d+)(.*)$/);
    if (match && match[1]) {
      return { value: parseFloat(match[1]), unit: match[2] || 'px' };
    }
    return { value: 0, unit: 'px' };
  },

  /**
   * 解析尺寸值并除以2（用于间距计算）
   */
  parseSizeHalf: (size: Size | number | `${number}${CSSUnit}`): string => {
    const parsedSize = colStyles['parseSize'](size);
    if (typeof parsedSize === 'number') {
      return `${parsedSize / 2}px`;
    }

    const { value, unit } = colStyles['splitValueAndUnit'](parsedSize);
    return `${value / 2}${unit}`;
  },

  /**
   * 解析间距值
   */
  parseGutter: (gutter: RowGutter): string => {
    if (Array.isArray(gutter)) {
      const [rowGutter, colGutter] = gutter;
      return `${colStyles['parseSize'](rowGutter)} ${colStyles['parseSize'](colGutter)}`;
    }
    return colStyles['parseSize'](gutter) as string;
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
          ? colStyles['parseSizeHalf'](gutter[0])
          : colStyles['parseSizeHalf'](gutter),
        paddingRight: Array.isArray(gutter)
          ? colStyles['parseSizeHalf'](gutter[0])
          : colStyles['parseSizeHalf'](gutter),
        paddingTop: Array.isArray(gutter)
          ? colStyles['parseSizeHalf'](gutter[1])
          : colStyles['parseSizeHalf'](gutter),
        paddingBottom: Array.isArray(gutter)
          ? colStyles['parseSizeHalf'](gutter[1])
          : colStyles['parseSizeHalf'](gutter),
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
    const offsetClass = (typeof offset === 'number' ? offset : parseInt(offset)) > 0 ? `${baseClass}--offset-${offset}` : '';
    const flexClass = flex !== undefined ? `${baseClass}--flex-${flex}` : '';

    return [baseClass, spanClass, offsetClass, flexClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (responsive: ColProps['responsive']): React.CSSProperties => {
    if (!responsive) return {};

    const responsiveStyle: React.CSSProperties = {};

    Object.entries(responsive).forEach(([_breakpoint, props]) => {
      if (props) {
        // 这里需要配合CSS-in-JS库来处理响应式样式
        // 暂时返回空对象
        // Breakpoint: breakpoint, value: colStyles['getBreakpointValue'](breakpoint)

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
