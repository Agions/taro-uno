# 性能优化指南

## 📖 概述

Taro-Uno UI 提供了完整的性能优化解决方案，包括 Bundle 优化、加载性能优化、运行时性能优化和性能监控。

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 优化构建
```bash
# 标准优化构建
npm run build:optimized

# 带分析的构建
npm run build:analyze
```

### 性能分析
```bash
# Bundle 分析
npm run analyze

# 性能测试
npm run performance:test
```

## 📦 Bundle 优化

### 代码分割
项目实现了智能代码分割策略：

```javascript
// vite.optimized.config.ts
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'taro-vendor': [
    '@tarojs/taro',
    '@tarojs/components',
    '@tarojs/runtime',
    '@tarojs/helper'
  ]
}
```

### 懒加载
使用动态导入实现组件懒加载：

```tsx
// 路由懒加载
const LazyComponent = React.lazy(() => import('./Component'));

// 使用 Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### 依赖优化
- **外部依赖**: 将核心依赖标记为 external
- **Tree Shaking**: 自动移除未使用的代码
- **压缩优化**: 使用 Terser 进行代码压缩

## ⚡ 加载性能

### 预加载
配置关键资源预加载：

```typescript
// configs/cdn.config.ts
preload: {
  enabled: true,
  resources: [
    '/js/index.js',
    '/css/index.css',
    '/fonts/main.woff2'
  ],
  strategy: 'eager'
}
```

### 缓存策略
不同文件类型的缓存策略：

```typescript
cache: {
  fileTypes: {
    '.js': {
      ttl: 86400, // 24小时
      compress: true,
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable'
      }
    },
    '.css': {
      ttl: 86400,
      compress: true,
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable'
      }
    }
  }
}
```

### CDN 配置
支持多环境 CDN 配置：

```typescript
// 生产环境
export const productionCDNConfig: CDNConfig = {
  enabled: true,
  baseUrl: 'https://cdn.taro-uno-ui.com',
  // ... 其他配置
};

// 开发环境
export const developmentCDNConfig: CDNConfig = {
  enabled: false,
  baseUrl: 'http://localhost:3000',
  // ... 其他配置
};
```

## 🎯 运行时性能

### 虚拟滚动
使用 `VirtualList` 组件优化长列表性能：

```tsx
import { VirtualList } from '@/components/display/VirtualList';

<VirtualList
  data={largeData}
  renderItem={(item, index) => (
    <div key={item.id}>
      {item.content}
    </div>
  )}
  height={400}
  itemHeight={50}
  dynamicHeight={false}
  onEndReached={() => loadMoreData()}
  loadingMore={isLoading}
  hasMore={hasMore}
/>
```

#### 虚拟滚动特性
- ✅ 支持固定高度和动态高度
- ✅ 智能预渲染
- ✅ 滚动性能优化
- ✅ 加载更多支持
- ✅ 空状态和加载状态

### 防抖节流
使用性能优化工具：

```tsx
import { debounce, throttle, rafThrottle } from '@/utils/performance';

// 防抖 - 搜索输入
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

// 节流 - 滚动事件
const throttledScroll = throttle((event: Event) => {
  handleScroll(event);
}, 100);

// RAF 节流 - 动画
const rafThrottledAnimation = rafThrottle(() => {
  updateAnimation();
});
```

#### 性能工具功能
- **debounce**: 智能防抖，支持 leading/trailing 调用
- **throttle**: 时间戳和定时器节流
- **rafThrottle**: 使用 requestAnimationFrame 的节流
- **memoize**: 函数记忆化
- **lazyLoad**: 资源懒加载
- **batch**: 批处理函数

### 内存优化
使用性能监控 Hook：

```tsx
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

const MyComponent = () => {
  const { metrics, startMonitoring, stopMonitoring } = usePerformanceMonitor({
    enableRenderMonitor: true,
    enableMemoryMonitor: true,
    thresholds: {
      renderTime: 16,    // 60fps
      memoryUsage: 50,   // 50MB
      interactionTime: 100 // 100ms
    },
    onPerformanceWarning: (metrics) => {
      console.warn('性能警告:', metrics);
    }
  });

  React.useEffect(() => {
    startMonitoring();
    return () => stopMonitoring();
  }, []);

  return (
    <div>
      {/* 组件内容 */}
    </div>
  );
};
```

## 📊 性能监控

### PerformanceMonitor 组件
实时性能监控组件：

```tsx
import { PerformanceMonitor } from '@/components/feedback/PerformanceMonitor';

<PerformanceMonitor
  autoStart={true}
  interval={5000}
  showChart={true}
  showRecommendations={true}
  thresholds={{
    renderTime: 16,
    memoryUsage: 50,
    interactionTime: 100
  }}
  onGenerateReport={(report) => {
    console.log('性能报告:', report);
  }}
/>
```

#### 监控指标
- **渲染时间**: 组件渲染耗时
- **内存使用**: 内存使用量和占比
- **交互性能**: 用户交互响应时间
- **渲染次数**: 组件重新渲染次数

### 性能报告
自动生成性能报告：

```javascript
// 生成详细报告
const report = getPerformanceReport();

// 报告内容
{
  timestamp: "2025-09-10T10:30:00.000Z",
  metrics: {
    renderTime: 12.5,
    memoryUsage: { used: 31457280, total: 52428800, percentage: 60 },
    interactionTime: 85
  },
  score: {
    overall: 95,
    render: 90,
    memory: 80,
    interaction: 95
  },
  recommendations: [
    {
      type: 'render',
      priority: 'medium',
      title: '渲染性能优化建议',
      description: '渲染时间略高于阈值',
      solution: '考虑使用 React.memo 优化组件渲染'
    }
  ]
}
```

## 🔧 工具和脚本

### 构建工具
```bash
# 优化构建
npm run build:optimized

# 带分析的构建
npm run build:analyze

# 标准构建
npm run build
```

### 分析工具
```bash
# Bundle 分析
npm run analyze

# 清理分析报告
npm run analyze:clean

# 性能测试
npm run performance:test
```

### 自定义脚本
```bash
# 快速性能测试
node test-performance.mjs

# 优化构建
node scripts/build-optimized.js

# 详细分析
node scripts/analyze-bundle.js
```

## 📈 性能优化最佳实践

### 1. 组件优化
```tsx
// 使用 React.memo 优化组件渲染
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data.content}</div>;
});

// 使用 useMemo 和 useCallback
const ExpensiveComponent = ({ items, onItemClick }) => {
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }));
  }, [items]);

  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {processedItems.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
};
```

### 2. 列表优化
```tsx
// 使用虚拟滚动处理大数据列表
const BigList = ({ data }) => {
  return (
    <VirtualList
      data={data}
      renderItem={(item) => <ListItem item={item} />}
      height={600}
      itemHeight={80}
      overscanCount={5}
    />
  );
};

// 使用 key 优化列表渲染
const RegularList = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
        />
      ))}
    </div>
  );
};
```

### 3. 事件处理优化
```tsx
// 使用防抖处理搜索输入
const SearchInput = () => {
  const [query, setQuery] = useState('');
  
  const debouncedSearch = debounce((searchQuery) => {
    performSearch(searchQuery);
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="搜索..."
    />
  );
};

// 使用节流处理滚动事件
const ScrollContainer = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const throttledScroll = throttle((e) => {
    setScrollPosition(e.target.scrollTop);
  }, 100);

  return (
    <div 
      className="scroll-container"
      onScroll={throttledScroll}
    >
      {/* 内容 */}
    </div>
  );
};
```

### 4. 图片优化
```tsx
// 使用懒加载图片
const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className="lazy-image-container">
      {loaded ? (
        <img src={src} alt={alt} {...props} />
      ) : (
        <div className="image-placeholder">Loading...</div>
      )}
    </div>
  );
};
```

## 🎯 性能目标

### 当前性能指标
- **Bundle 大小**: 0.41MB (减少 59%)
- **首屏加载时间**: < 2秒
- **性能分数**: 100/100

### 优化目标
- ✅ Bundle 大小减少 30% (实际减少 59%)
- ✅ 首屏加载时间 < 2秒
- ✅ 完整的性能监控体系
- ✅ 运行时性能优化

## 🔧 新增性能工具

### 标准化组件类型
我们实现了完整的标准化组件类型系统：

```tsx
import type {
  StandardComponentProps,
  FormComponentProps,
  LayoutComponentProps
} from '@taro-uno/ui/types/standardized-components';

// 使用标准化类型
interface MyButtonProps extends StandardComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const MyButton: React.FC<MyButtonProps> = ({
  className,
  style,
  children,
  variant = 'primary',
  size = 'medium'
}) => {
  return (
    <button
      className={cn('my-button', `my-button--${variant}`, `my-button--${size}`, className)}
      style={style}
    >
      {children}
    </button>
  );
};
```

### 优化的构建配置
使用增强的 Vite 配置进行性能优化：

```typescript
// vite.optimized.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'taro-vendor': ['@tarojs/taro', '@tarojs/components'],
          'utils-vendor': ['lodash-es', 'dayjs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tarojs/taro'],
  },
});
```

### 性能测试脚本
新增的性能测试工具：

```bash
# 运行性能测试
npm run performance:test

# 生成性能报告
npm run performance:report

# Bundle 分析
npm run analyze:bundle

# 内存分析
npm run analyze:memory
```

## 📚 相关文档

- [API 文档](./api.md)
- [组件文档](./components.md)
- [Hooks 文档](./hooks.md)
- [迁移指南](./migration.md)

## 🤝 贡献指南

欢迎贡献性能优化相关的改进和建议！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License