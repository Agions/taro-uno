# 性能优化指南

Taro-Uno UI 提供了多种性能优化方案，帮助您构建高性能的多端应用。

## 🚀 性能优化策略

### 1. 按需加载

#### ✅ 推荐做法
```tsx
// 按需导入组件
import Button from '@taro-uno/ui/dist/button';
import { Input } from '@taro-uno/ui/dist/input';

// 或者使用动态导入
const HeavyComponent = lazy(() => import('@taro-uno/ui/dist/heavy-component'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

#### ❌ 避免做法
```tsx
// 避免导入整个库
import * as TaroUno from '@taro-uno/ui';
```

### 2. Tree Shaking 配置

确保您的构建配置支持 Tree Shaking：

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'taro-uno': ['@taro-uno/ui']
        }
      }
    }
  }
}
```

### 3. 虚拟滚动

对于大量数据的列表渲染：

```tsx
import { VirtualList } from '@taro-uno/ui';

const LargeDataList = ({ data }) => {
  return (
    <VirtualList
      data={data}
      renderItem={({ item }) => (
        <ListItem key={item.id} item={item} />
      )}
      height={500}
      itemHeight={60}
      overscanCount={5}
    />
  );
};
```

## 📊 性能监控

### 1. 使用性能监控 Hook
```tsx
import { usePerformance } from '@taro-uno/ui';

const PerformanceMonitor = () => {
  const metrics = usePerformance();

  useEffect(() => {
    if (metrics.fps < 30) {
      console.warn('FPS 较低:', metrics.fps);
    }

    if (metrics.memory > 0.8) {
      console.warn('内存使用较高:', metrics.memory);
    }
  }, [metrics]);

  return null;
};
```

### 2. 自定义性能指标
```tsx
import { usePerformance } from '@taro-uno/ui';

const CustomMetrics = () => {
  const { addMetric, getMetrics } = usePerformance();

  const handleCustomEvent = () => {
    const startTime = performance.now();

    // 执行一些操作
    doSomeWork();

    const endTime = performance.now();
    addMetric('custom-operation', endTime - startTime);
  };

  return (
    <Button onClick={handleCustomEvent}>
      测试性能
    </Button>
  );
};
```

## 🔧 组件优化

### 1. React 优化

#### 使用 React.memo
```tsx
import React, { memo } from 'react';
import { Button } from '@taro-uno/ui';

const OptimizedButton = memo(({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  );
});
```

#### 使用 useCallback 和 useMemo
```tsx
import { useCallback, useMemo } from 'react';
import { Button } from '@taro-uno/ui';

const OptimizedComponent = ({ items }) => {
  const handleClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []);

  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }));
  }, [items]);

  return (
    <div>
      {processedItems.map(item => (
        <Button
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
```

### 2. 懒加载组件
```tsx
import { lazy, Suspense } from 'react';

// 路由级懒加载
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));

// 组件级懒加载
const HeavyChart = lazy(() => import('@taro-uno/ui/dist/chart'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

## 📱 平台特定优化

### 1. 小程序优化

#### 减少包体积
```tsx
// 条件导入平台特定组件
const PlatformComponent = () => {
  const { isWeapp, isH5 } = usePlatform();

  if (isWeapp) {
    return <WeappOptimizedComponent />;
  }

  if (isH5) {
    return <H5OptimizedComponent />;
  }

  return <DefaultComponent />;
};
```

#### 优化图片加载
```tsx
import { Image } from '@tarojs/components';

const OptimizedImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      mode="aspectFill"
      lazyLoad
      showMenuByLongpress
      aria-label={alt}
    />
  );
};
```

### 2. H5 优化

#### 使用 Web Workers
```tsx
// worker.js
self.onmessage = function(e) {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};

// 组件中使用
const WorkerComponent = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const worker = new Worker('./worker.js');

    worker.onmessage = (e) => {
      setResult(e.data);
      worker.terminate();
    };

    worker.postMessage(data);

    return () => worker.terminate();
  }, []);

  return <div>{result}</div>;
};
```

#### 优化 DOM 操作
```tsx
import { useRef, useEffect } from 'react';

const OptimizedList = ({ items }) => {
  const listRef = useRef(null);

  useEffect(() => {
    // 批量 DOM 更新
    const listElement = listRef.current;
    if (listElement) {
      requestAnimationFrame(() => {
        // 执行 DOM 操作
      });
    }
  }, [items]);

  return (
    <div ref={listRef}>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
```

## 🎨 样式优化

### 1. CSS 优化
```css
/* 使用 CSS 变量 */
:root {
  --primary-color: #1890ff;
  --secondary-color: #52c41a;
  --border-radius: 4px;
}

/* 避免深层嵌套 */
.button {
  background: var(--primary-color);
  border-radius: var(--border-radius);
}

.button--large {
  padding: 12px 24px;
  font-size: 16px;
}
```

### 2. 动画优化
```tsx
import { useSpring, animated } from '@react-spring/web';

const OptimizedAnimation = () => {
  const [props, api] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 }
  }));

  return (
    <animated.div style={props}>
      优化动画
    </animated.div>
  );
};
```

## 🧪 性能测试

### 1. 自动化性能测试
```javascript
// performance.test.js
import { test, expect } from '@playwright/test';

test.describe('性能测试', () => {
  test('页面加载时间', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000); // 3秒内加载完成
  });

  test('FPS 测试', async ({ page }) => {
    await page.goto('/');

    const fps = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frames = 0;
        let lastTime = performance.now();

        function measure() {
          frames++;
          const currentTime = performance.now();

          if (currentTime - lastTime >= 1000) {
            resolve(frames);
            return;
          }

          requestAnimationFrame(measure);
        }

        requestAnimationFrame(measure);
      });
    });

    expect(fps).toBeGreaterThan(30); // FPS 大于 30
  });
});
```

### 2. 性能监控集成
```tsx
// 性能监控组件
const PerformanceTracker = () => {
  useEffect(() => {
    // 监控页面加载性能
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        console.log('页面加载时间:', loadTime);

        // 发送到监控服务
        trackPerformance('page_load', loadTime);
      });
    }

    // 监控资源加载
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          console.log('资源加载:', entry.name, entry.duration);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
};
```

## 📈 性能分析工具

### 1. 构建分析
```bash
# 分析构建包大小
pnpm build:analyze

# 查看构建性能
pnpm build:stats
```

### 2. 运行时分析
```tsx
import { PerformanceAnalyzer } from '@taro-uno/ui';

const App = () => {
  return (
    <>
      <PerformanceAnalyzer />
      <YourApp />
    </>
  );
};
```

### 3. 自定义分析工具
```tsx
const CustomAnalyzer = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const analyze = () => {
      const newMetrics = {
        memory: performance.memory ? performance.memory.usedJSHeapSize : 0,
        timing: performance.timing,
        navigation: performance.navigation
      };

      setMetrics(newMetrics);
    };

    const interval = setInterval(analyze, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="performance-panel">
      <h3>性能指标</h3>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
};
```

## 🔍 性能问题排查

### 1. 常见问题

#### 内存泄漏
```tsx
// ❌ 错误：未清理的事件监听器
const MemoryLeakComponent = () => {
  useEffect(() => {
    const handler = () => console.log('scroll');
    window.addEventListener('scroll', handler);
    // 缺少清理函数
  }, []);

  return <div>内容</div>;
};

// ✅ 正确：清理事件监听器
const FixedComponent = () => {
  useEffect(() => {
    const handler = () => console.log('scroll');
    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return <div>内容</div>;
};
```

#### 不必要的重渲染
```tsx
// ❌ 错误：在 render 中创建新函数
const BadComponent = () => {
  return (
    <Button onClick={() => console.log('click')}>
      点击
    </Button>
  );
};

// ✅ 正确：使用 useCallback
const GoodComponent = () => {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return (
    <Button onClick={handleClick}>
      点击
    </Button>
  );
};
```

### 2. 性能检查清单

- [ ] 使用 React.memo 优化纯展示组件
- [ ] 使用 useCallback 和 useMemo 优化函数和计算
- [ ] 实现虚拟滚动处理大数据列表
- [ ] 使用懒加载减少初始包大小
- [ ] 优化图片和静态资源
- [ ] 监控内存使用和性能指标
- [ ] 定期进行性能测试和分析

## 📚 相关资源

- [React 性能优化](https://react.dev/learn/render-and-commit)
- [Taro 性能优化指南](https://taro.jd.com/docs/optimized)
- [Web 性能优化](https://developers.google.com/web/fundamentals/performance)
- [Chrome DevTools 性能分析](https://developer.chrome.com/docs/devtools/performance/)

---

通过实施这些性能优化策略，您可以确保 Taro-Uno UI 应用在各种设备和平台上都能提供出色的用户体验。

*最后更新：${new Date().toLocaleDateString('zh-CN')}*