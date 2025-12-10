# Modal 组件

Modal 组件是一个模态对话框组件，用于在页面上显示重要信息、确认操作、表单输入等场景，支持多种样式、位置、动画等功能。

## 基本使用

### 基础模态框

```tsx
<Modal visible>
  <View style={{ padding: '20px' }}>
    <Text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'block' }}>模态框标题</Text>
    <Text>这是模态框的内容，用于显示重要信息或确认操作。</Text>
  </View>
</Modal>
```

### 确认对话框

```tsx
<Modal
  visible
  title="确认操作"
  content="您确定要执行此操作吗？"
  confirmText="确定"
  cancelText="取消"
  onConfirm={() => console.log('确认操作')}
  onCancel={() => console.log('取消操作')}
/>
```

### 自定义底部按钮

```tsx
<Modal
  visible
  title="自定义按钮"
  content="这是一个自定义底部按钮的模态框"
  footer={[
    <Button key="secondary" type="default" onClick={() => console.log('次要按钮')}>次要按钮</Button>,
    <Button key="primary" type="primary" onClick={() => console.log('主要按钮')}>主要按钮</Button>
  ]}
>
  <View style={{ padding: '20px' }}>
    <Text>这是模态框的自定义内容区域。</Text>
  </View>
</Modal>
```

### 不同位置

```tsx
<Modal visible position="center" title="居中模态框" />
<Modal visible position="top" title="顶部模态框" />
<Modal visible position="bottom" title="底部模态框" />
<Modal visible position="left" title="左侧模态框" />
<Modal visible position="right" title="右侧模态框" />
```

### 不同动画

```tsx
<Modal visible animation="fade" title="淡入淡出动画" />
<Modal visible animation="slide" title="滑动动画" />
<Modal visible animation="zoom" title="缩放动画" />
<Modal visible animation="none" title="无动画" />
```

### 全屏模态框

```tsx
<Modal visible fullScreen title="全屏模态框" />
```

### 带遮罩

```tsx
<Modal
  visible
  title="带遮罩模态框"
  mask
  maskClosable
  onClose={() => console.log('模态框已关闭')}
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示模态框 |
| title | `React.ReactNode` | - | 模态框标题 |
| content | `React.ReactNode` | - | 模态框内容 |
| footer | `React.ReactNode` | - | 模态框底部按钮区域 |
| confirmText | `string` | `"确定"` | 确认按钮文本 |
| cancelText | `string` | `"取消"` | 取消按钮文本 |
| confirmType | `string` | `"primary"` | 确认按钮类型 |
| cancelType | `string` | `"default"` | 取消按钮类型 |
| onConfirm | `() => void` | - | 确认按钮点击回调 |
| onCancel | `() => void` | - | 取消按钮点击回调 |
| onClose | `() => void` | - | 模态框关闭回调 |
| onOpen | `() => void` | - | 模态框打开回调 |
| position | `string` | `"center"` | 模态框位置，可选值：`center`、`top`、`bottom`、`left`、`right` |
| animation | `string` | `"fade"` | 模态框动画，可选值：`fade`、`slide`、`zoom`、`none` |
| mask | `boolean` | `true` | 是否显示遮罩 |
| maskClosable | `boolean` | `false` | 点击遮罩是否可关闭 |
| maskStyle | `React.CSSProperties` | - | 遮罩样式 |
| maskClassName | `string` | - | 遮罩类名 |
| style | `React.CSSProperties` | - | 模态框样式 |
| className | `string` | - | 模态框类名 |
| bodyStyle | `React.CSSProperties` | - | 模态框内容区域样式 |
| bodyClassName | `string` | - | 模态框内容区域类名 |
| headerStyle | `React.CSSProperties` | - | 模态框标题区域样式 |
| headerClassName | `string` | - | 模态框标题区域类名 |
| footerStyle | `React.CSSProperties` | - | 模态框底部区域样式 |
| footerClassName | `string` | - | 模态框底部区域类名 |
| fullScreen | `boolean` | `false` | 是否全屏显示 |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| closeIcon | `React.ReactNode` | - | 自定义关闭图标 |
| zIndex | `number` | `1000` | 层级 |
| destroyOnClose | `boolean` | `false` | 关闭时是否销毁组件 |
| preventScrollThrough | `boolean` | `true` | 是否阻止滚动穿透 |

## 类型定义

```tsx
// Modal 组件属性接口
export interface ModalProps {
  visible?: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmType?: string;
  cancelType?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: React.CSSProperties;
  maskClassName?: string;
  style?: React.CSSProperties;
  className?: string;
  bodyStyle?: React.CSSProperties;
  bodyClassName?: string;
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  footerStyle?: React.CSSProperties;
  footerClassName?: string;
  fullScreen?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  zIndex?: number;
  destroyOnClose?: boolean;
  preventScrollThrough?: boolean;
}
```

## 示例代码

### 完整示例

```tsx
import { Modal, Button, Space, View, Text, Input } from 'taro-uno-ui';
import { useState } from 'react';

const ModalExample = () => {
  // 模态框状态
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [positionVisible, setPositionVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [fullScreenVisible, setFullScreenVisible] = useState(false);

  // 表单状态
  const [inputValue, setInputValue] = useState('');

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础模态框</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => setVisible(true)}>打开模态框</Button>
      </Space>

      <Modal
        visible={visible}
        title="基础模态框"
        closable
        onClose={() => setVisible(false)}
      >
        <View style={{ padding: '20px' }}>
          <Text>这是模态框的内容区域，可以放置任何 React 元素。</Text>
          <Input
            style={{ marginTop: '16px' }}
            placeholder="请输入内容"
            value={inputValue}
            onChange={(e) => setInputValue(e.detail.value)}
          />
        </View>
      </Modal>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>确认对话框</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="warning" onClick={() => setConfirmVisible(true)}>打开确认对话框</Button>
      </Space>

      <Modal
        visible={confirmVisible}
        title="确认操作"
        content="您确定要删除这条数据吗？此操作不可恢复。"
        confirmText="确定删除"
        cancelText="取消"
        confirmType="danger"
        onConfirm={() => {
          console.log('确认删除');
          setConfirmVisible(false);
        }}
        onCancel={() => setConfirmVisible(false)}
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义底部按钮</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="default" onClick={() => setCustomVisible(true)}>打开自定义模态框</Button>
      </Space>

      <Modal
        visible={customVisible}
        title="自定义底部按钮"
        closable
        onClose={() => setCustomVisible(false)}
        footer={[
          <Button key="secondary" type="default" onClick={() => {
            console.log('次要按钮');
            setCustomVisible(false);
          }}>次要按钮</Button>,
          <Button key="primary" type="primary" onClick={() => {
            console.log('主要按钮');
            setCustomVisible(false);
          }}>主要按钮</Button>,
          <Button key="danger" type="danger" onClick={() => {
            console.log('危险按钮');
            setCustomVisible(false);
          }}>危险按钮</Button>
        ]}
      >
        <View style={{ padding: '20px' }}>
          <Text>这是一个自定义底部按钮的模态框，可以根据需要添加多个按钮。</Text>
        </View>
      </Modal>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同位置</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setPositionVisible(true);
        }}>顶部模态框</Button>
      </Space>

      <Modal
        visible={positionVisible}
        title="顶部模态框"
        position="top"
        maskClosable
        onClose={() => setPositionVisible(false)}
      >
        <View style={{ padding: '20px' }}>
          <Text>这是一个顶部弹出的模态框，常用于选择器等场景。</Text>
        </View>
      </Modal>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同动画</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => setAnimationVisible(true)}>缩放动画</Button>
      </Space>

      <Modal
        visible={animationVisible}
        title="缩放动画"
        animation="zoom"
        maskClosable
        onClose={() => setAnimationVisible(false)}
      >
        <View style={{ padding: '20px' }}>
          <Text>这是一个带缩放动画的模态框，动画效果流畅自然。</Text>
        </View>
      </Modal>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>全屏模态框</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => setFullScreenVisible(true)}>打开全屏模态框</Button>
      </Space>

      <Modal
        visible={fullScreenVisible}
        title="全屏模态框"
        fullScreen
        closable
        onClose={() => setFullScreenVisible(false)}
      >
        <View style={{ padding: '20px' }}>
          <Text>这是一个全屏模态框，常用于复杂表单、编辑页面等场景。</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ModalExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分样式可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分样式可能存在差异 |

## 注意事项

1. **模态框类型**：支持基础模态框、确认对话框、自定义模态框等多种类型，适应不同的使用场景。
2. **位置配置**：支持居中、顶部、底部、左侧、右侧五种位置，适应不同的设计需求。
3. **动画效果**：支持淡入淡出、滑动、缩放、无动画四种动画效果，可根据需求选择。
4. **遮罩配置**：可通过 mask 属性控制是否显示遮罩，maskClosable 属性控制点击遮罩是否关闭。
5. **全屏模式**：设置 fullScreen 为 true 时，模态框会全屏显示，常用于复杂表单等场景。
6. **关闭方式**：支持点击关闭按钮、点击遮罩、调用 onClose 方法三种关闭方式。
7. **滚动穿透**：默认阻止滚动穿透，确保模态框显示时背景不可滚动。
8. **性能优化**：模态框组件使用了 memo 和 lazy loading 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与模态框组件结合使用
- [Message 组件](#/components/feedback/message) - 用于操作结果提示
- [Loading 组件](#/components/feedback/loading) - 可在模态框中显示加载状态
- [Input 组件](#/components/form/input) - 可在模态框中使用表单控件
