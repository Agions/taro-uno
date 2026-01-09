---
title: Drawer
order: 10
---

# Drawer 抽屉

从屏幕边缘滑出的对话框，用于展示额外的内容或操作选项。

## 基本用法

### 基础抽屉

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function BasicDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer
        title="抽屉标题"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>这是抽屉内容区域，可以放置任何需要展示的内容，如表单、列表、详情等。</p>
        <p>抽屉支持自定义宽度、方向、主题等属性。</p>
      </Drawer>
    </>
  );
}
```

### 自定义方向

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function DirectionDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>从右侧打开抽屉</Button>
      <Drawer
        title="右侧抽屉"
        direction="right"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>这是从右侧滑出的抽屉。</p>
      </Drawer>
    </>
  );
}
```

### 自定义宽度

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function WidthDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>打开宽抽屉</Button>
      <Drawer
        title="宽抽屉"
        width={500}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>这是宽度为 500px 的抽屉。</p>
      </Drawer>
    </>
  );
}
```

### 自定义主题

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function ThemeDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>深色抽屉</Button>
      <Drawer
        title="深色主题"
        theme="dark"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>这是深色主题的抽屉。</p>
      </Drawer>
    </>
  );
}
```

## API

### DrawerProps

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| config | `DrawerConfig` | - | 抽屉配置 |
| visible | `boolean` | - | 可见性控制 |
| defaultVisible | `boolean` | `false` | 默认可见性 |
| direction | `DrawerDirection` | `right` | 方向，可选值：`left`、`right`、`top`、`bottom` |
| theme | `DrawerTheme` | `light` | 主题，可选值：`light`、`dark`、`primary` |
| title | `string` | - | 标题 |
| children | `React.ReactNode` | - | 内容 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| maskClosable | `boolean` | `true` | 点击遮罩层是否关闭 |
| width | `number \| string` | `320px` | 抽屉宽度（左右方向时） |
| height | `number \| string` | `320px` | 抽屉高度（上下方向时） |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| contentClassName | `string` | - | 自定义内容类名 |
| contentStyle | `React.CSSProperties` | - | 自定义内容样式 |
| titleClassName | `string` | - | 自定义标题类名 |
| titleStyle | `React.CSSProperties` | - | 自定义标题样式 |
| maskClassName | `string` | - | 自定义遮罩层类名 |
| maskStyle | `React.CSSProperties` | - | 自定义遮罩层样式 |
| onClose | `() => void` | - | 关闭回调 |
| onOpen | `() => void` | - | 打开回调 |
| onMaskClick | `() => void` | - | 点击遮罩回调 |
| animationDuration | `number` | `300` | 动画持续时间（毫秒） |
| showAnimation | `boolean` | `true` | 是否显示动画 |
| disabled | `boolean` | `false` | 是否禁用 |
| showMask | `boolean` | `true` | 是否显示遮罩层 |

### DrawerDirection

抽屉方向，可选值：
- `left`：从左侧滑出
- `right`：从右侧滑出
- `top`：从顶部滑出
- `bottom`：从底部滑出

### DrawerTheme

抽屉主题，可选值：
- `light`：浅色主题
- `dark`：深色主题
- `primary`：主色调主题

### DrawerConfig

抽屉配置：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | `string` | - | 标题 |
| direction | `DrawerDirection` | `right` | 方向 |
| theme | `DrawerTheme` | `light` | 主题 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| maskClosable | `boolean` | `true` | 点击遮罩层是否关闭 |
| width | `number \| string` | `320px` | 抽屉宽度 |
| height | `number \| string` | `320px` | 抽屉高度 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

## 示例代码

### 底部抽屉

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function BottomDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>从底部打开抽屉</Button>
      <Drawer
        title="底部抽屉"
        direction="bottom"
        height="50%"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>这是从底部滑出的抽屉，高度占屏幕的 50%。</p>
      </Drawer>
    </>
  );
}
```

### 无遮罩抽屉

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function NoMaskDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>打开无遮罩抽屉</Button>
      <Drawer
        title="无遮罩抽屉"
        visible={visible}
        onClose={() => setVisible(false)}
        showMask={false}
      >
        <p>这是没有遮罩层的抽屉。</p>
      </Drawer>
    </>
  );
}
```

### 不可关闭的抽屉

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@taro-uno/ui';

function NotClosableDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>打开不可关闭的抽屉</Button>
      <Drawer
        title="不可关闭的抽屉"
        visible={visible}
        onClose={() => setVisible(false)}
        showClose={false}
        maskClosable={false}
      >
        <p>这个抽屉没有关闭按钮，点击遮罩层也不会关闭，只能通过代码控制关闭。</p>
        <Button type="primary" onClick={() => setVisible(false)}>关闭抽屉</Button>
      </Drawer>
    </>
  );
}
```

## 注意事项

1. 抽屉默认点击遮罩层会关闭，可通过 `maskClosable` 属性控制
2. 抽屉支持自定义方向、主题、宽度、高度等属性
3. 抽屉支持手动控制可见性，通过 `visible` 属性
4. 抽屉支持自定义样式，可通过 `style` 和 `className` 属性
5. 抽屉支持自定义动画，可通过 `animationDuration` 和 `showAnimation` 属性控制
6. 抽屉支持多种方向，包括左右上下四个方向
7. 抽屉支持不同主题，包括浅色、深色和主色调主题
8. 抽屉可以不显示遮罩层，通过 `showMask` 属性控制
9. 抽屉可以不显示关闭按钮，通过 `showClose` 属性控制
