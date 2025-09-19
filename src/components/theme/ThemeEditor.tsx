import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import { ThemeConfig } from '../../theme';

interface ThemeEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (theme: Partial<ThemeConfig>) => void;
  className?: string;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  isOpen = false,
  onClose,
  onSave,
  // className = '', // Commented out - unused
}) => {
  const { theme, setCustomTheme, exportTheme, importTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'animation'>('colors');
  const [customColors, setCustomColors] = useState(theme.colors);
  const [customTypography, setCustomTypography] = useState(theme.typography);
  const [customSpacing, setCustomSpacing] = useState(theme.spacing);
  const [customAnimation, setCustomAnimation] = useState(theme.animation);

  useEffect(() => {
    setCustomColors(theme.colors);
    setCustomTypography(theme.typography);
    setCustomSpacing(theme.spacing);
    setCustomAnimation(theme.animation);
  }, [theme]);

  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors(prev => ({ ...prev, [key]: value }));
  };

  const handleTypographyChange = (key: keyof typeof customTypography, value: any) => {
    setCustomTypography(prev => ({ ...prev, [key]: value }));
  };

  const handleSpacingChange = (key: keyof typeof customSpacing, value: any) => {
    setCustomSpacing(prev => ({ ...prev, [key]: value }));
  };

  const handleAnimationChange = (key: keyof typeof customAnimation, value: any) => {
    setCustomAnimation(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const customTheme: Partial<ThemeConfig> = {
      colors: customColors,
      typography: customTypography,
      spacing: customSpacing,
      animation: customAnimation,
    };
    setCustomTheme(customTheme);
    onSave?.(customTheme);
    onClose?.();
  };

  const handleReset = () => {
    setCustomColors(theme.colors);
    setCustomTypography(theme.typography);
    setCustomSpacing(theme.spacing);
    setCustomAnimation(theme.animation);
  };

  const handleExport = () => {
    const themeData = exportTheme();
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importTheme(content)) {
          alert('主题导入成功！');
        } else {
          alert('主题导入失败，请检查文件格式。');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderColorEditor = () => (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>颜色设置</Text>
      
      {Object.entries(customColors).map(([key, value]) => (
        <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Text style={{ minWidth: 120, fontSize: 14 }}>
            {key === 'primary' ? '主色' :
             key === 'secondary' ? '次要色' :
             key === 'success' ? '成功色' :
             key === 'warning' ? '警告色' :
             key === 'error' ? '错误色' :
             key === 'info' ? '信息色' :
             key === 'text' ? '文本色' :
             key === 'textSecondary' ? '次要文本' :
             key === 'background' ? '背景色' :
             key === 'border' ? '边框色' : key}
          </Text>
          <input
            type="color"
            value={value}
            onChange={(e) => handleColorChange(key as keyof typeof customColors, e.target.value)}
            style={{ width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer' }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handleColorChange(key as keyof typeof customColors, e.target.value)}
            style={{ 
              flex: 1, 
              padding: '6px 8px', 
              border: `1px solid ${theme.colors.border}`, 
              borderRadius: 4,
              fontSize: 14,
            }}
          />
        </View>
      ))}
    </View>
  );

  const renderTypographyEditor = () => (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>字体设置</Text>
      
      <View>
        <Text style={{ fontSize: 14, marginBottom: 4 }}>字体大小 (px)</Text>
        {Object.entries(customTypography.fontSize).map(([key, value]) => (
          <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Text style={{ minWidth: 80, fontSize: 14 }}>{key}</Text>
            <input
              type="number"
              value={value}
              onChange={(e) => handleTypographyChange('fontSize', {
                ...customTypography.fontSize,
                [key]: parseInt(e.target.value) || value,
              })}
              style={{ 
                width: 80, 
                padding: '4px 8px', 
                border: `1px solid ${theme.colors.border}`, 
                borderRadius: 4,
                fontSize: 14,
              }}
            />
          </View>
        ))}
      </View>
      
      <View>
        <Text style={{ fontSize: 14, marginBottom: 4 }}>字体粗细</Text>
        {Object.entries(customTypography.fontWeight).map(([key, value]) => (
          <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Text style={{ minWidth: 80, fontSize: 14 }}>{key}</Text>
            <input
              type="number"
              value={value}
              onChange={(e) => handleTypographyChange('fontWeight', {
                ...customTypography.fontWeight,
                [key]: parseInt(e.target.value) || value,
              })}
              style={{ 
                width: 80, 
                padding: '4px 8px', 
                border: `1px solid ${theme.colors.border}`, 
                borderRadius: 4,
                fontSize: 14,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderSpacingEditor = () => (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>间距设置</Text>
      
      <View>
        <Text style={{ fontSize: 14, marginBottom: 4 }}>基础间距 (px)</Text>
        {Object.entries(customSpacing).map(([key, value]) => {
          if (key === 'breakpoints') return null;
          return (
            <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Text style={{ minWidth: 80, fontSize: 14 }}>{key}</Text>
              <input
                type="number"
                value={value}
                onChange={(e) => handleSpacingChange(key as keyof typeof customSpacing, parseInt(e.target.value) || value)}
                style={{ 
                  width: 80, 
                  padding: '4px 8px', 
                  border: `1px solid ${theme.colors.border}`, 
                  borderRadius: 4,
                  fontSize: 14,
                }}
              />
            </View>
          );
        })}
      </View>
      
      <View>
        <Text style={{ fontSize: 14, marginBottom: 4 }}>响应式断点 (px)</Text>
        {Object.entries(customSpacing.breakpoints).map(([key, value]) => (
          <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Text style={{ minWidth: 80, fontSize: 14 }}>{key}</Text>
            <input
              type="number"
              value={value}
              onChange={(e) => handleSpacingChange('breakpoints', {
                ...customSpacing.breakpoints,
                [key]: parseInt(e.target.value) || value,
              })}
              style={{ 
                width: 80, 
                padding: '4px 8px', 
                border: `1px solid ${theme.colors.border}`, 
                borderRadius: 4,
                fontSize: 14,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderAnimationEditor = () => (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>动画设置</Text>
      
      <View>
        <Text style={{ fontSize: 14, marginBottom: 4 }}>动画时长</Text>
        {Object.entries(customAnimation.duration).map(([key, value]) => (
          <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Text style={{ minWidth: 80, fontSize: 14 }}>{key}</Text>
            <input
              type="text"
              value={value}
              onChange={(e) => handleAnimationChange('duration', {
                ...customAnimation.duration,
                [key]: e.target.value,
              })}
              style={{ 
                width: 80, 
                padding: '4px 8px', 
                border: `1px solid ${theme.colors.border}`, 
                borderRadius: 4,
                fontSize: 14,
              }}
            />
          </View>
        ))}
      </View>
      
      <View>
        <Text style={{ fontSize: 14, marginBottom: 4 }}>缓动函数</Text>
        {Object.entries(customAnimation.easing).map(([key, value]) => (
          <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Text style={{ minWidth: 80, fontSize: 14 }}>{key}</Text>
            <select
              value={value}
              onChange={(e) => handleAnimationChange('easing', {
                ...customAnimation.easing,
                [key]: e.target.value,
              })}
              style={{ 
                width: 120, 
                padding: '4px 8px', 
                border: `1px solid ${theme.colors.border}`, 
                borderRadius: 4,
                fontSize: 14,
              }}
            >
              <option value="linear">linear</option>
              <option value="ease">ease</option>
              <option value="ease-in">ease-in</option>
              <option value="ease-out">ease-out</option>
              <option value="ease-in-out">ease-in-out</option>
            </select>
          </View>
        ))}
      </View>
    </View>
  );

  if (!isOpen) return null;

  return (
    <View style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <View style={{
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        padding: 24,
        maxWidth: 600,
        width: '90%',
        maxHeight: '80vh',
        boxShadow: theme.shadow.xl,
      }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text }}>
            主题编辑器
          </Text>
          <Button onClick={onClose} style={{ fontSize: 24, cursor: 'pointer' }}>
            ✕
          </Button>
        </View>

        <View style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { key: 'colors', label: '颜色' },
            { key: 'typography', label: '字体' },
            { key: 'spacing', label: '间距' },
            { key: 'animation', label: '动画' },
          ].map(tab => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '8px 16px',
                borderRadius: theme.borderRadius.md,
                backgroundColor: activeTab === tab.key ? theme.colors.primary : 'transparent',
                color: activeTab === tab.key ? theme.colors.textInverse : theme.colors.text,
                border: activeTab === tab.key ? 'none' : `1px solid ${theme.colors.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </Button>
          ))}
        </View>

        <ScrollView style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {activeTab === 'colors' && renderColorEditor()}
          {activeTab === 'typography' && renderTypographyEditor()}
          {activeTab === 'spacing' && renderSpacingEditor()}
          {activeTab === 'animation' && renderAnimationEditor()}
        </ScrollView>

        <View style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <Button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: theme.colors.primary,
              color: theme.colors.textInverse,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            保存主题
          </Button>
          
          <Button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: theme.colors.secondary,
              color: theme.colors.textInverse,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            重置
          </Button>
          
          <Button
            onClick={handleExport}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: theme.colors.success,
              color: theme.colors.textInverse,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            导出
          </Button>
          
          <label style={{
            flex: 1,
            padding: '10px 16px',
            backgroundColor: theme.colors.info,
            color: theme.colors.textInverse,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'center',
            display: 'block',
          }}>
            导入
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </View>
      </View>
    </View>
  );
};

export default ThemeEditor;