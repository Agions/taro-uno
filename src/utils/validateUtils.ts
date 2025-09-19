/**
 * 验证和转换工具库
 * 提供通用的验证和转换逻辑，包括类型转换、数据验证、规则验证等
 */

// ==================== 类型转换 ====================

/** 类型转换工具类 */
export class TypeConversionUtils {
  /** 转换为数字 */
  static toNumber(value: any, defaultValue: number = 0): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? defaultValue : num;
    }
    if (typeof value === 'boolean') return value ? 1 : 0;
    return defaultValue;
  }

  /** 转换为整数 */
  static toInteger(value: any, defaultValue: number = 0): number {
    const num = this.toNumber(value, defaultValue);
    return Math.floor(num);
  }

  /** 转换为字符串 */
  static toString(value: any, defaultValue: string = ''): string {
    if (value === null || value === undefined) return defaultValue;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  /** 转换为布尔值 */
  static toBoolean(value: any, defaultValue: boolean = false): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      return ['true', '1', 'yes', 'on', 'y'].includes(lowerValue);
    }
    if (typeof value === 'number') return value !== 0;
    return defaultValue;
  }

  /** 转换为数组 */
  static toArray<T>(value: any): T[] {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined) return [];
    return [value];
  }

  /** 转换为对象 */
  static toObject(value: any): Record<string, any> {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return value;
    }
    try {
      return JSON.parse(this.toString(value));
    } catch {
      return {};
    }
  }

  /** 转换为日期 */
  static toDate(value: any): Date | null {
    if (value instanceof Date) return value;
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  }

  /** 安全的JSON解析 */
  static safeParseJSON<T>(jsonString: string, defaultValue: T): T {
    try {
      return JSON.parse(jsonString);
    } catch {
      return defaultValue;
    }
  }

  /** 安全的JSON字符串化 */
  static safeStringifyJSON(obj: any, indent?: number): string {
    try {
      return JSON.stringify(obj, null, indent);
    } catch {
      return '{}';
    }
  }

  /** Base64编码 */
  static toBase64(str: string): string {
    try {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
    } catch {
      return '';
    }
  }

  /** Base64解码 */
  static fromBase64(base64: string): string {
    try {
      return decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch {
      return '';
    }
  }

  /** URL编码 */
  static encodeURL(str: string): string {
    return encodeURIComponent(str);
  }

  /** URL解码 */
  static decodeURL(str: string): string {
    return decodeURIComponent(str);
  }
}

// ==================== 数据验证 ====================

/** 验证结果接口 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
  code?: string;
  value?: any;
}

/** 验证规则接口 */
export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'email' | 'phone' | 'url';
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
  message?: string;
}

/** 数据验证工具类 */
export class DataValidationUtils {
  /** 验证邮箱 */
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /** 验证手机号 */
  static isPhone(phone: string): boolean {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  }

  /** 验证身份证号 */
  static isIdCard(idCard: string): boolean {
    const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return idCardRegex.test(idCard);
  }

  /** 验证URL */
  static isUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /** 验证IP地址 */
  static isIP(ip: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  /** 验证端口号 */
  static isPort(port: string | number): boolean {
    const portNum = typeof port === 'string' ? parseInt(port) : port;
    return portNum >= 0 && portNum <= 65535;
  }

  /** 验证颜色值 */
  static isColor(color: string): boolean {
    const colorRegex = /^(#([0-9A-Fa-f]{3}){1,2}|rgb\(\s*(\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*\)|rgba\(\s*(\d{1,3}%?\s*,\s*){3}\d*\.?\d+\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*\d*\.?\d+\s*\))$/;
    return colorRegex.test(color);
  }

  /** 验证密码强度 */
  static isStrongPassword(password: string): boolean {
    // 至少8位，包含大小写字母、数字和特殊字符
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /** 验证中文 */
  static isChinese(text: string): boolean {
    const chineseRegex = /^[\u4e00-\u9fa5]+$/;
    return chineseRegex.test(text);
  }

  /** 验证英文 */
  static isEnglish(text: string): boolean {
    const englishRegex = /^[a-zA-Z]+$/;
    return englishRegex.test(text);
  }

  /** 验证字母数字 */
  static isAlphanumeric(text: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(text);
  }

  /** 验证数字 */
  static isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }

  /** 验证整数 */
  static isInteger(value: any): boolean {
    return Number.isInteger(value);
  }

  /** 验证正数 */
  static isPositive(value: any): boolean {
    return this.isNumber(value) && value > 0;
  }

  /** 验证负数 */
  static isNegative(value: any): boolean {
    return this.isNumber(value) && value < 0;
  }

  /** 验证日期 */
  static isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  /** 验证数组 */
  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /** 验证对象 */
  static isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /** 验证函数 */
  static isFunction(value: any): boolean {
    return typeof value === 'function';
  }

  /** 验证Promise */
  static isPromise(value: any): boolean {
    return value instanceof Promise || (typeof value === 'object' && typeof value.then === 'function');
  }

  /** 验证空值 */
  static isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /** 验证非空值 */
  static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }
}

// ==================== 规则验证器 ====================

/** 规则验证器类 */
export class RuleValidator {
  /** 单个值验证 */
  static validate(value: any, rules: ValidationRule[]): ValidationResult {
    for (const rule of rules) {
      const result = this.validateRule(value, rule);
      if (!result.valid) {
        return result;
      }
    }
    return { valid: true, value };
  }

  /** 单个规则验证 */
  static validateRule(value: any, rule: ValidationRule): ValidationResult {
    // 必填验证
    if (rule.required && DataValidationUtils.isEmpty(value)) {
      return {
        valid: false,
        message: rule.message || '此字段为必填项',
        code: 'required',
      };
    }

    // 如果不是必填且值为空，跳过其他验证
    if (!rule.required && DataValidationUtils.isEmpty(value)) {
      return { valid: true, value };
    }

    // 类型验证
    if (rule.type) {
      const typeResult = this.validateType(value, rule.type);
      if (!typeResult.valid) {
        return typeResult;
      }
    }

    // 最小值验证
    if (rule.min !== undefined && typeof value === 'number') {
      if (value < rule.min) {
        return {
          valid: false,
          message: rule.message || `值不能小于${rule.min}`,
          code: 'min',
        };
      }
    }

    // 最大值验证
    if (rule.max !== undefined && typeof value === 'number') {
      if (value > rule.max) {
        return {
          valid: false,
          message: rule.message || `值不能大于${rule.max}`,
          code: 'max',
        };
      }
    }

    // 最小长度验证
    if (rule.minLength !== undefined && typeof value === 'string') {
      if (value.length < rule.minLength) {
        return {
          valid: false,
          message: rule.message || `长度不能少于${rule.minLength}个字符`,
          code: 'minLength',
        };
      }
    }

    // 最大长度验证
    if (rule.maxLength !== undefined && typeof value === 'string') {
      if (value.length > rule.maxLength) {
        return {
          valid: false,
          message: rule.message || `长度不能超过${rule.maxLength}个字符`,
          code: 'maxLength',
        };
      }
    }

    // 正则验证
    if (rule.pattern && typeof value === 'string') {
      if (!rule.pattern.test(value)) {
        return {
          valid: false,
          message: rule.message || '格式不正确',
          code: 'pattern',
        };
      }
    }

    // 自定义验证
    if (rule.custom) {
      const customResult = rule.custom(value);
      if (typeof customResult === 'boolean') {
        if (!customResult) {
          return {
            valid: false,
            message: rule.message || '验证失败',
            code: 'custom',
          };
        }
      } else if (typeof customResult === 'string') {
        return {
          valid: false,
          message: customResult,
          code: 'custom',
        };
      }
    }

    return { valid: true, value };
  }

  /** 类型验证 */
  private static validateType(value: any, type: string): ValidationResult {
    let isValid = false;
    let message = '';

    switch (type) {
      case 'string':
        isValid = typeof value === 'string';
        message = '必须是字符串';
        break;
      case 'number':
        isValid = DataValidationUtils.isNumber(value);
        message = '必须是数字';
        break;
      case 'boolean':
        isValid = typeof value === 'boolean';
        message = '必须是布尔值';
        break;
      case 'array':
        isValid = Array.isArray(value);
        message = '必须是数组';
        break;
      case 'object':
        isValid = DataValidationUtils.isObject(value);
        message = '必须是对象';
        break;
      case 'date':
        isValid = DataValidationUtils.isDate(value);
        message = '必须是日期';
        break;
      case 'email':
        isValid = DataValidationUtils.isEmail(value);
        message = '邮箱格式不正确';
        break;
      case 'phone':
        isValid = DataValidationUtils.isPhone(value);
        message = '手机号格式不正确';
        break;
      case 'url':
        isValid = DataValidationUtils.isUrl(value);
        message = 'URL格式不正确';
        break;
    }

    return {
      valid: isValid,
      message: isValid ? '' : message,
      code: 'type',
    };
  }

  /** 批量验证 */
  static validateBatch(data: Record<string, any>, rules: Record<string, ValidationRule[]>): {
    valid: boolean;
    errors: Record<string, ValidationResult>;
    data: Record<string, any>;
  } {
    const errors: Record<string, ValidationResult> = {};
    const validatedData: Record<string, any> = {};
    let isValid = true;

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = data[field];
      const result = this.validate(value, fieldRules);
      
      validatedData[field] = result.value;
      
      if (!result.valid) {
        errors[field] = result;
        isValid = false;
      }
    }

    return {
      valid: isValid,
      errors,
      data: validatedData,
    };
  }
}

// ==================== 导出 ====================

export const typeConvert = TypeConversionUtils;
export const dataValidate = DataValidationUtils;
export const ruleValidator = RuleValidator;