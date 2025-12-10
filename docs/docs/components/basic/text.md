# Text 组件

Text 组件是用于显示文本内容的基础组件，支持多种样式配置和功能扩展。

## 基本使用

### 基础文本

```tsx
<Text>基础文本</Text>
<Text size="md" color="primary" weight="bold">主要文本</Text>
<Text size="md" color="secondary">次要文本</Text>
<Text size="md" color="success">成功文本</Text>
<Text size="md" color="warning">警告文本</Text>
<Text size="md" color="error">错误文本</Text>
<Text size="md" color="info">信息文本</Text>
```

### 不同尺寸

```tsx
<Text size="xs">超小文本</Text>
<Text size="sm">小文本</Text>
<Text size="md">中文本</Text>
<Text size="lg">大文本</Text>
<Text size="xl">超大文本</Text>
<Text size="2xl">2倍超大文本</Text>
<Text size="3xl">3倍超大文本</Text>
```

### 不同权重

```tsx
<Text weight="thin">极细文本</Text>
<Text weight="light">细文本</Text>
<Text weight="normal">正常文本</Text>
<Text weight="medium">中等文本</Text>
<Text weight="semibold">半粗文本</Text>
<Text weight="bold">粗文本</Text>
<Text weight="extrabold">极粗文本</Text>
<Text weight="black">最粗文本</Text>
```

### 不同对齐方式

```tsx
<Text align="left">左对齐文本</Text>
<Text align="center">居中对齐文本</Text>
<Text align="right">右对齐文本</Text>
<Text align="justify">两端对齐文本</Text>
```

### 不同装饰效果

```tsx
<Text decoration="none">无装饰</Text>
<Text decoration="underline">下划线</Text>
<Text decoration="overline">上划线</Text>
<Text decoration="line-through">删除线</Text>
```

### 不同转换效果

```tsx
<Text transform="none">无转换</Text>
<Text transform="capitalize">首字母大写</Text>
<Text transform="uppercase">全部大写</Text>
<Text transform="lowercase">全部小写</Text>
```

### 溢出处理

```tsx
<Text ellipsis maxLines={1} style={{ width: '200px' }}>
  这是一段超长文本，用于测试溢出处理效果，当文本超过容器宽度时会显示省略号。
</Text>

<Text breakWord style={{ width: '150px' }}>
  这是一段包含长单词的文本：supercalifragilisticexpialidocious
</Text>
```

### 链接文本

```tsx
<Text href="https://example.com" target="_blank" underline>
  外部链接
</Text>
<Text href="/page" target="_self" underline>
  内部链接
</Text>
```

### 高亮文本

```tsx
<Text highlight>默认高亮文本</Text>
<Text highlight highlightColor="#ffeb3b">黄色高亮文本</Text>
<Text highlight highlightColor="#4caf50">绿色高亮文本</Text>
<Text highlight highlightColor="#f44336">红色高亮文本</Text>
```

### 带状态的文本

```tsx
<Text status="normal">正常状态</Text>
<Text status="active">激活状态</Text>
<Text status="disabled">禁用状态</Text>
<Text status="loading">加载状态</Text>
```

### 可复制文本

```tsx
<Text copyable>可复制文本，点击右侧复制按钮</Text>
<Text copyable onCopy={() => console.log('文本已复制')}>
  复制后触发回调
</Text>
```

### 可选择文本

```tsx
<Text selectable>这段文本可以被选中</Text>
<Text selectable weight="bold">可选择的粗体文本</Text>
```

### 动画文本

```tsx
<Text animated>动画文本</Text>
<Text animated animationDuration={1000} color="primary">
  慢速动画文本
</Text>
<Text animated animationDuration={500} color="error">
  快速动画文本
</Text>
```

### 不同字体样式

```tsx
<Text fontStyle="normal">正常字体</Text>
<Text fontStyle="italic">斜体字体</Text>
<Text fontStyle="oblique">倾斜字体</Text>
```

### 不同行高

```tsx
<Text lineHeight="tight">紧凑行高</Text>
<Text lineHeight="normal">正常行高</Text>
<Text lineHeight="relaxed">宽松行高</Text>
<Text lineHeight="loose">极宽松行高</Text>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `ReactNode` | - | 文本内容 |
| size | `TextSize` | `md` | 文本尺寸，可选值：`xs`、`sm`、`md`、`lg`、`xl`、`2xl`、`3xl`、`4xl`、`5xl`、`6xl`、`7xl`、`8xl`、`9xl` |
| weight | `TextWeight` | `normal` | 文本权重，可选值：`thin`、`extralight`、`light`、`normal`、`medium`、`semibold`、`bold`、`extrabold`、`black` |
| color | `TextColor` | `inherit` | 文本颜色，可选值：`primary`、`secondary`、`success`、`warning`、`error`、`info`、`disabled`、`inherit`、`current` 或自定义颜色 |
| align | `TextAlign` | `left` | 文本对齐方式，可选值：`left`、`center`、`right`、`justify`、`start`、`end` |
| decoration | `TextDecoration` | `none` | 文本装饰，可选值：`none`、`underline`、`overline`、`line-through`、`blink` |
| transform | `TextTransform` | `none` | 文本转换，可选值：`none`、`capitalize`、`uppercase`、`lowercase` |
| overflow | `TextOverflow` | `clip` | 文本溢出处理，可选值：`clip`、`ellipsis`、`break-word`、`break-all`、`truncate` |
| direction | `TextDirection` | `ltr` | 文本方向，可选值：`ltr`、`rtl` |
| fontStyle | `TextStyle` | `normal` | 文本样式，可选值：`normal`、`italic`、`oblique` |
| variant | `TextVariant` | `normal` | 文本变体，可选值：`normal`、`small-caps`、`all-small-caps`、`petite-caps`、`all-petite-caps`、`unicase`、`titling-caps`、`h1`-`h6`、`body1`、`body2`、`body`、`caption`、`overline`、`subtitle1`、`subtitle2` |
| letterSpacing | `LetterSpacing` | `normal` | 字母间距，可选值：`tighter`、`tight`、`normal`、`wide`、`wider`、`widest` 或数字 |
| lineHeight | `LineHeight` | `normal` | 行高，可选值：`none`、`tight`、`snug`、`normal`、`relaxed`、`loose` 或数字 |
| status | `TextStatus` | `normal` | 文本状态，可选值：`normal`、`active`、`disabled`、`loading` |
| type | `TextType` | `body` | 文本类型，可选值：`body`、`heading`、`caption`、`label`、`link`、`code`、`quote`、`helper` |
| clickable | `boolean` | `false` | 是否可点击 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| disabled | `boolean` | `false` | 是否禁用 |
| block | `boolean` | `false` | 是否块级显示 |
| inlineBlock | `boolean` | `false` | 是否内联块级显示 |
| selectable | `boolean` | `false` | 是否可选中 |
| copyable | `boolean` | `false` | 是否可复制 |
| onCopy | `() => void` | - | 复制成功回调 |
| className | `string` | - | 自定义样式类名 |
| onClick | `(_event: React.MouseEvent) => void` | - | 点击事件处理函数 |
| style | `React.CSSProperties` | - | 自定义样式 |
| maxLines | `number` | - | 最大行数 |
| animated | `boolean` | `false` | 是否启用动画 |
| animationDuration | `number` | `300` | 动画持续时间（毫秒） |
| href | `string` | - | 文本链接地址 |
| target | `'_blank' \| '_self' \| '_parent' \| '_top'` | `_self` | 链接打开方式 |
| underline | `boolean` | `false` | 是否显示下划线 |
| strikethrough | `boolean` | `false` | 是否显示删除线 |
| highlight | `boolean` | `false` | 是否高亮 |
| highlightColor | `string` | `#fef3c7` | 高亮颜色 |
| ellipsis | `boolean` | `false` | 是否显示省略号 |
| wrap | `boolean` | `true` | 是否自动换行 |
| breakWord | `boolean` | `false` | 是否保持单词完整 |
| textShadow | `string` | - | 文本阴影 |
| textOutline | `string` | - | 文本轮廓 |
| gradient | `{ start: string; end: string; direction?: 'to right' \| 'to left' \| 'to bottom' \| 'to top' \| 'to bottom right' \| 'to top left' }` | - | 文本渐变配置 |
| fontFamily | `string \| string[]` | - | 自定义字体 |
| wordSpacing | `number \| string` | - | 单词间距 |
| textIndent | `number \| string` | - | 文本缩进 |
| whiteSpace | `'normal' \| 'nowrap' \| 'pre' \| 'pre-wrap' \| 'pre-line' \| 'break-spaces'` | - | 白空格处理 |
| verticalAlign | `'baseline' \| 'sub' \| 'super' \| 'top' \| 'text-top' \| 'middle' \| 'bottom' \| 'text-bottom'` | - | 垂直对齐 |
| writingMode | `'horizontal-tb' \| 'vertical-rl' \| 'vertical-lr'` | - | 文本书写方向 |
| textRendering | `'auto' \| 'optimizeSpeed' \| 'optimizeLegibility' \| 'geometricPrecision'` | - | 文本渲染优化 |
| ariaLabel | `string` | - | 无障碍标签 |
| role | `string` | `text` | 无障碍角色 |
| accessible | `boolean` | `true` | 是否启用无障碍访问 |
| accessibilityLabel | `string` | - | 无障碍标签 |
| accessibilityRole | `string` | - | 无障碍角色 |
| accessibilityState | `{ disabled?: boolean; selected?: boolean; busy?: boolean; expanded?: boolean }` | - | 无障碍状态 |
| numberOfLines | `number` | - | React Native 兼容属性，最大行数 |
| ellipsizeMode | `'head' \| 'middle' \| 'tail' \| 'clip'` | - | React Native 兼容属性，省略号位置 |

## 类型定义

```tsx
// 文本尺寸
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

// 文本权重
export type TextWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

// 文本对齐
export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

// 文本装饰
export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through' | 'blink';

// 文本转换
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

// 文本溢出处理
export type TextOverflow = 'clip' | 'ellipsis' | 'break-word' | 'break-all' | 'truncate';

// 文本方向
export type TextDirection = 'ltr' | 'rtl';

// 文本样式
export type TextStyle = 'normal' | 'italic' | 'oblique';

// 文本变体
export type TextVariant = 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2';

// 文本颜色类型
export type TextColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'disabled' | 'inherit' | 'current' | string;

// 文本状态
export type TextStatus = 'normal' | 'active' | 'disabled' | 'loading';

// 文本类型
export type TextType = 'body' | 'heading' | 'caption' | 'label' | 'link' | 'code' | 'quote' | 'helper';

// 文本组件属性接口
export interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'size' | 'color' | 'weight'> {
  children?: ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  decoration?: TextDecoration;
  transform?: TextTransform;
  overflow?: TextOverflow;
  direction?: TextDirection;
  fontStyle?: TextStyle;
  variant?: TextVariant;
  letterSpacing?: LetterSpacing;
  lineHeight?: LineHeight;
  status?: TextStatus;
  type?: TextType;
  clickable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  inlineBlock?: boolean;
  selectable?: boolean;
  copyable?: boolean;
  onCopy?: () => void;
  className?: string;
  onClick?: (_event: React.MouseEvent) => void;
  style?: React.CSSProperties;
  maxLines?: number;
  animated?: boolean;
  animationDuration?: number;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  underline?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
  highlightColor?: string;
  ellipsis?: boolean;
  wrap?: boolean;
  breakWord?: boolean;
  textShadow?: string;
  textOutline?: string;
  gradient?: {
    start: string;
    end: string;
    direction?: 'to right' | 'to left' | 'to bottom' | 'to top' | 'to bottom right' | 'to top left';
  };
  fontFamily?: string | string[];
  wordSpacing?: number | string;
  textIndent?: number | string;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
  verticalAlign?: 'baseline' | 'sub' | 'super' | 'top' | 'text-top' | 'middle' | 'bottom' | 'text-bottom';
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
  ariaLabel?: string;
  role?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onClick | 点击文本时触发 | `_event: React.MouseEvent` |
| onCopy | 复制文本成功时触发 | - |

## 示例代码

### 完整示例

```tsx
import { Text, View } from 'taro-uno-ui';

const TextExample = () => {
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础文本样式</Text>
      <Text size="lg" weight="bold" color="primary">
        大标题
      </Text>
      <Text size="md" weight="medium" color="secondary">
        中标题
      </Text>
      <Text size="sm" color="inherit">
        正文文本
      </Text>
      <Text size="xs" color="disabled">
        辅助文本
      </Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>文本装饰</Text>
      <Text decoration="underline">下划线文本</Text>
      <Text decoration="line-through">删除线文本</Text>
      <Text decoration="overline">上划线文本</Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>文本转换</Text>
      <Text transform="capitalize">capitalize text</Text>
      <Text transform="uppercase">uppercase text</Text>
      <Text transform="lowercase">LOWERCASE TEXT</Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>对齐方式</Text>
      <Text align="left" style={{ width: '300px' }}>左对齐</Text>
      <Text align="center" style={{ width: '300px' }}>居中对齐</Text>
      <Text align="right" style={{ width: '300px' }}>右对齐</Text>
      <Text align="justify" style={{ width: '300px' }}>
        这是一段两端对齐的文本，用于测试对齐效果。
      </Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>溢出处理</Text>
      <Text 
        ellipsis 
        maxLines={2} 
        style={{ width: '200px', border: '1px solid #ccc', padding: '8px' }}
      >
        这是一段超长文本，用于测试溢出处理效果，当文本超过指定行数时会显示省略号。
      </Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>可交互文本</Text>
      <Text 
        clickable 
        onClick={() => alert('点击了文本')} 
        color="primary" 
        underline
      >
        可点击文本
      </Text>
      <Text copyable onCopy={() => console.log('文本已复制')}>
        可复制文本
      </Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>链接文本</Text>
      <Text href="https://example.com" target="_blank" underline>
        外部链接
      </Text>
    </View>
  );
};

export default TextExample;
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

1. **文本溢出**：使用 `ellipsis` 属性时，建议同时设置 `maxLines` 属性，以确保在不同平台上的一致性。
2. **链接文本**：使用 `href` 属性时，建议同时设置 `underline` 属性，以提高可访问性。
3. **可复制文本**：在某些平台上，复制功能可能需要用户授权，建议提供明确的提示。
4. **性能优化**：对于大量文本内容，建议使用 `block` 属性，以提高渲染性能。
5. **无障碍访问**：为重要文本添加适当的无障碍标签，提高可访问性。
6. **动画效果**：动画文本可能会影响性能，建议根据实际情况使用。
7. **自定义样式**：自定义样式会覆盖组件的默认样式，建议谨慎使用。

## 相关组件

- [Typography 组件](#/components/basic/typography) - 更高级的排版组件
- [Space 组件](#/components/layout/space) - 用于文本间距控制
- [Button 组件](#/components/basic/button) - 可与文本结合使用