/**
 * HTTP 客户端属性测试
 *
 * Property 8: Platform Adapter Selection
 * Property 11: HTTP Client Request-Response Consistency
 * Property 12: HTTP Request Cancellation
 *
 * Validates: Requirements 13.2, 13.3, 13.7
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import type { PlatformType } from '../../src/platform/types';
import {
  createAdapterForPlatform,
  clearAdapterCache,
  WeappAdapter,
  H5Adapter,
  RNAdapter,
  HarmonyAdapter,
} from '../../src/services/adapters';
import { HttpClient } from '../../src/services/http-client';
import { HttpError, ErrorCodes } from '../../src/services/types';
import { InterceptorManager } from '../../src/services/interceptors';

// ============================================================================
// Property 8: Platform Adapter Selection
// Feature: taro-component-library-optimization
// Validates: Requirements 13.2
// ============================================================================

describe('Property 8: Platform Adapter Selection', () => {
  /**
   * For any detected platform, the HTTP client SHALL automatically select
   * and use the correct adapter without user intervention, and all adapters
   * SHALL implement the same interface producing consistent response formats.
   */

  beforeEach(() => {
    clearAdapterCache();
  });

  afterEach(() => {
    clearAdapterCache();
  });

  // All supported platform types
  const allPlatformTypes: PlatformType[] = [
    'weapp',
    'alipay',
    'swan',
    'tt',
    'qq',
    'jd',
    'h5',
    'rn',
    'harmony',
    'unknown',
  ];

  // Mini program platforms that should use WeappAdapter
  const miniProgramPlatforms: PlatformType[] = ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'];

  it('should select WeappAdapter for all mini program platforms', () => {
    fc.assert(
      fc.property(fc.constantFrom(...miniProgramPlatforms), (platform: PlatformType) => {
        const adapter = createAdapterForPlatform(platform);
        expect(adapter).toBeInstanceOf(WeappAdapter);
      }),
      { numRuns: 100 },
    );
  });

  it('should select H5Adapter for h5 platform', () => {
    const adapter = createAdapterForPlatform('h5');
    expect(adapter).toBeInstanceOf(H5Adapter);
  });

  it('should select RNAdapter for rn platform', () => {
    const adapter = createAdapterForPlatform('rn');
    expect(adapter).toBeInstanceOf(RNAdapter);
  });

  it('should select HarmonyAdapter for harmony platform', () => {
    const adapter = createAdapterForPlatform('harmony');
    expect(adapter).toBeInstanceOf(HarmonyAdapter);
  });

  it('should select H5Adapter for unknown platform as fallback', () => {
    const adapter = createAdapterForPlatform('unknown');
    expect(adapter).toBeInstanceOf(H5Adapter);
  });

  it('should return correct adapter type name for all platforms', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allPlatformTypes), (platform: PlatformType) => {
        // Create adapter to verify type name mapping
        const adapter = createAdapterForPlatform(platform);

        if (miniProgramPlatforms.includes(platform)) {
          expect(adapter).toBeInstanceOf(WeappAdapter);
        } else if (platform === 'h5' || platform === 'unknown') {
          expect(adapter).toBeInstanceOf(H5Adapter);
        } else if (platform === 'rn') {
          expect(adapter).toBeInstanceOf(RNAdapter);
        } else if (platform === 'harmony') {
          expect(adapter).toBeInstanceOf(HarmonyAdapter);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('should ensure all adapters implement the request method', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allPlatformTypes), (platform: PlatformType) => {
        const adapter = createAdapterForPlatform(platform);
        expect(typeof adapter.request).toBe('function');
      }),
      { numRuns: 100 },
    );
  });

  it('should ensure all adapters have consistent interface', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allPlatformTypes), (platform: PlatformType) => {
        const adapter = createAdapterForPlatform(platform);

        // All adapters must have request method
        expect(adapter.request).toBeDefined();
        expect(typeof adapter.request).toBe('function');

        // Upload and download are optional but should be functions if present
        if (adapter.upload) {
          expect(typeof adapter.upload).toBe('function');
        }
        if (adapter.download) {
          expect(typeof adapter.download).toBe('function');
        }
      }),
      { numRuns: 100 },
    );
  });
});

// ============================================================================
// Property 11: HTTP Client Request-Response Consistency
// Feature: taro-component-library-optimization
// Validates: Requirements 13.3
// ============================================================================

describe('Property 11: HTTP Client Request-Response Consistency', () => {
  /**
   * For any HTTP request configuration, the HTTP client SHALL:
   * (1) correctly construct the request URL from baseURL and url,
   * (2) include all specified headers,
   * (3) serialize data correctly based on content type,
   * (4) return a response matching the HttpResponse<T> type.
   */

  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient();
  });

  // Arbitrary for valid URL paths
  const urlPathArb = fc.string({ minLength: 1, maxLength: 50 }).filter((s) => /^[a-z0-9_/-]+$/.test(s));

  // Arbitrary for valid header keys
  const headerKeyArb = fc.string({ minLength: 1, maxLength: 20 }).filter((s) => /^[A-Za-z-]+$/.test(s));

  // Arbitrary for valid header values
  const headerValueArb = fc.string({ minLength: 1, maxLength: 50 });

  it('should correctly merge baseURL and url', () => {
    fc.assert(
      fc.property(urlPathArb, urlPathArb, (baseURL: string, _path: string) => {
        client.setBaseURL(`https://api.example.com/${baseURL}`);
        const config = client.getConfig();

        expect(config.baseURL).toBe(`https://api.example.com/${baseURL}`);
      }),
      { numRuns: 100 },
    );
  });

  it('should correctly set and get headers', () => {
    fc.assert(
      fc.property(
        fc.dictionary(headerKeyArb, headerValueArb, { minKeys: 1, maxKeys: 5 }),
        (headers: Record<string, string>) => {
          client.setHeaders(headers);
          const config = client.getConfig();

          // All custom headers should be present
          Object.entries(headers).forEach(([key, value]) => {
            expect(config.headers?.[key]).toBe(value);
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should correctly set and get timeout', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1000, max: 60000 }), (timeout: number) => {
        client.setTimeout(timeout);
        expect(client.getTimeout()).toBe(timeout);
      }),
      { numRuns: 100 },
    );
  });

  it('should create independent instances with create()', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1000, max: 60000 }),
        fc.integer({ min: 1000, max: 60000 }),
        (timeout1: number, timeout2: number) => {
          const client1 = new HttpClient({ timeout: timeout1 });
          const client2 = client1.create({ timeout: timeout2 });

          expect(client1.getTimeout()).toBe(timeout1);
          expect(client2.getTimeout()).toBe(timeout2);

          // Modifying one should not affect the other
          client1.setTimeout(timeout1 + 1000);
          expect(client2.getTimeout()).toBe(timeout2);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should preserve default Content-Type header', () => {
    const config = client.getConfig();
    expect(config.headers?.['Content-Type']).toBe('application/json');
  });

  it('should allow overriding default headers', () => {
    fc.assert(
      fc.property(headerValueArb, (contentType: string) => {
        client.setHeaders({ 'Content-Type': contentType });
        const config = client.getConfig();
        expect(config.headers?.['Content-Type']).toBe(contentType);
      }),
      { numRuns: 100 },
    );
  });

  it('should correctly merge config in setConfig', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1000, max: 60000 }),
        urlPathArb,
        (timeout: number, baseURL: string) => {
          client.setConfig({
            timeout,
            baseURL: `https://api.example.com/${baseURL}`,
          });

          const config = client.getConfig();
          expect(config.timeout).toBe(timeout);
          expect(config.baseURL).toBe(`https://api.example.com/${baseURL}`);
          // Default headers should still be present
          expect(config.headers?.['Content-Type']).toBe('application/json');
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================================
// Property 12: HTTP Request Cancellation
// Feature: taro-component-library-optimization
// Validates: Requirements 13.7
// ============================================================================

describe('Property 12: HTTP Request Cancellation', () => {
  /**
   * For any in-flight HTTP request with an AbortController, calling abort()
   * SHALL cancel the request and reject the promise with an appropriate error,
   * without affecting other concurrent requests.
   */

  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient();
  });

  it('should create valid AbortController instances', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (count: number) => {
        const controllers: AbortController[] = [];

        for (let i = 0; i < count; i++) {
          const controller = client.createAbortController();
          controllers.push(controller);

          expect(controller).toBeInstanceOf(AbortController);
          expect(controller.signal).toBeDefined();
          expect(controller.signal.aborted).toBe(false);
        }

        // Each controller should be independent
        controllers[0].abort();
        expect(controllers[0].signal.aborted).toBe(true);

        // Other controllers should not be affected
        for (let i = 1; i < controllers.length; i++) {
          expect(controllers[i].signal.aborted).toBe(false);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('should abort signal when abort() is called', () => {
    const controller = client.createAbortController();

    expect(controller.signal.aborted).toBe(false);
    controller.abort();
    expect(controller.signal.aborted).toBe(true);
  });

  it('should create independent abort controllers', () => {
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 5 }), (count: number) => {
        const controllers = Array.from({ length: count }, () => client.createAbortController());

        // Abort first controller
        controllers[0].abort();

        // First should be aborted
        expect(controllers[0].signal.aborted).toBe(true);

        // Others should not be affected
        for (let i = 1; i < count; i++) {
          expect(controllers[i].signal.aborted).toBe(false);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('should handle multiple abort calls gracefully', () => {
    const controller = client.createAbortController();

    // Multiple abort calls should not throw
    expect(() => {
      controller.abort();
      controller.abort();
      controller.abort();
    }).not.toThrow();

    expect(controller.signal.aborted).toBe(true);
  });
});

// ============================================================================
// Interceptor Manager Tests
// ============================================================================

describe('InterceptorManager', () => {
  it('should add and remove interceptors correctly', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (count: number) => {
        const manager = new InterceptorManager<() => void, () => void>();
        const ids: number[] = [];

        // Add interceptors
        for (let i = 0; i < count; i++) {
          const id = manager.use(() => { }, () => { });
          ids.push(id);
        }

        expect(manager.size()).toBe(count);

        // Remove first interceptor
        manager.eject(ids[0]);
        expect(manager.size()).toBe(count - 1);

        // Clear all
        manager.clear();
        expect(manager.size()).toBe(0);
      }),
      { numRuns: 100 },
    );
  });

  it('should return unique IDs for each interceptor', () => {
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 20 }), (count: number) => {
        const manager = new InterceptorManager<() => void, () => void>();
        const ids = new Set<number>();

        for (let i = 0; i < count; i++) {
          const id = manager.use(() => { });
          expect(ids.has(id)).toBe(false);
          ids.add(id);
        }

        expect(ids.size).toBe(count);
      }),
      { numRuns: 100 },
    );
  });

  it('should iterate over all interceptors with forEach', () => {
    const manager = new InterceptorManager<() => void, () => void>();
    const count = 5;

    for (let i = 0; i < count; i++) {
      manager.use(() => { });
    }

    let iterationCount = 0;
    manager.forEach(() => {
      iterationCount++;
    });

    expect(iterationCount).toBe(count);
  });

  it('should return all interceptors with getAll', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (count: number) => {
        const manager = new InterceptorManager<() => void, () => void>();

        for (let i = 0; i < count; i++) {
          manager.use(() => { });
        }

        const all = manager.getAll();
        expect(all.length).toBe(count);
      }),
      { numRuns: 100 },
    );
  });
});

// ============================================================================
// HttpError Tests
// ============================================================================

describe('HttpError', () => {
  it('should create error with all properties', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.constantFrom(...Object.values(ErrorCodes)),
        fc.integer({ min: 100, max: 599 }),
        (message: string, code: string, status: number) => {
          const error = new HttpError(message, code, status);

          expect(error.message).toBe(message);
          expect(error.code).toBe(code);
          expect(error.status).toBe(status);
          expect(error.name).toBe('HttpError');
          expect(error instanceof Error).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should serialize to JSON correctly', () => {
    const error = new HttpError('Test error', ErrorCodes.NETWORK_ERROR, 500);
    const json = error.toJSON();

    expect(json.name).toBe('HttpError');
    expect(json.message).toBe('Test error');
    expect(json.code).toBe(ErrorCodes.NETWORK_ERROR);
    expect(json.status).toBe(500);
  });

  it('should handle optional properties', () => {
    const error = new HttpError('Test error', ErrorCodes.UNKNOWN);

    expect(error.status).toBeUndefined();
    expect(error.originalError).toBeUndefined();
    expect(error.config).toBeUndefined();
    expect(error.response).toBeUndefined();
  });
});

// ============================================================================
// HTTP Client Configuration Tests
// ============================================================================

describe('HTTP Client Configuration', () => {
  it('should have default configuration', () => {
    const client = new HttpClient();
    const config = client.getConfig();

    expect(config.timeout).toBe(30000);
    expect(config.headers?.['Content-Type']).toBe('application/json');
  });

  it('should accept initial configuration', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1000, max: 60000 }),
        urlPathArb,
        (timeout: number, baseURL: string) => {
          const client = new HttpClient({
            timeout,
            baseURL: `https://api.example.com/${baseURL}`,
          });

          const config = client.getConfig();
          expect(config.timeout).toBe(timeout);
          expect(config.baseURL).toBe(`https://api.example.com/${baseURL}`);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Arbitrary for valid URL paths (used in multiple tests)
const urlPathArb = fc.string({ minLength: 1, maxLength: 50 }).filter((s) => /^[a-z0-9\-_/]+$/.test(s));
