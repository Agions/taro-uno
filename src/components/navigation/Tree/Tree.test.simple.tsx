import React from 'react'
import { render, screen } from '@testing-library/react'
import { Tree } from '../Tree'
import type { TreeNode } from '../Tree.types'

// Simple test data
const simpleTreeData: TreeNode[] = [
  {
    key: '1',
    title: 'Node 1',
  },
  {
    key: '2',
    title: 'Node 2',
  },
]

describe('Tree Component - Simple Test', () => {
  it('renders without crashing', () => {
    render(<Tree treeData={simpleTreeData} data-testid="tree" />)
    const tree = screen.getByTestId('tree')
    expect(tree).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Tree treeData={simpleTreeData} className="custom-tree" data-testid="tree" />)
    const tree = screen.getByTestId('tree')
    expect(tree).toHaveClass('custom-tree')
  })
})