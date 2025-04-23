import Taro from '@tarojs/taro';

// 平台类型
export enum Platform {
  WEB = 'web',
  WEAPP = 'weapp', // 微信小程序
  ALIPAY = 'alipay', // 支付宝小程序
  TT = 'tt', // 字节跳动小程序
  SWAN = 'swan', // 百度小程序
  QQ = 'qq', // QQ小程序
  JD = 'jd', // 京东小程序
  RN = 'rn', // React Native
  HARMONY = 'harmony', // 鸿蒙
  UNKNOWN = 'unknown'
}

// 获取当前平台
export function getPlatform(): Platform {
  try {
    const platform = process.env.TARO_ENV;
    if (platform) {
      return platform as Platform;
    }
    
    // 根据API可用性判断平台
    if (typeof Taro.getSystemInfoSync === 'function') {
      const info = Taro.getSystemInfoSync();
      
      if (info.platform === 'devtools') {
        return Platform.WEAPP;
      }
      
      if (info.platform === 'Android' || info.platform === 'iOS') {
        // 根据特定API判断是否为RN环境
        if (typeof global !== 'undefined' && global.__fbBatchedBridge) {
          return Platform.RN;
        }
        return Platform.WEB;
      }
    }
    
    // 浏览器环境
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      return Platform.WEB;
    }
    
    return Platform.UNKNOWN;
  } catch (e) {
    // 默认返回web环境
    return Platform.WEB;
  }
}

// 判断是否为小程序环境
export function isMiniApp(): boolean {
  const platform = getPlatform();
  return [
    Platform.WEAPP,
    Platform.ALIPAY,
    Platform.TT,
    Platform.SWAN,
    Platform.QQ,
    Platform.JD
  ].includes(platform);
}

// 判断是否为Web环境
export function isWeb(): boolean {
  return getPlatform() === Platform.WEB;
}

// 判断是否为React Native环境
export function isRN(): boolean {
  return getPlatform() === Platform.RN;
}

// 判断是否为鸿蒙环境
export function isHarmony(): boolean {
  return getPlatform() === Platform.HARMONY;
}

// 平台特定代码执行
export function platformSpecific<T>(options: {
  web?: () => T;
  weapp?: () => T;
  alipay?: () => T;
  tt?: () => T;
  swan?: () => T;
  qq?: () => T;
  jd?: () => T;
  rn?: () => T;
  harmony?: () => T;
  default?: () => T;
}): T | undefined {
  const platform = getPlatform();
  
  if (options[platform]) {
    return options[platform]!();
  }
  
  if (options.default) {
    return options.default();
  }
  
  return undefined;
} 