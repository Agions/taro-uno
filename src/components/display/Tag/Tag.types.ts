import type { CSSProperties, ReactNode } from 'react';

export interface TagProps {
  /** 标签内容 */
  children?: ReactNode;
  /** 标签颜色 */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  /** 标签大小 */
  size?: 'small' | 'medium' | 'large';
  /** 标签变体 */
  variant?: 'solid' | 'outline' | 'light';
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否可选择 */
  checkable?: boolean;
  /** 是否选中（可选择模式下） */
  checked?: boolean;
  /** 标签图标 */
  icon?: ReactNode;
  /** 点击事件 */
  onClick?: (event: any) => void;
  /** 关闭事件 */
  onClose?: (event: any) => void;
  /** 选择变化事件 */
  onCheckedChange?: (checked: boolean) => void;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface TagRef {
  /** DOM 元素 */
  element: any;
  /** 获取标签颜色 */
  getColor: () => string;
  /** 获取标签大小 */
  getSize: () => 'small' | 'medium' | 'large';
  /** 检查是否可关闭 */
  isClosable: () => boolean;
  /** 检查是否可选择 */
  isCheckable: () => boolean;
  /** 检查是否选中 */
  isChecked: () => boolean;
  /** 设置选中状态 */
  setChecked: (checked: boolean) => void;
  /** 关闭标签 */
  close: () => void;
}