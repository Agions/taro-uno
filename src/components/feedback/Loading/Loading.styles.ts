import { cn } from '@/utils';
import { createStyles } from '@/theme/styles';

export const LoadingStyles = createStyles({
  base: `
    flex
    flex-col
    items-center
    justify-center
    gap-2
  `,

  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    default: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  },

  spinner: `
    relative
    w-8
    h-8
    border-4
    border-gray-200
    border-t-blue-500
    rounded-full
    animate-spin
  `,

  spinnerSize: {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-3',
    default: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-6',
  },

  spinnerInner: `
    absolute
    inset-0
    rounded-full
    animate-ping
  `,

  dots: `
    flex
    gap-1
  `,

  dot: `
    w-2
    h-2
    bg-blue-500
    rounded-full
    animate-bounce
  `,

  dotSize: {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    default: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  },

  pulse: `
    relative
  `,

  pulseContainer: `
    flex
    items-center
    justify-center
  `,

  pulseDot: `
    w-8
    h-8
    bg-blue-500
    rounded-full
    animate-pulse
  `,

  pulseSize: {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  },

  bars: `
    flex
    gap-1
  `,

  bar: `
    w-1
    h-8
    bg-blue-500
    rounded
    animate-pulse
  `,

  barSize: {
    xs: 'w-0.5 h-4',
    sm: 'w-1 h-6',
    default: 'w-1 h-8',
    lg: 'w-2 h-12',
    xl: 'w-3 h-16',
  },

  text: `
    text-sm
    text-gray-600
    dark:text-gray-400
    mt-2
  `,
});
