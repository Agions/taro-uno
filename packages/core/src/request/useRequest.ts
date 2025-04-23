import { useState, useEffect, useCallback, useRef } from 'react';
import { request, RequestConfig, Response } from './request';

export interface RequestOptions extends RequestConfig {
  manual?: boolean; // 是否手动触发请求
  onSuccess?: (data: any, response: Response<any>) => void; // 成功回调
  onError?: (error: any) => void; // 失败回调
  onFinally?: () => void; // 请求结束回调
  initialData?: any; // 初始数据
  defaultParams?: any[]; // 默认参数
  loadingDelay?: number; // 延迟设置loading的时间
  debounceInterval?: number; // 防抖间隔
  throttleInterval?: number; // 节流间隔
  formatResult?: (response: Response<any>) => any; // 格式化返回结果
  pollingInterval?: number; // 轮询间隔
  pollingWhenHidden?: boolean; // 页面隐藏时是否继续轮询
}

export interface RequestResult<T = any> {
  data: T | undefined; // 请求返回的数据
  loading: boolean; // 是否正在加载
  error: Error | undefined; // 请求错误
  refresh: () => void; // 使用上一次的参数重新发起请求
  run: (...params: any[]) => Promise<Response<T>>; // 手动触发请求
  mutate: (data: T | ((oldData: T) => T)) => void; // 直接修改返回的数据
  cancel: () => void; // 取消当前请求
}

// 防抖函数
function useDebounceFn(fn: (...args: any[]) => any, wait: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  
  return useCallback((...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    
    timer.current = setTimeout(() => {
      fn(...args);
    }, wait);
  }, [fn, wait]);
}

// 节流函数
function useThrottleFn(fn: (...args: any[]) => any, wait: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const lastTime = useRef<number>(0);
  
  return useCallback((...args: any[]) => {
    const now = Date.now();
    
    if (now - lastTime.current > wait) {
      lastTime.current = now;
      fn(...args);
    } else if (!timer.current) {
      timer.current = setTimeout(() => {
        lastTime.current = Date.now();
        timer.current = null;
        fn(...args);
      }, wait - (now - lastTime.current));
    }
  }, [fn, wait]);
}

export function useRequest<T = any>(
  service: (...args: any[]) => Promise<Response<T>> | RequestConfig,
  options: RequestOptions = {}
): RequestResult<T> {
  const {
    manual = false,
    onSuccess,
    onError,
    onFinally,
    initialData,
    defaultParams = [],
    loadingDelay = 0,
    debounceInterval = 0,
    throttleInterval = 0,
    formatResult = (res: Response<T>) => res.data,
    pollingInterval = 0,
    pollingWhenHidden = true,
    ...requestOptions
  } = options;
  
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState<Error>();
  
  // 使用useRef保存函数，避免闭包问题
  const serviceRef = useRef(service);
  const optionsRef = useRef(options);
  const unmountedRef = useRef(false);
  
  // 保存上一次请求的参数
  const lastParamsRef = useRef<any[]>(defaultParams);
  
  // 控制轮询的计时器
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 取消控制器
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // 更新服务和选项引用
  useEffect(() => {
    serviceRef.current = service;
    optionsRef.current = options;
  }, [service, options]);
  
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      unmountedRef.current = true;
      if (pollingTimerRef.current) {
        clearTimeout(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  // 轮询处理
  useEffect(() => {
    if (!pollingInterval) {
      return;
    }
    
    if (!pollingWhenHidden && typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      return;
    }
    
    return () => {
      if (pollingTimerRef.current) {
        clearTimeout(pollingTimerRef.current);
      }
    };
  }, [pollingInterval, pollingWhenHidden]);
  
  // 实际执行请求的函数
  const fetchData = useCallback(async (...params: any[]): Promise<Response<T>> => {
    lastParamsRef.current = params;
    
    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // 创建新的取消控制器
    abortControllerRef.current = new AbortController();
    
    // 判断是否延迟设置loading
    let loadingDelayTimer: NodeJS.Timeout | null = null;
    if (loadingDelay > 0) {
      loadingDelayTimer = setTimeout(() => {
        if (!unmountedRef.current) {
          setLoading(true);
        }
      }, loadingDelay);
    } else {
      setLoading(true);
    }
    
    try {
      let serviceResult: Promise<Response<T>>;
      
      // 处理不同类型的service
      if (typeof serviceRef.current === 'function') {
        serviceResult = serviceRef.current(...params);
      } else if (typeof serviceRef.current === 'object') {
        serviceResult = request({
          ...serviceRef.current,
          ...requestOptions,
          signal: abortControllerRef.current.signal
        });
      } else {
        throw new Error('service must be a function or a request config object');
      }
      
      // 等待请求完成
      const res = await serviceResult;
      
      // 组件未卸载时才更新状态
      if (!unmountedRef.current) {
        const formattedResult = formatResult ? formatResult(res) : res.data;
        setData(formattedResult);
        setError(undefined);
        
        // 成功回调
        if (onSuccess) {
          onSuccess(formattedResult, res);
        }
        
        // 处理轮询
        if (pollingInterval) {
          pollingTimerRef.current = setTimeout(() => {
            if (!unmountedRef.current) {
              fetchData(...params);
            }
          }, pollingInterval);
        }
      }
      
      return res;
    } catch (err) {
      // 只有组件未卸载且请求没有被取消时才设置错误状态
      if (!unmountedRef.current && !(err instanceof DOMException && err.name === 'AbortError')) {
        setError(err as Error);
        
        // 错误回调
        if (onError) {
          onError(err);
        }
      }
      
      throw err;
    } finally {
      // 清除loading延迟定时器
      if (loadingDelayTimer) {
        clearTimeout(loadingDelayTimer);
      }
      
      // 组件未卸载时才更新loading状态
      if (!unmountedRef.current) {
        setLoading(false);
      }
      
      // 结束回调
      if (onFinally) {
        onFinally();
      }
    }
  }, [onSuccess, onError, onFinally, formatResult, loadingDelay, pollingInterval, requestOptions]);
  
  // 处理防抖
  const debouncedFetchData = useDebounceFn(fetchData, debounceInterval);
  
  // 处理节流
  const throttledFetchData = useThrottleFn(fetchData, throttleInterval);
  
  // 根据是否设置防抖节流，决定使用哪个函数
  const run = useCallback((...params: any[]) => {
    if (debounceInterval > 0) {
      debouncedFetchData(...params);
      // 由于防抖函数是异步的，这里无法直接返回结果
      return Promise.resolve({} as Response<T>);
    }
    
    if (throttleInterval > 0) {
      throttledFetchData(...params);
      // 由于节流函数可能是异步的，这里无法直接返回结果
      return Promise.resolve({} as Response<T>);
    }
    
    return fetchData(...params);
  }, [fetchData, debouncedFetchData, throttledFetchData, debounceInterval, throttleInterval]);
  
  // 使用上一次的参数重新请求
  const refresh = useCallback(() => {
    return run(...lastParamsRef.current);
  }, [run]);
  
  // 直接修改返回数据
  const mutate = useCallback((mutateData: T | ((oldData: T) => T)) => {
    setData((oldData) => {
      if (typeof mutateData === 'function') {
        return (mutateData as Function)(oldData);
      }
      return mutateData;
    });
  }, []);
  
  // 取消当前请求
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);
  
  // 自动发起请求
  useEffect(() => {
    if (!manual) {
      run(...defaultParams);
    }
  }, [manual, run]);
  
  return {
    data,
    loading,
    error,
    run,
    refresh,
    mutate,
    cancel
  };
} 