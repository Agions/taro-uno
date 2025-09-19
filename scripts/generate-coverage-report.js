#!/usr/bin/env node

/**
 * 测试覆盖率报告生成脚本
 * 生成详细的测试覆盖率报告和改进建议
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 覆盖率配置
const coverageConfig = {
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    fileLevel: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  excludePatterns: ['**/*.test.*', '**/*.spec.*', '**/*.config.*', '**/types.ts', '**/index.ts', '**/stories.*'],
};

// 生成覆盖率报告
function generateCoverageReport() {
  console.log('🧪 开始生成测试覆盖率报告...');

  try {
    // 运行测试并生成覆盖率报告
    console.log('📊 运行测试并收集覆盖率数据...');
    execSync('npm run test:coverage', {
      cwd: rootDir,
      stdio: 'inherit',
    });

    // 读取覆盖率数据
    const coveragePath = path.join(rootDir, 'coverage', 'coverage-final.json');
    if (!fs.existsSync(coveragePath)) {
      console.error('❌ 覆盖率数据文件不存在');
      process.exit(1);
    }

    const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));

    // 分析覆盖率数据
    const analysis = analyzeCoverage(coverageData);

    // 生成报告
    generateHtmlReport(analysis);
    generateTextReport(analysis);

    // 提供改进建议
    generateRecommendations(analysis);

    console.log('✅ 覆盖率报告生成完成!');
  } catch (error) {
    console.error('❌ 生成覆盖率报告时出错:', error.message);
    process.exit(1);
  }
}

// 分析覆盖率数据
function analyzeCoverage(coverageData) {
  const analysis = {
    summary: {
      totalFiles: 0,
      coveredFiles: 0,
      totalLines: 0,
      coveredLines: 0,
      totalFunctions: 0,
      coveredFunctions: 0,
      totalBranches: 0,
      coveredBranches: 0,
      totalStatements: 0,
      coveredStatements: 0,
    },
    fileLevel: {},
    recommendations: [],
    issues: [],
  };

  // 遍历覆盖率数据
  for (const [filePath, fileData] of Object.entries(coverageData)) {
    if (shouldExcludeFile(filePath)) continue;

    analysis.summary.totalFiles++;

    const fileCoverage = {
      path: filePath,
      lines: calculatePercentage(fileData.l?.covered || 0, fileData.l?.total || 0),
      functions: calculatePercentage(fileData.fn?.covered || 0, fileData.fn?.total || 0),
      branches: calculatePercentage(fileData.b?.covered || 0, fileData.b?.total || 0),
      statements: calculatePercentage(fileData.s?.covered || 0, fileData.s?.total || 0),
    };

    analysis.summary.totalLines += fileData.l?.total || 0;
    analysis.summary.coveredLines += fileData.l?.covered || 0;
    analysis.summary.totalFunctions += fileData.fn?.total || 0;
    analysis.summary.coveredFunctions += fileData.fn?.covered || 0;
    analysis.summary.totalBranches += fileData.b?.total || 0;
    analysis.summary.coveredBranches += fileData.b?.covered || 0;
    analysis.summary.totalStatements += fileData.s?.total || 0;
    analysis.summary.coveredStatements += fileData.s?.covered || 0;

    // 检查文件级别覆盖率
    if (isFileCoverageLow(fileCoverage)) {
      analysis.recommendations.push({
        type: 'low_coverage',
        file: filePath,
        message: `文件 ${filePath} 覆盖率较低，建议添加更多测试用例`,
        priority: 'high',
      });
    }

    analysis.fileLevel[filePath] = fileCoverage;
  }

  // 计算总体覆盖率
  analysis.summary.linesPercentage = calculatePercentage(analysis.summary.coveredLines, analysis.summary.totalLines);
  analysis.summary.functionsPercentage = calculatePercentage(
    analysis.summary.coveredFunctions,
    analysis.summary.totalFunctions,
  );
  analysis.summary.branchesPercentage = calculatePercentage(
    analysis.summary.coveredBranches,
    analysis.summary.totalBranches,
  );
  analysis.summary.statementsPercentage = calculatePercentage(
    analysis.summary.coveredStatements,
    analysis.summary.totalStatements,
  );

  // 检查总体覆盖率是否达标
  checkOverallCoverage(analysis);

  return analysis;
}

// 生成HTML报告
function generateHtmlReport(analysis) {
  const reportHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>测试覆盖率报告 - Taro Uno UI</title>
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
            padding: 30px;
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
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
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #3b82f6;
        }
        .metric-label {
            color: #666;
            margin-top: 5px;
        }
        .recommendations {
            margin-top: 30px;
        }
        .recommendation {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 10px;
        }
        .recommendation.high {
            background: #f8d7da;
            border-color: #f5c6cb;
        }
        .recommendation.medium {
            background: #fff3cd;
            border-color: #ffeaa7;
        }
        .recommendation.low {
            background: #d4edda;
            border-color: #c3e6cb;
        }
        .file-list {
            margin-top: 30px;
        }
        .file-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .file-name {
            font-family: monospace;
            color: #333;
        }
        .coverage-bars {
            display: flex;
            gap: 10px;
        }
        .coverage-bar {
            width: 60px;
            height: 20px;
            background: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }
        .coverage-fill {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s ease;
        }
        .coverage-fill.low {
            background: #ef4444;
        }
        .coverage-fill.medium {
            background: #f59e0b;
        }
        .coverage-fill.high {
            background: #10b981;
        }
        .coverage-value {
            font-size: 0.9em;
            color: #666;
            margin-left: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 测试覆盖率报告</h1>
        
        <div class="summary">
            <div class="metric">
                <div class="metric-value">${analysis.summary.linesPercentage.toFixed(1)}%</div>
                <div class="metric-label">行覆盖率</div>
            </div>
            <div class="metric">
                <div class="metric-value">${analysis.summary.functionsPercentage.toFixed(1)}%</div>
                <div class="metric-label">函数覆盖率</div>
            </div>
            <div class="metric">
                <div class="metric-value">${analysis.summary.branchesPercentage.toFixed(1)}%</div>
                <div class="metric-label">分支覆盖率</div>
            </div>
            <div class="metric">
                <div class="metric-value">${analysis.summary.statementsPercentage.toFixed(1)}%</div>
                <div class="metric-label">语句覆盖率</div>
            </div>
        </div>
        
        ${generateRecommendationsSection(analysis.recommendations)}
        
        <div class="file-list">
            <h2>文件覆盖率详情</h2>
            ${generateFileList(analysis.fileLevel)}
        </div>
    </div>
</body>
</html>
  `;

  const reportPath = path.join(rootDir, 'coverage', 'report.html');
  fs.writeFileSync(reportPath, reportHtml);
  console.log('📄 HTML 报告已生成:', reportPath);
}

// 生成文本报告
function generateTextReport(analysis) {
  const report = `
🧪 测试覆盖率报告
====================

📊 总体覆盖率:
- 行覆盖率: ${analysis.summary.linesPercentage.toFixed(1)}% (${analysis.summary.coveredLines}/${analysis.summary.totalLines})
- 函数覆盖率: ${analysis.summary.functionsPercentage.toFixed(1)}% (${analysis.summary.coveredFunctions}/${analysis.summary.totalFunctions})
- 分支覆盖率: ${analysis.summary.branchesPercentage.toFixed(1)}% (${analysis.summary.coveredBranches}/${analysis.summary.totalBranches})
- 语句覆盖率: ${analysis.summary.statementsPercentage.toFixed(1)}% (${analysis.summary.coveredStatements}/${analysis.summary.totalStatements})

📋 文件覆盖率:
${Object.entries(analysis.fileLevel)
  .map(([file, coverage]) => {
    const status = getCoverageStatus(coverage);
    return `${file}: ${status.emoji} ${coverage.lines.toFixed(1)}%`;
  })
  .join('\n')}

💡 改进建议:
${analysis.recommendations.map((rec) => `${rec.type === 'low_coverage' ? '⚠️' : 'ℹ️'} ${rec.message}`).join('\n')}

⏰ 报告生成时间: ${new Date().toLocaleString()}
  `;

  const reportPath = path.join(rootDir, 'coverage', 'report.txt');
  fs.writeFileSync(reportPath, report);
  console.log('📄 文本报告已生成:', reportPath);
}

// 生成改进建议
function generateRecommendations(analysis) {
  console.log('\n💡 测试覆盖率改进建议:');
  console.log('========================');

  if (analysis.recommendations.length === 0) {
    console.log('✅ 所有文件覆盖率都达到要求!');
    return;
  }

  analysis.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.message}`);
    console.log(`   优先级: ${rec.priority}`);
    console.log(`   文件: ${rec.file}`);
    console.log();
  });

  // 生成具体改进方案
  console.log('🎯 具体改进方案:');
  console.log('===============');

  if (analysis.summary.linesPercentage < coverageConfig.thresholds.global.lines) {
    console.log('1. 提高行覆盖率:');
    console.log('   - 添加边界条件测试');
    console.log('   - 增加错误处理测试');
    console.log('   - 测试所有代码路径');
  }

  if (analysis.summary.functionsPercentage < coverageConfig.thresholds.global.functions) {
    console.log('2. 提高函数覆盖率:');
    console.log('   - 为每个函数编写测试用例');
    console.log('   - 测试私有函数（通过公共接口）');
    console.log('   - 添加回调函数测试');
  }

  if (analysis.summary.branchesPercentage < coverageConfig.thresholds.global.branches) {
    console.log('3. 提高分支覆盖率:');
    console.log('   - 测试所有条件分支');
    console.log('   - 添加真假条件测试');
    console.log('   - 测试循环的不同情况');
  }

  console.log('\n🔧 自动化建议:');
  console.log('==============');
  console.log('- 运行 npm run test:coverage 查看详细覆盖率');
  console.log('- 使用 IDE 插件查看未覆盖的代码行');
  console.log('- 定期运行覆盖率检查并设置 CI/CD 门槛');
}

// 辅助函数
function calculatePercentage(covered, total) {
  if (total === 0) return 100;
  return (covered / total) * 100;
}

function shouldExcludeFile(filePath) {
  return coverageConfig.excludePatterns.some((pattern) => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(filePath);
  });
}

function isFileCoverageLow(coverage) {
  return (
    coverage.lines < coverageConfig.thresholds.fileLevel.lines ||
    coverage.functions < coverageConfig.thresholds.fileLevel.functions ||
    coverage.branches < coverageConfig.thresholds.fileLevel.branches ||
    coverage.statements < coverageConfig.thresholds.fileLevel.statements
  );
}

function checkOverallCoverage(analysis) {
  const thresholds = coverageConfig.thresholds.global;

  if (analysis.summary.linesPercentage < thresholds.lines) {
    analysis.issues.push({
      type: 'low_lines_coverage',
      message: `总体行覆盖率 ${analysis.summary.linesPercentage.toFixed(1)}% 低于目标 ${thresholds.lines}%`,
    });
  }

  if (analysis.summary.functionsPercentage < thresholds.functions) {
    analysis.issues.push({
      type: 'low_functions_coverage',
      message: `总体函数覆盖率 ${analysis.summary.functionsPercentage.toFixed(1)}% 低于目标 ${thresholds.functions}%`,
    });
  }

  if (analysis.summary.branchesPercentage < thresholds.branches) {
    analysis.issues.push({
      type: 'low_branches_coverage',
      message: `总体分支覆盖率 ${analysis.summary.branchesPercentage.toFixed(1)}% 低于目标 ${thresholds.branches}%`,
    });
  }

  if (analysis.summary.statementsPercentage < thresholds.statements) {
    analysis.issues.push({
      type: 'low_statements_coverage',
      message: `总体语句覆盖率 ${analysis.summary.statementsPercentage.toFixed(1)}% 低于目标 ${thresholds.statements}%`,
    });
  }
}

function getCoverageStatus(coverage) {
  const avgCoverage = (coverage.lines + coverage.functions + coverage.branches + coverage.statements) / 4;

  if (avgCoverage >= 80) {
    return { emoji: '✅', level: 'high' };
  } else if (avgCoverage >= 60) {
    return { emoji: '⚠️', level: 'medium' };
  } else {
    return { emoji: '❌', level: 'low' };
  }
}

function generateRecommendationsSection(recommendations) {
  if (recommendations.length === 0) {
    return '<div class="recommendations"><h2>✅ 无改进建议</h2></div>';
  }

  return `
    <div class="recommendations">
        <h2>💡 改进建议</h2>
        ${recommendations
          .map(
            (rec) => `
            <div class="recommendation ${rec.priority}">
                <strong>${rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}</strong>
                <p>${rec.message}</p>
                <small>文件: ${rec.file}</small>
            </div>
        `,
          )
          .join('')}
    </div>
  `;
}

function generateFileList(fileLevel) {
  return Object.entries(fileLevel)
    .map(
      ([file, coverage]) => `
        <div class="file-item">
            <span class="file-name">${file}</span>
            <div class="coverage-bars">
                <div class="coverage-bar">
                    <div class="coverage-fill ${getCoverageStatus(coverage).level}" 
                         style="width: ${coverage.lines}%"></div>
                </div>
                <span class="coverage-value">${coverage.lines.toFixed(1)}%</span>
            </div>
        </div>
    `,
    )
    .join('');
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCoverageReport();
}

export { generateCoverageReport, analyzeCoverage };
