# Text 文本组件

文本组件用于显示和格式化文本内容，支持多种文本样式和排版功能。

## 基础用法

```tsx
import { Text } from 'taro-uno'

// 基础文本
<Text>这是一段文本</Text>

// 不同级别的文本
<Text type="primary">主要文本</Text>
<Text type="secondary">次要文本</Text>
<Text type="success">成功文本</Text>
<Text type="warning">警告文本</Text>
<Text type="error">错误文本</Text>
```

## 文本类型

```tsx
<Text type="default">默认文本</Text>
<Text type="primary">主要文本</Text>
<Text type="secondary">次要文本</Text>
<Text type="success">成功文本</Text>
<Text type="warning">警告文本</Text>
<Text type="error">错误文本</Text>
<Text type="info">信息文本</Text>
```

## 文本尺寸

```tsx
<Text size="xs">超小文本</Text>
<Text size="sm">小文本</Text>
<Text size="md">中号文本</Text>
<Text size="lg">大文本</Text>
<Text size="xl">超大文本</Text>
<Text size="2xl">2倍大文本</Text>
<Text size="3xl">3倍大文本</Text>
<Text size="4xl">4倍大文本</Text>
```

## 文本粗细

```tsx
<Text weight="thin">细体</Text>
<Text weight="light">轻体</Text>
<Text weight="normal">正常</Text>
<Text weight="medium">中等</Text>
<Text weight="semibold">半粗</Text>
<Text weight="bold">粗体</Text>
<Text weight="black">特粗</Text>
```

## 文本对齐

```tsx
<Text align="left">左对齐文本</Text>
<Text align="center">居中对齐文本</Text>
<Text align="right">右对齐文本</Text>
<Text align="justify">两端对齐文本</Text>
```

## 文本装饰

```tsx
<Text decoration="none">无装饰</Text>
<Text decoration="underline">下划线</Text>
<Text decoration="overline">上划线</Text>
<Text decoration="line-through">删除线</Text>
<Text decoration="blink">闪烁</Text>
```

## 文本转换

```tsx
<Text transform="none">正常文本</Text>
<Text transform="uppercase">大写文本</Text>
<Text transform="lowercase">小写文本</Text>
<Text transform="capitalize">首字母大写</Text>
```

## 行高

```tsx
<Text lineHeight="tight">紧密行高</Text>
<Text lineHeight="normal">正常行高</Text>
<Text lineHeight="relaxed">宽松行高</Text>
<Text lineHeight="loose">更宽松行高</Text>
```

## 字间距

```tsx
<Text spacing="tighter">紧密字间距</Text>
<Text spacing="tight">紧密字间距</Text>
<Text spacing="normal">正常字间距</Text>
<Text spacing="wide">宽松字间距</Text>
<Text spacing="wider">更宽松字间距</Text>
<Text spacing="widest">最宽松字间距</Text>
```

## 截断文本

```tsx
// 单行截断
<Text truncate>这是一段很长的文本，会被截断显示省略号...</Text>

// 多行截断
<Text lines={2}>
  这是一段很长的文本，会被截断显示省略号。这是第二行文本，也会被截断显示省略号。
  这是第三行文本，不会显示出来。
</Text>
```

## 段落文本

```tsx
<Text paragraph>
  这是一个段落文本组件，用于显示较长的文本内容。
  支持自动换行和段落间距，适合用于文章、说明等长文本显示。
</Text>
```

## 代码文本

```tsx
<Text code>console.log('Hello World')</Text>
```

## 引用文本

```tsx
<Text quote>
  "这是一个引用文本，通常用于引用他人的话语或重要内容。"
</Text>
```

## 高亮文本

```tsx
<Text highlight>这是一段需要高亮显示的文本</Text>
```

## 可点击文本

```tsx
<Text 
  type="primary" 
  style={{ cursor: 'pointer' }}
  onClick={() => console.log('点击了文本')}
>
  可点击的文本
</Text>
```

## 自定义颜色

```tsx
<Text color="#ff6b6b">自定义颜色文本</Text>
<Text color="rgb(78, 205, 196)">RGB 颜色文本</Text>
<Text color="rgba(78, 205, 196, 0.5)">RGBA 颜色文本</Text>
```

## 组合样式

```tsx
<Text 
  type="primary" 
  size="lg" 
  weight="bold" 
  align="center"
  decoration="underline"
>
  组合样式文本
</Text>
```

## 响应式文本

```tsx
<Text 
  size={{ xs: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
>
  响应式文本
</Text>
```

## 富文本

```tsx
<Text>
  这是<strong>粗体</strong>文本，这是<em>斜体</em>文本，
  这是<code>代码</code>文本，这是<mark>标记</mark>文本。
</Text>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 文本内容 |
| type | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | 文本类型 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| object | 'md' | 文本尺寸 |
| weight | 'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'black' | 'normal' | 文本粗细 |
| align | 'left' \| 'center' \| 'right' \| 'justify' | 'left' | 文本对齐 |
| decoration | 'none' \| 'underline' \| 'overline' \| 'line-through' \| 'blink' | 'none' | 文本装饰 |
| transform | 'none' \| 'uppercase' \| 'lowercase' \| 'capitalize' | 'none' | 文本转换 |
| lineHeight | 'tight' \| 'normal' \| 'relaxed' \| 'loose' | 'normal' | 行高 |
| spacing | 'tighter' \| 'tight' \| 'normal' \| 'wide' \| 'wider' \| 'widest' | 'normal' | 字间距 |
| truncate | boolean | false | 是否单行截断 |
| lines | number | - | 多行截断行数 |
| paragraph | boolean | false | 是否段落文本 |
| code | boolean | false | 是否代码文本 |
| quote | boolean | false | 是否引用文本 |
| highlight | boolean | false | 是否高亮文本 |
| color | string | - | 自定义颜色 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |
| onClick | (event: React.MouseEvent) => void | - | 点击事件处理函数 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | (event: React.MouseEvent) => void | 点击事件 |
| onMouseEnter | (event: React.MouseEvent) => void | 鼠标进入事件 |
| onMouseLeave | (event: React.MouseEvent) => void | 鼠标离开事件 |

## 样式定制

### CSS 变量

```css
:root {
  --text-primary-color: #111827;
  --text-secondary-color: #6b7280;
  --text-success-color: #22c55e;
  --text-warning-color: #f59e0b;
  --text-error-color: #ef4444;
  --text-info-color: #3b82f6;
  --text-muted-color: #9ca3af;
  --text-link-color: #3b82f6;
}
```

### 自定义样式类

```tsx
<Text className="custom-text">自定义样式文本</Text>

<style>
.custom-text {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>
```

## 最佳实践

1. **层次结构**：使用不同尺寸和粗细建立文本层次结构
2. **对比度**：确保文本颜色与背景有足够的对比度
3. **一致性**：在整个应用中保持文本样式的一致性
4. **可读性**：选择合适的行高和字间距提高可读性
5. **响应式**：根据屏幕尺寸调整文本大小

## 注意事项

1. 文本组件基于 Taro 的 `Text` 组件封装
2. 长文本建议使用 `truncate` 或 `lines` 属性控制显示
3. 自定义颜色时需考虑可访问性和对比度
4. 在移动端，建议使用较大的文本尺寸

## 示例代码

### 文章标题

```tsx
function ArticleTitle() {
  return (
    <div>
      <Text size="4xl" weight="bold" align="center">
        文章标题
      </Text>
      <Text size="lg" type="secondary" align="center">
        副标题或描述信息
      </Text>
    </div>
  )
}
```

### 文章内容

```tsx
function ArticleContent() {
  return (
    <div>
      <Text paragraph>
        这是文章的第一段内容，支持自动换行和段落间距。
        文本组件会根据容器宽度自动调整排版。
      </Text>
      <Text paragraph>
        这是文章的第二段内容。可以设置不同的文本样式来突出重点内容。
        <Text highlight type="warning">这是高亮的重要信息</Text>。
      </Text>
    </div>
  )
}
```

### 数据表格

```tsx
function DataTable() {
  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '8px 0' }}>
        <Text weight="bold" style={{ flex: 1 }}>姓名</Text>
        <Text weight="bold" style={{ flex: 1 }}>年龄</Text>
        <Text weight="bold" style={{ flex: 1 }}>职业</Text>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '8px 0' }}>
        <Text style={{ flex: 1 }}>张三</Text>
        <Text style={{ flex: 1 }}>25</Text>
        <Text style={{ flex: 1 }}>工程师</Text>
      </div>
      <div style={{ display: 'flex', padding: '8px 0' }}>
        <Text style={{ flex: 1 }}>李四</Text>
        <Text style={{ flex: 1 }}>30</Text>
        <Text style={{ flex: 1 }}>设计师</Text>
      </div>
    </div>
  )
}
```