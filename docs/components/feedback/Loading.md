# Loading 加载组件

加载组件用于显示加载状态，支持多种加载动画和样式。

## 基础用法

```tsx
import { Loading } from 'taro-uno'

// 基础加载
<Loading />

// 带文本的加载
<Loading>加载中...</Loading>
```

## 类型

```tsx
// 旋转加载
<Loading type="spinner" />

// 点状加载
<Loading type="dots" />

// 脉冲加载
<Loading type="pulse" />

// 波浪加载
<Loading type="wave" />
```

## 尺寸

```tsx
<Loading size="small" />
<Loading size="medium" />
<Loading size="large" />
<Loading size="xlarge" />
```

## 颜色

```tsx
<Loading color="#4ecdc4" />
<Loading color="#ff6b6b" />
<Loading color="#45b7d1" />
<Loading color="#96ceb4" />
```

## 文本位置

```tsx
<Loading textPosition="top">加载中...</Loading>
<Loading textPosition="bottom">加载中...</Loading>
<Loading textPosition="left">加载中...</Loading>
<Loading textPosition="right">加载中...</Loading>
```

## 全屏加载

```tsx
<Loading fullScreen>
  数据加载中，请稍候...
</Loading>
```

## 遮罩加载

```tsx
<Loading mask>
  内容加载中...
</Loading>
```

## 自定义文本

```tsx
<Loading>
  <Text>正在处理您的请求</Text>
  <Text type="secondary">预计需要 3-5 秒</Text>
</Loading>
```

## 进度加载

```tsx
<Loading type="progress" percent={30} />
<Loading type="progress" percent={60} showInfo />
<Loading type="progress" percent={90} status="active" />
```

## 圆形进度

```tsx
<Loading type="circle" percent={30} />
<Loading type="circle" percent={60} showInfo />
<Loading type="circle" percent={90} status="success" />
```

## 步骤加载

```tsx
<Loading type="steps" current={1} steps={3} />
<Loading type="steps" current={2} steps={3} />
<Loading type="steps" current={3} steps={3} />
```

## 自定义动画

```tsx
<Loading
  type="custom"
  customAnimation={
    <div style={{ animation: 'bounce 1s infinite' }}>
      <Icon name="star" size={24} />
    </div>
  }
/>
```

## 组合使用

```tsx
<Loading
  type="spinner"
  size="large"
  color="#4ecdc4"
  textPosition="bottom"
>
  <Text weight="bold">数据加载中</Text>
  <Text type="secondary">请耐心等待</Text>
</Loading>
```

## 控制显示

```tsx
function DataLoader() {
  const [loading, setLoading] = useState(false)
  
  const loadData = async () => {
    setLoading(true)
    try {
      await fetchData()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={loadData} disabled={loading}>
        {loading ? '加载中...' : '加载数据'}
      </Button>
      
      {loading && (
        <Loading fullScreen>
          数据加载中，请稍候...
        </Loading>
      )}
    </div>
  )
}
```

## 延迟加载

```tsx
<Loading delay={1000}>
  延迟显示的加载
</Loading>
```

## 超时加载

```tsx
<Loading timeout={5000}>
  <Text>加载超时</Text>
  <Text type="secondary">请检查网络连接</Text>
</Loading>
```

## 错误状态

```tsx
<Loading status="error">
  <Text>加载失败</Text>
  <Text type="secondary">请重试</Text>
</Loading>
```

## 成功状态

```tsx
<Loading status="success">
  <Text>加载完成</Text>
  <Text type="secondary">数据已更新</Text>
</Loading>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | 'spinner' \| 'dots' \| 'pulse' \| 'wave' \| 'progress' \| 'circle' \| 'steps' \| 'custom' | 'spinner' | 加载类型 |
| size | 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' | 加载尺寸 |
| color | string | - | 加载颜色 |
| textPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | 文本位置 |
| fullScreen | boolean | false | 是否全屏加载 |
| mask | boolean | false | 是否显示遮罩 |
| percent | number | - | 进度百分比 |
| showInfo | boolean | false | 是否显示进度信息 |
| status | 'active' \| 'success' \| 'error' | 'active' | 加载状态 |
| current | number | - | 当前步骤 |
| steps | number | - | 总步骤数 |
| customAnimation | ReactNode | - | 自定义动画 |
| delay | number | 0 | 延迟显示时间 |
| timeout | number | - | 超时时间 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onTimeout | () => void | 超时回调 |
| onComplete | () => void | 完成回调 |
| onError | (error: Error) => void | 错误回调 |

## 样式定制

### CSS 变量

```css
:root {
  --loading-color: #4ecdc4;
  --loading-background: rgba(255, 255, 255, 0.9);
  --loading-text-color: #111827;
  --loading-mask-background: rgba(0, 0, 0, 0.45);
  --loading-spinner-size: 32px;
  --loading-dots-size: 8px;
  --loading-progress-height: 6px;
  --loading-circle-size: 120px;
}
```

### 自定义样式类

```tsx
<Loading className="custom-loading" />

<style>
.custom-loading {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
}

.custom-loading .loading-spinner {
  border-color: white;
  border-top-color: transparent;
}
</style>
```

## 最佳实践

1. **用户体验**：为长时间操作提供加载反馈
2. **性能考虑**：避免过度使用复杂的加载动画
3. **无障碍**：为加载状态提供文本描述
4. **错误处理**：提供加载失败时的处理方式
5. **响应式设计**：在不同屏幕尺寸下调整加载样式

## 注意事项

1. 全屏加载会覆盖整个屏幕，确保提供明确的加载文本
2. 进度加载需要设置具体的百分比数值
3. 自定义动画需要考虑性能和兼容性
4. 延迟加载可以避免频繁的加载状态切换

## 示例代码

### 页面加载

```tsx
function PageLoader() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {loading ? (
        <Loading fullScreen>
          <div style={{ textAlign: 'center' }}>
            <Icon name="rocket" size={48} />
            <Text size="lg" weight="bold">页面加载中</Text>
            <Text type="secondary">请稍候...</Text>
          </div>
        </Loading>
      ) : (
        <div>
          <Text>页面内容</Text>
        </div>
      )}
    </div>
  )
}
```

### 表单提交

```tsx
function FormSubmit() {
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await submitForm()
      Message.success('提交成功')
    } catch (error) {
      Message.error('提交失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="请输入内容" />
      <Button type="primary" htmlType="submit" loading={loading}>
        {loading ? '提交中...' : '提交'}
      </Button>
    </form>
  )
}
```

### 数据表格加载

```tsx
function DataTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetchData()
      setData(response.data)
    } catch (error) {
      Message.error('数据加载失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={loadData} disabled={loading}>
        {loading ? '加载中...' : '刷新数据'}
      </Button>
      
      <div style={{ position: 'relative', minHeight: '200px' }}>
        {loading && (
          <Loading mask>
            数据加载中...
          </Loading>
        )}
        
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </div>
    </div>
  )
}
```

### 文件上传

```tsx
function FileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (file: File) => {
    setUploading(true)
    setProgress(0)

    try {
      await uploadFile(file, (progress) => {
        setProgress(progress)
      })
      Message.success('上传成功')
    } catch (error) {
      Message.error('上传失败')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleUpload(file)
        }}
        disabled={uploading}
      />
      
      {uploading && (
        <Loading type="progress" percent={progress} showInfo />
      )}
    </div>
  )
}
```