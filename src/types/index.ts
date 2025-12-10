/**
 * Taro-Uno UI 组件库核心类型定义
 * 支持多端开发：微信小程序、支付宝小程序、H5、React Native等
 * 提供严格的TypeScript类型安全保障
 */

import { ReactNode } from 'react';
import * as Taro from '@tarojs/taro';

// ==================== 导入工具类型 ====================

// 导出通用工具类型
export * from './utils';

// 导出Button组件专用类型
export * from './button';

// 导出标准化组件类型
export * from './standardized-components';

// ==================== 平台类型定义 ====================

/** 支持的平台类型 */
export type Platform = 'weapp' | 'alipay' | 'swan' | 'tt' | 'qq' | 'h5' | 'rn' | 'jd';

/** 平台信息接口 */
export interface PlatformInfo {
  /** 平台类型 */
  platform: Platform;
  /** 是否为小程序环境 */
  isMiniProgram: boolean;
  /** 是否为H5环境 */
  isH5: boolean;
  /** 是否为React Native环境 */
  isRN: boolean;
  /** 系统信息 */
  system: Taro.getSystemInfoSync.Result;
  /** SDK版本 */
  SDKVersion?: string;
  /** 小程序版本 */
  version?: string;
}

// ==================== 组件通用类型 ====================

/** 组件尺寸类型 */
export type Size = 'small' | 'medium' | 'large' | 'default';

/** 组件变体类型 */
export type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** 组件状态类型 */
export type Status = 'default' | 'loading' | 'disabled' | 'error' | 'success';

/** 通用组件属性接口 */
export interface BaseComponentProps
  extends Partial<Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style' | 'children' | 'onClick'>> {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 测试ID */
  testID?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

/** 带有尺寸属性的组件接口 */
export interface SizeableComponentProps extends BaseComponentProps {
  /** 组件尺寸 */
  size?: Size;
}

/** 带有变体属性的组件接口 */
export interface VariantComponentProps extends BaseComponentProps {
  /** 组件变体 */
  variant?: Variant;
}

/** 带有状态属性的组件接口 */
export interface StatusComponentProps extends BaseComponentProps {
  /** 组件状态 */
  status?: Status;
}

// ==================== 主题相关类型 ====================

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/** 主题颜色配置 */
export interface ThemeColors {
  /** 主色调 */
  primary: string;
  /** 次要色调 */
  secondary: string;
  /** 成功色 */
  success: string;
  /** 警告色 */
  warning: string;
  /** 错误色 */
  error: string;
  /** 信息色 */
  info: string;
  /** 背景色 */
  background: string;
  /** 表面色 */
  surface: string;
  /** 文字主色 */
  text: string;
  /** 文字次要色 */
  textSecondary: string;
  /** 边框色 */
  border: string;
  /** 分割线色 */
  divider: string;
}

/** 主题间距配置 */
export interface ThemeSpacing {
  /** 极小间距 */
  xs: number;
  /** 小间距 */
  sm: number;
  /** 中等间距 */
  md: number;
  /** 大间距 */
  lg: number;
  /** 极大间距 */
  xl: number;
  /** 超大间距 */
  xxl: number;
}

/** 主题字体配置 */
export interface ThemeTypography {
  /** 字体族 */
  fontFamily: string;
  /** 字体大小 */
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  /** 字重 */
  fontWeight: {
    normal: number;
    medium: number;
    bold: number;
  };
  /** 行高 */
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

/** 主题圆角配置 */
export interface ThemeRadius {
  /** 无圆角 */
  none: number;
  /** 小圆角 */
  sm: number;
  /** 中等圆角 */
  md: number;
  /** 大圆角 */
  lg: number;
  /** 完全圆角 */
  full: number;
}

/** 主题配置接口 */
export interface ThemeConfig {
  /** 主题模式 */
  mode: ThemeMode;
  /** 主题颜色 */
  colors: ThemeColors;
  /** 主题间距 */
  spacing: ThemeSpacing;
  /** 主题字体 */
  typography: ThemeTypography;
  /** 主题圆角 */
  radius: ThemeRadius;
  /** 自定义CSS变量 */
  cssVars?: Record<string, string>;
}

// ==================== 事件处理类型 ====================

/** 通用事件处理器类型 */
export type EventHandler<T = any> = (event: T) => void;

/** 点击事件处理器 */
export type ClickHandler = EventHandler<any>;

/** 输入事件处理器 */
export type InputHandler = EventHandler<any>;

/** 变更事件处理器 */
export type ChangeHandler<T = any> = EventHandler<T>;

/** 焦点事件处理器 */
export type FocusHandler = EventHandler<any>;

/** 滚动事件处理器 */
export type ScrollHandler = EventHandler<any>;

/** 触摸事件处理器 */
export type TouchHandler = EventHandler<any>;

/** 生命周期事件处理器 */
export type LifecycleHandler = EventHandler<void>;

// ==================== 工具函数类型 ====================

/** 防抖函数类型 */
export type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

/** 节流函数类型 */
export type ThrottledFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
};

/** 格式化函数类型 */
export type FormatFunction<T = any, R = string> = (value: T) => R;

/** 验证函数类型 */
export type ValidateFunction<T = any> = (value: T) => boolean | string;

/** 转换函数类型 */
export type TransformFunction<T = any, R = any> = (value: T) => R;

/** 过滤函数类型 */
export type FilterFunction<T = any> = (value: T, index: number, array: T[]) => boolean;

/** 比较函数类型 */
export type CompareFunction<T = any> = (a: T, b: T) => number;

// ==================== 样式相关类型 ====================

/** CSS单位类型 */
export type CSSUnit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%' | 'rpx';

/** 尺寸值类型 */
export type SizeValue = number | `${number}${CSSUnit}`;

/** 颜色值类型 */
export type ColorValue = string;

/** 间距值类型 */
export type SpacingValue = SizeValue;

/** 动画类型 */
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';

/** 动画方向 */
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'in' | 'out';

/** 过渡配置 */
export interface TransitionConfig {
  /** 过渡属性 */
  property?: string;
  /** 过渡时间 */
  duration?: number;
  /** 过渡函数 */
  timing?: string;
  /** 过渡延迟 */
  delay?: number;
}

// ==================== 表单相关类型 ====================

/** 表单字段状态 */
export interface FormFieldState {
  /** 字段值 */
  value: any;
  /** 是否已修改 */
  dirty: boolean;
  /** 是否已触摸 */
  touched: boolean;
  /** 是否有效 */
  valid: boolean;
  /** 错误信息 */
  error?: string;
}

/** 表单验证规则 */
export interface ValidationRule {
  /** 必填验证 */
  required?: boolean;
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 正则验证 */
  pattern?: RegExp;
  /** 自定义验证器 */
  validator?: ValidateFunction;
  /** 错误消息 */
  message?: string;
}

/** 表单配置 */
export interface FormConfig {
  /** 初始值 */
  initialValues: Record<string, any>;
  /** 验证规则 */
  validationRules?: Record<string, ValidationRule[]>;
  /** 提交处理器 */
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  /** 重置处理器 */
  onReset?: () => void;
  /** 变更处理器 */
  onChange?: (values: Record<string, any>) => void;
}

// ==================== 网络请求类型 ====================

/** 请求配置 */
export interface RequestConfig {
  /** 请求URL */
  url: string;
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** 请求头 */
  header?: Record<string, string>;
  /** 请求数据 */
  data?: any;
  /** 请求参数 */
  params?: Record<string, any>;
  /** 超时时间 */
  timeout?: number;
  /** 是否显示加载状态 */
  showLoading?: boolean;
  /** 加载提示文字 */
  loadingText?: string;
  /** 是否显示错误提示 */
  showError?: boolean;
  /** 错误提示文字 */
  errorText?: string;
}

/** 请求响应 */
export interface RequestResponse<T = any> {
  /** 数据 */
  data: T;
  /** 状态码 */
  statusCode: number;
  /** 状态消息 */
  statusMessage?: string;
  /** 响应头 */
  header?: Record<string, string>;
}

/** 请求错误 */
export interface RequestError {
  /** 错误消息 */
  message: string;
  /** 错误码 */
  code?: number | string;
  /** 错误详情 */
  detail?: any;
}

// ==================== 导出类型 ====================

/** 通用回调函数类型 */
export type Callback<T = any> = (data: T) => void;

/** 异步函数类型 */
export type AsyncFunction<T = any> = () => Promise<T>;

/** 条件类型 */
export type Conditional<T, Condition, TrueType, FalseType> = T extends Condition ? TrueType : FalseType;

/** 深度部分类型 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 深度只读类型 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** 深度可写类型 */
export type DeepWriteable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepWriteable<T[P]> : T[P];
};

/** 深度必选类型 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/** 递归排除类型 */
export type RecursiveExclude<T, E> = T extends object
  ? {
      [P in keyof T as T[P] extends E ? never : P]: RecursiveExclude<T[P], E>;
    }
  : T;

/** 递归选择类型 */
export type RecursivePick<T, K extends string> = T extends object
  ? {
      [P in keyof T as P extends K ? P : never]: RecursivePick<T[P], K>;
    }
  : T;
