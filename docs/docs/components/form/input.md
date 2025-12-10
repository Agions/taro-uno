# Input 组件

Input 组件是一个输入框组件，用于接收用户输入的文本信息，支持多种类型、样式、验证等功能。

## 基本使用

### 基础输入框

```tsx
<Input placeholder="请输入内容" />
```

### 不同类型

```tsx
<Input type="text" placeholder="文本输入" />
<Input type="password" placeholder="密码输入" />
<Input type="number" placeholder="数字输入" />
<Input type="email" placeholder="邮箱输入" />
<Input type="tel" placeholder="电话输入" />
```

### 带前缀后缀

```tsx
<Input 
  placeholder="带前缀" 
  prefix={<Icon name="user" />} 
/>
<Input 
  placeholder="带后缀" 
  suffix={<Icon name="search" />} 
/>
<Input 
  placeholder="带前后缀" 
  prefix={<Icon name="user" />} 
  suffix={<Icon name="clear" />} 
/>
```

### 带清除按钮

```tsx
<Input placeholder="带清除按钮" clearable />
```

### 带计数

```tsx
<Input 
  placeholder="带计数" 
  maxLength={20} 
  showCount 
/>
```

### 禁用状态

```tsx
<Input placeholder="禁用状态" disabled />
```

### 只读状态

```tsx
<Input placeholder="只读状态" readOnly value="只读内容" />
```

### 受控模式

```tsx
<Input 
  placeholder="受控模式" 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | `text` | 输入框类型，可选值：`text`、`password`、`number`、`email`、`tel` |
| value | `string` | - | 输入框的值（受控模式） |
| defaultValue | `string` | - | 输入框的默认值（非受控模式） |
| placeholder | `string` | - | 占位文本 |
| placeholderStyle | `React.CSSProperties` | - | 占位文本样式 |
| disabled | `boolean` | `false` | 是否禁用 |
| readOnly | `boolean` | `false` | 是否只读 |
| clearable | `boolean` | `false` | 是否显示清除按钮 |
| showCount | `boolean` | `false` | 是否显示计数 |
| maxLength | `number` | - | 最大输入长度 |
| prefix | `React.ReactNode` | - | 前缀图标或元素 |
| suffix | `React.ReactNode` | - | 后缀图标或元素 |
| prefixStyle | `React.CSSProperties` | - | 前缀样式 |
| suffixStyle | `React.CSSProperties` | - | 后缀样式 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onFocus | `(e: any) => void` | - | 聚焦回调 |
| onBlur | `(e: any) => void` | - | 失焦回调 |
| onChange | `(e: any) => void` | - | 输入变化回调 |
| onClear | `() => void` | - | 清除按钮点击回调 |
| onInput | `(e: any) => void` | - | 输入事件回调 |
| onKeyDown | `(e: any) => void` | - | 键盘按下回调 |
| onKeyUp | `(e: any) => void` | - | 键盘抬起回调 |

## 类型定义

```tsx
// Input 组件属性接口
export interface InputProps {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  placeholderStyle?: React.CSSProperties;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  showCount?: boolean;
  maxLength?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixStyle?: React.CSSProperties;
  suffixStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
  onClear?: () => void;
  onInput?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
```

## 示例代码

### 完整示例

```tsx
import { Input, Icon, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const InputExample = () => {
  // 受控模式状态
  const [value, setValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础输入框</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Input placeholder="请输入内容" />
        <Input placeholder="带清除按钮" clearable />
        <Input placeholder="禁用状态" disabled />
        <Input placeholder="只读状态" readOnly value="只读内容" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同类型</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Input type="text" placeholder="文本输入" />
        <Input 
          type={passwordVisible ? 'text' : 'password'} 
          placeholder="密码输入" 
          suffix={
            <Icon 
              name={passwordVisible ? 'eye-off' : 'eye'} 
              onClick={() => setPasswordVisible(!passwordVisible)} 
            />
          } 
        />
        <Input type="number" placeholder="数字输入" />
        <Input type="email" placeholder="邮箱输入" />
        <Input type="tel" placeholder="电话输入" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带前缀后缀</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Input 
          placeholder="带前缀" 
          prefix={<Icon name="user" />} 
        />
        <Input 
          placeholder="带后缀" 
          suffix={<Icon name="search" />} 
        />
        <Input 
          placeholder="带前后缀" 
          prefix={<Icon name="user" />} 
          suffix={<Icon name="clear" />} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带计数</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Input 
          placeholder="带计数" 
          maxLength={20} 
          showCount 
        />
        <Input 
          placeholder="带计数和清除按钮" 
          maxLength={20} 
          showCount 
          clearable 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Input 
          placeholder="受控模式" 
          value={value} 
          onChange={(e) => setValue(e.detail.value)} 
          clearable 
        />
        <Button 
          type="primary" 
          onClick={() => setValue('')} 
        >
          清空输入
        </Button>
      </Space>
    </View>
  );
};

export default InputExample;
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

1. **输入类型**：支持文本、密码、数字、邮箱、电话等多种类型，适应不同的输入场景。
2. **受控模式**：推荐使用受控模式，通过 value 和 onChange 属性来控制输入框的值。
3. **清除按钮**：设置 clearable 为 true 时，输入框会显示清除按钮，点击可清空输入内容。
4. **计数功能**：设置 showCount 和 maxLength 属性时，输入框会显示字符计数。
5. **前缀后缀**：支持添加前缀和后缀元素，可用于显示图标、单位等。
6. **禁用状态**：设置 disabled 为 true 时，输入框不可编辑，样式会变为灰色。
7. **只读状态**：设置 readOnly 为 true 时，输入框不可编辑，但样式保持不变。
8. **性能优化**：输入框组件使用了 memo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Textarea 组件](#/components/form/textarea) - 用于多行文本输入
- [Select 组件](#/components/form/select) - 用于选择列表项
- [Switch 组件](#/components/form/switch) - 用于开关切换
- [Checkbox 组件](#/components/form/checkbox) - 用于多选操作
- [Radio 组件](#/components/form/radio) - 用于单选操作
