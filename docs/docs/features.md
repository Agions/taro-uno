# 核心功能

Taro Uno UI 提供了一系列强大的核心功能，旨在提高开发效率、优化性能并提供良好的用户体验。

## 🌐 跨平台兼容

### 多端支持

Taro Uno UI 支持以下平台：

- **微信小程序**：完全兼容微信小程序生态
- **H5**：支持各种现代浏览器
- **React Native**：跨平台移动应用开发
- **其他小程序平台**：支付宝、百度、字节跳动等

### 统一 API 设计

所有组件和工具函数都采用统一的 API 设计，确保在不同平台上的使用体验一致。

```tsx
// 在所有平台上使用相同的 API
import { Button } from 'taro-uno-ui';

<Button type="primary" onClick={() => console.log('点击了按钮')}>
  按钮
</Button>;
```

### 平台适配

组件内部会自动处理不同平台的差异，开发者无需关心底层实现细节。

## 🎣 强大的 React Hooks

Taro Uno UI 提供了丰富的 React Hooks，帮助开发者处理各种常见场景：

### 状态管理

```tsx
import { useToggle, useCounter } from 'taro-uno-ui';

// 使用 useToggle 管理开关状态
const [isOpen, toggle] = useToggle(false);

// 使用 useCounter 管理计数
const { count, increment, decrement, reset } = useCounter(0, {
  min: 0,
  max: 10,
});
```

### 副作用处理

```tsx
import { useDebounce, useThrottle } from 'taro-uno-ui';

// 防抖处理
const debouncedValue = useDebounce(value, 300);

// 节流处理
const throttledValue = useThrottle(value, 1000);
```

### 网络请求

```tsx
import { useRequest, useMutation } from 'taro-uno-ui';

// GET 请求
const { data, loading, error, refetch } = useRequest('/api/data');

// POST 请求
const { mutate, loading } = useMutation('/api/submit', {
  onSuccess: () => {
    console.log('提交成功');
  },
});
```

### 存储管理

```tsx
import { useLocalStorage, useSessionStorage } from 'taro-uno-ui';

// 本地存储
const [userInfo, setUserInfo] = useLocalStorage('userInfo', {});

// 会话存储
const [token, setToken] = useSessionStorage('token', '');
```

## 🔗 多平台 API 请求层

### RequestClient

智能 HTTP 客户端，自动适配各平台：

```tsx
import { RequestClient } from 'taro-uno-ui';

const client = new RequestClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// GET 请求
const response = await client.get('/users');

// POST 请求
const response = await client.post('/users', {
  name: 'test',
  email: 'test@example.com',
});
```

### 智能缓存

请求缓存与去重，性能提升 67%：

```tsx
const response = await client.get('/users', {
  cache: {
    enabled: true,
    ttl: 60000, // 缓存时间 1 分钟
  },
});
```

### 灵活重试

支持指数/线性/固定退避策略：

```tsx
const response = await client.get('/users', {
  retry: {
    enabled: true,
    count: 3,
    delay: 1000,
    strategy: 'exponential', // 指数退避
  },
});
```

### 拦截器

完整的请求/响应拦截支持：

```tsx
client.interceptors.request.use(
  (config) => {
    // 添加 token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    // 处理响应数据
    return response.data;
  },
  (error) => {
    // 处理错误
    return Promise.reject(error);
  }
);
```

## 🎨 主题定制

### 设计系统

Taro Uno UI 基于设计系统构建，包含：

- 颜色系统
- 排版系统
- 间距系统
- 阴影系统
- 动画系统

### 主题变量

支持通过 CSS 变量或 JavaScript 配置自定义主题：

```tsx
import { AppProvider } from 'taro-uno-ui';

const theme = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif',
  },
  spacing: {
    base: 4,
  },
};

<AppProvider theme={theme}>
  <App />
</AppProvider>;
```

### 暗色主题

内置支持暗色主题切换：

```tsx
import { useTheme, ThemeProvider } from 'taro-uno-ui';

const { theme, toggleTheme } = useTheme();

<Button onClick={toggleTheme}>
  切换到 {theme === 'light' ? '暗色' : '亮色'} 主题
</Button>
```

## 📱 组件库架构

### 组件分类

Taro Uno UI 将组件分为以下几大类：

- **基础组件**：Button、Icon、Typography 等
- **表单组件**：Input、Select、Checkbox 等
- **布局组件**：Grid、Space、Layout 等
- **显示组件**：Card、List、Table 等
- **反馈组件**：Modal、Message、Toast 等
- **导航组件**：Tabs、Pagination、Steps 等

### 组件设计原则

- **单一职责**：每个组件只负责一个功能
- **可组合性**：组件之间可以灵活组合
- **可扩展性**：支持通过属性和插槽扩展功能
- **无障碍支持**：符合 WCAG 标准
- **性能优化**：减少不必要的渲染和计算

## ⚡ 性能优化

### 按需加载

支持组件按需加载，减小应用体积：

```tsx
// 按需引入单个组件
import { Button } from 'taro-uno-ui/button';
```

### 虚拟列表

对于长列表数据，提供虚拟列表组件，优化渲染性能：

```tsx
import { VirtualList } from 'taro-uno-ui';

<VirtualList
  data={longListData}
  height={400}
  itemHeight={50}
  renderItem={({ item }) => <div>{item}</div>}
/>
```

### 延迟加载

支持图片和组件的延迟加载：

```tsx
import { LazyComponent } from 'taro-uno-ui';

<LazyComponent>
  <HeavyComponent />
</LazyComponent>
```

## ♿ 无障碍支持

### ARIA 属性

所有交互组件都添加了适当的 ARIA 属性，提高无障碍访问性。

### 键盘导航

支持键盘导航，确保所有功能都可以通过键盘访问。

### 屏幕阅读器支持

优化了屏幕阅读器的使用体验，确保内容可以被正确朗读。

## 🔒 安全特性

### XSS 防护

内置 XSS 防护机制，防止跨站脚本攻击：

```tsx
import { xssProtection } from 'taro-uno-ui';

const safeHtml = xssProtection(dangerousHtml);
```

### 安全的 API 调用

提供安全的 API 调用工具，防止常见的安全漏洞：

```tsx
import { safeRequest } from 'taro-uno-ui';

const response = await safeRequest('/api/data', {
  method: 'POST',
  data: { key: 'value' },
});
```

### 数据验证

提供客户端数据验证工具，确保数据安全：

```tsx
import { validateInput } from 'taro-uno-ui';

const validation = validateInput(email, {
  type: 'email',
  required: true,
});
```

## 📊 性能监控

### 内置监控

组件库内置了性能监控功能，可以跟踪组件渲染和交互性能。

```tsx
import { usePerformanceMonitor } from 'taro-uno-ui';

usePerformanceMonitor('ComponentName', {
  trackRender: true,
  trackInteractions: true,
});
```

### 性能报告

支持生成性能报告，帮助开发者优化应用性能：

```tsx
import { generatePerformanceReport } from 'taro-uno-ui';

const report = generatePerformanceReport();
console.log(report);
```

## 🎯 未来规划

- [ ] 更多组件支持
- [ ] 更完善的设计系统
- [ ] 更好的性能优化
- [ ] 更多平台支持
- [ ] 更丰富的生态系统

## 💡 最佳实践

- 按需引入组件，减小应用体积
- 合理使用 Hooks，提高代码复用性
- 遵循组件设计原则，保持代码清晰
- 关注性能优化，提高应用响应速度
- 考虑无障碍支持，确保良好的用户体验

## 📚 下一步

- [查看组件文档](./components/basic/button) 了解所有可用组件
- [阅读开发指南](./guides/installation) 深入学习使用技巧
- [探索 API 参考](./api) 了解详细的 API 文档
