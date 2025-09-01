/**
 * Toast 组件样式
 */

export const toastStyles = {
  container: 'fixed bottom-12 left-0 right-0 flex items-center z-[1000]',
  content: 'bg-black/80 rounded-lg px-4 py-3 flex flex-row items-center min-w-[200px] max-w-[80%]',
  text: 'text-sm text-white ml-2 flex-1',
  icon: 'text-base text-white',

  // 类型样式
  success: 'bg-green-500/90',
  error: 'bg-red-500/90',
  warning: 'bg-yellow-500/90',
  info: 'bg-blue-500/90',
};
