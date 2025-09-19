import type { ReactNode } from 'react';
import type { CascaderOption } from '../Cascader.types';

/**
 * 格式化级联选择器显示值
 */
export function formatDisplayValue(
  labels: ReactNode[],
  _selectedOptions: CascaderOption[],
  config: { showPath?: boolean; pathSeparator?: string } = {}
): ReactNode {
  const { showPath = false, pathSeparator = ' / ' } = config;
  
  if (!showPath || labels.length === 0) {
    return labels[labels.length - 1] || '';
  }
  
  return labels.join(pathSeparator);
}