import React, { forwardRef } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { bem } from '@/utils/helpers'
import type { CardProps, CardMetaProps, CardShadow, CardSize, CardSchemaProps } from './types'
import './Card.scss'
import { Component } from '@/components/registry'
import { SchemaDefinition } from '@/core/schema'
import { getCurrentPlatform } from '@/utils/platform'

/**
 * Card 卡片组件
 *
 * 企业级卡片组件，支持多种布局和功能
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      titleIcon,
      children,
      size = 'md',
      shadow = 'md',
      bordered = true,
      hoverable = false,
      clickable = false,
      loading = false,
      header,
      footer,
      actions,
      cover,
      extra,
      className,
      style,
      headerStyle,
      bodyStyle,
      footerStyle,
      onClick,
      ...rest
    },
    ref
  ) => {
    // 获取当前平台
    const platform = getCurrentPlatform()

    const cardClass = bem('taro-uno-card', {
      [`size-${size}`]: size,
      [`shadow-${shadow}`]: shadow,
      bordered,
      hoverable,
      clickable,
      loading,
      [`platform-${platform}`]: !!platform,
    })

    const handleClick = (e: any) => {
      if (clickable && !loading) {
        onClick?.(e)
      }
    }

    const renderHeader = () => {
      if (!header && !title && !extra) return null

      return (
        <View className='taro-uno-card__header' style={headerStyle}>
          {header || (
            <View className='taro-uno-card__head'>
              <View className='taro-uno-card__title-wrapper'>
                {titleIcon && <View className='taro-uno-card__title-icon'>{titleIcon}</View>}
                <View className='taro-uno-card__title-content'>
                  {title && <View className='taro-uno-card__title'>{title}</View>}
                  {subtitle && <View className='taro-uno-card__subtitle'>{subtitle}</View>}
                </View>
              </View>
              {extra && <View className='taro-uno-card__extra'>{extra}</View>}
            </View>
          )}
        </View>
      )
    }

    const renderCover = () => {
      if (!cover) return null

      return <View className='taro-uno-card__cover'>{cover}</View>
    }

    const renderBody = () => {
      if (!children) return null

      return (
        <View className='taro-uno-card__body' style={bodyStyle}>
          {loading ? (
            <View className='taro-uno-card__loading'>
              <View className='taro-uno-card__loading-content'>
                <View className='taro-uno-card__skeleton taro-uno-card__skeleton--title' />
                <View className='taro-uno-card__skeleton taro-uno-card__skeleton--text' />
                <View className='taro-uno-card__skeleton taro-uno-card__skeleton--text' />
              </View>
            </View>
          ) : (
            children
          )}
        </View>
      )
    }

    const renderActions = () => {
      if (!actions || actions.length === 0) return null

      return (
        <View className='taro-uno-card__actions'>
          {actions.map((action: React.ReactNode, index: number) => (
            <View key={index} className='taro-uno-card__action'>
              {action}
            </View>
          ))}
        </View>
      )
    }

    const renderFooter = () => {
      if (!footer) return null

      return (
        <View className='taro-uno-card__footer' style={footerStyle}>
          {footer}
        </View>
      )
    }

    return (
      <View
        ref={ref}
        className={`${cardClass} ${className || ''}`}
        style={style}
        onClick={handleClick}
        {...rest}
      >
        {renderHeader()}
        {renderCover()}
        {renderBody()}
        {renderActions()}
        {renderFooter()}
      </View>
    )
  }
)

/**
 * CardMeta 卡片元信息组件
 */
const CardMeta: React.FC<CardMetaProps> = ({ avatar, title, description, className, style }) => {
  const metaClass = bem('taro-uno-card-meta', {})

  return (
    <View className={`${metaClass} ${className || ''}`} style={style}>
      {avatar && <View className='taro-uno-card-meta__avatar'>{avatar}</View>}
      <View className='taro-uno-card-meta__detail'>
        {title && <View className='taro-uno-card-meta__title'>{title}</View>}
        {description && <View className='taro-uno-card-meta__description'>{description}</View>}
      </View>
    </View>
  )
}

// 生成Schema
const generateSchema = (props: CardSchemaProps): SchemaDefinition => {
  const {
    title,
    subtitle,
    size,
    shadow,
    bordered,
    hoverable,
    clickable,
    loading,
    extra,
    className,
    style,
    headerStyle,
    bodyStyle,
    footerStyle,
    children,
    ...otherProps
  } = props

  // 基础Schema
  const schema: SchemaDefinition = {
    component: 'Card',
    props: {
      title,
      subtitle,
      size,
      shadow,
      bordered,
      hoverable,
      clickable,
      loading,
      extra,
      className,
      style,
      headerStyle,
      bodyStyle,
      footerStyle,
      ...otherProps,
    },
    children: children,
  }

  return schema
}

// 解析Schema
const parseSchema = (schema: SchemaDefinition): CardProps => {
  const { props = {}, children } = schema

  const cardProps = {
    ...props,
    children,
  } as CardProps

  return cardProps
}

Card.displayName = 'Card'
CardMeta.displayName = 'CardMeta'

// 将 CardMeta 作为 Card 的子组件
const CardWithMeta = Card as typeof Card & {
  Meta: typeof CardMeta
}

CardWithMeta.Meta = CardMeta

// 注册组件
if (typeof Component === 'function') {
  Component({
    name: 'Card',
    category: 'display',
    description: '卡片组件，可容纳文字、列表、图片、段落等内容',
    supportsSchema: true,
    schemaGenerator: generateSchema as any,
    schemaParser: parseSchema,
    version: '2.0.0',
    platformSupport: {
      weapp: true,
      alipay: true,
      h5: true,
      rn: true,
      harmony: true,
    },
  })(Card)
}

export default CardWithMeta
export { CardMeta }
export type { CardProps, CardMetaProps, CardShadow, CardSize }
