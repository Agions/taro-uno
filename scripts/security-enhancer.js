#!/usr/bin/env node

/**
 * Taro-Uno 安全增强工具
 * 
 * 提供企业级安全功能：
 * - 依赖安全扫描
 * - 代码安全检查
 * - 漏洞检测和修复
 * - 安全配置优化
 * - 访问控制
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url))

const log = {
  info: (msg) => console.log(chalk.blue('🔒'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  title: (msg) => console.log(chalk.bold.cyan('🛡️'), msg)
}

class SecurityEnhancer {
  constructor() {
    this.securityConfig = {
      // 扫描配置
      scanDependencies: true,
      scanCode: true,
      scanConfigurations: true,
      
      // 安全策略
      enforceCSP: true,
      enforceHTTPS: true,
      enforceSRI: true,
      
      // 检查规则
      checkXSS: true,
      checkInjection: true,
      checkCSRF: true,
      checkAuth: true,
      
      // 报告配置
      generateReport: true,
      reportFormat: 'json',
      severityLevels: ['critical', 'high', 'medium', 'low']
    }
    
    this.vulnerabilities = []
    this.securityScore = 100
  }

  // 初始化安全增强器
  async initialize() {
    log.title('初始化 Taro-Uno 安全增强器...')
    
    // 创建安全报告目录
    const securityDir = join(__dirname, '..', 'security-reports')
    if (!existsSync(securityDir)) {
      mkdirSync(securityDir, { recursive: true })
    }
    
    log.success('安全增强器初始化完成')
  }

  // 执行完整安全扫描
  async runSecurityScan() {
    log.title('开始完整安全扫描...')
    
    await this.initialize()
    
    const scanResults = {
      timestamp: new Date().toISOString(),
      dependencies: [],
      code: [],
      configurations: [],
      overallScore: 100,
      vulnerabilities: [],
      recommendations: []
    }
    
    // 依赖安全扫描
    if (this.securityConfig.scanDependencies) {
      log.info('扫描依赖安全性...')
      const depResults = await this.scanDependencies()
      scanResults.dependencies = depResults
      scanResults.vulnerabilities.push(...depResults.vulnerabilities)
    }
    
    // 代码安全扫描
    if (this.securityConfig.scanCode) {
      log.info('扫描代码安全性...')
      const codeResults = await this.scanCodeSecurity()
      scanResults.code = codeResults
      scanResults.vulnerabilities.push(...codeResults.vulnerabilities)
    }
    
    // 配置安全扫描
    if (this.securityConfig.scanConfigurations) {
      log.info('扫描配置安全性...')
      const configResults = await this.scanConfigurations()
      scanResults.configurations = configResults
      scanResults.vulnerabilities.push(...configResults.vulnerabilities)
    }
    
    // 计算安全评分
    scanResults.overallScore = this.calculateSecurityScore(scanResults.vulnerabilities)
    
    // 生成建议
    scanResults.recommendations = this.generateSecurityRecommendations(scanResults)
    
    // 生成报告
    if (this.securityConfig.generateReport) {
      await this.generateSecurityReport(scanResults)
    }
    
    log.success(`安全扫描完成，安全评分: ${scanResults.overallScore}/100`)
    
    return scanResults
  }

  // 扫描依赖安全性
  async scanDependencies() {
    const results = {
      scannedPackages: [],
      vulnerabilities: [],
      outdatedPackages: [],
      totalScore: 100
    }
    
    try {
      // 运行 npm audit
      log.info('运行 npm audit...')
      const auditOutput = execSync('npm audit --json', { encoding: 'utf8' })
      const auditResults = JSON.parse(auditOutput)
      
      if (auditResults.advisories) {
        Object.values(auditResults.advisories).forEach(advisory => {
          const vulnerability = {
            type: 'dependency',
            severity: advisory.severity,
            package: advisory.module_name,
            version: advisory.findings[0]?.version || 'unknown',
            title: advisory.title,
            description: advisory.description,
            recommendation: advisory.recommendation,
            cve: advisory.cves?.[0] || null
          }
          
          results.vulnerabilities.push(vulnerability)
        })
      }
      
      // 检查过时的包
      log.info('检查过时的包...')
      const outdatedOutput = execSync('npm outdated --json', { encoding: 'utf8' })
      const outdatedResults = JSON.parse(outdatedOutput)
      
      Object.entries(outdatedResults).forEach(([packageName, info]) => {
        results.outdatedPackages.push({
          package: packageName,
          current: info.current,
          wanted: info.wanted,
          latest: info.latest,
          type: info.type
        })
      })
      
      // 扫描所有包的依赖
      const packages = this.getPackages()
      for (const pkg of packages) {
        const packageResults = await this.scanPackageDependencies(pkg)
        results.scannedPackages.push(packageResults)
        results.vulnerabilities.push(...packageResults.vulnerabilities)
      }
      
    } catch (error) {
      log.warning('依赖扫描部分失败:', error.message)
    }
    
    results.totalScore = this.calculateDependencyScore(results)
    
    return results
  }

  // 扫描单个包的依赖
  async scanPackageDependencies(packageName) {
    const results = {
      package: packageName,
      dependencies: [],
      vulnerabilities: [],
      score: 100
    }
    
    try {
      const packageDir = join(__dirname, '..', 'packages', packageName)
      const packageJsonPath = join(packageDir, 'package.json')
      
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
        const allDeps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies
        }
        
        results.dependencies = Object.entries(allDeps).map(([name, version]) => ({
          name,
          version,
          type: packageJson.dependencies[name] ? 'production' : 'development'
        }))
        
        // 在包目录中运行 audit
        try {
          const auditOutput = execSync(`cd ${packageDir} && npm audit --json`, { 
            encoding: 'utf8',
            timeout: 30000
          })
          const auditResults = JSON.parse(auditOutput)
          
          if (auditResults.advisories) {
            Object.values(auditResults.advisories).forEach(advisory => {
              results.vulnerabilities.push({
                type: 'dependency',
                severity: advisory.severity,
                package: advisory.module_name,
                version: advisory.findings[0]?.version || 'unknown',
                title: advisory.title,
                description: advisory.description,
                recommendation: advisory.recommendation,
                affectedPackage: packageName
              })
            })
          }
        } catch (auditError) {
          // 忽略单个包的审计错误
        }
      }
    } catch (error) {
      log.warning(`扫描包 ${packageName} 依赖时出错:`, error.message)
    }
    
    results.score = results.vulnerabilities.length === 0 ? 100 : Math.max(0, 100 - (results.vulnerabilities.length * 20))
    
    return results
  }

  // 扫描代码安全性
  async scanCodeSecurity() {
    const results = {
      scannedFiles: [],
      vulnerabilities: [],
      securityIssues: [],
      score: 100
    }
    
    const securityPatterns = {
      // XSS 漏洞模式
      xss: [
        /innerHTML\s*=/g,
        /outerHTML\s*=/g,
        /document\.write/g,
        /eval\s*\(/g,
        /dangerouslySetInnerHTML/g
      ],
      
      // 注入漏洞模式
      injection: [
        /exec\s*\(/g,
        /spawn\s*\(/g,
        /require\s*\(\s*['\"`][^'\"`]*\s*\+\s*[^'\"`]*['\"`]/g,
        /new\s+Function\s*\(/g,
        /setTimeout\s*\(\s*['\"][^'\"']*['\"]\s*\+\s*[^'\"']*/g
      ],
      
      // 敏感信息泄露
      sensitiveData: [
        /api[_-]?key['\"]?\s*[:=]\s*['\"][^'\"]{10,}['\"]/g,
        /password['\"]?\s*[:=]\s*['\"][^'\"]{6,}['\"]/g,
        /secret['\"]?\s*[:=]\s*['\"][^'\"]{10,}['\"]/g,
        /token['\"]?\s*[:=]\s*['\"][^'\"]{20,}['\"]/g
      ],
      
      // 不安全的函数
      unsafeFunctions: [
        /\.substr\s*\(/g,
        /\.substring\s*\(/g,
        /unescape\s*\(/g,
        /escape\s*\(/g
      ]
    }
    
    // 扫描源代码文件
    const packages = this.getPackages()
    for (const pkg of packages) {
      const packageFiles = this.scanPackageFiles(pkg, securityPatterns)
      results.scannedFiles.push(...packageFiles)
      results.vulnerabilities.push(...packageFiles.vulnerabilities)
    }
    
    results.score = results.vulnerabilities.length === 0 ? 100 : Math.max(0, 100 - (results.vulnerabilities.length * 15))
    
    return results
  }

  // 扫描包文件
  scanPackageFiles(packageName, securityPatterns) {
    const results = {
      package: packageName,
      files: [],
      vulnerabilities: [],
      score: 100
    }
    
    const packageDir = join(__dirname, '..', 'packages', packageName, 'src')
    
    const traverseDir = (dir) => {
      const files = require('fs').readdirSync(dir)
      
      files.forEach(file => {
        const filePath = join(dir, file)
        const stat = require('fs').statSync(filePath)
        
        if (stat.isDirectory()) {
          if (file !== 'node_modules' && file !== 'dist') {
            traverseDir(filePath)
          }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
          const content = readFileSync(filePath, 'utf8')
          const fileResults = this.scanFileContent(filePath, content, securityPatterns)
          
          if (fileResults.issues.length > 0) {
            results.files.push(fileResults)
            results.vulnerabilities.push(...fileResults.issues)
          }
        }
      })
    }
    
    if (existsSync(packageDir)) {
      traverseDir(packageDir)
    }
    
    return results
  }

  // 扫描文件内容
  scanFileContent(filePath, content, securityPatterns) {
    const results = {
      file: filePath,
      issues: [],
      score: 100
    }
    
    Object.entries(securityPatterns).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        const matches = content.match(pattern)
        if (matches) {
          matches.forEach(match => {
            const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length
            results.issues.push({
              type: category,
              severity: this.getSeverityLevel(category),
              file: filePath,
              line: lineIndex,
              match: match,
              description: this.getIssueDescription(category, match)
            })
          })
        }
      })
    })
    
    results.score = results.issues.length === 0 ? 100 : Math.max(0, 100 - (results.issues.length * 25))
    
    return results
  }

  // 扫描配置安全性
  async scanConfigurations() {
    const results = {
      configurations: [],
      vulnerabilities: [],
      score: 100
    }
    
    // 检查 Webpack 配置
    const webpackConfigs = [
      'webpack.config.js',
      'webpack.config.ts',
      'vite.config.js',
      'vite.config.ts'
    ]
    
    webpackConfigs.forEach(configFile => {
      const configPath = join(__dirname, '..', configFile)
      if (existsSync(configPath)) {
        const configResults = this.checkWebpackConfig(configPath)
        results.configurations.push(configResults)
        results.vulnerabilities.push(...configResults.issues)
      }
    })
    
    // 检查 TypeScript 配置
    const tsConfigPath = join(__dirname, '..', 'tsconfig.json')
    if (existsSync(tsConfigPath)) {
      const tsResults = this.checkTypeScriptConfig(tsConfigPath)
      results.configurations.push(tsResults)
      results.vulnerabilities.push(...tsResults.issues)
    }
    
    // 检查 ESLint 配置
    const eslintConfigs = [
      '.eslintrc.js',
      '.eslintrc.json',
      '.eslintrc.yml',
      '.eslintrc.yaml'
    ]
    
    eslintConfigs.forEach(configFile => {
      const configPath = join(__dirname, '..', configFile)
      if (existsSync(configPath)) {
        const eslintResults = this.checkESLintConfig(configPath)
        results.configurations.push(eslintResults)
        results.vulnerabilities.push(...eslintResults.issues)
      }
    })
    
    results.score = results.vulnerabilities.length === 0 ? 100 : Math.max(0, 100 - (results.vulnerabilities.length * 20))
    
    return results
  }

  // 检查 Webpack 配置安全性
  checkWebpackConfig(configPath) {
    const results = {
      file: configPath,
      type: 'webpack',
      issues: [],
      score: 100
    }
    
    try {
      const content = readFileSync(configPath, 'utf8')
      
      // 检查开发服务器配置
      if (content.includes('devServer') && !content.includes('https:')) {
        results.issues.push({
          type: 'configuration',
          severity: 'medium',
          description: '开发服务器未启用 HTTPS',
          recommendation: '启用 HTTPS 以提高开发环境安全性'
        })
      }
      
      // 检查源码映射配置
      if (content.includes('source-map') && !content.includes('hidden-source-map')) {
        results.issues.push({
          type: 'configuration',
          severity: 'low',
          description: '源码映射可能暴露源代码',
          recommendation: '使用 hidden-source-map 或在生产环境中禁用源码映射'
        })
      }
      
      // 检查压缩配置
      if (!content.includes('TerserPlugin')) {
        results.issues.push({
          type: 'configuration',
          severity: 'low',
          description: '未配置代码压缩',
          recommendation: '使用 TerserPlugin 压缩代码'
        })
      }
      
    } catch (error) {
      results.issues.push({
        type: 'configuration',
        severity: 'low',
        description: '无法读取配置文件',
        recommendation: '检查配置文件格式和权限'
      })
    }
    
    results.score = results.issues.length === 0 ? 100 : Math.max(0, 100 - (results.issues.length * 20))
    
    return results
  }

  // 检查 TypeScript 配置安全性
  checkTypeScriptConfig(configPath) {
    const results = {
      file: configPath,
      type: 'typescript',
      issues: [],
      score: 100
    }
    
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf8'))
      
      // 检查严格模式
      if (!config.compilerOptions?.strict) {
        results.issues.push({
          type: 'configuration',
          severity: 'medium',
          description: 'TypeScript 未启用严格模式',
          recommendation: '启用 strict 模式以提高类型安全性'
        })
      }
      
      // 检查 noImplicitAny
      if (!config.compilerOptions?.noImplicitAny) {
        results.issues.push({
          type: 'configuration',
          severity: 'medium',
          description: '未启用 noImplicitAny',
          recommendation: '启用 noImplicitAny 以避免隐式 any 类型'
        })
      }
      
    } catch (error) {
      results.issues.push({
        type: 'configuration',
        severity: 'low',
        description: '无法读取 TypeScript 配置',
        recommendation: '检查配置文件格式'
      })
    }
    
    results.score = results.issues.length === 0 ? 100 : Math.max(0, 100 - (results.issues.length * 20))
    
    return results
  }

  // 检查 ESLint 配置安全性
  checkESLintConfig(configPath) {
    const results = {
      file: configPath,
      type: 'eslint',
      issues: [],
      score: 100
    }
    
    try {
      let config = {}
      
      if (configPath.endsWith('.js')) {
        // 对于 .js 配置文件，简化处理
        const content = readFileSync(configPath, 'utf8')
        if (content.includes('no-eval') || content.includes('no-implied-eval')) {
          // 基本检查
        }
      } else {
        config = JSON.parse(readFileSync(configPath, 'utf8'))
      }
      
      // 检查安全规则
      const securityRules = [
        'no-eval',
        'no-implied-eval',
        'no-new-func',
        'no-script-url',
        'react/no-danger',
        'no-unsafe-innerhtml'
      ]
      
      const missingRules = securityRules.filter(rule => {
        return !JSON.stringify(config).includes(rule)
      })
      
      if (missingRules.length > 0) {
        results.issues.push({
          type: 'configuration',
          severity: 'medium',
          description: `缺少安全规则: ${missingRules.join(', ')}`,
          recommendation: '添加安全相关的 ESLint 规则'
        })
      }
      
    } catch (error) {
      results.issues.push({
        type: 'configuration',
        severity: 'low',
        description: '无法读取 ESLint 配置',
        recommendation: '检查配置文件格式'
      })
    }
    
    results.score = results.issues.length === 0 ? 100 : Math.max(0, 100 - (results.issues.length * 20))
    
    return results
  }

  // 获取严重性级别
  getSeverityLevel(category) {
    const severityMap = {
      xss: 'high',
      injection: 'critical',
      sensitiveData: 'high',
      unsafeFunctions: 'medium',
      configuration: 'low'
    }
    
    return severityMap[category] || 'medium'
  }

  // 获取问题描述
  getIssueDescription(category, match) {
    const descriptions = {
      xss: '潜在的 XSS 漏洞',
      injection: '潜在的代码注入漏洞',
      sensitiveData: '敏感信息泄露',
      unsafeFunctions: '使用不安全的函数',
      configuration: '配置安全问题'
    }
    
    return descriptions[category] || '安全问题'
  }

  // 计算安全评分
  calculateSecurityScore(vulnerabilities) {
    let score = 100
    const severityWeights = {
      critical: 20,
      high: 15,
      medium: 10,
      low: 5
    }
    
    vulnerabilities.forEach(vuln => {
      const weight = severityWeights[vuln.severity] || 10
      score -= weight
    })
    
    return Math.max(0, score)
  }

  // 计算依赖评分
  calculateDependencyScore(results) {
    let score = 100
    
    // 漏洞扣分
    results.vulnerabilities.forEach(vuln => {
      const weights = { critical: 25, high: 20, medium: 15, low: 10 }
      score -= weights[vuln.severity] || 10
    })
    
    // 过时包扣分
    score -= results.outdatedPackages.length * 5
    
    return Math.max(0, score)
  }

  // 生成安全建议
  generateSecurityRecommendations(scanResults) {
    const recommendations = []
    
    // 依赖安全建议
    if (scanResults.dependencies.vulnerabilities.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'dependencies',
        title: '修复依赖漏洞',
        description: `发现 ${scanResults.dependencies.vulnerabilities.length} 个依赖漏洞`,
        actions: [
          '运行 npm audit fix 自动修复可修复的漏洞',
          '手动更新存在漏洞的依赖包',
          '使用 npm outdated 检查过时的包'
        ]
      })
    }
    
    // 代码安全建议
    if (scanResults.code.vulnerabilities.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'code',
        title: '修复代码安全问题',
        description: `发现 ${scanResults.code.vulnerabilities.length} 个代码安全问题`,
        actions: [
          '替换不安全的函数如 eval()、innerHTML',
          '使用安全的 API 替代危险操作',
          '实施输入验证和输出编码'
        ]
      })
    }
    
    // 配置安全建议
    if (scanResults.configurations.vulnerabilities.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'configuration',
        title: '优化安全配置',
        description: `发现 ${scanResults.configurations.vulnerabilities.length} 个配置问题`,
        actions: [
          '启用 TypeScript 严格模式',
          '配置安全相关的 ESLint 规则',
          '优化构建配置以提高安全性'
        ]
      })
    }
    
    // 通用建议
    recommendations.push({
      priority: 'medium',
      category: 'general',
      title: '实施安全最佳实践',
      description: '提升整体安全性',
      actions: [
        '定期进行安全扫描',
        '实施代码审查流程',
        '使用自动化安全工具',
        '保持依赖包更新'
      ]
    })
    
    return recommendations
  }

  // 生成安全报告
  async generateSecurityReport(scanResults) {
    const timestamp = new Date().toISOString().split('T')[0]
    const reportPath = join(__dirname, '..', 'security-reports', `security-report-${timestamp}.json`)
    
    const report = {
      ...scanResults,
      summary: {
        totalVulnerabilities: scanResults.vulnerabilities.length,
        criticalVulnerabilities: scanResults.vulnerabilities.filter(v => v.severity === 'critical').length,
        highVulnerabilities: scanResults.vulnerabilities.filter(v => v.severity === 'high').length,
        mediumVulnerabilities: scanResults.vulnerabilities.filter(v => v.severity === 'medium').length,
        lowVulnerabilities: scanResults.vulnerabilities.filter(v => v.severity === 'low').length,
        securityScore: scanResults.overallScore,
        scanDate: scanResults.timestamp
      }
    }
    
    writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    // 生成 Markdown 报告
    const markdownReport = this.generateMarkdownReport(report)
    const markdownPath = join(__dirname, '..', 'security-reports', `security-report-${timestamp}.md`)
    writeFileSync(markdownPath, markdownReport)
    
    log.success(`安全报告已生成: ${reportPath}`)
    log.success(`Markdown 报告已生成: ${markdownPath}`)
    
    return report
  }

  // 生成 Markdown 报告
  generateMarkdownReport(report) {
    return `# Taro-Uno 安全报告

**扫描时间**: ${report.summary.scanDate}
**安全评分**: ${report.summary.securityScore}/100

## 📊 安全概览

- **总漏洞数**: ${report.summary.totalVulnerabilities}
- **严重漏洞**: ${report.summary.criticalVulnerabilities}
- **高危漏洞**: ${report.summary.highVulnerabilities}
- **中危漏洞**: ${report.summary.mediumVulnerabilities}
- **低危漏洞**: ${report.summary.lowVulnerabilities}

## 🚨 关键安全问题

### 严重漏洞 (Critical)
${report.vulnerabilities.filter(v => v.severity === 'critical').map(v => `- **${v.title}** (${v.package || v.file})`).join('\n') || '无'}

### 高危漏洞 (High)
${report.vulnerabilities.filter(v => v.severity === 'high').map(v => `- **${v.title}** (${v.package || v.file})`).join('\n') || '无'}

## 📋 详细建议

${report.recommendations.map(rec => `
### ${rec.title} (${rec.priority})
**描述**: ${rec.description}

**操作步骤**:
${rec.actions.map(action => `- ${action}`).join('\n')}
`).join('\n')}

## 🔧 修复步骤

### 1. 依赖安全
\`\`\`bash
# 自动修复依赖漏洞
npm audit fix

# 检查过时的包
npm outdated

# 更新特定包
npm update package-name
\`\`\`

### 2. 代码安全
- 替换不安全的函数调用
- 实施输入验证
- 使用安全的 API

### 3. 配置安全
- 启用 TypeScript 严格模式
- 配置安全规则
- 优化构建配置

## 📈 改进计划

1. **立即处理** (1-3天): 修复所有严重和高危漏洞
2. **短期改进** (1-2周): 处理中危漏洞，优化配置
3. **长期维护** (持续): 定期安全扫描，建立安全流程

---

*此报告由 Taro-Uno 安全增强工具生成*
`
  }

  // 获取包列表
  getPackages() {
    const packagesDir = join(__dirname, '..', 'packages')
    const packages = []
    
    try {
      const items = require('fs').readdirSync(packagesDir, { withFileTypes: true })
      
      for (const item of items) {
        if (item.isDirectory()) {
          const pkgPath = join(packagesDir, item.name, 'package.json')
          if (existsSync(pkgPath)) {
            packages.push(item.name)
          }
        }
      }
    } catch (error) {
      log.error('读取包列表失败:', error.message)
    }
    
    return packages
  }

  // 修复安全漏洞
  async fixVulnerabilities() {
    log.title('开始修复安全漏洞...')
    
    try {
      // 修复依赖漏洞
      log.info('修复依赖漏洞...')
      execSync('npm audit fix', { stdio: 'inherit' })
      
      // 更新过时的包
      log.info('更新过时的包...')
      execSync('npm update', { stdio: 'inherit' })
      
      log.success('安全漏洞修复完成')
      
    } catch (error) {
      log.error('修复漏洞时出错:', error.message)
    }
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  
  if (!command || command === '--help') {
    console.log(`
Taro-Uno 安全增强工具

使用方法:
  node scripts/security-enhancer.js <command>

命令:
  scan     执行完整安全扫描
  fix      自动修复安全漏洞
  report   生成安全报告
  help     显示帮助信息

示例:
  node scripts/security-enhancer.js scan
  node scripts/security-enhancer.js fix
`)
    return
  }
  
  const enhancer = new SecurityEnhancer()
  
  try {
    switch (command) {
      case 'scan':
        await enhancer.runSecurityScan()
        break
      case 'fix':
        await enhancer.fixVulnerabilities()
        break
      case 'report':
        const results = await enhancer.runSecurityScan()
        console.log('安全报告已生成到 security-reports 目录')
        break
      default:
        log.error(`未知命令: ${command}`)
    }
  } catch (error) {
    log.error('安全增强失败:', error.message)
    process.exit(1)
  }
}

// 运行
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { SecurityEnhancer }