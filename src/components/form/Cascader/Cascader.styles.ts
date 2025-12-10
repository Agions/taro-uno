import type { CSSProperties, ReactNode } from 'react';
import type { CascaderSize, CascaderStatus, CascaderVariant, CascaderOption } from './Cascader.types';
import { formatDisplayValue } from './utils/formatDisplayValue';

/**
 * Cascader 级联选择器样式配置
 * 提供完整的样式定义和工具函数
 */
export class CascaderStyles {
  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<CascaderSize, number> = {
    small: 32,
    medium: 40,
    large: 48,
  };

  /** 基础样式 */
  static getBaseStyle(): CSSProperties {
    return {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      minWidth: '200px',
      maxWidth: '500px',
      overflow: 'hidden',
    };
  }

  /** 获取尺寸样式 */
  static getSizeStyle(size: CascaderSize): CSSProperties {
    const height = this.SIZE_MAP[size];
    return {
      height: `${height}px`,
    };
  }

  /** 获取变体样式 */
  static getVariantStyle(variant: CascaderVariant): CSSProperties {
    switch (variant) {
      case 'outlined':
        return {
          border: '1px solid #d9d9d9',
        };
      case 'filled':
        return {
          border: '1px solid #d9d9d9',
          backgroundColor: '#f5f5f5',
        };
      case 'borderless':
        return {
          border: 'none',
        };
      default:
        return {};
    }
  }

  /** 获取状态样式 */
  static getStatusStyle(status: CascaderStatus): CSSProperties {
    switch (status) {
      case 'error':
        return {
          borderColor: '#ff4d4f',
        };
      case 'warning':
        return {
          borderColor: '#faad14',
        };
      case 'success':
        return {
          borderColor: '#52c41a',
        };
      default:
        return {};
    }
  }

  /** 输入框样式 */
  static getInputStyle(_size: CascaderSize, disabled?: boolean): CSSProperties {
    return {
      width: '100%',
      height: '100%',
      padding: '0 12px',
      border: 'none',
      backgroundColor: 'transparent',
      color: disabled ? '#bfbfbf' : '#000000',
      fontSize: '14px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
    };
  }

  /** 下拉框样式 */
  static getDropdownStyle(): CSSProperties {
    return {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      marginTop: '4px',
      maxHeight: '400px',
      overflow: 'hidden',
    };
  }

  /** 菜单样式 */
  static getMenuStyle(): CSSProperties {
    return {
      display: 'flex',
      minHeight: '180px',
      maxHeight: '400px',
    };
  }

  /** 菜单列样式 */
  static getMenuColumnStyle(): CSSProperties {
    return {
      flex: 1,
      minWidth: '160px',
      borderRight: '1px solid #f0f0f0',
      overflowY: 'auto',
      backgroundColor: '#ffffff',
    };
  }

  /** 菜单列最后一项样式 */
  static getMenuColumnLastStyle(): CSSProperties {
    return {
      borderRight: 'none',
    };
  }

  /** 菜单项样式 */
  static getMenuItemStyle(disabled?: boolean, selected?: boolean, _expanded?: boolean): CSSProperties {
    return {
      padding: '8px 12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: selected ? '#e6f7ff' : 'transparent',
      color: disabled ? '#bfbfbf' : selected ? '#1890ff' : '#000000',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      position: 'relative',
      userSelect: 'none',
    };
  }

  /** 菜单项悬停样式 */
  static getMenuItemHoverStyle(disabled?: boolean): CSSProperties {
    if (disabled) return {};
    return {
      backgroundColor: '#f5f5f5',
    };
  }

  /** 菜单项展开图标样式 */
  static getMenuItemExpandIconStyle(): CSSProperties {
    return {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '12px',
      color: '#bfbfbf',
      transition: 'transform 0.3s ease',
    };
  }

  /** 菜单项展开图标旋转样式 */
  static getMenuItemExpandIconRotatedStyle(): CSSProperties {
    return {
      transform: 'translateY(-50%) rotate(90deg)',
    };
  }

  /** 标签样式 */
  static getTagStyle(): CSSProperties {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      fontSize: '12px',
      margin: '2px',
      maxWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }

  /** 标签关闭按钮样式 */
  static getTagCloseStyle(): CSSProperties {
    return {
      marginLeft: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      color: '#bfbfbf',
      transition: 'color 0.3s ease',
    };
  }

  /** 标签关闭按钮悬停样式 */
  static getTagCloseHoverStyle(): CSSProperties {
    return {
      color: '#ff4d4f',
    };
  }

  /** 搜索框样式 */
  static getSearchStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      borderBottom: '1px solid #f0f0f0',
      backgroundColor: '#ffffff',
    };
  }

  /** 搜索输入框样式 */
  static getSearchInputStyle(): CSSProperties {
    return {
      width: '100%',
      padding: '6px 8px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    };
  }

  /** 搜索输入框聚焦样式 */
  static getSearchInputFocusStyle(): CSSProperties {
    return {
      borderColor: '#40a9ff',
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
    };
  }

  /** 加载中样式 */
  static getLoadingStyle(): CSSProperties {
    return {
      padding: '12px',
      textAlign: 'center',
      color: '#bfbfbf',
      fontSize: '14px',
    };
  }

  /** 加载图标样式 */
  static getLoadingIconStyle(): CSSProperties {
    return {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #1890ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px',
      verticalAlign: 'middle',
    };
  }

  /** 空状态样式 */
  static getEmptyStyle(): CSSProperties {
    return {
      padding: '24px',
      textAlign: 'center',
      color: '#bfbfbf',
      fontSize: '14px',
    };
  }

  /** 后缀图标样式 */
  static getSuffixStyle(): CSSProperties {
    return {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#bfbfbf',
      fontSize: '14px',
      pointerEvents: 'none',
      transition: 'transform 0.3s ease',
    };
  }

  /** 后缀图标展开样式 */
  static getSuffixExpandedStyle(): CSSProperties {
    return {
      transform: 'translateY(-50%) rotate(180deg)',
    };
  }

  /** 清除按钮样式 */
  static getClearStyle(): CSSProperties {
    return {
      position: 'absolute',
      right: '32px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#bfbfbf',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
    };
  }

  /** 清除按钮悬停样式 */
  static getClearHoverStyle(): CSSProperties {
    return {
      color: '#ff4d4f',
      backgroundColor: '#fff1f0',
    };
  }

  /** 多选标签容器样式 */
  static getMultipleTagsStyle(): CSSProperties {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      padding: '4px 12px',
      minHeight: '100%',
      alignItems: 'center',
    };
  }

  /** 多选输入框样式 */
  static getMultipleInputStyle(): CSSProperties {
    return {
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontSize: '14px',
      minWidth: '60px',
      padding: '0',
    };
  }

  /** 占位符样式 */
  static getPlaceholderStyle(): CSSProperties {
    return {
      color: '#bfbfbf',
      fontSize: '14px',
      pointerEvents: 'none',
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
    };
  }

  /** 禁用样式 */
  static getDisabledStyle(): CSSProperties {
    return {
      backgroundColor: '#f5f5f5',
      cursor: 'not-allowed',
      opacity: 0.7,
    };
  }

  /** 只读样式 */
  static getReadOnlyStyle(): CSSProperties {
    return {
      backgroundColor: '#f5f5f5',
      cursor: 'default',
    };
  }

  /** 路径显示样式 */
  static getPathStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      backgroundColor: '#fafafa',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '12px',
      color: '#666666',
    };
  }

  /** 路径项样式 */
  static getPathItemStyle(): CSSProperties {
    return {
      color: '#1890ff',
      cursor: 'pointer',
      textDecoration: 'none',
    };
  }

  /** 路径分隔符样式 */
  static getPathSeparatorStyle(): CSSProperties {
    return {
      margin: '0 4px',
      color: '#bfbfbf',
    };
  }

  /** 动画关键帧 */
  static getAnimations(): Record<string, any> {
    return {
      spin: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      fadeIn: {
        from: {
          opacity: 0,
          transform: 'translateY(-10px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      slideDown: {
        from: {
          opacity: 0,
          maxHeight: 0,
        },
        to: {
          opacity: 1,
          maxHeight: '400px',
        },
      },
    };
  }

  /** 格式化显示值 */
  static formatDisplayValue(
    labels: ReactNode[],
    selectedOptions: CascaderOption[],
    config: { showPath?: boolean; pathSeparator?: string } = {},
  ): ReactNode {
    return formatDisplayValue(labels, selectedOptions, config);
  }

  /** 获取完整的样式对象 */
  static getStyle(config: {
    size?: CascaderSize;
    variant?: CascaderVariant;
    status?: CascaderStatus;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    style?: CSSProperties;
  }): CSSProperties {
    const {
      size = 'medium',
      variant = 'outlined',
      status = 'default',
      disabled = false,
      readonly = false,
      loading = false,
      style = {},
    } = config;

    return {
      ...this.getBaseStyle(),
      ...this.getSizeStyle(size),
      ...this.getVariantStyle(variant),
      ...this.getStatusStyle(status),
      ...(disabled ? this.getDisabledStyle() : {}),
      ...(readonly ? this.getReadOnlyStyle() : {}),
      ...(loading ? { pointerEvents: 'none' } : {}),
      ...style,
    };
  }

  /** 获取完整的类名字符串 */
  static getClassName(config: {
    size?: CascaderSize;
    variant?: CascaderVariant;
    status?: CascaderStatus;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    className?: string;
  }): string {
    const {
      size = 'medium',
      variant = 'outlined',
      status = 'default',
      disabled = false,
      readonly = false,
      loading = false,
      className = '',
    } = config;

    const classes = [
      'taro-uno-cascader',
      `taro-uno-cascader--${size}`,
      `taro-uno-cascader--${variant}`,
      `taro-uno-cascader--${status}`,
    ];

    if (disabled) classes.push('taro-uno-cascader--disabled');
    if (readonly) classes.push('taro-uno-cascader--readonly');
    if (loading) classes.push('taro-uno-cascader--loading');

    if (className) classes.push(className);

    return classes.join(' ');
  }
}

/** 导出样式对象 */
export const cascaderStyles = CascaderStyles;
