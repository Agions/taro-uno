import { ReactNode } from 'react';
import { View } from '@tarojs/components';
import { BaseComponentProps, Size } from '../../../types';

/** Toast类型 */
export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading';

/** Toast位置 */
export type ToastPosition = 'top' | 'center' | 'bottom';

/** Toast引用 */
export interface ToastRef {
  /** 获取元素引用 */
  element: View | null;
  /** 显示Toast */
  show: () => void;
  /** 隐藏Toast */
  hide: () => void;
  /** 获取显示状态 */
  isVisible: () => boolean;
  /** 设置消息 */
  setMessage: (message: ReactNode) => void;
  /** 设置类型 */
  setType: (type: ToastType) => void;
  /** 设置位置 */
  setPosition: (position: ToastPosition) => void;
  /** 设置持续时间 */
  setDuration: (duration: number) => void;
}

/** Toast组件属性 */
export interface ToastProps extends BaseComponentProps {
  /** 是否显示 */
  visible?: boolean;
  /** 默认是否显示 */
  defaultVisible?: boolean;
  /** 消息内容 */
  message?: ReactNode;
  /** Toast类型 */
  type?: ToastType;
  /** 位置 */
  position?: ToastPosition;
  /** 持续时间（毫秒） */
  duration?: number;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 动画效果 */
  animated?: boolean;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 是否可关闭 */
  closeable?: boolean;
  /** 显示事件 */
  onShow?: () => void;
  /** 隐藏事件 */
  onHide?: () => void;
  /** 关闭事件 */
  onClose?: () => void;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
}

/** Toast方法配置 */
export interface ToastMethodConfig {
  /** 消息内容 */
  message: ReactNode;
  /** Toast类型 */
  type?: ToastType;
  /** 位置 */
  position?: ToastPosition;
  /** 持续时间（毫秒） */
  duration?: number;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 关闭事件 */
  onClose?: () => void;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
}
