/**
 * Taro-Uno Popconfirm Component
 * 确认弹窗组件统一导出文件
 */

// 组件命名导出
export { Popconfirm } from './Popconfirm';

export type {
  PopconfirmProps,
  PopconfirmRef,
  PopconfirmDirection,
  PopconfirmTheme,
  PopconfirmButtonType,
  PopconfirmButton,
  PopconfirmConfig,
  PopconfirmContext,
} from './Popconfirm.types';
export {
  BaseStyles,
  getThemeStyle,
  getDirectionStyle,
  getButtonStyle,
  mergeStyles,
  Keyframes,
} from './Popconfirm.styles';

// 默认导出
import { Popconfirm } from './Popconfirm';
export default Popconfirm;
