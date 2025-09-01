#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

// 日志函数
const log = {
  info: (message) => console.log(`${colors.blue}[INFO]${colors.reset} ${message}`),
  success: (message) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`),
  warn: (message) => console.log(`${colors.yellow}[WARN]${colors.reset} ${message}`),
  error: (message) => console.log(`${colors.red}[ERROR]${colors.reset} ${message}`),
};

// 执行命令
const exec = (command, options = {}) => {
  try {
    log.info(`执行命令: ${command}`);
    const output = execSync(command, { stdio: 'inherit', ...options });
    return output;
  } catch (error) {
    log.error(`命令执行失败: ${command}`);
    log.error(error.message);
    process.exit(1);
  }
};

// 检查是否在正确的分支
const checkBranch = () => {
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  if (branch !== 'main') {
    log.error(`当前分支 ${branch} 不是 main 分支，请切换到 main 分支后再发布`);
    process.exit(1);
  }
  log.success(`当前分支: ${branch}`);
};

// 检查是否有未提交的更改
const checkUncommittedChanges = () => {
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (status) {
    log.error('有未提交的更改，请先提交所有更改后再发布');
    log.error(status);
    process.exit(1);
  }
  log.success('没有未提交的更改');
};

// 检查是否与远程同步
const checkSyncWithRemote = () => {
  exec('git fetch origin');
  const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  const remoteCommit = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
  
  if (localCommit !== remoteCommit) {
    log.error('本地分支与远程分支不同步，请先拉取远程更改');
    process.exit(1);
  }
  log.success('本地分支与远程分支同步');
};

// 获取当前版本
const getCurrentVersion = () => {
  const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.version;
};

// 更新版本
const updateVersion = (newVersion) => {
  const packageJsonPath = join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.version = newVersion;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  log.success(`版本已更新为: ${newVersion}`);
};

// 提交版本更新
const commitVersionUpdate = (version) => {
  exec(`git add package.json`);
  exec(`git commit -m "chore(release): publish version ${version}"`);
  log.success('版本更新已提交');
};

// 创建标签
const createTag = (version) => {
  exec(`git tag v${version}`);
  log.success(`标签 v${version} 已创建`);
};

// 推送到远程
const pushToRemote = (version) => {
  exec('git push origin main');
  exec(`git push origin v${version}`);
  log.success('代码和标签已推送到远程');
};

// 构建包
const buildPackages = () => {
  log.info('开始构建包...');
  exec('pnpm build:packages');
  log.success('包构建完成');
};

// 发布包
const publishPackages = () => {
  log.info('开始发布包...');
  exec('pnpm -r publish');
  log.success('包发布完成');
};

// 主函数
const main = async () => {
  try {
    log.info('开始发布流程...');
    
    // 检查环境
    checkBranch();
    checkUncommittedChanges();
    checkSyncWithRemote();
    
    // 获取当前版本
    const currentVersion = getCurrentVersion();
    log.info(`当前版本: ${currentVersion}`);
    
    // 询问新版本
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const newVersion = await new Promise((resolve) => {
      rl.question(`请输入新版本 (当前: ${currentVersion}): `, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
    
    if (!newVersion) {
      log.error('版本号不能为空');
      process.exit(1);
    }
    
    // 确认发布
    const confirm = await new Promise((resolve) => {
      const rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      
      rl2.question(`确认发布版本 ${newVersion}? (y/N): `, (answer) => {
        rl2.close();
        resolve(answer.trim().toLowerCase() === 'y');
      });
    });
    
    if (!confirm) {
      log.info('发布已取消');
      process.exit(0);
    }
    
    // 执行发布流程
    updateVersion(newVersion);
    commitVersionUpdate(newVersion);
    createTag(newVersion);
    buildPackages();
    publishPackages();
    pushToRemote(newVersion);
    
    log.success(`版本 ${newVersion} 发布完成！`);
  } catch (error) {
    log.error(`发布失败: ${error.message}`);
    process.exit(1);
  }
};

// 运行主函数
main();