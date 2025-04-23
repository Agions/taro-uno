# Taro Uno UI（未完成）

基于 Taro 的多端 UI 组件库，支持小程序、H5、React Native 等多平台。通过 JSON 配置方式使用，实现更高效的开发体验。

## 特性

- 🌈 支持多端开发 - 微信/京东/百度/支付宝/字节跳动/QQ/飞书/快手小程序、H5、React Native 等
- 📦 基于 Monorepo 的包管理，可独立安装所需组件包
- 🎨 内置主题系统，支持深色模式和自定义主题
- 🔖 支持 JSON 配置方式使用组件，效率更高
- 💡 使用 TypeScript 开发，提供完整类型定义
- 🛡 完善的单元测试，保证组件质量
- 📱 适配不同设备和平台，响应式设计

## 安装

```bash
# 安装核心包
npm install @agions/taro-uno-core

# 安装基础组件包
npm install @agions/taro-uno-basic
```

## 使用方式

### 传统方式

```jsx
import React from 'react';
import { Button } from '@agions/taro-uno-basic';

export default function App() {
  return (
    <Button type="primary" size="large">
      点击按钮
    </Button>
  );
}
```

### JSON 配置方式

```jsx
import React from 'react';
import { JsonRenderer } from '@agions/taro-uno-core';
import { BASIC_COMPONENTS } from '@agions/taro-uno-basic';

// JSON 配置
const buttonConfig = {
  type: 'Button',
  props: {
    type: 'primary',
    size: 'large',
    onClick: {
      type: 'function',
      args: [],
      body: 'console.log("按钮被点击")'
    }
  },
  children: ['点击按钮']
};

export default function App() {
  return (
    <JsonRenderer
      json={buttonConfig}
      components={BASIC_COMPONENTS}
    />
  );
}
```

## 主题设置

```jsx
import React from 'react';
import { ThemeProvider } from '@agions/taro-uno-core';

// 自定义主题
const customTheme = {
  primaryColor: '#1890ff',
  // 其他主题配置
};

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* 应用内容 */}
    </ThemeProvider>
  );
}
```

## 包结构

- `@agions/taro-uno-core`: 核心包，包含主题、工具函数、请求封装等
- `@agions/taro-uno-basic`: 基础组件包，包含按钮、文本、图标等基础组件

## 开发指南

### 环境准备

```bash
# 安装依赖
yarn

# 启动开发环境
yarn dev
```

### 构建

```bash
# 构建所有包
yarn build

# 构建单个包
yarn workspace @agions/taro-uno-core build
```

### 发布

```bash
# 发布包
yarn publish
```

## 贡献指南

欢迎贡献代码或提交 issue，帮助我们改进 Taro Uno UI。

## 许可证

[MIT](./LICENSE)
