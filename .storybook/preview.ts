import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../packages/ui-theme/src/styles/index.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.light,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: '移动端',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: '平板',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: '桌面端',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: '主题切换',
      defaultValue: 'light',
      toolbar: {
        title: '主题',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: '浅色主题' },
          { value: 'dark', title: '深色主题' },
        ],
        dynamicTitle: true,
      },
    },
    platform: {
      description: '平台切换',
      defaultValue: 'h5',
      toolbar: {
        title: '平台',
        icon: 'mobile',
        items: [
          { value: 'h5', title: 'H5' },
          { value: 'weapp', title: '微信小程序' },
          { value: 'alipay', title: '支付宝小程序' },
          { value: 'rn', title: 'React Native' },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview