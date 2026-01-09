/**
 * Taro-Uno AutoComplete Component Types
 * 自动完成组件类型定义
 */

// 自动完成选项类型
export interface AutoCompleteOption {
  // 选项值
  value: string;
  // 选项标签
  label: string;
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 选项图标
  icon?: React.ReactNode;
  // 选项描述
  description?: string;
  // 其他自定义属性
  [key: string]: any;
}

// 自动完成方向
export type AutoCompleteDirection = 'top' | 'bottom' | 'left' | 'right';

// 自动完成主题
export type AutoCompleteTheme = 'light' | 'dark' | 'primary';

// 自动完成状态
export type AutoCompleteStatus = 'default' | 'success' | 'warning' | 'error';

// 自动完成大小
export type AutoCompleteSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 自动完成配置
export interface AutoCompleteConfig {
  // 方向
  direction?: AutoCompleteDirection;
  // 主题
  theme?: AutoCompleteTheme;
  // 大小
  size?: AutoCompleteSize;
  // 状态
  status?: AutoCompleteStatus;
  // 是否显示清除按钮
  showClear?: boolean;
  // 是否显示搜索图标
  showSearchIcon?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否只读
  readOnly?: boolean;
  // 是否必填
  required?: boolean;
  // 占位符
  placeholder?: string;
  // 防抖延迟（毫秒）
  debounceDelay?: number;
  // 最小输入长度
  minLength?: number;
  // 最大显示选项数
  maxOptions?: number;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 自动完成属性
export interface AutoCompleteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  // 自动完成配置
  config?: AutoCompleteConfig;
  // 选项列表
  options?: AutoCompleteOption[] | string[];
  // 可见性控制
  visible?: boolean;
  // 默认可见性
  defaultVisible?: boolean;
  // 方向
  direction?: AutoCompleteDirection;
  // 主题
  theme?: AutoCompleteTheme;
  // 大小
  size?: AutoCompleteSize;
  // 状态
  status?: AutoCompleteStatus;
  // 占位符
  placeholder?: string;
  // 值
  value?: string;
  // 默认值
  defaultValue?: string;
  // 是否显示清除按钮
  showClear?: boolean;
  // 是否显示搜索图标
  showSearchIcon?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否只读
  readOnly?: boolean;
  // 是否必填
  required?: boolean;
  // 防抖延迟（毫秒）
  debounceDelay?: number;
  // 最小输入长度
  minLength?: number;
  // 最大显示选项数
  maxOptions?: number;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 输入框类名
  inputClassName?: string;
  // 输入框样式
  inputStyle?: React.CSSProperties;
  // 选项容器类名
  optionsClassName?: string;
  // 选项容器样式
  optionsStyle?: React.CSSProperties;
  // 选项类名
  optionClassName?: string;
  // 选项样式
  optionStyle?: React.CSSProperties;
  // 值变化回调
  onChange?: (value: string, option?: AutoCompleteOption) => void;
  // 选项选择回调
  onSelect?: (option: AutoCompleteOption, value: string) => void;
  // 可见性变化回调
  onVisibleChange?: (visible: boolean) => void;
  // 搜索回调
  onSearch?: (value: string) => void;
  // 清除回调
  onClear?: () => void;
  // 输入回调
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 聚焦回调
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // 失焦回调
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // 自定义渲染选项
  renderOption?: (option: AutoCompleteOption, index: number) => React.ReactNode;
  // 自定义渲染输入框前置内容
  renderPrefix?: () => React.ReactNode;
  // 自定义渲染输入框后置内容
  renderSuffix?: () => React.ReactNode;
  // 加载状态
  loading?: boolean;
  // 自定义渲染加载状态
  renderLoading?: () => React.ReactNode;
  // 空状态
  emptyText?: string;
  // 自定义渲染空状态
  renderEmpty?: () => React.ReactNode;
  // 过滤函数
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;
  // 防抖函数
  debounceFn?: (fn: () => void, delay: number) => () => void;
}

// 自动完成引用
export interface AutoCompleteRef {
  // 获取输入框引用
  getInputRef: () => HTMLInputElement | null;
  // 聚焦输入框
  focus: () => void;
  // 失焦输入框
  blur: () => void;
  // 清除输入
  clear: () => void;
  // 显示选项
  showOptions: () => void;
  // 隐藏选项
  hideOptions: () => void;
  // 切换选项可见性
  toggleOptions: () => void;
  // 获取当前值
  getValue: () => string;
  // 设置值
  setValue: (value: string) => void;
}
