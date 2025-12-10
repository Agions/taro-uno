# Col 列布局

Col 组件是一个用于创建列布局的组件，通常与 Row 组件配合使用，用于构建响应式网格布局。

## 基本用法

### 不同跨度的列

```tsx
import { View } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';

function ColSpanExample() {
  return (
    <View>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>24列</View>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>12列</View>
        </Col>
        <Col span={12}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>12列</View>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>8列</View>
        </Col>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>8列</View>
        </Col>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>8列</View>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6列</View>
        </Col>
        <Col span={6}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6列</View>
        </Col>
        <Col span={6}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6列</View>
        </Col>
        <Col span={6}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6列</View>
        </Col>
      </Row>
    </View>
  );
}
```

### 偏移量

```tsx
import { View } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';

function ColOffsetExample() {
  return (
    <View>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>8列</View>
        </Col>
        <Col span={8} offset={8}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>8列，偏移8列</View>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={6} offset={6}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6列，偏移6列</View>
        </Col>
        <Col span={6} offset={6}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6列，偏移6列</View>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={12}>
          <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>12列，偏移12列</View>
        </Col>
      </Row>
    </View>
  );
}
```

### 排序

```tsx
import { View } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';

function ColOrderExample() {
  return (
    <Row>
      <Col span={8} order={3}>
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>顺序3</View>
      </Col>
      <Col span={8} order={1}>
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>顺序1</View>
      </Col>
      <Col span={8} order={2}>
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>顺序2</View>
      </Col>
    </Row>
  );
}
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |
| span | `ColSpan` | `24` | 否 | 跨度 (1-24) |
| offset | `ColOffset` | `0` | 否 | 偏移量 |
| order | `ColOrder` | `0` | 否 | 排序 |
| gutter | `RowGutter` | `0` | 否 | 从父组件Row继承的间距 |
| flex | `number \| string \| 'auto' \| 'none'` | - | 否 | 柔性布局 |
| onClick | `(_event: React.MouseEvent) => void` | - | 否 | 点击事件 |
| responsive | `{ xs?: Partial<ColProps>, sm?: Partial<ColProps>, md?: Partial<ColProps>, lg?: Partial<ColProps>, xl?: Partial<ColProps>, xxl?: Partial<ColProps> }` | - | 否 | 响应式断点配置 |

## 类型定义

```typescript
// Col组件跨度
export type ColSpan = number | `${number}`;

// Col组件偏移量
export type ColOffset = number | `${number}`;

// Col组件排序
export type ColOrder = number | `${number}`;

// Col组件属性
export interface ColProps extends BaseComponentProps {
  children?: ReactNode;
  span?: ColSpan;
  offset?: ColOffset;
  order?: ColOrder;
  gutter?: RowGutter;
  flex?: number | string | 'auto' | 'none';
  onClick?: (_event: React.MouseEvent) => void;
  responsive?: {
    xs?: Partial<ColProps>;
    sm?: Partial<ColProps>;
    md?: Partial<ColProps>;
    lg?: Partial<ColProps>;
    xl?: Partial<ColProps>;
    xxl?: Partial<ColProps>;
  };
}

// Col组件引用
export interface ColRef {
  element: any;
  getSpan: () => ColSpan;
  getOffset: () => ColOffset;
  getOrder: () => ColOrder;
  setSpan: (_span: ColSpan) => void;
  setOffset: (_offset: ColOffset) => void;
  setOrder: (_order: ColOrder) => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Row, Col } from '@taro-uno/components';
import { useState } from 'react';

function ColExample() {
  const [span, setSpan] = useState(8);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState(0);

  return (
    <View style={{ padding: '20px' }}>
      <Row center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Col 列布局组件示例</Text>
      </Row>
      
      <Row style={{ marginTop: '20px' }}>
        <View style={{ marginBottom: '15px' }}>
          <Text>列跨度控制：</Text>
          <Button type="primary" onClick={() => setSpan(Math.min(24, span + 2))} size="mini" style={{ marginLeft: '10px' }}>
            增加跨度
          </Button>
          <Button onClick={() => setSpan(Math.max(1, span - 2))} size="mini" style={{ marginLeft: '10px' }}>
            减少跨度
          </Button>
          <Text style={{ marginLeft: '10px' }}>当前跨度：{span}</Text>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>偏移量控制：</Text>
          <Button type="primary" onClick={() => setOffset(Math.min(24 - span, offset + 2))} size="mini" style={{ marginLeft: '10px' }}>
            增加偏移
          </Button>
          <Button onClick={() => setOffset(Math.max(0, offset - 2))} size="mini" style={{ marginLeft: '10px' }}>
            减少偏移
          </Button>
          <Text style={{ marginLeft: '10px' }}>当前偏移：{offset}</Text>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>排序控制：</Text>
          <Button type="primary" onClick={() => setOrder(order + 1)} size="mini" style={{ marginLeft: '10px' }}>
            增加顺序
          </Button>
          <Button onClick={() => setOrder(order - 1)} size="mini" style={{ marginLeft: '10px' }}>
            减少顺序
          </Button>
          <Text style={{ marginLeft: '10px' }}>当前顺序：{order}</Text>
        </View>
        
        <Row gutter={16}>
          <Col span={span} offset={offset} order={order}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', textAlign: 'center' }}>
              <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Col 组件</Text>
              <Text style={{ display: 'block', marginTop: '10px', color: '#666' }}>
                跨度: {span}, 偏移: {offset}, 顺序: {order}
              </Text>
            </View>
          </Col>
          <Col span={8}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', textAlign: 'center' }}>
              <Text>固定8列</Text>
            </View>
          </Col>
          <Col span={8}>
            <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px', textAlign: 'center' }}>
              <Text>固定8列</Text>
            </View>
          </Col>
        </Row>
        
        <View style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            当前配置：{`\n`}
            - 列跨度：{span}{`\n`}
            - 偏移量：{offset}{`\n`}
            - 排序：{order}
          </Text>
        </View>
      </Row>
    </View>
  );
}

export default ColExample;
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

1. **与Row组件配合使用**：Col组件通常与Row组件配合使用，用于构建网格布局。
2. **跨度范围**：span属性的取值范围是1-24，默认值为24。
3. **偏移量计算**：偏移量offset的取值范围是0-(24-span)，确保列不会超出容器范围。
4. **响应式设计**：可以通过responsive属性配置不同断点下的列属性，实现响应式布局。
5. **间距继承**：Col组件会继承Row组件的gutter属性，用于设置列之间的间距。
6. **Flex布局**：通过flex属性可以设置列的flex属性，实现更灵活的布局。

## 相关组件

- [Row](#/components/layout/row) - 行布局组件，与Col组件配合使用
- [Grid](#/components/layout/grid) - 网格布局组件，用于创建响应式网格
- [Container](#/components/layout/container) - 容器组件，用于页面整体结构