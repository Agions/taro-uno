/**
 * CDN 配置文件
 * 用于配置静态资源的CDN分发
 */

export interface CDNConfig {
  // 是否启用CDN
  enabled: boolean;
  
  // CDN基础URL
  baseUrl: string;
  
  // 静态资源路径
  assetsPath: string;
  
  // 缓存配置
  cache: {
    // 默认缓存时间（秒）
    defaultTTL: number;
    // 文件类型缓存配置
    fileTypes: {
      [key: string]: {
        ttl: number;
        compress: boolean;
        headers?: Record<string, string>;
      };
    };
  };
  
  // 压缩配置
  compression: {
    enabled: boolean;
    algorithms: ('gzip' | 'brotli' | 'deflate')[];
    level: number;
  };
  
  // 预加载配置
  preload: {
    enabled: boolean;
    resources: string[];
    strategy: 'eager' | 'lazy';
  };
  
  // 安全配置
  security: {
    // CORS配置
    cors: {
      enabled: boolean;
      origins: string[];
      methods: string[];
      headers: string[];
    };
    
    // CSP配置
    csp: {
      enabled: boolean;
      directives: Record<string, string[]>;
    };
    
    // HTTPS配置
    https: {
      enabled: boolean;
      hsts: boolean;
      hstsMaxAge: number;
    };
  };
  
  // 性能配置
  performance: {
    // 缓存策略
    cacheStrategy: 'standard' | 'aggressive' | 'conservative';
    
    // 图片优化
    imageOptimization: {
      enabled: boolean;
      formats: ('webp' | 'avif' | 'png' | 'jpg')[];
      quality: number;
    };
    
    // 代码分割
    codeSplitting: {
      enabled: boolean;
      chunkSize: number;
    };
  };
}

// 默认CDN配置
export const defaultCDNConfig: CDNConfig = {
  enabled: (process.env as any).CDN_ENABLED === 'true',
  baseUrl: (process.env as any).CDN_BASE_URL || 'https://cdn.example.com',
  assetsPath: (process.env as any).CDN_ASSETS_PATH || '/assets',
  
  cache: {
    defaultTTL: 3600, // 1小时
    fileTypes: {
      '.js': {
        ttl: 86400, // 24小时
        compress: true,
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=86400, immutable'
        }
      },
      '.css': {
        ttl: 86400, // 24小时
        compress: true,
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=86400, immutable'
        }
      },
      '.png': {
        ttl: 604800, // 7天
        compress: false,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=604800, immutable'
        }
      },
      '.jpg': {
        ttl: 604800, // 7天
        compress: false,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800, immutable'
        }
      },
      '.svg': {
        ttl: 604800, // 7天
        compress: true,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=604800, immutable'
        }
      },
      '.woff2': {
        ttl: 2592000, // 30天
        compress: false,
        headers: {
          'Content-Type': 'font/woff2',
          'Cache-Control': 'public, max-age=2592000, immutable'
        }
      },
      '.json': {
        ttl: 3600, // 1小时
        compress: true,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      }
    }
  },
  
  compression: {
    enabled: true,
    algorithms: ['gzip', 'brotli'],
    level: 6
  },
  
  preload: {
    enabled: true,
    resources: [
      '/js/index.js',
      '/css/index.css',
      '/fonts/main.woff2'
    ],
    strategy: 'eager'
  },
  
  security: {
    cors: {
      enabled: true,
      origins: ['*'],
      methods: ['GET', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization']
    },
    
    csp: {
      enabled: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'font-src': ["'self'", 'data:', 'https:'],
        'connect-src': ["'self'", 'https:'],
        'object-src': ["'none'"],
        'frame-src': ["'self'"],
        'frame-ancestors': ["'none'"],
        'form-action': ["'self'"]
      }
    },
    
    https: {
      enabled: true,
      hsts: true,
      hstsMaxAge: 31536000 // 1年
    }
  },
  
  performance: {
    cacheStrategy: 'aggressive',
    
    imageOptimization: {
      enabled: true,
      formats: ['webp', 'avif'],
      quality: 80
    },
    
    codeSplitting: {
      enabled: true,
      chunkSize: 244 * 1024 // 244KB
    }
  }
};

// 生产环境CDN配置
export const productionCDNConfig: CDNConfig = {
  ...defaultCDNConfig,
  enabled: true,
  baseUrl: 'https://cdn.taro-uno-ui.com',
  performance: {
    ...defaultCDNConfig.performance,
    cacheStrategy: 'aggressive',
    imageOptimization: {
      enabled: true,
      formats: ['webp', 'avif'],
      quality: 85
    }
  }
};

// 开发环境CDN配置
export const developmentCDNConfig: CDNConfig = {
  ...defaultCDNConfig,
  enabled: false,
  baseUrl: 'http://localhost:3000',
  performance: {
    ...defaultCDNConfig.performance,
    cacheStrategy: 'conservative'
  }
};

// 获取当前环境的CDN配置
export function getCDNConfig(): CDNConfig {
  const env = (process.env as any).NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return productionCDNConfig;
    case 'development':
      return developmentCDNConfig;
    default:
      return defaultCDNConfig;
  }
}

// 生成CDN URL
export function generateCDNUrl(path: string, config?: CDNConfig): string {
  const cdnConfig = config || getCDNConfig();
  
  if (!cdnConfig.enabled) {
    return path;
  }
  
  // 清理路径
  const cleanPath = path.replace(/^\/+/, '');
  
  // 构建完整的CDN URL
  const url = `${cdnConfig.baseUrl}/${cdnConfig.assetsPath}/${cleanPath}`;
  
  return url;
}

// 生成预加载标签
export function generatePreloadTags(resources: string[], config?: CDNConfig): string[] {
  const cdnConfig = config || getCDNConfig();
  
  if (!cdnConfig.preload.enabled) {
    return [];
  }
  
  return resources.map(resource => {
    const url = generateCDNUrl(resource, cdnConfig);
    const ext = resource.split('.').pop()?.toLowerCase();
    
    let as = '';
    let type = '';
    
    switch (ext) {
      case 'js':
        as = 'script';
        type = 'application/javascript';
        break;
      case 'css':
        as = 'style';
        type = 'text/css';
        break;
      case 'woff2':
      case 'woff':
        as = 'font';
        type = 'font/woff2';
        break;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        as = 'image';
        break;
      default:
        as = 'fetch';
    }
    
    return `<link rel="preload" href="${url}" as="${as}" type="${type}" crossorigin="anonymous">`;
  });
}

// 生成缓存控制头
export function generateCacheHeaders(filePath: string, config?: CDNConfig): Record<string, string> {
  const cdnConfig = config || getCDNConfig();
  
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const fileConfig = cdnConfig.cache.fileTypes[`.${ext}`] || {
    ttl: cdnConfig.cache.defaultTTL,
    compress: false
  };
  
  const headers: Record<string, string> = {
    ...fileConfig.headers,
    'Cache-Control': `public, max-age=${fileConfig.ttl}`
  };
  
  // 如果文件包含hash，设置为immutable
  if (filePath.includes('[hash]') || /\.[a-f0-9]{8,}\./.test(filePath)) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  }
  
  return headers;
}

// CDN 配置验证
export function validateCDNConfig(config: CDNConfig): boolean {
  if (!config.baseUrl) {
    console.error('CDN baseUrl is required');
    return false;
  }
  
  if (!config.baseUrl.startsWith('http://') && !config.baseUrl.startsWith('https://')) {
    console.error('CDN baseUrl must start with http:// or https://');
    return false;
  }
  
  if (config.compression.enabled && config.compression.algorithms.length === 0) {
    console.error('At least one compression algorithm must be specified');
    return false;
  }
  
  return true;
}

export default {
  defaultCDNConfig,
  productionCDNConfig,
  developmentCDNConfig,
  getCDNConfig,
  generateCDNUrl,
  generatePreloadTags,
  generateCacheHeaders,
  validateCDNConfig
};