import { ReactNode, CSSProperties } from 'react'
import { ITouchEvent, CommonEventFunction } from '@tarojs/components'

// 基础组件 Props 接口
export interface BaseComponentProps {
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: CSSProperties
  /** 测试 ID */
  testId?: string
  /** 子元素 */
  children?: ReactNode
}

// 尺寸类型
export type ComponentSize = 'small' | 'medium' | 'large'

// 颜色类型
export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

// 按钮类型
export type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'link'

// 按钮形状
export type ButtonShape = 'default' | 'round' | 'circle'

// 文本类型
export type TextType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'

// 文本大小
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// 文本权重
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

// 头像形状
export type AvatarShape = 'circle' | 'square'

// 分割线类型
export type DividerType = 'horizontal' | 'vertical'

// 分割线对齐方式
export type DividerAlign = 'left' | 'center' | 'right'

// 卡片阴影
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

// 徽标类型
export type BadgeType = 'default' | 'primary' | 'success' | 'warning' | 'error'

// 标签类型
export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'error'

// 标签变体
export type TagVariant = 'filled' | 'outlined' | 'light'

// 时间轴模式
export type TimelineMode = 'left' | 'right' | 'alternate'

// 步骤条方向
export type StepsDirection = 'horizontal' | 'vertical'

// 步骤条状态
export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

// 标签页位置
export type TabsPosition = 'top' | 'bottom' | 'left' | 'right'

// 表单验证状态
export type FormValidateStatus = 'success' | 'warning' | 'error' | 'validating'

// 模态框类型
export type ModalType = 'default' | 'confirm' | 'info' | 'success' | 'warning' | 'error'

// 事件处理器类型
export interface TouchEventHandler {
  (event: ITouchEvent): void
}

export interface CommonEventHandler<T = unknown> {
  (event: CommonEventFunction<T>): void
}

// 组件状态类型
export interface ComponentState {
  disabled?: boolean
  loading?: boolean
  active?: boolean
  selected?: boolean
  checked?: boolean
  visible?: boolean
}

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// 响应式值类型
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

// 主题变量类型
export interface ThemeVariables {
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
    info: string
    text: {
      primary: string
      secondary: string
      disabled: string
    }
    background: {
      default: string
      paper: string
      disabled: string
    }
    border: {
      default: string
      light: string
      dark: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  fontWeight: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  zIndex: {
    dropdown: number
    sticky: number
    fixed: number
    modal: number
    popover: number
    tooltip: number
  }
}

export { }