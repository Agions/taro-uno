/**
 * 测试配置文件
 * 统一管理测试环境和配置
 */

import { vi } from 'vitest'

// 测试环境配置
export const testConfig = {
  // 测试超时时间
  timeout: 10000,
  
  // 测试重试次数
  retry: 3,
  
  // 测试覆盖率阈值
  coverage: {
    branches: 95,
    functions: 95,
    lines: 95,
    statements: 95,
  },
  
  // 测试环境变量
  env: {
    NODE_ENV: 'test',
    TARO_ENV: 'h5',
  },
  
  // 测试工具函数
  utils: {
    // 等待函数
    wait: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // 创建 Mock 函数
    createMockFn: <T extends (...args: any[]) => any>() => vi.fn<T>(),
    
    // 创建 Mock 组件
    createMockComponent: (displayName: string) => {
      const MockComponent = () => null
      MockComponent.displayName = displayName
      return MockComponent
    },
    
    // 模拟异步操作
    simulateAsyncOperation: <T>(data: T, delay: number = 100) => 
      new Promise<T>(resolve => setTimeout(() => resolve(data), delay)),
  },
  
  // 测试数据生成器
  dataGenerators: {
    // 生成随机字符串
    string: (length: number = 10) => 
      Math.random().toString(36).substring(2, length + 2),
    
    // 生成随机数字
    number: (min: number = 0, max: number = 100) => 
      Math.floor(Math.random() * (max - min + 1)) + min,
    
    // 生成随机布尔值
    boolean: () => Math.random() > 0.5,
    
    // 生成随机数组
    array: <T>(generator: () => T, length: number = 5) => 
      Array.from({ length }, generator),
    
    // 生成随机对象
    object: (keys: string[], valueGenerator: () => any) => 
      keys.reduce((obj, key) => {
        obj[key] = valueGenerator()
        return obj
      }, {} as Record<string, any>),
  },
}

// 导出默认配置
export default testConfig