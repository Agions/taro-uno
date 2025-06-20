import React, { FC, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import { BadgeProps } from './types'
import { useHarmony } from '@/hooks'
import './style.scss'

/**
 * Badge徽标组件
 * @param props 组件属性
 * @returns React组件
 */
const Badge: FC<BadgeProps> = ({
  count,
  children,
  dot = false,
  max = 99,
  showZero = false,
  color,
  placement = 'right-top',
  size = 'medium',
  type = 'error',
  status,
  text,
  offset,
  className,
  style,
  badgeClassName,
  badgeStyle,
  onClick,
  standalone = false,
}) => {
  const { isHarmony } = useHarmony()

  // 计算徽标内容
  const badgeCount = useMemo(() => {
    if (dot) return null

    if (typeof count === 'number' && count > max) {
      return `${max}+`
    }

    if (count === 0 && !showZero) {
      return null
    }

    return count
  }, [count, max, dot, showZero])

  // 计算是否需要显示徽标
  const showBadge = useMemo(() => {
    if (dot) return true
    if (badgeCount !== null) return true
    if (status) return true
    return false
  }, [dot, badgeCount, status])

  // 计算徽标样式
  const badgeWrapperClasses = useMemo(
    () => classNames('taro-uno-badge', { 'taro-uno-badge--standalone': standalone }, className),
    [className, standalone]
  )

  // 计算徽标点样式
  const badgeDotClasses = useMemo(
    () =>
      classNames(
        'taro-uno-badge__dot',
        `taro-uno-badge__dot--${size}`,
        {
          'taro-uno-badge__dot--dot': dot,
          [`taro-uno-badge__dot--${type}`]: type && !status && !color,
          [`taro-uno-badge__dot--${status}`]: status && !color,
          [`taro-uno-badge__dot--${placement}`]: placement,
          'taro-uno-badge__dot--harmony': isHarmony,
        },
        badgeClassName
      ),
    [dot, type, status, placement, size, isHarmony, badgeClassName]
  )

  // 计算自定义样式
  const customBadgeStyle = useMemo(() => {
    const styles: React.CSSProperties = { ...badgeStyle }

    if (color) {
      styles.backgroundColor = color
      styles.color = '#fff'
    }

    if (offset && offset.length === 2) {
      const [offsetX, offsetY] = offset
      styles.transform = `translate(${offsetX}px, ${offsetY}px)`
    }

    return styles
  }, [color, offset, badgeStyle])

  // 状态点渲染
  if (status && !children && !standalone) {
    return (
      <View className={badgeWrapperClasses} style={style} onClick={onClick}>
        <View
          className={classNames('taro-uno-badge__status', `taro-uno-badge__status--${status}`)}
          style={color ? { backgroundColor: color } : undefined}
        />
        {text && <Text className='taro-uno-badge__status-text'>{text}</Text>}
      </View>
    )
  }

  // 独立使用
  if (standalone) {
    return (
      <View className={badgeWrapperClasses} style={style} onClick={onClick}>
        {showBadge && (
          <View className={badgeDotClasses} style={customBadgeStyle}>
            {!dot && badgeCount}
          </View>
        )}
      </View>
    )
  }

  // 常规渲染
  return (
    <View className={badgeWrapperClasses} style={style}>
      {children}
      {showBadge && (
        <View className={badgeDotClasses} style={customBadgeStyle} onClick={onClick}>
          {!dot && badgeCount}
        </View>
      )}
    </View>
  )
}

export default Badge
