/**
 * RichText Component Styles
 * 富文本展示组件样式定义
 */

import { CSSProperties } from 'react';

/**
 * 基础样式
 */
export const BaseStyles = {
  // 容器样式
  container: {
    maxWidth: '100%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    lineHeight: 1.5,
    fontSize: '14px',
    color: '#333333',
  } as CSSProperties,

  // 文本样式
  text: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: 1.5,
  } as CSSProperties,

  // 段落样式
  paragraph: {
    margin: '0 0 16px 0',
    padding: 0,
  } as CSSProperties,

  // 标题样式
  heading: {
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 16px 0',
      color: '#000000',
    } as CSSProperties,
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0 0 14px 0',
      color: '#000000',
    } as CSSProperties,
    h3: {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '0 0 12px 0',
      color: '#000000',
    } as CSSProperties,
    h4: {
      fontSize: '16px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
      color: '#000000',
    } as CSSProperties,
    h5: {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '0 0 8px 0',
      color: '#000000',
    } as CSSProperties,
    h6: {
      fontSize: '12px',
      fontWeight: 'bold',
      margin: '0 0 6px 0',
      color: '#000000',
    } as CSSProperties,
  },

  // 列表样式
  list: {
    ul: {
      margin: '0 0 16px 0',
      padding: '0 0 0 20px',
      listStyleType: 'disc',
    } as CSSProperties,
    ol: {
      margin: '0 0 16px 0',
      padding: '0 0 0 20px',
      listStyleType: 'decimal',
    } as CSSProperties,
    li: {
      margin: '0 0 4px 0',
      fontSize: '14px',
      color: '#333333',
    } as CSSProperties,
  },

  // 图片样式
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: '8px 0',
    display: 'block',
    borderRadius: '4px',
  } as CSSProperties,

  // 链接样式
  link: {
    color: '#1677ff',
    textDecoration: 'underline',
    cursor: 'pointer',
  } as CSSProperties,

  // 表格样式
  table: {
    container: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '16px 0',
      fontSize: '14px',
    } as CSSProperties,
    header: {
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
      padding: '8px 12px',
      border: '1px solid #e8e8e8',
      textAlign: 'left',
    } as CSSProperties,
    cell: {
      padding: '8px 12px',
      border: '1px solid #e8e8e8',
      textAlign: 'left',
    } as CSSProperties,
  },

  // 行内元素样式
  inline: {
    display: 'inline',
  } as CSSProperties,

  // 块级元素样式
  block: {
    display: 'block',
  } as CSSProperties,
};

/**
 * 获取标题样式
 */
export const getHeadingStyle = (level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  return BaseStyles.heading[level];
};

/**
 * 获取列表样式
 */
export const getListStyle = (type: 'ul' | 'ol') => {
  return BaseStyles.list[type];
};

/**
 * 合并样式
 */
export const mergeStyles = (...styles: (CSSProperties | undefined)[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};

/**
 * 转换文本样式为CSS样式
 */
export const transformTextStyle = (style?: any) => {
  if (!style) return {};

  const cssStyle: CSSProperties = {};

  // 字体大小
  if (style.fontSize !== undefined) {
    cssStyle.fontSize = style.fontSize;
  }

  // 字体颜色
  if (style.color) {
    cssStyle.color = style.color;
  }

  // 字体粗细
  if (style.fontWeight !== undefined) {
    cssStyle.fontWeight = style.fontWeight;
  }

  // 字体样式
  if (style.fontStyle) {
    cssStyle.fontStyle = style.fontStyle;
  }

  // 文本装饰
  if (style.textDecoration) {
    cssStyle.textDecoration = style.textDecoration;
  }

  // 文本对齐
  if (style.textAlign) {
    cssStyle.textAlign = style.textAlign;
  }

  // 行高
  if (style.lineHeight !== undefined) {
    cssStyle.lineHeight = style.lineHeight;
  }

  // 字间距
  if (style.letterSpacing !== undefined) {
    cssStyle.letterSpacing = style.letterSpacing;
  }

  // 文本缩进
  if (style.textIndent !== undefined) {
    cssStyle.textIndent = style.textIndent;
  }

  // 段落间距
  if (style.margin !== undefined) {
    cssStyle.margin = style.margin;
  }

  // 上外边距
  if (style.marginTop !== undefined) {
    cssStyle.marginTop = style.marginTop;
  }

  // 右外边距
  if (style.marginRight !== undefined) {
    cssStyle.marginRight = style.marginRight;
  }

  // 下外边距
  if (style.marginBottom !== undefined) {
    cssStyle.marginBottom = style.marginBottom;
  }

  // 左外边距
  if (style.marginLeft !== undefined) {
    cssStyle.marginLeft = style.marginLeft;
  }

  // 内边距
  if (style.padding !== undefined) {
    cssStyle.padding = style.padding;
  }

  // 上内边距
  if (style.paddingTop !== undefined) {
    cssStyle.paddingTop = style.paddingTop;
  }

  // 右内边距
  if (style.paddingRight !== undefined) {
    cssStyle.paddingRight = style.paddingRight;
  }

  // 下内边距
  if (style.paddingBottom !== undefined) {
    cssStyle.paddingBottom = style.paddingBottom;
  }

  // 左内边距
  if (style.paddingLeft !== undefined) {
    cssStyle.paddingLeft = style.paddingLeft;
  }

  // 背景色
  if (style.backgroundColor) {
    cssStyle.backgroundColor = style.backgroundColor;
  }

  // 边框
  if (style.border) {
    cssStyle.border = style.border;
  }

  // 上边框
  if (style.borderTop) {
    cssStyle.borderTop = style.borderTop;
  }

  // 右边框
  if (style.borderRight) {
    cssStyle.borderRight = style.borderRight;
  }

  // 下边框
  if (style.borderBottom) {
    cssStyle.borderBottom = style.borderBottom;
  }

  // 左边框
  if (style.borderLeft) {
    cssStyle.borderLeft = style.borderLeft;
  }

  // 边框圆角
  if (style.borderRadius !== undefined) {
    cssStyle.borderRadius = style.borderRadius;
  }

  return cssStyle;
};

/**
 * 转换图片样式为CSS样式
 */
export const transformImageStyle = (style?: any) => {
  if (!style) return {};

  const cssStyle: CSSProperties = {};

  // 图片宽度
  if (style.width !== undefined) {
    cssStyle.width = style.width;
  }

  // 图片高度
  if (style.height !== undefined) {
    cssStyle.height = style.height;
  }

  // 图片最大宽度
  if (style.maxWidth !== undefined) {
    cssStyle.maxWidth = style.maxWidth;
  }

  // 图片最大高度
  if (style.maxHeight !== undefined) {
    cssStyle.maxHeight = style.maxHeight;
  }

  // 图片对齐方式
  if (style.align) {
    cssStyle.textAlign = style.align;
  }

  // 图片间距
  if (style.margin !== undefined) {
    cssStyle.margin = style.margin;
  }

  // 图片边框
  if (style.border) {
    cssStyle.border = style.border;
  }

  // 图片边框圆角
  if (style.borderRadius !== undefined) {
    cssStyle.borderRadius = style.borderRadius;
  }

  return cssStyle;
};
