#!/usr/bin/env node

/**
 * 文档质量验证脚本
 * 检查文档的质量、完整性、格式和最佳实践
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const config = {
  docsDir: path.join(__dirname, '..', 'docs'),
  srcDir: path.join(__dirname, '..', 'src'),
  componentsDir: path.join(__dirname, '..', 'src', 'components'),
};

// 质量检查结果
const results = {
  passed: [],
  warnings: [],
  errors: [],
  info: [],
};

// 日志函数
function log(type, message) {
  results[type].push(message);
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// 获取所有组件
function getAllComponents() {
  const components = [];
  const categories = fs.readdirSync(config.componentsDir);

  categories.forEach(category => {
    const categoryDir = path.join(config.componentsDir, category);
    const stats = fs.statSync(categoryDir);

    if (stats.isDirectory()) {
      const componentDirs = fs.readdirSync(categoryDir);

      componentDirs.forEach(component => {
        const componentDir = path.join(categoryDir, component);
        const componentStats = fs.statSync(componentDir);

        if (componentStats.isDirectory()) {
          const indexFile = path.join(componentDir, 'index.tsx');
          if (fs.existsSync(indexFile)) {
            components.push({
              name: component,
              category,
              path: componentDir,
              indexPath: indexFile,
            });
          }
        }
      });
    }
  });

  return components;
}

// 检查文档结构
function checkDocumentationStructure() {
  log('info', '🔍 检查文档结构...');

  const requiredFiles = [
    'index.md',
    'getting-started.md',
    'quick-start.md',
    'theme.md',
    'contributing.md',
    'changelog.md',
    'faq.md',
    'guides/best-practices.md',
    'components/basic/button.md',
    'components/form/form.md',
    'hooks/use-theme.md',
  ];

  const missingFiles = [];

  requiredFiles.forEach(file => {
    const filePath = path.join(config.docsDir, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });

  if (missingFiles.length === 0) {
    log('passed', '✅ 所有必需的文档文件都存在');
  } else {
    missingFiles.forEach(file => {
      log('errors', `❌ 缺少必需文件: ${file}`);
    });
  }

  return missingFiles.length === 0;
}

// 检查组件文档完整性
function checkComponentDocumentation() {
  log('info', '🔍 检查组件文档完整性...');

  const components = getAllComponents();
  let documentedCount = 0;
  let missingDocs = [];

  components.forEach(component => {
    const docPath = path.join(config.docsDir, 'components', component.category, `${component.name.toLowerCase()}.md`);

    if (fs.existsSync(docPath)) {
      documentedCount++;

      // 检查文档质量
      const content = fs.readFileSync(docPath, 'utf8');
      const qualityIssues = checkDocumentQuality(content, component.name);

      qualityIssues.forEach(issue => {
        log('warnings', `⚠️  ${component.name}: ${issue}`);
      });
    } else {
      missingDocs.push(`${component.category}/${component.name}`);
    }
  });

  const coverage = (documentedCount / components.length) * 100;
  log('info', `📊 组件文档覆盖率: ${coverage.toFixed(1)}% (${documentedCount}/${components.length})`);

  if (coverage >= 80) {
    log('passed', `✅ 组件文档覆盖率良好: ${coverage.toFixed(1)}%`);
  } else {
    log('warnings', `⚠️  组件文档覆盖率较低: ${coverage.toFixed(1)}%`);
  }

  if (missingDocs.length > 0) {
    missingDocs.forEach(doc => {
      log('errors', `❌ 缺少组件文档: ${doc}`);
    });
  }

  return { coverage, documentedCount, totalComponents: components.length, missingDocs };
}

// 检查单个文档质量
function checkDocumentQuality(content, componentName) {
  const issues = [];

  // 检查必需的章节
  const requiredSections = [
    '## 基础用法',
    '## API',
    '## Props',
  ];

  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      issues.push(`缺少章节: ${section}`);
    }
  });

  // 检查代码示例
  if (!content.includes('```tsx')) {
    issues.push('缺少代码示例');
  }

  // 检查最佳实践章节
  if (!content.includes('## 最佳实践')) {
    issues.push('缺少最佳实践章节');
  }

  // 检查注意事项章节
  if (!content.includes('## 注意事项')) {
    issues.push('缺少注意事项章节');
  }

  // 检查中文文档质量
  if (!content.match(/[\u4e00-\u9fa5]/)) {
    issues.push('建议添加中文说明');
  }

  // 检查链接
  const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
  const brokenLinks = [];

  links.forEach(link => {
    const url = link.match(/\(([^)]+)\)/)[1];
    if (url.startsWith('./') || url.startsWith('../')) {
      // 检查内部链接
      const absoluteUrl = path.resolve(path.dirname(config.docsDir), url);
      if (!fs.existsSync(absoluteUrl)) {
        brokenLinks.push(url);
      }
    }
  });

  if (brokenLinks.length > 0) {
    issues.push(`存在失效链接: ${brokenLinks.join(', ')}`);
  }

  return issues;
}

// 检查文档格式
function checkDocumentationFormat() {
  log('info', '🔍 检查文档格式...');

  const formatIssues = [];

  // 递归查找所有 markdown 文件
  function findMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    const markdownFiles = [];

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !file.startsWith('.')) {
        markdownFiles.push(...findMarkdownFiles(filePath));
      } else if (file.endsWith('.md')) {
        markdownFiles.push(filePath);
      }
    });

    return markdownFiles;
  }

  const markdownFiles = findMarkdownFiles(config.docsDir);

  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(config.docsDir, file);

    // 检查文件编码
    if (!content.startsWith('# ')) {
      formatIssues.push(`${relativePath}: 文件应该以 H1 标题开头`);
    }

    // 检查代码块语言标识
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    codeBlocks.forEach((block, index) => {
      const firstLine = block.split('\n')[0];
      if (!firstLine.includes('tsx') && !firstLine.includes('typescript') && !firstLine.includes('bash') && !firstLine.includes('json')) {
        formatIssues.push(`${relativePath}: 第 ${index + 1} 个代码块缺少语言标识`);
      }
    });

    // 检查表格格式
    const tables = content.match(/\|.*\|/g) || [];
    tables.forEach(table => {
      const columns = table.split('|').length - 2;
      if (columns < 2) {
        formatIssues.push(`${relativePath}: 表格列数过少`);
      }
    });

    // 检查标题层级
    const lines = content.split('\n');
    let lastLevel = 0;

    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s/);
      if (match) {
        const level = match[1].length;
        if (level > lastLevel + 1) {
          formatIssues.push(`${relativePath}: 第 ${index + 1} 行标题层级跳跃`);
        }
        lastLevel = level;
      }
    });
  });

  if (formatIssues.length === 0) {
    log('passed', '✅ 文档格式检查通过');
  } else {
    formatIssues.forEach(issue => {
      log('warnings', `⚠️  ${issue}`);
    });
  }

  return formatIssues.length === 0;
}

// 检查文档更新状态
function checkDocumentationFreshness() {
  log('info', '🔍 检查文档更新状态...');

  const staleDocs = [];
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

  // 递归查找所有 markdown 文件
  function findMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    const markdownFiles = [];

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !file.startsWith('.')) {
        markdownFiles.push(...findMarkdownFiles(filePath));
      } else if (file.endsWith('.md')) {
        markdownFiles.push({
          path: filePath,
          relativePath: path.relative(config.docsDir, filePath),
          stats: stats
        });
      }
    });

    return markdownFiles;
  }

  const markdownFiles = findMarkdownFiles(config.docsDir);

  markdownFiles.forEach(file => {
    if (file.stats.mtime.getTime() < thirtyDaysAgo) {
      const daysOld = Math.floor((Date.now() - file.stats.mtime.getTime()) / (24 * 60 * 60 * 1000));
      staleDocs.push(`${file.relativePath} (${daysOld} 天未更新)`);
    }
  });

  if (staleDocs.length === 0) {
    log('passed', '✅ 所有文档都是近期更新的');
  } else {
    log('warnings', `⚠️  发现 ${staleDocs.length} 个可能过期的文档`);
    staleDocs.forEach(doc => {
      log('info', `📅 ${doc}`);
    });
  }

  return staleDocs.length === 0;
}

// 检查文档一致性
function checkDocumentationConsistency() {
  log('info', '🔍 检查文档一致性...');

  const consistencyIssues = [];

  // 检查组件命名一致性
  const components = getAllComponents();
  const componentNames = components.map(c => c.name.toLowerCase());

  components.forEach(component => {
    const docPath = path.join(config.docsDir, 'components', component.category, `${component.name.toLowerCase()}.md`);

    if (fs.existsSync(docPath)) {
      const content = fs.readFileSync(docPath, 'utf8');

      // 检查文档中的组件名称是否一致
      const nameVariations = [
        component.name,
        component.name.toLowerCase(),
        component.name.charAt(0).toUpperCase() + component.name.slice(1).toLowerCase()
      ];

      const nameFound = nameVariations.some(variation =>
        content.includes(variation) || content.includes(variation.toUpperCase())
      );

      if (!nameFound) {
        consistencyIssues.push(`${component.name}: 文档中未找到组件名称`);
      }

      // 检查导入语句是否正确
      const importPattern = new RegExp(`import.*${component.name}.*from.*['"]@taro-uno/ui['"]`, 'i');
      if (!importPattern.test(content)) {
        consistencyIssues.push(`${component.name}: 缺少正确的导入语句示例`);
      }
    }
  });

  // 检查路径一致性
  const indexPath = path.join(config.docsDir, 'index.md');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const links = indexContent.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

    links.forEach(link => {
      const url = link.match(/\(([^)]+)\)/)[1];
      if (url.startsWith('./') || url.startsWith('../')) {
        const absoluteUrl = path.resolve(config.docsDir, url);
        if (!fs.existsSync(absoluteUrl)) {
          consistencyIssues.push(`首页链接失效: ${url}`);
        }
      }
    });
  }

  if (consistencyIssues.length === 0) {
    log('passed', '✅ 文档一致性检查通过');
  } else {
    consistencyIssues.forEach(issue => {
      log('warnings', `⚠️  ${issue}`);
    });
  }

  return consistencyIssues.length === 0;
}

// 检查SEO优化
function checkSEOOptimization() {
  log('info', '🔍 检查SEO优化...');

  const seoIssues = [];

  // 检查主页面SEO
  const indexPath = path.join(config.docsDir, 'index.md');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');

    // 检查是否有关键词
    const keywords = ['Taro-Uno UI', '组件库', 'Taro', '多端', 'React', 'TypeScript'];
    const foundKeywords = keywords.filter(keyword => content.includes(keyword));

    if (foundKeywords.length < keywords.length / 2) {
      seoIssues.push('首页关键词覆盖不足');
    }

    // 检查描述长度
    const descriptionMatch = content.match(/^[^#]/m);
    if (descriptionMatch) {
      const description = descriptionMatch[0].trim();
      if (description.length < 50 || description.length > 200) {
        seoIssues.push('描述长度应该在50-200字符之间');
      }
    }
  }

  // 检查标题结构
  function checkTitleStructure(content, filePath) {
    const lines = content.split('\n');
    const headings = [];

    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        headings.push({
          level: match[1].length,
          text: match[2],
          line: index + 1
        });
      }
    });

    // 检查是否只有一个H1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count !== 1) {
      seoIssues.push(`${filePath}: 应该只有一个H1标题，发现${h1Count}个`);
    }

    // 检查标题层级是否合理
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level > headings[i-1].level + 1) {
        seoIssues.push(`${filePath}: 第${headings[i].line}行标题层级跳跃`);
      }
    }
  }

  // 检查所有重要文件
  const importantFiles = ['index.md', 'getting-started.md', 'quick-start.md'];
  importantFiles.forEach(file => {
    const filePath = path.join(config.docsDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      checkTitleStructure(content, file);
    }
  });

  if (seoIssues.length === 0) {
    log('passed', '✅ SEO优化检查通过');
  } else {
    seoIssues.forEach(issue => {
      log('warnings', `⚠️  ${issue}`);
    });
  }

  return seoIssues.length === 0;
}

// 生成质量报告
function generateQualityReport() {
  log('info', '📊 生成质量报告...');

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalChecks: 0,
      passedChecks: 0,
      failedChecks: 0,
      warnings: 0,
      errors: 0
    },
    details: results
  };

  // 计算摘要
  report.summary.totalChecks = results.passed.length + results.errors.length;
  report.summary.passedChecks = results.passed.length;
  report.summary.failedChecks = results.errors.length;
  report.summary.warnings = results.warnings.length;
  report.summary.errors = results.errors.length;

  // 保存报告
  const reportPath = path.join(config.docsDir, 'quality-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  log('info', `📋 质量报告已保存到: ${reportPath}`);

  return report;
}

// 主函数
function main() {
  log('info', '🚀 开始文档质量验证...');

  // 执行检查
  const structureCheck = checkDocumentationStructure();
  const componentCheck = checkComponentDocumentation();
  const formatCheck = checkDocumentationFormat();
  const freshnessCheck = checkDocumentationFreshness();
  const consistencyCheck = checkDocumentationConsistency();
  const seoCheck = checkSEOOptimization();

  // 生成报告
  const report = generateQualityReport();

  // 输出总结
  console.log('\n' + '='.repeat(50));
  console.log('📋 文档质量验证总结');
  console.log('='.repeat(50));

  console.log(`✅ 通过检查: ${results.passed.length}`);
  console.log(`⚠️  警告: ${results.warnings.length}`);
  console.log(`❌ 错误: ${results.errors.length}`);

  if (results.errors.length === 0) {
    console.log('\n🎉 所有质量检查都通过了！');
    process.exit(0);
  } else {
    console.log('\n❌ 发现质量问题的需要修复！');
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  checkDocumentationStructure,
  checkComponentDocumentation,
  checkDocumentationFormat,
  checkDocumentationFreshness,
  checkDocumentationConsistency,
  checkSEOOptimization,
  generateQualityReport,
};