#!/usr/bin/env node

/**
 * Taro-Uno 质量检查脚本
 *
 * 提供完整的代码质量检查，包括：
 * - ESLint 检查
 * - TypeScript 类型检查
 * - StyleLint 检查
 * - Prettier 格式化检查
 * - 测试覆盖率检查
 * - 依赖安全性检查
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

const log = {
  info: (msg) => console.log(chalk.blue('ℹ️'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  title: (msg) => console.log(chalk.bold.cyan('🔍'), msg),
};

// 检查配置
const checks = [
  {
    name: 'ESLint',
    command: 'npm run lint',
    description: '代码风格和错误检查',
    required: true,
  },
  {
    name: 'TypeScript',
    command: 'npm run type-check',
    description: 'TypeScript 类型检查',
    required: true,
  },
  {
    name: 'StyleLint',
    command: 'npm run lint:style',
    description: '样式文件检查',
    required: false,
  },
  {
    name: 'Prettier',
    command: 'npm run format:check',
    description: '代码格式化检查',
    required: true,
  },
  {
    name: 'Test Coverage',
    command: 'npm run test:coverage',
    description: '测试覆盖率检查',
    required: false,
    threshold: 85,
  },
  {
    name: 'Security Audit',
    command: 'npm audit',
    description: '依赖安全性检查',
    required: false,
  },
];

// 主函数
async function main() {
  log.title('Taro-Uno 质量检查');
  console.log('');

  const results = [];
  let hasErrors = false;

  for (const check of checks) {
    log.info(`运行 ${check.name} 检查...`);

    try {
      const startTime = Date.now();
      const result = execSync(check.command, {
        stdio: 'pipe',
        encoding: 'utf8',
        timeout: 120000, // 2分钟超时
      });
      const endTime = Date.now();
      const duration = endTime - startTime;

      results.push({
        name: check.name,
        status: 'passed',
        duration,
        output: result,
      });

      log.success(`${check.name} 检查通过 (${duration}ms)`);

      // 特殊检查处理
      if (check.name === 'Test Coverage' && check.threshold) {
        const coverageMatch = result.match(/All files[^|]*\|\s*(\d+\.\d+)\s*\|/);
        if (coverageMatch) {
          const coverage = parseFloat(coverageMatch[1]);
          if (coverage < check.threshold) {
            log.warning(`测试覆盖率 ${coverage}% 低于目标 ${check.threshold}%`);
            hasErrors = true;
          }
        }
      }
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - (error.status || Date.now());

      results.push({
        name: check.name,
        status: 'failed',
        duration,
        error: error.message,
        output: error.stdout || error.stderr,
      });

      log.error(`${check.name} 检查失败 (${duration}ms)`);

      if (check.required) {
        hasErrors = true;
      } else {
        log.warning(`${check.name} 检查失败，但不是必需的`);
      }
    }

    console.log('');
  }

  // 生成报告
  generateReport(results);

  // 汇总结果
  const passedChecks = results.filter((r) => r.status === 'passed').length;
  const totalChecks = results.length;

  log.title('质量检查汇总');
  console.log(`通过检查: ${passedChecks}/${totalChecks}`);
  console.log(`总耗时: ${results.reduce((sum, r) => sum + r.duration, 0)}ms`);
  console.log('');

  if (hasErrors) {
    log.error('质量检查未通过，请修复问题后重试');
    process.exit(1);
  } else {
    log.success('所有质量检查通过！');
  }
}

// 生成报告
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passed: results.filter((r) => r.status === 'passed').length,
      failed: results.filter((r) => r.status === 'failed').length,
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
    },
    details: results,
  };

  // 保存JSON报告
  const fs = require('fs');
  const path = require('path');

  const reportDir = path.join(process.cwd(), 'reports', 'quality');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, `quality-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // 生成HTML报告
  const htmlReport = generateHTMLReport(report);
  const htmlPath = path.join(reportDir, `quality-report-${Date.now()}.html`);
  fs.writeFileSync(htmlPath, htmlReport);

  log.info(`质量检查报告已生成: ${reportPath}`);
}

// 生成HTML报告
function generateHTMLReport(report) {
  const { summary, details } = report;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taro-Uno 质量检查报告</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #28a745;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #28a745;
            margin: 0;
        }
        .timestamp {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        .summary {
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
        }
        .metric .value {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
        }
        .metric .label {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        .metric.warning .value {
            color: #ffc107;
        }
        .metric.danger .value {
            color: #dc3545;
        }
        .results {
            margin-bottom: 30px;
        }
        .result-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid #28a745;
        }
        .result-item.failed {
            border-left-color: #dc3545;
            background: #f8d7da;
        }
        .result-item h3 {
            margin: 0 0 10px 0;
            color: #333;
        }
        .result-item .status {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .result-item .status.passed {
            color: #28a745;
        }
        .result-item .status.failed {
            color: #dc3545;
        }
        .result-item .duration {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .result-item .output {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            white-space: pre-wrap;
            max-height: 200px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Taro-Uno 质量检查报告</h1>
            <div class="timestamp">生成时间: ${new Date(report.timestamp).toLocaleString()}</div>
        </div>
        
        <div class="summary">
            <div class="metric">
                <div class="value">${summary.passed}</div>
                <div class="label">通过检查</div>
            </div>
            <div class="metric">
                <div class="value">${summary.failed}</div>
                <div class="label">失败检查</div>
            </div>
            <div class="metric">
                <div class="value">${summary.total}</div>
                <div class="label">总检查数</div>
            </div>
            <div class="metric ${summary.failed > 0 ? 'warning' : ''}">
                <div class="value">${Math.round((summary.passed / summary.total) * 100)}%</div>
                <div class="label">通过率</div>
            </div>
            <div class="metric">
                <div class="value">${Math.round(summary.totalDuration / 1000)}s</div>
                <div class="label">总耗时</div>
            </div>
        </div>
        
        <div class="results">
            <h2>检查详情</h2>
            ${details
              .map(
                (detail) => `
                <div class="result-item ${detail.status}">
                    <h3>${detail.name}</h3>
                    <div class="status ${detail.status}">${detail.status === 'passed' ? '✅ 通过' : '❌ 失败'}</div>
                    <div class="duration">耗时: ${detail.duration}ms</div>
                    ${detail.output ? `<div class="output">${detail.output}</div>` : ''}
                    ${detail.error ? `<div class="output">${detail.error}</div>` : ''}
                </div>
            `,
              )
              .join('')}
        </div>
    </div>
</body>
</html>`;
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as qualityCheck };
