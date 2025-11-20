export type AsyncState<T> = {
    data: T | undefined;
    error: Error | undefined;
    loading: boolean;
};

export type Mutation<T> = (updater: T | ((prev: T | undefined) => T)) => void;

export type QueryKey = string | readonly unknown[];

