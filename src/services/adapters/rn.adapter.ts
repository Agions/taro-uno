/**
 * React Native HTTP Adapter
 * Uses fetch API for HTTP requests (React Native's built-in fetch)
 * @module services/adapters/rn.adapter
 */

import { BaseHttpAdapter } from './adapter.interface';
import type {
  HttpRequestConfig,
  HttpResponse,
  UploadConfig,
  DownloadConfig,
  UploadProgress,
  DownloadProgress,
} from '../types';
import { HttpError, ErrorCodes } from '../types';

/**
 * React Native HTTP 适配器
 * 使用 React Native 内置的 fetch API 实现
 */
export class RNAdapter extends BaseHttpAdapter {
  /**
   * 发送 HTTP 请求
   */
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders(
      { 'Content-Type': 'application/json' },
      config.headers,
    );

    // 构建 fetch 配置
    const fetchConfig: RequestInit = {
      method: config.method || 'GET',
      headers,
      signal: config.signal,
    };

    // 添加请求体
    if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method || '')) {
      const contentType = headers['Content-Type'] || headers['content-type'];
      fetchConfig.body = this.serializeData(config.data, contentType) as string;
    }

    // 创建超时控制器
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let abortController: AbortController | undefined;

    if (config.timeout && !config.signal) {
      abortController = new AbortController();
      fetchConfig.signal = abortController.signal;
      timeoutId = setTimeout(() => {
        abortController?.abort();
      }, config.timeout);
    }

    try {
      const response = await fetch(url, fetchConfig);

      // 清除超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 解析响应数据
      let data: T;
      const contentType = response.headers.get('content-type') || '';

      if (config.responseType === 'arraybuffer') {
        data = (await response.arrayBuffer()) as T;
      } else if (config.responseType === 'text' || !contentType.includes('application/json')) {
        data = (await response.text()) as T;
      } else {
        try {
          data = (await response.json()) as T;
        } catch {
          data = (await response.text()) as T;
        }
      }

      // 解析响应头
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
      });

      // 构建响应对象
      const httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText || this.getStatusText(response.status),
        headers: responseHeaders,
        config,
      };

      // 检查 HTTP 状态码
      if (!response.ok) {
        const errorCode = response.status >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR;
        throw new HttpError(
          `Request failed with status ${response.status}`,
          errorCode,
          response.status,
          undefined,
          config,
          httpResponse,
        );
      }

      return httpResponse;
    } catch (error) {
      // 清除超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 已经是 HttpError 则直接抛出
      if (error instanceof HttpError) {
        throw error;
      }

      // 处理 fetch 错误
      const fetchError = error as Error;

      if (fetchError.name === 'AbortError') {
        // 检查是否是超时导致的取消
        if (abortController && config.timeout) {
          throw new HttpError(
            'Request timeout',
            ErrorCodes.TIMEOUT,
            undefined,
            error,
            config,
          );
        }
        throw new HttpError(
          'Request cancelled',
          ErrorCodes.CANCELLED,
          undefined,
          error,
          config,
        );
      }

      if (fetchError.message?.includes('network') || fetchError.name === 'TypeError') {
        throw new HttpError(
          'Network error',
          ErrorCodes.NETWORK_ERROR,
          undefined,
          error,
          config,
        );
      }

      throw new HttpError(
        fetchError.message || 'Unknown error',
        ErrorCodes.UNKNOWN,
        undefined,
        error,
        config,
      );
    }
  }

  /**
   * 上传文件
   * React Native 使用 FormData 和 fetch 进行文件上传
   */
  async upload<T = unknown>(
    config: UploadConfig,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders({}, config.headers);

    // 移除 Content-Type，让 fetch 自动设置 multipart/form-data
    delete headers['Content-Type'];
    delete headers['content-type'];

    // 构建 FormData
    const formData = new FormData();

    // 在 React Native 中，文件需要以特定格式添加
    if (typeof config.filePath === 'string') {
      // React Native 文件格式
      const fileUri = config.filePath;
      const fileName = fileUri.split('/').pop() || 'file';
      const fileType = this.getMimeType(fileName);

      formData.append(config.name || 'file', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      } as unknown as Blob);
    }

    // 添加额外的表单数据
    if (config.formData) {
      for (const [key, value] of Object.entries(config.formData)) {
        formData.append(key, String(value));
      }
    }

    // 注意：React Native 的 fetch 不支持上传进度
    // 如果需要进度，需要使用第三方库如 react-native-background-upload
    if (onProgress) {
      // 模拟进度开始
      onProgress({
        progress: 0,
        totalBytesSent: 0,
        totalBytesExpectedToSend: 0,
      });
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        signal: config.signal,
      });

      // 模拟进度完成
      if (onProgress) {
        onProgress({
          progress: 100,
          totalBytesSent: 0,
          totalBytesExpectedToSend: 0,
        });
      }

      let data: T;
      try {
        data = (await response.json()) as T;
      } catch {
        data = (await response.text()) as T;
      }

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
      });

      const httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText || this.getStatusText(response.status),
        headers: responseHeaders,
        config,
      };

      if (!response.ok) {
        throw new HttpError(
          `Upload failed with status ${response.status}`,
          response.status >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR,
          response.status,
          undefined,
          config,
          httpResponse,
        );
      }

      return httpResponse;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      const fetchError = error as Error;

      if (fetchError.name === 'AbortError') {
        throw new HttpError(
          'Upload cancelled',
          ErrorCodes.CANCELLED,
          undefined,
          error,
          config,
        );
      }

      throw new HttpError(
        fetchError.message || 'Upload failed',
        ErrorCodes.NETWORK_ERROR,
        undefined,
        error,
        config,
      );
    }
  }

  /**
   * 下载文件
   * React Native 使用 fetch 下载文件
   */
  async download<T = unknown>(
    config: DownloadConfig,
    onProgress?: (progress: DownloadProgress) => void,
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders({}, config.headers);

    // 注意：React Native 的 fetch 不支持下载进度
    // 如果需要进度，需要使用第三方库如 react-native-fs
    if (onProgress) {
      // 模拟进度开始
      onProgress({
        progress: 0,
        totalBytesWritten: 0,
        totalBytesExpectedToWrite: 0,
      });
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        signal: config.signal,
      });

      // 模拟进度完成
      if (onProgress) {
        onProgress({
          progress: 100,
          totalBytesWritten: 0,
          totalBytesExpectedToWrite: 0,
        });
      }

      // 获取 blob 数据
      const blob = await response.blob();

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
      });

      const httpResponse: HttpResponse<T> = {
        data: { blob } as T,
        status: response.status,
        statusText: response.statusText || this.getStatusText(response.status),
        headers: responseHeaders,
        config,
      };

      if (!response.ok) {
        throw new HttpError(
          `Download failed with status ${response.status}`,
          response.status >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR,
          response.status,
          undefined,
          config,
          httpResponse,
        );
      }

      return httpResponse;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      const fetchError = error as Error;

      if (fetchError.name === 'AbortError') {
        throw new HttpError(
          'Download cancelled',
          ErrorCodes.CANCELLED,
          undefined,
          error,
          config,
        );
      }

      throw new HttpError(
        fetchError.message || 'Download failed',
        ErrorCodes.NETWORK_ERROR,
        undefined,
        error,
        config,
      );
    }
  }

  /**
   * 根据文件名获取 MIME 类型
   */
  private getMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      txt: 'text/plain',
      json: 'application/json',
      xml: 'application/xml',
      zip: 'application/zip',
      mp3: 'audio/mpeg',
      mp4: 'video/mp4',
    };

    return mimeTypes[extension || ''] || 'application/octet-stream';
  }
}

/** 创建 React Native 适配器实例 */
export function createRNAdapter(): RNAdapter {
  return new RNAdapter();
}
