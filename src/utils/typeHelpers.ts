/**
 * 类型安全工具函数
 * 提供类型安全的工具函数和类型守卫
 */

// ==================== 基础类型检查函数 ====================

/** 检查是否为字符串 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/** 检查是否为数字 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/** 检查是否为布尔值 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/** 检查是否为数组 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/** 检查是否为对象 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null && !isArray(value);
}

/** 检查是否为函数 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/** 检查是否为 undefined */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/** 检查是否为 null */
export function isNull(value: unknown): value is null {
  return value === null;
}

/** 检查是否为空值 */
export function isEmpty(value: unknown): boolean {
  if (isString(value)) return value.trim() === '';
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return isNull(value) || isUndefined(value);
}

/** 检查是否为非空值 */
export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value);
}

// ==================== 通用类型守卫 ====================

/** 检查是否为有效的CSS颜色值 */
export function isCSSColor(value: unknown): value is string {
  if (!isString(value)) return false;
  
  // 检查十六进制颜色
  const hexPattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
  if (hexPattern.test(value)) return true;
  
  // 检查rgb/rgba
  const rgbPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/;
  if (rgbPattern.test(value)) return true;
  
  // 检查CSS颜色关键字
  const cssColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'gray', 'black', 'white', 'transparent'];
  return cssColors.includes(value.toLowerCase());
}

/** 检查是否为有效的URL */
export function isValidURL(value: unknown): value is string {
  if (!isString(value)) return false;
  
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/** 检查是否为有效的邮箱地址 */
export function isValidEmail(value: unknown): value is string {
  if (!isString(value)) return false;
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
}

/** 检查是否为有效的手机号 */
export function isValidPhone(value: unknown): value is string {
  if (!isString(value)) return false;
  
  const phonePattern = /^1[3-9]\d{9}$/;
  return phonePattern.test(value);
}

/** 检查是否为React元素 */
export function isReactElement(value: unknown): boolean {
  return isObject(value) && (value as any).$$typeof != null;
}

/** 检查是否为Promise */
export function isPromiseLike(value: unknown): value is Promise<any> {
  return value !== null && 
         typeof value === 'object' && 
         typeof (value as any).then === 'function';
}

// ==================== 日期类型守卫 ====================

/** 检查是否为有效日期 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/** 检查是否为日期字符串 */
export function isDateString(value: unknown): value is string {
  if (!isString(value)) return false;
  
  const date = new Date(value);
  return isValidDate(date);
}

// ==================== 数字相关 ====================

/** 检查是否为整数 */
export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

/** 检查是否为正数 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/** 检查是否为负数 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0;
}

/** 检查是否在指定范围内 */
export function isInRange(value: unknown, min: number, max: number): value is number {
  return isNumber(value) && value >= min && value <= max;
}

// ==================== 复杂类型检查 ====================

/** 深度相等比较 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  
  if (a === null || b === null) return false;
  if (a === undefined || b === undefined) return false;
  
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => deepEqual(item, b[index]));
    }
    
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
    
    const keysA = Object.keys(a);
    const keysB = Object.keys(b || {});
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => deepEqual((a as any)[key], (b as any)[key]));
  }
  
  return false;
}