# Grid 网格布局

Grid 组件是一个用于创建响应式网格布局的组件，支持灵活的列数、对齐方式和间距设置，适用于各种页面布局场景。

## 基本用法

### 基础网格

```tsx
import { View } from '@tarojs/components';
import { Grid } from '@taro-uno/components';

function BasicGrid() {
  return (
    <Grid cols={3} gap="medium">
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>1</View>
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>2</View>
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>3</View>
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>4</View>
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>5</View>
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>6</View>
    </Grid>
  );
}
```

### 不同列数

```tsx
import { View, Text } from '@tarojs/components';
import { Grid } from '@taro-uno/components';

function GridColsExample() {
  return (
    <View>
      <Text style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>2列网格</Text>
      <Grid cols={2} gap="small" style={{ marginBottom: '20px' }}>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>1</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>2</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>3</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>4</View>
      </Grid>
      
      <Text style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>4列网格</Text>
      <Grid cols={4} gap="small">
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>1</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>2</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>3</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>4</View>
        <View style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>5</View>
      </Grid>
    </View>
  );
}
```

## 对齐方式

```tsx
import { View, Text } from '@tarojs/components';
import { Grid } from '@taro-uno/components';

function GridAlignExample() {
  return (
    <View>
      <Text style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>居中对齐</Text>
      <Grid cols={3} justify="center" gap="small" style={{ marginBottom: '20px', height: '100px' }}>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>1</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>2</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>3</View>
      </Grid>
      
      <Text style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>两端对齐</Text>
      <Grid cols={3} justify="between" gap="small" style={{ marginBottom: '20px', height: '100px' }}>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>1</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>2</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>3</View>
      </Grid>
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
| cols | `GridCols` | `1` | 否 | 列数 |
| rows | `number \| undefined` | - | 否 | 行数 |
| gap | `GridGap` | `default` | 否 | 间距 |
| rowGap | `Size \| number \| string \| undefined` | - | 否 | 垂直间距 |
| columnGap | `Size \| number \| string \| undefined` | - | 否 | 水平间距 |
| align | `GridAlign` | `stretch` | 否 | 对齐方式 |
| justify | `GridJustify` | `start` | 否 | 对齐方式 |
| onClick | `(_event: ITouchEvent) => void` | - | 否 | 点击事件 |
| onItemHover | `(_index: number, event: ITouchEvent) => void` | - | 否 | 子元素悬停事件 |
| onItemClick | `(_index: number, event: ITouchEvent) => void` | - | 否 | 子元素点击事件 |
| responsive | `{ xs?: Partial<GridProps>, sm?: Partial<GridProps>, md?: Partial<GridProps>, lg?: Partial<GridProps>, xl?: Partial<GridProps>, xxl?: Partial<GridProps> }` | - | 否 | 响应式断点配置 |

## 类型定义

```typescript
// Grid组件对齐方式
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

// Grid组件对齐方式
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// Grid组件间距
export type GridGap = 
  | Size 
  | number 
  | `${number}${CSSUnit}` 
  | [Size | number | `${number}${CSSUnit}`, Size | number | `${number}${CSSUnit}`];

// Grid组件列数
export type GridCols = string | number | `${number}`;

// Grid组件属性
export interface GridProps extends BaseComponentProps {
  children?: ReactNode;
  cols?: GridCols;
  rows?: number | undefined;
  gap?: GridGap;
  rowGap?: Size | number | `${number}${CSSUnit}` | undefined;
  columnGap?: Size | number | `${number}${CSSUnit}` | undefined;
  align?: GridAlign;
  justify?: GridJustify;
  onClick?: (_event: ITouchEvent) => void;
  onItemHover?: (_index: number, event: ITouchEvent) => void;
  onItemClick?: (_index: number, event: ITouchEvent) => void;
  responsive?: {
    xs?: Partial<GridProps>;
    sm?: Partial<GridProps>;
    md?: Partial<GridProps>;
    lg?: Partial<GridProps>;
    xl?: Partial<GridProps>;
    xxl?: Partial<GridProps>;
  };
}

// Grid组件引用
export interface GridRef {
  element: any;
  getCols: () => GridCols;
  getAlign: () => GridAlign;
  getJustify: () => GridJustify;
  getGap: () => GridGap;
  setCols: (_cols: GridCols) => void;
  setAlign: (_align: GridAlign) => void;
  setJustify: (_justify: GridJustify) => void;
  setGap: (_gap: GridGap) => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Grid } from '@taro-uno/components';
import { useState } from 'react';

function GridExample() {
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState('medium');
  const [justify, setJustify] = useState('start');

  const items = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <View style={{ padding: '20px' }}>
      <Grid center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Grid 网格布局组件示例</Text>
      </Grid>
      
      <Grid style={{ marginTop: '20px' }}>
        <View style={{ marginBottom: '15px' }}>
          <Text>列数控制：</Text>
          <Button type="primary" onClick={() => setCols(2)} size="mini" style={{ marginLeft: '10px' }}>2列</Button>
          <Button type="primary" onClick={() => setCols(3)} size="mini" style={{ marginLeft: '10px' }}>3列</Button>
          <Button type="primary" onClick={() => setCols(4)} size="mini" style={{ marginLeft: '10px' }}>4列</Button>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>间距控制：</Text>
          <Button type="primary" onClick={() => setGap('small')} size="mini" style={{ marginLeft: '10px' }}>小间距</Button>
          <Button type="primary" onClick={() => setGap('medium')} size="mini" style={{ marginLeft: '10px' }}>中间距</Button>
          <Button type="primary" onClick={() => setGap('large')} size="mini" style={{ marginLeft: '10px' }}>大间距</Button>
        </View>
        
        <View style={{ marginBottom: '15px' }}>
          <Text>对齐方式：</Text>
          <Button type="primary" onClick={() => setJustify('start')} size="mini" style={{ marginLeft: '10px' }}>左对齐</Button>
          <Button type="primary" onClick={() => setJustify('center')} size="mini" style={{ marginLeft: '10px' }}>居中</Button>
          <Button type="primary" onClick={() => setJustify('end')} size="mini" style={{ marginLeft: '10px' }}>右对齐</Button>
          <Button type="primary" onClick={() => setJustify('between')} size="mini" style={{ marginLeft: '10px' }}>两端对齐</Button>
        </View>
        
        <Grid 
          cols={cols} 
          gap={gap} 
          justify={justify} 
          style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '10px' }}
        >
          {items.map((item) => (
            <View 
              key={item} 
              style={{ 
                padding: '20px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '16px'
              }}
            >
              {item}
            </View>
          ))}
        </Grid>
        
        <View style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            当前配置：{`\n`}
            - 列数：{cols}{`\n`}
            - 间距：{gap}{`\n`}
            - 对齐方式：{justify}
          </Text>
        </View>
      </Grid>
    </View>
  );
}

export default GridExample;
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

1. **列数设置**：通过cols属性可以控制网格的列数，支持数字和字符串类型。
2. **间距配置**：支持统一设置间距，也可以通过rowGap和columnGap分别设置垂直和水平间距。
3. **对齐方式**：align属性控制子元素的垂直对齐方式，justify属性控制子元素的水平对齐方式。
4. **响应式设计**：可以通过responsive属性配置不同断点下的网格属性，实现响应式布局。
5. **事件处理**：支持网格容器点击事件，以及子元素的悬停和点击事件。

## 相关组件

- [Container](#/components/layout/container) - 容器组件，用于页面整体结构
- [Row](#/components/layout/row) - 行组件，用于网格布局
- [Col](#/components/layout/col) - 列组件，用于网格布局
- [Space](#/components/layout/space) - 间距组件，用于元素间距控制