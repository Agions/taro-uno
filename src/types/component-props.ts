/**
 * 统一组件配置类型
 * 提供一致的组件API接口
 */

// ==================== 统一尺寸类型 ====================
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ==================== 统一变体类型 ====================
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

// ==================== 统一状态类型 ====================
export type ComponentStatus = 'default' | 'loading' | 'disabled' | 'error' | 'success' | 'warning';

// ==================== 统一形状类型 ====================
export type ComponentShape = 'default' | 'round' | 'circle' | 'square';

// ==================== 通用组件属性接口 ====================
import type React from 'react';

export interface BaseComponentProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 测试ID */
  testID?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

export interface SizeableProps extends BaseComponentProps {
  /** 组件尺寸 */
  size?: ComponentSize;
}

export interface VariantProps extends BaseComponentProps {
  /** 组件变体 */
  variant?: ComponentVariant;
}

export interface StatusProps extends BaseComponentProps {
  /** 组件状态 */
  status?: ComponentStatus;
}

export interface ShapeProps extends BaseComponentProps {
  /** 组件形状 */
  shape?: ComponentShape;
}

export interface DisabledProps extends BaseComponentProps {
  /** 是否禁用 */
  disabled?: boolean;
}

export interface LoadingProps extends BaseComponentProps {
  /** 加载状态 */
  loading?: boolean;
}

// ==================== 复合组件属性接口 ====================
export interface StandardComponentProps
  extends SizeableProps,
    VariantProps,
    StatusProps,
    ShapeProps,
    DisabledProps,
    LoadingProps {
  /** 组件唯一标识 */
  id?: string;
  /** 无障碍标签 */
  ariaLabel?: string;
  /** 无障碍描述 */
  ariaDescribedBy?: string;
}

// ==================== 尺寸映射配置 ====================
export interface SizeConfig {
  fontSize: number;
  padding: string;
  height: number;
  borderRadius: number;
  iconSize?: number;
}

export const COMPONENT_SIZE_MAP: Record<ComponentSize, SizeConfig> = {
  xs: {
    fontSize: 12,
    padding: '4px 8px',
    height: 24,
    borderRadius: 4,
    iconSize: 14,
  },
  sm: {
    fontSize: 14,
    padding: '6px 12px',
    height: 32,
    borderRadius: 6,
    iconSize: 16,
  },
  md: {
    fontSize: 16,
    padding: '8px 16px',
    height: 40,
    borderRadius: 8,
    iconSize: 18,
  },
  lg: {
    fontSize: 18,
    padding: '12px 24px',
    height: 48,
    borderRadius: 10,
    iconSize: 20,
  },
  xl: {
    fontSize: 20,
    padding: '16px 32px',
    height: 56,
    borderRadius: 12,
    iconSize: 24,
  },
};

// ==================== 颜色映射配置 ====================
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
}

export const COMPONENT_VARIANT_COLORS: Record<ComponentVariant, VariantColorConfig> = {
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
  },
};

// ==================== 状态颜色配置 ====================
export interface StatusColorConfig {
  color: string;
  backgroundColor?: string;
  borderColor?: string;
  icon?: string;
}

export const COMPONENT_STATUS_COLORS: Record<ComponentStatus, StatusColorConfig> = {
  default: {
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

// ==================== 组件引用类型 ====================
export interface ComponentRef {
  /** DOM元素 */
  element: HTMLElement | null;
  /** 获取组件尺寸 */
  getSize: () => ComponentSize;
  /** 获取组件变体 */
  getVariant: () => ComponentVariant;
  /** 获取组件状态 */
  getStatus: () => ComponentStatus;
  /** 检查是否禁用 */
  isDisabled: () => boolean;
  /** 检查是否加载中 */
  isLoading: () => boolean;
  /** 禁用组件 */
  disable: () => void;
  /** 启用组件 */
  enable: () => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 设置状态 */
  setStatus: (status: ComponentStatus) => void;
  /** 聚焦组件 */
  focus: () => void;
  /** 失焦组件 */
  blur: () => void;
}

export {};
