#!/usr/bin/env node

/**
 * 生成交互式示例脚本
 * 为每个组件生成可运行的交互式示例
 */

const fs = require('fs');
const path = require('path');

// 配置
const config = {
  examplesDir: path.join(__dirname, '..', 'docs', 'examples'),
  componentsDir: path.join(__dirname, '..', 'src', 'components'),
};

// 组件示例模板
const componentExamples = {
  Button: {
    basic: `import React, { useState } from 'react';
import { Button } from '@taro-uno/ui';

export default function ButtonBasicExample() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleAsyncClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>基础按钮</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={handleClick}>默认按钮</Button>
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="error">错误按钮</Button>
      </div>

      <h3>按钮变体</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="solid">实心</Button>
        <Button variant="outline">边框</Button>
        <Button variant="ghost">幽灵</Button>
        <Button variant="text">文本</Button>
      </div>

      <h3>按钮尺寸</h3>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button size="xs">超小</Button>
        <Button size="sm">小</Button>
        <Button size="md">中</Button>
        <Button size="lg">大</Button>
        <Button size="xl">超大</Button>
      </div>

      <h3>按钮状态</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button loading={loading} onClick={handleAsyncClick}>
          {loading ? '加载中...' : '点击加载'}
        </Button>
        <Button disabled>禁用按钮</Button>
      </div>

      <h3>块级按钮</h3>
      <Button block>块级按钮</Button>
    </div>
  );
}`,
    advanced: `import React, { useState } from 'react';
import { Button, Icon } from '@taro-uno/ui';

export default function ButtonAdvancedExample() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>图标按钮</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button icon={<Icon name="search" />}>搜索</Button>
        <Button icon={<Icon name="download" />} iconPosition="right">
          下载
        </Button>
        <Button shape="circle" icon={<Icon name="close" />} />
      </div>

      <h3>自定义颜色</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button color="#ff6b6b">自定义颜色</Button>
        <Button backgroundColor="#4ecdc4" textColor="#ffffff">
          自定义背景
        </Button>
      </div>

      <h3>交互示例</h3>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button onClick={handleIncrement}>
          点击次数: {count}
        </Button>
        <Button
          type="primary"
          onClick={() => setCount(0)}
          disabled={count === 0}
        >
          重置
        </Button>
      </div>

      <h3>涟漪效果</h3>
      <Button ripple>点击有涟漪效果</Button>
    </div>
  );
}`,
  },
  Input: {
    basic: `import React, { useState } from 'react';
import { Input, Button } from '@taro-uno/ui';

export default function InputBasicExample() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>基础输入框</h3>
      <Input
        placeholder="请输入内容"
        value={value}
        onChange={handleChange}
      />
      <p>当前值: {value}</p>

      <h3>受控输入</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Input
          placeholder="受控输入"
          value={value}
          onChange={handleChange}
        />
        <Button onClick={handleClear}>清空</Button>
      </div>

      <h3>不同类型</h3>
      <Input placeholder="文本输入" type="text" />
      <Input placeholder="密码输入" type="password" />
      <Input placeholder="数字输入" type="number" />
      <Input placeholder="邮箱输入" type="email" />
    </div>
  );
}`,
  },
  Form: {
    basic: `import React, { useState } from 'react';
import { Form, Input, Button, Select, Radio, Checkbox } from '@taro-uno/ui';

export default function FormBasicExample() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log('Form values:', values);
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="兴趣"
          name="interests"
        >
          <Checkbox.Group>
            <Checkbox value="reading">阅读</Checkbox>
            <Checkbox value="sports">运动</Checkbox>
            <Checkbox value="music">音乐</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}`,
  },
};

// 生成组件示例
function generateComponentExample(componentName) {
  const examples = componentExamples[componentName];
  if (!examples) {
    console.warn(`暂无 ${componentName} 组件的示例模板`);
    return null;
  }

  const examplesDir = path.join(config.examplesDir, componentName.toLowerCase());
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }

  Object.entries(examples).forEach(([exampleType, code]) => {
    const fileName = `${exampleType}.tsx`;
    const filePath = path.join(examplesDir, fileName);

    // 添加文件头注释
    const fileContent = `/**
 * ${componentName} ${exampleType} 示例
 *
 * 此示例展示了 ${componentName} 组件的${exampleType === 'basic' ? '基础' : '高级'}用法
 *
 * @author Taro-Uno UI
 * @date ${new Date().toLocaleDateString('zh-CN')}
 */

${code}
`;

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ 生成示例: ${filePath}`);
  });

  // 生成示例索引文件
  generateExampleIndex(componentName, examples);
}

// 生成示例索引
function generateExampleIndex(componentName, examples) {
  const exampleDir = path.join(config.examplesDir, componentName.toLowerCase());
  const indexPath = path.join(exampleDir, 'index.md');

  let indexContent = `# ${componentName} 示例

本页面展示了 ${componentName} 组件的各种用法和示例。

---

## 示例列表

`;

  Object.keys(examples).forEach(exampleType => {
    const type = exampleType === 'basic' ? '基础示例' : '高级示例';
    indexContent += `### ${type}

\`\`\`tsx
import ${componentName}${exampleType === 'basic' ? 'Basic' : 'Advanced'}Example from './${exampleType}';

function App() {
  return <${componentName}${exampleType === 'basic' ? 'Basic' : 'Advanced'}Example />;
}
\`\`\`

`;
  });

  indexContent += `---

## 在线演示

<div class="example-container">
  <!-- 这里可以嵌入实际的组件演示 -->
</div>

---

## 相关链接

- [${componentName} API 文档](../../api/${componentName.toLowerCase()}.md)
- [${componentName} 使用指南](../../components/${getComponentCategory(componentName)}/${componentName.toLowerCase()}.md)
- [主题定制](../../theme.md)

---

*最后更新：${new Date().toLocaleDateString('zh-CN')}*
`;

  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`📋 生成示例索引: ${indexPath}`);
}

// 获取组件分类
function getComponentCategory(componentName) {
  const categories = {
    Button: 'basic',
    Input: 'form',
    Form: 'form',
    // 添加更多组件映射
  };
  return categories[componentName] || 'basic';
}

// 生成示例主页面
function generateExamplesHomepage() {
  const indexPath = path.join(config.examplesDir, 'index.md');

  let content = `# 组件示例

这里提供了 Taro-Uno UI 所有组件的交互式示例，帮助开发者快速理解和使用各个组件。

---

## 快速导航

`;

  Object.keys(componentExamples).forEach(componentName => {
    content += `### [${componentName} 示例](${componentName.toLowerCase()}/)

${getComponentDescription(componentName)}

`;

    const examples = componentExamples[componentName];
    Object.keys(examples).forEach(exampleType => {
      const type = exampleType === 'basic' ? '基础示例' : '高级示例';
      content += `- [${type}](${componentName.toLowerCase()}/index.md#${exampleType})\n`;
    });

    content += '\n';
  });

  content += `---

## 如何使用示例

1. **查看代码**: 每个示例都提供完整的源代码
2. **复制代码**: 可以直接复制到您的项目中使用
3. **自定义修改**: 根据需求进行个性化定制

## 本地运行

\`\`\`bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 查看示例
打开 docs/examples 目录
\`\`\`

---

## 相关链接

- [API 文档](../api/)
- [组件指南](../components/)
- [最佳实践](../guides/best-practices.md)

---

*最后更新：${new Date().toLocaleDateString('zh-CN')}*
`;

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`🏠 生成示例主页: ${indexPath}`);
}

// 获取组件描述
function getComponentDescription(componentName) {
  const descriptions = {
    Button: '按钮组件，支持多种类型、尺寸和状态',
    Input: '输入框组件，支持各种输入类型和验证',
    Form: '表单组件，提供完整的数据收集和验证功能',
    // 添加更多组件描述
  };
  return descriptions[componentName] || `${componentName} 组件示例`;
}

// 主函数
function main() {
  console.log('🚀 开始生成交互式示例...');

  // 确保示例目录存在
  if (!fs.existsSync(config.examplesDir)) {
    fs.mkdirSync(config.examplesDir, { recursive: true });
  }

  // 生成所有组件的示例
  Object.keys(componentExamples).forEach(componentName => {
    console.log(`📄 生成 ${componentName} 示例...`);
    generateComponentExample(componentName);
  });

  // 生成示例主页
  generateExamplesHomepage();

  console.log('🎉 交互式示例生成完成！');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  generateComponentExample,
  generateExamplesHomepage,
};