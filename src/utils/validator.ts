/**
 * 数据验证工具
 * 提供常用的数据验证函数
 */

/** 验证结果 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/** 验证规则 */
export interface ValidationRule<T = unknown> {
  validator: (value: T) => boolean;
  message: string;
}

// ==================== 基础验证函数 ====================

/**
 * 验证是否为必填
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
}

/**
 * 验证字符串长度
 */
export function isLength(
  value: string,
  options: { min?: number; max?: number },
): boolean {
  const len = value.length;
  if (options.min !== undefined && len < options.min) {
    return false;
  }
  if (options.max !== undefined && len > options.max) {
    return false;
  }
  return true;
}

/**
 * 验证数值范围
 */
export function isInRange(
  value: number,
  options: { min?: number; max?: number },
): boolean {
  if (options.min !== undefined && value < options.min) {
    return false;
  }
  if (options.max !== undefined && value > options.max) {
    return false;
  }
  return true;
}

// ==================== 格式验证函数 ====================

/**
 * 验证邮箱格式
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * 验证手机号格式（中国大陆）
 */
export function isPhone(value: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(value);
}

/**
 * 验证固定电话格式
 */
export function isTelephone(value: string): boolean {
  const telRegex = /^(\d{3,4}-)?\d{7,8}$/;
  return telRegex.test(value);
}

/**
 * 验证 URL 格式
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证身份证号格式（中国大陆）
 */
export function isIdCard(value: string): boolean {
  // 15位或18位身份证号
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!idCardRegex.test(value)) {
    return false;
  }

  // 18位身份证号校验
  if (value.length === 18) {
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      const char = value.charAt(i);
      const weight = weights[i] ?? 0;
      sum += parseInt(char, 10) * weight;
    }
    const checkCode = checkCodes[sum % 11] ?? '';
    return value.charAt(17).toUpperCase() === checkCode;
  }

  return true;
}

/**
 * 验证邮政编码格式（中国大陆）
 */
export function isPostalCode(value: string): boolean {
  const postalCodeRegex = /^\d{6}$/;
  return postalCodeRegex.test(value);
}

/**
 * 验证银行卡号格式
 */
export function isBankCard(value: string): boolean {
  // 银行卡号一般为 16-19 位数字
  const bankCardRegex = /^\d{16,19}$/;
  if (!bankCardRegex.test(value)) {
    return false;
  }

  // Luhn 算法校验
  let sum = 0;
  let isEven = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * 验证 IP 地址格式（IPv4）
 */
export function isIPv4(value: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(value)) {
    return false;
  }
  const parts = value.split('.');
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
}

/**
 * 验证 IP 地址格式（IPv6）
 */
export function isIPv6(value: string): boolean {
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv6Regex.test(value);
}

/**
 * 验证十六进制颜色格式
 */
export function isHexColor(value: string): boolean {
  const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  return hexColorRegex.test(value);
}

// ==================== 内容验证函数 ====================

/**
 * 验证是否只包含数字
 */
export function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

/**
 * 验证是否只包含字母
 */
export function isAlpha(value: string): boolean {
  return /^[a-zA-Z]+$/.test(value);
}

/**
 * 验证是否只包含字母和数字
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * 验证是否为整数
 */
export function isInteger(value: string | number): boolean {
  if (typeof value === 'number') {
    return Number.isInteger(value);
  }
  return /^-?\d+$/.test(value);
}

/**
 * 验证是否为浮点数
 */
export function isFloat(value: string | number): boolean {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }
  return /^-?\d+(\.\d+)?$/.test(value);
}

/**
 * 验证是否为正数
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * 验证是否为负数
 */
export function isNegative(value: number): boolean {
  return value < 0;
}

/**
 * 验证是否包含中文
 */
export function containsChinese(value: string): boolean {
  return /[\u4e00-\u9fa5]/.test(value);
}

/**
 * 验证是否只包含中文
 */
export function isChineseOnly(value: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(value);
}

// ==================== 密码验证函数 ====================

/**
 * 验证密码强度
 * @returns 强度等级 0-4（弱-强）
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  // 长度检查
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // 包含小写字母
  if (/[a-z]/.test(password)) strength++;

  // 包含大写字母
  if (/[A-Z]/.test(password)) strength++;

  // 包含数字
  if (/\d/.test(password)) strength++;

  // 包含特殊字符
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength++;

  // 归一化到 0-4
  return Math.min(4, Math.floor(strength * 4 / 6));
}

/**
 * 验证密码是否符合要求
 */
export function isValidPassword(
  password: string,
  options: {
    minLength?: number;
    maxLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
  } = {},
): ValidationResult {
  const {
    minLength = 8,
    maxLength = 32,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = false,
  } = options;

  if (password.length < minLength) {
    return { valid: false, message: `密码长度不能少于 ${minLength} 位` };
  }

  if (password.length > maxLength) {
    return { valid: false, message: `密码长度不能超过 ${maxLength} 位` };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, message: '密码必须包含大写字母' };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return { valid: false, message: '密码必须包含小写字母' };
  }

  if (requireNumber && !/\d/.test(password)) {
    return { valid: false, message: '密码必须包含数字' };
  }

  if (requireSpecial && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { valid: false, message: '密码必须包含特殊字符' };
  }

  return { valid: true };
}

// ==================== 日期验证函数 ====================

/**
 * 验证日期格式（YYYY-MM-DD）
 */
export function isDateFormat(value: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return false;
  }
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * 验证时间格式（HH:mm:ss）
 */
export function isTimeFormat(value: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(value);
}

/**
 * 验证日期时间格式（YYYY-MM-DD HH:mm:ss）
 */
export function isDateTimeFormat(value: string): boolean {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  if (!dateTimeRegex.test(value)) {
    return false;
  }
  const date = new Date(value.replace(' ', 'T'));
  return !isNaN(date.getTime());
}

/**
 * 验证日期是否在指定范围内
 */
export function isDateInRange(
  value: Date | string,
  options: { min?: Date | string; max?: Date | string },
): boolean {
  const date = typeof value === 'string' ? new Date(value) : value;
  const minDate = options.min ? (typeof options.min === 'string' ? new Date(options.min) : options.min) : null;
  const maxDate = options.max ? (typeof options.max === 'string' ? new Date(options.max) : options.max) : null;

  if (minDate && date < minDate) {
    return false;
  }
  if (maxDate && date > maxDate) {
    return false;
  }
  return true;
}

// ==================== 通用验证函数 ====================

/**
 * 使用正则表达式验证
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

/**
 * 验证值是否在枚举列表中
 */
export function isOneOf<T>(value: T, allowedValues: T[]): boolean {
  return allowedValues.includes(value);
}

/**
 * 创建验证器
 */
export function createValidator<T>(
  rules: ValidationRule<T>[],
): (value: T) => ValidationResult {
  return (value: T): ValidationResult => {
    for (const rule of rules) {
      if (!rule.validator(value)) {
        return { valid: false, message: rule.message };
      }
    }
    return { valid: true };
  };
}

/**
 * 批量验证
 */
export function validateAll(
  validations: Array<{ value: unknown; validator: (value: unknown) => boolean; message: string }>,
): ValidationResult[] {
  return validations.map(({ value, validator, message }) => ({
    valid: validator(value),
    message: validator(value) ? undefined : message,
  }));
}

/**
 * 验证对象的所有字段
 */
export function validateObject<T extends Record<string, unknown>>(
  obj: T,
  rules: { [K in keyof T]?: ValidationRule<T[K]>[] },
): Record<keyof T, ValidationResult> {
  const results = {} as Record<keyof T, ValidationResult>;

  for (const key in rules) {
    const fieldRules = rules[key];
    if (!fieldRules) {
      results[key] = { valid: true };
      continue;
    }

    const value = obj[key];
    let result: ValidationResult = { valid: true };

    for (const rule of fieldRules) {
      if (!rule.validator(value)) {
        result = { valid: false, message: rule.message };
        break;
      }
    }

    results[key] = result;
  }

  return results;
}

// ==================== 默认导出 ====================

export default {
  isRequired,
  isLength,
  isInRange,
  isEmail,
  isPhone,
  isTelephone,
  isUrl,
  isIdCard,
  isPostalCode,
  isBankCard,
  isIPv4,
  isIPv6,
  isHexColor,
  isNumeric,
  isAlpha,
  isAlphanumeric,
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  containsChinese,
  isChineseOnly,
  getPasswordStrength,
  isValidPassword,
  isDateFormat,
  isTimeFormat,
  isDateTimeFormat,
  isDateInRange,
  matchesPattern,
  isOneOf,
  createValidator,
  validateAll,
  validateObject,
};
