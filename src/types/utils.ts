/**
 * 通用工具类型定义
 * 提供类型安全的工具函数和类型守卫
 * @module types/utils
 */

import * as React from 'react';

// ==================== 核心工具类型 ====================

/**
 * 可空类型
 * @description 允许值为 null 或 undefined
 * @template T 原始类型
 */
export type Nullable<T> = T | null | undefined;

/**
 * 可选属性类型
 * @description 将指定的属性变为可选
 * @template T 原始类型
 * @template K 要变为可选的属性键
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 必选属性类型
 * @description 将指定的属性变为必选
 * @template T 原始类型
 * @template K 要变为必选的属性键
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** @deprecated 使用 RequiredKeys 代替 */
export type RequiredFields<T, K extends keyof T> = RequiredKeys<T, K>;

/**
 * 深度可选类型
 * @description 递归地将所有属性变为可选
 * @template T 原始类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
  ? T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : DeepPartial<T[P]>
  : T[P];
};

/** @deprecated 使用 DeepPartial 代替 */
export type DeepOptional<T> = DeepPartial<T>;

/**
 * 深度必选类型
 * @description 递归地将所有属性变为必选
 * @template T 原始类型
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
  ? T[P] extends Array<infer U>
  ? Array<DeepRequired<U>>
  : DeepRequired<T[P]>
  : T[P];
};

/**
 * 深度只读类型
 * @description 递归地将所有属性变为只读
 * @template T 原始类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
  ? T[P] extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : DeepReadonly<T[P]>
  : T[P];
};

/**
 * 深度可写类型
 * @description 递归地移除所有只读修饰符
 * @template T 原始类型
 */
export type DeepWriteable<T> = {
  -readonly [P in keyof T]: T[P] extends object
  ? T[P] extends Array<infer U>
  ? Array<DeepWriteable<U>>
  : DeepWriteable<T[P]>
  : T[P];
};

/** 递归排除类型 */
export type RecursiveExclude<T, E> = T extends object
  ? {
    [P in keyof T as T[P] extends E ? never : P]: RecursiveExclude<T[P], E>;
  }
  : T;

/** 递归选择类型 */
export type RecursivePick<T, K extends string> = T extends object
  ? {
    [P in keyof T as P extends K ? P : never]: RecursivePick<T[P], K>;
  }
  : T;

// ==================== 条件类型 ====================

/** 提取Promise返回类型 */
export type PromiseType<T> = T extends Promise<infer U> ? U : never;

/** 提取函数参数类型 */
export type FunctionArgs<T> = T extends (...args: infer A) => unknown ? A : never;

/** 提取函数返回类型 */
export type FunctionReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;

/** 提取React组件Props类型 */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/** 提取React组件Ref类型 */
export type ComponentRef<T> = T extends React.Ref<infer R> ? R : never;

/**
 * 过滤掉 undefined 和 null 的类型
 * @template T 原始类型
 */
export type NonNullableType<T> = T extends null | undefined ? never : T;

/** @deprecated 使用 NonNullableType 代替，避免与内置 NonNullable 冲突 */
export type NonNullable<T> = NonNullableType<T>;

/** 过滤掉falsy值的类型 */
export type Truthy<T> = T extends false | 0 | '' | null | undefined ? never : T;

// ==================== 字符串工具类型 ====================

/**
 * 首字母大写
 * @template S 字符串类型
 */
export type CapitalizeString<S extends string> = S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S;

/** @deprecated 使用 CapitalizeString 代替 */
export type Capitalize<S extends string> = CapitalizeString<S>;

/**
 * 首字母小写
 * @template S 字符串类型
 */
export type UncapitalizeString<S extends string> = S extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : S;

/** @deprecated 使用 UncapitalizeString 代替 */
export type Uncapitalize<S extends string> = UncapitalizeString<S>;

/** 转换为连字符格式 */
export type KebabCase<S> = S extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
  ? `${Lowercase<First>}${KebabCase<Rest>}`
  : `${Lowercase<First>}-${KebabCase<Rest>}`
  : S;

/** 转换为驼峰格式 */
export type CamelCase<S> = S extends `${infer First}-${infer Rest}` ? `${First}${Capitalize<CamelCase<Rest>>}` : S;

// ==================== 对象工具类型 ====================

/** 合并两个对象类型 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/** 深度合并两个对象类型 */
export type DeepMerge<T, U> = T extends object
  ? U extends object
  ? {
    [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
    ? DeepMerge<T[K], U[K]>
    : T[K]
    : K extends keyof U
    ? U[K]
    : never;
  }
  : T
  : U;

/** 选择对象中的部分属性 */
export type PickPartial<T, K extends keyof T> = Pick<T, K> & Partial<T>;

/** 选择对象中的必选属性 */
export type PickRequired<T, K extends keyof T> = Pick<T, K> & Required<Pick<T, K>>;

// ==================== 数组工具类型 ====================

/** 数组元素类型 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/** 过滤数组中的特定类型 */
export type FilterArray<T, U> = T extends [infer First, ...infer Rest]
  ? First extends U
  ? [First, ...FilterArray<Rest, U>]
  : FilterArray<Rest, U>
  : [];

// ==================== 函数工具类型 ====================

/** 可选参数函数类型 */
export type OptionalArgs<T extends (...args: unknown[]) => unknown> = (
  ...args: Partial<FunctionArgs<T>> & []
) => FunctionReturn<T>;

/** 柯里化函数类型 */
export type Curried<T> = T extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Rest]
  ? (arg: First) => Curried<(...args: Rest) => R>
  : R
  : never;

/** 防抖函数类型 */
export type Debounced<T extends (...args: unknown[]) => unknown> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

/** 节流函数类型 */
export type Throttled<T extends (...args: unknown[]) => unknown> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
};

// ==================== 类型守卫 ====================

/** 类型守卫：检查是否为字符串 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/** 类型守卫：检查是否为数字 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/** 类型守卫：检查是否为布尔值 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/** 类型守卫：检查是否为数组 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/** 类型守卫：检查是否为对象 */
export function isObject<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** 类型守卫：检查是否为函数 */
export function isFunction<T extends (...args: unknown[]) => unknown>(value: unknown): value is T {
  return typeof value === 'function';
}

/** 类型守卫：检查是否为Promise */
export function isPromise<T>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}

/** 类型守卫：检查是否为React元素 */
export function isReactElement(value: unknown): value is React.ReactElement {
  return React.isValidElement(value);
}

/** 类型守卫：检查是否为React组件 */
export function isReactComponent<T extends React.ComponentType<unknown>>(value: unknown): value is T {
  return isFunction(value);
}

/** 类型守卫：检查是否为undefined */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/** 类型守卫：检查是否为null */
export function isNull(value: unknown): value is null {
  return value === null;
}

/** 类型守卫：检查是否为空值 */
export function isEmpty(value: unknown): value is null | undefined | '' | 0 | false {
  return value === null || value === undefined || value === '' || value === 0 || value === false;
}

/** 类型守卫：检查是否为非空值 */
export function isNotEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// ==================== 验证工具类型 ====================

/** 验证结果类型 */
export type ValidationResult<T> = { success: true; data: T } | { success: false; error: string };

/** 验证函数类型 */
export type Validator<T> = (value: unknown) => ValidationResult<T>;

/** 创建验证器 */
export function createValidator<T>(
  validate: (value: unknown) => value is T,
  errorMessage: string = 'Invalid value',
): Validator<T> {
  return (value: unknown): ValidationResult<T> => {
    if (validate(value)) {
      return { success: true, data: value };
    }
    return { success: false, error: errorMessage };
  };
}

// ==================== 事件处理工具类型 ====================

/** 通用事件处理器类型 */
export type EventHandler<T = unknown> = (event: T) => void;

/** 阻止默认行为的事件处理器 */
export type PreventDefaultHandler<T = unknown> = (event: T) => void;

/** 停止传播的事件处理器 */
export type StopPropagationHandler<T = unknown> = (event: T) => void;

/** 创建阻止默认行为的事件处理器 */
export function createPreventDefaultHandler<T extends { preventDefault: () => void }>(
  handler: EventHandler<T>,
): PreventDefaultHandler<T> {
  return (event: T) => {
    event.preventDefault();
    handler(event);
  };
}

/** 创建停止传播的事件处理器 */
export function createStopPropagationHandler<T extends { stopPropagation: () => void }>(
  handler: EventHandler<T>,
): StopPropagationHandler<T> {
  return (event: T) => {
    event.stopPropagation();
    handler(event);
  };
}

// ==================== 样式工具类型 ====================

/** CSS属性类型 */
export type CSSProperties = React.CSSProperties;

/** 样式对象类型 */
export type StyleObject = CSSProperties;

/** 类名类型 */
export type ClassName = string | string[] | { [key: string]: boolean } | undefined;

/** 合并类名 */
export function classNames(...classes: ClassName[]): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      if (Array.isArray(cls)) return cls.filter(Boolean).join(' ');
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}

/** 合并样式对象 */
export function mergeStyles(...styles: (StyleObject | undefined)[]): StyleObject {
  return Object.assign({}, ...styles.filter(Boolean));
}

// ==================== 异步工具类型 ====================

/** 异步状态类型 */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

/** 异步操作类型 */
export type AsyncOperation<T> = Promise<T> & {
  cancel: () => void;
};

/** 创建可取消的Promise */
export function createCancellablePromise<T>(promise: Promise<T>): AsyncOperation<T> {
  let cancelled = false;

  const cancellablePromise = promise.then(
    (data) => {
      if (cancelled) {
        throw new Error('Promise was cancelled');
      }
      return data;
    },
    (error) => {
      if (cancelled) {
        throw new Error('Promise was cancelled');
      }
      throw error;
    },
  ) as AsyncOperation<T>;

  cancellablePromise.cancel = () => {
    cancelled = true;
  };

  return cancellablePromise;
}

// ==================== 导出工具类型 ====================

/** 通用键值对类型 */
export type KeyValuePair<K = string, V = any> = [K, V];

/** 通用记录类型 */
export type RecordType<K extends string, V> = Record<K, V>;

/** 通用映射类型 */
export type MapType<K, V> = Map<K, V>;

/** 通用集合类型 */
export type SetType<T> = Set<T>;

// ==================== 类型安全工具函数 ====================

/** 类型安全的Object.keys */
export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/** 类型安全的Object.values */
export function values<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

/** 类型安全的Object.entries */
export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/** 类型安全的Object.fromEntries */
export function fromEntries<K extends string, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

// ==================== 类型推断工具 ====================

/** 推断数组元素类型 */
export type InferArray<T> = T extends (infer U)[] ? U : never;

/** 推断Promise返回类型 */
export type InferPromise<T> = T extends Promise<infer U> ? U : never;

/** 推断函数参数类型 */
export type InferArgs<T> = T extends (...args: infer A) => any ? A : never;

/** 推断函数返回类型 */
export type InferReturn<T> = T extends (...args: any) => infer R ? R : never;

// ==================== 默认导出 ====================
