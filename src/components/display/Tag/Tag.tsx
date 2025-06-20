import React, { useState, useEffect, forwardRef } from 'react'
import { View, Text } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import { bem } from '@/utils/helpers'
import { TagProps } from './types'
import { Component } from '@/components/registry'
import { CloseIcon } from '@/components/basic/Icon'
import './style.scss'

/**
 * Tag 标签组件
 *
 * 用于标记、分类和选择的标签组件
 */
const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    size = 'medium',
    type = 'default',
    shape = 'default',
    color,
    closable = false,
    onClose,
    closeConfirm = false,
    checkable = false,
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    icon,
    closeIcon,
    disabled = false,
    className,
    style,
    onClick,
    children,
    bordered = true,
    ...rest
  } = props

  const [isChecked, setIsChecked] = useState(
    controlledChecked !== undefined ? controlledChecked : defaultChecked
  )

  // 受控模式下，同步外部checked状态
  useEffect(() => {
    if (controlledChecked !== undefined) {
      setIsChecked(controlledChecked)
    }
  }, [controlledChecked])

  // 构建样式名
  const tagClass = bem('taro-uno-tag', {
    [`size-${size}`]: size,
    [`type-${type}`]: type,
    [`shape-${shape}`]: shape,
    checked: isChecked && checkable,
    checkable,
    closable,
    disabled,
    bordered,
    custom: !!color,
  })

  // 自定义颜色样式
  const colorStyle = color
    ? {
        backgroundColor: checkable && !isChecked ? 'transparent' : color,
        borderColor: color,
        color: checkable && !isChecked ? color : '#fff',
        ...style,
      }
    : style

  // 点击处理
  const handleClick = (e: ITouchEvent) => {
    if (disabled) return

    if (checkable) {
      const nextCheckedState = !isChecked

      // 非受控模式下更新内部状态
      if (controlledChecked === undefined) {
        setIsChecked(nextCheckedState)
      }

      onChange?.(nextCheckedState)
    }

    onClick?.(e)
  }

  // 关闭处理
  const handleClose = async (e: ITouchEvent) => {
    e.stopPropagation()
    if (disabled) return

    // 确认关闭逻辑
    if (closeConfirm) {
      let confirmed = false

      if (typeof closeConfirm === 'function') {
        confirmed = await closeConfirm(e)
      } else if (typeof closeConfirm === 'string') {
        confirmed = window.confirm(closeConfirm)
      } else {
        confirmed = window.confirm('是否确认移除该标签？')
      }

      if (!confirmed) return
    }

    onClose?.(e)
  }

  return (
    <View
      className={`${tagClass} ${className || ''}`}
      style={colorStyle}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {icon && <View className='taro-uno-tag__icon'>{icon}</View>}
      <Text className='taro-uno-tag__content'>{children}</Text>
      {closable && !disabled && (
        <View className='taro-uno-tag__close' onClick={handleClose}>
          {closeIcon || <CloseIcon size='sm' />}
        </View>
      )}
    </View>
  )
})

// 组件注册
if (typeof Component === 'function') {
  Component({
    name: 'Tag',
    category: 'display',
    description: '用于标记、分类和选择的标签组件',
    version: '1.0.0',
    platformSupport: {
      h5: true,
      weapp: true,
      alipay: true,
      rn: true,
      harmony: true,
    },
  })
}

Tag.displayName = 'Tag'
export default Tag
