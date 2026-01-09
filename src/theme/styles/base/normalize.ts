/**
 * 样式标准化模块
 * 提供跨平台的样式标准化，确保一致的基础样式
 * @module theme/styles/base/normalize
 */

import type { StyleObject } from '../../../types/style';

/**
 * 文档标准化
 * 设置文档级别的标准样式
 */
export const documentNormalize: StyleObject = {
  lineHeight: 1.5,
  WebkitTextSizeAdjust: '100%',
  fontFamily: 'inherit',
};

/**
 * 正文标准化
 * 设置正文的标准样式
 */
export const bodyNormalize: StyleObject = {
  margin: 0,
  padding: 0,
  minHeight: '100%',
  fontFamily: 'inherit',
  fontSize: '16px',
  lineHeight: 1.5,
  color: 'inherit',
  backgroundColor: 'inherit',
};

/**
 * 标题标准化
 * 设置标题的标准样式
 */
export const headingNormalize: StyleObject = {
  margin: 0,
  padding: 0,
  fontWeight: 'bold',
  lineHeight: 1.25,
};

/**
 * 段落标准化
 * 设置段落的标准样式
 */
export const paragraphNormalize: StyleObject = {
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
};

/**
 * 链接标准化
 * 设置链接的标准样式
 */
export const linkNormalize: StyleObject = {
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
};

/**
 * 按钮标准化
 * 设置按钮的标准样式
 */
export const buttonNormalize: StyleObject = {
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  textTransform: 'none',
};

/**
 * 输入框标准化
 * 设置输入框的标准样式
 */
export const inputNormalize: StyleObject = {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
  padding: 0,
};

/**
 * 文本区域标准化
 * 设置文本区域的标准样式
 */
export const textareaNormalize: StyleObject = {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  resize: 'vertical',
  overflow: 'auto',
};

/**
 * 选择框标准化
 * 设置选择框的标准样式
 */
export const selectNormalize: StyleObject = {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  textTransform: 'none',
};

/**
 * 图片标准化
 * 设置图片的标准样式
 */
export const imageNormalize: StyleObject = {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  verticalAlign: 'middle',
};

/**
 * 表格标准化
 * 设置表格的标准样式
 */
export const tableNormalize: StyleObject = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
  width: '100%',
};

/**
 * 表格单元格标准化
 * 设置表格单元格的标准样式
 */
export const tableCellNormalize: StyleObject = {
  padding: 0,
  textAlign: 'left',
  verticalAlign: 'middle',
};

/**
 * 列表标准化
 * 设置列表的标准样式
 */
export const listNormalize: StyleObject = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
};

/**
 * 代码标准化
 * 设置代码的标准样式
 */
export const codeNormalize: StyleObject = {
  fontFamily: 'monospace',
  fontSize: '0.875em',
};

/**
 * 预格式化文本标准化
 * 设置预格式化文本的标准样式
 */
export const preNormalize: StyleObject = {
  fontFamily: 'monospace',
  fontSize: '0.875em',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
};

/**
 * 分隔线标准化
 * 设置分隔线的标准样式
 */
export const hrNormalize: StyleObject = {
  height: 0,
  border: 'none',
  borderTop: '1px solid currentColor',
  margin: 0,
  opacity: 0.25,
};

/**
 * 完整标准化样式集合
 * 包含所有标准化样式
 */
export const normalizeStyles = {
  document: documentNormalize,
  body: bodyNormalize,
  heading: headingNormalize,
  paragraph: paragraphNormalize,
  link: linkNormalize,
  button: buttonNormalize,
  input: inputNormalize,
  textarea: textareaNormalize,
  select: selectNormalize,
  image: imageNormalize,
  table: tableNormalize,
  tableCell: tableCellNormalize,
  list: listNormalize,
  code: codeNormalize,
  pre: preNormalize,
  hr: hrNormalize,
} as const;

export default normalizeStyles;
