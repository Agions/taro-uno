# Badge 组件

Badge 组件用于显示未读消息数量、状态提示等，支持数字显示、小红点显示、溢出处理等功能。

## 基本使用

### 数字徽标

```tsx
<Badge count={5}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={10}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={100}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
```

### 小红点徽标

```tsx
<Badge dot>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge dot>
  <Icon name="bell" size="24" />
</Badge>
<Badge dot>
  <Button type="primary">按钮</Button>
</Badge>
```

### 显示零值

```tsx
<Badge count={0} showZero>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={0}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
```

### 溢出处理

```tsx
<Badge count={99}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={100}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={1000} overflowCount={999}>
  <View style={{ width: 40, height: 40, View: '#f5f5f5', borderRadius: 4 }} />
</Badge>
```

### 自定义封顶值

```tsx
<Badge count={50} overflowCount={49}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={100} overflowCount={50}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
<Badge count={200} overflowCount={100}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
</Badge>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| count | `number` | - | 显示的数字 |
| dot | `boolean` | `false` | 是否显示为小红点 |
| overflowCount | `number` | `99` | 封顶的数字值 |
| showZero | `boolean` | `false` | 当数字为 0 时是否显示 |
| children | `ReactNode` | - | 子节点 |
| style | `CSSProperties` | - | 自定义样式 |
| className | `string` | - | 自定义类名 |

## 类型定义

```tsx
export interface BadgeProps {
  /** 显示的数字 */
  count?: number;
  /** 是否显示为小红点 */
  dot?: boolean;
  /** 封顶的数字值 */
  overflowCount?: number;
  /** 当数字为 0 时是否显示 */
  showZero?: boolean;
  /** 子节点 */
  children?: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface BadgeRef {
  /** DOM 元素 */
  element: any;
  /** 获取当前计数 */
  getCount: () => number | undefined;
  /** 检查是否为点状 */
  isDot: () => boolean;
  /** 检查是否显示 */
  isVisible: () => boolean;
}
```

## 示例代码

### 完整示例

```tsx
import { Badge, Icon, Button } from 'taro-uno-ui';

const BadgeExample = () => {
  return (
    <View style={{ padding: '20px' }}>
      <View>数字徽标</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Badge count={5}>
          <dViewiv style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={10}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={100}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
      </View>
      
      <View>小红点徽标</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Badge dot>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge dot>
          <Icon name="bell" size="24" />
        </Badge>
        <Badge dot>
          <Button type="primary">按钮</Button>
        </Badge>
      </View>
      
      <View>显示零值</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Badge count={0} showZero>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={0}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
      </View>
      
      <View>溢出处理</View>
      <View style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Badge count={99}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={100}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={1000} overflowCount={999}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
      </View>
      
      <View>自定义封顶值</View>
      <View style={{ display: 'flex', gap: '16px' }}>
        <Badge count={50} overflowCount={49}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={100} overflowCount={50}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
        <Badge count={200} overflowCount={100}>
          <View style={{ width: 40, height: 40, backgroundColor: '#f5f5f5', borderRadius: 4 }} />
        </Badge>
      </View>
    </View>
  );
};

export default BadgeExample;
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

1. **数字溢出处理**：当数字超过 `overflowCount` 时，会显示为 `overflowCount+`。
2. **零值显示**：默认情况下，当 `count` 为 0 时不显示徽标，设置 `showZero` 为 `true` 可以显示零值徽标。
3. **小红点模式**：设置 `dot` 为 `true` 时，会显示为小红点，忽略 `count` 属性。
4. **子元素建议**：Badge 组件的子元素建议是可点击或需要状态提示的元素，如图标、按钮、头像等。
5. **样式自定义**：可以通过 `style` 和 `className` 属性自定义徽标的样式。

## 相关组件

- [Icon 组件](#/components/basic/icon) - 可与徽标结合使用
- [Button 组件](#/components/basic/button) - 可与徽标结合使用
- [Avatar 组件](#/components/display/avatar) - 可与徽标结合使用