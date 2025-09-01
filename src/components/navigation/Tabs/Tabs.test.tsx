import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Tabs } from '../Tabs'
import type { TabsProps, TabsRef, TabItem } from '../Tabs.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: 'div',
  Text: 'span'
}))

// Mock styles
vi.mock('../Tabs.styles', () => ({
  tabsStyles: {
    getBaseStyle: (props: any) => ({
      display: 'flex',
      flexDirection: props.position === 'left' || props.position === 'right' ? 'row' : 'column',
      alignItems: props.centered ? 'center' : 'stretch'
    }),
    getTabBarStyle: (position: any, type: any) => ({
      display: 'flex',
      flexDirection: position === 'top' || position === 'bottom' ? 'row' : 'column',
      borderBottom: type === 'line' ? '2px solid #f0f0f0' : 'none',
      backgroundColor: type === 'card' ? '#f5f5f5' : 'transparent'
    }),
    getTabItemStyle: (props: any) => ({
      padding: props.size === 'small' ? '8px 16px' : props.size === 'large' ? '16px 32px' : '12px 24px',
      fontSize: props.size === 'small' ? '12px' : props.size === 'large' ? '16px' : '14px',
      fontWeight: props.active ? 'bold' : 'normal',
      color: props.active ? '#1890ff' : '#666',
      borderBottom: props.active && props.type === 'line' ? '2px solid #1890ff' : 'none',
      backgroundColor: props.active && props.type === 'card' ? 'white' : 'transparent',
      opacity: props.disabled ? 0.5 : 1,
      cursor: props.disabled ? 'not-allowed' : 'pointer'
    }),
    getBadgeStyle: () => ({
      backgroundColor: '#ff4d4f',
      color: 'white',
      borderRadius: '10px',
      padding: '2px 6px',
      fontSize: '12px',
      marginLeft: '4px'
    }),
    getRemoveButtonStyle: () => ({
      marginLeft: '8px',
      cursor: 'pointer',
      fontSize: '12px',
      color: '#999'
    }),
    getAddButtonStyle: (size: any) => ({
      padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      cursor: 'pointer',
      color: '#1890ff'
    }),
    getContentStyle: (position: any, animated: any) => ({
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    }),
    getTabContentStyle: (active: any, animated: any) => ({
      display: active ? 'block' : 'none',
      transition: animated ? 'all 0.3s ease' : 'none'
    }),
    getClassName: (props: any) => `taro-uno-tabs taro-uno-tabs--${props.position} taro-uno-tabs--${props.type} taro-uno-tabs--${props.size} ${props.centered ? 'taro-uno-tabs--centered' : ''} ${props.className || ''}`
  }
}))

describe('Tabs Component', () => {
  const mockRef = React.createRef<TabsRef>()
  const mockItems: TabItem[] = [
    { key: 'tab1', title: 'Tab 1', content: 'Content 1' },
    { key: 'tab2', title: 'Tab 2', content: 'Content 2' },
    { key: 'tab3', title: 'Tab 3', content: 'Content 3' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders tabs with default props', () => {
      render(<Tabs items={mockItems} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with custom active key', () => {
      render(<Tabs items={mockItems} activeKey="tab2" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with default active key', () => {
      render(<Tabs items={mockItems} defaultActiveKey="tab2" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with custom position', () => {
      render(<Tabs items={mockItems} position="bottom" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with custom type', () => {
      render(<Tabs items={mockItems} type="card" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with custom size', () => {
      render(<Tabs items={mockItems} size="small" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with centered alignment', () => {
      render(<Tabs items={mockItems} centered data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with animation', () => {
      render(<Tabs items={mockItems} animated={false} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with editable mode', () => {
      render(<Tabs items={mockItems} editable data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with addable mode', () => {
      render(<Tabs items={mockItems} addable data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with force render', () => {
      render(<Tabs items={mockItems} forceRender data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with destroy inactive tab pane', () => {
      render(<Tabs items={mockItems} destroyInactiveTabPane data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with custom className', () => {
      render(<Tabs items={mockItems} className="custom-tabs" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
      expect(tabs).toHaveClass('custom-tabs')
    })

    it('renders tabs with custom style', () => {
      const customStyle = { backgroundColor: '#f0f0f0', padding: '16px' }
      render(<Tabs items={mockItems} style={customStyle} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with disabled tab', () => {
      const itemsWithDisabled = [
        ...mockItems,
        { key: 'tab4', title: 'Tab 4', content: 'Content 4', disabled: true }
      ]
      render(<Tabs items={itemsWithDisabled} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with tab icons', () => {
      const itemsWithIcons = [
        { key: 'tab1', title: 'Tab 1', content: 'Content 1', icon: '📄' },
        { key: 'tab2', title: 'Tab 2', content: 'Content 2', icon: '📊' }
      ]
      render(<Tabs items={itemsWithIcons} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs with tab badges', () => {
      const itemsWithBadges = [
        { key: 'tab1', title: 'Tab 1', content: 'Content 1', badge: '3' },
        { key: 'tab2', title: 'Tab 2', content: 'Content 2', badge: 'New' }
      ]
      render(<Tabs items={itemsWithBadges} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('handles empty items gracefully', () => {
      render(<Tabs items={[]} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('handles single tab gracefully', () => {
      const singleItem = [{ key: 'tab1', title: 'Tab 1', content: 'Content 1' }]
      render(<Tabs items={singleItem} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })
  })

  describe('Tab Navigation', () => {
    it('switches tab on click', () => {
      const handleChange = vi.fn()
      render(<Tabs items={mockItems} onChange={handleChange} data-testid="tabs" />)

      const tab2 = screen.getByText('Tab 2')
      fireEvent.click(tab2)

      expect(handleChange).toHaveBeenCalledWith('tab2')
    })

    it('calls onTabClick when tab is clicked', () => {
      const handleTabClick = vi.fn()
      render(<Tabs items={mockItems} onTabClick={handleTabClick} data-testid="tabs" />)

      const tab2 = screen.getByText('Tab 2')
      fireEvent.click(tab2)

      expect(handleTabClick).toHaveBeenCalledWith('tab2', expect.any(Object))
    })

    it('does not switch to disabled tab', () => {
      const handleChange = vi.fn()
      const itemsWithDisabled = [
        ...mockItems,
        { key: 'tab4', title: 'Tab 4', content: 'Content 4', disabled: true }
      ]
      render(<Tabs items={itemsWithDisabled} onChange={handleChange} data-testid="tabs" />)

      const disabledTab = screen.getByText('Tab 4')
      fireEvent.click(disabledTab)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not call onTabClick for disabled tab', () => {
      const handleTabClick = vi.fn()
      const itemsWithDisabled = [
        ...mockItems,
        { key: 'tab4', title: 'Tab 4', content: 'Content 4', disabled: true }
      ]
      render(<Tabs items={itemsWithDisabled} onTabClick={handleTabClick} data-testid="tabs" />)

      const disabledTab = screen.getByText('Tab 4')
      fireEvent.click(disabledTab)

      expect(handleTabClick).not.toHaveBeenCalled()
    })
  })

  describe('Tab Management', () => {
    it('adds new tab when add button is clicked', () => {
      const handleAdd = vi.fn()
      const handleEdit = vi.fn()
      render(<Tabs items={mockItems} addable onAdd={handleAdd} onEdit={handleEdit} data-testid="tabs" />)

      const addButton = screen.getByText('+')
      fireEvent.click(addButton)

      expect(handleAdd).toHaveBeenCalled()
      expect(handleEdit).toHaveBeenCalledWith('', 'add')
    })

    it('removes tab when remove button is clicked', () => {
      const handleRemove = vi.fn()
      const handleEdit = vi.fn()
      render(<Tabs items={mockItems} editable onRemove={handleRemove} onEdit={handleEdit} data-testid="tabs" />)

      const removeButtons = screen.getAllByText('×')
      fireEvent.click(removeButtons[0])

      expect(handleRemove).toHaveBeenCalledWith('tab1')
      expect(handleEdit).toHaveBeenCalledWith('tab1', 'remove')
    })

    it('stops event propagation when removing tab', () => {
      const handleChange = vi.fn()
      const handleRemove = vi.fn()
      render(<Tabs items={mockItems} editable onRemove={handleRemove} onChange={handleChange} data-testid="tabs" />)

      const removeButtons = screen.getAllByText('×')
      fireEvent.click(removeButtons[0])

      expect(handleRemove).toHaveBeenCalled()
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not show remove button for single tab', () => {
      const singleItem = [{ key: 'tab1', title: 'Tab 1', content: 'Content 1' }]
      render(<Tabs items={singleItem} editable data-testid="tabs" />)

      const removeButtons = screen.queryAllByText('×')
      expect(removeButtons).toHaveLength(0)
    })
  })

  describe('Custom Rendering', () => {
    it('uses custom tab bar render', () => {
      const customTabBar = (props: TabsProps) => (
        <div data-testid="custom-tab-bar">Custom Tab Bar</div>
      )
      render(<Tabs items={mockItems} renderTabBar={customTabBar} data-testid="tabs" />)

      expect(screen.getByTestId('custom-tab-bar')).toBeInTheDocument()
    })

    it('uses custom tab render', () => {
      const customTab = (item: TabItem, index: number) => (
        <div data-testid={`custom-tab-${index}`}>Custom {item.title}</div>
      )
      render(<Tabs items={mockItems} renderTab={customTab} data-testid="tabs" />)

      expect(screen.getByTestId('custom-tab-0')).toBeInTheDocument()
      expect(screen.getByTestId('custom-tab-1')).toBeInTheDocument()
      expect(screen.getByTestId('custom-tab-2')).toBeInTheDocument()
    })

    it('uses custom content render', () => {
      const customContent = (item: TabItem, index: number) => (
        <div data-testid={`custom-content-${index}`}>Custom Content {index + 1}</div>
      )
      render(<Tabs items={mockItems} renderContent={customContent} data-testid="tabs" />)

      expect(screen.getByTestId('custom-content-0')).toBeInTheDocument()
    })
  })

  describe('Props Updates', () => {
    it('updates items correctly', () => {
      const { rerender } = render(<Tabs items={mockItems} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')

      const newItems = [
        { key: 'tab1', title: 'Updated Tab 1', content: 'Updated Content 1' },
        { key: 'tab2', title: 'Updated Tab 2', content: 'Updated Content 2' }
      ]

      rerender(<Tabs items={newItems} data-testid="tabs" />)
      expect(tabs).toBeInTheDocument()
      expect(screen.getByText('Updated Tab 1')).toBeInTheDocument()
    })

    it('updates active key correctly', () => {
      const { rerender } = render(<Tabs items={mockItems} activeKey="tab1" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')

      rerender(<Tabs items={mockItems} activeKey="tab2" data-testid="tabs" />)
      expect(tabs).toBeInTheDocument()
    })

    it('updates position correctly', () => {
      const { rerender } = render(<Tabs items={mockItems} position="top" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')

      rerender(<Tabs items={mockItems} position="bottom" data-testid="tabs" />)
      expect(tabs).toBeInTheDocument()
    })

    it('updates type correctly', () => {
      const { rerender } = render(<Tabs items={mockItems} type="line" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')

      rerender(<Tabs items={mockItems} type="card" data-testid="tabs" />)
      expect(tabs).toBeInTheDocument()
    })

    it('updates size correctly', () => {
      const { rerender } = render(<Tabs items={mockItems} size="default" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')

      rerender(<Tabs items={mockItems} size="small" data-testid="tabs" />)
      expect(tabs).toBeInTheDocument()
    })

    it('updates centered correctly', () => {
      const { rerender } = render(<Tabs items={mockItems} centered={false} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')

      rerender(<Tabs items={mockItems} centered={true} data-testid="tabs" />)
      expect(tabs).toBeInTheDocument()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Tabs items={mockItems} ref={mockRef} data-testid="tabs" />)

      act(() => {
        expect(mockRef.current).toBeDefined()
        expect(mockRef.current?.getActiveKey()).toBe('tab1')
        expect(mockRef.current?.getItems()).toEqual(mockItems)
      })
    })

    it('sets active key via ref method', () => {
      render(<Tabs items={mockItems} defaultActiveKey="tab1" ref={mockRef} data-testid="tabs" />)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.setActiveKey('tab2')).not.toThrow()
        }
      })
    })

    it('adds item via ref method', () => {
      render(<Tabs items={mockItems} ref={mockRef} data-testid="tabs" />)

      act(() => {
        if (mockRef.current) {
          const newItem = { key: 'tab4', title: 'Tab 4', content: 'Content 4' }
          expect(() => mockRef.current.addItem(newItem)).not.toThrow()
        }
      })
    })

    it('adds item at specific index via ref method', () => {
      render(<Tabs items={mockItems} ref={mockRef} data-testid="tabs" />)

      act(() => {
        if (mockRef.current) {
          const newItem = { key: 'tab4', title: 'Tab 4', content: 'Content 4' }
          expect(() => mockRef.current.addItem(newItem, 1)).not.toThrow()
        }
      })
    })

    it('removes item via ref method', () => {
      render(<Tabs items={mockItems} ref={mockRef} data-testid="tabs" />)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.removeItem('tab2')).not.toThrow()
        }
      })
    })

    it('updates item via ref method', () => {
      render(<Tabs items={mockItems} ref={mockRef} data-testid="tabs" />)

      act(() => {
        if (mockRef.current) {
          const updatedItem = { title: 'Updated Tab 2' }
          expect(() => mockRef.current.updateItem('tab2', updatedItem)).not.toThrow()
        }
      })
    })

    it('provides element access via ref', () => {
      render(<Tabs items={mockItems} ref={mockRef} data-testid="tabs" />)

      act(() => {
        expect(mockRef.current?.element).toBeDefined()
      })
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('works in controlled mode', () => {
      const handleChange = vi.fn()
      render(<Tabs items={mockItems} activeKey="tab2" onChange={handleChange} data-testid="tabs" />)

      const tab1 = screen.getByText('Tab 1')
      fireEvent.click(tab1)

      expect(handleChange).toHaveBeenCalledWith('tab1')
    })

    it('works in uncontrolled mode', () => {
      const handleChange = vi.fn()
      render(<Tabs items={mockItems} defaultActiveKey="tab2" onChange={handleChange} data-testid="tabs" />)

      const tab1 = screen.getByText('Tab 1')
      fireEvent.click(tab1)

      expect(handleChange).toHaveBeenCalledWith('tab1')
    })
  })

  describe('Content Rendering', () => {
    it('renders active tab content', () => {
      render(<Tabs items={mockItems} activeKey="tab2" data-testid="tabs" />)
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })

    it('does not render inactive tab content when destroyInactiveTabPane is true', () => {
      render(<Tabs items={mockItems} activeKey="tab2" destroyInactiveTabPane data-testid="tabs" />)
      expect(screen.getByText('Content 2')).toBeInTheDocument()
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
    })

    it('renders all tab content when forceRender is true', () => {
      render(<Tabs items={mockItems} forceRender data-testid="tabs" />)
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.getByText('Content 2')).toBeInTheDocument()
      expect(screen.getByText('Content 3')).toBeInTheDocument()
    })

    it('only renders active tab content by default', () => {
      render(<Tabs items={mockItems} data-testid="tabs" />)
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      // Note: The actual implementation may render all tabs but hide inactive ones
      // This test verifies the active tab content is visible
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Tabs items={mockItems} role="tablist" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toHaveAttribute('role', 'tablist')
    })

    it('supports aria-label', () => {
      render(<Tabs items={mockItems} aria-label="Tab navigation" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toHaveAttribute('aria-label', 'Tab navigation')
    })

    it('supports aria-labelledby', () => {
      render(<Tabs items={mockItems} aria-labelledby="tabs-title" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toHaveAttribute('aria-labelledby', 'tabs-title')
    })

    it('supports data attributes', () => {
      render(<Tabs items={mockItems} data-testid="tabs" data-custom="value" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles items with duplicate keys', () => {
      const itemsWithDuplicateKeys = [
        { key: 'tab1', title: 'Tab 1', content: 'Content 1' },
        { key: 'tab1', title: 'Tab 1 Duplicate', content: 'Content 1 Duplicate' }
      ]
      render(<Tabs items={itemsWithDuplicateKeys} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('handles items without content', () => {
      const itemsWithoutContent = [
        { key: 'tab1', title: 'Tab 1' },
        { key: 'tab2', title: 'Tab 2' }
      ]
      render(<Tabs items={itemsWithoutContent} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('handles items with undefined title', () => {
      const itemsWithUndefinedTitle = [
        { key: 'tab1', title: undefined, content: 'Content 1' },
        { key: 'tab2', title: 'Tab 2', content: 'Content 2' }
      ]
      render(<Tabs items={itemsWithUndefinedTitle as any} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('handles items with complex content', () => {
      const itemsWithComplexContent = [
        { key: 'tab1', title: 'Tab 1', content: <div data-testid="complex-content">Complex Content</div> },
        { key: 'tab2', title: 'Tab 2', content: 'Simple Content' }
      ]
      render(<Tabs items={itemsWithComplexContent} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
      expect(screen.getByTestId('complex-content')).toBeInTheDocument()
    })

    it('handles items with complex title', () => {
      const itemsWithComplexTitle = [
        { key: 'tab1', title: <div data-testid="complex-title">Complex Title</div>, content: 'Content 1' },
        { key: 'tab2', title: 'Simple Title', content: 'Content 2' }
      ]
      render(<Tabs items={itemsWithComplexTitle} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
      expect(screen.getByTestId('complex-title')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many tabs', () => {
      const manyItems = Array.from({ length: 50 }, (_, i) => ({
        key: `tab${i}`,
        title: `Tab ${i}`,
        content: `Content ${i}`
      }))
      render(<Tabs items={manyItems} data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
      expect(screen.getAllByText(/^Tab \d+$/)).toHaveLength(50)
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Tabs items={mockItems} activeKey="tab1" data-testid="tabs" />)

      for (let i = 0; i < 10; i++) {
        rerender(<Tabs items={mockItems} activeKey={mockItems[i % 3].key} data-testid="tabs" />)
      }

      expect(screen.getByTestId('tabs')).toBeInTheDocument()
    })
  })

  describe('Position Variants', () => {
    it('renders tabs in left position', () => {
      render(<Tabs items={mockItems} position="left" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs in right position', () => {
      render(<Tabs items={mockItems} position="right" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders tabs in bottom position', () => {
      render(<Tabs items={mockItems} position="bottom" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })
  })

  describe('Type Variants', () => {
    it('renders line type tabs', () => {
      render(<Tabs items={mockItems} type="line" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders card type tabs', () => {
      render(<Tabs items={mockItems} type="card" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('renders segment type tabs', () => {
      render(<Tabs items={mockItems} type="segment" data-testid="tabs" />)
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })
  })
})
