import React from 'react';
import { BaseComponentProps as StandardBaseComponentProps } from '../../../types/component-props';

/** NavBar位置 */
export type NavBarPosition = 'top' | 'fixed' | 'static';

/** NavBar主题 */
export type NavBarTheme = 'light' | 'dark';

/** NavBar引用 */
export interface NavBarRef {
  /** 获取元素引用 */
  element: any | null;
  /** 设置标题 */
  setTitle: (_title: React.ReactNode) => void;
  /** 设置左侧内容 */
  setLeft: (_left: React.ReactNode) => void;
  /** 设置右侧内容 */
  setRight: (_right: React.ReactNode) => void;
  /** 显示返回按钮 */
  showBackArrow: () => void;
  /** 隐藏返回按钮 */
  hideBackArrow: () => void;
}

/** NavBar组件属性 */
export interface NavBarProps extends StandardBaseComponentProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 左侧内容 */
  left?: React.ReactNode;
  /** 右侧内容 */
  right?: React.ReactNode;
  /** 是否显示返回按钮 */
  backArrow?: boolean;
  /** 自定义返回按钮 */
  backIcon?: React.ReactNode;
  /** 返回按钮点击事件 */
  onBack?: () => void;
  /** 位置 */
  position?: NavBarPosition;
  /** 主题 */
  theme?: NavBarTheme;
  /** 背景色 */
  backgroundColor?: string;
  /** 是否透明背景 */
  transparent?: boolean;
  /** 是否显示边框 */
  border?: boolean;
  /** 固定定位时的占位高度 */
  placeholder?: boolean;
  /** 安全区域适配 */
  safeAreaInsetTop?: boolean;
}
