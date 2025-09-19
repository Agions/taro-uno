import React from 'react';

export interface UploadFile {
  /** 文件唯一标识 */
  uid: string;
  /** 文件名 */
  name: string;
  /** 文件大小 */
  size: number;
  /** 文件类型 */
  type: string;
  /** 文件状态 */
  status: 'ready' | 'uploading' | 'done' | 'error' | 'removed';
  /** 上传进度 */
  percent?: number;
  /** 服务器响应 */
  response?: any;
  /** 错误信息 */
  error?: Error;
  /** 原始文件对象 */
  originFileObj?: File;
  /** 文件URL */
  url?: string;
  /** 预览URL */
  thumbUrl?: string;
}

export interface UploadProps {
  /** 接受的文件类型 */
  accept?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最大文件数量 */
  maxCount?: number;
  /** 最大文件大小（字节） */
  maxSize?: number;
  /** 文件列表 */
  fileList?: UploadFile[];
  /** 默认文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传地址 */
  action?: string;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 是否携带cookie */
  withCredentials?: boolean;
  /** 上传前的钩子 */
  beforeUpload?: (file: File) => Promise<boolean | File> | boolean | File;
  /** 自定义上传方法 */
  customRequest?: (options: UploadRequestOptions) => Promise<void>;
  /** 文件状态改变的回调 */
  onChange?: (fileList: UploadFile[]) => void;
  /** 移除文件的回调 */
  onRemove?: (file: UploadFile) => void;
  /** 预览文件的回调 */
  onPreview?: (file: UploadFile) => void;
  /** 上传成功的回调 */
  onSuccess?: (response: any, file: File) => void;
  /** 上传失败的回调 */
  onError?: (error: Error, file: File) => void;
  /** 上传进度的回调 */
  onProgress?: (percent: number, file: File) => void;
  /** 是否显示文件列表 */
  showUploadList?: boolean;
  /** 列表样式 */
  listType?: 'text' | 'picture' | 'picture-card';
  /** 是否支持拖拽 */
  drag?: boolean;
  /** 自定义按钮内容 */
  children?: React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
    selected?: boolean;
  };
}

export interface UploadRequestOptions {
  /** 文件对象 */
  file: File;
  /** 文件名 */
  filename: string;
  /** 附加数据 */
  data: Record<string, any>;
  /** 请求头 */
  headers: Record<string, string>;
  /** 是否携带cookie */
  withCredentials: boolean;
  /** 上传地址 */
  action: string;
  /** 进度回调 */
  onProgress: (percent: number) => void;
  /** 成功回调 */
  onSuccess: (response: any) => void;
  /** 失败回调 */
  onError: (error: Error) => void;
}

export interface UploadRef {
  /** 获取文件列表 */
  getFileList: () => UploadFile[];
  /** 清空文件列表 */
  clearFileList: () => void;
  /** 上传文件 */
  upload: (file: File) => void;
  /** 中止上传 */
  abort: (file: UploadFile) => void;
}

export type UploadSize = 'small' | 'medium' | 'large';

export type UploadVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface UploadLocale {
  upload: string;
  remove: string;
  preview: string;
  uploadError: string;
  uploadSuccess: string;
  fileSizeError: string;
  fileTypeError: string;
  maxCountError: string;
}

export interface UploadUtils {
  /** 格式化文件大小 */
  formatFileSize: (bytes: number) => string;
  /** 获取文件扩展名 */
  getFileExtension: (filename: string) => string;
  /** 检查文件类型 */
  checkFileType: (file: File, accept: string) => boolean;
  /** 检查文件大小 */
  checkFileSize: (file: File, maxSize: number) => boolean;
  /** 生成文件预览URL */
  generatePreviewUrl: (file: File) => Promise<string>;
}

export const UploadUtils: UploadUtils = {
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  getFileExtension: (filename: string) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  },
  
  checkFileType: (file: File, accept: string) => {
    const acceptTypes = accept.split(',').map(type => type.trim());
    return acceptTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.includes('/*')) {
        const mainType = type.split('/')[0];
        return file.type.startsWith(mainType || '');
      }
      return file.type === type;
    });
  },
  
  checkFileSize: (file: File, maxSize: number) => {
    return file.size <= maxSize;
  },
  
  generatePreviewUrl: (file: File) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('File is not an image'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};