#!/usr/bin/env node

/**
 * 文档更新流程脚本
 * 用于自动化文档的更新、验证和发布流程
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

const log = {
  info: (msg) => console.log(chalk.blue('📝'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  title: (msg) => console.log(chalk.bold.cyan('🔄'), msg),
};

// 配置
const config = {
  docsDir: path.resolve(__dirname, '../docs'),
  srcDir: path.resolve(__dirname, '../src'),
  scriptDir: __dirname,
  tempDir: path.resolve(__dirname, '../temp'),
  maxRetries: 3,
  timeout: 30000 // 30 seconds
};

// 主函数
async function main() {
  log.title('文档更新流程');

  const args = process.argv.slice(2);
  const options = parseArgs(args);

  try {
    // 1. 检查环境
    await checkEnvironment();

    // 2. 备份当前文档
    await backupCurrentDocs();

    // 3. 生成新文档
    await generateNewDocs(options);

    // 4. 验证文档
    await validateDocs();

    // 5. 测试构建
    await testBuild();

    // 6. 更新索引
    await updateIndexes();

    // 7. 生成变更日志
    await generateChangeLog();

    // 8. 清理临时文件
    await cleanup();

    log.success('文档更新流程完成！');

    // 9. 可选：提交更改
    if (options.commit) {
      await commitChanges();
    }

    // 10. 可选：创建 PR
    if (options.pr) {
      await createPullRequest();
    }

  } catch (error) {
    log.error('文档更新失败:', error.message);

    // 回滚备份
    if (fs.existsSync(path.join(config.tempDir, 'docs-backup'))) {
      await rollbackBackup();
    }

    process.exit(1);
  }
}

// 解析命令行参数
function parseArgs(args) {
  const options = {
    verbose: false,
    commit: false,
    pr: false,
    dryRun: false,
    force: false,
    component: null,
    hook: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--commit':
      case '-c':
        options.commit = true;
        break;
      case '--pr':
      case '-p':
        options.pr = true;
        break;
      case '--dry-run':
      case '-d':
        options.dryRun = true;
        break;
      case '--force':
      case '-f':
        options.force = true;
        break;
      case '--component':
        options.component = args[++i];
        break;
      case '--hook':
        options.hook = args[++i];
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
    }
  }

  return options;
}

// 显示帮助
function showHelp() {
  console.log(`
文档更新流程脚本

使用方法:
  node scripts/update-docs.js [options]

选项:
  --verbose, -v        详细输出
  --commit, -c         提交更改到 git
  --pr, -p             创建 Pull Request
  --dry-run, -d        试运行模式
  --force, -f          强制更新，跳过检查
  --component <name>   只更新指定组件
  --hook <name>        只更新指定 Hook
  --help, -h           显示帮助信息

示例:
  node scripts/update-docs.js --commit
  node scripts/update-docs.js --component Button
  node scripts/update-docs.js --dry-run
`);
}

// 检查环境
async function checkEnvironment() {
  log.info('检查环境...');

  // 检查 Node.js 版本
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

  if (majorVersion < 16) {
    throw new Error(`Node.js 版本过低，需要 16+，当前版本: ${nodeVersion}`);
  }

  // 检查必要的依赖
  const dependencies = ['pnpm', 'git'];

  for (const dep of dependencies) {
    try {
      execSync(`${dep} --version`, { stdio: 'pipe' });
    } catch (error) {
      throw new Error(`缺少必要的依赖: ${dep}`);
    }
  }

  // 检查项目结构
  const requiredDirs = [config.docsDir, config.srcDir];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      throw new Error(`缺少必要的目录: ${dir}`);
    }
  }

  log.success('环境检查通过');
}

// 备份当前文档
async function backupCurrentDocs() {
  log.info('备份当前文档...');

  const backupDir = path.join(config.tempDir, 'docs-backup');

  // 创建临时目录
  if (!fs.existsSync(config.tempDir)) {
    fs.mkdirSync(config.tempDir, { recursive: true });
  }

  // 删除旧备份
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true });
  }

  // 复制文档目录
  execSync(`cp -r "${config.docsDir}" "${backupDir}"`);

  log.success('文档备份完成');
}

// 生成新文档
async function generateNewDocs(options) {
  log.info('生成新文档...');

  const generateCmd = `node "${path.join(config.scriptDir, 'generate-docs.js')}"`;

  if (options.component) {
    execSync(`${generateCmd} components --component ${options.component}`, {
      stdio: 'inherit',
      timeout: config.timeout
    });
  } else if (options.hook) {
    execSync(`${generateCmd} hooks --hook ${options.hook}`, {
      stdio: 'inherit',
      timeout: config.timeout
    });
  } else {
    execSync(`${generateCmd} all`, {
      stdio: 'inherit',
      timeout: config.timeout
    });
  }

  log.success('新文档生成完成');
}

// 验证文档
async function validateDocs() {
  log.info('验证文档...');

  const issues = [];

  // 检查文档结构
  const checkDocsStructure = () => {
    const requiredFiles = [
      'index.md',
      'getting-started.md',
      'components/basic/Button.md',
      'hooks/use-theme.md'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(config.docsDir, file);
      if (!fs.existsSync(filePath)) {
        issues.push(`缺少必要文件: ${file}`);
      }
    }
  };

  // 检查链接
  const checkLinks = () => {
    const markdownFiles = [];

    const findMarkdownFiles = (dir) => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          findMarkdownFiles(filePath);
        } else if (file.endsWith('.md')) {
          markdownFiles.push(filePath);
        }
      }
    };

    findMarkdownFiles(config.docsDir);

    // 简单的链接检查
    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

      for (const link of links) {
        const url = link.match(/\(([^)]+)\)/)[1];

        if (url.startsWith('http') && !url.includes('taro-uno.com')) {
          // 检查外部链接（简化版）
          try {
            const response = execSync(`curl -I -s -o /dev/null -w "%{http_code}" "${url}"`, {
              timeout: 5000,
              stdio: 'pipe'
            });

            if (response.toString() !== '200') {
              issues.push(`外部链接失效: ${url} 在 ${file}`);
            }
          } catch (error) {
            issues.push(`无法检查外部链接: ${url} 在 ${file}`);
          }
        }
      }
    }
  };

  // 检查格式
  const checkFormat = () => {
    const markdownFiles = [];

    const findMarkdownFiles = (dir) => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          findMarkdownFiles(filePath);
        } else if (file.endsWith('.md')) {
          markdownFiles.push(filePath);
        }
      }
    };

    findMarkdownFiles(config.docsDir);

    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf8');

      // 检查标题结构
      const lines = content.split('\n');
      let hasTitle = false;

      for (const line of lines) {
        if (line.startsWith('# ')) {
          hasTitle = true;
          break;
        }
      }

      if (!hasTitle) {
        issues.push(`缺少标题: ${file}`);
      }

      // 检查代码块语法
      const codeBlocks = content.match(/```[\s\S]*?```/g) || [];

      for (const block of codeBlocks) {
        const firstLine = block.split('\n')[0];
        if (!firstLine.includes('tsx') && !firstLine.includes('typescript') && !firstLine.includes('bash')) {
          issues.push(`代码块缺少语言标识: ${file}`);
        }
      }
    }
  };

  // 执行检查
  checkDocsStructure();
  checkLinks();
  checkFormat();

  if (issues.length > 0) {
    log.warning(`发现 ${issues.length} 个问题:`);
    issues.forEach(issue => log.warning(`  - ${issue}`));

    // 如果不是强制模式，询问是否继续
    if (!options.force) {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise((resolve) => {
        rl.question('是否继续？(y/N): ', resolve);
      });

      rl.close();

      if (answer.toLowerCase() !== 'y') {
        throw new Error('用户取消操作');
      }
    }
  } else {
    log.success('文档验证通过');
  }
}

// 测试构建
async function testBuild() {
  log.info('测试文档构建...');

  // 保存当前目录
  const originalDir = process.cwd();

  try {
    // 切换到文档目录
    process.chdir(config.docsDir);

    // 安装依赖
    execSync('pnpm install --frozen-lockfile', {
      stdio: 'inherit',
      timeout: config.timeout
    });

    // 构建文档
    execSync('pnpm build', {
      stdio: 'inherit',
      timeout: config.timeout
    });

    log.success('文档构建测试通过');

  } finally {
    // 恢复原始目录
    process.chdir(originalDir);
  }
}

// 更新索引
async function updateIndexes() {
  log.info('更新索引...');

  // 生成组件索引
  const generateComponentIndex = () => {
    const componentsDir = path.join(config.docsDir, 'components');
    const indexPath = path.join(config.docsDir, 'components', 'index.md');

    if (!fs.existsSync(componentsDir)) {
      return;
    }

    const categories = fs.readdirSync(componentsDir);
    let indexContent = '# 组件索引\n\n';

    for (const category of categories) {
      const categoryDir = path.join(componentsDir, category);

      if (fs.statSync(categoryDir).isDirectory()) {
        const files = fs.readdirSync(categoryDir);
        const componentFiles = files.filter(f => f.endsWith('.md'));

        indexContent += `## ${category}\n\n`;

        for (const file of componentFiles) {
          const componentName = file.replace('.md', '');
          const title = componentName.charAt(0).toUpperCase() + componentName.slice(1);
          indexContent += `- [${title}](${category}/${file})\n`;
        }

        indexContent += '\n';
      }
    }

    fs.writeFileSync(indexPath, indexContent);
  };

  // 生成 Hooks 索引
  const generateHooksIndex = () => {
    const hooksDir = path.join(config.docsDir, 'hooks');
    const indexPath = path.join(config.docsDir, 'hooks', 'index.md');

    if (!fs.existsSync(hooksDir)) {
      return;
    }

    const files = fs.readdirSync(hooksDir);
    const hookFiles = files.filter(f => f.endsWith('.md'));

    let indexContent = '# Hooks 索引\n\n';

    for (const file of hookFiles) {
      const hookName = file.replace('.md', '');
      indexContent += `- [${hookName}](${file})\n`;
    }

    fs.writeFileSync(indexPath, indexContent);
  };

  // 执行索引更新
  generateComponentIndex();
  generateHooksIndex();

  log.success('索引更新完成');
}

// 生成变更日志
async function generateChangeLog() {
  log.info('生成变更日志...');

  try {
    const changelogPath = path.join(config.docsDir, 'changelog.md');

    // 获取最近的提交
    const recentCommits = execSync('git log --oneline -10', {
      stdio: 'pipe',
      encoding: 'utf8'
    });

    // 生成变更日志条目
    const timestamp = new Date().toISOString().split('T')[0];
    const changeLogEntry = `## ${timestamp}

### 文档更新

- 更新组件文档
- 更新 Hooks 文档
- 更新 API 文档
- 修复文档问题

### 最近提交

\`\`\`
${recentCommits}
\`\`\`

---

`;

    // 如果变更日志存在，在开头插入新条目
    if (fs.existsSync(changelogPath)) {
      const existingContent = fs.readFileSync(changelogPath, 'utf8');
      const newContent = changeLogEntry + existingContent;
      fs.writeFileSync(changelogPath, newContent);
    } else {
      fs.writeFileSync(changelogPath, changeLogEntry);
    }

    log.success('变更日志生成完成');

  } catch (error) {
    log.warning('生成变更日志失败:', error.message);
  }
}

// 清理临时文件
async function cleanup() {
  log.info('清理临时文件...');

  if (fs.existsSync(config.tempDir)) {
    fs.rmSync(config.tempDir, { recursive: true });
  }

  log.success('清理完成');
}

// 回滚备份
async function rollbackBackup() {
  log.info('回滚备份...');

  const backupDir = path.join(config.tempDir, 'docs-backup');

  if (fs.existsSync(backupDir)) {
    // 删除当前文档
    if (fs.existsSync(config.docsDir)) {
      fs.rmSync(config.docsDir, { recursive: true });
    }

    // 恢复备份
    execSync(`mv "${backupDir}" "${config.docsDir}"`);

    log.success('回滚完成');
  }
}

// 提交更改
async function commitChanges() {
  log.info('提交更改...');

  try {
    // 检查是否有更改
    const status = execSync('git status --porcelain', {
      stdio: 'pipe',
      encoding: 'utf8'
    });

    if (!status.trim()) {
      log.warning('没有更改需要提交');
      return;
    }

    // 添加更改
    execSync('git add docs/', { stdio: 'inherit' });

    // 提交
    execSync('git commit -m "docs: 更新文档 [skip ci]"', { stdio: 'inherit' });

    log.success('更改已提交');

  } catch (error) {
    log.warning('提交更改失败:', error.message);
  }
}

// 创建 Pull Request
async function createPullRequest() {
  log.info('创建 Pull Request...');

  try {
    // 创建新分支
    const branchName = `docs/update-${Date.now()}`;
    execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });

    // 推送分支
    execSync(`git push origin ${branchName}`, { stdio: 'inherit' });

    // 创建 PR (使用 GitHub CLI)
    const prTitle = 'docs: 更新文档';
    const prBody = '## 变更内容\n\n- 更新组件文档\n- 更新 Hooks 文档\n- 更新 API 文档\n\n## 检查清单\n\n- [ ] 文档构建测试通过\n- [ ] 链接检查通过\n- [ ] 格式检查通过';

    execSync(`gh pr create --title "${prTitle}" --body "${prBody}" --base main --head ${branchName}`, {
      stdio: 'inherit'
    });

    log.success('Pull Request 已创建');

  } catch (error) {
    log.warning('创建 Pull Request 失败:', error.message);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  main,
  checkEnvironment,
  backupCurrentDocs,
  generateNewDocs,
  validateDocs,
  testBuild,
  updateIndexes,
  generateChangeLog,
  cleanup,
  rollbackBackup,
  commitChanges,
  createPullRequest
};
