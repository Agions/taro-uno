/**
 * Input 组件类型定义
 * 继承 FormItemProps，移除重复类型定义
 * @module components/form/Input/Input.types
 */

import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import type { FormItemProps } from '../../../types/component';
import type { Status, Shape } from '../../../types/common';

// ==================== Input 特有类型 ====================

/**
 * 输入框类型
 * @description 控制输入框的输入类型和键盘类型
 */
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'idcard' | 'digit';

/**
 * 输入框变体
 * @description 控制输入框的视觉样式
 */
export type InputVariant = 'outlined' | 'filled' | 'underlined';

/**
 * 清除按钮触发时机
 * @description 控制清除按钮何时显示
 */
export type ClearTrigger = 'always' | 'focus' | 'never';

// ==================== Input Props ====================

/**
 * Input 组件 Props
 * @description 继承 FormItemProps，包含 className, style, size, variant, disabled, loading, value, defaultValue, onChange, name, required, readOnly, placeholder
 */
export interface InputProps extends FormItemProps<string> {
  /**
   * 输入框类型
   * @description 控制输入框的输入类型和键盘类型
   * @default 'text'
   */
  type?: InputType;

  /**
   * 输入框变体样式
   * @description 控制输入框的视觉样式
   * @default 'outlined'
   */
  inputVariant?: InputVariant;

  /**
   * 输入框状态
   * @description 控制输入框的语义状态
   * @default 'default'
   */
  status?: Status;

  /**
   * 输入框形状
   * @description 控制输入框的边角形状
   * @default 'default'
   */
  shape?: Shape;

  /**
   * 是否显示清除按钮
   * @description 显示清除按钮以快速清空输入内容
   * @default false
   */
  clearable?: boolean;

  /**
   * 清除按钮触发时机
   * @description 控制清除按钮何时显示
   * @default 'focus'
   */
  clearTrigger?: ClearTrigger;

  /**
   * 最大长度
   * @description 限制输入的最大字符数
   */
  maxLength?: number;

  /**
   * 最小长度
   * @description 限制输入的最小字符数
   */
  minLength?: number;

  /**
   * 前缀图标或文本
   * @description 输入框前缀内容
   */
  prefix?: ReactNode;

  /**
   * 后缀图标或文本
   * @description 输入框后缀内容
   */
  suffix?: ReactNode;

  /**
   * 标签文本
   * @description 输入框的标签
   */
  label?: ReactNode;

  /**
   * 辅助文本
   * @description 输入框下方的帮助说明
   */
  helperText?: ReactNode;

  /**
   * 错误文本
   * @description 验证失败时显示的错误信息
   */
  errorText?: ReactNode;

  /**
   * 是否显示字数统计
   * @description 显示当前输入字数和最大字数
   * @default false
   */
  showCount?: boolean;

  /**
   * 是否显示边框
   * @description 控制输入框是否显示边框
   * @default true
   */
  bordered?: boolean;

  /**
   * 是否显示密码切换按钮
   * @description 密码类型输入框显示切换可见性按钮
   * @default false
   */
  showPasswordToggle?: boolean;

  /**
   * 是否块级显示
   * @description 块级输入框会占满父容器宽度
   * @default false
   */
  block?: boolean;

  /**
   * 子元素
   * @description 输入框内容
   */
  children?: ReactNode;

  /**
   * 点击事件回调
   * @description 点击输入框时触发
   */
  onClick?: (event: ITouchEvent) => void;

  /**
   * 聚焦事件回调
   * @description 输入框获取焦点时触发
   */
  onFocus?: (event: ITouchEvent) => void;

  /**
   * 失焦事件回调
   * @description 输入框失去焦点时触发
   */
  onBlur?: (event: ITouchEvent) => void;

  /**
   * 清除事件回调
   * @description 点击清除按钮时触发
   */
  onClear?: (event: ITouchEvent) => void;

  /**
   * 确认事件回调
   * @description 按下确认键时触发
   */
  onConfirm?: (value: string, event: ITouchEvent) => void;

  /**
   * 输入事件回调
   * @description 输入内容变化时触发
   */
  onInput?: (value: string, event: ITouchEvent) => void;

  /**
   * 键盘高度变化回调
   * @description 键盘高度变化时触发（小程序）
   */
  onKeyboardHeightChange?: (height: number, event: ITouchEvent) => void;

  /**
   * 无障碍标签
   * @description 用于屏幕阅读器的描述文本
   */
  accessibilityLabel?: string;

  /**
   * 无障碍角色
   * @description 用于屏幕阅读器的角色标识
   */
  accessibilityRole?: string;

  /**
   * 无障碍状态
   * @description 用于屏幕阅读器的状态信息
   */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;
  };

  /**
   * 表单验证规则
   * @description 输入框的验证规则数组
   */
  rules?: Array<{
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    validator?: (value: string) => boolean | string | Promise<boolean | string>;
  }>;

  /**
   * 验证触发时机
   * @description 控制何时触发验证
   * @default 'onBlur'
   */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit' | 'onFocus';

  /**
   * 是否立即验证
   * @description 是否在值变化时立即验证
   * @default false
   */
  immediate?: boolean;

  /**
   * 自定义验证函数
   * @description 自定义验证逻辑
   */
  validator?: (value: string) => boolean | string | Promise<boolean | string>;

  /**
   * 容器样式
   * @description 输入框容器的自定义样式
   */
  containerStyle?: React.CSSProperties;
}

// ==================== Input Ref ====================

/**
 * Input 组件 Ref 类型
 * @description 通过 ref 暴露的方法和属性
 */
export interface InputRef {
  /**
   * DOM 元素引用
   */
  element: HTMLInputElement | null;

  /**
   * 获取输入框值
   */
  getValue: () => string;

  /**
   * 设置输入框值
   */
  setValue: (value: string) => void;

  /**
   * 聚焦输入框
   */
  focus: () => void;

  /**
   * 失焦输入框
   */
  blur: () => void;

  /**
   * 选择文本
   */
  select: () => void;

  /**
   * 设置选中文本范围
   */
  setSelectionRange: (start: number, end: number) => void;

  /**
   * 获取选中文本范围
   */
  getSelectionRange: () => { start: number; end: number };

  /**
   * 获取输入框状态
   */
  getStatus: () => Status;

  /**
   * 验证输入框值
   */
  validate: () => Promise<{ valid: boolean; message?: string }>;

  /**
   * 清除输入框值
   */
  clear: () => void;

  /**
   * 重置输入框
   */
  reset: () => void;
}

// ==================== 验证结果类型 ====================

/**
 * 输入框验证结果接口
 * @description 验证操作的返回结果
 */
export interface InputValidationResult {
  /**
   * 是否验证通过
   */
  valid: boolean;

  /**
   * 错误消息
   */
  message?: string;

  /**
   * 验证时间戳
   */
  timestamp: number;
}
