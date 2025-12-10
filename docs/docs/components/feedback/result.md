# Result 组件

Result 组件是一个结果展示组件，用于显示操作结果、状态提示等信息，支持多种类型、样式、按钮配置等功能。

## 基本使用

### 成功结果

```tsx
<Result type="success" title="操作成功" />
```

### 失败结果

```tsx
<Result type="error" title="操作失败" />
```

### 警告结果

```tsx
<Result type="warning" title="警告信息" />
```

### 信息结果

```tsx
<Result type="info" title="提示信息" />
```

### 自定义结果

```tsx
<Result 
  icon={<Icon name="smile" size={48} color="primary" />} 
  title="自定义结果" 
/>
```

### 带描述

```tsx
<Result 
  type="success" 
  title="操作成功" 
  description="您的操作已成功完成，感谢您的使用。" 
/>
```

### 带按钮

```tsx
<Result 
  type="success" 
  title="操作成功" 
  actions={[
    <Button type="primary" key="primary">返回首页</Button>,
    <Button key="default">查看详情</Button>
  ]} 
/>
```

### 带额外内容

```tsx
<Result 
  type="success" 
  title="操作成功" 
  description="您的操作已成功完成，感谢您的使用。" 
>
  <View style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
    <Text>这里是额外的内容区域，可以放置更多详细信息。</Text>
  </View>
</Result>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | - | 结果类型，可选值：`success`、`error`、`warning`、`info` |
| title | `React.ReactNode` | - | 结果标题 |
| description | `React.ReactNode` | - | 结果描述 |
| icon | `React.ReactNode` | - | 自定义图标 |
| actions | `React.ReactNode` | - | 操作按钮区域 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| iconClassName | `string` | - | 自定义图标类名 |
| iconStyle | `React.CSSProperties` | - | 自定义图标样式 |
| titleClassName | `string` | - | 自定义标题类名 |
| titleStyle | `React.CSSProperties` | - | 自定义标题样式 |
| descriptionClassName | `string` | - | 自定义描述类名 |
| descriptionStyle | `React.CSSProperties` | - | 自定义描述样式 |
| actionsClassName | `string` | - | 自定义操作按钮区域类名 |
| actionsStyle | `React.CSSProperties` | - | 自定义操作按钮区域样式 |

## 类型定义

```tsx
// Result 组件属性接口
export interface ResultProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  descriptionClassName?: string;
  descriptionStyle?: React.CSSProperties;
  actionsClassName?: string;
  actionsStyle?: React.CSSProperties;
}
```

## 示例代码

### 完整示例

```tsx
import { Result, Button, Space, View, Text, Icon } from 'taro-uno-ui';

const ResultExample = () => {
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>不同类型结果</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Result type="success" title="操作成功" />
        <Result type="error" title="操作失败" />
        <Result type="warning" title="警告信息" />
        <Result type="info" title="提示信息" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '40px' }}>带描述结果</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Result 
          type="success" 
          title="操作成功" 
          description="您的操作已成功完成，感谢您的使用。" 
        />
        <Result 
          type="error" 
          title="操作失败" 
          description="很抱歉，您的操作未能成功完成，请稍后重试。" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '40px' }}>带按钮结果</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Result 
          type="success" 
          title="操作成功" 
          description="您的操作已成功完成，感谢您的使用。" 
          actions={[
            <Button type="primary" key="primary">返回首页</Button>,
            <Button key="default">查看详情</Button>
          ]} 
        />
        <Result 
          type="error" 
          title="操作失败" 
          description="很抱歉，您的操作未能成功完成，请稍后重试。" 
          actions={[
            <Button type="primary" key="primary">重试</Button>,
            <Button key="default">取消</Button>
          ]} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '40px' }}>自定义结果</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Result 
          icon={<Icon name="smile" size={48} color="primary" />} 
          title="自定义结果" 
          description="这是一个自定义的结果展示，您可以根据需要调整样式和内容。" 
          actions={[
            <Button type="primary" key="primary">确定</Button>
          ]} 
        />
        <Result 
          icon={<Icon name="frown" size={48} color="error" />} 
          title="自定义错误" 
          description="这是一个自定义的错误结果展示。" 
          actions={[
            <Button type="default" key="default">返回</Button>
          ]} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '40px' }}>带额外内容</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px' }}>
        <Result 
          type="success" 
          title="操作成功" 
          description="您的订单已成功提交，以下是订单详情。" 
          actions={[
            <Button type="primary" key="primary">查看订单</Button>,
            <Button key="default">继续购物</Button>
          ]} 
        >
          <View style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '4px', marginTop: '20px' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>订单信息：</Text>
            <Text>订单号：202305120001</Text>
            <Text>金额：¥99.00</Text>
            <Text>状态：已支付</Text>
            <Text>创建时间：2023-05-12 14:30:00</Text>
          </View>
        </Result>
      </Space>
    </View>
  );
};

export default ResultExample;
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

1. **结果类型**：支持 success、error、warning、info 四种类型，每种类型都有对应的默认图标和颜色。
2. **自定义图标**：可以通过 icon 属性自定义结果图标，支持传入任何 React 元素。
3. **描述信息**：可以通过 description 属性添加详细的描述信息，帮助用户理解结果。
4. **操作按钮**：可以通过 actions 属性添加操作按钮，方便用户进行后续操作。
5. **额外内容**：可以通过 children 属性添加额外的内容，如订单详情、操作步骤等。
6. **样式定制**：支持通过 className 和 style 属性自定义组件的样式，满足不同的设计需求。
7. **性能优化**：结果组件使用了 memo 优化，避免不必要的重渲染。
8. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与结果组件结合使用
- [Icon 组件](#/components/basic/icon) - 可用于自定义结果图标
- [Message 组件](#/components/feedback/message) - 用于操作结果提示
- [Modal 组件](#/components/feedback/modal) - 用于需要用户确认的操作
