import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../docs/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@taro-uno/core': '/packages/core/src',
          '@taro-uno/ui-basic': '/packages/ui-basic/src',
          '@taro-uno/ui-form': '/packages/ui-form/src',
          '@taro-uno/ui-layout': '/packages/ui-layout/src',
          '@taro-uno/ui-navigation': '/packages/ui-navigation/src',
          '@taro-uno/ui-display': '/packages/ui-display/src',
          '@taro-uno/ui-feedback': '/packages/ui-feedback/src',
          '@taro-uno/ui-theme': '/packages/ui-theme/src',
          '@taro-uno/ui-hooks': '/packages/ui-hooks/src',
          '@taro-uno/shared': '/packages/shared/src',
        },
      },
      define: {
        'process.env.TARO_ENV': JSON.stringify('h5'),
      },
    })
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config