/**
 * Taro-Uno 无障碍属性扩展
 * 解决 Taro 组件缺少无障碍属性的类型定义问题
 */

import type { ITouchEvent } from '@tarojs/components';
import type { ReactNode } from 'react';

// 重新导出ReactNode以确保可用
export type { ReactNode };

/** 无障碍状态接口 */
export interface AccessibilityState {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 是否无效/错误 */
  invalid?: boolean;
  /** 是否被选中 */
  selected?: boolean;
  /** 是否被禁用 */
  busy?: boolean;
  /** 是否被选中 */
  checked?: boolean;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否被聚焦 */
  focused?: boolean;
  /** 是否隐藏 */
  hidden?: boolean;
}

/** 无障碍属性接口 */
export interface AccessibilityProps {
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍提示 */
  accessibilityHint?: string;
  /** 无障碍状态 */
  accessibilityState?: AccessibilityState;
  /** 无障碍值 */
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
  /** 无障碍元素标识 */
  accessibilityId?: string;
  /** 无障碍动作 */
  accessibilityActions?: Array<{
    name: string;
    label?: string;
  }>;
  /** 无障碍实时区域类型 */
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
  /** 无障碍重要程度 */
  accessibilityImportant?: boolean;
  /** 无障碍视图是否隐藏 */
  accessibilityViewIsModal?: boolean;
  /** 无障碍元素树角色 */
  accessibilityElementsHidden?: boolean;
}

/** 扩展的无障碍事件接口 */
export interface AccessibilityEvents {
  /** 无障碍动作事件 */
  onAccessibilityAction?: (event: {
    nativeEvent: {
      actionName: string;
    };
  }) => void;
  /** 无障碍焦点变化事件 */
  onAccessibilityFocus?: (event: ITouchEvent) => void;
  /** 无障碍提示变化事件 */
  onAccessibilityHintChange?: (event: ITouchEvent) => void;
  /** 无障碍状态变化事件 */
  onAccessibilityStateChange?: (event: ITouchEvent) => void;
  /** 无障碍值变化事件 */
  onAccessibilityValueChange?: (event: ITouchEvent) => void;
  /** 无障碍标签变化事件 */
  onAccessibilityLabelChange?: (event: ITouchEvent) => void;
  /** 无障碍角色变化事件 */
  onAccessibilityRoleChange?: (event: ITouchEvent) => void;
  /** 无障碍动作请求事件 */
  onAccessibilityRequest?: (event: {
    nativeEvent: {
      actionName: string;
      actionTarget: string;
    };
  }) => void;
  /** 无障碍完成事件 */
  onAccessibilityDone?: (event: ITouchEvent) => void;
  /** 无障碍取消事件 */
  onAccessibilityCancel?: (event: ITouchEvent) => void;
  /** 无障碍错误事件 */
  onAccessibilityError?: (event: ITouchEvent) => void;
  /** 无障碍警告事件 */
  onAccessibilityWarning?: (event: ITouchEvent) => void;
  /** 无障碍信息事件 */
  onAccessibilityInfo?: (event: ITouchEvent) => void;
  /** 无障碍成功事件 */
  onAccessibilitySuccess?: (event: ITouchEvent) => void;
}

/** Taro 组件基础属性扩展 */
export interface TaroComponentBaseProps {
  /** 组件唯一标识 */
  id?: string;
  /** 组件类名 */
  className?: string;
  /** 组件样式 */
  style?: React.CSSProperties;
  /** 组件子元素 */
  children?: ReactNode;
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void;
  /** 长按事件 */
  onLongPress?: (event: ITouchEvent) => void;
  /** 触摸开始事件 */
  onTouchStart?: (event: ITouchEvent) => void;
  /** 触摸移动事件 */
  onTouchMove?: (event: ITouchEvent) => void;
  /** 触摸结束事件 */
  onTouchEnd?: (event: ITouchEvent) => void;
  /** 触摸取消事件 */
  onTouchCancel?: (event: ITouchEvent) => void;
  /** 数据集属性 */
  dataset?: Record<string, any>;
  /** 自定义属性 */
  [key: string]: any;
}

/** 扩展的 Taro View 组件属性 */
export interface ExtendedViewProps extends TaroComponentBaseProps, AccessibilityProps, AccessibilityEvents {
  /** 动画效果 */
  animation?: string;
  /** 悬停类名 */
  hoverClass?: string;
  /** 悬停开始时间 */
  hoverStartTime?: number;
  /** 悬停停留时间 */
  hoverStayTime?: number;
  /** 是否阻止事件冒泡 */
  catchTouch?: boolean;
  /** 是否阻止鼠标事件冒泡 */
  catchMove?: boolean;
  /** 是否阻止长按事件冒泡 */
  catchLongPress?: boolean;
  /** 是否阻止触摸事件冒泡 */
  catchTap?: boolean;
}

/** 扩展的 Taro Text 组件属性 */
export interface ExtendedTextProps extends TaroComponentBaseProps, AccessibilityProps, AccessibilityEvents {
  /** 选择性 */
  selectable?: boolean;
  /** 用户选择 */
  userSelect?: boolean;
  /** 空格处理方式 */
  space?: 'ensp' | 'emsp' | 'nbsp' | 'normal';
  /** 最大行数 */
  numberOfLines?: number;
  /** 解码方式 */
  decode?: boolean;
}

/** 扩展的 Taro Input 组件属性 */
export interface ExtendedInputProps extends TaroComponentBaseProps, AccessibilityProps, AccessibilityEvents {
  /** 输入框类型 */
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'password';
  /** 密码类型 */
  password?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 占位符样式 */
  placeholderStyle?: React.CSSProperties;
  /** 占位符类名 */
  placeholderClass?: string;
  /** 禁用状态 */
  disabled?: boolean;
  /** 最大长度 */
  maxlength?: number;
  /** 光标位置 */
  cursor?: number;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 获取焦点 */
  focus?: boolean;
  /** 确认类型 */
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done';
  /** 总是嵌入 */
  alwaysEmbed?: boolean;
  /** 确认时保持键盘 */
  confirmHold?: boolean;
  /** 光标颜色 */
  cursorColor?: string;
  /** 键盘高度变化 */
  onKeyboardHeightChange?: (event: ITouchEvent) => void;
  /** 输入事件 */
  onInput?: (event: ITouchEvent) => void;
  /** 确认事件 */
  onConfirm?: (event: ITouchEvent) => void;
  /** 聚焦事件 */
  onFocus?: (event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur?: (event: ITouchEvent) => void;
}

/** 扩展的 Taro Button 组件属性 */
export interface ExtendedButtonProps extends TaroComponentBaseProps, AccessibilityProps, AccessibilityEvents {
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'warn';
  /** 大小 */
  size?: 'default' | 'mini';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 表单类型 */
  formType?: 'submit' | 'reset';
  /** 是否镂空 */
  plain?: boolean;
  /** 悬停效果 */
  hoverClass?: string;
  /** 悬停开始时间 */
  hoverStartTime?: number;
  /** 悬停停留时间 */
  hoverStayTime?: number;
  /** 开放能力 */
  openType?: string;
  /** 获取用户信息 */
  onGetUserInfo?: (event: ITouchEvent) => void;
  /** 获取手机号 */
  onGetPhoneNumber?: (event: ITouchEvent) => void;
  /** 打开设置 */
  onOpenSetting?: (event: ITouchEvent) => void;
  /** 授权 */
  onAuthorize?: (event: ITouchEvent) => void;
  /** 联系客服 */
  onContact?: (event: ITouchEvent) => void;
  /** 分享给朋友 */
  onShareToFriend?: (event: ITouchEvent) => void;
  /** 添加到联系人 */
  onAddFriend?: (event: ITouchEvent) => void;
  /** 启动小程序 */
  onLaunchApp?: (event: ITouchEvent) => void;
  /** 打开小程序 */
  onOpenApp?: (event: ITouchEvent) => void;
  /** 选择收货地址 */
  onChooseAddress?: (event: ITouchEvent) => void;
  /** 选择发票抬头 */
  onChooseInvoice?: (event: ITouchEvent) => void;
  /** 选择发票抬头 */
  onChooseInvoiceTitle?: (event: ITouchEvent) => void;
  /** 订阅消息 */
  onSubscribe?: (event: ITouchEvent) => void;
  /** 登录 */
  onLogin?: (event: ITouchEvent) => void;
  /** 支付 */
  onPay?: (event: ITouchEvent) => void;
  /** 获取错误信息 */
  onError?: (event: ITouchEvent) => void;
  /** 打开文档 */
  onOpenDocument?: (event: ITouchEvent) => void;
}

/** 无障碍工具类 */
export class AccessibilityUtils {
  /** 生成无障碍标签 */
  static generateLabel(label?: string, hint?: string): string {
    if (!label && !hint) return '';
    if (label && !hint) return label;
    if (!label && hint) return hint;
    return `${label}, ${hint}`;
  }

  /** 生成无障碍状态 */
  static generateState(state?: AccessibilityState): string {
    if (!state) return '';
    const states: string[] = [];
    
    if (state.disabled) states.push('disabled');
    if (state.readonly) states.push('readonly');
    if (state.required) states.push('required');
    if (state.invalid) states.push('invalid');
    if (state.selected) states.push('selected');
    if (state.busy) states.push('busy');
    if (state.checked) states.push('checked');
    if (state.expanded) states.push('expanded');
    if (state.focused) states.push('focused');
    if (state.hidden) states.push('hidden');
    
    return states.join(', ');
  }

  /** 生成无障碍提示 */
  static generateHint(hint?: string, state?: AccessibilityState): string {
    if (!hint && !state) return '';
    const hintParts: string[] = [];
    
    if (hint) hintParts.push(hint);
    if (state) {
      const stateText = this.generateState(state);
      if (stateText) hintParts.push(stateText);
    }
    
    return hintParts.join('. ');
  }

  /** 验证无障碍属性 */
  static validateAccessibilityProps(props: AccessibilityProps): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (props.accessible === false && props.accessibilityLabel) {
      errors.push('accessible 为 false 时不应设置 accessibilityLabel');
    }
    
    if (props.accessibilityLabel && props.accessibilityLabel.length > 200) {
      errors.push('accessibilityLabel 长度不应超过 200 字符');
    }
    
    if (props.accessibilityRole && !this.isValidRole(props.accessibilityRole)) {
      errors.push(`accessibilityRole "${props.accessibilityRole}" 不是有效的 ARIA 角色`);
    }
    
    if (props.accessibilityState && !this.isValidState(props.accessibilityState)) {
      errors.push('accessibilityState 包含无效的属性');
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /** 验证 ARIA 角色 */
  private static isValidRole(role: string): boolean {
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'checkbox',
      'columnheader', 'combobox', 'command', 'complementary', 'composite', 'contentinfo',
      'definition', 'dialog', 'directory', 'document', 'form', 'grid', 'gridcell',
      'group', 'heading', 'img', 'input', 'landmark', 'link', 'list', 'listbox',
      'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar', 'menuitem',
      'menuitemcheckbox', 'menuitemradio', 'navigation', 'note', 'option', 'presentation',
      'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 'rowheader',
      'scrollbar', 'search', 'searchbox', 'separator', 'slider', 'spinbutton', 'status',
      'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer',
      'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem', 'widget', 'window',
    ];
    
    return validRoles.includes(role.toLowerCase());
  }

  /** 验证无障碍状态 */
  private static isValidState(state: AccessibilityState): boolean {
    const validStateKeys = [
      'disabled', 'readonly', 'required', 'invalid', 'selected', 'busy',
      'checked', 'expanded', 'focused', 'hidden',
    ];
    
    return Object.keys(state).every(key => validStateKeys.includes(key));
  }

  /** 获取推荐的无障碍角色 */
  static getRecommendedRole(componentType: string): string {
    const roleMap: Record<string, string> = {
      button: 'button',
      link: 'link',
      input: 'textbox',
      select: 'combobox',
      checkbox: 'checkbox',
      radio: 'radio',
      switch: 'switch',
      slider: 'slider',
      progress: 'progressbar',
      alert: 'alert',
      dialog: 'dialog',
      modal: 'dialog',
      navigation: 'navigation',
      search: 'search',
      menu: 'menu',
      menuitem: 'menuitem',
      tab: 'tab',
      tablist: 'tablist',
      tabpanel: 'tabpanel',
      table: 'table',
      grid: 'grid',
      list: 'list',
      listitem: 'listitem',
      heading: 'heading',
      img: 'img',
      banner: 'banner',
      contentinfo: 'contentinfo',
      complementary: 'complementary',
      form: 'form',
      main: 'main',
      region: 'region',
    };
    
    return roleMap[componentType.toLowerCase()] || 'generic';
  }

  /** 生成完整的无障碍属性 */
  static generateAccessibilityProps(
    componentType: string,
    label?: string,
    hint?: string,
    state?: AccessibilityState,
    customProps?: Partial<AccessibilityProps>
  ): AccessibilityProps {
    const recommendedRole = this.getRecommendedRole(componentType);
    
    return {
      accessible: true,
      accessibilityLabel: this.generateLabel(label, hint),
      accessibilityRole: recommendedRole,
      accessibilityHint: hint,
      accessibilityState: state,
      ...customProps,
    };
  }
}