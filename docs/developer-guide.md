# Taro-Uno UI 开发者指南

欢迎开发者！本指南将帮助你快速了解 Taro-Uno UI 的开发流程和最佳实践。

## 🚀 快速开始

### 环境准备

```bash
# 克隆项目
git clone https://github.com/agions/taro-uno.git
cd taro-uno

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 运行测试
pnpm test

# 构建项目
pnpm build
```

### 项目结构

```
taro-uno/
├── src/                          # 源代码
│   ├── components/               # 组件库
│   │   ├── basic/               # 基础组件
│   │   ├── form/                # 表单组件
│   │   ├── layout/              # 布局组件
│   │   ├── navigation/          # 导航组件
│   │   ├── display/             # 展示组件
│   │   ├── feedback/            # 反馈组件
│   │   └── performance/         # 性能组件
│   ├── hooks/                   # 自定义 Hooks
│   ├── utils/                   # 工具函数
│   ├── theme/                   # 主题系统
│   ├── types/                   # 类型定义
│   └── styles/                  # 全局样式
├── tests/                       # 测试文件
├── docs/                        # 文档
├── config/                      # 配置文件
├── scripts/                     # 构建脚本
└── examples/                    # 示例项目
```

## 🎯 开发工作流

### 1. 创建新组件

```bash
# 创建组件目录
mkdir src/components/YourComponent

# 创建组件文件
touch src/components/YourComponent/index.tsx
touch src/components/YourComponent/YourComponent.types.ts
touch src/components/YourComponent/YourComponent.styles.ts
touch src/components/YourComponent/YourComponent.test.tsx
```

### 2. 组件开发模板

```tsx
// src/components/YourComponent/index.tsx
import React, { forwardRef } from 'react';
import { View } from '@tarojs/components';
import type { YourComponentProps } from './YourComponent.types';
import { yourComponentStyles } from './YourComponent.styles';

export const YourComponent = forwardRef<any, YourComponentProps>((props, ref) => {
  const {
    children,
    className = '',
    style = {},
    ...rest
  } = props;

  return (
    <View
      ref={ref}
      className={`taro-uno-your-component ${className}`}
      style={{ ...yourComponentStyles.base, ...style }}
      {...rest}
    >
      {children}
    </View>
  );
});

YourComponent.displayName = 'YourComponent';
```

### 3. 类型定义

```typescript
// src/components/YourComponent/YourComponent.types.ts
export interface YourComponentProps {
  /** 组件内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void;
}

export type YourComponentRef = HTMLViewElement;
```

### 4. 样式定义

```typescript
// src/components/YourComponent/YourComponent.styles.ts
import { CSSProperties } from 'react';

export const yourComponentStyles: Record<string, CSSProperties> = {
  base: {
    display: 'block',
    width: '100%',
  },
  // 其他样式变体
};
```

### 5. 测试编写

```tsx
// src/components/YourComponent/YourComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { YourComponent } from './index';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent>Test</YourComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<YourComponent onClick={handleClick}>Click me</YourComponent>);

    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🧪 测试指南

### 测试命令

```bash
# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test YourComponent.test.tsx

# 生成测试覆盖率报告
pnpm test:coverage

# 监听模式运行测试
pnpm test:watch

# 运行测试 UI 模式
pnpm test:ui
```

### 测试最佳实践

1. **单元测试**：测试组件的渲染和交互
2. **集成测试**：测试组件间的协作
3. **E2E测试**：测试完整用户流程
4. **覆盖率要求**：≥80% 的代码覆盖率

## 📚 文档编写

### 组件文档模板

```markdown
# ComponentName 组件名称

组件的简要描述。

## 基础用法

```tsx
import { ComponentName } from '@taro-uno/ui'

function Example() {
  return <ComponentName />
}
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| prop1 | string | - | 属性1说明 |
| prop2 | number | 0 | 属性2说明 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| method1 | () => void | - | 方法1说明 |

## 样式定制

### CSS 变量

```css
:root {
  --component-var-1: value;
  --component-var-2: value;
}
```

## 最佳实践

1. 使用建议1
2. 使用建议2
3. 使用建议3

## 注意事项

1. 注意事项1
2. 注意事项2
```

## 🎨 主题系统

### 使用主题变量

```tsx
import { useTheme } from '@taro-uno/ui';

const MyComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#ffffff' : '#1f1f1f'
    }}>
      当前主题: {theme}
    </div>
  );
};
```

### 自定义主题

```scss
// 自定义主题变量
:root {
  --primary-color: #1890ff;
  --secondary-color: #52c41a;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
}
```

## 🔧 构建和发布

### 开发构建

```bash
# 开发模式
pnpm dev

# 库模式构建
pnpm build:lib

# 优化构建
pnpm build:optimized
```

### 发布流程

1. 更新版本号
2. 更新 CHANGELOG.md
3. 运行测试
4. 构建项目
5. 发布到 npm

```bash
# 更新版本
npm version patch/minor/major

# 发布
npm publish
```

## 🐛 调试指南

### 开发工具

- **React Developer Tools**：组件调试
- **Taro Developer Tools**：小程序调试
- **Chrome DevTools**：H5 调试

### 常见问题

1. **样式不生效**：检查 CSS 导入和优先级
2. **类型错误**：检查 TypeScript 配置
3. **构建失败**：检查依赖和配置

## 🤝 贡献指南

### 代码提交规范

```bash
# feat: 新功能
# fix: 修复bug
# docs: 文档更新
# style: 代码格式化
# refactor: 重构
# test: 测试相关
# chore: 构建或辅助工具的变动
```

### Pull Request 流程

1. Fork 项目
2. 创建功能分支
3. 开发和测试
4. 提交代码
5. 创建 PR
6. 代码审查
7. 合并代码

## 📞 获取帮助

- **GitHub Issues**：[https://github.com/agions/taro-uno/issues](https://github.com/agions/taro-uno/issues)
- **文档网站**：[https://taro-uno.com](https://taro-uno.com)
- **社区讨论**：[https://github.com/agions/taro-uno/discussions](https://github.com/agions/taro-uno/discussions)

---

祝你开发愉快！🎉