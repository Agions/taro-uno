/**
 * Button 组件类型定义
 * 继承 InteractiveProps，移除重复类型定义
 * @module components/basic/Button/Button.types
 */

import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import type { InteractiveProps } from '../../../types/component';
import type { Status, Shape } from '../../../types/common';

// ==================== Button Props ====================

/**
 * Button 组件 Props
 * @description 继承 InteractiveProps，包含 className, style, size, variant, disabled, loading
 */
export interface ButtonProps extends InteractiveProps {
  /**
   * 按钮类型/状态
   * @description 控制按钮的语义颜色
   * @default 'default'
   */
  type?: Status;

  /**
   * 按钮形状
   * @description 控制按钮的边角形状
   * @default 'default'
   */
  shape?: Shape;

  /**
   * 是否块级显示
   * @description 块级按钮会占满父容器宽度
   * @default false
   */
  block?: boolean;

  /**
   * 图标
   * @description 按钮内显示的图标
   */
  icon?: ReactNode;

  /**
   * 图标位置
   * @description 图标相对于文字的位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * 子元素
   * @description 按钮内容
   */
  children?: ReactNode;

  /**
   * 点击事件回调
   * @description 点击按钮时触发
   */
  onClick?: (event: ITouchEvent) => void;

  /**
   * 无障碍标签
   * @description 用于屏幕阅读器的描述文本
   */
  accessibilityLabel?: string;

  /**
   * 无障碍角色
   * @description 用于屏幕阅读器的角色标识
   */
  accessibilityRole?: string;

  /**
   * 无障碍状态
   * @description 用于屏幕阅读器的状态信息
   */
  accessibilityState?: {
    disabled?: boolean;
    busy?: boolean;
    selected?: boolean;
  };
}

// ==================== Button Ref ====================

/**
 * Button 组件 Ref 类型
 * @description 通过 ref 暴露的方法和属性
 */
export interface ButtonRef {
  /**
   * DOM 元素引用
   */
  element: HTMLButtonElement | null;

  /**
   * 获取按钮类型
   */
  getType: () => Status;

  /**
   * 获取按钮尺寸
   */
  getSize: () => 'sm' | 'md' | 'lg';

  /**
   * 检查是否禁用
   */
  isDisabled: () => boolean;

  /**
   * 检查是否加载中
   */
  isLoading: () => boolean;

  /**
   * 触发点击
   */
  click: () => void;
}
