import { Platform } from '@tarojs/taro';
import type { PaginationProps, PaginationSize, PaginationPosition, PaginationAlign } from './Pagination.types';

/** Pagination组件样式管理器 */
export const paginationStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: 24,
    medium: 32,
    large: 40,
    default: 32,
  } as const,

  /**
   * 获取基础样式
   */
  getBaseStyle: (props: PaginationProps): React.CSSProperties => {
    const { size = 'default', position = 'bottom', align = 'right', style = {} } = props;

    // 计算对齐方式
    const justifyContent = align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end';

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent,
      gap: '8px',
      padding: '16px 0',
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: (props: PaginationProps): string => {
    const {
      size = 'default',
      position = 'bottom',
      align = 'right',
      disabled = false,
      simple = false,
      className = '',
    } = props;

    const baseClass = 'taro-uno-pagination';
    const sizeClass = `${baseClass}--${size}`;
    const positionClass = `${baseClass}--${position}`;
    const alignClass = `${baseClass}--${align}`;
    const disabledClass = disabled ? `${baseClass}--disabled` : '';
    const simpleClass = simple ? `${baseClass}--simple` : '';

    return [baseClass, sizeClass, positionClass, alignClass, disabledClass, simpleClass, className]
      .filter(Boolean)
      .join(' ');
  },

  /**
   * 获取按钮样式
   */
  getButtonStyle: (props: { active?: boolean; disabled?: boolean; size: PaginationSize }): React.CSSProperties => {
    const { active = false, disabled = false, size } = props;

    const height = paginationStyles.SIZE_MAP[size as keyof typeof paginationStyles.SIZE_MAP];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: `${height}px`,
      height: `${height}px`,
      padding: '0 8px',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      backgroundColor: active ? 'var(--primary-color)' : 'var(--background-color)',
      color: active ? 'var(--primary-foreground)' : 'var(--text-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.3s ease',
      fontSize: '14px',
      boxSizing: 'border-box',
    };
  },

  /**
   * 获取页码按钮样式
   */
  getPageButtonStyle: (props: { active?: boolean; disabled?: boolean; size: PaginationSize }): React.CSSProperties => {
    const { active = false, disabled = false, size } = props;

    const height = paginationStyles.SIZE_MAP[size as keyof typeof paginationStyles.SIZE_MAP];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: `${height}px`,
      height: `${height}px`,
      padding: '0 8px',
      border: active ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
      borderRadius: '4px',
      backgroundColor: active ? 'var(--primary-color)' : 'var(--background-color)',
      color: active ? 'var(--primary-foreground)' : 'var(--text-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.3s ease',
      fontSize: '14px',
      boxSizing: 'border-box',
    };
  },

  /**
   * 获取跳转按钮样式
   */
  getJumpButtonStyle: (size: PaginationSize): React.CSSProperties => {
    const height = paginationStyles.SIZE_MAP[size as keyof typeof paginationStyles.SIZE_MAP];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: `${height}px`,
      height: `${height}px`,
      padding: '0 8px',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-color)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      boxSizing: 'border-box',
    };
  },

  /**
   * 获取总数样式
   */
  getTotalStyle: (): React.CSSProperties => {
    return {
      color: 'var(--text-color-secondary)',
      fontSize: '14px',
      marginRight: '16px',
    };
  },

  /**
   * 获取快速跳转样式
   */
  getQuickJumperStyle: (): React.CSSProperties => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginLeft: '16px',
    };
  },

  /**
   * 获取输入框样式
   */
  getInputStyle: (): React.CSSProperties => {
    return {
      width: '50px',
      height: '32px',
      padding: '0 8px',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      fontSize: '14px',
      textAlign: 'center',
      boxSizing: 'border-box',
    };
  },

  /**
   * 获取选择器样式
   */
  getSelectStyle: (): React.CSSProperties => {
    return {
      height: '32px',
      padding: '0 8px',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
    };
  },
};
