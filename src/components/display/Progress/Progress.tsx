import React, { useMemo, ReactNode } from 'react'
import { View, Text } from '@tarojs/components'
import { ProgressProps, ProgressFormatter } from './types'
import { CheckIcon, CloseIcon } from '@/components/basic/Icon'
import { createBem } from '@/utils/helpers'
import './style.scss'

const bem = createBem('taro-uno-progress')

/**
 * Progress 进度条组件
 *
 * 用于展示操作的当前进度。
 */
const Progress: React.FC<ProgressProps> = ({
  type = 'line',
  size = 'medium',
  percent = 0,
  successPercent,
  status = 'normal',
  showInfo = true,
  strokeColor,
  successColor = '#52c41a',
  trailColor = '#f5f5f5',
  strokeWidth = 8,
  strokeLinecap = 'round',
  width = 120,
  gapDegree = 0,
  gapPosition = 'bottom',
  format,
  steps,
  style,
  className,
  onChange,
}) => {
  // 确保百分比在0-100之间
  const normalizedPercent = useMemo(() => Math.max(0, Math.min(100, percent)), [percent])
  const normalizedSuccessPercent = useMemo(
    () => (successPercent !== undefined ? Math.max(0, Math.min(100, successPercent)) : undefined),
    [successPercent]
  )

  // 计算组件的类名
  const progressClass = [
    bem(),
    bem(`type-${type}`),
    bem(`size-${size}`),
    status && bem(`status-${status}`),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // 渲染进度文本或图标
  const renderProgressInfo = (): ReactNode => {
    if (!showInfo) return null

    // 如果提供了自定义格式化函数
    if (format) {
      return format(normalizedPercent, normalizedSuccessPercent)
    }

    // 根据状态显示不同的图标或文本
    if (status === 'success') {
      return <CheckIcon />
    }

    if (status === 'exception') {
      return <CloseIcon />
    }

    return `${normalizedPercent}%`
  }

  // 渲染线性进度条
  const renderLineProgress = (): ReactNode => {
    // 如果是步骤进度条
    if (steps && steps.count > 0) {
      const stepWidth = steps.stepWidth || 8
      const activeSteps = Math.round((normalizedPercent / 100) * steps.count)

      return (
        <View className={bem('line-steps')}>
          {Array.from({ length: steps.count }).map((_, index) => {
            const isActive = index < activeSteps
            const stepStyle = {
              width: `${stepWidth}px`,
              height: `${strokeWidth}px`,
              ...(isActive ? steps.activeStepStyle : steps.stepStyle),
            }

            return (
              <View
                key={index}
                className={`${bem('line-steps-item')} ${
                  isActive ? bem('line-steps-item-active') : ''
                }`}
                style={stepStyle}
              />
            )
          })}
        </View>
      )
    }

    // 常规线性进度条
    const backgroundStyle = {
      width: `${normalizedPercent}%`,
      height: '100%',
      backgroundColor: typeof strokeColor === 'string' ? strokeColor : undefined,
      background:
        typeof strokeColor === 'object' && 'from' in strokeColor
          ? `linear-gradient(to right, ${strokeColor.from}, ${strokeColor.to})`
          : Array.isArray(strokeColor)
          ? `linear-gradient(to right, ${strokeColor.join(', ')})`
          : undefined,
    }

    const successBackgroundStyle = normalizedSuccessPercent
      ? {
          width: `${normalizedSuccessPercent}%`,
          height: '100%',
          backgroundColor: successColor,
        }
      : null

    return (
      <View className={bem('line-outer')}>
        <View
          className={bem('line-inner')}
          style={{
            backgroundColor: trailColor,
            height: `${strokeWidth}px`,
          }}
        >
          <View className={bem('line-bg')} style={backgroundStyle} />
          {successBackgroundStyle && (
            <View className={bem('line-success-bg')} style={successBackgroundStyle} />
          )}
        </View>
      </View>
    )
  }

  // 渲染圆形或仪表盘进度条
  const renderCircleProgress = (): ReactNode => {
    const centerCoordinate = width / 2
    const radius = (width - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    // 计算圆弧路径
    const getPathStyles = (
      offset: number
    ): {
      pathString: string
      pathStyle: React.CSSProperties
    } => {
      // 根据类型和缺口计算圆弧
      const arcSweep = type === 'dashboard' ? 0.75 : 1
      const pathString = `M ${centerCoordinate},${centerCoordinate} m 0,-${radius} a ${radius},${radius} 0 1 1 0,${
        2 * radius
      } a ${radius},${radius} 0 1 1 0,-${2 * radius}`

      const pathStyle = {
        strokeDasharray: `${circumference * arcSweep}px ${circumference}px`,
        strokeDashoffset: `${((100 - offset) / 100) * circumference * arcSweep}px`,
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease',
      }

      return { pathString, pathStyle }
    }

    // 获取主进度路径样式
    const { pathString, pathStyle } = getPathStyles(normalizedPercent)

    // 获取成功进度路径样式（如果有）
    const successPathStyle = normalizedSuccessPercent
      ? getPathStyles(normalizedSuccessPercent).pathStyle
      : null

    return (
      <View className={bem(`${type}`)} style={{ width: `${width}px`, height: `${width}px` }}>
        <svg viewBox={`0 0 ${width} ${width}`} width={width} height={width}>
          {/* 背景轨道 */}
          <path
            className={bem(`${type}-trail`)}
            d={pathString}
            strokeLinecap={strokeLinecap}
            stroke={trailColor}
            strokeWidth={strokeWidth}
            fillOpacity='0'
          />

          {/* 成功进度（如果有） */}
          {successPathStyle && (
            <path
              className={bem(`${type}-success-path`)}
              d={pathString}
              strokeLinecap={strokeLinecap}
              stroke={successColor}
              strokeWidth={strokeWidth}
              fillOpacity='0'
              style={successPathStyle}
            />
          )}

          {/* 主进度 */}
          <path
            className={bem(`${type}-path`)}
            d={pathString}
            strokeLinecap={strokeLinecap}
            stroke={typeof strokeColor === 'string' ? strokeColor : undefined}
            strokeWidth={strokeWidth}
            fillOpacity='0'
            style={pathStyle}
          />
        </svg>

        {showInfo && (
          <View className={bem(`${type}-text`)}>
            <Text>{renderProgressInfo()}</Text>
          </View>
        )}
      </View>
    )
  }

  // 根据类型渲染不同的进度条
  return (
    <View className={progressClass} style={style}>
      {type === 'line' ? renderLineProgress() : renderCircleProgress()}
      {type === 'line' && showInfo && (
        <View className={bem('line-text')}>{renderProgressInfo()}</View>
      )}
    </View>
  )
}

export default Progress
