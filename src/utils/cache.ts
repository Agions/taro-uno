/**
 * 简单的数据缓存工具
 */

interface CacheOptions {
  ttl?: number;
  retries?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class DataCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * 获取缓存数据或执行获取函数
   */
  async fetch<T>(key: string, fetcher: () => Promise<T>, options: CacheOptions = {}): Promise<T> {
    const { ttl = 5 * 60 * 1000, retries = 0 } = options;

    // 检查缓存
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data as T;
    }

    // 执行获取函数，带重试
    let lastError: Error | undefined;
    for (let i = 0; i <= retries; i++) {
      try {
        const data = await fetcher();

        // 存入缓存
        this.cache.set(key, {
          data,
          timestamp: Date.now(),
          ttl,
        });

        return data;
      } catch (error) {
        lastError = error as Error;
        if (i < retries) {
          // 等待后重试
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }

    throw lastError || new Error('Failed to fetch data');
  }

  /**
   * 使缓存失效
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存大小
   */
  size(): number {
    return this.cache.size;
  }
}

export const dataFetcher = new DataCache();
