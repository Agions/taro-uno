import { CSSProperties } from 'react';

export const avatarStyles: Record<string, CSSProperties> = {
  // 尺寸样式
  small: {
    width: 32,
    height: 32,
    fontSize: 14,
  },
  medium: {
    width: 40,
    height: 40,
    fontSize: 16,
  },
  large: {
    width: 64,
    height: 64,
    fontSize: 24,
  },

  // 形状样式
  circle: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
  square: {
    borderRadius: 4,
    overflow: 'hidden',
  },

  // 基础样式
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    color: '#666',
    fontWeight: 500,
    position: 'relative',
  },

  // 图片样式
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // 图标样式
  icon: {
    fontSize: 'inherit',
    color: 'inherit',
  },

  // 文字样式
  text: {
    fontSize: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit',
    userSelect: 'none',
  },
};