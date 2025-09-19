import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react'
import { View } from '@tarojs/components'
import { LayoutSiderProps, LayoutSiderRef } from './Layout.types'
import { getSiderStyle } from './Layout.styles'

export const LayoutSider = forwardRef<LayoutSiderRef, LayoutSiderProps>(({
  className,
  style,
  children,
  width = 200,
  collapsed = false,
  collapsedWidth = 80,
  onCollapse,
  ...props
}, ref) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const siderRef = React.useRef<any>(null)

  const toggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    onCollapse?.(newCollapsed)
  }, [isCollapsed, onCollapse])

  useImperativeHandle(ref, () => ({
    getSider: () => siderRef.current,
    toggleCollapse,
  }))

  React.useEffect(() => {
    setIsCollapsed(collapsed)
  }, [collapsed])

  const currentWidth = isCollapsed ? collapsedWidth : width

  const siderStyle = getSiderStyle(isCollapsed, currentWidth, style)
  const finalStyle = {
    ...siderStyle,
    ...style,
  }

  return (
    <View
      ref={siderRef}
      className={className}
      style={finalStyle}
      {...props}
    >
      {children}
    </View>
  )
})

LayoutSider.displayName = 'LayoutSider'

export default LayoutSider