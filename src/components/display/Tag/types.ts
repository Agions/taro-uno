import { CSSProperties, ReactNode } from 'react'
import { ITouchEvent } from '@tarojs/components'

/**
 * 标签尺寸
 */
export type TagSize = 'small' | 'medium' | 'large'

/**
 * 标签类型
 */
export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'error'

/**
 * 标签形状
 */
export type TagShape = 'default' | 'round' | 'mark'

/**
 * Tag组件属性接口
 */
export interface TagProps {
  /**
   * 标签内容
   */
  children?: ReactNode

  /**
   * 标签尺寸
   * @default 'medium'
   */
  size?: TagSize

  /**
   * 标签类型
   * @default 'default'
   */
  type?: TagType

  /**
   * 标签形状
   * @default 'default'
   */
  shape?: TagShape

  /**
   * 标签颜色
   */
  color?: string

  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * 关闭事件
   */
  onClose?: (event: ITouchEvent) => void

  /**
   * 关闭前确认
   */
  closeConfirm?: boolean | string | ((e: ITouchEvent) => Promise<boolean>)

  /**
   * 是否可选中
   * @default false
   */
  checkable?: boolean

  /**
   * 是否选中
   */
  checked?: boolean

  /**
   * 默认是否选中
   * @default false
   */
  defaultChecked?: boolean

  /**
   * 选中状态变化回调
   */
  onChange?: (checked: boolean) => void

  /**
   * 自定义图标
   */
  icon?: ReactNode

  /**
   * 自定义关闭图标
   */
  closeIcon?: ReactNode

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties

  /**
   * 点击事件
   */
  onClick?: (event: ITouchEvent) => void

  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean
}
