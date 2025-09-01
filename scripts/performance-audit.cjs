#!/usr/bin/env node

/**
 * Taro-Uno 性能审计脚本
 * 用于全面审计应用性能并生成报告
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

class PerformanceAudit {
  constructor() {
    this.startTime = performance.now()
    this.results = {
      timestamp: new Date().toISOString(),
      buildPerformance: {},
      bundleAnalysis: {},
      codeQuality: {},
      performanceMetrics: {},
      optimizationScore: 0,
      recommendations: []
    }
  }

  // 记录性能指标
  recordMetric(category, name, value, unit = 'ms') {
    if (!this.results[category]) {
      this.results[category] = {}
    }
    this.results[category][name] = {
      value,
      unit,
      timestamp: Date.now()
    }
  }

  // 执行构建性能测试
  async auditBuildPerformance() {
    console.log('🔧 审计构建性能...')
    
    const buildStart = performance.now()
    
    try {
      // 清理之前的构建
      if (fs.existsSync('dist')) {
        fs.rmSync('dist', { recursive: true })
      }
      
      // 执行构建
      execSync('npm run build:bundle', { stdio: 'pipe' })
      
      const buildTime = performance.now() - buildStart
      this.recordMetric('buildPerformance', 'buildTime', buildTime)
      
      // 检查增量构建
      const incrementalStart = performance.now()
      execSync('npm run build:bundle', { stdio: 'pipe' })
      const incrementalTime = performance.now() - incrementalStart
      this.recordMetric('buildPerformance', 'incrementalBuildTime', incrementalTime)
      
      console.log('✅ 构建性能审计完成')
      
    } catch (error) {
      console.error('❌ 构建性能审计失败:', error.message)
      this.recordMetric('buildPerformance', 'buildError', 1)
    }
  }

  // 审计包体积
  async auditBundleSize() {
    console.log('📦 审计包体积...')
    
    try {
      // 生成包分析报告
      execSync('ANALYZE=true npm run build:bundle', { stdio: 'pipe' })
      
      // 分析 dist 目录
      const distPath = path.join(__dirname, '../dist')
      if (fs.existsSync(distPath)) {
        const analysis = this.analyzeDirectory(distPath)
        
        this.recordMetric('bundleAnalysis', 'totalSize', analysis.totalSize, 'bytes')
        this.recordMetric('bundleAnalysis', 'fileCount', analysis.fileCount)
        this.recordMetric('bundleAnalysis', 'jsSize', analysis.jsSize, 'bytes')
        this.recordMetric('bundleAnalysis', 'cssSize', analysis.cssSize, 'bytes')
        this.recordMetric('bundleAnalysis', 'assetSize', analysis.assetSize, 'bytes')
        
        // 分析最大的文件
        if (analysis.largestFiles.length > 0) {
          this.recordMetric('bundleAnalysis', 'largestFile', analysis.largestFiles[0].size, 'bytes')
        }
      }
      
      console.log('✅ 包体积审计完成')
      
    } catch (error) {
      console.error('❌ 包体积审计失败:', error.message)
    }
  }

  // 分析目录
  analyzeDirectory(dir) {
    const analysis = {
      totalSize: 0,
      fileCount: 0,
      jsSize: 0,
      cssSize: 0,
      assetSize: 0,
      largestFiles: []
    }

    const analyzeDirectory = (currentDir) => {
      const files = fs.readdirSync(currentDir)
      
      files.forEach(file => {
        const filePath = path.join(currentDir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          analyzeDirectory(filePath)
        } else {
          const size = stat.size
          const ext = path.extname(file).toLowerCase()
          
          analysis.totalSize += size
          analysis.fileCount++
          
          if (ext === '.js' || ext === '.mjs') {
            analysis.jsSize += size
          } else if (ext === '.css' || ext === '.scss') {
            analysis.cssSize += size
          } else {
            analysis.assetSize += size
          }
          
          analysis.largestFiles.push({
            name: path.relative(dir, filePath),
            size: size,
            ext: ext
          })
        }
      })
    }

    analyzeDirectory(dir)
    
    // 按大小排序并保留前10个
    analysis.largestFiles.sort((a, b) => b.size - a.size)
    analysis.largestFiles = analysis.largestFiles.slice(0, 10)
    
    return analysis
  }

  // 审计代码质量
  async auditCodeQuality() {
    console.log('🔍 审计代码质量...')
    
    try {
      // 运行 ESLint
      const lintStart = performance.now()
      execSync('npm run lint', { stdio: 'pipe' })
      const lintTime = performance.now() - lintStart
      this.recordMetric('codeQuality', 'lintTime', lintTime)
      this.recordMetric('codeQuality', 'lintErrors', 0)
      
    } catch (error) {
      this.recordMetric('codeQuality', 'lintErrors', 1)
      this.recordMetric('codeQuality', 'lintTime', 0)
    }
    
    try {
      // 运行类型检查
      const typeCheckStart = performance.now()
      execSync('npm run type-check', { stdio: 'pipe' })
      const typeCheckTime = performance.now() - typeCheckStart
      this.recordMetric('codeQuality', 'typeCheckTime', typeCheckTime)
      this.recordMetric('codeQuality', 'typeErrors', 0)
      
    } catch (error) {
      this.recordMetric('codeQuality', 'typeErrors', 1)
      this.recordMetric('codeQuality', 'typeCheckTime', 0)
    }
    
    try {
      // 运行测试
      const testStart = performance.now()
      execSync('npm run test:run', { stdio: 'pipe' })
      const testTime = performance.now() - testStart
      this.recordMetric('codeQuality', 'testTime', testTime)
      this.recordMetric('codeQuality', 'testErrors', 0)
      
    } catch (error) {
      this.recordMetric('codeQuality', 'testErrors', 1)
      this.recordMetric('codeQuality', 'testTime', 0)
    }
    
    console.log('✅ 代码质量审计完成')
  }

  // 审计性能指标
  async auditPerformanceMetrics() {
    console.log('📊 审计性能指标...')
    
    try {
      // 检查性能相关配置
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const hasPerformanceScripts = Object.keys(packageJson.scripts).some(script => 
        script.includes('perf') || script.includes('performance')
      )
      this.recordMetric('performanceMetrics', 'hasPerformanceScripts', hasPerformanceScripts ? 1 : 0)
      
      // 检查性能相关依赖
      const perfDeps = [
        'vite-plugin-compression',
        'rollup-plugin-visualizer',
        'vite-plugin-imagemin',
        'vite-plugin-pwa'
      ]
      const perfDepCount = perfDeps.filter(dep => packageJson.devDependencies?.[dep]).length
      this.recordMetric('performanceMetrics', 'performanceDeps', perfDepCount)
      
      // 检查缓存配置
      const hasCacheConfig = fs.existsSync('.vite') || fs.existsSync('.turbo')
      this.recordMetric('performanceMetrics', 'hasCacheConfig', hasCacheConfig ? 1 : 0)
      
      console.log('✅ 性能指标审计完成')
      
    } catch (error) {
      console.error('❌ 性能指标审计失败:', error.message)
    }
  }

  // 计算优化分数
  calculateOptimizationScore() {
    let score = 0
    let maxScore = 0
    
    // 构建性能分数 (30%)
    maxScore += 30
    if (this.results.buildPerformance.buildTime?.value < 30000) score += 15
    if (this.results.buildPerformance.incrementalBuildTime?.value < 5000) score += 15
    
    // 包体积分数 (25%)
    maxScore += 25
    if (this.results.bundleAnalysis.totalSize?.value < 1024 * 1024) score += 15
    if (this.results.bundleAnalysis.jsSize?.value < 512 * 1024) score += 10
    
    // 代码质量分数 (25%)
    maxScore += 25
    if (this.results.codeQuality.lintErrors?.value === 0) score += 10
    if (this.results.codeQuality.typeErrors?.value === 0) score += 10
    if (this.results.codeQuality.testErrors?.value === 0) score += 5
    
    // 性能指标分数 (20%)
    maxScore += 20
    if (this.results.performanceMetrics.hasPerformanceScripts?.value === 1) score += 10
    if (this.results.performanceMetrics.performanceDeps?.value >= 3) score += 5
    if (this.results.performanceMetrics.hasCacheConfig?.value === 1) score += 5
    
    this.results.optimizationScore = Math.round((score / maxScore) * 100)
  }

  // 生成优化建议
  generateRecommendations() {
    const recommendations = []
    
    // 构建性能建议
    if (this.results.buildPerformance.buildTime?.value > 30000) {
      recommendations.push({
        category: '构建性能',
        priority: 'high',
        issue: '构建时间过长',
        suggestion: '启用缓存、代码分割、并行构建等技术优化构建速度'
      })
    }
    
    // 包体积建议
    if (this.results.bundleAnalysis.totalSize?.value > 1024 * 1024) {
      recommendations.push({
        category: '包体积',
        priority: 'high',
        issue: '包体积过大',
        suggestion: '使用 Tree Shaking、代码分割、按需加载等技术减小包体积'
      })
    }
    
    // 代码质量建议
    if (this.results.codeQuality.lintErrors?.value > 0) {
      recommendations.push({
        category: '代码质量',
        priority: 'medium',
        issue: '代码规范问题',
        suggestion: '修复 ESLint 错误，确保代码符合规范'
      })
    }
    
    // 性能指标建议
    if (this.results.performanceMetrics.performanceDeps?.value < 3) {
      recommendations.push({
        category: '性能优化',
        priority: 'medium',
        issue: '性能优化工具不足',
        suggestion: '添加更多性能优化依赖，如压缩插件、分析工具等'
      })
    }
    
    this.results.recommendations = recommendations
  }

  // 生成报告
  generateReport() {
    console.log('📄 生成性能审计报告...')
    
    const reportPath = path.join(__dirname, '../performance-audit-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2))
    
    console.log('📊 性能审计报告已保存到:', reportPath)
    return reportPath
  }

  // 显示结果
  displayResults() {
    console.log('\n🎯 性能审计结果')
    console.log('================')
    
    console.log(`⭐ 优化分数: ${this.results.optimizationScore}/100`)
    
    console.log('\n📊 构建性能:')
    if (this.results.buildPerformance.buildTime) {
      console.log(`  构建时间: ${(this.results.buildPerformance.buildTime.value / 1000).toFixed(2)}s`)
    }
    if (this.results.buildPerformance.incrementalBuildTime) {
      console.log(`  增量构建时间: ${(this.results.buildPerformance.incrementalBuildTime.value / 1000).toFixed(2)}s`)
    }
    
    console.log('\n📦 包体积:')
    if (this.results.bundleAnalysis.totalSize) {
      console.log(`  总大小: ${(this.results.bundleAnalysis.totalSize.value / 1024 / 1024).toFixed(2)}MB`)
    }
    if (this.results.bundleAnalysis.jsSize) {
      console.log(`  JS 大小: ${(this.results.bundleAnalysis.jsSize.value / 1024 / 1024).toFixed(2)}MB`)
    }
    
    console.log('\n🔍 代码质量:')
    console.log(`  Lint 错误: ${this.results.codeQuality.lintErrors?.value || 0}`)
    console.log(`  类型错误: ${this.results.codeQuality.typeErrors?.value || 0}`)
    console.log(`  测试错误: ${this.results.codeQuality.testErrors?.value || 0}`)
    
    console.log('\n💡 优化建议:')
    this.results.recommendations.forEach((rec, index) => {
      const priority = rec.priority === 'high' ? '🔴' : 
                      rec.priority === 'medium' ? '🟡' : '🟢'
      console.log(`  ${priority} ${index + 1}. [${rec.category}] ${rec.issue}`)
      console.log(`     建议: ${rec.suggestion}`)
    })
    
    console.log('\n✨ 性能审计完成!')
  }

  // 运行审计
  async run() {
    try {
      console.log('🚀 开始性能审计...')
      
      // 1. 构建性能审计
      await this.auditBuildPerformance()
      
      // 2. 包体积审计
      await this.auditBundleSize()
      
      // 3. 代码质量审计
      await this.auditCodeQuality()
      
      // 4. 性能指标审计
      await this.auditPerformanceMetrics()
      
      // 5. 计算优化分数
      this.calculateOptimizationScore()
      
      // 6. 生成建议
      this.generateRecommendations()
      
      // 7. 生成报告
      await this.generateReport()
      
      // 8. 显示结果
      this.displayResults()
      
      const totalTime = performance.now() - this.startTime
      console.log(`\n⏱️  总审计时间: ${(totalTime / 1000).toFixed(2)}s`)
      
    } catch (error) {
      console.error('❌ 性能审计失败:', error)
      process.exit(1)
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const audit = new PerformanceAudit()
  audit.run()
}

module.exports = PerformanceAudit