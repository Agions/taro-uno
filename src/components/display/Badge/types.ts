import { CSSProperties, ReactNode } from 'react'
import { ITouchEvent } from '@tarojs/components'

/**
 * 徽标尺寸
 */
export type BadgeSize = 'small' | 'medium' | 'large'

/**
 * 徽标类型
 */
export type BadgeType = 'default' | 'primary' | 'success' | 'warning' | 'error'

/**
 * 徽标状态
 */
export type BadgeStatus = 'processing' | 'default' | 'success' | 'warning' | 'error'

/**
 * Badge组件属性接口
 */
export interface BadgeProps {
  /**
   * 徽标内容
   */
  count?: ReactNode

  /**
   * 封装的内容
   */
  children?: ReactNode

  /**
   * 是否显示小红点
   * @default false
   */
  dot?: boolean

  /**
   * 最大计数值，超过显示{max}+
   * @default 99
   */
  max?: number

  /**
   * 是否显示0值
   * @default false
   */
  showZero?: boolean

  /**
   * 自定义颜色
   */
  color?: string

  /**
   * 徽标位置
   * @default 'right-top'
   */
  placement?: 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'

  /**
   * 徽标尺寸
   * @default 'medium'
   */
  size?: BadgeSize

  /**
   * 徽标类型
   * @default 'error'
   */
  type?: BadgeType

  /**
   * 徽标状态
   */
  status?: BadgeStatus

  /**
   * 设置状态点的文本
   */
  text?: ReactNode

  /**
   * 设置偏移量 [x, y]
   */
  offset?: [number, number]

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties

  /**
   * 徽标的自定义类名
   */
  badgeClassName?: string

  /**
   * 徽标的自定义样式
   */
  badgeStyle?: CSSProperties

  /**
   * 点击事件
   */
  onClick?: (event: ITouchEvent) => void

  /**
   * 是否独立使用，不包裹子元素
   * @default false
   */
  standalone?: boolean
}
