import type { ReactNode, ButtonHTMLAttributes } from 'react';

// 从Taro组件类型中导入ITouchEvent
export interface ITouchEvent {
  currentTarget: EventTarget;
  target: EventTarget;
  detail: Record<string, unknown>;
  changedTouches: Array<{
    identifier: number;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }>;
  targetTouches: Array<{
    identifier: number;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }>;
  touches: Array<{
    identifier: number;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }>;
  [key: string]: unknown;
}

/** 按钮尺寸 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 按钮类型 */
export type ButtonType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/** 按钮变体 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';

/** 按钮形状 */
export type ButtonShape = 'default' | 'rounded' | 'circle' | 'square';

/** 按钮状态 */
export type ButtonStatus = 'normal' | 'loading' | 'disabled' | 'active';

/** 按钮图标位置 */
export type ButtonIconPosition = 'left' | 'right';

/** 按钮原生属性类型 */
export type ButtonNativeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'type' | 'onClick'>;

/** 按钮组件属性接口 */
export interface ButtonProps extends ButtonNativeProps {
  /** 按钮内容 */
  children?: ReactNode;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 按钮状态 */
  status?: ButtonStatus;
  /** 是否块级显示 */
  block?: boolean;
  /** 是否危险操作 */
  danger?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 图标 */
  icon?: ReactNode;
  /** 图标位置 */
  iconPosition?: ButtonIconPosition;
  /** 自定义样式类名 */
  className?: string;
  /** 点击事件处理函数 */
  onClick?: (event: ITouchEvent) => void;
  /** 按下事件处理函数 */
  onPressIn?: (event: ITouchEvent) => void;
  /** 按起事件处理函数 */
  onPressOut?: (event: ITouchEvent) => void;
  /** 长按事件处理函数 */
  onLongPress?: (event: ITouchEvent) => void;
  /** 自定义按钮样式 */
  style?: React.CSSProperties;
  /** 加载状态文字 */
  loadingText?: string;
  /** 是否显示涟漪效果 */
  ripple?: boolean;
  /** 是否显示阴影 */
  shadow?: boolean;
  /** 是否有边框 */
  bordered?: boolean;
  /** 按钮组中的索引位置 */
  groupIndex?: number;
  /** 按钮组中的总数 */
  groupSize?: number;
  /** 自定义主题颜色 */
  color?: string;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 文字颜色 */
  textColor?: string;
  /** 边框颜色 */
  borderColor?: string;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
}

/** 按钮组件引用类型 */
export type ButtonRef = {
  /** 按钮元素 */
  element: HTMLButtonElement | null;
  /** 触发点击事件 */
  click: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 获取按钮状态 */
  getStatus: () => ButtonStatus;
  /** 获取按钮尺寸 */
  getSize: () => ButtonSize;
  /** 获取按钮类型 */
  getType: () => ButtonType;
  /** 获取按钮变体 */
  getVariant: () => ButtonVariant;
};

/** 按钮组属性接口 */
export interface ButtonGroupProps {
  /** 按钮组内容 */
  children: ReactNode;
  /** 按钮组尺寸 */
  size?: ButtonSize;
  /** 按钮组类型 */
  type?: ButtonType;
  /** 按钮组变体 */
  variant?: ButtonVariant;
  /** 按钮组形状 */
  shape?: ButtonShape;
  /** 按钮组状态 */
  status?: ButtonStatus;
  /** 按钮组是否块级显示 */
  block?: boolean;
  /** 按钮组是否危险操作 */
  danger?: boolean;
  /** 按钮组是否显示阴影 */
  shadow?: boolean;
  /** 按钮组是否有边框 */
  bordered?: boolean;
  /** 按钮组间距 */
  spacing?: number;
  /** 按钮组是否垂直排列 */
  vertical?: boolean;
  /** 按钮组自定义样式类名 */
  className?: string;
  /** 按钮组自定义样式 */
  style?: React.CSSProperties;
}

/** 按钮工具函数接口 */
export interface ButtonUtils {
  /** 获取按钮样式类名 */
  getButtonClassName: (props: Partial<ButtonProps>) => string;
  /** 获取按钮样式对象 */
  getButtonStyle: (props: Partial<ButtonProps>) => React.CSSProperties;
  /** 获取按钮尺寸映射 */
  getSizeMap: () => Record<ButtonSize, { fontSize: number; padding: string; height: number; borderRadius: number }>;
  /** 获取按钮类型映射 */
  getTypeMap: () => Record<ButtonType, { backgroundColor: string; textColor: string; borderColor: string }>;
  /** 获取按钮变体映射 */
  getVariantMap: () => Record<
    ButtonVariant,
    { backgroundColor: string; textColor: string; borderColor: string; borderWidth: number }
  >;
  /** 获取按钮形状映射 */
  getShapeMap: () => Record<ButtonShape, { borderRadius: string }>;
  /** 获取按钮状态映射 */
  getStatusMap: () => Record<ButtonStatus, { opacity: number; cursor: string; pointerEvents: string }>;
  /** 验证按钮属性 */
  validateButtonProps: (props: ButtonProps) => boolean;
  /** 格式化按钮尺寸 */
  formatButtonSize: (size: ButtonSize) => string;
  /** 格式化按钮类型 */
  formatButtonType: (type: ButtonType) => string;
  /** 格式化按钮变体 */
  formatButtonVariant: (variant: ButtonVariant) => string;
  /** 格式化按钮形状 */
  formatButtonShape: (shape: ButtonShape) => string;
  /** 格式化按钮状态 */
  formatButtonStatus: (status: ButtonStatus) => string;
}
