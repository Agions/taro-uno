import { useCallback } from 'react';
import type { InputNumberValidationResult, InputNumberRule } from '../InputNumber.types';

export interface UseInputNumberValidationParams {
  rules?: InputNumberRule[];
  validator?: (value: number) => boolean | string | Promise<boolean | string>;
  min?: number;
  max?: number;
}

export function useInputNumberValidation({
  rules,
  validator,
  min,
  max,
}: UseInputNumberValidationParams) {
  const validateInput = useCallback(
    async (inputValue: number | null): Promise<InputNumberValidationResult> => {
      if (!rules && !validator && inputValue === null) {
        return { valid: true, value: inputValue, timestamp: Date.now() };
      }

      // 验证必填
      if (rules?.some((rule) => rule.required && inputValue === null)) {
        const requiredRule = rules.find((rule) => rule.required);
        return {
          valid: false,
          message: requiredRule?.message || '此字段为必填项',
          value: inputValue,
          timestamp: Date.now(),
        };
      }

      if (inputValue === null) {
        return { valid: true, value: inputValue, timestamp: Date.now() };
      }

      // 验证最小值
      if (min !== undefined && inputValue < min) {
        return {
          valid: false,
          message: `最小值为${min}`,
          value: inputValue,
          timestamp: Date.now(),
        };
      }

      // 验证最大值
      if (max !== undefined && inputValue > max) {
        return {
          valid: false,
          message: `最大值为${max}`,
          value: inputValue,
          timestamp: Date.now(),
        };
      }

      // 验证规则
      if (rules) {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i] as any;
          if (rule.min !== undefined && inputValue < rule.min) {
            return {
              valid: false,
              message: rule.message || `最小值为${rule.min}`,
              ruleIndex: i,
              value: inputValue,
              timestamp: Date.now(),
            };
          }
          if (rule.max !== undefined && inputValue > rule.max) {
            return {
              valid: false,
              message: rule.message || `最大值为${rule.max}`,
              ruleIndex: i,
              value: inputValue,
              timestamp: Date.now(),
            };
          }
          if (rule.validator) {
            const result = await rule.validator(inputValue);
            if (typeof result === 'string') {
              return {
                valid: false,
                message: result,
                ruleIndex: i,
                value: inputValue,
                timestamp: Date.now(),
              };
            }
            if (!result) {
              return {
                valid: false,
                message: rule.message || '输入格式不正确',
                ruleIndex: i,
                value: inputValue,
                timestamp: Date.now(),
              };
            }
          }
        }
      }

      // 自定义验证函数
      if (validator) {
        const result = await validator(inputValue);
        if (typeof result === 'string') {
          return {
            valid: false,
            message: result,
            value: inputValue,
            timestamp: Date.now(),
          };
        }
        if (!result) {
          return {
            valid: false,
            message: '验证失败',
            value: inputValue,
            timestamp: Date.now(),
          };
        }
      }

      return { valid: true, value: inputValue, timestamp: Date.now() };
    },
    [rules, validator, min, max],
  );

  const validateRequired = useCallback((inputValue: number | null): boolean => {
    if (!rules?.some((rule: any) => rule.required)) return true;
    return inputValue !== null;
  }, [rules]);

  const validateRange = useCallback((inputValue: number | null): boolean => {
    if (inputValue === null) return true;
    if (min !== undefined && inputValue < min) return false;
    if (max !== undefined && inputValue > max) return false;
    return true;
  }, [min, max]);

  return {
    validateInput,
    validateRequired,
    validateRange,
  };
}