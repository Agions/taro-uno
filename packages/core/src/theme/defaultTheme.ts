import { Theme } from './theme';

export const defaultTheme: Theme = {
  // 品牌色
  primaryColor: '#5C6BC0',
  // 成功色
  successColor: '#4CAF50',
  // 警告色
  warningColor: '#FF9800',
  // 错误色
  errorColor: '#F44336',
  // 普通色
  infoColor: '#2196F3',
  
  // 字体颜色
  textPrimaryColor: '#333333',
  textSecondaryColor: '#666666',
  textDisabledColor: '#999999',
  
  // 背景色
  backgroundColor: '#F5F5F5',
  cardBackgroundColor: '#FFFFFF',
  
  // 边框颜色
  borderColor: '#E0E0E0',
  
  // 圆角
  borderRadius: 4,
  borderRadiusSmall: 2,
  borderRadiusLarge: 8,
  
  // 边距
  spacing: 16,
  spacingSmall: 8,
  spacingLarge: 24,
  
  // 字体大小
  fontSizeSmall: 12,
  fontSizeMedium: 14,
  fontSizeLarge: 16,
  
  // 线高
  lineHeightSmall: 1.3,
  lineHeightMedium: 1.5,
  lineHeightLarge: 1.7,
  
  // 默认不指定明暗模式，将根据系统自动设置
  dark: undefined
};

// 暗色主题
export const darkTheme: Theme = {
  ...defaultTheme,
  
  // 品牌色 (略微调亮)
  primaryColor: '#7986CB',
  // 成功色
  successColor: '#66BB6A',
  // 警告色
  warningColor: '#FFA726',
  // 错误色
  errorColor: '#EF5350',
  // 普通色
  infoColor: '#42A5F5',
  
  // 字体颜色
  textPrimaryColor: '#FFFFFF',
  textSecondaryColor: '#CCCCCC',
  textDisabledColor: '#888888',
  
  // 背景色
  backgroundColor: '#121212',
  cardBackgroundColor: '#1E1E1E',
  
  // 边框颜色
  borderColor: '#333333',
  
  // 明确指定为暗色模式
  dark: true
}; 