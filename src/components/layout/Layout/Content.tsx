import React, { forwardRef, useImperativeHandle } from 'react'
import { View } from '@tarojs/components'
import { LayoutContentProps, LayoutContentRef } from './Layout.types'
import { getContentStyle } from './Layout.styles'

export const LayoutContent = forwardRef<LayoutContentRef, LayoutContentProps>(({
  className,
  style,
  children,
  ...props
}, ref) => {
  const contentRef = React.useRef<any>(null)

  useImperativeHandle(ref, () => ({
    getContent: () => contentRef.current,
  }))

  const contentStyle = getContentStyle(style)
  const finalStyle = {
    ...contentStyle,
    ...style,
  }

  return (
    <View
      ref={contentRef}
      className={className}
      style={finalStyle}
      {...props}
    >
      {children}
    </View>
  )
})

LayoutContent.displayName = 'LayoutContent'

export default LayoutContent