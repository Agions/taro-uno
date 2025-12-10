import type { CSSProperties, ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 按钮类型 */
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/** 按钮尺寸 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** 按钮变体 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';

/** 按钮形状 */
export type ButtonShape = 'default' | 'round' | 'circle';

/** 按钮状态 */
export type ButtonStatus = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'disabled' | 'loading';

export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 子节点 */
  children?: ReactNode;
  /** 图标 */
  icon?: ReactNode;
  /** 点击事件 */
  onClick?: (_event: ITouchEvent) => void;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 是否块级显示 */
  block?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    busy?: boolean;
    selected?: boolean;
  };
}

export interface ButtonRef {
  /** DOM 元素 */
  element: any;
  /** 获取按钮类型 */
  getType: () => ButtonType;
  /** 获取按钮尺寸 */
  getSize: () => ButtonSize;
  /** 获取按钮状态 */
  getStatus: () => ButtonStatus;
  /** 检查是否禁用 */
  isDisabled: () => boolean;
  /** 检查是否加载中 */
  isLoading: () => boolean;
  /** 禁用按钮 */
  disable: () => void;
  /** 启用按钮 */
  enable: () => void;
  /** 设置加载状态 */
  setLoading: (_loading: boolean) => void;
  /** 设置按钮类型 */
  setType: (_type: ButtonType) => void;
  /** 设置按钮尺寸 */
  setSize: (_size: ButtonSize) => void;
  /** 点击按钮 */
  click: () => void;
}
