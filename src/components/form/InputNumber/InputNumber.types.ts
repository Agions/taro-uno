import React from 'react';
import type { CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 数字输入框尺寸 */
export type InputNumberSize = 'sm' | 'md' | 'lg';

/** 数字输入框变体 */
export type InputNumberVariant = 'outlined' | 'filled' | 'underlined';

/** 数字输入框状态 */
export type InputNumberStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled';

/** 控制器位置 */
export type InputNumberControlsPosition = 'start' | 'end';

/** 数字格式化类型 */
export type InputNumberFormatter = 'currency' | 'percent' | 'decimal' | 'integer' | 'custom';

/** 步进模式 */
export type InputNumberStepMode = 'continuous' | 'discrete';

/** 清除按钮触发时机 */
export type InputNumberClearTrigger = 'always' | 'focus' | 'never';

/** 数字输入框原生属性类型 */
export type InputNumberNativeProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'onFocus' | 'onBlur' | 'onInput' | 'prefix'>;

/** 验证规则 */
export interface InputNumberRule {
  /** 是否必填 */
  required?: boolean;
  /** 错误消息 */
  message?: string;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 自定义验证函数 */
  validator?: (_value: number) => boolean | string | Promise<boolean | string>;
}

/** 数字格式化配置 */
export interface InputNumberFormatConfig {
  /** 格式化类型 */
  type: InputNumberFormatter;
  /** 小数位数 */
  precision?: number;
  /** 千分位分隔符 */
  thousandsSeparator?: string;
  /** 小数点分隔符 */
  decimalSeparator?: string;
  /** 货币符号 */
  currencySymbol?: string;
  /** 货币符号位置 */
  currencySymbolPosition?: 'prefix' | 'suffix';
  /** 自定义格式化函数 */
  customFormatter?: (_value: number) => string;
  /** 自定义解析函数 */
  customParser?: (_text: string) => number;
}

/** 数字输入框组件属性接口 */
export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'onFocus' | 'onBlur' | 'onInput' | 'disabled' | 'readOnly' | 'autoFocus' | 'maxLength' | 'minLength' | 'defaultValue' | 'prefix'> {
  /** 数字值 */
  value?: number | null;
  /** 默认值（非受控模式） */
  defaultValue?: number | null;
  /** 占位符 */
  placeholder?: string;
  /** 数字输入框尺寸 */
  size?: InputNumberSize;
  /** 数字输入框变体 */
  variant?: InputNumberVariant;
  /** 数字输入框状态 */
  status?: InputNumberStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步进值 */
  step?: number;
  /** 步进模式 */
  stepMode?: InputNumberStepMode;
  /** 精度（小数位数） */
  precision?: number;
  /** 是否显示控制器 */
  controls?: boolean;
  /** 控制器位置 */
  controlsPosition?: InputNumberControlsPosition;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除按钮触发时机 */
  clearTrigger?: InputNumberClearTrigger;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 标签文本 */
  label?: React.ReactNode;
  /** 辅助文本 */
  helperText?: React.ReactNode;
  /** 错误文本 */
  errorText?: React.ReactNode;
  /** 前缀图标或文本 */
  prefix?: React.ReactNode;
  /** 后缀图标或文本 */
  suffix?: React.ReactNode;
  /** 数字格式化配置 */
  formatConfig?: InputNumberFormatConfig;
  /** 验证规则 */
  rules?: InputNumberRule[];
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 自定义验证函数 */
  validator?: (_value: number) => boolean | string | Promise<boolean | string>;
  /** 值变化事件处理函数 */
  onChange?: (_value: number | null, event: ITouchEvent) => void;
  /** 聚焦事件处理函数 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失焦事件处理函数 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 输入事件处理函数 */
  onInput?: (_value: number | null, event: ITouchEvent) => void;
  /** 清除事件处理函数 */
  onClear?: (_event: ITouchEvent) => void;
  /** 步进事件处理函数 */
  onStep?: (_value: number, direction: 'up' | 'down', event: ITouchEvent) => void;
  /** 验证事件处理函数 */
  onValidate?: (_result: InputNumberValidationResult) => void;
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
    valueNow?: number;
    valueMin?: number;
    valueMax?: number;
    valueStep?: number;
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

/** 数字输入框组件引用类型 */
export type InputNumberRef = {
  /** 输入框元素 */
  element: HTMLInputElement | null;
  /** 获取输入框值 */
  getValue: () => number | null;
  /** 设置输入框值 */
  setValue: (_value: number | null) => void;
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
  setStatus: (_status: InputNumberStatus) => void;
  /** 获取输入框状态 */
  getStatus: () => InputNumberStatus;
  /** 验证输入框值 */
  validate: () => Promise<InputNumberValidationResult>;
  /** 清除输入框值 */
  clear: () => void;
  /** 重置输入框 */
  reset: () => void;
  /** 增加数值 */
  stepUp: (step?: number) => void;
  /** 减少数值 */
  stepDown: (step?: number) => void;
  /** 获取验证结果 */
  getValidationResult: () => InputNumberValidationResult | null;
};

/** 数字输入框验证结果接口 */
export interface InputNumberValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证规则索引 */
  ruleIndex?: number;
  /** 验证时间戳 */
  timestamp: number;
  /** 验证值 */
  value: number | null;
}

/** 数字输入框上下文接口 */
export interface InputNumberContext {
  /** 数字输入框实例 */
  inputNumber: {
    value: number | null;
    status: InputNumberStatus;
    disabled: boolean;
    readonly: boolean;
    validationResult: InputNumberValidationResult | null;
  };
  /** 数字输入框配置 */
  config: {
    size: InputNumberSize;
    variant: InputNumberVariant;
    validateTrigger: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
    step: number;
    precision: number;
    min?: number;
    max?: number;
  };
  /** 样式配置 */
  styleConfig: InputNumberStyleConfig;
}

/** 数字输入框样式配置接口 */
export interface InputNumberStyleConfig {
  /** 基础样式 */
  base: CSSProperties;
  /** 尺寸样式 */
  sizes: Record<InputNumberSize, CSSProperties>;
  /** 变体样式 */
  variants: Record<InputNumberVariant, CSSProperties>;
  /** 状态样式 */
  statuses: Record<InputNumberStatus, CSSProperties>;
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
  /** 控制器样式 */
  controls: CSSProperties;
  /** 控制器按钮样式 */
  controlButton: CSSProperties;
  /** 清除按钮样式 */
  clearButton: CSSProperties;
  /** 容器样式 */
  container: CSSProperties;
  /** 包装器样式 */
  wrapper: CSSProperties;
}

/** 数字输入框工具函数接口 */
export interface InputNumberUtils {
  /** 格式化数字值 */
  formatValue: (_value: number | null, config: InputNumberFormatConfig) => string;
  /** 解析数字值 */
  parseValue: (_text: string, config: InputNumberFormatConfig) => number | null;
  /** 验证数字值 */
  validateValue: (_value: number | null, rules?: InputNumberRule[]) => Promise<InputNumberValidationResult>;
  /** 限制数字范围 */
  clampValue: (_value: number, min?: number, max?: number) => number;
  /** 四舍五入到指定精度 */
  roundValue: (_value: number, precision: number) => number;
  /** 获取无障碍状态 */
  getAccessibilityState: (_props: InputNumberProps, status: InputNumberStatus) => any;
}

/** 数字输入框事件接口 */
export interface InputNumberEvents {
  /** 值变化事件 */
  onChange: (_value: number | null, event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus: (_event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (_event: ITouchEvent) => void;
  /** 输入事件 */
  onInput: (_value: number | null, event: ITouchEvent) => void;
  /** 清除事件 */
  onClear: (_event: ITouchEvent) => void;
  /** 步进事件 */
  onStep: (_value: number, direction: 'up' | 'down', event: ITouchEvent) => void;
  /** 验证事件 */
  onValidate: (_result: InputNumberValidationResult) => void;
}