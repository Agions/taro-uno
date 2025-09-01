/**
 * Taro-Uno Form Components
 * 表单组件库统一导出文件
 * 提供完整的表单组件访问接口
 */

// 导出表单组件
export * from './Form';
export * from './Input';
export * from './Select';
export * from './Checkbox';
export * from './Radio';
export * from './Switch';
export * from './DatePicker';
export * from './Textarea';

// 导出类型定义
export type * from './Form/types';

// 导出样式工具
export { formStyles } from './Form/Form.styles';
export { inputStyles } from './Input/Input.styles';
export { selectStyles } from './Select/Select.styles';
export { checkboxStyles } from './Checkbox/Checkbox.styles';
export { radioStyles } from './Radio/Radio.styles';
export { switchStyles } from './Switch/Switch.styles';
export { datePickerStyles } from './DatePicker/DatePicker.styles';
export { textareaStyles } from './Textarea/Textarea.styles';

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
    checkbox: ['Checkbox', 'CheckboxGroup'],
    radio: ['Radio', 'RadioGroup'],
    switch: ['Switch'],
    datePicker: ['DatePicker'],
    textarea: ['Textarea'],
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

// 默认导出
export default {
  // 表单组件
  Form: require('./Form').Form,
  Input: require('./Input').Input,
  Select: require('./Select').Select,
  Checkbox: require('./Checkbox').Checkbox,
  Radio: require('./Radio').Radio,
  Switch: require('./Switch').Switch,
  DatePicker: require('./DatePicker').DatePicker,
  Textarea: require('./Textarea').Textarea,

  // 工具函数
  Utils: FormLibraryUtils,

  // 配置
  CONFIG: FORM_CONFIG,
  VERSION: FORM_VERSION,
};
