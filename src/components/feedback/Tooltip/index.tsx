/**
 * Tooltip 文字提示组件
 * 提供丰富的文字提示功能，支持多种触发方式、位置、主题和动画效果
 * 专为 Taro 环境优化，完全兼容多端开发
 */

import { Tooltip as TooltipComponent } from './Tooltip';
import type { 
  TooltipProps, 
  TooltipRef, 
  TooltipTrigger, 
  TooltipPlacement,
  TooltipTheme,
  TooltipAnimation,
  TooltipState,
  TooltipAnimationConfig,
  TooltipPosition,
  TooltipThemeConfig,
  TooltipEventType,
  TooltipEventHandler,
  TooltipOptions,
  TooltipInstance
} from './Tooltip.types';
import tooltipStyles from './Tooltip.styles';
import { getTooltipClasses, getArrowClasses, tooltipCssClasses } from './Tooltip.styles';

// 主要导出
export { TooltipComponent as Tooltip };
export type { 
  TooltipProps, 
  TooltipRef, 
  TooltipTrigger, 
  TooltipPlacement,
  TooltipTheme,
  TooltipAnimation,
  TooltipState,
  TooltipAnimationConfig,
  TooltipPosition,
  TooltipThemeConfig,
  TooltipEventType,
  TooltipEventHandler,
  TooltipOptions,
  TooltipInstance
};

// 样式相关导出
export { tooltipStyles, getTooltipClasses, getArrowClasses, tooltipCssClasses };

// 重新导出常用类型
export type {
  TooltipProps as ITooltipProps,
  TooltipRef as ITooltipRef,
} from './Tooltip.types';

// 导出工具函数 - 针对 Taro 环境优化
export const TooltipUtils = {
  /**
   * 创建 Tooltip 实例 - Taro 兼容版本
   */
  create: (props: TooltipProps): TooltipInstance => {
    // 返回 Tooltip 实例创建逻辑
    return {
      id: `tooltip-${Date.now()}`,
      props,
      visible: false,
      show: () => {
        // Taro 环境中的显示逻辑

      },
      hide: () => {
        // Taro 环境中的隐藏逻辑

      },
      toggle: () => {
        // Taro 环境中的切换逻辑

      },
      update: (newProps: Partial<TooltipProps>) => {
        // Taro 环境中的更新逻辑

      },
      destroy: () => {
        // Taro 环境中的销毁逻辑

      },
    };
  },

  /**
   * 显示 Tooltip - Taro 兼容版本
   */
  show: (elementId: string, content: string, options?: Partial<TooltipProps>) => {
    // 在 Taro 环境中通过选择器显示指定元素的 Tooltip

    // 实际应用中可以使用 Taro 的选择器 API
  },

  /**
   * 隐藏 Tooltip - Taro 兼容版本
   */
  hide: (elementId: string) => {
    // 在 Taro 环境中隐藏指定元素的 Tooltip

    // 实际应用中可以使用 Taro 的选择器 API
  },

  /**
   * 更新 Tooltip 内容 - Taro 兼容版本
   */
  update: (elementId: string, content: string) => {
    // 在 Taro 环境中更新指定元素的 Tooltip 内容

    // 实际应用中可以使用 Taro 的选择器 API
  },

  /**
   * 销毁 Tooltip - Taro 兼容版本
   */
  destroy: (elementId: string) => {
    // 在 Taro 环境中销毁指定元素的 Tooltip

    // 实际应用中可以使用 Taro 的选择器 API
  },
};

// 导出默认配置 - 针对 Taro 环境优化
export const TooltipConfig = {
  // 默认配置
  defaultTrigger: 'hover' as TooltipTrigger,
  defaultPlacement: 'top' as TooltipPlacement,
  defaultTheme: 'dark' as TooltipTheme,
  defaultAnimation: 'fade' as TooltipAnimation,
  defaultShowDelay: 100,
  defaultHideDelay: 100,
  defaultArrow: true,
  defaultMaxWidth: 350,
  defaultZIndex: 1060,
  autoAdjustPosition: true,
  clickOutsideToHide: true,
  nestedTrigger: true,
  accessible: true,

  // 主题配置
  themes: {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#111827',
      borderColor: '#e5e7eb',
      arrowColor: '#ffffff',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    dark: {
      backgroundColor: '#1f2937',
      textColor: '#f9fafb',
      borderColor: '#374151',
      arrowColor: '#1f2937',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    },
    primary: {
      backgroundColor: '#0ea5e9',
      textColor: '#ffffff',
      borderColor: '#0ea5e9',
      arrowColor: '#0ea5e9',
      shadow: '0 4px 6px -1px rgba(14, 165, 233, 0.3), 0 2px 4px -1px rgba(14, 165, 233, 0.1)',
    },
    success: {
      backgroundColor: '#22c55e',
      textColor: '#ffffff',
      borderColor: '#22c55e',
      arrowColor: '#22c55e',
      shadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3), 0 2px 4px -1px rgba(34, 197, 94, 0.1)',
    },
    warning: {
      backgroundColor: '#f59e0b',
      textColor: '#ffffff',
      borderColor: '#f59e0b',
      arrowColor: '#f59e0b',
      shadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3), 0 2px 4px -1px rgba(245, 158, 11, 0.1)',
    },
    error: {
      backgroundColor: '#ef4444',
      textColor: '#ffffff',
      borderColor: '#ef4444',
      arrowColor: '#ef4444',
      shadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3), 0 2px 4px -1px rgba(239, 68, 68, 0.1)',
    },
    info: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderColor: '#3b82f6',
      arrowColor: '#3b82f6',
      shadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
    },
  },

  // 动画配置
  animations: {
    fade: {
      duration: 150,
      easing: 'ease-out',
    },
    scale: {
      duration: 150,
      easing: 'ease-out',
    },
    slide: {
      duration: 150,
      easing: 'ease-out',
    },
    none: {
      duration: 0,
      easing: 'linear',
    },
  },

  // 位置配置
  placements: {
    top: {
      offset: [0, -8],
    },
    bottom: {
      offset: [0, 8],
    },
    left: {
      offset: [-8, 0],
    },
    right: {
      offset: [8, 0],
    },
    topLeft: {
      offset: [0, -8],
    },
    topRight: {
      offset: [0, -8],
    },
    bottomLeft: {
      offset: [0, 8],
    },
    bottomRight: {
      offset: [0, 8],
    },
    leftTop: {
      offset: [-8, 0],
    },
    leftBottom: {
      offset: [-8, 0],
    },
    rightTop: {
      offset: [8, 0],
    },
    rightBottom: {
      offset: [8, 0],
    },
  },
};

// 导出 Tooltip 组件作为默认导出
export default TooltipComponent;