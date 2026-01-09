/**
 * Taro-Uno 展示组件库
 * 提供用于展示内容的 UI 组件，包括头像、徽章、卡片、列表等
 */

// 导出 Avatar 组件
export { Avatar } from './Avatar';
export type { AvatarProps, AvatarRef, AvatarSize, AvatarShape } from './Avatar/Avatar.types';
export { avatarStyles } from './Avatar/Avatar.styles';

// 导出 Badge 组件
export { Badge } from './Badge';
export type { BadgeProps, BadgeRef } from './Badge/Badge.types';

// 导出 Card 组件
export { Card } from './Card';
export type { CardProps, CardRef } from './Card/Card.types';
export { CardStyles as cardStyles } from './Card/Card.styles';

// 导出 List 组件
export { List } from './List';
export type { ListProps, ListRef, ListItemProps } from './List/List.types';
export { ListStyles as listStyles } from './List/List.styles';

// 导出 Rate 组件
export { Rate } from './Rate';
export type { RateProps, RateRef, RateSize, RateCharacter, StarState } from './Rate/Rate.types';
export { rateStyles } from './Rate/Rate.styles';

// 导出 Table 组件
export { default as Table } from './Table';
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
} from './Table/Table.types';
export { tableStyles } from './Table/Table.styles';

// 导出 Tag 组件
export { Tag } from './Tag';
export type { TagProps, TagRef } from './Tag/Tag.types';
export { tagStyles } from './Tag/Tag.styles';

// 导出 Timeline 组件
export { Timeline } from './Timeline';
export type { TimelineProps, TimelineRef, TimelineItemProps } from './Timeline/Timeline.types';
export { timelineStyles } from './Timeline/Timeline.styles';

// 导出 Calendar 组件
export { Calendar } from './Calendar';
export type { CalendarProps, CalendarRef, CalendarDate, CalendarEvent } from './Calendar/Calendar.types';
export { calendarStyles } from './Calendar/Calendar.styles';

// 导出 Carousel 组件
export { Carousel } from './Carousel';
export type { CarouselProps, CarouselRef } from './Carousel/Carousel.types';
export { carouselStyles } from './Carousel/Carousel.styles';

// 导出 RichText 组件
export { RichText } from './RichText';
export type {
  RichTextProps,
  RichTextRef,
  RichTextNode,
  RichTextStyle,
  ParagraphStyle,
  ImageStyle,
  ListItem,
  TableCell,
  TableRow,
  RichTextTable,
  Link,
} from './RichText/RichText.types';
export {
  BaseStyles as richTextStyles,
  getHeadingStyle,
  getListStyle,
  mergeStyles as mergeRichTextStyles,
  transformTextStyle,
  transformImageStyle,
} from './RichText/RichText.styles';

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
    return data.map((item) => {
      const formattedItem: any = {};
      columns.forEach((column) => {
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
