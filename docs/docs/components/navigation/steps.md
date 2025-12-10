# Steps 步骤条

### 介绍

步骤条组件，用于展示操作流程的各个步骤。

### 引入

在 Taro 项目中引入 Steps 组件：

```tsx
import { Steps, Step } from '@taroify/core'
```

### 基本用法

```tsx
<Steps current={1}>
  <Step title="第一步" description="描述信息" />
  <Step title="第二步" description="描述信息" />
  <Step title="第三步" description="描述信息" />
</Steps>
```

### 带图标步骤

```tsx
<Steps current={1}>
  <Step
    title="第一步"
    description="描述信息"
    icon={<View className="taroify-icon taroify-icon-check" />}
  />
  <Step
    title="第二步"
    description="描述信息"
    icon={<View className="taroify-icon taroify-icon-clock" />}
  />
  <Step
    title="第三步"
    description="描述信息"
    icon={<View className="taroify-icon taroify-icon-close" />}
  />
</Steps>
```

### 竖直线性步骤

```tsx
<Steps direction="vertical" current={1}>
  <Step title="第一步" description="描述信息" />
  <Step title="第二步" description="描述信息" />
  <Step title="第三步" description="描述信息" />
</Steps>
```

### 自定义样式

```tsx
<Steps current={1} activeColor="#13C2C2">
  <Step title="第一步" description="描述信息" />
  <Step title="第二步" description="描述信息" />
  <Step title="第三步" description="描述信息" />
</Steps>
```

### 点击步骤

```tsx
<Steps current={current} onClick={setCurrent}>
  <Step title="第一步" description="描述信息" />
  <Step title="第二步" description="描述信息" />
  <Step title="第三步" description="描述信息" />
</Steps>
```

### 属性

#### Steps Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| current | number | 0 | 当前激活步骤索引 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 步骤条方向 |
| activeColor | string | '#0066FF' | 激活步骤的颜色 |
| inactiveColor | string | '#969799' | 未激活步骤的颜色 |
| onClick | (index: number) => void | - | 点击步骤时的回调函数 |

#### Step Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | ReactNode | - | 步骤标题 |
| description | ReactNode | - | 步骤描述 |
| icon | ReactNode | - | 步骤图标 |
| status | 'wait' \| 'process' \| 'finish' \| 'error' | - | 步骤状态，优先级高于父组件的 current 属性 |

### 类型定义

```ts
interface StepsProps {
  current?: number
  direction?: 'horizontal' | 'vertical'
  activeColor?: string
  inactiveColor?: string
  onClick?: (index: number) => void
  children?: ReactNode
}

interface StepProps {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  status?: 'wait' | 'process' | 'finish' | 'error'
  children?: ReactNode
}
```

### 示例代码

```tsx
import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Steps, Step } from '@taroify/core'

export default function StepsExample() {
  const [current, setCurrent] = useState(1)

  return (
    <View>
      <Text className="example-title">基本用法</Text>
      <Steps current={1}>
        <Step title="第一步" description="描述信息" />
        <Step title="第二步" description="描述信息" />
        <Step title="第三步" description="描述信息" />
      </Steps>

      <Text className="example-title">带图标步骤</Text>
      <Steps current={1}>
        <Step
          title="第一步"
          description="描述信息"
          icon={<View className="taroify-icon taroify-icon-check" />}
        />
        <Step
          title="第二步"
          description="描述信息"
          icon={<View className="taroify-icon taroify-icon-clock" />}
        />
        <Step
          title="第三步"
          description="描述信息"
          icon={<View className="taroify-icon taroify-icon-close" />}
        />
      </Steps>

      <Text className="example-title">竖直线性步骤</Text>
      <Steps direction="vertical" current={1}>
        <Step title="第一步" description="描述信息" />
        <Step title="第二步" description="描述信息" />
        <Step title="第三步" description="描述信息" />
      </Steps>

      <Text className="example-title">自定义样式</Text>
      <Steps current={1} activeColor="#13C2C2">
        <Step title="第一步" description="描述信息" />
        <Step title="第二步" description="描述信息" />
        <Step title="第三步" description="描述信息" />
      </Steps>

      <Text className="example-title">点击步骤</Text>
      <Steps current={current} onClick={setCurrent}>
        <Step title="第一步" description="描述信息" />
        <Step title="第二步" description="描述信息" />
        <Step title="第三步" description="描述信息" />
      </Steps>
    </View>
  )
}
```