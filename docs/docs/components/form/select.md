# Select 组件

Select 组件是一个选择器组件，用于从下拉列表中选择选项，支持单选、多选、搜索、分组等功能，适用于需要从大量选项中进行选择的场景。

## 基本使用

### 基础选择器

```tsx
<Select placeholder="请选择">
  <Select.Option value="option1">选项1</Select.Option>
  <Select.Option value="option2">选项2</Select.Option>
  <Select.Option value="option3">选项3</Select.Option>
</Select>
```

### 受控模式

```tsx
<Select 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
  placeholder="请选择" 
>
  <Select.Option value="option1">选项1</Select.Option>
  <Select.Option value="option2">选项2</Select.Option>
  <Select.Option value="option3">选项3</Select.Option>
</Select>
```

### 多选模式

```tsx
<Select 
  mode="multiple" 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
  placeholder="请选择" 
>
  <Select.Option value="option1">选项1</Select.Option>
  <Select.Option value="option2">选项2</Select.Option>
  <Select.Option value="option3">选项3</Select.Option>
</Select>
```

### 带搜索

```tsx
<Select 
  showSearch 
  placeholder="请选择或搜索" 
>
  <Select.Option value="option1">选项1</Select.Option>
  <Select.Option value="option2">选项2</Select.Option>
  <Select.Option value="option3">选项3</Select.Option>
</Select>
```

### 禁用状态

```tsx
<Select disabled placeholder="禁用状态" />
<Select disabled value="option1" placeholder="禁用状态">
  <Select.Option value="option1">选项1</Select.Option>
  <Select.Option value="option2">选项2</Select.Option>
</Select>
```

### 分组选项

```tsx
<Select placeholder="请选择分组选项">
  <Select.OptGroup label="分组1">
    <Select.Option value="option1">选项1</Select.Option>
    <Select.Option value="option2">选项2</Select.Option>
  </Select.OptGroup>
  <Select.OptGroup label="分组2">
    <Select.Option value="option3">选项3</Select.Option>
    <Select.Option value="option4">选项4</Select.Option>
  </Select.OptGroup>
</Select>
```

### 自定义渲染

```tsx
<Select 
  placeholder="自定义渲染" 
  optionRender={(option) => (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name="user" style={{ marginRight: '8px' }} />
      <Text>{option.label}</Text>
    </View>
  )} 
>
  <Select.Option value="option1" label="选项1" />
  <Select.Option value="option2" label="选项2" />
  <Select.Option value="option3" label="选项3" />
</Select>
```

## 属性说明

### Select 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `any` \| `any[]` | - | 选中的值（受控模式） |
| defaultValue | `any` \| `any[]` | - | 默认选中的值（非受控模式） |
| mode | `string` | `'single'` | 选择模式，可选值：`single`、`multiple` |
| placeholder | `string` | - | 占位文本 |
| showSearch | `boolean` | `false` | 是否显示搜索框 |
| searchPlaceholder | `string` | - | 搜索框占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| allowClear | `boolean` | `false` | 是否允许清除 |
| maxTagCount | `number` | - | 多选模式下，最大显示标签数量 |
| optionFilterProp | `string` | `'label'` | 搜索时过滤的属性名 |
| optionRender | `(option: any) => React.ReactNode` | - | 自定义选项渲染 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: any \| any[] } }) => void` | - | 选中值变化回调 |
| onSearch | `(value: string) => void` | - | 搜索回调 |
| onFocus | `() => void` | - | 聚焦回调 |
| onBlur | `() => void` | - | 失焦回调 |
| onOpen | `() => void` | - | 下拉框打开回调 |
| onClose | `() => void` | - | 下拉框关闭回调 |

### Select.Option 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `any` | - | 选项值 |
| label | `React.ReactNode` | - | 选项标签 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

### Select.OptGroup 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| label | `React.ReactNode` | - | 分组标签 |
| disabled | `boolean` | `false` | 是否禁用分组 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

## 类型定义

```tsx
// Select 组件属性接口
export interface SelectProps {
  value?: any | any[];
  defaultValue?: any | any[];
  mode?: 'single' | 'multiple';
  placeholder?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  maxTagCount?: number;
  optionFilterProp?: string;
  optionRender?: (option: any) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { value: any | any[] } }) => void;
  onSearch?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}

// Select.Option 组件属性接口
export interface SelectOptionProps {
  value?: any;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Select.OptGroup 组件属性接口
export interface SelectOptGroupProps {
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

## 示例代码

### 完整示例

```tsx
import { Select, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const SelectExample = () => {
  // 单选状态
  const [singleValue, setSingleValue] = useState('');
  // 多选状态
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  // 分组选择状态
  const [groupValue, setGroupValue] = useState('');
  
  const options = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
    { label: '选项4', value: 'option4' },
    { label: '选项5', value: 'option5' }
  ];

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Select 
          value={singleValue} 
          onChange={(e) => setSingleValue(e.detail.value)} 
          placeholder="请选择" 
        >
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Text>选中值：{singleValue || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>多选模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Select 
          mode="multiple" 
          value={multipleValue} 
          onChange={(e) => setMultipleValue(e.detail.value)} 
          placeholder="请选择" 
          allowClear 
          maxTagCount={2} 
        >
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Text>选中值：{multipleValue.join(', ') || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带搜索</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Select 
          placeholder="请选择或搜索" 
          showSearch 
          searchPlaceholder="搜索选项" 
          onSearch={(value) => console.log('搜索:', value)} 
        >
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>分组选项</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Select 
          value={groupValue} 
          onChange={(e) => setGroupValue(e.detail.value)} 
          placeholder="请选择分组选项" 
        >
          <Select.OptGroup label="分组1">
            <Select.Option value="option1">选项1</Select.Option>
            <Select.Option value="option2">选项2</Select.Option>
          </Select.OptGroup>
          <Select.OptGroup label="分组2">
            <Select.Option value="option3">选项3</Select.Option>
            <Select.Option value="option4">选项4</Select.Option>
          </Select.OptGroup>
          <Select.OptGroup label="分组3" disabled>
            <Select.Option value="option5">选项5（禁用分组）</Select.Option>
          </Select.OptGroup>
        </Select>
        <Text>选中值：{groupValue || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Select placeholder="禁用状态" disabled />
        <Select 
          value="option1" 
          placeholder="禁用状态（已选择）" 
          disabled 
        >
          <Select.Option value="option1">选项1</Select.Option>
          <Select.Option value="option2">选项2</Select.Option>
        </Select>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>加载状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Select placeholder="加载中" loading />
      </Space>
    </View>
  );
};

export default SelectExample;
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

1. **选择模式**：支持单选和多选两种模式，通过 mode 属性控制。
2. **受控模式**：推荐使用受控模式，通过 value 和 onChange 属性来控制选中的值。
3. **搜索功能**：设置 showSearch 为 true 时，选择器会显示搜索框，支持对选项进行搜索。
4. **分组选项**：使用 Select.OptGroup 组件可以对选项进行分组，提高用户体验。
5. **多选标签**：多选模式下，可以通过 maxTagCount 属性限制显示的标签数量。
6. **禁用状态**：设置 disabled 为 true 时，选择器不可点击，样式会变为灰色。
7. **加载状态**：设置 loading 为 true 时，选择器会显示加载动画，适用于异步加载选项的场景。
8. **自定义渲染**：通过 optionRender 属性可以自定义选项的渲染方式，支持显示图标、图片等。
9. **性能优化**：选择器组件使用了 memo 优化，避免不必要的重渲染；对于大量选项，建议使用虚拟滚动优化性能。
10. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Input 组件](#/components/form/input) - 用于文本输入
- [Radio 组件](#/components/form/radio) - 用于单选操作
- [Checkbox 组件](#/components/form/checkbox) - 用于多选操作
- [Cascader 组件](#/components/form/cascader) - 用于级联选择
- [Form 组件](#/components/form/form) - 用于表单管理
