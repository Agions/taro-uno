#!/usr/bin/env node

/**
 * 统一构建脚本
 * 用于构建所有包或指定包
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 获取所有包
function getAllPackages() {
  const packagesDir = join(__dirname, '..', 'packages')
  const packages = []
  
  try {
    const items = readdirSync(packagesDir, { withFileTypes: true })
    
    for (const item of items) {
      if (item.isDirectory()) {
        const pkgPath = join(packagesDir, item.name, 'package.json')
        if (existsSync(pkgPath)) {
          packages.push(item.name)
        }
      }
    }
  } catch (error) {
    console.error('Error reading packages:', error.message)
  }
  
  return packages
}

// 构建单个包
function buildPackage(packageName) {
  console.log(`📦 Building package: ${packageName}`)
  
  try {
    const packageDir = join(__dirname, '..', 'packages', packageName)
    
    // 检查是否有rollup配置
    const rollupConfig = join(packageDir, 'rollup.config.js')
    if (!existsSync(rollupConfig)) {
      console.log(`⚠️  No rollup config found for ${packageName}, skipping...`)
      return
    }
    
    // 清理构建目录
    console.log(`🧹 Cleaning dist directory for ${packageName}`)
    try {
      execSync(`rm -rf ${join(packageDir, 'dist')}`, { stdio: 'inherit' })
    } catch (error) {
      // 忽略清理错误
    }
    
    // 执行构建
    console.log(`🔨 Building ${packageName}...`)
    execSync(`cd ${packageDir} && rollup -c`, { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    })
    
    console.log(`✅ Successfully built ${packageName}`)
  } catch (error) {
    console.error(`❌ Failed to build ${packageName}:`, error.message)
    process.exit(1)
  }
}

// 构建所有包
function buildAllPackages() {
  console.log('🚀 Building all packages...')
  
  const packages = getAllPackages()
  console.log(`Found ${packages.length} packages to build`)
  
  if (packages.length === 0) {
    console.log('No packages found to build')
    return
  }
  
  // 按依赖顺序构建
  const buildOrder = [
    'shared',      // 共享工具
    'core',        // 核心功能
    'design-system', // 设计系统
    'ui-theme',    // 主题系统
    'ui-hooks',    // Hooks
    'icons',       // 图标
    'ui-basic',    // 基础组件
    'ui-layout',   // 布局组件
    'ui-form',     // 表单组件
    'ui-feedback', // 反馈组件
    'ui-navigation', // 导航组件
    'ui-display',  // 展示组件
    'json-schema', // JSON Schema
    'docs'         // 文档
  ]
  
  // 构建按顺序的包
  buildOrder.forEach(packageName => {
    if (packages.includes(packageName)) {
      buildPackage(packageName)
    }
  })
  
  // 构建其他包
  packages.forEach(packageName => {
    if (!buildOrder.includes(packageName)) {
      buildPackage(packageName)
    }
  })
  
  console.log('🎉 All packages built successfully!')
}

// 开发模式构建
function buildDev(packages) {
  console.log('🔧 Development build...')
  
  packages.forEach(packageName => {
    console.log(`📦 Building ${packageName} in dev mode...`)
    try {
      const packageDir = join(__dirname, '..', 'packages', packageName)
      execSync(`cd ${packageDir} && rollup -c -w`, { 
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'development' }
      })
    } catch (error) {
      console.error(`❌ Failed to build ${packageName} in dev mode:`, error.message)
    }
  })
}

// 主函数
function main() {
  const args = process.argv.slice(2)
  let packages = []
  let mode = 'production'
  
  // 解析参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    if (arg === '--dev' || arg === '-d') {
      mode = 'development'
    } else if (arg === '--watch' || arg === '-w') {
      mode = 'watch'
    } else if (arg.startsWith('--')) {
      // 忽略其他选项
    } else {
      packages.push(arg)
    }
  }
  
  // 如果没有指定包，构建所有包
  if (packages.length === 0) {
    buildAllPackages()
  } else {
    if (mode === 'development' || mode === 'watch') {
      buildDev(packages)
    } else {
      packages.forEach(buildPackage)
    }
  }
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { buildPackage, buildAllPackages, getAllPackages }