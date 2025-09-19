/**
 * Modal 组件样式
 */

export const modalStyles = {
  container: 'fixed inset-0 flex items-center justify-center bg-black/50 z-50',
  content: 'bg-white rounded-xl p-6 min-w-[320px] max-w-[80%]',
  header: 'flex flex-row justify-between items-center mb-4',
  title: 'text-lg font-semibold text-gray-900',
  close: 'text-xl text-gray-500',
  body: 'mb-6',
  text: 'text-sm leading-5 text-gray-600',
  footer: 'flex flex-row justify-end gap-3',
  button: 'px-4 py-2 rounded-lg min-w-[80px]',
  buttonText: 'text-sm font-medium text-center',

  // 按钮类型
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600'
};
