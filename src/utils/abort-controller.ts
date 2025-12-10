/**
 * AbortController 兼容层
 * 为小程序等不支持原生 AbortController 的环境提供兼容实现
 */
import { PlatformDetector } from './index';

// 定义 AbortSignal 接口
interface AbortSignal {
  aborted: boolean;
  onabort?: () => void;
}

// 定义兼容的 AbortController 接口
export interface CompatibleAbortController {
  signal: AbortSignal;
  abort: () => void;
}

/**
 * 创建兼容的 AbortController
 * 在支持原生 AbortController 的环境中使用原生实现
 * 在小程序等环境中使用模拟实现
 */
export function createAbortController(): CompatibleAbortController {
  // 如果是小程序环境，使用模拟实现
  if (PlatformDetector.isMiniProgram()) {
    return {
      signal: {
        aborted: false,
      },
      abort: () => {
        // 小程序环境下，AbortController 的信号主要用于取消请求
        // 但小程序的 Taro.request 不支持 AbortController，所以这里只做简单标记
        // 实际的请求取消需要在适配器中特殊处理
      },
    };
  }

  // 在 H5 和 React Native 环境中使用原生 AbortController
  return new AbortController() as unknown as CompatibleAbortController;
}

/**
 * 判断是否支持原生 AbortController
 */
export function isAbortControllerSupported(): boolean {
  return typeof AbortController !== 'undefined' && PlatformDetector.isH5();
}
