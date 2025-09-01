# Radio 单选框组件

单选框组件用于单选操作，支持单个单选框和单选框组。

## 基础用法

```tsx
import { Radio } from 'taro-uno'

// 基础单选框
<Radio onChange={(value) => console.log(value)}>
  选项一
</Radio>

// 受控单选框
const [value, setValue] = useState('option1')
<Radio
  value="option1"
  checked={value === 'option1'}
  onChange={(value) => setValue(value)}
>
  选项一
</Radio>
```

## 单选框组

单选框支持分组使用。

```tsx
// 基础单选框组
<Radio.Group
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>

// 受控单选框组
const [value, setValue] = useState('option1')
<Radio.Group
  value={value}
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => setValue(value)}
/>
```

## 状态

单选框支持不同的状态。

```tsx
// 正常状态
<Radio>正常</Radio>

// 选中状态
<Radio defaultChecked>选中</Radio>

// 禁用状态
<Radio disabled>禁用</Radio>

<Radio disabled checked>禁用选中</Radio>

// 只读状态
<Radio readOnly checked>只读</Radio>

// 加载状态
<Radio loading>加载中</Radio>
```

## 尺寸

单选框提供多种尺寸。

```tsx
<Radio size="xs">超小</Radio>
<Radio size="sm">小</Radio>
<Radio size="md">中</Radio>
<Radio size="lg">大</Radio>
<Radio size="xl">超大</Radio>
```

## 形状

单选框支持不同的形状。

```tsx
<Radio shape="circle">圆形</Radio>
<Radio shape="square">方形</Radio>
<Radio shape="rounded">圆角</Radio>
```

## 颜色

单选框支持自定义颜色。

```tsx
<Radio color="#3b82f6">蓝色</Radio>
<Radio color="#10b981">绿色</Radio>
<Radio color="#f59e0b">橙色</Radio>
<Radio color="#ef4444">红色</Radio>
```

## 按钮样式

单选框支持按钮样式。

```tsx
// 按钮样式单选框
<Radio.Group
  optionType="button"
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>

// 实心按钮
<Radio.Group
  optionType="button"
  buttonStyle="solid"
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>

// 边框按钮
<Radio.Group
  optionType="button"
  buttonStyle="outline"
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

## 自定义渲染

单选框支持自定义渲染。

```tsx
// 自定义图标
<Radio
  checkedIcon={<Icon name="check-circle" />}
  uncheckedIcon={<Icon name="circle" />}
>
  自定义图标
</Radio>

// 自定义标签
<Radio>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span>自定义标签</span>
    <Tag size="sm">推荐</Tag>
  </div>
</Radio>
```

## 单选框组配置

单选框组支持丰富的配置。

```tsx
// 禁用选项
<Radio.Group
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2', disabled: true },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>

// 方向布局
<Radio.Group
  direction="horizontal"
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>

// 间距设置
<Radio.Group
  spacing={16}
  options={[
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

## 嵌套使用

单选框支持嵌套使用。

```tsx
// 嵌套单选框
<Radio.Group
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
  onChange={(value) => console.log(value)}
/>
```

## 表单集成

单选框与表单组件完美集成。

```tsx
<Form onFinish={(values) => console.log(values)}>
  <Form.Item
    name="gender"
    label="性别"
    rules={[{ required: true, message: '请选择性别' }]}
  >
    <Radio.Group
      options={[
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' }
      ]}
    />
  </Form.Item>
  
  <Form.Item
    name="plan"
    label="套餐"
    rules={[{ required: true, message: '请选择套餐' }]}
  >
    <Radio.Group
      optionType="button"
      options={[
        { label: '基础版', value: 'basic' },
        { label: '专业版', value: 'pro' },
        { label: '企业版', value: 'enterprise' }
      ]}
    />
  </Form.Item>
  
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## API

### Radio Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string \| number | - | 单选框值 |
| checked | boolean | false | 是否选中 |
| defaultChecked | boolean | false | 默认是否选中 |
| disabled | boolean | false | 是否禁用 |
| readOnly | boolean | false | 是否只读 |
| loading | boolean | false | 是否加载中 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 单选框尺寸 |
| shape | 'circle' \| 'square' \| 'rounded' | 'circle' | 单选框形状 |
| color | string | - | 自定义颜色 |
| checkedIcon | ReactNode | - | 选中状态图标 |
| uncheckedIcon | ReactNode | - | 未选中状态图标 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (value: string \| number, event: ITouchEvent) => void | 选中值变化事件 |

### Radio.Group Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string \| number | - | 当前选中值 |
| defaultValue | string \| number | - | 默认选中值 |
| options | array | [] | 选项数据 |
| disabled | boolean | false | 是否禁用 |
| direction | 'vertical' \| 'horizontal' | 'vertical' | 排列方向 |
| optionType | 'default' \| 'button' | 'default' | 选项类型 |
| buttonStyle | 'solid' \| 'outline' | 'solid' | 按钮样式 |
| spacing | number | 8 | 选项间距 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (value: string \| number, event: ITouchEvent) => void | 选中值变化事件 |

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
| getValue | - | string \| number | 获取当前值 |
| setValue | (value: string \| number) => void | void | 设置当前值 |
| isChecked | - | boolean | 获取选中状态 |
| isDisabled | - | boolean | 获取禁用状态 |
| focus | - | void | 聚焦单选框 |
| blur | - | void | 失焦单选框 |

## 样式定制

### CSS 变量

```css
:root {
  --radio-size: 18px;
  --radio-border-color: #d1d5db;
  --radio-border-radius: 50%;
  --radio-bg-color: #ffffff;
  --radio-checked-bg-color: #3b82f6;
  --radio-checked-border-color: #3b82f6;
  --radio-disabled-bg-color: #f9fafb;
  --radio-disabled-border-color: #e5e7eb;
  --radio-text-color: #374151;
  --radio-disabled-text-color: #9ca3af;
  --radio-loading-color: #9ca3af;
  --radio-button-bg-color: #ffffff;
  --radio-button-border-color: #d1d5db;
  --radio-button-checked-bg-color: #3b82f6;
  --radio-button-checked-border-color: #3b82f6;
  --radio-button-checked-text-color: #ffffff;
}
```

## 最佳实践

1. **明确的选项**：为每个单选框提供明确的选项说明
2. **合理的默认值**：为单选框组设置合适的默认值
3. **视觉层次**：使用不同的样式区分选项的重要性
4. **无障碍访问**：为单选框提供合适的标签和描述

## 注意事项

1. 单选框组件基于 Taro 的 `Radio` 组件封装
2. 单选框组中，同一时间只能有一个选项被选中
3. 在表单中使用时，需要配合 `Form.Item` 的 `valuePropName` 属性
4. 按钮样式的单选框需要确保有足够的点击区域