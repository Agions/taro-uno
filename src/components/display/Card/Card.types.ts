import React from 'react';
import { BaseComponentProps } from '../../../types';

export interface CardProps extends BaseComponentProps {
  /** 卡片内容 */
  children: React.ReactNode;
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 卡片副标题 */
  subtitle?: React.ReactNode;
  /** 卡片操作区域 */
  extra?: React.ReactNode;
  /** 卡片封面 */
  cover?: React.ReactNode;
  /** 卡片操作按钮 */
  actions?: React.ReactNode[];
  /** 是否可点击 */
  hoverable?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 阴影级别 */
  shadow?: 'none' | 'small' | 'default' | 'large';
  /** 加载状态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onPress?: (_event: any) => void;
  /** 长按事件 */
  onLongPress?: (_event: any) => void;
}

export interface CardRef {
  /** 获取卡片元素 */
  getElement: () => HTMLElement | null;
  /** 获取卡片标题 */
  getTitle: () => string | null;
  /** 获取卡片内容 */
  getContent: () => HTMLElement | null;
}

export interface CardStyleProps {
  /** 平台类型 */
  platform: string;
  /** 阴影级别 */
  shadow: CardProps['shadow'];
  /** 是否可点击 */
  hoverable: boolean;
  /** 是否显示边框 */
  bordered: boolean;
  /** 加载状态 */
  loading: boolean;
}
