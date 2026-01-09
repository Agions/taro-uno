/**
 * Taro-Uno RichText Component
 * 富文本展示组件统一导出文件
 */

// 组件命名导出
export { RichText } from './RichText';

// 类型导出
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
} from './RichText.types';

// 样式导出
export { 
  BaseStyles, 
  getHeadingStyle, 
  getListStyle, 
  mergeStyles, 
  transformTextStyle, 
  transformImageStyle, 
} from './RichText.styles';

// 默认导出
import RichTextWithDefaults from './RichText';
export default RichTextWithDefaults;
