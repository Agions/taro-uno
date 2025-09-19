#!/usr/bin/env node

/**
 * 简化的构建脚本
 * 用于构建当前项目
 */

import { build } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function runBuild() {
  try {
    console.log('🚀 开始构建 Taro-Uno UI...');

    await build({
      configFile: resolve(__dirname, '..', 'vite.config.ts'),
      mode: 'production',
    });

    console.log('✅ 构建完成!');
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

runBuild();
