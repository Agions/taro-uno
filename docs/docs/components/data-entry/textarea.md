# Textarea 组件

Textarea 组件是一个多行文本输入框组件，用于接收用户输入的多行文本信息，支持自动高度、计数、清除按钮等功能。

## 基本使用

### 基础文本域

```tsx
<Textarea placeholder="请输入内容" />
```

### 带清除按钮

```tsx
<Textarea placeholder="带清除按钮" clearable />
```

### 带计数

```tsx
<Textarea 
  placeholder="带计数" 
  maxLength={100} 
  showCount 
/>
```

### 自动高度

```tsx
<Textarea 
  placeholder="自动高度" 
  autoHeight 
/>
```

### 固定高度

```tsx
<Textarea 
  placeholder="固定高度" 
  rows={4} 
/>
```

### 禁用状态

```tsx
<Textarea placeholder="禁用状态" disabled />
```

### 只读状态

```tsx
<Textarea placeholder="只读状态" readOnly value="只读内容" />
```

### 受控模式

```tsx
<Textarea 
  placeholder="受控模式" 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `string` | - | 文本域的值（受控模式） |
| defaultValue | `string` | - | 文本域的默认值（非受控模式） |
| placeholder | `string` | - | 占位文本 |
| placeholderStyle | `React.CSSProperties` | - | 占位文本样式 |
| rows | `number` | 2 | 行数 |
| maxLength | `number` | - | 最大输入长度 |
| autoHeight | `boolean` | `false` | 是否自动高度 |
| showCount | `boolean` | `false` | 是否显示计数 |
| clearable | `boolean` | `false` | 是否显示清除按钮 |
| disabled | `boolean` | `false` | 是否禁用 |
| readOnly | `boolean` | `false` | 是否只读 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onFocus | `(e: any) => void` | - | 聚焦回调 |
| onBlur | `(e: any) => void` | - | 失焦回调 |
| onChange | `(e: any) => void` | - | 输入变化回调 |
| onClear | `() => void` | - | 清除按钮点击回调 |
| onInput | `(e: any) => void` | - | 输入事件回调 |
| onKeyDown | `(e: any) => void` | - | 键盘按下回调 |
| onKeyUp | `(e: any) => void` | - | 键盘抬起回调 |
| onLineChange | `(e: any) => void` | - | 行数变化回调 |

## 类型定义

```tsx
// Textarea 组件属性接口
export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  placeholderStyle?: React.CSSProperties;
  rows?: number;
  maxLength?: number;
  autoHeight?: boolean;
  showCount?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
  onClear?: () => void;
  onInput?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  onLineChange?: (e: any) => void;
}
```

## 示例代码

### 完整示例

```tsx
import { Textarea, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const TextareaExample = () => {
  // 受控模式状态
  const [value, setValue] = useState('');

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础文本域</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Textarea placeholder="请输入内容" />
        <Textarea placeholder="带清除按钮" clearable />
        <Textarea placeholder="禁用状态" disabled />
        <Textarea placeholder="只读状态" readOnly value="只读内容" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带计数</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Textarea 
          placeholder="带计数" 
          maxLength={100} 
          showCount 
        />
        <Textarea 
          placeholder="带计数和清除按钮" 
          maxLength={100} 
          showCount 
          clearable 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>高度设置</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Textarea 
          placeholder="自动高度" 
          autoHeight 
        />
        <Textarea 
          placeholder="固定高度 - 3行" 
          rows={3} 
        />
        <Textarea 
          placeholder="固定高度 - 5行" 
          rows={5} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Textarea 
          placeholder="受控模式" 
          value={value} 
          onChange={(e) => setValue(e.detail.value)} 
          clearable 
          showCount 
          maxLength={100} 
        />
        <Button 
          type="primary" 
          onClick={() => setValue('')} 
        >
          清空输入
        </Button>
        <Button 
          type="default" 
          onClick={() => setValue('这是一段预设的多行文本内容\n\n这是第二行\n这是第三行')} 
        >
          设置预设内容
        </Button>
      </Space>
    </View>
  );
};

export default TextareaExample;
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

1. **多行输入**：用于需要用户输入较多文本的场景，如评论、描述、反馈等。
2. **自动高度**：设置 autoHeight 为 true 时，文本域会根据内容自动调整高度。
3. **计数功能**：设置 showCount 和 maxLength 属性时，文本域会显示字符计数。
4. **清除按钮**：设置 clearable 为 true 时，文本域会显示清除按钮，点击可清空输入内容。
5. **受控模式**：推荐使用受控模式，通过 value 和 onChange 属性来控制文本域的值。
6. **性能优化**：文本域组件使用了 memo 优化，避免不必要的重渲染。
7. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Input 组件](#/components/form/input) - 用于单行文本输入
- [Select 组件](#/components/form/select) - 用于选择列表项
- [Switch 组件](#/components/form/switch) - 用于开关切换
- [Checkbox 组件](#/components/form/checkbox) - 用于多选操作
- [Radio 组件](#/components/form/radio) - 用于单选操作
