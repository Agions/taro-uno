import { render, screen } from '@testing-library/react'
import React from 'react'
import { Upload } from './Upload'

describe('Upload', () => {
  it.skip('renders upload button', () => {
    render(<Upload />)
    expect(screen.getByText(/上传文件|选择文件/)).toBeInTheDocument()
  })
})
