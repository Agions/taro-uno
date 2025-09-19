// import { Platform } from '@tarojs/taro';
import type { TabsProps, TabPosition, TabType, TabSize } from './Tabs.types';

/** Tabs组件样式管理器 */
export const tabsStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 32,
    medium: 40,
    large: 48,
    default: 40,
  } as const,

  /** 位置映射表 */
  POSITION_MAP: {
    top: 'column',
    right: 'row-reverse',
    bottom: 'column-reverse',
    left: 'row',
  } as const,

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: TabsProps): React.CSSProperties => {
    const { position = 'top', centered = false, style = {} } = props;

    // 计算方向
    const flexDirection = tabsStyles['POSITION_MAP'][position];

    // 计算对齐方式
    const alignItems = centered ? 'center' : 'flex-start';

    return {
      display: 'flex',
      flexDirection,
      alignItems,
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: TabsProps): string => {
    const { position = 'top', type = 'line', size = 'default', centered = false, className = '' } = props;

    const baseClass = 'taro-uno-tabs';
    const positionClass = `${baseClass}--${position}`;
    const typeClass = `${baseClass}--${type}`;
    const sizeClass = `${baseClass}--${size}`;
    const centeredClass = centered ? `${baseClass}--centered` : '';

    return [baseClass, positionClass, typeClass, sizeClass, centeredClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取Tab栏样式
   */
  getTabBarStyle: (position: TabPosition, type: TabType): React.CSSProperties => {
    const isVertical = position === 'left' || position === 'right';

    return {
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      flexShrink: 0,
      borderBottom: type === 'line' && !isVertical ? '1px solid var(--border-color)' : 'none',
      borderRight: type === 'line' && isVertical ? '1px solid var(--border-color)' : 'none',
      borderTop: type === 'line' && position === 'bottom' ? '1px solid var(--border-color)' : 'none',
      borderLeft: type === 'line' && position === 'right' ? '1px solid var(--border-color)' : 'none',
      backgroundColor: 'var(--background-card)',
      overflow: isVertical ? 'auto' : 'hidden',
    };
  },

  /**
   * 获取Tab项样式
   */
  getTabItemStyle: (props: {
    active: boolean;
    disabled: boolean;
    type: TabType;
    size: TabSize;
    position: TabPosition;
  }): React.CSSProperties => {
    const { active, disabled, type, size, position } = props;
    const isVertical = position === 'left' || position === 'right';

    const height = tabsStyles.SIZE_MAP[size as keyof typeof tabsStyles.SIZE_MAP];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px',
      height: isVertical ? 'auto' : `${height}px`,
      minWidth: isVertical ? '100px' : 'auto',
      minHeight: isVertical ? `${height}px` : 'auto',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: active ? 'var(--primary-color)' : disabled ? 'var(--text-color-disabled)' : 'var(--text-color)',
      backgroundColor: active && type === 'card' ? 'var(--background-color)' : 'transparent',
      border: type === 'card' ? '1px solid var(--border-color)' : 'none',
      borderBottom: type === 'line' && active && !isVertical ? '2px solid var(--primary-color)' : 'none',
      borderRight: type === 'line' && active && isVertical ? '2px solid var(--primary-color)' : 'none',
      transition: 'all 0.3s ease',
      opacity: disabled ? 0.5 : 1,
      position: 'relative',
      boxSizing: 'border-box',
    };
  },

  /**
   * 获取内容区域样式
   */
  getContentStyle: (_position: TabPosition, animated: boolean): React.CSSProperties => {
    // const isVertical = position === 'left' || position === 'right'; // Commented out - unused

    return {
      flex: 1,
      overflow: 'hidden',
      position: 'relative',
      transition: animated ? 'all 0.3s ease' : 'none',
    };
  },

  /**
   * 获取Tab内容样式
   */
  getTabContentStyle: (active: boolean, animated: boolean): React.CSSProperties => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: active ? 1 : 0,
      visibility: active ? 'visible' : 'hidden',
      transition: animated ? 'opacity 0.3s ease' : 'none',
      overflow: 'auto',
    };
  },

  /**
   * 获取添加按钮样式
   */
  getAddButtonStyle: (size: TabSize): React.CSSProperties => {
    const height = tabsStyles.SIZE_MAP[size as keyof typeof tabsStyles.SIZE_MAP];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${height}px`,
      height: `${height}px`,
      border: '1px dashed var(--border-color)',
      borderRadius: '4px',
      cursor: 'pointer',
      color: 'var(--text-color-secondary)',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
    };
  },

  /**
   * 获取删除按钮样式
   */
  getRemoveButtonStyle: (): React.CSSProperties => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      marginLeft: '8px',
      borderRadius: '50%',
      backgroundColor: 'var(--error-color)',
      color: 'white',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    };
  },

  /**
   * 获取徽标样式
   */
  getBadgeStyle: (): React.CSSProperties => {
    return {
      position: 'absolute',
      top: '4px',
      right: '4px',
      transform: 'translate(50%, -50%)',
      zIndex: 1,
    };
  },
};
