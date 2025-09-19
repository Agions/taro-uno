/**
 * Taro 组件无障碍属性扩展
 * 为 Taro 组件添加无障碍属性支持
 */

import type { AccessibilityProps, AccessibilityState } from './accessibility';

// 扩展 Taro 基础组件属性
declare module '@tarojs/components' {
  // 扩展 StandardProps 接口，所有组件都会继承这些属性
  interface StandardProps {
    // 添加无障碍属性到基础接口
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityRole?: string;
    accessibilityHint?: string;
    accessibilityState?: AccessibilityState;
    accessibilityValue?: {
      min?: number;
      max?: number;
      now?: number;
      text?: string;
    };
    accessibilityId?: string;
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
    onAccessibilityTap?: () => void;
    onAccessibilityEscape?: () => void;
  }

  // View 组件已经继承了 StandardProps，无需单独扩展
  // Text 组件已经继承了 StandardProps，无需单独扩展
  
  // 扩展特定组件的事件接口
  interface ViewProps {
    // 保留原有的事件类型
    onClick?: (event: ITouchEvent) => void;
    onTouchStart?: (event: ITouchEvent) => void;
    onTouchMove?: (event: ITouchEvent) => void;
    onTouchEnd?: (event: ITouchEvent) => void;
    onTouchCancel?: (event: ITouchEvent) => void;
    onLongPress?: (event: ITouchEvent) => void;
  }

  interface TextProps {
    // 保留原有的事件类型
    onClick?: (event: ITouchEvent) => void;
    onTouchStart?: (event: ITouchEvent) => void;
    onTouchMove?: (event: ITouchEvent) => void;
    onTouchEnd?: (event: ITouchEvent) => void;
    onTouchCancel?: (event: ITouchEvent) => void;
    onLongPress?: (event: ITouchEvent) => void;
  }

  interface ButtonProps {
    // 保留原有的事件类型
    onClick?: (event: ITouchEvent) => void;
    onTouchStart?: (event: ITouchEvent) => void;
    onTouchMove?: (event: ITouchEvent) => void;
    onTouchEnd?: (event: ITouchEvent) => void;
    onTouchCancel?: (event: ITouchEvent) => void;
    onLongPress?: (event: ITouchEvent) => void;
  }

  interface ImageProps {
    // 保留原有的事件类型
    onClick?: (event: ITouchEvent) => void;
    onTouchStart?: (event: ITouchEvent) => void;
    onTouchMove?: (event: ITouchEvent) => void;
    onTouchEnd?: (event: ITouchEvent) => void;
    onTouchCancel?: (event: ITouchEvent) => void;
    onLongPress?: (event: ITouchEvent) => void;
  }
}