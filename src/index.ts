/**
 * Taro-Uno UI 组件库统一导出文件
 * 提供完整的组件库访问接口
 */

// 基础组件
export { Button } from './components/basic/Button';
export type { ButtonProps, ButtonRef } from './components/basic/Button/Button.types';
export { Icon } from './components/basic/Icon';
export type { IconProps, IconRef } from './components/basic/Icon/Icon.types';
export { Text } from './components/basic/Text';
export type { TextProps, TextRef } from './components/basic/Text/Text.types';
export { Divider } from './components/basic/Divider';
export type { DividerProps, DividerRef } from './components/basic/Divider/Divider.types';
export { Typography } from './components/basic/Typography';
export type { TypographyProps, TypographyRef } from './components/basic/Typography/Typography.types';
export { default as Video } from './components/basic/Video';
export type { VideoProps } from './components/basic/Video/Video.types';
export { VideoSize, VideoVariant, VideoStatus, PlayMode, LoopMode, PlaybackRate, ControlsPosition, VideoErrorCode } from './components/basic/Video/Video.types';

// 显示组件
export { Avatar } from './components/display/Avatar';
export type { AvatarProps, AvatarRef } from './components/display/Avatar/Avatar.types';
export { Badge } from './components/display/Badge';
export type { BadgeProps, BadgeRef } from './components/display/Badge/Badge.types';
export { Card } from './components/display/Card';
export type { CardProps, CardRef } from './components/display/Card/Card.types';
export { List } from './components/display/List';
export type { ListProps, ListRef } from './components/display/List/List.types';
export { Rate } from './components/display/Rate';
export type { RateProps, RateRef } from './components/display/Rate/Rate.types';
export { Table } from './components/display/Table';
export type { TableProps, TableRef } from './components/display/Table/Table.types';
export { Tag } from './components/display/Tag';
export type { TagProps, TagRef } from './components/display/Tag/Tag.types';
export { Timeline } from './components/display/Timeline';
export type { TimelineProps, TimelineRef } from './components/display/Timeline/Timeline.types';
export { Calendar } from './components/display/Calendar';
export type { CalendarProps, CalendarRef } from './components/display/Calendar/Calendar.types';
export { Carousel } from './components/display/Carousel';
export type { CarouselProps, CarouselRef } from './components/display/Carousel/Carousel.types';

// 反馈组件
export { Modal } from './components/feedback/Modal';
export type { ModalProps, ModalRef } from './components/feedback/Modal/Modal.types';
export { Message } from './components/feedback/Message';
export type { MessageProps, MessageRef } from './components/feedback/Message/Message.types';
export { Notification } from './components/feedback/Notification';
export type { NotificationProps, NotificationRef } from './components/feedback/Notification/Notification.types';
export { Loading } from './components/feedback/Loading';
export type { LoadingProps, LoadingRef } from './components/feedback/Loading/Loading.types';
export { Progress } from './components/feedback/Progress';
export type { ProgressProps, ProgressRef } from './components/feedback/Progress/Progress.types';
export { Tooltip } from './components/feedback/Tooltip';
export type { TooltipProps, TooltipRef } from './components/feedback/Tooltip/Tooltip.types';
export { Result } from './components/feedback/Result';
export type { ResultProps, ResultRef } from './components/feedback/Result/Result.types';

// 表单组件
export { Form } from './components/form/Form';
export type { FormProps, FormRef } from './components/form/Form/Form.types';
export { Input } from './components/form/Input';
export type { InputProps, InputRef } from './components/form/Input/Input.types';
export { Select } from './components/form/Select';
export type { SelectProps, SelectRef } from './components/form/Select/Select.types';
export { DatePicker } from './components/form/DatePicker';
export type { DatePickerProps, DatePickerRef } from './components/form/DatePicker/DatePicker.types';
export { TimePicker } from './components/form/TimePicker';
export type { TimePickerProps, TimePickerRef, TimeValue } from './components/form/TimePicker/TimePicker.types';
export { Radio } from './components/form/Radio';
export type { RadioProps, RadioRef } from './components/form/Radio/Radio.types';
export { Checkbox } from './components/form/Checkbox';
export type { CheckboxProps, CheckboxRef } from './components/form/Checkbox/Checkbox.types';
export { Switch } from './components/form/Switch';
export type { SwitchProps, SwitchRef } from './components/form/Switch/Switch.types';
export { Slider } from './components/form/Slider';
export type { SliderProps, SliderRef } from './components/form/Slider/Slider.types';
export { Textarea } from './components/form/Textarea';
export type { TextareaProps, TextareaRef } from './components/form/Textarea/Textarea.types';
export { InputNumber } from './components/form/InputNumber';
export type { InputNumberProps, InputNumberRef } from './components/form/InputNumber/InputNumber.types';
export { Cascader } from './components/form/Cascader';
export type { CascaderProps, CascaderRef } from './components/form/Cascader/Cascader.types';
export { Transfer } from './components/form/Transfer';
export type { TransferProps, TransferRef } from './components/form/Transfer/Transfer.types';

// 布局组件
export { Grid } from './components/layout/Grid';
export type { GridProps, GridRef } from './components/layout/Grid/Grid.types';
export { Layout } from './components/layout/Layout';
export type { LayoutProps, LayoutRef } from './components/layout/Layout/Layout.types';
export { Space } from './components/layout/Space';
export type { SpaceProps, SpaceRef } from './components/layout/Space/Space.types';
export { Affix } from './components/layout/Affix';
export type { AffixProps, AffixRef } from './components/layout/Affix/Affix.types';
export { Row } from './components/layout/Row';
export type { RowProps, RowRef } from './components/layout/Row/Row.types';
export { Col } from './components/layout/Col';
export type { ColProps, ColRef } from './components/layout/Col/Col.types';
export { Container } from './components/layout/Container';
export type { ContainerProps, ContainerRef } from './components/layout/Container/Container.types';

// 导航组件
export { Menu } from './components/navigation/Menu';
export type { MenuProps, MenuRef } from './components/navigation/Menu/Menu.types';
export { Tabs } from './components/navigation/Tabs';
export type { TabsProps, TabsRef } from './components/navigation/Tabs/Tabs.types';
export { Pagination } from './components/navigation/Pagination';
export type { PaginationProps, PaginationRef } from './components/navigation/Pagination/Pagination.types';
export { NavBar } from './components/navigation/NavBar';
export type { NavBarProps, NavBarRef } from './components/navigation/NavBar/NavBar.types';
export { Steps } from './components/navigation/Steps';
export type { StepsProps, StepsRef } from './components/navigation/Steps/Steps.types';

// 工具函数
export * from './utils/index';

// 类型定义
export * from './types/index';

// 钩子
export * from './hooks/index';

// Provider
export { AppProvider, useAppContext } from './providers';

// 主题系统
export { ThemeProvider, useTheme, useThemeUtils } from './theme/ThemeProvider';
export type {
  ThemeMode,
  ThemeConfig,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeBorderRadius,
  ThemeShadow,
  ThemeAnimation,
} from './theme/types';

// 设计系统
export { designSystem, DesignSystemUtils } from './theme/design-system';
export { default as defaultDesignTokens } from './theme/design-tokens';

// RTL支持
export {
  isRTL,
  applyRTLStyles,
  getRTLConfig,
  generateRTLVariables,
  generateRTLClasses,
  useRTLDetection,
  toggleRTL,
  getDirectionalStyles,
  getRTLValue,
  applyRTLClasses,
  createRTLCSS,
} from './utils/rtl-support';

// 主题和国际化组件
// 示例页面

// 懒加载组件导出暂时禁用，等待工具文件完善

// 组件库版本
export const VERSION = '1.0.0';

// 组件库配置
export const CONFIG = {
  version: VERSION,
  theme: 'light',
  platform: 'taro',
  components: {
    basic: ['Button', 'Icon', 'Text', 'Divider', 'Typography', 'Video'],
    display: ['Avatar', 'Badge', 'Card', 'List', 'Rate', 'Table', 'Tag', 'Timeline', 'Calendar', 'Carousel'],
    feedback: ['Modal', 'Message', 'Notification', 'Loading', 'Progress', 'Tooltip', 'Result'],
    form: [
      'Form',
      'Input',
      'Select',
      'DatePicker',
      'TimePicker',
      'Radio',
      'Checkbox',
      'Switch',
      'Slider',
      'Textarea',
      'InputNumber',
      'Cascader',
      'Transfer',
    ],
    layout: ['Grid', 'Layout', 'Space', 'Affix', 'Row', 'Col', 'Container'],
    navigation: ['Menu', 'Tabs', 'Pagination', 'NavBar', 'Steps'],
  },
};

// 组件库工具函数
export const ComponentLibraryUtils = {
  /**
   * 获取组件库版本
   */
  getVersion: (): string => VERSION,

  /**
   * 获取组件库配置
   */
  getConfig: () => CONFIG,

  /**
   * 检查组件是否存在
   */
  hasComponent: (componentName: string): boolean => {
    return Object.values(CONFIG.components).flat().includes(componentName);
  },

  /**
   * 获取组件分类
   */
  getComponentCategory: (componentName: string): string | null => {
    for (const [category, components] of Object.entries(CONFIG.components)) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    return null;
  },

  /**
   * 获取所有组件列表
   */
  getAllComponents: (): string[] => {
    return Object.values(CONFIG.components).flat();
  },

  /**
   * 获取分类组件列表
   */
  getCategoryComponents: (category: string): string[] => {
    return CONFIG.components[category as keyof typeof CONFIG.components] || [];
  },
};

// 导入所有组件用于默认导出
import * as BasicComponents from './components/basic';
import * as DisplayComponents from './components/display';
import * as FeedbackComponents from './components/feedback';
import * as FormComponents from './components/form';
import * as LayoutComponents from './components/layout';
import * as NavigationComponents from './components/navigation';
import VideoComponent from './components/basic/Video';

// 懒加载工具暂时禁用

// 简化的默认导出
export default {
  // 基础组件
  Button: BasicComponents.Button,
  Icon: BasicComponents.Icon,
  Text: BasicComponents.Text,
  Divider: BasicComponents.Divider,
  Typography: BasicComponents.Typography,
  Video: VideoComponent,

  // 显示组件
  Avatar: DisplayComponents.Avatar,
  Badge: DisplayComponents.Badge,
  Card: DisplayComponents.Card,
  List: DisplayComponents.List,
  Rate: DisplayComponents.Rate,
  Table: DisplayComponents.Table,
  Tag: DisplayComponents.Tag,
  Timeline: DisplayComponents.Timeline,
  Calendar: DisplayComponents.Calendar,
  Carousel: DisplayComponents.Carousel,

  // 反馈组件
  Modal: FeedbackComponents.Modal,
  Message: FeedbackComponents.Message,
  Notification: FeedbackComponents.Notification,
  Loading: FeedbackComponents.Loading,
  Progress: FeedbackComponents.Progress,
  Tooltip: FeedbackComponents.Tooltip,
  Result: FeedbackComponents.Result,

  // 表单组件
  Form: FormComponents.Form,
  Input: FormComponents.Input,
  Select: FormComponents.Select,
  DatePicker: FormComponents.DatePicker,
  TimePicker: FormComponents.TimePicker,
  Radio: FormComponents.Radio,
  Checkbox: FormComponents.Checkbox,
  Switch: FormComponents.Switch,
  Slider: FormComponents.Slider,
  Textarea: FormComponents.Textarea,
  InputNumber: FormComponents.InputNumber,
  Cascader: FormComponents.Cascader,
  Transfer: FormComponents.Transfer,

  // 布局组件
  Grid: LayoutComponents.Grid,
  Layout: LayoutComponents.Layout,
  Space: LayoutComponents.Space,
  Affix: LayoutComponents.Affix,
  Row: LayoutComponents.Row,
  Col: LayoutComponents.Col,
  Container: LayoutComponents.Container,

  // 导航组件
  Menu: NavigationComponents.Menu,
  Tabs: NavigationComponents.Tabs,
  Pagination: NavigationComponents.Pagination,
  NavBar: NavigationComponents.NavBar,
  Steps: NavigationComponents.Steps,

  // 工具函数
  Utils: ComponentLibraryUtils,

  // 配置
  CONFIG,
  VERSION,

  // 懒加载组件暂时禁用
};
