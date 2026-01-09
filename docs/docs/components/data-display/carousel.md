# Carousel 组件

Carousel 组件是一个轮播组件，用于展示一组图片或内容，支持自动播放、手势滑动、指示器、控制器等功能。

## 基本使用

### 基础轮播

```tsx
<Carousel>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>第 1 项</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>第 2 项</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>第 3 项</Text>
    </View>
  </Carousel.Item>
</Carousel>
```

### 自动播放

```tsx
<Carousel autoplay interval={3000}>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>自动播放 1</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>自动播放 2</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>自动播放 3</Text>
    </View>
  </Carousel.Item>
</Carousel>
```

### 带有指示器

```tsx
<Carousel indicators>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>带指示器 1</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>带指示器 2</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>带指示器 3</Text>
    </View>
  </Carousel.Item>
</Carousel>
```

### 垂直方向

```tsx
<Carousel vertical>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>垂直轮播 1</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>垂直轮播 2</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>垂直轮播 3</Text>
    </View>
  </Carousel.Item>
</Carousel>
```

### 带有控制器

```tsx
<Carousel controllers>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>带控制器 1</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>带控制器 2</Text>
    </View>
  </Carousel.Item>
  <Carousel.Item>
    <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>带控制器 3</Text>
    </View>
  </Carousel.Item>
</Carousel>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| activeIndex | `number` | `0` | 当前激活的轮播项索引 |
| autoplay | `boolean` | `false` | 是否自动播放 |
| interval | `number` | `3000` | 自动播放间隔时间（毫秒） |
| duration | `number` | `300` | 切换动画持续时间（毫秒） |
| indicators | `boolean` | `false` | 是否显示指示器 |
| controllers | `boolean` | `false` | 是否显示控制器 |
| vertical | `boolean` | `false` | 是否垂直方向 |
| loop | `boolean` | `true` | 是否循环播放 |
| swiperable | `boolean` | `true` | 是否可滑动 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onSlideChange | `(index: number) => void` | - | 轮播项切换时触发 |
| onSlideEnd | `(index: number) => void` | - | 轮播项切换结束时触发 |
| onSlideStart | `(index: number) => void` | - | 轮播项切换开始时触发 |
| onIndicatorClick | `(index: number) => void` | - | 指示器点击时触发 |

## 类型定义

```tsx
// Carousel 组件属性接口
export interface CarouselProps {
  children?: React.ReactNode;
  activeIndex?: number;
  autoplay?: boolean;
  interval?: number;
  duration?: number;
  indicators?: boolean;
  controllers?: boolean;
  vertical?: boolean;
  loop?: boolean;
  swiperable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSlideChange?: (index: number) => void;
  onSlideEnd?: (index: number) => void;
  onSlideStart?: (index: number) => void;
  onIndicatorClick?: (index: number) => void;
}

// Carousel.Item 组件属性接口
export interface CarouselItemProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onSlideChange | 轮播项切换时触发 | `index: number` - 当前激活的轮播项索引 |
| onSlideEnd | 轮播项切换结束时触发 | `index: number` - 当前激活的轮播项索引 |
| onSlideStart | 轮播项切换开始时触发 | `index: number` - 当前激活的轮播项索引 |
| onIndicatorClick | 指示器点击时触发 | `index: number` - 点击的指示器索引 |

## 示例代码

### 完整示例

```tsx
import { Carousel, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const CarouselExample = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleSlideChange = (index: number) => {
    console.log(`当前轮播项索引: ${index}`);
    setActiveIndex(index);
  };
  
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础轮播</Text>
      <Carousel
        autoplay
        interval={3000}
        indicators
        controllers
        onSlideChange={handleSlideChange}
        style={{ marginBottom: '20px' }}
      >
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>轮播项 1</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>轮播项 2</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>轮播项 3</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#c0c0c0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>轮播项 4</Text>
          </View>
        </Carousel.Item>
      </Carousel>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>当前激活索引: {activeIndex}</Text>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>垂直轮播</Text>
      <Carousel
        vertical
        autoplay
        interval={3000}
        indicators
        style={{ height: '300px', marginBottom: '20px' }}
      >
        <Carousel.Item>
          <View style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>垂直轮播 1</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '300px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>垂直轮播 2</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '300px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>垂直轮播 3</Text>
          </View>
        </Carousel.Item>
      </Carousel>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>手动轮播</Text>
      <Carousel
        autoplay={false}
        indicators
        controllers
        style={{ marginBottom: '20px' }}
      >
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>手动轮播 1</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>手动轮播 2</Text>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={{ width: '100%', height: '200px', backgroundColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>手动轮播 3</Text>
          </View>
        </Carousel.Item>
      </Carousel>
    </View>
  );
};

export default CarouselExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分样式可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分样式可能存在差异 |

## 注意事项

1. **自动播放**：设置 `autoplay` 为 `true` 时，轮播会自动播放，可通过 `interval` 属性调整播放间隔。
2. **指示器**：设置 `indicators` 为 `true` 时，会显示轮播指示器，点击指示器可切换轮播项。
3. **控制器**：设置 `controllers` 为 `true` 时，会显示轮播控制器，包括上一项和下一项按钮。
4. **垂直轮播**：设置 `vertical` 为 `true` 时，轮播会垂直方向播放。
5. **性能优化**：对于大量轮播项，建议使用 `loop` 为 `true`，以提高渲染性能。
6. **手势滑动**：默认支持手势滑动，可通过 `swiperable` 属性关闭。
7. **事件处理**：可通过 `onSlideChange`、`onSlideEnd`、`onSlideStart` 等事件处理轮播的各种状态变化。

## 相关组件

- [Image 组件](#/components/basic/image) - 用于轮播项的图片展示
- [Space 组件](#/components/layout/space) - 用于布局和间距控制
- [View 组件](#/components/basic/view) - 用于轮播项的容器