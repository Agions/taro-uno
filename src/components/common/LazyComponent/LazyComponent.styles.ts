import { createStyles } from '@/theme/styles';

export const LazyComponentStyles = createStyles({
  base: 'relative',

  container: `
    relative
    w-full
    h-full
  `,

  fallback: `
    flex
    items-center
    justify-center
    p-4
  `,

  errorContainer: `
    flex
    flex-col
    items-center
    justify-center
    p-4
    text-center
  `,

  errorTitle: `
    text-red-500
    mb-2
  `,

  errorMessage: `
    text-sm
    text-gray-600
    mb-4
  `,

  retryButton: `
    px-4
    py-2
    bg-blue-500
    text-white
    rounded
    hover:bg-blue-600
    transition-colors
  `,
});
