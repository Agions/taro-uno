import { createStyles } from '@/theme/styles';

export const BadgeStyles = createStyles({
  base: 'relative inline-flex',

  wrapper: `
    relative
    inline-flex
  `,

  badge: `
    absolute
    top-0
    right-0
    transform
    translate-x-1/2
    -translate-y-1/2
    flex
    items-center
    justify-center
    min-w-[18px]
    h-[18px]
    px-1.5
    text-xs
    font-medium
    text-white
    bg-red-500
    rounded-full
    z-10
  `,

  dot: `
    min-w-[8px]
    w-2
    h-2
    p-0
  `,

  count: `
    text-xs
    font-medium
    leading-none
  `,
});
