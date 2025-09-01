#!/usr/bin/env node

/**
 * Taro-Uno 性能监控脚本
 * 用于实时监控应用性能指标
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

class PerformanceMonitor {
  constructor() {
    this.isRunning = false
    this.monitoringInterval = null
    this.metrics = {
      timestamp: new Date().toISOString(),
      system: {},
      build: {},
      bundle: {},
      tests: {},
      performance: {}
    }
    this.history = []
    this.maxHistory = 100
  }

  // 开始监控
  start() {
    if (this.isRunning) {
      console.log('⚠️  监控已在运行中')
      return
    }

    console.log('🚀 开始性能监控...')
    this.isRunning = true
    
    // 立即执行一次监控
    this.collectMetrics()
    
    // 设置定时监控
    this.monitoringInterval = setInterval(() => {
      this.collectMetrics()
    }, 5000) // 每5秒监控一次
    
    // 设置控制台交互
    this.setupConsoleInteraction()
  }

  // 停止监控
  stop() {
    if (!this.isRunning) {
      console.log('⚠️  监控未运行')
      return
    }

    console.log('🛑 停止性能监控...')
    this.isRunning = false
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
    
    // 生成最终报告
    this.generateReport()
  }

  // 收集性能指标
  async collectMetrics() {
    try {
      const timestamp = new Date().toISOString()
      
      // 系统指标
      await this.collectSystemMetrics()
      
      // 构建指标
      await this.collectBuildMetrics()
      
      // 包体积指标
      await this.collectBundleMetrics()
      
      // 测试指标
      await this.collectTestMetrics()
      
      // 性能指标
      await this.collectPerformanceMetrics()
      
      // 更新时间戳
      this.metrics.timestamp = timestamp
      
      // 添加到历史记录
      this.addToHistory()
      
      // 显示实时指标
      this.displayMetrics()
      
    } catch (error) {
      console.error('❌ 收集性能指标失败:', error.message)
    }
  }

  // 收集系统指标
  async collectSystemMetrics() {
    try {
      const memUsage = process.memoryUsage()
      const cpuUsage = process.cpuUsage()
      
      this.metrics.system = {
        memory: {
          rss: memUsage.rss,
          heapTotal: memUsage.heapTotal,
          heapUsed: memUsage.heapUsed,
          external: memUsage.external,
          percentage: (memUsage.heapUsed / memUsage.heapTotal) * 100
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system
        },
        uptime: process.uptime(),
        timestamp: Date.now()
      }
    } catch (error) {
      console.error('收集系统指标失败:', error.message)
    }
  }

  // 收集构建指标
  async collectBuildMetrics() {
    try {
      // 检查是否有构建文件
      const distExists = fs.existsSync('dist')
      this.metrics.build.distExists = distExists
      
      if (distExists) {
        const stats = fs.statSync('dist')
        this.metrics.build.distSize = stats.size
        this.metrics.build.distModified = stats.mtime
      }
      
      // 检查构建缓存
      const viteCacheExists = fs.existsSync('.vite')
      const turboCacheExists = fs.existsSync('.turbo')
      this.metrics.build.cacheExists = viteCacheExists || turboCacheExists
      
    } catch (error) {
      console.error('收集构建指标失败:', error.message)
    }
  }

  // 收集包体积指标
  async collectBundleMetrics() {
    try {
      if (!fs.existsSync('dist')) {
        this.metrics.bundle = { exists: false }
        return
      }
      
      const bundleAnalysis = this.analyzeBundle('dist')
      this.metrics.bundle = {
        exists: true,
        ...bundleAnalysis,
        timestamp: Date.now()
      }
      
    } catch (error) {
      console.error('收集包体积指标失败:', error.message)
    }
  }

  // 分析包体积
  analyzeBundle(dir) {
    const analysis = {
      totalSize: 0,
      fileCount: 0,
      jsSize: 0,
      cssSize: 0,
      assetSize: 0,
      largestFile: null,
      files: []
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
          
          const fileInfo = {
            name: path.relative(dir, filePath),
            size: size,
            ext: ext,
            modified: stat.mtime
          }
          
          analysis.files.push(fileInfo)
          
          if (!analysis.largestFile || size > analysis.largestFile.size) {
            analysis.largestFile = fileInfo
          }
        }
      })
    }

    analyzeDirectory(dir)
    return analysis
  }

  // 收集测试指标
  async collectTestMetrics() {
    try {
      // 检查测试覆盖率报告
      const coverageExists = fs.existsSync('coverage')
      this.metrics.tests.coverageExists = coverageExists
      
      if (coverageExists) {
        try {
          const coverageData = this.readCoverageReport()
          this.metrics.tests.coverage = coverageData
        } catch (error) {
          console.error('读取测试覆盖率失败:', error.message)
        }
      }
      
      // 检查测试文件
      const testFiles = this.findTestFiles()
      this.metrics.tests.testFileCount = testFiles.length
      this.metrics.tests.testFiles = testFiles
      
    } catch (error) {
      console.error('收集测试指标失败:', error.message)
    }
  }

  // 读取测试覆盖率报告
  readCoverageReport() {
    try {
      const coveragePath = path.join('coverage', 'coverage-final.json')
      if (fs.existsSync(coveragePath)) {
        const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
        return {
          totalLines: coverageData.total?.lines?.pct || 0,
          totalStatements: coverageData.total?.statements?.pct || 0,
          totalBranches: coverageData.total?.branches?.pct || 0,
          totalFunctions: coverageData.total?.functions?.pct || 0
        }
      }
    } catch (error) {
      console.error('读取覆盖率报告失败:', error.message)
    }
    return null
  }

  // 查找测试文件
  findTestFiles() {
    const testFiles = []
    const searchDirs = ['src', 'tests']
    
    searchDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.findTestFilesInDir(dir, testFiles)
      }
    })
    
    return testFiles
  }

  findTestFilesInDir(dir, testFiles) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        this.findTestFilesInDir(filePath, testFiles)
      } else if (file.includes('.test.') || file.includes('.spec.')) {
        testFiles.push({
          name: file,
          path: filePath,
          size: stat.size,
          modified: stat.mtime
        })
      }
    })
  }

  // 收集性能指标
  async collectPerformanceMetrics() {
    try {
      // 检查性能相关配置
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const perfScripts = Object.keys(packageJson.scripts).filter(script => 
        script.includes('perf') || script.includes('performance')
      )
      
      const perfDeps = Object.keys(packageJson.devDependencies || {}).filter(dep => 
        dep.includes('performance') || dep.includes('perf') || dep.includes('vite-plugin')
      )
      
      this.metrics.performance = {
        scriptCount: perfScripts.length,
        scripts: perfScripts,
        depCount: perfDeps.length,
        deps: perfDeps,
        timestamp: Date.now()
      }
      
    } catch (error) {
      console.error('收集性能指标失败:', error.message)
    }
  }

  // 添加到历史记录
  addToHistory() {
    this.history.push({
      ...this.metrics,
      timestamp: this.metrics.timestamp
    })
    
    // 保持历史记录在最大限制内
    if (this.history.length > this.maxHistory) {
      this.history.shift()
    }
  }

  // 显示指标
  displayMetrics() {
    // 清屏并显示最新指标
    console.clear()
    
    console.log('📊 Taro-Uno 性能监控')
    console.log('====================')
    console.log(`🕐 时间: ${new Date().toLocaleString()}`)
    console.log(`⏱️  运行时间: ${Math.floor(process.uptime())}s`)
    console.log('')
    
    // 系统指标
    if (this.metrics.system.memory) {
      const mem = this.metrics.system.memory
      console.log('💾 系统内存:')
      console.log(`  RSS: ${(mem.rss / 1024 / 1024).toFixed(2)}MB`)
      console.log(`  堆使用: ${(mem.heapUsed / 1024 / 1024).toFixed(2)}MB (${mem.percentage.toFixed(1)}%)`)
      console.log(`  堆总量: ${(mem.heapTotal / 1024 / 1024).toFixed(2)}MB`)
      console.log('')
    }
    
    // 构建指标
    console.log('🔧 构建状态:')
    console.log(`  构建目录: ${this.metrics.build.distExists ? '✅' : '❌'}`)
    console.log(`  缓存状态: ${this.metrics.build.cacheExists ? '✅' : '❌'}`)
    if (this.metrics.build.distSize) {
      console.log(`  构建大小: ${(this.metrics.build.distSize / 1024 / 1024).toFixed(2)}MB`)
    }
    console.log('')
    
    // 包体积指标
    if (this.metrics.bundle.exists) {
      const bundle = this.metrics.bundle
      console.log('📦 包体积:')
      console.log(`  总大小: ${(bundle.totalSize / 1024 / 1024).toFixed(2)}MB`)
      console.log(`  文件数: ${bundle.fileCount}`)
      console.log(`  JS: ${(bundle.jsSize / 1024 / 1024).toFixed(2)}MB`)
      console.log(`  CSS: ${(bundle.cssSize / 1024 / 1024).toFixed(2)}MB`)
      if (bundle.largestFile) {
        console.log(`  最大文件: ${bundle.largestFile.name} (${(bundle.largestFile.size / 1024).toFixed(2)}KB)`)
      }
      console.log('')
    }
    
    // 测试指标
    console.log('🧪 测试状态:')
    console.log(`  覆盖率报告: ${this.metrics.tests.coverageExists ? '✅' : '❌'}`)
    console.log(`  测试文件: ${this.metrics.tests.testFileCount}`)
    if (this.metrics.tests.coverage) {
      const cov = this.metrics.tests.coverage
      console.log(`  行覆盖率: ${cov.totalLines.toFixed(1)}%`)
      console.log(`  语句覆盖率: ${cov.totalStatements.toFixed(1)}%`)
    }
    console.log('')
    
    // 性能指标
    console.log('⚡ 性能优化:')
    console.log(`  性能脚本: ${this.metrics.performance.scriptCount}`)
    console.log(`  性能依赖: ${this.metrics.performance.depCount}`)
    console.log('')
    
    // 历史趋势
    if (this.history.length > 1) {
      console.log('📈 趋势 (最近5次):')
      const recentHistory = this.history.slice(-5)
      recentHistory.forEach((record, index) => {
        const time = new Date(record.timestamp).toLocaleTimeString()
        const memPercent = record.system?.memory?.percentage || 0
        console.log(`  ${index + 1}. ${time} - 内存: ${memPercent.toFixed(1)}%`)
      })
      console.log('')
    }
    
    console.log('按 Ctrl+C 停止监控')
  }

  // 设置控制台交互
  setupConsoleInteraction() {
    process.on('SIGINT', () => {
      this.stop()
      process.exit(0)
    })
    
    // 监听用户输入
    if (process.stdin.setRawMode) {
      process.stdin.setRawMode(true)
      process.stdin.resume()
      process.stdin.setEncoding('utf8')
      
      process.stdin.on('data', (key) => {
        if (key === '\u0003') { // Ctrl+C
          this.stop()
          process.exit(0)
        } else if (key === 'r' || key === 'R') {
          this.generateReport()
          console.log('📄 报告已生成')
        } else if (key === 'h' || key === 'H') {
          this.showHelp()
        }
      })
    }
  }

  // 显示帮助
  showHelp() {
    console.log('\n📖 性能监控帮助:')
    console.log('  Ctrl+C - 停止监控')
    console.log('  R - 生成报告')
    console.log('  H - 显示帮助')
    console.log('')
  }

  // 生成报告
  generateReport() {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        currentMetrics: this.metrics,
        history: this.history,
        summary: {
          totalRecords: this.history.length,
          averageMemory: this.calculateAverageMemory(),
          averageBundleSize: this.calculateAverageBundleSize(),
          performanceScore: this.calculatePerformanceScore()
        }
      }
      
      const reportPath = path.join(__dirname, '../performance-monitor-report.json')
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
      
      console.log(`📄 性能监控报告已保存到: ${reportPath}`)
      
    } catch (error) {
      console.error('生成报告失败:', error.message)
    }
  }

  // 计算平均内存使用
  calculateAverageMemory() {
    const memoryRecords = this.history.filter(record => record.system?.memory?.percentage)
    if (memoryRecords.length === 0) return 0
    
    const total = memoryRecords.reduce((sum, record) => sum + record.system.memory.percentage, 0)
    return total / memoryRecords.length
  }

  // 计算平均包体积
  calculateAverageBundleSize() {
    const bundleRecords = this.history.filter(record => record.bundle?.exists)
    if (bundleRecords.length === 0) return 0
    
    const total = bundleRecords.reduce((sum, record) => sum + record.bundle.totalSize, 0)
    return total / bundleRecords.length
  }

  // 计算性能分数
  calculatePerformanceScore() {
    let score = 0
    
    // 内存使用分数 (30%)
    const avgMemory = this.calculateAverageMemory()
    if (avgMemory < 50) score += 30
    else if (avgMemory < 70) score += 20
    else if (avgMemory < 90) score += 10
    
    // 包体积分数 (25%)
    const avgBundleSize = this.calculateAverageBundleSize()
    if (avgBundleSize < 512 * 1024) score += 25
    else if (avgBundleSize < 1024 * 1024) score += 15
    else if (avgBundleSize < 2048 * 1024) score += 5
    
    // 测试覆盖率分数 (25%)
    const latestRecord = this.history[this.history.length - 1]
    if (latestRecord?.tests?.coverage) {
      const coverage = latestRecord.tests.coverage
      if (coverage.totalLines > 80) score += 25
      else if (coverage.totalLines > 60) score += 15
      else if (coverage.totalLines > 40) score += 5
    }
    
    // 性能优化分数 (20%)
    if (latestRecord?.performance) {
      const perf = latestRecord.performance
      if (perf.scriptCount > 5) score += 10
      if (perf.depCount > 5) score += 10
    }
    
    return Math.min(score, 100)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const monitor = new PerformanceMonitor()
  
  console.log('🚀 Taro-Uno 性能监控器')
  console.log('====================')
  console.log('按 Ctrl+C 停止监控')
  console.log('按 R 生成报告')
  console.log('按 H 显示帮助')
  console.log('')
  
  monitor.start()
}

module.exports = PerformanceMonitor