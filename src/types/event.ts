/**
 * 统一事件类型定义
 * 兼容 Taro 和原生事件类型
 * @module types/event
 */

// ==================== 基础事件类型 ====================

/**
 * 基础事件目标
 * @description 事件目标的基础接口
 */
export interface BaseEventTarget {
  /**
   * 元素 ID
   */
  id?: string;

  /**
   * 元素标签名
   */
  tagName?: string;

  /**
   * 数据集
   */
  dataset?: Record<string, unknown>;
}

/**
 * 基础事件接口
 * @description 所有事件的基础接口
 */
export interface BaseEvent<T = BaseEventTarget> {
  /**
   * 事件类型
   */
  type: string;

  /**
   * 事件时间戳
   */
  timeStamp: number;

  /**
   * 事件目标
   */
  target: T;

  /**
   * 当前事件目标
   */
  currentTarget: T;

  /**
   * 阻止默认行为
   */
  preventDefault?: () => void;

  /**
   * 阻止事件冒泡
   */
  stopPropagation?: () => void;
}

// ==================== 触摸事件类型 ====================

/**
 * 触摸点信息
 * @description 单个触摸点的详细信息
 */
export interface TouchPoint {
  /**
   * 触摸点标识符
   */
  identifier: number;

  /**
   * 相对于页面的 X 坐标
   */
  pageX: number;

  /**
   * 相对于页面的 Y 坐标
   */
  pageY: number;

  /**
   * 相对于屏幕的 X 坐标
   */
  clientX: number;

  /**
   * 相对于屏幕的 Y 坐标
   */
  clientY: number;

  /**
   * 触摸点相对于目标元素的 X 坐标（仅部分平台支持）
   */
  offsetX?: number;

  /**
   * 触摸点相对于目标元素的 Y 坐标（仅部分平台支持）
   */
  offsetY?: number;
}

/**
 * 触摸事件详情
 * @description 触摸事件的详细信息
 */
export interface TouchEventDetail {
  /**
   * 相对于页面的 X 坐标
   */
  pageX: number;

  /**
   * 相对于页面的 Y 坐标
   */
  pageY: number;

  /**
   * 相对于屏幕的 X 坐标
   */
  clientX: number;

  /**
   * 相对于屏幕的 Y 坐标
   */
  clientY: number;

  /**
   * X 方向的移动距离
   */
  deltaX?: number;

  /**
   * Y 方向的移动距离
   */
  deltaY?: number;
}

/**
 * 触摸事件
 * @description 统一的触摸事件类型，兼容 Taro 和原生事件
 */
export interface TouchEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail?: TouchEventDetail;

  /**
   * 当前触摸点列表
   */
  touches: TouchPoint[];

  /**
   * 变化的触摸点列表
   */
  changedTouches: TouchPoint[];
}

// ==================== 变更事件类型 ====================

/**
 * 变更事件详情
 * @description 变更事件的详细信息
 * @template T 值的类型
 */
export interface ChangeEventDetail<T = string> {
  /**
   * 变更后的值
   */
  value: T;

  /**
   * 变更前的值（可选）
   */
  previousValue?: T;
}

/**
 * 变更事件
 * @description 统一的变更事件类型
 * @template T 值的类型
 */
export interface ChangeEvent<T = string, Target = BaseEventTarget> extends BaseEvent<Target> {
  /**
   * 事件详情
   */
  detail: ChangeEventDetail<T>;
}

/**
 * 输入事件详情
 * @description 输入事件的详细信息
 */
export interface InputEventDetail {
  /**
   * 输入的值
   */
  value: string;

  /**
   * 光标位置
   */
  cursor?: number;

  /**
   * 键盘高度（仅小程序）
   */
  keyboardHeight?: number;
}

/**
 * 输入事件
 * @description 统一的输入事件类型
 */
export interface InputEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail: InputEventDetail;
}

// ==================== 焦点事件类型 ====================

/**
 * 焦点事件详情
 * @description 焦点事件的详细信息
 */
export interface FocusEventDetail {
  /**
   * 输入框的值
   */
  value?: string;

  /**
   * 键盘高度（仅小程序）
   */
  height?: number;
}

/**
 * 焦点事件
 * @description 统一的焦点事件类型
 */
export interface FocusEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail?: FocusEventDetail;
}

/**
 * 失焦事件详情
 * @description 失焦事件的详细信息
 */
export interface BlurEventDetail {
  /**
   * 输入框的值
   */
  value?: string;

  /**
   * 光标位置
   */
  cursor?: number;
}

/**
 * 失焦事件
 * @description 统一的失焦事件类型
 */
export interface BlurEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail?: BlurEventDetail;
}

// ==================== 滚动事件类型 ====================

/**
 * 滚动事件详情
 * @description 滚动事件的详细信息
 */
export interface ScrollEventDetail {
  /**
   * 水平滚动位置
   */
  scrollLeft: number;

  /**
   * 垂直滚动位置
   */
  scrollTop: number;

  /**
   * 滚动区域宽度
   */
  scrollWidth: number;

  /**
   * 滚动区域高度
   */
  scrollHeight: number;

  /**
   * X 方向的滚动增量
   */
  deltaX?: number;

  /**
   * Y 方向的滚动增量
   */
  deltaY?: number;
}

/**
 * 滚动事件
 * @description 统一的滚动事件类型
 */
export interface ScrollEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail: ScrollEventDetail;
}

// ==================== 键盘事件类型 ====================

/**
 * 键盘事件详情
 * @description 键盘事件的详细信息
 */
export interface KeyboardEventDetail {
  /**
   * 按键值
   */
  key: string;

  /**
   * 按键码
   */
  keyCode: number;

  /**
   * 是否按下 Ctrl 键
   */
  ctrlKey?: boolean;

  /**
   * 是否按下 Shift 键
   */
  shiftKey?: boolean;

  /**
   * 是否按下 Alt 键
   */
  altKey?: boolean;

  /**
   * 是否按下 Meta 键
   */
  metaKey?: boolean;
}

/**
 * 键盘事件
 * @description 统一的键盘事件类型
 */
export interface KeyboardEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail?: KeyboardEventDetail;

  /**
   * 按键值
   */
  key?: string;

  /**
   * 按键码
   */
  keyCode?: number;
}

// ==================== 长按事件类型 ====================

/**
 * 长按事件详情
 * @description 长按事件的详细信息
 */
export interface LongPressEventDetail {
  /**
   * 相对于页面的 X 坐标
   */
  pageX: number;

  /**
   * 相对于页面的 Y 坐标
   */
  pageY: number;

  /**
   * 相对于屏幕的 X 坐标
   */
  clientX: number;

  /**
   * 相对于屏幕的 Y 坐标
   */
  clientY: number;
}

/**
 * 长按事件
 * @description 统一的长按事件类型
 */
export interface LongPressEvent<T = BaseEventTarget> extends BaseEvent<T> {
  /**
   * 事件详情
   */
  detail: LongPressEventDetail;
}

// ==================== 事件处理器类型 ====================

/**
 * 通用事件处理器
 * @description 通用的事件处理函数类型
 * @template E 事件类型
 */
export type EventHandler<E = BaseEvent> = (event: E) => void;

/**
 * 触摸事件处理器
 */
export type TouchEventHandler<T = BaseEventTarget> = EventHandler<TouchEvent<T>>;

/**
 * 变更事件处理器
 * @template V 值的类型
 */
export type ChangeEventHandler<V = string, T = BaseEventTarget> = EventHandler<ChangeEvent<V, T>>;

/**
 * 输入事件处理器
 */
export type InputEventHandler<T = BaseEventTarget> = EventHandler<InputEvent<T>>;

/**
 * 焦点事件处理器
 */
export type FocusEventHandler<T = BaseEventTarget> = EventHandler<FocusEvent<T>>;

/**
 * 失焦事件处理器
 */
export type BlurEventHandler<T = BaseEventTarget> = EventHandler<BlurEvent<T>>;

/**
 * 滚动事件处理器
 */
export type ScrollEventHandler<T = BaseEventTarget> = EventHandler<ScrollEvent<T>>;

/**
 * 键盘事件处理器
 */
export type KeyboardEventHandler<T = BaseEventTarget> = EventHandler<KeyboardEvent<T>>;

/**
 * 长按事件处理器
 */
export type LongPressEventHandler<T = BaseEventTarget> = EventHandler<LongPressEvent<T>>;

// ==================== 简化的事件回调类型 ====================

/**
 * 点击回调
 * @description 简化的点击事件回调
 */
export type OnClick<T = BaseEventTarget> = TouchEventHandler<T>;

/**
 * 变更回调
 * @description 简化的变更事件回调
 * @template V 值的类型
 */
export type OnChange<V = string> = (value: V) => void;

/**
 * 输入回调
 * @description 简化的输入事件回调
 */
export type OnInput = (value: string) => void;

/**
 * 聚焦回调
 * @description 简化的聚焦事件回调
 */
export type OnFocus = () => void;

/**
 * 失焦回调
 * @description 简化的失焦事件回调
 */
export type OnBlur = () => void;

/**
 * 滚动回调
 * @description 简化的滚动事件回调
 */
export type OnScroll = (scrollInfo: ScrollEventDetail) => void;
