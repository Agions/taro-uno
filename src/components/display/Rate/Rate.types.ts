import { ReactNode } from 'react';
import { BaseComponentProps, Size } from '../../../types';

/** 评分尺寸 */
export type RateSize = Size | 'small' | 'medium' | 'large';

/** 评分字符 */
export type RateCharacter = ReactNode | string;

/** 评分引用 */
export interface RateRef {
  /** 获取元素引用 */
  element: any | null;
  /** 获取当前评分值 */
  getValue: () => number;
  /** 设置评分值 */
  setValue: (value: number) => void;
  /** 重置评分 */
  reset: () => void;
  /** 聚焦到组件 */
  focus: () => void;
  /** 失焦 */
  blur: () => void;
}

/** 评分组件属性 */
export interface RateProps extends BaseComponentProps {
  /** 当前评分值 */
  value?: number;
  /** 默认评分值 */
  defaultValue?: number;
  /** 星星总数 */
  count?: number;
  /** 是否允许半星 */
  allowHalf?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 评分尺寸 */
  size?: RateSize;
  /** 自定义字符 */
  character?: RateCharacter | ((index: number) => RateCharacter);
  /** 提示文案数组 */
  tooltips?: string[];
  /** 是否显示提示文案 */
  showTooltips?: boolean;
  /** 自定义颜色 */
  color?: string;
  /** 自定义未选中颜色 */
  unselectedColor?: string;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 键盘导航 */
  keyboard?: boolean;
  /** 评分改变时的回调 */
  onChange?: (value: number) => void;
  /** hover时的回调 */
  onHoverChange?: (value: number) => void;
  /** 聚焦时的回调 */
  onFocus?: () => void;
  /** 失焦时的回调 */
  onBlur?: () => void;
  /** 键盘事件回调 */
  onKeyDown?: (event: any) => void;
}

/** 评分工具函数接口 */
export interface RateUtils {
  /** 计算评分值 */
  calculateValue: (index: number, position: number, allowHalf: boolean) => number;
  /** 获取星星状态 */
  getStarState: (index: number, value: number, hoverValue: number, allowHalf: boolean) => 'full' | 'half' | 'empty';
  /** 格式化评分显示 */
  formatValue: (value: number, precision?: number) => string;
  /** 验证评分值 */
  validateValue: (value: number, count: number) => boolean;
  /** 获取可访问性属性 */
  getAccessibilityProps: (value: number, count: number, disabled: boolean) => Record<string, any>;
}

/** 星星状态 */
export type StarState = 'full' | 'half' | 'empty';

/** 星星属性 */
export interface StarProps {
  /** 星星索引 */
  index: number;
  /** 星星状态 */
  state: StarState;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 尺寸 */
  size: RateSize;
  /** 自定义字符 */
  character?: RateCharacter;
  /** 颜色 */
  color?: string;
  /** 未选中颜色 */
  unselectedColor?: string;
  /** 点击回调 */
  onClick?: (index: number, position: number) => void;
  /** hover回调 - not supported in Taro.js */
  onHover?: (index: number, position: number) => void;
  /** 离开回调 - not supported in Taro.js */
  onLeave?: () => void;
}