/**
 * 存储工具
 * 提供跨平台的存储功能，自动适配 localStorage 和 Taro.setStorage
 */

import Taro from '@tarojs/taro';
import { getPlatformType } from './platform';

/** 存储选项 */
export interface StorageOptions {
  /** 过期时间（毫秒） */
  expires?: number;
  /** 是否加密（预留） */
  encrypt?: boolean;
}

/** 存储项数据结构 */
interface StorageItem<T> {
  value: T;
  expires?: number;
  timestamp: number;
}

// ==================== 内部工具函数 ====================

/**
 * 判断是否使用 Web Storage
 */
function shouldUseWebStorage(): boolean {
  const platform = getPlatformType();
  return platform === 'h5' && typeof localStorage !== 'undefined';
}

/**
 * 序列化数据
 */
function serialize<T>(value: T, options?: StorageOptions): string {
  const item: StorageItem<T> = {
    value,
    timestamp: Date.now(),
  };

  if (options?.expires) {
    item.expires = Date.now() + options.expires;
  }

  return JSON.stringify(item);
}

/**
 * 反序列化数据
 */
function deserialize<T>(data: string): StorageItem<T> | null {
  try {
    return JSON.parse(data) as StorageItem<T>;
  } catch {
    return null;
  }
}

/**
 * 检查是否过期
 */
function isExpired(item: StorageItem<unknown>): boolean {
  if (!item.expires) {
    return false;
  }
  return Date.now() > item.expires;
}

// ==================== 同步存储 API ====================

/**
 * 同步设置存储
 *
 * @example
 * ```typescript
 * setStorageSync('user', { name: 'John' });
 * setStorageSync('token', 'xxx', { expires: 3600000 }); // 1小时后过期
 * ```
 */
export function setStorageSync<T>(
  key: string,
  value: T,
  options?: StorageOptions,
): void {
  const data = serialize(value, options);

  if (shouldUseWebStorage()) {
    localStorage.setItem(key, data);
  } else {
    Taro.setStorageSync(key, data);
  }
}

/**
 * 同步获取存储
 *
 * @example
 * ```typescript
 * const user = getStorageSync<User>('user');
 * ```
 */
export function getStorageSync<T>(key: string): T | null {
  let data: string | null = null;

  if (shouldUseWebStorage()) {
    data = localStorage.getItem(key);
  } else {
    try {
      data = Taro.getStorageSync(key) as string;
    } catch {
      return null;
    }
  }

  if (!data) {
    return null;
  }

  const item = deserialize<T>(data);
  if (!item) {
    return null;
  }

  // 检查过期
  if (isExpired(item)) {
    removeStorageSync(key);
    return null;
  }

  return item.value;
}

/**
 * 同步删除存储
 *
 * @example
 * ```typescript
 * removeStorageSync('user');
 * ```
 */
export function removeStorageSync(key: string): void {
  if (shouldUseWebStorage()) {
    localStorage.removeItem(key);
  } else {
    Taro.removeStorageSync(key);
  }
}

/**
 * 同步清空存储
 *
 * @example
 * ```typescript
 * clearStorageSync();
 * ```
 */
export function clearStorageSync(): void {
  if (shouldUseWebStorage()) {
    localStorage.clear();
  } else {
    Taro.clearStorageSync();
  }
}

/**
 * 同步获取存储信息
 */
export function getStorageInfoSync(): {
  keys: string[];
  currentSize: number;
  limitSize: number;
} {
  if (shouldUseWebStorage()) {
    const keys: string[] = [];
    let currentSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
        const value = localStorage.getItem(key);
        if (value) {
          currentSize += value.length * 2; // UTF-16 编码
        }
      }
    }

    return {
      keys,
      currentSize: Math.round(currentSize / 1024), // KB
      limitSize: 5 * 1024, // 5MB
    };
  }

  const info = Taro.getStorageInfoSync();
  return {
    keys: info.keys,
    currentSize: info.currentSize,
    limitSize: info.limitSize,
  };
}

// ==================== 异步存储 API ====================

/**
 * 异步设置存储
 *
 * @example
 * ```typescript
 * await setStorage('user', { name: 'John' });
 * ```
 */
export async function setStorage<T>(
  key: string,
  value: T,
  options?: StorageOptions,
): Promise<void> {
  const data = serialize(value, options);

  if (shouldUseWebStorage()) {
    localStorage.setItem(key, data);
    return;
  }

  await Taro.setStorage({ key, data });
}

/**
 * 异步获取存储
 *
 * @example
 * ```typescript
 * const user = await getStorage<User>('user');
 * ```
 */
export async function getStorage<T>(key: string): Promise<T | null> {
  let data: string | null = null;

  if (shouldUseWebStorage()) {
    data = localStorage.getItem(key);
  } else {
    try {
      const result = await Taro.getStorage({ key });
      data = result.data as string;
    } catch {
      return null;
    }
  }

  if (!data) {
    return null;
  }

  const item = deserialize<T>(data);
  if (!item) {
    return null;
  }

  // 检查过期
  if (isExpired(item)) {
    await removeStorage(key);
    return null;
  }

  return item.value;
}

/**
 * 异步删除存储
 *
 * @example
 * ```typescript
 * await removeStorage('user');
 * ```
 */
export async function removeStorage(key: string): Promise<void> {
  if (shouldUseWebStorage()) {
    localStorage.removeItem(key);
    return;
  }

  await Taro.removeStorage({ key });
}

/**
 * 异步清空存储
 *
 * @example
 * ```typescript
 * await clearStorage();
 * ```
 */
export async function clearStorage(): Promise<void> {
  if (shouldUseWebStorage()) {
    localStorage.clear();
    return;
  }

  await Taro.clearStorage();
}

/**
 * 异步获取存储信息
 */
export async function getStorageInfo(): Promise<{
  keys: string[];
  currentSize: number;
  limitSize: number;
}> {
  if (shouldUseWebStorage()) {
    return getStorageInfoSync();
  }

  const info = await Taro.getStorageInfo();
  const storageInfo = info as unknown as { keys: string[]; currentSize: number; limitSize: number };
  return {
    keys: storageInfo.keys,
    currentSize: storageInfo.currentSize,
    limitSize: storageInfo.limitSize,
  };
}

// ==================== 高级存储功能 ====================

/**
 * 检查存储项是否存在
 */
export function hasStorageSync(key: string): boolean {
  return getStorageSync(key) !== null;
}

/**
 * 异步检查存储项是否存在
 */
export async function hasStorage(key: string): Promise<boolean> {
  return (await getStorage(key)) !== null;
}

/**
 * 获取存储项的剩余有效时间（毫秒）
 * 返回 -1 表示永不过期，返回 0 表示已过期或不存在
 */
export function getStorageTTLSync(key: string): number {
  let data: string | null = null;

  if (shouldUseWebStorage()) {
    data = localStorage.getItem(key);
  } else {
    try {
      data = Taro.getStorageSync(key) as string;
    } catch {
      return 0;
    }
  }

  if (!data) {
    return 0;
  }

  const item = deserialize<unknown>(data);
  if (!item) {
    return 0;
  }

  if (!item.expires) {
    return -1;
  }

  const ttl = item.expires - Date.now();
  return ttl > 0 ? ttl : 0;
}

/**
 * 更新存储项的过期时间
 */
export function updateStorageExpiresSync<T>(
  key: string,
  expires: number,
): boolean {
  const value = getStorageSync<T>(key);
  if (value === null) {
    return false;
  }

  setStorageSync(key, value, { expires });
  return true;
}

/**
 * 创建带命名空间的存储
 *
 * @example
 * ```typescript
 * const userStorage = createNamespacedStorage('user');
 * userStorage.set('profile', { name: 'John' });
 * const profile = userStorage.get('profile');
 * ```
 */
export function createNamespacedStorage(namespace: string): {
  set: <T>(key: string, value: T, options?: StorageOptions) => void;
  get: <T>(key: string) => T | null;
  remove: (key: string) => void;
  clear: () => void;
  has: (key: string) => boolean;
  keys: () => string[];
} {
  const prefix = `${namespace}:`;

  return {
    set: <T>(key: string, value: T, options?: StorageOptions) => {
      setStorageSync(`${prefix}${key}`, value, options);
    },
    get: <T>(key: string) => {
      return getStorageSync<T>(`${prefix}${key}`);
    },
    remove: (key: string) => {
      removeStorageSync(`${prefix}${key}`);
    },
    clear: () => {
      const info = getStorageInfoSync();
      info.keys
        .filter(k => k.startsWith(prefix))
        .forEach(k => removeStorageSync(k));
    },
    has: (key: string) => {
      return hasStorageSync(`${prefix}${key}`);
    },
    keys: () => {
      const info = getStorageInfoSync();
      return info.keys
        .filter(k => k.startsWith(prefix))
        .map(k => k.slice(prefix.length));
    },
  };
}

/**
 * 批量设置存储
 */
export function setStorageBatchSync(
  items: Array<{ key: string; value: unknown; options?: StorageOptions }>,
): void {
  items.forEach(({ key, value, options }) => {
    setStorageSync(key, value, options);
  });
}

/**
 * 批量获取存储
 */
export function getStorageBatchSync<T extends Record<string, unknown>>(
  keys: (keyof T)[],
): Partial<T> {
  const result: Partial<T> = {};
  keys.forEach(key => {
    const value = getStorageSync<T[typeof key]>(key as string);
    if (value !== null) {
      result[key] = value;
    }
  });
  return result;
}

/**
 * 批量删除存储
 */
export function removeStorageBatchSync(keys: string[]): void {
  keys.forEach(key => removeStorageSync(key));
}

// ==================== Session Storage (仅 H5) ====================

/**
 * 设置 Session Storage（仅 H5 有效）
 */
export function setSessionStorageSync<T>(key: string, value: T): void {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 获取 Session Storage（仅 H5 有效）
 */
export function getSessionStorageSync<T>(key: string): T | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  const data = sessionStorage.getItem(key);
  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

/**
 * 删除 Session Storage（仅 H5 有效）
 */
export function removeSessionStorageSync(key: string): void {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(key);
  }
}

/**
 * 清空 Session Storage（仅 H5 有效）
 */
export function clearSessionStorageSync(): void {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.clear();
  }
}

// ==================== 默认导出 ====================

export default {
  // 同步 API
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
  getStorageInfoSync,
  // 异步 API
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getStorageInfo,
  // 高级功能
  hasStorageSync,
  hasStorage,
  getStorageTTLSync,
  updateStorageExpiresSync,
  createNamespacedStorage,
  setStorageBatchSync,
  getStorageBatchSync,
  removeStorageBatchSync,
  // Session Storage
  setSessionStorageSync,
  getSessionStorageSync,
  removeSessionStorageSync,
  clearSessionStorageSync,
};
