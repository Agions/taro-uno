# List 组件

List 组件是一个列表组件，用于展示一组相关的数据项，支持多种列表样式、分割线、操作区、多选、单选等功能。

## 基本使用

### 基础列表

```tsx
<List>
  <List.Item>列表项 1</List.Item>
  <List.Item>列表项 2</List.Item>
  <List.Item>列表项 3</List.Item>
</List>
```

### 带图标的列表

```tsx
<List>
  <List.Item icon={<Icon name="home" />}>首页</List.Item>
  <List.Item icon={<Icon name="user" />}>个人中心</List.Item>
  <List.Item icon={<Icon name="setting" />}>设置</List.Item>
  <List.Item icon={<Icon name="message" />}>消息</List.Item>
</List>
```

### 带描述的列表

```tsx
<List>
  <List.Item title="商品名称" description="这是一个详细的商品描述" />
  <List.Item title="商品价格" description="¥199.00" />
  <List.Item title="商品数量" description="100件" />
</List>
```

### 带操作区的列表

```tsx
<List>
  <List.Item 
    title="商品名称" 
    description="这是一个详细的商品描述" 
    extra="查看详情"
  />
  <List.Item 
    title="商品价格" 
    description="¥199.00" 
    extra={<Button type="text" size="sm">编辑</Button>}
  />
</List>
```

### 带分割线的列表

```tsx
<List split>
  <List.Item>列表项 1</List.Item>
  <List.Item>列表项 2</List.Item>
  <List.Item>列表项 3</List.Item>
</List>
```

### 多选列表

```tsx
<List
  selectable
  multiple
  selectedKeys={['1', '3']}
  onSelectChange={(keys) => console.log('选中的项:', keys)}
>
  <List.Item key="1">选项 1</List.Item>
  <List.Item key="2">选项 2</List.Item>
  <List.Item key="3">选项 3</List.Item>
  <List.Item key="4">选项 4</List.Item>
</List>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 列表项内容 |
| split | `boolean` | `false` | 是否显示分割线 |
| selectable | `boolean` | `false` | 是否可选择 |
| multiple | `boolean` | `false` | 是否支持多选 |
| selectedKeys | `string[]` | `[]` | 选中的项的键 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onSelectChange | `(keys: string[]) => void` | - | 选中项变化时触发 |

## List.Item 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 列表项内容 |
| title | `React.ReactNode` | - | 列表项标题 |
| description | `React.ReactNode` | - | 列表项描述 |
| extra | `React.ReactNode` | - | 列表项操作区 |
| icon | `React.ReactNode` | - | 列表项图标 |
| key | `string \| number` | - | 列表项的键 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onClick | `(_event: React.MouseEvent) => void` | - | 点击事件处理函数 |

## 类型定义

```tsx
// List 组件属性接口
export interface ListProps {
  children?: React.ReactNode;
  split?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  selectedKeys?: string[];
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelectChange?: (keys: string[]) => void;
}

// List.Item 组件属性接口
export interface ListItemProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
  key?: string | number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (_event: React.MouseEvent) => void;
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onSelectChange | 选中项变化时触发 | `keys: string[]` - 选中的项的键 |
| onClick | 列表项点击时触发 | `_event: React.MouseEvent` - 点击事件对象 |

## 示例代码

### 完整示例

```tsx
import { List, Icon, Button, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const ListExample = () => {
  const [selectedKeys, setSelectedKeys] = useState(['1', '3']);
  
  const handleSelectChange = (keys: string[]) => {
    console.log('选中的项:', keys);
    setSelectedKeys(keys);
  };
  
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础列表</Text>
      <List style={{ marginBottom: '20px' }}>
        <List.Item>列表项 1</List.Item>
        <List.Item>列表项 2</List.Item>
        <List.Item>列表项 3</List.Item>
      </List>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带图标的列表</Text>
      <List style={{ marginBottom: '20px' }}>
        <List.Item icon={<Icon name="home" />}>首页</List.Item>
        <List.Item icon={<Icon name="user" />}>个人中心</List.Item>
        <List.Item icon={<Icon name="setting" />}>设置</List.Item>
        <List.Item icon={<Icon name="message" />}>消息</List.Item>
      </List>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带描述的列表</Text>
      <List style={{ marginBottom: '20px' }}>
        <List.Item title="商品名称" description="这是一个详细的商品描述" />
        <List.Item title="商品价格" description="¥199.00" />
        <List.Item title="商品数量" description="100件" />
      </List>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带操作区的列表</Text>
      <List style={{ marginBottom: '20px' }}>
        <List.Item 
          title="商品名称" 
          description="这是一个详细的商品描述" 
          extra="查看详情"
        />
        <List.Item 
          title="商品价格" 
          description="¥199.00" 
          extra={<Button type="text" size="sm">编辑</Button>}
        />
      </List>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带分割线的列表</Text>
      <List split style={{ marginBottom: '20px' }}>
        <List.Item>列表项 1</List.Item>
        <List.Item>列表项 2</List.Item>
        <List.Item>列表项 3</List.Item>
      </List>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>多选列表</Text>
      <List
        selectable
        multiple
        selectedKeys={selectedKeys}
        onSelectChange={handleSelectChange}
        style={{ marginBottom: '20px' }}
      >
        <List.Item key="1">选项 1</List.Item>
        <List.Item key="2">选项 2</List.Item>
        <List.Item key="3">选项 3</List.Item>
        <List.Item key="4">选项 4</List.Item>
      </List>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用的列表</Text>
      <List disabled style={{ marginBottom: '20px' }}>
        <List.Item>禁用列表项 1</List.Item>
        <List.Item>禁用列表项 2</List.Item>
        <List.Item>禁用列表项 3</List.Item>
      </List>
    </View>
  );
};

export default ListExample;
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

1. **列表样式**：支持多种列表样式，包括基础列表、带图标的列表、带描述的列表、带操作区的列表等。
2. **分割线**：设置 `split` 为 `true` 时，会显示列表项之间的分割线。
3. **选择功能**：设置 `selectable` 为 `true` 时，列表项可选择，支持单选和多选。
4. **禁用状态**：设置 `disabled` 为 `true` 时，列表项会显示禁用状态，不可点击。
5. **事件处理**：可通过 `onSelectChange` 事件处理选中项的变化，通过 `onClick` 事件处理列表项的点击。
6. **性能优化**：对于大量列表项，建议使用 `key` 属性，以提高渲染性能。
7. **自定义样式**：可通过 `className` 和 `style` 属性自定义列表和列表项的样式。

## 相关组件

- [Icon 组件](#/components/basic/icon) - 用于列表项图标
- [Button 组件](#/components/basic/button) - 用于列表项操作区
- [Space 组件](#/components/layout/space) - 用于列表布局和间距控制