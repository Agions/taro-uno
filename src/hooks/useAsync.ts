import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAsyncOptions<T> {
    immediate?: boolean;
    deps?: unknown[];
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    keepPreviousData?: boolean;
}

export interface UseAsyncResult<T> {
    data: T | undefined;
    error: Error | undefined;
    loading: boolean;
    execute: () => Promise<T | undefined>;
    cancel: () => void;
    setData: (updater: T | ((prev: T | undefined) => T)) => void;
}

export function useAsync<T>(fn: () => Promise<T>, options: UseAsyncOptions<T> = {}): UseAsyncResult<T> {
    const { immediate = false, deps = [], onSuccess, onError, keepPreviousData = true } = options;
    const [data, setDataState] = useState<T | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const abortRef = useRef<AbortController | null>(null);

    const execute = useCallback(async () => {
        if (!keepPreviousData) setDataState(undefined);
        setLoading(true);
        setError(undefined);
        abortRef.current?.abort();
        abortRef.current = new AbortController();

        try {
            const result = await fn();
            setDataState(prev => (typeof result === 'undefined' ? prev : result));
            onSuccess?.(result);
            setLoading(false);
            return result;
        } catch (e) {
            const err = e as Error;
            setError(err);
            onError?.(err);
            setLoading(false);
            return undefined;
        }
    }, [fn, onSuccess, onError, keepPreviousData]);

    useEffect(() => {
        if (immediate) execute();
         
    }, [immediate, execute, ...deps]);

    const cancel = useCallback(() => {
        abortRef.current?.abort();
    }, []);

    const setData = useCallback((updater: T | ((prev: T | undefined) => T)) => {
        setDataState(prev => (typeof updater === 'function' ? (updater as (p: T | undefined) => T)(prev) : updater));
    }, []);

    return { data, error, loading, execute, cancel, setData };
}

export default useAsync;
