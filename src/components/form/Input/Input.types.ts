import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 输入框尺寸 */
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 输入框类型 */
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'idcard' | 'digit';

/** 输入框变体 */
export type InputVariant = 'outlined' | 'filled' | 'underlined';

/** 输入框状态 */
export type InputStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled' | 'loading';

/** 清除按钮触发时机 */
export type ClearTrigger = 'always' | 'focus' | 'never';

/** 输入框原生属性类型 */
export type InputNativeProps = InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

/** 输入框组件属性接口 */
export interface InputProps
  extends Omit<
    InputNativeProps,
    | 'size'
    | 'type'
    | 'value'
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'prefix'
    | 'onInput'
    | 'dangerouslySetInnerHTML'
    | 'onTouchStart'
  > {
  /** 输入框内容 */
  value?: string | number;
  /** 默认值（非受控模式） */
  defaultValue?: string | number;
  /** 占位符 */
  placeholder?: string;
  /** 输入框尺寸 */
  size?: InputSize;
  /** 输入框类型 */
  type?: InputType;
  /** 输入框变体 */
  variant?: InputVariant;
  /** 输入框状态 */
  status?: InputStatus;
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
  /** 前缀图标或文本 */
  prefix?: ReactNode;
  /** 后缀图标或文本 */
  suffix?: ReactNode;
  /** 标签文本 */
  label?: ReactNode;
  /** 辅助文本 */
  helperText?: ReactNode;
  /** 错误文本 */
  errorText?: ReactNode;
  /** 计数器 */
  showCount?: boolean;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示密码切换按钮 */
  showPasswordToggle?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 值变化事件处理函数 */
  onChange?: (_value: string, event: ITouchEvent) => void;
  /** 聚焦事件处理函数 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失焦事件处理函数 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 清除事件处理函数 */
  onClear?: (_event: ITouchEvent) => void;
  /** 确认事件处理函数 */
  onConfirm?: (_value: string, event: ITouchEvent) => void;
  /** 输入事件处理函数 */
  onInput?: (_value: string, event: ITouchEvent) => void;
  /** 键盘输入事件处理函数 */
  onKeyboardHeightChange?: (_height: number, event: ITouchEvent) => void;
  /** 自定义输入框样式 */
  style?: React.CSSProperties;
  /** 是否启用无障碍访问 */
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
  };
  /** 表单验证规则 */
  rules?: Array<{
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    validator?: (_value: string) => boolean | string | Promise<boolean | string>;
  }>;
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit' | 'onFocus';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 是否多行输入 */
  multiline?: boolean;
  /** 行数（多行输入时） */
  rows?: number;
  /** 自动调整高度（多行输入时） */
  autoHeight?: boolean;
  /** 是否显示字数统计 */
  showWordLimit?: boolean;
  /** 自定义验证函数 */
  validator?: (_value: string) => boolean | string | Promise<boolean | string>;
  /** 是否块级显示 */
  block?: boolean;
  /** 容器样式 */
  containerStyle?: React.CSSProperties;
}

/** 输入框组件引用类型 */
export type InputRef = {
  /** 输入框元素 */
  element: HTMLInputElement | HTMLTextAreaElement | null;
  /** 获取输入框值 */
  getValue: () => string;
  /** 设置输入框值 */
  setValue: (_value: string) => void;
  /** 聚焦输入框 */
  focus: () => void;
  /** 失焦输入框 */
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
  /** 设置输入框状态 */
  setStatus: (_status: InputStatus) => void;
  /** 获取输入框状态 */
  getStatus: () => InputStatus;
  /** 验证输入框值 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 清除输入框值 */
  clear: () => void;
  /** 重置输入框 */
  reset: () => void;
};

/** 输入框组属性接口 */
export interface InputGroupProps {
  /** 输入框组内容 */
  children: ReactNode;
  /** 输入框组尺寸 */
  size?: InputSize;
  /** 输入框组变体 */
  variant?: InputVariant;
  /** 输入框组状态 */
  status?: InputStatus;
  /** 是否紧凑布局 */
  compact?: boolean;
  /** 是否块级显示 */
  block?: boolean;
  /** 输入框组自定义样式类名 */
  className?: string;
  /** 输入框组自定义样式 */
  style?: React.CSSProperties;
}

/** 输入框工具函数接口 */
export interface InputUtils {
  /** 格式化输入值 */
  formatValue: (_value: string | number, type: InputType) => string;
  /** 验证输入值 */
  validateValue: (_value: string, rules: InputProps['rules']) => { valid: boolean; message?: string };
  /** 计算字符长度 */
  calculateLength: (_value: string, type: InputType) => number;
  /** 格式化手机号 */
  formatPhone: (_phone: string) => string;
  /** 格式化身份证号 */
  formatIdCard: (_idCard: string) => string;
  /** 格式化金额 */
  formatMoney: (_amount: string) => string;
  /** 限制输入字符 */
  restrictInput: (_value: string, type: InputType) => string;
  /** 获取输入框类型映射 */
  getTypeMap: () => Record<InputType, { keyboard: string; pattern?: string }>;
  /** 获取输入框尺寸映射 */
  getSizeMap: () => Record<InputSize, { fontSize: number; padding: string; height: number; borderRadius: number }>;
  /** 获取输入框变体映射 */
  getVariantMap: () => Record<InputVariant, { backgroundColor: string; borderColor: string; borderWidth: number }>;
  /** 获取输入框状态映射 */
  getStatusMap: () => Record<InputStatus, { color: string; icon?: string }>;
}

/** 输入框验证结果接口 */
export interface InputValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证规则索引 */
  ruleIndex?: number;
  /** 验证时间戳 */
  timestamp: number;
}

/** 输入框事件接口 */
export interface InputEvents {
  /** 值变化事件 */
  onChange: (_value: string, event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus: (_event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (_event: ITouchEvent) => void;
  /** 清除事件 */
  onClear: (_event: ITouchEvent) => void;
  /** 确认事件 */
  onConfirm: (_value: string, event: ITouchEvent) => void;
  /** 输入事件 */
  onInput: (_value: string, event: ITouchEvent) => void;
  /** 键盘高度变化事件 */
  onKeyboardHeightChange: (_height: number, event: ITouchEvent) => void;
}

/** 输入框样式配置接口 */
export interface InputStyleConfig {
  /** 输入框基础样式 */
  base: React.CSSProperties;
  /** 输入框尺寸样式 */
  sizes: Record<InputSize, React.CSSProperties>;
  /** 输入框变体样式 */
  variants: Record<InputVariant, React.CSSProperties>;
  /** 输入框状态样式 */
  statuses: Record<InputStatus, React.CSSProperties>;
  /** 前缀样式 */
  prefix: React.CSSProperties;
  /** 后缀样式 */
  suffix: React.CSSProperties;
  /** 标签样式 */
  label: React.CSSProperties;
  /** 辅助文本样式 */
  helperText: React.CSSProperties;
  /** 错误文本样式 */
  errorText: React.CSSProperties;
  /** 计数器样式 */
  counter: React.CSSProperties;
  /** 清除按钮样式 */
  clearButton: React.CSSProperties;
  /** 密码切换按钮样式 */
  passwordToggle: React.CSSProperties;
}

/** 输入框上下文接口 */
export interface InputContext {
  /** 输入框尺寸 */
  size: InputSize;
  /** 输入框变体 */
  variant: InputVariant;
  /** 输入框状态 */
  status: InputStatus;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否只读 */
  readonly: boolean;
  /** 是否显示边框 */
  bordered: boolean;
  /** 输入框样式配置 */
  styleConfig: InputStyleConfig;
}
