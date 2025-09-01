import type { ReactNode, InputHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 单选框尺寸 */
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 单选框状态 */
export type RadioStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled';

/** 单选框变体 */
export type RadioVariant = 'default' | 'filled' | 'outlined';

/** 单选框颜色主题 */
export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/** 单选框原生属性类型 */
export type RadioNativeProps = InputHTMLAttributes<HTMLInputElement>;

/** 单选框组件属性接口 */
export interface RadioProps extends Omit<RadioNativeProps, 'size' | 'checked' | 'onChange'> {
  /** 单选框值 */
  value: string | number;
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中状态（非受控模式） */
  defaultChecked?: boolean;
  /** 单选框尺寸 */
  size?: RadioSize;
  /** 单选框状态 */
  status?: RadioStatus;
  /** 单选框变体 */
  variant?: RadioVariant;
  /** 单选框颜色主题 */
  color?: RadioColor;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 标签文本 */
  label?: ReactNode;
  /** 标签位置 */
  labelPosition?: 'left' | 'right';
  /** 辅助文本 */
  helperText?: ReactNode;
  /** 错误文本 */
  errorText?: ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否圆角 */
  rounded?: boolean;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 选中时的图标 */
  checkedIcon?: ReactNode;
  /** 未选中时的图标 */
  uncheckedIcon?: ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 变化事件处理函数 */
  onChange?: (checked: boolean, event: ITouchEvent) => void;
  /** 点击事件处理函数 */
  onClick?: (event: ITouchEvent) => void;
  /** 自定义样式 */
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
    checked?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
  /** 表单验证规则 */
  rules?: Array<{
    required?: boolean;
    message?: string;
    validator?: (checked: boolean) => boolean | string | Promise<boolean | string>;
  }>;
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 自定义验证函数 */
  validator?: (checked: boolean) => boolean | string | Promise<boolean | string>;
  /** 动画效果 */
  animation?: boolean;
  /** 动画时长 */
  animationDuration?: number;
  /** 涟漪效果 */
  ripple?: boolean;
  /** 涟漪颜色 */
  rippleColor?: string;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** Tab 键顺序 */
  tabIndex?: number;
  /** 数据属性 */
  data?: Record<string, any>;
}

/** 单选框组件引用类型 */
export type RadioRef = {
  /** 单选框元素 */
  element: HTMLInputElement | null;
  /** 获取选中状态 */
  getChecked: () => boolean;
  /** 设置选中状态 */
  setChecked: (checked: boolean) => void;
  /** 切换选中状态 */
  toggle: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置单选框状态 */
  setStatus: (status: RadioStatus) => void;
  /** 获取单选框状态 */
  getStatus: () => RadioStatus;
  /** 设置单选框尺寸 */
  setSize: (size: RadioSize) => void;
  /** 设置单选框颜色 */
  setColor: (color: RadioColor) => void;
  /** 验证单选框 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 重置单选框 */
  reset: () => void;
  /** 获取单选框数据 */
  getData: () => Record<string, any> | undefined;
  /** 设置单选框数据 */
  setData: (data: Record<string, any>) => void;
  /** 聚焦单选框 */
  focus: () => void;
  /** 失焦单选框 */
  blur: () => void;
  /** 震动效果 - 用于错误提示 */
  shake: () => void;
  /** 脉冲效果 - 用于吸引用户注意 */
  pulse: () => void;
};

/** 单选框组属性接口 */
export interface RadioGroupProps {
  /** 单选框组内容 */
  children: ReactNode;
  /** 单选框组值 */
  value?: string | number;
  /** 默认值（非受控模式） */
  defaultValue?: string | number;
  /** 单选框组尺寸 */
  size?: RadioSize;
  /** 单选框组状态 */
  status?: RadioStatus;
  /** 单选框组变体 */
  variant?: RadioVariant;
  /** 单选框组颜色主题 */
  color?: RadioColor;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical';
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end';
  /** 间距 */
  spacing?: number | string;
  /** 选项列表 */
  options?: Array<{
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
    description?: ReactNode;
    icon?: ReactNode;
    color?: RadioColor;
    data?: Record<string, any>;
  }>;
  /** 变化事件处理函数 */
  onChange?: (selectedValue: string | number) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否必填 */
  required?: boolean;
  /** 是否紧凑布局 */
  compact?: boolean;
  /** 是否块级显示 */
  block?: boolean;
  /** 分组标题 */
  groupTitle?: ReactNode;
  /** 分组描述 */
  groupDescription?: ReactNode;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
}

/** 单选框组组件引用类型 */
export type RadioGroupRef = {
  /** 获取选中值 */
  getValue: () => string | number | undefined;
  /** 设置选中值 */
  setValue: (value: string | number) => void;
  /** 清除选择 */
  clear: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置组状态 */
  setStatus: (status: RadioStatus) => void;
  /** 验证单选框组 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 重置单选框组 */
  reset: () => void;
  /** 获取选中的选项数据 */
  getSelectedOption: () => {
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
    description?: ReactNode;
    icon?: ReactNode;
    color?: RadioColor;
    data?: Record<string, any>;
  } | null;
  /** 根据值获取选项 */
  getOptionByValue: (value: string | number) => any;
  /** 根据值设置选项状态 */
  setOptionDisabled: (value: string | number, disabled: boolean) => void;
  /** 批量设置选项状态 */
  setOptionsDisabled: (values: Array<string | number>, disabled: boolean) => void;
  /** 聚焦组 */
  focus: () => void;
  /** 失焦组 */
  blur: () => void;
};

/** 单选框样式配置接口 */
export interface RadioStyleConfig {
  /** 单选框基础样式 */
  base: React.CSSProperties;
  /** 单选框尺寸样式 */
  sizes: Record<RadioSize, React.CSSProperties>;
  /** 单选框状态样式 */
  statuses: Record<RadioStatus, React.CSSProperties>;
  /** 单选框变体样式 */
  variants: Record<RadioVariant, React.CSSProperties>;
  /** 单选框颜色样式 */
  colors: Record<RadioColor, React.CSSProperties>;
  /** 单选框图标样式 */
  icon: React.CSSProperties;
  /** 单选框标签样式 */
  label: React.CSSProperties;
  /** 单选框辅助文本样式 */
  helperText: React.CSSProperties;
  /** 单选框错误文本样式 */
  errorText: React.CSSProperties;
  /** 单选框组样式 */
  group: React.CSSProperties;
  /** 单选框组项目样式 */
  groupItem: React.CSSProperties;
  /** 单选框涟漪效果样式 */
  ripple: React.CSSProperties;
  /** 单选框动画样式 */
  animation: React.CSSProperties;
}

/** 单选框上下文接口 */
export interface RadioContext {
  /** 单选框组值 */
  value: string | number | undefined;
  /** 单选框组尺寸 */
  size: RadioSize;
  /** 单选框组状态 */
  status: RadioStatus;
  /** 单选框组变体 */
  variant: RadioVariant;
  /** 单选框组颜色主题 */
  color: RadioColor;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否只读 */
  readonly: boolean;
  /** 布局方向 */
  direction: 'horizontal' | 'vertical';
  /** 变化事件处理函数 */
  onChange: (checked: boolean, value: string | number) => void;
  /** 单选框样式配置 */
  styleConfig: RadioStyleConfig;
}

/** 单选框验证结果接口 */
export interface RadioValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证规则索引 */
  ruleIndex?: number;
  /** 验证时间戳 */
  timestamp: number;
}

/** 单选框事件接口 */
export interface RadioEvents {
  /** 值变化事件 */
  onChange: (checked: boolean, event: ITouchEvent) => void;
  /** 点击事件 */
  onClick: (event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus: (event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (event: ITouchEvent) => void;
}

/** 单选框组事件接口 */
export interface RadioGroupEvents {
  /** 值变化事件 */
  onChange: (selectedValue: string | number) => void;
}

/** 单选框工具函数接口 */
export interface RadioUtils {
  /** 格式化单选框值 */
  formatValue: (value: string | number | boolean) => string | number;
  /** 验证单选框值 */
  validateValue: (checked: boolean, rules: RadioProps['rules']) => { valid: boolean; message?: string };
  /** 获取单选框尺寸映射 */
  getSizeMap: () => Record<RadioSize, { fontSize: number; size: number; borderRadius: number; padding: number }>;
  /** 获取单选框状态映射 */
  getStatusMap: () => Record<RadioStatus, { color: string; backgroundColor: string; borderColor: string }>;
  /** 获取单选框颜色映射 */
  getColorMap: () => Record<RadioColor, { primary: string; secondary: string; background: string }>;
  /** 生成单选框ID */
  generateId: (prefix?: string) => string;
  /** 生成涟漪效果 */
  createRipple: (event: ITouchEvent, element: HTMLElement, color?: string) => void;
}

/** 单选框选项接口 */
export interface RadioOption {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: ReactNode;
  /** 选项描述 */
  description?: ReactNode;
  /** 选项是否禁用 */
  disabled?: boolean;
  /** 选项图标 */
  icon?: ReactNode;
  /** 选项颜色 */
  color?: RadioColor;
  /** 选项自定义样式 */
  style?: React.CSSProperties;
  /** 选项自定义类名 */
  className?: string;
  /** 选项数据 */
  data?: Record<string, any>;
}

/** 单选框配置接口 */
export interface RadioConfig {
  /** 默认尺寸 */
  defaultSize: RadioSize;
  /** 默认状态 */
  defaultStatus: RadioStatus;
  /** 默认变体 */
  defaultVariant: RadioVariant;
  /** 默认颜色 */
  defaultColor: RadioColor;
  /** 默认标签位置 */
  defaultLabelPosition: 'left' | 'right';
  /** 默认布局方向 */
  defaultDirection: 'horizontal' | 'vertical';
  /** 默认动画时长 */
  defaultAnimationDuration: number;
  /** 默认涟漪颜色 */
  defaultRippleColor: string;
  /** 是否启用动画 */
  enableAnimation: boolean;
  /** 是否启用涟漪效果 */
  enableRipple: boolean;
  /** 是否启用无障碍访问 */
  enableAccessibility: boolean;
}
