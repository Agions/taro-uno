# Taro Uno UI

<p align="center">
  <img src="https://img.shields.io/badge/Taro-Uno%20UI-blue?style=for-the-badge&logo=react&logoColor=white" alt="Taro Uno UI">
  <img src="https://img.shields.io/badge/version-0.1.0-green?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" alt="Build">
</p>

<p align="center">
  <strong>🚀 现代化的多端 UI 组件库，让跨平台开发更简单</strong>
</p>

<p align="center">
  <a href="#-功能特色">功能特色</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-组件展示">组件展示</a> •
  <a href="#-主题定制">主题定制</a> •
  <a href="#-文档">文档</a> •
  <a href="https://taro-uno.com">在线文档</a>
</p>

---

## 🌟 功能特色

### 💡 卓越的开发体验
- **⚡️ 高性能构建** - 基于 Vite，热更新极速响应
- **🎨 现代化设计** - 精心设计的视觉语言和交互体验
- **🔧 开箱即用** - 零配置，直接使用，无需复杂设置
- **📱 完美适配** - 一套代码，完美运行在多个平台

### 🛡️ 企业级质量保证
- **🎯 类型安全** - 完整的 TypeScript 支持，智能提示
- **🧪 测试覆盖** - 全面的单元测试和集成测试
- **📖 详细文档** - 清晰的 API 文档和使用示例
- **🔄 持续维护** - 定期更新，及时修复问题

### 🎨 灵活的主题系统
- **🌓 多主题支持** - 内置浅色/深色主题
- **🎨 自定义主题** - 完全可定制的主题变量
- **🌈 响应式设计** - 自适应不同屏幕尺寸
- **🎭 动态主题** - 支持运行时主题切换

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16.14.0
- **pnpm** >= 7.0.0

### 安装依赖

```bash
# 安装 pnpm
npm install -g pnpm

# 克隆项目
git clone https://github.com/agions/taro-uno.git

# 安装依赖
cd taro-uno
pnpm install
```

### 启动开发服务器

```bash
# H5 开发环境
pnpm dev:h5

# 微信小程序开发环境
pnpm dev:weapp

# 支付宝小程序开发环境
pnpm dev:alipay
```

### 构建生产版本

```bash
# H5 生产构建
pnpm build:h5

# 微信小程序生产构建
pnpm build:weapp

# 支付宝小程序生产构建
pnpm build:alipay
```

## 📱 支持的平台

| 平台 | 支持状态 | 兼容性 |
|------|----------|--------|
| **H5** | ✅ 完全支持 | Chrome 80+, Safari 13+, Firefox 75+ |
| **微信小程序** | ✅ 完全支持 | 基础库 2.0+ |
| **支付宝小程序** | ✅ 完全支持 | 基础库 1.0+ |
| **百度小程序** | ✅ 完全支持 | 基础库 3.0+ |
| **字节跳动小程序** | ✅ 完全支持 | 基础库 1.0+ |
| **QQ 小程序** | ✅ 完全支持 | 基础库 2.0+ |
| **React Native** | 🚧 开发中 | 预计下个版本支持 |

## 🎨 组件展示

### 基础组件
```tsx
import { Button, Icon, Text, Divider } from '@taro-uno/ui'

// 按钮组件
<Button type="primary" size="large">
  主要按钮
</Button>

// 图标组件
<Icon name="star" color="#fadb14" size={24} />

// 文本组件
<Text type="secondary" size="large">
  次要文本
</Text>
```

### 表单组件
```tsx
import { Form, Input, Select, Switch } from '@taro-uno/ui'

// 表单组件
<Form>
  <Form.Item label="用户名">
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item label="选择">
    <Select options={options} />
  </Form.Item>
  <Form.Item label="开关">
    <Switch />
  </Form.Item>
</Form>
```

### 展示组件
```tsx
import { Card, List, Tag, Progress } from '@taro-uno/ui'

// 卡片组件
<Card title="卡片标题" extra="更多">
  <p>卡片内容</p>
</Card>

// 列表组件
<List dataSource={data} renderItem={item => (
  <List.Item>{item.title}</List.Item>
)} />

// 进度条组件
<Progress percent={60} status="active" />
```

## 🎨 主题定制

### 使用内置主题

```tsx
// 引入主题样式
import '@taro-uno/ui/dist/light.css'  // 浅色主题
import '@taro-uno/ui/dist/dark.css'   // 深色主题
```

### 自定义主题

```scss
// 在您的项目中覆盖主题变量
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  --text-color: rgba(0, 0, 0, 0.85);
  --border-radius: 4px;
}
```

### 动态主题切换

```tsx
import { useTheme } from '@taro-uno/ui'

const { theme, setTheme } = useTheme()

// 切换主题
const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light')
}
```

## 📁 项目结构

```
taro-uno/
├── src/                          # 源代码
│   ├── components/               # 组件库
│   │   ├── basic/               # 基础组件
│   │   ├── form/                # 表单组件
│   │   ├── layout/              # 布局组件
│   │   ├── navigation/          # 导航组件
│   │   ├── display/             # 展示组件
│   │   ├── feedback/            # 反馈组件
│   │   └── performance/         # 性能组件
│   ├── hooks/                   # 自定义 Hooks
│   ├── utils/                   # 工具函数
│   ├── theme/                   # 主题系统
│   ├── types/                   # 类型定义
│   └── styles/                  # 全局样式
├── tests/                       # 测试文件
├── docs/                        # 文档
├── config/                      # 配置文件
├── scripts/                     # 构建脚本
└── examples/                    # 示例项目
```

## 🧪 测试

```bash
# 运行所有测试
pnpm test

# 生成测试覆盖率报告
pnpm test:coverage

# 运行测试 UI 模式
pnpm test:ui

# 监听模式运行测试
pnpm test:watch
```

## 🛠️ 开发指南

### 添加新组件

1. **创建组件目录**
   ```bash
   # 在 src/components 下创建新组件
   mkdir src/components/your-component
   ```

2. **编写组件代码**
   ```tsx
   // src/components/your-component/index.tsx
   import React from 'react'
   import { View } from '@tarojs/components'
   
   const YourComponent: React.FC = () => {
     return <View>Your Component</View>
   }
   
   export default YourComponent
   ```

3. **添加样式文件**
   ```scss
   // src/components/your-component/styles.scss
   .your-component {
     // 组件样式
   }
   ```

4. **编写测试**
   ```tsx
   // src/components/your-component/__tests__/index.test.tsx
   import { render } from '@testing-library/react'
   import YourComponent from '../index'
   
   test('renders correctly', () => {
     const { container } = render(<YourComponent />)
     expect(container).toMatchSnapshot()
   })
   ```

5. **更新导出文件**
   ```tsx
   // src/components/index.tsx
   export { default as YourComponent } from './your-component'
   ```

### 开发规范

- **代码风格**: 遵循 ESLint 和 Prettier 规范
- **TypeScript**: 所有组件必须包含完整的类型定义
- **测试覆盖**: 新组件必须包含单元测试
- **文档**: 提供清晰的 API 文档和使用示例
- **性能**: 注意组件的性能优化

## 📊 性能优化

### 按需加载

```tsx
// 按需引入组件
import Button from '@taro-uno/ui/dist/button'
import { Select } from '@taro-uno/ui/dist/select'
```

### Tree Shaking

```tsx
// 支持自动 tree shaking
import { Button, Input } from '@taro-uno/ui'
// 只有 Button 和 Input 会被打包
```

### 性能监控

```tsx
import { usePerformance } from '@taro-uno/ui'

const { metrics } = usePerformance()
// 获取性能指标
```

## 📖 文档

### 文档结构

我们的文档采用 VitePress 构建，提供完整的组件库使用指南：

- **快速开始**: 快速上手指南
- **组件文档**: 详细的组件 API 和使用示例
- **Hooks 文档**: 自定义 Hooks 的使用说明
- **主题定制**: 主题系统和自定义指南
- **最佳实践**: 开发和使用的最佳实践
- **故障排除**: 常见问题解决方案

### 文档生成

我们提供了自动化的文档生成工具：

```bash
# 生成所有文档
node scripts/generate-docs.js all

# 生成组件文档
node scripts/generate-docs.js components

# 生成 API 文档
node scripts/generate-docs.js api

# 生成类型文档
node scripts/generate-docs.js types
```

### 文档验证

使用文档验证工具确保文档质量：

```bash
# 验证文档
node scripts/validate-docs.js

# 更新文档
node scripts/update-docs.js --commit
```

### 文档部署

文档自动化部署到 GitHub Pages：

- 每次代码提交自动构建和部署
- 支持多环境部署
- 自动生成文档统计和报告

### 本地开发

```bash
# 启动文档开发服务器
cd docs
pnpm install
pnpm dev

# 构建文档
pnpm build
```

### 文档贡献

我们欢迎社区贡献文档改进：

1. Fork 项目仓库
2. 创建文档改进分支
3. 提交文档更改
4. 创建 Pull Request

详细的贡献指南请参考 [贡献指南](./CONTRIBUTING.md)。

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 规范
- 编写完整的单元测试
- 添加详细的 JSDoc 注释
- 遵循 Git 提交规范

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE)。

---

<div align="center">

**让多端开发更简单** 
Made with ❤️ by Agions

</div>