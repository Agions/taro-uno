/**
 * Enhanced TypeScript Utility Types
 * Provides advanced type utilities for better type safety and developer experience
 */

import type { ReactNode } from 'react';

// ==================== Enhanced Utility Types ====================

/** Strict partial type with exact property matching */
export type StrictPartial<T> = {
  [P in keyof T]?: T[P];
};

/** Strict omit type with better error messages */
export type StrictOmit<T, K extends keyof any> = T extends object
  ? Pick<T, Exclude<keyof T, K>>
  : never;

/** Strict pick type with better error messages */
export type StrictPick<T, K extends keyof T> = T extends object
  ? Pick<T, K>
  : never;

/** Merge two types with better error handling */
export type Merge<T, U> = T extends object
  ? U extends object
    ? Omit<T, keyof U> & U
    : T
  : U;

/** Deep merge two types */
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

/** Extract keys by value type */
export type KeysByValueType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/** Extract array element type with proper inference */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/** Extract promise type with proper error handling */
export type PromiseType<T> = T extends Promise<infer U> ? U : never;

/** Extract function parameters with proper inference */
export type FunctionParams<T extends (...args: any) => any> = Parameters<T>;

/** Extract function return type with proper inference */
export type FunctionReturn<T extends (...args: any) => any> = ReturnType<T>;

/** Extract component props type */
export type ComponentProps<T extends React.ComponentType<any>> = React.ComponentProps<T>;

/** Extract component ref type */
export type ComponentRef<T extends React.ComponentType<any>> = React.ComponentRef<T>;

// ==================== Conditional Types ====================

/** IsNever type */
export type IsNever<T> = [T] extends [never] ? true : false;

/** IsAny type */
export type IsAny<T> = [unknown] extends [T] ? [T] extends [unknown] ? true : false : false;

/** IsUnknown type */
export type IsUnknown<T> = [unknown] extends [T] ? not [T] extends [unknown] ? true : false : false;

/** Not type */
export type Not<T extends boolean> = T extends true ? false : true;

/** And type */
export type And<T extends boolean, U extends boolean> = T extends true ? U : false;

/** Or type */
export type Or<T extends boolean, U extends boolean> = T extends true ? true : U;

// ==================== String Types ====================

/** Split string into array */
export type Split<S extends string, D extends string> = S extends `${infer First}${D}${infer Rest}`
  ? [First, ...Split<Rest, D>]
  : [S];

/** Join array of strings */
export type Join<T extends string[], D extends string> = T extends [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends string[]
      ? `${First}${D}${Join<Rest, D>}`
      : First
    : never
  : '';

/** Capitalize first letter */
export type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

/** Uncapitalize first letter */
export type Uncapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

/** Convert to kebab-case */
export type KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<First>}${KebabCase<Rest>}`
    : `${Lowercase<First>}-${KebabCase<Rest>}`
  : S;

/** Convert to camelCase */
export type CamelCase<S extends string> = S extends `${infer First}-${infer Rest}`
  ? `${First}${Capitalize<CamelCase<Rest>>}`
  : S;

// ==================== Object Types ====================

/** Deep readonly type */
export type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
    }
  : T;

/** Deep writable type */
export type DeepWriteable<T> = T extends object
  ? {
      -readonly [P in keyof T]: T[P] extends object ? DeepWriteable<T[P]> : T[P];
    }
  : T;

/** Deep required type */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
    }
  : T;

/** Deep partial type */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    }
  : T;

/** Recursive omit */
export type RecursiveOmit<T, K extends string> = T extends object
  ? {
      [P in keyof T as P extends K ? never : P]: RecursiveOmit<T[P], K>;
    }
  : T;

/** Recursive pick */
export type RecursivePick<T, K extends string> = T extends object
  ? {
      [P in keyof T as P extends K ? P : never]: RecursivePick<T[P], K>;
    }
  : T;

// ==================== Function Types ====================

/** Curried function type */
export type Curried<T extends (...args: any) => any> = T extends (
  ...args: infer A
) => infer R
  ? A extends [infer First, ...infer Rest]
    ? (arg: First) => Curried<(...args: Rest) => R>
    : R
  : never;

/** Debounced function type */
export type Debounced<T extends (...args: any) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  pending: () => boolean;
};

/** Throttled function type */
export type Throttled<T extends (...args: any) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  pending: () => boolean;
};

/** Async function type */
export type AsyncFunction<T = any> = () => Promise<T>;

// ==================== Event Types ====================

/** Enhanced event handler type */
export type EventHandler<T = any, R = void> = (event: T) => R;

/** Enhanced mouse event handler */
export type MouseEventHandler<T = React.MouseEvent> = EventHandler<T>;

/** Enhanced touch event handler */
export type TouchEventHandler<T = React.TouchEvent> = EventHandler<T>;

/** Enhanced keyboard event handler */
export type KeyboardEventHandler<T = React.KeyboardEvent> = EventHandler<T>;

/** Enhanced focus event handler */
export type FocusEventHandler<T = React.FocusEvent> = EventHandler<T>;

/** Enhanced change event handler */
export type ChangeEventHandler<T = React.ChangeEvent> = EventHandler<T>;

/** Enhanced form event handler */
export type FormEventHandler<T = React.FormEvent> = EventHandler<T>;

// ==================== Validation Types ====================

/** Validation result type */
export type ValidationResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

/** Async validator type */
export type AsyncValidator<T = any> = (value: T) => Promise<ValidationResult<T>>;

/** Sync validator type */
export type SyncValidator<T = any> = (value: T) => ValidationResult<T>;

/** Combined validator type */
export type Validator<T = any> = SyncValidator<T> | AsyncValidator<T>;

/** Validation rule type */
export interface ValidationRule<T = any> {
  /** Required validation */
  required?: boolean;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Minimum length */
  minLength?: number;
  /** Maximum length */
  maxLength?: number;
  /** Pattern validation */
  pattern?: RegExp;
  /** Custom validator */
  validator?: Validator<T>;
  /** Error message */
  message?: string;
  /** Validation trigger */
  trigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** Async validation */
  async?: boolean;
}

// ==================== Component Types ====================

/** Base component props */
export interface BaseComponentProps {
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testID?: string;
  /** Accessibility ID */
  accessibilityId?: string;
  /** Data attributes */
  [key: `data-${string}`]: any;
}

/** Component with size */
export interface SizeableProps extends BaseComponentProps {
  /** Component size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/** Component with variant */
export interface VariantProps extends BaseComponentProps {
  /** Component variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

/** Component with status */
export interface StatusProps extends BaseComponentProps {
  /** Component status */
  status?: 'default' | 'loading' | 'disabled' | 'error' | 'success';
}

/** Component with children */
export interface ComponentWithChildren extends BaseComponentProps {
  /** Children components */
  children?: ReactNode;
}

// ==================== Theme Types ====================

/** Theme mode */
export type ThemeMode = 'light' | 'dark' | 'auto';

/** Theme color palette */
export interface ThemeColors {
  /** Primary color */
  primary: string;
  /** Secondary color */
  secondary: string;
  /** Success color */
  success: string;
  /** Warning color */
  warning: string;
  /** Error color */
  error: string;
  /** Info color */
  info: string;
  /** Background color */
  background: string;
  /** Surface color */
  surface: string;
  /** Text color */
  text: string;
  /** Text secondary color */
  textSecondary: string;
  /** Border color */
  border: string;
  /** Divider color */
  divider: string;
}

/** Theme spacing */
export interface ThemeSpacing {
  /** Extra small spacing */
  xs: number;
  /** Small spacing */
  sm: number;
  /** Medium spacing */
  md: number;
  /** Large spacing */
  lg: number;
  /** Extra large spacing */
  xl: number;
  /** Extra extra large spacing */
  xxl: number;
}

/** Theme typography */
export interface ThemeTypography {
  /** Font family */
  fontFamily: string;
  /** Font sizes */
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  /** Font weights */
  fontWeight: {
    normal: number;
    medium: number;
    bold: number;
  };
  /** Line heights */
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

/** Theme border radius */
export interface ThemeRadius {
  /** No radius */
  none: number;
  /** Small radius */
  sm: number;
  /** Medium radius */
  md: number;
  /** Large radius */
  lg: number;
  /** Full radius */
  full: number;
}

/** Complete theme configuration */
export interface ThemeConfig {
  /** Theme mode */
  mode: ThemeMode;
  /** Color palette */
  colors: ThemeColors;
  /** Spacing */
  spacing: ThemeSpacing;
  /** Typography */
  typography: ThemeTypography;
  /** Border radius */
  radius: ThemeRadius;
  /** Custom CSS variables */
  cssVars?: Record<string, string>;
}

// ==================== Performance Types ====================

/** Memoized component props */
export type MemoizedProps<T> = T extends object
  ? {
      [P in keyof T]: T[P] extends (...args: any) => any ? never : T[P];
    }
  : never;

/** Extract stable props (non-function props) */
export type StableProps<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any) => any ? never : K;
  }[keyof T]
>;

/** Extract event handlers */
export type EventHandlers<T> = Pick<
  T,
  {
    [K in keyof T]: K extends `on${string}` ? K : never;
  }[keyof T]
>;

// ==================== Utility Functions ====================

/** Type guard for string */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/** Type guard for number */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/** Type guard for boolean */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/** Type guard for object */
export function isObject<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Type guard for array */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/** Type guard for function */
export function isFunction<T extends (...args: any) => any>(value: unknown): value is T {
  return typeof value === 'function';
}

/** Type guard for promise */
export function isPromise<T>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}

/** Type guard for React element */
export function isReactElement(value: unknown): value is React.ReactElement {
  return React.isValidElement(value);
}

/** Type guard for undefined */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/** Type guard for null */
export function isNull(value: unknown): value is null {
  return value === null;
}

/** Type guard for empty value */
export function isEmpty(value: unknown): value is null | undefined | '' | 0 | false {
  return value === null || value === undefined || value === '' || value === 0 || value === false;
}

// ==================== Export ====================

export * from './utils';
export default {
  // Type guards
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  isPromise,
  isReactElement,
  isUndefined,
  isNull,
  isEmpty,
};