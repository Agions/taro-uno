/**
 * 样式重置模块
 * 提供跨平台的样式重置，消除浏览器默认样式差异
 * @module theme/styles/base/reset
 */

import type { StyleObject } from '../../../types/style';

/**
 * 盒模型重置
 * 使用 border-box 作为默认盒模型
 */
export const boxSizingReset: StyleObject = {
  boxSizing: 'border-box',
};

/**
 * 边距重置
 * 清除默认的 margin 和 padding
 */
export const marginReset: StyleObject = {
  margin: 0,
  padding: 0,
};

/**
 * 列表重置
 * 清除列表默认样式
 */
export const listReset: StyleObject = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

/**
 * 按钮重置
 * 清除按钮默认样式
 */
export const buttonReset: StyleObject = {
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  font: 'inherit',
  color: 'inherit',
  textAlign: 'inherit',
  outline: 'none',
};

/**
 * 输入框重置
 * 清除输入框默认样式
 */
export const inputReset: StyleObject = {
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  color: 'inherit',
  outline: 'none',
};

/**
 * 链接重置
 * 清除链接默认样式
 */
export const linkReset: StyleObject = {
  textDecoration: 'none',
  color: 'inherit',
};

/**
 * 图片重置
 * 清除图片默认样式
 */
export const imageReset: StyleObject = {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  border: 'none',
};

/**
 * 表格重置
 * 清除表格默认样式
 */
export const tableReset: StyleObject = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
};

/**
 * 文本重置
 * 清除文本默认样式
 */
export const textReset: StyleObject = {
  margin: 0,
  padding: 0,
};

/**
 * 表单元素重置
 * 清除表单元素默认样式
 */
export const formReset: StyleObject = {
  margin: 0,
  padding: 0,
  border: 'none',
};

/**
 * 完整重置样式集合
 * 包含所有重置样式
 */
export const resetStyles = {
  boxSizing: boxSizingReset,
  margin: marginReset,
  list: listReset,
  button: buttonReset,
  input: inputReset,
  link: linkReset,
  image: imageReset,
  table: tableReset,
  text: textReset,
  form: formReset,
} as const;

export default resetStyles;
