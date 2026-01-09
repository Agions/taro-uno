# Typography 排版

### 介绍

排版组件，用于展示文本内容，支持不同级别标题、段落、行内文本等。

### 引入

在 Taro 项目中引入 Typography 组件：

```tsx
import { Typography } from '@taroify/core'

const { Text, Heading, Paragraph, Span } = Typography
```

### 基本用法

```tsx
<Heading level={1}>一级标题</Heading>
<Heading level={2}>二级标题</Heading>
<Heading level={3}>三级标题</Heading>
<Heading level={4}>四级标题</Heading>
<Heading level={5}>五级标题</Heading>
<Heading level={6}>六级标题</Heading>
```

### 段落文本

```tsx
<Paragraph>这是一个普通段落。</Paragraph>
<Paragraph>这是一个带有 <Span strong>粗体</Span> 和 <Span emphasis>斜体</Span> 的段落。</Paragraph>
<Paragraph>这是一个带有 <Span code>代码</Span> 和 <Span del>删除线</Span> 的段落。</Paragraph>
```

### 不同大小

```tsx
<Text size="small">小号文本</Text>
<Text size="medium">中号文本</Text>
<Text size="large">大号文本</Text>
<Text style={{ fontSize: '24px' }}>自定义大小文本</Text>
```

### 不同权重

```tsx
<Text weight="light">轻量级文本</Text>
<Text weight="regular">常规文本</Text>
<Text weight="medium">中等权重文本</Text>
<Text weight="bold">粗体文本</Text>
```

### 不同对齐方式

```tsx
<Paragraph align="left">左对齐文本</Paragraph>
<Paragraph align="center">居中对齐文本</Paragraph>
<Paragraph align="right">右对齐文本</Paragraph>
<Paragraph align="justify">两端对齐文本，这是一段用于展示两端对齐效果的长文本，用于演示 Typography 组件的对齐功能。</Paragraph>
```

### 省略文本

```tsx
<Paragraph ellipsis>这是一段超长文本，用于演示 Typography 组件的省略功能。这是一段超长文本，用于演示 Typography 组件的省略功能。</Paragraph>
<Paragraph ellipsis={{ rows: 2 }}>
  这是一段用于演示多行省略功能的文本。这是一段用于演示多行省略功能的文本。这是一段用于演示多行省略功能的文本。
  这是一段用于演示多行省略功能的文本。这是一段用于演示多行省略功能的文本。
</Paragraph>
```

### 禁用状态

```tsx
<Text disabled>禁用文本</Text>
<Paragraph disabled>禁用段落文本</Paragraph>
<Heading level={3} disabled>禁用标题</Heading>
```

### 链接文本

```tsx
<Text href="https://example.com" underline>链接文本</Text>
<Paragraph>
  段落中的 <Span href="https://example.com" color="#0066FF">链接</Span> 文本
</Paragraph>
```

### 属性

#### Typography.Text 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 文本大小 |
| weight | 'light' \| 'regular' \| 'medium' \| 'bold' | 'regular' | 文本权重 |
| color | string | - | 文本颜色 |
| align | 'left' \| 'center' \| 'right' \| 'justify' | 'left' | 文本对齐方式 |
| disabled | boolean | false | 是否禁用状态 |
| strong | boolean | false | 是否加粗 |
| emphasis | boolean | false | 是否斜体 |
| underline | boolean | false | 是否下划线 |
| delete | boolean | false | 是否删除线 |
| code | boolean | false | 是否代码样式 |
| href | string | - | 链接地址 |
| children | ReactNode | - | 子节点 |
| style | CSSProperties | - | 自定义样式 |
| className | string | - | 自定义类名 |

#### Typography.Heading 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| level | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | 1 | 标题级别 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 标题大小 |
| weight | 'light' \| 'regular' \| 'medium' \| 'bold' | 'bold' | 标题权重 |
| color | string | - | 标题颜色 |
| align | 'left' \| 'center' \| 'right' \| 'justify' | 'left' | 标题对齐方式 |
| disabled | boolean | false | 是否禁用状态 |
| children | ReactNode | - | 子节点 |
| style | CSSProperties | - | 自定义样式 |
| className | string | - | 自定义类名 |

#### Typography.Paragraph 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 段落大小 |
| weight | 'light' \| 'regular' \| 'medium' \| 'bold' | 'regular' | 段落权重 |
| color | string | - | 段落颜色 |
| align | 'left' \| 'center' \| 'right' \| 'justify' | 'left' | 段落对齐方式 |
| disabled | boolean | false | 是否禁用状态 |
| ellipsis | boolean / object | false | 是否显示省略号，支持配置行数 |
| children | ReactNode | - | 子节点 |
| style | CSSProperties | - | 自定义样式 |
| className | string | - | 自定义类名 |

#### Typography.Span 属性

同 Typography.Text 属性

### 类型定义

```ts
interface TypographyBaseProps {
  size?: 'small' | 'medium' | 'large'
  weight?: 'light' | 'regular' | 'medium' | 'bold'
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  disabled?: boolean
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

interface TextProps extends TypographyBaseProps {
  strong?: boolean
  emphasis?: boolean
  underline?: boolean
  delete?: boolean
  code?: boolean
  href?: string
}

interface HeadingProps extends TypographyBaseProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

interface ParagraphProps extends TypographyBaseProps {
  ellipsis?: boolean | { rows?: number }
}

interface SpanProps extends TextProps {}

interface TypographyComponents {
  Text: React.FC<TextProps>
  Heading: React.FC<HeadingProps>
  Paragraph: React.FC<ParagraphProps>
  Span: React.FC<SpanProps>
}

const Typography: React.FC & TypographyComponents
```

### 示例代码

```tsx
import React from 'react'
import { View } from '@tarojs/components'
import { Typography } from '@taroify/core'

const { Text, Heading, Paragraph, Span } = Typography

export default function TypographyExample() {
  return (
    <View>
      <Text className="example-title">标题</Text>
      <Heading level={1}>一级标题</Heading>
      <Heading level={2}>二级标题</Heading>
      <Heading level={3}>三级标题</Heading>

      <Text className="example-title">段落文本</Text>
      <Paragraph>这是一个普通段落。</Paragraph>
      <Paragraph>
        这是一个带有 <Span strong>粗体</Span> 和 <Span emphasis>斜体</Span> 的段落。
      </Paragraph>
      <Paragraph>
        这是一个带有 <Span code>代码</Span> 和 <Span del>删除线</Span> 的段落。
      </Paragraph>

      <Text className="example-title">不同大小</Text>
      <Text size="small">小号文本</Text>
      <Text size="medium">中号文本</Text>
      <Text size="large">大号文本</Text>

      <Text className="example-title">不同权重</Text>
      <Text weight="light">轻量级文本</Text>
      <Text weight="regular">常规文本</Text>
      <Text weight="medium">中等权重文本</Text>
      <Text weight="bold">粗体文本</Text>

      <Text className="example-title">不同对齐方式</Text>
      <Paragraph align="left">左对齐文本</Paragraph>
      <Paragraph align="center">居中对齐文本</Paragraph>
      <Paragraph align="right">右对齐文本</Paragraph>

      <Text className="example-title">省略文本</Text>
      <Paragraph ellipsis>
        这是一段超长文本，用于演示 Typography 组件的省略功能。这是一段超长文本，用于演示 Typography 组件的省略功能。
      </Paragraph>
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginTop: '16px' }}>
        这是一段用于演示多行省略功能的文本。这是一段用于演示多行省略功能的文本。这是一段用于演示多行省略功能的文本。
        这是一段用于演示多行省略功能的文本。这是一段用于演示多行省略功能的文本。
      </Paragraph>

      <Text className="example-title">禁用状态</Text>
      <Text disabled>禁用文本</Text>
      <Paragraph disabled style={{ marginTop: '8px' }}>禁用段落</Paragraph>
      <Heading level={3} disabled style={{ marginTop: '8px' }}>禁用标题</Heading>

      <Text className="example-title">链接文本</Text>
      <Text href="https://example.com" underline>链接文本</Text>
      <Paragraph style={{ marginTop: '8px' }}>
        段落中的 <Span href="https://example.com" color="#0066FF">链接</Span> 文本
      </Paragraph>
    </View>
  )
}
```