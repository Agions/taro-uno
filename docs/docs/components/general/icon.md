# Icon 图标

### 介绍

图标组件，用于显示各种图标。

### 引入

在 Taro 项目中引入 Icon 组件：

```tsx
import { Icon } from '@taroify/core'
```

### 基本用法

```tsx
<Icon name="check" />
<Icon name="close" />
<Icon name="info" />
<Icon name="warning" />
```

### 不同大小

```tsx
<Icon name="check" size="small" />
<Icon name="check" size="medium" />
<Icon name="check" size="large" />
<Icon name="check" style={{ fontSize: '32px' }} />
```

### 不同颜色

```tsx
<Icon name="check" color="#0066FF" />
<Icon name="check" color="#13C2C2" />
<Icon name="check" color="#FF6B6B" />
<Icon name="check" style={{ color: '#FFB800' }} />
```

### 自定义图标

```tsx
<Icon
  name="custom"
  render={
    <View style={{ width: '20px', height: '20px', backgroundColor: '#0066FF', borderRadius: '4px' }} />
  }
/>
```

### 图标集合

以下是常用图标名称示例：

#### 方向图标
- arrow-up
- arrow-down
- arrow-left
- arrow-right
- arrow-up-left
- arrow-up-right
- arrow-down-left
- arrow-down-right

#### 操作图标
- check
- close
- info
- warning
- plus
- minus
- edit
- delete
- search
- refresh
- loading
- play
- pause
- stop

#### 布局图标
- home
- menu
- setting
- user
- message
- bell
- heart
- star
- share
- more

#### 社交图标
- wechat
- weibo
- qq
- github
- linkedin

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | string | - | 图标名称 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 图标大小 |
| color | string | - | 图标颜色 |
| render | ReactNode | - | 自定义图标渲染 |
| style | CSSProperties | - | 自定义样式 |
| className | string | - | 自定义类名 |

### 类型定义

```ts
interface IconProps {
  name?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  render?: ReactNode
  style?: CSSProperties
  className?: string
}
```

### 示例代码

```tsx
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Icon } from '@taroify/core'

export default function IconExample() {
  return (
    <View>
      <Text className="example-title">基本用法</Text>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <Icon name="check" />
        <Icon name="close" />
        <Icon name="info" />
        <Icon name="warning" />
        <Icon name="search" />
        <Icon name="plus" />
        <Icon name="minus" />
      </View>

      <Text className="example-title">不同大小</Text>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
        <Icon name="check" size="small" />
        <Icon name="check" size="medium" />
        <Icon name="check" size="large" />
        <Icon name="check" style={{ fontSize: '32px' }} />
        <Icon name="check" style={{ fontSize: '48px' }} />
      </View>

      <Text className="example-title">不同颜色</Text>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <Icon name="check" color="#0066FF" />
        <Icon name="check" color="#13C2C2" />
        <Icon name="check" color="#FF6B6B" />
        <Icon name="check" color="#FFB800" />
        <Icon name="check" color="#52C41A" />
      </View>

      <Text className="example-title">自定义图标</Text>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
        <Icon
          name="custom"
          render={
            <View style={{ width: '24px', height: '24px', backgroundColor: '#0066FF', borderRadius: '4px' }} />
          }
        />
        <Icon
          name="custom"
          render={
            <View style={{ width: '24px', height: '24px', backgroundColor: '#13C2C2', borderRadius: '50%' }} />
          }
        />
        <Icon
          name="custom"
          render={
            <View style={{ width: '24px', height: '24px', border: '2px solid #FF6B6B', borderRadius: '4px' }} />
          }
        />
      </View>

      <Text className="example-title">加载图标</Text>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <Icon name="loading" />
        <Icon name="loading" size="large" />
        <Icon name="loading" color="#0066FF" />
      </View>
    </View>
  )
}
```