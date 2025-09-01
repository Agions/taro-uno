# Switch 开关组件

开关组件用于在两个状态之间进行切换，通常用于设置、配置等场景。

## 基础用法

### 基本开关

```tsx
import { Switch } from '@/components/form';

export default function BasicSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="基本开关"
    />
  );
}
```

### 带标签的开关

```tsx
import { Switch } from '@/components/form';

export default function LabeledSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      showLabel={true}
      checkedLabel="开启"
      uncheckedLabel="关闭"
      accessibilityLabel="带标签的开关"
    />
  );
}
```

## 尺寸变体

### 不同尺寸

```tsx
import { Switch } from '@/components/form';

export default function SizeSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <Switch
        size="sm"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="小尺寸开关"
      />
      <Switch
        size="md"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="中尺寸开关"
      />
      <Switch
        size="lg"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="大尺寸开关"
      />
    </View>
  );
}
```

## 颜色变体

### 不同颜色

```tsx
import { Switch } from '@/components/form';

export default function ColorSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <Switch
        color="primary"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="主要颜色开关"
      />
      <Switch
        color="success"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="成功颜色开关"
      />
      <Switch
        color="warning"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="警告颜色开关"
      />
      <Switch
        color="error"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="错误颜色开关"
      />
    </View>
  );
}
```

## 状态变体

### 不同状态

```tsx
import { Switch } from '@/components/form';

export default function StatusSwitch() {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <View style={{ gap: 16 }}>
      <Switch
        checked={true}
        accessibilityLabel="选中状态开关"
      />
      <Switch
        checked={false}
        accessibilityLabel="未选中状态开关"
      />
      <Switch
        disabled={true}
        accessibilityLabel="禁用状态开关"
      />
      <Switch
        loading={loading}
        onClick={handleLoading}
        accessibilityLabel="加载状态开关"
      />
    </View>
  );
}
```

## 验证功能

### 表单验证

```tsx
import { Switch } from '@/components/form';

export default function ValidationSwitch() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');

  const validateSwitch = (value: boolean) => {
    if (!value) {
      setError('请同意服务条款');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <View>
      <Switch
        checked={checked}
        onChange={(value) => {
          setChecked(value);
          validateSwitch(value);
        }}
        rules={[{ required: true, message: '请同意服务条款' }]}
        errorText={error}
        accessibilityLabel="带验证的开关"
      />
    </View>
  );
}
```

### 自定义验证

```tsx
import { Switch } from '@/components/form';

export default function CustomValidationSwitch() {
  const [checked, setChecked] = useState(false);

  const customValidator = (value: boolean) => {
    if (!value) {
      return '必须接受条款才能继续';
    }
    return true;
  };

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      validator={customValidator}
      validateTrigger="onChange"
      accessibilityLabel="自定义验证开关"
    />
  );
}
```

## 高级用法

### 带图标的开关

```tsx
import { Switch } from '@/components/form';
import { Icon } from '@/components/basic';

export default function IconSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      checkedIcon={<Icon name="check" size={12} />}
      uncheckedIcon={<Icon name="close" size={12} />}
      accessibilityLabel="带图标的开关"
    />
  );
}
```

### 加载状态

```tsx
import { Switch } from '@/components/form';

export default function LoadingSwitch() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (value: boolean) => {
    setLoading(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    setChecked(value);
    setLoading(false);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      loading={loading}
      loadingText="保存中..."
      showLoadingMask={true}
      accessibilityLabel="加载状态开关"
    />
  );
}
```

### 受控模式

```tsx
import { Switch } from '@/components/form';

export default function ControlledSwitch() {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <View>
      <Switch
        checked={checked}
        onChange={setChecked}
        disabled={disabled}
        accessibilityLabel="受控开关"
      />
      <Button
        onClick={() => setDisabled(!disabled)}
        style={{ marginTop: 16 }}
      >
        {disabled ? '启用开关' : '禁用开关'}
      </Button>
    </View>
  );
}
```

## API 文档

### Switch Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | `boolean` | - | 开关值（受控模式） |
| defaultValue | `boolean` | `false` | 默认值（非受控模式） |
| size | `SwitchSize` | `'md'` | 开关尺寸 |
| variant | `SwitchVariant` | `'solid'` | 开关变体 |
| color | `SwitchColor` | `'primary'` | 开关颜色 |
| shape | `SwitchShape` | `'rounded'` | 开关形状 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| loading | `boolean` | `false` | 是否加载中 |
| loadingType | `SwitchLoadingType` | `'spinner'` | 加载类型 |
| loadingText | `string` | - | 加载文本 |
| autoFocus | `boolean` | `false` | 是否自动聚焦 |
| bordered | `boolean` | `true` | 是否显示边框 |
| showLabel | `boolean` | `false` | 是否显示标签 |
| checkedLabel | `string` | `'开'` | 选中标签文本 |
| uncheckedLabel | `string` | `'关'` | 未选中标签文本 |
| checkedIcon | `ReactNode` | - | 选中图标 |
| uncheckedIcon | `ReactNode` | - | 未选中图标 |
| helperText | `string` | - | 辅助文本 |
| errorText | `string` | - | 错误文本 |
| showLoadingMask | `boolean` | `true` | 是否显示加载遮罩 |
| rules | `SwitchRule[]` | `[]` | 验证规则 |
| validateTrigger | `'onChange' \| 'onBlur' \| 'onFocus'` | `'onChange'` | 验证触发时机 |
| immediate | `boolean` | `false` | 是否立即验证 |
| validator | `(value: boolean) => boolean \| string \| Promise<boolean \| string>` | - | 自定义验证函数 |
| onChange | `(checked: boolean, event: ITouchEvent) => void` | - | 值变化回调 |
| onFocus | `(event: ITouchEvent) => void` | - | 聚焦回调 |
| onBlur | `(event: ITouchEvent) => void` | - | 失焦回调 |
| onClick | `(checked: boolean, event: ITouchEvent) => void` | - | 点击回调 |
| onLoadingChange | `(loading: boolean) => void` | - | 加载状态变化回调 |
| onValidate | `(result: SwitchValidationResult) => void` | - | 验证回调 |
| className | `string` | - | 自定义样式类名 |
| style | `CSSProperties` | - | 自定义样式 |
| block | `boolean` | `false` | 是否块级显示 |
| accessible | `boolean` | `true` | 无障碍支持 |
| accessibilityLabel | `string` | - | 无障碍标签 |
| accessibilityRole | `string` | `'switch'` | 无障碍角色 |

### SwitchRef

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getValue | `()` | `boolean` | 获取开关值 |
| setValue | `(value: boolean)` | `void` | 设置开关值 |
| toggle | `()` | `void` | 切换开关值 |
| focus | `()` | `void` | 聚焦开关 |
| blur | `()` | `void` | 失焦开关 |
| setDisabled | `(disabled: boolean)` | `void` | 设置禁用状态 |
| setReadonly | `(readonly: boolean)` | `void` | 设置只读状态 |
| setLoading | `(loading: boolean)` | `void` | 设置加载状态 |
| setStatus | `(status: SwitchStatus)` | `void` | 设置状态 |
| getStatus | `()` | `SwitchStatus` | 获取状态 |
| validate | `()` | `Promise<SwitchValidationResult>` | 验证开关值 |
| reset | `()` | `void` | 重置开关 |
| getValidationResult | `()` | `SwitchValidationResult \| null` | 获取验证结果 |

### 类型定义

```typescript
type SwitchSize = 'sm' | 'md' | 'lg';
type SwitchVariant = 'solid' | 'outline' | 'ghost';
type SwitchStatus = 'normal' | 'checked' | 'unchecked' | 'disabled' | 'loading';
type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default';
type SwitchShape = 'rounded' | 'square';
type SwitchLoadingType = 'spinner' | 'dots' | 'pulse';

interface SwitchRule {
  required?: boolean;
  message?: string;
  validator?: (value: boolean) => boolean | string;
}

interface SwitchValidationResult {
  valid: boolean;
  message?: string;
  value: boolean;
}
```

## 注意事项

1. **无障碍支持**：确保为每个开关组件提供合适的 `accessibilityLabel`
2. **状态管理**：在受控模式下，必须提供 `value` 和 `onChange` 属性
3. **异步操作**：在异步操作期间，建议设置 `loading` 状态以提供用户反馈
4. **表单验证**：使用 `rules` 和 `validator` 属性实现表单验证功能
5. **性能优化**：避免在渲染函数中创建新的函数，使用 `useCallback` 优化回调函数

## 最佳实践

### 表单集成

```tsx
import { Form, Switch, Button } from '@/components/form';

export default function FormExample() {
  const formRef = useRef<any>();

  const handleSubmit = async () => {
    try {
      const values = await formRef.current.submit();
      console.log('表单提交:', values);
    } catch (errors) {
      console.log('表单验证失败:', errors);
    }
  };

  return (
    <Form ref={formRef}>
      <Form.Item name="agree" label="服务条款">
        <Switch
          rules={[{ required: true, message: '请同意服务条款' }]}
          accessibilityLabel="服务条款同意开关"
        />
      </Form.Item>
      <Button onClick={handleSubmit}>提交</Button>
    </Form>
  );
}
```

### 批量操作

```tsx
import { Switch } from '@/components/form';

export default function BatchSwitch() {
  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View>
      {Object.entries(settings).map(([key, value]) => (
        <Switch
          key={key}
          checked={value}
          onChange={(v) => handleSwitchChange(key, v)}
          showLabel={true}
          checkedLabel="开启"
          uncheckedLabel="关闭"
          accessibilityLabel={`${key}设置开关`}
        />
      ))}
    </View>
  );
}
```