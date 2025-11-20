import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../docs/components/**/*.mdx',
    '../docs/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@utils': path.resolve(__dirname, '../src/utils'),
          '@types': path.resolve(__dirname, '../src/types'),
          '@theme': path.resolve(__dirname, '../src/theme'),
          '@hooks': path.resolve(__dirname, '../src/hooks'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    });
  },
};

export default config;