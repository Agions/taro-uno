import React from 'react';
import { ITouchEvent } from '@tarojs/components';

/** 通知类型 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/** 通知位置 */
export type NotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'top' | 'bottom';

/** 通知动画类型 */
export type NotificationAnimation = 'fade' | 'slide' | 'scale' | 'bounce' | 'none';

/** 通知项接口 */
export interface NotificationItem {
  /** 通知唯一标识 */
  key: string;
  /** 通知类型 */
  type?: NotificationType;
  /** 通知标题 */
  title?: React.ReactNode;
  /** 通知内容 */
  content?: React.ReactNode;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 显示时长（毫秒） */
  duration?: number;
  /** 通知位置 */
  placement?: NotificationPlacement;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 关闭回调 */
  onClose?: (_key: string) => void;
  /** 点击回调 */
  onClick?: () => void;
  /** 显示关闭按钮 */
  showClose?: boolean;
  /** 显示图标 */
  showIcon?: boolean;
  /** 动画类型 */
  animation?: NotificationAnimation;
  /** 创建时间 */
  createdAt: number;
}

/** 通知组件属性 */
export interface NotificationProps {
  /** 通知类型 */
  type?: NotificationType;
  /** 通知标题 */
  title?: React.ReactNode;
  /** 通知内容 */
  content?: React.ReactNode;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 显示时长（毫秒） */
  duration?: number;
  /** 通知位置 */
  placement?: NotificationPlacement;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 关闭回调 */
  onClose?: () => void;
  /** 点击回调 */
  onClick?: (event?: ITouchEvent) => void;
  /** 显示关闭按钮 */
  showClose?: boolean;
  /** 显示图标 */
  showIcon?: boolean;
  /** 动画类型 */
  animation?: NotificationAnimation;
  /** 是否自动关闭 */
  autoClose?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 拖拽阈值 */
  dragThreshold?: number;
  /** 堆叠索引 */
  stackIndex?: number;
  /** 悬停状态 */
  hovered?: boolean;
  /** 是否正在关闭 */
  isClosing?: boolean;
}

/** 通知组件引用 */
export interface NotificationRef {
  /** 显示通知 */
  show: () => boolean;
  /** 隐藏通知 */
  hide: () => boolean;
  /** 更新通知内容 */
  update: (_props: Partial<NotificationProps>) => boolean;
  /** 暂停自动关闭 */
  pauseProgress?: () => void;
  /** 恢复自动关闭 */
  resumeProgress?: () => void;
  /** 获取通知状态 */
  getState: () => {
    visible: boolean;
    paused: boolean;
    closing: boolean;
  };
}

/** 通知管理器属性 */
export interface NotificationManagerProps {
  /** 最大通知数量 */
  maxCount?: number;
  /** 默认位置 */
  defaultPlacement?: NotificationPlacement;
  /** 默认时长 */
  defaultDuration?: number;
  /** 默认动画 */
  defaultAnimation?: NotificationAnimation;
  /** 是否堆叠 */
  stack?: boolean;
  /** 堆叠最大数量 */
  stackMaxCount?: number;
  /** 允许拖拽 */
  allowDrag?: boolean;
  /** 拖拽阈值 */
  dragThreshold?: number;
  /** 显示分组 */
  showGroup?: boolean;
  /** 分组间隔 */
  groupInterval?: number;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 容器样式 */
  containerStyle?: React.CSSProperties;
  /** 容器类名 */
  containerClassName?: string;
  /** 进入回调 */
  onEnter?: (_key: string) => void;
  /** 离开回调 */
  onLeave?: (_key: string) => void;
  /** 全部关闭回调 */
  onAllClose?: () => void;
  /** 通知配置更新回调 */
  onUpdate?: (_key: string, config: Partial<NotificationItem>) => void;
}

/** 通知管理器引用 */
export interface NotificationManagerRef {
  /** 显示通知 */
  open: (_config: Omit<NotificationItem, 'key' | 'createdAt'>) => string;
  /** 显示成功通知 */
  success: (_config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => string;
  /** 显示信息通知 */
  info: (_config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => string;
  /** 显示警告通知 */
  warning: (_config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => string;
  /** 显示错误通知 */
  error: (_config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => string;
  /** 关闭指定通知 */
  close: (_key: string) => void;
  /** 关闭所有通知 */
  destroyAll: () => void;
  /** 更新通知 */
  update: (_key: string, config: Partial<NotificationItem>) => void;
  /** 获取所有通知 */
  getNotifications: () => NotificationItem[];
  /** 获取通知数量 */
  getCount: () => number;
  /** 设置最大数量 */
  setMaxCount: (_count: number) => void;
  /** 设置默认位置 */
  setDefaultPlacement: (_placement: NotificationPlacement) => void;
  /** 设置默认时长 */
  setDefaultDuration: (_duration: number) => void;
  /** 暂停所有通知自动关闭 */
  pauseAll: () => void;
  /** 恢复所有通知自动关闭 */
  resumeAll: () => void;
  /** 清空历史记录 */
  clearHistory: () => void;
  /** 获取通知历史 */
  getHistory: () => NotificationItem[];
}

/** 通知样式配置 */
export interface NotificationStyleConfig {
  /** 基础样式 */
  base: React.CSSProperties;
  /** 类型样式 */
  type: Record<NotificationType, React.CSSProperties>;
  /** 位置样式 */
  placement: Record<NotificationPlacement, React.CSSProperties>;
  /** 图标样式 */
  icon: React.CSSProperties;
  /** 内容样式 */
  content: React.CSSProperties;
  /** 标题样式 */
  title: React.CSSProperties;
  /** 文本样式 */
  text: React.CSSProperties;
  /** 关闭按钮样式 */
  close: React.CSSProperties;
  /** 悬停样式 */
  closeHover: React.CSSProperties;
  /** 关闭图标样式 */
  closeIcon: React.CSSProperties;
  /** 动画样式 */
  animation: {
    enter: React.CSSProperties;
    enterActive: React.CSSProperties;
    exit: React.CSSProperties;
    exitActive: React.CSSProperties;
  };
}

/** 通知配置 */
export type NotificationConfig = Partial<NotificationItem>;

/** 通知样式集合 */
export type NotificationStyles = {
  [key in NotificationType]: React.CSSProperties;
};

/** 通知位置样式 */
export type NotificationPlacementStyles = {
  [key in NotificationPlacement]: React.CSSProperties;
};

/** 通知动画样式 */
export type NotificationAnimationStyles = {
  enter: React.CSSProperties;
  enterActive: React.CSSProperties;
  exit: React.CSSProperties;
  exitActive: React.CSSProperties;
};

/** 通知工具函数 */
export interface NotificationUtilsType {
  /** 生成唯一键 */
  generateKey: () => string;
  /** 排序通知 */
  sortNotifications: (_notifications: NotificationItem[]) => NotificationItem[];
  /** 计算堆叠偏移 */
  calculateStackOffset: (_index: number, baseOffset: number) => number;
  /** 格式化持续时间 */
  formatDuration: (_duration: number) => string;
  /** 验证通知配置 */
  validateConfig: (_config: Partial<NotificationItem>) => { valid: boolean; errors: string[] };
}

/** 默认通知配置 */
export const DEFAULT_NOTIFICATION_CONFIG = {
  /** 默认最大数量 */
  defaultMaxCount: 5,
  /** 默认位置 */
  defaultPlacement: 'topRight' as NotificationPlacement,
  /** 默认时长 */
  defaultDuration: 4500,
  /** 默认动画 */
  defaultAnimation: 'fade' as NotificationAnimation,
  /** 默认堆叠 */
  defaultStack: true,
  /** 默认堆叠最大数量 */
  defaultStackMaxCount: 3,
  /** 默认允许拖拽 */
  defaultAllowDrag: false,
  /** 默认拖拽阈值 */
  defaultDragThreshold: 100,
  /** 默认显示分组 */
  defaultShowGroup: false,
  /** 默认分组间隔 */
  defaultGroupInterval: 1000,
  /** 最大历史记录数量 */
  maxHistoryCount: 50,
  /** 默认自动关闭 */
  defaultAutoClose: true,
  /** 默认显示关闭按钮 */
  defaultShowClose: true,
  /** 默认显示图标 */
  defaultShowIcon: true,
  /** 默认可关闭 */
  defaultClosable: true,
} as const;

/** 通知工具类 */
export const NotificationUtils: NotificationUtilsType = {
  /** 生成唯一键 */
  generateKey: (): string => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /** 排序通知 */
  sortNotifications: (notifications: NotificationItem[]): NotificationItem[] => {
    return [...notifications].sort((a, b) => a.createdAt - b.createdAt);
  },

  /** 计算堆叠偏移 */
  calculateStackOffset: (index: number, baseOffset: number = 8): number => {
    return index * baseOffset;
  },

  /** 格式化持续时间 */
  formatDuration: (duration: number): string => {
    if (duration < 1000) return `${duration}ms`;
    if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
    return `${(duration / 60000).toFixed(1)}min`;
  },

  /** 验证通知配置 */
  validateConfig: (config: Partial<NotificationItem>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (config.duration !== undefined && (config.duration < 0 || config.duration > 60000)) {
      errors.push('duration must be between 0 and 60000ms');
    }

    if (config.type !== undefined && !['success', 'error', 'warning', 'info'].includes(config.type)) {
      errors.push('type must be one of: success, error, warning, info');
    }

    if (
      config.placement !== undefined &&
      !['topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'top', 'bottom'].includes(config.placement)
    ) {
      errors.push('placement must be one of: topRight, topLeft, bottomRight, bottomLeft, top, bottom');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
} as const;
