#!/usr/bin/env node

/**
 * Taro-Uno 自动化脚本
 * 
 * 提供完整的自动化工作流，包括：
 * - 项目初始化
 * - 开发环境设置
 * - 代码质量检查
 * - 构建和部署
 * - 监控和报告
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import chalk from 'chalk'

const log = {
  info: (msg) => console.log(chalk.blue('ℹ️'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  title: (msg) => console.log(chalk.bold.cyan('🤖'), msg)
}

// 工作流配置
const workflows = {
  // 开发工作流
  dev: {
    name: '开发环境设置',
    steps: [
      { name: '安装依赖', command: 'npm install' },
      { name: '设置开发工具', command: 'node scripts/dev-tools-integrator.js' },
      { name: '启动开发服务器', command: 'npm run dev' }
    ]
  },
  
  // 构建工作流
  build: {
    name: '项目构建',
    steps: [
      { name: '清理构建', command: 'npm run clean' },
      { name: '类型检查', command: 'npm run type-check' },
      { name: '代码检查', command: 'npm run lint' },
      { name: '运行测试', command: 'npm run test:run' },
      { name: '构建项目', command: 'npm run build:packages' },
      { name: '分析构建结果', command: 'npm run analyze:performance' }
    ]
  },
  
  // 质量检查工作流
  quality: {
    name: '质量检查',
    steps: [
      { name: 'ESLint 检查', command: 'npm run lint' },
      { name: 'TypeScript 检查', command: 'npm run type-check' },
      { name: '样式检查', command: 'npm run lint:style' },
      { name: '格式化检查', command: 'npm run format:check' },
      { name: '测试覆盖率', command: 'npm run test:coverage' },
      { name: '依赖分析', command: 'node scripts/dependency-analyzer.js' }
    ]
  },
  
  // 部署工作流
  deploy: {
    name: '项目部署',
    steps: [
      { name: '构建项目', command: 'npm run build:packages' },
      { name: '运行测试', command: 'npm run test:run' },
      { name: '构建文档', command: 'npm run docs:build' },
      { name: '版本管理', command: 'npm run changeset:publish' },
      { name: '部署到生产环境', command: 'npm run deploy:prod' }
    ]
  },
  
  // 监控工作流
  monitor: {
    name: '项目监控',
    steps: [
      { name: '性能监控', command: 'npm run analyze:performance' },
      { name: '测试覆盖率监控', command: 'npm run analyze:coverage' },
      { name: '依赖监控', command: 'npm run analyze:deps' },
      { name: '质量监控', command: 'npm run analyze:quality' },
      { name: '生成监控报告', command: 'node scripts/generate-monitoring-report.js' }
    ]
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2)
  const workflowName = args[0]
  
  if (!workflowName || !workflows[workflowName]) {
    log.title('可用工作流:')
    Object.entries(workflows).forEach(([name, workflow]) => {
      console.log(`  ${name}: ${workflow.name}`)
    })
    console.log('')
    console.log('使用方法: npm run automation <workflow-name>')
    process.exit(1)
  }
  
  const workflow = workflows[workflowName]
  log.title(`执行工作流: ${workflow.name}`)
  
  const results = []
  let hasErrors = false
  
  for (const step of workflow.steps) {
    log.info(`执行步骤: ${step.name}`)
    
    try {
      const startTime = Date.now()
      const result = execSync(step.command, { 
        stdio: 'inherit',
        timeout: 300000 // 5分钟超时
      })
      const endTime = Date.now()
      const duration = endTime - startTime
      
      results.push({
        name: step.name,
        status: 'passed',
        duration,
        command: step.command
      })
      
      log.success(`${step.name} 完成 (${duration}ms)`)
      
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - (error.status || Date.now())
      
      results.push({
        name: step.name,
        status: 'failed',
        duration,
        command: step.command,
        error: error.message
      })
      
      log.error(`${step.name} 失败`)
      
      // 对于关键步骤，停止执行
      if (workflowName === 'build' || workflowName === 'deploy') {
        hasErrors = true
        break
      }
    }
  }
  
  // 生成报告
  generateReport(workflowName, results)
  
  // 汇总结果
  const passedSteps = results.filter(r => r.status === 'passed').length
  const totalSteps = results.length
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0)
  
  log.title('工作流执行汇总')
  console.log(`完成步骤: ${passedSteps}/${totalSteps}`)
  console.log(`总耗时: ${Math.round(totalDuration / 1000)}s`)
  console.log('')
  
  if (hasErrors) {
    log.error('工作流执行失败')
    process.exit(1)
  } else {
    log.success('工作流执行完成!')
  }
}

// 生成报告
function generateReport(workflowName, results) {
  const report = {
    timestamp: new Date().toISOString(),
    workflow: workflowName,
    summary: {
      total: results.length,
      passed: results.filter(r => r.status === 'passed').length,
      failed: results.filter(r => r.status === 'failed').length,
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0)
    },
    steps: results
  }
  
  // 保存报告
  const reportDir = join(process.cwd(), 'reports', 'automation')
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true })
  }
  
  const reportPath = join(reportDir, `${workflowName}-${Date.now()}.json`)
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  log.info(`工作流报告已生成: ${reportPath}`)
}

// 创建自定义工作流
function createCustomWorkflow(name, steps) {
  workflows[name] = {
    name: name,
    steps: steps
  }
  
  // 保存工作流配置
  const configPath = join(process.cwd(), '.automation.json')
  let config = {}
  
  if (existsSync(configPath)) {
    config = JSON.parse(readFileSync(configPath, 'utf8'))
  }
  
  config.workflows = config.workflows || {}
  config.workflows[name] = {
    name: name,
    steps: steps
  }
  
  writeFileSync(configPath, JSON.stringify(config, null, 2))
  
  log.success(`自定义工作流 ${name} 已创建`)
}

// 导出函数
export {
  main as runWorkflow,
  workflows,
  createCustomWorkflow
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}