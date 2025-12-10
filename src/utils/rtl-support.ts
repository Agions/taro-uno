/**
 * RTL语言支持工具
 * 提供RTL检测、样式切换和布局调整功能
 */

import { useEffect, useState } from 'react';
type SupportedLanguage = 'ar-SA' | 'he-IL' | 'fa-IR' | 'ur-PK' | string;

// RTL语言列表
export const RTL_LANGUAGES: SupportedLanguage[] = [
  'ar-SA', // 阿拉伯语
  'he-IL', // 希伯来语
  'fa-IR', // 波斯语
  'ur-PK', // 乌尔都语
  'yi', // 意第绪语
  'ps', // 普什图语
  'sd', // 信德语
];

// 扩展RTL语言配置
export interface RTLConfig {
  language: SupportedLanguage;
  name: string;
  rtl: boolean;
  fontFamily: string;
  textAlign: 'right' | 'left';
  direction: 'rtl' | 'ltr';
  // RTL特定的布局调整
  flipProperties: boolean;
  flipIcons: boolean;
  adjustSpacing: boolean;
  adjustAlignment: boolean;
}

// RTL语言配置
export const RTL_CONFIGS: Record<string, RTLConfig> = {
  'ar-SA': {
    language: 'ar-SA',
    name: 'Arabic (Saudi Arabia)',
    rtl: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Tahoma", "Arial Unicode MS", "Traditional Arabic"',
    textAlign: 'right',
    direction: 'rtl',
    flipProperties: true,
    flipIcons: true,
    adjustSpacing: true,
    adjustAlignment: true,
  },
  'he-IL': {
    language: 'he-IL',
    name: 'Hebrew (Israel)',
    rtl: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "David", "Arial Hebrew", "Arial"',
    textAlign: 'right',
    direction: 'rtl',
    flipProperties: true,
    flipIcons: true,
    adjustSpacing: true,
    adjustAlignment: true,
  },
  'fa-IR': {
    language: 'fa-IR',
    name: 'Persian (Iran)',
    rtl: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Tahoma", "Arial Unicode MS", "IRANSans", "Vazir"',
    textAlign: 'right',
    direction: 'rtl',
    flipProperties: true,
    flipIcons: true,
    adjustSpacing: true,
    adjustAlignment: true,
  },
  'ur-PK': {
    language: 'ur-PK',
    name: 'Urdu (Pakistan)',
    rtl: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Noto Nastaliq Urdu", "Arial Unicode MS", "Tahoma"',
    textAlign: 'right',
    direction: 'rtl',
    flipProperties: true,
    flipIcons: true,
    adjustSpacing: true,
    adjustAlignment: true,
  },
};

// 检查是否为RTL语言
export const isRTL = (language: string): boolean => {
  return (
    RTL_LANGUAGES.includes(language as SupportedLanguage) ||
    language.startsWith('ar') ||
    language.startsWith('he') ||
    language.startsWith('fa') ||
    language.startsWith('ur')
  );
};

// 应用RTL样式
export const applyRTLStyles = (language: string): void => {
  const isRtl = isRTL(language);
  const config = RTL_CONFIGS[language];

  if (typeof document !== 'undefined') {
    // 设置文档方向
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // 添加或移除RTL类
    if (isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }

    // 应用特定配置
    if (config) {
      // 设置字体
      const style = document.createElement('style');
      style.id = 'rtl-font-style';
      style.textContent = `
        html {
          font-family: ${config.fontFamily};
        }
        .rtl {
          direction: rtl;
          text-align: ${config.textAlign};
        }
        .rtl .flip-icon {
          transform: scaleX(-1);
        }
        .rtl .flip-property {
          ${
            config.flipProperties
              ? `
            margin-left: initial;
            margin-right: initial;
            padding-left: initial;
            padding-right: initial;
            border-left: initial;
            border-right: initial;
            border-radius: initial;
          `
              : ''
          }
        }
      `;

      // 移除旧的样式
      const oldStyle = document.getElementById('rtl-font-style');
      if (oldStyle) {
        oldStyle.remove();
      }

      document.head.appendChild(style);
    }
  }
};

// 获取RTL配置
export const getRTLConfig = (language: string): RTLConfig | null => {
  return RTL_CONFIGS[language] || null;
};

// 生成RTL CSS变量
export const generateRTLVariables = (language: string): string => {
  const config = RTL_CONFIGS[language];
  if (!config) return '';

  return `
    :root {
      --rtl-direction: ${config.direction};
      --rtl-text-align: ${config.textAlign};
      --rtl-font-family: ${config.fontFamily};
      --rtl-flip-properties: ${config.flipProperties ? 'true' : 'false'};
      --rtl-flip-icons: ${config.flipIcons ? 'true' : 'false'};
      --rtl-adjust-spacing: ${config.adjustSpacing ? 'true' : 'false'};
      --rtl-adjust-alignment: ${config.adjustAlignment ? 'true' : 'false'};
    }
  `;
};

// 生成RTL样式类
export const generateRTLClasses = (): string => `
  .rtl {
    direction: rtl;
    text-align: right;
  }

  .rtl .text-left { text-align: right; }
  .rtl .text-right { text-align: left; }

  .rtl .mr-1 { margin-left: 0.25rem; margin-right: 0; }
  .rtl .mr-2 { margin-left: 0.5rem; margin-right: 0; }
  .rtl .mr-3 { margin-left: 0.75rem; margin-right: 0; }
  .rtl .mr-4 { margin-left: 1rem; margin-right: 0; }
  .rtl .mr-5 { margin-left: 1.25rem; margin-right: 0; }

  .rtl .ml-1 { margin-right: 0.25rem; margin-left: 0; }
  .rtl .ml-2 { margin-right: 0.5rem; margin-left: 0; }
  .rtl .ml-3 { margin-right: 0.75rem; margin-left: 0; }
  .rtl .ml-4 { margin-right: 1rem; margin-left: 0; }
  .rtl .ml-5 { margin-right: 1.25rem; margin-left: 0; }

  .rtl .pl-1 { padding-left: 0; padding-right: 0.25rem; }
  .rtl .pl-2 { padding-left: 0; padding-right: 0.5rem; }
  .rtl .pl-3 { padding-left: 0; padding-right: 0.75rem; }
  .rtl .pl-4 { padding-left: 0; padding-right: 1rem; }
  .rtl .pl-5 { padding-left: 0; padding-right: 1.25rem; }

  .rtl .pr-1 { padding-right: 0; padding-left: 0.25rem; }
  .rtl .pr-2 { padding-right: 0; padding-left: 0.5rem; }
  .rtl .pr-3 { padding-right: 0; padding-left: 0.75rem; }
  .rtl .pr-4 { padding-right: 0; padding-left: 1rem; }
  .rtl .pr-5 { padding-right: 0; padding-left: 1.25rem; }

  .rtl .border-l { border-left: none; border-right: 1px solid currentColor; }
  .rtl .border-r { border-right: none; border-left: 1px solid currentColor; }

  .rtl .rounded-l { border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem; }
  .rtl .rounded-r { border-top-right-radius: 0; border-bottom-right-radius: 0; border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem; }

  .rtl .flip-icon {
    transform: scaleX(-1);
  }

  .rtl .flip-property {
    transform: scaleX(-1);
  }

  .rtl .float-left { float: right; }
  .rtl .float-right { float: left; }

  .rtl .left-0 { left: auto; right: 0; }
  .rtl .right-0 { right: auto; left: 0; }

  .rtl .text-start { text-align: right; }
  .rtl .text-end { text-align: left; }
`;

// RTL检测Hook
export const useRTLDetection = (language: string) => {
  const [rtl, setRtl] = useState(false);

  useEffect(() => {
    setRtl(isRTL(language));
    applyRTLStyles(language);
  }, [language]);

  return { isRTL: rtl };
};

// 切换RTL方向
export const toggleRTL = (language: string): string => {
  const isRtl = isRTL(language);
  const newDirection = isRtl ? 'ltr' : 'rtl';

  if (typeof document !== 'undefined') {
    document.documentElement.dir = newDirection;
    document.body.classList.toggle('rtl', !isRtl);
    document.body.classList.toggle('ltr', isRtl);
  }

  return newDirection;
};

// 获取方向相关样式
export const getDirectionalStyles = (language: string) => {
  const isRtl = isRTL(language);

  return {
    direction: isRtl ? 'rtl' : 'ltr',
    textAlign: isRtl ? 'right' : 'left',
    // 样式映射
    marginStart: isRtl ? 'marginRight' : 'marginLeft',
    marginEnd: isRtl ? 'marginLeft' : 'marginRight',
    paddingStart: isRtl ? 'paddingRight' : 'paddingLeft',
    paddingEnd: isRtl ? 'paddingLeft' : 'paddingRight',
    borderStart: isRtl ? 'borderRight' : 'borderLeft',
    borderEnd: isRtl ? 'borderLeft' : 'borderRight',
    borderRadiusStart: isRtl ? 'borderTopRightRadius' : 'borderTopLeftRadius',
    borderRadiusEnd: isRtl ? 'borderTopLeftRadius' : 'borderTopRightRadius',
    floatStart: isRtl ? 'right' : 'left',
    floatEnd: isRtl ? 'left' : 'right',
    positionStart: isRtl ? 'right' : 'left',
    positionEnd: isRtl ? 'left' : 'right',
  };
};

// 获取RTL特定的CSS值
export const getRTLValue = (_property: string, language: string, ltrValue: string, rtlValue?: string) => {
  const isRtl = isRTL(language);
  return isRtl && rtlValue ? rtlValue : ltrValue;
};

// 应用RTL特定的类名
export const applyRTLClasses = (element: HTMLElement, language: string): void => {
  const isRtl = isRTL(language);

  if (isRtl) {
    element.classList.add('rtl');
    element.classList.remove('ltr');
  } else {
    element.classList.add('ltr');
    element.classList.remove('rtl');
  }
};

// 创建RTL友好的CSS
export const createRTLCSS = (css: string, language: string): string => {
  if (!isRTL(language)) {
    return css;
  }

  // 简单的RTL转换规则
  const rtlRules = [
    { pattern: /margin-left:\s*([^;]+);/g, replacement: 'margin-right: $1; margin-left: 0;' },
    { pattern: /margin-right:\s*([^;]+);/g, replacement: 'margin-left: $1; margin-right: 0;' },
    { pattern: /padding-left:\s*([^;]+);/g, replacement: 'padding-right: $1; padding-left: 0;' },
    { pattern: /padding-right:\s*([^;]+);/g, replacement: 'padding-left: $1; padding-right: 0;' },
    { pattern: /border-left:\s*([^;]+);/g, replacement: 'border-right: $1; border-left: none;' },
    { pattern: /border-right:\s*([^;]+);/g, replacement: 'border-left: $1; border-right: none;' },
    { pattern: /text-align:\s*left;/g, replacement: 'text-align: right;' },
    { pattern: /text-align:\s*right;/g, replacement: 'text-align: left;' },
    { pattern: /float:\s*left;/g, replacement: 'float: right;' },
    { pattern: /float:\s*right;/g, replacement: 'float: left;' },
  ];

  let rtlCSS = css;
  rtlRules.forEach((rule) => {
    rtlCSS = rtlCSS.replace(rule.pattern, rule.replacement);
  });

  return rtlCSS;
};

export default {
  isRTL,
  applyRTLStyles,
  getRTLConfig,
  generateRTLVariables,
  generateRTLClasses,
  useRTLDetection,
  toggleRTL,
  getDirectionalStyles,
  getRTLValue,
  applyRTLClasses,
  createRTLCSS,
};
