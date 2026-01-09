# Cascader 组件

Cascader 组件是一个级联选择器组件，用于从层级结构中选择选项，支持单选、多选、搜索、自定义渲染等功能，适用于需要从树形结构中进行选择的场景。

## 基本使用

### 基础级联选择器

```tsx
<Cascader 
  options={options} 
  placeholder="请选择" 
/>
```

### 受控模式

```tsx
<Cascader 
  options={options} 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
  placeholder="请选择" 
/>
```

### 多选模式

```tsx
<Cascader 
  options={options} 
  mode="multiple" 
  value={value} 
  onChange={(e) => setValue(e.detail.value)} 
  placeholder="请选择" 
/>
```

### 带搜索

```tsx
<Cascader 
  options={options} 
  showSearch 
  placeholder="请选择或搜索" 
/>
```

### 禁用状态

```tsx
<Cascader 
  options={options} 
  disabled 
  placeholder="禁用状态" 
/>
```

### 自定义渲染

```tsx
<Cascader 
  options={options} 
  placeholder="自定义渲染" 
  optionRender={(option) => (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name="folder" style={{ marginRight: '8px' }} />
      <Text>{option.label}</Text>
    </View>
  )} 
/>
```

### 自定义分隔符

```tsx
<Cascader 
  options={options} 
  separator=" / " 
  placeholder="自定义分隔符" 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `any[]` | - | 选中的值（受控模式） |
| defaultValue | `any[]` | - | 默认选中的值（非受控模式） |
| options | `Array<any>` | - | 级联选项数据 |
| mode | `string` | `'single'` | 选择模式，可选值：`single`、`multiple` |
| placeholder | `string` | - | 占位文本 |
| showSearch | `boolean` | `false` | 是否显示搜索框 |
| searchPlaceholder | `string` | - | 搜索框占位文本 |
| separator | `string` | `'/'` | 选项分隔符 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| allowClear | `boolean` | `false` | 是否允许清除 |
| placeholder | `string` | - | 占位文本 |
| placeholder | `string` | - | 占位文本 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: any[] } }) => void` | - | 选中值变化回调 |
| onSearch | `(value: string) => void` | - | 搜索回调 |
| onFocus | `() => void` | - | 聚焦回调 |
| onBlur | `() => void` | - | 失焦回调 |
| onOpen | `() => void` | - | 下拉框打开回调 |
| onClose | `() => void` | - | 下拉框关闭回调 |
| optionRender | `(option: any) => React.ReactNode` | - | 自定义选项渲染 |
| fieldNames | `object` | `{ label: 'label', value: 'value', children: 'children' }` | 自定义字段名 |

## 类型定义

```tsx
// Cascader 组件属性接口
export interface CascaderProps {
  value?: any[];
  defaultValue?: any[];
  options?: Array<any>;
  mode?: 'single' | 'multiple';
  placeholder?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  separator?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { value: any[] } }) => void;
  onSearch?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  optionRender?: (option: any) => React.ReactNode;
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  };
}
```

## 示例代码

### 完整示例

```tsx
import { Cascader, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const CascaderExample = () => {
  // 级联数据
  const options = [
    {
      value: 'level1',
      label: '一级菜单',
      children: [
        {
          value: 'level1-1',
          label: '二级菜单1',
          children: [
            { value: 'level1-1-1', label: '三级菜单1' },
            { value: 'level1-1-2', label: '三级菜单2' }
          ]
        },
        {
          value: 'level1-2',
          label: '二级菜单2',
          children: [
            { value: 'level1-2-1', label: '三级菜单3' },
            { value: 'level1-2-2', label: '三级菜单4' }
          ]
        }
      ]
    },
    {
      value: 'level2',
      label: '一级菜单2',
      children: [
        { value: 'level2-1', label: '二级菜单3' },
        { value: 'level2-2', label: '二级菜单4' }
      ]
    }
  ];

  // 单选状态
  const [singleValue, setSingleValue] = useState<any[]>([]);
  // 多选状态
  const [multipleValue, setMultipleValue] = useState<any[]>([]);

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础级联选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Cascader 
          options={options} 
          placeholder="请选择" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Cascader 
          options={options} 
          value={singleValue} 
          onChange={(e) => setSingleValue(e.detail.value)} 
          placeholder="请选择" 
        />
        <Text>选中值：{singleValue.join(' / ') || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>多选模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Cascader 
          options={options} 
          mode="multiple" 
          value={multipleValue} 
          onChange={(e) => setMultipleValue(e.detail.value)} 
          placeholder="请选择" 
          allowClear 
        />
        <Text>选中值：{multipleValue.map(v => v.join(' / ')).join(', ') || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带搜索</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Cascader 
          options={options} 
          showSearch 
          placeholder="请选择或搜索" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Cascader 
          options={options} 
          disabled 
          placeholder="禁用状态" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义分隔符</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Cascader 
          options={options} 
          separator=" > " 
          placeholder="自定义分隔符" 
        />
      </Space>
    </View>
  );
};

export default CascaderExample;
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
3. **搜索功能**：设置 showSearch 为 true 时，级联选择器会显示搜索框，支持对选项进行搜索。
4. **自定义渲染**：通过 optionRender 属性可以自定义选项的渲染方式，支持显示图标、图片等。
5. **分隔符**：可以通过 separator 属性自定义选项值的分隔符。
6. **禁用状态**：设置 disabled 为 true 时，级联选择器不可点击，样式会变为灰色。
7. **加载状态**：设置 loading 为 true 时，级联选择器会显示加载动画，适用于异步加载选项的场景。
8. **性能优化**：级联选择器组件使用了 memo 优化，避免不必要的重渲染；对于大量选项，建议使用虚拟滚动优化性能。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Select 组件](#/components/form/select) - 用于普通选择器
- [Tree 组件](#/components/data-display/tree) - 用于树形结构展示
- [Form 组件](#/components/form/form) - 用于表单管理
