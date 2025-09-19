import { useState, useEffect } from 'react';

/**
 * 获取当前平台信息
 * @returns 当前平台类型
 */
export const usePlatform = () => {
  const [platform, setPlatform] = useState < string > ('');

  useEffect(() => {
    // @ts-ignore
    const taroEnv = process.env.TARO_ENV;
    setPlatform(taroEnv || 'h5');
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
