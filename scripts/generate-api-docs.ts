#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { glob } from 'glob';

interface ComponentAPI {
  name: string;
  description: string;
  category: string;
  props: PropDefinition[];
  events: EventDefinition[];
  methods: MethodDefinition[];
  slots: SlotDefinition[];
  examples: ComponentExample[];
  platforms: string[];
  version: string;
}

interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  options?: string[];
  deprecated?: boolean;
  since?: string;
}

interface EventDefinition {
  name: string;
  description: string;
  payload: string;
  deprecated?: boolean;
  since?: string;
}

interface MethodDefinition {
  name: string;
  description: string;
  parameters: Parameter[];
  returnType: string;
  deprecated?: boolean;
  since?: string;
}

interface SlotDefinition {
  name: string;
  description: string;
  parameters?: string;
  deprecated?: boolean;
  since?: string;
}

interface ComponentExample {
  title: string;
  description: string;
  code: string;
  platform?: string;
  live?: boolean;
}

interface ParsedComponent {
  sourceFile: string;
  className: string;
  componentName: string;
  props: PropDefinition[];
  events: EventDefinition[];
  methods: MethodDefinition[];
  slots: SlotDefinition[];
  imports: string[];
  exports: string[];
  category: string;
  platforms: string[];
}

class APIDocumentationGenerator {
  private project: ts.Project;
  private typeChecker: ts.TypeChecker;
  private program: ts.Program;

  constructor(private configPath: string = 'tsconfig.json') {
    this.program = ts.createProgram([configPath], {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
    });

    this.typeChecker = this.program.getTypeChecker();
  }

  async generate(): Promise<void> {
    console.log('🚀 开始生成 API 文档...');

    const componentFiles = await this.findComponentFiles();
    const components = await this.parseComponents(componentFiles);

    console.log(`📦 发现 ${components.length} 个组件`);

    for (const component of components) {
      await this.generateComponentDoc(component);
    }

    await this.generateAPIIndex(components);
    await this.generateNavigation(components);

    console.log('✅ API 文档生成完成!');
  }

  private async findComponentFiles(): Promise<string[]> {
    const pattern = 'src/components/**/index.tsx';
    const files = await glob(pattern, {
      cwd: process.cwd(),
      ignore: ['**/node_modules/**', '**/dist/**'],
    });
    return files;
  }

  private async parseComponents(filePaths: string[]): Promise<ParsedComponent[]> {
    const components: ParsedComponent[] = [];

    for (const filePath of filePaths) {
      try {
        const component = await this.parseComponentFile(filePath);
        if (component) {
          components.push(component);
        }
      } catch (error) {
        console.warn(`⚠️  解析组件失败: ${filePath}`, error);
      }
    }

    return components;
  }

  private async parseComponentFile(filePath: string): Promise<ParsedComponent | null> {
    const sourceFile = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf-8'), ts.ScriptTarget.ESNext, true);

    const componentName = this.extractComponentName(sourceFile, filePath);
    if (!componentName) {
      return null;
    }

    const category = this.extractCategoryFromPath(filePath);
    const platforms = this.extractPlatformsFromComments(sourceFile);

    return {
      sourceFile: filePath,
      className: componentName,
      componentName: componentName.toLowerCase(),
      props: this.extractProps(sourceFile),
      events: this.extractEvents(sourceFile),
      methods: this.extractMethods(sourceFile),
      slots: this.extractSlots(sourceFile),
      imports: this.extractImports(sourceFile),
      exports: this.extractExports(sourceFile),
      category,
      platforms,
    };
  }

  private extractComponentName(sourceFile: ts.SourceFile, filePath: string): string | null {
    // 从文件路径提取组件名
    const pathParts = filePath.split('/');
    const componentName = pathParts[pathParts.length - 2]; // 倒数第二个是组件名

    // 从源码中验证组件名
    for (const node of sourceFile.statements) {
      if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const exportItem of node.exportClause.elements) {
          if (exportItem.name.text === componentName) {
            return componentName;
          }
        }
      }
    }

    return componentName;
  }

  private extractCategoryFromPath(filePath: string): string {
    const parts = filePath.split('/');
    const componentsIndex = parts.indexOf('components');
    if (componentsIndex !== -1 && parts.length > componentsIndex + 1) {
      return parts[componentsIndex + 1];
    }
    return 'unknown';
  }

  private extractPlatformsFromComments(sourceFile: ts.SourceFile): string[] {
    const defaultPlatforms = ['wechat', 'alipay', 'baidu', 'bytedance', 'qq', 'h5', 'react-native'];

    // 从注释中提取平台信息
    for (const node of sourceFile.statements) {
      if (ts.isInterfaceDeclaration(node) && node.jsDoc) {
        for (const doc of node.jsDoc) {
          if (doc.comment) {
            const platformMatch = doc.comment.match(/@platforms?\s+(.+)/i);
            if (platformMatch) {
              return platformMatch[1].split(/[\s,]+/).filter((p) => p);
            }
          }
        }
      }
    }

    return defaultPlatforms;
  }

  private extractProps(sourceFile: ts.SourceFile): PropDefinition[] {
    const props: PropDefinition[] = [];

    for (const node of sourceFile.statements) {
      if (ts.isInterfaceDeclaration(node) && node.name.text.includes('Props')) {
        for (const member of node.members) {
          if (ts.isPropertySignature(member)) {
            const prop = this.extractPropertyFromSignature(member);
            if (prop) {
              props.push(prop);
            }
          }
        }
      }
    }

    return props;
  }

  private extractPropertyFromSignature(member: ts.PropertySignature): PropDefinition | null {
    const name = member.name.getText();
    const type = member.type?.getText() || 'any';
    const description = this.extractJSDocDescription(member);
    const isRequired = !member.questionToken;

    // 提取默认值
    let defaultValue: string | undefined;
    if (member.jsDoc) {
      for (const doc of member.jsDoc) {
        if (doc.comment) {
          const defaultMatch = doc.comment.match(/@default\s+(.+)/i);
          if (defaultMatch) {
            defaultValue = defaultMatch[1].trim();
          }
        }
      }
    }

    // 提取选项
    let options: string[] | undefined;
    if (type.includes("'") || type.includes('"')) {
      const matches = type.match(/['"]([^'"]+)['"]/g);
      if (matches) {
        options = matches.map((m) => m.slice(1, -1));
      }
    }

    return {
      name,
      type,
      required: isRequired,
      defaultValue,
      description,
      options,
    };
  }

  private extractEvents(sourceFile: ts.SourceFile): EventDefinition[] {
    const events: EventDefinition[] = [];

    // 从组件定义中提取事件
    for (const node of sourceFile.statements) {
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (
            ts.isVariableDeclaration(declaration) &&
            declaration.initializer &&
            ts.isArrowFunction(declaration.initializer)
          ) {
            // 查找事件处理函数
            const eventName = declaration.name.getText();
            if (eventName.startsWith('on')) {
              events.push({
                name: eventName,
                description: `触发 ${eventName} 事件`,
                payload: 'Event',
              });
            }
          }
        }
      }
    }

    return events;
  }

  private extractMethods(sourceFile: ts.SourceFile): MethodDefinition[] {
    const methods: MethodDefinition[] = [];

    for (const node of sourceFile.statements) {
      if (ts.isClassDeclaration(node)) {
        for (const member of node.members) {
          if (ts.isMethodDeclaration(member) && member.name) {
            const method = this.extractMethodFromDeclaration(member);
            if (method) {
              methods.push(method);
            }
          }
        }
      }
    }

    return methods;
  }

  private extractMethodFromDeclaration(member: ts.MethodDeclaration): MethodDefinition | null {
    const name = member.name?.getText();
    if (!name) return null;

    const parameters = member.parameters.map((param) => ({
      name: param.name.getText(),
      type: param.type?.getText() || 'any',
      required: !param.questionToken,
    }));

    const returnType = member.type?.getText() || 'void';
    const description = this.extractJSDocDescription(member);

    return {
      name,
      description: description || `${name} 方法`,
      parameters,
      returnType,
    };
  }

  private extractSlots(sourceFile: ts.SourceFile): SlotDefinition[] {
    const slots: SlotDefinition[] = [];

    // 从组件定义中提取插槽信息
    for (const node of sourceFile.statements) {
      if (ts.isInterfaceDeclaration(node) && node.name.text.includes('Slots')) {
        for (const member of node.members) {
          if (ts.isPropertySignature(member)) {
            const name = member.name.getText();
            const description = this.extractJSDocDescription(member);

            slots.push({
              name,
              description: description || `${name} 插槽`,
            });
          }
        }
      }
    }

    return slots;
  }

  private extractImports(sourceFile: ts.SourceFile): string[] {
    const imports: string[] = [];

    for (const node of sourceFile.statements) {
      if (ts.isImportDeclaration(node)) {
        const importText = node.getText();
        imports.push(importText);
      }
    }

    return imports;
  }

  private extractExports(sourceFile: ts.SourceFile): string[] {
    const exports: string[] = [];

    for (const node of sourceFile.statements) {
      if (ts.isExportDeclaration(node)) {
        const exportText = node.getText();
        exports.push(exportText);
      }
    }

    return exports;
  }

  private extractJSDocDescription(node: ts.Node): string {
    const jsDocTags = ts.getJSDocTags(node);
    if (jsDocTags.length > 0) {
      const comment = ts.getTextOfJSDocComment(jsDocTags[0].comment);
      return comment || '';
    }
    return '';
  }

  private async generateComponentDoc(component: ParsedComponent): Promise<void> {
    const template = await this.loadTemplate();
    const content = this.replaceTemplateVariables(template, component);

    const outputPath = path.join('docs', 'components', component.category, `${component.componentName}.md`);

    // 确保目录存在
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`📝 生成组件文档: ${outputPath}`);
  }

  private async loadTemplate(): Promise<string> {
    const templatePath = path.join('docs', 'components', 'component-template.md');
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, 'utf-8');
    }

    // 如果模板不存在，使用默认模板
    return this.getDefaultTemplate();
  }

  private getDefaultTemplate(): string {
    return `---
title: "{{COMPONENT_NAME}} {{COMPONENT_TYPE}}"
description: "{{COMPONENT_DESCRIPTION}}"
category: "{{COMPONENT_CATEGORY}}"
platforms: "{{SUPPORTED_PLATFORMS}}"
version: "{{COMPONENT_VERSION}}"
---

# {{COMPONENT_NAME}} {{COMPONENT_TYPE}}

{{COMPONENT_DESCRIPTION}}

## API

### Props

{{PROPS_TABLE}}

### Events

{{EVENTS_TABLE}}

### Methods

{{METHODS_TABLE}}

## 使用示例

\`\`\`tsx
import { {{COMPONENT_NAME}} } from 'taro-uno-ui'

function App() {
  return (
    <{{COMPONENT_NAME}}>
      示例内容
    </{{COMPONENT_NAME}}>
  )
}
\`\`\`
`;
  }

  private replaceTemplateVariables(template: string, component: ParsedComponent): string {
    return template
      .replace(/{{COMPONENT_NAME}}/g, component.className)
      .replace(/{{COMPONENT_TYPE}}/g, '组件')
      .replace(/{{COMPONENT_DESCRIPTION}}/g, `${component.className} 组件`)
      .replace(/{{COMPONENT_CATEGORY}}/g, component.category)
      .replace(/{{SUPPORTED_PLATFORMS}}/g, component.platforms.join(', '))
      .replace(/{{COMPONENT_VERSION}}/g, '1.0.0')
      .replace(/{{PROPS_TABLE}}/g, this.generatePropsTable(component.props))
      .replace(/{{EVENTS_TABLE}}/g, this.generateEventsTable(component.events))
      .replace(/{{METHODS_TABLE}}/g, this.generateMethodsTable(component.methods))
      .replace(/{{COMPONENT_CLASS_NAME}}/g, component.className.toLowerCase())
      .replace(/{{COMPONENT_PREFIX}}/g, component.className.toLowerCase())
      .replace(/{{BASIC_USAGE_DESCRIPTION}}/g, `${component.className} 组件的基础用法`)
      .replace(/{{BASIC_EXAMPLE_CODE}}/g, this.generateBasicExample(component))
      .replace(/{{BASIC_EXAMPLE_DESCRIPTION}}/g, `展示 ${component.className} 组件的基本用法`);
  }

  private generatePropsTable(props: PropDefinition[]): string {
    if (props.length === 0) {
      return '| 暂无属性 | | | | |\n|---|---|---|---|---|';
    }

    const header = '| 参数 | 说明 | 类型 | 默认值 | 必填 | 版本 |\n|------|------|------|--------|------|------|';
    const rows = props
      .map((prop) => {
        const required = prop.required ? '✅' : '❌';
        const options = prop.options ? prop.options.join(', ') : '-';
        return `| ${prop.name} | ${prop.description} | \`${prop.type}\` | ${prop.defaultValue || '-'} | ${required} | 1.0.0 |`;
      })
      .join('\n');

    return `${header}\n${rows}`;
  }

  private generateEventsTable(events: EventDefinition[]): string {
    if (events.length === 0) {
      return '| 暂无事件 | | | |\n|---|---|---|---|';
    }

    const header = '| 事件名 | 说明 | 参数类型 | 回调参数 | 版本 |\n|--------|------|----------|----------|------|';
    const rows = events
      .map((event) => {
        return `| ${event.name} | ${event.description} | \`${event.payload}\` | 事件对象 | 1.0.0 |`;
      })
      .join('\n');

    return `${header}\n${rows}`;
  }

  private generateMethodsTable(methods: MethodDefinition[]): string {
    if (methods.length === 0) {
      return '| 暂无方法 | | | |\n|---|---|---|---|';
    }

    const header = '| 方法名 | 说明 | 参数 | 返回值 | 版本 |\n|--------|------|------|--------|------|';
    const rows = methods
      .map((method) => {
        const params = method.parameters.map((p) => `${p.name}: ${p.type}`).join(', ');
        return `| ${method.name} | ${method.description} | \`${params}\` | \`${method.returnType}\` | 1.0.0 |`;
      })
      .join('\n');

    return `${header}\n${rows}`;
  }

  private generateBasicExample(component: ParsedComponent): string {
    return `import { ${component.className} } from 'taro-uno-ui'

function App() {
  return (
    <${component.className}>
      基础示例
    </${component.className}>
  )
}`;
  }

  private async generateAPIIndex(components: ParsedComponent[]): Promise<void> {
    const categories = this.groupComponentsByCategory(components);
    const content = this.generateAPIIndexContent(categories);

    const outputPath = path.join('docs', 'api', 'components.md');

    // 确保目录存在
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`📝 生成 API 索引: ${outputPath}`);
  }

  private groupComponentsByCategory(components: ParsedComponent[]): Record<string, ParsedComponent[]> {
    const categories: Record<string, ParsedComponent[]> = {};

    for (const component of components) {
      if (!categories[component.category]) {
        categories[component.category] = [];
      }
      categories[component.category].push(component);
    }

    return categories;
  }

  private generateAPIIndexContent(categories: Record<string, ParsedComponent[]>): string {
    let content = `# 组件 API 参考

本文档包含了所有组件的详细 API 参考。

## 组件分类

`;

    for (const [category, components] of Object.entries(categories)) {
      const categoryName = this.getCategoryDisplayName(category);
      content += `### ${categoryName}\n\n`;

      for (const component of components) {
        content += `- [${component.className}](../components/${category}/${component.componentName}/)\n`;
      }

      content += '\n';
    }

    return content;
  }

  private getCategoryDisplayName(category: string): string {
    const categoryNames: Record<string, string> = {
      basic: '基础组件',
      form: '表单组件',
      layout: '布局组件',
      navigation: '导航组件',
      display: '展示组件',
      feedback: '反馈组件',
    };

    return categoryNames[category] || category;
  }

  private async generateNavigation(components: ParsedComponent[]): Promise<void> {
    const categories = this.groupComponentsByCategory(components);
    const navigation = this.generateNavigationConfig(categories);

    const outputPath = path.join('docs', '.vitepress', 'navigation.generated.ts');

    fs.writeFileSync(outputPath, navigation, 'utf-8');
    console.log(`📝 生成导航配置: ${outputPath}`);
  }

  private generateNavigationConfig(categories: Record<string, ParsedComponent[]>): string {
    let navigation = `// 自动生成的导航配置
// 请勿手动修改此文件

export const componentNavigation = {\n`;

    for (const [category, components] of Object.entries(categories)) {
      const categoryName = this.getCategoryDisplayName(category);
      navigation += `  '${category}': {\n`;
      navigation += `    text: '${categoryName}',\n`;
      navigation += `    items: [\n`;

      for (const component of components) {
        navigation += `      { text: '${component.className}', link: '/components/${category}/${component.componentName}/' },\n`;
      }

      navigation += `    ]\n`;
      navigation += `  },\n`;
    }

    navigation += `}\n`;
    return navigation;
  }
}

// 主函数
async function main() {
  try {
    const generator = new APIDocumentationGenerator();
    await generator.generate();
  } catch (error) {
    console.error('❌ 生成 API 文档失败:', error);
    process.exit(1);
  }
}

// 直接执行主函数（ESM 环境）
void main();

export { APIDocumentationGenerator };
