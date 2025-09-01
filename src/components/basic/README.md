# Taro-Uno 基础组件库

这是 Taro-Uno UI 组件库的基础组件模块，提供了四个核心的基础组件：Button、Icon、Text 和 Divider。

## 组件列表

### 1. Button 按钮组件

用于触发操作的按钮组件，支持多种类型、状态和样式。

#### 特性
- 多种按钮类型（primary、secondary、success、warning、error、info）
- 多种变体（solid、outline、ghost、text）
- 多种尺寸（xs、sm、md、lg、xl）
- 多种形状（default、rounded、circle、square）
- 支持加载状态、禁用状态
- 支持图标和文本组合
- 支持涟漪效果
- 完整的无障碍访问支持
- 响应式设计

#### 基本用法

```tsx
import { Button } from '@/components/basic'

// 基本按钮
<Button onClick={handleClick}>点击我</Button>

// 不同类型
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="error">错误按钮</Button>

// 不同变体
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="text">文本按钮</Button>

// 带图标的按钮
<Button icon={<Icon source="🔥" />}>带图标</Button>
<Button icon={<Icon source="🔥" />} iconPosition="right">
  图标在右
</Button>

// 加载状态
<Button loading>加载中...</Button>

// 禁用状态
<Button disabled>禁用</Button>

// 块级按钮
<Button block>块级按钮</Button>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | ButtonType | 'default' | 按钮类型 |
| variant | ButtonVariant | 'solid' | 按钮变体 |
| size | ButtonSize | 'md' | 按钮尺寸 |
| shape | ButtonShape | 'default' | 按钮形状 |
| status | ButtonStatus | 'normal' | 按钮状态 |
| loading | boolean | false | 是否加载中 |
| disabled | boolean | false | 是否禁用 |
| block | boolean | false | 是否块级显示 |
| danger | boolean | false | 是否危险操作 |
| icon | ReactNode | - | 图标 |
| iconPosition | ButtonIconPosition | 'left' | 图标位置 |
| onClick | (event: ITouchEvent) => void | - | 点击事件 |
| ripple | boolean | false | 是否显示涟漪效果 |
| ... | ... | ... | 其他原生属性 |

---

### 2. Icon 图标组件

用于显示图标的组件，支持多种图标类型和样式。

#### 特性
- 支持多种图标类型（SVG、图片、字体图标、自定义组件）
- 多种尺寸和颜色
- 支持旋转和动画
- 支持工具提示
- 支持加载状态
- 完整的无障碍访问支持

#### 基本用法

```tsx
import { Icon } from '@/components/basic'

// 字体图标
<Icon source="home" />
<Icon source="user" size="lg" color="primary" />

// SVG 图标
<Icon source={{ viewBox: "0 0 24 24", path: "M12 2L2 7L12 12L22 7L12 2Z" }} />

// 图片图标
<Icon source="/path/to/icon.png" />

// 自定义图标
<Icon source={<span>🔥</span>} />

// 不同尺寸
<Icon source="star" size="xs" />
<Icon source="star" size="sm" />
<Icon source="star" size="md" />
<Icon source="star" size="lg" />
<Icon source="star" size="xl" />

// 旋转图标
<Icon source="refresh" rotate={90} />
<Icon source="refresh" rotate={180} />

// 可点击图标
<Icon source="settings" clickable onClick={handleClick} />

// 带工具提示
<Icon source="info" tooltip="这是信息图标" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| source | IconSource | - | 图标源 |
| type | IconType | - | 图标类型 |
| size | IconSize \| number | 'md' | 图标尺寸 |
| color | string | 'currentColor' | 图标颜色 |
| rotate | IconRotation | 0 | 旋转角度 |
| status | IconStatus | 'normal' | 图标状态 |
| theme | IconTheme | 'outlined' | 图标主题 |
| clickable | boolean | false | 是否可点击 |
| loading | boolean | false | 是否加载中 |
| disabled | boolean | false | 是否禁用 |
| tooltip | string | - | 工具提示文本 |
| onClick | (event: React.MouseEvent) => void | - | 点击事件 |
| ... | ... | ... | 其他原生属性 |

---

### 3. Text 文本组件

用于显示文本内容的组件，支持丰富的文本样式和功能。

#### 特性
- 多种文本尺寸和权重
- 多种文本颜色和对齐方式
- 支持文本装饰和转换
- 支持文本截断和省略
- 支持复制和选择功能
- 支持链接和跳转
- 支持渐变文本
- 完整的无障碍访问支持

#### 基本用法

```tsx
import { Text } from '@/components/basic'

// 基本文本
<Text>这是一段文本</Text>

// 不同尺寸
<Text size="xs">超小文本</Text>
<Text size="sm">小文本</Text>
<Text size="md">中等文本</Text>
<Text size="lg">大文本</Text>
<Text size="xl">超大文本</Text>

// 不同权重
<Text weight="light">轻量文本</Text>
<Text weight="normal">常规文本</Text>
<Text weight="medium">中等文本</Text>
<Text weight="semibold">半粗文本</Text>
<Text weight="bold">粗体文本</Text>

// 不同颜色
<Text color="primary">主要文本</Text>
<Text color="success">成功文本</Text>
<Text color="warning">警告文本</Text>
<Text color="error">错误文本</Text>

// 文本装饰
<Text underline>下划线文本</Text>
<Text strikethrough>删除线文本</Text>
<Text highlight>高亮文本</Text>

// 文本对齐
<Text align="left">左对齐</Text>
<Text align="center">居中对齐</Text>
<Text align="right">右对齐</Text>

// 文本截断
<Text ellipsis>这是一段很长的文本内容，当超出容器宽度时会显示省略号...</Text>

// 多行截断
<Text maxLines={2}>
  这是一段很长的文本内容，当超出指定行数时会显示省略号。
  这是第二行内容，用于测试多行文本截断效果。
</Text>

// 可复制文本
<Text copyable>这段文本可以复制</Text>

// 链接文本
<Text href="https://example.com" target="_blank">
  这是一个链接
</Text>

// 渐变文本
<Text gradient={{ start: '#ff0000', end: '#0000ff' }}>
  渐变文本
</Text>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | TextSize | 'md' | 文本尺寸 |
| weight | TextWeight | 'normal' | 文本权重 |
| color | TextColor | 'inherit' | 文本颜色 |
| align | TextAlign | 'left' | 文本对齐 |
| decoration | TextDecoration | 'none' | 文本装饰 |
| transform | TextTransform | 'none' | 文本转换 |
| maxLines | number | - | 最大行数 |
| ellipsis | boolean | false | 是否显示省略号 |
| copyable | boolean | false | 是否可复制 |
| selectable | boolean | false | 是否可选择 |
| href | string | - | 链接地址 |
| target | string | '_self' | 链接打开方式 |
| underline | boolean | false | 是否显示下划线 |
| strikethrough | boolean | false | 是否显示删除线 |
| highlight | boolean | false | 是否高亮显示 |
| gradient | object | - | 渐变配置 |
| onClick | (event: React.MouseEvent) => void | - | 点击事件 |
| onCopy | () => void | - | 复制回调 |
| ... | ... | ... | 其他原生属性 |

---

### 4. Divider 分割线组件

用于分割内容的分割线组件，支持多种样式和方向。

#### 特性
- 支持水平和垂直方向
- 多种分割线类型
- 支持文本和图标分割线
- 支持响应式设计
- 完整的无障碍访问支持

#### 基本用法

```tsx
import { Divider } from '@/components/basic'

// 基本分割线
<Divider />

// 不同类型
<Divider type="solid" />
<Divider type="dashed" />
<Divider type="dotted" />
<Divider type="double" />

// 不同位置
<Divider position="left" />
<Divider position="center" />
<Divider position="right" />

// 不同尺寸
<Divider size="xs" />
<Divider size="sm" />
<Divider size="md" />
<Divider size="lg" />
<Divider size="xl" />

// 不同颜色
<Divider color="primary" />
<Divider color="success" />
<Divider color="warning" />
<Divider color="error" />

// 文本分割线
<Divider>文本内容</Divider>

// 带图标的分割线
<Divider icon={<Icon source="star" />}>
  带图标的分割线
</Divider>

// 垂直分割线
<View style={{ display: 'flex', height: '100px' }}>
  <Text>左侧内容</Text>
  <Divider orientation="vertical" />
  <Text>右侧内容</Text>
</View>

// 响应式分割线
<Divider responsive />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| orientation | DividerOrientation | 'horizontal' | 分割线方向 |
| type | DividerType | 'solid' | 分割线类型 |
| position | DividerPosition | 'center' | 分割线位置 |
| size | DividerSize | 'md' | 分割线尺寸 |
| color | DividerColor | 'border' | 分割线颜色 |
| variant | DividerVariant | 'default' | 分割线变体 |
| children | ReactNode | - | 分割线内容 |
| icon | ReactNode | - | 分割线图标 |
| iconPosition | string | 'center' | 图标位置 |
| inset | boolean | false | 是否边距内缩 |
| centered | boolean | false | 是否居中显示 |
| responsive | boolean | false | 是否响应式 |
| onClick | (event: React.MouseEvent) => void | - | 点击事件 |
| ... | ... | ... | 其他原生属性 |

---

## 主题定制

基础组件支持主题定制，可以通过 CSS 变量和样式配置来自定义外观：

```css
:root {
  /* 按钮主题变量 */
  --button-primary-color: #0ea5e9;
  --button-secondary-color: #6b7280;
  --button-success-color: #22c55e;
  --button-warning-color: #f59e0b;
  --button-error-color: #ef4444;
  
  /* 文本主题变量 */
  --text-primary-color: #0ea5e9;
  --text-secondary-color: #6b7280;
  --text-success-color: #22c55e;
  --text-warning-color: #f59e0b;
  --text-error-color: #ef4444;
  
  /* 分割线主题变量 */
  --divider-primary-color: #0ea5e9;
  --divider-secondary-color: #6b7280;
  --divider-border-color: #e5e7eb;
}
```

## 无障碍访问

所有基础组件都支持完整的无障碍访问功能：

- **ARIA 属性**：自动添加适当的 ARIA 标签和角色
- **键盘导航**：支持键盘操作和焦点管理
- **屏幕阅读器**：优化了屏幕阅读器的体验
- **高对比度**：支持高对比度模式

```tsx
// 无障碍访问示例
<Button 
  accessibilityLabel="提交表单"
  accessibilityRole="button"
  accessibilityState={{ disabled: false }}
>
  提交
</Button>

<Text 
  accessibilityLabel="重要提示"
  accessibilityRole="text"
>
  这是一条重要提示
</Text>
```

## 最佳实践

### 1. 按钮使用

```tsx
// ✅ 好的做法
<Button type="primary" onClick={handleSubmit}>
  提交表单
</Button>

// ❌ 避免的做法
<Button onClick={handleSubmit} style={{ backgroundColor: '#0ea5e9' }}>
  提交表单
</Button>
```

### 2. 文本使用

```tsx
// ✅ 好的做法
<Text size="lg" weight="semibold" color="primary">
  标题文本
</Text>

// ❌ 避免的做法
<Text style={{ fontSize: '18px', fontWeight: '600', color: '#0ea5e9' }}>
  标题文本
</Text>
```

### 3. 图标使用

```tsx
// ✅ 好的做法
<Icon source="home" size="md" color="primary" />

// ❌ 避免的做法
<Icon source="home" style={{ fontSize: '24px', color: '#0ea5e9' }} />
```

## 类型安全

所有组件都提供了完整的 TypeScript 类型定义：

```tsx
import type { ButtonProps, IconProps, TextProps, DividerProps } from '@/components/basic'

// 类型安全的属性传递
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## 性能优化

- 使用 `React.memo` 优化组件渲染
- 合理使用 `useCallback` 和 `useMemo`
- 避免不必要的重新渲染
- 使用 CSS 变量实现主题切换

## 浏览器兼容性

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 移动端浏览器
- 小程序环境（通过 Taro 适配）

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 更新日志

### v1.0.0
- 初始版本发布
- 实现基础组件：Button、Icon、Text、Divider
- 完整的 TypeScript 类型支持
- 完整的单元测试覆盖
- 支持多端适配（H5、小程序、RN）
- 支持主题系统集成
- 支持无障碍访问