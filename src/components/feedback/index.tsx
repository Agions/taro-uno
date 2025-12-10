/**
 * Taro-Uno 反馈组件库
 * 提供用户交互反馈的 UI 组件，包括加载、消息、模态框、通知等
 */

// 导出 Loading 组件
export { Loading } from './Loading';
export type { LoadingProps, LoadingRef, LoadingSize, LoadingType } from './Loading/Loading.types';
export { LoadingStyles } from './Loading/Loading.styles';

// 导出 Message 组件
export { Message } from './Message';
export type { MessageProps, MessageRef, MessageType, MessagePosition } from './Message/Message.types';
export { messageStyles } from './Message/Message.styles';

// 导出 Modal 组件
export { Modal } from './Modal';
export type {
  ModalProps,
  ModalRef,
  ModalSize,
  ModalPosition,
  ModalButtonType,
  ModalButton,
  ModalConfirmConfig,
} from './Modal/Modal.types';
export { modalStyles } from './Modal/Modal.styles';

// 导出 Notification 组件
export { Notification } from './Notification';
export type {
  NotificationType,
  NotificationPlacement,
  NotificationAnimation,
  NotificationItem,
  NotificationProps,
  NotificationManagerProps,
  NotificationRef,
  NotificationConfig,
  NotificationUtils,
  NotificationStyles,
  NotificationPlacementStyles,
  NotificationAnimationStyles,
} from './Notification/Notification.types';
export {
  notificationStyles,
  notificationStyleHelpers,
  notificationStyleSystem,
  responsiveBreakpoints,
  generateResponsiveStyle,
  generateThemeStyle,
  calculateDynamicStyles,
} from './Notification/Notification.styles';

// 导出 Progress 组件
export { Progress } from './Progress';
export type {
  ProgressProps,
  ProgressRef,
  ProgressType,
  ProgressStatus,
  ProgressSize,
  ProgressGradient,
  ProgressSegment,
} from './Progress/Progress.types';
export {
  ProgressStyles,
  ProgressKeyframes,
  ProgressMediaQueries,
  ProgressCSSVariables,
} from './Progress/Progress.styles';

// 导出 Result 组件
export { Result } from './Result';
export type { ResultProps, ResultRef, ResultStatus, ResultSize } from './Result/Result.types';
export { resultStyles } from './Result/Result.styles';

// 导出 Tooltip 组件
export { Tooltip } from './Tooltip';
export type {
  TooltipProps,
  TooltipRef,
  TooltipTrigger,
  TooltipPlacement,
  TooltipTheme,
  TooltipAnimation,
  TooltipState,
  TooltipAnimationConfig,
  TooltipPosition,
  TooltipThemeConfig,
  TooltipEventType,
  TooltipEventHandler,
  TooltipOptions,
  TooltipInstance,
} from './Tooltip/Tooltip.types';
export { tooltipStyles } from './Tooltip/Tooltip.styles';

// 反馈组件工具函数
export const FeedbackUtils = {
  /**
   * 显示加载提示
   */
  showLoading: (_message?: string) => {
    // Show loading with message
  },

  /**
   * 隐藏加载提示
   */
  hideLoading: () => {
    // Hide loading
  },

  /**
   * 显示消息提示
   */
  showMessage: (_config: any) => {
    // Show message with config
  },

  /**
   * 显示确认对话框
   */
  showConfirm: (_config: any) => {
    // Show confirm dialog with config
  },

  /**
   * 显示Toast提示
   */
  showToast: (_config: any) => {
    // Show toast with config
  },

  /**
   * 显示通知提示
   */
  showNotification: (_config: any) => {
    // Show notification with config
  },

  /**
   * 显示成功通知
   */
  showSuccess: (_config: any) => {
    // Show success notification
  },

  /**
   * 显示信息通知
   */
  showInfo: (_config: any) => {
    // Show info notification
  },

  /**
   * 显示警告通知
   */
  showWarning: (_config: any) => {
    // Show warning notification
  },

  /**
   * 显示错误通知
   */
  showError: (_config: any) => {
    // Show error notification
  },

  /**
   * 关闭所有通知
   */
  closeAllNotifications: () => {
    // Close all notifications
  },
};
