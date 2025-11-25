import React from 'react';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | 'loading' | '404' | '403' | '500';

export interface ResultProps {
  /** 结果状态 */
  status?: ResultStatus;
  /** 标题文字 */
  title?: React.ReactNode;
  /** 副标题文字 */
  subTitle?: React.ReactNode;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 操作区域 */
  extra?: React.ReactNode;
  /** 子组件 */
  children?: React.ReactNode;
  /** 结果尺寸 */
  size?: ResultSize;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface ResultRef {
  /** 获取当前状态 */
  getStatus: () => ResultStatus;
  /** 设置状态 */
  setStatus: (_status: ResultStatus) => void;
  /** 设置标题 */
  setTitle: (_title: React.ReactNode) => void;
  /** 设置副标题 */
  setSubTitle: (_subTitle: React.ReactNode) => void;
}

export type ResultSize = 'small' | 'medium' | 'large';

export interface ResultConfig {
  /** 默认状态 */
  defaultStatus?: ResultStatus;
  /** 默认尺寸 */
  defaultSize?: ResultSize;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 图标尺寸 */
  iconSize?: number;
  /** 图标颜色 */
  iconColor?: string;
  /** 标题文字样式 */
  titleStyle?: React.CSSProperties;
  /** 副标题文字样式 */
  subTitleStyle?: React.CSSProperties;
  /** 内容区域样式 */
  contentStyle?: React.CSSProperties;
  /** 操作区域样式 */
  extraStyle?: React.CSSProperties;
}

export interface ResultUtilsType {
  /** 获取状态对应的颜色 */
  getStatusColor: (_status: ResultStatus) => string;
  /** 获取状态对应的图标 */
  getStatusIcon: (_status: ResultStatus) => React.ReactNode;
  /** 获取状态对应的默认标题 */
  getStatusTitle: (_status: ResultStatus) => string;
  /** 格式化结果数据 */
  formatResultData: (_data: any) => any;
  /** 验证状态是否有效 */
  validateStatus: (_status: string) => boolean;
}

export const ResultUtils: ResultUtilsType = {
  getStatusColor: (status: ResultStatus) => {
    const colorMap = {
      success: '#22c55e',
      error: '#ef4444',
      info: '#0ea5e9',
      warning: '#f59e0b',
      loading: '#6b7280',
      404: '#6b7280',
      403: '#6b7280',
      500: '#6b7280',
    };
    return colorMap[status] || '#6b7280';
  },

  getStatusIcon: (status: ResultStatus) => {
    const iconMap = {
      success: '✓',
      error: '✗',
      info: 'ℹ',
      warning: '⚠',
      loading: '⏳',
      404: '404',
      403: '403',
      500: '500',
    };
    return iconMap[status] || '';
  },

  getStatusTitle: (status: ResultStatus) => {
    const titleMap = {
      success: '成功',
      error: '失败',
      info: '信息',
      warning: '警告',
      loading: '加载中',
      404: '页面不存在',
      403: '无权访问',
      500: '服务器错误',
    };
    return titleMap[status] || status;
  },

  formatResultData: (data: any) => {
    return {
      ...data,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleString(),
    };
  },

  validateStatus: (status: string) => {
    const validStatuses = ['success', 'error', 'info', 'warning', 'loading', '404', '403', '500'];
    return validStatuses.includes(status);
  },
};