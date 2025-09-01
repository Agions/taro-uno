# Col 列组件

Col组件是布局系统中的基础组件，用于创建垂直布局的列容器，通常与Row组件配合使用。Col组件提供了灵活的栅格系统，支持响应式设计。

## 基础用法

```tsx
import { Row, Col } from 'taro-uno'

function BasicCol() {
  return (
    <Row>
      <Col span={8}>列 1</Col>
      <Col span={8}>列 2</Col>
      <Col span={8}>列 3</Col>
    </Row>
  )
}
```

## 栅格比例

```tsx
import { Row, Col } from 'taro-uno'

function GridCol() {
  return (
    <div>
      {/* 12等分 */}
      <Row>
        <Col span={1}>1</Col>
        <Col span={1}>2</Col>
        <Col span={1}>3</Col>
        <Col span={1}>4</Col>
        <Col span={1}>5</Col>
        <Col span={1}>6</Col>
        <Col span={1}>7</Col>
        <Col span={1}>8</Col>
        <Col span={1}>9</Col>
        <Col span={1}>10</Col>
        <Col span={1}>11</Col>
        <Col span={1}>12</Col>
      </Row>
      
      {/* 24等分 */}
      <Row>
        <Col span={12}>12/24</Col>
        <Col span={12}>12/24</Col>
      </Row>
      
      <Row>
        <Col span={8}>8/24</Col>
        <Col span={8}>8/24</Col>
        <Col span={8}>8/24</Col>
      </Row>
      
      <Row>
        <Col span={6}>6/24</Col>
        <Col span={6}>6/24</Col>
        <Col span={6}>6/24</Col>
        <Col span={6}>6/24</Col>
      </Row>
    </div>
  )
}
```

## 偏移量

```tsx
import { Row, Col } from 'taro-uno'

function OffsetCol() {
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
      
      <Row>
        <Col span={6} offset={3}>
          偏移 3 列
        </Col>
        <Col span={6} offset={3}>
          偏移 3 列
        </Col>
      </Row>
    </div>
  )
}
```

## 响应式设计

```tsx
import { Row, Col } from 'taro-uno'

function ResponsiveCol() {
  return (
    <div>
      {/* 基础响应式 */}
      <Row>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            超小屏全宽，小屏半宽，中等屏1/3，大屏1/4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            超小屏全宽，小屏半宽，中等屏1/3，大屏1/4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            超小屏全宽，小屏半宽，中等屏1/3，大屏1/4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            超小屏全宽，小屏半宽，中等屏1/3，大屏1/4
          </div>
        </Col>
      </Row>
      
      {/* 复杂响应式 */}
      <Row>
        <Col xs={24} md={16} lg={18}>
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            主内容区域
          </div>
        </Col>
        <Col xs={24} md={8} lg={6}>
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            侧边栏
          </div>
        </Col>
      </Row>
    </div>
  )
}
```

## 响应式偏移

```tsx
import { Row, Col } from 'taro-uno'

function ResponsiveOffsetCol() {
  return (
    <Row>
      <Col xs={20} xsOffset={2} md={18} mdOffset={3} lg={16} lgOffset={4}>
        <div style={{ background: '#f0f0f0', padding: '16px' }}>
          响应式偏移列
          <br />
          超小屏：20列宽，偏移2列
          <br />
          中等屏：18列宽，偏移3列
          <br />
          大屏：16列宽，偏移4列
        </div>
      </Col>
    </Row>
  )
}
```

## 排序

```tsx
import { Row, Col } from 'taro-uno'

function OrderCol() {
  return (
    <div>
      <Row>
        <Col span={6} order={3}>
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            第1个 (order=3)
          </div>
        </Col>
        <Col span={6} order={2}>
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            第2个 (order=2)
          </div>
        </Col>
        <Col span={6} order={1}>
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            第3个 (order=1)
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            第4个 (默认)
          </div>
        </Col>
      </Row>
      
      <Row>
        <Col span={12} push={6}>
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            向右推6列 (push=6)
          </div>
        </Col>
        <Col span={12} pull={6}>
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            向左拉6列 (pull=6)
          </div>
        </Col>
      </Row>
    </div>
  )
}
```

## 响应式排序

```tsx
import { Row, Col } from 'taro-uno'

function ResponsiveOrderCol() {
  return (
    <Row>
      <Col xs={24} md={12} mdOrder={2} lg={8} lgOrder={3}>
        <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
          列1 - 中等屏排序2，大屏排序3
        </div>
      </Col>
      <Col xs={24} md={12} mdOrder={1} lg={8} lgOrder={2}>
        <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
          列2 - 中等屏排序1，大屏排序2
        </div>
      </Col>
      <Col xs={24} md={12} mdOrder={3} lg={8} lgOrder={1}>
        <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
          列3 - 中等屏排序3，大屏排序1
        </div>
      </Col>
    </Row>
  )
}
```

## 弹性布局

```tsx
import { Row, Col } from 'taro-uno'

function FlexCol() {
  return (
    <div>
      {/* 自动填充 */}
      <Row>
        <Col flex="1">
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            自动填充剩余空间
          </div>
        </Col>
        <Col flex="200px">
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            固定宽度 200px
          </div>
        </Col>
      </Row>
      
      {/* 比例分配 */}
      <Row>
        <Col flex="1">
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            1份
          </div>
        </Col>
        <Col flex="2">
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            2份
          </div>
        </Col>
        <Col flex="3">
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            3份
          </div>
        </Col>
      </Row>
      
      {/* 最小宽度 */}
      <Row>
        <Col flex="auto">
          <div style={{ background: '#f0f0f0', padding: '16px', marginBottom: '8px' }}>
            自动宽度
          </div>
        </Col>
        <Col flex="none">
          <div style={{ background: '#e0e0e0', padding: '16px', marginBottom: '8px' }}>
            不伸缩
          </div>
        </Col>
      </Row>
    </div>
  )
}
```

## 复杂布局示例

```tsx
import { Row, Col } from 'taro-uno'

function ComplexLayout() {
  return (
    <div>
      {/* 头部 */}
      <Row>
        <Col span={24}>
          <div style={{ background: '#3b82f6', color: 'white', padding: '16px', textAlign: 'center' }}>
            网站头部
          </div>
        </Col>
      </Row>
      
      {/* 主体内容 */}
      <Row>
        {/* 左侧边栏 */}
        <Col xs={24} md={6}>
          <div style={{ background: '#f3f4f6', padding: '16px', minHeight: '400px' }}>
            <h4>左侧边栏</h4>
            <ul>
              <li>导航项1</li>
              <li>导航项2</li>
              <li>导航项3</li>
            </ul>
          </div>
        </Col>
        
        {/* 主内容区 */}
        <Col xs={24} md={12}>
          <div style={{ background: 'white', padding: '16px', minHeight: '400px', border: '1px solid #e5e7eb' }}>
            <h4>主内容区</h4>
            <p>这里是主要内容区域...</p>
          </div>
        </Col>
        
        {/* 右侧边栏 */}
        <Col xs={24} md={6}>
          <div style={{ background: '#f3f4f6', padding: '16px', minHeight: '400px' }}>
            <h4>右侧边栏</h4>
            <p>广告或相关信息</p>
          </div>
        </Col>
      </Row>
      
      {/* 底部 */}
      <Row>
        <Col span={24}>
          <div style={{ background: '#1f2937', color: 'white', padding: '16px', textAlign: 'center' }}>
            网站底部
          </div>
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
| span | number | - | 栅格占位格数，0-24 |
| offset | number | 0 | 栅格左侧的间隔格数 |
| order | number | 0 | 栅格顺序 |
| push | number | 0 | 栅格向右移动格数 |
| pull | number | 0 | 栅格向左移动格数 |
| xs | number \| { span: number, offset?: number, order?: number } | - | <576px 响应式栅格 |
| sm | number \| { span: number, offset?: number, order?: number } | - | ≥576px 响应式栅格 |
| md | number \| { span: number, offset?: number, order?: number } | - | ≥768px 响应式栅格 |
| lg | number \| { span: number, offset?: number, order?: number } | - | ≥992px 响应式栅格 |
| xl | number \| { span: number, offset?: number, order?: number } | - | ≥1200px 响应式栅格 |
| xxl | number \| { span: number, offset?: number, order?: number } | - | ≥1600px 响应式栅格 |
| flex | string \| number | - | flex 布局属性 |

### 响应式断点

| 断点 | 屏幕宽度 | 说明 |
|------|----------|------|
| xs | <576px | 超小屏 |
| sm | ≥576px | 小屏 |
| md | ≥768px | 中等屏 |
| lg | ≥992px | 大屏 |
| xl | ≥1200px | 超大屏 |
| xxl | ≥1600px | 超超大屏 |

### CSS变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| --col-span | - | 栅格占位格数 |
| --col-offset | 0 | 栅格左侧间隔格数 |
| --col-order | 0 | 栅格顺序 |

## 最佳实践

### 1. 合理使用响应式设计

```tsx
// 推荐：合理的响应式布局
<Row>
  <Col xs={24} sm={12} md={8}>
    内容
  </Col>
</Row>

// 避免：过度复杂的响应式
<Row>
  <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
    过度复杂
  </Col>
</Row>
```

### 2. 使用弹性布局

```tsx
// 推荐：使用flex实现自适应
<Row>
  <Col flex="1">自适应内容</Col>
  <Col flex="200px">固定宽度</Col>
</Row>

// 避免：固定宽度不够灵活
<Row>
  <Col span={16}>固定宽度</Col>
  <Col span={8}>固定宽度</Col>
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

1. **栅格总数**：每行栅格总数不超过24格
2. **响应式优先级**：大屏断点会覆盖小屏断点的设置
3. **性能考虑**：避免过深的嵌套和过于复杂的响应式规则
4. **浏览器兼容性**：注意flexbox布局在不同浏览器中的兼容性
5. **移动优先**：建议采用移动优先的设计理念