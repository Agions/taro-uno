/**
 * 标准化组件类型定义
 * 统一所有组件的属性接口，确保类型安全和API一致性
 */

import { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';

// ==================== 基础类型定义 ====================

/** 组件尺寸类型 - 统一标准 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 组件变体类型 - 统一标准 */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** 组件状态类型 - 统一标准 */
export type ComponentStatus = 'normal' | 'loading' | 'disabled' | 'error' | 'success' | 'warning';

/** 组件形状类型 - 统一标准 */
export type ComponentShape = 'default' | 'round' | 'circle' | 'square';

/** 组件方向类型 */
export type ComponentDirection = 'horizontal' | 'vertical';

/** 组件对齐类型 */
export type ComponentAlign = 'start' | 'center' | 'end' | 'stretch';

/** 组件位置类型 */
export type ComponentPosition = 'top' | 'right' | 'bottom' | 'left';

// ==================== 基础组件属性接口 ====================

/** 基础组件属性接口 */
export interface BaseComponentProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 测试ID */
  testID?: string;
  /** 子元素 */
  children?: ReactNode;
}

/** 可设置尺寸的组件属性 */
export interface SizeableProps extends BaseComponentProps {
  /** 组件尺寸 */
  size?: ComponentSize;
}

/** 可设置变体的组件属性 */
export interface VariantProps extends BaseComponentProps {
  /** 组件变体 */
  variant?: ComponentVariant;
}

/** 可设置状态的组件属性 */
export interface StatusProps extends BaseComponentProps {
  /** 组件状态 */
  status?: ComponentStatus;
}

/** 可设置形状的组件属性 */
export interface ShapeProps extends BaseComponentProps {
  /** 组件形状 */
  shape?: ComponentShape;
}

/** 可禁用的组件属性 */
export interface DisabledProps extends BaseComponentProps {
  /** 是否禁用 */
  disabled?: boolean;
}

/** 可只读的组件属性 */
export interface ReadonlyProps extends BaseComponentProps {
  /** 是否只读 */
  readonly?: boolean;
}

/** 可加载的组件属性 */
export interface LoadingProps extends BaseComponentProps {
  /** 加载状态 */
  loading?: boolean;
}

/** 可点击的组件属性 */
export interface ClickableProps extends BaseComponentProps {
  /** 点击事件处理 */
  onClick?: (event: ITouchEvent) => void;
  /** 是否可点击 */
  clickable?: boolean;
}

// ==================== 复合组件属性接口 ====================

/** 标准组件属性 - 组合所有常用属性 */
export interface StandardComponentProps
  extends SizeableProps,
    VariantProps,
    StatusProps,
    ShapeProps,
    DisabledProps,
    ReadonlyProps,
    LoadingProps,
    ClickableProps {
  /** 组件唯一标识 */
  id?: string;
  /** 数据属性 */
  data?: Record<string, any>;
}

/** 表单组件属性接口 */
export interface FormComponentProps extends StandardComponentProps {
  /** 表单字段名称 */
  name?: string;
  /** 表单字段值 */
  value?: any;
  /** 默认值 */
  defaultValue?: any;
  /** 占位符 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /** 变更事件处理 */
  onChange?: (value: any, event?: ITouchEvent) => void;
  /** 焦点事件处理 */
  onFocus?: (event: ITouchEvent) => void;
  /** 失焦事件处理 */
  onBlur?: (event: ITouchEvent) => void;
  /** 输入事件处理 */
  onInput?: (value: any, event?: ITouchEvent) => void;
  /** 确认事件处理 */
  onConfirm?: (value: any, event?: ITouchEvent) => void;
}

/** 布局组件属性接口 */
export interface LayoutComponentProps extends StandardComponentProps {
  /** 布局方向 */
  direction?: ComponentDirection;
  /** 对齐方式 */
  align?: ComponentAlign;
  /** 间距 */
  spacing?: number | string;
  /** 自动换行 */
  wrap?: boolean;
  /** 占据宽度 */
  span?: number;
  /** 偏移量 */
  offset?: number;
}

/** 显示组件属性接口 */
export interface DisplayComponentProps extends StandardComponentProps {
  /** 显示/隐藏 */
  visible?: boolean;
  /** 显示模式 */
  mode?: 'default' | 'card' | 'list' | 'grid';
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 副标题 */
  subtitle?: string;
  /** 额外内容 */
  extra?: ReactNode;
}

// ==================== 事件处理器类型 ====================

/** 通用事件处理器类型 */
export type EventHandler<T = any> = (event: T) => void;

/** 点击事件处理器 */
export type ClickHandler = EventHandler<ITouchEvent>;

/** 输入事件处理器 */
export type InputHandler<T = any> = (value: T, event?: ITouchEvent) => void;

/** 变更事件处理器 */
export type ChangeHandler<T = any> = (value: T, event?: ITouchEvent) => void;

/** 焦点事件处理器 */
export type FocusHandler = EventHandler<ITouchEvent>;

/** 选择事件处理器 */
export type SelectHandler<T = any> = (selected: T, event?: ITouchEvent) => void;

/** 滚动事件处理器 */
export type ScrollHandler = EventHandler<any>;

/** 自定义事件处理器 */
export type CustomEventHandler<T = any> = (data: T, event?: ITouchEvent) => void;

// ==================== 组件引用类型 ====================

/** 基础组件引用接口 */
export interface BaseComponentRef {
  /** DOM元素 */
  element: any;
  /** 获取组件尺寸 */
  getSize: () => ComponentSize | undefined;
  /** 获取组件变体 */
  getVariant: () => ComponentVariant | undefined;
  /** 获取组件状态 */
  getStatus: () => ComponentStatus | undefined;
  /** 检查是否禁用 */
  isDisabled: () => boolean;
  /** 检查是否只读 */
  isReadonly: () => boolean;
  /** 检查是否加载中 */
  isLoading: () => boolean;
  /** 禁用组件 */
  disable: () => void;
  /** 启用组件 */
  enable: () => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 设置状态 */
  setStatus: (status: ComponentStatus) => void;
  /** 聚焦组件 */
  focus: () => void;
  /** 失焦组件 */
  blur: () => void;
}

/** 表单组件引用接口 */
export interface FormComponentRef extends BaseComponentRef {
  /** 获取值 */
  getValue: () => any;
  /** 设置值 */
  setValue: (value: any) => void;
  /** 重置值 */
  reset: () => void;
  /** 清除值 */
  clear: () => void;
  /** 验证值 */
  validate: () => boolean | Promise<boolean>;
  /** 获取验证错误 */
  getValidationError: () => string | undefined;
}

/** 布局组件引用接口 */
export interface LayoutComponentRef extends BaseComponentRef {
  /** 获取布局方向 */
  getDirection: () => ComponentDirection | undefined;
  /** 获取对齐方式 */
  getAlign: () => ComponentAlign | undefined;
  /** 获取间距 */
  getSpacing: () => number | string | undefined;
  /** 设置布局方向 */
  setDirection: (direction: ComponentDirection) => void;
  /** 设置对齐方式 */
  setAlign: (align: ComponentAlign) => void;
  /** 设置间距 */
  setSpacing: (spacing: number | string) => void;
}

// ==================== 尺寸映射配置 ====================

/** 尺寸配置接口 */
export interface SizeConfig {
  fontSize: number;
  padding: string;
  height: number;
  borderRadius: number;
  iconSize?: number;
  borderWidth?: number;
}

/** 标准尺寸映射 */
export const STANDARD_SIZE_MAP: Record<ComponentSize, SizeConfig> = {
  xs: {
    fontSize: 12,
    padding: '4px 8px',
    height: 24,
    borderRadius: 4,
    iconSize: 14,
    borderWidth: 1,
  },
  sm: {
    fontSize: 14,
    padding: '6px 12px',
    height: 32,
    borderRadius: 6,
    iconSize: 16,
    borderWidth: 1,
  },
  md: {
    fontSize: 16,
    padding: '8px 16px',
    height: 40,
    borderRadius: 8,
    iconSize: 18,
    borderWidth: 1,
  },
  lg: {
    fontSize: 18,
    padding: '12px 24px',
    height: 48,
    borderRadius: 10,
    iconSize: 20,
    borderWidth: 2,
  },
  xl: {
    fontSize: 20,
    padding: '16px 32px',
    height: 56,
    borderRadius: 12,
    iconSize: 24,
    borderWidth: 2,
  },
};

// ==================== 颜色映射配置 ====================

/** 变体颜色配置接口 */
export interface VariantColorConfig {
  background: string;
  color: string;
  border: string;
  hover?: {
    background: string;
    color: string;
    border: string;
  };
  active?: {
    background: string;
    color: string;
    border: string;
  };
  disabled?: {
    background: string;
    color: string;
    border: string;
  };
}

/** 标准变体颜色映射 */
export const STANDARD_VARIANT_COLORS: Record<ComponentVariant, VariantColorConfig> = {
  default: {
    background: '#ffffff',
    color: '#374151',
    border: '#d1d5db',
    hover: {
      background: '#f9fafb',
      color: '#374151',
      border: '#d1d5db',
    },
    active: {
      background: '#f3f4f6',
      color: '#374151',
      border: '#d1d5db',
    },
    disabled: {
      background: '#f9fafb',
      color: '#9ca3af',
      border: '#e5e7eb',
    },
  },
  primary: {
    background: '#3b82f6',
    color: '#ffffff',
    border: '#3b82f6',
    hover: {
      background: '#2563eb',
      color: '#ffffff',
      border: '#2563eb',
    },
    active: {
      background: '#1d4ed8',
      color: '#ffffff',
      border: '#1d4ed8',
    },
    disabled: {
      background: '#dbeafe',
      color: '#93c5fd',
      border: '#93c5fd',
    },
  },
  secondary: {
    background: '#6b7280',
    color: '#ffffff',
    border: '#6b7280',
    hover: {
      background: '#4b5563',
      color: '#ffffff',
      border: '#4b5563',
    },
    active: {
      background: '#374151',
      color: '#ffffff',
      border: '#374151',
    },
    disabled: {
      background: '#f3f4f6',
      color: '#d1d5db',
      border: '#e5e7eb',
    },
  },
  success: {
    background: '#10b981',
    color: '#ffffff',
    border: '#10b981',
    hover: {
      background: '#059669',
      color: '#ffffff',
      border: '#059669',
    },
    active: {
      background: '#047857',
      color: '#ffffff',
      border: '#047857',
    },
    disabled: {
      background: '#d1fae5',
      color: '#6ee7b7',
      border: '#6ee7b7',
    },
  },
  warning: {
    background: '#f59e0b',
    color: '#ffffff',
    border: '#f59e0b',
    hover: {
      background: '#d97706',
      color: '#ffffff',
      border: '#d97706',
    },
    active: {
      background: '#b45309',
      color: '#ffffff',
      border: '#b45309',
    },
    disabled: {
      background: '#fef3c7',
      color: '#fcd34d',
      border: '#fcd34d',
    },
  },
  danger: {
    background: '#ef4444',
    color: '#ffffff',
    border: '#ef4444',
    hover: {
      background: '#dc2626',
      color: '#ffffff',
      border: '#dc2626',
    },
    active: {
      background: '#b91c1c',
      color: '#ffffff',
      border: '#b91c1c',
    },
    disabled: {
      background: '#fee2e2',
      color: '#fca5a5',
      border: '#fca5a5',
    },
  },
  info: {
    background: '#06b6d4',
    color: '#ffffff',
    border: '#06b6d4',
    hover: {
      background: '#0891b2',
      color: '#ffffff',
      border: '#0891b2',
    },
    active: {
      background: '#0e7490',
      color: '#ffffff',
      border: '#0e7490',
    },
    disabled: {
      background: '#cffafe',
      color: '#67e8f9',
      border: '#67e8f9',
    },
  },
};

// ==================== 状态颜色配置 ====================

/** 状态颜色配置接口 */
export interface StatusColorConfig {
  color: string;
  backgroundColor?: string;
  borderColor?: string;
  icon?: string;
}

/** 标准状态颜色映射 */
export const STANDARD_STATUS_COLORS: Record<ComponentStatus, StatusColorConfig> = {
  normal: {
    color: '#374151',
    borderColor: '#d1d5db',
  },
  loading: {
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    borderColor: '#d1d5db',
    icon: '⏳',
  },
  disabled: {
    color: '#9ca3af',
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  error: {
    color: '#ef4444',
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    icon: '❌',
  },
  success: {
    color: '#22c55e',
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    icon: '✅',
  },
  warning: {
    color: '#f59e0b',
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
    icon: '⚠️',
  },
};

// ==================== 工具类型 ====================

/** 组件属性合并类型 */
export type MergeComponentProps<T, U> = T & U;

/** 可选组件属性类型 */
export type OptionalComponentProps<T> = Partial<T>;

/** 必需组件属性类型 */
export type RequiredComponentProps<T> = Required<T>;

/** 组件属性提取类型 */
export type ExtractComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/** 组件引用提取类型 */
export type ExtractComponentRef<T> = T extends React.RefObject<infer R> ? R : never;

// ==================== 导出 ====================
