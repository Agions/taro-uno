#!/usr/bin/env node

/**
 * 测试质量检查工具
 * 检查测试质量和覆盖率，提供改进建议
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TestQualityChecker {
  constructor() {
    this.projectRoot = process.cwd();
    this.srcDir = path.join(this.projectRoot, 'src');
    this.testThresholds = {
      coverage: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
      performance: {
        maxRenderTime: 100,
        maxBundleSize: 500000,
      },
    };
  }

  // 运行完整的质量检查
  async runQualityCheck() {
    console.log('🔍 开始测试质量检查...');

    const results = {
      coverage: await this.checkCoverage(),
      testFiles: await this.checkTestFiles(),
      testPatterns: await this.checkTestPatterns(),
      performance: await this.checkPerformance(),
      documentation: await this.checkDocumentation(),
      recommendations: [],
    };

    // 生成质量报告
    this.generateQualityReport(results);

    // 输出结果
    this.outputResults(results);

    return results;
  }

  // 检查覆盖率
  async checkCoverage() {
    console.log('📊 检查代码覆盖率...');

    try {
      // 运行覆盖率测试
      const output = execSync('npm run test:coverage -- --reporter=json', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      // 解析覆盖率数据
      const coverageData = this.parseCoverageData(output);

      // 检查覆盖率阈值
      const coverageCheck = {
        statements: this.checkThreshold(coverageData.statements, this.testThresholds.coverage.statements),
        branches: this.checkThreshold(coverageData.branches, this.testThresholds.coverage.branches),
        functions: this.checkThreshold(coverageData.functions, this.testThresholds.coverage.functions),
        lines: this.checkThreshold(coverageData.lines, this.testThresholds.coverage.lines),
        rawData: coverageData,
      };

      return coverageCheck;
    } catch (error) {
      console.error('覆盖率检查失败:', error.message);
      return { error: error.message };
    }
  }

  // 检查测试文件
  async checkTestFiles() {
    console.log('📁 检查测试文件...');

    const components = this.findComponents();
    const testFiles = this.findTestFiles();

    const checkResult = {
      totalComponents: components.length,
      testedComponents: testFiles.length,
      untestedComponents: components.filter(
        (comp) => !testFiles.some((test) => test.includes(comp.replace('.tsx', ''))),
      ),
      testCoverage: (testFiles.length / components.length) * 100,
      files: {
        components,
        testFiles,
      },
    };

    return checkResult;
  }

  // 检查测试模式
  async checkTestPatterns() {
    console.log('🔍 检查测试模式...');

    const testFiles = this.findTestFiles();
    const patterns = {
      describeBlocks: 0,
      testCases: 0,
      assertions: 0,
      asyncTests: 0,
      mockUsage: 0,
      accessibilityTests: 0,
      edgeCaseTests: 0,
    };

    for (const file of testFiles) {
      const content = fs.readFileSync(file, 'utf8');

      // 统计测试模式
      patterns.describeBlocks += (content.match(/describe\(/g) || []).length;
      patterns.testCases += (content.match(/it\(/g) || []).length;
      patterns.assertions += (content.match(/expect\(/g) || []).length;
      patterns.asyncTests += (content.match(/async|await/g) || []).length;
      patterns.mockUsage += (content.match(/vi\.mock|jest\.mock/g) || []).length;
      patterns.accessibilityTests += (content.match(/accessibility|aria-/g) || []).length;
      patterns.edgeCaseTests += (content.match(/edge.*case|boundary/g) || []).length;
    }

    return patterns;
  }

  // 检查性能
  async checkPerformance() {
    console.log('⚡ 检查测试性能...');

    try {
      // 运行性能测试
      const output = execSync('npm run test:performance', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      // 解析性能数据
      const performanceData = this.parsePerformanceData(output);

      return {
        renderTime: performanceData.renderTime || 0,
        bundleSize: performanceData.bundleSize || 0,
        metrics: performanceData,
      };
    } catch (error) {
      console.error('性能检查失败:', error.message);
      return { error: error.message };
    }
  }

  // 检查文档
  async checkDocumentation() {
    console.log('📚 检查测试文档...');

    const testFiles = this.findTestFiles();
    const documentation = {
      filesWithComments: 0,
      totalFiles: testFiles.length,
      commentCoverage: 0,
      apiDocumentation: 0,
      exampleCode: 0,
    };

    for (const file of testFiles) {
      const content = fs.readFileSync(file, 'utf8');

      // 检查注释
      if (content.includes('/**') || content.includes('*')) {
        documentation.filesWithComments++;
      }

      // 检查API文档
      if (content.includes('@param') || content.includes('@returns')) {
        documentation.apiDocumentation++;
      }

      // 检查示例代码
      if (content.includes('example') || content.includes('Example')) {
        documentation.exampleCode++;
      }
    }

    documentation.commentCoverage = (documentation.filesWithComments / documentation.totalFiles) * 100;

    return documentation;
  }

  // 查找组件文件
  findComponents() {
    const components = [];

    function scanDirectory(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          scanDirectory(filePath);
        } else if (file.endsWith('.tsx') && !file.includes('.test.') && !file.includes('.spec.')) {
          components.push(filePath);
        }
      }
    }

    scanDirectory(this.srcDir);
    return components;
  }

  // 查找测试文件
  findTestFiles() {
    const testFiles = [];

    function scanDirectory(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          scanDirectory(filePath);
        } else if ((file.endsWith('.test.tsx') || file.endsWith('.test.ts')) && !file.includes('node_modules')) {
          testFiles.push(filePath);
        }
      }
    }

    scanDirectory(this.projectRoot);
    return testFiles;
  }

  // 解析覆盖率数据
  parseCoverageData(output) {
    try {
      // 尝试解析JSON输出
      const coverageMatch = output.match(/"total":\s*{[^}]+}/);
      if (coverageMatch) {
        const totalData = JSON.parse(coverageMatch[0]);
        return {
          statements: parseFloat(totalData.statements?.pct || 0),
          branches: parseFloat(totalData.branches?.pct || 0),
          functions: parseFloat(totalData.functions?.pct || 0),
          lines: parseFloat(totalData.lines?.pct || 0),
        };
      }

      // 如果没有JSON，尝试解析文本输出
      const lines = output.split('\n');
      for (const line of lines) {
        if (line.includes('All files')) {
          const match = line.match(/All files\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)/);
          if (match) {
            return {
              statements: parseFloat(match[1]),
              branches: parseFloat(match[2]),
              functions: parseFloat(match[3]),
              lines: parseFloat(match[4]),
            };
          }
        }
      }

      return { statements: 0, branches: 0, functions: 0, lines: 0 };
    } catch (error) {
      console.error('解析覆盖率数据失败:', error);
      return { statements: 0, branches: 0, functions: 0, lines: 0 };
    }
  }

  // 解析性能数据
  parsePerformanceData(output) {
    try {
      const lines = output.split('\n');
      const metrics = {};

      for (const line of lines) {
        if (line.includes('render time')) {
          metrics.renderTime = parseFloat(line.match(/[\d.]+/)?.[0] || 0);
        }
        if (line.includes('bundle size')) {
          metrics.bundleSize = parseFloat(line.match(/[\d.]+/)?.[0] || 0);
        }
      }

      return metrics;
    } catch (error) {
      console.error('解析性能数据失败:', error);
      return {};
    }
  }

  // 检查阈值
  checkThreshold(value, threshold) {
    return {
      value: value || 0,
      threshold: threshold,
      passed: (value || 0) >= threshold,
      difference: (value || 0) - threshold,
    };
  }

  // 生成质量报告
  generateQualityReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(results),
      details: results,
      recommendations: this.generateRecommendations(results),
    };

    // 保存报告
    const reportPath = path.join(this.projectRoot, 'reports', 'quality-report.json');
    const reportsDir = path.dirname(reportPath);

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 质量报告已生成: ${reportPath}`);
  }

  // 生成概要
  generateSummary(results) {
    const summary = {
      overallScore: 0,
      coverageScore: 0,
      testFileScore: 0,
      testPatternScore: 0,
      performanceScore: 0,
      documentationScore: 0,
    };

    // 计算覆盖率分数
    if (results.coverage && !results.coverage.error) {
      const avgCoverage =
        (results.coverage.statements.value +
          results.coverage.branches.value +
          results.coverage.functions.value +
          results.coverage.lines.value) /
        4;
      summary.coverageScore = Math.min(100, avgCoverage);
    }

    // 计算测试文件分数
    if (results.testFiles) {
      summary.testFileScore = results.testFiles.testCoverage;
    }

    // 计算测试模式分数
    if (results.testPatterns) {
      const patternScore = Math.min(100, (results.testPatterns.assertions / results.testPatterns.testCases) * 50);
      summary.testPatternScore = patternScore;
    }

    // 计算性能分数
    if (results.performance && !results.performance.error) {
      const performanceScore = Math.max(
        0,
        100 - (results.performance.renderTime / this.testThresholds.performance.maxRenderTime) * 100,
      );
      summary.performanceScore = performanceScore;
    }

    // 计算文档分数
    if (results.documentation) {
      summary.documentationScore = results.documentation.commentCoverage;
    }

    // 计算总分
    summary.overallScore = Math.round(
      summary.coverageScore * 0.3 +
        summary.testFileScore * 0.25 +
        summary.testPatternScore * 0.2 +
        summary.performanceScore * 0.15 +
        summary.documentationScore * 0.1,
    );

    return summary;
  }

  // 生成建议
  generateRecommendations(results) {
    const recommendations = [];

    // 覆盖率建议
    if (results.coverage && !results.coverage.error) {
      if (!results.coverage.statements.passed) {
        recommendations.push({
          type: 'coverage',
          priority: 'high',
          message: `语句覆盖率 ${results.coverage.statements.value}% 低于阈值 ${results.coverage.statements.threshold}%，建议增加测试用例`,
        });
      }
      if (!results.coverage.branches.passed) {
        recommendations.push({
          type: 'coverage',
          priority: 'medium',
          message: `分支覆盖率 ${results.coverage.branches.value}% 低于阈值 ${results.coverage.branches.threshold}%，建议增加分支测试`,
        });
      }
    }

    // 测试文件建议
    if (results.testFiles) {
      if (results.testFiles.untestedComponents.length > 0) {
        recommendations.push({
          type: 'coverage',
          priority: 'high',
          message: `发现 ${results.testFiles.untestedComponents.length} 个未测试的组件，建议添加测试`,
        });
      }
    }

    // 测试模式建议
    if (results.testPatterns) {
      if (results.testPatterns.accessibilityTests === 0) {
        recommendations.push({
          type: 'quality',
          priority: 'medium',
          message: '未发现无障碍性测试，建议添加 a11y 测试',
        });
      }
      if (results.testPatterns.edgeCaseTests === 0) {
        recommendations.push({
          type: 'quality',
          priority: 'low',
          message: '未发现边界情况测试，建议添加边界测试',
        });
      }
    }

    // 性能建议
    if (results.performance && !results.performance.error) {
      if (results.performance.renderTime > this.testThresholds.performance.maxRenderTime) {
        recommendations.push({
          type: 'performance',
          priority: 'medium',
          message: `渲染时间 ${results.performance.renderTime}ms 超过阈值，建议优化性能`,
        });
      }
    }

    // 文档建议
    if (results.documentation) {
      if (results.documentation.commentCoverage < 50) {
        recommendations.push({
          type: 'documentation',
          priority: 'low',
          message: `测试文档覆盖率 ${results.documentation.commentCoverage.toFixed(1)}% 较低，建议添加文档注释`,
        });
      }
    }

    return recommendations;
  }

  // 输出结果
  outputResults(results) {
    console.log('\n📊 测试质量检查结果:');
    console.log('='.repeat(60));

    // 输出概要
    console.log(`🎯 总体评分: ${results.summary.overallScore}/100`);
    console.log(`📊 覆盖率评分: ${results.summary.coverageScore.toFixed(1)}/100`);
    console.log(`📁 测试文件评分: ${results.summary.testFileScore.toFixed(1)}/100`);
    console.log(`🔍 测试模式评分: ${results.summary.testPatternScore.toFixed(1)}/100`);
    console.log(`⚡ 性能评分: ${results.summary.performanceScore.toFixed(1)}/100`);
    console.log(`📚 文档评分: ${results.summary.documentationScore.toFixed(1)}/100`);

    // 输出覆盖率详情
    if (results.coverage && !results.coverage.error) {
      console.log('\n📊 覆盖率详情:');
      console.log(
        `📝 语句覆盖率: ${results.coverage.statements.value}% ${results.coverage.statements.passed ? '✅' : '❌'}`,
      );
      console.log(
        `🌿 分支覆盖率: ${results.coverage.branches.value}% ${results.coverage.branches.passed ? '✅' : '❌'}`,
      );
      console.log(
        `⚙️  函数覆盖率: ${results.coverage.functions.value}% ${results.coverage.functions.passed ? '✅' : '❌'}`,
      );
      console.log(`📏 行覆盖率: ${results.coverage.lines.value}% ${results.coverage.lines.passed ? '✅' : '❌'}`);
    }

    // 输出测试文件详情
    if (results.testFiles) {
      console.log('\n📁 测试文件详情:');
      console.log(`🔢 组件总数: ${results.testFiles.totalComponents}`);
      console.log(`✅ 已测试组件: ${results.testFiles.testedComponents}`);
      console.log(`❌ 未测试组件: ${results.testFiles.untestedComponents.length}`);
      console.log(`📈 测试覆盖率: ${results.testFiles.testCoverage.toFixed(1)}%`);
    }

    // 输出建议
    if (results.recommendations.length > 0) {
      console.log('\n💡 改进建议:');
      results.recommendations.forEach((rec, index) => {
        const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        console.log(`${priority} ${index + 1}. ${rec.message}`);
      });
    }

    console.log('='.repeat(60));
  }
}

// 主函数
async function main() {
  const checker = new TestQualityChecker();
  const results = await checker.runQualityCheck();

  // 根据结果设置退出码
  if (results.summary.overallScore < 70) {
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = TestQualityChecker;
