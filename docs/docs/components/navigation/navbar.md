# NavBar 导航栏

### 介绍

导航栏组件，用于页面顶部导航，支持自定义标题、左右按钮等。

### 引入

在 Taro 项目中引入 NavBar 组件：

```tsx
import { NavBar } from '@taroify/core'
```

### 基本用法

```tsx
<NavBar title="标题" />
```

### 带左右按钮

```tsx
<NavBar
  title="标题"
  leftContent="返回"
  rightContent="更多"
  onLeftClick={() => console.log('返回')}
  onRightClick={() => console.log('更多')}
/>
```

### 自定义按钮

```tsx
<NavBar
  title="标题"
  leftContent={<View className="taroify-icon taroify-icon-back" />}
  rightContent={
    <View>
      <View className="taroify-icon taroify-icon-search" />
      <View className="taroify-icon taroify-icon-plus" style={{ marginLeft: '16px' }} />
    </View>
  }
/>
```

### 固定在顶部

```tsx
<NavBar
  title="标题"
  fixed
  placeholder
/>
```

### 自定义背景色

```tsx
<NavBar
  title="标题"
  style={{ backgroundColor: '#13C2C2', color: '#fff' }}
  leftContent={<View className="taroify-icon taroify-icon-back" style={{ color: '#fff' }} />}
/>
```

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | ReactNode | - | 导航栏标题 |
| leftContent | ReactNode | - | 左侧内容 |
| rightContent | ReactNode | - | 右侧内容 |
| onLeftClick | () => void | - | 左侧内容点击事件 |
| onRightClick | () => void | - | 右侧内容点击事件 |
| fixed | boolean | false | 是否固定在顶部 |
| placeholder | boolean | false | 固定在顶部时，是否显示占位元素以防止内容上移 |
| bordered | boolean | true | 是否显示下边框 |
| children | ReactNode | - | 自定义内容，优先级高于 title 属性 |
| style | CSSProperties | - | 自定义样式 |
| className | string | - | 自定义类名 |

### 类型定义

```ts
interface NavBarProps {
  title?: ReactNode
  leftContent?: ReactNode
  rightContent?: ReactNode
  onLeftClick?: () => void
  onRightClick?: () => void
  fixed?: boolean
  placeholder?: boolean
  bordered?: boolean
  children?: ReactNode
  style?: CSSProperties
  className?: string
}
```

### 示例代码

```tsx
import React from 'react'
import { View, Text } from '@tarojs/components'
import { NavBar } from '@taroify/core'

export default function NavBarExample() {
  return (
    <View>
      <Text className="example-title">基本用法</Text>
      <NavBar title="标题" />

      <Text className="example-title">带左右按钮</Text>
      <NavBar
        title="标题"
        leftContent="返回"
        rightContent="更多"
        onLeftClick={() => console.log('返回')}
        onRightClick={() => console.log('更多')}
      />

      <Text className="example-title">自定义按钮</Text>
      <NavBar
        title="标题"
        leftContent={<View className="taroify-icon taroify-icon-back" />}
        rightContent={
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View className="taroify-icon taroify-icon-search" />
            <View className="taroify-icon taroify-icon-plus" style={{ marginLeft: '16px' }} />
          </View>
        }
      />

      <Text className="example-title">固定在顶部</Text>
      <NavBar
        title="标题"
        fixed
        placeholder
      />

      <Text className="example-title">自定义背景色</Text>
      <NavBar
        title="标题"
        style={{ backgroundColor: '#13C2C2', color: '#fff' }}
        leftContent={<View className="taroify-icon taroify-icon-back" style={{ color: '#fff' }} />}
      />
    </View>
  )
}
```