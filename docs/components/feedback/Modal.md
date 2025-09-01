# Modal 模态框组件

模态框组件用于显示重要信息、表单或需要用户关注的内容。

## 基础用法

```tsx
import { Modal } from 'taro-uno'

// 基础模态框
<Modal
  visible={visible}
  title="标题"
  content="这是一个模态框"
  onClose={() => setVisible(false)}
/>
```

## 类型

模态框支持多种类型。

```tsx
// 信息模态框
<Modal
  visible={visible}
  type="info"
  title="信息"
  content="这是一个信息提示"
  onClose={() => setVisible(false)}
/>

// 确认模态框
<Modal
  visible={visible}
  type="confirm"
  title="确认"
  content="确定要执行此操作吗？"
  onConfirm={() => console.log('确认')}
  onClose={() => setVisible(false)}
/>

// 警告模态框
<Modal
  visible={visible}
  type="warning"
  title="警告"
  content="此操作不可恢复，请谨慎操作"
  onConfirm={() => console.log('确认')}
  onClose={() => setVisible(false)}
/>

// 错误模态框
<Modal
  visible={visible}
  type="error"
  title="错误"
  content="操作失败，请重试"
  onClose={() => setVisible(false)}
/>
```

## 尺寸

模态框提供多种尺寸。

```tsx
<Modal
  visible={visible}
  size="xs"
  title="超小模态框"
  content="超小尺寸内容"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  size="sm"
  title="小模态框"
  content="小尺寸内容"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  size="md"
  title="中等模态框"
  content="中等尺寸内容"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  size="lg"
  title="大模态框"
  content="大尺寸内容"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  size="xl"
  title="超大模态框"
  content="超大尺寸内容"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  size="full"
  title="全屏模态框"
  content="全屏尺寸内容"
  onClose={() => setVisible(false)}
/>
```

## 按钮配置

模态框支持自定义按钮配置。

```tsx
// 自定义按钮文字
<Modal
  visible={visible}
  title="自定义按钮"
  content="自定义按钮文字"
  confirmText="确定"
  cancelText="取消"
  onConfirm={() => console.log('确认')}
  onClose={() => setVisible(false)}
/>

// 隐藏按钮
<Modal
  visible={visible}
  title="隐藏按钮"
  content="隐藏取消按钮"
  showCancel={false}
  onClose={() => setVisible(false)}
/>

// 自定义按钮
<Modal
  visible={visible}
  title="自定义按钮"
  content="自定义按钮组件"
  footer={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => setVisible(false)}>自定义</Button>
      <Button type="primary" onClick={() => setVisible(false)}>确定</Button>
    </div>
  }
  onClose={() => setVisible(false)}
/>
```

## 内容自定义

模态框支持自定义内容。

```tsx
// 表单模态框
<Modal
  visible={visible}
  title="表单模态框"
  footer={null}
  onClose={() => setVisible(false)}
>
  <Form>
    <Form.Item label="用户名">
      <Input placeholder="请输入用户名" />
    </Form.Item>
    <Form.Item label="密码">
      <Input type="password" placeholder="请输入密码" />
    </Form.Item>
    <Button type="primary" onClick={() => setVisible(false)}>
      提交
    </Button>
  </Form>
</Modal>

// 图片模态框
<Modal
  visible={visible}
  title="图片预览"
  footer={null}
  onClose={() => setVisible(false)}
>
  <img src="https://example.com/image.jpg" style={{ width: '100%' }} />
</Modal>
```

## 位置

模态框支持不同的位置。

```tsx
<Modal
  visible={visible}
  title="顶部模态框"
  position="top"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  title="底部模态框"
  position="bottom"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  title="居中模态框"
  position="center"
  onClose={() => setVisible(false)}
/>
```

## 动画效果

模态框支持动画效果。

```tsx
<Modal
  visible={visible}
  title="动画模态框"
  animation="fade"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  title="滑动动画"
  animation="slide"
  onClose={() => setVisible(false)}
/>

<Modal
  visible={visible}
  title="缩放动画"
  animation="zoom"
  onClose={() => setVisible(false)}
/>
```

## 遮罩层

模态框支持遮罩层配置。

```tsx
// 点击遮罩层关闭
<Modal
  visible={visible}
  title="点击遮罩关闭"
  maskClosable={true}
  onClose={() => setVisible(false)}
/>

// 自定义遮罩层
<Modal
  visible={visible}
  title="自定义遮罩"
  maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
  onClose={() => setVisible(false)}
/>

// 无遮罩层
<Modal
  visible={visible}
  title="无遮罩"
  showMask={false}
  onClose={() => setVisible(false)}
/>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | false | 是否显示模态框 |
| title | ReactNode | - | 模态框标题 |
| content | ReactNode | - | 模态框内容 |
| type | 'info' \| 'confirm' \| 'warning' \| 'error' | 'info' | 模态框类型 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | 模态框尺寸 |
| position | 'top' \| 'bottom' \| 'center' | 'center' | 模态框位置 |
| confirmText | string | '确定' | 确认按钮文字 |
| cancelText | string | '取消' | 取消按钮文字 |
| showCancel | boolean | true | 是否显示取消按钮 |
| showConfirm | boolean | true | 是否显示确认按钮 |
| footer | ReactNode | - | 自定义底部内容 |
| maskClosable | boolean | true | 点击遮罩是否关闭 |
| showMask | boolean | true | 是否显示遮罩 |
| animation | 'fade' \| 'slide' \| 'zoom' \| 'none' | 'fade' | 动画效果 |
| closable | boolean | true | 是否显示关闭按钮 |
| centered | boolean | true | 是否垂直居中 |
| destroyOnClose | boolean | false | 关闭时是否销毁 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |
| maskStyle | React.CSSProperties | - | 自定义遮罩样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onConfirm | () => void | 确认事件 |
| onCancel | () => void | 取消事件 |
| onClose | () => void | 关闭事件 |
| afterClose | () => void | 关闭后事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| show | - | void | 显示模态框 |
| hide | - | void | 隐藏模态框 |
| toggle | - | void | 切换显示状态 |
| isVisible | - | boolean | 获取显示状态 |
| setTitle | (title: ReactNode) => void | void | 设置标题 |
| setContent | (content: ReactNode) => void | void | 设置内容 |

## 样式定制

### CSS 变量

```css
:root {
  --modal-bg-color: #ffffff;
  --modal-text-color: #111827;
  --modal-border-color: #e5e7eb;
  --modal-header-bg-color: #f9fafb;
  --modal-footer-bg-color: #f9fafb;
  --modal-mask-bg-color: rgba(0, 0, 0, 0.5);
  --modal-title-color: #111827;
  --modal-content-color: #6b7280;
  --modal-button-primary-color: #3b82f6;
  --modal-button-default-color: #6b7280;
  --modal-border-radius: 8px;
  --modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

## 最佳实践

1. **使用场景**：仅在需要用户立即关注时使用模态框
2. **清晰标题**：提供简洁明确的标题说明
3. **合理按钮**：根据操作重要性设置默认按钮
4. **移动端优化**：在移动端使用合适的尺寸和位置

## 注意事项

1. 模态框组件基于 Taro 的 `View` 和 `CoverView` 组件封装
2. 避免连续显示多个模态框，影响用户体验
3. 在模态框内避免使用过多的滚动内容
4. 确保模态框在所有平台上都能正常显示和交互