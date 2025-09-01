# Checkbox Component

A comprehensive checkbox component for the Taro Uno UI library with support for single checkboxes, checkbox groups, validation, and extensive customization options.

## Features

- ✅ **Single Checkbox**: Individual checkbox with full customization
- ✅ **Checkbox Group**: Group multiple checkboxes with collective functionality
- ✅ **Multiple Sizes**: xs, sm, md, lg, xl sizes
- ✅ **Status Variants**: normal, error, warning, success, disabled
- ✅ **Color Themes**: primary, secondary, success, warning, error, info
- ✅ **Indeterminate State**: Partial selection support
- ✅ **Form Validation**: Built-in validation with custom rules
- ✅ **Accessibility**: Full ARIA support
- ✅ **Animations**: Smooth transitions and visual feedback
- ✅ **Ripple Effects**: Material Design ripple animations
- ✅ **Custom Icons**: Support for custom checked/unchecked icons
- ✅ **Responsive Design**: Works across all Taro platforms
- ✅ **TypeScript Support**: Full type safety

## Installation

The component is included in the Taro Uno UI library. No additional installation is required.

## Basic Usage

### Single Checkbox

```tsx
import { Checkbox } from '@/components/form/Checkbox';

function BasicExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="Accept terms and conditions"
    />
  );
}
```

### Checkbox Group

```tsx
import { CheckboxGroup } from '@/components/form/Checkbox';

function GroupExample() {
  const [selectedValues, setSelectedValues] = useState<Array<string | number>>([]);
  
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  
  return (
    <CheckboxGroup
      options={options}
      value={selectedValues}
      onChange={setSelectedValues}
      showSelectAll={true}
      showCount={true}
    />
  );
}
```

## Props

### Checkbox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `value` | `string \| number` | `undefined` | Checkbox value |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Checkbox size |
| `status` | `'normal' \| 'error' \| 'warning' \| 'success' \| 'disabled'` | `'normal'` | Checkbox status |
| `variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | Checkbox variant |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Checkbox color theme |
| `disabled` | `boolean` | `false` | Whether checkbox is disabled |
| `readonly` | `boolean` | `false` | Whether checkbox is readonly |
| `indeterminate` | `boolean` | `false` | Whether checkbox is in indeterminate state |
| `label` | `ReactNode` | `undefined` | Checkbox label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |
| `helperText` | `ReactNode` | `undefined` | Helper text |
| `errorText` | `ReactNode` | `undefined` | Error text |
| `bordered` | `boolean` | `true` | Whether to show border |
| `rounded` | `boolean` | `true` | Whether to have rounded corners |
| `icon` | `ReactNode` | `undefined` | Custom icon |
| `checkedIcon` | `ReactNode` | `undefined` | Custom checked icon |
| `uncheckedIcon` | `ReactNode` | `undefined` | Custom unchecked icon |
| `indeterminateIcon` | `ReactNode` | `undefined` | Custom indeterminate icon |
| `onChange` | `(checked: boolean, event: ITouchEvent) => void` | `undefined` | Change event handler |
| `onClick` | `(event: ITouchEvent) => void` | `undefined` | Click event handler |
| `rules` | `Array<{ required?: boolean; message?: string; validator?: (checked: boolean) => boolean \| string \| Promise<boolean \| string> }>` | `undefined` | Validation rules |
| `validateTrigger` | `'onChange' \| 'onBlur' \| 'onSubmit'` | `'onChange'` | Validation trigger |
| `immediate` | `boolean` | `false` | Whether to validate immediately |
| `validator` | `(checked: boolean) => boolean \| string \| Promise<boolean \| string>` | `undefined` | Custom validator function |
| `animation` | `boolean` | `true` | Whether to enable animations |
| `animationDuration` | `number` | `200` | Animation duration in ms |
| `ripple` | `boolean` | `false` | Whether to enable ripple effects |
| `rippleColor` | `string` | `undefined` | Custom ripple color |
| `autoFocus` | `boolean` | `false` | Whether to auto focus |
| `tabIndex` | `number` | `0` | Tab index |
| `data` | `Record<string, any>` | `undefined` | Custom data attributes |
| `className` | `string` | `undefined` | Custom CSS classes |
| `style` | `CSSProperties` | `undefined` | Custom inline styles |

### CheckboxGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Array<string \| number>` | `undefined` | Controlled selected values |
| `defaultValue` | `Array<string \| number>` | `[]` | Default selected values (uncontrolled) |
| `options` | `Array<{ label: ReactNode; value: string \| number; disabled?: boolean; description?: ReactNode; icon?: ReactNode; color?: CheckboxColor; data?: Record<string, any> }>` | `undefined` | Available options |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of checkboxes |
| `spacing` | `number \| string` | `8` | Spacing between checkboxes |
| `maxCount` | `number` | `undefined` | Maximum number of selectable items |
| `minCount` | `number` | `undefined` | Minimum number of selectable items |
| `showSelectAll` | `boolean` | `false` | Whether to show select all button |
| `selectAllText` | `string` | `'全选'` | Select all button text |
| `showCount` | `boolean` | `false` | Whether to show selection count |
| `countText` | `(selected: number, total: number) => string` | `(selected, total) => \`已选择 \${selected} 项\`` | Custom count text |
| `allowDeselectAll` | `boolean` | `true` | Whether to allow deselecting all |
| `compact` | `boolean` | `false` | Whether to use compact layout |
| `block` | `boolean` | `false` | Whether to take full width |
| `groupTitle` | `ReactNode` | `undefined` | Group title |
| `groupDescription` | `ReactNode` | `undefined` | Group description |
| `onChange` | `(checkedValues: Array<string \| number>) => void` | `undefined` | Change event handler |
| `onAllChange` | `(checked: boolean) => void` | `undefined` | Select all change event handler |

## Ref Methods

### Checkbox Ref

```tsx
const checkboxRef = useRef<CheckboxRef>(null);

// Available methods
checkboxRef.current?.getChecked(); // Get checked state
checkboxRef.current?.setChecked(true); // Set checked state
checkboxRef.current?.toggle(); // Toggle checked state
checkboxRef.current?.setDisabled(true); // Set disabled state
checkboxRef.current?.setReadonly(true); // Set readonly state
checkboxRef.current?.setIndeterminate(true); // Set indeterminate state
checkboxRef.current?.setStatus('error'); // Set status
checkboxRef.current?.getStatus(); // Get current status
checkboxRef.current?.setSize('lg'); // Set size
checkboxRef.current?.setColor('success'); // Set color
checkboxRef.current?.validate(); // Validate checkbox
checkboxRef.current?.reset(); // Reset checkbox
checkboxRef.current?.focus(); // Focus checkbox
checkboxRef.current?.blur(); // Blur checkbox
checkboxRef.current?.getData(); // Get custom data
checkboxRef.current?.setData({ id: 'test' }); // Set custom data
checkboxRef.current?.shake(); // Trigger shake animation
checkboxRef.current?.pulse(); // Trigger pulse animation
```

### CheckboxGroup Ref

```tsx
const groupRef = useRef<CheckboxGroupRef>(null);

// Available methods
groupRef.current?.getValue(); // Get selected values
groupRef.current?.setValue(['1', '2']); // Set selected values
groupRef.current?.selectAll(); // Select all options
groupRef.current?.unselectAll(); // Deselect all options
groupRef.current?.toggleAll(); // Toggle all selection
groupRef.current?.getCheckedCount(); // Get number of selected items
groupRef.current?.getTotalCount(); // Get total number of items
groupRef.current?.isAllSelected(); // Check if all are selected
groupRef.current?.isIndeterminate(); // Check if partially selected
groupRef.current?.setDisabled(true); // Set disabled state
groupRef.current?.setReadonly(true); // Set readonly state
groupRef.current?.setStatus('error'); // Set status
groupRef.current?.validate(); // Validate group
groupRef.current?.reset(); // Reset group
groupRef.current?.getSelectedOptions(); // Get selected option data
groupRef.current?.getOptionByValue('1'); // Get option by value
groupRef.current?.setOptionDisabled('1', true); // Set option disabled state
groupRef.current?.setOptionsDisabled(['1', '2'], true); // Set multiple options disabled
groupRef.current?.focus(); // Focus group
groupRef.current?.blur(); // Blur group
```

## Examples

### With Validation

```tsx
function ValidationExample() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <Checkbox
      checked={accepted}
      onChange={(checked) => {
        setAccepted(checked);
        if (!checked) {
          setError('You must accept the terms');
        } else {
          setError(null);
        }
      }}
      status={error ? 'error' : 'normal'}
      errorText={error}
      rules={[{ required: true, message: 'This field is required' }]}
      label="I accept the terms and conditions"
    />
  );
}
```

### Custom Icons

```tsx
function CustomIconExample() {
  return (
    <Checkbox
      checkedIcon="✅"
      uncheckedIcon="❌"
      indeterminateIcon="❓"
      label="Custom Icons"
    />
  );
}
```

### With Animations

```tsx
function AnimationExample() {
  const checkboxRef = useRef<CheckboxRef>(null);
  
  return (
    <View>
      <Checkbox
        ref={checkboxRef}
        animation={true}
        ripple={true}
        label="Animated Checkbox"
      />
      <Button onClick={() => checkboxRef.current?.shake()}>
        Shake
      </Button>
      <Button onClick={() => checkboxRef.current?.pulse()}>
        Pulse
      </Button>
    </View>
  );
}
```

## Styling

The component uses Tailwind CSS for styling and provides extensive customization options:

### CSS Variables

```css
:root {
  --checkbox-primary-color: #0ea5e9;
  --checkbox-secondary-color: #6b7280;
  --checkbox-success-color: #22c55e;
  --checkbox-warning-color: #f59e0b;
  --checkbox-error-color: #ef4444;
  --checkbox-info-color: #3b82f6;
  --checkbox-border-color: #d1d5db;
  --checkbox-border-color-hover: #9ca3af;
  --checkbox-background-color: #ffffff;
  --checkbox-background-color-disabled: #f9fafb;
  --checkbox-check-color: #0ea5e9;
  --checkbox-check-color-disabled: #9ca3af;
  --checkbox-text-color: #374151;
  --checkbox-text-color-disabled: #9ca3af;
  --checkbox-animation-duration: 200ms;
  --checkbox-ripple-color: rgba(14, 165, 233, 0.3);
  --checkbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --checkbox-shadow-hover: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Custom Classes

You can customize the appearance by providing custom CSS classes:

```tsx
<Checkbox
  className="custom-checkbox"
  style={{
    backgroundColor: '#f0f9ff',
    borderColor: '#0ea5e9',
  }}
  label="Custom Styled"
/>
```

## Accessibility

The component follows WAI-ARIA best practices:

- Proper `role` attributes
- `aria-label` support
- `aria-checked` state management
- `aria-disabled` state management
- Keyboard navigation support
- Screen reader compatibility

## Platform Compatibility

The component is fully compatible with all Taro platforms:

- ✅ **H5** (Web)
- ✅ **WeChat Mini Program**
- ✅ **Alipay Mini Program**
- ✅ **Baidu Mini Program**
- ✅ **QQ Mini Program**
- ✅ **React Native**

## Performance

- Optimized re-renders with React.memo
- Efficient state management
- Minimal DOM manipulation
- Smooth animations with CSS transitions
- Lazy loading for large checkbox groups

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Please refer to the main project contributing guidelines.

## License

MIT License - see the main project LICENSE file for details.