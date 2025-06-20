import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Select } from './index'
import * as platformUtils from '@/utils/platform'

// 模拟平台检测函数
jest.mock('@/utils/platform', () => ({
  getCurrentPlatform: jest.fn(),
}))

describe('Select 组件', () => {
  const mockOptions = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
  ]

  beforeEach(() => {
    // 默认返回web平台
    jest.spyOn(platformUtils, 'getCurrentPlatform').mockReturnValue('h5')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('渲染基础单选选择器', () => {
    const { getByText } = render(<Select options={mockOptions} placeholder='请选择' />)

    expect(getByText('请选择')).toBeInTheDocument()
  })

  test('点击选择器显示下拉面板', async () => {
    const { getByText, queryByText } = render(<Select options={mockOptions} placeholder='请选择' />)

    // 初始不显示选项
    expect(queryByText('苹果')).not.toBeInTheDocument()

    // 点击选择器
    fireEvent.click(getByText('请选择'))

    // 应该显示选项
    await waitFor(() => {
      expect(queryByText('苹果')).toBeInTheDocument()
      expect(queryByText('香蕉')).toBeInTheDocument()
      expect(queryByText('橙子')).toBeInTheDocument()
    })
  })

  test('选择选项后应该更新显示值', async () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Select options={mockOptions} placeholder='请选择' onChange={handleChange} />
    )

    // 点击选择器
    fireEvent.click(getByText('请选择'))

    // 点击选项
    fireEvent.click(getByText('香蕉'))

    // 选择器显示应该更新
    expect(getByText('香蕉')).toBeInTheDocument()

    // onChange应该被调用，带有正确的参数
    expect(handleChange).toHaveBeenCalledWith(
      'banana',
      expect.objectContaining({ value: 'banana', label: '香蕉' }),
      expect.anything()
    )
  })

  test('多选模式应该可以选择多个选项', async () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Select options={mockOptions} placeholder='请选择' multiple onChange={handleChange} />
    )

    // 点击选择器
    fireEvent.click(getByText('请选择'))

    // 点击第一个选项
    fireEvent.click(getByText('苹果'))

    // 确认onChange被调用，带有正确的参数
    expect(handleChange).toHaveBeenCalledWith(
      ['apple'],
      expect.arrayContaining([expect.objectContaining({ value: 'apple', label: '苹果' })]),
      expect.anything()
    )

    // 点击第二个选项
    fireEvent.click(getByText('香蕉'))

    // 确认onChange被再次调用，带有两个选中值
    expect(handleChange).toHaveBeenLastCalledWith(
      ['apple', 'banana'],
      expect.arrayContaining([
        expect.objectContaining({ value: 'apple', label: '苹果' }),
        expect.objectContaining({ value: 'banana', label: '香蕉' }),
      ]),
      expect.anything()
    )
  })

  test('禁用状态下不应该响应点击', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Select options={mockOptions} placeholder='请选择' disabled onChange={handleChange} />
    )

    // 点击选择器
    fireEvent.click(getByText('请选择'))

    // 下拉菜单不应该显示
    expect(document.body.textContent).not.toContain('苹果')

    // onChange不应该被调用
    expect(handleChange).not.toHaveBeenCalled()
  })

  test('受控模式下应该使用外部value', () => {
    const { getByText, rerender } = render(
      <Select options={mockOptions} placeholder='请选择' value='apple' />
    )

    // 应该显示对应的选项文本
    expect(getByText('苹果')).toBeInTheDocument()

    // 更新value
    rerender(<Select options={mockOptions} placeholder='请选择' value='banana' />)

    // 显示应该更新
    expect(getByText('香蕉')).toBeInTheDocument()
  })

  test('在不同平台上应该应用对应的平台样式类', () => {
    // 设置为微信小程序环境
    jest.spyOn(platformUtils, 'getCurrentPlatform').mockReturnValue('weapp')

    const { container: weappContainer } = render(
      <Select options={mockOptions} placeholder='请选择' />
    )

    expect(weappContainer.querySelector('.uno-select--platform-weapp')).not.toBeNull()

    // 设置为鸿蒙OS环境
    jest.spyOn(platformUtils, 'getCurrentPlatform').mockReturnValue('harmony')

    const { container: harmonyContainer } = render(
      <Select options={mockOptions} placeholder='请选择' />
    )

    expect(harmonyContainer.querySelector('.uno-select--platform-harmony')).not.toBeNull()
  })

  test('可搜索模式下应该过滤选项', async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Select options={mockOptions} placeholder='请选择' searchable />
    )

    // 点击选择器
    fireEvent.click(getByText('请选择'))

    // 搜索输入框应该出现
    const searchInput = getByPlaceholderText('搜索...')
    expect(searchInput).toBeInTheDocument()

    // 输入搜索文本
    fireEvent.input(searchInput, { target: { value: '香' } })

    // 只有匹配的选项应该显示
    await waitFor(() => {
      expect(queryByText('苹果')).not.toBeInTheDocument()
      expect(queryByText('香蕉')).toBeInTheDocument()
      expect(queryByText('橙子')).not.toBeInTheDocument()
    })
  })

  test('带清空按钮的选择器应该能清空选中值', async () => {
    const handleClear = jest.fn()
    const handleChange = jest.fn()

    const { getByText, queryByText, getByRole } = render(
      <Select
        options={mockOptions}
        placeholder='请选择'
        value='apple'
        clearable
        onClear={handleClear}
        onChange={handleChange}
      />
    )

    // 初始显示选中值
    expect(getByText('苹果')).toBeInTheDocument()

    // 清空按钮应该存在
    const clearButton = getByRole('clear-btn')

    // 点击清空按钮
    fireEvent.click(clearButton)

    // 值应该被清空
    expect(queryByText('请选择')).toBeInTheDocument()

    // 回调函数应该被调用
    expect(handleClear).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(undefined, undefined, expect.anything())
  })
}) 