#!/usr/bin/env node

/**
 * 文档验证脚本
 * 用于验证文档的完整性、格式和链接
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

const log = {
  info: (msg) => console.log(chalk.blue('🔍'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  title: (msg) => console.log(chalk.bold.cyan('📋'), msg),
};

// 配置
const config = {
  docsDir: path.resolve(__dirname, '../docs'),
  srcDir: path.resolve(__dirname, '../src'),
  ignorePatterns: [
    'node_modules',
    '.git',
    'dist',
    'build',
    'temp',
    '.DS_Store'
  ],
  requiredSections: [
    '## 基础用法',
    '## API',
    '## 示例',
    '## 最佳实践'
  ],
  maxFileSize: 1024 * 1024, // 1MB
  timeout: 10000 // 10 seconds
};

// 验证结果
const validationResult = {
  passed: true,
  errors: [],
  warnings: [],
  info: [],
  stats: {
    totalFiles: 0,
    totalSize: 0,
    brokenLinks: 0,
    missingFiles: 0,
    formatErrors: 0
  }
};

// 主函数
async function main() {
  log.title('文档验证');

  try {
    // 1. 检查文档结构
    await checkDocumentationStructure();

    // 2. 验证文件完整性
    await checkFileIntegrity();

    // 3. 检查格式规范
    await checkFormatting();

    // 4. 验证链接
    await checkLinks();

    // 5. 检查代码示例
    await checkCodeExamples();

    // 6. 验证组件文档
    await checkComponentDocs();

    // 7. 验证 API 文档
    await checkAPIDocs();

    // 8. 生成报告
    generateReport();

    // 9. 输出结果
    outputResults();

  } catch (error) {
    log.error('验证过程中出错:', error.message);
    validationResult.passed = false;
    outputResults();
    process.exit(1);
  }
}

// 检查文档结构
async function checkDocumentationStructure() {
  log.info('检查文档结构...');

  const requiredStructure = {
    'docs/': [
      'index.md',
      'getting-started.md',
      'components/',
      'hooks/',
      'guides/',
      'api/',
      'examples/',
      'changelog.md',
      'CONTRIBUTING.md'
    ],
    'docs/components/': [
      'basic/',
      'form/',
      'display/',
      'feedback/',
      'layout/',
      'navigation/'
    ],
    'docs/hooks/': [
      'use-theme.md',
      'use-platform.md',
      'use-responsive.md'
    ]
  };

  const checkDirectory = (basePath, requiredFiles) => {
    for (const file of requiredFiles) {
      const fullPath = path.join(basePath, file);

      if (!fs.existsSync(fullPath)) {
        validationResult.errors.push(`缺少必要文件/目录: ${file}`);
        validationResult.stats.missingFiles++;
      }
    }
  };

  for (const [basePath, files] of Object.entries(requiredStructure)) {
    const fullPath = path.resolve(config.docsDir, '..', basePath);
    checkDirectory(fullPath, files);
  }

  log.success('文档结构检查完成');
}

// 检查文件完整性
async function checkFileIntegrity() {
  log.info('检查文件完整性...');

  const traverseDirectory = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      // 跳过忽略的文件
      if (config.ignorePatterns.some(pattern => file.includes(pattern))) {
        continue;
      }

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith('.md')) {
        checkMarkdownFile(filePath);
        validationResult.stats.totalFiles++;
        validationResult.stats.totalSize += stat.size;
      }
    }
  };

  const checkMarkdownFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    // 检查文件大小
    const stat = fs.statSync(filePath);
    if (stat.size > config.maxFileSize) {
      validationResult.warnings.push(`文件过大: ${filePath} (${stat.size} bytes)`);
    }

    // 检查编码
    try {
      Buffer.from(content, 'utf8');
    } catch (error) {
      validationResult.errors.push(`文件编码错误: ${filePath}`);
    }

    // 检查是否为空
    if (content.trim().length === 0) {
      validationResult.errors.push(`空文件: ${filePath}`);
    }

    // 检查基本结构
    const lines = content.split('\n');
    let hasTitle = false;

    for (const line of lines) {
      if (line.startsWith('# ')) {
        hasTitle = true;
        break;
      }
    }

    if (!hasTitle) {
      validationResult.warnings.push(`缺少标题: ${filePath}`);
    }
  };

  traverseDirectory(config.docsDir);

  log.success('文件完整性检查完成');
}

// 检查格式规范
async function checkFormatting() {
  log.info('检查格式规范...');

  const markdownFiles = [];

  const findMarkdownFiles = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findMarkdownFiles(filePath);
      } else if (file.endsWith('.md')) {
        markdownFiles.push(filePath);
      }
    }
  };

  findMarkdownFiles(config.docsDir);

  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(config.docsDir, file);

    // 检查标题层级
    const titleMatches = content.match(/^#+\s+/gm);
    if (titleMatches) {
      for (let i = 1; i < titleMatches.length; i++) {
        const currentLevel = titleMatches[i].length;
        const previousLevel = titleMatches[i - 1].length;

        if (currentLevel > previousLevel + 1) {
          validationResult.warnings.push(`标题层级跳跃: ${relativePath}`);
          validationResult.stats.formatErrors++;
        }
      }
    }

    // 检查代码块
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];

    for (const block of codeBlocks) {
      const firstLine = block.split('\n')[0];
      if (!firstLine.includes('tsx') && !firstLine.includes('typescript') && !firstLine.includes('bash') && !firstLine.includes('json')) {
        validationResult.warnings.push(`代码块缺少语言标识: ${relativePath}`);
        validationResult.stats.formatErrors++;
      }
    }

    // 检查链接格式
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

    for (const link of links) {
      const [text, url] = link.match(/\[([^\]]+)\]\(([^)]+)\)/).slice(1);

      if (!text.trim()) {
        validationResult.warnings.push(`链接文本为空: ${relativePath}`);
        validationResult.stats.formatErrors++;
      }

      if (!url.trim()) {
        validationResult.warnings.push(`链接 URL 为空: ${relativePath}`);
        validationResult.stats.formatErrors++;
      }
    }

    // 检查表格格式
    const tables = content.match(/\|.*\|/g) || [];

    for (const table of tables) {
      const cells = table.split('|').filter(cell => cell.trim());

      if (cells.length < 2) {
        validationResult.warnings.push(`表格格式不正确: ${relativePath}`);
        validationResult.stats.formatErrors++;
      }
    }
  }

  log.success('格式规范检查完成');
}

// 检查链接
async function checkLinks() {
  log.info('检查链接...');

  const markdownFiles = [];

  const findMarkdownFiles = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findMarkdownFiles(filePath);
      } else if (file.endsWith('.md')) {
        markdownFiles.push(filePath);
      }
    }
  };

  findMarkdownFiles(config.docsDir);

  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(config.docsDir, file);

    // 提取所有链接
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

    for (const link of links) {
      const [, text, url] = link.match(/\[([^\]]+)\]\(([^)]+)\)/);

      if (url.startsWith('http')) {
        // 检查外部链接
        await checkExternalLink(url, relativePath);
      } else if (url.startsWith('#')) {
        // 检查内部锚点
        checkInternalAnchor(url, content, relativePath);
      } else {
        // 检查内部文件链接
        checkInternalFileLink(url, relativePath, file);
      }
    }
  }

  log.success('链接检查完成');
}

// 检查外部链接
async function checkExternalLink(url, sourceFile) {
  try {
    // 简化的 HTTP 检查
    const response = execSync(`curl -I -s -o /dev/null -w "%{http_code}" "${url}"`, {
      timeout: 5000,
      stdio: 'pipe'
    });

    const statusCode = response.toString().trim();

    if (statusCode !== '200') {
      validationResult.errors.push(`外部链接失效 (${statusCode}): ${url} 在 ${sourceFile}`);
      validationResult.stats.brokenLinks++;
    }
  } catch (error) {
    validationResult.warnings.push(`无法检查外部链接: ${url} 在 ${sourceFile}`);
  }
}

// 检查内部锚点
function checkInternalAnchor(anchor, content, sourceFile) {
  const anchorId = anchor.substring(1);
  const anchorPattern = new RegExp(`#{1,6}\\s+.*?${anchorId}`, 'i');

  if (!anchorPattern.test(content)) {
    validationResult.warnings.push(`内部锚点不存在: ${anchor} 在 ${sourceFile}`);
    validationResult.stats.brokenLinks++;
  }
}

// 检查内部文件链接
function checkInternalFileLink(url, sourceFile, sourceFilePath) {
  const targetPath = path.resolve(path.dirname(sourceFilePath), url);

  if (!fs.existsSync(targetPath)) {
    validationResult.errors.push(`内部文件链接不存在: ${url} 在 ${sourceFile}`);
    validationResult.stats.brokenLinks++;
  }
}

// 检查代码示例
async function checkCodeExamples() {
  log.info('检查代码示例...');

  const markdownFiles = [];

  const findMarkdownFiles = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findMarkdownFiles(filePath);
      } else if (file.endsWith('.md')) {
        markdownFiles.push(filePath);
      }
    }
  };

  findMarkdownFiles(config.docsDir);

  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(config.docsDir, file);

    // 检查 TypeScript 代码块
    const tsCodeBlocks = content.match(/```tsx[\s\S]*?```/g) || [];

    for (const block of tsCodeBlocks) {
      const code = block.replace(/```tsx\n?/, '').replace(/```$/, '');

      // 基本语法检查
      try {
        // 检查括号匹配
        const openBraces = (code.match(/{/g) || []).length;
        const closeBraces = (code.match(/}/g) || []).length;

        if (openBraces !== closeBraces) {
          validationResult.warnings.push(`括号不匹配: ${relativePath}`);
        }

        // 检查导入语句
        const imports = code.match(/import\s+.*?from/g) || [];
        for (const importStmt of imports) {
          if (!importStmt.includes('taro-uno')) {
            validationResult.warnings.push(`可疑的导入语句: ${importStmt} 在 ${relativePath}`);
          }
        }

      } catch (error) {
        validationResult.warnings.push(`代码示例解析错误: ${relativePath}`);
      }
    }
  }

  log.success('代码示例检查完成');
}

// 检查组件文档
async function checkComponentDocs() {
  log.info('检查组件文档...');

  const componentsDir = path.join(config.docsDir, 'components');

  if (!fs.existsSync(componentsDir)) {
    validationResult.errors.push('组件文档目录不存在');
    return;
  }

  const categories = fs.readdirSync(componentsDir);

  for (const category of categories) {
    const categoryDir = path.join(componentsDir, category);

    if (!fs.statSync(categoryDir).isDirectory()) {
      continue;
    }

    const files = fs.readdirSync(categoryDir);
    const componentFiles = files.filter(f => f.endsWith('.md'));

    for (const file of componentFiles) {
      const filePath = path.join(categoryDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(config.docsDir, filePath);

      // 检查必要章节
      for (const section of config.requiredSections) {
        if (!content.includes(section)) {
          validationResult.warnings.push(`缺少必要章节 "${section}": ${relativePath}`);
        }
      }

      // 检查 API 表格
      if (!content.includes('| 属性名 | 类型 |')) {
        validationResult.warnings.push(`缺少 API 表格: ${relativePath}`);
      }

      // 检查示例代码
      if (!content.includes('```tsx')) {
        validationResult.warnings.push(`缺少示例代码: ${relativePath}`);
      }
    }
  }

  log.success('组件文档检查完成');
}

// 检查 API 文档
async function checkAPIDocs() {
  log.info('检查 API 文档...');

  const apiDir = path.join(config.docsDir, 'api');

  if (!fs.existsSync(apiDir)) {
    validationResult.errors.push('API 文档目录不存在');
    return;
  }

  const apiFiles = [];

  const findAPIFiles = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findAPIFiles(filePath);
      } else if (file.endsWith('.md')) {
        apiFiles.push(filePath);
      }
    }
  };

  findAPIFiles(apiDir);

  for (const file of apiFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(config.docsDir, file);

    // 检查 API 文档结构
    if (!content.includes('# ')) {
      validationResult.errors.push(`API 文档缺少标题: ${relativePath}`);
    }

    // 检查类型定义
    if (!content.includes('interface') && !content.includes('type')) {
      validationResult.warnings.push(`API 文档缺少类型定义: ${relativePath}`);
    }
  }

  log.success('API 文档检查完成');
}

// 生成报告
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      passed: validationResult.passed,
      totalFiles: validationResult.stats.totalFiles,
      totalSize: validationResult.stats.totalSize,
      brokenLinks: validationResult.stats.brokenLinks,
      missingFiles: validationResult.stats.missingFiles,
      formatErrors: validationResult.stats.formatErrors
    },
    errors: validationResult.errors,
    warnings: validationResult.warnings,
    info: validationResult.info
  };

  const reportPath = path.join(config.docsDir, 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  log.info(`验证报告已生成: ${reportPath}`);
}

// 输出结果
function outputResults() {
  log.title('验证结果');

  // 输出统计信息
  console.log(chalk.bold('\n📊 统计信息:'));
  console.log(`  总文件数: ${validationResult.stats.totalFiles}`);
  console.log(`  总大小: ${(validationResult.stats.totalSize / 1024).toFixed(2)} KB`);
  console.log(`  损坏链接: ${validationResult.stats.brokenLinks}`);
  console.log(`  缺失文件: ${validationResult.stats.missingFiles}`);
  console.log(`  格式错误: ${validationResult.stats.formatErrors}`);

  // 输出错误
  if (validationResult.errors.length > 0) {
    console.log(chalk.bold('\n❌ 错误:'));
    validationResult.errors.forEach(error => {
      console.log(chalk.red(`  - ${error}`));
    });
  }

  // 输出警告
  if (validationResult.warnings.length > 0) {
    console.log(chalk.bold('\n⚠️  警告:'));
    validationResult.warnings.forEach(warning => {
      console.log(chalk.yellow(`  - ${warning}`));
    });
  }

  // 输出信息
  if (validationResult.info.length > 0) {
    console.log(chalk.bold('\nℹ️  信息:'));
    validationResult.info.forEach(info => {
      console.log(chalk.blue(`  - ${info}`));
    });
  }

  // 输出结果
  console.log(chalk.bold('\n🎯 结果:'));
  if (validationResult.passed) {
    console.log(chalk.green('✅ 所有检查通过！'));
  } else {
    console.log(chalk.red('❌ 发现问题，请修复后重试！'));
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  main,
  checkDocumentationStructure,
  checkFileIntegrity,
  checkFormatting,
  checkLinks,
  checkCodeExamples,
  checkComponentDocs,
  checkAPIDocs
};
