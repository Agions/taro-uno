import React, { forwardRef, useImperativeHandle, useState, useEffect, useCallback } from 'react'
import { View } from '@tarojs/components'
import { AffixProps, AffixRef } from './Affix.types'
import { getAffixStyle, getRelativeStyle } from './Affix.styles'

export const Affix = forwardRef<AffixRef, AffixProps>(({
  className,
  style,
  children,
  offset,
  offsetTop,
  offsetBottom,
  target,
  onChange,
  ...props
}, ref) => {
  const [affixed, setAffixed] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const affixRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const updatePosition = useCallback(() => {
    if (!affixRef.current || !containerRef.current) return

    const targetElement = target?.() || window
    const containerRect = containerRef.current.getBoundingClientRect()
    const scrollTop = targetElement instanceof Window ? targetElement.scrollY : targetElement.scrollTop
    const targetHeight = targetElement instanceof Window ? targetElement.innerHeight : targetElement.clientHeight

    const top = offset?.top ?? offsetTop ?? 0
    const bottom = offset?.bottom ?? offsetBottom ?? 0

    const shouldBeAffixedTop = scrollTop >= containerRect.top - top
    const shouldBeAffixedBottom = scrollTop + targetHeight <= containerRect.bottom + bottom

    if (shouldBeAffixedTop) {
      setAffixed(true)
      setPosition('top')
    } else if (shouldBeAffixedBottom) {
      setAffixed(true)
      setPosition('bottom')
    } else {
      setAffixed(false)
    }
  }, [offset, offsetTop, offsetBottom, target])

  useImperativeHandle(ref, () => ({
    getAffix: () => affixRef.current,
    updatePosition,
  }))

  useEffect(() => {
    updatePosition()

    const targetElement = target?.() || window
    targetElement.addEventListener('scroll', updatePosition)
    targetElement.addEventListener('resize', updatePosition)

    return () => {
      targetElement.removeEventListener('scroll', updatePosition)
      targetElement.removeEventListener('resize', updatePosition)
    }
  }, [updatePosition, target])

  useEffect(() => {
    onChange?.(affixed)
  }, [affixed, onChange])

  const affixStyle = getAffixStyle(affixed, position, offset?.top ?? offsetTop ?? offset?.bottom ?? offsetBottom, style)
  const finalStyle = {
    ...affixStyle,
    ...style,
  }

  return (
    <View ref={containerRef} style={getRelativeStyle()}>
      <View
        ref={affixRef}
        className={className}
        style={finalStyle}
        {...props}
      >
        {children}
      </View>
    </View>
  )
})

Affix.displayName = 'Affix'

export default Affix