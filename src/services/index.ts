/**
 * HTTP Services
 * Unified HTTP client and utilities for cross-platform requests
 * 
 * @module services
 * @description 统一的 HTTP 服务模块，提供跨平台的网络请求能力
 * 
 * @example
 * ```typescript
 * // 基础使用
 * import { http } from 'taro-uno-ui';
 * 
 * const data = await http.get<User>('/api/user/1');
 * 
 * // 创建独立实例
 * const api = http.create({
 *   baseURL: 'https://api.example.com',
 *   timeout: 10000,
 * });
 * 
 * // 使用拦截器
 * http.interceptors.request.use((config) => {
 *   config.headers = { ...config.headers, Authorization: 'Bearer token' };
 *   return config;
 * });
 * ```
 */

// ============================================================================
// Types - 类型定义
// ============================================================================

export type {
  /** HTTP 方法类型 */
  HttpMethod,
  /** HTTP 请求配置 */
  HttpRequestConfig,
  /** HTTP 响应 */
  HttpResponse,
  /** HTTP 错误信息接口 */
  HttpErrorInfo,
  /** 错误码类型 */
  ErrorCode,
  /** 请求拦截器函数类型 */
  RequestInterceptorFn,
  /** 请求错误拦截器函数类型 */
  RequestErrorInterceptorFn,
  /** 响应拦截器函数类型 */
  ResponseInterceptorFn,
  /** 响应错误拦截器函数类型 */
  ResponseErrorInterceptorFn,
  /** 拦截器配置 */
  InterceptorConfig,
  /** 上传配置 */
  UploadConfig,
  /** 下载配置 */
  DownloadConfig,
  /** 上传进度信息 */
  UploadProgress,
  /** 下载进度信息 */
  DownloadProgress,
} from './types';

// ============================================================================
// Error Handling - 错误处理
// ============================================================================

/** HTTP 错误类 */
export { HttpError } from './types';

/** 错误码常量 */
export { ErrorCodes } from './types';

// ============================================================================
// HTTP Client - HTTP 客户端
// ============================================================================

/** HTTP 客户端类 */
export { HttpClient } from './http-client';

/** 默认 HTTP 客户端实例 */
export { http } from './http-client';

/** 默认 HTTP 客户端（别名） */
export { default as httpClient } from './http-client';

// ============================================================================
// Interceptors - 拦截器
// ============================================================================

/** 拦截器管理器 */
export { InterceptorManager } from './interceptors';

/** 创建请求拦截器管理器 */
export { createRequestInterceptorManager } from './interceptors';

/** 创建响应拦截器管理器 */
export { createResponseInterceptorManager } from './interceptors';

/** 拦截器项类型 */
export type { InterceptorItem } from './interceptors';

// ============================================================================
// Adapters - 平台适配器
// ============================================================================

/** HTTP 适配器接口 */
export type { IHttpAdapter } from './adapters';

/** 适配器工厂函数类型 */
export type { AdapterFactory } from './adapters';

/** 适配器基类 */
export { BaseHttpAdapter } from './adapters';

/** 微信小程序适配器 */
export { WeappAdapter } from './adapters';

/** H5/Web 适配器 */
export { H5Adapter } from './adapters';

/** React Native 适配器 */
export { RNAdapter } from './adapters';

/** 鸿蒙 OS 适配器 */
export { HarmonyAdapter } from './adapters';

/** 自动创建适配器（根据当前平台） */
export { createAdapter } from './adapters';

/** 根据平台类型创建适配器 */
export { createAdapterForPlatform } from './adapters';

/** 创建微信小程序适配器 */
export { createWeappAdapter } from './adapters';

/** 创建 H5 适配器 */
export { createH5Adapter } from './adapters';

/** 创建 React Native 适配器 */
export { createRNAdapter } from './adapters';

/** 创建鸿蒙适配器 */
export { createHarmonyAdapter } from './adapters';

/** 清除适配器缓存 */
export { clearAdapterCache } from './adapters';

/** 获取当前平台适配器类型名称 */
export { getAdapterTypeName } from './adapters';

/** 检查适配器是否支持上传 */
export { supportsUpload } from './adapters';

/** 检查适配器是否支持下载 */
export { supportsDownload } from './adapters';

// ============================================================================
// Default Export - 默认导出
// ============================================================================

import { http, HttpClient } from './http-client';
import { HttpError, ErrorCodes } from './types';
import { InterceptorManager } from './interceptors';
import {
  createAdapter,
  createAdapterForPlatform,
  clearAdapterCache,
  getAdapterTypeName,
  supportsUpload,
  supportsDownload,
} from './adapters';

/**
 * 服务模块统一导出对象
 * 提供所有 HTTP 服务相关功能的统一访问入口
 */
export const services = {
  /** 默认 HTTP 客户端实例 */
  http,
  /** HTTP 客户端类 */
  HttpClient,
  /** HTTP 错误类 */
  HttpError,
  /** 错误码常量 */
  ErrorCodes,
  /** 拦截器管理器 */
  InterceptorManager,
  /** 自动创建适配器 */
  createAdapter,
  /** 根据平台类型创建适配器 */
  createAdapterForPlatform,
  /** 清除适配器缓存 */
  clearAdapterCache,
  /** 获取适配器类型名称 */
  getAdapterTypeName,
  /** 检查是否支持上传 */
  supportsUpload,
  /** 检查是否支持下载 */
  supportsDownload,
};

export default services;
