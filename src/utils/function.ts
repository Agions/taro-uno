/**
 * 函数工具
 * 提供 debounce, throttle 等函数工具
 */

// ==================== 类型定义 ====================

/** 通用函数类型 */
type AnyFunction = (...args: unknown[]) => unknown;

/** 防抖/节流函数返回类型 */
export interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  /** 取消延迟执行 */
  cancel: () => void;
  /** 立即执行 */
  flush: () => void;
  /** 是否有待执行的调用 */
  pending: () => boolean;
}

/** 防抖选项 */
export interface DebounceOptions {
  /** 是否在延迟开始前调用 */
  leading?: boolean;
  /** 是否在延迟结束后调用 */
  trailing?: boolean;
  /** 最大等待时间 */
  maxWait?: number;
}

/** 节流选项 */
export interface ThrottleOptions {
  /** 是否在节流开始前调用 */
  leading?: boolean;
  /** 是否在节流结束后调用 */
  trailing?: boolean;
}

// ==================== 防抖函数 ====================

/**
 * 防抖函数
 * 在指定时间内多次调用只执行最后一次
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 *
 * debouncedSearch('a');
 * debouncedSearch('ab');
 * debouncedSearch('abc'); // 只有这次会执行
 * ```
 */
export function debounce<T extends AnyFunction>(
  fn: T,
  wait: number,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  const { leading = false, trailing = true, maxWait } = options;

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let maxTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown = null;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let result: ReturnType<T> | undefined;

  const invokeFunc = (time: number): ReturnType<T> | undefined => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = null;
    lastThis = null;
    lastInvokeTime = time;

    if (args) {
      result = fn.apply(thisArg, args) as ReturnType<T>;
    }
    return result;
  };

  const startTimer = (pendingFunc: () => void, waitTime: number): ReturnType<typeof setTimeout> => {
    return setTimeout(pendingFunc, waitTime);
  };

  const cancelTimer = (id: ReturnType<typeof setTimeout> | null): void => {
    if (id !== null) {
      clearTimeout(id);
    }
  };

  const remainingWait = (time: number): number => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  };

  const shouldInvoke = (time: number): boolean => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  };

  const timerExpired = (): void => {
    const time = Date.now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
      return;
    }
    timeoutId = startTimer(timerExpired, remainingWait(time));
  };

  const trailingEdge = (time: number): ReturnType<T> | undefined => {
    timeoutId = null;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = null;
    lastThis = null;
    return result;
  };

  const leadingEdge = (time: number): ReturnType<T> | undefined => {
    lastInvokeTime = time;
    timeoutId = startTimer(timerExpired, wait);

    if (maxWait !== undefined) {
      maxTimeoutId = startTimer(() => {
        if (timeoutId !== null) {
          trailingEdge(Date.now());
        }
      }, maxWait);
    }

    return leading ? invokeFunc(time) : result;
  };

  const cancel = (): void => {
    cancelTimer(timeoutId);
    cancelTimer(maxTimeoutId);
    lastInvokeTime = 0;
    lastArgs = null;
    lastThis = null;
    lastCallTime = undefined;
    timeoutId = null;
    maxTimeoutId = null;
  };

  const flush = (): void => {
    if (timeoutId === null) {
      return;
    }
    trailingEdge(Date.now());
  };

  const pending = (): boolean => {
    return timeoutId !== null;
  };

  const debounced = function (this: unknown, ...args: Parameters<T>): void {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === null) {
        leadingEdge(lastCallTime);
        return;
      }
      if (maxWait !== undefined) {
        timeoutId = startTimer(timerExpired, wait);
        invokeFunc(lastCallTime);
        return;
      }
    }
    if (timeoutId === null) {
      timeoutId = startTimer(timerExpired, wait);
    }
  } as DebouncedFunction<T>;

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}

// ==================== 节流函数 ====================

/**
 * 节流函数
 * 在指定时间内只执行一次
 *
 * @example
 * ```typescript
 * const throttledScroll = throttle(() => {
 *   console.log('Scrolling...');
 * }, 100);
 *
 * window.addEventListener('scroll', throttledScroll);
 * ```
 */
export function throttle<T extends AnyFunction>(
  fn: T,
  wait: number,
  options: ThrottleOptions = {},
): DebouncedFunction<T> {
  const { leading = true, trailing = true } = options;

  return debounce(fn, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}

// ==================== 其他函数工具 ====================

/**
 * 只执行一次的函数
 *
 * @example
 * ```typescript
 * const initialize = once(() => {
 *   console.log('Initialized');
 *   return { ready: true };
 * });
 *
 * initialize(); // 输出: Initialized
 * initialize(); // 不输出，返回缓存的结果
 * ```
 */
export function once<T extends AnyFunction>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = fn.apply(this, args) as ReturnType<T>;
    }
    return result;
  } as T;
}

/**
 * 记忆化函数
 * 缓存函数调用结果
 *
 * @example
 * ```typescript
 * const fibonacci = memoize((n: number): number => {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * });
 * ```
 */
export function memoize<T extends AnyFunction>(
  fn: T,
  resolver?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T & { cache: Map<string, ReturnType<T>> };

  memoized.cache = cache;
  return memoized;
}

/**
 * 延迟执行函数
 *
 * @example
 * ```typescript
 * await delay(1000);
 * console.log('1 second later');
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 重试函数
 *
 * @example
 * ```typescript
 * const result = await retry(
 *   () => fetchData(),
 *   { times: 3, delay: 1000 }
 * );
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    times?: number;
    delay?: number;
    onRetry?: (error: unknown, attempt: number) => void;
  } = {},
): Promise<T> {
  const { times = 3, delay: retryDelay = 0, onRetry } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      onRetry?.(error, attempt);

      if (attempt < times && retryDelay > 0) {
        await delay(retryDelay);
      }
    }
  }

  throw lastError;
}

/**
 * 组合函数（从右到左执行）
 *
 * @example
 * ```typescript
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const addOneThenDouble = compose(double, addOne);
 * addOneThenDouble(5); // => 12
 * ```
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * 管道函数（从左到右执行）
 *
 * @example
 * ```typescript
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const addOneThenDouble = pipe(addOne, double);
 * addOneThenDouble(5); // => 12
 * ```
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => fns.reduce((acc, fn) => fn(acc), arg);
}

/**
 * 柯里化函数
 *
 * @example
 * ```typescript
 * const add = (a: number, b: number, c: number) => a + b + c;
 * const curriedAdd = curry(add);
 * curriedAdd(1)(2)(3); // => 6
 * curriedAdd(1, 2)(3); // => 6
 * curriedAdd(1)(2, 3); // => 6
 * ```
 */
export function curry<T extends AnyFunction>(fn: T): unknown {
  const arity = fn.length;

  return function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs: unknown[]) => curried(...args, ...moreArgs);
  };
}

/**
 * 部分应用函数
 *
 * @example
 * ```typescript
 * const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
 * const sayHello = partial(greet, 'Hello');
 * sayHello('World'); // => 'Hello, World!'
 * ```
 */
export function partial<T extends AnyFunction>(
  fn: T,
  ...partialArgs: unknown[]
): (...args: unknown[]) => ReturnType<T> {
  return (...args: unknown[]): ReturnType<T> => {
    return fn(...partialArgs, ...args) as ReturnType<T>;
  };
}

/**
 * 否定函数
 *
 * @example
 * ```typescript
 * const isEven = (n: number) => n % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(3); // => true
 * ```
 */
export function negate<T extends (...args: unknown[]) => boolean>(
  fn: T,
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>): boolean => !fn(...args);
}

/**
 * 空函数
 */
export function noop(): void {
  // 空函数，什么都不做
}

/**
 * 恒等函数
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * 常量函数
 *
 * @example
 * ```typescript
 * const always42 = constant(42);
 * always42(); // => 42
 * ```
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * 执行函数并返回结果，捕获错误
 *
 * @example
 * ```typescript
 * const [result, error] = tryCatch(() => JSON.parse(jsonString));
 * if (error) {
 *   console.error('Parse failed:', error);
 * }
 * ```
 */
export function tryCatch<T>(fn: () => T): [T, null] | [null, Error] {
  try {
    return [fn(), null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * 异步版本的 tryCatch
 */
export async function tryCatchAsync<T>(
  fn: () => Promise<T>,
): Promise<[T, null] | [null, Error]> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

// ==================== 默认导出 ====================

export default {
  debounce,
  throttle,
  once,
  memoize,
  delay,
  retry,
  compose,
  pipe,
  curry,
  partial,
  negate,
  noop,
  identity,
  constant,
  tryCatch,
  tryCatchAsync,
};
