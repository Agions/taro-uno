# 贡献指南

欢迎为 Taro UI 组件库贡献代码！我们非常感谢您的参与。

## 📋 贡献方式

### 1. 报告问题

如果您发现了bug或有功能建议，请通过以下方式报告：

- 在 GitHub Issues 中创建新问题
- 使用问题模板提供详细信息
- 搜索现有问题避免重复

### 2. 提交代码

我们欢迎以下类型的贡献：

- 🐛 Bug 修复
- ✨ 新功能开发
- 📚 文档改进
- 🎨 UI/UX 优化
- 🚀 性能优化
- 🧪 测试覆盖

## 🛠️ 开发环境设置

### 前置要求

- Node.js >= 14.0.0
- pnpm >= 7.0.0
- Git

### 克隆仓库

```bash
git clone https://github.com/your-username/taro-uno.git
cd taro-uno
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

### 运行测试

```bash
pnpm run test
```

### 构建项目

```bash
pnpm run build
```

## 📝 代码规范

### TypeScript 规范

```typescript
// ✅ 推荐
interface ButtonProps {
  type: 'primary' | 'secondary' | 'danger'
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
}

// ❌ 避免
interface buttonProps {
  Type: string
  Size: string
}
```

### 组件命名规范

```typescript
// ✅ 推荐：使用 PascalCase
const Button = () => {}
const LoadingSpinner = () => {}

// ❌ 避免：使用 camelCase
const button = () => {}
const loadingSpinner = () => {}
```

### 文件命名规范

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx          # 组件实现
│   │   ├── Button.types.ts     # 类型定义
│   │   ├── Button.styles.ts     # 样式文件
│   │   ├── Button.test.tsx     # 测试文件
│   │   └── index.ts              # 导出文件
```

### 样式规范

```scss
// ✅ 推荐：使用 CSS 变量
.button {
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: var(--radius-md);
}

// ❌ 避免：硬编码值
.button {
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 4px;
}
```

## 🧪 测试规范

### 测试文件结构

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 测试覆盖率要求

- 组件测试覆盖率 ≥ 80%
- 工具函数测试覆盖率 ≥ 90%
- 关键业务逻辑测试覆盖率 ≥ 95%

## 📚 文档规范

### 组件文档要求

每个组件必须包含：

1. **基础用法** - 简单的使用示例
2. **API 参考** - 完整的 props 说明
3. **代码示例** - 实际可用的代码
4. **最佳实践** - 推荐的使用方式
5. **注意事项** - 需要注意的问题

### 文档格式

```markdown
# ComponentName 组件名称

组件的简要描述。

## 基础用法

```tsx
import { ComponentName } from 'taro-uno'

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
```

## 🔄 工作流程

### 1. Fork 仓库

```bash
# 1. Fork 本仓库到您的 GitHub 账户
# 2. 克隆您的 fork
git clone https://github.com/your-username/taro-uno.git
cd taro-uno
```

### 2. 创建功能分支

```bash
# 创建新分支
git checkout -b feature/your-feature-name

# 或者修复分支
git checkout -b fix/your-fix-name
```

### 3. 开发和测试

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 运行测试
pnpm run test

# 代码检查
pnpm run lint
```

### 4. 提交更改

```bash
# 添加更改
git add .

# 提交更改
git commit -m "feat: 添加新功能"

# 推送到您的 fork
git push origin feature/your-feature-name
```

### 5. 创建 Pull Request

1. 在 GitHub 上创建 Pull Request
2. 填写 PR 模板
3. 等待代码审查
4. 根据反馈进行修改

## 📋 PR 模板

### 功能描述

简要描述您的更改内容：

- 🎯 **目标**：这个 PR 解决什么问题？
- 🛠️ **方法**：您是如何解决的？
- 📊 **结果**：带来了什么改进？

### 更改类型

- [ ] 🐛 Bug 修复
- [ ] ✨ 新功能
- [ ] 📚 文档改进
- [ ] 🎨 UI/UX 优化
- [ ] 🚀 性能优化
- [ ] 🧪 测试覆盖
- [ ] 🔄 重构

### 测试清单

- [ ] 功能测试通过
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 文档更新完成

### 相关问题

Closes #123
Related to #456

## 🎯 代码审查标准

### 必要条件

- [ ] 所有测试通过
- [ ] 代码符合项目规范
- [ ] 文档完整准确
- [ ] 没有 TypeScript 错误
- [ ] 没有 ESLint 错误

### 推荐标准

- [ ] 组件具有良好的可访问性
- [ ] 代码具有适当的注释
- [ ] 提供了足够的测试覆盖
- [ ] 遵循了最佳实践

## 🏷️ 发布流程

### 版本号规则

我们使用语义化版本号：

- `MAJOR.MINOR.PATCH`
- `1.0.0` - 主版本号（不兼容的 API 修改）
- `1.1.0` - 次版本号（向下兼容的功能性新增）
- `1.1.1` - 修订号（向下兼容的问题修正）

### 发布步骤

1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 发布到 npm
5. 更新文档

## 🤝 社区指南

### 行为准则

- 尊重所有贡献者
- 提供建设性的反馈
- 保持专业和友善
- 关注技术讨论

### 沟通渠道

- GitHub Issues - 技术问题和功能请求
- GitHub Discussions - 一般讨论和问答
- Email - 私人问题联系

## 📚 学习资源

### 官方文档

- [React 文档](https://react.dev/)
- [Taro 文档](https://taro.jd.com/)
- [TypeScript 文档](https://www.typescriptlang.org/)

### 相关工具

- [ESLint](https://eslint.org/) - 代码检查
- [Prettier](https://prettier.io/) - 代码格式化
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [Commitlint](https://commitlint.js.org/) - 提交信息规范

## 🎉 致谢

感谢所有为 Taro UI 组件库做出贡献的开发者！

### 主要贡献者

- [@contributor1](https://github.com/contributor1)
- [@contributor2](https://github.com/contributor2)
- [@contributor3](https://github.com/contributor3)

### 特别感谢

- Taro 团队提供的优秀框架
- React 团队的前端技术支持
- 社区所有参与者的宝贵反馈

---

**再次感谢您的贡献！🎉**