/**
 * RichText Component Types
 * 富文本展示组件类型定义
 */

/**
 * 文本样式类型
 */
export interface RichTextStyle {
  /** 字体大小 */
  fontSize?: number | string;
  /** 字体颜色 */
  color?: string;
  /** 字体粗细 */
  fontWeight?: 'normal' | 'bold' | number;
  /** 字体样式 */
  fontStyle?: 'normal' | 'italic';
  /** 文本装饰 */
  textDecoration?: 'none' | 'underline' | 'line-through';
  /** 文本对齐 */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  /** 行高 */
  lineHeight?: number | string;
  /** 字间距 */
  letterSpacing?: number | string;
  /** 文本缩进 */
  textIndent?: number | string;
}

/**
 * 段落样式类型
 */
export interface ParagraphStyle {
  /** 段落间距 */
  margin?: number | string;
  /** 上外边距 */
  marginTop?: number | string;
  /** 右外边距 */
  marginRight?: number | string;
  /** 下外边距 */
  marginBottom?: number | string;
  /** 左外边距 */
  marginLeft?: number | string;
  /** 内边距 */
  padding?: number | string;
  /** 上内边距 */
  paddingTop?: number | string;
  /** 右内边距 */
  paddingRight?: number | string;
  /** 下内边距 */
  paddingBottom?: number | string;
  /** 左内边距 */
  paddingLeft?: number | string;
  /** 背景色 */
  backgroundColor?: string;
  /** 边框 */
  border?: string;
  /** 上边框 */
  borderTop?: string;
  /** 右边框 */
  borderRight?: string;
  /** 下边框 */
  borderBottom?: string;
  /** 左边框 */
  borderLeft?: string;
  /** 边框圆角 */
  borderRadius?: number | string;
}

/**
 * 图片样式类型
 */
export interface ImageStyle {
  /** 图片宽度 */
  width?: number | string;
  /** 图片高度 */
  height?: number | string;
  /** 图片最大宽度 */
  maxWidth?: number | string;
  /** 图片最大高度 */
  maxHeight?: number | string;
  /** 图片对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 图片间距 */
  margin?: number | string;
  /** 图片边框 */
  border?: string;
  /** 图片边框圆角 */
  borderRadius?: number | string;
}

/**
 * 列表项类型
 */
export interface ListItem {
  /** 列表项内容 */
  content: string | RichTextNode[];
  /** 列表项样式 */
  style?: RichTextStyle;
}

/**
 * 表格单元格类型
 */
export interface TableCell {
  /** 单元格内容 */
  content: string | RichTextNode[];
  /** 单元格样式 */
  style?: RichTextStyle & ParagraphStyle;
  /** 合并列数 */
  colSpan?: number;
  /** 合并行数 */
  rowSpan?: number;
}

/**
 * 表格行类型
 */
export interface TableRow {
  /** 行单元格 */
  cells: TableCell[];
}

/**
 * 表格类型
 */
export interface RichTextTable {
  /** 表头行 */
  headers: TableCell[];
  /** 表格行 */
  rows: TableRow[];
  /** 表格样式 */
  style?: {
    width?: number | string;
    border?: string;
    borderRadius?: number | string;
    backgroundColor?: string;
  };
}

/**
 * 链接类型
 */
export interface Link {
  /** 链接文本 */
  text: string;
  /** 链接地址 */
  href: string;
  /** 链接类型 */
  type?: 'internal' | 'external';
  /** 链接样式 */
  style?: RichTextStyle;
}

/**
 * 富文本节点类型
 */
export type RichTextNode = {
  /** 节点类型 */
  type: 'text' | 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'img' | 'a' | 'ul' | 'ol' | 'li' | 'table' | 'tr' | 'td' | 'th';
  /** 节点内容 */
  content?: string | RichTextNode[];
  /** 文本样式 */
  style?: RichTextStyle & ParagraphStyle;
  /** 图片属性 */
  imgProps?: {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
  };
  /** 链接属性 */
  linkProps?: {
    href: string;
    type?: 'internal' | 'external';
  };
  /** 列表项 */
  listItems?: ListItem[];
  /** 表格 */
  tableProps?: RichTextTable;
}

/**
 * 富文本组件属性
 */
export interface RichTextProps {
  /** 富文本内容 */
  content: string | RichTextNode[];
  /** 容器样式 */
  style?: React.CSSProperties;
  /** 容器类名 */
  className?: string;
  /** 自定义图片点击事件 */
  onImageClick?: (src: string) => void;
  /** 自定义链接点击事件 */
  onLinkClick?: (href: string, type: 'internal' | 'external') => boolean | void;
  /** 自定义样式配置 */
  customStyles?: {
    /** 全局文本样式 */
    text?: RichTextStyle;
    /** 段落样式 */
    paragraph?: ParagraphStyle;
    /** 标题样式 */
    heading?: {
      h1?: RichTextStyle;
      h2?: RichTextStyle;
      h3?: RichTextStyle;
      h4?: RichTextStyle;
      h5?: RichTextStyle;
      h6?: RichTextStyle;
    };
    /** 列表样式 */
    list?: {
      ul?: ParagraphStyle;
      ol?: ParagraphStyle;
      li?: RichTextStyle;
    };
    /** 图片样式 */
    image?: ImageStyle;
    /** 链接样式 */
    link?: RichTextStyle;
    /** 表格样式 */
    table?: {
      container?: React.CSSProperties;
      header?: React.CSSProperties;
      cell?: React.CSSProperties;
    };
  };
  /** 最大宽度 */
  maxWidth?: number | string;
  /** 是否支持图片缩放 */
  enableImageZoom?: boolean;
  /** 是否支持链接跳转 */
  enableLinkClick?: boolean;
}

/**
 * 富文本组件引用类型
 */
export interface RichTextRef {
  /** 获取组件高度 */
  getHeight: () => number;
  /** 重置组件 */
  reset: () => void;
}
