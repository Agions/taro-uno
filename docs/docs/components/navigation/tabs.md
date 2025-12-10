# Tabs 标签页

Tabs 组件是一个用于切换不同内容区域的标签页组件，支持多种类型、位置和尺寸，提供丰富的交互功能。

## 基本用法

### 基础标签页

```tsx
import { View } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';

function BasicTabs() {
  const tabItems = [
    { key: '1', title: '标签页 1', content: <View>标签页 1 内容</View> },
    { key: '2', title: '标签页 2', content: <View>标签页 2 内容</View> },
    { key: '3', title: '标签页 3', content: <View>标签页 3 内容</View> },
  ];

  return <Tabs items={tabItems} />;
}
```

### 不同类型的标签页

```tsx
import { View } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';

function TabsTypes() {
  const tabItems = [
    { key: '1', title: '标签页 1', content: <View>标签页 1 内容</View> },
    { key: '2', title: '标签页 2', content: <View>标签页 2 内容</View> },
    { key: '3', title: '标签页 3', content: <View>标签页 3 内容</View> },
  ];

  return (
    <View>
      <View style={{ marginBottom: '20px' }}>
        <Text>Line 类型</Text>
        <Tabs items={tabItems} type="line" />
      </View>
      <View style={{ marginBottom: '20px' }}>
        <Text>Card 类型</Text>
        <Tabs items={tabItems} type="card" />
      </View>
      <View>
        <Text>Segment 类型</Text>
        <Tabs items={tabItems} type="segment" />
      </View>
    </View>
  );
}
```

### 不同位置的标签页

```tsx
import { View } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';

function TabsPositions() {
  const tabItems = [
    { key: '1', title: '标签页 1', content: <View>标签页 1 内容</View> },
    { key: '2', title: '标签页 2', content: <View>标签页 2 内容</View> },
    { key: '3', title: '标签页 3', content: <View>标签页 3 内容</View> },
  ];

  return (
    <View>
      <View style={{ marginBottom: '20px' }}>
        <Text>顶部标签</Text>
        <Tabs items={tabItems} position="top" />
      </View>
      <View style={{ marginBottom: '20px' }}>
        <Text>底部标签</Text>
        <Tabs items={tabItems} position="bottom" />
      </View>
      <View style={{ display: 'flex', height: '300px' }}>
        <View style={{ marginRight: '20px', width: '100px' }}>
          <Text>左侧标签</Text>
        </View>
        <Tabs items={tabItems} position="left" style={{ flex: 1 }} />
      </View>
      <View style={{ display: 'flex', height: '300px', marginTop: '20px' }}>
        <Tabs items={tabItems} position="right" style={{ flex: 1 }} />
        <View style={{ marginLeft: '20px', width: '100px' }}>
          <Text>右侧标签</Text>
        </View>
      </View>
    </View>
  );
}
```

### 带图标的标签页

```tsx
import { View } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';

function TabsWithIcons() {
  const tabItems = [
    { key: '1', title: '首页', icon: 'home', content: <View>首页内容</View> },
    { key: '2', title: '产品', icon: 'product', content: <View>产品内容</View> },
    { key: '3', title: '文档', icon: 'document', content: <View>文档内容</View> },
    { key: '4', title: '设置', icon: 'setting', content: <View>设置内容</View> },
  ];

  return <Tabs items={tabItems} />;
}
```

### 带徽章的标签页

```tsx
import { View } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';

function TabsWithBadge() {
  const tabItems = [
    { key: '1', title: '首页', badge: 5, content: <View>首页内容</View> },
    { key: '2', title: '消息', badge: 'new', content: <View>消息内容</View> },
    { key: '3', title: '通知', badge: 10, content: <View>通知内容</View> },
    { key: '4', title: '设置', content: <View>设置内容</View> },
  ];

  return <Tabs items={tabItems} />;
}
```

### 可编辑的标签页

```tsx
import { View } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';
import { useState } from 'react';

function EditableTabs() {
  const [tabItems, setTabItems] = useState([
    { key: '1', title: '标签页 1', content: <View>标签页 1 内容</View> },
    { key: '2', title: '标签页 2', content: <View>标签页 2 内容</View> },
    { key: '3', title: '标签页 3', content: <View>标签页 3 内容</View> },
  ]);

  const handleAdd = () => {
    const newKey = `${tabItems.length + 1}`;
    const newTab = { 
      key: newKey, 
      title: `新标签 ${newKey}`, 
      content: <View>新标签内容</View> 
    };
    setTabItems([...tabItems, newTab]);
  };

  const handleRemove = (key) => {
    setTabItems(tabItems.filter(item => item.key !== key));
  };

  return (
    <Tabs 
      items={tabItems} 
      editable 
      addable 
      onAdd={handleAdd} 
      onRemove={handleRemove} 
    />
  );
}
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| items | `TabItem[]` | - | 是 | Tab项列表 |
| activeKey | `string` | - | 否 | 激活的键值 |
| defaultActiveKey | `string` | - | 否 | 默认激活的键值 |
| position | `TabPosition` | `top` | 否 | Tab位置 |
| type | `TabType` | `line` | 否 | Tab类型 |
| size | `TabSize` | `default` | 否 | Tab尺寸 |
| editable | `boolean` | `false` | 否 | 是否可编辑 |
| addable | `boolean` | `false` | 否 | 是否可添加 |
| animated | `boolean` | `true` | 否 | 是否动画效果 |
| centered | `boolean` | `false` | 否 | 是否居中显示 |
| forceRender | `boolean` | `false` | 否 | 是否强制渲染 |
| destroyInactiveTabPane | `boolean` | `false` | 否 | 是否销毁隐藏的Tab |
| onTabClick | `(_key: string, event: React.MouseEvent) => void` | - | 否 | 点击Tab事件 |
| onChange | `(_key: string) => void` | - | 否 | 切换Tab事件 |
| onAdd | `() => void` | - | 否 | 添加Tab事件 |
| onRemove | `(_key: string) => void` | - | 否 | 删除Tab事件 |
| onEdit | `(_key: string, action: 'add' \| 'remove') => void` | - | 否 | 编辑Tab事件 |
| renderTabBar | `(_props: TabsProps) => ReactNode` | - | 否 | 自定义Tab渲染 |
| renderTab | `(_item: TabItem, index: number) => ReactNode` | - | 否 | 自定义Tab项渲染 |
| renderContent | `(_item: TabItem, index: number) => ReactNode` | - | 否 | 自定义内容渲染 |

## 类型定义

```typescript
// Tab位置
export type TabPosition = 'top' | 'right' | 'bottom' | 'left';

// Tab类型
export type TabType = 'line' | 'card' | 'segment';

// Tab尺寸
export type TabSize = Size | 'small' | 'medium' | 'large';

// Tab项接口
export interface TabItem {
  key: string;
  title: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

// Tabs组件属性
export interface TabsProps extends StandardBaseComponentProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  position?: TabPosition;
  type?: TabType;
  size?: TabSize;
  editable?: boolean;
  addable?: boolean;
  animated?: boolean;
  centered?: boolean;
  forceRender?: boolean;
  destroyInactiveTabPane?: boolean;
  onTabClick?: (_key: string, event: React.MouseEvent) => void;
  onChange?: (_key: string) => void;
  onAdd?: () => void;
  onRemove?: (_key: string) => void;
  onEdit?: (_key: string, action: 'add' | 'remove') => void;
  renderTabBar?: (_props: TabsProps) => ReactNode;
  renderTab?: (_item: TabItem, index: number) => ReactNode;
  renderContent?: (_item: TabItem, index: number) => ReactNode;
}

// Tabs组件引用
export interface TabsRef {
  element: any | null;
  getActiveKey: () => string;
  getItems: () => TabItem[];
  setActiveKey: (_key: string) => void;
  addItem: (_item: TabItem, index?: number) => void;
  removeItem: (_key: string) => void;
  updateItem: (_key: string, newItem: Partial<TabItem>) => void;
  scrollToTab: (_key: string) => void;
}

// TabPane组件属性
export interface TabPaneProps extends StandardBaseComponentProps {
  tabKey: string;
  tab: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  forceRender?: boolean;
}
```

## 完整示例

```tsx
import { View, Text, Button } from '@tarojs/components';
import { Tabs } from '@taro-uno/components';
import { useState } from 'react';

function TabsExample() {
  const [tabItems, setTabItems] = useState([
    { key: '1', title: '首页', icon: 'home', badge: 5, content: <View style={{ padding: '20px' }}>首页内容</View> },
    { key: '2', title: '产品', icon: 'product', content: <View style={{ padding: '20px' }}>产品内容</View> },
    { key: '3', title: '文档', icon: 'document', content: <View style={{ padding: '20px' }}>文档内容</View> },
    { key: '4', title: '设置', icon: 'setting', content: <View style={{ padding: '20px' }}>设置内容</View> },
  ]);
  const [type, setType] = useState('line');
  const [position, setPosition] = useState('top');
  const [size, setSize] = useState('medium');
  const [editable, setEditable] = useState(false);
  const [addable, setAddable] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [centered, setCentered] = useState(false);
  const [activeKey, setActiveKey] = useState('1');

  const handleAdd = () => {
    const newKey = `${tabItems.length + 1}`;
    const newTab = { 
      key: newKey, 
      title: `新标签 ${newKey}`, 
      content: <View style={{ padding: '20px' }}>新标签内容</View> 
    };
    setTabItems([...tabItems, newTab]);
    setActiveKey(newKey);
  };

  const handleRemove = (key) => {
    setTabItems(tabItems.filter(item => item.key !== key));
    if (activeKey === key && tabItems.length > 1) {
      setActiveKey(tabItems[0].key);
    }
  };

  return (
    <View style={{ padding: '20px' }}>
      <Tabs center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Tabs 标签页组件示例</Text>
      </Tabs>
      
      <View style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Text style={{ display: 'block', marginBottom: '10px' }}>Tabs 配置：</Text>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>类型：</Text>
          <Button type="primary" onClick={() => setType('line')} size="mini" style={{ marginLeft: '10px' }}>Line</Button>
          <Button type="primary" onClick={() => setType('card')} size="mini" style={{ marginLeft: '10px' }}>Card</Button>
          <Button type="primary" onClick={() => setType('segment')} size="mini" style={{ marginLeft: '10px' }}>Segment</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>位置：</Text>
          <Button type="primary" onClick={() => setPosition('top')} size="mini" style={{ marginLeft: '10px' }}>顶部</Button>
          <Button type="primary" onClick={() => setPosition('bottom')} size="mini" style={{ marginLeft: '10px' }}>底部</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>尺寸：</Text>
          <Button type="primary" onClick={() => setSize('small')} size="mini" style={{ marginLeft: '10px' }}>小</Button>
          <Button type="primary" onClick={() => setSize('medium')} size="mini" style={{ marginLeft: '10px' }}>中</Button>
          <Button type="primary" onClick={() => setSize('large')} size="mini" style={{ marginLeft: '10px' }}>大</Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>可编辑：</Text>
          <Button type="primary" onClick={() => setEditable(!editable)} size="mini" style={{ marginLeft: '10px' }}>
            {editable ? '关闭' : '开启'}
          </Button>
          <Button type="primary" onClick={() => setAddable(!addable)} size="mini" style={{ marginLeft: '10px' }}>
            {addable ? '关闭添加' : '开启添加'}
          </Button>
        </View>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>动画效果：</Text>
          <Button type="primary" onClick={() => setAnimated(!animated)} size="mini" style={{ marginLeft: '10px' }}>
            {animated ? '关闭' : '开启'}
          </Button>
          <Text>居中显示：</Text>
          <Button type="primary" onClick={() => setCentered(!centered)} size="mini" style={{ marginLeft: '10px' }}>
            {centered ? '关闭' : '开启'}
          </Button>
        </View>
      </View>
      
      <Tabs 
        items={tabItems} 
        type={type} 
        position={position} 
        size={size}
        editable={editable}
        addable={addable}
        animated={animated}
        centered={centered}
        activeKey={activeKey}
        onChange={setActiveKey}
        onAdd={handleAdd}
        onRemove={handleRemove}
        style={{ marginBottom: '20px' }}
      />
      
      <View style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Text style={{ fontSize: '14px', color: '#666' }}>
          当前配置：{`\n`}
          - 类型：{type}{`\n`}
          - 位置：{position}{`\n`}
          - 尺寸：{size}{`\n`}
          - 可编辑：{editable ? '开启' : '关闭'}{`\n`}
          - 可添加：{addable ? '开启' : '关闭'}{`\n`}
          - 动画效果：{animated ? '开启' : '关闭'}{`\n`}
          - 居中显示：{centered ? '开启' : '关闭'}{`\n`}
          - 当前激活：{activeKey}
        </Text>
      </View>
    </View>
  );
}

export default TabsExample;
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

1. **类型选择**：根据实际需求选择合适的标签类型，line类型适合常规场景，card类型适合内容切换，segment类型适合紧凑布局。
2. **位置设置**：根据页面布局选择合适的标签位置，顶部和底部位置适合移动端，左侧和右侧位置适合桌面端。
3. **性能优化**：对于大量标签页，建议开启destroyInactiveTabPane属性，销毁不活跃的标签内容，以提高性能。
4. **自定义渲染**：可以通过renderTabBar、renderTab和renderContent属性自定义标签栏、标签项和内容的渲染。
5. **可编辑功能**：当editable属性为true时，可以通过onEdit事件处理标签的添加和删除。
6. **动画效果**：animated属性控制标签切换时的动画效果，关闭动画可以提高性能。
7. **居中显示**：centered属性控制标签是否居中显示，适合标签数量较少的场景。

## 相关组件

- [Menu](#/components/navigation/menu) - 导航菜单，用于页面导航
- [NavBar](#/components/navigation/nav-bar) - 导航栏，用于页面顶部导航
- [Pagination](#/components/navigation/pagination) - 分页，用于分页导航
- [Steps](#/components/navigation/steps) - 步骤条，用于流程导航