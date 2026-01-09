# Avatar 组件

Avatar 组件用于显示用户头像，支持图片、文字和图标三种形式，提供多种尺寸和形状选择。

## 基本使用

### 图片头像

```tsx
<Avatar src="https://example.com/avatar.jpg" alt="用户头像" />
<Avatar src="https://example.com/avatar.jpg" shape="square" />
```

### 文字头像

```tsx
<Avatar>U</Avatar>
<Avatar shape="square">用户</Avatar>
<Avatar size="small">A</Avatar>
<Avatar size="large">B</Avatar>
```

### 图标头像

```tsx
<Avatar icon={<Icon name="user" />} />
<Avatar icon={<Icon name="user" />} shape="square" />
<Avatar icon={<Icon name="user" />} size="small" />
<Avatar icon={<Icon name="user" />} size="large" />
```

### 不同大小

```tsx
<Avatar size="small" src="https://example.com/avatar.jpg" />
<Avatar size="medium" src="https://example.com/avatar.jpg" />
<Avatar size="large" src="https://example.com/avatar.jpg" />
<Avatar size={64} src="https://example.com/avatar.jpg" />
<Avatar size={128} src="https://example.com/avatar.jpg" />
```

### 不同形状

```tsx
<Avatar shape="circle" src="https://example.com/avatar.jpg" />
<Avatar shape="square" src="https://example.com/avatar.jpg" />
```

### 可点击头像

```tsx
<Avatar 
  src="https://example.com/avatar.jpg" 
  onClick={() => console.log('点击了头像')} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| src | `string` | - | 头像图片地址 |
| alt | `string` | - | 图片无法显示时的替代文本 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 头像大小，可选值：`small`、`medium`、`large` 或数字 |
| shape | `'circle' \| 'square'` | `'circle'` | 头像形状，可选值：`circle`、`square` |
| icon | `ReactNode` | - | 头像图标 |
| children | `ReactNode` | - | 子节点（通常用于文字头像） |
| style | `CSSProperties` | - | 自定义样式 |
| className | `string` | - | 自定义类名 |
| onClick | `(_event: any) => void` | - | 点击事件处理函数 |

## 类型定义

```tsx
export interface AvatarProps {
  /** 头像图片地址 */
  src?: string;
  /** 图片无法显示时的替代文本 */
  alt?: string;
  /** 头像大小 */
  size?: 'small' | 'medium' | 'large' | number;
  /** 头像形状 */
  shape?: 'circle' | 'square';
  /** 头像图标 */
  icon?: React.ReactNode;
  /** 子节点（通常用于文字头像） */
  children?: React.ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: (_event: any) => void;
}

export interface AvatarRef {
  /** DOM 元素 */
  element: any;
  /** 获取头像尺寸 */
  getSize: () => number;
  /** 获取头像形状 */
  getShape: () => 'circle' | 'square';
  /** 检查是否有图片 */
  hasImage: () => boolean;
  /** 检查是否有图标 */
  hasIcon: () => boolean;
  /** 检查是否有文字 */
  hasText: () => boolean;
}

export type AvatarSize = 'small' | 'medium' | 'large' | number;
export type AvatarShape = 'circle' | 'square';
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onClick | 点击头像时触发 | `_event: any` |

## 示例代码

### 完整示例

```tsx
import { Avatar, Icon } from 'taro-uno-ui';

const AvatarExample = () => {
  return (
    <View style={{ padding: '20px' }}>
      <View>图片头像</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Avatar src="https://example.com/avatar.jpg" alt="用户头像" />
        <Avatar src="https://example.com/avatar.jpg" shape="square" />
        <Avatar src="https://example.com/avatar.jpg" size="small" />
        <Avatar src="https://example.com/avatar.jpg" size="large" />
      </View>
      
      <View>文字头像</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Avatar>U</Avatar>
        <Avatar shape="square">用户</Avatar>
        <Avatar size="small">A</Avatar>
        <Avatar size="large">B</Avatar>
      </View>
      
      <View>图标头像</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Avatar icon={<Icon name="user" />} />
        <Avatar icon={<Icon name="user" />} shape="square" />
        <Avatar icon={<Icon name="user" />} size="small" />
        <Avatar icon={<Icon name="user" />} size="large" />
      </View>
      
      <h3>不同大小</h3>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Avatar size="small" src="https://example.com/avatar.jpg" />
        <Avatar size="medium" src="https://example.com/avatar.jpg" />
        <Avatar size="large" src="https://example.com/avatar.jpg" />
        <Avatar size={64} src="https://example.com/avatar.jpg" />
        <Avatar size={128} src="https://example.com/avatar.jpg" />
      </View>
      
      <View>可点击头像</View>
      <View style={{ display: 'flex', gap: '16px' }}>
        <Avatar 
          src="https://example.com/avatar.jpg" 
          onClick={() => alert('点击了头像')} 
        />
        <Avatar 
          shape="square" 
          icon={<Icon name="user" />} 
          onClick={() => alert('点击了图标头像')} 
        />
      </View>
    </View>
  );
};

export default AvatarExample;
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

1. **图片加载失败处理**：当图片加载失败时，会显示替代文本的首字母。
2. **文字头像建议**：文字头像建议最多显示2个字符，超过2个字符可能会导致显示不完整。
3. **图标头像建议**：图标头像建议使用内置图标或尺寸合适的自定义图标，以确保显示效果。
4. **性能优化**：对于大量头像列表，建议使用合适的图片尺寸和格式，以提高加载性能。
5. **无障碍访问**：为头像添加适当的 `alt` 属性，提高可访问性。

## 相关组件

- [Icon 组件](#/components/basic/icon) - 用于图标头像
- [Button 组件](#/components/basic/button) - 可与头像结合使用
- [List 组件](#/components/display/list) - 用于显示头像列表