# Taro UI组件库编码规范

## 目录

1. [文件组织](#文件组织)
2. [命名规范](#命名规范)
3. [组件开发规范](#组件开发规范)
4. [类型定义规范](#类型定义规范)
5. [样式编写规范](#样式编写规范)
6. [注释规范](#注释规范)
7. [代码质量规范](#代码质量规范)
8. [测试规范](#测试规范)

## 文件组织

### 组件目录结构

每个组件应遵循以下目录结构：

```
packages/[包名]/src/[组件名]/
├── index.ts            # 导出入口
├── [组件名].tsx        # 组件实现
├── [组件名].scss       # 组件样式
├── [组件名].config.ts  # 组件配置（如果需要）
└── [组件名].test.tsx   # 组件测试（如果需要）
```

### 模块组织

- 所有公共API通过 `index.ts`文件导出
- 内部实现细节不应直接导出
- 配置文件与实现分离，便于维护和定制

## 命名规范

### 文件命名

- 组件实现文件：使用 `kebab-case`（如 `button.tsx`，`date-picker.tsx`）
- 组件配置文件：使用 `kebab-case`并添加 `.config`后缀（如 `button.config.ts`）
- 样式文件：与组件实现同名，使用 `.scss`后缀（如 `button.scss`）

### 组件命名

- 组件名使用 `PascalCase`（如 `Button`，`DatePicker`）
- 组件属性接口统一命名为 `[组件名]Props`（如 `ButtonProps`）
- 组件配置接口统一命名为 `[组件名]Config`（如 `ButtonConfig`）

### 钩子命名

- 自定义钩子必须以 `use`开头，使用 `camelCase`（如 `useTheme`，`useVisible`）
- 钩子返回值类型命名为 `[钩子名去掉use]Result`（如 `ThemeResult`）

## 组件开发规范

### 组件设计原则

1. **单一职责**：一个组件应只负责一个功能
2. **可组合性**：优先考虑组件的组合而非继承
3. **可配置性**：提供合理的默认值和丰富的配置选项
4. **可访问性**：遵循WAI-ARIA标准，确保组件可访问

### 组件实现要求

1. 使用函数式组件，避免类组件
2. 使用TypeScript定义清晰的类型
3. 使用React Hooks管理状态和副作用
4. 考虑受控与非受控两种使用模式
5. 提供必要的组件实例引用

### 组件属性规范

1. 属性排序按重要性：

   - `id`/`key`等唯一标识
   - `className`/`style`等样式属性
   - 功能性属性
   - 事件处理器
   - 其他属性
2. 每个组件必须支持以下基础属性：

   ```typescript
   {
     className?: string;       // 自定义类名
     style?: CSSProperties;    // 自定义样式
     children?: ReactNode;     // 子元素（如适用）
   }
   ```
3. 事件处理器命名规范：

   - 使用 `on[Event]`形式（如 `onClick`，`onChange`）
   - 回调参数应提供足够上下文信息

## 类型定义规范

1. 所有公共接口必须定义类型
2. 类型定义应放在组件定义之前
3. 使用接口（interface）定义组件属性
4. 使用类型别名（type）定义联合类型和交叉类型
5. 避免使用 `any`类型，优先使用泛型或未知类型（`unknown`）

### 类型定义示例

```typescript
export interface ButtonProps {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  
  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 点击事件回调
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

## 样式编写规范

### 样式架构

1. 使用SCSS编写样式
2. 采用BEM命名规范：`block__element--modifier`
3. 组件样式作用域限定在组件内部，避免全局污染

### CSS变量使用

1. 所有主题相关变量使用CSS变量定义，以 `--taro-`为前缀
2. 组件内部可以定义组件特定的CSS变量，以 `--taro-[组件名]-`为前缀
3. 静态样式尽量使用CSS变量引用，便于主题定制

### 响应式设计

1. 使用相对单位（rem、em）替代固定像素
2. 关键断点设置：
   - 手机：< 768px
   - 平板：768px ~ 1024px
   - 桌面：> 1024px

## 注释规范

### JSDoc注释

1. 每个组件、接口、类型和公共方法必须有JSDoc注释
2. 组件注释应包含描述和用途
3. 属性注释应包含说明、类型和默认值

### 注释示例

```typescript
/**
 * 按钮组件
 * @description 提供各种样式和尺寸的按钮
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  ...rest
}) => {
  // 实现...
}
```

## 代码质量规范

### 性能优化

1. 使用 `React.memo`避免不必要的重渲染
2. 使用 `useMemo`和 `useCallback`缓存计算结果和函数
3. 大型列表使用虚拟滚动技术
4. 避免过度渲染和不必要的状态更新

### 代码简洁性

1. 提取公共逻辑为自定义钩子
2. 复杂组件拆分为更小的子组件
3. 避免过深的组件嵌套（不超过4层）
4. 使用解构赋值简化代码

## 测试规范

### 测试覆盖范围

1. 单元测试：验证组件的独立功能
2. 集成测试：验证组件间的交互
3. 快照测试：确保UI一致性

### 测试实践

1. 每个组件至少应有基本渲染和交互测试
2. 测试应覆盖组件的主要功能路径和边界情况
3. 模拟用户行为而非内部实现细节
4. 使用测试工具如Jest和React Testing Library

### 测试命名

测试命名使用描述性语言，格式为：`should [预期行为] when [条件]`

```typescript
describe('Button', () => {
  it('should render correctly with default props', () => {
    // 测试代码
  });
  
  it('should call onClick handler when clicked', () => {
    // 测试代码
  });
  
  it('should not trigger click events when disabled', () => {
    // 测试代码
  });
});
```

---

> 本规范旨在提供一致的代码风格和质量标准，使团队成员能够高效协作，交付高质量的组件库。
