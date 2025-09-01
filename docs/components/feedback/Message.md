# Message 消息组件

消息组件用于显示操作反馈信息，支持多种消息类型和显示方式。

## 基础用法

```tsx
import { Message } from 'taro-uno'

// 静态消息
<Message type="info">这是一条信息</Message>

// 可关闭消息
<Message type="success" closable>操作成功</Message>
```

## 类型

```tsx
<Message type="info">信息提示</Message>
<Message type="success">成功提示</Message>
<Message type="warning">警告提示</Message>
<Message type="error">错误提示</Message>
<Message type="loading">加载中</Message>
```

## 图标

```tsx
<Message type="success" showIcon>带图标的成功消息</Message>
<Message type="error" showIcon>带图标的错误消息</Message>
<Message type="warning" showIcon>带图标的警告消息</Message>
<Message type="info" showIcon>带图标的信息消息</Message>
```

## 可关闭

```tsx
<Message type="info" closable>可关闭的消息</Message>
<Message type="success" closable onClose={() => console.log('关闭了')}>
  可关闭的成功消息
</Message>
```

## 操作按钮

```tsx
<Message
  type="info"
  action={
    <Button size="sm" type="primary">
      查看详情
    </Button>
  }
>
  带操作按钮的消息
</Message>
```

## 自定义图标

```tsx
<Message
  type="info"
  icon={<Icon name="bell" size={16} />}
>
  自定义图标的消息
</Message>
```

## 自定义样式

```tsx
<Message
  type="success"
  style={{
    background: 'linear-gradient(90deg, #22c55e, #16a34a)',
    color: 'white'
  }}
>
  自定义样式的消息
</Message>
```

## 不同尺寸

```tsx
<Message type="info" size="small">小尺寸消息</Message>
<Message type="info" size="medium">中等尺寸消息</Message>
<Message type="info" size="large">大尺寸消息</Message>
```

## 圆角

```tsx
<Message type="info" rounded="none">无圆角</Message>
<Message type="info" rounded="sm">小圆角</Message>
<Message type="info" rounded="md">中等圆角</Message>
<Message type="info" rounded="lg">大圆角</Message>
<Message type="info" rounded="full">完全圆角</Message>
```

## 边框

```tsx
<Message type="info" bordered>带边框的消息</Message>
<Message type="success" bordered color="#22c55e">
  带自定义颜色边框的消息
</Message>
```

## 阴影

```tsx
<Message type="info" shadow="sm">小阴影</Message>
<Message type="info" shadow="md">中等阴影</Message>
<Message type="info" shadow="lg">大阴影</Message>
```

## 全局消息

```tsx
import { message } from 'taro-uno'

// 显示全局消息
message.info('这是一条信息')
message.success('操作成功')
message.warning('警告信息')
message.error('操作失败')
message.loading('加载中...')

// 带配置的全局消息
message.success({
  content: '操作成功',
  duration: 3000,
  onClose: () => console.log('消息关闭')
})
```

## 消息队列

```tsx
// 显示多条消息
message.info('第一条消息')
message.success('第二条消息')
message.warning('第三条消息')

// 清空所有消息
message.destroy()
```

## 位置控制

```tsx
// 不同位置的消息
message.info({
  content: '顶部消息',
  placement: 'top'
})

message.info({
  content: '底部消息',
  placement: 'bottom'
})

message.info({
  content: '左侧消息',
  placement: 'left'
})

message.info({
  content: '右侧消息',
  placement: 'right'
})
```

## 持续时间

```tsx
// 自定义持续时间
message.info({
  content: '3秒后关闭',
  duration: 3000
})

message.info({
  content: '5秒后关闭',
  duration: 5000
})

// 不自动关闭
message.info({
  content: '需要手动关闭',
  duration: 0,
  closable: true
})
```

## 动画效果

```tsx
<Message
  type="success"
  animation="fade"
>
  淡入淡出效果
</Message>

<Message
  type="success"
  animation="slide"
>
  滑入滑出效果
</Message>

<Message
  type="success"
  animation="scale"
>
  缩放效果
</Message>
```

## 多行内容

```tsx
<Message type="info">
  <div>
    <Text weight="bold">标题</Text>
    <Text>这是消息的详细内容，支持多行显示。</Text>
    <Text type="secondary">这是第二行内容</Text>
  </div>
</Message>
```

## 组合使用

```tsx
<Message
  type="success"
  showIcon
  closable
  action={
    <Button size="sm" type="primary">
      查看详情
    </Button>
  }
  style={{
    background: 'linear-gradient(90deg, #22c55e, #16a34a)',
    color: 'white',
    borderRadius: '8px'
  }}
>
  <div>
    <Text weight="bold">操作成功</Text>
    <Text>您的数据已成功保存</Text>
  </div>
</Message>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | 'info' \| 'success' \| 'warning' \| 'error' \| 'loading' | 'info' | 消息类型 |
| content | ReactNode | - | 消息内容 |
| showIcon | boolean | false | 是否显示图标 |
| closable | boolean | false | 是否可关闭 |
| icon | ReactNode | - | 自定义图标 |
| action | ReactNode | - | 操作按钮 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 消息尺寸 |
| rounded | 'none' \| 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | 圆角大小 |
| bordered | boolean | false | 是否显示边框 |
| shadow | boolean \| 'sm' \| 'md' \| 'lg' | false | 阴影效果 |
| animation | 'fade' \| 'slide' \| 'scale' | 'fade' | 动画效果 |
| duration | number | 3000 | 显示持续时间 |
| onClose | () => void | - | 关闭回调 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 全局方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| info | content \| config | void | 显示信息消息 |
| success | content \| config | void | 显示成功消息 |
| warning | content \| config | void | 显示警告消息 |
| error | content \| config | void | 显示错误消息 |
| loading | content \| config | void | 显示加载消息 |
| destroy | - | void | 销毁所有消息 |

### 配置对象

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| content | ReactNode | - | 消息内容 |
| duration | number | 3000 | 显示持续时间 |
| closable | boolean | false | 是否可关闭 |
| onClose | () => void | - | 关闭回调 |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | 显示位置 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

## 样式定制

### CSS 变量

```css
:root {
  --message-info-background: #eff6ff;
  --message-info-color: #1e40af;
  --message-info-border-color: #3b82f6;
  
  --message-success-background: #f0fdf4;
  --message-success-color: #166534;
  --message-success-border-color: #22c55e;
  
  --message-warning-background: #fffbeb;
  --message-warning-color: #92400e;
  --message-warning-border-color: #f59e0b;
  
  --message-error-background: #fef2f2;
  --message-error-color: #991b1b;
  --message-error-border-color: #ef4444;
  
  --message-padding: 12px 16px;
  --message-border-radius: 8px;
  --message-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
```

### 自定义样式类

```tsx
<Message className="custom-message" />

<style>
.custom-message {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
}

.custom-message .message-icon {
  color: white;
}

.custom-message .message-close {
  color: white;
}
</style>
```

## 最佳实践

1. **及时反馈**：在用户操作后立即显示反馈消息
2. **类型准确**：根据操作结果选择合适的消息类型
3. **内容简洁**：消息内容要简洁明了，突出重点
4. **持续时间**：根据消息重要性设置合适的显示时间
5. **位置合理**：在用户注意范围内显示消息

## 注意事项

1. 避免同时显示过多消息，造成用户困扰
2. 重要消息建议使用可关闭功能，让用户可以手动关闭
3. 全局消息会在页面顶部显示，注意不要遮挡重要内容
4. 移动端消息要考虑触摸区域的大小

## 示例代码

### 表单提交反馈

```tsx
function FormSubmit() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitForm()
      message.success({
        content: '表单提交成功',
        duration: 3000
      })
    } catch (error) {
      message.error({
        content: '提交失败，请重试',
        duration: 5000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="请输入内容" />
      <Button type="primary" htmlType="submit" loading={loading}>
        提交
      </Button>
    </form>
  )
}
```

### 数据操作反馈

```tsx
function DataOperations() {
  const handleDelete = async (id: string) => {
    try {
      await deleteData(id)
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleUpdate = async (id: string, data: any) => {
    try {
      await updateData(id, data)
      message.success('更新成功')
    } catch (error) {
      message.error('更新失败')
    }
  }

  return (
    <div>
      <Button onClick={() => handleDelete('1')}>删除</Button>
      <Button onClick={() => handleUpdate('1', { name: '新名称' })}>
        更新
      </Button>
    </div>
  )
}
```

### 网络请求反馈

```tsx
function DataFetcher() {
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const loadingKey = message.loading({
      content: '数据加载中...',
      duration: 0
    })

    try {
      const response = await api.getData()
      message.success({
        content: '数据加载成功',
        duration: 2000
      })
      return response
    } catch (error) {
      message.error({
        content: '网络错误，请检查连接',
        duration: 3000
      })
      throw error
    } finally {
      setLoading(false)
      message.destroy(loadingKey)
    }
  }

  return (
    <Button onClick={fetchData} disabled={loading}>
      {loading ? '加载中...' : '获取数据'}
    </Button>
  )
}
```

### 消息通知系统

```tsx
function NotificationSystem() {
  const showNotifications = () => {
    // 模拟多条消息通知
    setTimeout(() => {
      message.info({
        content: '您有一条新消息',
        duration: 3000
      })
    }, 1000)

    setTimeout(() => {
      message.success({
        content: '任务完成',
        duration: 3000
      })
    }, 2000)

    setTimeout(() => {
      message.warning({
        content: '系统将在5分钟后维护',
        duration: 5000
      })
    }, 3000)
  }

  return (
    <div>
      <Button onClick={showNotifications}>显示通知</Button>
      <Button onClick={() => message.destroy()}>清空通知</Button>
    </div>
  )
}
```