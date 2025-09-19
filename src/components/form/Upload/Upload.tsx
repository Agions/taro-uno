import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { Button } from '../../basic/Button';
import { Text } from '../../basic/Text';
import type { ITouchEvent } from '@tarojs/components';
import type { UploadProps, UploadRef, UploadFile } from './Upload.types';

/** 上传组件 */
export const UploadComponent = forwardRef<UploadRef, UploadProps>((props, ref) => {
  const {
    accept,
    multiple = false,
    disabled = false,
    maxCount,
    maxSize,
    fileList: controlledFileList,
    defaultFileList = [],
    action,
    headers = {},
    withCredentials = false,
    beforeUpload,
    customRequest,
    onChange,
    onRemove,
    onPreview,
    onSuccess,
    onError,
    onProgress,
    showUploadList = true,
    listType = 'text',
    drag = false,
    children,
    className,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'button',
    accessibilityState,
    ...restProps
  } = props;

  const containerRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const [uploading, setUploading] = useState(false);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const isDragOver = false;

  // 处理受控/非受控模式
  const isControlled = controlledFileList !== undefined;
  const fileList = isControlled ? controlledFileList : internalFileList;

  // 更新内部状态
  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  // 处理文件变化
  const handleFileChange = useCallback(
    (newFileList: UploadFile[]) => {
      if (!isControlled) {
        setInternalFileList(newFileList);
      }
      onChange?.(newFileList);
    },
    [isControlled, onChange],
  );

  // 验证文件
  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      if (accept && !file.type.match(accept.replace('*', '.*'))) {
        return { valid: false, error: `File type ${file.type} is not supported` };
      }
      
      if (maxSize && file.size > maxSize) {
        return { valid: false, error: `File size ${file.size} exceeds maximum size ${maxSize}` };
      }
      
      return { valid: true };
    },
    [accept, maxSize],
  );

  // 处理文件选择
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || internalDisabled) return;

      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        const validation = validateFile(file);
        if (!validation.valid) {
          onError?.(new Error(validation.error!), file);
        }
        return validation.valid;
      });

      const limitedFiles = maxCount ? validFiles.slice(0, maxCount - fileList.length) : validFiles;
      
      limitedFiles.forEach(file => {
        uploadFile(file);
      });
    },
    [internalDisabled, validateFile, maxCount, fileList.length, onError],
  );

  // 上传文件
  const uploadFile = useCallback(
    async (file: File) => {
      if (internalDisabled) return;

      try {
        // 上传前验证
        if (beforeUpload) {
          const result = await beforeUpload(file);
          if (result === false) return;
          if (result instanceof File) {
            file = result;
          }
        }

        const uidString = String(Date.now() + Math.random());
        const newFile: UploadFile = {
          uid: uidString,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          percent: 0,
          originFileObj: file,
        };

        const newFileList = [...fileList, newFile];
        handleFileChange(newFileList);
        setUploading(true);

        // 上传逻辑
        if (customRequest) {
          await customRequest({
            file,
            filename: file.name,
            data: {},
            headers,
            withCredentials,
            action: action || '',
            onProgress: (percent: number) => {
              const updatedFileList: UploadFile[] = fileList.map(f =>
                f.uid === uidString ? { ...f, percent, status: 'uploading' as const } : f
              );
              handleFileChange(updatedFileList);
              onProgress?.(percent, file);
            },
            onSuccess: (response: any) => {
              const updatedFileList: UploadFile[] = fileList.map(f =>
                f.uid === uidString ? { ...f, status: 'done' as const, response } : f
              );
              handleFileChange(updatedFileList);
              onSuccess?.(response, file);
              setUploading(false);
            },
            onError: (error: Error) => {
              const updatedFileList: UploadFile[] = fileList.map(f =>
                f.uid === uidString ? { ...f, status: 'error' as const, error } : f
              );
              handleFileChange(updatedFileList);
              onError?.(error, file);
              setUploading(false);
            },
          });
        } else {
          // 模拟上传
          for (let percent = 0; percent <= 100; percent += 10) {
            const updatedFileList: UploadFile[] = fileList.map(f =>
              f.uid === uidString ? { ...f, percent, status: 'uploading' as const } : f
            );
            handleFileChange(updatedFileList);
            onProgress?.(percent, file);
            await new Promise(resolve => setTimeout(resolve, 100));
          }

          const updatedFileList: UploadFile[] = fileList.map(f =>
            f.uid === uidString ? { ...f, status: 'done' as const, response: { success: true } } : f
          );
          handleFileChange(updatedFileList);
          onSuccess?.({ success: true }, file);
          setUploading(false);
        }
      } catch (error) {
        // Find the uploading file (the most recent one) and mark it as error
        const uploadingFile = fileList.find(f => f.status === 'uploading');
        if (uploadingFile) {
          const errorObj = error instanceof Error ? error : new Error(String(error));
          const updatedFileList: UploadFile[] = fileList.map(f =>
            f.uid === uploadingFile.uid ? { ...f, status: 'error' as const, error: errorObj } : f
          );
          handleFileChange(updatedFileList);
        }
        onError?.(error as Error, file);
        setUploading(false);
      }
    },
    [internalDisabled, beforeUpload, customRequest, action, headers, withCredentials, fileList, handleFileChange, onProgress, onSuccess, onError],
  );

  // 移除文件
  const handleRemove = useCallback(
    (file: UploadFile) => {
      const newFileList = fileList.filter(f => f.uid !== file.uid);
      handleFileChange(newFileList);
      onRemove?.(file);
    },
    [fileList, handleFileChange, onRemove],
  );

  // 预览文件
  const handlePreview = useCallback(
    (file: UploadFile) => {
      onPreview?.(file);
    },
    [onPreview],
  );

  
  // 处理点击事件
  const handleClick = useCallback(
    (_event: ITouchEvent) => {
      if (internalDisabled) return;
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },
    [internalDisabled],
  );

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: containerRef.current,
      getFileList: () => fileList,
      clearFileList: () => {
        handleFileChange([]);
      },
      upload: (file: File) => {
        uploadFile(file);
      },
      abort: (file: UploadFile) => {
        const newFileList: UploadFile[] = fileList.map(f =>
          f.uid === file.uid ? { ...f, status: 'error' as const, error: new Error('Upload aborted') } : f
        );
        handleFileChange(newFileList);
      },
      isDisabled: () => internalDisabled,
      setUploading: (loading: boolean) => {
        setUploading(loading);
      },
      isUploading: () => uploading,
      reset: () => {
        if (!isControlled) {
          setInternalFileList(defaultFileList);
        }
      },
    }),
    [fileList, handleFileChange, uploadFile, internalDisabled, uploading, isControlled, defaultFileList],
  );

  // 生成容器样式
  const containerStyle = {
    width: '100%',
    ...style,
  };

  // 生成拖拽区域样式
  const dragAreaStyle = {
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: isDragOver ? '#f0f9ff' : '#ffffff',
    borderColor: isDragOver ? '#0ea5e9' : '#d1d5db',
    transition: 'all 0.3s ease',
    cursor: internalDisabled ? 'not-allowed' : 'pointer',
    opacity: internalDisabled ? 0.5 : 1,
  };

  // 生成文件列表样式
  const fileListStyle = {
    marginTop: '16px',
    width: '100%',
  };

  // 生成文件项样式
  const fileItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  };

  // 生成文件信息样式
  const fileInfoStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  };

  // 生成文件操作样式
  const fileActionsStyle = {
    display: 'flex',
    gap: '8px',
  };

  // 生成按钮样式
  const buttonStyle = {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid transparent',
    cursor: 'pointer',
  };

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,    busy: uploading,    ...accessibilityState,
  };


  // 渲染上传按钮
  const renderUploadButton = useCallback(() => {
    if (children) {
      return children;
    }

    return (
      <Button
        type="primary"
        size="small"
        disabled={internalDisabled || !!maxCount && fileList.length >= maxCount}
        loading={uploading}
        style={buttonStyle}
      >
        <Text style={{ color: '#ffffff', fontSize: 12 }}>
          {multiple ? '选择文件' : '上传文件'}
        </Text>
      </Button>
    );
  }, [children, internalDisabled, maxCount, fileList.length, uploading, multiple, buttonStyle]);

  // 渲染文件列表
  const renderFileList = useCallback(() => {
    if (!showUploadList) return null;

    return (
      <View style={fileListStyle}>
        {fileList.map(file => (
          <View key={file.uid} style={fileItemStyle}>
            <View style={fileInfoStyle}>
              <Text style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
                {file.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>
                {(file.size / 1024).toFixed(2)} KB
              </Text>
              {file.status === 'uploading' && (
                <Text style={{ fontSize: 12, color: '#3b82f6' }}>
                  {file.percent}%
                </Text>
              )}
              {file.status === 'error' && (
                <Text style={{ fontSize: 12, color: '#ef4444' }}>
                  上传失败
                </Text>
              )}
            </View>
            <View style={fileActionsStyle}>
              {file.status === 'done' && onPreview && (
                <Button
                  size="small"
                  onClick={() => handlePreview(file)}
                  style={{ ...buttonStyle, color: '#3b82f6' }}
                >
                  <Text style={{ fontSize: 12 }}>预览</Text>
                </Button>
              )}
              <Button
                size="small"
                onClick={() => handleRemove(file)}
                style={{ ...buttonStyle, color: '#ef4444' }}
              >
                <Text style={{ fontSize: 12 }}>删除</Text>
              </Button>
            </View>
          </View>
        ))}
      </View>
    );
  }, [showUploadList, fileList, handlePreview, handleRemove, fileItemStyle, fileInfoStyle, fileActionsStyle, buttonStyle]);

  return (
    <View
      ref={containerRef}
      style={containerStyle}
      accessible={accessible}
      aria-label={accessibilityLabel}
      aria-role={accessibilityRole}
      aria-state={finalAccessibilityState}
      {...restProps}
    >
      {drag ? (
        <View
          style={dragAreaStyle}
        >
          <View style={{ marginBottom: '12px' }}>
            <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: '8px' }}>
              拖拽文件到此处或
            </Text>
            {renderUploadButton()}
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: '16px' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={Boolean(internalDisabled || Boolean(maxCount && fileList.length >= maxCount))}
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
            id="upload-input"
          />
          <View onClick={handleClick}>
            {renderUploadButton()}
          </View>
        </View>
      )}
      
      {renderFileList()}
    </View>
  );
});

/** 上传组件显示名称 */
UploadComponent.displayName = 'Upload';

/** 导出上传组件 */
export const Upload = UploadComponent;
export default Upload;