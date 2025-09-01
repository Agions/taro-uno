# Taro-Uno 快速开始

Taro-Uno 是一个基于 Taro 的多端 UI 组件库，提供了一套完整的、高质量的 React 组件，支持微信小程序、支付宝小程序、H5、React Native 等多个平台。

## 安装

### 使用 npm

```bash
npm install taro-uno
```

### 使用 yarn

```bash
yarn add taro-uno
```

### 使用 pnpm

```bash
pnpm add taro-uno
```

## 配置

### 1. 项目配置

在 Taro 项目的 `config/index.js` 中配置：

```javascript
const config = {
  // ... 其他配置
  mini: {
    // 小程序配置
  },
  h5: {
    // H5 配置
  },
  rn: {
    // React Native 配置
  },
};

module.exports = config;
```

### 2. 样式配置

在项目入口文件中引入样式：

```typescript
// app.tsx
import 'taro-uno/dist/styles/index.css';
```

### 3. 按需引入

如果需要按需引入组件，可以使用以下配置：

```javascript
// config/index.js
const config = {
  // ... 其他配置
  plugins: [
    [
      '@tarojs/plugin-babel',
      {
        babelPlugins: [
          ['import', {
            libraryName: 'taro-uno',
            libraryDirectory: 'es',
            style: true,
          }],
        ],
      },
    ],
  ],
};
```

## 基础使用

### 1. 使用组件

```tsx
import { Button, Card, Form, Input } from 'taro-uno';

export default function MyComponent() {
  return (
    <Card title="基础表单">
      <Form>
        <Form.Item label="用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码">
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Button type="primary" block>
          登录
        </Button>
      </Form>
    </Card>
  );
}
```

### 2. 主题定制

```typescript
// app.tsx
import { ThemeProvider } from 'taro-uno';

const customTheme = {
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* 应用内容 */}
    </ThemeProvider>
  );
}
```

## 组件分类

### 基础组件

- **Button**: 按钮组件，支持多种类型和状态
- **Icon**: 图标组件，支持多种图标类型
- **Text**: 文本组件，支持多种文本样式
- **Divider**: 分割线组件

### 表单组件

- **Form**: 表单容器组件，提供完整的表单管理功能
- **Input**: 输入框组件，支持多种输入类型和验证
- **Select**: 选择器组件，支持单选和多选
- **Checkbox**: 复选框组件，支持单选和多选
- **Radio**: 单选框组件，支持分组选择
- **Switch**: 开关组件，支持状态切换
- **DatePicker**: 日期选择器组件

### 展示组件

- **Card**: 卡片组件，用于内容展示
- **List**: 列表组件，支持多种列表样式
- **Table**: 表格组件，支持排序和筛选
- **Tag**: 标签组件，支持多种颜色和样式

### 反馈组件

- **Loading**: 加载组件，支持多种加载动画
- **Message**: 消息组件，支持多种消息类型
- **Modal**: 模态框组件，支持自定义内容
- **Toast**: 轻提示组件，支持自动关闭

### 布局组件

- **Container**: 容器组件，用于布局
- **Row**: 行组件，用于栅格布局
- **Col**: 列组件，用于栅格布局
- **Space**: 间距组件，用于控制元素间距

## 最佳实践

### 1. 表单使用

```tsx
import { Form, FormItem, Input, Button, Switch } from 'taro-uno';

export default function UserForm() {
  const formRef = useRef<any>();

  const handleSubmit = async () => {
    try {
      const values = await formRef.current.submit();
      console.log('表单提交:', values);
    } catch (errors) {
      console.log('表单验证失败:', errors);
    }
  };

  return (
    <Form ref={formRef}>
      <FormItem 
        name="username" 
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </FormItem>
      
      <FormItem 
        name="email" 
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input type="email" placeholder="请输入邮箱" />
      </FormItem>
      
      <FormItem 
        name="notifications" 
        label="接收通知"
        valuePropName="checked"
      >
        <Switch />
      </FormItem>
      
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  );
}
```

### 2. 状态管理

```tsx
import { useState, useCallback } from 'react';
import { Button, Loading, Message } from 'taro-uno';

export default function AsyncOperation() {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = useCallback(async () => {
    setLoading(true);
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      Message.success('操作成功');
    } catch (error) {
      Message.error('操作失败');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Button 
        loading={loading} 
        onClick={handleAsyncAction}
      >
        {loading ? '处理中...' : '执行操作'}
      </Button>
    </div>
  );
}
```

### 3. 响应式布局

```tsx
import { Card, Row, Col, Button } from 'taro-uno';

export default function ResponsiveLayout() {
  return (
    <Card title="响应式布局">
      <Row gutter={16}>
        <Col span={24} md={12} lg={8}>
          <Card>左侧内容</Card>
        </Col>
        <Col span={24} md={12} lg={8}>
          <Card>中间内容</Card>
        </Col>
        <Col span={24} md={12} lg={8}>
          <Card>右侧内容</Card>
        </Col>
      </Row>
    </Card>
  );
}
```

### 4. 主题定制

```tsx
import { ThemeProvider, Button, Card } from 'taro-uno';

const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#177ddc',
    background: '#141414',
    surface: '#1f1f1f',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
  },
};

export default function ThemedApp() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : undefined}>
      <Card title="主题切换">
        <Button onClick={() => setIsDark(!isDark)}>
          切换{isDark ? '亮色' : '暗色'}主题
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

## 性能优化

### 1. 懒加载组件

```tsx
import { lazy, Suspense } from 'react';
import { Loading } from 'taro-uno';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function LazyLoadExample() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. 虚拟滚动

```tsx
import { VirtualList } from 'taro-uno';

export default function VirtualScrollExample() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  return (
    <VirtualList
      data={data}
      renderItem={(item) => (
        <div key={item.id}>
          {item.name}
        </div>
      )}
      itemHeight={50}
      height={500}
    />
  );
}
```

### 3. 图片懒加载

```tsx
import { Image } from 'taro-uno';

export default function LazyImageExample() {
  return (
    <Image
      src="https://example.com/large-image.jpg"
      lazyLoad
      placeholder="https://example.com/placeholder.jpg"
      onLoad={() => console.log('图片加载完成')}
      onError={() => console.log('图片加载失败')}
    />
  );
}
```

## 调试和开发

### 1. 开发环境配置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev:weapp     # 微信小程序
npm run dev:alipay    # 支付宝小程序
npm run dev:h5        # H5
npm run dev:rn        # React Native
```

### 2. 调试工具

- **微信开发者工具**: 用于调试微信小程序
- **支付宝开发者工具**: 用于调试支付宝小程序
- **Chrome DevTools**: 用于调试 H5
- **React DevTools**: 用于调试 React 组件

### 3. 常见问题

#### Q: 组件样式不生效

A: 确保已经正确引入样式文件：

```typescript
import 'taro-uno/dist/styles/index.css';
```

#### Q: 组件在某些平台不兼容

A: 检查平台特定配置，使用平台检测工具：

```typescript
import { PlatformDetector } from 'taro-uno';

const platform = PlatformDetector.getPlatform();
console.log('当前平台:', platform);
```

#### Q: 表单验证不生效

A: 确保正确配置了验证规则和触发时机：

```tsx
<Form.Item
  name="email"
  rules={[
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' }
  ]}
  validateTrigger="onBlur"
>
  <Input type="email" />
</Form.Item>
```

## 发布和部署

### 1. 构建项目

```bash
# 构建微信小程序
npm run build:weapp

# 构建支付宝小程序
npm run build:alipay

# 构建 H5
npm run build:h5

# 构建 React Native
npm run build:rn
```

### 2. 代码分割

```javascript
// config/index.js
const config = {
  // ... 其他配置
  mini: {
    webpackChain(chain) {
      chain.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
          },
        },
      });
    },
  },
};
```

### 3. 性能监控

```tsx
import { PerformanceMonitor } from 'taro-uno';

export default function PerformanceExample() {
  return (
    <PerformanceMonitor
      onMetrics={(metrics) => {
        console.log('性能指标:', metrics);
      }}
    >
      {/* 应用内容 */}
    </PerformanceMonitor>
  );
}
```

## 贡献指南

### 1. 开发环境设置

```bash
# 克隆项目
git clone https://github.com/your-username/taro-uno.git
cd taro-uno

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 2. 提交规范

```bash
# 提交格式
<type>(<scope>): <description>

# 示例
feat(component): add new component
fix(component): fix component bug
docs(component): update component documentation
test(component): add component tests
```

### 3. 测试

```bash
# 运行所有测试
pnpm test

# 运行单元测试
pnpm test:unit

# 运行集成测试
pnpm test:integration

# 运行端到端测试
pnpm test:e2e
```

## 社区和支持

### 1. 文档

- [组件文档](https://taro-uno.vercel.app/components)
- [开发指南](https://taro-uno.vercel.app/guides)
- [API 参考](https://taro-uno.vercel.app/api)

### 2. 社区

- [GitHub Issues](https://github.com/your-username/taro-uno/issues)
- [讨论区](https://github.com/your-username/taro-uno/discussions)
- [QQ 群]: 123456789

### 3. 更新日志

查看 [更新日志](./changelog.md) 了解最新版本的变化。

## 总结

Taro-Uno 提供了一套完整的 UI 组件解决方案，帮助开发者快速构建多端应用。通过遵循本文档的指导，您可以轻松上手并高效使用 Taro-uno 组件库。