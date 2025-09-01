# Textarea 文本域组件

基于 Taro 的多端文本域组件，支持自动调整高度、字符计数、验证等功能。

## 特性

- 🎯 **多端兼容**：支持 H5、微信小程序、支付宝小程序等多端
- 📏 **尺寸多样**：提供小、中、大三种尺寸
- 🎨 **样式丰富**：支持边框、填充、下划线等多种变体
- 🔄 **自动调整**：支持根据内容自动调整高度
- 🔢 **字符计数**：支持实时字符计数和限制
- ✅ **表单验证**：内置完整的表单验证功能
- ♿ **无障碍支持**：完整的 WAI-ARIA 支持
- 🎭 **状态管理**：支持正常、错误、警告、成功等状态

## 快速开始

### 基础用法

```tsx
import { Textarea } from '@/components/form';

function BasicExample() {
  return <Textarea placeholder="请输入内容" />;
}
```

### 受控模式

```tsx
function ControlledExample() {
  const [value, setValue] = useState('');
  
  return (
    <Textarea
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="受控文本域"
    />
  );
}
```

### 自动调整高度

```tsx
function AutoHeightExample() {
  return (
    <Textarea
      autoHeight
      minRows={3}
      maxRows={10}
      placeholder="自动调整高度的文本域"
    />
  );
}
```

### 字符计数

```tsx
function CharacterCountExample() {
  return (
    <Textarea
      maxLength={200}
      showCount
      counterPosition="bottom-right"
      placeholder="带字符计数的文本域"
    />
  );
}
```

### 表单验证

```tsx
function ValidationExample() {
  return (
    <Textarea
      label="描述"
      placeholder="请输入详细描述"
      rules={[
        { required: true, message: '此字段为必填项' },
        { minLength: 10, message: '最少需要10个字符' },
        { maxLength: 500, message: '最多允许500个字符' }
      ]}
      validateTrigger="onBlur"
    />
  );
}
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string | - | 文本域内容（受控模式） |
| defaultValue | string | '' | 默认值（非受控模式） |
| placeholder | string | - | 占位符文本 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 文本域尺寸 |
| variant | 'outlined' \| 'filled' \| 'underlined' | 'outlined' | 文本域变体 |
| status | 'normal' \| 'error' \| 'warning' \| 'success' \| 'disabled' | 'normal' | 文本域状态 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
| clearable | boolean | false | 是否显示清除按钮 |
| clearTrigger | 'always' \| 'focus' \| 'never' | 'focus' | 清除按钮触发时机 |
| maxLength | number | - | 最大字符长度 |
| minLength | number | - | 最小字符长度 |
| rows | number | 3 | 固定行数 |
| minRows | number | 1 | 最小行数（autoHeight 时生效） |
| maxRows | number | 10 | 最大行数（autoHeight 时生效） |
| autoHeight | boolean | false | 是否自动调整高度 |
| autoHeightStrategy | 'content' \| 'rows' \| 'max-rows' | 'content' | 自动调整高度策略 |
| resize | 'none' \| 'both' \| 'horizontal' \| 'vertical' | 'vertical' | 调整大小方式 |
| showCount | boolean | false | 是否显示字符计数 |
| counterPosition | 'top-right' \| 'bottom-right' \| 'top-left' \| 'bottom-left' | 'bottom-right' | 字符计数位置 |
| showWordLimit | boolean | false | 是否显示字数限制 |
| bordered | boolean | true | 是否显示边框 |
| label | ReactNode | - | 标签文本 |
| helperText | ReactNode | - | 辅助文本 |
| errorText | ReactNode | - | 错误文本 |
| prefix | ReactNode | - | 前缀内容 |
| suffix | ReactNode | - | 后缀内容 |
| autoFocus | boolean | false | 是否自动聚焦 |
| rules | TextareaRule[] | - | 验证规则 |
| validateTrigger | 'onChange' \| 'onBlur' \| 'onFocus' \| 'onSubmit' | 'onBlur' | 验证触发时机 |
| immediate | boolean | false | 是否立即验证 |
| validator | (value: string) => boolean \| string \| Promise<boolean \| string> | - | 自定义验证函数 |
| onChange | (value: string, event: ITouchEvent) => void | - | 值变化回调 |
| onFocus | (event: ITouchEvent) => void | - | 聚焦回调 |
| onBlur | (event: ITouchEvent) => void | - | 失焦回调 |
| onInput | (value: string, event: ITouchEvent) => void | - | 输入回调 |
| onClear | (event: ITouchEvent) => void | - | 清除回调 |
| onConfirm | (value: string, event: ITouchEvent) => void | - | 确认回调 |
| onValidate | (result: TextareaValidationResult) => void | - | 验证回调 |
| onHeightChange | (height: number, event: ITouchEvent) => void | - | 高度变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |
| block | boolean | true | 是否块级显示 |

### TextareaRule

```tsx
interface TextareaRule {
  required?: boolean;           // 是否必填
  message?: string;            // 错误消息
  pattern?: RegExp;            // 正则表达式验证
  minLength?: number;          // 最小长度
  maxLength?: number;          // 最大长度
  validator?: (value: string) => boolean | string | Promise<boolean | string>;  // 自定义验证函数
}
```

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getValue | - | string | 获取文本域值 |
| setValue | value: string | void | 设置文本域值 |
| focus | - | void | 聚焦文本域 |
| blur | - | void | 失焦文本域 |
| select | - | void | 选中文本 |
| setSelectionRange | start: number, end: number | void | 设置选中文本范围 |
| getSelectionRange | - | { start: number, end: number } | 获取选中文本范围 |
| setDisabled | disabled: boolean | void | 设置禁用状态 |
| setReadonly | readonly: boolean | void | 设置只读状态 |
| setStatus | status: TextareaStatus | void | 设置文本域状态 |
| getStatus | - | TextareaStatus | 获取文本域状态 |
| validate | - | Promise<TextareaValidationResult> | 验证文本域值 |
| clear | - | void | 清除文本域值 |
| reset | - | void | 重置文本域 |
| adjustHeight | - | void | 调整文本域高度 |
| getHeight | - | number | 获取当前高度 |
| getScrollHeight | - | number | 获取滚动高度 |
| scrollToBottom | - | void | 滚动到底部 |
| scrollToTop | - | void | 滚动到顶部 |
| getValidationResult | - | TextareaValidationResult \| null | 获取验证结果 |

## 主题定制

### CSS 变量

```css
:root {
  --textarea-primary-color: #0ea5e9;
  --textarea-error-color: #ef4444;
  --textarea-warning-color: #f59e0b;
  --textarea-success-color: #22c55e;
  --textarea-text-color: #111827;
  --textarea-text-color-secondary: #6b7280;
  --textarea-text-color-disabled: #9ca3af;
  --textarea-border-color: #e5e7eb;
  --textarea-border-color-focus: #0ea5e9;
  --textarea-background-color: #ffffff;
  --textarea-background-color-disabled: #f9fafb;
  --textarea-background-color-filled: #f9fafb;
  --textarea-shadow-focus: 0 0 0 3px rgba(14, 165, 233, 0.1);
  --textarea-animation-duration: 200ms;
}
```

## 注意事项

1. **多端兼容性**：组件已针对不同平台进行优化，但某些特性可能在特定平台受限
2. **自动调整高度**：在移动端可能存在性能影响，建议设置合理的 maxRows
3. **字符计数**：中文字符按 2 个长度计算，英文字符按 1 个长度计算
4. **表单验证**：异步验证函数需要返回 Promise
5. **无障碍**：确保为组件提供合适的 accessibilityLabel

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持基础文本域功能
- 🔧 支持自动调整高度
- 📊 支持字符计数
- ✅ 支持表单验证
- 🎨 支持多种样式变体