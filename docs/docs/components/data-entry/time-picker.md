# TimePicker 组件

TimePicker 组件是一个时间选择器组件，用于选择时间或时间范围，支持多种格式、范围选择、禁用时间等功能，适用于需要用户选择时间的场景。

## 基本使用

### 基础时间选择器

```tsx
<TimePicker placeholder="请选择时间" />
```

### 受控模式

```tsx
<TimePicker 
  value={time} 
  onChange={(e) => setTime(e.detail.value)} 
  placeholder="请选择时间" 
/>
```

### 时间范围选择器

```tsx
<TimePicker 
  type="timerange" 
  placeholder={['开始时间', '结束时间']} 
/>
```

### 禁用状态

```tsx
<TimePicker 
  disabled 
  placeholder="禁用状态" 
/>
```

### 自定义格式

```tsx
<TimePicker 
  format="HH:mm:ss" 
  placeholder="自定义格式" 
/>
```

### 带秒选择器

```tsx
<TimePicker 
  showSecond 
  placeholder="带秒选择器" 
/>
```

### 自定义小时范围

```tsx
<TimePicker 
  hourStep={2} 
  placeholder="自定义小时步长" 
/>
```

### 自定义分钟范围

```tsx
<TimePicker 
  minuteStep={5} 
  placeholder="自定义分钟步长" 
/>
```

### 自定义秒范围

```tsx
<TimePicker 
  secondStep={10} 
  placeholder="自定义秒步长" 
  showSecond 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `string` \| `string[]` | - | 选中的值（受控模式） |
| defaultValue | `string` \| `string[]` | - | 默认选中的值（非受控模式） |
| type | `string` | `'time'` | 选择器类型，可选值：`time`、`timerange` |
| format | `string` | - | 时间格式 |
| placeholder | `string` \| `string[]` | - | 占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| showSecond | `boolean` | `false` | 是否显示秒选择器 |
| hourStep | `number` | `1` | 小时步长 |
| minuteStep | `number` | `1` | 分钟步长 |
| secondStep | `number` | `1` | 秒步长 |
| disabledHours | `() => number[]` | - | 禁用小时函数 |
| disabledMinutes | `(hour: number) => number[]` | - | 禁用分钟函数 |
| disabledSeconds | `(hour: number, minute: number) => number[]` | - | 禁用秒函数 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: string \| string[] } }) => void` | - | 选中值变化回调 |
| onFocus | `() => void` | - | 聚焦回调 |
| onBlur | `() => void` | - | 失焦回调 |
| onOpen | `() => void` | - | 下拉框打开回调 |
| onClose | `() => void` | - | 下拉框关闭回调 |

## 类型定义

```tsx
// TimePicker 组件属性接口
export interface TimePickerProps {
  value?: string | string[];
  defaultValue?: string | string[];
  type?: 'time' | 'timerange';
  format?: string;
  placeholder?: string | string[];
  disabled?: boolean;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
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
import { TimePicker, Space, View, Text, Button } from 'taro-uno-ui';
import { useState } from 'react';

const TimePickerExample = () => {
  // 受控模式状态
  const [time, setTime] = useState('');
  const [timeRange, setTimeRange] = useState<string[]>([]);

  // 禁用小时函数
  const disabledHours = () => {
    // 禁用当前小时之前的小时
    const currentHour = new Date().getHours();
    return Array.from({ length: currentHour }, (_, i) => i);
  };

  // 禁用分钟函数
  const disabledMinutes = (hour: number) => {
    // 如果是当前小时，禁用当前分钟之前的分钟
    const currentHour = new Date().getHours();
    if (hour === currentHour) {
      const currentMinute = new Date().getMinutes();
      return Array.from({ length: currentMinute }, (_, i) => i);
    }
    return [];
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础时间选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker placeholder="请选择时间" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker 
          value={time} 
          onChange={(e) => setTime(e.detail.value as string)} 
          placeholder="请选择时间" 
        />
        <Text>选中时间：{time || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>时间范围选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker 
          type="timerange" 
          placeholder={['开始时间', '结束时间']} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控时间范围选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker 
          type="timerange" 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.detail.value as string[])} 
          placeholder={['开始时间', '结束时间']} 
        />
        <Text>选中范围：{timeRange.join(' 至 ') || '未选择'}</Text>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用状态</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker disabled placeholder="禁用状态" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带秒选择器</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker showSecond placeholder="带秒选择器" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义步长</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker hourStep={2} placeholder="小时步长为2" />
        <TimePicker minuteStep={5} placeholder="分钟步长为5" />
        <TimePicker secondStep={10} showSecond placeholder="秒步长为10" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>禁用时间</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker 
          disabledHours={disabledHours} 
          disabledMinutes={disabledMinutes} 
          placeholder="禁用当前时间之前的时间" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义格式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <TimePicker 
          format="HH时mm分" 
          placeholder="自定义格式" 
        />
        <TimePicker 
          format="HH:mm:ss" 
          showSecond 
          placeholder="带秒的自定义格式" 
        />
      </Space>
    </View>
  );
};

export default TimePickerExample;
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

1. **选择器类型**：支持时间和时间范围两种类型，通过 type 属性控制。
2. **受控模式**：推荐使用受控模式，通过 value 和 onChange 属性来控制选中的值。
3. **时间格式**：可以通过 format 属性自定义时间显示格式，支持多种时间格式化字符串。
4. **秒选择器**：设置 showSecond 为 true 时，时间选择器会显示秒选择器。
5. **自定义步长**：可以通过 hourStep、minuteStep、secondStep 属性自定义时间选择的步长。
6. **禁用时间**：通过 disabledHours、disabledMinutes、disabledSeconds 函数可以自定义禁用的时间，适用于需要限制用户选择特定时间的场景。
7. **禁用状态**：设置 disabled 为 true 时，时间选择器不可点击，样式会变为灰色。
8. **性能优化**：时间选择器组件使用了 memo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [DatePicker 组件](#/components/form/date-picker) - 用于选择日期或日期时间
- [Select 组件](#/components/form/select) - 用于普通选择器
- [Form 组件](#/components/form/form) - 用于表单管理
