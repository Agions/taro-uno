# Pagination 分页

Pagination 组件是一个用于分页导航的组件，支持多种模式、尺寸和交互方式，适用于需要分页展示数据的场景。

## 基本用法

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function BasicPagination() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination total={100} />
    </View>
  );
}
```

### 受控模式

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';
import { useState } from 'react';

function ControlledPagination() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (newCurrent, newPageSize) => {
    setCurrent(newCurrent);
    setPageSize(newPageSize);
    console.log(`当前页码: ${newCurrent}, 每页条数: ${newPageSize}`);
  };

  return (
    <View style={{ padding: '20px' }}>
      <Pagination 
        total={100} 
        current={current} 
        pageSize={pageSize} 
        onChange={handleChange} 
      />
    </View>
  );
}
```

### 简单模式

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function SimplePagination() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination total={100} simple />
    </View>
  );
}
```

### 带总数

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function PaginationWithTotal() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination total={100} showTotal />
    </View>
  );
}
```

### 带快速跳转

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function PaginationWithQuickJumper() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination total={100} showQuickJumper />
    </View>
  );
}
```

### 带页码选择器

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function PaginationWithSizeChanger() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination total={100} showSizeChanger />
    </View>
  );
}
```

### 带自定义页码选项

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function PaginationWithCustomPageSizeOptions() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination 
        total={100} 
        showSizeChanger 
        pageSizeOptions={[5, 10, 20, 50]} 
      />
    </View>
  );
}
```

### 不同尺寸

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function PaginationSizes() {
  return (
    <View style={{ padding: '20px' }}>
      <View style={{ marginBottom: '20px' }}>
        <Pagination total={100} size="small" />
      </View>
      <View style={{ marginBottom: '20px' }}>
        <Pagination total={100} size="medium" />
      </View>
      <View>
        <Pagination total={100} size="large" />
      </View>
    </View>
  );
}
```

### 不同对齐方式

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function PaginationAlign() {
  return (
    <View style={{ padding: '20px' }}>
      <View style={{ marginBottom: '20px' }}>
        <Pagination total={100} align="left" />
      </View>
      <View style={{ marginBottom: '20px' }}>
        <Pagination total={100} align="center" />
      </View>
      <View>
        <Pagination total={100} align="right" />
      </View>
    </View>
  );
}
```

### 禁用状态

```tsx
import { View } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';

function DisabledPagination() {
  return (
    <View style={{ padding: '20px' }}>
      <Pagination total={100} disabled />
    </View>
  );
}
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| current | `number` | - | 否 | 当前页码 |
| defaultCurrent | `number` | `1` | 否 | 默认当前页码 |
| pageSize | `number` | - | 否 | 每页条数 |
| defaultPageSize | `number` | `10` | 否 | 默认每页条数 |
| total | `number` | - | 是 | 总条数 |
| size | `PaginationSize` | `default` | 否 | 分页尺寸 |
| showTotal | `boolean \| ((_total: number, range: [number, number]) => ReactNode)` | `false` | 否 | 是否显示总数 |
| showQuickJumper | `boolean` | `false` | 否 | 是否显示快速跳转 |
| showSizeChanger | `boolean` | `false` | 否 | 是否显示页码选择器 |
| pageSizeOptions | `number[]` | `[10, 20, 50, 100]` | 否 | 页码选择器选项 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| simple | `boolean` | `false` | 否 | 是否简单模式 |
| showMore | `boolean` | `true` | 否 | 是否显示更多按钮 |
| showLessItems | `boolean` | `false` | 否 | 页码显示范围 |
| position | `PaginationPosition` | `bottom` | 否 | 分页位置 |
| align | `PaginationAlign` | `right` | 否 | 分页对齐方式 |
| itemRender | `(page: number, type: 'page' \| 'prev' \| 'next' \| 'jump-prev' \| 'jump-next', element: ReactNode) => ReactNode` | - | 否 | 自定义页码渲染 |
| onChange | `(_page: number, pageSize: number) => void` | - | 否 | 页码改变事件 |
| onShowSizeChange | `(_current: number, size: number) => void` | - | 否 | 每页条数改变事件 |

## 类型定义

```typescript
// 分页尺寸
export type PaginationSize = Size | 'small' | 'medium' | 'large';

// 分页位置
export type PaginationPosition = 'top' | 'bottom' | 'both';

// 分页对齐方式
export type PaginationAlign = 'left' | 'center' | 'right';

// 分页引用
export interface PaginationRef {
  element: any | null;
  getCurrent: () => number;
  getPageSize: () => number;
  getTotalPages: () => number;
  getTotal: () => number;
  setCurrent: (_current: number) => void;
  setPageSize: (_pageSize: number) => void;
  goTo: (_page: number) => void;
  prev: () => void;
  next: () => void;
  first: () => void;
  last: () => void;
}

// 分页组件属性
export interface PaginationProps extends StandardBaseComponentProps {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total: number;
  size?: PaginationSize;
  showTotal?: boolean | ((_total: number, range: [number, number]) => ReactNode);
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  disabled?: boolean;
  simple?: boolean;
  showMore?: boolean;
  showLessItems?: boolean;
  position?: PaginationPosition;
  align?: PaginationAlign;
  itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: ReactNode) => ReactNode;
  onChange?: (_page: number, pageSize: number) => void;
  onShowSizeChange?: (_current: number, size: number) => void;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Pagination } from '@taro-uno/components';
import { useState } from 'react';

function PaginationExample() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(100);
  const [simple, setSimple] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [showQuickJumper, setShowQuickJumper] = useState(false);
  const [showSizeChanger, setShowSizeChanger] = useState(false);
  const [size, setSize] = useState('medium');
  const [align, setAlign] = useState('right');
  const [disabled, setDisabled] = useState(false);

  const handleChange = (newCurrent, newPageSize) => {
    setCurrent(newCurrent);
    setPageSize(newPageSize);
    console.log(`当前页码: ${newCurrent}, 每页条数: ${newPageSize}`);
  };

  const handleShowSizeChange = (newCurrent, newPageSize) => {
    setCurrent(newCurrent);
    setPageSize(newPageSize);
    console.log(`每页条数改变: ${newPageSize}, 当前页码: ${newCurrent}`);
  };

  return (
    <View style={{ padding: '20px' }}>
      <Pagination center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Pagination 分页组件示例</Text>
      </Pagination>
      
      <View style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Text style={{ display: 'block', marginBottom: '10px' }}>分页配置：</Text>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>简单模式：</Text>
          <Button type="primary" onClick={() => setSimple(!simple)} size="mini" style={{ marginLeft: '10px' }}>
            {simple ? '关闭' : '开启'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>显示总数：</Text>
          <Button type="primary" onClick={() => setShowTotal(!showTotal)} size="mini" style={{ marginLeft: '10px' }}>
            {showTotal ? '关闭' : '开启'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>快速跳转：</Text>
          <Button type="primary" onClick={() => setShowQuickJumper(!showQuickJumper)} size="mini" style={{ marginLeft: '10px' }}>
            {showQuickJumper ? '关闭' : '开启'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>页码选择器：</Text>
          <Button type="primary" onClick={() => setShowSizeChanger(!showSizeChanger)} size="mini" style={{ marginLeft: '10px' }}>
            {showSizeChanger ? '关闭' : '开启'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>尺寸：</Text>
          <Button type="primary" onClick={() => setSize('small')} size="mini" style={{ marginLeft: '10px' }}>小</Button>
          <Button type="primary" onClick={() => setSize('medium')} size="mini" style={{ marginLeft: '10px' }}>中</Button>
          <Button type="primary" onClick={() => setSize('large')} size="mini" style={{ marginLeft: '10px' }}>大</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>对齐方式：</Text>
          <Button type="primary" onClick={() => setAlign('left')} size="mini" style={{ marginLeft: '10px' }}>左对齐</Button>
          <Button type="primary" onClick={() => setAlign('center')} size="mini" style={{ marginLeft: '10px' }}>居中</Button>
          <Button type="primary" onClick={() => setAlign('right')} size="mini" style={{ marginLeft: '10px' }}>右对齐</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>禁用状态：</Text>
          <Button type="primary" onClick={() => setDisabled(!disabled)} size="mini" style={{ marginLeft: '10px' }}>
            {disabled ? '启用' : '禁用'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>总条数：</Text>
          <Button type="primary" onClick={() => setTotal(total + 50)} size="mini" style={{ marginLeft: '10px' }}>增加</Button>
          <Button onClick={() => setTotal(Math.max(50, total - 50))} size="mini" style={{ marginLeft: '10px' }}>减少</Button>
          <Text style={{ marginLeft: '10px' }}>{total} 条</Text>
        </View>
      </View>
      
      <View style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Pagination 
          current={current}
          pageSize={pageSize}
          total={total}
          simple={simple}
          showTotal={showTotal}
          showQuickJumper={showQuickJumper}
          showSizeChanger={showSizeChanger}
          size={size}
          align={align}
          disabled={disabled}
          onChange={handleChange}
          onShowSizeChange={handleShowSizeChange}
        />
      </View>
      
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Text style={{ fontSize: '14px', color: '#666' }}>
          当前配置：{`\n`}
          - 当前页码：{current}{`\n`}
          - 每页条数：{pageSize}{`\n`}
          - 总条数：{total}{`\n`}
          - 简单模式：{simple ? '开启' : '关闭'}{`\n`}
          - 显示总数：{showTotal ? '开启' : '关闭'}{`\n`}
          - 快速跳转：{showQuickJumper ? '开启' : '关闭'}{`\n`}
          - 页码选择器：{showSizeChanger ? '开启' : '关闭'}{`\n`}
          - 尺寸：{size}{`\n`}
          - 对齐方式：{align}{`\n`}
          - 禁用状态：{disabled ? '启用' : '禁用'}
        </Text>
      </View>
    </View>
  );
}

export default PaginationExample;
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

1. **总条数计算**：total属性必须正确设置，否则分页计算会出错。
2. **受控模式**：当使用current和pageSize作为受控属性时，必须同时提供onChange和onShowSizeChange事件处理函数。
3. **简单模式**：simple属性为true时，只会显示上一页、当前页码和下一页。
4. **快速跳转**：showQuickJumper属性为true时，会显示跳转到指定页的输入框。
5. **页码选择器**：showSizeChanger属性为true时，会显示每页条数选择器。
6. **性能优化**：对于大量数据，建议合理设置pageSize，避免一次加载过多数据。
7. **自定义渲染**：可以通过itemRender属性自定义页码的渲染，包括页码按钮、上一页、下一页等。
8. **尺寸选择**：根据页面布局选择合适的尺寸，small适合紧凑布局，large适合宽松布局。

## 相关组件

- [Menu](#/components/navigation/menu) - 导航菜单，用于页面导航
- [NavBar](#/components/navigation/nav-bar) - 导航栏，用于页面顶部导航
- [Tabs](#/components/navigation/tabs) - 标签页，用于切换不同内容
- [Steps](#/components/navigation/steps) - 步骤条，用于流程导航