import { createStyles } from '@/theme/styles';

export const CardStyles = createStyles({
  base: 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-200',

  shadow: {
    none: '',
    small: 'shadow-sm',
    default: 'shadow-md',
    large: 'shadow-lg',
  },

  bordered: `
    border border-gray-200 dark:border-gray-700
  `,

  hoverable: `
    hover:shadow-lg
    hover:scale-[1.02]
    cursor-pointer
  `,

  loading: `
    opacity-70
    pointer-events-none
  `,

  cover: `
    w-full
    h-48
    overflow-hidden
  `,

  header: `
    flex
    items-center
    justify-between
    p-4
    border-b border-gray-200 dark:border-gray-700
  `,

  headerContent: `
    flex-1
  `,

  title: `
    text-lg
    font-semibold
    text-gray-900 dark:text-white
  `,

  subtitle: `
    text-sm
    text-gray-500 dark:text-gray-400
    mt-1
  `,

  extra: `
    flex-shrink-0
  `,

  content: `
    p-4
  `,

  loadingContent: `
    space-y-3
  `,

  loadingSkeleton: `
    h-4
    bg-gray-200 dark:bg-gray-700
    rounded
    animate-pulse
  `,

  actions: `
    flex
    items-center
    justify-end
    p-4
    border-t border-gray-200 dark:border-gray-700
    space-x-2
  `,

  action: `
    flex-shrink-0
  `,
});
