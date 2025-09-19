import type { CSSProperties, ReactNode } from 'react';
import type { AccessibilityProps } from '../../../types/accessibility.d';

export interface ButtonProps extends AccessibilityProps {
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 按钮变体 */
  variant?: 'solid' | 'outline' | 'ghost' | 'text';
  /** 按钮形状 */
  shape?: 'default' | 'round' | 'circle';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 子节点 */
  children?: ReactNode;
  /** 图标 */
  icon?: ReactNode;
  /** 点击事件 */
  onClick?: (event: any) => void;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface ButtonRef {
  /** DOM 元素 */
  element: any;
  /** 获取按钮状态 */
  getStatus: () => 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** 获取按钮尺寸 */
  getSize: () => 'small' | 'medium' | 'large';
  /** 检查是否禁用 */
  isDisabled: () => boolean;
  /** 检查是否加载中 */
  isLoading: () => boolean;
  /** 禁用按钮 */
  disable: () => void;
  /** 启用按钮 */
  enable: () => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
}