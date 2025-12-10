/**
 * Message 组件样式
 */

export const messageStyles = {
  container: 'p-3 rounded-lg mb-2 flex flex-row items-center justify-between',
  content: 'flex-1 flex flex-row items-center',
  text: 'text-sm leading-5 ml-2',
  icon: 'text-base',
  close: 'text-base ml-2',

  // 类型样式
  success: 'bg-blue-50 border border-blue-200',
  error: 'bg-red-50 border border-red-200',
  warning: 'bg-yellow-50 border border-yellow-200',
  info: 'bg-blue-50 border border-blue-200',

  // 文本颜色
  textSuccess: 'text-green-800',
  textError: 'text-red-800',
  textWarning: 'text-yellow-800',
  textInfo: 'text-blue-800',

  // 新增缺失的样式属性
  base: 'p-3 rounded-lg mb-2 flex flex-row items-center justify-between',
  type: {
    success: 'bg-blue-50 border border-blue-200',
    error: 'bg-red-50 border border-red-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    info: 'bg-blue-50 border border-blue-200',
  },
  iconType: {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  },
  iconText: 'text-base',
  title: 'text-sm font-medium text-gray-900 mb-1',
  closeText: 'text-gray-400 hover:text-gray-600',
};
