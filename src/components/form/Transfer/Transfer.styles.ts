import type { CSSProperties } from 'react';
import type { TransferSize, TransferStatus, TransferLayout } from './Transfer.types';

/**
 * Transfer 穿梭框样式配置
 * 提供完整的样式定义和工具函数
 */
export class TransferStyles {
  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<string, { height: number; fontSize: number; padding: number }> = {
    small: { height: 32, fontSize: 12, padding: 6 },
    medium: { height: 40, fontSize: 14, padding: 8 },
    large: { height: 48, fontSize: 16, padding: 12 },
    default: { height: 40, fontSize: 14, padding: 8 },
  };

  /** 基础样式 */
  static getBaseStyle(): CSSProperties {
    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      minHeight: '200px',
      overflow: 'hidden',
    };
  }

  /** 获取尺寸样式 */
  static getSizeStyle(size: TransferSize): CSSProperties {
    const sizeConfig = this.SIZE_MAP[size];
    return {
      fontSize: `${sizeConfig?.fontSize || 14}px`,
    };
  }

  /** 获取状态样式 */
  static getStatusStyle(status: TransferStatus): CSSProperties {
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

  /** 获取布局样式 */
  static getLayoutStyle(layout: TransferLayout): CSSProperties {
    switch (layout) {
      case 'vertical':
        return {
          flexDirection: 'column',
          gap: '16px',
        };
      case 'horizontal':
      default:
        return {
          flexDirection: 'row',
          gap: '24px',
        };
    }
  }

  /** 获取列表样式 */
  static getListStyle(): CSSProperties {
    return {
      flex: 1,
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    };
  }

  /** 获取列表头部样式 */
  static getListHeaderStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      backgroundColor: '#fafafa',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
  }

  /** 获取列表标题样式 */
  static getListTitleStyle(): CSSProperties {
    return {
      fontSize: '14px',
      fontWeight: 500,
      color: '#333333',
    };
  }

  /** 获取列表计数样式 */
  static getListCountStyle(): CSSProperties {
    return {
      fontSize: '12px',
      color: '#666666',
    };
  }

  /** 获取搜索框样式 */
  static getSearchStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      borderBottom: '1px solid #f0f0f0',
    };
  }

  /** 获取搜索输入框样式 */
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

  /** 获取搜索输入框聚焦样式 */
  static getSearchInputFocusStyle(): CSSProperties {
    return {
      borderColor: '#40a9ff',
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
    };
  }

  /** 获取列表内容样式 */
  static getListContentStyle(): CSSProperties {
    return {
      flex: 1,
      overflowY: 'auto',
      minHeight: '120px',
    };
  }

  /** 获取列表项样式 */
  static getListItemStyle(disabled?: boolean, selected?: boolean): CSSProperties {
    return {
      padding: '8px 12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: selected ? '#e6f7ff' : 'transparent',
      color: disabled ? '#bfbfbf' : selected ? '#1890ff' : '#000000',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none',
    };
  }

  /** 获取列表项悬停样式 */
  static getListItemHoverStyle(disabled?: boolean): CSSProperties {
    if (disabled) return {};
    return {
      backgroundColor: '#f5f5f5',
    };
  }

  /** 获取列表项复选框样式 */
  static getListItemCheckboxStyle(): CSSProperties {
    return {
      width: '16px',
      height: '16px',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      flexShrink: 0,
    };
  }

  /** 获取列表项复选框选中样式 */
  static getListItemCheckboxSelectedStyle(): CSSProperties {
    return {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      color: '#ffffff',
    };
  }

  /** 获取列表项复选框禁用样式 */
  static getListItemCheckboxDisabledStyle(): CSSProperties {
    return {
      backgroundColor: '#f5f5f5',
      borderColor: '#d9d9d9',
      color: '#bfbfbf',
    };
  }

  /** 获取列表项内容样式 */
  static getListItemContentStyle(): CSSProperties {
    return {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }

  /** 获取列表项描述样式 */
  static getListItemDescriptionStyle(): CSSProperties {
    return {
      fontSize: '12px',
      color: '#666666',
      marginTop: '2px',
    };
  }

  /** 获取空状态样式 */
  static getEmptyStyle(): CSSProperties {
    return {
      padding: '24px',
      textAlign: 'center',
      color: '#bfbfbf',
      fontSize: '14px',
    };
  }

  /** 获取操作区域样式 */
  static getOperationStyle(): CSSProperties {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    };
  }

  /** 获取操作按钮样式 */
  static getOperationButtonStyle(disabled?: boolean): CSSProperties {
    return {
      padding: '6px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
      color: disabled ? '#bfbfbf' : '#000000',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      minWidth: '80px',
      textAlign: 'center',
    };
  }

  /** 获取操作按钮悬停样式 */
  static getOperationButtonHoverStyle(disabled?: boolean): CSSProperties {
    if (disabled) return {};
    return {
      backgroundColor: '#f5f5f5',
      borderColor: '#40a9ff',
      color: '#40a9ff',
    };
  }

  /** 获取全选框样式 */
  static getSelectAllStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    };
  }

  /** 获取全选框复选框样式 */
  static getSelectAllCheckboxStyle(): CSSProperties {
    return {
      width: '16px',
      height: '16px',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      flexShrink: 0,
    };
  }

  /** 获取全选框复选框选中样式 */
  static getSelectAllCheckboxSelectedStyle(): CSSProperties {
    return {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      color: '#ffffff',
    };
  }

  /** 获取全选框标签样式 */
  static getSelectAllLabelStyle(): CSSProperties {
    return {
      fontSize: '14px',
      color: '#333333',
      userSelect: 'none',
    };
  }

  /** 获取分页样式 */
  static getPaginationStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      borderTop: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    };
  }

  /** 获取分页按钮样式 */
  static getPaginationButtonStyle(disabled?: boolean): CSSProperties {
    return {
      padding: '4px 8px',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      backgroundColor: '#ffffff',
      color: disabled ? '#bfbfbf' : '#000000',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '12px',
      transition: 'all 0.3s ease',
    };
  }

  /** 获取分页按钮悬停样式 */
  static getPaginationButtonHoverStyle(disabled?: boolean): CSSProperties {
    if (disabled) return {};
    return {
      backgroundColor: '#f5f5f5',
      borderColor: '#40a9ff',
      color: '#40a9ff',
    };
  }

  /** 获取分页信息样式 */
  static getPaginationInfoStyle(): CSSProperties {
    return {
      fontSize: '12px',
      color: '#666666',
      margin: '0 8px',
    };
  }

  /** 获取分页选择器样式 */
  static getPaginationSelectStyle(): CSSProperties {
    return {
      padding: '2px 4px',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      fontSize: '12px',
      outline: 'none',
    };
  }

  /** 获取底部样式 */
  static getFooterStyle(): CSSProperties {
    return {
      padding: '8px 12px',
      borderTop: '1px solid #f0f0f0',
      backgroundColor: '#fafafa',
    };
  }

  /** 获取禁用样式 */
  static getDisabledStyle(): CSSProperties {
    return {
      opacity: 0.6,
      pointerEvents: 'none',
    };
  }

  /** 获取加载中样式 */
  static getLoadingStyle(): CSSProperties {
    return {
      position: 'relative',
      pointerEvents: 'none',
    };
  }

  /** 获取加载图标样式 */
  static getLoadingIconStyle(): CSSProperties {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '16px',
      height: '16px',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #1890ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    };
  }

  /** 动画关键帧 */
  static getAnimations(): Record<string, CSSProperties> {
    return {
      spin: {
        // CSS动画关键帧需要在CSS文件中定义
        animationName: 'spin',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      },
      fadeIn: {
        animationName: 'fadeIn',
        animationDuration: '0.3s',
        animationTimingFunction: 'ease-in-out',
      },
      slideIn: {
        animationName: 'slideIn',
        animationDuration: '0.3s',
        animationTimingFunction: 'ease-out',
      },
    };
  }

  /** 获取完整的样式对象 */
  static getStyle(config: {
    size?: TransferSize;
    status?: TransferStatus;
    layout?: TransferLayout;
    disabled?: boolean;
    style?: CSSProperties;
  }): CSSProperties {
    const { size = 'medium', status = 'default', layout = 'horizontal', disabled = false, style = {} } = config;

    return {
      ...this.getBaseStyle(),
      ...this.getSizeStyle(size),
      ...this.getStatusStyle(status),
      ...this.getLayoutStyle(layout),
      ...(disabled ? this.getDisabledStyle() : {}),
      ...style,
    };
  }

  /** 获取完整的类名字符串 */
  static getClassName(config: {
    size?: TransferSize;
    status?: TransferStatus;
    layout?: TransferLayout;
    disabled?: boolean;
    className?: string;
  }): string {
    const { size = 'medium', status = 'default', layout = 'horizontal', disabled = false, className = '' } = config;

    const classes = [
      'taro-uno-transfer',
      `taro-uno-transfer--${size}`,
      `taro-uno-transfer--${status}`,
      `taro-uno-transfer--${layout}`,
    ];

    if (disabled) classes.push('taro-uno-transfer--disabled');

    if (className) classes.push(className);

    return classes.join(' ');
  }
}

/** 导出样式对象 */
export const transferStyles = TransferStyles;
