# DatePicker 日期选择器组件

日期选择器组件用于选择日期、时间或日期范围，支持多种显示模式和交互方式。

## 基础用法

```tsx
import { DatePicker } from 'taro-uno'

// 基础日期选择器
<DatePicker
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
/>

// 受控日期选择器
const [date, setDate] = useState(null)
<DatePicker
  value={date}
  onChange={(date) => setDate(date)}
  placeholder="请选择日期"
/>
```

## 选择模式

日期选择器支持多种选择模式。

```tsx
// 日期选择
<DatePicker
  mode="date"
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
/>

// 时间选择
<DatePicker
  mode="time"
  placeholder="请选择时间"
  onChange={(time) => console.log(time)}
/>

// 日期时间选择
<DatePicker
  mode="datetime"
  placeholder="请选择日期时间"
  onChange={(datetime) => console.log(datetime)}
/>

// 月份选择
<DatePicker
  mode="month"
  placeholder="请选择月份"
  onChange={(month) => console.log(month)}
/>

// 年份选择
<DatePicker
  mode="year"
  placeholder="请选择年份"
  onChange={(year) => console.log(year)}
/>

// 范围选择
<DatePicker
  mode="range"
  placeholder={['开始日期', '结束日期']}
  onChange={(range) => console.log(range)}
/>
```

## 显示格式

日期选择器支持自定义显示格式。

```tsx
// 自定义格式
<DatePicker
  format="YYYY/MM/DD"
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
/>

// 不同格式
<DatePicker
  format="MM-DD-YYYY"
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
/>

<DatePicker
  format="DD/MM/YYYY HH:mm"
  mode="datetime"
  placeholder="请选择日期时间"
  onChange={(datetime) => console.log(datetime)}
/>
```

## 尺寸

日期选择器提供多种尺寸。

```tsx
<DatePicker
  size="xs"
  placeholder="超小尺寸"
  onChange={(date) => console.log(date)}
/>

<DatePicker
  size="sm"
  placeholder="小尺寸"
  onChange={(date) => console.log(date)}
/>

<DatePicker
  size="md"
  placeholder="中等尺寸"
  onChange={(date) => console.log(date)}
/>

<DatePicker
  size="lg"
  placeholder="大尺寸"
  onChange={(date) => console.log(date)}
/>

<DatePicker
  size="xl"
  placeholder="超大尺寸"
  onChange={(date) => console.log(date)}
/>
```

## 状态

日期选择器支持不同的状态。

```tsx
// 正常状态
<DatePicker
  placeholder="正常状态"
  onChange={(date) => console.log(date)}
/>

// 禁用状态
<DatePicker
  disabled
  placeholder="禁用状态"
  onChange={(date) => console.log(date)}
/>

// 只读状态
<DatePicker
  readOnly
  placeholder="只读状态"
  onChange={(date) => console.log(date)}
/>

// 加载状态
<DatePicker
  loading
  placeholder="加载状态"
  onChange={(date) => console.log(date)}
/>

// 错误状态
<DatePicker
  status="error"
  placeholder="错误状态"
  onChange={(date) => console.log(date)}
/>
```

## 日期限制

日期选择器支持日期范围限制。

```tsx
// 最小和最大日期
<DatePicker
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
/>

// 禁用特定日期
<DatePicker
  disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
  placeholder="请选择工作日"
  onChange={(date) => console.log(date)}
/>

// 禁用未来日期
<DatePicker
  disabledDate={(date) => date > new Date()}
  placeholder="请选择过去日期"
  onChange={(date) => console.log(date)}
/>
```

## 自定义渲染

日期选择器支持自定义渲染。

```tsx
// 自定义输入框
<DatePicker
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
  renderInput={(props) => (
    <div
      {...props}
      style={{
        border: '1px solid #3b82f6',
        borderRadius: '6px',
        padding: '8px 12px',
        backgroundColor: '#f0f9ff'
      }}
    />
  )}
/>

// 自定义图标
<DatePicker
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
  suffixIcon={<Icon name="calendar" />}
/>

// 自定义占位符
<DatePicker
  placeholder="请选择日期"
  onChange={(date) => console.log(date)}
  renderPlaceholder={(placeholder) => (
    <span style={{ color: '#9ca3af' }}>{placeholder}</span>
  )}
/>
```

## 范围选择

日期选择器支持范围选择。

```tsx
// 基础范围选择
<DatePicker
  mode="range"
  placeholder={['开始日期', '结束日期']}
  onChange={(range) => console.log(range)}
/>

// 分隔符
<DatePicker
  mode="range"
  placeholder={['开始日期', '结束日期']}
  separator="至"
  onChange={(range) => console.log(range)}
/>

// 范围限制
<DatePicker
  mode="range"
  placeholder={['开始日期', '结束日期']}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
  onChange={(range) => console.log(range)}
/>
```

## 时间选择

日期选择器支持时间选择。

```tsx
// 时间选择
<DatePicker
  mode="time"
  placeholder="请选择时间"
  onChange={(time) => console.log(time)}
/>

// 时间格式
<DatePicker
  mode="time"
  format="HH:mm:ss"
  placeholder="请选择时间"
  onChange={(time) => console.log(time)}
/>

// 时间间隔
<DatePicker
  mode="time"
  hourStep={1}
  minuteStep={15}
  secondStep={30}
  placeholder="请选择时间"
  onChange={(time) => console.log(time)}
/>
```

## 清除功能

日期选择器支持清除功能。

```tsx
// 可清除
<DatePicker
  allowClear
  placeholder="请选择日期（可清除）"
  onChange={(date) => console.log(date)}
  onClear={() => console.log('清除')}
/>
```

## 表单集成

日期选择器与表单组件完美集成。

```tsx
<Form onFinish={(values) => console.log(values)}>
  <Form.Item
    name="birthday"
    label="生日"
    rules={[{ required: true, message: '请选择生日' }]}
  >
    <DatePicker
      placeholder="请选择生日"
      mode="date"
    />
  </Form.Item>
  
  <Form.Item
    name="appointment"
    label="预约时间"
    rules={[{ required: true, message: '请选择预约时间' }]}
  >
    <DatePicker
      placeholder="请选择预约时间"
      mode="datetime"
    />
  </Form.Item>
  
  <Form.Item
    name="leave"
    label="请假时间"
    rules={[{ required: true, message: '请选择请假时间' }]}
  >
    <DatePicker
      placeholder={['开始日期', '结束日期']}
      mode="range"
    />
  </Form.Item>
  
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | Date \| Date[] \| null | null | 当前选中值 |
| defaultValue | Date \| Date[] \| null | null | 默认选中值 |
| mode | 'date' \| 'time' \| 'datetime' \| 'month' \| 'year' \| 'range' | 'date' | 选择模式 |
| format | string | 'YYYY-MM-DD' | 显示格式 |
| placeholder | string \| string[] | - | 占位文本 |
| disabled | boolean | false | 是否禁用 |
| readOnly | boolean | false | 是否只读 |
| loading | boolean | false | 是否加载中 |
| status | 'normal' \| 'error' \| 'warning' \| 'success' | 'normal' | 输入框状态 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 选择器尺寸 |
| minDate | Date \| null | null | 最小日期 |
| maxDate | Date \| null | null | 最大日期 |
| disabledDate | (date: Date) => boolean | - | 禁用日期函数 |
| allowClear | boolean | false | 是否允许清除 |
| showTime | boolean | false | 是否显示时间选择 |
| hourStep | number | 1 | 小时步长 |
| minuteStep | number | 1 | 分钟步长 |
| secondStep | number | 1 | 秒钟步长 |
| separator | string | '-' | 范围选择分隔符 |
| suffixIcon | ReactNode | - | 后缀图标 |
| prefixIcon | ReactNode | - | 前缀图标 |
| renderInput | (props: any) => ReactNode | - | 自定义输入框渲染 |
| renderPlaceholder | (placeholder: string) => ReactNode | - | 自定义占位符渲染 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (date: Date \| Date[] \| null) => void | 日期变化事件 |
| onClear | () => void | 清除事件 |
| onOpen | () => void | 打开事件 |
| onClose | () => void | 关闭事件 |
| onFocus | (event: FocusEvent) => void | 聚焦事件 |
| onBlur | (event: FocusEvent) => void | 失焦事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getValue | - | Date \| Date[] \| null | 获取当前值 |
| setValue | (date: Date \| Date[] \| null) => void | void | 设置当前值 |
| clearValue | - | void | 清除当前值 |
| focus | - | void | 聚焦选择器 |
| blur | - | void | 失焦选择器 |
| openPicker | - | void | 打开选择器 |
| closePicker | - | void | 关闭选择器 |
| isPickerOpen | - | boolean | 获取选择器状态 |
| getDate | - | Date \| null | 获取日期对象 |
| formatDate | (date: Date) => string | string | 格式化日期 |
| parseDate | (dateString: string) => Date \| null | Date \| null | 解析日期字符串 |

## 样式定制

### CSS 变量

```css
:root {
  --datepicker-bg-color: #ffffff;
  --datepicker-text-color: #111827;
  --datepicker-border-color: #e5e7eb;
  --datepicker-hover-bg-color: #f3f4f6;
  --datepicker-disabled-bg-color: #f9fafb;
  --datepicker-placeholder-color: #9ca3af;
  --datepicker-error-color: #ef4444;
  --datepicker-warning-color: #f59e0b;
  --datepicker-success-color: #10b981;
  --datepicker-selected-bg-color: #3b82f6;
  --datepicker-selected-text-color: #ffffff;
  --datepicker-today-bg-color: #dbeafe;
  --datepicker-today-text-color: #1d4ed8;
  --datepicker-disabled-color: #9ca3af;
  --datepicker-border-radius: 6px;
  --datepicker-font-size: 14px;
  --datepicker-height: 40px;
  --datepicker-padding: 8px 12px;
}
```

## 最佳实践

1. **合适的格式**：根据使用场景选择合适的日期格式
2. **日期限制**：使用 `minDate` 和 `maxDate` 限制用户选择范围
3. **清晰的提示**：为日期选择器提供明确的占位文本和错误提示
4. **移动端优化**：在移动端使用原生的日期选择器

## 注意事项

1. 日期选择器组件基于 Taro 的 `Picker` 组件封装
2. 日期格式使用 moment.js 或 day.js 的格式
3. 范围选择时，确保结束日期不小于开始日期
4. 在表单中使用时，需要配合 `Form.Item` 进行验证