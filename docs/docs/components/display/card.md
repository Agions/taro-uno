# Card 组件

Card 组件是一个常用的容器组件，用于展示结构化的信息，支持封面、标题、副标题、操作区域、操作按钮等功能。

## 基本使用

### 基础卡片

```tsx
<Card>
  <View style={{ padding: '16px' }}>
    这是一张基础卡片
  </View>
</Card>
```

### 带封面的卡片

```tsx
<Card
  cover={
    <Image
      src="https://example.com/cover.jpg"
      mode="aspectFill"
      style={{ width: '100%', height: '200px' }}
    />
  }
>
  <View style={{ padding: '16px' }}>
    <Text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>带封面的卡片</Text>
    <Text>这是一张带有封面图片的卡片</Text>
  </View>
</Card>
```

### 带标题和副标题的卡片

```tsx
<Card
  title="卡片标题"
  subtitle="卡片副标题"
>
  <View style={{ padding: '16px' }}>
    <Text>这是一张带有标题和副标题的卡片</Text>
  </View>
</Card>
```

### 带操作区域的卡片

```tsx
<Card
  title="带操作区域的卡片"
  extra={<Button type="text">操作</Button>}
>
  <View style={{ padding: '16px' }}>
    <Text>这是一张带有操作区域的卡片</Text>
  </View>
</Card>
```

### 带操作按钮的卡片

```tsx
<Card
  title="带操作按钮的卡片"
  actions={[
    <Button key="1" type="primary">确定</Button>,
    <Button key="2" type="default">取消</Button>
  ]}
>
  <View style={{ padding: '16px' }}>
    <Text>这是一张带有操作按钮的卡片</Text>
  </View>
</Card>
```

### 可点击的卡片

```tsx
<Card
  hoverable
  title="可点击的卡片"
  onPress={() => console.log('卡片被点击了')}
>
  <View style={{ padding: '16px' }}>
    <Text>这是一张可点击的卡片，鼠标悬停时有效果</Text>
  </View>
</Card>
```

### 不同阴影级别的卡片

```tsx
<Space direction="vertical" style={{ width: '100%' }}>
  <Card title="无阴影卡片" shadow="none">
    <View style={{ padding: '16px' }}>
      <Text>这是一张无阴影的卡片</Text>
    </View>
  </Card>
  <Card title="小阴影卡片" shadow="small">
    <View style={{ padding: '16px' }}>
      <Text>这是一张小阴影的卡片</Text>
    </View>
  </Card>
  <Card title="默认阴影卡片" shadow="default">
    <View style={{ padding: '16px' }}>
      <Text>这是一张默认阴影的卡片</Text>
    </View>
  </Card>
  <Card title="大阴影卡片" shadow="large">
    <View style={{ padding: '16px' }}>
      <Text>这是一张大阴影的卡片</Text>
    </View>
  </Card>
</Space>
```

### 无边框卡片

```tsx
<Card bordered={false} title="无边框卡片">
  <View style={{ padding: '16px' }}>
    <Text>这是一张无边框的卡片</Text>
  </View>
</Card>
```

### 加载状态的卡片

```tsx
<Card loading title="加载中的卡片">
  <View style={{ padding: '16px' }}>
    <Text>这是一张加载中的卡片</Text>
  </View>
</Card>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 卡片内容 |
| title | `React.ReactNode` | - | 卡片标题 |
| subtitle | `React.ReactNode` | - | 卡片副标题 |
| extra | `React.ReactNode` | - | 卡片操作区域 |
| cover | `React.ReactNode` | - | 卡片封面 |
| actions | `React.ReactNode[]` | `[]` | 卡片操作按钮 |
| hoverable | `boolean` | `false` | 是否可点击 |
| bordered | `boolean` | `true` | 是否显示边框 |
| shadow | `'none' \| 'small' \| 'default' \| 'large'` | `'default'` | 阴影级别 |
| loading | `boolean` | `false` | 加载状态 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onPress | `(_event: React.MouseEvent \| any) => void` | - | 点击事件 |
| onLongPress | `(_event: React.MouseEvent \| any) => void` | - | 长按事件 |

## 类型定义

### CardProps

```tsx
export interface CardProps {
  children: React.ReactNode;           // 卡片内容
  title?: React.ReactNode;             // 卡片标题
  subtitle?: React.ReactNode;          // 卡片副标题
  extra?: React.ReactNode;             // 卡片操作区域
  cover?: React.ReactNode;             // 卡片封面
  actions?: React.ReactNode[];         // 卡片操作按钮
  hoverable?: boolean;                 // 是否可点击
  bordered?: boolean;                 // 是否显示边框
  shadow?: 'none' | 'small' | 'default' | 'large'; // 阴影级别
  loading?: boolean;                  // 加载状态
  className?: string;                 // 自定义类名
  style?: React.CSSProperties;        // 自定义样式
  onPress?: (_event: React.MouseEvent | any) => void; // 点击事件
  onLongPress?: (_event: React.MouseEvent | any) => void; // 长按事件
}
```

### CardRef

```tsx
export interface CardRef {
  getElement: () => HTMLElement | null; // 获取卡片元素
  getTitle: () => string | null;        // 获取卡片标题
  getContent: () => HTMLElement | null; // 获取卡片内容
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onPress | 卡片点击事件 | `_event: React.MouseEvent \| any` |
| onLongPress | 卡片长按事件 | `_event: React.MouseEvent \| any` |

## 示例代码

### 完整示例

```tsx
import { Card, Button, Image, Space, View, Text } from 'taro-uno-ui';

const CardExample = () => {
  return (
    <View style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>基础卡片</Text>
      <Card>
        <View style={{ padding: '16px' }}>
          <Text>这是一张基础卡片</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>带封面的卡片</Text>
      <Card
        cover={
          <Image
            src="https://example.com/cover.jpg"
            mode="aspectFill"
            style={{ width: '100%', height: '200px' }}
          />
        }
      >
        <View style={{ padding: '16px' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>带封面的卡片</Text>
          <Text>这是一张带有封面图片的卡片</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>带标题和副标题的卡片</Text>
      <Card
        title="卡片标题"
        subtitle="卡片副标题"
      >
        <View style={{ padding: '16px' }}>
          <Text>这是一张带有标题和副标题的卡片</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>带操作区域的卡片</Text>
      <Card
        title="带操作区域的卡片"
        extra={<Button type="text">操作</Button>}
      >
        <View style={{ padding: '16px' }}>
          <Text>这是一张带有操作区域的卡片</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>带操作按钮的卡片</Text>
      <Card
        title="带操作按钮的卡片"
        actions={[
          <Button key="1" type="primary">确定</Button>,
          <Button key="2" type="default">取消</Button>
        ]}
      >
        <View style={{ padding: '16px' }}>
          <Text>这是一张带有操作按钮的卡片</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>可点击的卡片</Text>
      <Card
        hoverable
        title="可点击的卡片"
        onPress={() => console.log('卡片被点击了')}
      >
        <View style={{ padding: '16px' }}>
          <Text>这是一张可点击的卡片，鼠标悬停时有效果</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>不同阴影级别的卡片</Text>
      <Space direction="vertical" style={{ width: '100%', gap: '16px' }}>
        <Card title="无阴影卡片" shadow="none">
          <View style={{ padding: '16px' }}>
            <Text>这是一张无阴影的卡片</Text>
          </View>
        </Card>
        <Card title="小阴影卡片" shadow="small">
          <View style={{ padding: '16px' }}>
            <Text>这是一张小阴影的卡片</Text>
          </View>
        </Card>
        <Card title="默认阴影卡片" shadow="default">
          <View style={{ padding: '16px' }}>
            <Text>这是一张默认阴影的卡片</Text>
          </View>
        </Card>
        <Card title="大阴影卡片" shadow="large">
          <View style={{ padding: '16px' }}>
            <Text>这是一张大阴影的卡片</Text>
          </View>
        </Card>
      </Space>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>无边框卡片</Text>
      <Card bordered={false} title="无边框卡片">
        <View style={{ padding: '16px' }}>
          <Text>这是一张无边框的卡片</Text>
        </View>
      </Card>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>加载状态的卡片</Text>
      <Card loading title="加载中的卡片">
        <View style={{ padding: '16px' }}>
          <Text>这是一张加载中的卡片</Text>
        </View>
      </Card>
    </View>
  );
};

export default CardExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分样式可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分样式可能存在差异 |

## 注意事项

1. **封面图片**：封面图片建议使用合适的尺寸，以确保卡片的美观性。
2. **操作按钮**：操作按钮数量建议不超过3个，过多的按钮会影响卡片的美观性。
3. **阴影级别**：根据场景选择合适的阴影级别，默认阴影级别适用于大多数场景。
4. **可点击卡片**：设置 `hoverable` 为 `true` 时，卡片会显示悬停效果，同时可以绑定 `onPress` 事件。
5. **加载状态**：设置 `loading` 为 `true` 时，卡片内容会被替换为加载骨架屏。

## 相关组件

- [Button 组件](#/components/basic/button) - 用于卡片的操作按钮
- [Image 组件](#/components/basic/image) - 用于卡片的封面图片
- [Space 组件](#/components/layout/space) - 用于卡片之间的间距控制