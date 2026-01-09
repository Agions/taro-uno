# Breadcrumb 面包屑

## 功能描述

Breadcrumb 面包屑组件用于显示当前页面在网站层级结构中的位置，便于用户导航和了解当前位置。

## 代码示例

### 基础用法

```jsx
import { Breadcrumb } from 'taro-uno';

<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

### 带链接的面包屑

```jsx
<Breadcrumb>
  <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
  <Breadcrumb.Item href="/products">产品中心</Breadcrumb.Item>
  <Breadcrumb.Item href="/products/phones">手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

### 自定义分隔符

```jsx
<Breadcrumb separator="/">
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

### 自定义分隔符图标

```jsx
import { Icon } from 'taro-uno';

<Breadcrumb separator={<Icon name="arrow-right" />}>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

### 带图标的面包屑项

```jsx
import { Icon } from 'taro-uno';

<Breadcrumb>
  <Breadcrumb.Item><Icon name="home" /> 首页</Breadcrumb.Item>
  <Breadcrumb.Item><Icon name="shopping-bag" /> 产品中心</Breadcrumb.Item>
  <Breadcrumb.Item><Icon name="mobile" /> 手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

## API

### Breadcrumb 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | - | 自定义类名 |
| separator | ReactNode | / | 分隔符，可以是字符串或 React 元素 |
| style | React.CSSProperties | - | 自定义样式 |
| children | ReactNode | - | 面包屑项，必须是 Breadcrumb.Item 组件 |

### Breadcrumb.Item 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | - | 自定义类名 |
| href | string | - | 链接地址，设置后会渲染为 a 标签 |
| style | React.CSSProperties | - | 自定义样式 |
| onClick | () => void | - | 点击事件，设置后会渲染为 button 标签 |
| children | ReactNode | - | 面包屑项内容 |

## 示例代码

### 基础面包屑

```jsx
<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

### 自定义分隔符

```jsx
<Breadcrumb separator="-" />
<Breadcrumb separator={<Icon name="arrow-right" />} />
<Breadcrumb separator=" > " />
```

### 带链接的面包屑

```jsx
<Breadcrumb>
  <Breadcrumb.Item href="/" onClick={() => console.log('首页')}>首页</Breadcrumb.Item>
  <Breadcrumb.Item href="/products">产品中心</Breadcrumb.Item>
  <Breadcrumb.Item href="/products/phones">手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

### 响应式面包屑

```jsx
<Breadcrumb>
  <Breadcrumb.Item>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name="home" style={{ marginRight: 4 }} />
      <span>首页</span>
    </div>
  </Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
  <Breadcrumb.Item>配置</Breadcrumb.Item>
  <Breadcrumb.Item>颜色</Breadcrumb.Item>
  <Breadcrumb.Item>存储</Breadcrumb.Item>
</Breadcrumb>
```

## 注意事项

1. Breadcrumb 组件的直接子元素必须是 Breadcrumb.Item 组件，否则会导致渲染错误。
2. 当设置了 href 属性时，Breadcrumb.Item 会渲染为 a 标签；当设置了 onClick 属性时，会渲染为 button 标签；否则会渲染为 span 标签。
3. 分隔符可以是字符串或 React 元素，支持自定义图标或其他 React 组件。
4. Breadcrumb 组件支持自定义样式和类名，可以通过 style 和 className 属性进行定制。
5. 在移动端设备上，建议适当减少面包屑的层级，以避免横向滚动。
6. 面包屑组件主要用于网站或应用的导航层级展示，不适合用于复杂的路径展示。

## 相关组件

- [Menu](/components/navigation/menu)
- [Tabs](/components/navigation/tabs)
- [Steps](/components/navigation/steps)
- [PageHeader](/components/navigation/page-header)
