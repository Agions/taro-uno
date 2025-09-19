import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { View, Text, Button } from '@tarojs/components';

interface ThemeSwitcherProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'toggle' | 'select';
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  size = 'md',
  variant = 'toggle',
  showLabel = true,
  className = '',
  style = {},
}) => {
  const { themeMode, toggleTheme, isDark, theme } = useTheme();

  const sizeStyles = {
    sm: {
      width: 32,
      height: 16,
      ballSize: 12,
      fontSize: 12,
    },
    md: {
      width: 48,
      height: 24,
      ballSize: 18,
      fontSize: 14,
    },
    lg: {
      width: 64,
      height: 32,
      ballSize: 24,
      fontSize: 16,
    },
  };

  const currentSize = sizeStyles[size];

  const toggleStyle: React.CSSProperties = {
    width: currentSize.width,
    height: currentSize.height,
    backgroundColor: isDark ? theme.colors.primary : theme.colors.border,
    borderRadius: currentSize.height / 2,
    position: 'relative',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ...style,
  };

  const ballStyle: React.CSSProperties = {
    width: currentSize.ballSize,
    height: currentSize.ballSize,
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    position: 'absolute',
    top: (currentSize.height - currentSize.ballSize) / 2,
    left: isDark ? currentSize.width - currentSize.ballSize - 2 : 2,
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: currentSize.fontSize,
    color: theme.colors.text,
    marginLeft: 8,
    fontWeight: 500,
  };

  const renderToggle = () => (
    <Button 
      onClick={toggleTheme}
      style={toggleStyle}
      className={`theme-switcher ${className}`}
    >
      <View style={ballStyle} />
    </Button>
  );

  const renderButton = () => (
    <Button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.textInverse,
        padding: '8px 16px',
        borderRadius: theme.borderRadius.md,
        border: 'none',
        cursor: 'pointer',
        fontSize: currentSize.fontSize,
        fontWeight: 500,
        transition: 'all 0.3s ease',
        ...style,
      }}
      className={`theme-switcher-button ${className}`}
    >
      {isDark ? '☀️ 明亮' : '🌙 深色'}
    </Button>
  );

  const renderSelect = () => (
    <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <select
        value={themeMode}
        onChange={(e) => {
          const { setThemeMode } = useTheme();
          setThemeMode(e.target.value as 'light' | 'dark' | 'auto');
        }}
        style={{
          padding: '6px 12px',
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border}`,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontSize: currentSize.fontSize,
          cursor: 'pointer',
          ...style,
        }}
        className={`theme-switcher-select ${className}`}
      >
        <option value="light">🌞 明亮</option>
        <option value="dark">🌙 深色</option>
        <option value="auto">🔄 自动</option>
      </select>
    </View>
  );

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      {variant === 'toggle' && renderToggle()}
      {variant === 'button' && renderButton()}
      {variant === 'select' && renderSelect()}
      
      {showLabel && variant === 'toggle' && (
        <Text style={labelStyle}>
          {isDark ? '深色模式' : '浅色模式'}
        </Text>
      )}
    </View>
  );
};

export default ThemeSwitcher;