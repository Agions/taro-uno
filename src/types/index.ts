/**
 * Taro-Uno UI 组件库核心类型定义
 * 支持多端开发：微信小程序、支付宝小程序、H5、React Native等
 * 提供严格的TypeScript类型安全保障
 * @module types
 */

// ==================== 导出通用基础类型 ====================

export type {
  // 尺寸类型
  Size,
  ExtendedSize,
  // 状态类型
  Status,
  ExtendedStatus,
  // 变体类型
  Variant,
  ExtendedVariant,
  // 形状类型
  Shape,
  ExtendedShape,
  // 方向类型
  Direction,
  // 位置类型
  Placement,
  ExtendedPlacement,
  // 对齐类型
  Align,
  ExtendedAlign,
  // 主题模式
  ThemeMode,
  // 断点类型
  Breakpoint,
  // 动画类型
  AnimationType,
  AnimationDirection,
  // 输入类型
  InputType,
  KeyboardType,
  // 平台类型
  Platform,
  PlatformInfo,
  HttpMethod,
  // 请求类型
  RequestConfig,
  RequestResponse,
  RequestError,
} from './common';

// ==================== 导出组件基础 Props 类型 ====================

export type {
  // 基础 Props
  BaseProps,
  ChildrenProps,
  StyledProps,
  InteractiveProps,
  FormItemProps,
  RefProps,
  FocusableProps,
  SelectableProps,
  ToggleableProps,
  StatusProps,
  IconProps,
  // 组合类型
  FullInteractiveProps,
  FullFormItemProps,
} from './component';

// ==================== 导出事件类型 ====================

export type {
  // 基础事件
  BaseEventTarget,
  BaseEvent,
  // 触摸事件
  TouchPoint,
  TouchEventDetail,
  TouchEvent,
  // 变更事件
  ChangeEventDetail,
  ChangeEvent,
  InputEventDetail,
  InputEvent,
  // 焦点事件
  FocusEventDetail,
  FocusEvent,
  BlurEventDetail,
  BlurEvent,
  // 滚动事件
  ScrollEventDetail,
  ScrollEvent,
  // 键盘事件
  KeyboardEventDetail,
  KeyboardEvent,
  // 长按事件
  LongPressEventDetail,
  LongPressEvent,
  // 事件处理器
  EventHandler,
  TouchEventHandler,
  ChangeEventHandler,
  InputEventHandler,
  FocusEventHandler,
  BlurEventHandler,
  ScrollEventHandler,
  KeyboardEventHandler,
  LongPressEventHandler,
  // 简化回调
  OnClick,
  OnChange,
  OnInput,
  OnFocus,
  OnBlur,
  OnScroll,
} from './event';

// ==================== 导出样式类型 ====================

export type {
  // CSS 单位和值
  CSSUnit,
  CSSNumericValue,
  CSSValue,
  SizeValue,
  SpacingValue,
  BorderRadiusValue,
  // 颜色值
  HexColor,
  RGBColor,
  RGBAColor,
  HSLColor,
  ColorValue,
  // 样式对象
  StyleObject,
  PartialStyleObject,
  StyleFunction,
  StyleOrFunction,
  // 响应式值
  ResponsiveValue,
  ResponsiveStyleObject,
  ResponsiveSizeValue,
  ResponsiveSpacingValue,
  ResponsiveBoolean,
  // 样式变体
  StyleVariants,
  CompoundVariant,
  StyleRecipe,
  // 过渡和动画
  TransitionConfig,
  AnimationConfig,
  ShadowConfig,
  // 类名
  ClassNameValue,
  ClassNameObject,
  ClassNameArray,
  ClassNameArg,
  // 样式合并
  StyleMergeOptions,
  MergeableStyle,
} from './style';

// ==================== 导出工具类型 ====================

export type {
  // 核心工具类型
  Nullable,
  Optional,
  RequiredKeys,
  RequiredFields,
  DeepPartial,
  DeepOptional,
  DeepRequired,
  DeepReadonly,
  DeepWriteable,
  // 对象工具类型
  Merge,
  DeepMerge,
  PickPartial,
  PickRequired,
  // 条件类型
  PromiseType,
  FunctionArgs,
  FunctionReturn,
  ComponentProps,
  ComponentRef,
  NonNullableType,
  Truthy,
  // 数组工具类型
  ArrayElement,
  // 字符串工具类型
  CapitalizeString,
  UncapitalizeString,
  KebabCase,
  CamelCase,
  // 函数工具类型
  Debounced,
  Throttled,
  OptionalArgs,
  // 递归类型
  RecursiveExclude,
  RecursivePick,
  // 验证类型
  ValidationResult,
  Validator,
  // 异步类型
  AsyncState,
  AsyncOperation,
  // 通用类型
  KeyValuePair,
  RecordType,
  MapType,
  SetType,
  // 推断类型
  InferArray,
  InferPromise,
  InferArgs,
  InferReturn,
} from './utils';

// ==================== 导出工具函数 ====================

export {
  // 类型守卫
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isPromise,
  isReactElement,
  isReactComponent,
  isUndefined,
  isNull,
  isEmpty,
  isNotEmpty,
  // 验证工具
  createValidator,
  // 事件处理工具
  createPreventDefaultHandler,
  createStopPropagationHandler,
  // 样式工具
  classNames,
  mergeStyles,
  // 异步工具
  createCancellablePromise,
  // 对象工具
  keys,
  values,
  entries,
  fromEntries,
} from './utils';

// ==================== 导出全局类型 ====================

export type {
  // 小程序存储类型
  MiniProgramStorageOptions,
  MiniProgramGetStorageOptions,
  // 小程序请求类型
  MiniProgramRequestOptions,
  MiniProgramRequestResult,
  // 小程序系统信息
  MiniProgramSystemInfo,
  // 小程序拍照类型
  MiniProgramTakePhotoOptions,
  MiniProgramTakePhotoResult,
  // 小程序分享类型
  MiniProgramShareOptions,
  MiniProgramShareTimelineOptions,
  // 小程序 API 接口
  MiniProgramAPI,
  WechatMiniProgramAPI,
  AlipayMiniProgramAPI,
  SwanMiniProgramAPI,
  TTMiniProgramAPI,
  QQMiniProgramAPI,
  JDMiniProgramAPI,
} from './global.d';


