/**
 * 安全的JSON解析函数
 * @param jsonString 要解析的JSON字符串
 * @param defaultValue 解析失败时返回的默认值
 * @returns 解析结果或默认值
 */
export function parseJSON<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return defaultValue;
  }
}

/**
 * 安全的JSON字符串化函数
 * @param value 要字符串化的值
 * @param defaultValue 字符串化失败时返回的默认值
 * @returns JSON字符串或默认值
 */
export function stringifyJSON(value: any, defaultValue: string = ''): string {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return defaultValue;
  }
}

/**
 * 深度克隆对象
 * @param obj 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    // 如果JSON序列化失败，则使用简单的递归克隆
    if (Array.isArray(obj)) {
      return obj.map(item => deepClone(item)) as unknown as T;
    }
    
    const result = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = deepClone(obj[key]);
      }
    }
    return result;
  }
}

/**
 * 将JSON配置转换为组件props
 * @param config JSON配置对象
 * @returns 组件props对象
 */
export function jsonToProps<T extends Record<string, any>>(config: Record<string, any>): T {
  const props: Record<string, any> = {};
  
  // 处理基本属性
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      // 如果配置值是对象并且有type属性，可能是特殊处理对象
      if (typeof config[key] === 'object' && config[key] !== null && 'type' in config[key]) {
        const specialConfig = config[key];
        
        switch (specialConfig.type) {
          case 'function':
            // 处理函数字符串
            if (typeof specialConfig.body === 'string') {
              try {
                // 使用Function构造函数创建函数
                const args = specialConfig.args || [];
                props[key] = new Function(...args, specialConfig.body);
              } catch (e) {
                console.error(`Error creating function for prop ${key}:`, e);
                props[key] = () => {};
              }
            } else {
              props[key] = () => {};
            }
            break;
            
          case 'date':
            // 处理日期
            if (specialConfig.value) {
              props[key] = new Date(specialConfig.value);
            }
            break;
            
          case 'regexp':
            // 处理正则表达式
            if (specialConfig.pattern) {
              props[key] = new RegExp(specialConfig.pattern, specialConfig.flags || '');
            }
            break;
            
          default:
            // 默认直接赋值
            props[key] = config[key];
        }
      } else {
        // 普通值直接赋值
        props[key] = config[key];
      }
    }
  }
  
  return props as T;
} 