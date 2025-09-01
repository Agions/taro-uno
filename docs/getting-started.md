# 快速开始指南

本指南将帮助您快速上手使用 Taro UI 组件库。

## 安装

### 环境要求

- Node.js >= 16.0.0
- Taro >= 3.0.0
- React >= 18.0.0

### 安装组件库

```bash
# 使用 npm
npm install taro-uno

# 使用 yarn
yarn add taro-uno

# 使用 pnpm
pnpm add taro-uno
```

## 基础配置

### 1. 配置 Taro 项目

在 `config/index.ts` 中配置：

```tsx
import { defineConfig } from '@tarojs/taro'

export default defineConfig({
  // ... 其他配置
  mini: {
    // 小程序配置
  },
  h5: {
    // H5 配置
  }
})
```

### 2. 配置主题

在 `app.config.ts` 中引入主题：

```tsx
export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro UI',
    navigationBarTextStyle: 'black'
  }
}
```

### 3. 全局样式

在 `app.scss` 中引入基础样式：

```scss
@import 'taro-uno/dist/styles/index.scss';

// 自定义样式
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## 基础使用

### 1. 使用组件

```tsx
import { View, Text } from '@tarojs/components'
import { Button, Card, Message } from 'taro-uno'

export default function Index() {
  const handleClick = () => {
    Message.success('点击了按钮')
  }

  return (
    <View className='index'>
      <Text>Hello Taro UI!</Text>
      
      <Card>
        <Card.Header>
          <Card.Title>基础卡片</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text>这是一个基础卡片示例</Text>
          <Button onClick={handleClick}>点击我</Button>
        </Card.Body>
      </Card>
    </View>
  )
}
```

### 2. 使用主题

```tsx
import { ThemeProvider, useTheme } from 'taro-uno'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}

function ThemedComponent() {
  const theme = useTheme()
  
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.text }}>主题化组件</Text>
    </View>
  )
}
```

### 3. 响应式布局

```tsx
import { Grid, Col, Row } from 'taro-uno'

function ResponsiveLayout() {
  return (
    <Grid>
      <Row>
        <Col span={24}>全宽</Col>
      </Row>
      <Row>
        <Col span={12}>半宽</Col>
        <Col span={12}>半宽</Col>
      </Row>
      <Row>
        <Col span={8}>1/3宽</Col>
        <Col span={8}>1/3宽</Col>
        <Col span={8}>1/3宽</Col>
      </Row>
    </Grid>
  )
}
```

## 常用组件示例

### 按钮组件

```tsx
import { Button } from 'taro-uno'

function ButtonExample() {
  return (
    <View>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="error">错误按钮</Button>
      <Button loading>加载中</Button>
      <Button disabled>禁用</Button>
    </View>
  )
}
```

### 表单组件

```tsx
import { Form, Input, Select, Button } from 'taro-uno'

function FormExample() {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      console.log('表单值:', values)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <Form form={form}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="邮箱"
        rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      
      <Form.Item
        name="gender"
        label="性别"
      >
        <Select>
          <Select.Option value="male">男</Select.Option>
          <Select.Option value="female">女</Select.Option>
        </Select>
      </Form.Item>
      
      <Button onClick={handleSubmit} type="primary">
        提交
      </Button>
    </Form>
  )
}
```

### 列表组件

```tsx
import { List, Card, Tag, Button } from 'taro-uno'

function ListExample() {
  const data = [
    { id: 1, title: '任务1', status: 'completed', priority: 'high' },
    { id: 2, title: '任务2', status: 'in-progress', priority: 'medium' },
    { id: 3, title: '任务3', status: 'pending', priority: 'low' }
  ]

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card>
            <Card.Header>
              <Card.Title>{item.title}</Card.Title>
              <Card.Extra>
                <Tag color={
                  item.status === 'completed' ? 'success' :
                  item.status === 'in-progress' ? 'warning' : 'default'
                }>
                  {item.status === 'completed' ? '已完成' :
                   item.status === 'in-progress' ? '进行中' : '待开始'}
                </Tag>
              </Card.Extra>
            </Card.Header>
            <Card.Body>
              <Text>优先级: {item.priority}</Text>
            </Card.Body>
            <Card.Actions>
              <Button size="sm">编辑</Button>
              <Button size="sm" type="primary">查看</Button>
            </Card.Actions>
          </Card>
        </List.Item>
      )}
    />
  )
}
```

### 表格组件

```tsx
import { Table, Tag, Button } from 'taro-uno'

function TableExample() {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '激活' : '禁用'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button size="sm">编辑</Button>
      )
    }
  ]

  const data = [
    { key: '1', name: '张三', age: 25, status: 'active' },
    { key: '2', name: '李四', age: 30, status: 'inactive' },
    { key: '3', name: '王五', age: 28, status: 'active' }
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={{
        current: 1,
        pageSize: 10,
        total: 100
      }}
    />
  )
}
```

## 事件处理

### 基础事件

```tsx
import { Button, Message } from 'taro-uno'

function EventExample() {
  const handleClick = () => {
    Message.success('按钮被点击了')
  }

  const handleLongPress = () => {
    Message.info('长按事件')
  }

  return (
    <View>
      <Button onClick={handleClick}>点击事件</Button>
      <Button onLongPress={handleLongPress}>长按事件</Button>
    </View>
  )
}
```

### 表单事件

```tsx
import { Form, Input, Button } from 'taro-uno'

function FormEventExample() {
  const [form] = Form.useForm()

  const onValuesChange = (changedValues, allValues) => {
    console.log('值变化:', changedValues, allValues)
  }

  const onFinish = (values) => {
    console.log('表单提交:', values)
    Message.success('提交成功')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('表单验证失败:', errorInfo)
    Message.error('请检查表单')
  }

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      
      <Button htmlType="submit" type="primary">
        提交
      </Button>
    </Form>
  )
}
```

## 状态管理

### 使用 useState

```tsx
import { useState } from 'react'
import { Button, Text } from 'taro-uno'

function StateExample() {
  const [count, setCount] = useState(0)

  return (
    <View>
      <Text>计数: {count}</Text>
      <Button onClick={() => setCount(count + 1)}>增加</Button>
      <Button onClick={() => setCount(count - 1)}>减少</Button>
    </View>
  )
}
```

### 使用 useEffect

```tsx
import { useState, useEffect } from 'react'
import { Button, Loading, Message } from 'taro-uno'

function EffectExample() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      setData([{ id: 1, name: '数据1' }, { id: 2, name: '数据2' }])
      Message.success('数据加载成功')
    } catch (error) {
      Message.error('数据加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View>
      <Button onClick={fetchData} disabled={loading}>
        {loading ? '加载中...' : '刷新数据'}
      </Button>
      
      {loading && <Loading>加载中...</Loading>}
      
      {data.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  )
}
```

## 路由导航

### 页面跳转

```tsx
import { Button } from 'taro-uno'
import Taro from '@tarojs/taro'

function NavigationExample() {
  const navigateToDetail = () => {
    Taro.navigateTo({
      url: '/pages/detail/index?id=123'
    })
  }

  const redirectToHome = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  return (
    <View>
      <Button onClick={navigateToDetail}>跳转到详情页</Button>
      <Button onClick={redirectToHome}>重定向到首页</Button>
    </View>
  )
}
```

## 网络请求

### 基础请求

```tsx
import { useState, useEffect } from 'react'
import { Button, Loading, Message } from 'taro-uno'
import Taro from '@tarojs/taro'

function RequestExample() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await Taro.request({
        url: 'https://api.example.com/data',
        method: 'GET'
      })
      
      setData(response.data)
      Message.success('数据获取成功')
    } catch (error) {
      Message.error('网络请求失败')
      console.error('请求错误:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <Button onClick={fetchData} disabled={loading}>
        {loading ? '请求中...' : '获取数据'}
      </Button>
      
      {loading && <Loading>加载中...</Loading>}
      
      {data && (
        <View>
          <Text>数据: {JSON.stringify(data)}</Text>
        </View>
      )}
    </View>
  )
}
```

## 最佳实践

### 1. 组件命名

```tsx
// 好的命名
function UserProfileCard() {
  return <Card>用户资料卡片</Card>
}

// 避免的命名
function Card1() {
  return <Card>卡片1</Card>
}
```

### 2. 样式组织

```tsx
// 使用 CSS 模块或 CSS-in-JS
function StyledComponent() {
  return (
    <View className="container">
      <Text className="title">标题</Text>
      <Text className="content">内容</Text>
    </View>
  )
}

// 对应的样式
.container {
  padding: 16px;
  background: #fff;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.content {
  font-size: 14px;
  color: #666;
}
```

### 3. 错误处理

```tsx
async function safeRequest() {
  try {
    const result = await api.getData()
    return result
  } catch (error) {
    Message.error('请求失败，请稍后重试')
    console.error('API 错误:', error)
    return null
  }
}
```

### 4. 性能优化

```tsx
import { memo, useCallback } from 'react'

// 使用 memo 避免不必要的重渲染
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <View>{data.map(item => <Text key={item.id}>{item.name}</Text>)}</View>
})

// 使用 useCallback 缓存函数
function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('点击事件')
  }, [])

  return <Button onClick={handleClick}>点击</Button>
}
```

## 下一步

现在您已经掌握了 Taro UI 组件库的基础用法，可以继续学习：

- 📚 [组件文档](./components/basic/Button.md) - 详细了解每个组件的使用方法
- 🎨 [主题系统](./theme.md) - 学习如何定制主题
- 🛠️ [开发指南](./development.md) - 了解组件开发和贡献指南
- 📖 [最佳实践](./best-practices.md) - 学习最佳实践和性能优化

如有问题，请查看 [常见问题](./faq.md) 或提交 [Issue](https://github.com/your-org/taro-uno/issues)。