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

  const isDark = theme === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS vars from design tokens
    Object.entries(designTokens.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--color-${key}`, value);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([subkey, subvalue]) => {
          root.style.setProperty(`--color-${key}-${subkey}`, subvalue as string);
        });
      }
    });

    Object.entries(designTokens.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, `${value}px`);
    });

    Object.entries(designTokens.typography).forEach(([key, value]) => {
      const fullKey = `--typography-${key}`;
      if (typeof value === 'string') {
        root.style.setProperty(fullKey, value);
      } else if (Array.isArray(value)) {
        root.style.setProperty(fullKey, value.join(', '));
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([subkey, subvalue]) => {
          const subFullKey = `--typography-${key}-${subkey}`;
          if (typeof subvalue === 'string') {
            root.style.setProperty(subFullKey, subvalue);
          } else if (Array.isArray(subvalue)) {
            root.style.setProperty(subFullKey, subvalue.join(', '));
          } else if (typeof subvalue === 'object' && subvalue !== null) {
            Object.entries(subvalue).forEach(([subsubkey, subsubvalue]) => {
              root.style.setProperty(`--typography-${key}-${subkey}-${subsubkey}`, subsubvalue as string);
            });
          }
        });
      }
    });

    // Dark mode overrides
    if (isDark) {
      root.style.setProperty('--colors-text-primary', '#f9fafb');
      root.style.setProperty('--colors-text-secondary', '#d1d5db');
      root.style.setProperty('--colors-text-tertiary', '#9ca3af');
      root.style.setProperty('--colors-text-disabled', '#6b7280');
      root.style.setProperty('--colors-text-inverse', '#111827');
      root.style.setProperty('--colors-text-placeholder', '#6b7280');
      root.style.setProperty('--colors-background-primary', '#111827');
      root.style.setProperty('--colors-background-secondary', '#1f2937');
      root.style.setProperty('--colors-background-tertiary', '#374151');
      root.style.setProperty('--colors-background-card', '#1f2937');
      root.style.setProperty('--colors-background-input', '#374151');
      root.style.setProperty('--colors-background-mask', 'rgba(0, 0, 0, 0.8)');
      root.style.setProperty('--colors-background-hover', '#374151');
      root.style.setProperty('--colors-background-active', '#4b5563');
      root.style.setProperty('--colors-border-default', '#374151');
      root.style.setProperty('--colors-border-light', '#4b5563');
      root.style.setProperty('--colors-shadow-default', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--colors-shadow-light', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--colors-shadow-medium', 'rgba(0, 0, 0, 0.4)');
      root.style.setProperty('--colors-shadow-dark', 'rgba(0, 0, 0, 0.5)');
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
