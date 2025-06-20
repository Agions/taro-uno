import React, { ReactNode } from 'react'

/**
 * 时间轴条目属性
 */
export interface TimelineItemProps {
  /**
   * 节点颜色
   * @default 'blue'
   */
  color?: string | 'primary' | 'success' | 'warning' | 'danger' | 'info'

  /**
   * 自定义节点
   */
  dot?: ReactNode

  /**
   * 标签文本
   */
  label?: ReactNode

  /**
   * 节点位置
   * @default 'left'
   */
  position?: 'left' | 'right'

  /**
   * 子元素
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: React.CSSProperties
}

/**
 * 时间轴属性
 */
export interface TimelineProps {
  /**
   * 排序方向
   * @default 'normal'
   */
  mode?: 'normal' | 'reverse'

  /**
   * 节点位置
   * @default 'left'
   */
  position?: 'left' | 'right' | 'alternate'

  /**
   * 是否展示幽灵节点
   * @default false
   */
  pending?: boolean | ReactNode

  /**
   * 幽灵节点内容
   */
  pendingDot?: ReactNode

  /**
   * 子元素
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: React.CSSProperties
}
