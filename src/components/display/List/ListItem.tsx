import React from 'react'
import { View } from '@tarojs/components'
import { ListItemProps } from './types'
import { createBem } from '@/utils/helpers'
import { getCurrentPlatform } from '@/utils/platform'

const bem = createBem('uno-list-item')

/**
 * ListItem 列表项组件
 *
 * 用于在List组件中展示单个列表项
 */
const ListItem: React.FC<ListItemProps> = props => {
  const {
    children,
    className,
    style,
    meta,
    actions,
    extra,
    active,
    clickable,
    onClick,
    prefix,
    suffix,
    id,
    ...restProps
  } = props

  // 获取当前平台
  const platform = getCurrentPlatform()

  // 列表项类名
  const itemClass = [
    bem(),
    active && bem('active'),
    clickable && bem('clickable'),
    platform && bem(`platform-${platform}`),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // 渲染元数据
  const renderMeta = () => {
    if (!meta) return null

    const { avatar, title, description } = meta

    return (
      <View className={bem('meta')}>
        {avatar && <View className={bem('avatar')}>{avatar}</View>}
        <View className={bem('content')}>
          {title && <View className={bem('title')}>{title}</View>}
          {description && <View className={bem('description')}>{description}</View>}
        </View>
      </View>
    )
  }

  // 渲染操作区域
  const renderActions = () => {
    if (!actions || !actions.length) return null

    return (
      <View className={bem('actions')}>
        {actions.map((action, index) => (
          <View key={index} className={bem('action')}>
            {action}
          </View>
        ))}
      </View>
    )
  }

  // 处理id属性，确保它是字符串类型
  const stringId = id !== undefined ? String(id) : undefined

  return (
    <View className={itemClass} style={style} onClick={onClick} id={stringId} {...restProps}>
      {prefix && <View className={bem('prefix')}>{prefix}</View>}

      <View className={bem('main')}>
        {renderMeta()}
        {children && <View className={bem('children')}>{children}</View>}
        {renderActions()}
      </View>

      {suffix && <View className={bem('suffix')}>{suffix}</View>}

      {extra && <View className={bem('extra')}>{extra}</View>}
    </View>
  )
}

ListItem.displayName = 'ListItem'

export default ListItem
