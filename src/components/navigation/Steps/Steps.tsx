import React, { forwardRef, useImperativeHandle } from 'react'
import { View, Text } from '@tarojs/components'
import { StepsProps, StepsRef, Step } from './Steps.types'
import {
  getStepsStyle,
  getStepStyle,
  getStepItemStyle,
  getStepIconStyle,
  getStepContentStyle,
  getStepTitleStyle,
  getStepDescriptionStyle,
  getStepTailStyle
} from './Steps.styles'
// import { Step } from './Step'

export const Steps = forwardRef<StepsRef, StepsProps>(({
  className,
  style,
  current = 0,
  direction = 'horizontal',
  labelPlacement = 'horizontal',
  progressDot = false,
  initial = 0,
  status,
  size = 'default',
  items,
  children,
  onChange,
  ...props
}, ref) => {
  const stepsRef = React.useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    getSteps: () => stepsRef.current,
  }))

  const getStepStatus = (index: number): 'wait' | 'process' | 'finish' | 'error' => {
    if (status) {
      if (index === current && status !== 'finish') {
        return status
      }
    }

    if (index < current) {
      return 'finish'
    }
    if (index === current) {
      return 'process'
    }
    return 'wait'
  }

  const handleStepClick = (index: number) => {
    if (onChange) {
      onChange(index)
    }
  }

  const steps: Step[] = items || [];

  return (
    <View
      ref={stepsRef}
      className={className}
      style={getStepsStyle(direction, style) as React.CSSProperties}
      {...props}
    >
      {steps.map((step, index) => {
        const stepStatus = step.status || getStepStatus(index)
        const isLast = index === steps.length - 1

        return (
          <View
            key={index}
            style={getStepStyle(direction, isLast) as React.CSSProperties}
            onClick={() => !step.disabled && handleStepClick(index)}
          >
            <View style={getStepItemStyle() as React.CSSProperties}>
              {progressDot ? (
                typeof progressDot === 'function' ? (
                  progressDot(index, stepStatus, step.title, step.description)
                ) : (
                  <View style={getStepIconStyle(stepStatus, size) as React.CSSProperties}>•</View>
                )
              ) : (
                <View style={getStepIconStyle(stepStatus, size) as React.CSSProperties}>
                  {step.icon || index + 1}
                </View>
              )}
              <View style={getStepContentStyle() as React.CSSProperties}>
                <Text style={getStepTitleStyle(stepStatus) as React.CSSProperties}>
                  {step.title}
                </Text>
                {step.description && (
                  <Text style={getStepDescriptionStyle() as React.CSSProperties}>
                    {step.description}
                  </Text>
                )}
              </View>
            </View>
            {!isLast && (
              <View style={getStepTailStyle(direction, stepStatus === 'finish') as React.CSSProperties} />
            )}
          </View>
        )
      })}
    </View>
  )
})

Steps.displayName = 'Steps'

export default Steps