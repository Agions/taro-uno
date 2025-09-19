// 导出 Avatar 组件
export { Avatar } from './Avatar';

// 导出 Badge 组件
export { Badge } from './Badge';

// 导出 Card 组件
export { Card } from './Card';

// 导出 List 组件
export { List } from './List';

// 导出 Rate 组件
export { Rate } from './Rate';

// 导出 Table 组件
export { default as Table } from './Table';

// 导出 Tag 组件
export { Tag } from './Tag';

// 导出 Timeline 组件
export { Timeline } from './Timeline';

// 导出 Calendar 组件
export { Calendar } from './Calendar';

// 导出 Carousel 组件
export { Carousel } from './Carousel';

// 导出类型定义
export type { CardProps, CardRef } from './Card';
export type { ListProps, ListRef, ListItemProps } from './List';
export type { RateProps, RateRef, RateSize, RateCharacter, StarState } from './Rate';
export type { TagProps, TagRef } from './Tag';
export type { TimelineProps, TimelineRef, TimelineItemProps } from './Timeline';
export type { CalendarProps, CalendarRef, CalendarDate, CalendarEvent } from './Calendar';
export type { CarouselProps, CarouselRef } from './Carousel';
export type {
  TableProps,
  TableRef,
  TableColumn,
  TableSortOrder,
  TableFilterConfig,
  TableAlign,
  TableSize,
  TableBorder,
  TableRowSelection,
  TablePagination,
  TableExpandable,
} from './Table';

// 导出样式
export { CardStyles as cardStyles } from './Card/Card.styles';
export { ListStyles as listStyles } from './List/List.styles';
export { rateStyles } from './Rate/Rate.styles';
export { tagStyles } from './Tag/Tag.styles';
export { timelineStyles } from './Timeline/Timeline.styles';
export { calendarStyles } from './Calendar/Calendar.styles';
export { carouselStyles } from './Carousel/Carousel.styles';
export { tableStyles } from './Table/Table.styles';

// 展示组件工具函数
export const DisplayUtils = {
  /**
   * 格式化卡片数据
   */
  formatCardData: (data: any) => {
    return {
      ...data,
      formattedDate: new Date().toLocaleDateString(),
    };
  },

  /**
   * 格式化表格数据
   */
  formatTableData: (data: any[], columns: any[]) => {
    return data.map(item => {
      const formattedItem: any = {};
      columns.forEach(column => {
        formattedItem[column.key] = item[column.key];
      });
      return formattedItem;
    });
  },

  /**
   * 格式化列表数据
   */
  formatListData: (data: any[]) => {
    return data.map((item, index) => ({
      ...item,
      id: item.id || index,
      key: item.key || index,
    }));
  },

  /**
   * 格式化标签数据
   */
  formatTagData: (tags: string[], colorMap?: Record<string, string>) => {
    return tags.map((tag, index) => ({
      key: index,
      label: tag,
      color: colorMap?.[tag] || 'default',
    }));
  },

  /**
   * 格式化时间线数据
   */
  formatTimelineData: (items: any[]) => {
    return items.map((item, index) => ({
      ...item,
      key: item.key || index,
      timestamp: item.timestamp || new Date().toISOString(),
    }));
  },

  /**
   * 格式化日历事件
   */
  formatCalendarEvents: (events: any[]) => {
    return events.map((event, index) => ({
      ...event,
      id: event.id || `event-${index}`,
      startTime: event.startTime || new Date().toISOString(),
      type: event.type || 'default',
    }));
  },

  /**
   * 格式化轮播数据
   */
  formatCarouselData: (items: any[]) => {
    return items.map((item, index) => ({
      ...item,
      key: item.key || index,
      id: item.id || `slide-${index}`,
    }));
  },
};
