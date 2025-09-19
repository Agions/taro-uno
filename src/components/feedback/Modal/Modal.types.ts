import { ReactNode } from 'react';
import { BaseComponentProps, Size } from '../../../types';

/** Modal尺寸 */
export type ModalSize = Size | 'small' | 'medium' | 'large' | 'fullscreen';

/** Modal位置 */
export type ModalPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

/** Modal按钮类型 */
export type ModalButtonType = 'default' | 'primary' | 'danger' | 'text';

/** Modal按钮接口 */
export interface ModalButton {
  /** 按钮文本 */
  text: string;
  /** 按钮类型 */
  type?: ModalButtonType;
  /** 按钮键值 */
  key?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 点击事件 */
  onClick?: () => void | Promise<void>;
}

/** Modal引用 */
export interface ModalRef {
  /** 获取元素引用 */
  element: any | null;
  /** 显示Modal */
  show: () => void;
  /** 隐藏Modal */
  hide: () => void;
  /** 切换显示状态 */
  toggle: () => void;
  /** 获取显示状态 */
  isVisible: () => boolean;
  /** 设置标题 */
  setTitle: (title: ReactNode) => void;
  /** 设置内容 */
  setContent: (content: ReactNode) => void;
  /** 设置按钮 */
  setButtons: (buttons: ModalButton[]) => void;
  /** 添加按钮 */
  addButton: (button: ModalButton) => void;
  /** 移除按钮 */
  removeButton: (key: string) => void;
  /** 聚焦 */
  focus: () => void;
}

/** Modal组件属性 */
export interface ModalProps extends BaseComponentProps {
  /** 是否显示 */
  visible?: boolean;
  /** 默认是否显示 */
  defaultVisible?: boolean;
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 按钮列表 */
  buttons?: ModalButton[];
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 是否显示键盘 */
  keyboard?: boolean;
  /** 是否居中 */
  centered?: boolean;
  /** 尺寸 */
  size?: ModalSize;
  /** 位置 */
  position?: ModalPosition;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 是否全屏 */
  fullscreen?: boolean;
  /** 是否动画效果 */
  animated?: boolean;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 销毁时是否关闭 */
  destroyOnClose?: boolean;
  /** 强制渲染 */
  forceRender?: boolean;
  /** 获取容器 */
  getContainer?: () => HTMLElement;
  /** 点击遮罩事件 */
  onMaskClick?: (event: React.MouseEvent) => void;
  /** 显示事件 */
  onShow?: () => void;
  /** 隐藏事件 */
  onHide?: () => void;
  /** 确定事件 */
  onOk?: () => void | Promise<void>;
  /** 取消事件 */
  onCancel?: () => void;
  /** 按钮点击事件 */
  onButtonClick?: (button: ModalButton) => void;
  /** 关闭事件 */
  onClose?: () => void;
}

/** Modal确认配置 */
export interface ModalConfirmConfig {
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 确定按钮文本 */
  okText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确定按钮类型 */
  okType?: ModalButtonType;
  /** 确定按钮是否禁用 */
  okButtonProps?: ModalButton;
  /** 取消按钮是否禁用 */
  cancelButtonProps?: ModalButton;
  /** 图标类型 */
  icon?: ReactNode;
  /** 宽度 */
  width?: number | string;
  /** 居中 */
  centered?: boolean;
  /** 确定事件 */
  onOk?: () => void | Promise<void>;
  /** 取消事件 */
  onCancel?: () => void;
  /** 关闭事件 */
  onClose?: () => void;
}
