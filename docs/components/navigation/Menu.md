# Menu 菜单组件

菜单组件用于导航和功能选择，支持多种布局模式和交互方式。

## 基础用法

```tsx
import { Menu } from 'taro-uno'

// 基础菜单
<Menu
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心' },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## 布局模式

菜单支持多种布局模式。

```tsx
// 垂直菜单
<Menu
  mode="vertical"
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心' },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>

// 水平菜单
<Menu
  mode="horizontal"
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心' },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>

// 内联菜单
<Menu
  mode="inline"
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心' },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## 子菜单

菜单支持子菜单。

```tsx
// 带子菜单
<Menu
  mode="vertical"
  items={[
    { key: 'home', label: '首页' },
    { 
      key: 'products', 
      label: '产品中心',
      children: [
        { key: 'phones', label: '手机' },
        { key: 'computers', label: '电脑' },
        { key: 'tablets', label: '平板' }
      ]
    },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## 图标支持

菜单支持图标。

```tsx
// 带图标菜单
<Menu
  mode="vertical"
  items={[
    { key: 'home', label: '首页', icon: <Icon name="home" /> },
    { key: 'products', label: '产品中心', icon: <Icon name="package" /> },
    { key: 'about', label: '关于我们', icon: <Icon name="info" /> }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## 选中状态

菜单支持选中状态。

```tsx
// 受控选中
const [selectedKeys, setSelectedKeys] = useState(['home'])
<Menu
  selectedKeys={selectedKeys}
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心' },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => setSelectedKeys([key])}
/>

// 默认选中
<Menu
  defaultSelectedKeys={['home']}
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心' },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## 展开状态

菜单支持展开状态。

```tsx
// 受控展开
const [openKeys, setOpenKeys] = useState(['products'])
<Menu
  mode="inline"
  openKeys={openKeys}
  selectedKeys={selectedKeys}
  items={[
    { key: 'home', label: '首页' },
    { 
      key: 'products', 
      label: '产品中心',
      children: [
        { key: 'phones', label: '手机' },
        { key: 'computers', label: '电脑' },
        { key: 'tablets', label: '平板' }
      ]
    },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => setSelectedKeys([key])}
  onOpenChange={(keys) => setOpenKeys(keys)}
/>
```

## 折叠菜单

菜单支持折叠功能。

```tsx
// 可折叠菜单
const [collapsed, setCollapsed] = useState(false)
<Menu
  mode="inline"
  collapsed={collapsed}
  items={[
    { key: 'home', label: '首页', icon: <Icon name="home" /> },
    { 
      key: 'products', 
      label: '产品中心',
      icon: <Icon name="package" />,
      children: [
        { key: 'phones', label: '手机' },
        { key: 'computers', label: '电脑' },
        { key: 'tablets', label: '平板' }
      ]
    },
    { key: 'about', label: '关于我们', icon: <Icon name="info" /> }
  ]}
  onClick={(key) => console.log(key)}
/>
<Button onClick={() => setCollapsed(!collapsed)}>
  {collapsed ? '展开' : '折叠'}
</Button>
```

## 主题样式

菜单支持多种主题样式。

```tsx
// 亮色主题
<Menu
  theme="light"
  mode="vertical"
  items={menuItems}
  onClick={(key) => console.log(key)}
/>

// 暗色主题
<Menu
  theme="dark"
  mode="vertical"
  items={menuItems}
  onClick={(key) => console.log(key)}
/>
```

## 响应式设计

菜单支持响应式设计。

```tsx
// 响应式菜单
<Menu
  mode={isMobile ? 'vertical' : 'horizontal'}
  items={menuItems}
  onClick={(key) => console.log(key)}
/>
```

## 自定义渲染

菜单支持自定义渲染。

```tsx
// 自定义渲染
<Menu
  mode="vertical"
  items={menuItems}
  onClick={(key) => console.log(key)}
  renderItem={(item) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {item.icon}
      <span>{item.label}</span>
      {item.badge && <Badge count={item.badge} />}
    </div>
  )}
/>
```

## 分组菜单

菜单支持分组功能。

```tsx
// 分组菜单
<Menu
  mode="vertical"
  items={[
    {
      type: 'group',
      label: '主要功能',
      children: [
        { key: 'home', label: '首页' },
        { key: 'products', label: '产品中心' }
      ]
    },
    {
      type: 'group',
      label: '其他功能',
      children: [
        { key: 'about', label: '关于我们' },
        { key: 'contact', label: '联系我们' }
      ]
    }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## 禁用状态

菜单支持禁用状态。

```tsx
// 禁用菜单项
<Menu
  mode="vertical"
  items={[
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品中心', disabled: true },
    { key: 'about', label: '关于我们' }
  ]}
  onClick={(key) => console.log(key)}
/>
```

## API

### Menu Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | array | [] | 菜单项数据 |
| mode | 'vertical' \| 'horizontal' \| 'inline' | 'vertical' | 菜单模式 |
| theme | 'light' \| 'dark' | 'light' | 菜单主题 |
| selectedKeys | string[] | - | 当前选中菜单项 |
| defaultSelectedKeys | string[] | - | 默认选中菜单项 |
| openKeys | string[] | - | 当前展开子菜单 |
| defaultOpenKeys | string[] | - | 默认展开子菜单 |
| collapsed | boolean | false | 是否折叠 |
| inlineCollapsed | boolean | false | 内联模式是否折叠 |
| inlineIndent | number | 24 | 内联缩进 |
| subMenuCloseDelay | number | 0.1 | 子菜单关闭延迟 |
| subMenuOpenDelay | number | 0 | 子菜单打开延迟 |
| forceSubMenuRender | boolean | false | 强制渲染子菜单 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | ({ key: string, keyPath: string[], item: object, domEvent: Event }) => void | 点击事件 |
| onOpenChange | (openKeys: string[]) => void | 展开状态变化事件 |
| onSelect | ({ key: string, keyPath: string[], selectedKeys: string[], domEvent: Event }) => void | 选择事件 |
| onDeselect | ({ key: string, keyPath: string[], selectedKeys: string[], domEvent: Event }) => void | 取消选择事件 |

### MenuItem 类型

| 属性名 | 类型 | 说明 |
|--------|------|------|
| key | string | 菜单项唯一标识 |
| label | string \| ReactNode | 菜单项标签 |
| icon | ReactNode | 菜单项图标 |
| disabled | boolean | 是否禁用 |
| children | MenuItem[] | 子菜单项 |
| type | 'item' \| 'group' \| 'divider' | 菜单项类型 |
| className | string | 自定义样式类名 |
| style | React.CSSProperties | 自定义样式 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getSelectedKeys | - | string[] | 获取选中菜单项 |
| setSelectedKeys | (keys: string[]) => void | void | 设置选中菜单项 |
| getOpenKeys | - | string[] | 获取展开子菜单 |
| setOpenKeys | (keys: string[]) => void | void | 设置展开子菜单 |
| collapse | (collapsed: boolean) => void | void | 折叠/展开菜单 |
| focus | - | void | 聚焦菜单 |
| blur | - | void | 失焦菜单 |

## 样式定制

### CSS 变量

```css
:root {
  --menu-bg-color: #ffffff;
  --menu-text-color: #111827;
  --menu-hover-bg-color: #f3f4f6;
  --menu-selected-bg-color: #dbeafe;
  --menu-selected-text-color: #1d4ed8;
  --menu-disabled-color: #9ca3af;
  --menu-border-color: #e5e7eb;
  --menu-submenu-bg-color: #ffffff;
  --menu-submenu-text-color: #111827;
  --menu-item-height: 40px;
  --menu-item-padding: 0 16px;
  --menu-item-font-size: 14px;
  --menu-icon-size: 16px;
  --menu-arrow-size: 12px;
  --menu-dark-bg-color: #001529;
  --menu-dark-text-color: #ffffff;
  --menu-dark-hover-bg-color: #1890ff;
  --menu-dark-selected-bg-color: #1890ff;
  --menu-dark-selected-text-color: #ffffff;
  --menu-dark-disabled-color: rgba(255, 255, 255, 0.45);
}
```

## 最佳实践

1. **层级清晰**：确保菜单层级结构清晰，不超过3层
2. **图标辅助**：使用图标增强菜单项的可识别性
3. **响应式设计**：在不同屏幕尺寸下使用合适的菜单模式
4. **性能优化**：对于大型菜单，考虑使用虚拟滚动或懒加载

## 注意事项

1. 菜单组件基于 Taro 的 `View` 和 `Text` 组件封装
2. 在移动端考虑使用侧边栏或底部导航栏
3. 确保菜单的导航路径与实际的路由结构一致
4. 避免在菜单中显示过多的层级，影响用户体验</think>