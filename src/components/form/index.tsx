/**
 * Taro-Uno 表单组件库
 * 提供完整的表单组件访问接口，包括输入框、选择器、日期选择器等
 */

// 导出 Form 组件
export { Form, FormItem, FormContextProvider } from './Form';
export { useFormContext, useFormItemContext, useFormField, useFormState, useFormMethods, useFormConfig } from './Form';
export type {
  FormContext,
  FormProps,
  FormRef,
  FormItemProps,
  FormInstance,
  FormLayout,
  FormLabelAlign,
  FormSize,
  FormStatus,
  FormFieldStatus,
  FormValues,
  FormErrors,
  FormTouched,
  FormFieldInfo,
  FormRule,
  FormItemContext,
} from './Form/Form.types';
export { formStyles } from './Form/Form.styles';

// 导出 Input 组件
export { Input } from './Input';
export type {
  InputProps,
  InputRef,
  InputType,
  InputVariant,
  ClearTrigger,
  InputValidationResult,
} from './Input/Input.types';
export { inputStyles } from './Input/Input.styles';

// 导出 Select 组件
export { Select } from './Select';
export type { SelectProps, SelectRef, SelectOption, SelectSize } from './Select/Select.types';
export { selectStyles } from './Select/Select.styles';

// 导出 DatePicker 组件
export { DatePicker } from './DatePicker';
export type { DatePickerProps, DatePickerRef, DatePickerFormat } from './DatePicker/DatePicker.types';
export { datePickerStyles } from './DatePicker/DatePicker.styles';

// 导出 Radio 组件
export { Radio } from './Radio';
export type { RadioProps, RadioRef, RadioGroupProps } from './Radio/Radio.types';
export { radioStyles } from './Radio/Radio.styles';

// 导出 Checkbox 组件
export { Checkbox, CheckboxGroup } from './Checkbox';
export type { CheckboxProps, CheckboxRef, CheckboxGroupProps } from './Checkbox/Checkbox.types';
export { checkboxStyles } from './Checkbox/Checkbox.styles';

// 导出 Switch 组件
export { Switch } from './Switch';
export type { SwitchProps, SwitchRef, SwitchSize } from './Switch/Switch.types';
export { switchStyles } from './Switch/Switch.styles';

// 导出 Slider 组件
export { Slider } from './Slider';
export type { SliderProps, SliderRef, SliderSize } from './Slider/Slider.types';
export { sliderStyles } from './Slider/Slider.styles';

// 导出 Upload 组件
export { Upload } from './Upload';
export type { UploadProps, UploadRef, UploadFile } from './Upload/Upload.types';
export { uploadStyles } from './Upload/Upload.styles';

// 导出 Textarea 组件
export { Textarea } from './Textarea';
export type { TextareaProps, TextareaRef } from './Textarea/Textarea.types';
export { textareaStyles } from './Textarea/Textarea.styles';

// 导出 InputNumber 组件
export { InputNumber } from './InputNumber';
export type { InputNumberProps, InputNumberRef, InputNumberSize } from './InputNumber/InputNumber.types';
export { inputNumberStyles } from './InputNumber/InputNumber.styles';

// 导出 TimePicker 组件
export { TimePicker } from './TimePicker';
export type { TimePickerProps, TimePickerRef, TimePickerFormat } from './TimePicker/TimePicker.types';
export { timePickerStyles } from './TimePicker/TimePicker.styles';

// 导出 Cascader 组件
export { Cascader } from './Cascader';
export type { CascaderProps, CascaderRef, CascaderOption } from './Cascader/Cascader.types';
export { cascaderStyles } from './Cascader/Cascader.styles';

// 导出 Transfer 组件
export { Transfer } from './Transfer';
export type { TransferProps, TransferRef } from './Transfer/Transfer.types';
export { transferStyles } from './Transfer/Transfer.styles';

// 导出 AutoComplete 组件
export { AutoComplete } from './AutoComplete';
export type { AutoCompleteProps, AutoCompleteRef } from './AutoComplete/AutoComplete.types';
export { BaseStyles as autocompleteStyles } from './AutoComplete/AutoComplete.styles';

// 表单组件版本
export const FORM_VERSION = '1.0.0';

// 表单组件库配置
export const FORM_CONFIG = {
  version: FORM_VERSION,
  platform: 'taro',
  components: {
    form: ['Form', 'FormItem'],
    input: ['Input'],
    select: ['Select'],
    datePicker: ['DatePicker'],
    checkbox: ['Checkbox', 'CheckboxGroup'],
    radio: ['Radio', 'RadioGroup'],
    switch: ['Switch'],
    slider: ['Slider'],
    upload: ['Upload'],
    textarea: ['Textarea'],
    inputNumber: ['InputNumber'],
    timePicker: ['TimePicker'],
    cascader: ['Cascader'],
    transfer: ['Transfer'],
  },
  features: {
    validation: true,
    accessibility: true,
    theme: true,
    responsive: true,
    typescript: true,
  },
};

// 表单组件库工具函数
export const FormLibraryUtils = {
  /**
   * 获取表单组件库版本
   */
  getVersion: (): string => FORM_VERSION,

  /**
   * 获取表单组件库配置
   */
  getConfig: () => FORM_CONFIG,

  /**
   * 检查组件是否存在
   */
  hasComponent: (componentName: string): boolean => {
    return Object.values(FORM_CONFIG.components).flat().includes(componentName);
  },

  /**
   * 获取组件分类
   */
  getComponentCategory: (componentName: string): string | null => {
    for (const [category, components] of Object.entries(FORM_CONFIG.components)) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    return null;
  },

  /**
   * 获取所有组件列表
   */
  getAllComponents: (): string[] => {
    return Object.values(FORM_CONFIG.components).flat();
  },

  /**
   * 获取分类组件列表
   */
  getCategoryComponents: (category: string): string[] => {
    return FORM_CONFIG.components[category as keyof typeof FORM_CONFIG.components] || [];
  },
};
