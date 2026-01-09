/**
 * 组件基础 Props 类型定义
 * 提供所有组件继承的基础属性接口
 * @module types/component
 */

import type { CSSProperties, ReactNode, Ref } from 'react';
import type { Size, Variant, Status } from './common';

// ==================== 基础 Props ====================

/**
 * 所有组件的基础 Props
 * @description 定义所有组件都应该支持的基础属性
 */
export interface BaseProps {
  /**
   * 自定义类名
   * @description 用于添加额外的 CSS 类名
   */
  className?: string;

  /**
   * 自定义样式
   * @description 用于添加内联样式
   */
  style?: CSSProperties;

  /**
   * 测试标识
   * @description 用于自动化测试的元素标识
   */
  'data-testid'?: string;
}

// ==================== 带子元素的 Props ====================

/**
 * 带子元素组件的 Props
 * @description 扩展 BaseProps，添加 children 属性
 */
export interface ChildrenProps extends BaseProps {
  /**
   * 子元素
   * @description 组件的子内容
   */
  children?: ReactNode;
}

// ==================== 可样式化 Props ====================

/**
 * 可样式化组件的 Props
 * @description 扩展 BaseProps，添加尺寸和变体属性
 */
export interface StyledProps extends BaseProps {
  /**
   * 组件尺寸
   * @description 控制组件的大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 组件变体
   * @description 控制组件的视觉样式变体
   * @default 'solid'
   */
  variant?: Variant;
}

// ==================== 可交互 Props ====================

/**
 * 可交互组件的 Props
 * @description 扩展 StyledProps，添加禁用和加载状态
 */
export interface InteractiveProps extends StyledProps {
  /**
   * 是否禁用
   * @description 禁用状态下组件不可交互
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否加载中
   * @description 加载状态下显示加载指示器
   * @default false
   */
  loading?: boolean;
}

// ==================== 表单项 Props ====================

/**
 * 表单项组件的 Props
 * @description 扩展 InteractiveProps，添加表单相关属性
 * @template T 表单值的类型
 */
export interface FormItemProps<T = string> extends InteractiveProps {
  /**
   * 当前值
   * @description 受控模式下的当前值
   */
  value?: T;

  /**
   * 默认值
   * @description 非受控模式下的初始值
   */
  defaultValue?: T;

  /**
   * 值变更回调
   * @description 当值发生变化时触发
   * @param value 新的值
   */
  onChange?: (value: T) => void;

  /**
   * 字段名称
   * @description 表单字段的名称，用于表单提交
   */
  name?: string;

  /**
   * 是否必填
   * @description 标记该字段是否为必填项
   * @default false
   */
  required?: boolean;

  /**
   * 是否只读
   * @description 只读状态下可以查看但不能修改
   * @default false
   */
  readOnly?: boolean;

  /**
   * 占位符文本
   * @description 输入框为空时显示的提示文本
   */
  placeholder?: string;
}

// ==================== 带 Ref 的 Props ====================

/**
 * 带 Ref 组件的 Props
 * @description 用于支持 forwardRef 的组件
 * @template T Ref 指向的元素类型
 */
export interface RefProps<T> {
  /**
   * 组件引用
   * @description 用于获取组件实例或 DOM 元素的引用
   */
  ref?: Ref<T>;
}

// ==================== 可聚焦 Props ====================

/**
 * 可聚焦组件的 Props
 * @description 扩展 InteractiveProps，添加焦点相关属性
 */
export interface FocusableProps extends InteractiveProps {
  /**
   * 是否自动聚焦
   * @description 组件挂载时是否自动获取焦点
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Tab 键顺序
   * @description 控制 Tab 键导航的顺序
   */
  tabIndex?: number;

  /**
   * 聚焦回调
   * @description 当组件获取焦点时触发
   */
  onFocus?: () => void;

  /**
   * 失焦回调
   * @description 当组件失去焦点时触发
   */
  onBlur?: () => void;
}

// ==================== 可选择 Props ====================

/**
 * 可选择组件的 Props
 * @description 用于单选、多选等可选择组件
 * @template T 选中值的类型
 */
export interface SelectableProps<T = string> extends InteractiveProps {
  /**
   * 当前选中值
   * @description 受控模式下的当前选中值
   */
  value?: T;

  /**
   * 默认选中值
   * @description 非受控模式下的初始选中值
   */
  defaultValue?: T;

  /**
   * 选中变更回调
   * @description 当选中值发生变化时触发
   * @param value 新的选中值
   */
  onChange?: (value: T) => void;
}

// ==================== 可切换 Props ====================

/**
 * 可切换组件的 Props
 * @description 用于开关、复选框等可切换组件
 */
export interface ToggleableProps extends InteractiveProps {
  /**
   * 是否选中/开启
   * @description 受控模式下的当前状态
   */
  checked?: boolean;

  /**
   * 默认是否选中/开启
   * @description 非受控模式下的初始状态
   */
  defaultChecked?: boolean;

  /**
   * 状态变更回调
   * @description 当状态发生变化时触发
   * @param checked 新的状态
   */
  onChange?: (checked: boolean) => void;
}

// ==================== 带状态的 Props ====================

/**
 * 带状态组件的 Props
 * @description 扩展 StyledProps，添加语义状态属性
 */
export interface StatusProps extends StyledProps {
  /**
   * 组件状态
   * @description 控制组件的语义状态（如成功、警告、错误等）
   * @default 'default'
   */
  status?: Status;
}

// ==================== 带图标的 Props ====================

/**
 * 带图标组件的 Props
 * @description 扩展 BaseProps，添加图标相关属性
 */
export interface IconProps extends BaseProps {
  /**
   * 图标
   * @description 组件显示的图标
   */
  icon?: ReactNode;

  /**
   * 图标位置
   * @description 图标相对于内容的位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
}

// ==================== 组合类型 ====================

/**
 * 完整的交互组件 Props
 * @description 组合了所有常用属性的完整接口
 */
export interface FullInteractiveProps extends InteractiveProps, ChildrenProps, IconProps {
  /**
   * 组件状态
   * @description 控制组件的语义状态
   */
  status?: Status;
}

/**
 * 完整的表单项 Props
 * @description 组合了表单项和可聚焦属性的完整接口
 * @template T 表单值的类型
 */
export interface FullFormItemProps<T = string> extends FormItemProps<T>, FocusableProps {
  /**
   * 标签文本
   * @description 表单项的标签
   */
  label?: ReactNode;

  /**
   * 帮助文本
   * @description 表单项的帮助说明
   */
  help?: ReactNode;

  /**
   * 错误信息
   * @description 验证失败时显示的错误信息
   */
  error?: ReactNode;
}
