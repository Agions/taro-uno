import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import type { InputNumberSize } from '../InputNumber.types';
import { inputNumberStyles } from '../InputNumber.styles';

interface InputNumberClearButtonProps {
  size: InputNumberSize;
  disabled: boolean;
  readonly: boolean;
  onClear: (event: ITouchEvent) => void;
}

export function InputNumberClearButton({
  size,
  disabled,
  readonly,
  onClear,
}: InputNumberClearButtonProps) {
  const handleClear = (event: ITouchEvent) => {
    if (disabled || readonly) return;
    onClear(event);
  };

  return (
    <View 
      style={inputNumberStyles['getClearButtonStyle']({ size })} 
      onClick={handleClear}
    >
      <Text>×</Text>
    </View>
  );
}