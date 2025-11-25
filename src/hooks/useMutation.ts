/**
 * useMutation Hook
 * React hook for data mutation operations (POST, PUT, DELETE, PATCH)
 * 
 * @example
 * ```typescript
 * const { mutate, loading, error } = useMutation<User, CreateUserInput>({
 *   url: '/api/users',
 *   method: 'POST',
 *   onSuccess: (data) => {
 *     console.log('User created:', data);
 *   },
 * });
 * 
 * // Trigger mutation
 * await mutate({ name: 'John Doe', email: 'john@example.com' });
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { UnifiedRequestClient } from '../utils/network/unified-request-client';
import type { RequestOptions, UseMutationOptions, MutationState } from '../utils/network/types';

export interface UseMutationResult<T, V = any> extends MutationState<T, V> {
  /** Execute mutation */
  mutate: (variables: V, options?: Partial<RequestOptions>) => Promise<T | undefined>;
  /** Execute mutation (async version) */
  mutateAsync: (variables: V, options?: Partial<RequestOptions>) => Promise<T>;
  /** Reset mutation state */
  reset: () => void;
}

/**
 * Hook for mutation operations (POST, PUT, DELETE, PATCH)
 */
export function useMutation<T = any, V = any>(
  options: RequestOptions & UseMutationOptions<T, V>,
): UseMutationResult<T, V> {
  const {
    optimisticData,
    rollbackOnError = false,
    onError,
    onSuccess,
    onMutate,
    onCompleted,
    ...requestOptions
  } = options;

  const [state, setState] = useState<MutationState<T, V>>({
    data: null,
    error: null,
    loading: false,
    variables: null,
  });

  const clientRef = useRef<UnifiedRequestClient>(new UnifiedRequestClient());
  const previousDataRef = useRef<T | null>(null);
  const mountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /**
   * Execute mutation
   */
  const mutateAsync = useCallback(
    async (variables: V, overrideOptions?: Partial<RequestOptions>): Promise<T> => {
      const mergedOptions = {
        ...requestOptions,
        ...overrideOptions,
        data: variables,
      };

      // Store previous data for potential rollback
      previousDataRef.current = state.data;

      // Call onMutate hook
      if (onMutate) {
        await onMutate(variables);
      }

      // Apply optimistic update
      if (optimisticData) {
        const optimisticResult = optimisticData(variables);
        setState({
          data: optimisticResult,
          error: null,
          loading: true,
          variables,
        });
      } else {
        setState(prev => ({
          ...prev,
          loading: true,
          error: null,
          variables,
        }));
      }

      try {
        const result = await clientRef.current.request<T>(mergedOptions);

        if (mountedRef.current) {
          setState({
            data: result,
            error: null,
            loading: false,
            variables,
          });

          onSuccess?.(result, variables);
          onCompleted?.(result, null, variables);
        }

        return result;
      } catch (error) {
        const err = error as Error;

        if (mountedRef.current) {
          // Rollback optimistic update if enabled
          const finalData = rollbackOnError ? previousDataRef.current : state.data;

          setState({
            data: finalData,
            error: err,
            loading: false,
            variables,
          });

          onError?.(err, variables);
          onCompleted?.(null, err, variables);
        }

        throw err;
      }
    },
    [requestOptions, optimisticData, rollbackOnError, onMutate, onError, onSuccess, onCompleted, state.data],
  );

  /**
   * Execute mutation (returns undefined on error for compatibility)
   */
  const mutate = useCallback(
    async (variables: V, overrideOptions?: Partial<RequestOptions>): Promise<T | undefined> => {
      try {
        return await mutateAsync(variables, overrideOptions);
      } catch {
        return undefined;
      }
    },
    [mutateAsync],
  );

  /**
   * Reset mutation state
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      variables: null,
    });
    previousDataRef.current = null;
  }, []);

  return {
    ...state,
    mutate,
    mutateAsync,
    reset,
  };
}

/**
 * Hook for POST mutations
 */
export function usePost<T = any, V = any>(
  url: string,
  options: Omit<UseMutationOptions<T, V>, 'url' | 'method'> = {},
): UseMutationResult<T, V> {
  return useMutation<T, V>({
    ...options,
    url,
    method: 'POST',
  });
}

/**
 * Hook for PUT mutations
 */
export function usePut<T = any, V = any>(
  url: string,
  options: Omit<UseMutationOptions<T, V>, 'url' | 'method'> = {},
): UseMutationResult<T, V> {
  return useMutation<T, V>({
    ...options,
    url,
    method: 'PUT',
  });
}

/**
 * Hook for PATCH mutations
 */
export function usePatch<T = any, V = any>(
  url: string,
  options: Omit<UseMutationOptions<T, V>, 'url' | 'method'> = {},
): UseMutationResult<T, V> {
  return useMutation<T, V>({
    ...options,
    url,
    method: 'PATCH',
  });
}

/**
 * Hook for DELETE mutations
 */
export function useDelete<T = any, V = any>(
  url: string,
  options: Omit<UseMutationOptions<T, V>, 'url' | 'method'> = {},
): UseMutationResult<T, V> {
  return useMutation<T, V>({
    ...options,
    url,
    method: 'DELETE',
  });
}
