# Performance 组件

Performance组件用于优化应用性能，包含懒加载、性能分析和虚拟列表等功能。

## LazyComponent 懒加载组件

LazyComponent组件用于延迟加载组件，提高页面加载性能。

### 基础用法

```tsx
import { LazyComponent } from 'taro-uno'

// 懒加载的组件
const HeavyComponent = () => {
  return <div>这是一个重量级组件</div>
}

function BasicLazyComponent() {
  return (
    <LazyComponent 
      component={HeavyComponent}
      placeholder={<div>加载中...</div>}
      timeout={3000}
    />
  )
}
```

### 条件懒加载

```tsx
import { LazyComponent } from 'taro-uno'

function ConditionalLazyComponent() {
  const [shouldLoad, setShouldLoad] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShouldLoad(true)}>
        加载组件
      </button>
      
      <LazyComponent 
        component={HeavyComponent}
        load={shouldLoad}
        placeholder={<div>点击按钮加载组件</div>}
      />
    </div>
  )
}
```

### 错误处理

```tsx
import { LazyComponent } from 'taro-uno'

function ErrorHandlingLazyComponent() {
  return (
    <LazyComponent 
      component={HeavyComponent}
      placeholder={<div>加载中...</div>}
      fallback={<div>加载失败，请重试</div>}
      onError={(error) => {
        console.error('组件加载失败:', error)
      }}
    />
  )
}
```

### 预加载

```tsx
import { LazyComponent } from 'taro-uno'

function PreloadLazyComponent() {
  return (
    <div>
      <LazyComponent 
        component={HeavyComponent}
        preload={true}
        preloadDelay={2000}
        placeholder={<div>预加载中...</div>}
      />
    </div>
  )
}
```

## PerformanceAnalyzer 性能分析器

PerformanceAnalyzer组件用于监控和分析组件性能。

### 基础用法

```tsx
import { PerformanceAnalyzer } from 'taro-uno'

function BasicPerformanceAnalyzer() {
  return (
    <PerformanceAnalyzer 
      enabled={true}
      reportInterval={5000}
      onReport={(metrics) => {
        console.log('性能指标:', metrics)
      }}
    >
      <div>
        {/* 需要监控性能的组件 */}
        <HeavyComponent />
      </div>
    </PerformanceAnalyzer>
  )
}
```

### 性能指标监控

```tsx
import { PerformanceAnalyzer } from 'taro-uno'

function MetricsPerformanceAnalyzer() {
  return (
    <PerformanceAnalyzer 
      enabled={true}
      metrics={['renderTime', 'memoryUsage', 'fps']}
      threshold={{
        renderTime: 100, // 渲染时间阈值（毫秒）
        memoryUsage: 50, // 内存使用阈值（MB）
        fps: 30 // 帧率阈值
      }}
      onThresholdExceed={(metric, value, threshold) => {
        console.warn(`性能指标 ${metric} 超过阈值: ${value} > ${threshold}`)
      }}
    >
      <div>
        {/* 需要监控的组件 */}
        <ComplexComponent />
      </div>
    </PerformanceAnalyzer>
  )
}
```

### 性能报告

```tsx
import { PerformanceAnalyzer } from 'taro-uno'

function ReportPerformanceAnalyzer() {
  return (
    <PerformanceAnalyzer 
      enabled={true}
      reportInterval={10000}
      detailedReport={true}
      onReport={(metrics) => {
        // 发送性能报告到服务器
        fetch('/api/performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metrics),
        })
      }}
    >
      <div>
        {/* 需要监控的组件 */}
        <AnalyticsComponent />
      </div>
    </PerformanceAnalyzer>
  )
}
```

## VirtualList 虚拟列表

VirtualList组件用于优化长列表性能，只渲染可见区域的元素。

### 基础用法

```tsx
import { VirtualList } from 'taro-uno'

function BasicVirtualList() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目 ${i + 1}`,
    description: `这是第 ${i + 1} 个项目的描述`
  }))
  
  return (
    <VirtualList 
      data={data}
      itemHeight={50}
      renderItem={(item) => (
        <div style={{ 
          height: '50px', 
          borderBottom: '1px solid #eee',
          padding: '8px',
          boxSizing: 'border-box'
        }}>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
      )}
    />
  )
}
```

### 动态高度

```tsx
import { VirtualList } from 'taro-uno'

function DynamicHeightVirtualList() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目 ${i + 1}`,
    content: 'A'.repeat((i % 10) + 1) + ' 动态内容'
  }))
  
  const estimateHeight = (index) => {
    return 50 + (index % 10) * 10
  }
  
  const measureHeight = (element) => {
    return element.getBoundingClientRect().height
  }
  
  return (
    <VirtualList 
      data={data}
      itemHeight="auto"
      estimateHeight={estimateHeight}
      measureHeight={measureHeight}
      renderItem={(item) => (
        <div style={{ 
          borderBottom: '1px solid #eee',
          padding: '8px',
          boxSizing: 'border-box'
        }}>
          <h4>{item.name}</h4>
          <p>{item.content}</p>
        </div>
      )}
    />
  )
}
```

### 网格布局

```tsx
import { VirtualList } from 'taro-uno'

function GridVirtualList() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目 ${i + 1}`,
    image: `https://picsum.photos/200/200?random=${i}`
  }))
  
  return (
    <VirtualList 
      data={data}
      itemHeight={200}
      itemWidth={200}
      columns={4}
      direction="vertical"
      renderItem={(item) => (
        <div style={{ 
          width: '200px',
          height: '200px',
          border: '1px solid #eee',
          padding: '8px',
          boxSizing: 'border-box',
          display: 'inline-block'
        }}>
          <img 
            src={item.image} 
            alt={item.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <div>{item.name}</div>
        </div>
      )}
    />
  )
}
```

### 水平滚动

```tsx
import { VirtualList } from 'taro-uno'

function HorizontalVirtualList() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目 ${i + 1}`,
    content: `内容 ${i + 1}`
  }))
  
  return (
    <VirtualList 
      data={data}
      itemHeight={200}
      itemWidth={150}
      direction="horizontal"
      renderItem={(item) => (
        <div style={{ 
          width: '150px',
          height: '200px',
          border: '1px solid #eee',
          padding: '8px',
          boxSizing: 'border-box',
          display: 'inline-block'
        }}>
          <h4>{item.name}</h4>
          <p>{item.content}</p>
        </div>
      )}
    />
  )
}
```

### 分组虚拟列表

```tsx
import { VirtualList } from 'taro-uno'

function GroupedVirtualList() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目 ${i + 1}`,
    category: `分类 ${Math.floor(i / 100) + 1}`,
    content: `内容 ${i + 1}`
  }))
  
  const groupBy = (item) => item.category
  const groupHeaderHeight = 40
  
  return (
    <VirtualList 
      data={data}
      itemHeight={50}
      groupBy={groupBy}
      groupHeaderHeight={groupHeaderHeight}
      renderItem={(item) => (
        <div style={{ 
          height: '50px',
          borderBottom: '1px solid #eee',
          padding: '8px 16px',
          boxSizing: 'border-box'
        }}>
          <h4>{item.name}</h4>
          <p>{item.content}</p>
        </div>
      )}
      renderGroupHeader={(group) => (
        <div style={{ 
          height: '40px',
          background: '#f5f5f5',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid #ddd'
        }}>
          {group}
        </div>
      )}
    />
  )
}
```

## 复杂性能优化示例

```tsx
import { LazyComponent, PerformanceAnalyzer, VirtualList } from 'taro-uno'

function ComplexPerformanceExample() {
  const [showAnalytics, setShowAnalytics] = useState(false)
  
  // 懒加载的分析组件
  const AnalyticsDashboard = () => (
    <PerformanceAnalyzer 
      enabled={true}
      metrics={['renderTime', 'memoryUsage', 'fps']}
      reportInterval={5000}
      onReport={(metrics) => {
        console.log('分析仪表板性能:', metrics)
      }}
    >
      <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>性能分析仪表板</h3>
        <VirtualList 
          data={Array.from({ length: 1000 }, (_, i) => ({
            id: i,
            metric: `指标 ${i + 1}`,
            value: Math.random() * 100
          }))}
          itemHeight={60}
          renderItem={(item) => (
            <div style={{ 
              height: '60px',
              borderBottom: '1px solid #eee',
              padding: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{item.metric}</span>
              <span>{item.value.toFixed(2)}</span>
            </div>
          )}
        />
      </div>
    </PerformanceAnalyzer>
  )
  
  return (
    <div>
      <h2>性能优化示例</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setShowAnalytics(!showAnalytics)}>
          {showAnalytics ? '隐藏' : '显示'}分析仪表板
        </button>
      </div>
      
      {/* 条件懒加载分析仪表板 */}
      {showAnalytics && (
        <LazyComponent 
          component={AnalyticsDashboard}
          placeholder={<div>加载分析仪表板...</div>}
          timeout={3000}
        />
      )}
      
      {/* 虚拟列表展示大量数据 */}
      <h3>虚拟列表示例</h3>
      <VirtualList 
        data={Array.from({ length: 10000 }, (_, i) => ({
          id: i,
          title: `项目 ${i + 1}`,
          description: `这是第 ${i + 1} 个项目的详细描述`,
          category: `分类 ${Math.floor(i / 100) + 1}`,
          date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
        }))}
        itemHeight={80}
        groupBy={(item) => item.category}
        groupHeaderHeight={40}
        renderItem={(item) => (
          <div style={{ 
            height: '80px',
            borderBottom: '1px solid #eee',
            padding: '12px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0 }}>{item.title}</h4>
              <span style={{ color: '#666', fontSize: '12px' }}>{item.date}</span>
            </div>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
              {item.description}
            </p>
          </div>
        )}
        renderGroupHeader={(group) => (
          <div style={{ 
            height: '40px',
            background: '#f0f0f0',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            borderBottom: '1px solid #ddd'
          }}>
            {group}
          </div>
        )}
      />
    </div>
  )
}
```

## API

### LazyComponent Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| component | ComponentType | - | 要懒加载的组件 |
| load | boolean | true | 是否加载组件 |
| placeholder | ReactNode | - | 加载时的占位符 |
| fallback | ReactNode | - | 加载失败时的占位符 |
| timeout | number | 3000 | 加载超时时间 |
| preload | boolean | false | 是否预加载 |
| preloadDelay | number | 0 | 预加载延迟时间 |
| onError | (error: Error) => void | - | 错误回调 |
| onLoad | () => void | - | 加载完成回调 |

### PerformanceAnalyzer Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| enabled | boolean | true | 是否启用性能分析 |
| metrics | string[] | ['renderTime'] | 要监控的指标 |
| reportInterval | number | 5000 | 报告间隔（毫秒） |
| threshold | object | - | 性能阈值 |
| detailedReport | boolean | false | 是否生成详细报告 |
| onReport | (metrics: object) => void | - | 性能报告回调 |
| onThresholdExceed | (metric: string, value: number, threshold: number) => void | - | 阈值超出回调 |

### VirtualList Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | any[] | [] | 数据数组 |
| itemHeight | number \| 'auto' | 50 | 项目高度 |
| itemWidth | number \| string | '100%' | 项目宽度 |
| columns | number | 1 | 网格列数 |
| direction | 'vertical' \| 'horizontal' | 'vertical' | 滚动方向 |
| groupBy | (item: any) => string | - | 分组函数 |
| groupHeaderHeight | number | 40 | 组头高度 |
| estimateHeight | (index: number) => number | - | 高度估算函数 |
| measureHeight | (element: Element) => number | - | 高度测量函数 |
| renderItem | (item: any, index: number) => ReactNode | - | 项目渲染函数 |
| renderGroupHeader | (group: string) => ReactNode | - | 组头渲染函数 |
| overscan | number | 5 | 预渲染数量 |
| threshold | number | 100 | 滚动阈值 |

## 最佳实践

### 1. 合理使用懒加载

```tsx
// 推荐：对重量级组件使用懒加载
<LazyComponent component={HeavyChart} />

// 推荐：对非首屏组件使用懒加载
<LazyComponent component={UserProfile} load={isVisible} />

// 避免：对轻量级组件使用懒加载
<LazyComponent component={SimpleButton} />
```

### 2. 性能监控策略

```tsx
// 推荐：监控关键组件性能
<PerformanceAnalyzer 
  metrics={['renderTime', 'memoryUsage']}
  threshold={{ renderTime: 100 }}
>

// 推荐：定期报告性能指标
<PerformanceAnalyzer 
  reportInterval={30000}
  onReport={sendToAnalytics}
/>
```

### 3. 虚拟列表优化

```tsx
// 推荐：固定高度项目性能最佳
<VirtualList itemHeight={50} />

// 推荐：合理设置预渲染数量
<VirtualList overscan={5} />

// 推荐：使用网格布局优化
<VirtualList columns={3} itemWidth={200} />
```

## 注意事项

1. **懒加载时机**：合理设置懒加载的时机，避免影响用户体验
2. **性能监控开销**：性能监控本身也会消耗性能，合理设置监控频率
3. **虚拟列表数据**：确保数据源稳定，避免频繁更新导致的性能问题
4. **浏览器兼容性**：虚拟列表在不同浏览器中的表现可能有所不同
5. **内存管理**：大量数据的虚拟列表要注意内存管理，避免内存泄漏