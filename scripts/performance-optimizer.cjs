#!/usr/bin/env node

/**
 * Taro-Uno 性能优化脚本
 * 用于构建性能优化和分析
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

class PerformanceOptimizer {
  constructor() {
    this.startTime = performance.now()
    this.results = {
      buildTime: 0,
      bundleSize: {},
      performanceMetrics: {},
      optimizationSuggestions: []
    }
  }

  // 记录性能指标
  recordMetric(name, value, unit = 'ms') {
    this.results.performanceMetrics[name] = {
      value,
      unit,
      timestamp: Date.now()
    }
  }

  // 分析依赖
  analyzeDependencies() {
    console.log('🔍 分析依赖...')
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    }

    const analysis = {
      totalDeps: Object.keys(dependencies).length,
      heavyDeps: [],
      outdatedDeps: [],
      duplicateDeps: []
    }

    // 分析重依赖
    Object.entries(dependencies).forEach(([name, version]) => {
      if (version.startsWith('^') && parseInt(version.split('.')[0]) >= 1) {
        analysis.heavyDeps.push({ name, version })
      }
    })

    this.recordMetric('totalDependencies', analysis.totalDeps)
    this.recordMetric('heavyDependencies', analysis.heavyDeps.length)
    
    console.log('📊 依赖分析完成')
    return analysis
  }

  // 优化构建配置
  optimizeBuildConfig() {
    console.log('⚙️ 优化构建配置...')
    
    const configPath = path.join(__dirname, '../vite.config.ts')
    const backupPath = path.join(__dirname, '../vite.config.backup.ts')
    
    // 备份原配置
    if (fs.existsSync(configPath)) {
      fs.copyFileSync(configPath, backupPath)
    }

    // 应用性能优化配置
    const performanceConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  const isAnalyze = process.env.ANALYZE === 'true'
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        fastRefresh: !isProduction
      }),
      splitVendorChunkPlugin(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      }),
      isProduction && viteCompression({
        verbose: true,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      isAnalyze && visualizer({
        filename: 'bundle-analysis.html',
        open: true,
        gzipSize: true
      })
    ].filter(Boolean),
    build: {
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'taro-vendor': [
              '@tarojs/taro',
              '@tarojs/components',
              '@tarojs/runtime',
              '@tarojs/helper'
            ]
          }
        }
      },
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          pure_funcs: ['console.log']
        }
      },
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@tarojs/taro',
        '@tarojs/components',
        '@tarojs/runtime',
        '@tarojs/helper'
      ]
    }
  }
})`

    fs.writeFileSync(configPath, performanceConfig)
    console.log('✅ 构建配置优化完成')
  }

  // 执行构建
  async runBuild() {
    console.log('🚀 开始构建...')
    
    const buildStart = performance.now()
    
    try {
      // 清理之前的构建
      if (fs.existsSync('dist')) {
        fs.rmSync('dist', { recursive: true })
      }
      
      // 执行构建
      execSync('npm run build', { stdio: 'inherit' })
      
      const buildTime = performance.now() - buildStart
      this.results.buildTime = buildTime
      this.recordMetric('buildTime', buildTime)
      
      console.log(`✅ 构建完成，耗时: ${buildTime.toFixed(2)}ms`)
      
    } catch (error) {
      console.error('❌ 构建失败:', error.message)
      throw error
    }
  }

  // 分析包大小
  analyzeBundleSize() {
    console.log('📏 分析包大小...')
    
    const distPath = path.join(__dirname, '../dist')
    if (!fs.existsSync(distPath)) {
      console.warn('⚠️  构建目录不存在，跳过包大小分析')
      return
    }

    const bundleAnalysis = {
      totalSize: 0,
      files: [],
      largestFiles: []
    }

    const analyzeDirectory = (dir) => {
      const files = fs.readdirSync(dir)
      
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          analyzeDirectory(filePath)
        } else {
          const size = stat.size
          const relativePath = path.relative(distPath, filePath)
          
          bundleAnalysis.files.push({
            path: relativePath,
            size: size,
            sizeFormatted: this.formatBytes(size)
          })
          
          bundleAnalysis.totalSize += size
        }
      })
    }

    analyzeDirectory(distPath)
    
    // 找出最大的文件
    bundleAnalysis.largestFiles = bundleAnalysis.files
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
    
    this.results.bundleSize = bundleAnalysis
    this.recordMetric('totalBundleSize', bundleAnalysis.totalSize, 'bytes')
    
    console.log('📊 包大小分析完成')
    return bundleAnalysis
  }

  // 格式化字节数
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  // 生成优化建议
  generateOptimizationSuggestions() {
    console.log('💡 生成优化建议...')
    
    const suggestions = []
    
    // 基于构建时间的建议
    if (this.results.buildTime > 30000) {
      suggestions.push({
        category: '构建性能',
        issue: '构建时间过长',
        suggestion: '考虑使用缓存、代码分割、并行构建等技术优化构建速度',
        priority: 'high'
      })
    }
    
    // 基于包大小的建议
    if (this.results.bundleSize.totalSize > 1024 * 1024) { // 1MB
      suggestions.push({
        category: '包体积',
        issue: '包体积过大',
        suggestion: '考虑使用 Tree Shaking、代码分割、按需加载等技术减小包体积',
        priority: 'high'
      })
    }
    
    // 基于依赖数量的建议
    if (this.results.performanceMetrics.totalDependencies?.value > 100) {
      suggestions.push({
        category: '依赖管理',
        issue: '依赖数量过多',
        suggestion: '考虑移除不必要的依赖，使用更轻量的替代方案',
        priority: 'medium'
      })
    }
    
    // 运行时性能建议
    suggestions.push({
      category: '运行时性能',
      issue: '组件懒加载',
      suggestion: '实现组件懒加载，减少初始加载时间',
      priority: 'medium'
    })
    
    suggestions.push({
      category: '运行时性能',
      issue: '虚拟滚动',
      suggestion: '对于长列表，实现虚拟滚动以提高渲染性能',
      priority: 'medium'
    })
    
    this.results.optimizationSuggestions = suggestions
    console.log('✅ 优化建议生成完成')
    return suggestions
  }

  // 生成性能报告
  generateReport() {
    console.log('📄 生成性能报告...')
    
    const report = {
      timestamp: new Date().toISOString(),
      buildTime: this.results.buildTime,
      bundleSize: this.results.bundleSize,
      performanceMetrics: this.results.performanceMetrics,
      optimizationSuggestions: this.results.optimizationSuggestions,
      summary: {
        totalOptimizations: this.results.optimizationSuggestions.length,
        highPriorityIssues: this.results.optimizationSuggestions.filter(s => s.priority === 'high').length,
        mediumPriorityIssues: this.results.optimizationSuggestions.filter(s => s.priority === 'medium').length
      }
    }
    
    const reportPath = path.join(__dirname, '../performance-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    console.log('📊 性能报告已保存到:', reportPath)
    return report
  }

  // 显示结果
  displayResults() {
    console.log('\n🎯 性能优化结果')
    console.log('================')
    
    console.log(`⏱️  构建时间: ${this.results.buildTime.toFixed(2)}ms`)
    console.log(`📦 总包大小: ${this.formatBytes(this.results.bundleSize.totalSize)}`)
    
    console.log('\n📊 性能指标:')
    Object.entries(this.results.performanceMetrics).forEach(([key, metric]) => {
      console.log(`  ${key}: ${metric.value} ${metric.unit}`)
    })
    
    console.log('\n💡 优化建议:')
    this.results.optimizationSuggestions.forEach((suggestion, index) => {
      const priority = suggestion.priority === 'high' ? '🔴' : 
                      suggestion.priority === 'medium' ? '🟡' : '🟢'
      console.log(`  ${priority} ${index + 1}. [${suggestion.category}] ${suggestion.issue}`)
      console.log(`     建议: ${suggestion.suggestion}`)
    })
    
    console.log('\n✨ 优化完成!')
  }

  // 运行优化流程
  async run() {
    try {
      console.log('🚀 开始性能优化流程...')
      
      // 1. 分析依赖
      await this.analyzeDependencies()
      
      // 2. 优化构建配置
      this.optimizeBuildConfig()
      
      // 3. 执行构建
      await this.runBuild()
      
      // 4. 分析包大小
      await this.analyzeBundleSize()
      
      // 5. 生成优化建议
      await this.generateOptimizationSuggestions()
      
      // 6. 生成报告
      await this.generateReport()
      
      // 7. 显示结果
      this.displayResults()
      
      const totalTime = performance.now() - this.startTime
      console.log(`\n⏱️  总优化时间: ${totalTime.toFixed(2)}ms`)
      
    } catch (error) {
      console.error('❌ 性能优化失败:', error)
      process.exit(1)
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const optimizer = new PerformanceOptimizer()
  optimizer.run()
}

module.exports = PerformanceOptimizer