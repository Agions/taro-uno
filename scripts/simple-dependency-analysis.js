#!/usr/bin/env node

/**
 * 简化的依赖分析工具
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取所有包的信息
function getAllPackages() {
  const packagesDir = path.join(__dirname, '..', 'packages');
  const packages = [];

  const packageDirs = fs.readdirSync(packagesDir);

  for (const dir of packageDirs) {
    const packagePath = path.join(packagesDir, dir);
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packages.push({
          name: packageJson.name,
          version: packageJson.version,
          description: packageJson.description || '',
          dependencies: packageJson.dependencies || {},
          devDependencies: packageJson.devDependencies || {},
          peerDependencies: packageJson.peerDependencies || {},
          path: packagePath,
        });
      } catch (error) {
        console.error(`Error reading ${packageJsonPath}:`, error.message);
      }
    }
  }

  return packages;
}

// 分析依赖关系
function analyzeDependencies(packages) {
  const dependencyMap = new Map();
  const reverseDependencyMap = new Map();

  // 初始化映射
  packages.forEach((pkg) => {
    dependencyMap.set(pkg.name, new Set());
    reverseDependencyMap.set(pkg.name, new Set());
  });

  // 分析依赖关系
  packages.forEach((pkg) => {
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    };

    Object.keys(allDeps).forEach((dep) => {
      if (dep.startsWith('@taro-uno/')) {
        dependencyMap.get(pkg.name).add(dep);
        reverseDependencyMap.get(dep).add(pkg.name);
      }
    });
  });

  return { dependencyMap, reverseDependencyMap };
}

// 检测循环依赖
function detectCircularDependencies(dependencyMap) {
  const visited = new Set();
  const recursionStack = new Set();
  const circularDeps = [];

  function dfs(packageName, path = []) {
    if (recursionStack.has(packageName)) {
      const cycleStart = path.indexOf(packageName);
      const cycle = [...path.slice(cycleStart), packageName];
      circularDeps.push(cycle);
      return;
    }

    if (visited.has(packageName)) {
      return;
    }

    visited.add(packageName);
    recursionStack.add(packageName);

    const dependencies = dependencyMap.get(packageName) || new Set();
    dependencies.forEach((dep) => {
      dfs(dep, [...path, packageName]);
    });

    recursionStack.delete(packageName);
  }

  // 从每个包开始检测
  dependencyMap.forEach((_, packageName) => {
    if (!visited.has(packageName)) {
      dfs(packageName);
    }
  });

  return circularDeps;
}

// 生成报告
function generateReport() {
  const packages = getAllPackages();
  const { dependencyMap, reverseDependencyMap } = analyzeDependencies(packages);
  const circularDeps = detectCircularDependencies(dependencyMap);

  let report = '# Taro-Uno 依赖分析报告\n\n';
  report += `生成时间: ${new Date().toLocaleString()}\n\n`;

  // 包概览
  report += '## 1. 包概览\n\n';
  report += `共有 ${packages.length} 个包:\n\n`;
  packages.forEach((pkg) => {
    report += `- **${pkg.name}** (${pkg.version}): ${pkg.description}\n`;
  });

  // 依赖关系
  report += '\n## 2. 依赖关系\n\n';
  report += '### 2.1 直接依赖\n\n';
  dependencyMap.forEach((dependencies, packageName) => {
    if (dependencies.size > 0) {
      report += `**${packageName}** 依赖于:\n`;
      dependencies.forEach((dep) => {
        report += `  - ${dep}\n`;
      });
      report += '\n';
    }
  });

  // 循环依赖
  report += '## 3. 循环依赖分析\n\n';
  if (circularDeps.length > 0) {
    report += '❌ 发现以下循环依赖:\n\n';
    circularDeps.forEach((cycle, index) => {
      report += `### 循环依赖 ${index + 1}\n`;
      report += `${cycle.join(' -> ')}\n\n`;
    });
  } else {
    report += '✅ 未发现循环依赖\n\n';
  }

  // 依赖关系图
  report += '## 4. 依赖关系图\n\n';
  report += '```mermaid\ngraph TD\n';
  dependencyMap.forEach((dependencies, packageName) => {
    dependencies.forEach((dep) => {
      report += `  ${packageName.replace(/[^a-zA-Z0-9]/g, '_')} --> ${dep.replace(/[^a-zA-Z0-9]/g, '_')}\n`;
    });
  });
  report += '```\n\n';

  // 架构建议
  report += '## 5. 架构建议\n\n';
  if (circularDeps.length > 0) {
    report += '### 发现的问题\n';
    circularDeps.forEach((cycle, index) => {
      report += `${index + 1}. 循环依赖: ${cycle.join(' -> ')}\n`;
    });
    report += '\n';

    report += '### 建议的解决方案\n';
    report += '1. **拆分core包职责**: 将core包拆分为多个专门的包\n';
    report += '2. **引入抽象层**: 在循环依赖之间创建抽象接口\n';
    report += '3. **重新设计依赖关系**: 确保依赖关系是单向的\n';
    report += '4. **使用事件总线**: 对于需要双向通信的包，使用事件总线模式\n';
  } else {
    report += '✅ 当前架构良好，没有发现循环依赖问题\n';
  }

  return report;
}

// 主函数
function main() {
  try {
    const report = generateReport();

    // 输出到控制台
    console.log(report);

    // 保存到文件
    const reportPath = path.join(__dirname, '..', 'dependency-analysis-report.md');
    fs.writeFileSync(reportPath, report);
    console.log(`\n报告已保存到: ${reportPath}`);
  } catch (error) {
    console.error('分析过程中出现错误:', error);
    process.exit(1);
  }
}

main();
