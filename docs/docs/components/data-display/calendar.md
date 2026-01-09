# Calendar 组件

Calendar 组件是一个功能丰富的日历组件，支持月份和年份两种模式，支持日期选择、事件显示、自定义渲染等功能。

## 基本使用

### 基础日历

```tsx
<Calendar />
```

### 带初始日期的日历

```tsx
<Calendar defaultValue={new Date('2024-01-01')} />
```

### 带事件的日历

```tsx
<Calendar 
  showEvents 
  events={[
    {
      id: '1',
      title: '会议',
      startTime: '2024-01-10T09:00:00',
      endTime: '2024-01-10T10:00:00',
      color: '#ff6b6b',
    },
    {
      id: '2',
      title: '生日',
      startTime: '2024-01-15T18:00:00',
      endTime: '2024-01-15T20:00:00',
      color: '#4ecdc4',
    },
  ]} 
/>
```

### 禁用特定日期

```tsx
<Calendar 
  disabledDate={(date) => {
    // 禁用过去的日期
    return date < new Date();
  }} 
/>
```

### 年份模式

```tsx
<Calendar mode="year" />
```

### 自定义日期渲染

```tsx
<Calendar 
  dateRender={(date) => {
    return (
      <View>
        {date.day}
        {date.isToday && <span style={{ color: 'red' }}>•</span>}
        {date.events && date.events.length > 0 && (
          <span style={{ color: 'blue' }}>{date.events.length}</span>
        )}
      </View>
    );
  }} 
/>
```

### 带选择事件

```tsx
<Calendar 
  onSelect={(date) => {
    console.log('选中的日期:', date);
  }} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `Date` | - | 当前选中日期 |
| defaultValue | `Date` | - | 默认日期 |
| mode | `'month' \| 'year'` | `'month'` | 显示模式 |
| showToday | `boolean` | `true` | 是否显示今天按钮 |
| showEvents | `boolean` | `false` | 是否显示事件 |
| events | `CalendarEvent[]` | `[]` | 事件数据 |
| disabledDate | `(_date: Date) => boolean` | - | 禁用日期函数 |
| dateRender | `(_date: CalendarDate) => ReactNode` | - | 自定义日期渲染 |
| monthRender | `(_month: number, year: number) => ReactNode` | - | 自定义月份渲染 |
| onSelect | `(_date: Date) => void` | - | 日期选择事件 |
| onChange | `(_date: Date) => void` | - | 日期变化事件 |
| onModeChange | `(_mode: 'month' \| 'year') => void` | - | 模式变化事件 |
| style | `CSSProperties` | - | 自定义样式 |
| className | `string` | - | 自定义类名 |
| ariaLabel | `string` | - | 无障碍标签 |
| role | `string` | `'grid'` | 无障碍角色 |

## 类型定义

### CalendarEvent

```tsx
interface CalendarEvent {
  id: string;           // 事件ID
  title: string;        // 事件标题
  description?: string; // 事件描述
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'; // 事件类型
  color?: string;       // 事件颜色
  startTime?: string;   // 开始时间
  endTime?: string;     // 结束时间
}
```

### CalendarDate

```tsx
interface CalendarDate {
  year: number;         // 年份
  month: number;        // 月份 (1-12)
  day: number;          // 日期 (1-31)
  isCurrentMonth?: boolean; // 是否为当前月
  isToday?: boolean;    // 是否为今天
  isSelected?: boolean; // 是否被选中
  disabled?: boolean;   // 是否禁用
  events?: CalendarEvent[]; // 事件数据
}
```

### CalendarRef

```tsx
interface CalendarRef {
  element: any;           // DOM 元素
  getCurrentDate: () => Date; // 获取当前日期
  setDate: (date: Date) => void; // 设置日期
  getMode: () => 'month' | 'year'; // 获取显示模式
  setMode: (mode: 'month' | 'year') => void; // 设置显示模式
  goToToday: () => void; // 跳转到今天
  goPrev: () => void;    // 上一个月/年
  goNext: () => void;    // 下一个月/年
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onSelect | 日期选择事件 | `_date: Date` |
| onChange | 日期变化事件 | `_date: Date` |
| onModeChange | 模式变化事件 | `_mode: 'month' \| 'year'` |

## 示例代码

### 完整示例

```tsx
import { Calendar } from 'taro-uno-ui';
import { useState } from 'react';

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMode, setCurrentMode] = useState<'month' | 'year'>('month');
  
  const events = [
    {
      id: '1',
      title: '会议',
      startTime: '2024-01-10T09:00:00',
      endTime: '2024-01-10T10:00:00',
      color: '#ff6b6b',
    },
    {
      id: '2',
      title: '生日',
      startTime: '2024-01-15T18:00:00',
      endTime: '2024-01-15T20:00:00',
      color: '#4ecdc4',
    },
    {
      id: '3',
      title: '项目截止',
      startTime: '2024-01-20T23:59:59',
      endTime: '2024-01-20T23:59:59',
      color: '#ffe66d',
    },
  ];
  
  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('选中的日期:', date);
  };
  
  const handleModeChange = (mode: 'month' | 'year') => {
    setCurrentMode(mode);
    console.log('模式变化:', mode);
  };
  
  return (
    <View style={{ padding: '20px' }}>
      <View>基础日历</View>
      <Calendar 
        style={{ marginBottom: '20px' }}
        onSelect={handleSelect}
        onModeChange={handleModeChange}
      />
      
      <View>带事件的日历</View>
      <Calendar 
        showEvents 
        events={events} 
        style={{ marginBottom: '20px' }}
        onSelect={handleSelect}
      />
      
      <View>禁用过去日期的日历</View>
      <Calendar 
        disabledDate={(date) => {
          return date < new Date();
        }} 
        style={{ marginBottom: '20px' }}
        onSelect={handleSelect}
      />
      
      <View>年份模式</View>
      <Calendar 
        mode="year" 
        style={{ marginBottom: '20px' }}
        onModeChange={handleModeChange}
      />
      
      <View>自定义日期渲染</View>
      <Calendar 
        dateRender={(date) => {
          return (
            <View style={{ padding: '4px' }}>
              <View>{date.day}</View>
              {date.isToday && <View style={{ fontSize: '8px', color: 'red' }}>•</View>}
              {date.events && date.events.length > 0 && (
                <View style={{ fontSize: '8px', color: 'blue' }}>{date.events.length}</View>
              )}
            </View>
          );
        }} 
        showEvents 
        events={events} 
        onSelect={handleSelect}
      />
      
      <View style={{ marginTop: '20px' }}>
        <View>当前选中: {selectedDate ? selectedDate.toLocaleDateString() : '未选择'}</View>
        <View>当前模式: {currentMode}</View>
      </View>
    </View>
  );
};

export default CalendarExample;
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

1. **事件数据格式**：事件数据的 `startTime` 和 `endTime` 应该是标准的 ISO 8601 格式字符串。
2. **禁用日期**：`disabledDate` 函数接收一个 `Date` 对象，返回 `true` 表示禁用该日期。
3. **自定义渲染**：`dateRender` 和 `monthRender` 函数可以自定义日期和月份的渲染方式。
4. **无障碍访问**：组件默认设置了 `role="grid"`，可以通过 `ariaLabel` 和 `role` 属性自定义无障碍配置。
5. **主题支持**：组件支持深色主题，会根据主题自动调整样式。

## 相关组件

- [Badge 组件](#/components/display/badge) - 可用于标记特殊日期
- [List 组件](#/components/display/list) - 可用于显示日历事件列表
- [Modal 组件](#/components/feedback/modal) - 可用于显示详细的事件信息