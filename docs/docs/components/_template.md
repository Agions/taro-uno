---
sidebar_position: 1
---

# ComponentName 组件名称

组件简介描述。说明组件的主要用途和适用场景。

## 何时使用

- 使用场景 1
- 使用场景 2
- 使用场景 3

## 代码演示

### 基础用法

最简单的用法。

```tsx
import { ComponentName } from 'taro-uno-ui';

function Demo() {
  return <ComponentName>内容</ComponentName>;
}
```

### 不同尺寸

组件支持多种尺寸。

```tsx
import { ComponentName } from 'taro-uno-ui';

function Demo() {
  return (
    <>
      <ComponentName size="sm">小尺寸</ComponentName>
      <ComponentName size="md">中尺寸</ComponentName>
      <ComponentName size="lg">大尺寸</ComponentName>
    </>
  );
}
```

### 禁用状态

禁用状态下组件不可交互。

```tsx
import { ComponentName } from 'taro-uno-ui';

function Demo() {
  return <ComponentName disabled>禁用状态</ComponentName>;
}
```

### 自定义样式

通过 `className` 和 `style` 自定义组件样式。

```tsx
import { ComponentName } from 'taro-uno-ui';

function Demo() {
  return (
    <ComponentName
      className="custom-class"
      style={{ color: 'red' }}
    >
      自定义样式
    </ComponentName>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onClick | 点击事件 | `(event: ITouchEvent) => void` |
| onChange | 值变更事件 | `(value: T) => void` |

### Ref Methods

通过 `ref` 可以获取组件实例并调用实例方法。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使组件获取焦点 | - |
| blur | 使组件失去焦点 | - |

### CSS 变量

组件提供以下 CSS 变量，可用于自定义样式。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --component-color | 主色调 | `var(--color-primary)` |
| --component-bg | 背景色 | `var(--color-bg)` |
| --component-border-radius | 圆角 | `var(--radius-md)` |

## 平台兼容性

| 平台 | 支持 | 备注 |
| --- | --- | --- |
| 微信小程序 | ✅ | - |
| 支付宝小程序 | ✅ | - |
| 百度小程序 | ✅ | - |
| 字节小程序 | ✅ | - |
| QQ 小程序 | ✅ | - |
| H5 | ✅ | - |
| React Native | ✅ | - |
| 鸿蒙 | ✅ | - |

## 设计规范

- 设计规范说明 1
- 设计规范说明 2

## 注意事项

- 注意事项 1
- 注意事项 2
- 注意事项 3

## 相关组件

- [RelatedComponent1](/docs/components/category/related1) - 相关组件说明
- [RelatedComponent2](/docs/components/category/related2) - 相关组件说明
