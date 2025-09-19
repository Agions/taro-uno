/**
 * Taro-Uno Radio Component
 * 单选框组件，支持单选功能
 */

import { Radio as RadioComponent } from './Radio';
export type {
  RadioProps,
  RadioRef,
  RadioSize,
  RadioStatus,
  RadioGroupProps,
  RadioGroupRef,
  RadioStyleConfig,
} from './Radio.types';
export { radioStyles } from './Radio.styles';

export const Radio = RadioComponent;

// 默认导出
export default Radio;
