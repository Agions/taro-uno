# 贡献指南

感谢您对 Taro Uno UI 项目的关注！本文档将指导您如何参与项目贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [分支管理](#分支管理)
- [问题反馈](#问题反馈)
- [Pull Request 流程](#pull-request-流程)
- [发布流程](#发布流程)

## 🤝 行为准则

请阅读并遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 🚀 如何贡献

### 1. 发现问题

- 检查 [Issues](https://github.com/taro-uno/ui/issues) 列表
- 确认问题是否已被报告
- 如果没有，请创建新的 Issue

### 2. 修复问题

- Fork 项目仓库
- 创建功能分支
- 编写代码和测试
- 提交 Pull Request

### 3. 添加新功能

- 先在 Issues 中讨论功能需求
- 等待维护者确认
- 按照约定开发功能

## 🛠️ 开发环境设置

### 环境要求

- Node.js >= 16.14.0
- pnpm >= 7.0.0

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/taro-uno/ui.git
cd taro-uno

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 运行测试
pnpm test

# 5. 构建项目
pnpm build
```

## 📝 代码规范

### TypeScript 规范

- 使用 TypeScript 严格模式
- 为所有函数、变量、组件添加类型注解
- 使用接口定义对象类型
- 避免使用 `any` 类型

### 组件规范

```typescript
// ✅ 好的示例
interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### 样式规范

- 使用 SCSS 预处理器
- 采用 BEM 命名规范
- 使用 CSS 变量定义主题
- 避免使用 `!important`

```scss
// ✅ 好的示例
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);

  &--primary {
    background-color: var(--primary-color);
    color: white;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__icon {
    margin-right: 8px;
  }
}
```

### 测试规范

- 使用 Vitest + Testing Library
- 为每个组件编写单元测试
- 测试覆盖率要求 >= 80%
- 包含正常情况和边界情况

```typescript
// ✅ 好的示例
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

## 💬 提交规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建工具或依赖管理
- `ci`: CI/CD 相关
- `build`: 构建相关
- `revert`: 回滚

### 示例

```bash
# ✅ 好的提交信息
git commit -m "feat(button): add loading state"
git commit -m "fix(input): fix validation error handling"
git commit -m "docs(readme): update installation guide"
git commit -m "test(button): add unit tests for disabled state"

# ❌ 不好的提交信息
git commit -m "update button"
git commit -m "fix bug"
git commit -m "wip"
```

## 🌿 分支管理

### 分支策略

- `main`: 主分支，始终保持可发布状态
- `develop`: 开发分支，包含最新开发功能
- `feature/*`: 功能分支，用于开发新功能
- `hotfix/*`: 紧急修复分支，用于修复生产环境问题
- `release/*`: 发布分支，用于版本发布准备

### 分支命名

```
feature/add-button-component
feature/upgrade-to-react-18
hotfix/fix-critical-bug
release/v1.0.0
```

## 🐛 问题反馈

### 创建 Issue

创建 Issue 时请提供以下信息：

1. **问题描述**: 清晰描述遇到的问题
2. **复现步骤**: 详细的问题复现步骤
3. **期望结果**: 期望的正常行为
4. **实际结果**: 实际发生的问题
5. **环境信息**: 操作系统、浏览器版本、Node.js 版本等
6. **代码示例**: 最小化的复现代码

### Issue 模板

```markdown
## 问题描述
简要描述遇到的问题

## 复现步骤
1. 第一步
2. 第二步
3. 第三步

## 期望结果
描述期望的正常行为

## 实际结果
描述实际发生的问题

## 环境信息
- 操作系统: [例如 macOS 12.0]
- 浏览器: [例如 Chrome 96.0]
- Node.js: [例如 16.14.0]
- Taro 版本: [例如 3.6.0]

## 代码示例
```tsx
// 提供最小化的复现代码
```

```

## 🔄 Pull Request 流程

### PR 流程

1. **Fork 项目**
   ```bash
   # Fork 项目到个人仓库
   git clone https://github.com/your-username/ui.git
   cd ui
   ```

2. **创建分支**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发代码**
   - 遵循代码规范
   - 编写测试用例
   - 更新文档

4. **提交代码**

   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

5. **推送分支**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 PR**
   - 在 GitHub 上创建 Pull Request
   - 填写 PR 模板
   - 等待代码审查

### PR 模板

```markdown
## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 重构
- [ ] 性能优化
- [ ] 测试
- [ ] 其他

## 变更描述
描述本次变更的内容和目的

## 相关 Issue
关联相关的 Issue 号码
Closes #123

## 测试清单
- [ ] 功能测试通过
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 文档更新完成

## 额外说明
其他需要说明的内容
```

### PR 审查标准

- **代码质量**: 代码清晰、可读、符合规范
- **测试覆盖**: 新功能有对应的测试用例
- **文档完整**: API 文档和使用示例完整
- **性能影响**: 不会引入明显的性能问题
- **兼容性**: 保持向后兼容性

## 📦 发布流程

### 版本号规则

遵循 [语义化版本](https://semver.org/)：

- `主版本号.次版本号.修订号`
- `1.0.0` -> `1.1.0` -> `1.1.1` -> `2.0.0`

### 发布步骤

1. **更新版本号**

   ```bash
   # 使用 Changesets 管理版本
   pnpm changeset
   ```

2. **生成更新日志**

   ```bash
   pnpm changeset version
   ```

3. **构建项目**

   ```bash
   pnpm build
   ```

4. **运行测试**

   ```bash
   pnpm test
   ```

5. **发布到 npm**

   ```bash
   pnpm changeset publish
   ```

6. **创建 GitHub Release**
   - 在 GitHub 上创建 Release
   - 添加发布说明
   - 关联相关 Issues

## 🎯 贡献者指南

### 新手贡献

1. 从简单的 Issues 开始
2. 阅读项目文档
3. 了解项目架构
4. 参与社区讨论

### 进阶贡献

1. 参与架构设计
2. 审查代码
3. 指导新手
4. 改进开发流程

### 核心贡献

1. 制定技术规范
2. 决定技术选型
3. 管理项目方向
4. 维护社区生态

## 📞 联系我们

- **GitHub Issues**: [提交问题](https://github.com/taro-uno/ui/issues)
- **邮箱**: <dev@taro-uno.com>
- **微信群**: 扫描二维码加入

---

感谢您的贡献！🎉
