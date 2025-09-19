/**
 * Taro-Uno Switch Component Types
 * 开关组件类型定义
 */

import type { ReactNode, CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';

// 开关尺寸
export type SwitchSize = 'sm' | 'md' | 'lg';

// 开关变体
export type SwitchVariant = 'solid' | 'outline' | 'ghost';

// 开关状态
export type SwitchStatus = 'normal' | 'checked' | 'unchecked' | 'disabled' | 'loading' | 'error';

// 开关颜色
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default';

// 开关形状
export type SwitchShape = 'rounded' | 'square';

// 加载类型
export type SwitchLoadingType = 'spinner' | 'dots' | 'pulse';

// 验证规则
export interface SwitchRule {
  required?: boolean;
  message?: string;
  validator?: (value: boolean) => boolean | string | Promise<boolean | string>;
}

// 开关组件属性
export interface SwitchProps {
  /** 组件值 */
  value?: boolean;
  /** 默认值 */
  defaultValue?: boolean;
  /** 开关尺寸 */
  size?: SwitchSize;
  /** 开关变体 */
  variant?: SwitchVariant;
  /** 开关状态 */
  status?: SwitchStatus;
  /** 开关颜色 */
  color?: SwitchColor;
  /** 开关形状 */
  shape?: SwitchShape;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 加载类型 */
  loadingType?: SwitchLoadingType;
  /** 是否显示加载文本 */
  loadingText?: string;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示标签 */
  showLabel?: boolean;
  /** 选中标签文本 */
  checkedLabel?: string;
  /** 未选中标签文本 */
  uncheckedLabel?: string;
  /** 选中图标 */
  checkedIcon?: ReactNode;
  /** 未选中图标 */
  uncheckedIcon?: ReactNode;
  /** 辅助文本 */
  helperText?: string;
  /** 错误文本 */
  errorText?: string;
  /** 是否显示加载遮罩 */
  showLoadingMask?: boolean;
  /** 验证规则 */
  rules?: SwitchRule[];
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onFocus';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 自定义验证函数 */
  validator?: (value: boolean) => boolean | string | Promise<boolean | string>;
  /** 值变化回调 */
  onChange?: (checked: boolean, event: ITouchEvent) => void;
  /** 聚焦回调 */
  onFocus?: (event: ITouchEvent) => void;
  /** 失焦回调 */
  onBlur?: (event: ITouchEvent) => void;
  /** 点击回调 */
  onClick?: (checked: boolean, event: ITouchEvent) => void;
  /** 加载状态变化回调 */
  onLoadingChange?: (loading: boolean) => void;
  /** 验证回调 */
  onValidate?: (result: SwitchValidationResult) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 容器样式类名 */
  containerClassName?: string;
  /** 容器样式 */
  containerStyle?: CSSProperties;
  /** 是否块级显示 */
  block?: boolean;
  /** 无障碍支持 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    checked?: boolean;
    busy?: boolean;
    required?: boolean;
    invalid?: boolean;
  };
  /** 平台特定属性 */
  platform?: {
    weapp?: Record<string, any>;
    alipay?: Record<string, any>;
    h5?: Record<string, any>;
    rn?: Record<string, any>;
  };
  /** 其他属性 */
  [key: string]: any;
}

// 开关组件引用
export interface SwitchRef {
  /** DOM元素引用 */
  element: HTMLElement | null;
  /** 获取值 */
  getValue: () => boolean;
  /** 设置值 */
  setValue: (value: boolean) => void;
  /** 切换值 */
  toggle: () => void;
  /** 聚焦 */
  focus: () => void;
  /** 失焦 */
  blur: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 设置状态 */
  setStatus: (status: SwitchStatus) => void;
  /** 获取状态 */
  getStatus: () => SwitchStatus;
  /** 验证 */
  validate: () => Promise<SwitchValidationResult>;
  /** 重置 */
  reset: () => void;
  /** 获取验证结果 */
  getValidationResult: () => SwitchValidationResult | null;
}

// 验证结果
export interface SwitchValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证值 */
  value: boolean;
}

// 开关上下文
export interface SwitchContext {
  /** 开关实例 */
  switch: {
    value: boolean;
    status: SwitchStatus;
    disabled: boolean;
    readonly: boolean;
    loading: boolean;
    validationResult: SwitchValidationResult | null;
  };
  /** 开关配置 */
  config: {
    size: SwitchSize;
    variant: SwitchVariant;
    color: SwitchColor;
    shape: SwitchShape;
    showLabel: boolean;
    checkedLabel: string;
    uncheckedLabel: string;
    validateTrigger: 'onChange' | 'onBlur' | 'onFocus';
  };
  /** 样式配置 */
  styleConfig: SwitchStyleConfig;
}

// 样式配置
export interface SwitchStyleConfig {
  /** 颜色配置 */
  colors: {
    /** 主色 */
    primary: string;
    /** 次色 */
    secondary: string;
    /** 成功色 */
    success: string;
    /** 警告色 */
    warning: string;
    /** 错误色 */
    error: string;
    /** 信息色 */
    info: string;
    /** 默认色 */
    default: string;
    /** 禁用色 */
    disabled: string;
    /** 边框色 */
    border: string;
    /** 背景色 */
    background: string;
    /** 文本色 */
    text: string;
  };
  /** 尺寸配置 */
  sizes: {
    /** 小尺寸 */
    sm: {
      width: number;
      height: number;
      thumbSize: number;
      fontSize: number;
      borderRadius: number;
    };
    /** 中尺寸 */
    md: {
      width: number;
      height: number;
      thumbSize: number;
      fontSize: number;
      borderRadius: number;
    };
    /** 大尺寸 */
    lg: {
      width: number;
      height: number;
      thumbSize: number;
      fontSize: number;
      borderRadius: number;
    };
  };
  /** 间距配置 */
  spacing: {
    /** 内边距 */
    padding: number;
    /** 外边距 */
    margin: number;
    /** 标签间距 */
    labelGap: number;
  };
  /** 动画配置 */
  animation: {
    /** 过渡时间 */
    duration: string;
    /** 缓动函数 */
    easing: string;
    /** 加载动画 */
    loading: string;
  };
  /** 阴影配置 */
  shadow: {
    /** 默认阴影 */
    default: string;
    /** 悬停阴影 */
    hover: string;
    /** 激活阴影 */
    active: string;
    /** 禁用阴影 */
    disabled: string;
  };
}

// 工具函数类型
export interface SwitchUtils {
  /** 获取颜色值 */
  getColor: (color: SwitchColor, checked: boolean, disabled: boolean) => string;
  /** 获取尺寸值 */
  getSize: (size: SwitchSize) => SwitchStyleConfig['sizes'][keyof SwitchStyleConfig['sizes']];
  /** 格式化标签文本 */
  formatLabel: (label: string, checked: boolean) => string;
  /** 验证开关值 */
  validateValue: (value: boolean, rules?: SwitchRule[]) => Promise<SwitchValidationResult>;
  /** 获取无障碍状态 */
  getAccessibilityState: (props: SwitchProps, status: SwitchStatus) => any;
}

// 事件类型
export interface SwitchEvents {
  /** 值变化事件 */
  onChange: (checked: boolean, event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus: (event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (event: ITouchEvent) => void;
  /** 点击事件 */
  onClick: (checked: boolean, event: ITouchEvent) => void;
  /** 加载状态变化事件 */
  onLoadingChange: (loading: boolean) => void;
  /** 验证事件 */
  onValidate: (result: SwitchValidationResult) => void;
}

// 开关组属性
export interface SwitchGroupProps {
  /** 开关组值 */
  value?: Record<string, boolean>;
  /** 默认值 */
  defaultValue?: Record<string, boolean>;
  /** 开关组子项 */
  children: ReactNode;
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical';
  /** 间距 */
  spacing?: number;
  /** 禁用整个组 */
  disabled?: boolean;
  /** 只读整个组 */
  readonly?: boolean;
  /** 值变化回调 */
  onChange?: (values: Record<string, boolean>) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

// 开关组引用
export interface SwitchGroupRef {
  /** 获取所有值 */
  getValues: () => Record<string, boolean>;
  /** 设置值 */
  setValues: (values: Record<string, boolean>) => void;
  /** 获取单个值 */
  getValue: (name: string) => boolean;
  /** 设置单个值 */
  setValue: (name: string, value: boolean) => void;
  /** 重置所有值 */
  reset: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
}

// 开关组项属性
export interface SwitchGroupItemProps {
  /** 开关名称 */
  name: string;
  /** 开关标签 */
  label: string;
  /** 开关值 */
  value?: boolean;
  /** 默认值 */
  defaultValue?: boolean;
  /** 开关尺寸 */
  size?: SwitchSize;
  /** 开关颜色 */
  color?: SwitchColor;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 辅助文本 */
  helperText?: string;
  /** 错误文本 */
  errorText?: string;
  /** 验证规则 */
  rules?: SwitchRule[];
  /** 值变化回调 */
  onChange?: (checked: boolean, event: ITouchEvent) => void;
}
