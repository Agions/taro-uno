#!/usr/bin/env node

/**
 * 配置验证脚本
 * 验证所有配置文件的一致性和正确性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 验证函数
function validateConfig() {
  const errors = [];
  const warnings = [];

  console.log('🔍 开始验证配置文件...');

  // 检查必要文件
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'vitest.config.ts',
    'configs/shared/config.ts',
  ];

  requiredFiles.forEach((file) => {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`缺少必要文件: ${file}`);
    }
  });

  // 检查配置一致性
  try {
    // 读取package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

    // 检查脚本是否完整
    const requiredScripts = ['dev', 'build', 'test', 'lint', 'type-check'];

    requiredScripts.forEach((script) => {
      if (!packageJson.scripts[script]) {
        warnings.push(`package.json 中缺少脚本: ${script}`);
      }
    });

    // 检查依赖
    const requiredDeps = ['react', 'react-dom'];
    const requiredDevDeps = ['@types/react', '@types/react-dom', 'typescript', 'vite', 'vitest', 'eslint', 'prettier'];

    requiredDeps.forEach((dep) => {
      if (!packageJson.dependencies?.[dep]) {
        errors.push(`缺少必要依赖: ${dep}`);
      }
    });

    requiredDevDeps.forEach((dep) => {
      if (!packageJson.devDependencies?.[dep]) {
        warnings.push(`缺少开发依赖: ${dep}`);
      }
    });
  } catch (err) {
    errors.push(`无法读取 package.json: ${err.message}`);
  }

  // 检查TypeScript配置
  try {
    const tsconfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'tsconfig.json'), 'utf8'));

    if (!tsconfig.compilerOptions?.baseUrl) {
      warnings.push('tsconfig.json 中缺少 baseUrl 配置');
    }

    if (!tsconfig.compilerOptions?.paths) {
      warnings.push('tsconfig.json 中缺少 paths 配置');
    }
  } catch (err) {
    errors.push(`无法读取 tsconfig.json: ${err.message}`);
  }

  // 检查Vite配置
  try {
    const viteConfig = fs.readFileSync(path.join(rootDir, 'vite.config.ts'), 'utf8');

    if (!viteConfig.includes('configs/shared/config')) {
      warnings.push('vite.config.ts 未使用统一配置');
    }
  } catch (err) {
    errors.push(`无法读取 vite.config.ts: ${err.message}`);
  }

  // 输出结果
  console.log('\n📋 验证结果:');
  console.log('==================');

  if (errors.length > 0) {
    console.log('❌ 错误:');
    errors.forEach((error) => console.log(`   ${error}`));
    console.log();
  }

  if (warnings.length > 0) {
    console.log('⚠️  警告:');
    warnings.forEach((warning) => console.log(`   ${warning}`));
    console.log();
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ 所有配置文件验证通过!');
  } else if (errors.length === 0) {
    console.log('✅ 配置文件基本正常，但有一些警告需要关注');
  } else {
    console.log('❌ 配置文件存在问题，请修复后重试');
    process.exit(1);
  }
}

// 运行验证
if (import.meta.url === `file://${process.argv[1]}`) {
  validateConfig();
}

export { validateConfig };
