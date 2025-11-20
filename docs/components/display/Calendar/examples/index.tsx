import React from 'react';
import { View, Text } from '@tarojs/components';
import { Calendar } from '@taro-uno/ui';

// 基本日历示例
export const CalendarBasic = () => {
  return (
    <View>
      <Text>基本日历</Text>
      <Calendar />
    </View>
  );
};

// 带日期选择功能示例
export const CalendarWithSelection = () => {
  const handleSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  return (
    <View>
      <Text>带日期选择功能</Text>
      <Calendar onSelect={handleSelect} />
    </View>
  );
};

// 设置默认选中日期示例
export const CalendarWithDefaultDate = () => {
  return (
    <View>
      <Text>设置默认选中日期</Text>
      <Calendar defaultValue={new Date('2023-10-15')} />
    </View>
  );
};

// 禁用特定日期示例
export const CalendarWithDisabledDates = () => {
  const handleDisabledDate = (date: Date) => {
    // 禁用过去的日期
    return date < new Date();
  };

  return (
    <View>
      <Text>禁用特定日期</Text>
      <Calendar disabledDate={handleDisabledDate} />
    </View>
  );
};

// 显示事件示例
export const CalendarWithEvents = () => {
  const events = [
    {
      id: '1',
      title: '会议',
      startTime: '2023-10-15T10:00:00',
      color: '#ff4d4f'
    },
    {
      id: '2',
      title: '生日',
      startTime: '2023-10-20T18:00:00',
      color: '#52c41a'
    },
    {
      id: '3',
      title: '工作坊',
      startTime: '2023-10-15T14:00:00',
      color: '#1890ff'
    }
  ];

  return (
    <View>
      <Text>显示事件</Text>
      <Calendar showEvents events={events} />
    </View>
  );
};

// 自定义日期渲染示例
export const CalendarWithCustomRender = () => {
  const handleDateRender = (date: any) => {
    if (date.isToday) {
      return (
        <View style={{ backgroundColor: '#1890ff', color: '#fff', borderRadius: '50%', textAlign: 'center', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {date.day}
        </View>
      );
    }
    return date.day;
  };

  return (
    <View>
      <Text>自定义日期渲染</Text>
      <Calendar dateRender={handleDateRender} />
    </View>
  );
};

// 隐藏今天按钮示例
export const CalendarWithoutTodayButton = () => {
  return (
    <View>
      <Text>隐藏今天按钮</Text>
      <Calendar showToday={false} />
    </View>
  );
};

// 初始年视图示例
export const CalendarWithYearMode = () => {
  return (
    <View>
      <Text>初始年视图</Text>
      <Calendar mode="year" />
    </View>
  );
};

// 综合示例
export const CalendarComprehensive = () => {
  const events = [
    {
      id: '1',
      title: '项目启动会',
      startTime: '2023-10-10T09:00:00',
      endTime: '2023-10-10T11:00:00',
      color: '#ff7875',
      type: 'danger'
    },
    {
      id: '2',
      title: '团队建设',
      startTime: '2023-10-15T14:00:00',
      endTime: '2023-10-15T17:00:00',
      color: '#52c41a',
      type: 'success'
    },
    {
      id: '3',
      title: '产品评审',
      startTime: '2023-10-20T10:00:00',
      endTime: '2023-10-20T12:00:00',
      color: '#1890ff',
      type: 'primary'
    },
    {
      id: '4',
      title: '代码评审',
      startTime: '2023-10-25T13:00:00',
      endTime: '2023-10-25T15:00:00',
      color: '#faad14',
      type: 'warning'
    }
  ];

  const handleDisabledDate = (date: Date) => {
    // 禁用过去的日期和周末
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date < today || dayOfWeek === 0 || dayOfWeek === 6;
  };

  const handleDateRender = (date: any) => {
    if (date.isSelected) {
      return (
        <View style={{ backgroundColor: '#1890ff', color: '#fff', borderRadius: '50%', textAlign: 'center', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {date.day}
        </View>
      );
    }
    if (date.isToday) {
      return (
        <View style={{ backgroundColor: '#f0f0f0', borderRadius: '50%', textAlign: 'center', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {date.day}
        </View>
      );
    }
    if (date.disabled) {
      return (
        <View style={{ color: '#d9d9d9', textAlign: 'center', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {date.day}
        </View>
      );
    }
    return date.day;
  };

  const handleSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  const handleModeChange = (mode: 'month' | 'year') => {
    console.log('Mode changed:', mode);
  };

  return (
    <View>
      <Text>综合示例</Text>
      <Calendar
        showEvents
        events={events}
        disabledDate={handleDisabledDate}
        dateRender={handleDateRender}
        onSelect={handleSelect}
        onModeChange={handleModeChange}
        defaultValue={new Date('2023-10-10')}
      />
    </View>
  );
};

export default {
  CalendarBasic,
  CalendarWithSelection,
  CalendarWithDefaultDate,
  CalendarWithDisabledDates,
  CalendarWithEvents,
  CalendarWithCustomRender,
  CalendarWithoutTodayButton,
  CalendarWithYearMode,
  CalendarComprehensive
};