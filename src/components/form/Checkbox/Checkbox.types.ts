import type { ReactNode, InputHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 复选框尺寸 */
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 复选框状态 */
export type CheckboxStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled';

/** 复选框变体 */
export type CheckboxVariant = 'default' | 'filled' | 'outlined';

/** 复选框颜色主题 */
export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/** 复选框原生属性类型 */
export type CheckboxNativeProps = InputHTMLAttributes<HTMLInputElement>;

/** 复选框组件属性接口 */
export interface CheckboxProps extends Omit<CheckboxNativeProps, 'size' | 'checked' | 'onChange' | 'onClick'> {
  /** 复选框值 */
  value?: string | number;
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中状态（非受控模式） */
  defaultChecked?: boolean;
  /** 复选框尺寸 */
  size?: CheckboxSize;
  /** 复选框状态 */
  status?: CheckboxStatus;
  /** 复选框变体 */
  variant?: CheckboxVariant;
  /** 复选框颜色主题 */
  color?: CheckboxColor;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否半选状态 */
  indeterminate?: boolean;
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
  /** 半选时的图标 */
  indeterminateIcon?: ReactNode;
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
    indeterminate?: boolean;
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
  /** 容器样式 */
  containerStyle?: React.CSSProperties;
  /** 包装器样式 */
  wrapperStyle?: React.CSSProperties;
  /** 图标样式 */
  iconStyle?: React.CSSProperties;
  /** 标签样式 */
  labelStyle?: React.CSSProperties;
  /** 辅助文本样式 */
  helperTextStyle?: React.CSSProperties;
  /** 错误文本样式 */
  errorTextStyle?: React.CSSProperties;
}

/** 复选框组件引用类型 */
export type CheckboxRef = {
  /** 复选框元素 */
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
  /** 设置半选状态 */
  setIndeterminate: (indeterminate: boolean) => void;
  /** 设置复选框状态 */
  setStatus: (status: CheckboxStatus) => void;
  /** 获取复选框状态 */
  getStatus: () => CheckboxStatus;
  /** 设置复选框尺寸 */
  setSize: (size: CheckboxSize) => void;
  /** 设置复选框颜色 */
  setColor: (color: CheckboxColor) => void;
  /** 验证复选框 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 重置复选框 */
  reset: () => void;
  /** 聚焦复选框 */
  focus: () => void;
  /** 失焦复选框 */
  blur: () => void;
  /** 获取复选框数据 */
  getData: () => Record<string, any> | undefined;
  /** 设置复选框数据 */
  setData: (data: Record<string, any>) => void;
  /** 震动效果 - 用于错误提示 */
  shake: () => void;
  /** 脉冲效果 - 用于吸引用户注意 */
  pulse: () => void;
};

/** 复选框组属性接口 */
export interface CheckboxGroupProps {
  /** 复选框组内容 */
  children: ReactNode;
  /** 复选框组值 */
  value?: Array<string | number>;
  /** 默认值（非受控模式） */
  defaultValue?: Array<string | number>;
  /** 复选框组尺寸 */
  size?: CheckboxSize;
  /** 复选框组状态 */
  status?: CheckboxStatus;
  /** 复选框组变体 */
  variant?: CheckboxVariant;
  /** 复选框组颜色主题 */
  color?: CheckboxColor;
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
    color?: CheckboxColor;
    data?: Record<string, any>;
    style?: React.CSSProperties;
    className?: string;
  }>;
  /** 变化事件处理函数 */
  onChange?: (checkedValues: Array<string | number>) => void;
  /** 全选变化事件处理函数 */
  onAllChange?: (checked: boolean) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 最大选择数量 */
  maxCount?: number;
  /** 最小选择数量 */
  minCount?: number;
  /** 是否显示全选按钮 */
  showSelectAll?: boolean;
  /** 全选按钮文本 */
  selectAllText?: string;
  /** 是否显示计数 */
  showCount?: boolean;
  /** 计数文本格式 */
  countText?: (selected: number, total: number) => string;
  /** 是否允许取消全选 */
  allowDeselectAll?: boolean;
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
  /** 是否启用无障碍访问 */
  accessible?: boolean;
}

/** 复选框组组件引用类型 */
export type CheckboxGroupRef = {
  /** 获取选中值 */
  getValue: () => Array<string | number>;
  /** 设置选中值 */
  setValue: (values: Array<string | number>) => void;
  /** 全选 */
  selectAll: () => void;
  /** 取消全选 */
  unselectAll: () => void;
  /** 反选 */
  toggleAll: () => void;
  /** 获取选中数量 */
  getCheckedCount: () => number;
  /** 获取总数量 */
  getTotalCount: () => number;
  /** 是否全选 */
  isAllSelected: () => boolean;
  /** 是否部分选中 */
  isIndeterminate: () => boolean;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置组状态 */
  setStatus: (status: CheckboxStatus) => void;
  /** 验证复选框组 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 重置复选框组 */
  reset: () => void;
  /** 获取选中的选项数据 */
  getSelectedOptions: () => Array<{
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
    description?: ReactNode;
    icon?: ReactNode;
    color?: CheckboxColor;
    data?: Record<string, any>;
  }>;
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

/** 复选框样式配置接口 */
export interface CheckboxStyleConfig {
  /** 复选框基础样式 */
  base: React.CSSProperties;
  /** 复选框尺寸样式 */
  sizes: Record<CheckboxSize, React.CSSProperties>;
  /** 复选框状态样式 */
  statuses: Record<CheckboxStatus, React.CSSProperties>;
  /** 复选框变体样式 */
  variants: Record<CheckboxVariant, React.CSSProperties>;
  /** 复选框颜色样式 */
  colors: Record<CheckboxColor, React.CSSProperties>;
  /** 复选框图标样式 */
  icon: React.CSSProperties;
  /** 复选框标签样式 */
  label: React.CSSProperties;
  /** 复选框辅助文本样式 */
  helperText: React.CSSProperties;
  /** 复选框错误文本样式 */
  errorText: React.CSSProperties;
  /** 复选框组样式 */
  group: React.CSSProperties;
  /** 复选框组项目样式 */
  groupItem: React.CSSProperties;
  /** 复选框涟漪效果样式 */
  ripple: React.CSSProperties;
  /** 复选框动画样式 */
  animation: React.CSSProperties;
}

/** 复选框上下文接口 */
export interface CheckboxContext {
  /** 复选框组值 */
  value: Array<string | number>;
  /** 复选框组尺寸 */
  size: CheckboxSize;
  /** 复选框组状态 */
  status: CheckboxStatus;
  /** 复选框组变体 */
  variant: CheckboxVariant;
  /** 复选框组颜色主题 */
  color: CheckboxColor;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否只读 */
  readonly: boolean;
  /** 布局方向 */
  direction: 'horizontal' | 'vertical';
  /** 变化事件处理函数 */
  onChange: (checked: boolean, value: string | number) => void;
  /** 复选框样式配置 */
  styleConfig: CheckboxStyleConfig;
}

/** 复选框验证结果接口 */
export interface CheckboxValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证规则索引 */
  ruleIndex?: number;
  /** 验证时间戳 */
  timestamp: number;
}

/** 复选框事件接口 */
export interface CheckboxEvents {
  /** 值变化事件 */
  onChange: (checked: boolean, event: ITouchEvent) => void;
  /** 点击事件 */
  onClick: (event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus: (event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (event: ITouchEvent) => void;
}

/** 复选框组事件接口 */
export interface CheckboxGroupEvents {
  /** 值变化事件 */
  onChange: (checkedValues: Array<string | number>) => void;
  /** 全选变化事件 */
  onAllChange: (checked: boolean) => void;
}

/** 复选框工具函数接口 */
export interface CheckboxUtils {
  /** 格式化复选框值 */
  formatValue: (value: string | number | boolean) => string | number;
  /** 验证复选框值 */
  validateValue: (checked: boolean, rules: CheckboxProps['rules']) => { valid: boolean; message?: string };
  /** 获取复选框尺寸映射 */
  getSizeMap: () => Record<CheckboxSize, { fontSize: number; size: number; borderRadius: number; padding: number }>;
  /** 获取复选框状态映射 */
  getStatusMap: () => Record<CheckboxStatus, { color: string; backgroundColor: string; borderColor: string }>;
  /** 获取复选框颜色映射 */
  getColorMap: () => Record<CheckboxColor, { primary: string; secondary: string; background: string }>;
  /** 生成复选框ID */
  generateId: (prefix?: string) => string;
  /** 生成涟漪效果 */
  createRipple: (event: ITouchEvent, element: HTMLElement, color?: string) => void;
  /** 计算复选框组选中状态 */
  calculateGroupState: (
    values: Array<string | number>,
    options: Array<any>,
  ) => {
    allSelected: boolean;
    indeterminate: boolean;
    selectedCount: number;
  };
}

/** 复选框选项接口 */
export interface CheckboxOption {
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
  color?: CheckboxColor;
  /** 选项自定义样式 */
  style?: React.CSSProperties;
  /** 选项自定义类名 */
  className?: string;
  /** 选项数据 */
  data?: Record<string, any>;
}

/** 复选框组选项接口 */
export interface CheckboxGroupOption extends CheckboxOption {
  /** 选项是否选中 */
  checked?: boolean;
  /** 选项是否部分选中 */
  indeterminate?: boolean;
  /** 选项自定义样式 */
  style?: React.CSSProperties;
  /** 选项自定义类名 */
  className?: string;
}

/** 复选框配置接口 */
export interface CheckboxConfig {
  /** 默认尺寸 */
  defaultSize: CheckboxSize;
  /** 默认状态 */
  defaultStatus: CheckboxStatus;
  /** 默认变体 */
  defaultVariant: CheckboxVariant;
  /** 默认颜色 */
  defaultColor: CheckboxColor;
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
