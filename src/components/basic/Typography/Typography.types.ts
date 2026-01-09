import { ReactNode } from 'react';

/**
 * Typography 组件属性类型
 */
export interface TypographyProps {
  /**
   * 文本内容
   */
  children: ReactNode;

  /**
   * 文本类型
   */
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

  /**
   * 文本变体
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

  /**
   * 文本对齐
   */
  align?: 'left' | 'center' | 'right' | 'justify';

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 是否可复制
   */
  copyable?: boolean;

  /**
   * 是否可编辑
   */
  editable?: boolean;

  /**
   * 删除线
   */
  delete?: boolean;

  /**
   * 下划线
   */
  underline?: boolean;

  /**
   * 代码样式
   */
  code?: boolean;

  /**
   * 键盘样式
   */
  keyboard?: boolean;

  /**
   * 粗体
   */
  strong?: boolean;

  /**
   * 斜体
   */
  italic?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 点击事件
   */
  onClick?: (_e: React.MouseEvent) => void;

  /**
   * 文本大小
   */
  size?: TypographySize;

  /**
   * 文本颜色
   */
  color?: TypographyColor;

  /**
   * 文本权重
   */
  weight?: TypographyWeight;

  /**
   * 省略号
   */
  ellipsis?: boolean;

  /**
   * 最大行数
   */
  maxRows?: number;

  /**
   * 换行
   */
  wrap?: boolean;

  /**
   * 复制回调
   */
  onCopy?: () => void;

  /**
   * 编辑回调
   */
  onEdit?: (_text: string) => void;
}

/**
 * Typography 组件引用类型
 */
export interface TypographyRef {
  /**
   * 获取文本内容
   */
  getText: () => string;

  /**
   * 复制文本
   */
  copy: () => void;

  /**
   * 编辑文本
   */
  edit: (_text: string) => void;
}

/**
 * Typography 尺寸类型
 */
export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Typography 颜色类型
 */
export type TypographyColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'inherit';

/**
 * Typography 权重类型
 */
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Typography 工具类型
 */
export interface TypographyUtils {
  /**
   * 计算文本样式
   */
  calculateStyles: (_props: TypographyProps) => React.CSSProperties;

  /**
   * 格式化文本
   */
  formatText: (_text: string, variant: TypographyProps['variant']) => string;

  /**
   * 复制到剪贴板
   */
  copyToClipboard: (_text: string) => Promise<void>;
}

/**
 * Typography 原生属性类型
 */
export interface TypographyNativeProps {
  /**
   * 原生文本元素属性
   */
  nativeProps?: React.HTMLAttributes<HTMLElement>;
}

/**
 * Typography 标题属性
 */
export interface TitleProps extends TypographyProps {
  /**
   * 标题级别
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * 副标题
   */
  subtitle?: ReactNode;

  /**
   * 标题分隔线
   */
  divider?: boolean;
}

/**
 * Typography 段落属性
 */
export interface ParagraphProps extends TypographyProps {
  /**
   * 段落间距
   */
  spacing?: number;

  /**
   * 首行缩进
   */
  indent?: boolean;

  /**
   * 行高
   */
  lineHeight?: number;
}

/**
 * Typography 文本属性
 */
export interface TypographyTextProps extends TypographyProps {
  /**
   * 文本大小
   */
  size?: TypographySize;

  /**
   * 文本颜色
   */
  color?: TypographyColor;

  /**
   * 文本权重
   */
  weight?: TypographyWeight;

  /**
   * 省略号
   */
  ellipsis?: boolean;

  /**
   * 最大行数
   */
  maxRows?: number;

  /**
   * 换行
   */
  wrap?: boolean;
}

/**
 * Typography 链接属性
 */
export interface LinkProps extends TypographyProps {
  /**
   * 链接地址
   */
  href?: string;

  /**
   * 目标
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * 是否在新窗口打开
   */
  external?: boolean;

  /**
   * 下划线
   */
  underline?: boolean;

  /**
   * 点击事件
   */
  onClick?: (_e: React.MouseEvent) => void;
}
