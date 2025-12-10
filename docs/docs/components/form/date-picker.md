# DatePicker 组件

DatePicker 组件是一个日期选择器组件，用于选择日期或日期范围，支持多种格式、范围选择、禁用日期等功能，适用于需要用户选择日期的场景。

## 基本使用

### 基础日期选择器

```tsx
<DatePicker placeholder="请选择日期" />
```

### 受控模式

```tsx
<DatePicker 
  value={date} 
  onChange={(e) => setDate(e.detail.value)} 
  placeholder="请选择日期" 
/>
```

### 日期时间选择器

```tsx
<DatePicker 
  type="datetime" 
  placeholder="请选择日期时间" 
/>
```

### 月份选择器

```tsx
<DatePicker 
  type="month" 
  placeholder="请选择月份" 
/>
```

### 年份选择器

```tsx
<DatePicker 
  type="year" 
  placeholder="请选择年份" 
/>
```

### 日期范围选择器

```tsx
<DatePicker 
  type="daterange" 
  placeholder={['开始日期', '结束日期']} 
/>
```

### 日期时间范围选择器

```tsx
<DatePicker 
  type="datetimerange" 
  placeholder={['开始日期时间', '结束日期时间']} 
/>
```

### 禁用状态

```tsx
<DatePicker 
  disabled 
  placeholder="禁用状态" 
/>
```

### 自定义格式

```tsx
<DatePicker 
  format="YYYY-MM-DD HH:mm:ss" 
  placeholder="自定义格式" 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `string` \| `string[]` | - | 选中的值（受控模式） |
| defaultValue | `string` \| `string[]` | - | 默认选中的值（非受控模式） |
| type | `string` | `'date'` | 选择器类型，可选值：`date`、`datetime`、`month`、`year`、`daterange`、`datetimerange` |
| format | `string` | - | 日期格式 |
| placeholder | `string` \| `string[]` | - | 占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| disabledDate | `(current: Date) => boolean` | - | 禁用日期函数 |
| disabledTime | `(current: Date) => { disabledHours?: () => number[]; disabledMinutes?: (hour: number) => number[]; disabledSeconds?: (hour: number, minute: number) => number[]; }` | - | 禁用时间函数 |
| showTime | `boolean` | `false` | 是否显示时间选择器 |
| showToday | `boolean` | `true` | 是否显示今天按钮 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: string \| string[] } }) => void` | - | 选中值变化回调 |
| onFocus | `() => void` | - | 聚焦回调 |
| onBlur | `() => void` | - | 失焦回调 |
| onOpen | `() => void` | - | 下拉框打开回调 |
| onClose | `() => void` | - | 下拉框关闭回调 |

## 类型定义

```tsx
// DatePicker 组件属性接口
export interface DatePickerProps {
  value?: string | string[];
  defaultValue?: string | string[];
  type?: 'date' | 'datetime' | 'month' | 'year' | 'daterange' | 'datetimerange';
  format?: string;
  placeholder?: string | string[];
  disabled?: boolean;
  disabledDate?: (current: Date) => boolean;
  disabledTime?: (current: Date) => {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
  };
  showTime?: boolean;
  showToday?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { value: string | string[] } }) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}
```

## 示例代码

### 完整示例

```tsx
import { DatePicker, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const DatePickerExample = () => {
  // 受控模式状态
  const [date, setDate] = useState('');
  const [dateRange, setDateRange] = useState<string[]>([]);

  // 禁用日期函数
  const disabledDate = (current: Date) => {
    // 禁用今天之前的日期
    return current && current < new Date(Date.now() - 86400000);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础日期选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker placeholder="请选择日期" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker 
          value={date} 
          onChange={(e) => setDate(e.detail.value as string)} 
          placeholder="请选择日期" 
        />
        <Text>选中日期：{date || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同类型</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker type="datetime" placeholder="日期时间选择器" />
        <DatePicker type="month" placeholder="月份选择器" />
        <DatePicker type="year" placeholder="年份选择器" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>范围选择</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker 
          type="daterange" 
          placeholder={['开始日期', '结束日期']} 
        />
        <DatePicker 
          type="datetimerange" 
          placeholder={['开始日期时间', '结束日期时间']} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控范围选择</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker 
          type="daterange" 
          value={dateRange} 
          onChange={(e) => setDateRange(e.detail.value as string[])} 
          placeholder={['开始日期', '结束日期']} 
        />
        <Text>选中范围：{dateRange.join(' 至 ') || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker disabled placeholder="禁用状态" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用日期</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker 
          disabledDate={disabledDate} 
          placeholder="禁用今天之前的日期" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义格式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <DatePicker 
          format="YYYY年MM月DD日" 
          placeholder="自定义格式" 
        />
        <DatePicker 
          type="datetime" 
          format="YYYY-MM-DD HH:mm:ss" 
          placeholder="日期时间自定义格式" 
        />
      </Space>
    </View>
  );
};

export default DatePickerExample;
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

1. **选择器类型**：支持日期、日期时间、月份、年份、日期范围、日期时间范围等多种类型，通过 type 属性控制。
2. **受控模式**：推荐使用受控模式，通过 value 和 onChange 属性来控制选中的值。
3. **日期格式**：可以通过 format 属性自定义日期显示格式，支持多种日期格式化字符串。
4. **范围选择**：当 type 为 daterange 或 datetimerange 时，选择器支持范围选择，value 和 placeholder 为数组类型。
5. **禁用日期**：通过 disabledDate 函数可以自定义禁用的日期，适用于需要限制用户选择特定日期的场景。
6. **禁用状态**：设置 disabled 为 true 时，日期选择器不可点击，样式会变为灰色。
7. **性能优化**：日期选择器组件使用了 memo 优化，避免不必要的重渲染。
8. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [TimePicker 组件](#/components/form/time-picker) - 用于选择时间
- [Select 组件](#/components/form/select) - 用于普通选择器
- [Form 组件](#/components/form/form) - 用于表单管理
