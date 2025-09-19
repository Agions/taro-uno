const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 获取当前版本
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  return packageJson.version;
}

// 更新版本号
function updateVersion(newVersion) {
  // 更新根 package.json
  const rootPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  rootPackageJson.version = newVersion;
  fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(rootPackageJson, null, 2) + '\n');

  // 更新各个包的版本
  const packagesDir = path.join(__dirname, '../packages');
  const packages = fs.readdirSync(packagesDir);

  packages.forEach((pkg) => {
    const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.version = newVersion;

      // 更新依赖版本
      if (packageJson.dependencies) {
        Object.keys(packageJson.dependencies).forEach((dep) => {
          if (dep.startsWith('@taro-uno/')) {
            packageJson.dependencies[dep] = newVersion;
          }
        });
      }

      // 更新开发依赖版本
      if (packageJson.devDependencies) {
        Object.keys(packageJson.devDependencies).forEach((dep) => {
          if (dep.startsWith('@taro-uno/')) {
            packageJson.devDependencies[dep] = newVersion;
          }
        });
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    }
  });
}

// 生成更新日志
function generateChangelog(version) {
  const changelogPath = path.join(__dirname, '../packages/docs/docs/changelog/index.md');
  let changelog = '';

  if (fs.existsSync(changelogPath)) {
    changelog = fs.readFileSync(changelogPath, 'utf8');
  }

  const date = new Date().toISOString().split('T')[0];
  const newEntry = `## ${version} (${date})\n\n### 新增\n\n### 修复\n\n### 优化\n\n### 文档\n\n---\n\n`;

  fs.writeFileSync(changelogPath, newEntry + changelog);
}

// 执行命令
function runCommand(command, options = {}) {
  try {
    console.log(`执行命令: ${command}`);
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    console.error(`命令执行失败: ${command}`);
    console.error(error.message);
    return false;
  }
}

// 发布流程
async function release() {
  console.log('开始发布流程...\n');

  // 检查工作目录是否干净
  console.log('检查工作目录...');
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.error('工作目录不干净，请先提交所有更改');
    rl.close();
    return;
  }
  console.log('工作目录干净\n');

  // 获取当前版本
  const currentVersion = getCurrentVersion();
  console.log(`当前版本: ${currentVersion}\n`);

  // 询问新版本
  rl.question(`请输入新版本 (当前: ${currentVersion}): `, (newVersion) => {
    if (!newVersion) {
      console.log('版本号不能为空');
      rl.close();
      return;
    }

    console.log(`\n准备发布版本 ${newVersion}\n`);

    // 更新版本号
    console.log('更新版本号...');
    updateVersion(newVersion);
    console.log('版本号已更新\n');

    // 生成更新日志
    console.log('生成更新日志...');
    generateChangelog(newVersion);
    console.log('更新日志已生成\n');

    // 提交更改
    console.log('提交更改...');
    runCommand(`git add .`);
    runCommand(`git commit -m "chore(release): release version ${newVersion}"`);
    console.log('更改已提交\n');

    // 创建标签
    console.log('创建标签...');
    runCommand(`git tag v${newVersion}`);
    console.log('标签已创建\n');

    // 构建项目
    console.log('构建项目...');
    if (!runCommand('npm run build')) {
      console.error('构建失败');
      rl.close();
      return;
    }
    console.log('项目构建成功\n');

    // 发布到 npm
    console.log('发布到 npm...');
    if (!runCommand('npm publish --access public')) {
      console.error('npm 发布失败');
      rl.close();
      return;
    }
    console.log('已发布到 npm\n');

    // 推送到 GitHub
    console.log('推送到 GitHub...');
    runCommand('git push origin main');
    runCommand(`git push origin v${newVersion}`);
    console.log('已推送到 GitHub\n');

    // 部署文档
    console.log('部署文档...');
    if (!runCommand('cd packages/docs && npm run deploy')) {
      console.error('文档部署失败');
      rl.close();
      return;
    }
    console.log('文档已部署\n');

    console.log(`\n✅ 版本 ${newVersion} 发布成功！`);
    rl.close();
  });
}

// 执行发布流程
release();
