import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, useThemeContext } from './ThemeProvider';
import type { ThemeMode } from './ThemeProvider';
import type { DesignTokens } from '../theme/tokens';
import { defaultDesignTokens } from '../theme/tokens';
import type { Platform, PlatformInfo } from '../types';
import { resolvePlatform } from '../utils/environment';

interface AppProviderProps {
  children: ReactNode;
  /** 默认设计令牌 */
  defaultTokens?: DesignTokens;
  /** 默认主题模式 */
  themeMode?: ThemeMode;
  /** 持久化键名 */
  themePersistKey?: string;
  /** 是否跟随系统主题 */
  followSystemTheme?: boolean;
  /** 初始化完成回调 */
  onReady?: () => void;
}

interface AppPlatformState {
  id: Platform | 'unknown';
  name: string;
  isMiniProgram: boolean;
  isH5: boolean;
  isRN: boolean;
  info?: PlatformInfo;
}

interface AppContextValue {
  platform: AppPlatformState;
  theme: ReturnType<typeof useThemeContext>;
  isReady: boolean;
}

const PLATFORM_NAME_MAP: Record<string, string> = {
  weapp: 'WeChat Mini Program',
  alipay: 'Alipay Mini Program',
  swan: 'Baidu Mini Program',
  tt: 'ByteDance Mini Program',
  qq: 'QQ Mini Program',
  jd: 'JD Mini Program',
  h5: 'H5',
  rn: 'React Native',
  unknown: 'Unknown',
};

const MINI_PROGRAM_PLATFORMS = new Set<Platform>(['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd']);

const createInitialPlatformState = (): AppPlatformState => {
  const platform = resolvePlatform();
  const id = platform === 'unknown' ? 'unknown' : platform;
  return {
    id,
    name: PLATFORM_NAME_MAP[id] || PLATFORM_NAME_MAP['unknown'] || 'Unknown',
    isMiniProgram: MINI_PROGRAM_PLATFORMS.has(id as Platform),
    isH5: id === 'h5',
    isRN: id === 'rn',
  };
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextBridgeProps {
  children: ReactNode;
  onReady?: () => void;
}

const AppContextBridge: React.FC<AppContextBridgeProps> = ({ children, onReady }) => {
  const theme = useThemeContext();
  const [platform, setPlatform] = useState<AppPlatformState>(createInitialPlatformState());
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const loadPlatformInfo = async () => {
      try {
        const module = await import('../platform');
        const info = module.getPlatformInfo ? module.getPlatformInfo() : undefined;
        if (info && !cancelled) {
          const platformType = info.type || info.platform || 'unknown';
          setPlatform({
            id: platformType,
            name:
              module.getPlatformName?.() ||
              PLATFORM_NAME_MAP[platformType] ||
              PLATFORM_NAME_MAP['unknown'] ||
              'Unknown',
            isMiniProgram: info.isMiniProgram,
            isH5: info.isH5,
            isRN: info.isRN,
            info,
          });
        }
      } catch (error) {
        console.warn('[AppProvider] platform module unavailable, falling back to env detection:', error);
      }
    };

    void loadPlatformInfo();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setIsReady(true);
    onReady?.();
  }, [onReady]);

  const contextValue = useMemo<AppContextValue>(
    () => ({
      platform,
      theme,
      isReady,
    }),
    [platform, theme, isReady],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  defaultTokens,
  themeMode = 'light',
  themePersistKey = 'taro-uno-theme',
  followSystemTheme = true,
  onReady,
}) => {
  return (
    <ThemeProvider
      defaultTokens={defaultTokens || defaultDesignTokens}
      defaultMode={themeMode}
      persistKey={themePersistKey}
      followSystem={followSystemTheme}
    >
      <AppContextBridge onReady={onReady || (() => {})}>{children}</AppContextBridge>
    </ThemeProvider>
  );
};

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;
