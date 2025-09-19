/**
 * Performance testing setup
 * Provides utilities for performance testing and monitoring
 */

import { vi } from 'vitest';
import { PerformanceObserver, performance } from 'perf_hooks';

// Performance test configuration
export const performanceConfig = {
  thresholds: {
    renderTime: 16, // 60fps target
    interactionTime: 100, // 100ms for interactions
    memoryLeakThreshold: 1024 * 1024, // 1MB
    bundleSizeThreshold: 1024 * 1024, // 1MB
  },
  metrics: {
    renderTime: [],
    interactionTime: [],
    memoryUsage: [],
    bundleSize: [],
  },
};

// Performance monitoring utilities
export const performanceMonitor = {
  // Measure render time
  measureRenderTime: async (component: React.ReactElement, renderCount: number = 1) => {
    const times = [];

    for (let i = 0; i < renderCount; i++) {
      const startTime = performance.now();

      // Create a mock render function
      const mockRender = vi.fn();
      mockRender(component);

      const endTime = performance.now();
      times.push(endTime - startTime);
    }

    return {
      average: times.reduce((a, b) => a + b, 0) / times.length,
      min: Math.min(...times),
      max: Math.max(...times),
      times,
    };
  },

  // Measure interaction time
  measureInteractionTime: async (element: HTMLElement, action: () => Promise<void> | void) => {
    const startTime = performance.now();
    await action();
    const endTime = performance.now();

    return endTime - startTime;
  },

  // Measure memory usage
  measureMemoryUsage: () => {
    if (global.gc) {
      global.gc();
    }

    return {
      used: (global as any).process?.memoryUsage?.().heapUsed || 0,
      total: (global as any).process?.memoryUsage?.().heapTotal || 0,
      external: (global as any).process?.memoryUsage?.().external || 0,
    };
  },

  // Detect memory leaks
  detectMemoryLeaks: async (testFn: () => Promise<void> | void, iterations: number = 5) => {
    const measurements = [];

    for (let i = 0; i < iterations; i++) {
      await testFn();

      if (global.gc) {
        global.gc();
      }

      const memory = this.measureMemoryUsage();
      measurements.push(memory);

      // Small delay to allow for garbage collection
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const initialMemory = measurements[0].used;
    const finalMemory = measurements[measurements.length - 1].used;
    const memoryGrowth = finalMemory - initialMemory;

    return {
      hasLeak: memoryGrowth > performanceConfig.thresholds.memoryLeakThreshold,
      memoryGrowth,
      measurements,
    };
  },

  // Monitor performance metrics
  monitorPerformance: (name: string, threshold: number) => {
    return {
      start: () => {
        performance.mark(`${name}-start`);
      },
      end: () => {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);

        const measures = performance.getEntriesByName(name);
        const lastMeasure = measures[measures.length - 1];

        if (lastMeasure.duration > threshold) {
          console.warn(`Performance warning: ${name} took ${lastMeasure.duration}ms (threshold: ${threshold}ms)`);
        }

        performance.clearMarks(`${name}-start`);
        performance.clearMarks(`${name}-end`);
        performance.clearMeasures(name);

        return lastMeasure.duration;
      },
    };
  },

  // Simulate slow performance
  simulateSlowNetwork: (delay: number) => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockImplementation((...args) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          originalFetch(...args).then(resolve);
        }, delay);
      });
    });
  },

  simulateSlowDevice: (slowdownFactor: number) => {
    const originalSetTimeout = global.setTimeout;
    const originalSetInterval = global.setInterval;

    global.setTimeout = vi.fn().mockImplementation((callback, delay) => {
      return originalSetTimeout(callback, delay * slowdownFactor);
    });

    global.setInterval = vi.fn().mockImplementation((callback, delay) => {
      return originalSetInterval(callback, delay * slowdownFactor);
    });
  },

  simulateLowMemory: () => {
    // Mock low memory conditions
    Object.defineProperty(global, 'performance', {
      value: {
        ...global.performance,
        memory: {
          usedJSHeapSize: 0.9 * 1024 * 1024 * 1024, // 90% of 1GB
          totalJSHeapSize: 1024 * 1024 * 1024, // 1GB
          jsHeapSizeLimit: 1024 * 1024 * 1024, // 1GB
        },
      },
      writable: true,
    });
  },
};

// Performance test utilities
export const performanceUtils = {
  // Benchmark function
  benchmark: async (name: string, fn: () => Promise<void> | void, iterations: number = 100) => {
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      await fn();
      const endTime = performance.now();
      times.push(endTime - startTime);
    }

    const result = {
      name,
      iterations,
      average: times.reduce((a, b) => a + b, 0) / times.length,
      min: Math.min(...times),
      max: Math.max(...times),
      median: times[Math.floor(times.length / 2)],
      p95: times[Math.floor(times.length * 0.95)],
      times,
    };

    // Store metrics
    performanceConfig.metrics[name] = result;

    return result;
  },

  // Memory leak test
  testMemoryLeak: async (name: string, setup: () => Promise<void> | void, cleanup: () => Promise<void> | void) => {
    const measurements = [];

    for (let i = 0; i < 10; i++) {
      await setup();

      const memory = performanceMonitor.measureMemoryUsage();
      measurements.push(memory.used);

      await cleanup();

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const memoryGrowth = measurements[measurements.length - 1] - measurements[0];
    const hasLeak = memoryGrowth > performanceConfig.thresholds.memoryLeakThreshold;

    return {
      name,
      hasLeak,
      memoryGrowth,
      measurements,
      threshold: performanceConfig.thresholds.memoryLeakThreshold,
    };
  },

  // Bundle size analysis
  analyzeBundleSize: (bundle: any) => {
    const size = JSON.stringify(bundle).length;
    const sizeKB = size / 1024;
    const sizeMB = sizeKB / 1024;

    return {
      size,
      sizeKB,
      sizeMB,
      isWithinThreshold: size < performanceConfig.thresholds.bundleSizeThreshold,
      threshold: performanceConfig.thresholds.bundleSizeThreshold,
    };
  },

  // Performance assertion utilities
  expect: {
    renderTimeToBeLessThan: (actual: number, expected: number) => {
      if (actual > expected) {
        throw new Error(`Render time ${actual}ms exceeds expected ${expected}ms`);
      }
    },

    interactionTimeToBeLessThan: (actual: number, expected: number) => {
      if (actual > expected) {
        throw new Error(`Interaction time ${actual}ms exceeds expected ${expected}ms`);
      }
    },

    noMemoryLeaks: (result: any) => {
      if (result.hasLeak) {
        throw new Error(`Memory leak detected: ${result.memoryGrowth} bytes growth`);
      }
    },

    bundleSizeToBeLessThan: (actual: number, expected: number) => {
      if (actual > expected) {
        throw new Error(`Bundle size ${actual} bytes exceeds expected ${expected} bytes`);
      }
    },
  },
};

// Performance test hooks
export const usePerformanceTest = () => {
  const measurements = new Map<string, number[]>();

  return {
    measure: (name: string, fn: () => Promise<void> | void) => {
      return async () => {
        const startTime = performance.now();
        await fn();
        const endTime = performance.now();
        const duration = endTime - startTime;

        if (!measurements.has(name)) {
          measurements.set(name, []);
        }
        measurements.get(name)!.push(duration);

        return duration;
      };
    },

    getMeasurements: (name: string) => measurements.get(name) || [],

    getAverage: (name: string) => {
      const times = measurements.get(name) || [];
      return times.reduce((a, b) => a + b, 0) / times.length;
    },

    getMax: (name: string) => {
      const times = measurements.get(name) || [];
      return Math.max(...times);
    },

    getMin: (name: string) => {
      const times = measurements.get(name) || [];
      return Math.min(...times);
    },

    clear: (name?: string) => {
      if (name) {
        measurements.delete(name);
      } else {
        measurements.clear();
      }
    },
  };
};

// Mock performance API for testing
if (typeof performance === 'undefined') {
  global.performance = {
    now: () => Date.now(),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
    getEntries: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
    clearResourceTimings: vi.fn(),
    setResourceTimingBufferSize: vi.fn(),
    toJSON: vi.fn(),
    timeOrigin: Date.now(),
    timing: {
      navigationStart: Date.now(),
      loadEventEnd: Date.now(),
    },
    memory: {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
      jsHeapSizeLimit: 0,
    },
  } as any;
}

// Mock PerformanceObserver for testing
if (typeof PerformanceObserver === 'undefined') {
  global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []),
  }));
}

// Export utilities for global use
global.performanceMonitor = performanceMonitor;
global.performanceUtils = performanceUtils;
global.performanceConfig = performanceConfig;

export { performanceMonitor, performanceUtils, performanceConfig };
export default performanceUtils;