# Video 组件

Video 组件是一个功能丰富的视频播放组件，支持视频播放、暂停、进度控制、音量调节、全屏播放、倍速播放、画中画等功能。

## 基本使用

### 基础视频

```tsx
<Video src="https://example.com/video.mp4" />
```

### 带封面的视频

```tsx
<Video 
  src="https://example.com/video.mp4" 
  poster="https://example.com/poster.jpg" 
/>
```

### 自动播放

```tsx
<Video 
  src="https://example.com/video.mp4" 
  autoPlay 
  muted 
/>
```

### 循环播放

```tsx
<Video 
  src="https://example.com/video.mp4" 
  loop={LoopMode.ONE} 
/>
```

### 带控制栏配置的视频

```tsx
<Video 
  src="https://example.com/video.mp4" 
  controls={{
    showPlayButton: true,
    showProgressBar: true,
    showTime: true,
    showVolume: true,
    showFullscreen: true,
    showPlaybackRate: true,
    showPictureInPicture: true,
  }} 
/>
```

### 带章节的视频

```tsx
<Video 
  src="https://example.com/video.mp4" 
  chapters={[
    {
      id: '1',
      title: '第一章',
      startTime: 0,
      endTime: 60,
    },
    {
      id: '2',
      title: '第二章',
      startTime: 60,
      endTime: 120,
    },
    {
      id: '3',
      title: '第三章',
      startTime: 120,
      endTime: 180,
    },
  ]} 
/>
```

### 带水印的视频

```tsx
<Video 
  src="https://example.com/video.mp4" 
  watermark={{
    content: 'Taro-Uno Video',
    position: 'bottom-right',
    opacity: 0.5,
    fontSize: 12,
    rotate: -15,
  }} 
/>
```

### 多视频源

```tsx
<Video 
  src={[
    { src: 'https://example.com/video.mp4', type: 'video/mp4' },
    { src: 'https://example.com/video.webm', type: 'video/webm' },
  ]} 
/>
```

### 带广告的视频

```tsx
<Video 
  src="https://example.com/video.mp4" 
  ads={[
    {
      id: 'ad1',
      src: 'https://example.com/ad1.mp4',
      duration: 5,
      skipAfter: 3,
      title: '广告标题',
      description: '广告描述',
      poster: 'https://example.com/ad1-poster.jpg',
      link: 'https://example.com/ad1-link',
    },
  ]} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| src | `string \| VideoSource \| VideoSource[]` | - | 视频源，可以是单个URL或VideoSource数组 |
| size | `VideoSize` | `VideoSize.MD` | 视频尺寸，可选值：`SM`、`MD`、`LG`、`XL`、`FULL` |
| variant | `VideoVariant` | `VideoVariant.DEFAULT` | 视频变体，可选值：`DEFAULT`、`ROUNDED`、`BORDERED`、`SHADOW` |
| poster | `string` | - | 视频封面URL |
| autoPlay | `boolean` | `false` | 是否自动播放 |
| muted | `boolean` | `false` | 是否静音 |
| volume | `number` | `0.8` | 音量（0-1） |
| initialTime | `number` | `0` | 初始播放时间（秒） |
| playbackRate | `PlaybackRate` | `PlaybackRate.NORMAL` | 播放速率，可选值：`SLOWEST`(0.5)、`SLOW`(0.75)、`NORMAL`(1.0)、`FAST`(1.25)、`FASTER`(1.5)、`FASTEST`(2.0) |
| loop | `LoopMode` | `LoopMode.OFF` | 循环模式，可选值：`OFF`、`ALL`、`ONE` |
| preload | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | 预加载方式 |
| type | `string` | - | 视频类型 |
| title | `string` | - | 视频标题 |
| description | `string` | - | 视频描述 |
| controls | `boolean \| VideoControlsConfig` | `true` | 控制栏配置，布尔值或控制栏配置对象 |
| showCenterPlayButton | `boolean` | `true` | 是否显示中心播放按钮 |
| allowFullscreen | `boolean` | `true` | 是否允许全屏播放 |
| allowPictureInPicture | `boolean` | `true` | 是否允许画中画播放 |
| allowDownload | `boolean` | `true` | 是否允许下载视频 |
| allowScreenshot | `boolean` | `true` | 是否允许截图 |
| chapters | `VideoChapter[]` | - | 视频章节列表 |
| watermark | `WatermarkConfig` | - | 水印配置 |
| ads | `AdConfig[]` | - | 广告配置列表 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| videoClassName | `string` | - | 自定义视频元素类名 |
| videoStyle | `React.CSSProperties` | - | 自定义视频元素样式 |
| controlsClassName | `string` | - | 自定义控制栏类名 |
| renderLoading | `() => ReactNode` | - | 自定义加载组件 |
| renderError | `(error: VideoError) => ReactNode` | - | 自定义错误组件 |
| renderEnded | `() => ReactNode` | - | 自定义结束组件 |
| renderPoster | `() => ReactNode` | - | 自定义封面组件 |
| renderChapter | `(chapter: VideoChapter, active: boolean) => ReactNode` | - | 自定义章节组件 |

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onPlay | 视频播放时触发 | `state: VideoState` |
| onPause | 视频暂停时触发 | `state: VideoState` |
| onEnded | 视频播放结束时触发 | `state: VideoState` |
| onTimeUpdate | 视频时间更新时触发 | `state: VideoState` |
| onBuffering | 视频缓冲时触发 | `state: VideoState` |
| onBuffered | 视频缓冲结束时触发 | `state: VideoState` |
| onVolumeChange | 音量变化时触发 | `state: VideoState` |
| onPlaybackRateChange | 播放速率变化时触发 | `state: VideoState` |
| onFullscreenChange | 全屏状态变化时触发 | `isFullscreen: boolean, state: VideoState` |
| onPictureInPictureChange | 画中画状态变化时触发 | `isPictureInPicture: boolean, state: VideoState` |
| onLoadStart | 视频加载开始时触发 | `state: VideoState` |
| onLoaded | 视频加载完成时触发 | `state: VideoState` |
| onError | 视频播放错误时触发 | `error: VideoError, state: VideoState` |
| onChapterChange | 章节变化时触发 | `chapter: VideoChapter, state: VideoState` |
| onAdStart | 广告开始时触发 | `ad: AdConfig, state: VideoState` |
| onAdEnd | 广告结束时触发 | `ad: AdConfig, state: VideoState` |
| onAdSkip | 广告跳过时触发 | `ad: AdConfig, state: VideoState` |
| onClick | 视频点击时触发 | `state: VideoState` |
| onDoubleClick | 视频双击时触发 | `state: VideoState` |
| onControlsShow | 控制栏显示时触发 | `state: VideoState` |
| onControlsHide | 控制栏隐藏时触发 | `state: VideoState` |

## 类型定义

### VideoSource

```tsx
interface VideoSource {
  src: string;         // 视频URL
  type?: string;       // 视频类型
  title?: string;      // 视频标题
  description?: string;// 视频描述
  poster?: string;     // 视频封面
}
```

### VideoChapter

```tsx
interface VideoChapter {
  id: string;          // 章节ID
  title: string;       // 章节标题
  startTime: number;   // 章节开始时间（秒）
  endTime: number;     // 章节结束时间（秒）
  description?: string;// 章节描述
  icon?: ReactNode;    // 章节图标
}
```

### VideoControlsConfig

```tsx
interface VideoControlsConfig {
  show?: boolean;               // 是否显示控制栏
  position?: ControlsPosition;  // 控制栏位置
  height?: number;              // 控制栏高度
  opacity?: number;             // 控制栏透明度
  hideDelay?: number;           // 控制栏显示延迟（毫秒）
  style?: React.CSSProperties;  // 自定义控制栏样式
  render?: (props: VideoProps, state: VideoState) => ReactNode; // 自定义控制栏内容
  showPlayButton?: boolean;     // 是否显示播放按钮
  showProgressBar?: boolean;    // 是否显示进度条
  showTime?: boolean;           // 是否显示时间
  showVolume?: boolean;         // 是否显示音量控制
  showFullscreen?: boolean;     // 是否显示全屏按钮
  showPlaybackRate?: boolean;   // 是否显示播放速率按钮
  showPictureInPicture?: boolean; // 是否显示画中画按钮
  showSettings?: boolean;       // 是否显示设置按钮
  showChapters?: boolean;       // 是否显示章节标记
}
```

### WatermarkConfig

```tsx
interface WatermarkConfig {
  content: string;                     // 水印内容
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'; // 水印位置
  style?: React.CSSProperties;         // 水印样式
  opacity?: number;                    // 水印透明度
  fontSize?: number;                   // 水印字体大小
  rotate?: number;                     // 水印旋转角度
}
```

### AdConfig

```tsx
interface AdConfig {
  id: string;               // 广告ID
  src: string;              // 广告视频URL
  duration: number;         // 广告时长（秒）
  skipAfter?: number;       // 可跳过时间（秒）
  title?: string;           // 广告标题
  description?: string;     // 广告描述
  poster?: string;          // 广告封面
  link?: string;            // 广告链接
  onClick?: (ad: AdConfig) => void; // 广告点击事件
}
```

### VideoState

```tsx
interface VideoState {
  status: VideoStatus;             // 播放状态
  mode: PlayMode;                  // 播放模式
  currentTime: number;             // 当前时间（秒）
  duration: number;                // 总时长（秒）
  buffered: number;                // 缓冲进度
  volume: number;                  // 音量（0-1）
  muted: boolean;                  // 是否静音
  playbackRate: PlaybackRate;      // 播放速率
  isFullscreen: boolean;           // 是否全屏
  isPictureInPicture: boolean;     // 是否画中画
  videoWidth: number;              // 视频宽度
  videoHeight: number;             // 视频高度
  loaded: number;                  // 加载进度
  error?: VideoError;              // 错误信息
  currentSource?: VideoSource;     // 当前播放的源
  currentChapter?: VideoChapter;   // 当前章节
  isDragging: boolean;             // 是否正在拖动进度条
  isControlsVisible: boolean;      // 是否显示控制栏
  isOptionsMenuVisible: boolean;   // 是否显示选项菜单
}
```

### VideoError

```tsx
interface VideoError {
  code: VideoErrorCode;         // 错误代码
  message: string;              // 错误信息
  originalError?: unknown;      // 原始错误对象
}
```

## 示例代码

### 完整示例

```tsx
import { Video, LoopMode, PlaybackRate } from 'taro-uno-ui';

const VideoExample = () => {
  return (
    <View style={{ padding: '20px' }}>
      <View>基础视频</View>
      <Video 
        src="https://example.com/video.mp4" 
        poster="https://example.com/poster.jpg" 
        style={{ marginBottom: '20px' }}
      />
      
      <View>自动播放</View>
      <Video 
        src="https://example.com/video.mp4" 
        autoPlay 
        muted 
        style={{ marginBottom: '20px' }}
      />
      
      <View>循环播放</View>
      <Video 
        src="https://example.com/video.mp4" 
        loop={LoopMode.ONE} 
        style={{ marginBottom: '20px' }}
      />
      
      <View>带水印的视频</View>
      <Video 
        src="https://example.com/video.mp4" 
        watermark={{
          content: 'Taro-Uno Video',
          position: 'bottom-right',
          opacity: 0.5,
          fontSize: 12,
          rotate: -15,
        }} 
        style={{ marginBottom: '20px' }}
      />
      
      <View>自定义控制栏</View>
      <Video 
        src="https://example.com/video.mp4" 
        controls={{
          showPlayButton: true,
          showProgressBar: true,
          showTime: true,
          showVolume: true,
          showFullscreen: true,
          showPlaybackRate: true,
          showPictureInPicture: true,
          showSettings: true,
          showChapters: true,
        }} 
        style={{ marginBottom: '20px' }}
      />
      
      <View>带章节的视频</View>
      <Video 
        src="https://example.com/video.mp4" 
        chapters={[
          {
            id: '1',
            title: '第一章',
            startTime: 0,
            endTime: 60,
          },
          {
            id: '2',
            title: '第二章',
            startTime: 60,
            endTime: 120,
          },
          {
            id: '3',
            title: '第三章',
            startTime: 120,
            endTime: 180,
          },
        ]} 
      />
    </View>
  );
};

export default VideoExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分样式和功能可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分样式和功能可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分样式和功能可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分样式和功能可能存在差异 |

## 注意事项

1. **自动播放**：在某些浏览器和平台上，自动播放可能需要用户授权或静音。
2. **全屏播放**：不同平台的全屏实现可能存在差异，建议测试各个平台的兼容情况。
3. **画中画**：画中画功能在某些平台上可能不被支持，建议提供降级方案。
4. **视频格式**：不同浏览器和平台支持的视频格式可能不同，建议提供多种格式的视频源。
5. **性能优化**：对于大型视频，建议使用合适的码率和分辨率，以提高播放性能。
6. **无障碍访问**：为视频添加适当的无障碍标签和描述，提高可访问性。
7. **安全性**：确保视频源的安全性，避免加载恶意视频文件。

## 相关组件

- [Space 组件](#/components/layout/space) - 用于视频周围的间距控制
- [Divider 组件](#/components/basic/divider) - 用于分隔视频列表
- [Text 组件](#/components/basic/text) - 用于视频标题和描述