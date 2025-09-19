/**
 * 环境变量类型定义
 */

declare global {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'tt' | 'qq' | 'h5' | 'rn' | 'quickapp';
    VITE_APP_ENV: string;
    npm_package_version: string;
    [key: string]: string | undefined;
  }
}

// 扩展NodeJS ProcessEnv
declare namespace NodeJS {
  interface ProcessEnv extends ProcessEnv {}
}

export {};