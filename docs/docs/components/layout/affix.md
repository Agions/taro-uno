# Affix 固定定位

Affix 组件用于将元素固定在页面某个位置，常用于导航栏、侧边栏等场景。

## 基本用法

### 顶部固定

```tsx
import { View, Text } from '@tarojs/components';
import { Affix } from '@taro-uno/components';

function TopAffix() {
  return (
    <View>
      <Affix offsetTop={10}>
        <View style={{ padding: '10px', backgroundColor: '#165DFF', color: 'white' }}>
          固定在顶部，距离顶部 10px
        </View>
      </Affix>
      <View style={{ height: '2000px', padding: '20px' }}>
        <Text>滚动页面查看效果</Text>
      </View>
    </View>
  );
}
```

### 底部固定

```tsx
import { View, Text } from '@tarojs/components';
import { Affix } from '@taro-uno/components';

function BottomAffix() {
  return (
    <View>
      <View style={{ height: '2000px', padding: '20px' }}>
        <Text>滚动页面查看效果</Text>
      </View>
      <Affix offsetBottom={10}>
        <View style={{ padding: '10px', backgroundColor: '#165DFF', color: 'white' }}>
          固定在底部，距离底部 10px
        </View>
      </Affix>
    </View>
  );
}
```

## 受控模式

```tsx
import { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Affix } from '@taro-uno/components';

function ControlledAffix() {
  const [offsetTop, setOffsetTop] = useState(20);
  const [affixed, setAffixed] = useState(false);

  const handleChange = (newAffixed) => {
    setAffixed(newAffixed);
    console.log('Affix 状态变化:', newAffixed);
  };

  return (
    <View>
      <View style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f0f0f0' }}>
        <Text>当前固定状态: {affixed ? '已固定' : '未固定'}</Text>
        <View style={{ marginTop: '10px' }}>
          <Button type="primary" onClick={() => setOffsetTop(offsetTop + 10)}>
            增加顶部距离
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => setOffsetTop(Math.max(0, offsetTop - 10))}>
            减少顶部距离
          </Button>
        </View>
      </View>
      <Affix offsetTop={offsetTop} onChange={handleChange}>
        <View style={{ padding: '10px', backgroundColor: '#165DFF', color: 'white' }}>
          受控固定组件，距离顶部 {offsetTop}px
        </View>
      </Affix>
      <View style={{ height: '2000px', padding: '20px' }}>
        <Text>滚动页面查看效果</Text>
      </View>
    </View>
  );
}
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 固定的内容 |
| offset | `AffixOffset` | - | 否 | 偏移量配置，包含 top/bottom/left/right |
| offsetTop | `number` | 0 | 否 | 顶部偏移量 |
| offsetBottom | `number` | 0 | 否 | 底部偏移量 |
| target | `AffixTarget` | - | 否 | 滚动容器，默认是 window |
| onChange | `(_affixed: boolean) => void` | - | 否 | 固定状态变化时触发 |

## 类型定义

```typescript
// 偏移量配置
export interface AffixOffset {
  top?: number;      // 顶部偏移量
  bottom?: number;   // 底部偏移量
  left?: number;     // 左侧偏移量
  right?: number;    // 右侧偏移量
}

// 滚动容器获取函数
export interface AffixTarget {
  (): HTMLElement | Window | null;
}

// 组件属性
export interface AffixProps extends ViewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  offset?: AffixOffset;
  offsetTop?: number;
  offsetBottom?: number;
  target?: AffixTarget;
  onChange?: (_affixed: boolean) => void;
}

// 组件引用
export interface AffixRef {
  getAffix: () => HTMLDivElement | null;
  updatePosition: () => void;
}
```

## 完整示例

```tsx
import { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Affix } from '@taro-uno/components';

function AffixExample() {
  const [offset, setOffset] = useState(20);
  const [affixed, setAffixed] = useState(false);

  const handleChange = (newAffixed) => {
    setAffixed(newAffixed);
  };

  return (
    <View>
      <View style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Affix 固定定位组件示例</Text>
        <Text style={{ display: 'block', marginTop: '10px', color: '#666' }}>
          当前固定状态: {affixed ? '已固定' : '未固定'}
        </Text>
        <View style={{ marginTop: '15px' }}>
          <Button type="primary" onClick={() => setOffset(offset + 10)}>
            增加顶部偏移: {offset}px
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => setOffset(Math.max(0, offset - 10))}>
            减少顶部偏移: {offset}px
          </Button>
        </View>
      </View>
      
      <Affix offset={{ top: offset }} onChange={handleChange}>
        <View style={{ 
          padding: '15px', 
          backgroundColor: '#165DFF', 
          color: 'white', 
          textAlign: 'center',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}>
          <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>这是一个固定在顶部的元素</Text>
          <Text style={{ display: 'block', marginTop: '5px', fontSize: '14px', opacity: 0.9 }}>
            距离顶部 {offset}px，滚动页面查看效果
          </Text>
        </View>
      </Affix>
      
      <View style={{ 
        height: '2000px', 
        padding: '20px', 
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <Text style={{ fontSize: '16px', lineHeight: '1.8' }}>
          向下滚动页面，可以看到上方的元素会固定在指定位置。
          向上滚动页面，当元素回到原始位置时，会自动取消固定。
          
          Affix 组件可以用于导航栏、侧边栏、广告位等场景，
          提升用户体验，让重要内容始终保持在视野范围内。
          
          你可以通过调整顶部偏移量来改变固定元素的位置，
          也可以监听固定状态变化事件，进行相应的业务处理。
        </Text>
      </View>
    </View>
  );
}

export default AffixExample;
```

## 平台支持

| 平台 | 支持情况 |
| --- | --- |
| 微信小程序 | ✅ 支持 |
| 支付宝小程序 | ✅ 支持 |
| 百度小程序 | ✅ 支持 |
| 字节跳动小程序 | ✅ 支持 |
| QQ 小程序 | ✅ 支持 |
| 快应用 | ✅ 支持 |
| H5 | ✅ 支持 |
| React Native | ✅ 支持 |

## 注意事项

1. **性能优化**：Affix 组件使用了滚动事件监听，建议在不需要时及时卸载组件，避免内存泄漏。
2. **嵌套使用**：不建议在 Affix 内部嵌套其他 Affix 组件，可能会导致定位异常。
3. **目标容器**：如果滚动容器不是 window，需要通过 target 属性指定，否则可能无法正常工作。
4. **样式冲突**：固定元素会脱离文档流，可能会影响其他元素的布局，使用时需要注意。
5. **移动端适配**：在移动端使用时，建议合理设置偏移量，避免与系统导航栏或状态栏冲突。

## 相关组件

- [Layout](./layout.md) - 布局容器，用于页面整体结构
- [NavBar](../navigation/navbar.md) - 导航栏，常用于页面顶部
- [Menu](../navigation/menu.md) - 菜单，常用于页面侧边栏