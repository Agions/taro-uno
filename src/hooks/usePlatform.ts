import { useState, useEffect } from 'react';
import * as Taro from '@tarojs/taro';

/**
 * 获取当前平台信息
 * @returns 当前平台类型
 */
export const usePlatform = () => {
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    const detectEnv = (): string => {
      try {
        if (typeof Taro.getEnv === 'function') {
          const env = String(Taro.getEnv()).toLowerCase();
          return env as any;
        }
      } catch {
        // ignore
      }

      if (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.TARO_ENV) {
        return (import.meta as any).env.TARO_ENV as string;
      }

      if (typeof process !== 'undefined' && process.env && process.env['TARO_ENV']) {
        return process.env['TARO_ENV'] as string;
      }

      return 'h5';
    };

    setPlatform(detectEnv());
  }, []);

  return platform;
};

/**
 * 检查是否为H5平台
 * @returns 是否为H5平台
 */
export const useIsH5 = () => {
  const platform = usePlatform();
  return platform === 'h5';
};

/**
 * 检查是否为小程序平台
 * @returns 是否为小程序平台
 */
export const useIsMiniProgram = () => {
  const platform = usePlatform();
  return ['weapp', 'swan', 'alipay', 'tt', 'qq'].includes(platform);
};

/**
 * 检查是否为React Native平台
 * @returns 是否为React Native平台
 */
export const useIsReactNative = () => {
  const platform = usePlatform();
  return platform === 'rn';
};
