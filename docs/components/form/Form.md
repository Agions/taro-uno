# Form 表单组件

表单组件用于数据收集、验证和提交，提供完整的表单管理功能。

## 基础用法

```tsx
import { Form, Input, Button } from 'taro-uno'

// 基础表单
<Form onFinish={(values) => console.log(values)}>
  <Form.Item name="username" label="用户名">
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item name="password" label="密码">
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## 布局

表单支持多种布局方式。

```tsx
// 水平布局
<Form layout="horizontal">
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
</Form>

// 垂直布局
<Form layout="vertical">
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
</Form>

// 行内布局
<Form layout="inline">
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
  <Form.Item name="password" label="密码">
    <Input type="password" />
  </Form.Item>
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## 表单验证

表单支持多种验证规则。

```tsx
// 基础验证
<Form
  onFinish={(values) => console.log(values)}
  onFinishFailed={(errors) => console.log(errors)}
>
  <Form.Item
    name="username"
    label="用户名"
    rules={[{ required: true, message: '请输入用户名' }]}
  >
    <Input />
  </Form.Item>
  
  <Form.Item
    name="email"
    label="邮箱"
    rules={[
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '请输入有效的邮箱地址' }
    ]}
  >
    <Input />
  </Form.Item>
  
  <Form.Item
    name="age"
    label="年龄"
    rules={[
      { required: true, message: '请输入年龄' },
      { type: 'number', message: '请输入有效的年龄' },
      { min: 18, message: '年龄不能小于18岁' },
      { max: 100, message: '年龄不能大于100岁' }
    ]}
  >
    <Input type="number" />
  </Form.Item>
  
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## 自定义验证

表单支持自定义验证规则。

```tsx
// 同步验证
<Form>
  <Form.Item
    name="username"
    label="用户名"
    rules={[
      { required: true, message: '请输入用户名' },
      {
        validator: (rule, value) => {
          if (value && value.length < 3) {
            return Promise.reject('用户名至少3个字符');
          }
          return Promise.resolve();
        }
      }
    ]}
  >
    <Input />
  </Form.Item>
</Form>

// 异步验证
<Form>
  <Form.Item
    name="username"
    label="用户名"
    rules={[
      { required: true, message: '请输入用户名' },
      {
        validator: (rule, value) => {
          if (!value) return Promise.resolve();
          
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (value === 'admin') {
                reject('用户名已存在');
              } else {
                resolve();
              }
            }, 1000);
          });
        }
      }
    ]}
  >
    <Input />
  </Form.Item>
</Form>
```

## 受控和非受控

表单支持受控和非受控模式。

```tsx
// 受控模式
const [form] = Form.useForm()
const [values, setValues] = useState({})

<Form
  form={form}
  initialValues={values}
  onValuesChange={(changedValues, allValues) => {
    setValues(allValues)
  }}
>
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
</Form>

// 非受控模式
<Form onFinish={(values) => console.log(values)}>
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
</Form>
```

## 表单状态管理

表单提供丰富的状态管理功能。

```tsx
const [form] = Form.useForm()

// 获取表单值
const values = form.getFieldsValue()

// 设置表单值
form.setFieldsValue({ username: 'test', email: 'test@example.com' })

// 获取单个字段值
const username = form.getFieldValue('username')

// 设置单个字段值
form.setFieldValue('username', 'test')

// 重置表单
form.resetFields()

// 验证表单
form.validateFields().then(values => {
  console.log('验证通过:', values)
}).catch(errors => {
  console.log('验证失败:', errors)
})

// 验证单个字段
form.validateFields(['username']).then(values => {
  console.log('验证通过:', values)
})
```

## 动态表单

表单支持动态添加和删除字段。

```tsx
const [form] = Form.useForm()
const [fields, setFields] = useState([{ name: 'user0', key: 0 }])

const addField = () => {
  const newKey = fields.length
  setFields([...fields, { name: `user${newKey}`, key: newKey }])
}

const removeField = (key: number) => {
  setFields(fields.filter(field => field.key !== key))
}

<Form form={form}>
  {fields.map((field) => (
    <Form.Item
      key={field.key}
      name={field.name}
      label={`用户 ${field.key + 1}`}
      rules={[{ required: true, message: '请输入用户名' }]}
    >
      <Input />
      {fields.length > 1 && (
        <Button 
          type="text" 
          onClick={() => removeField(field.key)}
        >
          删除
        </Button>
      )}
    </Form.Item>
  ))}
  <Button type="dashed" onClick={addField} style={{ width: '100%' }}>
    添加用户
  </Button>
</Form>
```

## 嵌套表单

表单支持嵌套结构。

```tsx
<Form onFinish={(values) => console.log(values)}>
  <Form.Item name="userInfo" label="用户信息">
    <Input.Group>
      <Form.Item
        name={['userInfo', 'firstName']}
        label="姓"
        rules={[{ required: true, message: '请输入姓' }]}
      >
        <Input placeholder="请输入姓" />
      </Form.Item>
      <Form.Item
        name={['userInfo', 'lastName']}
        label="名"
        rules={[{ required: true, message: '请输入名' }]}
      >
        <Input placeholder="请输入名" />
      </Form.Item>
    </Input.Group>
  </Form.Item>
  
  <Form.Item name="address" label="地址">
    <Input.Textarea rows={4} placeholder="请输入地址" />
  </Form.Item>
  
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
```

## 表单配置

表单支持全局配置。

```tsx
<Form
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 20 }}
  labelAlign="right"
  labelWrap={true}
  colon={true}
  requiredMark={true}
  validateTrigger="onBlur"
  scrollToFirstError={true}
>
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
</Form>
```

## API

### Form Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| form | FormInstance | - | 表单实例 |
| initialValues | object | {} | 表单初始值 |
| layout | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' | 表单布局 |
| labelCol | object | - | 标签布局配置 |
| wrapperCol | object | - | 输入框布局配置 |
| labelAlign | 'left' \| 'right' | 'right' | 标签对齐方式 |
| labelWrap | boolean | false | 标签是否换行 |
| colon | boolean | true | 是否显示冒号 |
| requiredMark | boolean | true | 是否显示必填标记 |
| validateTrigger | 'onChange' \| 'onBlur' \| 'onSubmit' | 'onChange' | 验证触发时机 |
| scrollToFirstError | boolean | true | 验证失败时是否滚动到第一个错误 |
| onFinish | (values: object) => void | - | 提交成功回调 |
| onFinishFailed | (errors: object) => void | - | 提交失败回调 |
| onValuesChange | (changedValues: object, allValues: object) => void | - | 值变化回调 |
| onFieldsChange | (changedFields: array, allFields: array) => void | - | 字段变化回调 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Form.Item Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | string \| string[] | - | 字段名 |
| label | ReactNode | - | 标签文本 |
| rules | array | [] | 验证规则 |
| required | boolean | false | 是否必填 |
| message | string | - | 验证失败消息 |
| dependencies | array | [] | 依赖字段 |
| tooltip | ReactNode | - | 提示信息 |
| extra | ReactNode | - | 额外说明 |
| help | ReactNode | - | 帮助信息 |
| validateStatus | 'success' \| 'warning' \| 'error' \| 'validating' | - | 验证状态 |
| hasFeedback | boolean | false | 是否显示反馈图标 |
| initialValue | any | - | 初始值 |
| preserve | boolean | true | 字段卸载时是否保留值 |
| trigger | string | 'onChange' | 触发验证的事件 |
| validateTrigger | string \| string[] | 'onChange' | 验证触发时机 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### FormInstance Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getFieldsValue | () => object | 获取所有字段值 |
| setFieldsValue | (values: object) => void | 设置字段值 |
| getFieldValue | (name: string) => any | 获取单个字段值 |
| setFieldValue | (name: string, value: any) => void | 设置单个字段值 |
| resetFields | (fields?: string[]) => void | 重置字段值 |
| validateFields | (fields?: string[]) => Promise | 验证字段 |
| validateField | (name: string) => Promise | 验证单个字段 |
| isFieldsTouched | (fields?: string[]) => boolean | 检查字段是否被触摸 |
| isFieldTouched | (name: string) => boolean | 检查单个字段是否被触摸 |
| isFieldsValidating | (fields?: string[]) => boolean | 检查字段是否在验证中 |
| isFieldValidating | (name: string) => boolean | 检查单个字段是否在验证中 |
| getFieldsError | (fields?: string[]) => object | 获取字段错误 |
| getFieldError | (name: string) => string[] | 获取单个字段错误 |
| setFields | (fields: array) => void | 设置字段状态 |
| submit | () => Promise | 提交表单 |

## 验证规则

### Rule 对象

| 属性名 | 类型 | 说明 |
|--------|------|------|
| required | boolean | 是否必填 |
| message | string | 验证失败消息 |
| type | 'string' \| 'number' \| 'boolean' \| 'method' \| 'regexp' \| 'integer' \| 'float' \| 'object' \| 'array' \| 'date' \| 'url' \| 'email' | 验证类型 |
| min | number | 最小值 |
| max | number | 最大值 |
| len | number | 长度 |
| pattern | RegExp | 正则表达式 |
| enum | array | 枚举值 |
| whitespace | boolean | 是否验证空格 |
| transform | (value: any) => any | 转换函数 |
| validator | (rule: Rule, value: any) => Promise \| boolean \| string | 自定义验证器 |
| asyncValidator | (rule: Rule, value: any) => Promise \| boolean \| string | 异步验证器 |

## 样式定制

### CSS 变量

```css
:root {
  --form-label-color: #374151;
  --form-label-font-size: 14px;
  --form-label-font-weight: 500;
  --form-item-margin-bottom: 24px;
  --form-error-color: #ef4444;
  --form-warning-color: #f59e0b;
  --form-success-color: #10b981;
  --form-help-color: #6b7280;
  --form-required-color: #ef4444;
  --form-disabled-color: #9ca3af;
  --form-feedback-icon-size: 14px;
}
```

## 最佳实践

1. **合理的验证规则**：设置合适的验证规则，避免过度验证
2. **清晰的用户提示**：提供明确的错误提示和帮助信息
3. **响应式设计**：在不同屏幕尺寸下保持良好的布局
4. **性能优化**：避免在大型表单中使用过多的验证规则

## 注意事项

1. 表单组件基于 Taro 的 `Form` 组件封装
2. 嵌套字段名使用数组形式，如 `['user', 'name']`
3. 异步验证需要返回 Promise
4. 动态表单需要正确管理字段的生命周期