# Divider 分割线组件

分割线组件用于分隔内容区域，提供视觉上的分组和层次感。

## 基础用法

```tsx
import { Divider } from 'taro-uno'

// 基础分割线
<Divider />

// 带文本的分割线
<Divider>文本内容</Divider>
```

## 方向

分割线支持水平和垂直方向。

```tsx
// 水平分割线（默认）
<Divider orientation="horizontal" />

// 垂直分割线
<Divider orientation="vertical" style={{ height: '100px' }} />
```

## 文本位置

```tsx
<Divider orientation="left">左侧文本</Divider>
<Divider orientation="center">居中文本</Divider>
<Divider orientation="right">右侧文本</Divider>
```

## 线条类型

```tsx
<Divider type="solid">实线</Divider>
<Divider type="dashed">虚线</Divider>
<Divider type="dotted">点线</Divider>
<Divider type="double">双线</Divider>
```

## 线条粗细

```tsx
<Divider thickness={1}>细线</Divider>
<Divider thickness={2}>标准线</Divider>
<Divider thickness={4}>粗线</Divider>
<Divider thickness={6}>特粗线</Divider>
```

## 颜色

```tsx
<Divider color="#e5e7eb">灰色</Divider>
<Divider color="#4ecdc4">青色</Divider>
<Divider color="#ff6b6b">红色</Divider>
<Divider color="#45b7d1">蓝色</Divider>
```

## 间距

```tsx
<Divider margin={8}>小间距</Divider>
<Divider margin={16}>标准间距</Divider>
<Divider margin={24}>大间距</Divider>
<Divider margin={32}>超大间距</Divider>
```

## 虚线样式

```tsx
<Divider dashed>默认虚线</Divider>
<Divider dashed dashGap={4} dashLength={8}>
  自定义虚线
</Divider>
```

## 嵌套使用

```tsx
<div>
  <Text>第一部分内容</Text>
  <Divider>分割线1</Divider>
  <Text>第二部分内容</Text>
  <Divider>分割线2</Divider>
  <Text>第三部分内容</Text>
</div>
```

## 垂直分割线组

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
  <Text>左侧内容</Text>
  <Divider orientation="vertical" style={{ height: '40px' }} />
  <Text>中间内容</Text>
  <Divider orientation="vertical" style={{ height: '40px' }} />
  <Text>右侧内容</Text>
</div>
```

## 图标分割线

```tsx
import { Icon } from 'taro-uno'

<Divider>
  <Icon name="star" size={16} />
</Divider>
```

## 渐变分割线

```tsx
<Divider 
  style={{ 
    background: 'linear-gradient(90deg, transparent, #4ecdc4, transparent)' 
  }}
/>
```

## 动画分割线

```tsx
<Divider 
  animated
  style={{ 
    background: 'linear-gradient(90deg, #4ecdc4, #45b7d1, #96ceb4)',
    backgroundSize: '200% 100%',
    animation: 'gradient 3s ease infinite'
  }}
/>
```

## 响应式分割线

```tsx
<Divider 
  responsive
  orientation={{ xs: 'horizontal', sm: 'horizontal', md: 'vertical' }}
/>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 分割线文本内容 |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | 分割线方向 |
| type | 'solid' \| 'dashed' \| 'dotted' \| 'double' | 'solid' | 线条类型 |
| thickness | number | 1 | 线条粗细 |
| color | string | - | 线条颜色 |
| margin | number \| string \| object | 16 | 间距 |
| textAlign | 'left' \| 'center' \| 'right' | 'center' | 文本对齐 |
| dashed | boolean | false | 是否虚线 |
| dashGap | number | 4 | 虚线间隙 |
| dashLength | number | 8 | 虚线长度 |
| animated | boolean | false | 是否动画 |
| responsive | boolean | false | 是否响应式 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 响应式属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| orientation | object | 不同屏幕尺寸的方向 |
| margin | object | 不同屏幕尺寸的间距 |
| thickness | object | 不同屏幕尺寸的粗细 |

## 样式定制

### CSS 变量

```css
:root {
  --divider-color: #e5e7eb;
  --divider-text-color: #6b7280;
  --divider-thickness: 1px;
  --divider-margin: 16px;
  --divider-text-background: #ffffff;
  --divider-text-padding: 0 16px;
}
```

### 自定义样式类

```tsx
<Divider className="custom-divider">自定义分割线</Divider>

<style>
.custom-divider {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4ecdc4, transparent);
  position: relative;
}

.custom-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #4ecdc4;
  border-radius: 50%;
}
</style>
```

## 最佳实践

1. **内容分组**：使用分割线将相关内容分组，提高可读性
2. **视觉层次**：通过不同的线条样式建立视觉层次
3. **间距控制**：合理设置间距，避免界面过于拥挤
4. **文本辅助**：使用文本说明分割的内容类型
5. **响应式设计**：在不同屏幕尺寸下调整分割线样式

## 注意事项

1. 垂直分割线需要设置具体的高度
2. 虚线样式在移动端可能显示效果不佳
3. 动画效果可能会影响性能，建议谨慎使用
4. 在小屏幕设备上，建议简化分割线样式

## 示例代码

### 表单分组

```tsx
function FormGroups() {
  return (
    <div>
      <div>
        <Text weight="bold">基本信息</Text>
        <Text>姓名、年龄、职业等基本信息</Text>
      </div>
      
      <Divider>基本信息</Divider>
      
      <div>
        <Text weight="bold">联系方式</Text>
        <Text>电话、邮箱、地址等联系方式</Text>
      </div>
      
      <Divider>联系方式</Divider>
      
      <div>
        <Text weight="bold">其他信息</Text>
        <Text>备注、标签等其他信息</Text>
      </div>
    </div>
  )
}
```

### 导航分割

```tsx
function Navigation() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text>首页</Text>
      <Icon name="chevron-right" size={16} />
      <Text>产品</Text>
      <Icon name="chevron-right" size={16} />
      <Text>详情</Text>
    </div>
  )
}
```

### 时间线分割

```tsx
function Timeline() {
  return (
    <div>
      <div>
        <Text weight="bold">2024-01-01</Text>
        <Text>项目启动</Text>
      </div>
      
      <Divider />
      
      <div>
        <Text weight="bold">2024-02-01</Text>
        <Text>需求分析完成</Text>
      </div>
      
      <Divider />
      
      <div>
        <Text weight="bold">2024-03-01</Text>
        <Text>开发完成</Text>
      </div>
    </div>
  )
}
```

### 卡片分割

```tsx
function CardContent() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
      <div>
        <Text weight="bold" size="lg">卡片标题</Text>
        <Text type="secondary">卡片描述信息</Text>
      </div>
      
      <Divider />
      
      <div>
        <Text>这是卡片的主要内容区域，包含详细的信息展示。</Text>
      </div>
      
      <Divider />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="sm">取消</Button>
        <Button size="sm" type="primary">确认</Button>
      </div>
    </div>
  )
}
```