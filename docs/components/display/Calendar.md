# Calendar 日历组件

日历组件用于显示日期、选择日期或日期范围，支持多种显示模式和交互方式。

## 基础用法

```tsx
import { Calendar } from 'taro-uno'

// 基础日历
<Calendar />

// 受控日历
const [value, setValue] = useState(new Date())
<Calendar value={value} onChange={setValue} />
```

## 显示模式

日历支持多种显示模式。

```tsx
// 单月显示
<Calendar mode="month" />

// 多月显示
<Calendar mode="year" />

// 周显示
<Calendar mode="week" />

// 时间选择
<Calendar mode="time" />
```

## 选择模式

日历支持多种选择模式。

```tsx
// 单选
<Calendar selectionMode="single" />

// 多选
<Calendar selectionMode="multiple" />

// 范围选择
<Calendar selectionMode="range" />
```

## 尺寸

日历提供多种尺寸。

```tsx
<Calendar size="xs" />
<Calendar size="sm" />
<Calendar size="md" />
<Calendar size="lg" />
<Calendar size="xl" />
```

## 日期格式

日历支持自定义日期格式。

```tsx
<Calendar format="YYYY-MM-DD" />
<Calendar format="MM/DD/YYYY" />
<Calendar format="DD/MM/YYYY" />
```

## 禁用日期

可以禁用特定日期。

```tsx
// 禁用周末
<Calendar disabled={(date) => date.getDay() === 0 || date.getDay() === 6} />

// 禁用特定日期
<Calendar disabled={(date) => date < new Date()} />
```

## 特殊标记

可以为特定日期添加标记。

```tsx
<Calendar
  markedDates={{
    '2024-01-01': { selected: true, marked: true, dotColor: 'red' },
    '2024-01-15': { selected: true, marked: true },
    '2024-01-20': { disabled: true }
  }}
/>
```

## 自定义渲染

可以自定义日期单元格的渲染。

```tsx
<Calendar
  renderDay={(date) => (
    <div style={{ color: date.getDay() === 0 ? 'red' : 'black' }}>
      {date.getDate()}
    </div>
  )}
/>
```

## 最小和最大日期

可以设置日期选择范围。

```tsx
<Calendar
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
/>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | Date \| Date[] \| null | null | 当前选中日期 |
| defaultValue | Date \| Date[] \| null | null | 默认选中日期 |
| mode | 'month' \| 'year' \| 'week' \| 'time' | 'month' | 显示模式 |
| selectionMode | 'single' \| 'multiple' \| 'range' | 'single' | 选择模式 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 日历尺寸 |
| format | string | 'YYYY-MM-DD' | 日期格式 |
| disabled | boolean \| (date: Date) => boolean | false | 是否禁用 |
| minDate | Date \| null | null | 最小日期 |
| maxDate | Date \| null | null | 最大日期 |
| markedDates | Record<string, any> | {} | 特殊日期标记 |
| firstDayOfWeek | number | 0 | 每周第一天 (0-6, 0=周日) |
| showWeekNumbers | boolean | false | 是否显示周数 |
| showMonthSelector | boolean | true | 是否显示月份选择器 |
| showYearSelector | boolean | true | 是否显示年份选择器 |
| renderDay | (date: Date) => ReactNode | - | 自定义日期渲染 |
| renderHeader | (date: Date) => ReactNode | - | 自定义头部渲染 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (date: Date \| Date[] \| null) => void | 日期变化事件 |
| onDayPress | (date: Date) => void | 日期点击事件 |
| onMonthChange | (date: Date) => void | 月份变化事件 |
| onYearChange | (date: Date) => void | 年份变化事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getValue | - | Date \| Date[] \| null | 获取当前值 |
| setValue | (date: Date \| Date[] \| null) => void | void | 设置当前值 |
| getMonth | - | Date | 获取当前月份 |
| setMonth | (date: Date) => void | void | 设置当前月份 |
| getSelectedDates | - | Date[] | 获取选中日期 |
| clearSelection | - | void | 清除选择 |

## 样式定制

### CSS 变量

```css
:root {
  --calendar-bg-color: #ffffff;
  --calendar-text-color: #111827;
  --calendar-border-color: #e5e7eb;
  --calendar-header-bg-color: #f9fafb;
  --calendar-weekend-color: #ef4444;
  --calendar-selected-bg-color: #3b82f6;
  --calendar-selected-text-color: #ffffff;
  --calendar-today-bg-color: #dbeafe;
  --calendar-today-text-color: #1d4ed8;
  --calendar-disabled-color: #9ca3af;
  --calendar-marked-color: #f59e0b;
}
```

## 最佳实践

1. **选择合适的模式**：根据使用场景选择单选、多选或范围选择
2. **设置合理的范围**：使用 `minDate` 和 `maxDate` 限制用户选择范围
3. **提供视觉反馈**：使用特殊标记突出重要日期
4. **优化移动端体验**：在移动端使用较大的点击区域

## 注意事项

1. 日历组件基于 Taro 的 `View` 和 `Text` 组件封装
2. 日期格式使用 moment.js 或 day.js 的格式
3. 大量日期渲染可能影响性能，建议虚拟化
4. 在受控模式下，必须处理 `onChange` 事件