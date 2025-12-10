/**
 * Taro-Uno Video Component
 * 视频组件入口文件
 */

import Video from './Video';
import type { VideoProps, VideoMethods, VideoState, VideoSource, VideoChapter, VideoError } from './Video.types';
import {
  VideoSize,
  VideoVariant,
  VideoStatus,
  PlayMode,
  LoopMode,
  PlaybackRate,
  ControlsPosition,
  VideoErrorCode,
} from './Video.types';

// 导出组件
export default Video;

// 导出类型
export type { VideoProps, VideoMethods, VideoState, VideoSource, VideoChapter, VideoError };

// 导出枚举
export { VideoSize, VideoVariant, VideoStatus, PlayMode, LoopMode, PlaybackRate, ControlsPosition, VideoErrorCode };
