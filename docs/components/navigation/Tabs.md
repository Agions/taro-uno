# Tabs 标签页组件

Tabs组件用于内容分区，提供标签页切换功能，支持多种样式和交互模式。

## 基础用法

```tsx
import { Tabs } from 'taro-uno'

function BasicTabs() {
  const items = [
    {
      key: 'tab1',
      label: '标签页 1',
      children: '标签页 1 的内容'
    },
    {
      key: 'tab2',
      label: '标签页 2',
      children: '标签页 2 的内容'
    },
    {
      key: 'tab3',
      label: '标签页 3',
      children: '标签页 3 的内容'
    }
  ]
  
  return <Tabs items={items} />
}
```

## 标签位置

```tsx
import { Tabs } from 'taro-uno'

function PositionTabs() {
  const items = [
    {
      key: 'top',
      label: '顶部标签',
      children: '这是顶部标签的内容'
    },
    {
      key: 'left',
      label: '左侧标签',
      children: '这是左侧标签的内容'
    },
    {
      key: 'right',
      label: '右侧标签',
      children: '这是右侧标签的内容'
    },
    {
      key: 'bottom',
      label: '底部标签',
      children: '这是底部标签的内容'
    }
  ]
  
  return (
    <div>
      {/* 顶部标签 */}
      <Tabs items={items} tabPosition="top" />
      
      {/* 左侧标签 */}
      <Tabs items={items} tabPosition="left" />
      
      {/* 右侧标签 */}
      <Tabs items={items} tabPosition="right" />
      
      {/* 底部标签 */}
      <Tabs items={items} tabPosition="bottom" />
    </div>
  )
}
```

## 标签类型

```tsx
import { Tabs } from 'taro-uno'

function TypeTabs() {
  const items = [
    {
      key: 'line',
      label: '线条型',
      children: '这是线条型标签的内容'
    },
    {
      key: 'card',
      label: '卡片型',
      children: '这是卡片型标签的内容'
    },
    {
      key: 'editable-card',
      label: '可编辑卡片',
      children: '这是可编辑卡片标签的内容'
    }
  ]
  
  return (
    <div>
      {/* 线条型 */}
      <Tabs items={items} type="line" />
      
      {/* 卡片型 */}
      <Tabs items={items} type="card" />
      
      {/* 可编辑卡片 */}
      <Tabs items={items} type="editable-card" />
    </div>
  )
}
```

## 大小尺寸

```tsx
import { Tabs } from 'taro-uno'

function SizeTabs() {
  const items = [
    {
      key: 'small',
      label: '小号',
      children: '这是小号标签的内容'
    },
    {
      key: 'default',
      label: '默认',
      children: '这是默认标签的内容'
    },
    {
      key: 'large',
      label: '大号',
      children: '这是大号标签的内容'
    }
  ]
  
  return (
    <div>
      {/* 小号标签 */}
      <Tabs items={items} size="small" />
      
      {/* 默认标签 */}
      <Tabs items={items} size="default" />
      
      {/* 大号标签 */}
      <Tabs items={items} size="large" />
    </div>
  )
}
```

## 受控模式

```tsx
import { Tabs } from 'taro-uno'

function ControlledTabs() {
  const [activeKey, setActiveKey] = useState('tab1')
  
  const items = [
    {
      key: 'tab1',
      label: '标签页 1',
      children: '标签页 1 的内容'
    },
    {
      key: 'tab2',
      label: '标签页 2',
      children: '标签页 2 的内容'
    },
    {
      key: 'tab3',
      label: '标签页 3',
      children: '标签页 3 的内容'
    }
  ]
  
  const onChange = (key) => {
    setActiveKey(key)
    console.log('当前激活的标签:', key)
  }
  
  return (
    <Tabs 
      activeKey={activeKey}
      items={items}
      onChange={onChange}
    />
  )
}
```

## 添加和关闭标签

```tsx
import { Tabs, Button } from 'taro-uno'

function EditableTabs() {
  const [items, setItems] = useState([
    {
      key: 'tab1',
      label: '标签页 1',
      children: '标签页 1 的内容'
    },
    {
      key: 'tab2',
      label: '标签页 2',
      children: '标签页 2 的内容'
    }
  ])
  
  const [activeKey, setActiveKey] = useState('tab1')
  
  const add = () => {
    const newKey = `tab${items.length + 1}`
    const newItem = {
      key: newKey,
      label: `标签页 ${items.length + 1}`,
      children: `标签页 ${items.length + 1} 的内容`
    }
    setItems([...items, newItem])
    setActiveKey(newKey)
  }
  
  const remove = (targetKey) => {
    const newItems = items.filter(item => item.key !== targetKey)
    setItems(newItems)
    if (activeKey === targetKey && newItems.length > 0) {
      setActiveKey(newItems[0].key)
    }
  }
  
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add()
    } else if (action === 'remove') {
      remove(targetKey)
    }
  }
  
  return (
    <div>
      <Button onClick={add}>添加标签页</Button>
      <Tabs 
        activeKey={activeKey}
        items={items}
        type="editable-card"
        onEdit={onEdit}
        onChange={setActiveKey}
      />
    </div>
  )
}
```

## 禁用状态

```tsx
import { Tabs } from 'taro-uno'

function DisabledTabs() {
  const items = [
    {
      key: 'tab1',
      label: '正常标签',
      children: '这是正常标签的内容'
    },
    {
      key: 'tab2',
      label: '禁用标签',
      children: '这是禁用标签的内容',
      disabled: true
    },
    {
      key: 'tab3',
      label: '正常标签',
      children: '这是正常标签的内容'
    }
  ]
  
  return (
    <div>
      {/* 单个标签禁用 */}
      <Tabs items={items} />
      
      {/* 整个标签页禁用 */}
      <Tabs items={items} disabled />
    </div>
  )
}
```

## 自定义标签

```tsx
import { Tabs, Badge } from 'taro-uno'

function CustomTabs() {
  const items = [
    {
      key: 'tab1',
      label: (
        <span>
          <Badge count={5}>消息</Badge>
        </span>
      ),
      children: '这是带徽章的标签'
    },
    {
      key: 'tab2',
      label: (
        <span>
          <i className="icon-user" /> 用户
        </span>
      ),
      children: '这是带图标的标签'
    },
    {
      key: 'tab3',
      label: (
        <span>
          <strong>重要</strong> 标签
        </span>
      ),
      children: '这是自定义样式的标签'
    }
  ]
  
  return <Tabs items={items} />
}
```

## 居中显示

```tsx
import { Tabs } from 'taro-uno'

function CenteredTabs() {
  const items = [
    {
      key: 'tab1',
      label: '标签页 1',
      children: '标签页 1 的内容'
    },
    {
      key: 'tab2',
      label: '标签页 2',
      children: '标签页 2 的内容'
    },
    {
      key: 'tab3',
      label: '标签页 3',
      children: '标签页 3 的内容'
    }
  ]
  
  return (
    <div>
      {/* 居中显示 */}
      <Tabs items={items} centered />
      
      {/* 不居中显示 */}
      <Tabs items={items} centered={false} />
    </div>
  )
}
```

## 带图标的标签

```tsx
import { Tabs } from 'taro-uno'

function IconTabs() {
  const items = [
    {
      key: 'home',
      label: (
        <span>
          <i className="icon-home" /> 首页
        </span>
      ),
      children: '这是首页标签的内容'
    },
    {
      key: 'user',
      label: (
        <span>
          <i className="icon-user" /> 用户
        </span>
      ),
      children: '这是用户标签的内容'
    },
    {
      key: 'settings',
      label: (
        <span>
          <i className="icon-settings" /> 设置
        </span>
      ),
      children: '这是设置标签的内容'
    }
  ]
  
  return <Tabs items={items} />
}
```

## 动态标签

```tsx
import { Tabs, Button, Input } from 'taro-uno'

function DynamicTabs() {
  const [items, setItems] = useState([])
  const [activeKey, setActiveKey] = useState('')
  const [newTabLabel, setNewTabLabel] = useState('')
  
  const addTab = () => {
    if (newTabLabel.trim()) {
      const newKey = `tab${Date.now()}`
      const newItem = {
        key: newKey,
        label: newTabLabel,
        children: `${newTabLabel} 的内容`
      }
      setItems([...items, newItem])
      setActiveKey(newKey)
      setNewTabLabel('')
    }
  }
  
  const removeTab = (targetKey) => {
    const newItems = items.filter(item => item.key !== targetKey)
    setItems(newItems)
    if (activeKey === targetKey && newItems.length > 0) {
      setActiveKey(newItems[0].key)
    }
  }
  
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Input 
          placeholder="输入新标签名称"
          value={newTabLabel}
          onChange={(e) => setNewTabLabel(e.target.value)}
          style={{ width: '200px', marginRight: '8px' }}
        />
        <Button onClick={addTab}>添加标签</Button>
      </div>
      
      <Tabs 
        activeKey={activeKey}
        items={items}
        type="editable-card"
        onEdit={(targetKey, action) => {
          if (action === 'remove') {
            removeTab(targetKey)
          }
        }}
        onChange={setActiveKey}
      />
    </div>
  )
}
```

## 嵌套标签

```tsx
import { Tabs } from 'taro-uno'

function NestedTabs() {
  const outerItems = [
    {
      key: 'tab1',
      label: '主标签 1',
      children: (
        <Tabs 
          items={[
            {
              key: 'subtab1',
              label: '子标签 1',
              children: '子标签 1 的内容'
            },
            {
              key: 'subtab2',
              label: '子标签 2',
              children: '子标签 2 的内容'
            }
          ]}
        />
      )
    },
    {
      key: 'tab2',
      label: '主标签 2',
      children: '主标签 2 的内容'
    }
  ]
  
  return <Tabs items={outerItems} />
}
```

## 复杂示例

```tsx
import { Tabs, Card, Button, Badge, Avatar } from 'taro-uno'

function ComplexTabs() {
  const [activeKey, setActiveKey] = useState('overview')
  
  const items = [
    {
      key: 'overview',
      label: (
        <span>
          <i className="icon-dashboard" /> 概览
        </span>
      ),
      children: (
        <div>
          <h3>系统概览</h3>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <Card style={{ flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>1,234</div>
                <div style={{ color: '#666' }}>总用户数</div>
              </div>
            </Card>
            <Card style={{ flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>567</div>
                <div style={{ color: '#666' }}>在线用户</div>
              </div>
            </Card>
            <Card style={{ flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>89</div>
                <div style={{ color: '#666' }}>今日新增</div>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      key: 'users',
      label: (
        <span>
          <Badge count={3}>
            <i className="icon-users" /> 用户管理
          </Badge>
        </span>
      ),
      children: (
        <div>
          <h3>用户管理</h3>
          <div style={{ marginTop: '16px' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar>用户1</Avatar>
                <div>
                  <div style={{ fontWeight: 'bold' }}>张三</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>管理员</div>
                </div>
                <Button size="small" type="primary">编辑</Button>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      key: 'settings',
      label: (
        <span>
          <i className="icon-settings" /> 系统设置
        </span>
      ),
      children: (
        <div>
          <h3>系统设置</h3>
          <Card style={{ marginTop: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <strong>通知设置</strong>
            </div>
            <div style={{ color: '#666' }}>
              配置系统通知和邮件通知的相关设置。
            </div>
          </Card>
        </div>
      )
    },
    {
      key: 'logs',
      label: (
        <span>
          <i className="icon-logs" /> 操作日志
        </span>
      ),
      children: (
        <div>
          <h3>操作日志</h3>
          <Card style={{ marginTop: '16px' }}>
            <div style={{ color: '#666' }}>
              查看系统操作日志和用户活动记录。
            </div>
          </Card>
        </div>
      )
    }
  ]
  
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button onClick={() => setActiveKey('overview')}>概览</Button>
        <Button onClick={() => setActiveKey('users')}>用户管理</Button>
        <Button onClick={() => setActiveKey('settings')}>设置</Button>
        <Button onClick={() => setActiveKey('logs')}>日志</Button>
      </div>
      
      <Tabs 
        activeKey={activeKey}
        items={items}
        type="card"
        onChange={setActiveKey}
      />
    </div>
  )
}
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| activeKey | string | - | 当前激活的标签 key |
| defaultActiveKey | string | - | 默认激活的标签 key |
| items | TabItem[] | [] | 标签页数据 |
| type | 'line' \| 'card' \| 'editable-card' | 'line' | 标签类型 |
| size | 'small' \| 'default' \| 'large' | 'default' | 标签大小 |
| tabPosition | 'top' \| 'right' \| 'bottom' \| 'left' | 'top' | 标签位置 |
| centered | boolean | false | 标签是否居中显示 |
| disabled | boolean | false | 是否禁用 |
| animated | boolean | true | 是否使用动画切换 |
| onEdit | (key: string, action: 'add' \| 'remove') => void | - | 编辑标签回调 |
| onChange | (key: string) => void | - | 标签切换回调 |
| onTabClick | (key: string, event: Event) => void | - | 标签点击回调 |

### TabItem 类型

| 属性名 | 类型 | 说明 |
|--------|------|------|
| key | string | 标签的唯一标识 |
| label | ReactNode | 标签的标题 |
| children | ReactNode | 标签的内容 |
| disabled | boolean | 是否禁用 |
| forceRender | boolean | 是否强制渲染 |

### 事件回调

| 事件名 | 参数 | 说明 |
|--------|------|------|
| onChange | (key: string) => void | 标签切换回调 |
| onEdit | (key: string, action: 'add' \| 'remove') => void | 编辑标签回调 |
| onTabClick | (key: string, event: Event) => void | 标签点击回调 |

## 最佳实践

### 1. 合理使用标签类型

```tsx
// 推荐：导航型标签使用线条型
<Tabs type="line" items={navigationItems} />

// 推荐：内容分区使用卡片型
<Tabs type="card" items={contentItems} />

// 推荐：需要动态管理时使用可编辑卡片
<Tabs type="editable-card" items={dynamicItems} />
```

### 2. 合理设置标签位置

```tsx
// 推荐：顶部标签用于导航
<Tabs tabPosition="top" items={navItems} />

// 推荐：侧边标签用于设置页面
<Tabs tabPosition="left" items={settingsItems} />

// 推荐：底部标签用于移动端
<Tabs tabPosition="bottom" items={mobileItems} />
```

### 3. 使用受控模式

```tsx
// 推荐：使用受控模式管理状态
const [activeKey, setActiveKey] = useState('tab1')

<Tabs 
  activeKey={activeKey}
  onChange={setActiveKey}
  items={items}
/>
```

## 注意事项

1. **性能考虑**：避免在标签内容中使用重型组件，使用懒加载
2. **可访问性**：确保标签页在键盘导航中可用
3. **移动端适配**：在移动端考虑使用底部标签位置
4. **动画性能**：大量标签时考虑关闭动画以提高性能
5. **标签数量**：避免过多的标签，影响用户体验