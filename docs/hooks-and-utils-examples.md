# Hooks和Utils使用示例文档

本文档提供了Taro-Uno组件库中自定义Hooks和Utils工具函数的详细使用示例。

## 目录

1. [状态管理Hooks](#状态管理hooks)
2. [事件处理Hooks](#事件处理hooks)
3. [生命周期Hooks](#生命周期hooks)
4. [性能优化Hooks](#性能优化hooks)
5. [数据处理Utils](#数据处理utils)
6. [格式化Utils](#格式化utils)
7. [验证和转换Utils](#验证和转换utils)

## 状态管理Hooks

### useControlledState - 受控/非受控状态管理

```tsx
import { useControlledState } from '@/hooks';

// 基础用法
function MyComponent({ value, onChange }) {
  const [internalValue, setInternalValue] = useControlledState(
    value,           // 受控值
    'default value', // 默认值
    onChange         // 变化回调
  );

  return (
    <input
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
}
```

### useValidatedState - 状态验证管理

```tsx
import { useValidatedState } from '@/hooks';

function FormInput() {
  const { value, setValue, isValid, error, isTouched, markAsTouched } = useValidatedState(
    '',
    (value) => {
      if (!value) return { valid: false, message: '不能为空' };
      if (value.length < 6) return { valid: false, message: '至少6个字符' };
      return { valid: true };
    },
    { validateOnBlur: true }
  );

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={markAsTouched}
        style={{ borderColor: isValid ? 'green' : 'red' }}
      />
      {isTouched && !isValid && <div className="error">{error}</div>}
    </div>
  );
}
```

### useStateHistory - 状态历史管理

```tsx
import { useStateHistory } from '@/hooks';

function TextEditor() {
  const { state, setState, undo, redo, canUndo, canRedo } = useStateHistory(
    '初始内容',
    { maxSize: 100 }
  );

  return (
    <div>
      <textarea
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <div>
        <button onClick={undo} disabled={!canUndo}>撤销</button>
        <button onClick={redo} disabled={!canRedo}>重做</button>
      </div>
    </div>
  );
}
```

## 事件处理Hooks

### useDebounce - 防抖处理

```tsx
import { useDebounce } from '@/hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = useDebounce(async (term: string) => {
    const response = await fetch(`/api/search?q=${term}`);
    const data = await response.json();
    setResults(data);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="搜索..."
      />
      {/* 渲染搜索结果 */}
    </div>
  );
}
```

### useClickHandler - 点击事件处理

```tsx
import { useClickHandler } from '@/hooks';

function MyButton({ onClick, disabled }) {
  const handleClick = useClickHandler(onClick, {
    disabled,
    debounceTime: 300,
    stopPropagation: true,
  });

  return (
    <button onClick={handleClick} disabled={disabled}>
      点击我
    </button>
  );
}
```

### useLongPress - 长按处理

```tsx
import { useLongPress } from '@/hooks';

function LongPressButton() {
  const handleLongPress = () => {
    console.log('长按触发');
  };

  const handleLongPressEnd = () => {
    console.log('长按结束');
  };

  const handlers = useLongPress({
    delay: 800,
    onLongPress: handleLongPress,
    onLongPressEnd: handleLongPressEnd,
  });

  return (
    <button {...handlers}>
      长按我
    </button>
  );
}
```

## 生命周期Hooks

### useMounted - 组件挂载状态

```tsx
import { useMounted } from '@/hooks';

function MyComponent() {
  const mounted = useMounted();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (mounted) {
      // 只有在组件挂载后才执行
      fetchData();
    }
  }, [mounted]);

  return <div>{data ? '数据已加载' : '加载中...'}</div>;
}
```

### useTimer - 定时器管理

```tsx
import { useTimer } from '@/hooks';

function TimerComponent() {
  const [count, setCount] = useState(0);
  
  const { start, stop, isActive } = useTimer(
    () => setCount(prev => prev + 1),
    1000,
    { immediate: true }
  );

  return (
    <div>
      <div>计数: {count}</div>
      <button onClick={isActive ? stop : start}>
        {isActive ? '停止' : '开始'}
      </button>
    </div>
  );
}
```

### useNetworkState - 网络状态监听

```tsx
import { useNetworkState } from '@/hooks';

function NetworkStatus() {
  const networkState = useNetworkState();

  return (
    <div>
      <div>网络状态: {networkState.online ? '在线' : '离线'}</div>
      <div>网络类型: {networkState.effectiveType || '未知'}</div>
      <div>下载速度: {networkState.downlink || '未知'} Mbps</div>
    </div>
  );
}
```

## 性能优化Hooks

### useMemoizedFunction - 函数记忆化

```tsx
import { useMemoizedFunction } from '@/hooks';

function ExpensiveComponent({ data }) {
  const expensiveCalculation = useMemoizedFunction((items: any[]) => {
    console.log('执行昂贵计算');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, { maxSize: 100 });

  const total = expensiveCalculation(data);

  return <div>总计: {total}</div>;
}
```

### useVirtualList - 虚拟列表

```tsx
import { useVirtualList } from '@/hooks';

function VirtualListComponent({ items }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);

  const {
    visibleItems,
    offsetY,
    totalHeight,
    handleScroll,
  } = useVirtualList(items, {
    itemHeight: 50,
    containerHeight,
    overscanCount: 5,
  });

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offsetY }}>
          {visibleItems.map((item, index) => (
            <div key={item.id} style={{ height: 50 }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### useLazyLoad - 懒加载

```tsx
import { useLazyLoad } from '@/hooks';

function LazyImage({ src, placeholder }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const { isVisible } = useLazyLoad(imageRef, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={imageRef} style={{ height: 200, background: '#f0f0f0' }}>
      {isVisible ? (
        <img src={src} alt="Lazy loaded" style={{ width: '100%', height: '100%' }} />
      ) : (
        <div>{placeholder}</div>
      )}
    </div>
  );
}
```

## 数据处理Utils

### 数据转换

```tsx
import { dataTransform } from '@/utils';

// 深度克隆
const original = { a: 1, b: { c: 2 } };
const cloned = dataTransform.deepClone(original);

// 对象转数组
const obj = { key1: 'value1', key2: 'value2' };
const array = dataTransform.objectToArray(obj, 'key', 'value');
// 结果: [{ key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' }]

// 扁平化对象
const nested = { a: 1, b: { c: 2, d: { e: 3 } } };
const flattened = dataTransform.flattenObject(nested);
// 结果: { a: 1, 'b.c': 2, 'b.d.e': 3 }
```

### 数据过滤

```tsx
import { dataFilter } from '@/utils';

const data = [
  { id: 1, name: '张三', age: 25, score: 85 },
  { id: 2, name: '李四', age: 30, score: 92 },
  { id: 3, name: '王五', age: 25, score: 78 },
];

// 过滤空值
const filtered = dataFilter.filterEmpty(data);

// 模糊搜索
const searchResults = dataFilter.fuzzySearch(data, '张', ['name']);

// 高级搜索
const advancedResults = dataFilter.advancedSearch(data, [
  { field: 'age', operator: 'greater', value: 25 },
  { field: 'score', operator: 'greater', value: 80 },
]);
```

### 数据聚合

```tsx
import { dataAggregate } from '@/utils';

const salesData = [
  { product: 'A', category: '电子', amount: 1000 },
  { product: 'B', category: '电子', amount: 1500 },
  { product: 'C', category: '服装', amount: 800 },
];

// 分组
const grouped = dataAggregate.groupBy(salesData, 'category');

// 统计
const totals = dataAggregate.aggregate(salesData, 'category', 'amount', 'sum');

// 分页
const paginated = dataAggregate.paginate(data, 1, 10);

// 透视表
const pivot = dataAggregate.pivot(salesData, 'category', 'product', 'amount', 'sum');
```

## 格式化Utils

### 日期时间格式化

```tsx
import { dateTimeFormat } from '@/utils';

// 基础格式化
const dateStr = dateTimeFormat.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
// 结果: '2024-01-01 12:00:00'

// 相对时间
const relative = dateTimeFormat.formatRelativeTime(new Date('2024-01-01'));
// 结果: '2天前'

// 时间段
const timeRange = dateTimeFormat.formatTimeRange(
  '2024-01-01 09:00',
  '2024-01-01 17:00'
);
// 结果: '09:00 - 17:00'

// 获取星期几
const weekday = dateTimeFormat.getWeekday(new Date());
// 结果: '星期一'
```

### 数字格式化

```tsx
import { numberFormat } from '@/utils';

// 基础数字格式化
const formatted = numberFormat.formatNumber(1234567.89);
// 结果: '1,234,567.89'

// 货币格式化
const currency = numberFormat.formatCurrency(1234.56, 'USD');
// 结果: '$1,234.56'

// 百分比格式化
const percent = numberFormat.formatPercent(0.8543, 1);
// 结果: '85.4%'

// 文件大小格式化
const fileSize = numberFormat.formatFileSize(1024 * 1024 * 2.5);
// 结果: '2.5 MB'

// 数字缩写
const abbreviated = numberFormat.formatNumberAbbreviation(1500000);
// 结果: '1.5M'
```

### 字符串格式化

```tsx
import { stringFormat } from '@/utils';

// 首字母大写
const capitalized = stringFormat.capitalize('hello world');
// 结果: 'Hello world'

// 命名转换
const snakeCase = stringFormat.camelToSnake('myVariableName');
// 结果: 'my_variable_name'

const camelCase = stringFormat.snakeToCamel('my_variable_name');
// 结果: 'myVariableName'

// 格式化手机号
const formattedPhone = stringFormat.formatPhone('13800138000');
// 结果: '138 0013 8000'

// 截断字符串
const truncated = stringFormat.truncate('这是一段很长的文本', 10);
// 结果: '这是一段很长的...'

// 高亮关键词
const highlighted = stringFormat.highlightKeywords(
  '这是一个重要的通知',
  ['重要', '通知'],
  'highlight'
);
// 结果: '这是一个<span class="highlight">重要</span>的<span class="highlight">通知</span>'
```

## 验证和转换Utils

### 类型转换

```tsx
import { typeConvert } from '@/utils';

// 基础类型转换
const num = typeConvert.toNumber('123.45', 0); // 123.45
const int = typeConvert.toInteger('123.45', 0); // 123
const bool = typeConvert.toBoolean('true', false); // true
const str = typeConvert.toString(123, ''); // '123'

// 安全JSON处理
const parsed = typeConvert.safeParseJSON('{"a": 1}', {}); // { a: 1 }
const stringified = typeConvert.safeStringifyJSON({ a: 1 }); // '{"a": 1}'

// Base64编解码
const encoded = typeConvert.toBase64('Hello World');
const decoded = typeConvert.fromBase64(encoded);
```

### 数据验证

```tsx
import { dataValidate } from '@/utils';

// 基础验证
console.log(dataValidate.isEmail('test@example.com')); // true
console.log(dataValidate.isPhone('13800138000')); // true
console.log(dataValidate.isUrl('https://example.com')); // true
console.log(dataValidate.isStrongPassword('Password123!')); // true

// 类型验证
console.log(dataValidate.isNumber(123)); // true
console.log(dataValidate.isArray([1, 2, 3])); // true
console.log(dataValidate.isEmpty('')); // true
```

### 规则验证器

```tsx
import { ruleValidator } from '@/utils';

// 单个值验证
const result = ruleValidator.validate('test@example.com', [
  { required: true, message: '邮箱不能为空' },
  { type: 'email', message: '邮箱格式不正确' },
]);

// 批量验证
const data = {
  name: '张三',
  age: 25,
  email: 'test@example.com',
};

const rules = {
  name: [
    { required: true, message: '姓名不能为空' },
    { minLength: 2, message: '姓名至少2个字符' },
  ],
  age: [
    { required: true, message: '年龄不能为空' },
    { type: 'number', message: '年龄必须是数字' },
    { min: 18, message: '年龄不能小于18岁' },
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
};

const validationResult = ruleValidator.validateBatch(data, rules);
```

## 最佳实践

### 1. 性能优化

```tsx
// ✅ 使用useMemoizedFunction缓存昂贵计算
const expensiveCalculation = useMemoizedFunction((data) => {
  return data.reduce((sum, item) => sum + item.value, 0);
});

// ✅ 使用useVirtualList处理大量数据
const { visibleItems } = useVirtualList(largeData, options);

// ✅ 使用useLazyLoad延迟加载图片
const { isVisible } = useLazyLoad(imageRef);
```

### 2. 状态管理

```tsx
// ✅ 使用useControlledState处理受控/非受控模式
const [value, setValue] = useControlledState(props.value, defaultValue, onChange);

// ✅ 使用useValidatedState处理表单验证
const { value, setValue, isValid, error } = useValidatedState('', validator);

// ✅ 使用useStateHistory实现撤销/重做
const { state, setState, undo, redo } = useStateHistory(initialState);
```

### 3. 事件处理

```tsx
// ✅ 使用useDebounce优化搜索
const handleSearch = useDebounce(async (term) => {
  await performSearch(term);
}, 300);

// ✅ 使用useThrottle优化滚动事件
const handleScroll = useThrottle((event) => {
  updateScrollPosition(event);
}, 16);

// ✅ 使用useClickHandler统一处理点击事件
const handleClick = useClickHandler(onClick, { disabled, debounceTime: 200 });
```

### 4. 数据处理

```tsx
// ✅ 使用dataTransform进行安全的数据转换
const processedData = dataTransform.deepClone(rawData);

// ✅ 使用dataFilter进行高效的数据过滤
const filteredData = dataFilter.fuzzySearch(data, searchTerm, searchFields);

// ✅ 使用dataAggregate进行数据统计
const summary = dataAggregate.groupBy(data, 'category');
```

## 总结

通过使用这些自定义Hooks和Utils工具函数，你可以：

1. **提高代码复用性**：避免重复编写相同的逻辑
2. **增强代码可维护性**：统一的接口和清晰的职责分离
3. **提升应用性能**：内置的性能优化机制
4. **减少开发时间**：开箱即用的解决方案
5. **保证代码质量**：完善的类型定义和错误处理

这些工具函数都是经过实践检验的，可以根据项目需求进行灵活组合和扩展。