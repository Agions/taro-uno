import '@testing-library/jest-dom'
;(globalThis as any).ENABLE_INNER_HTML = true
;(globalThis as any).ENABLE_ADJACENT_HTML = true
;(globalThis as any).ENABLE_CLONE_NODE = true
;(globalThis as any).ENABLE_CONTAINS = true
;(globalThis as any).SUPPORT_TYPED_ARRAY = true
import { vi } from 'vitest'
import React from 'react'

vi.mock('@tarojs/runtime', () => ({ default: {} }))

const filterProps = (props: Record<string, unknown>) => {
  const {
    children,
    className,
    style,
    id,
    role,
    hidden,
    dangerouslySetInnerHTML,
    onClick,
    onChange,
    onScroll,
    onBlur,
    onFocus,
    onKeyDown,
    onSubmit,
    onReset,
    value,
    type,
    name,
    placeholder,
    disabled,
    readOnly,
    required,
    checked,
    ...rest
  } = props as any
  const allowed: Record<string, unknown> = {
    children,
    className,
    style,
    id,
    role,
    hidden,
    dangerouslySetInnerHTML,
    onClick,
    onChange,
    onScroll,
    onBlur,
    onFocus,
    onKeyDown,
    onSubmit,
    onReset,
    value,
    type,
    name,
    placeholder,
    disabled,
    readOnly,
    required,
    checked,
  }
  Object.keys(rest).forEach((key) => {
    if (key.startsWith('aria-') || key.startsWith('data-')) {
      allowed[key] = (rest as any)[key]
    }
  })
  return allowed
}

const createComponent = (tag: string) => {
  const Comp = React.forwardRef<any, Record<string, any>>((props, ref) => {
    const allowed = filterProps(props)
    if ((tag === 'input' || tag === 'textarea' || tag === 'select') && 'value' in allowed && !allowed.onChange) {
      allowed.onChange = () => {}
    }
    return React.createElement(tag, { ...allowed, ref }, allowed.children as React.ReactNode)
  })
  Comp.displayName = `Mock${String(tag)}`
  return Comp
}

vi.mock('@tarojs/components', () => ({
  View: createComponent('div'),
  Text: createComponent('span'),
  Button: createComponent('button'),
  Image: createComponent('img'),
  Input: createComponent('input'),
  Textarea: createComponent('textarea'),
  ScrollView: createComponent('div'),
  Swiper: createComponent('div'),
  SwiperItem: createComponent('div'),
  Video: createComponent('video'),
  Canvas: createComponent('canvas'),
  Map: createComponent('div'),
  WebView: createComponent('iframe'),
  CoverView: createComponent('div'),
  CoverImage: createComponent('img'),
  Icon: createComponent('i'),
  RichText: createComponent('div'),
  Progress: createComponent('progress'),
  Checkbox: createComponent('input'),
  CheckboxGroup: createComponent('div'),
  Form: createComponent('form'),
  Label: createComponent('label'),
  Picker: createComponent('select'),
  PickerView: createComponent('div'),
  PickerViewColumn: createComponent('div'),
  Radio: createComponent('input'),
  RadioGroup: createComponent('div'),
  Slider: createComponent('input'),
  Switch: createComponent('input'),
  Navigator: createComponent('a'),
  Audio: createComponent('audio'),
  Camera: createComponent('div'),
  LivePlayer: createComponent('video'),
  LivePusher: createComponent('video'),
  FunctionalPageNavigator: createComponent('div'),
  OfficialAccount: createComponent('div'),
  OpenData: createComponent('div'),
  NavigationBar: createComponent('div'),
  PageMeta: createComponent('div'),
  PageContainer: createComponent('div'),
  ShareButton: createComponent('button'),
  Ad: createComponent('div'),
  AdContentPage: createComponent('div'),
  CustomWrapper: createComponent('div'),
  Embed: createComponent('iframe'),
}))
