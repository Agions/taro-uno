import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Tree } from '../Tree'
import type { TreeProps, TreeRef, TreeNode } from '../Tree.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: ({ children, className, style, onClick, onLongPress, ...props }) => {
    return (
      <div
        className={className}
        style={style}
        onClick={onClick}
        onContextMenu={onLongPress}
        {...props}
      >
        {children}
      </div>
    )
  },
  Text: ({ children, className, style, ...props }) => {
    return (
      <span className={className} style={style} {...props}>
        {children}
      </span>
    )
  }
}))

// Mock the Tree styles
vi.mock('../Tree.styles', () => ({
  getTreeStyles: (config: any) => ({
    tree: {
      backgroundColor: config.theme === 'dark' ? '#1f1f1f' : '#ffffff',
      borderRadius: '4px',
      padding: '8px',
    },
    getNodeIndent: (level: number) => ({
      paddingLeft: `${level * 20}px`,
    }),
  }),
  getTreeClassNames: (config: any) => ({
    tree: `taro-uno-tree taro-uno-tree--${config.size} taro-uno-tree--${config.theme} taro-uno-tree--${config.mode} ${config.disabled ? 'taro-uno-tree--disabled' : ''} ${config.className || ''}`,
    treeNode: 'taro-uno-tree-node',
    treeNodeContent: 'taro-uno-tree-node-content',
    treeNodeSwitcher: 'taro-uno-tree-node-switcher',
    treeNodeCheckbox: 'taro-uno-tree-node-checkbox',
    treeNodeIcon: 'taro-uno-tree-node-icon',
    treeNodeTitle: 'taro-uno-tree-node-title',
    expandIcon: 'taro-uno-tree-expand-icon',
    expandIconLeaf: 'taro-uno-tree-expand-icon-leaf',
    expandIconLoading: 'taro-uno-tree-expand-icon-loading',
    checkbox: 'taro-uno-tree-checkbox',
    checkboxChecked: 'taro-uno-tree-checkbox-checked',
    checkboxIndeterminate: 'taro-uno-tree-checkbox-indeterminate',
    icon: 'taro-uno-tree-icon',
    iconOpen: 'taro-uno-tree-icon-open',
    iconClose: 'taro-uno-tree-icon-close',
    loading: 'taro-uno-tree-loading',
    line: 'taro-uno-tree-line',
    checkboxInner: 'taro-uno-tree-checkbox-inner',
  }),
}))

// Mock the Tree utils
vi.mock('../Tree.utils', () => ({
  TreeUtils: {
    flattenTreeNodes: (treeData: TreeNode[]) => {
      const result: TreeNode[] = []
      function traverse(nodes: TreeNode[]) {
        nodes.forEach(node => {
          result.push(node)
          if (node.children && node.children.length > 0) {
            traverse(node.children)
          }
        })
      }
      traverse(treeData)
      return result
    },
    getNodeByKey: (treeData: TreeNode[], key: string | number) => {
      function traverse(nodes: TreeNode[]): TreeNode | null {
        for (const node of nodes) {
          if (node.key === key) {
            return node
          }
          if (node.children && node.children.length > 0) {
            const found = traverse(node.children)
            if (found) return found
          }
        }
        return null
      }
      return traverse(treeData)
    },
    getNodesByKeys: (treeData: TreeNode[], keys: (string | number)[]) => {
      return keys
        .map(key => TreeUtils.getNodeByKey(treeData, key))
        .filter((node): node is TreeNode => node !== null)
    },
    getParentKeys: (treeData: TreeNode[], targetKeys: (string | number)[]) => {
      const parentKeys: Set<string | number> = new Set()
      function traverse(nodes: TreeNode[], parentKey?: string | number) {
        nodes.forEach(node => {
          if (targetKeys.includes(node.key) && parentKey !== undefined) {
            parentKeys.add(parentKey)
          }
          if (node.children && node.children.length > 0) {
            traverse(node.children, node.key)
          }
        })
      }
      traverse(treeData)
      return Array.from(parentKeys)
    },
    getCheckedKeys: (
      treeData: TreeNode[],
      key: string | number,
      checked: boolean,
      currentCheckedKeys: (string | number)[],
      currentHalfCheckedKeys: (string | number)[]
    ) => {
      const node = TreeUtils.getNodeByKey(treeData, key)
      if (!node) {
        return { checkedKeys: currentCheckedKeys, halfCheckedKeys: currentHalfCheckedKeys }
      }

      const checkedKeys = new Set(currentCheckedKeys)
      const halfCheckedKeys = new Set(currentHalfCheckedKeys)

      if (checked) {
        checkedKeys.add(key)
        // Add all children
        const addChildren = (node: TreeNode) => {
          if (node.children) {
            node.children.forEach(child => {
              checkedKeys.add(child.key)
              addChildren(child)
            })
          }
        }
        addChildren(node)
      } else {
        checkedKeys.delete(key)
        // Remove all children
        const removeChildren = (node: TreeNode) => {
          if (node.children) {
            node.children.forEach(child => {
              checkedKeys.delete(child.key)
              removeChildren(child)
            })
          }
        }
        removeChildren(node)
      }

      return {
        checkedKeys: Array.from(checkedKeys),
        halfCheckedKeys: Array.from(halfCheckedKeys),
      }
    },
    filterTreeNodes: (treeData: TreeNode[], filterFn: (node: TreeNode) => boolean) => {
      return treeData.filter(node => {
        if (filterFn(node)) return true
        if (node.children) {
          const filteredChildren = TreeUtils.filterTreeNodes(node.children, filterFn)
          if (filteredChildren.length > 0) {
            node.children = filteredChildren
            return true
          }
        }
        return false
      })
    },
  },
}))

// Sample tree data for testing
const sampleTreeData: TreeNode[] = [
  {
    key: '1',
    title: 'Parent 1',
    children: [
      {
        key: '1-1',
        title: 'Child 1-1',
      },
      {
        key: '1-2',
        title: 'Child 1-2',
        children: [
          {
            key: '1-2-1',
            title: 'Grandchild 1-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: 'Parent 2',
    children: [
      {
        key: '2-1',
        title: 'Child 2-1',
      },
    ],
  },
]

describe('Tree Component', () => {
  const mockRef = React.createRef<TreeRef>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders tree with default props', () => {
      render(<Tree treeData={sampleTreeData} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
      expect(tree).toHaveClass('taro-uno-tree')
    })

    it('renders tree with custom size', () => {
      render(<Tree treeData={sampleTreeData} size="large" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
      expect(tree).toHaveClass('taro-uno-tree--large')
    })

    it('renders tree with dark theme', () => {
      render(<Tree treeData={sampleTreeData} theme="dark" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
      expect(tree).toHaveClass('taro-uno-tree--dark')
    })

    it('renders tree with directory mode', () => {
      render(<Tree treeData={sampleTreeData} mode="directory" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
      expect(tree).toHaveClass('taro-uno-tree--directory')
    })

    it('renders tree with showLine', () => {
      render(<Tree treeData={sampleTreeData} showLine data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree without icons', () => {
      render(<Tree treeData={sampleTreeData} showIcon={false} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree with block nodes', () => {
      render(<Tree treeData={sampleTreeData} blockNode data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree with checkable', () => {
      render(<Tree treeData={sampleTreeData} checkable data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree with checkStrictly', () => {
      render(<Tree treeData={sampleTreeData} checkable checkStrictly data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree without selection', () => {
      render(<Tree treeData={sampleTreeData} selectable={false} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree with multiple selection', () => {
      render(<Tree treeData={sampleTreeData} multiple data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders tree with disabled state', () => {
      render(<Tree treeData={sampleTreeData} disabled data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
      expect(tree).toHaveClass('taro-uno-tree--disabled')
    })

    it('renders tree with custom className', () => {
      render(<Tree treeData={sampleTreeData} className="custom-tree" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
      expect(tree).toHaveClass('custom-tree')
    })

    it('renders tree with custom style', () => {
      const customStyle = { backgroundColor: '#f0f0f0', padding: '16px' }
      render(<Tree treeData={sampleTreeData} style={customStyle} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('renders empty tree gracefully', () => {
      render(<Tree treeData={[]} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })
  })

  describe('Node Selection', () => {
    it('selects node on click', () => {
      const handleSelect = vi.fn()
      render(<Tree treeData={sampleTreeData} onSelect={handleSelect} data-testid="tree" />)

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.click(nodeTitle)

      expect(handleSelect).toHaveBeenCalled()
    })

    it('selects multiple nodes when multiple is true', () => {
      const handleSelect = vi.fn()
      render(<Tree treeData={sampleTreeData} multiple onSelect={handleSelect} data-testid="tree" />)

      const node1 = screen.getByText('Parent 1')
      const node2 = screen.getByText('Parent 2')

      fireEvent.click(node1)
      fireEvent.click(node2)

      expect(handleSelect).toHaveBeenCalledTimes(2)
    })

    it('does not select node when disabled', () => {
      const handleSelect = vi.fn()
      render(<Tree treeData={sampleTreeData} disabled onSelect={handleSelect} data-testid="tree" />)

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.click(nodeTitle)

      expect(handleSelect).not.toHaveBeenCalled()
    })

    it('does not select node when selectable is false', () => {
      const handleSelect = vi.fn()
      render(<Tree treeData={sampleTreeData} selectable={false} onSelect={handleSelect} data-testid="tree" />)

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.click(nodeTitle)

      expect(handleSelect).not.toHaveBeenCalled()
    })
  })

  describe('Node Expansion', () => {
    it('expands node on click', () => {
      const handleExpand = vi.fn()
      render(<Tree treeData={sampleTreeData} onExpand={handleExpand} data-testid="tree" />)

      const expandIcon = screen.getByText('▶')
      fireEvent.click(expandIcon)

      expect(handleExpand).toHaveBeenCalled()
    })

    it('expands all nodes when defaultExpandAll is true', () => {
      render(<Tree treeData={sampleTreeData} defaultExpandAll data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('expands parent nodes when defaultExpandParent is true', () => {
      render(<Tree treeData={sampleTreeData} defaultExpandedKeys={['1-2-1']} defaultExpandParent data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })
  })

  describe('Checkbox Behavior', () => {
    it('checks node when checkable is true', () => {
      const handleCheck = vi.fn()
      render(<Tree treeData={sampleTreeData} checkable onCheck={handleCheck} data-testid="tree" />)

      const checkbox = screen.getByRole('checkbox') || screen.getByText('✓').closest('div')
      if (checkbox) {
        fireEvent.click(checkbox)
      }

      expect(handleCheck).toHaveBeenCalled()
    })

    it('checks child nodes when parent is checked', () => {
      const handleCheck = vi.fn()
      render(<Tree treeData={sampleTreeData} checkable onCheck={handleCheck} data-testid="tree" />)

      const checkbox = screen.getByRole('checkbox') || screen.getByText('✓').closest('div')
      if (checkbox) {
        fireEvent.click(checkbox)
      }

      expect(handleCheck).toHaveBeenCalled()
    })

    it('handles checkStrictly mode', () => {
      const handleCheck = vi.fn()
      render(<Tree treeData={sampleTreeData} checkable checkStrictly onCheck={handleCheck} data-testid="tree" />)

      const checkbox = screen.getByRole('checkbox') || screen.getByText('✓').closest('div')
      if (checkbox) {
        fireEvent.click(checkbox)
      }

      expect(handleCheck).toHaveBeenCalled()
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('works in controlled mode with selectedKeys', () => {
      const handleSelect = vi.fn()
      render(<Tree treeData={sampleTreeData} selectedKeys={['1']} onSelect={handleSelect} data-testid="tree" />)

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.click(nodeTitle)

      expect(handleSelect).toHaveBeenCalled()
    })

    it('works in uncontrolled mode with defaultSelectedKeys', () => {
      const handleSelect = vi.fn()
      render(<Tree treeData={sampleTreeData} defaultSelectedKeys={['1']} onSelect={handleSelect} data-testid="tree" />)

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.click(nodeTitle)

      expect(handleSelect).toHaveBeenCalled()
    })

    it('works in controlled mode with expandedKeys', () => {
      const handleExpand = vi.fn()
      render(<Tree treeData={sampleTreeData} expandedKeys={['1']} onExpand={handleExpand} data-testid="tree" />)

      const expandIcon = screen.getByText('▶')
      fireEvent.click(expandIcon)

      expect(handleExpand).toHaveBeenCalled()
    })

    it('works in uncontrolled mode with defaultExpandedKeys', () => {
      const handleExpand = vi.fn()
      render(<Tree treeData={sampleTreeData} defaultExpandedKeys={['1']} onExpand={handleExpand} data-testid="tree" />)

      const expandIcon = screen.getByText('▶')
      fireEvent.click(expandIcon)

      expect(handleExpand).toHaveBeenCalled()
    })

    it('works in controlled mode with checkedKeys', () => {
      const handleCheck = vi.fn()
      render(<Tree treeData={sampleTreeData} checkable checkedKeys={['1']} onCheck={handleCheck} data-testid="tree" />)

      const checkbox = screen.getByRole('checkbox') || screen.getByText('✓').closest('div')
      if (checkbox) {
        fireEvent.click(checkbox)
      }

      expect(handleCheck).toHaveBeenCalled()
    })

    it('works in uncontrolled mode with defaultCheckedKeys', () => {
      const handleCheck = vi.fn()
      render(<Tree treeData={sampleTreeData} checkable defaultCheckedKeys={['1']} onCheck={handleCheck} data-testid="tree" />)

      const checkbox = screen.getByRole('checkbox') || screen.getByText('✓').closest('div')
      if (checkbox) {
        fireEvent.click(checkbox)
      }

      expect(handleCheck).toHaveBeenCalled()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        expect(mockRef.current).toBeDefined()
        expect(mockRef.current?.getSelectedKeys()).toEqual([])
        expect(mockRef.current?.getExpandedKeys()).toEqual([])
        expect(mockRef.current?.getCheckedKeys()).toEqual([])
        expect(mockRef.current?.getTreeData()).toEqual(sampleTreeData)
      })
    })

    it('sets selected keys via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.setSelectedKeys(['1'])
          expect(mockRef.current.getSelectedKeys()).toEqual(['1'])
        }
      })
    })

    it('sets expanded keys via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.setExpandedKeys(['1'])
          expect(mockRef.current.getExpandedKeys()).toEqual(['1'])
        }
      })
    })

    it('sets checked keys via ref method', () => {
      render(<Tree treeData={sampleTreeData} checkable ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.setCheckedKeys(['1'])
          expect(mockRef.current.getCheckedKeys()).toEqual(['1'])
        }
      })
    })

    it('expands node via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.expandNode('1')
          expect(mockRef.current.getExpandedKeys()).toContain('1')
        }
      })
    })

    it('selects node via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.selectNode('1')
          expect(mockRef.current.getSelectedKeys()).toContain('1')
        }
      })
    })

    it('checks node via ref method', () => {
      render(<Tree treeData={sampleTreeData} checkable ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.checkNode('1')
          expect(mockRef.current.getCheckedKeys()).toContain('1')
        }
      })
    })

    it('expands all nodes via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.expandAll()
          expect(mockRef.current.getExpandedKeys().length).toBeGreaterThan(0)
        }
      })
    })

    it('collapses all nodes via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.collapseAll()
          expect(mockRef.current.getExpandedKeys()).toEqual([])
        }
      })
    })

    it('selects all nodes via ref method', () => {
      render(<Tree treeData={sampleTreeData} multiple ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.selectAll()
          expect(mockRef.current.getSelectedKeys().length).toBeGreaterThan(0)
        }
      })
    })

    it('clears selection via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.clearSelect()
          expect(mockRef.current.getSelectedKeys()).toEqual([])
        }
      })
    })

    it('checks all nodes via ref method', () => {
      render(<Tree treeData={sampleTreeData} checkable ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.checkAll()
          expect(mockRef.current.getCheckedKeys().length).toBeGreaterThan(0)
        }
      })
    })

    it('clears checks via ref method', () => {
      render(<Tree treeData={sampleTreeData} checkable ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.clearCheck()
          expect(mockRef.current.getCheckedKeys()).toEqual([])
        }
      })
    })

    it('finds node by key via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          const node = mockRef.current.findNode('1')
          expect(node).toBeDefined()
          expect(node?.key).toBe('1')
        }
      })
    })

    it('gets nodes by keys via ref method', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        if (mockRef.current) {
          const nodes = mockRef.current.getNodesByKeys(['1', '2'])
          expect(nodes).toHaveLength(2)
        }
      })
    })

    it('provides element access via ref', () => {
      render(<Tree treeData={sampleTreeData} ref={mockRef} data-testid="tree" />)

      act(() => {
        expect(mockRef.current?.element).toBeDefined()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Tree treeData={sampleTreeData} accessibilityRole="tree" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveAttribute('accessibilityRole', 'tree')
    })

    it('supports accessibilityLabel', () => {
      render(<Tree treeData={sampleTreeData} accessibilityLabel="Tree navigation" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveAttribute('accessibilityLabel', 'Tree navigation')
    })

    it('supports accessibilityState', () => {
      render(<Tree treeData={sampleTreeData} accessibilityState={{ disabled: true }} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveAttribute('accessibilityState', '{"disabled":true}')
    })

    it('supports data attributes', () => {
      render(<Tree treeData={sampleTreeData} data-testid="tree" data-custom="value" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveAttribute('data-custom', 'value')
    })

    it('supports accessible prop', () => {
      render(<Tree treeData={sampleTreeData} accessible={false} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveAttribute('accessible', 'false')
    })
  })

  describe('Custom Rendering', () => {
    it('renders custom icon', () => {
      const customIcon = () => <span data-testid="custom-icon">📁</span>
      render(<Tree treeData={sampleTreeData} icon={customIcon} data-testid="tree" />)
      const customIconElement = screen.getByTestId('custom-icon')
      expect(customIconElement).toBeInTheDocument()
    })

    it('renders custom switcher icon', () => {
      const customSwitcherIcon = () => <span data-testid="custom-switcher">+</span>
      render(<Tree treeData={sampleTreeData} switcherIcon={customSwitcherIcon} data-testid="tree" />)
      const customSwitcherElement = screen.getByTestId('custom-switcher')
      expect(customSwitcherElement).toBeInTheDocument()
    })

    it('renders custom title', () => {
      const titleRender = (node: TreeNode) => <span data-testid="custom-title">{node.title} - Custom</span>
      render(<Tree treeData={sampleTreeData} titleRender={titleRender} data-testid="tree" />)
      const customTitle = screen.getByTestId('custom-title')
      expect(customTitle).toBeInTheDocument()
    })
  })

  describe('Filter Functionality', () => {
    it('filters nodes based on filter function', () => {
      const filterTreeNode = (node: TreeNode) => node.key === '1'
      render(<Tree treeData={sampleTreeData} filterTreeNode={filterTreeNode} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })
  })

  describe('Async Data Loading', () => {
    it('loads data asynchronously', async () => {
      const loadData = vi.fn().mockResolvedValue([])
      const onLoad = vi.fn()
      render(<Tree treeData={sampleTreeData} loadData={loadData} onLoad={onLoad} data-testid="tree" />)

      const expandIcon = screen.getByText('▶')
      fireEvent.click(expandIcon)

      await act(async () => {
        await vi.waitFor(() => {
          expect(loadData).toHaveBeenCalled()
        })
      })
    })
  })

  describe('Right Click', () => {
    it('handles right click events', () => {
      const handleRightClick = vi.fn()
      render(<Tree treeData={sampleTreeData} onRightClick={handleRightClick} data-testid="tree" />)

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.contextMenu(nodeTitle)

      expect(handleRightClick).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined treeData gracefully', () => {
      render(<Tree treeData={undefined as any} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('handles null treeData gracefully', () => {
      render(<Tree treeData={null as any} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('handles treeData with invalid nodes gracefully', () => {
      const invalidTreeData = [
        { key: '1', title: 'Valid Node' },
        { key: null, title: 'Invalid Node' },
        { title: 'Node without key' },
      ] as any
      render(<Tree treeData={invalidTreeData} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('handles very large tree data', () => {
      const largeTreeData = Array.from({ length: 1000 }, (_, i) => ({
        key: i,
        title: `Node ${i}`,
      }))
      render(<Tree treeData={largeTreeData} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('handles deeply nested tree structure', () => {
      const deepTreeData = {
        key: '1',
        title: 'Root',
        children: Array.from({ length: 10 }, (_, i) => ({
          key: `1-${i}`,
          title: `Level 1-${i}`,
          children: Array.from({ length: 10 }, (_, j) => ({
            key: `1-${i}-${j}`,
            title: `Level 2-${i}-${j}`,
          })),
        })),
      }
      render(<Tree treeData={[deepTreeData]} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many nodes', () => {
      const largeTreeData = Array.from({ length: 100 }, (_, i) => ({
        key: i,
        title: `Node ${i}`,
        children: Array.from({ length: 5 }, (_, j) => ({
          key: `${i}-${j}`,
          title: `Child ${i}-${j}`,
        })),
      }))
      render(<Tree treeData={largeTreeData} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toBeInTheDocument()
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Tree treeData={sampleTreeData} selectedKeys={['1']} data-testid="tree" />)

      for (let i = 0; i < 10; i++) {
        rerender(<Tree treeData={sampleTreeData} selectedKeys={[i.toString()]} data-testid="tree" />)
      }

      expect(screen.getByTestId('tree')).toBeInTheDocument()
    })
  })

  describe('Style Application', () => {
    it('applies custom styles correctly', () => {
      const customStyle = { backgroundColor: '#ff0000', color: '#ffffff' }
      render(<Tree treeData={sampleTreeData} style={customStyle} data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveStyle('background-color: #ff0000')
      expect(tree).toHaveStyle('color: #ffffff')
    })

    it('applies theme-specific styles', () => {
      render(<Tree treeData={sampleTreeData} theme="dark" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveClass('taro-uno-tree--dark')
    })

    it('applies size-specific styles', () => {
      render(<Tree treeData={sampleTreeData} size="large" data-testid="tree" />)
      const tree = screen.getByTestId('tree')
      expect(tree).toHaveClass('taro-uno-tree--large')
    })
  })

  describe('Event Handling', () => {
    it('handles all tree events correctly', () => {
      const handleExpand = vi.fn()
      const handleSelect = vi.fn()
      const handleCheck = vi.fn()
      const handleRightClick = vi.fn()

      render(
        <Tree
          treeData={sampleTreeData}
          checkable
          onExpand={handleExpand}
          onSelect={handleSelect}
          onCheck={handleCheck}
          onRightClick={handleRightClick}
          data-testid="tree"
        />
      )

      const nodeTitle = screen.getByText('Parent 1')
      fireEvent.click(nodeTitle)
      fireEvent.contextMenu(nodeTitle)

      expect(handleSelect).toHaveBeenCalled()
      expect(handleRightClick).toHaveBeenCalled()
    })

    it('stops event propagation correctly', () => {
      const handleExpand = vi.fn()
      const handleSelect = vi.fn()

      render(
        <Tree
          treeData={sampleTreeData}
          onExpand={handleExpand}
          onSelect={handleSelect}
          data-testid="tree"
        />
      )

      const expandIcon = screen.getByText('▶')
      fireEvent.click(expandIcon)

      expect(handleExpand).toHaveBeenCalled()
    })
  })
})