# usePerformanceMonitor 性能监控钩子

性能监控钩子用于监控组件的性能指标，包括渲染时间、内存使用和交互性能。

## 基础用法

```tsx
import { usePerformanceMonitor } from '@/hooks'

function MyComponent() {
  const { metrics, startMonitoring, stopMonitoring, getReport } = usePerformanceMonitor({
    enabled: true,
    reportInterval: 5000,
    maxHistory: 100
  })

  useEffect(() => {
    startMonitoring()
    return () => stopMonitoring()
  }, [])

  return (
    <div>
      <h3>性能监控</h3>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  )
}
```

## 配置选项

```tsx
// 完整配置
const { metrics } = usePerformanceMonitor({
  enabled: true,                    // 是否启用监控
  reportInterval: 5000,             // 报告间隔（毫秒）
  maxHistory: 100,                  // 最大历史记录数
  sampleRate: 0.1,                 // 采样率
  includeMemory: true,             // 是否包含内存信息
  includeRender: true,             // 是否包含渲染信息
  includeInteraction: true,        // 是否包含交互信息
  includeNetwork: true,             // 是否包含网络信息
  threshold: {                     // 性能阈值
    renderTime: 16.67,             // 渲染时间阈值（毫秒）
    memoryUsage: 50,               // 内存使用阈值（MB）
    interactionDelay: 100          // 交互延迟阈值（毫秒）
  },
  callbacks: {                     // 回调函数
    onPerformanceWarning: (metrics) => console.warn('性能警告:', metrics),
    onMemoryLeak: (metrics) => console.error('内存泄漏:', metrics),
    onRenderBottleneck: (metrics) => console.error('渲染瓶颈:', metrics)
  }
})
```

## 性能指标

```tsx
// 获取性能指标
const { metrics } = usePerformanceMonitor()

// 渲染指标
const renderMetrics = {
  renderTime: 12.5,        // 渲染时间（毫秒）
  componentCount: 15,     // 组件数量
  updateCount: 8,         // 更新次数
  reRenderCount: 3        // 重新渲染次数
}

// 内存指标
const memoryMetrics = {
  usedJSHeapSize: 45,     // 已使用堆大小（MB）
  totalJSHeapSize: 100,   // 总堆大小（MB）
  jsHeapSizeLimit: 500,  // 堆大小限制（MB）
  memoryLeakScore: 0.2    // 内存泄漏评分
}

// 交互指标
const interactionMetrics = {
  firstInputDelay: 85,   // 首次输入延迟（毫秒）
  interactionToNextPaint: 120,  // 交互到下次绘制时间
  cumulativeLayoutShift: 0.05,    // 累积布局偏移
  timeToInteractive: 1800         // 可交互时间（毫秒）
}
```

## 性能报告

```tsx
// 生成性能报告
const { getReport } = usePerformanceMonitor()

const report = getReport()
console.log('性能报告:', report)

// 报告结构
const performanceReport = {
  summary: {
    overallScore: 85,        // 总体评分
    status: 'good',          // 状态：good/warning/critical
    timestamp: Date.now()    // 时间戳
  },
  metrics: {
    render: { ... },          // 渲染指标
    memory: { ... },          // 内存指标
    interaction: { ... },     // 交互指标
    network: { ... }          // 网络指标
  },
  recommendations: [          // 优化建议
    {
      type: 'render',
      severity: 'medium',
      message: '考虑使用React.memo优化组件渲染',
      impact: 'medium'
    }
  ],
  history: [                 // 历史记录
    {
      timestamp: Date.now(),
      metrics: { ... }
    }
  ]
}
```

## 性能警告

```tsx
// 性能警告处理
const { metrics, onPerformanceWarning } = usePerformanceMonitor({
  threshold: {
    renderTime: 16.67,
    memoryUsage: 50
  },
  callbacks: {
    onPerformanceWarning: (metrics) => {
      console.warn('性能警告:', metrics)
      // 可以在这里发送错误报告或显示用户提示
    }
  }
})

// 监听特定指标
useEffect(() => {
  if (metrics.render.renderTime > 16.67) {
    console.warn('渲染时间过长:', metrics.render.renderTime)
  }
}, [metrics.render.renderTime])
```

## 内存泄漏检测

```tsx
// 内存泄漏检测
const { metrics, onMemoryLeak } = usePerformanceMonitor({
  includeMemory: true,
  callbacks: {
    onMemoryLeak: (metrics) => {
      console.error('检测到内存泄漏:', metrics)
      // 可以在这里清理内存或重启应用
    }
  }
})

// 监控内存使用趋势
useEffect(() => {
  const currentMemory = metrics.memory.usedJSHeapSize
  const previousMemory = metrics.history[metrics.history.length - 2]?.memory.usedJSHeapSize
  
  if (previousMemory && currentMemory > previousMemory * 1.2) {
    console.warn('内存使用快速增长')
  }
}, [metrics.memory.usedJSHeapSize, metrics.history])
```

## 渲染优化

```tsx
// 渲染优化建议
const { getReport } = usePerformanceMonitor()

const report = getReport()

if (report.summary.status === 'warning') {
  // 根据建议进行优化
  report.recommendations.forEach(rec => {
    switch (rec.type) {
      case 'render':
        console.log('渲染优化:', rec.message)
        break
      case 'memory':
        console.log('内存优化:', rec.message)
        break
      case 'interaction':
        console.log('交互优化:', rec.message)
        break
    }
  })
}
```

## 性能基准测试

```tsx
// 性能基准测试
const { startBenchmark, stopBenchmark, getBenchmarkResults } = usePerformanceMonitor()

const runBenchmark = async () => {
  startBenchmark('组件渲染测试')
  
  // 执行测试操作
  for (let i = 0; i < 1000; i++) {
    // 模拟组件渲染
    await new Promise(resolve => setTimeout(resolve, 1))
  }
  
  const results = stopBenchmark()
  console.log('基准测试结果:', results)
}

// 基准测试结果
const benchmarkResults = {
  testName: '组件渲染测试',
  duration: 1500,                    // 测试持续时间（毫秒）
  operations: 1000,                  // 操作次数
  averageTime: 1.5,                 // 平均时间（毫秒）
  minTime: 0.8,                     // 最小时间（毫秒）
  maxTime: 3.2,                     // 最大时间（毫秒）
  throughput: 666.67,                // 吞吐量（操作/秒）
  memoryUsage: 2.5                  // 内存使用（MB）
}
```

## 自定义指标

```tsx
// 自定义性能指标
const { addCustomMetric, getCustomMetrics } = usePerformanceMonitor()

// 添加自定义指标
addCustomMetric('customMetric', {
  value: 42,
  unit: 'ms',
  threshold: 50,
  description: '自定义性能指标'
})

// 获取自定义指标
const customMetrics = getCustomMetrics()
console.log('自定义指标:', customMetrics)
```

## API

### Options

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| enabled | boolean | true | 是否启用监控 |
| reportInterval | number | 5000 | 报告间隔（毫秒） |
| maxHistory | number | 100 | 最大历史记录数 |
| sampleRate | number | 1.0 | 采样率 |
| includeMemory | boolean | true | 是否包含内存信息 |
| includeRender | boolean | true | 是否包含渲染信息 |
| includeInteraction | boolean | true | 是否包含交互信息 |
| includeNetwork | boolean | true | 是否包含网络信息 |
| threshold | object | - | 性能阈值配置 |
| callbacks | object | - | 回调函数配置 |

### 返回值

| 属性名 | 类型 | 说明 |
|--------|------|------|
| metrics | object | 当前性能指标 |
| startMonitoring | () => void | 开始监控 |
| stopMonitoring | () => void | 停止监控 |
| getReport | () => object | 获取性能报告 |
| startBenchmark | (name: string) => void | 开始基准测试 |
| stopBenchmark | () => object | 停止基准测试 |
| addCustomMetric | (name: string, metric: object) => void | 添加自定义指标 |
| getCustomMetrics | () => object | 获取自定义指标 |
| clearHistory | () => void | 清除历史记录 |
| exportData | () => string | 导出监控数据 |
| importData | (data: string) => void | 导入监控数据 |

### 性能指标类型

```tsx
interface PerformanceMetrics {
  render: {
    renderTime: number
    componentCount: number
    updateCount: number
    reRenderCount: number
  }
  memory: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
    memoryLeakScore: number
  }
  interaction: {
    firstInputDelay: number
    interactionToNextPaint: number
    cumulativeLayoutShift: number
    timeToInteractive: number
  }
  network: {
    requestCount: number
    totalSize: number
    averageTime: number
    cacheHitRate: number
  }
  custom: Record<string, any>
}
```

## 最佳实践

1. **合理配置**：根据应用需求配置合适的监控参数
2. **性能优化**：根据监控结果进行相应的性能优化
3. **用户体验**：在性能不佳时提供用户反馈
4. **数据分析**：定期分析性能数据，发现潜在问题

## 注意事项

1. 性能监控本身也会消耗一定的性能资源
2. 在生产环境中建议降低采样率以减少性能影响
3. 内存泄漏检测需要长期运行才能发现趋势
4. 性能指标仅供参考，需要结合实际用户体验进行判断