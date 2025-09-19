import { ReactNode } from 'react'
import { ViewProps } from '@tarojs/components'

export interface LayoutProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
  hasSider?: boolean
}

export interface LayoutHeaderProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
}

export interface LayoutContentProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
}

export interface LayoutFooterProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
}

export interface LayoutSiderProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
  width?: number | string
  collapsed?: boolean
  collapsedWidth?: number | string
  onCollapse?: (collapsed: boolean) => void
}

export interface LayoutRef {
  getLayout: () => HTMLDivElement | null
}

export interface LayoutHeaderRef {
  getHeader: () => HTMLDivElement | null
}

export interface LayoutContentRef {
  getContent: () => HTMLDivElement | null
}

export interface LayoutFooterRef {
  getFooter: () => HTMLDivElement | null
}

export interface LayoutSiderRef {
  getSider: () => HTMLDivElement | null
  toggleCollapse: () => void
}