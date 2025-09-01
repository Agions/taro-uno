# Toast 轻提示组件

轻提示组件用于显示简短的操作反馈信息，支持多种类型和位置。

## 基础用法

```tsx
import { Toast } from 'taro-uno'

// 基础提示
<Toast
  visible={visible}
  message="操作成功"
  onClose={() => setVisible(false)}
/>
```

## 类型

轻提示支持多种类型。

```tsx
// 成功提示
<Toast
  visible={visible}
  type="success"
  message="操作成功"
  onClose={() => setVisible(false)}
/>

// 错误提示
<Toast
  visible={visible}
  type="error"
  message="操作失败"
  onClose={() => setVisible(false)}
/>

// 警告提示
<Toast
  visible={visible}
  type="warning"
  message="请注意"
  onClose={() => setVisible(false)}
/>

// 信息提示
<Toast
  visible={visible}
  type="info"
  message="提示信息"
  onClose={() => setVisible(false)}
/>

// 加载提示
<Toast
  visible={visible}
  type="loading"
  message="加载中..."
  onClose={() => setVisible(false)}
/>
```

## 位置

轻提示支持不同的位置。

```tsx
// 顶部提示
<Toast
  visible={visible}
  position="top"
  message="顶部提示"
  onClose={() => setVisible(false)}
/>

// 底部提示
<Toast
  visible={visible}
  position="bottom"
  message="底部提示"
  onClose={() => setVisible(false)}
/>

// 居中提示
<Toast
  visible={visible}
  position="center"
  message="居中提示"
  onClose={() => setVisible(false)}
/>
```

## 持续时间

轻提示支持自定义持续时间。

```tsx
// 短时间提示
<Toast
  visible={visible}
  duration={1000}
  message="1秒后消失"
  onClose={() => setVisible(false)}
/>

// 长时间提示
<Toast
  visible={visible}
  duration={5000}
  message="5秒后消失"
  onClose={() => setVisible(false)}
/>

// 不自动关闭
<Toast
  visible={visible}
  duration={0}
  message="手动关闭"
  closable
  onClose={() => setVisible(false)}
/>
```

## 图标

轻提示支持自定义图标。

```tsx
// 自定义图标
<Toast
  visible={visible}
  icon={<Icon name="check" />}
  message="自定义图标"
  onClose={() => setVisible(false)}
/>

// 无图标
<Toast
  visible={visible}
  showIcon={false}
  message="无图标"
  onClose={() => setVisible(false)}
/>
```

## 操作按钮

轻提示支持操作按钮。

```tsx
// 带操作按钮
<Toast
  visible={visible}
  message="操作成功"
  action={
    <Button size="sm" onClick={() => setVisible(false)}>
      查看
    </Button>
  }
  onClose={() => setVisible(false)}
/>
```

## 自定义内容

轻提示支持自定义内容。

```tsx
// 自定义内容
<Toast
  visible={visible}
  onClose={() => setVisible(false)}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Icon name="check" color="green" />
    <div>
      <div style={{ fontWeight: 'bold' }}>操作成功</div>
      <div style={{ fontSize: '12px', color: '#666' }}>数据已保存</div>
    </div>
  </div>
</Toast>
```

## 静态方法

轻提示提供静态方法用于快速调用。

```tsx
// 显示成功提示
Toast.success('操作成功')

// 显示错误提示
Toast.error('操作失败')

// 显示警告提示
Toast.warning('请注意')

// 显示信息提示
Toast.info('提示信息')

// 显示加载提示
Toast.loading('加载中...')

// 关闭提示
Toast.hide()
```

## 批量显示

轻提示支持批量显示管理。

```tsx
// 显示多个提示
const toast1 = Toast.show('提示 1')
const toast2 = Toast.show('提示 2')

// 关闭特定提示
toast1.hide()

// 关闭所有提示
Toast.clear()
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | false | 是否显示提示 |
| message | ReactNode | - | 提示内容 |
| type | 'success' \| 'error' \| 'warning' \| 'info' \| 'loading' | 'info' | 提示类型 |
| position | 'top' \| 'bottom' \| 'center' | 'top' | 提示位置 |
| duration | number | 3000 | 显示持续时间 (ms) |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 提示尺寸 |
| showIcon | boolean | true | 是否显示图标 |
| icon | ReactNode | - | 自定义图标 |
| closable | boolean | false | 是否可关闭 |
| action | ReactNode | - | 操作按钮 |
| mask | boolean | false | 是否显示遮罩 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |
| animation | 'fade' \| 'slide' \| 'zoom' \| 'none' | 'fade' | 动画效果 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClose | () => void | 关闭事件 |
| onShow | () => void | 显示事件 |
| onHide | () => void | 隐藏事件 |

### 静态方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| show | (message: string, options?: ToastOptions) => ToastInstance | ToastInstance | 显示提示 |
| success | (message: string, duration?: number) => ToastInstance | ToastInstance | 显示成功提示 |
| error | (message: string, duration?: number) => ToastInstance | ToastInstance | 显示错误提示 |
| warning | (message: string, duration?: number) => ToastInstance | ToastInstance | 显示警告提示 |
| info | (message: string, duration?: number) => ToastInstance | ToastInstance | 显示信息提示 |
| loading | (message: string, duration?: number) => ToastInstance | ToastInstance | 显示加载提示 |
| hide | - | void | 关闭当前提示 |
| clear | - | void | 关闭所有提示 |

## 样式定制

### CSS 变量

```css
:root {
  --toast-bg-color: #323233;
  --toast-text-color: #ffffff;
  --toast-success-bg-color: #10b981;
  --toast-error-bg-color: #ef4444;
  --toast-warning-bg-color: #f59e0b;
  --toast-info-bg-color: #3b82f6;
  --toast-loading-bg-color: #6b7280;
  --toast-border-radius: 4px;
  --toast-padding: 12px 16px;
  --toast-font-size: 14px;
  --toast-max-width: 70%;
  --toast-z-index: 1000;
  --toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## 最佳实践

1. **简短信息**：保持提示信息简洁明了
2. **合适类型**：根据操作结果选择合适的提示类型
3. **合理时长**：根据信息重要性设置合适的显示时长
4. **位置选择**：根据界面布局选择合适的显示位置

## 注意事项

1. 轻提示组件基于 Taro 的 `View` 和 `CoverView` 组件封装
2. 避免同时显示多个提示，影响用户体验
3. 在移动端注意提示的尺寸和位置
4. 静态方法返回的实例可用于管理特定的提示