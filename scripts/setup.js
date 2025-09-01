#!/usr/bin/env node

/**
 * Taro-Uno 项目设置脚本
 * 用于初始化项目结构和配置
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = process.cwd();

console.log('🚀 开始设置 Taro-Uno 项目...');

// 创建必要的目录结构
const directories = [
  'apps',
  'tools',
  'configs',
  'configs/shared',
  'configs/eslint',
  'configs/prettier',
  'configs/typescript',
  'configs/webpack',
  'configs/vite',
  'configs/jest',
  'configs/vitest',
  'packages/design-system',
  'apps/demo-platform',
  'apps/example-app',
  'apps/docs-site',
  'tools/build-scripts',
  'tools/deploy-scripts',
  'tools/test-scripts',
  'tools/codegen',
];

directories.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ 创建目录: ${dir}`);
  }
});

// 复制配置模板
const configFiles = [
  {
    source: 'configs/shared/package-template.json',
    target: 'configs/shared/package-template.json',
  },
  {
    source: 'configs/shared/tsconfig-template.json',
    target: 'configs/shared/tsconfig-template.json',
  },
  {
    source: 'configs/shared/rollup-template.config.js',
    target: 'configs/shared/rollup-template.config.js',
  },
  {
    source: 'configs/shared/jest-template.config.js',
    target: 'configs/shared/jest-template.config.js',
  },
  {
    source: 'configs/shared/base-config.js',
    target: 'configs/shared/base-config.js',
  },
];

configFiles.forEach(({ source, target }) => {
  const sourcePath = path.join(rootDir, source);
  const targetPath = path.join(rootDir, target);
  
  if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ 复制配置文件: ${target}`);
  }
});

// 创建向后兼容的符号链接
const symlinks = [
  { source: 'components-basic', target: 'ui-basic' },
  { source: 'components-display', target: 'ui-display' },
  { source: 'components-feedback', target: 'ui-feedback' },
  { source: 'components-form', target: 'ui-form' },
  { source: 'components-layout', target: 'ui-layout' },
  { source: 'components-navigation', target: 'ui-navigation' },
  { source: 'components-advanced', target: 'ui-advanced' },
  { source: 'components-hooks', target: 'ui-hooks' },
];

symlinks.forEach(({ source, target }) => {
  const sourcePath = path.join(rootDir, 'packages', source);
  const targetPath = path.join(rootDir, 'packages', target);
  
  if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
    try {
      fs.symlinkSync(sourcePath, targetPath, 'dir');
      console.log(`✅ 创建符号链接: ${target} -> ${source}`);
    } catch (error) {
      console.log(`⚠️  符号链接创建失败: ${target} -> ${source}`);
    }
  }
});

// 安装依赖
console.log('📦 安装依赖...');
try {
  execSync('pnpm install', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ 依赖安装完成');
} catch (error) {
  console.error('❌ 依赖安装失败:', error.message);
  process.exit(1);
}

// 构建项目
console.log('🔨 构建项目...');
try {
  execSync('pnpm build:packages', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ 项目构建完成');
} catch (error) {
  console.error('❌ 项目构建失败:', error.message);
  process.exit(1);
}

console.log('🎉 Taro-Uno 项目设置完成！');
console.log('');
console.log('📋 下一步操作:');
console.log('  1. 运行开发服务器: pnpm dev');
console.log('  2. 运行测试: pnpm test');
console.log('  3. 构建项目: pnpm build');
console.log('  4. 查看文档: pnpm docs:dev');
console.log('');
console.log('📚 项目结构:');
console.log('  📁 apps/ - 应用程序');
console.log('  📁 packages/ - 包');
console.log('  📁 tools/ - 工具');
console.log('  📁 configs/ - 配置');
console.log('  📁 scripts/ - 脚本');
console.log('  📁 docs/ - 文档');