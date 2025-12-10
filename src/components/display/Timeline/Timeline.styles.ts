import type { CSSProperties } from 'react';

export const timelineStyles: Record<string, CSSProperties> = {
  base: {
    position: 'relative',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },

  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflowX: 'auto',
    paddingBottom: '16px',
  },

  reverse: {
    flexDirection: 'column-reverse',
  },

  reverseHorizontal: {
    flexDirection: 'row-reverse',
  },

  // 时间线项
  item: {
    position: 'relative',
    paddingBottom: '20px',
    minHeight: '48px',
  },

  itemHorizontal: {
    paddingBottom: 0,
    paddingRight: '20px',
    minWidth: '200px',
    flexShrink: 0,
  },

  itemLast: {
    paddingBottom: 0,
  },

  itemLastHorizontal: {
    paddingRight: 0,
  },

  // 时间线线条
  itemLine: {
    position: 'absolute',
    left: '8px',
    top: '20px',
    width: '1px',
    height: 'calc(100% - 20px)',
    backgroundColor: '#f0f0f0',
  },

  itemLineHorizontal: {
    position: 'absolute',
    left: '20px',
    top: '8px',
    width: 'calc(100% - 20px)',
    height: '1px',
    backgroundColor: '#f0f0f0',
  },

  itemLineLast: {
    display: 'none',
  },

  // 节点
  itemDot: {
    position: 'absolute',
    left: '4px',
    top: '4px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#d9d9d9',
    border: '2px solid #ffffff',
    boxShadow: '0 0 0 1px #d9d9d9',
    zIndex: 1,
  },

  itemDotHorizontal: {
    position: 'absolute',
    left: '4px',
    top: '4px',
    width: '8px',
    height: '8px',
  },

  // 节点颜色
  dotDefault: {
    backgroundColor: '#d9d9d9',
    boxShadow: '0 0 0 1px #d9d9d9',
  },

  dotPrimary: {
    backgroundColor: '#1890ff',
    boxShadow: '0 0 0 1px #1890ff',
  },

  dotSuccess: {
    backgroundColor: '#52c41a',
    boxShadow: '0 0 0 1px #52c41a',
  },

  dotWarning: {
    backgroundColor: '#faad14',
    boxShadow: '0 0 0 1px #faad14',
  },

  dotDanger: {
    backgroundColor: '#ff4d4f',
    boxShadow: '0 0 0 1px #ff4d4f',
  },

  dotInfo: {
    backgroundColor: '#13c2c2',
    boxShadow: '0 0 0 1px #13c2c2',
  },

  // 自定义节点
  customDot: {
    position: 'absolute',
    left: '0',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '16px',
    minHeight: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
    zIndex: 1,
  },

  // 内容
  itemContent: {
    marginLeft: '24px',
    paddingTop: '0',
    wordBreak: 'break-word',
  },

  itemContentHorizontal: {
    marginLeft: 0,
    marginTop: '24px',
    paddingTop: '0',
  },

  itemContentRight: {
    marginLeft: 0,
    marginRight: '24px',
    textAlign: 'right',
  },

  // 标题和描述
  itemTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#262626',
    marginBottom: '4px',
    lineHeight: '1.5',
  },

  itemDescription: {
    fontSize: '14px',
    color: '#8c8c8c',
    lineHeight: '1.5',
    marginBottom: '8px',
  },

  itemTimestamp: {
    fontSize: '12px',
    color: '#8c8c8c',
    marginTop: '4px',
  },

  // 交替模式
  itemAlternateLeft: {
    paddingRight: '50%',
  },

  itemAlternateRight: {
    paddingLeft: '50%',
    textAlign: 'right',
  },

  itemAlternateRightContent: {
    marginLeft: 0,
    marginRight: '24px',
  },

  itemAlternateRightDot: {
    right: 'calc(50% - 8px)',
    left: 'auto',
  },

  itemAlternateRightLine: {
    right: 'calc(50% - 0.5px)',
    left: 'auto',
  },
};
