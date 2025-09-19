import { createStyles } from '@/theme/styles';

export const ListStyles = createStyles({
  base: `
    bg-white dark:bg-gray-800
    rounded-lg
    overflow-hidden
  `,

  size: {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  },

  bordered: `
    border border-gray-200 dark:border-gray-700
  `,

  header: `
    px-4 py-3
    border-b border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-900
    font-medium
    text-gray-900 dark:text-white
  `,

  footer: `
    px-4 py-3
    border-t border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-900
    text-sm
    text-gray-500 dark:text-gray-400
  `,

  content: `
    divide-y divide-gray-200 dark:divide-gray-700
  `,

  loading: `
    py-4
  `,

  loadingItem: `
    h-16
    bg-gray-200 dark:bg-gray-700
    rounded
    animate-pulse
    mx-4
    mb-3
    last:mb-0
  `,

  item: `
    px-4
    transition-colors duration-200
  `,

  itemSize: {
    small: 'py-2',
    default: 'py-3',
    large: 'py-4'
  },

  itemSplit: `
    border-b border-gray-200 dark:border-gray-700
  `,

  itemDisabled: `
    opacity-50
    pointer-events-none
  `,

  itemClickable: `
    cursor-pointer
    hover:bg-gray-50 dark:hover:bg-gray-700
    active:bg-gray-100 dark:active:bg-gray-600
  `
});
