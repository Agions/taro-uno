import type { ReactNode, SelectHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 选择器尺寸 */
export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 选择器变体 */
export type SelectVariant = 'outlined' | 'filled' | 'underlined';

/** 选择器状态 */
export type SelectStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled' | 'loading';

/** 选择器模式 */
export type SelectMode = 'single' | 'multiple' | 'tags';

/** 选项类型 */
export interface SelectOption {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: ReactNode;
  /** 选项描述 */
  description?: ReactNode;
  /** 选项是否禁用 */
  disabled?: boolean;
  /** 选项分组 */
  group?: string;
  /** 选项图标 */
  icon?: ReactNode;
  /** 选项颜色 */
  color?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 选项组类型 */
export interface SelectOptionGroup {
  /** 分组标签 */
  label: ReactNode;
  /** 分组选项 */
  options: SelectOption[];
  /** 分组是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 选择器原生属性类型 */
export type SelectNativeProps = SelectHTMLAttributes<HTMLSelectElement>;

/** 选择器组件属性接口 */
export interface SelectProps extends Omit<SelectNativeProps, 'size' | 'value' | 'onChange' | 'onFocus' | 'onBlur'> {
  /** 选择器值 */
  value?: string | number | Array<string | number>;
  /** 默认值（非受控模式） */
  defaultValue?: string | number | Array<string | number>;
  /** 占位符 */
  placeholder?: string;
  /** 选择器尺寸 */
  size?: SelectSize;
  /** 选择器变体 */
  variant?: SelectVariant;
  /** 选择器状态 */
  status?: SelectStatus;
  /** 选择器模式 */
  mode?: SelectMode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否搜索 */
  showSearch?: boolean;
  /** 搜索占位符 */
  searchPlaceholder?: string;
  /** 是否支持标签输入 */
  showTags?: boolean;
  /** 标签最大数量 */
  maxTagCount?: number;
  /** 标签渲染函数 */
  tagRender?: (props: { value: string | number; label: ReactNode; onClose: () => void }) => ReactNode;
  /** 选项列表 */
  options?: Array<SelectOption | SelectOptionGroup>;
  /** 选项过滤函数 */
  filterOption?: (input: string, option: SelectOption) => boolean;
  /** 选项排序函数 */
  sortOption?: (a: SelectOption, b: SelectOption) => number;
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
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 下拉框自定义样式 */
  dropdownStyle?: React.CSSProperties;
  /** 下拉框自定义类名 */
  dropdownClassName?: string;
  /** 下拉框匹配宽度 */
  dropdownMatchSelectWidth?: boolean;
  /** 下拉框位置 */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /** 自定义样式类名 */
  className?: string;
  /** 值变化事件处理函数 */
  onChange?: (value: string | number | Array<string | number>, option: SelectOption | SelectOption[]) => void;
  /** 聚焦事件处理函数 */
  onFocus?: (event: ITouchEvent) => void;
  /** 失焦事件处理函数 */
  onBlur?: (event: ITouchEvent) => void;
  /** 下拉框打开事件处理函数 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 搜索事件处理函数 */
  onSearch?: (value: string) => void;
  /** 清除事件处理函数 */
  onClear?: (event: ITouchEvent) => void;
  /** 选项滚动事件处理函数 */
  onPopupScroll?: (event: ITouchEvent) => void;
  /** 自定义选择器样式 */
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
    expanded?: boolean;
    busy?: boolean;
  };
  /** 表单验证规则 */
  rules?: Array<{
    required?: boolean;
    message?: string;
    validator?: (value: string | number | Array<string | number>) => boolean | string | Promise<boolean | string>;
  }>;
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 选项最大数量 */
  maxCount?: number;
  /** 选项最小数量 */
  minCount?: number;
  /** 自定义验证函数 */
  validator?: (value: string | number | Array<string | number>) => boolean | string | Promise<boolean | string>;
  /** 虚拟滚动配置 */
  virtual?: boolean;
  /** 虚拟滚动高度 */
  listHeight?: number;
  /** 虚拟滚动项高度 */
  listItemHeight?: number;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 加载中文本 */
  loadingText?: string;
  /** 空状态文本 */
  notFoundContent?: ReactNode;
  /** 自定义空状态 */
  notFoundRender?: () => ReactNode;
  /** 自定义下拉渲染 */
  dropdownRender?: (menu: ReactNode) => ReactNode;
  /** 自定义选项渲染 */
  optionRender?: (option: SelectOption) => ReactNode;
  /** 自定义选项组渲染 */
  optionGroupRender?: (group: SelectOptionGroup) => ReactNode;
}

/** 选择器组件引用类型 */
export type SelectRef = {
  /** 选择器元素 */
  element: HTMLSelectElement | null;
  /** 获取选择器值 */
  getValue: () => string | number | Array<string | number>;
  /** 设置选择器值 */
  setValue: (value: string | number | Array<string | number>) => void;
  /** 聚焦选择器 */
  focus: () => void;
  /** 失焦选择器 */
  blur: () => void;
  /** 打开下拉框 */
  openDropdown: () => void;
  /** 关闭下拉框 */
  closeDropdown: () => void;
  /** 切换下拉框 */
  toggleDropdown: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置选择器状态 */
  setStatus: (status: SelectStatus) => void;
  /** 获取选择器状态 */
  getStatus: () => SelectStatus;
  /** 验证选择器值 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 清除选择器值 */
  clear: () => void;
  /** 重置选择器 */
  reset: () => void;
  /** 获取选中选项 */
  getSelectedOptions: () => SelectOption[];
  /** 搜索选项 */
  searchOptions: (keyword: string) => SelectOption[];
  /** 滚动到指定选项 */
  scrollToOption: (value: string | number) => void;
};

/** 选择器组属性接口 */
export interface SelectGroupProps {
  /** 选择器组内容 */
  children: ReactNode;
  /** 选择器组尺寸 */
  size?: SelectSize;
  /** 选择器组变体 */
  variant?: SelectVariant;
  /** 选择器组状态 */
  status?: SelectStatus;
  /** 是否紧凑布局 */
  compact?: boolean;
  /** 是否块级显示 */
  block?: boolean;
  /** 选择器组自定义样式类名 */
  className?: string;
  /** 选择器组自定义样式 */
  style?: React.CSSProperties;
}

/** 选择器工具函数接口 */
export interface SelectUtils {
  /** 格式化选项值 */
  formatOptionValue: (
    value: string | number | Array<string | number>,
    mode: SelectMode,
  ) => string | number | Array<string | number>;
  /** 验证选择器值 */
  validateValue: (
    value: string | number | Array<string | number>,
    rules: SelectProps['rules'],
  ) => { valid: boolean; message?: string };
  /** 过滤选项 */
  filterOptions: (
    options: SelectOption[],
    keyword: string,
    filterOption?: SelectProps['filterOption'],
  ) => SelectOption[];
  /** 排序选项 */
  sortOptions: (options: SelectOption[], sortOption?: SelectProps['sortOption']) => SelectOption[];
  /** 分组选项 */
  groupOptions: (options: SelectOption[]) => Array<SelectOption | SelectOptionGroup>;
  /** 扁平化选项 */
  flattenOptions: (options: Array<SelectOption | SelectOptionGroup>) => SelectOption[];
  /** 查找选项 */
  findOption: (options: Array<SelectOption | SelectOptionGroup>, value: string | number) => SelectOption | null;
  /** 查找选项组 */
  findOptionGroup: (
    options: Array<SelectOption | SelectOptionGroup>,
    value: string | number,
  ) => SelectOptionGroup | null;
  /** 获取选择器尺寸映射 */
  getSizeMap: () => Record<SelectSize, { fontSize: number; padding: string; height: number; borderRadius: number }>;
  /** 获取选择器变体映射 */
  getVariantMap: () => Record<SelectVariant, { backgroundColor: string; borderColor: string; borderWidth: number }>;
  /** 获取选择器状态映射 */
  getStatusMap: () => Record<SelectStatus, { color: string; icon?: string }>;
}

/** 选择器验证结果接口 */
export interface SelectValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 验证规则索引 */
  ruleIndex?: number;
  /** 验证时间戳 */
  timestamp: number;
}

/** 选择器事件接口 */
export interface SelectEvents {
  /** 值变化事件 */
  onChange: (value: string | number | Array<string | number>, option: SelectOption | SelectOption[]) => void;
  /** 聚焦事件 */
  onFocus: (event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (event: ITouchEvent) => void;
  /** 下拉框打开/关闭事件 */
  onDropdownVisibleChange: (open: boolean) => void;
  /** 搜索事件 */
  onSearch: (value: string) => void;
  /** 清除事件 */
  onClear: (event: ITouchEvent) => void;
  /** 选项滚动事件 */
  onPopupScroll: (event: ITouchEvent) => void;
}

/** 选择器样式配置接口 */
export interface SelectStyleConfig {
  /** 选择器基础样式 */
  base: React.CSSProperties;
  /** 选择器尺寸样式 */
  sizes: Record<SelectSize, React.CSSProperties>;
  /** 选择器变体样式 */
  variants: Record<SelectVariant, React.CSSProperties>;
  /** 选择器状态样式 */
  statuses: Record<SelectStatus, React.CSSProperties>;
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
  /** 下拉框样式 */
  dropdown: React.CSSProperties;
  /** 选项样式 */
  option: React.CSSProperties;
  /** 选项组样式 */
  optionGroup: React.CSSProperties;
  /** 标签样式 */
  tag: React.CSSProperties;
  /** 清除按钮样式 */
  clearButton: React.CSSProperties;
  /** 搜索框样式 */
  searchInput: React.CSSProperties;
}

/** 选择器上下文接口 */
export interface SelectContext {
  /** 选择器尺寸 */
  size: SelectSize;
  /** 选择器变体 */
  variant: SelectVariant;
  /** 选择器状态 */
  status: SelectStatus;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否只读 */
  readonly: boolean;
  /** 是否显示边框 */
  bordered: boolean;
  /** 选择器模式 */
  mode: SelectMode;
  /** 选择器样式配置 */
  styleConfig: SelectStyleConfig;
}

/** 标签渲染属性接口 */
export interface TagRenderProps {
  /** 标签值 */
  value: string | number;
  /** 标签标签 */
  label: ReactNode;
  /** 关闭事件处理函数 */
  onClose: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 选项渲染属性接口 */
export interface OptionRenderProps {
  /** 选项数据 */
  option: SelectOption;
  /** 是否选中 */
  selected: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 选择事件处理函数 */
  onSelect: () => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 选项组渲染属性接口 */
export interface OptionGroupRenderProps {
  /** 选项组数据 */
  group: SelectOptionGroup;
  /** 是否禁用 */
  disabled: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 下拉框渲染属性接口 */
export interface DropdownRenderProps {
  /** 菜单内容 */
  menu: ReactNode;
  /** 是否显示 */
  visible: boolean;
  /** 选择器尺寸 */
  size: SelectSize;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}
