#!/usr/bin/env node

/**
 * Taro-Uno 文档生成器
 * 
 * 自动生成各类文档，包括：
 * - API 文档
 * - 组件文档
 * - 类型文档
 * - 示例文档
 * - 变更日志
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'

const log = {
  info: (msg) => console.log(chalk.blue('📚'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  title: (msg) => console.log(chalk.bold.cyan('📖'), msg)
}

// 主函数
async function main() {
  log.title('Taro-Uno 文档生成器')
  
  const args = process.argv.slice(2)
  const command = args[0]
  
  if (!command || command === '--help') {
    showHelp()
    return
  }
  
  try {
    switch (command) {
      case 'api':
        await generateAPIDocs()
        break
      case 'components':
        await generateComponentDocs()
        break
      case 'types':
        await generateTypeDocs()
        break
      case 'examples':
        await generateExampleDocs()
        break
      case 'changelog':
        await generateChangelog()
        break
      case 'all':
        await generateAllDocs()
        break
      default:
        log.error(`未知命令: ${command}`)
        showHelp()
    }
    
  } catch (error) {
    log.error('文档生成失败:', error.message)
    process.exit(1)
  }
}

// 显示帮助
function showHelp() {
  console.log(`
Taro-Uno 文档生成器

使用方法:
  node scripts/generate-docs.js <command>

命令:
  api         生成 API 文档
  components  生成组件文档
  types       生成类型文档
  examples    生成示例文档
  changelog   生成变更日志
  all         生成所有文档
  help        显示帮助信息

示例:
  node scripts/generate-docs.js api
  node scripts/generate-docs.js all
`)
}

// 生成 API 文档
async function generateAPIDocs() {
  log.info('生成 API 文档...')
  
  const packages = ['core', 'ui-basic', 'ui-display', 'ui-form', 'ui-layout', 'ui-navigation', 'ui-feedback', 'ui-theme']
  
  for (const pkg of packages) {
    const packageDir = join(process.cwd(), 'packages', pkg)
    const srcDir = join(packageDir, 'src')
    
    if (existsSync(srcDir)) {
      await generatePackageAPIDocs(pkg, srcDir)
    }
  }
  
  log.success('API 文档生成完成')
}

// 生成包 API 文档
async function generatePackageAPIDocs(packageName, srcDir) {
  const { readdirSync, statSync } = require('fs')
  const { join } = require('path')
  
  const apiDocs = []
  
  const traverseDir = (dir, relativePath = '') => {
    const items = readdirSync(dir)
    
    for (const item of items) {
      const itemPath = join(dir, item)
      const relativeItemPath = join(relativePath, item)
      const stat = statSync(itemPath)
      
      if (stat.isDirectory()) {
        traverseDir(itemPath, relativeItemPath)
      } else if (item.endsWith('.ts') && !item.endsWith('.test.ts') && !item.includes('.d.ts')) {
        const doc = generateFileAPIDoc(packageName, itemPath, relativeItemPath)
        if (doc) {
          apiDocs.push(doc)
        }
      }
    }
  }
  
  traverseDir(srcDir)
  
  // 生成文档文件
  const docsDir = join(process.cwd(), 'docs', 'api', packageName)
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true })
  }
  
  const apiDocContent = generateAPIDocContent(packageName, apiDocs)
  const apiDocPath = join(docsDir, 'README.md')
  writeFileSync(apiDocPath, apiDocContent)
}

// 生成文件 API 文档
function generateFileAPIDoc(packageName, filePath, relativePath) {
  const content = readFileSync(filePath, 'utf8')
  
  // 简单的函数和类型提取
  const functions = content.match(/export\s+(const|function|async\s+function)\s+(\w+)/g) || []
  const types = content.match(/export\s+(interface|type|enum)\s+(\w+)/g) || []
  
  if (functions.length === 0 && types.length === 0) {
    return null
  }
  
  return {
    filePath: relativePath,
    functions: functions.map(f => f.replace(/export\s+(const|function|async\s+function)\s+/, '')),
    types: types.map(t => t.replace(/export\s+(interface|type|enum)\s+/, ''))
  }
}

// 生成 API 文档内容
function generateAPIDocContent(packageName, apiDocs) {
  let content = `# ${packageName} API 文档

## 概述

${packageName} 包提供了以下 API：

`
  
  for (const doc of apiDocs) {
    content += `### ${doc.filePath}

`
    
    if (doc.functions.length > 0) {
      content += '#### 函数\n\n'
      for (const func of doc.functions) {
        content += `- \`${func}\`\n`
      }
      content += '\n'
    }
    
    if (doc.types.length > 0) {
      content += '#### 类型\n\n'
      for (const type of doc.types) {
        content += `- \`${type}\`\n`
      }
      content += '\n'
    }
  }
  
  return content
}

// 生成组件文档
async function generateComponentDocs() {
  log.info('生成组件文档...')
  
  const packages = ['ui-basic', 'ui-display', 'ui-form', 'ui-layout', 'ui-navigation', 'ui-feedback']
  
  for (const pkg of packages) {
    const packageDir = join(process.cwd(), 'packages', pkg)
    const componentsDir = join(packageDir, 'src', 'components')
    
    if (existsSync(componentsDir)) {
      await generatePackageComponentDocs(pkg, componentsDir)
    }
  }
  
  log.success('组件文档生成完成')
}

// 生成包组件文档
async function generatePackageComponentDocs(packageName, componentsDir) {
  const { readdirSync, statSync } = require('fs')
  const { join } = require('path')
  
  const components = readdirSync(componentsDir)
  
  for (const component of components) {
    const componentDir = join(componentsDir, component)
    const stat = statSync(componentDir)
    
    if (stat.isDirectory()) {
      await generateSingleComponentDoc(packageName, component, componentDir)
    }
  }
}

// 生成单个组件文档
async function generateSingleComponentDoc(packageName, componentName, componentDir) {
  const indexPath = join(componentDir, 'index.tsx')
  const typesPath = join(componentDir, 'types.ts')
  
  if (!existsSync(indexPath)) {
    return
  }
  
  const componentContent = readFileSync(indexPath, 'utf8')
  const typesContent = existsSync(typesPath) ? readFileSync(typesPath, 'utf8') : ''
  
  const docContent = generateComponentDocContent(packageName, componentName, componentContent, typesContent)
  
  const docsDir = join(process.cwd(), 'docs', 'components', packageName)
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true })
  }
  
  const docPath = join(docsDir, `${componentName}.md`)
  writeFileSync(docPath, docContent)
}

// 生成组件文档内容
function generateComponentDocContent(packageName, componentName, componentContent, typesContent) {
  // 提取 props 类型
  const propsMatch = typesContent.match(/interface\s+(\w+Props\s*{[^}]+})/s)
  const propsInterface = propsMatch ? propsMatch[1] : '未找到 props 定义'
  
  // 提取示例
  const examples = generateComponentExamples(componentName)
  
  return `# ${componentName}

${packageName} 包中的 ${componentName} 组件。

## 基础用法

\`\`\`tsx
import { ${componentName} } from '@taro-uno/${packageName}'

<${componentName}>
  内容
</${componentName}>
\`\`\`

## API

### Props

\`\`\`typescript
${propsInterface}
\`\`\`

## 示例

${examples}

## 最佳实践

1. **可访问性**: 确保组件符合 WCAG 标准
2. **性能**: 避免在渲染函数中创建新对象
3. **样式**: 使用主题变量而不是硬编码颜色
4. **测试**: 为组件编写单元测试和集成测试

## 相关组件

- [其他相关组件](./)

---
*最后更新: ${new Date().toLocaleDateString()}*`
}

// 生成组件示例
function generateComponentExamples(componentName) {
  const examples = []
  
  // 基础示例
  examples.push(`### 基础用法

\`\`\`tsx
<${componentName}>
  基础内容
</${componentName}>
\`\`\``)
  
  // 不同状态示例
  examples.push(`### 不同状态

\`\`\`tsx
<${componentName} disabled>
  禁用状态
</${componentName}>

<${componentName} loading>
  加载状态
</${componentName}>
\`\`\``)
  
  return examples.join('\n\n')
}

// 生成类型文档
async function generateTypeDocs() {
  log.info('生成类型文档...')
  
  const packages = ['core', 'ui-basic', 'ui-display', 'ui-form', 'ui-layout', 'ui-navigation', 'ui-feedback', 'ui-theme']
  
  for (const pkg of packages) {
    const packageDir = join(process.cwd(), 'packages', pkg)
    const typesDir = join(packageDir, 'src', 'types')
    
    if (existsSync(typesDir)) {
      await generatePackageTypeDocs(pkg, typesDir)
    }
  }
  
  log.success('类型文档生成完成')
}

// 生成包类型文档
async function generatePackageTypeDocs(packageName, typesDir) {
  const { readdirSync, statSync } = require('fs')
  const { join } = require('path')
  
  const typeFiles = readdirSync(typesDir)
  
  for (const typeFile of typeFiles) {
    if (typeFile.endsWith('.ts')) {
      const typeFilePath = join(typesDir, typeFile)
      await generateSingleTypeDoc(packageName, typeFile, typeFilePath)
    }
  }
}

// 生成单个类型文档
async function generateSingleTypeDoc(packageName, typeFileName, typeFilePath) {
  const typeContent = readFileSync(typeFilePath, 'utf8')
  
  const docContent = generateTypeDocContent(packageName, typeFileName, typeContent)
  
  const docsDir = join(process.cwd(), 'docs', 'api', packageName, 'types')
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true })
  }
  
  const docPath = join(docsDir, `${typeFileName.replace('.ts', '')}.md`)
  writeFileSync(docPath, docContent)
}

// 生成类型文档内容
function generateTypeDocContent(packageName, typeFileName, typeContent) {
  // 提取类型定义
  const interfaces = typeContent.match(/interface\s+(\w+)\s*{[^}]+}/gs) || []
  const types = typeContent.match(/type\s+(\w+)\s*=[^;]+;/gs) || []
  const enums = typeContent.match(/enum\s+(\w+)\s*{[^}]+}/gs) || []
  
  let content = `# ${typeFileName.replace('.ts', '')} 类型定义

${packageName} 包中的类型定义。

## 接口 (Interfaces)

`
  
  for (const iface of interfaces) {
    const nameMatch = iface.match(/interface\s+(\w+)/)
    const name = nameMatch ? nameMatch[1] : 'Unknown'
    content += `### ${name}

\`\`\`typescript
${iface}
\`\`\`

`
  }
  
  if (types.length > 0) {
    content += '## 类型别名 (Type Aliases)\n\n'
    
    for (const type of types) {
      const nameMatch = type.match(/type\s+(\w+)/)
      const name = nameMatch ? nameMatch[1] : 'Unknown'
      content += `### ${name}

\`\`\`typescript
${type}
\`\`\`

`
    }
  }
  
  if (enums.length > 0) {
    content += '## 枚举 (Enums)\n\n'
    
    for (const enumDef of enums) {
      const nameMatch = enumDef.match(/enum\s+(\w+)/)
      const name = nameMatch ? nameMatch[1] : 'Unknown'
      content += `### ${name}

\`\`\`typescript
${enumDef}
\`\`\`

`
    }
  }
  
  return content
}

// 生成示例文档
async function generateExampleDocs() {
  log.info('生成示例文档...')
  
  const examples = [
    {
      name: '基础用法',
      code: `import { Button, Text, View } from '@taro-uno/ui-basic'

const BasicExample = () => {
  return (
    <View>
      <Text>Hello Taro-Uno!</Text>
      <Button type="primary">点击我</Button>
    </View>
  )
}`
    },
    {
      name: '表单示例',
      code: `import { Form, Input, Button } from '@taro-uno/ui-form'

const FormExample = () => {
  return (
    <Form>
      <Form.Item label="用户名" name="username">
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}`
    }
  ]
  
  const examplesDir = join(process.cwd(), 'docs', 'examples')
  if (!existsSync(examplesDir)) {
    mkdirSync(examplesDir, { recursive: true })
  }
  
  for (const example of examples) {
    const examplePath = join(examplesDir, `${example.name}.md`)
    const exampleContent = `# ${example.name}

\`\`\`tsx
${example.code}
\`\`\`

## 效果

${example.name} 的实际效果。

## 使用场景

- 场景一
- 场景二
- 场景三

---
*最后更新: ${new Date().toLocaleDateString()}*`
    
    writeFileSync(examplePath, exampleContent)
  }
  
  log.success('示例文档生成完成')
}

// 生成变更日志
async function generateChangelog() {
  log.info('生成变更日志...')
  
  try {
    // 使用 changeset 生成变更日志
    execSync('npx changeset version', { stdio: 'inherit' })
    
    // 读取生成的变更日志
    const changelogPath = join(process.cwd(), 'CHANGELOG.md')
    if (existsSync(changelogPath)) {
      const changelog = readFileSync(changelogPath, 'utf8')
      
      // 添加格式化的变更日志到文档
      const docsChangelogPath = join(process.cwd(), 'docs', 'reference', 'changelog.md')
      const docsDir = dirname(docsChangelogPath)
      
      if (!existsSync(docsDir)) {
        mkdirSync(docsDir, { recursive: true })
      }
      
      writeFileSync(docsChangelogPath, changelog)
    }
    
    log.success('变更日志生成完成')
  } catch (error) {
    log.warning('无法生成变更日志，请确保已安装 changeset')
  }
}

// 生成所有文档
async function generateAllDocs() {
  log.info('生成所有文档...')
  
  await generateAPIDocs()
  await generateComponentDocs()
  await generateTypeDocs()
  await generateExampleDocs()
  await generateChangelog()
  
  log.success('所有文档生成完成')
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export {
  generateAPIDocs,
  generateComponentDocs,
  generateTypeDocs,
  generateExampleDocs,
  generateChangelog,
  generateAllDocs
}