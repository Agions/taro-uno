# Radio 组件

Radio 组件是一个单选框组件，用于在多个选项中进行单选操作，支持自定义大小、颜色、禁用状态等功能，同时支持 RadioGroup 组件进行分组管理。

## 基本使用

### 基础单选框

```tsx
<Radio />
```

### 带文本

```tsx
<Radio>选项</Radio>
```

### 受控模式

```tsx
<Radio 
  checked={checked} 
  onChange={(e) => setChecked(e.detail.checked)} 
>选项</Radio>
```

### 禁用状态

```tsx
<Radio disabled />选项
<Radio disabled checked />选项
```

### 不同颜色

```tsx
<Radio color="primary" />选项
<Radio color="success" />选项
<Radio color="warning" />选项
<Radio color="error" />选项
<Radio color="#ff6b6b" />选项
```

### 单选框组

```tsx
<RadioGroup 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
>
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
  <Radio value="option3">选项3</Radio>
</RadioGroup>
```

### 水平排列

```tsx
<RadioGroup 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
  direction="horizontal" 
>
  <Radio value="option1">选项1</Radio>
  <Radio value="option2">选项2</Radio>
  <Radio value="option3">选项3</Radio>
</RadioGroup>
```

## 属性说明

### Radio 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | 单选框是否选中（受控模式） |
| defaultChecked | `boolean` | `false` | 单选框默认是否选中（非受控模式） |
| value | `any` | - | 单选框的值，用于 RadioGroup |
| disabled | `boolean` | `false` | 是否禁用 |
| color | `string` | `primary` | 单选框颜色，可选值：`primary`、`success`、`warning`、`error` 或自定义颜色值 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { checked: boolean } }) => void` | - | 单选框状态变化回调 |
| onClick | `() => void` | - | 点击单选框回调 |

### RadioGroup 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `any` | - | 选中的值（受控模式） |
| defaultValue | `any` | - | 默认选中的值（非受控模式） |
| disabled | `boolean` | `false` | 是否禁用所有子单选框 |
| color | `string` | `primary` | 所有子单选框的颜色 |
| direction | `string` | `vertical` | 子单选框的排列方向，可选值：`vertical`、`horizontal` |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: any } }) => void` | - | 选中值变化回调 |

## 类型定义

```tsx
// Radio 组件属性接口
export interface RadioProps {
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

// RadioGroup 组件属性接口
export interface RadioGroupProps {
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { value: any } }) => void;
}
```

## 示例代码

### 完整示例

```tsx
import { Radio, RadioGroup, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const RadioExample = () => {
  // 受控模式状态
  const [checked, setChecked] = useState(false);
  // 单选框组状态
  const [value, setValue] = useState('option1');
  // 复杂数据状态
  const [complexValue, setComplexValue] = useState('1');
  
  const complexOptions = [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' },
    { label: '选项4', value: '4' },
    { label: '选项5', value: '5' }
  ];

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础单选框</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Radio>基础选项</Radio>
        <Radio defaultChecked>默认选中</Radio>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Radio 
            checked={checked} 
            onChange={(e) => setChecked(e.detail.checked)} 
          >受控选项</Radio>
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
        <Radio disabled>禁用选项</Radio>
        <Radio disabled checked>禁用已选中</Radio>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Radio color="primary">主要颜色</Radio>
        <Radio color="success">成功颜色</Radio>
        <Radio color="warning">警告颜色</Radio>
        <Radio color="error">错误颜色</Radio>
        <Radio color="#ff6b6b">自定义颜色</Radio>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>单选框组</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Text>垂直排列（默认）：</Text>
        <RadioGroup 
          value={value} 
          onChange={(e) => setValue(e.detail.value)} 
        >
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
          <Radio value="option3">选项3</Radio>
          <Radio value="option4" disabled>选项4（禁用）</Radio>
        </RadioGroup>
        
        <Text style={{ marginTop: '12px' }}>水平排列：</Text>
        <RadioGroup 
          value={value} 
          onChange={(e) => setValue(e.detail.value)} 
          direction="horizontal" 
        >
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
          <Radio value="option3">选项3</Radio>
        </RadioGroup>
        
        <Text style={{ marginTop: '12px' }}>选中项：{value}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>复杂数据</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <RadioGroup 
          value={complexValue} 
          onChange={(e) => setComplexValue(e.detail.value)} 
        >
          {complexOptions.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
        <Text>选中项：{complexOptions.find(opt => opt.value === complexValue)?.label}</Text>