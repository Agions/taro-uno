/**
 * Button组件专用类型定义
 * 提供类型安全的Button组件相关类型和工具函数
 */

import { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import {
  Validator,
  createValidator,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isReactElement,
  classNames,
} from './utils';

// ==================== Button基础类型 ====================

/** 按钮尺寸类型 */
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
export type ButtonNativeProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'size' | 'type' | 'onClick'
>;

// ==================== Button属性类型 ====================

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

// ==================== Button引用类型 ====================

/** 按钮组件引用类型 */
export interface ButtonRef {
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
  /** 获取按钮形状 */
  getShape: () => ButtonShape;
  /** 聚焦按钮 */
  focus: () => void;
  /** 失焦按钮 */
  blur: () => void;
}

// ==================== Button组类型 ====================

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

// ==================== Button样式类型 ====================

/** 按钮尺寸样式映射 */
export interface ButtonSizeStyle {
  fontSize: number;
  padding: string;
  height: number;
  borderRadius: number;
  minWidth?: number;
}

/** 按钮类型颜色映射 */
export interface ButtonTypeColors {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
}

/** 按钮变体样式映射 */
export interface ButtonVariantStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
}

/** 按钮形状样式映射 */
export interface ButtonShapeStyle {
  borderRadius: string;
}

/** 按钮状态样式映射 */
export interface ButtonStatusStyle {
  opacity: number;
  cursor: string;
  pointerEvents: string;
}

/** 按钮阴影样式映射 */
export interface ButtonShadowStyle {
  default: string;
  hover: string;
  active: string;
}

// ==================== Button工具函数类型 ====================

/** 按钮工具函数接口 */
export interface ButtonUtils {
  /** 获取按钮样式类名 */
  getButtonClassName: (props: Partial<ButtonProps>) => string;
  /** 获取按钮样式对象 */
  getButtonStyle: (props: Partial<ButtonProps>) => React.CSSProperties;
  /** 获取按钮尺寸映射 */
  getSizeMap: () => Record<ButtonSize, ButtonSizeStyle>;
  /** 获取按钮类型映射 */
  getTypeMap: () => Record<ButtonType, ButtonTypeColors>;
  /** 获取按钮变体映射 */
  getVariantMap: () => Record<ButtonVariant, ButtonVariantStyle>;
  /** 获取按钮形状映射 */
  getShapeMap: () => Record<ButtonShape, ButtonShapeStyle>;
  /** 获取按钮状态映射 */
  getStatusMap: () => Record<ButtonStatus, ButtonStatusStyle>;
  /** 获取按钮阴影映射 */
  getShadowMap: () => ButtonShadowStyle;
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
  /** 计算按钮最终状态 */
  calculateFinalStatus: (props: Partial<ButtonProps>) => ButtonStatus;
  /** 生成按钮组样式 */
  getGroupStyle: (props: Partial<ButtonGroupProps>) => React.CSSProperties;
  /** 生成按钮组内按钮样式 */
  getGroupItemStyle: (props: {
    index: number;
    total: number;
    shape?: ButtonShape;
    vertical?: boolean;
  }) => React.CSSProperties;
  /** 生成涟漪效果样式 */
  getRippleStyle: (x: number, y: number, size: number) => React.CSSProperties;
  /** 生成加载动画样式 */
  getLoadingStyle: (size: ButtonSize) => React.CSSProperties;
}

// ==================== Button验证器 ====================

/** 按钮尺寸验证器 */
export const buttonSizeValidator: Validator<ButtonSize> = createValidator(
  (value): value is ButtonSize => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value as ButtonSize),
  'Invalid button size. Must be one of: xs, sm, md, lg, xl'
);

/** 按钮类型验证器 */
export const buttonTypeValidator: Validator<ButtonType> = createValidator(
  (value): value is ButtonType => ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(value as ButtonType),
  'Invalid button type. Must be one of: default, primary, secondary, success, warning, error, info'
);

/** 按钮变体验证器 */
export const buttonVariantValidator: Validator<ButtonVariant> = createValidator(
  (value): value is ButtonVariant => ['solid', 'outline', 'ghost', 'text'].includes(value as ButtonVariant),
  'Invalid button variant. Must be one of: solid, outline, ghost, text'
);

/** 按钮形状验证器 */
export const buttonShapeValidator: Validator<ButtonShape> = createValidator(
  (value): value is ButtonShape => ['default', 'rounded', 'circle', 'square'].includes(value as ButtonShape),
  'Invalid button shape. Must be one of: default, rounded, circle, square'
);

/** 按钮状态验证器 */
export const buttonStatusValidator: Validator<ButtonStatus> = createValidator(
  (value): value is ButtonStatus => ['normal', 'loading', 'disabled', 'active'].includes(value as ButtonStatus),
  'Invalid button status. Must be one of: normal, loading, disabled, active'
);

/** 按钮图标位置验证器 */
export const buttonIconPositionValidator: Validator<ButtonIconPosition> = createValidator(
  (value): value is ButtonIconPosition => ['left', 'right'].includes(value as ButtonIconPosition),
  'Invalid button icon position. Must be one of: left, right'
);

// ==================== Button类型守卫 ====================

/** 检查是否为有效的按钮尺寸 */
export function isValidButtonSize(value: unknown): value is ButtonSize {
  return buttonSizeValidator(value).success;
}

/** 检查是否为有效的按钮类型 */
export function isValidButtonType(value: unknown): value is ButtonType {
  return buttonTypeValidator(value).success;
}

/** 检查是否为有效的按钮变体 */
export function isValidButtonVariant(value: unknown): value is ButtonVariant {
  return buttonVariantValidator(value).success;
}

/** 检查是否为有效的按钮形状 */
export function isValidButtonShape(value: unknown): value is ButtonShape {
  return buttonShapeValidator(value).success;
}

/** 检查是否为有效的按钮状态 */
export function isValidButtonStatus(value: unknown): value is ButtonStatus {
  return buttonStatusValidator(value).success;
}

/** 检查是否为有效的按钮图标位置 */
export function isValidButtonIconPosition(value: unknown): value is ButtonIconPosition {
  return buttonIconPositionValidator(value).success;
}

/** 检查是否为有效的按钮属性 */
export function isValidButtonProps(props: unknown): props is ButtonProps {
  if (!props || typeof props !== 'object') return false;
  
  const obj = props as Record<string, unknown>;
  
  // 验证基本属性类型
  if (obj['size'] !== undefined && !isValidButtonSize(obj['size'])) return false;
  if (obj['type'] !== undefined && !isValidButtonType(obj['type'])) return false;
  if (obj['variant'] !== undefined && !isValidButtonVariant(obj['variant'])) return false;
  if (obj['shape'] !== undefined && !isValidButtonShape(obj['shape'])) return false;
  if (obj['status'] !== undefined && !isValidButtonStatus(obj['status'])) return false;
  if (obj['iconPosition'] !== undefined && !isValidButtonIconPosition(obj['iconPosition'])) return false;
  
  // 验证布尔值属性
  const booleanProps = ['block', 'danger', 'loading', 'disabled', 'ripple', 'shadow', 'bordered'];
  for (const prop of booleanProps) {
    if (obj[prop] !== undefined && !isBoolean(obj[prop])) return false;
  }
  
  // 验证字符串属性
  const stringProps = ['className', 'loadingText', 'color', 'backgroundColor', 'textColor', 'borderColor'];
  for (const prop of stringProps) {
    if (obj[prop] !== undefined && !isString(obj[prop])) return false;
  }
  
  // 验证数字属性
  const numberProps = ['animationDuration', 'groupIndex', 'groupSize'];
  for (const prop of numberProps) {
    if (obj[prop] !== undefined && !isNumber(obj[prop])) return false;
  }
  
  // 验证函数属性
  const functionProps = ['onClick', 'onPressIn', 'onPressOut', 'onLongPress'];
  for (const prop of functionProps) {
    if (obj[prop] !== undefined && !isFunction(obj[prop])) return false;
  }
  
  // 验证React元素属性
  if (obj['icon'] !== undefined && !isReactElement(obj['icon']) && !isString(obj['icon'])) return false;
  
  return true;
}

// ==================== Button默认值 ====================

/** 按钮默认属性 */
export const defaultButtonProps: Partial<ButtonProps> = {
  children: undefined,
  size: 'md',
  type: 'default',
  variant: 'solid',
  shape: 'default',
  status: 'normal',
  block: false,
  danger: false,
  loading: false,
  disabled: false,
  icon: undefined,
  iconPosition: 'left',
  className: '',
  onClick: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
  onLongPress: undefined,
  style: {},
  loadingText: '加载中...',
  ripple: false,
  shadow: false,
  bordered: true,
  groupIndex: undefined,
  groupSize: undefined,
  color: undefined,
  backgroundColor: undefined,
  textColor: undefined,
  borderColor: undefined,
  animationDuration: 300,
  accessible: true,
  accessibilityLabel: '',
  accessibilityRole: 'button',
  accessibilityState: {
    disabled: false,
    selected: false,
    busy: false,
    expanded: false,
  },
};

// ==================== Button工具函数 ====================

/** 创建按钮类名 */
export function createButtonClassName(props: Partial<ButtonProps>): string {
  const {
    size = defaultButtonProps.size,
    type = defaultButtonProps.type,
    variant = defaultButtonProps.variant,
    shape = defaultButtonProps.shape,
    block = defaultButtonProps.block,
    danger = defaultButtonProps.danger,
    loading = defaultButtonProps.loading,
    disabled = defaultButtonProps.disabled,
    shadow = defaultButtonProps.shadow,
    bordered = defaultButtonProps.bordered,
    className = defaultButtonProps.className,
  } = props;

  const finalStatus = calculateFinalStatus(props);

  const baseClasses = [
    'taro-uno-button',
    `taro-uno-button--${size}`,
    `taro-uno-button--${type}`,
    `taro-uno-button--${variant}`,
    `taro-uno-button--${shape}`,
    `taro-uno-button--${finalStatus}`,
  ].filter(Boolean);

  const conditionalClasses = {
    'taro-uno-button--block': !!block,
    'taro-uno-button--danger': !!danger,
    'taro-uno-button--loading': !!loading,
    'taro-uno-button--disabled': !!disabled,
    'taro-uno-button--shadow': !!shadow,
    'taro-uno-button--bordered': !!bordered,
  };

  return classNames(
    ...baseClasses,
    conditionalClasses,
    className
  );
}

/** 计算按钮最终状态 */
export function calculateFinalStatus(props: Partial<ButtonProps>): ButtonStatus {
  const { loading = defaultButtonProps.loading, disabled = defaultButtonProps.disabled, status = defaultButtonProps.status } = props;
  
  if (loading) return 'loading';
  if (disabled) return 'disabled';
  return status || 'normal';
}

/** 验证按钮属性 */
export function validateButtonProps(props: ButtonProps): boolean {
  return isValidButtonProps(props);
}

/** 格式化按钮尺寸 */
export function formatButtonSize(size: ButtonSize): string {
  const sizeMap: Record<ButtonSize, string> = {
    xs: '极小',
    sm: '小',
    md: '中',
    lg: '大',
    xl: '极大',
  };
  return sizeMap[size];
}

/** 格式化按钮类型 */
export function formatButtonType(type: ButtonType): string {
  const typeMap: Record<ButtonType, string> = {
    default: '默认',
    primary: '主要',
    secondary: '次要',
    success: '成功',
    warning: '警告',
    error: '错误',
    info: '信息',
  };
  return typeMap[type];
}

/** 格式化按钮变体 */
export function formatButtonVariant(variant: ButtonVariant): string {
  const variantMap: Record<ButtonVariant, string> = {
    solid: '实心',
    outline: '轮廓',
    ghost: '幽灵',
    text: '文字',
  };
  return variantMap[variant];
}

/** 格式化按钮形状 */
export function formatButtonShape(shape: ButtonShape): string {
  const shapeMap: Record<ButtonShape, string> = {
    default: '默认',
    rounded: '圆角',
    circle: '圆形',
    square: '方形',
  };
  return shapeMap[shape];
}

/** 格式化按钮状态 */
export function formatButtonStatus(status: ButtonStatus): string {
  const statusMap: Record<ButtonStatus, string> = {
    normal: '正常',
    loading: '加载中',
    disabled: '禁用',
    active: '激活',
  };
  return statusMap[status];
}

// ==================== 导出 ====================

export * from './index';