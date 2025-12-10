# Form 组件

Form 组件是一个表单管理组件，用于处理表单数据收集、验证和提交，支持自定义验证规则、表单布局、错误提示等功能，适用于各种复杂的表单场景。

## 基本使用

### 基础表单

```tsx
<Form>
  <Form.Item label="用户名" name="username">
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item label="密码" name="password">
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">提交</Button>
  </Form.Item>
</Form>
```

### 受控模式

```tsx
<Form 
  value={formValue} 
  onChange={(e) => setFormValue(e.detail.value)} 
  onSubmit={(e) => console.log('提交数据:', e.detail.value)} 
>
  <Form.Item label="用户名" name="username">
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item label="密码" name="password">
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">提交</Button>
  </Form.Item>
</Form>
```

### 表单验证

```tsx
<Form 
  onSubmit={(e) => console.log('提交数据:', e.detail.value)} 
  onFinishFailed={(e) => console.log('验证失败:', e.detail.errors)} 
>
  <Form.Item 
    label="用户名" 
    name="username"
    rules={[
      { required: true, message: '请输入用户名' },
      { min: 3, max: 20, message: '用户名长度在 3-20 个字符之间' }
    ]} 
  >
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item 
    label="密码" 
    name="password"
    rules={[
      { required: true, message: '请输入密码' },
      { min: 6, max: 20, message: '密码长度在 6-20 个字符之间' }
    ]} 
  >
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">提交</Button>
  </Form.Item>
</Form>
```

### 表单布局

```tsx
<Form layout="horizontal">
  <Form.Item label="用户名" name="username" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item label="密码" name="password" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
    <Button type="primary" htmlType="submit">提交</Button>
  </Form.Item>
</Form>
```

### 表单重置

```tsx
<Form 
  ref={formRef} 
  onSubmit={(e) => console.log('提交数据:', e.detail.value)} 
>
  <Form.Item label="用户名" name="username">
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item label="密码" name="password">
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">提交</Button>
    <Button onClick={() => formRef.current?.reset()}>重置</Button>
  </Form.Item>
</Form>
```

## 属性说明

### Form 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `Record<string, any>` | - | 表单数据（受控模式） |
| defaultValue | `Record<string, any>` | - | 表单默认数据（非受控模式） |
| layout | `string` | `'vertical'` | 表单布局，可选值：`vertical`、`horizontal`、`inline` |
| labelPosition | `string` | `'left'` | 标签位置，可选值：`left`、`top` |
| labelWidth | `string` \| `number` | - | 标签宽度 |
| labelCol | `object` | - | 标签列配置 |
| wrapperCol | `object` | - | 内容列配置 |
| disabled | `boolean` | `false` | 是否禁用所有表单控件 |
| validateTrigger | `string` \| `string[]` | `'onChange'` | 验证触发时机 |
| initialValues | `Record<string, any>` | - | 表单初始值 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(e: { detail: { value: Record<string, any> } }) => void` | - | 表单数据变化回调 |
| onSubmit | `(e: { detail: { value: Record<string, any> } }) => void` | - | 表单提交回调 |
| onFinish | `(values: Record<string, any>) => void` | - | 表单验证成功回调 |
| onFinishFailed | `(e: { detail: { errors: any[] } }) => void` | - | 表单验证失败回调 |
| onReset | `() => void` | - | 表单重置回调 |

### Form.Item 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | `string` \| `string[]` | - | 表单字段名 |
| label | `React.ReactNode` | - | 标签文本 |
| labelCol | `object` | - | 标签列配置 |
| wrapperCol | `object` | - | 内容列配置 |
| rules | `Array<FormRule>` | - | 验证规则 |
| initialValue | `any` | - | 初始值 |
| required | `boolean` | `false` | 是否必填 |
| validateTrigger | `string` \| `string[]` | - | 验证触发时机 |
| messageVariables | `Record<string, any>` | - | 验证消息变量 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| extra | `React.ReactNode` | - | 额外提示信息 |
| help | `React.ReactNode` | - | 帮助文本 |
| validateStatus | `string` | - | 验证状态，可选值：`success`、`warning`、`error` |

### FormRule 类型

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| required | `boolean` | `false` | 是否必填 |
| message | `string` | - | 错误提示信息 |
| min | `number` | - | 最小值（适用于字符串和数组） |
| max | `number` | - | 最大值（适用于字符串和数组） |
| len | `number` | - | 固定长度（适用于字符串和数组） |
| pattern | `RegExp` | - | 正则表达式验证 |
| validator | `(rule: any, value: any) => Promise<void>` | - | 自定义验证函数 |
| validateTrigger | `string` \| `string[]` | - | 验证触发时机 |

## 类型定义

```tsx
// Form 组件属性接口
export interface FormProps {
  value?: Record<string, any>;
  defaultValue?: Record<string, any>;
  layout?: 'vertical' | 'horizontal' | 'inline';
  labelPosition?: 'left' | 'top';
  labelWidth?: string | number;
  labelCol?: object;
  wrapperCol?: object;
  disabled?: boolean;
  validateTrigger?: string | string[];
  initialValues?: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { detail: { value: Record<string, any> } }) => void;
  onSubmit?: (e: { detail: { value: Record<string, any> } }) => void;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (e: { detail: { errors: any[] } }) => void;
  onReset?: () => void;
}

// Form.Item 组件属性接口
export interface FormItemProps {
  name?: string | string[];
  label?: React.ReactNode;
  labelCol?: object;
  wrapperCol?: object;
  rules?: Array<FormRule>;
  initialValue?: any;
  required?: boolean;
  validateTrigger?: string | string[];
  messageVariables?: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  help?: React.ReactNode;
  validateStatus?: string;
}

// 表单验证规则接口
export interface FormRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  len?: number;
  pattern?: RegExp;
  validator?: (rule: any, value: any) => Promise<void>;
  validateTrigger?: string | string[];
}
```

## 示例代码

### 完整示例

```tsx
import { Form, Input, Button, Space, View, Text } from 'taro-uno-ui';
import { useState, useRef } from 'react';

const FormExample = () => {
  // 受控模式状态
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    email: ''
  });
  // 表单引用
  const formRef = useRef<any>(null);
  
  // 自定义验证函数
  const validateEmail = async (rule: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入邮箱'));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.reject(new Error('请输入有效的邮箱地址'));
    }
    return Promise.resolve();
  };

  // 处理表单提交
  const handleSubmit = (e: any) => {
    console.log('表单提交:', e.detail.value);
  };

  // 处理表单验证成功
  const handleFinish = (values: any) => {
    console.log('验证成功:', values);
  };

  // 处理表单验证失败
  const handleFinishFailed = (e: any) => {
    console.log('验证失败:', e.detail.errors);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础表单</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Form 
          ref={formRef}
          onSubmit={handleSubmit}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <Form.Item 
            label="用户名" 
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度在 3-20 个字符之间' }
            ]} 
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          
          <Form.Item 
            label="密码" 
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, max: 20, message: '密码长度在 6-20 个字符之间' }
            ]} 
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          
          <Form.Item 
            label="邮箱" 
            name="email"
            rules={[
              { required: true, validator: validateEmail }
            ]} 
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button onClick={() => formRef.current?.reset()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Form 
          value={formValue} 
          onChange={(e) => setFormValue(e.detail.value)} 
        >
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item>
            <Text>表单数据：{JSON.stringify(formValue)}</Text>
          </Form.Item>
        </Form>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>水平布局</Text>
      <Space direction="vertical" size="large" style={{ marginBottom: '20px', width: '100%' }}>
        <Form layout="horizontal">
          <Form.Item 
            label="用户名" 
            name="username" 
            labelCol={{ span: 6 }} 
            wrapperCol={{ span: 18 }} 
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item 
            label="密码" 
            name="password" 
            labelCol={{ span: 6 }} 
            wrapperCol={{ span: 18 }} 
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Space>
    </View>
  );
};

export default FormExample;
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

1. **表单布局**：支持垂直、水平和内联三种布局，通过 layout 属性控制。
2. **受控模式**：推荐使用受控模式，通过 value 和 onChange 属性来控制表单数据。
3. **表单验证**：支持内置验证规则和自定义验证函数，通过 rules 属性配置。
4. **验证时机**：可以通过 validateTrigger 属性控制验证触发的时机，如 onChange、onBlur 等。
5. **表单提交**：使用 Button 的 htmlType="submit" 属性来触发表单提交。
6. **表单重置**：使用 ref 调用 reset() 方法可以重置表单数据。
7. **动态表单**：支持动态添加和删除表单项，适用于复杂的表单场景。
8. **性能优化**：表单组件使用了 memo 和 useMemo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Input 组件](#/components/form/input) - 用于文本输入
- [Select 组件](#/components/form/select) - 用于选择列表项
- [Checkbox 组件](#/components/form/checkbox) - 用于多选操作
- [Radio 组件](#/components/form/radio) - 用于单选操作
- [Switch 组件](#/components/form/switch) - 用于开关切换
