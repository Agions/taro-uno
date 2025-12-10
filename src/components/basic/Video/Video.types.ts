/**
 * Taro-Uno Video Component Types
 * 视频组件类型定义
 */

import type { ReactNode } from 'react';

/**
 * 视频尺寸
 */
export enum VideoSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  FULL = 'full',
}

/**
 * 视频变体
 */
export enum VideoVariant {
  DEFAULT = 'default',
  ROUNDED = 'rounded',
  BORDERED = 'bordered',
  SHADOW = 'shadow',
}

/**
 * 视频状态
 */
export enum VideoStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  ENDED = 'ended',
  ERROR = 'error',
  LOADING = 'loading',
}

/**
 * 播放模式
 */
export enum PlayMode {
  INLINE = 'inline',
  FULLSCREEN = 'fullscreen',
  PICTURE_IN_PICTURE = 'picture-in-picture',
}

/**
 * 循环模式
 */
export enum LoopMode {
  OFF = 'off',
  ALL = 'all',
  ONE = 'one',
}

/**
 * 播放速率
 */
export enum PlaybackRate {
  SLOWEST = 0.5,
  SLOW = 0.75,
  NORMAL = 1.0,
  FAST = 1.25,
  FASTER = 1.5,
  FASTEST = 2.0,
}

/**
 * 控制栏位置
 */
export enum ControlsPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  BOTH = 'both',
}

/**
 * 音量类型
 */
export enum VolumeType {
  MUTE = 'mute',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  MAX = 'max',
}

/**
 * 错误代码
 */
export enum VideoErrorCode {
  NETWORK_ERROR = 'network_error',
  DECODE_ERROR = 'decode_error',
  NOT_SUPPORTED = 'not_supported',
  PERMISSION_DENIED = 'permission_denied',
  UNKNOWN = 'unknown',
}

/**
 * 视频源
 */
export interface VideoSource {
  /** 视频URL */
  src: string;
  /** 视频类型 */
  type?: string;
  /** 视频标题 */
  title?: string;
  /** 视频描述 */
  description?: string;
  /** 视频封面 */
  poster?: string;
}

/**
 * 视频章节
 */
export interface VideoChapter {
  /** 章节ID */
  id: string;
  /** 章节标题 */
  title: string;
  /** 章节开始时间（秒） */
  startTime: number;
  /** 章节结束时间（秒） */
  endTime: number;
  /** 章节描述 */
  description?: string;
  /** 章节图标 */
  icon?: ReactNode;
}

/**
 * 水印配置
 */
export interface WatermarkConfig {
  /** 水印内容 */
  content: string;
  /** 水印位置 */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  /** 水印样式 */
  style?: React.CSSProperties;
  /** 水印透明度 */
  opacity?: number;
  /** 水印字体大小 */
  fontSize?: number;
  /** 水印旋转角度 */
  rotate?: number;
}

/**
 * 广告配置
 */
export interface AdConfig {
  /** 广告ID */
  id: string;
  /** 广告视频URL */
  src: string;
  /** 广告时长（秒） */
  duration: number;
  /** 广告标题 */
  title?: string;
  /** 广告描述 */
  description?: string;
  /** 广告封面 */
  poster?: string;
  /** 可跳过时间（秒） */
  skipAfter?: number;
  /** 广告链接 */
  link?: string;
  /** 广告点击事件 */
  onClick?: (ad: AdConfig) => void;
}

/**
 * 视频控制配置
 */
export interface VideoControlsConfig {
  /** 是否显示控制栏 */
  show?: boolean;
  /** 控制栏位置 */
  position?: ControlsPosition;
  /** 控制栏高度 */
  height?: number;
  /** 控制栏透明度 */
  opacity?: number;
  /** 控制栏显示延迟（毫秒） */
  hideDelay?: number;
  /** 自定义控制栏样式 */
  style?: React.CSSProperties;
  /** 自定义控制栏内容 */
  render?: (props: VideoProps, state: VideoState) => ReactNode;
  /** 是否显示播放按钮 */
  showPlayButton?: boolean;
  /** 是否显示进度条 */
  showProgressBar?: boolean;
  /** 是否显示时间 */
  showTime?: boolean;
  /** 是否显示音量控制 */
  showVolume?: boolean;
  /** 是否显示全屏按钮 */
  showFullscreen?: boolean;
  /** 是否显示播放速率按钮 */
  showPlaybackRate?: boolean;
  /** 是否显示画中画按钮 */
  showPictureInPicture?: boolean;
  /** 是否显示设置按钮 */
  showSettings?: boolean;
  /** 是否显示章节标记 */
  showChapters?: boolean;
}

/**
 * 视频状态
 */
export interface VideoState {
  /** 播放状态 */
  status: VideoStatus;
  /** 播放模式 */
  mode: PlayMode;
  /** 当前时间（秒） */
  currentTime: number;
  /** 总时长（秒） */
  duration: number;
  /** 缓冲进度 */
  buffered: number;
  /** 音量（0-1） */
  volume: number;
  /** 是否静音 */
  muted: boolean;
  /** 播放速率 */
  playbackRate: PlaybackRate;
  /** 是否全屏 */
  isFullscreen: boolean;
  /** 是否画中画 */
  isPictureInPicture: boolean;
  /** 视频尺寸 */
  videoWidth: number;
  /** 视频高度 */
  videoHeight: number;
  /** 加载进度 */
  loaded: number;
  /** 错误信息 */
  error?: VideoError;
  /** 当前播放的源 */
  currentSource?: VideoSource;
  /** 当前章节 */
  currentChapter?: VideoChapter;
  /** 是否正在拖动进度条 */
  isDragging: boolean;
  /** 是否显示控制栏 */
  isControlsVisible: boolean;
  /** 是否显示选项菜单 */
  isOptionsMenuVisible: boolean;
}

/**
 * 视频错误信息
 */
export interface VideoError {
  /** 错误代码 */
  code: VideoErrorCode;
  /** 错误信息 */
  message: string;
  /** 原始错误对象 */
  originalError?: unknown;
}

/**
 * 视频事件
 */
export interface VideoEvents {
  /** 播放事件 */
  onPlay?: (state: VideoState) => void;
  /** 暂停事件 */
  onPause?: (state: VideoState) => void;
  /** 播放结束事件 */
  onEnded?: (state: VideoState) => void;
  /** 时间更新事件 */
  onTimeUpdate?: (state: VideoState) => void;
  /** 缓冲事件 */
  onBuffering?: (state: VideoState) => void;
  /** 缓冲结束事件 */
  onBuffered?: (state: VideoState) => void;
  /** 音量变化事件 */
  onVolumeChange?: (state: VideoState) => void;
  /** 播放速率变化事件 */
  onPlaybackRateChange?: (state: VideoState) => void;
  /** 全屏变化事件 */
  onFullscreenChange?: (isFullscreen: boolean, state: VideoState) => void;
  /** 画中画变化事件 */
  onPictureInPictureChange?: (isPictureInPicture: boolean, state: VideoState) => void;
  /** 加载开始事件 */
  onLoadStart?: (state: VideoState) => void;
  /** 加载完成事件 */
  onLoaded?: (state: VideoState) => void;
  /** 错误事件 */
  onError?: (error: VideoError, state: VideoState) => void;
  /** 章节变化事件 */
  onChapterChange?: (chapter: VideoChapter, state: VideoState) => void;
  /** 广告开始事件 */
  onAdStart?: (ad: AdConfig, state: VideoState) => void;
  /** 广告结束事件 */
  onAdEnd?: (ad: AdConfig, state: VideoState) => void;
  /** 广告跳过事件 */
  onAdSkip?: (ad: AdConfig, state: VideoState) => void;
  /** 点击事件 */
  onClick?: (state: VideoState) => void;
  /** 双击事件 */
  onDoubleClick?: (state: VideoState) => void;
  /** 控制栏显示事件 */
  onControlsShow?: (state: VideoState) => void;
  /** 控制栏隐藏事件 */
  onControlsHide?: (state: VideoState) => void;
}

/**
 * 视频组件属性
 */
export interface VideoProps extends VideoEvents {
  /** 视频源，可以是单个URL或VideoSource数组 */
  src: string | VideoSource | VideoSource[];
  /** 视频尺寸 */
  size?: VideoSize;
  /** 视频变体 */
  variant?: VideoVariant;
  /** 视频封面 */
  poster?: string;
  /** 是否自动播放 */
  autoPlay?: boolean;
  /** 是否静音 */
  muted?: boolean;
  /** 音量（0-1） */
  volume?: number;
  /** 初始播放时间（秒） */
  initialTime?: number;
  /** 播放速率 */
  playbackRate?: PlaybackRate;
  /** 循环模式 */
  loop?: LoopMode;
  /** 预加载 */
  preload?: 'none' | 'metadata' | 'auto';
  /** 视频类型 */
  type?: string;
  /** 视频标题 */
  title?: string;
  /** 视频描述 */
  description?: string;
  /** 控制栏配置 */
  controls?: boolean | VideoControlsConfig;
  /** 是否显示中心播放按钮 */
  showCenterPlayButton?: boolean;
  /** 是否允许全屏 */
  allowFullscreen?: boolean;
  /** 是否允许画中画 */
  allowPictureInPicture?: boolean;
  /** 是否允许下载 */
  allowDownload?: boolean;
  /** 是否允许截图 */
  allowScreenshot?: boolean;
  /** 视频章节 */
  chapters?: VideoChapter[];
  /** 水印配置 */
  watermark?: WatermarkConfig;
  /** 广告配置 */
  ads?: AdConfig[];
  /** 自定义视频样式 */
  videoStyle?: React.CSSProperties;
  /** 自定义容器样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义视频类名 */
  videoClassName?: string;
  /** 自定义控制栏类名 */
  controlsClassName?: string;
  /** 自定义加载组件 */
  renderLoading?: () => ReactNode;
  /** 自定义错误组件 */
  renderError?: (error: VideoError) => ReactNode;
  /** 自定义结束组件 */
  renderEnded?: () => ReactNode;
  /** 自定义封面组件 */
  renderPoster?: () => ReactNode;
  /** 自定义章节组件 */
  renderChapter?: (chapter: VideoChapter, active: boolean) => ReactNode;
}

/**
 * 视频方法
 */
export interface VideoMethods {
  /** 播放视频 */
  play: () => Promise<void>;
  /** 暂停视频 */
  pause: () => void;
  /** 停止视频 */
  stop: () => void;
  /** 跳转指定时间 */
  seek: (time: number) => void;
  /** 进入全屏 */
  enterFullscreen: () => Promise<void>;
  /** 退出全屏 */
  exitFullscreen: () => Promise<void>;
  /** 切换全屏 */
  toggleFullscreen: () => Promise<void>;
  /** 进入画中画 */
  enterPictureInPicture: () => Promise<void>;
  /** 退出画中画 */
  exitPictureInPicture: () => Promise<void>;
  /** 切换画中画 */
  togglePictureInPicture: () => Promise<void>;
  /** 设置音量 */
  setVolume: (volume: number) => void;
  /** 切换静音 */
  toggleMute: () => void;
  /** 设置播放速率 */
  setPlaybackRate: (rate: PlaybackRate) => void;
  /** 切换播放状态 */
  togglePlay: () => void;
  /** 重新加载视频 */
  reload: () => void;
  /** 获取当前视频状态 */
  getState: () => VideoState;
  /** 设置视频源 */
  setSource: (src: string | VideoSource | VideoSource[]) => void;
  /** 获取视频截图 */
  getScreenshot: () => Promise<string | null>;
  /** 下载视频 */
  download: () => void;
  /** 显示控制栏 */
  showControls: () => void;
  /** 隐藏控制栏 */
  hideControls: () => void;
}

/**
 * 格式化时间工具
 * @param seconds 秒数
 * @returns 格式化后的时间字符串 (HH:MM:SS 或 MM:SS)
 */
export const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

/**
 * 格式化文件大小工具
 * @param bytes 字节数
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * 生成唯一ID工具
 * @returns 唯一ID字符串
 */
export const generateId = (): string => {
  return `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 获取音量类型
 * @param volume 音量值（0-1）
 * @returns 音量类型
 */
export const getVolumeType = (volume: number): VolumeType => {
  if (volume === 0) return VolumeType.MUTE;
  if (volume < 0.3) return VolumeType.LOW;
  if (volume < 0.7) return VolumeType.MEDIUM;
  if (volume < 1) return VolumeType.HIGH;
  return VolumeType.MAX;
};

/**
 * 获取播放速率文本
 * @param rate 播放速率
 * @returns 播放速率文本
 */
export const getPlaybackRateText = (rate: PlaybackRate): string => {
  return `${rate}x`;
};
