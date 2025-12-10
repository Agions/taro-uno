import type { CSSProperties, ReactNode } from 'react';

export interface CarouselProps {
  /** 轮播项 */
  children?: ReactNode;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 自动播放间隔时间（毫秒） */
  interval?: number;
  /** 是否显示指示器 */
  showDots?: boolean;
  /** 是否显示箭头 */
  showArrows?: boolean;
  /** 是否无限循环 */
  infinite?: boolean;
  /** 切换效果 */
  effect?: 'slide' | 'fade';
  /** 指示器位置 */
  dotsPosition?: 'bottom' | 'top' | 'left' | 'right';
  /** 每次滚动的项目数 */
  slidesToShow?: number;
  /** 每次滚动移动的项目数 */
  slidesToScroll?: number;
  /** 垂直模式 */
  vertical?: boolean;
  /** 当前活动索引 */
  activeIndex?: number;
  /** 默认活动索引 */
  defaultActiveIndex?: number;
  /** 切换前回调 */
  beforeChange?: (_from: number, to: number) => void;
  /** 切换后回调 */
  afterChange?: (_current: number) => void;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface CarouselRef {
  /** DOM 元素 */
  element: any;
  /** 获取当前索引 */
  getCurrentIndex: () => number;
  /** 跳转到指定索引 */
  goTo: (_index: number) => void;
  /** 上一张 */
  prev: () => void;
  /** 下一张 */
  next: () => void;
  /** 开始自动播放 */
  play: () => void;
  /** 停止自动播放 */
  pause: () => void;
  /** 获取总数 */
  getTotal: () => number;
}
