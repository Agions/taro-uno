/**
 * Taro-Uno AutoComplete Component
 * 自动完成组件统一导出文件
 */

export { AutoComplete } from './AutoComplete';
export type {
  AutoCompleteProps,
  AutoCompleteRef,
  AutoCompleteOption,
  AutoCompleteDirection,
  AutoCompleteTheme,
  AutoCompleteStatus,
  AutoCompleteSize,
  AutoCompleteConfig,
} from './AutoComplete.types';
export {
  BaseStyles,
  getThemeStyle,
  getStatusStyle,
  getSizeStyle,
  getDirectionStyle,
  mergeStyles,
} from './AutoComplete.styles';

import { AutoComplete } from './AutoComplete';
export default AutoComplete;
