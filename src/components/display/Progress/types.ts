import { CSSProperties, ReactNode } from 'react'

// 进度条类型
export type ProgressType = 'line' | 'circle' | 'dashboard'

// 进度条尺寸
export type ProgressSize = 'small' | 'medium' | 'large'

// 进度条状态
export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active'

// 步骤进度条配置
export interface ProgressSteps {
  // 总步骤数
  count: number
  // 当前步骤
  current?: number
  // 步骤间隔
  stepWidth?: number
  // 步骤自定义样式
  stepStyle?: CSSProperties
  // 当前步骤是否活跃
  activeStepStyle?: CSSProperties
}

// 进度条格式化函数
export type ProgressFormatter = (percent: number, successPercent?: number) => ReactNode

// 进度条属性
export interface ProgressProps {
  /**
   * 进度条类型
   * @default 'line'
   */
  type?: ProgressType

  /**
   * 进度条尺寸
   * @default 'medium'
   */
  size?: ProgressSize

  /**
   * 进度百分比
   * @default 0
   */
  percent?: number

  /**
   * 成功进度百分比，显示两种颜色
   */
  successPercent?: number

  /**
   * 进度条状态
   * @default 'normal'
   */
  status?: ProgressStatus

  /**
   * 是否显示进度数值或状态图标
   * @default true
   */
  showInfo?: boolean

  /**
   * 进度条颜色
   */
  strokeColor?: string | string[] | { from: string; to: string }

  /**
   * 成功状态的颜色
   * @default '#52c41a'
   */
  successColor?: string

  /**
   * 未完成的分段的颜色
   * @default '#f5f5f5'
   */
  trailColor?: string

  /**
   * 进度条线的宽度
   * @default 8
   */
  strokeWidth?: number

  /**
   * 进度条线的间隔（仅适用于circle和dashboard）
   * @default 4
   */
  strokeLinecap?: 'round' | 'square' | 'butt'

  /**
   * 圆形进度条画布宽度（仅适用于circle和dashboard）
   * @default 120
   */
  width?: number

  /**
   * 仪表盘进度条缺口角度（仅适用于dashboard）
   * @default 0
   */
  gapDegree?: number

  /**
   * 仪表盘进度条缺口位置（仅适用于dashboard）
   * @default 'bottom'
   */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right'

  /**
   * 进度条文字内容
   */
  format?: ProgressFormatter

  /**
   * 步骤进度条配置（仅适用于line）
   */
  steps?: ProgressSteps

  /**
   * 自定义样式
   */
  style?: CSSProperties

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 进度变化回调
   */
  onChange?: (percent: number) => void
}
