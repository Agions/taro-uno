#!/usr/bin/env node

/**
 * 自动生成 API 文档脚本
 * 从 TypeScript 类型定义生成组件 API 文档
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const config = {
  srcDir: path.join(__dirname, '..', 'src'),
  docsDir: path.join(__dirname, '..', 'docs'),
  componentsDir: path.join(__dirname, '..', 'src', 'components'),
  outputDir: path.join(__dirname, '..', 'docs', 'api'),
};

// 组件类型映射
const componentTypes = {
  basic: ['Button', 'Icon', 'Text', 'Divider'],
  form: ['Form', 'Input', 'Select', 'Checkbox', 'Radio', 'DatePicker', 'Switch', 'Textarea'],
  display: ['Card', 'List', 'Table', 'Avatar', 'Badge', 'Calendar', 'Progress', 'Tag', 'Timeline'],
  feedback: ['Loading', 'Message', 'Modal', 'Toast'],
  layout: ['Container', 'Row', 'Col', 'Grid', 'Space'],
  navigation: ['Pagination', 'Tabs'],
};

// 生成单个组件的 API 文档
function generateComponentApiDoc(componentName, category) {
  const componentPath = path.join(config.componentsDir, category, componentName.toLowerCase());
  const typesPath = path.join(componentPath, `${componentName}.types.ts`);
  const componentPathFile = path.join(componentPath, `${componentName}.tsx`);

  if (!fs.existsSync(typesPath)) {
    console.warn(`类型文件不存在: ${typesPath}`);
    return null;
  }

  // 读取类型定义
  const typesContent = fs.readFileSync(typesPath, 'utf8');
  const componentContent = fs.existsSync(componentPathFile) ?
    fs.readFileSync(componentPathFile, 'utf8') : '';

  // 解析接口定义
  const interfaceMatch = typesContent.match(/export\s+interface\s+(\w+Props)\s*{([^}]+)}/s);
  const typeMatch = typesContent.match(/export\s+type\s+(\w+Props)\s*=\s*([^;]+);/s);

  let propsInterface = null;
  let propsDefinition = '';

  if (interfaceMatch) {
    propsInterface = interfaceMatch[1];
    propsDefinition = interfaceMatch[2];
  } else if (typeMatch) {
    propsInterface = typeMatch[1];
    propsDefinition = typeMatch[2];
  }

  if (!propsInterface) {
    console.warn(`无法找到 ${componentName} 的 Props 接口定义`);
    return null;
  }

  // 解析属性
  const props = parseProps(propsDefinition);

  // 生成文档
  const docContent = generateApiDocumentation(componentName, category, props, componentContent);

  return docContent;
}

// 解析属性定义
function parseProps(definition) {
  const props = [];
  const propRegex = /(\w+)\s*:\s*([^;]+);?\s*\/\/?\s*(.*)$/gm;
  let match;

  while ((match = propRegex.exec(definition)) !== null) {
    const [, name, type, comment] = match;

    // 跳过内部属性
    if (name.startsWith('_')) continue;

    props.push({
      name,
      type: type.trim(),
      description: comment.trim(),
      required: !type.includes('| undefined') && !type.includes('?'),
    });
  }

  return props;
}

// 生成 API 文档内容
function generateApiDocumentation(componentName, category, props, componentContent) {
  const description = getComponentDescription(componentContent);
  const examples = getComponentExamples(componentContent);

  return `# ${componentName} API 文档

${description}

---

## 接口定义

\`\`\`typescript
interface ${componentName}Props {
  ${props.map(prop => {
    const optional = prop.required ? '' : '?';
    return `${prop.name}${optional}: ${prop.type};${prop.description ? ` // ${prop.description}` : ''}`;
  }).join('\n  ')}
}
\`\`\`

---

## 属性详解

${generatePropsTable(props)}

---

## 使用示例

${examples}

---

## 类型定义

### Props 类型

\`\`\`typescript
import type { ${componentName}Props } from '@taro-uno/ui';

interface MyComponentProps extends ${componentName}Props {
  customProp: string;
}
\`\`\`

### 默认值

\`\`\`typescript
const defaultProps: Partial<${componentName}Props> = {
  // 默认值定义
};
\`\`\`

---

## 相关链接

- [组件使用指南](../components/${category}/${componentName.toLowerCase()}.md)
- [主题定制](../theme.md)
- [最佳实践](../guides/best-practices.md)

---

*最后更新：${new Date().toLocaleDateString('zh-CN')}*
`;
}

// 生成属性表格
function generatePropsTable(props) {
  if (props.length === 0) return '暂无属性定义';

  let table = '| 属性名 | 类型 | 默认值 | 必填 | 说明 |\n';
  table += '|--------|------|--------|------|------|\n';

  props.forEach(prop => {
    const defaultValue = getDefaultValue(prop.type);
    const required = prop.required ? '是' : '否';
    table += `| ${prop.name} | \`${prop.type}\` | ${defaultValue} | ${required} | ${prop.description} |\n`;
  });

  return table;
}

// 获取默认值
function getDefaultValue(type) {
  if (type.includes('string')) return "''";
  if (type.includes('number')) return '0';
  if (type.includes('boolean')) return 'false';
  if (type.includes('array')) return '[]';
  if (type.includes('object')) return '{}';
  return '-';
}

// 获取组件描述
function getComponentDescription(content) {
  const commentMatch = content.match(/\/\*\*[\s\S]*?\*\/\s*export/);
  if (commentMatch) {
    const comment = commentMatch[0];
    const description = comment.match(/\*\s*([^\n]+)/g);
    if (description) {
      return description
        .map(line => line.replace(/^\*\s*/, ''))
        .filter(line => line && !line.startsWith('@'))
        .join('\n\n');
    }
  }
  return `${componentName} 组件的详细 API 文档。`;
}

// 获取使用示例
function getComponentExamples(content) {
  // 从测试文件或组件文件中提取示例
  return `
### 基础用法

\`\`\`tsx
import { ${componentName} } from '@taro-uno/ui'

function App() {
  return <${componentName} />
}
\`\`\`

### 自定义属性

\`\`\`tsx
import { ${componentName} } from '@taro-uno/ui'

function App() {
  return (
    <${componentName}
      // 自定义属性
      {/* 更多属性 */}
    />
  )
}
\`\`\`
`;
}

// 主函数
function main() {
  console.log('🚀 开始生成 API 文档...');

  // 确保输出目录存在
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // 生成所有组件的 API 文档
  Object.entries(componentTypes).forEach(([category, components]) => {
    console.log(`📁 处理 ${category} 组件...`);

    components.forEach(componentName => {
      console.log(`  📄 生成 ${componentName} API 文档...`);

      const docContent = generateComponentApiDoc(componentName, category);
      if (docContent) {
        const outputPath = path.join(config.outputDir, `${componentName.toLowerCase()}.md`);
        fs.writeFileSync(outputPath, docContent, 'utf8');
        console.log(`    ✅ 生成完成: ${outputPath}`);
      }
    });
  });

  // 生成 API 索引
  generateApiIndex();

  console.log('🎉 API 文档生成完成！');
}

// 生成 API 索引
function generateApiIndex() {
  const indexPath = path.join(config.outputDir, 'index.md');

  let indexContent = `# API 文档索引

Taro-Uno UI 提供完整的 API 文档，帮助开发者快速了解每个组件的属性和方法。

---

## 组件 API

`;

  Object.entries(componentTypes).forEach(([category, components]) => {
    indexContent += `### ${getCategoryName(category)}

`;

    components.forEach(componentName => {
      indexContent += `- [${componentName}](${componentName.toLowerCase()}.md)\n`;
    });

    indexContent += '\n';
  });

  indexContent += `---

## 类型定义

所有组件都提供完整的 TypeScript 类型定义，确保开发时的类型安全。

\`\`\`typescript
import type {
  ButtonProps,
  InputProps,
  FormProps
} from '@taro-uno/ui'
\`\`\`

---

## 相关链接

- [组件使用指南](../components/basic/button.md)
- [主题定制](../theme.md)
- [最佳实践](../guides/best-practices.md)
- [开发指南](../developer-guide.md)

---

*最后更新：${new Date().toLocaleDateString('zh-CN')}*
`;

  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`📋 API 索引生成完成: ${indexPath}`);
}

// 获取分类名称
function getCategoryName(category) {
  const names = {
    basic: '基础组件',
    form: '表单组件',
    display: '展示组件',
    feedback: '反馈组件',
    layout: '布局组件',
    navigation: '导航组件',
  };
  return names[category] || category;
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  generateComponentApiDoc,
  generateApiIndex,
};