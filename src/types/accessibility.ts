export interface AccessibilityState {
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  expanded?: boolean;
  busy?: boolean;
  pressed?: boolean;
}

export interface AccessibilityValue {
  min?: number;
  max?: number;
  now?: number;
  text?: string;
}

export interface AccessibilityProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
  accessibilityState?: AccessibilityState;
  accessibilityValue?: AccessibilityValue;
  accessibilityId?: string;
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
}

export interface AccessibilityActionEvent {
  nativeEvent: {
    actionName: string;
    actionTarget?: string;
  };
}

export interface AccessibilityEvents {
  onAccessibilityAction?: (event: AccessibilityActionEvent) => void;
  onAccessibilityFocus?: (event: any) => void;
  onAccessibilityHintChange?: (event: any) => void;
  onAccessibilityStateChange?: (event: any) => void;
  onAccessibilityValueChange?: (event: any) => void;
  onAccessibilityLabelChange?: (event: any) => void;
  onAccessibilityRoleChange?: (event: any) => void;
  onAccessibilityRequest?: (event: AccessibilityActionEvent) => void;
  onAccessibilityDone?: (event: any) => void;
  onAccessibilityCancel?: (event: any) => void;
  onAccessibilityError?: (event: any) => void;
  onAccessibilityWarning?: (event: any) => void;
  onAccessibilityInfo?: (event: any) => void;
  onAccessibilitySuccess?: (event: any) => void;
}
