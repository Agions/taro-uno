/**
 * Taro-Uno PageHeader Component
 * 页面头部组件实现
 */

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Navigator } from '@tarojs/components';
import type {
  PageHeaderProps,
  PageHeaderRef,
  PageHeaderAction,
  PageHeaderBackConfig,
  PageHeaderBreadcrumbConfig,
} from './PageHeader.types';
import { BaseStyles, getThemeStyle, getLayoutStyle, getSizeStyle, mergeStyles } from './PageHeader.styles';

/**
 * 简单的面包屑渲染组件
 */
const SimpleBreadcrumb = ({
  items,
  separator = '/',
}: {
  items?: Array<{ text: string; href?: string }>;
  separator?: string;
}) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
      {items.map((item, index) => (
        <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {index > 0 && <Text style={{ margin: '0 4px', color: '#999' }}>{separator}</Text>}
          {item.href ? (
            <Navigator url={item.href}>
              <Text style={{ color: '#0ea5e9' }}>{item.text}</Text>
            </Navigator>
          ) : (
            <Text style={{ color: index === items.length - 1 ? '#333' : '#666' }}>{item.text}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

/**
 * PageHeader 组件
 * 提供页面头部功能，支持自定义主题、布局、大小、返回按钮、面包屑、标题、副标题、额外信息和操作按钮等
 */
const PageHeader = forwardRef<PageHeaderRef, PageHeaderProps>((props, ref) => {
  // 合并配置和直接属性
  const mergedConfig = {
    theme: props.theme,
    layout: props.layout,
    size: props.size,
    back: props.back,
    breadcrumb: props.breadcrumb,
    showActions: props.showActions,
    showTitle: props.showTitle,
    showSubtitle: props.showSubtitle,
    showExtra: props.showExtra,
    ...props.config,
  };

  // 状态管理
  // 返回按钮配置
  const [backConfig, setBackConfig] = useState<PageHeaderBackConfig>(() => {
    if (props.back === false) {
      return { show: false };
    }
    if (typeof props.back === 'boolean') {
      return { show: true };
    }
    return props.back || { show: true };
  });

  // 面包屑配置
  const [breadcrumbConfig, setBreadcrumbConfig] = useState<PageHeaderBreadcrumbConfig>(() => {
    if (props.breadcrumb === false) {
      return { show: false };
    }
    if (typeof props.breadcrumb === 'boolean') {
      return { show: true };
    }
    return props.breadcrumb || { show: true };
  });

  // 引用管理
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 主题样式
  const themeStyle = getThemeStyle(mergedConfig.theme || 'light');
  // 布局样式
  const layoutStyle = getLayoutStyle(mergedConfig.layout || 'default');
  // 大小样式
  const sizeStyle = getSizeStyle(mergedConfig.size || 'md');

  // 监听外部 back 变化
  useEffect(() => {
    if (props.back === false) {
      setBackConfig({ show: false });
    } else if (typeof props.back === 'boolean') {
      setBackConfig({ show: true });
    } else if (props.back) {
      setBackConfig(props.back);
    }
  }, [props.back]);

  // 监听外部 breadcrumb 变化
  useEffect(() => {
    if (props.breadcrumb === false) {
      setBreadcrumbConfig({ show: false });
    } else if (typeof props.breadcrumb === 'boolean') {
      setBreadcrumbConfig({ show: true });
    } else if (props.breadcrumb) {
      setBreadcrumbConfig(props.breadcrumb);
    }
  }, [props.breadcrumb]);

  // 返回按钮点击事件处理
  const handleBackClick = useCallback(() => {
    backConfig.onClick?.();
    props.onBackClick?.();
  }, [backConfig.onClick, props.onBackClick]);

  // 操作按钮点击事件处理
  const handleActionClick = useCallback(
    (action: PageHeaderAction, index: number) => {
      action.onClick?.();
      props.onActionClick?.(action, index);
    },
    [props.onActionClick],
  );

  // 渲染返回按钮
  const renderBackButton = useCallback(() => {
    // 不显示返回按钮
    if (!backConfig.show) return null;

    // 自定义渲染返回按钮
    if (props.renderBack) {
      return props.renderBack();
    }

    // 返回按钮内容
    const backContent = (
      <View
        style={mergeStyles(BaseStyles.backButton, themeStyle.backButton, backConfig.style)}
        className={backConfig.className}
        onClick={handleBackClick}
      >
        {/* 返回按钮图标 */}
        <Text style={mergeStyles(BaseStyles.backIcon, themeStyle.backIcon)}>{backConfig.icon || '←'}</Text>
        {/* 返回按钮文本 */}
        {backConfig.text && (
          <Text style={mergeStyles(BaseStyles.backText, themeStyle.backText)}>{backConfig.text}</Text>
        )}
      </View>
    );

    // 返回按钮链接
    if (backConfig.href) {
      return (
        <Navigator
          url={backConfig.href}
          style={mergeStyles(BaseStyles.backButton, themeStyle.backButton, backConfig.style)}
          className={backConfig.className}
          onClick={handleBackClick}
        >
          {backContent}
        </Navigator>
      );
    }

    return backContent;
  }, [backConfig, themeStyle, handleBackClick, props.renderBack]);

  // 渲染面包屑
  const renderBreadcrumb = useCallback(() => {
    // 不显示面包屑
    if (!breadcrumbConfig.show) return null;

    // 自定义渲染面包屑
    if (props.renderBreadcrumb) {
      return props.renderBreadcrumb();
    }

    // 面包屑项 - 转换为 SimpleBreadcrumb 需要的格式
    const items = (breadcrumbConfig.items || []).map((item) => ({
      text: item.label || item.value || '',
      href: item.href,
    }));

    return (
      <View
        style={mergeStyles(BaseStyles.breadcrumbContainer, breadcrumbConfig.style)}
        className={breadcrumbConfig.className}
      >
        <SimpleBreadcrumb items={items} separator={String(breadcrumbConfig.separator || '/')} />
      </View>
    );
  }, [breadcrumbConfig, props.renderBreadcrumb]);

  // 渲染标题
  const renderTitle = useCallback(() => {
    // 不显示标题
    if (mergedConfig.showTitle === false) return null;

    // 自定义渲染标题
    if (props.renderTitle) {
      return props.renderTitle();
    }

    // 没有标题内容
    if (!props.title) return null;

    return <Text style={mergeStyles(BaseStyles.title, themeStyle.title, sizeStyle.title)}>{props.title}</Text>;
  }, [mergedConfig.showTitle, props.renderTitle, props.title, themeStyle.title, sizeStyle.title]);

  // 渲染副标题
  const renderSubtitle = useCallback(() => {
    // 不显示副标题
    if (mergedConfig.showSubtitle === false) return null;

    // 自定义渲染副标题
    if (props.renderSubtitle) {
      return props.renderSubtitle();
    }

    // 没有副标题内容
    if (!props.subtitle) return null;

    return (
      <Text style={mergeStyles(BaseStyles.subtitle, themeStyle.subtitle, sizeStyle.subtitle)}>{props.subtitle}</Text>
    );
  }, [mergedConfig.showSubtitle, props.renderSubtitle, props.subtitle, themeStyle.subtitle, sizeStyle.subtitle]);

  // 渲染额外信息
  const renderExtra = useCallback(() => {
    // 不显示额外信息
    if (mergedConfig.showExtra === false) return null;

    // 自定义渲染额外信息
    if (props.renderExtra) {
      return props.renderExtra();
    }

    // 没有额外信息内容
    if (!props.extra) return null;

    return <Text style={mergeStyles(BaseStyles.extra, themeStyle.extra)}>{props.extra}</Text>;
  }, [mergedConfig.showExtra, props.renderExtra, props.extra, themeStyle.extra]);

  // 渲染操作按钮
  const renderActionButton = useCallback(
    (action: PageHeaderAction, index: number) => {
      // 操作按钮内容
      const actionContent = (
        <View
          style={mergeStyles(
            BaseStyles.actionButton,
            themeStyle.actionButton,
            action.style,
            action.disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined,
          )}
          className={action.className}
          onClick={() => !action.disabled && handleActionClick(action, index)}
        >
          {/* 操作按钮图标 */}
          {action.icon && <Text style={mergeStyles(BaseStyles.actionIcon, themeStyle.actionIcon)}>{action.icon}</Text>}
          {/* 操作按钮文本 */}
          <Text style={mergeStyles(BaseStyles.actionText, themeStyle.actionText)}>{action.text}</Text>
        </View>
      );

      // 操作按钮链接
      if (action.href && !action.disabled) {
        return (
          <Navigator
            key={action.text || index}
            url={action.href}
            style={mergeStyles(BaseStyles.actionButton, themeStyle.actionButton, action.style)}
            className={action.className}
            onClick={() => handleActionClick(action, index)}
          >
            {actionContent}
          </Navigator>
        );
      }

      return <View key={action.text || index}>{actionContent}</View>;
    },
    [themeStyle.actionButton, themeStyle.actionIcon, themeStyle.actionText, handleActionClick],
  );

  // 渲染操作按钮列表
  const renderActions = useCallback(() => {
    // 不显示操作按钮
    if (mergedConfig.showActions === false) return null;

    // 自定义渲染操作按钮
    if (props.renderActions) {
      return props.renderActions();
    }

    // 没有操作按钮
    if (!props.actions || props.actions.length === 0) return null;

    return (
      <View style={BaseStyles.actionsArea}>
        {props.actions.map((action, index) => renderActionButton(action, index))}
      </View>
    );
  }, [mergedConfig.showActions, props.renderActions, props.actions, renderActionButton]);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    getConfig: () => mergedConfig as any,
    reset: () => {
      setBackConfig({
        show: true,
        ...(typeof props.back === 'object' ? props.back : {}),
      });
      setBreadcrumbConfig({
        show: true,
        ...(typeof props.breadcrumb === 'object' ? props.breadcrumb : {}),
      });
    },
  }));

  // 渲染组件
  return (
    <View
      ref={containerRef}
      style={mergeStyles(
        BaseStyles.container,
        themeStyle.container,
        layoutStyle,
        sizeStyle.container,
        props.style,
        mergedConfig.style,
      )}
      className={`${props.className} ${mergedConfig.className}`}
    >
      {/* 顶部区域 */}
      <View style={BaseStyles.topArea}>
        {/* 左侧区域 */}
        <View style={BaseStyles.leftArea}>
          {/* 渲染返回按钮 */}
          {renderBackButton()}
          {/* 渲染面包屑 */}
          {renderBreadcrumb()}
        </View>
        {/* 右侧区域 */}
        <View style={BaseStyles.rightArea}>
          {/* 渲染操作按钮 */}
          {renderActions()}
        </View>
      </View>

      {/* 标题区域 */}
      <View style={BaseStyles.titleArea}>
        {/* 渲染标题 */}
        {renderTitle()}
        {/* 渲染副标题 */}
        {renderSubtitle()}
      </View>

      {/* 渲染额外信息 */}
      {renderExtra()}
    </View>
  );
});

PageHeader.displayName = 'PageHeader';

// 使用默认参数设置默认属性
const PageHeaderWithDefaults = (props: PageHeaderProps) => {
  const defaultProps: Partial<PageHeaderProps> = {
    theme: 'light',
    layout: 'default',
    size: 'md',
    back: { show: true },
    breadcrumb: { show: false },
    showActions: false,
    showTitle: true,
    showSubtitle: true,
    showExtra: true,
    actions: [],
  };

  return <PageHeader {...defaultProps} {...props} />;
};

export { PageHeaderWithDefaults as PageHeader };
export type { PageHeaderProps, PageHeaderRef };
export default PageHeaderWithDefaults;
