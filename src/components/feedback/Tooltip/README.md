# Tooltip 文字提示组件

一个功能丰富、高度可定制的文字提示组件，支持多种触发方式、位置、主题和动画效果。

## 特性

- 🎯 **多种触发方式**：支持 hover、click、focus、contextMenu 触发
- 📍 **12种位置**：top、bottom、left、right 及其变体
- 🎨 **7种主题**：light、dark、primary、success、warning、error、info
- ✨ **4种动画**：fade、scale、slide、none
- ⏱️ **延迟控制**：可自定义显示/隐藏延迟时间
- 🎭 **箭头指示**：支持显示/隐藏箭头
- 🎛️ **受控模式**：支持受控和非受控两种模式
- ♿ **无障碍访问**：支持 ARIA 属性和键盘交互
- 🎪 **嵌套触发**：支持嵌套的 Tooltip
- 📱 **响应式**：支持移动端适配
- 🔧 **高度可定制**：支持自定义样式和内容

## 安装

```tsx
import { Tooltip } from '@/components/feedback';
```

## 基础用法

```tsx
import { Tooltip } from '@/components/feedback';

function App() {
  return (
    <Tooltip title="这是一个提示内容">
      <button>悬停我</button>
    </Tooltip>
  );
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | ReactNode | - | 提示内容 |
| children | ReactNode | - | 触发元素 |
| trigger | TooltipTrigger \| TooltipTrigger[] | 'hover' | 触发方式 |
| placement | TooltipPlacement | 'top' | 位置 |
| theme | TooltipTheme | 'light' | 主题 |
| animation | TooltipAnimation | 'fade' | 动画类型 |
| showDelay | number | 100 | 显示延迟（毫秒） |
| hideDelay | number | 100 | 隐藏延迟（毫秒） |
| arrow | boolean | true | 是否显示箭头 |
| disabled | boolean | false | 是否禁用 |
| visible | boolean | - | 是否显示（受控） |
| defaultVisible | boolean | false | 默认是否显示（非受控） |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |
| popupClassName | string | - | 弹出层类名 |
| popupStyle | CSSProperties | - | 弹出层样式 |
| offset | [number, number] | [0, 0] | 偏移量 |
| maxWidth | number \| string | 350 | 最大宽度 |
| minWidth | number \| string | 100 | 最小宽度 |
| wrap | boolean | true | 是否包裹子元素 |
| showOnFocus | boolean | true | 聚焦时是否显示 |
| hideOnLeave | boolean | true | 鼠标离开时是否隐藏 |
| hideOnClickOutside | boolean | true | 点击外部时是否隐藏 |
| nested | boolean | false | 是否支持嵌套触发 |
| accessible | boolean | true | 是否支持无障碍访问 |
| mask | boolean | false | 是否显示遮罩 |
| maskStyle | CSSProperties | - | 遮罩样式 |
| maskClassName | string | - | 遮罩类名 |
| autoAdjust | boolean | true | 是否自动调整位置 |
| zIndex | number | 1060 | Z-index |
| onVisibleChange | (visible: boolean) => void | - | 可见性变化回调 |
| onShow | () => void | - | 显示完成回调 |
| onHide | () => void | - | 隐藏完成回调 |
| onClick | (event: MouseEvent) => void | - | 点击回调 |

### 类型定义

```tsx
// 触发方式
type TooltipTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

// 位置
type TooltipPlacement = 
  | 'top' | 'bottom' | 'left' | 'right'
  | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

// 主题
type TooltipTheme = 'light' | 'dark' | 'primary' | 'success' | 'warning' | 'error' | 'info';

// 动画
type TooltipAnimation = 'fade' | 'scale' | 'slide' | 'none';
```

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| show | - | void | 显示 Tooltip |
| hide | - | void | 隐藏 Tooltip |
| toggle | - | void | 切换显示状态 |
| update | Partial<TooltipProps> | void | 更新配置 |
| destroy | - | void | 销毁 Tooltip |
| isVisible | - | boolean | 获取显示状态 |
| getTooltipElement | - | HTMLElement | 获取 Tooltip 元素 |
| getTriggerElement | - | HTMLElement | 获取触发元素 |

## 使用示例

### 基础用法

```tsx
// 基础 Tooltip
<Tooltip title="这是一个提示内容">
  <button>悬停我</button>
</Tooltip>

// 默认显示
<Tooltip title="默认显示" defaultVisible>
  <button>默认显示</button>
</Tooltip>
```

### 触发方式

```tsx
// 鼠标悬停触发
<Tooltip title="鼠标悬停触发" trigger="hover">
  <button>Hover</button>
</Tooltip>

// 点击触发
<Tooltip title="点击触发" trigger="click">
  <button>Click</button>
</Tooltip>

// 聚焦触发
<Tooltip title="聚焦触发" trigger="focus">
  <button>Focus</button>
</Tooltip>

// 多种触发方式
<Tooltip title="多种触发" trigger={['hover', 'click']}>
  <button>多种触发</button>
</Tooltip>
```

### 位置设置

```tsx
// 上方
<Tooltip title="上方提示" placement="top">
  <button>Top</button>
</Tooltip>

// 右侧
<Tooltip title="右侧提示" placement="right">
  <button>Right</button>
</Tooltip>

// 上左
<Tooltip title="上左提示" placement="topLeft">
  <button>Top Left</button>
</Tooltip>
```

### 主题设置

```tsx
// 浅色主题
<Tooltip title="浅色主题" theme="light">
  <button>Light</button>
</Tooltip>

// 深色主题
<Tooltip title="深色主题" theme="dark">
  <button>Dark</button>
</Tooltip>

// 成功主题
<Tooltip title="成功主题" theme="success">
  <button>Success</button>
</Tooltip>
```

### 动画效果

```tsx
// 淡入淡出
<Tooltip title="淡入淡出" animation="fade">
  <button>Fade</button>
</Tooltip>

// 缩放
<Tooltip title="缩放" animation="scale">
  <button>Scale</button>
</Tooltip>

// 滑动
<Tooltip title="滑动" animation="slide">
  <button>Slide</button>
</Tooltip>
```

### 高级功能

```tsx
// 延迟显示
<Tooltip title="延迟显示" showDelay={500} hideDelay={300}>
  <button>延迟</button>
</Tooltip>

// 受控模式
function ControlledTooltip() {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Tooltip title="受控 Tooltip" visible={visible}>
        <button>受控模式</button>
      </Tooltip>
      <button onClick={() => setVisible(!visible)}>
        切换
      </button>
    </>
  );
}

// 自定义样式
<Tooltip 
  title="自定义样式"
  popupStyle={{
    backgroundColor: '#ff6b6b',
    color: 'white',
    borderRadius: '8px',
  }}
>
  <button>自定义样式</button>
</Tooltip>

// 复杂内容
<Tooltip 
  title={
    <div>
      <h4>用户信息</h4>
      <p>姓名：张三</p>
      <p>职位：前端工程师</p>
    </div>
  }
>
  <button>用户信息</button>
</Tooltip>
```

### Ref 调用

```tsx
function RefTooltip() {
  const tooltipRef = useRef<TooltipRef>(null);
  
  return (
    <>
      <Tooltip title="Ref 调用" ref={tooltipRef}>
        <button>Ref</button>
      </Tooltip>
      <button onClick={() => tooltipRef.current?.show()}>
        显示
      </button>
      <button onClick={() => tooltipRef.current?.hide()}>
        隐藏
      </button>
      <button onClick={() => tooltipRef.current?.toggle()}>
        切换
      </button>
    </>
  );
}
```

### 实际应用场景

```tsx
// 表单提示
<div className="flex items-center">
  <label>用户名：</label>
  <input type="text" placeholder="请输入用户名" />
  <Tooltip title="用户名长度应为 3-20 个字符">
    <span className="text-gray-400">?</span>
  </Tooltip>
</div>

// 操作按钮
<Tooltip title="保存数据">
  <button>保存</button>
</Tooltip>

// 状态指示
<Tooltip title="在线">
  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
</Tooltip>

// 链接提示
<Tooltip title="访问官方网站">
  <a href="#">官方网站</a>
</Tooltip>
```

## 主题定制

### 自定义主题

```tsx
// 在样式文件中定义自定义主题
.custom-tooltip {
  background-color: #ff6b6b;
  color: white;
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

// 使用自定义主题
<Tooltip 
  title="自定义主题"
  popupClassName="custom-tooltip"
>
  <button>自定义主题</button>
</Tooltip>
```

### 全局配置

```tsx
// 在项目入口文件中配置
import { TooltipConfig } from '@/components/feedback/Tooltip';

// 修改默认配置
TooltipConfig.defaultShowDelay = 200;
TooltipConfig.defaultHideDelay = 150;
TooltipConfig.defaultTheme = 'dark';
```

## 注意事项

1. **性能优化**：在大量 Tooltip 的场景中，建议使用 `lazy` 模式或虚拟滚动
2. **移动端适配**：在移动端建议使用 `click` 触发方式，`hover` 可能不稳定
3. **无障碍访问**：确保为 Tooltip 添加适当的 `aria-*` 属性
4. **嵌套使用**：嵌套 Tooltip 时需要设置 `nested={true}`
5. **Z-index 冲突**：在复杂布局中可能需要调整 `zIndex` 值

## 兼容性

- **React 16.8+**：支持 Hooks
- **Taro 3.x**：支持小程序环境
- **TypeScript**：完整的类型支持
- **现代浏览器**：支持 ES2015+ 特性

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件。

## 更新日志

### v1.0.0

- ✨ 初始版本发布
- 🎯 支持多种触发方式
- 📍 支持 12 种位置
- 🎨 支持 7 种主题
- ✨ 支持 4 种动画效果
- 🎛️ 支持受控模式
- ♿ 支持无障碍访问
- 🎪 支持嵌套触发