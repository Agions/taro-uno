import type { ReactNode, HTMLAttributes } from 'react';
import type { CommonEventFunction } from '@tarojs/components';

/** 分割线方向 */
export type DividerOrientation = 'horizontal' | 'vertical';

/** 分割线类型 */
export type DividerType = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';

/** 分割线位置 */
export type DividerPosition = 'left' | 'center' | 'right';

/** 分割线尺寸 */
export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 分割线颜色 */
export type DividerColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'light'
  | 'dark'
  | 'border'
  | string;

/** 分割线变体 */
export type DividerVariant = 'default' | 'inset' | 'middle' | 'text' | 'with-icon';

/** 分割线原生属性类型 */
export type DividerNativeProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;

/** 分割线组件属性接口 */
export interface DividerProps extends Omit<DividerNativeProps, 'orientation'> {
  /** 分割线方向 */
  orientation?: DividerOrientation;
  /** 分割线类型 */
  type?: DividerType;
  /** 分割线位置 */
  position?: DividerPosition;
  /** 分割线尺寸 */
  size?: DividerSize;
  /** 分割线颜色 */
  color?: DividerColor;
  /** 分割线变体 */
  variant?: DividerVariant;
  /** 分割线文本内容 */
  children?: ReactNode;
  /** 是否边距内缩 */
  inset?: boolean | undefined;
  /** 是否居中显示 */
  centered?: boolean | undefined;
  /** 自定义样式类名 */
  className?: string | undefined;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 分割线宽度 */
  width?: number | string | undefined;
  /** 分割线高度 */
  height?: number | string | undefined;
  /** 分割线边距 */
  margin?: number | string | undefined;
  /** 分割线内边距 */
  padding?: number | string | undefined;
  /** 是否启用动画 */
  animated?: boolean | undefined;
  /** 动画持续时间 */
  animationDuration?: number | undefined;
  /** 是否启用无障碍访问 */
  accessible?: boolean | undefined;
  /** 无障碍标签 */
  accessibilityLabel?: string | undefined;
  /** 无障碍角色 */
  accessibilityRole?: string | undefined;
  /** 分割线透明度 */
  opacity?: number | undefined;
  /** 分割线阴影 */
  shadow?: boolean | undefined;
  /** 分割线圆角 */
  borderRadius?: number | string | undefined;
  /** 分割线渐变 */
  gradient?:
    | {
        start: string;
        end: string;
        direction?: 'to right' | 'to left' | 'to bottom' | 'to top';
      }
    | undefined;
  /** 分割线图标 */
  icon?: ReactNode | undefined;
  /** 图标位置 */
  iconPosition?: 'start' | 'center' | 'end' | undefined;
  /** 是否可点击 */
  clickable?: boolean | undefined;
  /** 点击事件处理函数 */
  onClick?: CommonEventFunction<any>;
  /** 是否响应式 */
  responsive?: boolean | undefined;
  /** 响应式断点 */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  /** 分割线间距 */
  spacing?: number | string | undefined;
  /** 分割线对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch' | undefined;
  /** 分割线垂直对齐 */
  verticalAlign?: 'top' | 'middle' | 'bottom' | undefined;
  /** 分割线文本样式 */
  textStyle?: React.CSSProperties | undefined;
  /** 分割线文本间距 */
  textSpacing?: number | string | undefined;
  /** 分割线文本背景色 */
  textBackground?: string | undefined;
  /** 分割线文本边距 */
  textPadding?: number | string | undefined;
  /** 分割线文本圆角 */
  textBorderRadius?: number | string | undefined;
}

/** 分割线组件引用类型 */
export type DividerRef = {
  /** 分割线元素 */
  element: HTMLDivElement | null;
  /** 获取分割线方向 */
  getOrientation: () => DividerOrientation;
  /** 获取分割线类型 */
  getType: () => DividerType;
  /** 获取分割线位置 */
  getPosition: () => DividerPosition;
  /** 获取分割线尺寸 */
  getSize: () => DividerSize;
  /** 获取分割线颜色 */
  getColor: () => string;
  /** 设置分割线方向 */
  setOrientation: (orientation: DividerOrientation) => void;
  /** 设置分割线类型 */
  setType: (type: DividerType) => void;
  /** 设置分割线位置 */
  setPosition: (position: DividerPosition) => void;
  /** 设置分割线尺寸 */
  setSize: (size: DividerSize) => void;
  /** 设置分割线颜色 */
  setColor: (color: string) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
};

/** 分割线组属性接口 */
export interface DividerGroupProps {
  /** 分割线组内容 */
  children: ReactNode;
  /** 分割线组方向 */
  orientation?: DividerOrientation;
  /** 分割线组类型 */
  type?: DividerType;
  /** 分割线组尺寸 */
  size?: DividerSize;
  /** 分割线组颜色 */
  color?: DividerColor;
  /** 分割线组变体 */
  variant?: DividerVariant;
  /** 分割线组间距 */
  spacing?: number | string;
  /** 分割线组是否垂直排列 */
  vertical?: boolean;
  /** 分割线组对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 分割线组自定义样式类名 */
  className?: string;
  /** 分割线组自定义样式 */
  style?: React.CSSProperties;
}

/** 分割线工具函数接口 */
export interface DividerUtils {
  /** 获取分割线样式类名 */
  getDividerClassName: (props: Partial<DividerProps>) => string;
  /** 获取分割线样式对象 */
  getDividerStyle: (props: Partial<DividerProps>) => React.CSSProperties;
  /** 获取分割线尺寸映射 */
  getSizeMap: () => Record<DividerSize, { width: number; height: number; margin: number }>;
  /** 获取分割线颜色映射 */
  getColorMap: () => Record<DividerColor, string>;
  /** 验证分割线属性 */
  validateDividerProps: (props: DividerProps) => boolean;
  /** 格式化分割线方向 */
  formatDividerOrientation: (orientation: DividerOrientation) => string;
  /** 格式化分割线类型 */
  formatDividerType: (type: DividerType) => string;
  /** 格式化分割线位置 */
  formatDividerPosition: (position: DividerPosition) => string;
  /** 格式化分割线尺寸 */
  formatDividerSize: (size: DividerSize) => string;
  /** 格式化分割线颜色 */
  formatDividerColor: (color: DividerColor) => string;
  /** 计算分割线长度 */
  calculateDividerLength: (props: DividerProps) => number | string;
  /** 生成渐变背景 */
  generateGradientBackground: (gradient: { start: string; end: string; direction?: string }) => string;
  /** 响应式处理 */
  handleResponsive: (props: DividerProps, breakpoint?: string) => Partial<DividerProps>;
}

/** 垂直分割线属性接口 */
export interface VerticalDividerProps extends Omit<DividerProps, 'orientation'> {
  /** 垂直分割线高度 */
  height?: number | string;
  /** 垂直分割线对齐方式 */
  align?: 'start' | 'stretch' | 'center' | 'end';
}

/** 文本分割线属性接口 */
export interface TextDividerProps extends Omit<DividerProps, 'variant'> {
  /** 文本分割线内容 */
  children: ReactNode;
  /** 文本分割线变体 */
  variant?: 'text' | 'with-icon' | 'with-text';
  /** 文本分割线图标 */
  icon?: ReactNode;
  /** 图标位置 */
  iconPosition?: 'start' | 'center' | 'end';
  /** 文本分割线文本样式 */
  textStyle?: React.CSSProperties;
  /** 文本分割线文本间距 */
  textSpacing?: number | string;
  /** 文本分割线文本背景色 */
  textBackground?: string;
  /** 文本分割线文本边距 */
  textPadding?: number | string;
  /** 文本分割线文本圆角 */
  textBorderRadius?: number | string;
}

/** 动画分割线属性接口 */
export interface AnimatedDividerProps extends DividerProps {
  /** 动画类型 */
  animationType?: 'slide' | 'fade' | 'grow' | 'pulse';
  /** 动画方向 */
  animationDirection?: 'left' | 'right' | 'up' | 'down';
  /** 动画持续时间 */
  animationDuration?: number;
  /** 动画延迟 */
  animationDelay?: number;
  /** 动画循环 */
  animationLoop?: boolean;
  /** 动画播放状态 */
  animationPlayState?: 'running' | 'paused';
}

/** 分割线预设配置 */
export interface DividerPreset {
  /** 预设名称 */
  name: string;
  /** 预设配置 */
  config: Partial<DividerProps>;
  /** 预设描述 */
  description?: string;
  /** 预设分类 */
  category?: string;
}
