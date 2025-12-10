import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import type { InputNumberSize, InputNumberControlsPosition } from '../InputNumber.types';
import { inputNumberStyles } from '../InputNumber.styles';

interface InputNumberControlsProps {
  size: InputNumberSize;
  controlsPosition: InputNumberControlsPosition;
  disabled: boolean;
  readonly: boolean;
  onStep: (direction: 'up' | 'down', event: ITouchEvent) => void;
}

export function InputNumberControls({ size, controlsPosition, disabled, readonly, onStep }: InputNumberControlsProps) {
  const handleStep = (direction: 'up' | 'down') => (event: ITouchEvent) => {
    if (disabled || readonly) return;
    onStep(direction, event);
  };

  return (
    <View style={inputNumberStyles['getControlsStyle']({ size, controlsPosition })}>
      <View style={inputNumberStyles['getControlButtonStyle']({ size, direction: 'up' })} onClick={handleStep('up')}>
        <Text>+</Text>
      </View>
      <View
        style={inputNumberStyles['getControlButtonStyle']({ size, direction: 'down' })}
        onClick={handleStep('down')}
      >
        <Text>-</Text>
      </View>
    </View>
  );
}
