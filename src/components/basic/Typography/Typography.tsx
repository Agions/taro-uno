import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Text as TaroText, View, Input, Button } from '@tarojs/components';
import { TypographyProps, TypographyRef, TitleProps, ParagraphProps, TypographyTextProps } from './Typography.types';
import { calculateTypographyStyles } from './Typography.styles';

// 扩展 Typography 组件类型，包含子组件
export interface TypographyComponent
  extends React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<TypographyRef>> {
  Title: React.ForwardRefExoticComponent<TitleProps & React.RefAttributes<TypographyRef>>;
  Paragraph: React.ForwardRefExoticComponent<ParagraphProps & React.RefAttributes<TypographyRef>>;
  Text: React.ForwardRefExoticComponent<TypographyTextProps & React.RefAttributes<TypographyRef>>;
}

/**
 * Typography 排版组件
 * 提供丰富的文本排版功能，包括标题、段落、文本、链接等
 */
export const Typography = forwardRef<TypographyRef, TypographyProps>((props, ref) => {
  const {
    children,
    variant = 'p',
    type,
    align,
    disabled = false,
    copyable = false,
    editable = false,
    delete: isDelete = false,
    underline = false,
    code = false,
    keyboard = false,
    strong = false,
    italic = false,
    className,
    style,
    onClick,
    onCopy,
    onEdit,
    ...restProps
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  // 处理复制功能
  const handleCopy = useCallback(async () => {
    try {
      const text = typeof children === 'string' ? children : String(children);
      await navigator.clipboard.writeText(text);
      onCopy?.();
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [children, onCopy]);

  // 处理编辑功能
  const handleEdit = useCallback(() => {
    const text = typeof children === 'string' ? children : String(children);
    setEditText(text);
    setIsEditing(true);
  }, [children]);

  // 处理编辑完成
  const handleEditComplete = useCallback(() => {
    onEdit?.(editText);
    setIsEditing(false);
    setEditText('');
  }, [editText, onEdit]);

  // 处理编辑取消
  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditText('');
  }, []);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getText: () => {
      return typeof children === 'string' ? children : String(children);
    },
    copy: handleCopy,
    edit: (text: string) => {
      setEditText(text);
      setIsEditing(true);
    },
  }));

  // 计算样式
  const styles = calculateTypographyStyles(props);

  // 处理点击事件
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (copyable) {
        e.preventDefault();
        handleCopy();
      } else if (editable) {
        e.preventDefault();
        handleEdit();
      } else {
        onClick?.(e);
      }
    },
    [copyable, editable, handleCopy, handleEdit, onClick],
  );

  // 渲染编辑状态
  if (isEditing) {
    return (
      <View style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <Input
          type="text"
          value={editText}
          onInput={(e) => setEditText(e.detail.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: styles.fontSize,
            fontFamily: styles.fontFamily,
          }}
          autoFocus
        />
        <Button
          onClick={handleEditComplete}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          确定
        </Button>
        <Button
          onClick={handleEditCancel}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          取消
        </Button>
      </View>
    );
  }

  // 根据变体渲染不同的元素
  const renderContent = () => {
    const commonProps = {
      style: styles,
      className,
      onClick: handleClick,
      ...restProps,
    };

    // 在 Taro 中，所有文本都应该使用 Text 组件
    // 根据 variant 设置不同的样式来模拟标题和段落效果
    return <TaroText {...commonProps}>{children}</TaroText>;
  };

  return (
    <>
      {renderContent()}
      {copyable && (
        <TaroText
          style={{
            marginLeft: '8px',
            fontSize: '12px',
            color: '#6b7280',
            cursor: 'pointer',
          }}
          onClick={handleCopy}
        >
          📋
        </TaroText>
      )}
      {editable && (
        <TaroText
          style={{
            marginLeft: '8px',
            fontSize: '12px',
            color: '#6b7280',
            cursor: 'pointer',
          }}
          onClick={handleEdit}
        >
          ✏️
        </TaroText>
      )}
    </>
  );
});

Typography.displayName = 'Typography';

// Title 子组件
const Title = forwardRef<TypographyRef, TitleProps>((props, ref) => {
  const { level = 1, children, ...restProps } = props;
  // 处理 level 可能是字符串的情况（如 "h1", "h2" 等）
  let variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  if (typeof level === 'string') {
    // 如果是 "h1", "h2" 等格式，直接使用
    variant = level as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  } else {
    // 如果是数字，转换为 "h1", "h2" 等格式
    variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }

  return (
    <Typography ref={ref} variant={variant} {...restProps}>
      {children}
    </Typography>
  );
});

Title.displayName = 'Typography.Title';

// Paragraph 子组件
const Paragraph = forwardRef<TypographyRef, ParagraphProps>((props, ref) => {
  return (
    <Typography ref={ref} variant="p" {...props}>
      {props.children}
    </Typography>
  );
});

Paragraph.displayName = 'Typography.Paragraph';

// Text 子组件
const Text = forwardRef<TypographyRef, TypographyTextProps>((props, ref) => {
  return (
    <Typography ref={ref} variant="span" {...props}>
      {props.children}
    </Typography>
  );
});

Text.displayName = 'Typography.Text';

// 将子组件附加到 Typography 组件上
(Typography as TypographyComponent).Title = Title;
(Typography as TypographyComponent).Paragraph = Paragraph;
(Typography as TypographyComponent).Text = Text;

export default Typography as TypographyComponent;
