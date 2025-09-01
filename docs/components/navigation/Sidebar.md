# Sidebar 侧边栏组件

侧边栏组件用于显示导航菜单、设置面板或辅助信息，支持多种布局模式和交互方式。

## 基础用法

```tsx
import { Sidebar } from 'taro-uno'

// 基础侧边栏
<Sidebar
  visible={visible}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>侧边栏内容</h3>
    <p>这是侧边栏的内容区域</p>
  </div>
</Sidebar>
```

## 位置

侧边栏支持不同的位置。

```tsx
// 左侧侧边栏
<Sidebar
  visible={visible}
  placement="left"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>左侧侧边栏</h3>
  </div>
</Sidebar>

// 右侧侧边栏
<Sidebar
  visible={visible}
  placement="right"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>右侧侧边栏</h3>
  </div>
</Sidebar>
```

## 尺寸

侧边栏支持多种尺寸。

```tsx
// 固定尺寸
<Sidebar
  visible={visible}
  width={280}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>固定尺寸侧边栏</h3>
  </div>
</Sidebar>

// 百分比尺寸
<Sidebar
  visible={visible}
  width="80%"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>百分比尺寸侧边栏</h3>
  </div>
</Sidebar>

// 预设尺寸
<Sidebar
  visible={visible}
  size="sm"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>小尺寸侧边栏</h3>
  </div>
</Sidebar>

<Sidebar
  visible={visible}
  size="md"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>中等尺寸侧边栏</h3>
  </div>
</Sidebar>

<Sidebar
  visible={visible}
  size="lg"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>大尺寸侧边栏</h3>
  </div>
</Sidebar>
```

## 遮罩层

侧边栏支持遮罩层配置。

```tsx
// 点击遮罩关闭
<Sidebar
  visible={visible}
  maskClosable={true}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>点击遮罩关闭</h3>
  </div>
</Sidebar>

// 自定义遮罩
<Sidebar
  visible={visible}
  maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>自定义遮罩</h3>
  </div>
</Sidebar>

// 无遮罩
<Sidebar
  visible={visible}
  showMask={false}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>无遮罩</h3>
  </div>
</Sidebar>
```

## 动画效果

侧边栏支持动画效果。

```tsx
// 动画类型
<Sidebar
  visible={visible}
  animation="slide"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>滑动动画</h3>
  </div>
</Sidebar>

<Sidebar
  visible={visible}
  animation="fade"
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>淡入动画</h3>
  </div>
</Sidebar>

// 自定义动画
<Sidebar
  visible={visible}
  animationDuration={500}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>自定义动画时长</h3>
  </div>
</Sidebar>
```

## 固定侧边栏

侧边栏支持固定显示。

```tsx
// 固定侧边栏
<Sidebar
  fixed
  placement="left"
  width={280}
>
  <div style={{ padding: '20px' }}>
    <h3>固定侧边栏</h3>
    <Menu
      mode="vertical"
      items={[
        { key: 'home', label: '首页', icon: <Icon name="home" /> },
        { key: 'products', label: '产品中心', icon: <Icon name="package" /> },
        { key: 'about', label: '关于我们', icon: <Icon name="info" /> }
      ]}
      onClick={(key) => console.log(key)}
    />
  </div>
</Sidebar>
```

## 可折叠侧边栏

侧边栏支持折叠功能。

```tsx
// 可折叠侧边栏
const [collapsed, setCollapsed] = useState(false)
<Sidebar
  fixed
  placement="left"
  width={collapsed ? 80 : 280}
  collapsible
  collapsed={collapsed}
  onCollapse={(collapsed) => setCollapsed(collapsed)}
>
  <div style={{ padding: '20px' }}>
    <Menu
      mode="vertical"
      collapsed={collapsed}
      items={[
        { key: 'home', label: '首页', icon: <Icon name="home" /> },
        { key: 'products', label: '产品中心', icon: <Icon name="package" /> },
        { key: 'about', label: '关于我们', icon: <Icon name="info" /> }
      ]}
      onClick={(key) => console.log(key)}
    />
  </div>
</Sidebar>
```

## 响应式设计

侧边栏支持响应式设计。

```tsx
// 响应式侧边栏
<Sidebar
  fixed
  placement={isMobile ? 'right' : 'left'}
  width={isMobile ? '100%' : 280}
  visible={visible}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>响应式侧边栏</h3>
    <p>在移动端显示为右侧全屏侧边栏</p>
    <p>在桌面端显示为左侧固定侧边栏</p>
  </div>
</Sidebar>
```

## 自定义内容

侧边栏支持自定义内容。

```tsx
// 带头部侧边栏
<Sidebar
  visible={visible}
  header={
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <h3 style={{ margin: 0 }}>侧边栏标题</h3>
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
    <p>侧边栏内容</p>
  </div>
</Sidebar>

// 带底部操作侧边栏
<Sidebar
  visible={visible}
  footer={
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
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
    <p>侧边栏内容</p>
  </div>
</Sidebar>
```

## 嵌套使用

侧边栏支持嵌套使用。

```tsx
// 嵌套侧边栏
<Sidebar
  visible={visible}
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>主侧边栏</h3>
    <Button onClick={() => setNestedVisible(true)}>
      打开子侧边栏
    </Button>
    
    <Sidebar
      visible={nestedVisible}
      placement="right"
      width={240}
      onClose={() => setNestedVisible(false)}
    >
      <div style={{ padding: '20px' }}>
        <h3>子侧边栏</h3>
        <p>子侧边栏内容</p>
      </div>
    </Sidebar>
  </div>
</Sidebar>
```

## 触发按钮

侧边栏支持触发按钮。

```tsx
// 带触发按钮的侧边栏
<Sidebar
  visible={visible}
  trigger={
    <Button 
      type="primary" 
      icon={<Icon name="menu" />}
      onClick={() => setVisible(true)}
    >
      菜单
    </Button>
  }
  onClose={() => setVisible(false)}
>
  <div style={{ padding: '20px' }}>
    <h3>侧边栏内容</h3>
  </div>
</Sidebar>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | false | 是否显示侧边栏 |
| placement | 'left' \| 'right' | 'left' | 侧边栏位置 |
| width | number \| string | - | 侧边栏宽度 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 侧边栏尺寸 |
| fixed | boolean | false | 是否固定显示 |
| collapsible | boolean | false | 是否可折叠 |
| collapsed | boolean | false | 是否折叠状态 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |
| showMask | boolean | true | 是否显示遮罩 |
| header | ReactNode | - | 自定义头部 |
| footer | ReactNode | - | 自定义底部 |
| trigger | ReactNode | - | 触发按钮 |
| closable | boolean | true | 是否显示关闭按钮 |
| animation | 'slide' \| 'fade' \| 'none' | 'slide' | 动画效果 |
| animationDuration | number | 300 | 动画持续时间 |
| destroyOnClose | boolean | false | 关闭时是否销毁 |
| zIndex | number | 1000 | 层级 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义侧边栏样式 |
| maskStyle | React.CSSProperties | - | 自定义遮罩样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClose | () => void | 关闭事件 |
| onShow | () => void | 显示事件 |
| onHide | () => void | 隐藏事件 |
| onCollapse | (collapsed: boolean) => void | 折叠状态变化事件 |
| afterShow | () => void | 显示后事件 |
| afterHide | () => void | 隐藏后事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| show | - | void | 显示侧边栏 |
| hide | - | void | 隐藏侧边栏 |
| toggle | - | void | 切换显示状态 |
| isVisible | - | boolean | 获取显示状态 |
| collapse | (collapsed: boolean) => void | void | 折叠/展开侧边栏 |
| isCollapsed | - | boolean | 获取折叠状态 |
| setWidth | (width: number \| string) => void | void | 设置宽度 |
| getWidth | - | number \| string | 获取宽度 |
| setPlacement | (placement: 'left' \| 'right') => void | void | 设置位置 |
| getPlacement | - | 'left' \| 'right' | 获取位置 |

## 样式定制

### CSS 变量

```css
:root {
  --sidebar-bg-color: #ffffff;
  --sidebar-text-color: #111827;
  --sidebar-border-color: #e5e7eb;
  --sidebar-header-bg-color: #f9fafb;
  --sidebar-footer-bg-color: #f9fafb;
  --sidebar-mask-bg-color: rgba(0, 0, 0, 0.5);
  --sidebar-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  --sidebar-border-radius: 8px;
  --sidebar-header-height: 56px;
  --sidebar-footer-height: 56px;
  --sidebar-transition-duration: 300ms;
}
```

## 最佳实践

1. **位置选择**：根据内容类型选择合适的侧边栏位置
2. **尺寸适配**：根据内容长度选择合适的侧边栏尺寸
3. **响应式设计**：在移动端使用全屏侧边栏获得更好的体验
4. **交互反馈**：提供清晰的关闭按钮和遮罩层交互

## 注意事项

1. 侧边栏组件基于 Taro 的 `View` 和 `CoverView` 组件封装
2. 固定侧边栏会占用页面空间，需要调整主内容区域的布局
3. 嵌套侧边栏时注意层级管理和用户体验
4. 确保侧边栏在所有平台上都能正常显示和交互