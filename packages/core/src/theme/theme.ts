export interface Theme {
  // 品牌色
  primaryColor: string;
  // 成功色
  successColor: string;
  // 警告色
  warningColor: string;
  // 错误色
  errorColor: string;
  // 普通色
  infoColor: string;
  
  // 字体颜色
  textPrimaryColor: string;
  textSecondaryColor: string;
  textDisabledColor: string;
  
  // 背景色
  backgroundColor: string;
  cardBackgroundColor: string;
  
  // 边框颜色
  borderColor: string;
  
  // 圆角
  borderRadius: number;
  borderRadiusSmall: number;
  borderRadiusLarge: number;
  
  // 边距
  spacing: number;
  spacingSmall: number;
  spacingLarge: number;
  
  // 字体大小
  fontSizeSmall: number;
  fontSizeMedium: number;
  fontSizeLarge: number;
  
  // 线高
  lineHeightSmall: number;
  lineHeightMedium: number;
  lineHeightLarge: number;
  
  // 是否暗色模式
  dark?: boolean;
} 