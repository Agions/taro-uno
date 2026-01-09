import { createStyles } from '@/theme/styles';

export const ErrorBoundaryStyles = createStyles({
  base: 'flex flex-col items-center justify-center p-4',

  container: `
    flex
    flex-col
    items-center
    justify-center
    p-4
    text-center
  `,

  title: `
    text-lg
    font-semibold
    text-red-500
    mb-2
  `,

  message: `
    text-sm
    text-gray-600
    dark:text-gray-400
    mb-4
  `,

  details: `
    w-full
    max-w-md
    p-3
    bg-gray-100
    dark:bg-gray-800
    rounded
    text-left
    mb-4
    overflow-auto
    max-h-48
  `,

  detailsTitle: `
    text-sm
    font-medium
    text-gray-700
    dark:text-gray-300
    mb-1
  `,

  detailsText: `
    text-xs
    text-gray-500
    dark:text-gray-400
    font-mono
    whitespace-pre-wrap
  `,

  resetButton: `
    px-4
    py-2
    bg-blue-500
    text-white
    rounded
    hover:bg-blue-600
    transition-colors
  `,
});
