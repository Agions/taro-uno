import { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import { BaseComponentProps, Size, CSSUnit } from '../../../types';

/** Space组件方向 */
export type SpaceDirection = 'horizontal' | 'vertical';

/** Space组件对齐方式 */
export type SpaceAlign = 'start' | 'center' | 'end' | 'stretch';

/** Space组件换行方式 */
export type SpaceWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/** Space组件尺寸 */
export type SpaceSize = Size | number | `${number}${CSSUnit}`;

/** Space组件间距 */
export type SpaceGap = SpaceSize | [SpaceSize, SpaceSize];

/** Space组件分隔符 */
export type SpaceSeparator = ReactNode | boolean;

/** Space组件引用 */
export interface SpaceRef {
  /** 获取元素引用 */
  element: any | null;
  /** 获取当前方向 */
  getDirection: () => SpaceDirection;
  /** 获取当前对齐方式 */
  getAlign: () => SpaceAlign;
  /** 获取当前换行方式 */
  getWrap: () => SpaceWrap;
  /** 获取当前间距 */
  getGap: () => SpaceGap;
  /** 获取当前尺寸 */
  getSize: () => SpaceSize;
  /** 设置方向 */
  setDirection: (_direction: SpaceDirection) => void;
  /** 设置对齐方式 */
  setAlign: (_align: SpaceAlign) => void;
  /** 设置换行方式 */
  setWrap: (_wrap: SpaceWrap) => void;
  /** 设置间距 */
  setGap: (_gap: SpaceGap) => void;
  /** 设置尺寸 */
  setSize: (_size: SpaceSize) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/** Space组件属性 */
export interface SpaceProps extends BaseComponentProps {
  /** 子元素 */
  children?: ReactNode;
  /** 间距方向 */
  direction?: SpaceDirection;
  /** 对齐方式 */
  align?: SpaceAlign;
  /** 换行方式 */
  wrap?: SpaceWrap;
  /** 间距大小 */
  size?: SpaceSize;
  /** 间距 */
  gap?: SpaceGap;
  /** 是否自动换行 */
  block?: boolean;
  /** 分隔符 */
  separator?: SpaceSeparator;
  /** 是否紧凑 */
  compact?: boolean;
  /** 是否等分 */
  split?: boolean;
  /** 最大行数（垂直方向）或列数（水平方向） */
  maxCount?: number;
  /** 超出最大行数/列数时显示的省略内容 */
  ellipsis?: ReactNode;
  /** 点击事件 */
  onClick?: (_event: React.MouseEvent) => void;
  /** 子元素点击事件 */
  _onItemHover?: (_index: number, event: React.MouseEvent) => void;
  /** 子元素点击事件 */
  onItemClick?: (_index: number, event: ITouchEvent) => void;
  /** 响应式断点 */
  responsive?: {
    xs?: Partial<SpaceProps>;
    sm?: Partial<SpaceProps>;
    md?: Partial<SpaceProps>;
    lg?: Partial<SpaceProps>;
    xl?: Partial<SpaceProps>;
    xxl?: Partial<SpaceProps>;
  };
}
