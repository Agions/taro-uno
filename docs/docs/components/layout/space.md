# Space 间距组件

Space 组件是一个用于创建元素间距的组件，提供了灵活的间距设置和排列方式。

## 基本用法

### 水平间距

```tsx
import { View } from '@tarojs/components';
import { Space } from '@taro-uno/components';

function HorizontalSpace() {
  return (
    <Space>
      <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 1</View>
      <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 2</View>
      <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 3</View>
    </Space>
  );
}
```

### 垂直间距

```tsx
import { View } from '@tarojs/components';
import { Space } from '@taro-uno/components';

function VerticalSpace() {
  return (
    <Space direction="vertical">
      <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 1</View>
      <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 2</View>
      <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 3</View>
    </Space>
  );
}
```

### 不同大小的间距

```tsx
import { View } from '@tarojs/components';
import { Space } from '@taro-uno/components';

function SpaceSizes() {
  return (
    <View>
      <Space size="small" style={{ marginBottom: '20px' }}>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>小间距</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>小间距</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>小间距</View>
      </Space>
      <Space size="medium" style={{ marginBottom: '20px' }}>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>中间距</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>中间距</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>中间距</View>
      </Space>
      <Space size="large">
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>大间距</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>大间距</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>大间距</View>
      </Space>
    </View>
  );
}
```

### 带分隔符的间距

```tsx
import { View } from '@tarojs/components';
import { Space } from '@taro-uno/components';

function SpaceWithSeparator() {
  return (
    <View>
      <Space separator="|" style={{ marginBottom: '20px' }}>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 1</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 2</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 3</View>
      </Space>
      <Space separator>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 1</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 2</View>
        <View style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Item 3</View>
      </Space>
    </View>
  );
}
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |
| direction | `SpaceDirection` | `horizontal` | 否 | 间距方向 |
| align | `SpaceAlign` | `center` | 否 | 对齐方式 |
| wrap | `SpaceWrap` | `nowrap` | 否 | 换行方式 |
| size | `SpaceSize` | `default` | 否 | 间距大小 |
| gap | `SpaceGap` | - | 否 | 间距 |
| block | `boolean` | `false` | 否 | 是否自动换行 |
| separator | `SpaceSeparator` | - | 否 | 分隔符 |
| compact | `boolean` | `false` | 否 | 是否紧凑 |
| split | `boolean` | `false` | 否 | 是否等分 |
| maxCount | `number` | - | 否 | 最大行数（垂直方向）或列数（水平方向） |
| ellipsis | `ReactNode` | - | 否 | 超出最大行数/列数时显示的省略内容 |
| onClick | `(_event: React.MouseEvent) => void` | - | 否 | 点击事件 |
| onItemClick | `(_index: number, event: ITouchEvent) => void` | - | 否 | 子元素点击事件 |
| responsive | `{ xs?: Partial<SpaceProps>, sm?: Partial<SpaceProps>, md?: Partial<SpaceProps>, lg?: Partial<SpaceProps>, xl?: Partial<SpaceProps>, xxl?: Partial<SpaceProps> }` | - | 否 | 响应式断点配置 |

## 类型定义

```typescript
// Space组件方向
export type SpaceDirection = 'horizontal' | 'vertical';

// Space组件对齐方式
export type SpaceAlign = 'start' | 'center' | 'end' | 'stretch';

// Space组件换行方式
export type SpaceWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

// Space组件尺寸
export type SpaceSize = Size | number | `${number}${CSSUnit}`;

// Space组件间距
export type SpaceGap = SpaceSize | [SpaceSize, SpaceSize];

// Space组件分隔符
export type SpaceSeparator = ReactNode | boolean;

// Space组件属性
export interface SpaceProps extends BaseComponentProps {
  children?: ReactNode;
  direction?: SpaceDirection;
  align?: SpaceAlign;
  wrap?: SpaceWrap;
  size?: SpaceSize;
  gap?: SpaceGap;
  block?: boolean;
  separator?: SpaceSeparator;
  compact?: boolean;
  split?: boolean;
  maxCount?: number;
  ellipsis?: ReactNode;
  onClick?: (_event: React.MouseEvent) => void;
  onItemClick?: (_index: number, event: ITouchEvent) => void;
  responsive?: {
    xs?: Partial<SpaceProps>;
    sm?: Partial<SpaceProps>;
    md?: Partial<SpaceProps>;
    lg?: Partial<SpaceProps>;
    xl?: Partial<SpaceProps>;
    xxl?: Partial<SpaceProps>;
  };
}

// Space组件引用
export interface SpaceRef {
  element: any | null;
  getDirection: () => SpaceDirection;
  getAlign: () => SpaceAlign;
  getWrap: () => SpaceWrap;
  getGap: () => SpaceGap;
  getSize: () => SpaceSize;
  setDirection: (_direction: SpaceDirection) => void;
  setAlign: (_align: SpaceAlign) => void;
  setWrap: (_wrap: SpaceWrap) => void;
  setGap: (_gap: SpaceGap) => void;
  setSize: (_size: SpaceSize) => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Space } from '@taro-uno/components';
import { useState } from 'react';

function SpaceExample() {
  const [direction, setDirection] = useState('horizontal');
  const [size, setSize] = useState('medium');
  const [separator, setSeparator] = useState(false);
  const [wrap, setWrap] = useState('nowrap');

  return (
    <View style={{ padding: '20px' }}>
      <Space center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Space 间距组件示例</Text>
      </Space>
      
      <Space direction="vertical" size="large" style={{ marginTop: '20px' }}>
        <View>
          <Text>方向控制：</Text>
          <Button type="primary" onClick={() => setDirection('horizontal')} size="mini" style={{ marginLeft: '10px' }}>
            水平
          </Button>
          <Button type="primary" onClick={() => setDirection('vertical')} size="mini" style={{ marginLeft: '10px' }}>
            垂直
          </Button>
        </View>
        
        <View>
          <Text>尺寸控制：</Text>
          <Button type="primary" onClick={() => setSize('small')} size="mini" style={{ marginLeft: '10px' }}>小</Button>
          <Button type="primary" onClick={() => setSize('medium')} size="mini" style={{ marginLeft: '10px' }}>中</Button>
          <Button type="primary" onClick={() => setSize('large')} size="mini" style={{ marginLeft: '10px' }}>大</Button>
        </View>
        
        <View>
          <Text>分隔符控制：</Text>
          <Button type="primary" onClick={() => setSeparator(!separator)} size="mini" style={{ marginLeft: '10px' }}>
            {separator ? '隐藏分隔符' : '显示分隔符'}
          </Button>
        </View>
        
        <View>
          <Text>换行控制：</Text>
          <Button type="primary" onClick={() => setWrap('nowrap')} size="mini" style={{ marginLeft: '10px' }}>不换行</Button>
          <Button type="primary" onClick={() => setWrap('wrap')} size="mini" style={{ marginLeft: '10px' }}>换行</Button>
        </View>
        
        <Space 
          direction={direction} 
          size={size} 
          separator={separator} 
          wrap={wrap}
          style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}
        >
          <View style={{ padding: '15px 25px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Text style={{ fontSize: '16px' }}>Item 1</Text>
          </View>
          <View style={{ padding: '15px 25px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Text style={{ fontSize: '16px' }}>Item 2</Text>
          </View>
          <View style={{ padding: '15px 25px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Text style={{ fontSize: '16px' }}>Item 3</Text>
          </View>
          <View style={{ padding: '15px 25px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Text style={{ fontSize: '16px' }}>Item 4</Text>
          </View>
          <View style={{ padding: '15px 25px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Text style={{ fontSize: '16px' }}>Item 5</Text>
          </View>
        </Space>
        
        <View style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            当前配置：{`\n`}
            - 方向：{direction}{`\n`}
            - 尺寸：{size}{`\n`}
            - 分隔符：{separator ? '显示' : '隐藏'}{`\n`}
            - 换行：{wrap}
          </Text>
        </View>
      </Space>
    </View>
  );
}

export default SpaceExample;
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

1. **方向设置**：通过direction属性可以设置水平或垂直方向的间距。
2. **间距控制**：可以通过size属性设置预设的间距大小，也可以通过gap属性自定义间距。
3. **对齐方式**：align属性用于控制子元素的对齐方式，默认值为center。
4. **换行设置**：wrap属性用于控制子元素是否换行，默认值为nowrap。
5. **分隔符**：可以通过separator属性设置子元素之间的分隔符，支持字符串、React节点或布尔值。
6. **响应式设计**：可以通过responsive属性配置不同断点下的间距属性，实现响应式布局。
7. **最大数量**：maxCount属性用于限制显示的子元素数量，超出部分会被省略。
8. **省略内容**：ellipsis属性用于设置超出最大数量时显示的省略内容。

## 相关组件

- [Row](#/components/layout/row) - 行布局组件，用于创建行布局
- [Col](#/components/layout/col) - 列布局组件，用于创建列布局
- [Grid](#/components/layout/grid) - 网格布局组件，用于创建响应式网格