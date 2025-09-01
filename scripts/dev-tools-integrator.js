#!/usr/bin/env node

/**
 * Taro-Uno 开发工具集成器
 * 
 * 提供完整的开发工具链集成，包括：
 * - 代码编辑器配置
 * - 调试工具配置
 * - 性能监控工具
 * - 代码质量工具
 * - 自动化工具
 */

import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const log = {
  info: (msg) => console.log('🔧', msg),
  success: (msg) => console.log('✅', msg),
  warning: (msg) => console.log('⚠️', msg),
  error: (msg) => console.log('❌', msg),
  title: (msg) => console.log('🚀', msg)
}

// 工具配置
const tools = {
  // VS Code 配置
  vscode: {
    extensions: [
      'ms-vscode.vscode-typescript-next',
      'esbenp.prettier-vscode',
      'dbaeumer.vscode-eslint',
      'stylelint.vscode-stylelint',
      'bradlc.vscode-tailwindcss',
      'ms-vscode.vscode-json',
      'mrmlnc.vscode-json5',
      'christian-kohler.path-intellisense',
      'christian-kohler.npm-intellisense',
      'eamodio.gitlens',
      'oderwat.indent-rainbow',
      'coenraads.bracket-pair-colorizer-2',
      'wix.vscode-import-cost',
      'streetsidesoftware.code-spell-checker',
      'vscode-icons-team.vscode-icons'
    ],
    settings: {
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
        'source.fixAll.stylelint': true
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.tabSize': 2,
      'editor.insertSpaces': true,
      'files.associations': {
        '*.scss': 'scss',
        '*.css': 'css'
      },
      'typescript.preferences.importModuleSpecifier': 'relative',
      'eslint.validate': [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact'
      ],
      'stylelint.validate': ['css', 'scss'],
      'files.watcherExclude': {
        '**/node_modules/**': true,
        '**/dist/**': true,
        '**/build/**': true
      }
    }
  },

  // Git 钩子配置
  git: {
    'pre-commit': 'npx lint-staged',
    'commit-msg': 'npx commitlint -E HUSKY_GIT_PARAMS',
    'pre-push': 'npm run test'
  },

  // 调试工具配置
  debug: {
    chrome: {
      port: 9222,
      host: 'localhost',
      websocketPort: 9229
    },
    react: {
      port: 8097,
      host: 'localhost'
    }
  },

  // 性能监控工具
  performance: {
    bundleAnalyzer: {
      port: 8888,
      host: 'localhost',
      openBrowser: true
    },
    speedMeasure: {
      outputFormat: 'human',
      outputTarget: console.log
    }
  }
}

// 主函数
async function main() {
  log.title('Taro-Uno 开发工具集成')
  
  try {
    // 1. VS Code 配置
    await setupVSCode()
    
    // 2. Git 钩子配置
    await setupGitHooks()
    
    // 3. 调试工具配置
    await setupDebugTools()
    
    // 4. 性能监控工具配置
    await setupPerformanceTools()
    
    // 5. 代码质量工具配置
    await setupQualityTools()
    
    // 6. 自动化工具配置
    await setupAutomationTools()
    
    log.success('开发工具集成完成!')
    
  } catch (error) {
    log.error('集成失败:', error.message)
    process.exit(1)
  }
}

// VS Code 配置
async function setupVSCode() {
  log.info('配置 VS Code...')
  
  const vscodeDir = join(process.cwd(), '.vscode')
  if (!existsSync(vscodeDir)) {
    mkdirSync(vscodeDir)
  }
  
  // 生成 settings.json
  const settingsPath = join(vscodeDir, 'settings.json')
  writeFileSync(settingsPath, JSON.stringify(tools.vscode.settings, null, 2))
  
  // 生成 extensions.json
  const extensionsPath = join(vscodeDir, 'extensions.json')
  const extensionsConfig = {
    recommendations: tools.vscode.extensions
  }
  writeFileSync(extensionsPath, JSON.stringify(extensionsConfig, null, 2))
  
  // 生成 launch.json
  const launchPath = join(vscodeDir, 'launch.json')
  const launchConfig = {
    version: '0.2.0',
    configurations: [
      {
        name: 'Debug Taro App',
        type: 'node',
        request: 'launch',
        program: '${workspaceFolder}/node_modules/@tarojs/cli/bin/taro',
        args: ['build', '--watch'],
        console: 'integratedTerminal',
        internalConsoleOptions: 'neverOpen'
      },
      {
        name: 'Debug Tests',
        type: 'node',
        request: 'launch',
        program: '${workspaceFolder}/node_modules/vitest/vitest.mjs',
        args: ['run', '--reporter=verbose'],
        console: 'integratedTerminal',
        internalConsoleOptions: 'neverOpen'
      },
      {
        name: 'Debug CLI',
        type: 'node',
        request: 'launch',
        program: '${workspaceFolder}/packages/cli/src/cli.ts',
        args: ['dev'],
        console: 'integratedTerminal',
        internalConsoleOptions: 'neverOpen'
      }
    ]
  }
  writeFileSync(launchPath, JSON.stringify(launchConfig, null, 2))
  
  // 生成 tasks.json
  const tasksPath = join(vscodeDir, 'tasks.json')
  const tasksConfig = {
    version: '2.0.0',
    tasks: [
      {
        label: 'Build',
        type: 'shell',
        command: 'npm run build',
        group: 'build',
        presentation: {
          echo: true,
          reveal: 'always',
          focus: false,
          panel: 'shared'
        }
      },
      {
        label: 'Test',
        type: 'shell',
        command: 'npm run test',
        group: 'test',
        presentation: {
          echo: true,
          reveal: 'always',
          focus: false,
          panel: 'shared'
        }
      },
      {
        label: 'Lint',
        type: 'shell',
        command: 'npm run lint',
        group: 'build',
        presentation: {
          echo: true,
          reveal: 'always',
          focus: false,
          panel: 'shared'
        }
      }
    ]
  }
  writeFileSync(tasksPath, JSON.stringify(tasksConfig, null, 2))
  
  log.success('VS Code 配置完成')
}

// Git 钩子配置
async function setupGitHooks() {
  log.info('配置 Git 钩子...')
  
  const huskyDir = join(process.cwd(), '.husky')
  if (!existsSync(huskyDir)) {
    mkdirSync(huskyDir)
  }
  
  // 创建 pre-commit 钩子
  const preCommitPath = join(huskyDir, 'pre-commit')
  writeFileSync(preCommitPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

${tools.git['pre-commit']}
`)
  
  // 创建 commit-msg 钩子
  const commitMsgPath = join(huskyDir, 'commit-msg')
  writeFileSync(commitMsgPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

${tools.git['commit-msg']}
`)
  
  // 创建 pre-push 钩子
  const prePushPath = join(huskyDir, 'pre-push')
  writeFileSync(prePushPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

${tools.git['pre-push']}
`)
  
  // 设置钩子文件权限
  try {
    execSync(`chmod +x ${preCommitPath} ${commitMsgPath} ${prePushPath}`)
  } catch (error) {
    log.warning('无法设置钩子文件权限，请手动设置')
  }
  
  log.success('Git 钩子配置完成')
}

// 调试工具配置
async function setupDebugTools() {
  log.info('配置调试工具...')
  
  // 创建调试配置文件
  const debugConfig = {
    chrome: tools.debug.chrome,
    react: tools.debug.react,
    breakpoints: {
      uncaughtExceptions: true,
      unhandledRejections: true
    }
  }
  
  const debugPath = join(process.cwd(), '.debugrc.json')
  writeFileSync(debugPath, JSON.stringify(debugConfig, null, 2))
  
  // 创建 React DevTools 配置
  const reactDevToolsConfig = {
    port: tools.debug.react.port,
    host: tools.debug.react.host,
    websocketPort: tools.debug.react.port + 1
  }
  
  const reactDevToolsPath = join(process.cwd(), '.react-devtools.json')
  writeFileSync(reactDevToolsPath, JSON.stringify(reactDevToolsConfig, null, 2))
  
  log.success('调试工具配置完成')
}

// 性能监控工具配置
async function setupPerformanceTools() {
  log.info('配置性能监控工具...')
  
  // 创建性能监控配置
  const perfConfig = {
    bundleAnalyzer: tools.performance.bundleAnalyzer,
    speedMeasure: tools.performance.speedMeasure,
    thresholds: {
      bundleSize: 1024 * 1024, // 1MB
      buildTime: 60000, // 1分钟
      loadTime: 3000 // 3秒
    }
  }
  
  const perfPath = join(process.cwd(), '.performance.json')
  writeFileSync(perfPath, JSON.stringify(perfConfig, null, 2))
  
  // 创建 Webpack Bundle Analyzer 配置
  const analyzerConfig = {
    analyzerMode: 'server',
    analyzerHost: tools.performance.bundleAnalyzer.host,
    analyzerPort: tools.performance.bundleAnalyzer.port,
    openAnalyzer: tools.performance.bundleAnalyzer.openBrowser,
    generateStatsFile: true,
    statsFilename: 'bundle-stats.json'
  }
  
  const analyzerPath = join(process.cwd(), 'bundle-analyzer.config.js')
  writeFileSync(analyzerPath, `module.exports = ${JSON.stringify(analyzerConfig, null, 2)}`)
  
  log.success('性能监控工具配置完成')
}

// 代码质量工具配置
async function setupQualityTools() {
  log.info('配置代码质量工具...')
  
  // 创建代码质量配置
  const qualityConfig = {
    eslint: {
      rules: {
        'no-unused-vars': 'error',
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error'
      }
    },
    stylelint: {
      rules: {
        'color-hex-length': 'short',
        'declaration-block-trailing-semicolon': 'always',
        'indentation': 2
      }
    },
    prettier: {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      arrowParens: 'avoid'
    }
  }
  
  const qualityPath = join(process.cwd(), '.quality.json')
  writeFileSync(qualityPath, JSON.stringify(qualityConfig, null, 2))
  
  // 创建代码检查脚本
  const checkScript = `#!/usr/bin/env node

const { execSync } = require('child_process')
const chalk = require('chalk')

const log = {
  info: (msg) => console.log(chalk.blue('ℹ️'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg)
}

async function runChecks() {
  log.info('运行代码质量检查...')
  
  try {
    // ESLint 检查
    log.info('运行 ESLint...')
    execSync('npm run lint', { stdio: 'inherit' })
    
    // TypeScript 检查
    log.info('运行 TypeScript 检查...')
    execSync('npm run type-check', { stdio: 'inherit' })
    
    // 样式检查
    log.info('运行样式检查...')
    execSync('npm run stylelint', { stdio: 'inherit' })
    
    // 格式化检查
    log.info('运行格式化检查...')
    execSync('npm run format:check', { stdio: 'inherit' })
    
    log.success('所有检查通过!')
    
  } catch (error) {
    log.error('代码质量检查失败')
    process.exit(1)
  }
}

runChecks()
`
  
  const checkScriptPath = join(process.cwd(), 'scripts', 'quality-check.js')
  writeFileSync(checkScriptPath, checkScript)
  
  log.success('代码质量工具配置完成')
}

// 自动化工具配置
async function setupAutomationTools() {
  log.info('配置自动化工具...')
  
  // 创建自动化配置
  const automationConfig = {
    scripts: {
      'setup': 'npm install && npm run build',
      'dev': 'taro-uno dev',
      'build': 'taro-uno build',
      'test': 'taro-uno test',
      'lint': 'taro-uno lint',
      'analyze': 'taro-uno analyze',
      'docs': 'taro-uno docs',
      'quality': 'node scripts/quality-check.js',
      'deploy': 'npm run build && npm run test && npm run publish'
    },
    workflows: {
      'ci': {
        'on': ['push', 'pull_request'],
        'jobs': ['test', 'lint', 'build']
      },
      'release': {
        'on': ['push:tags'],
        'jobs': ['test', 'lint', 'build', 'publish']
      }
    }
  }
  
  const automationPath = join(process.cwd(), '.automation.json')
  writeFileSync(automationPath, JSON.stringify(automationConfig, null, 2))
  
  // 创建自动化脚本
  const automationScript = `#!/usr/bin/env node

const { execSync } = require('child_process')
const { readFileSync } = require('fs')
const { join } = require('path')

const config = JSON.parse(readFileSync(join(process.cwd(), '.automation.json')))
const [command] = process.argv.slice(2)

if (!command || !config.scripts[command]) {
  console.log('可用命令:', Object.keys(config.scripts).join(', '))
  process.exit(1)
}

try {
  execSync(config.scripts[command], { stdio: 'inherit', cwd: process.cwd() })
} catch (error) {
  console.error('命令执行失败:', error.message)
  process.exit(1)
}
`
  
  const automationScriptPath = join(process.cwd(), 'scripts', 'automation.js')
  writeFileSync(automationScriptPath, automationScript)
  
  log.success('自动化工具配置完成')
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { main as setupDevTools }