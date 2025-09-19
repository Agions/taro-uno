/**
 * Taro-React 类型适配层
 * 解决 Taro 组件与 React 标准类型之间的兼容性问题
 */

import type { CommonEventFunction } from '@tarojs/components';
import type { 
  TouchEventHandler,
  MouseEventHandler,
  FocusEventHandler,
  FormEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  CSSProperties,
  ReactNode
} from 'react';

// Taro 事件类型
export type TaroTouchEvent = CommonEventFunction<any>;
export type TaroMouseEvent = CommonEventFunction<any>;
export type TaroFocusEvent = CommonEventFunction<any>;
export type TaroFormEvent = CommonEventFunction<any>;
export type TaroChangeEvent = CommonEventFunction<any>;
export type TaroKeyboardEvent = CommonEventFunction<any>;

// 事件转换工具函数
export const convertToTaroEvent = (reactEvent: any): CommonEventFunction<any> => {
  return reactEvent;
};

// 事件适配器类型
export type TaroEventHandlers = {
  onTouchStart?: TaroTouchEvent;
  onTouchMove?: TaroTouchEvent;
  onTouchEnd?: TaroTouchEvent;
  onTouchCancel?: TaroTouchEvent;
  onClick?: TaroMouseEvent;
  onLongPress?: TaroMouseEvent;
  onFocus?: TaroFocusEvent;
  onBlur?: TaroFocusEvent;
  onInput?: TaroFormEvent;
  onChange?: TaroChangeEvent;
  onConfirm?: TaroFormEvent;
  onKeyboardHeightChange?: TaroFormEvent;
};

// 适配后的组件属性类型
export interface TaroViewProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  id?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityState?: any;
  onClick?: TaroMouseEvent;
  onTouchStart?: TaroTouchEvent;
  onTouchMove?: TaroTouchEvent;
  onTouchEnd?: TaroTouchEvent;
  onTouchCancel?: TaroTouchEvent;
  onLongPress?: TaroMouseEvent;
  [key: string]: any;
}

export interface TaroTextProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  selectable?: boolean;
  space?: string;
  decode?: boolean;
  onClick?: TaroMouseEvent;
  onTouchStart?: TaroTouchEvent;
  onTouchEnd?: TaroTouchEvent;
  [key: string]: any;
}

export interface TaroInputProps {
  style?: CSSProperties;
  className?: string;
  value?: string;
  placeholder?: string;
  placeholderStyle?: CSSProperties | string;
  placeholderClass?: string;
  disabled?: boolean;
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  type?: 'text' | 'number' | 'idcard' | 'digit';
  password?: boolean;
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done';
  confirmHold?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;
  holdKeyboard?: boolean;
  safeKeyboardCertBool?: boolean;
  safeKeyboardCertPath?: string;
  alwaysEmbed?: boolean;
  onInput?: TaroFormEvent;
  onFocus?: TaroFocusEvent;
  onBlur?: TaroFocusEvent;
  onConfirm?: TaroFormEvent;
  onKeyboardHeightChange?: TaroFormEvent;
  accessibilityLabel?: string;
  [key: string]: any;
}

// 事件转换函数
export function adaptReactToTaroEvent<T>(
  handler: TouchEventHandler<T> | MouseEventHandler<T> | FocusEventHandler<T>
): TaroTouchEvent | TaroMouseEvent | TaroFocusEvent {
  return (event) => {
    // 转换事件对象，保持类型兼容性
    handler(event as unknown as React.TouchEvent<T> || React.MouseEvent<T> || React.FocusEvent<T>);
  };
}

export function adaptFormEvent(
  handler: FormEventHandler<T> | ChangeEventHandler<T>
): TaroFormEvent | TaroChangeEvent {
  return (event) => {
    handler(event as unknown as React.FormEvent<T> || React.ChangeEvent<T>);
  };
}

// 类型守卫函数
export function isTaroEvent(event: any): event is CommonEventFunction<any> {
  return typeof event === 'function' && event.name === 'CommonEventFunction';
}

// 通用属性类型扩展
export interface CommonProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  id?: string;
  [key: string]: any;
}

export interface AccessibilityProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean;
    busy?: boolean;
    expanded?: boolean;
    [key: string]: boolean | string | number;
  };
  accessibilityElementsHidden?: boolean;
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
}

// 混合类型接口
export interface TaroComponentProps extends CommonProps, AccessibilityProps {}

export default {
  TaroViewProps,
  TaroTextProps,
  TaroInputProps,
  TaroEventHandlers,
  adaptReactToTaroEvent,
  adaptFormEvent,
  isTaroEvent,
  CommonProps,
  AccessibilityProps,
  TaroComponentProps
};