/**
 * 无障碍组件包装器
 * 为 Taro 基础组件提供无障碍属性支持
 */

import { forwardRef } from 'react';
import { 
  View as TaroView, 
  Text as TaroText, 
  Button as TaroButton,
  Image as TaroImage,
  Input as TaroInput,
  ScrollView as TaroScrollView,
  Swiper as TaroSwiper,
  MovableView as TaroMovableView,
  MovableArea as TaroMovableArea,
  CoverView as TaroCoverView,
  CoverImage as TaroCoverImage,
  Icon as TaroIcon,
  RichText as TaroRichText,
  Textarea as TaroTextarea,
  Video as TaroVideo,
  Camera as TaroCamera,
  LivePlayer as TaroLivePlayer,
  LivePusher as TaroLivePusher,
  Map as TaroMap,
  Canvas as TaroCanvas,
  WebView as TaroWebView,
  Picker as TaroPicker,
  PickerView as TaroPickerView,
  Slider as TaroSlider,
  Switch as TaroSwitch,
  Radio as TaroRadio,
  RadioGroup as TaroRadioGroup,
  Checkbox as TaroCheckbox,
  CheckboxGroup as TaroCheckboxGroup,
  Label as TaroLabel,
  Form as TaroForm,
  Navigator as TaroNavigator,
  Audio as TaroAudio,
  OfficialAccount as TaroOfficialAccount,
  OpenData as TaroOpenData,
  NavigationBar as TaroNavigationBar,
  PageMeta as TaroPageMeta,
  PageContainer as TaroPageContainer,
  Ad as TaroAd,
  CustomWrapper as TaroCustomWrapper,
  Editor as TaroEditor
} from '@tarojs/components';

import type {
  ViewProps,
  TextProps,
  ButtonProps,
  ImageProps,
  InputProps,
  ScrollViewProps,
  SwiperProps,
  MovableViewProps,
  MovableAreaProps,
  CoverViewProps,
  CoverImageProps,
  IconProps,
  RichTextProps,
  TextareaProps,
  VideoProps,
  CameraProps,
  LivePlayerProps,
  LivePusherProps,
  MapProps,
  CanvasProps,
  WebViewProps,
  PickerViewProps,
  SliderProps,
  SwitchProps,
  RadioProps,
  RadioGroupProps,
  CheckboxProps,
  CheckboxGroupProps,
  LabelProps,
  FormProps,
  NavigatorProps,
  AudioProps,
  OfficialAccountProps,
  OpenDataProps,
  NavigationBarProps,
  PageMetaProps,
  PageContainerProps,
  AdProps,
  CustomWrapperProps,
  EditorProps,
  PickerSelectorProps,
  PickerTimeProps,
  PickerDateProps,
  PickerRegionProps,
  PickerMultiSelectorProps
} from '@tarojs/components';

// 基础组件包装器
export const View = forwardRef<any, ViewProps>((props, ref) => {
  return <TaroView ref={ref} {...props} />;
});

export const Text = forwardRef<any, TextProps>((props, ref) => {
  return <TaroText ref={ref} {...props} />;
});

export const Button = forwardRef<any, ButtonProps>((props, ref) => {
  return <TaroButton ref={ref} {...props} />;
});

export const Image = forwardRef<any, ImageProps>((props, ref) => {
  return <TaroImage ref={ref} {...props} />;
});

export const Input = forwardRef<any, InputProps>((props, ref) => {
  return <TaroInput ref={ref} {...props} />;
});

export const ScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  return <TaroScrollView ref={ref} {...props} />;
});

export const Swiper = forwardRef<any, SwiperProps>((props, ref) => {
  return <TaroSwiper ref={ref} {...props} />;
});

export const MovableView = forwardRef<any, MovableViewProps>((props, ref) => {
  return <TaroMovableView ref={ref} {...props} />;
});

export const MovableArea = forwardRef<any, MovableAreaProps>((props, ref) => {
  return <TaroMovableArea ref={ref} {...props} />;
});

export const CoverView = forwardRef<any, CoverViewProps>((props, ref) => {
  return <TaroCoverView ref={ref} {...props} />;
});

export const CoverImage = forwardRef<any, CoverImageProps>((props, ref) => {
  return <TaroCoverImage ref={ref} {...props} />;
});

export const Icon = forwardRef<any, IconProps>((props, ref) => {
  return <TaroIcon ref={ref} {...props} />;
});

export const RichText = forwardRef<any, RichTextProps>((props, ref) => {
  return <TaroRichText ref={ref} {...props} />;
});

export const Textarea = forwardRef<any, TextareaProps>((props, ref) => {
  return <TaroTextarea ref={ref} {...props} />;
});

export const Video = forwardRef<any, VideoProps>((props, ref) => {
  return <TaroVideo ref={ref} {...props} />;
});

export const Camera = forwardRef<any, CameraProps>((props, ref) => {
  return <TaroCamera ref={ref} {...props} />;
});

export const LivePlayer = forwardRef<any, LivePlayerProps>((props, ref) => {
  return <TaroLivePlayer ref={ref} {...props} />;
});

export const LivePusher = forwardRef<any, LivePusherProps>((props, ref) => {
  return <TaroLivePusher ref={ref} {...props} />;
});

export const Map = forwardRef<any, MapProps>((props, ref) => {
  return <TaroMap ref={ref} {...props} />;
});

export const Canvas = forwardRef<any, CanvasProps>((props, ref) => {
  return <TaroCanvas ref={ref} {...props} />;
});

export const WebView = forwardRef<any, WebViewProps>((props, ref) => {
  return <TaroWebView ref={ref} {...props} />;
});

export const Picker = forwardRef<any, PickerSelectorProps | PickerTimeProps | PickerDateProps | PickerRegionProps | PickerMultiSelectorProps>((props, ref) => {
  return <TaroPicker ref={ref} {...props} />;
});

export const PickerView = forwardRef<any, PickerViewProps>((props, ref) => {
  return <TaroPickerView ref={ref} {...props} />;
});

export const Slider = forwardRef<any, SliderProps>((props, ref) => {
  return <TaroSlider ref={ref} {...props} />;
});

export const Switch = forwardRef<any, SwitchProps>((props, ref) => {
  return <TaroSwitch ref={ref} {...props} />;
});

export const Radio = forwardRef<any, RadioProps>((props, ref) => {
  return <TaroRadio ref={ref} {...props} />;
});

export const RadioGroup = forwardRef<any, RadioGroupProps>((props, ref) => {
  return <TaroRadioGroup ref={ref} {...props} />;
});

export const Checkbox = forwardRef<any, CheckboxProps>((props, ref) => {
  return <TaroCheckbox ref={ref} {...props} />;
});

export const CheckboxGroup = forwardRef<any, CheckboxGroupProps>((props, ref) => {
  return <TaroCheckboxGroup ref={ref} {...props} />;
});

export const Label = forwardRef<any, LabelProps>((props, ref) => {
  return <TaroLabel ref={ref} {...props} />;
});

export const Form = forwardRef<any, FormProps>((props, ref) => {
  return <TaroForm ref={ref} {...props} />;
});

export const Navigator = forwardRef<any, NavigatorProps>((props, ref) => {
  return <TaroNavigator ref={ref} {...props} />;
});

export const Audio = forwardRef<any, AudioProps>((props, ref) => {
  return <TaroAudio ref={ref} {...props} />;
});

export const OfficialAccount = forwardRef<any, OfficialAccountProps>((props, ref) => {
  return <TaroOfficialAccount ref={ref} {...props} />;
});

export const OpenData = forwardRef<any, OpenDataProps>((props, ref) => {
  return <TaroOpenData ref={ref} {...props} />;
});

export const NavigationBar = forwardRef<any, NavigationBarProps>((props, ref) => {
  return <TaroNavigationBar ref={ref} {...props} />;
});

export const PageMeta = forwardRef<any, PageMetaProps>((props, ref) => {
  return <TaroPageMeta ref={ref} {...props} />;
});

export const PageContainer = forwardRef<any, PageContainerProps>((props, ref) => {
  return <TaroPageContainer ref={ref} {...props} />;
});

export const Ad = forwardRef<any, AdProps>((props, ref) => {
  return <TaroAd ref={ref} {...props} />;
});

export const PageHead = forwardRef<any, PageMetaProps>((props, ref) => {
  return <TaroPageMeta ref={ref} {...props} />;
});

export const CustomWrapper = forwardRef<any, CustomWrapperProps>((props, ref) => {
  return <TaroCustomWrapper ref={ref} {...props} />;
});

export const Editor = forwardRef<any, EditorProps>((props, ref) => {
  return <TaroEditor ref={ref} {...props} />;
});

// 导出默认包装器
export default {
  View,
  Text,
  Button,
  Image,
  Input,
  ScrollView,
  Swiper,
  MovableView,
  MovableArea,
  CoverView,
  CoverImage,
  Icon,
  RichText,
  Textarea,
  Video,
  Camera,
  LivePlayer,
  LivePusher,
  Map,
  Canvas,
  WebView,
  Picker,
  PickerView,
  Slider,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Label,
  Form,
  Navigator,
  Audio,
  OfficialAccount,
  OpenData,
  NavigationBar,
  PageMeta,
  PageContainer,
  Ad,
  PageHead,
  CustomWrapper,
  Editor
};