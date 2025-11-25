import React, { forwardRef, useImperativeHandle } from 'react'
import { View, Text } from '@tarojs/components'
import { StepProps, StepRef } from './Steps.types'
import {
  getStepItemStyle,
  getStepIconStyle,
  getStepContentStyle,
  getStepTitleStyle,
  getStepDescriptionStyle
} from './Steps.styles'

export const Step = forwardRef<StepRef, StepProps>(({
  className,
  style,
  title,
  description,
  status = 'wait',
  icon,
  disabled: _disabled,
  stepNumber,
  ...props
}, ref) => {
  const stepRef = React.useRef<any>(null)

  useImperativeHandle(ref, () => ({
    getStep: () => stepRef.current,
  }))

  return (
    <View
      className={className}
      style={style}
      {...props}
    >
      <View style={getStepItemStyle()}>
        <View style={getStepIconStyle(status)}>
          {icon || stepNumber}
        </View>
        <View style={getStepContentStyle()}>
          <Text style={getStepTitleStyle(status)}>
            {title}
          </Text>
          {description && (
            <Text style={getStepDescriptionStyle()}>
              {description}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
})

Step.displayName = 'Step'

export default Step