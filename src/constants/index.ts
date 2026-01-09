/**
 * Taro-Uno UI 组件库常量定义
 * 包含组件、主题、平台、错误码等常量
 */

import type { Platform, Size, Variant, Status, ThemeMode, AnimationType, AnimationDirection } from '../types';

// ==================== 组件常量 ====================

/** 组件尺寸常量 */
export const COMPONENT_SIZES: Record<Size, string> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/** 组件变体常量 */
export const COMPONENT_VARIANTS: Record<Variant, string> = {
  solid: 'solid',
  outline: 'outline',
  ghost: 'ghost',
  text: 'text',
};

/** 组件状态常量 */
export const COMPONENT_STATUSES: Record<Status, string> = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

/** 组件前缀常量 */
export const COMPONENT_PREFIX = 'taro-uno';

/** 组件类名前缀 */
export const CLASS_PREFIX = 'tu';

/** 数据属性前缀 */
export const DATA_PREFIX = 'data-tu';

/** 测试ID前缀 */
export const TEST_ID_PREFIX = 'tu-';

// ==================== 主题常量 ====================

/** 主题模式常量 */
export const THEME_MODES: Record<ThemeMode, string> = {
  light: 'light',
  dark: 'dark',
  auto: 'auto',
};

/** 默认主题颜色 */
export const DEFAULT_THEME_COLORS = {
  primary: '#1890ff',
  secondary: '#52c41a',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  info: '#1890ff',
  background: '#ffffff',
  surface: '#fafafa',
  text: '#000000',
  textSecondary: '#666666',
  border: '#d9d9d9',
  divider: '#f0f0f0',
};

/** 深色主题颜色 */
export const DARK_THEME_COLORS = {
  primary: '#177ddc',
  secondary: '#49aa19',
  success: '#49aa19',
  warning: '#d48806',
  error: '#a61d24',
  info: '#177ddc',
  background: '#141414',
  surface: '#1f1f1f',
  text: '#ffffff',
  textSecondary: '#bfbfbf',
  border: '#434343',
  divider: '#303030',
};

/** 默认间距配置 */
export const DEFAULT_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/** 默认字体配置 */
export const DEFAULT_TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/** 默认圆角配置 */
export const DEFAULT_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

/** 断点配置 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

// ==================== 平台常量 ====================

/** 平台名称映射 */
export const PLATFORM_NAMES: Record<Platform, string> = {
  weapp: '微信小程序',
  alipay: '支付宝小程序',
  swan: '百度小程序',
  tt: '字节跳动小程序',
  qq: 'QQ小程序',
  h5: 'H5',
  rn: 'React Native',
  jd: '京东小程序',
  harmony: '鸿蒙OS',
  unknown: '未知平台',
};

/** 平台特性支持 */
export const PLATFORM_FEATURES: Record<
  Platform,
  {
    supportsStorage: boolean;
    supportsNetwork: boolean;
    supportsLocation: boolean;
    supportsCamera: boolean;
    supportsPayment: boolean;
    supportsShare: boolean;
    supportsBiometrics: boolean;
  }
> = {
  weapp: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: true,
  },
  alipay: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: true,
  },
  swan: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: false,
  },
  tt: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: false,
  },
  qq: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: false,
  },
  h5: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: false,
  },
  rn: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: true,
  },
  jd: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: false,
  },
  harmony: {
    supportsStorage: true,
    supportsNetwork: true,
    supportsLocation: true,
    supportsCamera: true,
    supportsPayment: true,
    supportsShare: true,
    supportsBiometrics: true,
  },
  unknown: {
    supportsStorage: false,
    supportsNetwork: false,
    supportsLocation: false,
    supportsCamera: false,
    supportsPayment: false,
    supportsShare: false,
    supportsBiometrics: false,
  },
};

/** 平台API映射 */
export const PLATFORM_APIS: Record<
  Platform,
  {
    request: string;
    storage: {
      set: string;
      get: string;
      remove: string;
      clear: string;
    };
    location: {
      get: string;
      open: string;
    };
    camera: {
      take: string;
      choose: string;
    };
  }
> = {
  weapp: {
    request: 'wx.request',
    storage: {
      set: 'wx.setStorage',
      get: 'wx.getStorage',
      remove: 'wx.removeStorage',
      clear: 'wx.clearStorage',
    },
    location: {
      get: 'wx.getLocation',
      open: 'wx.openLocation',
    },
    camera: {
      take: 'wx.cameraTake',
      choose: 'wx.chooseImage',
    },
  },
  alipay: {
    request: 'my.request',
    storage: {
      set: 'my.setStorage',
      get: 'my.getStorage',
      remove: 'my.removeStorage',
      clear: 'my.clearStorage',
    },
    location: {
      get: 'my.getLocation',
      open: 'my.openLocation',
    },
    camera: {
      take: 'my.cameraTake',
      choose: 'my.chooseImage',
    },
  },
  swan: {
    request: 'swan.request',
    storage: {
      set: 'swan.setStorage',
      get: 'swan.getStorage',
      remove: 'swan.removeStorage',
      clear: 'swan.clearStorage',
    },
    location: {
      get: 'swan.getLocation',
      open: 'swan.openLocation',
    },
    camera: {
      take: 'swan.cameraTake',
      choose: 'swan.chooseImage',
    },
  },
  tt: {
    request: 'tt.request',
    storage: {
      set: 'tt.setStorage',
      get: 'tt.getStorage',
      remove: 'tt.removeStorage',
      clear: 'tt.clearStorage',
    },
    location: {
      get: 'tt.getLocation',
      open: 'tt.openLocation',
    },
    camera: {
      take: 'tt.cameraTake',
      choose: 'tt.chooseImage',
    },
  },
  qq: {
    request: 'qq.request',
    storage: {
      set: 'qq.setStorage',
      get: 'qq.getStorage',
      remove: 'qq.removeStorage',
      clear: 'qq.clearStorage',
    },
    location: {
      get: 'qq.getLocation',
      open: 'qq.openLocation',
    },
    camera: {
      take: 'qq.cameraTake',
      choose: 'qq.chooseImage',
    },
  },
  h5: {
    request: 'fetch',
    storage: {
      set: 'localStorage.setItem',
      get: 'localStorage.getItem',
      remove: 'localStorage.removeItem',
      clear: 'localStorage.clear',
    },
    location: {
      get: 'navigator.geolocation.getCurrentPosition',
      open: 'window.open',
    },
    camera: {
      take: 'navigator.mediaDevices.getUserMedia',
      choose: 'input[type=file].click()',
    },
  },
  rn: {
    request: 'fetch',
    storage: {
      set: 'AsyncStorage.setItem',
      get: 'AsyncStorage.getItem',
      remove: 'AsyncStorage.removeItem',
      clear: 'AsyncStorage.clear',
    },
    location: {
      get: 'Geolocation.getCurrentPosition',
      open: 'Linking.openURL',
    },
    camera: {
      take: 'Camera.takePictureAsync',
      choose: 'ImagePicker.launchImageLibrary',
    },
  },
  jd: {
    request: 'jd.request',
    storage: {
      set: 'jd.setStorage',
      get: 'jd.getStorage',
      remove: 'jd.removeStorage',
      clear: 'jd.clearStorage',
    },
    location: {
      get: 'jd.getLocation',
      open: 'jd.openLocation',
    },
    camera: {
      take: 'jd.cameraTake',
      choose: 'jd.chooseImage',
    },
  },
  harmony: {
    request: '@ohos.net.http',
    storage: {
      set: '@ohos.data.preferences.put',
      get: '@ohos.data.preferences.get',
      remove: '@ohos.data.preferences.delete',
      clear: '@ohos.data.preferences.clear',
    },
    location: {
      get: '@ohos.geolocation.getCurrentLocation',
      open: '@ohos.router.pushUrl',
    },
    camera: {
      take: '@ohos.multimedia.camera.takePicture',
      choose: '@ohos.file.picker.select',
    },
  },
  unknown: {
    request: 'fetch',
    storage: {
      set: 'localStorage.setItem',
      get: 'localStorage.getItem',
      remove: 'localStorage.removeItem',
      clear: 'localStorage.clear',
    },
    location: {
      get: 'navigator.geolocation.getCurrentPosition',
      open: 'window.open',
    },
    camera: {
      take: 'navigator.mediaDevices.getUserMedia',
      choose: 'input[type=file].click()',
    },
  },
};

// ==================== 动画常量 ====================

/** 动画类型常量 */
export const ANIMATION_TYPES: Record<AnimationType, string> = {
  fade: 'fade',
  slide: 'slide',
  scale: 'scale',
  rotate: 'rotate',
  bounce: 'bounce',
};

/** 动画方向常量 */
export const ANIMATION_DIRECTIONS: Record<AnimationDirection, string> = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  in: 'in',
  out: 'out',
};

/** 动画时长配置 */
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
};

/** 动画缓动函数 */
export const ANIMATION_EASING = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// ==================== 事件常量 ====================

/** 事件名称常量 */
export const EVENT_NAMES = {
  click: 'click',
  tap: 'tap',
  touchStart: 'touchstart',
  touchMove: 'touchmove',
  touchEnd: 'touchend',
  touchCancel: 'touchcancel',
  input: 'input',
  change: 'change',
  focus: 'focus',
  blur: 'blur',
  submit: 'submit',
  reset: 'reset',
  scroll: 'scroll',
  resize: 'resize',
  load: 'load',
  error: 'error',
};

/** 键盘按键常量 */
export const KEY_CODES = {
  enter: 13,
  escape: 27,
  space: 32,
  arrowUp: 38,
  arrowDown: 40,
  arrowLeft: 37,
  arrowRight: 39,
  tab: 9,
  backspace: 8,
  delete: 46,
  home: 36,
  end: 35,
  pageUp: 33,
  pageDown: 34,
};

// ==================== 网络请求常量 ====================

/** 请求方法常量 */
export const REQUEST_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const;

/** HTTP状态码常量 */
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

/** 请求超时时间 */
export const REQUEST_TIMEOUTS = {
  short: 5000,
  normal: 10000,
  long: 30000,
  veryLong: 60000,
};

/** 内容类型常量 */
export const CONTENT_TYPES = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded',
  multipart: 'multipart/form-data',
  text: 'text/plain',
  html: 'text/html',
  xml: 'application/xml',
};

// ==================== 错误码常量 ====================

/** 错误码常量 */
export const ERROR_CODES = {
  // 通用错误码 (1000-1999)
  UNKNOWN_ERROR: 1000,
  INVALID_PARAMS: 1001,
  NETWORK_ERROR: 1002,
  TIMEOUT_ERROR: 1003,
  PERMISSION_DENIED: 1004,
  NOT_FOUND: 1005,
  INTERNAL_ERROR: 1006,

  // 平台相关错误码 (2000-2999)
  PLATFORM_NOT_SUPPORTED: 2000,
  API_NOT_AVAILABLE: 2001,
  VERSION_TOO_LOW: 2002,

  // 组件相关错误码 (3000-3999)
  COMPONENT_NOT_FOUND: 3000,
  INVALID_COMPONENT_CONFIG: 3001,
  COMPONENT_RENDER_ERROR: 3002,

  // 主题相关错误码 (4000-4999)
  THEME_NOT_FOUND: 4000,
  INVALID_THEME_CONFIG: 4001,
  COLOR_FORMAT_ERROR: 4002,

  // 表单相关错误码 (5000-5999)
  FORM_VALIDATION_ERROR: 5000,
  FIELD_REQUIRED: 5001,
  INVALID_FORMAT: 5002,
  VALUE_OUT_OF_RANGE: 5003,

  // 存储相关错误码 (6000-6999)
  STORAGE_QUOTA_EXCEEDED: 6000,
  STORAGE_NOT_AVAILABLE: 6001,
  STORAGE_KEY_NOT_FOUND: 6002,

  // 网络相关错误码 (7000-7999)
  REQUEST_FAILED: 7000,
  RESPONSE_PARSE_ERROR: 7001,
  UPLOAD_FAILED: 7002,
  DOWNLOAD_FAILED: 7003,

  // 权限相关错误码 (8000-8999)
  LOCATION_PERMISSION_DENIED: 8000,
  CAMERA_PERMISSION_DENIED: 8001,
  STORAGE_PERMISSION_DENIED: 8002,
  MICROPHONE_PERMISSION_DENIED: 8003,

  // 业务相关错误码 (9000-9999)
  USER_NOT_FOUND: 9000,
  USER_ALREADY_EXISTS: 9001,
  INVALID_CREDENTIALS: 9002,
  ACCOUNT_LOCKED: 9003,
  INSUFFICIENT_BALANCE: 9004,
};

/** 错误消息映射 */
export const ERROR_MESSAGES: Record<number, string> = {
  [ERROR_CODES.UNKNOWN_ERROR]: '未知错误',
  [ERROR_CODES.INVALID_PARAMS]: '参数错误',
  [ERROR_CODES.NETWORK_ERROR]: '网络错误',
  [ERROR_CODES.TIMEOUT_ERROR]: '请求超时',
  [ERROR_CODES.PERMISSION_DENIED]: '权限不足',
  [ERROR_CODES.NOT_FOUND]: '资源不存在',
  [ERROR_CODES.INTERNAL_ERROR]: '内部错误',
  [ERROR_CODES.PLATFORM_NOT_SUPPORTED]: '平台不支持',
  [ERROR_CODES.API_NOT_AVAILABLE]: 'API不可用',
  [ERROR_CODES.VERSION_TOO_LOW]: '版本过低',
  [ERROR_CODES.COMPONENT_NOT_FOUND]: '组件不存在',
  [ERROR_CODES.INVALID_COMPONENT_CONFIG]: '组件配置错误',
  [ERROR_CODES.COMPONENT_RENDER_ERROR]: '组件渲染错误',
  [ERROR_CODES.THEME_NOT_FOUND]: '主题不存在',
  [ERROR_CODES.INVALID_THEME_CONFIG]: '主题配置错误',
  [ERROR_CODES.COLOR_FORMAT_ERROR]: '颜色格式错误',
  [ERROR_CODES.FORM_VALIDATION_ERROR]: '表单验证错误',
  [ERROR_CODES.FIELD_REQUIRED]: '字段必填',
  [ERROR_CODES.INVALID_FORMAT]: '格式错误',
  [ERROR_CODES.VALUE_OUT_OF_RANGE]: '值超出范围',
  [ERROR_CODES.STORAGE_QUOTA_EXCEEDED]: '存储空间不足',
  [ERROR_CODES.STORAGE_NOT_AVAILABLE]: '存储不可用',
  [ERROR_CODES.STORAGE_KEY_NOT_FOUND]: '存储键不存在',
  [ERROR_CODES.REQUEST_FAILED]: '请求失败',
  [ERROR_CODES.RESPONSE_PARSE_ERROR]: '响应解析错误',
  [ERROR_CODES.UPLOAD_FAILED]: '上传失败',
  [ERROR_CODES.DOWNLOAD_FAILED]: '下载失败',
  [ERROR_CODES.LOCATION_PERMISSION_DENIED]: '位置权限被拒绝',
  [ERROR_CODES.CAMERA_PERMISSION_DENIED]: '相机权限被拒绝',
  [ERROR_CODES.STORAGE_PERMISSION_DENIED]: '存储权限被拒绝',
  [ERROR_CODES.MICROPHONE_PERMISSION_DENIED]: '麦克风权限被拒绝',
  [ERROR_CODES.USER_NOT_FOUND]: '用户不存在',
  [ERROR_CODES.USER_ALREADY_EXISTS]: '用户已存在',
  [ERROR_CODES.INVALID_CREDENTIALS]: '凭证无效',
  [ERROR_CODES.ACCOUNT_LOCKED]: '账户已锁定',
  [ERROR_CODES.INSUFFICIENT_BALANCE]: '余额不足',
};

// ==================== 正则表达式常量 ====================

/** 常用正则表达式 */
export const REGEX_PATTERNS = {
  // 邮箱
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // 手机号
  phone: /^1[3-9]\d{9}$/,

  // 身份证号
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

  // URL
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,

  // IP地址
  ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  // 端口号
  port: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,

  // 中文
  chinese: /^[\u4e00-\u9fa5]+$/,

  // 英文
  english: /^[a-zA-Z]+$/,

  // 字母数字
  alphanumeric: /^[a-zA-Z0-9]+$/,

  // 数字
  number: /^[0-9]+$/,

  // 整数
  integer: /^-?[0-9]+$/,

  // 浮点数
  float: /^-?[0-9]+(\.[0-9]+)?$/,

  // 密码强度
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // 日期格式 YYYY-MM-DD
  date: /^\d{4}-\d{2}-\d{2}$/,

  // 时间格式 HH:mm:ss
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,

  // 颜色值
  color: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // 邮政编码
  zipCode: /^[1-9]\d{5}$/,

  // 车牌号
  licensePlate:
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
};

// ==================== 缓存键常量 ====================

/** 缓存键常量 */
export const CACHE_KEYS = {
  // 用户相关
  userInfo: 'user_info',
  userToken: 'user_token',
  userSettings: 'user_settings',

  // 主题相关
  themeMode: 'theme_mode',
  themeConfig: 'theme_config',

  // 应用相关
  appConfig: 'app_config',
  appSettings: 'app_settings',
  lastUpdateTime: 'last_update_time',

  // 缓存相关
  cacheVersion: 'cache_version',
  cacheTimestamp: 'cache_timestamp',
};

// ==================== Z-Index 层级常量 ====================

/** Z-Index 层级配置 */
export const Z_INDEX = {
  modal: 1000,
  dropdown: 900,
  tooltip: 800,
  notification: 700,
  header: 600,
  sidebar: 500,
  content: 400,
  footer: 300,
  background: 200,
  hidden: -1,
};

// ==================== 响应式断点常量 ====================

/** 响应式断点配置 */
export const RESPONSIVE_BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

/** 响应式类名前缀 */
export const RESPONSIVE_PREFIXES = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
};

// ==================== 导出所有常量 ====================

/** 导出所有常量组 */
export const CONSTANTS = {
  COMPONENT_SIZES,
  COMPONENT_VARIANTS,
  COMPONENT_STATUSES,
  COMPONENT_PREFIX,
  CLASS_PREFIX,
  DATA_PREFIX,
  TEST_ID_PREFIX,
  THEME_MODES,
  DEFAULT_THEME_COLORS,
  DARK_THEME_COLORS,
  DEFAULT_SPACING,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_RADIUS,
  BREAKPOINTS,
  PLATFORM_NAMES,
  PLATFORM_FEATURES,
  PLATFORM_APIS,
  ANIMATION_TYPES,
  ANIMATION_DIRECTIONS,
  ANIMATION_DURATIONS,
  ANIMATION_EASING,
  EVENT_NAMES,
  KEY_CODES,
  REQUEST_METHODS,
  HTTP_STATUS_CODES,
  REQUEST_TIMEOUTS,
  CONTENT_TYPES,
  ERROR_CODES,
  ERROR_MESSAGES,
  REGEX_PATTERNS,
  CACHE_KEYS,
  Z_INDEX,
  RESPONSIVE_BREAKPOINTS,
  RESPONSIVE_PREFIXES,
};
