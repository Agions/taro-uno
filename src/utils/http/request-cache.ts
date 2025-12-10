/**
 * Request Cache Manager
 * Provides intelligent request caching and deduplication
 */

export interface CacheConfig {
  /** Cache time to live in milliseconds */
  ttl?: number;
  /** Cache key generator function */
  keyGenerator?: (url: string, params?: any) => string;
  /** Whether to enable cache */
  enabled?: boolean;
}

export interface CachedResponse<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class RequestCache {
  private cache = new Map<string, CachedResponse<any>>();
  private pendingRequests = new Map<string, Promise<any>>();

  /**
   * Generate cache key from request config
   */
  generateKey(url: string, params?: any): string {
    const paramStr = params ? JSON.stringify(params) : '';
    return `${url}:${paramStr}`;
  }

  /**
   * Get cached response if valid
   */
  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  /**
   * Set cache entry
   */
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Check if request is already in flight
   */
  hasPendingRequest(key: string): boolean {
    return this.pendingRequests.has(key);
  }

  /**
   * Get pending request promise
   */
  getPendingRequest<T>(key: string): Promise<T> | undefined {
    return this.pendingRequests.get(key);
  }

  /**
   * Set pending request
   */
  setPendingRequest<T>(key: string, promise: Promise<T>): void {
    this.pendingRequests.set(key, promise);

    // Clean up after promise settles
    promise
      .finally(() => {
        this.pendingRequests.delete(key);
      })
      .catch(() => {
        // Ignore errors - they'll be handled by the caller
      });
  }

  /**
   * Clear specific cache entry
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Clear expired entries
   */
  clearExpired(): void {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > cached.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      pending: this.pendingRequests.size,
    };
  }
}

export const globalRequestCache = new RequestCache();
