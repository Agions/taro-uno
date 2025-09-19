/**
 * Bundle 分析脚本
 * 用于分析包大小和依赖关系
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { gzipSync } from 'zlib';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BundleAnalyzer {
  constructor() {
    this.distPath = path.resolve(__dirname, '../dist');
    this.reportPath = path.resolve(__dirname, '../bundle-analysis-report.json');
  }

  /**
   * 获取文件大小信息
   */
  getFileSizeInfo(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath);
      const gzipped = gzipSync(content);

      return {
        path: filePath,
        size: stats.size,
        sizeKB: (stats.size / 1024).toFixed(2),
        sizeGzipped: gzipped.length,
        sizeGzippedKB: (gzipped.length / 1024).toFixed(2),
        compressionRatio: ((1 - gzipped.length / stats.size) * 100).toFixed(2)
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * 扫描所有文件
   */
  scanFiles(dirPath, extensions = ['.js', '.css', '.json']) {
    const files = [];

    const scan = (currentPath) => {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          scan(itemPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(itemPath);
        }
      }
    };

    scan(dirPath);
    return files;
  }

  /**
   * 分析Bundle
   */
  analyzeBundle() {
    console.log('🔍 开始分析 Bundle...');

    if (!fs.existsSync(this.distPath)) {
      console.log('❌ dist 目录不存在，请先运行构建命令');
      return;
    }

    const files = this.scanFiles(this.distPath);
    const analysis = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: files.length,
        totalSize: 0,
        totalSizeGzipped: 0,
        largestFiles: [],
        fileTypes: {}
      },
      files: []
    };

    for (const filePath of files) {
      const sizeInfo = this.getFileSizeInfo(filePath);
      if (sizeInfo) {
        analysis.files.push(sizeInfo);
        analysis.summary.totalSize += sizeInfo.size;
        analysis.summary.totalSizeGzipped += sizeInfo.sizeGzipped;

        // 统计文件类型
        const ext = path.extname(filePath);
        if (!analysis.summary.fileTypes[ext]) {
          analysis.summary.fileTypes[ext] = {
            count: 0,
            totalSize: 0,
            totalSizeGzipped: 0
          };
        }
        analysis.summary.fileTypes[ext].count++;
        analysis.summary.fileTypes[ext].totalSize += sizeInfo.size;
        analysis.summary.fileTypes[ext].totalSizeGzipped += sizeInfo.sizeGzipped;
      }
    }

    // 转换为KB
    analysis.summary.totalSizeKB = (analysis.summary.totalSize / 1024).toFixed(2);
    analysis.summary.totalSizeGzippedKB = (analysis.summary.totalSizeGzipped / 1024).toFixed(2);

    // 找出最大的文件
    analysis.summary.largestFiles = analysis.files
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .map(file => ({
        path: path.relative(this.distPath, file.path),
        sizeKB: file.sizeKB,
        sizeGzippedKB: file.sizeGzippedKB,
        compressionRatio: file.compressionRatio
      }));

    return analysis;
  }

  /**
   * 生成建议
   */
  generateRecommendations(analysis) {
    const recommendations = [];

    // 总体大小建议
    const totalSizeMB = analysis.summary.totalSize / 1024 / 1024;
    if (totalSizeMB > 1) {
      recommendations.push({
        type: 'bundle_size',
        priority: 'high',
        issue: `Bundle 总大小 ${totalSizeMB.toFixed(2)}MB 超过推荐值 1MB`,
        suggestion: '考虑代码分割、懒加载、移除未使用的依赖'
      });
    }

    // 单个文件大小建议
    const largeFiles = analysis.summary.largestFiles.filter(file => parseFloat(file.sizeKB) > 200);
    if (largeFiles.length > 0) {
      recommendations.push({
        type: 'large_files',
        priority: 'high',
        issue: `发现 ${largeFiles.length} 个超过 200KB 的大文件`,
        suggestion: '对大文件进行代码分割，考虑懒加载策略'
      });
    }

    // 压缩效果建议
    const avgCompressionRatio = analysis.files.reduce((sum, file) =>
      sum + parseFloat(file.compressionRatio), 0) / analysis.files.length;
    if (avgCompressionRatio < 50) {
      recommendations.push({
        type: 'compression',
        priority: 'medium',
        issue: `平均压缩率 ${avgCompressionRatio.toFixed(2)}% 较低`,
        suggestion: '检查文件内容，考虑使用更高效的压缩算法'
      });
    }

    // 文件类型分析
    const jsFiles = analysis.summary.fileTypes['.js'] || { count: 0, totalSize: 0 };
    const cssFiles = analysis.summary.fileTypes['.css'] || { count: 0, totalSize: 0 };

    if (jsFiles.totalSize > analysis.summary.totalSize * 0.8) {
      recommendations.push({
        type: 'js_heavy',
        priority: 'medium',
        issue: 'JavaScript 文件占比过高',
        suggestion: '考虑使用 Tree Shaking、代码分割、移除死代码'
      });
    }

    if (cssFiles.totalSize > analysis.summary.totalSize * 0.3) {
      recommendations.push({
        type: 'css_heavy',
        priority: 'medium',
        issue: 'CSS 文件占比过高',
        suggestion: '使用 PurgeCSS、移除未使用的样式、压缩 CSS'
      });
    }

    return recommendations;
  }

  /**
   * 生成报告
   */
  generateReport() {
    const analysis = this.analyzeBundle();
    const recommendations = this.generateRecommendations(analysis);

    const report = {
      ...analysis,
      recommendations,
      metrics: {
        bundleSizeScore: this.calculateBundleSizeScore(analysis),
        performanceScore: this.calculatePerformanceScore(analysis)
      }
    };

    // 保存报告
    fs.writeFileSync(this.reportPath, JSON.stringify(report, null, 2));

    // 打印摘要
    this.printSummary(report);

    return report;
  }

  /**
   * 计算 Bundle 大小分数
   */
  calculateBundleSizeScore(analysis) {
    const totalSizeMB = analysis.summary.totalSize / 1024 / 1024;

    if (totalSizeMB < 0.5) return 100;
    if (totalSizeMB < 1) return 80;
    if (totalSizeMB < 2) return 60;
    if (totalSizeMB < 5) return 40;
    return 20;
  }

  /**
   * 计算性能分数
   */
  calculatePerformanceScore(analysis) {
    const largeFileCount = analysis.summary.largestFiles.filter(file => parseFloat(file.sizeKB) > 100).length;
    const avgCompressionRatio = analysis.files.reduce((sum, file) =>
      sum + parseFloat(file.compressionRatio), 0) / analysis.files.length;

    let score = 100;

    // 大文件扣分
    score -= largeFileCount * 10;

    // 压缩率扣分
    if (avgCompressionRatio < 50) score -= 20;
    if (avgCompressionRatio < 30) score -= 30;

    return Math.max(0, score);
  }

  /**
   * 打印摘要
   */
  printSummary(report) {
    console.log('\n📊 Bundle 分析报告');
    console.log('='.repeat(50));
    console.log(`📁 总文件数: ${report.summary.totalFiles}`);
    console.log(`📦 总大小: ${report.summary.totalSizeKB} KB (${report.summary.totalSizeGzippedKB} KB gzipped)`);
    console.log(`🎯 Bundle 大小分数: ${report.metrics.bundleSizeScore}/100`);
    console.log(`⚡ 性能分数: ${report.metrics.performanceScore}/100`);

    console.log('\n📈 文件类型分布:');
    for (const [ext, info] of Object.entries(report.summary.fileTypes)) {
      console.log(`  ${ext}: ${info.count} 个文件, ${(info.totalSize / 1024).toFixed(2)} KB`);
    }

    console.log('\n🔍 最大的文件:');
    report.summary.largestFiles.slice(0, 5).forEach((file, index) => {
      console.log(`  ${index + 1}. ${file.path} (${file.sizeKB} KB, ${file.sizeGzippedKB} KB gzipped)`);
    });

    console.log('\n💡 优化建议:');
    report.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.issue}`);
      console.log(`     建议: ${rec.suggestion}`);
    });

    console.log(`\n📄 详细报告已保存到: ${this.reportPath}`);
  }

  /**
   * 清理报告
   */
  cleanup() {
    if (fs.existsSync(this.reportPath)) {
      fs.unlinkSync(this.reportPath);
      console.log('🧹 已清理分析报告');
    }
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new BundleAnalyzer();

  // 检查命令行参数
  const args = process.argv.slice(2);

  if (args.includes('--clean')) {
    analyzer.cleanup();
    process.exit(0);
  }

  if (args.includes('--help')) {
    console.log(`
Bundle 分析工具

用法:
  node scripts/analyze-bundle.js [选项]

选项:
  --clean    清理分析报告
  --help     显示帮助信息

示例:
  node scripts/analyze-bundle.js          # 生成分析报告
  node scripts/analyze-bundle.js --clean  # 清理报告
    `);
    process.exit(0);
  }

  // 生成报告
  analyzer.generateReport();
}

export default BundleAnalyzer;
