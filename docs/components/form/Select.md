# Select 选择器组件

选择器组件用于从多个选项中选择一个或多个值，支持搜索、分组、异步加载等功能。

## 基础用法

```tsx
import { Select } from 'taro-uno'

// 基础选择器
<Select
  placeholder="请选择"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

## 多选模式

选择器支持多选模式。

```tsx
// 多选
<Select
  mode="multiple"
  placeholder="请选择多个水果"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' }
  ]}
  onChange={(values) => console.log(values)}
/>

// 标签模式
<Select
  mode="tags"
  placeholder="请选择或输入"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
  onChange={(values) => console.log(values)}
/>
```

## 分组选项

选择器支持分组选项。

```tsx
<Select
  placeholder="请选择水果"
  options={[
    {
      label: '热带水果',
      options: [
        { value: 'banana', label: '香蕉' },
        { value: 'mango', label: '芒果' }
      ]
    },
    {
      label: '温带水果',
      options: [
        { value: 'apple', label: '苹果' },
        { value: 'orange', label: '橙子' }
      ]
    }
  ]}
  onChange={(value) => console.log(value)}
/>
```

## 禁用选项

选择器支持禁用特定选项。

```tsx
<Select
  placeholder="请选择水果"
  options={[
    { value: 'apple', label: '苹果', disabled: true },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

## 搜索功能

选择器支持搜索功能。

```tsx
// 基础搜索
<Select
  showSearch
  placeholder="搜索水果"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' }
  ]}
  onChange={(value) => console.log(value)}
/>

// 自定义搜索
<Select
  showSearch
  placeholder="搜索水果"
  filterOption={(input, option) =>
    option.label.toLowerCase().includes(input.toLowerCase())
  }
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

## 异步加载

选择器支持异步加载选项。

```tsx
// 异步加载
<Select
  showSearch
  placeholder="搜索用户"
  filterOption={false}
  onSearch={(value) => {
    // 发起异步请求
    searchUsers(value)
  }}
  options={userOptions}
  loading={loading}
  onChange={(value) => console.log(value)}
/>

// 滚动加载
<Select
  placeholder="选择用户"
  options={userOptions}
  onPopupScroll={(e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 加载更多数据
      loadMoreUsers()
    }
  }}
  onChange={(value) => console.log(value)}
/>
```

## 自定义渲染

选择器支持自定义渲染。

```tsx
// 自定义选项渲染
<Select
  placeholder="请选择用户"
  options={userOptions}
  optionRender={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Avatar size="sm" src={option.avatar} />
      <div>
        <div style={{ fontWeight: 'bold' }}>{option.label}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{option.email}</div>
      </div>
    </div>
  )}
  onChange={(value) => console.log(value)}
/>

// 自定义选中值渲染
<Select
  mode="multiple"
  placeholder="请选择用户"
  options={userOptions}
  tagRender={({ value, label, onClose }) => (
    <Tag
      closable
      onClose={onClose}
      style={{ marginRight: 4 }}
    >
      <Avatar size="xs" src={userOptions.find(u => u.value === value)?.avatar} />
      {label}
    </Tag>
  )}
  onChange={(values) => console.log(values)}
/>
```

## 状态

选择器支持不同的状态。

```tsx
// 禁用状态
<Select
  disabled
  placeholder="禁用选择器"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>

// 只读状态
<Select
  readonly
  placeholder="只读选择器"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>

// 加载状态
<Select
  loading
  placeholder="加载中..."
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>
```

## 尺寸

选择器提供多种尺寸。

```tsx
<Select
  size="xs"
  placeholder="超小尺寸"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>

<Select
  size="sm"
  placeholder="小尺寸"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>

<Select
  size="md"
  placeholder="中等尺寸"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>

<Select
  size="lg"
  placeholder="大尺寸"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>

<Select
  size="xl"
  placeholder="超大尺寸"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
/>
```

## 清除功能

选择器支持清除功能。

```tsx
<Select
  allowClear
  placeholder="请选择（可清除）"
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' }
  ]}
  onChange={(value) => console.log(value)}
  onClear={() => console.log('清除')}
/>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string \| string[] \| number \| number[] | - | 当前选中值 |
| defaultValue | string \| string[] \| number \| number[] | - | 默认选中值 |
| mode | 'single' \| 'multiple' \| 'tags' | 'single' | 选择模式 |
| options | array | [] | 选项数据 |
| placeholder | string | - | 占位文本 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
| loading | boolean | false | 是否加载中 |
| showSearch | boolean | false | 是否显示搜索框 |
| allowClear | boolean | false | 是否允许清除 |
| filterOption | boolean \| (input: string, option: Option) => boolean | true | 是否过滤选项 |
| optionFilterProp | string | 'label' | 过滤的字段名 |
| optionLabelProp | string | 'label' | 选项标签字段名 |
| optionValueProp | string | 'value' | 选项值字段名 |
| maxTagCount | number | - | 最大标签数量 |
| maxTagPlaceholder | ReactNode \| (omittedValues: number) => ReactNode | - | 超出标签的占位符 |
| notFoundContent | ReactNode | '无匹配数据' | 无匹配数据时的内容 |
| popupClassName | string | - | 下拉菜单类名 |
| popupStyle | React.CSSProperties | - | 下拉菜单样式 |
| dropdownMatchSelectWidth | boolean | true | 下拉菜单宽度是否匹配选择器 |
| dropdownRender | (menu: ReactNode) => ReactNode | - | 自定义下拉菜单渲染 |
| optionRender | (option: Option) => ReactNode | - | 自定义选项渲染 |
| tagRender | (props: TagProps) => ReactNode | - | 自定义标签渲染 |
| onSearch | (value: string) => void | - | 搜索事件 |
| onSelect | (value: string \| number \| string[] \| number[], option: Option) => void | - | 选择事件 |
| onDeselect | (value: string \| number, option: Option) => void | - | 取消选择事件 |
| onChange | (value: string \| number \| string[] \| number[]) => void | - | 值变化事件 |
| onClear | () => void | - | 清除事件 |
| onDropdownVisibleChange | (open: boolean) => void | - | 下拉菜单显示变化事件 |
| onPopupScroll | (event: Event) => void | - | 下拉菜单滚动事件 |
| onFocus | (event: FocusEvent) => void | - | 聚焦事件 |
| onBlur | (event: FocusEvent) => void | - | 失焦事件 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Option 类型

| 属性名 | 类型 | 说明 |
|--------|------|------|
| value | string \| number | 选项值 |
| label | string | 选项标签 |
| disabled | boolean | 是否禁用 |
| group | string | 分组名称 |
| children | Option[] | 子选项（用于分组） |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| focus | - | void | 聚焦选择器 |
| blur | - | void | 失焦选择器 |
| getValue | - | string \| string[] | 获取当前值 |
| setValue | (value: string \| string[]) => void | void | 设置当前值 |
| getOptions | - | Option[] | 获取选项数据 |
| setOptions | (options: Option[]) => void | void | 设置选项数据 |
| clearValue | - | void | 清除当前值 |
| openDropdown | - | void | 打开下拉菜单 |
| closeDropdown | - | void | 关闭下拉菜单 |
| isDropdownOpen | - | boolean | 获取下拉菜单状态 |

## 样式定制

### CSS 变量

```css
:root {
  --select-bg-color: #ffffff;
  --select-text-color: #111827;
  --select-border-color: #e5e7eb;
  --select-hover-bg-color: #f3f4f6;
  --select-selected-bg-color: #dbeafe;
  --select-disabled-bg-color: #f9fafb;
  --select-placeholder-color: #9ca3af;
  --select-dropdown-bg-color: #ffffff;
  --select-dropdown-border-color: #e5e7eb;
  --select-option-hover-bg-color: #f3f4f6;
  --select-option-selected-bg-color: #dbeafe;
  --select-option-disabled-color: #9ca3af;
  --select-tag-bg-color: #dbeafe;
  --select-tag-text-color: #1d4ed8;
  --select-clear-color: #9ca3af;
  --select-arrow-color: #6b7280;
  --select-border-radius: 6px;
  --select-font-size: 14px;
  --select-height: 40px;
  --select-padding: 8px 12px;
}
```

## 最佳实践

1. **合理的数据量**：避免在下拉菜单中显示过多选项，建议使用搜索或分页
2. **异步加载**：对于大量数据，使用异步加载提升性能
3. **搜索优化**：提供合适的搜索过滤逻辑
4. **响应式设计**：在移动端考虑使用合适的交互方式

## 注意事项

1. 选择器组件基于 Taro 的 `Picker` 和 `Select` 组件封装
2. 多选模式下，建议使用合适的标签显示方式
3. 异步加载时，注意处理加载状态和错误情况
4. 在移动端，建议使用原生的选择器组件以获得更好的体验