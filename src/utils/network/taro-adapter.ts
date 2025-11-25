import Taro from '@tarojs/taro';
import { IRequestAdapter, RequestConfig, ResponseData } from './types';

export class TaroAdapter implements IRequestAdapter {
  async request<T = any>(config: RequestConfig): Promise<ResponseData<T>> {
    const response = await Taro.request({
      url: config.url,
      method: config.method,
      header: config.headers,
      data: {
        ...config.data,
        ...config.params
      },
      timeout: config.timeout || 10000,
    });

    return {
      data: response.data as T,
      statusCode: response.statusCode,
      header: response.header || {},
      errMsg: response.errMsg,
    };
  }
}
