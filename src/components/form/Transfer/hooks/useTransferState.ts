import { useState, useEffect, useCallback } from 'react';
import type { TransferValue, TransferDirection } from '../Transfer.types';

/** Transfer状态管理Hook */
export function useTransferState(
  controlledTargetKeys?: TransferValue,
  defaultTargetKeys: TransferValue = [],
  controlledSelectedKeys?: TransferValue,
  defaultSelectedKeys: TransferValue = [],
  disabled: boolean = false,
) {
  // 内部状态
  const [internalTargetKeys, setInternalTargetKeys] = useState<TransferValue>(defaultTargetKeys);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<TransferValue>(defaultSelectedKeys);
  const [leftSelectedKeys, setLeftSelectedKeys] = useState<TransferValue>([]);
  const [rightSelectedKeys, setRightSelectedKeys] = useState<TransferValue>([]);
  const [leftSearchValue, setLeftSearchValue] = useState('');
  const [rightSearchValue, setRightSearchValue] = useState('');
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [leftPage, setLeftPage] = useState(1);
  const [rightPage, setRightPage] = useState(1);

  // 受控状态判断
  const isTargetKeysControlled = controlledTargetKeys !== undefined;
  const isSelectedKeysControlled = controlledSelectedKeys !== undefined;

  // 当前值
  const targetKeys = isTargetKeysControlled ? controlledTargetKeys : internalTargetKeys;
  const selectedKeys = isSelectedKeysControlled ? controlledSelectedKeys : internalSelectedKeys;

  // 更新禁用状态
  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  // 更新目标键
  const updateTargetKeys = useCallback(
    (newKeys: TransferValue) => {
      if (!isTargetKeysControlled) {
        setInternalTargetKeys(newKeys);
      }
    },
    [isTargetKeysControlled],
  );

  // 更新选中键
  const updateSelectedKeys = useCallback(
    (newKeys: TransferValue) => {
      if (!isSelectedKeysControlled) {
        setInternalSelectedKeys(newKeys);
      }
    },
    [isSelectedKeysControlled],
  );

  // 更新左右选中键
  const updateLeftRightSelectedKeys = useCallback((newKeys: TransferValue, currentTargetKeys: TransferValue) => {
    setLeftSelectedKeys(newKeys.filter((key) => !currentTargetKeys.includes(key)));
    setRightSelectedKeys(newKeys.filter((key) => currentTargetKeys.includes(key)));
  }, []);

  // 设置搜索值
  const setSearchValue = useCallback((direction: TransferDirection, value: string) => {
    if (direction === 'left') {
      setLeftSearchValue(value);
    } else {
      setRightSearchValue(value);
    }
  }, []);

  // 设置页码
  const setPage = useCallback((direction: TransferDirection, page: number) => {
    if (direction === 'left') {
      setLeftPage(page);
    } else {
      setRightPage(page);
    }
  }, []);

  // 重置状态
  const reset = useCallback(() => {
    if (!isTargetKeysControlled) {
      setInternalTargetKeys(defaultTargetKeys);
    }
    if (!isSelectedKeysControlled) {
      setInternalSelectedKeys(defaultSelectedKeys);
    }
    setLeftSelectedKeys([]);
    setRightSelectedKeys([]);
    setLeftSearchValue('');
    setRightSearchValue('');
    setLeftPage(1);
    setRightPage(1);
  }, [isTargetKeysControlled, isSelectedKeysControlled, defaultTargetKeys, defaultSelectedKeys]);

  return {
    // 状态值
    targetKeys,
    selectedKeys,
    leftSelectedKeys,
    rightSelectedKeys,
    leftSearchValue,
    rightSearchValue,
    internalDisabled,
    leftPage,
    rightPage,

    // 受控状态
    isTargetKeysControlled,
    isSelectedKeysControlled,

    // 更新函数
    updateTargetKeys,
    updateSelectedKeys,
    updateLeftRightSelectedKeys,
    setSearchValue,
    setPage,
    reset,
  };
}
