import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { modalStyles } from './Modal.styles';
import type { ModalProps, ModalRef, ModalButton } from './Modal.types';

/** Modal组件 */
export const ModalComponent = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const {
    visible: controlledVisible,
    defaultVisible = false,
    title,
    content,
    buttons = [],
    closable = true,
    mask = true,
    maskClosable = true,
    keyboard = true,
    centered = true,
    size = 'default',
    position = 'center',
    width,
    height,
    fullscreen = false,
    animated = true,
    animationDuration = 300,
    destroyOnClose = false,
    forceRender = false,
    getContainer,
    onMaskClick,
    onShow,
    onHide,
    onOk,
    onCancel,
    onButtonClick,
    onClose,
    className,
    style,
    ...restProps
  } = props;

  const modalRef = useRef<any>(null);
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const [internalTitle, setInternalTitle] = useState(title);
  const [internalContent, setInternalContent] = useState(content);
  const [internalButtons, setInternalButtons] = useState<ModalButton[]>(buttons);

  // 处理受控模式
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setInternalVisible(controlledVisible);
    }
  }, [controlledVisible]);

  useEffect(() => {
    setInternalTitle(title);
  }, [title]);

  useEffect(() => {
    setInternalContent(content);
  }, [content]);

  useEffect(() => {
    setInternalButtons(buttons);
  }, [buttons]);

  // 处理显示/隐藏
  useEffect(() => {
    if (internalVisible) {
      onShow?.();
      // 添加键盘事件监听
      if (keyboard) {
        document.addEventListener('keydown', handleKeyDown);
      }
    } else {
      onHide?.();
      // 移除键盘事件监听
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [internalVisible, keyboard, onShow, onHide]);

  // 处理键盘事件
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  }, []);

  // 处理遮罩点击
  const handleMaskClick = useCallback(
    (event: React.MouseEvent) => {
      if (maskClosable) {
        onMaskClick?.(event);
        handleCancel();
      }
    },
    [maskClosable, onMaskClick],
  );

  // 处理关闭
  const handleClose = useCallback(() => {
    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
    onClose?.();
  }, [controlledVisible, onClose]);


  // 处理取消
  const handleCancel = useCallback(() => {
    onCancel?.();
    handleClose();
  }, [onCancel, handleClose]);

  // 处理按钮点击
  const handleButtonClick = useCallback(
    async (button: ModalButton) => {
      try {
        await button.onClick?.();
        onButtonClick?.(button);
        handleClose();
      } catch (error) {
        // 处理异步操作中的错误
        console.error('Modal button onClick error:', error);
      }
    },
    [onButtonClick, handleClose],
  );

  // 渲染按钮
  const renderButtons = () => {
    return internalButtons.map((button, index) => {
      const isDisabled = button.disabled || false;
      const isLoading = button.loading || false;

      return (
        <View
          key={button.key || index}
          className={`taro-uno-modal__button ${modalStyles.button} ${button.type === 'primary' ? modalStyles.primary : button.type === 'danger' ? modalStyles.danger : modalStyles.secondary} ${
            isDisabled ? 'taro-uno-modal__button--disabled' : ''
          } ${isLoading ? 'taro-uno-modal__button--loading' : ''}`}
          onClick={() => !isDisabled && !isLoading && handleButtonClick(button)}
        >
          {isLoading ? '加载中...' : button.text}
        </View>
      );
    });
  };

  // 渲染关闭按钮
  const renderCloseButton = () => {
    if (!closable) return null;

    return (
      <View className={`taro-uno-modal__close ${modalStyles.close}`} onClick={handleClose}>
        ×
      </View>
    );
  };

  // 计算样式
  const modalStyle = {
    ...style,
  };

  // 计算类名
  const modalClassName = `${modalStyles.container} ${modalStyles.content} ${className || ''}`;

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: modalRef.current,
      show: () => {
        if (controlledVisible === undefined) {
          setInternalVisible(true);
        }
      },
      hide: () => {
        if (controlledVisible === undefined) {
          setInternalVisible(false);
        }
      },
      toggle: () => {
        if (controlledVisible === undefined) {
          setInternalVisible(!internalVisible);
        }
      },
      isVisible: () => internalVisible,
      setTitle: (newTitle) => {
        setInternalTitle(newTitle);
      },
      setContent: (newContent) => {
        setInternalContent(newContent);
      },
      setButtons: (newButtons) => {
        setInternalButtons(newButtons);
      },
      addButton: (newButton) => {
        setInternalButtons((prev) => [...prev, newButton]);
      },
      removeButton: (key) => {
        setInternalButtons((prev) => prev.filter((btn) => btn.key !== key));
      },
      focus: () => {
        modalRef.current?.focus();
      },
    }),
    [internalVisible, controlledVisible],
  );

  // 如果销毁关闭且不显示，则不渲染
  if (destroyOnClose && !internalVisible && !forceRender) {
    return null;
  }

  return (
    <>
      {mask && internalVisible && (
        <View className="taro-uno-modal__mask" onClick={handleMaskClick} />
      )}
      {internalVisible && (
        <View ref={modalRef} className={modalClassName} style={modalStyle} {...restProps}>
          {renderCloseButton()}
          {internalTitle && (
            <View className={`taro-uno-modal__header ${modalStyles.header}`}>
              <Text className="taro-uno-modal__title">{internalTitle}</Text>
            </View>
          )}
          <View className={`taro-uno-modal__body ${modalStyles.body}`}>
            {internalContent}
          </View>
          {internalButtons.length > 0 && (
            <View className={`taro-uno-modal__footer ${modalStyles.footer}`}>
              {renderButtons()}
            </View>
          )}
        </View>
      )}
    </>
  );
});

/** Modal组件显示名称 */
ModalComponent.displayName = 'Modal';

/** Modal组件类型 */
interface ModalStatic {
  new (props: ModalProps): React.ReactElement;
  confirm: (config: ModalProps) => void;
  info: (config: ModalProps) => void;
  success: (config: ModalProps) => void;
  error: (config: ModalProps) => void;
  warning: (config: ModalProps) => void;
}

/** 导出Modal组件 */
const Modal = ModalComponent as any as ModalStatic;

/** 静态方法 */
Modal.confirm = (config: ModalProps) => {
  // 这里可以实现一个全局的确认框
  // 需要配合全局状态管理或Portal实现
  console.log('Modal.confirm', config);
};

Modal.info = (config: ModalProps) => {
  // 信息提示框
  console.log('Modal.info', config);
};

Modal.success = (config: ModalProps) => {
  // 成功提示框
  console.log('Modal.success', config);
};

Modal.error = (config: ModalProps) => {
  // 错误提示框
  console.log('Modal.error', config);
};

Modal.warning = (config: ModalProps) => {
  // 警告提示框
  console.log('Modal.warning', config);
};

export { Modal };
export default ModalComponent;
