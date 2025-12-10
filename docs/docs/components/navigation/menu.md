# Menu 导航菜单

Menu 组件是一个功能丰富的导航菜单组件，支持垂直、水平和内联三种模式，提供多种主题和交互方式，适用于各种导航场景。

## 基本用法

### 垂直菜单

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function VerticalMenu() {
  const menuItems = [
    { key: '1', label: '菜单项 1' },
    { key: '2', label: '菜单项 2' },
    { key: '3', label: '菜单项 3' },
    { key: '4', label: '菜单项 4' },
  ];

  return (
    <View style={{ width: '200px' }}>
      <Menu items={menuItems} mode="vertical" />
    </View>
  );
}
```

### 水平菜单

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function HorizontalMenu() {
  const menuItems = [
    { key: '1', label: '菜单项 1' },
    { key: '2', label: '菜单项 2' },
    { key: '3', label: '菜单项 3' },
    { key: '4', label: '菜单项 4' },
  ];

  return (
    <View>
      <Menu items={menuItems} mode="horizontal" />
    </View>
  );
}
```

### 带图标的菜单

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function MenuWithIcons() {
  const menuItems = [
    { key: '1', label: '首页', icon: 'home' },
    { key: '2', label: '产品', icon: 'product' },
    { key: '3', label: '文档', icon: 'document' },
    { key: '4', label: '设置', icon: 'setting' },
  ];

  return (
    <View style={{ width: '200px' }}>
      <Menu items={menuItems} mode="vertical" />
    </View>
  );
}
```

### 嵌套菜单

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function NestedMenu() {
  const menuItems = [
    { 
      key: '1', 
      label: '菜单项 1',
      children: [
        { key: '1-1', label: '子菜单项 1-1' },
        { key: '1-2', label: '子菜单项 1-2' },
        { key: '1-3', label: '子菜单项 1-3' },
      ]
    },
    { 
      key: '2', 
      label: '菜单项 2',
      children: [
        { key: '2-1', label: '子菜单项 2-1' },
        { key: '2-2', label: '子菜单项 2-2' },
      ]
    },
    { key: '3', label: '菜单项 3' },
  ];

  return (
    <View style={{ width: '200px' }}>
      <Menu items={menuItems} mode="vertical" />
    </View>
  );
}
```

## 不同主题和尺寸

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function MenuThemes() {
  const menuItems = [
    { key: '1', label: '菜单项 1' },
    { key: '2', label: '菜单项 2' },
    { key: '3', label: '菜单项 3' },
  ];

  return (
    <View>
      <View style={{ width: '200px', marginBottom: '20px' }}>
        <Menu items={menuItems} mode="vertical" theme="light" size="small" />
      </View>
      <View style={{ width: '200px', marginBottom: '20px' }}>
        <Menu items={menuItems} mode="vertical" theme="light" size="medium" />
      </View>
      <View style={{ width: '200px', marginBottom: '20px' }}>
        <Menu items={menuItems} mode="vertical" theme="dark" size="large" />
      </View>
    </View>
  );
}
```

## 折叠菜单

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function CollapsibleMenu() {
  const menuItems = [
    { key: '1', label: '首页', icon: 'home' },
    { key: '2', label: '产品', icon: 'product' },
    { key: '3', label: '文档', icon: 'document' },
    { key: '4', label: '设置', icon: 'setting' },
  ];

  return (
    <View style={{ width: '200px' }}>
      <Menu items={menuItems} mode="vertical" collapsible />
    </View>
  );
}
```

## 手风琴模式

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function AccordionMenu() {
  const menuItems = [
    { 
      key: '1', 
      label: '菜单项 1',
      children: [
        { key: '1-1', label: '子菜单项 1-1' },
        { key: '1-2', label: '子菜单项 1-2' },
        { key: '1-3', label: '子菜单项 1-3' },
      ]
    },
    { 
      key: '2', 
      label: '菜单项 2',
      children: [
        { key: '2-1', label: '子菜单项 2-1' },
        { key: '2-2', label: '子菜单项 2-2' },
      ]
    },
    { 
      key: '3', 
      label: '菜单项 3',
      children: [
        { key: '3-1', label: '子菜单项 3-1' },
        { key: '3-2', label: '子菜单项 3-2' },
        { key: '3-3', label: '子菜单项 3-3' },
      ]
    },
  ];

  return (
    <View style={{ width: '200px' }}>
      <Menu items={menuItems} mode="vertical" accordion />
    </View>
  );
}
```

## 带徽章的菜单

```tsx
import { View } from '@tarojs/components';
import { Menu } from '@taro-uno/components';

function MenuWithBadge() {
  const menuItems = [
    { key: '1', label: '首页', badge: 5 },
    { key: '2', label: '消息', badge: 'new' },
    { key: '3', label: '通知', badge: 10 },
    { key: '4', label: '设置' },
  ];

  return (
    <View style={{ width: '200px' }}>
      <Menu items={menuItems} mode="vertical" />
    </View>
  );
}
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| items | `MenuItem[]` | - | 是 | 菜单项数据 |
| selectedKeys | `string[]` | - | 否 | 当前选中的菜单项 |
| defaultSelectedKeys | `string[]` | - | 否 | 默认选中的菜单项 |
| openKeys | `string[]` | - | 否 | 展开的子菜单 |
| defaultOpenKeys | `string[]` | - | 否 | 默认展开的子菜单 |
| mode | `MenuMode` | `vertical` | 否 | 菜单模式 |
| theme | `MenuTheme` | `light` | 否 | 菜单主题 |
| size | `MenuSize` | `medium` | 否 | 菜单尺寸 |
| trigger | `MenuTrigger` | `click` | 否 | 子菜单触发方式 |
| accordion | `boolean` | `false` | 否 | 是否只展开一个父级菜单 |
| inlineIndent | `number` | `24` | 否 | 是否内联缩进 |
| collapsible | `boolean` | `false` | 否 | 是否可折叠 |
| collapsed | `boolean` | `false` | 否 | 是否折叠 |
| expandIcon | `ReactNode \| ((_props: { isOpen: boolean; isSubMenu: boolean }) => ReactNode)` | - | 否 | 展开图标 |
| contextMenu | `boolean` | `false` | 否 | 是否显示右键菜单 |
| onClick | `(_key: string, item: MenuItem, event: ITouchEvent) => void` | - | 否 | 菜单项点击事件 |
| onSelect | `(_selectedKeys: string[], item: MenuItem \| null) => void` | - | 否 | 菜单项选中变化事件 |
| onOpenChange | `(_openKeys: string[]) => void` | - | 否 | 子菜单展开/收起事件 |
| onCollapse | `(_collapsed: boolean) => void` | - | 否 | 折叠状态变化事件 |
| onContextMenu | `(_key: string, item: MenuItem, event: ITouchEvent) => void` | - | 否 | 右键菜单事件 |
| itemRender | `(_item: MenuItem) => ReactNode` | - | 否 | 自定义渲染菜单项 |
| subMenuTitleRender | `(_item: MenuItem) => ReactNode` | - | 否 | 自定义渲染子菜单标题 |
| accessible | `boolean` | `true` | 否 | 无障碍支持 |
| accessibilityLabel | `string` | - | 否 | 无障碍标签 |
| accessibilityRole | `'navigation' \| 'menu' \| 'menubar'` | `navigation` | 否 | 无障碍角色 |
| accessibilityState | `object` | - | 否 | 无障碍状态 |

## 类型定义

```typescript
// 菜单项类型
export interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: MenuItem[];
  style?: React.CSSProperties;
  className?: string;
  path?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  danger?: boolean;
  isGroup?: boolean;
  tooltip?: string;
  extra?: ReactNode;
  badge?: number | string;
  selected?: boolean;
  expanded?: boolean;
}

// 菜单模式
export type MenuMode = 'vertical' | 'horizontal' | 'inline';

// 菜单主题
export type MenuTheme = 'light' | 'dark';

// 菜单尺寸
export type MenuSize = 'small' | 'medium' | 'large';

// 菜单组件属性
export interface MenuProps {
  className?: string;
  style?: React.CSSProperties;
  items: MenuItem[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: MenuMode;
  theme?: MenuTheme;
  size?: MenuSize;
  trigger?: MenuTrigger;
  accordion?: boolean;
  inlineIndent?: number;
  collapsible?: boolean;
  collapsed?: boolean;
  expandIcon?: ReactNode | ((_props: { isOpen: boolean; isSubMenu: boolean }) => ReactNode);
  contextMenu?: boolean;
  onClick?: (_key: string, item: MenuItem, event: ITouchEvent) => void;
  onSelect?: (_selectedKeys: string[], item: MenuItem | null) => void;
  onOpenChange?: (_openKeys: string[]) => void;
  onCollapse?: (_collapsed: boolean) => void;
  onContextMenu?: (_key: string, item: MenuItem, event: ITouchEvent) => void;
  itemRender?: (_item: MenuItem) => ReactNode;
  subMenuTitleRender?: (_item: MenuItem) => ReactNode;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'navigation' | 'menu' | 'menubar';
  accessibilityState?: object;
}

// 菜单组件引用
export interface MenuRef {
  element: any;
  getSelectedKeys: () => string[];
  setSelectedKeys: (_keys: string[]) => void;
  getOpenKeys: () => string[];
  setOpenKeys: (_keys: string[]) => void;
  setCollapsed: (_collapsed: boolean) => void;
  getItem: (_key: string) => MenuItem | null;
  addItem: (_item: MenuItem, parentKey?: string) => void;
  removeItem: (_key: string) => void;
  updateItem: (_key: string, newItem: Partial<MenuItem>) => void;
  expandAll: () => void;
  collapseAll: () => void;
  focus: () => void;
  blur: () => void;
}
```

## 完整示例

```tsx
import { View, Text } from '@tarojs/components';
import { Menu } from '@taro-uno/components';
import { useState } from 'react';

function MenuExample() {
  const [mode, setMode] = useState('vertical');
  const [theme, setTheme] = useState('light');
  const [size, setSize] = useState('medium');
  const [collapsible, setCollapsible] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const menuItems = [
    { 
      key: '1', 
      label: '首页',
      icon: 'home',
      badge: 5
    },
    { 
      key: '2', 
      label: '产品',
      icon: 'product',
      children: [
        { key: '2-1', label: '产品列表', badge: 'new' },
        { key: '2-2', label: '产品详情' },
        { key: '2-3', label: '产品分类' },
      ]
    },
    { 
      key: '3', 
      label: '文档',
      icon: 'document',
      children: [
        { key: '3-1', label: '快速开始' },
        { key: '3-2', label: 'API 参考' },
        { key: '3-3', label: '教程' },
        { key: '3-4', label: 'FAQ' },
      ]
    },
    { 
      key: '4', 
      label: '设置',
      icon: 'setting',
      children: [
        { key: '4-1', label: '账号设置' },
        { key: '4-2', label: '系统设置' },
        { key: '4-3', label: '主题设置' },
      ]
    },
    { 
      key: '5', 
      label: '关于我们',
      icon: 'about'
    },
  ];

  return (
    <View style={{ padding: '20px' }}>
      <Menu center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Menu 导航菜单组件示例</Text>
      </Menu>
      
      <View style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Text style={{ display: 'block', marginBottom: '10px' }}>菜单配置：</Text>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>模式：</Text>
          <Button type="primary" onClick={() => setMode('vertical')} size="mini" style={{ marginLeft: '10px' }}>垂直</Button>
          <Button type="primary" onClick={() => setMode('horizontal')} size="mini" style={{ marginLeft: '10px' }}>水平</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>主题：</Text>
          <Button type="primary" onClick={() => setTheme('light')} size="mini" style={{ marginLeft: '10px' }}>浅色</Button>
          <Button type="primary" onClick={() => setTheme('dark')} size="mini" style={{ marginLeft: '10px' }}>深色</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>尺寸：</Text>
          <Button type="primary" onClick={() => setSize('small')} size="mini" style={{ marginLeft: '10px' }}>小</Button>
          <Button type="primary" onClick={() => setSize('medium')} size="mini" style={{ marginLeft: '10px' }}>中</Button>
          <Button type="primary" onClick={() => setSize('large')} size="mini" style={{ marginLeft: '10px' }}>大</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>可折叠：</Text>
          <Button type="primary" onClick={() => setCollapsible(!collapsible)} size="mini" style={{ marginLeft: '10px' }}>
            {collapsible ? '关闭' : '开启'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>手风琴模式：</Text>
          <Button type="primary" onClick={() => setAccordion(!accordion)} size="mini" style={{ marginLeft: '10px' }}>
            {accordion ? '关闭' : '开启'}
          </Button>
        </View>
      </View>
      
      <View style={{ width: mode === 'vertical' ? '200px' : '100%', marginBottom: '20px' }}>
        <Menu 
          items={menuItems} 
          mode={mode} 
          theme={theme} 
          size={size}
          collapsible={collapsible}
          accordion={accordion}
          selectedKeys={selectedKeys}
          onSelect={setSelectedKeys}
        />
      </View>
      
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Text style={{ fontSize: '14px', color: '#666' }}>
          当前配置：{`\n`}
          - 模式：{mode}{`\n`}
          - 主题：{theme}{`\n`}
          - 尺寸：{size}{`\n`}
          - 可折叠：{collapsible ? '开启' : '关闭'}{`\n`}
          - 手风琴模式：{accordion ? '开启' : '关闭'}{`\n`}
          - 选中项：{selectedKeys.join(', ')}
        </Text>
      </View>
    </View>
  );
}

export default MenuExample;
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

1. **模式选择**：根据实际需求选择合适的菜单模式，垂直模式适合侧边栏导航，水平模式适合顶部导航。
2. **性能优化**：对于大量菜单项，建议使用虚拟滚动或分页加载，以提高性能。
3. **无障碍支持**：组件内置了无障碍支持，建议保持默认设置，以提高可访问性。
4. **自定义渲染**：可以通过 itemRender 和 subMenuTitleRender 属性自定义菜单项和子菜单标题的渲染。
5. **折叠功能**：collapsible 属性仅在垂直模式下有效。
6. **手风琴模式**：accordion 属性仅在垂直模式下有效，用于控制是否只展开一个子菜单。
7. **事件处理**：可以通过各种事件回调函数处理菜单的交互，如点击、选中、展开等。
8. **主题切换**：支持浅色和深色两种主题，可以根据系统主题或用户偏好进行切换。

## 相关组件

- [NavBar](#/components/navigation/nav-bar) - 导航栏，常用于页面顶部
- [Tabs](#/components/navigation/tabs) - 标签页，用于切换不同内容
- [Pagination](#/components/navigation/pagination) - 分页，用于分页导航
- [Steps](#/components/navigation/steps) - 步骤条，用于流程导航