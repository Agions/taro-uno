import { ReactNode } from 'react'
import { ViewProps } from '@tarojs/components'

export interface AffixOffset {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface AffixTarget {
  (): HTMLElement | Window | null
}

export interface AffixProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
  offset?: AffixOffset
  offsetTop?: number
  offsetBottom?: number
  target?: AffixTarget
  onChange?: (_affixed: boolean) => void
}

export interface AffixRef {
  getAffix: () => HTMLDivElement | null
  updatePosition: () => void
}