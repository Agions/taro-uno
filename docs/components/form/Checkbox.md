# Checkbox 复选框组件

复选框组件用于多选操作，支持单个复选框和复选框组。

## 基础用法

```tsx
import { Checkbox } from 'taro-uno'

// 基础复选框
<Checkbox onChange={(checked) => console.log(checked)}>
  同意条款
</Checkbox>

// 受控复选框
const [checked, setChecked] = useState(false)
<Checkbox
  checked={checked}
  onChange={(checked) => setChecked(checked)}
>
  同意条款
</Checkbox>
```

## 复选框组

复选框支持分组使用。

```tsx
// 基础复选框组
<Checkbox.Group
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' }
  ]}
  onChange={(values) => console.log(values)}
/>

// 受控复选框组
const [values, setValues] = useState(['apple'])
<Checkbox.Group
  value={values}
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' }
  ]}
  onChange={(values) => setValues(values)}
/>
```

## 状态

复选框支持不同的状态。

```tsx
// 正常状态
<Checkbox>正常</Checkbox>

// 选中状态
<Checkbox defaultChecked>选中</Checkbox>

// 禁用状态
<Checkbox disabled>禁用</Checkbox>

<Checkbox disabled checked>禁用选中</Checkbox>

// 只读状态
<Checkbox readOnly checked>只读</Checkbox>

// 加载状态
<Checkbox loading>加载中</Checkbox>
```

## 尺寸

复选框提供多种尺寸。

```tsx
<Checkbox size="xs">超小</Checkbox>
<Checkbox size="sm">小</Checkbox>
<Checkbox size="md">中</Checkbox>
<Checkbox size="lg">大</Checkbox>
<Checkbox size="xl">超大</Checkbox>
```

## 形状

复选框支持不同的形状。

```tsx
<Checkbox shape="square">方形</Checkbox>
<Checkbox shape="circle">圆形</Checkbox>
<Checkbox shape="rounded">圆角</Checkbox>
```

## 颜色

复选框支持自定义颜色。

```tsx
<Checkbox color="#3b82f6">蓝色</Checkbox>
<Checkbox color="#10b981">绿色</Checkbox>
<Checkbox color="#f59e0b">橙色</Checkbox>
<Checkbox color="#ef4444">红色</Checkbox>
```

## 半选状态

复选框支持半选状态。

```tsx
const [checked, setChecked] = useState(false)
const [indeterminate, setIndeterminate] = useState(true)

<Checkbox
  checked={checked}
  indeterminate={indeterminate}
  onChange={(checked) => {
    setChecked(checked)
    setIndeterminate(false)
  }}
>
  全选
</Checkbox>
```

## 自定义渲染

复选框支持自定义渲染。

```tsx
// 自定义图标
<Checkbox
  checkedIcon={<Icon name="check-square" />}
  uncheckedIcon={<Icon name="square" />}
  indeterminateIcon={<Icon name="minus-square" />}
>
  自定义图标
</Checkbox>

// 自定义标签
<Checkbox>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span>自定义标签</span>
    <Tag size="sm">推荐</Tag>
  </div>
</Checkbox>
```

## 复选框组配置

复选框组支持丰富的配置。

```tsx
// 禁用选项
<Checkbox.Group
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana', disabled: true },
    { label: '橙子', value: 'orange' }
  ]}
  onChange={(values) => console.log(values)}
/>

// 方向布局
<Checkbox.Group
  direction="horizontal"
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' }
  ]}
  onChange={(values) => console.log(values)}
/>

// 最多选择数量
<Checkbox.Group
  max={2}
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' }
  ]}
  onChange={(values) => console.log(values)}
/>
```

## 嵌套使用

复选框支持嵌套使用。

```tsx
// 嵌套复选框
<Checkbox.Group
  options={[
    { 
      label: '水果', 
      value: 'fruits',
      children: [
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' }
      ]
    },
    { 
      label: '蔬菜', 
      value: 'vegetables',
      children: [
        { label: '西红柿', value: 'tomato' },
        { label: '黄瓜', value: 'cucumber' }
      ]
    }
  ]}
  onChange={(values) => console.log(values)}
/>
```

## 表单集成

复选框与表单组件完美集成。

```tsx
<Form onFinish={(values) => console.log(values)}>
  <Form.Item
    name="fruits"
    label="选择水果"
    rules={[{ required: true, message: '请选择水果' }]}
  >
    <Checkbox.Group
      options={[
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' }
      ]}
    />
  </Form.Item>
  
  <Form.Item
    name="terms"
    valuePropName="checked"
    rules={[{ required: true, message: '请同意条款' }]}
  >
    <Checkbox>我同意服务条款</Checkbox>
  </Form.Item>
  
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## API

### Checkbox Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| checked | boolean | false | 是否选中 |
| defaultChecked | boolean | false | 默认是否选中 |
| disabled | boolean | false | 是否禁用 |
| readOnly | boolean | false | 是否只读 |
| loading | boolean | false | 是否加载中 |
| indeterminate | boolean | false | 是否半选状态 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 复选框尺寸 |
| shape | 'square' \| 'circle' \| 'rounded' | 'square' | 复选框形状 |
| color | string | - | 自定义颜色 |
| checkedIcon | ReactNode | - | 选中状态图标 |
| uncheckedIcon | ReactNode | - | 未选中状态图标 |
| indeterminateIcon | ReactNode | - | 半选状态图标 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (checked: boolean, event: ITouchEvent) => void | 选中状态变化事件 |

### Checkbox.Group Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string[] \| number[] | - | 当前选中值 |
| defaultValue | string[] \| number[] | - | 默认选中值 |
| options | array | [] | 选项数据 |
| disabled | boolean | false | 是否禁用 |
| direction | 'vertical' \| 'horizontal' | 'vertical' | 排列方向 |
| max | number | - | 最大选择数量 |
| min | number | - | 最小选择数量 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (values: string[], event: ITouchEvent) => void | 选中值变化事件 |

### Option 类型

| 属性名 | 类型 | 说明 |
|--------|------|------|
| label | string \| ReactNode | 选项标签 |
| value | string \| number | 选项值 |
| disabled | boolean | 是否禁用 |
| children | Option[] | 子选项（用于嵌套） |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getValue | - | boolean | 获取当前值 |
| setValue | (checked: boolean) => void | void | 设置当前值 |
| toggle | - | void | 切换选中状态 |
| isChecked | - | boolean | 获取选中状态 |
| isDisabled | - | boolean | 获取禁用状态 |
| focus | - | void | 聚焦复选框 |
| blur | - | void | 失焦复选框 |

## 样式定制

### CSS 变量

```css
:root {
  --checkbox-size: 18px;
  --checkbox-border-color: #d1d5db;
  --checkbox-border-radius: 4px;
  --checkbox-bg-color: #ffffff;
  --checkbox-checked-bg-color: #3b82f6;
  --checkbox-checked-border-color: #3b82f6;
  --checkbox-disabled-bg-color: #f9fafb;
  --checkbox-disabled-border-color: #e5e7eb;
  --checkbox-indeterminate-bg-color: #3b82f6;
  --checkbox-indeterminate-border-color: #3b82f6;
  --checkbox-text-color: #374151;
  --checkbox-disabled-text-color: #9ca3af;
  --checkbox-loading-color: #9ca3af;
}
```

## 最佳实践

1. **清晰的标签**：为每个复选框提供明确的标签说明
2. **合理的状态**：使用合适的禁用和只读状态
3. **分组管理**：使用复选框组管理相关的选项
4. **数量限制**：使用 `max` 和 `min` 属性限制选择数量

## 注意事项

1. 复选框组件基于 Taro 的 `Checkbox` 组件封装
2. 半选状态需要同时设置 `indeterminate` 和 `checked` 属性
3. 在表单中使用时，需要配合 `Form.Item` 的 `valuePropName` 属性
4. 嵌套复选框需要正确处理父子关系的选中状态