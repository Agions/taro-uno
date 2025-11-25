declare module 'glob' {
  export function glob(pattern: string, options?: any): Promise<string[]>;
  export function sync(pattern: string, options?: any): string[];
}
