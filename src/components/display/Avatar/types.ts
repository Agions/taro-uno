import React from 'react'
import { ITouchEvent } from '@tarojs/components'

/**
 * Avatar 组件支持的尺寸类型
 */
export type AvatarSize = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Avatar 组件支持的形状类型
 */
export type AvatarShape = 'circle' | 'square'

/**
 * Avatar 组件属性接口
 */
export interface AvatarProps {
  /** 头像尺寸 */
  size?: AvatarSize

  /** 头像形状 */
  shape?: AvatarShape

  /** 图片地址 */
  src?: string

  /** 替代文本 */
  alt?: string

  /** 头像内容（文字或图标） */
  children?: React.ReactNode

  /** 图标 */
  icon?: React.ReactNode

  /** 自定义类名 */
  className?: string

  /** 自定义样式 */
  style?: React.CSSProperties

  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void

  /** 图片加载错误回调 */
  onError?: () => boolean | void

  /** 其他属性 */
  [key: string]: any
}

/**
 * AvatarGroup 组件属性接口
 */
export interface AvatarGroupProps {
  /** 子组件 */
  children?: React.ReactNode

  /** 最大显示数量 */
  maxCount?: number

  /** 头像尺寸 */
  size?: AvatarSize

  /** 头像形状 */
  shape?: AvatarShape

  /** 超出数量的提示文本 */
  maxPopoverTrigger?: 'hover' | 'focus' | 'click'

  /** 超出数量的样式 */
  maxStyle?: React.CSSProperties

  /** 自定义类名 */
  className?: string

  /** 自定义样式 */
  style?: React.CSSProperties
}
