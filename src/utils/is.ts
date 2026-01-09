/**
 * 类型判断工具
 * 提供各种类型判断函数
 */

// ==================== 基础类型判断 ====================

/**
 * 判断是否为 undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 判断是否为 null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * 判断是否为 null 或 undefined
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 判断是否已定义（非 null 且非 undefined）
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * 判断是否为布尔值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * 判断是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * 判断是否为有限数字
 */
export function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && isFinite(value);
}

/**
 * 判断是否为整数
 */
export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

/**
 * 判断是否为正数
 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/**
 * 判断是否为负数
 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0;
}

/**
 * 判断是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 判断是否为非空字符串
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

/**
 * 判断是否为 Symbol
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * 判断是否为 BigInt
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

// ==================== 复合类型判断 ====================

/**
 * 判断是否为函数
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * 判断是否为异步函数
 */
export function isAsyncFunction(value: unknown): value is (...args: unknown[]) => Promise<unknown> {
  return isFunction(value) && value.constructor.name === 'AsyncFunction';
}

/**
 * 判断是否为对象（不包括 null）
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

/**
 * 判断是否为普通对象（由 {} 或 new Object() 创建）
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * 判断是否为空对象
 */
export function isEmptyObject(value: unknown): value is Record<string, never> {
  return isPlainObject(value) && Object.keys(value).length === 0;
}

/**
 * 判断是否为数组
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * 判断是否为非空数组
 */
export function isNonEmptyArray<T>(value: unknown): value is [T, ...T[]] {
  return isArray(value) && value.length > 0;
}

/**
 * 判断是否为指定类型的数组
 */
export function isArrayOf<T>(
  value: unknown,
  predicate: (item: unknown) => item is T,
): value is T[] {
  return isArray(value) && value.every(predicate);
}

/**
 * 判断是否为 Date 对象
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * 判断是否为有效日期
 */
export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !isNaN(value.getTime());
}

/**
 * 判断是否为正则表达式
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * 判断是否为 Error 对象
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * 判断是否为 Map
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map;
}

/**
 * 判断是否为 Set
 */
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set;
}

/**
 * 判断是否为 WeakMap
 */
export function isWeakMap(value: unknown): value is WeakMap<object, unknown> {
  return value instanceof WeakMap;
}

/**
 * 判断是否为 WeakSet
 */
export function isWeakSet(value: unknown): value is WeakSet<object> {
  return value instanceof WeakSet;
}

/**
 * 判断是否为 Promise
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value instanceof Promise ||
    (isObject(value) &&
      isFunction((value as Record<string, unknown>)['then']) &&
      isFunction((value as Record<string, unknown>)['catch']))
  );
}

/**
 * 判断是否为 Promise-like（thenable）
 */
export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return isObject(value) && isFunction((value as Record<string, unknown>)['then']);
}

// ==================== 特殊值判断 ====================

/**
 * 判断是否为 NaN
 */
export function isNaN(value: unknown): boolean {
  return Number.isNaN(value);
}

/**
 * 判断是否为原始类型
 */
export function isPrimitive(value: unknown): value is string | number | boolean | symbol | bigint | null | undefined {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

/**
 * 判断是否为假值
 */
export function isFalsy(value: unknown): value is false | 0 | '' | null | undefined {
  return !value;
}

/**
 * 判断是否为真值
 */
export function isTruthy<T>(value: T | false | 0 | '' | null | undefined): value is T {
  return !!value;
}

/**
 * 判断是否为空值（null、undefined、空字符串、空数组、空对象）
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true;
  }
  if (isString(value) || isArray(value)) {
    return value.length === 0;
  }
  if (isMap(value) || isSet(value)) {
    return value.size === 0;
  }
  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}

// ==================== DOM 相关判断 ====================

/**
 * 判断是否为 DOM 元素
 */
export function isElement(value: unknown): value is Element {
  return typeof Element !== 'undefined' && value instanceof Element;
}

/**
 * 判断是否为 HTML 元素
 */
export function isHTMLElement(value: unknown): value is HTMLElement {
  return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement;
}

/**
 * 判断是否为 Node
 */
export function isNode(value: unknown): value is Node {
  return typeof Node !== 'undefined' && value instanceof Node;
}

/**
 * 判断是否为 Window 对象
 */
export function isWindow(value: unknown): value is Window {
  return typeof window !== 'undefined' && value === window;
}

/**
 * 判断是否为 Document 对象
 */
export function isDocument(value: unknown): value is Document {
  return typeof document !== 'undefined' && value === document;
}

// ==================== 环境判断 ====================

/**
 * 判断是否在浏览器环境
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * 判断是否在 Node.js 环境
 */
export function isNode_(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null
  );
}

/**
 * 判断是否在 Web Worker 环境
 */
export function isWebWorker(): boolean {
  return (
    typeof self === 'object' &&
    self.constructor &&
    self.constructor.name === 'DedicatedWorkerGlobalScope'
  );
}

/**
 * 判断是否支持触摸
 */
export function isTouchDevice(): boolean {
  if (!isBrowser()) {
    return false;
  }
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ==================== 类型获取 ====================

/**
 * 获取值的类型字符串
 *
 * @example
 * ```typescript
 * getType(null) // => 'null'
 * getType([]) // => 'array'
 * getType({}) // => 'object'
 * getType(new Date()) // => 'date'
 * ```
 */
export function getType(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (isArray(value)) return 'array';
  if (isDate(value)) return 'date';
  if (isRegExp(value)) return 'regexp';
  if (isError(value)) return 'error';
  if (isMap(value)) return 'map';
  if (isSet(value)) return 'set';
  if (isPromise(value)) return 'promise';
  return typeof value;
}

/**
 * 获取对象的构造函数名称
 *
 * @example
 * ```typescript
 * getConstructorName(new Date()) // => 'Date'
 * getConstructorName({}) // => 'Object'
 * ```
 */
export function getConstructorName(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return (value as object).constructor?.name;
}

// ==================== 类型断言 ====================

/**
 * 断言值不为 null 或 undefined
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message = 'Value is null or undefined',
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

/**
 * 断言值为指定类型
 */
export function assertType<T>(
  value: unknown,
  predicate: (value: unknown) => value is T,
  message = 'Type assertion failed',
): asserts value is T {
  if (!predicate(value)) {
    throw new TypeError(message);
  }
}

// ==================== 默认导出 ====================

export default {
  // 基础类型
  isUndefined,
  isNull,
  isNil,
  isDefined,
  isBoolean,
  isNumber,
  isFiniteNumber,
  isInteger,
  isPositive,
  isNegative,
  isString,
  isNonEmptyString,
  isSymbol,
  isBigInt,
  // 复合类型
  isFunction,
  isAsyncFunction,
  isObject,
  isPlainObject,
  isEmptyObject,
  isArray,
  isNonEmptyArray,
  isArrayOf,
  isDate,
  isValidDate,
  isRegExp,
  isError,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isPromise,
  isPromiseLike,
  // 特殊值
  isNaN,
  isPrimitive,
  isFalsy,
  isTruthy,
  isEmpty,
  // DOM
  isElement,
  isHTMLElement,
  isNode,
  isWindow,
  isDocument,
  // 环境
  isBrowser,
  isNodeEnv: isNode_,
  isWebWorker,
  isTouchDevice,
  // 类型获取
  getType,
  getConstructorName,
  // 断言
  assertDefined,
  assertType,
};
