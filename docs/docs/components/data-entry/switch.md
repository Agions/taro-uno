# Switch 组件

Switch 组件是一个开关切换组件，用于在开和关两种状态之间进行切换，支持自定义大小、颜色、禁用状态等功能。

## 基本使用

### 基础开关

```tsx
<Switch />
```

### 受控模式

```tsx
<Switch 
  checked={checked} 
  onChange={(e) => setChecked(e.detail.checked)} 
/>
```

### 不同大小

```tsx
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />
```

### 不同颜色

```tsx
<Switch color="primary" />
<Switch color="success" />
<Switch color="warning" />
<Switch color="error" />
<Switch color="#ff6b6b" />
```

### 禁用状态

```tsx
<Switch disabled />
<Switch disabled checked />
```

### 带文字

```tsx
<Switch checkedText="开" uncheckedText="关" />
```

### 加载状态

```tsx
<Switch loading />
<Switch loading checked />
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | 开关是否选中（受控模式） |
| defaultChecked | `boolean` | `false` | 开关默认是否选中（非受控模式） |
| size | `string` | `medium` | 开关大小，可选值：`small`、`medium`、`large` |
| color | `string` | `primary` | 开关颜色，可选值：`primary`、`success`、`warning`、`error` 或自定义颜色值 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| checkedText | `React.ReactNode` | - | 选中状态显示的文字 |
| uncheckedText | `React.ReactNode` | - | 未选中状态显示的文字 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { checked: boolean } }) => void` | - | 开关状态变化回调 |
| onClick | `() => void` | - | 点击开关回调 |

## 类型定义

```tsx
// Switch 组件属性接口
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  disabled?: boolean;
  loading?: boolean;
  checkedText?: React.ReactNode;
  uncheckedText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { checked: boolean } }) => void;
  onClick?: () => void;
}
```

## 示例代码

### 完整示例

```tsx
import { Switch, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const SwitchExample = () => {
  // 受控模式状态
  const [checked, setChecked] = useState(false);
  const [checkedList, setCheckedList] = useState([false, false, false]);

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础开关</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Switch />
        <Switch defaultChecked />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Switch 
            checked={checked} 
            onChange={(e) => setChecked(e.detail.checked)} 
          />
          <Text>{checked ? '已开启' : '已关闭'}</Text>
        </Space>
        <Button 
          type="primary" 
          onClick={() => setChecked(!checked)} 
        >
          {checked ? '关闭开关' : '打开开关'}
        </Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同大小</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Text>小号：</Text>
          <Switch size="small" />
        </Space>
        <Space>
          <Text>中号：</Text>
          <Switch size="medium" />
        </Space>
        <Space>
          <Text>大号：</Text>
          <Switch size="large" />
        </Space>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Text>主要颜色：</Text>
          <Switch color="primary" />
        </Space>
        <Space>
          <Text>成功颜色：</Text>
          <Switch color="success" />
        </Space>
        <Space>
          <Text>警告颜色：</Text>
          <Switch color="warning" />
        </Space>
        <Space>
          <Text>错误颜色：</Text>
          <Switch color="error" />
        </Space>
        <Space>
          <Text>自定义颜色：</Text>
          <Switch color="#ff6b6b" />
        </Space>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Text>禁用关闭：</Text>
          <Switch disabled />
        </Space>
        <Space>
          <Text>禁用开启：</Text>
          <Switch disabled checked />
        </Space>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带文字</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Switch checkedText="开" uncheckedText="关" />
        <Switch checkedText="启用" uncheckedText="禁用" defaultChecked />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>加载状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Text>加载关闭：</Text>
          <Switch loading />
        </Space>
        <Space>
          <Text>加载开启：</Text>
          <Switch loading checked />
        </Space>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>开关组</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Space>
          <Text>选项 1：</Text>
          <Switch 
            checked={checkedList[0]} 
            onChange={(e) => {
              const newList = [...checkedList];
              newList[0] = e.detail.checked;
              setCheckedList(newList);
            }} 
          />
        </Space>
        <Space>
          <Text>选项 2：</Text>
          <Switch 
            checked={checkedList[1]} 
            onChange={(e) => {
              const newList = [...checkedList];
              newList[1] = e.detail.checked;
              setCheckedList(newList);
            }} 
          />
        </Space>
        <Space>
          <Text>选项 3：</Text>
          <Switch 
            checked={checkedList[2]} 
            onChange={(e) => {
              const newList = [...checkedList];
              newList[2] = e.detail.checked;
              setCheckedList(newList);
            }} 
          />
        </Space>
        <Text style={{ marginTop: '12px' }}>选中项：{checkedList.filter(Boolean).length} 个</Text>
      </Space>
    </View>
  );
};

export default SwitchExample;
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

1. **开关状态**：开关组件有开和关两种状态，通过 checked 属性控制。
2. **受控模式**：推荐使用受控模式，通过 checked 和 onChange 属性来控制开关的状态。
3. **大小配置**：支持 small、medium、large 三种预定义大小，适应不同的设计需求。
4. **颜色配置**：支持内置颜色和自定义颜色值，可以根据主题需求灵活配置。
5. **禁用状态**：设置 disabled 为 true 时，开关不可点击，样式会变为灰色。
6. **加载状态**：设置 loading 为 true 时，开关会显示加载动画，不可点击。
7. **带文字**：可以通过 checkedText 和 uncheckedText 属性设置开关在不同状态下显示的文字。
8. **性能优化**：开关组件使用了 memo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Checkbox 组件](#/components/form/checkbox) - 用于多选操作
- [Radio 组件](#/components/form/radio) - 用于单选操作
- [Input 组件](#/components/form/input) - 用于文本输入
- [Select 组件](#/components/form/select) - 用于选择列表项
