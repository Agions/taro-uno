import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { TypographyProps, TypographyRef } from './Typography.types';
import { calculateTypographyStyles } from './Typography.styles';

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
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: styles.fontSize,
            fontFamily: styles.fontFamily,
          }}
          autoFocus
        />
        <button
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
        </button>
        <button
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
        </button>
      </div>
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

    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return React.createElement(variant, commonProps, children);
      case 'p':
        return React.createElement('p', commonProps, children);
      case 'span':
        return React.createElement('span', commonProps, children);
      default:
        return React.createElement('span', commonProps, children);
    }
  };

  return (
    <>
      {renderContent()}
      {copyable && (
        <span
          style={{
            marginLeft: '8px',
            fontSize: '12px',
            color: '#6b7280',
            cursor: 'pointer',
          }}
          onClick={handleCopy}
        >
          📋
        </span>
      )}
      {editable && (
        <span
          style={{
            marginLeft: '8px',
            fontSize: '12px',
            color: '#6b7280',
            cursor: 'pointer',
          }}
          onClick={handleEdit}
        >
          ✏️
        </span>
      )}
    </>
  );
});

Typography.displayName = 'Typography';

export default Typography;
