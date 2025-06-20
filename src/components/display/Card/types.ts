import React from 'react'
import { ITouchEvent } from '@tarojs/components'
import { SchemaDefinition } from '@/core/schema'

/**
 * Card 组件支持的阴影类型
 */
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Card 组件支持的尺寸类型
 */
export type CardSize = 'sm' | 'md' | 'lg'

/**
 * Card 组件属性接口
 */
export interface CardProps {
  /** 卡片标题 */
  title?: React.ReactNode

  /** 卡片副标题 */
  subtitle?: React.ReactNode

  /** 标题前置图标 */
  titleIcon?: React.ReactNode

  /** 卡片内容 */
  children?: React.ReactNode

  /** 卡片尺寸 */
  size?: CardSize

  /** 阴影级别 */
  shadow?: CardShadow

  /** 是否显示边框 */
  bordered?: boolean

  /** 是否可悬停 */
  hoverable?: boolean

  /** 是否可点击 */
  clickable?: boolean

  /** 是否加载中 */
  loading?: boolean

  /** 头部区域内容 */
  header?: React.ReactNode

  /** 底部区域内容 */
  footer?: React.ReactNode

  /** 操作区域内容 */
  actions?: React.ReactNode[]

  /** 封面图片 */
  cover?: React.ReactNode

  /** 额外内容区域 */
  extra?: React.ReactNode

  /** 自定义类名 */
  className?: string

  /** 自定义样式 */
  style?: React.CSSProperties

  /** 自定义头部样式 */
  headerStyle?: React.CSSProperties

  /** 自定义内容样式 */
  bodyStyle?: React.CSSProperties

  /** 自定义底部样式 */
  footerStyle?: React.CSSProperties

  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void

  /** 其他属性 */
  [key: string]: any
}

/**
 * CardMeta 组件属性接口
 */
export interface CardMetaProps {
  /** 头像 */
  avatar?: React.ReactNode

  /** 标题 */
  title?: React.ReactNode

  /** 描述 */
  description?: React.ReactNode

  /** 自定义类名 */
  className?: string

  /** 自定义样式 */
  style?: React.CSSProperties
}

/**
 * Card组件JSON Schema属性接口
 */
export interface CardSchemaProps {
  /** 卡片标题 */
  title?: string

  /** 卡片副标题 */
  subtitle?: string

  /** 卡片尺寸 */
  size?: CardSize

  /** 阴影级别 */
  shadow?: CardShadow

  /** 是否显示边框 */
  bordered?: boolean

  /** 是否可悬停 */
  hoverable?: boolean

  /** 是否可点击 */
  clickable?: boolean

  /** 是否加载中 */
  loading?: boolean

  /** 额外内容区域 */
  extra?: string

  /** 自定义类名 */
  className?: string

  /** 自定义样式 */
  style?: React.CSSProperties

  /** 自定义头部样式 */
  headerStyle?: React.CSSProperties

  /** 自定义内容样式 */
  bodyStyle?: React.CSSProperties

  /** 自定义底部样式 */
  footerStyle?: React.CSSProperties

  /** 子元素 */
  children?: SchemaDefinition[] | string

  /** 其他属性 */
  [key: string]: any
}
