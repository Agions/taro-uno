import type { Preview } from '@storybook/react';
import '../src/app.scss'; // 引入全局样式

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 配置文档的语言为中文
    docs: {
      toc: {
        headingSelector: 'h2, h3, h4',
      },
    },
    // 响应式设计配置
    viewport: {
      viewports: {
        mobile: { name: '移动端', styles: { width: '375px', height: '667px' } },
        tablet: { name: '平板', styles: { width: '768px', height: '1024px' } },
        desktop: { name: '桌面端', styles: { width: '1280px', height: '720px' } },
      },
    },
  },
  // 全局装饰器，可以在这里添加主题Provider等
  decorators: [
    (Story) => {
      // 可以在这里添加主题Provider或其他全局组件
      return (
        <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;