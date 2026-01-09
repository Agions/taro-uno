/**
 * 全局类型声明文件
 * 定义小程序平台 API 类型和全局扩展
 * @module types/global
 */

// ==================== 小程序通用 API 类型 ====================

/**
 * 小程序存储选项
 */
export interface MiniProgramStorageOptions {
  /** 存储键名 */
  key: string;
  /** 存储数据 */
  data?: unknown;
  /** 成功回调 */
  success?: () => void;
  /** 失败回调 */
  fail?: (error: { errMsg: string }) => void;
  /** 完成回调 */
  complete?: () => void;
}

/**
 * 小程序获取存储选项
 */
export interface MiniProgramGetStorageOptions {
  /** 存储键名 */
  key: string;
  /** 成功回调 */
  success?: (result: { data: unknown }) => void;
  /** 失败回调 */
  fail?: (error: { errMsg: string }) => void;
  /** 完成回调 */
  complete?: () => void;
}

/**
 * 小程序请求选项
 */
export interface MiniProgramRequestOptions {
  /** 请求地址 */
  url: string;
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT';
  /** 请求头 */
  header?: Record<string, string>;
  /** 请求数据 */
  data?: unknown;
  /** 超时时间 */
  timeout?: number;
  /** 数据类型 */
  dataType?: 'json' | string;
  /** 响应类型 */
  responseType?: 'text' | 'arraybuffer';
  /** 成功回调 */
  success?: (result: MiniProgramRequestResult) => void;
  /** 失败回调 */
  fail?: (error: { errMsg: string; errCode?: number }) => void;
  /** 完成回调 */
  complete?: () => void;
}

/**
 * 小程序请求结果
 */
export interface MiniProgramRequestResult {
  /** 响应数据 */
  data: unknown;
  /** HTTP 状态码 */
  statusCode: number;
  /** 响应头 */
  header: Record<string, string>;
  /** 错误信息 */
  errMsg: string;
}

/**
 * 小程序系统信息
 */
export interface MiniProgramSystemInfo {
  /** 设备品牌 */
  brand?: string;
  /** 设备型号 */
  model?: string;
  /** 操作系统平台 */
  platform?: string;
  /** 操作系统版本 */
  system?: string;
  /** 系统语言 */
  language?: string;
  /** 屏幕宽度 */
  screenWidth?: number;
  /** 屏幕高度 */
  screenHeight?: number;
  /** 可使用窗口宽度 */
  windowWidth?: number;
  /** 可使用窗口高度 */
  windowHeight?: number;
  /** 设备像素比 */
  pixelRatio?: number;
  /** 状态栏高度 */
  statusBarHeight?: number;
  /** SDK 版本 */
  SDKVersion?: string;
  /** 安全区域 */
  safeArea?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
  };
}

/**
 * 小程序拍照选项
 */
export interface MiniProgramTakePhotoOptions {
  /** 图片质量 */
  quality?: 'high' | 'normal' | 'low';
  /** 成功回调 */
  success?: (result: MiniProgramTakePhotoResult) => void;
  /** 失败回调 */
  fail?: (error: { errMsg: string }) => void;
  /** 完成回调 */
  complete?: () => void;
}

/**
 * 小程序拍照结果
 */
export interface MiniProgramTakePhotoResult {
  /** 临时文件路径 */
  tempImagePath: string;
  /** 图片宽度 */
  width?: number;
  /** 图片高度 */
  height?: number;
}

/**
 * 小程序分享选项
 */
export interface MiniProgramShareOptions {
  /** 分享标题 */
  title?: string;
  /** 分享路径 */
  path?: string;
  /** 分享图片 URL */
  imageUrl?: string;
  /** 分享描述 */
  desc?: string;
  /** 成功回调 */
  success?: () => void;
  /** 失败回调 */
  fail?: (error: { errMsg: string }) => void;
  /** 完成回调 */
  complete?: () => void;
}

/**
 * 小程序分享到朋友圈选项
 */
export interface MiniProgramShareTimelineOptions {
  /** 分享标题 */
  title?: string;
  /** 分享查询参数 */
  query?: string;
  /** 分享图片 URL */
  imageUrl?: string;
  /** 成功回调 */
  success?: () => void;
  /** 失败回调 */
  fail?: (error: { errMsg: string }) => void;
  /** 完成回调 */
  complete?: () => void;
}

// ==================== 小程序 API 接口 ====================

/**
 * 小程序基础 API 接口
 * 定义各小程序平台通用的 API 方法
 */
export interface MiniProgramAPI {
  /** 发起网络请求 */
  request: (options: MiniProgramRequestOptions) => void;
  /** 设置存储 */
  setStorage: (options: MiniProgramStorageOptions) => void;
  /** 获取存储 */
  getStorage: (options: MiniProgramGetStorageOptions) => void;
  /** 移除存储 */
  removeStorage: (options: { key: string; success?: () => void; fail?: (error: { errMsg: string }) => void }) => void;
  /** 清除存储 */
  clearStorage: (options?: { success?: () => void; fail?: (error: { errMsg: string }) => void }) => void;
  /** 获取存储信息 */
  getStorageInfo: (options: {
    success?: (result: { keys: string[]; currentSize: number; limitSize: number }) => void;
    fail?: (error: { errMsg: string }) => void;
  }) => void;
  /** 获取系统信息 */
  getSystemInfo: (options: {
    success?: (result: MiniProgramSystemInfo) => void;
    fail?: (error: { errMsg: string }) => void;
  }) => void;
  /** 同步获取系统信息 */
  getSystemInfoSync: () => MiniProgramSystemInfo;
}

/**
 * 微信小程序 API 接口
 */
export interface WechatMiniProgramAPI extends MiniProgramAPI {
  /** 相机拍照 */
  cameraTakePhoto?: (options: MiniProgramTakePhotoOptions) => void;
  /** 分享到好友 */
  shareAppMessage?: (options: MiniProgramShareOptions) => void;
  /** 分享到朋友圈 */
  shareToTimeline?: (options: MiniProgramShareTimelineOptions) => void;
  /** 获取账号信息 */
  getAccountInfoSync?: () => {
    miniProgram: {
      appId: string;
      envVersion: string;
      version: string;
    };
  };
}

/**
 * 支付宝小程序 API 接口
 */
export interface AlipayMiniProgramAPI extends MiniProgramAPI {
  /** 分享 */
  share?: (options: MiniProgramShareOptions) => void;
}

/**
 * 百度小程序 API 接口
 */
export interface SwanMiniProgramAPI extends MiniProgramAPI {
  /** 分享 */
  share?: (options: MiniProgramShareOptions) => void;
}

/**
 * 字节跳动小程序 API 接口
 */
export interface TTMiniProgramAPI extends MiniProgramAPI {
  /** 分享 */
  shareAppMessage?: (options: MiniProgramShareOptions) => void;
}

/**
 * QQ 小程序 API 接口
 */
export interface QQMiniProgramAPI extends MiniProgramAPI {
  /** 分享 */
  shareAppMessage?: (options: MiniProgramShareOptions) => void;
}

/**
 * 京东小程序 API 接口
 */
export interface JDMiniProgramAPI extends MiniProgramAPI {
  /** 分享 */
  shareAppMessage?: (options: MiniProgramShareOptions) => void;
}

// ==================== 全局 Window 扩展 ====================

declare global {
  interface Window {
    /** 微信小程序 API */
    wx?: WechatMiniProgramAPI;
    /** 支付宝小程序 API */
    my?: AlipayMiniProgramAPI;
    /** 百度小程序 API */
    swan?: SwanMiniProgramAPI;
    /** 字节跳动小程序 API */
    tt?: TTMiniProgramAPI;
    /** QQ 小程序 API */
    qq?: QQMiniProgramAPI;
    /** 京东小程序 API */
    jd?: JDMiniProgramAPI;
  }

  /** 鸿蒙应用全局对象 */
  var ohosApplication: unknown;
}

export { };
