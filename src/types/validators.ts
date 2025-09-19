/**
 * 验证器相关的类型定义
 */

// ==================== 验证结果 ====================

/** 验证结果接口 */
export interface ValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误消息 */
  message?: string;
  /** 错误代码 */
  code?: string;
  /** 验证后的值 */
  value?: any;
}

// ==================== 验证规则 ====================

/** 验证规则接口 */
export interface ValidationRule {
  /** 是否必填 */
  required?: boolean;
  /** 数据类型 */
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'email' | 'phone' | 'url';
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 自定义验证函数 */
  custom?: (value: any) => boolean | string;
  /** 错误消息 */
  message?: string;
}

// ==================== 验证器类型 ====================

/** 验证器类型 */
export type Validator<T = any> = {
  (value: unknown): value is T;
  message?: string;
};

// ==================== 批量验证结果 ====================

/** 批量验证结果接口 */
export interface BatchValidationResult {
  /** 是否全部验证通过 */
  valid: boolean;
  /** 错误信息 */
  errors: Record<string, ValidationResult>;
  /** 验证后的数据 */
  data: Record<string, any>;
}

// ==================== 表单验证状态 ====================

/** 表单字段验证状态 */
export interface FormFieldState<T = any> {
  /** 字段值 */
  value: T;
  /** 是否验证通过 */
  isValid: boolean;
  /** 错误消息 */
  error?: string;
  /** 是否被修改过 */
  isDirty: boolean;
  /** 是否被触碰过 */
  isTouched: boolean;
  /** 是否正在验证 */
  isValidating: boolean;
}

// ==================== 异步验证器 ====================

/** 异步验证器接口 */
export interface AsyncValidator<T = any> {
  (value: T): Promise<ValidationResult>;
}

// ==================== 验证器工厂 ====================

/** 验证器工厂接口 */
export interface ValidatorFactory {
  /** 创建必填验证器 */
  required(message?: string): Validator<any>;
  /** 创建类型验证器 */
  type(type: string, message?: string): Validator<any>;
  /** 创建范围验证器 */
  range(min: number, max: number, message?: string): Validator<number>;
  /** 创建长度验证器 */
  length(min: number, max: number, message?: string): Validator<string>;
  /** 创建正则验证器 */
  pattern(regex: RegExp, message?: string): Validator<string>;
  /** 创建自定义验证器 */
  custom<T>(validator: (value: T) => boolean, message?: string): Validator<T>;
}

// ==================== 导出完成 ====================