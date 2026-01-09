/**
 * 通用基础类型定义
 * 提供组件库中所有组件共享的基础类型
 * @module types/common
 */

// ==================== 尺寸类型 ====================

/**
 * 组件尺寸类型
 * @description 定义组件的标准尺寸变体
 * - `sm` - 小尺寸，适用于紧凑布局
 * - `md` - 中等尺寸，默认尺寸
 * - `lg` - 大尺寸，适用于强调展示
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * 扩展尺寸类型
 * @description 包含额外的极小和极大尺寸选项
 * - `xs` - 极小尺寸
 * - `sm` - 小尺寸
 * - `md` - 中等尺寸
 * - `lg` - 大尺寸
 * - `xl` - 极大尺寸
 */
export type ExtendedSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ==================== 状态类型 ====================

/**
 * 组件状态类型
 * @description 定义组件的语义状态，用于表达不同的业务含义
 * - `default` - 默认状态
 * - `primary` - 主要状态，用于强调主要操作
 * - `success` - 成功状态，表示操作成功或正向反馈
 * - `warning` - 警告状态，表示需要注意的信息
 * - `danger` - 危险状态，表示错误或危险操作
 */
export type Status = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * 扩展状态类型
 * @description 包含额外的次要和信息状态
 * - `default` - 默认状态
 * - `primary` - 主要状态
 * - `secondary` - 次要状态
 * - `success` - 成功状态
 * - `warning` - 警告状态
 * - `danger` - 危险状态
 * - `info` - 信息状态
 */
export type ExtendedStatus = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

// ==================== 变体类型 ====================

/**
 * 组件变体类型
 * @description 定义组件的视觉变体样式
 * - `solid` - 实心样式，填充背景色
 * - `outline` - 轮廓样式，仅显示边框
 * - `ghost` - 幽灵样式，透明背景带边框
 * - `text` - 文本样式，无背景无边框
 */
export type Variant = 'solid' | 'outline' | 'ghost' | 'text';

/**
 * 扩展变体类型
 * @description 包含额外的链接和填充变体
 * - `solid` - 实心样式
 * - `outline` - 轮廓样式
 * - `ghost` - 幽灵样式
 * - `text` - 文本样式
 * - `link` - 链接样式
 * - `filled` - 填充样式（带浅色背景）
 */
export type ExtendedVariant = 'solid' | 'outline' | 'ghost' | 'text' | 'link' | 'filled';

// ==================== 形状类型 ====================

/**
 * 组件形状类型
 * @description 定义组件的边角形状
 * - `default` - 默认形状，使用主题默认圆角
 * - `round` - 圆角形状，较大的圆角
 * - `circle` - 圆形，完全圆角（适用于正方形元素）
 */
export type Shape = 'default' | 'round' | 'circle';

/**
 * 扩展形状类型
 * @description 包含额外的方形选项
 * - `default` - 默认形状
 * - `round` - 圆角形状
 * - `circle` - 圆形
 * - `square` - 方形，无圆角
 */
export type ExtendedShape = 'default' | 'round' | 'circle' | 'square';

// ==================== 方向类型 ====================

/**
 * 方向类型
 * @description 定义布局或排列的方向
 * - `horizontal` - 水平方向
 * - `vertical` - 垂直方向
 */
export type Direction = 'horizontal' | 'vertical';

// ==================== 位置类型 ====================

/**
 * 位置类型
 * @description 定义元素相对于参考点的位置
 * - `top` - 顶部
 * - `bottom` - 底部
 * - `left` - 左侧
 * - `right` - 右侧
 */
export type Placement = 'top' | 'bottom' | 'left' | 'right';

/**
 * 扩展位置类型
 * @description 包含中心和组合位置
 * - `top` - 顶部
 * - `top-left` - 左上
 * - `top-right` - 右上
 * - `bottom` - 底部
 * - `bottom-left` - 左下
 * - `bottom-right` - 右下
 * - `left` - 左侧
 * - `right` - 右侧
 * - `center` - 中心
 */
export type ExtendedPlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';

// ==================== 对齐类型 ====================

/**
 * 对齐类型
 * @description 定义内容的对齐方式
 * - `start` - 起始对齐（左对齐/顶部对齐）
 * - `center` - 居中对齐
 * - `end` - 结束对齐（右对齐/底部对齐）
 */
export type Align = 'start' | 'center' | 'end';

/**
 * 扩展对齐类型
 * @description 包含额外的两端对齐和基线对齐
 * - `start` - 起始对齐
 * - `center` - 居中对齐
 * - `end` - 结束对齐
 * - `stretch` - 拉伸对齐
 * - `baseline` - 基线对齐
 * - `space-between` - 两端对齐
 * - `space-around` - 环绕对齐
 * - `space-evenly` - 均匀对齐
 */
export type ExtendedAlign =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

// ==================== 主题模式类型 ====================

/**
 * 主题模式类型
 * @description 定义应用的主题模式
 * - `light` - 浅色模式
 * - `dark` - 深色模式
 * - `auto` - 自动模式，跟随系统设置
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

// ==================== 断点类型 ====================

/**
 * 响应式断点类型
 * @description 定义响应式布局的断点
 * - `xs` - 超小屏幕 (<576px)
 * - `sm` - 小屏幕 (≥576px)
 * - `md` - 中等屏幕 (≥768px)
 * - `lg` - 大屏幕 (≥992px)
 * - `xl` - 超大屏幕 (≥1200px)
 * - `xxl` - 超超大屏幕 (≥1400px)
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// ==================== 动画类型 ====================

/**
 * 动画类型
 * @description 定义组件的动画效果类型
 * - `fade` - 淡入淡出
 * - `slide` - 滑动
 * - `scale` - 缩放
 * - `rotate` - 旋转
 * - `bounce` - 弹跳
 */
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';

/**
 * 动画方向类型
 * @description 定义动画的方向
 * - `up` - 向上
 * - `down` - 向下
 * - `left` - 向左
 * - `right` - 向右
 * - `in` - 向内
 * - `out` - 向外
 */
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'in' | 'out';

// ==================== 输入类型 ====================

/**
 * 输入框类型
 * @description 定义输入框的输入类型
 * - `text` - 文本输入
 * - `password` - 密码输入
 * - `number` - 数字输入
 * - `tel` - 电话输入
 * - `email` - 邮箱输入
 * - `url` - URL输入
 * - `search` - 搜索输入
 */
export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email' | 'url' | 'search';

// ==================== 键盘类型 ====================

/**
 * 键盘类型
 * @description 定义移动端弹出的键盘类型
 * - `default` - 默认键盘
 * - `number` - 数字键盘
 * - `digit` - 带小数点的数字键盘
 * - `idcard` - 身份证键盘
 */
export type KeyboardType = 'default' | 'number' | 'digit' | 'idcard';


// ==================== 平台类型 ====================

/**
 * 平台类型
 * @description 定义支持的运行平台
 * - `weapp` - 微信小程序
 * - `alipay` - 支付宝小程序
 * - `swan` - 百度小程序
 * - `tt` - 字节跳动小程序
 * - `qq` - QQ小程序
 * - `jd` - 京东小程序
 * - `h5` - H5/Web
 * - `rn` - React Native
 * - `harmony` - 鸿蒙 OS
 * - `unknown` - 未知平台
 */
export type Platform =
  | 'weapp'
  | 'alipay'
  | 'swan'
  | 'tt'
  | 'qq'
  | 'jd'
  | 'h5'
  | 'rn'
  | 'harmony'
  | 'unknown';

/**
 * 平台信息接口
 * @description 描述当前运行平台的详细信息
 */
export interface PlatformInfo {
  /** 平台类型 */
  type: Platform;
  /** 平台类型（别名，向后兼容） */
  platform?: Platform;
  /** 是否为小程序 */
  isMiniProgram: boolean;
  /** 是否为 H5 */
  isH5: boolean;
  /** 是否为 React Native */
  isRN: boolean;
  /** 是否为鸿蒙 */
  isHarmony: boolean;
  /** SDK 版本 */
  SDKVersion?: string;
  /** 版本号 */
  version?: string;
  /** 系统信息 */
  system?: {
    brand?: string;
    model?: string;
    platform?: string;
    version?: string;
  } | Record<string, unknown>;
}

// ==================== 请求类型 ====================

/**
 * HTTP 请求方法
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * 请求配置接口
 * @description HTTP 请求的配置选项
 */
export interface RequestConfig {
  /** 请求 URL */
  url?: string;
  /** 基础 URL */
  baseURL?: string;
  /** 请求方法 */
  method?: HttpMethod;
  /** 请求数据 */
  data?: Record<string, unknown>;
  /** 请求参数 */
  params?: Record<string, unknown>;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 请求头（别名，向后兼容） */
  header?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 响应类型 */
  responseType?: 'json' | 'text' | 'arraybuffer';
  /** 是否携带凭证 */
  withCredentials?: boolean;
  /** 取消信号 */
  signal?: AbortSignal;
  /** 重试次数 */
  retryCount?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 上传进度回调 */
  onUploadProgress?: (percent: number) => void;
  /** 下载进度回调 */
  onDownloadProgress?: (percent: number) => void;
}

/**
 * 请求响应接口
 * @description HTTP 请求的响应结构
 */
export interface RequestResponse<T = unknown> {
  /** 响应数据 */
  data: T;
  /** HTTP 状态码 */
  status: number;
  /** HTTP 状态码（别名，向后兼容） */
  statusCode?: number;
  /** 状态文本 */
  statusText: string;
  /** 状态消息（别名，向后兼容） */
  statusMessage?: string;
  /** 响应头 */
  headers: Record<string, string>;
  /** 响应头（别名，向后兼容） */
  header?: Record<string, string>;
  /** 请求配置 */
  config: RequestConfig;
}

/**
 * 请求错误接口
 * @description HTTP 请求的错误结构
 */
export interface RequestError {
  /** 错误码 */
  code: string;
  /** 错误信息 */
  message: string;
  /** HTTP 状态码 */
  status?: number;
  /** 原始错误 */
  originalError?: unknown;
  /** 错误详情（别名，向后兼容） */
  detail?: unknown;
}
