/**
 * Notification 通知提醒组件
 * 提供全局通知提醒功能，支持多种类型、位置、动画效果
 */

// 导出主要组件
export { Notification } from './Notification';
export { default as NotificationManager } from './NotificationManager';

// 导出类型定义
export type {
  NotificationType,
  NotificationPlacement,
  NotificationAnimation,
  NotificationItem,
  NotificationProps,
  NotificationManagerProps,
  NotificationRef,
  NotificationUtils,
} from './Notification.types';

// 导出默认配置
export { DEFAULT_NOTIFICATION_CONFIG } from './Notification.types';

// 导出样式系统
export {
  notificationStyles,
  notificationStyleHelpers,
  notificationStyleConfig,
  notificationStylesCompat,
  notificationStylesLegacy,
} from './Notification.styles';

// 导出工具函数
export { NotificationUtils } from './Notification.types';

// 创建全局通知管理器实例
import type { NotificationManagerRef } from './Notification.types';

// 全局通知管理器引用
let globalNotificationRef: NotificationManagerRef | null = null;

// 设置全局通知管理器
export const setGlobalNotificationRef = (ref: NotificationManagerRef | null) => {
  globalNotificationRef = ref;
};

// 获取全局通知管理器
export const getGlobalNotificationRef = (): NotificationManagerRef | null => {
  return globalNotificationRef;
};

// 全局通知方法
export const notification = {
  // 显示通知
  open: (config: Parameters<NotificationManagerRef['open']>[0]) => {
    return globalNotificationRef?.open(config) || '';
  },
  
  // 显示成功通知
  success: (config: Parameters<NotificationManagerRef['success']>[0]) => {
    return globalNotificationRef?.success(config) || '';
  },
  
  // 显示信息通知
  info: (config: Parameters<NotificationManagerRef['info']>[0]) => {
    return globalNotificationRef?.info(config) || '';
  },
  
  // 显示警告通知
  warning: (config: Parameters<NotificationManagerRef['warning']>[0]) => {
    return globalNotificationRef?.warning(config) || '';
  },
  
  // 显示错误通知
  error: (config: Parameters<NotificationManagerRef['error']>[0]) => {
    return globalNotificationRef?.error(config) || '';
  },
  
  // 关闭通知
  close: (key: string) => {
    globalNotificationRef?.close(key);
  },
  
  // 关闭所有通知
  destroyAll: () => {
    globalNotificationRef?.destroyAll();
  },
  
  // 更新通知
  update: (key: string, config: Parameters<NotificationManagerRef['update']>[1]) => {
    globalNotificationRef?.update(key, config);
  },
  
  // 获取所有通知
  getNotifications: () => {
    return globalNotificationRef?.getNotifications() || [];
  },
  
  // 获取通知数量
  getCount: () => {
    return globalNotificationRef?.getCount() || 0;
  },
  
  // 暂停所有通知
  pauseAll: () => {
    globalNotificationRef?.pauseAll();
  },
  
  // 恢复所有通知
  resumeAll: () => {
    globalNotificationRef?.resumeAll();
  },
  
  // 清空历史记录
  clearHistory: () => {
    globalNotificationRef?.clearHistory();
  },
  
  // 获取通知历史
  getHistory: () => {
    return globalNotificationRef?.getHistory() || [];
  },
};

// 便捷方法
export const {
  success,
  info,
  warning,
  error,
  destroyAll,
  pauseAll,
  resumeAll,
} = notification;

// 默认导出
export default Notification;

// 导出类型工具
export type {
  // 通知类型
  NotificationType as Type,
  NotificationPlacement as Placement,
  NotificationAnimation as Animation,
  
  // 通知接口
  NotificationItem as Item,
  NotificationProps as Props,
  NotificationManagerProps as ManagerProps,
  NotificationRef as Ref,
  NotificationManagerRef as ManagerRef,
} from './Notification.types';

// 导出全局通知对象
export { notification };

// 组件 displayName
if (typeof Notification !== 'undefined') {
  (Notification as any).displayName = 'Notification';
}
// NotificationManager displayName is set in NotificationManager.tsx