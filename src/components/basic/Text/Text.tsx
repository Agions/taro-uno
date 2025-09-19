import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Text as TaroText, View } from '@tarojs/components';
import { textStyles } from './Text.styles';
import type { TextProps, TextRef } from './Text.types';

/** 文本组件 */
export const TextComponent = forwardRef<TextRef, TextProps>((props, ref) => {
  const {
    children,
    size = 'md',
    weight = 'normal',
    color = 'inherit',
    align = 'left',
    decoration = 'none',
    transform = 'none',
    overflow = 'clip',
    direction = 'ltr',
    fontStyle = 'normal',
    variant = 'normal',
    letterSpacing = 'normal',
    lineHeight = 'normal',
    status = 'normal',
    type = 'body',
    clickable = false,
    loading = false,
    disabled = false,
    block = false,
    inlineBlock = false,
    selectable = false,
    copyable = false,
    onCopy,
    className,
    onClick,
    style,
    maxLines,
    animated = false,
    animationDuration = 300,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'text',
    accessibilityState,
    href,
    target = '_self',
    underline = false,
    strikethrough = false,
    highlight = false,
    highlightColor = '#fef3c7',
    ellipsis = false,
    wrap = true,
    breakWord = false,
    textShadow,
    textOutline,
    gradient,
    fontFamily,
    wordSpacing,
    textIndent,
    whiteSpace,
    verticalAlign,
    writingMode,
    textRendering,
    // 排除可能与Taro组件冲突的React属性
    dangerouslySetInnerHTML,
    suppressContentEditableWarning,
    suppressHydrationWarning,
    ...restProps
  } = props;

  const textRef = useRef<HTMLParagraphElement | HTMLSpanElement>(null);
  const [internalStatus, setInternalStatus] = useState(status);
  const [internalLoading, setInternalLoading] = useState(loading);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [isCopied, setIsCopied] = useState(false);

  // 更新内部状态
  useEffect(() => {
    setInternalStatus(status);
  }, [status]);

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (internalDisabled || internalLoading || !clickable) return;

      // 处理链接跳转
      if (href) {
        if (target === '_blank') {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }

      onClick?.(event);
    },
    [onClick, href, target, internalDisabled, internalLoading, clickable],
  );

  // 处理复制功能
  const handleCopy = useCallback(async () => {
    if (!copyable || !textRef.current) return;

    try {
      const text = textRef.current.textContent || '';
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      onCopy?.();

      // 2秒后重置复制状态
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [copyable, onCopy]);

  // 处理选择功能
  const handleSelect = useCallback(() => {
    if (!selectable || !textRef.current) return;

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(textRef.current);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [selectable]);

  // 渲染加载状态
  const renderLoading = () => {
    return <View className="taro-uno-text__loading" style={textStyles['getLoadingStyle']()} />;
  };

  // 渲染复制按钮
  const renderCopyButton = () => {
    if (!copyable) return null;

    return (
      <View
        className="taro-uno-text__copy-button"
        onClick={handleCopy}
        style={{
          marginLeft: '8px',
          cursor: 'pointer',
          opacity: isCopied ? 0.6 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {isCopied ? '✓' : '📋'}
      </View>
    );
  };

  // 计算最终样式
  const textStyle = textStyles['getStyle']({
    size,
    weight,
    color,
    align,
    decoration,
    transform,
    overflow,
    direction,
    fontStyle,
    variant,
    letterSpacing,
    lineHeight,
    status: internalStatus,
    loading: internalLoading,
    disabled: internalDisabled,
    maxLines,
    animated,
    animationDuration,
    underline,
    strikethrough,
    highlight,
    highlightColor,
    ellipsis,
    wrap,
    breakWord,
    textShadow,
    textOutline,
    gradient,
    fontFamily,
    wordSpacing,
    textIndent,
    whiteSpace,
    verticalAlign,
    writingMode,
    textRendering,
    style,
  });

  // 计算最终类名
  const textClassName = textStyles['getClassName']({
    size,
    weight,
    color,
    align,
    decoration,
    transform,
    overflow,
    direction,
    fontStyle,
    variant,
    letterSpacing,
    lineHeight,
    status: internalStatus,
    type,
    clickable,
    loading: internalLoading,
    disabled: internalDisabled,
    block,
    inlineBlock,
    selectable,
    copyable,
    animated,
    underline,
    strikethrough,
    highlight,
    ellipsis,
    wrap,
    breakWord,
    className,
  });

  // 选择渲染元素
  const TextElement = href ? 'a' : block ? 'div' : inlineBlock ? 'span' : TaroText;

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: textRef.current,
      getText: () => textRef.current?.textContent || '',
      setText: (text: string) => {
        if (textRef.current) {
          textRef.current.textContent = text;
        }
      },
      copy: async () => {
        if (textRef.current) {
          const text = textRef.current.textContent || '';
          await navigator.clipboard.writeText(text);
        }
      },
      select: handleSelect,
      setDisabled: (disabled: boolean) => {
        setInternalDisabled(disabled);
        setInternalStatus(disabled ? 'disabled' : 'normal');
      },
      setLoading: (loading: boolean) => {
        setInternalLoading(loading);
        setInternalStatus(loading ? 'loading' : 'normal');
      },
      getStatus: () => internalStatus,
      getSize: () => size,
      getColor: () => {
        return color || '';
      },
      setColor: (newColor: string) => {
        if (textRef.current) {
          textRef.current.style.color = newColor;
        }
      },
      setSize: (newSize: typeof size) => {
        if (textRef.current) {
          const sizeStyles = textStyles.SIZE_MAP[newSize];
          textRef.current.style.fontSize = `${sizeStyles['fontSize']}px`;
          textRef.current.style.lineHeight = `${sizeStyles._lineHeight}`;
        }
      },
      setWeight: (newWeight: typeof weight) => {
        if (textRef.current) {
          const weightValue = textStyles.WEIGHT_MAP[newWeight];
          textRef.current.style.fontWeight = String(weightValue);
        }
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        textRef.current?.scrollIntoView(options);
      },
    }),
    [internalDisabled, internalLoading, internalStatus, size, color, weight, handleSelect],
  );

  // 无障碍状态
  const finalAccessibilityState = JSON.stringify({
    disabled: internalDisabled,
    busy: internalLoading,
    ...accessibilityState,
  });

  // 处理链接属性
  const linkProps = href
    ? {
        href,
        target,
        rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      }
    : {};

  // 构建无障碍属性
  const accessibilityProps = {
    'aria-label': accessibilityLabel,
    'aria-disabled': internalDisabled ? 'true' : 'false',
    'aria-busy': internalLoading ? 'true' : 'false',
    role: href ? 'link' : accessibilityRole,
  };

  return (
    <View className="taro-uno-text-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
      {internalLoading && renderLoading()}

      <TextElement
        ref={textRef as any}
        className={textClassName}
        style={textStyle}
        onClick={handleClick}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={href ? 'link' : accessibilityRole}
        accessibilityState={finalAccessibilityState}
        selectable={selectable}
        {...linkProps}
        {...accessibilityProps}
        {...(restProps as any)}
      >
        {children}
      </TextElement>

      {renderCopyButton()}
    </View>
  );
});

/** 文本组件显示名称 */
TextComponent.displayName = 'Text';

/** 导出文本组件 */
export const Text = TextComponent;
export default TextComponent;
