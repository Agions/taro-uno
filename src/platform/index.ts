/**
 * Taro-Uno UI 组件库平台适配工具
 * 提供跨平台开发的统一接口和适配器
 */

import * as Taro from '@tarojs/taro';
import type { Platform, PlatformInfo, RequestConfig, RequestResponse, RequestError } from '../types';
import { PLATFORM_APIS, PLATFORM_FEATURES, PLATFORM_NAMES } from '../constants';

// 全局类型声明
declare global {
  interface Window {
    wx?: any;
    my?: any;
    swan?: any;
    tt?: any;
    qq?: any;
    jd?: any;
  }
}

// ==================== 平台适配器接口 ====================

/** 平台适配器接口 */
export interface PlatformAdapter {
  /** 获取平台信息 */
  getPlatformInfo(): PlatformInfo;

  /** 网络请求 */
  request<T = any>(config: RequestConfig): Promise<RequestResponse<T>>;

  /** 存储操作 */
  storage: {
    set(key: string, value: any): Promise<void>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    getInfo(): Promise<{ currentSize: number; limitSize: number }>;
  };

  /** 位置服务 */
  location: {
    getCurrentPosition(): Promise<Taro.getLocation.SuccessCallbackResult>;
    openLocation(options: Taro.openLocation.Option): Promise<void>;
    chooseLocation(): Promise<Taro.chooseLocation.SuccessCallbackResult>;
  };

  /** 相机服务 */
  camera: {
    takePhoto(options?: any): Promise<any>;
    chooseImage(options?: Taro.chooseImage.Option): Promise<Taro.chooseImage.SuccessCallbackResult>;
    chooseVideo(options?: Taro.chooseVideo.Option): Promise<Taro.chooseVideo.SuccessCallbackResult>;
  };

  /** 支付服务 */
  payment: {
    requestPayment(options: Taro.requestPayment.Option): Promise<void>;
  };

  /** 分享服务 */
  share: {
    shareAppMessage(options?: any): Promise<void>;
    shareToTimeline(options?: any): Promise<void>;
  };

  /** 生物识别 */
  biometrics: {
    checkIsAvailable(): Promise<boolean>;
    startVerify(
      options: Taro.startSoterAuthentication.Option,
    ): Promise<Taro.startSoterAuthentication.SuccessCallbackResult>;
  };

  /** 系统信息 */
  system: {
    getSystemInfo(): Promise<Taro.getSystemInfoSync.Result>;
    getNetworkType(): Promise<Taro.getNetworkType.SuccessCallbackResult>;
    getBatteryInfo(): Promise<Taro.getBatteryInfo.SuccessCallbackResult>;
    getScreenBrightness(): Promise<number>;
    setScreenBrightness(value: number): Promise<void>;
    keepScreenOn(keepScreenOn: boolean): Promise<void>;
    vibrate(): Promise<void>;
  };

  /** 剪贴板 */
  clipboard: {
    set(text: string): Promise<void>;
    get(): Promise<string>;
  };

  /** 扫码 */
  scan: {
    scanCode(options?: Taro.scanCode.Option): Promise<Taro.scanCode.SuccessCallbackResult>;
  };

  /** 文件操作 */
  file: {
    saveFile(options: Taro.saveFile.Option): Promise<Taro.saveFile.SuccessCallbackResult>;
    getFileInfo(options: Taro.getFileInfo.Option): Promise<Taro.getFileInfo.SuccessCallbackResult>;
    getSavedFileList(): Promise<Taro.getSavedFileList.SuccessCallbackResult>;
    removeSavedFile(options: Taro.removeSavedFile.Option): Promise<void>;
  };
}

// ==================== 微信小程序适配器 ====================

class WeappAdapter implements PlatformAdapter {
  getPlatformInfo(): PlatformInfo {
    const system = Taro.getSystemInfoSync();
    const accountInfo = Taro.getAccountInfoSync();

    return {
      platform: 'weapp',
      isMiniProgram: true,
      isH5: false,
      isRN: false,
      system,
      SDKVersion: (accountInfo.miniProgram as any).sdkVersion || accountInfo.miniProgram.version,
      version: accountInfo.miniProgram.version,
    };
  }

  async request<T = any>(config: RequestConfig): Promise<RequestResponse<T>> {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: config.url,
        method: (config.method as any) || 'GET',
        header: config.header,
        data: config.data,
        timeout: config.timeout,
        success: (res) => {
          resolve({
            data: res.data as T,
            statusCode: res.statusCode,
            statusMessage: res.errMsg,
            header: res.header,
          });
        },
        fail: (err) => {
          const error: RequestError = {
            message: err.errMsg || 'Request failed',
            code: (err as any).errCode,
            detail: err,
          };
          reject(error);
        },
      });
    });
  }

  storage = {
    async set(key: string, value: any): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.setStorage({
          key,
          data: value,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async get(key: string): Promise<any> {
      return new Promise((resolve, reject) => {
        Taro.getStorage({
          key,
          success: (res) => resolve(res.data),
          fail: reject,
        });
      });
    },

    async remove(key: string): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.removeStorage({
          key,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async clear(): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.clearStorage({
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async getInfo(): Promise<{ currentSize: number; limitSize: number }> {
      return new Promise((resolve, reject) => {
        Taro.getStorageInfo({
          success: (res) =>
            resolve({
              currentSize: res.currentSize,
              limitSize: res.limitSize,
            }),
          fail: reject,
        });
      });
    },
  };

  location = {
    async getCurrentPosition(): Promise<Taro.getLocation.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.getLocation({
          success: resolve,
          fail: reject,
        });
      });
    },

    async openLocation(options: Taro.openLocation.Option): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.openLocation({
          ...options,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async chooseLocation(): Promise<Taro.chooseLocation.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.chooseLocation({
          success: resolve,
          fail: reject,
        });
      });
    },
  };

  camera = {
    async takePhoto(options?: any): Promise<any> {
      return new Promise((resolve, reject) => {
        (Taro as any).cameraTakePhoto({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },

    async chooseImage(options?: Taro.chooseImage.Option): Promise<Taro.chooseImage.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.chooseImage({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },

    async chooseVideo(options?: Taro.chooseVideo.Option): Promise<Taro.chooseVideo.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.chooseVideo({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },
  };

  payment = {
    async requestPayment(options: Taro.requestPayment.Option): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.requestPayment({
          ...options,
          success: () => resolve(),
          fail: reject,
        });
      });
    },
  };

  share = {
    async shareAppMessage(options?: any): Promise<void> {
      return new Promise((resolve, reject) => {
        (Taro as any).shareAppMessage({
          ...options,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async shareToTimeline(options?: any): Promise<void> {
      return new Promise((resolve, reject) => {
        (Taro as any).shareToTimeline({
          ...options,
          success: () => resolve(),
          fail: reject,
        });
      });
    },
  };

  biometrics = {
    async checkIsAvailable(): Promise<boolean> {
      return new Promise((resolve) => {
        Taro.checkIsSoterEnrolledInDevice({
          checkAuthMode: 'fingerPrint',
          success: (res) => resolve(res.isEnrolled),
          fail: () => resolve(false),
        });
      });
    },

    async startVerify(
      options: Taro.startSoterAuthentication.Option,
    ): Promise<Taro.startSoterAuthentication.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.startSoterAuthentication({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },
  };

  system = {
    async getSystemInfo(): Promise<Taro.getSystemInfoSync.Result> {
      return Promise.resolve(Taro.getSystemInfoSync());
    },

    async getNetworkType(): Promise<Taro.getNetworkType.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.getNetworkType({
          success: resolve,
          fail: reject,
        });
      });
    },

    async getBatteryInfo(): Promise<Taro.getBatteryInfo.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.getBatteryInfo({
          success: resolve,
          fail: reject,
        });
      });
    },

    async getScreenBrightness(): Promise<number> {
      return new Promise((resolve, reject) => {
        Taro.getScreenBrightness({
          success: (res) => resolve(res.value),
          fail: reject,
        });
      });
    },

    async setScreenBrightness(value: number): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.setScreenBrightness({
          value,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async keepScreenOn(keepScreenOn: boolean): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.setKeepScreenOn({
          keepScreenOn,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async vibrate(): Promise<void> {
      return new Promise((resolve, reject) => {
        (Taro as any).vibrate({
          success: () => resolve(),
          fail: reject,
        });
      });
    },
  };

  clipboard = {
    async set(text: string): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.setClipboardData({
          data: text,
          success: () => resolve(),
          fail: reject,
        });
      });
    },

    async get(): Promise<string> {
      return new Promise((resolve, reject) => {
        Taro.getClipboardData({
          success: (res) => resolve(res.data),
          fail: reject,
        });
      });
    },
  };

  scan = {
    async scanCode(options?: Taro.scanCode.Option): Promise<Taro.scanCode.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.scanCode({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },
  };

  file = {
    async saveFile(options: Taro.saveFile.Option): Promise<Taro.saveFile.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.saveFile({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },

    async getFileInfo(options: Taro.getFileInfo.Option): Promise<Taro.getFileInfo.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.getFileInfo({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },

    async getSavedFileList(): Promise<Taro.getSavedFileList.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        Taro.getSavedFileList({
          success: resolve,
          fail: reject,
        });
      });
    },

    async removeSavedFile(options: Taro.removeSavedFile.Option): Promise<void> {
      return new Promise((resolve, reject) => {
        Taro.removeSavedFile({
          ...options,
          success: () => resolve(),
          fail: reject,
        });
      });
    },
  };
}

// ==================== H5适配器 ====================

class H5Adapter implements PlatformAdapter {
  getPlatformInfo(): PlatformInfo {
    const system = Taro.getSystemInfoSync();

    return {
      platform: 'h5',
      isMiniProgram: false,
      isH5: true,
      isRN: false,
      system,
    };
  }

  /** Headers对象转普通对象 */
  private headersToObject(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  async request<T = any>(config: RequestConfig): Promise<RequestResponse<T>> {
    const url = new URL(config.url, window.location.origin);

    // 添加查询参数
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const options: RequestInit = {
      method: config.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.header,
      },
    };

    if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method || 'GET')) {
      options.body = JSON.stringify(config.data);
    }

    try {
      const response = await fetch(url.toString(), options);
      const data = await response.json();

      return {
        data,
        statusCode: response.status,
        statusMessage: response.statusText,
        header: this.headersToObject(response.headers),
      };
    } catch (error) {
      const requestError: RequestError = {
        message: error instanceof Error ? error.message : 'Network error',
        detail: error,
      };
      throw requestError;
    }
  }

  storage = {
    async set(key: string, value: any): Promise<void> {
      localStorage.setItem(key, JSON.stringify(value));
    },

    async get(key: string): Promise<any> {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },

    async remove(key: string): Promise<void> {
      localStorage.removeItem(key);
    },

    async clear(): Promise<void> {
      localStorage.clear();
    },

    async getInfo(): Promise<{ currentSize: number; limitSize: number }> {
      // 估算localStorage使用空间
      let size = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          size += (key + localStorage.getItem(key)).length;
        }
      }

      return {
        currentSize: size,
        limitSize: 5 * 1024 * 1024, // 5MB 估算
      };
    },
  };

  location = {
    async getCurrentPosition(): Promise<Taro.getLocation.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude || 0,
              longitude: position.coords.longitude || 0,
              accuracy: position.coords.accuracy || 0,
              altitude: position.coords.altitude || 0,
              verticalAccuracy: position.coords.altitudeAccuracy || 0,
              horizontalAccuracy: position.coords.accuracy || 0,
              speed: position.coords.speed || 0,
              errMsg: 'getLocation:ok',
            });
          },
          (error) => {
            reject(error);
          },
        );
      });
    },

    async openLocation(options: Taro.openLocation.Option): Promise<void> {
      const url = `https://maps.google.com/maps?q=${options.latitude},${options.longitude}`;
      window.open(url, '_blank');
    },

    async chooseLocation(): Promise<Taro.chooseLocation.SuccessCallbackResult> {
      // H5环境下需要用户手动输入或使用地图选择
      throw new Error('chooseLocation is not supported in H5 environment');
    },
  };

  camera = {
    async takePhoto(): Promise<any> {
      throw new Error('takePhoto is not supported in H5 environment');
    },

    async chooseImage(options?: Taro.chooseImage.Option): Promise<Taro.chooseImage.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        if (options?.count && options.count > 1) {
          input.multiple = true;
        }

        input.onchange = (event) => {
          const files = Array.from((event.target as HTMLInputElement).files || []);
          const tempFilePaths = files.map((file) => URL.createObjectURL(file));

          resolve({
            tempFilePaths,
            tempFiles: files.map((file) => ({
              path: URL.createObjectURL(file),
              size: file.size,
              type: file.type,
              originalFileObj: file,
            })),
            errMsg: 'chooseImage:ok',
          });
        };

        input.onerror = () => {
          reject(new Error('Failed to choose image'));
        };

        input.click();
      });
    },

    async chooseVideo(): Promise<Taro.chooseVideo.SuccessCallbackResult> {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';

        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (!file) {
            reject(new Error('No file selected'));
            return;
          }

          resolve({
            tempFilePath: URL.createObjectURL(file),
            duration: 0, // 需要额外的逻辑获取视频时长
            size: file.size,
            height: 0, // 需要额外的逻辑获取视频尺寸
            width: 0,
            errMsg: 'chooseVideo:ok',
          });
        };

        input.onerror = () => {
          reject(new Error('Failed to choose video'));
        };

        input.click();
      });
    },
  };

  payment = {
    async requestPayment(): Promise<void> {
      throw new Error('Payment is not supported in H5 environment');
    },
  };

  share = {
    async shareAppMessage(): Promise<void> {
      // 使用Web Share API如果可用
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        throw new Error('Web Share API is not supported');
      }
    },

    async shareToTimeline(): Promise<void> {
      throw new Error('shareToTimeline is not supported in H5 environment');
    },
  };

  biometrics = {
    async checkIsAvailable(): Promise<boolean> {
      return false;
    },

    async startVerify(): Promise<Taro.startSoterAuthentication.SuccessCallbackResult> {
      throw new Error('Biometric authentication is not supported in H5 environment');
    },
  };

  system = {
    async getSystemInfo(): Promise<Taro.getSystemInfoSync.Result> {
      return Promise.resolve(Taro.getSystemInfoSync());
    },

    async getNetworkType(): Promise<Taro.getNetworkType.SuccessCallbackResult> {
      // 估算网络类型
      const connection = (navigator as any).connection;
      let networkType = 'unknown';

      if (connection) {
        if (connection.effectiveType) {
          networkType = connection.effectiveType;
        }
      }

      return {
        networkType: networkType as any,
        errMsg: 'getNetworkType:ok',
      };
    },

    async getBatteryInfo(): Promise<Taro.getBatteryInfo.SuccessCallbackResult> {
      // 需要Battery API支持
      throw new Error('Battery API is not supported');
    },

    async getScreenBrightness(): Promise<number> {
      // H5环境下无法获取屏幕亮度
      return 1;
    },

    async setScreenBrightness(): Promise<void> {
      // H5环境下无法设置屏幕亮度
    },

    async keepScreenOn(): Promise<void> {
      // H5环境下无法保持屏幕常亮
    },

    async vibrate(): Promise<void> {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    },
  };

  clipboard = {
    async set(text: string): Promise<void> {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    },

    async get(): Promise<string> {
      if (navigator.clipboard) {
        return await navigator.clipboard.readText();
      } else {
        // 降级方案
        return '';
      }
    },
  };

  scan = {
    async scanCode(): Promise<Taro.scanCode.SuccessCallbackResult> {
      throw new Error('scanCode is not supported in H5 environment');
    },
  };

  file = {
    async saveFile(): Promise<Taro.saveFile.SuccessCallbackResult> {
      throw new Error('saveFile is not supported in H5 environment');
    },

    async getFileInfo(): Promise<Taro.getFileInfo.SuccessCallbackResult> {
      throw new Error('getFileInfo is not supported in H5 environment');
    },

    async getSavedFileList(): Promise<Taro.getSavedFileList.SuccessCallbackResult> {
      throw new Error('getSavedFileList is not supported in H5 environment');
    },

    async removeSavedFile(): Promise<void> {
      throw new Error('removeSavedFile is not supported in H5 environment');
    },
  };
}

// ==================== React Native适配器 ====================

class RNAdapter implements PlatformAdapter {
  getPlatformInfo(): PlatformInfo {
    const system = Taro.getSystemInfoSync();

    return {
      platform: 'rn',
      isMiniProgram: false,
      isH5: false,
      isRN: true,
      system,
    };
  }

  /** Headers对象转普通对象 */
  private headersToObject(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  async request<T = any>(config: RequestConfig): Promise<RequestResponse<T>> {
    // 使用React Native的fetch实现
    const url = new URL(config.url);

    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const options: RequestInit = {
      method: config.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.header,
      },
    };

    if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method || 'GET')) {
      options.body = JSON.stringify(config.data);
    }

    try {
      const response = await fetch(url.toString(), options);
      const data = await response.json();

      return {
        data,
        statusCode: response.status,
        statusMessage: response.statusText,
        header: this.headersToObject(response.headers),
      };
    } catch (error) {
      const requestError: RequestError = {
        message: error instanceof Error ? error.message : 'Network error',
        detail: error,
      };
      throw requestError;
    }
  }

  // React Native的存储实现需要使用AsyncStorage
  storage = {
    async set(_key: string, _value: any): Promise<void> {
      // 这里需要导入AsyncStorage
      // const { AsyncStorage } = require('react-native')
      // await AsyncStorage.setItem(key, JSON.stringify(value))
      throw new Error('AsyncStorage not implemented');
    },

    async get(_key: string): Promise<any> {
      // const { AsyncStorage } = require('react-native')
      // const value = await AsyncStorage.getItem(key)
      // return value ? JSON.parse(value) : null
      throw new Error('AsyncStorage not implemented');
    },

    async remove(_key: string): Promise<void> {
      // const { AsyncStorage } = require('react-native')
      // await AsyncStorage.removeItem(key)
      throw new Error('AsyncStorage not implemented');
    },

    async clear(): Promise<void> {
      // const { AsyncStorage } = require('react-native')
      // await AsyncStorage.clear()
      throw new Error('AsyncStorage not implemented');
    },

    async getInfo(): Promise<{ currentSize: number; limitSize: number }> {
      throw new Error('Storage info not available in React Native');
    },
  };

  // 其他React Native平台的实现...
  // 由于React Native的API实现较为复杂，这里只提供基础框架
  location = {
    async getCurrentPosition(): Promise<Taro.getLocation.SuccessCallbackResult> {
      throw new Error('Location service not implemented');
    },

    async openLocation(): Promise<void> {
      throw new Error('openLocation not implemented');
    },

    async chooseLocation(): Promise<Taro.chooseLocation.SuccessCallbackResult> {
      throw new Error('chooseLocation not implemented');
    },
  };

  camera = {
    async takePhoto(): Promise<any> {
      throw new Error('Camera service not implemented');
    },

    async chooseImage(): Promise<Taro.chooseImage.SuccessCallbackResult> {
      throw new Error('chooseImage not implemented');
    },

    async chooseVideo(): Promise<Taro.chooseVideo.SuccessCallbackResult> {
      throw new Error('chooseVideo not implemented');
    },
  };

  payment = {
    async requestPayment(): Promise<void> {
      throw new Error('Payment service not implemented');
    },
  };

  share = {
    async shareAppMessage(): Promise<void> {
      throw new Error('Share service not implemented');
    },

    async shareToTimeline(): Promise<void> {
      throw new Error('Share service not implemented');
    },
  };

  biometrics = {
    async checkIsAvailable(): Promise<boolean> {
      throw new Error('Biometric service not implemented');
    },

    async startVerify(): Promise<Taro.startSoterAuthentication.SuccessCallbackResult> {
      throw new Error('Biometric service not implemented');
    },
  };

  system = {
    async getSystemInfo(): Promise<Taro.getSystemInfoSync.Result> {
      return Promise.resolve(Taro.getSystemInfoSync());
    },

    async getNetworkType(): Promise<Taro.getNetworkType.SuccessCallbackResult> {
      throw new Error('Network type service not implemented');
    },

    async getBatteryInfo(): Promise<Taro.getBatteryInfo.SuccessCallbackResult> {
      throw new Error('Battery service not implemented');
    },

    async getScreenBrightness(): Promise<number> {
      throw new Error('Screen brightness service not implemented');
    },

    async setScreenBrightness(): Promise<void> {
      throw new Error('Screen brightness service not implemented');
    },

    async keepScreenOn(): Promise<void> {
      throw new Error('Keep screen on service not implemented');
    },

    async vibrate(): Promise<void> {
      throw new Error('Vibrate service not implemented');
    },
  };

  clipboard = {
    async set(_text: string): Promise<void> {
      throw new Error('Clipboard service not implemented');
    },

    async get(): Promise<string> {
      throw new Error('Clipboard service not implemented');
    },
  };

  scan = {
    async scanCode(): Promise<Taro.scanCode.SuccessCallbackResult> {
      throw new Error('Scan service not implemented');
    },
  };

  file = {
    async saveFile(): Promise<Taro.saveFile.SuccessCallbackResult> {
      throw new Error('File service not implemented');
    },

    async getFileInfo(): Promise<Taro.getFileInfo.SuccessCallbackResult> {
      throw new Error('File service not implemented');
    },

    async getSavedFileList(): Promise<Taro.getSavedFileList.SuccessCallbackResult> {
      throw new Error('File service not implemented');
    },

    async removeSavedFile(): Promise<void> {
      throw new Error('File service not implemented');
    },
  };
}

// ==================== 平台管理器 ====================

/** 平台管理器 */
export class PlatformManager {
  private static instance: PlatformManager;
  private adapter: PlatformAdapter;
  private platformInfo: PlatformInfo;

  private constructor() {
    const platform = this.detectPlatform();
    this.adapter = this.createAdapter(platform);
    this.platformInfo = this.adapter.getPlatformInfo();
  }

  /** 获取单例实例 */
  static getInstance(): PlatformManager {
    if (!PlatformManager.instance) {
      PlatformManager.instance = new PlatformManager();
    }
    return PlatformManager.instance;
  }

  /** 检测当前平台 */
  private detectPlatform(): Platform {
    if (typeof window !== 'undefined' && window.wx && (window.wx as any).getSystemInfo) {
      return 'weapp';
    } else if (typeof window !== 'undefined' && window.my && (window.my as any).getSystemInfo) {
      return 'alipay';
    } else if (typeof window !== 'undefined' && window.swan && (window.swan as any).getSystemInfo) {
      return 'swan';
    } else if (typeof window !== 'undefined' && window.tt && (window.tt as any).getSystemInfo) {
      return 'tt';
    } else if (typeof window !== 'undefined' && window.qq && (window.qq as any).getSystemInfo) {
      return 'qq';
    } else if (typeof window !== 'undefined' && window.jd && (window.jd as any).getSystemInfo) {
      return 'jd';
    } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return 'rn';
    } else {
      return 'h5';
    }
  }

  /** 创建平台适配器 */
  private createAdapter(platform: Platform): PlatformAdapter {
    switch (platform) {
      case 'weapp':
        return new WeappAdapter();
      case 'alipay':
        // 支付宝小程序适配器与微信类似，这里使用相同的实现
        return new WeappAdapter();
      case 'swan':
        // 百度小程序适配器与微信类似，这里使用相同的实现
        return new WeappAdapter();
      case 'tt':
        // 字节跳动小程序适配器与微信类似，这里使用相同的实现
        return new WeappAdapter();
      case 'qq':
        // QQ小程序适配器与微信类似，这里使用相同的实现
        return new WeappAdapter();
      case 'jd':
        // 京东小程序适配器与微信类似，这里使用相同的实现
        return new WeappAdapter();
      case 'h5':
        return new H5Adapter();
      case 'rn':
        return new RNAdapter();
      default:
        return new H5Adapter(); // 默认使用H5适配器
    }
  }

  /** 获取平台适配器 */
  getAdapter(): PlatformAdapter {
    return this.adapter;
  }

  /** 获取平台信息 */
  getPlatformInfo(): PlatformInfo {
    return this.platformInfo;
  }

  /** 获取当前平台 */
  getPlatform(): Platform {
    return this.platformInfo.platform;
  }

  /** 判断是否为指定平台 */
  isPlatform(targetPlatform: Platform): boolean {
    return this.platformInfo.platform === targetPlatform;
  }

  /** 判断是否为小程序环境 */
  isMiniProgram(): boolean {
    return this.platformInfo.isMiniProgram;
  }

  /** 判断是否为H5环境 */
  isH5(): boolean {
    return this.platformInfo.isH5;
  }

  /** 判断是否为React Native环境 */
  isRN(): boolean {
    return this.platformInfo.isRN;
  }

  /** 检查功能支持 */
  isFeatureSupported(feature: keyof typeof PLATFORM_FEATURES.weapp): boolean {
    const platform = this.platformInfo.platform;
    return PLATFORM_FEATURES[platform]?.[feature] || false;
  }

  /** 获取平台API映射 */
  getPlatformAPIs(): typeof PLATFORM_APIS.weapp {
    const platform = this.platformInfo.platform;
    return PLATFORM_APIS[platform] || PLATFORM_APIS.h5;
  }

  /** 获取平台名称 */
  getPlatformName(): string {
    const platform = this.platformInfo.platform;
    return PLATFORM_NAMES[platform] || 'Unknown';
  }

  /** 重置平台管理器（主要用于测试） */
  reset(): void {
    PlatformManager.instance = new PlatformManager();
  }
}

// ==================== 导出平台工具 ====================

/** 创建平台管理器实例 */
export const platformManager = PlatformManager.getInstance();

/** 导出平台适配器 */
export const platformAdapter = platformManager.getAdapter();

/** 导出平台检测工具 */
export const platformUtils = {
  getPlatform: () => platformManager.getPlatform(),
  getPlatformInfo: () => platformManager.getPlatformInfo(),
  isPlatform: (platform: Platform) => platformManager.isPlatform(platform),
  isMiniProgram: () => platformManager.isMiniProgram(),
  isH5: () => platformManager.isH5(),
  isRN: () => platformManager.isRN(),
  isFeatureSupported: (feature: keyof typeof PLATFORM_FEATURES.weapp) => platformManager.isFeatureSupported(feature),
  getPlatformAPIs: () => platformManager.getPlatformAPIs(),
  getPlatformName: () => platformManager.getPlatformName(),
};

/** 导出快捷方法 */
export const {
  getPlatform,
  getPlatformInfo,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isFeatureSupported,
  getPlatformAPIs,
  getPlatformName,
} = platformUtils;

// 类型已经在前面导出，这里不需要重复导出
