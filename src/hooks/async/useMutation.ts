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
import { http } from '../../services/http-client';
import type { HttpRequestConfig } from '../../services/types';

/** Mutation state */
export interface MutationState<T, V> {
  /** Response data */
  data: T | null;
  /** Error object */
  error: Error | null;
  /** Loading state */
  loading: boolean;
  /** Variables used in the mutation */
  variables: V | null;
}

/** Mutation options */
export interface UseMutationOptions<T, V> {
  /** Optimistic data function */
  optimisticData?: (variables: V) => T;
  /** Rollback on error */
  rollbackOnError?: boolean;
  /** Error callback */
  onError?: (error: Error, variables: V) => void;
  /** Success callback */
  onSuccess?: (data: T, variables: V) => void;
  /** Mutate callback (called before mutation) */
  onMutate?: (variables: V) => void | Promise<void>;
  /** Completed callback (called after mutation, regardless of success/failure) */
  onCompleted?: (data: T | null, error: Error | null, variables: V) => void;
}

export interface UseMutationResult<T, V = unknown> extends MutationState<T, V> {
  /** Execute mutation */
  mutate: (variables: V, options?: Partial<HttpRequestConfig>) => Promise<T | undefined>;
  /** Execute mutation (async version) */
  mutateAsync: (variables: V, options?: Partial<HttpRequestConfig>) => Promise<T>;
  /** Reset mutation state */
  reset: () => void;
}

/**
 * Hook for mutation operations (POST, PUT, DELETE, PATCH)
 */
export function useMutation<T = unknown, V = unknown>(
  options: HttpRequestConfig & UseMutationOptions<T, V>,
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
    async (variables: V, overrideOptions?: Partial<HttpRequestConfig>): Promise<T> => {
      const mergedOptions: HttpRequestConfig = {
        ...requestOptions,
        ...overrideOptions,
        data: variables as Record<string, unknown>,
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
        setState((prev: MutationState<T, V>) => ({
          ...prev,
          loading: true,
          error: null,
          variables,
        }));
      }

      try {
        const response = await http.request<T>(mergedOptions);
        const result = response.data;

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
    async (variables: V, overrideOptions?: Partial<HttpRequestConfig>): Promise<T | undefined> => {
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
export function usePost<T = unknown, V = unknown>(
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
export function usePut<T = unknown, V = unknown>(
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
export function usePatch<T = unknown, V = unknown>(
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
export function useDelete<T = unknown, V = unknown>(
  url: string,
  options: Omit<UseMutationOptions<T, V>, 'url' | 'method'> = {},
): UseMutationResult<T, V> {
  return useMutation<T, V>({
    ...options,
    url,
    method: 'DELETE',
  });
}
