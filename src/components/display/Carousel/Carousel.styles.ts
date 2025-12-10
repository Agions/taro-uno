import type { CSSProperties } from 'react';

export const carouselStyles: Record<string, CSSProperties> = {
  base: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '200px',
  },

  vertical: {
    height: '300px',
  },

  // 容器
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  // 轮播项包装器
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',
  },

  wrapperVertical: {
    flexDirection: 'column',
  },

  wrapperNoTransition: {
    transition: 'none',
  },

  // 轮播项
  slide: {
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  slideMultiple: {
    width: 'calc(100% / var(--slides-to-show))',
  },

  slideVertical: {
    width: '100%',
    height: 'calc(100% / var(--slides-to-show))',
  },

  // 淡入淡出效果
  slideFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },

  slideFadeActive: {
    opacity: 1,
  },

  // 指示器
  dots: {
    position: 'absolute',
    display: 'flex',
    gap: '8px',
    padding: '8px',
    zIndex: 1,
  },

  dotsBottom: {
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  dotsTop: {
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  dotsLeft: {
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    flexDirection: 'column',
  },

  dotsRight: {
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    flexDirection: 'column',
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },

  dotActive: {
    backgroundColor: '#ffffff',
    transform: 'scale(1.2)',
  },

  dotHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  // 箭头
  arrows: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },

  arrowPrev: {
    left: '12px',
  },

  arrowNext: {
    right: '12px',
  },

  arrowButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  },

  arrowButtonHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transform: 'translateY(-50%) scale(1.1)',
  },

  arrowButtonDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },

  // 垂直模式箭头
  arrowVertical: {
    left: '50%',
    transform: 'translateX(-50%)',
  },

  arrowVerticalPrev: {
    top: '12px',
  },

  arrowVerticalNext: {
    bottom: '12px',
  },

  arrowVerticalButtonHover: {
    transform: 'translateX(-50%) scale(1.1)',
  },

  // 加载状态
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    color: '#8c8c8c',
  },

  loadingIcon: {
    width: '20px',
    height: '20px',
    border: '2px solid #f0f0f0',
    borderTop: '2px solid #1890ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px',
  },
};
