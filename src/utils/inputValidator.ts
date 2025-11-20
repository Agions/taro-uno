/**
 * 输入验证工具
 * 提供常见的输入验证功能，防止安全漏洞
 */

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitized?: string | Record<string, any> | undefined;
}

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  sanitize?: boolean;
}

class InputValidator {
  /**
   * 验证字符串输入
   * @param value 输入值
   * @param rules 验证规则
   * @returns 验证结果
   */
  validateString(value: string, rules: ValidationRule): ValidationResult {
    const errors: string[] = [];
    let sanitized = value;

    // 检查必填
    if (rules.required && (!value || value.trim() === '')) {
      errors.push('此字段为必填项');
    }

    // 如果没有值且不是必填，直接返回有效
    if (!value && !rules.required) {
      return { isValid: true, errors: [] };
    }

    // 检查最小长度
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`长度不能少于 ${rules.minLength} 个字符`);
    }

    // 检查最大长度
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`长度不能超过 ${rules.maxLength} 个字符`);
    }

    // 检查正则表达式
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push('格式不正确');
    }

    // 自定义验证
    if (rules.custom && !rules.custom(value)) {
      errors.push('自定义验证失败');
    }

    // 清理输入
    if (rules.sanitize) {
      sanitized = this.sanitizeString(value);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized
    };
  }

  /**
   * 验证邮箱地址
   * @param email 邮箱地址
   * @returns 验证结果
   */
  validateEmail(email: string): ValidationResult {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.validateString(email, {
      required: true,
      pattern: emailPattern,
      sanitize: true
    });
  }

  /**
   * 验证手机号码
   * @param phone 手机号码
   * @param countryCode 国家代码 (默认 'CN')
   * @returns 验证结果
   */
  validatePhone(phone: string, countryCode: 'CN' | 'US' | 'GB' | 'JP' | 'KR' = 'CN'): ValidationResult {
    let phonePattern: RegExp;
    switch (countryCode) {
      case 'CN':
        phonePattern = /^1[3-9]\d{9}$/; // 中国大陆手机号
        break;
      case 'US':
        phonePattern = /^\+?1[2-9]\d{2}[2-9](?!11)\d{6}$/; // 美国手机号
        break;
      case 'GB':
        phonePattern = /^\+?44[7-9]\d{9}$/; // 英国手机号
        break;
      case 'JP':
        phonePattern = /^\+?81[0-9]{10}$/; // 日本手机号
        break;
      case 'KR':
        phonePattern = /^\+?82[1-9]\d{7,8}$/; // 韩国手机号
        break;
      default:
        phonePattern = /^1[3-9]\d{9}$/; // 默认中国
    }
    return this.validateString(phone, {
      required: true,
      pattern: phonePattern,
      sanitize: true
    });
  }

  /**
   * 验证URL
   * @param url URL地址
   * @returns 验证结果
   */
  validateURL(url: string): ValidationResult {
    try {
      // 尝试创建URL对象
      new URL(url);

      // 验证协议
      const allowedProtocols = ['http:', 'https:'];
      const urlObj = new URL(url);

      if (!allowedProtocols.includes(urlObj.protocol)) {
        return {
          isValid: false,
          errors: ['只支持 http 和 https 协议']
        };
      }

      return {
        isValid: true,
        errors: [],
        sanitized: url
      };
    } catch (e) {
      return {
        isValid: false,
        errors: ['无效的URL地址']
      };
    }
  }

  /**
   * 验证数字
   * @param value 输入值
   * @param min 最小值
   * @param max 最大值
   * @returns 验证结果
   */
  validateNumber(value: string, min?: number, max?: number): ValidationResult {
    const errors: string[] = [];
    const num = parseFloat(value);

    if (isNaN(num)) {
      errors.push('请输入有效的数字');
      return { isValid: false, errors };
    }

    if (min !== undefined && num < min) {
      errors.push(`不能小于 ${min}`);
    }

    if (max !== undefined && num > max) {
      errors.push(`不能大于 ${max}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 清理字符串输入
   * @param value 输入值
   * @returns 清理后的值
   */
  private sanitizeString(value: string): string {
    // 移除首尾空格
    let sanitized = value.trim();

    // 移除控制字符
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

    // 替换多个连续空格为单个空格
    sanitized = sanitized.replace(/\s+/g, ' ');

    return sanitized;
  }

  /**
   * 验证对象的所有属性
   * @param obj 输入对象
   * @param rules 验证规则映射
   * @returns 验证结果
   */
  validateObject(obj: Record<string, any>, rules: Record<string, ValidationRule>): ValidationResult {
    const errors: string[] = [];
    const sanitized: Record<string, any> = {};

    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const value = obj[key];
        const rule = rules[key];

        if (typeof value === 'string') {
          const result = this.validateString(value, rule || {});
          if (!result.isValid) {
            errors.push(...result.errors.map(err => `${key}: ${err}`));
          }
          if (result.sanitized !== undefined) {
            sanitized[key] = result.sanitized;
          } else {
            sanitized[key] = value;
          }
        } else if (typeof value === 'number') {
          const strValue = String(value);
          const result = this.validateNumber(strValue, rule?.minLength, rule?.maxLength);
          if (!result.isValid) {
            errors.push(...result.errors.map(err => `${key}: ${err}`));
          }
          sanitized[key] = value;
        } else {
          sanitized[key] = value;
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized: Object.keys(sanitized).length > 0 ? sanitized : undefined
    };
  }
}

// 创建单例实例
const inputValidator = new InputValidator();

// 导出便捷方法
export const validateString = (value: string, rules: ValidationRule) => inputValidator.validateString(value, rules);
export const validateEmail = (email: string) => inputValidator.validateEmail(email);
export const validatePhone = (phone: string, countryCode: 'CN' | 'US' | 'GB' | 'JP' | 'KR' = 'CN') => inputValidator.validatePhone(phone, countryCode);
export const validateURL = (url: string) => inputValidator.validateURL(url);
export const validateNumber = (value: string, min?: number, max?: number) => inputValidator.validateNumber(value, min, max);
export const validateObject = (obj: Record<string, any>, rules: Record<string, ValidationRule>) => inputValidator.validateObject(obj, rules);

export default inputValidator;