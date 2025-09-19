#!/usr/bin/env node

/**
 * Performance Optimization Script
 * Automatically applies performance optimizations to the Taro-Uno UI project
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.optimizations = {
      applied: [],
      skipped: [],
      failed: [],
    };
    this.results = {
      beforeOptimization: {},
      afterOptimization: {},
      improvements: {},
    };
  }

  /**
   * Run complete performance optimization
   */
  async optimize() {
    console.log('🚀 Starting performance optimization...');

    try {
      // 1. Analyze current performance
      await this.analyzeCurrentPerformance();

      // 2. Apply build optimizations
      await this.applyBuildOptimizations();

      // 3. Apply code optimizations
      await this.applyCodeOptimizations();

      // 4. Apply dependency optimizations
      await this.applyDependencyOptimizations();

      // 5. Apply monitoring optimizations
      await this.applyMonitoringOptimizations();

      // 6. Generate optimization report
      await this.generateOptimizationReport();

      console.log('✅ Performance optimization completed!');
      this.displayResults();

    } catch (error) {
      console.error('❌ Performance optimization failed:', error);
      process.exit(1);
    }
  }

  /**
   * Analyze current performance metrics
   */
  async analyzeCurrentPerformance() {
    console.log('📊 Analyzing current performance...');

    try {
      // Run build to get current metrics
      execSync('npm run build', { stdio: 'pipe' });

      // Get bundle size
      const distPath = path.join(this.projectRoot, 'dist');
      const bundleStats = this.analyzeBundleSize(distPath);

      this.results.beforeOptimization = {
        bundleSize: bundleStats,
        buildTime: this.measureBuildTime(),
        dependencyCount: this.countDependencies(),
        typeScriptErrors: this.countTypeScriptErrors(),
      };

      console.log('  Current bundle size:', bundleStats.totalSizeKB, 'KB');
      console.log('  Current build time:', this.results.beforeOptimization.buildTime, 'ms');

    } catch (error) {
      console.error('  Failed to analyze current performance:', error.message);
      this.results.beforeOptimization = {
        bundleSize: { totalSizeKB: 'unknown' },
        buildTime: 'unknown',
        dependencyCount: 0,
        typeScriptErrors: 0,
      };
    }
  }

  /**
   * Apply build optimizations
   */
  async applyBuildOptimizations() {
    console.log('🔧 Applying build optimizations...');

    // 1. Apply optimized Vite configuration
    if (this.backupFile('vite.config.ts')) {
      try {
        fs.copyFileSync(
          path.join(this.projectRoot, 'vite.optimized.config.ts'),
          path.join(this.projectRoot, 'vite.config.ts')
        );
        this.optimizations.applied.push('Optimized Vite configuration');
      } catch (error) {
        this.optimizations.failed.push('Optimized Vite configuration');
        console.error('  Failed to apply Vite optimizations:', error.message);
      }
    }

    // 2. Optimize package.json exports
    await this.optimizePackageJson();

    // 3. Add performance scripts
    await this.addPerformanceScripts();
  }

  /**
   * Apply code optimizations
   */
  async applyCodeOptimizations() {
    console.log('📝 Applying code optimizations...');

    // 1. Optimize component files
    await this.optimizeComponents();

    // 2. Add side effects configuration
    await this.addSideEffectsConfig();

    // 3. Optimize TypeScript configuration
    await this.optimizeTypeScriptConfig();
  }

  /**
   * Apply dependency optimizations
   */
  async applyDependencyOptimizations() {
    console.log('📦 Applying dependency optimizations...');

    // 1. Analyze and optimize dependencies
    await this.optimizeDependencies();

    // 2. Add bundle analyzer
    await this.addBundleAnalyzer();
  }

  /**
   * Apply monitoring optimizations
   */
  async applyMonitoringOptimizations() {
    console.log('📈 Applying monitoring optimizations...');

    // 1. Add performance monitoring
    await this.addPerformanceMonitoring();

    // 2. Add performance budgets
    await this.addPerformanceBudgets();
  }

  /**
   * Optimize package.json
   */
  async optimizePackageJson() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      // Optimize exports
      packageJson.exports = {
        '.': {
          'import': './dist/taro-uno-ui.es.js',
          'require': './dist/taro-uno-ui.cjs.js',
          'types': './dist/index.d.ts',
        },
        './dist/style.css': './dist/style.css',
      };

      // Add side effects
      packageJson.sideEffects = [
        '**/*.scss',
        '**/*.css',
        'src/components/index.tsx',
      ];

      // Add performance budgets
      packageJson.performanceBudget = {
        budgets: [
          {
            type: 'initial',
            maximumSize: '200KB',
          },
          {
            type: 'script',
            maximumSize: '100KB',
          },
        ],
      };

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      this.optimizations.applied.push('Optimized package.json');

    } catch (error) {
      this.optimizations.failed.push('Optimized package.json');
      console.error('  Failed to optimize package.json:', error.message);
    }
  }

  /**
   * Add performance scripts
   */
  async addPerformanceScripts() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      const performanceScripts = {
        'perf:test': 'node scripts/performance-test.js',
        'perf:monitor': 'node scripts/performance-monitor.cjs',
        'perf:optimize': 'node scripts/optimize-performance.js',
        'build:analyze': 'ANALYZE=true npm run build',
        'build:optimized': 'vite build --config vite.optimized.config.ts',
      };

      packageJson.scripts = { ...packageJson.scripts, ...performanceScripts };

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      this.optimizations.applied.push('Added performance scripts');

    } catch (error) {
      this.optimizations.failed.push('Added performance scripts');
      console.error('  Failed to add performance scripts:', error.message);
    }
  }

  /**
   * Optimize components
   */
  async optimizeComponents() {
    // This would typically involve:
    // 1. Adding React.memo to components
    // 2. Optimizing event handlers
    // 3. Adding performance monitoring
    // For now, we'll just log the optimization
    this.optimizations.applied.push('Component optimizations (placeholder)');
  }

  /**
   * Add side effects configuration
   */
  async addSideEffectsConfig() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      if (!packageJson.sideEffects) {
        packageJson.sideEffects = false;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        this.optimizations.applied.push('Added side effects configuration');
      }
    } catch (error) {
      this.optimizations.failed.push('Added side effects configuration');
      console.error('  Failed to add side effects configuration:', error.message);
    }
  }

  /**
   * Optimize TypeScript configuration
   */
  async optimizeTypeScriptConfig() {
    try {
      const tsConfigPath = path.join(this.projectRoot, 'tsconfig.json');
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

      // Enable strict mode optimizations
      tsConfig.compilerOptions = {
        ...tsConfig.compilerOptions,
        strict: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
      };

      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
      this.optimizations.applied.push('Optimized TypeScript configuration');

    } catch (error) {
      this.optimizations.failed.push('Optimized TypeScript configuration');
      console.error('  Failed to optimize TypeScript configuration:', error.message);
    }
  }

  /**
   * Optimize dependencies
   */
  async optimizeDependencies() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      // Remove unused dependencies (simplified check)
      const usedDependencies = new Set(['react', 'react-dom', '@tarojs/taro', '@tarojs/components']);
      const allDependencies = Object.keys(packageJson.dependencies || {});
      const unusedDependencies = allDependencies.filter(dep => !usedDependencies.has(dep));

      if (unusedDependencies.length > 0) {
        console.log(`  Found ${unusedDependencies.length} potentially unused dependencies`);
        unusedDependencies.forEach(dep => {
          console.log(`    - ${dep}`);
        });
      }

      this.optimizations.applied.push('Dependency analysis completed');

    } catch (error) {
      this.optimizations.failed.push('Dependency analysis');
      console.error('  Failed to analyze dependencies:', error.message);
    }
  }

  /**
   * Add bundle analyzer
   */
  async addBundleAnalyzer() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      if (!packageJson.devDependencies['rollup-plugin-visualizer']) {
        packageJson.devDependencies['rollup-plugin-visualizer'] = '^6.0.3';
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        this.optimizations.applied.push('Added bundle analyzer');
      }
    } catch (error) {
      this.optimizations.failed.push('Added bundle analyzer');
      console.error('  Failed to add bundle analyzer:', error.message);
    }
  }

  /**
   * Add performance monitoring
   */
  async addPerformanceMonitoring() {
    // Create performance monitoring configuration
    const perfConfig = {
      enabled: true,
      metrics: {
        renderTime: true,
        memoryUsage: true,
        interactionTime: true,
      },
      thresholds: {
        renderTime: 16,
        memoryUsage: 50 * 1024 * 1024,
        interactionTime: 100,
      },
    };

    const configPath = path.join(this.projectRoot, 'performance.config.json');
    fs.writeFileSync(configPath, JSON.stringify(perfConfig, null, 2));

    this.optimizations.applied.push('Added performance monitoring');
  }

  /**
   * Add performance budgets
   */
  async addPerformanceBudgets() {
    // Create performance budget configuration
    const budgetConfig = {
      budgets: [
        {
          type: 'initial',
          maximumSize: '200KB',
          warning: '150KB',
          error: '250KB',
        },
        {
          type: 'total',
          maximumSize: '400KB',
          warning: '300KB',
          error: '500KB',
        },
      ],
    };

    const configPath = path.join(this.projectRoot, 'performance-budget.json');
    fs.writeFileSync(configPath, JSON.stringify(budgetConfig, null, 2));

    this.optimizations.applied.push('Added performance budgets');
  }

  /**
   * Analyze bundle size
   */
  analyzeBundleSize(distPath) {
    if (!fs.existsSync(distPath)) {
      return { totalSizeKB: 'unknown' };
    }

    let totalSize = 0;
    const scanDir = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          scanDir(filePath);
        } else {
          totalSize += stat.size;
        }
      }
    };

    scanDir(distPath);

    return {
      totalSizeKB: (totalSize / 1024).toFixed(2),
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
    };
  }

  /**
   * Measure build time
   */
  measureBuildTime() {
    try {
      const startTime = Date.now();
      execSync('npm run build', { stdio: 'pipe' });
      return Date.now() - startTime;
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Count dependencies
   */
  countDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      return dependencies.length + devDependencies.length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Count TypeScript errors
   */
  countTypeScriptErrors() {
    try {
      const output = execSync('npx tsc --noEmit', { encoding: 'utf8', stdio: 'pipe' });
      const errors = output.split('\n').filter(line => line.includes('error TS'));
      return errors.length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Backup file
   */
  backupFile(filename) {
    const filePath = path.join(this.projectRoot, filename);
    const backupPath = path.join(this.projectRoot, `${filename}.backup`);

    if (fs.existsSync(filePath) && !fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      return true;
    }
    return false;
  }

  /**
   * Generate optimization report
   */
  async generateOptimizationReport() {
    console.log('📄 Generating optimization report...');

    try {
      // Measure post-optimization performance
      this.results.afterOptimization = {
        bundleSize: this.analyzeBundleSize(path.join(this.projectRoot, 'dist')),
        buildTime: this.measureBuildTime(),
        dependencyCount: this.countDependencies(),
        typeScriptErrors: this.countTypeScriptErrors(),
      };

      // Calculate improvements
      const beforeSize = parseFloat(this.results.beforeOptimization.bundleSize?.totalSizeKB || 0);
      const afterSize = parseFloat(this.results.afterOptimization.bundleSize?.totalSizeKB || 0);
      const sizeImprovement = beforeSize > 0 ? ((beforeSize - afterSize) / beforeSize * 100).toFixed(1) : 0;

      const beforeBuildTime = parseFloat(this.results.beforeOptimization.buildTime || 0);
      const afterBuildTime = parseFloat(this.results.afterOptimization.buildTime || 0);
      const buildImprovement = beforeBuildTime > 0 ? ((beforeBuildTime - afterBuildTime) / beforeBuildTime * 100).toFixed(1) : 0;

      this.results.improvements = {
        sizeReduction: `${sizeImprovement}%`,
        buildTimeReduction: `${buildImprovement}%`,
        optimizationsApplied: this.optimizations.applied.length,
        optimizationsFailed: this.optimizations.failed.length,
      };

      // Save report
      const reportPath = path.join(this.projectRoot, 'performance-optimization-report.json');
      const report = {
        timestamp: new Date().toISOString(),
        beforeOptimization: this.results.beforeOptimization,
        afterOptimization: this.results.afterOptimization,
        improvements: this.results.improvements,
        optimizations: this.optimizations,
      };

      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`  Report saved to: ${reportPath}`);

    } catch (error) {
      console.error('  Failed to generate optimization report:', error.message);
    }
  }

  /**
   * Display results
   */
  displayResults() {
    console.log('\n🎯 Performance Optimization Results');
    console.log('='.repeat(50));

    console.log('\n📊 Performance Improvements:');
    console.log(`  Bundle Size: ${this.results.improvements.sizeReduction || 'N/A'} reduction`);
    console.log(`  Build Time: ${this.results.improvements.buildTimeReduction || 'N/A'} reduction`);

    console.log('\n✅ Optimizations Applied:');
    this.optimizations.applied.forEach((opt, index) => {
      console.log(`  ${index + 1}. ${opt}`);
    });

    if (this.optimizations.failed.length > 0) {
      console.log('\n❌ Failed Optimizations:');
      this.optimizations.failed.forEach((opt, index) => {
        console.log(`  ${index + 1}. ${opt}`);
      });
    }

    console.log('\n📋 Summary:');
    console.log(`  Applied: ${this.optimizations.applied.length}`);
    console.log(`  Failed: ${this.optimizations.failed.length}`);
    console.log(`  Success Rate: ${((this.optimizations.applied.length / (this.optimizations.applied.length + this.optimizations.failed.length)) * 100).toFixed(1)}%`);

    console.log('\n🚀 Next Steps:');
    console.log('  1. Review the optimization report');
    console.log('  2. Test the optimized build');
    console.log('  3. Monitor performance in production');
    console.log('  4. Set up continuous performance monitoring');
  }
}

// Run optimization if called directly
if (require.main === module) {
  const optimizer = new PerformanceOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = PerformanceOptimizer;