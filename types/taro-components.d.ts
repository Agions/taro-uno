import { ITouchEvent } from '@tarojs/components';
import type { ReactNode } from 'react';
import type { AccessibilityState, AccessibilityProps, AccessibilityEvents } from './accessibility';

// 扩展 Taro View 组件属性
declare module '@tarojs/components' {
  interface ViewProps {
    /** 是否启用无障碍访问 */
    accessible?: boolean;
    /** 无障碍标签 */
    accessibilityLabel?: string;
    /** 无障碍角色 */
    accessibilityRole?: string;
    /** 无障碍提示 */
    accessibilityHint?: string;
    /** 无障碍状态 */
    accessibilityState?: AccessibilityState;
    /** 无障碍值 */
    accessibilityValue?: {
      min?: number;
      max?: number;
      now?: number;
      text?: string;
    };
    /** 无障碍元素标识 */
    accessibilityId?: string;
    /** 无障碍动作 */
    accessibilityActions?: Array<{
      name: string;
      label?: string;
    }>;
    /** 无障碍实时区域类型 */
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
    /** 无障碍重要程度 */
    accessibilityImportant?: boolean;
    /** 无障碍视图是否隐藏 */
    accessibilityViewIsModal?: boolean;
    /** 无障碍元素树角色 */
    accessibilityElementsHidden?: boolean;
    /** 无障碍动作事件 */
    onAccessibilityAction?: (event: {
      nativeEvent: {
        actionName: string;
      };
    }) => void;
    /** 无障碍焦点变化事件 */
    onAccessibilityFocus?: (event: ITouchEvent) => void;
    /** 无障碍提示变化事件 */
    onAccessibilityHintChange?: (event: ITouchEvent) => void;
    /** 无障碍状态变化事件 */
    onAccessibilityStateChange?: (event: ITouchEvent) => void;
    /** 无障碍值变化事件 */
    onAccessibilityValueChange?: (event: ITouchEvent) => void;
    /** 无障碍标签变化事件 */
    onAccessibilityLabelChange?: (event: ITouchEvent) => void;
    /** 无障碍角色变化事件 */
    onAccessibilityRoleChange?: (event: ITouchEvent) => void;
    /** 无障碍动作请求事件 */
    onAccessibilityRequest?: (event: {
      nativeEvent: {
        actionName: string;
        actionTarget: string;
      };
    }) => void;
    /** 无障碍完成事件 */
    onAccessibilityDone?: (event: ITouchEvent) => void;
    /** 无障碍取消事件 */
    onAccessibilityCancel?: (event: ITouchEvent) => void;
    /** 无障碍错误事件 */
    onAccessibilityError?: (event: ITouchEvent) => void;
    /** 无障碍警告事件 */
    onAccessibilityWarning?: (event: ITouchEvent) => void;
    /** 无障碍信息事件 */
    onAccessibilityInfo?: (event: ITouchEvent) => void;
    /** 无障碍成功事件 */
    onAccessibilitySuccess?: (event: ITouchEvent) => void;
  }

  interface InputProps {
    /** 是否启用无障碍访问 */
    accessible?: boolean;
    /** 无障碍标签 */
    accessibilityLabel?: string;
    /** 无障碍角色 */
    accessibilityRole?: string;
    /** 无障碍提示 */
    accessibilityHint?: string;
    /** 无障碍状态 */
    accessibilityState?: AccessibilityState;
    /** 无障碍值 */
    accessibilityValue?: {
      min?: number;
      max?: number;
      now?: number;
      text?: string;
    };
    /** 无障碍元素标识 */
    accessibilityId?: string;
    /** 无障碍动作 */
    accessibilityActions?: Array<{
      name: string;
      label?: string;
    }>;
    /** 无障碍实时区域类型 */
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
    /** 无障碍重要程度 */
    accessibilityImportant?: boolean;
    /** 无障碍视图是否隐藏 */
    accessibilityViewIsModal?: boolean;
    /** 无障碍元素树角色 */
    accessibilityElementsHidden?: boolean;
    /** 无障碍动作事件 */
    onAccessibilityAction?: (event: {
      nativeEvent: {
        actionName: string;
      };
    }) => void;
    /** 无障碍焦点变化事件 */
    onAccessibilityFocus?: (event: ITouchEvent) => void;
    /** 无障碍提示变化事件 */
    onAccessibilityHintChange?: (event: ITouchEvent) => void;
    /** 无障碍状态变化事件 */
    onAccessibilityStateChange?: (event: ITouchEvent) => void;
    /** 无障碍值变化事件 */
    onAccessibilityValueChange?: (event: ITouchEvent) => void;
    /** 无障碍标签变化事件 */
    onAccessibilityLabelChange?: (event: ITouchEvent) => void;
    /** 无障碍角色变化事件 */
    onAccessibilityRoleChange?: (event: ITouchEvent) => void;
    /** 无障碍动作请求事件 */
    onAccessibilityRequest?: (event: {
      nativeEvent: {
        actionName: string;
        actionTarget: string;
      };
    }) => void;
    /** 无障碍完成事件 */
    onAccessibilityDone?: (event: ITouchEvent) => void;
    /** 无障碍取消事件 */
    onAccessibilityCancel?: (event: ITouchEvent) => void;
    /** 无障碍错误事件 */
    onAccessibilityError?: (event: ITouchEvent) => void;
    /** 无障碍警告事件 */
    onAccessibilityWarning?: (event: ITouchEvent) => void;
    /** 无障碍信息事件 */
    onAccessibilityInfo?: (event: ITouchEvent) => void;
    /** 无障碍成功事件 */
    onAccessibilitySuccess?: (event: ITouchEvent) => void;
  }

  interface TextProps {
    /** 是否启用无障碍访问 */
    accessible?: boolean;
    /** 无障碍标签 */
    accessibilityLabel?: string;
    /** 无障碍角色 */
    accessibilityRole?: string;
    /** 无障碍提示 */
    accessibilityHint?: string;
    /** 无障碍状态 */
    accessibilityState?: AccessibilityState;
    /** 无障碍值 */
    accessibilityValue?: {
      min?: number;
      max?: number;
      now?: number;
      text?: string;
    };
    /** 无障碍元素标识 */
    accessibilityId?: string;
    /** 无障碍动作 */
    accessibilityActions?: Array<{
      name: string;
      label?: string;
    }>;
    /** 无障碍实时区域类型 */
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
    /** 无障碍重要程度 */
    accessibilityImportant?: boolean;
    /** 无障碍视图是否隐藏 */
    accessibilityViewIsModal?: boolean;
    /** 无障碍元素树角色 */
    accessibilityElementsHidden?: boolean;
    /** 无障碍动作事件 */
    onAccessibilityAction?: (event: {
      nativeEvent: {
        actionName: string;
      };
    }) => void;
    /** 无障碍焦点变化事件 */
    onAccessibilityFocus?: (event: ITouchEvent) => void;
    /** 无障碍提示变化事件 */
    onAccessibilityHintChange?: (event: ITouchEvent) => void;
    /** 无障碍状态变化事件 */
    onAccessibilityStateChange?: (event: ITouchEvent) => void;
    /** 无障碍值变化事件 */
    onAccessibilityValueChange?: (event: ITouchEvent) => void;
    /** 无障碍标签变化事件 */
    onAccessibilityLabelChange?: (event: ITouchEvent) => void;
    /** 无障碍角色变化事件 */
    onAccessibilityRoleChange?: (event: ITouchEvent) => void;
    /** 无障碍动作请求事件 */
    onAccessibilityRequest?: (event: {
      nativeEvent: {
        actionName: string;
        actionTarget: string;
      };
    }) => void;
    /** 无障碍完成事件 */
    onAccessibilityDone?: (event: ITouchEvent) => void;
    /** 无障碍取消事件 */
    onAccessibilityCancel?: (event: ITouchEvent) => void;
    /** 无障碍错误事件 */
    onAccessibilityError?: (event: ITouchEvent) => void;
    /** 无障碍警告事件 */
    onAccessibilityWarning?: (event: ITouchEvent) => void;
    /** 无障碍信息事件 */
    onAccessibilityInfo?: (event: ITouchEvent) => void;
    /** 无障碍成功事件 */
    onAccessibilitySuccess?: (event: ITouchEvent) => void;
  }

  interface ButtonProps {
    /** 是否启用无障碍访问 */
    accessible?: boolean;
    /** 无障碍标签 */
    accessibilityLabel?: string;
    /** 无障碍角色 */
    accessibilityRole?: string;
    /** 无障碍提示 */
    accessibilityHint?: string;
    /** 无障碍状态 */
    accessibilityState?: AccessibilityState;
    /** 无障碍值 */
    accessibilityValue?: {
      min?: number;
      max?: number;
      now?: number;
      text?: string;
    };
    /** 无障碍元素标识 */
    accessibilityId?: string;
    /** 无障碍动作 */
    accessibilityActions?: Array<{
      name: string;
      label?: string;
    }>;
    /** 无障碍实时区域类型 */
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
    /** 无障碍重要程度 */
    accessibilityImportant?: boolean;
    /** 无障碍视图是否隐藏 */
    accessibilityViewIsModal?: boolean;
    /** 无障碍元素树角色 */
    accessibilityElementsHidden?: boolean;
    /** 无障碍动作事件 */
    onAccessibilityAction?: (event: {
      nativeEvent: {
        actionName: string;
      };
    }) => void;
    /** 无障碍焦点变化事件 */
    onAccessibilityFocus?: (event: ITouchEvent) => void;
    /** 无障碍提示变化事件 */
    onAccessibilityHintChange?: (event: ITouchEvent) => void;
    /** 无障碍状态变化事件 */
    onAccessibilityStateChange?: (event: ITouchEvent) => void;
    /** 无障碍值变化事件 */
    onAccessibilityValueChange?: (event: ITouchEvent) => void;
    /** 无障碍标签变化事件 */
    onAccessibilityLabelChange?: (event: ITouchEvent) => void;
    /** 无障碍角色变化事件 */
    onAccessibilityRoleChange?: (event: ITouchEvent) => void;
    /** 无障碍动作请求事件 */
    onAccessibilityRequest?: (event: {
      nativeEvent: {
        actionName: string;
        actionTarget: string;
      };
    }) => void;
    /** 无障碍完成事件 */
    onAccessibilityDone?: (event: ITouchEvent) => void;
    /** 无障碍取消事件 */
    onAccessibilityCancel?: (event: ITouchEvent) => void;
    /** 无障碍错误事件 */
    onAccessibilityError?: (event: ITouchEvent) => void;
    /** 无障碍警告事件 */
    onAccessibilityWarning?: (event: ITouchEvent) => void;
    /** 无障碍信息事件 */
    onAccessibilityInfo?: (event: ITouchEvent) => void;
    /** 无障碍成功事件 */
    onAccessibilitySuccess?: (event: ITouchEvent) => void;
  }
}