/**
 * 深度合并工具函数
 * 支持任意深度的对象合并，正确处理数组和特殊类型
 */

/**
 * 检查值是否为普通对象（非数组、非 null、非 Date 等特殊对象）
 * @param value - 要检查的值
 * @returns 是否为普通对象
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * 检查值是否为数组
 * @param value - 要检查的值
 * @returns 是否为数组
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * 检查值是否为 Date 对象
 * @param value - 要检查的值
 * @returns 是否为 Date 对象
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

/**
 * 检查值是否为 RegExp 对象
 * @param value - 要检查的值
 * @returns 是否为 RegExp 对象
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * 克隆特殊对象（Date、RegExp 等）
 * @param value - 要克隆的值
 * @returns 克隆后的值
 */
function cloneSpecialObject<T>(value: T): T {
  if (isDate(value)) {
    return new Date(value.getTime()) as T;
  }
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags) as T;
  }
  return value;
}


/**
 * 深度合并配置选项
 */
export interface DeepMergeOptions {
  /**
   * 数组合并策略
   * - 'replace': 用源数组替换目标数组（默认）
   * - 'concat': 连接两个数组
   * - 'union': 合并数组并去重
   */
  arrayMerge?: 'replace' | 'concat' | 'union';

  /**
   * 是否克隆对象而不是直接引用
   * 默认为 true
   */
  clone?: boolean;

  /**
   * 自定义合并函数
   * 返回 undefined 表示使用默认合并逻辑
   */
  customMerge?: (key: string, target: unknown, source: unknown) => unknown | undefined;
}

/**
 * 默认合并选项
 */
const defaultOptions: Required<DeepMergeOptions> = {
  arrayMerge: 'replace',
  clone: true,
  customMerge: () => undefined,
};

/**
 * 合并数组
 * @param target - 目标数组
 * @param source - 源数组
 * @param strategy - 合并策略
 * @returns 合并后的数组
 */
function mergeArrays<T>(
  target: T[],
  source: T[],
  strategy: DeepMergeOptions['arrayMerge'],
): T[] {
  switch (strategy) {
    case 'concat':
      return [...target, ...source];
    case 'union':
      return [...new Set([...target, ...source])];
    case 'replace':
    default:
      return [...source];
  }
}


/**
 * 深度合并两个对象
 * 
 * @description
 * 递归合并两个对象，支持任意深度的嵌套对象。
 * 源对象的值会覆盖目标对象的值。
 * 
 * @param target - 目标对象
 * @param source - 源对象
 * @param options - 合并选项
 * @returns 合并后的新对象
 * 
 * @example
 * ```typescript
 * const target = { a: 1, b: { c: 2 } };
 * const source = { b: { d: 3 }, e: 4 };
 * const result = deepMerge(target, source);
 * // result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
  options: DeepMergeOptions = {},
): T {
  const mergedOptions = { ...defaultOptions, ...options };
  const { arrayMerge, clone, customMerge } = mergedOptions;

  // 如果源为 null 或 undefined，返回目标
  if (source === null || source === undefined) {
    return clone ? deepClone(target) : target;
  }

  // 如果目标为 null 或 undefined，返回源
  if (target === null || target === undefined) {
    return (clone ? deepClone(source) : source) as T;
  }

  // 创建结果对象
  const result = (clone ? deepClone(target) : { ...target }) as Record<string, unknown>;

  // 遍历源对象的所有键
  for (const key of Object.keys(source)) {
    const targetValue = result[key];
    const sourceValue = source[key as keyof typeof source];

    // 尝试使用自定义合并函数
    const customResult = customMerge(key, targetValue, sourceValue);
    if (customResult !== undefined) {
      result[key] = customResult;
      continue;
    }

    // 如果源值为 undefined，跳过
    if (sourceValue === undefined) {
      continue;
    }

    // 如果源值为 null，直接赋值
    if (sourceValue === null) {
      result[key] = null;
      continue;
    }

    // 处理数组
    if (isArray(sourceValue)) {
      if (isArray(targetValue)) {
        result[key] = mergeArrays(targetValue, sourceValue, arrayMerge);
      } else {
        result[key] = clone ? [...sourceValue] : sourceValue;
      }
      continue;
    }

    // 处理特殊对象（Date、RegExp）
    if (isDate(sourceValue) || isRegExp(sourceValue)) {
      result[key] = clone ? cloneSpecialObject(sourceValue) : sourceValue;
      continue;
    }

    // 处理普通对象 - 递归合并
    if (isPlainObject(sourceValue)) {
      if (isPlainObject(targetValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
          mergedOptions,
        );
      } else {
        result[key] = clone ? deepClone(sourceValue) : sourceValue;
      }
      continue;
    }

    // 其他类型直接赋值
    result[key] = sourceValue;
  }

  return result as T;
}

/**
 * 深度克隆对象
 * 
 * @param value - 要克隆的值
 * @returns 克隆后的值
 */
export function deepClone<T>(value: T): T {
  // 处理 null 和 undefined
  if (value === null || value === undefined) {
    return value;
  }

  // 处理原始类型
  if (typeof value !== 'object') {
    return value;
  }

  // 处理 Date
  if (isDate(value)) {
    return new Date(value.getTime()) as T;
  }

  // 处理 RegExp
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags) as T;
  }

  // 处理数组
  if (isArray(value)) {
    return value.map(item => deepClone(item)) as T;
  }

  // 处理普通对象
  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      result[key] = deepClone(value[key]);
    }
    return result as T;
  }

  // 其他对象类型直接返回（如 Map、Set 等）
  return value;
}


/**
 * 合并多个对象
 * 
 * @param objects - 要合并的对象数组
 * @param options - 合并选项
 * @returns 合并后的对象
 * 
 * @example
 * ```typescript
 * const result = deepMergeAll([
 *   { a: 1 },
 *   { b: 2 },
 *   { a: 3, c: 4 }
 * ]);
 * // result: { a: 3, b: 2, c: 4 }
 * ```
 */
export function deepMergeAll<T extends Record<string, unknown>>(
  objects: Array<Partial<T>>,
  options: DeepMergeOptions = {},
): T {
  if (objects.length === 0) {
    return {} as T;
  }

  if (objects.length === 1) {
    return (options.clone ? deepClone(objects[0]) : objects[0]) as T;
  }

  return objects.reduce((acc, obj) => {
    return deepMerge(acc as T, obj, options);
  }, {} as Partial<T>) as T;
}

/**
 * 深度合并设计令牌
 * 专门用于合并设计令牌的便捷函数
 * 
 * @param defaultTokens - 默认令牌
 * @param customTokens - 自定义令牌
 * @returns 合并后的令牌
 */
export function mergeDesignTokens<T extends Record<string, unknown>>(
  defaultTokens: T,
  customTokens: Partial<T>,
): T {
  return deepMerge(defaultTokens, customTokens, {
    arrayMerge: 'replace',
    clone: true,
  });
}

export default deepMerge;
