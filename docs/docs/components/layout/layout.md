# Layout 布局容器

Layout 组件是一个用于页面整体布局的容器组件，提供了 Header、Content、Footer 和 Sider 四个子组件，用于构建页面的整体结构。

## 基本用法

### 基础布局

```tsx
import { View, Text } from '@tarojs/components';
import { Layout, Header, Content, Footer } from '@taro-uno/components';

function BasicLayout() {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#165DFF', color: 'white', padding: '0 20px' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Header</Text>
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Text>Content</Text>
      </Content>
      <Footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Text>Footer</Text>
      </Footer>
    </Layout>
  );
}
```

### 带侧边栏的布局

```tsx
import { View, Text } from '@tarojs/components';
import { Layout, Header, Content, Footer, Sider } from '@taro-uno/components';

function LayoutWithSider() {
  return (
    <Layout hasSider>
      <Sider style={{ width: '200px', backgroundColor: '#fff', borderRight: '1px solid #e8e8e8' }}>
        <View style={{ padding: '20px' }}>
          <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Sider</Text>
        </View>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#165DFF', color: 'white', padding: '0 20px' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Header</Text>
        </Header>
        <Content style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Text>Content</Text>
        </Content>
        <Footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Text>Footer</Text>
        </Footer>
      </Layout>
    </Layout>
  );
}
```

## 受控模式

```tsx
import { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Layout, Header, Content, Footer, Sider } from '@taro-uno/components';

function ControlledLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(200);

  const handleCollapse = (newCollapsed) => {
    setCollapsed(newCollapsed);
    console.log('Sider 折叠状态变化:', newCollapsed);
  };

  return (
    <Layout hasSider>
      <Sider 
        width={siderWidth} 
        collapsed={collapsed} 
        collapsedWidth={80}
        onCollapse={handleCollapse}
        style={{ backgroundColor: '#fff', borderRight: '1px solid #e8e8e8' }}
      >
        <View style={{ padding: '20px' }}>
          <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Sider</Text>
          {!collapsed && (
            <View style={{ marginTop: '20px' }}>
              <Text>当前状态: {collapsed ? '已折叠' : '未折叠'}</Text>
            </View>
          )}
        </View>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#165DFF', color: 'white', padding: '0 20px' }}>
          <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Header</Text>
            <Button 
              type="primary" 
              onClick={() => setCollapsed(!collapsed)}
              size="mini"
            >
              {collapsed ? '展开' : '折叠'}侧边栏
            </Button>
          </View>
        </Header>
        <Content style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <View style={{ marginBottom: '20px' }}>
            <Text style={{ marginRight: '10px' }}>侧边栏宽度:</Text>
            <Button 
              type="primary" 
              onClick={() => setSiderWidth(siderWidth + 20)} 
              size="mini"
              style={{ marginRight: '10px' }}
            >
              增加宽度
            </Button>
            <Button 
              onClick={() => setSiderWidth(Math.max(80, siderWidth - 20))} 
              size="mini"
            >
              减少宽度
            </Button>
          </View>
          <View style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '4px' }}>
            <Text style={{ fontSize: '16px', marginBottom: '10px', display: 'block' }}>Content 区域</Text>
            <Text style={{ color: '#666' }}>
              这是一个带侧边栏的布局示例，你可以通过点击按钮来折叠/展开侧边栏，
              也可以调整侧边栏的宽度。
            </Text>
          </View>
        </Content>
        <Footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Text>Footer</Text>
        </Footer>
      </Layout>
    </Layout>
  );
}
```

## 属性说明

### Layout 属性

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |
| hasSider | `boolean` | `false` | 否 | 是否包含侧边栏 |

### Header 属性

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |

### Content 属性

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |

### Footer 属性

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |

### Sider 属性

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 自定义类名 |
| style | `React.CSSProperties` | - | 否 | 自定义样式 |
| children | `ReactNode` | - | 是 | 子元素 |
| width | `number \| string` | `200` | 否 | 侧边栏宽度 |
| collapsed | `boolean` | `false` | 否 | 是否折叠 |
| collapsedWidth | `number \| string` | `80` | 否 | 折叠后的宽度 |
| onCollapse | `(_collapsed: boolean) => void` | - | 否 | 折叠状态变化时触发 |

## 类型定义

```typescript
// Layout 组件属性
export interface LayoutProps extends ViewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  hasSider?: boolean;
}

// Header 组件属性
export interface LayoutHeaderProps extends ViewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Content 组件属性
export interface LayoutContentProps extends ViewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Footer 组件属性
export interface LayoutFooterProps extends ViewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Sider 组件属性
export interface LayoutSiderProps extends ViewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  width?: number | string;
  collapsed?: boolean;
  collapsedWidth?: number | string;
  onCollapse?: (_collapsed: boolean) => void;
}

// Layout 组件引用
export interface LayoutRef {
  getLayout: () => HTMLDivElement | null;
}

// Header 组件引用
export interface LayoutHeaderRef {
  getHeader: () => HTMLDivElement | null;
}

// Content 组件引用
export interface LayoutContentRef {
  getContent: () => HTMLDivElement | null;
}

// Footer 组件引用
export interface LayoutFooterRef {
  getFooter: () => HTMLDivElement | null;
}

// Sider 组件引用
export interface LayoutSiderRef {
  getSider: () => HTMLDivElement | null;
  toggleCollapse: () => void;
}
```

## 完整示例

```tsx
import { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Layout, Header, Content, Footer, Sider } from '@taro-uno/components';

function LayoutExample() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <View style={{ padding: '20px' }}>
      <Layout center>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Layout 布局组件示例</Text>
      </Layout>
      
      <Layout style={{ marginTop: '20px', height: '400px', border: '1px solid #e8e8e8', borderRadius: '4px' }}>
        <Sider 
          width={200} 
          collapsed={collapsed} 
          collapsedWidth={80}
          onCollapse={setCollapsed}
          style={{ backgroundColor: '#fff', borderRight: '1px solid #e8e8e8' }}
        >
          <View style={{ padding: '20px' }}>
            <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>侧边栏</Text>
            {!collapsed && (
              <View style={{ marginTop: '20px' }}>
                <Text style={{ display: 'block', marginBottom: '10px' }}>菜单 1</Text>
                <Text style={{ display: 'block', marginBottom: '10px' }}>菜单 2</Text>
                <Text style={{ display: 'block', marginBottom: '10px' }}>菜单 3</Text>
                <Text style={{ display: 'block', marginBottom: '10px' }}>菜单 4</Text>
              </View>
            )}
          </View>
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: '#165DFF', color: 'white', padding: '0 20px' }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
              <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>网站标题</Text>
              <Button 
                type="primary" 
                onClick={() => setCollapsed(!collapsed)}
                size="mini"
              >
                {collapsed ? '展开' : '折叠'}侧边栏
              </Button>
            </View>
          </Header>
          <Content style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <View style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '4px' }}>
              <Text style={{ fontSize: '16px', marginBottom: '10px', display: 'block' }}>Content 区域</Text>
              <Text style={{ color: '#666' }}>
                Layout 组件提供了 Header、Content、Footer 和 Sider 四个子组件，用于构建页面的整体结构。
                你可以根据需要组合使用这些组件，创建出各种不同的布局效果。
                {`\n`}
                示例中的侧边栏可以通过点击按钮进行折叠和展开，折叠状态变化时会触发 onCollapse 事件。
                你可以根据这个事件来处理一些业务逻辑，比如调整内容区域的宽度等。
              </Text>
            </View>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Text>Footer 区域 - © 2024 Taro-Uno 组件库</Text>
          </Footer>
        </Layout>
      </Layout>
    </View>
  );
}

export default LayoutExample;
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

1. **布局嵌套**：Layout 组件可以嵌套使用，但建议不要嵌套过深，以免影响性能和可维护性。
2. **侧边栏使用**：当使用 Sider 组件时，需要在父级 Layout 组件上设置 hasSider 属性，否则可能会导致布局异常。
3. **响应式设计**：在移动端使用时，建议合理调整各个区域的尺寸和布局，确保良好的用户体验。
4. **性能优化**：对于复杂的布局，建议使用 React.memo 或其他性能优化手段，减少不必要的渲染。
5. **样式冲突**：Layout 组件的各个子组件都有默认样式，使用时需要注意避免样式冲突。

## 相关组件

- [Affix](#/components/layout/affix) - 固定定位组件，用于将元素固定在页面某个位置
- [Container](#/components/layout/container) - 容器组件，用于页面整体结构
- [Grid](#/components/layout/grid) - 网格布局组件，用于创建响应式网格
- [Menu](#/components/navigation/menu) - 菜单组件，常用于页面侧边栏