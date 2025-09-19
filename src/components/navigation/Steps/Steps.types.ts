import { ReactNode } from 'react'
import { ViewProps } from '@tarojs/components'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';
export type StepDirection = 'horizontal' | 'vertical';

export interface Step {
  title: ReactNode
  description?: ReactNode
  status?: 'wait' | 'process' | 'finish' | 'error'
  icon?: ReactNode
  disabled?: boolean
}

export interface StepsProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  current?: number
  direction?: 'horizontal' | 'vertical'
  labelPlacement?: 'horizontal' | 'vertical'
  progressDot?: boolean | ((index: number, status: string, title: ReactNode, description: ReactNode) => ReactNode)
  initial?: number
  status?: 'wait' | 'process' | 'finish' | 'error'
  size?: 'default' | 'small'
  items?: Step[]
  children?: ReactNode
  onChange?: (current: number) => void
}

export interface StepsRef {
  getSteps: () => HTMLDivElement | null
}

export interface StepProps extends ViewProps {
  className?: string
  style?: React.CSSProperties
  title: ReactNode
  description?: ReactNode
  status?: 'wait' | 'process' | 'finish' | 'error'
  icon?: ReactNode
  disabled?: boolean
  stepNumber?: number
}

export interface StepRef {
  getStep: () => HTMLDivElement | null
}