---
sidebar_position: 6
---

# UI Hooks

UI 相关的 Hooks 集合。

## useTheme

主题管理 Hook。

```tsx
import { useTheme } from 'taro-uno';

function Demo() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
      <button onClick={() => setTheme('dark')}>深色模式</button>
      <button onClick={() => setTheme('light')}>浅色模式</button>
    </div>
  );
}
```

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| theme | 当前主题 | `'light' \| 'dark'` |
| setTheme | 设置主题 | `(theme: 'light' \| 'dark') => void` |
| toggleTheme | 切换主题 | `() => void` |

## useStyle

动态样式管理 Hook。

```tsx
import { useStyle } from 'taro-uno';

function Demo() {
  const { style, setStyle, mergeStyle } = useStyle({
    color: 'red',
    fontSize: 14,
  });

  return (
    <div style={style}>
      <button onClick={() => mergeStyle({ color: 'blue' })}>
        改变颜色
      </button>
    </div>
  );
}
```

## usePlatform

平台检测 Hook。

```tsx
import { usePlatform } from 'taro-uno';

function Demo() {
  const { platform, isWeapp, isH5, isRN } = usePlatform();

  return (
    <div>
      <p>当前平台: {platform}</p>
      {isWeapp && <p>微信小程序环境</p>}
      {isH5 && <p>H5 环境</p>}
      {isRN && <p>React Native 环境</p>}
    </div>
  );
}
```

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| platform | 当前平台 | `'weapp' \| 'h5' \| 'rn' \| 'harmony'` |
| isWeapp | 是否微信小程序 | `boolean` |
| isH5 | 是否 H5 | `boolean` |
| isRN | 是否 React Native | `boolean` |
| isHarmony | 是否鸿蒙 | `boolean` |

## useResponsive

响应式布局 Hook。

```tsx
import { useResponsive } from 'taro-uno';

function Demo() {
  const { breakpoint, isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div>
      <p>当前断点: {breakpoint}</p>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
```

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| breakpoint | 当前断点 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` |
| isMobile | 是否移动端 | `boolean` |
| isTablet | 是否平板 | `boolean` |
| isDesktop | 是否桌面端 | `boolean` |

## useMediaQuery

媒体查询 Hook。

```tsx
import { useMediaQuery } from 'taro-uno';

function Demo() {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      {isLargeScreen ? '大屏幕' : '小屏幕'}
      {prefersDark && '用户偏好深色模式'}
    </div>
  );
}
```

## useVirtualScroll

虚拟滚动 Hook。

```tsx
import { useVirtualScroll } from 'taro-uno';

function Demo() {
  const data = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  
  const { virtualItems, totalHeight, containerRef } = useVirtualScroll({
    data,
    itemHeight: 50,
    overscan: 5,
  });

  return (
    <div ref={containerRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {virtualItems.map(({ item, index, style }) => (
          <div key={item.id} style={style}>
            项目 {index}
          </div>
        ))}
      </div>
    </div>
  );
}
```
