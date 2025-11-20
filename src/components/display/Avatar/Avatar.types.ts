import type { CSSProperties } from 'react';

export interface AvatarProps {
  /** 头像图片地址 */
  src?: string;
  /** 图片无法显示时的替代文本 */
  alt?: string;
  /** 头像大小 */
  size?: 'small' | 'medium' | 'large' | number;
  /** 头像形状 */
  shape?: 'circle' | 'square';
  /** 头像图标 */
  icon?: React.ReactNode;
  /** 子节点（通常用于文字头像） */
  children?: React.ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: (_event: any) => void;
}

export interface AvatarRef {
  /** DOM 元素 */
  element: any;
  /** 获取头像尺寸 */
  getSize: () => number;
  /** 获取头像形状 */
  getShape: () => 'circle' | 'square';
  /** 检查是否有图片 */
  hasImage: () => boolean;
  /** 检查是否有图标 */
  hasIcon: () => boolean;
  /** 检查是否有文字 */
  hasText: () => boolean;
}

export type AvatarSize = 'small' | 'medium' | 'large' | number;
export type AvatarShape = 'circle' | 'square';