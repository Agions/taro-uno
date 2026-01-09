/**
 * 类名合并工具
 * 提供灵活的类名合并功能，支持多种输入格式
 */

/** 类名值类型 */
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

/**
 * 合并类名
 * 支持字符串、数组、对象等多种格式
 *
 * @example
 * ```typescript
 * cn('foo', 'bar') // => 'foo bar'
 * cn('foo', { bar: true, baz: false }) // => 'foo bar'
 * cn(['foo', 'bar']) // => 'foo bar'
 * cn('foo', undefined, 'bar', null, false) // => 'foo bar'
 * ```
 */
export function cn(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      const inner = cn(...arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * 创建带前缀的类名生成器
 *
 * @example
 * ```typescript
 * const bem = createBEM('button');
 * bem() // => 'button'
 * bem('icon') // => 'button__icon'
 * bem('icon', 'large') // => 'button__icon--large'
 * bem({ disabled: true }) // => 'button button--disabled'
 * ```
 */
export function createBEM(block: string): {
  (): string;
  (element: string): string;
  (element: string, modifier: string): string;
  (modifiers: Record<string, boolean | undefined | null>): string;
} {
  return function bem(
    elementOrModifiers?: string | Record<string, boolean | undefined | null>,
    modifier?: string,
  ): string {
    if (!elementOrModifiers) {
      return block;
    }

    if (typeof elementOrModifiers === 'object') {
      const classes = [block];
      for (const key in elementOrModifiers) {
        if (
          Object.prototype.hasOwnProperty.call(elementOrModifiers, key) &&
          elementOrModifiers[key]
        ) {
          classes.push(`${block}--${key}`);
        }
      }
      return classes.join(' ');
    }

    const element = `${block}__${elementOrModifiers}`;
    if (modifier) {
      return `${element}--${modifier}`;
    }
    return element;
  };
}

/**
 * 创建带命名空间的类名生成器
 *
 * @example
 * ```typescript
 * const ns = createNamespace('taro-uno');
 * ns('button') // => 'taro-uno-button'
 * ns('button', 'primary') // => 'taro-uno-button taro-uno-button--primary'
 * ```
 */
export function createNamespace(namespace: string): {
  (component: string): string;
  (component: string, modifier: string): string;
  (component: string, modifiers: Record<string, boolean | undefined | null>): string;
} {
  return function ns(
    component: string,
    modifierOrModifiers?: string | Record<string, boolean | undefined | null>,
  ): string {
    const base = `${namespace}-${component}`;

    if (!modifierOrModifiers) {
      return base;
    }

    if (typeof modifierOrModifiers === 'string') {
      return `${base} ${base}--${modifierOrModifiers}`;
    }

    const classes = [base];
    for (const key in modifierOrModifiers) {
      if (
        Object.prototype.hasOwnProperty.call(modifierOrModifiers, key) &&
        modifierOrModifiers[key]
      ) {
        classes.push(`${base}--${key}`);
      }
    }
    return classes.join(' ');
  };
}

/**
 * 条件类名
 * 根据条件返回类名或空字符串
 *
 * @example
 * ```typescript
 * conditionalClass('active', isActive) // => 'active' or ''
 * ```
 */
export function conditionalClass(
  className: string,
  condition: boolean | undefined | null,
): string {
  return condition ? className : '';
}

/**
 * 合并类名数组，去除重复
 *
 * @example
 * ```typescript
 * uniqueClasses('foo bar', 'bar baz') // => 'foo bar baz'
 * ```
 */
export function uniqueClasses(...classStrings: (string | undefined | null)[]): string {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const str of classStrings) {
    if (!str) continue;
    const classes = str.split(/\s+/).filter(Boolean);
    for (const cls of classes) {
      if (!seen.has(cls)) {
        seen.add(cls);
        result.push(cls);
      }
    }
  }

  return result.join(' ');
}

// 默认导出 cn 函数
export default cn;
