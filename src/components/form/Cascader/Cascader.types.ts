import type { ReactNode, CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 级联选择器选项类型 */
export interface CascaderOption {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: ReactNode;
  /** 子选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 级联选择器值类型 */
export type CascaderValue = (string | number)[];

/** 级联选择器尺寸 */
export type CascaderSize = 'small' | 'medium' | 'large';

/** 级联选择器状态 */
export type CascaderStatus = 'default' | 'error' | 'warning' | 'success';

/** 级联选择器变体 */
export type CascaderVariant = 'outlined' | 'filled' | 'borderless';

/** 级联选择器展开方式 */
export type CascaderExpandTrigger = 'click' | 'hover';

/** 级联选择器方向 */
export type CascaderDirection = 'ltr' | 'rtl';

/** 级联选择器原生属性 */
export interface CascaderNativeProps {
  /** 组件唯一标识 */
  id?: string;
  /** 组件类名 */
  className?: string;
  /** 组件样式 */
  style?: CSSProperties;
  /** 点击事件 */
  onClick?: (_event: ITouchEvent) => void;
  /** 长按事件 */
  onLongPress?: (_event: ITouchEvent) => void;
  /** 触摸开始事件 */
  onTouchStart?: (_event: ITouchEvent) => void;
  /** 触摸移动事件 */
  onTouchMove?: (_event: ITouchEvent) => void;
  /** 触摸结束事件 */
  onTouchEnd?: (_event: ITouchEvent) => void;
  /** 触摸取消事件 */
  onTouchCancel?: (_event: ITouchEvent) => void;
  /** 数据集属性 */
  dataset?: Record<string, any>;
  /** 自定义属性 */
  [key: string]: any;
}

/** 级联选择器属性接口 */
export interface CascaderProps extends Omit<CascaderNativeProps, 'onChange' | 'onFocus' | 'onBlur'> {
  /** 选项数据 */
  options: CascaderOption[];
  /** 当前选中的值 */
  value?: CascaderValue | null;
  /** 默认选中的值 */
  defaultValue?: CascaderValue | null;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: CascaderSize;
  /** 状态 */
  status?: CascaderStatus;
  /** 变体 */
  variant?: CascaderVariant;
  /** 展开方式 */
  expandTrigger?: CascaderExpandTrigger;
  /** 方向 */
  direction?: CascaderDirection;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 输入框是否只读 */
  inputReadOnly?: boolean;
  /** 占位符样式 */
  placeholderStyle?: CSSProperties;
  /** 占位符类名 */
  placeholderClass?: string;
  /** 最大标签数量 */
  maxTagCount?: number;
  /** 最大标签占位符 */
  maxTagPlaceholder?: ReactNode;
  /** 是否展开 */
  open?: boolean;
  /** 默认是否展开 */
  defaultOpen?: boolean;
  /** 弹出层位置 */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /** 弹出层样式 */
  popupStyle?: CSSProperties;
  /** 弹出层类名 */
  popupClassName?: string;
  /** 弹出层容器样式 */
  getPopupContainer?: () => HTMLElement;
  /** 后缀图标 */
  suffixIcon?: ReactNode;
  /** 前缀图标 */
  prefix?: ReactNode;
  /** 清除图标 */
  clearIcon?: ReactNode;
  /** 菜单图标 */
  menuIcon?: ReactNode;
  /** 加载中图标 */
  loadingIcon?: ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 是否显示路径 */
  showPath?: boolean;
  /** 路径分隔符 */
  pathSeparator?: string;
  /** 是否允许选择父节点 */
  changeOnSelect?: boolean;
  /** 字段映射 */
  fieldNames?: {
    value?: string;
    label?: string;
    children?: string;
    disabled?: string;
    isLeaf?: string;
  };
  /** 加载数据函数 */
  loadData?: (_selectedOptions: CascaderOption[]) => Promise<void>;
  /** 搜索函数 */
  filterOption?: (_inputValue: string, option: CascaderOption, path: CascaderOption[]) => boolean;
  /** 自定义选项渲染 */
  optionRender?: (_option: CascaderOption, index: number) => ReactNode;
  /** 自定义下拉框渲染 */
  dropdownRender?: (_menu: ReactNode) => ReactNode;
  /** 自定义标签渲染 */
  tagRender?: (_props: { value: CascaderValue; label: ReactNode; onClose: () => void }) => ReactNode;
  /** 自定义显示渲染 */
  displayRender?: (_labels: ReactNode[], selectedOptions: CascaderOption[]) => ReactNode;
  /** 值变化回调 */
  onChange?: (_value: CascaderValue | null, selectedOptions: CascaderOption[]) => void;
  /** 多选值变化回调 */
  onMultipleChange?: (_values: CascaderValue[], selectedOptions: CascaderOption[][]) => void;
  /** 搜索回调 */
  onSearch?: (_value: string) => void;
  /** 获得焦点回调 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失去焦点回调 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 展开状态变化回调 */
  onDropdownVisibleChange?: (_open: boolean) => void;
  /** 清除回调 */
  onClear?: () => void;
  /** 选择回调 */
  onSelect?: (_value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  /** 取消选择回调 */
  onDeselect?: (_value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  /** 展开回调 */
  onExpand?: (_value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  /** 无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    expanded?: boolean;
    busy?: boolean;
    selected?: boolean;
  };
}

/** 级联选择器引用接口 */
export interface CascaderRef {
  /** 输入框元素 */
  input: HTMLInputElement | null;
  /** 获取当前值 */
  getValue: () => CascaderValue | null;
  /** 设置值 */
  setValue: (_value: CascaderValue | null) => void;
  /** 获取选中的选项 */
  getSelectedOptions: () => CascaderOption[];
  /** 设置选项 */
  setOptions: (_options: CascaderOption[]) => void;
  /** 聚焦 */
  focus: () => void;
  /** 失焦 */
  blur: () => void;
  /** 打开下拉框 */
  open: () => void;
  /** 关闭下拉框 */
  close: () => void;
  /** 清除选择 */
  clear: () => void;
  /** 禁用 */
  disable: () => void;
  /** 启用 */
  enable: () => void;
  /** 搜索 */
  search: (_value: string) => void;
  /** 展开到指定路径 */
  expandToPath: (_path: CascaderValue) => void;
  /** 重置 */
  reset: () => void;
}

/** 级联选择器配置接口 */
export interface CascaderConfig {
  /** 选项数据 */
  options: CascaderOption[];
  /** 默认值 */
  defaultValue?: CascaderValue | null;
  /** 尺寸 */
  size?: CascaderSize;
  /** 状态 */
  status?: CascaderStatus;
  /** 变体 */
  variant?: CascaderVariant;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 展开方式 */
  expandTrigger?: CascaderExpandTrigger;
  /** 是否允许选择父节点 */
  changeOnSelect?: boolean;
  /** 字段映射 */
  fieldNames?: {
    value?: string;
    label?: string;
    children?: string;
    disabled?: string;
    isLeaf?: string;
  };
  /** 路径分隔符 */
  pathSeparator?: string;
}

/** 级联选择器工具函数接口 */
export interface CascaderUtils {
  /** 查找选项路径 */
  findOptionPath: (
    _options: CascaderOption[],
    value: CascaderValue,
    fieldNames?: CascaderProps['fieldNames'],
  ) => CascaderOption[];
  /** 过滤选项 */
  filterOptions: (
    _options: CascaderOption[],
    inputValue: string,
    filterOption?: CascaderProps['filterOption'],
  ) => CascaderOption[];
  /** 格式化显示值 */
  formatDisplayValue: (
    _labels: ReactNode[],
    selectedOptions: CascaderOption[],
    config?: { showPath?: boolean; pathSeparator?: string },
  ) => ReactNode;
  /** 验证值 */
  validateValue: (
    _value: CascaderValue,
    options: CascaderOption[],
    fieldNames?: CascaderProps['fieldNames'],
  ) => boolean;
  /** 展平选项 */
  flattenOptions: (_options: CascaderOption[], fieldNames?: CascaderProps['fieldNames']) => CascaderOption[];
  /** 生成选项树 */
  generateOptionTree: (_options: CascaderOption[], fieldNames?: CascaderProps['fieldNames']) => CascaderOption[];
  /** 获取叶子节点 */
  getLeafOptions: (_options: CascaderOption[], fieldNames?: CascaderProps['fieldNames']) => CascaderOption[];
  /** 获取禁用选项 */
  getDisabledOptions: (_options: CascaderOption[], fieldNames?: CascaderProps['fieldNames']) => CascaderOption[];
}

/** 级联选择器事件接口 */
export interface CascaderEvents {
  /** 值变化事件 */
  onChange?: (_value: CascaderValue | null, selectedOptions: CascaderOption[]) => void;
  /** 多选值变化事件 */
  onMultipleChange?: (_values: CascaderValue[], selectedOptions: CascaderOption[][]) => void;
  /** 搜索事件 */
  onSearch?: (_value: string) => void;
  /** 聚焦事件 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 展开状态变化事件 */
  onDropdownVisibleChange?: (_open: boolean) => void;
  /** 清除事件 */
  onClear?: () => void;
  /** 选择事件 */
  onSelect?: (_value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  /** 取消选择事件 */
  onDeselect?: (_value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  /** 展开事件 */
  onExpand?: (_value: CascaderValue, selectedOptions: CascaderOption[]) => void;
}

/** 级联选择器样式接口 */
export interface CascaderStyles {
  /** 获取基础样式 */
  getBaseStyle: () => CSSProperties;
  /** 获取尺寸样式 */
  getSizeStyle: (_size: CascaderSize) => CSSProperties;
  /** 获取变体样式 */
  getVariantStyle: (_variant: CascaderVariant) => CSSProperties;
  /** 获取状态样式 */
  getStatusStyle: (_status: CascaderStatus) => CSSProperties;
  /** 获取输入框样式 */
  getInputStyle: (_size: CascaderSize, disabled?: boolean) => CSSProperties;
  /** 获取下拉框样式 */
  getDropdownStyle: () => CSSProperties;
  /** 获取菜单样式 */
  getMenuStyle: () => CSSProperties;
  /** 获取菜单列样式 */
  getMenuColumnStyle: () => CSSProperties;
  /** 获取菜单列最后一项样式 */
  getMenuColumnLastStyle: () => CSSProperties;
  /** 获取菜单项样式 */
  getMenuItemStyle: (disabled?: boolean, selected?: boolean, expanded?: boolean) => CSSProperties;
  /** 获取菜单项悬停样式 */
  getMenuItemHoverStyle: (disabled?: boolean) => CSSProperties;
  /** 获取菜单项展开图标样式 */
  getMenuItemExpandIconStyle: () => CSSProperties;
  /** 获取菜单项展开图标旋转样式 */
  getMenuItemExpandIconRotatedStyle: () => CSSProperties;
  /** 获取标签样式 */
  getTagStyle: () => CSSProperties;
  /** 获取标签关闭按钮样式 */
  getTagCloseStyle: () => CSSProperties;
  /** 获取标签关闭按钮悬停样式 */
  getTagCloseHoverStyle: () => CSSProperties;
  /** 获取搜索框样式 */
  getSearchStyle: () => CSSProperties;
  /** 获取搜索输入框样式 */
  getSearchInputStyle: () => CSSProperties;
  /** 获取搜索输入框聚焦样式 */
  getSearchInputFocusStyle: () => CSSProperties;
  /** 获取加载中样式 */
  getLoadingStyle: () => CSSProperties;
  /** 获取加载图标样式 */
  getLoadingIconStyle: () => CSSProperties;
  /** 获取空状态样式 */
  getEmptyStyle: () => CSSProperties;
  /** 获取后缀图标样式 */
  getSuffixStyle: () => CSSProperties;
  /** 获取后缀图标展开样式 */
  getSuffixExpandedStyle: () => CSSProperties;
  /** 获取清除按钮样式 */
  getClearStyle: () => CSSProperties;
  /** 获取清除按钮悬停样式 */
  getClearHoverStyle: () => CSSProperties;
  /** 获取多选标签容器样式 */
  getMultipleTagsStyle: () => CSSProperties;
  /** 获取多选输入框样式 */
  getMultipleInputStyle: () => CSSProperties;
  /** 获取占位符样式 */
  getPlaceholderStyle: () => CSSProperties;
  /** 获取禁用样式 */
  getDisabledStyle: () => CSSProperties;
  /** 获取只读样式 */
  getReadOnlyStyle: () => CSSProperties;
  /** 获取路径显示样式 */
  getPathStyle: () => CSSProperties;
  /** 获取路径项样式 */
  getPathItemStyle: () => CSSProperties;
  /** 获取路径分隔符样式 */
  getPathSeparatorStyle: () => CSSProperties;
  /** 获取动画关键帧 */
  getAnimations: () => Record<string, CSSProperties>;
  /** 格式化显示值 */
  formatDisplayValue: (
    _labels: ReactNode[],
    selectedOptions: CascaderOption[],
    config?: { showPath?: boolean; pathSeparator?: string },
  ) => ReactNode;
  /** 获取完整样式 */
  getStyle: (_config: {
    size?: CascaderSize;
    variant?: CascaderVariant;
    status?: CascaderStatus;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    style?: CSSProperties;
  }) => CSSProperties;
  /** 获取完整类名 */
  getClassName: (_config: {
    size?: CascaderSize;
    variant?: CascaderVariant;
    status?: CascaderStatus;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    className?: string;
  }) => string;
}

/** 级联选择器工具类 */
export class CascaderTools {
  /** 查找选项路径 */
  static findOptionPath(
    options: CascaderOption[],
    value: CascaderValue,
    fieldNames: CascaderProps['fieldNames'] = {},
  ): CascaderOption[] {
    const { value: valueKey = 'value', children: childrenKey = 'children' } = fieldNames;

    const findPath = (
      currentOptions: CascaderOption[],
      targetValue: CascaderValue,
      path: CascaderOption[] = [],
    ): CascaderOption[] | null => {
      for (const option of currentOptions) {
        const currentPath = [...path, option];

        if (option[valueKey as keyof typeof option] === targetValue[targetValue.length - 1]) {
          return currentPath;
        }

        if (option[childrenKey as keyof typeof option]) {
          const found = findPath(
            option[childrenKey as keyof typeof option] as CascaderOption[],
            targetValue,
            currentPath,
          );
          if (found) return found;
        }
      }
      return null;
    };

    return findPath(options, value) || [];
  }

  /** 过滤选项 */
  static filterOptions(
    options: CascaderOption[],
    inputValue: string,
    filterOption?: CascaderProps['filterOption'],
  ): CascaderOption[] {
    const filtered: CascaderOption[] = [];

    const filter = (currentOptions: CascaderOption[], path: CascaderOption[] = []) => {
      for (const option of currentOptions) {
        const currentPath = [...path, option];

        if (filterOption) {
          if (filterOption(inputValue, option, currentPath)) {
            filtered.push(option);
          }
        } else {
          const label = String(option.label).toLowerCase();
          const search = inputValue.toLowerCase();

          if (label.includes(search)) {
            filtered.push(option);
          }
        }

        if (option.children) {
          filter(option.children, currentPath);
        }
      }
    };

    filter(options);
    return filtered;
  }

  /** 格式化显示值 */
  static formatDisplayValue(
    labels: ReactNode[],
    _selectedOptions: CascaderOption[],
    config: { showPath?: boolean; pathSeparator?: string } = {},
  ): ReactNode {
    const { showPath = false, pathSeparator = ' / ' } = config;

    if (!showPath || labels.length === 0) {
      return labels[labels.length - 1] || '';
    }

    return labels.join(pathSeparator);
  }

  /** 验证值 */
  static validateValue(
    value: CascaderValue,
    options: CascaderOption[],
    fieldNames: CascaderProps['fieldNames'] = {},
  ): boolean {
    const path = this.findOptionPath(options, value, fieldNames);
    return path.length > 0;
  }

  /** 展平选项 */
  static flattenOptions(options: CascaderOption[], fieldNames: CascaderProps['fieldNames'] = {}): CascaderOption[] {
    const { children: childrenKey = 'children' } = fieldNames;

    const flatten = (currentOptions: CascaderOption[]): CascaderOption[] => {
      return currentOptions.reduce<CascaderOption[]>((acc, option) => {
        acc.push(option);
        if (option[childrenKey as keyof typeof option]) {
          acc.push(...flatten(option[childrenKey as keyof typeof option] as CascaderOption[]));
        }
        return acc;
      }, []);
    };

    return flatten(options);
  }

  /** 生成选项树 */
  static generateOptionTree(
    options: CascaderOption[],
    _fieldNames: CascaderProps['fieldNames'] = {},
  ): CascaderOption[] {
    // 这里可以实现更复杂的树生成逻辑
    return options;
  }

  /** 获取叶子节点 */
  static getLeafOptions(options: CascaderOption[], fieldNames: CascaderProps['fieldNames'] = {}): CascaderOption[] {
    const { children: childrenKey = 'children' } = fieldNames;

    const getLeaves = (currentOptions: CascaderOption[]): CascaderOption[] => {
      return currentOptions.reduce<CascaderOption[]>((acc, option) => {
        if (!option[childrenKey as keyof typeof option] || option.isLeaf) {
          acc.push(option);
        } else {
          acc.push(...getLeaves(option[childrenKey as keyof typeof option] as CascaderOption[]));
        }
        return acc;
      }, []);
    };

    return getLeaves(options);
  }

  /** 获取禁用选项 */
  static getDisabledOptions(options: CascaderOption[], fieldNames: CascaderProps['fieldNames'] = {}): CascaderOption[] {
    const { children: childrenKey = 'children' } = fieldNames;

    const getDisabled = (currentOptions: CascaderOption[]): CascaderOption[] => {
      return currentOptions.reduce<CascaderOption[]>((acc, option) => {
        if (option.disabled) {
          acc.push(option);
        }
        if (option[childrenKey as keyof typeof option]) {
          acc.push(...getDisabled(option[childrenKey as keyof typeof option] as CascaderOption[]));
        }
        return acc;
      }, []);
    };

    return getDisabled(options);
  }
}
