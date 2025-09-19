import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { tagStyles } from './Tag.styles';
import type { TagProps, TagRef } from './Tag.types';

/** 标签组件 */
export const TagComponent = forwardRef<TagRef, TagProps>((props, ref) => {
  const {
    children,
    color = 'default',
    size = 'medium',
    variant = 'solid',
    closable = false,
    checkable = false,
    checked = false,
    icon,
    onClick,
    onClose,
    onCheckedChange,
    style,
    className,
    ...rest
  } = props;

  const [checkedState, setCheckedState] = useState(checked);
  const [visible, setVisible] = useState(true);
  const elementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    element: elementRef.current,
    getColor: () => color,
    getSize: () => size,
    isClosable: () => closable,
    isCheckable: () => checkable,
    isChecked: () => checkedState,
    setChecked: (checked: boolean) => {
      setCheckedState(checked);
      onCheckedChange?.(checked);
    },
    close: () => {
      setVisible(false);
      onClose?.({} as any);
    },
  }));

  const handleClick = (event: any) => {
    event.stopPropagation();
    
    if (checkable) {
      const newChecked = !checkedState;
      setCheckedState(newChecked);
      onCheckedChange?.(newChecked);
    }
    
    onClick?.(event);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setVisible(false);
    onClose?.(event);
  };

  const getTagStyle = () => {
    const colorKey = `${color}${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    
    const baseStyle = {
      ...tagStyles['base'],
      ...tagStyles[size],
      ...tagStyles[colorKey as keyof typeof tagStyles] || tagStyles['defaultSolid'],
      ...style,
    };

    if (onClick || checkable) {
      Object.assign(baseStyle, tagStyles['clickable']);
    }

    if (checkable) {
      Object.assign(baseStyle, tagStyles['checkable']);
      if (checkedState) {
        Object.assign(baseStyle, tagStyles['checked']);
      }
    }

    if (onClick || checkable) {
      Object.assign(baseStyle, tagStyles['clickable']);
    }

    // 处理自定义颜色
    if (!['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(color)) {
      if (variant === 'solid') {
        baseStyle.backgroundColor = color;
        baseStyle.borderColor = color;
        baseStyle.color = '#ffffff';
      } else if (variant === 'outline') {
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderColor = color;
        baseStyle.color = color;
      } else if (variant === 'light') {
        baseStyle.backgroundColor = `${color}20`;
        baseStyle.borderColor = 'transparent';
        baseStyle.color = color;
      }
    }

    return baseStyle;
  };

  const getCloseIconStyle = () => {
    const baseStyle = {
      ...tagStyles['closeIcon'],
    };

    return baseStyle;
  };

  if (!visible) {
    return null;
  }

  return (
    <View
      ref={elementRef}
      style={getTagStyle()}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      <View style={tagStyles['content']}>
        {icon && (
          <View style={tagStyles['icon']}>
            {icon}
          </View>
        )}
        {children && (
          <Text style={tagStyles['text']}>
            {children}
          </Text>
        )}
        {closable && (
          <Text
            style={getCloseIconStyle()}
            onClick={handleClose}
          >
            ×
          </Text>
        )}
      </View>
    </View>
  );
});

TagComponent.displayName = 'Tag';

export const Tag = TagComponent;
export default Tag;