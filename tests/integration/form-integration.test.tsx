/**
 * 表单组件集成测试
 * 测试表单组件之间的交互和整体功能
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import FormComponent from '../../src/components/form/Form/Form';
import InputComponent from '../../src/components/form/Input/Input';
import ButtonComponent from '../../src/components/basic/Button/Button';

// 使用实际的组件
const Form = FormComponent;
const Input = InputComponent;
const Button = ButtonComponent;

describe('Form Integration Tests', () => {
  const mockOnSubmit = vi.fn();
  const mockOnFinish = vi.fn();
  const mockOnFinishFailed = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Form Submission', () => {
    it('should submit form with valid data', async () => {
      render(
        <Form onSubmit={mockOnSubmit} onFinish={mockOnFinish}>
          <Input
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username is required' }]}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            rules={[{ required: true, message: 'Email is required' }]}
          />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      // 填写表单
      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      // 提交表单
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnFinish).toHaveBeenCalledTimes(1);
        expect(mockOnFinish).toHaveBeenCalledWith({
          username: 'testuser',
          email: 'test@example.com'
        });
      });
    });

    it('should show validation errors for invalid data', async () => {
      render(
        <Form onSubmit={mockOnSubmit} onFinishFailed={mockOnFinishFailed}>
          <Input
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username is required' }]}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            rules={[{ required: true, message: 'Email is required' }]}
          />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      // 不填写任何内容，直接提交
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnFinishFailed).toHaveBeenCalledTimes(1);

        // 检查错误信息
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('should validate on change', async () => {
      render(
        <Form>
          <Input
            name="username"
            label="Username"
            validateTrigger="onChange"
            rules={[{ required: true, message: 'Username is required' }]}
          />
        </Form>
      );

      const usernameInput = screen.getByLabelText('Username');

      // 输入内容
      fireEvent.change(usernameInput, { target: { value: 'test' } });

      // 清空内容
      fireEvent.change(usernameInput, { target: { value: '' } });

      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
      });
    });
  });

  describe('Form with Different Input Types', () => {
    it('should handle form with mixed input types', async () => {
      render(
        <Form onFinish={mockOnFinish}>
          <Input
            name="username"
            label="Username"
            rules={[{ required: true }]}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            rules={[{ required: true, type: 'email' }]}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            rules={[{ required: true, min: 6 }]}
          />
          <Input
            name="phone"
            label="Phone"
            type="tel"
            rules={[{ required: true, pattern: /^1[3-9]\d{9}$/ }]}
          />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      // 填写表单
      fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '13800138000' } });

      // 提交表单
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(mockOnFinish).toHaveBeenCalledWith({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          phone: '13800138000'
        });
      });
    });

    it('should validate email format', async () => {
      render(
        <Form>
          <Input
            name="email"
            label="Email"
            type="email"
            validateTrigger="onChange"
            rules={[{ required: true, type: 'email', message: 'Invalid email format' }]}
          />
        </Form>
      );

      const emailInput = screen.getByLabelText('Email');

      // 输入无效邮箱
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      });

      // 输入有效邮箱
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });

      await waitFor(() => {
        expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form State Management', () => {
    it('should maintain form state correctly', async () => {
      const { rerender } = render(
        <Form initialValues={{ username: 'initial', email: 'initial@example.com' }}>
          <Input name="username" label="Username" />
          <Input name="email" label="Email" />
        </Form>
      );

      // 检查初始值
      expect(screen.getByLabelText('Username')).toHaveValue('initial');
      expect(screen.getByLabelText('Email')).toHaveValue('initial@example.com');

      // 修改值
      fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'modified' } });

      // 重新渲染，检查状态是否保持
      rerender(
        <Form initialValues={{ username: 'initial', email: 'initial@example.com' }}>
          <Input name="username" label="Username" />
          <Input name="email" label="Email" />
        </Form>
      );

      expect(screen.getByLabelText('Username')).toHaveValue('modified');
    });

    it('should reset form values', async () => {
      const mockOnReset = vi.fn();

      render(
        <Form onReset={mockOnReset}>
          <Input name="username" label="Username" defaultValue="default" />
          <Button type="default" htmlType="reset">Reset</Button>
        </Form>
      );

      const usernameInput = screen.getByLabelText('Username');
      const resetButton = screen.getByRole('button', { name: 'Reset' });

      // 修改值
      fireEvent.change(usernameInput, { target: { value: 'modified' } });
      expect(usernameInput).toHaveValue('modified');

      // 重置表单
      fireEvent.click(resetButton);

      await waitFor(() => {
        expect(usernameInput).toHaveValue('default');
        expect(mockOnReset).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Form with Dynamic Fields', () => {
    it('should handle dynamic form fields', async () => {
      const DynamicForm = () => {
        const [fields, setFields] = React.useState(['field1']);

        const addField = () => {
          setFields([...fields, `field${fields.length + 1}`]);
        };

        return (
          <Form onFinish={mockOnFinish}>
            {fields.map((field, index) => (
              <Input
                key={field}
                name={field}
                label={`Field ${index + 1}`}
                rules={[{ required: true }]}
              />
            ))}
            <Button type="dashed" onClick={addField}>Add Field</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>
        );
      };

      render(<DynamicForm />);

      // 初始状态
      expect(screen.getByLabelText('Field 1')).toBeInTheDocument();

      // 添加字段
      fireEvent.click(screen.getByRole('button', { name: 'Add Field' }));

      await waitFor(() => {
        expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
      });

      // 填写所有字段并提交
      fireEvent.change(screen.getByLabelText('Field 1'), { target: { value: 'value1' } });
      fireEvent.change(screen.getByLabelText('Field 2'), { target: { value: 'value2' } });

      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(mockOnFinish).toHaveBeenCalledWith({
          field1: 'value1',
          field2: 'value2'
        });
      });
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper accessibility attributes', () => {
      render(
        <Form>
          <Input
            name="username"
            label="Username"
            rules={[{ required: true }]}
          />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      const form = screen.getByRole('form');
      const usernameInput = screen.getByLabelText('Username');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      expect(form).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should handle keyboard navigation', async () => {
      render(
        <Form onFinish={mockOnFinish}>
          <Input name="username" label="Username" />
          <Input name="email" label="Email" />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // 使用 Tab 键导航
      fireEvent.keyDown(usernameInput, { key: 'Tab' });

      // 模拟焦点移动到下一个输入框
      fireEvent.focus(emailInput);

      // 使用 Enter 键提交
      fireEvent.keyDown(emailInput, { key: 'Enter' });

      await waitFor(() => {
        expect(mockOnFinish).toHaveBeenCalled();
      });
    });
  });

  describe('Form Performance', () => {
    it('should handle large forms efficiently', async () => {
      const fields = Array.from({ length: 50 }, (_, i) => ({
        name: `field${i}`,
        label: `Field ${i + 1}`,
        rules: [{ required: true }]
      }));

      render(
        <Form onFinish={mockOnFinish}>
          {fields.map(field => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules}
            />
          ))}
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      // 填写前5个字段
      for (let i = 0; i < 5; i++) {
        const input = screen.getByLabelText(`Field ${i + 1}`);
        fireEvent.change(input, { target: { value: `value${i}` } });
      }

      // 提交表单
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(mockOnFinish).toHaveBeenCalled();
      });
    });
  });

  describe('Form Error Handling', () => {
    it('should handle async validation', async () => {
      const asyncValidator = vi.fn()
        .mockResolvedValueOnce('Username already exists')
        .mockResolvedValueOnce(undefined);

      render(
        <Form>
          <Input
            name="username"
            label="Username"
            validateTrigger="onChange"
            rules={[{
              required: true,
              validator: async (_, value) => {
                if (value === 'taken') {
                  return 'Username already exists';
                }
                return undefined;
              }
            }]}
          />
        </Form>
      );

      const usernameInput = screen.getByLabelText('Username');

      // 输入已被占用的用户名
      fireEvent.change(usernameInput, { target: { value: 'taken' } });

      await waitFor(() => {
        expect(screen.getByText('Username already exists')).toBeInTheDocument();
      });

      // 输入可用用户名
      fireEvent.change(usernameInput, { target: { value: 'available' } });

      await waitFor(() => {
        expect(screen.queryByText('Username already exists')).not.toBeInTheDocument();
      });
    });

    it('should handle form submission errors', async () => {
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Submission failed'));

      render(
        <Form onFinish={mockSubmit}>
          <Input name="username" label="Username" rules={[{ required: true }]} />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      );

      // 填写表单
      fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });

      // 提交表单
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({ username: 'testuser' });
        // 注意：这里需要根据实际的错误处理逻辑来调整
      });
    });
  });
});
