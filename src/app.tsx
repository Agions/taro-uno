import React from 'react';
import { View, Text } from '@tarojs/components';
import { AppProvider, useAppContext } from './providers';
import { Button } from './components/basic/Button';
import './app.scss';
import './styles/reset.scss';
import './styles/base.scss';

const AppShell: React.FC = () => {
  const { platform, theme, isReady } = useAppContext();

  const handleToggleTheme = () => {
    theme.toggleTheme();
  };

  if (!isReady) {
    return (
      <View className="app app--loading">
        <Text>初始化中...</Text>
      </View>
    );
  }

  return (
    <View className="app">
      <Text className="app__greeting">欢迎使用 Taro Uno UI</Text>
      <Text className="app__platform">当前运行环境: {platform.name}</Text>

      <View className="app__actions">
        <Button type="primary" onClick={handleToggleTheme}>
          {theme.isDark ? '切换至浅色主题' : '切换至暗色主题'}
        </Button>
      </View>
    </View>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
);

export default App;
