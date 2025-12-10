# Container 容器组件

Container 组件是一个用于页面布局的容器组件，提供了多种尺寸、对齐方式和滚动特性，适用于各种页面布局场景。

## 基本用法

### 基础容器

```tsx
import { View } from '@tarojs/components';
import { Container } from '@taro-uno/components';

function BasicContainer() {
  return (
    <Container>
      <View>基础容器内容</View>
    </Container>
  );
}
```

### 不同尺寸容器

```tsx
import { View } from '@tarojs/components';
import { Container } from '@taro-uno/components';

function ContainerSizes() {
  return (
    <View>
      <Container size="small">
        <View>小尺寸容器</View>
      </Container>
      <Container size="default" style={{ margin: '10px 0' }}>
        <View>默认尺寸容器</View>
      </Container>
      <Container size="large">
        <View>大尺寸容器</View>
      </Container>
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
| size | `ContainerSize` | `default` | 否 | 容器尺寸 |
| maxWidth | `number \| string` | - | 否 | 最大宽度 |
| padding | `Size \| number \| string` | `medium` | 否 | 内边距 |
| margin | `Size \| number \| string` | `medium` | 否 | 外边距 |
| align | `ContainerAlign` | `stretch` | 否 | 对齐方式 |
| center | `boolean` | `false` | 否 | 是否居中 |
| scrollable | `boolean` | `false` | 否 | 是否可滚动 |
| scrollDirection | `'horizontal' \| 'vertical' \| 'both'` | `vertical` | 否 | 滚动方向 |
| onClick | `(_event: React.MouseEvent) => void` | - | 否 | 点击事件 |
| onScroll | `(_event: React.UIEvent) => void` | - | 否 | 滚动事件 |
| responsive | `{ xs?: Partial<ContainerProps>, sm?: Partial<ContainerProps>, md?: Partial<ContainerProps>, lg?: Partial<ContainerProps>, xl?: Partial<ContainerProps>, xxl?: Partial<ContainerProps> }` | - | 否 | 响应式断点配置 |

## 类型定义

```typescript
// 容器尺寸
export type ContainerSize = Size | 'full' | 'fluid';

// 容器对齐方式
export type ContainerAlign = 'start' | 'center' | 'end' | 'stretch';

// 容器组件属性
export interface ContainerProps extends BaseComponentProps {
  children?: ReactNode;
  size?: ContainerSize;
  maxWidth?: number | string;
  padding?: Size | number | `${number}${CSSUnit}`;
  margin?: Size | number | `${number}${CSSUnit}`;
  align?: ContainerAlign;
  center?: boolean;
  scrollable?: boolean;
  scrollDirection?: 'horizontal' | 'vertical' | 'both';
  onClick?: (_event: React.MouseEvent) => void;
  onScroll?: (_event: React.UIEvent) => void;
  responsive?: {
    xs?: Partial<ContainerProps>;
    sm?: Partial<ContainerProps>;
    md?: Partial<ContainerProps>;
    lg?: Partial<ContainerProps>;
    xl?: Partial<ContainerProps>;
    xxl?: Partial<ContainerProps>;
  };
}

// 容器组件引用
export interface ContainerRef {
  element: any;
  getSize: () => ContainerSize;
  getAlign: () => ContainerAlign;
  getMaxWidth: () => number | string;
  setSize: (_size: ContainerSize) => void;
  setAlign: (_align: ContainerAlign) => void;
  setMaxWidth: (_maxWidth: number | string) => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Container } from '@taro-uno/components';
import { useState } from 'react';

function ContainerExample() {
  const [size, setSize] = useState('default');
  const [scrollable, setScrollable] = useState(false);

  return (
    <View style={{ padding: '20px' }}>
      <Container center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Container 容器组件示例</Text>
      </Container>
      
      <Container style={{ marginTop: '20px' }}>
        <View style={{ marginBottom: '15px' }}>
          <Text>尺寸控制：</Text>
          <Button type="primary" onClick={() => setSize('small')} size="mini" style={{ marginLeft: '10px' }}>小尺寸</Button>
          <Button type="primary" onClick={() => setSize('default')} size="mini" style={{ marginLeft: '10px' }}>默认尺寸</Button>
          <Button type="primary" onClick={() => setSize('large')} size="mini" style={{ marginLeft: '10px' }}>大尺寸</Button>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>滚动控制：</Text>
          <Button type="primary" onClick={() => setScrollable(!scrollable)} size="mini" style={{ marginLeft: '10px' }}>
            {scrollable ? '禁用滚动' : '启用滚动'}
          </Button>
        </View>
        
        <Container 
          size={size} 
          scrollable={scrollable} 
          padding="large"
          style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}
        >
          <View style={{ padding: '20px' }}>
            <Text>当前尺寸：{size}</Text>
          </View>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Text>当前滚动状态：{scrollable ? '可滚动' : '不可滚动'}</Text>
          </View>
          {scrollable && (
            <View style={{ height: '200px', padding: '20px' }}>
              <Text style={{ lineHeight: '1.8' }}>
                这是一段可滚动的内容。{`\n`}
                当容器启用滚动时，内容超出容器高度或宽度会显示滚动条。{`\n`}
                Container组件支持水平和垂直滚动，以及两者同时滚动。{`\n`}
                你可以通过scrollDirection属性来控制滚动方向。{`\n`}
                你可以通过scrollable属性来控制是否允许滚动。{`\n`}
                这是一段可滚动的内容。{`\n`}
                当容器启用滚动时，内容超出容器高度或宽度会显示滚动条。{`\n`}
                Container组件支持水平和垂直滚动，以及两者同时滚动。{`\n`}
                你可以通过scrollDirection属性来控制滚动方向。{`\n`}
                你可以通过scrollable属性来控制是否允许滚动。{`\n`}
                这是一段可滚动的内容。{`\n`}
                当容器启用滚动时，内容超出容器高度或宽度会显示滚动条。{`\n`}
                Container组件支持水平和垂直滚动，以及两者同时滚动。{`\n`}
                你可以通过scrollDirection属性来控制滚动方向。{`\n`}
                你可以通过scrollable属性来控制是否允许滚动。
              </Text>
            </View>
          )}
        </Container>
      </Container>
    </View>
  );
}

export default ContainerExample;
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

1. **尺寸控制**：通过size属性可以控制容器的预设尺寸，也可以通过maxWidth属性自定义最大宽度。
2. **滚动配置**：当scrollable为true时，容器会自动添加滚动条，支持水平、垂直和双向滚动。
3. **响应式设计**：可以通过responsive属性配置不同断点下的容器属性，实现响应式布局。
4. **对齐方式**：align属性控制子元素的对齐方式，center属性控制容器本身是否居中。
5. **内边距和外边距**：支持多种单位和尺寸预设，方便快速调整间距。

## 相关组件

- [Layout](#/components/layout/layout) - 布局容器，用于页面整体结构
- [Space](#/components/layout/space) - 间距组件，用于元素间距控制
- [Grid](#/components/layout/grid) - 网格布局组件