import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { defaultDesignTokens as designTokens } from '../../theme/design-tokens';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  isDark: boolean;
  colors: typeof designTokens.colors;
  spacing: typeof designTokens.spacing;
  typography: typeof designTokens.typography;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'auto';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'auto' }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(defaultTheme);
  const platform = usePlatform();

  const isDark = theme === 'auto' ? (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false) : theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Helper function to set CSS variables recursively
    const setCssVars = (prefix: string, obj: any, parentKey?: string) => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = parentKey ? `${prefix}-${parentKey}-${key}` : `${prefix}-${key}`;
        
        if (typeof value === 'string' || typeof value === 'number') {
          // Only add px suffix for numeric values that are not typography values
          const valueWithUnit = typeof value === 'number' && prefix !== '--typography' ? `${value}px` : `${value}`;
          root.style.setProperty(fullKey, valueWithUnit);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // Recursively process nested objects
          setCssVars(prefix, value, parentKey ? `${parentKey}-${key}` : key);
        } else if (Array.isArray(value)) {
          // Join array values with comma
          root.style.setProperty(fullKey, value.join(', '));
        }
      });
    };

    // Set CSS vars from design tokens
    setCssVars('--color', designTokens.colors);
    setCssVars('--spacing', designTokens.spacing);
    setCssVars('--typography', designTokens.typography);

    // Dark mode overrides
    if (isDark) {
      root.style.setProperty('--color-text-primary', '#f9fafb');
      root.style.setProperty('--color-text-secondary', '#d1d5db');
      root.style.setProperty('--color-text-tertiary', '#9ca3af');
      root.style.setProperty('--color-text-disabled', '#6b7280');
      root.style.setProperty('--color-text-inverse', '#111827');
      root.style.setProperty('--color-text-placeholder', '#6b7280');
      root.style.setProperty('--color-background-primary', '#111827');
      root.style.setProperty('--color-background-secondary', '#1f2937');
      root.style.setProperty('--color-background-tertiary', '#374151');
      root.style.setProperty('--color-background-card', '#1f2937');
      root.style.setProperty('--color-background-input', '#374151');
      root.style.setProperty('--color-background-mask', 'rgba(0, 0, 0, 0.8)');
      root.style.setProperty('--color-background-hover', '#374151');
      root.style.setProperty('--color-background-active', '#4b5563');
      root.style.setProperty('--color-border-default', '#374151');
      root.style.setProperty('--color-border-light', '#4b5563');
      root.style.setProperty('--color-shadow-default', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--color-shadow-light', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--color-shadow-medium', 'rgba(0, 0, 0, 0.4)');
      root.style.setProperty('--color-shadow-dark', 'rgba(0, 0, 0, 0.5)');
    }

    // Platform specific adjustments
    if (platform === 'rn') {
      // React Native specific theme handling
      console.log('Theme applied for RN');
    }

    return () => {
      root.classList.remove('dark');
      // Reset vars if needed
    };
  }, [theme, isDark, platform]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    colors: designTokens.colors,
    spacing: designTokens.spacing,
    typography: designTokens.typography,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
