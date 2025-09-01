// 导出反馈组件
export * from './Loading';
export * from './Message';
export * from './Modal';
export * from './Toast';

// 导出类型
export type { LoadingProps, LoadingRef, LoadingSize, LoadingType } from './Loading/Loading.types';

export type { MessageProps, MessageRef, MessageType, MessagePosition } from './Message/Message.types';

export type {
  ModalProps,
  ModalRef,
  ModalSize,
  ModalPosition,
  ModalButtonType,
  ModalButton,
  ModalConfirmConfig,
} from './Modal/Modal.types';

export type { ToastProps, ToastRef, ToastType, ToastPosition, ToastMethodConfig } from './Toast/Toast.types';

// 导出样式
export { LoadingStyles } from './Loading/Loading.styles';
export { messageStyles } from './Message/Message.styles';
export { modalStyles } from './Modal/Modal.styles';
export { toastStyles } from './Toast/Toast.styles';

// 反馈组件工具函数
export const FeedbackUtils = {
  /**
   * 显示加载提示
   */
  showLoading: (message?: string) => {
    console.log('showLoading', message);
  },

  /**
   * 隐藏加载提示
   */
  hideLoading: () => {
    console.log('hideLoading');
  },

  /**
   * 显示消息提示
   */
  showMessage: (config: any) => {
    console.log('showMessage', config);
  },

  /**
   * 显示确认对话框
   */
  showConfirm: (config: any) => {
    console.log('showConfirm', config);
  },

  /**
   * 显示Toast提示
   */
  showToast: (config: any) => {
    console.log('showToast', config);
  },
};
