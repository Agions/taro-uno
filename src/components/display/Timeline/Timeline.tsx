import React, { createContext, useMemo, Children, cloneElement, isValidElement } from 'react'
import classNames from '../../../utils/helpers/classNames'
import { TimelineProps } from './types'
import TimelineItem from './TimelineItem'
import './style.scss'

// 创建 Timeline 上下文
export interface TimelineContextProps {
  position: 'left' | 'right' | 'alternate'
  mode: 'normal' | 'reverse'
  isLast: (item: React.ReactElement) => boolean
  isPending: (item: React.ReactElement) => boolean
  getIndex: (item: React.ReactElement) => number
}

export const TimelineContext = createContext<TimelineContextProps>({
  position: 'left',
  mode: 'normal',
  isLast: () => false,
  isPending: () => false,
  getIndex: () => 0,
})

/**
 * 时间轴组件
 */
const Timeline: React.FC<TimelineProps> & { Item: typeof TimelineItem } = props => {
  const {
    mode = 'normal',
    position = 'left',
    pending = false,
    pendingDot,
    children,
    className,
    style,
  } = props

  // 处理子元素
  const childrenArray = useMemo(() => {
    const childList = Children.toArray(children).filter(child => isValidElement(child))

    // 处理排序
    if (mode === 'reverse') {
      childList.reverse()
    }

    // 添加幽灵节点
    if (pending) {
      childList.push(
        <TimelineItem className='uno-timeline-item-pending' dot={pendingDot}>
          {typeof pending === 'boolean' ? null : pending}
        </TimelineItem>
      )
    }

    return childList
  }, [children, pending, pendingDot, mode])

  // 上下文值
  const contextValue = useMemo<TimelineContextProps>(
    () => ({
      position,
      mode,
      isLast: (item: React.ReactElement) => {
        const index = childrenArray.findIndex(child => child === item)
        return index === childrenArray.length - 1
      },
      isPending: (item: React.ReactElement) => {
        const index = childrenArray.findIndex(child => child === item)
        return Boolean(pending) && index === childrenArray.length - 1
      },
      getIndex: (item: React.ReactElement) => {
        return childrenArray.findIndex(child => child === item)
      },
    }),
    [position, mode, childrenArray, pending]
  )

  // 渲染子元素
  const itemsNode = useMemo(() => {
    return childrenArray.map((child, index) => {
      if (!isValidElement(child)) return null

      // 为每个子元素添加索引属性
      return cloneElement(child, {
        key: child.key || `timeline-item-${index}`,
      })
    })
  }, [childrenArray])

  // 类名
  const timelineCls = classNames(
    'uno-timeline',
    `uno-timeline-${mode}`,
    `uno-timeline-${position}`,
    className
  )

  return (
    <TimelineContext.Provider value={contextValue}>
      <ul className={timelineCls} style={style}>
        {itemsNode}
      </ul>
    </TimelineContext.Provider>
  )
}

// 添加 Item 子组件
Timeline.Item = TimelineItem

export default Timeline
