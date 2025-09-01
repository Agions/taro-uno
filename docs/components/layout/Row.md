# Row 行组件

Row组件是布局系统中的基础组件，用于创建水平布局的行容器，通常与Col组件配合使用。

## 基础用法

```tsx
import { Row, Col } from 'taro-uno'

function BasicRow() {
  return (
    <Row>
      <Col span={8}>列 1</Col>
      <Col span={8}>列 2</Col>
      <Col span={8}>列 3</Col>
    </Row>
  )
}
```

## 间距配置

```tsx
import { Row, Col } from 'taro-uno'

function SpacedRow() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>间距 16px</Col>
        <Col span={8}>间距 16px</Col>
        <Col span={8}>间距 16px</Col>
      </Row>
      
      <Row gutter={[16, 24]}>
        <Col span={12}>水平间距 16px，垂直间距 24px</Col>
        <Col span={12}>水平间距 16px，垂直间距 24px</Col>
      </Row>
    </div>
  )
}
```

## 对齐方式

```tsx
import { Row, Col } from 'taro-uno'

function AlignedRow() {
  return (
    <div>
      {/* 顶部对齐 */}
      <Row align="top">
        <Col span={8}>
          <div style={{ height: '80px', background: '#f0f0f0', padding: '8px' }}>
            顶部对齐内容
          </div>
        </Col>
        <Col span={8}>
          <div style={{ height: '120px', background: '#e0e0e0', padding: '8px' }}>
            顶部对齐内容
          </div>
        </Col>
      </Row>
      
      {/* 居中对齐 */}
      <Row align="middle">
        <Col span={8}>
          <div style={{ height: '80px', background: '#f0f0f0', padding: '8px' }}>
            居中对齐内容
          </div>
        </Col>
        <Col span={8}>
          <div style={{ height: '120px', background: '#e0e0e0', padding: '8px' }}>
            居中对齐内容
          </div>
        </Col>
      </Row>
      
      {/* 底部对齐 */}
      <Row align="bottom">
        <Col span={8}>
          <div style={{ height: '80px', background: '#f0f0f0', padding: '8px' }}>
            底部对齐内容
          </div>
        </Col>
        <Col span={8}>
          <div style={{ height: '120px', background: '#e0e0e0', padding: '8px' }}>
            底部对齐内容
          </div>
        </Col>
      </Row>
    </div>
  )
}
```

## 水平对齐

```tsx
import { Row, Col } from 'taro-uno'

function JustifiedRow() {
  return (
    <div>
      {/* 左对齐 */}
      <Row justify="start">
        <Col span={6}>左对齐</Col>
        <Col span={6}>左对齐</Col>
      </Row>
      
      {/* 居中对齐 */}
      <Row justify="center">
        <Col span={6}>居中对齐</Col>
        <Col span={6}>居中对齐</Col>
      </Row>
      
      {/* 右对齐 */}
      <Row justify="end">
        <Col span={6}>右对齐</Col>
        <Col span={6}>右对齐</Col>
      </Row>
      
      {/* 两端对齐 */}
      <Row justify="space-between">
        <Col span={6}>两端对齐</Col>
        <Col span={6}>两端对齐</Col>
      </Row>
      
      {/* 分散对齐 */}
      <Row justify="space-around">
        <Col span={6}>分散对齐</Col>
        <Col span={6}>分散对齐</Col>
      </Row>
      
      {/* 等间距对齐 */}
      <Row justify="space-evenly">
        <Col span={6}>等间距对齐</Col>
        <Col span={6}>等间距对齐</Col>
      </Row>
    </div>
  )
}
```

## 嵌套布局

```tsx
import { Row, Col } from 'taro-uno'

function NestedRow() {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <div style={{ background: '#f0f0f0', padding: '16px' }}>
          <h4>主内容区域</h4>
          <Row gutter={8}>
            <Col span={12}>
              <div style={{ background: '#e0e0e0', padding: '8px' }}>
                嵌套列 1
              </div>
            </Col>
            <Col span={12}>
              <div style={{ background: '#e0e0e0', padding: '8px' }}>
                嵌套列 2
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#f0f0f0', padding: '16px' }}>
          <h4>侧边栏</h4>
          <p>侧边栏内容</p>
        </div>
      </Col>
    </Row>
  )
}
```

## 响应式布局

```tsx
import { Row, Col } from 'taro-uno'

function ResponsiveRow() {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div style={{ background: '#f0f0f0', padding: '16px' }}>
          响应式列 1
        </div>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div style={{ background: '#e0e0e0', padding: '16px' }}>
          响应式列 2
        </div>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div style={{ background: '#f0f0f0', padding: '16px' }}>
          响应式列 3
        </div>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div style={{ background: '#e0e0e0', padding: '16px' }}>
          响应式列 4
        </div>
      </Col>
    </Row>
  )
}
```

## 偏移量

```tsx
import { Row, Col } from 'taro-uno'

function OffsetRow() {
  return (
    <div>
      <Row>
        <Col span={12}>列 1</Col>
        <Col span={12}>列 2</Col>
      </Row>
      
      <Row>
        <Col span={12} offset={6}>
          偏移 6 列
        </Col>
        <Col span={6}>
          列 2
        </Col>
      </Row>
      
      <Row>
        <Col span={8} offset={8}>
          居中列
        </Col>
      </Row>
    </div>
  )
}
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| align | 'top' \| 'middle' \| 'bottom' | 'top' | 垂直对齐方式 |
| justify | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly' | 'start' | 水平对齐方式 |
| gutter | number \| [number, number] | 0 | 栅格间距，可以是水平间距或[水平间距, 垂直间距] |
| wrap | boolean | true | 是否自动换行 |

### CSS变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| --row-gutter | 0px | 栅格间距 |
| --row-align | stretch | 垂直对齐方式 |
| --row-justify | flex-start | 水平对齐方式 |

## 最佳实践

### 1. 使用合适的间距

```tsx
// 推荐：使用统一的间距
<Row gutter={16}>
  <Col span={8}>内容</Col>
  <Col span={8}>内容</Col>
  <Col span={8}>内容</Col>
</Row>

// 避免：过大的间距
<Row gutter={32}>
  <Col span={8}>内容</Col>
  <Col span={8}>内容</Col>
  <Col span={8}>内容</Col>
</Row>
```

### 2. 响应式设计

```tsx
// 推荐：使用响应式断点
<Row gutter={16}>
  <Col xs={24} sm={12} md={8}>
    响应式内容
  </Col>
</Row>

// 避免：固定宽度
<Row>
  <Col span={12}>
    固定宽度内容
  </Col>
</Row>
```

### 3. 合理的嵌套

```tsx
// 推荐：合理的嵌套层级
<Row>
  <Col span={16}>
    <Row gutter={8}>
      <Col span={12}>嵌套内容</Col>
      <Col span={12}>嵌套内容</Col>
    </Row>
  </Col>
  <Col span={8}>侧边栏</Col>
</Row>

// 避免：过深的嵌套
<Row>
  <Col span={24}>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            过深的嵌套
          </Col>
        </Row>
      </Col>
    </Row>
  </Col>
</Row>
```

## 注意事项

1. **性能考虑**：避免过深的嵌套层级，影响渲染性能
2. **间距统一**：在整个应用中保持统一的间距规范
3. **响应式设计**：合理使用响应式断点，确保在不同设备上的良好体验
4. **浏览器兼容性**：注意flexbox布局在不同浏览器中的兼容性