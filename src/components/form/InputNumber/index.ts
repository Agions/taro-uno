export { InputNumber } from './InputNumber';
export type {
  InputNumberProps,
  InputNumberRef,
  InputNumberSize,
  InputNumberVariant,
  InputNumberStatus,
  InputNumberControlsPosition,
  InputNumberFormatter,
  InputNumberStepMode,
  InputNumberClearTrigger,
  InputNumberRule,
  InputNumberFormatConfig,
  InputNumberValidationResult,
  InputNumberContext,
  InputNumberStyleConfig,
  InputNumberUtils,
  InputNumberEvents,
  InputNumberNativeProps,
} from './InputNumber.types';
export { inputNumberStyles } from './InputNumber.styles';

// 重新导出默认导出
import { InputNumber as InputNumberComponent } from './InputNumber';
export default InputNumberComponent;
