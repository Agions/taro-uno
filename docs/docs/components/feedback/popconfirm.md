---
title: Popconfirm
order: 9
---

# Popconfirm 确认弹窗

用于在用户执行关键操作前进行二次确认，防止误操作。

## 基本用法

### 基础确认弹窗

```jsx
import { Popconfirm, Button } from '@taro-uno/ui';

function BasicPopconfirm() {
  return (
    <Popconfirm
      title="确认删除"
      content="确定要删除这个项吗？此操作不可恢复。"
      onConfirm={() => console.log('删除成功')}
      onCancel={() => console.log('取消删除')}
    >
      <Button type="danger">删除</Button>
    </Popconfirm>
  );
}
```

### 自定义按钮文本

```jsx
import { Popconfirm, Button } from '@taro-uno/ui';

function CustomButtonPopconfirm() {
  return (
    <Popconfirm
      title="确认操作"
      content="确定要执行此操作吗？"
      okText="确认"
      cancelText="取消"
      onConfirm={() => console.log('操作成功')}
      onCancel={() => console.log('取消操作')}
    >
      <Button type="primary">执行操作</Button>
    </Popconfirm>
  );
}
```

### 自定义方向

```jsx
import { Popconfirm, Button } from '@taro-uno/ui';

function DirectionPopconfirm() {
  return (
    <Popconfirm
      title="确认操作"
      content="确定要执行此操作吗？"
      direction="bottom"
      onConfirm={() => console.log('操作成功')}
    >
      <Button type="primary">底部弹出</Button>
    </Popconfirm>
  );
}
```

### 自定义主题

```jsx
import { Popconfirm, Button } from '@taro-uno/ui';

function ThemePopconfirm() {
  return (
    <Popconfirm
      title="确认操作"
      content="确定要执行此操作吗？"
      theme="dark"
      onConfirm={() => console.log('操作成功')}
    >
      <Button type="primary">深色主题</Button>
    </Popconfirm>
  );
}
```

## API

### PopconfirmProps

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| config | `PopconfirmConfig` | - | 确认弹窗配置 |
| visible | `boolean` | - | 可见性控制 |
| defaultVisible | `boolean` | `false` | 默认可见性 |
| direction | `PopconfirmDirection` | `top` | 方向，可选值：`top`、`bottom`、`left`、`right` |
| theme | `PopconfirmTheme` | `light` | 主题，可选值：`light`、`dark`、`primary` |
| title | `string` | - | 标题 |
| content | `React.ReactNode` | - | 内容 |
| okText | `string` | `确认` | 确认按钮文本 |
| cancelText | `string` | `取消` | 取消按钮文本 |
| okType | `PopconfirmButtonType` | `primary` | 确认按钮类型，可选值：`primary`、`default`、`danger`、`success` |
| cancelType | `PopconfirmButtonType` | `default` | 取消按钮类型，可选值：`primary`、`default`、`danger`、`success` |
| showClose | `boolean` | `false` | 是否显示关闭按钮 |
| maskClosable | `boolean` | `true` | 点击遮罩层是否关闭 |
| width | `number \| string` | - | 确认弹窗宽度 |
| height | `number \| string` | - | 确认弹窗高度 |
| trigger | `string` | `click` | 触发方式，可选值：`click`、`hover`、`focus`、`manual` |
| disabled | `boolean` | `false` | 是否禁用 |
| onConfirm | `() => void` | - | 确认回调 |
| onCancel | `() => void` | - | 取消回调 |
| onClose | `() => void` | - | 关闭回调 |
| onOpen | `() => void` | - | 打开回调 |
| onMaskClick | `() => void` | - | 点击遮罩回调 |
| icon | `React.ReactNode` | - | 自定义图标 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| maskClassName | `string` | - | 自定义遮罩层类名 |
| maskStyle | `React.CSSProperties` | - | 自定义遮罩层样式 |
| contentClassName | `string` | - | 自定义内容类名 |
| contentStyle | `React.CSSProperties` | - | 自定义内容样式 |
| titleClassName | `string` | - | 自定义标题类名 |
| titleStyle | `React.CSSProperties` | - | 自定义标题样式 |
| buttonContainerClassName | `string` | - | 自定义按钮容器类名 |
| buttonContainerStyle | `React.CSSProperties` | - | 自定义按钮容器样式 |
| animationDuration | `number` | `300` | 动画持续时间（毫秒） |
| showAnimation | `boolean` | `true` | 是否显示动画 |

### PopconfirmDirection

确认弹窗方向，可选值：
- `top`：顶部弹出
- `bottom`：底部弹出
- `left`：左侧弹出
- `right`：右侧弹出

### PopconfirmTheme

确认弹窗主题，可选值：
- `light`：浅色主题
- `dark`：深色主题
- `primary`：主色调主题

### PopconfirmButtonType

确认弹窗按钮类型，可选值：
- `primary`：主要按钮
- `default`：默认按钮
- `danger`：危险按钮
- `success`：成功按钮

### PopconfirmButton

确认弹窗按钮配置：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string` | - | 按钮文本 |
| type | `PopconfirmButtonType` | `default` | 按钮类型 |
| onClick | `() => void` | - | 按钮点击回调 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

### PopconfirmConfig

确认弹窗配置：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | `string` | - | 标题 |
| content | `string` | - | 内容 |
| direction | `PopconfirmDirection` | `top` | 方向 |
| theme | `PopconfirmTheme` | `light` | 主题 |
| showClose | `boolean` | `false` | 是否显示关闭按钮 |
| maskClosable | `boolean` | `true` | 点击遮罩层是否关闭 |
| width | `number \| string` | - | 确认弹窗宽度 |
| height | `number \| string` | - | 确认弹窗高度 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| okButton | `PopconfirmButton \| string` | `确认` | 确认按钮配置 |
| cancelButton | `PopconfirmButton \| string` | `取消` | 取消按钮配置 |

## 示例代码

### 自定义按钮配置

```jsx
import { Popconfirm, Button } from '@taro-uno/ui';

function CustomButtonConfigPopconfirm() {
  return (
    <Popconfirm
      title="确认删除"
      content="确定要删除这个项吗？此操作不可恢复。"
      okButton={{
        text: '删除',
        type: 'danger',
        onClick: () => console.log('删除按钮点击'),
      }}
      cancelButton={{
        text: '取消',
        type: 'default',
        onClick: () => console.log('取消按钮点击'),
      }}
      onConfirm={() => console.log('确认删除')}
      onCancel={() => console.log('取消删除')}
    >
      <Button type="danger">删除</Button>
    </Popconfirm>
  );
}
```

### 手动控制可见性

```jsx
import { useState } from 'react';
import { Popconfirm, Button } from '@taro-uno/ui';

function ManualControlPopconfirm() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>显示确认弹窗</Button>
      <Popconfirm
        visible={visible}
        title="确认操作"
        content="确定要执行此操作吗？"
        onConfirm={() => {
          console.log('操作成功');
          setVisible(false);
        }}
        onCancel={() => {
          console.log('取消操作');
          setVisible(false);
        }}
      >
        {/* 触发器内容 */}
      </Popconfirm>
    </>
  );
}
```

## 注意事项

1. 确认弹窗默认点击遮罩层会关闭，可通过 `maskClosable` 属性控制
2. 确认弹窗支持自定义标题、内容、按钮、方向、主题等
3. 确认弹窗支持手动控制可见性，通过 `visible` 属性
4. 确认弹窗支持自定义样式，可通过 `style` 和 `className` 属性
5. 确认弹窗支持自定义动画，可通过 `animationDuration` 和 `showAnimation` 属性控制
6. 确认弹窗支持多种触发方式，包括点击、悬停、聚焦和手动触发
