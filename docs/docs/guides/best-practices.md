# 最佳实践

本指南将介绍使用 Taro Uno UI 组件库的最佳实践，帮助您编写高质量、高性能的代码。

## 🎯 组件使用最佳实践

### 1. 按需引入组件

始终按需引入组件，避免引入不必要的代码，减小包体积：

```tsx
// 推荐：按需引入单个组件
import { Button } from 'taro-uno-ui';

// 不推荐：引入整个组件库
import * as TaroUnoUI from 'taro-uno-ui';
```

### 2. 使用合适的组件

根据场景选择合适的组件，避免过度使用复杂组件：

```tsx
// 简单按钮使用 Button 组件
<Button type="primary">点击我</Button>

// 复杂按钮组使用 Space + Button 组合
<Space>
  <Button type="primary">按钮 1</Button>
  <Button type="secondary">按钮 2</Button>
</Space>
```

### 3. 合理设置组件属性

只传递组件所需的属性，避免传递不必要的属性：

```tsx
// 推荐：只传递必要属性
<Button type="primary" onClick={handleClick}>
  点击我
</Button>

// 不推荐：传递不必要的属性
<Button type="primary" onClick={handleClick} disabled={false} loading={false}>
  点击我
</Button>
```

### 4. 使用组件的默认值

对于有默认值的属性，如果没有特殊需求，尽量使用默认值：

```tsx
// 推荐：使用默认值
<Button type="primary">点击我</Button>

// 不推荐：显式设置默认值
<Button type="primary" size="md">点击我</Button>
```

## ⚡ 性能优化建议

### 1. 使用 React.memo

对于纯展示组件，使用 `React.memo` 包装，避免不必要的重新渲染：

```tsx
const MemoizedComponent = React.memo(({ data }) => {
  return <View>{data}</View>;
});
```

### 2. 使用 useCallback 和 useMemo

使用 `useCallback` 缓存函数，使用 `useMemo` 缓存计算结果：

```tsx
// 缓存函数
const handleClick = useCallback(() => {
  // 处理点击事件
}, []);

// 缓存计算结果
const computedValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### 3. 优化长列表

对于长列表数据，使用 `VirtualList` 组件优化渲染性能：

```tsx
<VirtualList
  data={longListData}
  height={400}
  itemHeight={50}
  renderItem={({ item }) => <div>{item}</div>}
/>
```

### 4. 延迟加载组件

对于重量级组件，使用 `LazyComponent` 延迟加载：

```tsx
<LazyComponent>
  <HeavyComponent />
</LazyComponent>
```

### 5. 减少不必要的渲染

使用 `key` 属性帮助 React 识别列表项的变化，避免不必要的重新渲染：

```tsx
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

## 📁 代码组织建议

### 1. 组件化开发

将页面拆分为多个小组件，提高代码的复用性和可维护性：

```
pages/
  index/
    index.tsx          // 主页面
    components/        // 页面级组件
      Header.tsx      // 头部组件
      Content.tsx     // 内容组件
      Footer.tsx      // 底部组件
```

### 2. 统一管理样式

将样式集中管理，避免样式冲突：

```
styles/
  global.css         // 全局样式
  variables.css      // 样式变量
  mixins.css         // 样式混合
  components/        // 组件样式
    button.css       // 按钮样式
    input.css        // 输入框样式
```

### 3. 使用 TypeScript

使用 TypeScript 编写代码，提高代码的类型安全性和开发体验：

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <View>
      <View>{user.name}</View>
      <View>{user.email}</View>
    </View>
  );
};
```

### 4. 编写清晰的注释

为复杂代码添加清晰的注释，提高代码的可理解性：

```tsx
/**
 * 用户卡片组件
 * @param user 用户信息
 * @returns 用户卡片 JSX
 */
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  // 处理用户数据
  const formattedName = user.name.toUpperCase();
  
  return (
    <View className="user-card">
      <View>{formattedName}</View>
      <View>{user.email}</View>
    </View>
  );
};
```

## 🔄 跨平台开发建议

### 1. 避免使用平台特定 API

尽量使用 Taro 提供的统一 API，避免使用平台特定的 API：

```tsx
// 推荐：使用 Taro 统一 API
Taro.request({
  url: 'https://api.example.com',
  method: 'GET',
});

// 不推荐：使用平台特定 API
if (process.env.TARO_ENV === 'h5') {
  fetch('https://api.example.com');
} else if (process.env.TARO_ENV === 'weapp') {
  wx.request({
    url: 'https://api.example.com',
    method: 'GET',
  });
}
```

### 2. 使用平台条件编译

对于必须使用平台特定 API 的场景，使用 Taro 的平台条件编译语法：

```tsx
// #ifdef H5
// H5 平台特定代码
console.log('当前是 H5 平台');
// #endif

// #ifdef MP-WEIXIN
// 微信小程序平台特定代码
console.log('当前是微信小程序平台');
// #endif
```

### 3. 测试所有平台

确保在所有目标平台上测试应用，以确保组件在不同平台上都能正常工作：

```bash
# 测试 H5
npm run dev:h5

# 测试微信小程序
npm run dev:weapp

# 测试 React Native
npm run dev:rn
```

## 🧪 测试和调试建议

### 1. 编写单元测试

为组件编写单元测试，确保组件的功能正确性：

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from 'taro-uno-ui';

describe('Button Component', () => {
  it('should render correctly', () => {
    render(<Button type="primary">点击我</Button>);
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button type="primary" onClick={handleClick}>点击我</Button>);
    fireEvent.click(screen.getByText('点击我'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. 使用调试工具

使用合适的调试工具调试应用：

- **H5**：浏览器开发者工具
- **微信小程序**：微信开发者工具
- **React Native**：React Native Debugger

### 3. 监控性能

使用 `usePerformanceMonitor` Hook 监控组件性能：

```tsx
import { usePerformanceMonitor } from 'taro-uno-ui';

const PerformanceComponent = () => {
  usePerformanceMonitor('PerformanceComponent', {
    trackRender: true,
    trackInteractions: true,
  });

  return <View>性能监控组件</View>;
};
```

## 📚 文档和示例

### 1. 编写清晰的文档

为组件编写清晰的文档，包括使用方法、属性说明、示例代码等：

```markdown
# Button 组件

## 基本使用

```tsx
<Button type="primary">点击我</Button>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | string | 'primary' | 按钮类型 |
| size | string | 'md' | 按钮大小 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| onClick | function | - | 点击事件处理函数 |
```

### 2. 提供丰富的示例

为组件提供丰富的示例，覆盖各种使用场景：

```tsx
// 基本按钮
<Button type="primary">基本按钮</Button>

// 不同类型按钮
<Space>
  <Button type="primary">主要按钮</Button>
  <Button type="secondary">次要按钮</Button>
  <Button type="success">成功按钮</Button>
  <Button type="warning">警告按钮</Button>
  <Button type="error">错误按钮</Button>
</Space>

// 不同大小按钮
<Space>
  <Button type="primary" size="xs">超小按钮</Button>
  <Button type="primary" size="sm">小按钮</Button>
  <Button type="primary" size="md">中按钮</Button>
  <Button type="primary" size="lg">大按钮</Button>
</Space>
```

## 🔒 安全建议

### 1. 防止 XSS 攻击

使用 `xssProtection` 工具函数处理用户输入：

```tsx
import { xssProtection } from 'taro-uno-ui';

const safeHtml = xssProtection(dangerousHtml);
```

### 2. 安全的 API 调用

使用 `safeRequest` 工具函数进行 API 调用：

```tsx
import { safeRequest } from 'taro-uno-ui';

const response = await safeRequest('/api/data', {
  method: 'POST',
  data: { key: 'value' },
});
```

### 3. 数据验证

在客户端对用户输入进行验证：

```tsx
import { validateInput } from 'taro-uno-ui';

const validation = validateInput(email, {
  type: 'email',
  required: true,
});

if (!validation.valid) {
  // 处理验证错误
  console.error(validation.errors);
}
```

## 🎨 设计建议

### 1. 遵循设计系统

遵循设计系统的规范，确保设计的一致性：

```tsx
// 使用设计系统的颜色
<Button type="primary" style={{ backgroundColor: designSystem.colors.brand }}>
  品牌按钮
</Button>

// 使用设计系统的间距
<Space size={designSystem.spacing.md}>
  <Button type="primary">按钮 1</Button>
  <Button type="secondary">按钮 2</Button>
</Space>
```

### 2. 保持视觉一致性

保持组件之间的视觉一致性，包括颜色、字体、间距等：

```tsx
// 推荐：保持视觉一致性
<Space>
  <Button type="primary">按钮 1</Button>
  <Button type="secondary">按钮 2</Button>
</Space>

// 不推荐：视觉不一致
<Button type="primary" style={{ borderRadius: '8px' }}>按钮 1</Button>
<Button type="secondary" style={{ borderRadius: '4px' }}>按钮 2</Button>
```

### 3. 考虑无障碍

为组件添加适当的无障碍属性，提高无障碍访问性：

```tsx
// 添加 ARIA 属性
<Button type="primary" aria-label="主要按钮" onClick={handleClick}>
  点击我
</Button>

// 支持键盘导航
<Button type="primary" onKeyDown={(e) => {
  if (e.key === 'Enter') {
    handleClick();
  }
}}>
  点击我
</Button>
```

## 📚 下一步

- [组件文档](../components/basic/button) - 查看所有可用组件
- [API 参考](../api) - 查看详细的 API 文档
- [常见问题](../faq) - 查看常见问题及解决方案
