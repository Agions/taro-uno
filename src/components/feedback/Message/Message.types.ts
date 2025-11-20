import React from 'react';

/** 消息类型 */
export type MessageType = 'success' | 'error' | 'warning' | 'info';

/** 消息位置 */
export type MessagePosition = 'top' | 'bottom' | 'center' | 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface MessageProps {
  /** 消息类型 */
  type?: MessageType;
  /** 消息标题 */
  title?: React.ReactNode;
  /** 消息内容 */
  content?: React.ReactNode;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 显示时长（毫秒） */
  duration?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 关闭回调 */
  onClose?: () => void;
}

export interface MessageRef {
  /** 显示消息 */
  show: () => void;
  /** 隐藏消息 */
  hide: () => void;
  /** 更新消息内容 */
  update: (_props: Partial<MessageProps>) => void;
}
