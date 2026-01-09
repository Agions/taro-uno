/**
 * 对象操作工具
 * 提供 deepMerge, omit, pick 等对象操作函数
 */

// ==================== 类型定义 ====================

/** 深度可选类型 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 可合并的值类型 */
type Mergeable = Record<string, unknown>;

// ==================== 类型判断 ====================

/**
 * 判断是否为普通对象
 */
function isPlainObject(value: unknown): value is Mergeable {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * 判断是否为数组
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

// ==================== 深度合并 ====================

/**
 * 深度合并对象
 * 后面的对象会覆盖前面的对象
 *
 * @example
 * ```typescript
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } })
 * // => { a: 1, b: { c: 2, d: 3 } }
 * ```
 */
export function deepMerge<T extends Mergeable>(...objects: DeepPartial<T>[]): T {
  const result: Mergeable = {};

  for (const obj of objects) {
    if (!obj) continue;

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const sourceValue = obj[key];
      const targetValue = result[key];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        // 递归合并对象
        result[key] = deepMerge(targetValue as Mergeable, sourceValue as Mergeable);
      } else if (isArray(sourceValue)) {
        // 数组直接覆盖（不合并）
        result[key] = [...sourceValue];
      } else {
        // 其他值直接覆盖
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
}

/**
 * 深度合并对象（合并数组版本）
 * 数组会被合并而不是覆盖
 *
 * @example
 * ```typescript
 * deepMergeWithArrays({ a: [1, 2] }, { a: [3, 4] })
 * // => { a: [1, 2, 3, 4] }
 * ```
 */
export function deepMergeWithArrays<T extends Mergeable>(...objects: DeepPartial<T>[]): T {
  const result: Mergeable = {};

  for (const obj of objects) {
    if (!obj) continue;

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const sourceValue = obj[key];
      const targetValue = result[key];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        result[key] = deepMergeWithArrays(targetValue as Mergeable, sourceValue as Mergeable);
      } else if (isArray(sourceValue) && isArray(targetValue)) {
        // 合并数组
        result[key] = [...targetValue, ...sourceValue];
      } else if (isArray(sourceValue)) {
        result[key] = [...sourceValue];
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
}

// ==================== 属性选择 ====================

/**
 * 从对象中选取指定属性
 *
 * @example
 * ```typescript
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])
 * // => { a: 1, b: 2 }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * 从对象中排除指定属性
 *
 * @example
 * ```typescript
 * omit({ a: 1, b: 2, c: 3 }, ['c'])
 * // => { a: 1, b: 2 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  const keysSet = new Set<string | number | symbol>(keys);

  for (const key of Object.keys(result)) {
    if (keysSet.has(key as K)) {
      delete result[key as keyof T];
    }
  }

  return result as Omit<T, K>;
}

/**
 * 根据条件选取属性
 *
 * @example
 * ```typescript
 * pickBy({ a: 1, b: null, c: 3 }, (v) => v !== null)
 * // => { a: 1, c: 3 }
 * ```
 */
export function pickBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (predicate(obj[key], key)) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

/**
 * 根据条件排除属性
 *
 * @example
 * ```typescript
 * omitBy({ a: 1, b: null, c: 3 }, (v) => v === null)
 * // => { a: 1, c: 3 }
 * ```
 */
export function omitBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  return pickBy(obj, (value, key) => !predicate(value, key));
}

// ==================== 对象访问 ====================

/**
 * 安全获取嵌套属性值
 *
 * @example
 * ```typescript
 * get({ a: { b: { c: 1 } } }, 'a.b.c') // => 1
 * get({ a: { b: { c: 1 } } }, 'a.b.d', 'default') // => 'default'
 * ```
 */
export function get<T = unknown>(
  obj: unknown,
  path: string | string[],
  defaultValue?: T,
): T | undefined {
  const keys = typeof path === 'string' ? path.split('.') : path;
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return (result === undefined ? defaultValue : result) as T | undefined;
}

/**
 * 安全设置嵌套属性值
 *
 * @example
 * ```typescript
 * set({}, 'a.b.c', 1) // => { a: { b: { c: 1 } } }
 * ```
 */
export function set<T extends object>(
  obj: T,
  path: string | string[],
  value: unknown,
): T {
  const keys = typeof path === 'string' ? path.split('.') : path;
  const result = { ...obj } as Record<string, unknown>;
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as string;
    if (!(key in current) || !isPlainObject(current[key])) {
      current[key] = {};
    } else {
      current[key] = { ...(current[key] as object) };
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1] as string;
  current[lastKey] = value;
  return result as T;
}

/**
 * 检查对象是否包含指定路径
 *
 * @example
 * ```typescript
 * has({ a: { b: 1 } }, 'a.b') // => true
 * has({ a: { b: 1 } }, 'a.c') // => false
 * ```
 */
export function has(obj: unknown, path: string | string[]): boolean {
  const keys = typeof path === 'string' ? path.split('.') : path;
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(current, key)) {
      return false;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return true;
}

/**
 * 删除嵌套属性
 *
 * @example
 * ```typescript
 * unset({ a: { b: 1, c: 2 } }, 'a.b') // => { a: { c: 2 } }
 * ```
 */
export function unset<T extends object>(obj: T, path: string | string[]): T {
  const keys = typeof path === 'string' ? path.split('.') : path;

  if (keys.length === 0) {
    return obj;
  }

  const result = { ...obj } as Record<string, unknown>;

  if (keys.length === 1) {
    delete result[keys[0] as string];
    return result as T;
  }

  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as string;
    if (!(key in current) || !isPlainObject(current[key])) {
      return result as T;
    }
    current[key] = { ...(current[key] as object) };
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1] as string;
  delete current[lastKey];
  return result as T;
}

// ==================== 对象转换 ====================

/**
 * 深度克隆对象
 *
 * @example
 * ```typescript
 * const obj = { a: { b: 1 } };
 * const clone = deepClone(obj);
 * clone.a.b = 2;
 * console.log(obj.a.b); // => 1
 * ```
 */
export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as unknown as T;
  }

  if (isArray(value)) {
    return value.map(item => deepClone(item)) as unknown as T;
  }

  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepClone((value as Record<string, unknown>)[key]);
      }
    }
    return result as T;
  }

  return value;
}

/**
 * 扁平化对象
 *
 * @example
 * ```typescript
 * flatten({ a: { b: { c: 1 } }, d: 2 })
 * // => { 'a.b.c': 1, 'd': 2 }
 * ```
 */
export function flatten(
  obj: Record<string, unknown>,
  prefix = '',
  separator = '.',
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const newKey = prefix ? `${prefix}${separator}${key}` : key;
    const value = obj[key];

    if (isPlainObject(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, newKey, separator));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * 反扁平化对象
 *
 * @example
 * ```typescript
 * unflatten({ 'a.b.c': 1, 'd': 2 })
 * // => { a: { b: { c: 1 } }, d: 2 }
 * ```
 */
export function unflatten(
  obj: Record<string, unknown>,
  separator = '.',
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const keys = key.split(separator);
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i] as string;
      if (!(k in current)) {
        current[k] = {};
      }
      current = current[k] as Record<string, unknown>;
    }

    const lastKey = keys[keys.length - 1] as string;
    current[lastKey] = obj[key];
  }

  return result;
}

/**
 * 对象键值映射
 *
 * @example
 * ```typescript
 * mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase())
 * // => { A: 1, B: 2 }
 * ```
 */
export function mapKeys<T extends object>(
  obj: T,
  mapper: (key: keyof T, value: T[keyof T]) => string,
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = mapper(key, obj[key]);
      result[newKey] = obj[key];
    }
  }

  return result;
}

/**
 * 对象值映射
 *
 * @example
 * ```typescript
 * mapValues({ a: 1, b: 2 }, (value) => value * 2)
 * // => { a: 2, b: 4 }
 * ```
 */
export function mapValues<T extends object, R>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => R,
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = mapper(obj[key], key);
    }
  }

  return result;
}

// ==================== 对象比较 ====================

/**
 * 深度比较两个值是否相等
 *
 * @example
 * ```typescript
 * isEqual({ a: 1 }, { a: 1 }) // => true
 * isEqual({ a: 1 }, { a: 2 }) // => false
 * ```
 */
export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a === null || b === null) {
    return a === b;
  }

  if (typeof a !== 'object') {
    return a === b;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (isArray(a) || isArray(b)) {
    return false;
  }

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;

  const aKeys = Object.keys(aObj);
  const bKeys = Object.keys(bObj);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(key => isEqual(aObj[key], bObj[key]));
}

/**
 * 获取两个对象的差异
 *
 * @example
 * ```typescript
 * diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 })
 * // => { b: 3, c: 4 }
 * ```
 */
export function diff<T extends object>(
  original: T,
  updated: T,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in updated) {
    if (!Object.prototype.hasOwnProperty.call(updated, key)) continue;

    if (!isEqual(original[key], updated[key])) {
      result[key] = updated[key];
    }
  }

  return result;
}

// ==================== 对象工具 ====================

/**
 * 检查对象是否为空
 *
 * @example
 * ```typescript
 * isEmpty({}) // => true
 * isEmpty({ a: 1 }) // => false
 * ```
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 获取对象的所有键
 */
export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * 获取对象的所有值
 */
export function values<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

/**
 * 获取对象的所有键值对
 */
export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * 从键值对数组创建对象
 */
export function fromEntries<K extends string | number | symbol, V>(
  entries: [K, V][],
): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

// ==================== 默认导出 ====================

export default {
  deepMerge,
  deepMergeWithArrays,
  pick,
  omit,
  pickBy,
  omitBy,
  get,
  set,
  has,
  unset,
  deepClone,
  flatten,
  unflatten,
  mapKeys,
  mapValues,
  isEqual,
  diff,
  isEmpty,
  keys,
  values,
  entries,
  fromEntries,
};
