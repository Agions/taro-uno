/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { ListProps, ListInstance } from './types'
import { createBem } from '@/utils/helpers'
import { getCurrentPlatform } from '@/utils/platform'
import { Component } from '@/components/registry'
import './style.scss'

const bem = createBem('uno-list')

/**
 * List 列表组件
 *
 * 用于展示一组结构类似的数据，如文章列表、商品列表等
 */
const List = forwardRef<ListInstance, ListProps>((props, ref) => {
  const {
    dataSource = [],
    loading = false,
    size = 'medium',
    layout = 'vertical',
    bordered = false,
    split = true,
    renderItem,
    header,
    footer,
    emptyText = '暂无数据',
    pagination,
    grid,
    loadMore,
    onItemClick,
    className,
    style,
    rowClassName,
    rowKey,
    virtualized = false,
    virtualThreshold = 30,
    height = '100%',
    itemHeight = 60,
    enablePullToRefresh = false,
    onRefresh,
    ...restProps
  } = props

  // 获取当前平台
  const platform = getCurrentPlatform()

  // 列表容器引用
  const listRef = useRef<any>(null)

  // 下拉刷新状态
  const [refreshing, setRefreshing] = useState(false)

  // 实例方法
  useImperativeHandle(ref, () => ({
    scrollToItem: (index: number) => {
      if (listRef.current && virtualized) {
        // 滚动到指定位置
        listRef.current.scrollTop = index * itemHeight
      }
    },
    refresh: () => {
      // 触发刷新
      if (onRefresh) {
        onRefresh()
      }
    },
    resetLoadMore: () => {
      // 重置加载更多状态
      if (loadMore) {
        // 这里可以添加重置加载状态的逻辑
      }
    },
  }))

  // 处理下拉刷新
  const handleRefresh = () => {
    if (enablePullToRefresh && onRefresh) {
      setRefreshing(true)
      onRefresh()
      // 模拟刷新完成
      setTimeout(() => {
        setRefreshing(false)
      }, 1000)
    }
  }

  // 处理滚动到底部
  const handleScrollToLower = () => {
    if (loadMore && !loadMore.loading && loadMore.hasMore !== false) {
      loadMore.onLoadMore()
    }
  }

  // 渲染列表项
  const renderListItems = () => {
    if (!dataSource.length) {
      return <View className={bem('empty')}>{emptyText}</View>
    }

    return dataSource.map((item, index) => {
      const key = typeof rowKey === 'function' ? rowKey(item) : rowKey ? item[rowKey] : index

      const itemContent = renderItem ? renderItem(item, index) : null

      const itemClass = [bem('item'), rowClassName && rowClassName(item, index)]
        .filter(Boolean)
        .join(' ')

      return (
        <View key={key} className={itemClass} onClick={() => onItemClick?.(item, index)}>
          {itemContent}
          {split && index < dataSource.length - 1 && <View className={bem('divider')} />}
        </View>
      )
    })
  }

  // 渲染加载更多
  const renderLoadMore = () => {
    if (!loadMore) return null

    const { loading, hasMore, loadingText = '加载中...', noMoreText = '没有更多了' } = loadMore

    return (
      <View className={bem('load-more')}>
        {loading ? (
          <View className={bem('loading')}>{loadingText}</View>
        ) : !hasMore ? (
          <View className={bem('no-more')}>{noMoreText}</View>
        ) : null}
      </View>
    )
  }

  // 渲染分页
  const renderPagination = () => {
    if (!pagination) return null

    const { current, pageSize, total, onChange, position = 'bottom' } = pagination

    // 这里可以实现分页组件，暂时用简单的上一页/下一页代替
    return (
      <View className={bem('pagination')}>
        <View
          className={`${bem('page-prev')} ${current <= 1 ? bem('page-disabled') : ''}`}
          onClick={() => current > 1 && onChange?.(current - 1, pageSize)}
        >
          上一页
        </View>
        <View className={bem('page-current')}>
          {current}/{Math.ceil(total / pageSize)}
        </View>
        <View
          className={`${bem('page-next')} ${
            current >= Math.ceil(total / pageSize) ? bem('page-disabled') : ''
          }`}
          onClick={() => current < Math.ceil(total / pageSize) && onChange?.(current + 1, pageSize)}
        >
          下一页
        </View>
      </View>
    )
  }

  // 列表类名
  const listClass = [
    bem(),
    bem(`size-${size}`),
    bem(`layout-${layout}`),
    bordered && bem('bordered'),
    split && bem('split'),
    grid && bem('grid'),
    loading && bem('loading'),
    platform && bem(`platform-${platform}`),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // 列表内容
  const listContent = (
    <>
      {header && <View className={bem('header')}>{header}</View>}

      <View className={bem('body')}>
        {loading ? (
          <View className={bem('loading-wrapper')}>
            <View className={bem('loading-indicator')} />
            <View className={bem('loading-text')}>加载中...</View>
          </View>
        ) : (
          <>
            {grid ? (
              <View
                className={bem('grid-container')}
                style={{
                  gridTemplateColumns: `repeat(${grid.column}, 1fr)`,
                  gap: grid.gutter ? `${grid.gutter}px` : undefined,
                  padding: grid.horizontalGap ? `0 ${grid.horizontalGap}px` : undefined,
                }}
              >
                {renderListItems()}
              </View>
            ) : (
              renderListItems()
            )}
          </>
        )}
      </View>

      {renderLoadMore()}

      {pagination && pagination.position !== 'top' && renderPagination()}

      {footer && <View className={bem('footer')}>{footer}</View>}
    </>
  )

  // 根据是否启用虚拟滚动渲染不同的容器
  return (
    <View className={listClass} style={style} {...restProps}>
      {pagination && pagination.position === 'top' && renderPagination()}

      {virtualized && dataSource.length > virtualThreshold ? (
        <ScrollView
          ref={listRef}
          scrollY
          style={{ height }}
          onScrollToLower={handleScrollToLower}
          refresherEnabled={enablePullToRefresh}
          refresherTriggered={refreshing}
          onRefresherRefresh={handleRefresh}
          enhanced
          bounces
          showScrollbar={false}
        >
          {listContent}
        </ScrollView>
      ) : (
        <View ref={listRef} className={bem('container')}>
          {listContent}
        </View>
      )}
    </View>
  )
})

List.displayName = 'List'

// 注册组件
if (typeof Component === 'function') {
  Component({
    name: 'List',
    category: 'display',
    description: '列表组件，用于展示一组结构类似的数据',
    supportsSchema: true,
    version: '1.0.0',
    platformSupport: {
      weapp: true,
      alipay: true,
      h5: true,
      rn: true,
      harmony: true,
    },
  })(List as any)
}

export default List
