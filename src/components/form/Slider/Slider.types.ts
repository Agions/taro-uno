import React from 'react';

export interface SliderProps {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 当前值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** 滑块尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 滑块变体 */
  variant?: 'default' | 'filled' | 'outlined';
  /** 是否禁用 */
  disabled?: boolean;
  /** 刻度标记 */
  marks?: Record<number, React.ReactNode>;
  /** 是否包含已选择部分 */
  included?: boolean;
  /** 是否垂直方向 */
  vertical?: boolean;
  /** 是否反向 */
  reverse?: boolean;
  /** 工具提示配置 */
  tooltip?: {
    /** 是否显示工具提示 */
    visible?: boolean;
    /** 格式化函数 */
    formatter?: (_value: number) => React.ReactNode;
  } | boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 值变化时的回调 */
  onChange?: (_value: number) => void;
  /** 拖拽结束时的回调 */
  onChangeComplete?: (_value: number) => void;
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
  };
}

export interface SliderRef {
  /** 获取当前值 */
  getValue: () => number;
  /** 设置值 */
  setValue: (_value: number) => void;
  /** 禁用滑块 */
  disable: () => void;
  /** 启用滑块 */
  enable: () => void;
}

export type SliderSize = 'small' | 'medium' | 'large';

export type SliderVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface SliderMark {
  /** 值 */
  value: number;
  /** 标签 */
  label: React.ReactNode;
  /** 样式 */
  style?: React.CSSProperties;
}

export interface SliderUtils {
  /** 计算滑块位置 */
  calculatePosition: (_value: number, min: number, max: number) => number;
  /** 计算对应的值 */
  calculateValue: (_position: number, min: number, max: number) => number;
  /** 格式化显示值 */
  formatValue: (_value: number, step: number) => number;
  /** 验证值是否在范围内 */
  validateValue: (_value: number, min: number, max: number) => boolean;
}

export const SliderUtils: SliderUtils = {
  calculatePosition: (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  },
  
  calculateValue: (position: number, min: number, max: number) => {
    return min + (position / 100) * (max - min);
  },
  
  formatValue: (value: number, step: number) => {
    return Math.round(value / step) * step;
  },
  
  validateValue: (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  },
};