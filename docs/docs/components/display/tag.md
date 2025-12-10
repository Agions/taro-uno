# Tag 组件

Tag 组件是一个标签组件，用于标记和分类内容，支持多种样式、颜色、大小、可关闭等功能。

## 基本使用

### 基础标签

```tsx
<Tag>标签</Tag>
```

### 不同颜色

```tsx
<Tag color="primary">主要标签</Tag>
<Tag color="success">成功标签</Tag>
<Tag color="warning">警告标签</Tag>
<Tag color="error">错误标签</Tag>
<Tag color="info">信息标签</Tag>
```

### 不同类型

```tsx
<Tag>默认标签</Tag>
<Tag type="outline">轮廓标签</Tag>
<Tag type="light">浅色标签</Tag>
<Tag type="ghost">幽灵标签</Tag>
```

### 可关闭标签

```tsx
<Tag 
  closable 
  onClose={() => console.log('标签已关闭')} 
>
  可关闭标签
</Tag>
```

### 不同大小

```tsx
<Tag size="small">小标签</Tag>
<Tag size="medium">中标签</Tag>
<Tag size="large">大标签</Tag>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 标签内容 |
| color | `string` | `default` | 标签颜色，可选值：`default`、`primary`、`success`、`warning`、`error`、`info` 或自定义颜色值 |
| type | `string` | `default` | 标签类型，可选值：`default`、`outline`、`light`、`ghost` |
| size | `string` | `medium` | 标签大小，可选值：`small`、`medium`、`large` |
| closable | `boolean` | `false` | 是否可关闭 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onClose | `() => void` | - | 关闭事件处理函数 |
| onClick | `() => void` | - | 点击事件处理函数 |

## 类型定义

```tsx
// Tag 组件属性接口
export interface TagProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | string;
  type?: 'default' | 'outline' | 'light' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onClick?: () => void;
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onClose | 标签关闭时触发 | - |
| onClick | 标签点击时触发 | - |

## 示例代码

### 完整示例

```tsx
import { Tag, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const TagExample = () => {
  // 标签列表
  const [tags, setTags] = useState<string[]>(['标签1', '标签2', '标签3', '标签4', '标签5']);

  // 处理标签关闭
  const handleClose = (tag: string) => {
    console.log('关闭标签:', tag);
    setTags(tags.filter(t => t !== tag));
  };

  // 处理标签点击
  const handleClick = (tag: string) => {
    console.log('点击标签:', tag);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tag>默认标签</Tag>
        <Tag color="primary">主要标签</Tag>
        <Tag color="success">成功标签</Tag>
        <Tag color="warning">警告标签</Tag>
        <Tag color="error">错误标签</Tag>
        <Tag color="info">信息标签</Tag>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同类型标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tag color="primary">默认类型</Tag>
        <Tag color="primary" type="outline">轮廓类型</Tag>
        <Tag color="primary" type="light">浅色类型</Tag>
        <Tag color="primary" type="ghost">幽灵类型</Tag>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同大小标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tag size="small" color="primary">小标签</Tag>
        <Tag size="medium" color="primary">中标签</Tag>
        <Tag size="large" color="primary">大标签</Tag>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>可关闭标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            color={['primary', 'success', 'warning', 'error', 'info'][Math.floor(Math.random() * 5)]}
            closable
            onClick={() => handleClick(tag)}
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tag disabled>禁用标签</Tag>
        <Tag disabled color="primary" type="outline">禁用轮廓标签</Tag>
        <Tag disabled closable>禁用可关闭标签</Tag>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义颜色标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tag color="#ff6b6b">自定义红色</Tag>
        <Tag color="#4ecdc4">自定义青色</Tag>
        <Tag color="#45b7d1">自定义蓝色</Tag>
        <Tag color="#96ceb4">自定义绿色</Tag>
        <Tag color="#ffeaa7">自定义黄色</Tag>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带图标的标签</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tag color="primary">
          <Icon name="star" style={{ marginRight: '4px' }} /> 带图标标签
        </Tag>
        <Tag color="success">
          <Icon name="check" style={{ marginRight: '4px' }} /> 成功标签
        </Tag>
        <Tag color="warning">
          <Icon name="warning" style={{ marginRight: '4px' }} /> 警告标签
        </Tag>
      </Space>
    </View>
  );
};

export default TagExample;
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

1. **颜色类型**：支持内置颜色（primary、success、warning、error、info）和自定义颜色值。
2. **标签类型**：支持 default、outline、light、ghost 四种类型，适应不同的设计需求。
3. **可关闭功能**：设置 closable 为 true 时，标签会显示关闭按钮，点击可触发 onClose 事件。
4. **禁用状态**：设置 disabled 为 true 时，标签会显示禁用状态，不可点击，也不可关闭。
5. **自定义样式**：可通过 className 和 style 属性自定义标签的样式。
6. **性能优化**：标签组件使用了 memo 优化，避免不必要的重渲染。
7. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Space 组件](#/components/layout/space) - 用于标签布局
- [List 组件](#/components/display/list) - 可与标签结合使用
- [Form 组件](#/components/form/form) - 用于表单场景