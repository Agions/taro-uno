import React, { useContext, ReactElement } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from '../../../utils/helpers/classNames'
import { TimelineItemProps } from './types'
import { TimelineContext, TimelineContextProps } from './Timeline'

/**
 * 时间轴条目组件
 */
const TimelineItem: React.FC<TimelineItemProps> = props => {
  const {
    color = 'primary',
    dot,
    label,
    position: itemPosition,
    children,
    className,
    style,
  } = props

  // 从上下文中获取信息
  const context = useContext<TimelineContextProps>(TimelineContext)
  const contextPosition = context.position

  // 创建用于上下文传递的元素
  const currentElement = React.useMemo<ReactElement>(() => {
    return React.createElement(TimelineItem, props)
  }, [props])

  const isLast = context.isLast(currentElement)
  const isPending = context.isPending(currentElement)

  // 计算实际位置
  let finalPosition = itemPosition
  if (!finalPosition) {
    if (contextPosition === 'alternate') {
      finalPosition = context.getIndex(currentElement) % 2 === 0 ? 'left' : 'right'
    } else {
      finalPosition = contextPosition
    }
  }

  // 获取颜色值
  const getColorValue = (): string | undefined => {
    if (!color) return undefined

    switch (color) {
      case 'primary':
        return 'var(--uno-color-primary)'
      case 'success':
        return 'var(--uno-color-success)'
      case 'warning':
        return 'var(--uno-color-warning)'
      case 'danger':
        return 'var(--uno-color-danger)'
      case 'info':
        return 'var(--uno-color-info)'
      default:
        return color
    }
  }

  const colorValue = getColorValue()

  // 生成节点样式
  const dotStyle = {
    backgroundColor: colorValue,
    borderColor: colorValue,
    ...style,
  }

  // 生成类名
  const itemCls = classNames(
    'uno-timeline-item',
    `uno-timeline-item-${finalPosition}`,
    isLast ? 'uno-timeline-item-last' : '',
    isPending ? 'uno-timeline-item-pending' : '',
    className
  )

  // 自定义节点或默认节点
  const dotNode = dot || <View className='uno-timeline-item-dot' style={dotStyle} />

  return (
    <View className={itemCls}>
      {/* 节点标签 */}
      {label && <View className='uno-timeline-item-label'>{label}</View>}

      {/* 节点 */}
      <View className='uno-timeline-item-dot-container'>{dotNode}</View>

      {/* 连接线 */}
      {!isLast && <View className='uno-timeline-item-line' style={{ borderColor: colorValue }} />}

      {/* 内容 */}
      <View className='uno-timeline-item-content'>{children}</View>
    </View>
  )
}

export default TimelineItem
