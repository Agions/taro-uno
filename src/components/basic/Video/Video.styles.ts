/**
 * Taro-Uno Video Component Styles
 * 视频组件样式定义
 */

import type { CSSProperties } from 'react';
import { createNamespace } from '../../../utils/createNamespace';
import { useTheme } from '../../../hooks/ui/useTheme';
import type { VideoSize, VideoVariant, VideoStatus, VideoControlsConfig } from './Video.types';

const { bem } = createNamespace('video');

/** 基础样式 */
export const baseStyle: CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
  backgroundColor: '#000',
  borderRadius: 0,
  boxSizing: 'border-box',
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

/** 尺寸样式 */
export const sizeStyles: Record<VideoSize, CSSProperties> = {
  sm: {
    width: 320,
    height: 180,
  },
  md: {
    width: 640,
    height: 360,
  },
  lg: {
    width: 800,
    height: 450,
  },
  xl: {
    width: 1024,
    height: 576,
  },
  full: {
    width: '100%',
    height: '100%',
  },
};

/** 变体样式 */
export const variantStyles: Record<VideoVariant, CSSProperties> = {
  default: {
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none',
  },
  rounded: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  bordered: {
    border: '1px solid #d9d9d9',
    borderRadius: 4,
  },
  shadow: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
  },
};

/** 状态样式 */
export const statusStyles: Record<VideoStatus, CSSProperties> = {
  idle: {
    opacity: 1,
  },
  playing: {
    opacity: 1,
  },
  paused: {
    opacity: 1,
  },
  ended: {
    opacity: 0.8,
  },
  error: {
    opacity: 0.8,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    opacity: 1,
  },
};

/** 视频元素样式 */
export const videoStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: '#000',
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
};

/** 视频封面样式 */
export const posterStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.3s ease',
  zIndex: 1,
};

/** 视频控制栏基础样式 */
export const controlsBaseStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  transition: 'all 0.3s ease',
  zIndex: 10,
  boxSizing: 'border-box',
};

/** 控制栏位置样式 */
export const controlsPositionStyles: Record<'top' | 'bottom' | 'both', CSSProperties> = {
  top: {
    top: 0,
    bottom: 'auto',
  },
  bottom: {
    bottom: 0,
    top: 'auto',
  },
  both: {
    // Both positions are handled by having two control bars
  },
};

/** 控制栏样式 */
export const controlsStyle = (config: VideoControlsConfig): CSSProperties => {
  return {
    ...controlsBaseStyle,
    ...(config.height && { height: config.height }),
    ...(config.opacity !== undefined && { opacity: config.opacity }),
    ...(config.style || {}),
  };
};

/** 控制栏上半部分样式 */
export const controlsTopStyle: CSSProperties = {
  ...controlsBaseStyle,
  top: 0,
  justifyContent: 'flex-end',
  height: 32,
  padding: '0 8px',
};

/** 控制栏下半部分样式 */
export const controlsBottomStyle: CSSProperties = {
  ...controlsBaseStyle,
  bottom: 0,
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: 'auto',
  padding: '8px 16px',
  gap: 8,
};

/** 控制栏进度条样式 */
export const progressContainerStyle: CSSProperties = {
  position: 'relative',
  flex: 1,
  height: 4,
  margin: '0 8px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: 2,
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'height 0.2s ease',
};

/** 控制栏进度条悬停样式 */
export const progressContainerHoverStyle: CSSProperties = {
  height: 8,
};

/** 控制栏缓冲进度样式 */
export const bufferedStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  transition: 'width 0.3s ease',
};

/** 控制栏播放进度样式 */
export const progressStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  backgroundColor: '#1677ff',
  transition: 'width 0.1s ease',
};

/** 控制栏进度条滑块样式 */
export const progressHandleStyle: CSSProperties = {
  position: 'absolute',
  top: 50,
  right: -6,
  width: 12,
  height: 12,
  backgroundColor: '#fff',
  border: '2px solid #1677ff',
  borderRadius: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 1,
};

/** 控制栏进度条滑块悬停样式 */
export const progressHandleHoverStyle: CSSProperties = {
  transform: 'translateY(-50%) scale(1.2)',
  boxShadow: '0 0 8px rgba(22, 119, 255, 0.6)',
};

/** 控制栏按钮样式 */
export const buttonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  padding: 0,
  margin: 0,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '50%',
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: 16,
};

/** 控制栏按钮悬停样式 */
export const buttonHoverStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  transform: 'scale(1.1)',
};

/** 控制栏按钮激活样式 */
export const buttonActiveStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  transform: 'scale(0.95)',
};

/** 播放按钮样式 */
export const playButtonStyle: CSSProperties = {
  ...buttonStyle,
  width: 48,
  height: 48,
  fontSize: 24,
};

/** 中心播放按钮样式 */
export const centerPlayButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 80,
  height: 80,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  border: '2px solid #fff',
  borderRadius: '50%',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 32,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  zIndex: 5,
};

/** 中心播放按钮悬停样式 */
export const centerPlayButtonHoverStyle: CSSProperties = {
  backgroundColor: 'rgba(22, 119, 255, 0.8)',
  transform: 'translate(-50%, -50%) scale(1.1)',
  boxShadow: '0 0 20px rgba(22, 119, 255, 0.6)',
};

/** 控制栏左侧样式 */
export const controlsLeftStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

/** 控制栏右侧样式 */
export const controlsRightStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

/** 控制栏中间样式 */
export const controlsMiddleStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  gap: 12,
};

/** 时间显示样式 */
export const timeStyle: CSSProperties = {
  fontSize: 12,
  color: '#fff',
  minWidth: 80,
  textAlign: 'center',
  userSelect: 'none',
};

/** 音量控制样式 */
export const volumeStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 100,
};

/** 音量滑块样式 */
export const volumeSliderStyle: CSSProperties = {
  width: 60,
  height: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: 2,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
};

/** 音量滑块进度样式 */
export const volumeProgressStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  backgroundColor: '#1677ff',
  transition: 'width 0.1s ease',
};

/** 音量滑块手柄样式 */
export const volumeHandleStyle: CSSProperties = {
  position: 'absolute',
  top: 50,
  right: -4,
  width: 8,
  height: 8,
  backgroundColor: '#fff',
  borderRadius: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

/** 标题样式 */
export const titleStyle: CSSProperties = {
  position: 'absolute',
  top: 16,
  left: 16,
  right: 80,
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
  zIndex: 5,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

/** 描述样式 */
export const descriptionStyle: CSSProperties = {
  position: 'absolute',
  top: 40,
  left: 16,
  right: 16,
  color: '#fff',
  fontSize: 12,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
  zIndex: 5,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
};

/** 水印样式 */
export const watermarkStyle: CSSProperties = {
  position: 'absolute',
  padding: '8px 16px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  fontSize: 12,
  borderRadius: 4,
  zIndex: 100,
  userSelect: 'none',
  pointerEvents: 'none',
};

/** 水印位置样式 */
export const watermarkPositionStyles: Record<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center', CSSProperties> = {
  'top-left': {
    top: 16,
    left: 16,
  },
  'top-right': {
    top: 16,
    right: 16,
  },
  'bottom-left': {
    bottom: 16,
    left: 16,
  },
  'bottom-right': {
    bottom: 16,
    right: 16,
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

/** 加载样式 */
export const loadingStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontSize: 24,
  zIndex: 15,
};

/** 错误样式 */
export const errorStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  textAlign: 'center',
  zIndex: 15,
  padding: '16px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderRadius: 8,
  maxWidth: '80%',
};

/** 错误标题样式 */
export const errorTitleStyle: CSSProperties = {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
  color: '#ff4d4f',
};

/** 错误消息样式 */
export const errorMessageStyle: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  color: '#ccc',
};

/** 结束样式 */
export const endedStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  zIndex: 15,
  gap: 16,
};

/** 结束标题样式 */
export const endedTitleStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 'bold',
};

/** 结束消息样式 */
export const endedMessageStyle: CSSProperties = {
  fontSize: 14,
  color: '#ccc',
};

/** 选项菜单样式 */
export const optionsMenuStyle: CSSProperties = {
  position: 'absolute',
  bottom: 60,
  right: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  color: '#fff',
  borderRadius: 8,
  padding: 8,
  minWidth: 160,
  zIndex: 20,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
};

/** 选项项样式 */
export const optionsItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: 4,
  transition: 'all 0.2s ease',
  fontSize: 14,
};

/** 选项项悬停样式 */
export const optionsItemHoverStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
};

/** 选项项选中样式 */
export const optionsItemSelectedStyle: CSSProperties = {
  backgroundColor: 'rgba(22, 119, 255, 0.4)',
  color: '#1677ff',
  fontWeight: 'bold',
};

/** 章节标记样式 */
export const chapterMarkerStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: 8,
  transform: 'translateY(-50%)',
  width: 4,
  height: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 6,
};

/** 章节标记悬停样式 */
export const chapterMarkerHoverStyle: CSSProperties = {
  backgroundColor: '#1677ff',
  transform: 'translateY(-50%) scale(1.5)',
  boxShadow: '0 0 8px rgba(22, 119, 255, 0.6)',
};

/** 章节标记激活样式 */
export const chapterMarkerActiveStyle: CSSProperties = {
  backgroundColor: '#ff4d4f',
  transform: 'translateY(-50%) scale(1.2)',
};

/** 章节弹出样式 */
export const chapterPopupStyle: CSSProperties = {
  position: 'absolute',
  right: 24,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: 4,
  fontSize: 12,
  whiteSpace: 'nowrap',
  zIndex: 20,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
  pointerEvents: 'none',
};

/** 广告样式 */
export const adStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
  color: '#fff',
  zIndex: 20,
  gap: 16,
};

/** 广告关闭按钮样式 */
export const adCloseButtonStyle: CSSProperties = {
  ...buttonStyle,
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  width: 24,
  height: 24,
  fontSize: 16,
};

/** 广告倒计时样式 */
export const adCountdownStyle: CSSProperties = {
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '4px 8px',
  borderRadius: 4,
  fontSize: 12,
  color: '#fff',
};

/** 广告跳过按钮样式 */
export const adSkipButtonStyle: CSSProperties = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  backgroundColor: 'rgba(22, 119, 255, 0.8)',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: 14,
  transition: 'all 0.2s ease',
};

/** 广告跳过按钮悬停样式 */
export const adSkipButtonHoverStyle: CSSProperties = {
  backgroundColor: 'rgba(22, 119, 255, 1)',
  transform: 'scale(1.05)',
};

/** 获取视频组件样式 */
export const getVideoStyle = (size?: VideoSize, variant?: VideoVariant, status?: VideoStatus): CSSProperties => {
  return {
    ...baseStyle,
    ...(size && sizeStyles[size]),
    ...(variant && variantStyles[variant]),
    ...(status && statusStyles[status]),
  };
};

/** 视频容器样式 */
export const videoContainerStyle = (size?: VideoSize, variant?: VideoVariant): CSSProperties => {
  return {
    ...getVideoStyle(size, variant),
    ...(variant === 'rounded' && { borderRadius: 8 }),
    ...(variant === 'bordered' && { border: '1px solid #d9d9d9' }),
    ...(variant === 'shadow' && { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }),
  };
};

/** 视频组件样式钩子 */
export const useVideoStyle = (size?: VideoSize, variant?: VideoVariant) => {
  useTheme();
  return {
    container: videoContainerStyle(size, variant),
    video: videoStyle,
    poster: posterStyle,
    title: {
      position: 'absolute' as const,
      top: 10,
      left: 10,
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold' as const,
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
      zIndex: 5,
      overflow: 'hidden' as const,
      display: '-webkit-box' as const,
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical' as const,
    },
    description: {
      position: 'absolute' as const,
      top: 35,
      left: 10,
      color: '#fff',
      fontSize: 12,
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
      zIndex: 5,
      overflow: 'hidden' as const,
      display: '-webkit-box' as const,
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as const,
    },
    controls: controlsStyle,
    controlsTop: controlsTopStyle,
    controlsBottom: controlsBottomStyle,
    progressContainer: progressContainerStyle,
    progress: progressStyle,
    buffered: bufferedStyle,
    progressHandle: progressHandleStyle,
    button: buttonStyle,
    playButton: playButtonStyle,
    centerPlayButton: centerPlayButtonStyle,
    controlsLeft: controlsLeftStyle,
    controlsRight: controlsRightStyle,
    controlsMiddle: controlsMiddleStyle,
    time: timeStyle,
    volume: volumeStyle,
    volumeSlider: volumeSliderStyle,
    volumeProgress: volumeProgressStyle,
    volumeHandle: volumeHandleStyle,
    watermark: watermarkStyle,
    loading: loadingStyle,
    error: errorStyle,
    ended: endedStyle,
    optionsMenu: optionsMenuStyle,
    optionsItem: optionsItemStyle,
    optionsItemSelected: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    chapterMarker: chapterMarkerStyle,
    chapterMarkerActive: {
      backgroundColor: '#1677ff',
      width: 4,
    },
    ad: adStyle,
    adCountdown: {
      position: 'absolute' as const,
      top: 10,
      left: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: 4,
      fontSize: 12,
      zIndex: 10,
    },
    adSkipButton: {
      position: 'absolute' as const,
      bottom: 10,
      right: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: 4,
      fontSize: 12,
      zIndex: 10,
      cursor: 'pointer' as const,
      border: 'none' as const,
    },
  };
};

export { bem };
