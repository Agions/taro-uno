# 快速开始

本指南将帮助您快速上手 Taro Uno UI 组件库，包括安装、配置和使用基本组件。

## 📦 安装

### 前提条件

- 已安装 Node.js 18.0.0 或更高版本
- 已安装 Taro 4.x 框架

### 安装步骤

使用 npm、yarn 或 pnpm 安装 Taro Uno UI：

```bash
# 使用 npm
npm install taro-uno-ui

# 使用 yarn
yarn add taro-uno-ui

# 使用 pnpm
pnpm add taro-uno-ui
```

## 🚀 基本使用

### 1. 引入全局样式

在项目入口文件中引入全局样式：

```tsx
// app.tsx 或 app.jsx
import 'taro-uno-ui/dist/style.css';
```

### 2. 引入组件

在需要使用组件的页面中按需引入：

```tsx
import React from 'react';
import { View } from '@tarojs/components';
import { Button, Input } from 'taro-uno-ui';

const App = () => {
  return (
    <View>
      <Input placeholder="请输入内容" />
      <Button type="primary">点击我</Button>
    </View>
  );
};

export default App;
```

## 🎨 主题配置

### 1. 全局主题配置

在应用入口文件中配置主题：

```tsx
import React from 'react';
import { AppProvider } from 'taro-uno-ui';
import App from './App';

const themeConfig = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
};

const Root = () => {
  return (
    <AppProvider theme={themeConfig}>
      <App />
    </AppProvider>
  );
};

export default Root;
```

### 2. 组件级样式覆盖

```tsx
import React from 'react';
import { Button } from 'taro-uno-ui';

const CustomButton = () => {
  return (
    <Button
      type="primary"
      style={{
        backgroundColor: '#ff4d4f',
        borderRadius: '8px',
      }}
    >
      自定义按钮
    </Button>
  );
};

export default CustomButton;
```

## 🔧 配置选项

### 1. Taro 配置

在 `config/index.js` 中添加以下配置：

```javascript
module.exports = {
  // ...
  h5: {
    esnextModules: ['taro-uno-ui'],
  },
  mini: {
    webpackChain(chain) {
      // 添加 Taro Uno UI 到 esnextModules
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/taro-uno-ui/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader'),
                },
              },
            },
          },
        },
      });
    },
  },
  // ...
};
```

### 2. TypeScript 配置

确保 `tsconfig.json` 中包含以下配置：

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "jsx": "react-jsx"
  }
}
```

## 📝 示例项目

### 创建示例项目

使用 Taro CLI 创建新的示例项目：

```bash
# 创建 Taro 项目
taro init my-taro-app

# 进入项目目录
cd my-taro-app

# 安装 Taro Uno UI
npm install taro-uno-ui
```

### 运行示例项目

```bash
# 运行 H5 版本
npm run dev:h5

# 运行微信小程序版本
npm run dev:weapp
```

## 📚 下一步

- [查看组件库](./components/basic/button) 了解所有可用组件
- [阅读开发指南](./guides/installation) 深入学习使用技巧
- [探索核心功能](./features) 了解组件库的强大特性

## 💡 常见问题

### Q: 组件样式不生效怎么办？

A: 请确保已在入口文件中正确引入全局样式：
```tsx
import 'taro-uno-ui/dist/style.css';
```

### Q: 如何按需引入组件？

A: Taro Uno UI 支持 Tree Shaking，直接按需引入组件即可：
```tsx
import { Button } from 'taro-uno-ui';
```

### Q: 支持哪些平台？

A: 支持微信小程序、H5、React Native 等 Taro 支持的所有平台。

## 📞 获得帮助

如果您在使用过程中遇到问题，可以通过以下方式获得帮助：

- [查看常见问题](./faq)
- [提交 Issue](https://github.com/agions/taro-uno/issues)
- [加入社区讨论](https://github.com/agions/taro-uno/discussions)
