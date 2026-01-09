# Checkbox 组件

Checkbox 组件是一个复选框组件，用于在多个选项中进行多选操作，支持自定义大小、颜色、禁用状态等功能，同时支持 CheckboxGroup 组件进行分组管理。

## 基本使用

### 基础复选框

```tsx
<Checkbox />
```

### 带文本

```tsx
<Checkbox>选项</Checkbox>
```

### 受控模式

```tsx
<Checkbox 
  checked={checked} 
  onChange={(e) => setChecked(e.detail.checked)} 
>选项</Checkbox>
```

### 禁用状态

```tsx
<Checkbox disabled />选项
<Checkbox disabled checked />选项
```

### 不同颜色

```tsx
<Checkbox color="primary" />选项
<Checkbox color="success" />选项
<Checkbox color="warning" />选项
<Checkbox color="error" />选项
<Checkbox color="#ff6b6b" />选项
```

### 复选框组

```tsx
<CheckboxGroup 
  value={checkedList} 
  onChange={(e) => setCheckedList(e.detail.value)} 
>
  <Checkbox value="option1">选项1</Checkbox>
  <Checkbox value="option2">选项2</Checkbox>
  <Checkbox value="option3">选项3</Checkbox>
</CheckboxGroup>
```

### 全选/反选

```tsx
<Checkbox 
  checked={isAllChecked} 
  onChange={(e) => {
    setIsAllChecked(e.detail.checked);
    setCheckedList(e.detail.checked ? ['option1', 'option2', 'option3'] : []);
  }} 
>全选</Checkbox>
<CheckboxGroup 
  value={checkedList} 
  onChange={(e) => {
    setCheckedList(e.detail.value);
    setIsAllChecked(e.detail.value.length === 3);
  }} 
>
  <Checkbox value="option1">选项1</Checkbox>
  <Checkbox value="option2">选项2</Checkbox>
  <Checkbox value="option3">选项3</Checkbox>
</CheckboxGroup>
```

## 属性说明

### Checkbox 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | 复选框是否选中（受控模式） |
| defaultChecked | `boolean` | `false` | 复选框默认是否选中（非受控模式） |
| value | `any` | - | 复选框的值，用于 CheckboxGroup |
| disabled | `boolean` | `false` | 是否禁用 |
| color | `string` | `primary` | 复选框颜色，可选值：`primary`、`success`、`warning`、`error` 或自定义颜色值 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { checked: boolean } }) => void` | - | 复选框状态变化回调 |
| onClick | `() => void` | - | 点击复选框回调 |

### CheckboxGroup 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `any[]` | `[]` | 选中的值（受控模式） |
| defaultValue | `any[]` | `[]` | 默认选中的值（非受控模式） |
| disabled | `boolean` | `false` | 是否禁用所有子复选框 |
| color | `string` | `primary` | 所有子复选框的颜色 |
| direction | `string` | `vertical` | 子复选框的排列方向，可选值：`vertical`、`horizontal` |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: any[] } }) => void` | - | 选中值变化回调 |

## 类型定义

```tsx
// Checkbox 组件属性接口
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: any;
  disabled?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { checked: boolean } }) => void;
  onClick?: () => void;
}

// CheckboxGroup 组件属性接口
export interface CheckboxGroupProps {
  value?: any[];
  defaultValue?: any[];
  disabled?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { value: any[] } }) => void;
}
```

## 示例代码

### 完整示例

```tsx
import { Checkbox, CheckboxGroup, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const CheckboxExample = () => {
  // 受控模式状态
  const [checked, setChecked] = useState(false);
  // 复选框组状态
  const [checkedList, setCheckedList] = useState<string[]>(['option1']);
  // 全选状态
  const [isAllChecked, setIsAllChecked] = useState(false);
  // 复杂数据状态
  const [complexChecked, setComplexChecked] = useState<any[]>(['1']);
  
  const complexOptions = [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' },
    { label: '选项4', value: '4' },
    { label: '选项5', value: '5' }
  ];

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础复选框</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Checkbox>基础选项</Checkbox>
        <Checkbox defaultChecked>默认选中</Checkbox>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Checkbox 
            checked={checked} 
            onChange={(e) => setChecked(e.detail.checked)} 
          >受控选项</Checkbox>
          <Text>{checked ? '已选中' : '未选中'}</Text>
        </Space>
        <Button 
          type="primary" 
          onClick={() => setChecked(!checked)} 
        >
          {checked ? '取消选中' : '选中'}
        </Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Checkbox disabled>禁用选项</Checkbox>
        <Checkbox disabled checked>禁用已选中</Checkbox>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Checkbox color="primary">主要颜色</Checkbox>
        <Checkbox color="success">成功颜色</Checkbox>
        <Checkbox color="warning">警告颜色</Checkbox>
        <Checkbox color="error">错误颜色</Checkbox>
        <Checkbox color="#ff6b6b">自定义颜色</Checkbox>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>复选框组</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Text>垂直排列（默认）：</Text>
        <CheckboxGroup 
          value={checkedList} 
          onChange={(e) => setCheckedList(e.detail.value)} 
        >
          <Checkbox value="option1">选项1</Checkbox>
          <Checkbox value="option2">选项2</Checkbox>
          <Checkbox value="option3">选项3</Checkbox>
          <Checkbox value="option4" disabled>选项4（禁用）</Checkbox>
        </CheckboxGroup>
        
        <Text style={{ marginTop: '12px' }}>水平排列：</Text>
        <CheckboxGroup 
          value={checkedList} 
          onChange={(e) => setCheckedList(e.detail.value)} 
          direction="horizontal" 
        >
          <Checkbox value="option1">选项1</Checkbox>
          <Checkbox value="option2">选项2</Checkbox>
          <Checkbox value="option3">选项3</Checkbox>
        </CheckboxGroup>
        
        <Text style={{ marginTop: '12px' }}>选中项：{checkedList.join(', ')}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>全选/反选</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Checkbox 
          checked={isAllChecked} 
          onChange={(e) => {
            setIsAllChecked(e.detail.checked);
            setCheckedList(e.detail.checked ? ['option1', 'option2', 'option3'] : []);
          }} 
        >全选</Checkbox>
        <CheckboxGroup 
          value={checkedList} 
          onChange={(e) => {
            setCheckedList(e.detail.value);
            setIsAllChecked(e.detail.value.length === 3);
          }} 
          direction="horizontal" 
        >
          <Checkbox value="option1">选项1</Checkbox>
          <Checkbox value="option2">选项2</Checkbox>
          <Checkbox value="option3">选项3</Checkbox>
        </CheckboxGroup>
        <Text>选中项：{checkedList.join(', ')}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>复杂数据</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <CheckboxGroup 
          value={complexChecked} 
          onChange={(e) => setComplexChecked(e.detail.value)} 
        >
          {complexOptions.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Text>选中项：{complexChecked.map(v => complexOptions.find(opt => opt.value === v)?.label).join(', ')}</Text>
      </Space>
    </View>
  );
};

export default CheckboxExample;
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

1. **复选框状态**：复选框组件有选中和未选中两种状态，通过 checked 属性控制。
2. **受控模式**：推荐使用受控模式，通过 checked 和 onChange 属性来控制复选框的状态。
3. **复选框组**：使用 CheckboxGroup 组件可以方便地管理一组复选框的状态，通过 value 和 onChange 属性来控制选中的值。
4. **排列方向**：CheckboxGroup 组件支持垂直和水平两种排列方向，通过 direction 属性控制。
5. **全选功能**：可以通过监听 CheckboxGroup 的 onChange 事件来实现全选/反选功能。
6. **禁用状态**：设置 disabled 为 true 时，复选框不可点击，样式会变为灰色。
7. **颜色配置**：支持内置颜色和自定义颜色值，可以根据主题需求灵活配置。
8. **性能优化**：复选框组件使用了 memo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [CheckboxGroup 组件](#/components/form/checkbox) - 用于分组管理复选框
- [Radio 组件](#/components/form/radio) - 用于单选操作
- [Switch 组件](#/components/form/switch) - 用于开关切换
- [Form 组件](#/components/form/form) - 用于表单管理
