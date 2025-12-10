# Button 按钮

### 介绍

按钮组件，用于触发操作。

### 引入

在 Taro 项目中引入 Button 组件：

```tsx
import { Button } from '@taroify/core'
```

### 基本用法

```tsx
<Button type="primary">主要按钮</Button>
<Button type="secondary">次要按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="link">链接按钮</Button>
```

### 不同大小

```tsx
<Button size="large">大号按钮</Button>
<Button size="medium">中号按钮</Button>
<Button size="small">小号按钮</Button>
<Button size="mini">迷你按钮</Button>
```

### 圆角按钮

```tsx
<Button shape="round">圆角按钮</Button>
<Button shape="circle" icon={<View className="taroify-icon taroify-icon-plus" />} />
```

### 加载状态

```tsx
<Button loading>加载中</Button>
<Button loading type="primary">加载中</Button>
<Button loading shape="circle" />
```

### 禁用状态

```tsx
<Button disabled>禁用按钮</Button>
<Button disabled type="primary">禁用主要按钮</Button>
<Button disabled type="link">禁用链接按钮</Button>
```

### 带图标

```tsx
<Button type="primary" icon={<View className="taroify-icon taroify-icon-search" />}>
  搜索
</Button>
<Button type="primary" icon={<View className="taroify-icon taroify-icon-search" />} iconPosition="right">
  搜索
</Button>
<Button type="primary" icon={<View className="taroify-icon taroify-icon-plus" />} shape="circle" />
```

### 块级按钮

```tsx
<Button type="primary" block>块级按钮</Button>
<Button type="secondary" block>块级按钮</Button>
```

### 自定义颜色

```tsx
<Button color="#13C2C2">自定义颜色</Button>
<Button color="#13C2C2" plain>自定义颜色</Button>
<Button color="#FF6B6B">自定义颜色</Button>
<Button color="#FF6B6B" plain>自定义颜色</Button>
```

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | 'primary' \| 'secondary' \| 'danger' \| 'link' | 'default' | 按钮类型 |
| size | 'large' \| 'medium' \| 'small' \| 'mini' | 'medium' | 按钮大小 |
| shape | 'default' \| 'round' \| 'circle' | 'default' | 按钮形状 |
| color | string | - | 按钮颜色 |
| plain | boolean | false | 是否为镂空按钮 |
| block | boolean | false | 是否为块级按钮 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| icon | ReactNode | - | 按钮图标 |
| iconPosition | 'left' \| 'right' | 'left' | 图标位置 |
| onClick | (e: ITouchEvent) => void | - | 点击事件回调 |
| children | ReactNode | - | 按钮内容 |

### 类型定义

```ts
interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger' | 'link'
  size?: 'large' | 'medium' | 'small' | 'mini'
  shape?: 'default' | 'round' | 'circle'
  color?: string
  plain?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: (e: ITouchEvent) => void
  children?: ReactNode
}
```

### 示例代码

```tsx
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@taroify/core'

export default function ButtonExample() {
  return (
    <View>
      <Text className="example-title">基本用法</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button type="link">链接按钮</Button>
      </View>

      <Text className="example-title">不同大小</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button size="large">大号按钮</Button>
        <Button size="medium">中号按钮</Button>
        <Button size="small">小号按钮</Button>
        <Button size="mini">迷你按钮</Button>
      </View>

      <Text className="example-title">圆角按钮</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button shape="round">圆角按钮</Button>
        <Button shape="circle" icon={<View className="taroify-icon taroify-icon-plus" />} />
      </View>

      <Text className="example-title">加载状态</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button loading>加载中</Button>
        <Button loading type="primary">加载中</Button>
        <Button loading shape="circle" />
      </View>

      <Text className="example-title">禁用状态</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button disabled>禁用按钮</Button>
        <Button disabled type="primary">禁用主要按钮</Button>
        <Button disabled type="link">禁用链接按钮</Button>
      </View>

      <Text className="example-title">带图标</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button type="primary" icon={<View className="taroify-icon taroify-icon-search" />}>
          搜索
        </Button>
        <Button type="primary" icon={<View className="taroify-icon taroify-icon-search" />} iconPosition="right">
          搜索
        </Button>
        <Button type="primary" icon={<View className="taroify-icon taroify-icon-plus" />} shape="circle" />
      </View>

      <Text className="example-title">块级按钮</Text>
      <View style={{ marginBottom: '16px' }}>
        <Button type="primary" block>块级按钮</Button>
        <Button type="secondary" block style={{ marginTop: '12px' }}>块级按钮</Button>
      </View>

      <Text className="example-title">自定义颜色</Text>
      <View style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button color="#13C2C2">自定义颜色</Button>
        <Button color="#13C2C2" plain>自定义颜色</Button>
        <Button color="#FF6B6B">自定义颜色</Button>
        <Button color="#FF6B6B" plain>自定义颜色</Button>
      </View>
    </View>
  )
}
```