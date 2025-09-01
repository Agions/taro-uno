# Grid 网格组件

Grid组件提供了强大的网格布局系统，支持复杂的网格布局需求。与传统的Row-Col布局不同，Grid组件提供了更灵活的网格布局能力。

## 基础用法

```tsx
import { Grid } from 'taro-uno'

function BasicGrid() {
  return (
    <Grid columns={3} gap={16}>
      <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
        网格项 1
      </div>
      <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
        网格项 2
      </div>
      <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
        网格项 3
      </div>
      <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
        网格项 4
      </div>
      <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
        网格项 5
      </div>
      <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
        网格项 6
      </div>
    </Grid>
  )
}
```

## 列数配置

```tsx
import { Grid } from 'taro-uno'

function ColumnGrid() {
  return (
    <div>
      {/* 2列网格 */}
      <Grid columns={2} gap={16}>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          2列网格项 1
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          2列网格项 2
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          2列网格项 3
        </div>
      </Grid>
      
      {/* 4列网格 */}
      <Grid columns={4} gap={16}>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          4列网格项 1
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          4列网格项 2
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          4列网格项 3
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          4列网格项 4
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          4列网格项 5
        </div>
      </Grid>
      
      {/* 6列网格 */}
      <Grid columns={6} gap={8}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ background: '#f0f0f0', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
            {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  )
}
```

## 响应式列数

```tsx
import { Grid } from 'taro-uno'

function ResponsiveGrid() {
  return (
    <div>
      {/* 基础响应式 */}
      <Grid 
        xs={1} 
        sm={2} 
        md={3} 
        lg={4} 
        gap={16}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
            响应式网格项 {i + 1}
          </div>
        ))}
      </Grid>
      
      {/* 复杂响应式 */}
      <Grid 
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
        gap={{ xs: 8, sm: 12, md: 16 }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
            复杂响应式 {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  )
}
```

## 间距配置

```tsx
import { Grid } from 'taro-uno'

function SpacedGrid() {
  return (
    <div>
      {/* 统一间距 */}
      <Grid columns={3} gap={8}>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          间距8px
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          间距8px
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          间距8px
        </div>
      </Grid>
      
      {/* 行列间距 */}
      <Grid columns={3} gap={{ row: 16, column: 8 }}>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          行间距16px，列间距8px
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          行间距16px，列间距8px
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          行间距16px，列间距8px
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          行间距16px，列间距8px
        </div>
      </Grid>
      
      {/* 响应式间距 */}
      <Grid 
        columns={3} 
        gap={{ xs: 8, sm: 12, md: 16 }}
      >
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          响应式间距
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          响应式间距
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          响应式间距
        </div>
      </Grid>
    </div>
  )
}
```

## 网格项跨度

```tsx
import { Grid } from 'taro-uno'

function SpanGrid() {
  return (
    <div>
      {/* 列跨度 */}
      <Grid columns={4} gap={16}>
        <div style={{ 
          background: '#f0f0f0', 
          padding: '16px', 
          textAlign: 'center',
          gridColumn: 'span 2'
        }}>
          跨度2列
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          跨度1列
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          跨度1列
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          跨度1列
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          跨度1列
        </div>
      </Grid>
      
      {/* 行跨度 */}
      <Grid columns={3} gap={16} rows={2}>
        <div style={{ 
          background: '#f0f0f0', 
          padding: '16px', 
          textAlign: 'center',
          gridRow: 'span 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          跨度2行
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          单行项目
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          单行项目
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          单行项目
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          单行项目
        </div>
      </Grid>
    </div>
  )
}
```

## 自动填充

```tsx
import { Grid } from 'taro-uno'

function AutoFillGrid() {
  return (
    <div>
      {/* 自动填充列 */}
      <Grid 
        columns="repeat(auto-fill, minmax(200px, 1fr))" 
        gap={16}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
            自动填充项 {i + 1}
          </div>
        ))}
      </Grid>
      
      {/* 自动适配列 */}
      <Grid 
        columns="repeat(auto-fit, minmax(250px, 1fr))" 
        gap={16}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
            自动适配项 {i + 1}
          </div>
        ))}
      </Grid>
      
      {/* 密集填充 */}
      <Grid 
        columns="repeat(auto-fill, minmax(150px, 1fr))" 
        gap={8}
        dense
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div 
            key={i} 
            style={{ 
              background: i % 2 === 0 ? '#f0f0f0' : '#e0e0e0', 
              padding: '16px', 
              textAlign: 'center',
              height: i % 3 === 0 ? '120px' : '80px'
            }}
          >
            密集填充项 {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  )
}
```

## 网格区域

```tsx
import { Grid } from 'taro-uno'

function AreaGrid() {
  return (
    <Grid 
      columns="200px 1fr 200px" 
      rows="60px 1fr 60px"
      gap={16}
      areas={`
        "header header header"
        "sidebar main aside"
        "footer footer footer"
      `}
    >
      <div style={{ 
        background: '#3b82f6', 
        color: 'white', 
        padding: '16px', 
        textAlign: 'center',
        gridArea: 'header'
      }}>
        头部区域
      </div>
      <div style={{ 
        background: '#f3f4f6', 
        padding: '16px', 
        textAlign: 'center',
        gridArea: 'sidebar'
      }}>
        侧边栏区域
      </div>
      <div style={{ 
        background: 'white', 
        padding: '16px', 
        textAlign: 'center',
        border: '1px solid #e5e7eb',
        gridArea: 'main'
      }}>
        主要内容区域
      </div>
      <div style={{ 
        background: '#f3f4f6', 
        padding: '16px', 
        textAlign: 'center',
        gridArea: 'aside'
      }}>
        附加区域
      </div>
      <div style={{ 
        background: '#1f2937', 
        color: 'white', 
        padding: '16px', 
        textAlign: 'center',
        gridArea: 'footer'
      }}>
        底部区域
      </div>
    </Grid>
  )
}
```

## 对齐方式

```tsx
import { Grid } from 'taro-uno'

function AlignedGrid() {
  return (
    <div>
      {/* 整体对齐 */}
      <Grid 
        columns={3} 
        gap={16}
        align="center"
        justify="center"
        style={{ minHeight: '200px', background: '#f9fafb', padding: '16px' }}
      >
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          居中对齐项 1
        </div>
        <div style={{ background: '#e0e0e0', padding: '16px', textAlign: 'center' }}>
          居中对齐项 2
        </div>
        <div style={{ background: '#f0f0f0', padding: '16px', textAlign: 'center' }}>
          居中对齐项 3
        </div>
      </Grid>
      
      {/* 网格项对齐 */}
      <Grid 
        columns={3} 
        gap={16}
        style={{ minHeight: '200px', background: '#f9fafb', padding: '16px' }}
      >
        <div style={{ 
          background: '#f0f0f0', 
          padding: '16px', 
          textAlign: 'center',
          alignSelf: 'start'
        }}>
          顶部对齐
        </div>
        <div style={{ 
          background: '#e0e0e0', 
          padding: '16px', 
          textAlign: 'center',
          alignSelf: 'center'
        }}>
          居中对齐
        </div>
        <div style={{ 
          background: '#f0f0f0', 
          padding: '16px', 
          textAlign: 'center',
          alignSelf: 'end'
        }}>
          底部对齐
        </div>
      </Grid>
    </div>
  )
}
```

## 复杂布局示例

```tsx
import { Grid } from 'taro-uno'

function ComplexGrid() {
  return (
    <div>
      {/* 卡片网格 */}
      <Grid 
        columns="repeat(auto-fill, minmax(300px, 1fr))" 
        gap={24}
      >
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>卡片标题 1</h3>
          <p style={{ color: '#6b7280' }}>这是卡片的内容描述，展示了网格布局的基本用法。</p>
        </div>
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>卡片标题 2</h3>
          <p style={{ color: '#6b7280' }}>这是卡片的内容描述，展示了网格布局的基本用法。</p>
        </div>
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>卡片标题 3</h3>
          <p style={{ color: '#6b7280' }}>这是卡片的内容描述，展示了网格布局的基本用法。</p>
        </div>
      </Grid>
      
      {/* 图片网格 */}
      <Grid 
        columns="repeat(auto-fill, minmax(150px, 1fr))" 
        gap={8}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ 
            background: '#e5e7eb', 
            aspectRatio: '1',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            图片 {i + 1}
          </div>
        ))}
      </Grid>
      
      {/* 仪表板布局 */}
      <Grid 
        columns="250px 1fr" 
        gap={24}
        style={{ minHeight: '400px' }}
      >
        <div style={{ 
          background: '#f3f4f6', 
          borderRadius: '8px', 
          padding: '20px' 
        }}>
          <h4 style={{ marginTop: 0 }}>导航菜单</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>仪表板</li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>用户管理</li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>系统设置</li>
            <li style={{ padding: '8px 0' }}>帮助中心</li>
          </ul>
        </div>
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ marginTop: 0 }}>主要内容区域</h4>
          <p>这里可以放置各种仪表板组件和内容。</p>
        </div>
      </Grid>
    </div>
  )
}
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | number \| string \| object | 1 | 网格列数或列模板 |
| rows | number \| string | - | 网格行数或行模板 |
| gap | number \| string \| object | 0 | 网格间距 |
| areas | string | - | 网格区域模板 |
| align | 'start' \| 'end' \| 'center' \| 'stretch' | 'stretch' | 垂直对齐方式 |
| justify | 'start' \| 'end' \| 'center' \| 'stretch' | 'stretch' | 水平对齐方式 |
| dense | boolean | false | 是否使用密集算法 |
| autoFlow | 'row' \| 'column' \| 'row dense' \| 'column dense' | 'row' | 自动流动方式 |

### 响应式配置

| 属性名 | 类型 | 说明 |
|--------|------|------|
| xs | number \| object | <576px 断点配置 |
| sm | number \| object | ≥576px 断点配置 |
| md | number \| object | ≥768px 断点配置 |
| lg | number \| object | ≥992px 断点配置 |
| xl | number \| object | ≥1200px 断点配置 |
| xxl | number \| object | ≥1600px 断点配置 |

### CSS变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| --grid-columns | 1 | 网格列数 |
| --grid-rows | auto | 网格行数 |
| --grid-gap | 0 | 网格间距 |
| --grid-align | stretch | 垂直对齐方式 |
| --grid-justify | stretch | 水平对齐方式 |

## 最佳实践

### 1. 使用合适的列数

```tsx
// 推荐：使用合适的列数
<Grid columns={3} gap={16}>
  <div>内容</div>
</Grid>

// 推荐：使用自动填充
<Grid columns="repeat(auto-fill, minmax(250px, 1fr))" gap={16}>
  <div>内容</div>
</Grid>

// 避免：过多的列数
<Grid columns={12} gap={4}>
  <div>内容</div>
</Grid>
```

### 2. 合理的间距

```tsx
// 推荐：统一的间距
<Grid columns={3} gap={16}>
  <div>内容</div>
</Grid>

// 推荐：响应式间距
<Grid columns={3} gap={{ xs: 8, sm: 12, md: 16 }}>
  <div>内容</div>
</Grid>

// 避免：过大的间距
<Grid columns={3} gap={32}>
  <div>内容</div>
</Grid>
```

### 3. 使用网格区域

```tsx
// 推荐：使用网格区域创建复杂布局
<Grid 
  columns="200px 1fr 200px" 
  areas={`
    "header header header"
    "sidebar main aside"
    "footer footer footer"
  `}
>
  <div style={{ gridArea: 'header' }}>头部</div>
  <div style={{ gridArea: 'sidebar' }}>侧边栏</div>
  <div style={{ gridArea: 'main' }}>主要内容</div>
  <div style={{ gridArea: 'aside' }}>附加内容</div>
  <div style={{ gridArea: 'footer' }}>底部</div>
</Grid>

// 避免：过度复杂的网格
<Grid columns={12} gap={4}>
  <div style={{ gridColumn: 'span 3' }}>内容</div>
</Grid>
```

## 注意事项

1. **浏览器兼容性**：CSS Grid在较新的浏览器中支持良好，但在旧版浏览器中可能需要polyfill
2. **性能考虑**：复杂的网格布局可能会影响性能，特别是在移动设备上
3. **响应式设计**：合理使用响应式断点，确保在不同设备上的良好体验
4. **可访问性**：确保网格布局在屏幕阅读器中能够正确解析
5. **嵌套限制**：避免过深的网格嵌套，影响性能和可维护性