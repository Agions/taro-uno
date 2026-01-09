import { createStyles } from '@/theme/styles';

export const ResponsiveGridStyles = createStyles({
  base: 'grid w-full',

  grid: `
    grid
    w-full
  `,

  item: `
    box-border
  `,

  align: {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  },

  justify: {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
});
