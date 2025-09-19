// ThemeProvider types and exports (no JSX)
import type { ThemeConfig, ThemeMode } from './types';
import type { ReactNode } from 'react';

export interface ThemeContextType {
  theme: ThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  setCustomTheme: (theme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (themeData: string) => boolean;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeConfig;
  defaultMode?: ThemeMode;
  persistKey?: string;
}

// Type declarations for ThemeProvider and useTheme
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextType;