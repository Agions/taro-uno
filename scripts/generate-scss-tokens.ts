/**
 * 生成 SCSS 设计令牌
 * 从 TypeScript 令牌生成 SCSS 变量文件
 */

import { designTokens, darkDesignTokens } from '../src/theme/tokens/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 生成 SCSS 变量
function generateSCSSVariables(tokens: any, prefix: string = ''): string {
  let scss = '';

  Object.entries(tokens).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      scss += generateSCSSVariables(value, `${prefix}${key}-`);
    } else if (Array.isArray(value)) {
      const variableName = `$${prefix}${key}`;
      scss += `${variableName}: ${value.join(', ')};\n`;
    } else {
      const variableName = `$${prefix}${key}`;
      scss += `${variableName}: ${value};\n`;
    }
  });

  return scss;
}

// 生成主题 SCSS 文件
function generateThemeSCSS() {
  let scss = `/**
 * 设计令牌 SCSS 变量
 * 自动生成，请勿手动修改
 * 生成时间: ${new Date().toISOString()}
 */

// ==================== 颜色令牌 ====================
`;

  scss += generateSCSSVariables(designTokens.colors, 'colors-');

  scss += `
// ==================== 间距令牌 ====================
`;

  scss += generateSCSSVariables(designTokens.spacing, 'spacing-');

  scss += `
// ==================== 字体令牌 ====================
`;

  scss += generateSCSSVariables(designTokens.typography, 'typography-');

  scss += `
// ==================== 效果令牌 ====================
`;

  scss += generateSCSSVariables(designTokens.effects, 'effects-');

  return scss;
}

// 生成暗色主题 SCSS 文件
function generateDarkThemeSCSS() {
  let scss = `/**
 * 暗色主题 SCSS 变量
 * 自动生成，请勿手动修改
 * 生成时间: ${new Date().toISOString()}
 */

[data-theme="dark"] {
`;

  // 只生成颜色相关的变量
  const generateColorVars = (obj: any, prefix: string = 'colors-') => {
    let vars = '';
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        vars += generateColorVars(value, `${prefix}${key}-`);
      } else {
        const variableName = `--${prefix}${key}`;
        vars += `  ${variableName}: ${value};\n`;
      }
    });
    return vars;
  };

  scss += generateColorVars(darkDesignTokens.colors);
  scss += '}\n';

  return scss;
}

// 生成 CSS 变量文件
function generateCSSVariables() {
  let css = `/**
 * 设计令牌 CSS 变量
 * 自动生成，请勿手动修改
 * 生成时间: ${new Date().toISOString()}
 */

:root {
`;

  const generateVars = (obj: any, prefix: string = '') => {
    let vars = '';
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        vars += generateVars(value, `${prefix}${key}-`);
      } else if (Array.isArray(value)) {
        const variableName = `--${prefix}${key}`;
        vars += `  ${variableName}: ${value.join(', ')};\n`;
      } else {
        const variableName = `--${prefix}${key}`;
        vars += `  ${variableName}: ${value};\n`;
      }
    });
    return vars;
  };

  css += generateVars(designTokens);
  css += '}\n\n';
  css += generateDarkThemeSCSS();

  return css;
}

// 主函数
function main() {
  const outputDir = path.join(__dirname, '../src/theme/generated');

  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 生成 SCSS 文件
  const scssContent = generateThemeSCSS();
  fs.writeFileSync(path.join(outputDir, 'tokens.scss'), scssContent);
  console.log('✅ Generated tokens.scss');

  // 生成 CSS 变量文件
  const cssContent = generateCSSVariables();
  fs.writeFileSync(path.join(outputDir, 'tokens.css'), cssContent);
  console.log('✅ Generated tokens.css');

  // 生成暗色主题 SCSS 文件
  const darkScssContent = generateDarkThemeSCSS();
  fs.writeFileSync(path.join(outputDir, 'dark-theme.scss'), darkScssContent);
  console.log('✅ Generated dark-theme.scss');

  console.log('\n🎉 All design token files generated successfully!');
}

// 执行
main();
