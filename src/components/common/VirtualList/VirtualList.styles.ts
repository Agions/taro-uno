import { createStyles } from '@/theme/styles';

export const VirtualListStyles = createStyles({
  base: 'relative overflow-auto',

  container: `
    relative
    overflow-auto
  `,

  content: `
    relative
  `,

  item: `
    absolute
    left-0
    w-full
  `,

  empty: `
    flex
    items-center
    justify-center
    h-full
    text-gray-500
    dark:text-gray-400
  `,

  loading: `
    flex
    items-center
    justify-center
    p-4
  `,

  loadingSpinner: `
    animate-spin
    rounded-full
    h-8
    w-8
    border-b-2
    border-blue-500
  `,
});
