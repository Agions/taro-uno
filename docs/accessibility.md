# 无障碍访问指南

Taro-Uno UI 致力于为所有用户提供无障碍的用户体验。本指南介绍了组件库的无障碍特性和最佳实践。

## 🌟 新增功能

### 智能无障碍标签生成
我们实现了智能标签生成器，自动为组件生成合适的无障碍标签：

```tsx
import { Button } from '@taro-uno/ui';

// 自动生成标签
<Button loading={true} disabled={false}>
  保存
</Button>
// 自动生成 aria-label="保存，加载中"

<Button loading={true} disabled={true}>
  保存
</Button>
// 自动生成 aria-label="保存，加载中，已禁用"
```

### 无障碍状态管理
内置无障碍状态管理器，实时跟踪组件状态变化：

```tsx
import { AccessibilityStateManager } from '@taro-uno/ui';

// 状态管理
const stateManager = AccessibilityStateManager.getInstance();
stateManager.setComponentState('button-1', {
  disabled: false,
  busy: true,
  expanded: false
});
```

### WCAG 2.1 AA 合规验证
内置 WCAG 验证器，确保组件符合无障碍标准：

```tsx
import { WCAGValidator } from '@taro-uno/ui';

// 验证颜色对比度
const contrastResult = WCAGValidator.validateColorContrast(
  '#1890ff',
  '#ffffff',
  4.5
);

// 验证标签完整性
const labelResult = WCAGValidator.validateLabelCompleteness(
  '提交表单',
  'button'
);
```

### 无障碍事件处理
提供完整的键盘导航和屏幕阅读器支持：

```tsx
import { AccessibilityEventHandler } from '@taro-uno/ui';

// 键盘导航处理
AccessibilityEventHandler.handleKeyboardNavigation(event, {
  onEnter: () => handleSubmit(),
  onSpace: () => handleSubmit(),
  onEscape: () => handleCancel(),
  onArrowDown: () => moveNext(),
  onArrowUp: () => movePrevious()
});

// 屏幕阅读器公告
AccessibilityEventHandler.announceToScreenReader(
  '操作成功完成',
  'polite'
);
```

## 🌐 无障碍标准

我们遵循 **WCAG 2.1 (Web Content Accessibility Guidelines)** 标准，确保组件在不同平台上的可访问性。

### 支持等级
- **A级**: 基础无障碍支持
- **AA级**: 主要无障碍标准 (目标)
- **AAA级**: 增强无障碍支持

## 🎯 核心原则

### 1. 感知性 (Perceivable)
确保用户可以通过感官获取信息

#### ✅ 最佳实践
```tsx
import { Button } from '@taro-uno/ui';

// 提供明确的标签
<Button
  aria-label="关闭对话框"
  onClick={handleClose}
>
  ×
</Button>

// 确保足够的对比度
<Button
  style={{
    backgroundColor: '#1890ff',
    color: '#ffffff'
  }}
>
  高对比度按钮
</Button>
```

### 2. 可操作性 (Operable)
确保所有用户都可以操作界面

#### ✅ 键盘导航
```tsx
import { useState } from 'react';
import { Button } from '@taro-uno/ui';

const KeyboardNavigation = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        setFocusedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        setFocusedIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        handleSelect(items[focusedIndex]);
        break;
    }
  };

  return (
    <div
      role="listbox"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          role="option"
          aria-selected={index === focusedIndex}
          tabIndex={index === focusedIndex ? 0 : -1}
          style={{
            backgroundColor: index === focusedIndex ? '#f0f0f0' : 'transparent'
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
```

### 3. 可理解性 (Understandable)
确保信息清晰易懂

#### ✅ 语义化标签
```tsx
import { Form, Input, Label } from '@taro-uno/ui';

const AccessibleForm = () => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        <Label htmlFor="username">用户名 *</Label>
        <Input
          id="username"
          name="username"
          aria-required="true"
          aria-describedby="username-error"
          placeholder="请输入用户名"
        />
        <div id="username-error" className="error-message">
          用户名不能为空
        </div>
      </Form.Item>
    </Form>
  );
};
```

### 4. 鲁棒性 (Robust)
确保兼容不同的辅助技术

## 📱 组件无障碍特性

### Button 组件
```tsx
// ✅ 无障碍按钮
<Button
  aria-label="保存更改"
  aria-disabled={disabled}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }}
>
  保存
</Button>
```

### Form 组件
```tsx
// ✅ 无障碍表单
<Form
  role="form"
  aria-label="用户注册表单"
  onSubmit={handleSubmit}
>
  <Form.Item>
    <Label htmlFor="email" id="email-label">
      邮箱地址
    </Label>
    <Input
      id="email"
      name="email"
      aria-labelledby="email-label"
      aria-required="true"
      aria-invalid={emailError ? 'true' : 'false'}
      aria-describedby={emailError ? 'email-error' : undefined}
    />
    {emailError && (
      <div id="email-error" role="alert">
        {emailError}
      </div>
    )}
  </Form.Item>
</Form>
```

### Modal 组件
```tsx
// ✅ 无障碍模态框
<Modal
  open={isOpen}
  onClose={handleClose}
  aria-modal="true"
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">确认删除</h2>
  <p id="modal-description">
    您确定要删除这个项目吗？此操作无法撤销。
  </p>
  <Button onClick={handleClose}>取消</Button>
  <Button
    onClick={handleConfirm}
    aria-label="确认删除项目"
  >
    删除
  </Button>
</Modal>
```

## 🔧 开发最佳实践

### 1. 使用语义化 HTML
```tsx
// ✅ 推荐：使用语义化标签
import { View, Text } from '@tarojs/components';

const SemanticComponent = () => {
  return (
    <View role="article" aria-labelledby="article-title">
      <Text id="article-title" role="heading" aria-level={2}>
        文章标题
      </Text>
      <Text role="paragraph">
        文章内容...
      </Text>
    </View>
  );
};
```

### 2. 提供替代文本
```tsx
// ✅ 为图标提供替代文本
import { Icon } from '@taro-uno/ui';

<Icon
  name="close"
  aria-label="关闭"
  role="img"
/>

// ✅ 为图片提供替代文本
<Image
  src="/images/logo.png"
  alt="公司 logo"
/>
```

### 3. 状态管理
```tsx
// ✅ 明确的状态管理
import { useState } from 'react';
import { Button } from '@taro-uno/ui';

const LoadingButton = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={handleClick}
      aria-busy={loading}
      aria-live="polite"
    >
      {loading ? '处理中...' : '点击我'}
    </Button>
  );
};
```

### 4. 错误处理
```tsx
// ✅ 清晰的错误提示
import { Form, Input, Text } from '@taro-uno/ui';

const ErrorHandling = () => {
  const [error, setError] = useState('');

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
        onChange={(e) => {
          if (e.target.value.length < 3) {
            setError('至少需要 3 个字符');
          } else {
            setError('');
          }
        }}
      />
      {error && (
        <Text
          id="error-message"
          role="alert"
          style={{ color: 'red' }}
        >
          {error}
        </Text>
      )}
    </Form>
  );
};
```

## 🧪 测试无障碍性

### 1. 自动化测试
```bash
# 安装无障碍测试工具
npm install --save-dev axe-core jest-axe

# 运行无障碍测试
npm test:accessibility
```

### 2. 内置测试工具
我们提供了完整的无障碍测试工具库：

```tsx
import { AccessibilityTestUtils } from '@taro-uno/ui/tests/utils/accessibility-test-utils';

// 运行完整的无障碍测试
const result = await AccessibilityTestUtils.runAccessibilityTest(container, {
  enableAxeCore: true,
  enableManualChecks: true,
  wcagLevel: 'AA',
  rules: {
    colorContrast: true,
    imageAlt: true,
    formLabel: true,
    linkPurpose: true,
    langAttribute: true,
    documentTitle: true,
    focusOrder: true,
    keyboardNav: true,
  }
});

// 测试特定元素
const elementResult = AccessibilityTestUtils.testElementAccessibility(
  buttonElement,
  'button',
  '提交表单'
);

// 验证表单无障碍性
const formResult = AccessibilityTestUtils.validateFormAccessibility(formElement);

// 验证表格无障碍性
const tableResult = AccessibilityTestUtils.validateTableAccessibility(tableElement);

// 模拟键盘导航
const keyboardResult = await AccessibilityTestUtils.simulateKeyboardNavigation(container);
```

### 3. 自定义 Jest 匹配器
```tsx
// 使用自定义匹配器
expect(buttonElement).toBeAccessible();
expect(container).toHaveNoViolations();

// 便捷测试函数
import { testA11yWithAxe, testElementA11y, testFormA11y, testTableA11y } from '@taro-uno/ui/tests/utils/accessibility-test-utils';

// axe-core 测试
const axeResults = await testA11yWithAxe(container);

// 元素测试
const elementTest = testElementA11y(() => screen.getByRole('button'), 'button', 'Click me');

// 表单测试
const formTest = testFormA11y(() => screen.getByRole('form'));

// 表格测试
const tableTest = testTableA11y(() => screen.getByRole('table'));
```

### 2. 手动测试清单

#### 键盘导航
- [ ] 所有可交互元素都可以通过键盘访问
- [ ] Tab 键顺序符合逻辑
- [ ] 可以通过 Enter/Space 键激活按钮
- [ ] 箭头键可以正确导航菜单

#### 屏幕阅读器
- [ ] 所有表单元素都有对应的标签
- [ ] 图片和图标都有替代文本
- [ ] 状态变化会通过 ARIA live region 通知
- [ ] 错误信息清晰明确

#### 视觉辅助
- [ ] 文本和背景有足够的对比度
- [ ] 可以通过键盘获得焦点指示器
- [ ] 响应式设计在不同设备上都能正常使用
- [ ] 字体大小可以调整

## 🎨 颜色和对比度

### 推荐的对比度标准
- **普通文本**: 4.5:1
- **大文本**: 3:1
- **非文本元素**: 3:1

### 颜色组合示例
```css
/* ✅ 高对比度组合 */
:root {
  --primary-color: #1890ff;
  --text-color: #262626;
  --background-color: #ffffff;

  /* 确保足够的对比度 */
  --button-text: #ffffff;
  --disabled-text: rgba(0, 0, 0, 0.25);
}
```

## 📱 移动端无障碍

### 1. 触摸目标大小
```css
/* ✅ 足够大的触摸目标 */
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
}
```

### 2. 手势支持
```tsx
// ✅ 支持多种手势
const GestureComponent = () => {
  const handleSwipe = (direction) => {
    console.log('Swipe direction:', direction);
  };

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="可滑动区域"
    >
      滑动内容
    </View>
  );
};
```

## 🔍 工具和资源

### 检查工具
- **axe DevTools**: 浏览器扩展，自动化无障碍检查
- **WAVE**: Web 无障碍评估工具
- **Lighthouse**: Google 的性能和无障碍检查工具
- **Screen Reader**:
  - Windows: NVDA, JAWS
  - Mac: VoiceOver
  - iOS: VoiceOver
  - Android: TalkBack

### 学习资源
- [WCAG 2.1 官方文档](https://www.w3.org/TR/WCAG21/)
- [MDN 无障碍开发指南](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM 无障碍检查清单](https://webaim.org/standards/wcag/checklist/)

## 📝 无障碍检查清单

### 开发阶段
- [ ] 使用语义化 HTML 标签
- [ ] 为所有交互元素提供键盘访问
- [ ] 添加适当的 ARIA 属性
- [ ] 确保颜色对比度符合标准
- [ ] 为图片和图标提供替代文本

### 测试阶段
- [ ] 键盘导航测试
- [ ] 屏幕阅读器测试
- [ ] 颜色对比度检查
- [ ] 响应式设计测试
- [ ] 性能测试

### 发布前检查
- [ ] 自动化无障碍测试
- [ ] 人工无障碍测试
- [ ] 用户测试
- [ ] 文档更新

---

## 🤝 贡献

如果您发现无障碍问题或有改进建议，请：

1. 检查现有的 GitHub Issues
2. 创建新的 Issue，详细描述问题
3. 提交 Pull Request 修复问题

我们致力于让 Taro-Uno UI 对所有用户都更加友好！

---

*最后更新：${new Date().toLocaleDateString('zh-CN')}*