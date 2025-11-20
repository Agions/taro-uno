/**
 * Taro-Uno Form Components
 * 表单组件库统一导出文件
 * 提供完整的表单组件访问接口
 */

// 导出表单组件
export { Form } from './Form';
export type { FormContext } from './Form';
export * from './Input';
export * from './Select';
export * from './DatePicker';
export * from './Radio';
export * from './Checkbox';
export * from './Switch';
// export * from './Rate'; // 组件暂不存在
export * from './Slider';
export * from './Upload';
// export * from './AutoComplete'; // 组件暂不存在
export * from './Textarea';
export * from './InputNumber';
export * from './TimePicker';
export * from './Cascader';
export * from './Transfer';

// 导出类型定义
// export type * from './Form/types'; // 暂不存在

// 导出样式工具
export { formStyles } from './Form/Form.styles';
export { inputStyles } from './Input/Input.styles';
export { selectStyles } from './Select/Select.styles';
export { checkboxStyles } from './Checkbox/Checkbox.styles';
export { radioStyles } from './Radio/Radio.styles';
export { switchStyles } from './Switch/Switch.styles';
export { datePickerStyles } from './DatePicker/DatePicker.styles';
export { textareaStyles } from './Textarea/Textarea.styles';
export { inputNumberStyles } from './InputNumber/InputNumber.styles';
export { timePickerStyles } from './TimePicker/TimePicker.styles';
export { cascaderStyles } from './Cascader/Cascader.styles';
export { transferStyles } from './Transfer/Transfer.styles';

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
    rate: ['Rate'],
    slider: ['Slider'],
    upload: ['Upload'],
    autoComplete: ['AutoComplete'],
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
