#!/usr/bin/env node

/**
 * Tooltip 组件重构验证脚本
 * 验证重构后的 Tooltip 组件是否满足要求
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// 验证结果
const results = {
  domOperations: [],
  typeScriptIssues: [],
  platformCompatibility: [],
  codeStructure: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0
  }
};

// 验证函数
function verifyDOMOperations() {
  console.log('🔍 验证 DOM 操作问题...');
  
  const tooltipPath = path.join(__dirname, 'src/components/feedback/Tooltip/Tooltip.tsx');
  const content = fs.readFileSync(tooltipPath, 'utf8');
  
  // 检查是否包含 DOM API
  const domAPIs = [
    'document.querySelector',
    'document.getElementById',
    'document.addEventListener',
    'document.removeEventListener',
    'window.addEventListener',
    'window.removeEventListener'
  ];
  
  let hasDOMIssues = false;
  domAPIs.forEach(api => {
    if (content.includes(api)) {
      results.domOperations.push(`❌ 发现 DOM API 使用: ${api}`);
      hasDOMIssues = true;
    }
  });
  
  if (!hasDOMIssues) {
    results.domOperations.push('✅ 未发现 DOM API 使用');
    results.summary.passed++;
  } else {
    results.summary.failed++;
  }
  
  results.summary.total++;
}

function verifyTypeScriptTypes() {
  console.log('🔍 验证 TypeScript 类型问题...');
  
  const typePath = path.join(__dirname, 'src/components/feedback/Tooltip/Tooltip.types.ts');
  const content = fs.readFileSync(typePath, 'utf8');
  
  // 检查是否包含正确的类型导入
  const hasITouchEventImport = content.includes('ITouchEvent');
  const hasProperTooltipTypes = content.includes('TooltipEventHandler');
  
  if (hasITouchEventImport && hasProperTooltipTypes) {
    results.typeScriptIssues.push('✅ 类型定义正确，包含 ITouchEvent 和 TooltipEventHandler');
    results.summary.passed++;
  } else {
    results.typeScriptIssues.push('❌ 类型定义不完整');
    results.summary.failed++;
  }
  
  results.summary.total++;
}

function verifyPlatformCompatibility() {
  console.log('🔍 验证平台兼容性...');
  
  const tooltipPath = path.join(__dirname, 'src/components/feedback/Tooltip/Tooltip.tsx');
  const content = fs.readFileSync(tooltipPath, 'utf8');
  
  // 检查是否使用 Taro 组件
  const usesTaroComponents = content.includes('@tarojs/components');
  
  // 检查是否使用 Taro 事件
  const usesTaroEvents = content.includes('ITouchEvent');
  
  if (usesTaroComponents && usesTaroEvents) {
    results.platformCompatibility.push('✅ 使用 Taro 组件和事件系统');
    results.summary.passed++;
  } else {
    results.platformCompatibility.push('❌ 未正确使用 Taro 组件或事件');
    results.summary.failed++;
  }
  
  results.summary.total++;
}

function verifyCodeStructure() {
  console.log('🔍 验证代码结构...');
  
  const tooltipPath = path.join(__dirname, 'src/components/feedback/Tooltip/Tooltip.tsx');
  const content = fs.readFileSync(tooltipPath, 'utf8');
  
  // 检查是否使用了 React hooks
  const hasReactHooks = content.includes('useCallback');
  const hasProperRef = content.includes('useImperativeHandle');
  const hasProperState = content.includes('useState');
  
  if (hasReactHooks && hasProperRef && hasProperState) {
    results.codeStructure.push('✅ 代码结构良好，使用 React hooks');
    results.summary.passed++;
  } else {
    results.codeStructure.push('❌ 代码结构需要改进');
    results.summary.failed++;
  }
  
  results.summary.total++;
}

// 生成报告
function generateReport() {
  console.log('\n📊 Tooltip 组件重构验证报告');
  console.log('=====================================');
  
  console.log('\n🚫 DOM 操作问题:');
  results.domOperations.forEach(issue => console.log(`  ${issue}`));
  
  console.log('\n🔧 TypeScript 类型问题:');
  results.typeScriptIssues.forEach(issue => console.log(`  ${issue}`));
  
  console.log('\n📱 平台兼容性问题:');
  results.platformCompatibility.forEach(issue => console.log(`  ${issue}`));
  
  console.log('\n🏗️ 代码结构问题:');
  results.codeStructure.forEach(issue => console.log(`  ${issue}`));
  
  console.log('\n📈 总结:');
  console.log(`  总检查项: ${results.summary.total}`);
  console.log(`  通过: ${results.summary.passed}`);
  console.log(`  失败: ${results.summary.failed}`);
  console.log(`  成功率: ${((results.summary.passed / results.summary.total) * 100).toFixed(1)}%`);
  
  if (results.summary.failed === 0) {
    console.log('\n🎉 所有检查都通过了！Tooltip 组件重构成功！');
  } else {
    console.log('\n⚠️  仍有问题需要解决，请查看上述报告。');
  }
}

// 执行验证
function runVerification() {
  console.log('🚀 开始验证 Tooltip 组件重构...');
  console.log('=====================================');
  
  verifyDOMOperations();
  verifyTypeScriptTypes();
  verifyPlatformCompatibility();
  verifyCodeStructure();
  
  generateReport();
}

// 运行验证
runVerification();