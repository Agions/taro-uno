# PageHeader 页头

## 功能描述

PageHeader 页头组件用于页面顶部，显示页面标题、面包屑、操作按钮等信息，帮助用户快速了解当前页面的位置和主要功能。

## 代码示例

### 基础用法

```jsx
import { PageHeader } from 'taro-uno';

<PageHeader title="页面标题" />
```

### 带返回按钮

```jsx
<PageHeader
  title="页面标题"
  onBack={() => console.log('返回')}
/>
```

### 带面包屑

```jsx
import { PageHeader, Breadcrumb } from 'taro-uno';

<PageHeader
  title="页面标题"
  breadcrumb={
    <Breadcrumb>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item>产品中心</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  }
/>
```

### 带操作按钮

```jsx
import { PageHeader, Button } from 'taro-uno';

<PageHeader
  title="页面标题"
  extra={
    <Button type="primary">操作按钮</Button>
  }
/>
```

### 完整示例

```jsx
import { PageHeader, Breadcrumb, Button } from 'taro-uno';

<PageHeader
  title="页面标题"
  subTitle="页面副标题"
  onBack={() => console.log('返回')}
  breadcrumb={
    <Breadcrumb>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item>产品中心</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  }
  extra={
    <>
      <Button style={{ marginRight: 8 }}>次要按钮</Button>
      <Button type="primary">主要按钮</Button>
    </>
  }
  description="这是页面的详细描述信息，可以包含页面的主要功能、使用说明等内容。"
/>
```

## API

### PageHeader 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | - | 自定义类名 |
| style | React.CSSProperties | - | 自定义样式 |
| title | ReactNode | - | 页面标题 |
| subTitle | ReactNode | - | 页面副标题 |
| onBack | () => void | - | 返回按钮点击事件，设置后会显示返回按钮 |
| breadcrumb | ReactNode | - | 面包屑组件，通常是 Breadcrumb 组件 |
| extra | ReactNode | - | 右侧操作区，通常是 Button 或其他组件 |
| description | ReactNode | - | 页面描述信息 |
| children | ReactNode | - | 页头内容，可以是自定义的内容区域 |
| prefixCls | string | 'taro-uno-page-header' | 组件类名前缀 |
| backIcon | ReactNode | - | 自定义返回图标 |

## 示例代码

### 基础页头

```jsx
<PageHeader title="页面标题" />
```

### 带返回按钮的页头

```jsx
<PageHeader
  title="页面标题"
  onBack={() => console.log('返回')}
/>
```

### 带面包屑和操作按钮的页头

```jsx
<PageHeader
  title="页面标题"
  subTitle="页面副标题"
  breadcrumb={
    <Breadcrumb>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item>产品中心</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  }
  extra={
    <Button type="primary">操作按钮</Button>
  }
/>
```

### 带描述信息的页头

```jsx
<PageHeader
  title="页面标题"
  description="这是页面的详细描述信息，可以包含页面的主要功能、使用说明等内容。"
/>
```

### 自定义返回图标

```jsx
import { Icon } from 'taro-uno';

<PageHeader
  title="页面标题"
  onBack={() => console.log('返回')}
  backIcon={<Icon name="arrow-left" />}
/>
```

## 注意事项

1. PageHeader 组件通常用于页面顶部，作为页面的导航和信息展示区域。
2. 当设置了 onBack 属性时，会自动显示返回按钮；否则不会显示返回按钮。
3. breadcrumb 属性用于设置面包屑，通常传入 Breadcrumb 组件。
4. extra 属性用于设置右侧操作区，可以传入单个或多个组件。
5. description 属性用于设置页面描述信息，通常用于简要说明页面的功能或内容。
6. PageHeader 组件支持自定义样式和类名，可以通过 style 和 className 属性进行定制。
7. 在移动端设备上，建议适当简化页头内容，以适应较小的屏幕空间。
8. PageHeader 组件可以嵌套使用，但通常情况下建议只在页面顶部使用一次。

## 相关组件

- [Breadcrumb](/components/navigation/breadcrumb)
- [Menu](/components/navigation/menu)
- [Tabs](/components/navigation/tabs)
- [Steps](/components/navigation/steps)
