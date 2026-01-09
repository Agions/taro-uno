/**
 * Taro-Uno Popconfirm Component Types
 * 确认弹窗组件类型定义
 */

// 确认弹窗方向
export type PopconfirmDirection = 'top' | 'bottom' | 'left' | 'right';

// 确认弹窗主题
export type PopconfirmTheme = 'light' | 'dark' | 'primary';

// 确认弹窗按钮类型
export type PopconfirmButtonType = 'primary' | 'default' | 'danger' | 'success';

// 确认弹窗按钮配置
export interface PopconfirmButton {
  // 按钮文本
  text: string;
  // 按钮类型
  type?: PopconfirmButtonType;
  // 按钮点击回调
  onClick?: () => void;
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 确认弹窗配置
export interface PopconfirmConfig {
  // 标题
  title?: string;
  // 内容
  content?: string;
  // 确认按钮配置
  okButton?: PopconfirmButton | string;
  // 取消按钮配置
  cancelButton?: PopconfirmButton | string;
  // 方向
  direction?: PopconfirmDirection;
  // 主题
  theme?: PopconfirmTheme;
  // 是否显示关闭按钮
  showClose?: boolean;
  // 点击遮罩层是否关闭
  maskClosable?: boolean;
  // 确认弹窗宽度
  width?: number | string;
  // 确认弹窗高度
  height?: number | string;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 确认弹窗属性
export interface PopconfirmProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  // 确认弹窗配置
  config?: PopconfirmConfig;
  // 可见性控制
  visible?: boolean;
  // 默认可见性
  defaultVisible?: boolean;
  // 方向
  direction?: PopconfirmDirection;
  // 主题
  theme?: PopconfirmTheme;
  // 标题
  title?: string;
  // 内容
  content?: React.ReactNode;
  // 确认按钮文本
  okText?: string;
  // 取消按钮文本
  cancelText?: string;
  // 确认按钮类型
  okType?: PopconfirmButtonType;
  // 取消按钮类型
  cancelType?: PopconfirmButtonType;
  // 是否显示关闭按钮
  showClose?: boolean;
  // 点击遮罩层是否关闭
  maskClosable?: boolean;
  // 确认弹窗宽度
  width?: number | string;
  // 确认弹窗高度
  height?: number | string;
  // 触发方式
  trigger?: 'click' | 'hover' | 'focus' | 'manual';
  // 确认回调
  onConfirm?: () => void;
  // 取消回调
  onCancel?: () => void;
  // 关闭回调
  onClose?: () => void;
  // 打开回调
  onOpen?: () => void;
  // 点击遮罩回调
  onMaskClick?: () => void;
  // 自定义图标
  icon?: React.ReactNode;
  // 自定义遮罩层样式
  maskStyle?: React.CSSProperties;
  // 自定义遮罩层类名
  maskClassName?: string;
  // 自定义内容样式
  contentStyle?: React.CSSProperties;
  // 自定义内容类名
  contentClassName?: string;
  // 自定义标题样式
  titleStyle?: React.CSSProperties;
  // 自定义标题类名
  titleClassName?: string;
  // 自定义按钮容器样式
  buttonContainerStyle?: React.CSSProperties;
  // 自定义按钮容器类名
  buttonContainerClassName?: string;
  // 动画持续时间
  animationDuration?: number;
  // 是否显示动画
  showAnimation?: boolean;
  // 是否禁用
  disabled?: boolean;
}

// 确认弹窗引用
export interface PopconfirmRef {
  // 显示确认弹窗
  show: () => void;
  // 隐藏确认弹窗
  hide: () => void;
  // 切换确认弹窗可见性
  toggle: () => void;
  // 获取当前可见性
  isVisible: () => boolean;
}

// 确认弹窗上下文
export interface PopconfirmContext {
  // 可见性
  visible: boolean;
  // 显示确认弹窗
  show: () => void;
  // 隐藏确认弹窗
  hide: () => void;
  // 切换确认弹窗可见性
  toggle: () => void;
  // 确认回调
  confirm: () => void;
  // 取消回调
  cancel: () => void;
}
