import type { CSSProperties } from 'react';

export const tagStyles: Record<string, CSSProperties> = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: '1px solid transparent',
    fontWeight: '400',
    lineHeight: '1',
    cursor: 'default',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    verticalAlign: 'middle',
  },

  // 大小
  small: {
    height: '20px',
    padding: '0 6px',
    fontSize: '12px',
  },

  medium: {
    height: '24px',
    padding: '0 8px',
    fontSize: '13px',
  },

  large: {
    height: '28px',
    padding: '0 12px',
    fontSize: '14px',
  },

  // 颜色 - 实心
  defaultSolid: {
    backgroundColor: '#fafafa',
    color: '#595959',
    border: '1px solid #d9d9d9',
  },

  primarySolid: {
    backgroundColor: '#1890ff',
    color: '#ffffff',
    border: '1px solid #1890ff',
  },

  successSolid: {
    backgroundColor: '#52c41a',
    color: '#ffffff',
    border: '1px solid #52c41a',
  },

  warningSolid: {
    backgroundColor: '#faad14',
    color: '#ffffff',
    border: '1px solid #faad14',
  },

  dangerSolid: {
    backgroundColor: '#ff4d4f',
    color: '#ffffff',
    border: '1px solid #ff4d4f',
  },

  infoSolid: {
    backgroundColor: '#13c2c2',
    color: '#ffffff',
    border: '1px solid #13c2c2',
  },

  // 颜色 - 描边
  defaultOutline: {
    backgroundColor: 'transparent',
    color: '#595959',
    border: '1px solid #d9d9d9',
  },

  primaryOutline: {
    backgroundColor: 'transparent',
    color: '#1890ff',
    border: '1px solid #1890ff',
  },

  successOutline: {
    backgroundColor: 'transparent',
    color: '#52c41a',
    border: '1px solid #52c41a',
  },

  warningOutline: {
    backgroundColor: 'transparent',
    color: '#faad14',
    border: '1px solid #faad14',
  },

  dangerOutline: {
    backgroundColor: 'transparent',
    color: '#ff4d4f',
    border: '1px solid #ff4d4f',
  },

  infoOutline: {
    backgroundColor: 'transparent',
    color: '#13c2c2',
    border: '1px solid #13c2c2',
  },

  // 颜色 - 浅色
  defaultLight: {
    backgroundColor: '#fafafa',
    color: '#595959',
    border: '1px solid transparent',
  },

  primaryLight: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    border: '1px solid transparent',
  },

  successLight: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
    border: '1px solid transparent',
  },

  warningLight: {
    backgroundColor: '#fffbe6',
    color: '#faad14',
    border: '1px solid transparent',
  },

  dangerLight: {
    backgroundColor: '#fff2f0',
    color: '#ff4d4f',
    border: '1px solid transparent',
  },

  infoLight: {
    backgroundColor: '#e6fffb',
    color: '#13c2c2',
    border: '1px solid transparent',
  },

  // 状态
  clickable: {
    cursor: 'pointer',
  },

  checkable: {
    cursor: 'pointer',
  },

  checked: {
    backgroundColor: '#1890ff',
    color: '#ffffff',
    border: '1px solid #1890ff',
  },

  hover: {
    opacity: 0.8,
  },

  // 内容
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  icon: {
    fontSize: 'inherit',
    lineHeight: '1',
  },

  text: {
    fontSize: 'inherit',
    lineHeight: '1',
  },

  closeIcon: {
    marginLeft: '4px',
    fontSize: '10px',
    lineHeight: '1',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  },

  closeIconHover: {
    opacity: 1,
  },
};
