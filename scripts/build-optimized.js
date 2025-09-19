/**
 * 优化构建脚本
 * 用于生产环境的性能优化构建
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class OptimizedBuilder {
  constructor() {
    this.options = {
      analyze: false,
      compression: true,
      sourceMap: false,
      progress: true
    };
  }

  /**
   * 解析命令行参数
   */
  parseOptions(args) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      switch (arg) {
        case '--analyze':
          this.options.analyze = true;
          break;
        case '--no-compression':
          this.options.compression = false;
          break;
        case '--source-map':
          this.options.sourceMap = true;
          break;
        case '--no-progress':
          this.options.progress = false;
          break;
        case '--help':
          this.showHelp();
          return;
          break;
      }
    }
  }

  /**
   * 显示帮助信息
   */
  showHelp() {
    console.log(`
优化构建脚本

用法:
  node scripts/build-optimized.js [选项]

选项:
  --analyze          生成Bundle分析报告
  --no-compression  禁用压缩
  --source-map       生成source map
  --no-progress     禁用进度显示
  --help            显示帮助信息

示例:
  node scripts/build-optimized.js                    # 标准优化构建
  node scripts/build-optimized.js --analyze          # 带分析的构建
  node scripts/build-optimized.js --source-map       # 生成source map
    `);
  }

  /**
   * 清理之前的构建
   */
  clean() {
    if (this.options.progress) {
      console.log('🧹 清理之前的构建...');
    }

    const dirsToClean = ['dist', '.vite', 'node_modules/.cache'];

    for (const dir of dirsToClean) {
      if (fs.existsSync(dir)) {
        execSync(`rm -rf ${dir}`, { stdio: 'pipe' });
      }
    }
  }

  /**
   * 设置环境变量
   */
  setupEnvironment() {
    if (this.options.analyze) {
      process.env.ANALYZE = 'true';
    }

    if (!this.options.sourceMap) {
      process.env.SOURCE_MAP = 'false';
    }

    process.env.NODE_ENV = 'production';
  }

  /**
   * 运行类型检查
   */
  runTypeCheck() {
    if (this.options.progress) {
      console.log('🔍 运行类型检查...');
    }

    try {
      execSync('npm run type-check', { stdio: 'pipe' });
      if (this.options.progress) {
        console.log('  ✅ 类型检查通过');
      }
    } catch (error) {
      console.error('  ❌ 类型检查失败');
      console.error(error.message);
      process.exit(1);
    }
  }

  /**
   * 运行代码检查
   */
  runLintCheck() {
    if (this.options.progress) {
      console.log('🔍 运行代码检查...');
    }

    try {
      execSync('npm run lint', { stdio: 'pipe' });
      if (this.options.progress) {
        console.log('  ✅ 代码检查通过');
      }
    } catch (error) {
      console.error('  ❌ 代码检查失败');
      console.error(error.message);
      process.exit(1);
    }
  }

  /**
   * 运行测试
   */
  runTests() {
    if (this.options.progress) {
      console.log('🧪 运行测试...');
    }

    try {
      execSync('npm run test:run', { stdio: 'pipe' });
      if (this.options.progress) {
        console.log('  ✅ 测试通过');
      }
    } catch (error) {
      console.error('  ❌ 测试失败');
      console.error(error.message);
      process.exit(1);
    }
  }

  /**
   * 优化构建
   */
  async runOptimizedBuild() {
    if (this.options.progress) {
      console.log('🔨 开始优化构建...');
    }

    const startTime = Date.now();

    try {
      // 使用优化配置构建
      const buildCommand = 'npx vite build --config vite.optimized.config.ts';
      execSync(buildCommand, {
        stdio: this.options.progress ? 'inherit' : 'pipe',
        env: { ...process.env, ...this.getBuildEnv() }
      });

      const endTime = Date.now();
      const buildTime = endTime - startTime;

      if (this.options.progress) {
        console.log(`  ✅ 构建完成，耗时: ${buildTime}ms`);
      }

      return { success: true, buildTime };
    } catch (error) {
      console.error('  ❌ 构建失败');
      console.error(error.message);
      return { success: false, buildTime: 0, error };
    }
  }

  /**
   * 获取构建环境变量
   */
  getBuildEnv() {
    const env = {};

    if (this.options.analyze) {
      env.ANALYZE = 'true';
    }

    if (!this.options.sourceMap) {
      env.SOURCE_MAP = 'false';
    }

    env.NODE_ENV = 'production';
    env.COMPRESSION = this.options.compression ? 'true' : 'false';

    return env;
  }

  /**
   * 生成压缩文件
   */
  generateCompression() {
    if (!this.options.compression) {
      return;
    }

    if (this.options.progress) {
      console.log('🗜️  生成压缩文件...');
    }

    // 这里可以添加自定义的压缩逻辑
    // vite-plugin-compression 已经处理了大部分压缩工作
  }

  /**
   * 生成分析报告
   */
  generateAnalysisReport() {
    if (!this.options.analyze) {
      return;
    }

    if (this.options.progress) {
      console.log('📊 生成分析报告...');
    }

    try {
      // 运行Bundle分析
      const BundleAnalyzer = require('./analyze-bundle');
      const analyzer = new BundleAnalyzer();
      analyzer.generateReport();

      if (this.options.progress) {
        console.log('  ✅ 分析报告生成完成');
      }
    } catch (error) {
      console.error('  ❌ 分析报告生成失败');
      console.error(error.message);
    }
  }

  /**
   * 验证构建结果
   */
  validateBuild() {
    if (this.options.progress) {
      console.log('🔍 验证构建结果...');
    }

    const distPath = 'dist';

    if (!fs.existsSync(distPath)) {
      throw new Error('构建输出目录不存在');
    }

    const files = this.getBuildFiles(distPath);

    if (files.length === 0) {
      throw new Error('构建输出为空');
    }

    // 检查关键文件
    const requiredFiles = ['index.html', 'js'];
    for (const file of requiredFiles) {
      const filePath = path.join(distPath, file);
      if (!fs.existsSync(filePath)) {
        console.warn(`  ⚠️  缺少关键文件: ${file}`);
      }
    }

    if (this.options.progress) {
      console.log(`  ✅ 构建验证通过，共 ${files.length} 个文件`);
    }
  }

  /**
   * 获取构建文件列表
   */
  getBuildFiles(dirPath) {
    const files = [];

    const scan = (currentPath) => {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          scan(itemPath);
        } else {
          files.push(path.relative(dirPath, itemPath));
        }
      }
    };

    scan(dirPath);
    return files;
  }

  /**
   * 生成构建报告
   */
  generateBuildReport(buildResult) {
    const report = {
      timestamp: new Date().toISOString(),
      options: this.options,
      result: buildResult,
      stats: this.getBuildStats()
    };

    const reportPath = 'build-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    if (this.options.progress) {
      console.log(`📄 构建报告已保存到: ${reportPath}`);
    }
  }

  /**
   * 获取构建统计信息
   */
  getBuildStats() {
    const distPath = 'dist';
    let totalSize = 0;
    let fileCount = 0;

    if (fs.existsSync(distPath)) {
      const scan = (currentPath) => {
        const items = fs.readdirSync(currentPath);

        for (const item of items) {
          const itemPath = path.join(currentPath, item);
          const stats = fs.statSync(itemPath);

          if (stats.isDirectory()) {
            scan(itemPath);
          } else {
            totalSize += stats.size;
            fileCount++;
          }
        }
      };

      scan(distPath);
    }

    return {
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      fileCount
    };
  }

  /**
   * 运行完整构建流程
   */
  async runFullBuild() {
    console.log('🚀 开始优化构建流程...\n');

    try {
      // 1. 清理
      this.clean();

      // 2. 设置环境
      this.setupEnvironment();

      // 3. 类型检查
      this.runTypeCheck();

      // 4. 代码检查
      this.runLintCheck();

      // 5. 测试
      this.runTests();

      // 6. 构建项目
      const buildResult = await this.runOptimizedBuild();

      if (!buildResult.success) {
        throw new Error('构建失败');
      }

      // 7. 验证构建
      this.validateBuild();

      // 8. 生成压缩文件
      this.generateCompression();

      // 9. 生成分析报告
      this.generateAnalysisReport();

      // 10. 生成构建报告
      this.generateBuildReport(buildResult);

      console.log('\n🎉 优化构建完成！');
      console.log(`⏱️  构建时间: ${buildResult.buildTime}ms`);

    } catch (error) {
      console.error('\n❌ 构建流程失败:', error.message);
      process.exit(1);
    }
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new OptimizedBuilder();
  builder.parseOptions(process.argv.slice(2));
  builder.runFullBuild().catch(console.error);
}

export default OptimizedBuilder;
