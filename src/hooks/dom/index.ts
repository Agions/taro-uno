/**
 * DOM 相关 Hooks
 * 提供 DOM 操作和事件处理相关的 Hooks
 *
 * 注意：useDebounce 和 useThrottle 请从 hooks/effect 导入
 */

export { useClickOutside } from './useClickOutside';
export { useEventListener } from './useEventListener';
export {
  useClickHandler,
  useLongPress,
  useDrag,
  useKeyboard,
  useEventDelegate,
} from './useEventHandling';
