/**
 * Type Validation Utilities
 * Provides comprehensive type validation and runtime type checking utilities
 */

import type {
  ValidationResult,
  Validator,
  AsyncValidator,
  SyncValidator,
  ValidationRule,
  EnhancedButtonProps,
  EnhancedInputProps,
  EnhancedFormProps,
  EnhancedSelectProps,
  EnhancedTableProps,
  EnhancedLoadingProps,
  EnhancedMessageProps,
  EnhancedToastProps,
  EnhancedModalProps,
} from '@/types/enhanced-components';

import {
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
} from '@/types/enhanced-utils';

// ==================== Type Validation Constants ====================

/** Validation error codes */
export const VALIDATION_ERROR_CODES = {
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_VALUE: 'INVALID_VALUE',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_RANGE: 'INVALID_RANGE',
  INVALID_LENGTH: 'INVALID_LENGTH',
  CUSTOM_VALIDATION_FAILED: 'CUSTOM_VALIDATION_FAILED',
  ASYNC_VALIDATION_FAILED: 'ASYNC_VALIDATION_FAILED',
} as const;

/** Component type mapping */
export const COMPONENT_TYPE_MAPPING = {
  button: 'button',
  input: 'textbox',
  select: 'combobox',
  form: 'form',
  table: 'table',
  loading: 'progressbar',
  message: 'alert',
  toast: 'alert',
  modal: 'dialog',
} as const;

// ==================== Basic Type Validators ====================

/** String validator */
export const stringValidator: Validator<string> = (value) => {
  if (!isString(value)) {
    return { success: false, error: 'Value must be a string' };
  }
  return { success: true, data: value };
};

/** Number validator */
export const numberValidator: Validator<number> = (value) => {
  if (!isNumber(value)) {
    return { success: false, error: 'Value must be a number' };
  }
  return { success: true, data: value };
};

/** Boolean validator */
export const booleanValidator: Validator<boolean> = (value) => {
  if (!isBoolean(value)) {
    return { success: false, error: 'Value must be a boolean' };
  }
  return { success: true, data: value };
};

/** Object validator */
export const objectValidator: Validator<object> = (value) => {
  if (!isObject(value)) {
    return { success: false, error: 'Value must be an object' };
  }
  return { success: true, data: value };
};

/** Array validator */
export const arrayValidator: Validator<any[]> = (value) => {
  if (!isArray(value)) {
    return { success: false, error: 'Value must be an array' };
  }
  return { success: true, data: value };
};

/** Function validator */
export const functionValidator: Validator<(...args: any) => any> = (value) => {
  if (!isFunction(value)) {
    return { success: false, error: 'Value must be a function' };
  }
  return { success: true, data: value };
};

// ==================== Advanced Type Validators ====================

/** Email validator */
export const emailValidator: Validator<string> = (value) => {
  const stringResult = stringValidator(value);
  if (!stringResult.success) {
    return stringResult;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return { success: false, error: 'Invalid email format' };
  }

  return { success: true, data: value };
};

/** URL validator */
export const urlValidator: Validator<string> = (value) => {
  const stringResult = stringValidator(value);
  if (!stringResult.success) {
    return stringResult;
  }

  try {
    new URL(value);
    return { success: true, data: value };
  } catch {
    return { success: false, error: 'Invalid URL format' };
  }
};

/** Phone number validator */
export const phoneValidator: Validator<string> = (value) => {
  const stringResult = stringValidator(value);
  if (!stringResult.success) {
    return stringResult;
  }

  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(value)) {
    return { success: false, error: 'Invalid phone number format' };
  }

  return { success: true, data: value };
};

/** Date validator */
export const dateValidator: Validator<Date | string> = (value) => {
  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (isString(value)) {
    date = new Date(value);
  } else {
    return { success: false, error: 'Value must be a Date or string' };
  }

  if (isNaN(date.getTime())) {
    return { success: false, error: 'Invalid date format' };
  }

  return { success: true, data: date };
};

// ==================== Component Type Validators ====================

/** Button props validator */
export const buttonPropsValidator: Validator<EnhancedButtonProps> = (props) => {
  if (!isObject(props)) {
    return { success: false, error: 'Button props must be an object' };
  }

  const errors: string[] = [];

  // Validate size
  if (props.size !== undefined && !['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) {
    errors.push('Invalid button size');
  }

  // Validate variant
  if (props.variant !== undefined && !['solid', 'outline', 'ghost', 'text'].includes(props.variant)) {
    errors.push('Invalid button variant');
  }

  // Validate shape
  if (props.shape !== undefined && !['default', 'rounded', 'circle', 'square'].includes(props.shape)) {
    errors.push('Invalid button shape');
  }

  // Validate icon position
  if (props.iconPosition !== undefined && !['left', 'right'].includes(props.iconPosition)) {
    errors.push('Invalid icon position');
  }

  // Validate animation duration
  if (props.animationDuration !== undefined && (props.animationDuration < 0 || props.animationDuration > 5000)) {
    errors.push('Animation duration must be between 0 and 5000ms');
  }

  // Validate boolean props
  const booleanProps = ['disabled', 'loading', 'block', 'bordered', 'ripple', 'shadow'];
  for (const prop of booleanProps) {
    if (props[prop] !== undefined && !isBoolean(props[prop])) {
      errors.push(`${prop} must be a boolean`);
    }
  }

  if (errors.length > 0) {
    return { success: false, error: errors.join(', ') };
  }

  return { success: true, data: props };
};

/** Input props validator */
export const inputPropsValidator: Validator<EnhancedInputProps> = (props) => {
  if (!isObject(props)) {
    return { success: false, error: 'Input props must be an object' };
  }

  const errors: string[] = [];

  // Validate input type
  if (props.type !== undefined && !['text', 'password', 'number', 'email', 'tel', 'idcard', 'digit'].includes(props.type)) {
    errors.push('Invalid input type');
  }

  // Validate input variant
  if (props.variant !== undefined && !['outlined', 'filled', 'underlined'].includes(props.variant)) {
    errors.push('Invalid input variant');
  }

  // Validate max length
  if (props.maxLength !== undefined && (props.maxLength < 0 || props.maxLength > 10000)) {
    errors.push('Max length must be between 0 and 10000');
  }

  // Validate min length
  if (props.minLength !== undefined && (props.minLength < 0 || props.minLength > 10000)) {
    errors.push('Min length must be between 0 and 10000');
  }

  // Validate rows for multiline input
  if (props.multiline && props.rows !== undefined && (props.rows < 1 || props.rows > 10)) {
    errors.push('Rows must be between 1 and 10');
  }

  if (errors.length > 0) {
    return { success: false, error: errors.join(', ') };
  }

  return { success: true, data: props };
};

/** Form props validator */
export const formPropsValidator: Validator<EnhancedFormProps> = (props) => {
  if (!isObject(props)) {
    return { success: false, error: 'Form props must be an object' };
  }

  const errors: string[] = [];

  // Validate form layout
  if (props.layout !== undefined && !['horizontal', 'vertical', 'inline'].includes(props.layout)) {
    errors.push('Invalid form layout');
  }

  // Validate label alignment
  if (props.labelAlign !== undefined && !['left', 'right', 'top'].includes(props.labelAlign)) {
    errors.push('Invalid label alignment');
  }

  // Validate validation trigger
  if (props.validateTrigger !== undefined && !['onChange', 'onBlur', 'onSubmit'].includes(props.validateTrigger)) {
    errors.push('Invalid validation trigger');
  }

  // Validate required mark
  if (props.requiredMark !== undefined && !['boolean', 'optional'].includes(typeof props.requiredMark)) {
    errors.push('Invalid required mark');
  }

  if (errors.length > 0) {
    return { success: false, error: errors.join(', ') };
  }

  return { success: true, data: props };
};

// ==================== Rule-Based Validation ====================

/** Validate value against rules */
export const validateWithRules = async <T>(
  value: T,
  rules: ValidationRule<T>[]
): Promise<ValidationResult<T>> => {
  for (const rule of rules) {
    // Required validation
    if (rule.required && isEmpty(value)) {
      return {
        success: false,
        error: rule.message || 'This field is required',
        code: VALIDATION_ERROR_CODES.REQUIRED_FIELD,
      };
    }

    // Skip other validations if value is empty and not required
    if (isEmpty(value) && !rule.required) {
      continue;
    }

    // Type validation
    if (rule.type && typeof value !== rule.type) {
      return {
        success: false,
        error: rule.message || `Expected ${rule.type}, got ${typeof value}`,
        code: VALIDATION_ERROR_CODES.INVALID_TYPE,
      };
    }

    // Range validation
    if (rule.min !== undefined && value < rule.min) {
      return {
        success: false,
        error: rule.message || `Value must be at least ${rule.min}`,
        code: VALIDATION_ERROR_CODES.INVALID_RANGE,
      };
    }

    if (rule.max !== undefined && value > rule.max) {
      return {
        success: false,
        error: rule.message || `Value must be at most ${rule.max}`,
        code: VALIDATION_ERROR_CODES.INVALID_RANGE,
      };
    }

    // Length validation
    if (rule.minLength !== undefined && String(value).length < rule.minLength) {
      return {
        success: false,
        error: rule.message || `Value must be at least ${rule.minLength} characters`,
        code: VALIDATION_ERROR_CODES.INVALID_LENGTH,
      };
    }

    if (rule.maxLength !== undefined && String(value).length > rule.maxLength) {
      return {
        success: false,
        error: rule.message || `Value must be at most ${rule.maxLength} characters`,
        code: VALIDATION_ERROR_CODES.INVALID_LENGTH,
      };
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return {
        success: false,
        error: rule.message || 'Invalid format',
        code: VALIDATION_ERROR_CODES.INVALID_FORMAT,
      };
    }

    // Custom validation
    if (rule.validator) {
      try {
        const result = rule.validator(value);

        if (isPromise(result)) {
          const asyncResult = await result;
          if (asyncResult !== true) {
            return {
              success: false,
              error: asyncResult || rule.message || 'Custom validation failed',
              code: VALIDATION_ERROR_CODES.CUSTOM_VALIDATION_FAILED,
            };
          }
        } else if (result !== true) {
          return {
            success: false,
            error: result || rule.message || 'Custom validation failed',
            code: VALIDATION_ERROR_CODES.CUSTOM_VALIDATION_FAILED,
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Custom validation error',
          code: VALIDATION_ERROR_CODES.CUSTOM_VALIDATION_FAILED,
        };
      }
    }
  }

  return { success: true, data: value };
};

// ==================== Schema Validation ====================

/** Validation schema interface */
export interface ValidationSchema<T = any> {
  [key: string]: {
    required?: boolean;
    type?: string;
    validator?: Validator<any>;
    rules?: ValidationRule<any>[];
    message?: string;
  };
}

/** Validate object against schema */
export const validateSchema = async <T>(
  data: T,
  schema: ValidationSchema<T>
): Promise<{ valid: boolean; errors: Record<string, string[]>; data: T }> => {
  const errors: Record<string, string[]> = {};
  const validatedData: any = {};

  for (const [key, config] of Object.entries(schema)) {
    const value = (data as any)[key];

    // Required validation
    if (config.required && isEmpty(value)) {
      errors[key] = [config.message || `${key} is required`];
      continue;
    }

    // Skip other validations if value is empty and not required
    if (isEmpty(value) && !config.required) {
      continue;
    }

    // Type validation
    if (config.type && typeof value !== config.type) {
      errors[key] = [config.message || `${key} must be ${config.type}`];
      continue;
    }

    // Custom validator
    if (config.validator) {
      const result = config.validator(value);
      if (isPromise(result)) {
        const asyncResult = await result;
        if (!asyncResult.success) {
          errors[key] = [asyncResult.error];
          continue;
        }
      } else if (!result.success) {
        errors[key] = [result.error];
        continue;
      }
    }

    // Rules validation
    if (config.rules) {
      const ruleResult = await validateWithRules(value, config.rules);
      if (!ruleResult.success) {
        errors[key] = [ruleResult.error];
        continue;
      }
    }

    validatedData[key] = value;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: validatedData,
  };
};

// ==================== Type Guard Utilities ====================

/** Enhanced type guard with error details */
export function createTypeGuard<T>(
  validator: Validator<T>,
  errorMessage?: string
): (value: unknown) => value is T {
  return (value: unknown): value is T => {
    const result = validator(value);
    return result.success;
  };
}

/** Component type guard */
export const isComponentProps = <T>(
  props: unknown,
  validator: Validator<T>
): props is T => {
  return validator(props).success;
};

/** Type safe event handler */
export function createSafeEventHandler<T extends Event = Event>(
  handler: (event: T) => void,
  errorHandler?: (error: Error) => void
): (event: unknown) => void {
  return (event: unknown) => {
    try {
      handler(event as T);
    } catch (error) {
      if (errorHandler) {
        errorHandler(error as Error);
      } else {
        console.error('Event handler error:', error);
      }
    }
  };
}

// ==================== Performance Optimized Validators ====================

/** Memoized validator */
export function createMemoizedValidator<T>(validator: Validator<T>): Validator<T> {
  const cache = new Map<any, ValidationResult<T>>();

  return (value: T): ValidationResult<T> => {
    if (cache.has(value)) {
      return cache.get(value)!;
    }

    const result = validator(value);
    cache.set(value, result);
    return result;
  };
}

/** Debounced validator */
export function createDebouncedValidator<T>(
  validator: Validator<T>,
  delay: number = 300
): Validator<T> {
  let timeoutId: NodeJS.Timeout | null = null;

  return (value: T): Promise<ValidationResult<T>> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const result = validator(value);
        resolve(result);
        timeoutId = null;
      }, delay);
    });
  };
}

// ==================== Export ====================

export {
  VALIDATION_ERROR_CODES,
  COMPONENT_TYPE_MAPPING,
  stringValidator,
  numberValidator,
  booleanValidator,
  objectValidator,
  arrayValidator,
  functionValidator,
  emailValidator,
  urlValidator,
  phoneValidator,
  dateValidator,
  buttonPropsValidator,
  inputPropsValidator,
  formPropsValidator,
  validateWithRules,
  validateSchema,
  createTypeGuard,
  isComponentProps,
  createSafeEventHandler,
  createMemoizedValidator,
  createDebouncedValidator,
};