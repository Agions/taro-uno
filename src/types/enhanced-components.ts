/**
 * Enhanced Component Type System
 * Provides standardized type definitions for all components with better type safety
 */

import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import type {
  BaseComponentProps,
  SizeableProps,
  VariantProps,
  StatusProps,
  ComponentWithChildren,
  EventHandler,
  TouchEventHandler,
  ValidationRule,
  ThemeConfig,
  StrictOmit,
  StrictPick,
  DeepPartial,
  DeepRequired,
  StableProps,
  EventHandlers,
} from './enhanced-utils';

// ==================== Common Component Types ====================

/** Standard size variants */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Standard variant types */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** Standard status types */
export type ComponentStatus = 'default' | 'loading' | 'disabled' | 'error' | 'success';

/** Standard shape types */
export type ComponentShape = 'default' | 'rounded' | 'circle' | 'square';

/** Common component props */
export interface CommonComponentProps
  extends BaseComponentProps,
    SizeableProps,
    VariantProps,
    StatusProps {
  /** Component shape */
  shape?: ComponentShape;
  /** Whether component is block level */
  block?: boolean;
  /** Whether component is bordered */
  bordered?: boolean;
  /** Custom theme */
  theme?: DeepPartial<ThemeConfig>;
}

// ==================== Enhanced Button Types ====================

/** Enhanced button props */
export interface EnhancedButtonProps
  extends CommonComponentProps,
    StrictOmit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'type' | 'onClick'> {
  /** Button content */
  children?: ReactNode;
  /** Button icon */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Click handler */
  onClick?: TouchEventHandler<ITouchEvent>;
  /** Press in handler */
  onPressIn?: TouchEventHandler<ITouchEvent>;
  /** Press out handler */
  onPressOut?: TouchEventHandler<ITouchEvent>;
  /** Long press handler */
  onLongPress?: TouchEventHandler<ITouchEvent>;
  /** Loading text */
  loadingText?: string;
  /** Whether to show ripple effect */
  ripple?: boolean;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Custom color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  /** Animation duration */
  animationDuration?: number;
}

/** Enhanced button ref */
export interface EnhancedButtonRef {
  /** Button element */
  element: HTMLButtonElement | null;
  /** Trigger click */
  click: () => void;
  /** Set disabled state */
  setDisabled: (disabled: boolean) => void;
  /** Set loading state */
  setLoading: (loading: boolean) => void;
  /** Get current status */
  getStatus: () => ComponentStatus;
  /** Get current size */
  getSize: () => ComponentSize;
  /** Get current variant */
  getVariant: () => ComponentVariant;
  /** Get current shape */
  getShape: () => ComponentShape;
  /** Focus button */
  focus: () => void;
  /** Blur button */
  blur: () => void;
}

// ==================== Enhanced Input Types ====================

/** Input types */
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'idcard' | 'digit';

/** Input variants */
export type InputVariant = 'outlined' | 'filled' | 'underlined';

/** Enhanced input props */
export interface EnhancedInputProps
  extends CommonComponentProps,
    StrictOmit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'onChange' | 'onFocus' | 'onBlur'> {
  /** Input value */
  value?: string | number;
  /** Default value */
  defaultValue?: string | number;
  /** Placeholder */
  placeholder?: string;
  /** Input type */
  type?: InputType;
  /** Input variant */
  variant?: InputVariant;
  /** Whether input is readonly */
  readonly?: boolean;
  /** Whether input is clearable */
  clearable?: boolean;
  /** Maximum length */
  maxLength?: number;
  /** Minimum length */
  minLength?: number;
  /** Prefix icon or element */
  prefix?: ReactNode;
  /** Suffix icon or element */
  suffix?: ReactNode;
  /** Label */
  label?: ReactNode;
  /** Helper text */
  helperText?: ReactNode;
  /** Error text */
  errorText?: ReactNode;
  /** Whether to show character count */
  showCount?: boolean;
  /** Whether to auto focus */
  autoFocus?: boolean;
  /** Whether to show password toggle */
  showPasswordToggle?: boolean;
  /** Change handler */
  onChange?: (value: string, event: ITouchEvent) => void;
  /** Focus handler */
  onFocus?: TouchEventHandler<ITouchEvent>;
  /** Blur handler */
  onBlur?: TouchEventHandler<ITouchEvent>;
  /** Clear handler */
  onClear?: TouchEventHandler<ITouchEvent>;
  /** Confirm handler */
  onConfirm?: (value: string, event: ITouchEvent) => void;
  /** Input handler */
  onInput?: (value: string, event: ITouchEvent) => void;
  /** Validation rules */
  rules?: ValidationRule<string>[];
  /** Validation trigger */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** Whether to validate immediately */
  immediate?: boolean;
  /** Whether input is multiline */
  multiline?: boolean;
  /** Number of rows for multiline input */
  rows?: number;
  /** Whether to auto resize height */
  autoHeight?: boolean;
  /** Whether to show word limit */
  showWordLimit?: boolean;
  /** Custom validator */
  validator?: (value: string) => boolean | string | Promise<boolean | string>;
  /** Container style */
  containerStyle?: React.CSSProperties;
}

/** Enhanced input ref */
export interface EnhancedInputRef {
  /** Input element */
  element: HTMLInputElement | HTMLTextAreaElement | null;
  /** Get input value */
  getValue: () => string;
  /** Set input value */
  setValue: (value: string) => void;
  /** Focus input */
  focus: () => void;
  /** Blur input */
  blur: () => void;
  /** Select text */
  select: () => void;
  /** Set selection range */
  setSelectionRange: (start: number, end: number) => void;
  /** Get selection range */
  getSelectionRange: () => { start: number; end: number };
  /** Set disabled state */
  setDisabled: (disabled: boolean) => void;
  /** Set readonly state */
  setReadonly: (readonly: boolean) => void;
  /** Set status */
  setStatus: (status: ComponentStatus) => void;
  /** Get status */
  getStatus: () => ComponentStatus;
  /** Validate input */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** Clear input */
  clear: () => void;
  /** Reset input */
  reset: () => void;
}

// ==================== Enhanced Form Types ====================

/** Form layout types */
export type FormLayout = 'horizontal' | 'vertical' | 'inline';

/** Form label alignment */
export type FormLabelAlign = 'left' | 'right' | 'top';

/** Enhanced form props */
export interface EnhancedFormProps
  extends CommonComponentProps,
    StrictOmit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onReset'> {
  /** Form initial values */
  initialValues?: Record<string, any>;
  /** Form layout */
  layout?: FormLayout;
  /** Label alignment */
  labelAlign?: FormLabelAlign;
  /** Label width */
  labelWidth?: number | string;
  /** Label suffix */
  labelSuffix?: ReactNode;
  /** Whether to show colon after label */
  colon?: boolean;
  /** Required mark display */
  requiredMark?: boolean | 'optional';
  /** Form validation rules */
  rules?: Record<string, ValidationRule<any>[]>;
  /** Validation trigger */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** Whether to validate immediately */
  immediate?: boolean;
  /** Submit handler */
  onSubmit?: (values: Record<string, any>, event: ITouchEvent) => void | Promise<void>;
  /** Reset handler */
  onReset?: (values: Record<string, any>, event: ITouchEvent) => void;
  /** Values change handler */
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
  /** Fields change handler */
  onFieldsChange?: (changedFields: FormField[], allFields: FormField[]) => void;
  /** Validation failed handler */
  onFinishFailed?: (errors: Record<string, string[]>, values: Record<string, any>) => void;
  /** Whether to scroll to first error */
  scrollToFirstError?: boolean;
  /** Whether to preserve values */
  preserve?: boolean;
}

/** Form field interface */
export interface FormField {
  /** Field name */
  name: string;
  /** Field value */
  value: any;
  /** Field errors */
  errors: string[];
  /** Whether field is touched */
  touched: boolean;
  /** Whether field is validating */
  validating: boolean;
  /** Field rules */
  rules: ValidationRule<any>[];
}

/** Enhanced form ref */
export interface EnhancedFormRef {
  /** Get form values */
  getValues: () => Record<string, any>;
  /** Set form values */
  setValues: (values: Partial<Record<string, any>>) => void;
  /** Get field value */
  getFieldValue: (name: string) => any;
  /** Set field value */
  setFieldValue: (name: string, value: any) => void;
  /** Reset form */
  resetFields: (fields?: string[]) => void;
  /** Submit form */
  submit: () => Promise<void>;
  /** Validate form */
  validate: (fields?: string[]) => Promise<{
    valid: boolean;
    errors: Record<string, string[]>;
    values: Record<string, any>;
  }>;
  /** Validate field */
  validateField: (name: string) => Promise<{
    valid: boolean;
    errors: string[];
    value: any;
  }>;
  /** Clear field errors */
  clearErrors: (fields?: string[]) => void;
  /** Set field errors */
  setErrors: (errors: Record<string, string | string[]>) => void;
  /** Get field errors */
  getFieldError: (name: string) => string[];
  /** Get form errors */
  getErrors: () => Record<string, string[]>;
  /** Set field status */
  setFields: (fields: Partial<FormField>[]) => void;
  /** Get fields */
  getFields: () => FormField[];
  /** Get field */
  getField: (name: string) => FormField | null;
  /** Set form status */
  setStatus: (status: ComponentStatus) => void;
  /** Get form status */
  getStatus: () => ComponentStatus;
  /** Set form disabled */
  setDisabled: (disabled: boolean) => void;
  /** Scroll to field */
  scrollToField: (name: string) => void;
}

// ==================== Enhanced Form Item Types ====================

/** Enhanced form item props */
export interface EnhancedFormItemProps extends CommonComponentProps {
  /** Field name */
  name: string;
  /** Label */
  label?: ReactNode;
  /** Helper text */
  helperText?: ReactNode;
  /** Error text */
  errorText?: ReactNode;
  /** Validation rules */
  rules?: ValidationRule<any>[];
  /** Validation trigger */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** Whether to validate immediately */
  immediate?: boolean;
  /** Whether field is required */
  required?: boolean;
  /** Whether to show required mark */
  showRequiredMark?: boolean;
  /** Label width */
  labelWidth?: number | string;
  /** Label alignment */
  labelAlign?: FormLabelAlign;
  /** Whether to show validation message */
  showValidateMessage?: boolean;
  /** Change handler */
  onChange?: (value: any, name: string) => void;
  /** Status change handler */
  onStatusChange?: (status: ComponentStatus, name: string) => void;
}

// ==================== Enhanced Modal Types ====================

/** Modal types */
export type ModalType = 'info' | 'success' | 'warning' | 'error' | 'confirm';

/** Enhanced modal props */
export interface EnhancedModalProps extends CommonComponentProps {
  /** Modal title */
  title?: ReactNode;
  /** Modal content */
  content?: ReactNode;
  /** Modal type */
  type?: ModalType;
  /** Whether modal is visible */
  visible?: boolean;
  /** Whether to show close button */
  closable?: boolean;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether to close on mask click */
  maskClosable?: boolean;
  /** Whether to show cancel button */
  showCancel?: boolean;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button text */
  okText?: string;
  /** Whether to center modal */
  centered?: boolean;
  /** Modal width */
  width?: number | string;
  /** Modal z-index */
  zIndex?: number;
  /** Modal animation duration */
  duration?: number;
  /** Confirm handler */
  onOk?: () => void | Promise<void>;
  /** Cancel handler */
  onCancel?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** After close handler */
  afterClose?: () => void;
  /** Keyboard events */
  onKeyboard?: (event: KeyboardEvent) => void;
}

/** Enhanced modal ref */
export interface EnhancedModalRef {
  /** Show modal */
  show: () => void;
  /** Hide modal */
  hide: () => void;
  /** Toggle modal visibility */
  toggle: () => void;
  /** Get modal visibility */
  isVisible: () => boolean;
  /** Set modal content */
  setContent: (content: ReactNode) => void;
  /** Set modal title */
  setTitle: (title: ReactNode) => void;
  /** Set modal type */
  setType: (type: ModalType) => void;
  /** Set modal loading state */
  setLoading: (loading: boolean) => void;
  /** Focus modal */
  focus: () => void;
  /** Blur modal */
  blur: () => void;
}

// ==================== Enhanced Table Types ====================

/** Table column type */
export interface TableColumn<T = any> {
  /** Column title */
  title: ReactNode;
  /** Column key */
  key: string;
  /** Column data index */
  dataIndex?: string;
  /** Column render function */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** Column width */
  width?: number | string;
  /** Column align */
  align?: 'left' | 'center' | 'right';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is filterable */
  filterable?: boolean;
  /** Column fixed position */
  fixed?: 'left' | 'right' | boolean;
  /** Column className */
  className?: string;
  /** Column style */
  style?: React.CSSProperties;
  /** Sort function */
  sorter?: (a: T, b: T) => number;
  /** Filter options */
  filters?: Array<{ text: ReactNode; value: any }>;
  /** Filter function */
  onFilter?: (value: any, record: T) => boolean;
  /** Whether column is resizable */
  resizable?: boolean;
  /** Column tooltip */
  tooltip?: ReactNode;
}

/** Table pagination type */
export interface TablePagination {
  /** Current page */
  current: number;
  /** Page size */
  pageSize: number;
  /** Total items */
  total: number;
  /** Whether to show size changer */
  showSizeChanger?: boolean;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Whether to show quick jumper */
  showQuickJumper?: boolean;
  /** Whether to show total items */
  showTotal?: boolean;
  /** Page change handler */
  onChange?: (page: number, pageSize: number) => void;
  /** Page size change handler */
  onShowSizeChange?: (current: number, size: number) => void;
}

/** Enhanced table props */
export interface EnhancedTableProps<T = any> extends CommonComponentProps {
  /** Table data */
  data: T[];
  /** Table columns */
  columns: TableColumn<T>[];
  /** Table loading state */
  loading?: boolean;
  /** Table bordered */
  bordered?: boolean;
  /** Table size */
  size?: ComponentSize;
  /** Whether to show header */
  showHeader?: boolean;
  /** Whether to stripe rows */
  stripe?: boolean;
  /** Row selection configuration */
  rowSelection?: {
    /** Selected row keys */
    selectedRowKeys?: (string | number)[];
    /** Row selection type */
    type?: 'checkbox' | 'radio';
    /** Row selection change handler */
    onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
    /** Whether row can be selected */
    getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
  };
  /** Table scroll configuration */
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
  /** Table pagination */
  pagination?: TablePagination | false;
  /** Row click handler */
  onRowClick?: (record: T, index: number, event: ITouchEvent) => void;
  /** Row double click handler */
  onRowDoubleClick?: (record: T, index: number, event: ITouchEvent) => void;
  /** Row context menu handler */
  onRowContextMenu?: (record: T, index: number, event: ITouchEvent) => void;
  /** Header cell click handler */
  onHeaderCellClick?: (column: TableColumn<T>, event: ITouchEvent) => void;
  /** Table change handler */
  onChange?: (pagination: TablePagination, filters: Record<string, any>, sorter: any) => void;
  /** Empty text */
  emptyText?: ReactNode;
  /** Row key extractor */
  rowKey?: string | ((record: T, index: number) => string);
  /** Row className */
  rowClassName?: (record: T, index: number) => string;
  /** Row style */
  rowStyle?: (record: T, index: number) => React.CSSProperties;
}

/** Enhanced table ref */
export interface EnhancedTableRef {
  /** Get selected rows */
  getSelectedRows: () => any[];
  /** Get selected row keys */
  getSelectedRowKeys: () => (string | number)[];
  /** Set selected rows */
  setSelectedRows: (rows: any[]) => void;
  /** Scroll to row */
  scrollToRow: (index: number) => void;
  /** Scroll to column */
  scrollToColumn: (key: string) => void;
  /** Refresh table */
  refresh: () => void;
  /** Get table data */
  getData: () => any[];
  /** Set table data */
  setData: (data: any[]) => void;
  /** Get table columns */
  getColumns: () => TableColumn[];
  /** Set table columns */
  setColumns: (columns: TableColumn[]) => void;
}

// ==================== Enhanced Select Types ====================

/** Select option type */
export interface SelectOption {
  /** Option label */
  label: ReactNode;
  /** Option value */
  value: any;
  /** Option disabled state */
  disabled?: boolean;
  /** Option group */
  group?: string;
  /** Option tooltip */
  tooltip?: ReactNode;
}

/** Select option group type */
export interface SelectOptionGroup {
  /** Group label */
  label: ReactNode;
  /** Group options */
  options: SelectOption[];
}

/** Enhanced select props */
export interface EnhancedSelectProps
  extends CommonComponentProps,
    StrictOmit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'value' | 'onChange' | 'onFocus' | 'onBlur'> {
  /** Select value */
  value?: any | any[];
  /** Default value */
  defaultValue?: any | any[];
  /** Placeholder */
  placeholder?: ReactNode;
  /** Whether select is multiple */
  multiple?: boolean;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Whether select is loading */
  loading?: boolean;
  /** Whether select is clearable */
  clearable?: boolean;
  /** Whether to search */
  searchable?: boolean;
  /** Select options */
  options?: SelectOption[] | SelectOptionGroup[];
  /** Maximum selected items */
  maxCount?: number;
  /** Maximum tag count */
  maxTagCount?: number;
  /** Change handler */
  onChange?: (value: any | any[], option: SelectOption | SelectOption[]) => void;
  /** Search handler */
  onSearch?: (searchText: string) => void;
  /** Focus handler */
  onFocus?: TouchEventHandler<ITouchEvent>;
  /** Blur handler */
  onBlur?: TouchEventHandler<ITouchEvent>;
  /** Clear handler */
  onClear?: TouchEventHandler<ITouchEvent>;
  /** Dropdown render function */
  dropdownRender?: (menu: ReactNode) => ReactNode;
  /** Option render function */
  optionRender?: (option: SelectOption) => ReactNode;
  /** Tag render function */
  tagRender?: (props: { value: any; label: ReactNode; closable: boolean; onClose: () => void }) => ReactNode;
  /** Empty text */
  emptyText?: ReactNode;
  /** Filter option function */
  filterOption?: (input: string, option: SelectOption) => boolean;
  /** Custom validation */
  validator?: (value: any) => boolean | string;
}

/** Enhanced select ref */
export interface EnhancedSelectRef {
  /** Get select value */
  getValue: () => any | any[];
  /** Set select value */
  setValue: (value: any | any[]) => void;
  /** Get selected options */
  getSelectedOptions: () => SelectOption[];
  /** Focus select */
  focus: () => void;
  /** Blur select */
  blur: () => void;
  /** Clear select */
  clear: () => void;
  /** Open dropdown */
  open: () => void;
  /** Close dropdown */
  close: () => void;
  /** Toggle dropdown */
  toggle: () => void;
  /** Search options */
  search: (searchText: string) => void;
  /** Refresh options */
  refresh: () => void;
}

// ==================== Enhanced Loading Types ====================

/** Loading types */
export type LoadingType = 'spinner' | 'dots' | 'pulse' | 'bars' | 'circle';

/** Enhanced loading props */
export interface EnhancedLoadingProps extends CommonComponentProps {
  /** Loading text */
  text?: ReactNode;
  /** Loading type */
  type?: LoadingType;
  /** Loading size */
  size?: ComponentSize | number;
  /** Loading color */
  color?: string;
  /** Whether loading is full screen */
  fullscreen?: boolean;
  /** Whether to show mask */
  mask?: boolean;
  /** Mask color */
  maskColor?: string;
  /** Loading delay */
  delay?: number;
  /** Whether to center loading */
  centered?: boolean;
  /** Whether to prevent scroll */
  preventScroll?: boolean;
  /** Loading duration */
  duration?: number;
  /** Animation duration */
  animationDuration?: number;
  /** Custom loading icon */
  icon?: ReactNode;
  /** Custom loading style */
  loadingStyle?: React.CSSProperties;
  /** Custom text style */
  textStyle?: React.CSSProperties;
}

/** Enhanced loading ref */
export interface EnhancedLoadingRef {
  /** Show loading */
  show: () => void;
  /** Hide loading */
  hide: () => void;
  /** Toggle loading visibility */
  toggle: () => void;
  /** Get loading visibility */
  isVisible: () => boolean;
  /** Set loading text */
  setText: (text: ReactNode) => void;
  /** Set loading type */
  setType: (type: LoadingType) => void;
  /** Set loading size */
  setSize: (size: ComponentSize | number) => void;
  /** Set loading color */
  setColor: (color: string) => void;
  /** Set loading progress */
  setProgress: (progress: number) => void;
}

// ==================== Enhanced Message Types ====================

/** Message types */
export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading';

/** Enhanced message props */
export interface EnhancedMessageProps extends CommonComponentProps {
  /** Message content */
  content: ReactNode;
  /** Message type */
  type?: MessageType;
  /** Message duration */
  duration?: number;
  /** Whether message is closable */
  closable?: boolean;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Custom close icon */
  closeIcon?: ReactNode;
  /** Message action */
  action?: ReactNode;
  /** Message placement */
  placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
  /** Message max count */
  maxCount?: number;
  /** Whether to pause on hover */
  pauseOnHover?: boolean;
  /** Whether to show progress */
  showProgress?: boolean;
  /** Progress duration */
  progressDuration?: number;
  /** Close handler */
  onClose?: () => void;
  /** Click handler */
  onClick?: TouchEventHandler<ITouchEvent>;
  /** Mouse enter handler */
  onMouseEnter?: TouchEventHandler<ITouchEvent>;
  /** Mouse leave handler */
  onMouseLeave?: TouchEventHandler<ITouchEvent>;
}

// ==================== Enhanced Toast Types ====================

/** Toast types */
export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading';

/** Toast position */
export type ToastPosition = 'top' | 'center' | 'bottom';

/** Enhanced toast props */
export interface EnhancedToastProps extends CommonComponentProps {
  /** Toast content */
  content: ReactNode;
  /** Toast type */
  type?: ToastType;
  /** Toast position */
  position?: ToastPosition;
  /** Toast duration */
  duration?: number;
  /** Whether toast is visible */
  visible?: boolean;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether to close on mask click */
  maskClosable?: boolean;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Toast title */
  title?: ReactNode;
  /** Toast action */
  action?: ReactNode;
  /** Toast z-index */
  zIndex?: number;
  /** Toast animation duration */
  duration?: number;
  /** Close handler */
  onClose?: () => void;
  /** Click handler */
  onClick?: TouchEventHandler<ITouchEvent>;
  /** Show handler */
  onShow?: () => void;
  /** Hide handler */
  onHide?: () => void;
}

/** Enhanced toast ref */
export interface EnhancedToastRef {
  /** Show toast */
  show: () => void;
  /** Hide toast */
  hide: () => void;
  /** Toggle toast visibility */
  toggle: () => void;
  /** Get toast visibility */
  isVisible: () => boolean;
  /** Set toast content */
  setContent: (content: ReactNode) => void;
  /** Set toast type */
  setType: (type: ToastType) => void;
  /** Set toast position */
  setPosition: (position: ToastPosition) => void;
  /** Set toast duration */
  setDuration: (duration: number) => void;
}

// ==================== Export ====================

export type {
  ComponentSize,
  ComponentVariant,
  ComponentStatus,
  ComponentShape,
  InputType,
  InputVariant,
  FormLayout,
  FormLabelAlign,
  ModalType,
  LoadingType,
  MessageType,
  ToastType,
  ToastPosition,
};

export {
  CommonComponentProps,
  EnhancedButtonProps,
  EnhancedButtonRef,
  EnhancedInputProps,
  EnhancedInputRef,
  EnhancedFormProps,
  EnhancedFormRef,
  EnhancedFormItemProps,
  EnhancedModalProps,
  EnhancedModalRef,
  EnhancedTableProps,
  EnhancedTableRef,
  EnhancedSelectProps,
  EnhancedSelectRef,
  EnhancedLoadingProps,
  EnhancedLoadingRef,
  EnhancedMessageProps,
  EnhancedToastProps,
  EnhancedToastRef,
};