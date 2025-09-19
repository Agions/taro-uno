/**
 * 主题系统演示应用
 */

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import ThemeDemo from '../components/theme/ThemeDemo';
import ThemePerformanceMonitor from '../components/theme/ThemePerformanceMonitor';

const ThemeDemoApp: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeDemo />
      <ThemePerformanceMonitor enabled={true} showMetrics={true} />
    </ThemeProvider>
  );
};

export default ThemeDemoApp;