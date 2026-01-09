# Divider 组件

Divider 组件用于分隔内容区域，提供多种样式和布局选项，增强页面的层次感和可读性。

## 基本使用

### 水平分割线

```tsx
<Divider />
<Divider type="dashed" />
<Divider type="dotted" />
<Divider type="double" />
```

### 垂直分割线

```tsx
<Space>
  <View>左侧内容</View>
  <Divider orientation="vertical" />
  <View>右侧内容</View>
  <Divider orientation="vertical" type="dashed" />
  <View>右侧内容</View>
</Space>
```

### 带文本的分割线

```tsx
<Divider>文本分割线</Divider>
<Divider type="dashed">带样式的文本分割线</Divider>
<Divider position="left">左侧文本</Divider>
<Divider position="right">右侧文本</Divider>
```

### 带图标的分割线

```tsx
<Divider icon={<Icon name="heart" />} />
<Divider type="dashed" icon={<Icon name="star" />}>带图标</Divider>
<Divider icon={<Icon name="arrow-right" />} iconPosition="start">左侧图标</Divider>
<Divider icon={<Icon name="arrow-left" />} iconPosition="end">右侧图标</Divider>
```

### 不同颜色的分割线

```tsx
<Divider color="primary" />
<Divider color="success" />
<Divider color="warning" />
<Divider color="error" />
<Divider color="info" />
```

### 不同尺寸的分割线

```tsx
<Divider size="xs" />
<Divider size="sm" />
<Divider size="md" />
<Divider size="lg" />
<Divider size="xl" />
```

### 渐变分割线

```tsx
<Divider gradient={{ start: '#ff0000', end: '#00ff00' }} />
<Divider 
  gradient={{ 
    start: '#ff0000', 
    end: '#0000ff',
    direction: 'to right'
  }} 
  type="dashed"
/>
```

### 动画分割线

```tsx
<Divider animated />
<Divider animated type="dashed" />
<Divider animated gradient={{ start: '#ff0000', end: '#00ff00' }} />
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| orientation | `DividerOrientation` | `horizontal` | 分割线方向，可选值：`horizontal`、`vertical` |
| type | `DividerType` | `solid` | 分割线类型，可选值：`solid`、`dashed`、`dotted`、`double`、`groove`、`ridge`、`inset`、`outset` |
| position | `DividerPosition` | `center` | 分割线文本位置，可选值：`left`、`center`、`right` |
| size | `DividerSize` | `md` | 分割线尺寸，可选值：`xs`、`sm`、`md`、`lg`、`xl` |
| color | `DividerColor` | `border` | 分割线颜色，可选值：`primary`、`secondary`、`success`、`warning`、`error`、`info`、`light`、`dark`、`border` 或自定义颜色值 |
| variant | `DividerVariant` | `default` | 分割线变体，可选值：`default`、`inset`、`middle`、`text`、`with-icon` |
| children | `ReactNode` | - | 分割线文本内容 |
| inset | `boolean` | `false` | 是否边距内缩 |
| centered | `boolean` | `false` | 是否居中显示 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| width | `number \| string` | - | 分割线宽度 |
| height | `number \| string` | - | 分割线高度 |
| margin | `number \| string` | - | 分割线边距 |
| padding | `number \| string` | - | 分割线内边距 |
| opacity | `number` | `1` | 分割线透明度 |
| borderRadius | `number \| string` | `0` | 分割线圆角 |
| gradient | `{ start: string; end: string; direction?: 'to right' \| 'to left' \| 'to bottom' \| 'to top' }` | - | 分割线渐变配置 |
| animated | `boolean` | `false` | 是否启用动画效果 |
| animationDuration | `number` | `300` | 动画持续时间（毫秒） |
| shadow | `boolean` | `false` | 是否显示阴影 |
| clickable | `boolean` | `false` | 是否可点击 |
| onClick | `CommonEventFunction<any>` | - | 点击事件处理函数 |
| accessible | `boolean` | `true` | 是否启用无障碍访问 |
| accessibilityLabel | `string` | - | 无障碍标签 |
| accessibilityRole | `string` | `separator` | 无障碍角色 |
| spacing | `number \| string` | - | 分割线间距 |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `center` | 分割线对齐方式 |
| verticalAlign | `'top' \| 'middle' \| 'bottom'` | `middle` | 垂直对齐方式 |
| icon | `ReactNode` | - | 分割线图标 |
| iconPosition | `'start' \| 'center' \| 'end'` | `center` | 图标位置 |
| textStyle | `React.CSSProperties` | - | 文本样式 |
| textSpacing | `number` | `16` | 文本间距 |
| textBackground | `string` | `#ffffff` | 文本背景色 |
| textPadding | `number \| string` | `0 16px` | 文本内边距 |
| textBorderRadius | `number \| string` | `4` | 文本圆角 |
| responsive | `boolean` | `false` | 是否响应式 |
| breakpoint | `'xs' \| 'sm' \| 'md' \| 'lg'` | `md` | 响应式断点 |

## 类型定义

```tsx
// 分割线方向
export type DividerOrientation = 'horizontal' | 'vertical';

// 分割线类型
export type DividerType = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';

// 分割线位置
export type DividerPosition = 'left' | 'center' | 'right';

// 分割线尺寸
export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 分割线颜色
export type DividerColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'light' | 'dark' | 'border' | string;

// 分割线变体
export type DividerVariant = 'default' | 'inset' | 'middle' | 'text' | 'with-icon';

// 分割线组件属性接口
export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'orientation'> {
  orientation?: DividerOrientation;
  type?: DividerType;
  position?: DividerPosition;
  size?: DividerSize;
  color?: DividerColor;
  variant?: DividerVariant;
  children?: ReactNode;
  inset?: boolean;
  centered?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  margin?: number | string;
  padding?: number | string;
  animated?: boolean;
  animationDuration?: number;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  opacity?: number;
  shadow?: boolean;
  borderRadius?: number | string;
  gradient?: {
    start: string;
    end: string;
    direction?: 'to right' | 'to left' | 'to bottom' | 'to top';
  };
  icon?: ReactNode;
  iconPosition?: 'start' | 'center' | 'end';
  clickable?: boolean;
  onClick?: CommonEventFunction<any>;
  responsive?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg';
  spacing?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  textStyle?: React.CSSProperties;
  textSpacing?: number;
  textBackground?: string;
  textPadding?: number | string;
  textBorderRadius?: number | string;
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onClick | 点击分割线时触发 | `e: CommonEvent` |

## 示例代码

### 完整示例

```tsx
import { Divider, Icon, Space, View, Text } from 'taro-uno-ui';

const DividerExample = () => {
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基本分割线</Text>
      <Divider />
      <Divider type="dashed" />
      <Divider type="dotted" />
      <Divider type="double" />
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带文本的分割线</Text>
      <Divider>居中文本</Divider>
      <Divider position="left">左侧文本</Divider>
      <Divider position="right">右侧文本</Divider>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带图标的分割线</Text>
      <Divider icon={<Icon name="heart" />} />
      <Divider icon={<Icon name="star" />}>带图标和文本</Divider>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色</Text>
      <Divider color="primary" />
      <Divider color="success" />
      <Divider color="warning" />
      <Divider color="error" />
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>渐变分割线</Text>
      <Divider 
        gradient={{ 
          start: '#ff6b6b', 
          end: '#4ecdc4',
          direction: 'to right'
        }} 
      />
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>垂直分割线</Text>
      <Space style={{ margin: '20px 0' }}>
        <View>Item 1</View>
        <Divider orientation="vertical" />
        <View>Item 2</View>
        <Divider orientation="vertical" type="dashed" />
        <View>Item 3</View>
      </Space>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>动画分割线</Text>
      <Divider animated />
      <Divider animated type="dashed" />
    </View>
  );
};

export default DividerExample;
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

1. **垂直分割线**：垂直分割线需要在父容器中使用 `display: flex` 或类似布局，否则可能无法正确显示。
2. **渐变分割线**：渐变效果在某些小程序平台可能不支持或显示不一致。
3. **动画效果**：动画效果在某些低端设备上可能会影响性能，建议根据实际情况使用。
4. **图标支持**：图标可以是内置图标组件或自定义 React 节点。
5. **响应式设计**：设置 `responsive` 为 `true` 时，分割线会根据屏幕尺寸自动调整样式。
6. **无障碍访问**：默认启用无障碍访问，可通过 `accessible` 属性关闭。

## 相关组件

- [Icon 组件](#/components/basic/icon) - 用于分割线图标
- [Space 组件](#/components/layout/space) - 用于布局和间距控制