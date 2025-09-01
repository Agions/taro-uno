import type { TableProps, TableSize } from './Table.types';

/** 表格样式类 */
export class TableStyles {
  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<TableSize, any> = {
    small: {
      fontSize: 12,
      padding: 8,
      headerHeight: 32,
      rowHeight: 32,
      borderRadius: 4,
    },
    medium: {
      fontSize: 14,
      padding: 12,
      headerHeight: 40,
      rowHeight: 40,
      borderRadius: 6,
    },
    large: {
      fontSize: 16,
      padding: 16,
      headerHeight: 48,
      rowHeight: 48,
      borderRadius: 8,
    },
  };

  /** 颜色映射 */
  static readonly COLOR_MAP = {
    background: '#ffffff',
    headerBackground: '#fafafa',
    borderColor: '#e5e7eb',
    hoverBackground: '#f3f4f6',
    selectedBackground: '#e0e7ff',
    stripedBackground: '#f9fafb',
    textColor: '#374151',
    headerTextColor: '#6b7280',
    borderColorLight: '#f3f4f6',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  };

  /** 生成表格样式 */
  static getStyle(props: {
    size?: TableSize;
    bordered?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    scroll?: { x?: number | string; y?: number | string };
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'medium', bordered = false, striped = false, hoverable = true, scroll, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      width: '100%',
      backgroundColor: this.COLOR_MAP.background,
      borderRadius: sizeStyles.borderRadius,
      border: bordered ? `1px solid ${this.COLOR_MAP.borderColor}` : 'none',
      boxShadow: this.COLOR_MAP.shadow,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    };
  }

  /** 生成表格类名 */
  static getClassName(props: {
    size?: TableSize;
    bordered?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    loading?: boolean;
    className?: string;
  }): string {
    const {
      size = 'medium',
      bordered = false,
      striped = false,
      hoverable = true,
      loading = false,
      className = '',
    } = props;

    const baseClass = 'taro-uno-table';
    const sizeClass = `taro-uno-table--${size}`;
    const borderedClass = bordered ? 'taro-uno-table--bordered' : '';
    const stripedClass = striped ? 'taro-uno-table--striped' : '';
    const hoverableClass = hoverable ? 'taro-uno-table--hoverable' : '';
    const loadingClass = loading ? 'taro-uno-table--loading' : '';

    return [baseClass, sizeClass, borderedClass, stripedClass, hoverableClass, loadingClass, className]
      .filter(Boolean)
      .join(' ');
  }

  /** 生成表格头部样式 */
  static getHeaderStyle(props: { size?: TableSize }): React.CSSProperties {
    const { size = 'medium' } = props;
    const sizeStyles = this.SIZE_MAP[size];

    return {
      backgroundColor: this.COLOR_MAP.headerBackground,
      borderBottom: `1px solid ${this.COLOR_MAP.borderColor}`,
      minHeight: sizeStyles.headerHeight,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    };
  }

  /** 生成表格行样式 */
  static getRowStyle(props: {
    size?: TableSize;
    selected?: boolean;
    striped?: boolean;
    index?: number;
  }): React.CSSProperties {
    const { size = 'medium', selected = false, striped = false, index = 0 } = props;
    const sizeStyles = this.SIZE_MAP[size];

    return {
      minHeight: sizeStyles.rowHeight,
      borderBottom: `1px solid ${this.COLOR_MAP.borderColor}`,
      backgroundColor: selected
        ? this.COLOR_MAP.selectedBackground
        : striped && index % 2 === 1
        ? this.COLOR_MAP.stripedBackground
        : 'transparent',
      transition: 'background-color 0.2s ease',
    };
  }

  /** 生成表格单元格样式 */
  static getCellStyle(props: {
    size?: TableSize;
    align?: 'left' | 'center' | 'right';
    width?: number | string;
    isHeader?: boolean;
  }): React.CSSProperties {
    const { size = 'medium', align = 'left', width, isHeader = false } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      padding: `${sizeStyles.padding}px`,
      textAlign: align,
      width: width || 'auto',
      minWidth: 80,
      fontSize: sizeStyles.fontSize,
      color: isHeader ? this.COLOR_MAP.headerTextColor : this.COLOR_MAP.textColor,
      fontWeight: isHeader ? 600 : 400,
      borderRight: isHeader ? `1px solid ${this.COLOR_MAP.borderColor}` : 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  }

  /** 生成表格展开行样式 */
  static getExpandedRowStyle(): React.CSSProperties {
    return {
      backgroundColor: this.COLOR_MAP.stripedBackground,
      borderBottom: `1px solid ${this.COLOR_MAP.borderColor}`,
    };
  }

  /** 生成表格分页样式 */
  static getPaginationStyle(): React.CSSProperties {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderTop: `1px solid ${this.COLOR_MAP.borderColor}`,
      backgroundColor: this.COLOR_MAP.background,
    };
  }

  /** 生成表格空状态样式 */
  static getEmptyStyle(): React.CSSProperties {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '48px 16px',
      color: this.COLOR_MAP.headerTextColor,
      fontSize: 14,
      textAlign: 'center' as const,
    };
  }

  /** 生成表格加载状态样式 */
  static getLoadingStyle(): React.CSSProperties {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    };
  }

  /** 生成表格排序器样式 */
  static getSorterStyle(props: { active?: boolean; order?: 'ascend' | 'descend' }): React.CSSProperties {
    const { active = false, order } = props;

    return {
      display: 'inline-flex',
      flexDirection: 'column',
      marginLeft: 8,
      cursor: 'pointer',
      opacity: active ? 1 : 0.45,
      transition: 'opacity 0.2s ease',
    };
  }

  /** 生成表格选择列样式 */
  static getSelectionCellStyle(): React.CSSProperties {
    return {
      width: 48,
      textAlign: 'center' as const,
      padding: 0,
    };
  }

  /** 生成表格展开列样式 */
  static getExpandCellStyle(): React.CSSProperties {
    return {
      width: 48,
      textAlign: 'center' as const,
      padding: 0,
    };
  }

  /** 生成表格滚动容器样式 */
  static getScrollStyle(props: {
    scrollX?: boolean;
    scrollY?: boolean;
    maxHeight?: number | string;
    maxWidth?: number | string;
  }): React.CSSProperties {
    const { scrollX = false, scrollY = false, maxHeight, maxWidth } = props;

    return {
      overflowX: scrollX ? 'auto' : 'hidden',
      overflowY: scrollY ? 'auto' : 'hidden',
      maxHeight: maxHeight,
      maxWidth: maxWidth,
    };
  }
}

/** 导出表格样式 */
export const tableStyles = new TableStyles();
