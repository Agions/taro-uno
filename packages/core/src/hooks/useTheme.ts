import { useState, useEffect, useContext, createContext } from 'react';
import { getSystemInfo } from '@tarojs/taro';
import { defaultTheme, Theme } from '../theme';

// 创建主题上下文
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {}
});

// 主题提供者属性
export interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

// 主题提供者组件
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  theme = defaultTheme, 
  children 
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    setCurrentTheme({
      ...currentTheme,
      ...newTheme
    });
  };

  // 提供主题上下文
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的钩子函数
export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    // 检测系统主题模式（亮/暗）
    try {
      getSystemInfo().then(res => {
        const isDarkMode = res.theme === 'dark';
        
        // 如果当前主题没有设置dark属性，则根据系统主题自动设置
        if (theme.dark === undefined) {
          setTheme({
            ...theme,
            dark: isDarkMode
          });
        }
      }).catch(() => {
        // 忽略错误
      });
    } catch (error) {
      // 某些环境下可能不支持此API，忽略错误
    }
  }, []);

  return { theme, setTheme };
}; 