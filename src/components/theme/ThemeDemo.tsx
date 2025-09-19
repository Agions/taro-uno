import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeEditor from './ThemeEditor';

const ThemeDemo: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [showEditor, setShowEditor] = useState(false);

  const demoComponents = [
    {
      title: '按钮样式',
      component: (
        <View style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button style={{
            padding: '12px 24px',
            backgroundColor: theme.colors.primary,
            color: theme.colors.textInverse,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            主要按钮
          </Button>
          
          <Button style={{
            padding: '12px 24px',
            backgroundColor: theme.colors.secondary,
            color: theme.colors.textInverse,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            次要按钮
          </Button>
          
          <Button style={{
            padding: '12px 24px',
            backgroundColor: theme.colors.success,
            color: theme.colors.textInverse,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            成功按钮
          </Button>
          
          <Button style={{
            padding: '12px 24px',
            backgroundColor: theme.colors.warning,
            color: theme.colors.textInverse,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            警告按钮
          </Button>
          
          <Button style={{
            padding: '12px 24px',
            backgroundColor: theme.colors.error,
            color: theme.colors.textInverse,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            错误按钮
          </Button>
        </View>
      ),
    },
    {
      title: '颜色展示',
      component: (
        <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
          {Object.entries(theme.colors).map(([key, value]) => (
            <View key={key} style={{ textAlign: 'center' }}>
              <View style={{
                width: '100%',
                height: 60,
                backgroundColor: value,
                borderRadius: theme.borderRadius.md,
                marginBottom: 8,
                border: `1px solid ${theme.colors.border}`,
              }} />
              <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {key}
              </Text>
              <Text style={{ fontSize: 10, color: theme.colors.textDisabled }}>
                {value}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: '字体样式',
      component: (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(theme.typography.fontSize).map(([key, size]) => (
            <Text key={key} style={{
              fontSize: `${size}px`,
              color: theme.colors.text,
              lineHeight: theme.typography.lineHeight.normal,
            }}>
              {key} - {size}px 字体大小示例文本
            </Text>
          ))}
          
          <View style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <Text style={{
              fontWeight: theme.typography.fontWeight.light,
              color: theme.colors.text,
            }}>
              Light (300)
            </Text>
            <Text style={{
              fontWeight: theme.typography.fontWeight.normal,
              color: theme.colors.text,
            }}>
              Normal (400)
            </Text>
            <Text style={{
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text,
            }}>
              Medium (500)
            </Text>
            <Text style={{
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text,
            }}>
              Semibold (600)
            </Text>
            <Text style={{
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
            }}>
              Bold (700)
            </Text>
          </View>
        </View>
      ),
    },
    {
      title: '间距展示',
      component: (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(theme.spacing).map(([key, value]) => {
            if (key === 'breakpoints') return null;
            return (
              <View key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <View style={{
                  width: `${value}px`,
                  height: `${value}px`,
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.borderRadius.sm,
                }} />
                <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {key}: {value}px
                </Text>
              </View>
            );
          })}
        </View>
      ),
    },
    {
      title: '圆角展示',
      component: (
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {Object.entries(theme.borderRadius).map(([key, radius]) => (
            <View key={key} style={{ textAlign: 'center' }}>
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: theme.colors.primary,
                borderRadius: key === 'circle' ? `${radius}%` : `${radius}px`,
                marginBottom: 8,
              }} />
              <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {key}: {radius}{key === 'circle' ? '%' : 'px'}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: '阴影展示',
      component: (
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {Object.entries(theme.shadow).map(([key, shadow]) => (
            <View key={key} style={{ textAlign: 'center' }}>
              <View style={{
                width: 80,
                height: 80,
                backgroundColor: theme.colors.backgroundCard,
                boxShadow: shadow,
                borderRadius: theme.borderRadius.md,
                marginBottom: 8,
              }} />
              <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {key}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: '动画展示',
      component: (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <View style={{ display: 'flex', gap: 16 }}>
            <Button style={{
              padding: '12px 24px',
              backgroundColor: theme.colors.primary,
              color: theme.colors.textInverse,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: `all ${theme.animation.duration.fast} ${theme.animation.easing.ease}`,
            }}>
              快速动画
            </Button>
            
            <Button style={{
              padding: '12px 24px',
              backgroundColor: theme.colors.secondary,
              color: theme.colors.textInverse,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: `all ${theme.animation.duration.normal} ${theme.animation.easing.ease}`,
            }}>
              正常动画
            </Button>
            
            <Button style={{
              padding: '12px 24px',
              backgroundColor: theme.colors.success,
              color: theme.colors.textInverse,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: `all ${theme.animation.duration.slow} ${theme.animation.easing.ease}`,
            }}>
              慢速动画
            </Button>
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      minHeight: '100vh',
      padding: 24,
    }}>
      <View style={{
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: theme.borderRadius.lg,
        padding: 24,
        boxShadow: theme.shadow.lg,
        marginBottom: 24,
      }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <View>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
              Taro-Uno UI 主题系统演示
            </Text>
            <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>
              当前主题: {isDark ? '深色模式' : '浅色模式'}
            </Text>
          </View>
          
          <View style={{ display: 'flex', gap: 12 }}>
            <ThemeSwitcher />
            <Button
              onClick={() => setShowEditor(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: theme.colors.info,
                color: theme.colors.textInverse,
                borderRadius: theme.borderRadius.md,
                border: 'none',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              编辑主题
            </Button>
          </View>
        </View>

        <ScrollView style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          {demoComponents.map((demo, index) => (
            <View key={index} style={{
              backgroundColor: theme.colors.background,
              borderRadius: theme.borderRadius.md,
              padding: 24,
              marginBottom: 16,
              border: `1px solid ${theme.colors.border}`,
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 }}>
                {demo.title}
              </Text>
              {demo.component}
            </View>
          ))}
        </ScrollView>
      </View>

      <ThemeEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        onSave={(customTheme) => {
          console.log('主题已保存:', customTheme);
        }}
      />
    </View>
  );
};

export default ThemeDemo;