/**
 * HTTP Interceptors
 * Request and response interceptor management
 * @module services/interceptors
 */

/**
 * 拦截器项接口
 */
export interface InterceptorItem<F, R> {
  /** 成功处理函数 */
  onFulfilled?: F;
  /** 错误处理函数 */
  onRejected?: R;
}

/**
 * 拦截器管理器
 * 管理请求和响应拦截器的添加、移除和执行
 */
export class InterceptorManager<F, R> {
  /** 拦截器列表 */
  private interceptors: Map<number, InterceptorItem<F, R>> = new Map();

  /** 拦截器 ID 计数器 */
  private idCounter = 0;

  /**
   * 添加拦截器
   * @param onFulfilled 成功处理函数
   * @param onRejected 错误处理函数
   * @returns 拦截器 ID
   */
  use(onFulfilled?: F, onRejected?: R): number {
    const id = this.idCounter++;
    this.interceptors.set(id, { onFulfilled, onRejected });
    return id;
  }

  /**
   * 移除拦截器
   * @param id 拦截器 ID
   */
  eject(id: number): void {
    this.interceptors.delete(id);
  }

  /**
   * 清除所有拦截器
   */
  clear(): void {
    this.interceptors.clear();
  }

  /**
   * 获取所有拦截器
   * @returns 拦截器数组
   */
  getAll(): InterceptorItem<F, R>[] {
    return Array.from(this.interceptors.values());
  }

  /**
   * 获取拦截器数量
   * @returns 拦截器数量
   */
  size(): number {
    return this.interceptors.size;
  }

  /**
   * 遍历拦截器
   * @param callback 回调函数
   */
  forEach(callback: (interceptor: InterceptorItem<F, R>, id: number) => void): void {
    this.interceptors.forEach((interceptor, id) => {
      callback(interceptor, id);
    });
  }
}

/**
 * 创建请求拦截器管理器
 */
export function createRequestInterceptorManager<F, R>(): InterceptorManager<F, R> {
  return new InterceptorManager<F, R>();
}

/**
 * 创建响应拦截器管理器
 */
export function createResponseInterceptorManager<F, R>(): InterceptorManager<F, R> {
  return new InterceptorManager<F, R>();
}
