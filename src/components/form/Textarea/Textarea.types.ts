/**
 * Taro-Uno Textarea Component Types
 * 文本域组件类型定义
 */

import type { ReactNode, CSSProperties, TextareaHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 文本域尺寸 */
export type TextareaSize = 'sm' | 'md' | 'lg';

/** 文本域变体 */
export type TextareaVariant = 'outlined' | 'filled' | 'underlined';

/** 文本域状态 */
export type TextareaStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled';

/** 文本域调整大小方式 */
export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical' | 'auto';

/** 自动调整高度策略 */
export type AutoHeightStrategy = 'content' | 'rows' | 'max-rows';

/** 字符计数显示位置 */
export type CounterPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

/** 清除按钮触发时机 */
export type ClearTrigger = 'always' | 'focus' | 'never';

/** 文本域原生属性类型 */
export type TextareaNativeProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/** 验证规则 */
export interface TextareaRule {
  /** 是否必填 */
  required?: boolean;
  /** 错误消息 */
  message?: string;
  /** 正则表达式验证 */
  pattern?: RegExp;
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
  /** 自定义验证函数 */
  validator?: (_value: string) => boolean | string | Promise<boolean | string>;
}

/** 文本域组件属性接口 */
export interface TextareaProps
  extends Omit<
    TextareaNativeProps,
    'size' | 'onChange' | 'onFocus' | 'onBlur' | 'onInput' | 'dangerouslySetInnerHTML' | 'onTouchStart' | 'prefix'
  > {
  /** 文本域内容 */
  value?: string;
  /** 默认值（非受控模式） */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 文本域尺寸 */
  size?: TextareaSize;
  /** 文本域变体 */
  variant?: TextareaVariant;
  /** 文本域状态 */
  status?: TextareaStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除按钮触发时机 */
  clearTrigger?: ClearTrigger;
  /** 最大长度 */
  maxLength?: number;
  /** 最大长度 (Taro原生属性) */
  maxlength?: number;
  /** 最小长度 */
  minLength?: number;
  /** 行数 */
  rows?: number;
  /** 最小行数 */
  minRows?: number;
  /** 最大行数 */
  maxRows?: number;
  /** 是否自动调整高度 */
  autoHeight?: boolean;
  /** 自动调整高度策略 */
  autoHeightStrategy?: AutoHeightStrategy;
  /** 调整大小方式 */
  resize?: TextareaResize;
  /** 是否显示字符计数 */
  showCount?: boolean;
  /** 字符计数显示位置 */
  counterPosition?: CounterPosition;
  /** 是否显示字数限制 */
  showWordLimit?: boolean;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 标签文本 */
  label?: ReactNode;
  /** 辅助文本 */
  helperText?: ReactNode;
  /** 错误文本 */
  errorText?: ReactNode;
  /** 前缀图标或文本 */
  prefix?: ReactNode;
  /** 后缀图标或文本 */
  suffix?: ReactNode;
  /** 验证规则 */
  rules?: TextareaRule[];
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 自定义验证函数 */
  validator?: (_value: string) => boolean | string | Promise<boolean | string>;
  /** 值变化事件处理函数 */
  onChange?: (_value: string, event: ITouchEvent) => void;
  /** 聚焦事件处理函数 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失焦事件处理函数 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 输入事件处理函数 */
  onInput?: (_value: string, event: ITouchEvent) => void;
  /** 清除事件处理函数 */
  onClear?: (_event: ITouchEvent) => void;
  /** 确认事件处理函数 */
  onConfirm?: (_value: string, event: ITouchEvent) => void;
  /** 键盘高度变化事件处理函数 */
  onKeyboardHeightChange?: (_height: number, event: ITouchEvent) => void;
  /** 高度变化事件处理函数 */
  onHeightChange?: (_height: number, event: ITouchEvent) => void;
  /** 验证事件处理函数 */
  onValidate?: (_result: TextareaValidationResult) => void;
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
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;
    multiline?: boolean;
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

/** 文本域组件引用类型 */
export type TextareaRef = {
  /** 文本域元素 */
  element: HTMLTextAreaElement | null;
  /** 获取文本域值 */
  getValue: () => string;
  /** 设置文本域值 */
  setValue: (_value: string) => void;
  /** 聚焦文本域 */
  focus: () => void;
  /** 失焦文本域 */
  blur: () => void;
  /** 选择文本 */
  select: () => void;
  /** 设置选中文本范围 */
  setSelectionRange: (_start: number, end: number) => void;
  /** 获取选中文本范围 */
  getSelectionRange: () => { start: number; end: number };
  /** 设置禁用状态 */
  setDisabled: (_disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (_readonly: boolean) => void;
  /** 设置文本域状态 */
  setStatus: (_status: TextareaStatus) => void;
  /** 获取文本域状态 */
  getStatus: () => TextareaStatus;
  /** 验证文本域值 */
  validate: () => Promise<TextareaValidationResult>;
  /** 清除文本域值 */
  clear: () => void;
  /** 重置文本域 */
  reset: () => void;
  /** 调整高度 */
  adjustHeight: () => void;
  /** 获取当前高度 */
  getHeight: () => number;
  /** 获取滚动高度 */
  getScrollHeight: () => number;
  /** 滚动到底部 */
  scrollToBottom: () => void;
  /** 滚动到顶部 */
  scrollToTop: () => void;
  /** 获取验证结果 */
  getValidationResult: () => TextareaValidationResult | null;
};

/** 文本域验证结果接口 */
export interface TextareaValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证规则索引 */
  ruleIndex?: number;
  /** 验证时间戳 */
  timestamp: number;
  /** 验证值 */
  value: string;
}

/** 文本域上下文接口 */
export interface TextareaContext {
  /** 文本域实例 */
  textarea: {
    value: string;
    status: TextareaStatus;
    disabled: boolean;
    readonly: boolean;
    validationResult: TextareaValidationResult | null;
  };
  /** 文本域配置 */
  config: {
    size: TextareaSize;
    variant: TextareaVariant;
    validateTrigger: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
    autoHeight: boolean;
    autoHeightStrategy: AutoHeightStrategy;
    showCount: boolean;
    counterPosition: CounterPosition;
  };
  /** 样式配置 */
  styleConfig: TextareaStyleConfig;
}

/** 文本域样式配置接口 */
export interface TextareaStyleConfig {
  /** 基础样式 */
  base: CSSProperties;
  /** 尺寸样式 */
  sizes: Record<TextareaSize, CSSProperties>;
  /** 变体样式 */
  variants: Record<TextareaVariant, CSSProperties>;
  /** 状态样式 */
  statuses: Record<TextareaStatus, CSSProperties>;
  /** 前缀样式 */
  prefix: CSSProperties;
  /** 后缀样式 */
  suffix: CSSProperties;
  /** 标签样式 */
  label: CSSProperties;
  /** 辅助文本样式 */
  helperText: CSSProperties;
  /** 错误文本样式 */
  errorText: CSSProperties;
  /** 计数器样式 */
  counter: CSSProperties;
  /** 清除按钮样式 */
  clearButton: CSSProperties;
  /** 容器样式 */
  container: CSSProperties;
  /** 包装器样式 */
  wrapper: CSSProperties;
}

/** 文本域工具函数接口 */
export interface TextareaUtils {
  /** 格式化文本值 */
  formatValue: (_value: string, maxLength?: number) => string;
  /** 验证文本值 */
  validateValue: (_value: string, rules?: TextareaRule[]) => Promise<TextareaValidationResult>;
  /** 计算字符长度 */
  calculateLength: (_value: string) => number;
  /** 计算文本域高度 */
  calculateHeight: (_value: string, rows?: number, minRows?: number, maxRows?: number) => number;
  /** 格式化计数器文本 */
  formatCounterText: (_current: number, max?: number) => string;
  /** 获取无障碍状态 */
  getAccessibilityState: (_props: TextareaProps, status: TextareaStatus) => any;
  /** 调整文本域高度 */
  adjustTextareaHeight: (
    element: HTMLTextAreaElement,
    strategy: AutoHeightStrategy,
    rows?: number,
    minRows?: number,
    maxRows?: number,
  ) => void;
}

/** 文本域事件接口 */
export interface TextareaEvents {
  /** 值变化事件 */
  onChange: (_value: string, event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus: (_event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (_event: ITouchEvent) => void;
  /** 输入事件 */
  onInput: (_value: string, event: ITouchEvent) => void;
  /** 清除事件 */
  onClear: (_event: ITouchEvent) => void;
  /** 确认事件 */
  onConfirm: (_value: string, event: ITouchEvent) => void;
  /** 键盘高度变化事件 */
  onKeyboardHeightChange: (_height: number, event: ITouchEvent) => void;
  /** 高度变化事件 */
  onHeightChange: (_height: number, event: ITouchEvent) => void;
  /** 验证事件 */
  onValidate: (_result: TextareaValidationResult) => void;
}

/** 文本域组属性接口 */
export interface TextareaGroupProps {
  /** 文本域组内容 */
  children: ReactNode;
  /** 文本域组尺寸 */
  size?: TextareaSize;
  /** 文本域组变体 */
  variant?: TextareaVariant;
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical';
  /** 间距 */
  spacing?: number;
  /** 是否禁用整个组 */
  disabled?: boolean;
  /** 是否只读整个组 */
  readonly?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/** 文本域组引用接口 */
export interface TextareaGroupRef {
  /** 获取所有值 */
  getValues: () => Record<string, string>;
  /** 设置值 */
  setValues: (_values: Record<string, string>) => void;
  /** 获取单个值 */
  getValue: (_name: string) => string;
  /** 设置单个值 */
  setValue: (_name: string, value: string) => void;
  /** 重置所有值 */
  reset: () => void;
  /** 验证所有值 */
  validateAll: () => Promise<Record<string, TextareaValidationResult>>;
  /** 设置禁用状态 */
  setDisabled: (_disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (_readonly: boolean) => void;
}
