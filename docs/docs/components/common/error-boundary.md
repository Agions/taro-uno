---
sidebar_position: 1
---

# ErrorBoundary 错误边界

错误边界组件，用于捕获子组件的 JavaScript 错误。

## 何时使用

- 需要捕获组件渲染错误时
- 需要展示错误回退 UI 时
- 需要防止错误导致整个应用崩溃时

## 代码演示

### 基础用法

```tsx
import { ErrorBoundary } from 'taro-uno';

function Demo() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 自定义错误 UI

```tsx
import { ErrorBoundary } from 'taro-uno';

function Demo() {
  return (
    <ErrorBoundary
      fallback={<div>出错了，请刷新页面</div>}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 错误回调

```tsx
import { ErrorBoundary } from 'taro-uno';

function Demo() {
  const handleError = (error, errorInfo) => {
    // 上报错误到监控系统
    console.error(error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | `ReactNode` | - |
| fallback | 错误回退 UI | `ReactNode` | 默认错误提示 |
| onError | 错误回调 | `(error: Error, errorInfo: ErrorInfo) => void` | - |
| onReset | 重置回调 | `() => void` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
