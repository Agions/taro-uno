import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Tree } from '../src/components/navigation/Tree'
import type { TreeProps, TreeRef, TreeNode } from '../src/components/navigation/Tree/Tree.types'

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
vi.mock('../src/components/navigation/Tree/Tree.styles', () => ({
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
vi.mock('../src/components/navigation/Tree/Tree.utils', () => ({
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
})