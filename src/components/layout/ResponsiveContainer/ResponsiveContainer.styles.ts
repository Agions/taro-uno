import { createStyles } from '@/theme/styles';

export const ResponsiveContainerStyles = createStyles({
  base: 'w-full box-border',

  container: `
    w-full
    box-border
  `,

  safeArea: `
    safe-area-inset-top
    safe-area-inset-bottom
    safe-area-inset-left
    safe-area-inset-right
  `,
});
