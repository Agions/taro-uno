import type { ReactNode, HTMLAttributes } from 'react';

/** 文本尺寸 */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

/** 文本权重 */
export type TextWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

/** 文本对齐 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

/** 文本装饰 */
export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through' | 'blink';

/** 文本转换 */
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

/** 文本溢出处理 */
export type TextOverflow = 'clip' | 'ellipsis' | 'break-word' | 'break-all' | 'truncate';

/** 文本方向 */
export type TextDirection = 'ltr' | 'rtl';

/** 文本样式 */
export type TextStyle = 'normal' | 'italic' | 'oblique';

/** 文本变体 */
export type TextVariant =
  | 'normal'
  | 'small-caps'
  | 'all-small-caps'
  | 'petite-caps'
  | 'all-petite-caps'
  | 'unicase'
  | 'titling-caps'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2' | 'body'
  | 'caption' | 'overline' | 'subtitle1' | 'subtitle2';

/** 文本间距 */
export type LetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest' | number;

/** 行高 */
export type LineHeight = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | number;

/** 文本颜色类型 */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'disabled'
  | 'inherit'
  | 'current'
  | string;

/** 文本状态 */
export type TextStatus = 'normal' | 'active' | 'disabled' | 'loading';

/** 文本类型 */
export type TextType = 'body' | 'heading' | 'caption' | 'label' | 'link' | 'code' | 'quote' | 'helper';

/** 文本原生属性类型 */
export type TextNativeProps = HTMLAttributes<HTMLParagraphElement>;

/** 文本组件属性接口 */
export interface TextProps extends Omit<TextNativeProps, 'size' | 'color' | 'weight'> {
  /** 文本内容 */
  children?: ReactNode;
  /** 文本尺寸 */
  size?: TextSize;
  /** 文本权重 */
  weight?: TextWeight;
  /** 文本颜色 */
  color?: TextColor;
  /** 文本对齐 */
  align?: TextAlign;
  /** 文本装饰 */
  decoration?: TextDecoration;
  /** 文本转换 */
  transform?: TextTransform;
  /** 文本溢出处理 */
  overflow?: TextOverflow;
  /** 文本方向 */
  direction?: TextDirection;
  /** 文本样式 */
  fontStyle?: TextStyle;
  /** 文本变体 */
  variant?: TextVariant;
  /** 字母间距 */
  letterSpacing?: LetterSpacing;
  /** 行高 */
  lineHeight?: LineHeight;
  /** 文本状态 */
  status?: TextStatus;
  /** 文本类型 */
  type?: TextType;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否块级显示 */
  block?: boolean;
  /** 是否内联块级显示 */
  inlineBlock?: boolean;
  /** 是否可选中 */
  selectable?: boolean;
  /** 是否可复制 */
  copyable?: boolean;
  /** 复制时的回调函数 */
  onCopy?: () => void;
  /** 自定义样式类名 */
  className?: string;
  /** 点击事件处理函数 */
  onClick?: (event: React.MouseEvent) => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 最大行数 */
  maxLines?: number;
  /** 是否启用动画 */
  animated?: boolean;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
  /** 文本链接地址 */
  href?: string;
  /** 链接打开方式 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 是否显示下划线 */
  underline?: boolean;
  /** 是否删除线 */
  strikethrough?: boolean;
  /** 是否高亮 */
  highlight?: boolean;
  /** 高亮颜色 */
  highlightColor?: string;
  /** 是否显示省略号 */
  ellipsis?: boolean;
  /** 是否自动换行 */
  wrap?: boolean;
  /** 是否保持单词完整 */
  breakWord?: boolean;
  /** 文本阴影 */
  textShadow?: string;
  /** 文本轮廓 */
  textOutline?: string;
  /** 文本渐变 */
  gradient?: {
    start: string;
    end: string;
    direction?: 'to right' | 'to left' | 'to bottom' | 'to top' | 'to bottom right' | 'to top left';
  };
  /** 自定义字体 */
  fontFamily?: string | string[];
  /** 文本间距 */
  wordSpacing?: number | string;
  /** 文本缩进 */
  textIndent?: number | string;
  /** 白空格处理 */
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
  /** 垂直对齐 */
  verticalAlign?: 'baseline' | 'sub' | 'super' | 'top' | 'text-top' | 'middle' | 'bottom' | 'text-bottom';
  /** 文本方向组合 */
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  /** 文本渲染优化 */
  textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
}

/** 文本组件引用类型 */
export type TextRef = {
  /** 文本元素 */
  element: HTMLParagraphElement | HTMLSpanElement | null;
  /** 获取文本内容 */
  getText: () => string;
  /** 设置文本内容 */
  setText: (text: string) => void;
  /** 复制文本 */
  copy: () => Promise<void>;
  /** 选择文本 */
  select: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 获取文本状态 */
  getStatus: () => TextStatus;
  /** 获取文本尺寸 */
  getSize: () => TextSize;
  /** 获取文本颜色 */
  getColor: () => string;
  /** 设置文本颜色 */
  setColor: (color: string) => void;
  /** 设置文本尺寸 */
  setSize: (size: TextSize) => void;
  /** 设置文本权重 */
  setWeight: (weight: TextWeight) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
};

/** 文本工具函数接口 */
export interface TextUtils {
  /** 获取文本样式类名 */
  getTextClassName: (props: Partial<TextProps>) => string;
  /** 获取文本样式对象 */
  getTextStyle: (props: Partial<TextProps>) => React.CSSProperties;
  /** 获取文本尺寸映射 */
  getSizeMap: () => Record<TextSize, { fontSize: number; lineHeight: number }>;
  /** 获取文本权重映射 */
  getWeightMap: () => Record<TextWeight, number>;
  /** 获取文本颜色映射 */
  getColorMap: () => Record<TextColor, string>;
  /** 验证文本属性 */
  validateTextProps: (props: TextProps) => boolean;
  /** 格式化文本尺寸 */
  formatTextSize: (size: TextSize) => string;
  /** 格式化文本权重 */
  formatTextWeight: (weight: TextWeight) => string;
  /** 格式化文本颜色 */
  formatTextColor: (color: TextColor) => string;
  /** 截断文本 */
  truncateText: (text: string, maxLength: number, suffix?: string) => string;
  /** 高亮文本 */
  highlightText: (text: string, highlight: string, highlightColor?: string) => ReactNode;
  /** 格式化数字 */
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  /** 格式化日期 */
  formatDate: (date: Date | string | number, format?: string) => string;
  /** 格式化货币 */
  formatCurrency: (amount: number, currency?: string, locale?: string) => string;
  /** 计算文本长度 */
  calculateTextLength: (text: string, options?: { fontSize: number; fontFamily: string }) => number;
  /** 检测文本语言 */
  detectLanguage: (text: string) => string;
  /** 清理文本 */
  sanitizeText: (text: string) => string;
  /** 转换HTML实体 */
  escapeHtml: (text: string) => string;
  /** 反转换HTML实体 */
  unescapeHtml: (text: string) => string;
}

/** 打字机效果属性 */
export interface TypewriterProps {
  /** 要显示的文本 */
  text: string;
  /** 打字速度（毫秒） */
  speed?: number;
  /** 删除速度（毫秒） */
  deleteSpeed?: number;
  /** 是否循环 */
  loop?: boolean;
  /** 延迟开始时间（毫秒） */
  delay?: number;
  /** 删除前等待时间（毫秒） */
  waitTime?: number;
  /** 是否显示光标 */
  showCursor?: boolean;
  /** 光标字符 */
  cursorChar?: string;
  /** 完成回调 */
  onComplete?: () => void;
  /** 开始回调 */
  onStart?: () => void;
  /** 删除回调 */
  onDelete?: () => void;
}

/** 文本渐变属性 */
export interface TextGradientProps {
  /** 渐变开始颜色 */
  start: string;
  /** 渐变结束颜色 */
  end: string;
  /** 渐变方向 */
  direction?: 'to right' | 'to left' | 'to bottom' | 'to top' | 'to bottom right' | 'to top left';
  /** 子元素 */
  children: ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}
