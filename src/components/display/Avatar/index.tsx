import React, { forwardRef, useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { bem } from '@/utils/helpers'
import type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarShape } from './types'
import './Avatar.scss'

/**
 * Avatar 头像组件
 *
 * 企业级头像组件，支持图片、图标、文字等多种展示方式
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'md',
      shape = 'circle',
      src,
      alt,
      children,
      icon,
      className,
      style,
      onClick,
      onError,
      ...rest
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false)
    const [scale, setScale] = useState(1)

    const isCustomSize = typeof size === 'number'
    const avatarSize = isCustomSize ? `${size}px` : undefined

    const avatarClass = bem('taro-uno-avatar', {
      [`size-${size}`]: !isCustomSize,
      [`shape-${shape}`]: shape,
      'has-image': src && !imgError,
      'has-icon': !!icon,
      'has-text': !!children && !src && !icon,
      clickable: !!onClick,
    })

    const avatarStyle = {
      ...(avatarSize
        ? {
            width: avatarSize,
            height: avatarSize,
            fontSize: isCustomSize ? `${size * 0.45}px` : undefined,
          }
        : {}),
      ...style,
    }

    const handleImageError = () => {
      setImgError(true)
      const shouldUseText = onError?.() !== false
      if (!shouldUseText) {
        setImgError(false)
      }
    }

    const handleClick = (e: any) => {
      onClick?.(e)
    }

    // 文字自适应缩放
    useEffect(() => {
      if (children && typeof children === 'string' && !src && !icon) {
        const textLength = children.length
        if (textLength > 1) {
          setScale(Math.min(1, 1 / (textLength * 0.5)))
        }
      }
    }, [children, src, icon])

    const renderContent = () => {
      // 优先级：图片 > 图标 > 文字
      if (src && !imgError) {
        return (
          <Image
            src={src}
            mode='aspectFill'
            onError={handleImageError}
            className='taro-uno-avatar__image'
          />
        )
      }

      if (icon) {
        return <View className='taro-uno-avatar__icon'>{icon}</View>
      }

      if (children) {
        return (
          <View className='taro-uno-avatar__text' style={{ transform: `scale(${scale})` }}>
            {children}
          </View>
        )
      }

      // 默认用户图标
      return <View className='taro-uno-avatar__icon taro-uno-avatar__default-icon'>👤</View>
    }

    return (
      <View
        ref={ref}
        className={`${avatarClass} ${className || ''}`}
        style={avatarStyle}
        onClick={handleClick}
        {...rest}
      >
        {renderContent()}
      </View>
    )
  }
)

/**
 * AvatarGroup 头像组组件
 */
const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  maxCount,
  size,
  shape,
  maxPopoverTrigger = 'hover',
  maxStyle,
  className,
  style,
}) => {
  const groupClass = bem('taro-uno-avatar-group', {})

  const childrenArray = React.Children.toArray(children)
  const numOfChildren = childrenArray.length
  const numToShow = maxCount || numOfChildren
  const childrenWithProps = childrenArray.slice(0, numToShow).map((child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        key: index,
        size: child.props.size || size,
        shape: child.props.shape || shape,
      } as any)
    }
    return child
  })

  const renderExtraAvatar = () => {
    if (!maxCount || numOfChildren <= maxCount) return null

    const extraCount = numOfChildren - maxCount
    return (
      <Avatar size={size} shape={shape} style={maxStyle} className='taro-uno-avatar-group__extra'>
        +{extraCount}
      </Avatar>
    )
  }

  return (
    <View className={`${groupClass} ${className || ''}`} style={style}>
      {childrenWithProps}
      {renderExtraAvatar()}
    </View>
  )
}

Avatar.displayName = 'Avatar'
AvatarGroup.displayName = 'AvatarGroup'

// 将 AvatarGroup 作为 Avatar 的子组件
const AvatarWithGroup = Avatar as typeof Avatar & {
  Group: typeof AvatarGroup
}

AvatarWithGroup.Group = AvatarGroup

export default AvatarWithGroup
export { AvatarGroup }
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarShape }
