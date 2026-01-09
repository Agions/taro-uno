/**
 * RichText Component
 * 富文本展示组件实现
 */

import { forwardRef, useRef, useImperativeHandle } from 'react';
import { View, Text, Image } from '@tarojs/components';
import type { RichTextProps, RichTextRef, RichTextNode } from './RichText.types';
import {
  BaseStyles,
  getHeadingStyle,
  getListStyle,
  mergeStyles,
  transformTextStyle,
  transformImageStyle,
} from './RichText.styles';

/**
 * 富文本组件
 * 使用基础元素模拟HTML标签功能，支持文本格式化、段落排版、图片展示等
 */
const RichText = forwardRef<RichTextRef, RichTextProps>((props, ref) => {
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    getHeight: () => {
      if (containerRef.current) {
        return containerRef.current.offsetHeight;
      }
      return 0;
    },
    reset: () => {
      // 重置组件逻辑
    },
  }));

  /**
   * 处理文本内容
   */
  const processContent = (content: string | RichTextNode[]): RichTextNode[] => {
    if (typeof content === 'string') {
      // 如果是字符串，尝试解析为JSON
      try {
        return JSON.parse(content) as RichTextNode[];
      } catch (error) {
        // 如果解析失败，作为纯文本处理
        return [
          {
            type: 'p',
            content,
          },
        ];
      }
    }
    return content;
  };

  /**
   * 处理链接点击
   */
  const handleLinkClick = (href: string, type: 'internal' | 'external' = 'external') => {
    // 调用自定义链接点击事件
    if (props.onLinkClick) {
      const shouldPrevent = props.onLinkClick(href, type);
      if (shouldPrevent) {
        return;
      }
    }

    // 默认链接处理逻辑
    if (type === 'external') {
      // 外部链接，使用系统默认浏览器打开
      // @ts-ignore
      if (typeof Taro !== 'undefined') {
        // @ts-ignore
        Taro.openUrl({
          url: href,
          success: () => {},
          fail: (error: any) => {
            console.error('Failed to open external link:', error);
          },
        });
      } else {
        // Web环境直接跳转
        window.open(href, '_blank');
      }
    } else {
      // 内部路由跳转
      // @ts-ignore
      if (typeof Taro !== 'undefined') {
        // @ts-ignore
        Taro.navigateTo({
          url: href,
          success: () => {},
          fail: (error) => {
            console.error('Failed to navigate to internal link:', error);
          },
        });
      } else {
        // Web环境使用window.location
        window.location.href = href;
      }
    }
  };

  /**
   * 处理图片点击
   */
  const handleImageClick = (src: string) => {
    if (props.onImageClick) {
      props.onImageClick(src);
    }
  };

  /**
   * 渲染单个富文本节点
   */
  const renderNode = (node: RichTextNode, index: number) => {
    // 合并默认样式和自定义样式
    const mergedStyle = mergeStyles(getNodeBaseStyle(node.type), transformTextStyle(node.style));

    switch (node.type) {
      case 'text':
        return (
          <Text key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.text, mergedStyle)}>
            {node.content as string}
          </Text>
        );

      case 'p':
      case 'div':
        return (
          <View key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.paragraph, mergedStyle)}>
            {Array.isArray(node.content) ? node.content.map(renderNode) : node.content}
          </View>
        );

      case 'span':
        return (
          <Text key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.inline, mergedStyle)}>
            {Array.isArray(node.content) ? node.content.map(renderNode) : node.content}
          </Text>
        );

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return (
          <View key={`${node.type}-${index}`} style={mergeStyles(getHeadingStyle(node.type), mergedStyle)}>
            {Array.isArray(node.content) ? node.content.map(renderNode) : node.content}
          </View>
        );

      case 'img':
        return node.imgProps ? (
          <View
            key={`${node.type}-${index}`}
            style={mergeStyles(BaseStyles.image, transformImageStyle(node.imgProps), transformImageStyle(node.style))}
            onClick={() => handleImageClick(node.imgProps!.src)}
          >
            <Image
              src={node.imgProps.src}
              mode="aspectFit"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
              }}
            />
          </View>
        ) : null;

      case 'a':
        return node.linkProps ? (
          <Text
            key={`${node.type}-${index}`}
            style={mergeStyles(BaseStyles.link, mergedStyle)}
            onClick={() => handleLinkClick(node.linkProps!.href, node.linkProps!.type || 'external')}
          >
            {Array.isArray(node.content) ? node.content.map(renderNode) : node.content}
          </Text>
        ) : null;

      case 'ul':
        return (
          <View key={`${node.type}-${index}`} style={mergeStyles(getListStyle('ul'), mergedStyle)}>
            {node.listItems?.map((item, itemIndex) => (
              <View key={`li-${itemIndex}`} style={mergeStyles(BaseStyles.list.li, transformTextStyle(item.style))}>
                {Array.isArray(item.content) ? item.content.map(renderNode) : item.content}
              </View>
            ))}
          </View>
        );

      case 'ol':
        return (
          <View key={`${node.type}-${index}`} style={mergeStyles(getListStyle('ol'), mergedStyle)}>
            {node.listItems?.map((item, itemIndex) => (
              <View key={`li-${itemIndex}`} style={mergeStyles(BaseStyles.list.li, transformTextStyle(item.style))}>
                {Array.isArray(item.content) ? item.content.map(renderNode) : item.content}
              </View>
            ))}
          </View>
        );

      case 'table':
        return node.tableProps ? (
          <View key={`${node.type}-${index}`} style={mergedStyle}>
            <View style={BaseStyles.table.container}>
              {/* 表头 */}
              {node.tableProps.headers.length > 0 && (
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  {node.tableProps.headers.map((header, headerIndex) => (
                    <View
                      key={`header-${headerIndex}`}
                      style={mergeStyles(BaseStyles.table.header, transformTextStyle(header.style), {
                        flex: header.colSpan || 1,
                      })}
                    >
                      {Array.isArray(header.content) ? header.content.map(renderNode) : header.content}
                    </View>
                  ))}
                </View>
              )}

              {/* 表格内容 */}
              {node.tableProps.rows.map((row, rowIndex) => (
                <View
                  key={`row-${rowIndex}`}
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <View
                      key={`cell-${cellIndex}`}
                      style={{
                        ...mergeStyles(BaseStyles.table.cell, transformTextStyle(cell.style)),
                        flex: cell.colSpan || 1,
                      }}
                    >
                      {Array.isArray(cell.content) ? cell.content.map(renderNode) : cell.content}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ) : null;

      default:
        return null;
    }
  };

  /**
   * 获取节点基础样式
   */
  const getNodeBaseStyle = (type: string) => {
    switch (type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return getHeadingStyle(type as any);
      case 'ul':
      case 'ol':
        return getListStyle(type as any);
      case 'p':
        return BaseStyles.paragraph;
      case 'span':
        return BaseStyles.inline;
      case 'img':
        return BaseStyles.image;
      case 'a':
        return BaseStyles.link;
      case 'table':
        return BaseStyles.table.container;
      default:
        return {};
    }
  };

  // 处理富文本内容
  const processedContent = processContent(props.content);

  // 合并容器样式
  const containerStyle = mergeStyles(
    BaseStyles.container,
    props.style,
    props.maxWidth ? { maxWidth: props.maxWidth } : {},
  );

  return (
    <View ref={containerRef} style={containerStyle} className={props.className}>
      {processedContent.map(renderNode)}
    </View>
  );
});

RichText.displayName = 'RichText';

/**
 * 带默认属性的富文本组件
 */
const RichTextWithDefaults = (props: RichTextProps) => {
  const defaultProps: Partial<RichTextProps> = {
    enableImageZoom: true,
    enableLinkClick: true,
  };

  return <RichText {...defaultProps} {...props} />;
};

export { RichTextWithDefaults as RichText };
export type { RichTextProps, RichTextRef, RichTextNode };
export default RichTextWithDefaults;
