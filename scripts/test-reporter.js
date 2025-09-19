#!/usr/bin/env node

/**
 * 测试报告生成器
 * 生成详细的测试报告和分析
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TestReporter {
  constructor() {
    this.reportsDir = path.join(process.cwd(), 'reports');
    this.testResults = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      coverage: {},
      performance: {},
      duration: 0,
      timestamp: new Date().toISOString(),
    };
  }

  // 初始化报告目录
  initReportsDir() {
    if (!fs.existsSync(this.reportsDir)) {
      fs.mkdirSync(this.reportsDir, { recursive: true });
    }
  }

  // 运行测试并收集结果
  async runTests() {
    console.log('🚀 开始运行测试...');

    try {
      // 运行单元测试
      console.log('📋 运行单元测试...');
      const unitTestResult = this.runUnitTest();

      // 运行覆盖率测试
      console.log('📊 运行覆盖率测试...');
      const coverageResult = this.runCoverageTest();

      // 运行性能测试
      console.log('⚡ 运行性能测试...');
      const performanceResult = this.runPerformanceTest();

      // 生成报告
      console.log('📝 生成测试报告...');
      this.generateReport(unitTestResult, coverageResult, performanceResult);

      console.log('✅ 测试完成！');
      console.log(`📁 报告已生成到: ${this.reportsDir}`);
    } catch (error) {
      console.error('❌ 测试运行失败:', error);
      process.exit(1);
    }
  }

  // 运行单元测试
  runUnitTest() {
    try {
      const output = execSync('npm run test:run', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      return this.parseTestOutput(output);
    } catch (error) {
      console.error('单元测试失败:', error.message);
      return { error: error.message };
    }
  }

  // 运行覆盖率测试
  runCoverageTest() {
    try {
      const output = execSync('npm run test:coverage', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      return this.parseCoverageOutput(output);
    } catch (error) {
      console.error('覆盖率测试失败:', error.message);
      return { error: error.message };
    }
  }

  // 运行性能测试
  runPerformanceTest() {
    try {
      const output = execSync('npm run test:performance', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      return this.parsePerformanceOutput(output);
    } catch (error) {
      console.error('性能测试失败:', error.message);
      return { error: error.message };
    }
  }

  // 解析测试输出
  parseTestOutput(output) {
    const lines = output.split('\n');
    const result = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      tests: [],
    };

    for (const line of lines) {
      if (line.includes('Test Files')) {
        const match = line.match(/Test Files\s+(\d+)\s+failed\s*\((\d+)\)/);
        if (match) {
          result.total = parseInt(match[1]);
          result.failed = parseInt(match[2]);
          result.passed = result.total - result.failed;
        }
      } else if (line.includes('Tests')) {
        const match = line.match(/Tests\s+(\d+)\s+failed\s*\((\d+)\)/);
        if (match) {
          result.tests = parseInt(match[1]);
          result.failed = parseInt(match[2]);
          result.passed = result.tests - result.failed;
        }
      } else if (line.includes('Duration')) {
        const match = line.match(/Duration\s+(.+)/);
        if (match) {
          result.duration = match[1];
        }
      }
    }

    return result;
  }

  // 解析覆盖率输出
  parseCoverageOutput(output) {
    const lines = output.split('\n');
    const coverage = {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
      files: [],
    };

    for (const line of lines) {
      if (line.includes('All files')) {
        const match = line.match(/All files\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)/);
        if (match) {
          coverage.statements = parseFloat(match[1]);
          coverage.branches = parseFloat(match[2]);
          coverage.functions = parseFloat(match[3]);
          coverage.lines = parseFloat(match[4]);
        }
      }
    }

    return coverage;
  }

  // 解析性能输出
  parsePerformanceOutput(output) {
    const lines = output.split('\n');
    const performance = {
      metrics: {},
      benchmarks: [],
    };

    for (const line of lines) {
      if (line.includes('Performance Metrics')) {
        // 解析性能指标
        const metrics = {};
        // 这里可以根据实际输出格式进行解析
        performance.metrics = metrics;
      }
    }

    return performance;
  }

  // 生成测试报告
  generateReport(unitTestResult, coverageResult, performanceResult) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...unitTestResult,
        coverage: coverageResult,
        performance: performanceResult,
      },
      details: {
        unitTests: unitTestResult,
        coverage: coverageResult,
        performance: performanceResult,
      },
      recommendations: this.generateRecommendations(coverageResult, performanceResult),
    };

    // 生成 HTML 报告
    this.generateHtmlReport(report);

    // 生成 JSON 报告
    this.generateJsonReport(report);

    // 生成控制台报告
    this.generateConsoleReport(report);
  }

  // 生成推荐建议
  generateRecommendations(coverageResult, performanceResult) {
    const recommendations = [];

    // 覆盖率建议
    if (coverageResult.statements && coverageResult.statements < 80) {
      recommendations.push({
        type: 'coverage',
        level: 'warning',
        message: '代码覆盖率较低，建议增加测试用例以提高覆盖率',
        metric: `语句覆盖率: ${coverageResult.statements}%`,
      });
    }

    if (coverageResult.branches && coverageResult.branches < 80) {
      recommendations.push({
        type: 'coverage',
        level: 'warning',
        message: '分支覆盖率较低，建议增加分支测试用例',
        metric: `分支覆盖率: ${coverageResult.branches}%`,
      });
    }

    // 性能建议
    if (performanceResult.metrics && performanceResult.metrics.renderTime > 100) {
      recommendations.push({
        type: 'performance',
        level: 'warning',
        message: '渲染时间较长，建议优化组件性能',
        metric: `渲染时间: ${performanceResult.metrics.renderTime}ms`,
      });
    }

    return recommendations;
  }

  // 生成 HTML 报告
  generateHtmlReport(report) {
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taro-Uno 测试报告</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e9ecef;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        .metric-label {
            color: #666;
            margin-top: 5px;
        }
        .coverage-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        .coverage-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .coverage-value {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .coverage-value.high { color: #28a745; }
        .coverage-value.medium { color: #ffc107; }
        .coverage-value.low { color: #dc3545; }
        .recommendations {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
        }
        .recommendation {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-radius: 5px;
            border-left: 4px solid #ffc107;
        }
        .recommendation.warning {
            border-left-color: #ffc107;
        }
        .recommendation.error {
            border-left-color: #dc3545;
        }
        .recommendation.success {
            border-left-color: #28a745;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            border-top: 1px solid #e9ecef;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Taro-Uno 测试报告</h1>
            <p>生成时间: ${new Date(report.timestamp).toLocaleString()}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📊 测试概览</h2>
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${report.summary.total || 0}</div>
                        <div class="metric-label">测试文件</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${report.summary.passed || 0}</div>
                        <div class="metric-label">通过测试</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${report.summary.failed || 0}</div>
                        <div class="metric-label">失败测试</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${report.summary.duration || '0ms'}</div>
                        <div class="metric-label">执行时间</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>🎯 代码覆盖率</h2>
                <div class="coverage-grid">
                    <div class="coverage-item">
                        <div class="coverage-value ${this.getCoverageClass(report.summary.coverage.statements)}">
                            ${report.summary.coverage.statements || 0}%
                        </div>
                        <div>语句覆盖率</div>
                    </div>
                    <div class="coverage-item">
                        <div class="coverage-value ${this.getCoverageClass(report.summary.coverage.branches)}">
                            ${report.summary.coverage.branches || 0}%
                        </div>
                        <div>分支覆盖率</div>
                    </div>
                    <div class="coverage-item">
                        <div class="coverage-value ${this.getCoverageClass(report.summary.coverage.functions)}">
                            ${report.summary.coverage.functions || 0}%
                        </div>
                        <div>函数覆盖率</div>
                    </div>
                    <div class="coverage-item">
                        <div class="coverage-value ${this.getCoverageClass(report.summary.coverage.lines)}">
                            ${report.summary.coverage.lines || 0}%
                        </div>
                        <div>行覆盖率</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>💡 优化建议</h2>
                <div class="recommendations">
                    ${report.recommendations
                      .map(
                        (rec) => `
                        <div class="recommendation ${rec.level}">
                            <strong>${rec.type === 'coverage' ? '📊' : '⚡'} ${rec.message}</strong>
                            <div style="margin-top: 5px; color: #666;">${rec.metric}</div>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>
        </div>

        <div class="footer">
            <p>由 Taro-Uno 测试系统生成 | 使用 Vitest + Testing Library</p>
        </div>
    </div>
</body>
</html>`;

    const reportPath = path.join(this.reportsDir, 'test-report.html');
    fs.writeFileSync(reportPath, html);
    console.log(`📄 HTML 报告已生成: ${reportPath}`);
  }

  // 获取覆盖率等级
  getCoverageClass(coverage) {
    if (!coverage) return 'low';
    if (coverage >= 90) return 'high';
    if (coverage >= 70) return 'medium';
    return 'low';
  }

  // 生成 JSON 报告
  generateJsonReport(report) {
    const reportPath = path.join(this.reportsDir, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 JSON 报告已生成: ${reportPath}`);
  }

  // 生成控制台报告
  generateConsoleReport(report) {
    console.log('\n📊 测试报告概览:');
    console.log('='.repeat(50));
    console.log(`📁 测试文件: ${report.summary.total || 0}`);
    console.log(`✅ 通过测试: ${report.summary.passed || 0}`);
    console.log(`❌ 失败测试: ${report.summary.failed || 0}`);
    console.log(`⏱️  执行时间: ${report.summary.duration || '0ms'}`);

    if (report.summary.coverage.statements) {
      console.log('\n🎯 代码覆盖率:');
      console.log(`📝 语句覆盖率: ${report.summary.coverage.statements}%`);
      console.log(`🌿 分支覆盖率: ${report.summary.coverage.branches}%`);
      console.log(`⚙️  函数覆盖率: ${report.summary.coverage.functions}%`);
      console.log(`📏 行覆盖率: ${report.summary.coverage.lines}%`);
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 优化建议:');
      report.recommendations.forEach((rec) => {
        const icon = rec.level === 'error' ? '❌' : rec.level === 'warning' ? '⚠️' : '✅';
        console.log(`${icon} ${rec.message}`);
      });
    }

    console.log('='.repeat(50));
  }
}

// 主函数
async function main() {
  const reporter = new TestReporter();
  reporter.initReportsDir();
  await reporter.runTests();
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = TestReporter;
