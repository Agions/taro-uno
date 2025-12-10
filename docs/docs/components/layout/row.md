# Row 行布局

Row 组件是一个用于创建行布局的组件，通常与 Col 组件配合使用，用于构建响应式网格布局。

## 基本用法

### 基础行布局

```tsx
import { View } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';

function BasicRow() {
  return (
    <Row>
      <Col span={8}>
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Col 1</View>
      </Col>
      <Col span={8}>
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Col 2</View>
      </Col>
      <Col span={8}>
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Col 3</View>
      </Col>
    </Row>
  );
}
```

### 对齐方式

```tsx
import { View } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';

function RowAlignExample() {
  return (
    <View>
      <Row justify="start" style={{ marginBottom: '20px' }}>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>1</View>
        </Col>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>2</View>
        </Col>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>3</View>
        </Col>
      </Row>
      
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>1</View>
        </Col>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>2</View>
        </Col>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>3</View>
        </Col>
      </Row>
      
      <Row justify="end">
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>1</View>
        </Col>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>2</View>
        </Col>
        <Col span={4}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>3</View>
        </Col>
      </Row>
    </View>
  );
}
```

### 间距设置

```tsx
import { View } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';

function RowGutterExample() {
  return (
    <View>
      <Row gutter={10} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>间距 10</View>
        </Col>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>间距 10</View>
        </Col>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>间距 10</View>
        </Col>
      </Row>
      
      <Row gutter={20}>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>间距 20</View>
        </Col>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>间距 20</View>
        </Col>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>间距 20</View>
        </Col>
      </Row>
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
| gutter | `RowGutter` | `0` | 否 | 间距 |
| align | `RowAlign` | `top` | 否 | 垂直对齐方式 |
| justify | `RowJustify` | `start` | 否 | 水平对齐方式 |
| wrap | `boolean` | `true` | 否 | 是否换行 |
| onClick | `(_event: React.MouseEvent) => void` | - | 否 | 点击事件 |
| responsive | `{ xs?: Partial<RowProps>, sm?: Partial<RowProps>, md?: Partial<RowProps>, lg?: Partial<RowProps>, xl?: Partial<RowProps>, xxl?: Partial<RowProps> }` | - | 否 | 响应式断点配置 |

## 类型定义

```typescript
// Row组件对齐方式
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';

// Row组件对齐方式
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

// Row组件间距
export type RowGutter = 
  | Size 
  | number 
  | `${number}${CSSUnit}` 
  | [Size | number | `${number}${CSSUnit}`, Size | number | `${number}${CSSUnit}`];

// Row组件属性
export interface RowProps extends BaseComponentProps {
  children?: ReactNode;
  gutter?: RowGutter;
  align?: RowAlign;
  justify?: RowJustify;
  wrap?: boolean;
  onClick?: (_event: React.MouseEvent) => void;
  responsive?: {
    xs?: Partial<RowProps>;
    sm?: Partial<RowProps>;
    md?: Partial<RowProps>;
    lg?: Partial<RowProps>;
    xl?: Partial<RowProps>;
    xxl?: Partial<RowProps>;
  };
}

// Row组件引用
export interface RowRef {
  element: any | null;
  getAlign: () => RowAlign;
  getJustify: () => RowJustify;
  getGutter: () => RowGutter;
  setAlign: (_align: RowAlign) => void;
  setJustify: (_justify: RowJustify) => void;
  setGutter: (_gutter: RowGutter) => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';
import { useState } from 'react';

function RowExample() {
  const [gutter, setGutter] = useState(16);
  const [justify, setJustify] = useState('start');
  const [align, setAlign] = useState('top');
  const [wrap, setWrap] = useState(true);

  return (
    <View style={{ padding: '20px' }}>
      <Row center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Row 行布局组件示例</Text>
      </Row>
      
      <Row style={{ marginTop: '20px' }}>
        <View style={{ marginBottom: '15px' }}>
          <Text>水平对齐方式：</Text>
          <Button type="primary" onClick={() => setJustify('start')} size="mini" style={{ marginLeft: '10px' }}>左对齐</Button>
          <Button type="primary" onClick={() => setJustify('center')} size="mini" style={{ marginLeft: '10px' }}>居中</Button>
          <Button type="primary" onClick={() => setJustify('end')} size="mini" style={{ marginLeft: '10px' }}>右对齐</Button>
          <Button type="primary" onClick={() => setJustify('space-between')} size="mini" style={{ marginLeft: '10px' }}>两端对齐</Button>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>垂直对齐方式：</Text>
          <Button type="primary" onClick={() => setAlign('top')} size="mini" style={{ marginLeft: '10px' }}>顶部对齐</Button>
          <Button type="primary" onClick={() => setAlign('middle')} size="mini" style={{ marginLeft: '10px' }}>居中对齐</Button>
          <Button type="primary" onClick={() => setAlign('bottom')} size="mini" style={{ marginLeft: '10px' }}>底部对齐</Button>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>间距设置：</Text>
          <Button type="primary" onClick={() => setGutter(gutter + 4)} size="mini" style={{ marginLeft: '10px' }}>增加间距</Button>
          <Button onClick={() => setGutter(Math.max(0, gutter - 4))} size="mini" style={{ marginLeft: '10px' }}>减少间距</Button>
          <Text style={{ marginLeft: '10px' }}>当前间距：{gutter}px</Text>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>换行设置：</Text>
          <Button type="primary" onClick={() => setWrap(!wrap)} size="mini" style={{ marginLeft: '10px' }}>
            {wrap ? '禁止换行' : '允许换行'}
          </Button>
        </View>
        
        <Row 
          gutter={gutter} 
          justify={justify} 
          align={align}
          wrap={wrap}
          style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '10px', height: '200px' }}
        >
          <Col span={8}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', height: '80px' }}>
              Col 1
            </View>
          </Col>
          <Col span={8}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', height: '120px' }}>
              Col 2
            </View>
          </Col>
          <Col span={8}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', height: '160px' }}>
              Col 3
            </View>
          </Col>
          <Col span={8}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
              Col 4
            </View>
          </Col>
        </Row>
        
        <View style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            当前配置：{`\n`}
            - 水平对齐：{justify}{`\n`}
            - 垂直对齐：{align}{`\n`}
            - 间距：{gutter}px{`\n`}
            - 换行：{wrap ? '允许' : '禁止'}
          </Text>
        </View>
      </Row>
    </View>
  );
}

export default RowExample;
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

1. **与Col组件配合使用**：Row组件通常与Col组件配合使用，用于构建网格布局。
2. **间距设置**：通过gutter属性可以设置Col组件之间的间距，支持统一设置和分别设置水平、垂直间距。
3. **对齐方式**：支持多种对齐方式，包括水平对齐和垂直对齐。
4. **换行设置**：通过wrap属性可以控制是否允许换行，默认为true。
5. **响应式设计**：可以通过responsive属性配置不同断点下的行属性，实现响应式布局。

## 相关组件

- [Col](#/components/layout/col) - 列布局组件，与Row组件配合使用
- [Grid](#/components/layout/grid) - 网格布局组件，用于创建响应式网格
- [Container](#/components/layout/container) - 容器组件，用于页面整体结构