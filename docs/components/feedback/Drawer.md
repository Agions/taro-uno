# Drawer 抽屉组件

抽屉组件用于从屏幕边缘滑出的面板，常用于导航菜单、设置面板等场景。

## 基础用法

```tsx
import { Drawer } from 'taro-uno'

// 基础抽屉
<Drawer
  visible={visible}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>抽屉内容</h3>
    <p>这是抽屉的内容区域</p>
  </div>
</Drawer>
```

## 位置

抽屉支持不同的位置。

```tsx
// 顶部抽屉
<Drawer
  visible={visible}
  placement="top"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>顶部抽屉</h3>
  </div>
</Drawer>

// 右侧抽屉
<Drawer
  visible={visible}
  placement="right"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>右侧抽屉</h3>
  </div>
</Drawer>

// 底部抽屉
<Drawer
  visible={visible}
  placement="bottom"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>底部抽屉</h3>
  </div>
</Drawer>

// 左侧抽屉
<Drawer
  visible={visible}
  placement="left"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>左侧抽屉</h3>
  </div>
</Drawer>
```

## 尺寸

抽屉支持多种尺寸。

```tsx
// 固定尺寸
<Drawer
  visible={visible}
  width={300}
  height={400}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>固定尺寸抽屉</h3>
  </div>
</Drawer>

// 百分比尺寸
<Drawer
  visible={visible}
  width="80%"
  height="60%"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>百分比尺寸抽屉</h3>
  </div>
</Drawer>

// 预设尺寸
<Drawer
  visible={visible}
  size="sm"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>小尺寸抽屉</h3>
  </div>
</Drawer>

<Drawer
  visible={visible}
  size="md"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>中等尺寸抽屉</h3>
  </div>
</Drawer>

<Drawer
  visible={visible}
  size="lg"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>大尺寸抽屉</h3>
  </div>
</Drawer>

<Drawer
  visible={visible}
  size="full"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>全屏抽屉</h3>
  </div>
</Drawer>
```

## 遮罩层

抽屉支持遮罩层配置。

```tsx
// 点击遮罩关闭
<Drawer
  visible={visible}
  maskClosable={true}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>点击遮罩关闭</h3>
  </div>
</Drawer>

// 自定义遮罩
<Drawer
  visible={visible}
  maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>自定义遮罩</h3>
  </div>
</Drawer>

// 无遮罩
<Drawer
  visible={visible}
  showMask={false}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>无遮罩</h3>
  </div>
</Drawer>
```

## 动画效果

抽屉支持动画效果。

```tsx
// 动画类型
<Drawer
  visible={visible}
  animation="slide"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>滑动动画</h3>
  </div>
</Drawer>

<Drawer
  visible={visible}
  animation="fade"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>淡入动画</h3>
  </div>
</Drawer>

// 自定义动画
<Drawer
  visible={visible}
  animationDuration={500}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>自定义动画时长</h3>
  </div>
</Drawer>
```

## 标题栏

抽屉支持标题栏配置。

```tsx
// 带标题栏
<Drawer
  visible={visible}
  title="抽屉标题"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <p>抽屉内容</p>
  </div>
</Drawer>

// 自定义标题栏
<Drawer
  visible={visible}
  header={
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <h3 style={{ margin: 0 }}>自定义标题</h3>
      <Button 
        type="text" 
        onClick={() => setVisible(false)}
      >
        <Icon name="close" />
      </Button>
    </div>
  }
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <p>抽屉内容</p>
  </div>
</Drawer>

// 无标题栏
<Drawer
  visible={visible}
  showHeader={false}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <p>无标题栏</p>
  </div>
</Drawer>
```

## 底部操作

抽屉支持底部操作配置。

```tsx
// 带底部操作
<Drawer
  visible={visible}
  title="底部操作"
  footer={
    <div style={{ 
      display: 'flex', 
      justifyContent: 'flex-end',
      gap: '8px',
      padding: '16px',
      borderTop: '1px solid #e5e7eb'
    }}>
      <Button onClick={() => setVisible(false)}>取消</Button>
      <Button type="primary" onClick={() => setVisible(false)}>确定</Button>
    </div>
  }
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <p>抽屉内容</p>
  </div>
</Drawer>
```

## 嵌套使用

抽屉支持嵌套使用。

```tsx
<Drawer
  visible={visible}
  title="主抽屉"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <p>主抽屉内容</p>
    <Button onClick={() => setNestedVisible(true)}>
      打开子抽屉
    </Button>
    
    <Drawer
      visible={nestedVisible}
      title="子抽屉"
      onClose={() => setNestedVisible(false)}
    >
      <div style={{ padding: '20px' }}>
        <p>子抽屉内容</p>
      </div>
    </Drawer>
  </div>
</Drawer>
```

## 响应式设计

抽屉支持响应式设计。

```tsx
<Drawer
  visible={visible}
  placement={isMobile ? 'bottom' : 'right'}
  size={isMobile ? 'full' : 'md'}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>响应式抽屉</h3>
    <p>在移动端显示为底部全屏抽屉</p>
    <p>在桌面端显示为右侧中等抽屉</p>
  </div>
</Drawer>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | false | 是否显示抽屉 |
| placement | 'top' \| 'right' \| 'bottom' \| 'left' | 'right' | 抽屉位置 |
| title | ReactNode | - | 抽屉标题 |
| children | ReactNode | - | 抽屉内容 |
| width | number \| string | - | 抽屉宽度 (水平抽屉) |
| height | number \| string | - | 抽屉高度 (垂直抽屉) |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | 抽屉尺寸 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |
| showMask | boolean | true | 是否显示遮罩 |
| showHeader | boolean | true | 是否显示标题栏 |
| header | ReactNode | - | 自定义标题栏 |
| footer | ReactNode | - | 自定义底部栏 |
| closable | boolean | true | 是否显示关闭按钮 |
| animation | 'slide' \| 'fade' \| 'none' | 'slide' | 动画效果 |
| animationDuration | number | 300 | 动画持续时间 |
| destroyOnClose | boolean | false | 关闭时是否销毁 |
| zIndex | number | 1000 | 层级 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义抽屉样式 |
| maskStyle | React.CSSProperties | - | 自定义遮罩样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClose | () => void | 关闭事件 |
| onShow | () => void | 显示事件 |
| onHide | () => void | 隐藏事件 |
| afterShow | () => void | 显示后事件 |
| afterHide | () => void | 隐藏后事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| show | - | void | 显示抽屉 |
| hide | - | void | 隐藏抽屉 |
| toggle | - | void | 切换显示状态 |
| isVisible | - | boolean | 获取显示状态 |
| setTitle | (title: ReactNode) => void | void | 设置标题 |
| setContent | (content: ReactNode) => void | void | 设置内容 |

## 样式定制

### CSS 变量

```css
:root {
  --drawer-bg-color: #ffffff;
  --drawer-text-color: #111827;
  --drawer-border-color: #e5e7eb;
  --drawer-header-bg-color: #f9fafb;
  --drawer-footer-bg-color: #f9fafb;
  --drawer-mask-bg-color: rgba(0, 0, 0, 0.5);
  --drawer-title-color: #111827;
  --drawer-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  --drawer-border-radius: 8px;
  --drawer-header-height: 56px;
  --drawer-footer-height: 56px;
}
```

## 最佳实践

1. **位置选择**：根据内容类型选择合适的抽屉位置
2. **尺寸适配**：根据内容长度选择合适的抽屉尺寸
3. **交互反馈**：提供清晰的关闭按钮和遮罩层交互
4. **移动端优化**：在移动端使用底部全屏抽屉获得更好的体验

## 注意事项

1. 抽屉组件基于 Taro 的 `View` 和 `CoverView` 组件封装
2. 避免在抽屉内放置过多的滚动内容
3. 嵌套抽屉时注意层级管理和用户体验
4. 确保抽屉在所有平台上都能正常显示和交互