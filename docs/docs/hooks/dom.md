---
sidebar_position: 4
---

# DOM Hooks

DOM 操作相关的 Hooks 集合。

## useClickOutside

监听元素外部点击的 Hook。

```tsx
import { useClickOutside } from 'taro-uno';

function Demo() {
  const ref = useRef(null);
  
  useClickOutside(ref, () => {
    console.log('点击了外部');
  });

  return (
    <div ref={ref}>
      点击外部区域会触发回调
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| ref | 目标元素的 ref | `RefObject<HTMLElement>` |
| handler | 点击外部时的回调 | `() => void` |

## useEventListener

添加事件监听器的 Hook。

```tsx
import { useEventListener } from 'taro-uno';

function Demo() {
  const [key, setKey] = useState('');

  useEventListener('keydown', (event) => {
    setKey(event.key);
  });

  return <p>按下的键: {key}</p>;
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| eventName | 事件名称 | `string` |
| handler | 事件处理函数 | `(event: Event) => void` |
| element | 目标元素 | `RefObject<HTMLElement> \| Window` |
| options | 事件选项 | `AddEventListenerOptions` |

## useEventHandling

统一事件处理的 Hook。

```tsx
import { useEventHandling } from 'taro-uno';

function Demo() {
  const { handleClick, handleTouch } = useEventHandling({
    onClick: (e) => console.log('clicked', e),
    onTouchStart: (e) => console.log('touch start', e),
  });

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      点击或触摸
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| handlers | 事件处理函数集合 | `EventHandlers` |

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| handleClick | 点击事件处理 | `(e: MouseEvent) => void` |
| handleTouch | 触摸事件处理 | `(e: TouchEvent) => void` |
| handleKeyDown | 键盘事件处理 | `(e: KeyboardEvent) => void` |
