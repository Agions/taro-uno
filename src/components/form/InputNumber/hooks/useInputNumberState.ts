import { useState, useEffect, useCallback, useRef } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import type {
  InputNumberStatus,
  InputNumberValidationResult,
  InputNumberFormatConfig,
  InputNumberRule,
} from '../InputNumber.types';
import { inputNumberStyles } from '../InputNumber.styles';

export interface UseInputNumberStateParams {
  value?: number | null;
  defaultValue?: number | null;
  disabled?: boolean;
  readonly?: boolean;
  status?: InputNumberStatus;
  autoFocus?: boolean;
  immediate?: boolean;
  min?: number;
  max?: number;
  precision?: number;
  formatConfig?: InputNumberFormatConfig;
  rules?: InputNumberRule[];
  validateTrigger?: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
  validator?: (value: number) => boolean | string | Promise<boolean | string>;
  onValidate?: (result: InputNumberValidationResult) => void;
}

export interface UseInputNumberStateReturn {
  value: number | null;
  displayText: string;
  isFocused: boolean;
  internalStatus: InputNumberStatus;
  internalDisabled: boolean;
  internalReadonly: boolean;
  validationResult: InputNumberValidationResult | null;
  nativeInputRef: React.RefObject<HTMLInputElement | null>;
  handleValueChange: (newValue: number | null, event: ITouchEvent, shouldTriggerEvents?: boolean) => Promise<void>;
  handleTextChange: (text: string, event: ITouchEvent) => Promise<void>;
  handleFocus: (event: ITouchEvent) => Promise<void>;
  handleBlur: (event: ITouchEvent) => Promise<void>;
  validateInput: (inputValue: number | null) => Promise<InputNumberValidationResult>;
  setInternalStatus: (status: InputNumberStatus) => void;
  setInternalDisabled: (disabled: boolean) => void;
  setInternalReadonly: (readonly: boolean) => void;
}

export function useInputNumberState(params: UseInputNumberStateParams): UseInputNumberStateReturn {
  const {
    value: controlledValue,
    defaultValue = null,
    disabled = false,
    readonly = false,
    status: propStatus = 'normal',
    autoFocus = false,
    immediate = false,
    min,
    max,
    precision = 0,
    formatConfig = { type: 'decimal', precision: 0 },
    rules,
    validateTrigger = 'onBlur',
    validator,
    onValidate,
  } = params;

  const isControlled = controlledValue !== undefined;
  const nativeInputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [internalStatus, setInternalStatus] = useState<InputNumberStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);
  const [validationResult, setValidationResult] = useState<InputNumberValidationResult | null>(null);
  const [displayText, setDisplayText] = useState('');

  const value = isControlled ? controlledValue : internalValue;

  // 更新显示文本
  useEffect(() => {
    setDisplayText(inputNumberStyles['formatValue'](value, formatConfig));
  }, [value, formatConfig]);

  // 更新内部状态
  useEffect(() => {
    setInternalStatus(propStatus);
  }, [propStatus]);

  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setInternalReadonly(readonly);
  }, [readonly]);

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && nativeInputRef.current) {
      nativeInputRef.current.focus();
    }
  }, [autoFocus]);

  // 立即验证
  useEffect(() => {
    if (immediate && value !== null) {
      validateInput(value);
    }
  }, [immediate, value]);

  // 验证输入值
  const validateInput = useCallback(
    async (inputValue: number | null): Promise<InputNumberValidationResult> => {
      if (!rules && !validator && inputValue === null) {
        return { valid: true, value: inputValue, timestamp: Date.now() };
      }

      // 验证必填
      if (rules?.some((rule: any) => rule.required && inputValue === null)) {
        const requiredRule = rules.find((rule: any) => rule.required);
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

  // 处理值变化
  const handleValueChange = useCallback(
    async (newValue: number | null, _event: ITouchEvent, shouldTriggerEvents = true) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // 触发验证
      if (validateTrigger === 'onChange' && shouldTriggerEvents) {
        const result = await validateInput(newValue);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
      }
    },
    [isControlled, validateTrigger, validateInput, onValidate],
  );

  // 处理文本变化
  const handleTextChange = useCallback(
    async (text: string, event: ITouchEvent) => {
      const parsedValue = inputNumberStyles['parseValue'](text, formatConfig);
      const clampedValue = parsedValue !== null ? inputNumberStyles['clampValue'](parsedValue, min, max) : null;

      if (clampedValue !== null) {
        const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);
        await handleValueChange(roundedValue, event);
      } else {
        await handleValueChange(null, event);
      }
    },
    [formatConfig, min, max, precision, handleValueChange],
  );

  // 处理聚焦事件
  const handleFocus = useCallback(
    async (_event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      setIsFocused(true);

      // 聚焦时验证
      if (validateTrigger === 'onFocus') {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
      }
    },
    [internalDisabled, internalReadonly, validateTrigger, validateInput, value, onValidate],
  );

  // 处理失焦事件
  const handleBlur = useCallback(
    async (_event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      setIsFocused(false);

      // 失焦时验证
      if (validateTrigger === 'onBlur') {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
      }
    },
    [internalDisabled, internalReadonly, validateTrigger, validateInput, value, onValidate],
  );

  return {
    value,
    displayText,
    isFocused,
    internalStatus,
    internalDisabled,
    internalReadonly,
    validationResult,
    nativeInputRef,
    handleValueChange,
    handleTextChange,
    handleFocus,
    handleBlur,
    validateInput,
    setInternalStatus,
    setInternalDisabled,
    setInternalReadonly,
  };
}
